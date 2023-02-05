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
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      console.log(timestamp)
      //console.log(i_id)
      //console.log(year)
      const client = await pool.connect();
      const result = await client.query(
        `
        SELECT * FROM  instructor natural join teaches WHERE id = \'${i_id}\' and year= \'${date.getFullYear()}\' and semester=(select semester from reg_dates  where start_time <= \'${timestamp}\' order by start_time desc limit 1) order by course_id asc
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
      date.setFullYear(date.getFullYear()-13)
      let timestamp = date.toISOString().replace('T', ' ').split('.')[0];
      //console.log(i_id)
      const client = await pool.connect();
      const result = await client.query(`
      SELECT * FROM  instructor natural join teaches WHERE id = \'${i_id}\' and ((year <\'${date.getFullYear()}\') or (year =  \'${date.getFullYear()}\' and  (case semester when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)<(case (select semester from reg_dates where start_time <=  \'${timestamp}\' order by start_time desc limit 1)   when  'Winter' then 4 when 'Spring' then 1 when 'Summer' then 2 when 'Fall' then 3 end)))  order by course_id desc ;
      
      `);
      client.release();
      //console.log(result.rows)
      return result.rows;
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while trying to validate the user' });
    }
  };

  module.exports ={getInstrInfo,getInstrCurrInfo,getInstrPrevInfo}


