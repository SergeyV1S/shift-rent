export const getChangedFields = <T extends Record<string, any>>(original: T, updated: T) =>
  Object.fromEntries(
    Object.entries(updated).filter(
      ([key, value]) => value !== undefined && value !== original[key as keyof T]
    )
  ) as T;
