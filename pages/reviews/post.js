import { useState } from "react";
import { useRouter } from "next/router";

const PostReview = () => {
  const router = useRouter();
  const [review, setReview] = useState({
    livroID: "",
    usuarioID: "",
    nota: 0,
    comentario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/reviews/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "Erro ao inserir avaliação");
      }
      alert(data.message); // Exibe a mensagem de sucesso em um alert
      router.push("/"); // Redireciona para a página inicial após fechar o alert
    } catch (error) {
      console.error("Erro ao inserir avaliação:", error);
      alert(error.message || "Erro ao inserir avaliação"); // Exibe o erro em um alert
    }
  };

  return (
    <div>
      <h1>Inserir Avaliação</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="livroID"
          placeholder="Livro ID"
          value={review.livroID}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="usuarioID"
          placeholder="Usuário ID"
          value={review.usuarioID}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="nota"
          placeholder="Nota"
          value={review.nota}
          onChange={handleChange}
          required
        />
        <textarea
          name="comentario"
          placeholder="Comentário"
          value={review.comentario}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Inserir Avaliação</button>
      </form>
      <button onClick={() => router.push("/")}>Voltar</button>
    </div>
  );
};

export default PostReview;
