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
	if (true){
		if (data.start == 2){
			let k = 0;
			for(k;k < 100; k++){
				console.log("No"+data.start+" threads value: "+k);
			}
		}else{
			console.log("No"+data.start+" threads value: "+data.start+" it's the first worker");
		}
	}
}