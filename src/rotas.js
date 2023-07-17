const express = require("express");
const {
  listarUsuarios,
  listarUmUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("./controllers/usuarios");
const rotas = express();

rotas.get("/usuarios", listarUsuarios); 
rotas.get("/usuarios/:id", listarUmUsuario); 
rotas.post("/usuarios", cadastrarUsuario); 
rotas.put("/usuarios/:id", atualizarUsuario); 
rotas.delete("/usuarios/:id", deletarUsuario);

module.exports = rotas;
