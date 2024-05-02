import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  const { id } = req.query; // ID do livro vindo da URL
  const { titulo, numPaginas, sinopse } = req.body; // Dados para atualização

  try {
    const query = `
      UPDATE Livros 
      SET Titulo = ?, NumPaginas = ?, Sinopse = ?
      WHERE LivroID = ?;
    `;
    const result = await executeQuery({
      query,
      values: [titulo, numPaginas, sinopse, id],
    });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Livro não encontrado" });
    }

    res
      .status(200)
      .json({ success: true, message: "Livro atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao atualizar livro" });
  }
}
