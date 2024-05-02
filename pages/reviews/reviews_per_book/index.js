import { useState, useEffect } from "react";

function SelectBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [reviewDetails, setReviewDetails] = useState(null);

  // Carregar livros ao iniciar o componente
  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/v1/books");
      const data = await response.json();
      setBooks(data.books);
    }
    fetchBooks();
  }, []);

  async function fetchReviewsForBook(id) {
    console.log(`Fetching reviews for book ID: ${id}`);
    const response = await fetch(`/api/v1/reviews/reviews_per_book/${id}`);
    const data = await response.json();
    console.log("Received data:", data);
    setReviewDetails(data);
  }

  // Lidar com a mudança de seleção do livro
  function handleBookChange(event) {
    setSelectedBookId(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`Selected book ID: ${selectedBookId}`);
    fetchReviewsForBook(selectedBookId);
  }

  return (
    <div>
      <h1>Selecione um Livro</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedBookId} onChange={handleBookChange}>
          <option value="">Selecione um livro</option>
          {books.map((book) => (
            <option key={book.LivroID} value={book.LivroID}>
              {book.Titulo}
            </option>
          ))}
        </select>
        <button type="submit">Ver Avaliações</button>
      </form>

      {reviewDetails && (
        <div>
          <h2>Detalhes do Livro</h2>
          <p>Título: {reviewDetails.descricao.Titulo}</p>
          <p>Autor: {reviewDetails.descricao.Autor}</p>
          <p>Média de Avaliação: {reviewDetails.descricao.Media_Avaliacao}</p>
        </div>
      )}
    </div>
  );
}

export default SelectBook;
