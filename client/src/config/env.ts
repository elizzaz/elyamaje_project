export const env = {
  api: {
    url: process.env.API_URL || "http://localhost:3000", // Utilisé côté serveur
  },
  client: {
    url: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Utilisé côté client
  },
} as const;
