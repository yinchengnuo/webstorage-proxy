
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.WebStorageProxy = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function CookieProxy () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    console.log(arg);
  }

  var StorageProxy = function StorageProxy() {
    _classCallCheck(this, StorageProxy);

    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    console.log(arg);
    this.state = Object.create(this);
    this.type = arg[0];
  };

  function IndexDBProxy () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    console.log(arg);
  }

  function error (type, msg) {
    try {
      switch (type) {
        case 'TypeError':
          {
            throw new TypeError(msg);
          }

        case 'ReferenceError':
          {
            throw new ReferenceError(msg);
          }

        case 'RangeError':
          {
            throw new RangeError(msg);
          }

        default:
          {
            throw new Error(msg);
          }
      }
    } catch (e) {
      console.error(e);
      return e.message;
    }
  }

  function _init (arg) {
    switch (arg[0]) {
      case 'cookie':
        {
          return _construct(CookieProxy, _toConsumableArray(arg));
        }

      case 'sessionStorage' :
        {
          var _console;

          (_console = console).log.apply(_console, _toConsumableArray(arg));

          return _construct(StorageProxy, _toConsumableArray(arg));
        }

      case 'indexDB':
        {
          return _construct(IndexDBProxy, _toConsumableArray(arg));
        }

      default:
        {
          return error('TypeError', "\u53C2\u6570\u4E0D\u5408\u6CD5!\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF08\u6700\u5C11\u65F6\u552F\u4E00\u7684\u53C2\u6570\uFF09\u5E94\u8BE5\u662F'coookie'\u3001'sessionSorage'\u3001'localStorage'\u3001'indexDB'\u4E2D\u7684\u4E00\u4E2A\u3002");
        }
    }
  }

  var WebStorageProxy = function WebStorageProxy() {
    _classCallCheck(this, WebStorageProxy);

    return _init(arguments);
  };

  return WebStorageProxy;

}));
