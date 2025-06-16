// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json({ message: 'Semua bidang wajib diisi.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Anda bisa mencoba mengaktifkan ini jika tetap ada isu koneksi,
      // tapi biasanya tidak diperlukan jika email terkirim.
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Pesan Baru dari Portofolio: ${subject}`,
      html: `
        <p>Anda menerima pesan baru dari formulir kontak portofolio Anda:</p>
        <p><strong>Nama:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subjek:</strong> ${subject}</p>
        <p><strong>Pesan:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
        <br/>
        <p>Ini adalah pesan otomatis, mohon jangan balas email ini.</p>
      `,
      text: `Anda menerima pesan baru dari formulir kontak portofolio Anda:\n\nNama: ${firstName} ${lastName}\nEmail: ${email}\nSubjek: ${subject}\nPesan:\n${message}\n\nIni adalah pesan otomatis, mohon jangan balas email ini.`,
    });

    // PASTIKAN BARIS INI ADA DAN KEMBALIKAN STATUS 200 DENGAN JSON
    return NextResponse.json({ message: 'Pesan berhasil dikirim!' }, { status: 200 });

  } catch (error) {
    console.error('Error saat mengirim email:', error);
    if (error instanceof Error) {
        return NextResponse.json({ message: `Gagal mengirim pesan: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ message: 'Terjadi kesalahan server tidak terduga.' }, { status: 500 });
  }
}