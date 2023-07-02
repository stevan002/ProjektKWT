import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit{

  @Output() updateUserEvent = new EventEmitter<User>()
  editProfileForm = this.fb.group({
    email: [''],
    password: [''],
    newPassword: [''],
    repeatPassword: [''],
    displayName: [''],
    description: ['']
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ){}


  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
  if (currentUser) {
    this.editProfileForm.patchValue({
      email: currentUser.email,
      displayName: currentUser.displayName,
      description: currentUser.description,
      newPassword: currentUser.password
    });
  }
  }

  onSubmit(){
    if(this.newPassword == this.repeatPassword){
      this.userService.update(this.editProfileForm.value as User).subscribe((user: User) => {
        this.updateUserEvent.emit(user);
      });
    } else {
      alert('Password do not match');
    }
  }

  get description(){
    return this.editProfileForm.get("description")?.value
  }

  get displayName(){
    return this.editProfileForm.get("displayName")?.value
  }

  get email(){
    return this.editProfileForm.get("email")?.value
  }

  get repeatPassword(){
    return this.editProfileForm.get("repeatPassword")?.value
  }

  get newPassword() {
    return this.editProfileForm.get('newPassword')?.value;
  }

  get password() {
    return this.editProfileForm.get('password')?.value;
  }

}
