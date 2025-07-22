/*
function showBooks(){
    library.forEach((book) => {
    console.log(`"${book.title}" de ${book.author}, com ${book.pages} páginas. Lido: ${book.read ? 'Sim' : 'Não'}`);
    });
} 
*/   

// Construtor do Book
function Book(title, author, pages){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

// Array
const library = [];

// Funcao que adiciona livro no array
function addBookToLibrary(title, author, pages) {
  const book = new Book(title, author, pages);
  library.push(book);
  createSlot(book);
  
}

// Modal
const openModalBtn = document.getElementById('open-modal-button');
const modal = document.getElementById('modal');

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

const bookForm = document.getElementById('book-form');

bookForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita o recarregamento da página

  const title = document.getElementById('book-title').value.trim();
  const author = document.getElementById('book-author').value.trim();
  const pages = parseInt(document.getElementById('book-pages').value);

  if (!title || !author || isNaN(pages)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  addBookToLibrary(title, author, pages); // Passo 5
  bookForm.reset(); // Passo 6 — Limpa os inputs
  modal.classList.add('hidden'); // Passo 7 — Fecha modal
});

  //Fecha modal com esc
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });

// Funcao que cria o slot (HTML)
function createSlot(book){
  const container = document.getElementById('main');
  const slot = document.createElement('div');
  slot.classList.add('slot');
  slot.setAttribute('data-id', book.id);

  //Titulo
  const titleEl = document.createElement('p');
  titleEl.classList.add('book-title');
  titleEl.textContent = book.title;
  slot.appendChild(titleEl);

  //Autor
  const authorEl = document.createElement('p');
  authorEl.classList.add('book-author');
  authorEl.textContent = book.author;
  slot.appendChild(authorEl);

  //Pages
  const pagesEl = document.createElement('p');
  pagesEl.classList.add('book-pages');
  pagesEl.textContent = book.pages;
  slot.appendChild(pagesEl);

  //Div de botoes
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('book-buttons');

    //Botao de status
      const statusBtn = document.createElement('button');
      statusBtn.classList.add('book-status-button');
      statusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22
        22 17.5 22 12 17.5 2 12 2M12 20C7.59 20 4 16.41
        4 12S7.59 4 12 4 20 7.59 20 12 16.41 20 12
        20M16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18
        9L16.59 7.58Z"/></svg>`;

      //Evento do botao status
      statusBtn.addEventListener('click', () => {
        const svg = statusBtn.querySelector('svg');
        svg.classList.toggle('active');
        book.read = !book.read;
      });
      buttonsDiv.appendChild(statusBtn);

    //Botao de deletar
      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('book-delete-button');
      deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2
        0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,
        8V17H11V8H9M13,8V17H15V8H13Z"/></svg>`;
      
      //Evento do botao de deletar
      deleteBtn.addEventListener('click', () => {
        // Remove do array
        const index = library.findIndex(item => item.id === book.id);
        if (index !== -1) {
          library.splice(index, 1);
        }
        // Remove do DOM
        slot.remove(); 
      });
      buttonsDiv.appendChild(deleteBtn);
    slot.appendChild(buttonsDiv);
  main.appendChild(slot);
}

//Teste
addBookToLibrary('Descolonizando Afetos', 'Geni Nunez', 188);
addBookToLibrary('Descolonizando Afetoss', 'Geni Nunesz', 187);
