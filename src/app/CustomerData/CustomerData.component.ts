import { DataService } from './../Data.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';





@Component({
  selector: 'app-CustomerData',
  templateUrl: './CustomerData.component.html',
  styleUrls: ['./CustomerData.component.css'],
})
export class CustomerDataComponent implements OnInit {

  // SearchValue:string = " ";


  customerData: any[] = []
  customerTransaction: any[] = []
  Cards: any;
  ngZone: any;
  cdr: any;

  constructor(private _data: DataService) { }


  ngOnInit(): void {
    this._data.getCustomers().subscribe((data) => {
      this.customerData = data;
    });
    this._data.getTransactions().subscribe((data) => {
      this.customerTransaction = data;
    });
  
  }





  chartOptions: any = {};
  title: string = '';
 

  customerId:any [] = [];
  getGraph(customerId: any) {

    const customerTransactions = this.customerTransaction.filter(transaction => transaction.customer_id === customerId);
 
    this.customerId.push(customerId);
    this.display(customerId);
    this.updateChartOptions(customerId);
  }

  cardid: any[] = [];
  selectedCustomer: any = null;
  selectedCustomerTransactions: any[] = [];
  cards: any[] = [];

  amunt1: any = 0;
  amunt2: any = 0;
  async display(cardId: number) {
    this.selectedCustomer = this.customerData.find((c: { id: number; }) => c.id === cardId);
    this.selectedCustomerTransactions = this.customerTransaction.filter((t: { customer_id: any; }) => Number(t.customer_id) === Number(cardId));

    if (this.selectedCustomer) {
     

      this.amunt1 = this.selectedCustomerTransactions.length >= 1 ? this.selectedCustomerTransactions[0].amount : 0;
      this.amunt2 = this.selectedCustomerTransactions.length >= 2 ? this.selectedCustomerTransactions[1].amount : 0;


      this.ngZone.run(() => {
        this.cdr.detectChanges();
      });
    } else {
      console.log(`Customer with ID ${cardId} not found.`);
    }
  }

  updateChartOptions(cardId: number) {
    this.chartOptions = {
      animationEnabled: true,
      title: {
        text: `Graph For Cusomer ${cardId}`
      },
      axisX: {
        valueFormatString: "DD MMM",
        interval: 1,
        intervalType: "day"
      },
      axisY: {
        title: "EGP"
      },
      toolTip: {
        content: "{y} EGP"
      },
      data: [{
        type: "column",
        color: " #ffc107",
        xValueFormatString: "YYYY",
        dataPoints: [
          { x: new Date(2021, 12, 31), y: 0 },
          { x: new Date(2022, 1, 1), y: this.amunt1 },
          { x: new Date(2022, 1, 2), y: this.amunt2 },
          { x: new Date(2022, 1, 3), y: 0 },
        ]
      }]
    };
  }

toTime(id:number){
  this.getGraph(id)
  this.getGraph(id)
}
filterName: any[] = [];
searchText: string = "";
  filter() {
    if (!this.searchText) {
      this.filterName = [this.customerData];

    }else{
      this.filterName = this.customerData.filter((item: any) => item.name.toLowerCase().includes(this.searchText.toLowerCase()))
    }
  }


}








