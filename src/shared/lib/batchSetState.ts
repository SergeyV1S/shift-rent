export const batchSetState = <T extends Record<string, any>>(
  set: (partial: Partial<T> | ((state: T) => Partial<T>)) => void,
  field: keyof T | Array<keyof T>,
  value: T[keyof T] | Array<T[keyof T]>
) => {
  if (Array.isArray(field) && Array.isArray(value)) {
    if (field.length !== value.length) {
      return;
    }

    const updates = field.reduce(
      (acc, f, index) => ({
        ...acc,
        [f]: value[index]
      }),
      {}
    );

    set(updates);
  } else if (!Array.isArray(field) && !Array.isArray(value)) {
    set({ [field]: value } as Partial<T>);
  } else {
    console.error("Невозможное действие");
  }
};
