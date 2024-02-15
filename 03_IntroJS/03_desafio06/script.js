async function obtenerIndicador() {
    const res = await fetch("https://mindicador.cl/api/");
    const data = await res.json();
    console.log(data)
    return data;
}

async function calcularCambio() {
    const data = await obtenerIndicador();
    const monto = document.getElementById('amount').value;
    const moneda = document.getElementById('currency').value;
    console.log(moneda)
    const nuevovalor = monto / data[moneda].valor;
    document.getElementById("resultado").innerHTML = nuevovalor.toFixed(2);
}

async function indicadorMes(moneda) {
    const res_moneda = await fetch("https://mindicador.cl/api/" + moneda);
    const data_moneda = await res_moneda.json();
    console.log(data_moneda)
    return data_moneda;
}

async function mostrarHistorialMoneda() {
    const moneda = document.getElementById('currency').value;
    const data_moneda = await indicadorMes(moneda);
    const last10DaysData = data_moneda.serie.slice(-10);
    const fechas = last10DaysData.map(item => new Date(item.fecha).toLocaleDateString());
    const valores = last10DaysData.map(item => item.valor);
    var ctx = document.getElementById('currencyChart').getContext('2d');
    window.currencyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: fechas,
            datasets: [{
                label: `Valor de ${data_moneda.nombre} los ultimos 10 dias`,
                backgroundColor: 'green', 
                borderColor: 'black',
                data: valores
            }]
        }
    });
}