var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events2() {
    }
    if (Object.create) {
      Events2.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events2().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events2();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events2();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events2();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter2;
    }
  }
});

// node_modules/big-integer/BigInteger.js
var require_BigInteger = __commonJS({
  "node_modules/big-integer/BigInteger.js"(exports, module) {
    var bigInt3 = function(undefined2) {
      "use strict";
      var BASE = 1e7, LOG_BASE = 7, MAX_INT = 9007199254740992, MAX_INT_ARR = smallToArray(MAX_INT), DEFAULT_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
      var supportsNativeBigInt = typeof BigInt === "function";
      function Integer(v, radix, alphabet, caseSensitive) {
        if (typeof v === "undefined") return Integer[0];
        if (typeof radix !== "undefined") return +radix === 10 && !alphabet ? parseValue(v) : parseBase(v, radix, alphabet, caseSensitive);
        return parseValue(v);
      }
      function BigInteger(value, sign) {
        this.value = value;
        this.sign = sign;
        this.isSmall = false;
      }
      BigInteger.prototype = Object.create(Integer.prototype);
      function SmallInteger(value) {
        this.value = value;
        this.sign = value < 0;
        this.isSmall = true;
      }
      SmallInteger.prototype = Object.create(Integer.prototype);
      function NativeBigInt(value) {
        this.value = value;
      }
      NativeBigInt.prototype = Object.create(Integer.prototype);
      function isPrecise(n) {
        return -MAX_INT < n && n < MAX_INT;
      }
      function smallToArray(n) {
        if (n < 1e7)
          return [n];
        if (n < 1e14)
          return [n % 1e7, Math.floor(n / 1e7)];
        return [n % 1e7, Math.floor(n / 1e7) % 1e7, Math.floor(n / 1e14)];
      }
      function arrayToSmall(arr) {
        trim(arr);
        var length = arr.length;
        if (length < 4 && compareAbs(arr, MAX_INT_ARR) < 0) {
          switch (length) {
            case 0:
              return 0;
            case 1:
              return arr[0];
            case 2:
              return arr[0] + arr[1] * BASE;
            default:
              return arr[0] + (arr[1] + arr[2] * BASE) * BASE;
          }
        }
        return arr;
      }
      function trim(v) {
        var i2 = v.length;
        while (v[--i2] === 0) ;
        v.length = i2 + 1;
      }
      function createArray(length) {
        var x = new Array(length);
        var i2 = -1;
        while (++i2 < length) {
          x[i2] = 0;
        }
        return x;
      }
      function truncate(n) {
        if (n > 0) return Math.floor(n);
        return Math.ceil(n);
      }
      function add(a, b) {
        var l_a = a.length, l_b = b.length, r = new Array(l_a), carry = 0, base = BASE, sum, i2;
        for (i2 = 0; i2 < l_b; i2++) {
          sum = a[i2] + b[i2] + carry;
          carry = sum >= base ? 1 : 0;
          r[i2] = sum - carry * base;
        }
        while (i2 < l_a) {
          sum = a[i2] + carry;
          carry = sum === base ? 1 : 0;
          r[i2++] = sum - carry * base;
        }
        if (carry > 0) r.push(carry);
        return r;
      }
      function addAny(a, b) {
        if (a.length >= b.length) return add(a, b);
        return add(b, a);
      }
      function addSmall(a, carry) {
        var l = a.length, r = new Array(l), base = BASE, sum, i2;
        for (i2 = 0; i2 < l; i2++) {
          sum = a[i2] - base + carry;
          carry = Math.floor(sum / base);
          r[i2] = sum - carry * base;
          carry += 1;
        }
        while (carry > 0) {
          r[i2++] = carry % base;
          carry = Math.floor(carry / base);
        }
        return r;
      }
      BigInteger.prototype.add = function(v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
          return this.subtract(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall) {
          return new BigInteger(addSmall(a, Math.abs(b)), this.sign);
        }
        return new BigInteger(addAny(a, b), this.sign);
      };
      BigInteger.prototype.plus = BigInteger.prototype.add;
      SmallInteger.prototype.add = function(v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
          return this.subtract(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
          if (isPrecise(a + b)) return new SmallInteger(a + b);
          b = smallToArray(Math.abs(b));
        }
        return new BigInteger(addSmall(b, Math.abs(a)), a < 0);
      };
      SmallInteger.prototype.plus = SmallInteger.prototype.add;
      NativeBigInt.prototype.add = function(v) {
        return new NativeBigInt(this.value + parseValue(v).value);
      };
      NativeBigInt.prototype.plus = NativeBigInt.prototype.add;
      function subtract(a, b) {
        var a_l = a.length, b_l = b.length, r = new Array(a_l), borrow = 0, base = BASE, i2, difference;
        for (i2 = 0; i2 < b_l; i2++) {
          difference = a[i2] - borrow - b[i2];
          if (difference < 0) {
            difference += base;
            borrow = 1;
          } else borrow = 0;
          r[i2] = difference;
        }
        for (i2 = b_l; i2 < a_l; i2++) {
          difference = a[i2] - borrow;
          if (difference < 0) difference += base;
          else {
            r[i2++] = difference;
            break;
          }
          r[i2] = difference;
        }
        for (; i2 < a_l; i2++) {
          r[i2] = a[i2];
        }
        trim(r);
        return r;
      }
      function subtractAny(a, b, sign) {
        var value;
        if (compareAbs(a, b) >= 0) {
          value = subtract(a, b);
        } else {
          value = subtract(b, a);
          sign = !sign;
        }
        value = arrayToSmall(value);
        if (typeof value === "number") {
          if (sign) value = -value;
          return new SmallInteger(value);
        }
        return new BigInteger(value, sign);
      }
      function subtractSmall(a, b, sign) {
        var l = a.length, r = new Array(l), carry = -b, base = BASE, i2, difference;
        for (i2 = 0; i2 < l; i2++) {
          difference = a[i2] + carry;
          carry = Math.floor(difference / base);
          difference %= base;
          r[i2] = difference < 0 ? difference + base : difference;
        }
        r = arrayToSmall(r);
        if (typeof r === "number") {
          if (sign) r = -r;
          return new SmallInteger(r);
        }
        return new BigInteger(r, sign);
      }
      BigInteger.prototype.subtract = function(v) {
        var n = parseValue(v);
        if (this.sign !== n.sign) {
          return this.add(n.negate());
        }
        var a = this.value, b = n.value;
        if (n.isSmall)
          return subtractSmall(a, Math.abs(b), this.sign);
        return subtractAny(a, b, this.sign);
      };
      BigInteger.prototype.minus = BigInteger.prototype.subtract;
      SmallInteger.prototype.subtract = function(v) {
        var n = parseValue(v);
        var a = this.value;
        if (a < 0 !== n.sign) {
          return this.add(n.negate());
        }
        var b = n.value;
        if (n.isSmall) {
          return new SmallInteger(a - b);
        }
        return subtractSmall(b, Math.abs(a), a >= 0);
      };
      SmallInteger.prototype.minus = SmallInteger.prototype.subtract;
      NativeBigInt.prototype.subtract = function(v) {
        return new NativeBigInt(this.value - parseValue(v).value);
      };
      NativeBigInt.prototype.minus = NativeBigInt.prototype.subtract;
      BigInteger.prototype.negate = function() {
        return new BigInteger(this.value, !this.sign);
      };
      SmallInteger.prototype.negate = function() {
        var sign = this.sign;
        var small = new SmallInteger(-this.value);
        small.sign = !sign;
        return small;
      };
      NativeBigInt.prototype.negate = function() {
        return new NativeBigInt(-this.value);
      };
      BigInteger.prototype.abs = function() {
        return new BigInteger(this.value, false);
      };
      SmallInteger.prototype.abs = function() {
        return new SmallInteger(Math.abs(this.value));
      };
      NativeBigInt.prototype.abs = function() {
        return new NativeBigInt(this.value >= 0 ? this.value : -this.value);
      };
      function multiplyLong(a, b) {
        var a_l = a.length, b_l = b.length, l = a_l + b_l, r = createArray(l), base = BASE, product, carry, i2, a_i, b_j;
        for (i2 = 0; i2 < a_l; ++i2) {
          a_i = a[i2];
          for (var j = 0; j < b_l; ++j) {
            b_j = b[j];
            product = a_i * b_j + r[i2 + j];
            carry = Math.floor(product / base);
            r[i2 + j] = product - carry * base;
            r[i2 + j + 1] += carry;
          }
        }
        trim(r);
        return r;
      }
      function multiplySmall(a, b) {
        var l = a.length, r = new Array(l), base = BASE, carry = 0, product, i2;
        for (i2 = 0; i2 < l; i2++) {
          product = a[i2] * b + carry;
          carry = Math.floor(product / base);
          r[i2] = product - carry * base;
        }
        while (carry > 0) {
          r[i2++] = carry % base;
          carry = Math.floor(carry / base);
        }
        return r;
      }
      function shiftLeft(x, n) {
        var r = [];
        while (n-- > 0) r.push(0);
        return r.concat(x);
      }
      function multiplyKaratsuba(x, y) {
        var n = Math.max(x.length, y.length);
        if (n <= 30) return multiplyLong(x, y);
        n = Math.ceil(n / 2);
        var b = x.slice(n), a = x.slice(0, n), d = y.slice(n), c = y.slice(0, n);
        var ac = multiplyKaratsuba(a, c), bd = multiplyKaratsuba(b, d), abcd = multiplyKaratsuba(addAny(a, b), addAny(c, d));
        var product = addAny(addAny(ac, shiftLeft(subtract(subtract(abcd, ac), bd), n)), shiftLeft(bd, 2 * n));
        trim(product);
        return product;
      }
      function useKaratsuba(l1, l2) {
        return -0.012 * l1 - 0.012 * l2 + 15e-6 * l1 * l2 > 0;
      }
      BigInteger.prototype.multiply = function(v) {
        var n = parseValue(v), a = this.value, b = n.value, sign = this.sign !== n.sign, abs;
        if (n.isSmall) {
          if (b === 0) return Integer[0];
          if (b === 1) return this;
          if (b === -1) return this.negate();
          abs = Math.abs(b);
          if (abs < BASE) {
            return new BigInteger(multiplySmall(a, abs), sign);
          }
          b = smallToArray(abs);
        }
        if (useKaratsuba(a.length, b.length))
          return new BigInteger(multiplyKaratsuba(a, b), sign);
        return new BigInteger(multiplyLong(a, b), sign);
      };
      BigInteger.prototype.times = BigInteger.prototype.multiply;
      function multiplySmallAndArray(a, b, sign) {
        if (a < BASE) {
          return new BigInteger(multiplySmall(b, a), sign);
        }
        return new BigInteger(multiplyLong(b, smallToArray(a)), sign);
      }
      SmallInteger.prototype._multiplyBySmall = function(a) {
        if (isPrecise(a.value * this.value)) {
          return new SmallInteger(a.value * this.value);
        }
        return multiplySmallAndArray(Math.abs(a.value), smallToArray(Math.abs(this.value)), this.sign !== a.sign);
      };
      BigInteger.prototype._multiplyBySmall = function(a) {
        if (a.value === 0) return Integer[0];
        if (a.value === 1) return this;
        if (a.value === -1) return this.negate();
        return multiplySmallAndArray(Math.abs(a.value), this.value, this.sign !== a.sign);
      };
      SmallInteger.prototype.multiply = function(v) {
        return parseValue(v)._multiplyBySmall(this);
      };
      SmallInteger.prototype.times = SmallInteger.prototype.multiply;
      NativeBigInt.prototype.multiply = function(v) {
        return new NativeBigInt(this.value * parseValue(v).value);
      };
      NativeBigInt.prototype.times = NativeBigInt.prototype.multiply;
      function square(a) {
        var l = a.length, r = createArray(l + l), base = BASE, product, carry, i2, a_i, a_j;
        for (i2 = 0; i2 < l; i2++) {
          a_i = a[i2];
          carry = 0 - a_i * a_i;
          for (var j = i2; j < l; j++) {
            a_j = a[j];
            product = 2 * (a_i * a_j) + r[i2 + j] + carry;
            carry = Math.floor(product / base);
            r[i2 + j] = product - carry * base;
          }
          r[i2 + l] = carry;
        }
        trim(r);
        return r;
      }
      BigInteger.prototype.square = function() {
        return new BigInteger(square(this.value), false);
      };
      SmallInteger.prototype.square = function() {
        var value = this.value * this.value;
        if (isPrecise(value)) return new SmallInteger(value);
        return new BigInteger(square(smallToArray(Math.abs(this.value))), false);
      };
      NativeBigInt.prototype.square = function(v) {
        return new NativeBigInt(this.value * this.value);
      };
      function divMod1(a, b) {
        var a_l = a.length, b_l = b.length, base = BASE, result = createArray(b.length), divisorMostSignificantDigit = b[b_l - 1], lambda = Math.ceil(base / (2 * divisorMostSignificantDigit)), remainder = multiplySmall(a, lambda), divisor = multiplySmall(b, lambda), quotientDigit, shift, carry, borrow, i2, l, q;
        if (remainder.length <= a_l) remainder.push(0);
        divisor.push(0);
        divisorMostSignificantDigit = divisor[b_l - 1];
        for (shift = a_l - b_l; shift >= 0; shift--) {
          quotientDigit = base - 1;
          if (remainder[shift + b_l] !== divisorMostSignificantDigit) {
            quotientDigit = Math.floor((remainder[shift + b_l] * base + remainder[shift + b_l - 1]) / divisorMostSignificantDigit);
          }
          carry = 0;
          borrow = 0;
          l = divisor.length;
          for (i2 = 0; i2 < l; i2++) {
            carry += quotientDigit * divisor[i2];
            q = Math.floor(carry / base);
            borrow += remainder[shift + i2] - (carry - q * base);
            carry = q;
            if (borrow < 0) {
              remainder[shift + i2] = borrow + base;
              borrow = -1;
            } else {
              remainder[shift + i2] = borrow;
              borrow = 0;
            }
          }
          while (borrow !== 0) {
            quotientDigit -= 1;
            carry = 0;
            for (i2 = 0; i2 < l; i2++) {
              carry += remainder[shift + i2] - base + divisor[i2];
              if (carry < 0) {
                remainder[shift + i2] = carry + base;
                carry = 0;
              } else {
                remainder[shift + i2] = carry;
                carry = 1;
              }
            }
            borrow += carry;
          }
          result[shift] = quotientDigit;
        }
        remainder = divModSmall(remainder, lambda)[0];
        return [arrayToSmall(result), arrayToSmall(remainder)];
      }
      function divMod2(a, b) {
        var a_l = a.length, b_l = b.length, result = [], part = [], base = BASE, guess, xlen, highx, highy, check;
        while (a_l) {
          part.unshift(a[--a_l]);
          trim(part);
          if (compareAbs(part, b) < 0) {
            result.push(0);
            continue;
          }
          xlen = part.length;
          highx = part[xlen - 1] * base + part[xlen - 2];
          highy = b[b_l - 1] * base + b[b_l - 2];
          if (xlen > b_l) {
            highx = (highx + 1) * base;
          }
          guess = Math.ceil(highx / highy);
          do {
            check = multiplySmall(b, guess);
            if (compareAbs(check, part) <= 0) break;
            guess--;
          } while (guess);
          result.push(guess);
          part = subtract(part, check);
        }
        result.reverse();
        return [arrayToSmall(result), arrayToSmall(part)];
      }
      function divModSmall(value, lambda) {
        var length = value.length, quotient = createArray(length), base = BASE, i2, q, remainder, divisor;
        remainder = 0;
        for (i2 = length - 1; i2 >= 0; --i2) {
          divisor = remainder * base + value[i2];
          q = truncate(divisor / lambda);
          remainder = divisor - q * lambda;
          quotient[i2] = q | 0;
        }
        return [quotient, remainder | 0];
      }
      function divModAny(self2, v) {
        var value, n = parseValue(v);
        if (supportsNativeBigInt) {
          return [new NativeBigInt(self2.value / n.value), new NativeBigInt(self2.value % n.value)];
        }
        var a = self2.value, b = n.value;
        var quotient;
        if (b === 0) throw new Error("Cannot divide by zero");
        if (self2.isSmall) {
          if (n.isSmall) {
            return [new SmallInteger(truncate(a / b)), new SmallInteger(a % b)];
          }
          return [Integer[0], self2];
        }
        if (n.isSmall) {
          if (b === 1) return [self2, Integer[0]];
          if (b == -1) return [self2.negate(), Integer[0]];
          var abs = Math.abs(b);
          if (abs < BASE) {
            value = divModSmall(a, abs);
            quotient = arrayToSmall(value[0]);
            var remainder = value[1];
            if (self2.sign) remainder = -remainder;
            if (typeof quotient === "number") {
              if (self2.sign !== n.sign) quotient = -quotient;
              return [new SmallInteger(quotient), new SmallInteger(remainder)];
            }
            return [new BigInteger(quotient, self2.sign !== n.sign), new SmallInteger(remainder)];
          }
          b = smallToArray(abs);
        }
        var comparison = compareAbs(a, b);
        if (comparison === -1) return [Integer[0], self2];
        if (comparison === 0) return [Integer[self2.sign === n.sign ? 1 : -1], Integer[0]];
        if (a.length + b.length <= 200)
          value = divMod1(a, b);
        else value = divMod2(a, b);
        quotient = value[0];
        var qSign = self2.sign !== n.sign, mod = value[1], mSign = self2.sign;
        if (typeof quotient === "number") {
          if (qSign) quotient = -quotient;
          quotient = new SmallInteger(quotient);
        } else quotient = new BigInteger(quotient, qSign);
        if (typeof mod === "number") {
          if (mSign) mod = -mod;
          mod = new SmallInteger(mod);
        } else mod = new BigInteger(mod, mSign);
        return [quotient, mod];
      }
      BigInteger.prototype.divmod = function(v) {
        var result = divModAny(this, v);
        return {
          quotient: result[0],
          remainder: result[1]
        };
      };
      NativeBigInt.prototype.divmod = SmallInteger.prototype.divmod = BigInteger.prototype.divmod;
      BigInteger.prototype.divide = function(v) {
        return divModAny(this, v)[0];
      };
      NativeBigInt.prototype.over = NativeBigInt.prototype.divide = function(v) {
        return new NativeBigInt(this.value / parseValue(v).value);
      };
      SmallInteger.prototype.over = SmallInteger.prototype.divide = BigInteger.prototype.over = BigInteger.prototype.divide;
      BigInteger.prototype.mod = function(v) {
        return divModAny(this, v)[1];
      };
      NativeBigInt.prototype.mod = NativeBigInt.prototype.remainder = function(v) {
        return new NativeBigInt(this.value % parseValue(v).value);
      };
      SmallInteger.prototype.remainder = SmallInteger.prototype.mod = BigInteger.prototype.remainder = BigInteger.prototype.mod;
      BigInteger.prototype.pow = function(v) {
        var n = parseValue(v), a = this.value, b = n.value, value, x, y;
        if (b === 0) return Integer[1];
        if (a === 0) return Integer[0];
        if (a === 1) return Integer[1];
        if (a === -1) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.sign) {
          return Integer[0];
        }
        if (!n.isSmall) throw new Error("The exponent " + n.toString() + " is too large.");
        if (this.isSmall) {
          if (isPrecise(value = Math.pow(a, b)))
            return new SmallInteger(truncate(value));
        }
        x = this;
        y = Integer[1];
        while (true) {
          if (b & true) {
            y = y.times(x);
            --b;
          }
          if (b === 0) break;
          b /= 2;
          x = x.square();
        }
        return y;
      };
      SmallInteger.prototype.pow = BigInteger.prototype.pow;
      NativeBigInt.prototype.pow = function(v) {
        var n = parseValue(v);
        var a = this.value, b = n.value;
        var _0 = BigInt(0), _1 = BigInt(1), _2 = BigInt(2);
        if (b === _0) return Integer[1];
        if (a === _0) return Integer[0];
        if (a === _1) return Integer[1];
        if (a === BigInt(-1)) return n.isEven() ? Integer[1] : Integer[-1];
        if (n.isNegative()) return new NativeBigInt(_0);
        var x = this;
        var y = Integer[1];
        while (true) {
          if ((b & _1) === _1) {
            y = y.times(x);
            --b;
          }
          if (b === _0) break;
          b /= _2;
          x = x.square();
        }
        return y;
      };
      BigInteger.prototype.modPow = function(exp, mod) {
        exp = parseValue(exp);
        mod = parseValue(mod);
        if (mod.isZero()) throw new Error("Cannot take modPow with modulus 0");
        var r = Integer[1], base = this.mod(mod);
        if (exp.isNegative()) {
          exp = exp.multiply(Integer[-1]);
          base = base.modInv(mod);
        }
        while (exp.isPositive()) {
          if (base.isZero()) return Integer[0];
          if (exp.isOdd()) r = r.multiply(base).mod(mod);
          exp = exp.divide(2);
          base = base.square().mod(mod);
        }
        return r;
      };
      NativeBigInt.prototype.modPow = SmallInteger.prototype.modPow = BigInteger.prototype.modPow;
      function compareAbs(a, b) {
        if (a.length !== b.length) {
          return a.length > b.length ? 1 : -1;
        }
        for (var i2 = a.length - 1; i2 >= 0; i2--) {
          if (a[i2] !== b[i2]) return a[i2] > b[i2] ? 1 : -1;
        }
        return 0;
      }
      BigInteger.prototype.compareAbs = function(v) {
        var n = parseValue(v), a = this.value, b = n.value;
        if (n.isSmall) return 1;
        return compareAbs(a, b);
      };
      SmallInteger.prototype.compareAbs = function(v) {
        var n = parseValue(v), a = Math.abs(this.value), b = n.value;
        if (n.isSmall) {
          b = Math.abs(b);
          return a === b ? 0 : a > b ? 1 : -1;
        }
        return -1;
      };
      NativeBigInt.prototype.compareAbs = function(v) {
        var a = this.value;
        var b = parseValue(v).value;
        a = a >= 0 ? a : -a;
        b = b >= 0 ? b : -b;
        return a === b ? 0 : a > b ? 1 : -1;
      };
      BigInteger.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var n = parseValue(v), a = this.value, b = n.value;
        if (this.sign !== n.sign) {
          return n.sign ? 1 : -1;
        }
        if (n.isSmall) {
          return this.sign ? -1 : 1;
        }
        return compareAbs(a, b) * (this.sign ? -1 : 1);
      };
      BigInteger.prototype.compareTo = BigInteger.prototype.compare;
      SmallInteger.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var n = parseValue(v), a = this.value, b = n.value;
        if (n.isSmall) {
          return a == b ? 0 : a > b ? 1 : -1;
        }
        if (a < 0 !== n.sign) {
          return a < 0 ? -1 : 1;
        }
        return a < 0 ? 1 : -1;
      };
      SmallInteger.prototype.compareTo = SmallInteger.prototype.compare;
      NativeBigInt.prototype.compare = function(v) {
        if (v === Infinity) {
          return -1;
        }
        if (v === -Infinity) {
          return 1;
        }
        var a = this.value;
        var b = parseValue(v).value;
        return a === b ? 0 : a > b ? 1 : -1;
      };
      NativeBigInt.prototype.compareTo = NativeBigInt.prototype.compare;
      BigInteger.prototype.equals = function(v) {
        return this.compare(v) === 0;
      };
      NativeBigInt.prototype.eq = NativeBigInt.prototype.equals = SmallInteger.prototype.eq = SmallInteger.prototype.equals = BigInteger.prototype.eq = BigInteger.prototype.equals;
      BigInteger.prototype.notEquals = function(v) {
        return this.compare(v) !== 0;
      };
      NativeBigInt.prototype.neq = NativeBigInt.prototype.notEquals = SmallInteger.prototype.neq = SmallInteger.prototype.notEquals = BigInteger.prototype.neq = BigInteger.prototype.notEquals;
      BigInteger.prototype.greater = function(v) {
        return this.compare(v) > 0;
      };
      NativeBigInt.prototype.gt = NativeBigInt.prototype.greater = SmallInteger.prototype.gt = SmallInteger.prototype.greater = BigInteger.prototype.gt = BigInteger.prototype.greater;
      BigInteger.prototype.lesser = function(v) {
        return this.compare(v) < 0;
      };
      NativeBigInt.prototype.lt = NativeBigInt.prototype.lesser = SmallInteger.prototype.lt = SmallInteger.prototype.lesser = BigInteger.prototype.lt = BigInteger.prototype.lesser;
      BigInteger.prototype.greaterOrEquals = function(v) {
        return this.compare(v) >= 0;
      };
      NativeBigInt.prototype.geq = NativeBigInt.prototype.greaterOrEquals = SmallInteger.prototype.geq = SmallInteger.prototype.greaterOrEquals = BigInteger.prototype.geq = BigInteger.prototype.greaterOrEquals;
      BigInteger.prototype.lesserOrEquals = function(v) {
        return this.compare(v) <= 0;
      };
      NativeBigInt.prototype.leq = NativeBigInt.prototype.lesserOrEquals = SmallInteger.prototype.leq = SmallInteger.prototype.lesserOrEquals = BigInteger.prototype.leq = BigInteger.prototype.lesserOrEquals;
      BigInteger.prototype.isEven = function() {
        return (this.value[0] & 1) === 0;
      };
      SmallInteger.prototype.isEven = function() {
        return (this.value & 1) === 0;
      };
      NativeBigInt.prototype.isEven = function() {
        return (this.value & BigInt(1)) === BigInt(0);
      };
      BigInteger.prototype.isOdd = function() {
        return (this.value[0] & 1) === 1;
      };
      SmallInteger.prototype.isOdd = function() {
        return (this.value & 1) === 1;
      };
      NativeBigInt.prototype.isOdd = function() {
        return (this.value & BigInt(1)) === BigInt(1);
      };
      BigInteger.prototype.isPositive = function() {
        return !this.sign;
      };
      SmallInteger.prototype.isPositive = function() {
        return this.value > 0;
      };
      NativeBigInt.prototype.isPositive = SmallInteger.prototype.isPositive;
      BigInteger.prototype.isNegative = function() {
        return this.sign;
      };
      SmallInteger.prototype.isNegative = function() {
        return this.value < 0;
      };
      NativeBigInt.prototype.isNegative = SmallInteger.prototype.isNegative;
      BigInteger.prototype.isUnit = function() {
        return false;
      };
      SmallInteger.prototype.isUnit = function() {
        return Math.abs(this.value) === 1;
      };
      NativeBigInt.prototype.isUnit = function() {
        return this.abs().value === BigInt(1);
      };
      BigInteger.prototype.isZero = function() {
        return false;
      };
      SmallInteger.prototype.isZero = function() {
        return this.value === 0;
      };
      NativeBigInt.prototype.isZero = function() {
        return this.value === BigInt(0);
      };
      BigInteger.prototype.isDivisibleBy = function(v) {
        var n = parseValue(v);
        if (n.isZero()) return false;
        if (n.isUnit()) return true;
        if (n.compareAbs(2) === 0) return this.isEven();
        return this.mod(n).isZero();
      };
      NativeBigInt.prototype.isDivisibleBy = SmallInteger.prototype.isDivisibleBy = BigInteger.prototype.isDivisibleBy;
      function isBasicPrime(v) {
        var n = v.abs();
        if (n.isUnit()) return false;
        if (n.equals(2) || n.equals(3) || n.equals(5)) return true;
        if (n.isEven() || n.isDivisibleBy(3) || n.isDivisibleBy(5)) return false;
        if (n.lesser(49)) return true;
      }
      function millerRabinTest(n, a) {
        var nPrev = n.prev(), b = nPrev, r = 0, d, t, i2, x;
        while (b.isEven()) b = b.divide(2), r++;
        next: for (i2 = 0; i2 < a.length; i2++) {
          if (n.lesser(a[i2])) continue;
          x = bigInt3(a[i2]).modPow(b, n);
          if (x.isUnit() || x.equals(nPrev)) continue;
          for (d = r - 1; d != 0; d--) {
            x = x.square().mod(n);
            if (x.isUnit()) return false;
            if (x.equals(nPrev)) continue next;
          }
          return false;
        }
        return true;
      }
      BigInteger.prototype.isPrime = function(strict) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined2) return isPrime;
        var n = this.abs();
        var bits = n.bitLength();
        if (bits <= 64)
          return millerRabinTest(n, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
        var logN = Math.log(2) * bits.toJSNumber();
        var t = Math.ceil(strict === true ? 2 * Math.pow(logN, 2) : logN);
        for (var a = [], i2 = 0; i2 < t; i2++) {
          a.push(bigInt3(i2 + 2));
        }
        return millerRabinTest(n, a);
      };
      NativeBigInt.prototype.isPrime = SmallInteger.prototype.isPrime = BigInteger.prototype.isPrime;
      BigInteger.prototype.isProbablePrime = function(iterations, rng2) {
        var isPrime = isBasicPrime(this);
        if (isPrime !== undefined2) return isPrime;
        var n = this.abs();
        var t = iterations === undefined2 ? 5 : iterations;
        for (var a = [], i2 = 0; i2 < t; i2++) {
          a.push(bigInt3.randBetween(2, n.minus(2), rng2));
        }
        return millerRabinTest(n, a);
      };
      NativeBigInt.prototype.isProbablePrime = SmallInteger.prototype.isProbablePrime = BigInteger.prototype.isProbablePrime;
      BigInteger.prototype.modInv = function(n) {
        var t = bigInt3.zero, newT = bigInt3.one, r = parseValue(n), newR = this.abs(), q, lastT, lastR;
        while (!newR.isZero()) {
          q = r.divide(newR);
          lastT = t;
          lastR = r;
          t = newT;
          r = newR;
          newT = lastT.subtract(q.multiply(newT));
          newR = lastR.subtract(q.multiply(newR));
        }
        if (!r.isUnit()) throw new Error(this.toString() + " and " + n.toString() + " are not co-prime");
        if (t.compare(0) === -1) {
          t = t.add(n);
        }
        if (this.isNegative()) {
          return t.negate();
        }
        return t;
      };
      NativeBigInt.prototype.modInv = SmallInteger.prototype.modInv = BigInteger.prototype.modInv;
      BigInteger.prototype.next = function() {
        var value = this.value;
        if (this.sign) {
          return subtractSmall(value, 1, this.sign);
        }
        return new BigInteger(addSmall(value, 1), this.sign);
      };
      SmallInteger.prototype.next = function() {
        var value = this.value;
        if (value + 1 < MAX_INT) return new SmallInteger(value + 1);
        return new BigInteger(MAX_INT_ARR, false);
      };
      NativeBigInt.prototype.next = function() {
        return new NativeBigInt(this.value + BigInt(1));
      };
      BigInteger.prototype.prev = function() {
        var value = this.value;
        if (this.sign) {
          return new BigInteger(addSmall(value, 1), true);
        }
        return subtractSmall(value, 1, this.sign);
      };
      SmallInteger.prototype.prev = function() {
        var value = this.value;
        if (value - 1 > -MAX_INT) return new SmallInteger(value - 1);
        return new BigInteger(MAX_INT_ARR, true);
      };
      NativeBigInt.prototype.prev = function() {
        return new NativeBigInt(this.value - BigInt(1));
      };
      var powersOfTwo = [1];
      while (2 * powersOfTwo[powersOfTwo.length - 1] <= BASE) powersOfTwo.push(2 * powersOfTwo[powersOfTwo.length - 1]);
      var powers2Length = powersOfTwo.length, highestPower2 = powersOfTwo[powers2Length - 1];
      function shift_isSmall(n) {
        return Math.abs(n) <= BASE;
      }
      BigInteger.prototype.shiftLeft = function(v) {
        var n = parseValue(v).toJSNumber();
        if (!shift_isSmall(n)) {
          throw new Error(String(n) + " is too large for shifting.");
        }
        if (n < 0) return this.shiftRight(-n);
        var result = this;
        if (result.isZero()) return result;
        while (n >= powers2Length) {
          result = result.multiply(highestPower2);
          n -= powers2Length - 1;
        }
        return result.multiply(powersOfTwo[n]);
      };
      NativeBigInt.prototype.shiftLeft = SmallInteger.prototype.shiftLeft = BigInteger.prototype.shiftLeft;
      BigInteger.prototype.shiftRight = function(v) {
        var remQuo;
        var n = parseValue(v).toJSNumber();
        if (!shift_isSmall(n)) {
          throw new Error(String(n) + " is too large for shifting.");
        }
        if (n < 0) return this.shiftLeft(-n);
        var result = this;
        while (n >= powers2Length) {
          if (result.isZero() || result.isNegative() && result.isUnit()) return result;
          remQuo = divModAny(result, highestPower2);
          result = remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
          n -= powers2Length - 1;
        }
        remQuo = divModAny(result, powersOfTwo[n]);
        return remQuo[1].isNegative() ? remQuo[0].prev() : remQuo[0];
      };
      NativeBigInt.prototype.shiftRight = SmallInteger.prototype.shiftRight = BigInteger.prototype.shiftRight;
      function bitwise(x, y, fn) {
        y = parseValue(y);
        var xSign = x.isNegative(), ySign = y.isNegative();
        var xRem = xSign ? x.not() : x, yRem = ySign ? y.not() : y;
        var xDigit = 0, yDigit = 0;
        var xDivMod = null, yDivMod = null;
        var result = [];
        while (!xRem.isZero() || !yRem.isZero()) {
          xDivMod = divModAny(xRem, highestPower2);
          xDigit = xDivMod[1].toJSNumber();
          if (xSign) {
            xDigit = highestPower2 - 1 - xDigit;
          }
          yDivMod = divModAny(yRem, highestPower2);
          yDigit = yDivMod[1].toJSNumber();
          if (ySign) {
            yDigit = highestPower2 - 1 - yDigit;
          }
          xRem = xDivMod[0];
          yRem = yDivMod[0];
          result.push(fn(xDigit, yDigit));
        }
        var sum = fn(xSign ? 1 : 0, ySign ? 1 : 0) !== 0 ? bigInt3(-1) : bigInt3(0);
        for (var i2 = result.length - 1; i2 >= 0; i2 -= 1) {
          sum = sum.multiply(highestPower2).add(bigInt3(result[i2]));
        }
        return sum;
      }
      BigInteger.prototype.not = function() {
        return this.negate().prev();
      };
      NativeBigInt.prototype.not = SmallInteger.prototype.not = BigInteger.prototype.not;
      BigInteger.prototype.and = function(n) {
        return bitwise(this, n, function(a, b) {
          return a & b;
        });
      };
      NativeBigInt.prototype.and = SmallInteger.prototype.and = BigInteger.prototype.and;
      BigInteger.prototype.or = function(n) {
        return bitwise(this, n, function(a, b) {
          return a | b;
        });
      };
      NativeBigInt.prototype.or = SmallInteger.prototype.or = BigInteger.prototype.or;
      BigInteger.prototype.xor = function(n) {
        return bitwise(this, n, function(a, b) {
          return a ^ b;
        });
      };
      NativeBigInt.prototype.xor = SmallInteger.prototype.xor = BigInteger.prototype.xor;
      var LOBMASK_I = 1 << 30, LOBMASK_BI = (BASE & -BASE) * (BASE & -BASE) | LOBMASK_I;
      function roughLOB(n) {
        var v = n.value, x = typeof v === "number" ? v | LOBMASK_I : typeof v === "bigint" ? v | BigInt(LOBMASK_I) : v[0] + v[1] * BASE | LOBMASK_BI;
        return x & -x;
      }
      function integerLogarithm(value, base) {
        if (base.compareTo(value) <= 0) {
          var tmp = integerLogarithm(value, base.square(base));
          var p = tmp.p;
          var e = tmp.e;
          var t = p.multiply(base);
          return t.compareTo(value) <= 0 ? { p: t, e: e * 2 + 1 } : { p, e: e * 2 };
        }
        return { p: bigInt3(1), e: 0 };
      }
      BigInteger.prototype.bitLength = function() {
        var n = this;
        if (n.compareTo(bigInt3(0)) < 0) {
          n = n.negate().subtract(bigInt3(1));
        }
        if (n.compareTo(bigInt3(0)) === 0) {
          return bigInt3(0);
        }
        return bigInt3(integerLogarithm(n, bigInt3(2)).e).add(bigInt3(1));
      };
      NativeBigInt.prototype.bitLength = SmallInteger.prototype.bitLength = BigInteger.prototype.bitLength;
      function max(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.greater(b) ? a : b;
      }
      function min(a, b) {
        a = parseValue(a);
        b = parseValue(b);
        return a.lesser(b) ? a : b;
      }
      function gcd(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        if (a.equals(b)) return a;
        if (a.isZero()) return b;
        if (b.isZero()) return a;
        var c = Integer[1], d, t;
        while (a.isEven() && b.isEven()) {
          d = min(roughLOB(a), roughLOB(b));
          a = a.divide(d);
          b = b.divide(d);
          c = c.multiply(d);
        }
        while (a.isEven()) {
          a = a.divide(roughLOB(a));
        }
        do {
          while (b.isEven()) {
            b = b.divide(roughLOB(b));
          }
          if (a.greater(b)) {
            t = b;
            b = a;
            a = t;
          }
          b = b.subtract(a);
        } while (!b.isZero());
        return c.isUnit() ? a : a.multiply(c);
      }
      function lcm(a, b) {
        a = parseValue(a).abs();
        b = parseValue(b).abs();
        return a.divide(gcd(a, b)).multiply(b);
      }
      function randBetween(a, b, rng2) {
        a = parseValue(a);
        b = parseValue(b);
        var usedRNG = rng2 || Math.random;
        var low = min(a, b), high = max(a, b);
        var range = high.subtract(low).add(1);
        if (range.isSmall) return low.add(Math.floor(usedRNG() * range));
        var digits = toBase(range, BASE).value;
        var result = [], restricted = true;
        for (var i2 = 0; i2 < digits.length; i2++) {
          var top = restricted ? digits[i2] + (i2 + 1 < digits.length ? digits[i2 + 1] / BASE : 0) : BASE;
          var digit = truncate(usedRNG() * top);
          result.push(digit);
          if (digit < digits[i2]) restricted = false;
        }
        return low.add(Integer.fromArray(result, BASE, false));
      }
      var parseBase = function(text, base, alphabet, caseSensitive) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        text = String(text);
        if (!caseSensitive) {
          text = text.toLowerCase();
          alphabet = alphabet.toLowerCase();
        }
        var length = text.length;
        var i2;
        var absBase = Math.abs(base);
        var alphabetValues = {};
        for (i2 = 0; i2 < alphabet.length; i2++) {
          alphabetValues[alphabet[i2]] = i2;
        }
        for (i2 = 0; i2 < length; i2++) {
          var c = text[i2];
          if (c === "-") continue;
          if (c in alphabetValues) {
            if (alphabetValues[c] >= absBase) {
              if (c === "1" && absBase === 1) continue;
              throw new Error(c + " is not a valid digit in base " + base + ".");
            }
          }
        }
        base = parseValue(base);
        var digits = [];
        var isNegative = text[0] === "-";
        for (i2 = isNegative ? 1 : 0; i2 < text.length; i2++) {
          var c = text[i2];
          if (c in alphabetValues) digits.push(parseValue(alphabetValues[c]));
          else if (c === "<") {
            var start = i2;
            do {
              i2++;
            } while (text[i2] !== ">" && i2 < text.length);
            digits.push(parseValue(text.slice(start + 1, i2)));
          } else throw new Error(c + " is not a valid character");
        }
        return parseBaseFromArray(digits, base, isNegative);
      };
      function parseBaseFromArray(digits, base, isNegative) {
        var val = Integer[0], pow = Integer[1], i2;
        for (i2 = digits.length - 1; i2 >= 0; i2--) {
          val = val.add(digits[i2].times(pow));
          pow = pow.times(base);
        }
        return isNegative ? val.negate() : val;
      }
      function stringify(digit, alphabet) {
        alphabet = alphabet || DEFAULT_ALPHABET;
        if (digit < alphabet.length) {
          return alphabet[digit];
        }
        return "<" + digit + ">";
      }
      function toBase(n, base) {
        base = bigInt3(base);
        if (base.isZero()) {
          if (n.isZero()) return { value: [0], isNegative: false };
          throw new Error("Cannot convert nonzero numbers to base 0.");
        }
        if (base.equals(-1)) {
          if (n.isZero()) return { value: [0], isNegative: false };
          if (n.isNegative())
            return {
              value: [].concat.apply(
                [],
                Array.apply(null, Array(-n.toJSNumber())).map(Array.prototype.valueOf, [1, 0])
              ),
              isNegative: false
            };
          var arr = Array.apply(null, Array(n.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
          arr.unshift([1]);
          return {
            value: [].concat.apply([], arr),
            isNegative: false
          };
        }
        var neg = false;
        if (n.isNegative() && base.isPositive()) {
          neg = true;
          n = n.abs();
        }
        if (base.isUnit()) {
          if (n.isZero()) return { value: [0], isNegative: false };
          return {
            value: Array.apply(null, Array(n.toJSNumber())).map(Number.prototype.valueOf, 1),
            isNegative: neg
          };
        }
        var out = [];
        var left = n, divmod;
        while (left.isNegative() || left.compareAbs(base) >= 0) {
          divmod = left.divmod(base);
          left = divmod.quotient;
          var digit = divmod.remainder;
          if (digit.isNegative()) {
            digit = base.minus(digit).abs();
            left = left.next();
          }
          out.push(digit.toJSNumber());
        }
        out.push(left.toJSNumber());
        return { value: out.reverse(), isNegative: neg };
      }
      function toBaseString(n, base, alphabet) {
        var arr = toBase(n, base);
        return (arr.isNegative ? "-" : "") + arr.value.map(function(x) {
          return stringify(x, alphabet);
        }).join("");
      }
      BigInteger.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      SmallInteger.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      NativeBigInt.prototype.toArray = function(radix) {
        return toBase(this, radix);
      };
      BigInteger.prototype.toString = function(radix, alphabet) {
        if (radix === undefined2) radix = 10;
        if (radix !== 10 || alphabet) return toBaseString(this, radix, alphabet);
        var v = this.value, l = v.length, str = String(v[--l]), zeros = "0000000", digit;
        while (--l >= 0) {
          digit = String(v[l]);
          str += zeros.slice(digit.length) + digit;
        }
        var sign = this.sign ? "-" : "";
        return sign + str;
      };
      SmallInteger.prototype.toString = function(radix, alphabet) {
        if (radix === undefined2) radix = 10;
        if (radix != 10 || alphabet) return toBaseString(this, radix, alphabet);
        return String(this.value);
      };
      NativeBigInt.prototype.toString = SmallInteger.prototype.toString;
      NativeBigInt.prototype.toJSON = BigInteger.prototype.toJSON = SmallInteger.prototype.toJSON = function() {
        return this.toString();
      };
      BigInteger.prototype.valueOf = function() {
        return parseInt(this.toString(), 10);
      };
      BigInteger.prototype.toJSNumber = BigInteger.prototype.valueOf;
      SmallInteger.prototype.valueOf = function() {
        return this.value;
      };
      SmallInteger.prototype.toJSNumber = SmallInteger.prototype.valueOf;
      NativeBigInt.prototype.valueOf = NativeBigInt.prototype.toJSNumber = function() {
        return parseInt(this.toString(), 10);
      };
      function parseStringValue(v) {
        if (isPrecise(+v)) {
          var x = +v;
          if (x === truncate(x))
            return supportsNativeBigInt ? new NativeBigInt(BigInt(x)) : new SmallInteger(x);
          throw new Error("Invalid integer: " + v);
        }
        var sign = v[0] === "-";
        if (sign) v = v.slice(1);
        var split = v.split(/e/i);
        if (split.length > 2) throw new Error("Invalid integer: " + split.join("e"));
        if (split.length === 2) {
          var exp = split[1];
          if (exp[0] === "+") exp = exp.slice(1);
          exp = +exp;
          if (exp !== truncate(exp) || !isPrecise(exp)) throw new Error("Invalid integer: " + exp + " is not a valid exponent.");
          var text = split[0];
          var decimalPlace = text.indexOf(".");
          if (decimalPlace >= 0) {
            exp -= text.length - decimalPlace - 1;
            text = text.slice(0, decimalPlace) + text.slice(decimalPlace + 1);
          }
          if (exp < 0) throw new Error("Cannot include negative exponent part for integers");
          text += new Array(exp + 1).join("0");
          v = text;
        }
        var isValid2 = /^([0-9][0-9]*)$/.test(v);
        if (!isValid2) throw new Error("Invalid integer: " + v);
        if (supportsNativeBigInt) {
          return new NativeBigInt(BigInt(sign ? "-" + v : v));
        }
        var r = [], max2 = v.length, l = LOG_BASE, min2 = max2 - l;
        while (max2 > 0) {
          r.push(+v.slice(min2, max2));
          min2 -= l;
          if (min2 < 0) min2 = 0;
          max2 -= l;
        }
        trim(r);
        return new BigInteger(r, sign);
      }
      function parseNumberValue(v) {
        if (supportsNativeBigInt) {
          return new NativeBigInt(BigInt(v));
        }
        if (isPrecise(v)) {
          if (v !== truncate(v)) throw new Error(v + " is not an integer.");
          return new SmallInteger(v);
        }
        return parseStringValue(v.toString());
      }
      function parseValue(v) {
        if (typeof v === "number") {
          return parseNumberValue(v);
        }
        if (typeof v === "string") {
          return parseStringValue(v);
        }
        if (typeof v === "bigint") {
          return new NativeBigInt(v);
        }
        return v;
      }
      for (var i = 0; i < 1e3; i++) {
        Integer[i] = parseValue(i);
        if (i > 0) Integer[-i] = parseValue(-i);
      }
      Integer.one = Integer[1];
      Integer.zero = Integer[0];
      Integer.minusOne = Integer[-1];
      Integer.max = max;
      Integer.min = min;
      Integer.gcd = gcd;
      Integer.lcm = lcm;
      Integer.isInstance = function(x) {
        return x instanceof BigInteger || x instanceof SmallInteger || x instanceof NativeBigInt;
      };
      Integer.randBetween = randBetween;
      Integer.fromArray = function(digits, base, isNegative) {
        return parseBaseFromArray(digits.map(parseValue), parseValue(base || 10), isNegative);
      };
      return Integer;
    }();
    if (typeof module !== "undefined" && module.hasOwnProperty("exports")) {
      module.exports = bigInt3;
    }
    if (typeof define === "function" && define.amd) {
      define(function() {
        return bigInt3;
      });
    }
  }
});

