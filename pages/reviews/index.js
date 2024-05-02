import React, { useEffect, useState } from "react";
import Link from "next/link";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/v1/reviews");
        if (!response.ok) {
          throw new Error("Erro ao recuperar avaliações");
        }
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchReviews();
  }, []);

  if (loading) {
    return <p>Carregando avaliações...</p>;
  }

  return (
    <div>
      <h1>Lista de Avaliações</h1>
      <Link href="/">Voltar</Link>
      <ul>
        {reviews.map((review) => (
          <li key={review.LivroID}>
            <p>Título: {review.Titulo}</p>
            <p>Usuário: {review.Nome}</p>
            <p>Nota: {review.Nota}</p>
            <p>Comentário: {review.Comentario}</p>
            <p>Data da Avaliação: {review.Datareview}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsList;
