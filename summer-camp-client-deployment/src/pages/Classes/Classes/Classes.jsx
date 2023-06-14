import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const Classes = () => {
  const [classes, , refetch] = useClasses();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const handleAddToCart = (classItem) => {
    console.log(classItem);
    if (user && user.email) {
      const cartItem = {
        classId: classItem._id,
        name: classItem.name,
        image: classItem.image,
        price: classItem.price,
        email: user.email,
      };

      if (classItem.availableSeats === 0) {
        alert("This class is full");
      } else if (isAdmin || isInstructor) {
        alert("You cannot select this class");
      } else {
        // TODO: Select class
        //?email=${user?.email}
        axiosSecure
          .post(`/carts?email=${user?.email}`, cartItem)
          .then((data) => {
            if (data.data.insertedId) {
              console.log(
                "--------------------after selected new class-----------------",
                data.data
              );
              refetch(); // refetch cart to update the number of items in the cart
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class selected successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    } else {
      Swal.fire({
        title: "Please login to select the class",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          Navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="flex">
      {classes
        .filter((classItem) => classItem.status === "approved")
        .map((classItem, index) => (
          <div
            key={index}
            className={`card bg-base-400 w-1/4 shadow-xl ${
              classItem.availableSeats === 0 ? "bg-red-400" : ""
            }`}
          >
            <figure>
              <img src={classItem.image} alt="Class Image" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{classItem.name}</h2>
              <p>Instructor: {classItem.instructor}</p>
              <p>Available Seats: {classItem.availableSeats}</p>
              <p>Price: {classItem.price}</p>
              {!user && <p>Please log in to select this class</p>}

              {user && (
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    disabled={
                      classItem.availableSeats === 0 || isAdmin || isInstructor
                    }
                    onClick={() => handleAddToCart(classItem)}
                  >
                    Select Class
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Classes;

/*


 () => {
                      if (classItem.availableSeats === 0) {
                        alert("This class is full");
                      } else if (isAdmin || isInstructor) {
                        alert("You cannot select this class");
                      } else {
                        // TODO: Select class
                      }
                    }



<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>



import { useContext } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useClasses from "../../../hooks/useClasses";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";

const Classes = () => {
  const [classes, , refetch] = useClasses();
  const [axiosSecure] = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  return (
    <div>
      {/*
        if classes status is aproved, then here will display image, name, instructor, availableSeats, price, select button form classes array using map.

        If the user is not logged in (truty value), then tell the user to log in before selecting the course. This button will be disabled if:
	Available seats are 0
	Logged in as admin/instructor
o	The class card background will be red if the available seats are 0.
*/
/*
}
    </div>
  );
};

export default Classes;

*/
