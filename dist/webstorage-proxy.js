
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

  function _map () {}

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
    if (isString_1(nameSpace)) {
      this._NAMESPACE = nameSpace;
    } else if (isFunction_1(nameSpace)) {
      var nameSpaces = [];

      for (var i = 0; i < window[this._TYPE].length; i++) {
        if (window[this._TYPE].key(i).match(new RegExp(this._WEBSTORAGEPROXY_NAMESPACE + ':'))) {
          nameSpaces.push(window[this._TYPE].key(i).replace(new RegExp(this._WEBSTORAGEPROXY_NAMESPACE + ':'), ''));
        }
      }

      this._NAMESPACE = nameSpace(nameSpaces);
    } else {
      this.nameSpace = null;
    }
  }

  function merge (arg) {
    if (arg.length == 1) {
      if (isString_1(arg[0])) {
        this._TYPE = arg[0];
        this._MAXSPACE = null;
        this._NAMESPACE = null;
      } else if (isObject_1(arg[0])) {
        console.log(233333333);
        this._TYPE = arg[0].type;
        this._MAXSPACE = arg[0].maxSpace * 1024 * 1024;
        nameSpaceCheck.call(this, arg[0].nameSpace);
        isFunction_1(arg[0].boforedCreate) ? this.boforedCreate = arg[0].boforedCreate : function () {};
        isFunction_1(arg[0].created) ? this.created = arg[0].created : function () {};
        isFunction_1(arg[0].beforeGet) ? this.beforeGet = arg[0].beforeGet : function () {};
        isFunction_1(arg[0].geted) ? this.geted = arg[0].geted : function () {};
        isFunction_1(arg[0].beforeSet) ? this.beforeSet = arg[0].beforeSet : function () {};
        isFunction_1(arg[0].proxySeted) ? this.proxySeted = arg[0].proxySeted : function () {};
        isFunction_1(arg[0].storageSeted) ? this.storageSeted = arg[0].storageSeted : function () {};
        isFunction_1(arg[0].beforeDestroy) ? this.beforeDestroy = arg[0].beforeDestroy : function () {};
        isFunction_1(arg[0].destroyed) ? this.destroyed = arg[0].destroyed : function () {};
        isFunction_1(arg[0].beforeBeyond) ? this.beforeBeyond = arg[0].beforeBeyond : function () {};
        isFunction_1(arg[0].encryption) ? this.encryption = arg[0].encryption : function () {};
        isFunction_1(arg[0].decryption) ? this.decryption = arg[0].decryption : function () {};
      }
    } else {
      this._TYPE = arg[0];
      this._MAXSPACE = arg[1] * 1024 * 1024;
      nameSpaceCheck.call(this, arg[2]);
    }
  }

  function _proxy () {
    if (this.nameSpace) {
      return new Proxy(this, {// set () {
        //     if (Super.nameSpace) {
        //         console.log(Super.nameSpace)
        //     } else {
        //         console.log('set')
        //     }
        // },
        // get (...arg) {
        //     if (Super.nameSpace) {
        //         const space = window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`) ? JSON.parse(window[Super.type].getItem(`_NAMESPACE:${Super.nameSpace}`)) : {}
        //         console.log(space)
        //         return space[arg[1]]
        //     } else {
        //         console.log('set')
        //     }
        // }
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

  function _rewrite () {
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

  var WebStorageProxy =
  /*#__PURE__*/
  function () {
    function WebStorageProxy() {
      _classCallCheck(this, WebStorageProxy);

      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      this.init(arg);
      this.state = Object.create(this); //定义当前对象的状态

      this.state.map(); //将storage映射到state上

      return this.state.proxy();
    }

    _createClass(WebStorageProxy, [{
      key: "init",
      value: function init(arg) {
        var _this = this;

        this._WEBSTORAGEPROXY = '_WEBSTORAGEPROXY'; //WebStorageProxy对象控制的数据的私有前缀

        this._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE'; //WebStorageProxy对象控制的具有命名空间的数据的私有前缀

        this._WEBSTORAGEPROXY_NEWED_KEY = '_WEBSTORAGEPROXY_NEWED_KEY'; //判断此类是否已经new了的key 

        merge.call(this, arg); //合并配置项

        window[this._TYPE].getItem(this._WEBSTORAGEPROXY_NEWED_KEY); //阻止多次new此类


        this.boforedCreate.call(window); //执行beforeCreate钩子函数

        Promise.resolve().then(function () {
          //挂载created钩子函数
          _this.created();
        });
        this.rewrite();
      }
    }, {
      key: "rewrite",
      value: function rewrite() {
        _rewrite.call(this);
      }
    }, {
      key: "proxy",
      value: function proxy() {
        _proxy.call(this);
      }
    }, {
      key: "map",
      value: function map() {
        _map.call(this);
      }
    }]);

    return WebStorageProxy;
  }();

  return WebStorageProxy;

}));
