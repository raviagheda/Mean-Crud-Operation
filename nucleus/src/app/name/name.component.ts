import { Component, OnInit } from '@angular/core';
import { NameService } from '../shared/name.service';
import { Name } from '../shared/name.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css'],
  providers : [NameService],
})
export class NameComponent implements OnInit {

  constructor(public nameService:NameService) { }
  ngOnInit(): void {
    this.nameService.currentName= {
      _id: "",
      name: "",
    };
    this.refreshName();
  }

  onSave(form: NgForm){

    var doc:Name = {name: form.value.name, _id: form.value.id};

    if(form.value.id == "" || form.value.id == null){
      this.nameService.insertName(doc).subscribe((res)=>{
      this.refreshName();
      form.resetForm();
    });
    }

    else{
      this.nameService.updateName(doc).subscribe((res)=>{
        this.refreshName();
        form.resetForm();
      });
    }
  }

  refreshName(){
    this.nameService.getName().subscribe((res)=>{
      this.nameService.names = res as Name[];
    });
  }

  onRemove(name:Name){
    var id = name._id;
    this.nameService.removeName(id).subscribe((res)=>{
      this.refreshName();
    });
  }

  onUpdate(name:Name){
    this.nameService.currentName = {name: name.name, _id: name._id};
  }

}
