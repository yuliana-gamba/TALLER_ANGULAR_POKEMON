import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

export interface PokemonTarjeta {
  id: number;
  nombre: string;
  imagen: string;
  tipo: string;
  baseExperience: string;
  esFavorito?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonStorage {

  private http = inject(HttpClient);
  private readonly STORAGE_KEY = 'equipo_pokemon_registrado';
  misPokemons = signal<PokemonTarjeta[]>([]);

  constructor() {
    this.cargarDesdeStorage();
  }

  private cargarDesdeStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (data) {
      this.misPokemons.set(JSON.parse(data));
    }
  }

  buscarEnApi(nombreId: string) {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${nombreId}`);
  }

  guardarPokemon(nuevo: PokemonTarjeta){
    const actualizados = [...this.misPokemons(), nuevo];
    this.misPokemons.set(actualizados);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados))
  }


actualizarFavorito(id: number){
  const actualizados = this.misPokemons().map( poke => {
    if(poke.id === id){
      return { ...poke, esFavorito: !poke.esFavorito }

    }
    return poke;

  });

  this.misPokemons.set(actualizados);
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(actualizados));

 }

  liberarPokemon(id: number){
    const filtrado = this.misPokemons().filter( poke => poke.id !== id);

    this.misPokemons.set(filtrado);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtrado))


  }

  consultarPokemon(name: string) :Observable<any> {

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

    return this.http.get('${apiUrl}/${name.toLowerCase()}');
  }

}
