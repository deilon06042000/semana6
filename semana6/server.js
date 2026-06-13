const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/registro', (req, res) => {
  const datos = req.body;
  console.log('Datos recibidos en /registro:', datos);
  
  const filePath = path.join(__dirname, 'data/registro.json');
  
  let registros = [];
  if (fs.existsSync(filePath)) {
    registros = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }
  
  registros.push(datos);
  fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));
  
  res.json({ 
    estado: "Datos recibidos",
    nombre: datos.nombre,
    mensaje: datos.mensaje
  });
});
app.get('/registros', (req, res) => {
  const filePath = path.join(__dirname, 'data/registro.json');
  
  if (!fs.existsSync(filePath)) {
    return res.json([]);
  }
  
  const data = fs.readFileSync(filePath, 'utf8');
  const registros = JSON.parse(data);
  
  res.json(registros);
});
app.post('/incidencia', (req, res) => {
  const tipo = req.body.tipo;
  const descripcion = req.body.descripcion;

  res.json({
    mensaje: "Incidencia registrada",
    tipo: tipo,
    descripcion: descripcion
  });
});
app.listen(3000, () => {
  console.log('Servidor ejecutándose en puerto 3000');
});
