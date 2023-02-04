const bcrypt=require('bcryptjs').bcrypt
// import bcrypt from 'bcryptjs';
const pool=require("./db.js")

const validateAndAuthenticateUser = async (req, res, next) => {
  try {
    
    const username =  req.body.username;
    const password  = req.body.password;
    
    const client = await pool.connect();
    const result = await client.query(`
      SELECT * FROM App_user WHERE id = $1 and hashed_password = $2
    `, [username,password]);
    client.release();
    if (result.rowCount === 0) {
       
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // const isPasswordValid = await bcrypt.compare(password, result.rows[0].hashed_password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: 'Invalid username or password' });
    // }
    req.user = { username };
    next();
    // return res.status(200).json({message:  'Login successful'});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
  }
};


module.exports={validateAndAuthenticateUser}
