import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable, filter, mergeAll, share, tap } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSnackBarModule,

  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent  implements OnInit  {
  @Input('id') categoryId = '';

  private _http = inject(HttpClient);
  private _snackBar = inject(MatSnackBar); 
  questions$: Observable<any> =new Observable();

  allQuestions: any[] = [];
  currentIndex = 0;
  currentQuestion: any = '';
  currentAnswer: any = '';
  currentAnswerFull: any = '';
  counter: number = 0;   
  option1: any = '';
  option2: any = '';
  option3: any = '';
  option4: any = '';
  id: any = '';
  options: any = []; 
  rightAnswer: number = 0;
  panelsts: boolean = false;
  isFinish: boolean = false;
  canShowCorrectAnswer: boolean = false;
  

  ngOnInit(): void {

   
    this.questions$ =this._http.get<any[]>('assets/data/questions.json').pipe(
       mergeAll(),
     //  tap(val => console.log('BEFORE MAP', val)),
       filter((item: any) => item.category === this.categoryId),
     //  tap(val => console.log('AFTER MAP', val)),
       share(),
    );

    this.loadQuestions();

  }

  loadQuestions() {
    this.questions$.subscribe({
      next: (next: any) => {
        this.allQuestions.push(next) ;

        this.currentQuestion  = this.allQuestions[this.currentIndex].question;
        this.currentAnswer  = this.allQuestions[this.currentIndex].answer;
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
    this.currentAnswer  = this.allQuestions[this.currentIndex].answer;
    this.option1  = this.allQuestions[this.currentIndex].a;
    this.option2  = this.allQuestions[this.currentIndex].b;
    this.option3  = this.allQuestions[this.currentIndex].c;
    this.option4  = this.allQuestions[this.currentIndex].d;
    this.id  = this.allQuestions[this.currentIndex].id; 

    this.canShowCorrectAnswer = false;
  }

  prevQuestion() {
    this.counter--;    
    this.currentIndex = this.counter;
    this.currentQuestion  = this.allQuestions[this.currentIndex].question;
    this.currentAnswer  = this.allQuestions[this.currentIndex].answer;
    this.option1  = this.allQuestions[this.currentIndex].a;
    this.option2  = this.allQuestions[this.currentIndex].b;
    this.option3  = this.allQuestions[this.currentIndex].c;
    this.option4  = this.allQuestions[this.currentIndex].d;
    this.id  = this.allQuestions[this.currentIndex].id; 

    this.canShowCorrectAnswer = false;
  }

  finish() {
    this.panelsts = true; 
    for(let i=0; i< this.allQuestions.length; i++) {
      if(this.allQuestions[i].answer == this.options[i]) {
        this.rightAnswer++;
      }
    }

    const message = `Your Score is ${this.rightAnswer} out of ${this.allQuestions.length}`
    this._snackBar.open(message, '', { duration: 5000  });
    
    this.isFinish = true;
    this.canShowCorrectAnswer = false;
  }

  showCorrectAnswer() {
    this.canShowCorrectAnswer = true;
  }

  restart() {

    this.allQuestions= [];
    this.currentIndex = 0;
    this.currentQuestion = '';
    this.currentAnswer = '';
    this.currentAnswerFull = '';
    this.counter = 0;   
    this.option1 = '';
    this.option2 = '';
    this.option3 = '';
    this.option4 = '';
    this.id = '';
    this.options = []; 
    this.rightAnswer = 0;
    this.panelsts = false;
    this.isFinish = false;
    this.canShowCorrectAnswer = false;

    this.loadQuestions();
  }

}
