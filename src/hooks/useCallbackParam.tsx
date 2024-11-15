import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useCallbackParam = (): string => {
  const searchParams = useSearchParams();
  const [callback, setCallback] = useState<string>("");

  useEffect(() => {
    const paramCallback = searchParams.get("callback") ?? "";
    setCallback(paramCallback);
  }, [searchParams]);

  return callback;
};

export default useCallbackParam;
