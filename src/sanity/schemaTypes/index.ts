import { type SchemaTypeDefinition } from "sanity";

import { article } from "./article";
import { category } from "./category";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, category],
};
