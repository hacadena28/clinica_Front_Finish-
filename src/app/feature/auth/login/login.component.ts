import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../shared/service/auth.service";
import {NotificationService} from "../../../shared/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuilder.group({
    documentNumber: ['', [Validators.required, Validators.min(8), Validators.max(11)]],
    password: ['', Validators.required]
  });
  showError: boolean = false;
  showAuth: boolean = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      documentNumber: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  redirectHome() {
    this.router.navigate(['/home']);
  }

  redirect(role: string) {
    if (role === "Doctor") {
      this.router.navigate(['clinic/doctor/agenda']);
    } else if (role === "Patient") {
      this.router.navigate(['clinic/patient']);
    }
    else if (role === "Admin") {
      this.router.navigate(['/admin']);
    }
  }

  navigateSignup() {
    this.router.navigate(['/auth/register']);
  }
  recoverPassword(){
    this.router.navigate(['/auth/recuperarContraseña']);
  }

  login() {
    const { documentNumber, password } = this.loginForm.value;
    this.authService.login({ documentNumber, password }).subscribe((result) => {
      this.notificationService.mostrarExito("Inicio de sesion exitoso");
      this.redirect(result.role);
      localStorage.setItem('user', JSON.stringify(result));
      localStorage.setItem('documentNumber', JSON.stringify(documentNumber));
    }, (error) => {
      this.notificationService.mostrarError("Error verifique sus credenciales");
    })
  }
}
