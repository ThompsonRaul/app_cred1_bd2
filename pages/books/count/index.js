import { useState, useEffect } from "react";

function BookCount() {
  const [totalLivros, setTotalLivros] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTotalBooks() {
      try {
        const response = await fetch("/api/v1/books/count");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message || "Erro ao buscar a contagem de livros"
          );
        }
        setTotalLivros(data.totalLivros);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTotalBooks();
  }, []);

  return (
    <div>
      <h1>Contagem Total de Livros</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro: {error}</p>
      ) : (
        <p>Total de Livros: {totalLivros}</p>
      )}
    </div>
  );
}

export default BookCount;
