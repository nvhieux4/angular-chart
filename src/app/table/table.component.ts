import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

    total:Subject<any> = new Subject<any>();
    filterData:any = [];
    isCheckRow:boolean=false;
    titleRowOld:string='';

    @Input()
    get queryInput():number {  
        return Number(this.total);
    }
    set queryInput(value:any) {
        if(typeof value === 'object'){
            this.total.next(0);
        }
        this.total.next(Number(value));
    }

    
    columns:any = [
        {
            label: 'icon',
            title:'id',
            isSelect:false
            
        },
        {
            label: 'Movie',
            title:'movie',
            isSelect:false
        },
        {
            label:"Title",
            title:'title',
            isSelect:false
        },
        {
            label: 'Genres',
            title:'genres',
            isSelect:false
        },
        {
            label: 'Year',
            title:'year',
            isSelect:false
        },
        {
            label: 'Rating',
            title:'rating',
            isSelect:false
        },
        {
            label: 'RottenTomato',
            title:'rottenTomato',
            isSelect:false
        }
    ];

    data:any = [
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1998,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1887,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1972,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1762,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1987,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1790,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1678,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1892,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1987,
            rating:1,
            rottenTomato:23
        },
        {
            id:1,
            movie:"test",
            title:"test",
            genres:"test",
            year:1984,
            rating:1,
            rottenTomato:23
        }

    ]

    constructor() { }

    ngOnInit(): void {

        this.filterData =  this.data
        this.total.pipe(
        debounceTime(300)
        )
        .subscribe(value => {
        if(value === 0){
            return this.filterData =  this.data
        }
        this.filterData =  this.data.slice(0,value)
        })
        
    }


    handleSelectRow(data:string) {
        
        if(!this.columns.some((item:any) => item.isSelect === true)){
        this.isCheckRow = true;
        for(let i = 0; i < this.columns.length; i++){
            if(this.columns[i].title === data){
            this.columns[i].isSelect = true;
            }
        } 
        } else {
        this.isCheckRow = true;
        for(let i = 0; i < this.columns.length; i++){
            this.columns[i].isSelect = false;
            if(this.columns[i].title === data){
                this.columns[i].isSelect = !this.columns[i].isSelect;
            }
            if(this.titleRowOld === data) {
                this.columns[i].isSelect = false;
                this.isCheckRow = false;
            }
        } 
        }

        

    
        /* let newDataSelect = this.columns.find(item => item.isSelect === true)
        console.log(newDataSelect);
        if(newDataSelect.title === this.titleRowOld){
        const newIndexData = this.columns.findIndex((item:any) => item.title === newDataSelect.title)
        this.columns[newIndexData].isSelect = false;
        console.log(this.columns)
        
        }
        console.log(this.columns); */
        

        /* this.isCheckRow = !this.isCheckRow; */
        this.titleRowOld = data; 
        
        
    }
}


