let config;
const basedir = 'data/';

var doTemp = function () {
    var freezing = config.temp.units === 'C' ? 0 : 32;
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: false
        },
        title: {text: 'Temperature'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Temperature (°' + config.temp.units + ')'},
                opposite: false,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                },
                plotLines: [{
                        // freezing line
                        value: freezing,
                        color: 'rgb(0, 0, 180)',
                        width: 1,
                        zIndex: 2
                    }]
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueSuffix: '°' + config.temp.units,
            valueDecimals: config.temp.decimals,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Temperature',
                zIndex: 99
            }, {
                name: 'Dew Point',
				visible: false
            }, {
                name: 'Apparent',
				visible: false
            }, {
                name: 'Wind Chill',
				visible: false
            }, {
                name: 'Heat Index',
				visible: false
            }, {
                name: 'Inside',
				visible: false
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'tempdata.json')
      .then(resp => resp.json())
      .then(resp => {
          chart.hideLoading();
          chart.series[0].setData(resp.temp);
          chart.series[1].setData(resp.dew);
          chart.series[2].setData(resp.apptemp);
          chart.series[3].setData(resp.wchill);
          chart.series[4].setData(resp.heatindex);
          chart.series[5].setData(resp.intemp);
      })
      .catch(err => {
          chart.hideLoading();
          console.error('Error loading tempdata.json', err);
      });
};

var doPress = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line'
        },
        title: {text: 'Pressure'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Pressure (' + config.press.units + ')'},
                opposite: false,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueSuffix: config.press.units,
            valueDecimals: config.press.decimals,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Pressure'
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'pressdata.json')
      .then(resp => resp.json())
      .then(resp => {
          chart.hideLoading();
          chart.series[0].setData(resp.press);          
      })
      .catch(err => {
          chart.hideLoading();
          console.error('Error loading pressdata.json', err);
      });
};

var compassP = function (deg) {
    var a = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return a[Math.floor((deg + 22.5) / 45) % 8];
};

var doWindDir = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'scatter',
            alignTicks: false
        },
        title: {text: 'Wind Direction'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Bearing'},
                opposite: false,
                min: 0,
                max: 360,
                tickInterval: 45,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return compassP(this.value);
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                min: 0,
                max: 360,
                tickInterval: 45,
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return compassP(this.value);
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            scatter: {
                cursor: 'pointer',
                enableMouseTracking: false,
                marker: {
                    states: {
                        hover: {enabled: false},
                        select: {enabled: false}
                    }
                },
                shadow: false
            }

        },
        tooltip: {
            enabled: false
        },
        series: [{
                name: 'Bearing',
                type: 'scatter',
                marker: {
                    symbol: 'circle',
                    radius: 2
                }
            }, {
                name: 'Avg Bearing',
                type: 'scatter',
                color: 'red',
                marker: {
                    symbol: 'circle',
                    radius: 2
                }
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
					count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'wdirdata.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.bearing);
            chart.series[1].setData(resp.avgbearing);
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading wdirdata.json', err);
        });
};


var doWind = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: false
        },
        title: {text: 'Wind Speed'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Wind Speed (' + config.wind.units + ')'},
                opposite: false,
                min: 0,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                min: 0,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueSuffix: config.wind.units,
            valueDecimals: config.wind.decimals,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Wind Speed'
            }, {
                name: 'Wind Gust'
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'winddata.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.wspeed);
            chart.series[1].setData(resp.wgust);            
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading solardata.json', err);
        });    
};

var doRain = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: true
        },
        title: {text: 'Rainfall'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Rainfall rate (' + config.rain.units + '/hr)'},
                min: 0,
                opposite: false,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                opposite: true,
                title: {text: 'Rainfall (' + config.rain.units + ')'},
                min: 0,
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueDecimals: config.rain.decimals,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Rain rate',
                type: 'line',
                yAxis: 0,
                tooltip: {valueSuffix: config.rain.units + '/hr'}
            }, {
                name: 'Daily rain',
                type: 'area',
                yAxis: 1,
                tooltip: {valueSuffix: config.rain.units}
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'raindata.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.rrate);
            chart.series[1].setData(resp.rfall);            
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading raindata.json', err);
        });
};


var doHum = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: false
        },
        title: {text: 'Relative Humidity'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Humidity (%)'},
                opposite: false,
                min: 0,
                max: 100,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                min: 0,
                max: 100,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueSuffix: '%',
            valueDecimals: config.hum.decimals,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Outdoor Humidity'
            }, {
                name: 'Indoor Humidity',
				visible: false
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'humdata.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.hum);
            chart.series[1].setData(resp.inhum);
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading humdata.json', err);
        });
};

var doSolar = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: true
        },
        title: {text: 'Solar'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Solar Radiation (W/m\u00B2)'},
                min: 0,
                opposite: false,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                opposite: true,
                title: {text: 'UV Index'},
                min: 0,
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            xDateFormat: "%A, %b %e, %H:%M"
        },
        series: [{
                name: 'Solar Radiation',
                type: 'area',
                color: 'rgb(255,165,0)',
                yAxis: 0,
                valueDecimals: 0,
                fillOpacity: 0.5,
                tooltip: {valueSuffix: 'W/m\u00B2'}
            }, {
                name: 'Theoretical Max',
                type: 'area',
                color: 'rgb(128,128,128)',
                yAxis: 0,
                valueDecimals: 0,
                fillOpacity: 0.2,
                tooltip: {valueSuffix: 'W/m\u00B2'}
            }, {
                name: 'UV Index',
                type: 'line',
                yAxis: 1,
                fillOpacity: 0.2,
                valueDecimals: config.uv.decimals,
                tooltip: {valueSuffix: ''}
            }],
        rangeSelector: {
            buttons: [{
                    count: 6,
                    type: 'hour',
                    text: '6h'
                }, {
                    count: 12,
                    type: 'hour',
                    text: '12h'
                }, {
					count: 24,
                    type: 'hour',
                    text: '1d'
                }, {
					count: 48,
                    type: 'hour',
                    text: '2d'
                }, {
                    count: 96,
                    type: 'hour',
                    text: '4d'
                }, {
                    type: 'all',
                    text: 'All'
                }],
            inputEnabled: false
        }
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'solardata.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.SolarRad);
            chart.series[1].setData(resp.CurrentSolarMax);
            chart.series[2].setData(resp.UV);
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading solardata.json', err);
        });
};

