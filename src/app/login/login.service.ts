import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


/*import 'rxjs/add/operator/map';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';*/

import 'rxjs/add/operator/toPromise';

import { CommonResult } from '../shared/common-interface';
import { LoginInterface, CheckSessionInterface } from './login-interface';
import { AppConfigService } from '../app-config.service';
import { HelpService } from '../shared/help.service';


//http://asdfblog.com/angular2-server-communication.html
//https://scotch.io/tutorials/angular-2-http-requests-with-observables

@Injectable()
export class LoginService {
	isLogin: boolean = false;
	autoLogin: boolean = false;

	private sessionKey: string = btoa('KEY_SESSION');
	private keepLoginKey: string = btoa('KEY_AUTO_LOGIN');

	private SESSION = '';

	constructor(private config : AppConfigService, private http: Http, private help: HelpService) { }

	storeToken(authData): void  {
		this.isLogin = true;
		this.autoLogin = authData.autoLogin;
		this.SESSION = authData.session;

		this.help.setCookie( this.sessionKey, this.SESSION ,  7, '/');

		if ( this.autoLogin ){
			this.help.setCookie( this.keepLoginKey, true ,  7, '/');
		}
	}

	login(loginObj: LoginInterface): Promise<CommonResult>{

		let postData = {
			username : loginObj.username,
			password : loginObj.password
		};

		return this.http.post(this.config.getUrl('login'), postData)
						.toPromise()
							.then(response => {
								let authData = response.json().data;
								
								if(authData.Result === 0) {
									this.storeToken({
										autoLogin : loginObj.autoLogin,
										session : authData.Session
									});
								}else{
									return { result : authData.Result };
								}
								
							})
							.catch(this.handleError);

/*		return this.http.post(this.config.getUrl('login'), postData)
						.map(response => response.json())
						.subscribe(
							authData => {
								if(authData.Result === 0) {
									this.storeToken({
										autoLogin : loginObj.autoLogin,
										session : authData.Session
									});
								}else{
									return { result : authData.Result };
								}

							},
							(err) => console.error(err),
							() => console.log('Authentication Complete')
						);*/
	}

	logout(): void {
		this.help.deleteCookie( this.sessionKey , '/');
		this.help.deleteCookie( this.keepLoginKey , '/');
	}

	checkSession(): Promise<CheckSessionInterface>{

		let _session: string = this.help.getCookie( this.sessionKey );
		let _autoLoginStr: string = this.help.getCookie( this.keepLoginKey );
		let _autoLogin: boolean = !!(_autoLoginStr === 'true');

		return this.http.post(this.config.getUrl('checkSession'), {
							session : _session
						})
						.toPromise()
						.then(response => {
							let data = response.json();

							if(data.Result === 0) {
								this.SESSION = _session;
								this.isLogin = true;
								this.autoLogin = _autoLogin;
							}

							return {
								result : data.Result,
								isLogin : this.isLogin,
								autoLogin : this.autoLogin
							};

								
						})
						.catch(this.handleError);

	}

	private handleError(error: any): Promise<any> {
		// console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}
	