import { Injectable } from '@angular/core';


@Injectable()
//https://medium.com/codingthesmartway-com-blog/using-material-design-in-angular-2-83a3128c58b7#.4juqekxm0
export class HelpService {

	constructor() { }

	setCookie(cKey:string, cValue:any, exDays:number, cPath:string = '/') {
		var d:Date = new Date();
		var expires;
		var domain;
		var path;

		d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000));
		expires = "expires=" + d.toUTCString();
		// domain = "domain=" + cDomain;
		path = "path=" + cPath;
		document.cookie = cKey + "=" + cValue + "; " + expires + ';' + path;
	}

	getCookie(cKey:string) {
		var key = cKey + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(key) == 0) return c.substring(key.length,c.length);
		}
		return "";
	}

	deleteCookie(cKey:string, cPath:string = '/') {
		document.cookie = cKey + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;"+"path=" + cPath;
	}


    secToDays(sec){
        var days:number = Math.floor(sec / 86400);
        var hours:number = Math.floor((sec % 86400) / 3600);
        var minutes:number = Math.floor(((sec % 86400) % 3600) / 60);
        var seconds:number = ((sec % 86400) % 3600) % 60;
        var resultArr: string[] = [];

        if (hours   < 10) {resultArr[0] = "0"+hours;}
        if (minutes < 10) {resultArr[1] = "0"+minutes;}
        if (seconds < 10) {resultArr[2] = "0"+seconds;}

        return (days > 0 ? days+':' : '') + resultArr[0]+':'+resultArr[1]+':'+resultArr[2];
    }

    secToHours(sec){
        var hours = Math.floor(sec / 3600);
        var minutes = Math.floor((sec % 3600) / 60);
        var seconds = (sec % 3600) % 60;
        var resultArr: string[] = [];

        if (hours   < 10) {resultArr[0] = "0"+hours;}
        if (minutes < 10) {resultArr[1] = "0"+minutes;}
        if (seconds < 10) {resultArr[2] = "0"+seconds;}

        return resultArr[0]+':'+resultArr[1]+':'+resultArr[2];
    }


    checkPortNumber(value:number){
        return value>0 && value < 65536;
    }


    checkUri(value:string){
        return value.match(/^[a-zA-Z0-9\,\.\;\?\'\+\\&amp;%\$#\=~_:\-\/]*$/);
    }

    checkDomainName(value:string){
        return value.match(/^[a-zA-Z0-9\.\-]*$/);
    }


    checkRtmpUrl(value:string){
        var fmsUrlPattern = /^rtmp:\/\/([-a-zA-Z0-9.]+)(:(\d*))?(.*)$/;
        var result = fmsUrlPattern.exec(value);

        if( null !== result )
        {
            if( result[1] && ( this.checkDomainName( result[1] ) )  )
            {
                if( !result[2] || (!!result[3] && this.checkPortNumber(result[3])) )
                {
                    if(  !!result[4] && this.checkUri(result[4]) )
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkIPv4Address(value:string){
        return value.match(/^([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/);
    }

    checkHLSUrl(value){
        return (value.match(/(http|https):\/\/([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)(.m3u8)$/) || value.match(/(rtsp):\/\/([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)$/));
    }

    lengthInUtf8Bytes(str:string){
       var m = encodeURIComponent(str).match(/%[89ABab]/g);
       return str.length + (m ? m.length : 0);
    }

    checkHttpUrl(value:string){
        return value.match(/^(https?:\/\/)[\w]+(\.[\w]+)*(\:[\d]+)*(\.[a-zA-Z\d]{2,})*(\/[\w\d\/\.\?\&\=\-]*)?$/ig);
    }

    checkDomain(value:string){
        return value.match(/^([a-zA-Z0-9\-\*\.]+[\.]{1,}[a-zA-Z0-9\-\*]{1,})$/);
    }

    checkSpecialChars(value:string){
        return value.match(/[\/|\\:?<>*"\+]/);
    }


    isObjEmpty(obj:any){
         // null and undefined are "empty"
         if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (window.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }

    // dynDialog(opts){
    //     /*
    //     * param size @String ['lg','sm'] options
    //     * param resolveObj @Object options
    //     * param type @String ['confirm','alert','modify'] options
    //     */
    //     var defaults = {
    //         type:'confirm',
    //         titleTrans: 'MSG_WARN',
    //         okBtnTrans: 'MSG_OK',
    //         cancelBtnTrans: 'MSG_CANCEL',
    //         deleteBtnTrans: 'MSG_DELETE',
    //         content:'',
    //         controllerAs : 'dynDiaCtrl',
    //         ctrl:_defaultCtrl,
    //         resolveObj:{
    //             /*ObjA : xxxx*/
    //         },
    //         closed:function(/*ObjBack*/){},
    //         dismissed:function(){}
    //     }

    //     /* @ngInject */
    //     function _defaultCtrl( $uibModalInstance /*items*/ ){
    //         var self = this;
    //         /*items.ObjA*/
    //         self.disableOk = false;
    //         self.ok(){$uibModalInstance.close(/*ObjBack*/);}
    //         self.cancel(){$uibModalInstance.dismiss('cancel');}
    //         self.delete(){$uibModalInstance.dismiss('cancel');}

    //     }


    //     angular.extend(defaults, opts);

    //     var content = '<div class="modal-header"><h3 class="modal-title" translate="'+ defaults.titleTrans +'"></h3>'+
    //                     '<span class="icon close" ng-click="'+ defaults.controllerAs +'.cancel()"><span>×</span></span>'+
    //                   '</div>'+
    //                   '<div class="modal-body bgc_f0f0">'+ defaults.content +
    //                   '</div>'+
    //                   '<div class="modal-footer">{FOOLTER_BLOCK}';


    //     var modelParams = {
    //         controller: defaults.ctrl,
    //         keyboard : false,
    //         backdrop: 'static',
    //         controllerAs : defaults.controllerAs
    //     }

    //     if (defaults.size){
    //         modelParams.size = defaults.size;
    //     }

    //     if (defaults.resolveObj){
    //         modelParams.resolveObj = defaults.resolveObj;
    //         modelParams.resolve = {
    //             items: function () { return defaults.resolveObj;}
    //         }
    //     }

    //     var btnTempOk = '<button class="btn-default btn" ng-click="'+ defaults.controllerAs +'.ok()" ng-disabled="'+ defaults.controllerAs +'.disableOk" translate="'+ defaults.okBtnTrans +'">',
    //         btnTempCancel = '&nbsp;<button class="btn-default btn" ng-click="'+ defaults.controllerAs +'.cancel()" translate="'+ defaults.cancelBtnTrans +'">',
    //         btnTempDelete = '<button class="btn-default btn" ng-click="'+ defaults.controllerAs +'.delete()" translate="'+ defaults.deleteBtnTrans +'">&nbsp;';

    //     if (defaults.type === 'alert'){
    //         modelParams.template = content.replace('{FOOLTER_BLOCK}', btnTempOk);
    //     }else if(defaults.type === 'confirm'){
    //         modelParams.template = content.replace('{FOOLTER_BLOCK}', btnTempOk + btnTempCancel );
    //     }else{
    //         modelParams.template = content.replace('{FOOLTER_BLOCK}', btnTempDelete + btnTempOk + btnTempCancel );
    //     }


    //     var modalInstance = $uibModal.open(modelParams);

    //     modalInstance.result.then(defaults.closed, defaults.dismissed);

    // }

    getAndroidVersion(){
        var v:string = navigator.userAgent.toLowerCase();
        var result:any;
        result = v.match(/android\s([0-9\.]*)/);
        return result ? parseFloat(result[1]) : false;
    }

    isNumeric(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    json2xml(o){
        if (typeof o == 'object' && o.constructor == Object && len(o) == 1) {
            for (var a in o) {
                return toXML(a, o[a]);
            }
        } else {

        }

        function len(o) {
            var n = 0;
            for (var a in o) {
                n++;
            }
            return n;
        }

        function toXML(tag, o) {
            var doc = '<' + tag;
            if (typeof o === 'undefined' || o === null) {
                doc += '/>';
                return doc;
            }
            if (typeof o !== 'object') {
                doc += '>' + safeXMLValue(o) + '</' + tag + '>';
                return doc;
            }
            if (o.constructor == Object) {
                for (var a in o) {
                    if (a.charAt(0) == '@') {
                        if (typeof o[a] !== 'object') {
                            doc += ' ' + a.substring(1) + '="' + o[a] + '"';
                            delete o[a];
                        } else {
                            throw new Error((typeof o[a])
                                    + ' being attribute is not supported.');
                        }
                    }
                }
                if (len(o) === 0) {
                    doc += '/>';
                    return doc;
                } else {
                    doc += '>';
                }
                if (typeof o['#text'] !== 'undefined') {
                    if (typeof o['#text'] !== 'object') {
                        doc += o['#text'] + '</' + tag + '>';
                        return doc;
                    } else {
                        throw new Error((typeof o['#text'])
                                + ' being #text is not supported.');
                    }
                } else {
                    for (var b in o) {
                        if (o[b].constructor == Array) {
                            for (var i = 0; i < o[b].length; i++) {
                                if (typeof o[b][i] !== 'object'
                                        || o[b][i].constructor == Object) {
                                    doc += toXML(b, o[b][i]);
                                } else {
                                    throw new Error((typeof o[b][i])
                                            + ' is not supported.');
                                }
                            }
                        } else if (o[b].constructor == Object
                                || typeof o[b] !== 'object') {
                            doc += toXML(b, o[b]);
                        } else {
                            throw new Error((typeof o[b]) + ' is not supported.');
                        }
                    }
                }
                doc += '</' + tag + '>';
                return doc;
            }
        }
    
        function safeXMLValue(value) {
            var s = value.toString();
            s = s.replace('/\&/g', '&amp;');
            s = s.replace('/\"/g', '&quot;');
            s = s.replace('/</g', '&lt;');
            s = s.replace('/>/g', '&gt;');
            return s;
        }
    }

    getMaxZindex(){
        return Math.max.apply(null, Array.prototype.map.call(document.querySelectorAll('*'), function(el) {
                        return +el.style.zIndex;
                    })) + 10;
    }


    getUTCtimestamp( date:Date ){
        var _utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),  date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    }

    // getImageFileByUrl(url) {
    //     var deferred = $q.defer();

    //     var canvas = document.createElement("canvas");
    //     var dataURL;
    //     var blob;
    //     var file;

    //     if(url.split(',')[0].indexOf('base64') >= 0){
    //         // var dataURL = canvas.toDataURL('image/png');
    //         dataURL = canvas.toDataURL('image/png', 0.5);
    //         blob = dataURItoBlob(dataURL);

    //         // file = new File([blob], "image.png");

    //         file = blob;
    //         deferred.resolve(file);

    //     }else{

    //         var xhr = new XMLHttpRequest(); 
    //         xhr.open("GET", url); 
    //         //force the HTTP response, response-type header to be blob
    //         xhr.responseType = "blob"; 
    //         xhr.onload() 
    //         {
    //             //xhr.response is now a blob object
    //             blob = xhr.response;

    //             //set data to png
    //             blob = new Blob([blob], {type: 'image/png'});

    //             /* new File  not support in IE and edge */
    //             // file = new File([blob], "image.png");

    //             file = blob;
    //             deferred.resolve(file);
                
    //         }

            
    //         xhr.send();
    //     }


    //     return deferred.promise;
    // }

    // dataURItoBlob(dataURI) {
    //     // convert base64/URLEncoded data component to raw binary data held in a string
    //     var byteString;
    //     if (dataURI.split(',')[0].indexOf('base64') >= 0)
    //         byteString = atob(dataURI.split(',')[1]);
    //     else
    //         byteString = unescape(dataURI.split(',')[1]);

    //     // separate out the mime component
    //     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    //     // write the bytes of the string to a typed array
    //     var ia = new Uint8Array(byteString.length);
    //     for (var i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }

    //     return new Blob([ia], {type:mimeString});
    // }

    // getBase64Image(url) {
    //     var deferred = $q.defer();
        
    //     var img = new Image();

    //     // Create an empty canvas element
    //     var canvas = document.createElement("canvas");
    //     canvas.width = img.width;
    //     canvas.height = img.height;

    //     // Copy the image contents to the canvas
    //     var ctx = canvas.getContext("2d");

    //     img.onload() {
    //         ctx.drawImage(img, 0, 0);

    //         // Get the data-URL formatted image
    //         // Firefox supports PNG and JPEG. You could check img.src to guess the
    //         // original format, but be aware the using "image/jpg" will re-encode the image.
    //         var dataURL = canvas.toDataURL("image/png");

    //         deferred.resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    //     }

    //     img.src = url;
        

    //     return deferred.promise;
    // }

    underScore(string:string) {
        return string.replace(/([A-Z]{1,})/g, "_$1").toLowerCase().replace(/^(_)/g,'');
    }

    camelize(string:string) {
        return string.replace( /_([a-z])/ig, function( all, letter ) {
            return letter.toUpperCase();
        });
    }

    sortArrayByKey(array:Array<any>, key:string , type:string) {
        var _type = type || 'asc';

        var result;
        if(_type === 'asc') {
            result = array.sort(_sortAsc);
        }else{
            result = array.sort(_sortDes);
        }

        function _sortAsc(a,b){
            if (a[key] < b[key])
                return -1;
            if (a[key] > b[key])
                return 1;
            return 0;
        }

        function _sortDes(a,b){
            if (a[key] < b[key])
                return 1;
            if (a[key] > b[key])
                return -1;
            return 0;
        }

        return result;
    }

}
