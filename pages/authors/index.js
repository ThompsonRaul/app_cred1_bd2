import React, { useEffect, useState } from "react";
import Link from "next/link"; // Importa o componente Link do Next.js

function AuthorsList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await fetch("/api/v1/authors");
        if (!response.ok) {
          throw new Error("Erro ao recuperar autores");
        }
        const data = await response.json();
        setAuthors(data.authors);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }

    fetchAuthors();
  }, []);

  if (loading) {
    return <p>Carregando autores...</p>;
  }

  return (
    <div>
      <h1>Lista de Autores</h1>
      <Link href="/">Voltar</Link>
      <ul>
        {authors.map((author) => (
          <li key={author.AutorID}>{author.NomeAutor}</li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorsList;
