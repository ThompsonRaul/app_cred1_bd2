const mysql = require("mysql2/promise"); // Importa o módulo mysql2/promise

// Configurações de conexão com o banco de dados
const connectionConfig = {
  host: process.env.MYSQL_HOST, // Endereço do servidor do banco de dados
  user: process.env.MYSQL_USER, // Nome de usuário do banco de dados
  password: process.env.MYSQL_PASSWORD, // Senha do banco de dados
  database: process.env.MYSQL_DB, // Nome do banco de dados
};

// Função para obter uma conexão do banco de dados
async function getConnection() {
  return await mysql.createConnection(connectionConfig); // Retorna uma conexão
}

// Função para executar consultas SQL
async function executeQuery({ query, values = [] }) {
  const connection = await getConnection();
  try {
    const [results] = await connection.query(query, values); // Executa a consulta com os valores
    return results;
  } finally {
    await connection.end(); // Fecha a conexão após a consulta
  }
}

module.exports = { executeQuery };
