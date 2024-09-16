import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Apply next-auth middleware
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*"], // Apply middleware to all /admin routes
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {

    return NextResponse.redirect(`${req.nextUrl.origin}/404`);
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  if (token.email !== adminEmail) {

    return NextResponse.redirect(`${req.nextUrl.origin}/404`);
  }


  return NextResponse.next();
}
