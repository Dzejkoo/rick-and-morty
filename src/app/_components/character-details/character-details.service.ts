import { inject, Injectable } from '@angular/core';
import { iif, of } from 'rxjs';
import { Character } from '../../_models/character.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../env/environment';

@Injectable()
export class CharacterDetailsService {
  private readonly _router = inject(Router);
  private readonly _activateRoute = inject(ActivatedRoute);
  private readonly _httpClient = inject(HttpClient);
  private readonly _characterId = this._activateRoute.snapshot.paramMap.get(
    'id',
  ) as string;
  private readonly _state = this._router.getCurrentNavigation()?.extras
    ?.state as Character;

  ngOnInit() {
    console.log(this._state);
  }

  getCharacterData() {
    return iif(
      () => !!this._state,
      of(this._state),
      this._getCharacter(this._characterId),
    );
  }

  private _getCharacter(characterId: string) {
    return this._httpClient.get<Character>(
      `${environment.apiUrl}/character/${characterId}`,
    );
  }
}
