import React, { useEffect, useState } from "react";
import Link from "next/link"; // Importa o componente Link do Next.js

function DeletedBooksList() {
  const [deletedBooks, setDeletedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDeletedBooks() {
      try {
        const response = await fetch("/api/v1/books/delete/deleted_books");
        if (!response.ok) {
          throw new Error("Erro ao recuperar livros deletados");
        }
        const data = await response.json();
        setDeletedBooks(data.deleted_books);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    }

    fetchDeletedBooks();
  }, []);

  if (loading) {
    return <p>Carregando livros deletados...</p>;
  }

  return (
    <div>
      <h1>Lista de Livros Deletados</h1>
      <Link href="/">Voltar</Link>
      <ul>
        {deletedBooks.map((book) => (
          <li key={book.DeletadoID}>
            Título: {book.Titulo}, Data de Deleção: {book.DataDeletado}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeletedBooksList;
