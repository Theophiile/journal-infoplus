import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: article, error: fetchError } = await supabaseAdmin
    .from("articles")
    .select("image_path")
    .eq("id", id)
    .single();

  if (fetchError || !article) {
    return NextResponse.json({ error: "Article introuvable" }, { status: 404 });
  }

  await supabaseAdmin.storage.from("articles").remove([article.image_path]);

  const { error: deleteError } = await supabaseAdmin
    .from("articles")
    .delete()
    .eq("id", id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
