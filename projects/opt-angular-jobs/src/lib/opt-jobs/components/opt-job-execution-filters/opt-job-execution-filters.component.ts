import { Component, EventEmitter, Input, Output } from '@angular/core';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { moment } from '../../misc/opt-jobs-moment';
import { OptJobExecutionFilters } from '../../models/opt-job-execution-filters.model';
import { OptJobExecutionStatus } from '../../models/opt-job-execution-status.model';

@Component({
  selector: 'opt-job-execution-filters',
  styleUrls: ['./opt-job-execution-filters.component.scss'],
  templateUrl: './opt-job-execution-filters.component.html',
})
export class OptJobExecutionFiltersComponent {

  private _filters: OptJobExecutionFilters;

  beginDateInputValue: string;

  readonly dateTextMask = {
    keepCharPositions: true,
    mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
    pipe: createAutoCorrectedDatePipe('dd/mm/yyyy HH:MM:SS'),
  };

  endDateInputValue: string;

  @Output()
  filtersChange = new EventEmitter<OptJobExecutionFilters>();

  statuses = OptJobExecutionStatus.values;

  get filters() {
    return this._filters;
  }

  @Input()
  set filters(value: OptJobExecutionFilters) {
    this._filters = value;
    this.beginDateInputValue = this.dateInputValue(this.filters.beginDate);
    this.endDateInputValue = this.dateInputValue(this.filters.endDate);
  }

  private dateInputValue(date: Date) {
    return date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : null;
  }

  private parseDate(value: string) {
    const m = moment(value, 'DD/MM/YYYY HH:mm:ss', true);
    return m.isValid() ? m.toDate() : null;
  }

  onBeginDateChange(value: string) {
    const date = this.parseDate(value);
    if (date !== this.filters.beginDate) {
      this.filters.beginDate = date;
      this.filtersChange.emit(this.filters);
    }
  }

  onEndDateChange(value: string) {
    const date = this.parseDate(value);
    if (date !== this.filters.endDate) {
      this.filters.endDate = date;
      this.filtersChange.emit(this.filters);
    }
  }

  onStatusChange(status: OptJobExecutionStatus) {
    this.filters.status = status;
    this.filtersChange.emit(this.filters);
  }

}
