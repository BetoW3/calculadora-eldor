# Calculadora de Venta ELDOR

Proyecto Node.js (Express) que calcula cuánto poner en "Precio total en USDT" al vender gemas, según la cantidad y la paridad elegida.

## Fórmula

- Precio base de referencia: **1500 gemas = 15 USDT** → 0.01 USDT por gema a paridad 1:1 (1.00).
- La paridad (0.10 a 1.00) es el % de ese precio base.
- `precio por gema = 0.01 * paridad`
- `bruto = cantidad * precio por gema`  ← esto es lo que cargás en "Precio total en USDT"
- `comisión (10%) = bruto * 0.10`
- `neto = bruto - comisión`  ← lo que realmente cobrás

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm start
```

Luego abrí [http://localhost:3000](http://localhost:3000) en el navegador.

## Estructura

```
eldor-calculadora/
├── server.js          # Servidor Express
├── calculadora.js      # Lógica de cálculo (reutilizable, testeable)
├── package.json
├── public/
│   ├── index.html      # Interfaz
│   ├── style.css
│   └── script.js        # Consulta al endpoint /api/calcular
```

## API

`GET /api/calcular?cantidad=1500&paridad=0.42`

Respuesta:
```json
{
  "ok": true,
  "cantidad": 1500,
  "paridad": 0.42,
  "precioPorGema": 0.0042,
  "precioPor100Gemas": 0.42,
  "bruto": 6.3,
  "comision": 0.63,
  "neto": 5.67
}
```
