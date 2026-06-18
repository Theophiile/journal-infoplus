import {
  PortableText as BasePortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import type { PortableTextBlock, SanityImage } from "@/sanity/lib/fetch";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={value.alt || ""}
            width={1200}
            height={800}
            className="w-full h-auto rounded-sm"
          />
          {value.alt ? (
            <figcaption className="mt-2 text-sm text-muted text-center">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null;
  return (
    <div className="prose-article">
      <BasePortableText value={value as never} components={components} />
    </div>
  );
}
