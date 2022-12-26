​	





#### require

```js
console.log('require가 가장 위에 오지 않아도 됩니다.');
module.exports = '저를 찾아보세요.';
require('./var');
console.log('require.cache입니다.');
console.log(require.cache);
console.log('require.main입니다.');
console.log(require.main === module);
console.log(require.main.filename);
```

```
node require
require가 가장 위에 오지 않아도 됩니다.
require.cache입니다.
[Object: null prototype] {
  'C:\\Users\\zerocho\\require.js': Module {
    id: '.',
    exports: '저를 찾아보세요.',
    parent: null,
    filename: 'C:\\Users\\zerocho\\require.js',
    loaded: false,
    children: [ [Module] ],
    paths: [
      'C:\\Users\\zerocho\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  'C:\\Users\\zerocho\\var.js': Module {
    id: 'C:\\Users\\zerocho\\var.js',
    exports: { odd: '홀수입니다', even: '짝수입니다' },
    parent: Module {
      id: '.',
      exports: '저를 찾아보세요.',
      parent: null,
      filename: 'C:\\Users\\zerocho\\require.js',
      loaded: false,
      children: [Array],
      paths: [Array]
    },
    filename: 'C:\\Users\\zerocho\\var.js',
    loaded: true,
    children: [],
    paths: [
      'C:\\Users\\zerocho\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  }
}
require.main입니다.
true
```



##### 분석

- require가 반드시 파일 최상단에 위치할 필요가 없음

- module.exports도 최하단에 위치할 필요가 없음

- require.cache 객체에 참조되는 파일 이름들이 속성명으로 들어있음

  => 다음번에 require 할때는 require.cache에서 불러옴

  => 새로 require 하기 위해서는 기존 require.cache 를 제거(프로그램이 꼬일수 있어 권장X)

- require.main은 실행시 첫 모듈을 가리킴

- require.main.filename을 통해 이름을 알 수 있음



<span style="color:red;">주의</span>

A -> B, B -> A 형식의 **순환 참조(circular dependency)**가 발생할 시

해당 객체들을 빈 객체로 표시함



----------------



#### process.env

 노드의 시스템 환경변수



| 환경변수           | 기본값                   | 설명                                                         |
| :----------------- | ------------------------ | ------------------------------------------------------------ |
| UV_THREADPOOL_SIZE | 8                        | 스레드풀의 스래드 개수                                       |
| NODE_OPTIONS       | -max-old-space-size=8192 | 노드를 실행할 때의 옵션들을 입력받는 환경 변수, 여러 옵션 존재함<br>(노드의 메모리를 8GB까지 사용) |



#### process.nextTick(콜백)

이벤트 루프가 다른 콜백함수들보다 nextTick의 콜백함수를 우선처리하게 만듬

```js
setImmediate(() => {console.log('immediate');});
process.nextTick(() => {console.log('nextTick');});
setTimeout(() => {console.log('timeout');}, 0);
Promise.resolve().then(() => console.log('promise'));
```

```
nextTick
promise
timeout
immediate
```



nextTick -> promise -> setTimeout -> setImmediate 순으로 실행

앞의 두개(nextTick, promise)를 마이크로태스크(microtask)라고도 부름

<div style = "width:500px; height:500px;"><image src="https://thebook.io/img/080229/111.jpg"></div>



#### process.exit()

말 그대로 강제종료 명령

| 코드 | 의미        |
| ---- | ----------- |
| 0    | 정상 종료   |
| 1    | 비정상 종료 |



#### process

| 객체       | 기본값                          | 속성                              |
| ---------- | ------------------------------- | --------------------------------- |
| version    | v16.17.1                        | 설치된 노드 버전                  |
| arch       | x64                             | 프로세스 아키텍쳐 정보            |
| platform   | linux                           | 운영체제 os                       |
| pid        | 943                             | 현 프로세스의 아이디              |
| uptime()   | 1093                            | 프로세스가 시작된 후 흐른 시간(s) |
| execPath   | '/usr/bin/node'                 | 노드의 경로                       |
| cwd()      | '/workspace/node_tutorial'      | 현 프로세스의 실행 위치           |
| cpuUsage() | { user: 400000, system: 80000 } | 현재 cpu 사용량                   |



-------------------------



### 노드 내장 모듈 사용

####  os

웹 브라우저에 사용되는 자바스크립트는 운영체제의 정보를 가져올 수 없음

그러나 노드는 os 모듈에 정보가 담겨 있어 정보를 가져올 수 있음

```js
const os = require('os');

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch());			/process.arch와 동일
console.log('os.platform():', os.platform());	/process.platform과 동일
console.log('os.type():', os.type());			/운영체제의 종류
console.log('os.uptime():', os.uptime());		/os 부팅 이후 흐른 시간(s)
console.log('os.hostname():', os.hostname());	/컴퓨터의 이름
console.log('os.release():', os.release());		/운영체제의 버전

console.log('경로------------------------------------------');
console.log('os.homedir():', os.homedir());		/홈 디렉터리 경로
console.log('os.tmpdir():', os.tmpdir());		/임시 파일 저장 경로

console.log('cpu 정보--------------------------------------');
console.log('os.cpus():', os.cpus());			/컴퓨터의 코어 정보
console.log('os.cpus().length:', os.cpus().length);/컴퓨터의 코어 갯수

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem());		/사용 가능한 메모리(RAM)
console.log('os.totalmem():', os.totalmem());	/전체 메모리 용량

console.log('오류 관련 정보--------------------------------');
console.log('os.constants: ', os.constants);	/프로그램 오류 코드
```



#### path

- 윈도우 : \로 구분
- POSIX : /로 구분

```js
const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('------------------------------');
console.log('path.dirname():', path.dirname(string));
console.log('path.extname():', path.extname(string));
console.log('path.basename():', path.basename(string));
console.log('path.basename - extname:', path.basename(string, path.extname(string)));
console.log('------------------------------');
console.log('path.parse()', path.parse(string));
console.log('path.format():', path.format({
  dir: 'C:\\users\\zerocho',
  name: 'path',
  ext: '.js',
}));
console.log('path.normalize():', path.normalize('C://users\\\\zerocho\\\path.js'));
console.log('------------------------------');
console.log('path.isAbsolute(C:\\):', path.isAbsolute('C:\\'));
console.log('path.isAbsolute(./home):', path.isAbsolute('./home'));
console.log('------------------------------');
console.log('path.relative():', path.relative('C:\\users\\zerocho\\path.js', 'C:\\'));
console.log('path.join():', path.join(__dirname, '..', '..', '/users', '.', '/zerocho'));
console.log('path.resolve():', path.resolve(__dirname, '..', 'users', '.', '/zerocho'));
```

