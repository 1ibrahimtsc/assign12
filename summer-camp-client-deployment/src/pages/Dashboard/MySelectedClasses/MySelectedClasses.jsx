//import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { Link } from "react-router-dom";
import SectionTitle from "../../../hooks/SectionTitle";

const MySelectedClasses = () => {
  const [cart, refetch] = useCart();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const total = cart.reduce((sum, item) => item.price + sum, 0);

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
      <>
        <Helmet>
          <title>Summer Camp School | My Selected Classes</title>
        </Helmet>
        <SectionTitle heading="My Selected Classes" subHeading="Welcome" />
        <h1 className="w-full my-auto">My Selected Classes</h1>
        <div className="overflow-x-auto w-full">
          <h3 className="text-3xl">Total : {cart.length}</h3>
          <h3 className="text-3xl">Total Price: ${total}</h3>
          <Link to="/dashboard/payment">
            <button className="btn btn-warning btn-sm">PAY</button>
          </Link>
        </div>
      </>
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
  );
};

export default MySelectedClasses;
