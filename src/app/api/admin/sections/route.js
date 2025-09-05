import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Section from "@/lib/models/Section";

function isAdmin(request) {
  try {
    const cookie = request.headers.get('cookie') || '';
    const role = cookie.includes('role=admin') ? 'admin' : null;
    return role === 'admin';
  } catch { return false; }
}

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const examId = searchParams.get('examId');
  const filter = examId ? { examId } : {};
  const sections = await Section.find(filter).sort({ order: 1, createdAt: 1 });
  return NextResponse.json({ sections });
}

export async function POST(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const body = await request.json();
  const section = await Section.create(body);
  return NextResponse.json({ section });
}


