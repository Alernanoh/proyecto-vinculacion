
function calcularEdad() {
    const fechaNacimiento = new Date(document.getElementById('fecha-nacimiento').value);
    const hoy = new Date();
    
    let edadAnios = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let edadMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (edadMeses < 0 || (edadMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edadAnios--;
        edadMeses += 12;
    }
    
    document.getElementById('edad').value = edadAnios;
    document.getElementById('meses').value = edadMeses;
}


function botonActionP(){

    let generoInputs = document.querySelectorAll('input[name="genero"]');
    let allCharts = document.querySelectorAll('#chart-container, #chart-container-female');
    function updateChartsVisibility() {
        let selectedGenero = document.querySelector('input[name="genero"]:checked').value;
        
        if (selectedGenero === 'masculino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container') {
                    manejarCalculoPeso() ;
                  // Mostrar gráficos de niño
                } else {
                    chart.style.display = 'none'; // Ocultar gráficos de niña
                }
            });
        } else if (selectedGenero === 'femenino') {
            allCharts.forEach(chart => {
                if (chart.id === 'chart-container-female') {
                 manejarCalculoPesoGirl();
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
///////////////////////////PESO EDAD NIÑO///////////////////////////////////////////////////////////////////////
function calcularPeso() {
    const peso = parseFloat(document.getElementById('peso').value);
    const edadAnios = parseInt(document.getElementById('edad').value);
    const edadMeses = parseInt(document.getElementById('meses').value);

    if (isNaN(peso) || isNaN(edadAnios) || isNaN(edadMeses) || peso <= 0 || edadAnios < 0) {
        document.getElementById('Cpeso').value = 'Por favor ingresar valores válidos para la edad y el peso.';
        return;
    }

    const edad = edadAnios + (edadMeses / 12);

    const percentiles = {
      '3': [5, 13.4, 17, 20.8, 24.2, 28],
        '2': [4.5, 12, 15.4, 18.2, 21.2, 24],
        '0': [3.2, 9.8, 12.1, 14.4, 16.4, 18.2],
       '-2': [2.5, 7.8, 9.7, 11.2, 12.8, 14],
       '-3': [2, 7,8.6, 10, 11.2,12.4]
    };
    
    let mensaje = '';
    //let percentil = '';

    if (edad < 0 || edad > 5) {
        mensaje = 'Edad fuera del rango permitido (0-5 años).';
    } else {
        const edadEntera = Math.floor(edad);
        const siguienteEdad = Math.ceil(edad);

        const pesoInterpolado3 = percentiles['3'][edadEntera] + (percentiles['3'][siguienteEdad] - percentiles['3'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado2 = percentiles['2'][edadEntera] + (percentiles['2'][siguienteEdad] - percentiles['2'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado0 = percentiles['0'][edadEntera] + (percentiles['0'][siguienteEdad] - percentiles['0'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado_2 = percentiles['-2'][edadEntera] + (percentiles['-2'][siguienteEdad] - percentiles['-2'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado_3 = percentiles['-3'][edadEntera] + (percentiles['-3'][siguienteEdad] - percentiles['-3'][edadEntera]) * (edad - edadEntera);

      if (peso > pesoInterpolado3) {
            percentil = 'Superior a 3';
            mensaje = 'El niño presenta obesidad.';
        } else if (peso > pesoInterpolado2) {
            percentil = 'Entre el 3 y 2';
            mensaje = 'El niño presenta mayor riesgo de trastorno por exceso, posible sobrepeso.';
        } else if (peso > pesoInterpolado0) {
            percentil = 'Entre el 2 y 0';
            mensaje = 'El niño se encuentra dentro del rango normal de peso en relación con su edad.';
        } else if (peso > pesoInterpolado_2) {
            percentil = 'Entre 0 y -2';
            mensaje = 'El niño se encuentra dentro del rango normal de peso en relación con su edad.';
        } else if (peso > pesoInterpolado_3) {
            percentil = 'Entre -2 y -3';
            mensaje = 'El niño se encuentra en bajo peso para su edad, propenso a presentar cuadros de desnutrición.';
        } else {
            percentil = 'Inferior a -3';
            mensaje = 'El niño presenta desnutrición.';
        }
        mensaje += `\nPercentil: ${percentil}`;
    }

    // Mostrar el mensaje correspondiente en el área de texto
    document.getElementById('Cpeso').value = mensaje;

    // Actualizar el gráfico con el nuevo punto
    const nuevoPunto = { x: edad, y: peso, mensaje: mensaje };
    //agregarPuntoAlGrafico(nuevoPunto);
}

// Función para manejar el cálculo al cambiar la fecha o el peso
function manejarCalculoPeso() {
    calcularEdad();
    const edadAnios = parseInt(document.getElementById('edad').value, 10);
    const edadMeses = parseInt(document.getElementById('meses').value, 10);
    const peso = parseFloat(document.getElementById('peso').value);

    if (!isNaN(edadAnios) && !isNaN(edadMeses) && !isNaN(peso) && peso > 0) {
        // Solo calcular el peso y mostrar el mensaje, sin actualizar el gráfico
        calcularPeso();
    } else {
        document.getElementById('Cpeso').value = "Por favor, ingresa todos los datos requeridos.";
    }
}
// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGrafico(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = thirdChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        thirdChart.update();

        // Mostrar el mensaje correspondiente en el área de texto
        document.getElementById('Cpeso').value = nuevoPunto.mensaje;
    }
}

// Función para guardar un nuevo punto y actualizar la fecha
function guardarPunto() {
    const hoy = new Date();
    document.getElementById('fecha-nacimiento').value = hoy.toISOString().split('T')[0];
    
    // Realiza los cálculos y actualiza el área de texto
    manejarCalculoPeso();

    // Verifica si hay un punto calculado para agregar al gráfico
    if (window.nuevoPunto) {
        agregarPuntoAlGrafico(window.nuevoPunto);
    }
}

// Event listener para el botón de "Nuevo Cálculo"
document.getElementById('btn-nuevo-calculo').addEventListener('click', function() {
    guardarPunto();
});

// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGrafico(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = thirdChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        thirdChart.update();

        // Mostrar el mensaje correspondiente
        document.getElementById('Cpeso').value = nuevoPunto.mensaje;
    }
}

// Función para limpiar el historial del gráfico
function limpiarHistorial() {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = thirdChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Limpiar los datos del dataset
        datasetPuntoCalculado.data = [];
        // Actualiza el gráfico
        thirdChart.update();
    }
}

// Event listeners para actualizar el cálculo al cambiar la fecha o el peso
// Estos eventos no deben actualizar el gráfico automáticamente
document.getElementById('fecha-nacimiento').addEventListener('change', manejarCalculoPeso);
document.getElementById('peso').addEventListener('input', manejarCalculoPeso);

////////////////////////////////////////////////////Calculo niña//////////////////////////////////////////////////////////
function calcularPesoGirl() {
    const peso = parseFloat(document.getElementById('peso').value);
    const edadAnios = parseInt(document.getElementById('edad').value);
    const edadMeses = parseInt(document.getElementById('meses').value);

    if (isNaN(peso) || isNaN(edadAnios) || isNaN(edadMeses) || peso <= 0 || edadAnios < 0) {
        document.getElementById('Cpeso').value = 'Por favor ingresar valores válidos para la edad y el peso.';
        return;
    }

    const edad = edadAnios + (edadMeses / 12);

    const percentiles = {
      '3': [5, 13.4, 17, 20.8, 24.2, 28],
        '2': [4.5, 12, 15.4, 18.2, 21.2, 24],
        '0': [3.2, 9.8, 12.1, 14.4, 16.4, 18.2],
       '-2': [2.5, 7.8, 9.7, 11.2, 12.8, 14],
       '-3': [2, 7,8.6, 10, 11.2,12.4]
    };
    
    let mensaje = '';
    //let percentil = '';

    if (edad < 0 || edad > 5) {
        mensaje = 'Edad fuera del rango permitido (0-5 años).';
    } else {
        const edadEntera = Math.floor(edad);
        const siguienteEdad = Math.ceil(edad);

        const pesoInterpolado3 = percentiles['3'][edadEntera] + (percentiles['3'][siguienteEdad] - percentiles['3'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado2 = percentiles['2'][edadEntera] + (percentiles['2'][siguienteEdad] - percentiles['2'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado0 = percentiles['0'][edadEntera] + (percentiles['0'][siguienteEdad] - percentiles['0'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado_2 = percentiles['-2'][edadEntera] + (percentiles['-2'][siguienteEdad] - percentiles['-2'][edadEntera]) * (edad - edadEntera);
        const pesoInterpolado_3 = percentiles['-3'][edadEntera] + (percentiles['-3'][siguienteEdad] - percentiles['-3'][edadEntera]) * (edad - edadEntera);

      if (peso > pesoInterpolado3) {
            percentil = 'Superior a 3';
            mensaje = 'El niño presenta obesidad.';
        } else if (peso > pesoInterpolado2) {
            percentil = 'Entre el 3 y 2';
            mensaje = 'El niño presenta mayor riesgo de trastorno por exceso, posible sobrepeso.';
        } else if (peso > pesoInterpolado0) {
            percentil = 'Entre el 2 y 0';
            mensaje = 'El niño se encuentra dentro del rango normal de peso en relación con su edad.';
        } else if (peso > pesoInterpolado_2) {
            percentil = 'Entre 0 y -2';
            mensaje = 'El niño se encuentra dentro del rango normal de peso en relación con su edad.';
        } else if (peso > pesoInterpolado_3) {
            percentil = 'Entre -2 y -3';
            mensaje = 'El niño se encuentra en bajo peso para su edad, propenso a presentar cuadros de desnutrición.';
        } else {
            percentil = 'Inferior a -3';
            mensaje = 'El niño presenta desnutrición.';
        }
        mensaje += `\nPercentil: ${percentil}`;
    }

    // Mostrar el mensaje correspondiente en el área de texto
    document.getElementById('Cpeso').value = mensaje;

    // Actualizar el gráfico con el nuevo punto
    const nuevoPunto = { x: edad, y: peso, mensaje: mensaje };
    //agregarPuntoAlGrafico(nuevoPunto);
}

// Función para manejar el cálculo al cambiar la fecha o el peso
function manejarCalculoPesoGirl() {
    calcularEdad();
    const edadAnios = parseInt(document.getElementById('edad').value, 10);
    const edadMeses = parseInt(document.getElementById('meses').value, 10);
    const peso = parseFloat(document.getElementById('peso').value);

    if (!isNaN(edadAnios) && !isNaN(edadMeses) && !isNaN(peso) && peso > 0) {
        // Solo calcular el peso y mostrar el mensaje, sin actualizar el gráfico
        calcularPeso();
    } else {
        document.getElementById('Cpeso').value = "Por favor, ingresa todos los datos requeridos.";
    }
}
// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGraficoGirl(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = thirdChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        thirdChart.update();

        // Mostrar el mensaje correspondiente en el área de texto
        document.getElementById('Cpeso').value = nuevoPunto.mensaje;
    }
}

// Función para guardar un nuevo punto y actualizar la fecha
function guardarPuntoGirl() {
    const hoy = new Date();
    document.getElementById('fecha-nacimiento').value = hoy.toISOString().split('T')[0];
    
    // Realiza los cálculos y actualiza el área de texto
    manejarCalculoPesoGirl();

    // Verifica si hay un punto calculado para agregar al gráfico
    if (window.nuevoPunto) {
        agregarPuntoAlGrafico(window.nuevoPunto);
    }
}

// Event listener para el botón de "Nuevo Cálculo"
document.getElementById('btn-nuevo-calculo').addEventListener('click', function() {
    guardarPuntoGirl();
});

// Función para agregar un nuevo punto al gráfico
function agregarPuntoAlGraficoGirl(nuevoPunto) {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = fourChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Añadir el nuevo punto
        datasetPuntoCalculado.data.push(nuevoPunto);
        // Actualiza el gráfico
        fourChartChart.update();

        // Mostrar el mensaje correspondiente
        document.getElementById('Cpeso').value = nuevoPunto.mensaje;
    }
}

// Función para limpiar el historial del gráfico
function limpiarHistorial() {
    // Encuentra el dataset 'Punto Calculado'
    const datasetPuntoCalculado = fourChart.data.datasets.find(ds => ds.label === 'Punto Calculado');
    if (datasetPuntoCalculado) {
        // Limpiar los datos del dataset
        datasetPuntoCalculado.data = [];
        // Actualiza el gráfico
        fourChart.update();
    }
}

// Event listeners para actualizar el cálculo al cambiar la fecha o el peso
// Estos eventos no deben actualizar el gráfico automáticamente
document.getElementById('fecha-nacimiento').addEventListener('change', manejarCalculoPesoGirl);
document.getElementById('peso').addEventListener('input', manejarCalculoPesoGirl);