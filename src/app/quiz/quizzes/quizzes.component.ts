import { Component, OnInit } from '@angular/core';
import { Quiz } from '../models/quiz.model';
import { QuizService } from '../quiz.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css'],
  imports: [CommonModule, FormsModule],
})
export class QuizzesComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
  }

  createNewQuiz(): void {
    this.router.navigate(['/create']);
  }

  playQuiz(id: string): void {
    this.router.navigate(['/quiz', id]);
  }

  deleteQuiz(id: string): void {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.quizService.deleteQuiz(id);
      this.quizzes = this.quizService.getQuizzes();
    }
  }
}
