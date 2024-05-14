export class User {
    title:string
    lastName:string
    firstName:string
    email:string
    password:string
    mobileNumber:string
    country:string
    city:string

    constructor( title:string,lastName:string,firstName:string,email:string,password:string,mobileNumber:string
        ,country:string
        ,city:string){
        this.email=email;
        this.password=password;
         this.firstName=firstName;
         this.lastName=lastName;
         this.title=title;
         this.mobileNumber=mobileNumber;
         this.country=country
         this.city=city
     }
}
