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


  

  const getCourseExtraInfo = async (req, res) => {
    try {
      
  
      const c_id=req
      const client = await pool.connect();
      const result = await client.query(`
        SELECT distinct(sec_id),course_id,title FROM section natural join course WHERE course_id = \'${c_id}\'
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
      let year=new Date().getFullYear();
      year-=13
     // console.log(c_id)
      const client = await pool.connect();

      const result = await client.query(`
        
        select distinct building from course natural join section where  course_id = \'${c_id}\' and year= \'${year}\'  `);
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
      year-=13
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
  
  const getCoursePrereq = async (req, res) => {
    try {
      
  
      const c_id=req
      let year=new Date().getFullYear();
      year-=13
      //console.log(c_id)
      const client = await pool.connect();
      const result = await client.query(`
        select * from prereq where course_id = \'${c_id}\' 
          `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  

  const getActiveDept=async (req,res)=>{

    try {
      
  
      let date=new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      
      const client = await pool.connect();
      const result = await client.query(`
        select distinct(dept_name) from teaches natural join course where  year= \'${date.getFullYear()}\' and semester=(select semester from reg_dates  where start_time <= \'${timestamp}\' order by start_time desc limit 1)
          `);
      client.release();
      
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }

  };

  const getCourseByDept = async (req, res) => {
    try {
      
  
      const dept=req
      let date=new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      //console.log(c_id)
      const client = await pool.connect();
      const result = await client.query(`
        select distinct(course_id) from course natural join teaches where  dept_name = \'${dept}\' and year= \'${date.getFullYear()}\' and semester=(select semester from reg_dates  where start_time <= \'${timestamp}\' order by start_time desc limit 1)
        
          `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  


  const  getCurrentCoursesID = async (req, res) => {
    try {
      
  
      
      let year=new Date().getFullYear();
      year-=13
      
      const client = await pool.connect();
      const result = await client.query(`
        select distinct(course_id) from section natural join teaches where year= \'${year}\'
          `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  


  const checkregistered = async (req, res) => {
    try {
      
      const [id,course_id,sec_id]=req
      
      let year=new Date().getFullYear();
      year-=13
      
      const client = await pool.connect();
      const result = await client.query(
        `
        select * from takes  where year= \'${year}\' and sec_id= \'${sec_id}\' and course_id= \'${course_id}\' 
        and id= \'${id}\'
          `);
      client.release();
      if(result.rows)
        return false;
      else return true;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  

async function registerforcourse(id,course_id,sec_id,res){
    try {
     
     // const [id,course_id,sec_id]=req
      console.log("hi")
      console.log(id,course_id,sec_id)
      console.log("bye")
      let year=new Date().getFullYear();
      year-=13
      
      const client = await pool.connect();
      const result = await client.query(`
        insert into takes(id,course_id,sec_id,semester,year,grade) values(\'${id}\',\'${course_id}\',\'${sec_id}\',\'Summer\',\'${year}\',null)
          `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.log("culprit")
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  

  
  module.exports={getCourseInfo,getCourseExtraInfo,
    getCoursevenue,getCourseInstr,
    getActiveDept,getCourseByDept,
    getCurrentCoursesID,checkregistered,registerforcourse,
    getCoursePrereq}
