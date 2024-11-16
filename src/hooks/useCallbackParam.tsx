import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const useCallbackParam = (): string => {
  const searchParams = useSearchParams();
  const [callback, setCallback] = useState<string>("");

  useEffect(() => {
    const param = searchParams.get("callback") ?? "";
    setCallback(param);
  }, [searchParams]);

  return callback;
};

export default useCallbackParam;
