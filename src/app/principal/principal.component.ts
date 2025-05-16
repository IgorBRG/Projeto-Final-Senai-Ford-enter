import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CarouselItem } from '../interfaces/carousel-item';


@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  animations: [
    trigger('fadeTransition', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PrincipalComponent implements OnInit, OnDestroy {
  carouselArr: CarouselItem[] = [
    { image: 'imagem_1.jpg', title: 'Esta é a nova Ranger Ford 2022. Verifique novidades.', url: '/lancamento' },
    { image: 'imagem_2.jpg', title: 'Ford a nossa história', url: '/lancamento' },
    { image: 'imagem_3.jpg', title: 'Nova Ford Bronco Sport 2022', url: '/lancamento' }
  ];
  currentIndex = 0;
  currentItem: CarouselItem | undefined;
  private intervalId: any;

  constructor() {}

  ngOnInit(): void {
    this.setCurrentItem();
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.clearAutoPlay();
  }

  setCurrentItem(): void {
    if (this.carouselArr.length > 0) {
      this.currentItem = this.carouselArr[this.currentIndex];
    }
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

  private advanceCarousel(isAutoPlay: boolean = false): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.setCurrentItem();
    if (!isAutoPlay) {
      this.startAutoPlay();
    }
  }

  nextItem(): void {
    this.advanceCarousel(false);
  }

  previousItem(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselArr.length) % this.carouselArr.length;
    this.setCurrentItem();
    this.startAutoPlay();
  }

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) return '';
    return `http://localhost:4200/img/${imageName}`;
  }
}