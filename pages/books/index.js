import React, { useEffect, useState } from "react";
import Link from "next/link"; // Importa o componente Link do Next.js

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await fetch("/api/v1/books");
        if (!response.ok) {
          throw new Error("Erro ao recuperar livros");
        }
        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <p>Carregando livros...</p>;
  }

  return (
    <div>
      <h1>Lista de Livros</h1>
      <Link href="/">Voltar</Link>
      <ul>
        {books.map((book) => (
          <li key={book.LivroID}>
            {book.Titulo} - {book.Autores} - {book.NomeEditora}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;
