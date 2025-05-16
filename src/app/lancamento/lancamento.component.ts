import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

interface CarDetails {
  id: string;
  nome: string;
  preco: number;
  alturaCacamba: number;
  alturaVeiculo: number;
  alturaSolo: number;
  capacidadeCarga: number;
  motor: string;
  potencia: number;
  volumeCacamba: number;
  roda: string;
  image: string;
  selected?: boolean;
}

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

  handleCarSelection(car: CarDetails): void {
    const selectedCount = this.availableCars.filter(c => c.selected).length;

    if (car.selected) {
      if (selectedCount > this.maxCompareLimit) {
        alert(`Você só pode comparar até ${this.maxCompareLimit} carros.`);
        car.selected = false;
      }
    }
    this.carsToCompare = this.availableCars.filter(c => c.selected);
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
    if (!imageName) return 'http://localhost:4200/img/placeholder.png'; // Defina uma imagem placeholder se quiser
    return `http://localhost:4200/img/${imageName}`;
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