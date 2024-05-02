import { useState, useEffect } from "react";

function UpdateAuthor() {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState("");
  const [newAuthorName, setNewAuthorName] = useState("");

  useEffect(() => {
    async function fetchAuthors() {
      const response = await fetch("/api/v1/authors");
      const data = await response.json();
      setAuthors(data.authors);
    }
    fetchAuthors();
  }, []);

  async function handleUpdate() {
    if (!selectedAuthorId) {
      alert("Por favor, selecione um autor para atualizar.");
      return;
    }
    if (!newAuthorName.trim()) {
      alert("Por favor, insira um novo nome para o autor.");
      return;
    }

    const response = await fetch(`/api/v1/authors/update/${selectedAuthorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nomeAutor: newAuthorName }),
    });

    const data = await response.json();
    alert(data.message);
    if (data.success) {
      // Update the local state to reflect the change
      setAuthors(
        authors.map((author) =>
          author.AutorID === parseInt(selectedAuthorId)
            ? { ...author, NomeAutor: newAuthorName }
            : author
        )
      );
      setSelectedAuthorId(""); // Reset selected ID
      setNewAuthorName(""); // Clear input field
    }
  }

  return (
    <div>
      <h1>Atualizar Autor</h1>
      <select
        value={selectedAuthorId}
        onChange={(e) => setSelectedAuthorId(e.target.value)}
      >
        <option value="">Selecione um autor</option>
        {authors.map((author) => (
          <option key={author.AutorID} value={author.AutorID}>
            {author.NomeAutor}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Novo nome do autor"
        value={newAuthorName}
        onChange={(e) => setNewAuthorName(e.target.value)}
      />
      <button onClick={handleUpdate}>Atualizar Autor</button>
    </div>
  );
}

export default UpdateAuthor;
