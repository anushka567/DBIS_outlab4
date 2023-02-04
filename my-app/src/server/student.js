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
      let year=new Date().getFullYear();
      year-=14
      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(`
        SELECT takes.course_id,course.title,course.credits FROM takes,course WHERE id = \'${id}\' and  takes.course_id=course.course_id and year= \'${year}\'
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
      let year=new Date().getFullYear();
      year-=14
      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(`
        SELECT takes.course_id,course.title,course.credits,takes.grade FROM takes,course WHERE id = \'${id}\' and  takes.course_id=course.course_id and year!= \'${year}\' order by year desc
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
        
          console.log(id,course_id)
          let year=new Date().getFullYear();
          year-=14
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
  