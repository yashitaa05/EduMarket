import { useState } from "react";
import { uploadMaterial } from "../api/material";

const UploadMaterial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [pdf, setPdf] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("pdf", pdf);
      formData.append("thumbnail", thumbnail);

      await uploadMaterial(formData);

      alert("Material uploaded successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setPdf(null);
      setThumbnail(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload Material
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setPdf(e.target.files[0])
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setThumbnail(e.target.files[0])
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading
            ? "Uploading..."
            : "Upload Material"}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterial;