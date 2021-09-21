const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

module.exports = {
    add, find
}
async function add(username, displayed_name, password) {
    const [id] = await db('data').insert([{username: username, displayed_name:displayed_name, password:password}])
    return id;
}

function find() {
    return db('data')
}