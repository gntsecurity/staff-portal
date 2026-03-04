import { NextResponse } from "next/server";
import { getCurrentUserOrThrow } from "@/lib/auth";


export async function GET(request: Request) {
  const user = getCurrentUserOrThrow(request);
  return NextResponse.json(user);
}
