import { Expose, Transform, Type } from 'class-transformer';
import { OptJobExecutionParameter } from './opt-job-execution-parameter.model';
import { OptJobExecutionStatus } from './opt-job-execution-status.model';

export class OptJobExecution {

  @Expose()
  @Type(() => Date)
  createTime: Date;

  @Expose()
  @Type(() => Date)
  endTime: Date;

  @Expose()
  exitCode: string;

  @Expose()
  id: number;

  @Expose()
  jobName: string;

  @Expose()
  @Type(() => OptJobExecutionParameter)
  parameters: OptJobExecutionParameter[] = [];

  @Expose()
  @Type(() => Date)
  startTime: Date;

  @Expose()
  @Transform((name) => OptJobExecutionStatus.valueOf(name) || OptJobExecutionStatus.UNKNOWN)
  status: OptJobExecutionStatus;

  get duration() {
    if (this.startTime && this.endTime) {
      return (this.endTime.getTime() - this.startTime.getTime()) / 1000;
    }
    return null;
  }

  get logsUrl() {
    return `/management/jobs/executions/${this.id}/logs`;
  }

  get stoppable() {
    return [OptJobExecutionStatus.STARTED, OptJobExecutionStatus.STARTING].indexOf(this.status) >= 0;
  }

}
