module.exports ={
  age(timestamp){
    const milisecondsYear = Date.parse(1971,1,1);
    return parseInt((Date.now() - timestamp)/milisecondsYear,10)
  },

  date(timestamp){
    // return date to HTML format
    return new Date(timestamp).toISOString().slice(0,10);
  }

}