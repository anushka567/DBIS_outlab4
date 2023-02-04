const express = require('express');
const session = require('express-session');
const cors=require('cors')
// const pgSession = require('connect-pg-simple')(session);
// const pg = require('pg');
const app = express();
const auth=require('./auth')


const student_model=require("./student.js")
const course_model=require("./courses.js")
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
    credentials: true,
  })
  )
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(
  session({
    // store: new pgSession({
    //   pool: new pg.Pool({
    //     connectionString: process.env.DATABASE_URL
    //   })
    // }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);


const checksession = (req, res, next) => {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not   authorized' });
    }
    next();
  };

app.post('/login',auth.validateAndAuthenticateUser,(req, res) => {
//   const { username, password } = req.body;
//   // Perform validation and authentication here, using the provided username and password
//   // If the authentication is successful:
//   req.session.username = username;
//   res.send({ message: 'Login successful' });

req.session.user=req.user;

return res.json({message:'Login successful'});
});


app.get('/home', checksession, (req, res) => {
  return res.json({ message: 'Welcome to the home page' ,username:req.user});
});

app.get('/dashboard', checksession, (req, res) => {
  return res.json({ message: 'Welcome to the dashboard' });
});




app.get('/studentinfo/:id', (req, res) => {
    
    //console.log(req.params.id)
    student_model.getStudentInfo(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  })



  app.get('/studentcourseinfo/:id', (req, res) => {
    
    //console.log(req.params.id)
    student_model.getStudentCourseInfo(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  })  

  app.get('/studentprevcourseinfo/:id', (req, res) => {
    
    //console.log(req.params.id)
    student_model.getStudentPrevCourseInfo(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  })  



  app.delete('/deletecourse/:id/:course_id', (req, res) => {
    
    //console.log(req.params.id)
    // console.log(req.params.id)
    // console.log(req.params.course_id)
    //console.log("hahahaha334343")

    
    student_model.deleteCourse(req.params.id,req.params.course_id)
    .then(() => {
        //console.log(response)
      res.status(200).send({message:"delete success"});
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  })  



app.get('/checkSession', (req, res) => {
  if (req.session.username) {
    res.send({ username: req.session.username });
  } else {
    res.send({});
  }
});



app.get('/courseinfo/:id', (req, res) => {
    
    //console.log(req.params.id)
    course_model.getCourseInfo(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  })  

  app.get('/coursevenueinfo/:id', (req, res) => {
    
    //console.log(req.params.id)
    course_model.getCoursevenue(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  }) 

  app.get('/courseinstr/:id', (req, res) => {
    
    //console.log(req.params.id)
    course_model.getCourseInstr(req.params.id)
    .then(response => {
        //console.log(response)
      res.status(200).send(response);
    })
    .catch(error => {
      
      res.status(500).send(error);
    })
  }) 




app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



