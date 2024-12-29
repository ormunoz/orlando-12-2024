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
        evolutionDetails.chain 
      );
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw error;
    }
  }
}
