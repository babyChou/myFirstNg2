import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Http }    from '@angular/http';

import 'rxjs/add/operator/toPromise';

//https://angular-2-training-book.rangle.io/handout/http/making_requests.html
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {
	private heroesUrl = 'api/heroes'; 

  constructor(private location: Location, private http: Http) { }

  ngOnInit() {
  }

  // getHeroes(): Promise<Hero[]> {
  // 	return this.http.get(this.heroesUrl)
  // 	.toPromise()
  // 	.then(response => response.json().data as Hero[])
  // 	.catch(this.handleError);
  // }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }

  goBack(): void {
  	this.location.back();
  }

}
