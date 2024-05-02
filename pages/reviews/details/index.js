import { useState, useEffect } from "react";

function ReviewDetails() {
  const [users, setUsers] = useState([]); // Armazena a lista de usuários
  const [selectedUserId, setSelectedUserId] = useState(""); // ID do usuário selecionado
  const [reviews, setReviews] = useState(null); // Armazena as avaliações do usuário selecionado

  // Carrega a lista de usuários ao iniciar o componente
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/v1/users");
      const data = await response.json();
      setUsers(data.users);
    }
    fetchUsers();
  }, []);

  // Função para buscar avaliações detalhadas de um usuário específico
  async function fetchReviewDetails(userId) {
    const response = await fetch(`/api/v1/reviews/details/${userId}`);
    const data = await response.json();
    if (data.success) {
      setReviews(data.data);
    } else {
      alert(data.message); // Mostra uma mensagem em caso de erro ou usuário sem avaliações
      setReviews(null);
    }
  }

  // Manipula a submissão do formulário para buscar avaliações
  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedUserId) {
      alert("Por favor, selecione um usuário.");
      return;
    }
    fetchReviewDetails(selectedUserId);
  }

  return (
    <div>
      <h1>Detalhes das Avaliações por Usuário</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="user-select">Escolha um Usuário:</label>
        <select
          id="user-select"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.UsuarioID} value={user.UsuarioID}>
              {user.Nome}
            </option>
          ))}
        </select>
        <button type="submit">Buscar Avaliações</button>
      </form>
      {reviews && (
        <div>
          <h2>Avaliações do Usuário</h2>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map((review) => (
                <li key={review.AvaliacaoID}>
                  <p>Livro: {review.Titulo}</p>
                  <p>Nota: {review.Nota}</p>
                  <p>Comentário: {review.Comentario}</p>
                  <p>
                    Data: {new Date(review.DataAvaliacao).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma avaliação encontrada para este usuário.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewDetails;
