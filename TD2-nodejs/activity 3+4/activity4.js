var _ = require('lodash');

let texte = 'C’est à une demi-heure d’ici. J’y suis dans dix minutes.';

var tab = _.split(texte,' ');

console.log(tab);