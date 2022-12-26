const spawn = require('child_process').spawn;

var process = spawn('python', ['./python_files/test_chile_process.py']);

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 >에러