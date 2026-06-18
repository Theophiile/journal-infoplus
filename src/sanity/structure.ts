import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      S.listItem()
        .title("Articles")
        .child(
          S.documentTypeList("article")
            .title("Articles")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      S.listItem().title("Rubriques").child(S.documentTypeList("category").title("Rubriques")),
    ]);
