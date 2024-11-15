import { useSearchParams } from "next/navigation";

let cache: string | null = null;
let promise: Promise<void> | null = null;

const useCallbackParam = (): string => {
  const searchParams = useSearchParams();

  if (cache) return cache;

  if (!promise) {
    promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        cache = searchParams.get("callback") ?? "";
        resolve();
      }, 500);
    });
  }

  throw promise;
};

export default useCallbackParam;
