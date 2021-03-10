export interface Link {
  description: string;
  orientation: 'column' | 'row';
  url: string;
  links: Link[];
}

export interface Page {
  description: string;
  orientation: 'column' | 'row';
  links: Link[];
}
