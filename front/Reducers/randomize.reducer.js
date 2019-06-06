import url from '../config';

export default function(result='', action) {
  if(action.type == 'send') {
    //this will randomly select a result and retrieve the current timestamp
    var resultCopy = action.values[Math.floor(Math.random()*action.values.length)];
    var date = new Date();
    console.log(resultCopy);
    fetch(`${url}/save`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `result=${resultCopy.name}&url=${resultCopy.url}&date=${date}`
    });
    return resultCopy ;
  } else {
    return result;
  }
}
