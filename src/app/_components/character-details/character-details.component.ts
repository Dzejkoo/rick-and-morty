import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { AsyncPipe, Location } from '@angular/common';
import { Character } from '../../_models/character.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';
import { TemplateFuncPipe } from '../../_pipes/template-func.pipe';
import { CharacterDetailsService } from './character-details.service';

const UNKNOWN_STATUS = 'unknown';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
  imports: [AsyncPipe, TemplateFuncPipe],
  providers: [CharacterDetailsService],
})
export class CharacterDetailsComponent {
  private readonly _router = inject(Router);
  private readonly _location = inject(Location);
  private readonly _characterDetailsService = inject(CharacterDetailsService);
  readonly characterData$ = this._characterDetailsService.getCharacterData();
  readonly unknown = UNKNOWN_STATUS;

  back() {
    if (window.history.state?.navigationId > 2) {
      this._location.back();
    } else {
      this._router.navigate(['/']);
    }
  }

  getSpecies = (character: Character) =>
    character.species !== UNKNOWN_STATUS
      ? `${character.species}${character.type && character.type !== UNKNOWN_STATUS ? ' - ' + character.type : ''}`
      : '';
}
