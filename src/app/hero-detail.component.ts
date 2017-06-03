import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Hero }        from './hero';
import { HeroService } from './hero.service';
import { ArmeService } from './arme.service';
import {Arme} from "./arme";


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  armes : Arme[];
  arme : Arme;

  constructor(
    private heroService: HeroService,
    private armeService: ArmeService,
    private route: ActivatedRoute,
    private location: Location

  ) {}

  /***
   * initialise le hero et récupère toutes les armes
   */
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => {this.hero = hero,this.addNbClick(),this.getArmes()} );


  }

  /***
   * incrémente le nombre de clique du héro
   */
  addNbClick() : void{

    this.hero.nbClick+=1;
    this.heroService.update(this.hero);

  }




  /***
   * sauvegarde le héro
   */
  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());


    //Check if we have add a weapon to the hero
    if(this.hero.Arme!=null){

      //get the arme with the id
      this.armeService.getArme(this.hero.Arme).then(arme => this.arme = arme);
      //update the heroes tab in arme object
      this.arme.Heroes.push(this.hero.id);
      //save the arme
      this.armeService.update(this.arme);
    }
  }

  /***
   * Appel au service pour récupérer les armes
   */
  getArmes(): void {
    this.armeService.getArmes().then(armes => {this.armes = armes,this.initArme()});
  }

  initArme(): void{

    for(var i=0; i<this.armes.length;i++){
      if(this.armes[i].id==this.hero.Arme){
        this.arme=this.armes[i];
      }
    }
  }

  /***
   * Vérification de la validité du héro
   * et bloque la sauvegarde dans le cas contraire
   */
  Change(): void{
    var element = document.getElementById('alert');
    var save = document.getElementById('save');
    var hero=this.hero;
    if(hero.attaque+hero.defense+hero.Esquive+hero.PV >40 ){
        element.innerHTML='Vous avez atteint la limite de 40 points à ajouter veuillez enlever des points pour pouvoir enregistrer';
        save.style.display="none";
    }else{
      var reste=40-(hero.attaque+hero.defense+hero.Esquive+hero.PV);
      element.innerHTML='il vous reste '+ reste + ' points à ajouter';
      save.style.display="inline";
    }
  }

  goBack(): void {
    this.location.back();
  }
}

