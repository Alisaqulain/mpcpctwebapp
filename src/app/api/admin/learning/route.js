import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Section from "@/lib/models/Section";
import Lesson from "@/lib/models/Lesson";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

async function requireAdmin(req) {
  const token = req.cookies.get("token")?.value;
  if (!token) return { ok: false, error: "Unauthorized" };
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    if (payload.role !== "admin") return { ok: false, error: "Forbidden" };
    return { ok: true, userId: payload.userId };
  } catch (e) {
    return { ok: false, error: "Unauthorized" };
  }
}

export async function GET(req) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.error === "Forbidden" ? 403 : 401 });
  await dbConnect();
  const sections = await Section.find({}).sort({ lessonNumber: 1 }).lean();
  const lessons = await Lesson.find({}).lean();
  return NextResponse.json({ sections, lessons });
}

export async function POST(req) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.error === "Forbidden" ? 403 : 401 });
  await dbConnect();
  const body = await req.json();
  const { type } = body;
  if (type === "section") {
    const { id, name, description, lessonNumber } = body;
    const created = await Section.create({ id, name, description, lessonNumber });
    return NextResponse.json({ section: created });
  }
  if (type === "lesson") {
    const { sectionId, id, title, description, difficulty, estimatedTime, content } = body;
    const created = await Lesson.create({ sectionId, id, title, description, difficulty, estimatedTime, content });
    return NextResponse.json({ lesson: created });
  }
  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function PUT(req) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.error === "Forbidden" ? 403 : 401 });
  await dbConnect();
  const body = await req.json();
  const { type } = body;
  if (type === "section") {
    const { id, ...rest } = body;
    const updated = await Section.findOneAndUpdate({ id }, rest, { new: true });
    return NextResponse.json({ section: updated });
  }
  if (type === "lesson") {
    const { id, ...rest } = body;
    const updated = await Lesson.findOneAndUpdate({ id }, rest, { new: true });
    return NextResponse.json({ lesson: updated });
  }
  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}

export async function DELETE(req) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.error === "Forbidden" ? 403 : 401 });
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  if (!type || !id) return NextResponse.json({ error: "Missing params" }, { status: 400 });
  if (type === "section") {
    await Section.deleteOne({ id });
    await Lesson.deleteMany({ sectionId: id });
    return NextResponse.json({ ok: true });
  }
  if (type === "lesson") {
    await Lesson.deleteOne({ id });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}


