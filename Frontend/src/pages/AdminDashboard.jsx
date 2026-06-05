import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import { getPendingMaterials, approveMaterial, deleteMaterial } from "../api/admin";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const data = await getPendingMaterials();
      setPending(data.materials || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    await approveMaterial(id);
    fetchPending();
  };

  const handleDelete = async (id) => {
    await deleteMaterial(id);
    fetchPending();
  };

  if (loading) return <h2>Loading Admin Panel...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Admin Control Panel 🛡
      </h1>

      

      {pending.length === 0 ? (
        <p>No pending approvals</p>
      ) : (
        <div className="space-y-4">
          {pending.map((m) => (
            <div key={m._id} className="border p-4 rounded-xl">
              <h2 className="font-bold text-lg">{m.title}</h2>
              <p>{m.description}</p>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleApprove(m._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleDelete(m._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;