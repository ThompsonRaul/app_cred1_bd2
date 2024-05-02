import React, { useEffect, useState } from "react";
import Link from "next/link";

function BooksList() {
  const [livroMaisRecente, setLivroMaisRecente] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLivroMaisRecente() {
      try {
        const response = await fetch("/api/v1/books/most_recent");
        if (!response.ok) {
          throw new Error("Erro ao recuperar livro mais recente");
        }
        const data = await response.json();
        setLivroMaisRecente(data.livro_mais_recente);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchLivroMaisRecente();
  }, []);

  if (loading) {
    return <p>Carregando livro mais recente...</p>;
  }

  return (
    <div>
      <h1>Lista de Livros</h1>
      <p>Livro Mais Recente: {livroMaisRecente}</p>
      <Link href="/">Voltar</Link>
    </div>
  );
}

export default BooksList;
