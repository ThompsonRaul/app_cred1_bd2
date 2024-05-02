import { executeQuery } from "infra/database.js";

async function booksPerAuthor(request, response) {
  const { id } = request.query; // Extrai o ID do autor da URL

  try {
    const updatedAt = new Date().toISOString();

    // Executando a procedure para contar os livros por autor
    const result = await executeQuery({
      query: "CALL contar_livros_por_autor(?)",
      values: [id], // Passando o ID do autor para a procedure
    });

    // Extrair o número de livros do resultado
    const descricao = result[0][0];

    response.status(200).json({
      updated_at: updatedAt,
      autor_id: id,
      descricao: descricao,
    });
  } catch (error) {
    console.error("Erro ao recuperar o número de livros por autor:", error);
    response.status(500).json({
      error: "Erro ao recuperar o número de livros por autor",
    });
  }
}

export default booksPerAuthor;
