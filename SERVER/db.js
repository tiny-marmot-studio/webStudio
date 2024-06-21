const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "0110AlSK.",
    host: "localhost",
    port : "5432",
    database: "webproject"

})

module.exports = pool;