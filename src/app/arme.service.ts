import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Arme } from './arme';

@Injectable()
export class ArmeService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private armesUrl = 'api/armes';  // URL to web api

  constructor(private http: Http) { }

  /***
   * Fonction qui retourne toute la liste des armes
   * @returns {Promise<Arme[]>}
   */
  getArmes(): Promise<Arme[]> {
    return this.http.get(this.armesUrl)
      .toPromise()
      .then(response => response.json().data as Arme[])
      .catch(this.handleError);
  }


  /***
   * Retourne une arme en fonction de osn identifiant
   * @param id
   * @returns {Promise<Arme>}
   */
  getArme(id: number): Promise<Arme> {
    const url = `${this.armesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Arme)
      .catch(this.handleError);
  }

  /***
   * Supprime une arme dans l'api in memory en fonction de son idetifiant
   * @param id
   * @returns {Promise<Arme>}
   */
  delete(id: number): Promise<void> {
    const url = `${this.armesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  /***
   * Créer une arme avec son nom comme parametre
   * @param name
   * @returns {Promise<Arme>}
   */
  create(name: string): Promise<Arme> {
    return this.http
      .post(this.armesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  /***
   * Mise à jour d'une arme, passage de l'arme en parametre
   * @param arme
   * @returns {Promise<Arme>}
   */
  update(arme: Arme): Promise<Arme> {
    const url = `${this.armesUrl}/${arme.id}`;
    return this.http
      .put(url, JSON.stringify(arme), {headers: this.headers})
      .toPromise()
      .then(() => arme)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
