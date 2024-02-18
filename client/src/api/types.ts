export type TFetchResult<T> = Promise<{ data: T | null; error: unknown }>;
