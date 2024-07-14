// Función para calcular la edad y los meses automáticamente
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

// Función para calcular el IMC y mostrar mensaje dentro del textarea
function calcularIMC() {
    // Obtener los valores de peso, talla, hemoglobina y edad
    let peso = parseFloat(document.getElementById('peso').value);
    let talla = parseFloat(document.getElementById('talla').value);
    let hemoglobina = parseFloat(document.getElementById('hemog').value);
    let edad = parseInt(document.getElementById('edad').value);

    // Validar que los valores ingresados sean numéricos y mayores que cero
    if (isNaN(peso) || isNaN(talla) || isNaN(hemoglobina) || isNaN(edad) || peso <= 0 || talla <= 0 || hemoglobina <= 0 || edad <= 0) {
        document.getElementById('IMC').value = 'Por favor ingresar valores válidos para la edad, peso, talla y la hemoglobina.';
        return;
    }

    // Calcular el IMC
    let imc = peso / (talla * talla);
    imc = imc.toFixed(2); // Redondear el IMC a dos decimales

    // Determinar el mensaje según el IMC calculado
    let mensaje = '';
    if (imc < 18.5) {
        mensaje = `Tu IMC es ${imc}, indica bajo peso y desnutrición.`;
    } else if (imc >= 18.5 && imc < 25) {
        mensaje = `Tu IMC es ${imc}, indica un peso de rango saludable.`;
    } else if (imc >= 25 && imc < 30) {
        mensaje = `Tu IMC es ${imc}, indica sobrepeso fuera del rango saludable.`;
    } else {
        mensaje = `Tu IMC es ${imc}, indica sobrepeso y obesidad.`;
    }

    // Determinar si hay anemia basado en los niveles de hemoglobina
    if (edad < 6 && hemoglobina < 11.0) {
        mensaje += ` Además, con un nivel de hemoglobina de ${hemoglobina}, se indica anemia.`;
    }

    // Mostrar el mensaje en el textarea
    document.getElementById('IMC').value = mensaje;

    // Actualizar la gráfica
    actualizarGrafica(peso, talla, hemoglobina, imc);
}

// Función para actualizar la gráfica con el IMC calculado
function actualizarGrafica(peso, talla, hemoglobina, imc) {
    let ctx = document.getElementById('graficaPercentil').getContext('2d');

    // Ejemplo de datos quemados para Percentil
    let Percentiles = {
        peso: [2.5, 5, 10, 25, 50, 75, 90, 95, 97.5, 98, 99, 100, 105, 115, 120],
        hemoglobina: Array(15).fill(hemoglobina),
        anemia: Array(15).fill(11.0),
        obesidad: Array(15).fill(30)
    };

    // Definir los datos para la gráfica
    let data = {
        labels: [...Array(15).keys()].map(mes => `${mes} Meses`), // Etiqueta para cada conjunto de datos
        datasets: [
            {
                label: 'Peso',
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                data: Percentiles.peso,
                yAxisID: 'yPeso'
            },
            {
                label: 'Hemoglobina',
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                data: Percentiles.hemoglobina,
                yAxisID: 'yHemoglobina'
            },
            {
                label: 'Anemia',
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                data: Percentiles.anemia,
                yAxisID: 'yHemoglobina'
            },
            {
                label: 'Obesidad',
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                data: Percentiles.obesidad,
                yAxisID: 'yPeso'
            }
        ]
    };

    // Configuración de las opciones de la gráfica
    let options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Edad (Meses)'
                }
            },
            yPeso: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Peso (kg)'
                }
            },
            yHemoglobina: {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Hemoglobina (g/dL)'
                },
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    // Si myChart ya está definido, destruirlo antes de crear uno nuevo
    if (window.myChart) {
        window.myChart.destroy();
    }

    // Crear la instancia de la gráfica
    window.myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
