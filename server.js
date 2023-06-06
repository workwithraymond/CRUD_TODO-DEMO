//Declare variables
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8100;
const mongoose = require('mongoose')
require('dotenv').config()
const TodoTask = require('./models/todotask');//requires the model you created
const todotask = require('./models/todotask');

//Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public')) 
app.use(express.urlencoded({extended: true})) //this helps validate user information and data back and forth.  Also it allows us to send data that includes arrays.

//connect to mongodb

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log('Connected to db!')}) //this tells you where DB_CONNECTION is located which is .env file

//render the ejs, find the schema data current task, 
app.get('/', async (request, response) => {
    try {
        TodoTask.find({}, (err, tasks) => {
            response.render("index.ejs", {
                todoTasks: tasks
            })
        })
        
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//adding POST taking from the model
app.post('/', async (req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try {
        await todoTask.save()
            console.log(todoTask)
            res.redirect("/")
        
    } catch(err) {
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//Edit or Update Method
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id })
            })
        })
    .post((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content

            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })    
   
//DELETE
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
