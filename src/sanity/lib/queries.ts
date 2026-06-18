import { groq } from "next-sanity";

export const ARTICLES_QUERY = groq`*[_type == "article" && defined(slug.current)] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt,
  "category": category->title,
  "categorySlug": category->slug.current
}`;

export const ARTICLE_QUERY = groq`*[_type == "article" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt,
  body,
  "category": category->title,
  "categorySlug": category->slug.current
}`;

export const ARTICLE_SLUGS_QUERY = groq`*[_type == "article" && defined(slug.current)]{ "slug": slug.current }`;

// Rubriques qui contiennent au moins un article, triées par nom.
export const CATEGORIES_QUERY = groq`*[_type == "category" && defined(slug.current) && count(*[_type == "article" && references(^._id)]) > 0]{
  title,
  "slug": slug.current
} | order(title asc)`;

export const CATEGORY_QUERY = groq`*[_type == "category" && slug.current == $slug][0]{
  title,
  "slug": slug.current
}`;

export const CATEGORY_SLUGS_QUERY = groq`*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`;

export const ARTICLES_BY_CATEGORY_QUERY = groq`*[_type == "article" && defined(slug.current) && category->slug.current == $slug] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  excerpt,
  publishedAt,
  "category": category->title,
  "categorySlug": category->slug.current
}`;
