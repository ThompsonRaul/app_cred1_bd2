import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  const { id } = req.query; // Captura o ID do usuário da URL

  try {
    // Chama a procedure armazenada passando o ID do usuário como parâmetro
    const results = await executeQuery({
      query: "CALL ObterAvaliacoesDetalhadasPorUsuario(?)",
      values: [id],
    });

    if (results[0].length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Nenhuma avaliação encontrada para este usuário.",
        });
    }

    res.status(200).json({
      success: true,
      message: "Avaliações detalhadas recuperadas com sucesso.",
      data: results[0],
    });
  } catch (error) {
    console.error("Erro ao recuperar avaliações detalhadas:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao recuperar avaliações detalhadas",
      });
  }
}
