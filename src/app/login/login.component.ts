import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
	  	// this.route.params
	  	// .switchMap((params: Params) => this.heroService.getHero(+params['id']))
	  	// .subscribe(hero => this.hero = hero);
  }

  gotoDetail(): void {
  	this.router.navigate(['/detail', this.selectedHero.id]);
  }

}
