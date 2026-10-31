import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "sitepulse_session";
const SESSION_DURATION = 7 * 24 * 60 * 60; // 7 days

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must be configured and contain at least 32 characters.",
    );
  }

  return secret;
}

// Create JWT and store it in an HTTP-only cookie
export async function createSession(userId) {
  const token = jwt.sign(
    {
      userId: userId.toString(),
    },
    getJwtSecret(),
    {
      expiresIn: SESSION_DURATION,
      algorithm: "HS256",
    },
  );

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });

  return token;
}

// Verify JWT and return session information
export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });

    if (!decoded || typeof decoded === "string" || !decoded.userId) {
      return null;
    }

    return {
      userId: decoded.userId,
    };
  } catch (error) {
    return null;
  }
}

// Destroy session
export async function destroySession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
