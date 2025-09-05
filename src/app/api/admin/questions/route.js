import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Question from "@/lib/models/Question";

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
  const sectionId = searchParams.get('sectionId');
  const filter = {};
  if (examId) filter.examId = examId;
  if (sectionId) filter.sectionId = sectionId;
  const questions = await Question.find(filter).sort({ createdAt: -1 });
  return NextResponse.json({ questions });
}

export async function POST(request) {
  if (!isAdmin(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  await dbConnect();
  const body = await request.json();
  const question = await Question.create(body);
  return NextResponse.json({ question });
}


