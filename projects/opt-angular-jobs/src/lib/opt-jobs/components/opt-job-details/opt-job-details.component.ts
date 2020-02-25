import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { OptJobExecution } from '../../models/opt-job-execution.model';
import { OptJob } from '../../models/opt-job.model';
import { OptJobExecutionsComponent } from '../opt-job-executions/opt-job-executions.component';

@Component({
  selector: 'opt-job-details',
  styleUrls: ['./opt-job-details.component.scss'],
  templateUrl: './opt-job-details.component.html',
})
export class OptJobDetailsComponent {

  @Output()
  executionChange = new EventEmitter<OptJobExecution>();

  @ViewChild(OptJobExecutionsComponent)
  executionsComponent: OptJobExecutionsComponent;

  @Input()
  job: OptJob;

  onStart(execution: OptJobExecution) {
    this.refresh();
    this.executionChange.emit(execution);
  }

  onStop(execution: OptJobExecution) {
    this.executionChange.emit(execution);
  }

  refresh() {
    if (this.executionsComponent) {
      this.executionsComponent.refresh();
    }
  }

}
