import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4lang_pt_BR from '@amcharts/amcharts4/lang/pt_BR';
import { from } from 'rxjs';

export class ChartLine {
    chart: any;
    series: any = {};
    constructor(chartDiv: string) {
        am4core.useTheme(am4themes_animated);
        let chart;
        this.chart = chart = am4core.create(chartDiv, am4charts.XYChart);
        this.configureChart();
        this.createLegend();
    }

    createSerie(dados: any) {
        let series = this.chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "dataPay";
        series.name = dados.name;
        series.groupFields.valueX = 'sum';
        series.numberFormatter.numberFormat = 'R$ #,###.00'
        series.strokeWidth = 2;
        
        // series.minBulletDistance = 15;
        // series.name = name;

        // Drop-shaped tooltips
        series.tooltipText = '{dateX}: [b]{valueY}[/]';
        series.tooltipText = '{dateX}: [b]{valueY}[/]';
        series.adapter.add('tooltipText', (ev: any) => {
            var text = "[bold]{dateX.formatDate('dd/MM/yyyy')}[/]\n";
            let valor = 'R$';
            text += '[' + series.stroke.hex + ']●[/] ' + series.name + ': ' + valor + ' {' + series.dataFields.valueY + ".formatNumber('#,###.00')}\n";
            return text;
        });
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color('#fff');
        series.tooltip.label.fill = am4core.color('#00');
        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        series.data = dados.sales;
        return series;
    }

    createLegend() {
        let chart = this.chart;
        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";
        chart.legend.scrollable = true;
        chart.legend.itemContainers.template.events.on("over", (event: any) => {
            this.processOver(event.target.dataItem.dataContext);
        })
        chart.legend.itemContainers.template.events.on("out", (event) => {
            this.processOut(event.target.dataItem.dataContext);
        })
    }

    configureChart() {
        let chart = this.chart;
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        dateAxis.dateFormatter = new am4core.DateFormatter();
        dateAxis.dateFormatter.dateFormat = 'dd-MM-yyyy';
        valueAxis.cursorTooltipEnabled = false;
        dateAxis.cursorTooltipEnabled = false;
        dateAxis.groupData = true;
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = 'panXY';
        chart.cursor.xAxis = dateAxis;
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        chart.numberFormatter.intlLocales = 'pt-BR';
        chart.language.locale = am4lang_pt_BR;
        dateAxis.start = 0.79;
    }

    processOver(hoveredSeries: any) {
        hoveredSeries.toFront();

        hoveredSeries.segments.each((segment: any) => {
            segment.setState("hover");
        })

        this.chart.series.each((series: any) => {
            if (series != hoveredSeries) {
                series.segments.each(function (segment) {
                    segment.setState("dimmed");
                })
                series.bulletsContainer.setState("dimmed");
            }
        });
    }

    processOut(hoveredSeries: any) {
        this.chart.series.each((series: any) => {
            series.segments.each((segment: any) => {
                segment.setState("default");
            })
            series.bulletsContainer.setState("default");
        });
    }

    clearSeries() {
        this.chart.series.each((serie: any) => {
            this.chart.series.removeIndex(0);
        });
    }

}
