// NODE
const fs = require('fs')

// Terceros (npm install X)
const _ = require('lodash');

// Locales
const { createArray } = require('./modulo')

const shuffledArray = _.shuffle(createArray());
console.log(shuffledArray);
