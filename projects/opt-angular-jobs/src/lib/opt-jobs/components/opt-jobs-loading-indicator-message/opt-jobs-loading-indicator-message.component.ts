import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'opt-jobs-loading-indicator-message',
  styleUrls: ['./opt-jobs-loading-indicator-message.component.scss'],
  templateUrl: './opt-jobs-loading-indicator-message.component.html',
})
export class OptJobsLoadingIndicatorMessageComponent {

  @Input()
  loadError = false;

  @Input()
  loadErrorMessage = 'Erreur lors du chargement !';

  @Input()
  loading = false;

  @Input()
  loadingMessage = 'Chargement en cours...';

  @HostBinding('hidden')
  get hidden() {
    return !this.loading && !this.loadError;
  }

}
