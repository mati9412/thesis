import { Component, Input } from '@angular/core';
import { LabTest } from 'src/app/interfaces/lab-test';

@Component({
  selector: 'app-test-tubes',
  templateUrl: './test-tubes.component.html',
  styleUrls: ['./test-tubes.component.css']
})
export class TestTubesComponent {
  @Input() tests: LabTest[] = [];


  checkExternal(testType: string){
    return this.tests.some((x) => x.type == testType && x.external == true);
   }
 
   checkType(testType: string){
     return this.tests.some((x) => x.type == testType);
   }
  

}
