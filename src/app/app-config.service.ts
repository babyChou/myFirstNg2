import { Injectable } from '@angular/core';

@Injectable()
export class AppConfigService {

	private API_ENDPOINT: string = 'http://127.0.0.1:6666/api/';


	constructor() { }

	getUrl(apiName:string) {

		const URL = {
			login : this.API_ENDPOINT + 'login',
			logout : this.API_ENDPOINT + 'logout',
			checkSession : this.API_ENDPOINT + 'checkSession',
			changePassword : this.API_ENDPOINT + 'changePassword',
		}

		if(!URL[apiName]) {
			return null;
		}else{
			return URL[apiName];
		}

	}





}
