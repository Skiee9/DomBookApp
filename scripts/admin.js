
const BASE_URL="https://vivacious-short-battery.glitch.me/books"
document.addEventListener("DOMContentLoaded",()=>{
    const loginData=JSON.parse(localStorage.getItem("loginData"));
    
    if(!loginData || loginData.email !== adminEmail){
        alert("Admin not logged in");
        window.location.href="index.html";
        return
    }
    const form =document.getElementById("add-book-form");
    const bookGrid=document.getElementById("book-grid");
    const API_URL="";

    const fetchBooks =async()=>{
        try{
            const response=await fetch(API_URL);
            const books=await response.json();
            displayBooks(books);
    }
    catch(error){
        console.error(error);
    }
};
const displayBooks = (books) => {
    bookGrid.innerHTML = "";
    books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <p>Category: ${book.category}</p>
        <p>Status: ${book.isVerified ? "Verified":"Pending"}</p>${book.borrowedDays ? `<p >Borrowed Days :${book.borrowedDays}</p>`:""
        }
        
        
        <button class="verify-btn" ${book.isVerified ?"disabled":""}>Verify Book</button>
        <button class="delete-btn">Delete Book</button>`;

        const verifybtn= bookCard.querySelector(".verify-btn");
        const deletebtn= bookCard.querySelector(".delete-btn");
        bookGrid.appendChild(bookCard);
    });
    form.addEventListener("submit,async(event)=>{
        event.preventDefault();
        const newBook={
            "title": "Book Title",
            "author": "Author Name",
            "category": "Fictional",
            "isAvailable": true,
            "isVerified": false,
            "borrowedDays": null,
            "imageUrl": "https://m.media-amazon.com/images/I/71ZB18P3inL._SY522_.jpg",
            };
            try{
                const response=await fetch(API_URL,{
                    method: "POST",
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify(newBook),}

        );
        if (response.ok{
            alert("Book Returned Successfully.");
            fetchBooks();
            form.reset();
        }
        catch(error){
            console.error(error);
        });
    
    };
    const verifyBook=async(book)=>{
        if(confirm(" Are you sure to return book..?")){
            try{
                const response=await fetch(`${API_URL}/${book.id}`,{
                    method: "PATCH",
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify({"isVerified":true}),
                });
                if(response.ok){
                    fetchBooks();
                }
        }
        catch(error){
            console.error(error);
        }
    }

};

const deleteBook=async(book)=>{
    if(confirm("Are you sure to delete book..?")){
        try{
            const response=await fetch(`${API_URL}/${book.id}`,{
                method: "DELETE",
});
if(response.ok){
    fetchBooks();}
}
catch(error){
    console.error(error);}
}
};
fetchBooks();
});