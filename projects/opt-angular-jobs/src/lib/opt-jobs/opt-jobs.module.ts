import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TextMaskModule } from 'angular2-text-mask';
import { OptJobDetailsComponent } from './components/opt-job-details/opt-job-details.component';
import { OptJobExecutionDetailsModalComponent } from './components/opt-job-execution-details-modal/opt-job-execution-details-modal.component';
import { OptJobExecutionFiltersComponent } from './components/opt-job-execution-filters/opt-job-execution-filters.component';
import { OptJobExecutionFormComponent } from './components/opt-job-execution-form/opt-job-execution-form.component';
import { OptJobExecutionStepComponent } from './components/opt-job-execution-step/opt-job-execution-step.component';
import { OptJobExecutionsComponent } from './components/opt-job-executions/opt-job-executions.component';
import { OptJobsListComponent } from './components/opt-jobs-list/opt-jobs-list.component';
import { OptJobsLoadingIndicatorMessageComponent } from './components/opt-jobs-loading-indicator-message/opt-jobs-loading-indicator-message.component';
import { OptJobsComponent } from './components/opt-jobs/opt-jobs.component';
import './misc/opt-jobs-icons';
import { OptJobsDurationPipe } from './pipes/opt-jobs-duration.pipe';
import { OptJobsService } from './services/opt-jobs.service';

@NgModule({
  declarations: [
    OptJobDetailsComponent,
    OptJobExecutionDetailsModalComponent,
    OptJobExecutionFiltersComponent,
    OptJobExecutionFormComponent,
    OptJobExecutionsComponent,
    OptJobExecutionStepComponent,
    OptJobsComponent,
    OptJobsDurationPipe,
    OptJobsListComponent,
    OptJobsLoadingIndicatorMessageComponent,
  ],
  entryComponents: [
    OptJobExecutionDetailsModalComponent,
  ],
  exports: [
    OptJobsComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    TextMaskModule,
  ],
  providers: [
    OptJobsService,
  ],
})
export class OptJobsModule {
}
