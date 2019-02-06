export class UserResponse{
    imgName:string;
    imageId:number;
    userChoices:number[];
    userName:string;
    dataset:number;


    constructor(imgName: string, imageId:number, userChoices: number[], userName: string, dataset:number) {
        this.imgName = imgName;
        this.imageId = imageId;
        this.userChoices = userChoices;
        this.userName = userName;
        this.dataset = dataset;
    }
}