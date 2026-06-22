import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await supabaseAdmin.rpc("increment_views", { article_id: id });

  return NextResponse.json({ success: true });
}
