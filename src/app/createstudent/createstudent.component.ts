import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentService } from '../sevices/student.service';
import { formatCurrency } from '@angular/common';
@Component({
  selector: 'app-createstudent',
  templateUrl: './createstudent.component.html',
  styleUrls: ['./createstudent.component.css']
})
export class CreatestudentComponent implements OnInit {
  registrationForm: FormGroup;
  states: any[] = [];
  cities: any[] = [];
  subjects = ['Math', 'Science', 'History'];
  emailTaken = false;

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router) {
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/)
      ]],
      address: this.fb.group({
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),
      subjects: [[], Validators.required],
      previousEducation: this.fb.array([])
    });
    // this.loadStates()
    this.cities = []

    // this.registrationForm.get('email')?.valueChanges.subscribe(value => {
    //   this.checkEmail(value);
    // });
  }

  ngOnInit() {
    // Subscribe to changes in the email input field
    // this.registrationForm.get('email')?.valueChanges.subscribe(value => {
    //   // Call the method to check email availability
    //   this.checkEmail(value);
    // });
  }

  get previousEducation(): FormArray {
    return this.registrationForm.get('previousEducation') as FormArray;
  }

  // addEducation() {
  //   this.previousEducation.push(this.fb.group({
  //     school: ['', Validators.required],
  //     yearStart: ['', Validators.required],
  //     yearEnd: ['', Validators.required]
  //   }));
  // }

  // removeEducation(index: number) {
  //   this.previousEducation.removeAt(index);
  // }
  // loadStates() {
  //   this.studentService.getStates().subscribe(data => {
  //     this.states = data;
  //   });
  // }

  // onStateChange(event: Event): void {
  //   const selectedState = parseInt((event.target as HTMLSelectElement).value, 10);
  //   if (!isNaN(selectedState)) {
  //     this.studentService.getCitiesByState(selectedState).subscribe(data => {
  //       this.cities = data;
  //     });
  //     this.registrationForm.get('address.city')?.reset();
  //   }
  // }

  onSubjectChange(event: any) {
    const subjects = this.registrationForm.get('subjects')?.value;
    if (event.target.checked) {
      subjects.push(event.target.value);
    } else {
      const index = subjects.indexOf(event.target.value);
      if (index > -1) {
        subjects.splice(index, 1);
      }
    }
    this.registrationForm.get('subjects')?.setValue(subjects);
  }

  checkEmail(email: string) {
    this.studentService.checkEmail(email).subscribe(response => {
      this.emailTaken = response.isTaken;
      if (this.emailTaken) {
        this.registrationForm.get('email')?.setErrors({ emailTaken: true });
      }
    });
  }
  onEmailKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      event.preventDefault(); // Prevent form submission on any key except Enter
    }
  }

  isValidDateFormat(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }
  markAllAsTouched() {
    this.registrationForm.markAllAsTouched();
  }

  onSubmit() {



    if (this.registrationForm.valid) {
      let form = {
        street: this.registrationForm.value.address.street,
        city: this.registrationForm.value.address.city,
        state: this.registrationForm.value.address.state,

        pincode: this.registrationForm.value.address.pincode,
        email: this.registrationForm.value.email,
        date_of_birth: this.registrationForm.value.date_of_birth,
        first_name: this.registrationForm.value.first_name,
        last_name: this.registrationForm.value.last_name,
        subjects: this.registrationForm.value.subjects,



      }

      this.studentService.registerStudent(form).subscribe(
        response => {
          Swal.fire('Success', 'Student registered successfully!', 'success');
          this.router.navigate(['']);
          this.registrationForm.reset();
          // while (this.previousEducation.length) {
          //   this.previousEducation.removeAt(0);
          // }
        },
        error => {
          Swal.fire('Error', 'Failed to register student!', 'error');
        }
      );
    } else {
      this.markAllAsTouched();
    }

  }
  resetEmailTaken(email: any) {
    this.checkEmail(email.value);
    this.emailTaken = false;
  }


}
