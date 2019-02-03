import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isLinear = true;

  basicInfo: FormGroup;
  specificInfo: FormGroup;

  branches = ['CSE', 'ECE', 'EEE', 'ME', 'ASE', 'CE', 'AME'];
  years = ['2018', '2017', '2016', '2015', '2014'];
  languages = ['C', 'C++', 'Python', 'Java', 'Haskell', 'JavaScript', 'TypeScript', 'Dart', 'R', 'PyPy'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
    ) {

      this.basicInfo = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.pattern('^[a-z0-9_.-]{8,}$')]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      });

      this.specificInfo = this.formBuilder.group({
        branch: ['', Validators.required],
        year: ['', Validators.required],
        language: ['', Validators.required],
        reg_no: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
        github_username: ['', Validators.required]
      });

    }

  ngOnInit() {

  }

  register() {
    // console.log(this.basicInfo.value);
    // console.log(this.specificInfo.value);
    const user: User = new User();
    user.email = this.basicInfo.value.email.toLowerCase();
    user.name = this.basicInfo.value.name;
    user.username = this.basicInfo.value.username;
    user.branch = this.specificInfo.value.branch;
    user.year = this.specificInfo.value.year;
    user.language = this.specificInfo.value.language;
    user.reg_no = this.specificInfo.value.reg_no.toUpperCase();
    user.github_username = this.specificInfo.value.github_username;
    this.authService.signUpWithEmailAndPassword(user.email, this.basicInfo.value.password);
    this.authService.saveRegistrationInfo(user)
    .then( () => {
      this.alertService.success('Registered Successfully');
      // Redirect after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
    )
    .catch(err => {
      this.alertService.error('Error : ' + err);
    });
  }

}
