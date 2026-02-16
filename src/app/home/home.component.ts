import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section class="search-section">
      <form (submit)="filterResults(filter.value); $event.preventDefault()">
        <input type="text" placeholder="Filtrer par ville" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Rechercher</button>
      </form>
    </section>

    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styles: [`
    .search-section {
      display: flex;
      justify-content: center;
      margin: 20px 0;
    }
    form {
      display: flex;
      width: 100%;
      justify-content: center;
    }
    input[type="text"] {
      border: solid 1px #bebebe;
      padding: 10px;
      border-radius: 8px;
      margin-right: 8px;
      width: 400px; /* Largeur fixe pour plus de clarté */
      outline: none;
    }
    input[type="text"]:focus {
      border-color: var(--primary-color);
    }
    .results {
      display: grid;
      column-gap: 20px;
      row-gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(400px, 400px));
      justify-content: center;
      margin-top: 30px;
    }
  `]
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}
