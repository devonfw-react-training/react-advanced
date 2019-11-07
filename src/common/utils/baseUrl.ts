const PROTOCOL: string = "http"
const HOST: string = "localhost"
const PORT: number = 8000

export const baseUrl = (endpoint: string): string =>
  `${PROTOCOL}://${HOST}:${PORT}/${endpoint}`
