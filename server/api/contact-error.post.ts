// Menerima laporan kegagalan pengiriman form kontak dari client dan mencatatnya
// ke log server. Di Vercel: Project → Logs (Runtime Logs), filter "[contact-form]".
// Isi pesan/email pengunjung sengaja TIDAK dicatat (privasi).
export default defineEventHandler(async (event) => {
  const body = await readBody<{ status?: unknown; text?: unknown }>(event);

  const status = typeof body?.status === "number" ? body.status : null;
  const text =
    typeof body?.text === "string" ? body.text.slice(0, 300) : "unknown";

  console.error("[contact-form] send failed", {
    status,
    text,
    userAgent: getRequestHeader(event, "user-agent")?.slice(0, 200),
    at: new Date().toISOString(),
  });

  setResponseStatus(event, 204);
  return null;
});
