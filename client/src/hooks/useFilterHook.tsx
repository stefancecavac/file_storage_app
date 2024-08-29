import { useSearchParams } from "react-router-dom";

const useFilterHook = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q");
  const type = searchParams.get("type");

  const setQ = (q: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      params.set("q", q);
      return params;
    });
  };

  const setType = (type: string) => {
    setSearchParams((prevParams) => {
      const params = new URLSearchParams(prevParams);

      params.set("type", type);
      return params;
    });
  };

  return { q, setQ, setType, type };
};

export default useFilterHook;
