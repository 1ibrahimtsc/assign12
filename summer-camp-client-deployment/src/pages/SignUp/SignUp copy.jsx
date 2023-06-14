import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [confirmPassword, setConfirmPassword] = useState("");
  const { createUser, updateUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Please make sure your passwords match",
      });
      return;
    }

    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);

      updateUserData(data.name, data.photoURL)
        .then(() => {
          const saveUser = { name: data.name, email: data.email };
          fetch("http://127.0.0.1:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Summer Camp School | Sign Up</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-5xl font-bold text-center">
            Fill up form to Sign up!
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                {...register("name", { required: true })}
                placeholder="Name"
                className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-600">Name is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="photoURL"
                className="block text-gray-700 font-bold"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                {...register("photoURL", { required: true })}
                placeholder="Photo URL"
                className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.photoURL && (
                <span className="text-red-600">Photo URL is required</span>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-red-600">Email is required</span>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                })}
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 12 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-600">
                  Password must have one uppercase, one number, and one special
                  character.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-bold"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword", { required: true })}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 mt-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword?.type === "required" && (
                <p className="text-red-600">Confirm Password is required</p>
              )}
              {errors.confirmPassword?.type === "validate" && (
                <p className="text-red-600">Passwords do not match</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 text-white font-bold bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default SignUp;

/*

<div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-600">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-600">Password must be 6 characters</p>
                )}
                {errors.password?.type === "maxLength" && (
                  <p className="text-red-600">
                    Password must be less than 12 characters
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-red-600">
                    Password must have one Uppercase one number and one special
                    character.
                  </p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="confirm password"
                  className="input input-bordered"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword?.type === "required" && (
                  <p className="text-red-600">Confirm Password is required</p>
                )}
                {errors.confirmPassword?.type === "validate" && (
                  <p className="text-red-600">Passwords do not match</p>
                )}
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <p>
              <small>
                Already have an account <Link to="/login">Login</Link>
              </small>
            </p>
          </div>
        </div>
      </div>

*/
