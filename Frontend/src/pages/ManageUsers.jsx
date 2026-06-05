import { useEffect, useState } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "../api/admin";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
  try {
    const data = await getAllUsers();
    setUsers(data.users || []);
  } catch (error) {
    console.error("Fetch users failed:", error);
  }
};

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users 👥</h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm">Role: {user.role}</p>
            </div>

            <div className="flex gap-2">
              <select
                value={user.role}
                onChange={(e) =>
                  handleRoleChange(user._id, e.target.value)
                }
                className="border px-2 py-1"
              >
                <option value="student">Student</option>
                <option value="creator">Creator</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;