var doSunHours = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'column',
            alignTicks: false
        },
        title: {text: 'Sunshine Hours'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Sunshine Hours'},
                min: 0,
                opposite: false,
                labels: {
                    align: 'right',
                    x: -12,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 12,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            }
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            xDateFormat: "%A, %b %e"
        },
        series: [{
                name: 'Sunshine Hours',
                type: 'column',
                color: 'gold',
                yAxis: 0,
                valueDecimals: 1,
                tooltip: {valueSuffix: 'Hrs'}
            }]
    };

    chart = new Highcharts.Chart(options);
    chart.showLoading();

    fetch(basedir + 'sunhours.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.sunhours);
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading sunhours.json', err);
        });    
};

var doDailyRain = function () {
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'column',
            alignTicks: false
        },
        title: {text: 'Daily Rainfall'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Daily Rainfall'},
                min: 0,
                opposite: false,
                labels: {
                    align: 'right',
                    x: -12,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 12,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            }
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            xDateFormat: "%A, %b %e"
        },
        series: [{
                name: 'Daily Rainfall',
                type: 'column',
                color: 'blue',
                yAxis: 0,
                valueDecimals: config.rain.decimals,
                tooltip: {valueSuffix: config.rain.units}
            }]
    };

    chart = new Highcharts.Chart(options);
    chart.showLoading();

    fetch(basedir + 'dailyrain.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.dailyrain);           
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading dailyrain.json', err);
        });
};

var doDailyTemp = function () {
    var freezing = config.temp.units === 'C' ? 0 : 32;
    var options = {
        chart: {
            renderTo: 'chartcontainer',
            type: 'line',
            alignTicks: false
        },
        title: {text: 'Daily Temperature'},
        credits: {enabled: false},
        xAxis: {
            type: 'datetime',
            ordinal: false,
            dateTimeLabelFormats: {
                day: '%e %b',
                week: '%e %b %y',
                month: '%b %y',
                year: '%Y'
            }
        },
        yAxis: [{
                // left
                title: {text: 'Daily Temperature (°' + config.temp.units + ')'},
                opposite: false,
                labels: {
                    align: 'right',
                    x: -5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                },
                plotLines: [{
                        // freezing line
                        value: freezing,
                        color: 'rgb(0, 0, 180)',
                        width: 1,
                        zIndex: 2
                    }]
            }, {
                // right
                linkedTo: 0,
                gridLineWidth: 0,
                opposite: true,
                title: {text: null},
                labels: {
                    align: 'left',
                    x: 5,
                    formatter: function () {
                        return '<span style="fill: ' + (this.value <= 0 ? 'blue' : 'red') + ';">' + this.value + '</span>';
                    }
                }
            }],
        legend: {enabled: true},
        plotOptions: {
            series: {
                dataGrouping: {
                    enabled: false
                },
                states: {
                    hover: {
                        halo: {
                            size: 5,
                            opacity: 0.25
                        }

                    }
                },
                cursor: 'pointer',
                marker: {
                    enabled: false,
                    states: {
                        hover: {
                            enabled: true,
                            radius: 0.1
                        }
                    }
                }
            },
            line: {lineWidth: 2}
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueSuffix: '°' + config.temp.units,
            valueDecimals: config.temp.decimals,
            xDateFormat: "%A, %b %e"
        },
        rangeSelector: {
            enabled: false
        },
        series: [{
                name: 'Avg Temp',
                color: 'green'
            }, {
                name: 'Min Temp',
                color: 'blue'
            }, {
                name: 'Max Temp',
                color: 'red'
            }]
    };

    chart = new Highcharts.StockChart(options);
    chart.showLoading();

    fetch(basedir + 'dailytemp.json')
        .then(resp => resp.json())
        .then(resp => {
            chart.hideLoading();
            chart.series[0].setData(resp.avgtemp);
            chart.series[1].setData(resp.mintemp);
            chart.series[2].setData(resp.maxtemp);
        })
        .catch(err => {
            chart.hideLoading();
            console.error('Error loading dailytemp.json', err);
        });
};

document.addEventListener('DOMContentLoaded', () => {
  const radios = document.querySelectorAll('input[name="options"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const value = document.querySelector('input[name="options"]:checked').value;
      switch (value) {
        case 'temp': doTemp(); break;
        case 'dailytemp': doDailyTemp(); break;
        case 'press': doPress(); break;
        case 'wind': doWind(); break;
        case 'windDir': doWindDir(); break;
        case 'rain': doRain(); break;
        case 'dailyrain': doDailyRain(); break;
        case 'humidity': doHum(); break;
        case 'solar': doSolar(); break;
        case 'sunhours': doSunHours(); break;
      }
    });
  });

  // Load graph config
  fetch('data/graphconfig.json')
    .then(resp => resp.json())
    .then(result => {
      config = result;
      doTemp(); // load initial chart
    })
    .catch(err => console.error('Error loading graphconfig.json', err));
});