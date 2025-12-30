export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  console.log("➡️ Signup API called");

  await dbConnect();
  console.log("✅ DB connected");

  const body = await req.json();
  console.log("📦 Body received:", body);

  const { name, email, password } = body;

  const existingUser = await User.findOne({ email });
  console.log("🔍 User check done");

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🔐 Password hashed");

  await User.create({ name, email, password: hashedPassword });
  console.log("✅ User created");

  return NextResponse.json(
    { message: "Signup successful" },
    { status: 201 }
  );
}
