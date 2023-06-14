import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
//import useMySelectedClasses from "../../../hooks/useMySelectedClasses";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";

const MySelectedClasses = () => {
  const [cart, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  const handleRemoveClass = (classId) => {
    // Handle removal logic here
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make API call to remove the class
        axiosSecure(`/deleteselectedclasses?email=${user?.email}&id=${classId}`)
          .then(() => {
            Swal.fire("Deleted!", "Your class has been removed.", "success");
            refetch(); // Refetch the updated list of selected classes
          })
          .catch((error) => {
            Swal.fire(
              "Error",
              "An error occurred while removing the class.",
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="w-full">
      <h1 className="w-full my-auto">My Selected Classes</h1>
      <div className="overflow-x-auto w-full">
        {cart.map((classItem) => (
          <div
            key={classItem._id}
            className="flex items-center justify-between p-4 border-b"
          >
            <div className="flex items-center space-x-4">
              <img
                src={classItem.image}
                alt={classItem.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{classItem.name}</h3>
                <p className="text-sm text-gray-500">{classItem.instructor}</p>
                <p className="text-sm text-gray-500">
                  {classItem.instructorEmail}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="text-lg font-semibold">${classItem.price}</p>
              <p className="text-sm text-gray-500">{classItem.status}</p>
              <p className="text-sm text-gray-500">{classItem.feedback}</p>
              <p className="text-sm text-gray-500">
                {classItem.availableSeats} seats available
              </p>
              <button
                className="text-red-600"
                onClick={() => handleRemoveClass(classItem._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySelectedClasses;

/*
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import useMySelectedClasses from "../../../hooks/useMySelectedClasses";

const MySelectedClasses = () => {
  const [mySelectedClasses, , refetch] = useMySelectedClasses();
  const [axiosSecure] = useAxiosSecure();
  return (
    <div className="w-full">
      <div className="overflow-x-auto w-full">
        {
          // here will be display data from mySelectedClassed by map. have to display name, image, instructor, instructorEmail, price, status, feedback, availableSeats
        }
      </div>
    </div>
  );
};

export default MySelectedClasses;

*/
