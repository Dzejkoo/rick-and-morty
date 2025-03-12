import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Character } from '../_models/character.interface';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private readonly _httpClient = inject(HttpClient);

  getCharacter(characterId: string) {
    return this._httpClient.get<Character>(
      `${environment.apiUrl}/character/${characterId}`,
    );
  }
}
