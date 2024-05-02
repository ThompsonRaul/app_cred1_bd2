import Link from "next/link";
import React from "react";

function Home() {
  const links = [
    { href: "/books", label: "Listar Livros" },
    { href: "/books/details", label: "Listar Livro Específico" },
    { href: "/reviews", label: "Listar Avaliações" },
    { href: "/reviews/details", label: "Listar Avaliações por Usuário" },
    { href: "/users", label: "Listar Usuários" },
    { href: "/authors", label: "Listar Autores" },
    { href: "/books/most_recent", label: "Mostrar Livro Mais Recente" },
    { href: "/books/books_per_author", label: "Listar Livros por Autor" },
    {
      href: "/reviews/reviews_per_book",
      label: "Listar Média de Avaliações por Livro",
    },
    { href: "/books/post", label: "Inserir Livro" },
    { href: "/reviews/post", label: "Inserir Avaliação" },
    { href: "/books/delete", label: "Deletar Livro" },
    { href: "/books/delete/deleted_books", label: "Mostrar Livros Deletados" },
    { href: "/authors/update", label: "Atualizar Autor" },
    { href: "/books/update", label: "Atualizar Livro" },
    { href: "/books/count", label: "Contagem de Livros" }, // Esta linha foi adicionada para incluir o último item.
  ];

  // Ordenando os links por rótulo para exibição organizada
  links.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <div>
        <h1>Segunda parte do crédito de BD II</h1>
        <h2>Escolha o que quer fazer:</h2>
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link href={link.href}>{link.label}</Link>
            <br />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Home;
