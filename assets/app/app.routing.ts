import {RouterModule, Routes} from "@angular/router";

import {QuizComponent} from "./quiz.component"
import {AppComponent} from "./app.component";
import {HomeComponent} from "./home.component";


const APP_ROUTES: Routes = [
    {path: 'quiz/:link_name', component: QuizComponent},
    {path: '', redirectTo:'/quiz/aardvark', pathMatch: 'full'},
    {path: 'quiz', redirectTo:'/quiz/aardvark', pathMatch: 'full'},
];

export const routing = RouterModule.forRoot(APP_ROUTES);
