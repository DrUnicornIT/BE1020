
exports.up = function(knex) {
  return knex.schema.createTable('data', tbl => {
      tbl.increments()
      tbl.string('username')
      tbl.string('displayed_name')
      tbl.string('password')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('data')
};