```
$ node path
path.sep: \
path.delimiter: ;
------------------------------
path.dirname(): C:\Users\zerocho
path.extname(): .js
path.basename(): path.js
path.basename - extname: path
------------------------------
path.parse() {
  root: 'C:\\',
  dir: 'C:\\Users\\zerocho',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
path.format(): C:\users\zerocho\path.js
path.normalize(): C:\users\zerocho\path.js
------------------------------
path.isAbsolute(C:\\): true
path.isAbsolute(./home): false
------------------------------
path.relative(): ..\..\..
path.join(): C:\Users\zerocho
path.resolve(): C:\zerocho
```



-  path.sep: 경로의 구분자입니다. 윈도는 \, POSIX는 /입니다.
- path.delimiter: 환경 변수의 구분자입니다. process.env.PATH를 입력하면 여러 개의 경로가 이 구분자로 구분되어 있습니다. 윈도는 세미콜론(;)이고, POSIX는 콜론(:)입니다.
- path.dirname(경로): 파일이 위치한 폴더 경로를 보여줍니다.
- path.extname(경로): 파일의 확장자를 보여줍니다.
- path.basename(경로, 확장자): 파일의 이름(확장자 포함)을 표시합니다. 파일의 이름만 표시하고 싶다면 basename의 두 번째 인수로 파일의 확장자를 넣으면 됩니다.
- path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리합니다.
- path.format(객체): path.parse()한 객체를 파일 경로로 합칩니다.
- path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환합니다.
- path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알립니다.
- path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알립니다.
- path.join(경로, …): 여러 인수를 넣으면 하나의 경로로 합칩니다. 상대경로인 ..(부모 디렉터리)과 .(현 위치)도 알아서 처리합니다.
- path.resolve(경로, …): path.join()과 비슷하지만 차이가 있습니다. 차이점은 다음에 나오는 Note에서 설명합니다.

<span style="color:red">주의</span>

join vs resolve

| 모듈    | 동작방식       | 예시코드                       | 결과    |
| ------- | -------------- | ------------------------------ | ------- |
| resolve | 절대 경로 인식 | path.join('/a', '/b', 'c');    | /a/b/c/ |
| join    | 상대 경로 인식 | path.resolve('/a', '/b', 'c'); | /b/c    |



#### url

WHATWG 방식의 url 정리법

<img src="https://thebook.io/img/080229/119.jpg" style="width:550px; height:400px">



```js
const url = require('url');
 

const { URL } = url;
const myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
console.log('------------------------------');
const parsedUrl = url.parse('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor');
console.log('url.parse():', parsedUrl);
console.log('url.format():', url.format(parsedUrl));
```



 url 모듈 안에 URL 생성자가 있습니다. 이 생성자에 주소를 넣어 객체로 만들면 주소가 부분별로 정리됩니다. 이 방식이 WHATWG의 url입니다. WHATWG에만 있는 username, password, origin, searchParams 속성이 존재

```
new URL(): URL {
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor',
  origin: 'http://www.gilbut.co.kr',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'www.gilbut.co.kr',
  hostname: 'www.gilbut.co.kr',
  port: '',
  pathname: '/book/bookList.aspx',
  search: '?sercate1=001001000&test_case=001&result=true',
  searchParams: URLSearchParams { 'sercate1' => '001001000', 'test_case' => '001', 'result' => 'true' },
  hash: '#anchor'
}
url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor
------------------------------
url.parse(): Url {
  protocol: 'http:',
  slashes: true,
  auth: null,
  host: 'www.gilbut.co.kr',
  port: null,
  hostname: 'www.gilbut.co.kr',
  hash: '#anchor',
  search: '?sercate1=001001000&test_case=001&result=true',
  query: 'sercate1=001001000&test_case=001&result=true',
  pathname: '/book/bookList.aspx',
  path: '/book/bookList.aspx?sercate1=001001000&test_case=001&result=true',
  href: 'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor'
}
url.format(): http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000&test_case=001&result=true#anchor
```



- new URL(주소) : WHATWG 방식으로 주소 분해

- url.parse(주소) : 주소를 분해, WHATWG 과 달리 username 과 passowrd 대신 auth성이 있고

​									searchParams 대신 query가 있음

- url.format(객체) : WHATWG 방식 url과 기존 노드의 url을 모두 사용할 수 있음

​									 분해되었던 url을 원상태로 조립

WHATWG 방식은 search 부분을 searchParams라는 특수한 객체로 반환하므로 유용

search 부분은 보통 주소를 통해 데이터를 전달할 때 사용

***예시코드***

```js
const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll(\'category\'):', myURL.searchParams.getAll('category'));
console.log('searchParams.get(\'limit\'):', myURL.searchParams.get('limit'));
console.log('searchParams.has(\'page'\):', myURL.searchParams.has('page'));

console.log('searchParams.keys():', myURL.searchParams.keys());
console.log('searchParams.values():', myURL.searchParams.values());

myURL.searchParams.append('filter', 'es3');
myURL.searchParams.append('filter', 'es5');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es6');
console.log(myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));

console.log('searchParams.toString():', myURL.searchParams.toString());
myURL.search = myURL.searchParams.toString();
```

```
$ node searchParams
searchParams: URLSearchParams {
  'page' => '3',
  'limit' => '10',
  'category' => 'nodejs',
  'category' => 'javascript' }
searchParams.getAll('category'): [ 'nodejs', 'javascript' ]
searchParams.get('limit'): 10
searchParams.has('page'): true
searchParams.keys(): URLSearchParams Iterator { 'page', 'limit', 'category', 'category' }
searchParams.values(): URLSearchParams Iterator { '3', '10', 'nodejs', 'javascript' }
[ 'es3', 'es5' ]
[ 'es6' ]
[]
searchParams.toString(): page=3&limit=10&category=nodejs&category=javascript
```



| 함수          | 설명                                                         |
| ------------- | ------------------------------------------------------------ |
| getAll(키)    | 키에 해당하는 모든값 가져옴                                  |
| get(키)       | 키에 해당하는 첫번째 값만 가져움                             |
| has(키)       | 키의 유무 확인                                               |
| keys()        | searchParams의 모든 키를 반복기(iteraor)객체로 가져옴        |
| values()      | searchParams의 모든 값을 반복기 객체로 가져옴                |
| append(키,값) | 해당 키 추가, 값은 키의 값이 있다면 유지하고 하나더 추가함   |
| set(키, 값)   | 같은 키의 값들 제거후 새로 추가                              |
| delete(키)    | 키 제거                                                      |
| toString()    | searchParams 객체를 다시 문자열로 만듬, search에 대입하면 주소 객체에 반영됨 |

query 같은 문자열보다 searchParams가 유용한 이유는 query의 경우 다음에 배우는 querystring 모듈을 한 번 더 사용해야 하기 때문



#### querystring

WHATWG 방식의 url 대신 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 모듈

```js
const url = require('url'); 
const querystring = require('querystring'); 

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'); 
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse():', query);
console.log('querystring.stringify():', querystring.stringify(query));
```

