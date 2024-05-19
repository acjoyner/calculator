import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'calculator';
  calValue: number = 0;
  funcT: any = 'noFunction';
  firstNumber: number = 0;
  secondNumber: number = 0;

  calNumber: string = 'noValue';

  onClickValue(val: string, type: any) {
    if (type === 'number') {
      this.onNumberClick(val);
    } else if (type === 'function') {
      this.onFunctionClick(val);
    }
  }
  onFunctionClick(val: string) {
    if (val === 'c') {
      this.clearAll();
    } else if (this.funcT === 'noFunction') {
      this.firstNumber = this.calValue;
      this.calValue = 0;
      this.calNumber = 'noValue';
      this.funcT = val;
    } else if (this.funcT != 'noFunction') {
      this.secondNumber = this.calValue;
      // Lets calculate
      this.valueCalculate(val);
    }
  }
  valueCalculate(val: string) {
    if (this.funcT === '+') {
      const total = this.firstNumber + this.secondNumber;
      this.totalAssignValues(total, val);
    }
    if (this.funcT === '-') {
      const total = this.firstNumber - this.secondNumber;
      this.totalAssignValues(total, val);
    }
    if (this.funcT === '*') {
      const total = this.firstNumber * this.secondNumber;
      this.totalAssignValues(total, val);
    }
    if (this.funcT === '/') {
      const total = this.firstNumber / this.secondNumber;
      this.totalAssignValues(total, val);
    }
    if (this.funcT === '%') {
      const total = this.firstNumber % this.secondNumber;
      this.totalAssignValues(total, val);
    }
  }
  totalAssignValues(total: number, val: string) {
    this.calValue = total;
    this.firstNumber = total;
    this.secondNumber = 0;
    this.calNumber = 'noValue';
    this.funcT = val;
    if (val === '=') this.onEqualPress();
  }

  onEqualPress() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.funcT = 'noFunction';
    this.calNumber = 'noValue';
  }

  onNumberClick(val: string) {
    if (this.calNumber != 'noValue') {
      this.calNumber = this.calNumber + val;
    } else {
      this.calNumber = val;
    }
    this.calValue = parseFloat(this.calNumber);
  }

  clearAll() {
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.calValue = 0;
    this.funcT = 'noFunction';
    this.calNumber = 'noValue';
  }
}
