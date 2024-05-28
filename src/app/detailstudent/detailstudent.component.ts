import { Component, OnInit } from '@angular/core';
import { StudentService } from '../sevices/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detailstudent',
  templateUrl: './detailstudent.component.html',
  styleUrls: ['./detailstudent.component.css']
})
export class DetailstudentComponent implements OnInit {

  studentId: any;
  student: any
  


  constructor(private studentService: StudentService, private route: ActivatedRoute) { 
    this.studentId = this.route.snapshot.params['id'];
    

  }


  ngOnInit() {
    //  this.studentId = this.route.snapshot.params['id'];
    // console.log();
    
    this.studentService.getStudent(this.studentId).subscribe(student => {
      this.student = student;
    });
  }




}

