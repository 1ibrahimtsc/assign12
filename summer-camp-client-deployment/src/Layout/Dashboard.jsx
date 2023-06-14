import { NavLink, Outlet } from "react-router-dom";
import { FaWallet, FaHome, FaUtensils, FaUsers } from "react-icons/fa";

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
      <div className="drawer-side bg-[#fdba74]">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminhome">
                  <FaHome></FaHome> Admin Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageclasses">
                  <FaWallet></FaWallet> Manage Classes
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/manageusers">
                  <FaUsers></FaUsers> All Users
                </NavLink>
              </li>
            </>
          ) : isInstructor ? (
            <>
              <li>
                <NavLink to="/dashboard/addClasses">
                  {" "}
                  <FaUtensils></FaUtensils> Add an Class
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myclasses">
                  <FaWallet></FaWallet> My Classes
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/myselectedclasses">
                  {" "}
                  <FaUtensils></FaUtensils>My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/enrolledclasses">
                  <FaWallet></FaWallet> My Enrolled Classes
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
