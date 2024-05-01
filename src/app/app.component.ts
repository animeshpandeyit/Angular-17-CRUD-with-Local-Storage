import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;

  studentObj: StudentModel = new StudentModel();

  studentList: StudentModel[] = [];
  // condition: boolean = true;
  // expression: boolean = false;
  constructor() {}
  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');

    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    // var myModal = document.getElementById('myModal');
    // if (myModal != null) {
    //   myModal.style.display = 'block';
    // }
    if (this.model != null) {
      this.model.nativeElement.style.display = 'block';
    }
  }

  closeModel() {
    this.studentObj = new StudentModel();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    const isLocalPresent = localStorage.getItem('angular17crud');

    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj._id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArray = [];
      newArray.push(this.studentObj);
      this.studentObj._id = 1;
      this.studentList = newArray;
      localStorage.setItem('angular17crud', JSON.stringify(newArray));
    }
    this.closeModel();
  }

  updateStud() {
    const currentrecord = this.studentList.find(
      (i) => i._id === this.studentObj._id
    );

    if (currentrecord != undefined) {
      currentrecord.name = this.studentObj.name;
      currentrecord.city = this.studentObj.city;
      currentrecord.state = this.studentObj.state;
      currentrecord.pincode = this.studentObj.pincode;
      currentrecord.address = this.studentObj.address;
      currentrecord.mobileNumber = this.studentObj.mobileNumber;
      currentrecord.email = this.studentObj.email;
    }
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  /**
   * The `onEdit` function in TypeScript sets the `studentObj` property to the provided `item` and then
   * calls the `openModel` function.
   * @param {StudentModel} item - The `item` parameter in the `onEdit` function is of type
   * `StudentModel`. It is used to pass a student object to the function for editing purposes.
   */
  onEdit(item: StudentModel) {
    this.studentObj = item;
    // if (this.model != null) {
    //   this.model.nativeElement.style.display = 'block';
    // }
    this.openModel();
  }

  onDelete(item: StudentModel) {
    const isDelete = confirm('Are you sure you want to delete this');

    if (isDelete) {
      const currentrecord = this.studentList.findIndex(
        (item) => item._id === this.studentObj._id
      );
      this.studentList.splice(currentrecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
}

export class StudentModel {
  _id: number;
  name: string;
  mobileNumber: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  constructor() {
    this._id = 0;
    this.name = '';
    this.mobileNumber = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}

// export class StudentModel {
//   name: string;

//   constructor(name: string, mobileNumber: any, email: any, city: any, state: any, pincode: any, address: any) {
//     this.name = name;
//     this.mobileNumber = mobileNumber;
//     this.email = email;
//     this.city = city;
//     this.state = state;
//     this.pincode = pincode;
//     this.address = address;
//   }
// }
