// Generated by ReScript, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as Caml_array from "bs-platform/lib/es6/caml_array.js";
import * as Webapi$Dominant from "./Webapi.bs.js";

function reduceRange(color, range) {
  return {
          min: color < range.min ? color : range.min,
          max: color > range.max ? color : range.max
        };
}

function reduceColorRange(pixel, ranges, param) {
  if (ranges !== undefined) {
    return {
            red: reduceRange(pixel.red, ranges.red),
            green: reduceRange(pixel.green, ranges.green),
            blue: reduceRange(pixel.blue, ranges.blue)
          };
  } else {
    return {
            red: {
              min: pixel.red,
              max: pixel.red
            },
            green: {
              min: pixel.green,
              max: pixel.green
            },
            blue: {
              min: pixel.blue,
              max: pixel.blue
            }
          };
  }
}

function ofColor(red, green, blue, param) {
  return {
          red: red,
          green: green,
          blue: blue
        };
}

function ofFloatArray(colorArray) {
  var _position = 0;
  var _acc = [];
  while(true) {
    var acc = _acc;
    var position = _position;
    if ((position + 3 | 0) >= colorArray.length) {
      return acc;
    }
    _acc = $$Array.append(acc, [(Caml_array.get(colorArray, position + 3 | 0), {
              red: Caml_array.get(colorArray, position + 0 | 0),
              green: Caml_array.get(colorArray, position + 1 | 0),
              blue: Caml_array.get(colorArray, position + 2 | 0)
            })]);
    _position = position + 4 | 0;
    continue ;
  };
}

function getRange(pixelArray) {
  return $$Array.fold_left((function (ranges, pixel) {
                return reduceColorRange(pixel, ranges, undefined);
              }), undefined, pixelArray);
}

function sortPixelList(pixelArray, colorRange) {
  var deltaRed = colorRange.red.max - colorRange.red.min;
  var deltaGreen = colorRange.green.max - colorRange.green.min;
  var deltaBlue = colorRange.blue.max - colorRange.blue.min;
  if (deltaRed > deltaGreen && deltaRed > deltaBlue) {
    var sortFn = function (l, r) {
      return l.red - r.red | 0;
    };
    return $$Array.sort(sortFn, pixelArray);
  }
  if (deltaGreen > deltaBlue && deltaGreen > deltaRed) {
    var sortFn$1 = function (l, r) {
      return l.green - r.green | 0;
    };
    return $$Array.sort(sortFn$1, pixelArray);
  }
  var sortFn$2 = function (l, r) {
    return l.blue - r.blue | 0;
  };
  return $$Array.sort(sortFn$2, pixelArray);
}

function colorAverage(pixelArray) {
  var squaredPixelArray = $$Array.map((function (c) {
          return {
                  red: c.red * c.red,
                  green: c.green * c.green,
                  blue: c.blue * c.blue
                };
        }), pixelArray);
  var squaredPixelsSum = $$Array.fold_left((function (v, a) {
          return {
                  red: v.red + a.red,
                  green: v.green + a.green,
                  blue: v.blue + a.blue
                };
        }), {
        red: 0,
        green: 0,
        blue: 0
      }, squaredPixelArray);
  return {
          red: Math.sqrt(squaredPixelsSum.red / pixelArray.length),
          green: Math.sqrt(squaredPixelsSum.green / pixelArray.length),
          blue: Math.sqrt(squaredPixelsSum.blue / pixelArray.length)
        };
}

function clusterize(pixelArray, square) {
  var _clusters = [pixelArray];
  var _square = square;
  while(true) {
    var square$1 = _square;
    var clusters = _clusters;
    if (square$1 === 0) {
      return clusters;
    }
    _square = square$1 - 1 | 0;
    _clusters = $$Array.fold_left($$Array.append, [], $$Array.map((function (cluster) {
                var range = getRange(cluster);
                if (range !== undefined) {
                  sortPixelList(cluster, range);
                  return [
                          $$Array.sub(cluster, 0, (cluster.length >> 1)),
                          $$Array.sub(cluster, (cluster.length >> 1), (cluster.length >> 1))
                        ];
                } else {
                  return [cluster];
                }
              }), clusters));
    continue ;
  };
}

function paletteOfClusters(clusters) {
  return $$Array.map(colorAverage, clusters);
}

function paletteOfPixelArray(pixelArray, squareOpt, param) {
  var square = squareOpt !== undefined ? squareOpt : 4;
  return $$Array.map(colorAverage, clusterize(pixelArray, square));
}

function ofImageData(imageData, square, param) {
  return paletteOfPixelArray(ofFloatArray(imageData.data), square, undefined);
}

function ofUrl(url, square, param) {
  return Webapi$Dominant.imageDataOfUrl(url).then(function (imageData) {
              return Promise.resolve(ofImageData(imageData, square, undefined));
            });
}

console.log("hellodd");

console.log(ofUrl("https://www.swapcard.com/", undefined, undefined));

export {
  reduceRange ,
  reduceColorRange ,
  ofColor ,
  ofFloatArray ,
  getRange ,
  sortPixelList ,
  colorAverage ,
  clusterize ,
  paletteOfClusters ,
  paletteOfPixelArray ,
  ofImageData ,
  ofUrl ,
  
}
/*  Not a pure module */
