import { useQuery } from "@tanstack/react-query";

const useUsers = () => {
  const {
    data: classes = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:5000/users");
      return res.json();
    },
  });

  return [classes, loading, refetch];
};

export default useUsers;
