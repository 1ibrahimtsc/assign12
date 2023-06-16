import { NavLink, Outlet } from "react-router-dom";

import useAdmin from "../hooks/useAdmin";
//import useStudent from "../hooks/useStudent";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  //const [isStudent] = useStudent();
  const [isInstructor] = useInstructor();

  return (
    <div className="drawer drawer-mobile ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side bg-red-400">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">Admin Home</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageclasses">Manage Classes</NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageusers">All Users</NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
              <li>
                <NavLink to="/dashboard/instructorhome">
                  Instructor Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addClasses">Add an Class</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myclasses">My Classes</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userhome">User Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myselectedclasses">
                  My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/enrolledclasses">
                  My Enrolled Classes
                </NavLink>
              </li>
            </>
          )}

          <div className="divider">OR</div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
