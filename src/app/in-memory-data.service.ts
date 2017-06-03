import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, name: 'Mr. Nice', attaque: 10, defense:1,PV:1, Esquive:1, Arme:1, nbClick:0},
      {id: 12, name: 'Narco', attaque: 5, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 13, name: 'Bombasto', attaque: 3, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 14, name: 'Celeritas', attaque: 12, defense:2,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 15, name: 'Magneta', attaque: 20, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 16, name: 'RubberMan', attaque: 1, defense:1,PV:3, Esquive:1, Arme:null, nbClick:0},
      {id: 17, name: 'Dynama', attaque: 1, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 18, name: 'Dr IQ', attaque: 1, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 19, name: 'Magma', attaque: 2, defense:1,PV:1, Esquive:1, Arme:null, nbClick:0},
      {id: 20, name: 'Tornado', attaque: 1, defense:1,PV:1, Esquive:5, Arme:null, nbClick:0}
    ];
    let armes = [
      {id: 1, name: 'Sabre Laser', attaque: 4, defense:1,PV:-1, Esquive:-4},
      {id: 2, name: 'Masse', attaque: -1, defense:2,PV:-1, Esquive:-2},

    ];
    return {heroes, armes};
  }
}
