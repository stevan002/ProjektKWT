import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  file: File | undefined;
  preview: string | undefined;

  registerForm = this.fb.group({
    email: [''],
    username: [''],
    password: [''],
    firstName: [''],
    lastName: [''],
    image: ['']
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ){
  }

  ngOnInit(): void {
  }

  uploadFile(event: any){
    if(event.target.files && event.target.files.length){
    
      // @ts-ignore
      this.file = (event.target as HTMLInputElement).files[0];
      this.registerForm.get('image')?.updateValueAndValidity();
    
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
      }

      reader.readAsDataURL(this.file)
    }
  }

  onSubmit(){
    let regUser: User = new User();
    regUser.email = this.registerForm.get("email")?.value as string;
    regUser.password = this.registerForm.get("password")?.value as string;
    regUser.username = this.registerForm.get("username")?.value as string;
    regUser.firstName = this.registerForm.get("firstName")?.value as string;
    regUser.lastName = this.registerForm.get("lastName")?.value as string;

    this.userService.register(regUser).subscribe((data: boolean) => {
      if(data){
        this.router.navigateByUrl('/auth/login').then()
      }
    });
    
    // if(this.file){
    //   this.userService.saveImage(this.file).subscribe((image: string) =>{
    //     regUser.image = image;
    //     this.userService.register(regUser).subscribe((data:boolean) => {
    //       if(data){
    //         this.router.navigateByUrl('/auth/login').then();
    //       }
    //     });
    //   })
    // }else{
    //   this.userService.register(regUser).subscribe((data: boolean) =>{
    //     if(data){
    //       this.router.navigateByUrl('/auth/login').then();
    //     }
    //   }) 
    // }

  }
}
