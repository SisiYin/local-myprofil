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
    const result = await pool.query('SELECT comment.*, post.title,post.description,account.username FROM post JOIN comment on post.post_id = comment.post_id JOIN account ON account.account_id = comment.account_id WHERE comment.account_id = $1;',[account_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
})



app.get("/account/:account_id",async(req,res) => {
  const pool = openDb()
  const account_id = 2;
  try{
    const result = await pool.query('SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post.account_id = $1;',[account_id]);
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({error:error.message})
  }
    
})

app.listen(port);
