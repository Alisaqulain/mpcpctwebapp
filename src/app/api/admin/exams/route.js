import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Exam from "@/lib/models/Exam";

function isAdmin(request) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const role = cookie.includes('role=admin') ? 'admin' : null; // placeholder; integrate real JWT parsing if needed
    return role === 'admin';
  } catch { return false; }
}

export async function GET() {
  await dbConnect();
  const exams = await Exam.find().sort({ createdAt: -1 });
  return NextResponse.json({ exams });
}

export async function POST(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const data = await request.json();
  const exam = await Exam.create(data);
  return NextResponse.json({ exam });
}