```
$ node querystring
querystring.parse(): [Object: null prototype] {
  page: '3',
  limit: '10',
  category: [ 'nodejs', 'javascript' ]
}
querystring.stringify(): page=3&limit=10&category=nodejs&category=javascript
```



| 함수                        | 설명                                       |
| --------------------------- | ------------------------------------------ |
| querystring.parse(쿼리)     | url의 query부분을 자바스크립트 객체로 분해 |
| querystring.stringify(객체) | 분해된 query 객체를 문자열로 다시 조립     |



#### crpyto

다양한 방식의 암호화를 도와주는 모듈

##### 단뱡향 암호화

```js
const crypto = require('crypto');

console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));
```

```
$ node hash
base64: dvfV6nyLRRt3NxKSlTHOkkEGgqW2HRtfu19Ou/psUXvwlebbXCboxIPmDYOFRIpqav2eUTBFuHaZri5x+usy1g==
hex: 76f7d5ea7c8b451b773712929531ce92410682a5b61d1b5fbb5f4ebbfa6c517bf095e6db5c26e8c483e60d8385448a6a6afd9e513045b87699ae2e71faeb32d6
base64: cx49cjC8ctKtMzwJGBY853itZeb6qxzXGvuUJkbWTGn5VXAFbAwXGEOxU2Qksoj+aM2GWPhc1O7mmkyohXMsQw==
```



| 함수                 | 설명                                        |
| -------------------- | ------------------------------------------- |
| createHash(알고리즘) | 해시 알고리즘(md5, sha1,256,512)을 지정     |
| update(문자열)       | 변환할 문자열 입력                          |
| digest(인코딩)       | 인코딩할 알고리즘(base64, hex, latin1) 지정 |

현재는 주로 pbkdf2나 bcrypt, scrypt라는 알고리즘으로 비밀번호를 암호화하고 있음

예시코드

```js
const crypto = require('crypto'); 

crypto.randomBytes(64, (err, buf) => {
  const salt = buf.toString('base64'); 
  console.log('salt:', salt); 
  crypto.pbkdf2('비밀번호', salt, 100000, 64, 'sha512', (err, key) => { 
    console.log('password:', key.toString('base64')); 
  }); 
});
```

pbkdf2는 간단하지만 bcrypt나 scrypt보다 취약

=> bcrypt나 scrypt는 따로 공부 필

1. randomBytes 로 64바이트 랜덤 문자열 생성
2. salt에 base64로 인코딩하여 결과 저장
3. pbkdf2에 변환할 문자열, salt, 반복횟수, 결과값의 바이트 수, 암호화 알고리즘순으로 입력



#### 양뱡향 암호화

```js
const crypto = require('crypto'); 

const algorithm = 'aes-256-cbc'; 
const key = 'abcdefghijklmnopqrstuvwxyz123456'; 
const iv = '1234567890123456'; 
const cipher = crypto.createCipheriv(algorithm, key, iv); 
let result = cipher.update('암호화할 문장', 'utf8', 'base64'); 
console.log('암호화:', result); /*iiopeG2GsYlk6ccoBoFv*/
result += cipher.final('base64'); 
console.log('암호화:', result); /*iiopeG2GsYlk6ccoBoFvEH2EBDMWv1kK9bNuDjYxiN0=*/

const decipher = crypto.createDecipheriv(algorithm, key, iv); 
let result2 = decipher.update(result, 'base64', 'utf8'); 
console.log('복호화:', result2);/*암호화할 문*/
result2 += decipher.final('utf8'); 
console.log('복호화:', result2);/*암호화할 문장*/
```

