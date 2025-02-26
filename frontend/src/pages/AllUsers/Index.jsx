import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import Swal from "sweetalert2";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleToggleRole = async (email, currentRole) => {
    try {
      if (currentRole === "user") {
        await UserService.makeAdmin(email);
      } else {
        await UserService.makeUser(email);
      }

      // อัปเดต UI โดยเปลี่ยน role ใน state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email
            ? { ...user, role: currentRole === "user" ? "admin" : "user" }
            : user
        )
      );

      Swal.fire({
        icon: "success",
        title: `Role updated successfully!`,
        text: `${email} is now a ${currentRole === "user" ? "Admin" : "User"}.`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full table-zebra">
          <thead>
            <tr className="bg-base-200 text-base font-semibold text-center">
              <th>#</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="text-center">{index + 1}</td>
                <td>{user.email}</td>
                <td className="text-center">
                  <label className="flex items-center justify-center gap-2 cursor-pointer">
                    <span className="text-sm">
                      {user.role === "admin" ? "Admin" : "User"}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={user.role === "admin"}
                      onChange={() => handleToggleRole(user.email, user.role)}
                    />
                  </label>
                </td>
                <td>
                  <div className="flex flex-col items-center gap-2">
                    <button className="btn btn-warning btn-sm w-24">
                      Edit
                    </button>
                    <button className="btn btn-error btn-sm w-24">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
