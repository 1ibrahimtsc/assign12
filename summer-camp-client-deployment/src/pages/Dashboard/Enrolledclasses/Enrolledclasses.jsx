import SectionTitle from "../../../hooks/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";

const Enrolledclasses = () => {
  const [users, , refetch] = useUsers();
  const [axiosSecure] = useAxiosSecure();

  return (
    <div className="w-full">
      <SectionTitle heading="Enrolled Classes" subHeading="Welcome" />
      <div className="overflow-x-auto w-full">ffffffffff</div>
    </div>
  );
};

export default Enrolledclasses;
