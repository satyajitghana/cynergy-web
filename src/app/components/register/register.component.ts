import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

// Registration Service
import { RegisterService } from '../../services/register.service';
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private alertService: AlertService,
    private router: Router
    ) {
    this.registrationForm = this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      regno: ['', [Validators.required, this.USNValidator]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registrationForm.invalid) {
      this.alertService.error('Fill in all the Details Correctly');
      return;
  }
    const result = Object.assign({}, this.registrationForm.value);
    console.log(result);
    this.registerService.registerUser(result)
      .then( () => {
        this.alertService.success('Registered Successfully');
        // Redirect after 2 seconds
        setTimeout(() => {
          this.router.navigate(['./']);
        }, 2000);
      }
      )
      .catch(err => {
        this.alertService.error('Error : ' + err);
      });
  }

  get f() {
    return this.registrationForm.controls;
  }

  // Validator
  USNValidator (control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && (control.value.length !== 12 )) {
        return { 'invalidUSN': true };
    }
    return null;
}

}
