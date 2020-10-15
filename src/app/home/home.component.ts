import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  totalRecords: any;
  worldData: any;
  usData: any;
  resultofArr: any[] = [];
  title: string[] = ["Global Covid Data", " United States"];
  tableHeader:String[]=["Country","Total Cases","Total Deaths","Recovered","Positive Cases","Today's Death"];
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit(): void {

    var targetURL = "https://coronavirus-19-api.herokuapp.com/countries";
    this.httpClient.get(targetURL).subscribe((result) => {
      this.totalRecords = result;
      for(let i=0;i<this.totalRecords.length;i++){
        
        if(i<2){
          this.resultofArr.push(this.totalRecords[i]);
        }
        else if(i<=2){
          break;
        } 

      }
   
      console.log( this.resultofArr);
      this.worldData = this.totalRecords[0];
      this.usData = this.totalRecords[1];

    });

  }
  
}
