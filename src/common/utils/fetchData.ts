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

export const fetchData = (endpoint: string, method = "GET", body?: any) =>
  fetch(baseUrl(endpoint), { method, headers, body: JSON.stringify(body) })
    .then(handleError)
    .then(res => res.json())
