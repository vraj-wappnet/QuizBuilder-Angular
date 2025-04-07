import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CreateComponent } from './quiz/create/create.component';
import { QuizzesComponent } from './quiz/quizzes/quizzes.component';
import { PlayComponent } from './quiz/play/play.component';
import { ResultComponent } from './quiz/result/result.component';
import { QuizService } from './quiz/quiz.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    QuizzesComponent,
    PlayComponent,
    ResultComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [QuizService],
  bootstrap: [AppComponent],
})
export class AppModule {}
