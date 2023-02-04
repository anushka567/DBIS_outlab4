const pool=require("./db.js")

const getCourseInfo = async (req, res) => {
    try {
      
  
      const c_id=req
      const client = await pool.connect();
      const result = await client.query(`
        SELECT * FROM course WHERE course_id = \'${c_id}\'
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };

  const getCoursevenue = async (req, res) => {
    try {
      
  
      const c_id=req
     // console.log(c_id)
      const client = await pool.connect();
      const result = await client.query(`
        
        select distinct building from course natural join section where  course_id = \'${c_id}\'  `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  


  const getCourseInstr = async (req, res) => {
    try {
      
  
      const c_id=req
      let year=new Date().getFullYear();
      year-=14
      //console.log(c_id)
      const client = await pool.connect();
      const result = await client.query(`
        select * from teaches natural join instructor where  course_id = \'${c_id}\' and year= \'${year}\'
          `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  
  
  module.exports={getCourseInfo,getCoursevenue,getCourseInstr}
