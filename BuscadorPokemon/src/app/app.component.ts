import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService, Pokemon } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="page">
      <section class="card">
        <header class="header">
          <h1 class="title">Pokédex</h1>
          <p class="subtitle">Escribe el nombre de un Pokémon y busca su imagen.</p>
        </header>

        <form class="search" (ngSubmit)="buscar()">
          <input
            class="input"
            type="text"
            name="pokemon"
            placeholder="Ej: ditto, pikachu, charizard"
            autocomplete="off"
            [(ngModel)]="query"
            [disabled]="loading()"
            aria-label="Nombre del Pokémon"
          />
          <button class="button" type="submit" [disabled]="loading()">
            {{ loading() ? 'Buscando...' : 'Buscar' }}
          </button>
        </form>

        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }

        @if (pokemon(); as p) {
          <article class="result">
            <div class="image-wrap">
              @if (p.image) {
                <img class="image" [src]="p.image" [alt]="'Imagen de ' + p.name" />
              } @else {
                <span class="no-image">Sin imagen disponible</span>
              }
            </div>
            <h2 class="name">{{ p.name }}</h2>
          </article>
        }
      </section>
    </main>
  `,
  styles: [
    `
      .page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
      }

      .card {
        width: 100%;
        max-width: 460px;
        background-color: var(--surface);
        border: 1px solid var(--border);
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 10px 30px rgba(28, 25, 23, 0.08);
      }

      .header {
        text-align: center;
        margin-bottom: 24px;
      }

      .title {
        margin: 0;
        font-size: 32px;
        font-weight: 700;
        color: var(--brand);
        letter-spacing: -0.5px;
      }

      .subtitle {
        margin: 8px 0 0;
        color: var(--muted);
        font-size: 15px;
      }

      .search {
        display: flex;
        gap: 8px;
      }

      .input {
        flex: 1;
        padding: 12px 14px;
        font-size: 15px;
        font-family: inherit;
        color: var(--ink);
        background-color: var(--bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        outline: none;
        transition: border-color 0.15s ease;
      }

      .input:focus {
        border-color: var(--brand);
      }

      .input:disabled {
        opacity: 0.6;
      }

      .button {
        padding: 12px 20px;
        font-size: 15px;
        font-weight: 600;
        font-family: inherit;
        color: #ffffff;
        background-color: var(--brand);
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }

      .button:hover:not(:disabled) {
        background-color: var(--brand-dark);
      }

      .button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .error {
        margin: 16px 0 0;
        padding: 12px 14px;
        color: var(--brand-dark);
        background-color: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 10px;
        font-size: 14px;
        text-align: center;
      }

      .result {
        margin-top: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }

      .image-wrap {
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bg);
        border: 1px solid var(--border);
        border-radius: 16px;
      }

      .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .no-image {
        color: var(--muted);
        font-size: 14px;
      }

      .name {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        text-transform: capitalize;
        color: var(--ink);
      }
    `,
  ],
})
export class AppComponent {
  private pokemonService = inject(PokemonService);

  query = 'ditto';
  loading = signal(false);
  error = signal<string | null>(null);
  pokemon = signal<Pokemon | null>(null);

  buscar(): void {
    const term = this.query.trim();
    if (!term) {
      this.error.set('Escribe el nombre de un Pokémon.');
      this.pokemon.set(null);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getPokemon(term).subscribe({
      next: (result) => {
        this.pokemon.set(result);
        this.loading.set(false);
      },
      error: () => {
        this.pokemon.set(null);
        this.error.set(`No se encontró ningún Pokémon con el nombre "${term}".`);
        this.loading.set(false);
      },
    });
  }
}
