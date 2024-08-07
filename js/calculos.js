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

//funcion para ocultar graficos
document.addEventListener('DOMContentLoaded', function() {
    let generoInputs = document.querySelectorAll('input[name="genero"]');
    let allCharts = document.querySelectorAll('#chart-container, #chart-container-female');

    // Función para actualizar la visibilidad de los gráficos
    function updateChartsVisibility() {
        let selectedGenero = document.querySelector('input[name="genero"]:checked').value;
        
        if (selectedGenero === 'masculino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container') {
                    chart.style.display = 'block'; // Mostrar gráficos de niño
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niña
                }
            });
        } else if (selectedGenero === 'femenino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container-female') {
                    chart.style.display = 'block'; // Mostrar gráficos de niña
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niño
                }
            });
        }
    }

    // Agregar evento a cada input de género
    generoInputs.forEach(input => {
        input.addEventListener('change', updateChartsVisibility);
    });

    // Inicializar visibilidad en base a la selección actual
    if (document.querySelector('input[name="genero"]:checked')) {
        updateChartsVisibility();
    }
});

function botonAction(){

    let generoInputs = document.querySelectorAll('input[name="genero"]');
    let allCharts = document.querySelectorAll('#chart-container, #chart-container-female');
    function updateChartsVisibility() {
        let selectedGenero = document.querySelector('input[name="genero"]:checked').value;
        
        if (selectedGenero === 'masculino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container') {
                  manejarCalculo();
                  // Mostrar gráficos de niño
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niña
                }
            });
        } else if (selectedGenero === 'femenino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container-female') {
                  manejarCalculoGirl();
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



////////////////////////////////////////////CALCULOS /////////////////////////////////////////////////////////

//Longitud edad niño 

function calcularLongitud() {
    const talla = parseFloat(document.getElementById('talla').value);
    const edadAnios = parseInt(document.getElementById('edad').value);
    const edadMeses = parseInt(document.getElementById('meses').value);

    if (isNaN(talla) || isNaN(edadAnios) || isNaN(edadMeses) || talla <= 0 || edadAnios < 0) {
        document.getElementById('IMC').value = 'Por favor ingresar valores válidos para la edad y la talla.';
        return;
    }

    const edad = edadAnios + (edadMeses / 12);

    const percentiles = {
        '3': [55.5, 83, 97, 107, 116, 124],
        '2': [53.5, 80.5, 94, 103.5, 112, 119],
        '0': [50, 75.5, 86.5, 96, 103, 110],
        '-2': [46, 71, 81, 89, 95, 101],
        '-3': [44, 69, 78.5, 85, 91, 96]
    };

    let mensaje = '';
    let percentil = '';

    if (edad < 0 || edad > 5) {
        mensaje = 'Edad fuera del rango permitido (0-5 años).';
    } else {
        const edadEntera = Math.floor(edad);
        const siguienteEdad = Math.ceil(edad);

        const tallaInterpolada3 = percentiles['3'][edadEntera] + (percentiles['3'][siguienteEdad] - percentiles['3'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada2 = percentiles['2'][edadEntera] + (percentiles['2'][siguienteEdad] - percentiles['2'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada0 = percentiles['0'][edadEntera] + (percentiles['0'][siguienteEdad] - percentiles['0'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada_2 = percentiles['-2'][edadEntera] + (percentiles['-2'][siguienteEdad] - percentiles['-2'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada_3 = percentiles['-3'][edadEntera] + (percentiles['-3'][siguienteEdad] - percentiles['-3'][edadEntera]) * (edad - edadEntera);

          if (talla > tallaInterpolada3) {
            percentil = 'Superior a 3';
            mensaje = 'El niño está en el extremo superior del rango normal, monitoreo en busca de presencia de cambios bruscos.';
        } else if (talla > tallaInterpolada2) {
            percentil = 'Entre el 3 y 2';
            mensaje = 'El niño está en el extremo superior del rango normal, monitoreo en busca de presencia de cambios bruscos.';
        } else if (talla > tallaInterpolada0) {
            percentil = 'Entre el 2 y 0';
            mensaje = 'El niño se encuentra dentro del rango normal de crecimiento.';
        } else if (talla > tallaInterpolada_2) {
            percentil = 'Entre 0 y -2';
            mensaje = 'El niño se encuentra dentro del rango normal de crecimiento.';
        } else if (talla > tallaInterpolada_3) {
            percentil = 'Entre -2 y -3';
            mensaje = 'El niño se encuentra en el extremo inferior del rango normal, posibles problemas de crecimiento.';
        } else {
            percentil = 'Inferior a -3';
            mensaje = 'El niño se encuentra en el extremo inferior del rango normal, posibles problemas de crecimiento.';
        }
        mensaje += `\nPercentil: ${percentil}`;
    }

    document.getElementById('IMC').value = mensaje;

    // Actualizar el gráfico con el nuevo punto
    const nuevoPunto = { x: edad, y: talla, mensaje: mensaje };
    agregarPuntoAlGrafico(nuevoPunto);
}

// Función para manejar el cálculo al cambiar la fecha o la talla
function manejarCalculo() {
    calcularEdad();
    const edadAnios = parseInt(document.getElementById('edad').value, 10);
    const edadMeses = parseInt(document.getElementById('meses').value, 10);
    const talla = parseFloat(document.getElementById('talla').value);

    if (!isNaN(edadAnios) && !isNaN(edadMeses) && !isNaN(talla) && talla > 0) {
        calcularLongitud();
    } else {
        document.getElementById('IMC').value = "Por favor, ingresa todos los datos requeridos.";
    }
}

// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGrafico(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = growthChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        growthChart.update();

        // Mostrar el mensaje correspondiente
        document.getElementById('IMC').value = nuevoPunto.mensaje;
    }
}

// Función para guardar un nuevo punto y actualizar la fecha
function guardarPunto() {
    const hoy = new Date();
    document.getElementById('fecha-nacimiento').value = hoy.toISOString().split('T')[0];
    manejarCalculo();
}

// Event listener para el botón de "Nuevo Cálculo"
document.getElementById('btn-nuevo-calculo').addEventListener('click', function() {
    guardarPunto();
});

// Función para limpiar el historial del gráfico
function limpiarHistorial() {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = growthChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Limpiar los datos del dataset
        datasetPuntoCalculado.data = [];
        // Actualiza el gráfico
        growthChart.update();
    }
}

// Event listeners para actualizar el cálculo al cambiar la fecha o la talla
document.getElementById('fecha-nacimiento').addEventListener('change', manejarCalculo);
document.getElementById('talla').addEventListener('input', manejarCalculo);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Longitud edad niña
// Función para calcular la longitud y mostrar mensaje dentro del textarea

function calcularLongitudGirl() {
    const talla = parseFloat(document.getElementById('talla').value);
    const edadAnios = parseInt(document.getElementById('edad').value);
    const edadMeses = parseInt(document.getElementById('meses').value);

    if (isNaN(talla) || isNaN(edadAnios) || isNaN(edadMeses) || talla <= 0 || edadAnios < 0) {
        document.getElementById('IMC').value = 'Por favor ingresar valores válidos para la edad y la talla.';
        return;
    }

    const edad = edadAnios + (edadMeses / 12);

    const percentiles = {
        '3': [55, 82, 96, 106, 116, 124],
        '2': [53, 79.5, 93, 103, 111, 119],
        '0': [49.5, 74, 86, 95, 103, 109],
        '-2': [45, 69, 80, 87, 94, 100],
        '-3': [43.5, 66.5, 77, 84, 90, 95]
    };

    let mensaje = '';
    let percentil = '';

    if (edad < 0 || edad > 5) {
        mensaje = 'Edad fuera del rango permitido (0-5 años).';
    } else {
        const edadEntera = Math.floor(edad);
        const siguienteEdad = Math.ceil(edad);

        const tallaInterpolada3 = percentiles['3'][edadEntera] + (percentiles['3'][siguienteEdad] - percentiles['3'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada2 = percentiles['2'][edadEntera] + (percentiles['2'][siguienteEdad] - percentiles['2'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada0 = percentiles['0'][edadEntera] + (percentiles['0'][siguienteEdad] - percentiles['0'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada_2 = percentiles['-2'][edadEntera] + (percentiles['-2'][siguienteEdad] - percentiles['-2'][edadEntera]) * (edad - edadEntera);
        const tallaInterpolada_3 = percentiles['-3'][edadEntera] + (percentiles['-3'][siguienteEdad] - percentiles['-3'][edadEntera]) * (edad - edadEntera);

        if (talla > tallaInterpolada3) {
            percentil = 'Superior a 3';
            mensaje = 'La niña está en el extremo superior del rango normal, monitoreo en busca de presencia de cambios bruscos.';
        } else if (talla > tallaInterpolada2) {
            percentil = 'Entre el 3 y 2';
            mensaje = 'La niña está en el extremo superior del rango normal, monitoreo en busca de presencia de cambios bruscos.';
        } else if (talla > tallaInterpolada0) {
            percentil = 'Entre el 2 y 0';
            mensaje = 'La niña se encuentra dentro del rango normal de crecimiento.';
        } else if (talla > tallaInterpolada_2) {
            percentil = 'Entre 0 y -2';
            mensaje = 'La niña se encuentra dentro del rango normal de crecimiento.';
        } else if (talla > tallaInterpolada_3) {
            percentil = 'Entre -2 y -3';
            mensaje = 'La niña se encuentra en el extremo inferior del rango normal, posibles problemas de crecimiento.';
        } else {
            percentil = 'Inferior a -3';
            mensaje = 'La niña se encuentra en el extremo inferior del rango normal, posibles problemas de crecimiento.';
        }
        mensaje += `\nPercentil: ${percentil}`;
    }

    document.getElementById('IMC').value = mensaje;

    // Actualizar el gráfico con el nuevo punto
    const nuevoPunto = { x: edad, y: talla, mensaje: mensaje };
    agregarPuntoAlGraficoGirl(nuevoPunto);
}

// Función para manejar el cálculo al cambiar la fecha o la edad
function manejarCalculoGirl() {
    calcularEdad();
    const edadAnios = parseInt(document.getElementById('edad').value, 10);
    const edadMeses = parseInt(document.getElementById('meses').value, 10);
    const talla = parseFloat(document.getElementById('talla').value);

    if (!isNaN(edadAnios) && !isNaN(edadMeses) && !isNaN(talla) && talla > 0) {
        calcularLongitudGirl();
    } else {
        document.getElementById('IMC').value = "Por favor, ingresa todos los datos requeridos.";
    }
}

// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGraficoGirl(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado =  secondChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        secondChart.update();

        // Mostrar el mensaje correspondiente
        document.getElementById('IMC').value = nuevoPunto.mensaje;
    }
}

// Función para guardar un nuevo punto y actualizar la fecha
function guardarPuntoGirl() {
    const hoy = new Date();
    document.getElementById('fecha-nacimiento').value = hoy.toISOString().split('T')[0];
    manejarCalculoGirl();
}

// Event listener para el botón de "Nuevo Cálculo"
document.getElementById('btn-nuevo-calculo').addEventListener('click', function() {
    guardarPuntoGirl();
});


// Función para limpiar el historial del gráfico
function limpiarHistorial() {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculadoGirl = secondChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculadoGirl) {
        // Limpiar los datos del dataset
        datasetPuntoCalculadoGirl.data = [];
        // Actualiza el gráfico
        secondChart.update();
    }
}

// Event listeners para actualizar el cálculo al cambiar la fecha o la talla
document.getElementById('fecha-nacimiento').addEventListener('change', manejarCalculoGirl);
document.getElementById('talla').addEventListener('input', manejarCalculoGirl);

/////////////////////////// CALCULOS DE PESO /EDAD NIÑO//////////////////////////////////////////////////////////////////////////////





