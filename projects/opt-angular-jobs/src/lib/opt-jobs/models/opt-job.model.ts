import { Expose, Transform, Type } from 'class-transformer';
import { OptJobExecutionParameter } from './opt-job-execution-parameter.model';
import { OptJobExecutionStatus } from './opt-job-execution-status.model';

export class OptJob {

  @Expose()
  description: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => OptJobExecutionParameter)
  parameters: OptJobExecutionParameter[] = [];

  @Expose()
  @Transform((value) => OptJobExecutionStatus.valueOf(value) || OptJobExecutionStatus.UNKNOWN)
  lastExecutionStatus: OptJobExecutionStatus;

}
