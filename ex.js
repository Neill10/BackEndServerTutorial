const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Hello there this is localhost 3000!');
});



const courses = [
    {id:1, name:'Web Development'},
    {id:2, name: 'IT'},
    {id:3, name: 'Cybersecurity'},
];

app.get('/api/courses', (req,res)=>{
    res.send(courses);
});
//HTTP GET requests
app.get('/api/courses/:id',(req, res)=>{
    const course = courses.find(c=> c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send("The course with the given ID was not found");
    }
    res.send(course);
})

//HTTP POST requests
app.post('/api/courses', (req,res) => {
    let name = req.body.name;
    // you write the if code here
    //add an if statement so that the name of the course you post is .min(3) characters 
    //res.send("the length of name" + req.body.name);
    if(name.length <= 3){
        res.status(404).send("Must be more than 3 characters");
    }
    else{
        const course ={
            //we assign an ID and a name property
            id: courses.length +1,
            name: req.body.name
        }
        //res.send(course);
        //YOU WRITE THE NEXT LINES OF code
        //next step: push it to the array
        //next step: the server should return the new resource to the client in the body of the response
        courses.push(course);
        res.send(courses);
    }
});
  
//HTTP PUT requests
//here we need the specific id of the course we want to update
app.put('/api/courses/:id', (req,res)=>{
    //Write the code in order to look up the course, if not existing return a 404
        //otherwise 
                //update the course
                //return the updated course
    const courseExist = courses.find(c=> c.id === parseInt(req.params.id));
    if(!courseExist){
        res.status(404).send("The course with the given ID was not found");
    }
    else{
        //res.send(req.body.name);
        res.send(courses);
        console.log("changed " + courses[req.body.id-1].name + " to " + req.body.name);

        //courses[req.body.id - 1].name = req.body.name;
    }          
});
    

app.listen(3000,()=>{
    console.log("Listening on port 3000 ... ");
})
