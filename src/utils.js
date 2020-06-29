module.exports ={
  age: function(timestamp){
    const milisecondsYear = Date.parse(1971,1,1);
    return parseInt((Date.now() - timestamp)/milisecondsYear,10)
  },

}