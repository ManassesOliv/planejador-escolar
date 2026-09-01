
export interface Grade {
  month: string;
  score: number | null;
}

export interface Subject {
  id: string;
  name: string;
  grades: Grade[];
}

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}
