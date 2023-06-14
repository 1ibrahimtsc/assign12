import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";

const AddClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const { user } = useContext(AuthContext);

  const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const { name, seats, price } = data;
    const newClass = {
      name,
      image: imageURL,
      instructor: user.displayName,
      instructorEmail: user.email,
      availableSeats: parseInt(seats),
      price: parseFloat(price),
    };

    axiosSecure.post("/classes", newClass).then((data) => {
      console.log("after posting new class", data.data);
      if (data.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Class added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleImageUpload = (event) => {
    const formData = new FormData();
    formData.append("image", event.target.files[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          setImageURL(imgURL);
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Class Image*</span>
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">
              Instructor Name (Read-only)
            </span>
          </label>
          <input
            type="text"
            value={user.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">
              Instructor Email (Read-only)
            </span>
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex my-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Available Seats*</span>
            </label>
            <input
              type="number"
              {...register("seats", { required: true })}
              placeholder="Available Seats"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <input className="btn btn-sm mt-4" type="submit" value="Add Class" />
      </form>
    </div>
  );
};

export default AddClass;

/*


import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
//import {users}

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newClass = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: imgURL,
          };
          console.log(newClass);
          axiosSecure.post("/classes", newClass).then((data) => {
            console.log("after posting new class", data.data);
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Class added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
  };

  return (
    <div className="w-full px-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("name", { required: true, maxLength: 150 })}
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Instructor Name</span>
          </label>
          <input
            type="text"
            placeholder="Instructor Name"
            value={user.displayName}
            {...register("instructor", { required: true })}
            className="input input-bordered w-full "
          />
        </div>

        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              defaultValue="Pick One"
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled>Pick One</option>
              <option>Pizza</option>
              <option>Soup</option>
              <option>Salad</option>
              <option>Dessert</option>
              <option>Desi</option>
              <option>Drinks</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Recipe Details</span>
          </label>
          <textarea
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <input className="btn btn-sm mt-4" type="submit" value="Add Item" />
      </form>
    </div>
  );
};

export default AddClasses;

*/
