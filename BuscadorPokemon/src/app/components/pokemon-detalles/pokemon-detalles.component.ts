import { Component, OnInit, Inject, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PokemonStorage } from '../../services/pokemon-storge';


@Component({
  selector: 'app-pokemon-detalles',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-detalles.component.html',
  styleUrl: './pokemon-detalles.component.css'
})

export class PokemonDetalles implements OnInit{
  private route = inject(ActivatedRoute);
  private pokeService = inject(PokemonStorage);

  pokemonData:any = null;
  cargando: boolean = true;


  ngOnInit(): void {
    const pokeName = this.route.snapshot.params['name'];

    this.pokeService.consultarPokemon(pokeName).subscribe({
      next: (data) =>{
        this.pokemonData = data;
        this.cargando= false;

      },
      error: (err) => {
        console.error('se quemo esta vaina. No llego ningun dato.', err)
        this.cargando = false;
      }
    });
  }
}
