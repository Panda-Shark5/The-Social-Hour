const pgp = require('pg-promise')();

// Database connection details
const dbConfig = {
    host: 'drona.db.elephantsql.com',
    port: 5432,
    database: 'olohyivq',
    user: 'olohyivq',
    password: 'a-97tniKSJw31Bdg5-fFx1Ay3v7UDuIH',
};

const db = pgp(dbConfig);

module.exports = db;