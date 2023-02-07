const pool=require("./db.js")

const getStudentInfo = async (req, res) => {
    try {
      
  
      const id=req
      const client = await pool.connect();
      const result = await client.query(`
        SELECT * FROM student WHERE id = \'${id}\'
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };
  


  const getStudentCourseInfo = async (req, res) => {
    try {
      
  
      const id=req
      // let year=new Date().getFullYear();
      // year-=14
      let date = new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      console.log(timestamp);

      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(`
        SELECT takes.course_id,takes.sec_id,course.title,course.credits,takes.semester FROM takes,course,(
          select * from reg_dates  where start_time <= \'${timestamp}\' order by start_time desc limit 1) as sem
         WHERE id = \'${id}\' and  takes.course_id=course.course_id and takes.semester= sem.semester and takes.year=sem.year
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };
    
  const getStudentPrevCourseInfo = async (req, res) => {
    try {
      
  
      const id=req
      

      let date = new Date();
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(`
      select takes.* from takes where ID=\'${id}\' and((year <\'${date.getFullYear()}\') or (year =  \'${date.getFullYear()}\' and  (case semester when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)<(case (select semester from reg_dates where start_time <=  \'${timestamp}\' order by start_time desc limit 1)   when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)))  order by year desc ;
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };


  async function deleteCourse(id,course_id,res){
    try {
        //   console.log("ehle")
        //   console.log(req)
        //   console.log("basss"
        //   const id=req.id
        //   const course_id=req.course_id
        
          //console.log(id,course_id)
          let year=new Date().getFullYear();
          year-=13
          //console.log(year)
          const client = await pool.connect();
          const result = await client.query(`
            delete from takes where  id = \'${id}\' and  takes.course_id=\'${course_id}\'and year= \'${year}\'
          `);
          client.release();
          //console.log(result.rows)
         
          return result.rows;
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
        }
  };
//   const deleteCourse = async ((id,course_id), res) => {
   
//   };

  module.exports={getStudentInfo , getStudentCourseInfo,getStudentPrevCourseInfo ,deleteCourse}
  