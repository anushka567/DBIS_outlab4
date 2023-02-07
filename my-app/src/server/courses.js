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
      let date = new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      console.log(timestamp);
     // console.log(c_id)
      const client = await pool.connect();

      const result = await client.query(`
        
        select * from classroom natural join section where  course_id = \'${c_id}\' and year= \'${date.getFullYear()}\' 
        and semester=(select semester from reg_dates where start_time <= \'${timestamp}\' order by start_time desc limit 1)
        `);
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
      let date = new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      console.log(timestamp);
      //console.log(c_id)
      const client = await pool.connect();
      const result = await client.query(`
        select * from teaches natural join instructor where  course_id = \'${c_id}\' and year= \'${date.getFullYear()}\' and 
        semester=(select semester from reg_dates where start_time <= \'${timestamp}\' order by start_time desc limit 1)
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
  
     


      let date = new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      
      const client = await pool.connect();
      const result = await client.query
      (`
            with sem as 
                ( select semester from reg_dates where start_time <= \'${timestamp}\' order by start_time desc limit 1 )
            INSERT INTO takes (ID, course_id, sec_id, semester, year,grade)
            SELECT \'${id}\', \'${course_id}\', \'${sec_id}\', sem.semester, \'${date.getFullYear()}\',null from sem
            WHERE NOT EXISTS (
  
              SELECT prereq_id
              FROM prereq
              WHERE course_id = \'${course_id}\'
               AND prereq_id NOT IN 
                  (
                    SELECT course_id
                    FROM takes
                    WHERE ID = \'${id}\'
                    and(
                      (year <\'${date.getFullYear()}\') 
                      or 
                      (year =  \'${date.getFullYear()}\' and
                    (case semester when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)<
                    (case sem.semester  when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)
                    )
                    ) 
                  )
             )
             AND EXISTS (
                    SELECT time_slot_id
                     FROM time_slot
                    NATURAL JOIN section
                     WHERE course_id = \'${course_id}\' and sec_id=\'${sec_id}\'
                       AND (time_slot_id, day, start_hr, start_min) NOT IN 
                       (
                          SELECT time_slot_id, day, start_hr, start_min
                          FROM time_slot
                          NATURAL JOIN section NATURAL JOIN takes 
                          WHERE ID =\'${id}\' and year=\'${date.getFullYear()}\' and semester=sem.semester
                       )
            )
            AND NOT EXISTS (
              SELECT course_id
             FROM takes
              WHERE ID =\'${id}\'
                AND course_id = \'${course_id}\'
                AND semester = sem.semester
                AND year = \'${date.getFullYear()}\'
            )

          `);
      
      client.release();
      //console.log(result.rows)
      console.log(result)
      return result;
    } catch (error) {
      console.log("culprit")
      console.log(error.lineNumber)
      console.error(error);
      return res.status(530).json({ message: 'An error occurred while trying to validate the user' });
    }
  };  

  
  module.exports={getCourseInfo,getCourseExtraInfo,
    getCoursevenue,getCourseInstr,
    getActiveDept,getCourseByDept,
    getCurrentCoursesID,checkregistered,registerforcourse,
    getCoursePrereq}
