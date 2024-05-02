import { useState, useEffect } from "react";

function UpdateBook() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [title, setTitle] = useState("");
  const [numPages, setNumPages] = useState("");
  const [synopsis, setSynopsis] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch("/api/v1/books");
      const data = await response.json();
      setBooks(data.books);
    }
    fetchBooks();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedBookId) {
      alert("Por favor, selecione um livro para atualizar.");
      return;
    }
    const response = await fetch(`/api/v1/books/update/${selectedBookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titulo: title,
        numPaginas: numPages,
        sinopse: synopsis,
      }),
    });
    const data = await response.json();
    alert(data.message);
    if (data.success) {
      // Atualizar a lista de livros ou redirecionar
    }
  };

  return (
    <div>
      <h1>Atualizar Livro</h1>
      <form onSubmit={handleUpdate}>
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
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Novo título"
        />
        <input
          type="number"
          value={numPages}
          onChange={(e) => setNumPages(e.target.value)}
          placeholder="Número de páginas"
        />
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          placeholder="Sinopse"
        ></textarea>
        <button type="submit">Atualizar Livro</button>
      </form>
    </div>
  );
}

export default UpdateBook;
