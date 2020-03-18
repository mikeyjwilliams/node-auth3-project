/** @format */

exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl => {
    tbl.increments('id');
    tbl
      .string('username')
      .notNullable()
      .unique();
    tbl.text('password').notNullable();
    tbl.string('department').notNullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('users');
};
