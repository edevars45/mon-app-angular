import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing';
import { HousingLocation } from '../housinglocation';
// Étape 2 : Import des classes pour les formulaires réactifs
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  // Étape 2 : Ajout de ReactiveFormsModule dans les imports du composant
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  // Étape 3 : Mise à jour du template avec le balisage du formulaire
 template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
        alt="Photo extérieure de {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">À propos de ce logement</h2>
        <ul>
          <li>Unités disponibles : {{housingLocation?.availableUnits}}</li>
          <li>Wi-fi disponible : {{housingLocation?.wifi ? 'Oui' : 'Non'}}</li>
          <li>Laverie disponible : {{housingLocation?.laundry ? 'Oui' : 'Non'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Postulez maintenant pour y vivre</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">Prénom</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Nom</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">E-mail</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Postuler</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  // Étape 2 : Création de l'objet de formulaire (FormGroup)
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
  }

  // Étape 2 : Méthode pour gérer le clic sur "Apply now"
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }
}
