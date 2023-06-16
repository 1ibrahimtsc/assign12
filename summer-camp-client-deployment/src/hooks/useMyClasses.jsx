import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useMyClasses = () => {
  const { user, loading } = useAuth();
  // const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: myclasses = [] } = useQuery({
    queryKey: ["myclasses", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/myclasses?email=${user?.email}`);

      return res.data;
    },
  });

  return [myclasses, refetch];
};
export default useMyClasses;
