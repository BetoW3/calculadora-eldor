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
├── server.js          # Servidor Express (solo para desarrollo local: npm start)
├── calculadora.js      # Lógica de cálculo (reutilizable, testeable)
├── api/
│   └── calcular.js     # Función serverless de Vercel (producción): /api/calcular
├── index.html           # Frontend (en la raíz, se sirve como archivo estático en Vercel)
├── style.css
├── script.js            # Consulta al endpoint /api/calcular
├── package.json
```

> En local, `server.js` sirve todo (frontend + `/api/calcular`) con Express.
> En Vercel, el frontend se sirve como estático desde la raíz y `/api/calcular` corre como función serverless independiente (`api/calcular.js`). No hace falta `vercel.json`: Vercel detecta esta estructura automáticamente ("zero config").

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

## Deploy en Vercel

El proyecto usa la convención "zero config" de Vercel: no hace falta `vercel.json`. Vercel detecta `api/calcular.js` como función serverless y sirve `index.html`, `style.css` y `script.js` de la raíz como archivos estáticos automáticamente.

**Importante:** si subís los archivos arrastrándolos/subiéndolos manualmente (drag & drop o "Add files"), asegurate de subir el **contenido** de la carpeta `eldor-calculadora` (que `index.html` y `api/` queden en la raíz del proyecto en Vercel), no la carpeta contenedora.

### Opción A — Con la CLI de Vercel (más rápido)

```bash
npm install -g vercel   # si no la tenés instalada
cd eldor-calculadora
vercel login            # solo la primera vez
vercel                  # deploy de prueba (preview)
vercel --prod           # deploy a producción
```

### Opción B — Desde GitHub (recomendado si vas a seguir editando)

1. Subí esta carpeta a un repositorio de GitHub:
   ```bash
   cd eldor-calculadora
   git init
   git add .
   git commit -m "Calculadora ELDOR"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
2. Entrá a [vercel.com](https://vercel.com) → **Add New Project**.
3. Importá el repositorio de GitHub.
4. Framework Preset: dejalo en **Other**. No hace falta tocar nada más.
5. Click en **Deploy**.

Cada vez que hagas `git push` a `main`, Vercel vuelve a desplegar solo.

### Notas
- No hace falta subir `node_modules`; Vercel instala las dependencias solo usando `package.json`.
- El endpoint quedará disponible en `https://tu-proyecto.vercel.app/api/calcular?cantidad=1500&paridad=0.42`.
- Si ya tenías un deploy con el `vercel.json` viejo (con `builds`/`routes`) y te daba 404, borralo del repo/proyecto: ese formato legacy es el que causaba el error.

