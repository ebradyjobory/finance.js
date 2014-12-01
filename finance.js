var $$ = {};

(function(){

  // Net Present Value (NPV)
  $$NPV = function (r, cf0) {
    var rate = r/100;
    var npv = 0;
    var seg = [cf0];
    for (var i = 2; i < arguments.length; i++){
      seg.push(arguments[i] / Math.pow((1 + rate), i - 1));
    }
    for (var j = 0; j < seg.length; j++) {
      npv += seg[j];
    }
    return Math.round(npv * 100) / 100
  };

}).call(this);

