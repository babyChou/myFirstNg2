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
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username:string = 'sdfsdfdf';
    password:string = '';
    isLogin:boolean = false;

    tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

    constructor(private router: Router, private route: ActivatedRoute, private location: Location, private LoginService: LoginService) { }

    ngOnInit(): void {

      
            // this.router.navigateByUrl('/about');

        // this.route.params
        // .switchMap((params: Params) => this.heroService.getHero(+params['id']))
        // .subscribe(hero => this.hero = hero);
    }

    login(): void {
        console.log(this.username,this.password);
        this.LoginService.login({
            username : this.username,
            password : this.password,
            autoLogin : this.isLogin
        }).then(
            (data) => {
               alert('msg');
            },
            (err) => {
                console.log('my',err);
            }
        );
        console.log(1313123);
    }

    gotoAbout(): void {
        // this.router.navigate(['/about', this.selectedHero.id]);
    }



}
