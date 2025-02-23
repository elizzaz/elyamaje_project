if (!process.env.API_URL) {
  throw new Error('API_URL environment variable is not defined')
}

export const env = {
  api: {
    url: process.env.API_URL,
  },
} as const 