"use client";

import { useEffect } from "react";

export function ViewTracker({ articleId }: { articleId: string }) {
  useEffect(() => {
    fetch(`/api/articles/${articleId}/view`, { method: "POST" });
  }, [articleId]);

  return null;
}
