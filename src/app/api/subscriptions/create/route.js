import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Subscription from "@/lib/models/Subscription";
import Payment from "@/lib/models/Payment";
import { verifyJWT } from "@/lib/auth";
import User from "@/lib/models/User";
import { sendMail } from "@/lib/email";

export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { type, plan, amount, duration } = await request.json();

    if (!type || !plan || !amount || !duration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Calculate end date
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + duration);

    // Create subscription
    const subscription = new Subscription({
      userId: decoded.userId,
      type,
      status: "active",
      startDate: new Date(),
      endDate,
      plan,
      price: amount,
      paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    await subscription.save();

    // Create payment record
    const payment = new Payment({
      userId: decoded.userId,
      subscriptionId: subscription._id,
      amount,
      currency: "INR",
      status: "completed",
      paymentMethod: "razorpay",
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      gateway: "razorpay",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} ${plan} subscription`,
    });

    await payment.save();

    // Send confirmation email (best-effort)
    const user = await User.findById(decoded.userId);
    if (user?.email) {
      await sendMail({
        to: user.email,
        subject: `Subscription Activated: ${type} (${plan})`,
        html: `<p>Hi ${user.name || "User"},</p>
<p>Your subscription is now active.</p>
<ul>
  <li>Type: <strong>${type}</strong></li>
  <li>Plan: <strong>${plan}</strong></li>
  <li>Amount: <strong>₹${amount}</strong></li>
  <li>Valid till: <strong>${endDate.toDateString()}</strong></li>
</ul>
<p>Thank you for choosing us.</p>`,
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      subscription: {
        id: subscription._id,
        type: subscription.type,
        plan: subscription.plan,
        endDate: subscription.endDate,
      },
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 });
  }
}
