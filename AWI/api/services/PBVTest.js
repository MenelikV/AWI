var PBVTest = function(){
    this.type = ""
    this.tdeb = ""
    this.tfin = ""
    this.phdeb = ""
    this.isEmpty = function(){
        if(this.type.length > 0 || this.tdeb.length > 0 || this.tfin.length > 0 || this.phdeb.length > 0){
            return false
        }
        else{
            return true
        }
    }
};
module.exports = PBVTest