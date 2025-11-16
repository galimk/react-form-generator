const ConstantFuncs = {
    notNullUndefinedOrEmpty: function(prop) {
        return [null, undefined,'', ""].indexOf(prop) === -1;
    }
};

export default ConstantFuncs;
