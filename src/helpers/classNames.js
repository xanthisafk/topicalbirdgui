export function classNames(...args) {
  return args
    .flatMap(arg => {
      if (!arg) return [];
      if (typeof arg === "string") return [arg];
      if (typeof arg === "object")
        return Object.entries(arg)
          // eslint-disable-next-line no-unused-vars
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key);
      return [];
    })
    .join(" ");
}
