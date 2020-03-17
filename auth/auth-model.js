/** @format */

const bcrypt = require('bcryptjs');
const db = require('../data/config');

module.exports = {
  findBy,
  findPassBy,
  findById,
  add,
  getAllUsers,
};

function findBy(filter) {
  return db('users')
    .select('id', 'username', 'department')
    .where(filter);
}

function findPassBy(filter) {
  return db('users')
    .select('id', 'username', 'passwords', 'department')
    .where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'department')
    .where({ id });
}

async function add(user) {
  const [id] = await db('users').add(user);

  return findById(id);
}

function getAllUsers() {
  return db('users').select('id', 'username', 'department');
}