아잇 싯팔 정확하고 체계적이며 명확한 내용 없음 걍 대충 가져다 쓰셈ㅋㅋㅋㅋㅋ

 노드 공식 문서(https://nodejs.org/api/crypto.html)에서 확인ㅋㅋㅋㅋㅋ

좀 더 간단하게 암호화를 하고 싶다면 npm 패키지인 crypto-js(https://www.npmjs.com/package/crypto-js)를 추천한데ㅋㅋㅋㅋ 아 모름ㅋㅋㅋㅋ

-------------------

#### util

각종 편의 기능을 모아둔 모듈

```js
const util = require('util'); 
const crypto = require('crypto'); 

const dontUseMe = util.deprecate((x, y) => { 
  console.log(x + y); 
}, 'dontUseMe 함수는 deprecated되었으니 더 이상 사용하지 마세요!'); 
dontUseMe(1, 2); 

const randomBytesPromise = util.promisify(crypto.randomBytes); 
randomBytesPromise(64) 
  .then((buf) => { 
    console.log(buf.toString('base64')); 
  }) 
  .catch((error) => { 
    console.error(error); 
  });
```



| 함수                           | 설명                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| util.deprecate(함수, 경고내용) | 함수가 deprecated 처리되었음을 알림                          |
| util.promisify(콜백 리턴 함수) | 콜백 패턴을 프로미스 프턴으로 바꿈<br>util.callbackify도 있지만 자주사용 X다고 함 |

--------

#### worker_threads

```js
const { 
  Worker, isMainThread, parentPort,
} = require('worker_threads'); 

if (isMainThread) { // 부모일 때 
  const worker = new Worker(__filename); 
  worker.on('message', message => console.log('from worker', message)); 
  worker.on('exit', () => console.log('worker exit')); 
  worker.postMessage('ping'); 
} else { // 워커일 때 
  parentPort.on('message', (value) => { 
    console.log('from parent', value); 
    parentPort.postMessage('pong'); 
    parentPort.close(); 
  }); 
}
```

```
from parent ping
from worker pong
worker exit
```

1. `const worker = new Worker(__filename); `로 메인 스레드에서 현 파일 실행하는 워커 스레드 생성

2. 부모스레드에서 `worker.postMessage`로 워커에 데이터를 보낼 수 있음
3. 워커는 `parentPort.on('message',코드)` <span style="color:red">이벤트리스너</span>로 부모로 부터 메시지를 받을 수 있음
4. 워커는 `parentPort.post("data")`로 메시지를 보냄
5. 부모스레드에서 `worer.on('message')`로 메시지 받음(한번만 받을려면 once('message')사용)



위 코드 예제

```js
const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) { // 부모일 때
  const threads = new Set();
  threads.add(new Worker(__filename, {
    workerData: { start: 1 },
  }));
  threads.add(new Worker(__filename, {
    workerData: { start: 2 },
  }));
  for (let worker of threads) {
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.log('job done');
      }
    });
  }
} else { // 워커일 때
  const data = workerData;
  parentPort.postMessage(data.start + 100);
}
```

```
from worker 101
from worker 102
job done
```



```js
const min = 2;
const max = 10000000;
const primes = [];

function generatePrimes(start, range) {
  let isPrime = true;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      } 
    } 
    if (isPrime) { 
      primes.push(i); 
    } 
    isPrime = true; 
  } 
} 

console.time('prime'); 
generatePrimes(min, max); 
console.timeEnd('prime'); 
console.log(primes.length);
```

=> worker thread로 실행 속도 단축

```js
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const min = 2;
let primes = [];

function findPrimes(start, range) {
  let isPrime = true;
  let end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  } 
}

if (isMainThread) {
  const max = 10000000;
  const threadCount = 8;
  const threads = new Set();
  const range = Math.ceil((max - min) / threadCount);
  let start = min;
  console.time('prime');
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = start;
    threads.add(new Worker(__filename, { workerData: { start: wStart, range } }));
    start += range;
  }
  threads.add(new Worker(__filename, { workerData: { start, range: range + ((max - min + 1) % threadCount) } }));
  for (let worker of threads) {
    worker.on('error', (err) => {
      throw err;
    });
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd('prime');
        console.log(primes.length);
      }
    });
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
  }
} else {
  findPrimes(workerData.start, workerData.range);
  parentPort.postMessage(primes);
}
```



----

#### childe_process

노드에서 타 언어의 프로그램(코드)를 실행하기 위한 모듈



1. os 명령 실행

```js
const exec = require('child_process').exec;

var process = exec('dir');

process.stdout.on('data', (data) => {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러
```



2. 파이썬 명령(파일) 실행

```js
const spawn = require('child_process').spawn;

var process = spawn('python', ['./python_files/test_chile_process.py']);

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 >에러
```



| 함수  | 설명                                                         |
| ----- | ------------------------------------------------------------ |
| exec  | 셸을 실행해서 명령어 수행                                    |
| spawn | 새로운 프로세스를 띄워서 명령어 실행<br />spawn 세번째 인수로 shell:true 넘길 시 셸 실행후 명령 실행<br />=> 프로세스 동작하면서 셸 명령어 사용 가능 |

---



#### 기타 모듈

| 모듈            | 설명                                                      |
| --------------- | --------------------------------------------------------- |
| assert          | 값을 비교, 프로그램이 제대로 동작하는지 테스트하는데 쓰임 |
| dns             | 도메인 이름에 대한 ip주소 받아옴                          |
| net             | http보다 로우레벨인 TCP나 IPC 통신할 때 사용              |
| string_decorder | 버퍼 데이터를 문자열로 바꿀 때 사용                       |
| tls             | TLS 와 SSL에 관련된 작업할 때 사용                        |
| tty             | 터미널 관련 작업시 사용                                   |
| dgram           | DUP와 관련된 작업을 할 때 사용                            |
| v8              | V8 엔진에 직접 접근할 때 사용                             |
| vm              | 가상 머신에 직접 접근할 때 사용                           |



----



### 파일 시스템 접근하기

```js
const fs = require('fs');

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);			//버퍼 형식으로 데이터 읽음
  console.log(data.toString());	//버퍼를 문자열로 인코딩함
});
```

fs는 기본적으로 콜백 형식의 모듈

-> 사용하기 불편함

=> fs 모듈을 프로미스 형식으로 바꿔주는 방법을 주로 사용

```js
const fs = require('fs').promises;

fs.readFile('./readme.txt')
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => {
    console.error(err);
  });
```

```js
const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다')
.then(() => {
  return fs.readFile('./writeme.txt');
})
.then((data) => {
  console.log(data.toString());
})
.catch((err) => {
  console.error(err);
});
```



### 동기 메서드와 비동기 메서드

```js
const fs = require('fs');

console.log('시작');
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {throw err;}
  console.log('1번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {throw err;}
  console.log('2번', data.toString());
});
fs.readFile('./readme2.txt', (err, data) => {
  if (err) {throw err;}
  console.log('3번', data.toString());
});
console.log('끝');
```

```
$ node async
시작
끝
2번 저를 여러 번 읽어보세요.
3번 저를 여러 번 읽어보세요.
1번 저를 여러 번 읽어보세요.
```



<img src="https://thebook.io/img/080229/142.jpg">



동기시 fs 사용법

```js
const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme2.txt');
console.log('1번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('2번', data.toString());
data = fs.readFileSync('./readme2.txt');
console.log('3번', data.toString());
console.log('끝');
```

이렇게 쓰면 요청의 개수가 많아지면 노는 스레드들이 넘쳐나는데 일은 안하는 상황 발생

=> 프로미스로 해결 가능

```js
const fs = require('fs').promises;

console.log('시작');
fs.readFile('./readme2.txt')
  .then((data) => {
    console.log('1번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('2번', data.toString());
    return fs.readFile('./readme2.txt');
  })
  .then((data) => {
    console.log('3번', data.toString());
    console.log('끝');
  })
  .catch((err) => {
    console.error(err);
  });
```



#### 버퍼와 스트림

노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 할당, 파일 데이터를 해당 메모리에 저장한 뒤 사용함

=> 이 메모리가 바로 버퍼임

버퍼를 직접 다룰 수 있는 클래스가 Buffer임

```js
const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);
```



| 내부 컴포넌트  | 설명                                                         |
| -------------- | ------------------------------------------------------------ |
| from(문자열)   | 문자열을 버퍼로 전환                                         |
| toString(버퍼) | 버퍼를 다시 무낮열로 바꿈, base64나 hex를 인수로 넣어서 인코딩 가능 |
| concat(배열)   | 배연안의 버퍼들을 하나로 함침                                |
| alloc(바이트)  | 빈 버퍼 생성, 바이트만큼의 버퍼 생성됨                       |

대용량 파일을 다량의 사용자에게 내보낼때 메모리 낭비됨<br>버퍼는 모든 내용을 버퍼에 다 쓴후 다음 동작으로 넘어감

->스트림을 통해 버퍼의 크기를 작게 만든후 여려번 나눠보냄

 

```js
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
//기본값은 64KB
const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data :', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end :', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error :', err);
});
```

```js
const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write('이 글을 씁니다.\n');
writeStream.write('한 번 더 씁니다.');
writeStream.end();
```



createReadStream으로 파일을 읽고 그 스트림을 전달받아 createWriteStream으로 파일을 쓸 수 있음

=> 스트림끼리 연결하는 것을 ‘파이핑한다’고 표현



```js
const fs = require('fs');

const readStream = fs.createReadStream('readme4.txt');
const writeStream = fs.createWriteStream('writeme3.txt');
readStream.pipe(writeStream);
```

노드 8.5 버전이 나오기 전까지는 이 방식으로 파일을 복사

=> 새로운 파일 복사방식 존재

```js
const fs = require('fs').promises;

fs.copyFile('readme4.txt', 'writeme4.txt')
  .then(() => {
    console.log('복사 완료');
  })
  .catch((error) => {
    console.error(error);
});
```



pipe는 스트림 사이에 여러 번 연결할 수 있음



```js
const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme4.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme4.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
```

 zlib의 createGzip이라는 메서드가 스트림을 지원



```js
const fs = require('fs');

console.log('before: ', process.memoryUsage().rss);

const readStream = fs.createReadStream('./big.txt');
const writeStream = fs.createWriteStream('./big3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
  console.log('stream: ', process.memoryUsage().rss);
});
```

대용량 파일 stream으로 카피



---------



### 기타 fs 메서드

```js
const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
  .then(() => {
    return Promise.reject('이미 폴더 있음');
  })
  .catch((err) => {
    if (err.code === 'ENOENT') {
      console.log('폴더 없음');
      return fs.mkdir('./folder');
    }
    return Promise.reject(err);
  })
  .then(() => {
    console.log('폴더 만들기 성공');
    return fs.open('./folder/file.js', 'w');
  })
  .then((fd) => {
    console.log('빈 파일 만들기 성공', fd);
    fs.rename('./folder/file.js', './folder/newfile.js');
  })
  .then(() => {
    console.log('이름 바꾸기 성공');
  })
  .catch((err) => {
    console.error(err);
  });
const fs = require('fs').promises;

fs.readdir('./folder')
  .then((dir) => {
    console.log('폴더 내용 확인', dir);
    return fs.unlink('./folder/newFile.js');
  })
  .then(() => {
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');
  })
  .then(() => {
    console.log('폴더 삭제 성공');
  })
  .catch((err) => {
    console.error(err);
  });
```



----------



### 스레드풀

fs , crypto, zlib, dns.lookup 등

```
const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('1:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('2:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('3:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('4:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('5:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('6:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('7:', Date.now() - start);});
crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', () => {
  console.log('8:', Date.now() - start);});
```

스레드풀을 직접 컨트롤할 수는 없지만 <span style="color:red">개수를 조절</span>가능

process.env.UV_THREADPOOL_SIZE를 설정

윈도우	=>	SET UV_THREADPOOL_SIZE=1

리눅스	=>	UV_THREADPOOL_SIZE=1



------



### 이벤트란

```js
const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('이벤트 1');
});
myEvent.on('event2', () => {
  console.log('이벤트 2');
});
myEvent.on('event2', () => {
  console.log('이벤트 2 추가');
});
myEvent.once('event3', () => {
  console.log('이벤트 3');
}); // 한 번만 실행됨

myEvent.emit('event1'); // 이벤트 호출
myEvent.emit('event2'); // 이벤트 호출

myEvent.emit('event3'); // 이벤트 호출
myEvent.emit('event3'); // 실행 안 됨

myEvent.on('event4', () => {
  console.log('이벤트 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4'); // 실행 안 됨

const listener = () => {
  console.log('이벤트 5');
};
myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5'); // 실행 안 됨

console.log(myEvent.listenerCount('event2'));
```



| 메서드                           | 설명                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| on(이벤트명, 콜백)               | 이벤트 이름과 이벤트 발생시의 콜백 연결<br />=> 이를 리스닝이라 부름 |
| addListener(이벤트명, 콜백)      | on과 기능 동일                                               |
| emit(이벤트명)                   | 이벤트 호출                                                  |
| once(이벤트명, 콜백)             | 이벤트 한번만 호출                                           |
| removeAllListeners(이벤트명)     | 이벤트명에 연결된 모든 리스너 제거                           |
| removeListener(이벤트명, 리스너) | 이벤트에 연결된 리스너 하나 제거, 리스너는 무조건 들어가야함 |
| off(이벤트명, 콜백)              | 노드10 버전에 추가됬으며, removeListener과 동일              |
| listenerCount(이벤트명)          | 이벤트 명에 따른 리스너 갯수 확인                            |



----



### 예외 처리

1. 에러가 발생할 것 같은 부분을 try/catch로 감싸기

   ```js
   setInterval(() => {
     console.log('시작');
     try {
       throw new Error('서버를 고장내주마!');
     } catch (err) {
       console.error(err);
     }
   }, 1000);
   ```



2. 노드 자체에서 에러 잡기	

```js
const fs = require('fs');

setInterval(() => {
  fs.unlink('./abcdefg.js', (err) => {
    if (err) {
      console.error(err);
    }
  });
}, 1000);
```

​		=>  throw로 던져버리면 노드 프로세스가 멈춰버림 반드시 try/catch로 에러를 잡아야함



3. 프로미스 에러는 자체 처리 됨

```js
const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdefg.js')
}, 1000);
```

​	=> 노드 버전이 올라감에 따라 에러 처리 동작이 바뀔 수 있음

​		=> 그냥 try/catch 쓰라마



4. 예측 불가 에러 처리법 uncaughtException

```js
process.on('uncaughtException', (err) => {console.error('예기치 못한 에러', err);});

setInterval(() => {throw new Error('서버를 고장내주마!');}, 1000);

setTimeout(() => {console.log('실행됩니다');}, 2000);
```

​	=> 만약 setInterval 이 던지는 에러를 process.on으로 처리하지 않았더라면 setTimeout은 실행되지 않음

​	uncaughtException이 만능으로 보이지만 노드는 해당 처리후 다음 동작이 제대로 동작하는지 보증하지 않음

​	=> 복구 작업 코드를 넣어 두었더라고 그것이 동작하는지 확신 할 수 없음

​	=> 단순 에러 내용 기록하는 정도로 사용, 에러 기록후 process.exit()로 프로세스 종료, 코드 수정이 필요함

​		=> 운영 중인 서버가 에러로 인해 종료되었을 때 자동으로 재시작하는 방법은 15.1.5(pm2)에 있음



#### 자주 발생하는 에러

| 에러 목록                                                    | 설명                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| node: command not found                                      | 환경 변수가 제대로 설정되지 않은 것,환경 변수에는 노드가 설치된 경로가 포함되어야 함 |
| ReferenceError 모듈 is not defined                           | 모듈을 require했는지 확인                                    |
| Error: Cannot find module 모듈명                             | 해당 모듈을 require했지만 설치되있지 않음<br />npm i 명령어로 다운 |
| Error: Can't set headers after they are sent                 | 요청에 대한 응답을 보낼 때 응답을 두번 이상 보냄<br />요청에 대한 응답은 한번만 보내야함 |
| FATAL ERROR: CALL_AND_RETRY_LAST <br />Allocation failed - JavaScript heap out of memory | 코드를 실행할 메모리 부족, 스크립트 비정상 작동함<br />1. 코드가 잘못됨<br />=> 코드 다시 고쳐<br />2. 메모리 부족<br />=> `--max-old-space-size=[사이즈]`로 용량 수정 가능 |
| UnhandledPromiseRejectionWarning: <br />Unhandled promise rejection | 프로미스 사용 시 catch 메서드를 붙이지 않으면 발생<br />catch를 붙여 에러가 나는 상황에 대비 |
| EADDRINUSE 포트 번호                                         | 해당 포트 번호에 이미 다른 프로세스가 연결되어 있음<br />프로세스에 대한 정보는 모르나 다른 포트 쓰던 포트 종료를 하든 해야함 아래에 해당 정보 설명함 |
| EACCES 또는 EPERM                                            | 노드가 작업 수행할 때 권한이 충분치 않음<br />파일/폴더 수정, 삭제, 생성 권환 확인 필요 |
| EJSONPARSE                                                   | package.json 등의 JSON 파일에 오류 존재                      |
| ECONNREFUSED                                                 | 요청을 보냈으나 연결이 않될 때 발생<br />주소가 맞는지 서버가 켜져 있는지 확인 |
| ETARGET                                                      | package.json에 기록한 피키지 버전이 없을 때 발생             |
| ETIMEOUT                                                     | 요청을 보냈으나 일정시간내에 오지 않을 때 발생               |
| ENOENT: no such file or directory                            | 지정한 폴더나 파일이 없을 때 발생                            |



| OS        | 설명                                                         |
| --------- | ------------------------------------------------------------ |
| 윈도우    | $ netstat -ano \| findstr 포트<br />$ taskkill /pid 프로세스아이디 /f |
| 맥/리눅스 | $ lsof -i tcp:포트<br />$ kill -9 프로세스아이디             |

노드 공식 문서 :  https://nodejs.org/dist/latest-v14.x/docs/api/

NODE_OPTIONS :  https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_node_options_options

UV_THREADPOOL_SIZE : https://nodejs.org/dist/latest-v14.x/docs/api/cli.html#cli_uv_threadpool_size_size

에러 코드 : https://nodejs.org/dist/latest-v14.x/docs/api/errors.html#errors_node_js_error_codes

uncaughtException : https://nodejs.org/dist/latest-v14.x/docs/api/process.html



----



## HTTP 모듈로 서버 만들기

실제 서버 동작에 필요한 쿠키와 세션 처리, 그리고 요청 주소별 라우팅 방법

### 요청과 응답



```js
const http = require('http');
const fs = require('fs').promises;

const users = {}; // 데이터 저장용

http.createServer(async (req, res) => {
  try {
    console.log(req.method, req.url);
    if (req.method === 'GET') {
      if (req.url === '/') {
        const data = await fs.readFile('./restFront.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/about') {
        const data = await fs.readFile('./about.html');
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end(data);
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end(JSON.stringify(users));
      }
      // /도 /about도 /users도 아니면
      try {
        const data = await fs.readFile(`.${req.url}`);
        return res.end(data);
      } catch (err) {
        // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
      }
    } else if (req.method === 'POST') {
      if (req.url === '/user') {
        let body = '';
        // 요청의 body를 stream 형식으로 받음
        req.on('data', (data) => {
          body += data;
        });
        // 요청의 body를 다 받은 후 실행됨
        return req.on('end', () => {
          console.log('POST 본문(Body):', body);
          const { name } = JSON.parse(body);
          const id = Date.now();
          users[id] = name;
          res.writeHead(201);
          res.end('등록 성공');
        });
      }
    } else if (req.method === 'PUT') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        let body = '';
        req.on('data', (data) => {
          body += data;
        });
        return req.on('end', () => {
          console.log('PUT 본문(Body):', body);
          users[key] = JSON.parse(body).name;
          return res.end(JSON.stringify(users));
        });
      }
    } else if (req.method === 'DELETE') {
      if (req.url.startsWith('/user/')) {
        const key = req.url.split('/')[2];
        delete users[key];
        return res.end(JSON.stringify(users));
      }
    }
    res.writeHead(404);
    return res.end('NOT FOUND');
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end(err);
  }
 })
  .listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다');
  });
```



```js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() +     5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires= ${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();

  // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
      }
  }
})
  .listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });
```

<p id="cookieOption">쿠키 옵션</p>

| 속성            | 설명                                                         |
| :-------------- | ------------------------------------------------------------ |
| 쿠키명=쿠키값   | 기본적인 쿠키값                                              |
| Expries=날짜    | 만료 기한, 기본값은 클라이언트 종료                          |
| Max-age=초      | Expires와 비슷, 날짜대신 초 입력, Expries보다 우선순위 높음  |
| Domain=도메인명 | 쿠키가 전송될 도메인 특정, 기본값 현재 도메인                |
| Path=URL        | 쿠키가 전송될 URL 특정, 기본값 /, 해당 경우 모든 URL에서 전송 가능 |
| Secure          | HTTPS일경우에만 쿠키 전송됨                                  |
| HttpOnly        | 설정시 js에서 쿠키 접근 불가능, 쿠키 조작 방지 기능임        |



```js
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);

  // 주소가 /login으로 시작하는 경우
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    const { name } = qs.parse(query);
    const expires = new Date();
    // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
    expires.setMinutes(expires.getMinutes() +     5);
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `name=${encodeURIComponent(name)}; Expires= ${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();

  // name이라는 쿠키가 있는 경우
  } else if (cookies.name) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${cookies.name}님 안녕하세요`);
  } else {
    try {
      const data = await fs.readFile('./cookie.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
      }
  }
})
  .listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다!');
  });
```



##### 세션

서버에 사용자 정보를 저장하고 클라이언트와는 세션 아이디로만 소통

세션을 위해 사용하는 쿠키를 세션쿠키라고 함

보통 레디스나 멤캐시드 같은 DB에 넣어둠



### Cluster

싱글 프로세스로 동작하는 노드가 CPU 코어를 모두 사용할 수 있게 해줌

포트를 공유하는 노드 프로세스를 여러 개 두었을 때 요청이 많이 들어오는 경우 서버의 개수만큼 요청이 분산 됨으로 써 부하를 줄일 수 있음

직접 cluster 모듈로 클러스터링 구현 할 수 있지만 실무에서는 pm2 등의 모듈 사용



----



##  패키지 매니저

npm init 으로 pakage.json 파일 생성

json 파일 내 scripts에 있는 명령은 `npm run [명령어]`로 실행 할 수 있음

`npm install cookie-parser express express-session morgan`



`npm install --save-dev nodemon`



`sudo npm install --global rimraf` 

==

`npm install --save-dev rimraf`

`npx rimraf node_modules`



### 패키지 버전

SemVer 방식의 버전 넘버링

**특수기호major.minor.patch**

major 버전 : 하위 호환이 안될 정도로 패키지의 내용이 수정되었음

minor 버전: 하위 호환이 되는 기능 업데이트를 한 버전(1.5 -> 1.6 이동시 연동된것들에 아무 문제 없어야함)

patch 버전: 기존 기능에 문제점을 수정한 버전

특수기호(^,~,<,>) : 버전에는 포함되지 않지만 설치할 때 어떤 버전을 설치해야하는지 알림

| 기호        | 설명                                    |
| ----------- | --------------------------------------- |
| ^           | minor 버전까지만 설치하거나 업데이트함  |
| ~           | patch 버전까지만 설치하거나 업데이트 함 |
| >,<,>=,<=,= | 연산자에 따른 버전까지만 설치           |
| @latest, x  | 안정된 최신 버전의 패키지 설치          |
| @next       | 가장 최근 배포판                        |

| npm 명령어                                 | 설명                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| `npm outdated`                             | 업데이트 할 수 있는 패키지 확인                              |
| `npm update [패키지명]`                    | 패키지 업데이트                                              |
| `npm uninstall [패키지명]`                 | 패키지 삭제                                                  |
| `npm search [검색어]`                      | npm 패키지 검색([https://npmjs.com](https://npmjs.com/))     |
| `npm info [패키지명]`                      | 패키지 세부정보 명시(package.json, 의존관계, 설치가능한 버전) |
| `npm adduser`                              | npm 로그인, 패키지 배포를 위해서는 로그인 필요, 배포X시 가입할 필요X |
| `npm whoami`                               | 로그인한 사용자 확인                                         |
| `npm logout`                               | 로그아웃                                                     |
| `npm version [버전]`                       | package.json의 버전을 올림                                   |
| `npm deprecate [패키지명] [버전] [메시지]` | 해당 패키지 설치시 경고 메세지 띄우게함                      |
| `npm publish`                              | 자신이 만든 패키지를 배포                                    |
| `npm unpublish`                            | 배포한 페키지를 제거(24시간 이내에 배포한 패키지만)          |
| `npm ci`                                   | package-lock.json 에 의거한 패키지 설치                      |



----



## 익스프레스 웹 서버 제작

express, nodemon 사

package.js 파일 script 에 "start":"nodemon app" 추가

=> nodemon으로 app.js 실행

서버 코드를 수정하면 nodemon이 서버를 자동으로 재시작함

rs를 입력해서 수동으로 재시작할 수도 있음



```js
const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
```



| 코드                  | 설명                                                         |
| --------------------- | ------------------------------------------------------------ |
| app.set('port', 포트) | 서버가 실행될 포트 설정, process.env에 PORT가 지정되어 있다면 사용 아니면 8080 사용 |
| app.get(주소, 라우터) | 주소에 대한 GET 요청이 올 때 어떤 동작을 할지 적는 부분<br>req: 요청에 대한 정보가 들어있는 객체 <br>res: 응답에 대한 정보가 들어있는 객체<br>express에서는 res.write, end 대신 **res.send** 를 사용함 |
| app.post              | POST 요청시 동작                                             |
| app.put               | PUT 요청시 동작                                              |
| app.patch             | PATCH 요청시 동작                                            |
| app.delete            | DELETE 요청시 동작                                           |
| app.options           | OPTIONS 요청시 동작                                          |
| app.use(미들웨어)     | 미들웨어 사용                                                |



### 자주 사용되는 미들웨어

```js
app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});
app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});
```



<table><tr>미들웨어 실행되는 경우</tr><tr><td>
    app.use(미들웨어)</td><td>모든 요청에서 미들웨어 실행</td></tr><tr><td>app.use('/abc', 미들웨어)</td><td>abc로 시작하는 요청에서 미들웨어 실행</td></tr><tr><td>app.post('/abc', 미들웨어)</td><td>abc로 시작하는 POST 요청에서 미들웨어 실행</td></tr></table>

app.use나 app.get 같은 라우터에 미들웨어를 여러 개 장착할 수 있음



호출자 내부에 next 변수 추가 함으로써 미들웨어 사용

next()호출 함으로써 다음 미들웨어로 넘김

err 변수 추가함으로 써 에러처리 미들웨어 정의함

res.status(500)로 http 상태 코드 지정가능(기본값200)



`npm i morgan cookie-parser express-session dotenv`

dotenv(process.env 관리)를 제외하고는 전부 미들웨어임



```js
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const PORT = 8080;

//.env 파일을 읽어서 process.env로 만듦 process.env.COOKIE_SECRET할당
dotenv.config();
const app = express();
app.set('port', process.env.PORT || PORT);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

app.use((req, res, next) => {
  console.log('모든 요청에 다 실행됩니다.');
  next();
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
```



#### morgan

요청과 응답에 대한 정보를 콘솔에 기록

```js
app.use(morgan('dev'));
```

dev : 개발환경

combined : 배포환경

그외로 common, short, tiny등 존재



#### static

정적인 파일들을 제공하는 라우터 역할

기본적으로 제공되며 express 객체 안에서 꺼낼 수 있음

```js
app.use('요청 경로', express.static('실제 경로'));
//ex)
app.use('/', express.static(path.join(__dirname, 'public')));
```

public/stylesheets/style.css를 http://localhost:3000/stylesheets/style.css로 접근 가능

정적 파일들을 알아서 제공해주므로 fs.readFile로 파일을 직접 읽어서 전송할 필요가 없음

-> 경로에 있을 시 : 응답으로 파일을 보내기 때문에 next를 호출하지 않음

-> 경로에 없을 시 : 알아서 내부적으로 next 호출, 다음 미들웨어 실행



#### body-parser

요청 본문에 있는 데이터 해석, req.body 객체로 만듦

폼 데이터나 AJAX 요청을 주로 처리

JSON과 URL-encoded 형식의 데이터 외에도 Raw, Text 형식의 데이터를 추가로 해석 가능

 -> 이때는 직접 설치해줘야함

​	Raw : 요청의 본문이 버퍼데이터일 때

​	Text : 요청의 본문이 텍스트 데이터일 때

멀티파트(이미지,동영상,파일)데이터는 처리 X

 => multer 모듈 사용

- 기본 사용

```js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

- Raw, Text 사용

```js
const bodyParser = require('body-parser'); 
app.use(bodyParser.raw());
app.use(bodyParser.text());
```



urlencoded -> extended:false	querystring 모듈 사용하여 쿼리 스트링 해석

​					 -> extended:true	 qs 모듈(npm 패키지,querystring 확장)을 사용하여 쿼리 스트링 해석



req.on('data'), req.on('end') 과 같이 사용할 필요 없어짐

해당 패키지가 내부적으로 스트림 처리, req.body 에 추가해줌



JSON -> JSON형식으로 req.body에 들어감

url-encoded -> JSON 형식으로 req.body에 들어감

name=zerocho&book=nodej -> { name: 'zerocho', book: 'nodejs' }





### cookie-parser

요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만듦({ name: 'zerocho' }), 한마디로 쿠키를 파싱해줌

유효 기간이 지난 쿠키는 알아서 걸러냄

```js
app.use(cookieParser(비밀키));
```

서명된 쿠키가 있는 경우 제공한 비밀키를 통해 해당 쿠키가 본 서버에서 만들어졌는지 검증 가능

쿠키는 클라이언트에서 위조하기 쉬우므로 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙임

-> 속성:값.sign 과 같은 모양이 됨, req.signedCookies 객체에 들어 있음



##### 쿠키생성 res.cookie(키, 값, 옵션)

<a href="#cookieOption">쿠키 옵션</a>

-> signd 옵션 true 설정시 쿠키 뒤에 서명이 붙어 내 서버가 쿠키를 만들었다는걸 검증할 수 있음

​	서명을 위한 비밀 키는 cookieParser 미들웨어에 인수로 넣은 process.env.COOKIE_SECRET이 됨

ex)

```js
res.cookie('name', 'zerocho', {
  expires: new Date(Date.now() + 900000),
  httpOnly: true,
  secure: true,
});
```



##### 쿠키제거 res.clearCookie(키, 값, 옵션)

쿠키 생성 인자(키, 값, 옵션)들과 일치해야 지워짐, 단 expires나 maxAge 옵션을 일치할 필요 X

ex)

```js
res.clearCookie('name', 'zerocho', { httpOnly: true, secure: true });
```





### express-session

세션 관리용 미들웨어, 로그인 등의 이유로 세션을 구현하거나 특정 사용자를 위한 데이터를 임시적으로 저장해줌

세션은 사용자별로 req.session 객체 안에 유지

```js
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));
```

express-session 1.5 이전 버전에는 내부적으로 cookie-parser을 사용하여 이보다 뒤에 위치해야 했었음

-> 현재는 상관 없으나 버전이 바뀔 수 있으니 그냥 뒤에 놓자

| 인수              | 설명                                                         |
| ----------------- | ------------------------------------------------------------ |
| resave            | 요청이 올 때 세션에 수정사항이 없더라도 다시 저장할지 설정   |
| saveUninitialized | 세션에 저장할 내역이 없더라도 처음부터세션을 생성할지 설정   |
| secret            | 쿠키의 서명값 지정(cookie-parser의 secret과 같게 설정하는게 좋음) |
| cookie            | 세션쿠키의 설정값<br>일반적인 쿠키의 옵션값 제공             |
| name              | 세션쿠키의 이름 설정                                         |
| store             | 메모리에 올라와있는 세션쿠키값을 DB에 연동시킴<br />보통 레디스가 자주쓰인다고함 |

req.session.name = "newName";	//세션 등록

req.sessionID;									 //세션 아이디 확인	

req.session.destroy();						//세션 모두 제거

req.session.save								//세션 강제 저장(요청이 끝날때 자동 호출되므로 거의 필요 X)



보통 세션쿠키가 서명한 쿠키 앞에는 s:가 붙음

-> encodeURLComponent함수가 같이 실행되어 s%3A가 붙고 뒤에 암호화된 쿠키가 들어감





#### 미들웨어 총정리

```js
app.use(
  morgan('dev'),
  express.static('/', path.join(__dirname, 'public')),
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(process.env.COOKIE_SECRET),
); // 연속 호출도 가능
```

<img src="https://thebook.io/img/080229/243_1.jpg">

next를 호출하지 않는 미들웨어는 res.send나 res.sendFile 등의 메서드로 응답을 보내야 함

ex) express.static과 같은 미들웨어는 정적 파일을 제공할 때 next 대신 res.sendFile 메서드로 응답을 보냄

​	=>정적 파일을 제공하는 경우 express.json, express.urlencoded, cookieParser 미들웨어는 실행되지 않음



req.session에 데이터 넣을 시 세션 유지되는 기간동안 데이터 유지됨

```js
app.use((req, res, next) => {	//요청이 끝날 때 까지만 데이터 유지됨
  req.data = '데이터 넣기';
  next();
}, (req, res, next) => {
  console.log(req.data); // 데이터 받기
  next();
});
```



미들웨어 안에 미들웨어를 넣는 방식

```js
app.use(morgan('dev'));
// 또는
app.use((req, res, next) => {
  morgan('dev')(req, res, next);
});
```

기존 미들웨어의 기능을 확장할 수 있음

```js
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    morgan('combined')(req, res, next);
  } else {
    morgan('dev')(req, res, next);
  }
});
```



### multer

이미지, 동영상 등을 비롯한 여러 가지 파일들을 멀티파트 형식으로 업로드할 때 사용하는 미들웨어

멀티파트형식이란 아래처럼 enctype이 multipart/form-data인 폼을 통해 업로드하는 데이터의 형식을 의미

```js
<form action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```



```js
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, //단위는 바이트
});
```

multer

- storage
  - destination(어디에)
  - filename(어떤이름으로 저장)
- limits



req : 요청에 대한 정보

file : 업로드한 파일에 대한 정보

done : 함수, 첫 인수에 에러가 있으면 에러를 넣고, 두번째 인수에는 실제 경로나 파일이름



req나 file을 통해 가공한 정보를 done으로 넘겨줌



단 위 코드를 사용할려면 서버에 uploads 폴더가 존재해야함

-> fs모듈로 서버 시작시 생성

```js
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
```

해당 uploads 폴더에 다양한 미들웨어가 들어가 있음

파일 하나만 업로드 하는 경우(multipart.html) 

-> single 미들웨어 사용

```js
app.post('/upload', upload.single('image'), (req, res) => { 
  console.log(req.file, req.body); 
  res.send('ok'); 
});
```

=> 업로드 결과 req.file 객체에 들어 있음



여러 파일을 업로드하는 경우(input 태그나 폼 데이터의 키가 일치할 때)

-> html의 input 태그에 multiple 사용

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="many" multiple />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

-> 미들웨어 single 대신 array로 교체

```js
app.post('/upload', upload.array('many'), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
});	
```

=> 업로드 결과 req.files 배열에 들어 있음



여러 파일을 업로드하는 경우(input 태그나 폼 데이터의 키가 일치하지 않을 때)

-> fields 미들웨어 사용

```js
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image1" />
  <input type="file" name="image2" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

