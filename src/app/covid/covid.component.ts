import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})


export class CovidComponent implements OnInit {


  statesList: string[];
  states:any;
  stateCode: string[];
  resultOfState: {} = {};
  resultOfObject:any;
  resultofArray: any[] = [];
  dateChecked: any;
  tableHeaders: String[] = ["Date", "TotalNoOfCases", "Recovered", "Positive", "Negative", "Hospitalized"];

  constructor(private httpClient: HttpClient) {
    this.states={'Alabama': 'AL','Alaska': 'AK','American Samoa': 'AS','Arizona': 'AZ','Arkansas': 'AR','California': 'CA','Colorado': 'CO','Connecticut': 'CT','Delaware': 'DE',
    'District Of Columbia': 'DC','Federated States Of Micronesia': 'FM','Florida': 'FL','Georgia': 'GA','Guam': 'GU','Hawaii': 'HI','Idaho': 'ID','Illinois': 'IL','Indiana': 'IN','Iowa': 'IA','Kansas': 'KS','Kentucky': 'KY',
    'Louisiana': 'LA','Maine': 'ME','Marshall Islands': 'MH','Maryland': 'MD','Massachusetts': 'MA','Michigan': 'MI','Minnesota': 'MN','Mississippi': 'MS','Missouri': 'MO','Montana': 'MT',
    'Nebraska': 'NE','Nevada': 'NV','New Hampshire': 'NH','New Jersey': 'NJ','New Mexico': 'NM','New York': 'NY','North Carolina': 'NC','North Dakota': 'ND','Northern Mariana Islands': 'MP','Ohio': 'OH',
    'Oklahoma': 'OK','Oregon': 'OR','Palau': 'PW','Pennsylvania': 'PA','Puerto Rico': 'PR','Rhode Island': 'RI','South Carolina': 'SC','South Dakota': 'SD','Tennessee': 'TN','Texas': 'TX','Utah': 'UT',
    'Vermont': 'VT','Virgin Islands': 'VI','Virginia': 'VA','Washington': 'WA','West Virginia': 'WV','Wisconsin': 'WI','Wyoming': 'WY'
    };
    this.dateChecked= new Date().toDateString();
   
  }
  ngOnInit(): void {
    this.resultofArray = [];
    this.resultOfState = {};
    this.resultOfObject={
  "totalTestResults":0,"recovered":0,"positive":0,"negative":0,"hospitalized":0};
  }

  getData(){
    var listOfOptions= document.querySelector(".dropdown")["options"];
    console.log(listOfOptions);
    var selectedIndex= document.querySelector(".dropdown")["selectedIndex"];
    var targetValue= listOfOptions[selectedIndex].value;
    console.log(targetValue);
     //debugger
     /*
      
    let index = this.statesList.indexOf(targetValue);
    let state = this.stateCode[index];
    */
    this.resultofArray = [];
    const key=this.getKey(targetValue);
    console.log(this.getKey(targetValue));
    var targetURL = "https://api.covidtracking.com/v1/states/" + targetValue + "/current.json";
    this.httpClient.get(targetURL).subscribe((result) => {
      this.resultOfState = result;
      console.log(this.resultOfState);
      
      var state=this.resultOfState;
      Object.entries(state).map(([key, value]) => {
        this.dateChecked = this.resultOfState["dateChecked"]
      this.dateChecked = new Date(this.dateChecked).toDateString();
      //this.resultOfObject["dateChecked"]=this.dateChecked;
      this.resultOfObject["totalTestResults"]= this.resultOfState["totalTestResults"];
      this.resultOfObject["recovered"]=this.resultOfState["recovered"];
      this.resultOfObject["positive"]= this.resultOfState["positive"];
      this.resultOfObject["negative"]= this.resultOfState["negative"];
      this.resultOfObject["hospitalized"]= (this.resultOfState["hospitalized"]== null) ? 0 :this.resultOfState["hospitalized"];
    });
    this.resultofArray= [this.resultOfObject];
    console.log(this.resultofArray)

    })

  }
 getKey(value){
    for(var key in this.states){
      if(this.states[key] == value){
        return key;
      }
    }
    return null;
  };


}
