export const ActionFactory = <T>(type: string) => ({
  type,
  create: (payload: T) => ({ type, payload }),
})
