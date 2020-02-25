import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { OptJobExecutionFilters } from '../../models/opt-job-execution-filters.model';
import { OptJobExecution } from '../../models/opt-job-execution.model';
import { OptJob } from '../../models/opt-job.model';
import { OptJobsService } from '../../services/opt-jobs.service';
import { OptJobExecutionDetailsModalComponent } from '../opt-job-execution-details-modal/opt-job-execution-details-modal.component';

@Component({
  selector: 'opt-job-executions',
  styleUrls: ['./opt-job-executions.component.scss'],
  templateUrl: './opt-job-executions.component.html',
})
export class OptJobExecutionsComponent implements OnInit {

  private _job: OptJob;
  private readonly maxPages = 11;

  executionDetailsModalComponentRef: ComponentRef<OptJobExecutionDetailsModalComponent>;

  @ViewChild('executionDetailsModalViewRef', { read: ViewContainerRef })
  executionDetailsModalViewRef: ViewContainerRef;

  executions: OptJobExecution[] = [];
  filters = new OptJobExecutionFilters();
  loadError = false;
  loading = false;
  page = 0;

  @Output()
  stop = new EventEmitter<OptJobExecution>();

  totalPages = 0;
  totalItems = 0;
  queryCount = 0;
  visible = true;

  get job() {
    return this._job;
  }

  @Input()
  set job(job: OptJob) {
    this._job = job;
    this.refresh();
  }

  get pages() {
    const count = Math.min(this.totalPages, this.maxPages);
    const first = Math.min(
      Math.max(0, this.page - Math.floor(this.maxPages / 2)),
      Math.max(0, this.totalPages - this.maxPages)
    );
    return Array(count).fill(null).map((x, index) => first + index);
  }

  constructor(private componentFactoryResolver: ComponentFactoryResolver, @Inject(DOCUMENT) private document, private jobsService: OptJobsService) {
  }

  loadExecutions(page = 0) {
    this.executions = [];
    this.loadError = false;
    this.loading = true;
    this.page = page;
    this.jobsService.findAllJobExecutions(this.job, this.filters, page).pipe(
      catchError((error) => {
        this.loadError = true;
        return throwError(error);
      }),
      finalize(() => this.loading = false),
    ).subscribe((result) => {
      this.executions = result.items;
      this.page = result.page;
      this.totalPages = result.totalPages;
      this.totalItems = result.totalItems;
      this.queryCount = result.queryCount;
    });
  }

  ngOnInit() {
    this.refresh();
  }

  onClickExecutionDetails(execution) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(OptJobExecutionDetailsModalComponent);
    this.executionDetailsModalComponentRef = this.executionDetailsModalViewRef.createComponent(factory);
    this.executionDetailsModalComponentRef.instance.close = () => this.executionDetailsModalComponentRef.destroy();
    this.executionDetailsModalComponentRef.instance.execution = execution;
  }

  onClickPagination(event, page) {
    event.preventDefault();
    this.loadExecutions(page);
  }

  onClickStopButton(execution: OptJobExecution) {
    this.jobsService.stop(execution).subscribe(() => {
      this.refresh(execution);
      this.stop.emit(execution);
    });
  }

  onFiltersChange(filters: OptJobExecutionFilters) {
    this.filters = filters;
    this.loadExecutions();
  }

  refresh(execution?: OptJobExecution) {
    if (!this.job) {
      return;
    }
    if (execution) {
      this.jobsService.findJobExecution(execution.id).subscribe((item) => {
        const index = this.executions.indexOf(execution);
        if (index >= 0) {
          this.executions[index] = item;
        }
      });
    } else {
      this.loadExecutions();
    }
  }

  toggle() {
    this.visible = !this.visible;
  }

}
