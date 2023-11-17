// worker.js
import { parentPort }  from 'worker_threads';

parentPort.on('message', (data) => {
  console.log('Received data in worker thread:', data);
  var i=0
    while(i<100000){
       console.log(i);
       i++
    }
     const result = data * 2;
  // Send the result back to the main thread
  parentPort.postMessage({ result });
});