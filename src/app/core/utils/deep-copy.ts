interface Object {
  clone: <T>() => this;
}

(Object.prototype as any).clone = function<T>(): T | T[] {
  if (Array.isArray(this)) {
    return JSON.parse(JSON.stringify(this)) as T[];
  }
  return JSON.parse(JSON.stringify(this)) as T;
}
