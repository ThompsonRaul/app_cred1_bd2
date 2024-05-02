import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  const { id } = req.query; // Captura o ID do livro da URL

  try {
    const query = "CALL ObterDetalhesLivro(?)";
    const results = await executeQuery({
      query,
      values: [id],
    });

    if (results[0].length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Livro não encontrado" });
    }

    const bookDetails = results[0];
    res.status(200).json({
      success: true,
      message: "Detalhes do livro recuperados com sucesso",
      data: bookDetails,
    });
  } catch (error) {
    console.error("Erro ao recuperar detalhes do livro:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao recuperar detalhes do livro" });
  }
}
