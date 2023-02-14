export interface IEntry {
  image: null | string;
  date: null | string;
  caption: null | string;
  mood: null | string;
}

export interface IEntryComponent {
  entry?: string | null;
  cls?: string;
}
