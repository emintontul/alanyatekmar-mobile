export enum ToastType {
  success = 'success',
  warning = 'warning',
  error = 'error',
  info = 'info',
}

export enum LocalNotificationType {
  Instant,
  Schedule,
}

export enum RequestStatuses {
  'fatura_kontrol' = 0,
  'teklif_sureci' = 30,
  'finansman_asamasi' = 70,
  'basarili' = 71,
  'red' = 60 || 61,
}
