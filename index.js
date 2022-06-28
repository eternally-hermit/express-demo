const Joi = require('joi')
const express = require('express')
const app = express()

const PORT = process.env.PORT||4000;

app.use(express.json())

const courses = [
    {id:1,name:"course1"},
    {id:2,name:"course2"},
    {id:3,name:"course3"}
]

app.get('/',(req,res) => {
    res.status(200).send('Hello There!')
})

app.get('/api/courses',(req,res) => {
    res.status(200).send(JSON.stringify(courses))
})

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id) );
    if(!course) res.status(404).send('Course Not Found')
    res.status(200).send(course);
})

app.post('/api/courses',(req,res) => {

    // Input Validation for post methods
    const {error} = validateCourse(req.body)
    if(error){
        res.status(400).send(result.error.message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.status(200).send(course)
})

app.put('/api/courses/:id',(req,res) => {

    // Check if the course exists
    const course = courses.find((c) => c.id === parseInt(req.params.id) );
    if(!course) res.status(404).send('Course Not Found')

    // Input Validation
    const {error} = validateCourse(req.body)
    if(error){
        res.status(400).send(result.error.message);
        return;
    }

    course.name = req.body.name
    res.status(200).send(course)
})

app.listen(PORT,()=> {
    console.log(`Listening on port ${PORT}!`);
})

const validateCourse = (course) => {
    const schema = Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(course)
}