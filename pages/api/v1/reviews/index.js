import { executeQuery } from "infra/database.js";

async function reviews(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    const reviewsResults = await executeQuery({
      query: "SELECT * FROM avaliacoesdetalhadas",
    });

    response.status(200).json({
      updated_at: updatedAt,
      reviews: reviewsResults,
    });
  } catch (error) {
    console.error("Erro ao recuperar livros:", error);
    response.status(500).json({ error: "Erro ao recuperar livros" });
  }
}

export default reviews;
