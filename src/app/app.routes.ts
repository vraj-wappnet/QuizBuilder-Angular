// app.routes.ts
import { Routes } from '@angular/router';
import { CreateComponent } from './quiz/create/create.component';
import { QuizzesComponent } from './quiz/quizzes/quizzes.component';
import { PlayComponent } from './quiz/play/play.component';
import { ResultComponent } from './quiz/result/result.component';

export const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quiz/:id', component: PlayComponent },
  { path: 'result', component: ResultComponent },
  { path: '', redirectTo: '/quizzes', pathMatch: 'full' },
];
