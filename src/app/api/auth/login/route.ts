import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, SESSION_COOKIE, SESSION_MAX_AGE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const hashB64 = process.env.ADMIN_PASSWORD_HASH;
  if (!hashB64) {
    return NextResponse.json(
      { error: "Admin non configuré. Ajoutez ADMIN_PASSWORD_HASH dans .env.local" },
      { status: 500 }
    );
  }

  const hash = Buffer.from(hashB64, "base64").toString("utf8");
  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  const token = await signToken();

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return response;
}
