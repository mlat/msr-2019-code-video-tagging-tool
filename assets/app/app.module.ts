import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {QuizComponent} from "./quiz.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorComponent} from "./errors/error.component";
import {ErrorService} from "./errors/error.service";
import {QuizService} from "./quiz.service";
import {HttpModule} from "@angular/http";
import {AppService} from "./app.service";
import {routing} from "./app.routing";
import {Router} from "@angular/router";
import {HomeComponent} from "./home.component";

@NgModule({
    declarations:[AppComponent, QuizComponent, ErrorComponent, HomeComponent],
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing],
    bootstrap: [AppComponent],
    providers: [ErrorService, QuizService, AppService]
})
export class AppModule{

}