import { executeQuery } from "infra/database.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Método não permitido
  }

  const { livroID, usuarioID, nota, comentario } = req.body;

  try {
    const queryInsert = `
      INSERT INTO Avaliacoes (LivroID, UsuarioID, Nota, Comentario)
      VALUES (?, ?, ?, ?)
    `;
    await executeQuery({
      query: queryInsert,
      values: [livroID, usuarioID, nota, comentario],
    });

    const queryBook = `
      SELECT Titulo FROM Livros WHERE LivroID = ?
    `;
    const bookResult = await executeQuery({
      query: queryBook,
      values: [livroID],
    });

    const livroNome = bookResult[0].Titulo;
    const successMessage = `Nova avaliação inserida para o livro: ${livroNome}`;

    res.status(200).json({ success: true, message: successMessage });
  } catch (error) {
    console.error("Erro ao inserir avaliação:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao inserir avaliação" });
  }
}
