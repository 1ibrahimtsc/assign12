import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useMySelectedClasses = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: myselectedclasses = [] } = useQuery({
    queryKey: ["myselectedclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myselectedclasses?email=${user?.email}`);

      return res.data;
    },
  });

  return [myselectedclasses, refetch];
};
export default useMySelectedClasses;
