import { useState, useEffect } from "react";

function SelectAuthor() {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [bookDetails, setBookDetails] = useState(null);

  // Carregar autores ao iniciar o componente
  useEffect(() => {
    async function fetchAuthors() {
      const response = await fetch("/api/v1/authors");
      const data = await response.json();
      setAuthors(data.authors);
    }
    fetchAuthors();
  }, []);

  // Função para buscar os livros de um autor específico
  async function fetchBooksForAuthor(id) {
    const response = await fetch(`/api/v1/books/books_per_author/${id}`);
    const data = await response.json();
    setBookDetails(data);
  }

  // Lidar com a mudança de seleção do autor
  function handleAuthorChange(event) {
    setSelectedAuthorId(event.target.value);
  }

  // Lidar com o envio do formulário
  function handleSubmit(event) {
    event.preventDefault();
    fetchBooksForAuthor(selectedAuthorId);
  }

  return (
    <div>
      <h1>Selecione um Autor</h1>
      <form onSubmit={handleSubmit}>
        <select value={selectedAuthorId} onChange={handleAuthorChange}>
          <option value="">Selecione um autor</option>
          {authors.map((author) => (
            <option key={author.AutorID} value={author.AutorID}>
              {author.NomeAutor}
            </option>
          ))}
        </select>
        <button type="submit">Ver Livros</button>
      </form>

      {bookDetails && (
        <div>
          <h2>Detalhes do Autor</h2>
          <p>Autor: {bookDetails.descricao.Nome_Autor}</p>
          <p>Quantidade de Livros: {bookDetails.descricao.Quantidade_Livros}</p>
          <p>Livros: {bookDetails.descricao.Livros_Por_Autor}</p>
        </div>
      )}
    </div>
  );
}

export default SelectAuthor;
