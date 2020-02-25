import { Component, Input, ViewChild } from '@angular/core';
import { OptJobExecution } from '../../models/opt-job-execution.model';
import { OptJob } from '../../models/opt-job.model';
import { OptJobDetailsComponent } from '../opt-job-details/opt-job-details.component';
import { OptJobsListComponent } from '../opt-jobs-list/opt-jobs-list.component';

@Component({
  selector: 'opt-jobs',
  styleUrls: ['./opt-jobs.component.scss'],
  templateUrl: './opt-jobs.component.html',
})
export class OptJobsComponent {

  job: OptJob;

  @ViewChild(OptJobDetailsComponent)
  jobDetailsComponent: OptJobDetailsComponent;

  @ViewChild(OptJobsListComponent)
  jobsListComponent: OptJobsListComponent;

  currentSearch: string;

  onExecutionChange(execution: OptJobExecution) {
    this.jobsListComponent.refreshByJob(execution.jobName);
  }

  onSelect(job: OptJob) {
    this.job = job;
  }

  clearSearch() {
    this.currentSearch = null;
    this.search();
  }

  search(query?: string) {
    this.job = null;
    this.jobDetailsComponent.refresh();
    this.jobsListComponent.refreshAllJob(false, query);
  }

}
