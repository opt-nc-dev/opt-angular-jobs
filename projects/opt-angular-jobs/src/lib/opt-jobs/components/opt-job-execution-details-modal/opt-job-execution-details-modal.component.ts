import { Component, Input, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { OptJobExecutionStep } from '../../models/opt-job-execution-step.model';
import { OptJobExecution } from '../../models/opt-job-execution.model';
import { OptJobsService } from '../../services/opt-jobs.service';

@Component({
  selector: 'opt-job-execution-details-modal',
  styleUrls: ['./opt-job-execution-details-modal.component.scss'],
  templateUrl: './opt-job-execution-details-modal.component.html',
})
export class OptJobExecutionDetailsModalComponent implements OnInit {

  @Input()
  execution: OptJobExecution;

  loadError = false;
  loading = false;
  steps: OptJobExecutionStep[];

  constructor(private jobsService: OptJobsService) {
  }

  close() {
  }

  loadSteps() {
    this.loadError = false;
    this.loading = true;
    this.jobsService.findAllJobExecutionSteps(this.execution).pipe(
      catchError(error => {
        this.loadError = true;
        return throwError(error);
      }),
      finalize(() => this.loading = false),
    ).subscribe(steps => {
      this.steps = steps;
    });
  }

  ngOnInit() {
    this.loadSteps();
  }

  refresh() {
    this.loadSteps();
  }

}
