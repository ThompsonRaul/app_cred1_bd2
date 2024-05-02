import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res
      .status(405)
      .json({ success: false, message: "Método não permitido" });
  }

  const { id } = req.query;
  const { nomeAutor } = req.body;

  try {
    const query = "UPDATE Autores SET NomeAutor = ? WHERE AutorID = ?";
    const result = await executeQuery({ query, values: [nomeAutor, id] });

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Autor não encontrado" });
    }

    res
      .status(200)
      .json({ success: true, message: "Autor atualizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao atualizar autor" });
  }
}
