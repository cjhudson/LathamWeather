$(function () {

    window.chart = new Highcharts.Chart({

        chart: {
            renderTo: 'chartcontainer',
            type: 'columnrange',
            inverted: true
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        yAxis: {
            title: {
                text: 'Temperature ( °C )'
            }
        },

        tooltip: {
            valueSuffix: '°C'
        },

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + '°C';
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
                [<#ByMonthTempH mon=1>, <#ByMonthTempL mon=1>],
                [<#ByMonthTempH mon=2>, <#ByMonthTempL mon=2>],
                [<#ByMonthTempH mon=3>, <#ByMonthTempL mon=3>],
                [<#ByMonthTempH mon=4>, <#ByMonthTempL mon=4>],
                [<#ByMonthTempH mon=5>, <#ByMonthTempL mon=5>],
                [<#ByMonthTempH mon=6>, <#ByMonthTempL mon=6>],
                [<#ByMonthTempH mon=7>, <#ByMonthTempL mon=7>],
                [<#ByMonthTempH mon=8>, <#ByMonthTempL mon=8>],
                [<#ByMonthTempH mon=9>, <#ByMonthTempL mon=9>],
                [<#ByMonthTempH mon=10>, <#ByMonthTempL mon=10>],
                [<#ByMonthTempH mon=11>, <#ByMonthTempL mon=11>],
                [<#ByMonthTempH mon=12>, <#ByMonthTempL mon=12>]
            ]
        }]

    });

});
