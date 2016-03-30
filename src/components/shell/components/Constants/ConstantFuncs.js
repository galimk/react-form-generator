/**
 * Created by amirkaudinov on 3/30/16.
 */
var ConstantFuncs = {
    notNullUndefinedOrEmpty: function(prop) {
        return [null, undefined,'', ""].indexOf(prop) === -1
    }
};

module.exports = ConstantFuncs;

