import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CarouselItem } from '../interfaces/carousel-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  animations: [
    trigger('fadeTransition', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
      ])
    ]),
    trigger('carouselImageTransition', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('600ms ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class PrincipalComponent implements OnInit, OnDestroy {
  carouselArr: CarouselItem[] = [
    {
      image: 'imagem_1.jpg',
      title: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
      url: '/lancamento',
      tooltipText: 'A Nova Ranger 2022 combina força, tecnologia e design sofisticado para enfrentar qualquer desafio, seja na cidade ou no campo.'
    },
    {
      image: 'imagem_2.jpg',
      title: 'Ford a nossa história',
      url: '/lancamento',
      tooltipText: 'Desde 1903, a Ford tem sido pioneira na indústria automotiva, transformando a maneira como o mundo se move com inovação e veículos icônicos.'
    },
    {
      image: 'imagem_3.jpg',
      title: 'Nova Ford Bronco Sport 2022',
      url: '/lancamento',
      tooltipText: 'Explore todos os terrenos com a versatilidade e o espírito aventureiro da Nova Ford Bronco Sport 2022.'
    }
  ];
  currentIndex = 0;
  currentItem: CarouselItem | undefined;
  private intervalId: any;

  isImageHovered = false;
  isTitleHovered = false;
  showTitleTooltip = false;

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

  startOrResumeAutoPlay(): void {
    if (!this.isImageHovered && !this.isTitleHovered) {
      this.clearAutoPlay();
      this.intervalId = setInterval(() => {
        this.advanceCarousel(true);
      }, 4000);
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
      this.startOrResumeAutoPlay();
    }
  }

  nextItem(): void {
    this.advanceCarousel(false);
  }

  previousItem(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselArr.length) % this.carouselArr.length;
    this.setCurrentItem();
    this.startOrResumeAutoPlay();
  }

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) return '';
    return `https://api-ford-enter.onrender.com/${imageName}`;
  }

  onImageEnter(): void {
    this.isImageHovered = true;
    this.clearAutoPlay();
  }

  onImageLeave(): void {
    this.isImageHovered = false;
    this.startOrResumeAutoPlay();
  }

  onTitleEnter(): void {
    this.isTitleHovered = true;
    this.showTitleTooltip = true;
    this.clearAutoPlay();
  }

  onTitleLeave(): void {
    this.isTitleHovered = false;
    this.showTitleTooltip = false;
    this.startOrResumeAutoPlay();
  }
}