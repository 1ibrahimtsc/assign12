import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMyClasses from "../../../hooks/useMyClasses";

const MyClasses = () => {
  const [myClasses, , refetch] = useMyClasses();
  const [axiosSecure] = useAxiosSecure();

  console.log("-----------myClasses---------", myClasses);

  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        {myClasses.map((myClass) => (
          <div
            key={myClass._id}
            className="flex items-center justify-between p-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={myClass.image}
                alt={myClass.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">{myClass.name}</h3>
                <p>Instructor: {myClass.instructor}</p>
                <p>Instructor Email: {myClass.instructorEmail}</p>
                <p>Price: {myClass.price}</p>
                <p>Status: {myClass.status}</p>
                <p>
                  Total Enrolled Students:{" "}
                  {myClass.enrolledStudents?.length
                    ? myClass.enrolledStudents?.length
                    : 0}
                </p>
                {myClass.status === "denied" && (
                  <p>Feedback: {myClass.feedback}</p>
                )}
              </div>
            </div>
            <div>
              {myClass.status === "denied" && (
                <button className="text-blue-500">Update</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
