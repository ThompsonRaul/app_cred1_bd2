import { useState, useEffect } from "react";

function SelectBookDetails() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);

  // Carregar livros ao iniciar o componente
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/v1/books");
      const data = await response.json();
      setBooks(data.books);
    }
    fetchBooks();
  }, []);

  async function fetchBookDetails(id) {
    console.log(`Fetching details for book ID: ${id}`);
    const response = await fetch(`/api/v1/books/details/${id}`);
    const data = await response.json();
    console.log("Received data:", data);
    setBookDetails(data.data);
  }

  // Lidar com a mudança de seleção do livro
  function handleBookChange(event) {
    setSelectedBookId(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Selected book ID: ${selectedBookId}`);
    fetchBookDetails(selectedBookId);
  }

  return (
    <div>
      <h1>Selecione um Livro para Ver Detalhes</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedBookId} onChange={handleBookChange}>
          <option value="">Selecione um livro</option>
          {books.map((book) => (
            <option key={book.LivroID} value={book.LivroID}>
              {book.Titulo}
            </option>
          ))}
        </select>
        <button type="submit">Ver Detalhes</button>
      </form>

      {bookDetails && (
        <div>
          <h2>Detalhes do Livro</h2>
          <p>Título: {bookDetails[0].Titulo}</p>
          <p>Data de Publicação: {bookDetails[0].DataPublicacao}</p>
          <p>Número de Páginas: {bookDetails[0].NumPaginas}</p>
          <p>Sinopse: {bookDetails[0].Sinopse}</p>
        </div>
      )}
    </div>
  );
}

export default SelectBookDetails;
