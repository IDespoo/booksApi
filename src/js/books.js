document.addEventListener('DOMContentLoaded', async function () {

    await getBooksRequest();

    const saveBookButton = document.getElementById('saveBookButton');
    saveBookButton.addEventListener('click', async function () {
        const imgURL = document.getElementById('imgURL').value;
        const bookName = document.getElementById('name').value;
        const bookAuthor = document.getElementById('author').value;
        const bookGenre = document.getElementById('genre').value;
        await saveBookRequest({ imgURL, bookName, bookAuthor, bookGenre });
        hideModal('createBook');
        await getBooksRequest();
    });

    const updateBookButton = document.getElementById('updateBookButton');
    updateBookButton.addEventListener('click', async function () {
        const bookImgURL = document.getElementById('editBookImgURL').value;
        const bookID = document.getElementById('editBookID').innerHTML;
        const bookName = document.getElementById('editBookTitle').value;
        const bookAuthor = document.getElementById('editBookAuthor').value;
        const bookGenre = document.getElementById('editBookGenre').value;
        await updateBookRequest({ bookImgURL, bookID, bookName, bookGenre, bookAuthor });
        hideModal('editBookModal');
        await getBooksRequest();
    });

    const deleteBookButton = document.getElementById('deleteBookButton');
        deleteBookButton.addEventListener('click', async function () {
        const bookId = document.getElementById('deleteBookID').innerHTML;
        await deleteBookRequest(bookId);
        hideModal('deleteBookModal');
        await getBooksRequest();
    });
});

function showBooks(books) {
    let arrayBooks = '';
    if (!!books && books.length > 0) {
        books.forEach(book => {
            arrayBooks += `<tr>
                <td scope="row">${book.id}</td>
                <td><img src="${book.imgURL}" class="img-thumbnail" width="70" height="70"></td>
                <td>${book.title}</td>
                <td>${book.genre}</td>
                <td>${book.author}</td>
                <td>
                    <button type="button" class="btn btn-outline-primary" onclick="editBook('${book.id}','${book.imgURL}','${book.title}', '${book.genre}', '${book.author}')">
                    <i class="fas fa-pencil-alt"></i>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger" onclick="deleteBook('${book.id}', '${book.title}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        });
    } else {
        arrayBooks = `<tr class="table-warning">
            <td colspan="6" class="text-center">No hay libros</td>
        </tr>`;
    }

    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = arrayBooks;
}

async function getBooksRequest() {
    try {
        let response = await fetch('http://localhost:3000/books');
        let data = await response.json();
        showBooks(data);
    } catch (error) {
        console.log(error);
        showBooks(null);
    }
}

async function saveBookRequest({ imgURL, bookName, bookAuthor, bookGenre }) {
    try {
        let request = await fetch('http://localhost:3000/books', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                imgURL: imgURL,
                title: bookName,
                author: bookAuthor,
                genre: bookGenre
            })
        });
        let data = await request.json();

        if (data.ok) {
            alert('Book created successfully');
        } else {
            alert('Failed to create book');
        }

        hideModal('createBook');
        location.reload();
    } catch (error) {

    }
}

async function updateBookRequest({ bookID, bookImgURL, bookName, bookGenre, bookAuthor }) {
    try {
        let request = await fetch(`http://localhost:3000/books/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imgURL: bookImgURL,
                title: bookName,
                author: bookAuthor,
                genre: bookGenre
            })
        });
        const data = await request.json();
        
        if (data.ok) {
            alert('Book updated successfully');
        } else {
            alert('Failed the book updating');
        }
    } catch (error) {
        alert('ERROR');
    }
}

function editBook(id, imgURL, title, genre, author) {
    document.getElementById('editBookID').innerHTML = id;
    document.getElementById('editBookImgURL').value = imgURL;
    document.getElementById('editBookTitle').value = title;
    document.getElementById('editBookAuthor').value = author;
    document.getElementById('editBookGenre').value = genre;
    showModal('editBookModal');
}

function deleteBook(id, title) {
    document.getElementById('deleteBookID').innerHTML = id;
    document.getElementById('deleteBookTitle').innerHTML = title;
    showModal('deleteBookModal');
}

async function deleteBookRequest(id) {
    try {
        let request = await fetch(`http://localhost:3000/books/${id}`, {
            'method': 'DELETE'
        });
        let data = await request.json();
        if (data.ok) {
            alert('Book deleted successfully');
        } else {
            alert('Failed book deleting');
        }
    } catch (error) {
        alert('ERROR');
    }
}

function showModal(idModal) {
    const myModal = new bootstrap.Modal(`#${idModal}`, {
        keyboard: false
    });
    myModal.show();
}

function hideModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}