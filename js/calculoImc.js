
function botonActionIMC(){

    let generoInputs = document.querySelectorAll('input[name="genero"]');
    let allCharts = document.querySelectorAll('#chart-container, #chart-container-female');
    function updateChartsVisibility() {
        let selectedGenero = document.querySelector('input[name="genero"]:checked').value;
        
        if (selectedGenero === 'masculino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container') {
                    // manejarCalculoPeso() ;
                    manejarCalculoimc();
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niña
                }
            });
        } else if (selectedGenero === 'femenino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container-female') {
                 manejarCalculoimc();
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niño
                }
            });
        }
    }

    generoInputs.forEach(input => {
        input.addEventListener('change', updateChartsVisibility);
    });

    // Inicializar visibilidad en base a la selección actual
    if (document.querySelector('input[name="genero"]:checked')) {
        updateChartsVisibility();
    }
}
//////////////////////////////////////CalculoImc//////////////////////////////////////////////////////////////////
// Función para calcular la edad y los meses automáticamente
// archivo: calculo.js
function calcularEdad() {
    let fechaNacimiento = new Date(document.getElementById('fecha-nacimiento').value);
    let hoy = new Date();
    
    let edadAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let edadMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (edadMeses < 0 || (edadMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edadAnios--;
        edadMeses += 12;
    }
    
    document.getElementById('edad').value = edadAnios;
    document.getElementById('meses').value = edadMeses;

}


function  manejarCalculoimc() {
    // Obtener valores de entrada
    const tallaCm = parseFloat(document.getElementById('talla').value);
    const pesoKg = parseFloat(document.getElementById('peso').value);
    // Validar los valores ingresados
    if (isNaN(tallaCm) || isNaN(pesoKg) || tallaCm <= 0 || pesoKg <= 0) {
        document.getElementById('CIMC').value = 'Por favor, ingrese valores válidos para la talla y el peso.';
        return;
    }


    // Convertir altura de centímetros a metros
    const tallaM = tallaCm / 100;

    // Calcular IMC
    const imc = pesoKg / (tallaM * tallaM);

    // Mostrar el resultado en el textarea
    document.getElementById('CIMC').value = `El IMC calculado es: ${imc.toFixed(2)}`;
    
}

