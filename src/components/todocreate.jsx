import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://69b57fb8be587338e716048e.mockapi.io/reactcrud/users";

const TodoCreate = ({ fetchUsers }) => {
  const [formData, setFormData] = useState({ ad: "", soyad: "", yas: "", meslek: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      fetchUsers();
      setFormData({ ad: "", soyad: "", yas: "", meslek: "", email: "", password: "" });
    } catch (error) {
      alert("Ekleme hatası!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Yeni Kayıt</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {["ad","soyad","yas","meslek","email","password"].map((f) => (
          <input key={f} name={f} placeholder={f} value={formData[f]} onChange={handleChange} required className="border p-2 rounded w-full" type={f === "yas" ? "number" : f === "password" ? "password" : "text"} />
        ))}
        <button type="submit" className="bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">KAYDET</button>
      </form>
    </div>
  );
};

export default TodoCreate;