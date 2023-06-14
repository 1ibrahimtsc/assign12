//import { useState } from "react";
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

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteselectedclasses/${item._id}`).then((res) => {
          console.log("deleted res", res.data);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Class has been deleted.", "success");
          }
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
                onClick={() => handleDelete(classItem)}
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
