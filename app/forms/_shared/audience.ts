export async function addToAudience(email: string, fullName: string) {
  if (!process.env.RESEND_AUDIENCE_ID) return;
  const { resend } = await import("./resend-client");
  const parts = fullName.trim().split(" ");
  await resend.contacts
    .create({
      email,
      firstName: parts[0] ?? "",
      lastName: parts.slice(1).join(" ") || undefined,
      audienceId: process.env.RESEND_AUDIENCE_ID,
      unsubscribed: false,
    })
    .catch((err: unknown) => console.error("[Audience] Error:", err));
}
