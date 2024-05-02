import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).end(); // Método não permitido
  }

  const { id } = req.query; // Captura o ID do livro a partir do URL

  try {
    const query = "DELETE FROM Livros WHERE LivroID = ?";
    const result = await executeQuery({ query, values: [id] });
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Livro não encontrado" });
    }
    res
      .status(200)
      .json({ success: true, message: "Livro deletado com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    res.status(500).json({ success: false, message: "Erro ao deletar livro" });
  }
}
