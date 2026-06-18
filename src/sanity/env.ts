export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Vrai uniquement quand un projet Sanity a été configuré dans .env.local.
 * Permet au site de s'afficher (état vide) tant que la config n'est pas faite.
 */
export const isSanityConfigured = projectId.length > 0;
