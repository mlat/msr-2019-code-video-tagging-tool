export class ImageModel{
    imageLink:string;
    imageId: number;


    constructor(imageLink: string, imageId: number) {
        this.imageLink = imageLink;
        this.imageId = imageId;
    }
}