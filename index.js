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

app.get('/api/courses/:id',(req,res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id) );
    if(!course) res.status(404).send('Course Not Found')
    res.status(200).send(course);
})

app.post('/api/courses',(req,res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.status(200).send(course)
})

app.listen(PORT,()=> {
    console.log(`Listening on port ${PORT}!`);
})