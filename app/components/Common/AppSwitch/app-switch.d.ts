interface TrackColor {
  true: string | undefined;
  false: string | undefined;
}

export interface Props extends AppSwitch {
  value: boolean;
  onChange: EventEmitter;
  trackColor?: TrackColor;
  thumbColor?: TrackColor;
  iosBackgroundColor?: string | undefined;
}
