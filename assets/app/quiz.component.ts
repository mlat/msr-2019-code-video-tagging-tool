import {Component, OnInit} from "@angular/core";
import {UserResponse} from "./user-response.model";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {QuizService} from "./quiz.service";
import {ImageModel} from "./image.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: "app-quiz",
    templateUrl: "./quiz.component.html",
    styleUrls: ["quiz.component.css"]
})
export class QuizComponent implements OnInit {
    language_name: string;
    imageModel: ImageModel;
    imageLink: string;
    userRespone: UserResponse;
    userName: string;
    myForm: FormGroup;
    isEnabled: boolean;
    dataset: number;

    constructor(private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    }

    onSubmit() {
        this.userName = this.myForm.value.username;

        var choices = [];
        if (this.myForm.value.isCode) {
            choices.push(0);
        }

        if (this.myForm.value.partiallyVisible) {
            choices.push(1);
        }

        if (this.myForm.value.handWritten) {
            choices.push(2);
        }

        if (this.myForm.value.notCode) {
            choices.push(3);
        }

        if (choices.length == 0) {
            return;
        }


        this.userRespone = new UserResponse(this.imageModel.imageLink, this.imageModel.imageId, choices, this.userName, this.dataset);


        this.isEnabled = false;
        this.quizService.sendResponse(this.userRespone)
            .subscribe((result) => {
                console.log(result);
            });


        this.myForm.reset();
        this.myForm.controls['username'].setValue(this.userName);


        this.quizService.getImageLink(this.dataset)
            .subscribe((imageResult: ImageModel) => {
                console.log(imageResult);
                this.imageModel = imageResult;
            });
    }

    onChange() {
        this.isEnabled = false;

        if (this.myForm.value.isCode) {
            this.isEnabled = true;
        }

        if (this.myForm.value.partiallyVisible) {
            this.isEnabled = true;
        }

        if (this.myForm.value.handWritten) {
            this.isEnabled = true;
        }

        if (this.myForm.value.notCode) {
            this.isEnabled = true;
        }

        if (this.myForm.value.username === null || this.myForm.value.username === "") {
            this.isEnabled = false;
        }

        if (this.myForm.value.notCode && this.myForm.value.isCode) {
            this.isEnabled = false;
        }

    }

    setLanguageName(link_name: string) {

        this.quizService.getLanguageName(link_name).subscribe(
            (result) => {
                this.language_name = result.language_wanted;
                this.dataset = result.id;
                this.quizService.getImageLink(this.dataset)
                    .subscribe(
                        (imageResult: ImageModel) => {
                            console.log(imageResult);
                            this.imageModel = imageResult;
                        },
                        (error: Error) => {
                            this.router.navigateByUrl('/');
                        });
            },
            (error: Error) => {
                console.log(error);
                // TODO redirect
                this.router.navigateByUrl('/');
            }
        )
    }

    ngOnInit() {
        this.myForm = new FormGroup({
            username: new FormControl(),
            isCode: new FormControl(),
            partiallyVisible: new FormControl(),
            handWritten: new FormControl(),
            notCode: new FormControl()
        });

        this.isEnabled = false;

        this.route.paramMap.subscribe(params => {
            var link_name = params.get('link_name');
            if (!link_name) {
                this.router.navigate(['/']);
            }
            this.setLanguageName(link_name);
        })
    }
}