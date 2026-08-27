// Servidor solo para desarrollo local (npm start).
// En Vercel, el frontend (index.html/style.css/script.js) se sirve como
// archivos estáticos desde la raíz y /api/calcular corre como función serverless
// (ver api/calcular.js). Este archivo no se usa en producción en Vercel.

const express = require('express');
const path = require('path');
const { calcularVenta } = require('./calculadora');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/calcular', (req, res) => {
  const { cantidad, paridad } = req.query;
  const resultado = calcularVenta(cantidad, paridad);

  if (!resultado.ok) {
    return res.status(400).json(resultado);
  }
  res.json(resultado);
});

app.listen(PORT, () => {
  console.log(`Calculadora ELDOR corriendo en http://localhost:${PORT}`);
});
