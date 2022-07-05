const FirstModule = require('./modules/FirstModule');
const SecondModule = require('./modules/secondModule');
// or
const { firstFunction, SecondFunction } = require('./modules/SecondModule');

FirstModule();

SecondModule.firstFunction();
SecondModule.SecondFunction();

firstFunction();
SecondFunction();
