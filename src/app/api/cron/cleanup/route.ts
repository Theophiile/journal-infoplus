import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { data: expired, error: fetchError } = await supabaseAdmin
    .from("articles")
    .select("id, image_path")
    .lt("expires_at", new Date().toISOString());

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!expired || expired.length === 0) {
    return NextResponse.json({ deleted: 0 });
  }

  const paths = expired.map((a) => a.image_path);
  await supabaseAdmin.storage.from("articles").remove(paths);

  const ids = expired.map((a) => a.id);
  const { error: deleteError } = await supabaseAdmin
    .from("articles")
    .delete()
    .in("id", ids);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: ids.length });
}
