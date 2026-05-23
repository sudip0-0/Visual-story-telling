import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES, type SceneId } from "@/data/scenes";
import { killScrollTriggers } from "@/lib/gsap/killScrollTriggers";
import { registerGsap } from "@/lib/gsap/registerGsap";
import { setLenisInstance } from "@/lib/scroll/lenisInstance";

export type ScrollEngineOptions = {
  prefersReducedMotion: boolean;
  scope: Element;
  onProgress: (progress: number) => void;
  onSceneChange: (sceneId: SceneId) => void;
};

export type ScrollEngine = {
  destroy: () => void;
  refresh: () => void;
};

let activeEngine: ScrollEngine | null = null;

function updateNativeScrollProgress(
  onProgress: (progress: number) => void,
): void {
  const scrollHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (scrollHeight <= 0) {
    onProgress(0);
    return;
  }

  onProgress(window.scrollY / scrollHeight);
}

function createSceneScrollTriggers(
  onSceneChange: (sceneId: SceneId) => void,
): ScrollTrigger[] {
  const triggers: ScrollTrigger[] = [];

  SCENES.forEach((scene) => {
    const element = document.querySelector<HTMLElement>(
      `[data-scene="${scene.id}"]`,
    );

    if (!element) {
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 55%",
      end: "bottom 45%",
      onEnter: () => onSceneChange(scene.id),
      onEnterBack: () => onSceneChange(scene.id),
    });

    triggers.push(trigger);
  });

  return triggers;
}

export function createScrollEngine(
  options: ScrollEngineOptions,
): ScrollEngine {
  activeEngine?.destroy();

  registerGsap();

  const {
    prefersReducedMotion,
    scope,
    onProgress,
    onSceneChange,
  } = options;

  let lenis: Lenis | null = null;
  let lenisScrollUnsubscribe: (() => void) | null = null;
  let tickerCallback: ((time: number) => void) | null = null;
  let nativeScrollHandler: (() => void) | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let gsapContext: gsap.Context | null = null;
  const sceneTriggers: ScrollTrigger[] = [];

  const refresh = () => {
    ScrollTrigger.refresh();
  };

  const handleLenisScroll = (instance: Lenis) => {
    ScrollTrigger.update();
    onProgress(instance.progress);
  };

  if (!prefersReducedMotion) {
    lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      duration: 1.15,
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    const root = document.documentElement;

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis?.scrollTo(value, { immediate: true });
        }
        return lenis?.scroll ?? 0;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: root });

    lenisScrollUnsubscribe = lenis.on("scroll", handleLenisScroll);

    tickerCallback = (time: number) => {
      lenis?.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    onProgress(lenis.progress);
  } else {
    setLenisInstance(null);

    nativeScrollHandler = () => {
      ScrollTrigger.update();
      updateNativeScrollProgress(onProgress);
    };

    window.addEventListener("scroll", nativeScrollHandler, { passive: true });
    updateNativeScrollProgress(onProgress);
  }

  gsapContext = gsap.context(() => {
    sceneTriggers.push(...createSceneScrollTriggers(onSceneChange));
  }, scope);

  resizeObserver = new ResizeObserver(() => {
    lenis?.resize();
    refresh();
  });

  resizeObserver.observe(document.body);

  window.addEventListener("resize", refresh);

  refresh();
  onSceneChange(SCENES[0].id);

  const engine: ScrollEngine = {
    refresh,
    destroy() {
      if (activeEngine !== engine) {
        return;
      }

      gsapContext?.revert();
      gsapContext = null;

      sceneTriggers.forEach((trigger) => trigger.kill());
      killScrollTriggers();

      lenisScrollUnsubscribe?.();
      lenisScrollUnsubscribe = null;

      if (tickerCallback) {
        gsap.ticker.remove(tickerCallback);
        tickerCallback = null;
      }

      lenis?.destroy();
      lenis = null;
      setLenisInstance(null);

      if (nativeScrollHandler) {
        window.removeEventListener("scroll", nativeScrollHandler);
        nativeScrollHandler = null;
      }

      resizeObserver?.disconnect();
      resizeObserver = null;

      window.removeEventListener("resize", refresh);

      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.defaults({ scroller: window });

      activeEngine = null;
    },
  };

  activeEngine = engine;
  return engine;
}

export function destroyActiveScrollEngine(): void {
  activeEngine?.destroy();
}
