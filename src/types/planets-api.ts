export interface IPlanetsAPI {
  count: number;
  next: string | null;
  previous: string | null;
  results: Record<string, string>[];
}
