import { Helmet } from "react-helmet-async";
import useUsers from "../../../hooks/useUsers";

const Instructors = () => {
  const [users, , refetch] = useUsers();

  const instructorusers = users.filter((user) => user.role === "instructor");

  return (
    <div>
      <Helmet>
        <title>Summer Camp School | Instructors</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {instructorusers.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-300 h-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="text-sm opacity-50">{user.email}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructors;
