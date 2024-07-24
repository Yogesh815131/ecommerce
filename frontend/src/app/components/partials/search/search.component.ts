import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchterm:string='';

  constructor(private activatedRoute:ActivatedRoute, private router:Router){
    // this.activatedRoute.params.subscribe((params)=>{
    //   if(params['searchterm']){
    //     this.searchterm=params['searchterm'];
    //   }
    // })
  }

  search(searchdata:string){
    this.router.navigateByUrl('/search/'+searchdata);
  }

}