// node_modules/decimal.js-light/decimal.js
var require_decimal = __commonJS({
  "node_modules/decimal.js-light/decimal.js"(exports, module) {
    (function(globalScope) {
      "use strict";
      var MAX_DIGITS = 1e9, Decimal2 = {
        // These values must be integers within the stated ranges (inclusive).
        // Most of these values can be changed during run-time using `Decimal.config`.
        // The maximum number of significant digits of the result of a calculation or base conversion.
        // E.g. `Decimal.config({ precision: 20 });`
        precision: 20,
        // 1 to MAX_DIGITS
        // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
        // `toFixed`, `toPrecision` and `toSignificantDigits`.
        //
        // ROUND_UP         0 Away from zero.
        // ROUND_DOWN       1 Towards zero.
        // ROUND_CEIL       2 Towards +Infinity.
        // ROUND_FLOOR      3 Towards -Infinity.
        // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
        // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
        // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
        // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
        // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
        //
        // E.g.
        // `Decimal.rounding = 4;`
        // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
        rounding: 4,
        // 0 to 8
        // The exponent value at and beneath which `toString` returns exponential notation.
        // JavaScript numbers: -7
        toExpNeg: -7,
        // 0 to -MAX_E
        // The exponent value at and above which `toString` returns exponential notation.
        // JavaScript numbers: 21
        toExpPos: 21,
        // 0 to MAX_E
        // The natural logarithm of 10.
        // 115 digits
        LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
      }, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", exponentOutOfRange = decimalError + "Exponent out of range: ", mathfloor = Math.floor, mathpow = Math.pow, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ONE, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE), P = {};
      P.absoluteValue = P.abs = function() {
        var x = new this.constructor(this);
        if (x.s) x.s = 1;
        return x;
      };
      P.comparedTo = P.cmp = function(y) {
        var i, j, xdL, ydL, x = this;
        y = new x.constructor(y);
        if (x.s !== y.s) return x.s || -y.s;
        if (x.e !== y.e) return x.e > y.e ^ x.s < 0 ? 1 : -1;
        xdL = x.d.length;
        ydL = y.d.length;
        for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
          if (x.d[i] !== y.d[i]) return x.d[i] > y.d[i] ^ x.s < 0 ? 1 : -1;
        }
        return xdL === ydL ? 0 : xdL > ydL ^ x.s < 0 ? 1 : -1;
      };
      P.decimalPlaces = P.dp = function() {
        var x = this, w = x.d.length - 1, dp = (w - x.e) * LOG_BASE;
        w = x.d[w];
        if (w) for (; w % 10 == 0; w /= 10) dp--;
        return dp < 0 ? 0 : dp;
      };
      P.dividedBy = P.div = function(y) {
        return divide(this, new this.constructor(y));
      };
      P.dividedToIntegerBy = P.idiv = function(y) {
        var x = this, Ctor = x.constructor;
        return round(divide(x, new Ctor(y), 0, 1), Ctor.precision);
      };
      P.equals = P.eq = function(y) {
        return !this.cmp(y);
      };
      P.exponent = function() {
        return getBase10Exponent(this);
      };
      P.greaterThan = P.gt = function(y) {
        return this.cmp(y) > 0;
      };
      P.greaterThanOrEqualTo = P.gte = function(y) {
        return this.cmp(y) >= 0;
      };
      P.isInteger = P.isint = function() {
        return this.e > this.d.length - 2;
      };
      P.isNegative = P.isneg = function() {
        return this.s < 0;
      };
      P.isPositive = P.ispos = function() {
        return this.s > 0;
      };
      P.isZero = function() {
        return this.s === 0;
      };
      P.lessThan = P.lt = function(y) {
        return this.cmp(y) < 0;
      };
      P.lessThanOrEqualTo = P.lte = function(y) {
        return this.cmp(y) < 1;
      };
      P.logarithm = P.log = function(base) {
        var r, x = this, Ctor = x.constructor, pr = Ctor.precision, wpr = pr + 5;
        if (base === void 0) {
          base = new Ctor(10);
        } else {
          base = new Ctor(base);
          if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + "NaN");
        }
        if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
        if (x.eq(ONE)) return new Ctor(0);
        external = false;
        r = divide(ln(x, wpr), ln(base, wpr), wpr);
        external = true;
        return round(r, pr);
      };
      P.minus = P.sub = function(y) {
        var x = this;
        y = new x.constructor(y);
        return x.s == y.s ? subtract(x, y) : add(x, (y.s = -y.s, y));
      };
      P.modulo = P.mod = function(y) {
        var q, x = this, Ctor = x.constructor, pr = Ctor.precision;
        y = new Ctor(y);
        if (!y.s) throw Error(decimalError + "NaN");
        if (!x.s) return round(new Ctor(x), pr);
        external = false;
        q = divide(x, y, 0, 1).times(y);
        external = true;
        return x.minus(q);
      };
      P.naturalExponential = P.exp = function() {
        return exp(this);
      };
      P.naturalLogarithm = P.ln = function() {
        return ln(this);
      };
      P.negated = P.neg = function() {
        var x = new this.constructor(this);
        x.s = -x.s || 0;
        return x;
      };
      P.plus = P.add = function(y) {
        var x = this;
        y = new x.constructor(y);
        return x.s == y.s ? add(x, y) : subtract(x, (y.s = -y.s, y));
      };
      P.precision = P.sd = function(z2) {
        var e, sd, w, x = this;
        if (z2 !== void 0 && z2 !== !!z2 && z2 !== 1 && z2 !== 0) throw Error(invalidArgument + z2);
        e = getBase10Exponent(x) + 1;
        w = x.d.length - 1;
        sd = w * LOG_BASE + 1;
        w = x.d[w];
        if (w) {
          for (; w % 10 == 0; w /= 10) sd--;
          for (w = x.d[0]; w >= 10; w /= 10) sd++;
        }
        return z2 && e > sd ? e : sd;
      };
      P.squareRoot = P.sqrt = function() {
        var e, n, pr, r, s, t, wpr, x = this, Ctor = x.constructor;
        if (x.s < 1) {
          if (!x.s) return new Ctor(0);
          throw Error(decimalError + "NaN");
        }
        e = getBase10Exponent(x);
        external = false;
        s = Math.sqrt(+x);
        if (s == 0 || s == 1 / 0) {
          n = digitsToString(x.d);
          if ((n.length + e) % 2 == 0) n += "0";
          s = Math.sqrt(n);
          e = mathfloor((e + 1) / 2) - (e < 0 || e % 2);
          if (s == 1 / 0) {
            n = "5e" + e;
          } else {
            n = s.toExponential();
            n = n.slice(0, n.indexOf("e") + 1) + e;
          }
          r = new Ctor(n);
        } else {
          r = new Ctor(s.toString());
        }
        pr = Ctor.precision;
        s = wpr = pr + 3;
        for (; ; ) {
          t = r;
          r = t.plus(divide(x, t, wpr + 2)).times(0.5);
          if (digitsToString(t.d).slice(0, wpr) === (n = digitsToString(r.d)).slice(0, wpr)) {
            n = n.slice(wpr - 3, wpr + 1);
            if (s == wpr && n == "4999") {
              round(t, pr + 1, 0);
              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            } else if (n != "9999") {
              break;
            }
            wpr += 4;
          }
        }
        external = true;
        return round(r, pr);
      };
      P.times = P.mul = function(y) {
        var carry, e, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
        if (!x.s || !y.s) return new Ctor(0);
        y.s *= x.s;
        e = x.e + y.e;
        xdL = xd.length;
        ydL = yd.length;
        if (xdL < ydL) {
          r = xd;
          xd = yd;
          yd = r;
          rL = xdL;
          xdL = ydL;
          ydL = rL;
        }
        r = [];
        rL = xdL + ydL;
        for (i = rL; i--; ) r.push(0);
        for (i = ydL; --i >= 0; ) {
          carry = 0;
          for (k = xdL + i; k > i; ) {
            t = r[k] + yd[i] * xd[k - i - 1] + carry;
            r[k--] = t % BASE | 0;
            carry = t / BASE | 0;
          }
          r[k] = (r[k] + carry) % BASE | 0;
        }
        for (; !r[--rL]; ) r.pop();
        if (carry) ++e;
        else r.shift();
        y.d = r;
        y.e = e;
        return external ? round(y, Ctor.precision) : y;
      };
      P.toDecimalPlaces = P.todp = function(dp, rm) {
        var x = this, Ctor = x.constructor;
        x = new Ctor(x);
        if (dp === void 0) return x;
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        return round(x, dp + getBase10Exponent(x) + 1, rm);
      };
      P.toExponential = function(dp, rm) {
        var str, x = this, Ctor = x.constructor;
        if (dp === void 0) {
          str = toString(x, true);
        } else {
          checkInt32(dp, 0, MAX_DIGITS);
          if (rm === void 0) rm = Ctor.rounding;
          else checkInt32(rm, 0, 8);
          x = round(new Ctor(x), dp + 1, rm);
          str = toString(x, true, dp + 1);
        }
        return str;
      };
      P.toFixed = function(dp, rm) {
        var str, y, x = this, Ctor = x.constructor;
        if (dp === void 0) return toString(x);
        checkInt32(dp, 0, MAX_DIGITS);
        if (rm === void 0) rm = Ctor.rounding;
        else checkInt32(rm, 0, 8);
        y = round(new Ctor(x), dp + getBase10Exponent(x) + 1, rm);
        str = toString(y.abs(), false, dp + getBase10Exponent(y) + 1);
        return x.isneg() && !x.isZero() ? "-" + str : str;
      };
      P.toInteger = P.toint = function() {
        var x = this, Ctor = x.constructor;
        return round(new Ctor(x), getBase10Exponent(x) + 1, Ctor.rounding);
      };
      P.toNumber = function() {
        return +this;
      };
      P.toPower = P.pow = function(y) {
        var e, k, pr, r, sign, yIsInt, x = this, Ctor = x.constructor, guard = 12, yn = +(y = new Ctor(y));
        if (!y.s) return new Ctor(ONE);
        x = new Ctor(x);
        if (!x.s) {
          if (y.s < 1) throw Error(decimalError + "Infinity");
          return x;
        }
        if (x.eq(ONE)) return x;
        pr = Ctor.precision;
        if (y.eq(ONE)) return round(x, pr);
        e = y.e;
        k = y.d.length - 1;
        yIsInt = e >= k;
        sign = x.s;
        if (!yIsInt) {
          if (sign < 0) throw Error(decimalError + "NaN");
        } else if ((k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
          r = new Ctor(ONE);
          e = Math.ceil(pr / LOG_BASE + 4);
          external = false;
          for (; ; ) {
            if (k % 2) {
              r = r.times(x);
              truncate(r.d, e);
            }
            k = mathfloor(k / 2);
            if (k === 0) break;
            x = x.times(x);
            truncate(x.d, e);
          }
          external = true;
          return y.s < 0 ? new Ctor(ONE).div(r) : round(r, pr);
        }
        sign = sign < 0 && y.d[Math.max(e, k)] & 1 ? -1 : 1;
        x.s = 1;
        external = false;
        r = y.times(ln(x, pr + guard));
        external = true;
        r = exp(r);
        r.s = sign;
        return r;
      };
      P.toPrecision = function(sd, rm) {
        var e, str, x = this, Ctor = x.constructor;
        if (sd === void 0) {
          e = getBase10Exponent(x);
          str = toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
        } else {
          checkInt32(sd, 1, MAX_DIGITS);
          if (rm === void 0) rm = Ctor.rounding;
          else checkInt32(rm, 0, 8);
          x = round(new Ctor(x), sd, rm);
          e = getBase10Exponent(x);
          str = toString(x, sd <= e || e <= Ctor.toExpNeg, sd);
        }
        return str;
      };
      P.toSignificantDigits = P.tosd = function(sd, rm) {
        var x = this, Ctor = x.constructor;
        if (sd === void 0) {
          sd = Ctor.precision;
          rm = Ctor.rounding;
        } else {
          checkInt32(sd, 1, MAX_DIGITS);
          if (rm === void 0) rm = Ctor.rounding;
          else checkInt32(rm, 0, 8);
        }
        return round(new Ctor(x), sd, rm);
      };
      P.toString = P.valueOf = P.val = P.toJSON = function() {
        var x = this, e = getBase10Exponent(x), Ctor = x.constructor;
        return toString(x, e <= Ctor.toExpNeg || e >= Ctor.toExpPos);
      };
      function add(x, y) {
        var carry, d, e, i, k, len, xd, yd, Ctor = x.constructor, pr = Ctor.precision;
        if (!x.s || !y.s) {
          if (!y.s) y = new Ctor(x);
          return external ? round(y, pr) : y;
        }
        xd = x.d;
        yd = y.d;
        k = x.e;
        e = y.e;
        xd = xd.slice();
        i = k - e;
        if (i) {
          if (i < 0) {
            d = xd;
            i = -i;
            len = yd.length;
          } else {
            d = yd;
            e = k;
            len = xd.length;
          }
          k = Math.ceil(pr / LOG_BASE);
          len = k > len ? k + 1 : len + 1;
          if (i > len) {
            i = len;
            d.length = 1;
          }
          d.reverse();
          for (; i--; ) d.push(0);
          d.reverse();
        }
        len = xd.length;
        i = yd.length;
        if (len - i < 0) {
          i = len;
          d = yd;
          yd = xd;
          xd = d;
        }
        for (carry = 0; i; ) {
          carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
          xd[i] %= BASE;
        }
        if (carry) {
          xd.unshift(carry);
          ++e;
        }
        for (len = xd.length; xd[--len] == 0; ) xd.pop();
        y.d = xd;
        y.e = e;
        return external ? round(y, pr) : y;
      }
      function checkInt32(i, min, max) {
        if (i !== ~~i || i < min || i > max) {
          throw Error(invalidArgument + i);
        }
      }
      function digitsToString(d) {
        var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
        if (indexOfLastWord > 0) {
          str += w;
          for (i = 1; i < indexOfLastWord; i++) {
            ws = d[i] + "";
            k = LOG_BASE - ws.length;
            if (k) str += getZeroString(k);
            str += ws;
          }
          w = d[i];
          ws = w + "";
          k = LOG_BASE - ws.length;
          if (k) str += getZeroString(k);
        } else if (w === 0) {
          return "0";
        }
        for (; w % 10 === 0; ) w /= 10;
        return str + w;
      }
      var divide = /* @__PURE__ */ function() {
        function multiplyInteger(x, k) {
          var temp, carry = 0, i = x.length;
          for (x = x.slice(); i--; ) {
            temp = x[i] * k + carry;
            x[i] = temp % BASE | 0;
            carry = temp / BASE | 0;
          }
          if (carry) x.unshift(carry);
          return x;
        }
        function compare(a, b, aL, bL) {
          var i, r;
          if (aL != bL) {
            r = aL > bL ? 1 : -1;
          } else {
            for (i = r = 0; i < aL; i++) {
              if (a[i] != b[i]) {
                r = a[i] > b[i] ? 1 : -1;
                break;
              }
            }
          }
          return r;
        }
        function subtract2(a, b, aL) {
          var i = 0;
          for (; aL--; ) {
            a[aL] -= i;
            i = a[aL] < b[aL] ? 1 : 0;
            a[aL] = i * BASE + a[aL] - b[aL];
          }
          for (; !a[0] && a.length > 1; ) a.shift();
        }
        return function(x, y, pr, dp) {
          var cmp, e, i, k, prod, prodL, q, qd, rem, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
          if (!x.s) return new Ctor(x);
          if (!y.s) throw Error(decimalError + "Division by zero");
          e = x.e - y.e;
          yL = yd.length;
          xL = xd.length;
          q = new Ctor(sign);
          qd = q.d = [];
          for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
          if (yd[i] > (xd[i] || 0)) --e;
          if (pr == null) {
            sd = pr = Ctor.precision;
          } else if (dp) {
            sd = pr + (getBase10Exponent(x) - getBase10Exponent(y)) + 1;
          } else {
            sd = pr;
          }
          if (sd < 0) return new Ctor(0);
          sd = sd / LOG_BASE + 2 | 0;
          i = 0;
          if (yL == 1) {
            k = 0;
            yd = yd[0];
            sd++;
            for (; (i < xL || k) && sd--; i++) {
              t = k * BASE + (xd[i] || 0);
              qd[i] = t / yd | 0;
              k = t % yd | 0;
            }
          } else {
            k = BASE / (yd[0] + 1) | 0;
            if (k > 1) {
              yd = multiplyInteger(yd, k);
              xd = multiplyInteger(xd, k);
              yL = yd.length;
              xL = xd.length;
            }
            xi = yL;
            rem = xd.slice(0, yL);
            remL = rem.length;
            for (; remL < yL; ) rem[remL++] = 0;
            yz = yd.slice();
            yz.unshift(0);
            yd0 = yd[0];
            if (yd[1] >= BASE / 2) ++yd0;
            do {
              k = 0;
              cmp = compare(yd, rem, yL, remL);
              if (cmp < 0) {
                rem0 = rem[0];
                if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);
                k = rem0 / yd0 | 0;
                if (k > 1) {
                  if (k >= BASE) k = BASE - 1;
                  prod = multiplyInteger(yd, k);
                  prodL = prod.length;
                  remL = rem.length;
                  cmp = compare(prod, rem, prodL, remL);
                  if (cmp == 1) {
                    k--;
                    subtract2(prod, yL < prodL ? yz : yd, prodL);
                  }
                } else {
                  if (k == 0) cmp = k = 1;
                  prod = yd.slice();
                }
                prodL = prod.length;
                if (prodL < remL) prod.unshift(0);
                subtract2(rem, prod, remL);
                if (cmp == -1) {
                  remL = rem.length;
                  cmp = compare(yd, rem, yL, remL);
                  if (cmp < 1) {
                    k++;
                    subtract2(rem, yL < remL ? yz : yd, remL);
                  }
                }
                remL = rem.length;
              } else if (cmp === 0) {
                k++;
                rem = [0];
              }
              qd[i++] = k;
              if (cmp && rem[0]) {
                rem[remL++] = xd[xi] || 0;
              } else {
                rem = [xd[xi]];
                remL = 1;
              }
            } while ((xi++ < xL || rem[0] !== void 0) && sd--);
          }
          if (!qd[0]) qd.shift();
          q.e = e;
          return round(q, dp ? pr + getBase10Exponent(q) + 1 : pr);
        };
      }();
      function exp(x, sd) {
        var denominator, guard, pow, sum, t, wpr, i = 0, k = 0, Ctor = x.constructor, pr = Ctor.precision;
        if (getBase10Exponent(x) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x));
        if (!x.s) return new Ctor(ONE);
        if (sd == null) {
          external = false;
          wpr = pr;
        } else {
          wpr = sd;
        }
        t = new Ctor(0.03125);
        while (x.abs().gte(0.1)) {
          x = x.times(t);
          k += 5;
        }
        guard = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
        wpr += guard;
        denominator = pow = sum = new Ctor(ONE);
        Ctor.precision = wpr;
        for (; ; ) {
          pow = round(pow.times(x), wpr);
          denominator = denominator.times(++i);
          t = sum.plus(divide(pow, denominator, wpr));
          if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
            while (k--) sum = round(sum.times(sum), wpr);
            Ctor.precision = pr;
            return sd == null ? (external = true, round(sum, pr)) : sum;
          }
          sum = t;
        }
      }
      function getBase10Exponent(x) {
        var e = x.e * LOG_BASE, w = x.d[0];
        for (; w >= 10; w /= 10) e++;
        return e;
      }
      function getLn10(Ctor, sd, pr) {
        if (sd > Ctor.LN10.sd()) {
          external = true;
          if (pr) Ctor.precision = pr;
          throw Error(decimalError + "LN10 precision limit exceeded");
        }
        return round(new Ctor(Ctor.LN10), sd);
      }
      function getZeroString(k) {
        var zs = "";
        for (; k--; ) zs += "0";
        return zs;
      }
      function ln(y, sd) {
        var c, c0, denominator, e, numerator, sum, t, wpr, x2, n = 1, guard = 10, x = y, xd = x.d, Ctor = x.constructor, pr = Ctor.precision;
        if (x.s < 1) throw Error(decimalError + (x.s ? "NaN" : "-Infinity"));
        if (x.eq(ONE)) return new Ctor(0);
        if (sd == null) {
          external = false;
          wpr = pr;
        } else {
          wpr = sd;
        }
        if (x.eq(10)) {
          if (sd == null) external = true;
          return getLn10(Ctor, wpr);
        }
        wpr += guard;
        Ctor.precision = wpr;
        c = digitsToString(xd);
        c0 = c.charAt(0);
        e = getBase10Exponent(x);
        if (Math.abs(e) < 15e14) {
          while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
            x = x.times(y);
            c = digitsToString(x.d);
            c0 = c.charAt(0);
            n++;
          }
          e = getBase10Exponent(x);
          if (c0 > 1) {
            x = new Ctor("0." + c);
            e++;
          } else {
            x = new Ctor(c0 + "." + c.slice(1));
          }
        } else {
          t = getLn10(Ctor, wpr + 2, pr).times(e + "");
          x = ln(new Ctor(c0 + "." + c.slice(1)), wpr - guard).plus(t);
          Ctor.precision = pr;
          return sd == null ? (external = true, round(x, pr)) : x;
        }
        sum = numerator = x = divide(x.minus(ONE), x.plus(ONE), wpr);
        x2 = round(x.times(x), wpr);
        denominator = 3;
        for (; ; ) {
          numerator = round(numerator.times(x2), wpr);
          t = sum.plus(divide(numerator, new Ctor(denominator), wpr));
          if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
            sum = sum.times(2);
            if (e !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e + ""));
            sum = divide(sum, new Ctor(n), wpr);
            Ctor.precision = pr;
            return sd == null ? (external = true, round(sum, pr)) : sum;
          }
          sum = t;
          denominator += 2;
        }
      }
      function parseDecimal(x, str) {
        var e, i, len;
        if ((e = str.indexOf(".")) > -1) str = str.replace(".", "");
        if ((i = str.search(/e/i)) > 0) {
          if (e < 0) e = i;
          e += +str.slice(i + 1);
          str = str.substring(0, i);
        } else if (e < 0) {
          e = str.length;
        }
        for (i = 0; str.charCodeAt(i) === 48; ) ++i;
        for (len = str.length; str.charCodeAt(len - 1) === 48; ) --len;
        str = str.slice(i, len);
        if (str) {
          len -= i;
          e = e - i - 1;
          x.e = mathfloor(e / LOG_BASE);
          x.d = [];
          i = (e + 1) % LOG_BASE;
          if (e < 0) i += LOG_BASE;
          if (i < len) {
            if (i) x.d.push(+str.slice(0, i));
            for (len -= LOG_BASE; i < len; ) x.d.push(+str.slice(i, i += LOG_BASE));
            str = str.slice(i);
            i = LOG_BASE - str.length;
          } else {
            i -= len;
          }
          for (; i--; ) str += "0";
          x.d.push(+str);
          if (external && (x.e > MAX_E || x.e < -MAX_E)) throw Error(exponentOutOfRange + e);
        } else {
          x.s = 0;
          x.e = 0;
          x.d = [0];
        }
        return x;
      }
      function round(x, sd, rm) {
        var i, j, k, n, rd, doRound, w, xdi, xd = x.d;
        for (n = 1, k = xd[0]; k >= 10; k /= 10) n++;
        i = sd - n;
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          w = xd[xdi = 0];
        } else {
          xdi = Math.ceil((i + 1) / LOG_BASE);
          k = xd.length;
          if (xdi >= k) return x;
          w = k = xd[xdi];
          for (n = 1; k >= 10; k /= 10) n++;
          i %= LOG_BASE;
          j = i - LOG_BASE + n;
        }
        if (rm !== void 0) {
          k = mathpow(10, n - j - 1);
          rd = w / k % 10 | 0;
          doRound = sd < 0 || xd[xdi + 1] !== void 0 || w % k;
          doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
          (i > 0 ? j > 0 ? w / mathpow(10, n - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
        }
        if (sd < 1 || !xd[0]) {
          if (doRound) {
            k = getBase10Exponent(x);
            xd.length = 1;
            sd = sd - k - 1;
            xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
            x.e = mathfloor(-sd / LOG_BASE) || 0;
          } else {
            xd.length = 1;
            xd[0] = x.e = x.s = 0;
          }
          return x;
        }
        if (i == 0) {
          xd.length = xdi;
          k = 1;
          xdi--;
        } else {
          xd.length = xdi + 1;
          k = mathpow(10, LOG_BASE - i);
          xd[xdi] = j > 0 ? (w / mathpow(10, n - j) % mathpow(10, j) | 0) * k : 0;
        }
        if (doRound) {
          for (; ; ) {
            if (xdi == 0) {
              if ((xd[0] += k) == BASE) {
                xd[0] = 1;
                ++x.e;
              }
              break;
            } else {
              xd[xdi] += k;
              if (xd[xdi] != BASE) break;
              xd[xdi--] = 0;
              k = 1;
            }
          }
        }
        for (i = xd.length; xd[--i] === 0; ) xd.pop();
        if (external && (x.e > MAX_E || x.e < -MAX_E)) {
          throw Error(exponentOutOfRange + getBase10Exponent(x));
        }
        return x;
      }
      function subtract(x, y) {
        var d, e, i, j, k, len, xd, xe, xLTy, yd, Ctor = x.constructor, pr = Ctor.precision;
        if (!x.s || !y.s) {
          if (y.s) y.s = -y.s;
          else y = new Ctor(x);
          return external ? round(y, pr) : y;
        }
        xd = x.d;
        yd = y.d;
        e = y.e;
        xe = x.e;
        xd = xd.slice();
        k = xe - e;
        if (k) {
          xLTy = k < 0;
          if (xLTy) {
            d = xd;
            k = -k;
            len = yd.length;
          } else {
            d = yd;
            e = xe;
            len = xd.length;
          }
          i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
          if (k > i) {
            k = i;
            d.length = 1;
          }
          d.reverse();
          for (i = k; i--; ) d.push(0);
          d.reverse();
        } else {
          i = xd.length;
          len = yd.length;
          xLTy = i < len;
          if (xLTy) len = i;
          for (i = 0; i < len; i++) {
            if (xd[i] != yd[i]) {
              xLTy = xd[i] < yd[i];
              break;
            }
          }
          k = 0;
        }
        if (xLTy) {
          d = xd;
          xd = yd;
          yd = d;
          y.s = -y.s;
        }
        len = xd.length;
        for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
        for (i = yd.length; i > k; ) {
          if (xd[--i] < yd[i]) {
            for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
            --xd[j];
            xd[i] += BASE;
          }
          xd[i] -= yd[i];
        }
        for (; xd[--len] === 0; ) xd.pop();
        for (; xd[0] === 0; xd.shift()) --e;
        if (!xd[0]) return new Ctor(0);
        y.d = xd;
        y.e = e;
        return external ? round(y, pr) : y;
      }
      function toString(x, isExp, sd) {
        var k, e = getBase10Exponent(x), str = digitsToString(x.d), len = str.length;
        if (isExp) {
          if (sd && (k = sd - len) > 0) {
            str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
          } else if (len > 1) {
            str = str.charAt(0) + "." + str.slice(1);
          }
          str = str + (e < 0 ? "e" : "e+") + e;
        } else if (e < 0) {
          str = "0." + getZeroString(-e - 1) + str;
          if (sd && (k = sd - len) > 0) str += getZeroString(k);
        } else if (e >= len) {
          str += getZeroString(e + 1 - len);
          if (sd && (k = sd - e - 1) > 0) str = str + "." + getZeroString(k);
        } else {
          if ((k = e + 1) < len) str = str.slice(0, k) + "." + str.slice(k);
          if (sd && (k = sd - len) > 0) {
            if (e + 1 === len) str += ".";
            str += getZeroString(k);
          }
        }
        return x.s < 0 ? "-" + str : str;
      }
      function truncate(arr, len) {
        if (arr.length > len) {
          arr.length = len;
          return true;
        }
      }
      function clone(obj) {
        var i, p, ps;
        function Decimal3(value) {
          var x = this;
          if (!(x instanceof Decimal3)) return new Decimal3(value);
          x.constructor = Decimal3;
          if (value instanceof Decimal3) {
            x.s = value.s;
            x.e = value.e;
            x.d = (value = value.d) ? value.slice() : value;
            return;
          }
          if (typeof value === "number") {
            if (value * 0 !== 0) {
              throw Error(invalidArgument + value);
            }
            if (value > 0) {
              x.s = 1;
            } else if (value < 0) {
              value = -value;
              x.s = -1;
            } else {
              x.s = 0;
              x.e = 0;
              x.d = [0];
              return;
            }
            if (value === ~~value && value < 1e7) {
              x.e = 0;
              x.d = [value];
              return;
            }
            return parseDecimal(x, value.toString());
          } else if (typeof value !== "string") {
            throw Error(invalidArgument + value);
          }
          if (value.charCodeAt(0) === 45) {
            value = value.slice(1);
            x.s = -1;
          } else {
            x.s = 1;
          }
          if (isDecimal.test(value)) parseDecimal(x, value);
          else throw Error(invalidArgument + value);
        }
        Decimal3.prototype = P;
        Decimal3.ROUND_UP = 0;
        Decimal3.ROUND_DOWN = 1;
        Decimal3.ROUND_CEIL = 2;
        Decimal3.ROUND_FLOOR = 3;
        Decimal3.ROUND_HALF_UP = 4;
        Decimal3.ROUND_HALF_DOWN = 5;
        Decimal3.ROUND_HALF_EVEN = 6;
        Decimal3.ROUND_HALF_CEIL = 7;
        Decimal3.ROUND_HALF_FLOOR = 8;
        Decimal3.clone = clone;
        Decimal3.config = Decimal3.set = config;
        if (obj === void 0) obj = {};
        if (obj) {
          ps = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
          for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p = ps[i++])) obj[p] = this[p];
        }
        Decimal3.config(obj);
        return Decimal3;
      }
      function config(obj) {
        if (!obj || typeof obj !== "object") {
          throw Error(decimalError + "Object expected");
        }
        var i, p, v, ps = [
          "precision",
          1,
          MAX_DIGITS,
          "rounding",
          0,
          8,
          "toExpNeg",
          -1 / 0,
          0,
          "toExpPos",
          0,
          1 / 0
        ];
        for (i = 0; i < ps.length; i += 3) {
          if ((v = obj[p = ps[i]]) !== void 0) {
            if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2]) this[p] = v;
            else throw Error(invalidArgument + p + ": " + v);
          }
        }
        if ((v = obj[p = "LN10"]) !== void 0) {
          if (v == Math.LN10) this[p] = new this(v);
          else throw Error(invalidArgument + p + ": " + v);
        }
        return this;
      }
      Decimal2 = clone(Decimal2);
      Decimal2["default"] = Decimal2.Decimal = Decimal2;
      ONE = new Decimal2(1);
      if (typeof define == "function" && define.amd) {
        define(function() {
          return Decimal2;
        });
      } else if (typeof module != "undefined" && module.exports) {
        module.exports = Decimal2;
      } else {
        if (!globalScope) {
          globalScope = typeof self != "undefined" && self && self.self == self ? self : Function("return this")();
        }
        globalScope.Decimal = Decimal2;
      }
    })(exports);
  }
});

