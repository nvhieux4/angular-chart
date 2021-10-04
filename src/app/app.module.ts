import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { ShowColumTableComponent } from './show-colum-table/show-colum-table.component';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import {ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    ShowColumTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HighchartsChartModule,
    ChartModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
