const {
  Worker, isMainThread, parentPort, workerData,
} = require('worker_threads');

if (isMainThread) { // 부모일 때
  const threads = new Set();
  var x;
  for (x = 0; x < 5; x++){
	  threads.add(new Worker(__filename,{
		  workerData: {start: x}
	  }));
  }
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
	if (data.start != 0){
		let k = 0;
		let key;
		if (data.start % 2 == 0){
			key = 10;
		}else{key = 100;}
		for(k;k < key; k++){
			console.log("No"+data.start+" threads value: "+k);
		}
	}else{
		console.log("No"+data.start+" threads value: "+data.start+" it's the first worker");
	}
}