// node_modules/lodash.transform/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.transform/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var FUNC_ERROR_TEXT = "Expected a function";
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var UNORDERED_COMPARE_FLAG = 1;
    var PARTIAL_COMPARE_FLAG = 2;
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    var reLeadingDot = /^\./;
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reEscapeChar = /\\(\\)?/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayEach(array, iteratee) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array ? array.length : 0;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform3) {
      return function(arg) {
        return func(transform3(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Symbol2 = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    var objectCreate = Object.create;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap2 = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap2);
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function Hash(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    function hashDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries ? entries.length : 0;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      return getMapData(this, key)["delete"](key);
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      getMapData(this, key).set(key, value);
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length = values ? values.length : 0;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      this.__data__ = new ListCache(entries);
    }
    function stackClear() {
      this.__data__ = new ListCache();
    }
    function stackDelete(key) {
      return this.__data__["delete"](key);
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var cache = this.__data__;
      if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          return this;
        }
        cache = this.__data__ = new MapCache(pairs);
      }
      cache.set(key, value);
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseCreate(proto) {
      return isObject(proto) ? objectCreate(proto) : {};
    }
    var baseFor = createBaseFor();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    function baseGet(object, path) {
      path = isKey(path, object) ? [path] : castPath(path);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    function baseGetTag(value) {
      return objectToString.call(value);
    }
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    function baseIsEqual(value, other, customizer, bitmask, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObject(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
    }
    function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
      if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
      }
      if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
      }
      var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
      }
      if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
    }
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
    }
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, void 0, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
      };
    }
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function castPath(value) {
      return isArray(value) ? value : stringToPath(value);
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!seen.has(othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= UNORDERED_COMPARE_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : void 0;
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function hasPath(object, path, hasFunc) {
      path = isKey(path, object) ? [path] : castPath(path);
      var result, index = -1, length = path.length;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result) {
        return result;
      }
      var length = object ? object.length : 0;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    var stringToPath = memoize(function(string) {
      string = toString(string);
      var result = [];
      if (reLeadingDot.test(string)) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, string2) {
        result.push(quote ? string2.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function transform2(object, iteratee, accumulator) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = baseIteratee(iteratee, 4);
      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor() : [];
          } else {
            accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object2) {
        return iteratee(accumulator, value, index, object2);
      });
      return accumulator;
    }
    function identity(value) {
      return value;
    }
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = transform2;
  }
});

