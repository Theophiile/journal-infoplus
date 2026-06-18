import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description:
        "Généré automatiquement à partir du titre. Cliquez sur « Generate ».",
    }),
    defineField({
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif (description de l'image)",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "category",
      title: "Rubrique",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "excerpt",
      title: "Chapô / résumé",
      type: "text",
      rows: 3,
      description: "Court résumé affiché sur la page d'accueil (optionnel).",
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Contenu de l'article",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraphe", value: "normal" },
            { title: "Titre", value: "h2" },
            { title: "Sous-titre", value: "h3" },
            { title: "Citation", value: "blockquote" },
          ],
          lists: [
            { title: "Liste à puces", value: "bullet" },
            { title: "Liste numérotée", value: "number" },
          ],
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Date de publication (récent → ancien)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "mainImage",
    },
  },
});
