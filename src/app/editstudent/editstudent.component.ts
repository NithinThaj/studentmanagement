import { Component, OnInit } from '@angular/core';
import { StudentService } from '../sevices/student.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {

  editForm: FormGroup;
  studentId!: number;
  emailTaken=false
  bln_emailcheck:boolean=false

  constructor(private fb: FormBuilder, private studentService: StudentService, private router: Router, private route: ActivatedRoute) {
    this.editForm = this.fb.group({
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
      subjects: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.studentId = +params['id']; 
      this.populateFormWithStudentDetails(this.studentId);
    });
  }
  
  checkEmail(email: string) {
    this.studentService.checkEmail(email).subscribe(response => {
      console.log(response);
      
      this.emailTaken = response.isTaken;
      if (this.emailTaken) {
        this.editForm.get('email')?.setErrors({ emailTaken: true });
      }
    });
  }
  checkDateFormat() {
    const dateOfBirthControl = this.editForm.get('date_of_birth');
    if (!dateOfBirthControl) return; // If null, exit the function
    
    const dateValue = dateOfBirthControl.value;
    const isValidFormat = this.isValidDateFormat(dateValue);
    
    if (dateOfBirthControl.errors?.['invalidDate']) {
      delete dateOfBirthControl.errors['invalidDate'];
      if (!Object.keys(dateOfBirthControl.errors || {}).length) {
        dateOfBirthControl.setErrors(null);
      }
    }
  
    if (isValidFormat) {
      dateOfBirthControl.setErrors(null);
    } else {
      dateOfBirthControl.setErrors({ 'invalidDate': true });
    }
  }


  populateFormWithStudentDetails(studentId: number) {
    this.studentService.getStudent(studentId).subscribe(
      (student:any) => {
        this.editForm.patchValue({
          first_name: student.first_name,
          last_name: student.last_name,
          date_of_birth: student.date_of_birth,
          email: student.email
        });
        this.editForm.get('address')?.patchValue({
          street: student.street,
          state: student.state,
          city: student.city,
          pincode: student.pincode
        });
        // this.editForm.get('subjects')?.setValue(student.subjects);
        this.editForm.get('subjects')?.setValue(student['subjects']);

      }
    );
  }
  
  isValidDateFormat(date: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date);
  }

  // onSubjectChange(event:any) {
  //   const subjects = this.editForm.get('subjects')?.value;
  //   if (event.target.checked) {
  //     subjects.push(event.target.value);
  //   } else {
  //     const index = subjects.indexOf(event.target.value);
  //     if (index > -1) {
  //       subjects.splice(index, 1);
  //     }
  //   }
  //   this.editForm.get('subjects')?.setValue(subjects);
  // }
  onSubjectChange(event: any) {
    const subjects = this.editForm.get('subjects')?.value;
    if (event.target.checked) {
      subjects.push(event.target.value);
    } else {
      const index = subjects.indexOf(event.target.value);
      if (index > -1) {
        subjects.splice(index, 1);
      }
    }
    this.editForm.get('subjects')?.setValue(subjects);
  }

  isSubjectSelected(subject: string): boolean {
    const selectedSubjects = this.editForm.get('subjects')?.value;
    return selectedSubjects.includes(subject);
  }

  // checkEmail(email: string) {
  //   this.studentService.checkEmail(email).subscribe(response => {
  //     this.emailTaken = response.isTaken;
  //     if (this.emailTaken) {
  //       this.editForm.get('email')?.setErrors({ emailTaken: true });
  //     }
  //   });
  // }

  
    
  

  onSubmit() {
    if (this.editForm.valid) {
      const email = this.editForm.value.email; // Get the email value from the form
      this.checkEmail(email); // Call the checkEmail method to perform validation
  
      // If the email is not taken (valid), proceed with form submission
      if (!this.emailTaken) {
        let updatedStudentDetails = {
          street: this.editForm.value.address.street,
          city: this.editForm.value.address.city,
          pincode: this.editForm.value.address.pincode,
          state: this.editForm.value.address.state,
          date_of_birth: this.editForm.value.date_of_birth,
          email: this.editForm.value.email,
          first_name: this.editForm.value.first_name,
          last_name: this.editForm.value.last_name,
          subjects: this.editForm.value.subjects
        };
  
        this.studentService.updateStudent(this.studentId, updatedStudentDetails).subscribe(
          response => {
            console.log('Student details updated successfully:', response);
            this.router.navigate(['']);
          },
          error => {
            console.error('Failed to update student details:', error);
          }
        );
      }
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}