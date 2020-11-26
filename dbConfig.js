let secureEnv = require('secure-env');
global.env = secureEnv({secret:'edriquipodovcocacev2'});

const host = global.env.DB_HOST;
const user = global.env.DB_USER;
const password = global.env.DB_PASS;
const database = global.env.DB_DATABASE;
const config = {host, user, password, database};

module.exports = config