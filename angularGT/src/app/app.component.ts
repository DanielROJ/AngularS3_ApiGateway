import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


     

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public fbGroup: FormGroup;
  public nameFiles = new Array<any>();
  public content = "";
  private selectF = "";

  constructor(private apiS: ApiService, private fb: FormBuilder, private mat: MatSnackBar) {
    this.fbGroup = this.fb.group({
      nameFile: ["", Validators.required],
      url: ["", Validators.required]
    })

  }

  ngOnInit() {
    this.getAllfiles();
  }

    
   
  getAllfiles() {
    this.apiS.getAllFilesS3().subscribe(data => {
      if (data) {
        data.files.forEach(element => {
          if (element) {
            if (element.LastModified === "") { element.LastModified = "Sin Modificación" }
            let key = {
              key: element.Key,
              last: element.LastModified,
              size: element.Size
            }
            this.nameFiles.push(key)
          }
        }); 
      }
    })

  }

  getContentFile(value) {
    if (!value) {
      this.content = "";
      return;
    } else {
      this.apiS.getContentFile(value).subscribe(data => {
        if (data) {
          this.content = data.data;
          this.selectF = value;
        }    
      })
    }

  }


  getDeleteFile() {
    this.apiS.setDeleteFile(this.selectF).then(data => {
      if (data === undefined) {
        this.mat.open('ERROR, no se puede borrar', null, { duration: 4000 });
      } else {
        this.nameFiles = [];
        this.content = ""
        this.mat.open('Exito, el archivo se elimino', null, { duration: 4000 })  
        this.getAllfiles();
      }
    })
  }     

  getURLpage() {     
    let obj = this.fbGroup.value;

    this.apiS.setWebS3(obj.url, obj.nameFile).subscribe(data => {
      this.nameFiles = [];
      this.content = ""
      this.getAllfiles(); 
      this.fbGroup.reset({
        nameFile: ["", Validators.required],
        url: ["", Validators.required]
      }) 
    })
  }



}


