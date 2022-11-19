const exec = require('child_process').exec;

var process = exec('ls');
console.log(process);
process.stdout.on('data', (data) => {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러