const express = require("express");
const {
  listarUsuarios,
  listarUmUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
} = require("./controllers/usuarios");
const rotas = express();

rotas.get("/usuarios", listarUsuarios); //obter
rotas.get("/usuarios/:id", listarUmUsuario); //obter
rotas.post("/usuarios", cadastrarUsuario); //criar
rotas.put("/usuarios/:id", atualizarUsuario); // atualizar
rotas.delete("/usuarios/:id", deletarUsuario);

module.exports = rotas;
