  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Grafico Logitud/edad niños
const ctx = document.getElementById("growthChart").getContext("2d");
const growthChart = new Chart(ctx, {
  type: "scatter",
  data: {
    datasets: [
      // Líneas de colores
      {
        label: "Black",
        borderColor: "black", // comentario
        borderWidth: 2,
        data: [
          { x: 0, y: 56 },
          { x: 1, y: 83 },
          { x: 2, y: 97 },
          { x: 3, y: 107.5 },
          { x: 4, y: 116 },
          { x: 5, y: 124 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 54 },
          { x: 1, y: 80.5 },
          { x: 2, y: 94 },
          { x: 3, y: 103.5 },
          { x: 4, y: 112 },
          { x: 5, y: 119.5 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 50 },
          { x: 1, y: 76 },
          { x: 2, y: 87.5 },
          { x: 3, y: 96 },
          { x: 4, y: 103.5 },
          { x: 5, y: 110 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 46 },
          { x: 1, y: 71 },
          { x: 2, y: 81.5 },
          { x: 3, y: 88.5 },
          { x: 4, y: 95 },
          { x: 5, y: 101 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 44 },
          { x: 1, y: 68.5 },
          { x: 2, y: 78.5 },
          { x: 3, y: 85 },
          { x: 4, y: 91 },
          { x: 5, y: 96 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad (años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            // Diferenciar líneas de años y meses
            return tickValue % 1 === 0 ? "#000" : "#aaa"; // Línea negra para años, gris claro para meses
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Longitud/Estatura(mt)",
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
    },
  },
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// longitud/edad niña

const ctx2 = document.getElementById("secondChart").getContext("2d");
const secondChart = new Chart(ctx2, {
  type: "scatter",
  data: {
    datasets: [
      // Líneas de colores
      {
        label: "Black",
        borderColor: "black", // comentario
        borderWidth: 2,
        data: [
          { x: 0, y: 55 },
          { x: 1, y: 82 },
          { x: 2, y: 96 },
          { x: 3, y: 106 },
          { x: 4, y: 116 },
          { x: 5, y: 124 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 53 },
          { x: 1, y: 79.5 },
          { x: 2, y: 93 },
          { x: 3, y: 103 },
          { x: 4, y: 111 },
          { x: 5, y: 119 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 49.5 },
          { x: 1, y: 74 },
          { x: 2, y: 86 },
          { x: 3, y: 95 },
          { x: 4, y: 103 },
          { x: 5, y: 109 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 45 },
          { x: 1, y: 69 },
          { x: 2, y: 80 },
          { x: 3, y: 87 },
          { x: 4, y: 94 },
          { x: 5, y: 100 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 43.5 },
          { x: 1, y: 66.5 },
          { x: 2, y: 77 },
          { x: 3, y: 84 },
          { x: 4, y: 90 },
          { x: 5, y: 95 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad(años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            // Diferenciar líneas de años y meses
            return tickValue % 1 === 0 ? "#000" : "#aaa"; // Línea negra para años, gris claro para meses
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Longitud/Estatura(mt)",
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 40,
        max: 125,
      },
    },
  },
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Grafico peso/edad niño

const ctx3 = document.getElementById("thirdChart").getContext("2d");
const thirdChart = new Chart(ctx3, {
  type: "scatter",
  data: {
    datasets: [
      // Líneas de colores
      {
        label: "Black",
        borderColor: "black", // comentario
        borderWidth: 2,
        data: [
          { x: 0, y: 5 },
          { x: 1, y: 13.4 },
          { x: 2, y: 17 },
          { x: 3, y: 20.8 },
          { x: 4, y: 24.2 },
          { x: 5, y: 28 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 4.5 },
          { x: 1, y: 12 },
          { x: 2, y: 15.4 },
          { x: 3, y: 18.2 },
          { x: 4, y: 21.2 },
          { x: 5, y: 24 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Green",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 3.2 },
          { x: 1, y: 9.8 },
          { x: 2, y: 12.1 },
          { x: 3, y: 14.4 },
          { x: 4, y: 16.4 },
          { x: 5, y: 18.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Red",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 2.5 },
          { x: 1, y: 7.8 },
          { x: 2, y: 9.7 },
          { x: 3, y: 11.2 },
          { x: 4, y: 12.8 },
          { x: 5, y: 14 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Black",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 2 },
          { x: 1, y: 7 },
          { x: 2, y: 8.6 },
          { x: 3, y: 10 },
          { x: 4, y: 11.2 },
          { x: 5, y: 12.4 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },

      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad(años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            // Diferenciar líneas de años y meses
            return tickValue % 1 === 0 ? "#000" : "#aaa"; // Línea negra para años, gris claro para meses
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Peso(kg)",
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
    },
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Grafica peso/edad niñas

const ctx4 = document.getElementById("fourChart").getContext("2d");
const fourChart = new Chart(ctx4, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Percentil 3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 5 },
          { x: 1, y: 13.1 },
          { x: 2, y: 17 },
          { x: 3, y: 21 },
          { x: 4, y: 25.2 },
          { x: 5, y: 29.5 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 4.2 },
          { x: 1, y: 11.5 },
          { x: 2, y: 14.9 },
          { x: 3, y: 18 },
          { x: 4, y: 21.5 },
          { x: 5, y: 25 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 0 (Línea Verde)",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 3.2 },
          { x: 1, y: 9 },
          { x: 2, y: 11.5 },
          { x: 3, y: 14 },
          { x: 4, y: 16 },
          { x: 5, y: 18.1 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 2.5 },
          { x: 1, y: 7 },
          { x: 2, y: 9 },
          { x: 3, y: 10.9 },
          { x: 4, y: 12.4 },
          { x: 5, y: 13.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 2 },
          { x: 1, y: 6.2 },
          { x: 2, y: 8 },
          { x: 3, y: 9.7 },
          { x: 4, y: 11 },
          { x: 5, y: 12 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue", // Asegura que el puntero sea visible
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad (años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Peso(kg)",
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 2,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 40,
      },
    },
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Grafica IMC /EDAD NIÑA

const ctx5 = document.getElementById("fiveChart").getContext("2d");
const fiveChart = new Chart(ctx5, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Percentil 3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 17.3 },
          { x: 1, y: 21.6 },
          { x: 2, y: 20.4 },
          { x: 3, y: 20.3 },
          { x: 4, y: 20.6 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 15 },
          { x: 1, y: 19.6 },
          { x: 2, y: 18.5 },
          { x: 3, y: 18.4 },
          { x: 4, y: 18.5 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 0 (Línea Verde)",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 13.2 },
          { x: 1, y: 16.4 },
          { x: 2, y: 15.4 },
          { x: 3, y: 15.4 },
          { x: 4, y: 15.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 10.7 },
          { x: 1, y: 13.8 },
          { x: 2, y: 13.1 },
          { x: 3, y: 13.1 },
          { x: 4, y: 12.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 9.2 },
          { x: 1, y: 12.7 },
          { x: 2, y: 12.2 },
          { x: 3, y: 12.2 },
          { x: 4, y: 11.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue", // Asegura que el puntero sea visible
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad (años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "IMC",
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 22,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 22,
      },
    },
  },
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///IMC/Edad NIÑO////
const ctx6 = document.getElementById("sixChart").getContext("2d");
const sixChart = new Chart(ctx6, {
  type: "scatter",
  data: {
    datasets: [
      {
        label: "Percentil 3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 17.6 },
          { x: 1, y: 21.6 },
          { x: 2, y: 20.3 },
          { x: 3, y: 20 },
          { x: 4, y: 19.8 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 16.1 },
          { x: 1, y: 19.8 },
          { x: 2, y: 18.5 },
          { x: 3, y: 18.4 },
          { x: 4, y: 18.2 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil 0 (Línea Verde)",
        borderColor: "green",
        borderWidth: 2,
        data: [
          { x: 0, y: 13.4 },
          { x: 1, y: 16.8 },
          { x: 2, y: 15.9 },
          { x: 3, y: 15.8 },
          { x: 4, y: 15.3 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -2 (Línea Roja)",
        borderColor: "red",
        borderWidth: 2,
        data: [
          { x: 0, y: 10.8 },
          { x: 1, y: 14.4 },
          { x: 2, y: 13.6 },
          { x: 3, y: 13.4 },
          { x: 4, y: 13.1 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Percentil -3 (Línea Negra)",
        borderColor: "black",
        borderWidth: 2,
        data: [
          { x: 0, y: 9.2 },
          { x: 1, y: 13.4 },
          { x: 2, y: 12.6 },
          { x: 3, y: 12.4 },
          { x: 4, y: 12.1 },
        ],
        showLine: true,
        fill: false,
        tension: 0.2,
        pointRadius: 0,
      },
      {
        label: "Punto Calculado",
        borderColor: "blue",
        borderWidth: 2,
        data: [], // Inicialmente vacío
        showLine: false,
        pointRadius: 5,
        pointBackgroundColor: "blue", // Asegura que el puntero sea visible
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Edad (años y meses)",
        },
        type: "linear",
        position: "bottom",
        ticks: {
          stepSize: 0.1,
          // Paso para los ticks
          callback: function (value) {
            // Mostrar valores con un decimal
            return value.toFixed(1);
          },
        },
        grid: {
          display: true,
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: true,
          lineWidth: 1,
          color: function (context) {
            const tickValue = context.tick.value;
            return tickValue % 1 === 0 ? "#000" : "#aaa";
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "IMC",
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 22,
      },
      y1: {
        position: "right",
        title: {
          display: true,
        },
        ticks: {
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : "";
          },
        },
        min: 0,
        max: 22,
      },
    },
  },
});
