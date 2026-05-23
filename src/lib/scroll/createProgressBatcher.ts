const DEFAULT_LAG_SMOOTHING_MS = 500;

export function createProgressBatcher(
  onProgress: (progress: number) => void,
): {
  schedule: (progress: number) => void;
  flush: () => void;
  cancel: () => void;
} {
  let rafId: number | null = null;
  let latestProgress = 0;

  const flush = () => {
    rafId = null;
    onProgress(latestProgress);
  };

  const schedule = (progress: number) => {
    latestProgress = progress;

    if (rafId !== null) {
      return;
    }

    rafId = requestAnimationFrame(flush);
  };

  const cancel = () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  return { schedule, flush, cancel };
}

export { DEFAULT_LAG_SMOOTHING_MS };
