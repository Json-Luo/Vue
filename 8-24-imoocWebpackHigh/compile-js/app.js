// es6  module
import sum from './sum';
// common js 适用于 node 服务端
var minus = require('./minus');

console.log('sum(14, 17) = ' + sum(14, 17));
console.log('minus(14 - 89) = ' + minus(14, 89));