// /src/app/api/signup/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/lib/cloudinary";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123"; // keep in .env

export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");
    const password = formData.get("password");
    const rePassword = formData.get("rePassword");
    const states = formData.get("states");
    const city = formData.get("city");
    const file = formData.get("profile");

    if (!name || !phoneNumber || !email || !password || !states || !city || !file) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password !== rePassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    const existing = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existing) {
      return NextResponse.json({ error: "Email or phone already exists." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }).end(buffer);
    });

    const imageUrl = uploadResult.secure_url;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      states,
      city,
      profileUrl: imageUrl,
    });

    await newUser.save();

    // ✅ Generate JWT
    const token = jwt.sign(
      {
        id: newUser._id,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set cookie
    const response = NextResponse.json({
      message: "Signup successful and logged in",
      user: {
        id: newUser._id,
        name: newUser.name,
        phone: newUser.phoneNumber,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;

  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
