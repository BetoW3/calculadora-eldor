const express = require('express');
const path = require('path');
const { calcularVenta } = require('./calculadora');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API: GET /api/calcular?cantidad=1500&paridad=0.42
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
