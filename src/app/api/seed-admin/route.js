import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

// Protect with a token so only authorized ops can seed
const SEED_TOKEN = process.env.SEED_TOKEN;

export async function POST(request) {
  try {
    if (!SEED_TOKEN) {
      return NextResponse.json({ error: "SEED_TOKEN not set" }, { status: 500 });
    }

    const headerToken = request.headers.get("x-seed-token");
    if (!headerToken || headerToken !== SEED_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminName = process.env.ADMIN_NAME || "Administrator";
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPhone = process.env.ADMIN_PHONE;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminState = process.env.ADMIN_STATE || "NA";
    const adminCity = process.env.ADMIN_CITY || "NA";

    if (!adminEmail || !adminPhone || !adminPassword) {
      return NextResponse.json({ error: "Missing ADMIN_* env vars" }, { status: 400 });
    }

    await dbConnect();

    let user = await User.findOne({ $or: [{ email: adminEmail }, { phoneNumber: adminPhone }] });

    const hashed = await bcrypt.hash(adminPassword, 10);

    if (!user) {
      user = new User({
        name: adminName,
        email: adminEmail,
        phoneNumber: adminPhone,
        password: hashed,
        states: adminState,
        city: adminCity,
        profileUrl: "",
        role: "admin",
      });
      await user.save();
      return NextResponse.json({ message: "Admin created", id: user._id });
    } else {
      // ensure role is admin and password matches env
      user.role = "admin";
      user.password = hashed;
      user.name = adminName;
      user.states = adminState;
      user.city = adminCity;
      await user.save();
      return NextResponse.json({ message: "Admin updated", id: user._id });
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


