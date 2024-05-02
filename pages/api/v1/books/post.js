import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Método não permitido
  }

  const { titulo, dataPublicacao, numPaginas, sinopse } = req.body;

  try {
    const query = `
      INSERT INTO Livros (Titulo, DataPublicacao, NumPaginas, Sinopse)
      VALUES (?, ?, ?, ?)
    `;
    await executeQuery({
      query,
      values: [titulo, dataPublicacao, numPaginas, sinopse],
    });

    res
      .status(200)
      .json({ success: true, message: "Livro inserido com sucesso!" });
  } catch (error) {
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      // Se for uma exceção de sinal do MySQL, usamos a mensagem do banco de dados
      const errorMessage = error.message;
      console.log(errorMessage);
      return res.status(400).json({ success: false, message: errorMessage });
    }
    console.error("Erro ao inserir livro:", error);
    res.status(500).json({ success: false, message: "Erro ao inserir livro" });
  }
}
