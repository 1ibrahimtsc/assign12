import SectionTitle from "../../../hooks/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUsers from "../../../hooks/useUsers";

const ManageUsers = () => {
  const [users, , refetch] = useUsers();
  const [axiosSecure] = useAxiosSecure();

  const handleMakeInstructor = (userId) => {
    axiosSecure.put(`/users/${userId}`, { role: "instructor" }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  const handleMakeAdmin = (userId) => {
    axiosSecure.put(`/users/${userId}`, { role: "admin" }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
      }
    });
  };

  return (
    <div className="w-full">
      <SectionTitle heading="Manage All Users" subHeading="Welcome" />
      <div className="overflow-x-auto w-full">
        {users.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-lg font-medium">{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <p>Role: {user.role}</p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="text-blue-800"
                onClick={() => handleMakeInstructor(user._id)}
                disabled={
                  user.role === "instructor" || user.role === "super-admin"
                }
              >
                Make Instructor
              </button>
              <button
                className="text-red-500"
                onClick={() => handleMakeAdmin(user._id)}
                disabled={user.role === "admin" || user.role === "super-admin"}
              >
                Make Admin
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
