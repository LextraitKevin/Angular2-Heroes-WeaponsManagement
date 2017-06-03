import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Arme }        from './arme';
import { ArmeService } from './arme.service';
import { HeroService } from './hero.service';
import {Hero} from "./hero";
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'my-arme-detail',
  templateUrl: './arme-detail.component.html',
  styleUrls: [ './arme-detail.component.css' ]
})
export class ArmeDetailComponent implements OnInit {
  arme: Arme;
  heroes : Hero[];
  id: number;

  constructor(
    private armeService: ArmeService,
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.armeService.getArme(+params['id']))
      .subscribe(arme => {this.arme = arme,this.getHeroes()});

  }

  /***
   * Fait un appel au service pour sauvegarder l'arme
   * Puis retourne sur l'url précédente
   */
  save(): void {
    this.armeService.update(this.arme)
      .then(() => this.goBack());
  }

  /***
   * Récupère tous les heroes qui sont associés
   * à cette arme en fonction de l'identifiant
   */
  getHeroes(): void {
    this.heroService.getHeroesArme(this.arme.id).then(heroes => this.heroes = heroes);
  }

  /***
   * Permet de valider la mise à jour de l'arme
   * Si ce n'est pas le cas on cache le bouton de sauvegarde
   */
  Change(): void{
    var element = document.getElementById('alert');
    var save = document.getElementById('save');
    var arme=this.arme;
    var tot=arme.attaque+arme.defense+arme.Esquive+arme.PV;
    if( tot >0 ){
      element.innerHTML='La somme des caractéristiques doit être égale à 0 <br> Merci de retirer '+ tot +' points de caractéristiques';
      save.style.display="none";
    }else if(tot<0) {
      element.innerHTML='La somme des caractéristiques doit être égale à 0 <br> Merci d\'ajouter '+ Math.abs(tot) +' points de caractéristiques';
      save.style.display="none";
    }else{

        element.innerHTML='Somme des caractéristiques à 0<br>Vous pouvez valider cette arme';
        save.style.display="inline";

    }
  }

  goBack(): void {
    this.location.back();
  }
}

