import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  try {
    const query = "SELECT TotalLivros FROM ContagemLivros";
    const results = await executeQuery({ query });

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Dados não encontrados" });
    }

    res
      .status(200)
      .json({ success: true, totalLivros: results[0].TotalLivros });
  } catch (error) {
    console.error("Erro ao recuperar a contagem de livros:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao recuperar a contagem de livros",
      });
  }
}
