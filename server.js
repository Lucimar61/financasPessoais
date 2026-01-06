const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados (Configuração do Model no Servidor)
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'financas_pessoais',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
    if (err) console.error('Erro no Pool:', err);
    else {
        console.log('Pool de conexões pronto!');
        conn.release();  // Devolve a conexão para o pool
    }
});

// Rota para Salvar Despesa (Action do Controller no Servidor)
app.post('/despesas', (req, res) => {
    const {descricao, valor, categoria, subcategoria, data } = req.body;

    // Validação básica 
    if (!descricao || !valor || !data) {
        return res.status(400).json({error: "CAmpos obrigatórios faltando!"})
    }
    
    const query = 'INSERT INTO despesas (descricao, valor, categoria, subcategoria, data_vencimento) VALUES(?, ?, ?, ?, ?)';

    db.query(query, [descricao, valor, categoria, subcategoria, data], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({id: result.insertId, message: 'Despesa cadastrada!' });
    });

});

const PORT = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Servidor rodando na porta ${PORT}`));