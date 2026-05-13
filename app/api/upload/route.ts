import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  const slug = formData.get('slug') as string; // folder berdasarkan slug mobil

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Buat folder jika belum ada
  const uploadDir = path.join(process.cwd(), `public/images/cars/${slug}`);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);
  
  fs.writeFileSync(filePath, buffer);

  // Kembalikan path untuk disimpan di JSON
  return NextResponse.json({ 
    url: `/images/cars/${slug}/${fileName}` 
  });
}