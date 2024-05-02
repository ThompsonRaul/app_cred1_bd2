import { executeQuery } from "infra/database.js";

async function authors(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // Executando a stored procedure para obter os detalhes dos autores
    const authorsResults = await executeQuery({
      query: "CALL ObterDetalhesAutores()",
    });
    const descricao = authorsResults[0];

    response.status(200).json({
      updated_at: updatedAt,
      authors: descricao,
    });
  } catch (error) {
    console.error("Erro ao recuperar autores:", error);
    response.status(500).json({ error: "Erro ao recuperar autores" });
  }
}

export default authors;
