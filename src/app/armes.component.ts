import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Arme }                from './arme';
import { ArmeService }         from './arme.service';

@Component({
  moduleId: module.id,
  selector: 'my-armes',
  templateUrl: './armes.component.html',
  styleUrls: [ './armes.component.css' ]
})
export class ArmesComponent implements OnInit {
  armes: Arme[];
  selectedArme: Arme;

  constructor(
    private armeService: ArmeService,
    private router: Router) { }


  /***
   * Fait un appel au service pour récuperer toutes les armes
   * et initialiser le tableau de d'arme
   */
  getArmes(): void {
    this.armeService
      .getArmes()
      .then(arme => this.armes = arme);
  }

  /***
   * Fait un appel au service pour créer une nouvelle arme
   * et l'ajoute au tableau de d'arme
   * @param name
   */
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.armeService.create(name)
      .then(arme => {
        this.armes.push(arme);
        this.router.navigate(['/detailArme', arme.id]);
      });
  }

  /***
   * Fait un appel au service pour supprimer l'arme
   * @param arme
   */
  delete(arme: Arme): void {
    this.armeService
      .delete(arme.id)
      .then(() => {
        this.armes = this.armes.filter(h => h !== arme);
        if (this.selectedArme === arme) { this.selectedArme = null; }
      });
  }

  ngOnInit(): void {
    this.getArmes();
  }

  onSelect(arme: Arme): void {
    this.selectedArme = arme;
  }

  /***
   * Route pour accéder au detail de l'arme
   */
  gotoDetail(): void {
    this.router.navigate(['/detailArme', this.selectedArme.id]);
  }
}


/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
