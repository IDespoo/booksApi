document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(json => showBooks(json))
        .catch(function(error) {
            console.log(error);
        });
});

function showBooks(books) {
    let arrayBooks = '';
    for (let i = 0; i < books.length; i += 2) {
        arrayBooks += '<div class="row">';
        for (let j = 0; j < 2 && i + j < books.length; j++) {
            const book = books[i + j];
            if (book.status === true) {
                arrayBooks += `
                    <div class="col-md-6">
                        <div class="card mb-3" style="max width: 440px;">
                            <div class="row g-0">
                                <div class="col-md-4">
                                    <img src="${book.imgURL}" class="img-fluid rounded-start h-100" alt="${book.title}">
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title">${book.title}</h5>
                                        <p class="card-text">${book.author}</p>
                                        <p class="card-text"><small class="text-muted">${book.genre}</small></p>
                                        <p class="card-text"><small class="text-muted">${book.price}</small></p>
                                        <p class="card-text"><small class="text-muted">${book.numPages}</small></p>
                                        <p class="card-text"><small class="text-muted">${book.status}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
        }
        arrayBooks += '</div>';
    }

    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = arrayBooks;
}

