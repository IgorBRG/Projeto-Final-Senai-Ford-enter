import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements AfterViewInit, OnDestroy {
  carouselArr = [
    { image: 'imagem_1.jpg', title: 'Esta é a nova Ranger Ford 2022. Verifique novidades.', url: '/lancamento' },
    { image: 'imagem_2.jpg', title: 'Ford a nossa história', url: '/lancamento' },
    { image: 'imagem_3.jpg', title: 'Nova Ford Bronco Sport 2022', url: '/lancamento' }
  ];
  currentIndex = 0;
  private intervalId: any;

  ngAfterViewInit(): void {
    this.updateCarousel();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  startAutoPlay(): void {
    this.clearAutoPlay();
    this.intervalId = setInterval(() => {
      this.advanceCarousel(true);
    }, 4000);
  }

  clearAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateCarousel(): void {
    if (this.carouselArr.length === 0) return;

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
  }

  private advanceCarousel(isAutoPlay: boolean = false): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.updateCarousel();
    if (!isAutoPlay) {
      this.startAutoPlay();
    }
  }

  nextItem(): void {
    this.advanceCarousel(false);
  }

  previousItem(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselArr.length) % this.carouselArr.length;
    this.updateCarousel();
    this.startAutoPlay();
  }
}