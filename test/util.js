module.exports = {

    waitElement : function(element, time_out){
        try{
            if(element.waitForExist({timeout : time_out})){
                if(element.waitForDisplayed({timeout : time_out})){
                    return true;
                }
            }
        }catch(error){
            return false;
        }
    }
}