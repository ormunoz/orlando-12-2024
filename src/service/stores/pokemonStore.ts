import { defineStore } from 'pinia';

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: JSON.parse(localStorage.getItem('pokemons') || '[]'),
  }),
  actions: {
    addPokemon(pokemon: any) {
      if (this.pokemons.length < 6) {
        this.pokemons.push(pokemon);
        this.saveToLocalStorage();
      }
    },
    removePokemon(pokemonId: number) {
      this.pokemons = this.pokemons.filter((pokemon: any) => pokemon.id !== pokemonId);
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
    },
    loadFromLocalStorage() {
      const storedPokemons = JSON.parse(localStorage.getItem('pokemons') || '[]');
      this.pokemons = storedPokemons;
    },
  },
});
