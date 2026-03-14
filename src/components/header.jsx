import React from "react";

const Header = ({ resetAPIData, loading }) => (
  <header className="bg-blue-600 text-white w-full max-w-6xl rounded-lg p-6 shadow-md text-center border-4 border-white">
    <h1 className="text-3xl font-bold mb-2">Mühendisler Odası</h1>
    <p className="text-lg font-light mb-4">Mühendisler Odasına Hoşgeldiniz</p>
    <button 
      onClick={resetAPIData} 
      disabled={loading}
      className={`${loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} px-6 py-2 rounded-md transition font-semibold text-white`}
    >
      {loading ? "GÜNCELLENİYOR..." : "API’DEN GÜNCELLE"}
    </button>
  </header>
);

export default Header;