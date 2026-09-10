function myPromiseAll(iterabl) {
  return new Promise((resolve, reject) => {
     const res  = []
    let leftCnt =  1;
    let idx = 0
    for (const val of iterabl) {
      const pos = idx++;
      leftCnt++;
      Promise.resolve(val).then(resVal => {
        res[pos] = resVal;
        leftCnt--;
        if (leftCnt ===0) resolve(res);
      }, reject);
    }
    leftCnt--;
    if (leftCnt=== 0) resolve(res);
  });
}
module.exports = myPromiseAll
