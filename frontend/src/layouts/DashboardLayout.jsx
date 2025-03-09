import {useContext}  from "react";
import { AuthContext } from "../context/AuthContext";
import { Outlet, useLocation, Link } from "react-router";
import logo from "/images/admin/logo.png";

import { MdDashboard } from "react-icons/md";
import { IoBagCheck } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const isAdmin = true;
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const handleLogout = () => {
    logout();
  };


  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col w-full p-4">
            {/* Breadcrumbs */}
            <nav className="text-sm breadcrumbs mb-4">
              <ul className="flex space-x-2">
                <li>
                  <Link to="/dashboard" className="text-blue-500">
                    Dashboard
                  </Link>
                </li>
                {pathSegments.slice(1).map((segment, index) => {
                  const path = `/dashboard/${pathSegments
                    .slice(1, index + 2)
                    .join("/")}`;
                  return (
                    <li key={index} className="flex items-center">
                      <span className="mx-2">/</span>
                      <Link to={path} className="text-blue-500 capitalize">
                        {segment}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a href="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="" className="w-20" />
                  <div className="badge badge-primary">Admin</div>
                </a>
              </li>
              <li>
                <div className="">Welcome Admin : <span className="font-bold text-red">{user.displayName}</span></div>
              <a onClick={handleLogout}>Logout</a>
            </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Menu</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/dashboard">
                  <MdDashboard />
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-orders">
                  <IoBagCheck />
                  Manage Orders
                </a>
              </li>
              <li>
                <a href="/dashboard/add-product">
                  <IoIosAddCircle />
                  Add Product
                </a>
              </li>
              <li>
                <a href="/dashboard/manage-items">
                  <MdDashboardCustomize />
                  Manage Items
                </a>
              </li>
              <li>
                <a href="/dashboard/all-users">
                  <FaUserCircle />
                  All Users
                </a>
              </li>
              <div className="relative flex py-5 items-center">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="flex-shrink mx-4 text-gray-400">Hot Link</span>
                <div className="flex-grow border-t border-gray-400"></div>
              </div>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a>Product</a>
              </li>
              <li>
                <a>Order Tracking</a>
              </li>
              <li>
                <a>Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>You are not an Admin! Back to Home</div>
      )}
    </div>
  );
};

export default DashboardLayout;
