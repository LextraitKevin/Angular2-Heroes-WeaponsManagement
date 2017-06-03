import { Component, OnInit } from '@angular/core';

import { Hero }        from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => {this.heroes = heroes,this.ordernbClick()});

  }

  /***
   * Ordonne la tableau en fonction du nombre de click
   */
  ordernbClick():void{

    this.heroes = this.heroes.sort(function (a,b) {

      return b.nbClick-a.nbClick;

    });

    this.heroes=this.heroes.slice(0, 4);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
