
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

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function staticMount (WebStorageProxy) {
    console.log('包装static方法');
    return WebStorageProxy;
  }

  function CookieProxy () {
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
      return e;
    }
  }

  function reWrite () {
    var _this = this;

    this.CLEAR = Symbol('clear');
    this.GETITEM = Symbol('getItem');
    this.SETITEM = Symbol('setItem');
    this.REMOVEITEM = Symbol('removeItem');

    var isProvied = function isProvied(key) {
      return key.split(':')[0] === _this.flag || key.split(':')[0] === _this.nameSpaceFlag;
    };

    var newed = function newed(key) {
      return key === _this.key;
    };

    var throwError = function throwError() {
      return error('ReferenceError', "\u4F60\u5FC5\u987B\u4F7F\u7528 WebStorageProxy \u5BF9\u8C61\u7684api\u6765\u64CD\u4F5C WebStorageProxy \u4EA7\u751F\u7684\u6570\u636E\u3002");
    };

    var StorageProxy = this;
    var storage = window[StorageProxy.type];
    Storage.prototype[this.CLEAR] = Storage.prototype.clear;
    Storage.prototype[this.GETITEM] = Storage.prototype.getItem;
    Storage.prototype[this.SETITEM] = Storage.prototype.setItem;
    Storage.prototype[this.REMOVEITEM] = Storage.prototype.removeItem;

    Storage.prototype.clear = function () {
      for (var i = 0; i < storage.length; i++) {
        if (!isProvied(storage.key(0))) {
          this.removeItem(storage.key(0));
        }
      }
    };

    Storage.prototype.getItem = function (key) {
      if (isProvied(key)) {
        throwError();
      } else if (newed) {
        throw new ReferenceError("WebStorageProxy \u53EA\u80FD new \u4E00\u6B21\u3002");
      } else {
        return storage[StorageProxy.GETITEM](key);
      }
    };

    Storage.prototype.setItem = function (key, value) {
      if (isProvied(key)) {
        throwError();
      } else {
        storage[StorageProxy.SETITEM](key, value);
      }
    };

    Storage.prototype.removeItem = function (key) {
      if (isProvied(key)) {
        throwError();
      } else {
        storage[StorageProxy.REMOVEITEM](key);
      }
    };
  }

  // import isArray from 'lodash/isArray'
  // import isObject from 'lodash/isObject'
  function _proxy () {
    var StorageProxy = this; // const proxy = state => {
    //     const proxyed = 
    // }

    if (StorageProxy.nameSpace) {
      return new Proxy(this, {
        set: function set() {
          if (Super.nameSpace) {
            console.log(Super.nameSpace);
          } else {
            console.log('set');
          }
        },
        get: function get() {
          if (Super.nameSpace) {
            var space = window[Super.type].getItem("_NAMESPACE:".concat(Super.nameSpace)) ? JSON.parse(window[Super.type].getItem("_NAMESPACE:".concat(Super.nameSpace))) : {};
            console.log(space);

            for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
              arg[_key] = arguments[_key];
            }

            return space[arg[1]];
          } else {
            console.log('set');
          }
        }
      });
    } // return new Proxy(this, {
    //     set () {
    //         if (Super.nameSpace) {
    //             console.log(Super.nameSpace)
    //         } else {
    //             console.log('set')
    //         }
    //     },
    //     get (...arg) {
    //         if (Super.nameSpace) {
    //             const space = window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`) ? JSON.parse(window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`)) : {}
    //             console.log(space)
    //             return space[arg[1]]
    //         } else {
    //             console.log('set')
    //         }
    //     }
    // })

  }

  var SuperProxy =
  /*#__PURE__*/
  function () {
    function SuperProxy(option) {
      _classCallCheck(this, SuperProxy);

      this.option = option;
    }

    _createClass(SuperProxy, [{
      key: "proxy",
      value: function proxy() {
        return _proxy.call(this);
      }
    }]);

    return SuperProxy;
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray = Array.isArray;

  var isArray_1 = isArray;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var stringTag = '[object String]';

  /**
   * Checks if `value` is classified as a `String` primitive or object.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a string, else `false`.
   * @example
   *
   * _.isString('abc');
   * // => true
   *
   * _.isString(1);
   * // => false
   */
  function isString(value) {
    return typeof value == 'string' ||
      (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
  }

  var isString_1 = isString;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  function nameSpaceCheck (nameSpace) {
    if (nameSpace) {
      if (isString_1(nameSpace)) {
        this.nameSpace = nameSpace;
      } else if (isFunction_1(nameSpace)) {
        var nameSpaces = [];

        for (var i = 0; i < window[this.type].length; i++) {
          if (window[this.type].key(i).match(/_WEBSTORAGEPROXY_NAMESPACE:/)) {
            nameSpaces.push(window[this.type].key(i).replace(/_WEBSTORAGEPROXY_NAMESPACE:/, ''));
          }
        }

        window[this.type];

        if (isString_1(nameSpace(nameSpaces))) {
          this.nameSpace = nameSpace(nameSpaces);
        } else {
          return error('TypeError', "\u5F53'nameSpace'\u4E3A\u51FD\u6570\u65F6\uFF0C\u8FD4\u56DE\u503C\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32");
        }
      } else {
        return error('TypeError', "\u914D\u7F6E\u53C2\u6570'nameSpace'\u5FC5\u987B\u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\u6216\u51FD\u6570");
      }
    } else {
      this.nameSpace = null;
    }
  }

  function lifeCircleCheck (handdle) {
    if (isFunction_1(handdle)) {
      try {
        handdle.call();
      } catch (e) {
        console.log(e); // error('')
      }
    }
  }

  var StorageProxy =
  /*#__PURE__*/
  function (_SuperProxy) {
    _inherits(StorageProxy, _SuperProxy);

    function StorageProxy(option) {
      var _this;

      _classCallCheck(this, StorageProxy);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(StorageProxy).call(this, option)); //将配置对象传递给父类

      _this.key = '_WEBSTORAGEPROXY_NEWED_KEY';
      window[option.type].getItem(_this.key);
      _this.flag = '_WEBSTORAGEPROXY'; //WebStorageProxy对象控制的数据的私有前缀

      _this.nameSpaceFlag = '_WEBSTORAGEPROXY_NAMESPACE'; //WebStorageProxy对象控制的具有命名空间的数据的私有前缀

      _this.type = option.type; //定义当前对象的类型

      nameSpaceCheck.call(_assertThisInitialized(_this), option.nameSpace); //定义当前对象的命名空间

      _this.state = Object.create(_assertThisInitialized(_this)); //定义当前对象的状态

      lifeCircleCheck.call(window, option.boforedCreate); //挂载beforeCreate钩子函数

      Promise.resolve().then(function () {
        //挂载created钩子函数
        lifeCircleCheck.call(_assertThisInitialized(_this), option.created);
      });
      reWrite.call(_assertThisInitialized(_this)); //重写Storage原型链上的方法实现通过WebStorageProxy对象生成的的数据的私有化

      return _possibleConstructorReturn(_this, _this.state.proxy()); //返回经过代理的状态对象
    }

    return StorageProxy;
  }(SuperProxy);

  function IndexDBProxy () {
    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    console.log(arg);
  }

  //new WebStorageProxy 时根据传进来的类型进行分发

  var WebStorageProxy = staticMount(function WebStorageProxy(option) {
    _classCallCheck(this, WebStorageProxy);

    if (isObject_1(option)) {
      switch (option.type) {
        case 'cookie':
          {
            return new CookieProxy(option);
          }

        case 'sessionStorage' :
          {
            return new StorageProxy(option);
          }

        case 'indexDB':
          {
            return new IndexDBProxy(option);
          }

        default:
          {
            return error('TypeError', "\u53C2\u6570\u4E0D\u5408\u6CD5\uFF01type\u5E94\u662F'coookie'\u3001'sessionSorage'\u3001'localStorage'\u3001'indexDB'\u4E2D\u7684\u4E00\u4E2A\u3002");
          }
      }
    } else {
      return error('TypeError', "\u53C2\u6570\u4E0D\u5408\u6CD5\uFF01WebStorageProxy\u7684\u53C2\u6570\u5FC5\u987B\u662F\u4E00\u4E2A\u5BF9\u8C61\u3002");
    }
  });

  return WebStorageProxy;

}));
