import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appResaltarPokemon]',
  standalone: true
})
export class ResaltarPokemon {
  private el = inject(ElementRef);

  colorBorde = input<string>('#FFFF00')

  @HostListener('mouseenter') onMouseEnter(){
    this.aplicarEfecto(`3px solid ${this.colorBorde()}`,`scale(1)`,`none`)
  
  @HostListener('mouseleave') onMouseLeave(){
    this.aplicarEfecto(`1px solid #e0e0e0`,`scale(1.03)`,`0 8px 16px rgba(0,0,0,0.15)`);
  
  aplicarEfecto(borde: string, escala: string, sombra:string){
    const elemento = this.el.nativeElement;
    elemento.style.border = borde;
    elemento.style.transform = escala;
    elemento.style.boxShadow = sombra;
    elemento.style.transform = 'all 0.25s ease-in-out'

  }
 
  
}