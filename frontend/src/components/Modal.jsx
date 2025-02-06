import { useState, useContext } from "react";
import googleIcon from "./icons/GoogleIcon";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router";

const Modal = ({ name }) => {
  const {
    login,
    createUser,
    signUpWithGoogle,
    signUpWithGithub,
    signUpWithFacebook,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!isSignUp) {
      // หากเป็นการล็อกอิน
      login(data.email, data.password).then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("signin").close();
        navigate(from, { replace: true });
      });
    } else {
      // หากเป็นการสมัครสมาชิก
      createUser(data.email, data.password).then((result) => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          icon: "success",
          title: "Register Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("signup").close();
        navigate(from, { replace: true });
      });
    }
  };

  const googleSignUp = () => {
    signUpWithGoogle().then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Google Sign Up Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("signin").close();
      navigate(from, { replace: true });
    });
  };

  const githubSignUp = () => {
    signUpWithGithub().then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Github Sign Up Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("signup").close();
      navigate(from, { replace: true });
    });
  };

  const facebookSignUp = () => {
    signUpWithFacebook().then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        icon: "success",
        title: "Facebook Sign Up Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("signup").close();
      navigate(from, { replace: true });
    });
  };

  return (
    <div>
      <dialog id={name} className="modal">
        <div className="modal-box">
          <div className="modal-action mt-0 flex flex-col justify-center p-2">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              method="dialog"
              onClick={() => document.getElementById(name).close()}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg">
              {isSignUp ? "Sign Up" : "Sign In"}
            </h3>
            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  {...register("email", { required: true })}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  {...register("password", { required: true })}
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-red text-white">
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
            <p className="text-center">
              {isSignUp ? (
                <>
                  Already have an account?{" "}
                  <a
                    className="link link-hover"
                    onClick={() => setIsSignUp(false)} // เปลี่ยนเป็น Login
                  >
                    Sign In
                  </a>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <a
                    className="link link-hover"
                    onClick={() => setIsSignUp(true)} // เปลี่ยนเป็น Sign Up
                  >
                    Sign Up Now
                  </a>
                </>
              )}
            </p>
          </div>

          <div className="text-center space-x-2 mt-5">
            <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
              <FaGoogle className="size-5" onClick={googleSignUp} />
            </button>
            <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
              <FaFacebook className="size-5" onClick={facebookSignUp} />
            </button>
            <button className="btn btn-circle btn-ghost hover:bg-red hover:text-white">
              <FaGithub className="size-5" onClick={githubSignUp} />
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
