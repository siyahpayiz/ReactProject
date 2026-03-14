import React, { useState, useEffect } from "react";
import Header from "./components/header";
import TodoCreate from "./components/todocreate";
import TodoList from "./components/todolist";
import axios from "axios";

const API_URL = "https://69b57fb8be587338e716048e.mockapi.io/reactcrud/users";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const resetAPIData = async () => {
    const defaultUsers = [
      { ad: "Ahmet", soyad: "Yılmaz", yas: 28, meslek: "Mühendis", email: "ahmet@example.com", password: "123456" },
      { ad: "Elif", soyad: "Kara", yas: 32, meslek: "Mimar", email: "elif@example.com", password: "abcdef" },
      { ad: "Mehmet", soyad: "Demir", yas: 25, meslek: "Yazılım Geliştirici", email: "mehmet@example.com", password: "pass123" },
      { ad: "Ayşe", soyad: "Çelik", yas: 29, meslek: "Elektrik Mühendisi", email: "ayse@example.com", password: "qwerty" },
      { ad: "Fatma", soyad: "Öztürk", yas: 31, meslek: "İnşaat Mühendisi", email: "fatma@example.com", password: "123abc" },
    ];

    if (!window.confirm("API sıfırlanacak. Emin misiniz?")) return;

    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      const existingUsers = res.data;

      // SIRALI SİLME (404 almamak için)
      for (const user of existingUsers) {
        try { await axios.delete(`${API_URL}/${user.id}`); } catch (e) { /* zaten yoksa geç */ }
      }

      // SIRALI EKLEME
      for (const user of defaultUsers) {
        await axios.post(API_URL, user);
      }

      fetchUsers();
      alert("Varsayılan veriler yüklendi!");
    } catch (error) {
      console.error("Reset Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <Header resetAPIData={resetAPIData} loading={loading} />
      
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-6xl mt-6">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <TodoCreate fetchUsers={fetchUsers} />
        </div>

        <div className="w-full md:w-3/5 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          {loading ? <p className="text-center text-blue-500">İşlem yapılıyor...</p> : <TodoList users={users} fetchUsers={fetchUsers} />}
        </div>
      </div>
    </div>
  );
};

export default App;