-> fields 미들웨어의 인수로 input 태그의 name을 지정

```js
app.post('/upload',
  upload.fields([{ name: 'image1' }, { name: 'image2' }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  },
);
```

=>업로드 결과도 req.files.image1, req.files.image2에 각각 들어 있음



<img src="https://thebook.io/img/080229/249.jpg">



-------



### Router 객체로 라우팅 분리하기

app.get으로 다수의 페이지 연결시 코드가 난잡해짐

-> 익스프레스에서 라우터 분리할 수 있는 방법 제공

```js
//index.js
const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.send('Hello, Express');
});

module.exports = router;
```

```js
//user.js
const express = require('express');

const router = express.Router();

// GET /user 라우터
router.get('/', (req, res) => {
  res.send('Hello, User');
});

module.exports = router;
```

```js
//app.js
const indexRouter = require('./routes');
const userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});
```



```js
router.get('/', function(req, res, next) {
  next('route');
}, function(req, res, next) {
  console.log('실행되지 않습니다');
  next();
}, function(req, res, next) {
  console.log('실행되지 않습니다');
  next();
});
router.get('/', function(req, res) {
  console.log('실행됩니다');
  res.send('Hello, Express');
});
```



라우터 정규표현식

- 라우트 매개변수

```js
router.get('/user/:id', function(req, res) {
  console.log(req.params, req.query);
});
```

해당 :id 값은 req.params 객체 안에 들어 있음(req.params.id 로 조회)

다양한 라우터를 아우르는 와일드카드 역할을 하므로 일반 라우터보다는 뒤에 위치해야함

















