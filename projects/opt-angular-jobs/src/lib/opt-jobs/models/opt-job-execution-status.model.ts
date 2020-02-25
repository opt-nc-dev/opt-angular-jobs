export class OptJobExecutionStatus {

  static readonly values: OptJobExecutionStatus[] = [];

  static readonly ABANDONED = new OptJobExecutionStatus('ABANDONED', 'Abandonné', 'secondary', 'stop-circle');
  static readonly COMPLETED = new OptJobExecutionStatus('COMPLETED', 'Terminé', 'success', 'check');
  static readonly FAILED = new OptJobExecutionStatus('FAILED', 'Erreur', 'danger', 'exclamation-triangle');
  static readonly STARTED = new OptJobExecutionStatus('STARTED', 'Démarré', 'primary', 'play-circle');
  static readonly STARTING = new OptJobExecutionStatus('STARTING', 'Démarrage', 'primary', 'play-circle');
  static readonly STOPPED = new OptJobExecutionStatus('STOPPED', 'Arrêté', 'secondary', 'stop-circle');
  static readonly STOPPING = new OptJobExecutionStatus('STOPPING', 'Arrêt', 'secondary', 'stop-circle');
  static readonly UNKNOWN = new OptJobExecutionStatus('UNKNOWN', 'Inconnu', 'warning', 'question');

  static valueOf(name: string) {
    return this.values.find(etat => etat.name === name);
  }

  private constructor(public readonly name: string, public label: string, public readonly color: string, public icon: string) {
    OptJobExecutionStatus.values.push(this);
  }

}
