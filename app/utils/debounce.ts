export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  debounceTime = 0,
) => {
  let delayTime: ReturnType<typeof setTimeout>;

  return function (this: unknown, ...args: Parameters<T>) {
    const context = this;

    if (delayTime) {
      clearTimeout(delayTime);
    }

    delayTime = setTimeout(() => {
      fn.apply(context, args);
    }, debounceTime);
  };
};
