var $$ = {};

(function(){

  // Net Present Value (NPV)
  $$NPV = function (rate, cf0) {
    var rate = rate/100, npv = cf0;
    for (var i = 2; i < arguments.length; i++){
      npv +=(arguments[i] / Math.pow((1 + rate), i - 1));
    }
    return Math.round(npv * 100) / 100;
  };

}).call(this);

