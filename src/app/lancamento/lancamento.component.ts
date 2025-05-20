import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CarDetails } from '../interfaces/lancamento';

const CAR_DATA: CarDetails[] = [
  { id: 'car1', nome: 'XL Cabine Simples 2.2 Diesel 4X4 MT 2022', preco: 183850, alturaCacamba: 511, alturaVeiculo: 1821, alturaSolo: 232, capacidadeCarga: 1234, motor: '2.2', potencia: 160, volumeCacamba: 1420, roda: 'Aço Estampado 16', image: 'XL Cabine.jpg', selected: false },
  { id: 'car2', nome: 'XLS 2.2 Diesel 4X4 AT 2022', preco: 220690, alturaCacamba: 511, alturaVeiculo: 1821, alturaSolo: 232, capacidadeCarga: 1076, motor: '2.2', potencia: 160, volumeCacamba: 1180, roda: 'Liga Leve 17', image: 'xls 2.2 diesel.jpg', selected: false },
  { id: 'car3', nome: 'Storm 3.2 Diesel 4X4 AT 2022', preco: 222790, alturaCacamba: 511, alturaVeiculo: 1821, alturaSolo: 232, capacidadeCarga: 1040, motor: '3.2', potencia: 200, volumeCacamba: 1180, roda: 'Liga Leve 17', image: 'storm.jpg', selected: false }
];

@Component({
  selector: 'app-lancamento',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {
  availableCars: CarDetails[] = [];
  carsToCompare: CarDetails[] = [];
  isCompareTableVisible: boolean = false;
  maxCompareLimit: number = 2;

  comparisonDetails: Array<{ label: string, key: keyof CarDetails, unit?: string }> = [
    { label: 'Modelo', key: 'nome' },
    { label: 'Altura da caçamba', key: 'alturaCacamba', unit: 'mm' },
    { label: 'Altura do veículo', key: 'alturaVeiculo', unit: 'mm' },
    { label: 'Altura livre do solo', key: 'alturaSolo', unit: 'mm' },
    { label: 'Capacidade de carga', key: 'capacidadeCarga', unit: 'Kg' },
    { label: 'Motor', key: 'motor' },
    { label: 'Potência', key: 'potencia', unit: 'cv' },
    { label: 'Volume de caçamba', key: 'volumeCacamba', unit: 'L' },
    { label: 'Roda', key: 'roda' },
    { label: 'Preço', key: 'preco', unit: 'R$' }
  ];

  ngOnInit(): void {
    this.availableCars = CAR_DATA.map(car => ({ ...car, selected: false }));
  }

  handleCarSelection(toggledCar: CarDetails): void {
    const selectedCarsCurrently = this.availableCars.filter(c => c.selected);

    if (toggledCar.selected && selectedCarsCurrently.length > this.maxCompareLimit) {
      alert(`Você só pode comparar até ${this.maxCompareLimit} carros.`);
      setTimeout(() => {
        toggledCar.selected = false;
        this.carsToCompare = this.availableCars.filter(c => c.selected);
      }, 0);
    } else {
      this.carsToCompare = selectedCarsCurrently;
    }
  }

  showComparison(): void {
    if (this.carsToCompare.length < this.maxCompareLimit) {
      alert(`Por favor, selecione ${this.maxCompareLimit} veículos para comparar.`);
      return;
    }
    this.isCompareTableVisible = true;
  }

  hideComparison(): void {
    this.isCompareTableVisible = false;
  }

  formatImageUrl(imageName: string | undefined): string {
    if (!imageName) return 'https://api-ford-enter.onrender.com/placeholder.png';
    return `https://api-ford-enter.onrender.com/img/${imageName}`;
  }

  formatPrice(price: number | undefined): string {
    if (price === undefined) return 'N/D';
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  getCarDetail(car: CarDetails | undefined, key: keyof CarDetails, unit?: string): string {
    if (!car || car[key] === undefined || car[key] === null) return 'N/D';
    let value = car[key];
    if (key === 'preco' && typeof value === 'number') {
      return this.formatPrice(value);
    }
    return `${value}${unit ? ' ' + unit : ''}`;
  }
}