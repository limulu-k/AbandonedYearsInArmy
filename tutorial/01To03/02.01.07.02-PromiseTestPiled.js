const condition = true; // true면 resolve, false면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});
// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
	  console.log("first then before resolve");
      resolve(message);
	  console.log("first then after resolve");
    });
  })
  .then((message2) => {
    console.log("seceond then message: "+message2);
    return new Promise((resolve, reject) => {
	  console.log("second then before resolve");
      resolve(message2);
	  console.log("second then after resolve");
    });
  })
  .then((message3) => {
    console.log("thired then message: "+message3);
  })
  .catch((error) => {
    console.error(error);
  });