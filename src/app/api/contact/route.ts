import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,        // STARTTLS on port 587
  requireTLS: true,     // enforce STARTTLS upgrade — no fallback to plain
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(req: NextRequest) {
  const { name, email, school, university } = await req.json()

  if (!name || !email || !school || !university) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  await transporter.sendMail({
    from: `"bsolongo.com" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    replyTo: email,
    subject: `New waitlist application — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#3A0519">
        <h2 style="font-size:22px;margin-bottom:24px">New College 2028 Application</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999">Email</td><td style="padding:10px 0;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#999">School</td><td style="padding:10px 0;border-bottom:1px solid #eee">${school}</td></tr>
          <tr><td style="padding:10px 0;color:#999">Target University</td><td style="padding:10px 0">${university}</td></tr>
        </table>
        <p style="margin-top:32px;font-size:12px;color:#bbb">Sent from bsolongo.com waitlist form</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}
