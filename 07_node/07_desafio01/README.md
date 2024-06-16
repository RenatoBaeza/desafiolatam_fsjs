# Desafio Latam - Intro a Express
## 1. Ejecutar scripts con Node Js desde la terminal (2 Puntos)
```
PS C:\Users\User\Documents\GitHub\desafiolatam_fsjs\07_node\07_desafio01> node index.js registrar Benito "2 años" perro blanco vomitos
Cita registrada para Benito

PS C:\Users\User\Documents\GitHub\desafiolatam_fsjs\07_node\07_desafio01> node index.js leer
[
  {
    nombre: 'Benito',
    edad: '2 años',
    tipo: 'perro',
    color: 'blanco',
    enfermedad: 'vomitos'
  }
]
```

## 2. Crear archivos con el módulo File System (3 Puntos)
```
const fs = require('fs')
const citas = []
fs.writeFileSync('citas.json', JSON.stringify(citas))
```

## 3. Leer archivos con el módulo File System (2 Puntos)
```
JSON.parse(fs.readFileSync('citas.json', 'utf8'))
```

## 4. Importar y exportar módulos en Node Js (1 Punto)
```
module.exports = { registrar, leer };
const { registrar, leer } = require('./operaciones.js')
```

## 5. Utilizar argumentos escritos por línea de comandos (2 Punto)
```
node index.js registrar Benito "2 años" perro blanco vomitos
```