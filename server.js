const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados (Configuração do Model no Servidor)
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financas_pessoais'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao Banco de Dados MySQL!');
});

// Rota para Salvar Despesa (Action do Controller no Servidor)
app.post('/despesas', (req, res) => {
    const {descricao, valor, categoria, subcategoria, data } = req.body;

    const query = 'INSERT INTO despesas (descricao, valor, categoria, subcategoria, data_vencimento) VALUES(?, ?, ?, ?, ?)';

    db.query(query, [descricao, valor, categoria, subcategoria, data], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({id: result.insertId, message: 'Despesa cadastrada!' });
    });

});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));