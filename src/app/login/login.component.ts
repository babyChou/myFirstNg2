import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { LoginService } from './login.service';

//promise and subscribe
//http://stackoverflow.com/questions/36648263/angular2-observable-and-promise

//route change page
//http://stackoverflow.com/questions/33571605/angular-2-how-to-navigate-to-another-route-using-this-router-parent-navigate

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private location: Location, private LoginService: LoginService) { }

    ngOnInit(): void {

        this.LoginService.login({
            username : 'aaa',
            password : 'dfsdfd',
            autoLogin : false
        }).then(
            (data) => {
               alert('msg');
            },
            (err) => {
                console.log('my',err);
            }
        );
        console.log(1313123);
            // this.router.navigateByUrl('/about');

        // this.route.params
        // .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        // .subscribe(hero => this.hero = hero);
    }

    gotoAbout(): void {
        // this.router.navigate(['/about', this.selectedHero.id]);
    }



}
