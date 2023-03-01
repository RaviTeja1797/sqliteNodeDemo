const express = require('express') 
const app = express(); 
const {open} = require('sqlite') 
const sqlite3 = require('sqlite3')

const path = require('path') 
const dbPath = path.join(__dirname, "goodreads.db") 
console.log(dbPath) 
let db = null; 

let initilizeDBAndServer = async()=>{ 
    try{ 
        db = await open(
            { filename:dbPath, 
                driver:sqlite3.Database 
            }) 
        }catch(e)
        { console.log(`Error encountered ${e.message}`) 
        process.exit(1) 
     } 
     app.listen(3000, ()=>{ 
         console.log('sever started at http://localhost:3000/') 
        }) 
    } 
initilizeDBAndServer(); 

app.get('/books/', async(request, response)=>{ 
    const getBooksQuerry = ` SELECT * FROM Book Order by book_id ` 
    const booksArray = await db.all(getBooksQuerry); 
    response.send(booksArray) 
})