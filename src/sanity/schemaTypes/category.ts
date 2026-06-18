import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Rubrique",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nom de la rubrique",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Identifiant (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
