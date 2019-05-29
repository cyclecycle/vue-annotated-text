(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["annotated-text"] = factory(require("vue"));
	else
		root["annotated-text"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1c4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("9b43");
var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var toLength = __webpack_require__("9def");
var createProperty = __webpack_require__("f1ae");
var getIterFn = __webpack_require__("27ee");

$export($export.S + $export.F * !__webpack_require__("5cc5")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.8' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bec7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const sortedInsert = (arr, val) => {
	const l = arr.length
	for (let i = 0; i < l; i++) {
		if (val <= arr[i]) {
			arr.splice(i, 0, val)
			return i
		}
	}
	arr.push(val)
	return l
}

const START = 1
const STOP = 0

const flatten = (ranges) => {
	let l, i

	const indexes = []
	const ids = []
	const types = []

	l = ranges.length
	for (i = 0; i < l; i++) {
		const range = ranges[i]

		const startI = sortedInsert(indexes, range[1])
		ids.splice(startI, 0, range[0])
		types.splice(startI, 0, START)

		const endI = sortedInsert(indexes, range[1] + range[2])
		ids.splice(endI, 0, range[0])
		types.splice(endI, 0, STOP)
	}

	const sections = []
	const state = new Map()
	state.set(ids[0], true) // initial state

	l = ids.length
	function* iterator () {
		for (i = 1; i < l; i++) {
			const index = indexes[i]
			const lastIndex = indexes[i - 1]

			if (index > lastIndex) {
				yield [
					index - lastIndex,
					Array.from(state.keys())
				]
			}
			if (types[i] === START) {
				state.set(ids[i], true)
			} else {
				state.delete(ids[i])
			}
		}
	}

	return {[Symbol.iterator]: iterator}
}

module.exports = flatten


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e2da":
/***/ (function(module, exports, __webpack_require__) {

!function() {
    var c_c = {};

    c_c.VERSION = '1.0.0';

    if (true) {
        if ( true && module.exports) {
            exports = module.exports = c_c;
        }
        exports.c_c = c_c;
    } else {}

    // color viewing helper for browser console
    c_c.print = function (color){
        var bg, fg, data;
        if(typeof window === 'undefined'){
            if(Array.isArray(color)){
                color.map(function(c){
                    console.log(c.hex() +' : '+c.command)
                })
                return;
            }else{
                console.log(color.hex());
                return color.hex();
            }
        }

        if(Array.isArray(color)){
            color.forEach(function(c){
                var value = c.values();
                bg = value.hex;
                fg = value.hsl[2] > 50 ? '#000000' : '#ffffff';
                blockCss = 'background:'+bg+'; color:'+fg+'; font-size:45px;';
                guideCss = 'background:'+bg+'; color:'+fg+'; font-size:10px;';
                console.log('%c  ', blockCss);
                console.log('%c '+bg+' ', guideCss);
                console.log(c.command);
            });
            return {
                hex: color.map(function(c){ return c.hex(); }),
                rgba: color.map(function(c){ return c.rgba(); }),
                hsl: color.map(function(c){ return c.hsl(); })
            }
        }

        if(color.values){
            bg = color.hex();
            fg = color.hsl()[2]>50 ? '#000000' : '#ffffff';
        }else{
            bg = color.hex;
            fg = '#ffffff';
        }
        blockCss = 'background:'+bg+';color:'+fg+';font-size:45px;';
        guideCss = 'background:'+bg+';color:'+fg+';font-size:10px;';
        console.log('%c  ', blockCss);
        console.log('%c '+bg+' ', guideCss);
        console.log(color.command);

        return [color.hex()];
    };

    //  base color object constructor
    var Color = c_c.Color = function(opt){
        var rgbaval, hexval, hslaval, name;

        this.command = 'base';
        this.subcolors = [];

        this.hex = function(str){
            if(arguments.length <= 0){ return hexval; }
            hexval  = str.toLowerCase();
            rgbaval = hexToRGB(hexval);
            hslaval = rgbToHSL(rgbaval);
            name    = hexToName(hexval);
        };

        this.rgb = function(r,g,b){
            if(arguments.length <= 0){ return rgbaval.slice(0,3); }
            this.rgba(r,g,b,1);
        };

        this.rgba = function(r,g,b,a){
            if(arguments.length <= 0){ return rgbaval; }
            rgbaval = [r,g,b,a];
            hexval  = rgbToHEX(rgbaval);
            hslaval = rgbToHSL(rgbaval);
            name    = hexToName(hexval);
        };

        this.hsl = function(h,s,l){
            if(arguments.length <= 0){ return hslaval.slice(0,3); }
            this.hsla(h,s,l,1);
        };

        this.hsla = function(h,s,l,a){
            if(arguments.length <= 0){ return hslaval; }
            hslaval = [h,s,l,a];
            rgbaval = hslToRGB(hslaval);
            hexval  = rgbToHEX(rgbaval);
            name    = hexToName(hexval);
        };

        this.mix = function(color1, color2, w){
            var weight = w ? w : 50,
                base   = color1.rgba(),
                brend  = color2.rgba(),
                newcolor = base.map(function(c,i){
                    if(i === 3){
                        return brend[i] + (c - brend[i]) * (weight / 100);
                    }
                    return Math.floor(brend[i] + (c - brend[i]) * (weight / 100));
                });

            rgbaval = newcolor;
            hexval  = rgbToHEX(rgbaval);
            hslaval = rgbToHSL(rgbaval);
            name    = hexToName(hexval);
        };

        this.name = function(str) {
            if(arguments.length <= 0){ return name;} 
            if (getKeys(colorDict).indexOf(str) < 0){ return; }
            hexval  = colorDict[str];
            rgbaval = hexToRGB(hexval);
            hslaval = rgbToHSL(rgbaval);
            name    = hexToName(hexval);
        };

        this.values = function(){
            return {rgb: this.rgb(),
                    rgba: this.rgba(),
                    hex: this.hex(),
                    hsl: this.hsl(),
                    hsla: this.hsla(),
                    name: name};
        };

        this.set = function(opt){
            var options = {
                            hex: function(arg){ this.hex.call(this,arg); },
                            rgb: function(arg){ this.rgb.apply(this,arg); },
                            rgba: function(arg){ this.rgba.apply(this,arg); },
                            hsl: function(arg){ this.hsl.apply(this,arg); },
                            hsla: function(arg){ this.hsla.apply(this,arg); },
                            mix: function(arg){ this.mix.apply(this,arg); },
                            name: function(arg){ this.name.call(this,arg); }
                        },
                key = getKeys(opt)[0];
            options[key].call(this,opt[key]);
        };

        if(opt){ this.set(opt); }
    };

    Color.prototype = {
        red: function(){
           return this.hex().substr(1, 2);
        },
        green: function(){
            return this.hex().substr(3, 2);
        },
        blue: function(){
            return this.hex().substr(5, 2);
        },
        hue: function(){
            return this.hsl()[0];
        },
        saturation: function(){
            return this.hsl()[1];
        },
        lightness: function(){
            return this.hsl()[2];
        },
        alpha: function(){
            return this.rgba()[3];
        },
        opacity: function(){
            return this.alpha();
        },
        subcolormix: function(c1, c2, w, save) {
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.subcolormix(c1, c2, w, false);
                            },
                            'subcolormix('+c1.command+','+c2.command+','+w+')'
                        );
            }
            var weight = w ? w : 50,
                base = c1.rgba(),
                brend = c2.rgba(),
                newcolor = base.map(function(c,i){
                    if(i === 3){ return brend[i] + (c - brend[i]) * (weight / 100); }
                    return Math.floor(brend[i] + (c - brend[i]) * (weight / 100));
                });
            return {rgb: newcolor.slice(0, 3),
                    rgba: newcolor,
                    hex: rgbToHEX(newcolor),
                    hsl: rgbToHSL(newcolor),
                    hsla: rgbToHSL(newcolor).concat([newcolor[3]])};
        },
        invert: function(save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.invert(false); },
                            'invert()'
                        );
            }
            var inverted = this.rgba().map(function(c,i){
                if(i === 3) { return c; }
                return 255 - c;
            });
            return {rgb: inverted.slice(0, 3),
                    rgba: inverted,
                    hex: rgbToHEX(inverted),
                    hsl: rgbToHSL(inverted),
                    hsla: rgbToHSL(inverted).concat([inverted[3]])};
        },
        adjust_red: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.adjust_red(deg, scale, false);
                            },
                            'adjust_red('+deg+','+scale+')'
                        );
            }
            var hsla,
                rgba = this.rgba().slice(0);

            if(deg){
                rgba[0] = Math.max(Math.min(rgba[0] + deg, 255),0);
            }else{
                scale >= 0
                    ? rgba[0] = Math.floor((255 - rgba[0]) * scale/100 + rgba[0])
                    : rgba[0] = Math.floor(rgba[0] * Math.abs(scale)/100);
            }

            hsla = rgbToHSL(rgba);
            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_green: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ 
                                return this.adjust_green(deg, scale, false);
                            },
                            'adjust_green('+deg+','+scale+')'
                        );
            }
            var hsla,
                rgba = this.rgba().slice(0);

            if(deg){
                rgba[1] = Math.max(Math.min(rgba[1] + deg, 255),0);
            }else{
                scale>=0
                ? rgba[1] = Math.floor((255-rgba[1])*scale/100+rgba[1])
                : rgba[1] = Math.floor(rgba[1]*Math.abs(scale)/100);
            }

            hsla = rgbToHSL(rgba);
            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_blue: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.adjust_blue(deg, scale, false);
                            },
                            'adjust_blue('+deg+','+scale+')'
                        );
            }
            var hsla,
                rgba = this.rgba().slice(0);

            if(deg){
                rgba[2] = Math.max(Math.min(rgba[2] + deg, 255),0);
            }else{
                scale >= 0
                    ? rgba[2] = Math.floor((255 - rgba[2]) * scale/100 + rgba[2])
                    : rgba[2] = Math.floor(rgba[2] * Math.abs(scale)/100);
            }

            hsla = rgbToHSL(rgba);
            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_hue: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.adjust_hue(deg, false); },
                            'adjust_hue('+deg+')'
                        );
            }
            var rgb,
                hsla = this.hsla().slice(0),
                diff = 360 - (hsla[0] + deg);

            hsla[0] = diff > 360 ? 360 - (diff % 360) : Math.abs(diff % 360);
            rgba = hslToRGB(hsla);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_saturation: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.adjust_saturation(deg, scale, false);
                            },
                            'adjust_saturation('+deg+','+scale+')'
                        );
            }
            var rgb,
                hsla = this.hsla().slice(0);

            if(deg){
                hsla[1] = Math.max(Math.min(hsla[1] + deg, 100),0);
            }else{
                scale >= 0
                    ? hsla[1] = Math.floor((100 - hsla[1]) * scale/100 + hsla[1])
                    : hsla[1] = Math.floor(hsla[1] * Math.abs(scale)/100);
            }

            rgba = hslToRGB(hsla);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_lightness: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.adjust_lightness(deg, scale, false);
                            },
                            'adjust_lightness('+deg+','+scale+')'
                        );
            }
            var rgb,
                hsla = this.hsla().slice(0);

            if(deg){
                hsla[2] = Math.max(Math.min(hsla[2] + deg, 100),0);
            }else{
                scale >= 0
                    ? hsla[2] = Math.floor((100 - hsla[2]) * scale/100 + hsla[2])
                    : hsla[2] = Math.floor(hsla[2] * Math.abs(scale)/100);
            }

            rgba = hslToRGB(hsla);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        adjust_alpha: function(deg,scale,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){
                                return this.adjust_alpha(deg, scale, false);
                            },
                            'adjust_alpha('+deg+','+scale+')'
                        );
            }
            var rgba = this.rgba().slice(0),
                hsla = this.hsla().slice(0),
                a;

            if(deg){
                a = Math.round(Math.max(Math.min(this.alpha(color) + deg, 1),0) * 100)/100;
            }else{
                scale >= 0
                    ? a = Math.floor((1 - this.alpha(color)) * scale + (this.alpha(color) * 100))/100
                    : a = Math.floor(this.alpha(color) * Math.abs(scale))/100;
            }

            rgba[3] = a;
            hsla[3] = a;
            return {rgba: rgba,
                    hsla: hsla};
        },
        complement: function(save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.complement(false); },
                            'complement()'
                        );
            }
            return this.adjust_hue(180, false);
        },
        saturate: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.saturate(deg, false); },
                            'saturate('+deg+')'
                        );
            }
            return this.adjust_saturation(deg, false);
        },
        desaturate: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.desaturate(-deg, false); },
                            'desaturate('+deg+')'
                        );
            }
            return this.adjust_saturation(-deg, false);
        },
        grayscale: function(save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.grayscale(false); },
                            'grayscale()'
                        );
            }
            return this.adjust_saturation(100, false);
        },
        lighten: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.lighten(deg, false); },
                            'lighten('+deg+')'
                        );
            }
            return this.adjust_lightness(deg, false, false);
        },
        darken: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.darken(deg, false); },
                            'darken('+deg+')'
                        );
            }
            return this.adjust_lightness(-deg, false, false);
        },
        opacify: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.opacify(deg, false); },
                            'opacify('+deg+')'
                        );
            }
            return this.adjust_alpha(deg, false);
        },
        transparentize: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.transparentize(deg, false); },
                            'transparentize('+deg+')'
                        );
            }
            return this.adjust_alpha(-deg, false);
        },
        fade_in: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.fade_in(deg, false); },
                            'fade_in('+deg+')'
                        );
            }
            return this.adjust_alpha(deg, false);
        },
        fade_out: function(deg,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.fade_out(deg, false); },
                            'fade_out('+deg+')'
                        );
            }
            return this.adjust_alpha(-deg, false);
        },
        adjust_color: function(opt,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.adjust_color(opt, false); },
                            'adjust_color('+opt+')'
                        );
            }
            var rgba = this.rgba().slice(0),
                hsla = this.hsla().slice(0),
                operations = {
                    red: function(deg){ rgba[0] = this.adjust_red(deg,false,save).rgba[0]; },
                    green: function(deg){ rgba[1] = this.adjust_green(deg,false,save).rgba[1]; },
                    blue: function(deg){ rgba[2] = this.adjust_blue(deg,false,save).rgba[2]; },
                    hue: function(deg){ hsla[0] = this.adjust_hue(deg,save).hsla[0]; },
                    saturation: function(deg){ hsla[1] = this.adjust_saturation(deg,false,save).hsla[1]; },
                    lightoness: function(deg){ hsla[2] = this.adjust_lightness(deg,false,save).hsla[2]; },
                    alpha: function(deg){
                            var a =  this.adjust_alpha(deg,false,save).hsla[3];
                            rgba[3] = a;
                            hsla[3] = a;
                        }
                };

            getKeys(opt).forEach(function(key){
                operations[key].call(this,opt[key]);
            },this);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        scale_color: function(opt,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.scale_color(opt, save); },
                            'scale_color('+opt+')'
                        );
            }
            var rgba = this.rgba().slice(0),
                hsla = this.hsla().slice(0),
                operations = {
                    red: function(scale){ rgba[0] = this.adjust_red(null,scale,save).rgba[0]; },
                    green: function(scale){ rgba[1] = this.adjust_green(null,scale,save).rgba[1]; },
                    blue: function(scale){ rgba[2] = this.adjust_blue(null,scale,save).rgba[2]; },
                    saturation: function(scale){ hsla[1] = this.adjust_saturation(null,scale,save).hsla[1]; },
                    lightness: function(scale){ hsla[2] = this.adjust_lightness(null,scale,save).hsla[2]; },
                    alpha: function(scale){
                            var a =  this.adjust_alpha(null,scale,save).hsla[3];
                            rgba[3] = a;
                            hsla[3] = a;
                        }
                };

            getKeys(opt).forEach(function(key){
                operations[key].call(this,opt[key]);
            },this);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },
        change_color: function(opt,save){
            if(save===undefined||save===true){
                return addSubColor
                        .call(
                            this,
                            function(){ return this.change_color(opt, false); },
                            'change_color('+opt+')'
                        );
            }
            var rgba = this.rgba().slice(0),
                hsla = this.hsla().slice(0),
                operations = {
                    red: function(val){ rgba[0] = val; },
                    green: function(val){ rgba[1] = val; },
                    blue: function(val){ rgba[2] = val; },
                    hue: function(val){ hsla[0] = val; },
                    saturation: function(val){ hsla[1] = val; },
                    lightness: function(val){ hsla[2] = val; },
                    alpha: function(val){
                            rgba[3] = val;
                            hsla[3] = val;
                        }
                };

            Object.keys(opt).forEach(function(key){
                operations[key].call(this,opt[key]);
            },this);

            return {rgb: rgba.slice(0, 3),
                    rgba: rgba,
                    hex: rgbToHEX(rgba),
                    hsl: hsla.slice(0, 3),
                    hsla: hsla};
        },

        // Color Sets
        lighten_set: function(n){
            var arr = [this];
            var step = 100/ n;
            for(var i=1;i<n;i++){
                arr.push(this.adjust_lightness(null, step*i))
            }
            return arr;
        },
        darken_set: function(n){
            var arr = [this];
            var step = 100/ n;
            for(var i=n-1;i>0;i--){
                arr.push(this.adjust_lightness(null, -(step*i)))
            }
            return arr;
        },
        complement_set: function(n){
            var base = this,
                comp = this.complement(),
                arr = [],
                step = 100/ (n-1);

            for(var i=n-1;i>=0;i--){
                if(i==n-1){arr.push(base);
                }else if(i==0){arr.push(comp);
                }else{arr.push(this.subcolormix(base, comp, step*i))}
            }
            return arr;
        },
        invert_set: function(n){
            var base = this,
                inv = this.invert();
                arr = [],
                step = 100/ (n-1);

            for(var i=n-1;i>=0;i--){
                if(i==n-1){arr.push(base);
                }else if(i==0){arr.push(inv);
                }else{arr.push(this.subcolormix(base, inv, step*i))}
            }
            return arr;
        },
        desaturate_set: function(n){
            var arr = [this];
            var step = 100/ n;
            for(var i=n-1;i>0;i--){
                arr.push(this.adjust_saturation(null, -(step*i)))
            }
            return arr;
        }
    };

    var SubColor = function(parent,func,command){
        this.parent = parent;
        this.command = command;
        this.values = function(){
            return func.call(this.parent);
        };
        this.rgba = function(){
            return this.values().rgba;
        };
        this.rgb = function(){
            return this.values().rgb;
        };
        this.hex = function(){
            return this.values().hex;
        };
        this.hsla = function(){
            return this.values().hsla;
        };
        this.hsl = function(){
            return this.values().hsl;
        };
    };

    SubColor.prototype = {
        red: function(){
           return this.hex().substr(1, 2);
        },
        green: function(){
            return this.hex().substr(3, 2);
        },
        blue: function(){
            return this.hex().substr(5, 2);
        },
        hue: function(){
            return this.hsl()[0];
        },
        saturation: function(){
            return this.hsl()[1];
        },
        lightness: function(){
            return this.hsl()[2];
        },
        alpha: function(){
            return this.rgba()[3];
        },
        opacity: function(){
            return this.alpha();
        }
    };

    var colorDict = {
            'aqua': '#00ffff',
            'aliceblue': '#f0f8ff',
            'antiquewhite': '#faebd7',
            'black': '#000000',
            'blue': '#0000ff',
            'cyan': '#00ffff',
            'darkblue': '#00008b',
            'darkcyan': '#008b8b',
            'darkgreen': '#006400',
            'darkturquoise': '#00ced1',
            'deepskyblue': '#00bfff',
            'green': '#008000',
            'lime': '#00ff00',
            'mediumblue': '#0000cd',
            'mediumspringgreen': '#00fa9a',
            'navy': '#000080',
            'springgreen': '#00ff7f',
            'teal': '#008080',
            'midnightblue': '#191970',
            'dodgerblue': '#1e90ff',
            'lightseagreen': '#20b2aa',
            'forestgreen': '#228b22',
            'seagreen': '#2e8b57',
            'darkslategray': '#2f4f4f',
            'darkslategrey': '#2f4f4f',
            'limegreen': '#32cd32',
            'mediumseagreen': '#3cb371',
            'turquoise': '#40e0d0',
            'royalblue': '#4169e1',
            'steelblue': '#4682b4',
            'darkslateblue': '#483d8b',
            'mediumturquoise': '#48d1cc',
            'indigo': '#4b0082',
            'darkolivegreen': '#556b2f',
            'cadetblue': '#5f9ea0',
            'cornflowerblue': '#6495ed',
            'mediumaquamarine': '#66cdaa',
            'dimgray': '#696969',
            'dimgrey': '#696969',
            'slateblue': '#6a5acd',
            'olivedrab': '#6b8e23',
            'slategray': '#708090',
            'slategrey': '#708090',
            'lightslategray': '#778899',
            'lightslategrey': '#778899',
            'mediumslateblue': '#7b68ee',
            'lawngreen': '#7cfc00',
            'aquamarine': '#7fffd4',
            'chartreuse': '#7fff00',
            'gray': '#808080',
            'grey': '#808080',
            'maroon': '#800000',
            'olive': '#808000',
            'purple': '#800080',
            'lightskyblue': '#87cefa',
            'skyblue': '#87ceeb',
            'blueviolet': '#8a2be2',
            'darkmagenta': '#8b008b',
            'darkred': '#8b0000',
            'saddlebrown': '#8b4513',
            'darkseagreen': '#8fbc8f',
            'lightgreen': '#90ee90',
            'mediumpurple': '#9370db',
            'darkviolet': '#9400d3',
            'palegreen': '#98fb98',
            'darkorchid': '#9932cc',
            'yellowgreen': '#9acd32',
            'sienna': '#a0522d',
            'brown': '#a52a2a',
            'darkgray': '#a9a9a9',
            'darkgrey': '#a9a9a9',
            'greenyellow': '#adff2f',
            'lightblue': '#add8e6',
            'paleturquoise': '#afeeee',
            'lightsteelblue': '#b0c4de',
            'powderblue': '#b0e0e6',
            'firebrick': '#b22222',
            'darkgoldenrod': '#b8860b',
            'mediumorchid': '#ba55d3',
            'rosybrown': '#bc8f8f',
            'darkkhaki': '#bdb76b',
            'silver': '#c0c0c0',
            'mediumvioletred': '#c71585',
            'indianred': '#cd5c5c',
            'peru': '#cd853f',
            'chocolate': '#d2691e',
            'tan': '#d2b48c',
            'lightgray': '#d3d3d3',
            'lightgrey': '#d3d3d3',
            'thistle': '#d8bfd8',
            'goldenrod': '#daa520',
            'orchid': '#da70d6',
            'palevioletred': '#db7093',
            'crimson': '#dc143c',
            'gainsboro': '#dcdcdc',
            'plum': '#dda0dd',
            'burlywood': '#deb887',
            'lightcyan': '#e0ffff',
            'lavender': '#e6e6fa',
            'darksalmon': '#e9967a',
            'palegoldenrod': '#eee8aa',
            'violet': '#ee82ee',
            'azure': '#f0ffff',
            'honeydew': '#f0fff0',
            'khaki': '#f0e68c',
            'lightcoral': '#f08080',
            'sandybrown': '#f4a460',
            'beige': '#f5f5dc',
            'mintcream': '#f5fffa',
            'wheat': '#f5deb3',
            'whitesmoke': '#f5f5f5',
            'ghostwhite': '#f8f8ff',
            'lightgoldenrodyellow': '#fafad2',
            'linen': '#faf0e6',
            'salmon': '#fa8072',
            'oldlace': '#fdf5e6',
            'bisque': '#ffe4c4',
            'blanchedalmond': '#ffebcd',
            'coral': '#ff7f50',
            'cornsilk': '#fff8dc',
            'darkorange': '#ff8c00',
            'deeppink': '#ff1493',
            'floralwhite': '#fffaf0',
            'fuchsia': '#ff00ff',
            'gold': '#ffd700',
            'hotpink': '#ff69b4',
            'ivory': '#fffff0',
            'lavenderblush': '#fff0f5',
            'lemonchiffon': '#fffacd',
            'lightpink': '#ffb6c1',
            'lightsalmon': '#ffa07a',
            'lightyellow': '#ffffe0',
            'magenta': '#ff00ff',
            'mistyrose': '#ffe4e1',
            'moccasin': '#ffe4b5',
            'navajowhite': '#ffdead',
            'orange': '#ffa500',
            'orangered': '#ff4500',
            'papayawhip': '#ffefd5',
            'peachpuff': '#ffdab9',
            'pink': '#ffc0cb',
            'red': '#ff0000',
            'seashell': '#fff5ee',
            'snow': '#fffafa',
            'tomato': '#ff6347',
            'white': '#ffffff',
            'yellow': '#ffff00',
            'rebeccapurple': '#663399',
        };

    function subColorIndex(command){
        var arr = pluck(this.subcolors, 'command');
        return arr.indexOf(command);
    }
    function addSubColor(fn, command){
            if(subColorIndex.call(this, command) === -1){
                var sub = new SubColor(this, fn, command);
                this.subcolors.push(sub);
            }
            return this.subcolors[subColorIndex.call(this, command)];
        }
    function pluck(arr,key){
        return arr.map(function(d){ return d[key]; });
    }
    function getKeys(obj){
        return Object.keys(obj);
    }

    function getValues(obj){
        return  getKeys(obj).map(function(k){ return obj[k]; });
    }

    function findValue(obj,keyword){
        return getKeys(obj)[getValues(obj).indexOf(keyword)];
    }

    function hexToName(hex){
        return findValue(colorDict,hex);
    }

    // Conversion Functions
    function rgbToHEX(rgba){
        var rgb = rgba.slice(0,3);
        function d2h(d) {
            var hex = d.toString(16);
            hex = '00'.substr( 0, 2 - hex.length ) + hex;
            return hex;
        }

        return '#'+rgb.map(d2h).join('').toLowerCase();
    }

    function hexToRGB(hex){

        function h2d(h) {
            var decimal = parseInt(h, 16);
            return decimal;
        }

        return [
            h2d(hex.substr(1,2)),
            h2d(hex.substr(3,2)),
            h2d(hex.substr(5,2)),
        ].concat([1]);
    }

    function rgbToHSL(rgba){
        var r = rgba[0] / 255,
            g = rgba[1] / 255,
            b = rgba[2] / 255,
            max = Math.max(r,g,b),
            min = Math.min(r,g,b),
            h,
            s,
            l = (max + min) / 2,
            d = max - min,
            huecalc = {};
            huecalc[r] = function(){ return (60 * (g - b) / d) + (g < b ? 360 : 0); };
            huecalc[g] = function(){ return (60 * (b - r) / d) + 120; };
            huecalc[b] = function(){ return (60 * (r - g) / d) + 240; };
        if(d === 0){
            h = s = 0; // grayscaled color
        }else{
            s = l < 0.5 ? d / (max + min) : d / (2 - max - min) ;
            h = huecalc[String(max)]();
        }
        return [Math.round(h), Math.round(s*100), Math.round(l*100)].concat([rgba[3]]);
    }

    function hslToRGB(hsla){
        var r,
            g,
            b,
            h = hsla[0] / 360,
            s = hsla[1] / 100,
            l = hsla[2] / 100;

        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        if(s === 0){
            r = g = b = l; // grayscaled color
        }else{
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [r,g,b].map(function(c){ return Math.round(c*255); }).concat([hsla[3]]);
    }

    return c_c;

}();


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6245cf80-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AnnotatedText.vue?vue&type=template&id=12efb211&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('ComposedText',{attrs:{"spans":_vm.spans,"annotations":_vm.annotations,"getAnnotationColor":_vm.getAnnotationColor,"getAnnotationInfo":_vm.getAnnotationInfo}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/AnnotatedText.vue?vue&type=template&id=12efb211&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6245cf80-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ComposedText.vue?vue&type=template&id=60f49e1e&
var ComposedTextvue_type_template_id_60f49e1e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',_vm._l((_vm.spans),function(span){return _c('span',{key:span.id,style:(_vm.getSpanStyle(span))},[_vm._v(_vm._s(span.text))])}),0)}
var ComposedTextvue_type_template_id_60f49e1e_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ComposedText.vue?vue&type=template&id=60f49e1e&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/color-mixer/colormixer.js
var colormixer = __webpack_require__("e2da");
var colormixer_default = /*#__PURE__*/__webpack_require__.n(colormixer);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ComposedText.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ComposedTextvue_type_script_lang_js_ = ({
  name: 'ComposedText',
  props: {
    spans: Array,
    annotations: Array,
    getAnnotationColor: Function,
    getAnnotationInfo: Function
  },
  // mounted() {
  //   console.log(this.spans)
  // },
  methods: {
    getSpanAnnotations: function getSpanAnnotations(span) {
      var annotations = this.annotations.filter(function (annotation) {
        return span.annotation_ids.includes(annotation.id);
      });
      return annotations;
    },
    getSpanStyle: function getSpanStyle(span) {
      return {
        backgroundColor: this.getSpanColor(span)
      };
    },
    getSpanColor: function getSpanColor(span) {
      var _this = this;

      var color = null;
      var annotations = this.getSpanAnnotations(span);
      var colors = annotations.map(function (annotation) {
        return _this.getAnnotationColor(annotation);
      });

      if (colors.length > 1) {
        colors = colors.map(function (color) {
          return new colormixer_default.a.Color({
            hex: color
          });
        });
        var mix = new colormixer_default.a.Color({
          mix: colors
        });
        color = mix.hex();
      } else {
        color = colors[0];
      }

      return color;
    } // getSpanInfo: function(span) {
    //   return 'Span info'
    // },

  }
});
// CONCATENATED MODULE: ./src/components/ComposedText.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ComposedTextvue_type_script_lang_js_ = (ComposedTextvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/ComposedText.vue





/* normalize component */

var component = normalizeComponent(
  components_ComposedTextvue_type_script_lang_js_,
  ComposedTextvue_type_template_id_60f49e1e_render,
  ComposedTextvue_type_template_id_60f49e1e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ComposedText = (component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// CONCATENATED MODULE: ./src/util/buildSpanList.js



var flatten = __webpack_require__("bec7");

var buildSpanList = function buildSpanList(text, annotations) {
  // Prepare range list to send to flatten-overlapping-spans.flatten()
  var ranges = [];
  var fullRange = ["baseText", 0, text.length];
  ranges.push(fullRange);
  var annotationRanges = annotations.map(function (annotation) {
    return [annotation.id, annotation.start, annotation.length];
  });
  ranges = ranges.concat(annotationRanges); // Flatten

  var sections = Array.from(flatten(ranges)); // Each section becomes a span

  var sectionTextStart = 0;
  var spanId = 0;
  var spans = sections.map(function (section) {
    var length = section[0];
    var annotations = section[1];
    var start = sectionTextStart;
    var end = sectionTextStart + length;
    var sectionText = text.slice(start, end);
    var span = {
      id: spanId,
      start: start,
      length: length,
      text: sectionText,
      annotation_ids: annotations
    };
    spanId = spanId + 1;
    sectionTextStart = end;
    return span;
  });
  return spans;
};
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AnnotatedText.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var AnnotatedTextvue_type_script_lang_js_ = ({
  name: 'AnnotatedText',
  components: {
    ComposedText: ComposedText
  },
  props: {
    text: String,
    annotations: Array,
    getAnnotationColor: Function,
    getAnnotationInfo: Function
  },
  computed: {
    spans: function spans() {
      var spans = buildSpanList(this.text, this.annotations);
      return spans;
    }
  }
});
// CONCATENATED MODULE: ./src/components/AnnotatedText.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_AnnotatedTextvue_type_script_lang_js_ = (AnnotatedTextvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/AnnotatedText.vue





/* normalize component */

var AnnotatedText_component = normalizeComponent(
  components_AnnotatedTextvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var AnnotatedText = (AnnotatedText_component.exports);
// CONCATENATED MODULE: ./src/components/index.js







var Components = {
  AnnotatedText: AnnotatedText,
  ComposedText: ComposedText
};
Object.keys(Components).forEach(function (name) {
  external_commonjs_vue_commonjs2_vue_root_Vue_default.a.component(name, Components[name]);
});
/* harmony default export */ var components = (Components);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (components);



/***/ })

/******/ });
});
//# sourceMappingURL=annotated-text.umd.js.map