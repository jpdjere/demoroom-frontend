

// Load Charts and the corechart and barchart packages.
      google.charts.load('current', {'packages':['corechart']});

      // Draw the pie chart and bar chart when Charts is loaded.
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
          ['Pago con Tarjeta', 3],
          ['Copromiso de Pago', 1],
          ['Contacto Personalizado', 1],
          ['Consulta de Factura', 1]
        ]);

        var piechart_options = {title:'Asesor Virtual de Mora y Pre-mora',
                       width:600,
                       height:500};
        var piechart = new google.visualization.PieChart(document.getElementById('piechart_div'));
        piechart.draw(data, piechart_options);

        var barchart_options = {title:'Intenciones más utilizadas',
                       width:600,
                       height:500,
                       legend: 'none'};
        var barchart = new google.visualization.BarChart(document.getElementById('barchart_div'));
        barchart.draw(data, barchart_options);
      }
