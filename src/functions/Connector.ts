export let Connector = function () {};

//var c1 = new Connector({ ele1: 'a', ele2: 'b', lineStyle: '1px solid red' });

export var ConnectorTemp = function (params) {
  if (typeof params == 'undefined') {
    return false;
  } // If no params then abandon.
  // Process input params.
  var ele1 = params.ele1 || ''; // First element to link
  var ele2 = params.ele2 || ''; // Second element to link
  if (ele1.length === 0 || ele2.length === 0) {
    return false;
  } // If not two element id's then abandon.

  var className = params.class || 'muConnector';

  var lineStyle = params.lineStyle || '1px solid #666666'; // CSS style for connector line.

  this.gapX1 = params.gapX1 || 0; // First element gap before start of connector, etc
  this.gapY1 = params.gapY1 || 0;
  this.gapX2 = params.gapX2 || 0;
  this.gapY2 = params.gapY2 || 0;

  this.gap = params.gap || 0; // use a single gap setting.
  if (this.gap > 0) {
    this.gapX1 = this.gap;
    this.gapY1 = this.gap;
    this.gapX2 = this.gap;
    this.gapY2 = this.gap;
  }

  var pos = function () {
    // only used for standalone drag processing.
    this.left = 0;
    this.top = 0;
  };

  this.PseudoGuid = new (function () {
    //유니크한 id 생성
    // Make a GUID to use in unique id assignment - from and credit to http://stackoverflow.com/questions/226689/unique-element-id-even-if-element-doesnt-have-one
    this.empty = '00000000-0000-0000-0000-000000000000';
    this.GetNew = function () {
      var fC = function () {
        return (((1 + Math.random()) * 0x10000) | 0)
          .toString(16)
          .substring(1)
          .toUpperCase();
      };
      return (
        fC() +
        fC() +
        '-' +
        fC() +
        '-' +
        fC() +
        '-' +
        fC() +
        '-' +
        fC() +
        fC() +
        fC()
      );
    };
  })();

  this.id = this.PseudoGuid.GetNew(); // use guid to avoid id-clashes with manual code.
  this.ele1 = $('#' + ele1);
  this.ele2 = $('#' + ele2);

  // Append the div that is the link line into the DOM
  this.lineID = 'L' + this.id;
  //선(line)엘리먼트 생성
  $('body').append(
    "<div id='" + this.lineID + "' class='" + className + "' style=  ></div>"
  );
  this.line = $('#L' + this.id);
  this.line.css({
    position: 'absolute',
    'border-left': this.lineStyle,
    'z-index': -100
  });

  // We may need to store the offsets of each element that we are connecting.
  this.offsets = [];
  this.offsets[ele1] = new pos();
  this.offsets[ele2] = new pos();

  this.link(); // show the initial link
};

/* 
this.line
.css({ left: originX, height: l, width: 0, top: originY + adj1.hp })
.css('-webkit-transform', 'rotate(' + angle + 'deg)')
.css('-moz-transform', 'rotate(' + angle + 'deg)')
.css('-o-transform', 'rotate(' + angle + 'deg)')
.css('-ms-transform', 'rotate(' + angle + 'deg)')
.css('transform', 'rotate(' + angle + 'deg)')
.css('transform-origin', '0 ' + -1 * adj1.hp + 'px');
}; */

Connector.prototype.edgeAdjust = function (a, w1, h1) {
  var w = 0,
    h = 0;

  // compute corner angles
  var ca = [];
  ca[0] = (Math.atan(w1 / h1) * 180) / 3.1415926; // RADIANS !!!
  ca[1] = 180 - ca[0];
  ca[2] = ca[0] + 180;
  ca[3] = ca[1] + 180;

  // Based on the possible sector and angle combinations work out the adjustments.
  if (this.Round(a, 0) === 0) {
    h = h1;
    w = 0;
  } else if (this.Round(a, 0) === 180) {
    h = h1;
    w = 0;
  } else if ((a > 0 && a <= ca[0]) || (a < 0 && a >= -1 * ca[0])) {
    h = h1;
    w = -1 * Math.tan(a * (3.1415926 / 180)) * h1;
  } else if (a > ca[0] && a <= 90) {
    h = Math.tan((90 - a) * (3.1415926 / 180)) * w1;
    w = w1;
  } else if (a > 90 && a <= ca[1]) {
    h = -1 * Math.tan((a - 90) * (3.1415926 / 180)) * w1;
    w = w1;
  } else if (a > ca[1] && a <= 180) {
    h = h1;
    w = -1 * Math.tan((180 - a) * (3.1415926 / 180)) * h1;
  } else if (a > -180 && a <= -1 * ca[1]) {
    h = h1;
    w = Math.tan((a - 180) * (3.1415926 / 180)) * h1;
  } else if (a > -1 * ca[1] && a <= 0) {
    h = Math.tan((a - 90) * (3.1415926 / 180)) * w1;
    w = w1;
  }

  // We now have the width and height offsets - compute the hypotenuse.
  var hp = this.hyp(w, h);

  return { hp: hp };
};
