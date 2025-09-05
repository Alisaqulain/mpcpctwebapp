import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscription from "@/lib/models/Subscription";
import User from "@/lib/models/User";
import { verifyJWT } from "@/lib/auth";

export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ hasAccess: false, reason: "no_token" }, { status: 401 });
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ hasAccess: false, reason: "invalid_token" }, { status: 401 });
    }

    const { type, examType } = await request.json();

    await dbConnect();
    
    // Get user to check if they're admin
    const user = await User.findById(decoded.userId);
    if (user?.role === "admin") {
      return NextResponse.json({ hasAccess: true, reason: "admin" });
    }

    // Check if user has active subscription
    const subscription = await Subscription.findOne({
      userId: decoded.userId,
      type,
      status: "active",
      endDate: { $gt: new Date() }
    });

    if (subscription) {
      return NextResponse.json({ 
        hasAccess: true, 
        reason: "subscription",
        subscription: {
          plan: subscription.plan,
          endDate: subscription.endDate
        }
      });
    }

    // Check if this is free content (first item in each category)
    // For now, we'll consider all content as paid if no subscription
    const hasAccess = false;
    const reason = "no_subscription";

    return NextResponse.json({ hasAccess, reason });
  } catch (error) {
    console.error("Access check error:", error);
    return NextResponse.json({ hasAccess: false, reason: "error" }, { status: 500 });
  }
}
