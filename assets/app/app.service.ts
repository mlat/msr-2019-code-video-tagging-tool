import {Injectable} from "@angular/core";
import {ErrorService} from "./errors/error.service";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {

    private hostname = 'http://HOST';

    constructor(private http:Http, private errorSerivce:ErrorService){}

}
