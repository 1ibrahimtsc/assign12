import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;

      const saveUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(saveUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-center">
        <div className="w-full border-t border-gray-300"></div>
        <div className="mx-4 text-gray-500">or</div>
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full text-white hover:bg-red-700"
        >
          <FaGoogle className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
