import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [isLoading, setIsLoading] = useState(true); // Estado para controle de loading
  const [error, setError] = useState(""); // Estado para armazenar possíveis erros

  // Função para carregar usuários ao carregar o componente
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/v1/users");
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Erro ao buscar usuários");
        }
        setUsers(data.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {isLoading ? (
        <p>Carregando...</p>
      ) : error ? (
        <p>Erro: {error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nível</th>
              <th>Avaliações Feitas</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.UsuarioID}>
                <td>{user.UsuarioID}</td>
                <td>{user.Nome}</td>
                <td>{user.Email}</td>
                <td>{user.Nivel}</td>
                <td>{user.QuantidadeAvaliacoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Users;
