import { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Index = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const handleUpdate = () => {
    updateUserProfile(name, photoURL)
      .then(() => {
        console.log("Profile updated successfully!");
      })
      .catch((error) => {
        console.log("Error updating profile: ", error);
      });
  };

  useEffect(() => {}, []);
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="py-52 flex flex-col justify-center items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered"
                required
                // value={user?.displayName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Upload Profile Photo</span>
              </label>
              <input
                type="text"
                placeholder="image"
                className="input input-bordered"
                required
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-red text-white" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
