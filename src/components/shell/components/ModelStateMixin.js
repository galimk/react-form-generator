const ModelStateMixin = function(model, callBack){
    return {
        getInitialState: function(){
            return callBack(this);
        },

        componentDidMount: function(){
            model.on('change', this._onChange, this);
        },

        componentWillUnmount: function(){
            model.off('change', this._onChange, this);
        },

        _onChange: function(){
            this.setState(callBack(this));
        }
    };
};

export default ModelStateMixin;
