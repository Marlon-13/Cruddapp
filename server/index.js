const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')
const endPoint = "/api/review"
const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'cruddatabase',
    })
    // app.get("/",(req,res)=>{

//     //an example of how to insert data into a database
//     // const sqlInsert =  "INSERT INTO movie_reviews (movieName, movieReviews) VALUES ('Haloween','good movie')"
//     // db.query(sqlInsert, (err,result)=>{
//     //     res.send("hello world");
//     // })

// })

app.use(cors()) // use this to provide middlewear to your express server
app.use(express.json()) //makes sure input grabbed from front end is able to be read
app.use(bodyParser.urlencoded({ extended: true })) //use bodyparser when working with this type of apps otherwise warnings and breaks happen

// set up the app.get, app.post and app.delete methods
app.get(endPoint, (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews"

    db.query( // Function Start
        sqlSelect, // This is the SQL Statement
        (err, result) => { // This is handling the result
            res.send(result) // This is us sending back the data from the SQL Table
    }) // Function End
})

// INSERT INTO movie_reviews (movieName, movieReviews) VALUES (?,?)


app.post("/api/review/insert", (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReviews
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReviews) VALUES (?,?)"
    db.query(
        sqlInsert,
        [movieName,movieReview], 
        (err,result)=>{ 
            console.log(result)
    })
})



// DELETE FROM movie_reviews WHERE movieName = ?
app.delete(`${endPoint}/:movieName`, (req, res) => {
    const name = req.params.movieName
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?"
    db.query(
        sqlDelete, 
        name, 
        (err, result) => {
            if (err) console.log(err)
    })
})




// app.get(endPoint,(req,res)=>{
//     const sqlSelect = "SELECT * FROM movie_reviews"
//     db.query(sqlSelect, (err,result)=>{
//         console.log(result) //print database contents into the console to check what is in there
//         res.send(result); //send the array of contents to the url
//     })
// }) //get all movies from database to display

// app.post(endPoint,(req,res)=>{
//     const id = req.body.id
//     const movieName = req.body.movieName
//     const movieReviews = req.body.movieReviews
//     //Insert unput from user into the moviename and moviereviews in the sql database
//     const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReviews) VALUES (?,?)"
//     db.query(sqlInsert,[movieName,movieReviews], (err,result)=>{ 
//         console.log(result)
//     })
// })

// // create a delete request to delete a movie from the database
// app.delete(endPoint+"/:id",(req,res)=>{
//     const id = req.params.id
//     const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?"
//     db.query(sqlDelete,id,(err,result)=>{
//         if(err) console.log(err)
//     })
// }
// )

// // app.delete("/api/review/:movieName"),(req,res)=>{
// //     const name = req.params.movieName
// //     const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?" //delete movie and review
// //     db.query(sqlDelete, name,(err,result)=>{

// //         if (err) console.log(err);
// //     }) //use the movie name to identify and delete the whole card

// // }

app.listen(3003, () => {
    console.log("run on port 3003")
})

process.on('SIGINT', function() {
    console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
    // some other closing procedures go here 
    process.exit(0);
});