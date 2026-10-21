import { NextResponse, type NextRequest } from "next/server";
import { apk } from "@/lib/site";

/**
 * Stable download link (/download/apk) that forwards to wherever the APK
 * is hosted. Share this URL; swap hosting by changing APK_DOWNLOAD_URL.
 */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL(apk.fileUrl, request.url), 302);
}
