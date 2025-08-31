import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Hardcoded admin credentials (requested)
    const adminName = "Admin";
    const adminEmail = "admin@mpcpct.com";
    const adminPhone = "9999999999";
    const adminPassword = "Admin@12345";
    const adminState = "NA";
    const adminCity = "NA";

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


