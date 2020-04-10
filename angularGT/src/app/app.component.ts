import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service'
import { FormBuilder, FormGroup} from '@angular/forms';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public fbGroup: FormGroup;
  public nameFiles= new Array<any>();
  public content="";
  

  constructor(private apiS: ApiService, private fb: FormBuilder) {
    this.fbGroup = this.fb.group({
      nameFile1: "",
      nameFile2: "",
      nameFile3: "",
      url: ""
    })

  }

  ngOnInit() {
    this.getAllfiles();
  }



  getAllfiles() {
    this.apiS.getAllFilesS3().subscribe(data=>{
    if (data) { 
      data.files.forEach(element => {
        if (element) {
          if(element.LastModified=== ""){element.LastModified = "Sin Modificación"}
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

  getContentFile(value){
    this.apiS.getContentFile(value).subscribe(data=>{
      if(data){
        this.content = data.data;
      } 
    })
  }


  getDeleteFile(value){
 
    /*
    this.apiS.setDeleteFile(value).subscribe(data=>{
      if(data){

      }
    })
    */
  }





}


