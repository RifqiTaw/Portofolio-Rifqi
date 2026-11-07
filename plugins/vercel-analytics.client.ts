// Vercel Web Analytics tanpa dependency tambahan.
// Aktif otomatis hanya jika Web Analytics dinyalakan di dashboard Vercel
// (Project → Analytics → Enable); di luar Vercel script ini 404 dan diabaikan.
export default defineNuxtPlugin(() => {
  if (import.meta.dev) return;

  const w = window as unknown as { va?: (...args: unknown[]) => void; vaq?: unknown[] };
  w.va =
    w.va ||
    function (...args: unknown[]) {
      (w.vaq = w.vaq || []).push(args);
    };

  useHead({
    script: [{ src: "/_vercel/insights/script.js", defer: true }],
  });
});
