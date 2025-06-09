
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");
    const email = formData.get("email");
    const password = formData.get("password");
    const rePassword = formData.get("rePassword");
    const states = formData.get("states");
    const city = formData.get("city");
    const profile = formData.get("profile");

    const errors = {};

    if (!name || !name.trim()) {
      errors.name = "Name is required";
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }

    if (!email || !email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!rePassword) {
      errors.rePassword = "Please re-enter your password";
    } else if (password !== rePassword) {
      errors.rePassword = "Passwords do not match";
    }

    if (!states) {
      errors.states = "State is required";
    }

    if (!city || !city.trim()) {
      errors.city = "City is required";
    }

    if (!profile) {
      errors.profile = "Profile picture is required";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("testdb");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ phoneNumber }, { email }],
    });
    if (existingUser) {
      if (existingUser.phoneNumber === phoneNumber) {
        errors.phoneNumber = "Phone number already exists";
      }
      if (existingUser.email === email) {
        errors.email = "Email already exists";
      }
      return NextResponse.json({ errors }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const profilePath = profile ? `/uploads/${profile.name}` : null;

    const user = {
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      states,
      city: city.trim(),
      profile: profilePath,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(user);

    return NextResponse.json(
      {
        message: "Account created successfully",
        userId: result.insertedId,
        phone: phoneNumber,
        password,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in signup API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("testdb");
    await db.command({ ping: 1 });
    return NextResponse.json({ message: "MongoDB connection successful" });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json({ error: "MongoDB connection failed" }, { status: 500 });
  }
}
