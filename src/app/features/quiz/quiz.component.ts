import { Component, OnInit, inject } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable, share, shareReplay } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent  implements OnInit  {
  private http = inject(HttpClient);
  questions$: Observable<any> =new Observable();

  allQuestions: any[] = [];
  currentIndex = 0;
  currentQuestion: any = '';
  counter:number = 0;   
  option1: any = '';
  option2: any = '';
  option3: any = '';
  option4: any = '';
  id:any = '';
  options: any = []; 
  rightAnswer: number = 0;
  panelsts: boolean = false;
  
  
  
  ngOnInit(): void {
    this.questions$ =this.http.get('assets/data/questions.json').pipe(
      share()
    );

    this.questions$.subscribe({
      next: (next: any) => {
        this.allQuestions = next
      },
      complete: () => {

        this.currentQuestion  = this.allQuestions[this.currentIndex].question;
        this.option1  = this.allQuestions[this.currentIndex].a;
        this.option2  = this.allQuestions[this.currentIndex].b;
        this.option3  = this.allQuestions[this.currentIndex].c;
        this.option4  = this.allQuestions[this.currentIndex].d;
        this.id  = this.allQuestions[this.currentIndex].id;

      }
      
    })  

  }


  nextQuestion() {     
    if(this.counter<= this.allQuestions.length){
      this.counter++;
    }
    this.currentIndex = this.counter;
    this.currentQuestion  = this.allQuestions[this.currentIndex].question;
    this.option1  = this.allQuestions[this.currentIndex].a;
    this.option2  = this.allQuestions[this.currentIndex].b;
    this.option3  = this.allQuestions[this.currentIndex].c;
    this.option4  = this.allQuestions[this.currentIndex].d;
    this.id  = this.allQuestions[this.currentIndex].id; 
 }

  prevQuestion() {
    this.counter--;    
    this.currentIndex = this.counter;
    this.currentQuestion  = this.allQuestions[this.currentIndex].question;
    this.option1  = this.allQuestions[this.currentIndex].a;
    this.option2  = this.allQuestions[this.currentIndex].b;
    this.option3  = this.allQuestions[this.currentIndex].c;
    this.option4  = this.allQuestions[this.currentIndex].d;
    this.id  = this.allQuestions[this.currentIndex].id; 
  }

  finish(){
    this.panelsts = true; 
    for(let i=0; i<this.allQuestions.length;i++){
        if(this.allQuestions[i].answer == this.options[i]){
            this.rightAnswer++;
        }
    }
  }

}
