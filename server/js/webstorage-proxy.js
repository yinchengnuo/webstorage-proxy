
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

  var ret0 = function ret0() {
    return {
      length: 0
    };
  }; //初始化时没有配置钩子函数时返回的钩子函数列表

  var ret1 = function ret1(fun) {
    return {
      //初始化时配置钩子函数时返回的钩子函数列表
      0: fun,
      length: 1
    };
  };
  var callLifeCircleList = function callLifeCircleList(funArr, that) {
    for (var _len = arguments.length, arg = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      arg[_key - 2] = arguments[_key];
    }

    //遍历执行钩子函数列表
    for (var i = 0; i < funArr.length; i++) {
      var _funArr$i;

      (_funArr$i = funArr[i]).call.apply(_funArr$i, [that].concat(arg));
    }
  };
  var lifeCircleNameCheck = function lifeCircleNameCheck(name) {
    //检查要追加或获取的钩子函数名称是否存在
    return name === 'beforeGet' || name === 'geted' || name === 'beforeSet' || name === 'proxySeted' || name === 'storageSeted' || name === 'storageChanged' || name === '_NAMESPACE' || name === '_DELETENOMAPTOSTORAGE';
  };
  var proxyLifeCircleList = function proxyLifeCircleList(state) {
    //代理钩子列表使得只能添加不能删除钩子函数
    return new Proxy(state, {
      set: function set(target, key, value) {
        if (key == target.length && typeof value === 'function') {
          Reflect.set(target, key, value);
          target.length = target.length += 1;
          return true;
        }
      },
      deleteProperty: function deleteProperty() {
        return false;
      }
    });
  };
  var defaultLifeCircle = function defaultLifeCircle(that) {
    //初始化时没有配置任何钩子函数时的默认操作
    that.beforeCreate = function () {};

    that.created = function () {};

    that.beforeGet = proxyLifeCircleList(ret0());
    that.geted = proxyLifeCircleList(ret0());
    that.beforeSet = proxyLifeCircleList(ret0());
    that.proxySeted = proxyLifeCircleList(ret0());
    that.storageSeted = proxyLifeCircleList(ret0());
    that.beforeDel = proxyLifeCircleList(ret0());
    that.proxyDeled = proxyLifeCircleList(ret0());
    that.storageDeled = proxyLifeCircleList(ret0());
    that.storageChanged = proxyLifeCircleList(ret0());

    that.beforeDestroy = function () {};

    that.destroyed = function () {};
  };
  var dispatch = function dispatch(type, that, key, newValue, oldValue) {
    //触发sessionstoragechange/localstoragechange事件
    window.dispatchEvent(new StorageEvent(type, {
      key: key,
      newValue: newValue,
      oldValue: oldValue,
      storageArea: that,
      url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
    }));
  };
  var nameSpaceDispatch = function nameSpaceDispatch(that, type, storageArea, key, newValue, oldValue) {
    //触发sessionstoragechange/localstoragechange事件
    var len = that.storageChanged.length;

    for (var i = 0; i < len; i++) {
      that.storageChanged[i].call(that, new StorageEvent(type, {
        key: key,
        newValue: newValue,
        oldValue: oldValue,
        storageArea: storageArea,
        url: window.location.href.split('/')[0] + '//' + window.location.href.split('/')[2]
      }));
    }
  };
  var nameSpaceCheck = function nameSpaceCheck(that, nameSpace) {
    //检测命名空间类型，
    if (typeof nameSpace === 'string') {
      //如果为字符串就直接赋值
      that._NAMESPACE = nameSpace;
    } else if (typeof nameSpace === 'function') {
      //如果为函数就执行，并把所有已经存在的命名空间名称放在数组作为参数传入
      var nameSpacesArr = [];
      var regExp = new RegExp("".concat(that._WEBSTORAGEPROXY_NAMESPACE, ":"));

      for (var i = 0; i < window[that._TYPE].length; i++) {
        if (window[that._TYPE].key(i).match(regExp)) {
          nameSpacesArr.push(window[that._TYPE].key(i).replace(regExp, ''));
        }
      }

      that._NAMESPACE = typeof nameSpace(nameSpacesArr) === 'string' ? nameSpace(nameSpacesArr) : null;
      nameSpacesArr = null;
      regExp = null;
    } else {
      that._NAMESPACE = null;
    }
  };
  var isString = function isString(i) {
    //类型判断：string
    return typeof i === 'string';
  };
  var isFunction = function isFunction(i) {
    return Object.prototype.toString.call(i) === '[object Function]';
  };
  var isObject = function isObject(i) {
    return Object.prototype.toString.call(i) === '[object Object]';
  };
  var isArray = function isArray(i) {
    return Object.prototype.toString.call(i) === '[object Array]';
  };
  var isPrivate = function isPrivate(proto, key) {
    return key.split(':')[0] === proto._WEBSTORAGEPROXY_NAMESPACE || key.split(':')[0] === proto._WEBSTORAGEPROXY_INDENT_STORAGE;
  };
  var proto = function proto(i) {
    //获取对象原型
    return Object.getPrototypeOf(i);
  };
  var listen = function listen(that) {
    //监听 localStorage 变动
    window.addEventListener('storage', function (e) {
      if (that._NAMESPACE) {
        var regExp = new RegExp("".concat(that._WEBSTORAGEPROXY_NAMESPACE, ":"));

        if (e.key.match(regExp) && e.key.split(':')[1] === that._NAMESPACE) {
          if (isFunction(that.decryption)) {
            Object.assign(that.state, JSON.parse(that.decryption(e.newValue)));
          }
        }
      } else {
        if (!isPrivate(e.key)) {
          that.state[e.key] = e.newValue;
        }
      }
    });
  };
  var clearState = function clearState(that) {
    proto(that)._DELETENOMAPTOSTORAGE = true;
    Object.keys(that.state).forEach(function (e) {
      return delete that.state[e];
    });
    proto(that)._DELETENOMAPTOSTORAGE = false;
  };

  function map () {
    //将sessionStorage/localStorage映射到state上
    if (this._NAMESPACE) {
      //当配置对象有命名空间时
      var data = window[this._TYPE][this._GETITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(this._NAMESPACE));

      if (data) {
        //如果 sessionStorage/localStorage 里有命名空间标记的数据就映射到state上
        if (isFunction(this.encryption) && isFunction(this.decryption)) {
          Object.assign(this.state, JSON.parse(this.decryption(data)));
        } else {
          Object.assign(this.state, JSON.parse(data));
        }

        data = null;
      } else {
        //如果没有就在 sessionStorage/localStorage 创建值为空的命名空间
        window[this._TYPE][this._SETITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(this._NAMESPACE), '');
      }
    } else {
      //当配置对象没有命名空间时，就把 sessionStorage/localStorage 里面的非命名空间数据遍历到state上
      var storage = window[this._TYPE];
      var regExp1 = new RegExp("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":"));
      var regExp2 = new RegExp("".concat(this._WEBSTORAGEPROXY_INDENT_STORAGE));

      for (var i = 0; i < storage.length; i++) {
        if (!storage.key(i).match(regExp1) && !storage.key(i).match(regExp2)) {
          try {
            this.state[storage.key(i)] = JSON.parse(storage[this._GETITEM](storage.key(i)));
          } catch (_unused) {
            this.state[storage.key(i)] = storage[this._GETITEM](storage.key(i));
          }
        }
      }

      storage = null;
      regExp1 = null;
      regExp2 = null;
    }
  }

  function update (oldValue) {
    var storage = window[this._TYPE];
    var key = arguments.length <= 2 ? undefined : arguments[2];

    var value = storage[this._GETITEM](key);

    if (this._NAMESPACE) {
      var spacename = "_WEBSTORAGEPROXY_INDENT_STORAGE:".concat(this._NAMESPACE);

      storage[this._SETITEM](spacename, this.encryption(JSON.stringify(this.state)));

      nameSpaceDispatch.call(storage, this, this._TYPE.toLowerCase() + 'change', storage, spacename, this.encryption(JSON.stringify(this.state)), value); // dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, spacename, this.encryption(JSON.stringify(this.state)), value)  //开发时使用

      storage = null;
      key = null;
      value = null;
      return true;
    } else {
      var keys = Object.keys(this.state);

      for (var i = 0; i < keys.length; i++) {
        if (isArray(this.state[keys[i]]) || isObject(this.state[keys[i]])) {
          if (JSON.stringify(oldValue[keys[i]]) !== JSON.stringify(this.state[keys[i]])) {
            storage[this._SETITEM](key, JSON.stringify(this.state[keys[i]]));

            dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, key, JSON.stringify(this.state[keys[i]]), value);
            return true;
          }
        } else {
          if (oldValue[keys[i]] !== this.state[keys[i]]) {
            storage[this._SETITEM](key, this.state[keys[i]]);

            dispatch.call(storage, this._TYPE.toLowerCase() + 'change', storage, key, JSON.stringify(this.state[keys[i]]), value);
            return true;
          }
        }
      }
    }
  }

  function proxy () {
    //递归代理state
    var self = this; //保存this引用

    var proxy = function proxy(state) {
      //定义proxy函数
      Object.keys(state).forEach(function (e) {
        //遍历传进来的对象
        if (isArray(state[e]) || isObject(state[e])) {
          //属性值是对象或数组就递归
          state[e] = proxy(state[e]).proxy;
        }
      });
      return Proxy.revocable(state, {
        //代理传进来的对象或数组
        get: function get(target, key) {
          //代理get
          if (lifeCircleNameCheck(key && proto(state) === self)) {
            //当key为钩子函数时返回钩子函数列表
            return self[key];
          } else {
            //否则就是正常取值
            callLifeCircleList(self.beforeGet, target, key); //遍历执行beforeGet钩子函数列表

            Promise.resolve().then(function () {
              callLifeCircleList(self.geted, target, key); //遍历执行geted钩子函数列表
            });
            return target[key];
          }
        },
        set: function set(target, key, value) {
          //代理set
          if (isFunction(value) && lifeCircleNameCheck(key) && proto(state) === self) {
            //当key为钩子函数时将其放入钩子函数列表
            self[key][self[key].length] = value;
            return true;
          } else if (lifeCircleNameCheck(key)) {
            Reflect.set(target, key, value);
            return true;
          } else {
            if (target[key] !== value) {
              //当newValue !== oldValue 时才进行下一步
              callLifeCircleList(self.beforeSet, target, key, value); //遍历执行beforeSet钩子函数列表

              var oldState = JSON.parse(JSON.stringify(self.state)); //set赋值之前先备份当前state

              if (isArray(value) || isObject(value)) {
                //当set的属性值为对象或数组时
                target[key] = proxy(value); //对属性值做代理再赋值给目标对象
              } else {
                //当set的属性值为原始值时直接赋值
                target[key] = value;
              }

              callLifeCircleList(self.proxySeted, target, key, value); //遍历执行proxySeted钩子函数列表

              update.call(self, oldState, target, key, value); //更新storage

              callLifeCircleList(self.storageSeted, target, key, value); //遍历执行storageSeted钩子函数列表

              return true;
            }
          }

          return false;
        },
        deleteProperty: function deleteProperty(target, key) {
          if (key in target && !self._DELETENOMAPTOSTORAGE) {
            if (isPrivate(key)) {
              return false;
            }

            var oldState = JSON.parse(JSON.stringify(self.state)); //set赋值之前先备份当前state

            callLifeCircleList(self.beforeDel, target, key); //遍历执行beforeSet钩子函数列表

            Reflect.deleteProperty(target, key);
            callLifeCircleList(self.proxyDeled, target, target, key); //遍历执行proxySeted钩子函数列表

            update.call(self, oldState, target, key); //更新storage

            callLifeCircleList(self.storageDeled, target, key); //遍历执行storageSeted钩子函数列表

            return true;
          } else if (self._DELETENOMAPTOSTORAGE) {
            Reflect.deleteProperty(target, key);
            return true;
          }

          return false;
        }
      });
    };

    var cancalProxy = proxy(this.state);
    this.state = cancalProxy.proxy;
    this.revoke = cancalProxy.revoke;
  }

  function merge (arg) {
    //合并配置项
    if (arg.length == 1) {
      //当只有一个参数时
      if (isString(arg[0])) {
        //当参数为唯一的字符串时
        this._TYPE = arg[0];
        this._NAMESPACE = null;
        defaultLifeCircle(this);
      } else if (isObject(arg[0])) {
        //当参数为唯一的对象时
        this._TYPE = arg[0].type;
        nameSpaceCheck(this, arg[0].nameSpace);
        this.beforeCreate = isFunction(arg[0].beforeCreate) ? arg[0].beforeCreate : function () {};
        this.created = isFunction(arg[0].created) ? arg[0].created : function () {};
        this.beforeGet = isFunction(arg[0].beforeGet) ? proxyLifeCircleList(ret1(arg[0].beforeGet)) : proxyLifeCircleList(ret0());
        this.geted = isFunction(arg[0].geted) ? proxyLifeCircleList(ret1(arg[0].geted)) : proxyLifeCircleList(ret0());
        this.beforeSet = isFunction(arg[0].beforeSet) ? proxyLifeCircleList(ret1(arg[0].beforeSet)) : proxyLifeCircleList(ret0());
        this.proxySeted = isFunction(arg[0].proxySeted) ? proxyLifeCircleList(ret1(arg[0].proxySeted)) : proxyLifeCircleList(ret0());
        this.storageSeted = isFunction(arg[0].storageSeted) ? proxyLifeCircleList(ret1(arg[0].storageSeted)) : proxyLifeCircleList(ret0());
        this.beforeDel = isFunction(arg[0].beforeDel) ? proxyLifeCircleList(ret1(arg[0].beforeDel)) : proxyLifeCircleList(ret0());
        this.proxyDeled = isFunction(arg[0].proxyDeled) ? proxyLifeCircleList(ret1(arg[0].proxyDeled)) : proxyLifeCircleList(ret0());
        this.storageDeled = isFunction(arg[0].storageDeled) ? proxyLifeCircleList(ret1(arg[0].storageDeled)) : proxyLifeCircleList(ret0());
        this.storageChanged = isFunction(arg[0].storageChanged) ? proxyLifeCircleList(ret1(arg[0].storageChanged)) : proxyLifeCircleList(ret0());
        this.beforeDestroy = isFunction(arg[0].beforeDestroy) ? arg[0].beforeDestroy : function () {};
        this.destroyed = isFunction(arg[0].destroyed) ? arg[0].destroyed : function () {};
      }
    } else {
      //当参数大于一时
      this._TYPE = arg[0];
      nameSpaceCheck(this, arg[2]);
      defaultLifeCircle(this);
    }
  }

  var WebStorageProxy =
  /*#__PURE__*/
  function () {
    //WebStorageProxy 本尊
    function WebStorageProxy() {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      _classCallCheck(this, WebStorageProxy);

      return function (self) {
        merge.call(self, arg); //合并配置项

        self.beforeCreate.call(window); //执行beforeCreate钩子函数

        self.state = Object.create(self); //定义当前对象的状态

        map.call(self); //将storage映射到state上

        proxy.call(self); //在state上部署Proxy

        Promise.resolve().then(function () {
          //挂载created钩子函数
          self.created(); //执行created钩子函数
        });
        self._TYPE === 'localStorage' && listen(self);
        return self.state; //返回state
      }(this);
    }

    _createClass(WebStorageProxy, [{
      key: "all",
      value: function all() {
        return JSON.parse(JSON.stringify(this.state));
      }
    }, {
      key: "use",
      value: function use(namespace) {
        if (namespace && namespace !== this._NAMESPACE) {
          proto(this)._NAMESPACE = namespace;
          clearState(this);
          map.call(this);
          return true;
        }
      }
    }, {
      key: "del",
      value: function del(namespace) {
        this._NAMESPACEe && this._NAMESPACE === namespace && this.use();

        window[this._TYPE][proto(this)._REMOVEITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(namespace));

        return true;
      }
    }, {
      key: "has",
      value: function has(key) {
        return key in this.state;
      }
    }, {
      key: "clear",
      value: function clear() {
        var _this = this;

        if (this._NAMESPACE) {
          window[this._TYPE][proto(this)._SETITEM]("".concat(this._WEBSTORAGEPROXY_NAMESPACE, ":").concat(this._NAMESPACE), '');

          return true;
        }

        var clear = function clear(i) {
          while (i < window[_this._TYPE].length) {
            if (isPrivate(proto(_this), window[_this._TYPE].key(i))) {
              i++;
            } else {
              window[_this._TYPE].removeItem(window[_this._TYPE].key(i));
            }
          }

          return clear;
        };

        clear(0)(0);
        clearState(this);
        return true;
      }
    }, {
      key: "namespace",
      value: function namespace() {
        return this._NAMESPACE;
      }
    }, {
      key: "namespaces",
      value: function namespaces() {
        var arr = [];
        var storage = window[this._TYPE];
        var len = storage.length;

        for (var i = 0; i < len; i++) {
          if (window[this._TYPE].key(i).split(':')[0] === proto(this)._WEBSTORAGEPROXY_NAMESPACE) {
            arr.push(window[this._TYPE].key(i).split(':')[1]);
          }
        }

        return arr;
      }
    }, {
      key: "destroy",
      value: function destroy(del, b) {
        this.beforeDestroy.call(this); //执行beforeDestroy钩子函数

        del && this.clear();

        if (b) {
          var p = Storage.prototype;
          p.clear = p[this._CLEAR];
          delete p[this._CLEAR];
          p.setItem = p[this._SETITEM];
          delete p[this._SETITEM];
          p.getItem = p[this._GETITEM];
          delete p[this._GETITEM];
          p.removeItem = p[this._REMOVEITEM];
          delete p[this._REMOVEITEM];
        }

        window._WebStorageProxyDestoryedFun = this.destroyed;
        this.revoke();
        Promise.resolve().then(function () {
          //挂载destroyed钩子函数
          window._WebStorageProxyDestoryedFun.call(window); //执行destroyed钩子函数


          delete window._WebStorageProxyDestoryedFun;
        });
      }
    }]);

    return WebStorageProxy;
  }();

  function rewrite (proto) {
    localStorage.setItem(proto._WEBSTORAGEPROXY_INDENT_STORAGE, proto._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE);
    sessionStorage.setItem(proto._WEBSTORAGEPROXY_INDENT_STORAGE, proto._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE);
    Storage.prototype[proto._CLEAR] = Storage.prototype.clear;
    Storage.prototype[proto._GETITEM] = Storage.prototype.getItem;
    Storage.prototype[proto._SETITEM] = Storage.prototype.setItem;
    Storage.prototype[proto._REMOVEITEM] = Storage.prototype.removeItem;

    Storage.prototype.clear = function () {
      var _this = this;

      var clear = function clear(i) {
        while (i < _this.length) {
          if (!isPrivate(proto, _this.key(i))) {
            _this[proto._REMOVEITEM](_this.key(i));
          } else {
            i++;
          }
        }

        return clear;
      };

      clear(0)(0);
    };

    Storage.prototype.getItem = function (key) {
      if (!isPrivate(proto, key)) {
        return this[proto._GETITEM](key);
      }

      return false;
    };

    Storage.prototype.setItem = function (key, value) {
      if (!isPrivate(proto, key)) {
        var oldValue = this[proto._GETITEM](key);

        if (oldValue !== value) {
          this[proto._SETITEM](key, value);

          this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) && dispatch.call(this, 'sessionstoragechange', this, key, value, oldValue);
          this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) && dispatch.call(this, 'localstoragechange', this, key, value, oldValue);
          return true;
        }
      }

      return false;
    };

    Storage.prototype.removeItem = function (key) {
      if (!isPrivate(proto, key)) {
        var oldValue = this[proto._GETITEM](key);

        if (oldValue !== null) {
          this[proto._REMOVEITEM](key);

          this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/sessionStorage/i) && dispatch.call(this, 'sessionstoragechange', this, key, null, oldValue);
          this[proto._GETITEM](proto._WEBSTORAGEPROXY_INDENT_STORAGE).match(/localStorage/i) && dispatch.call(this, 'localstoragechange', this, key, null, oldValue);
          return true;
        }
      }

      return false;
    };
  }

  WebStorageProxy.prototype._CLEAR = Symbol('clear'); //原生 Storage.prototype 上的 clear 方法重新放在 Storage.prototype 上的新 key

  WebStorageProxy.prototype._GETITEM = Symbol('getItem'); //原生 Storage.prototype 上的 getItem 方法重新放在 Storage.prototype 上的新 key

  WebStorageProxy.prototype._SETITEM = Symbol('setItem'); //原生 Storage.prototype 上的 setItem 方法重新放在 Storage.prototype 上的新 key

  WebStorageProxy.prototype._REMOVEITEM = Symbol('removeItem'); //原生 Storage.prototype 上的 removeItem 方法重新放在 Storage.prototype 上的新 key

  WebStorageProxy.prototype._WEBSTORAGEPROXY_NAMESPACE = '_WEBSTORAGEPROXY_NAMESPACE'; //命名空间标记

  WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_STORAGE = '_WEBSTORAGEPROXY_INDENT_STORAGE'; //判断sessionStorage/localStorage标识的 key

  WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_LOCALSTORAGE = '_WEBSTORAGEPROXY_INDENT_LOCALSTORAGE'; //判断localStorage标识的 value

  WebStorageProxy.prototype._WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE = '_WEBSTORAGEPROXY_INDENT_SESSIONSTORAGE'; //判断sessionStorage标识的 value

  WebStorageProxy.prototype = new Proxy(WebStorageProxy.prototype, {
    deleteProperty: function deleteProperty() {
      return false;
    }
  });
  var index = new Proxy(WebStorageProxy, {
    //代理 WebStorageProxy
    get: function get(target, key) {
      //使得通过 WebStorageProxy.crypto 时能够将 encryption/decryption(encryptionFun) 两个方法挂载到原型上
      if (key === 'crypto') {
        if (!target.prototype.encryption && !Storage.prototype[WebStorageProxy.prototype._GETITEM]) {
          //只有在原型上没有这两个方法且Storage没有被重写时才允许挂载
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            //返回一个接受加密解密函数的函数，执行后挂载
            if (args.length == 2 && isFunction(args[0]) && isFunction(args[1])) {
              args.forEach(function (e, i) {
                target.prototype[i ? 'decryption' : 'encryption'] = new Proxy(e, {
                  //挂载前对这两个方法进行代理，使它们不能被外部调用
                  apply: function apply(target, ctx, args) {
                    //只有由 WebStorageProxy 生成的对象才能调用
                    if (proto(ctx) === WebStorageProxy.prototype) {
                      return Reflect.apply(target, ctx, args);
                    }

                    return false;
                  }
                });
              });
              Object.freeze(target.prototype); //部署加密解密函数后冻结WebStorageProxy.prototype
            }
          };
        } else {
          return false;
        }
      }

      return Reflect.get(target, key);
    },
    construct: function construct() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      //在被 new 时简单判断下是否传参
      if (args[1].length) {
        if (!Storage.prototype[WebStorageProxy.prototype._GETITEM]) {
          //检测Storage上的方法是否被重写
          rewrite(WebStorageProxy.prototype); //如果没重写就重写
        }

        return Reflect.construct.apply(Reflect, args);
      }

      return new ReferenceError('the length of arguments in WebStorageProxy can not be 0'); //没传参数返回错误对象
    }
  });

  return index;

}));
