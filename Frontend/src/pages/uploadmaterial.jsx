import { useState, useRef } from "react";
import { uploadMaterial } from "../api/material";

const UploadMaterial = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [pdf, setPdf] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const pdfRef = useRef();
  const thumbnailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !subject || !price || !pdf) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subject", subject);
      formData.append("price", Number(price));
      formData.append("pdf", pdf);
      formData.append("thumbnail", thumbnail);

      await uploadMaterial(formData);

      alert("Material uploaded successfully");

      // reset fields
      setTitle("");
      setDescription("");
      setCategory("");
      setSubject("");
      setPrice("");
      setPdf(null);
      setThumbnail(null);

      // reset file inputs visually
      if (pdfRef.current) pdfRef.current.value = "";
      if (thumbnailRef.current) thumbnailRef.current.value = "";
    } catch (error) {
      console.log("Upload Error:", error?.response?.data || error.message);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upload Material
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />

        <input
          type="file"
          accept=".pdf"
          ref={pdfRef}
          onChange={(e) => setPdf(e.target.files[0])}
        />

        <input
          type="file"
          accept="image/*"
          ref={thumbnailRef}
          onChange={(e) => setThumbnail(e.target.files[0])}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Uploading..." : "Upload Material"}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterial;