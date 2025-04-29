export interface FormResponse {
  _id?: string;
  title: string | null;
  description: string | null;
  isPublished: boolean;
  publishedCount: number;
  hasSections: boolean;
  sections: {
    _id?: string;
    order: number | null;
    title: string | null;
    description: string | null;
  }[];
  message: string;
}
