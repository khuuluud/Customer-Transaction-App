import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(item: any[] , searchText: string): any {
    if(!searchText)
      return item;

    searchText = searchText.toLowerCase();
    return item.filter( ( customerData)=> customerData.name.toLowerCase().includes(searchText) || (customerData.id).toString().includes(searchText) )
    
  }




}
