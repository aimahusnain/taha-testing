import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const user = await prisma.user.create({ data: { name } });

    return NextResponse.json({ message: "User created", user }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error); // 👈 Add this line
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
