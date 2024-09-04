let admList = [];
let id = 0;

module.exports = {
   createAdm(obj){
    admList.push(obj);
   },
   listAdm(){
    return admList;
   }
}