import { Component, OnInit } from '@angular/core';
import { StudentService } from '../sevices/student.service';
import { Student } from '../model/student';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liststudent',
  templateUrl: './liststudent.component.html',
  styleUrls: ['./liststudent.component.css']
})
export class ListstudentComponent implements OnInit {

  studentsNew: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';

  constructor(private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(){
    this.studentService.getStudents().subscribe((students: Student[]) => {
      this.studentsNew = students;
      this.filteredStudents = students;  // Initialize filteredStudents with fetched data
    });
  }

  deleteStudent(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(() => {
          Swal.fire(
            'Deleted!',
            'Student has been deleted.',
            'success'
          );
          this.getStudent();  // Refresh the student list after deletion
        }, error => {
          Swal.fire(
            'Error!',
            'An error occurred while deleting the student.',
            'error'
          );
        });
      }
    });
  }

  filterStudents() {
    if (!this.searchQuery.trim()) {
      this.filteredStudents = this.studentsNew;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredStudents = this.studentsNew.filter(
        (student) =>
          student.first_name.toLowerCase().includes(query) ||
          student.last_name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    }
  }
}