// node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_index.default;

// node_modules/zod/lib/index.mjs
var util;
(function(util2) {
  util2.assertEqual = (val) => val;
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  get errors() {
    return this.issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var overrideErrorMap = errorMap;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}
function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
var _ZodEnum_cache;
var _ZodNativeEnum_cache;
var ParseInputLazyPath = class {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (this._key instanceof Array) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    var _a;
    const ctx = {
      common: {
        issues: [],
        async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
        async: true
      },
      path: (params === null || params === void 0 ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this, this._def);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform2) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform: transform2 }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
  if (args.precision) {
    regex = `${regex}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    regex = `${regex}(\\.\\d+)?`;
  }
  return regex;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version2) {
  if ((version2 === "v4" || !version2) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version2 === "v6" || !version2) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch (_a) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    var _a, _b;
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
      local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options === null || options === void 0 ? void 0 : options.position,
      ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  var _a;
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / Math.pow(10, decCount);
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null, min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = BigInt(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.bigint,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  var _a;
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    return this._cached = { shape, keys };
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a, _b, _c, _d;
          const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    util.objectKeys(mask).forEach((key) => {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    util.objectKeys(this.shape).forEach((key) => {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    });
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [
          ctx.common.contextualErrorMap,
          ctx.schemaErrorMap,
          getErrorMap(),
          errorMap
        ].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, void 0);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
_ZodEnum_cache = /* @__PURE__ */ new WeakMap();
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, void 0);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
_ZodNativeEnum_cache = /* @__PURE__ */ new WeakMap();
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function custom(check, params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      var _a, _b;
      if (!check(data)) {
        const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
        const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
        const p2 = typeof p === "string" ? { message: p } : p;
        ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
      }
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
var z = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: errorMap,
  setErrorMap,
  getErrorMap,
  makeIssue,
  EMPTY_PATH,
  addIssueToContext,
  ParseStatus,
  INVALID,
  DIRTY,
  OK,
  isAborted,
  isDirty,
  isValid,
  isAsync,
  get util() {
    return util;
  },
  get objectUtil() {
    return objectUtil;
  },
  ZodParsedType,
  getParsedType,
  ZodType,
  datetimeRegex,
  ZodString,
  ZodNumber,
  ZodBigInt,
  ZodBoolean,
  ZodDate,
  ZodSymbol,
  ZodUndefined,
  ZodNull,
  ZodAny,
  ZodUnknown,
  ZodNever,
  ZodVoid,
  ZodArray,
  ZodObject,
  ZodUnion,
  ZodDiscriminatedUnion,
  ZodIntersection,
  ZodTuple,
  ZodRecord,
  ZodMap,
  ZodSet,
  ZodFunction,
  ZodLazy,
  ZodLiteral,
  ZodEnum,
  ZodNativeEnum,
  ZodPromise,
  ZodEffects,
  ZodTransformer: ZodEffects,
  ZodOptional,
  ZodNullable,
  ZodDefault,
  ZodCatch,
  ZodNaN,
  BRAND,
  ZodBranded,
  ZodPipeline,
  ZodReadonly,
  custom,
  Schema: ZodType,
  ZodSchema: ZodType,
  late,
  get ZodFirstPartyTypeKind() {
    return ZodFirstPartyTypeKind;
  },
  coerce,
  any: anyType,
  array: arrayType,
  bigint: bigIntType,
  boolean: booleanType,
  date: dateType,
  discriminatedUnion: discriminatedUnionType,
  effect: effectsType,
  "enum": enumType,
  "function": functionType,
  "instanceof": instanceOfType,
  intersection: intersectionType,
  lazy: lazyType,
  literal: literalType,
  map: mapType,
  nan: nanType,
  nativeEnum: nativeEnumType,
  never: neverType,
  "null": nullType,
  nullable: nullableType,
  number: numberType,
  object: objectType,
  oboolean,
  onumber,
  optional: optionalType,
  ostring,
  pipeline: pipelineType,
  preprocess: preprocessType,
  promise: promiseType,
  record: recordType,
  set: setType,
  strictObject: strictObjectType,
  string: stringType,
  symbol: symbolType,
  transformer: effectsType,
  tuple: tupleType,
  "undefined": undefinedType,
  union: unionType,
  unknown: unknownType,
  "void": voidType,
  NEVER,
  ZodIssueCode,
  quotelessJson,
  ZodError
});

// src/utils/BigFlagUtils.ts
var import_big_integer = __toESM(require_BigInteger());
var MAX_BIG_INT = 64;
var SMALL_INT = 16;
var PARTS = MAX_BIG_INT / SMALL_INT;
function checkBrowserSupportsBigInt() {
  try {
    BigInt;
    return true;
  } catch {
    return false;
  }
}
function fromHexReverseArray(hexValues, start, size) {
  let value = 0;
  for (let i = 0; i < size; i++) {
    const byte = hexValues[start + i];
    if (byte === void 0) {
      break;
    }
    value += byte * 16 ** i;
  }
  return value;
}
function toHexReverseArray(value) {
  const sum = [];
  for (let i = 0; i < value.length; i++) {
    let s = Number(value[i]);
    for (let j = 0; s || j < sum.length; j++) {
      s += (sum[j] || 0) * 10;
      sum[j] = s % 16;
      s = (s - sum[j]) / 16;
    }
  }
  return sum;
}
function splitBigInt(value) {
  const sum = toHexReverseArray(value);
  const parts = Array(PARTS);
  for (let i = 0; i < PARTS; i++) {
    parts[PARTS - 1 - i] = fromHexReverseArray(sum, i * PARTS, PARTS);
  }
  return parts;
}
var HighLow = class _HighLow {
  static fromString(value) {
    return new _HighLow(splitBigInt(value), value);
  }
  static fromBit(index) {
    const parts = Array(PARTS);
    const offset = Math.floor(index / SMALL_INT);
    for (let i = 0; i < PARTS; i++) {
      parts[PARTS - 1 - i] = i === offset ? 1 << index - offset * SMALL_INT : 0;
    }
    return new _HighLow(parts);
  }
  constructor(parts, str) {
    this.parts = parts;
    this.str = str;
  }
  and({ parts }) {
    return new _HighLow(this.parts.map((v, i) => v & parts[i]));
  }
  or({ parts }) {
    return new _HighLow(this.parts.map((v, i) => v | parts[i]));
  }
  xor({ parts }) {
    return new _HighLow(this.parts.map((v, i) => v ^ parts[i]));
  }
  not() {
    return new _HighLow(this.parts.map((v) => ~v));
  }
  equals({ parts }) {
    return this.parts.every((v, i) => v === parts[i]);
  }
  /**
   * For the average case the string representation is provided, but
   * when we need to convert high and low to string we just let the
   * slower big-integer library do it.
   */
  toString() {
    if (this.str != null) {
      return this.str;
    }
    const array = new Array(MAX_BIG_INT / 4);
    this.parts.forEach((value, offset) => {
      const hex = toHexReverseArray(value.toString());
      for (let i = 0; i < 4; i++) {
        array[i + offset * 4] = hex[4 - 1 - i] || 0;
      }
    });
    return this.str = import_big_integer.default.fromArray(array, 16).toString();
  }
  toJSON() {
    return this.toString();
  }
};
var SUPPORTS_BIGINT = checkBrowserSupportsBigInt();
if (SUPPORTS_BIGINT && BigInt.prototype.toJSON == null) {
  BigInt.prototype.toJSON = function() {
    return this.toString();
  };
}
var HIGH_LOW_CACHE = {};
var convertToBigFlag = SUPPORTS_BIGINT ? function convertToBigFlagBigInt(value) {
  return BigInt(value);
} : function convertToBigFlagHighLow(value) {
  if (value instanceof HighLow) {
    return value;
  }
  if (typeof value === "number") {
    value = value.toString();
  }
  if (HIGH_LOW_CACHE[value] != null) {
    return HIGH_LOW_CACHE[value];
  }
  HIGH_LOW_CACHE[value] = HighLow.fromString(value);
  return HIGH_LOW_CACHE[value];
};
var EMPTY_FLAG = convertToBigFlag(0);
var flagAnd = SUPPORTS_BIGINT ? function flagAndBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first & second;
} : function flagAndHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first.and(second);
};
var flagOr = SUPPORTS_BIGINT ? function flagOrBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first | second;
} : function flagOrHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first.or(second);
};
var flagXor = SUPPORTS_BIGINT ? function flagXorBigInt(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first ^ second;
} : function flagXorHighLow(first = EMPTY_FLAG, second = EMPTY_FLAG) {
  return first.xor(second);
};
var flagNot = SUPPORTS_BIGINT ? function flagNotBigInt(first = EMPTY_FLAG) {
  return ~first;
} : function flagNotHighLow(first = EMPTY_FLAG) {
  return first.not();
};
var flagEquals = SUPPORTS_BIGINT ? function flagEqualsBigInt(first, second) {
  return first === second;
} : function flagEqualsHighLow(first, second) {
  if (first == null || second == null) {
    return first == second;
  }
  return first.equals(second);
};
function flagOrMultiple(...flags) {
  let result = flags[0];
  for (let i = 1; i < flags.length; i++) {
    result = flagOr(result, flags[i]);
  }
  return result;
}
function flagHas(base, flag) {
  return flagEquals(flagAnd(base, flag), flag);
}
function flagHasAny(base, flag) {
  return !flagEquals(flagAnd(base, flag), EMPTY_FLAG);
}
function flagAdd(base, flag) {
  return flag === EMPTY_FLAG ? base : flagOr(base, flag);
}
function flagRemove(base, flag) {
  return flag === EMPTY_FLAG ? base : flagXor(base, flagAnd(base, flag));
}
var getFlag = SUPPORTS_BIGINT ? function getFlagBigInt(index) {
  return BigInt(1) << BigInt(index);
} : function getFlagHighLow(index) {
  return HighLow.fromBit(index);
};
var BigFlagUtils_default = {
  combine: flagOrMultiple,
  add: flagAdd,
  remove: flagRemove,
  filter: flagAnd,
  invert: flagNot,
  has: flagHas,
  hasAny: flagHasAny,
  equals: flagEquals,
  deserialize: convertToBigFlag,
  getFlag
};

// src/Constants.ts
var RPCCloseCodes = /* @__PURE__ */ ((RPCCloseCodes3) => {
  RPCCloseCodes3[RPCCloseCodes3["CLOSE_NORMAL"] = 1e3] = "CLOSE_NORMAL";
  RPCCloseCodes3[RPCCloseCodes3["CLOSE_UNSUPPORTED"] = 1003] = "CLOSE_UNSUPPORTED";
  RPCCloseCodes3[RPCCloseCodes3["CLOSE_ABNORMAL"] = 1006] = "CLOSE_ABNORMAL";
  RPCCloseCodes3[RPCCloseCodes3["INVALID_CLIENTID"] = 4e3] = "INVALID_CLIENTID";
  RPCCloseCodes3[RPCCloseCodes3["INVALID_ORIGIN"] = 4001] = "INVALID_ORIGIN";
  RPCCloseCodes3[RPCCloseCodes3["RATELIMITED"] = 4002] = "RATELIMITED";
  RPCCloseCodes3[RPCCloseCodes3["TOKEN_REVOKED"] = 4003] = "TOKEN_REVOKED";
  RPCCloseCodes3[RPCCloseCodes3["INVALID_VERSION"] = 4004] = "INVALID_VERSION";
  RPCCloseCodes3[RPCCloseCodes3["INVALID_ENCODING"] = 4005] = "INVALID_ENCODING";
  return RPCCloseCodes3;
})(RPCCloseCodes || {});
var RPCErrorCodes = /* @__PURE__ */ ((RPCErrorCodes2) => {
  RPCErrorCodes2[RPCErrorCodes2["INVALID_PAYLOAD"] = 4e3] = "INVALID_PAYLOAD";
  RPCErrorCodes2[RPCErrorCodes2["INVALID_COMMAND"] = 4002] = "INVALID_COMMAND";
  RPCErrorCodes2[RPCErrorCodes2["INVALID_EVENT"] = 4004] = "INVALID_EVENT";
  RPCErrorCodes2[RPCErrorCodes2["INVALID_PERMISSIONS"] = 4006] = "INVALID_PERMISSIONS";
  return RPCErrorCodes2;
})(RPCErrorCodes || {});
var Orientation = /* @__PURE__ */ ((Orientation3) => {
  Orientation3["LANDSCAPE"] = "landscape";
  Orientation3["PORTRAIT"] = "portrait";
  return Orientation3;
})(Orientation || {});
var Platform = /* @__PURE__ */ ((Platform2) => {
  Platform2["MOBILE"] = "mobile";
  Platform2["DESKTOP"] = "desktop";
  return Platform2;
})(Platform || {});
var Permissions = Object.freeze({
  CREATE_INSTANT_INVITE: BigFlagUtils_default.getFlag(0),
  KICK_MEMBERS: BigFlagUtils_default.getFlag(1),
  BAN_MEMBERS: BigFlagUtils_default.getFlag(2),
  ADMINISTRATOR: BigFlagUtils_default.getFlag(3),
  MANAGE_CHANNELS: BigFlagUtils_default.getFlag(4),
  MANAGE_GUILD: BigFlagUtils_default.getFlag(5),
  ADD_REACTIONS: BigFlagUtils_default.getFlag(6),
  VIEW_AUDIT_LOG: BigFlagUtils_default.getFlag(7),
  PRIORITY_SPEAKER: BigFlagUtils_default.getFlag(8),
  STREAM: BigFlagUtils_default.getFlag(9),
  VIEW_CHANNEL: BigFlagUtils_default.getFlag(10),
  SEND_MESSAGES: BigFlagUtils_default.getFlag(11),
  SEND_TTS_MESSAGES: BigFlagUtils_default.getFlag(12),
  MANAGE_MESSAGES: BigFlagUtils_default.getFlag(13),
  EMBED_LINKS: BigFlagUtils_default.getFlag(14),
  ATTACH_FILES: BigFlagUtils_default.getFlag(15),
  READ_MESSAGE_HISTORY: BigFlagUtils_default.getFlag(16),
  MENTION_EVERYONE: BigFlagUtils_default.getFlag(17),
  USE_EXTERNAL_EMOJIS: BigFlagUtils_default.getFlag(18),
  VIEW_GUILD_INSIGHTS: BigFlagUtils_default.getFlag(19),
  CONNECT: BigFlagUtils_default.getFlag(20),
  SPEAK: BigFlagUtils_default.getFlag(21),
  MUTE_MEMBERS: BigFlagUtils_default.getFlag(22),
  DEAFEN_MEMBERS: BigFlagUtils_default.getFlag(23),
  MOVE_MEMBERS: BigFlagUtils_default.getFlag(24),
  USE_VAD: BigFlagUtils_default.getFlag(25),
  CHANGE_NICKNAME: BigFlagUtils_default.getFlag(26),
  MANAGE_NICKNAMES: BigFlagUtils_default.getFlag(27),
  MANAGE_ROLES: BigFlagUtils_default.getFlag(28),
  MANAGE_WEBHOOKS: BigFlagUtils_default.getFlag(29),
  MANAGE_GUILD_EXPRESSIONS: BigFlagUtils_default.getFlag(30),
  USE_APPLICATION_COMMANDS: BigFlagUtils_default.getFlag(31),
  REQUEST_TO_SPEAK: BigFlagUtils_default.getFlag(32),
  MANAGE_EVENTS: BigFlagUtils_default.getFlag(33),
  MANAGE_THREADS: BigFlagUtils_default.getFlag(34),
  CREATE_PUBLIC_THREADS: BigFlagUtils_default.getFlag(35),
  CREATE_PRIVATE_THREADS: BigFlagUtils_default.getFlag(36),
  USE_EXTERNAL_STICKERS: BigFlagUtils_default.getFlag(37),
  SEND_MESSAGES_IN_THREADS: BigFlagUtils_default.getFlag(38),
  USE_EMBEDDED_ACTIVITIES: BigFlagUtils_default.getFlag(39),
  MODERATE_MEMBERS: BigFlagUtils_default.getFlag(40),
  VIEW_CREATOR_MONETIZATION_ANALYTICS: BigFlagUtils_default.getFlag(41),
  USE_SOUNDBOARD: BigFlagUtils_default.getFlag(42),
  CREATE_GUILD_EXPRESSIONS: BigFlagUtils_default.getFlag(43),
  CREATE_EVENTS: BigFlagUtils_default.getFlag(44),
  USE_EXTERNAL_SOUNDS: BigFlagUtils_default.getFlag(45),
  SEND_VOICE_MESSAGES: BigFlagUtils_default.getFlag(46),
  SEND_POLLS: BigFlagUtils_default.getFlag(49),
  USE_EXTERNAL_APPS: BigFlagUtils_default.getFlag(50)
});
var UNKNOWN_VERSION_NUMBER = -1;
var HANDSHAKE_SDK_VERSION_MINIMUM_MOBILE_VERSION = 250;

// src/schema/common.ts
var common_exports = {};
__export(common_exports, {
  Activity: () => Activity,
  Attachment: () => Attachment,
  CertifiedDevice: () => CertifiedDevice,
  CertifiedDeviceTypeObject: () => CertifiedDeviceTypeObject,
  Channel: () => Channel,
  ChannelMention: () => ChannelMention,
  ChannelTypesObject: () => ChannelTypesObject,
  Commands: () => Commands,
  DISPATCH: () => DISPATCH,
  Embed: () => Embed,
  EmbedAuthor: () => EmbedAuthor,
  EmbedField: () => EmbedField,
  EmbedFooter: () => EmbedFooter,
  EmbedProvider: () => EmbedProvider,
  Emoji: () => Emoji,
  Entitlement: () => Entitlement,
  EntitlementTypesObject: () => EntitlementTypesObject,
  Guild: () => Guild,
  GuildMember: () => GuildMember,
  GuildMemberRPC: () => GuildMemberRPC,
  Image: () => Image,
  KeyTypesObject: () => KeyTypesObject,
  LayoutMode: () => LayoutMode,
  LayoutModeTypeObject: () => LayoutModeTypeObject,
  Message: () => Message,
  MessageActivity: () => MessageActivity,
  MessageApplication: () => MessageApplication,
  MessageReference: () => MessageReference,
  Orientation: () => Orientation2,
  OrientationLockState: () => OrientationLockState,
  OrientationLockStateTypeObject: () => OrientationLockStateTypeObject,
  OrientationTypeObject: () => OrientationTypeObject,
  PermissionOverwrite: () => PermissionOverwrite,
  PermissionOverwriteTypeObject: () => PermissionOverwriteTypeObject,
  PresenceUpdate: () => PresenceUpdate,
  Reaction: () => Reaction,
  ReceiveFramePayload: () => ReceiveFramePayload,
  Role: () => Role,
  Scopes: () => Scopes,
  ScopesObject: () => ScopesObject,
  ShortcutKey: () => ShortcutKey,
  Sku: () => Sku,
  SkuTypeObject: () => SkuTypeObject,
  Status: () => Status,
  StatusObject: () => StatusObject,
  ThermalState: () => ThermalState,
  ThermalStateTypeObject: () => ThermalStateTypeObject,
  User: () => User,
  UserVoiceState: () => UserVoiceState,
  Video: () => Video,
  VoiceDevice: () => VoiceDevice,
  VoiceSettingModeTypeObject: () => VoiceSettingModeTypeObject,
  VoiceSettingsIO: () => VoiceSettingsIO,
  VoiceSettingsMode: () => VoiceSettingsMode,
  VoiceState: () => VoiceState
});

// src/utils/zodUtils.ts
function zodCoerceUnhandledValue(inputObject) {
  return preprocessType(
    (arg) => {
      const [objectKey] = Object.entries(inputObject).find(([, value]) => value === arg) ?? [];
      if (arg != null && objectKey === void 0) {
        return inputObject.UNHANDLED;
      }
      return arg;
    },
    stringType().or(numberType())
  );
}
function fallbackToDefault(schema) {
  const transform2 = custom().transform((data) => {
    const res = schema.safeParse(data);
    if (res.success) {
      return res.data;
    }
    return schema._def.defaultValue();
  });
  transform2.overlayType = schema;
  return transform2;
}

// src/generated/schemas.ts
var InitiateImageUploadResponseSchema = z.object({ image_url: z.string() });
var OpenShareMomentDialogRequestSchema = z.object({ mediaUrl: z.string().max(1024) });
var AuthenticateRequestSchema = z.object({ access_token: z.union([z.string(), z.null()]).optional() });
var AuthenticateResponseSchema = z.object({
  access_token: z.string(),
  user: z.object({
    username: z.string(),
    discriminator: z.string(),
    id: z.string(),
    avatar: z.union([z.string(), z.null()]).optional(),
    public_flags: z.number(),
    global_name: z.union([z.string(), z.null()]).optional()
  }),
  scopes: z.array(
    fallbackToDefault(
      z.enum([
        "identify",
        "email",
        "connections",
        "guilds",
        "guilds.join",
        "guilds.members.read",
        "guilds.channels.read",
        "gdm.join",
        "bot",
        "rpc",
        "rpc.notifications.read",
        "rpc.voice.read",
        "rpc.voice.write",
        "rpc.video.read",
        "rpc.video.write",
        "rpc.screenshare.read",
        "rpc.screenshare.write",
        "rpc.activities.write",
        "webhook.incoming",
        "messages.read",
        "applications.builds.upload",
        "applications.builds.read",
        "applications.commands",
        "applications.commands.permissions.update",
        "applications.commands.update",
        "applications.store.update",
        "applications.entitlements",
        "activities.read",
        "activities.write",
        "relationships.read",
        "relationships.write",
        "voice",
        "dm_channels.read",
        "role_connections.write",
        "presences.read",
        "presences.write",
        "openid",
        "dm_channels.messages.read",
        "dm_channels.messages.write",
        "gateway.connect",
        "account.global_name.update",
        "payment_sources.country_code",
        "sdk.social_layer"
      ]).or(z.literal(-1)).default(-1)
    )
  ),
  expires: z.string(),
  application: z.object({
    description: z.string(),
    icon: z.union([z.string(), z.null()]).optional(),
    id: z.string(),
    rpc_origins: z.array(z.string()).optional(),
    name: z.string()
  })
});
var GetActivityInstanceConnectedParticipantsResponseSchema = z.object({
  participants: z.array(
    z.object({
      id: z.string(),
      username: z.string(),
      global_name: z.union([z.string(), z.null()]).optional(),
      discriminator: z.string(),
      avatar: z.union([z.string(), z.null()]).optional(),
      flags: z.number(),
      bot: z.boolean(),
      avatar_decoration_data: z.union([z.object({ asset: z.string(), skuId: z.string().optional() }), z.null()]).optional(),
      premium_type: z.union([z.number(), z.null()]).optional(),
      nickname: z.string().optional()
    })
  )
});
var ShareInteractionRequestSchema = z.object({
  command: z.string(),
  content: z.string().max(2e3).optional(),
  preview_image: z.object({ height: z.number(), url: z.string(), width: z.number() }).optional(),
  components: z.array(
    z.object({
      type: z.literal(1),
      components: z.array(
        z.object({
          type: z.literal(2),
          style: z.number().gte(1).lte(5),
          label: z.string().max(80).optional(),
          custom_id: z.string().max(100).describe("Developer-defined identifier for the button; max 100 characters").optional()
        })
      ).max(5).optional()
    })
  ).optional()
});
var ShareLinkRequestSchema = z.object({
  referrer_id: z.string().max(64).optional(),
  custom_id: z.string().max(64).optional(),
  message: z.string().max(1e3)
});
var ShareLinkResponseSchema = z.object({ success: z.boolean() });
var emptyResponseSchema = z.object({}).optional().nullable();
var emptyRequestSchema = z.void();
var Schemas = {
  ["INITIATE_IMAGE_UPLOAD" /* INITIATE_IMAGE_UPLOAD */]: {
    request: emptyRequestSchema,
    response: InitiateImageUploadResponseSchema
  },
  ["OPEN_SHARE_MOMENT_DIALOG" /* OPEN_SHARE_MOMENT_DIALOG */]: {
    request: OpenShareMomentDialogRequestSchema,
    response: emptyResponseSchema
  },
  ["AUTHENTICATE" /* AUTHENTICATE */]: {
    request: AuthenticateRequestSchema,
    response: AuthenticateResponseSchema
  },
  ["GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" /* GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS */]: {
    request: emptyRequestSchema,
    response: GetActivityInstanceConnectedParticipantsResponseSchema
  },
  ["SHARE_INTERACTION" /* SHARE_INTERACTION */]: {
    request: ShareInteractionRequestSchema,
    response: emptyResponseSchema
  },
  ["SHARE_LINK" /* SHARE_LINK */]: {
    request: ShareLinkRequestSchema,
    response: ShareLinkResponseSchema
  }
};

// src/schema/common.ts
var DISPATCH = "DISPATCH";
var Commands = /* @__PURE__ */ ((Commands5) => {
  Commands5["AUTHORIZE"] = "AUTHORIZE";
  Commands5["AUTHENTICATE"] = "AUTHENTICATE";
  Commands5["GET_GUILDS"] = "GET_GUILDS";
  Commands5["GET_GUILD"] = "GET_GUILD";
  Commands5["GET_CHANNEL"] = "GET_CHANNEL";
  Commands5["GET_CHANNELS"] = "GET_CHANNELS";
  Commands5["SELECT_VOICE_CHANNEL"] = "SELECT_VOICE_CHANNEL";
  Commands5["SELECT_TEXT_CHANNEL"] = "SELECT_TEXT_CHANNEL";
  Commands5["SUBSCRIBE"] = "SUBSCRIBE";
  Commands5["UNSUBSCRIBE"] = "UNSUBSCRIBE";
  Commands5["CAPTURE_SHORTCUT"] = "CAPTURE_SHORTCUT";
  Commands5["SET_CERTIFIED_DEVICES"] = "SET_CERTIFIED_DEVICES";
  Commands5["SET_ACTIVITY"] = "SET_ACTIVITY";
  Commands5["GET_SKUS"] = "GET_SKUS";
  Commands5["GET_ENTITLEMENTS"] = "GET_ENTITLEMENTS";
  Commands5["GET_SKUS_EMBEDDED"] = "GET_SKUS_EMBEDDED";
  Commands5["GET_ENTITLEMENTS_EMBEDDED"] = "GET_ENTITLEMENTS_EMBEDDED";
  Commands5["START_PURCHASE"] = "START_PURCHASE";
  Commands5["SET_CONFIG"] = "SET_CONFIG";
  Commands5["SEND_ANALYTICS_EVENT"] = "SEND_ANALYTICS_EVENT";
  Commands5["USER_SETTINGS_GET_LOCALE"] = "USER_SETTINGS_GET_LOCALE";
  Commands5["OPEN_EXTERNAL_LINK"] = "OPEN_EXTERNAL_LINK";
  Commands5["ENCOURAGE_HW_ACCELERATION"] = "ENCOURAGE_HW_ACCELERATION";
  Commands5["CAPTURE_LOG"] = "CAPTURE_LOG";
  Commands5["SET_ORIENTATION_LOCK_STATE"] = "SET_ORIENTATION_LOCK_STATE";
  Commands5["OPEN_INVITE_DIALOG"] = "OPEN_INVITE_DIALOG";
  Commands5["GET_PLATFORM_BEHAVIORS"] = "GET_PLATFORM_BEHAVIORS";
  Commands5["GET_CHANNEL_PERMISSIONS"] = "GET_CHANNEL_PERMISSIONS";
  Commands5["OPEN_SHARE_MOMENT_DIALOG"] = "OPEN_SHARE_MOMENT_DIALOG";
  Commands5["INITIATE_IMAGE_UPLOAD"] = "INITIATE_IMAGE_UPLOAD";
  Commands5["GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS"] = "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS";
  Commands5["SHARE_LINK"] = "SHARE_LINK";
  return Commands5;
})(Commands || {});
var ReceiveFramePayload = objectType({
  cmd: stringType(),
  data: unknownType(),
  evt: nullType(),
  nonce: stringType()
}).passthrough();
var ScopesObject = {
  ...AuthenticateResponseSchema.shape.scopes.element.overlayType._def.innerType.options[0].Values,
  UNHANDLED: -1
};
var Scopes = zodCoerceUnhandledValue(ScopesObject);
var User = objectType({
  id: stringType(),
  username: stringType(),
  discriminator: stringType(),
  global_name: stringType().optional().nullable(),
  avatar: stringType().optional().nullable(),
  avatar_decoration_data: objectType({
    asset: stringType(),
    sku_id: stringType().optional()
  }).nullable(),
  bot: booleanType(),
  flags: numberType().optional().nullable(),
  premium_type: numberType().optional().nullable()
});
var GuildMember = objectType({
  user: User,
  nick: stringType().optional().nullable(),
  roles: arrayType(stringType()),
  joined_at: stringType(),
  deaf: booleanType(),
  mute: booleanType()
});
var GuildMemberRPC = objectType({
  user_id: stringType(),
  nick: stringType().optional().nullable(),
  guild_id: stringType(),
  avatar: stringType().optional().nullable(),
  avatar_decoration_data: objectType({
    asset: stringType(),
    sku_id: stringType().optional().nullable()
  }).optional().nullable(),
  color_string: stringType().optional().nullable()
});
var Emoji = objectType({
  id: stringType(),
  name: stringType().optional().nullable(),
  roles: arrayType(stringType()).optional().nullable(),
  user: User.optional().nullable(),
  require_colons: booleanType().optional().nullable(),
  managed: booleanType().optional().nullable(),
  animated: booleanType().optional().nullable(),
  available: booleanType().optional().nullable()
});
var VoiceState = objectType({
  mute: booleanType(),
  deaf: booleanType(),
  self_mute: booleanType(),
  self_deaf: booleanType(),
  suppress: booleanType()
});
var UserVoiceState = objectType({
  mute: booleanType(),
  nick: stringType(),
  user: User,
  voice_state: VoiceState,
  volume: numberType()
});
var StatusObject = {
  UNHANDLED: -1,
  IDLE: "idle",
  DND: "dnd",
  ONLINE: "online",
  OFFLINE: "offline"
};
var Status = zodCoerceUnhandledValue(StatusObject);
var Activity = objectType({
  name: stringType(),
  type: numberType(),
  url: stringType().optional().nullable(),
  created_at: numberType().optional().nullable(),
  timestamps: objectType({
    start: numberType(),
    end: numberType()
  }).partial().optional().nullable(),
  application_id: stringType().optional().nullable(),
  details: stringType().optional().nullable(),
  state: stringType().optional().nullable(),
  emoji: Emoji.optional().nullable(),
  party: objectType({
    id: stringType().optional().nullable(),
    size: arrayType(numberType()).optional().nullable()
  }).optional().nullable(),
  assets: objectType({
    large_image: stringType().nullable(),
    large_text: stringType().nullable(),
    small_image: stringType().nullable(),
    small_text: stringType().nullable()
  }).partial().optional().nullable(),
  secrets: objectType({
    join: stringType(),
    match: stringType()
  }).partial().optional().nullable(),
  instance: booleanType().optional().nullable(),
  flags: numberType().optional().nullable()
});
var PermissionOverwriteTypeObject = {
  UNHANDLED: -1,
  ROLE: 0,
  MEMBER: 1
};
var PermissionOverwrite = objectType({
  id: stringType(),
  type: zodCoerceUnhandledValue(PermissionOverwriteTypeObject),
  allow: stringType(),
  deny: stringType()
});
var ChannelTypesObject = {
  UNHANDLED: -1,
  DM: 1,
  GROUP_DM: 3,
  GUILD_TEXT: 0,
  GUILD_VOICE: 2,
  GUILD_CATEGORY: 4,
  GUILD_ANNOUNCEMENT: 5,
  GUILD_STORE: 6,
  ANNOUNCEMENT_THREAD: 10,
  PUBLIC_THREAD: 11,
  PRIVATE_THREAD: 12,
  GUILD_STAGE_VOICE: 13,
  GUILD_DIRECTORY: 14,
  GUILD_FORUM: 15
};
var Channel = objectType({
  id: stringType(),
  type: zodCoerceUnhandledValue(ChannelTypesObject),
  guild_id: stringType().optional().nullable(),
  position: numberType().optional().nullable(),
  permission_overwrites: arrayType(PermissionOverwrite).optional().nullable(),
  name: stringType().optional().nullable(),
  topic: stringType().optional().nullable(),
  nsfw: booleanType().optional().nullable(),
  last_message_id: stringType().optional().nullable(),
  bitrate: numberType().optional().nullable(),
  user_limit: numberType().optional().nullable(),
  rate_limit_per_user: numberType().optional().nullable(),
  recipients: arrayType(User).optional().nullable(),
  icon: stringType().optional().nullable(),
  owner_id: stringType().optional().nullable(),
  application_id: stringType().optional().nullable(),
  parent_id: stringType().optional().nullable(),
  last_pin_timestamp: stringType().optional().nullable()
});
var PresenceUpdate = objectType({
  user: User,
  guild_id: stringType(),
  status: Status,
  activities: arrayType(Activity),
  client_status: objectType({
    desktop: Status,
    mobile: Status,
    web: Status
  }).partial()
});
var Role = objectType({
  id: stringType(),
  name: stringType(),
  color: numberType(),
  hoist: booleanType(),
  position: numberType(),
  permissions: stringType(),
  managed: booleanType(),
  mentionable: booleanType()
});
var Guild = objectType({
  id: stringType(),
  name: stringType(),
  owner_id: stringType(),
  icon: stringType().nullable(),
  icon_hash: stringType().optional().nullable(),
  splash: stringType().nullable(),
  discovery_splash: stringType().nullable(),
  owner: booleanType().optional().nullable(),
  permissions: stringType().optional().nullable(),
  region: stringType(),
  afk_channel_id: stringType().nullable(),
  afk_timeout: numberType(),
  widget_enabled: booleanType().optional().nullable(),
  widget_channel_id: stringType().optional().nullable(),
  verification_level: numberType(),
  default_message_notifications: numberType(),
  explicit_content_filter: numberType(),
  roles: arrayType(Role),
  emojis: arrayType(Emoji),
  features: arrayType(stringType()),
  mfa_level: numberType(),
  application_id: stringType().nullable(),
  system_channel_id: stringType().nullable(),
  system_channel_flags: numberType(),
  rules_channel_id: stringType().nullable(),
  joined_at: stringType().optional().nullable(),
  large: booleanType().optional().nullable(),
  unavailable: booleanType().optional().nullable(),
  member_count: numberType().optional().nullable(),
  voice_states: arrayType(VoiceState).optional().nullable(),
  members: arrayType(GuildMember).optional().nullable(),
  channels: arrayType(Channel).optional().nullable(),
  presences: arrayType(PresenceUpdate).optional().nullable(),
  max_presences: numberType().optional().nullable(),
  max_members: numberType().optional().nullable(),
  vanity_url_code: stringType().nullable(),
  description: stringType().nullable(),
  banner: stringType().nullable(),
  premium_tier: numberType(),
  premium_subscription_count: numberType().optional().nullable(),
  preferred_locale: stringType(),
  public_updates_channel_id: stringType().nullable(),
  max_video_channel_users: numberType().optional().nullable(),
  approximate_member_count: numberType().optional().nullable(),
  approximate_presence_count: numberType().optional().nullable()
});
var ChannelMention = objectType({
  id: stringType(),
  guild_id: stringType(),
  type: numberType(),
  name: stringType()
});
var Attachment = objectType({
  id: stringType(),
  filename: stringType(),
  size: numberType(),
  url: stringType(),
  proxy_url: stringType(),
  height: numberType().optional().nullable(),
  width: numberType().optional().nullable()
});
var EmbedFooter = objectType({
  text: stringType(),
  icon_url: stringType().optional().nullable(),
  proxy_icon_url: stringType().optional().nullable()
});
var Image = objectType({
  url: stringType().optional().nullable(),
  proxy_url: stringType().optional().nullable(),
  height: numberType().optional().nullable(),
  width: numberType().optional().nullable()
});
var Video = Image.omit({ proxy_url: true });
var EmbedProvider = objectType({
  name: stringType().optional().nullable(),
  url: stringType().optional().nullable()
});
var EmbedAuthor = objectType({
  name: stringType().optional().nullable(),
  url: stringType().optional().nullable(),
  icon_url: stringType().optional().nullable(),
  proxy_icon_url: stringType().optional().nullable()
});
var EmbedField = objectType({
  name: stringType(),
  value: stringType(),
  inline: booleanType()
});
var Embed = objectType({
  title: stringType().optional().nullable(),
  type: stringType().optional().nullable(),
  description: stringType().optional().nullable(),
  url: stringType().optional().nullable(),
  timestamp: stringType().optional().nullable(),
  color: numberType().optional().nullable(),
  footer: EmbedFooter.optional().nullable(),
  image: Image.optional().nullable(),
  thumbnail: Image.optional().nullable(),
  video: Video.optional().nullable(),
  provider: EmbedProvider.optional().nullable(),
  author: EmbedAuthor.optional().nullable(),
  fields: arrayType(EmbedField).optional().nullable()
});
var Reaction = objectType({
  count: numberType(),
  me: booleanType(),
  emoji: Emoji
});
var MessageActivity = objectType({
  type: numberType(),
  party_id: stringType().optional().nullable()
});
var MessageApplication = objectType({
  id: stringType(),
  cover_image: stringType().optional().nullable(),
  description: stringType(),
  icon: stringType().optional().nullable(),
  name: stringType()
});
var MessageReference = objectType({
  message_id: stringType().optional().nullable(),
  channel_id: stringType().optional().nullable(),
  guild_id: stringType().optional().nullable()
});
var Message = objectType({
  id: stringType(),
  channel_id: stringType(),
  guild_id: stringType().optional().nullable(),
  author: User.optional().nullable(),
  member: GuildMember.optional().nullable(),
  content: stringType(),
  timestamp: stringType(),
  edited_timestamp: stringType().optional().nullable(),
  tts: booleanType(),
  mention_everyone: booleanType(),
  mentions: arrayType(User),
  mention_roles: arrayType(stringType()),
  mention_channels: arrayType(ChannelMention),
  attachments: arrayType(Attachment),
  embeds: arrayType(Embed),
  reactions: arrayType(Reaction).optional().nullable(),
  nonce: unionType([stringType(), numberType()]).optional().nullable(),
  pinned: booleanType(),
  webhook_id: stringType().optional().nullable(),
  type: numberType(),
  activity: MessageActivity.optional().nullable(),
  application: MessageApplication.optional().nullable(),
  message_reference: MessageReference.optional().nullable(),
  flags: numberType().optional().nullable(),
  stickers: arrayType(unknownType()).optional().nullable(),
  // Cannot self reference, but this is possibly a Message
  referenced_message: unknownType().optional().nullable()
});
var VoiceDevice = objectType({
  id: stringType(),
  name: stringType()
});
var KeyTypesObject = {
  UNHANDLED: -1,
  KEYBOARD_KEY: 0,
  MOUSE_BUTTON: 1,
  KEYBOARD_MODIFIER_KEY: 2,
  GAMEPAD_BUTTON: 3
};
var ShortcutKey = objectType({
  type: zodCoerceUnhandledValue(KeyTypesObject),
  code: numberType(),
  name: stringType()
});
var VoiceSettingModeTypeObject = {
  UNHANDLED: -1,
  PUSH_TO_TALK: "PUSH_TO_TALK",
  VOICE_ACTIVITY: "VOICE_ACTIVITY"
};
var VoiceSettingsMode = objectType({
  type: zodCoerceUnhandledValue(VoiceSettingModeTypeObject),
  auto_threshold: booleanType(),
  threshold: numberType(),
  shortcut: arrayType(ShortcutKey),
  delay: numberType()
});
var VoiceSettingsIO = objectType({
  device_id: stringType(),
  volume: numberType(),
  available_devices: arrayType(VoiceDevice)
});
var CertifiedDeviceTypeObject = {
  UNHANDLED: -1,
  AUDIO_INPUT: "AUDIO_INPUT",
  AUDIO_OUTPUT: "AUDIO_OUTPUT",
  VIDEO_INPUT: "VIDEO_INPUT"
};
var CertifiedDevice = objectType({
  type: zodCoerceUnhandledValue(CertifiedDeviceTypeObject),
  id: stringType(),
  vendor: objectType({
    name: stringType(),
    url: stringType()
  }),
  model: objectType({
    name: stringType(),
    url: stringType()
  }),
  related: arrayType(stringType()),
  echo_cancellation: booleanType().optional().nullable(),
  noise_suppression: booleanType().optional().nullable(),
  automatic_gain_control: booleanType().optional().nullable(),
  hardware_mute: booleanType().optional().nullable()
});
var SkuTypeObject = {
  UNHANDLED: -1,
  APPLICATION: 1,
  DLC: 2,
  CONSUMABLE: 3,
  BUNDLE: 4,
  SUBSCRIPTION: 5
};
var Sku = objectType({
  id: stringType(),
  name: stringType(),
  type: zodCoerceUnhandledValue(SkuTypeObject),
  price: objectType({
    amount: numberType(),
    currency: stringType()
  }),
  application_id: stringType(),
  flags: numberType(),
  release_date: stringType().nullable()
});
var EntitlementTypesObject = {
  UNHANDLED: -1,
  PURCHASE: 1,
  PREMIUM_SUBSCRIPTION: 2,
  DEVELOPER_GIFT: 3,
  TEST_MODE_PURCHASE: 4,
  FREE_PURCHASE: 5,
  USER_GIFT: 6,
  PREMIUM_PURCHASE: 7
};
var Entitlement = objectType({
  id: stringType(),
  sku_id: stringType(),
  application_id: stringType(),
  user_id: stringType(),
  gift_code_flags: numberType(),
  type: zodCoerceUnhandledValue(EntitlementTypesObject),
  gifter_user_id: stringType().optional().nullable(),
  branches: arrayType(stringType()).optional().nullable(),
  starts_at: stringType().optional().nullable(),
  // ISO string
  ends_at: stringType().optional().nullable(),
  // ISO string
  parent_id: stringType().optional().nullable(),
  consumed: booleanType().optional().nullable(),
  deleted: booleanType().optional().nullable(),
  gift_code_batch_id: stringType().optional().nullable()
});
var OrientationLockStateTypeObject = {
  UNHANDLED: -1,
  UNLOCKED: 1,
  PORTRAIT: 2,
  LANDSCAPE: 3
};
var OrientationLockState = zodCoerceUnhandledValue(OrientationLockStateTypeObject);
var ThermalStateTypeObject = {
  UNHANDLED: -1,
  NOMINAL: 0,
  FAIR: 1,
  SERIOUS: 2,
  CRITICAL: 3
};
var ThermalState = zodCoerceUnhandledValue(ThermalStateTypeObject);
var OrientationTypeObject = {
  UNHANDLED: -1,
  PORTRAIT: 0,
  LANDSCAPE: 1
};
var Orientation2 = zodCoerceUnhandledValue(OrientationTypeObject);
var LayoutModeTypeObject = {
  UNHANDLED: -1,
  FOCUSED: 0,
  PIP: 1,
  GRID: 2
};
var LayoutMode = zodCoerceUnhandledValue(LayoutModeTypeObject);

// src/schema/events.ts
var ERROR = "ERROR";
var Events = /* @__PURE__ */ ((Events2) => {
  Events2["READY"] = "READY";
  Events2["VOICE_STATE_UPDATE"] = "VOICE_STATE_UPDATE";
  Events2["SPEAKING_START"] = "SPEAKING_START";
  Events2["SPEAKING_STOP"] = "SPEAKING_STOP";
  Events2["ACTIVITY_LAYOUT_MODE_UPDATE"] = "ACTIVITY_LAYOUT_MODE_UPDATE";
  Events2["ORIENTATION_UPDATE"] = "ORIENTATION_UPDATE";
  Events2["CURRENT_USER_UPDATE"] = "CURRENT_USER_UPDATE";
  Events2["CURRENT_GUILD_MEMBER_UPDATE"] = "CURRENT_GUILD_MEMBER_UPDATE";
  Events2["ENTITLEMENT_CREATE"] = "ENTITLEMENT_CREATE";
  Events2["THERMAL_STATE_UPDATE"] = "THERMAL_STATE_UPDATE";
  Events2["ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE"] = "ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE";
  return Events2;
})(Events || {});
var DispatchEventFrame = ReceiveFramePayload.extend({
  evt: nativeEnumType(Events),
  nonce: stringType().nullable(),
  cmd: literalType(DISPATCH),
  data: objectType({}).passthrough()
});
var ErrorEvent = ReceiveFramePayload.extend({
  evt: literalType(ERROR),
  data: objectType({
    code: numberType(),
    message: stringType().optional()
  }).passthrough(),
  cmd: nativeEnumType(Commands),
  nonce: stringType().nullable()
});
var OtherEvent = DispatchEventFrame.extend({
  evt: stringType()
});
var EventFrame = unionType([DispatchEventFrame, OtherEvent, ErrorEvent]);
function parseEventPayload(data) {
  const event = data.evt;
  if (!(event in Events)) {
    throw new Error(`Unrecognized event type ${data.evt}`);
  }
  const eventSchema = EventSchema[event];
  return eventSchema.payload.parse(data);
}
var EventSchema = {
  /**
   * @description
   * The READY event is emitted by Discord's RPC server in reply to a client
   * initiating the RPC handshake. The event includes information about
   * - the rpc server version
   * - the discord client configuration
   * - the (basic) user object
   *
   * Unlike other events, READY will only be omitted once, immediately after the
   * Embedded App SDK is initialized
   *
   * # Supported Platforms
   * | Web | iOS | Android |
   * |-----|-----|---------|
   * | ✅  | ✅  | ✅      |
   *
   * Required scopes: []
   *
   */
  ["READY" /* READY */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("READY" /* READY */),
      data: objectType({
        v: numberType(),
        config: objectType({
          cdn_host: stringType().optional(),
          api_endpoint: stringType(),
          environment: stringType()
        }),
        user: objectType({
          id: stringType(),
          username: stringType(),
          discriminator: stringType(),
          avatar: stringType().optional()
        }).optional()
      })
    })
  },
  ["VOICE_STATE_UPDATE" /* VOICE_STATE_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("VOICE_STATE_UPDATE" /* VOICE_STATE_UPDATE */),
      data: UserVoiceState
    }),
    subscribeArgs: objectType({
      channel_id: stringType()
    })
  },
  ["SPEAKING_START" /* SPEAKING_START */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("SPEAKING_START" /* SPEAKING_START */),
      data: objectType({
        lobby_id: stringType().optional(),
        channel_id: stringType().optional(),
        user_id: stringType()
      })
    }),
    subscribeArgs: objectType({
      lobby_id: stringType().nullable().optional(),
      channel_id: stringType().nullable().optional()
    })
  },
  ["SPEAKING_STOP" /* SPEAKING_STOP */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("SPEAKING_STOP" /* SPEAKING_STOP */),
      data: objectType({
        lobby_id: stringType().optional(),
        channel_id: stringType().optional(),
        user_id: stringType()
      })
    }),
    subscribeArgs: objectType({
      lobby_id: stringType().nullable().optional(),
      channel_id: stringType().nullable().optional()
    })
  },
  ["ACTIVITY_LAYOUT_MODE_UPDATE" /* ACTIVITY_LAYOUT_MODE_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("ACTIVITY_LAYOUT_MODE_UPDATE" /* ACTIVITY_LAYOUT_MODE_UPDATE */),
      data: objectType({
        layout_mode: zodCoerceUnhandledValue(LayoutModeTypeObject)
      })
    })
  },
  ["ORIENTATION_UPDATE" /* ORIENTATION_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("ORIENTATION_UPDATE" /* ORIENTATION_UPDATE */),
      data: objectType({
        screen_orientation: zodCoerceUnhandledValue(OrientationTypeObject),
        /**
         * @deprecated use screen_orientation instead
         */
        orientation: nativeEnumType(Orientation)
      })
    })
  },
  ["CURRENT_USER_UPDATE" /* CURRENT_USER_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("CURRENT_USER_UPDATE" /* CURRENT_USER_UPDATE */),
      data: User
    })
  },
  ["CURRENT_GUILD_MEMBER_UPDATE" /* CURRENT_GUILD_MEMBER_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("CURRENT_GUILD_MEMBER_UPDATE" /* CURRENT_GUILD_MEMBER_UPDATE */),
      data: GuildMemberRPC
    }),
    subscribeArgs: objectType({
      guild_id: stringType()
    })
  },
  ["ENTITLEMENT_CREATE" /* ENTITLEMENT_CREATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("ENTITLEMENT_CREATE" /* ENTITLEMENT_CREATE */),
      data: objectType({ entitlement: Entitlement })
    })
  },
  ["THERMAL_STATE_UPDATE" /* THERMAL_STATE_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("THERMAL_STATE_UPDATE" /* THERMAL_STATE_UPDATE */),
      data: objectType({ thermal_state: ThermalState })
    })
  },
  ["ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE" /* ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE */]: {
    payload: DispatchEventFrame.extend({
      evt: literalType("ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE" /* ACTIVITY_INSTANCE_PARTICIPANTS_UPDATE */),
      data: objectType({
        participants: GetActivityInstanceConnectedParticipantsResponseSchema.shape.participants
      })
    })
  }
};

// src/schema/responses.ts
var responses_exports = {};
__export(responses_exports, {
  AuthenticateResponse: () => AuthenticateResponseSchema,
  AuthorizeResponse: () => AuthorizeResponse,
  CaptureShortcutResponse: () => CaptureShortcutResponse,
  EmptyResponse: () => EmptyResponse,
  EncourageHardwareAccelerationResponse: () => EncourageHardwareAccelerationResponse,
  GetChannelPermissionsResponse: () => GetChannelPermissionsResponse,
  GetChannelResponse: () => GetChannelResponse,
  GetChannelsResponse: () => GetChannelsResponse,
  GetEntitlementsResponse: () => GetEntitlementsResponse,
  GetGuildResponse: () => GetGuildResponse,
  GetGuildsResponse: () => GetGuildsResponse,
  GetPlatformBehaviorsResponse: () => GetPlatformBehaviorsResponse,
  GetSkusResponse: () => GetSkusResponse,
  InitiateImageUploadResponse: () => InitiateImageUploadResponseSchema,
  NullableChannelResponse: () => NullableChannelResponse,
  OpenExternalLinkResponse: () => OpenExternalLinkResponse,
  ResponseFrame: () => ResponseFrame,
  SelectTextChannelResponse: () => SelectTextChannelResponse,
  SelectVoiceChannelResponse: () => SelectVoiceChannelResponse,
  SetActivityResponse: () => SetActivityResponse,
  SetConfigResponse: () => SetConfigResponse,
  StartPurchaseResponse: () => StartPurchaseResponse,
  SubscribeResponse: () => SubscribeResponse,
  UserSettingsGetLocaleResponse: () => UserSettingsGetLocaleResponse,
  VoiceSettingsResponse: () => VoiceSettingsResponse,
  parseResponsePayload: () => parseResponsePayload
});

// src/utils/assertUnreachable.ts
function assertUnreachable(_x, runtimeError) {
  throw runtimeError;
}

// src/schema/responses.ts
var EmptyResponse = objectType({}).nullable();
var AuthorizeResponse = objectType({
  code: stringType()
});
var GetGuildsResponse = objectType({
  guilds: arrayType(
    objectType({
      id: stringType(),
      name: stringType()
    })
  )
});
var GetGuildResponse = objectType({
  id: stringType(),
  name: stringType(),
  icon_url: stringType().optional(),
  members: arrayType(GuildMember)
});
var GetChannelResponse = objectType({
  id: stringType(),
  type: zodCoerceUnhandledValue(ChannelTypesObject),
  guild_id: stringType().optional().nullable(),
  name: stringType().optional().nullable(),
  topic: stringType().optional().nullable(),
  bitrate: numberType().optional().nullable(),
  user_limit: numberType().optional().nullable(),
  position: numberType().optional().nullable(),
  voice_states: arrayType(UserVoiceState),
  messages: arrayType(Message)
});
var GetChannelsResponse = objectType({
  channels: arrayType(Channel)
});
var NullableChannelResponse = GetChannelResponse.nullable();
var SelectVoiceChannelResponse = GetChannelResponse.nullable();
var SelectTextChannelResponse = GetChannelResponse.nullable();
var VoiceSettingsResponse = objectType({
  input: VoiceSettingsIO,
  output: VoiceSettingsIO,
  mode: VoiceSettingsMode,
  automatic_gain_control: booleanType(),
  echo_cancellation: booleanType(),
  noise_suppression: booleanType(),
  qos: booleanType(),
  silence_warning: booleanType(),
  deaf: booleanType(),
  mute: booleanType()
});
var SubscribeResponse = objectType({
  evt: stringType()
});
var CaptureShortcutResponse = objectType({ shortcut: ShortcutKey });
var SetActivityResponse = Activity;
var GetSkusResponse = objectType({ skus: arrayType(Sku) });
var GetEntitlementsResponse = objectType({ entitlements: arrayType(Entitlement) });
var StartPurchaseResponse = arrayType(Entitlement).nullable();
var SetConfigResponse = objectType({
  use_interactive_pip: booleanType()
});
var UserSettingsGetLocaleResponse = objectType({
  locale: stringType()
});
var EncourageHardwareAccelerationResponse = objectType({
  enabled: booleanType()
});
var GetChannelPermissionsResponse = objectType({
  permissions: bigIntType().or(stringType())
});
var OpenExternalLinkResponse = fallbackToDefault(
  objectType({ opened: booleanType().or(nullType()) }).default({ opened: null })
);
var GetPlatformBehaviorsResponse = objectType({
  iosKeyboardResizesView: optionalType(booleanType())
});
var ResponseFrame = ReceiveFramePayload.extend({
  cmd: nativeEnumType(Commands),
  evt: nullType()
});
function parseResponseData({ cmd, data }) {
  switch (cmd) {
    case "AUTHORIZE" /* AUTHORIZE */:
      return AuthorizeResponse.parse(data);
    case "CAPTURE_SHORTCUT" /* CAPTURE_SHORTCUT */:
      return CaptureShortcutResponse.parse(data);
    case "ENCOURAGE_HW_ACCELERATION" /* ENCOURAGE_HW_ACCELERATION */:
      return EncourageHardwareAccelerationResponse.parse(data);
    case "GET_CHANNEL" /* GET_CHANNEL */:
      return GetChannelResponse.parse(data);
    case "GET_CHANNELS" /* GET_CHANNELS */:
      return GetChannelsResponse.parse(data);
    case "GET_CHANNEL_PERMISSIONS" /* GET_CHANNEL_PERMISSIONS */:
      return GetChannelPermissionsResponse.parse(data);
    case "GET_GUILD" /* GET_GUILD */:
      return GetGuildResponse.parse(data);
    case "GET_GUILDS" /* GET_GUILDS */:
      return GetGuildsResponse.parse(data);
    case "GET_PLATFORM_BEHAVIORS" /* GET_PLATFORM_BEHAVIORS */:
      return GetPlatformBehaviorsResponse.parse(data);
    case "GET_CHANNEL" /* GET_CHANNEL */:
      return GetChannelResponse.parse(data);
    case "SELECT_TEXT_CHANNEL" /* SELECT_TEXT_CHANNEL */:
      return SelectTextChannelResponse.parse(data);
    case "SELECT_VOICE_CHANNEL" /* SELECT_VOICE_CHANNEL */:
      return SelectVoiceChannelResponse.parse(data);
    case "SET_ACTIVITY" /* SET_ACTIVITY */:
      return SetActivityResponse.parse(data);
    case "GET_SKUS_EMBEDDED" /* GET_SKUS_EMBEDDED */:
      return GetSkusResponse.parse(data);
    case "GET_ENTITLEMENTS_EMBEDDED" /* GET_ENTITLEMENTS_EMBEDDED */:
      return GetEntitlementsResponse.parse(data);
    case "SET_CONFIG" /* SET_CONFIG */:
      return SetConfigResponse.parse(data);
    case "START_PURCHASE" /* START_PURCHASE */:
      return StartPurchaseResponse.parse(data);
    case "SUBSCRIBE" /* SUBSCRIBE */:
    case "UNSUBSCRIBE" /* UNSUBSCRIBE */:
      return SubscribeResponse.parse(data);
    case "USER_SETTINGS_GET_LOCALE" /* USER_SETTINGS_GET_LOCALE */:
      return UserSettingsGetLocaleResponse.parse(data);
    case "OPEN_EXTERNAL_LINK" /* OPEN_EXTERNAL_LINK */:
      return OpenExternalLinkResponse.parse(data);
    // Empty Responses
    case "SET_ORIENTATION_LOCK_STATE" /* SET_ORIENTATION_LOCK_STATE */:
    case "SET_CERTIFIED_DEVICES" /* SET_CERTIFIED_DEVICES */:
    case "SEND_ANALYTICS_EVENT" /* SEND_ANALYTICS_EVENT */:
    case "OPEN_INVITE_DIALOG" /* OPEN_INVITE_DIALOG */:
    case "CAPTURE_LOG" /* CAPTURE_LOG */:
    case "GET_SKUS" /* GET_SKUS */:
    case "GET_ENTITLEMENTS" /* GET_ENTITLEMENTS */:
      return EmptyResponse.parse(data);
    // Generated Responses
    case "AUTHENTICATE" /* AUTHENTICATE */:
    case "INITIATE_IMAGE_UPLOAD" /* INITIATE_IMAGE_UPLOAD */:
    case "OPEN_SHARE_MOMENT_DIALOG" /* OPEN_SHARE_MOMENT_DIALOG */:
    case "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" /* GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS */:
    case "SHARE_LINK" /* SHARE_LINK */:
      const { response } = Schemas[cmd];
      return response.parse(data);
    default:
      assertUnreachable(cmd, new Error(`Unrecognized command ${cmd}`));
  }
}
function parseResponsePayload(payload) {
  return {
    ...payload,
    data: parseResponseData(payload)
  };
}

// src/schema/index.ts
var HelloPayload = objectType({
  frame_id: stringType(),
  platform: nativeEnumType(Platform).optional().nullable()
});
var ConnectPayload = objectType({
  v: literalType(1),
  encoding: literalType("json").optional(),
  client_id: stringType(),
  frame_id: stringType()
});
var ClosePayload = objectType({
  code: numberType(),
  message: stringType().optional()
});
var IncomingPayload = objectType({
  evt: stringType().nullable(),
  nonce: stringType().nullable(),
  data: unknownType().nullable(),
  cmd: stringType()
}).passthrough();
function parseIncomingPayload(payload) {
  const incoming = IncomingPayload.parse(payload);
  if (incoming.evt != null) {
    if (incoming.evt === ERROR) {
      return ErrorEvent.parse(incoming);
    }
    return parseEventPayload(EventFrame.parse(incoming));
  } else {
    return parseResponsePayload(ResponseFrame.passthrough().parse(incoming));
  }
}

// src/utils/commandFactory.ts
function commandFactory(sendCommand, cmd, response, transferTransform = () => void 0) {
  const payload = ReceiveFramePayload.extend({
    cmd: literalType(cmd),
    data: response
  });
  return async (args) => {
    const reply = await sendCommand({ cmd, args, transfer: transferTransform(args) });
    const parsed = payload.parse(reply);
    return parsed.data;
  };
}
function schemaCommandFactory(cmd, transferTransform = () => void 0) {
  const response = Schemas[cmd].response;
  const payload = ReceiveFramePayload.extend({
    cmd: literalType(cmd),
    data: response
  });
  return (sendCommand) => async (args) => {
    const reply = await sendCommand({
      // @ts-expect-error - Merge commands
      cmd,
      args,
      transfer: transferTransform(args)
    });
    const parsed = payload.parse(reply);
    return parsed.data;
  };
}

// src/commands/authenticate.ts
var authenticate = schemaCommandFactory("AUTHENTICATE" /* AUTHENTICATE */);

// src/commands/authorize.ts
var authorize = (sendCommand) => commandFactory(sendCommand, "AUTHORIZE" /* AUTHORIZE */, AuthorizeResponse);

// src/commands/captureLog.ts
var captureLog = (sendCommand) => commandFactory(sendCommand, "CAPTURE_LOG" /* CAPTURE_LOG */, EmptyResponse);

// src/commands/encourageHardwareAcceleration.ts
var encourageHardwareAcceleration = (sendCommand) => commandFactory(
  sendCommand,
  "ENCOURAGE_HW_ACCELERATION" /* ENCOURAGE_HW_ACCELERATION */,
  EncourageHardwareAccelerationResponse
);

// src/commands/getEntitlements.ts
var getEntitlements = (sendCommand) => commandFactory(
  sendCommand,
  "GET_ENTITLEMENTS_EMBEDDED" /* GET_ENTITLEMENTS_EMBEDDED */,
  GetEntitlementsResponse
);

// src/commands/getSkus.ts
var getSkus = (sendCommand) => commandFactory(sendCommand, "GET_SKUS_EMBEDDED" /* GET_SKUS_EMBEDDED */, GetSkusResponse);

// src/commands/getChannelPermissions.ts
var getChannelPermissions = (sendCommand) => commandFactory(
  sendCommand,
  "GET_CHANNEL_PERMISSIONS" /* GET_CHANNEL_PERMISSIONS */,
  GetChannelPermissionsResponse
);

// src/commands/getPlatformBehaviors.ts
var getPlatformBehaviors = (sendCommand) => commandFactory(
  sendCommand,
  "GET_PLATFORM_BEHAVIORS" /* GET_PLATFORM_BEHAVIORS */,
  GetPlatformBehaviorsResponse
);

// src/commands/openExternalLink.ts
var openExternalLink = (sendCommand) => commandFactory(
  sendCommand,
  "OPEN_EXTERNAL_LINK" /* OPEN_EXTERNAL_LINK */,
  OpenExternalLinkResponse
);

// src/commands/openInviteDialog.ts
var openInviteDialog = (sendCommand) => commandFactory(sendCommand, "OPEN_INVITE_DIALOG" /* OPEN_INVITE_DIALOG */, EmptyResponse);

// src/commands/openShareMomentDialog.ts
var openShareMomentDialog = schemaCommandFactory("OPEN_SHARE_MOMENT_DIALOG" /* OPEN_SHARE_MOMENT_DIALOG */);

// src/commands/setActivity.ts
var SetActivity = Activity.pick({
  state: true,
  details: true,
  timestamps: true,
  assets: true,
  party: true,
  secrets: true,
  instance: true,
  type: true
}).extend({
  type: Activity.shape.type.optional(),
  instance: Activity.shape.instance.optional()
}).nullable();
var setActivity = (sendCommand) => commandFactory(sendCommand, "SET_ACTIVITY" /* SET_ACTIVITY */, SetActivityResponse);

// src/commands/setConfig.ts
var setConfig = (sendCommand) => commandFactory(sendCommand, "SET_CONFIG" /* SET_CONFIG */, SetConfigResponse);

// src/utils/compatCommandFactory.ts
function compatCommandFactory({
  sendCommand,
  cmd,
  response,
  fallbackTransform: fallbackTransform2,
  transferTransform = () => void 0
}) {
  const payload = ReceiveFramePayload.extend({
    cmd: literalType(cmd),
    data: response
  });
  return async (args) => {
    try {
      const reply = await sendCommand({ cmd, args, transfer: transferTransform(args) });
      const parsed = payload.parse(reply);
      return parsed.data;
    } catch (error) {
      if (error.code === 4e3 /* INVALID_PAYLOAD */) {
        const fallbackArgs = fallbackTransform2(args);
        const reply = await sendCommand({ cmd, args: fallbackArgs, transfer: transferTransform(fallbackArgs) });
        const parsed = payload.parse(reply);
        return parsed.data;
      } else {
        throw error;
      }
    }
  };
}

// src/commands/setOrientationLockState.ts
var fallbackTransform = (args) => {
  return {
    lock_state: args.lock_state,
    picture_in_picture_lock_state: args.picture_in_picture_lock_state
  };
};
var setOrientationLockState = (sendCommand) => compatCommandFactory({
  sendCommand,
  cmd: "SET_ORIENTATION_LOCK_STATE" /* SET_ORIENTATION_LOCK_STATE */,
  response: EmptyResponse,
  fallbackTransform
});

// src/commands/shareLink.ts
var shareLink = schemaCommandFactory("SHARE_LINK" /* SHARE_LINK */);

// src/commands/startPurchase.ts
var startPurchase = (sendCommand) => commandFactory(
  sendCommand,
  "START_PURCHASE" /* START_PURCHASE */,
  StartPurchaseResponse
);

// src/commands/userSettingsGetLocale.ts
var userSettingsGetLocale = (sendCommand) => commandFactory(
  sendCommand,
  "USER_SETTINGS_GET_LOCALE" /* USER_SETTINGS_GET_LOCALE */,
  UserSettingsGetLocaleResponse
);

// src/commands/initiateImageUpload.ts
var initiateImageUpload = schemaCommandFactory("INITIATE_IMAGE_UPLOAD" /* INITIATE_IMAGE_UPLOAD */);

// src/commands/getChannel.ts
var getChannel = (sendCommand) => commandFactory(sendCommand, "GET_CHANNEL" /* GET_CHANNEL */, GetChannelResponse);

// src/commands/getInstanceConnectedParticipants.ts
var getInstanceConnectedParticipants = schemaCommandFactory(
  "GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS" /* GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS */
);

// src/commands/index.ts
function commands(sendCommand) {
  return {
    authenticate: authenticate(sendCommand),
    authorize: authorize(sendCommand),
    captureLog: captureLog(sendCommand),
    encourageHardwareAcceleration: encourageHardwareAcceleration(sendCommand),
    getChannel: getChannel(sendCommand),
    getChannelPermissions: getChannelPermissions(sendCommand),
    getEntitlements: getEntitlements(sendCommand),
    getPlatformBehaviors: getPlatformBehaviors(sendCommand),
    getSkus: getSkus(sendCommand),
    openExternalLink: openExternalLink(sendCommand),
    openInviteDialog: openInviteDialog(sendCommand),
    openShareMomentDialog: openShareMomentDialog(sendCommand),
    setActivity: setActivity(sendCommand),
    setConfig: setConfig(sendCommand),
    setOrientationLockState: setOrientationLockState(sendCommand),
    shareLink: shareLink(sendCommand),
    startPurchase: startPurchase(sendCommand),
    userSettingsGetLocale: userSettingsGetLocale(sendCommand),
    initiateImageUpload: initiateImageUpload(sendCommand),
    getInstanceConnectedParticipants: getInstanceConnectedParticipants(sendCommand)
  };
}
var commands_default = commands;

// node_modules/uuid/dist/esm-browser/stringify.js
var byteToHex = [];
for (i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
var i;
function unsafeStringify(arr, offset = 0) {
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

// node_modules/uuid/dist/esm-browser/rng.js
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}

// node_modules/uuid/dist/esm-browser/native.js
var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
var native_default = {
  randomUUID
};

// node_modules/uuid/dist/esm-browser/v4.js
function v4(options, buf, offset) {
  if (native_default.randomUUID && !buf && !options) {
    return native_default.randomUUID();
  }
  options = options || {};
  var rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
var v4_default = v4;

// src/error.ts
var SDKError = class extends Error {
  constructor(code, message = "") {
    super(message);
    this.code = code;
    this.message = message;
    this.name = "Discord SDK Error";
  }
};

// src/utils/getDefaultSdkConfiguration.ts
function getDefaultSdkConfiguration() {
  return {
    disableConsoleLogOverride: false
  };
}

// src/utils/console.ts
var consoleLevels = ["log", "warn", "debug", "info", "error"];
function wrapConsoleMethod(console2, level, callback) {
  const _consoleMethod = console2[level];
  const _console = console2;
  if (!_consoleMethod) {
    return;
  }
  console2[level] = function() {
    const args = [].slice.call(arguments);
    const message = "" + args.join(" ");
    callback(level, message);
    _consoleMethod.apply(_console, args);
  };
}

// package.json
var version = "1.9.0";

// src/Discord.ts
var ALLOWED_ORIGINS = new Set(getAllowedOrigins());
function getAllowedOrigins() {
  if (typeof window === "undefined") return [];
  return [
    window.location.origin,
    "https://discord.com",
    "https://discordapp.com",
    "https://ptb.discord.com",
    "https://ptb.discordapp.com",
    "https://canary.discord.com",
    "https://canary.discordapp.com",
    "https://staging.discord.co",
    "http://localhost:3333",
    "https://pax.discord.com",
    "null"
  ];
}
function getRPCServerSource() {
  return [window.parent.opener ?? window.parent, !!document.referrer ? document.referrer : "*"];
}
var DiscordSDK = class {
  constructor(clientId, configuration) {
    this.sdkVersion = version;
    this.mobileAppVersion = null;
    this.source = null;
    this.sourceOrigin = "";
    this.eventBus = new eventemitter3_default();
    this.pendingCommands = /* @__PURE__ */ new Map();
    this.sendCommand = (payload) => {
      if (this.source == null) throw new Error("Attempting to send message before initialization");
      const nonce = v4_default();
      this.source?.postMessage([1 /* FRAME */, { ...payload, nonce }], this.sourceOrigin, this.getTransfer(payload));
      const promise = new Promise((resolve, reject) => {
        this.pendingCommands.set(nonce, { resolve, reject });
      });
      return promise;
    };
    this.commands = commands_default(this.sendCommand);
    /**
     * WARNING - All "console" logs are emitted as messages to the Discord client
     *  If you write "console.log" anywhere in handleMessage or subsequent message handling
     * there is a good chance you will cause an infinite loop where you receive a message
     * which causes "console.log" which sends a message, which causes the discord client to
     * send a reply which causes handleMessage to fire again, and again to inifinity
     *
     * If you need to log within handleMessage, consider setting
     * config.disableConsoleLogOverride to true when initializing the SDK
     */
    this.handleMessage = (event) => {
      if (!ALLOWED_ORIGINS.has(event.origin)) return;
      const tuple = event.data;
      if (!Array.isArray(tuple)) {
        return;
      }
      const [opcode, data] = tuple;
      switch (opcode) {
        case 3 /* HELLO */:
          return;
        case 2 /* CLOSE */:
          return this.handleClose(data);
        case 0 /* HANDSHAKE */:
          return this.handleHandshake();
        case 1 /* FRAME */:
          return this.handleFrame(data);
        default:
          throw new Error("Invalid message format");
      }
    };
    this.isReady = false;
    this.clientId = clientId;
    this.configuration = configuration ?? getDefaultSdkConfiguration();
    if (typeof window !== "undefined") {
      window.addEventListener("message", this.handleMessage);
    }
    if (typeof window === "undefined") {
      this.frameId = "";
      this.instanceId = "";
      this.customId = null;
      this.referrerId = null;
      this.platform = "desktop" /* DESKTOP */;
      this.guildId = null;
      this.channelId = null;
      this.locationId = null;
      return;
    }
    const urlParams = new URLSearchParams(this._getSearch());
    const frameId = urlParams.get("frame_id");
    if (!frameId) {
      throw new Error("frame_id query param is not defined");
    }
    this.frameId = frameId;
    const instanceId = urlParams.get("instance_id");
    if (!instanceId) {
      throw new Error("instance_id query param is not defined");
    }
    this.instanceId = instanceId;
    const platform = urlParams.get("platform");
    if (!platform) {
      throw new Error("platform query param is not defined");
    } else if (platform !== "desktop" /* DESKTOP */ && platform !== "mobile" /* MOBILE */) {
      throw new Error(
        `Invalid query param "platform" of "${platform}". Valid values are "${"desktop" /* DESKTOP */}" or "${"mobile" /* MOBILE */}"`
      );
    }
    this.platform = platform;
    this.customId = urlParams.get("custom_id");
    this.referrerId = urlParams.get("referrer_id");
    this.guildId = urlParams.get("guild_id");
    this.channelId = urlParams.get("channel_id");
    this.locationId = urlParams.get("location_id");
    this.mobileAppVersion = urlParams.get("mobile_app_version");
    [this.source, this.sourceOrigin] = getRPCServerSource();
    this.addOnReadyListener();
    this.handshake();
  }
  getTransfer(payload) {
    switch (payload.cmd) {
      case "SUBSCRIBE" /* SUBSCRIBE */:
      case "UNSUBSCRIBE" /* UNSUBSCRIBE */:
        return void 0;
      default:
        return payload.transfer ?? void 0;
    }
  }
  close(code, message) {
    window.removeEventListener("message", this.handleMessage);
    const nonce = v4_default();
    this.source?.postMessage([2 /* CLOSE */, { code, message, nonce }], this.sourceOrigin);
  }
  async subscribe(event, listener, ...rest) {
    const [subscribeArgs] = rest;
    const listenerCount = this.eventBus.listenerCount(event);
    const emitter = this.eventBus.on(event, listener);
    if (Object.values(Events).includes(event) && event !== "READY" /* READY */ && listenerCount === 0) {
      await this.sendCommand({
        cmd: "SUBSCRIBE" /* SUBSCRIBE */,
        args: subscribeArgs,
        evt: event
      });
    }
    return emitter;
  }
  async unsubscribe(event, listener, ...rest) {
    const [unsubscribeArgs] = rest;
    if (event !== "READY" /* READY */ && this.eventBus.listenerCount(event) === 1) {
      await this.sendCommand({
        cmd: "UNSUBSCRIBE" /* UNSUBSCRIBE */,
        evt: event,
        args: unsubscribeArgs
      });
    }
    return this.eventBus.off(event, listener);
  }
  async ready() {
    if (this.isReady) {
      return;
    } else {
      await new Promise((resolve) => {
        this.eventBus.once("READY" /* READY */, resolve);
      });
    }
  }
  parseMajorMobileVersion() {
    if (this.mobileAppVersion && this.mobileAppVersion.includes(".")) {
      try {
        return parseInt(this.mobileAppVersion.split(".")[0]);
      } catch {
        return UNKNOWN_VERSION_NUMBER;
      }
    }
    return UNKNOWN_VERSION_NUMBER;
  }
  handshake() {
    const handshakePayload = {
      v: 1,
      encoding: "json",
      client_id: this.clientId,
      frame_id: this.frameId
    };
    const majorMobileVersion = this.parseMajorMobileVersion();
    if (this.platform === "desktop" /* DESKTOP */ || majorMobileVersion >= HANDSHAKE_SDK_VERSION_MINIMUM_MOBILE_VERSION) {
      handshakePayload["sdk_version"] = this.sdkVersion;
    }
    this.source?.postMessage([0 /* HANDSHAKE */, handshakePayload], this.sourceOrigin);
  }
  addOnReadyListener() {
    this.eventBus.once("READY" /* READY */, () => {
      this.overrideConsoleLogging();
      this.isReady = true;
    });
  }
  overrideConsoleLogging() {
    if (this.configuration.disableConsoleLogOverride) return;
    const sendCaptureLogCommand = (level, message) => {
      this.commands.captureLog({
        level,
        message
      });
    };
    consoleLevels.forEach((level) => {
      wrapConsoleMethod(console, level, sendCaptureLogCommand);
    });
  }
  handleClose(data) {
    ClosePayload.parse(data);
  }
  handleHandshake() {
  }
  handleFrame(payload) {
    let parsed;
    try {
      parsed = parseIncomingPayload(payload);
    } catch (e) {
      console.error("Failed to parse", payload);
      console.error(e);
      return;
    }
    if (parsed.cmd === "DISPATCH") {
      this.eventBus.emit(parsed.evt, parsed.data);
    } else {
      if (parsed.evt === ERROR) {
        if (parsed.nonce != null) {
          this.pendingCommands.get(parsed.nonce)?.reject(parsed.data);
          this.pendingCommands.delete(parsed.nonce);
          return;
        }
        this.eventBus.emit("error", new SDKError(parsed.data.code, parsed.data.message));
      }
      if (parsed.nonce == null) {
        console.error("Missing nonce", payload);
        return;
      }
      this.pendingCommands.get(parsed.nonce)?.resolve(parsed);
      this.pendingCommands.delete(parsed.nonce);
    }
  }
  _getSearch() {
    return typeof window === "undefined" ? "" : window.location.search;
  }
};

// src/utils/PermissionUtils.ts
function can(permission, permissions) {
  return BigFlagUtils_default.has(BigFlagUtils_default.deserialize(permissions), permission);
}
var PermissionUtils_default = {
  can
};

// src/utils/PriceUtils.ts
var import_decimal = __toESM(require_decimal());

// src/utils/PriceConstants.ts
var CurrencyExponents = {
  ["aed" /* AED */]: 2,
  ["afn" /* AFN */]: 2,
  ["all" /* ALL */]: 2,
  ["amd" /* AMD */]: 2,
  ["ang" /* ANG */]: 2,
  ["aoa" /* AOA */]: 2,
  ["ars" /* ARS */]: 2,
  ["aud" /* AUD */]: 2,
  ["awg" /* AWG */]: 2,
  ["azn" /* AZN */]: 2,
  ["bam" /* BAM */]: 2,
  ["bbd" /* BBD */]: 2,
  ["bdt" /* BDT */]: 2,
  ["bgn" /* BGN */]: 2,
  ["bhd" /* BHD */]: 3,
  ["bif" /* BIF */]: 0,
  ["bmd" /* BMD */]: 2,
  ["bnd" /* BND */]: 2,
  ["bob" /* BOB */]: 2,
  ["bov" /* BOV */]: 2,
  ["brl" /* BRL */]: 2,
  ["bsd" /* BSD */]: 2,
  ["btn" /* BTN */]: 2,
  ["bwp" /* BWP */]: 2,
  ["byr" /* BYR */]: 0,
  ["byn" /* BYN */]: 2,
  ["bzd" /* BZD */]: 2,
  ["cad" /* CAD */]: 2,
  ["cdf" /* CDF */]: 2,
  ["che" /* CHE */]: 2,
  ["chf" /* CHF */]: 2,
  ["chw" /* CHW */]: 2,
  ["clf" /* CLF */]: 0,
  ["clp" /* CLP */]: 0,
  ["cny" /* CNY */]: 2,
  ["cop" /* COP */]: 2,
  ["cou" /* COU */]: 2,
  ["crc" /* CRC */]: 2,
  ["cuc" /* CUC */]: 2,
  ["cup" /* CUP */]: 2,
  ["cve" /* CVE */]: 2,
  ["czk" /* CZK */]: 2,
  ["djf" /* DJF */]: 0,
  ["dkk" /* DKK */]: 2,
  ["dop" /* DOP */]: 2,
  ["dzd" /* DZD */]: 2,
  ["egp" /* EGP */]: 2,
  ["ern" /* ERN */]: 2,
  ["etb" /* ETB */]: 2,
  ["eur" /* EUR */]: 2,
  ["fjd" /* FJD */]: 2,
  ["fkp" /* FKP */]: 2,
  ["gbp" /* GBP */]: 2,
  ["gel" /* GEL */]: 2,
  ["ghs" /* GHS */]: 2,
  ["gip" /* GIP */]: 2,
  ["gmd" /* GMD */]: 2,
  ["gnf" /* GNF */]: 0,
  ["gtq" /* GTQ */]: 2,
  ["gyd" /* GYD */]: 2,
  ["hkd" /* HKD */]: 2,
  ["hnl" /* HNL */]: 2,
  ["hrk" /* HRK */]: 2,
  ["htg" /* HTG */]: 2,
  ["huf" /* HUF */]: 2,
  ["idr" /* IDR */]: 2,
  ["ils" /* ILS */]: 2,
  ["inr" /* INR */]: 2,
  ["iqd" /* IQD */]: 3,
  ["irr" /* IRR */]: 2,
  ["isk" /* ISK */]: 0,
  ["jmd" /* JMD */]: 2,
  ["jod" /* JOD */]: 3,
  ["jpy" /* JPY */]: 0,
  ["kes" /* KES */]: 2,
  ["kgs" /* KGS */]: 2,
  ["khr" /* KHR */]: 2,
  ["kmf" /* KMF */]: 0,
  ["kpw" /* KPW */]: 2,
  ["krw" /* KRW */]: 0,
  ["kwd" /* KWD */]: 3,
  ["kyd" /* KYD */]: 2,
  ["kzt" /* KZT */]: 2,
  ["lak" /* LAK */]: 2,
  ["lbp" /* LBP */]: 2,
  ["lkr" /* LKR */]: 2,
  ["lrd" /* LRD */]: 2,
  ["lsl" /* LSL */]: 2,
  ["ltl" /* LTL */]: 2,
  ["lvl" /* LVL */]: 2,
  ["lyd" /* LYD */]: 3,
  ["mad" /* MAD */]: 2,
  ["mdl" /* MDL */]: 2,
  ["mga" /* MGA */]: 2,
  ["mkd" /* MKD */]: 2,
  ["mmk" /* MMK */]: 2,
  ["mnt" /* MNT */]: 2,
  ["mop" /* MOP */]: 2,
  ["mro" /* MRO */]: 2,
  ["mur" /* MUR */]: 2,
  ["mvr" /* MVR */]: 2,
  ["mwk" /* MWK */]: 2,
  ["mxn" /* MXN */]: 2,
  ["mxv" /* MXV */]: 2,
  ["myr" /* MYR */]: 2,
  ["mzn" /* MZN */]: 2,
  ["nad" /* NAD */]: 2,
  ["ngn" /* NGN */]: 2,
  ["nio" /* NIO */]: 2,
  ["nok" /* NOK */]: 2,
  ["npr" /* NPR */]: 2,
  ["nzd" /* NZD */]: 2,
  ["omr" /* OMR */]: 3,
  ["pab" /* PAB */]: 2,
  ["pen" /* PEN */]: 2,
  ["pgk" /* PGK */]: 2,
  ["php" /* PHP */]: 2,
  ["pkr" /* PKR */]: 2,
  ["pln" /* PLN */]: 2,
  ["pyg" /* PYG */]: 0,
  ["qar" /* QAR */]: 2,
  ["ron" /* RON */]: 2,
  ["rsd" /* RSD */]: 2,
  ["rub" /* RUB */]: 2,
  ["rwf" /* RWF */]: 0,
  ["sar" /* SAR */]: 2,
  ["sbd" /* SBD */]: 2,
  ["scr" /* SCR */]: 2,
  ["sdg" /* SDG */]: 2,
  ["sek" /* SEK */]: 2,
  ["sgd" /* SGD */]: 2,
  ["shp" /* SHP */]: 2,
  ["sll" /* SLL */]: 2,
  ["sos" /* SOS */]: 2,
  ["srd" /* SRD */]: 2,
  ["ssp" /* SSP */]: 2,
  ["std" /* STD */]: 2,
  ["svc" /* SVC */]: 2,
  ["syp" /* SYP */]: 2,
  ["szl" /* SZL */]: 2,
  ["thb" /* THB */]: 2,
  ["tjs" /* TJS */]: 2,
  ["tmt" /* TMT */]: 2,
  ["tnd" /* TND */]: 3,
  ["top" /* TOP */]: 2,
  ["try" /* TRY */]: 2,
  ["ttd" /* TTD */]: 2,
  ["twd" /* TWD */]: 2,
  ["tzs" /* TZS */]: 2,
  ["uah" /* UAH */]: 2,
  ["ugx" /* UGX */]: 0,
  ["usd" /* USD */]: 2,
  ["usn" /* USN */]: 2,
  ["uss" /* USS */]: 2,
  ["uyi" /* UYI */]: 0,
  ["uyu" /* UYU */]: 2,
  ["uzs" /* UZS */]: 2,
  ["vef" /* VEF */]: 2,
  ["vnd" /* VND */]: 0,
  ["vuv" /* VUV */]: 0,
  ["wst" /* WST */]: 2,
  ["xaf" /* XAF */]: 0,
  ["xag" /* XAG */]: 0,
  ["xau" /* XAU */]: 0,
  ["xba" /* XBA */]: 0,
  ["xbb" /* XBB */]: 0,
  ["xbc" /* XBC */]: 0,
  ["xbd" /* XBD */]: 0,
  ["xcd" /* XCD */]: 2,
  ["xdr" /* XDR */]: 0,
  ["xfu" /* XFU */]: 0,
  ["xof" /* XOF */]: 0,
  ["xpd" /* XPD */]: 0,
  ["xpf" /* XPF */]: 0,
  ["xpt" /* XPT */]: 0,
  ["xsu" /* XSU */]: 0,
  ["xts" /* XTS */]: 0,
  ["xua" /* XUA */]: 0,
  ["yer" /* YER */]: 2,
  ["zar" /* ZAR */]: 2,
  ["zmw" /* ZMW */]: 2,
  ["zwl" /* ZWL */]: 2
};

// src/utils/PriceUtils.ts
function formatPrice(price, locale = "en-US") {
  const { amount, currency } = price;
  const formatter = Intl.NumberFormat(locale, { style: "currency", currency });
  return formatter.format(convertToMajorCurrencyUnits(amount, currency));
}
function convertToMajorCurrencyUnits(minorUnitValue, currency) {
  const exponent = CurrencyExponents[currency];
  if (exponent == null) {
    console.warn(`Unexpected currency ${currency}`);
    return minorUnitValue;
  }
  const minorUnit = new import_decimal.default(minorUnitValue);
  return minorUnit.dividedBy(10 ** exponent).toNumber();
}
var PriceUtils_default = {
  formatPrice
};

// src/mock.ts
var import_big_integer2 = __toESM(require_BigInteger());
var import_lodash = __toESM(require_lodash());
var DiscordSDKMock = class {
  constructor(clientId, guildId, channelId, locationId) {
    this.platform = "desktop" /* DESKTOP */;
    this.instanceId = "123456789012345678";
    this.configuration = getDefaultSdkConfiguration();
    this.source = null;
    this.sourceOrigin = "";
    this.sdkVersion = "mock";
    this.mobileAppVersion = "unknown";
    this.frameId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
    this.eventBus = new eventemitter3_default();
    this.clientId = clientId;
    this.commands = this._updateCommandMocks({});
    this.guildId = guildId;
    this.channelId = channelId;
    this.locationId = locationId;
    this.customId = null;
    this.referrerId = null;
  }
  _updateCommandMocks(newCommands) {
    this.commands = (0, import_lodash.default)(Object.assign({}, commandsMockDefault, newCommands), (mock, func, name) => {
      mock[name] = async (...args) => {
        console.info(`DiscordSDKMock: ${String(name)}(${JSON.stringify(args)})`);
        return await func(...args);
      };
    });
    return this.commands;
  }
  emitReady() {
    this.emitEvent("READY", void 0);
  }
  close(...args) {
    console.info(`DiscordSDKMock: close(${JSON.stringify(args)})`);
  }
  ready() {
    return Promise.resolve();
  }
  async subscribe(event, listener, ..._subscribeArgs) {
    return await this.eventBus.on(event, listener);
  }
  async unsubscribe(event, listener, ..._unsubscribeArgs) {
    return await this.eventBus.off(event, listener);
  }
  emitEvent(event, data) {
    this.eventBus.emit(event, data);
  }
};
var commandsMockDefault = {
  authorize: () => Promise.resolve({ code: "mock_code" }),
  authenticate: () => Promise.resolve({
    access_token: "mock_token",
    user: {
      username: "mock_user_username",
      discriminator: "mock_user_discriminator",
      id: "mock_user_id",
      avatar: null,
      public_flags: 1
    },
    scopes: [],
    expires: new Date(2121, 1, 1).toString(),
    application: {
      description: "mock_app_description",
      icon: "mock_app_icon",
      id: "mock_app_id",
      name: "mock_app_name"
    }
  }),
  setActivity: () => Promise.resolve({
    name: "mock_activity_name",
    type: 0
  }),
  getChannel: () => Promise.resolve({
    id: "mock_channel_id",
    name: "mock_channel_name",
    type: ChannelTypesObject.GUILD_TEXT,
    voice_states: [],
    messages: []
  }),
  getSkus: () => Promise.resolve({ skus: [] }),
  getEntitlements: () => Promise.resolve({ entitlements: [] }),
  startPurchase: () => Promise.resolve([]),
  setConfig: () => Promise.resolve({ use_interactive_pip: false }),
  userSettingsGetLocale: () => Promise.resolve({ locale: "" }),
  openExternalLink: () => Promise.resolve({ opened: false }),
  encourageHardwareAcceleration: () => Promise.resolve({ enabled: true }),
  captureLog: () => Promise.resolve(null),
  setOrientationLockState: () => Promise.resolve(null),
  openInviteDialog: () => Promise.resolve(null),
  getPlatformBehaviors: () => Promise.resolve({
    iosKeyboardResizesView: true
  }),
  getChannelPermissions: () => Promise.resolve({ permissions: (0, import_big_integer2.default)(1234567890) }),
  openShareMomentDialog: () => Promise.resolve(null),
  shareLink: () => Promise.resolve({ success: false }),
  initiateImageUpload: () => Promise.resolve({
    image_url: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b52aa9e99b832574a53_full_logo_blurple_RGB.png"
  }),
  getInstanceConnectedParticipants: () => Promise.resolve({ participants: [] })
};

// src/utils/url.ts
var PROXY_PREFIX = "/.proxy";
var SUBSTITUTION_REGEX = /\{([a-z]+)\}/g;
function regexFromTarget(target) {
  const regexString = target.replace(SUBSTITUTION_REGEX, (match, name) => `(?<${name}>[\\w-]+)`);
  return new RegExp(`${regexString}(/|$)`);
}
function matchAndRewriteURL({ originalURL, prefix, prefixHost, target }) {
  const targetURL = new URL(`https://${target}`);
  const targetRegEx = regexFromTarget(targetURL.host.replace(/%7B/g, "{").replace(/%7D/g, "}"));
  const match = originalURL.toString().match(targetRegEx);
  if (match == null) return originalURL;
  const newURL = new URL(originalURL.toString());
  newURL.host = prefixHost;
  newURL.pathname = prefix.replace(SUBSTITUTION_REGEX, (_, matchName) => {
    const replaceValue = match.groups?.[matchName];
    if (replaceValue == null) throw new Error("Misconfigured route.");
    return replaceValue;
  });
  newURL.pathname += newURL.pathname === "/" ? originalURL.pathname.slice(1) : originalURL.pathname;
  if ((newURL.hostname.includes("discordsays.com") || newURL.hostname.includes("discordsez.com")) && !newURL.pathname.startsWith(PROXY_PREFIX)) {
    newURL.pathname = PROXY_PREFIX + newURL.pathname;
  }
  newURL.pathname = newURL.pathname.replace(targetURL.pathname, "");
  if (originalURL.pathname.endsWith("/") && !newURL.pathname.endsWith("/")) {
    newURL.pathname += "/";
  }
  return newURL;
}
function absoluteURL(url, protocol = window.location.protocol, host = window.location.host) {
  return new URL(url, `${protocol}//${host}`);
}

// src/utils/patchUrlMappings.ts
function patchUrlMappings(mappings, { patchFetch = true, patchWebSocket = true, patchXhr = true, patchSrcAttributes = false } = {}) {
  if (typeof window === "undefined") return;
  if (patchFetch) {
    const fetchImpl = window.fetch;
    window.fetch = function(input, init) {
      if (input instanceof Request) {
        const newUrl = attemptRemap({ url: absoluteURL(input.url), mappings });
        const { url, ...newInit } = init ?? {};
        Object.keys(Request.prototype).forEach((value) => {
          if (value === "url") return;
          try {
            newInit[value] = input[value];
          } catch (ex) {
            console.warn(`Remapping fetch request key "${value}" failed`, ex);
          }
        });
        return new Promise((resolve, reject) => {
          try {
            input.blob().then((blob) => {
              if (input.method.toUpperCase() !== "HEAD" && input.method.toUpperCase() !== "GET" && blob.size > 0) {
                newInit.body = blob;
              }
              resolve(fetchImpl(new Request(newUrl, newInit)));
            });
          } catch (ex) {
            reject(ex);
          }
        });
      }
      const remapped = attemptRemap({ url: input instanceof URL ? input : absoluteURL(input), mappings });
      return fetchImpl(remapped, init);
    };
  }
  if (patchWebSocket) {
    class WebSocketProxy extends WebSocket {
      constructor(url, protocols) {
        const remapped = attemptRemap({ url: url instanceof URL ? url : absoluteURL(url), mappings });
        super(remapped, protocols);
      }
    }
    window.WebSocket = WebSocketProxy;
  }
  if (patchXhr) {
    const openImpl = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      const remapped = attemptRemap({ url: absoluteURL(url), mappings });
      openImpl.apply(this, [method, remapped, async, username, password]);
    };
  }
  if (patchSrcAttributes) {
    const callback = function(mutationsList) {
      for (const mutation of mutationsList) {
        if (mutation.type === "attributes" && mutation.attributeName === "src") {
          attemptSetNodeSrc(mutation.target, mappings);
        } else if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            attemptSetNodeSrc(node, mappings);
            recursivelyRemapChildNodes(node, mappings);
          });
        }
      }
    };
    const observer = new MutationObserver(callback);
    const config = {
      attributeFilter: ["src"],
      childList: true,
      subtree: true
    };
    observer.observe(window.document, config);
    window.document.querySelectorAll("[src]").forEach((node) => {
      attemptSetNodeSrc(node, mappings);
    });
  }
}
function recursivelyRemapChildNodes(node, mappings) {
  if (node.hasChildNodes()) {
    node.childNodes.forEach((child) => {
      attemptSetNodeSrc(child, mappings);
      recursivelyRemapChildNodes(child, mappings);
    });
  }
}
function attemptSetNodeSrc(node, mappings) {
  if (node instanceof HTMLElement && node.hasAttribute("src")) {
    const rawSrc = node.getAttribute("src");
    const url = absoluteURL(rawSrc ?? "");
    if (url.host === window.location.host) return;
    if (node.tagName.toLowerCase() === "script") {
      attemptRecreateScriptNode(node, { url, mappings });
    } else {
      const newSrc = attemptRemap({ url, mappings }).toString();
      if (newSrc !== rawSrc) {
        node.setAttribute("src", newSrc);
      }
    }
  }
}
function attemptRecreateScriptNode(node, { url, mappings }) {
  const newUrl = attemptRemap({ url, mappings });
  if (url.toString() !== newUrl.toString()) {
    const newNode = document.createElement(node.tagName);
    newNode.innerHTML = node.innerHTML;
    for (const attr of node.attributes) {
      newNode.setAttribute(attr.name, attr.value);
    }
    newNode.setAttribute("src", attemptRemap({ url, mappings }).toString());
    node.after(newNode);
    node.remove();
  }
}
function attemptRemap({ url, mappings }) {
  const newURL = new URL(url.toString());
  if ((newURL.hostname.includes("discordsays.com") || newURL.hostname.includes("discordsez.com")) && // Only apply proxy prefix once
  !newURL.pathname.startsWith(PROXY_PREFIX)) {
    newURL.pathname = PROXY_PREFIX + newURL.pathname;
  }
  for (const mapping of mappings) {
    const mapped = matchAndRewriteURL({
      originalURL: newURL,
      prefix: mapping.prefix,
      target: mapping.target,
      prefixHost: window.location.host
    });
    if (mapped != null && mapped?.toString() !== url.toString()) {
      return mapped;
    }
  }
  return newURL;
}

// src/index.ts
var { Commands: Commands4 } = common_exports;
export {
  Commands4 as Commands,
  common_exports as Common,
  DiscordSDK,
  DiscordSDKMock,
  Events,
  Orientation,
  PermissionUtils_default as PermissionUtils,
  Permissions,
  Platform,
  PriceUtils_default as PriceUtils,
  RPCCloseCodes,
  RPCErrorCodes,
  responses_exports as Responses,
  attemptRemap,
  patchUrlMappings
};
/*! Bundled license information:

decimal.js-light/decimal.js:
  (*! decimal.js-light v2.5.1 https://github.com/MikeMcl/decimal.js-light/LICENCE *)
*/
