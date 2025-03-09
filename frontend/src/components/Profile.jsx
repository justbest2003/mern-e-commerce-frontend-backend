import React from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import useCart from "../hooks/useCart";

const Profile = () => {
  const { user, logout, getUser } = useContext(AuthContext);
  const [cart, setCart] = useCart();
  const userInfo = getUser();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <a href="/cart" role="button" className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">
              {cart.length || 0}
            </span>
          </div>
        </a>
      </div>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {user?.photoURL ? (
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} alt="User Photo Profile" />
              </div>
            ) : (
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          {userInfo?.role === "admin" && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          <li>
            <a className="justify-between" href="/profile">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a href="/update-profile">Settings</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Profile;
