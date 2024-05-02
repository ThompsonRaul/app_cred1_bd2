import { useState, useEffect } from "react";

function DeleteBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/v1/books");
      const data = await response.json();
      setBooks(data.books);
    }
    fetchBooks();
  }, []);

  async function handleDelete() {
    if (!selectedBookId) {
      alert("Por favor, selecione um livro para deletar.");
      return;
    }
    if (
      confirm(`Tem certeza que deseja deletar o livro ID ${selectedBookId}?`)
    ) {
      const response = await fetch(`/api/v1/books/delete/${selectedBookId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      alert(data.message);
      if (data.success) {
        setBooks(
          books.filter((book) => book.LivroID !== parseInt(selectedBookId))
        );
        setSelectedBookId(""); // Reset selecionado ID
      }
    }
  }

  return (
    <div>
      <h1>Deletar Livro</h1>
      <select
        value={selectedBookId}
        onChange={(e) => setSelectedBookId(e.target.value)}
      >
        <option value="">Selecione um livro</option>
        {books.map((book) => (
          <option key={book.LivroID} value={book.LivroID}>
            {book.Titulo}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Deletar Livro</button>
    </div>
  );
}

export default DeleteBook;
