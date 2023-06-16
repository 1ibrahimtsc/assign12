import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMyClasses from "../../../hooks/useMyClasses";
import SectionTitle from "../../../hooks/SectionTitle";

const MyClasses = () => {
  const [myClasses, , refetch] = useMyClasses();
  const [axiosSecure] = useAxiosSecure();

  return (
    <div className="w-full">
      <SectionTitle heading="My Classes Page" subHeading="Welcome" />
      <div className="overflow-x-auto w-full">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Price</th>
              <th>Status</th>
              <th>Total Enrolled</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myClasses.map((myClass) => (
              <tr key={myClass._id}>
                <td>
                  <img
                    src={myClass.image}
                    alt={myClass.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td>{myClass.name}</td>
                <td>{myClass.instructor}</td>
                <td>{myClass.instructorEmail}</td>
                <td>{myClass.price}</td>
                <td>{myClass.status}</td>
                <td>
                  {myClass.totalenrolledstudent
                    ? myClass.totalenrolledstudent
                    : 0}
                </td>
                <td>
                  {myClass.status === "denied" && <p>{myClass.feedback}</p>}
                </td>
                <td>
                  {myClass.status === "denied" && (
                    <button className="btn btn-primary">Update</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
