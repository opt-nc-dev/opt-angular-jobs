import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { OptJob } from '../../models/opt-job.model';
import { OptJobsService } from '../../services/opt-jobs.service';

@Component({
  selector: 'opt-jobs-list',
  styleUrls: ['./opt-jobs-list.component.scss'],
  templateUrl: './opt-jobs-list.component.html',
})
export class OptJobsListComponent implements OnInit {

  jobs: OptJob[];
  loadError = false;
  loading = false;
  selected: OptJob;

  @Output()
  select = new EventEmitter<OptJob>();

  constructor(private jobsService: OptJobsService) {
  }

  ngOnInit() {
    this.refreshAllJob(true);
  }

  onSelect(event, job: OptJob) {
    event.preventDefault();
    if (job === this.selected) {
      return;
    }
    this.selected = job;
    this.select.emit(job);
  }

  refreshAllJob(chargeDetail: boolean, query?: string) {
    const previousJobName = chargeDetail ? (this.selected ? this.selected.name : null) : null;
    this.selected = null;
    this.jobs = null;
    this.loadError = false;
    this.loading = true;
    this.jobsService.findAllJobs(query).pipe(
      catchError((error) => {
        this.loadError = true;
        return observableThrowError(error);
      }),
      finalize(() => this.loading = false), )
      .subscribe((jobs) => {
        this.jobs = jobs;
        if (previousJobName) {
          this.selected = this.jobs.find((job) => job.name === previousJobName);
        }
      });
  }

  refreshByJob(jobName: string) {
      this.jobsService.findJob(jobName).subscribe((job) => {
        if (this.selected.name === job.name) {
          this.selected = job;
        }
        const index = this.jobs.map((item) => item.name).indexOf(jobName);
        if (index >= 0) {
          this.jobs[index] = job;
        }
      });
  }

}
