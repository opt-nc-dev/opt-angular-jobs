import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { moment } from '../misc/opt-jobs-moment';
import { OptJobExecutionFilters } from '../models/opt-job-execution-filters.model';
import { OptJobExecutionStep } from '../models/opt-job-execution-step.model';
import { OptJobExecution } from '../models/opt-job-execution.model';
import { OptJob } from '../models/opt-job.model';

@Injectable()
export class OptJobsService {

  constructor(private httpClient: HttpClient) {
  }

  findAllJobExecutions(job: OptJob, filters: OptJobExecutionFilters, page = 0): Observable<{ items: OptJobExecution[], page: number, totalPages: number, totalItems: number, queryCount: number  }> {
    // Immutable since 5.0.0
    let params = new HttpParams();
    params = params.append('page', String(page))
    .append('size', String(5))
    .append('sort', 'createTime,desc');
    if (filters.beginDate) {
      params = params.append('executionBeginDate', moment(filters.beginDate).format('YYYY-MM-DDTHH:mm:ss'));
    }
    if (filters.endDate) {
      params = params.append('executionEndDate', moment(filters.endDate).format('YYYY-MM-DDTHH:mm:ss'));
    }
    if (filters.status) {
      params = params.append('status', filters.status.name);
    }
    return this.httpClient.get(`/management/jobs/${job.name}/executions`, { observe: 'response', params: params }).pipe(map((response: HttpResponse<OptJobExecution>) => {
      const json = response.body;
      return {
        items: plainToClass(OptJobExecution, json['content'], { strategy: 'excludeAll' }),
        page: json['number'],
        totalPages: json['totalPages'],
        totalItems: json['totalElements'],
        queryCount: json['numberOfElements']
      };
    }));
  }

  findAllJobExecutionSteps(execution: OptJobExecution): Observable<OptJobExecutionStep[]> {
    return this.httpClient.get(`/management/jobs/executions/${execution.id}/stepexecutions`).pipe(map((response: OptJobExecutionStep[]) => {
      return plainToClass(OptJobExecutionStep, response, { strategy: 'excludeAll' });
    }));
  }

  findAllJobs(req?: any): Observable<OptJob[]> {
    let options: HttpParams = new HttpParams();
    if (req) {
      options = options.set('jobName', req);
    }
    return this.httpClient.get('/management/jobs', { params: options}).pipe(map((response: OptJob[]) => {
      return plainToClass(OptJob, response, { strategy: 'excludeAll' }).sort((first, second) => {
        return first.name.toLowerCase().localeCompare(second.name.toLowerCase());
      });
    }));
  }

  findJob(name: string): Observable<OptJob> {
    return this.httpClient.get(`/management/jobs/${name}`).pipe(map((response) => {
      return plainToClass<OptJob, {}>(OptJob, response);
    }));
  }

  findJobExecution(id: number): Observable<OptJobExecution> {
    return this.httpClient.get(`/management/jobs/executions/${id}`).pipe(map((response) => {
      return plainToClass<OptJobExecution, {}>(OptJobExecution, response);
    }));
  }

  start(execution: OptJobExecution): Observable<OptJobExecution> {
    const data = execution.parameters.map((parameter) => ({
      name: parameter.name,
      value: parameter.value,
    }));
    return this.httpClient.post(`/management/jobs/${execution.jobName}/start`, data).pipe(map((response) => {
      return plainToClass<OptJobExecution, {}>(OptJobExecution, response);
    }));
  }

  stop(execution: OptJobExecution): Observable<boolean> {
    return this.httpClient.post(`/management/jobs/executions/${execution.id}/stop`, null).pipe(map((response) => {
      return true;
    }));
  }

}
