import { NextResponse } from "next/server";

import User from "@/models/User";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 },
      );
    }

    await connectDB();

    const user = await User.findById(session.userId).select(
      "_id name email createdAt",
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get user API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch user.",
      },
      { status: 500 },
    );
  }
}
