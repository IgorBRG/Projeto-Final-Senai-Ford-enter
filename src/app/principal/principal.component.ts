import { Component, AfterViewInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  imports: [RouterLink, CommonModule,HeaderComponent,FooterComponent],
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit {
  carouselArr = [
    {
      image: 'imagem_1.jpg',
      title: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
      url: '/lancamento'
    },
    {
      image: 'imagem_2.jpg',
      title: 'Ford a nossa história',
      url: '/lancamento'
    },
    {
      image: 'imagem_3.jpg',
      title: 'Nova Ford Bronco Sport 2022',
      url: '/lancamento'
    }
  ];

  currentIndex = 0;

  ngAfterViewInit(): void {
    this.updateCarousel();
    setInterval(() => this.updateCarousel(), 2000);
  }

  updateCarousel(): void {
    const carouselElement = document.getElementById('carousel');
    const titleElement = document.getElementById('carousel-title');

    if (carouselElement && titleElement) {
      const currentItem = this.carouselArr[this.currentIndex];

      carouselElement.innerHTML = `
        <a routerLink="${currentItem.url}">
          <img src="http://localhost:4200/img/${currentItem.image}" alt="${currentItem.title}" />
        </a>`;

      titleElement.innerHTML = `
        <a routerLink="${currentItem.url}">
          ${currentItem.title}
        </a>`;
    }

    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
  }
}
