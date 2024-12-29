export class PokemonList {
    results: { 
        name: string; 
        url: string }[];

    constructor(data: any) {
        this.results = data.results || [];
    }
}

export class ShowPokemon {
    id: number;
    name: string;
    image: string;
    types: string[];
    height: number;
    weight: number;
    stats: { name: string; value: number }[];
    sound: string;
    description: string;
    evolutionChain: { name: string; image: string; trigger: string | null; min_level: number | null }[]
  
    constructor(
      id: number,
      name: string,
      image: string,
      types: string[],
      height: number,
      weight: number,
      stats: { name: string; value: number }[],
      sound: string,
      description: string,
      evolutionChain: any
    ) {
      this.id = id;
      this.name = name;
      this.image = image;
      this.types = types;
      this.height = height;
      this.weight = weight;
      this.stats = stats;
      this.sound = sound;
      this.description = description;
      this.evolutionChain = evolutionChain;
    }
  }
  