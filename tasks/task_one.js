class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.titleEl = document.querySelector('.title');
        this.authorEl = document.querySelector('.author');
        this.btn = document.querySelector('button');
        this.emptyDiv = document.querySelector('.booklist');
        this.library = document.querySelector('#library');
        this.container = document.createElement('div');
        this.listCont = document.createElement('ol');
        this.form = document.querySelector('form');
        this.alertMessage = document.createElement('p');
        
        this.form.prepend(this.alertMessage);
        
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addBook();
            this.titleEl.value = '';
            this.authorEl.value = '';
        });

        this.library.addEventListener('click', () => {
            this.emptyDiv.style.display = 'block';
            this.form.style.display = 'none';
        });

        window.addEventListener('load', () => {
            this.emptyDiv.style.display = 'none';
            this.form.style.display = 'block';
        });
        
        this.loadFromLocalStorage();
    }

    addBook() {
        const title = this.titleEl.value;
        const author = this.authorEl.value;
        const book = new Book(title, author);
        
        setTimeout(() => {
            this.alertMessage.textContent = 'hidden';
        }, 3000);

        if (title === '' || author === '') {
            this.alertMessage.textContent = 'Author or Title must not be empty';
            this.alertMessage.className = 'error';
        } else {
            this.books.push(book);
            localStorage.setItem('key', JSON.stringify(this.books) || []);
            this.alertMessage.textContent = 'Your book has been added';
            this.alertMessage.className = 'pushed';
            this.loadFromLocalStorage();
        }
    }

    loadFromLocalStorage() {
        this.listCont.innerHTML = '';
        const storedBooks = JSON.parse(localStorage.getItem('key')) || [];
        storedBooks.forEach(book => {
            const bookList = document.createElement('li');
            bookList.innerText = `${book.title} by ${book.author}`;
            this.listCont.appendChild(bookList);
        });
        this.emptyDiv.innerHTML = '';
        this.emptyDiv.appendChild(this.listCont);
    }
}

const libraryApp = new Library();