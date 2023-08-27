import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule, NgFor, DatePipe} from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-quiz-page',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule, NgFor, MatIconModule, MatDividerModule, DatePipe, RouterLink,
  ],
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent {
  folders: any = [
    {
      name: 'Économie',
      link: 'economy',
    },
    {
      name: 'Régions',
      link: 'regions',
    }, {
      name: 'Divers',
      link: 'all',
    }
  ];
  
}
