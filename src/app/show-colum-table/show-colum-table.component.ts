import { Component, Input, OnInit } from '@angular/core';
import {  Subject } from 'rxjs';
import {  startWith } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);
import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);
import { Chart } from 'angular-highcharts';
import { Options } from 'highcharts';

@Component({
    selector: 'app-show-colum-table',
    templateUrl: './show-colum-table.component.html',
    styleUrls: ['./show-colum-table.component.scss']
})
export class ShowColumTableComponent implements OnInit {

    constructor() { }

    listData:Subject<any> = new Subject<any>();
    title:Subject<any>= new Subject<any>();
    lengthListData:number=0;
    test:any=[];
    title$:string ='';
    newData:any=[];
    notNull:Subject<number>= new Subject<number>();
    dataNull:Subject<number>= new Subject<number>();
    average:Subject<number>= new Subject<number>();
    maxiMum:Subject<number>= new Subject<number>();

    chart: any;
    public activity:any;
    public xData:any;
    public label:any;
    options:any;
    
    @Input()
    get data():any {
        return this.newData;
    }
    set data(value:any) {
        console.log(value)
        this.listData.next(value);
        this.newData=value;
        this.lengthListData = value.length;
    }

    @Input() 
    get isClickRow():any {
        return this.title;
    }
    set isClickRow(value:string) {
        this.title.next(value);
        this.title$= value;
    }

    filterDataNul(data:any,isNull:boolean):number{
        const dataNotNull= data.filter((item:any)=>item !== null);
        if(isNull) {
            return data.length - dataNotNull.length;
        } else {
            return dataNotNull.length;
        }
    }

    averageData(data:any):number {
        const sum = data.reduce((acc:number,current:number) => acc+current,0);
        console.log(sum, data.length);
        return Number((sum/data.length).toFixed(2));
    }

    


    ngOnInit(): void {

        this.title.pipe(
        startWith(this.listData)
        ).subscribe((value:any)=>{
            const newListData = this.newData.map((item:any)=>item[value]);
            this.notNull.next(this.filterDataNul(newListData,false));
            this.dataNull.next(this.filterDataNul(newListData,true));
            this.maxiMum.next(Math.max.apply(Math, newListData));
            this.average.next(this.averageData(newListData));

            this.options = {
            title: {
                text: ''
            },
        
            xAxis: [{
                title: { text: 'Data' },
                alignTicks: false
            }, {
                title: { text: 'Histogram' },
                alignTicks: false,
                opposite: true
            }],
        
            yAxis: [{
                title: { text: 'Data' }
            }, {
                title: { text: 'Histogram' },
                opposite: true
            }],
        
            plotOptions: {
                histogram: {
                accessibility: {
                    pointDescriptionFormatter: function (point:any) {
                    var ix = point.index + 1,
                        x1 = point.x.toFixed(3),
                        x2 = point.x2.toFixed(3),
                        val = point.y;
                    return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                    }
                }
                }
            },
            series: [
                {
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 1,
                name: 'data'
                }, {
                type: 'scatter',
                data: newListData,
                showInLegend: false,
                visible: false
                }]
            };
            let chart = new Chart(this.options);
            this.chart = chart;
            console.log(this.chart)
        })

        this.listData.pipe(
        startWith(this.title)
        ).subscribe((value:any)=>{
        if(this.title$ !==''){
            const newListData = value.map((item:any)=>item[this.title$]);
            this.notNull.next(this.filterDataNul(newListData,false));
            this.dataNull.next(this.filterDataNul(newListData,true));
            this.maxiMum.next(Math.max.apply(Math, newListData));
            this.average.next(this.averageData(newListData));

            this.options = {
            title: {
                text: ''
            },
        
            xAxis: [{
                title: { text: 'Data' },
                alignTicks: false
            }, {
                title: { text: 'Histogram' },
                alignTicks: false,
                opposite: true
            }],
        
            yAxis: [{
                title: { text: 'Data' }
            }, {
                title: { text: 'Histogram' },
                opposite: true
            }],
        
            plotOptions: {
                histogram: {
                accessibility: {
                    pointDescriptionFormatter: function (point:any) {
                    var ix = point.index + 1,
                        x1 = point.x.toFixed(3),
                        x2 = point.x2.toFixed(3),
                        val = point.y;
                    return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                    }
                }
                }
            },
            series: [
                {
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 1,
                name: 'data'
                }, {
                type: 'scatter',
                data: newListData,
                showInLegend: false,
                visible: false
                }]
            };
            let chart = new Chart(this.options);
            this.chart = chart;
        }})    
        
    }

}


