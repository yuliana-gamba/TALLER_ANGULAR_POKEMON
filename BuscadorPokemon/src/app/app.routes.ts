import { Routes} from '@angular/router' 
import { RegistroUsuarioComponent} from './components/registro-usuario/registro-usuario.component';
import { BuscadorPokemonComponent} from './components/buscador-pokemon/buscador-pokemon.component';
import { Charmander } from './components/charmander/charmander.component';
import { Nidorina } from './components/nidorina/nidorina.component';
import { Paras } from './components/paras/paras.component';
import { Pikachu } from './components/pikachu/pikachu.component';
import { Raichu } from './components/raichu/raichu.component';
import { Vulpix } from './components/vulpix/vulpix.component';
import { PokemonDetalles } from './components/pokemon-detalles/pokemon-detalles.component';
import { PokemonLista } from './components/pokemon-lista/pokemon-lista.component';


export const routes: Routes = [
    { path: '', redirectTo: 'registro', pathMatch: 'full'},
    { path: 'registro', component: RegistroUsuarioComponent},
    { path: 'buscador', component: BuscadorPokemonComponent},
    { path: 'charmender', component: Charmander},
    { path: 'nidorina', component: Nidorina},
    { path: 'paras', component: Paras},
    { path: 'pikachu', component: Pikachu},
    { path: 'raichu', component: Raichu},
    { path: 'vulpix', component: Vulpix},
    { path: 'detalles', component: PokemonDetalles},
    { path: 'lista', component: PokemonLista},
    { path: '**', redirectTo: 'registro' }


];
