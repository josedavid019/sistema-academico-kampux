import React from "react";

export function Navbar() {
  return (
    <nav className="h-16 bg-[#1f2e40] flex justify-start items-center">
      <div>
        <img
          className="h-14 ml-2"
          src="https://i.ibb.co/27cwjzyJ/Logo-Kampux.png"
          alt="Logo Kampux"
        />
      </div>
      <div>
        <h1 className="text-white">Kampux</h1>
      </div>
    </nav>
  );
}
