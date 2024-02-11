async function obtenerIndicador() {
    const res = await fetch("https://mindicador.cl/api/");
    const data = await res.json();
    console.log("This is the data", data);
    return data; // Return the fetched data
}

async function calcularCambio(event) {
    event.preventDefault(); // Prevent form submission
    const data = await obtenerIndicador(); // Await the API response
    const pesosingresados = document.getElementById('amount').value;
    if (data.euro && data.euro.valor) {
        const nuevovalor = pesosingresados / data.euro.valor;
        document.getElementById("conversionResult").innerHTML = nuevovalor.toFixed(2); // Update the result display
    } else {
        console.error("Euro data is not available");
    }
}