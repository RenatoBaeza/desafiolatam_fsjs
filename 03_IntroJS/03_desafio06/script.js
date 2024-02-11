// Documento

const tareasjson = [
    {
        "id": 1707686554061,
        "tarea": "Pasear al perro",
        "ready": false
    },
    {
        "id": 1707686558097,
        "tarea": "Comprar leche",
        "ready": true
    },
    {
        "id": 1707686640593,
        "tarea": "Hacer tarea de DL",
        "ready": false
    }
]

// Inicializadores
document.addEventListener('DOMContentLoaded', () => {
    // Call actualizarTareas() on initial load to properly render tasks and attach listeners
    actualizarTareas();
    actualizarContadores();
});

const tareas = document.querySelector(".tablatareas")
    for(let i of tareasjson) {
        tareas.innerHTML+= `
        <tr>
            <td>${i.id}</td>
            <td>${i.tarea}</td>
            <td><input type="checkbox" id="check-${i.id}" ${i.ready?"checked":""} ></td>
            <td><button id="delete-${i.id}">X</button></td>
        </tr>
        `}

const totaltareas = document.querySelector(".totaltareas")
    totaltareas.innerHTML+= `Total: <b>${tareasjson.length}</b>`

const tareasrealizadas = document.querySelector(".tareasrealizadas")
    tareasrealizadas.innerHTML+= `Realizadas: <b>${tareasjson.filter(tarea => tarea.ready).length}</b>`

// Funciones

function agregarTarea() {
    const inputvalor = document.getElementById('input').value;
    if(inputvalor == '' ?
        alert("No puede ser vacio") : 
        tareasjson.push(
            {
                "id": Date.now(),
                "tarea": inputvalor,
                "ready": false
            }
        )
    )
    console.log(tareasjson)
    actualizarTareas()
    actualizarContadores();
}

function eliminarTarea(id) {
    const index = tareasjson.findIndex(tarea => tarea.id === id);
    if (index !== -1) {
        tareasjson.splice(index, 1);
    }
    actualizarTareas();
    actualizarContadores();
}

function actualizarEstadoTarea(id, estado) {
    const tarea = tareasjson.find(t => t.id === id);
    if (tarea) {
        tarea.ready = estado;
        actualizarTareas();
        actualizarContadores();
    }
}

function actualizarTareas() {
    const tareas = document.querySelector(".tablatareas");
    tareas.innerHTML = `
        `;

        for (let tarea of tareasjson) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${tarea.id}</td>
                <td>${tarea.tarea}</td>
                <td><input type="checkbox" id="check-${tarea.id}" ${tarea.ready ? "checked" : ""}></td>
                <td><button id="delete-${tarea.id}">X</button></td>
            `;
            tareas.appendChild(row);
    
            document.getElementById(`check-${tarea.id}`).addEventListener('change', (e) => {
                actualizarEstadoTarea(tarea.id, e.target.checked);
            });
            
            document.getElementById(`delete-${tarea.id}`).addEventListener('click', () => {
                eliminarTarea(tarea.id);
            });
    }
}

function actualizarContadores() {
    const totaltareas = document.querySelector(".totaltareas");
    totaltareas.innerHTML = `Total: <b>${tareasjson.length}</b>`;
    
    const tareasrealizadas = document.querySelector(".tareasrealizadas");
    tareasrealizadas.innerHTML = `Realizadas: <b>${tareasjson.filter(tarea => tarea.ready).length}</b>`;
}

