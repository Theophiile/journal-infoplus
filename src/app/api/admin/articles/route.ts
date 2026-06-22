import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = formData.get("title") as string | null;
  const image = formData.get("image") as File | null;

  if (!title || !image) {
    return NextResponse.json(
      { error: "Titre et image obligatoires" },
      { status: 400 }
    );
  }

  const ext = image.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const filePath = `articles/${fileName}`;

  const arrayBuffer = await image.arrayBuffer();
  const { error: uploadError } = await supabaseAdmin.storage
    .from("articles")
    .upload(filePath, arrayBuffer, {
      contentType: image.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = supabaseAdmin.storage
    .from("articles")
    .getPublicUrl(filePath);

  const { data: article, error: dbError } = await supabaseAdmin
    .from("articles")
    .insert({
      title,
      image_url: urlData.publicUrl,
      image_path: filePath,
    })
    .select()
    .single();

  if (dbError) {
    await supabaseAdmin.storage.from("articles").remove([filePath]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({ article }, { status: 201 });
}
