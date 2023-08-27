import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent) },
    { path: 'quiz', loadComponent: () => import('./features/quiz/quiz-page/quiz-page.component').then(c => c.QuizPageComponent) },
    { path: 'quiz/category/:id', loadComponent: () => import('./features/quiz/quiz.component').then(c => c.QuizComponent) },
    { path: '', redirectTo: '/', pathMatch: 'full' },
];
