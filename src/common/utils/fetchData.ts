import { baseUrl } from "."

const handleError = (res: Response) => {
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  return res
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time))

export const fetchData = (endpoint: string) =>
  fetch(baseUrl(endpoint))
    .then(handleError)
    .then(res => res.json())
