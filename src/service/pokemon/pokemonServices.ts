import axios from 'axios';
import { Response } from "../types";
import { PokemonList, ShowPokemon } from "./types";
import { getResponse } from "../utils";
import { getEnvConfig } from "@/configs/UrlConfig";

export class PokemonServices {
  // Obtener lista de Pokémon con límite y desplazamiento
  async getPokemonList(limit: number, offset: number): Promise<Response<PokemonList>> {
    const url = `${getEnvConfig().apiURL}/pokemon?limit=${limit}&offset=${offset}`;
    return getResponse(url);
  }

  // Obtener detalles del Pokémon por URL
  async getPokemonDetails(url: string): Promise<ShowPokemon> {
    try {
      const response = await axios.get(url);
      const details = response.data;

      const speciesResponse = await axios.get(details.species.url);
      const speciesDetails = speciesResponse.data;

      const evolutionResponse = await axios.get(speciesDetails.evolution_chain.url);
      const evolutionDetails = evolutionResponse.data;

      return new ShowPokemon(
        details.id,
        details.name,
        details.sprites.other.dream_world.front_default,
        details.types.map((typeInfo: any) => typeInfo.type.name),
        details.height,
        details.weight,
        details.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
        details.cries.legacy,
        speciesDetails.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es'
        )?.flavor_text,
        evolutionDetails.chain
      );
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw error;
    }
  }

  async showPokemonId(id: number): Promise<ShowPokemon> {
    try {
      // Obtener detalles básicos del Pokémon
      const url = `${getEnvConfig().apiURL}/pokemon/${id}`;
      const response = await axios.get(url);
      const details = response.data;

      // Obtener detalles de la especie
      const speciesResponse = await axios.get(details.species.url);
      const speciesDetails = speciesResponse.data;

      // Obtener la cadena evolutiva
      const evolutionResponse = await axios.get(speciesDetails.evolution_chain.url);
      const evolutionDetails = evolutionResponse.data;

      // Procesar la cadena evolutiva
      const evolutionChain = this.extractEvolutionChain(evolutionDetails.chain);

      // Crear y retornar el objeto `ShowPokemon`
      return new ShowPokemon(
        details.id,
        details.name,
        details.sprites.other.dream_world.front_default,
        details.types.map((typeInfo: any) => typeInfo.type.name),
        details.height,
        details.weight,
        details.stats.map((stat: any) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        details.cries.legacy,
        speciesDetails.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'es'
        )?.flavor_text,
        evolutionChain
      );
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw error;
    }
  }

  // Método para extraer la cadena evolutiva
  private extractEvolutionChain(chain: any): { name: string; image: string; }[] {
    const evolutions: { name: string; image: string }[] = [];
    let current = chain;

    while (current) {
      const species = current.species;
      evolutions.push({
        name: species.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.getIdFromUrl(species.url)}.svg`
      });

      current = current.evolves_to?.[0] || null;
    }

    return evolutions;
  }

  private getIdFromUrl(url: string): number {
    const match = url.match(/\/pokemon-species\/(\d+)\//);
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    throw new Error(`Invalid URL format: ${url}`);
  }
}
