import { Component, Input } from '@angular/core';
import { OptJobExecutionStep } from '../../models/opt-job-execution-step.model';

@Component({
  selector: 'opt-job-execution-step',
  styleUrls: ['./opt-job-execution-step.component.scss'],
  templateUrl: './opt-job-execution-step.component.html',
})
export class OptJobExecutionStepComponent {

  @Input()
  step: OptJobExecutionStep;

}
