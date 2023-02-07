const pool=require("./db.js")

const getInstrInfo = async (req, res) => {
    try {
      
  
      const i_id=req
        
    //   console.log(i_id)
      const client = await pool.connect();
      const result = await client.query(`
        SELECT * FROM  instructor WHERE id = \'${i_id}\'
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };


  const getInstrCurrInfo = async (req, res) => {
    try {
      
  
      const i_id=req
      let date=new Date();
      // date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      console.log(timestamp)
      //console.log(i_id)
      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(
        `
        with year_table as (select year as x from reg_dates where start_time <=  \'${timestamp}\' order by start_time desc limit 1 ) 
        SELECT * FROM  instructor natural join teaches,year_table WHERE id = \'${i_id}\' and year= year_table.x and semester=(select semester from reg_dates  where start_time <= \'${timestamp}\' order by start_time desc limit 1) order by course_id asc
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };

  const getInstrPrevInfo = async (req, res) => {
    try {
      
  
      const i_id=req
      let date=new Date();
      // date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      //console.log(i_id)
      const client = await pool.connect();
      const result = await client.query(`
      with year_table as (select year as x from reg_dates where start_time <=  \'${timestamp}\' order by start_time desc limit 1 ) 
      SELECT * FROM  instructor natural join teaches,year_table WHERE id = \'${i_id}\' and ((year < year_table.x) or (year = year_table.x and  (case semester when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)<(case (select semester from reg_dates where start_time <=  \'${timestamp}\' order by start_time desc limit 1)   when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)))  order by year desc,CASE 
      WHEN semester = 'Spring' THEN 4
      WHEN semester = 'Summer' THEN 3
      WHEN semester = 'Fall' THEN 2
      WHEN semester = 'Winter' THEN 1
    END ;
      
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };


  
  const is_instructor = async (req, res) => {
    try{
      const id = req.id
      const client = await pool.connect();
      const result = await client.query(`
      SELECT * FROM  instructor  WHERE id = \'${id}\' 
      
      `);
      client.release();
      //console.log(result.rows)
      if(result.rowCount===0){
        return false
      }
      return true
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };

  module.exports ={getInstrInfo,getInstrCurrInfo,getInstrPrevInfo,is_instructor}


