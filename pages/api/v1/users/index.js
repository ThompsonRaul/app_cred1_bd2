import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  try {
    const results = await executeQuery({
      query: "CALL ObterDetalhesUsuarios()",
    });

    if (results[0].length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Nenhum usuário encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Usuários recuperados com sucesso",
      users: results[0],
    });
  } catch (error) {
    console.error("Erro ao recuperar usuários:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao recuperar usuários" });
  }
}
