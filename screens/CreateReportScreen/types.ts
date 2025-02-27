export type FormField =
  | 'name'
  | 'content'
  | 'itemsCount'
  | 'plantIds'
  | 'imageUrl'
  | 'location'
  | 'date';
export type FormErrors = { [key in FormField]?: string };
