import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {UserResponse} from "./user-response.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'
import {ErrorService} from "./errors/error.service";
import {ImageModel} from "./image.model";

@Injectable()
export class QuizService{

    private hostname = 'http://HOST:PORT';

    constructor(private http:Http, private errorService:ErrorService){}

    sendResponse(userResponse:UserResponse){
        const body = JSON.stringify(userResponse);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.hostname + '/api/v1/quiz' , body, {headers:headers})
            .map((response:Response) => {
                const result = response.json();
                return result
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getImageLink(dataset:number){
        return this.http.get(this.hostname + '/api/v1/quiz/' + dataset)
            .map((response:Response)=> {
                const imageRaw = response.json().obj[0];
                return new ImageModel(imageRaw["file_name"], imageRaw["id"]);
            })
            .catch((error:Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

    getLanguageName(link_name:string) {
        return this.http.get(this.hostname + '/api/v1/lang_name/' + link_name)
            .map((response:Response) => {
                const result = response.json();
                console.log(result);
                return result[0];
            })
            .catch((error:Response) => {
                console.log(error);
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })
    }

}
