import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/data/cars.json');

// 1. Ambil semua data mobil
export async function GET() {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return NextResponse.json(JSON.parse(jsonData));
}

// 2. Tambah mobil baru (Simulasi Admin)
export async function POST(request: Request) {
  try {
    const newCar = await request.json();
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const cars = JSON.parse(jsonData);

    // Tambah ID otomatis
    newCar.id = cars.length > 0 ? Math.max(...cars.map((c: any) => c.id)) + 1 : 1;
    
    cars.push(newCar);

    // Simpan kembali ke file
    fs.writeFileSync(filePath, JSON.stringify(cars, null, 2));

    return NextResponse.json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update data" }, { status: 500 });
  }
}