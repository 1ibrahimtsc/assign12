import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  const isStudent = user && !isAdmin && !isInstructor;
  /*
  let isStudent;
  const isAdmin = false;
  const isInstructor = false;
  if (user && !isAdmin) {
    isStudent = true;
  }

  if (user && !isInstructor) {
    isStudent = true;
  }
*/
  console.log("---------from StudentRoute-----------", isAdmin);

  const location = useLocation();

  if (loading) {
    return <progress className="progress w-56"></progress>;
  }

  if (isStudent) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;
