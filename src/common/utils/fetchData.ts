import { baseUrl } from "."

const headers = {
  "Content-Type": "application/json",
}

const handleError = (res: Response) => {
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

export const fetchData = (endpoint: string, options: any = {}) =>
  fetch(baseUrl(endpoint), {
    method: options.method || "GET",
    headers: { ...headers, ...options.headers },
    signal: options.signal,
    body: JSON.stringify(options.body),
  })
    .then(handleError)
    .then(res => res.json())
