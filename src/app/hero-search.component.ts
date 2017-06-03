import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from './hero-search.service';
import { ArmeService } from './arme.service';
import { Hero } from './hero';
import {Arme} from "./arme";
import * as http from "selenium-webdriver/http";
import {forEach} from "@angular/router/src/utils/collection";



@Component({
  moduleId: module.id,
  selector: 'hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ],
  providers: [HeroSearchService],
})
export class HeroSearchComponent implements OnInit {
  heroes : Hero[];
  armes : Arme[];
  private searchTerms = new Subject<string>();
  private nom=null;
  private attaque=null;
  private defense=null;
  private esquive=null;
  private PV=null;
  private filtre=0;


  constructor(
    private heroSearchService: HeroSearchService,
    private armeService: ArmeService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);

  }

  /***
   * Fonction qui construit le terme à passer
   * dans la recherche API
   */
  Change():void{

    let term="";

    if(this.nom!=null && this.nom!=""){
      term += "name="+this.nom+"&";
    }
    if(this.attaque!=null){
      term += "attaque="+this.attaque+"&";
    }
    if(this.defense!=null){
      term += "defense="+this.defense+"&";
    }
    if(this.PV!=null){
      term += "PV="+this.PV+"&";
    }
    if(this.esquive!=null){
      term += "Esquive="+this.esquive+"&";
    }
    this.searchTerms.next(term);

  }

  ngOnInit(): void {
    this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.heroSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Hero[]>([])).subscribe(val =>this.heroes= val)
      ;

    this.getArmes();
  }

  /***
   * Récupère le nom de l'arme en fonction de son identifiant
   * @param id
   * @returns {string}
   */
  getNameArmes(id: number) : string{

    let armeName="";
    let arme= this.armes.find(x => x.id === id);

    if(arme!=null){
      armeName=arme.name;
    }else{
      armeName="Pas d'arme affectée à ce héros";
    }

    return armeName;
  }


  /***
   * Fonction qui tri la liste de héro en fonction d'un de ses paramètres
   */
  sortHeroesArray():void{

    switch (this.filtre.toString()){
      case "0":
        break;
      case "1" :

        this.heroes = this.heroes.sort(function (a,b) {

          return b.attaque-a.attaque;

        });

        break;
      case "2":
        this.heroes = this.heroes.sort(function (a,b) {

          return b.defense-a.defense;

        });

        break;
      case "3":
        this.heroes = this.heroes.sort(function (a,b) {

          return b.Esquive-a.Esquive;

        });

        break;
      case "4":
        this.heroes = this.heroes.sort(function (a,b) {

          return b.PV-a.PV;

        });

        break;

    }
  }


  /***
   * Récupération de toutes les armes
   */
  getArmes(): void {
    this.armeService.getArmes().then(armes => this.armes = armes);
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detailHero', hero.id];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
