import { Router } from 'express';
import pool from '../database.js';

const router = Router();

// ─── REGISTRAR ──────────────────────────────────────────

router.get('/add', (req, res) => {
    res.render('personas/add');
});

router.post('/add', async (req, res) => {
    try {
        const { name, lastname, age, email, password } = req.body;
        await pool.query('INSERT INTO clientes SET ?', [{ nombre: name, lastname, age, email, password }]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── LOGIN ──────────────────────────────────────────────

router.get('/login', (req, res) => {
    res.render('personas/login');
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const [result] = await pool.query(
            'SELECT * FROM clientes WHERE email = ? AND password = ?',
            [email, password]
        );
        if (result.length > 0) {
            res.redirect('/perfil/' + result[0].id_cliente);
        } else {
            res.render('personas/login', { error: 'Email o contraseña incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── LISTADO ─────────────────────────────────────────────

router.get('/list', async (req, res) => {
    try {
        const [clientes] = await pool.query('SELECT * FROM clientes');
        res.render('personas/list', { concesionario: { clientes } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── PERFIL ──────────────────────────────────────────────

router.get('/perfil/:id', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
        res.render('personas/perfil', { persona: result[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── EDITAR ──────────────────────────────────────────────

router.get('/edit/:id', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM clientes WHERE id_cliente = ?', [req.params.id]);
        res.render('personas/edit', { persona: result[0] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        const { name, lastname, age, email, password } = req.body;
        await pool.query('UPDATE clientes SET ? WHERE id_cliente = ?', 
            [{ nombre: name, lastname, age, email, password }, req.params.id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ─── ELIMINAR ────────────────────────────────────────────

router.get('/delete/:id', async (req, res) => {
    try {
        await pool.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;