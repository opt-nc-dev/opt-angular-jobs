import { Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { OptJobExecutionParameter } from '../../models/opt-job-execution-parameter.model';
import { OptJobExecution } from '../../models/opt-job-execution.model';
import { OptJob } from '../../models/opt-job.model';
import { OptJobsService } from '../../services/opt-jobs.service';

@Component({
  selector: 'opt-job-execution-form',
  styleUrls: ['./opt-job-execution-form.component.scss'],
  templateUrl: './opt-job-execution-form.component.html',
})
export class OptJobExecutionFormComponent {

  private _job: OptJob;

  readonly dateTextMask = {
    keepCharPositions: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM:SS'),
  };

  execution = new OptJobExecution();
  loading = false;

  @Output()
  start = new EventEmitter<OptJobExecution>();

  visible = false;

  get job() {
    return this._job;
  }

  @Input()
  set job(job: OptJob) {
    this._job = job;
    this.clear();
  }

  get disabled() {
    return this.loading || !this.job || this.job.parameters.find((parameter) => parameter.invalid) !== undefined;
  }

  constructor(private jobsService: OptJobsService) {
  }

  clear() {
    this.execution = new OptJobExecution();
    if (this.job) {
      this.execution.jobName = this.job.name;
      this.job.parameters.forEach((parameter) => {
        this.execution.parameters.push(new OptJobExecutionParameter(parameter.name, parameter.type, parameter.defaultValue));
      });
    }
  }

  submit() {
    this.loading = true;
    this.jobsService.start(this.execution).pipe(
      finalize(() => this.loading = false))
      .subscribe((item) => {
        this.start.emit(item);
      });
    this.clear();
  }

  toggle() {
    this.visible = !this.visible;
  }
}
