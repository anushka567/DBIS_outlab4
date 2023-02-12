const  fs=require('fs')
const config=fs.readFileSync('../config.txt','utf-8')

const configdata=JSON.parse(config)
const Pool = require('pg').Pool
const pool = new Pool({
  user: configdata.user,
  host: configdata.host,
  database: configdata.database,
  password: configdata.password,
  port: configdata.port
});


module.exports=pool;