import { useState } from "react";

const PostBook = () => {
  const [livro, setLivro] = useState({
    titulo: "",
    dataPublicacao: "",
    numPaginas: 0,
    sinopse: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/books/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(livro),
      });
      const data = await response.json();
      if (data.success) {
        alert("Livro inserido com sucesso!");
        setLivro({
          titulo: "",
          dataPublicacao: "",
          numPaginas: 0,
          sinopse: "",
        });
      } else {
        alert(data.message || "Erro ao inserir livro");
      }
    } catch (error) {
      console.error("Erro ao inserir livro:", error);
      alert("Erro ao inserir livro");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Inserir Livro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={livro.titulo}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataPublicacao"
          value={livro.dataPublicacao}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numPaginas"
          placeholder="Número de páginas"
          value={livro.numPaginas}
          onChange={handleChange}
          required
        />
        <textarea
          name="sinopse"
          placeholder="Sinopse"
          value={livro.sinopse}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Inserir Livro</button>
      </form>
    </div>
  );
};

export default PostBook;
