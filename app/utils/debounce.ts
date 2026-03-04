type DebouncedFunction<T extends (...args: any[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  debounceTime = 0,
): DebouncedFunction<T> {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = ((...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, debounceTime);
  }) as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  return debounced;
}
