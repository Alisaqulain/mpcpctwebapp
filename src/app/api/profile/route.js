// /src/app/api/profile/route.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");

    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    // Verify the JWT token
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    console.log("Token payload:", payload);
    
    await dbConnect();

    // Get user data from database
    const user = await User.findById(payload.userId).select('-password');
    console.log("User found:", user ? "Yes" : "No");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileUrl: user.profileUrl,
        states: user.states,
        city: user.city
      }
    });

  } catch (err) {
    console.error("Profile error:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
