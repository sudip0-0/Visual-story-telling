# Signal to System

Cinematic scroll storytelling website — signal → spark → chaos → structure → system → launch.

## Stack

- Next.js, TypeScript, Tailwind CSS
- GSAP + ScrollTrigger, Lenis, Motion
- Three.js, React Three Fiber, Drei
- Zustand

## Commands

```bash
npm run dev    # local development
npm run lint   # ESLint
npm run build  # production build
```

## Planning docs

- `TASKS.md` — implementation roadmap
- `DESIGN.md` — visual and motion design guide
- `AGENTS.md` — agent rules
- `PROMPTS.md` — stage-by-stage prompts

## Project structure

```txt
src/
  app/           # Next.js app router
  components/
    cinematic/   # page shell, scenes, progress
    three/       # R3F scene (Phase 3+)
    ui/          # typography, CTA
  data/          # scene copy and config
  lib/           # gsap, scroll, motion hooks
  store/         # zustand scene state
```
