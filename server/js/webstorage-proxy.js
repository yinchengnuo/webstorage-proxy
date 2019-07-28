
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

  function _all () {
    return JSON.parse(JSON.stringify(this.state));
  }

  function map () {
    if (this._NAMESPACE) {
      var json = window[this._TYPE][this._GETITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(this._NAMESPACE));

      if (json) {
        Object.assign(this.state, JSON.parse(json));
      } else {
        window[this._TYPE][this._SETITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(this._NAMESPACE), '');
      }
    } else {
      for (var i = 0; i < window[this._TYPE].length; i++) {
        if (!window[this._TYPE].key(i).match('_WEBSTORAGEPROXY_NAMESPACE')) {
          try {
            this.state[window[this._TYPE].key(i)] = JSON.parse(window[this._TYPE][this._GETITEM](window[this._TYPE].key(i)));
          } catch (_unused) {
            this.state[window[this._TYPE].key(i)] = window[this._TYPE][this._GETITEM](window[this._TYPE].key(i));
          }
        }
      }
    }
  }

  function update (key, value) {
    if (this._NAMESPACE) ; else {
      window[this._TYPE][this._SETITEM]("".concat(this._WEBSTORAGEPROXY, ":").concat(key), value);
    }

    console.log(this._NAMESPACE, key);
  }

  var callFunArr = function callFunArr(funArr, that) {
    for (var _len = arguments.length, arg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      arg[_key - 2] = arguments[_key];
    }

    for (var i = 0; i < funArr.length; i++) {
      var _funArr$i;

      (_funArr$i = funArr[i]).call.apply(_funArr$i, [that].concat(arg));
    }
  };
  var lifeCircleNameCheck = function lifeCircleNameCheck(name) {
    return name === 'beforeGet' || name === 'geted' || name === 'beforeSet' || name === 'proxySeted' || name === 'storageSeted' || name === 'storageChanged' || name === 'beforeBeyond';
  };
  var dispatch = function dispatch(type, that, key, newValue, oldValue) {
    window.dispatchEvent(new StorageEvent(type, {
      key: key,
      newValue: newValue,
      oldValue: oldValue,
      storageArea: that,
      url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
    }));
  };
  var nameSpaceCheck = function nameSpaceCheck(that, nameSpace) {
    if (typeof nameSpace === 'string') {
      that._NAMESPACE = nameSpace;
    } else if (typeof nameSpace === 'function') {
      var nameSpaces = [];

      for (var i = 0; i < window[that._TYPE].length; i++) {
        if (window[that._TYPE].key(i).match(new RegExp(that._WEBSTORAGEPROXY_NAMESPACE + ':'))) {
          nameSpaces.push(window[that._TYPE].key(i).replace(new RegExp(that._WEBSTORAGEPROXY_NAMESPACE + ':'), ''));
        }
      }

      that._NAMESPACE = nameSpace(nameSpaces);
      nameSpace = null;
    } else {
      that._NAMESPACE = null;
    }
  };

  function proxy () {
    var _this = this;

    console.log(this.state);

    var proxy = function proxy(state) {
      var that = _this;
      var proxyObj = new Proxy(state, {
        get: function get(target, key) {
          if (lifeCircleNameCheck(key)) {
            return that[key];
          } else {
            callFunArr(that.beforeGet, target, target, key);
            Promise.resolve().then(function () {
              callFunArr(that.geted, target, target, key);
            });
            return target[key];
          }
        },
        set: function set(target, key, value) {
          if (typeof value === 'function' && lifeCircleNameCheck(key)) {
            that[key][that[key].length] = value;
          } else {
            if (target[key] !== value) {
              callFunArr(that.beforeSet, target, target, key, value);

              if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
                target[key] = proxy(value);
              } else {
                target[key] = value;
              }

              callFunArr(that.proxySeted, target, target, key, value); // that.encryption('abcd')

              console.log('更新storage', target, key, value);
              update.call(that, key, value);
            }
          }
        }
      });
      Object.keys(state).forEach(function (e) {
        if (Object.prototype.toString.call(state[e]) === '[object Object]' || Object.prototype.toString.call(state[e]) === '[object Array]') {
          state[e] = proxy(state[e]);
        }
      });
      return proxyObj;
    };

    this.state = proxy(this.state);
  }

  var proxy$1 = function proxy(state) {
    return new Proxy(state, {
      set: function set(target, key, value) {
        if (key == target.length && typeof value === 'function') {
          target[key] = value;
          target.length = target.length += 1;
          return true;
        }
      },
      deleteProperty: function deleteProperty() {
        return false;
      }
    });
  };

  var ret0 = function ret0() {
    return {
      length: 0
    };
  };

  var ret1 = function ret1(fun) {
    return {
      0: fun,
      length: 1
    };
  };

  var defaultConf = function defaultConf() {
    this.beforeCreate = function () {};

    this.created = function () {};

    this.beforeGet = proxy$1(ret0());
    this.geted = proxy$1(ret0());
    this.beforeSet = proxy$1(ret0());
    this.proxySeted = proxy$1(ret0());
    this.storageSeted = proxy$1(ret0());
    this.storageChanged = proxy$1(ret0());

    this.beforeDestroy = function () {};

    this.destroyed = function () {};
  };

  function merge (arg) {
    if (arg.length) {
      if (arg.length == 1) {
        if (typeof arg[0] === 'string') {
          this._TYPE = arg[0];
          this._NAMESPACE = null;
          defaultConf.call(this);
        } else if (arg[0].toString() === '[object Object]') {
          this._TYPE = arg[0].type;
          nameSpaceCheck(this, arg[0].nameSpace);
          typeof arg[0].beforeCreate === 'function' ? this.beforeCreate = arg[0].beforeCreate : function () {};
          typeof arg[0].created === 'function' ? this.created = arg[0].created : function () {};
          typeof arg[0].beforeGet === 'function' ? this.beforeGet = proxy$1(ret1(arg[0].beforeGet)) : proxy$1(ret0());
          typeof arg[0].geted === 'function' ? this.geted = proxy$1(ret1(arg[0].geted)) : proxy$1(ret0());
          typeof arg[0].beforeSet === 'function' ? this.beforeSet = proxy$1(ret1(arg[0].beforeSet)) : proxy$1(ret0());
          typeof arg[0].proxySeted === 'function' ? this.proxySeted = proxy$1(ret1(arg[0].proxySeted)) : proxy$1(ret0());
          typeof arg[0].storageSeted === 'function' ? this.storageSeted = proxy$1(ret1(arg[0].storageSeted)) : proxy$1(ret0());
          typeof arg[0].storageChanged === 'function' ? this.storageChanged = proxy$1(ret1(arg[0].storageChanged)) : proxy$1(ret0());
          typeof arg[0].beforeDestroy === 'function' ? this.beforeDestroy = arg[0].beforeDestroy : function () {};
          typeof arg[0].destroyed === 'function' ? this.destroyed = arg[0].destroyed : function () {};
        }
      } else {
        this._TYPE = arg[0];
        nameSpaceCheck(this, arg[2]);
        defaultConf.call(this);
      }
    } else throw new ReferenceError('the length of arguments in WebStorageProxy can not be 0');
  }

  function rewrite (prototype) {
    localStorage.setItem(prototype._WEBSTORAGEPROXY_INDENT_STORAGE, prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE);
    sessionStorage.setItem(prototype._WEBSTORAGEPROXY_INDENT_STORAGE, prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE);
    Storage.prototype[prototype._CLEAR] = Storage.prototype.clear;
    Storage.prototype[prototype._GETITEM] = Storage.prototype.getItem;
    Storage.prototype[prototype._SETITEM] = Storage.prototype.setItem;
    Storage.prototype[prototype._REMOVEITEM] = Storage.prototype.removeItem;

    var isPrivate = function isPrivate(key) {
      return key.split(':')[0] === prototype._WEBSTORAGEPROXY || key.split(':')[0] === prototype._WEBSTORAGEPROXY_NAMESPACE || key.split(':')[0] === prototype._WEBSTORAGEPROXY_INDENT_STORAGE || key.split(':')[0] === prototype._WEBSTORAGEPROXY_STROAGE_OVERRODE;
    };

    Storage.prototype.clear = function () {
      var _this = this;

      var clear = function clear(i) {
        while (i < _this.length) {
          if (!isPrivate(_this.key(i))) {
            _this[prototype._REMOVEITEM](_this.key(i));
          } else {
            i++;
          }
        }
      };

      clear(0);
      clear(0);
    };

    Storage.prototype.getItem = function (key) {
      if (!isPrivate(key)) {
        return this[prototype._GETITEM](key);
      }

      return false;
    };

    Storage.prototype.setItem = function (key, value) {
      if (!isPrivate(key)) {
        var oldValue = this[prototype._GETITEM](key);

        if (oldValue !== value) {
          this[prototype._SETITEM](key, value);

          this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) || dispatch.call(this, 'sessionstoragechange', this, key, value, oldValue);
          this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) || dispatch.call(this, 'localstoragechange', this, key, value, oldValue);
          return true;
        }
      }

      return false;
    };

    Storage.prototype.removeItem = function (key) {
      if (!isPrivate(key)) {
        var oldValue = this[prototype._GETITEM](key);

        if (oldValue !== null) {
          this[prototype._REMOVEITEM](key);

          this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) || dispatch.call(this, 'sessionstoragechange', this, key, null, oldValue);
          this[prototype._GETITEM](prototype._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) || dispatch.call(this, 'localstoragechange', this, key, null, oldValue);
          return true;
        }
      }

      return false;
    };
  }

  var WebStorageProxy =
  /*#__PURE__*/
  function () {
    function WebStorageProxy() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      _classCallCheck(this, WebStorageProxy);

      return function (that) {
        merge.call(that, arg); //合并配置项

        if (!Storage.prototype[WebStorageProxy.prototype._GETITEM]) {
          //检测Storage上的方法是否被重写
          console.log(88888888);
          rewrite(WebStorageProxy.prototype);
        }

        that.beforeCreate.call(window); //执行beforeCreate钩子函数

        Promise.resolve().then(function () {
          //挂载created钩子函数
          that.created();
        });
        that.state = Object.create(that); //定义当前对象的状态

        map.call(that); //将storage映射到state上

        proxy.call(that); //部署Proxy

        return that.state;
      }(this);
    }

    _createClass(WebStorageProxy, [{
      key: "all",
      value: function all() {
        return _all.call(this);
      }
    }, {
      key: "use",
      value: function use() {}
    }, {
      key: "del",
      value: function del() {}
    }, {
      key: "has",
      value: function has() {}
    }, {
      key: "clear",
      value: function clear() {}
    }]);

    return WebStorageProxy;
  }();

  var prototype = (function (WebStorageProxy) {
    WebStorageProxy.prototype._CLEAR = Symbol('clear');
    WebStorageProxy.prototype._GETITEM = Symbol('getItem');
    WebStorageProxy.prototype._SETITEM = Symbol('setItem');
    WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem');
    WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE';
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_STORAGE = '_WEBSTORAGEPROXY_INDENT_STORAGE';
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE = '_WEBSTORAGEPROXY_INDENT_LOCALSTORAGE';
    WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE = '_WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE';
  });

  prototype(WebStorageProxy);
  var index = new Proxy(WebStorageProxy, {
    get: function get() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      if (arg[1] === 'encryption' || arg[1] === 'decryption') {
        if (!arg[0].prototype[arg[1]]) {
          return function (fun) {
            arg[0].prototype[arg[1]] = new Proxy(fun, {
              apply: function apply(target, ctx, args) {
                if (ctx._TYPE) {
                  return Reflect.apply.apply(Reflect, _toConsumableArray(args));
                }

                return false;
              }
            });
          };
        }
      }

      return Reflect.get.apply(Reflect, arg);
    }
  });

  return index;

}));
