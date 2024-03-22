import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignupUserRequest } from 'src/app/models/interfaces/user/SignupUserRequest';
import { SignupUserResponse } from 'src/app/models/interfaces/user/SignupUserResponse';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { UserService } from 'src/app/services/user/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  loginCard = true
  loginForm = this.formBuilder.group({
    email:['' , Validators.required],
    password:['' , Validators.required]
  })

  signUpForm = this.formBuilder.group({
    name:['' , Validators.required],
    email:['' , Validators.required],
    password:['' , Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService : UserService,
    private cookieService : SsrCookieService,
    private messageService : MessageService
    ){}

  ngOnInit(): void {
    console.log(!this.loginForm.valid)
  }



  onSubmitLoginForm():void{
    if(this.loginForm.value && this.loginForm.valid){
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next:(response)=>{
          if(response){
            this.cookieService.set('USER_INFO' , response?.token);
            this.loginForm.reset()

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Bem vindo de volta ${response?.name}!`,
              life:2000
            })
          }
        },error : (error) =>{
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail:`Erro ao fazer login!`,
            life:2000
          });
          console.log(error)
        }
      })
    }
  }

  onSubmitSignUpForm():void{
    if(this.signUpForm.value && this.signUpForm.valid){
      this.userService.signUpUser(this.signUpForm.value as SignupUserRequest).subscribe({
        next:(response) =>{
          if(response){
            this.signUpForm.reset()
            this.loginCard = true

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Usuario criado com sucesso!`,
              life:2000
            })

          }
        },error : (error) =>{
          this.messageService.add({
            severity:'error',
            summary:'Erro',
            detail:`Erro ao criar usuario!`,
            life:2000
          });
          console.log(error)
        }
      })
    }
  }





}
