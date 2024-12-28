document.addEventListener("DOMContentLoaded", () => {
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    const adminEmail = "admin@empher.com";
  
    // Base URL for the JSON server
    const API_URL = "https://baseUrl/books/"; // Replace "baseUrl" with the actual base URL
  
    // Check if admin is logged in
    if (!loginData || loginData.email !== adminEmail) {
      alert("Admin Not Logged In");
      window.location.href = "index.html"; // Redirect to the home page
      return;
    }
  
    const form = document.getElementById("add-book-form");
    const bookGrid = document.getElementById("book-grid");
  
    // Fetch and display books
    const fetchBooks = async () => {
      try {
        const response = await fetch(API_URL);
        const books = await response.json();
        displayBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
  
    const displayBooks = (books) => {
      bookGrid.innerHTML = "";
      books.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
          <img src="${book.imageUrl}" alt="Book Image" style="width: 100%; height: 150px; object-fit: cover;">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Category:</strong> ${book.category}</p>
          <p><strong>Status:</strong> ${book.isVerified ? "Verified" : "Pending"}</p>
          ${
            book.borrowedDays
              ? <p><strong>Borrowed Days:</strong> ${book.borrowedDays}</p>
              : ""
          }
          <button class="verify-btn" ${book.isVerified ? "disabled" : ""}>Verify Book</button>
          <button class="delete-btn">Delete Book</button>
        `;
  
        // Add event listeners to buttons
        const verifyBtn = bookCard.querySelector(".verify-btn");
        const deleteBtn = bookCard.querySelector(".delete-btn");
  
        verifyBtn.addEventListener("click", () => verifyBook(book));
        deleteBtn.addEventListener("click", () => deleteBook(book));
  
        bookGrid.appendChild(bookCard);
      });
    };
  
    // Add a new book
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const newBook = {
        title: form.title.value,
        author: form.author.value,
        category: form.category.value,
        isVerified: false,
        borrowedDays: null, // Default borrowed days
        imageUrl: "https://m.media-amazon.com/images/I/71ZB18P3inL.SY522.jpg", // Hardcoded image
      };
  
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        });
        if (response.ok) {
          alert("Book Added Successfully");
          fetchBooks(); // Refresh the book list
          form.reset(); // Clear the form
        }
      } catch (error) {
        console.error("Error adding book:", error);
      }
    });
  
    // Verify a book
    const verifyBook = async (book) => {
      if (confirm("Are you sure to Verify?")) {
        try {
          const response = await fetch(${API_URL}${book.id}, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ isVerified: true }),
          });
          if (response.ok) {
            fetchBooks(); // Refresh the book list
          }
        } catch (error) {
          console.error("Error verifying book:", error);
        }
      }
    };
  
    // Delete a book
    const deleteBook = async (book) => {
      if (confirm("Are you sure to Delete?")) {
        try {
          const response = await fetch(${API_URL}${book.id}, {
            method: "DELETE",
          });
          if (response.ok) {
            fetchBooks(); // Refresh the book list
          }
        } catch (error) {
          console.error("Error deleting book:", error);
        }
      }
    };
  
    // Initial fetch of books
    fetchBooks();
  });