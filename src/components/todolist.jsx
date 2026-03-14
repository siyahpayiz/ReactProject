import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://69b57fb8be587338e716048e.mockapi.io/reactcrud/users";

const TodoList = ({ users, fetchUsers }) => {
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({});

  const handleDelete = async (id) => {
    if (!window.confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (e) {
      alert("Silinemedi! (404 olabilir)");
    }
  };

  const startEdit = (user) => {
    setEditUser(user.id);
    setFormData(user);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editUser}`, formData);
      setEditUser(null);
      fetchUsers();
    } catch (e) {
      alert("Güncellenemedi!");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Edit Form */}
      {editUser && (
        <form onSubmit={handleUpdate} className="bg-yellow-50 p-6 rounded-lg shadow-md border-l-4 border-yellow-400">
          <h3 className="font-bold text-lg mb-3">Kullanıcı Güncelle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["ad","soyad","yas","meslek","email"].map(f => (
              <input
                key={f}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData[f] || ""}
                onChange={(e) => setFormData({...formData, [f]: e.target.value})}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
              Kaydet
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      {/* Users List */}
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-lg">{user.ad} {user.soyad}</p>
              <p className="text-sm text-gray-500">{user.meslek} | {user.email}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => startEdit(user)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;