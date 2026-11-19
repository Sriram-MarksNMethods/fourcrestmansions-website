// Contact form endpoint. Checks the fields, then forwards the lead to the
// webhook in LEAD_WEBHOOK_URL (a server-only env var, never sent to the browser).
// Without that env var it only logs the lead, so set it on the host before launch.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, string> | null;
  if (!body) return Response.json({ error: "Bad request" }, { status: 400 });
  if (body.company) return Response.json({ ok: true }); // honeypot filled: a bot, drop it quietly

  const lead = {
    firstName: String(body.firstName ?? "").trim().slice(0, 80),
    lastName: String(body.lastName ?? "").trim().slice(0, 80),
    email: String(body.email ?? "").trim().slice(0, 120),
    phone: String(body.phone ?? "").trim().slice(0, 30),
    message: String(body.message ?? "").trim().slice(0, 2000),
    source: "fourcrest-website/contact",
    submittedAt: new Date().toISOString(),
  };
  if (!lead.firstName || !/^\S+@\S+\.\S+$/.test(lead.email) || !/^[0-9+ ()-]{8,}$/.test(lead.phone)) {
    return Response.json({ error: "Please add your name, a valid email and phone number." }, { status: 400 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[enquiry] LEAD_WEBHOOK_URL is not set; lead not forwarded:", lead.email);
    return Response.json({ ok: true });
  }
  const res = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(lead) });
  if (!res.ok) return Response.json({ error: "Could not send right now. Please call us instead." }, { status: 502 });
  return Response.json({ ok: true });
}
