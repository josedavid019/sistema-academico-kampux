import React from "react";

export function Login() {
  return (
    <div className="flex justify-evenly">
      <div>
        <div>
          <p>Le damos la bienvenida a</p>
          <h1>Kampux</h1>
        </div>
      </div>
      <div>
        <form>
          <h2>Ingresa a tu cuenta</h2>
          <div>
            <input type="text" placeholder="Usuario" />
          </div>
          <div>
            <input type="password" placeholder="Contraseña" />
          </div>
          <div>
            <button>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
