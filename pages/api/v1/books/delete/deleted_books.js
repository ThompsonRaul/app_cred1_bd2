import { executeQuery } from "infra/database.js";

async function deletedBooks(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // Executando uma consulta para obter os livros deletados
    const deletedBooksResults = await executeQuery({
      query: "SELECT * FROM HistoricoLivrosDeletados",
    });

    response.status(200).json({
      updated_at: updatedAt,
      deleted_books: deletedBooksResults,
    });
  } catch (error) {
    console.error("Erro ao recuperar livros deletados:", error);
    response.status(500).json({ error: "Erro ao recuperar livros deletados" });
  }
}

export default deletedBooks;
