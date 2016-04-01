var Clock = Backbone.Model.extend({
    clockDate: null,

    initialize: function(options) {

    },

    defaults: {
      clockType: 'digital'  
    }

});

var clock = new Clock();
