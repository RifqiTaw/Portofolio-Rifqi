/**
 * `true` once the first-load intro overlay in `layouts/default.vue` has fully
 * faded out. Pages can wait for it before playing their entrance animation,
 * so it isn't wasted behind the overlay on a hard refresh. Stays `true` for
 * every client-side navigation afterwards.
 */
export const useIntroDone = () => useState<boolean>("intro-done", () => false);

/**
 * The intro overlay is animated with pure CSS, so it runs (and ends) even
 * before the app hydrates. On a slow load the overlay can already be gone by
 * the time JS runs — the visitor has then already seen the SSR page, and an
 * entrance animation would just hide and re-show it.
 */
export const isIntroOverlayFinished = (): boolean => {
  if (import.meta.server) return false;
  const el = document.querySelector<HTMLElement>(".loading-screen");
  if (!el || getComputedStyle(el).display === "none") return true;
  const anims = el.getAnimations();
  return anims.length === 0 || anims.every((a) => a.playState === "finished");
};
