const express = require("express");
const knex = require("../conexoes");

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await knex("usuarios");
    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listarUmUsuario = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(404).json({ message: "Insira um número válido" });
  }
  try {
    const usuario = await knex("usuarios").where("id", id).first();

    if (!usuario) {
      return res
        .status(404)
        .json({ message: "Usuário não encontrado com esse ID" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const cadastrarUsuario = await knex("usuarios")
      .insert({ nome, email, senha })
      .returning("*");

    if (cadastrarUsuario.length === 0) {
      return res
        .status(400)
        .json({ message: "Não foi possível cadastrar o usuário" });
    }

    res.status(200).json(cadastrarUsuario[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;
  try {
    const existeUsuario = await knex("usuarios").where({ id }).first();

    if (!existeUsuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }

    const atualizarUsuario = await knex("usuarios")
      .update({ nome, email, senha })
      .where({ id });

    if (!atualizarUsuario) {
      return res
        .status(400)
        .json({ message: "Não foi possível atualizar o usuário" });
    }

    return res.status(200).json(atualizarUsuario[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const existeUsuario = await knex("usuarios").where({ id }).first();
    if (!existeUsuario) {
      res.status(404).json({ message: "Usuário não encontrado" });
    }

    const usuario = await knex("usuarios").del().where({ id });
    if (!usuario) {
      res.status(404).json({ message: "Não foi possível deletar o usuário" });
    }

    return res.status(200).json({ message: "usuário excluído com sucesso" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = {
  listarUsuarios,
  listarUmUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
