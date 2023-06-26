$(function () {

    window.chart = new Highcharts.Chart({

        chart: {
            renderTo: 'chartcontainer',
            type: 'columnrange',
            inverted: true
        },

        credits: {
          enabled: false
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        yAxis: {
            title: {
                text: 'Temperature ( Â°C )'
            }
        },

        tooltip: {
            valueSuffix: 'Â°C'
        },

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + 'Â°C';
                    },
                    y: 0
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: 'Temperatures',
            data: [
                [8.4, 43.2],
                [7.1, 41.0],
                [3.1, 37.7],
                [0.4, 31.7],
                [-3.3, 24.6],
                [-4.6, 18.2],
                [-5.9, 18.0],
                [-4.6, 20.5],
                [-2.9, 29.6],
                [0.2, 32.8],
                [3.2, 38.3],
                [3.1, 40.1]
            ]
        }]

    });

});
