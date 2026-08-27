// Lógica de cálculo de la venta de gemas ELDOR.
// Precio base de referencia: 1500 gemas = 15 USDT => 0.01 USDT por gema a paridad 1:1 (1.00)

const PRECIO_BASE_POR_GEMA = 15 / 1500; // 0.01
const CANTIDAD_MINIMA = 1500;
const PARIDAD_MIN = 0.10;
const PARIDAD_MAX = 1.00;
const COMISION = 0.10; // 10% que retiene la casa

function calcularVenta(cantidad, paridad) {
  cantidad = Number(cantidad);
  paridad = Number(paridad);

  const errores = [];

  if (isNaN(cantidad) || cantidad < CANTIDAD_MINIMA) {
    errores.push(`La cantidad mínima es ${CANTIDAD_MINIMA} gemas.`);
  }
  if (isNaN(paridad) || paridad < PARIDAD_MIN || paridad > PARIDAD_MAX) {
    errores.push(`La paridad debe estar entre ${PARIDAD_MIN.toFixed(2)} y ${PARIDAD_MAX.toFixed(2)}.`);
  }

  if (errores.length > 0) {
    return { ok: false, errores };
  }

  const precioPorGema = PRECIO_BASE_POR_GEMA * paridad;
  const bruto = cantidad * precioPorGema;
  const comision = bruto * COMISION;
  const neto = bruto - comision;

  return {
    ok: true,
    cantidad,
    paridad,
    precioPorGema: Number(precioPorGema.toFixed(6)),
    precioPor100Gemas: Number((precioPorGema * 100).toFixed(4)),
    bruto: Number(bruto.toFixed(2)),
    comision: Number(comision.toFixed(2)),
    neto: Number(neto.toFixed(2)),
  };
}

module.exports = {
  calcularVenta,
  PRECIO_BASE_POR_GEMA,
  CANTIDAD_MINIMA,
  PARIDAD_MIN,
  PARIDAD_MAX,
  COMISION,
};
