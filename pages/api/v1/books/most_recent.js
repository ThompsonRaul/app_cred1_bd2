import { executeQuery } from "infra/database.js";

async function most_recent_book(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // Executando a procedure para encontrar o livro mais recente
    const result = await executeQuery({
      query: "CALL encontrar_livro_mais_recente()",
    });

    // Extrair o título do livro mais recente do resultado
    const livroMaisRecente = result[0][0].Livro_Mais_Recente;

    response.status(200).json({
      updated_at: updatedAt,
      livro_mais_recente: livroMaisRecente,
    });
  } catch (error) {
    console.error("Erro ao recuperar livro mais recente:", error);
    response
      .status(500)
      .json({ error: "Erro ao recuperar livro mais recente" });
  }
}

export default most_recent_book;
