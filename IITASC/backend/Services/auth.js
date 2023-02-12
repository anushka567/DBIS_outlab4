const bcrypt=require('bcryptjs')

const pool=require("./db.js")

const validateAndAuthenticateUser = async (req, res, next) => {
  try {
    
    const username =  req.body.username;
    const password  = req.body.password;
    

    const client = await pool.connect();
    const result = await client.query(`
      SELECT * FROM user_password WHERE id = $1 
    `,[username]);
    
    client.release();
   
    if (result.rowCount === 0) {
       console.log("ahhahahah")
      return res.status(401).json({ message: 'No such user' });
    }
    
    // bcrypt.hash(password,10 ,function(err,hash){
    //   if(err){
    //     console.log(err)
    // }
    //   else{
    //     console.log(hash)
    //   }
    // })
    const isPasswordValid = await bcrypt.compare(password, result.rows[0].hashed_password);
    // console.log("hi but first")
    // console.log(!isPasswordValid)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    req.user = { username };
    console.log("hi")
    next();
    // console.log("hahahaaiiii")
    // return res.status(200).json({message:  'Login successful'});
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
  }
};


module.exports={validateAndAuthenticateUser}
