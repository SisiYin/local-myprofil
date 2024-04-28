const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3001;

const openDb = () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Foodhub',
    password: '251423',
    port: 5432
  })
  return pool
}

app.get("/user/:account_id",async(req,res) => {
  const pool = openDb()
  const account_id = 2;
  try{
    const result = await pool.query('SELECT * FROM account WHERE account_id = $1;',[account_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
})

app.get("/:account_id/comments",async(req,res) => {
  const pool = openDb()
  const account_id = 2;
  try{
    const result = await pool.query('SELECT comment.*, post.title,post.description,account.username FROM post JOIN comment on post.post_id = comment.post_id JOIN account ON account.account_id = comment.account_id WHERE comment.account_id = $1 ORDER BY date DESC;',[account_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
})


app.get("/account/:account_id",async(req,res) => {
  const pool = openDb()
  const account_id = 2;
  try{
    const result = await pool.query('SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post.account_id = $1 ORDER BY date DESC;',[account_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
})

// Function to get a post by post_id
app.get("/posts/:postId",async(req,res) => {
  const pool = openDb()
  const post_id = 2;
  try{
    const result = await pool.query('SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post.post_id = $1;',[post_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

// Function to get comments by post_id
app.get("/posts/:postId/comments",async(req,res) => {
  const pool = openDb()
  const post_id = 2;
  try{
    const result = await pool.query('SELECT comment.*, account.username, account.avantar FROM comment join account on comment.account_id = account.account_id WHERE post_id = $1 ORDER BY date DESC;',[post_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
})

app.post("/newrate",(req,res) => {
  const pool = openDb()
  const { post_id,rate } = req.body; 
  pool.query('INSERT INTO star (post_id,rate) VALUES ($1,$2) returning *', [post_id,rate],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    }
  })
})

app.post("/newcomment",(req,res) => {
  const pool = openDb()
  //const { articleId } = req.params;
  const { post_id,account_id,comment,date } = req.body; 
  pool.query('INSERT INTO comment (post_id, account_id, comment,date) VALUES ($1,$2,$3,$4) returning *', [post_id, account_id, comment,date],
  (error,result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }else{
      res.status(200).json({id: result.rows[0].id})
    } 
  })
})

app.listen(port);
