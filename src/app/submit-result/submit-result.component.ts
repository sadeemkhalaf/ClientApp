import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-result',
  templateUrl: './submit-result.component.html',
  styleUrls: ['./submit-result.component.css']
})
export class SubmitResultComponent implements OnInit {

  @Output() closedCard = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  closeCard() {
    this.closedCard.emit(true);
  }
}
