const cantidadInput = document.getElementById('cantidad');
const paridadInput = document.getElementById('paridad');
const errorCantidad = document.getElementById('errorCantidad');
const errorParidad = document.getElementById('errorParidad');

const outCantidad = document.getElementById('outCantidad');
const outParidad = document.getElementById('outParidad');
const outBruto = document.getElementById('outBruto');
const outComision = document.getElementById('outComision');
const outNeto = document.getElementById('outNeto');

function fmt(n) {
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

let debounceTimer = null;

async function calcular() {
  const cantidad = cantidadInput.value;
  const paridad = paridadInput.value;

  try {
    const resp = await fetch(`/api/calcular?cantidad=${encodeURIComponent(cantidad)}&paridad=${encodeURIComponent(paridad)}`);
    const data = await resp.json();

    if (!data.ok) {
      errorCantidad.style.display = data.errores.some(e => e.includes('cantidad')) ? 'block' : 'none';
      errorParidad.style.display = data.errores.some(e => e.includes('paridad')) ? 'block' : 'none';
      return;
    }

    errorCantidad.style.display = 'none';
    errorParidad.style.display = 'none';

    outCantidad.textContent = data.cantidad.toLocaleString('es-AR');
    outParidad.textContent = data.paridad.toFixed(2) + '  (' + fmt(data.precioPor100Gemas) + ' USDT / 100 gemas)';
    outBruto.textContent = fmt(data.bruto) + ' USDT';
    outComision.textContent = '- ' + fmt(data.comision) + ' USDT';
    outNeto.textContent = fmt(data.neto) + ' USDT';
  } catch (err) {
    console.error('Error al calcular:', err);
  }
}

function calcularConDebounce() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(calcular, 150);
}

cantidadInput.addEventListener('input', calcularConDebounce);
paridadInput.addEventListener('input', calcularConDebounce);

calcular();
