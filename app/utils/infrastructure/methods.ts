export interface HorizontalStepperMethods {
  next: () => void;
  reset: () => void;
  set: (value: number) => void;
  getCurrent: () => number;
}
