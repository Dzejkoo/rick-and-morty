import { Info } from './info.interface';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface EpisodeGetResponse {
  info: Info;
  results: Episode[];
}

export interface Season {
  title: string;
  episodes: Episode[];
}
