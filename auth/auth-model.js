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
    .select('id', 'username', 'password', 'department')
    .where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'username', 'department')
    .where({ id });
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db('users').insert(user);

  return findById(id);
}

function getAllUsers() {
  return db('users').select('id', 'username', 'department');
}
