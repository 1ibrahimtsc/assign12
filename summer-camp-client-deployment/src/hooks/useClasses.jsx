import { useQuery } from "@tanstack/react-query";

const useClasses = () => {
  const {
    data: classes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:5000/classes");
      return res.json();
    },
  });

  return [classes, loading, refetch];
};

export default useClasses;
