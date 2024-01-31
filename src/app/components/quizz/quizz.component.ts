import { Component, OnInit } from '@angular/core';
import {NgIf,NgFor} from "@angular/common"
import quizz_questions from "../../../assets/data/quizz_questions.json"
@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {
  title:string = "";
  questions:any;
  questionSelected:any;
  answers:string[] = [];
  answerSelected:string = "";
  questionIndex:number = 0;
  questionMaxIndex:number = 0;
  finished:boolean = false;

  constructor(){

  }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(alias:string){
    this.answers.push(alias);
    this.nextStep()
  }

  nextStep(){
    this.questionIndex+=1;
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex];
    }else{
      const finalAnswer:string = this.checkResult(this.answers); 
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  checkResult(answers:string[]){
    const result = answers.reduce((prev,current,i,arr)=>{
      if(arr.filter(item=>item === prev).length > arr.filter(item=>item === current).length){
        return prev;
      }else{
        return current;
      }
    })
    return result;
  }
}
