import Link from "next/link";

function Home() {
  return (
    <>
      <div>
        <h1>Segunda parte do crédito de BD II</h1>
        <h2>Escolha o que quer fazer:</h2>
        <Link href="/books">Listar Livros</Link>
        <br></br>
        <Link href="/books/details">Listar Livro Específico</Link>
        <br></br>
        <Link href="/reviews">Listar Avaliações</Link>
        <br></br>
        <Link href="/reviews/details">Listar Avaliações por Usuário</Link>
        <br></br>
        <Link href="/users">Listar Usuários</Link>
        <br></br>
        <Link href="/authors">Listar Autores</Link>
        <br></br>
        <Link href="/books/most_recent">Mostrar Livro Mais Recente</Link>
        <br></br>
        <Link href="/books/books_per_author">Listar Livros por Autor</Link>
        <br></br>
        <Link href="/reviews/reviews_per_book">
          Listar Média de Avaliações por Livro
        </Link>
        <br></br>
        <Link href="/books/post">Inserir Livro</Link>
        <br></br>
        <Link href="/reviews/post">Inserir Avaliação</Link>
        <br></br>
        <Link href="/books/delete">Deletar Livro</Link>
        <br></br>
        <Link href="/books/delete/deleted_books">Mostrar Livros Deletados</Link>
        <br></br>
        <Link href="/authors/update">Atualizar Autor</Link>
      </div>
    </>
  );
}
export default Home;
