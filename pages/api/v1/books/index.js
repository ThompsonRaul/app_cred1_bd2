import { executeQuery } from "infra/database.js";

async function books(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // Executando a consulta SQL
    const booksResults = await executeQuery({
      query: "SELECT * FROM livrosdetalhados",
    });

    response.status(200).json({
      updated_at: updatedAt,
      books: booksResults,
    });
  } catch (error) {
    console.error("Erro ao recuperar livros:", error);
    response.status(500).json({ error: "Erro ao recuperar livros" });
  }
}

export default books;
