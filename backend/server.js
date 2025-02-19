require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error(err.message);
  else console.log('✅ Conectado ao SQLite');
});

// Criar tabela de produtos se não existir
db.run(`CREATE TABLE IF NOT EXISTS produtos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  preco REAL NOT NULL,
  estoque INTEGER NOT NULL
)`);

// Rota para listar produtos
app.get('/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota para adicionar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco, estoque } = req.body;
  db.run(
    'INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)',
    [nome, preco, estoque],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, nome, preco, estoque });
    }
  );
});

// Rota para editar um produto
app.put('/produtos/:id', (req, res) => {
  const { nome, preco, estoque } = req.body;
  const { id } = req.params;
  db.run(
    'UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?',
    [nome, preco, estoque, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  );
});

// Rota para excluir um produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM produtos WHERE id = ?', id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Produto excluído com sucesso' });
  });
});

// Iniciar o servidor
app.listen(port, () => console.log(`🚀 Servidor rodando na porta ${port}`));
