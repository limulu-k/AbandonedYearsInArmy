const util = require('util'); 
const crypto = require('crypto'); 

function kk(a,b){
	console.log(a+b)
}
const dontUseMe = util.deprecate(kk, 'kk 함수는 deprecated되었으니 더 이상 사용하지 마세요!'); 
dontUseMe(1, 2); 
dontUseMe(1, 2); 
const randomBytesPromise = util.promisify(crypto.randomBytes); 
randomBytesPromise(64) 
  .then((buf) => { 
    console.log(buf.toString('base64')); 
  }) 
  .catch((error) => { 
    console.error(error); 
  });