let editBookOldTitle=null;
let editUserOldName=null;

// --- Books ---
function addBook(){
    const title=document.getElementById('bookTitle').value;
    const author=document.getElementById('bookAuthor').value;
    const copies=document.getElementById('bookCopies').value;
    const url=editBookOldTitle ? '/books/'+editBookOldTitle : '/books';
    const method=editBookOldTitle ? 'PUT' : 'POST';
    fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify({title,author,copies})})
    .then(()=>{editBookOldTitle=null;document.getElementById('bookActionBtn').textContent='Add Book'; viewBooks(); clearBookForm();});
}

function viewBooks(){
    fetch('/books').then(res=>res.json()).then(data=>{
        const tbody=document.querySelector('#booksTable tbody');
        tbody.innerHTML='';
        data.forEach(b=>{
            const tr=document.createElement('tr');
            tr.innerHTML=`<td>${b.title}</td><td>${b.author}</td><td>${b.copies}</td>
            <td>
            <button class="edit" onclick="editBook('${b.title}','${b.author}','${b.copies}')">Edit</button>
            <button class="delete" onclick="deleteBook('${b.title}')">Delete</button>
            </td>`;
            tbody.appendChild(tr);
        });
    });
}

function editBook(title,author,copies){
    document.getElementById('bookTitle').value=title;
    document.getElementById('bookAuthor').value=author;
    document.getElementById('bookCopies').value=copies;
    document.getElementById('bookActionBtn').textContent='Save Changes';
    editBookOldTitle=title;
}

function deleteBook(title){fetch('/books/'+title,{method:'DELETE'}).then(()=>viewBooks());}

function clearBookForm(){document.getElementById('bookTitle').value='';document.getElementById('bookAuthor').value='';document.getElementById('bookCopies').value='';}

// --- Users ---
function addUser(){
    const name=document.getElementById('userName').value;
    const email=document.getElementById('userEmail').value;
    const url=editUserOldName ? '/users/'+editUserOldName : '/users';
    const method=editUserOldName ? 'PUT' : 'POST';
    fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email})})
    .then(()=>{editUserOldName=null;document.getElementById('userActionBtn').textContent='Add User'; viewUsers(); clearUserForm();});
}

function viewUsers(){
    fetch('/users').then(res=>res.json()).then(data=>{
        const tbody=document.querySelector('#usersTable tbody');
        tbody.innerHTML='';
        data.forEach(u=>{
            const tr=document.createElement('tr');
            tr.innerHTML=`<td>${u.name}</td><td>${u.email}</td>
            <td>
            <button class="edit" onclick="editUser('${u.name}','${u.email}')">Edit</button>
            <button class="delete" onclick="deleteUser('${u.name}')">Delete</button>
            </td>`;
            tbody.appendChild(tr);
        });
    });
}

function editUser(name,email){
    document.getElementById('userName').value=name;
    document.getElementById('userEmail').value=email;
    document.getElementById('userActionBtn').textContent='Save Changes';
    editUserOldName=name;
}

function deleteUser(name){fetch('/users/'+name,{method:'DELETE'}).then(()=>viewUsers());}

function clearUserForm(){document.getElementById('userName').value='';document.getElementById('userEmail').value='';}

// --- Borrow / Return ---
function borrowBook(){
    const user=document.getElementById('borrowUser').value;
    const book=document.getElementById('borrowBook').value;
    fetch('/borrow',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user,book})})
    .then(()=>viewBorrowed());
}
function returnBook(){
    const user=document.getElementById('borrowUser').value;
    const book=document.getElementById('borrowBook').value;
    fetch('/return',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({user,book})})
    .then(()=>viewBorrowed());
}
function viewBorrowed(){
    fetch('/borrowed').then(res=>res.json()).then(data=>{
        const tbody=document.querySelector('#borrowedTable tbody');
        tbody.innerHTML='';
        data.forEach(b=>{
            const tr=document.createElement('tr');
            tr.innerHTML=`<td>${b.user}</td><td>${b.book}</td>`;
            tbody.appendChild(tr);
        });
    });
}

// Initial load
viewBooks(); viewUsers(); viewBorrowed();