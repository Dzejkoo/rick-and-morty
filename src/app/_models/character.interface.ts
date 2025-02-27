export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

interface Info {
  next: string | null;
  prev: string | null;
}

export interface CharacterGetResponse {
  info: Info;
  results: Character[];
}
