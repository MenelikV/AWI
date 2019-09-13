var PBVTest = function(){
    this.type = ""
    this.TDEB = ""
    this.TFIN = ""
    this.phdeb = ""
    this.isEmpty = function(){
        if(this.type.length > 0 || this.TDEB.length > 0 || this.TFIN.length > 0 || this.phdeb.length > 0){
            return false
        }
        else{
            return true
        }
    }
};
module.exports = PBVTest