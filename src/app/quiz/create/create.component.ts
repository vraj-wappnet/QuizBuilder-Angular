import { Component, OnInit } from '@angular/core';
import { Quiz, Question } from '../models/quiz.model';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CreateComponent implements OnInit {
  quiz: Quiz;

  constructor(private quizService: QuizService, private router: Router) {
    this.quiz = this.quizService.createNewQuiz();
  }

  ngOnInit(): void {}

  addQuestion(): void {
    this.quiz.questions.push(this.quizService.createNewQuestion());
  }

  removeQuestion(index: number): void {
    this.quiz.questions.splice(index, 1);
  }

  saveQuiz(): void {
    if (this.quiz.title.trim() && this.quiz.questions.length > 0) {
      this.quizService.saveQuiz(this.quiz);
      this.router.navigate(['/quizzes']);
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
