const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const booksFile = path.join(__dirname, 'data/books.txt');
const usersFile = path.join(__dirname, 'data/users.txt');
const borrowedFile = path.join(__dirname, 'data/borrowed.txt');

function readFile(file){
    if(!fs.existsSync(file)) return [];
    return fs.readFileSync(file,'utf-8').split('\n').filter(l=>l).map(l=>l.split('|'));
}

function writeFile(file, arr){
    fs.writeFileSync(file, arr.map(a=>a.join('|')).join('\n'));
}

// --- Books ---
app.get('/books',(req,res)=>{
    const books = readFile(booksFile).map(b=>({title:b[0],author:b[1],copies:b[2]}));
    res.json(books);
});

app.post('/books',(req,res)=>{
    const {title,author,copies} = req.body;
    const books = readFile(booksFile);
    books.push([title,author,copies]);
    writeFile(booksFile, books);
    res.json({message:'Book added!'});
});

app.put('/books/:title',(req,res)=>{
    const oldTitle = req.params.title;
    const {title,author,copies} = req.body;
    let books = readFile(booksFile);
    books = books.map(b => b[0] === oldTitle ? [title,author,copies] : b);
    writeFile(booksFile, books);
    res.json({message:'Book updated!'});
});

app.delete('/books/:title',(req,res)=>{
    const title = req.params.title;
    let books = readFile(booksFile);
    books = books.filter(b=>b[0] !== title);
    writeFile(booksFile, books);
    res.json({message:'Book deleted!'});
});

// --- Users ---
app.get('/users',(req,res)=>{
    const users = readFile(usersFile).map(u=>({name:u[0],email:u[1]}));
    res.json(users);
});

app.post('/users',(req,res)=>{
    const {name,email} = req.body;
    const users = readFile(usersFile);
    users.push([name,email]);
    writeFile(usersFile, users);
    res.json({message:'User added!'});
});

app.put('/users/:name',(req,res)=>{
    const oldName = req.params.name;
    const {name,email} = req.body;
    let users = readFile(usersFile);
    users = users.map(u => u[0]===oldName ? [name,email] : u);
    writeFile(usersFile, users);
    res.json({message:'User updated!'});
});

app.delete('/users/:name',(req,res)=>{
    const name = req.params.name;
    let users = readFile(usersFile);
    users = users.filter(u=>u[0]!==name);
    writeFile(usersFile, users);
    res.json({message:'User deleted!'});
});

// --- Borrow / Return ---
app.post('/borrow',(req,res)=>{
    const {user,book} = req.body;
    const borrowed = readFile(borrowedFile);
    borrowed.push([user,book]);
    writeFile(borrowedFile, borrowed);
    res.json({message:'Book borrowed!'});
});

app.post('/return',(req,res)=>{
    const {user,book} = req.body;
    let borrowed = readFile(borrowedFile);
    borrowed = borrowed.filter(b=>!(b[0]===user && b[1]===book));
    writeFile(borrowedFile, borrowed);
    res.json({message:'Book returned!'});
});

app.get('/borrowed',(req,res)=>{
    const borrowed = readFile(borrowedFile).map(b=>({user:b[0],book:b[1]}));
    res.json(borrowed);
});

app.listen(PORT,()=>console.log('Server running at http://localhost:${PORT}'));
