function Jp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var em = { exports: {} }, Zo = {}, tm = { exports: {} }, _e = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vi = Symbol.for("react.element"), Oy = Symbol.for("react.portal"), zy = Symbol.for("react.fragment"), Hy = Symbol.for("react.strict_mode"), Wy = Symbol.for("react.profiler"), Uy = Symbol.for("react.provider"), $y = Symbol.for("react.context"), Vy = Symbol.for("react.forward_ref"), Ky = Symbol.for("react.suspense"), Gy = Symbol.for("react.memo"), Qy = Symbol.for("react.lazy"), Xh = Symbol.iterator;
function Zy(e) {
  return e === null || typeof e != "object" ? null : (e = Xh && e[Xh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var nm = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, sm = Object.assign, lm = {};
function Kl(e, t, n) {
  this.props = e, this.context = t, this.refs = lm, this.updater = n || nm;
}
Kl.prototype.isReactComponent = {};
Kl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Kl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function im() {
}
im.prototype = Kl.prototype;
function Fu(e, t, n) {
  this.props = e, this.context = t, this.refs = lm, this.updater = n || nm;
}
var Ou = Fu.prototype = new im();
Ou.constructor = Fu;
sm(Ou, Kl.prototype);
Ou.isPureReactComponent = !0;
var Fh = Array.isArray, rm = Object.prototype.hasOwnProperty, zu = { current: null }, om = { key: !0, ref: !0, __self: !0, __source: !0 };
function am(e, t, n) {
  var s, l = {}, i = null, r = null;
  if (t != null) for (s in t.ref !== void 0 && (r = t.ref), t.key !== void 0 && (i = "" + t.key), t) rm.call(t, s) && !om.hasOwnProperty(s) && (l[s] = t[s]);
  var o = arguments.length - 2;
  if (o === 1) l.children = n;
  else if (1 < o) {
    for (var c = Array(o), u = 0; u < o; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in o = e.defaultProps, o) l[s] === void 0 && (l[s] = o[s]);
  return { $$typeof: Vi, type: e, key: i, ref: r, props: l, _owner: zu.current };
}
function qy(e, t) {
  return { $$typeof: Vi, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Hu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Vi;
}
function Jy(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Oh = /\/+/g;
function Fa(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Jy("" + e.key) : t.toString(36);
}
function eo(e, t, n, s, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var r = !1;
  if (e === null) r = !0;
  else switch (i) {
    case "string":
    case "number":
      r = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Vi:
        case Oy:
          r = !0;
      }
  }
  if (r) return r = e, l = l(r), e = s === "" ? "." + Fa(r, 0) : s, Fh(l) ? (n = "", e != null && (n = e.replace(Oh, "$&/") + "/"), eo(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Hu(l) && (l = qy(l, n + (!l.key || r && r.key === l.key ? "" : ("" + l.key).replace(Oh, "$&/") + "/") + e)), t.push(l)), 1;
  if (r = 0, s = s === "" ? "." : s + ":", Fh(e)) for (var o = 0; o < e.length; o++) {
    i = e[o];
    var c = s + Fa(i, o);
    r += eo(i, t, n, c, l);
  }
  else if (c = Zy(e), typeof c == "function") for (e = c.call(e), o = 0; !(i = e.next()).done; ) i = i.value, c = s + Fa(i, o++), r += eo(i, t, n, c, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return r;
}
function Ir(e, t, n) {
  if (e == null) return e;
  var s = [], l = 0;
  return eo(e, s, "", "", function(i) {
    return t.call(n, i, l++);
  }), s;
}
function ev(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Yt = { current: null }, to = { transition: null }, tv = { ReactCurrentDispatcher: Yt, ReactCurrentBatchConfig: to, ReactCurrentOwner: zu };
function cm() {
  throw Error("act(...) is not supported in production builds of React.");
}
_e.Children = { map: Ir, forEach: function(e, t, n) {
  Ir(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Ir(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Ir(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Hu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
_e.Component = Kl;
_e.Fragment = zy;
_e.Profiler = Wy;
_e.PureComponent = Fu;
_e.StrictMode = Hy;
_e.Suspense = Ky;
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tv;
_e.act = cm;
_e.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = sm({}, e.props), l = e.key, i = e.ref, r = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, r = zu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var o = e.type.defaultProps;
    for (c in t) rm.call(t, c) && !om.hasOwnProperty(c) && (s[c] = t[c] === void 0 && o !== void 0 ? o[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) s.children = n;
  else if (1 < c) {
    o = Array(c);
    for (var u = 0; u < c; u++) o[u] = arguments[u + 2];
    s.children = o;
  }
  return { $$typeof: Vi, type: e.type, key: l, ref: i, props: s, _owner: r };
};
_e.createContext = function(e) {
  return e = { $$typeof: $y, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Uy, _context: e }, e.Consumer = e;
};
_e.createElement = am;
_e.createFactory = function(e) {
  var t = am.bind(null, e);
  return t.type = e, t;
};
_e.createRef = function() {
  return { current: null };
};
_e.forwardRef = function(e) {
  return { $$typeof: Vy, render: e };
};
_e.isValidElement = Hu;
_e.lazy = function(e) {
  return { $$typeof: Qy, _payload: { _status: -1, _result: e }, _init: ev };
};
_e.memo = function(e, t) {
  return { $$typeof: Gy, type: e, compare: t === void 0 ? null : t };
};
_e.startTransition = function(e) {
  var t = to.transition;
  to.transition = {};
  try {
    e();
  } finally {
    to.transition = t;
  }
};
_e.unstable_act = cm;
_e.useCallback = function(e, t) {
  return Yt.current.useCallback(e, t);
};
_e.useContext = function(e) {
  return Yt.current.useContext(e);
};
_e.useDebugValue = function() {
};
_e.useDeferredValue = function(e) {
  return Yt.current.useDeferredValue(e);
};
_e.useEffect = function(e, t) {
  return Yt.current.useEffect(e, t);
};
_e.useId = function() {
  return Yt.current.useId();
};
_e.useImperativeHandle = function(e, t, n) {
  return Yt.current.useImperativeHandle(e, t, n);
};
_e.useInsertionEffect = function(e, t) {
  return Yt.current.useInsertionEffect(e, t);
};
_e.useLayoutEffect = function(e, t) {
  return Yt.current.useLayoutEffect(e, t);
};
_e.useMemo = function(e, t) {
  return Yt.current.useMemo(e, t);
};
_e.useReducer = function(e, t, n) {
  return Yt.current.useReducer(e, t, n);
};
_e.useRef = function(e) {
  return Yt.current.useRef(e);
};
_e.useState = function(e) {
  return Yt.current.useState(e);
};
_e.useSyncExternalStore = function(e, t, n) {
  return Yt.current.useSyncExternalStore(e, t, n);
};
_e.useTransition = function() {
  return Yt.current.useTransition();
};
_e.version = "18.3.1";
tm.exports = _e;
var T = tm.exports;
const Te = /* @__PURE__ */ Jp(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nv = T, sv = Symbol.for("react.element"), lv = Symbol.for("react.fragment"), iv = Object.prototype.hasOwnProperty, rv = nv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ov = { key: !0, ref: !0, __self: !0, __source: !0 };
function um(e, t, n) {
  var s, l = {}, i = null, r = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (r = t.ref);
  for (s in t) iv.call(t, s) && !ov.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: sv, type: e, key: i, ref: r, props: l, _owner: rv.current };
}
Zo.Fragment = lv;
Zo.jsx = um;
Zo.jsxs = um;
em.exports = Zo;
var a = em.exports, Bc = {}, dm = { exports: {} }, tn = {}, hm = { exports: {} }, fm = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(D, H) {
    var Q = D.length;
    D.push(H);
    e: for (; 0 < Q; ) {
      var le = Q - 1 >>> 1, ae = D[le];
      if (0 < l(ae, H)) D[le] = H, D[Q] = ae, Q = le;
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function s(D) {
    if (D.length === 0) return null;
    var H = D[0], Q = D.pop();
    if (Q !== H) {
      D[0] = Q;
      e: for (var le = 0, ae = D.length, xe = ae >>> 1; le < xe; ) {
        var O = 2 * (le + 1) - 1, ie = D[O], ye = O + 1, W = D[ye];
        if (0 > l(ie, Q)) ye < ae && 0 > l(W, ie) ? (D[le] = W, D[ye] = Q, le = ye) : (D[le] = ie, D[O] = Q, le = O);
        else if (ye < ae && 0 > l(W, Q)) D[le] = W, D[ye] = Q, le = ye;
        else break e;
      }
    }
    return H;
  }
  function l(D, H) {
    var Q = D.sortIndex - H.sortIndex;
    return Q !== 0 ? Q : D.id - H.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var r = Date, o = r.now();
    e.unstable_now = function() {
      return r.now() - o;
    };
  }
  var c = [], u = [], h = 1, p = null, d = 3, f = !1, m = !1, w = !1, M = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(D) {
    for (var H = n(u); H !== null; ) {
      if (H.callback === null) s(u);
      else if (H.startTime <= D) s(u), H.sortIndex = H.expirationTime, t(c, H);
      else break;
      H = n(u);
    }
  }
  function S(D) {
    if (w = !1, y(D), !m) if (n(c) !== null) m = !0, G(b);
    else {
      var H = n(u);
      H !== null && ne(S, H.startTime - D);
    }
  }
  function b(D, H) {
    m = !1, w && (w = !1, v(j), j = -1), f = !0;
    var Q = d;
    try {
      for (y(H), p = n(c); p !== null && (!(p.expirationTime > H) || D && !F()); ) {
        var le = p.callback;
        if (typeof le == "function") {
          p.callback = null, d = p.priorityLevel;
          var ae = le(p.expirationTime <= H);
          H = e.unstable_now(), typeof ae == "function" ? p.callback = ae : p === n(c) && s(c), y(H);
        } else s(c);
        p = n(c);
      }
      if (p !== null) var xe = !0;
      else {
        var O = n(u);
        O !== null && ne(S, O.startTime - H), xe = !1;
      }
      return xe;
    } finally {
      p = null, d = Q, f = !1;
    }
  }
  var _ = !1, C = null, j = -1, A = 5, L = -1;
  function F() {
    return !(e.unstable_now() - L < A);
  }
  function P() {
    if (C !== null) {
      var D = e.unstable_now();
      L = D;
      var H = !0;
      try {
        H = C(!0, D);
      } finally {
        H ? z() : (_ = !1, C = null);
      }
    } else _ = !1;
  }
  var z;
  if (typeof g == "function") z = function() {
    g(P);
  };
  else if (typeof MessageChannel < "u") {
    var Z = new MessageChannel(), oe = Z.port2;
    Z.port1.onmessage = P, z = function() {
      oe.postMessage(null);
    };
  } else z = function() {
    M(P, 0);
  };
  function G(D) {
    C = D, _ || (_ = !0, z());
  }
  function ne(D, H) {
    j = M(function() {
      D(e.unstable_now());
    }, H);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, e.unstable_continueExecution = function() {
    m || f || (m = !0, G(b));
  }, e.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < D ? Math.floor(1e3 / D) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(D) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var H = 3;
        break;
      default:
        H = d;
    }
    var Q = d;
    d = H;
    try {
      return D();
    } finally {
      d = Q;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(D, H) {
    switch (D) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        D = 3;
    }
    var Q = d;
    d = D;
    try {
      return H();
    } finally {
      d = Q;
    }
  }, e.unstable_scheduleCallback = function(D, H, Q) {
    var le = e.unstable_now();
    switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? le + Q : le) : Q = le, D) {
      case 1:
        var ae = -1;
        break;
      case 2:
        ae = 250;
        break;
      case 5:
        ae = 1073741823;
        break;
      case 4:
        ae = 1e4;
        break;
      default:
        ae = 5e3;
    }
    return ae = Q + ae, D = { id: h++, callback: H, priorityLevel: D, startTime: Q, expirationTime: ae, sortIndex: -1 }, Q > le ? (D.sortIndex = Q, t(u, D), n(c) === null && D === n(u) && (w ? (v(j), j = -1) : w = !0, ne(S, Q - le))) : (D.sortIndex = ae, t(c, D), m || f || (m = !0, G(b))), D;
  }, e.unstable_shouldYield = F, e.unstable_wrapCallback = function(D) {
    var H = d;
    return function() {
      var Q = d;
      d = H;
      try {
        return D.apply(this, arguments);
      } finally {
        d = Q;
      }
    };
  };
})(fm);
hm.exports = fm;
var av = hm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cv = T, en = av;
function U(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var pm = /* @__PURE__ */ new Set(), Ni = {};
function el(e, t) {
  Dl(e, t), Dl(e + "Capture", t);
}
function Dl(e, t) {
  for (Ni[e] = t, e = 0; e < t.length; e++) pm.add(t[e]);
}
var Kn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Dc = Object.prototype.hasOwnProperty, uv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, zh = {}, Hh = {};
function dv(e) {
  return Dc.call(Hh, e) ? !0 : Dc.call(zh, e) ? !1 : uv.test(e) ? Hh[e] = !0 : (zh[e] = !0, !1);
}
function hv(e, t, n, s) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return s ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function fv(e, t, n, s) {
  if (t === null || typeof t > "u" || hv(e, t, n, s)) return !0;
  if (s) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function Xt(e, t, n, s, l, i, r) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = s, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = r;
}
var Tt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  Tt[e] = new Xt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  Tt[t] = new Xt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  Tt[e] = new Xt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  Tt[e] = new Xt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  Tt[e] = new Xt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  Tt[e] = new Xt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  Tt[e] = new Xt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  Tt[e] = new Xt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  Tt[e] = new Xt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Wu = /[\-:]([a-z])/g;
function Uu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Wu,
    Uu
  );
  Tt[t] = new Xt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Wu, Uu);
  Tt[t] = new Xt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Wu, Uu);
  Tt[t] = new Xt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  Tt[e] = new Xt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Tt.xlinkHref = new Xt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  Tt[e] = new Xt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function $u(e, t, n, s) {
  var l = Tt.hasOwnProperty(t) ? Tt[t] : null;
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (fv(t, n, l, s) && (n = null), s || l === null ? dv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var Jn = cv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Er = Symbol.for("react.element"), xl = Symbol.for("react.portal"), yl = Symbol.for("react.fragment"), Vu = Symbol.for("react.strict_mode"), Yc = Symbol.for("react.profiler"), mm = Symbol.for("react.provider"), gm = Symbol.for("react.context"), Ku = Symbol.for("react.forward_ref"), Xc = Symbol.for("react.suspense"), Fc = Symbol.for("react.suspense_list"), Gu = Symbol.for("react.memo"), os = Symbol.for("react.lazy"), xm = Symbol.for("react.offscreen"), Wh = Symbol.iterator;
function ni(e) {
  return e === null || typeof e != "object" ? null : (e = Wh && e[Wh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var tt = Object.assign, Oa;
function pi(e) {
  if (Oa === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Oa = t && t[1] || "";
  }
  return `
` + Oa + e;
}
var za = !1;
function Ha(e, t) {
  if (!e || za) return "";
  za = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (u) {
        var s = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        s = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        s = u;
      }
      e();
    }
  } catch (u) {
    if (u && s && typeof u.stack == "string") {
      for (var l = u.stack.split(`
`), i = s.stack.split(`
`), r = l.length - 1, o = i.length - 1; 1 <= r && 0 <= o && l[r] !== i[o]; ) o--;
      for (; 1 <= r && 0 <= o; r--, o--) if (l[r] !== i[o]) {
        if (r !== 1 || o !== 1)
          do
            if (r--, o--, 0 > o || l[r] !== i[o]) {
              var c = `
` + l[r].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= r && 0 <= o);
        break;
      }
    }
  } finally {
    za = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? pi(e) : "";
}
function pv(e) {
  switch (e.tag) {
    case 5:
      return pi(e.type);
    case 16:
      return pi("Lazy");
    case 13:
      return pi("Suspense");
    case 19:
      return pi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ha(e.type, !1), e;
    case 11:
      return e = Ha(e.type.render, !1), e;
    case 1:
      return e = Ha(e.type, !0), e;
    default:
      return "";
  }
}
function Oc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case yl:
      return "Fragment";
    case xl:
      return "Portal";
    case Yc:
      return "Profiler";
    case Vu:
      return "StrictMode";
    case Xc:
      return "Suspense";
    case Fc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case gm:
      return (e.displayName || "Context") + ".Consumer";
    case mm:
      return (e._context.displayName || "Context") + ".Provider";
    case Ku:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Gu:
      return t = e.displayName || null, t !== null ? t : Oc(e.type) || "Memo";
    case os:
      t = e._payload, e = e._init;
      try {
        return Oc(e(t));
      } catch {
      }
  }
  return null;
}
function mv(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Oc(t);
    case 8:
      return t === Vu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function bs(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function ym(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function gv(e) {
  var t = ym(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(r) {
      s = "" + r, i.call(this, r);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return s;
    }, setValue: function(r) {
      s = "" + r;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Rr(e) {
  e._valueTracker || (e._valueTracker = gv(e));
}
function vm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = ym(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
}
function xo(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function zc(e, t) {
  var n = t.checked;
  return tt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Uh(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, s = t.checked != null ? t.checked : t.defaultChecked;
  n = bs(t.value != null ? t.value : n), e._wrapperState = { initialChecked: s, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function wm(e, t) {
  t = t.checked, t != null && $u(e, "checked", t, !1);
}
function Hc(e, t) {
  wm(e, t);
  var n = bs(t.value), s = t.type;
  if (n != null) s === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Wc(e, t.type, n) : t.hasOwnProperty("defaultValue") && Wc(e, t.type, bs(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function $h(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var s = t.type;
    if (!(s !== "submit" && s !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Wc(e, t, n) {
  (t !== "number" || xo(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var mi = Array.isArray;
function Pl(e, t, n, s) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && s && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + bs(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, s && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Uc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(U(91));
  return tt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Vh(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(U(92));
      if (mi(n)) {
        if (1 < n.length) throw Error(U(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: bs(n) };
}
function Sm(e, t) {
  var n = bs(t.value), s = bs(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function Kh(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Mm(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function $c(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Mm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ar, bm = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, s, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, s, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Ar = Ar || document.createElement("div"), Ar.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ar.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ii(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var vi = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, xv = ["Webkit", "ms", "Moz", "O"];
Object.keys(vi).forEach(function(e) {
  xv.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), vi[t] = vi[e];
  });
});
function _m(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || vi.hasOwnProperty(e) && vi[e] ? ("" + t).trim() : t + "px";
}
function Tm(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var s = n.indexOf("--") === 0, l = _m(n, t[n], s);
    n === "float" && (n = "cssFloat"), s ? e.setProperty(n, l) : e[n] = l;
  }
}
var yv = tt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Vc(e, t) {
  if (t) {
    if (yv[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(U(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(U(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(U(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(U(62));
  }
}
function Kc(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Gc = null;
function Qu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Qc = null, Nl = null, Il = null;
function Gh(e) {
  if (e = Qi(e)) {
    if (typeof Qc != "function") throw Error(U(280));
    var t = e.stateNode;
    t && (t = na(t), Qc(e.stateNode, e.type, t));
  }
}
function Cm(e) {
  Nl ? Il ? Il.push(e) : Il = [e] : Nl = e;
}
function km() {
  if (Nl) {
    var e = Nl, t = Il;
    if (Il = Nl = null, Gh(e), t) for (e = 0; e < t.length; e++) Gh(t[e]);
  }
}
function jm(e, t) {
  return e(t);
}
function Pm() {
}
var Wa = !1;
function Nm(e, t, n) {
  if (Wa) return e(t, n);
  Wa = !0;
  try {
    return jm(e, t, n);
  } finally {
    Wa = !1, (Nl !== null || Il !== null) && (Pm(), km());
  }
}
function Ei(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var s = na(n);
  if (s === null) return null;
  n = s[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (s = !s.disabled) || (e = e.type, s = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !s;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(U(231, t, typeof n));
  return n;
}
var Zc = !1;
if (Kn) try {
  var si = {};
  Object.defineProperty(si, "passive", { get: function() {
    Zc = !0;
  } }), window.addEventListener("test", si, si), window.removeEventListener("test", si, si);
} catch {
  Zc = !1;
}
function vv(e, t, n, s, l, i, r, o, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (h) {
    this.onError(h);
  }
}
var wi = !1, yo = null, vo = !1, qc = null, wv = { onError: function(e) {
  wi = !0, yo = e;
} };
function Sv(e, t, n, s, l, i, r, o, c) {
  wi = !1, yo = null, vv.apply(wv, arguments);
}
function Mv(e, t, n, s, l, i, r, o, c) {
  if (Sv.apply(this, arguments), wi) {
    if (wi) {
      var u = yo;
      wi = !1, yo = null;
    } else throw Error(U(198));
    vo || (vo = !0, qc = u);
  }
}
function tl(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Im(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Qh(e) {
  if (tl(e) !== e) throw Error(U(188));
}
function bv(e) {
  var t = e.alternate;
  if (!t) {
    if (t = tl(e), t === null) throw Error(U(188));
    return t !== e ? null : e;
  }
  for (var n = e, s = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (s = l.return, s !== null) {
        n = s;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return Qh(l), e;
        if (i === s) return Qh(l), t;
        i = i.sibling;
      }
      throw Error(U(188));
    }
    if (n.return !== s.return) n = l, s = i;
    else {
      for (var r = !1, o = l.child; o; ) {
        if (o === n) {
          r = !0, n = l, s = i;
          break;
        }
        if (o === s) {
          r = !0, s = l, n = i;
          break;
        }
        o = o.sibling;
      }
      if (!r) {
        for (o = i.child; o; ) {
          if (o === n) {
            r = !0, n = i, s = l;
            break;
          }
          if (o === s) {
            r = !0, s = i, n = l;
            break;
          }
          o = o.sibling;
        }
        if (!r) throw Error(U(189));
      }
    }
    if (n.alternate !== s) throw Error(U(190));
  }
  if (n.tag !== 3) throw Error(U(188));
  return n.stateNode.current === n ? e : t;
}
function Em(e) {
  return e = bv(e), e !== null ? Rm(e) : null;
}
function Rm(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Rm(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Am = en.unstable_scheduleCallback, Zh = en.unstable_cancelCallback, _v = en.unstable_shouldYield, Tv = en.unstable_requestPaint, it = en.unstable_now, Cv = en.unstable_getCurrentPriorityLevel, Zu = en.unstable_ImmediatePriority, Lm = en.unstable_UserBlockingPriority, wo = en.unstable_NormalPriority, kv = en.unstable_LowPriority, Bm = en.unstable_IdlePriority, qo = null, Dn = null;
function jv(e) {
  if (Dn && typeof Dn.onCommitFiberRoot == "function") try {
    Dn.onCommitFiberRoot(qo, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Pn = Math.clz32 ? Math.clz32 : Iv, Pv = Math.log, Nv = Math.LN2;
function Iv(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Pv(e) / Nv | 0) | 0;
}
var Lr = 64, Br = 4194304;
function gi(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function So(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var s = 0, l = e.suspendedLanes, i = e.pingedLanes, r = n & 268435455;
  if (r !== 0) {
    var o = r & ~l;
    o !== 0 ? s = gi(o) : (i &= r, i !== 0 && (s = gi(i)));
  } else r = n & ~l, r !== 0 ? s = gi(r) : i !== 0 && (s = gi(i));
  if (s === 0) return 0;
  if (t !== 0 && t !== s && !(t & l) && (l = s & -s, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (s & 4 && (s |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= s; 0 < t; ) n = 31 - Pn(t), l = 1 << n, s |= e[n], t &= ~l;
  return s;
}
function Ev(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Rv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var r = 31 - Pn(i), o = 1 << r, c = l[r];
    c === -1 ? (!(o & n) || o & s) && (l[r] = Ev(o, t)) : c <= t && (e.expiredLanes |= o), i &= ~o;
  }
}
function Jc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Dm() {
  var e = Lr;
  return Lr <<= 1, !(Lr & 4194240) && (Lr = 64), e;
}
function Ua(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ki(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Pn(t), e[t] = n;
}
function Av(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Pn(n), i = 1 << l;
    t[l] = 0, s[l] = -1, e[l] = -1, n &= ~i;
  }
}
function qu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var s = 31 - Pn(n), l = 1 << s;
    l & t | e[s] & t && (e[s] |= t), n &= ~l;
  }
}
var De = 0;
function Ym(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Xm, Ju, Fm, Om, zm, eu = !1, Dr = [], ms = null, gs = null, xs = null, Ri = /* @__PURE__ */ new Map(), Ai = /* @__PURE__ */ new Map(), cs = [], Lv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function qh(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ms = null;
      break;
    case "dragenter":
    case "dragleave":
      gs = null;
      break;
    case "mouseover":
    case "mouseout":
      xs = null;
      break;
    case "pointerover":
    case "pointerout":
      Ri.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ai.delete(t.pointerId);
  }
}
function li(e, t, n, s, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: s, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Qi(t), t !== null && Ju(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Bv(e, t, n, s, l) {
  switch (t) {
    case "focusin":
      return ms = li(ms, e, t, n, s, l), !0;
    case "dragenter":
      return gs = li(gs, e, t, n, s, l), !0;
    case "mouseover":
      return xs = li(xs, e, t, n, s, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Ri.set(i, li(Ri.get(i) || null, e, t, n, s, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Ai.set(i, li(Ai.get(i) || null, e, t, n, s, l)), !0;
  }
  return !1;
}
function Hm(e) {
  var t = Xs(e.target);
  if (t !== null) {
    var n = tl(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Im(n), t !== null) {
          e.blockedOn = t, zm(e.priority, function() {
            Fm(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function no(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = tu(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var s = new n.constructor(n.type, n);
      Gc = s, n.target.dispatchEvent(s), Gc = null;
    } else return t = Qi(n), t !== null && Ju(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Jh(e, t, n) {
  no(e) && n.delete(t);
}
function Dv() {
  eu = !1, ms !== null && no(ms) && (ms = null), gs !== null && no(gs) && (gs = null), xs !== null && no(xs) && (xs = null), Ri.forEach(Jh), Ai.forEach(Jh);
}
function ii(e, t) {
  e.blockedOn === t && (e.blockedOn = null, eu || (eu = !0, en.unstable_scheduleCallback(en.unstable_NormalPriority, Dv)));
}
function Li(e) {
  function t(l) {
    return ii(l, e);
  }
  if (0 < Dr.length) {
    ii(Dr[0], e);
    for (var n = 1; n < Dr.length; n++) {
      var s = Dr[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (ms !== null && ii(ms, e), gs !== null && ii(gs, e), xs !== null && ii(xs, e), Ri.forEach(t), Ai.forEach(t), n = 0; n < cs.length; n++) s = cs[n], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < cs.length && (n = cs[0], n.blockedOn === null); ) Hm(n), n.blockedOn === null && cs.shift();
}
var El = Jn.ReactCurrentBatchConfig, Mo = !0;
function Yv(e, t, n, s) {
  var l = De, i = El.transition;
  El.transition = null;
  try {
    De = 1, ed(e, t, n, s);
  } finally {
    De = l, El.transition = i;
  }
}
function Xv(e, t, n, s) {
  var l = De, i = El.transition;
  El.transition = null;
  try {
    De = 4, ed(e, t, n, s);
  } finally {
    De = l, El.transition = i;
  }
}
function ed(e, t, n, s) {
  if (Mo) {
    var l = tu(e, t, n, s);
    if (l === null) tc(e, t, s, bo, n), qh(e, s);
    else if (Bv(l, e, t, n, s)) s.stopPropagation();
    else if (qh(e, s), t & 4 && -1 < Lv.indexOf(e)) {
      for (; l !== null; ) {
        var i = Qi(l);
        if (i !== null && Xm(i), i = tu(e, t, n, s), i === null && tc(e, t, s, bo, n), i === l) break;
        l = i;
      }
      l !== null && s.stopPropagation();
    } else tc(e, t, s, null, n);
  }
}
var bo = null;
function tu(e, t, n, s) {
  if (bo = null, e = Qu(s), e = Xs(e), e !== null) if (t = tl(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Im(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return bo = e, null;
}
function Wm(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Cv()) {
        case Zu:
          return 1;
        case Lm:
          return 4;
        case wo:
        case kv:
          return 16;
        case Bm:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var fs = null, td = null, so = null;
function Um() {
  if (so) return so;
  var e, t = td, n = t.length, s, l = "value" in fs ? fs.value : fs.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var r = n - e;
  for (s = 1; s <= r && t[n - s] === l[i - s]; s++) ;
  return so = l.slice(e, 1 < s ? 1 - s : void 0);
}
function lo(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Yr() {
  return !0;
}
function ef() {
  return !1;
}
function nn(e) {
  function t(n, s, l, i, r) {
    this._reactName = n, this._targetInst = l, this.type = s, this.nativeEvent = i, this.target = r, this.currentTarget = null;
    for (var o in e) e.hasOwnProperty(o) && (n = e[o], this[o] = n ? n(i) : i[o]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Yr : ef, this.isPropagationStopped = ef, this;
  }
  return tt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Yr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Yr);
  }, persist: function() {
  }, isPersistent: Yr }), t;
}
var Gl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, nd = nn(Gl), Gi = tt({}, Gl, { view: 0, detail: 0 }), Fv = nn(Gi), $a, Va, ri, Jo = tt({}, Gi, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sd, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ri && (ri && e.type === "mousemove" ? ($a = e.screenX - ri.screenX, Va = e.screenY - ri.screenY) : Va = $a = 0, ri = e), $a);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Va;
} }), tf = nn(Jo), Ov = tt({}, Jo, { dataTransfer: 0 }), zv = nn(Ov), Hv = tt({}, Gi, { relatedTarget: 0 }), Ka = nn(Hv), Wv = tt({}, Gl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Uv = nn(Wv), $v = tt({}, Gl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Vv = nn($v), Kv = tt({}, Gl, { data: 0 }), nf = nn(Kv), Gv = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Qv = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Zv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function qv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Zv[e]) ? !!t[e] : !1;
}
function sd() {
  return qv;
}
var Jv = tt({}, Gi, { key: function(e) {
  if (e.key) {
    var t = Gv[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = lo(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Qv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sd, charCode: function(e) {
  return e.type === "keypress" ? lo(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? lo(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), e0 = nn(Jv), t0 = tt({}, Jo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), sf = nn(t0), n0 = tt({}, Gi, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sd }), s0 = nn(n0), l0 = tt({}, Gl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), i0 = nn(l0), r0 = tt({}, Jo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), o0 = nn(r0), a0 = [9, 13, 27, 32], ld = Kn && "CompositionEvent" in window, Si = null;
Kn && "documentMode" in document && (Si = document.documentMode);
var c0 = Kn && "TextEvent" in window && !Si, $m = Kn && (!ld || Si && 8 < Si && 11 >= Si), lf = " ", rf = !1;
function Vm(e, t) {
  switch (e) {
    case "keyup":
      return a0.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Km(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var vl = !1;
function u0(e, t) {
  switch (e) {
    case "compositionend":
      return Km(t);
    case "keypress":
      return t.which !== 32 ? null : (rf = !0, lf);
    case "textInput":
      return e = t.data, e === lf && rf ? null : e;
    default:
      return null;
  }
}
function d0(e, t) {
  if (vl) return e === "compositionend" || !ld && Vm(e, t) ? (e = Um(), so = td = fs = null, vl = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return $m && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var h0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function of(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!h0[e.type] : t === "textarea";
}
function Gm(e, t, n, s) {
  Cm(s), t = _o(t, "onChange"), 0 < t.length && (n = new nd("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var Mi = null, Bi = null;
function f0(e) {
  rg(e, 0);
}
function ea(e) {
  var t = Ml(e);
  if (vm(t)) return e;
}
function p0(e, t) {
  if (e === "change") return t;
}
var Qm = !1;
if (Kn) {
  var Ga;
  if (Kn) {
    var Qa = "oninput" in document;
    if (!Qa) {
      var af = document.createElement("div");
      af.setAttribute("oninput", "return;"), Qa = typeof af.oninput == "function";
    }
    Ga = Qa;
  } else Ga = !1;
  Qm = Ga && (!document.documentMode || 9 < document.documentMode);
}
function cf() {
  Mi && (Mi.detachEvent("onpropertychange", Zm), Bi = Mi = null);
}
function Zm(e) {
  if (e.propertyName === "value" && ea(Bi)) {
    var t = [];
    Gm(t, Bi, e, Qu(e)), Nm(f0, t);
  }
}
function m0(e, t, n) {
  e === "focusin" ? (cf(), Mi = t, Bi = n, Mi.attachEvent("onpropertychange", Zm)) : e === "focusout" && cf();
}
function g0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return ea(Bi);
}
function x0(e, t) {
  if (e === "click") return ea(t);
}
function y0(e, t) {
  if (e === "input" || e === "change") return ea(t);
}
function v0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var In = typeof Object.is == "function" ? Object.is : v0;
function Di(e, t) {
  if (In(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), s = Object.keys(t);
  if (n.length !== s.length) return !1;
  for (s = 0; s < n.length; s++) {
    var l = n[s];
    if (!Dc.call(t, l) || !In(e[l], t[l])) return !1;
  }
  return !0;
}
function uf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function df(e, t) {
  var n = uf(e);
  e = 0;
  for (var s; n; ) {
    if (n.nodeType === 3) {
      if (s = e + n.textContent.length, e <= t && s >= t) return { node: n, offset: t - e };
      e = s;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = uf(n);
  }
}
function qm(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Jm() {
  for (var e = window, t = xo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = xo(e.document);
  }
  return t;
}
function id(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function w0(e) {
  var t = Jm(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && qm(n.ownerDocument.documentElement, n)) {
    if (s !== null && id(n)) {
      if (t = s.start, e = s.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(s.start, l);
        s = s.end === void 0 ? i : Math.min(s.end, l), !e.extend && i > s && (l = s, s = i, i = l), l = df(n, i);
        var r = df(
          n,
          s
        );
        l && r && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== r.node || e.focusOffset !== r.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > s ? (e.addRange(t), e.extend(r.node, r.offset)) : (t.setEnd(r.node, r.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var S0 = Kn && "documentMode" in document && 11 >= document.documentMode, wl = null, nu = null, bi = null, su = !1;
function hf(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  su || wl == null || wl !== xo(s) || (s = wl, "selectionStart" in s && id(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), bi && Di(bi, s) || (bi = s, s = _o(nu, "onSelect"), 0 < s.length && (t = new nd("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = wl)));
}
function Xr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Sl = { animationend: Xr("Animation", "AnimationEnd"), animationiteration: Xr("Animation", "AnimationIteration"), animationstart: Xr("Animation", "AnimationStart"), transitionend: Xr("Transition", "TransitionEnd") }, Za = {}, eg = {};
Kn && (eg = document.createElement("div").style, "AnimationEvent" in window || (delete Sl.animationend.animation, delete Sl.animationiteration.animation, delete Sl.animationstart.animation), "TransitionEvent" in window || delete Sl.transitionend.transition);
function ta(e) {
  if (Za[e]) return Za[e];
  if (!Sl[e]) return e;
  var t = Sl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in eg) return Za[e] = t[n];
  return e;
}
var tg = ta("animationend"), ng = ta("animationiteration"), sg = ta("animationstart"), lg = ta("transitionend"), ig = /* @__PURE__ */ new Map(), ff = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ts(e, t) {
  ig.set(e, t), el(t, [e]);
}
for (var qa = 0; qa < ff.length; qa++) {
  var Ja = ff[qa], M0 = Ja.toLowerCase(), b0 = Ja[0].toUpperCase() + Ja.slice(1);
  Ts(M0, "on" + b0);
}
Ts(tg, "onAnimationEnd");
Ts(ng, "onAnimationIteration");
Ts(sg, "onAnimationStart");
Ts("dblclick", "onDoubleClick");
Ts("focusin", "onFocus");
Ts("focusout", "onBlur");
Ts(lg, "onTransitionEnd");
Dl("onMouseEnter", ["mouseout", "mouseover"]);
Dl("onMouseLeave", ["mouseout", "mouseover"]);
Dl("onPointerEnter", ["pointerout", "pointerover"]);
Dl("onPointerLeave", ["pointerout", "pointerover"]);
el("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
el("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
el("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
el("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
el("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
el("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var xi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(xi));
function pf(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, Mv(s, t, void 0, e), e.currentTarget = null;
}
function rg(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var s = e[n], l = s.event;
    s = s.listeners;
    e: {
      var i = void 0;
      if (t) for (var r = s.length - 1; 0 <= r; r--) {
        var o = s[r], c = o.instance, u = o.currentTarget;
        if (o = o.listener, c !== i && l.isPropagationStopped()) break e;
        pf(l, o, u), i = c;
      }
      else for (r = 0; r < s.length; r++) {
        if (o = s[r], c = o.instance, u = o.currentTarget, o = o.listener, c !== i && l.isPropagationStopped()) break e;
        pf(l, o, u), i = c;
      }
    }
  }
  if (vo) throw e = qc, vo = !1, qc = null, e;
}
function Ve(e, t) {
  var n = t[au];
  n === void 0 && (n = t[au] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  n.has(s) || (og(t, e, 2, !1), n.add(s));
}
function ec(e, t, n) {
  var s = 0;
  t && (s |= 4), og(n, e, s, t);
}
var Fr = "_reactListening" + Math.random().toString(36).slice(2);
function Yi(e) {
  if (!e[Fr]) {
    e[Fr] = !0, pm.forEach(function(n) {
      n !== "selectionchange" && (_0.has(n) || ec(n, !1, e), ec(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Fr] || (t[Fr] = !0, ec("selectionchange", !1, t));
  }
}
function og(e, t, n, s) {
  switch (Wm(t)) {
    case 1:
      var l = Yv;
      break;
    case 4:
      l = Xv;
      break;
    default:
      l = ed;
  }
  n = l.bind(null, t, n, e), l = void 0, !Zc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), s ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function tc(e, t, n, s, l) {
  var i = s;
  if (!(t & 1) && !(t & 2) && s !== null) e: for (; ; ) {
    if (s === null) return;
    var r = s.tag;
    if (r === 3 || r === 4) {
      var o = s.stateNode.containerInfo;
      if (o === l || o.nodeType === 8 && o.parentNode === l) break;
      if (r === 4) for (r = s.return; r !== null; ) {
        var c = r.tag;
        if ((c === 3 || c === 4) && (c = r.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        r = r.return;
      }
      for (; o !== null; ) {
        if (r = Xs(o), r === null) return;
        if (c = r.tag, c === 5 || c === 6) {
          s = i = r;
          continue e;
        }
        o = o.parentNode;
      }
    }
    s = s.return;
  }
  Nm(function() {
    var u = i, h = Qu(n), p = [];
    e: {
      var d = ig.get(e);
      if (d !== void 0) {
        var f = nd, m = e;
        switch (e) {
          case "keypress":
            if (lo(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = e0;
            break;
          case "focusin":
            m = "focus", f = Ka;
            break;
          case "focusout":
            m = "blur", f = Ka;
            break;
          case "beforeblur":
          case "afterblur":
            f = Ka;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            f = tf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            f = zv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = s0;
            break;
          case tg:
          case ng:
          case sg:
            f = Uv;
            break;
          case lg:
            f = i0;
            break;
          case "scroll":
            f = Fv;
            break;
          case "wheel":
            f = o0;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = Vv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            f = sf;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", v = w ? d !== null ? d + "Capture" : null : d;
        w = [];
        for (var g = u, y; g !== null; ) {
          y = g;
          var S = y.stateNode;
          if (y.tag === 5 && S !== null && (y = S, v !== null && (S = Ei(g, v), S != null && w.push(Xi(g, S, y)))), M) break;
          g = g.return;
        }
        0 < w.length && (d = new f(d, m, null, n, h), p.push({ event: d, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", d && n !== Gc && (m = n.relatedTarget || n.fromElement) && (Xs(m) || m[Gn])) break e;
        if ((f || d) && (d = h.window === h ? h : (d = h.ownerDocument) ? d.defaultView || d.parentWindow : window, f ? (m = n.relatedTarget || n.toElement, f = u, m = m ? Xs(m) : null, m !== null && (M = tl(m), m !== M || m.tag !== 5 && m.tag !== 6) && (m = null)) : (f = null, m = u), f !== m)) {
          if (w = tf, S = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (w = sf, S = "onPointerLeave", v = "onPointerEnter", g = "pointer"), M = f == null ? d : Ml(f), y = m == null ? d : Ml(m), d = new w(S, g + "leave", f, n, h), d.target = M, d.relatedTarget = y, S = null, Xs(h) === u && (w = new w(v, g + "enter", m, n, h), w.target = y, w.relatedTarget = M, S = w), M = S, f && m) t: {
            for (w = f, v = m, g = 0, y = w; y; y = hl(y)) g++;
            for (y = 0, S = v; S; S = hl(S)) y++;
            for (; 0 < g - y; ) w = hl(w), g--;
            for (; 0 < y - g; ) v = hl(v), y--;
            for (; g--; ) {
              if (w === v || v !== null && w === v.alternate) break t;
              w = hl(w), v = hl(v);
            }
            w = null;
          }
          else w = null;
          f !== null && mf(p, d, f, w, !1), m !== null && M !== null && mf(p, M, m, w, !0);
        }
      }
      e: {
        if (d = u ? Ml(u) : window, f = d.nodeName && d.nodeName.toLowerCase(), f === "select" || f === "input" && d.type === "file") var b = p0;
        else if (of(d)) if (Qm) b = y0;
        else {
          b = g0;
          var _ = m0;
        }
        else (f = d.nodeName) && f.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (b = x0);
        if (b && (b = b(e, u))) {
          Gm(p, b, n, h);
          break e;
        }
        _ && _(e, d, u), e === "focusout" && (_ = d._wrapperState) && _.controlled && d.type === "number" && Wc(d, "number", d.value);
      }
      switch (_ = u ? Ml(u) : window, e) {
        case "focusin":
          (of(_) || _.contentEditable === "true") && (wl = _, nu = u, bi = null);
          break;
        case "focusout":
          bi = nu = wl = null;
          break;
        case "mousedown":
          su = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          su = !1, hf(p, n, h);
          break;
        case "selectionchange":
          if (S0) break;
        case "keydown":
        case "keyup":
          hf(p, n, h);
      }
      var C;
      if (ld) e: {
        switch (e) {
          case "compositionstart":
            var j = "onCompositionStart";
            break e;
          case "compositionend":
            j = "onCompositionEnd";
            break e;
          case "compositionupdate":
            j = "onCompositionUpdate";
            break e;
        }
        j = void 0;
      }
      else vl ? Vm(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && ($m && n.locale !== "ko" && (vl || j !== "onCompositionStart" ? j === "onCompositionEnd" && vl && (C = Um()) : (fs = h, td = "value" in fs ? fs.value : fs.textContent, vl = !0)), _ = _o(u, j), 0 < _.length && (j = new nf(j, e, null, n, h), p.push({ event: j, listeners: _ }), C ? j.data = C : (C = Km(n), C !== null && (j.data = C)))), (C = c0 ? u0(e, n) : d0(e, n)) && (u = _o(u, "onBeforeInput"), 0 < u.length && (h = new nf("onBeforeInput", "beforeinput", null, n, h), p.push({ event: h, listeners: u }), h.data = C));
    }
    rg(p, t);
  });
}
function Xi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function _o(e, t) {
  for (var n = t + "Capture", s = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Ei(e, n), i != null && s.unshift(Xi(e, i, l)), i = Ei(e, t), i != null && s.push(Xi(e, i, l))), e = e.return;
  }
  return s;
}
function hl(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function mf(e, t, n, s, l) {
  for (var i = t._reactName, r = []; n !== null && n !== s; ) {
    var o = n, c = o.alternate, u = o.stateNode;
    if (c !== null && c === s) break;
    o.tag === 5 && u !== null && (o = u, l ? (c = Ei(n, i), c != null && r.unshift(Xi(n, c, o))) : l || (c = Ei(n, i), c != null && r.push(Xi(n, c, o)))), n = n.return;
  }
  r.length !== 0 && e.push({ event: t, listeners: r });
}
var T0 = /\r\n?/g, C0 = /\u0000|\uFFFD/g;
function gf(e) {
  return (typeof e == "string" ? e : "" + e).replace(T0, `
`).replace(C0, "");
}
function Or(e, t, n) {
  if (t = gf(t), gf(e) !== t && n) throw Error(U(425));
}
function To() {
}
var lu = null, iu = null;
function ru(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ou = typeof setTimeout == "function" ? setTimeout : void 0, k0 = typeof clearTimeout == "function" ? clearTimeout : void 0, xf = typeof Promise == "function" ? Promise : void 0, j0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof xf < "u" ? function(e) {
  return xf.resolve(null).then(e).catch(P0);
} : ou;
function P0(e) {
  setTimeout(function() {
    throw e;
  });
}
function nc(e, t) {
  var n = t, s = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (s === 0) {
        e.removeChild(l), Li(t);
        return;
      }
      s--;
    } else n !== "$" && n !== "$?" && n !== "$!" || s++;
    n = l;
  } while (n);
  Li(t);
}
function ys(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function yf(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Ql = Math.random().toString(36).slice(2), Bn = "__reactFiber$" + Ql, Fi = "__reactProps$" + Ql, Gn = "__reactContainer$" + Ql, au = "__reactEvents$" + Ql, N0 = "__reactListeners$" + Ql, I0 = "__reactHandles$" + Ql;
function Xs(e) {
  var t = e[Bn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Gn] || n[Bn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = yf(e); e !== null; ) {
        if (n = e[Bn]) return n;
        e = yf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Qi(e) {
  return e = e[Bn] || e[Gn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Ml(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(U(33));
}
function na(e) {
  return e[Fi] || null;
}
var cu = [], bl = -1;
function Cs(e) {
  return { current: e };
}
function Ke(e) {
  0 > bl || (e.current = cu[bl], cu[bl] = null, bl--);
}
function We(e, t) {
  bl++, cu[bl] = e.current, e.current = t;
}
var _s = {}, Et = Cs(_s), Ut = Cs(!1), $s = _s;
function Yl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _s;
  var s = e.stateNode;
  if (s && s.__reactInternalMemoizedUnmaskedChildContext === t) return s.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function $t(e) {
  return e = e.childContextTypes, e != null;
}
function Co() {
  Ke(Ut), Ke(Et);
}
function vf(e, t, n) {
  if (Et.current !== _s) throw Error(U(168));
  We(Et, t), We(Ut, n);
}
function ag(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(U(108, mv(e) || "Unknown", l));
  return tt({}, n, s);
}
function ko(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || _s, $s = Et.current, We(Et, e), We(Ut, Ut.current), !0;
}
function wf(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(U(169));
  n ? (e = ag(e, t, $s), s.__reactInternalMemoizedMergedChildContext = e, Ke(Ut), Ke(Et), We(Et, e)) : Ke(Ut), We(Ut, n);
}
var Hn = null, sa = !1, sc = !1;
function cg(e) {
  Hn === null ? Hn = [e] : Hn.push(e);
}
function E0(e) {
  sa = !0, cg(e);
}
function ks() {
  if (!sc && Hn !== null) {
    sc = !0;
    var e = 0, t = De;
    try {
      var n = Hn;
      for (De = 1; e < n.length; e++) {
        var s = n[e];
        do
          s = s(!0);
        while (s !== null);
      }
      Hn = null, sa = !1;
    } catch (l) {
      throw Hn !== null && (Hn = Hn.slice(e + 1)), Am(Zu, ks), l;
    } finally {
      De = t, sc = !1;
    }
  }
  return null;
}
var _l = [], Tl = 0, jo = null, Po = 0, hn = [], fn = 0, Vs = null, Wn = 1, Un = "";
function Bs(e, t) {
  _l[Tl++] = Po, _l[Tl++] = jo, jo = e, Po = t;
}
function ug(e, t, n) {
  hn[fn++] = Wn, hn[fn++] = Un, hn[fn++] = Vs, Vs = e;
  var s = Wn;
  e = Un;
  var l = 32 - Pn(s) - 1;
  s &= ~(1 << l), n += 1;
  var i = 32 - Pn(t) + l;
  if (30 < i) {
    var r = l - l % 5;
    i = (s & (1 << r) - 1).toString(32), s >>= r, l -= r, Wn = 1 << 32 - Pn(t) + l | n << l | s, Un = i + e;
  } else Wn = 1 << i | n << l | s, Un = e;
}
function rd(e) {
  e.return !== null && (Bs(e, 1), ug(e, 1, 0));
}
function od(e) {
  for (; e === jo; ) jo = _l[--Tl], _l[Tl] = null, Po = _l[--Tl], _l[Tl] = null;
  for (; e === Vs; ) Vs = hn[--fn], hn[fn] = null, Un = hn[--fn], hn[fn] = null, Wn = hn[--fn], hn[fn] = null;
}
var Jt = null, qt = null, qe = !1, jn = null;
function dg(e, t) {
  var n = mn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Sf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Jt = e, qt = ys(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Jt = e, qt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vs !== null ? { id: Wn, overflow: Un } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = mn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Jt = e, qt = null, !0) : !1;
    default:
      return !1;
  }
}
function uu(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function du(e) {
  if (qe) {
    var t = qt;
    if (t) {
      var n = t;
      if (!Sf(e, t)) {
        if (uu(e)) throw Error(U(418));
        t = ys(n.nextSibling);
        var s = Jt;
        t && Sf(e, t) ? dg(s, n) : (e.flags = e.flags & -4097 | 2, qe = !1, Jt = e);
      }
    } else {
      if (uu(e)) throw Error(U(418));
      e.flags = e.flags & -4097 | 2, qe = !1, Jt = e;
    }
  }
}
function Mf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Jt = e;
}
function zr(e) {
  if (e !== Jt) return !1;
  if (!qe) return Mf(e), qe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ru(e.type, e.memoizedProps)), t && (t = qt)) {
    if (uu(e)) throw hg(), Error(U(418));
    for (; t; ) dg(e, t), t = ys(t.nextSibling);
  }
  if (Mf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(U(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              qt = ys(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      qt = null;
    }
  } else qt = Jt ? ys(e.stateNode.nextSibling) : null;
  return !0;
}
function hg() {
  for (var e = qt; e; ) e = ys(e.nextSibling);
}
function Xl() {
  qt = Jt = null, qe = !1;
}
function ad(e) {
  jn === null ? jn = [e] : jn.push(e);
}
var R0 = Jn.ReactCurrentBatchConfig;
function oi(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(U(309));
        var s = n.stateNode;
      }
      if (!s) throw Error(U(147, e));
      var l = s, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(r) {
        var o = l.refs;
        r === null ? delete o[i] : o[i] = r;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(U(284));
    if (!n._owner) throw Error(U(290, e));
  }
  return e;
}
function Hr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(U(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function bf(e) {
  var t = e._init;
  return t(e._payload);
}
function fg(e) {
  function t(v, g) {
    if (e) {
      var y = v.deletions;
      y === null ? (v.deletions = [g], v.flags |= 16) : y.push(g);
    }
  }
  function n(v, g) {
    if (!e) return null;
    for (; g !== null; ) t(v, g), g = g.sibling;
    return null;
  }
  function s(v, g) {
    for (v = /* @__PURE__ */ new Map(); g !== null; ) g.key !== null ? v.set(g.key, g) : v.set(g.index, g), g = g.sibling;
    return v;
  }
  function l(v, g) {
    return v = Ms(v, g), v.index = 0, v.sibling = null, v;
  }
  function i(v, g, y) {
    return v.index = y, e ? (y = v.alternate, y !== null ? (y = y.index, y < g ? (v.flags |= 2, g) : y) : (v.flags |= 2, g)) : (v.flags |= 1048576, g);
  }
  function r(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function o(v, g, y, S) {
    return g === null || g.tag !== 6 ? (g = uc(y, v.mode, S), g.return = v, g) : (g = l(g, y), g.return = v, g);
  }
  function c(v, g, y, S) {
    var b = y.type;
    return b === yl ? h(v, g, y.props.children, S, y.key) : g !== null && (g.elementType === b || typeof b == "object" && b !== null && b.$$typeof === os && bf(b) === g.type) ? (S = l(g, y.props), S.ref = oi(v, g, y), S.return = v, S) : (S = ho(y.type, y.key, y.props, null, v.mode, S), S.ref = oi(v, g, y), S.return = v, S);
  }
  function u(v, g, y, S) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== y.containerInfo || g.stateNode.implementation !== y.implementation ? (g = dc(y, v.mode, S), g.return = v, g) : (g = l(g, y.children || []), g.return = v, g);
  }
  function h(v, g, y, S, b) {
    return g === null || g.tag !== 7 ? (g = Ws(y, v.mode, S, b), g.return = v, g) : (g = l(g, y), g.return = v, g);
  }
  function p(v, g, y) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = uc("" + g, v.mode, y), g.return = v, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Er:
          return y = ho(g.type, g.key, g.props, null, v.mode, y), y.ref = oi(v, null, g), y.return = v, y;
        case xl:
          return g = dc(g, v.mode, y), g.return = v, g;
        case os:
          var S = g._init;
          return p(v, S(g._payload), y);
      }
      if (mi(g) || ni(g)) return g = Ws(g, v.mode, y, null), g.return = v, g;
      Hr(v, g);
    }
    return null;
  }
  function d(v, g, y, S) {
    var b = g !== null ? g.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return b !== null ? null : o(v, g, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Er:
          return y.key === b ? c(v, g, y, S) : null;
        case xl:
          return y.key === b ? u(v, g, y, S) : null;
        case os:
          return b = y._init, d(
            v,
            g,
            b(y._payload),
            S
          );
      }
      if (mi(y) || ni(y)) return b !== null ? null : h(v, g, y, S, null);
      Hr(v, y);
    }
    return null;
  }
  function f(v, g, y, S, b) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return v = v.get(y) || null, o(g, v, "" + S, b);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Er:
          return v = v.get(S.key === null ? y : S.key) || null, c(g, v, S, b);
        case xl:
          return v = v.get(S.key === null ? y : S.key) || null, u(g, v, S, b);
        case os:
          var _ = S._init;
          return f(v, g, y, _(S._payload), b);
      }
      if (mi(S) || ni(S)) return v = v.get(y) || null, h(g, v, S, b, null);
      Hr(g, S);
    }
    return null;
  }
  function m(v, g, y, S) {
    for (var b = null, _ = null, C = g, j = g = 0, A = null; C !== null && j < y.length; j++) {
      C.index > j ? (A = C, C = null) : A = C.sibling;
      var L = d(v, C, y[j], S);
      if (L === null) {
        C === null && (C = A);
        break;
      }
      e && C && L.alternate === null && t(v, C), g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L, C = A;
    }
    if (j === y.length) return n(v, C), qe && Bs(v, j), b;
    if (C === null) {
      for (; j < y.length; j++) C = p(v, y[j], S), C !== null && (g = i(C, g, j), _ === null ? b = C : _.sibling = C, _ = C);
      return qe && Bs(v, j), b;
    }
    for (C = s(v, C); j < y.length; j++) A = f(C, v, j, y[j], S), A !== null && (e && A.alternate !== null && C.delete(A.key === null ? j : A.key), g = i(A, g, j), _ === null ? b = A : _.sibling = A, _ = A);
    return e && C.forEach(function(F) {
      return t(v, F);
    }), qe && Bs(v, j), b;
  }
  function w(v, g, y, S) {
    var b = ni(y);
    if (typeof b != "function") throw Error(U(150));
    if (y = b.call(y), y == null) throw Error(U(151));
    for (var _ = b = null, C = g, j = g = 0, A = null, L = y.next(); C !== null && !L.done; j++, L = y.next()) {
      C.index > j ? (A = C, C = null) : A = C.sibling;
      var F = d(v, C, L.value, S);
      if (F === null) {
        C === null && (C = A);
        break;
      }
      e && C && F.alternate === null && t(v, C), g = i(F, g, j), _ === null ? b = F : _.sibling = F, _ = F, C = A;
    }
    if (L.done) return n(
      v,
      C
    ), qe && Bs(v, j), b;
    if (C === null) {
      for (; !L.done; j++, L = y.next()) L = p(v, L.value, S), L !== null && (g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L);
      return qe && Bs(v, j), b;
    }
    for (C = s(v, C); !L.done; j++, L = y.next()) L = f(C, v, j, L.value, S), L !== null && (e && L.alternate !== null && C.delete(L.key === null ? j : L.key), g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L);
    return e && C.forEach(function(P) {
      return t(v, P);
    }), qe && Bs(v, j), b;
  }
  function M(v, g, y, S) {
    if (typeof y == "object" && y !== null && y.type === yl && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Er:
          e: {
            for (var b = y.key, _ = g; _ !== null; ) {
              if (_.key === b) {
                if (b = y.type, b === yl) {
                  if (_.tag === 7) {
                    n(v, _.sibling), g = l(_, y.props.children), g.return = v, v = g;
                    break e;
                  }
                } else if (_.elementType === b || typeof b == "object" && b !== null && b.$$typeof === os && bf(b) === _.type) {
                  n(v, _.sibling), g = l(_, y.props), g.ref = oi(v, _, y), g.return = v, v = g;
                  break e;
                }
                n(v, _);
                break;
              } else t(v, _);
              _ = _.sibling;
            }
            y.type === yl ? (g = Ws(y.props.children, v.mode, S, y.key), g.return = v, v = g) : (S = ho(y.type, y.key, y.props, null, v.mode, S), S.ref = oi(v, g, y), S.return = v, v = S);
          }
          return r(v);
        case xl:
          e: {
            for (_ = y.key; g !== null; ) {
              if (g.key === _) if (g.tag === 4 && g.stateNode.containerInfo === y.containerInfo && g.stateNode.implementation === y.implementation) {
                n(v, g.sibling), g = l(g, y.children || []), g.return = v, v = g;
                break e;
              } else {
                n(v, g);
                break;
              }
              else t(v, g);
              g = g.sibling;
            }
            g = dc(y, v.mode, S), g.return = v, v = g;
          }
          return r(v);
        case os:
          return _ = y._init, M(v, g, _(y._payload), S);
      }
      if (mi(y)) return m(v, g, y, S);
      if (ni(y)) return w(v, g, y, S);
      Hr(v, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, g !== null && g.tag === 6 ? (n(v, g.sibling), g = l(g, y), g.return = v, v = g) : (n(v, g), g = uc(y, v.mode, S), g.return = v, v = g), r(v)) : n(v, g);
  }
  return M;
}
var Fl = fg(!0), pg = fg(!1), No = Cs(null), Io = null, Cl = null, cd = null;
function ud() {
  cd = Cl = Io = null;
}
function dd(e) {
  var t = No.current;
  Ke(No), e._currentValue = t;
}
function hu(e, t, n) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Rl(e, t) {
  Io = e, cd = Cl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (zt = !0), e.firstContext = null);
}
function vn(e) {
  var t = e._currentValue;
  if (cd !== e) if (e = { context: e, memoizedValue: t, next: null }, Cl === null) {
    if (Io === null) throw Error(U(308));
    Cl = e, Io.dependencies = { lanes: 0, firstContext: e };
  } else Cl = Cl.next = e;
  return t;
}
var Fs = null;
function hd(e) {
  Fs === null ? Fs = [e] : Fs.push(e);
}
function mg(e, t, n, s) {
  var l = t.interleaved;
  return l === null ? (n.next = n, hd(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Qn(e, s);
}
function Qn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var as = !1;
function fd(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function gg(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function $n(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vs(e, t, n) {
  var s = e.updateQueue;
  if (s === null) return null;
  if (s = s.shared, Ce & 2) {
    var l = s.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), s.pending = t, Qn(e, n);
  }
  return l = s.interleaved, l === null ? (t.next = t, hd(s)) : (t.next = l.next, l.next = t), s.interleaved = t, Qn(e, n);
}
function io(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, qu(e, n);
  }
}
function _f(e, t) {
  var n = e.updateQueue, s = e.alternate;
  if (s !== null && (s = s.updateQueue, n === s)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var r = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = r : i = i.next = r, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: s.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: s.shared, effects: s.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Eo(e, t, n, s) {
  var l = e.updateQueue;
  as = !1;
  var i = l.firstBaseUpdate, r = l.lastBaseUpdate, o = l.shared.pending;
  if (o !== null) {
    l.shared.pending = null;
    var c = o, u = c.next;
    c.next = null, r === null ? i = u : r.next = u, r = c;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, o = h.lastBaseUpdate, o !== r && (o === null ? h.firstBaseUpdate = u : o.next = u, h.lastBaseUpdate = c));
  }
  if (i !== null) {
    var p = l.baseState;
    r = 0, h = u = c = null, o = i;
    do {
      var d = o.lane, f = o.eventTime;
      if ((s & d) === d) {
        h !== null && (h = h.next = {
          eventTime: f,
          lane: 0,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null
        });
        e: {
          var m = e, w = o;
          switch (d = t, f = n, w.tag) {
            case 1:
              if (m = w.payload, typeof m == "function") {
                p = m.call(f, p, d);
                break e;
              }
              p = m;
              break e;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = w.payload, d = typeof m == "function" ? m.call(f, p, d) : m, d == null) break e;
              p = tt({}, p, d);
              break e;
            case 2:
              as = !0;
          }
        }
        o.callback !== null && o.lane !== 0 && (e.flags |= 64, d = l.effects, d === null ? l.effects = [o] : d.push(o));
      } else f = { eventTime: f, lane: d, tag: o.tag, payload: o.payload, callback: o.callback, next: null }, h === null ? (u = h = f, c = p) : h = h.next = f, r |= d;
      if (o = o.next, o === null) {
        if (o = l.shared.pending, o === null) break;
        d = o, o = d.next, d.next = null, l.lastBaseUpdate = d, l.shared.pending = null;
      }
    } while (!0);
    if (h === null && (c = p), l.baseState = c, l.firstBaseUpdate = u, l.lastBaseUpdate = h, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        r |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Gs |= r, e.lanes = r, e.memoizedState = p;
  }
}
function Tf(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var s = e[t], l = s.callback;
    if (l !== null) {
      if (s.callback = null, s = n, typeof l != "function") throw Error(U(191, l));
      l.call(s);
    }
  }
}
var Zi = {}, Yn = Cs(Zi), Oi = Cs(Zi), zi = Cs(Zi);
function Os(e) {
  if (e === Zi) throw Error(U(174));
  return e;
}
function pd(e, t) {
  switch (We(zi, t), We(Oi, e), We(Yn, Zi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : $c(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = $c(t, e);
  }
  Ke(Yn), We(Yn, t);
}
function Ol() {
  Ke(Yn), Ke(Oi), Ke(zi);
}
function xg(e) {
  Os(zi.current);
  var t = Os(Yn.current), n = $c(t, e.type);
  t !== n && (We(Oi, e), We(Yn, n));
}
function md(e) {
  Oi.current === e && (Ke(Yn), Ke(Oi));
}
var Je = Cs(0);
function Ro(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var lc = [];
function gd() {
  for (var e = 0; e < lc.length; e++) lc[e]._workInProgressVersionPrimary = null;
  lc.length = 0;
}
var ro = Jn.ReactCurrentDispatcher, ic = Jn.ReactCurrentBatchConfig, Ks = 0, et = null, pt = null, yt = null, Ao = !1, _i = !1, Hi = 0, A0 = 0;
function jt() {
  throw Error(U(321));
}
function xd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!In(e[n], t[n])) return !1;
  return !0;
}
function yd(e, t, n, s, l, i) {
  if (Ks = i, et = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ro.current = e === null || e.memoizedState === null ? Y0 : X0, e = n(s, l), _i) {
    i = 0;
    do {
      if (_i = !1, Hi = 0, 25 <= i) throw Error(U(301));
      i += 1, yt = pt = null, t.updateQueue = null, ro.current = F0, e = n(s, l);
    } while (_i);
  }
  if (ro.current = Lo, t = pt !== null && pt.next !== null, Ks = 0, yt = pt = et = null, Ao = !1, t) throw Error(U(300));
  return e;
}
function vd() {
  var e = Hi !== 0;
  return Hi = 0, e;
}
function Ln() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return yt === null ? et.memoizedState = yt = e : yt = yt.next = e, yt;
}
function wn() {
  if (pt === null) {
    var e = et.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = pt.next;
  var t = yt === null ? et.memoizedState : yt.next;
  if (t !== null) yt = t, pt = e;
  else {
    if (e === null) throw Error(U(310));
    pt = e, e = { memoizedState: pt.memoizedState, baseState: pt.baseState, baseQueue: pt.baseQueue, queue: pt.queue, next: null }, yt === null ? et.memoizedState = yt = e : yt = yt.next = e;
  }
  return yt;
}
function Wi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function rc(e) {
  var t = wn(), n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var s = pt, l = s.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var r = l.next;
      l.next = i.next, i.next = r;
    }
    s.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, s = s.baseState;
    var o = r = null, c = null, u = i;
    do {
      var h = u.lane;
      if ((Ks & h) === h) c !== null && (c = c.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), s = u.hasEagerState ? u.eagerState : e(s, u.action);
      else {
        var p = {
          lane: h,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        c === null ? (o = c = p, r = s) : c = c.next = p, et.lanes |= h, Gs |= h;
      }
      u = u.next;
    } while (u !== null && u !== i);
    c === null ? r = s : c.next = o, In(s, t.memoizedState) || (zt = !0), t.memoizedState = s, t.baseState = r, t.baseQueue = c, n.lastRenderedState = s;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, et.lanes |= i, Gs |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function oc(e) {
  var t = wn(), n = t.queue;
  if (n === null) throw Error(U(311));
  n.lastRenderedReducer = e;
  var s = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var r = l = l.next;
    do
      i = e(i, r.action), r = r.next;
    while (r !== l);
    In(i, t.memoizedState) || (zt = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, s];
}
function yg() {
}
function vg(e, t) {
  var n = et, s = wn(), l = t(), i = !In(s.memoizedState, l);
  if (i && (s.memoizedState = l, zt = !0), s = s.queue, wd(Mg.bind(null, n, s, e), [e]), s.getSnapshot !== t || i || yt !== null && yt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Ui(9, Sg.bind(null, n, s, l, t), void 0, null), vt === null) throw Error(U(349));
    Ks & 30 || wg(n, t, l);
  }
  return l;
}
function wg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = et.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, et.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Sg(e, t, n, s) {
  t.value = n, t.getSnapshot = s, bg(t) && _g(e);
}
function Mg(e, t, n) {
  return n(function() {
    bg(t) && _g(e);
  });
}
function bg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !In(e, n);
  } catch {
    return !0;
  }
}
function _g(e) {
  var t = Qn(e, 1);
  t !== null && Nn(t, e, 1, -1);
}
function Cf(e) {
  var t = Ln();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Wi, lastRenderedState: e }, t.queue = e, e = e.dispatch = D0.bind(null, et, e), [t.memoizedState, e];
}
function Ui(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = et.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, et.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function Tg() {
  return wn().memoizedState;
}
function oo(e, t, n, s) {
  var l = Ln();
  et.flags |= e, l.memoizedState = Ui(1 | t, n, void 0, s === void 0 ? null : s);
}
function la(e, t, n, s) {
  var l = wn();
  s = s === void 0 ? null : s;
  var i = void 0;
  if (pt !== null) {
    var r = pt.memoizedState;
    if (i = r.destroy, s !== null && xd(s, r.deps)) {
      l.memoizedState = Ui(t, n, i, s);
      return;
    }
  }
  et.flags |= e, l.memoizedState = Ui(1 | t, n, i, s);
}
function kf(e, t) {
  return oo(8390656, 8, e, t);
}
function wd(e, t) {
  return la(2048, 8, e, t);
}
function Cg(e, t) {
  return la(4, 2, e, t);
}
function kg(e, t) {
  return la(4, 4, e, t);
}
function jg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Pg(e, t, n) {
  return n = n != null ? n.concat([e]) : null, la(4, 4, jg.bind(null, t, e), n);
}
function Sd() {
}
function Ng(e, t) {
  var n = wn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && xd(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function Ig(e, t) {
  var n = wn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && xd(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Eg(e, t, n) {
  return Ks & 21 ? (In(n, t) || (n = Dm(), et.lanes |= n, Gs |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, zt = !0), e.memoizedState = n);
}
function L0(e, t) {
  var n = De;
  De = n !== 0 && 4 > n ? n : 4, e(!0);
  var s = ic.transition;
  ic.transition = {};
  try {
    e(!1), t();
  } finally {
    De = n, ic.transition = s;
  }
}
function Rg() {
  return wn().memoizedState;
}
function B0(e, t, n) {
  var s = Ss(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, Ag(e)) Lg(t, n);
  else if (n = mg(e, t, n, s), n !== null) {
    var l = Dt();
    Nn(n, e, s, l), Bg(n, t, s);
  }
}
function D0(e, t, n) {
  var s = Ss(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ag(e)) Lg(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var r = t.lastRenderedState, o = i(r, n);
      if (l.hasEagerState = !0, l.eagerState = o, In(o, r)) {
        var c = t.interleaved;
        c === null ? (l.next = l, hd(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = mg(e, t, l, s), n !== null && (l = Dt(), Nn(n, e, s, l), Bg(n, t, s));
  }
}
function Ag(e) {
  var t = e.alternate;
  return e === et || t !== null && t === et;
}
function Lg(e, t) {
  _i = Ao = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Bg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, qu(e, n);
  }
}
var Lo = { readContext: vn, useCallback: jt, useContext: jt, useEffect: jt, useImperativeHandle: jt, useInsertionEffect: jt, useLayoutEffect: jt, useMemo: jt, useReducer: jt, useRef: jt, useState: jt, useDebugValue: jt, useDeferredValue: jt, useTransition: jt, useMutableSource: jt, useSyncExternalStore: jt, useId: jt, unstable_isNewReconciler: !1 }, Y0 = { readContext: vn, useCallback: function(e, t) {
  return Ln().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: vn, useEffect: kf, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, oo(
    4194308,
    4,
    jg.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return oo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return oo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ln();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var s = Ln();
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = B0.bind(null, et, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = Ln();
  return e = { current: e }, t.memoizedState = e;
}, useState: Cf, useDebugValue: Sd, useDeferredValue: function(e) {
  return Ln().memoizedState = e;
}, useTransition: function() {
  var e = Cf(!1), t = e[0];
  return e = L0.bind(null, e[1]), Ln().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = et, l = Ln();
  if (qe) {
    if (n === void 0) throw Error(U(407));
    n = n();
  } else {
    if (n = t(), vt === null) throw Error(U(349));
    Ks & 30 || wg(s, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, kf(Mg.bind(
    null,
    s,
    i,
    e
  ), [e]), s.flags |= 2048, Ui(9, Sg.bind(null, s, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ln(), t = vt.identifierPrefix;
  if (qe) {
    var n = Un, s = Wn;
    n = (s & ~(1 << 32 - Pn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Hi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = A0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, X0 = {
  readContext: vn,
  useCallback: Ng,
  useContext: vn,
  useEffect: wd,
  useImperativeHandle: Pg,
  useInsertionEffect: Cg,
  useLayoutEffect: kg,
  useMemo: Ig,
  useReducer: rc,
  useRef: Tg,
  useState: function() {
    return rc(Wi);
  },
  useDebugValue: Sd,
  useDeferredValue: function(e) {
    var t = wn();
    return Eg(t, pt.memoizedState, e);
  },
  useTransition: function() {
    var e = rc(Wi)[0], t = wn().memoizedState;
    return [e, t];
  },
  useMutableSource: yg,
  useSyncExternalStore: vg,
  useId: Rg,
  unstable_isNewReconciler: !1
}, F0 = { readContext: vn, useCallback: Ng, useContext: vn, useEffect: wd, useImperativeHandle: Pg, useInsertionEffect: Cg, useLayoutEffect: kg, useMemo: Ig, useReducer: oc, useRef: Tg, useState: function() {
  return oc(Wi);
}, useDebugValue: Sd, useDeferredValue: function(e) {
  var t = wn();
  return pt === null ? t.memoizedState = e : Eg(t, pt.memoizedState, e);
}, useTransition: function() {
  var e = oc(Wi)[0], t = wn().memoizedState;
  return [e, t];
}, useMutableSource: yg, useSyncExternalStore: vg, useId: Rg, unstable_isNewReconciler: !1 };
function Tn(e, t) {
  if (e && e.defaultProps) {
    t = tt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function fu(e, t, n, s) {
  t = e.memoizedState, n = n(s, t), n = n == null ? t : tt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ia = { isMounted: function(e) {
  return (e = e._reactInternals) ? tl(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var s = Dt(), l = Ss(e), i = $n(s, l);
  i.payload = t, n != null && (i.callback = n), t = vs(e, i, l), t !== null && (Nn(t, e, l, s), io(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var s = Dt(), l = Ss(e), i = $n(s, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vs(e, i, l), t !== null && (Nn(t, e, l, s), io(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Dt(), s = Ss(e), l = $n(n, s);
  l.tag = 2, t != null && (l.callback = t), t = vs(e, l, s), t !== null && (Nn(t, e, s, n), io(t, e, s));
} };
function jf(e, t, n, s, l, i, r) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, i, r) : t.prototype && t.prototype.isPureReactComponent ? !Di(n, s) || !Di(l, i) : !0;
}
function Dg(e, t, n) {
  var s = !1, l = _s, i = t.contextType;
  return typeof i == "object" && i !== null ? i = vn(i) : (l = $t(t) ? $s : Et.current, s = t.contextTypes, i = (s = s != null) ? Yl(e, l) : _s), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ia, e.stateNode = t, t._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Pf(e, t, n, s) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, s), t.state !== e && ia.enqueueReplaceState(t, t.state, null);
}
function pu(e, t, n, s) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, fd(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = vn(i) : (i = $t(t) ? $s : Et.current, l.context = Yl(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (fu(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && ia.enqueueReplaceState(l, l.state, null), Eo(e, n, l, s), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function zl(e, t) {
  try {
    var n = "", s = t;
    do
      n += pv(s), s = s.return;
    while (s);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function ac(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function mu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var O0 = typeof WeakMap == "function" ? WeakMap : Map;
function Yg(e, t, n) {
  n = $n(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    Do || (Do = !0, Tu = s), mu(e, t);
  }, n;
}
function Xg(e, t, n) {
  n = $n(-1, n), n.tag = 3;
  var s = e.type.getDerivedStateFromError;
  if (typeof s == "function") {
    var l = t.value;
    n.payload = function() {
      return s(l);
    }, n.callback = function() {
      mu(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    mu(e, t), typeof s != "function" && (ws === null ? ws = /* @__PURE__ */ new Set([this]) : ws.add(this));
    var r = t.stack;
    this.componentDidCatch(t.value, { componentStack: r !== null ? r : "" });
  }), n;
}
function Nf(e, t, n) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new O0();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = tw.bind(null, e, t, n), t.then(e, e));
}
function If(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ef(e, t, n, s, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = $n(-1, 1), t.tag = 2, vs(n, t, 1))), n.lanes |= 1), e);
}
var z0 = Jn.ReactCurrentOwner, zt = !1;
function Bt(e, t, n, s) {
  t.child = e === null ? pg(t, null, n, s) : Fl(t, e.child, n, s);
}
function Rf(e, t, n, s, l) {
  n = n.render;
  var i = t.ref;
  return Rl(t, l), s = yd(e, t, n, s, i, l), n = vd(), e !== null && !zt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zn(e, t, l)) : (qe && n && rd(t), t.flags |= 1, Bt(e, t, s, l), t.child);
}
function Af(e, t, n, s, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Pd(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Fg(e, t, i, s, l)) : (e = ho(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var r = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Di, n(r, s) && e.ref === t.ref) return Zn(e, t, l);
  }
  return t.flags |= 1, e = Ms(i, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Fg(e, t, n, s, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Di(i, s) && e.ref === t.ref) if (zt = !1, t.pendingProps = s = i, (e.lanes & l) !== 0) e.flags & 131072 && (zt = !0);
    else return t.lanes = e.lanes, Zn(e, t, l);
  }
  return gu(e, t, n, s, l);
}
function Og(e, t, n) {
  var s = t.pendingProps, l = s.children, i = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, We(jl, Qt), Qt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, We(jl, Qt), Qt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = i !== null ? i.baseLanes : n, We(jl, Qt), Qt |= s;
  }
  else i !== null ? (s = i.baseLanes | n, t.memoizedState = null) : s = n, We(jl, Qt), Qt |= s;
  return Bt(e, t, l, n), t.child;
}
function zg(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function gu(e, t, n, s, l) {
  var i = $t(n) ? $s : Et.current;
  return i = Yl(t, i), Rl(t, l), n = yd(e, t, n, s, i, l), s = vd(), e !== null && !zt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Zn(e, t, l)) : (qe && s && rd(t), t.flags |= 1, Bt(e, t, n, l), t.child);
}
function Lf(e, t, n, s, l) {
  if ($t(n)) {
    var i = !0;
    ko(t);
  } else i = !1;
  if (Rl(t, l), t.stateNode === null) ao(e, t), Dg(t, n, s), pu(t, n, s, l), s = !0;
  else if (e === null) {
    var r = t.stateNode, o = t.memoizedProps;
    r.props = o;
    var c = r.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = vn(u) : (u = $t(n) ? $s : Et.current, u = Yl(t, u));
    var h = n.getDerivedStateFromProps, p = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    p || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (o !== s || c !== u) && Pf(t, r, s, u), as = !1;
    var d = t.memoizedState;
    r.state = d, Eo(t, s, r, l), c = t.memoizedState, o !== s || d !== c || Ut.current || as ? (typeof h == "function" && (fu(t, n, h, s), c = t.memoizedState), (o = as || jf(t, n, o, s, d, c, u)) ? (p || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = c), r.props = s, r.state = c, r.context = u, s = o) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), s = !1);
  } else {
    r = t.stateNode, gg(e, t), o = t.memoizedProps, u = t.type === t.elementType ? o : Tn(t.type, o), r.props = u, p = t.pendingProps, d = r.context, c = n.contextType, typeof c == "object" && c !== null ? c = vn(c) : (c = $t(n) ? $s : Et.current, c = Yl(t, c));
    var f = n.getDerivedStateFromProps;
    (h = typeof f == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (o !== p || d !== c) && Pf(t, r, s, c), as = !1, d = t.memoizedState, r.state = d, Eo(t, s, r, l);
    var m = t.memoizedState;
    o !== p || d !== m || Ut.current || as ? (typeof f == "function" && (fu(t, n, f, s), m = t.memoizedState), (u = as || jf(t, n, u, s, d, m, c) || !1) ? (h || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(s, m, c), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(s, m, c)), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || o === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = m), r.props = s, r.state = m, r.context = c, s = u) : (typeof r.componentDidUpdate != "function" || o === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return xu(e, t, n, s, i, l);
}
function xu(e, t, n, s, l, i) {
  zg(e, t);
  var r = (t.flags & 128) !== 0;
  if (!s && !r) return l && wf(t, n, !1), Zn(e, t, i);
  s = t.stateNode, z0.current = t;
  var o = r && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && r ? (t.child = Fl(t, e.child, null, i), t.child = Fl(t, null, o, i)) : Bt(e, t, o, i), t.memoizedState = s.state, l && wf(t, n, !0), t.child;
}
function Hg(e) {
  var t = e.stateNode;
  t.pendingContext ? vf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && vf(e, t.context, !1), pd(e, t.containerInfo);
}
function Bf(e, t, n, s, l) {
  return Xl(), ad(l), t.flags |= 256, Bt(e, t, n, s), t.child;
}
var yu = { dehydrated: null, treeContext: null, retryLane: 0 };
function vu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Wg(e, t, n) {
  var s = t.pendingProps, l = Je.current, i = !1, r = (t.flags & 128) !== 0, o;
  if ((o = r) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), o ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), We(Je, l & 1), e === null)
    return du(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (r = s.children, e = s.fallback, i ? (s = t.mode, i = t.child, r = { mode: "hidden", children: r }, !(s & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = r) : i = aa(r, s, 0, null), e = Ws(e, s, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = vu(n), t.memoizedState = yu, e) : Md(t, r));
  if (l = e.memoizedState, l !== null && (o = l.dehydrated, o !== null)) return H0(e, t, r, s, o, l, n);
  if (i) {
    i = s.fallback, r = t.mode, l = e.child, o = l.sibling;
    var c = { mode: "hidden", children: s.children };
    return !(r & 1) && t.child !== l ? (s = t.child, s.childLanes = 0, s.pendingProps = c, t.deletions = null) : (s = Ms(l, c), s.subtreeFlags = l.subtreeFlags & 14680064), o !== null ? i = Ms(o, i) : (i = Ws(i, r, n, null), i.flags |= 2), i.return = t, s.return = t, s.sibling = i, t.child = s, s = i, i = t.child, r = e.child.memoizedState, r = r === null ? vu(n) : { baseLanes: r.baseLanes | n, cachePool: null, transitions: r.transitions }, i.memoizedState = r, i.childLanes = e.childLanes & ~n, t.memoizedState = yu, s;
  }
  return i = e.child, e = i.sibling, s = Ms(i, { mode: "visible", children: s.children }), !(t.mode & 1) && (s.lanes = n), s.return = t, s.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = s, t.memoizedState = null, s;
}
function Md(e, t) {
  return t = aa({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Wr(e, t, n, s) {
  return s !== null && ad(s), Fl(t, e.child, null, n), e = Md(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function H0(e, t, n, s, l, i, r) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, s = ac(Error(U(422))), Wr(e, t, r, s)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = s.fallback, l = t.mode, s = aa({ mode: "visible", children: s.children }, l, 0, null), i = Ws(i, l, r, null), i.flags |= 2, s.return = t, i.return = t, s.sibling = i, t.child = s, t.mode & 1 && Fl(t, e.child, null, r), t.child.memoizedState = vu(r), t.memoizedState = yu, i);
  if (!(t.mode & 1)) return Wr(e, t, r, null);
  if (l.data === "$!") {
    if (s = l.nextSibling && l.nextSibling.dataset, s) var o = s.dgst;
    return s = o, i = Error(U(419)), s = ac(i, s, void 0), Wr(e, t, r, s);
  }
  if (o = (r & e.childLanes) !== 0, zt || o) {
    if (s = vt, s !== null) {
      switch (r & -r) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (s.suspendedLanes | r) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Qn(e, l), Nn(s, e, l, -1));
    }
    return jd(), s = ac(Error(U(421))), Wr(e, t, r, s);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = nw.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, qt = ys(l.nextSibling), Jt = t, qe = !0, jn = null, e !== null && (hn[fn++] = Wn, hn[fn++] = Un, hn[fn++] = Vs, Wn = e.id, Un = e.overflow, Vs = t), t = Md(t, s.children), t.flags |= 4096, t);
}
function Df(e, t, n) {
  e.lanes |= t;
  var s = e.alternate;
  s !== null && (s.lanes |= t), hu(e.return, t, n);
}
function cc(e, t, n, s, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: s, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = s, i.tail = n, i.tailMode = l);
}
function Ug(e, t, n) {
  var s = t.pendingProps, l = s.revealOrder, i = s.tail;
  if (Bt(e, t, s.children, n), s = Je.current, s & 2) s = s & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Df(e, n, t);
      else if (e.tag === 19) Df(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    s &= 1;
  }
  if (We(Je, s), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Ro(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), cc(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Ro(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      cc(t, !0, n, null, i);
      break;
    case "together":
      cc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ao(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Zn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Gs |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(U(153));
  if (t.child !== null) {
    for (e = t.child, n = Ms(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ms(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function W0(e, t, n) {
  switch (t.tag) {
    case 3:
      Hg(t), Xl();
      break;
    case 5:
      xg(t);
      break;
    case 1:
      $t(t.type) && ko(t);
      break;
    case 4:
      pd(t, t.stateNode.containerInfo);
      break;
    case 10:
      var s = t.type._context, l = t.memoizedProps.value;
      We(No, s._currentValue), s._currentValue = l;
      break;
    case 13:
      if (s = t.memoizedState, s !== null)
        return s.dehydrated !== null ? (We(Je, Je.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Wg(e, t, n) : (We(Je, Je.current & 1), e = Zn(e, t, n), e !== null ? e.sibling : null);
      We(Je, Je.current & 1);
      break;
    case 19:
      if (s = (n & t.childLanes) !== 0, e.flags & 128) {
        if (s) return Ug(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), We(Je, Je.current), s) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Og(e, t, n);
  }
  return Zn(e, t, n);
}
var $g, wu, Vg, Kg;
$g = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
wu = function() {
};
Vg = function(e, t, n, s) {
  var l = e.memoizedProps;
  if (l !== s) {
    e = t.stateNode, Os(Yn.current);
    var i = null;
    switch (n) {
      case "input":
        l = zc(e, l), s = zc(e, s), i = [];
        break;
      case "select":
        l = tt({}, l, { value: void 0 }), s = tt({}, s, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Uc(e, l), s = Uc(e, s), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof s.onClick == "function" && (e.onclick = To);
    }
    Vc(n, s);
    var r;
    n = null;
    for (u in l) if (!s.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var o = l[u];
      for (r in o) o.hasOwnProperty(r) && (n || (n = {}), n[r] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Ni.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var c = s[u];
      if (o = l != null ? l[u] : void 0, s.hasOwnProperty(u) && c !== o && (c != null || o != null)) if (u === "style") if (o) {
        for (r in o) !o.hasOwnProperty(r) || c && c.hasOwnProperty(r) || (n || (n = {}), n[r] = "");
        for (r in c) c.hasOwnProperty(r) && o[r] !== c[r] && (n || (n = {}), n[r] = c[r]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = c;
      else u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, o = o ? o.__html : void 0, c != null && o !== c && (i = i || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (i = i || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Ni.hasOwnProperty(u) ? (c != null && u === "onScroll" && Ve("scroll", e), i || o === c || (i = [])) : (i = i || []).push(u, c));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Kg = function(e, t, n, s) {
  n !== s && (t.flags |= 4);
};
function ai(e, t) {
  if (!qe) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var s = null; n !== null; ) n.alternate !== null && (s = n), n = n.sibling;
      s === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : s.sibling = null;
  }
}
function Pt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, s = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags & 14680064, s |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags, s |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= s, e.childLanes = n, t;
}
function U0(e, t, n) {
  var s = t.pendingProps;
  switch (od(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Pt(t), null;
    case 1:
      return $t(t.type) && Co(), Pt(t), null;
    case 3:
      return s = t.stateNode, Ol(), Ke(Ut), Ke(Et), gd(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (zr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, jn !== null && (ju(jn), jn = null))), wu(e, t), Pt(t), null;
    case 5:
      md(t);
      var l = Os(zi.current);
      if (n = t.type, e !== null && t.stateNode != null) Vg(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!s) {
          if (t.stateNode === null) throw Error(U(166));
          return Pt(t), null;
        }
        if (e = Os(Yn.current), zr(t)) {
          s = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (s[Bn] = t, s[Fi] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              Ve("cancel", s), Ve("close", s);
              break;
            case "iframe":
            case "object":
            case "embed":
              Ve("load", s);
              break;
            case "video":
            case "audio":
              for (l = 0; l < xi.length; l++) Ve(xi[l], s);
              break;
            case "source":
              Ve("error", s);
              break;
            case "img":
            case "image":
            case "link":
              Ve(
                "error",
                s
              ), Ve("load", s);
              break;
            case "details":
              Ve("toggle", s);
              break;
            case "input":
              Uh(s, i), Ve("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!i.multiple }, Ve("invalid", s);
              break;
            case "textarea":
              Vh(s, i), Ve("invalid", s);
          }
          Vc(n, i), l = null;
          for (var r in i) if (i.hasOwnProperty(r)) {
            var o = i[r];
            r === "children" ? typeof o == "string" ? s.textContent !== o && (i.suppressHydrationWarning !== !0 && Or(s.textContent, o, e), l = ["children", o]) : typeof o == "number" && s.textContent !== "" + o && (i.suppressHydrationWarning !== !0 && Or(
              s.textContent,
              o,
              e
            ), l = ["children", "" + o]) : Ni.hasOwnProperty(r) && o != null && r === "onScroll" && Ve("scroll", s);
          }
          switch (n) {
            case "input":
              Rr(s), $h(s, i, !0);
              break;
            case "textarea":
              Rr(s), Kh(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (s.onclick = To);
          }
          s = l, t.updateQueue = s, s !== null && (t.flags |= 4);
        } else {
          r = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Mm(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = r.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = r.createElement(n, { is: s.is }) : (e = r.createElement(n), n === "select" && (r = e, s.multiple ? r.multiple = !0 : s.size && (r.size = s.size))) : e = r.createElementNS(e, n), e[Bn] = t, e[Fi] = s, $g(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (r = Kc(n, s), n) {
              case "dialog":
                Ve("cancel", e), Ve("close", e), l = s;
                break;
              case "iframe":
              case "object":
              case "embed":
                Ve("load", e), l = s;
                break;
              case "video":
              case "audio":
                for (l = 0; l < xi.length; l++) Ve(xi[l], e);
                l = s;
                break;
              case "source":
                Ve("error", e), l = s;
                break;
              case "img":
              case "image":
              case "link":
                Ve(
                  "error",
                  e
                ), Ve("load", e), l = s;
                break;
              case "details":
                Ve("toggle", e), l = s;
                break;
              case "input":
                Uh(e, s), l = zc(e, s), Ve("invalid", e);
                break;
              case "option":
                l = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, l = tt({}, s, { value: void 0 }), Ve("invalid", e);
                break;
              case "textarea":
                Vh(e, s), l = Uc(e, s), Ve("invalid", e);
                break;
              default:
                l = s;
            }
            Vc(n, l), o = l;
            for (i in o) if (o.hasOwnProperty(i)) {
              var c = o[i];
              i === "style" ? Tm(e, c) : i === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && bm(e, c)) : i === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Ii(e, c) : typeof c == "number" && Ii(e, "" + c) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Ni.hasOwnProperty(i) ? c != null && i === "onScroll" && Ve("scroll", e) : c != null && $u(e, i, c, r));
            }
            switch (n) {
              case "input":
                Rr(e), $h(e, s, !1);
                break;
              case "textarea":
                Rr(e), Kh(e);
                break;
              case "option":
                s.value != null && e.setAttribute("value", "" + bs(s.value));
                break;
              case "select":
                e.multiple = !!s.multiple, i = s.value, i != null ? Pl(e, !!s.multiple, i, !1) : s.defaultValue != null && Pl(
                  e,
                  !!s.multiple,
                  s.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = To);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                s = !!s.autoFocus;
                break e;
              case "img":
                s = !0;
                break e;
              default:
                s = !1;
            }
          }
          s && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return Pt(t), null;
    case 6:
      if (e && t.stateNode != null) Kg(e, t, e.memoizedProps, s);
      else {
        if (typeof s != "string" && t.stateNode === null) throw Error(U(166));
        if (n = Os(zi.current), Os(Yn.current), zr(t)) {
          if (s = t.stateNode, n = t.memoizedProps, s[Bn] = t, (i = s.nodeValue !== n) && (e = Jt, e !== null)) switch (e.tag) {
            case 3:
              Or(s.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Or(s.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else s = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(s), s[Bn] = t, t.stateNode = s;
      }
      return Pt(t), null;
    case 13:
      if (Ke(Je), s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (qe && qt !== null && t.mode & 1 && !(t.flags & 128)) hg(), Xl(), t.flags |= 98560, i = !1;
        else if (i = zr(t), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(U(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(U(317));
            i[Bn] = t;
          } else Xl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Pt(t), i = !1;
        } else jn !== null && (ju(jn), jn = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (t.child.flags |= 8192, t.mode & 1 && (e === null || Je.current & 1 ? mt === 0 && (mt = 3) : jd())), t.updateQueue !== null && (t.flags |= 4), Pt(t), null);
    case 4:
      return Ol(), wu(e, t), e === null && Yi(t.stateNode.containerInfo), Pt(t), null;
    case 10:
      return dd(t.type._context), Pt(t), null;
    case 17:
      return $t(t.type) && Co(), Pt(t), null;
    case 19:
      if (Ke(Je), i = t.memoizedState, i === null) return Pt(t), null;
      if (s = (t.flags & 128) !== 0, r = i.rendering, r === null) if (s) ai(i, !1);
      else {
        if (mt !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (r = Ro(e), r !== null) {
            for (t.flags |= 128, ai(i, !1), s = r.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), t.subtreeFlags = 0, s = n, n = t.child; n !== null; ) i = n, e = s, i.flags &= 14680066, r = i.alternate, r === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = r.childLanes, i.lanes = r.lanes, i.child = r.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = r.memoizedProps, i.memoizedState = r.memoizedState, i.updateQueue = r.updateQueue, i.type = r.type, e = r.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return We(Je, Je.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && it() > Hl && (t.flags |= 128, s = !0, ai(i, !1), t.lanes = 4194304);
      }
      else {
        if (!s) if (e = Ro(r), e !== null) {
          if (t.flags |= 128, s = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ai(i, !0), i.tail === null && i.tailMode === "hidden" && !r.alternate && !qe) return Pt(t), null;
        } else 2 * it() - i.renderingStartTime > Hl && n !== 1073741824 && (t.flags |= 128, s = !0, ai(i, !1), t.lanes = 4194304);
        i.isBackwards ? (r.sibling = t.child, t.child = r) : (n = i.last, n !== null ? n.sibling = r : t.child = r, i.last = r);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = it(), t.sibling = null, n = Je.current, We(Je, s ? n & 1 | 2 : n & 1), t) : (Pt(t), null);
    case 22:
    case 23:
      return kd(), s = t.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (t.flags |= 8192), s && t.mode & 1 ? Qt & 1073741824 && (Pt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Pt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(U(156, t.tag));
}
function $0(e, t) {
  switch (od(t), t.tag) {
    case 1:
      return $t(t.type) && Co(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Ol(), Ke(Ut), Ke(Et), gd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return md(t), null;
    case 13:
      if (Ke(Je), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(U(340));
        Xl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ke(Je), null;
    case 4:
      return Ol(), null;
    case 10:
      return dd(t.type._context), null;
    case 22:
    case 23:
      return kd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ur = !1, Nt = !1, V0 = typeof WeakSet == "function" ? WeakSet : Set, J = null;
function kl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (s) {
    st(e, t, s);
  }
  else n.current = null;
}
function Su(e, t, n) {
  try {
    n();
  } catch (s) {
    st(e, t, s);
  }
}
var Yf = !1;
function K0(e, t) {
  if (lu = Mo, e = Jm(), id(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var s = n.getSelection && n.getSelection();
      if (s && s.rangeCount !== 0) {
        n = s.anchorNode;
        var l = s.anchorOffset, i = s.focusNode;
        s = s.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var r = 0, o = -1, c = -1, u = 0, h = 0, p = e, d = null;
        t: for (; ; ) {
          for (var f; p !== n || l !== 0 && p.nodeType !== 3 || (o = r + l), p !== i || s !== 0 && p.nodeType !== 3 || (c = r + s), p.nodeType === 3 && (r += p.nodeValue.length), (f = p.firstChild) !== null; )
            d = p, p = f;
          for (; ; ) {
            if (p === e) break t;
            if (d === n && ++u === l && (o = r), d === i && ++h === s && (c = r), (f = p.nextSibling) !== null) break;
            p = d, d = p.parentNode;
          }
          p = f;
        }
        n = o === -1 || c === -1 ? null : { start: o, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (iu = { focusedElem: e, selectionRange: n }, Mo = !1, J = t; J !== null; ) if (t = J, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, J = e;
  else for (; J !== null; ) {
    t = J;
    try {
      var m = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (m !== null) {
            var w = m.memoizedProps, M = m.memoizedState, v = t.stateNode, g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Tn(t.type, w), M);
            v.__reactInternalSnapshotBeforeUpdate = g;
          }
          break;
        case 3:
          var y = t.stateNode.containerInfo;
          y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(U(163));
      }
    } catch (S) {
      st(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, J = e;
      break;
    }
    J = t.return;
  }
  return m = Yf, Yf = !1, m;
}
function Ti(e, t, n) {
  var s = t.updateQueue;
  if (s = s !== null ? s.lastEffect : null, s !== null) {
    var l = s = s.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Su(t, n, i);
      }
      l = l.next;
    } while (l !== s);
  }
}
function ra(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var s = n.create;
        n.destroy = s();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Mu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function Gg(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Gg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Bn], delete t[Fi], delete t[au], delete t[N0], delete t[I0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Qg(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Xf(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Qg(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function bu(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = To));
  else if (s !== 4 && (e = e.child, e !== null)) for (bu(e, t, n), e = e.sibling; e !== null; ) bu(e, t, n), e = e.sibling;
}
function _u(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null)) for (_u(e, t, n), e = e.sibling; e !== null; ) _u(e, t, n), e = e.sibling;
}
var St = null, Cn = !1;
function ss(e, t, n) {
  for (n = n.child; n !== null; ) Zg(e, t, n), n = n.sibling;
}
function Zg(e, t, n) {
  if (Dn && typeof Dn.onCommitFiberUnmount == "function") try {
    Dn.onCommitFiberUnmount(qo, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Nt || kl(n, t);
    case 6:
      var s = St, l = Cn;
      St = null, ss(e, t, n), St = s, Cn = l, St !== null && (Cn ? (e = St, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : St.removeChild(n.stateNode));
      break;
    case 18:
      St !== null && (Cn ? (e = St, n = n.stateNode, e.nodeType === 8 ? nc(e.parentNode, n) : e.nodeType === 1 && nc(e, n), Li(e)) : nc(St, n.stateNode));
      break;
    case 4:
      s = St, l = Cn, St = n.stateNode.containerInfo, Cn = !0, ss(e, t, n), St = s, Cn = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Nt && (s = n.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        l = s = s.next;
        do {
          var i = l, r = i.destroy;
          i = i.tag, r !== void 0 && (i & 2 || i & 4) && Su(n, t, r), l = l.next;
        } while (l !== s);
      }
      ss(e, t, n);
      break;
    case 1:
      if (!Nt && (kl(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function")) try {
        s.props = n.memoizedProps, s.state = n.memoizedState, s.componentWillUnmount();
      } catch (o) {
        st(n, t, o);
      }
      ss(e, t, n);
      break;
    case 21:
      ss(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Nt = (s = Nt) || n.memoizedState !== null, ss(e, t, n), Nt = s) : ss(e, t, n);
      break;
    default:
      ss(e, t, n);
  }
}
function Ff(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new V0()), t.forEach(function(s) {
      var l = sw.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(l, l));
    });
  }
}
function bn(e, t) {
  var n = t.deletions;
  if (n !== null) for (var s = 0; s < n.length; s++) {
    var l = n[s];
    try {
      var i = e, r = t, o = r;
      e: for (; o !== null; ) {
        switch (o.tag) {
          case 5:
            St = o.stateNode, Cn = !1;
            break e;
          case 3:
            St = o.stateNode.containerInfo, Cn = !0;
            break e;
          case 4:
            St = o.stateNode.containerInfo, Cn = !0;
            break e;
        }
        o = o.return;
      }
      if (St === null) throw Error(U(160));
      Zg(i, r, l), St = null, Cn = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (u) {
      st(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) qg(t, e), t = t.sibling;
}
function qg(e, t) {
  var n = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (bn(t, e), An(e), s & 4) {
        try {
          Ti(3, e, e.return), ra(3, e);
        } catch (w) {
          st(e, e.return, w);
        }
        try {
          Ti(5, e, e.return);
        } catch (w) {
          st(e, e.return, w);
        }
      }
      break;
    case 1:
      bn(t, e), An(e), s & 512 && n !== null && kl(n, n.return);
      break;
    case 5:
      if (bn(t, e), An(e), s & 512 && n !== null && kl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Ii(l, "");
        } catch (w) {
          st(e, e.return, w);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, r = n !== null ? n.memoizedProps : i, o = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          o === "input" && i.type === "radio" && i.name != null && wm(l, i), Kc(o, r);
          var u = Kc(o, i);
          for (r = 0; r < c.length; r += 2) {
            var h = c[r], p = c[r + 1];
            h === "style" ? Tm(l, p) : h === "dangerouslySetInnerHTML" ? bm(l, p) : h === "children" ? Ii(l, p) : $u(l, h, p, u);
          }
          switch (o) {
            case "input":
              Hc(l, i);
              break;
            case "textarea":
              Sm(l, i);
              break;
            case "select":
              var d = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var f = i.value;
              f != null ? Pl(l, !!i.multiple, f, !1) : d !== !!i.multiple && (i.defaultValue != null ? Pl(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Pl(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Fi] = i;
        } catch (w) {
          st(e, e.return, w);
        }
      }
      break;
    case 6:
      if (bn(t, e), An(e), s & 4) {
        if (e.stateNode === null) throw Error(U(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          st(e, e.return, w);
        }
      }
      break;
    case 3:
      if (bn(t, e), An(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Li(t.containerInfo);
      } catch (w) {
        st(e, e.return, w);
      }
      break;
    case 4:
      bn(t, e), An(e);
      break;
    case 13:
      bn(t, e), An(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Td = it())), s & 4 && Ff(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (Nt = (u = Nt) || h, bn(t, e), Nt = u) : bn(t, e), An(e), s & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !h && e.mode & 1) for (J = e, h = e.child; h !== null; ) {
          for (p = J = h; J !== null; ) {
            switch (d = J, f = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Ti(4, d, d.return);
                break;
              case 1:
                kl(d, d.return);
                var m = d.stateNode;
                if (typeof m.componentWillUnmount == "function") {
                  s = d, n = d.return;
                  try {
                    t = s, m.props = t.memoizedProps, m.state = t.memoizedState, m.componentWillUnmount();
                  } catch (w) {
                    st(s, n, w);
                  }
                }
                break;
              case 5:
                kl(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  zf(p);
                  continue;
                }
            }
            f !== null ? (f.return = d, J = f) : zf(p);
          }
          h = h.sibling;
        }
        e: for (h = null, p = e; ; ) {
          if (p.tag === 5) {
            if (h === null) {
              h = p;
              try {
                l = p.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (o = p.stateNode, c = p.memoizedProps.style, r = c != null && c.hasOwnProperty("display") ? c.display : null, o.style.display = _m("display", r));
              } catch (w) {
                st(e, e.return, w);
              }
            }
          } else if (p.tag === 6) {
            if (h === null) try {
              p.stateNode.nodeValue = u ? "" : p.memoizedProps;
            } catch (w) {
              st(e, e.return, w);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            h === p && (h = null), p = p.return;
          }
          h === p && (h = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      bn(t, e), An(e), s & 4 && Ff(e);
      break;
    case 21:
      break;
    default:
      bn(
        t,
        e
      ), An(e);
  }
}
function An(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Qg(n)) {
            var s = n;
            break e;
          }
          n = n.return;
        }
        throw Error(U(160));
      }
      switch (s.tag) {
        case 5:
          var l = s.stateNode;
          s.flags & 32 && (Ii(l, ""), s.flags &= -33);
          var i = Xf(e);
          _u(e, i, l);
          break;
        case 3:
        case 4:
          var r = s.stateNode.containerInfo, o = Xf(e);
          bu(e, o, r);
          break;
        default:
          throw Error(U(161));
      }
    } catch (c) {
      st(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function G0(e, t, n) {
  J = e, Jg(e);
}
function Jg(e, t, n) {
  for (var s = (e.mode & 1) !== 0; J !== null; ) {
    var l = J, i = l.child;
    if (l.tag === 22 && s) {
      var r = l.memoizedState !== null || Ur;
      if (!r) {
        var o = l.alternate, c = o !== null && o.memoizedState !== null || Nt;
        o = Ur;
        var u = Nt;
        if (Ur = r, (Nt = c) && !u) for (J = l; J !== null; ) r = J, c = r.child, r.tag === 22 && r.memoizedState !== null ? Hf(l) : c !== null ? (c.return = r, J = c) : Hf(l);
        for (; i !== null; ) J = i, Jg(i), i = i.sibling;
        J = l, Ur = o, Nt = u;
      }
      Of(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, J = i) : Of(e);
  }
}
function Of(e) {
  for (; J !== null; ) {
    var t = J;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Nt || ra(5, t);
            break;
          case 1:
            var s = t.stateNode;
            if (t.flags & 4 && !Nt) if (n === null) s.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Tn(t.type, n.memoizedProps);
              s.componentDidUpdate(l, n.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Tf(t, i, s);
            break;
          case 3:
            var r = t.updateQueue;
            if (r !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Tf(t, r, n);
            }
            break;
          case 5:
            var o = t.stateNode;
            if (n === null && t.flags & 4) {
              n = o;
              var c = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c.autoFocus && n.focus();
                  break;
                case "img":
                  c.src && (n.src = c.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var u = t.alternate;
              if (u !== null) {
                var h = u.memoizedState;
                if (h !== null) {
                  var p = h.dehydrated;
                  p !== null && Li(p);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(U(163));
        }
        Nt || t.flags & 512 && Mu(t);
      } catch (d) {
        st(t, t.return, d);
      }
    }
    if (t === e) {
      J = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, J = n;
      break;
    }
    J = t.return;
  }
}
function zf(e) {
  for (; J !== null; ) {
    var t = J;
    if (t === e) {
      J = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, J = n;
      break;
    }
    J = t.return;
  }
}
function Hf(e) {
  for (; J !== null; ) {
    var t = J;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ra(4, t);
          } catch (c) {
            st(t, n, c);
          }
          break;
        case 1:
          var s = t.stateNode;
          if (typeof s.componentDidMount == "function") {
            var l = t.return;
            try {
              s.componentDidMount();
            } catch (c) {
              st(t, l, c);
            }
          }
          var i = t.return;
          try {
            Mu(t);
          } catch (c) {
            st(t, i, c);
          }
          break;
        case 5:
          var r = t.return;
          try {
            Mu(t);
          } catch (c) {
            st(t, r, c);
          }
      }
    } catch (c) {
      st(t, t.return, c);
    }
    if (t === e) {
      J = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      o.return = t.return, J = o;
      break;
    }
    J = t.return;
  }
}
var Q0 = Math.ceil, Bo = Jn.ReactCurrentDispatcher, bd = Jn.ReactCurrentOwner, yn = Jn.ReactCurrentBatchConfig, Ce = 0, vt = null, dt = null, _t = 0, Qt = 0, jl = Cs(0), mt = 0, $i = null, Gs = 0, oa = 0, _d = 0, Ci = null, Ot = null, Td = 0, Hl = 1 / 0, On = null, Do = !1, Tu = null, ws = null, $r = !1, ps = null, Yo = 0, ki = 0, Cu = null, co = -1, uo = 0;
function Dt() {
  return Ce & 6 ? it() : co !== -1 ? co : co = it();
}
function Ss(e) {
  return e.mode & 1 ? Ce & 2 && _t !== 0 ? _t & -_t : R0.transition !== null ? (uo === 0 && (uo = Dm()), uo) : (e = De, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Wm(e.type)), e) : 1;
}
function Nn(e, t, n, s) {
  if (50 < ki) throw ki = 0, Cu = null, Error(U(185));
  Ki(e, n, s), (!(Ce & 2) || e !== vt) && (e === vt && (!(Ce & 2) && (oa |= n), mt === 4 && us(e, _t)), Vt(e, s), n === 1 && Ce === 0 && !(t.mode & 1) && (Hl = it() + 500, sa && ks()));
}
function Vt(e, t) {
  var n = e.callbackNode;
  Rv(e, t);
  var s = So(e, e === vt ? _t : 0);
  if (s === 0) n !== null && Zh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Zh(n), t === 1) e.tag === 0 ? E0(Wf.bind(null, e)) : cg(Wf.bind(null, e)), j0(function() {
      !(Ce & 6) && ks();
    }), n = null;
    else {
      switch (Ym(s)) {
        case 1:
          n = Zu;
          break;
        case 4:
          n = Lm;
          break;
        case 16:
          n = wo;
          break;
        case 536870912:
          n = Bm;
          break;
        default:
          n = wo;
      }
      n = ox(n, ex.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function ex(e, t) {
  if (co = -1, uo = 0, Ce & 6) throw Error(U(327));
  var n = e.callbackNode;
  if (Al() && e.callbackNode !== n) return null;
  var s = So(e, e === vt ? _t : 0);
  if (s === 0) return null;
  if (s & 30 || s & e.expiredLanes || t) t = Xo(e, s);
  else {
    t = s;
    var l = Ce;
    Ce |= 2;
    var i = nx();
    (vt !== e || _t !== t) && (On = null, Hl = it() + 500, Hs(e, t));
    do
      try {
        J0();
        break;
      } catch (o) {
        tx(e, o);
      }
    while (!0);
    ud(), Bo.current = i, Ce = l, dt !== null ? t = 0 : (vt = null, _t = 0, t = mt);
  }
  if (t !== 0) {
    if (t === 2 && (l = Jc(e), l !== 0 && (s = l, t = ku(e, l))), t === 1) throw n = $i, Hs(e, 0), us(e, s), Vt(e, it()), n;
    if (t === 6) us(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !Z0(l) && (t = Xo(e, s), t === 2 && (i = Jc(e), i !== 0 && (s = i, t = ku(e, i))), t === 1)) throw n = $i, Hs(e, 0), us(e, s), Vt(e, it()), n;
      switch (e.finishedWork = l, e.finishedLanes = s, t) {
        case 0:
        case 1:
          throw Error(U(345));
        case 2:
          Ds(e, Ot, On);
          break;
        case 3:
          if (us(e, s), (s & 130023424) === s && (t = Td + 500 - it(), 10 < t)) {
            if (So(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & s) !== s) {
              Dt(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = ou(Ds.bind(null, e, Ot, On), t);
            break;
          }
          Ds(e, Ot, On);
          break;
        case 4:
          if (us(e, s), (s & 4194240) === s) break;
          for (t = e.eventTimes, l = -1; 0 < s; ) {
            var r = 31 - Pn(s);
            i = 1 << r, r = t[r], r > l && (l = r), s &= ~i;
          }
          if (s = l, s = it() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * Q0(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = ou(Ds.bind(null, e, Ot, On), s);
            break;
          }
          Ds(e, Ot, On);
          break;
        case 5:
          Ds(e, Ot, On);
          break;
        default:
          throw Error(U(329));
      }
    }
  }
  return Vt(e, it()), e.callbackNode === n ? ex.bind(null, e) : null;
}
function ku(e, t) {
  var n = Ci;
  return e.current.memoizedState.isDehydrated && (Hs(e, t).flags |= 256), e = Xo(e, t), e !== 2 && (t = Ot, Ot = n, t !== null && ju(t)), e;
}
function ju(e) {
  Ot === null ? Ot = e : Ot.push.apply(Ot, e);
}
function Z0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var s = 0; s < n.length; s++) {
        var l = n[s], i = l.getSnapshot;
        l = l.value;
        try {
          if (!In(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function us(e, t) {
  for (t &= ~_d, t &= ~oa, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Pn(t), s = 1 << n;
    e[n] = -1, t &= ~s;
  }
}
function Wf(e) {
  if (Ce & 6) throw Error(U(327));
  Al();
  var t = So(e, 0);
  if (!(t & 1)) return Vt(e, it()), null;
  var n = Xo(e, t);
  if (e.tag !== 0 && n === 2) {
    var s = Jc(e);
    s !== 0 && (t = s, n = ku(e, s));
  }
  if (n === 1) throw n = $i, Hs(e, 0), us(e, t), Vt(e, it()), n;
  if (n === 6) throw Error(U(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ds(e, Ot, On), Vt(e, it()), null;
}
function Cd(e, t) {
  var n = Ce;
  Ce |= 1;
  try {
    return e(t);
  } finally {
    Ce = n, Ce === 0 && (Hl = it() + 500, sa && ks());
  }
}
function Qs(e) {
  ps !== null && ps.tag === 0 && !(Ce & 6) && Al();
  var t = Ce;
  Ce |= 1;
  var n = yn.transition, s = De;
  try {
    if (yn.transition = null, De = 1, e) return e();
  } finally {
    De = s, yn.transition = n, Ce = t, !(Ce & 6) && ks();
  }
}
function kd() {
  Qt = jl.current, Ke(jl);
}
function Hs(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, k0(n)), dt !== null) for (n = dt.return; n !== null; ) {
    var s = n;
    switch (od(s), s.tag) {
      case 1:
        s = s.type.childContextTypes, s != null && Co();
        break;
      case 3:
        Ol(), Ke(Ut), Ke(Et), gd();
        break;
      case 5:
        md(s);
        break;
      case 4:
        Ol();
        break;
      case 13:
        Ke(Je);
        break;
      case 19:
        Ke(Je);
        break;
      case 10:
        dd(s.type._context);
        break;
      case 22:
      case 23:
        kd();
    }
    n = n.return;
  }
  if (vt = e, dt = e = Ms(e.current, null), _t = Qt = t, mt = 0, $i = null, _d = oa = Gs = 0, Ot = Ci = null, Fs !== null) {
    for (t = 0; t < Fs.length; t++) if (n = Fs[t], s = n.interleaved, s !== null) {
      n.interleaved = null;
      var l = s.next, i = n.pending;
      if (i !== null) {
        var r = i.next;
        i.next = l, s.next = r;
      }
      n.pending = s;
    }
    Fs = null;
  }
  return e;
}
function tx(e, t) {
  do {
    var n = dt;
    try {
      if (ud(), ro.current = Lo, Ao) {
        for (var s = et.memoizedState; s !== null; ) {
          var l = s.queue;
          l !== null && (l.pending = null), s = s.next;
        }
        Ao = !1;
      }
      if (Ks = 0, yt = pt = et = null, _i = !1, Hi = 0, bd.current = null, n === null || n.return === null) {
        mt = 1, $i = t, dt = null;
        break;
      }
      e: {
        var i = e, r = n.return, o = n, c = t;
        if (t = _t, o.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var u = c, h = o, p = h.tag;
          if (!(h.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var d = h.alternate;
            d ? (h.updateQueue = d.updateQueue, h.memoizedState = d.memoizedState, h.lanes = d.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var f = If(r);
          if (f !== null) {
            f.flags &= -257, Ef(f, r, o, i, t), f.mode & 1 && Nf(i, u, t), t = f, c = u;
            var m = t.updateQueue;
            if (m === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(c), t.updateQueue = w;
            } else m.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Nf(i, u, t), jd();
              break e;
            }
            c = Error(U(426));
          }
        } else if (qe && o.mode & 1) {
          var M = If(r);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), Ef(M, r, o, i, t), ad(zl(c, o));
            break e;
          }
        }
        i = c = zl(c, o), mt !== 4 && (mt = 2), Ci === null ? Ci = [i] : Ci.push(i), i = r;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var v = Yg(i, c, t);
              _f(i, v);
              break e;
            case 1:
              o = c;
              var g = i.type, y = i.stateNode;
              if (!(i.flags & 128) && (typeof g.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (ws === null || !ws.has(y)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var S = Xg(i, o, t);
                _f(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      lx(n);
    } catch (b) {
      t = b, dt === n && n !== null && (dt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function nx() {
  var e = Bo.current;
  return Bo.current = Lo, e === null ? Lo : e;
}
function jd() {
  (mt === 0 || mt === 3 || mt === 2) && (mt = 4), vt === null || !(Gs & 268435455) && !(oa & 268435455) || us(vt, _t);
}
function Xo(e, t) {
  var n = Ce;
  Ce |= 2;
  var s = nx();
  (vt !== e || _t !== t) && (On = null, Hs(e, t));
  do
    try {
      q0();
      break;
    } catch (l) {
      tx(e, l);
    }
  while (!0);
  if (ud(), Ce = n, Bo.current = s, dt !== null) throw Error(U(261));
  return vt = null, _t = 0, mt;
}
function q0() {
  for (; dt !== null; ) sx(dt);
}
function J0() {
  for (; dt !== null && !_v(); ) sx(dt);
}
function sx(e) {
  var t = rx(e.alternate, e, Qt);
  e.memoizedProps = e.pendingProps, t === null ? lx(e) : dt = t, bd.current = null;
}
function lx(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = $0(n, t), n !== null) {
        n.flags &= 32767, dt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        mt = 6, dt = null;
        return;
      }
    } else if (n = U0(n, t, Qt), n !== null) {
      dt = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      dt = t;
      return;
    }
    dt = t = e;
  } while (t !== null);
  mt === 0 && (mt = 5);
}
function Ds(e, t, n) {
  var s = De, l = yn.transition;
  try {
    yn.transition = null, De = 1, ew(e, t, n, s);
  } finally {
    yn.transition = l, De = s;
  }
  return null;
}
function ew(e, t, n, s) {
  do
    Al();
  while (ps !== null);
  if (Ce & 6) throw Error(U(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(U(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Av(e, i), e === vt && (dt = vt = null, _t = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || $r || ($r = !0, ox(wo, function() {
    return Al(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = yn.transition, yn.transition = null;
    var r = De;
    De = 1;
    var o = Ce;
    Ce |= 4, bd.current = null, K0(e, n), qg(n, e), w0(iu), Mo = !!lu, iu = lu = null, e.current = n, G0(n), Tv(), Ce = o, De = r, yn.transition = i;
  } else e.current = n;
  if ($r && ($r = !1, ps = e, Yo = l), i = e.pendingLanes, i === 0 && (ws = null), jv(n.stateNode), Vt(e, it()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (Do) throw Do = !1, e = Tu, Tu = null, e;
  return Yo & 1 && e.tag !== 0 && Al(), i = e.pendingLanes, i & 1 ? e === Cu ? ki++ : (ki = 0, Cu = e) : ki = 0, ks(), null;
}
function Al() {
  if (ps !== null) {
    var e = Ym(Yo), t = yn.transition, n = De;
    try {
      if (yn.transition = null, De = 16 > e ? 16 : e, ps === null) var s = !1;
      else {
        if (e = ps, ps = null, Yo = 0, Ce & 6) throw Error(U(331));
        var l = Ce;
        for (Ce |= 4, J = e.current; J !== null; ) {
          var i = J, r = i.child;
          if (J.flags & 16) {
            var o = i.deletions;
            if (o !== null) {
              for (var c = 0; c < o.length; c++) {
                var u = o[c];
                for (J = u; J !== null; ) {
                  var h = J;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ti(8, h, i);
                  }
                  var p = h.child;
                  if (p !== null) p.return = h, J = p;
                  else for (; J !== null; ) {
                    h = J;
                    var d = h.sibling, f = h.return;
                    if (Gg(h), h === u) {
                      J = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = f, J = d;
                      break;
                    }
                    J = f;
                  }
                }
              }
              var m = i.alternate;
              if (m !== null) {
                var w = m.child;
                if (w !== null) {
                  m.child = null;
                  do {
                    var M = w.sibling;
                    w.sibling = null, w = M;
                  } while (w !== null);
                }
              }
              J = i;
            }
          }
          if (i.subtreeFlags & 2064 && r !== null) r.return = i, J = r;
          else e: for (; J !== null; ) {
            if (i = J, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Ti(9, i, i.return);
            }
            var v = i.sibling;
            if (v !== null) {
              v.return = i.return, J = v;
              break e;
            }
            J = i.return;
          }
        }
        var g = e.current;
        for (J = g; J !== null; ) {
          r = J;
          var y = r.child;
          if (r.subtreeFlags & 2064 && y !== null) y.return = r, J = y;
          else e: for (r = g; J !== null; ) {
            if (o = J, o.flags & 2048) try {
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  ra(9, o);
              }
            } catch (b) {
              st(o, o.return, b);
            }
            if (o === r) {
              J = null;
              break e;
            }
            var S = o.sibling;
            if (S !== null) {
              S.return = o.return, J = S;
              break e;
            }
            J = o.return;
          }
        }
        if (Ce = l, ks(), Dn && typeof Dn.onPostCommitFiberRoot == "function") try {
          Dn.onPostCommitFiberRoot(qo, e);
        } catch {
        }
        s = !0;
      }
      return s;
    } finally {
      De = n, yn.transition = t;
    }
  }
  return !1;
}
function Uf(e, t, n) {
  t = zl(n, t), t = Yg(e, t, 1), e = vs(e, t, 1), t = Dt(), e !== null && (Ki(e, 1, t), Vt(e, t));
}
function st(e, t, n) {
  if (e.tag === 3) Uf(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Uf(t, e, n);
      break;
    } else if (t.tag === 1) {
      var s = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ws === null || !ws.has(s))) {
        e = zl(n, e), e = Xg(t, e, 1), t = vs(t, e, 1), e = Dt(), t !== null && (Ki(t, 1, e), Vt(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function tw(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = Dt(), e.pingedLanes |= e.suspendedLanes & n, vt === e && (_t & n) === n && (mt === 4 || mt === 3 && (_t & 130023424) === _t && 500 > it() - Td ? Hs(e, 0) : _d |= n), Vt(e, t);
}
function ix(e, t) {
  t === 0 && (e.mode & 1 ? (t = Br, Br <<= 1, !(Br & 130023424) && (Br = 4194304)) : t = 1);
  var n = Dt();
  e = Qn(e, t), e !== null && (Ki(e, t, n), Vt(e, n));
}
function nw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), ix(e, n);
}
function sw(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var s = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      s = e.stateNode;
      break;
    default:
      throw Error(U(314));
  }
  s !== null && s.delete(t), ix(e, n);
}
var rx;
rx = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Ut.current) zt = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return zt = !1, W0(e, t, n);
    zt = !!(e.flags & 131072);
  }
  else zt = !1, qe && t.flags & 1048576 && ug(t, Po, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var s = t.type;
      ao(e, t), e = t.pendingProps;
      var l = Yl(t, Et.current);
      Rl(t, n), l = yd(null, t, s, e, l, n);
      var i = vd();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, $t(s) ? (i = !0, ko(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, fd(t), l.updater = ia, t.stateNode = l, l._reactInternals = t, pu(t, s, e, n), t = xu(null, t, s, !0, i, n)) : (t.tag = 0, qe && i && rd(t), Bt(null, t, l, n), t = t.child), t;
    case 16:
      s = t.elementType;
      e: {
        switch (ao(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = iw(s), e = Tn(s, e), l) {
          case 0:
            t = gu(null, t, s, e, n);
            break e;
          case 1:
            t = Lf(null, t, s, e, n);
            break e;
          case 11:
            t = Rf(null, t, s, e, n);
            break e;
          case 14:
            t = Af(null, t, s, Tn(s.type, e), n);
            break e;
        }
        throw Error(U(
          306,
          s,
          ""
        ));
      }
      return t;
    case 0:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Tn(s, l), gu(e, t, s, l, n);
    case 1:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Tn(s, l), Lf(e, t, s, l, n);
    case 3:
      e: {
        if (Hg(t), e === null) throw Error(U(387));
        s = t.pendingProps, i = t.memoizedState, l = i.element, gg(e, t), Eo(t, s, null, n);
        var r = t.memoizedState;
        if (s = r.element, i.isDehydrated) if (i = { element: s, isDehydrated: !1, cache: r.cache, pendingSuspenseBoundaries: r.pendingSuspenseBoundaries, transitions: r.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = zl(Error(U(423)), t), t = Bf(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = zl(Error(U(424)), t), t = Bf(e, t, s, n, l);
          break e;
        } else for (qt = ys(t.stateNode.containerInfo.firstChild), Jt = t, qe = !0, jn = null, n = pg(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Xl(), s === l) {
            t = Zn(e, t, n);
            break e;
          }
          Bt(e, t, s, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return xg(t), e === null && du(t), s = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, r = l.children, ru(s, l) ? r = null : i !== null && ru(s, i) && (t.flags |= 32), zg(e, t), Bt(e, t, r, n), t.child;
    case 6:
      return e === null && du(t), null;
    case 13:
      return Wg(e, t, n);
    case 4:
      return pd(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Fl(t, null, s, n) : Bt(e, t, s, n), t.child;
    case 11:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Tn(s, l), Rf(e, t, s, l, n);
    case 7:
      return Bt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Bt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Bt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (s = t.type._context, l = t.pendingProps, i = t.memoizedProps, r = l.value, We(No, s._currentValue), s._currentValue = r, i !== null) if (In(i.value, r)) {
          if (i.children === l.children && !Ut.current) {
            t = Zn(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var o = i.dependencies;
          if (o !== null) {
            r = i.child;
            for (var c = o.firstContext; c !== null; ) {
              if (c.context === s) {
                if (i.tag === 1) {
                  c = $n(-1, n & -n), c.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var h = u.pending;
                    h === null ? c.next = c : (c.next = h.next, h.next = c), u.pending = c;
                  }
                }
                i.lanes |= n, c = i.alternate, c !== null && (c.lanes |= n), hu(
                  i.return,
                  n,
                  t
                ), o.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (i.tag === 10) r = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (r = i.return, r === null) throw Error(U(341));
            r.lanes |= n, o = r.alternate, o !== null && (o.lanes |= n), hu(r, n, t), r = i.sibling;
          } else r = i.child;
          if (r !== null) r.return = i;
          else for (r = i; r !== null; ) {
            if (r === t) {
              r = null;
              break;
            }
            if (i = r.sibling, i !== null) {
              i.return = r.return, r = i;
              break;
            }
            r = r.return;
          }
          i = r;
        }
        Bt(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, s = t.pendingProps.children, Rl(t, n), l = vn(l), s = s(l), t.flags |= 1, Bt(e, t, s, n), t.child;
    case 14:
      return s = t.type, l = Tn(s, t.pendingProps), l = Tn(s.type, l), Af(e, t, s, l, n);
    case 15:
      return Fg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Tn(s, l), ao(e, t), t.tag = 1, $t(s) ? (e = !0, ko(t)) : e = !1, Rl(t, n), Dg(t, s, l), pu(t, s, l, n), xu(null, t, s, !0, e, n);
    case 19:
      return Ug(e, t, n);
    case 22:
      return Og(e, t, n);
  }
  throw Error(U(156, t.tag));
};
function ox(e, t) {
  return Am(e, t);
}
function lw(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function mn(e, t, n, s) {
  return new lw(e, t, n, s);
}
function Pd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function iw(e) {
  if (typeof e == "function") return Pd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ku) return 11;
    if (e === Gu) return 14;
  }
  return 2;
}
function Ms(e, t) {
  var n = e.alternate;
  return n === null ? (n = mn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ho(e, t, n, s, l, i) {
  var r = 2;
  if (s = e, typeof e == "function") Pd(e) && (r = 1);
  else if (typeof e == "string") r = 5;
  else e: switch (e) {
    case yl:
      return Ws(n.children, l, i, t);
    case Vu:
      r = 8, l |= 8;
      break;
    case Yc:
      return e = mn(12, n, t, l | 2), e.elementType = Yc, e.lanes = i, e;
    case Xc:
      return e = mn(13, n, t, l), e.elementType = Xc, e.lanes = i, e;
    case Fc:
      return e = mn(19, n, t, l), e.elementType = Fc, e.lanes = i, e;
    case xm:
      return aa(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case mm:
          r = 10;
          break e;
        case gm:
          r = 9;
          break e;
        case Ku:
          r = 11;
          break e;
        case Gu:
          r = 14;
          break e;
        case os:
          r = 16, s = null;
          break e;
      }
      throw Error(U(130, e == null ? e : typeof e, ""));
  }
  return t = mn(r, n, t, l), t.elementType = e, t.type = s, t.lanes = i, t;
}
function Ws(e, t, n, s) {
  return e = mn(7, e, s, t), e.lanes = n, e;
}
function aa(e, t, n, s) {
  return e = mn(22, e, s, t), e.elementType = xm, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function uc(e, t, n) {
  return e = mn(6, e, null, t), e.lanes = n, e;
}
function dc(e, t, n) {
  return t = mn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function rw(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ua(0), this.expirationTimes = Ua(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ua(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Nd(e, t, n, s, l, i, r, o, c) {
  return e = new rw(e, t, n, o, c), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = mn(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, fd(i), e;
}
function ow(e, t, n) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: xl, key: s == null ? null : "" + s, children: e, containerInfo: t, implementation: n };
}
function ax(e) {
  if (!e) return _s;
  e = e._reactInternals;
  e: {
    if (tl(e) !== e || e.tag !== 1) throw Error(U(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if ($t(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(U(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if ($t(n)) return ag(e, n, t);
  }
  return t;
}
function cx(e, t, n, s, l, i, r, o, c) {
  return e = Nd(n, s, !0, e, l, i, r, o, c), e.context = ax(null), n = e.current, s = Dt(), l = Ss(n), i = $n(s, l), i.callback = t ?? null, vs(n, i, l), e.current.lanes = l, Ki(e, l, s), Vt(e, s), e;
}
function ca(e, t, n, s) {
  var l = t.current, i = Dt(), r = Ss(l);
  return n = ax(n), t.context === null ? t.context = n : t.pendingContext = n, t = $n(i, r), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = vs(l, t, r), e !== null && (Nn(e, l, r, i), io(e, l, r)), r;
}
function Fo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function $f(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Id(e, t) {
  $f(e, t), (e = e.alternate) && $f(e, t);
}
function aw() {
  return null;
}
var ux = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ed(e) {
  this._internalRoot = e;
}
ua.prototype.render = Ed.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(U(409));
  ca(e, t, null, null);
};
ua.prototype.unmount = Ed.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qs(function() {
      ca(null, e, null, null);
    }), t[Gn] = null;
  }
};
function ua(e) {
  this._internalRoot = e;
}
ua.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Om();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < cs.length && t !== 0 && t < cs[n].priority; n++) ;
    cs.splice(n, 0, e), n === 0 && Hm(e);
  }
};
function Rd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function da(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Vf() {
}
function cw(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var i = s;
      s = function() {
        var u = Fo(r);
        i.call(u);
      };
    }
    var r = cx(t, s, e, 0, null, !1, !1, "", Vf);
    return e._reactRootContainer = r, e[Gn] = r.current, Yi(e.nodeType === 8 ? e.parentNode : e), Qs(), r;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof s == "function") {
    var o = s;
    s = function() {
      var u = Fo(c);
      o.call(u);
    };
  }
  var c = Nd(e, 0, !1, null, null, !1, !1, "", Vf);
  return e._reactRootContainer = c, e[Gn] = c.current, Yi(e.nodeType === 8 ? e.parentNode : e), Qs(function() {
    ca(t, c, n, s);
  }), c;
}
function ha(e, t, n, s, l) {
  var i = n._reactRootContainer;
  if (i) {
    var r = i;
    if (typeof l == "function") {
      var o = l;
      l = function() {
        var c = Fo(r);
        o.call(c);
      };
    }
    ca(t, r, e, l);
  } else r = cw(n, t, e, l, s);
  return Fo(r);
}
Xm = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = gi(t.pendingLanes);
        n !== 0 && (qu(t, n | 1), Vt(t, it()), !(Ce & 6) && (Hl = it() + 500, ks()));
      }
      break;
    case 13:
      Qs(function() {
        var s = Qn(e, 1);
        if (s !== null) {
          var l = Dt();
          Nn(s, e, 1, l);
        }
      }), Id(e, 1);
  }
};
Ju = function(e) {
  if (e.tag === 13) {
    var t = Qn(e, 134217728);
    if (t !== null) {
      var n = Dt();
      Nn(t, e, 134217728, n);
    }
    Id(e, 134217728);
  }
};
Fm = function(e) {
  if (e.tag === 13) {
    var t = Ss(e), n = Qn(e, t);
    if (n !== null) {
      var s = Dt();
      Nn(n, e, t, s);
    }
    Id(e, t);
  }
};
Om = function() {
  return De;
};
zm = function(e, t) {
  var n = De;
  try {
    return De = e, t();
  } finally {
    De = n;
  }
};
Qc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Hc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var s = n[t];
          if (s !== e && s.form === e.form) {
            var l = na(s);
            if (!l) throw Error(U(90));
            vm(s), Hc(s, l);
          }
        }
      }
      break;
    case "textarea":
      Sm(e, n);
      break;
    case "select":
      t = n.value, t != null && Pl(e, !!n.multiple, t, !1);
  }
};
jm = Cd;
Pm = Qs;
var uw = { usingClientEntryPoint: !1, Events: [Qi, Ml, na, Cm, km, Cd] }, ci = { findFiberByHostInstance: Xs, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, dw = { bundleType: ci.bundleType, version: ci.version, rendererPackageName: ci.rendererPackageName, rendererConfig: ci.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Jn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Em(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ci.findFiberByHostInstance || aw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Vr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Vr.isDisabled && Vr.supportsFiber) try {
    qo = Vr.inject(dw), Dn = Vr;
  } catch {
  }
}
tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = uw;
tn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Rd(t)) throw Error(U(200));
  return ow(e, t, null, n);
};
tn.createRoot = function(e, t) {
  if (!Rd(e)) throw Error(U(299));
  var n = !1, s = "", l = ux;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Nd(e, 1, !1, null, null, n, !1, s, l), e[Gn] = t.current, Yi(e.nodeType === 8 ? e.parentNode : e), new Ed(t);
};
tn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(U(188)) : (e = Object.keys(e).join(","), Error(U(268, e)));
  return e = Em(t), e = e === null ? null : e.stateNode, e;
};
tn.flushSync = function(e) {
  return Qs(e);
};
tn.hydrate = function(e, t, n) {
  if (!da(t)) throw Error(U(200));
  return ha(null, e, t, !0, n);
};
tn.hydrateRoot = function(e, t, n) {
  if (!Rd(e)) throw Error(U(405));
  var s = n != null && n.hydratedSources || null, l = !1, i = "", r = ux;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (r = n.onRecoverableError)), t = cx(t, null, e, 1, n ?? null, l, !1, i, r), e[Gn] = t.current, Yi(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new ua(t);
};
tn.render = function(e, t, n) {
  if (!da(t)) throw Error(U(200));
  return ha(null, e, t, !1, n);
};
tn.unmountComponentAtNode = function(e) {
  if (!da(e)) throw Error(U(40));
  return e._reactRootContainer ? (Qs(function() {
    ha(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Gn] = null;
    });
  }), !0) : !1;
};
tn.unstable_batchedUpdates = Cd;
tn.unstable_renderSubtreeIntoContainer = function(e, t, n, s) {
  if (!da(n)) throw Error(U(200));
  if (e == null || e._reactInternals === void 0) throw Error(U(38));
  return ha(e, t, n, !1, s);
};
tn.version = "18.3.1-next-f1338f8080-20240426";
function dx() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(dx);
    } catch (e) {
      console.error(e);
    }
}
dx(), dm.exports = tn;
var ji = dm.exports, Kf = ji;
Bc.createRoot = Kf.createRoot, Bc.hydrateRoot = Kf.hydrateRoot;
const hw = {}, Gf = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (h, p) => {
    const d = typeof h == "function" ? h(t) : h;
    if (!Object.is(d, t)) {
      const f = t;
      t = p ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((m) => m(t, f));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (h) => (n.add(h), () => n.delete(h)), destroy: () => {
    (hw ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, fw = (e) => e ? Gf(e) : Gf;
var hx = { exports: {} }, fx = {}, px = { exports: {} }, mx = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wl = T;
function pw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var mw = typeof Object.is == "function" ? Object.is : pw, gw = Wl.useState, xw = Wl.useEffect, yw = Wl.useLayoutEffect, vw = Wl.useDebugValue;
function ww(e, t) {
  var n = t(), s = gw({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, i = s[1];
  return yw(
    function() {
      l.value = n, l.getSnapshot = t, hc(l) && i({ inst: l });
    },
    [e, n, t]
  ), xw(
    function() {
      return hc(l) && i({ inst: l }), e(function() {
        hc(l) && i({ inst: l });
      });
    },
    [e]
  ), vw(n), n;
}
function hc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !mw(e, n);
  } catch {
    return !0;
  }
}
function Sw(e, t) {
  return t();
}
var Mw = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? Sw : ww;
mx.useSyncExternalStore = Wl.useSyncExternalStore !== void 0 ? Wl.useSyncExternalStore : Mw;
px.exports = mx;
var bw = px.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fa = T, _w = bw;
function Tw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Cw = typeof Object.is == "function" ? Object.is : Tw, kw = _w.useSyncExternalStore, jw = fa.useRef, Pw = fa.useEffect, Nw = fa.useMemo, Iw = fa.useDebugValue;
fx.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var i = jw(null);
  if (i.current === null) {
    var r = { hasValue: !1, value: null };
    i.current = r;
  } else r = i.current;
  i = Nw(
    function() {
      function c(f) {
        if (!u) {
          if (u = !0, h = f, f = s(f), l !== void 0 && r.hasValue) {
            var m = r.value;
            if (l(m, f))
              return p = m;
          }
          return p = f;
        }
        if (m = p, Cw(h, f)) return m;
        var w = s(f);
        return l !== void 0 && l(m, w) ? (h = f, m) : (h = f, p = w);
      }
      var u = !1, h, p, d = n === void 0 ? null : n;
      return [
        function() {
          return c(t());
        },
        d === null ? void 0 : function() {
          return c(d());
        }
      ];
    },
    [t, n, s, l]
  );
  var o = kw(e, i[0], i[1]);
  return Pw(
    function() {
      r.hasValue = !0, r.value = o;
    },
    [o]
  ), Iw(o), o;
};
hx.exports = fx;
var Ew = hx.exports;
const Rw = /* @__PURE__ */ Jp(Ew), gx = {}, { useDebugValue: Aw } = Te, { useSyncExternalStoreWithSelector: Lw } = Rw;
let Qf = !1;
const Bw = (e) => e;
function Dw(e, t = Bw, n) {
  (gx ? "production" : void 0) !== "production" && n && !Qf && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Qf = !0);
  const s = Lw(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return Aw(s), s;
}
const Zf = (e) => {
  (gx ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? fw(e) : e, n = (s, l) => Dw(t, s, l);
  return Object.assign(n, t), n;
}, nt = (e) => e ? Zf(e) : Zf, Yw = {
  width: 0,
  height: 0
}, ls = {
  x: 0,
  y: 0,
  zoom: 1
}, Xw = 0.02, Fw = 16, Ow = 2e-3, ui = 0.6, k = 12, pe = 8, Y = 64, is = 512 * k, zw = ["nw", "ne", "se", "sw"], fc = -180, pc = 180, Zs = 0.01, Ul = 5, mc = 0, gc = 1, Hw = k * 0.9, qf = Hw / 2, xx = 16, Ww = 8, Uw = 8, Pu = 1, Nu = 64, xc = 4096, Jf = 4e6, yx = "pss.traceCanvasOversize", Ad = 8, ep = Ad * 3, $w = Ad * 4, Vw = 1e3, Kw = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/bmp": "bmp",
  "image/pcx": "pcx",
  "image/x-pcx": "pcx",
  "image/tga": "tga",
  "image/x-tga": "tga"
}, tp = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  pcx: "image/x-pcx",
  tga: "image/x-tga"
}, Iu = [
  "#000000",
  "#1a1a1a",
  "#3a3a3a",
  "#5a5a5a",
  "#7a7a7a",
  "#9a9a9a",
  "#bababa",
  "#ffffff",
  "#3b1f0f",
  "#5c2c14",
  "#8a3c1d",
  "#b45626",
  "#e07a3c",
  "#f6a04d",
  "#f8c17a",
  "#fbe4b3",
  "#1b2f5b",
  "#26407a",
  "#3657a6",
  "#4a6fd6",
  "#5f8bff",
  "#7aa5ff",
  "#9cc0ff",
  "#c5ddff",
  "#0f3b2a",
  "#165238",
  "#1f6d49",
  "#2d8c5e",
  "#3ab073",
  "#5fd790",
  "#8df0b2",
  "#c6f8dd",
  "#4a0f5b",
  "#651478",
  "#8a1aa6",
  "#b424d6",
  "#d64aff",
  "#e679ff",
  "#f0a6ff",
  "#f8d2ff",
  "#5b0f1f",
  "#7a1429",
  "#a61a37",
  "#d6244a",
  "#ff4a64",
  "#ff7a8a",
  "#ff9caa",
  "#ffd1d8"
], Gw = {
  pen: "Pen",
  spray: "Spray",
  line: "Line",
  rectangle: "Rectangle",
  oval: "Oval",
  "fill-bucket": "Fill",
  text: "Text",
  ai: "AI Prompt",
  eyedropper: "Eyedropper",
  "reference-handle": "Reference",
  stamp: "Stamp",
  "magic-wand": "Magic Wand",
  "selection-rect": "Select",
  "selection-oval": "Select Oval",
  "selection-lasso": "Lasso",
  "texture-roll": "Scroll",
  "tile-sampler": "Tile Sampler",
  "tile-pen": "Tile Pen",
  "tile-rectangle": "Tile Rectangle",
  "tile-9slice": "Tile 9-Slice",
  "tile-export": "Tile Export"
}, Qw = (e, t, n) => Math.min(Math.max(e, t), n), ke = nt((e, t) => ({
  ...Yw,
  camera: { ...ls },
  setSize: (n, s) => e((l) => {
    const { camera: i } = l, o = i.x === ls.x && i.y === ls.y && i.zoom === ls.zoom && n > 0 && s > 0 ? {
      x: -n / (2 * i.zoom),
      y: -s / (2 * i.zoom),
      zoom: i.zoom
    } : i;
    return { width: n, height: s, camera: o };
  }),
  setCamera: (n) => e((s) => ({
    camera: { ...s.camera, ...n }
  })),
  resetCamera: () => e((n) => n.width > 0 && n.height > 0 ? {
    camera: {
      x: -n.width / (2 * ls.zoom),
      y: -n.height / (2 * ls.zoom),
      zoom: ls.zoom
    }
  } : { camera: { ...ls } }),
  zoomBy: (n, s) => {
    const { camera: l } = t(), i = Qw(l.zoom + n, Xw, Fw);
    if (!s) {
      e({ camera: { ...l, zoom: i } });
      return;
    }
    const r = i / l.zoom, o = s.x - (s.x - l.x) / r, c = s.y - (s.y - l.y) / r;
    e({ camera: { x: o, y: c, zoom: i } });
  },
  panTo: (n, s) => e((l) => ({
    camera: { ...l.camera, x: n, y: s }
  }))
})), np = [Math.max(0, Iu.length - 1)], Zw = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, di = (e, t) => {
  const n = Zw(e).filter((s) => s >= 0 && s < t);
  return n.length > 0 ? n : [Math.max(0, t - 1)];
}, re = nt((e, t) => ({
  colors: Iu,
  selectedIndices: np,
  addColor: (n) => e((s) => {
    const l = [...s.colors, n], i = l.length - 1;
    return {
      colors: l,
      selectedIndices: di(
        [...s.selectedIndices.filter((r) => r !== i), i],
        l.length
      )
    };
  }),
  removeColor: (n) => e((s) => {
    if (s.colors.length <= 1)
      return s;
    const l = s.colors.filter((r, o) => o !== n), i = di(
      s.selectedIndices.filter((r) => r !== n).map((r) => r > n ? r - 1 : r),
      l.length
    );
    return { colors: l, selectedIndices: i };
  }),
  setColor: (n, s) => e((l) => ({
    colors: l.colors.map((i, r) => r === n ? s : i)
  })),
  setPalette: (n) => e((s) => ({
    colors: n,
    selectedIndices: di(s.selectedIndices, n.length)
  })),
  reset: () => e({
    colors: Iu,
    selectedIndices: np
  }),
  setSelectedIndices: (n) => e((s) => ({
    selectedIndices: di(n, s.colors.length)
  })),
  setActiveIndex: (n) => e((s) => ({
    selectedIndices: di(
      [...s.selectedIndices.filter((l) => l !== n), n],
      s.colors.length
    )
  })),
  getActiveIndex: () => {
    const n = t(), s = n.selectedIndices[n.selectedIndices.length - 1];
    return typeof s == "number" ? s : Math.max(0, n.colors.length - 1);
  }
})), sp = (e, t) => Math.floor(e / t), lp = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, ip = (e, t) => {
  const n = sp(t, Y), s = sp(e, Y);
  return {
    row: n,
    col: s,
    localX: lp(e, Y),
    localY: lp(t, Y)
  };
}, Kr = (e, t) => `${e}:${t}`;
class ml {
  constructor() {
    this.blocks = /* @__PURE__ */ new Map();
  }
  getPixel(t, n) {
    const { row: s, col: l, localX: i, localY: r } = ip(t, n), o = this.blocks.get(Kr(s, l));
    return o ? o[r * Y + i] : 0;
  }
  setPixel(t, n, s) {
    const { row: l, col: i, localX: r, localY: o } = ip(t, n), c = Kr(l, i);
    let u = this.blocks.get(c);
    u || (u = new Uint8Array(Y * Y), this.blocks.set(c, u)), u[o * Y + r] = s;
  }
  setBlock(t, n, s) {
    if (s.length !== Y * Y)
      throw new Error("Invalid block size");
    this.blocks.set(Kr(t, n), s);
  }
  getBlock(t, n) {
    return this.blocks.get(Kr(t, n));
  }
  clear() {
    this.blocks.clear();
  }
  getBlocks() {
    const t = [];
    for (const [n, s] of this.blocks.entries()) {
      const [l, i] = n.split(":"), r = Number(l), o = Number(i);
      t.push({ row: r, col: o, block: s });
    }
    return t;
  }
}
const fo = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`, rp = fo(), ee = nt((e, t) => ({
  layers: [{ id: rp, name: "Layer 1", visible: !0, store: new ml() }],
  activeLayerId: rp,
  version: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  createLayer: (n) => {
    const s = fo(), l = n != null && n.trim() ? n.trim() : `Layer ${t().layers.length + 1}`;
    return e((i) => ({
      layers: [...i.layers, { id: s, name: l, visible: !0, store: new ml() }],
      activeLayerId: s,
      version: i.version + 1,
      dirtyAll: !0,
      dirtyBlocks: /* @__PURE__ */ new Set()
    })), s;
  },
  deleteLayer: (n) => {
    e((s) => {
      var o;
      if (s.layers.length <= 1)
        return s;
      const l = s.layers.findIndex((c) => c.id === n);
      if (l === -1)
        return s;
      const i = s.layers.filter((c) => c.id !== n), r = s.activeLayerId === n ? ((o = i[Math.min(l, i.length - 1)]) == null ? void 0 : o.id) ?? i[0].id : s.activeLayerId;
      return {
        layers: i,
        activeLayerId: r,
        version: s.version + 1,
        dirtyAll: !0,
        dirtyBlocks: /* @__PURE__ */ new Set()
      };
    });
  },
  renameLayer: (n, s) => e((l) => ({
    layers: l.layers.map(
      (i) => i.id === n ? { ...i, name: s.trim() || i.name } : i
    ),
    version: l.version + 1
  })),
  setLayerVisible: (n, s) => e((l) => ({
    layers: l.layers.map((i) => i.id === n ? { ...i, visible: s } : i),
    version: l.version + 1
  })),
  toggleLayerVisible: (n) => e((s) => ({
    layers: s.layers.map(
      (l) => l.id === n ? { ...l, visible: !l.visible } : l
    ),
    version: s.version + 1
  })),
  moveLayer: (n, s) => e((l) => {
    const i = l.layers.findIndex((u) => u.id === n);
    if (i === -1)
      return l;
    const r = s === "up" ? i + 1 : i - 1;
    if (r < 0 || r >= l.layers.length)
      return l;
    const o = [...l.layers], [c] = o.splice(i, 1);
    return o.splice(r, 0, c), { layers: o, version: l.version + 1 };
  }),
  mergeLayerDown: (n) => e((s) => {
    const l = s.layers.findIndex((o) => o.id === n);
    if (l <= 0)
      return s;
    const i = s.layers[l], r = s.layers[l - 1];
    for (const { row: o, col: c, block: u } of i.store.getBlocks()) {
      let h = r.store.getBlock(o, c);
      h || (h = new Uint8Array(Y * Y), r.store.setBlock(o, c, h));
      for (let p = 0; p < u.length; p += 1)
        u[p] !== 0 && (h[p] = u[p]);
    }
    return {
      layers: s.layers.filter((o, c) => c !== l),
      activeLayerId: r.id,
      version: s.version + 1,
      dirtyAll: !0,
      dirtyBlocks: /* @__PURE__ */ new Set()
    };
  }),
  setActiveLayer: (n) => e((s) => s.activeLayerId === n || !s.layers.some((l) => l.id === n) ? s : { activeLayerId: n, version: s.version + 1 }),
  getPixel: (n, s) => {
    const l = t().layers.find((i) => i.id === t().activeLayerId);
    return l ? l.store.getPixel(n, s) : 0;
  },
  getPixelInLayer: (n, s, l) => {
    const i = t().layers.find((r) => r.id === n);
    return i ? i.store.getPixel(s, l) : 0;
  },
  getPixelComposite: (n, s) => {
    const l = t().layers;
    for (let i = l.length - 1; i >= 0; i -= 1) {
      const r = l[i];
      if (!r.visible)
        continue;
      const o = r.store.getPixel(n, s);
      if (o !== 0)
        return o;
    }
    return 0;
  },
  setPixel: (n, s, l) => {
    t().setPixelInLayer(t().activeLayerId, n, s, l);
  },
  setPixelInLayer: (n, s, l, i) => {
    const r = t().layers.find((u) => u.id === n);
    if (!r)
      return;
    r.store.setPixel(s, l, i);
    const o = Math.floor(l / Y), c = Math.floor(s / Y);
    e((u) => {
      const h = new Set(u.dirtyBlocks);
      return h.add(`${n}:${o}:${c}`), { version: u.version + 1, dirtyBlocks: h };
    });
  },
  setPixels: (n) => {
    t().setPixelsInLayer(t().activeLayerId, n);
  },
  setPixelsInLayer: (n, s) => {
    const l = t().layers.find((r) => r.id === n);
    if (!l)
      return;
    const i = new Set(t().dirtyBlocks);
    for (const r of s) {
      l.store.setPixel(r.x, r.y, r.paletteIndex);
      const o = Math.floor(r.y / Y), c = Math.floor(r.x / Y);
      i.add(`${n}:${o}:${c}`);
    }
    e((r) => ({ version: r.version + 1, dirtyBlocks: i }));
  },
  exportLayerPayloads: () => t().layers.map((n) => ({
    id: n.id,
    name: n.name,
    visible: n.visible,
    blocks: n.store.getBlocks().map((s) => ({
      row: s.row,
      col: s.col,
      data: s.block
    }))
  })),
  loadLayerPayloads: (n, s) => {
    var r, o;
    const l = n.map((c) => {
      const u = new ml();
      for (const h of c.blocks)
        u.setBlock(h.row, h.col, h.data);
      return { id: c.id, name: c.name, visible: c.visible, store: u };
    }), i = ((r = l.find((c) => c.id === s)) == null ? void 0 : r.id) ?? ((o = l[0]) == null ? void 0 : o.id) ?? null;
    if (!i) {
      t().clear();
      return;
    }
    e((c) => ({
      layers: l,
      activeLayerId: i,
      version: c.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  loadBlocks: (n) => {
    const s = fo(), l = new ml();
    for (const i of n)
      l.setBlock(i.row, i.col, i.data);
    e((i) => ({
      layers: [{ id: s, name: "Layer 1", visible: !0, store: l }],
      activeLayerId: s,
      version: i.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  clear: () => {
    const n = fo();
    e((s) => ({
      layers: [{ id: n, name: "Layer 1", visible: !0, store: new ml() }],
      activeLayerId: n,
      version: s.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll: n, dirtyBlocks: s } = t(), l = Array.from(s).map((i) => {
      const [r, o, c] = i.split(":");
      return r ? { layerId: r, row: Number(o), col: Number(c) } : null;
    }).filter((i) => i !== null);
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), qw = (e, t) => `${e}:${t}`, $ = nt(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(qw(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class Jw {
  constructor() {
    this.activeTool = null;
  }
  setTool(t) {
    this.activeTool = t;
  }
  handleEvent(t, n) {
    var s, l, i, r, o, c, u, h, p, d;
    if (this.activeTool)
      switch (t) {
        case "hover":
          (l = (s = this.activeTool).onHover) == null || l.call(s, n);
          break;
        case "begin":
          (r = (i = this.activeTool).onBegin) == null || r.call(i, n);
          break;
        case "move":
          (c = (o = this.activeTool).onMove) == null || c.call(o, n);
          break;
        case "end":
          (h = (u = this.activeTool).onEnd) == null || h.call(u, n);
          break;
        case "cancel":
          (d = (p = this.activeTool).onCancel) == null || d.call(p, n);
          break;
      }
  }
}
const e1 = "Pixel Splash Studio", t1 = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${e1} - ${n}${t ? "*" : ""}`;
}, ve = nt((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), n1 = () => {
  const e = ve.getState();
  return t1(e.path, e.dirty);
}, hi = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, vx = 64, Eu = 2, Ru = 24, yc = 6, s1 = 1, l1 = 1, Oo = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(vx, Math.max(1, Math.floor(e))), i1 = (e) => Math.max(Eu, Math.min(Ru, Math.round(e))), vc = (e) => ({
  ...e,
  columns: Oo(e.columns, s1),
  rows: Oo(e.rows, l1)
}), r1 = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, o1 = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, a1 = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = [];
  let l = 0;
  return e.tiles.forEach((i, r) => {
    if (t.has(r)) {
      n.set(r, -1);
      return;
    }
    n.set(r, l), s.push(i), l += 1;
  }), {
    nextTiles: s,
    indexMap: n,
    nextColumns: e.columns,
    nextRows: e.rows
  };
}, c1 = (e, t) => {
  const n = e.tiles.length, s = Math.max(1, e.columns), l = Math.ceil(n / s), i = [];
  let r = 0;
  for (let p = 0; p < l; p += 1) {
    const d = p * s, f = Math.min(n, d + s);
    let m = !0;
    for (let w = d; w < f; w += 1)
      if (!t.has(w)) {
        m = !1;
        break;
      }
    m && (i.push(p), r += f - d);
  }
  const o = [];
  let c = 0;
  for (let p = 0; p < s; p += 1) {
    let d = !1, f = !0, m = 0;
    for (let w = 0; w < l; w += 1) {
      const M = w * s + p;
      if (!(M >= n) && (d = !0, m += 1, !t.has(M))) {
        f = !1;
        break;
      }
    }
    d && f && (o.push(p), c += m);
  }
  const u = i.length > 0 && r === t.size;
  if (o.length > 0 && c === t.size && s - o.length >= 1) {
    const p = new Set(o), d = /* @__PURE__ */ new Map(), f = [];
    for (let m = 0; m < l; m += 1)
      for (let w = 0; w < s; w += 1) {
        const M = m * s + w;
        if (!(M >= n)) {
          if (p.has(w)) {
            d.set(M, -1);
            continue;
          }
          d.set(M, f.length), f.push(e.tiles[M]);
        }
      }
    return {
      nextTiles: f,
      indexMap: d,
      nextColumns: s - p.size,
      nextRows: e.rows
    };
  }
  if (u && l - i.length >= 1) {
    const p = new Set(i), d = /* @__PURE__ */ new Map(), f = [];
    for (let w = 0; w < l; w += 1)
      for (let M = 0; M < s; M += 1) {
        const v = w * s + M;
        if (!(v >= n)) {
          if (p.has(w)) {
            d.set(v, -1);
            continue;
          }
          d.set(v, f.length), f.push(e.tiles[v]);
        }
      }
    const m = l === e.rows ? Math.max(1, e.rows - p.size) : e.rows;
    return {
      nextTiles: f,
      indexMap: d,
      nextColumns: e.columns,
      nextRows: m
    };
  }
  return a1(e, t);
}, V = nt((e, t) => ({
  tileSets: [],
  tileMaps: [],
  activeTileSetId: null,
  activeTileMapId: null,
  selectedTileIndex: 0,
  selectedTileIndices: [0],
  selectedTileCols: 1,
  selectedTileRows: 1,
  tilePage: 0,
  tilePageCount: 1,
  tilePaletteColumns: 8,
  tilePaletteOffset: 0,
  tilePaletteRowsMin: 3,
  tilePickerZoom: yc,
  tilePlacementMode: "hard",
  tilePenSnapToCluster: !1,
  tileDebugOverlay: !1,
  nineSlice: null,
  setTileSets: (n) => e((s) => {
    const l = n.map(vc), i = r1(
      l,
      s.activeTileSetId
    ), r = l.find((o) => o.id === i);
    return {
      tileSets: l,
      activeTileSetId: i,
      tilePaletteColumns: (r == null ? void 0 : r.columns) ?? s.tilePaletteColumns,
      tilePaletteRowsMin: (r == null ? void 0 : r.rows) ?? s.tilePaletteRowsMin
    };
  }),
  setTileMaps: (n) => e({ tileMaps: n }),
  setAll: (n, s) => e(() => {
    var r;
    const l = n.map(vc), i = l[0];
    return {
      tileSets: l,
      tileMaps: s,
      activeTileSetId: (i == null ? void 0 : i.id) ?? null,
      activeTileMapId: ((r = s[0]) == null ? void 0 : r.id) ?? null,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: (i == null ? void 0 : i.columns) ?? 8,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: (i == null ? void 0 : i.rows) ?? 3,
      tileDebugOverlay: !1,
      nineSlice: null
    };
  }),
  setActiveTileSet: (n) => e((s) => {
    const l = s.tileSets.find((i) => i.id === n);
    return {
      activeTileSetId: n,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: (l == null ? void 0 : l.columns) ?? s.tilePaletteColumns,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: (l == null ? void 0 : l.rows) ?? s.tilePaletteRowsMin,
      tileDebugOverlay: !1,
      nineSlice: null
    };
  }),
  setActiveTileMap: (n) => e({ activeTileMapId: n }),
  setSelectedTileIndex: (n) => e({
    selectedTileIndex: Math.max(0, n),
    selectedTileIndices: [Math.max(0, n)],
    selectedTileCols: 1,
    selectedTileRows: 1
  }),
  setTileSelection: (n, s, l, i) => e({
    selectedTileIndex: Math.max(0, i),
    selectedTileIndices: n,
    selectedTileCols: Math.max(1, s),
    selectedTileRows: Math.max(1, l)
  }),
  setTilePage: (n) => e((s) => {
    const l = Math.max(0, s.tilePageCount - 1);
    return { tilePage: Math.min(l, Math.max(0, Math.floor(n))) };
  }),
  setTilePageCount: (n) => e((s) => {
    const l = Math.max(1, Math.floor(n)), i = Math.max(0, l - 1), r = Math.min(s.tilePage, i);
    return s.tilePageCount === l && s.tilePage === r ? s : {
      tilePageCount: l,
      tilePage: r
    };
  }),
  setTilePaletteColumns: (n) => e((s) => ({
    tilePaletteColumns: Math.min(vx, Math.max(1, n)),
    selectedTileIndices: [s.selectedTileIndex],
    selectedTileCols: 1,
    selectedTileRows: 1
  })),
  setTilePaletteOffset: (n) => e((s) => ({
    tilePaletteOffset: Math.max(0, Math.floor(n)),
    selectedTileIndices: [s.selectedTileIndex],
    selectedTileCols: 1,
    selectedTileRows: 1
  })),
  setTilePaletteRowsMin: (n) => e((s) => ({
    tilePaletteRowsMin: Math.max(1, Math.floor(n)),
    selectedTileIndices: [s.selectedTileIndex],
    selectedTileCols: 1,
    selectedTileRows: 1
  })),
  setTilePickerZoom: (n) => e({
    tilePickerZoom: Number.isFinite(n) && n > 0 ? i1(n) : yc
  }),
  setTilePlacementMode: (n) => e({
    tilePlacementMode: n === "soft" ? "soft" : "hard"
  }),
  setTilePenSnapToCluster: (n) => e({
    tilePenSnapToCluster: !!n
  }),
  setTileDebugOverlay: (n) => e({ tileDebugOverlay: n }),
  setNineSlice: (n) => e({ nineSlice: n }),
  setTileSetLayout: (n, s, l) => {
    const i = t().tileSets.find((c) => c.id === n);
    if (!i)
      return;
    const r = Oo(s, i.columns), o = Oo(l, i.rows);
    i.columns === r && i.rows === o || (ve.getState().setDirty(!0), e((c) => ({
      tileSets: c.tileSets.map(
        (u) => u.id === n ? { ...u, columns: r, rows: o } : u
      ),
      tilePaletteColumns: c.activeTileSetId === n ? r : c.tilePaletteColumns,
      tilePaletteRowsMin: c.activeTileSetId === n ? o : c.tilePaletteRowsMin
    })));
  },
  renameTileSet: (n, s) => {
    const l = s.trim();
    if (!l)
      return;
    const i = t().tileSets.find((r) => r.id === n);
    !i || i.name === l || (ve.getState().setDirty(!0), e((r) => ({
      tileSets: r.tileSets.map(
        (o) => o.id === n ? { ...o, name: l } : o
      )
    })));
  },
  deleteTileSet: (n) => {
    var h;
    const s = t(), l = s.tileSets.findIndex((p) => p.id === n);
    if (l < 0)
      return;
    const i = s.tileSets.filter((p) => p.id !== n), r = s.tileMaps.filter((p) => p.tileSetId !== n), o = (() => {
      var d;
      if (s.activeTileSetId && s.activeTileSetId !== n)
        return s.activeTileSetId;
      const p = Math.min(l, Math.max(0, i.length - 1));
      return ((d = i[p]) == null ? void 0 : d.id) ?? null;
    })(), c = i.find((p) => p.id === o) ?? i[0], u = (() => {
      var f;
      if (r.some((m) => m.id === s.activeTileMapId))
        return s.activeTileMapId;
      const d = r.find(
        (m) => m.tileSetId === ((c == null ? void 0 : c.id) ?? null)
      );
      return (d == null ? void 0 : d.id) ?? ((f = r[0]) == null ? void 0 : f.id) ?? null;
    })();
    ve.getState().setDirty(!0), e({
      tileSets: i,
      tileMaps: r,
      activeTileSetId: (c == null ? void 0 : c.id) ?? null,
      activeTileMapId: u,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: (c == null ? void 0 : c.columns) ?? s.tilePaletteColumns,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: (c == null ? void 0 : c.rows) ?? s.tilePaletteRowsMin,
      nineSlice: ((h = s.nineSlice) == null ? void 0 : h.tileSetId) === n ? null : s.nineSlice
    });
  },
  duplicateTileSet: (n) => {
    const s = t(), l = s.tileSets.find((o) => o.id === n);
    if (!l)
      return null;
    const i = hi("tileset"), r = {
      ...l,
      id: i,
      name: o1(
        l.name,
        s.tileSets.map((o) => o.name)
      ),
      tiles: l.tiles.map((o) => ({
        ...o,
        id: hi("tile"),
        pixels: o.pixels.slice()
      }))
    };
    return ve.getState().setDirty(!0), e((o) => ({
      tileSets: [...o.tileSets, r],
      activeTileSetId: i,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: r.columns,
      tilePaletteRowsMin: r.rows,
      tilePaletteOffset: 0,
      nineSlice: null
    })), i;
  },
  addTileSet: (n) => {
    const { id: s, ...l } = n, i = s ?? hi("tileset"), r = vc({ id: i, ...l });
    return ve.getState().setDirty(!0), e((o) => ({
      tileSets: [...o.tileSets, r],
      activeTileSetId: i,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: r.columns,
      tilePaletteRowsMin: r.rows,
      tilePaletteOffset: 0
    })), i;
  },
  appendTilesToSet: (n, s) => {
    s.length !== 0 && (ve.getState().setDirty(!0), e((l) => ({
      tileSets: l.tileSets.map((i) => {
        if (i.id !== n)
          return i;
        const r = s.map((o) => ({
          id: hi("tile"),
          ...o
        }));
        return { ...i, tiles: [...i.tiles, ...r] };
      })
    })));
  },
  refreshCanvasSourcedTiles: (n, s) => {
    if (!n && s.length === 0)
      return;
    const l = n ? null : new Set(s.map((o) => `${o.row}:${o.col}`)), i = ee.getState(), r = (o, c, u, h) => {
      if (!l)
        return !0;
      const p = o, d = c, f = o + Math.max(0, u - 1), m = c + Math.max(0, h - 1), w = Math.floor(p / Y), M = Math.floor(f / Y), v = Math.floor(d / Y), g = Math.floor(m / Y);
      for (let y = v; y <= g; y += 1)
        for (let S = w; S <= M; S += 1)
          if (l.has(`${y}:${S}`))
            return !0;
      return !1;
    };
    e((o) => {
      let c = !1;
      const u = o.tileSets.map((h) => {
        const p = h.tileWidth, d = h.tileHeight;
        let f = !1;
        const m = h.tiles.map((w) => {
          const M = w.source;
          if (!M || M.kind !== "canvas" || !r(M.x, M.y, p, d))
            return w;
          const v = [];
          for (let g = 0; g < d; g += 1)
            for (let y = 0; y < p; y += 1)
              v.push(i.getPixelComposite(M.x + y, M.y + g));
          return c = !0, f = !0, { ...w, pixels: v };
        });
        return f ? { ...h, tiles: m } : h;
      });
      return c ? { tileSets: u } : o;
    });
  },
  deleteTilesFromSet: (n, s) => {
    if (s.length === 0)
      return;
    const l = Array.from(new Set(s.filter((r) => r >= 0)));
    if (l.length === 0)
      return;
    const i = new Set(l);
    ve.getState().setDirty(!0), e((r) => {
      var g;
      const o = r.tileSets.find((y) => y.id === n);
      if (!o)
        return r;
      const c = new Set(
        Array.from(i).filter((y) => y >= 0 && y < o.tiles.length)
      );
      if (c.size === 0)
        return r;
      const { nextTiles: u, indexMap: h, nextColumns: p, nextRows: d } = c1(
        o,
        c
      ), f = (y) => y.map((S) => S >= 0 ? h.get(S) ?? -1 : -1), m = f(r.selectedTileIndices).filter(
        (y) => y >= 0
      ), w = (u.length > 0, 0), v = (m.length > 0 ? m : [w])[0] ?? w;
      return {
        tileSets: r.tileSets.map(
          (y) => y.id === n ? { ...y, tiles: u, columns: p, rows: d } : y
        ),
        tileMaps: r.tileMaps.map((y) => {
          if (y.tileSetId !== n)
            return y;
          const S = y.tiles.map((b) => b < 0 ? -1 : h.get(b) ?? -1);
          return { ...y, tiles: S };
        }),
        selectedTileIndex: v,
        selectedTileIndices: [v],
        selectedTileCols: 1,
        selectedTileRows: 1,
        tilePaletteColumns: r.activeTileSetId === n ? p : r.tilePaletteColumns,
        tilePaletteRowsMin: r.activeTileSetId === n ? d : r.tilePaletteRowsMin,
        nineSlice: ((g = r.nineSlice) == null ? void 0 : g.tileSetId) === n && r.nineSlice.tiles.length > 0 ? {
          ...r.nineSlice,
          tiles: f(r.nineSlice.tiles)
        } : r.nineSlice
      };
    });
  },
  consolidateTileSet: (n) => {
    ve.getState().setDirty(!0), e((s) => {
      var m;
      const l = s.tileSets.find((w) => w.id === n);
      if (!l)
        return s;
      const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), o = [];
      let c = 0;
      l.tiles.forEach((w, M) => {
        const v = w.pixels.join(","), g = r.get(v);
        if (g !== void 0) {
          i.set(M, g);
          return;
        }
        r.set(v, c), i.set(M, c), o.push(w), c += 1;
      });
      const u = (w) => w.map((M) => M >= 0 ? i.get(M) ?? -1 : -1), h = u(s.selectedTileIndices).filter(
        (w) => w >= 0
      ), p = (o.length > 0, 0), f = (h.length > 0 ? h : [p])[0] ?? p;
      return {
        tileSets: s.tileSets.map(
          (w) => w.id === n ? { ...w, tiles: o } : w
        ),
        tileMaps: s.tileMaps.map((w) => {
          if (w.tileSetId !== n)
            return w;
          const M = w.tiles.map((v) => v < 0 ? -1 : i.get(v) ?? -1);
          return { ...w, tiles: M };
        }),
        selectedTileIndex: f,
        selectedTileIndices: [f],
        selectedTileCols: 1,
        selectedTileRows: 1,
        nineSlice: ((m = s.nineSlice) == null ? void 0 : m.tileSetId) === n && s.nineSlice.tiles.length > 0 ? {
          ...s.nineSlice,
          tiles: u(s.nineSlice.tiles)
        } : s.nineSlice
      };
    });
  },
  addTileMap: (n) => {
    const { id: s, ...l } = n, i = s ?? hi("tilemap"), r = { id: i, ...l };
    return ve.getState().setDirty(!0), e((o) => ({
      tileMaps: [...o.tileMaps, r],
      activeTileMapId: i
    })), i;
  },
  setTileMapTiles: (n, s) => {
    s.length !== 0 && (ve.getState().setDirty(!0), e((l) => ({
      tileMaps: l.tileMaps.map((i) => {
        if (i.id !== n)
          return i;
        const r = i.tiles.slice();
        for (const o of s)
          o.index < 0 || o.index >= r.length || (r[o.index] = o.tile);
        return { ...i, tiles: r };
      })
    })));
  },
  expandTileMapToInclude: (n, s, l, i, r, o, c) => {
    const h = t().tileMaps.find((y) => y.id === n);
    if (!h)
      return null;
    const p = Math.max(0, -s), d = Math.max(0, -i), f = Math.max(0, l - (h.columns - 1)), m = Math.max(0, r - (h.rows - 1));
    if (p === 0 && d === 0 && f === 0 && m === 0)
      return h;
    const w = h.columns + p + f, M = h.rows + d + m, v = new Array(w * M).fill(-1);
    for (let y = 0; y < h.rows; y += 1)
      for (let S = 0; S < h.columns; S += 1) {
        const b = y * h.columns + S, _ = (y + d) * w + (S + p);
        v[_] = h.tiles[b] ?? -1;
      }
    const g = {
      ...h,
      originX: h.originX - p * o,
      originY: h.originY - d * c,
      columns: w,
      rows: M,
      tiles: v
    };
    return ve.getState().setDirty(!0), e((y) => ({
      tileMaps: y.tileMaps.map((S) => S.id === n ? g : S)
    })), g;
  },
  clear: () => e({
    tileSets: [],
    tileMaps: [],
    activeTileSetId: null,
    activeTileMapId: null,
    selectedTileIndex: 0,
    selectedTileIndices: [0],
    selectedTileCols: 1,
    selectedTileRows: 1,
    tilePage: 0,
    tilePageCount: 1,
    tilePaletteColumns: 8,
    tilePaletteOffset: 0,
    tilePaletteRowsMin: 3,
    tilePickerZoom: yc,
    tilePlacementMode: "hard",
    tilePenSnapToCluster: !1,
    tileDebugOverlay: !1,
    nineSlice: null
  })
})), u1 = (e) => ({
  ...e,
  pixels: e.pixels.slice(),
  source: e.source ? { ...e.source } : void 0
}), wx = (e) => ({
  ...e,
  tiles: e.tiles.map(u1)
}), Sx = (e) => ({
  ...e,
  tiles: e.tiles.slice()
}), Au = (e) => ({
  tileSets: e.tileSets.map(wx),
  tileMaps: e.tileMaps.map(Sx),
  activeTileSetId: e.activeTileSetId,
  activeTileMapId: e.activeTileMapId,
  selectedTileIndex: e.selectedTileIndex,
  selectedTileIndices: e.selectedTileIndices.slice(),
  selectedTileCols: e.selectedTileCols,
  selectedTileRows: e.selectedTileRows,
  tilePaletteColumns: e.tilePaletteColumns,
  tilePaletteOffset: e.tilePaletteOffset,
  tilePaletteRowsMin: e.tilePaletteRowsMin,
  nineSlice: e.nineSlice ? {
    tileSetId: e.nineSlice.tileSetId,
    tiles: e.nineSlice.tiles.slice()
  } : null
}), Ht = () => {
  const e = V.getState();
  return {
    tileSets: e.tileSets.map(wx),
    tileMaps: e.tileMaps.map(Sx),
    activeTileSetId: e.activeTileSetId,
    activeTileMapId: e.activeTileMapId,
    selectedTileIndex: e.selectedTileIndex,
    selectedTileIndices: e.selectedTileIndices.slice(),
    selectedTileCols: e.selectedTileCols,
    selectedTileRows: e.selectedTileRows,
    tilePaletteColumns: e.tilePaletteColumns,
    tilePaletteOffset: e.tilePaletteOffset,
    tilePaletteRowsMin: e.tilePaletteRowsMin,
    nineSlice: e.nineSlice ? {
      tileSetId: e.nineSlice.tileSetId,
      tiles: e.nineSlice.tiles.slice()
    } : null
  };
}, d1 = (e, t) => JSON.stringify(e) === JSON.stringify(t), qs = (e, t) => d1(e, t) ? !1 : (Be.getState().pushBatch({
  changes: [],
  tileBefore: e,
  tileAfter: t
}), !0), op = (e) => {
  const t = Au(e);
  V.setState({
    tileSets: t.tileSets,
    tileMaps: t.tileMaps,
    activeTileSetId: t.activeTileSetId,
    activeTileMapId: t.activeTileMapId,
    selectedTileIndex: t.selectedTileIndex,
    selectedTileIndices: t.selectedTileIndices,
    selectedTileCols: t.selectedTileCols,
    selectedTileRows: t.selectedTileRows,
    tilePaletteColumns: t.tilePaletteColumns,
    tilePaletteOffset: t.tilePaletteOffset,
    tilePaletteRowsMin: t.tilePaletteRowsMin,
    nineSlice: t.nineSlice
  });
}, Be = nt((e, t) => ({
  locked: !1,
  undoStack: [],
  redoStack: [],
  pushBatch: (n) => {
    if (n.changes.length === 0 && !n.tileBefore && !n.tileAfter)
      return;
    ve.getState().setDirty(!0);
    const s = {
      layerId: n.changes.length > 0 ? n.layerId ?? ee.getState().activeLayerId : n.layerId,
      changes: n.changes,
      tileBefore: n.tileBefore ? Au(n.tileBefore) : void 0,
      tileAfter: n.tileAfter ? Au(n.tileAfter) : void 0
    };
    e((l) => ({
      undoStack: [...l.undoStack, s].slice(-8),
      redoStack: []
    }));
  },
  undo: () => {
    const n = t();
    if (n.locked)
      return;
    const s = n.undoStack[n.undoStack.length - 1];
    if (s) {
      if (ve.getState().setDirty(!0), s.changes.length > 0) {
        const l = ee.getState(), i = s.layerId ?? l.activeLayerId;
        for (const r of s.changes)
          l.setPixelInLayer(i, r.x, r.y, r.prev);
      }
      s.tileBefore && op(s.tileBefore), e((l) => ({
        undoStack: l.undoStack.slice(0, -1),
        redoStack: [...l.redoStack, s]
      }));
    }
  },
  redo: () => {
    const n = t();
    if (n.locked)
      return;
    const s = n.redoStack[n.redoStack.length - 1];
    if (s) {
      if (ve.getState().setDirty(!0), s.changes.length > 0) {
        const l = ee.getState(), i = s.layerId ?? l.activeLayerId;
        for (const r of s.changes)
          l.setPixelInLayer(i, r.x, r.y, r.next);
      }
      s.tileAfter && op(s.tileAfter), e((l) => ({
        undoStack: [...l.undoStack, s].slice(-8),
        redoStack: l.redoStack.slice(0, -1)
      }));
    }
  },
  setLocked: (n) => e({ locked: n }),
  setStacks: (n, s) => e({
    undoStack: n.slice(-8),
    redoStack: s.slice(-8)
  }),
  clear: () => e({ undoStack: [], redoStack: [] })
})), gn = nt((e) => ({
  size: 1,
  shape: "point",
  setSize: (t) => e({ size: t }),
  setShape: (t) => e({ shape: t })
})), Ls = new ml(), ap = (e, t) => `${e}:${t}`, we = nt((e, t) => ({
  store: Ls,
  version: 0,
  selectedCount: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  setSelection: (n, s, l) => {
    const i = Ls.getPixel(n, s), r = l ? 1 : 0;
    if (i === r)
      return;
    Ls.setPixel(n, s, r);
    const o = Math.floor(s / Y), c = Math.floor(n / Y);
    e((u) => {
      const h = new Set(u.dirtyBlocks);
      h.add(ap(o, c));
      const p = u.selectedCount + (r === 1 ? 1 : -1);
      return { version: u.version + 1, dirtyBlocks: h, selectedCount: p };
    });
  },
  setSelections: (n) => {
    if (n.length === 0)
      return;
    const s = new Set(t().dirtyBlocks);
    let l = 0;
    for (const i of n) {
      const r = Ls.getPixel(i.x, i.y), o = i.selected ? 1 : 0;
      if (r === o)
        continue;
      Ls.setPixel(i.x, i.y, o);
      const c = Math.floor(i.y / Y), u = Math.floor(i.x / Y);
      s.add(ap(c, u)), l += o === 1 ? 1 : -1;
    }
    e((i) => ({
      version: i.version + 1,
      dirtyBlocks: s,
      selectedCount: Math.max(0, i.selectedCount + l)
    }));
  },
  isSelected: (n, s) => Ls.getPixel(n, s) === 1,
  clear: () => {
    Ls.clear(), e((n) => ({
      version: n.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0,
      selectedCount: 0
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll: n, dirtyBlocks: s } = t(), l = Array.from(s).map((i) => {
      const [r, o] = i.split(":");
      return { row: Number(r), col: Number(o) };
    });
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), h1 = [
  "importImage",
  "exportPng",
  "exportTileMap",
  "exportImage",
  "recording",
  "ai",
  "options",
  "menuActions",
  "viewMenuState",
  "fullscreenToggle"
], f1 = () => {
  if (typeof window > "u")
    return null;
  const e = window.__PSS_PLATFORM_CAPABILITIES__;
  return !e || typeof e != "object" ? null : e;
}, p1 = (e, t) => {
  if (!t)
    return e;
  const n = { ...e };
  for (const s of h1)
    s in t && (n[s] = !!t[s]);
  return n;
}, m1 = (e) => {
  var t, n, s, l, i, r, o, c, u, h, p;
  return {
    importImage: !!((t = e.projectApi) != null && t.importImage),
    exportPng: !!((n = e.projectApi) != null && n.exportPng),
    exportTileMap: !!((s = e.projectApi) != null && s.exportTileMap),
    exportImage: !!((l = e.projectApi) != null && l.exportImage),
    recording: !!((i = e.recordingApi) != null && i.start && ((r = e.recordingApi) != null && r.stop)),
    ai: !!((o = e.aiApi) != null && o.generateSprite),
    options: !!((c = e.optionsApi) != null && c.getAdvancedMode),
    menuActions: !!((u = e.menuApi) != null && u.onAction),
    viewMenuState: !!((h = e.viewMenuApi) != null && h.setState),
    fullscreenToggle: !!((p = e.windowApi) != null && p.toggleFullscreen)
  };
}, B = {
  alert(e) {
    window.alert(e);
  },
  project() {
    return window.projectApi;
  },
  menu() {
    return window.menuApi;
  },
  viewMenu() {
    return window.viewMenuApi;
  },
  app() {
    return window.appApi;
  },
  appWindow() {
    return window.windowApi;
  },
  debug() {
    return window.debugApi;
  },
  recording() {
    return window.recordingApi;
  },
  palette() {
    return window.paletteApi;
  },
  options() {
    return window.optionsApi;
  },
  ai() {
    return window.aiApi;
  },
  uiScale() {
    return window.uiScaleApi;
  },
  capabilities() {
    const e = m1({
      projectApi: this.project(),
      menuApi: this.menu(),
      viewMenuApi: this.viewMenu(),
      windowApi: this.appWindow(),
      recordingApi: this.recording(),
      optionsApi: this.options(),
      aiApi: this.ai()
    });
    return p1(e, f1());
  },
  onCapabilitiesChange(e) {
    if (typeof window > "u")
      return () => {
      };
    const t = () => {
      e(this.capabilities());
    };
    return window.addEventListener("pss:capabilities", t), () => {
      window.removeEventListener("pss:capabilities", t);
    };
  }
}, g1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, cp = (e, t, n) => {
  const s = we.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || $.getState().setPixel(e, t, n);
}, Mx = (e, t, n) => {
  const { size: s, shape: l } = gn.getState();
  if (l === "point") {
    cp(e, t, n);
    return;
  }
  const i = g1(s, l);
  for (const [r, o] of i)
    cp(e + r, t + o, n);
}, wc = (e, t) => {
  const n = Math.floor(e.canvasX / k), s = Math.floor(e.canvasY / k);
  Mx(n, s, t);
};
class x1 {
  constructor() {
    this.id = "pen", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.changes = /* @__PURE__ */ new Map(), this.lastPoint = null, this.onHover = (t) => {
      if (this.drawing)
        return;
      $.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex();
      wc(t, l);
    }, this.onBegin = (t) => {
      $.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), wc(t, this.activeIndex), this.lastPoint = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
      if (this.lastPoint) {
        const s = Math.abs(n.x - this.lastPoint.x), l = Math.abs(n.y - this.lastPoint.y), i = this.lastPoint.x < n.x ? 1 : -1, r = this.lastPoint.y < n.y ? 1 : -1;
        let o = s - l, c = this.lastPoint.x, u = this.lastPoint.y;
        for (; Mx(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
          const h = 2 * o;
          h > -l && (o -= l, c += i), h < s && (o += s, u += r);
        }
      } else
        wc(t, this.activeIndex);
      this.lastPoint = n;
    }, this.onEnd = () => {
      var p;
      if (!this.drawing)
        return;
      const t = performance.now(), n = $.getState(), s = ee.getState(), l = this.layerId ?? s.activeLayerId, i = [];
      let r = 0;
      for (const d of n.entries()) {
        r += 1;
        const f = `${d.x}:${d.y}`;
        if (!this.changes.has(f))
          this.changes.set(f, {
            x: d.x,
            y: d.y,
            prev: s.getPixelInLayer(l, d.x, d.y),
            next: d.paletteIndex
          });
        else {
          const m = this.changes.get(f);
          m && (m.next = d.paletteIndex);
        }
        i.push({ x: d.x, y: d.y, paletteIndex: d.paletteIndex });
      }
      s.setPixelsInLayer(l, i);
      const o = performance.now();
      Be.getState().pushBatch({ layerId: l, changes: Array.from(this.changes.values()) });
      const u = performance.now();
      this.changes.clear(), n.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
      const h = performance.now();
      (p = B.debug()) == null || p.logPerf(
        [
          "pen:onEnd",
          `entries=${r}`,
          `pixelsMs=${(o - t).toFixed(2)}`,
          `historyMs=${(u - o).toFixed(2)}`,
          `totalMs=${(h - t).toFixed(2)}`
        ].join(" ")
      );
    }, this.onCancel = () => {
      $.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
    };
  }
}
const Sc = (e, t, n) => Math.min(n, Math.max(t, e)), Zt = nt((e) => ({
  radius: 6,
  density: 250,
  falloff: 0.25,
  deterministic: !1,
  seed: 1,
  setRadius: (t) => e({ radius: Sc(Math.round(t), 1, 64) }),
  setDensity: (t) => e({ density: Sc(Math.round(t), 1, 2e4) }),
  setFalloff: (t) => e({ falloff: Sc(t, 0, 1) }),
  setDeterministic: (t) => e({ deterministic: t }),
  setSeed: (t) => e({ seed: Math.max(0, Math.round(t)) })
})), up = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), y1 = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), dp = (e, t, n, s) => {
  const l = we.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || $.getState().setPixel(t, n, s);
}, v1 = () => {
  const e = re.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, w1 = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class S1 {
  constructor() {
    this.id = "spray", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.lastCursor = null, this.frameHandle = null, this.lastFrameTime = 0, this.emissionBudget = 0, this.changes = /* @__PURE__ */ new Map(), this.rng = null, this.step = (t) => {
      if (!this.drawing || !this.lastCursor) {
        this.stopLoop();
        return;
      }
      const n = Zt.getState(), s = this.lastCursor, l = this.lastFrameTime === 0 ? 0 : t - this.lastFrameTime;
      this.lastFrameTime = t;
      const i = Math.min(0.1, Math.max(0, l / 1e3));
      this.emissionBudget += n.density * i;
      const o = Math.min(1500, Math.floor(this.emissionBudget));
      if (this.emissionBudget -= o, o > 0) {
        const c = Math.floor(s.canvasX / k), u = Math.floor(s.canvasY / k), h = Math.max(1, n.radius), d = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, f = this.rng ?? Math.random, m = this.activeIndex === 0 ? [0] : v1(), w = m.length > 1, M = w ? m : null, v = m[0] ?? this.activeIndex;
        for (let g = 0; g < o; g += 1) {
          const y = f() * Math.PI * 2, S = f(), b = Math.pow(S, d) * h, _ = Math.round(Math.cos(y) * b), C = Math.round(Math.sin(y) * b), j = w ? (M == null ? void 0 : M[Math.floor(f() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : v;
          dp(s, c + _, u + C, j);
        }
      }
      this.frameHandle = up(this.step);
    }, this.onHover = (t) => {
      if (this.drawing)
        return;
      $.getState().clear();
      const s = re.getState(), l = Math.floor(t.canvasX / k), i = Math.floor(t.canvasY / k), r = t.alt ? 0 : s.getActiveIndex();
      dp(t, l, i, r);
    }, this.onBegin = (t) => {
      $.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), this.lastCursor = t, this.emissionBudget = 0, this.lastFrameTime = typeof requestAnimationFrame == "function" ? performance.now() : Date.now();
      const { deterministic: l, seed: i } = Zt.getState();
      this.rng = l ? w1(i) : null, this.stopLoop(), this.frameHandle = up(this.step);
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      this.lastCursor = t;
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      this.stopLoop();
      const t = $.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId, l = [];
      for (const i of t.entries()) {
        const r = `${i.x}:${i.y}`;
        if (!this.changes.has(r))
          this.changes.set(r, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const o = this.changes.get(r);
          o && (o.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      n.setPixelsInLayer(s, l), Be.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    }, this.onCancel = () => {
      this.stopLoop(), $.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    };
  }
  stopLoop() {
    this.frameHandle != null && (y1(this.frameHandle), this.frameHandle = null);
  }
}
const po = (e) => Math.min(255, Math.max(0, Math.round(e))), wt = (e) => {
  const t = e.trim();
  if (!t.startsWith("#"))
    return null;
  const n = t.slice(1);
  if (n.length === 3) {
    const s = Number.parseInt(n[0] + n[0], 16), l = Number.parseInt(n[1] + n[1], 16), i = Number.parseInt(n[2] + n[2], 16);
    return Number.isNaN(s) || Number.isNaN(l) || Number.isNaN(i) ? null : { r: s, g: l, b: i };
  }
  if (n.length === 6) {
    const s = Number.parseInt(n.slice(0, 2), 16), l = Number.parseInt(n.slice(2, 4), 16), i = Number.parseInt(n.slice(4, 6), 16);
    return Number.isNaN(s) || Number.isNaN(l) || Number.isNaN(i) ? null : { r: s, g: l, b: i };
  }
  return null;
}, Ld = (e) => `rgb(${e.r}, ${e.g}, ${e.b})`, dn = (e, t) => `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`, ds = (e, t, n) => ({
  r: po(e.r + (t.r - e.r) * n),
  g: po(e.g + (t.g - e.g) * n),
  b: po(e.b + (t.b - e.b) * n)
}), Mc = (e) => po(e).toString(16).padStart(2, "0"), $l = (e) => `#${Mc(e.r)}${Mc(e.g)}${Mc(e.b)}`, pa = (e) => ({
  r: 255 - e.r,
  g: 255 - e.g,
  b: 255 - e.b
}), M1 = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, b1 = (e) => M1(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, _1 = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), ma = (e, t, n = 60) => _1(e, t) < n ? b1(e) : t, bt = nt((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), ga = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, Lu = (e, t, n) => Math.min(n, Math.max(t, e)), T1 = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, C1 = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, k1 = [
  [0, 2],
  [3, 1]
], j1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], P1 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], N1 = (e, t, n) => e === "bayer2" ? (k1[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (j1[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (P1[n & 7][t & 7] + 0.5) / 64 : e === "random" ? T1(t, n) : e === "blue-noise" ? C1(t, n) : 0.5, hp = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const i = n.maxX - n.minX, r = n.maxY - n.minY, o = i === 0 ? 1 : i, c = r === 0 ? 1 : r, u = e - n.minX, h = t - n.minY;
  let p = 0;
  return s === "top-bottom" ? p = h / c : s === "bottom-top" ? p = 1 - h / c : s === "left-right" ? p = u / o : s === "right-left" && (p = 1 - u / o), p = Lu(p, 0, 1), p * (l - 1);
}, I1 = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", E1 = (e) => e === "floyd-steinberg" ? [
  { dx: 1, dy: 0, weight: 7 },
  { dx: -1, dy: 1, weight: 3 },
  { dx: 0, dy: 1, weight: 5 },
  { dx: 1, dy: 1, weight: 1 }
] : e === "atkinson" ? [
  { dx: 1, dy: 0, weight: 1 },
  { dx: 2, dy: 0, weight: 1 },
  { dx: -1, dy: 1, weight: 1 },
  { dx: 0, dy: 1, weight: 1 },
  { dx: 1, dy: 1, weight: 1 },
  { dx: 0, dy: 2, weight: 1 }
] : e === "jarvis-judice-ninke" ? [
  { dx: 1, dy: 0, weight: 7 },
  { dx: 2, dy: 0, weight: 5 },
  { dx: -2, dy: 1, weight: 3 },
  { dx: -1, dy: 1, weight: 5 },
  { dx: 0, dy: 1, weight: 7 },
  { dx: 1, dy: 1, weight: 5 },
  { dx: 2, dy: 1, weight: 3 },
  { dx: -2, dy: 2, weight: 1 },
  { dx: -1, dy: 2, weight: 3 },
  { dx: 0, dy: 2, weight: 5 },
  { dx: 1, dy: 2, weight: 3 },
  { dx: 2, dy: 2, weight: 1 }
] : [
  { dx: 1, dy: 0, weight: 8 },
  { dx: 2, dy: 0, weight: 4 },
  { dx: -2, dy: 1, weight: 2 },
  { dx: -1, dy: 1, weight: 4 },
  { dx: 0, dy: 1, weight: 8 },
  { dx: 1, dy: 1, weight: 4 },
  { dx: 2, dy: 1, weight: 2 },
  { dx: -2, dy: 2, weight: 1 },
  { dx: -1, dy: 2, weight: 2 },
  { dx: 0, dy: 2, weight: 4 },
  { dx: 1, dy: 2, weight: 2 },
  { dx: 2, dy: 2, weight: 1 }
], qi = (e, t, n, s, l) => {
  const i = n.length, r = /* @__PURE__ */ new Map();
  if (i === 0 || e.length === 0)
    return r;
  if (!I1(l)) {
    for (const A of e) {
      const L = hp(A.x, A.y, t, s, i), F = Math.floor(L), P = L - F, z = N1(l, A.x, A.y), Z = P > z ? F + 1 : F, oe = Lu(Z, 0, i - 1);
      r.set(`${A.x}:${A.y}`, n[oe] ?? 0);
    }
    return r;
  }
  const o = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = o * c, h = Number.isFinite(u) && u > 0 && u <= 2e6;
  let p = null, d = null, f = null, m = null;
  if (h) {
    p = new Uint8Array(u), d = new Float32Array(u);
    for (const A of e) {
      const L = (A.y - t.minY) * o + (A.x - t.minX);
      L >= 0 && L < p.length && (p[L] = 1);
    }
  } else {
    f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const A of e)
      f.add(`${A.x}:${A.y}`);
  }
  const w = (A, L) => {
    if (p) {
      const F = (L - t.minY) * o + (A - t.minX);
      return F >= 0 && F < p.length && p[F] === 1;
    }
    return (f == null ? void 0 : f.has(`${A}:${L}`)) ?? !1;
  }, M = (A, L) => {
    if (d) {
      const F = (L - t.minY) * o + (A - t.minX);
      return d[F] ?? 0;
    }
    return (m == null ? void 0 : m.get(`${A}:${L}`)) ?? 0;
  }, v = (A, L, F) => {
    if (!w(A, L))
      return;
    if (d) {
      const z = (L - t.minY) * o + (A - t.minX);
      d[z] += F;
      return;
    }
    const P = `${A}:${L}`;
    m == null || m.set(P, (m.get(P) ?? 0) + F);
  }, g = s === "right-left" ? -1 : 1, y = s === "bottom-top" ? -1 : 1, S = g > 0 ? t.minX : t.maxX, b = g > 0 ? t.maxX : t.minX, _ = y > 0 ? t.minY : t.maxY, C = y > 0 ? t.maxY : t.minY, j = E1(l);
  for (let A = _; y > 0 ? A <= C : A >= C; A += y)
    for (let L = S; g > 0 ? L <= b : L >= b; L += g) {
      if (!w(L, A))
        continue;
      const P = hp(L, A, t, s, i) + M(L, A), z = Lu(Math.round(P), 0, i - 1);
      r.set(`${L}:${A}`, n[z] ?? 0);
      const Z = P - z;
      if (!Number.isFinite(Z) || Z === 0)
        continue;
      const oe = [];
      let G = 0;
      for (const ne of j) {
        const D = L + ne.dx * g, H = A + ne.dy * y;
        w(D, H) && (oe.push({ x: D, y: H, weight: ne.weight }), G += ne.weight);
      }
      if (!(G <= 0))
        for (const ne of oe)
          v(ne.x, ne.y, Z * ne.weight / G);
    }
  return r;
}, Bu = (e, t, n) => {
  const s = we.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || $.getState().setPixel(e, t, n);
}, R1 = (e, t, n, s, l) => {
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const o = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; Bu(e, t, l), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += o), h < i && (u += i, t += c);
  }
}, A1 = (e, t, n, s) => {
  const l = [];
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const o = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; l.push({ x: e, y: t }), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += o), h < i && (u += i, t += c);
  }
  return l;
};
class L1 {
  constructor() {
    this.id = "line", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onHover = (t) => {
      if (this.start)
        return;
      $.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex(), i = Math.floor(t.canvasX / k), r = Math.floor(t.canvasY / k);
      Bu(i, r, l);
    }, this.onBegin = (t) => {
      $.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : ga(), this.start = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      $.getState().clear();
      const s = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
      let l = s;
      if (t.shift) {
        const r = s.x - this.start.x, o = s.y - this.start.y, c = Math.atan2(o, r), u = Math.round(c / (Math.PI / 4)) * (Math.PI / 4), h = Math.max(Math.abs(r), Math.abs(o));
        l = {
          x: this.start.x + Math.round(Math.cos(u) * h),
          y: this.start.y + Math.round(Math.sin(u) * h)
        };
      }
      const i = this.activeRamp.length > 1 ? this.activeRamp : [];
      if (i.length > 1) {
        const r = {
          minX: Math.min(this.start.x, l.x),
          maxX: Math.max(this.start.x, l.x),
          minY: Math.min(this.start.y, l.y),
          maxY: Math.max(this.start.y, l.y)
        }, o = A1(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = bt.getState(), h = qi(
          o,
          r,
          i,
          c,
          u
        );
        for (const p of o)
          Bu(p.x, p.y, h.get(`${p.x}:${p.y}`) ?? i[0] ?? 0);
      } else
        R1(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = $.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      for (const i of t.entries()) {
        const r = `${i.x}:${i.y}`;
        if (!this.changes.has(r))
          this.changes.set(r, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const o = this.changes.get(r);
          o && (o.next = i.paletteIndex);
        }
        n.setPixelInLayer(s, i.x, i.y, i.paletteIndex);
      }
      Be.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const zo = nt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), B1 = (e, t, n) => {
  const s = we.getState(), l = $.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), o = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = o; u <= c; u += 1)
    for (let h = i; h <= r; h += 1)
      s.selectedCount > 0 && !s.isSelected(h, u) || l.setPixel(h, u, n);
}, D1 = (e, t, n) => {
  const s = we.getState(), l = $.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), o = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = i; u <= r; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, o)) && l.setPixel(u, o, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = o + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n), (s.selectedCount === 0 || s.isSelected(r, u)) && l.setPixel(r, u, n);
};
class Y1 {
  constructor() {
    this.id = "rectangle", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      $.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : ga(), this.start = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = $.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      }, l = zo.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], r = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const o = we.getState(), c = [];
        if (l === "filled")
          for (let d = r.minY; d <= r.maxY; d += 1)
            for (let f = r.minX; f <= r.maxX; f += 1)
              o.selectedCount > 0 && !o.isSelected(f, d) || c.push({ x: f, y: d });
        else {
          for (let d = r.minX; d <= r.maxX; d += 1)
            (o.selectedCount === 0 || o.isSelected(d, r.minY)) && c.push({ x: d, y: r.minY }), (o.selectedCount === 0 || o.isSelected(d, r.maxY)) && c.push({ x: d, y: r.maxY });
          for (let d = r.minY + 1; d <= r.maxY - 1; d += 1)
            (o.selectedCount === 0 || o.isSelected(r.minX, d)) && c.push({ x: r.minX, y: d }), (o.selectedCount === 0 || o.isSelected(r.maxX, d)) && c.push({ x: r.maxX, y: d });
        }
        const { gradientDirection: u, gradientDither: h } = bt.getState(), p = qi(
          c,
          r,
          i,
          u,
          h
        );
        for (const d of c)
          n.setPixel(d.x, d.y, p.get(`${d.x}:${d.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        B1(this.start, s, this.activeIndex);
        return;
      }
      D1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = $.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const i of t.entries()) {
        const r = `${i.x}:${i.y}`;
        if (!this.changes.has(r))
          this.changes.set(r, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const o = this.changes.get(r);
          o && (o.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Be.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Ho = nt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), hs = (e, t, n) => {
  const s = we.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || $.getState().setPixel(e, t, n);
}, Wo = (e, t, n, s, l) => {
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const o = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; hs(e, t, l), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += o), h < i && (u += i, t += c);
  }
}, X1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y), o = (l - s) / 2, c = (r - i) / 2, u = (s + l) / 2, h = (i + r) / 2;
  if (o === 0 && c === 0) {
    hs(s, i, n);
    return;
  }
  if (o === 0) {
    Wo(s, i, s, r, n);
    return;
  }
  if (c === 0) {
    Wo(s, i, l, i, n);
    return;
  }
  const p = o * o, d = c * c;
  for (let f = i; f <= r; f += 1) {
    const m = f - h;
    for (let w = s; w <= l; w += 1) {
      const M = w - u;
      M * M / p + m * m / d <= 1 && hs(w, f, n);
    }
  }
}, F1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y), o = (l - s) / 2, c = (r - i) / 2, u = (s + l) / 2, h = (i + r) / 2;
  if (o === 0 && c === 0) {
    hs(s, i, n);
    return;
  }
  if (o === 0) {
    Wo(s, i, s, r, n);
    return;
  }
  if (c === 0) {
    Wo(s, i, l, i, n);
    return;
  }
  const p = o * o, d = c * c;
  for (let f = s; f <= l; f += 1) {
    const m = f - u, w = 1 - m * m / p;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * c, v = Math.round(h - M), g = Math.round(h + M);
    hs(f, v, n), hs(f, g, n);
  }
  for (let f = i; f <= r; f += 1) {
    const m = f - h, w = 1 - m * m / d;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * o, v = Math.round(u - M), g = Math.round(u + M);
    hs(v, f, n), hs(g, f, n);
  }
};
class O1 {
  constructor() {
    this.id = "oval", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      $.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : ga(), this.start = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = $.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / k),
        y: Math.floor(t.canvasY / k)
      }, l = Ho.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], r = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const o = we.getState(), c = [], u = (r.maxX - r.minX) / 2, h = (r.maxY - r.minY) / 2, p = (r.minX + r.maxX) / 2, d = (r.minY + r.maxY) / 2, f = (g, y) => o.selectedCount === 0 || o.isSelected(g, y), m = (g, y) => {
          f(g, y) && c.push({ x: g, y });
        };
        if (u === 0 && h === 0)
          m(r.minX, r.minY);
        else if (u === 0)
          for (let g = r.minY; g <= r.maxY; g += 1)
            m(r.minX, g);
        else if (h === 0)
          for (let g = r.minX; g <= r.maxX; g += 1)
            m(g, r.minY);
        else if (l === "filled") {
          const g = u * u, y = h * h;
          for (let S = r.minY; S <= r.maxY; S += 1) {
            const b = S - d;
            for (let _ = r.minX; _ <= r.maxX; _ += 1) {
              const C = _ - p;
              C * C / g + b * b / y <= 1 && m(_, S);
            }
          }
        } else {
          const g = u * u, y = h * h;
          for (let S = r.minX; S <= r.maxX; S += 1) {
            const b = S - p, _ = 1 - b * b / g;
            if (_ < 0)
              continue;
            const C = Math.sqrt(_) * h;
            m(S, Math.round(d - C)), m(S, Math.round(d + C));
          }
          for (let S = r.minY; S <= r.maxY; S += 1) {
            const b = S - d, _ = 1 - b * b / y;
            if (_ < 0)
              continue;
            const C = Math.sqrt(_) * u;
            m(Math.round(p - C), S), m(Math.round(p + C), S);
          }
        }
        const { gradientDirection: w, gradientDither: M } = bt.getState(), v = qi(
          c,
          r,
          i,
          w,
          M
        );
        for (const g of c)
          n.setPixel(g.x, g.y, v.get(`${g.x}:${g.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        X1(this.start, s, this.activeIndex);
        return;
      }
      F1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = $.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const i of t.entries()) {
        const r = `${i.x}:${i.y}`;
        if (!this.changes.has(r))
          this.changes.set(r, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const o = this.changes.get(r);
          o && (o.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Be.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Vl = nt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), Le = nt((e) => ({
  showReferenceLayer: !0,
  showPixelLayer: !0,
  showTileLayer: !0,
  showPixelGrid: !0,
  showTileGrid: !0,
  showAxes: !0,
  setShowReferenceLayer: (t) => e({ showReferenceLayer: t }),
  setShowPixelLayer: (t) => e({ showPixelLayer: t }),
  setShowTileLayer: (t) => e({ showTileLayer: t }),
  setShowPixelGrid: (t) => e({ showPixelGrid: t }),
  setShowTileGrid: (t) => e({ showTileGrid: t }),
  setShowAxes: (t) => e({ showAxes: t }),
  toggleReferenceLayer: () => e((t) => ({ showReferenceLayer: !t.showReferenceLayer })),
  togglePixelLayer: () => e((t) => ({ showPixelLayer: !t.showPixelLayer })),
  toggleTileLayer: () => e((t) => ({ showTileLayer: !t.showTileLayer })),
  togglePixelGrid: () => e((t) => ({ showPixelGrid: !t.showPixelGrid })),
  toggleTileGrid: () => e((t) => ({ showTileGrid: !t.showTileGrid })),
  toggleAxes: () => e((t) => ({ showAxes: !t.showAxes }))
})), Js = nt((e) => ({
  mode: "pixel",
  setMode: (t) => {
    const n = t === "tile" ? "tile" : "pixel";
    e({ mode: n });
    const s = Le.getState();
    if (n === "tile") {
      s.setShowTileLayer(!0), s.setShowPixelLayer(!1);
      return;
    }
    s.setShowPixelLayer(!0), s.setShowTileLayer(!1);
  }
})), z1 = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), H1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe),
  y: Math.floor(e.y / pe)
} : e, bc = (e, t) => H1(z1(e), t), fp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * pe,
    maxX: (l + 1) * pe - 1,
    minY: i * pe,
    maxY: (r + 1) * pe - 1
  } : { minX: s, maxX: l, minY: i, maxY: r };
}, W1 = (e, t) => {
  const n = $.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  for (let o = i; o <= r; o += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, o, 1);
};
class U1 {
  constructor() {
    this.id = "selection-rect", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      $.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : Vl.getState().snap, this.start = bc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      $.getState().clear();
      const s = bc(t, this.snap);
      this.last = s;
      const l = fp(this.start, s, this.snap);
      W1({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = $.getState(), s = we.getState(), l = t ? bc(t, this.snap) : this.last ?? this.start, i = fp(this.start, l, this.snap), r = !this.isRemoving, o = [];
      for (let c = i.minY; c <= i.maxY; c += 1)
        for (let u = i.minX; u <= i.maxX; u += 1)
          o.push({ x: u, y: c, selected: r });
      s.setSelections(o), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const $1 = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), V1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe),
  y: Math.floor(e.y / pe)
} : e, _c = (e, t) => V1($1(e), t), pp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * pe,
    maxX: (l + 1) * pe - 1,
    minY: i * pe,
    maxY: (r + 1) * pe - 1
  } : { minX: s, maxX: l, minY: i, maxY: r };
}, mp = (e, t) => {
  const { minX: n, maxX: s, minY: l, maxY: i } = e, r = (s - n) / 2, o = (i - l) / 2, c = (n + s) / 2, u = (l + i) / 2;
  if (r === 0 && o === 0) {
    t(n, l);
    return;
  }
  if (r === 0) {
    for (let d = l; d <= i; d += 1)
      t(n, d);
    return;
  }
  if (o === 0) {
    for (let d = n; d <= s; d += 1)
      t(d, l);
    return;
  }
  const h = r * r, p = o * o;
  for (let d = l; d <= i; d += 1) {
    const f = d - u;
    for (let m = n; m <= s; m += 1) {
      const w = m - c;
      w * w / h + f * f / p <= 1 && t(m, d);
    }
  }
};
class K1 {
  constructor() {
    this.id = "selection-oval", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      $.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : Vl.getState().snap, this.start = _c(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = $.getState();
      n.clear();
      const s = _c(t, this.snap);
      this.last = s;
      const l = pp(this.start, s, this.snap);
      mp(l, (i, r) => n.setPixel(i, r, 1));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = $.getState(), s = we.getState(), l = t ? _c(t, this.snap) : this.last ?? this.start, i = pp(this.start, l, this.snap), r = !this.isRemoving, o = [];
      mp(i, (c, u) => {
        o.push({ x: c, y: u, selected: r });
      }), s.setSelections(o), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const G1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, Q1 = (e) => {
  var v, g, y, S;
  if (e.length === 0)
    return [];
  let t = ((v = e[0]) == null ? void 0 : v.x) ?? 0, n = ((g = e[0]) == null ? void 0 : g.x) ?? 0, s = ((y = e[0]) == null ? void 0 : y.y) ?? 0, l = ((S = e[0]) == null ? void 0 : S.y) ?? 0;
  for (const b of e)
    t = Math.min(t, b.x), n = Math.max(n, b.x), s = Math.min(s, b.y), l = Math.max(l, b.y);
  const i = 1, r = t - i, o = s - i, c = n - t + 1 + i * 2, u = l - s + 1 + i * 2;
  if (c <= 0 || u <= 0)
    return [];
  const h = c * u;
  if (h > 5e6)
    return e;
  const p = new Uint8Array(h);
  for (const b of e) {
    const _ = b.x - r, C = b.y - o;
    _ < 0 || _ >= c || C < 0 || C >= u || (p[_ + C * c] = 1);
  }
  const d = new Uint8Array(h), f = [];
  let m = 0;
  const w = (b, _) => {
    const C = b + _ * c;
    d[C] === 1 || p[C] === 1 || (d[C] = 1, f.push(C));
  };
  for (let b = 0; b < c; b += 1)
    w(b, 0), w(b, u - 1);
  for (let b = 1; b < u - 1; b += 1)
    w(0, b), w(c - 1, b);
  for (; m < f.length; ) {
    const b = f[m] ?? 0;
    m += 1;
    const _ = b % c, C = Math.floor(b / c);
    _ > 0 && w(_ - 1, C), _ + 1 < c && w(_ + 1, C), C > 0 && w(_, C - 1), C + 1 < u && w(_, C + 1);
  }
  const M = [];
  for (let b = 1; b < u - 1; b += 1)
    for (let _ = 1; _ < c - 1; _ += 1) {
      const C = _ + b * c, j = p[C] === 1;
      (!(d[C] === 1) || j) && M.push({ x: r + _, y: o + b });
    }
  return M;
}, Tc = (e, t) => {
  const n = Math.floor(e.canvasX / k), s = Math.floor(e.canvasY / k);
  return t ? {
    x: Math.floor(n / pe),
    y: Math.floor(s / pe)
  } : { x: n, y: s };
}, mo = (e, t, n) => {
  const s = $.getState();
  if (n) {
    const o = e * pe, c = t * pe;
    for (let u = 0; u < pe; u += 1)
      for (let h = 0; h < pe; h += 1)
        s.setPixel(o + h, c + u, 1);
    return;
  }
  const { size: l, shape: i } = gn.getState();
  if (i === "point") {
    s.setPixel(e, t, 1);
    return;
  }
  const r = G1(l, i);
  for (const [o, c] of r)
    s.setPixel(e + o, t + c, 1);
}, gp = (e, t, n) => {
  const s = Math.abs(t.x - e.x), l = Math.abs(t.y - e.y), i = e.x < t.x ? 1 : -1, r = e.y < t.y ? 1 : -1;
  let o = s - l, c = e.x, u = e.y;
  for (; mo(c, u, n), !(c === t.x && u === t.y); ) {
    const h = 2 * o;
    h > -l && (o -= l, c += i), h < s && (o += s, u += r);
  }
}, Z1 = (e) => {
  var l, i;
  if (e.length < 4)
    return [];
  let t = ((l = e[0]) == null ? void 0 : l.y) ?? 0, n = ((i = e[0]) == null ? void 0 : i.y) ?? 0;
  for (const r of e)
    t = Math.min(t, r.y), n = Math.max(n, r.y);
  const s = [];
  for (let r = t; r <= n; r += 1) {
    const o = r + 0.5, c = [];
    for (let u = 0; u < e.length - 1; u += 1) {
      const h = e[u], p = e[u + 1];
      if (!h || !p || h.y === p.y)
        continue;
      const d = Math.min(h.y, p.y), f = Math.max(h.y, p.y);
      if (o < d || o >= f)
        continue;
      const m = (o - h.y) / (p.y - h.y), w = h.x + m * (p.x - h.x);
      c.push(w);
    }
    c.sort((u, h) => u - h);
    for (let u = 0; u < c.length - 1; u += 2) {
      const h = c[u] ?? 0, p = c[u + 1] ?? 0, d = Math.ceil(Math.min(h, p) - 0.5), f = Math.floor(Math.max(h, p) - 0.5);
      for (let m = d; m <= f; m += 1)
        s.push({ x: m, y: r });
    }
  }
  return s;
};
class q1 {
  constructor() {
    this.id = "selection-lasso", this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1, this.onHover = (t) => {
      if (this.drawing)
        return;
      this.tileMode = Js.getState().mode === "tile", $.getState().clear();
      const s = Tc(t, this.tileMode);
      mo(s.x, s.y, this.tileMode);
    }, this.onBegin = (t) => {
      $.getState().clear(), this.drawing = !0, this.isRemoving = t.ctrl, this.tileMode = Js.getState().mode === "tile";
      const s = Tc(t, this.tileMode);
      mo(s.x, s.y, this.tileMode), this.startPoint = s, this.lastPoint = s, this.path = [s];
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = Tc(t, this.tileMode);
      this.lastPoint && n.x === this.lastPoint.x && n.y === this.lastPoint.y || (this.lastPoint ? gp(this.lastPoint, n, this.tileMode) : mo(n.x, n.y, this.tileMode), this.lastPoint = n, this.path.push(n));
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      const t = $.getState(), n = we.getState(), s = !this.isRemoving, { shape: l } = gn.getState(), i = this.startPoint, r = this.lastPoint;
      i && r && (i.x !== r.x || i.y !== r.y) && gp(r, i, this.tileMode);
      const o = [];
      for (const f of this.path) {
        const m = o[o.length - 1];
        (!m || m.x !== f.x || m.y !== f.y) && o.push(f);
      }
      const c = i ?? o[0] ?? null, u = o[o.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && o.push(c);
      const h = Array.from(t.entries()).map((f) => ({ x: f.x, y: f.y })), p = l === "point" && !this.tileMode ? Z1(o) : Q1(h), d = (p.length > 0 ? p : h).map((f) => ({ x: f.x, y: f.y, selected: s }));
      n.setSelections(d), t.clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    }, this.onCancel = () => {
      $.getState().clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    };
  }
}
const Gr = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, xp = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
});
class J1 {
  constructor() {
    this.id = "texture-roll", this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0, this.onBegin = (t) => {
      $.getState().clear();
      const n = we.getState();
      if (n.selectedCount === 0)
        return;
      const s = xp(t);
      if (!n.isSelected(s.x, s.y))
        return;
      const l = this.collectSelection();
      if (!l)
        return;
      this.startCursor = s, this.layerId = ee.getState().activeLayerId, this.dragging = !0, this.didMove = !1, this.selectedPixels = l.pixels, this.rowGroups = l.rows, this.colGroups = l.cols, this.originalPixels = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
      const i = ee.getState();
      for (const r of this.selectedPixels)
        this.originalPixels.set(
          `${r.x}:${r.y}`,
          i.getPixelInLayer(this.layerId, r.x, r.y)
        );
    }, this.onMove = (t) => {
      if (!this.dragging || !this.startCursor)
        return;
      const n = xp(t), s = this.getStepSize(), l = Math.round((n.x - this.startCursor.x) / s) * s, i = Math.round((n.y - this.startCursor.y) / s) * s;
      this.applyOffset(l, i);
    }, this.onEnd = () => {
      if (!this.dragging || !this.layerId)
        return;
      const t = ee.getState(), n = [];
      if (this.didMove)
        for (const s of this.selectedPixels) {
          const l = `${s.x}:${s.y}`, i = this.originalPixels.get(l) ?? 0, r = t.getPixelInLayer(this.layerId, s.x, s.y);
          i !== r && n.push({ x: s.x, y: s.y, prev: i, next: r });
        }
      n.length > 0 && Be.getState().pushBatch({ layerId: this.layerId, changes: n }), $.getState().clear(), this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    }, this.onCancel = () => {
      if ($.getState().clear(), this.dragging && this.layerId) {
        const t = ee.getState(), n = [];
        for (const s of this.selectedPixels)
          n.push({
            x: s.x,
            y: s.y,
            paletteIndex: this.originalPixels.get(`${s.x}:${s.y}`) ?? 0
          });
        t.setPixelsInLayer(this.layerId, n);
      }
      this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    };
  }
  getStepSize() {
    return Vl.getState().snap === "tile" ? pe : 1;
  }
  collectSelection() {
    const t = we.getState();
    if (t.selectedCount === 0)
      return null;
    const n = t.store.getBlocks(), s = [], l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const { row: r, col: o, block: c } of n) {
      const u = o * Y, h = r * Y;
      for (let p = 0; p < Y; p += 1)
        for (let d = 0; d < Y; d += 1) {
          if (c[p * Y + d] !== 1)
            continue;
          const f = u + d, m = h + p;
          s.push({ x: f, y: m });
          const w = l.get(m) ?? [];
          w.push(f), l.set(m, w);
          const M = i.get(f) ?? [];
          M.push(m), i.set(f, M);
        }
    }
    if (s.length === 0)
      return null;
    for (const r of l.values())
      r.sort((o, c) => o - c);
    for (const r of i.values())
      r.sort((o, c) => o - c);
    return {
      pixels: s,
      rows: l,
      cols: i
    };
  }
  rotateRow(t, n, s) {
    const l = this.rowGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const i = l.length, r = Gr(s, i);
    if (r === 0)
      return;
    const o = l.map((c) => t.get(`${c}:${n}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = Gr(c - r, i), h = l[c];
      t.set(`${h}:${n}`, o[u] ?? 0);
    }
  }
  rotateCol(t, n, s) {
    const l = this.colGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const i = l.length, r = Gr(s, i);
    if (r === 0)
      return;
    const o = l.map((c) => t.get(`${n}:${c}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = Gr(c - r, i), h = l[c];
      t.set(`${n}:${h}`, o[u] ?? 0);
    }
  }
  applyOffset(t, n) {
    if (!this.layerId || t === this.lastDx && n === this.lastDy)
      return;
    this.lastDx = t, this.lastDy = n, this.didMove = this.didMove || t !== 0 || n !== 0;
    const s = this.getStepSize(), l = Math.trunc(t / s), i = Math.trunc(n / s), r = new Map(this.originalPixels);
    if (l !== 0)
      for (const c of this.rowGroups.keys())
        this.rotateRow(r, c, l);
    if (i !== 0)
      for (const c of this.colGroups.keys())
        this.rotateCol(r, c, i);
    const o = [];
    for (const c of this.selectedPixels)
      o.push({
        x: c.x,
        y: c.y,
        paletteIndex: r.get(`${c.x}:${c.y}`) ?? 0
      });
    ee.getState().setPixelsInLayer(this.layerId, o);
  }
}
const js = () => {
  const e = we.getState();
  if (e.selectedCount === 0)
    return null;
  const t = ee.getState(), n = [];
  let s = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
  const o = e.store.getBlocks();
  for (const { row: c, col: u, block: h } of o) {
    const p = u * Y, d = c * Y;
    for (let f = 0; f < Y; f += 1)
      for (let m = 0; m < Y; m += 1) {
        if (h[f * Y + m] !== 1)
          continue;
        const w = p + m, M = d + f, v = t.getPixel(w, M);
        n.push({ x: w, y: M, paletteIndex: v }), s = Math.min(s, w), l = Math.max(l, w), i = Math.min(i, M), r = Math.max(r, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: i, maxY: r };
}, eS = 2e3, tS = 6, zs = [], Us = /* @__PURE__ */ new Map();
let Uo = !1, yp = 1, Ll = null;
const go = () => typeof performance < "u" ? performance.now() : Date.now(), bx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(go()), 0), nS = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, _x = (e, t) => {
  const n = Math.floor(t / Y), s = Math.floor(e / Y);
  return `${n}:${s}`;
}, sS = (e, t) => {
  t <= 0 || Us.set(e, (Us.get(e) ?? 0) + t);
}, lS = (e) => {
  const t = (Us.get(e) ?? 0) - 1;
  t > 0 ? Us.set(e, t) : Us.delete(e);
}, Tx = () => {
  const e = zs[0];
  if (!e) {
    Be.getState().setLocked(!1), Uo = !1, Ll = null;
    return;
  }
  const t = go(), n = e.chunkSize, s = e.timeBudgetMs, l = ee.getState();
  for (; zs[0] === e && e.index < e.changes.length; ) {
    const i = [];
    for (; e.index < e.changes.length && i.length < n; ) {
      const r = e.changes[e.index];
      if (e.index += 1, i.push({ x: r.x, y: r.y, paletteIndex: r.next }), lS(_x(r.x, r.y)), go() - t > s)
        break;
    }
    if (i.length > 0 && l.setPixelsInLayer(e.layerId, i), e.index >= e.changes.length) {
      Be.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), zs.shift(), zs.length === 0 && Be.getState().setLocked(!1);
      break;
    }
    if (go() - t > s)
      break;
  }
  Ll = bx(Tx);
}, iS = () => {
  Uo || (Uo = !0, Ll = bx(Tx));
}, Ji = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  zs.length === 0 && Be.getState().setLocked(!0);
  const n = String(yp);
  yp += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = ee.getState().activeLayerId, i = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : eS, r = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : tS;
  zs.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: i, timeBudgetMs: r });
  const o = /* @__PURE__ */ new Map();
  for (const u of e) {
    const h = _x(u.x, u.y);
    o.set(h, (o.get(h) ?? 0) + 1);
  }
  for (const [u, h] of o.entries())
    sS(u, h);
  iS();
}, rS = () => Array.from(Us.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), Bd = () => {
  zs.length = 0, Us.clear(), Be.getState().setLocked(!1), Uo = !1, Ll !== null && (nS(Ll), Ll = null);
}, Cx = () => {
  const e = ke.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / k),
    minY: Math.floor(e.camera.y / k),
    maxX: Math.floor((e.camera.x + t) / k),
    maxY: Math.floor((e.camera.y + n) / k)
  };
}, oS = (e) => {
  const t = we.getState();
  if (t.selectedCount === 0)
    return;
  const n = ee.getState(), s = [], l = t.store.getBlocks();
  for (const { row: i, col: r, block: o } of l) {
    const c = r * Y, u = i * Y;
    for (let h = 0; h < Y; h += 1)
      for (let p = 0; p < Y; p += 1) {
        if (o[h * Y + p] !== 1)
          continue;
        const d = c + p, f = u + h, m = n.getPixel(d, f);
        m !== e && s.push({ x: d, y: f, prev: m, next: e });
      }
  }
  s.length !== 0 && Ji(s, { label: "Fill Selection" });
}, aS = (e, t, n, s) => {
  if (n === s)
    return;
  const l = we.getState(), i = ee.getState(), r = l.selectedCount > 0, o = r ? null : Cx();
  if (!r && !o || r && !l.isSelected(e, t))
    return;
  const c = /* @__PURE__ */ new Set(), u = [e], h = [t], p = [];
  for (let d = 0; d < u.length; d += 1) {
    const f = u[d], m = h[d];
    if (o && (f < o.minX || f > o.maxX || m < o.minY || m > o.maxY))
      continue;
    const w = `${f}:${m}`;
    if (!c.has(w) && (c.add(w), !(r && !l.isSelected(f, m)) && i.getPixel(f, m) === n)) {
      if (o && (f === o.minX || f === o.maxX || m === o.minY || m === o.maxY))
        return;
      p.push({ x: f, y: m, prev: n, next: s }), u.push(f + 1, f - 1, f, f), h.push(m, m, m + 1, m - 1);
    }
  }
  p.length !== 0 && Ji(p, { label: "Fill Region" });
}, cS = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, uS = (e, t, n) => {
  const s = we.getState(), l = ee.getState(), i = s.selectedCount > 0, r = i ? null : Cx();
  if (!i && !r || i && !s.isSelected(e, t))
    return null;
  const o = /* @__PURE__ */ new Set(), c = [e], u = [t], h = [];
  let p = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY, f = Number.POSITIVE_INFINITY, m = Number.NEGATIVE_INFINITY;
  for (let w = 0; w < c.length; w += 1) {
    const M = c[w], v = u[w];
    if (r && (M < r.minX || M > r.maxX || v < r.minY || v > r.maxY))
      continue;
    const g = `${M}:${v}`;
    if (o.has(g) || (o.add(g), i && !s.isSelected(M, v)))
      continue;
    const y = l.getPixel(M, v);
    if (y === n) {
      if (r && (M === r.minX || M === r.maxX || v === r.minY || v === r.maxY))
        return null;
      h.push({ x: M, y: v, prev: y }), p = Math.min(p, M), d = Math.max(d, M), f = Math.min(f, v), m = Math.max(m, v), c.push(M + 1, M - 1, M, M), u.push(v, v, v + 1, v - 1);
    }
  }
  return h.length === 0 ? null : { pixels: h, bounds: { minX: p, maxX: d, minY: f, maxY: m } };
}, vp = (e, t, n, s, l) => {
  const i = [];
  if (n.length === 0)
    return;
  const r = e.map((c) => ({ x: c.x, y: c.y })), o = qi(r, t, n, s, l);
  for (const c of e) {
    const u = o.get(`${c.x}:${c.y}`) ?? n[0] ?? 0;
    u !== c.prev && i.push({ x: c.x, y: c.y, prev: c.prev, next: u });
  }
  i.length !== 0 && Ji(i, { label: "Gradient Fill" });
};
class dS {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      $.getState().clear();
      const n = re.getState(), s = bt.getState().mode, l = cS(), i = l.length > 1, r = l[0] ?? n.getActiveIndex(), { gradientDirection: o, gradientDither: c } = bt.getState(), u = Math.floor(t.canvasX / k), h = Math.floor(t.canvasY / k);
      if (s === "selection") {
        if (!i) {
          oS(r);
          return;
        }
        const d = js();
        if (!d)
          return;
        const f = d.pixels.map((m) => ({
          x: m.x,
          y: m.y,
          prev: m.paletteIndex
        }));
        vp(
          f,
          {
            minX: d.minX,
            maxX: d.maxX,
            minY: d.minY,
            maxY: d.maxY
          },
          l,
          o,
          c
        );
        return;
      }
      if (i) {
        const d = ee.getState().getPixel(u, h), f = uS(u, h, d);
        if (!f)
          return;
        vp(f.pixels, f.bounds, l, o, c);
        return;
      }
      const p = ee.getState().getPixel(u, h);
      aS(u, h, p, r);
    };
  }
}
const rt = nt((e) => ({
  pixels: [],
  origin: null,
  width: 0,
  height: 0,
  tileBuffer: null,
  setBuffer: ({ pixels: t, origin: n, width: s, height: l }) => e({
    pixels: t,
    origin: n,
    width: s,
    height: l,
    tileBuffer: null
  }),
  setTileBuffer: (t) => e({
    pixels: [],
    origin: null,
    width: 0,
    height: 0,
    tileBuffer: {
      tileSetId: t.tileSetId,
      tiles: t.tiles.slice(),
      cols: Math.max(1, Math.floor(t.cols)),
      rows: Math.max(1, Math.floor(t.rows)),
      source: t.source
    }
  }),
  clear: () => e({
    pixels: [],
    origin: null,
    width: 0,
    height: 0,
    tileBuffer: null
  })
})), Ze = nt((e) => ({
  mode: "soft",
  snap: "pixel",
  rotation: 0,
  scale: 1,
  flipX: !1,
  flipY: !1,
  drag: !1,
  pasteDuplicateColors: !1,
  setMode: (t) => e({ mode: t }),
  setSnap: (t) => e({ snap: t }),
  setRotation: (t) => e({ rotation: t }),
  setScale: (t) => e({ scale: t }),
  setFlipX: (t) => e({ flipX: t }),
  setFlipY: (t) => e({ flipY: t }),
  setDrag: (t) => e({ drag: t }),
  setPasteDuplicateColors: (t) => e({ pasteDuplicateColors: t })
})), hS = () => {
  const e = rt.getState();
  if (e.pixels.length === 0)
    return !1;
  const t = re.getState(), n = t.colors, s = [...n], l = /* @__PURE__ */ new Map();
  for (const r of e.pixels) {
    const o = r.paletteIndex;
    if (o === 0 || l.has(o))
      continue;
    const c = n[o] ?? n[0] ?? "#000000";
    l.set(o, s.length), s.push(c);
  }
  if (l.size === 0)
    return !1;
  const i = e.pixels.map((r) => {
    const o = l.get(r.paletteIndex);
    return o ? { ...r, paletteIndex: o } : r;
  });
  return t.setPalette(s), rt.getState().setBuffer({
    pixels: i,
    origin: e.origin ?? { x: 0, y: 0 },
    width: e.width,
    height: e.height
  }), !0;
}, Cc = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), fS = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe) * pe,
  y: Math.floor(e.y / pe) * pe
} : e, pS = (e, t, n, s, l, i, r) => {
  const o = s === 90 || s === 270 ? n : t, c = s === 90 || s === 270 ? t : n, u = [];
  for (const h of e) {
    let p = h.x, d = h.y;
    i && (p = t - 1 - p), r && (d = n - 1 - d);
    let f = p, m = d;
    if (s === 90 ? (f = n - 1 - d, m = p) : s === 180 ? (f = t - 1 - p, m = n - 1 - d) : s === 270 && (f = d, m = t - 1 - p), l === 1) {
      u.push({ x: f, y: m, paletteIndex: h.paletteIndex });
      continue;
    }
    const w = f * l, M = m * l;
    for (let v = 0; v < l; v += 1)
      for (let g = 0; g < l; g += 1)
        u.push({ x: w + g, y: M + v, paletteIndex: h.paletteIndex });
  }
  return { pixels: u, width: o * l, height: c * l };
};
class mS {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = Ze.getState(), i = fS(t, l.snap);
      return {
        x: i.x - Math.floor(n / 2),
        y: i.y - Math.floor(s / 2)
      };
    }, this.renderPreview = (t) => {
      const n = $.getState();
      n.clear();
      const s = this.getTransformed();
      if (!s)
        return;
      const l = this.getAnchor(
        Cc(t),
        s.width,
        s.height
      ), i = we.getState(), r = i.selectedCount > 0;
      for (const o of s.pixels) {
        if (Ze.getState().mode === "soft" && o.paletteIndex === 0)
          continue;
        const c = l.x + o.x, u = l.y + o.y;
        r && !i.isSelected(c, u) || n.setPixel(c, u, o.paletteIndex);
      }
    }, this.applyStampAt = (t, n) => {
      const s = this.getTransformed();
      if (!s)
        return;
      const l = Ze.getState(), i = we.getState(), r = i.selectedCount > 0, o = ee.getState(), c = this.layerId ?? o.activeLayerId, u = [];
      for (const h of s.pixels) {
        if (l.mode === "soft" && h.paletteIndex === 0)
          continue;
        const p = t + h.x, d = n + h.y;
        if (r && !i.isSelected(p, d))
          continue;
        const f = o.getPixelInLayer(c, p, d);
        if (f === h.paletteIndex)
          continue;
        const m = `${p}:${d}`;
        if (!this.changes.has(m))
          this.changes.set(m, { x: p, y: d, prev: f, next: h.paletteIndex });
        else {
          const w = this.changes.get(m);
          w && (w.next = h.paletteIndex);
        }
        u.push({ x: p, y: d, paletteIndex: h.paletteIndex });
      }
      u.length !== 0 && o.setPixelsInLayer(c, u);
    }, this.flushChanges = () => {
      if (this.changes.size === 0)
        return;
      const t = ee.getState(), n = this.layerId ?? t.activeLayerId;
      Be.getState().pushBatch({ layerId: n, changes: Array.from(this.changes.values()) }), this.changes.clear();
    }, this.stampLine = (t, n) => {
      let s = t.x, l = t.y;
      const i = Math.abs(n.x - t.x), r = Math.abs(n.y - t.y), o = t.x < n.x ? 1 : -1, c = t.y < n.y ? 1 : -1;
      let u = i - r;
      for (; ; ) {
        const h = this.getTransformed();
        if (!h)
          return;
        const p = this.getAnchor({ x: s, y: l }, h.width, h.height);
        if ((!this.lastAnchor || this.lastAnchor.x !== p.x || this.lastAnchor.y !== p.y) && (this.applyStampAt(p.x, p.y), this.lastAnchor = p), s === n.x && l === n.y)
          break;
        const d = 2 * u;
        d > -r && (u -= r, s += o), d < i && (u += i, l += c);
      }
    }, this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      this.changes.clear(), this.layerId = ee.getState().activeLayerId, this.lastAnchor = null;
      const n = Ze.getState(), s = n.drag;
      !s && n.pasteDuplicateColors && hS();
      const l = Cc(t);
      if (s) {
        this.dragging = !0, this.lastPoint = l, this.stampLine(l, l), this.renderPreview(t);
        return;
      }
      const i = this.getTransformed();
      if (!i)
        return;
      const r = this.getAnchor(l, i.width, i.height);
      this.applyStampAt(r.x, r.y), this.flushChanges(), this.renderPreview(t);
    }, this.onMove = (t) => {
      if (this.dragging && this.lastPoint) {
        const n = Cc(t);
        this.stampLine(this.lastPoint, n), this.lastPoint = n;
      }
      this.renderPreview(t);
    }, this.onEnd = () => {
      this.dragging && this.flushChanges(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, $.getState().clear();
    }, this.onCancel = () => {
      $.getState().clear(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, this.changes.clear();
    };
  }
  getTransformed() {
    const t = rt.getState();
    if (t.pixels.length === 0 || t.width === 0 || t.height === 0)
      return null;
    const n = Ze.getState();
    if (this.cache && this.cache.source === t.pixels && this.cache.width === t.width && this.cache.height === t.height && this.cache.rotation === n.rotation && this.cache.scale === n.scale && this.cache.flipX === n.flipX && this.cache.flipY === n.flipY)
      return {
        pixels: this.cache.pixels,
        width: this.cache.transformedWidth,
        height: this.cache.transformedHeight
      };
    const s = pS(
      t.pixels,
      t.width,
      t.height,
      n.rotation,
      n.scale,
      n.flipX,
      n.flipY
    );
    return this.cache = {
      source: t.pixels,
      width: t.width,
      height: t.height,
      rotation: n.rotation,
      scale: n.scale,
      flipX: n.flipX,
      flipY: n.flipY,
      pixels: s.pixels,
      transformedWidth: s.width,
      transformedHeight: s.height
    }, { pixels: s.pixels, width: s.width, height: s.height };
  }
}
const wp = (e) => {
  const t = Math.floor(e.canvasX / k), n = Math.floor(e.canvasY / k), s = ee.getState().getPixelComposite(t, n), l = re.getState();
  if (e.ctrl) {
    l.setSelectedIndices(
      [...l.selectedIndices.filter((i) => i !== s), s]
    );
    return;
  }
  l.setSelectedIndices([s]);
};
class gS {
  constructor() {
    this.id = "eyedropper", this.onHover = () => {
      $.getState().clear();
    }, this.onBegin = (t) => {
      $.getState().clear(), wp(t);
    }, this.onMove = (t) => {
      wp(t);
    }, this.onCancel = () => {
      $.getState().clear();
    };
  }
}
const xS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, Wt = nt((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? xS();
    return ve.getState().setDirty(!0), e((i) => ({
      items: [...i.items, { id: l, ...s }],
      selectedId: l
    })), l;
  },
  setSelected: (t) => e({ selectedId: t }),
  updateReference: (t, n) => {
    ve.getState().setDirty(!0), e((s) => ({
      items: s.items.map((l) => l.id === t ? { ...l, ...n } : l)
    }));
  },
  removeReference: (t) => {
    ve.getState().setDirty(!0), e((n) => ({
      items: n.items.filter((s) => s.id !== t),
      selectedId: n.selectedId === t ? null : n.selectedId
    }));
  },
  clear: () => {
    ve.getState().setDirty(!0), e({ items: [], selectedId: null });
  }
})), $o = nt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), yS = (e) => e * Math.PI / 180, qn = (e) => {
  const t = e.width * k, n = e.height * k, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, i = t * s, r = n * s;
  return {
    centerX: e.x * k + i / 2,
    centerY: e.y * k + r / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: yS(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Qr = (e, t, n) => {
  const s = qn(e), l = t * s.scale * s.flipX, i = n * s.scale * s.flipY, r = Math.cos(s.rotationRad), o = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * r - i * o,
    y: s.centerY + l * o + i * r
  };
}, vS = (e, t, n) => {
  const s = qn(e), l = t - s.centerX, i = n - s.centerY, r = Math.cos(s.rotationRad), o = Math.sin(s.rotationRad), c = l * r + i * o, u = -l * o + i * r;
  return {
    x: c * s.flipX / s.scale,
    y: u * s.flipY / s.scale
  };
}, kx = (e) => {
  const { baseWidth: t, baseHeight: n } = qn(e), s = t / 2, l = n / 2;
  return {
    nw: { x: -s, y: -l },
    ne: { x: s, y: -l },
    se: { x: s, y: l },
    sw: { x: -s, y: l }
  };
}, xa = (e) => {
  const t = kx(e);
  return {
    nw: Qr(e, t.nw.x, t.nw.y),
    ne: Qr(e, t.ne.x, t.ne.y),
    se: Qr(e, t.se.x, t.se.y),
    sw: Qr(e, t.sw.x, t.sw.y)
  };
}, ya = (e) => {
  const t = xa(e), n = Object.values(t), s = n.map((i) => i.x), l = n.map((i) => i.y);
  return {
    minX: Math.min(...s),
    maxX: Math.max(...s),
    minY: Math.min(...l),
    maxY: Math.max(...l)
  };
}, wS = (e, t, n) => {
  const s = vS(e, t, n), { baseWidth: l, baseHeight: i } = qn(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= i / 2;
}, Zr = (e, t) => Math.round(e / t) * t, Sp = (e) => e === "tile" ? pe : 1, SS = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, Mp = (e, t, n) => {
  const s = xa(e);
  for (const l of zw) {
    const i = s[l];
    if (Math.abs(t - i.x) <= qf && Math.abs(n - i.y) <= qf)
      return l;
  }
  return null;
}, bp = (e, t) => {
  const n = kx(e), s = xa(e), l = SS[t], i = qn(e);
  return {
    id: e.id,
    mode: "scale",
    anchorWorldX: s[l].x,
    anchorWorldY: s[l].y,
    anchorLocal: n[l],
    handleLocal: n[t],
    baseWidth: i.baseWidth,
    baseHeight: i.baseHeight,
    rotationRad: i.rotationRad,
    flipX: i.flipX,
    flipY: i.flipY
  };
};
class MS {
  constructor() {
    this.id = "reference-handle", this.drag = null, this.onHover = () => {
      this.drag || $.getState().clear();
    }, this.onBegin = (t) => {
      $.getState().clear();
      const { items: n, selectedId: s, setSelected: l } = Wt.getState(), i = t.canvasX, r = t.canvasY, o = s ? n.find((p) => p.id === s) : null;
      if (o) {
        const p = Mp(o, i, r);
        if (p) {
          this.drag = bp(o, p);
          return;
        }
      }
      let c = null;
      for (let p = n.length - 1; p >= 0; p -= 1) {
        const d = n[p];
        if (wS(d, i, r)) {
          c = d;
          break;
        }
      }
      if (!c) {
        l(null), this.drag = null;
        return;
      }
      l(c.id);
      const u = Mp(c, i, r);
      if (u) {
        this.drag = bp(c, u);
        return;
      }
      const h = qn(c);
      this.drag = {
        id: c.id,
        mode: "move",
        offsetX: i - h.centerX,
        offsetY: r - h.centerY
      };
    }, this.onMove = (t) => {
      if (!this.drag)
        return;
      const n = Wt.getState(), s = $o.getState().snap, l = n.items.find((H) => {
        var Q;
        return H.id === ((Q = this.drag) == null ? void 0 : Q.id);
      });
      if (!l) {
        this.drag = null;
        return;
      }
      const i = t.canvasX, r = t.canvasY;
      if (this.drag.mode === "move") {
        const H = qn(l), Q = H.baseWidth * H.scale, le = H.baseHeight * H.scale, ae = i - this.drag.offsetX, xe = r - this.drag.offsetY, O = Sp(s), ie = (ae - Q / 2) / k, ye = (xe - le / 2) / k, W = Zr(ie, O), ge = Zr(ye, O);
        n.updateReference(l.id, { x: W, y: ge });
        return;
      }
      const o = i - this.drag.anchorWorldX, c = r - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), h = Math.sin(this.drag.rotationRad), p = o * u + c * h, d = -o * h + c * u, f = p * this.drag.flipX, m = d * this.drag.flipY, w = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, v = w !== 0 ? Math.abs(f / w) : 0, g = M !== 0 ? Math.abs(m / M) : 0, y = Math.max(v, g), S = Number.isFinite(y) && y > 0 ? y : Zs, b = Sp(s) * k, _ = Math.max(
        b,
        Zr(this.drag.baseWidth * S, b)
      ), C = Math.max(
        b,
        Zr(this.drag.baseHeight * S, b)
      );
      let j = Math.max(
        Zs,
        Math.max(_ / this.drag.baseWidth, C / this.drag.baseHeight)
      );
      j = Math.min(j, Ul);
      const A = this.drag.baseWidth * j, L = this.drag.baseHeight * j, F = this.drag.anchorLocal.x * j * this.drag.flipX, P = this.drag.anchorLocal.y * j * this.drag.flipY, z = F * u - P * h, Z = F * h + P * u, oe = this.drag.anchorWorldX - z, G = this.drag.anchorWorldY - Z, ne = (oe - A / 2) / k, D = (G - L / 2) / k;
      n.updateReference(l.id, { x: ne, y: D, scale: j });
    }, this.onEnd = () => {
      this.drag = null;
    }, this.onCancel = () => {
      this.drag = null;
    };
  }
}
const _p = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, bS = () => {
  const e = ke.getState(), t = e.camera.zoom;
  if (!Number.isFinite(t) || t <= 0)
    return { x: 0, y: 0, width: 1, height: 1 };
  const n = e.width / e.camera.zoom, s = e.height / e.camera.zoom, l = Math.floor(e.camera.x / k), i = Math.floor(e.camera.y / k), r = Math.ceil((e.camera.x + n) / k), o = Math.ceil((e.camera.y + s) / k);
  return {
    x: l,
    y: i,
    width: Math.max(1, r - l),
    height: Math.max(1, o - i)
  };
}, _S = (e, t) => {
  const n = ke.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), o = t - i / (2 * s);
  n.setCamera({ x: r, y: o, zoom: s });
}, un = (e, t = 0) => Number.isFinite(e) ? Math.round(e) : t, TS = (e) => {
  if (!e || typeof e != "object")
    return null;
  if (e.kind === "camera") {
    const t = Number.isFinite(e.centerX) ? e.centerX : 0, n = Number.isFinite(e.centerY) ? e.centerY : 0, s = Math.round(t / k), l = Math.round(n / k);
    return {
      id: e.id,
      name: e.name,
      kind: "region",
      x: s,
      y: l,
      width: 32,
      height: 32,
      fileName: ""
    };
  }
  return e.kind === "region" ? {
    id: e.id,
    name: e.name,
    kind: "region",
    x: un(e.x),
    y: un(e.y),
    width: Math.max(1, un(e.width, 1)),
    height: Math.max(1, un(e.height, 1)),
    fileName: typeof e.fileName == "string" ? e.fileName : ""
  } : null;
}, Mt = nt((e, t) => ({
  items: [],
  overlaysVisible: !0,
  addFromCamera: () => e((n) => {
    const s = bS(), l = _p(), i = `Bookmark ${n.items.length + 1}`;
    return ve.getState().setDirty(!0), {
      items: [
        ...n.items,
        {
          id: l,
          name: i,
          kind: "region",
          x: s.x,
          y: s.y,
          width: s.width,
          height: s.height,
          fileName: ""
        }
      ]
    };
  }),
  addRegionTag: ({ x: n, y: s, width: l, height: i, name: r }) => e((o) => {
    const c = _p(), u = o.items.filter((h) => h.kind === "region").length;
    return ve.getState().setDirty(!0), {
      items: [
        ...o.items,
        {
          id: c,
          name: r != null && r.trim() ? r.trim() : `Bookmark ${u + 1}`,
          kind: "region",
          x: un(n),
          y: un(s),
          width: Math.max(1, un(l, 1)),
          height: Math.max(1, un(i, 1)),
          fileName: ""
        }
      ]
    };
  }),
  rename: (n, s) => e((l) => (ve.getState().setDirty(!0), {
    items: l.items.map((i) => i.id === n ? { ...i, name: s } : i)
  })),
  setRegionPosition: (n, s, l) => e((i) => {
    let r = !1;
    const o = i.items.map((c) => {
      if (c.id !== n || c.kind !== "region")
        return c;
      const u = un(s), h = un(l);
      return c.x === u && c.y === h ? c : (r = !0, { ...c, x: u, y: h });
    });
    return r ? (ve.getState().setDirty(!0), { items: o }) : i;
  }),
  setRegionSize: (n, s, l) => e((i) => {
    let r = !1;
    const o = i.items.map((c) => {
      if (c.id !== n)
        return c;
      const u = Math.max(1, un(s, 1)), h = Math.max(1, un(l, 1));
      return c.width === u && c.height === h ? c : (r = !0, { ...c, width: u, height: h });
    });
    return r ? (ve.getState().setDirty(!0), { items: o }) : i;
  }),
  setRegionFileName: (n, s) => e((l) => {
    let i = !1;
    const r = l.items.map((o) => o.id !== n || o.fileName === s ? o : (i = !0, { ...o, fileName: s }));
    return i ? (ve.getState().setDirty(!0), { items: r }) : l;
  }),
  remove: (n) => e((s) => (ve.getState().setDirty(!0), { items: s.items.filter((l) => l.id !== n) })),
  move: (n, s) => e((l) => {
    const i = l.items.findIndex((u) => u.id === n);
    if (i === -1)
      return l;
    const r = s === "up" ? i - 1 : i + 1;
    if (r < 0 || r >= l.items.length)
      return l;
    const o = [...l.items], [c] = o.splice(i, 1);
    return o.splice(r, 0, c), ve.getState().setDirty(!0), { items: o };
  }),
  jumpTo: (n) => {
    const s = t().items.find((r) => r.id === n);
    if (!s)
      return;
    const l = s.x + s.width / 2, i = s.y + s.height / 2;
    _S(l * k, i * k);
  },
  setOverlaysVisible: (n) => e((s) => {
    const l = !!n;
    return s.overlaysVisible === l ? s : (ve.getState().setDirty(!0), { overlaysVisible: l });
  }),
  toggleOverlaysVisible: () => e((n) => (ve.getState().setDirty(!0), { overlaysVisible: !n.overlaysVisible })),
  setAll: (n, s = !0) => e({
    items: n.map(TS).filter((l) => l !== null),
    overlaysVisible: !!s
  }),
  clear: () => e({ items: [], overlaysVisible: !0 })
})), kc = (e) => ({
  x: Math.floor(e.canvasX / k / pe),
  y: Math.floor(e.canvasY / k / pe)
}), Tp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), CS = (e) => {
  const t = $.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * pe, i = n * pe;
      for (let r = 0; r < pe; r += 1)
        for (let o = 0; o < pe; o += 1)
          t.setPixel(l + o, i + r, 1);
    }
}, kS = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class jS {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      $.getState().clear(), this.start = kc(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      $.getState().clear();
      const s = kc(t);
      this.last = s, CS(Tp(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = $.getState(), s = t ? kc(t) : this.last ?? this.start, l = Tp(this.start, s), i = ee.getState(), r = V.getState(), o = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
      let u = r.activeTileSetId;
      const h = r.tileSets.find((f) => f.id === u);
      let p = (h == null ? void 0 : h.tiles.length) ?? 0;
      if (!h || h.tileWidth !== pe || h.tileHeight !== pe)
        u = r.addTileSet({
          name: `Tile Set ${r.tileSets.length + 1}`,
          tileWidth: pe,
          tileHeight: pe,
          columns: o,
          rows: c,
          tiles: []
        }), p = 0;
      else if (h && h.tiles.length === 0)
        r.setTileSetLayout(h.id, o, c);
      else if (h && h.tiles.length > 0 && (h.columns !== o || h.rows !== c)) {
        kS(
          `Invalid selection: ${h.name} expects ${h.columns}x${h.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const d = [];
      for (let f = l.minTileY; f <= l.maxTileY; f += 1)
        for (let m = l.minTileX; m <= l.maxTileX; m += 1) {
          const w = [], M = m * pe, v = f * pe;
          for (let g = 0; g < pe; g += 1)
            for (let y = 0; y < pe; y += 1)
              w.push(i.getPixelComposite(M + y, v + g));
          d.push({ pixels: w, source: { kind: "canvas", x: M, y: v } });
        }
      u && (r.appendTilesToSet(u, d), r.setSelectedTileIndex(p), r.setTilePage(0), r.setTilePaletteOffset(0), Mt.getState().addRegionTag({
        x: l.minTileX * pe,
        y: l.minTileY * pe,
        width: o * pe,
        height: c * pe
      })), n.clear(), this.start = null, this.last = null;
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const PS = (e) => e.some((t) => t === 0), NS = (e) => e.every((t) => t === 0);
class Vo {
  constructor(t) {
    this.tileIndexBySignature = /* @__PURE__ */ new Map(), this.pendingTiles = [], this.tiles = t.map((n) => n.pixels.slice()), this.tiles.forEach((n, s) => {
      this.tileIndexBySignature.set(n.join(","), s);
    });
  }
  resolve(t, n, s) {
    if (n < 0)
      return n;
    const l = this.tiles[n];
    if (!l)
      return s;
    if (t === "hard" || !PS(l))
      return n;
    const i = s >= 0 ? this.tiles[s] : void 0, r = l.map(
      (h, p) => h === 0 ? (i == null ? void 0 : i[p]) ?? 0 : h
    );
    if (NS(r))
      return -1;
    const o = r.join(","), c = this.tileIndexBySignature.get(o);
    if (c !== void 0)
      return c;
    const u = this.tiles.length;
    return this.tiles.push(r), this.tileIndexBySignature.set(o, u), this.pendingTiles.push({ pixels: r }), u;
  }
  getTilePixels(t) {
    return t < 0 || t >= this.tiles.length ? null : this.tiles[t] ?? null;
  }
  getPendingTiles() {
    return this.pendingTiles.slice();
  }
}
const IS = 32, jc = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), ES = (e, t, n, s, l) => {
  const i = $.getState();
  for (let r = 0; r < s; r += 1)
    for (let o = 0; o < n; o += 1) {
      const c = l[r * n + o] ?? 0;
      c !== 0 && i.setPixel(e + o, t + r, c);
    }
}, Cp = () => {
  const e = V.getState(), t = e.tileSets.find((l) => l.id === e.activeTileSetId);
  if (!t)
    return null;
  const n = e.selectedTileIndex, s = t.tiles[n];
  return s ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    tilePixels: s.pixels,
    tileIndex: n,
    placementMode: e.tilePlacementMode,
    snapToCluster: e.tilePenSnapToCluster,
    selectionIndices: e.selectedTileIndices,
    selectionCols: e.selectedTileCols,
    selectionRows: e.selectedTileRows,
    tileSetTiles: t.tiles
  } : null;
}, kp = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((d) => d.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (d) => d.id === n.activeTileMapId && d.tileSetId === e
  );
  if (l)
    return {
      tileMapId: l.id,
      originX: l.originX,
      originY: l.originY,
      columns: l.columns,
      rows: l.rows,
      tiles: l.tiles
    };
  const i = n.tileMaps.find((d) => d.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const r = IS, o = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: o
  }), originX: u, originY: h, columns: r, rows: r, tiles: o };
};
class RS {
  constructor() {
    this.id = "tile-pen", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || ($.getState().clear(), this.activeTile = Cp(), !this.activeTile) || (this.placementResolver = new Vo(this.activeTile.tileSetTiles), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = jc(t), l = this.toWorldTilePoint(s);
      l && this.applyTile(this.snapWorldPointToCluster(l));
    }, this.onBegin = (t) => {
      if ($.getState().clear(), this.drawing = !0, this.changes.clear(), this.erasing = t.alt, this.activeTile = Cp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ht(), this.placementResolver = new Vo(this.activeTile.tileSetTiles), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = jc(t), l = this.toWorldTilePoint(s);
      if (!l)
        return;
      const i = this.snapWorldPointToCluster(l);
      this.applyTile(i), this.lastWorldPoint = i;
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      this.erasing = t.alt;
      const n = jc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      const l = this.snapWorldPointToCluster(s);
      if (this.lastWorldPoint)
        if (this.activeTile.snapToCluster)
          this.drawSnappedLine(this.lastWorldPoint, l);
        else {
          let i = this.lastWorldPoint.x, r = this.lastWorldPoint.y;
          const o = Math.abs(l.x - this.lastWorldPoint.x), c = Math.abs(l.y - this.lastWorldPoint.y), u = this.lastWorldPoint.x < l.x ? 1 : -1, h = this.lastWorldPoint.y < l.y ? 1 : -1;
          let p = o - c;
          for (; this.applyTile({ x: i, y: r }), !(i === l.x && r === l.y); ) {
            const d = 2 * p;
            d > -c && (p -= c, i += u), d < o && (p += o, r += h);
          }
        }
      else
        this.applyTile(l);
      this.lastWorldPoint = l;
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      if (this.placementResolver) {
        const s = this.placementResolver.getPendingTiles();
        s.length > 0 && V.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (V.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Ht();
        qs(this.historyBefore, s);
      }
      $.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
    }, this.onCancel = () => {
      $.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
    };
  }
  getCurrentTileIndex(t) {
    var s;
    const n = this.changes.get(t);
    return typeof n == "number" ? n : ((s = this.activeMap) == null ? void 0 : s.tiles[t]) ?? -1;
  }
  resolvePlacedTileIndex(t, n) {
    return !this.activeTile || !this.placementResolver || t < 0 ? t : this.placementResolver.resolve(
      this.activeTile.placementMode,
      t,
      this.getCurrentTileIndex(n)
    );
  }
  getTilePixels(t) {
    var n;
    return t < 0 ? null : ((n = this.placementResolver) == null ? void 0 : n.getTilePixels(t)) ?? null;
  }
  toWorldTilePoint(t) {
    return this.activeTile ? {
      x: Math.floor(t.x / this.activeTile.tileWidth),
      y: Math.floor(t.y / this.activeTile.tileHeight)
    } : null;
  }
  toMapPoint(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = Math.round(this.activeMap.originX / this.activeTile.tileWidth), s = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    return {
      x: t.x - n,
      y: t.y - s
    };
  }
  snapWorldPointToCluster(t) {
    if (!this.activeTile || !this.activeTile.snapToCluster)
      return t;
    const n = Math.max(1, this.activeTile.selectionCols), s = Math.max(1, this.activeTile.selectionRows);
    return {
      x: Math.floor(t.x / n) * n,
      y: Math.floor(t.y / s) * s
    };
  }
  drawSnappedLine(t, n) {
    if (!this.activeTile)
      return;
    const s = Math.max(1, this.activeTile.selectionCols), l = Math.max(1, this.activeTile.selectionRows);
    let i = Math.floor(t.x / s), r = Math.floor(t.y / l);
    const o = Math.floor(n.x / s), c = Math.floor(n.y / l), u = Math.abs(o - i), h = Math.abs(c - r), p = i < o ? 1 : -1, d = r < c ? 1 : -1;
    let f = u - h;
    for (; this.applyTile({ x: i * s, y: r * l }), !(i === o && r === c); ) {
      const m = 2 * f;
      m > -h && (f -= h, i += p), m < u && (f += u, r += d);
    }
  }
  ensureMapBounds(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.activeTile.selectionCols, s = this.activeTile.selectionRows, l = this.toMapPoint(t);
    if (!l)
      return null;
    const i = l.x, r = l.y, o = l.x + n - 1, c = l.y + s - 1, u = V.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      o,
      r,
      c,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    if (f) {
      this.activeMap = {
        tileMapId: f.id,
        originX: f.originX,
        originY: f.originY,
        columns: f.columns,
        rows: f.rows,
        tiles: f.tiles
      };
      const m = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (m !== 0 || w !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, g] of this.changes.entries()) {
          const y = Math.floor(v / h), S = v % h, b = y + w, _ = S + m;
          b < 0 || _ < 0 || b >= f.rows || _ >= f.columns || M.set(b * f.columns + _, g);
        }
        this.changes = M;
      }
    }
    return this.toMapPoint(t);
  }
  applyTile(t) {
    if (!this.activeTile || !this.activeMap)
      return;
    const n = this.ensureMapBounds(t);
    if (!n)
      return;
    const { columns: s, rows: l } = this.activeMap;
    if (n.x < 0 || n.y < 0 || n.x >= s || n.y >= l)
      return;
    const i = this.activeTile.selectionCols, r = this.activeTile.selectionRows, o = this.activeTile.selectionIndices;
    for (let c = 0; c < r; c += 1)
      for (let u = 0; u < i; u += 1) {
        const h = n.x + u, p = n.y + c;
        if (h < 0 || p < 0 || h >= s || p >= l)
          continue;
        const d = p * s + h, f = c * i + u, m = o[f] ?? -1, w = this.erasing ? -1 : this.resolvePlacedTileIndex(m, d);
        if (this.drawing && this.changes.set(d, w), this.erasing)
          continue;
        const M = this.getTilePixels(w);
        if (!M)
          continue;
        const v = t.x + u, g = t.y + c, y = v * this.activeTile.tileWidth, S = g * this.activeTile.tileHeight;
        ES(
          y,
          S,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          M
        );
      }
  }
}
const AS = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), LS = (e, t, n, s, l) => {
  const i = $.getState();
  for (let r = 0; r < s; r += 1)
    for (let o = 0; o < n; o += 1) {
      const c = l[r * n + o] ?? 0;
      c !== 0 && i.setPixel(e + o, t + r, c);
    }
};
class BS {
  constructor() {
    this.id = "tile-stamp", this.drawing = !1, this.historyBefore = null, this.lastPoint = null, this.touchedAnchors = /* @__PURE__ */ new Set(), this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      const n = this.getContext();
      if (!n) {
        $.getState().clear();
        return;
      }
      this.drawing = !0, this.historyBefore = Ht(), this.touchedAnchors.clear();
      const s = this.toWorldTilePoint(t, n.tileSet);
      this.lastPoint = s, this.stampLine(s, s, n), this.renderPreview(t);
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = this.getContext();
      if (!n)
        return;
      const s = this.toWorldTilePoint(t, n.tileSet);
      this.stampLine(this.lastPoint ?? s, s, n), this.lastPoint = s, this.renderPreview(t);
    }, this.onEnd = () => {
      if (this.historyBefore) {
        const t = Ht();
        qs(this.historyBefore, t);
      }
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), $.getState().clear();
    }, this.onCancel = () => {
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), $.getState().clear();
    };
  }
  getContext() {
    const n = rt.getState().tileBuffer;
    if (!n || n.cols <= 0 || n.rows <= 0 || n.tiles.length === 0)
      return null;
    const s = V.getState(), l = s.tileSets.find((r) => r.id === n.tileSetId);
    if (!l)
      return null;
    const i = s.tileMaps.find(
      (r) => r.id === s.activeTileMapId && r.tileSetId === l.id
    ) ?? s.tileMaps.find((r) => r.tileSetId === l.id);
    return i ? {
      tileSet: l,
      tileMap: i,
      buffer: {
        cols: n.cols,
        rows: n.rows,
        tiles: n.tiles
      }
    } : null;
  }
  toWorldTilePoint(t, n) {
    const s = AS(t);
    return {
      x: Math.floor(s.x / n.tileWidth),
      y: Math.floor(s.y / n.tileHeight)
    };
  }
  getAnchor(t, n) {
    return {
      x: t.x - Math.floor(n.buffer.cols / 2),
      y: t.y - Math.floor(n.buffer.rows / 2)
    };
  }
  renderPreview(t) {
    var c;
    $.getState().clear();
    const s = this.getContext();
    if (!s)
      return;
    const l = this.toWorldTilePoint(t, s.tileSet), i = this.getAnchor(l, s), r = Math.round(s.tileMap.originX / s.tileSet.tileWidth), o = Math.round(s.tileMap.originY / s.tileSet.tileHeight);
    for (let u = 0; u < s.buffer.rows; u += 1)
      for (let h = 0; h < s.buffer.cols; h += 1) {
        const p = s.buffer.tiles[u * s.buffer.cols + h] ?? -1;
        if (p < 0)
          continue;
        const d = (c = s.tileSet.tiles[p]) == null ? void 0 : c.pixels;
        if (!d)
          continue;
        const f = i.x + h - r, m = i.y + u - o, w = s.tileMap.originX + f * s.tileSet.tileWidth, M = s.tileMap.originY + m * s.tileSet.tileHeight;
        LS(
          w,
          M,
          s.tileSet.tileWidth,
          s.tileSet.tileHeight,
          d
        );
      }
  }
  applyStamp(t) {
    const n = this.getContext();
    if (!n)
      return;
    const s = `${t.x}:${t.y}`;
    if (this.touchedAnchors.has(s))
      return;
    this.touchedAnchors.add(s);
    const l = t.x * n.tileSet.tileWidth, i = t.y * n.tileSet.tileHeight, r = V.getState(), o = r.expandTileMapToInclude(
      n.tileMap.id,
      t.x,
      t.x + n.buffer.cols - 1,
      t.y,
      t.y + n.buffer.rows - 1,
      n.tileSet.tileWidth,
      n.tileSet.tileHeight
    ) ?? r.tileMaps.find((p) => p.id === n.tileMap.id) ?? null;
    if (!o)
      return;
    const c = Math.round((l - o.originX) / n.tileSet.tileWidth), u = Math.round((i - o.originY) / n.tileSet.tileHeight), h = [];
    for (let p = 0; p < n.buffer.rows; p += 1)
      for (let d = 0; d < n.buffer.cols; d += 1) {
        const f = c + d, m = u + p;
        if (f < 0 || m < 0 || f >= o.columns || m >= o.rows)
          continue;
        const w = n.buffer.tiles[p * n.buffer.cols + d] ?? -1;
        h.push({ index: m * o.columns + f, tile: w });
      }
    h.length > 0 && r.setTileMapTiles(o.id, h);
  }
  stampLine(t, n, s) {
    let l = t.x, i = t.y;
    const r = Math.abs(n.x - t.x), o = Math.abs(n.y - t.y), c = t.x < n.x ? 1 : -1, u = t.y < n.y ? 1 : -1;
    let h = r - o;
    for (; this.applyStamp(this.getAnchor({ x: l, y: i }, s)), !(l === n.x && i === n.y); ) {
      const p = 2 * h;
      p > -o && (h -= o, l += c), p < r && (h += r, i += u);
    }
  }
}
const DS = 32, Pc = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), YS = (e, t, n, s, l) => {
  const i = $.getState();
  for (let r = 0; r < s; r += 1)
    for (let o = 0; o < n; o += 1) {
      const c = l[r * n + o] ?? 0;
      c !== 0 && i.setPixel(e + o, t + r, c);
    }
}, jp = () => {
  const e = V.getState(), t = e.tileSets.find((s) => s.id === e.activeTileSetId);
  if (!t)
    return null;
  const n = Array.from(
    new Set(
      e.selectedTileIndices.filter(
        (s) => s >= 0 && s < t.tiles.length
      )
    )
  );
  return {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    randomPool: n,
    selectionCols: e.selectedTileCols,
    selectionRows: e.selectedTileRows,
    tileSetTiles: t.tiles
  };
}, Pp = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((d) => d.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (d) => d.id === n.activeTileMapId && d.tileSetId === e
  );
  if (l)
    return {
      tileMapId: l.id,
      originX: l.originX,
      originY: l.originY,
      columns: l.columns,
      rows: l.rows,
      tiles: l.tiles
    };
  const i = n.tileMaps.find((d) => d.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const r = DS, o = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: o
  }), originX: u, originY: h, columns: r, rows: r, tiles: o };
};
class XS {
  constructor() {
    this.id = "tile-rectangle", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.seed = 0, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || ($.getState().clear(), this.activeTile = jp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = Pp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = Pc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.applyTileArea(l, l));
    }, this.onBegin = (t) => {
      if ($.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = jp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ht(), this.resetPlacementResolver(), this.activeMap = Pp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = Pc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.startWorldPoint = l, this.lastWorldPoint = l, this.applyTileArea(l, l));
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      const n = Pc(t), s = this.toWorldTilePoint(n);
      s && (this.lastWorldPoint = s, this.startWorldPoint && ($.getState().clear(), this.changes.clear(), this.resetPlacementResolver(), this.applyTileArea(this.startWorldPoint, s)));
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      if (this.placementResolver) {
        const s = this.placementResolver.getPendingTiles();
        s.length > 0 && V.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (V.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Ht();
        qs(this.historyBefore, s);
      }
      $.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      $.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Vo(this.activeTile.tileSetTiles);
  }
  getCurrentTileIndex(t) {
    var s;
    const n = this.changes.get(t);
    return typeof n == "number" ? n : ((s = this.activeMap) == null ? void 0 : s.tiles[t]) ?? -1;
  }
  resolvePlacedTileIndex(t, n) {
    return !this.activeTile || !this.placementResolver || t < 0 ? t : this.placementResolver.resolve(
      this.activeTile.placementMode,
      t,
      this.getCurrentTileIndex(n)
    );
  }
  getTilePixels(t) {
    var n;
    return t < 0 ? null : ((n = this.placementResolver) == null ? void 0 : n.getTilePixels(t)) ?? null;
  }
  toWorldTilePoint(t) {
    return this.activeTile ? {
      x: Math.floor(t.x / this.activeTile.tileWidth),
      y: Math.floor(t.y / this.activeTile.tileHeight)
    } : null;
  }
  toMapPoint(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = Math.round(this.activeMap.originX / this.activeTile.tileWidth), s = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    return {
      x: t.x - n,
      y: t.y - s
    };
  }
  ensureMapBounds(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.activeTile.selectionCols, s = this.activeTile.selectionRows, l = this.toMapPoint(t);
    if (!l)
      return null;
    const i = l.x, r = l.y, o = l.x + n - 1, c = l.y + s - 1, u = V.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      o,
      r,
      c,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    if (f) {
      this.activeMap = {
        tileMapId: f.id,
        originX: f.originX,
        originY: f.originY,
        columns: f.columns,
        rows: f.rows,
        tiles: f.tiles
      };
      const m = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (m !== 0 || w !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, g] of this.changes.entries()) {
          const y = Math.floor(v / h), S = v % h, b = y + w, _ = S + m;
          b < 0 || _ < 0 || b >= f.rows || _ >= f.columns || M.set(b * f.columns + _, g);
        }
        this.changes = M;
      }
    }
    return this.toMapPoint(t);
  }
  sampleTileIndex() {
    if (!this.activeTile)
      return null;
    const t = this.activeTile.randomPool;
    if (t.length === 0)
      return null;
    const n = Math.floor(Math.random() * t.length);
    return t[n] ?? null;
  }
  sampleTileIndexForCell(t, n) {
    if (!this.activeTile)
      return null;
    const s = this.activeTile.randomPool;
    if (s.length === 0)
      return null;
    const l = t * 73856093 ^ n * 19349663 ^ this.seed * 83492791, i = Math.abs(l) % s.length;
    return s[i] ?? null;
  }
  applyTileArea(t, n) {
    if (!this.activeTile || !this.activeMap)
      return;
    const s = Math.min(t.x, n.x), l = Math.max(t.x, n.x), i = Math.min(t.y, n.y), r = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: s, y: i }))
      return;
    const { columns: c, rows: u } = this.activeMap, h = Math.round(this.activeMap.originX / this.activeTile.tileWidth), p = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let d = i; d <= r; d += 1)
      for (let f = s; f <= l; f += 1) {
        const m = f - h, w = d - p;
        if (m < 0 || w < 0 || m >= c || w >= u)
          continue;
        const M = this.sampleTileIndexForCell(f, d);
        if (M === null)
          continue;
        const v = w * c + m, g = this.resolvePlacedTileIndex(M, v);
        this.drawing && this.changes.set(v, g);
        const y = this.getTilePixels(g);
        if (!y)
          continue;
        const S = f * this.activeTile.tileWidth, b = d * this.activeTile.tileHeight;
        YS(
          S,
          b,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          y
        );
      }
  }
}
const FS = 1, Np = "tiles", OS = (e) => Array.from(e).filter((t) => t.charCodeAt(0) >= 32).join(""), zS = (e) => {
  const t = (e == null ? void 0 : e.trim()) ?? "";
  if (!t)
    return Np;
  const n = t.replace(/\.[^.]+$/, "");
  return OS(n).replace(/[<>:"/\\|?*]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "") || Np;
}, HS = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), i = FS, r = i, o = i * 2, c = s * (e.tileWidth + o), u = l * (e.tileHeight + o), h = new Uint8ClampedArray(c * u * 4), p = t.map((g) => wt(g) ?? { r: 0, g: 0, b: 0 }), d = (g, y, S) => {
    if (g < 0 || y < 0 || g >= c || y >= u)
      return;
    const b = (y * c + g) * 4;
    h[b] = S.r, h[b + 1] = S.g, h[b + 2] = S.b, h[b + 3] = 255;
  };
  n.forEach((g, y) => {
    const S = e.tiles[g];
    if (!S)
      return;
    const b = y % s * (e.tileWidth + o), _ = Math.floor(y / s) * (e.tileHeight + o);
    for (let C = 0; C < e.tileHeight; C += 1)
      for (let j = 0; j < e.tileWidth; j += 1) {
        const A = S.pixels[C * e.tileWidth + j] ?? 0;
        if (A === 0)
          continue;
        const L = p[A] ?? p[0] ?? { r: 0, g: 0, b: 0 }, F = b + r + j, P = _ + r + C;
        d(F, P, L), j === 0 && d(F - 1, P, L), j === e.tileWidth - 1 && d(F + 1, P, L), C === 0 && d(F, P - 1, L), C === e.tileHeight - 1 && d(F, P + 1, L), j === 0 && C === 0 && d(F - 1, P - 1, L), j === 0 && C === e.tileHeight - 1 && d(F - 1, P + 1, L), j === e.tileWidth - 1 && C === 0 && d(F + 1, P - 1, L), j === e.tileWidth - 1 && C === e.tileHeight - 1 && d(F + 1, P + 1, L);
      }
  });
  const f = document.createElement("canvas");
  f.width = c, f.height = u;
  const m = f.getContext("2d");
  if (!m)
    throw new Error("Unable to export tile atlas.");
  const w = new ImageData(h, c, u);
  m.putImageData(w, 0, 0);
  const M = await new Promise(
    (g) => f.toBlob((y) => g(y), "image/png")
  );
  if (!M)
    throw new Error("Unable to export tile atlas.");
  return { buffer: new Uint8Array(await M.arrayBuffer()), columns: s, rows: l, width: c, height: u, margin: r, spacing: o };
}, jx = async (e, t) => {
  const n = B.project();
  if (!(n != null && n.exportTileMap))
    return B.alert("Tile export is unavailable. Restart the app to load the latest export support."), null;
  const s = V.getState(), l = s.tileSets.find((S) => S.id === s.activeTileSetId);
  if (!l)
    return B.alert("No tile set available."), null;
  const i = s.tileMaps.find(
    (S) => S.id === s.activeTileMapId && S.tileSetId === l.id
  ) ?? s.tileMaps.find((S) => S.tileSetId === l.id);
  if (!i)
    return B.alert("No tile map available."), null;
  const r = Math.round(i.originX / l.tileWidth), o = Math.round(i.originY / l.tileHeight), c = e.maxTileX - e.minTileX + 1, u = e.maxTileY - e.minTileY + 1, h = [], p = /* @__PURE__ */ new Set();
  for (let S = 0; S < u; S += 1)
    for (let b = 0; b < c; b += 1) {
      const _ = e.minTileX + b, C = e.minTileY + S, j = _ - r, A = C - o;
      let L = -1;
      j >= 0 && j < i.columns && A >= 0 && A < i.rows && (L = i.tiles[A * i.columns + j] ?? -1), h.push(L), L >= 0 && L < l.tiles.length && p.add(L);
    }
  if (p.size === 0)
    return B.alert("No tiles in the selected region."), null;
  const d = zS(t == null ? void 0 : t.baseName), f = Array.from(p).sort((S, b) => S - b), m = /* @__PURE__ */ new Map();
  f.forEach((S, b) => m.set(S, b));
  const w = h.map((S) => {
    if (S < 0)
      return 0;
    const b = m.get(S);
    return b === void 0 ? 0 : b + 1;
  }), M = re.getState().colors, v = await HS(l, M, f), g = [];
  for (let S = 0; S < u; S += 1) {
    const b = S * c, _ = w.slice(b, b + c).join(",");
    g.push(S === u - 1 ? _ : `${_},`);
  }
  const y = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${c}" height="${u}" tilewidth="${l.tileWidth}" tileheight="${l.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${l.tileWidth}" tileheight="${l.tileHeight}" tilecount="${f.length}" columns="${v.columns}" spacing="${v.spacing}" margin="${v.margin}">
    <image source="${d}.png" width="${v.width}" height="${v.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${c}" height="${u}">
    <data encoding="csv">
${g.join(`
`)}
    </data>
  </layer>
</map>
`;
  return n.exportTileMap({
    png: v.buffer,
    tmx: y,
    baseName: d
  });
}, WS = async (e, t) => {
  const n = V.getState(), s = n.tileSets.find((h) => h.id === n.activeTileSetId);
  if (!s)
    return B.alert("No tile set available."), null;
  const l = Math.max(1, Math.round(e.width)), i = Math.max(1, Math.round(e.height)), r = Math.floor(e.x / s.tileWidth), o = Math.floor(e.y / s.tileHeight), c = Math.ceil((e.x + l) / s.tileWidth) - 1, u = Math.ceil((e.y + i) / s.tileHeight) - 1;
  return jx({ minTileX: r, minTileY: o, maxTileX: c, maxTileY: u }, t);
}, Nc = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), Ic = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), Ip = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), US = (e, t, n) => {
  const s = $.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let i = e.minTileX; i <= e.maxTileX; i += 1) {
      const r = i * t, o = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(r + u, o + c, 1);
    }
};
class $S {
  constructor() {
    this.id = "tile-export", this.start = null, this.last = null, this.tileWidth = 0, this.tileHeight = 0, this.onBegin = (t) => {
      $.getState().clear();
      const s = V.getState().tileSets.find(
        (l) => l.id === V.getState().activeTileSetId
      );
      if (!s) {
        this.start = null, this.last = null;
        return;
      }
      this.tileWidth = s.tileWidth, this.tileHeight = s.tileHeight, this.start = Ic(Nc(t), this.tileWidth, this.tileHeight), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      $.getState().clear();
      const s = Ic(Nc(t), this.tileWidth, this.tileHeight);
      this.last = s, US(Ip(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = $.getState(), s = t ? Ic(Nc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = Ip(this.start, s);
      n.clear(), this.start = null, this.last = null, jx(l);
    }, this.onCancel = () => {
      $.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const VS = 32, Ec = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), Ep = (e, t, n, s, l) => {
  const i = $.getState();
  for (let r = 0; r < s; r += 1)
    for (let o = 0; o < n; o += 1) {
      const c = l[r * n + o] ?? 0;
      c !== 0 && i.setPixel(e + o, t + r, c);
    }
}, Rp = () => {
  const e = V.getState(), t = e.tileSets.find((n) => n.id === e.activeTileSetId);
  return t ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    tileSetTiles: t.tiles
  } : null;
}, Ap = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((d) => d.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (d) => d.id === n.activeTileMapId && d.tileSetId === e
  );
  if (l)
    return {
      tileMapId: l.id,
      originX: l.originX,
      originY: l.originY,
      columns: l.columns,
      rows: l.rows,
      tiles: l.tiles
    };
  const i = n.tileMaps.find((d) => d.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const r = VS, o = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: o
  }), originX: u, originY: h, columns: r, rows: r, tiles: o };
};
class KS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || ($.getState().clear(), this.activeTile = Rp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = Ap(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = V.getState();
      if (!s.nineSlice) {
        const r = this.readNineSliceFromSelection();
        if (r)
          s.setNineSlice(r);
        else
          return;
      }
      const l = Ec(t), i = this.toWorldTilePoint(l);
      i && this.applyNineSlice(i, i);
    }, this.onBegin = (t) => {
      if ($.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Rp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ht(), this.resetPlacementResolver(), this.activeMap = Ap(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = V.getState(), l = !s.nineSlice || t.ctrl;
      this.sampling = l;
      const i = Ec(t), r = this.toWorldTilePoint(i);
      if (r && (this.startWorldPoint = r, this.lastWorldPoint = r, !this.sampling)) {
        if (!s.nineSlice) {
          const o = this.readNineSliceFromSelection();
          o && s.setNineSlice(o);
        }
        this.applyNineSlice(r, r);
      }
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap || !this.startWorldPoint)
        return;
      const n = Ec(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      if (this.lastWorldPoint = s, $.getState().clear(), !this.sampling) {
        this.changes.clear(), this.resetPlacementResolver(), this.applyNineSlice(this.startWorldPoint, s);
        return;
      }
      const i = Math.min(this.startWorldPoint.x, s.x), r = Math.min(this.startWorldPoint.y, s.y);
      this.drawSamplePreview({ x: i, y: r });
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      const t = V.getState();
      if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
        const s = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x), l = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y), i = this.readNineSlice({ x: s, y: l });
        i && t.setNineSlice(i);
      } else if (this.changes.size > 0) {
        if (this.placementResolver) {
          const l = this.placementResolver.getPendingTiles();
          l.length > 0 && V.getState().appendTilesToSet(this.activeTile.tileSetId, l);
        }
        const s = Array.from(this.changes.entries()).map(([l, i]) => ({
          index: l,
          tile: i
        }));
        V.getState().setTileMapTiles(this.activeMap.tileMapId, s);
      }
      if (this.historyBefore) {
        const s = Ht();
        qs(this.historyBefore, s);
      }
      $.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      $.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Vo(this.activeTile.tileSetTiles);
  }
  getCurrentTileIndex(t) {
    var s;
    const n = this.changes.get(t);
    return typeof n == "number" ? n : ((s = this.activeMap) == null ? void 0 : s.tiles[t]) ?? -1;
  }
  resolvePlacedTileIndex(t, n) {
    return !this.activeTile || !this.placementResolver || t < 0 ? t : this.placementResolver.resolve(
      this.activeTile.placementMode,
      t,
      this.getCurrentTileIndex(n)
    );
  }
  getTilePixels(t) {
    var n;
    return t < 0 ? null : ((n = this.placementResolver) == null ? void 0 : n.getTilePixels(t)) ?? null;
  }
  toWorldTilePoint(t) {
    return this.activeTile ? {
      x: Math.floor(t.x / this.activeTile.tileWidth),
      y: Math.floor(t.y / this.activeTile.tileHeight)
    } : null;
  }
  toMapPoint(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = Math.round(this.activeMap.originX / this.activeTile.tileWidth), s = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    return {
      x: t.x - n,
      y: t.y - s
    };
  }
  ensureMapBounds(t, n) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const s = Math.min(t.x, n.x), l = Math.min(t.y, n.y), i = Math.max(t.x, n.x), r = Math.max(t.y, n.y), o = this.toMapPoint({ x: s, y: l });
    if (!o)
      return null;
    const u = V.getState().expandTileMapToInclude(
      this.activeMap.tileMapId,
      o.x,
      o.x + (i - s),
      o.y,
      o.y + (r - l),
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    return u && (this.activeMap = {
      tileMapId: u.id,
      originX: u.originX,
      originY: u.originY,
      columns: u.columns,
      rows: u.rows,
      tiles: u.tiles
    }), this.toMapPoint({ x: s, y: l });
  }
  readNineSlice(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.toMapPoint(t);
    if (!n)
      return null;
    const l = V.getState().tileMaps.find(
      (u) => {
        var h;
        return u.id === ((h = this.activeMap) == null ? void 0 : h.tileMapId);
      }
    );
    if (!l)
      return null;
    const { columns: i, rows: r, tiles: o } = l, c = [];
    for (let u = 0; u < 3; u += 1)
      for (let h = 0; h < 3; h += 1) {
        const p = n.x + h, d = n.y + u;
        if (p < 0 || d < 0 || p >= i || d >= r) {
          c.push(-1);
          continue;
        }
        const f = d * i + p, m = o[f] ?? -1;
        c.push(m);
      }
    return { tileSetId: this.activeTile.tileSetId, tiles: c };
  }
  readNineSliceFromSelection() {
    const t = V.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
    if (n !== 3 || s !== 3 || l.length < 9)
      return null;
    const i = l.slice(0, 9);
    return i.some((r) => r < 0) || !this.activeTile ? null : { tileSetId: this.activeTile.tileSetId, tiles: i };
  }
  drawSamplePreview(t) {
    if (!this.activeTile || !this.activeMap)
      return;
    const n = this.toMapPoint(t);
    if (!n)
      return;
    const l = V.getState().tileMaps.find(
      (c) => {
        var u;
        return c.id === ((u = this.activeMap) == null ? void 0 : u.tileMapId);
      }
    );
    if (!l)
      return;
    const { columns: i, rows: r, tiles: o } = l;
    for (let c = 0; c < 3; c += 1)
      for (let u = 0; u < 3; u += 1) {
        const h = n.x + u, p = n.y + c;
        if (h < 0 || p < 0 || h >= i || p >= r)
          continue;
        const d = p * i + h, f = o[d] ?? -1;
        if (f < 0 || f >= this.activeTile.tileSetTiles.length)
          continue;
        const m = this.activeTile.tileSetTiles[f], w = t.x + u, M = t.y + c;
        Ep(
          w * this.activeTile.tileWidth,
          M * this.activeTile.tileHeight,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          m.pixels
        );
      }
  }
  applyNineSlice(t, n) {
    if (!this.activeTile || !this.activeMap)
      return;
    const l = V.getState().nineSlice;
    if (!l || l.tileSetId !== this.activeTile.tileSetId)
      return;
    const i = Math.min(t.x, n.x), r = Math.max(t.x, n.x), o = Math.min(t.y, n.y), c = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: i, y: o }, { x: r, y: c }))
      return;
    const { columns: h, rows: p } = this.activeMap, d = Math.round(this.activeMap.originX / this.activeTile.tileWidth), f = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let m = o; m <= c; m += 1)
      for (let w = i; w <= r; w += 1) {
        const M = w - d, v = m - f;
        if (M < 0 || v < 0 || M >= h || v >= p)
          continue;
        const g = m === o, y = m === c, S = w === i, b = w === r;
        let _ = 4;
        g && S ? _ = 0 : g && b ? _ = 2 : y && S ? _ = 6 : y && b ? _ = 8 : g ? _ = 1 : y ? _ = 7 : S ? _ = 3 : b && (_ = 5);
        const C = l.tiles[_] ?? -1;
        if (C < 0 || C >= this.activeTile.tileSetTiles.length)
          continue;
        const j = v * h + M, A = this.resolvePlacedTileIndex(C, j);
        this.drawing && this.changes.set(j, A);
        const L = this.getTilePixels(A);
        if (!L)
          continue;
        const F = w * this.activeTile.tileWidth, P = m * this.activeTile.tileHeight;
        Ep(
          F,
          P,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          L
        );
      }
  }
}
class GS {
  constructor() {
    this.id = "text";
  }
}
class QS {
  constructor() {
    this.id = "ai";
  }
}
const ZS = () => {
  const e = ke.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / k),
    minY: Math.floor(e.camera.y / k),
    maxX: Math.floor((e.camera.x + t) / k),
    maxY: Math.floor((e.camera.y + n) / k)
  };
}, qS = (e) => ({
  x: Math.floor(e.canvasX / k),
  y: Math.floor(e.canvasY / k)
}), JS = (e, t, n, s) => {
  const l = ee.getState(), i = /* @__PURE__ */ new Set(), r = [e], o = [t], c = [];
  let u = !1;
  for (let h = 0; h < r.length; h += 1) {
    const p = r[h], d = o[h];
    if (p < s.minX || p > s.maxX || d < s.minY || d > s.maxY)
      continue;
    const f = `${p}:${d}`;
    i.has(f) || (i.add(f), l.getPixel(p, d) === n && ((p === s.minX || p === s.maxX || d === s.minY || d === s.maxY) && (u = !0), c.push({ x: p, y: d }), r.push(p + 1, p - 1, p, p), o.push(d, d, d + 1, d - 1)));
  }
  return { pixels: c, touchesBoundary: u };
};
class eM {
  constructor() {
    this.id = "magic-wand", this.onBegin = (t) => {
      const n = ZS();
      if (!n)
        return;
      const { x: s, y: l } = qS(t);
      if (s < n.minX || s > n.maxX || l < n.minY || l > n.maxY)
        return;
      const i = ee.getState().getPixel(s, l), { pixels: r, touchesBoundary: o } = JS(s, l, i, n);
      if (r.length === 0 || i === 0 && o)
        return;
      const c = !t.ctrl;
      we.getState().setSelections(r.map((u) => ({ x: u.x, y: u.y, selected: c })));
    };
  }
}
const It = nt((e) => ({
  activeTool: "pen",
  setActiveTool: (t) => e({ activeTool: t })
})), Du = nt((e) => ({
  isRecording: !1,
  setIsRecording: (t) => e({ isRecording: t })
})), qr = (e, t, n) => Math.min(n, Math.max(t, e)), tM = ({ x: e, y: t, onClose: n }) => {
  const s = It((S) => S.activeTool), l = gn((S) => S.size), i = gn((S) => S.shape), r = Zt((S) => S.radius), o = Zt((S) => S.density), c = bt((S) => S.mode), u = we((S) => S.selectedCount), h = T.useRef(null), [p, d] = T.useState({ x: e, y: t }), f = T.useMemo(() => Gw[s] ?? "Tools", [s]);
  T.useEffect(() => {
    const S = (_) => {
      h.current && h.current.contains(_.target) || n();
    }, b = (_) => {
      _.key === "Escape" && n();
    };
    return window.addEventListener("mousedown", S), window.addEventListener("keydown", b), () => {
      window.removeEventListener("mousedown", S), window.removeEventListener("keydown", b);
    };
  }, [n]), T.useLayoutEffect(() => {
    if (!h.current)
      return;
    const S = h.current.getBoundingClientRect(), b = 8, _ = Math.max(b, window.innerWidth - S.width - b), C = Math.max(b, window.innerHeight - S.height - b), j = qr(e, b, _), A = qr(t, b, C);
    d({ x: j, y: A });
  }, [e, t]);
  const m = (S) => gn.getState().setSize(S), w = (S) => gn.getState().setShape(S), M = (S) => Zt.getState().setRadius(S), v = (S) => Zt.getState().setDensity(S), g = (S) => bt.getState().setMode(S), y = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      ref: h,
      className: "tool-context-menu",
      role: "menu",
      style: { top: p.y, left: p.x },
      children: [
        /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__title", children: f }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              ke.getState().resetCamera(), n();
            },
            children: "Reset View"
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              ke.getState().zoomBy(0.25), n();
            },
            children: "Zoom In"
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              ke.getState().zoomBy(-0.25), n();
            },
            children: "Zoom Out"
          }
        ),
        u > 0 && /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              we.getState().clear(), n();
            },
            children: "Clear Selection"
          }
        ),
        y && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__label", children: "Brush" }),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => m(qr(l - 1, 1, 64)),
              children: [
                "Size - (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => m(qr(l + 1, 1, 64)),
              children: [
                "Size + (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": i === "point",
              role: "menuitemradio",
              onClick: () => w("point"),
              children: "Shape: Point"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": i === "square",
              role: "menuitemradio",
              onClick: () => w("square"),
              children: "Shape: Square"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": i === "round",
              role: "menuitemradio",
              onClick: () => w("round"),
              children: "Shape: Round"
            }
          )
        ] }),
        s === "spray" && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__label", children: "Spray" }),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => M(r - 1),
              children: [
                "Radius - (",
                r,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => M(r + 1),
              children: [
                "Radius + (",
                r,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => v(o - 50),
              children: [
                "Density - (",
                o,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ a.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => v(o + 50),
              children: [
                "Density + (",
                o,
                ")"
              ]
            }
          )
        ] }),
        s === "fill-bucket" && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ a.jsx("div", { className: "tool-context-menu__label", children: "Fill" }),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": c === "color",
              role: "menuitemradio",
              onClick: () => g("color"),
              children: "Mode: Color"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": c === "selection",
              role: "menuitemradio",
              onClick: () => g("selection"),
              children: "Mode: Selection"
            }
          )
        ] })
      ]
    }
  );
}, nM = (e) => new Promise((t, n) => {
  const s = new FileReader();
  s.onerror = () => n(new Error("Failed to read image file")), s.onload = () => t(s.result), s.readAsDataURL(e);
}), sM = (e) => new Promise((t, n) => {
  const s = new Image();
  s.onload = () => t(s), s.onerror = () => n(new Error("Failed to load image")), s.src = e;
}), Px = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), lM = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : Px(t[t.length - 1]);
}, Nx = (e, t) => {
  const n = lM(e.name ?? "");
  return n || Px(Kw[t] ?? t.split("/")[1] ?? "");
}, iM = (e, t) => e || (t && tp[t] ? tp[t] : "image/png"), rM = (e, t) => {
  const n = Nx(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, Ix = () => {
  const e = ke.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, oM = (e, t, n) => Math.min(n, Math.max(t, e)), aM = (e) => {
  const t = ke.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * k, i = e.naturalHeight * k, r = Math.min(n / l, s / i) * 0.9;
  return oM(r, Zs, Ul);
}, cM = (e) => ({
  x: Math.floor(e.x / k),
  y: Math.floor(e.y / k)
}), Ex = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = Nx(e, n), l = iM(n, s), [i, r] = await Promise.all([nM(e), e.arrayBuffer()]), o = await sM(i), c = t ?? Ix(), u = cM(c), h = aM(o), p = rM(e, l);
  Wt.getState().addReference({
    image: o,
    assetFilename: p,
    assetType: l,
    assetData: new Uint8Array(r),
    width: o.naturalWidth || o.width,
    height: o.naturalHeight || o.height,
    x: u.x,
    y: u.y,
    scale: h,
    rotation: 0,
    flipX: !1,
    flipY: !1,
    opacity: 0.7
  }), It.getState().setActiveTool("reference-handle");
}, uM = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? Ix();
  for (let l = 0; l < n.length; l += 1) {
    const i = l * k * 2, r = { x: s.x + i, y: s.y + i };
    await Ex(n[l], r);
  }
}, Lp = (e, t, n, s, l, i, r) => {
  e.strokeStyle = r, e.lineWidth = 1;
  const o = Math.floor(t / i) * i, c = t + s;
  for (let p = o; p <= c; p += i)
    e.beginPath(), e.moveTo(p + 0.5, n), e.lineTo(p + 0.5, n + l), e.stroke();
  const u = Math.floor(n / i) * i, h = n + l;
  for (let p = u; p <= h; p += i)
    e.beginPath(), e.moveTo(t, p + 0.5), e.lineTo(t + s, p + 0.5), e.stroke();
}, dM = (e, t, n, s, l, i, r) => {
  const o = rS();
  if (o.length !== 0) {
    e.save(), e.fillStyle = i, e.strokeStyle = r, e.lineWidth = Math.max(1, k * 0.08);
    for (const c of o) {
      const u = c.col * Y * k, h = c.row * Y * k, p = u + Y * k, d = h + Y * k;
      p < t || d < n || u > t + s || h > n + l || (e.fillRect(u, h, Y * k, Y * k), e.strokeRect(
        u + 0.5,
        h + 0.5,
        Y * k - 1,
        Y * k - 1
      ));
    }
    e.restore();
  }
}, hM = (e, t, n, s, l, i) => {
  e.strokeStyle = i, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, fM = (e, t, n, s, l) => {
  var o;
  const i = Mt.getState();
  if (!i.overlaysVisible)
    return;
  const r = i.items.filter((c) => c.kind === "region");
  if (r.length !== 0) {
    e.save(), e.lineWidth = 1.5, e.font = '11px "Segoe UI", "Helvetica Neue", sans-serif';
    for (const c of r) {
      const u = c.x * k, h = c.y * k, p = Math.max(1, c.width) * k, d = Math.max(1, c.height) * k, f = u + p, m = h + d;
      if (f < t || m < n || u > t + s || h > n + l)
        continue;
      e.fillStyle = "rgba(66, 197, 255, 0.16)", e.strokeStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h, p, d), e.strokeRect(u + 0.5, h + 0.5, Math.max(0, p - 1), Math.max(0, d - 1));
      const w = ((o = c.name) == null ? void 0 : o.trim()) || "Bookmark", M = e.measureText(w).width, v = 5, g = 16, y = Math.max(36, Math.ceil(M + v * 2));
      e.fillStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h - g, y, g), e.fillStyle = "rgba(5, 12, 18, 0.95)", e.fillText(w, u + v, h - 4);
    }
    e.restore();
  }
}, pM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, Rx = (e, t) => {
  const n = document.createElement("canvas");
  n.width = Y * k, n.height = Y * k;
  const s = n.getContext("2d");
  if (!s)
    return null;
  s.imageSmoothingEnabled = !1;
  let l = 0;
  for (let i = 0; i < Y; i += 1)
    for (let r = 0; r < Y; r += 1) {
      const o = e[i * Y + r];
      o !== 0 && (l += 1, s.fillStyle = t[o] ?? t[0], s.fillRect(r * k, i * k, k, k));
    }
  return { canvas: n, pixels: l };
}, mM = (e, t, n, s) => {
  const l = document.createElement("canvas");
  l.width = n * k, l.height = s * k;
  const i = l.getContext("2d");
  if (!i)
    return null;
  i.imageSmoothingEnabled = !1;
  for (let r = 0; r < s; r += 1)
    for (let o = 0; o < n; o += 1) {
      const c = e[r * n + o] ?? 0;
      c !== 0 && (i.fillStyle = t[c] ?? t[0], i.fillRect(o * k, r * k, k, k));
    }
  return { canvas: l };
}, gM = (e, t, n, s, l, i, r) => {
  const o = ee.getState();
  let c = 0, u = 0;
  for (const h of o.layers) {
    if (!h.visible)
      continue;
    const p = h.store.getBlocks();
    for (const { row: d, col: f, block: m } of p) {
      const w = f * Y, M = d * Y, v = w * k, g = M * k, y = v + Y * k, S = g + Y * k;
      if (y < t || S < n || v > t + s || g > n + l)
        continue;
      c += 1;
      const b = `${h.id}:${d}:${f}`;
      let _ = r.get(b);
      if (!_) {
        const C = Rx(m, i);
        C && (_ = C, r.set(b, C));
      }
      _ && (u += _.pixels, e.drawImage(_.canvas, v, g));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, xM = (e) => {
  const t = document.createElement("canvas");
  t.width = Y * k, t.height = Y * k;
  const n = t.getContext("2d");
  if (!n)
    return null;
  n.imageSmoothingEnabled = !1, n.fillStyle = "#ffffff";
  let s = !1;
  for (let l = 0; l < Y; l += 1)
    for (let i = 0; i < Y; i += 1)
      e[l * Y + i] === 1 && (n.fillRect(i * k, l * k, k, k), s = !0);
  return s ? { canvas: t } : null;
}, yM = (e, t, n, s, l, i, r) => {
  if (r) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [o, c] of i.entries()) {
      const [u, h] = o.split(":"), p = Number(u), f = Number(h) * Y * k, m = p * Y * k, w = f + Y * k, M = m + Y * k;
      w < t || M < n || f > t + s || m > n + l || e.drawImage(c.canvas, f, m);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [o, c] of i.entries()) {
      const [u, h] = o.split(":"), p = Number(u), f = Number(h) * Y * k, m = p * Y * k, w = f + Y * k, M = m + Y * k;
      w < t || M < n || f > t + s || m > n + l || e.drawImage(c.canvas, f, m);
    }
    e.restore();
  }
}, vM = (e, t, n, s, l) => {
  const i = we.getState();
  if (i.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const r = i.store.getBlocks();
  for (const { row: o, col: c, block: u } of r) {
    const h = c * Y, p = o * Y, d = h * k, f = p * k, m = d + Y * k, w = f + Y * k;
    if (!(m < t || w < n || d > t + s || f > n + l))
      for (let M = 0; M < Y; M += 1)
        for (let v = 0; v < Y; v += 1) {
          if (u[M * Y + v] !== 1)
            continue;
          const g = h + v, y = p + M;
          i.isSelected(g - 1, y) && i.isSelected(g + 1, y) && i.isSelected(g, y - 1) && i.isSelected(g, y + 1) || (g + y) % 2 === 0 && e.fillRect(
            g * k,
            y * k,
            k,
            k
          );
        }
  }
  e.restore();
}, wM = (e, t, n, s, l, i, r) => {
  const { tileSets: o, tileMaps: c } = V.getState();
  if (o.length === 0 || c.length === 0)
    return;
  const u = t / k, h = n / k, p = u + s / k, d = h + l / k, f = new Map(o.map((m) => [m.id, m]));
  for (const m of c) {
    const w = f.get(m.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const g = m.columns * M, y = m.rows * v, S = m.originX, b = m.originY, _ = S + g, C = b + y;
    if (_ < u || C < h || S > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      m.columns - 1,
      Math.ceil((p - S) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), F = Math.min(
      m.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || F < L))
      for (let P = L; P <= F; P += 1)
        for (let z = j; z <= A; z += 1) {
          const Z = P * m.columns + z, oe = m.tiles[Z] ?? -1;
          if (oe < 0)
            continue;
          const G = w.tiles[oe];
          if (!G)
            continue;
          const ne = `${w.id}:${oe}`;
          let D = r.get(ne);
          if (!D) {
            const H = mM(
              G.pixels,
              i,
              M,
              v
            );
            H && (D = H, r.set(ne, H));
          }
          D && e.drawImage(
            D.canvas,
            (S + z * M) * k,
            (b + P * v) * k
          );
        }
  }
}, SM = (e, t, n, s, l, i, r) => {
  const { tileSets: o, tileMaps: c } = V.getState();
  if (o.length === 0 || c.length === 0)
    return;
  const u = t / k, h = n / k, p = u + s / k, d = h + l / k, f = new Map(o.map((m) => [m.id, m]));
  e.save(), e.fillStyle = i, e.strokeStyle = r, e.lineWidth = Math.max(1, k * 0.08);
  for (const m of c) {
    const w = f.get(m.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const g = m.columns * M, y = m.rows * v, S = m.originX, b = m.originY, _ = S + g, C = b + y;
    if (_ < u || C < h || S > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      m.columns - 1,
      Math.ceil((p - S) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), F = Math.min(
      m.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || F < L))
      for (let P = L; P <= F; P += 1)
        for (let z = j; z <= A; z += 1) {
          const Z = P * m.columns + z;
          if ((m.tiles[Z] ?? -1) < 0)
            continue;
          const G = (S + z * M) * k, ne = (b + P * v) * k, D = M * k, H = v * k;
          e.fillRect(G, ne, D, H), e.strokeRect(G + 0.5, ne + 0.5, D - 1, H - 1);
        }
  }
  e.restore();
}, MM = (e, t, n) => {
  const s = $.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * k,
      l.y * k,
      k,
      k
    );
}, bM = (e, t, n, s, l) => {
  const i = Wt.getState().items;
  if (i.length !== 0)
    for (const r of i) {
      const o = ya(r);
      if (o.maxX < t || o.maxY < n || o.minX > t + s || o.minY > n + l)
        continue;
      const c = qn(r);
      e.save(), e.globalAlpha = r.opacity, e.translate(c.centerX, c.centerY), e.rotate(c.rotationRad), e.scale(c.scale * c.flipX, c.scale * c.flipY), e.drawImage(
        r.image,
        -c.baseWidth / 2,
        -c.baseHeight / 2,
        c.baseWidth,
        c.baseHeight
      ), e.restore();
    }
}, _M = (e, t, n, s, l) => {
  const { items: i, selectedId: r } = Wt.getState();
  if (!r)
    return;
  const o = i.find((f) => f.id === r);
  if (!o)
    return;
  const c = ya(o);
  if (c.maxX < t || c.maxY < n || c.minX > t + s || c.minY > n + l)
    return;
  const u = k * 0.6, h = u / 2, p = xa(o), d = Object.values(p);
  e.save(), e.strokeStyle = "rgba(245, 197, 66, 0.85)", e.lineWidth = Math.max(1, k * 0.08), e.beginPath(), e.moveTo(p.nw.x, p.nw.y), e.lineTo(p.ne.x, p.ne.y), e.lineTo(p.se.x, p.se.y), e.lineTo(p.sw.x, p.sw.y), e.closePath(), e.stroke(), e.fillStyle = "rgba(245, 197, 66, 0.9)";
  for (const f of d)
    e.fillRect(f.x - h, f.y - h, u, u);
  e.restore();
}, TM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(null), s = T.useRef(null), l = T.useRef(/* @__PURE__ */ new Map()), i = T.useRef(/* @__PURE__ */ new Map()), r = T.useRef(/* @__PURE__ */ new Map()), o = T.useRef(0), c = ke((P) => P.setSize), [u, h] = T.useState(!1), [p, d] = T.useState({ open: !1, x: 0, y: 0 }), f = T.useRef(null), m = T.useRef({ remainingLogDelta: 0, anchor: null, frame: null }), w = T.useRef(Promise.resolve());
  T.useEffect(() => {
    const P = e.current, z = t.current, Z = m.current;
    if (!P || !z)
      return;
    c(P.clientWidth, P.clientHeight), s.current = new Jw();
    const oe = {
      pen: new x1(),
      spray: new S1(),
      line: new L1(),
      rectangle: new Y1(),
      oval: new O1(),
      "fill-bucket": new dS(),
      text: new GS(),
      ai: new QS(),
      eyedropper: new gS(),
      "reference-handle": new MS(),
      stamp: new mS(),
      "magic-wand": new eM(),
      "selection-rect": new U1(),
      "selection-oval": new K1(),
      "selection-lasso": new q1(),
      "texture-roll": new J1(),
      "tile-sampler": new jS(),
      "tile-pen": new RS(),
      "tile-stamp": new BS(),
      "tile-rectangle": new XS(),
      "tile-9slice": new KS(),
      "tile-export": new $S()
    }, G = oe[It.getState().activeTool] ?? oe.pen;
    s.current.setTool(G);
    const ne = It.subscribe((xe) => {
      var O;
      (O = s.current) == null || O.setTool(oe[xe.activeTool] ?? oe.pen);
    }), D = re.subscribe(() => {
      l.current.clear(), r.current.clear();
    }), H = we.subscribe(() => {
      i.current.clear();
    }), Q = V.subscribe(() => {
      r.current.clear();
    }), le = () => {
      var Rn;
      const xe = performance.now(), O = ke.getState();
      if (O.width === 0 || O.height === 0)
        return;
      const ie = pM(z, O.width, O.height);
      if (!ie)
        return;
      const ye = window.devicePixelRatio || 1;
      ie.clearRect(0, 0, O.width, O.height);
      const W = re.getState().colors, ge = W[0] ?? "#000000", N = wt(ge) ?? { r: 0, g: 0, b: 0 }, X = ma(N, pa(N)), se = dn(X, 0.08), ce = dn(X, 0.18), Ye = dn(X, 0.5), Se = dn(X, 0.08), Ue = dn(X, 0.35), Oe = dn(X, 0.2), ot = dn(X, 0.5);
      ie.fillStyle = ge, ie.fillRect(0, 0, O.width, O.height), ie.save(), ie.setTransform(
        O.camera.zoom * ye,
        0,
        0,
        O.camera.zoom * ye,
        -O.camera.x * O.camera.zoom * ye,
        -O.camera.y * O.camera.zoom * ye
      );
      const Xe = O.width / O.camera.zoom, me = O.height / O.camera.zoom, { dirtyAll: ht, blocks: Ie } = ee.getState().consumeDirtyBlocks();
      ht && l.current.clear();
      for (const Ee of Ie) {
        const de = `${Ee.layerId}:${Ee.row}:${Ee.col}`, Re = ee.getState().layers.find((I) => I.id === Ee.layerId), ft = Re == null ? void 0 : Re.store.getBlock(Ee.row, Ee.col);
        if (!ft) {
          l.current.delete(de);
          continue;
        }
        const Ct = Rx(ft, W);
        Ct && l.current.set(de, Ct);
      }
      (ht || Ie.length > 0) && V.getState().refreshCanvasSourcedTiles(
        ht,
        Ie.map((Ee) => ({ row: Ee.row, col: Ee.col }))
      );
      const Rt = we.getState(), Kt = Rt.consumeDirtyBlocks();
      Kt.dirtyAll && i.current.clear();
      for (const Ee of Kt.blocks) {
        const de = `${Ee.row}:${Ee.col}`, Re = Rt.store.getBlock(Ee.row, Ee.col);
        if (!Re) {
          i.current.delete(de);
          continue;
        }
        const ft = xM(Re);
        ft ? i.current.set(de, ft) : i.current.delete(de);
      }
      const gt = Le.getState();
      gt.showReferenceLayer && bM(ie, O.camera.x, O.camera.y, Xe, me);
      let Sn = 0, En = 0;
      if (gt.showPixelLayer) {
        const Ee = gM(
          ie,
          O.camera.x,
          O.camera.y,
          Xe,
          me,
          W,
          l.current
        );
        Sn = Ee.blocksDrawn, En = Ee.pixelsDrawn;
      }
      const Mn = Js.getState().mode;
      Mn === "pixel" && !gt.showTileLayer && SM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        Oe,
        ot
      ), gt.showTileLayer && wM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        W,
        r.current
      ), dM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        Se,
        Ue
      ), yM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        i.current,
        Rt.selectedCount > 0
      ), vM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me
      ), Mn === "pixel" && fM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me
      ), gt.showTileLayer && V.getState().tileDebugOverlay && CM(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me
      ), gt.showPixelGrid && Lp(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        k,
        se
      ), gt.showTileGrid && Lp(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me,
        k * pe,
        ce
      ), gt.showAxes && hM(ie, O.camera.x, O.camera.y, Xe, me, Ye);
      const sn = It.getState().activeTool;
      MM(ie, W, sn === "selection-rect" || sn === "selection-oval" || sn === "selection-lasso" || sn === "texture-roll" || sn === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), sn === "reference-handle" && _M(
        ie,
        O.camera.x,
        O.camera.y,
        Xe,
        me
      ), ie.restore();
      const Ps = performance.now(), es = Ps - xe;
      es > 50 && Ps - o.current > 500 && (o.current = Ps, (Rn = B.debug()) == null || Rn.logPerf(
        [
          "viewport:render",
          `ms=${es.toFixed(2)}`,
          `zoom=${O.camera.zoom.toFixed(2)}`,
          `view=${Xe.toFixed(1)}x${me.toFixed(1)}`,
          `blocks=${Sn}`,
          `pixels=${En}`
        ].join(" ")
      )), n.current = requestAnimationFrame(le);
    };
    n.current = requestAnimationFrame(le);
    const ae = new ResizeObserver((xe) => {
      for (const O of xe)
        c(O.contentRect.width, O.contentRect.height);
    });
    return ae.observe(P), () => {
      ne(), D(), H(), Q(), ae.disconnect(), n.current && cancelAnimationFrame(n.current), Z.frame && (cancelAnimationFrame(Z.frame), Z.frame = null);
    };
  }, [c]);
  const M = (P) => {
    const z = P.currentTarget.getBoundingClientRect(), Z = P.clientX - z.left, oe = P.clientY - z.top, G = ke.getState();
    return {
      screenX: Z,
      screenY: oe,
      canvasX: Z / G.camera.zoom + G.camera.x,
      canvasY: oe / G.camera.zoom + G.camera.y,
      primary: (P.buttons & 1) === 1,
      alt: P.altKey,
      ctrl: P.ctrlKey,
      shift: P.shiftKey
    };
  }, v = (P) => {
    P.preventDefault(), P.currentTarget.setPointerCapture(P.pointerId);
    const z = ke.getState();
    f.current = {
      screenX: P.clientX,
      screenY: P.clientY,
      cameraX: z.camera.x,
      cameraY: z.camera.y,
      zoom: z.camera.zoom
    }, h(!0), $.getState().clear();
  }, g = (P) => {
    const z = f.current;
    if (!z)
      return;
    const Z = P.clientX - z.screenX, oe = P.clientY - z.screenY, G = z.cameraX - Z / z.zoom, ne = z.cameraY - oe / z.zoom;
    ke.getState().panTo(G, ne);
  }, y = (P) => {
    f.current = null, h(!1), P.currentTarget.releasePointerCapture(P.pointerId);
  }, S = (P) => {
    var Z;
    if (P.button === 1) {
      v(P);
      return;
    }
    if (P.button === 2)
      return;
    const z = M(P);
    P.currentTarget.setPointerCapture(P.pointerId), (Z = s.current) == null || Z.handleEvent("begin", z);
  }, b = (P) => {
    var oe;
    if (f.current) {
      g(P);
      return;
    }
    const z = M(P), Z = (P.buttons & 1) === 1;
    (oe = s.current) == null || oe.handleEvent(Z ? "move" : "hover", z);
  }, _ = (P) => {
    var Z;
    if (f.current) {
      y(P);
      return;
    }
    const z = M(P);
    if ((Z = s.current) == null || Z.handleEvent("end", z), Du.getState().isRecording) {
      const oe = t.current, G = B.recording();
      oe && (G != null && G.addFrame) && (w.current = w.current.then(
        () => new Promise((ne) => {
          requestAnimationFrame(() => {
            oe.toBlob(async (D) => {
              if (!D) {
                ne();
                return;
              }
              try {
                const H = new Uint8Array(await D.arrayBuffer());
                await G.addFrame(H);
              } catch (H) {
                console.error("Failed to capture recording frame:", H);
              }
              ne();
            }, "image/png");
          });
        })
      ));
    }
    P.currentTarget.releasePointerCapture(P.pointerId);
  }, C = (P) => {
    var Z;
    if (f.current) {
      y(P);
      return;
    }
    const z = M(P);
    (Z = s.current) == null || Z.handleEvent("cancel", z);
  }, j = (P) => {
    var z;
    (z = P.dataTransfer) != null && z.types.includes("Files") && (P.preventDefault(), P.dataTransfer.dropEffect = "copy");
  }, A = (P) => {
    var D, H;
    if (!((H = (D = P.dataTransfer) == null ? void 0 : D.files) != null && H.length))
      return;
    P.preventDefault();
    const z = P.currentTarget.getBoundingClientRect(), Z = P.clientX - z.left, oe = P.clientY - z.top, G = ke.getState(), ne = {
      x: Z / G.camera.zoom + G.camera.x,
      y: oe / G.camera.zoom + G.camera.y
    };
    uM(Array.from(P.dataTransfer.files), ne);
  }, L = (P) => {
    if (P.deltaY === 0)
      return;
    P.preventDefault();
    const z = P.currentTarget.getBoundingClientRect(), Z = P.clientX - z.left, oe = P.clientY - z.top, G = ke.getState(), ne = {
      x: Z / G.camera.zoom + G.camera.x,
      y: oe / G.camera.zoom + G.camera.y
    }, D = P.deltaMode === 1 ? 16 : P.deltaMode === 2 ? Math.max(240, G.height) : 1;
    let Q = -(P.deltaY * D) * Ow;
    if (Q > ui ? Q = ui : Q < -ui && (Q = -ui), m.current.remainingLogDelta += Q, m.current.anchor = ne, m.current.frame)
      return;
    const le = () => {
      const ae = m.current, xe = ae.remainingLogDelta;
      if (!Number.isFinite(xe) || Math.abs(xe) < 5e-4) {
        ae.remainingLogDelta = 0, ae.frame = null;
        return;
      }
      const O = xe * 0.35, ye = Math.max(1e-3, ui * 0.25), W = Math.sign(O) * Math.min(Math.abs(O), ye), ge = ke.getState(), N = ge.camera.zoom, se = N * Math.exp(W) - N;
      if (!Number.isFinite(se) || Math.abs(se) < 1e-12) {
        ae.remainingLogDelta = 0, ae.frame = null;
        return;
      }
      ge.zoomBy(se, ae.anchor ?? void 0), ae.remainingLogDelta -= W, ae.frame = requestAnimationFrame(le);
    };
    m.current.frame = requestAnimationFrame(le);
  }, F = (P) => {
    P.preventDefault(), d({ open: !0, x: P.clientX, y: P.clientY });
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ a.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: S,
        onPointerMove: b,
        onPointerUp: _,
        onPointerLeave: C,
        onContextMenu: F,
        onDragOver: j,
        onDrop: A,
        onWheel: L,
        style: {
          cursor: u ? "grabbing" : "crosshair"
        }
      }
    ),
    p.open && /* @__PURE__ */ a.jsx(
      tM,
      {
        x: p.x,
        y: p.y,
        onClose: () => d((P) => P.open ? { ...P, open: !1 } : P)
      }
    )
  ] });
}, CM = (e, t, n, s, l) => {
  const { tileMaps: i } = V.getState();
  if (i.length !== 0) {
    e.save(), e.font = `${Math.max(10, k)}px sans-serif`, e.textBaseline = "top", e.fillStyle = "rgba(255, 186, 73, 0.95)", e.strokeStyle = "rgba(255, 186, 73, 0.5)", e.lineWidth = Math.max(1, k * 0.06);
    for (const r of i) {
      const o = r.originX * k, c = r.originY * k, u = r.columns * k, h = r.rows * k, p = o + u, d = c + h;
      p < t || d < n || o > t + s || c > n + l || (e.strokeRect(o, c, u, h), e.fillText(
        `map ${r.id.slice(0, 6)} origin=(${r.originX},${r.originY}) size=${r.columns}x${r.rows}`,
        o + k * 0.5,
        c + k * 0.5
      ));
    }
    e.restore();
  }
}, kM = () => {
  const e = ee.getState();
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  for (const i of e.layers)
    for (const { row: r, col: o, block: c } of i.store.getBlocks())
      for (let u = 0; u < Y; u += 1)
        for (let h = 0; h < Y; h += 1) {
          if (c[u * Y + h] === 0)
            continue;
          const d = (o * Y + h) * k, f = (r * Y + u) * k;
          t = Math.min(t, d), n = Math.min(n, f), s = Math.max(s, d + k), l = Math.max(l, f + k);
        }
  return Number.isFinite(t) ? { minX: t, minY: n, maxX: s, maxY: l } : null;
}, jM = () => {
  const e = ke.getState(), t = kM();
  let n = t ? t.minX : -is / 2, s = t ? t.minY : -is / 2, l = t ? t.maxX : is / 2, i = t ? t.maxY : is / 2;
  if (e.width > 0 && e.height > 0) {
    const c = e.width / e.camera.zoom, u = e.height / e.camera.zoom;
    n = Math.min(n, e.camera.x), s = Math.min(s, e.camera.y), l = Math.max(l, e.camera.x + c), i = Math.max(i, e.camera.y + u);
  }
  const r = l - n, o = i - s;
  if (r < is) {
    const c = (is - r) / 2;
    n -= c, l += c;
  }
  if (o < is) {
    const c = (is - o) / 2;
    s -= c, i += c;
  }
  return { minX: n, minY: s, maxX: l, maxY: i };
}, Ax = (e, t) => {
  const n = jM(), s = n.maxX - n.minX, l = n.maxY - n.minY, i = Math.min(e / s, t / l), r = (e - s * i) / 2 - n.minX * i, o = (t - l * i) / 2 - n.minY * i;
  return { bounds: n, scale: i, offsetX: r, offsetY: o };
}, PM = (e, t, n) => {
  const s = ke.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = wt(i) ?? { r: 0, g: 0, b: 0 }, o = ma(r, pa(r)), c = Ld(ds(r, o, 0.08)), u = dn(o, 0.12), h = dn(o, 0.6), p = dn(o, 0.8), { bounds: d, scale: f, offsetX: m, offsetY: w } = Ax(t, n), M = d.maxX - d.minX, v = d.maxY - d.minY;
  e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), e.fillStyle = c, e.fillRect(
    m + d.minX * f,
    w + d.minY * f,
    M * f,
    v * f
  ), e.strokeStyle = u, e.strokeRect(
    m + d.minX * f,
    w + d.minY * f,
    M * f,
    v * f
  );
  const g = m, y = w;
  e.strokeStyle = h, e.lineWidth = 2, e.beginPath(), e.moveTo(g + 0.5, w + d.minY * f), e.lineTo(g + 0.5, w + d.maxY * f), e.stroke(), e.beginPath(), e.moveTo(m + d.minX * f, y + 0.5), e.lineTo(m + d.maxX * f, y + 0.5), e.stroke();
  const S = ee.getState();
  let b = 0, _ = 0;
  if (Le.getState().showPixelLayer) {
    const C = f * k, j = Math.max(1, Math.floor(1 / Math.max(C * 0.75, 0.01)));
    for (const A of S.layers)
      if (A.visible)
        for (const { row: L, col: F, block: P } of A.store.getBlocks()) {
          b += 1;
          for (let z = 0; z < Y; z += j)
            for (let Z = 0; Z < Y; Z += j) {
              const oe = P[z * Y + Z];
              if (oe === 0)
                continue;
              _ += 1;
              const G = (F * Y + Z) * k, ne = (L * Y + z) * k;
              e.fillStyle = l[oe] ?? l[0];
              const D = Math.max(1, C * j);
              e.fillRect(
                m + G * f,
                w + ne * f,
                D,
                D
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const C = s.width / s.camera.zoom, j = s.height / s.camera.zoom, A = s.camera.x * f + m, L = s.camera.y * f + w, F = C * f, P = j * f;
    e.strokeStyle = p, e.lineWidth = 2, e.strokeRect(A, L, F, P);
  }
  return { blocksDrawn: b, pixelsDrawn: _, zoom: s.camera.zoom };
}, NM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, IM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(!1), s = T.useRef(null), l = T.useRef(null), i = T.useRef(0), r = ke((y) => y.panTo), o = ke((y) => y.zoomBy), c = ke((y) => y.resetCamera), u = ke((y) => y.camera), [h, p] = T.useState(String(Math.round(u.x))), [d, f] = T.useState(String(Math.round(u.y)));
  T.useEffect(() => {
    p(String(Math.round(u.x))), f(String(Math.round(u.y)));
  }, [u.x, u.y]);
  const m = () => {
    const y = Number(h), S = Number(d);
    Number.isFinite(y) && Number.isFinite(S) && r(y, S);
  };
  T.useEffect(() => {
    const y = e.current, S = t.current;
    if (!y || !S)
      return;
    const b = () => {
      var D;
      const F = NM(S, y.clientWidth, y.clientHeight);
      if (!F)
        return;
      const P = performance.now(), { blocksDrawn: z, pixelsDrawn: Z, zoom: oe } = PM(
        F,
        y.clientWidth,
        y.clientHeight
      ), G = performance.now(), ne = G - P;
      ne > 50 && G - i.current > 500 && (i.current = G, (D = B.debug()) == null || D.logPerf(
        [
          "minimap:render",
          `ms=${ne.toFixed(2)}`,
          `zoom=${oe.toFixed(2)}`,
          `blocks=${z}`,
          `pixels=${Z}`
        ].join(" ")
      ));
    };
    b();
    const _ = ke.subscribe(b), C = ee.subscribe(b), j = re.subscribe(b), A = Le.subscribe(b), L = new ResizeObserver(b);
    return L.observe(y), () => {
      _(), C(), j(), A(), L.disconnect();
    };
  }, []);
  const w = (y) => {
    const S = y.currentTarget.getBoundingClientRect(), b = y.clientX - S.left, _ = y.clientY - S.top, { scale: C, offsetX: j, offsetY: A } = Ax(S.width, S.height);
    return {
      x: (b - j) / C,
      y: (_ - A) / C
    };
  }, M = (y) => {
    y.currentTarget.setPointerCapture(y.pointerId), n.current = !0;
    const S = w(y), b = ke.getState(), _ = b.width / b.camera.zoom, C = b.height / b.camera.zoom;
    s.current = {
      x: S.x - _ / 2,
      y: S.y - C / 2
    };
    const j = () => {
      if (!n.current || !s.current)
        return;
      const A = ke.getState().camera, L = s.current.x - A.x, F = s.current.y - A.y, P = Math.hypot(L, F);
      if (P > 0.01) {
        const Z = Math.min(12, P * 0.25);
        r(
          A.x + L / P * Z,
          A.y + F / P * Z
        );
      }
      l.current = requestAnimationFrame(j);
    };
    l.current = requestAnimationFrame(j);
  }, v = (y) => {
    if (!n.current)
      return;
    const S = w(y), b = ke.getState(), _ = b.width / b.camera.zoom, C = b.height / b.camera.zoom;
    s.current = {
      x: S.x - _ / 2,
      y: S.y - C / 2
    };
  }, g = (y) => {
    n.current = !1, s.current = null, l.current && (cancelAnimationFrame(l.current), l.current = null), y.currentTarget.releasePointerCapture(y.pointerId);
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ a.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ a.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: M,
        onPointerMove: v,
        onPointerUp: g
      }
    ) }),
    /* @__PURE__ */ a.jsxs("div", { className: "minimap__controls", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => o(0.2), children: "+" }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => o(-0.2), children: "-" }),
      /* @__PURE__ */ a.jsx("button", { type: "button", onClick: c, children: "Home" })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ a.jsxs("label", { children: [
        "X:",
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            value: h,
            onChange: (y) => p(y.target.value),
            onBlur: m,
            onKeyDown: (y) => {
              y.key === "Enter" && m();
            }
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("label", { children: [
        "Y:",
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            value: d,
            onChange: (y) => f(y.target.value),
            onBlur: m,
            onKeyDown: (y) => {
              y.key === "Enter" && m();
            }
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        "Zoom: ",
        u.zoom.toFixed(3)
      ] })
    ] })
  ] });
}, EM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, RM = (e, t, n) => {
  const s = rt.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = wt(i) ?? { r: 0, g: 0, b: 0 }, o = ma(r, pa(r)), c = Ld(ds(r, o, 0.1)), u = dn(o, 0.12);
  if (e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), s.pixels.length === 0 || s.width === 0 || s.height === 0)
    return;
  const h = 12, p = Math.max(1, t - h * 2), d = Math.max(1, n - h * 2), f = Math.min(
    p / s.width,
    d / s.height
  ), m = s.width * f, w = s.height * f, M = (t - m) / 2, v = (n - w) / 2;
  e.fillStyle = c, e.fillRect(M, v, m, w), e.strokeStyle = u, e.strokeRect(M, v, m, w);
  for (const g of s.pixels) {
    const y = l[g.paletteIndex] ?? l[0];
    e.fillStyle = y, e.fillRect(
      M + g.x * f,
      v + g.y * f,
      f,
      f
    );
  }
}, AM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = rt((s) => s);
  return T.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const i = () => {
      const u = EM(l, s.clientWidth, s.clientHeight);
      u && RM(u, s.clientWidth, s.clientHeight);
    };
    i();
    const r = rt.subscribe(i), o = re.subscribe(i), c = new ResizeObserver(i);
    return c.observe(s), () => {
      r(), o(), c.disconnect();
    };
  }, []), /* @__PURE__ */ a.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ a.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ a.jsx("canvas", { ref: t }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ a.jsxs("span", { children: [
        "Size: ",
        n.width,
        "x",
        n.height
      ] }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        "Origin: ",
        n.origin ? `${n.origin.x}, ${n.origin.y}` : "--"
      ] }),
      /* @__PURE__ */ a.jsxs("span", { children: [
        "Pixels: ",
        n.pixels.length
      ] })
    ] })
  ] });
}, Lx = (e) => {
  const t = e.trim();
  return t ? t.toLowerCase().endsWith(".png") ? t : `${t}.png` : "";
}, LM = (e) => {
  const t = re.getState().colors, n = ee.getState(), s = Math.max(1, e.width), l = Math.max(1, e.height), i = new Uint8ClampedArray(s * l * 4);
  for (let r = 0; r < l; r += 1)
    for (let o = 0; o < s; o += 1) {
      const c = n.getPixelComposite(e.x + o, e.y + r);
      if (c === 0)
        continue;
      const u = t[c];
      if (!u)
        continue;
      const h = wt(u);
      if (!h)
        continue;
      const p = (r * s + o) * 4;
      i[p] = h.r, i[p + 1] = h.g, i[p + 2] = h.b, i[p + 3] = 255;
    }
  return { data: i, width: s, height: l };
}, Bx = async (e) => {
  const t = Lx(e.fileName ?? "");
  if (!t)
    return B.alert("Set a file name before exporting this bookmark."), null;
  const { data: n, width: s, height: l } = LM(e), i = document.createElement("canvas");
  i.width = s, i.height = l;
  const r = i.getContext("2d");
  if (!r)
    return B.alert("Unable to export bookmark."), null;
  r.putImageData(new ImageData(n, s, l), 0, 0);
  const o = await new Promise(
    (h) => i.toBlob((p) => h(p), "image/png")
  );
  if (!o)
    return B.alert("Unable to export bookmark."), null;
  const c = B.project();
  if (!(c != null && c.exportPng))
    return B.alert("PNG export is unavailable in this host."), null;
  const u = new Uint8Array(await o.arrayBuffer());
  return c.exportPng(u, t);
}, Dx = async (e) => {
  const t = Lx(e.fileName ?? "").replace(/\.png$/i, "");
  return t ? WS(
    {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    },
    { baseName: t }
  ) : (B.alert("Set a file name before exporting this bookmark."), null);
}, BM = async (e) => {
  const t = await Bx(e), n = await Dx(e);
  return { pngPath: t, tilemapPath: n };
}, Bp = (e) => Math.round(e / k), DM = (e, t) => {
  const n = ke.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), o = t - i / (2 * s);
  n.setCamera({ x: r, y: o });
}, YM = () => {
  const e = Mt((f) => f.items), t = Mt((f) => f.addFromCamera), n = Mt((f) => f.rename), s = Mt((f) => f.remove), l = Mt((f) => f.move), i = Mt((f) => f.jumpTo), r = Mt((f) => f.setRegionPosition), o = Mt((f) => f.setRegionSize), c = Mt((f) => f.setRegionFileName), u = Mt((f) => f.overlaysVisible), h = Mt((f) => f.toggleOverlaysVisible), p = Wt((f) => f.items), d = T.useMemo(
    () => p.map((f) => {
      const m = ya(f), w = (m.minX + m.maxX) / 2, M = (m.minY + m.maxY) / 2;
      return {
        id: f.id,
        name: f.assetFilename,
        centerX: w,
        centerY: M,
        x: Bp(w),
        y: Bp(M)
      };
    }),
    [p]
  );
  return /* @__PURE__ */ a.jsxs("div", { className: "nav-panel", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__header", children: [
        /* @__PURE__ */ a.jsx("div", { className: "nav-panel__title", children: "Bookmarks" }),
        /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__actions", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: h,
              title: "Toggle bookmark tag overlays in Pixel mode",
              children: u ? "Hide Tags" : "Show Tags"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: t,
              children: "Add Region"
            }
          )
        ] })
      ] }),
      e.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "nav-panel__empty", children: "No bookmarks yet." }) : /* @__PURE__ */ a.jsx("div", { className: "nav-panel__list", children: e.map((f, m) => {
        var w;
        return /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__row nav-panel__row--bookmark", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__meta", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                className: "nav-panel__name",
                value: f.name,
                "aria-label": `Bookmark name ${m + 1}`,
                onChange: (M) => n(f.id, M.currentTarget.value)
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__coords", children: [
              f.x,
              ",",
              f.y,
              " • ",
              f.width,
              "x",
              f.height
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__region-fields", children: [
              /* @__PURE__ */ a.jsxs("label", { className: "nav-panel__field", children: [
                "X",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    value: f.x,
                    onChange: (M) => r(f.id, Number(M.currentTarget.value), f.y)
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { className: "nav-panel__field", children: [
                "Y",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    value: f.y,
                    onChange: (M) => r(f.id, f.x, Number(M.currentTarget.value))
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { className: "nav-panel__field", children: [
                "W",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    min: 1,
                    value: f.width,
                    onChange: (M) => o(f.id, Number(M.currentTarget.value), f.height)
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { className: "nav-panel__field", children: [
                "H",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    min: 1,
                    value: f.height,
                    onChange: (M) => o(f.id, f.width, Number(M.currentTarget.value))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                className: "nav-panel__name",
                value: f.fileName ?? "",
                "aria-label": `Bookmark export file ${m + 1}`,
                placeholder: "export file name (e.g. hero-idle.png)",
                onChange: (M) => c(f.id, M.currentTarget.value)
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__actions nav-panel__actions--bookmark", children: [
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                onClick: () => i(f.id),
                children: "Go"
              }
            ),
            (w = f.fileName) != null && w.trim() ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  className: "nav-panel__button",
                  onClick: () => {
                    BM(f);
                  },
                  children: "Export Both"
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  className: "nav-panel__button",
                  onClick: () => {
                    Bx(f);
                  },
                  children: "Export PNG"
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  className: "nav-panel__button",
                  onClick: () => {
                    Dx(f);
                  },
                  children: "Export Tilemap"
                }
              )
            ] }) : null,
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                disabled: m === 0,
                onClick: () => l(f.id, "up"),
                "aria-label": "Move bookmark up",
                title: "Move up",
                children: "↑"
              }
            ),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                disabled: m === e.length - 1,
                onClick: () => l(f.id, "down"),
                "aria-label": "Move bookmark down",
                title: "Move down",
                children: "↓"
              }
            ),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button nav-panel__button--danger",
                onClick: () => s(f.id),
                children: "Delete"
              }
            )
          ] })
        ] }, f.id);
      }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ a.jsx("div", { className: "nav-panel__header", children: /* @__PURE__ */ a.jsx("div", { className: "nav-panel__title", children: "References" }) }),
      d.length === 0 ? /* @__PURE__ */ a.jsx("div", { className: "nav-panel__empty", children: "No references yet." }) : /* @__PURE__ */ a.jsx("div", { className: "nav-panel__list", children: d.map((f) => /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ a.jsx("div", { className: "nav-panel__name nav-panel__name--readonly", children: f.name }),
          /* @__PURE__ */ a.jsxs("div", { className: "nav-panel__coords", children: [
            f.x,
            ",",
            f.y
          ] })
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "nav-panel__actions", children: /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "nav-panel__button",
            onClick: () => DM(f.centerX, f.centerY),
            children: "Go"
          }
        ) })
      ] }, f.id)) })
    ] })
  ] });
}, XM = () => {
  const e = ee((d) => d.layers), t = ee((d) => d.activeLayerId), n = ee((d) => d.createLayer), s = ee((d) => d.deleteLayer), l = ee((d) => d.renameLayer), i = ee((d) => d.toggleLayerVisible), r = ee((d) => d.moveLayer), o = ee((d) => d.mergeLayerDown), c = ee((d) => d.setActiveLayer), h = e.findIndex((d) => d.id === t) > 0, p = [...e].reverse();
  return /* @__PURE__ */ a.jsxs("div", { className: "layers-panel", "aria-label": "Layers panel", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "layers-panel__actions", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__item", onClick: () => n(), children: "+ Layer" }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: () => s(t),
          disabled: e.length <= 1,
          children: "Delete"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: () => o(t),
          disabled: !h,
          children: "Merge Down"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "layers-panel__list", role: "list", children: p.map((d) => {
      const f = e.findIndex((v) => v.id === d.id), m = f === e.length - 1, w = f === 0, M = d.id === t;
      return /* @__PURE__ */ a.jsxs(
        "div",
        {
          role: "listitem",
          className: "layers-panel__row",
          "data-active": M,
          onMouseDown: () => c(d.id),
          children: [
            /* @__PURE__ */ a.jsx("label", { className: "layers-panel__toggle", title: "Toggle visibility", children: /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "checkbox",
                checked: d.visible,
                onChange: () => i(d.id),
                onMouseDown: (v) => v.stopPropagation()
              }
            ) }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                className: "layers-panel__name",
                value: d.name,
                onChange: (v) => l(d.id, v.target.value),
                onMouseDown: (v) => v.stopPropagation()
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: "layers-panel__move", children: [
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move up",
                  disabled: m,
                  onMouseDown: (v) => v.stopPropagation(),
                  onClick: () => r(d.id, "up"),
                  children: "↑"
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move down",
                  disabled: w,
                  onMouseDown: (v) => v.stopPropagation(),
                  onClick: () => r(d.id, "down"),
                  children: "↓"
                }
              )
            ] })
          ]
        },
        d.id
      );
    }) })
  ] });
}, FM = () => {
  const e = rt(
    (l) => l.pixels.length > 0 && l.width > 0 && l.height > 0
  ), [t, n] = T.useState("minimap"), s = T.useRef(e);
  return T.useEffect(() => {
    !e && t === "paste" && n("minimap");
  }, [e, t]), T.useEffect(() => {
    e && !s.current && n((l) => l === "minimap" ? "paste" : l), s.current = e;
  }, [e]), /* @__PURE__ */ a.jsxs("div", { className: "minimap-panel", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "minimap__tabs", role: "tablist", "aria-label": "Minimap tabs", children: [
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          className: "minimap__tab",
          "aria-selected": t === "minimap",
          "data-active": t === "minimap",
          onClick: () => n("minimap"),
          children: "Minimap"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          className: "minimap__tab",
          "aria-selected": t === "nav",
          "data-active": t === "nav",
          onClick: () => n("nav"),
          children: "Nav"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          className: "minimap__tab",
          "aria-selected": t === "layers",
          "data-active": t === "layers",
          onClick: () => n("layers"),
          children: "Layers"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          className: "minimap__tab",
          "aria-selected": t === "paste",
          "data-active": t === "paste",
          onClick: () => n("paste"),
          style: { display: e ? void 0 : "none" },
          children: "Paste Preview"
        }
      )
    ] }),
    t === "nav" ? /* @__PURE__ */ a.jsx(YM, {}) : t === "layers" ? /* @__PURE__ */ a.jsx(XM, {}) : t === "paste" && e ? /* @__PURE__ */ a.jsx(AM, {}) : /* @__PURE__ */ a.jsx(IM, {})
  ] });
}, OM = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, Dp = (e, t, n) => Math.min(n, Math.max(t, e)), an = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: i
}) => {
  const o = `dropdown-${T.useId()}`, c = T.useRef(null), u = T.useRef(null), [h, p] = T.useState(!1), [d, f] = T.useState(0), [m, w] = T.useState(null), M = T.useMemo(() => OM(t, e), [t, e]), v = T.useMemo(
    () => Math.max(0, t.findIndex((b) => b.value === e)),
    [t, e]
  ), g = () => {
    const b = c.current;
    if (!b)
      return null;
    const _ = b.getBoundingClientRect(), C = window.innerHeight || document.documentElement.clientHeight || 0, j = 260, A = C - _.bottom - 12, L = _.top - 12, F = A >= Math.min(j, 180) || A >= L, P = Dp(F ? A : L, 120, j), z = F ? _.bottom + 6 : _.top - 6 - P;
    return { left: _.left, top: z, width: _.width, maxHeight: P };
  };
  T.useEffect(() => {
    if (!h)
      return;
    f(v);
    const b = g();
    w(b);
    const _ = window.requestAnimationFrame(() => {
      var j;
      const C = (j = u.current) == null ? void 0 : j.querySelector('[data-highlighted="true"]');
      C == null || C.scrollIntoView({ block: "nearest" });
    });
    return () => window.cancelAnimationFrame(_);
  }, [h]), T.useEffect(() => {
    if (!h)
      return;
    const b = (j) => {
      var A, L;
      if (j.key === "Escape") {
        j.preventDefault(), p(!1), (A = c.current) == null || A.focus();
        return;
      }
      if (j.key === "ArrowDown" || j.key === "ArrowUp") {
        j.preventDefault();
        const F = j.key === "ArrowDown" ? 1 : -1;
        f((P) => Dp(P + F, 0, t.length - 1));
        return;
      }
      if (j.key === "Home") {
        j.preventDefault(), f(0);
        return;
      }
      if (j.key === "End") {
        j.preventDefault(), f(t.length - 1);
        return;
      }
      if (j.key === "Enter" || j.key === " ") {
        j.preventDefault();
        const F = t[d];
        F && !F.disabled && (n(F.value), p(!1), (L = c.current) == null || L.focus());
      }
    }, _ = (j) => {
      var L, F;
      const A = j.target;
      A && ((L = c.current) != null && L.contains(A) || (F = u.current) != null && F.contains(A) || p(!1));
    }, C = (j) => {
      var F;
      const A = (j == null ? void 0 : j.target) ?? null;
      if (A && ((F = u.current) != null && F.contains(A)))
        return;
      const L = g();
      w(L);
    };
    return window.addEventListener("keydown", b), window.addEventListener("pointerdown", _, { capture: !0 }), window.addEventListener("resize", C), window.addEventListener("scroll", C, { capture: !0 }), () => {
      window.removeEventListener("keydown", b), window.removeEventListener("pointerdown", _, { capture: !0 }), window.removeEventListener("resize", C), window.removeEventListener("scroll", C, { capture: !0 });
    };
  }, [h, t, d, n]), T.useEffect(() => {
    var _;
    if (!h)
      return;
    const b = (_ = u.current) == null ? void 0 : _.querySelector('[data-highlighted="true"]');
    b == null || b.scrollIntoView({ block: "nearest" });
  }, [h, d]);
  const y = (b) => {
    s || (b.key === "ArrowDown" || b.key === "ArrowUp") && (b.preventDefault(), p(!0));
  }, S = (b) => {
    var _;
    n(b), p(!1), (_ = c.current) == null || _.focus();
  };
  return /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs(
      "button",
      {
        ref: c,
        type: "button",
        className: i ?? "panel__select",
        "aria-label": l,
        "aria-haspopup": "listbox",
        "aria-expanded": h,
        "aria-controls": o,
        disabled: s,
        onClick: () => p((b) => !b),
        onKeyDown: y,
        children: [
          /* @__PURE__ */ a.jsx("span", { className: "dropdown-select__label", children: M }),
          /* @__PURE__ */ a.jsx("span", { className: "dropdown-select__chevron", "aria-hidden": "true", children: "▾" })
        ]
      }
    ),
    h && m && ji.createPortal(
      /* @__PURE__ */ a.jsx(
        "div",
        {
          ref: u,
          id: o,
          className: "dropdown-select__menu",
          role: "listbox",
          "aria-label": l,
          style: {
            left: `${m.left}px`,
            top: `${m.top}px`,
            width: `${m.width}px`,
            maxHeight: `${m.maxHeight}px`
          },
          children: t.map((b, _) => /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              role: "option",
              className: "dropdown-select__option",
              "data-active": b.value === e,
              "data-highlighted": _ === d,
              disabled: b.disabled,
              "aria-selected": b.value === e,
              onMouseMove: () => f(_),
              onClick: () => {
                b.disabled || S(b.value);
              },
              children: b.render ?? b.label
            },
            b.value
          ))
        }
      ),
      document.body
    )
  ] });
}, Yp = (e) => /^#[0-9a-f]{6}$/i.test(e), Xp = (e) => {
  const t = e.trim().toLowerCase();
  return t ? t.startsWith("#") ? t : `#${t}` : "";
}, Fe = (e) => Math.min(1, Math.max(0, e)), _n = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Dd = (e) => (e % 360 + 360) % 360, Rc = (e) => e.toString(16).padStart(2, "0"), pn = (e) => `#${Rc(e.r)}${Rc(e.g)}${Rc(e.b)}`, Yx = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), r = l - i;
  let o = 0;
  r !== 0 && (l === t ? o = (n - s) / r % 6 : l === n ? o = (s - t) / r + 2 : o = (t - n) / r + 4, o *= 60), o < 0 && (o += 360);
  const c = (l + i) / 2, u = r === 0 ? 0 : r / (1 - Math.abs(2 * c - 1));
  return { h: o, s: u, l: c };
}, zM = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), r = l - i;
  let o = 0;
  r !== 0 && (l === t ? o = (n - s) / r % 6 : l === n ? o = (s - t) / r + 2 : o = (t - n) / r + 4, o *= 60), o < 0 && (o += 360);
  const c = l === 0 ? 0 : r / l;
  return { h: o, s: c, v: l };
}, Yu = (e) => {
  const t = Dd(e.h), n = Fe(e.s), s = Fe(e.l), l = (1 - Math.abs(2 * s - 1)) * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), r = s - l / 2;
  let o = 0, c = 0, u = 0;
  return t < 60 ? (o = l, c = i) : t < 120 ? (o = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (o = i, u = l) : (o = l, u = i), {
    r: Math.round((o + r) * 255),
    g: Math.round((c + r) * 255),
    b: Math.round((u + r) * 255)
  };
}, fl = (e) => {
  const t = Dd(e.h), n = Fe(e.s), s = Fe(e.v), l = s * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), r = s - l;
  let o = 0, c = 0, u = 0;
  return t < 60 ? (o = l, c = i) : t < 120 ? (o = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (o = i, u = l) : (o = l, u = i), {
    r: Math.round((o + r) * 255),
    g: Math.round((c + r) * 255),
    b: Math.round((u + r) * 255)
  };
}, cn = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const s = n.toLowerCase();
    return t.has(s) ? !1 : (t.add(s), !0);
  });
}, HM = (e) => {
  const t = wt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = Yx(t), i = (A, L, F) => pn(
    Yu({
      h: Dd(l.h + A),
      s: Fe(L),
      l: Fe(F)
    })
  ), r = (A, L = 0, F = 0) => i(A, l.s + L, l.l + F), o = cn([
    r(0, 0, 0.12),
    r(0, 0, -0.12),
    r(180, 0, 0),
    r(180, 0, 0.12),
    r(180, 0, -0.12)
  ]), c = cn([
    r(-40),
    r(-20),
    r(0),
    r(20),
    r(40)
  ]), u = cn([
    r(0),
    r(150),
    r(210),
    r(150, 0, 0.12),
    r(210, 0, -0.12)
  ]), h = cn([
    r(0),
    r(120),
    r(240),
    r(120, 0, 0.12),
    r(240, 0, -0.12)
  ]), p = cn([
    r(0),
    r(90),
    r(180),
    r(270)
  ]), d = cn([
    pn(ds(t, n, 0.7)),
    pn(ds(t, n, 0.5)),
    pn(ds(t, n, 0.3)),
    pn(ds(t, s, 0.25)),
    pn(ds(t, s, 0.5))
  ]), f = Fe(l.s * 0.45 + 0.15), m = Fe(l.l * 0.4 + 0.6), w = cn([
    i(-25, f, Fe(m + 0.05)),
    i(-10, f, Fe(m + 0.02)),
    i(0, f, m),
    i(10, f, Fe(m - 0.03)),
    i(25, f, Fe(m - 0.06))
  ]), M = Fe(l.s * 0.35 + 0.12), v = Fe(l.l * 0.8 + 0.1), g = cn([
    i(-30, M, Fe(v - 0.08)),
    i(-15, M, v),
    i(0, M, Fe(v + 0.05)),
    i(15, M, Fe(v - 0.03)),
    i(30, M, Fe(v + 0.08))
  ]), y = Fe(Math.max(0.7, l.s * 1.25)), S = Fe(l.l * 0.85 + 0.06), b = cn([
    i(-20, y, Fe(S - 0.08)),
    i(-10, y, S),
    i(0, y, Fe(S + 0.04)),
    i(15, y, Fe(S - 0.04)),
    i(30, y, Fe(S + 0.08))
  ]), _ = Fe(l.s * 0.9 + 0.05), C = cn([
    i(0, _, 0.14),
    i(0, _, 0.3),
    i(0, _, 0.5),
    i(0, _, 0.7),
    i(0, _, 0.86)
  ]), j = cn([
    i(0, l.s, Fe(l.l - 0.06)),
    i(45, l.s, l.l),
    i(90, l.s, Fe(l.l + 0.05)),
    i(135, l.s, l.l),
    i(180, l.s, Fe(l.l - 0.04))
  ]);
  return [
    { id: "complementary", label: "Complementary", colors: o },
    { id: "analogous", label: "Analogous", colors: c },
    { id: "split", label: "Split Complementary", colors: u },
    { id: "triad", label: "Triad", colors: h },
    { id: "tetrad", label: "Tetrad", colors: p },
    { id: "tints", label: "Tints + Shades", colors: d },
    { id: "pastel", label: "Pastel", colors: w },
    { id: "muted", label: "Muted", colors: g },
    { id: "vibrant", label: "Vibrant", colors: b },
    { id: "mono", label: "Monochrome Ramp", colors: C },
    { id: "hue-sweep", label: "Hue Sweep", colors: j }
  ];
}, WM = () => {
  const e = re((I) => I.colors), t = re((I) => I.selectedIndices), n = re((I) => I.setColor), s = re((I) => I.setPalette), l = re((I) => I.setSelectedIndices), i = re((I) => I.getActiveIndex()), r = re((I) => I.addColor), o = (I, R) => {
    const q = I.filter((he) => he !== R);
    return q.push(R), q;
  }, [c, u] = T.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [h, p] = T.useState("none"), [d, f] = T.useState(!1), [m, w] = T.useState(!1), [M, v] = T.useState(""), [g, y] = T.useState(!1), [S, b] = T.useState(null), [_, C] = T.useState(null), [j, A] = T.useState({ r: 255, g: 255, b: 255 }), [L, F] = T.useState({
    r: 255,
    g: 255,
    b: 255
  }), [P, z] = T.useState("#ffffff"), [Z, oe] = T.useState(() => {
    try {
      const I = window.localStorage.getItem("pss.paletteRows"), R = I ? Number(I) : 3, q = Number.isFinite(R) ? Math.floor(R) : 3;
      return Math.min(4, Math.max(2, q));
    } catch {
      return 3;
    }
  }), G = T.useRef(null), ne = T.useRef(!1), D = T.useRef(null), H = T.useRef(!1), Q = T.useRef(null), le = T.useRef(!1), ae = T.useRef(/* @__PURE__ */ new Set()), xe = T.useRef(!1), O = Te.useMemo(
    () => typeof navigator < "u" && navigator.platform.toLowerCase().includes("mac"),
    []
  ), ie = Te.useMemo(() => zM(j), [j]), ye = Te.useMemo(() => Yx(j), [j]), W = () => {
    u((I) => I.open ? { ...I, open: !1, index: null } : I);
  }, ge = (I, R) => {
    I.preventDefault(), typeof R == "number" && (new Set(t).has(R) || l([R]), G.current = R), u({
      open: !0,
      x: I.clientX,
      y: I.clientY,
      index: R
    });
  };
  T.useEffect(() => {
    if (!c.open)
      return;
    const I = (q) => {
      var je;
      const he = q.target;
      (je = he == null ? void 0 : he.closest) != null && je.call(he, ".dropdown-select__menu") || D.current && D.current.contains(q.target) || W();
    }, R = (q) => {
      q.key === "Escape" && W();
    };
    return window.addEventListener("mousedown", I), window.addEventListener("keydown", R), () => {
      window.removeEventListener("mousedown", I), window.removeEventListener("keydown", R);
    };
  }, [c.open]), T.useLayoutEffect(() => {
    if (!c.open || !D.current)
      return;
    const I = D.current.getBoundingClientRect(), R = 8, q = Math.max(R, window.innerWidth - I.width - R), he = Math.max(R, window.innerHeight - I.height - R), je = Math.min(Math.max(R, c.x), q), At = Math.min(Math.max(R, c.y), he);
    (je !== c.x || At !== c.y) && u((ln) => ({ ...ln, x: je, y: At }));
  }, [c.open, c.x, c.y]);
  const N = t.length === 1 ? t[0] ?? null : null, X = N !== null && N >= 0 && N < e.length, se = X && N !== null ? e[N] : "#ffffff", ce = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ye = Te.useMemo(
    () => HM(ce),
    [ce]
  ), Se = T.useCallback((I) => {
    const R = {
      r: _n(I.r, 0, 255),
      g: _n(I.g, 0, 255),
      b: _n(I.b, 0, 255)
    };
    A(R), z(pn(R));
  }, []), Ue = T.useCallback((I, R) => {
    const q = wt(R) ?? { r: 255, g: 255, b: 255 };
    C(I), F(q), A(q), z(pn(q));
  }, []), Oe = T.useCallback(() => {
    C(null);
  }, []), ot = T.useCallback(() => {
    if (!_)
      return;
    const I = pn(j);
    if (_.mode === "set") {
      n(_.index, I), C(null);
      return;
    }
    r(I), C(null);
  }, [r, _, j, n]), Xe = (_ == null ? void 0 : _.mode) === "set" ? "Set Color" : "Add Color", me = () => {
    !X || N === null || (W(), Ue({ mode: "set", index: N }, se));
  }, ht = () => {
    W(), Ue({ mode: "add" }, "#ffffff");
  }, Ie = new Set(t), Rt = [...Ie].sort((I, R) => I - R), Kt = Rt.length, gt = Kt > 0, Sn = Kt > 1, En = e.length - Kt >= 1, Mn = (I) => {
    l(I);
  }, sn = () => {
    if (t.length === 0)
      return;
    const I = t.filter((R) => R >= 0 && R < e.length);
    I.length !== t.length && l(I);
  };
  T.useEffect(sn, [e.length, t, l]);
  const er = () => {
    if (!gt || !En)
      return;
    const I = new Set(Rt), R = e.filter((q, he) => !I.has(he));
    R.length !== 0 && (s(R), W());
  }, Ps = () => {
    if (!Sn)
      return;
    const I = Re.columns, R = [...Ie].sort((je, At) => {
      const ln = Math.floor(je / I), Ns = je % I, Is = Math.floor(At / I), Xn = At % I;
      return Ns !== Xn ? Ns - Xn : ln - Is;
    });
    if (R.length < 2)
      return;
    const q = [...e], he = q[R[R.length - 1]];
    for (let je = R.length - 1; je > 0; je -= 1)
      q[R[je]] = q[R[je - 1]];
    q[R[0]] = he, s(q), W();
  }, es = (I) => {
    const R = new Set(e.map((q) => q.toLowerCase()));
    cn(I).filter((q) => !R.has(q.toLowerCase())).forEach((q) => r(q)), W(), f(!1), p("none");
  }, Rn = T.useCallback((I) => {
    b(null), w(!0), I && v(I);
  }, []), Ee = () => {
    w(!1), y(!1), b(null), v("");
  };
  T.useEffect(() => {
    const I = () => {
      Rn("https://lospec.com/palette-list/");
    };
    return window.addEventListener("palette:open-lospec", I), () => window.removeEventListener("palette:open-lospec", I);
  }, [Rn]), T.useEffect(() => {
    const I = () => {
      f(!0), p("none");
    };
    return window.addEventListener("palette:open-add-swatch", I), () => window.removeEventListener("palette:open-add-swatch", I);
  }, []), T.useEffect(() => {
    const I = (R) => {
      const he = Number(R.detail);
      Number.isFinite(he) && oe(Math.min(4, Math.max(2, Math.floor(he))));
    };
    return window.addEventListener("palette:set-rows", I), () => window.removeEventListener("palette:set-rows", I);
  }, []);
  const de = async () => {
    var R;
    if (!((R = B.palette()) != null && R.importLospec)) {
      b("LoSpec import is unavailable (paletteApi not found). Restart the app.");
      return;
    }
    const I = M.trim();
    if (!I) {
      b("Paste a LoSpec palette URL or slug.");
      return;
    }
    if (window.confirm(
      "Importing a LoSpec palette will replace your current palette. Continue?"
    )) {
      y(!0), b(null);
      try {
        const q = await B.palette().importLospec(I), he = q.colors.length > 0 ? q.colors : e;
        s(he), l([Math.max(0, he.length - 1)]), ve.getState().setDirty(!0), Ee();
      } catch (q) {
        const he = q instanceof Error ? q.message : "Unable to import palette.";
        b(he), y(!1);
      }
    }
  }, Re = Te.useMemo(() => {
    const I = e.length + 1, R = Math.min(Z, Math.max(1, Math.ceil(I / 16))), q = Math.max(1, Math.ceil(I / R));
    return { rows: R, columns: q };
  }, [e.length, Z]);
  T.useEffect(() => {
    try {
      window.localStorage.setItem("pss.paletteRows", String(Z));
    } catch {
    }
  }, [Z]), T.useEffect(() => {
    const I = () => {
      H.current = !1, Q.current = null, xe.current = !1, ae.current = /* @__PURE__ */ new Set();
    };
    return window.addEventListener("pointerup", I), () => window.removeEventListener("pointerup", I);
  }, []);
  const ft = (I) => ({
    row: Math.floor(I / Re.columns),
    col: I % Re.columns
  }), Ct = (I, R) => {
    const q = ft(I), he = ft(R), je = Math.min(q.row, he.row), At = Math.max(q.row, he.row), ln = Math.min(q.col, he.col), Ns = Math.max(q.col, he.col), Is = [];
    for (let Xn = je; Xn <= At; Xn += 1)
      for (let nl = ln; nl <= Ns; nl += 1) {
        const sl = Xn * Re.columns + nl;
        sl < 0 || sl >= e.length || Is.push(sl);
      }
    return Is;
  };
  return /* @__PURE__ */ a.jsxs("div", { className: "palette-bar", children: [
    /* @__PURE__ */ a.jsxs(
      "div",
      {
        className: "palette-bar__swatches",
        role: "listbox",
        "aria-label": "Palette colors",
        style: {
          "--palette-rows": Re.rows,
          "--palette-columns": Re.columns
        },
        children: [
          e.map((I, R) => /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch",
              style: { background: I },
              "data-active": R === i,
              "data-selected": Ie.has(R),
              onMouseDown: (q) => {
                O && q.button === 0 && q.ctrlKey && (ne.current = !0);
              },
              onPointerDown: (q) => {
                if (q.button !== 0)
                  return;
                H.current = !0, Q.current = R, le.current = !1, xe.current = q.shiftKey || q.metaKey || q.ctrlKey || q.altKey, ae.current = xe.current ? new Set(Ie) : /* @__PURE__ */ new Set();
                const he = Ct(R, R);
                if (xe.current) {
                  const je = new Set(ae.current);
                  he.forEach((At) => je.add(At)), l(o(Array.from(je), R));
                } else
                  l(o(he, R));
                G.current = R;
              },
              onPointerEnter: () => {
                if (!H.current || Q.current === null)
                  return;
                le.current = !0;
                const q = Ct(Q.current, R);
                if (xe.current) {
                  const he = new Set(ae.current);
                  q.forEach((je) => he.add(je)), l(o(Array.from(he), R));
                } else
                  l(o(q, R));
              },
              onClick: (q) => {
                if (le.current) {
                  le.current = !1;
                  return;
                }
                if (ne.current) {
                  ne.current = !1;
                  return;
                }
                if (q.shiftKey && G.current !== null) {
                  const he = Math.min(G.current, R), je = Math.max(G.current, R), At = new Set(Ie);
                  for (let ln = he; ln <= je; ln += 1)
                    At.add(ln);
                  l(o(Array.from(At), R)), G.current = R;
                } else if (q.metaKey || q.altKey) {
                  const he = new Set(Ie);
                  he.has(R) ? he.delete(R) : he.add(R);
                  const je = Array.from(he);
                  l(
                    he.has(R) ? o(je, R) : je
                  ), G.current = R;
                } else if (q.ctrlKey) {
                  const he = new Set(Ie);
                  he.has(R) ? he.delete(R) : he.add(R);
                  const je = Array.from(he);
                  l(
                    he.has(R) ? o(je, R) : je
                  ), G.current = R;
                } else
                  Mn([R]), G.current = R;
              },
              onContextMenu: (q) => ge(q, R),
              "aria-label": `Palette color ${R + 1}`,
              "aria-selected": Ie.has(R)
            },
            `${I}-${R}`
          )),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch palette-bar__swatch--empty",
              onClick: () => {
                ht();
              },
              onContextMenu: (I) => ge(I, null),
              "aria-label": "Add palette color"
            }
          )
        ]
      }
    ),
    c.open && /* @__PURE__ */ a.jsxs(
      "div",
      {
        ref: D,
        className: "palette-bar__menu",
        role: "menu",
        style: { top: c.y, left: c.x },
        children: [
          /* @__PURE__ */ a.jsx("div", { className: "palette-bar__menu-label", children: "Actions" }),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: me,
              disabled: !X,
              children: "Set Color"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: er,
              disabled: !gt || !En,
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: Ps,
              disabled: !Sn,
              children: "Cycle Selected"
            }
          )
        ]
      }
    ),
    _ && ji.createPortal(
      /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (I) => {
            if (I.key === "Escape") {
              I.preventDefault(), Oe();
              return;
            }
            if (I.key === "Enter") {
              const R = I.target;
              if ((R == null ? void 0 : R.tagName) === "TEXTAREA")
                return;
              I.preventDefault(), ot();
            }
          },
          children: [
            /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: Oe }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--palette-color", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ a.jsx("h2", { children: Xe }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: Oe, children: "Close" })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__preview-row", children: [
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Before" }),
                    /* @__PURE__ */ a.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: pn(L) }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Current" }),
                    /* @__PURE__ */ a.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: pn(j) }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__hex-row", children: [
                  /* @__PURE__ */ a.jsx("label", { className: "panel__label", htmlFor: "palette-color-hex", children: "HEX" }),
                  /* @__PURE__ */ a.jsx(
                    "input",
                    {
                      id: "palette-color-hex",
                      type: "text",
                      className: "panel__number",
                      value: P,
                      onChange: (I) => {
                        const R = I.currentTarget.value;
                        z(R);
                        const q = Xp(R);
                        if (!Yp(q))
                          return;
                        const he = wt(q);
                        he && A(he);
                      },
                      onBlur: () => {
                        const I = Xp(P);
                        if (!Yp(I)) {
                          z(pn(j));
                          return;
                        }
                        const R = wt(I);
                        R && Se(R);
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ a.jsx("div", { className: "palette-color-picker__section-label", children: "RGB" }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "R" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.r,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, r: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: j.r,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, r: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "G" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.g,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, g: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: j.g,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, g: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "B" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.b,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, b: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: j.b,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se({ ...j, b: R });
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ a.jsx("div", { className: "palette-color-picker__section-label", children: "HSVL" }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "H" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 360,
                        value: Math.round(ie.h),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, h: _n(R, 0, 360) })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 360,
                        step: 1,
                        value: Math.round(ie.h),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, h: _n(R, 0, 360) })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "S" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.s * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, s: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ie.s * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, s: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "V" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.v * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, v: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ie.v * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            fl({ ...ie, v: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ a.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ a.jsx("span", { className: "palette-color-picker__channel-name", children: "L" }),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ye.l * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            Yu({ ...ye, l: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ a.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ye.l * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && Se(
                            Yu({ ...ye, l: _n(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ a.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__item", onClick: Oe, children: "Cancel" }),
                  /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__item", onClick: ot, children: _.mode === "add" ? "Add Color" : "Apply" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    d && ji.createPortal(
      /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), f(!1), p("none"));
          },
          children: [
            /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "modal__backdrop",
                onClick: () => {
                  f(!1), p("none");
                }
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ a.jsx("h2", { children: "Add Swatch Preset" }),
                /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      f(!1), p("none");
                    },
                    children: "Close"
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Preset" }),
                /* @__PURE__ */ a.jsx(
                  an,
                  {
                    ariaLabel: "Swatch presets",
                    className: "panel__select",
                    value: h,
                    onChange: (I) => {
                      if (p(I), I === "none")
                        return;
                      const R = Ye.find((q) => q.id === I);
                      R && es(R.colors);
                    },
                    options: [
                      { value: "none", label: "Choose preset…" },
                      ...Ye.map((I) => ({
                        value: I.id,
                        label: I.label,
                        render: /* @__PURE__ */ a.jsxs("span", { className: "palette-bar__preset-option", children: [
                          /* @__PURE__ */ a.jsx("span", { className: "palette-bar__preset-option-label", children: I.label }),
                          /* @__PURE__ */ a.jsx("span", { className: "palette-bar__menu-preview", "aria-hidden": "true", children: I.colors.map((R, q) => /* @__PURE__ */ a.jsx(
                            "span",
                            {
                              className: "palette-bar__menu-chip",
                              style: { background: R }
                            },
                            `${I.id}-${R}-${q}`
                          )) })
                        ] })
                      }))
                    ]
                  }
                ),
                /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Adds only colors not already in the palette." })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    m && ji.createPortal(
      /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), Ee());
          },
          children: [
            /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: Ee }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ a.jsx("h2", { children: "Import LoSpec Palette" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: Ee, children: "Close" })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ a.jsx("label", { className: "panel__label", htmlFor: "lospec-url", children: "URL or slug" }),
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    id: "lospec-url",
                    type: "text",
                    className: "panel__number",
                    value: M,
                    placeholder: "https://lospec.com/palette-list/black-scarlet-16",
                    onChange: (I) => v(I.currentTarget.value),
                    onKeyDown: (I) => {
                      I.key === "Enter" && (I.preventDefault(), de());
                    },
                    autoFocus: !0
                  }
                ),
                /* @__PURE__ */ a.jsx("div", { className: "panel__note", style: { color: "rgba(255, 170, 120, 0.9)" }, children: "Importing will replace your current palette." }),
                S && /* @__PURE__ */ a.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: S }),
                /* @__PURE__ */ a.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__item", onClick: Ee, disabled: g, children: "Cancel" }),
                  /* @__PURE__ */ a.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void de(),
                      disabled: g,
                      children: g ? "Importing…" : "Import"
                    }
                  )
                ] })
              ] })
            ] })
          ]
        }
      ),
      document.body
    )
  ] });
}, UM = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
  const i = T.useRef(null);
  return T.useEffect(() => {
    const r = i.current;
    if (!r)
      return;
    const o = t * s, c = n * s;
    r.width = o, r.height = c;
    const u = r.getContext("2d");
    if (u) {
      u.imageSmoothingEnabled = !1, u.clearRect(0, 0, o, c);
      for (let h = 0; h < n; h += 1)
        for (let p = 0; p < t; p += 1) {
          const d = e[h * t + p] ?? 0;
          d !== 0 && (u.fillStyle = l[d] ?? l[0] ?? "#000000", u.fillRect(p * s, h * s, s, s));
        }
    }
  }, [e, t, n, s, l]), /* @__PURE__ */ a.jsx("canvas", { ref: i, "aria-hidden": "true" });
}, $M = () => {
  const e = V((N) => N.tileSets), t = V((N) => N.activeTileSetId), n = V((N) => N.tilePage), s = V((N) => N.tilePageCount), l = V((N) => N.setTilePageCount), i = V((N) => N.selectedTileIndex), r = V((N) => N.selectedTileIndices), o = V((N) => N.tilePickerZoom), c = V((N) => N.setTileSelection), u = V((N) => N.setActiveTileSet), h = V((N) => N.deleteTilesFromSet), p = re((N) => N.colors), d = T.useMemo(() => e.find((N) => N.id === t) ?? e[0], [e, t]);
  T.useEffect(() => {
    !d && e.length > 0 && u(e[0].id);
  }, [d, e, u]);
  const f = (d == null ? void 0 : d.tiles.length) ?? 0, m = (d == null ? void 0 : d.tiles) ?? [], w = Math.max(1, (d == null ? void 0 : d.columns) ?? 1), M = Math.max(1, (d == null ? void 0 : d.rows) ?? 1), v = w * M, g = Math.max(1, Math.ceil(f / v)), y = d ? Math.max(16, d.tileWidth * o) : 32, S = T.useRef(null), [b, _] = T.useState({ width: 0, height: 0 }), C = w * y, j = M * y, A = T.useMemo(() => {
    if (b.width <= 0)
      return 1;
    const N = Math.floor((b.width + 8) / Math.max(1, C + 8));
    return Math.max(1, Math.min(g, N));
  }, [C, b.width, g]), L = T.useMemo(() => {
    if (b.height <= 0)
      return 1;
    const N = Math.floor((b.height + 8) / Math.max(1, j + 8));
    return Math.max(1, N);
  }, [j, b.height]), F = Math.max(1, A * L), P = Math.max(1, Math.ceil(g / F)), z = Math.min(n, P - 1), Z = z * F, oe = Math.max(0, Math.min(F, g - Z)), G = T.useRef(!1), ne = T.useRef(null), D = T.useMemo(
    () => new Set(r.filter((N) => N >= 0)),
    [r]
  ), H = T.useMemo(() => {
    const N = new Set(r.filter((X) => X >= 0));
    return Array.from(N).sort((X, se) => X - se);
  }, [r]), Q = T.useCallback(() => {
    if (!d || H.length === 0)
      return;
    const N = H.length === 1 ? "tile" : "tiles";
    if (!window.confirm(
      `Delete ${H.length} ${N} from ${d.name}?`
    ))
      return;
    const se = Ht();
    h(d.id, H);
    const ce = Ht();
    qs(se, ce);
  }, [d, h, H]), le = T.useCallback(() => {
    const N = S.current;
    if (!N)
      return;
    const X = Math.floor(N.clientWidth || N.getBoundingClientRect().width || 0), se = Math.floor(N.clientHeight || N.getBoundingClientRect().height || 0);
    _(
      (ce) => ce.width === X && ce.height === se ? ce : { width: X, height: se }
    );
  }, []);
  T.useEffect(() => {
    const N = S.current;
    if (!N)
      return;
    const X = () => {
      le();
    };
    if (X(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", X), () => {
        window.removeEventListener("resize", X);
      };
    const se = new ResizeObserver(() => X()), ce = N.parentElement;
    return ce && se.observe(ce), se.observe(N), () => {
      se.disconnect();
    };
  }, [le]), T.useEffect(() => {
    s !== P && l(P);
  }, [l, s, P]), T.useEffect(() => {
    le();
    const N = window.requestAnimationFrame(() => {
      le();
    });
    return () => window.cancelAnimationFrame(N);
  }, [le, y, g, P, z]);
  const ae = (N) => {
    const X = Math.floor(N / v), se = N % v, ce = se % w, Ye = Math.floor(se / w), Se = X % A;
    return {
      row: Math.floor(X / A) * M + Ye,
      col: Se * w + ce
    };
  }, xe = (N, X) => {
    if (N.length === 0) {
      c([X], 1, 1, X);
      return;
    }
    const se = N.map((me) => ({
      index: me,
      ...ae(me)
    })), ce = Math.min(...se.map((me) => me.col)), Ye = Math.max(...se.map((me) => me.col)), Se = Math.min(...se.map((me) => me.row)), Ue = Math.max(...se.map((me) => me.row)), Oe = Ye - ce + 1, ot = Ue - Se + 1, Xe = new Array(Oe * ot).fill(-1);
    for (const me of se) {
      const ht = me.col - ce, Rt = (me.row - Se) * Oe + ht;
      Xe[Rt] = me.index;
    }
    c(Xe, Oe, ot, X);
  }, O = (N, X) => {
    const se = ae(N), ce = ae(X), Ye = Math.min(se.col, ce.col), Se = Math.max(se.col, ce.col), Ue = Math.min(se.row, ce.row), Oe = Math.max(se.row, ce.row), ot = Se - Ye + 1, Xe = Oe - Ue + 1, me = new Array(ot * Xe).fill(-1);
    for (let ht = Ue; ht <= Oe; ht += 1)
      for (let Ie = Ye; Ie <= Se; Ie += 1) {
        const Rt = Math.floor(Ie / w), Kt = Math.floor(ht / M), gt = Ie % w, Sn = ht % M, Mn = (Kt * A + Rt) * v + Sn * w + gt;
        if (Mn < 0 || Mn >= f)
          continue;
        const sn = (ht - Ue) * ot + (Ie - Ye);
        me[sn] = Mn;
      }
    c(me, ot, Xe, N);
  }, ie = (N, X) => {
    if (G.current = !0, ne.current = N, X != null && X.additive) {
      const se = /* @__PURE__ */ new Set([
        ...r.filter((ce) => ce >= 0),
        N
      ]);
      xe(Array.from(se), N);
      return;
    }
    if (X != null && X.subtractive) {
      const se = r.filter((Ye) => Ye >= 0 && Ye !== N), ce = se.length > 0 ? se : [N];
      xe(ce, N);
      return;
    }
    O(N, N);
  }, ye = (N) => {
    !G.current || ne.current === null || O(ne.current, N);
  }, W = () => {
    G.current = !1, ne.current = null;
  };
  T.useEffect(() => {
    const N = () => W();
    return window.addEventListener("pointerup", N), () => window.removeEventListener("pointerup", N);
  }, []), T.useEffect(() => {
    const N = (X) => {
      if (X.key !== "Delete" && X.key !== "Backspace")
        return;
      const se = X.target;
      if (se) {
        const ce = se.tagName;
        if (ce === "INPUT" || ce === "TEXTAREA" || se.isContentEditable)
          return;
      }
      !d || H.length === 0 || (X.preventDefault(), Q());
    };
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [d, Q, H.length]);
  const ge = T.useCallback((N) => {
    const X = S.current;
    X && (X.scrollHeight <= X.clientHeight || (X.scrollTop += N.deltaY, N.preventDefault(), N.stopPropagation()));
  }, []);
  return /* @__PURE__ */ a.jsx("div", { className: "tilebar", children: /* @__PURE__ */ a.jsx(
    "div",
    {
      ref: S,
      className: "tilebar__grid",
      onWheel: ge,
      style: {
        "--tile-cell-size": `${y}px`,
        "--tile-cluster-columns": `${w}`,
        "--tile-cluster-rows": `${M}`
      },
      children: d ? f === 0 ? /* @__PURE__ */ a.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: oe }, (N, X) => {
        const se = Z + X, ce = se * v;
        return /* @__PURE__ */ a.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: v }, (Ye, Se) => {
          const Ue = ce + Se, Oe = Ue < 0 || Ue >= f, ot = Oe ? null : m[Ue], Xe = !Oe && D.has(Ue);
          return /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "tilebar__tile",
              "data-active": Ue === i,
              "data-selected": Xe,
              "data-placeholder": Oe,
              onPointerDown: (me) => {
                Oe || ie(Ue, {
                  additive: me.shiftKey,
                  subtractive: me.ctrlKey || me.metaKey
                });
              },
              onPointerEnter: () => {
                Oe || ye(Ue);
              },
              "aria-label": `Tile ${Ue + 1}`,
              disabled: Oe,
              children: ot ? /* @__PURE__ */ a.jsx(
                UM,
                {
                  pixels: ot.pixels,
                  tileWidth: d.tileWidth,
                  tileHeight: d.tileHeight,
                  pixelSize: o,
                  palette: p
                }
              ) : null
            },
            Oe ? `placeholder-${Ue}` : (ot == null ? void 0 : ot.id) ?? `tile-${Ue}`
          );
        }) }, `cluster-${se}`);
      }) : /* @__PURE__ */ a.jsx("div", { className: "tilebar__empty", children: "No tiles yet. Use Tile Sampler to capture some." })
    }
  ) });
}, Xx = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, Fx = (e, t, n, s) => {
  if (t.length <= 1 || e.pixels.length === 0)
    return e;
  const l = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, e.width - 1),
    maxY: Math.max(0, e.height - 1)
  }, i = e.pixels.map((o) => ({ x: o.x, y: o.y })), r = qi(i, l, t, n, s);
  return {
    ...e,
    pixels: e.pixels.map((o) => ({
      ...o,
      paletteIndex: r.get(`${o.x}:${o.y}`) ?? t[0] ?? o.paletteIndex
    }))
  };
}, Ox = (e) => {
  const t = Xx(e.fontSize), n = e.text;
  if (!n.trim())
    return null;
  if (typeof document > "u")
    throw new Error("rasterizeText requires a DOM environment.");
  const s = document.createElement("canvas"), l = s.getContext("2d");
  if (!l)
    return null;
  const i = n.split(`
`);
  l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`;
  let r = 0;
  for (const S of i) {
    const b = l.measureText(S);
    r = Math.max(r, Math.ceil(b.width));
  }
  const o = 2, c = Math.max(1, r + o * 2), u = Math.max(1, i.length * t + o * 2);
  s.width = c, s.height = u, l.clearRect(0, 0, c, u), l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`, l.fillStyle = "#ffffff";
  for (let S = 0; S < i.length; S += 1)
    l.fillText(i[S] ?? "", o, o + S * t);
  const p = l.getImageData(0, 0, c, u).data, d = e.alphaThreshold ?? 128;
  let f = Number.POSITIVE_INFINITY, m = Number.POSITIVE_INFINITY, w = Number.NEGATIVE_INFINITY, M = Number.NEGATIVE_INFINITY;
  for (let S = 0; S < u; S += 1)
    for (let b = 0; b < c; b += 1)
      (p[(S * c + b) * 4 + 3] ?? 0) < d || (f = Math.min(f, b), m = Math.min(m, S), w = Math.max(w, b), M = Math.max(M, S));
  if (!Number.isFinite(f) || !Number.isFinite(m))
    return null;
  const v = w - f + 1, g = M - m + 1, y = [];
  for (let S = m; S <= M; S += 1)
    for (let b = f; b <= w; b += 1)
      (p[(S * c + b) * 4 + 3] ?? 0) < d || y.push({
        x: b - f,
        y: S - m,
        paletteIndex: e.paletteIndex
      });
  return { pixels: y, width: v, height: g };
}, VM = (e) => {
  const t = ga(), { gradientDirection: n, gradientDither: s } = bt.getState(), l = Ox({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const i = t.length > 1 ? Fx(l, t, n, s) : l;
  rt.getState().setBuffer({
    pixels: i.pixels,
    origin: { x: 0, y: 0 },
    width: i.width,
    height: i.height
  }), It.getState().setActiveTool("stamp");
}, KM = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], GM = [8, 16, 24, 32], QM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, ZM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const i = re((S) => S.colors), r = re((S) => S.selectedIndices), o = re((S) => S.getActiveIndex()), c = bt((S) => S.gradientDirection), u = bt((S) => S.gradientDither), [h, p] = Te.useState(e), [d, f] = Te.useState(t), [m, w] = Te.useState(Xx(n)), M = T.useRef(null), v = T.useRef(null), g = T.useRef(null);
  T.useEffect(() => {
    var S, b, _;
    (S = M.current) == null || S.focus(), (_ = (b = M.current) == null ? void 0 : b.select) == null || _.call(b);
  }, []);
  const y = T.useMemo(() => {
    try {
      const S = Ox({
        text: h,
        fontFamily: d,
        fontSize: m,
        paletteIndex: o
      });
      if (!S)
        return null;
      const b = /* @__PURE__ */ new Set(), _ = [];
      for (const C of r)
        C < 0 || C >= i.length || b.has(C) || (b.add(C), _.push(C));
      return _.length <= 1 ? S : Fx(S, _, c, u);
    } catch {
      return null;
    }
  }, [
    o,
    d,
    m,
    c,
    u,
    i.length,
    r,
    h
  ]);
  return T.useEffect(() => {
    const S = v.current, b = g.current;
    if (!S || !b)
      return;
    const _ = () => {
      const A = QM(b, S.clientWidth, S.clientHeight);
      if (!A)
        return;
      const L = S.clientWidth, F = S.clientHeight, P = i[0] ?? "#000000", z = wt(P) ?? { r: 0, g: 0, b: 0 }, Z = ma(z, pa(z)), oe = Ld(ds(z, Z, 0.1)), G = dn(Z, 0.12);
      if (A.clearRect(0, 0, L, F), A.fillStyle = P, A.fillRect(0, 0, L, F), !y || y.pixels.length === 0)
        return;
      const ne = 12, D = Math.max(1, L - ne * 2), H = Math.max(1, F - ne * 2), Q = Math.max(
        1,
        Math.floor(
          Math.min(D / y.width, H / y.height)
        )
      ), le = y.width * Q, ae = y.height * Q, xe = Math.floor((L - le) / 2), O = Math.floor((F - ae) / 2);
      A.fillStyle = oe, A.fillRect(xe, O, le, ae), A.strokeStyle = G, A.strokeRect(xe, O, le, ae);
      const ie = /* @__PURE__ */ new Map();
      for (const ye of y.pixels) {
        const W = ie.get(ye.paletteIndex);
        W ? W.push({ x: ye.x, y: ye.y }) : ie.set(ye.paletteIndex, [{ x: ye.x, y: ye.y }]);
      }
      for (const [ye, W] of ie) {
        A.fillStyle = i[ye] ?? i[o] ?? "#ffffff";
        for (const ge of W)
          A.fillRect(
            xe + ge.x * Q,
            O + ge.y * Q,
            Q,
            Q
          );
      }
    };
    _();
    const C = re.subscribe(_), j = new ResizeObserver(_);
    return j.observe(S), () => {
      C(), j.disconnect();
    };
  }, [o, i, y]), /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (S) => {
        S.key === "Escape" && (S.preventDefault(), s());
      },
      children: [
        /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: s }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--text", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ a.jsx("h2", { children: "Text" }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: s, children: "Close" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Font" }),
              /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(
                "select",
                {
                  value: d,
                  onChange: (S) => f(S.target.value),
                  children: KM.map((S) => /* @__PURE__ */ a.jsx("option", { value: S.value, children: S.label }, S.value))
                }
              ) })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Size" }),
              /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsx(
                "select",
                {
                  value: m,
                  onChange: (S) => w(Number(S.target.value)),
                  children: GM.map((S) => /* @__PURE__ */ a.jsxs("option", { value: S, children: [
                    S,
                    "px"
                  ] }, S))
                }
              ) })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Text" }),
              /* @__PURE__ */ a.jsx("span", { className: "text-tool__text-field", children: /* @__PURE__ */ a.jsx(
                "input",
                {
                  ref: M,
                  className: "text-tool__text-input",
                  type: "text",
                  value: h,
                  onChange: (S) => p(S.target.value),
                  placeholder: "Type text…",
                  onKeyDown: (S) => {
                    if (S.key === "Enter") {
                      if (S.preventDefault(), !h.trim())
                        return;
                      l({ text: h, fontFamily: d, fontSize: m });
                    }
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ a.jsx("div", { className: "text-tool__preview", ref: v, children: /* @__PURE__ */ a.jsx("canvas", { ref: g }) }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: s, children: "Cancel" }),
                /* @__PURE__ */ a.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => l({ text: h, fontFamily: d, fontSize: m }),
                    disabled: !h.trim(),
                    children: "OK"
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, qM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = T.useState(!0), [l, i] = T.useState(!1), [r, o] = T.useState(!1), [c, u] = T.useState(!1), [h, p] = T.useState("gpt-image-1"), [d, f] = T.useState("openai"), [m, w] = T.useState("http://localhost:8080/v1"), [M, v] = T.useState("sdxl"), [g, y] = T.useState(!1), [S, b] = T.useState(!1), [_, C] = T.useState(!1), [j, A] = T.useState(!1), [L, F] = T.useState(""), [P, z] = T.useState(!1), [Z, oe] = T.useState(!1), [G, ne] = T.useState(""), D = T.useRef(null);
  T.useEffect(() => {
    let W = !1;
    return (async () => {
      try {
        const N = await B.options().getOpenAiKeyInfo(), X = await B.options().getOpenAiImageModel(), se = await B.options().getAiImageProvider(), ce = await B.options().getLocalAiConfig(), Ye = await B.options().getLocalAiKeyInfo(), Se = await B.options().getAdvancedMode();
        if (W)
          return;
        i(N.hasKey), o(N.encryptionAvailable), u(N.storedEncrypted), p(X), f(se), w(ce.baseUrl), v(ce.model), y(Ye.hasKey), b(Ye.encryptionAvailable), C(Ye.storedEncrypted), z(Se);
      } finally {
        W || s(!1);
      }
    })(), () => {
      W = !0;
    };
  }, []), T.useEffect(() => {
    n || window.setTimeout(() => {
      var W;
      return (W = D.current) == null ? void 0 : W.focus();
    }, 0);
  }, [n]);
  const H = async () => {
    const W = G.trim();
    if (!W) {
      B.alert("Paste your OpenAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await B.options().setOpenAiApiKey(W);
      const ge = await B.options().getOpenAiKeyInfo();
      i(ge.hasKey), o(ge.encryptionAvailable), u(ge.storedEncrypted), ne(""), oe(!1);
    } catch (ge) {
      console.error("Failed to save OpenAI API key:", ge), B.alert("Unable to save API key.");
    } finally {
      s(!1);
    }
  }, Q = async () => {
    if (window.confirm("Clear the saved OpenAI API key?")) {
      s(!0);
      try {
        await B.options().setOpenAiApiKey(null);
        const W = await B.options().getOpenAiKeyInfo();
        i(W.hasKey), o(W.encryptionAvailable), u(W.storedEncrypted), ne(""), oe(!1);
      } catch (W) {
        console.error("Failed to clear OpenAI API key:", W), B.alert("Unable to clear API key.");
      } finally {
        s(!1);
      }
    }
  }, le = async (W) => {
    p(W);
    try {
      await B.options().setOpenAiImageModel(W);
    } catch (ge) {
      console.error("Failed to set image model:", ge), B.alert("Unable to update image model.");
      const N = await B.options().getOpenAiImageModel().catch(() => "gpt-image-1");
      p(N);
    }
  }, ae = async (W) => {
    f(W);
    try {
      await B.options().setAiImageProvider(W);
    } catch (ge) {
      console.error("Failed to set image provider:", ge), B.alert("Unable to update image provider.");
      const N = await B.options().getAiImageProvider().catch(() => "openai");
      f(N);
    }
  }, xe = async () => {
    const W = L.trim();
    if (!W) {
      B.alert("Paste your LocalAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await B.options().setLocalAiApiKey(W);
      const ge = await B.options().getLocalAiKeyInfo();
      y(ge.hasKey), b(ge.encryptionAvailable), C(ge.storedEncrypted), F(""), A(!1);
    } catch (ge) {
      console.error("Failed to save LocalAI API key:", ge), B.alert("Unable to save LocalAI API key.");
    } finally {
      s(!1);
    }
  }, O = async () => {
    if (window.confirm("Clear the saved LocalAI API key?")) {
      s(!0);
      try {
        await B.options().setLocalAiApiKey(null);
        const W = await B.options().getLocalAiKeyInfo();
        y(W.hasKey), b(W.encryptionAvailable), C(W.storedEncrypted), F(""), A(!1);
      } catch (W) {
        console.error("Failed to clear LocalAI API key:", W), B.alert("Unable to clear LocalAI API key.");
      } finally {
        s(!1);
      }
    }
  }, ie = async (W) => {
    z(W);
    try {
      await B.options().setAdvancedMode(W), t(W);
    } catch (ge) {
      console.error("Failed to update advanced mode:", ge), B.alert("Unable to update advanced mode.");
      const N = await B.options().getAdvancedMode().catch(() => !0);
      z(N), t(N);
    }
  }, ye = l ? c ? "Saved (encrypted)" : r ? "Saved" : "Saved (not encrypted)" : "Not set";
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (W) => {
        W.key === "Escape" && (W.preventDefault(), e());
      },
      children: [
        /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: e }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--options", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ a.jsx("h2", { children: "Options" }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: e, children: "Close" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Advanced Mode" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ a.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: P,
                      onChange: (W) => void ie(W.currentTarget.checked),
                      disabled: n
                    }
                  ),
                  "Show tile tools"
                ] }),
                /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.7 }, children: "Hide or reveal tiling tools in the toolbar." })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "AI Provider" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsxs(
                  "select",
                  {
                    value: d,
                    onChange: (W) => void ae(W.target.value),
                    disabled: n,
                    children: [
                      /* @__PURE__ */ a.jsx("option", { value: "openai", children: "OpenAI" }),
                      /* @__PURE__ */ a.jsx("option", { value: "localai", children: "LocalAI" })
                    ]
                  }
                ),
                /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.7 }, children: "Used by the AI Prompt tool." })
              ] })
            ] }),
            d === "openai" && /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "OpenAI Image Model" }),
              /* @__PURE__ */ a.jsx("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ a.jsxs(
                "select",
                {
                  value: h,
                  onChange: (W) => void le(W.target.value),
                  disabled: n,
                  children: [
                    /* @__PURE__ */ a.jsx("option", { value: "gpt-image-1-mini", children: "gpt-image-1-mini (faster/cheaper)" }),
                    /* @__PURE__ */ a.jsx("option", { value: "gpt-image-1", children: "gpt-image-1 (higher quality)" })
                  ]
                }
              ) })
            ] }),
            d === "localai" && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
              /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ a.jsx("span", { children: "LocalAI Base URL" }),
                /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ a.jsx(
                    "input",
                    {
                      type: "text",
                      value: m,
                      onChange: (W) => w(W.target.value),
                      onBlur: () => void B.options().setLocalAiBaseUrl(m),
                      disabled: n,
                      style: { width: 360 }
                    }
                  ),
                  /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.7 }, children: "e.g. http://localhost:8080/v1" })
                ] })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ a.jsx("span", { children: "LocalAI Model" }),
                /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ a.jsx(
                    "input",
                    {
                      type: "text",
                      value: M,
                      onChange: (W) => v(W.target.value),
                      onBlur: () => void B.options().setLocalAiImageModel(M),
                      disabled: n,
                      style: { width: 240 }
                    }
                  ),
                  /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.7 }, children: "Must match your LocalAI image model name." })
                ] })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ a.jsx("span", { children: "LocalAI API Key" }),
                /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ a.jsx(
                    "input",
                    {
                      type: j ? "text" : "password",
                      value: L,
                      placeholder: g ? "•••••••••••••••• (saved)" : "(optional)",
                      onChange: (W) => F(W.target.value),
                      disabled: n,
                      style: { width: 320 }
                    }
                  ),
                  /* @__PURE__ */ a.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => A((W) => !W),
                      disabled: n,
                      children: j ? "Hide" : "Show"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ a.jsx("span", { children: "LocalAI Key Status" }),
                /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.9 }, children: g ? _ ? "Saved (encrypted)" : S ? "Saved" : "Saved (not encrypted)" : "Not set (optional)" })
              ] }),
              /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ a.jsx("span", {}),
                /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                  /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => void xe(), disabled: n, children: "Save Key" }),
                  /* @__PURE__ */ a.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void O(),
                      disabled: n || !g,
                      children: "Clear"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "OpenAI API Key" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    ref: D,
                    type: Z ? "text" : "password",
                    value: G,
                    placeholder: l ? "•••••••••••••••• (saved)" : "sk-...",
                    onChange: (W) => ne(W.target.value),
                    disabled: n,
                    style: { width: 320 }
                  }
                ),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => oe((W) => !W), disabled: n, children: Z ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "OpenAI Key Status" }),
              /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.9 }, children: ye })
            ] }),
            !r && /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.8 }, children: "Encryption is unavailable on this system; the key may be stored in plain text." })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: H, disabled: n, children: "Save Key" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: Q, disabled: n || !l, children: "Clear" })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.75 }, children: "Note: LocalAI must expose OpenAI-compatible image endpoints at the Base URL." })
            ] })
          ] })
        ] })
      ]
    }
  );
}, JM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, eb = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((h) => wt(h) ?? { r: 0, g: 0, b: 0 }), i = l.length > 1 ? Array.from({ length: l.length - 1 }, (h, p) => p + 1) : [0], r = [], { width: o, height: c, data: u } = e;
  for (let h = 0; h < c; h += 1)
    for (let p = 0; p < o; p += 1) {
      const d = (h * o + p) * 4, f = u[d] ?? 0, m = u[d + 1] ?? 0, w = u[d + 2] ?? 0;
      if ((u[d + 3] ?? 0) < s)
        continue;
      const v = { r: f, g: m, b: w };
      let g = i[0] ?? 0, y = Number.POSITIVE_INFINITY;
      for (const S of i) {
        const b = JM(v, l[S] ?? l[0]);
        b < y && (y = b, g = S);
      }
      g !== 0 && r.push({ x: p, y: h, paletteIndex: g });
    }
  return { pixels: r };
}, Yd = (e) => {
  const t = re.getState().colors, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = new Uint8ClampedArray(n * s * 4);
  for (const i of e.pixels) {
    const r = t[i.paletteIndex];
    if (!r)
      continue;
    const o = wt(r);
    if (!o)
      continue;
    const c = i.x - e.minX, h = ((i.y - e.minY) * n + c) * 4;
    l[h] = o.r, l[h + 1] = o.g, l[h + 2] = o.b, l[h + 3] = 255;
  }
  return { data: l, width: n, height: s };
}, tb = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const i = l.x - e.minX, r = l.y - e.minY;
    s[r * t + i] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, nb = async () => {
  const e = js();
  if (!e)
    return null;
  const { data: t, width: n, height: s } = Yd(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return null;
  const r = new ImageData(t, n, s);
  i.putImageData(r, 0, 0);
  const o = await new Promise(
    (h) => l.toBlob((p) => h(p), "image/png")
  );
  if (!o)
    return null;
  const c = new Uint8Array(await o.arrayBuffer());
  let u = "";
  for (const h of c)
    u += String.fromCharCode(h);
  return btoa(u);
}, rs = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), sb = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = re((P) => P.colors), [l, i] = T.useState(e), [r, o] = T.useState(16), [c, u] = T.useState(16), [h, p] = T.useState(1), [d, f] = T.useState(1), [m, w] = T.useState(!1), [M, v] = T.useState(!1), [g, y] = T.useState(""), [S, b] = T.useState(0), [_, C] = T.useState(null), j = T.useRef(null), A = T.useMemo(() => rs(r, 1, 512) * rs(h, 1, 64), [
    r,
    h
  ]), L = T.useMemo(() => rs(c, 1, 512) * rs(d, 1, 64), [
    c,
    d
  ]);
  T.useEffect(() => {
    window.setTimeout(() => {
      var P;
      return (P = j.current) == null ? void 0 : P.focus();
    }, 0);
  }, []), T.useEffect(() => {
    if (!M) {
      b(0);
      return;
    }
    const P = Date.now(), z = window.setInterval(() => {
      b(Math.floor((Date.now() - P) / 1e3));
    }, 250);
    return () => window.clearInterval(z);
  }, [M]);
  const F = async () => {
    var z;
    C(null);
    const P = l.trim();
    if (!P) {
      C("Enter a prompt.");
      return;
    }
    if (!((z = B.ai()) != null && z.generateSprite)) {
      C("AI is unavailable. Restart the app to load the latest AI support.");
      return;
    }
    v(!0), y("Preparing request…");
    try {
      y(m ? "Encoding reference…" : "Preparing prompt…");
      const Z = m ? await nb() : null;
      y("Waiting for OpenAI…");
      const oe = await B.ai().generateSprite({
        prompt: P,
        palette: s,
        cellWidth: rs(r, 1, 512),
        cellHeight: rs(c, 1, 512),
        columns: rs(h, 1, 64),
        rows: rs(d, 1, 64),
        referencePngBase64: Z
      });
      y("Processing image…");
      const G = new Image(), ne = `data:image/png;base64,${oe.pngBase64}`;
      await new Promise((ae, xe) => {
        G.onload = () => ae(), G.onerror = () => xe(new Error("Failed to load generated image.")), G.src = ne;
      });
      const D = document.createElement("canvas");
      D.width = A, D.height = L;
      const H = D.getContext("2d");
      if (!H)
        throw new Error("Canvas unavailable.");
      H.imageSmoothingEnabled = !1, H.clearRect(0, 0, A, L), H.drawImage(G, 0, 0, A, L), y("Quantizing to palette…");
      const Q = H.getImageData(0, 0, A, L), le = eb(Q, s, { alphaThreshold: 10 });
      y("Copying to Stamp…"), rt.getState().setBuffer({
        pixels: le.pixels,
        origin: { x: 0, y: 0 },
        width: A,
        height: L
      }), It.getState().setActiveTool("stamp"), n({
        prompt: P,
        cellWidth: r,
        cellHeight: c,
        columns: h,
        rows: d,
        useSelectionAsReference: m
      });
    } catch (Z) {
      console.error("AI generation failed:", Z), C(Z instanceof Error ? Z.message : "AI generation failed.");
    } finally {
      v(!1), y("");
    }
  };
  return /* @__PURE__ */ a.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (P) => {
        P.key === "Escape" && (P.preventDefault(), t()), (P.ctrlKey || P.metaKey) && P.key === "Enter" && (P.preventDefault(), F());
      },
      children: [
        /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: t }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--ai", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ a.jsx("h2", { children: "AI Prompt" }),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: t, disabled: M, children: "Close" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Prompt" }),
              /* @__PURE__ */ a.jsxs("span", { style: { width: 420 }, children: [
                /* @__PURE__ */ a.jsx(
                  "textarea",
                  {
                    ref: j,
                    value: l,
                    onChange: (P) => i(P.target.value),
                    rows: 5,
                    style: { width: "100%", resize: "vertical" },
                    placeholder: "e.g. give me a hero standing idle in 4 directions, 16x32 pixels tall for each cell",
                    disabled: M
                  }
                ),
                /* @__PURE__ */ a.jsx("div", { style: { opacity: 0.75, marginTop: 6 }, children: "Ctrl/Cmd+Enter to generate. Uses current palette." })
              ] })
            ] }),
            M && /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Status" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "grid", gap: 8, width: 420 }, children: [
                /* @__PURE__ */ a.jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [
                  /* @__PURE__ */ a.jsx("span", { className: "spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ a.jsxs("span", { style: { opacity: 0.9 }, children: [
                    g || "Generating…",
                    S > 0 ? ` (${S}s)` : ""
                  ] })
                ] }),
                /* @__PURE__ */ a.jsx("div", { className: "progress-bar", "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("div", { className: "progress-bar__indeterminate" }) })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Cell" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: r,
                    onChange: (P) => o(Number(P.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ a.jsx("span", { children: "×" }),
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: c,
                    onChange: (P) => u(Number(P.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ a.jsx("span", { children: "px" })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Grid" }),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: h,
                    onChange: (P) => p(Number(P.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ a.jsx("span", { children: "cols" }),
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: d,
                    onChange: (P) => f(Number(P.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ a.jsx("span", { children: "rows" }),
                /* @__PURE__ */ a.jsxs("span", { style: { opacity: 0.75 }, children: [
                  "(",
                  A,
                  "×",
                  L,
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", { children: "Reference" }),
              /* @__PURE__ */ a.jsxs("label", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: m,
                    onChange: (P) => w(P.target.checked),
                    disabled: M
                  }
                ),
                "Use current selection as reference image (optional)"
              ] })
            ] }),
            _ && /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsx("span", { style: { color: "#ff9caa" }, children: _ })
            ] }),
            /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ a.jsx("span", {}),
              /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => void F(), disabled: M, children: M ? "Generating…" : "Generate" }),
                /* @__PURE__ */ a.jsx("button", { type: "button", onClick: t, disabled: M, children: "Cancel" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, be = {
  undo: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M9 7H5v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M5 11c2.2-3.4 6.1-5.5 10.2-5.5 4.8 0 8.8 3 9.8 7.3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M5 11l4-4" })
  ] }),
  redo: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M15 7h4v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M19 11c-2.2-3.4-6.1-5.5-10.2-5.5-4.8 0-8.8 3-9.8 7.3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M19 11l-4-4" })
  ] }),
  cut: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("circle", { cx: "6", cy: "6", r: "2.2" }),
    /* @__PURE__ */ a.jsx("circle", { cx: "6", cy: "18", r: "2.2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8l12 8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 16l6-4" })
  ] }),
  copy: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6", y: "6", width: "10", height: "10", rx: "1.6" }),
    /* @__PURE__ */ a.jsx("rect", { x: "9", y: "9", width: "10", height: "10", rx: "1.6" })
  ] }),
  "copy-deep": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "7", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ a.jsx("rect", { x: "10", y: "9", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M17 5v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M15 7h4" })
  ] }),
  paste: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6", y: "7", width: "12", height: "13", rx: "1.6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 4h6v3H9z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 11h6" })
  ] }),
  pen: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M4 20l4-1 12-12-3-3L5 16l-1 4z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M13.5 5.5l3 3" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 17l2 2" })
  ] }),
  spray: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M9 10h7l2 2v3H9z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 12h2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 12h1" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12.5 6v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9.5 16.2l-1 1" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 17.2l-.6 1.2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14.6 16.6l1 1" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 18l.8.8" })
  ] }),
  line: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M6 18L18 6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 18h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 6h0" })
  ] }),
  rectangle: /* @__PURE__ */ a.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a.jsx("rect", { x: "5", y: "6", width: "14", height: "12", rx: "1.5" }) }),
  oval: /* @__PURE__ */ a.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ a.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5" }) }),
  "fill-bucket": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M6.5 11.5l8-8 3 3-8 8H6.5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6.8 15.5h6.4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 14.5c0 1-1 2-2 2s-2-1-2-2 2-3 2-3 2 2 2 3z" })
  ] }),
  text: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M6 6h12" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 6v12" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 18h6" })
  ] }),
  ai: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M18 12l.9 2.8L22 16l-3.1 1.2L18 20l-.9-2.8L14 16l3.1-1.2L18 12z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 13l.8 2.4L7.5 16l-2.7 1L4 19.4l-.8-2.4L0.5 16l2.7-.6L4 13z" })
  ] }),
  "reference-handle": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 8v8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7.5 7.5h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16.5 7.5h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7.5 16.5h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16.5 16.5h0" })
  ] }),
  eyedropper: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M14.5 5.5l4 4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 19l8.2-8.2a2.2 2.2 0 000-3.1l-.9-.9a2.2 2.2 0 00-3.1 0L2 15.9V19h4z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9.5 9.5l5 5" })
  ] }),
  stamp: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 15v-4a3 3 0 016 0v4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 15h8" })
  ] }),
  "selection-rect": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 16h0" })
  ] }),
  "selection-oval": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 9h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M15 15h0" })
  ] }),
  "magic-wand": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M4 20l9-9" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12.5 12.5l7.5 7.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M17 4l.6 1.7L19 6l-1.4.3L17 8l-.6-1.7L15 6l1.4-.3L17 4z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14 8l.4 1.1L15.5 9l-1.1.2L14 10.3l-.4-1.1L12.5 9l1.1-.2L14 8z" })
  ] }),
  "selection-lasso": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 5c-4.5 0-8 2.1-8 4.8S7.5 14.6 12 14.6 20 12.5 20 9.8 16.5 5 12 5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8.2 14.6l-2 4.9" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6.2 19.5l2.6-1.2" })
  ] }),
  "texture-roll": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 12h6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 9v6" }),
    /* @__PURE__ */ a.jsx("path", { d: "M3 12h2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M19 12h2" })
  ] }),
  "tile-sampler": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M5 13h6v6H5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M13 13h6v6h-6z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14.2 14.2l4.8 4.8" })
  ] }),
  "tile-pen": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M5 5h8v8H5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 12l8-8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14.2 6.2l3.6 3.6" })
  ] }),
  "tile-stamp": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9 15v-2a3 3 0 016 0v2" })
  ] }),
  "tile-rectangle": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8h8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 16h8" })
  ] }),
  "tile-9slice": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M10 6v12" }),
    /* @__PURE__ */ a.jsx("path", { d: "M14 6v12" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 10h12" }),
    /* @__PURE__ */ a.jsx("path", { d: "M6 14h12" })
  ] }),
  "tile-export": /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "6", y: "7", width: "12", height: "11", rx: "1.5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 4v8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M9.5 6.5L12 4l2.5 2.5" })
  ] }),
  export: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 4v10" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 10l4 4 4-4" }),
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "18", width: "14", height: "2", rx: "1" })
  ] }),
  clear: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8l8 8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 8l-8 8" })
  ] }),
  layers: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M12 4l8 4-8 4-8-4 8-4z" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 12l8 4 8-4" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 16l8 4 8-4" })
  ] }),
  overlays: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.8" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 5v14" }),
    /* @__PURE__ */ a.jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 16h0" })
  ] }),
  swatch: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("rect", { x: "4.5", y: "6.5", width: "15", height: "11", rx: "2" }),
    /* @__PURE__ */ a.jsx("path", { d: "M8 6.5v11" }),
    /* @__PURE__ */ a.jsx("path", { d: "M12 6.5v11" }),
    /* @__PURE__ */ a.jsx("path", { d: "M16 6.5v11" })
  ] }),
  fullscreen: /* @__PURE__ */ a.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ a.jsx("path", { d: "M4 9V4h5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M20 9V4h-5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M4 15v5h5" }),
    /* @__PURE__ */ a.jsx("path", { d: "M20 15v5h-5" })
  ] })
}, lb = (e, t) => {
  const n = ee.getState(), s = n.activeLayerId, l = new Set(
    n.layers.filter((i) => i.id === s || i.visible).map((i) => i.id)
  );
  for (let i = n.layers.length - 1; i >= 0; i -= 1) {
    const r = n.layers[i];
    if (!l.has(r.id))
      continue;
    const o = r.store.getPixel(e, t);
    if (o !== 0)
      return o;
  }
  return 0;
}, zx = (e = {}) => {
  const t = we.getState();
  if (t.selectedCount === 0)
    return null;
  const n = ee.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: h, col: p, block: d } of u) {
    const f = p * Y, m = h * Y;
    for (let w = 0; w < Y; w += 1)
      for (let M = 0; M < Y; M += 1) {
        if (d[w * Y + M] !== 1)
          continue;
        const v = f + M, g = m + w, y = c ? lb(v, g) : n.getPixel(v, g);
        s.push({ x: v, y: g, paletteIndex: y }), l = Math.min(l, v), i = Math.max(i, v), r = Math.min(r, g), o = Math.max(o, g);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: i, minY: r, maxY: o };
}, Hx = (e) => {
  const t = { x: e.minX, y: e.minY }, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = e.pixels.map((i) => ({
    x: i.x - t.x,
    y: i.y - t.y,
    paletteIndex: i.paletteIndex
  }));
  rt.getState().setBuffer({
    pixels: l,
    origin: t,
    width: n,
    height: s
  });
}, Ko = (e = {}) => {
  const t = zx(e);
  t && (Hx(t), we.getState().clear(), It.getState().setActiveTool("stamp"));
}, Wx = () => {
  const e = zx();
  if (!e)
    return;
  Hx(e);
  const t = ee.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Be.getState().pushBatch({ changes: n })), we.getState().clear(), It.getState().setActiveTool("stamp");
}, ib = () => {
  const e = we.getState();
  if (e.selectedCount === 0)
    return;
  const t = Be.getState();
  if (t.locked)
    return;
  const n = ee.getState(), s = n.activeLayerId, l = [], i = [], r = e.store.getBlocks();
  for (const { row: o, col: c, block: u } of r) {
    const h = c * Y, p = o * Y;
    for (let d = 0; d < Y; d += 1)
      for (let f = 0; f < Y; f += 1) {
        if (u[d * Y + f] !== 1)
          continue;
        const m = h + f, w = p + d, M = n.getPixelInLayer(s, m, w);
        M !== 0 && (l.push({ x: m, y: w, prev: M, next: 0 }), i.push({ x: m, y: w, paletteIndex: 0 }));
      }
  }
  i.length !== 0 && (n.setPixelsInLayer(s, i), t.pushBatch({ layerId: s, changes: l }));
}, Ux = () => {
  const e = V.getState();
  return e.tileSets.find((t) => t.id === e.activeTileSetId) ?? null;
}, rb = (e) => {
  const t = V.getState(), n = t.tileMaps.find(
    (s) => s.id === t.activeTileMapId && s.tileSetId === e
  );
  return n || (t.tileMaps.find((s) => s.tileSetId === e) ?? null);
}, $x = (e) => {
  const t = rb(e.id);
  if (!t)
    return null;
  const n = we.getState();
  if (n.selectedCount <= 0)
    return null;
  const s = /* @__PURE__ */ new Set();
  let l = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
  const c = n.store.getBlocks();
  for (const { row: d, col: f, block: m } of c) {
    const w = f * Y, M = d * Y;
    for (let v = 0; v < Y; v += 1)
      for (let g = 0; g < Y; g += 1) {
        if (m[v * Y + g] !== 1)
          continue;
        const y = w + g, S = M + v, b = Math.floor((y - t.originX) / e.tileWidth), _ = Math.floor((S - t.originY) / e.tileHeight);
        if (b < 0 || _ < 0 || b >= t.columns || _ >= t.rows)
          continue;
        const C = `${b}:${_}`;
        s.has(C) || (s.add(C), l = Math.min(l, b), i = Math.min(i, _), r = Math.max(r, b), o = Math.max(o, _));
      }
  }
  if (s.size === 0)
    return null;
  const u = r - l + 1, h = o - i + 1, p = new Array(u * h).fill(-1);
  for (const d of s) {
    const [f, m] = d.split(":"), w = Number(f), M = Number(m), v = (M - i) * u + (w - l);
    p[v] = t.tiles[M * t.columns + w] ?? -1;
  }
  return {
    map: t,
    tiles: p,
    cols: u,
    rows: h,
    bounds: { minCol: l, minRow: i, maxCol: r, maxRow: o }
  };
}, Vx = (e) => {
  const t = V.getState(), n = Math.max(1, t.selectedTileCols), s = Math.max(1, t.selectedTileRows), l = n * s, i = new Array(l).fill(-1);
  for (let r = 0; r < l; r += 1)
    i[r] = t.selectedTileIndices[r] ?? -1;
  return i.some((r) => r >= 0) ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: i,
    cols: n,
    rows: s,
    source: "palette"
  }), we.getState().clear(), It.getState().setActiveTool("tile-stamp"), !0) : !1;
}, Kx = () => {
  const e = Ux();
  if (!e)
    return !1;
  const t = $x(e);
  return t ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: t.tiles,
    cols: t.cols,
    rows: t.rows,
    source: "map"
  }), we.getState().clear(), It.getState().setActiveTool("tile-stamp"), !0) : Vx(e);
}, Gx = () => {
  const e = Ux();
  if (!e)
    return !1;
  const t = $x(e);
  if (t) {
    rt.getState().setTileBuffer({
      tileSetId: e.id,
      tiles: t.tiles,
      cols: t.cols,
      rows: t.rows,
      source: "map"
    });
    const r = [];
    for (let o = t.bounds.minRow; o <= t.bounds.maxRow; o += 1)
      for (let c = t.bounds.minCol; c <= t.bounds.maxCol; c += 1) {
        const u = (o - t.bounds.minRow) * t.cols + (c - t.bounds.minCol);
        (t.tiles[u] ?? -1) !== -1 && r.push({ index: o * t.map.columns + c, tile: -1 });
      }
    if (r.length > 0) {
      const o = Ht();
      V.getState().setTileMapTiles(t.map.id, r);
      const c = Ht();
      qs(o, c);
    }
    return we.getState().clear(), It.getState().setActiveTool("tile-stamp"), !0;
  }
  if (!Vx(e))
    return !1;
  const s = Array.from(
    new Set(V.getState().selectedTileIndices.filter((r) => r >= 0))
  ).sort((r, o) => r - o);
  if (s.length === 0)
    return !1;
  const l = Ht();
  V.getState().deleteTilesFromSet(e.id, s);
  const i = Ht();
  return qs(l, i), !0;
}, Qx = async () => {
  const e = js();
  if (!e)
    return B.alert("Select a region to export."), null;
  const { data: t, width: n, height: s } = Yd(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return B.alert("Unable to export selection."), null;
  const r = new ImageData(t, n, s);
  i.putImageData(r, 0, 0);
  const o = await new Promise(
    (p) => l.toBlob((d) => p(d), "image/png")
  );
  if (!o)
    return B.alert("Unable to export selection."), null;
  const c = B.project();
  if (!(c != null && c.exportPng))
    return B.alert("PNG export is unavailable in this host."), null;
  const u = new Uint8Array(await o.arrayBuffer()), h = `pixel-splash-selection-${n}x${s}.png`;
  return c.exportPng(u, h);
}, Fp = (e, t, n) => Math.min(n, Math.max(t, e)), ob = (e, t, n, s) => {
  const [l, i] = Te.useState({ x: t, y: n });
  return Te.useLayoutEffect(() => {
    if (!e || !s.current) {
      i({ x: t, y: n });
      return;
    }
    const r = s.current.getBoundingClientRect(), o = 8, c = Math.max(o, window.innerWidth - r.width - o), u = Math.max(o, window.innerHeight - r.height - o);
    i({
      x: Fp(t, o, c),
      y: Fp(n, o, u)
    });
  }, [e, s, t, n]), l;
}, pl = ({
  checked: e,
  label: t,
  onChange: n,
  title: s
}) => /* @__PURE__ */ a.jsxs(
  "button",
  {
    type: "button",
    className: "bottom-dock__menu-item bottom-dock__menu-toggle",
    "data-active": e,
    onClick: n,
    title: s,
    role: "menuitemcheckbox",
    "aria-checked": e,
    children: [
      /* @__PURE__ */ a.jsx("span", { className: "bottom-dock__menu-toggle-indicator", "aria-hidden": "true" }),
      /* @__PURE__ */ a.jsx("span", { children: t })
    ]
  }
);
class ab extends Te.Component {
  constructor() {
    super(...arguments), this.state = { hasError: !1 };
  }
  static getDerivedStateFromError() {
    return { hasError: !0 };
  }
  componentDidCatch(t) {
    console.error("Topbar crashed:", t);
  }
  render() {
    return this.state.hasError ? /* @__PURE__ */ a.jsxs("div", { className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
      /* @__PURE__ */ a.jsx("div", { style: { opacity: 0.9 }, children: "Toolbar disabled due to an error." }),
      /* @__PURE__ */ a.jsx("div", { style: { flex: 1 } }),
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "topbar__mode-button", onClick: () => window.location.reload(), children: "Reload" })
    ] }) : this.props.children;
  }
}
const cb = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: r,
  showAiTool: o,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: h,
  toolOptions: p
}) => {
  const d = Te.useRef(null), f = Te.useRef(null), m = Be((N) => N.locked), w = Be((N) => N.undoStack.length > 0), M = Be((N) => N.redoStack.length > 0), v = Be((N) => N.undo), g = Be((N) => N.redo), y = rt((N) => N), S = y.pixels.length > 0 && y.width > 0 && y.height > 0, b = y.tileBuffer !== null && y.tileBuffer.cols > 0 && y.tileBuffer.rows > 0 && y.tileBuffer.tiles.length > 0, _ = s === "tile", C = V(
    (N) => new Set(N.selectedTileIndices.filter((X) => X >= 0)).size
  ), j = t > 0 || C > 0, A = () => {
    if (_) {
      Kx();
      return;
    }
    Ko();
  }, L = () => {
    if (_) {
      Gx();
      return;
    }
    Wx();
  }, F = () => {
    if (_) {
      b && n("tile-stamp");
      return;
    }
    n("stamp");
  }, P = Le((N) => N.showReferenceLayer), z = Le((N) => N.showPixelLayer), Z = Le((N) => N.showTileLayer), oe = Le((N) => N.showPixelGrid), G = Le((N) => N.showTileGrid), ne = Le((N) => N.showAxes), D = Le((N) => N.toggleReferenceLayer), H = Le((N) => N.togglePixelLayer), Q = Le((N) => N.toggleTileLayer), le = Le((N) => N.togglePixelGrid), ae = Le((N) => N.toggleTileGrid), xe = Le((N) => N.toggleAxes), [O, ie] = Te.useState({
    open: !1,
    kind: "layers",
    x: 0,
    y: 0
  }), ye = ob(O.open, O.x, O.y, f), W = Te.useCallback(() => {
    ie((N) => N.open ? { ...N, open: !1 } : N);
  }, []), ge = (N) => (X) => {
    if (X.preventDefault(), O.open && O.kind === N) {
      W();
      return;
    }
    ie({ open: !0, kind: N, x: X.clientX, y: X.clientY });
  };
  return Te.useEffect(() => {
    if (!O.open)
      return;
    const N = (se) => {
      f.current && f.current.contains(se.target) || W();
    }, X = (se) => {
      se.key === "Escape" && W();
    };
    return window.addEventListener("mousedown", N), window.addEventListener("keydown", X), () => {
      window.removeEventListener("mousedown", N), window.removeEventListener("keydown", X);
    };
  }, [W, O.open]), Te.useLayoutEffect(() => {
    const N = d.current;
    if (!N)
      return;
    const X = () => {
      const ce = N.offsetHeight;
      ce > 0 && document.documentElement.style.setProperty("--topbar-height", `${ce}px`);
    };
    if (X(), typeof ResizeObserver > "u") {
      const ce = () => X();
      return window.addEventListener("resize", ce), () => {
        window.removeEventListener("resize", ce);
      };
    }
    const se = new ResizeObserver(X);
    return se.observe(N), () => se.disconnect();
  }, []), /* @__PURE__ */ a.jsxs("div", { ref: d, className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "topbar__tools", role: "presentation", children: [
      i && /* @__PURE__ */ a.jsxs("div", { className: "topbar__workspace-toggle", role: "group", "aria-label": "Workspace mode", children: [
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__mode-button",
            "data-active": s === "pixel",
            onClick: () => l("pixel"),
            "aria-pressed": s === "pixel",
            children: "Pixel"
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__mode-button",
            "data-active": s === "tile",
            onClick: () => l("tile"),
            "aria-pressed": s === "tile",
            children: "Tile"
          }
        )
      ] }),
      i && /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: v,
          title: "Undo (Ctrl/Cmd+Z)",
          "aria-label": "Undo",
          disabled: m || !w,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.undo })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: g,
          title: "Redo (Ctrl/Cmd+Shift+Z)",
          "aria-label": "Redo",
          disabled: m || !M,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.redo })
        }
      ),
      /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: A,
          title: _ ? "Copy Tiles" : "Copy Selection (Active Layer)",
          "aria-label": "Copy Selection",
          disabled: _ ? !j : t === 0,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.copy })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Ko({ deep: !0 }),
          title: "Deep Copy Selection (Merged)",
          "aria-label": "Deep Copy Selection",
          disabled: _ || t === 0,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["copy-deep"] })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: L,
          title: _ ? "Cut Tiles" : "Cut Selection",
          "aria-label": "Cut Selection",
          disabled: _ ? !j : t === 0,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.cut })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: F,
          title: _ ? "Paste Tiles (Tile Stamp)" : "Paste (Stamp Tool)",
          "aria-label": "Paste",
          disabled: _ ? !b : !S,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.paste })
        }
      ),
      c !== !1 && /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            Qx();
          },
          title: "Export PNG…",
          "aria-label": "Export PNG",
          disabled: t === 0,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.export })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => we.getState().clear(),
          title: "Clear Selection",
          "aria-label": "Clear Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.clear })
        }
      ),
      /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      !_ && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "pen",
            onClick: () => n("pen"),
            title: "Pen (P)",
            "aria-label": "Pen",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.pen })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "spray",
            onClick: () => n("spray"),
            title: "Spray (S)",
            "aria-label": "Spray",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.spray })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "line",
            onClick: () => n("line"),
            title: "Line (L)",
            "aria-label": "Line",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.line })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "rectangle",
            onClick: () => n("rectangle"),
            title: "Rectangle (R)",
            "aria-label": "Rectangle",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.rectangle })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "oval",
            onClick: () => n("oval"),
            title: "Oval (O)",
            "aria-label": "Oval",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.oval })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "fill-bucket",
            onClick: () => n("fill-bucket"),
            title: "Fill (F)",
            "aria-label": "Fill",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["fill-bucket"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "text",
            onClick: () => n("text"),
            title: "Text (T)",
            "aria-label": "Text",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.text })
          }
        ),
        o !== !1 && /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "ai",
            onClick: () => n("ai"),
            title: "AI Prompt",
            "aria-label": "AI Prompt",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.ai })
          }
        ),
        /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "reference-handle",
            onClick: () => n("reference-handle"),
            title: "Reference Handle (H)",
            "aria-label": "Reference Handle",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["reference-handle"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "eyedropper",
            onClick: () => n("eyedropper"),
            title: "Eyedropper (E)",
            "aria-label": "Eyedropper",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.eyedropper })
          }
        ),
        i && /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-sampler",
            onClick: () => n("tile-sampler"),
            title: "Tile Sampler (Shift+S)",
            "aria-label": "Tile Sampler",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-sampler"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "stamp",
            onClick: () => n("stamp"),
            title: "Stamp (V)",
            "aria-label": "Stamp",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.stamp })
          }
        )
      ] }),
      !_ && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-rect"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-oval"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["magic-wand"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["texture-roll"] })
          }
        )
      ] }),
      _ && i && r !== !1 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-pen",
            onClick: () => n("tile-pen"),
            title: "Tile Pen (Shift+P)",
            "aria-label": "Tile Pen",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-pen"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-stamp",
            onClick: () => n("tile-stamp"),
            title: "Tile Stamp (Ctrl/Cmd+V)",
            "aria-label": "Tile Stamp",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-stamp"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-rectangle",
            onClick: () => n("tile-rectangle"),
            title: "Tile Rectangle (Shift+R)",
            "aria-label": "Tile Rectangle",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-rectangle"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-9slice",
            onClick: () => n("tile-9slice"),
            title: "Tile 9-Slice (Shift+N)",
            "aria-label": "Tile 9-Slice",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-9slice"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-export",
            onClick: () => n("tile-export"),
            title: "Tile Export (Shift+E)",
            "aria-label": "Tile Export",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["tile-export"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-rect"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-oval"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["magic-wand"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be["texture-roll"] })
          }
        )
      ] }),
      /* @__PURE__ */ a.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": O.open && O.kind === "layers",
          onClick: ge("layers"),
          title: "Layers",
          "aria-label": "Layers",
          "aria-expanded": O.open && O.kind === "layers",
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.layers })
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": O.open && O.kind === "overlays",
          onClick: ge("overlays"),
          title: "Overlays",
          "aria-label": "Overlays",
          "aria-expanded": O.open && O.kind === "overlays",
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.overlays })
        }
      ),
      !_ && /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => window.dispatchEvent(new Event("palette:open-add-swatch")),
          title: "Add Swatch Preset",
          "aria-label": "Add Swatch Preset",
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.swatch })
        }
      ),
      u !== !1 && /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            var N, X;
            (X = (N = B.appWindow()) == null ? void 0 : N.toggleFullscreen) == null || X.call(N);
          },
          title: "Toggle Full Screen (F11)",
          "aria-label": "Toggle Full Screen",
          children: /* @__PURE__ */ a.jsx("span", { className: "toolbar__tool-icon", children: be.fullscreen })
        }
      ),
      p && /* @__PURE__ */ a.jsx("div", { className: "topbar__options", children: p })
    ] }),
    O.open && /* @__PURE__ */ a.jsxs(
      "div",
      {
        ref: f,
        className: "bottom-dock__menu",
        role: "menu",
        "aria-label": O.kind === "layers" ? "Layers" : "Overlays",
        style: { top: ye.y, left: ye.x },
        children: [
          /* @__PURE__ */ a.jsx("div", { className: "bottom-dock__menu-title", children: O.kind === "layers" ? "Layers" : "Overlays" }),
          O.kind === "layers" ? /* @__PURE__ */ a.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ a.jsx(pl, { checked: P, label: "Reference", onChange: D }),
            /* @__PURE__ */ a.jsx(pl, { checked: z, label: "Pixels", onChange: H }),
            h !== !1 && /* @__PURE__ */ a.jsx(pl, { checked: Z, label: "Tiles", onChange: Q })
          ] }) : /* @__PURE__ */ a.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ a.jsx(
              pl,
              {
                checked: oe,
                label: "Pixel Grid",
                onChange: le,
                title: "Toggle pixel grid visibility"
              }
            ),
            h !== !1 && /* @__PURE__ */ a.jsx(
              pl,
              {
                checked: G,
                label: "Tile Grid",
                onChange: ae,
                title: "Toggle tile grid visibility"
              }
            ),
            /* @__PURE__ */ a.jsx(pl, { checked: ne, label: "Axes", onChange: xe, title: "Toggle axis visibility" })
          ] })
        ]
      }
    )
  ] });
}, ub = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: r,
  showAiTool: o,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: h,
  toolOptions: p
}) => /* @__PURE__ */ a.jsx(ab, { children: /* @__PURE__ */ a.jsx(
  cb,
  {
    activeTool: e,
    selectionCount: t,
    activateTool: n,
    workspaceMode: s,
    switchWorkspace: l,
    showAdvancedTools: i,
    showTileTools: r,
    showAiTool: o,
    showExportButton: c,
    showFullscreenButton: u,
    showTileLayerControls: h,
    toolOptions: p
  }
) }), db = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", hb = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, fb = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), i = URL.createObjectURL(l), r = new Image();
  r.onload = () => {
    URL.revokeObjectURL(i), n(r);
  }, r.onerror = () => {
    URL.revokeObjectURL(i), s(new Error("Failed to load reference image"));
  }, r.src = i;
}), pb = () => {
  const e = re.getState(), t = ke.getState(), n = ee.getState(), s = Be.getState(), l = Wt.getState(), i = V.getState(), r = Mt.getState(), o = /* @__PURE__ */ new Map(), c = l.items.filter((u) => u.assetFilename && u.assetData).map((u) => (o.has(u.assetFilename) || o.set(u.assetFilename, {
    filename: u.assetFilename,
    data: u.assetData,
    type: u.assetType
  }), {
    id: u.id,
    filename: u.assetFilename,
    type: u.assetType,
    width: u.width,
    height: u.height,
    x: u.x,
    y: u.y,
    scale: u.scale,
    rotation: u.rotation,
    flipX: u.flipX,
    flipY: u.flipY,
    opacity: u.opacity
  }));
  return {
    data: {
      palette: {
        colors: e.colors,
        selectedIndices: e.selectedIndices
      },
      camera: t.camera,
      history: {
        undoStack: s.undoStack,
        redoStack: s.redoStack
      },
      references: c.length > 0 ? c : void 0,
      tileSets: i.tileSets.length > 0 ? i.tileSets : void 0,
      tileMaps: i.tileMaps.length > 0 ? i.tileMaps : void 0,
      bookmarks: r.items.length > 0 ? { items: r.items, overlaysVisible: r.overlaysVisible } : void 0,
      pixelLayers: {
        layers: n.layers.map((u) => ({
          id: u.id,
          name: u.name,
          visible: u.visible
        })),
        activeLayerId: n.activeLayerId
      }
    },
    layers: n.exportLayerPayloads(),
    referenceFiles: o.size > 0 ? Array.from(o.values()) : void 0
  };
}, mb = async (e) => {
  var p, d, f, m, w;
  Bd(), Mt.getState().clear();
  const t = re.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), ke.getState().setCamera(e.data.camera);
  const s = ee.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (p = e.data.pixelLayers) == null ? void 0 : p.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), $.getState().clear(), Be.getState().setStacks(((d = e.data.history) == null ? void 0 : d.undoStack) ?? [], ((f = e.data.history) == null ? void 0 : f.redoStack) ?? []);
  const r = Wt.getState();
  r.clear();
  const o = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (o.length > 0 && c.length > 0) {
    const M = new Map(c.map((g) => [g.filename, g])), v = await Promise.all(
      o.map(async (g) => {
        const y = M.get(g.filename);
        if (!y)
          return null;
        const S = await fb(y.data, y.type || g.type), b = Number.isFinite(g.width) ? g.width : S.naturalWidth || S.width, _ = Number.isFinite(g.height) ? g.height : S.naturalHeight || S.height;
        return {
          id: g.id,
          image: S,
          assetFilename: y.filename,
          assetType: y.type || g.type,
          assetData: y.data,
          width: b,
          height: _,
          x: g.x ?? 0,
          y: g.y ?? 0,
          scale: g.scale ?? 1,
          rotation: g.rotation ?? 0,
          flipX: g.flipX ?? !1,
          flipY: g.flipY ?? !1,
          opacity: g.opacity ?? 0.7
        };
      })
    );
    for (const g of v)
      g && r.addReference(g);
    r.setSelected(null);
  }
  ve.getState().setDirty(!1), V.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []), Mt.getState().setAll(((m = e.data.bookmarks) == null ? void 0 : m.items) ?? [], ((w = e.data.bookmarks) == null ? void 0 : w.overlaysVisible) ?? !0);
}, Op = async (e) => {
  const t = B.project();
  if (!(t != null && t.save))
    return B.alert("Save is unavailable in this host."), null;
  const n = pb(), s = await t.save(n, e);
  if (s) {
    const l = ve.getState();
    l.setPath(s), l.setDirty(!1);
  }
  return s;
}, gb = async (e) => {
  Bd();
  const t = B.project();
  if (!(t != null && t.load))
    return B.alert("Load is unavailable in this host."), null;
  const n = await t.load(e);
  if (!n)
    return null;
  await mb(n);
  const s = ve.getState();
  return s.setPath(n.path), s.setDirty(!1), n.path;
}, Zx = () => {
  Bd(), Mt.getState().clear(), re.getState().reset(), ke.getState().resetCamera(), ee.getState().clear(), $.getState().clear(), Be.getState().clear(), Wt.getState().clear(), V.getState().clear();
  const o = ve.getState();
  o.setPath(null), o.setDirty(!1);
}, xb = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, yb = async (e) => {
  const t = B.project();
  return t != null && t.read ? t.read(e) : (B.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, vb = (e, t) => {
  var p;
  const n = ((p = e.data.palette) == null ? void 0 : p.colors) ?? [], s = re.getState();
  if (!xb(s.colors, n)) {
    B.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = ee.getState(), i = l.activeLayerId, r = Math.trunc(t.offsetX), o = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const d of u)
    if (d.visible !== !1)
      for (const f of d.blocks) {
        const m = f.col * Y, w = f.row * Y, M = f.data;
        for (let v = 0; v < M.length; v += 1) {
          const g = M[v] ?? 0;
          if (g === 0)
            continue;
          const y = v % Y, S = Math.floor(v / Y), b = m + y, _ = w + S;
          c.set(`${b}:${_}`, g);
        }
      }
  const h = [];
  for (const [d, f] of c.entries()) {
    const [m, w] = d.split(":"), M = Number(m), v = Number(w), g = M + r, y = v + o, S = l.getPixelInLayer(i, g, y);
    S !== f && h.push({ x: g, y, prev: S, next: f });
  }
  Ji(h, { label: "Merge Project" });
}, kn = 8, Pi = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, wb = (e) => wt(e), Sb = (e) => e.map((t) => wb(t) ?? { r: 0, g: 0, b: 0 }), zp = (e, t, n) => {
  if (n <= 0)
    return [];
  const s = Array.from(t), l = s.length ? s.reduce(
    (r, o) => {
      const c = e[o];
      return r.r += c.r, r.g += c.g, r.b += c.b, r;
    },
    { r: 0, g: 0, b: 0 }
  ) : { r: 127, g: 127, b: 127 };
  s.length && (l.r /= s.length, l.g /= s.length, l.b /= s.length);
  const i = [];
  for (let r = 0; r < e.length; r += 1)
    t.has(r) || i.push({ idx: r, distance: Pi(e[r], l) });
  return i.sort((r, o) => r.distance - o.distance), i.slice(0, n).map((r) => r.idx);
}, qx = (e, t) => {
  var p;
  const n = Sb(t), s = /* @__PURE__ */ new Map();
  for (const d of e.pixels)
    s.set(d.paletteIndex, (s.get(d.paletteIndex) ?? 0) + 1);
  const l = Array.from(s.keys()).filter((d) => d !== 0);
  if (l.length === 0)
    return {
      paletteIndices: [0, 1, 2, 3].filter((d) => d < t.length),
      paletteRgb: n
    };
  let i = l;
  if (l.length > 3) {
    const d = l.map((M) => ({
      idx: M,
      weight: s.get(M) ?? 1,
      color: n[M]
    })), f = [], m = () => {
      let M = -1, v = d[0].idx;
      for (const g of d) {
        const y = g.weight;
        y > M && (M = y, v = g.idx);
      }
      return v;
    };
    for (f.push(m()); f.length < 3; ) {
      let M = d[0].idx, v = -1;
      for (const g of d) {
        if (f.includes(g.idx))
          continue;
        let y = 1 / 0;
        for (const b of f)
          y = Math.min(
            y,
            Pi(g.color, n[b])
          );
        const S = y * g.weight;
        S > v && (v = S, M = g.idx);
      }
      f.push(M);
    }
    let w = f;
    for (let M = 0; M < 6; M += 1) {
      const v = /* @__PURE__ */ new Map();
      for (const y of w)
        v.set(y, []);
      for (const y of d) {
        let S = w[0], b = 1 / 0;
        for (const _ of w) {
          const C = Pi(y.color, n[_]);
          C < b && (b = C, S = _);
        }
        (p = v.get(S)) == null || p.push(y.idx);
      }
      const g = [];
      for (const [y, S] of v.entries()) {
        if (S.length === 0) {
          g.push(y);
          continue;
        }
        let b = y, _ = 1 / 0;
        for (const C of S) {
          let j = 0;
          for (const A of S) {
            const L = s.get(A) ?? 1;
            j += Pi(n[C], n[A]) * L;
          }
          j < _ && (_ = j, b = C);
        }
        g.push(b);
      }
      for (w = Array.from(new Set(g)); w.length < 3; ) {
        const y = zp(
          n,
          /* @__PURE__ */ new Set([0, ...w]),
          1
        );
        if (y.length === 0)
          break;
        w.push(y[0]);
      }
    }
    i = w;
  }
  const r = /* @__PURE__ */ new Set([0, ...i]), o = zp(n, r, 4 - r.size);
  for (const d of o)
    r.add(d);
  const c = Array.from(r), u = c.filter((d) => d === 0), h = c.filter((d) => d !== 0).sort((d, f) => {
    const m = (w) => 0.2126 * w.r + 0.7152 * w.g + 0.0722 * w.b;
    return m(n[d]) - m(n[f]);
  });
  return {
    paletteIndices: [...u, ...h].slice(0, 4),
    paletteRgb: n
  };
}, Jx = (e, t, n, s) => {
  const l = e.maxX - e.minX + 1, i = e.maxY - e.minY + 1, r = new Float32Array(n * s * 3), o = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let c = 0; c < n * s; c += 1) {
    const u = c * 3;
    r[u] = o.r, r[u + 1] = o.g, r[u + 2] = o.b;
  }
  for (const c of e.pixels) {
    const u = c.x - e.minX, h = c.y - e.minY;
    if (u < 0 || h < 0 || u >= l || h >= i)
      continue;
    const p = t[c.paletteIndex] ?? o, d = (h * n + u) * 3;
    r[d] = p.r, r[d + 1] = p.g, r[d + 2] = p.b;
  }
  return { data: r, width: l, height: i };
}, ey = (e, t, n, s) => {
  const l = new Uint8Array(t * n), i = new Float32Array(e), r = (c, u, h) => {
    let p = 0, d = 1 / 0;
    for (let f = 0; f < s.length; f += 1) {
      const m = Pi({ r: c, g: u, b: h }, s[f]);
      m < d && (d = m, p = f);
    }
    return p;
  }, o = (c, u, h, p, d, f) => {
    if (c < 0 || u < 0 || c >= t || u >= n)
      return;
    const m = (u * t + c) * 3;
    i[m] += h * f, i[m + 1] += p * f, i[m + 2] += d * f;
  };
  for (let c = 0; c < n; c += 1)
    for (let u = 0; u < t; u += 1) {
      const h = (c * t + u) * 3, p = i[h], d = i[h + 1], f = i[h + 2], m = r(p, d, f);
      l[c * t + u] = m;
      const w = s[m], M = p - w.r, v = d - w.g, g = f - w.b;
      o(u + 1, c, M, v, g, 7 / 16), o(u - 1, c + 1, M, v, g, 3 / 16), o(u, c + 1, M, v, g, 5 / 16), o(u + 1, c + 1, M, v, g, 1 / 16);
    }
  return l;
}, Go = (e) => Math.ceil(e / kn) * kn, ty = (e, t, n) => {
  const s = t / kn, l = n / kn, i = s * l, r = new Uint8Array(i * kn * 2);
  let o = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const h = u * kn, p = c * kn;
      for (let d = 0; d < kn; d += 1) {
        let f = 0, m = 0;
        for (let w = 0; w < kn; w += 1) {
          const M = (p + d) * t + (h + w), v = e[M] & 3, g = 7 - w;
          f |= (v & 1) << g, m |= (v >> 1 & 1) << g;
        }
        r[o] = f, r[o + 1] = m, o += 2;
      }
    }
  return { data: r, tileCount: i };
}, fi = (e, t, n) => {
  e.setUint16(t, n, !0);
}, Mb = (e, t, n) => {
  e.setUint32(t, n, !0);
}, bb = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), i = Math.min(l.length, s - 1);
  for (let r = 0; r < i; r += 1)
    e.setUint8(t + r, l[r]);
  e.setUint8(t + i, 0);
  for (let r = i + 1; r < s; r += 1)
    e.setUint8(t + r, 0);
}, _b = (e, t, n) => {
  const l = 40 + e.length, i = 12 + l, r = new ArrayBuffer(i), o = new DataView(r), c = new Uint8Array(r);
  c.set([71, 66, 79, 48], 0), fi(o, 4, 2), fi(o, 6, 1), Mb(o, 8, l);
  let u = 12;
  bb(o, u, "Pixel Splash Studio", 30), u += 30, fi(o, u, kn), u += 2, fi(o, u, kn), u += 2, fi(o, u, t), u += 2;
  for (let h = 0; h < 4; h += 1)
    c[u + h] = n[h] ?? h;
  return u += 4, c.set(e, u), new Uint8Array(r);
}, Tb = async () => {
  const e = B.project();
  if (!(e != null && e.exportGbr))
    return B.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const t = js();
  if (!t)
    return B.alert("Select a region to export."), null;
  const n = re.getState(), { paletteIndices: s, paletteRgb: l } = qx(t, n.colors);
  if (s.length < 4)
    return B.alert("Palette needs at least 4 colors to export."), null;
  const i = Go(t.maxX - t.minX + 1), r = Go(t.maxY - t.minY + 1), o = s.map((m) => l[m]), { data: c } = Jx(t, l, i, r), u = ey(c, i, r, o), { data: h, tileCount: p } = ty(u, i, r), d = _b(h, p, [0, 1, 2, 3]), f = `pixel-splash-selection-${i}x${r}.gbr`;
  return e.exportGbr(d, f);
}, Cb = async () => {
  const e = B.project();
  if (!(e != null && e.exportChr))
    return B.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const t = js();
  if (!t)
    return B.alert("Select a region to export."), null;
  const n = re.getState(), { paletteIndices: s, paletteRgb: l } = qx(t, n.colors);
  if (s.length < 4)
    return B.alert("Palette needs at least 4 colors to export."), null;
  const i = Go(t.maxX - t.minX + 1), r = Go(t.maxY - t.minY + 1), o = s.map((d) => l[d]), { data: c } = Jx(t, l, i, r), u = ey(c, i, r, o), { data: h } = ty(u, i, r), p = `pixel-splash-selection-${i}x${r}.chr`;
  return e.exportChr(h, p);
}, ny = () => {
  const e = B.project();
  return e != null && e.exportImage ? e : (B.alert("Image export is unavailable. Restart the app to load the latest export support."), null);
}, Xd = async (e) => {
  const t = js();
  if (!t)
    return B.alert("Select a region to export."), null;
  const n = ny();
  if (!n)
    return null;
  const { data: s, width: l, height: i } = Yd(t), r = new Uint8Array(s), o = `pixel-splash-selection-${l}x${i}.${e}`;
  return n.exportImage(
    e,
    { kind: "rgba", width: l, height: i, data: r },
    o
  );
}, kb = () => Xd("bmp"), jb = () => Xd("gif"), Pb = () => Xd("tga"), Nb = async () => {
  const e = js();
  if (!e)
    return B.alert("Select a region to export."), null;
  const t = ny();
  if (!t)
    return null;
  let n = 0;
  for (const u of e.pixels)
    u.paletteIndex > n && (n = u.paletteIndex);
  if (n > 255)
    return B.alert("PCX export supports palette indices up to 255."), null;
  const { data: s, width: l, height: i } = tb(e), r = re.getState().colors, o = new Uint8Array(256 * 3);
  for (let u = 0; u < 256; u += 1) {
    const h = r[u];
    if (!h)
      continue;
    const p = wt(h);
    if (!p)
      continue;
    const d = u * 3;
    o[d] = p.r, o[d + 1] = p.g, o[d + 2] = p.b;
  }
  const c = `pixel-splash-selection-${l}x${i}.pcx`;
  return t.exportImage(
    "pcx",
    { kind: "indexed", width: l, height: i, data: s, palette: o },
    c
  );
}, xn = 320, Vn = 200, Ib = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Eb = (e) => e.map((t) => wt(t) ?? { r: 0, g: 0, b: 0 }), Rb = (e, t, n) => {
  const i = Array.from(e.entries()).sort((r, o) => o[1] - r[1]).map(([r]) => r).filter((r) => r <= n).slice(0, t);
  if (i.length >= t)
    return i;
  for (let r = 0; r <= n && i.length < t; r += 1)
    i.includes(r) || i.push(r);
  return i;
}, Ab = (e, t) => {
  if (!e)
    return null;
  const n = new Float32Array(xn * Vn * 3), s = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let l = 0; l < xn * Vn; l += 1) {
    const i = l * 3;
    n[i] = s.r, n[i + 1] = s.g, n[i + 2] = s.b;
  }
  for (const l of e.pixels) {
    const i = l.x - e.minX, r = l.y - e.minY;
    if (i < 0 || r < 0 || i >= xn || r >= Vn)
      continue;
    const o = t[l.paletteIndex] ?? s, c = (r * xn + i) * 3;
    n[c] = o.r, n[c + 1] = o.g, n[c + 2] = o.b;
  }
  return n;
}, Lb = (e, t) => {
  const n = new Uint8Array(xn * Vn);
  for (let s = 0; s < Vn; s += 1)
    for (let l = 0; l < xn; l += 1) {
      const i = (s * xn + l) * 3, r = e[i], o = e[i + 1], c = e[i + 2];
      let u = 0, h = 1 / 0;
      for (let p = 0; p < t.length; p += 1) {
        const d = Ib({ r, g: o, b: c }, t[p]);
        d < h && (h = d, u = p);
      }
      n[s * xn + l] = u;
    }
  return n;
}, Bb = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, Db = (e) => {
  const n = new Uint8Array(80 * Vn);
  for (let s = 0; s < Vn; s += 1) {
    const l = (s & 1) * 8192, i = (s >> 1) * 80;
    for (let r = 0; r < xn; r += 4) {
      const o = s * xn + r, c = e[o] & 3, u = e[o + 1] & 3, h = e[o + 2] & 3, p = e[o + 3] & 3, d = c << 6 | u << 4 | h << 2 | p, f = r >> 2;
      n[l + i + f] = d;
    }
  }
  return n;
}, Yb = (e) => {
  const n = 40 * Vn, s = new Uint8Array(n * 4);
  for (let l = 0; l < Vn; l += 1)
    for (let i = 0; i < xn; i += 1) {
      const r = e[l * xn + i] & 15, o = l * 40 + (i >> 3), c = 7 - (i & 7);
      for (let u = 0; u < 4; u += 1) {
        const h = u * n;
        r & 1 << u && (s[h + o] |= 1 << c);
      }
    }
  return s;
}, Xb = (e) => e, Fd = async (e, t, n, s) => {
  const l = B.project();
  if (!(l != null && l.exportBsave))
    return B.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const i = js();
  if (!i)
    return B.alert("Select a region to export."), null;
  const r = re.getState().colors, o = Eb(r), c = /* @__PURE__ */ new Map();
  for (const v of i.pixels)
    c.set(v.paletteIndex, (c.get(v.paletteIndex) ?? 0) + 1);
  const u = o.length - 1, p = (t >= o.length ? o.map((v, g) => g) : Rb(c, t, u)).map((v) => o[v]), d = Ab(i, o);
  if (!d)
    return null;
  const f = Lb(d, p);
  let m;
  e === "cga" ? m = Db(f) : e === "ega" ? m = Yb(f) : m = Xb(f);
  const w = Bb(n, 0, m.length), M = new Uint8Array(w.length + m.length);
  return M.set(w, 0), M.set(m, w.length), l.exportBsave(M, s);
}, Fb = () => Fd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), Ob = () => Fd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), zb = () => Fd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), Hb = (e) => e.trim().toLowerCase(), Wb = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, i) => {
    const r = Hb(l), o = t.get(r);
    if (o !== void 0) {
      n[i] = o;
      return;
    }
    const c = s.length;
    t.set(r, c), n[i] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, Ub = () => {
  const e = re.getState(), t = e.colors, { mapped: n, nextColors: s } = Wb(t);
  if (s.length === t.length)
    return !1;
  const l = (d) => Number.isFinite(d) && d >= 0 && d < n.length ? n[d] : 0, i = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(i);
  const r = ee.getState(), o = r.exportLayerPayloads().map((d) => ({
    ...d,
    blocks: d.blocks.map(({ row: f, col: m, data: w }) => {
      const M = new Uint8Array(w.length);
      for (let v = 0; v < w.length; v += 1)
        M[v] = l(w[v]);
      return { row: f, col: m, data: M };
    })
  }));
  r.loadLayerPayloads(o, r.activeLayerId);
  const c = $.getState();
  for (const [d, f] of c.pixels.entries()) {
    const m = l(f.paletteIndex);
    m !== f.paletteIndex && c.pixels.set(d, { ...f, paletteIndex: m });
  }
  const u = rt.getState();
  if (u.pixels.length > 0) {
    const d = u.pixels.map((m) => ({
      ...m,
      paletteIndex: l(m.paletteIndex)
    })), f = u.origin ?? { x: 0, y: 0 };
    rt.getState().setBuffer({
      pixels: d,
      origin: f,
      width: u.width,
      height: u.height
    });
  }
  const h = Be.getState(), p = (d) => ({
    layerId: d.layerId,
    changes: d.changes.map((f) => ({
      ...f,
      prev: l(f.prev),
      next: l(f.next)
    }))
  });
  return h.setStacks(
    h.undoStack.map(p),
    h.redoStack.map(p)
  ), ve.getState().setDirty(!0), !0;
}, $b = (e, t, n) => e << 16 | t << 8 | n, Vb = (e) => {
  const t = e.palette;
  let n = t ? t.map((r) => $l({ r: r[0], g: r[1], b: r[2] })) : [];
  if (n.length === 0) {
    let r = 0;
    for (let o = 0; o < e.pixels.length; o += 1)
      e.pixels[o] > r && (r = e.pixels[o]);
    n = Array.from(
      { length: r + 1 },
      (o, c) => $l({ r: c, g: c, b: c })
    );
  }
  let s = null;
  if (typeof e.transparentIndex == "number" && e.transparentIndex > 0 && e.transparentIndex < n.length) {
    s = e.transparentIndex;
    const r = n[0];
    n[0] = n[s], n[s] = r;
  }
  const l = [], i = e.width;
  for (let r = 0; r < e.pixels.length; r += 1) {
    const o = e.pixels[r];
    let c = o;
    if (s !== null ? o === s ? c = 0 : o === 0 && (c = s) : typeof e.transparentIndex == "number" && o === e.transparentIndex && (c = 0), c === 0)
      continue;
    const u = r % i, h = Math.floor(r / i);
    l.push({ x: u, y: h, paletteIndex: c });
  }
  return { paletteColors: n, pixels: l };
}, Kb = (e) => {
  const t = [], n = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] !== 0)
      continue;
    const o = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2];
    t[0] = $l({ r: o, g: c, b: u });
    break;
  }
  t[0] || (t[0] = "#000000");
  const s = [], l = e.width;
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] === 0)
      continue;
    const o = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2], h = $b(o, c, u);
    let p = n.get(h);
    p === void 0 && (p = t.length, t.push($l({ r: o, g: c, b: u })), n.set(h, p));
    const d = i / 4, f = d % l, m = Math.floor(d / l);
    s.push({ x: f, y: m, paletteIndex: p });
  }
  return { paletteColors: t, pixels: s };
}, Gb = (e) => {
  const t = re.getState(), n = ee.getState(), s = we.getState(), l = rt.getState();
  if (Zx(), e.colorType === "indexed") {
    const i = Vb(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  } else {
    const i = Kb(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  }
  s.clear(), l.clear(), ve.getState().setDirty(!0);
}, Qb = (e) => {
  if (e.ctrlKey || e.metaKey)
    return null;
  const n = e.key.toLowerCase();
  if (e.altKey)
    return n === "o" ? { type: "tool", tool: "selection-oval" } : n === "r" ? { type: "tool", tool: "selection-rect" } : n === "p" ? { type: "tool", tool: "selection-lasso" } : null;
  if (e.shiftKey) {
    if (n === "s")
      return { type: "tool", tool: "tile-sampler" };
    if (n === "p")
      return { type: "tool", tool: "tile-pen" };
    if (n === "r")
      return { type: "tool", tool: "tile-rectangle" };
    if (n === "n")
      return { type: "tool", tool: "tile-9slice" };
    if (n === "e")
      return { type: "tool", tool: "tile-export" };
    if (n === "v")
      return { type: "tool", tool: "tile-stamp" };
  }
  return n.length === 1 && n >= "0" && n <= "9" ? { type: "palette-primary", index: Number(n) } : n === "p" ? { type: "tool", tool: "pen" } : n === "r" ? { type: "tool", tool: "rectangle" } : n === "o" ? { type: "tool", tool: "oval" } : n === "s" ? { type: "tool", tool: "spray" } : n === "l" ? { type: "tool", tool: "line" } : n === "f" ? { type: "tool", tool: "fill-bucket" } : n === "t" ? { type: "tool", tool: "text" } : n === "e" ? { type: "tool", tool: "eyedropper" } : n === "w" ? { type: "tool", tool: "magic-wand" } : n === "v" ? { type: "tool", tool: "stamp" } : n === "h" ? { type: "tool", tool: "reference-handle" } : n === "q" ? { type: "tool", tool: "texture-roll" } : null;
}, Ac = (e) => e.toString(16).padStart(2, "0"), Zb = (e) => `#${Ac(e.r)}${Ac(e.g)}${Ac(e.b)}`, Hp = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, qb = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(yx)) === "true";
  } catch {
    return !1;
  }
}, sy = (e) => {
  const t = ya(e), n = Math.floor(t.minX / k), s = Math.floor(t.minY / k), l = Math.ceil(t.maxX / k), i = Math.ceil(t.maxY / k), r = Math.max(0, l - n), o = Math.max(0, i - s);
  if (r === 0 || o === 0)
    return null;
  const c = r * o;
  if ((r > xc || o > xc || c > Jf) && !qb()) {
    const g = `Reference trace is too large (${r}x${o}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${yx}"]="true" to override.`;
    return typeof window < "u" && B.alert(g), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
      width: r,
      height: o,
      pixelCount: c,
      maxDimension: xc,
      maxPixels: Jf
    }), null;
  }
  const h = document.createElement("canvas");
  h.width = r, h.height = o;
  const p = h.getContext("2d", { willReadFrequently: !0 });
  if (!p)
    return null;
  p.imageSmoothingEnabled = !1;
  const d = qn(e), f = d.centerX / k, m = d.centerY / k, w = d.baseWidth / k, M = d.baseHeight / k;
  p.save(), p.translate(f - n, m - s), p.rotate(d.rotationRad), p.scale(d.scale * d.flipX, d.scale * d.flipY), p.drawImage(
    e.image,
    -w / 2,
    -M / 2,
    w,
    M
  ), p.restore();
  const v = p.getImageData(0, 0, r, o);
  return {
    width: r,
    height: o,
    offsetX: n,
    offsetY: s,
    data: v.data
  };
}, Jb = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const i = wt(l);
    i && n.push({ paletteIndex: s, rgb: i });
  }
  return n;
}, e_ = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, Ww);
  for (let i = 0; i < e.length; i += 4) {
    if (e[i + 3] < xx)
      continue;
    const r = Math.min(255, Math.round(e[i] / s) * s), o = Math.min(255, Math.round(e[i + 1] / s) * s), c = Math.min(255, Math.round(e[i + 2] / s) * s), u = `${r},${o},${c}`, h = n.get(u);
    h ? h.count += 1 : n.set(u, { rgb: { r, g: o, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((i, r) => r.count - i.count).slice(0, t).map((i) => i.rgb);
}, t_ = (e) => {
  const t = re.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((r, o) => {
    s.set(r.toLowerCase(), o);
  });
  const l = [], i = [];
  for (const r of e) {
    const o = Zb(r), c = o.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(o), s.set(c, u)), i.push({ paletteIndex: u, rgb: r });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), i;
}, ly = (e, t) => {
  if (t.length === 0)
    return;
  const n = ee.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.height; i += 1)
    for (let r = 0; r < e.width; r += 1) {
      const o = (i * e.width + r) * 4;
      if (e.data[o + 3] < xx)
        continue;
      const u = e.data[o], h = e.data[o + 1], p = e.data[o + 2], d = `${u},${h},${p}`;
      let f = l.get(d);
      if (f === void 0) {
        const v = { r: u, g: h, b: p };
        let g = t[0], y = Hp(v, g.rgb);
        for (let S = 1; S < t.length; S += 1) {
          const b = t[S], _ = Hp(v, b.rgb);
          _ < y && (y = _, g = b);
        }
        f = g.paletteIndex, l.set(d, f);
      }
      const m = e.offsetX + r, w = e.offsetY + i, M = n.getPixel(m, w);
      M !== f && s.push({ x: m, y: w, prev: M, next: f });
    }
  s.length !== 0 && Ji(s, { label: "Reference Trace" });
}, n_ = (e, t) => {
  const n = re.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((o) => Math.round(o)).filter((o) => Number.isFinite(o)).filter((o) => o >= 0 && o < n.length).sort((o, c) => o - c);
  if (l.length === 0)
    return;
  const i = Jb(n, l);
  if (i.length === 0)
    return;
  const r = sy(e);
  r && ly(r, i);
}, s_ = (e, t) => {
  const n = sy(e);
  if (!n)
    return;
  const s = Math.max(
    Pu,
    Math.min(t, Nu)
  ), l = e_(n.data, s);
  if (l.length === 0)
    return;
  const i = t_(l);
  ly(n, i);
}, yi = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), Ys = (e, t, n) => {
  const s = yi(e.x, 0, Math.max(0, t - 1)), l = yi(e.y, 0, Math.max(0, n - 1)), i = yi(e.width, 1, Math.max(1, t - s)), r = yi(e.height, 1, Math.max(1, n - l));
  return { x: s, y: l, width: i, height: r };
}, Lc = (e, t, n, s) => {
  const l = Ys(s, t, n), i = new Uint8Array(l.width * l.height);
  for (let r = 0; r < l.height; r += 1) {
    const c = (l.y + r) * t + l.x, u = r * l.width;
    i.set(e.subarray(c, c + l.width), u);
  }
  return { pixels: i, width: l.width, height: l.height };
}, Wp = (e, t, n, s) => {
  const l = yi(s, 1, 8);
  if (l === 1)
    return { pixels: e, width: t, height: n };
  const i = t * l, r = n * l, o = new Uint8Array(i * r);
  for (let c = 0; c < r; c += 1) {
    const u = Math.floor(c / l);
    for (let h = 0; h < i; h += 1) {
      const p = Math.floor(h / l);
      o[c * i + h] = e[u * t + p] ?? 0;
    }
  }
  return { pixels: o, width: i, height: r };
}, l_ = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Up = (e, t) => {
  const n = t.map((i) => wt(i) ?? { r: 0, g: 0, b: 0 }), s = /* @__PURE__ */ new Map();
  s.set(0, 0);
  const l = n.length > 1 ? Array.from({ length: n.length - 1 }, (i, r) => r + 1) : [0];
  for (let i = 1; i < e.length; i += 1) {
    const r = e[i];
    if (!r)
      continue;
    const o = { r: r[0], g: r[1], b: r[2] };
    let c = l[0] ?? 0, u = Number.POSITIVE_INFINITY;
    for (const h of l) {
      const p = l_(o, n[h] ?? n[0]);
      p < u && (u = p, c = h);
    }
    s.set(i, c);
  }
  return s;
}, $p = (e, t, n) => {
  const s = t.slice(), l = /* @__PURE__ */ new Map();
  l.set(0, 0);
  const i = /* @__PURE__ */ new Set([0]), r = (o, c) => {
    for (let h = 1; h < s.length; h += 1)
      if (!(n.has(h) || i.has(h))) {
        i.add(h), s[h] = c, l.set(o, h);
        return;
      }
    const u = s.length;
    s.push(c), i.add(u), l.set(o, u);
  };
  for (let o = 1; o < e.length; o += 1)
    r(o, e[o] ?? "#000000");
  return { map: l, palette: s };
}, Jr = (e, t) => {
  const n = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s += 1) {
    const l = e[s] ?? 0;
    n[s] = t.get(l) ?? 0;
  }
  return n;
}, Vp = (e, t) => {
  if (e && e.length > 0)
    return e.map((s) => $l({ r: s[0], g: s[1], b: s[2] }));
  if (!t)
    return ["#000000"];
  let n = 0;
  for (let s = 0; s < t.length; s += 1) {
    const l = t[s] ?? 0;
    l > n && (n = l);
  }
  return Array.from({ length: n + 1 }, (s, l) => $l({ r: l, g: l, b: l }));
}, i_ = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), i = s.map((r) => wt(r) ?? { r: 0, g: 0, b: 0 });
  for (let r = 0; r < e.length; r += 1) {
    const o = e[r] ?? 0, c = i[o] ?? i[0], u = r * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = o === 0 ? 0 : 255;
  }
  return l;
}, zn = (e, t, n) => Math.min(n, Math.max(t, e)), gl = (e) => e === "tile-pen" || e === "tile-stamp" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", r_ = (e) => e === "tile-sampler" || gl(e), o_ = (e) => e === "selection-rect" || e === "selection-oval" || e === "selection-lasso" || e === "magic-wand" || e === "texture-roll", Bl = 0, Qo = 100, Od = Math.log10(Zs), a_ = Math.log10(Ul), Xu = a_ - Od, Kp = 72, Gp = 360, c_ = 32, u_ = (e) => {
  const t = zn(e, Zs, Ul), n = Xu === 0 ? 0 : (Math.log10(t) - Od) / Xu;
  return Math.round(
    Bl + n * (Qo - Bl)
  );
}, d_ = (e) => {
  const t = (zn(e, Bl, Qo) - Bl) / (Qo - Bl), n = Od + t * Xu;
  return Math.pow(10, n);
}, h_ = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, on = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), Qp = (e) => {
  if (e < 1024)
    return `${e}B`;
  const t = e / 1024;
  if (t < 1024)
    return `${t.toFixed(t < 10 ? 1 : 0)}KB`;
  const n = t / 1024;
  return n < 1024 ? `${n.toFixed(n < 10 ? 1 : 0)}MB` : `${(n / 1024).toFixed(1)}GB`;
}, Zp = (e) => e.reduce((t, n) => t + n.block.byteLength, 0), qp = (e) => {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" ? !0 : e.isContentEditable;
}, f_ = () => {
  const t = ee.getState().layers.reduce(
    (M, v) => M + Zp(v.store.getBlocks()),
    0
  ), n = Zp(we.getState().store.getBlocks()), s = $.getState().pixels.size * ep, l = rt.getState().pixels.length * ep, i = Wt.getState().items.reduce((M, v) => M + v.width * v.height * 4, 0), r = Be.getState();
  let o = 0;
  for (const M of r.undoStack)
    o += M.changes.length;
  for (const M of r.redoStack)
    o += M.changes.length;
  const c = o * $w, h = re.getState().colors.reduce((M, v) => M + v.length * 2, 0) + Ad * 2, p = {
    tool: on(It.getState()),
    brush: on(gn.getState()),
    spray: on(Zt.getState()),
    rectangle: on(zo.getState()),
    oval: on(Ho.getState()),
    selection: on(Vl.getState()),
    fill: on(bt.getState()),
    stamp: on(Ze.getState()),
    viewport: on(ke.getState()),
    layers: on(Le.getState()),
    project: on(ve.getState()),
    referenceHandle: on($o.getState())
  }, d = h_(p), f = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: i },
    { label: "hist", bytes: c },
    { label: "pal", bytes: h },
    { label: "ui", bytes: d }
  ], m = f.reduce((M, v) => M + v.bytes, 0), w = f.filter((M) => M.bytes > 0).map((M) => `${M.label} ${Qp(M.bytes)}`);
  return `Mem ${Qp(m)}${w.length ? ` • ${w.join(" • ")}` : ""}`;
}, p_ = () => {
  const e = hb(), [t, n] = T.useState(() => B.capabilities()), s = Be((x) => x.undo), l = Be((x) => x.redo), i = we((x) => x.selectedCount), r = ve((x) => x.path), o = ve((x) => x.dirty), [c, u] = T.useState(!1), [h, p] = T.useState(!1), [d, f] = T.useState(!1), [m, w] = T.useState(!1), [M, v] = T.useState(!0), [g, y] = T.useState(!1), [S, b] = T.useState("pen"), [_, C] = T.useState(""), [j, A] = T.useState("monospace"), [L, F] = T.useState(16), [P, z] = T.useState(!1), [Z, oe] = T.useState("pen"), [G, ne] = T.useState(""), [D, H] = T.useState(!1), [Q, le] = T.useState(null), [ae, xe] = T.useState(null), [O, ie] = T.useState(0), [ye, W] = T.useState(0), [ge, N] = T.useState(!1), [X, se] = T.useState(null), [ce, Ye] = T.useState([]), [Se, Ue] = T.useState(2), [Oe, ot] = T.useState("nearest"), [Xe, me] = T.useState(0), ht = 32, Ie = 2, [Rt, Kt] = T.useState(!0), [gt, Sn] = T.useState(!1), [En, Mn] = T.useState(""), [sn, er] = T.useState(96), [Ps, es] = T.useState(220), Rn = Du((x) => x.isRecording), Ee = Du((x) => x.setIsRecording), de = It((x) => x.activeTool), Re = It((x) => x.setActiveTool), ft = Js((x) => x.mode), Ct = Js((x) => x.setMode), I = Le((x) => x.showReferenceLayer), R = Le((x) => x.showPixelLayer), q = Le((x) => x.showTileLayer), he = Le((x) => x.showPixelGrid), je = Le((x) => x.showTileGrid), At = Le((x) => x.showAxes), ln = Le((x) => x.setShowReferenceLayer), Ns = Le((x) => x.setShowPixelLayer), Is = Le((x) => x.setShowTileLayer), Xn = Le((x) => x.setShowPixelGrid), nl = Le((x) => x.setShowTileGrid), sl = Le((x) => x.setShowAxes), Fn = V((x) => x.tileSets), tr = V((x) => x.tileMaps), nr = V((x) => x.activeTileSetId), ry = V((x) => x.activeTileMapId), oy = V((x) => x.selectedTileIndex), zd = V((x) => x.selectedTileIndices), Zl = V((x) => x.tilePage), ay = V((x) => x.tilePageCount), sr = V((x) => x.setTilePage), Es = V((x) => x.tilePickerZoom), Hd = V((x) => x.setTilePickerZoom), Wd = V((x) => x.tilePlacementMode), Ud = V((x) => x.setTilePlacementMode), $d = V((x) => x.tilePenSnapToCluster), Vd = V((x) => x.setTilePenSnapToCluster), Kd = V((x) => x.setActiveTileSet), Gd = V((x) => x.setTileSetLayout), Qd = V((x) => x.addTileSet), Zd = V((x) => x.duplicateTileSet), qd = V((x) => x.renameTileSet), Jd = V((x) => x.deleteTileSet), eh = V((x) => x.deleteTilesFromSet), cy = gn((x) => x.size), th = gn((x) => x.shape), nh = Zt((x) => x.radius), sh = Zt((x) => x.density), lh = Zt((x) => x.falloff), ih = zo((x) => x.mode), rh = zo((x) => x.setMode), oh = Ho((x) => x.mode), ah = Ho((x) => x.setMode), lr = Vl((x) => x.snap), ir = Vl((x) => x.setSnap), ch = bt((x) => x.mode), uh = bt((x) => x.setMode), rr = bt((x) => x.gradientDirection), or = bt((x) => x.setGradientDirection), ar = bt((x) => x.gradientDither), cr = bt((x) => x.setGradientDither), va = re((x) => x.selectedIndices), ur = va.length, uy = re((x) => x.getActiveIndex()), dr = Ze((x) => x.mode), ll = Ze((x) => x.snap), dy = Ze((x) => x.rotation), hy = Ze((x) => x.scale), dh = Ze((x) => x.flipX), hh = Ze((x) => x.flipY), hr = Ze((x) => x.drag), wa = Ze((x) => x.pasteDuplicateColors), fh = V((x) => x.tileDebugOverlay), Sa = V((x) => x.setTileDebugOverlay), fy = V((x) => x.nineSlice), py = V((x) => x.selectedTileCols), my = V((x) => x.selectedTileRows), Ma = Wt((x) => x.removeReference), fr = Te.useRef(!1), il = T.useRef(null), ph = T.useRef(null), ql = T.useRef(null), Ae = 8, rl = X ? Math.floor(X.width / Ae) : 0, Rs = X ? Math.floor(X.height / Ae) : 0, pr = Math.max(1, Math.ceil(Rs / ht)), mr = Math.min(Math.max(0, Xe), Math.max(0, pr - 1)), mh = mr * ht, Jl = ce[ce.length - 1] ?? null;
  T.useEffect(() => {
    const x = window.setTimeout(() => {
      v(!1);
    }, 2e3);
    return () => window.clearTimeout(x);
  }, []), T.useEffect(() => {
    var te, Pe, Ne, He;
    const x = document.documentElement, E = (at) => {
      const Ge = Number.isFinite(at) && at > 0 ? at : 1;
      x.style.setProperty("--ui-scale", String(Ge));
    };
    E(((Pe = (te = B.uiScale()) == null ? void 0 : te.getScale) == null ? void 0 : Pe.call(te)) ?? 1);
    const K = (He = (Ne = B.uiScale()) == null ? void 0 : Ne.onScaleChange) == null ? void 0 : He.call(Ne, E);
    return () => {
      K && K();
    };
  }, []), T.useEffect(() => {
    var x;
    if ((x = B.palette()) != null && x.onApply)
      return B.palette().onApply((E) => {
        const K = Array.isArray(E.colors) ? E.colors : [];
        if (K.length === 0)
          return;
        const te = re.getState();
        te.setPalette(K), te.setSelectedIndices([]), ve.getState().setDirty(!0);
      });
  }, []);
  const gh = Ze((x) => x.setMode), gr = Ze((x) => x.setSnap), gy = Ze((x) => x.setRotation), xy = Ze((x) => x.setScale), yy = Ze((x) => x.setFlipX), vy = Ze((x) => x.setFlipY), xh = Ze((x) => x.setDrag), wy = Ze(
    (x) => x.setPasteDuplicateColors
  ), ba = gn((x) => x.setSize), _a = gn((x) => x.setShape), yh = Zt((x) => x.setRadius), vh = Zt((x) => x.setDensity), wh = Zt((x) => x.setFalloff), Ta = Te.useRef("pen"), Ca = Te.useRef("tile-pen");
  T.useEffect(() => {
    if (gl(de)) {
      Ca.current = de;
      return;
    }
    Ta.current = de;
  }, [de]);
  const ka = T.useCallback(
    (x) => {
      if (x === "tile" && (!m || e))
        return;
      if (Ct(x), x === "tile") {
        const K = gl(Ca.current) ? Ca.current : "tile-pen";
        Re(K);
        return;
      }
      const E = gl(Ta.current) ? "pen" : Ta.current;
      Re(E);
    },
    [m, e, Re, Ct]
  ), xr = T.useCallback(
    (x) => {
      if (gl(x)) {
        if (!m || e)
          return;
        Ct("tile");
      } else o_(x) && ft === "tile" && m && !e ? Ct("tile") : Ct("pixel");
      if (x === "selection-lasso") {
        Re("selection-lasso"), ba(1), _a("round");
        return;
      }
      if (x === "text") {
        b((E) => de === "text" ? E : de), Re("text"), y(!0);
        return;
      }
      if (x === "ai") {
        oe((E) => de === "ai" ? E : de), Re("ai"), z(!0);
        return;
      }
      Re(x);
    },
    [
      de,
      m,
      e,
      Re,
      _a,
      ba,
      Ct,
      ft
    ]
  ), ts = re((x) => x.colors), ol = $o((x) => x.snap), yr = $o((x) => x.setSnap), Sh = Wt((x) => x.setSelected), ze = Wt(
    (x) => x.selectedId ? x.items.find((E) => E.id === x.selectedId) ?? null : null
  ), Sy = Wt((x) => x.updateReference), [ja, My] = T.useState(Uw), Pa = n1(), ue = Fn.find((x) => x.id === nr) ?? Fn[0], Mh = tr.find((x) => x.id === ry) ?? tr[0], As = Te.useMemo(() => {
    const x = new Set(zd.filter((E) => E >= 0));
    return Array.from(x).sort((E, K) => E - K);
  }, [zd]), Na = T.useCallback(
    (x) => {
      Number.isFinite(x) && Hd(x);
    },
    [Hd]
  ), Ia = Math.max(1, ay), Ea = Math.min(Zl, Ia - 1), by = T.useCallback(() => {
    sr(Zl - 1);
  }, [sr, Zl]), _y = T.useCallback(() => {
    sr(Zl + 1);
  }, [sr, Zl]), bh = T.useCallback(
    (x, E) => {
      ue && (!Number.isFinite(x) || !Number.isFinite(E) || Gd(ue.id, x, E));
    },
    [ue, Gd]
  ), Ty = T.useCallback(() => {
    const x = (ue == null ? void 0 : ue.tileWidth) ?? pe, E = (ue == null ? void 0 : ue.tileHeight) ?? pe;
    Qd({
      name: `Tile Set ${Fn.length + 1}`,
      tileWidth: x,
      tileHeight: E,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [ue, Qd, Fn.length]), Cy = T.useCallback(() => {
    ue && Zd(ue.id);
  }, [ue, Zd]), ky = T.useCallback(() => {
    if (!ue)
      return;
    const x = ue.name, E = window.prompt("Rename tile set", x);
    if (typeof E != "string")
      return;
    const K = E.trim();
    !K || K === x || qd(ue.id, K);
  }, [ue, qd]), jy = T.useCallback(() => {
    if (!ue)
      return;
    const x = tr.filter((K) => K.tileSetId === ue.id).length, E = x > 0 ? `Delete ${ue.name}? This will also delete ${x} linked tile map${x === 1 ? "" : "s"}.` : `Delete ${ue.name}?`;
    window.confirm(E) && Jd(ue.id);
  }, [ue, Jd, tr]), Py = T.useCallback(() => {
    if (!ue || As.length === 0)
      return;
    const x = As.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${As.length} ${x} from ${ue.name}? This cannot be undone.`
    ) && eh(ue.id, As);
  }, [ue, eh, As]), kt = ft === "tile" && m && !e, Ny = kt ? Ps : sn, Ra = Te.useRef("palette"), Aa = Te.useRef(!1);
  T.useEffect(() => {
    kt && (lr !== "tile" && ir("tile"), ll !== "tile" && gr("tile"), ol !== "tile" && yr("tile"));
  }, [
    kt,
    ol,
    lr,
    yr,
    ir,
    gr,
    ll
  ]);
  const vr = T.useCallback(
    (x) => {
      const E = Math.max(16, x.tileWidth * Es), K = Math.max(1, x.rows) * E;
      return zn(
        K + c_,
        Kp,
        Gp
      );
    },
    [Es]
  ), Iy = T.useCallback(
    (x) => {
      Kd(x);
      const E = Fn.find((K) => K.id === x);
      E && es(vr(E));
    },
    [vr, Kd, Fn]
  );
  T.useEffect(() => {
    if (!kt || !nr)
      return;
    const x = Fn.find((E) => E.id === nr);
    x && es(vr(x));
  }, [
    kt,
    nr,
    vr,
    Fn
  ]);
  const Ey = (x) => {
    x.preventDefault(), x.currentTarget.setPointerCapture(x.pointerId), Ra.current = kt ? "tile" : "palette", Aa.current = !0;
  };
  T.useEffect(() => {
    const x = (K) => {
      if (!Aa.current)
        return;
      const te = document.documentElement.clientHeight, Pe = Math.max(
        Kp,
        Math.min(Gp, te - K.clientY)
      );
      Ra.current === "tile" ? es(Pe) : er(Pe);
    }, E = () => {
      Ra.current = kt ? "tile" : "palette", Aa.current = !1;
    };
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", E), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", E);
    };
  }, [kt]);
  const Ry = (Rt ? 0 : 324) + 24;
  T.useEffect(() => (n(B.capabilities()), B.onCapabilitiesChange((x) => {
    n(x);
  })), []), T.useEffect(() => {
    if (e || !t.options) {
      w(!1);
      return;
    }
    let x = !1;
    return (async () => {
      try {
        const K = await B.options().getAdvancedMode();
        x || w(!!K);
      } catch {
      }
    })(), () => {
      x = !0;
    };
  }, [e, t.options]), T.useEffect(() => {
    de !== "reference-handle" && Sh(null);
  }, [de, Sh]), T.useEffect(() => {
    !m && gl(de) && (Re("pen"), Ct("pixel"));
  }, [m, de, Re, Ct]), T.useEffect(() => {
    ft === "tile" && (!m || e) && Ct("pixel");
  }, [m, e, Ct, ft]), T.useEffect(() => {
    e && de === "ai" && Re("pen");
  }, [de, e, Re]);
  const wr = Te.useCallback(async () => (e || await Op(r ?? void 0), null), [e, r]), _h = Te.useCallback(async () => (e || await Op(void 0), null), [e]), Sr = Te.useCallback(async () => {
    if (e)
      return null;
    if (!(o && !window.confirm("You have unsaved changes. Continue?")))
      return await gb(void 0), null;
  }, [e, o]), Mr = Te.useCallback(() => {
    o && !window.confirm("You have unsaved changes. Continue?") || Zx();
  }, [o]), br = Te.useCallback(() => {
    u(!0);
  }, [u]), Th = Te.useCallback(async () => {
    var x;
    if (!(e || Rn)) {
      if (!((x = B.recording()) != null && x.start)) {
        B.alert("Recording is unavailable. Restart the app to load the latest recording support.");
        return;
      }
      try {
        const E = await B.recording().start();
        Ee(!0), B.alert(`Recording started.
Frames will be saved to:
${E.frameDir}`);
      } catch (E) {
        const K = E instanceof Error ? E.message : "Unable to start recording.";
        B.alert(K);
      }
    }
  }, [e, Rn, Ee]), Ch = Te.useCallback(async () => {
    var x;
    if (!(!Rn || !((x = B.recording()) != null && x.stop)))
      try {
        const E = await B.recording().stop(12);
        if (Ee(!1), !E) {
          B.alert("No active recording session.");
          return;
        }
        if (E.canceled) {
          B.alert(
            `Recording stopped. Video export was canceled.
Frames are still available at:
${E.frameDir}`
          );
          return;
        }
        if (!E.videoPath) {
          B.alert(`Recording stopped with no frames captured.
Frames directory:
${E.frameDir}`);
          return;
        }
        B.alert(`Recording saved.
Video:
${E.videoPath}

Frames:
${E.frameDir}`);
      } catch (E) {
        Ee(!1);
        const K = E instanceof Error ? E.message : "Unable to stop recording.";
        B.alert(K);
      }
  }, [Rn, Ee]), kh = T.useCallback(async () => {
    const x = await yb();
    x && (xe(x), le(x.path ?? null), ie(0), W(0), H(!0));
  }, []), jh = T.useCallback(async () => {
    var K;
    if (!((K = B.project()) != null && K.importImage)) {
      B.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const x = await B.project().importImage();
    if (!x)
      return;
    if (!(x.format === "nes" || x.format === "gb" || x.format === "gbc" || x.format === "chr")) {
      (x.width > 512 || x.height > 512) && B.alert("Large images (over 512x512) can take a while to load."), Gb(x);
      return;
    }
    if (x.colorType !== "indexed") {
      B.alert("ROM import preview requires indexed pixels.");
      return;
    }
    se(x), Ye([
      {
        x: 0,
        y: 0,
        width: Math.floor(x.width / Ae),
        height: Math.floor(x.height / Ae)
      }
    ]), Ue(2), ot("nearest"), me(0), N(!0);
  }, []), _r = T.useCallback(() => {
    N(!1), se(null), Ye([]), ql.current = null;
  }, []), Tr = T.useCallback(
    (x) => {
      X && Ye((E) => {
        if (E.length === 0)
          return E;
        const K = E.slice(), te = K[K.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return K[K.length - 1] = Ys({ ...te, ...x }, rl, Rs), K;
      });
    },
    [X, rl, Rs]
  ), Cr = T.useCallback(() => {
    const x = ee.getState(), E = /* @__PURE__ */ new Set();
    for (const K of x.layers)
      for (const te of K.store.getBlocks())
        for (let Pe = 0; Pe < te.block.length; Pe += 1) {
          const Ne = te.block[Pe] ?? 0;
          Ne !== 0 && E.add(Ne);
        }
    return E;
  }, []), Ay = T.useCallback(() => {
    if (!X || ce.length === 0)
      return;
    if (!X.palette) {
      B.alert("ROM palette is missing.");
      return;
    }
    const x = ce.map((Me) => Ys(Me, rl, Rs)).filter((Me) => Me.width > 0 && Me.height > 0);
    if (x.length === 0) {
      B.alert("Select at least one region.");
      return;
    }
    const E = Vp(X.palette, X.pixels), K = x.map((Me) => {
      const ut = Ys(
        {
          x: Me.x * Ae,
          y: Me.y * Ae,
          width: Me.width * Ae,
          height: Me.height * Ae
        },
        X.width,
        X.height
      ), Ft = Lc(
        X.pixels,
        X.width,
        X.height,
        ut
      );
      return Wp(Ft.pixels, Ft.width, Ft.height, Se);
    }), te = Ae * Se, Pe = Math.max(Ae * Se * 32, 512);
    let Ne = 0, He = 0, at = 0;
    const Ge = [];
    for (const Me of K) {
      const ut = Me.width, Ft = Me.height;
      Ne > 0 && Ne + ut > Pe && (Ne = 0, He += at + te, at = 0), Ge.push({ x: Ne, y: He, w: ut, h: Ft, pixels: Me.pixels }), Ne += ut + te, at = Math.max(at, Ft);
    }
    const $e = Ge.length === 0 ? 1 : Math.max(...Ge.map((Me) => Me.x + Me.w)), xt = Ge.length === 0 ? 1 : Math.max(...Ge.map((Me) => Me.y + Me.h)), ct = new Uint8Array($e * xt);
    for (const Me of Ge)
      for (let ut = 0; ut < Me.h; ut += 1)
        for (let Ft = 0; Ft < Me.w; Ft += 1)
          ct[(Me.y + ut) * $e + (Me.x + Ft)] = Me.pixels[ut * Me.w + Ft] ?? 0;
    const Lt = re.getState(), ns = Cr();
    let rn;
    if (Oe === "unused") {
      const Me = $p(E, Lt.colors, ns);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Lt.setPalette(Me.palette), Lt.setSelectedIndices([]), rn = Jr(ct, Me.map);
    } else {
      const Me = Up(X.palette, Lt.colors);
      rn = Jr(ct, Me);
    }
    const ti = [];
    for (let Me = 0; Me < rn.length; Me += 1) {
      const ut = rn[Me] ?? 0;
      ut !== 0 && ti.push({ x: Me % $e, y: Math.floor(Me / $e), paletteIndex: ut });
    }
    rt.getState().setBuffer({
      pixels: ti,
      origin: { x: 0, y: 0 },
      width: $e,
      height: xt
    }), Ze.getState().setSnap("tile"), Ze.getState().setScale(1), It.getState().setActiveTool("stamp"), _r();
  }, [
    _r,
    Cr,
    Oe,
    X,
    Se,
    ce,
    rl,
    Rs
  ]);
  T.useEffect(() => {
    const x = ce[ce.length - 1] ?? null;
    if (!ge || !X || !x)
      return;
    const E = il.current, K = ph.current;
    if (!E || !K)
      return;
    const te = Vp(X.palette, X.pixels), Pe = Math.floor(X.width / Ae), Ne = Math.floor(X.height / Ae), He = Math.max(1, Math.ceil(Ne / ht)), Ge = Math.min(Math.max(0, Xe), He - 1) * ht, $e = Math.min(ht, Math.max(0, Ne - Ge)), xt = Lc(X.pixels, X.width, X.height, {
      x: 0,
      y: Ge * Ae,
      width: Pe * Ae,
      height: $e * Ae
    }), ct = ce.map((fe) => Ys(fe, Pe, Ne)).filter((fe) => fe.width > 0 && fe.height > 0), Lt = ct.map((fe) => {
      const Qe = Ys(
        {
          x: fe.x * Ae,
          y: fe.y * Ae,
          width: fe.width * Ae,
          height: fe.height * Ae
        },
        X.width,
        X.height
      ), lt = Lc(
        X.pixels,
        X.width,
        X.height,
        Qe
      ), ul = Wp(lt.pixels, lt.width, lt.height, Se);
      return { rect: fe, scaled: ul };
    }), ns = (fe, Qe, lt, ul, Ya, Xa) => {
      const Pr = Math.max(1, Math.trunc(Xa)), dl = document.createElement("canvas");
      dl.width = Qe, dl.height = lt;
      const Yh = dl.getContext("2d");
      if (!Yh)
        return;
      const Fy = i_(ul, Qe, lt, Ya);
      Yh.putImageData(new ImageData(Fy, Qe, lt), 0, 0), fe.width = Qe * Pr, fe.height = lt * Pr;
      const Nr = fe.getContext("2d");
      Nr && (Nr.imageSmoothingEnabled = !1, Nr.clearRect(0, 0, fe.width, fe.height), Nr.drawImage(dl, 0, 0, fe.width, fe.height));
    };
    ns(
      E,
      xt.width,
      xt.height,
      xt.pixels,
      te,
      Ie
    );
    const rn = E.getContext("2d");
    if (rn) {
      rn.save(), rn.imageSmoothingEnabled = !1, rn.strokeStyle = "rgba(255, 74, 100, 0.95)", rn.lineWidth = 1;
      for (const fe of ct) {
        const Qe = fe.y - Ge;
        if (Qe + fe.height <= 0 || Qe >= $e)
          continue;
        const lt = Math.max(0, Qe), ul = Math.min($e, Qe + fe.height) - lt;
        if (ul <= 0)
          continue;
        const Ya = fe.x * Ae * Ie, Xa = lt * Ae * Ie, Pr = fe.width * Ae * Ie, dl = ul * Ae * Ie;
        rn.strokeRect(Ya + 0.5, Xa + 0.5, Pr - 1, dl - 1);
      }
      rn.restore();
    }
    const ti = Ae * Se, Me = Math.max(Ae * Se * 32, 512);
    let ut = 0, Ft = 0, kr = 0;
    const cl = [];
    for (const fe of Lt) {
      const Qe = fe.scaled.width, lt = fe.scaled.height;
      ut > 0 && ut + Qe > Me && (ut = 0, Ft += kr + ti, kr = 0), cl.push({ x: ut, y: Ft, w: Qe, h: lt, pixels: fe.scaled.pixels }), ut += Qe + ti, kr = Math.max(kr, lt);
    }
    const La = cl.length === 0 ? 1 : Math.max(...cl.map((fe) => fe.x + fe.w)), Dh = cl.length === 0 ? 1 : Math.max(...cl.map((fe) => fe.y + fe.h)), jr = new Uint8Array(La * Dh);
    for (const fe of cl)
      for (let Qe = 0; Qe < fe.h; Qe += 1)
        for (let lt = 0; lt < fe.w; lt += 1)
          jr[(fe.y + Qe) * La + (fe.x + lt)] = fe.pixels[Qe * fe.w + lt] ?? 0;
    let Ba = jr, Da = ts;
    if (Oe === "nearest") {
      const fe = X.palette;
      if (!fe)
        return;
      const Qe = Up(fe, ts);
      Ba = Jr(jr, Qe), Da = ts;
    } else {
      const fe = Cr(), { map: Qe, palette: lt } = $p(te, ts, fe);
      Ba = Jr(jr, Qe), Da = lt;
    }
    ns(K, La, Dh, Ba, Da, 2);
  }, [
    Cr,
    ts,
    ge,
    Oe,
    X,
    Xe,
    Se,
    ce
  ]), T.useEffect(() => {
    const x = (E) => {
      var Pe, Ne, He, at, Ge, $e;
      if (qp(E.target))
        return;
      if (!(E.ctrlKey || E.metaKey)) {
        const xt = E.key.toLowerCase();
        if ((xt === "delete" || xt === "backspace") && de === "reference-handle" && ze) {
          E.preventDefault(), Ma(ze.id);
          return;
        }
        if (xt === "delete" || xt === "backspace") {
          if (we.getState().selectedCount === 0)
            return;
          E.preventDefault(), ib();
          return;
        }
        const ct = Qb({
          key: E.key,
          altKey: E.altKey,
          ctrlKey: E.ctrlKey,
          metaKey: E.metaKey,
          shiftKey: E.shiftKey
        });
        if (ct) {
          if (ct.type === "tool") {
            if (r_(ct.tool) && (!m || e))
              return;
            E.preventDefault(), xr(ct.tool);
            return;
          }
          if (ct.type === "palette-primary") {
            const Lt = re.getState();
            ct.index >= 0 && ct.index < Lt.colors.length && (E.preventDefault(), Lt.setSelectedIndices([ct.index]));
            return;
          }
        }
        return;
      }
      const te = E.key.toLowerCase();
      if (te === "v") {
        if (ft === "tile" && rt.getState().tileBuffer) {
          E.preventDefault(), xr("tile-stamp");
          return;
        }
        fr.current = !0, window.setTimeout(() => {
          fr.current = !1;
        }, 200);
        return;
      }
      if (te === "+" || te === "=") {
        E.preventDefault(), (Ne = (Pe = B.uiScale()) == null ? void 0 : Pe.stepScale) == null || Ne.call(Pe, 1.1);
        return;
      }
      if (te === "-") {
        E.preventDefault(), (at = (He = B.uiScale()) == null ? void 0 : He.stepScale) == null || at.call(He, 0.9090909090909091);
        return;
      }
      if (te === "0") {
        E.preventDefault(), ($e = (Ge = B.uiScale()) == null ? void 0 : Ge.resetScale) == null || $e.call(Ge);
        return;
      }
      if (te === "z") {
        if (E.preventDefault(), Be.getState().locked)
          return;
        E.shiftKey ? l() : s();
      }
      if (te === "y") {
        if (E.preventDefault(), Be.getState().locked)
          return;
        l();
      }
      if (te === "s") {
        if (E.preventDefault(), e)
          return;
        wr();
      }
      if (te === "o") {
        if (E.preventDefault(), e)
          return;
        Sr();
      }
      if (te === "n" && (E.preventDefault(), Mr()), te === "c") {
        if (ft === "tile") {
          Kx() && E.preventDefault();
          return;
        }
        we.getState().selectedCount > 0 && (E.preventDefault(), E.shiftKey ? Ko({ deep: !0 }) : Ko());
      }
      if (te === "x") {
        if (ft === "tile") {
          Gx() && E.preventDefault();
          return;
        }
        we.getState().selectedCount > 0 && (E.preventDefault(), Wx());
      }
      te === "/" && (E.preventDefault(), br());
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [
    de,
    xr,
    e,
    Sr,
    Mr,
    wr,
    br,
    m,
    l,
    Ma,
    ze,
    s,
    ft
  ]), T.useEffect(() => {
    de !== "text" && g && y(!1);
  }, [de, g]);
  const ei = (x) => {
    ze && Sy(ze.id, x);
  }, Ph = (x) => {
    Number.isFinite(x) && ei({
      rotation: zn(x, fc, pc)
    });
  }, Nh = (x) => {
    Number.isFinite(x) && ei({
      scale: zn(x, Zs, Ul)
    });
  }, Ih = (x) => {
    Number.isFinite(x) && ei({
      opacity: zn(x, mc, gc)
    });
  }, al = Te.useMemo(() => {
    const x = ts.length - 1;
    if (x < 0)
      return [];
    const E = /* @__PURE__ */ new Set();
    for (const K of va) {
      if (!Number.isFinite(K))
        continue;
      const te = Math.round(K);
      te < 0 || te > x || E.add(te);
    }
    return Array.from(E).sort((K, te) => K - te);
  }, [ts.length, va]), Ly = al.length === 0 ? "Select palette colors to trace." : al.length === 1 ? "Using 1 selected color." : `Using ${al.length} selected colors.`, By = () => {
    !ze || ts.length === 0 || al.length !== 0 && n_(ze, al);
  }, Dy = () => {
    if (!ze || !Number.isFinite(ja))
      return;
    const x = zn(
      Math.round(ja),
      Pu,
      Nu
    );
    s_(ze, x);
  }, Eh = (ze == null ? void 0 : ze.rotation) ?? 0, Rh = (ze == null ? void 0 : ze.scale) ?? 1, Yy = u_(Rh), Ah = (ze == null ? void 0 : ze.opacity) ?? 0.7, Lh = (ze == null ? void 0 : ze.flipX) ?? !1, Bh = (ze == null ? void 0 : ze.flipY) ?? !1, Gt = !ze;
  T.useEffect(() => {
    if (!gt) {
      Mn("");
      return;
    }
    const x = () => {
      const K = f_();
      Mn((te) => te === K ? te : K);
    };
    x();
    const E = window.setInterval(x, Vw);
    return () => window.clearInterval(E);
  }, [gt]), T.useEffect(() => {
    var E, K;
    const x = gt && En ? `${Pa} • ${En}` : Pa;
    (K = (E = B.app()) == null ? void 0 : E.setTitle) == null || K.call(E, x);
  }, [Pa, gt, En]), T.useEffect(() => {
    const x = (E) => {
      var Ne;
      if (qp(E.target) || !fr.current)
        return;
      fr.current = !1;
      const te = Array.from(((Ne = E.clipboardData) == null ? void 0 : Ne.items) ?? []).find((He) => He.type.startsWith("image/"));
      if (!te)
        return;
      const Pe = te.getAsFile();
      Pe && (E.preventDefault(), Ex(Pe));
    };
    return window.addEventListener("paste", x), () => window.removeEventListener("paste", x);
  }, []), T.useEffect(() => {
    var E, K;
    const x = ((K = (E = B.menu()) == null ? void 0 : E.onAction) == null ? void 0 : K.call(E, (te) => {
      var Pe, Ne;
      if (te.startsWith("view:set:")) {
        const He = te.split(":"), at = He[2] ?? "", $e = (He[3] ?? "") === "true";
        switch (at) {
          case "showReferenceLayer":
            ln($e);
            return;
          case "showPixelLayer":
            Ns($e);
            return;
          case "showTileLayer":
            Is($e);
            return;
          case "showPixelGrid":
            Xn($e);
            return;
          case "showTileGrid":
            nl($e);
            return;
          case "showAxes":
            sl($e);
            return;
          case "minimapCollapsed":
            Kt($e);
            return;
          default:
            return;
        }
      }
      if (te.startsWith("options:advancedMode:")) {
        const He = te.split(":")[2] ?? "";
        w(He === "true");
        return;
      }
      if (te.startsWith("palette:rows:")) {
        const He = Number(te.split(":")[2]);
        Number.isFinite(He) && window.dispatchEvent(
          new CustomEvent("palette:set-rows", {
            detail: Math.min(4, Math.max(2, Math.floor(He)))
          })
        );
        return;
      }
      switch (te) {
        case "new":
          Mr();
          break;
        case "open":
          Sr();
          break;
        case "save":
          wr();
          break;
        case "saveAs":
          _h();
          break;
        case "importImage":
          jh();
          break;
        case "mergeProject":
          kh();
          break;
        case "recording:start":
          Th();
          break;
        case "recording:stop":
          Ch();
          break;
        case "exportPng":
          Qx();
          break;
        case "exportBmp":
          kb();
          break;
        case "exportGif":
          jb();
          break;
        case "exportPcx":
          Nb();
          break;
        case "exportTga":
          Pb();
          break;
        case "exportBsaveCga":
          Fb();
          break;
        case "exportBsaveEga":
          Ob();
          break;
        case "exportBsaveVga":
          zb();
          break;
        case "exportGbr":
          Tb();
          break;
        case "exportChr":
          Cb();
          break;
        case "undo":
          s();
          break;
        case "redo":
          l();
          break;
        case "memory:on":
          Sn(!0);
          break;
        case "memory:off":
          Sn(!1);
          break;
        case "shortcuts":
          br();
          break;
        case "palette:consolidate":
          Ub();
          break;
        case "palette:import-lospec":
          window.dispatchEvent(new Event("palette:open-lospec"));
          break;
        case "license":
          p(!0);
          break;
        case "options":
          f(!0);
          break;
        case "uiScale:reset":
          (Ne = (Pe = B.uiScale()) == null ? void 0 : Pe.resetScale) == null || Ne.call(Pe);
          break;
        case "tileDebug:on":
          Sa(!0);
          break;
        case "tileDebug:off":
          Sa(!1);
          break;
        case "view:select-tool:pen":
          ka("pixel");
          break;
      }
    })) ?? (() => {
    });
    return () => x();
  }, [
    jh,
    Sr,
    kh,
    Mr,
    Th,
    wr,
    _h,
    br,
    Ch,
    l,
    w,
    Re,
    Kt,
    Sn,
    sl,
    p,
    Xn,
    Ns,
    ln,
    nl,
    Is,
    Sa,
    ka,
    s
  ]), T.useEffect(() => {
    var x, E;
    (E = (x = B.viewMenu()) == null ? void 0 : x.setState) == null || E.call(x, {
      showReferenceLayer: I,
      showPixelLayer: R,
      showTileLayer: q,
      showPixelGrid: he,
      showTileGrid: je,
      showAxes: At,
      tileDebugOverlay: fh,
      minimapCollapsed: Rt
    });
  }, [
    I,
    R,
    q,
    he,
    je,
    At,
    fh,
    Rt
  ]);
  const Xy = () => /* @__PURE__ */ a.jsx("div", { className: "panel__section", children: de === "pen" || de === "selection-lasso" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__row", children: [1, 4, 8].map((x) => /* @__PURE__ */ a.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": cy === x,
          disabled: th === "point",
          onClick: () => ba(x),
          children: [
            x,
            "px"
          ]
        },
        x
      )) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Brush" }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__row", children: [
        { id: "point", label: "fine-point" },
        { id: "square", label: "rectangle" },
        { id: "round", label: "circle" }
      ].map((x) => /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": th === x.id,
          onClick: () => _a(x.id),
          children: /* @__PURE__ */ a.jsx("span", { className: "tool-label", "aria-label": x.label, children: x.label })
        },
        x.id
      )) })
    ] })
  ] }) : de === "spray" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Radius" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: nh,
              onChange: (x) => yh(x.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: nh,
              onChange: (x) => yh(x.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Density" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Density",
              min: 10,
              max: 2e3,
              step: 10,
              value: Math.min(2e3, sh),
              onChange: (x) => vh(x.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Density",
              min: 1,
              max: 2e4,
              step: 10,
              value: sh,
              onChange: (x) => vh(x.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "panel__row", children: /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Falloff" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: lh,
            onChange: (x) => wh(x.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: lh,
            onChange: (x) => wh(x.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }) })
  ] }) : de === "line" ? ur >= 2 ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Direction" }),
      /* @__PURE__ */ a.jsx(
        an,
        {
          ariaLabel: "Gradient direction",
          value: rr,
          onChange: or,
          options: [
            { value: "top-bottom", label: "Top → Bottom" },
            { value: "bottom-top", label: "Bottom → Top" },
            { value: "left-right", label: "Left → Right" },
            { value: "right-left", label: "Right → Left" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Dither" }),
      /* @__PURE__ */ a.jsx(
        an,
        {
          ariaLabel: "Gradient dither",
          value: ar,
          onChange: cr,
          options: [
            { value: "bayer2", label: "Ordered (Bayer 2×2)" },
            { value: "bayer4", label: "Ordered (Bayer 4×4)" },
            { value: "bayer8", label: "Ordered (Bayer 8×8)" },
            { value: "none", label: "None" },
            { value: "random", label: "Random (stable)" },
            { value: "blue-noise", label: "Blue noise (interleaved)" },
            { value: "floyd-steinberg", label: "Error diffusion (Floyd–Steinberg)" },
            { value: "atkinson", label: "Error diffusion (Atkinson)" },
            { value: "jarvis-judice-ninke", label: "Error diffusion (Jarvis–Judice–Ninke)" },
            { value: "stucki", label: "Error diffusion (Stucki)" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
  ] }) : /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." }) : de === "rectangle" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "filled",
              checked: ih === "filled",
              onChange: () => rh("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "outlined",
              checked: ih === "outlined",
              onChange: () => rh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    ur >= 2 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: rr,
            onChange: or,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient dither",
            value: ar,
            onChange: cr,
            options: [
              { value: "bayer2", label: "Ordered (Bayer 2×2)" },
              { value: "bayer4", label: "Ordered (Bayer 4×4)" },
              { value: "bayer8", label: "Ordered (Bayer 8×8)" },
              { value: "none", label: "None" },
              { value: "random", label: "Random (stable)" },
              { value: "blue-noise", label: "Blue noise (interleaved)" },
              { value: "floyd-steinberg", label: "Error diffusion (Floyd–Steinberg)" },
              { value: "atkinson", label: "Error diffusion (Atkinson)" },
              { value: "jarvis-judice-ninke", label: "Error diffusion (Jarvis–Judice–Ninke)" },
              { value: "stucki", label: "Error diffusion (Stucki)" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : de === "oval" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "filled",
              checked: oh === "filled",
              onChange: () => ah("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "outlined",
              checked: oh === "outlined",
              onChange: () => ah("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    ur >= 2 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: rr,
            onChange: or,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient dither",
            value: ar,
            onChange: cr,
            options: [
              { value: "bayer2", label: "Ordered (Bayer 2×2)" },
              { value: "bayer4", label: "Ordered (Bayer 4×4)" },
              { value: "bayer8", label: "Ordered (Bayer 8×8)" },
              { value: "none", label: "None" },
              { value: "random", label: "Random (stable)" },
              { value: "blue-noise", label: "Blue noise (interleaved)" },
              { value: "floyd-steinberg", label: "Error diffusion (Floyd–Steinberg)" },
              { value: "atkinson", label: "Error diffusion (Atkinson)" },
              { value: "jarvis-judice-ninke", label: "Error diffusion (Jarvis–Judice–Ninke)" },
              { value: "stucki", label: "Error diffusion (Stucki)" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : de === "fill-bucket" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "color",
              checked: ch === "color",
              onChange: () => uh("color")
            }
          ),
          "Color"
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "selection",
              checked: ch === "selection",
              onChange: () => uh("selection")
            }
          ),
          "Selection"
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] }),
    ur >= 2 && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: rr,
            onChange: or,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Gradient dither",
            value: ar,
            onChange: cr,
            options: [
              { value: "bayer2", label: "Ordered (Bayer 2×2)" },
              { value: "bayer4", label: "Ordered (Bayer 4×4)" },
              { value: "bayer8", label: "Ordered (Bayer 8×8)" },
              { value: "none", label: "None" },
              { value: "random", label: "Random (stable)" },
              { value: "blue-noise", label: "Blue noise (interleaved)" },
              { value: "floyd-steinberg", label: "Error diffusion (Floyd–Steinberg)" },
              { value: "atkinson", label: "Error diffusion (Atkinson)" },
              { value: "jarvis-judice-ninke", label: "Error diffusion (Jarvis–Judice–Ninke)" },
              { value: "stucki", label: "Error diffusion (Stucki)" }
            ]
          }
        )
      ] })
    ] })
  ] }) : de === "texture-roll" ? /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: i === 0 ? "Make a selection first." : "Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps." }) : de === "stamp" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Mode" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": dr === "soft", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "soft",
                checked: dr === "soft",
                onChange: () => gh("soft")
              }
            ),
            "Soft"
          ] }),
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": dr === "hard", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "hard",
                checked: dr === "hard",
                onChange: () => gh("hard")
              }
            ),
            "Hard"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Drag" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": !hr, children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "off",
                checked: !hr,
                onChange: () => xh(!1)
              }
            ),
            "Off"
          ] }),
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": hr, children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "on",
                checked: hr,
                onChange: () => xh(!0)
              }
            ),
            "On"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": ll === "pixel", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "pixel",
                checked: ll === "pixel",
                onChange: () => gr("pixel")
              }
            ),
            "Pixel"
          ] }),
          /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": ll === "tile", children: [
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "tile",
                checked: ll === "tile",
                onChange: () => gr("tile")
              }
            ),
            "Tile"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Flip" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": dh,
              onClick: () => yy(!dh),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": hh,
              onClick: () => vy(!hh),
              children: "Flip Y"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Scale" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Scale",
            value: String(hy),
            onChange: (x) => xy(Number(x)),
            options: [
              { value: "1", label: "1x" },
              { value: "2", label: "2x" },
              { value: "4", label: "4x" },
              { value: "8", label: "8x" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Rotate" }),
        /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Rotate",
            value: String(dy),
            onChange: (x) => gy(Number(x)),
            options: [
              { value: "0", label: "0deg" },
              { value: "90", label: "90deg" },
              { value: "180", label: "180deg" },
              { value: "270", label: "270deg" }
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "panel__row", children: /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Paste" }),
      /* @__PURE__ */ a.jsx("div", { className: "panel__toggle-group", children: /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": wa, children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "checkbox",
            checked: wa,
            onChange: () => wy(!wa)
          }
        ),
        "Duplicate Colors"
      ] }) })
    ] }) })
  ] }) : de === "reference-handle" ? /* @__PURE__ */ a.jsx("div", { className: "panel__group", children: /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--cards", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Rotation" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Rotation",
            min: fc,
            max: pc,
            step: 1,
            value: Eh,
            disabled: Gt,
            onChange: (x) => Ph(x.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Rotation",
            min: fc,
            max: pc,
            step: 1,
            value: Eh,
            disabled: Gt,
            onChange: (x) => Ph(x.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Scale" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Scale",
            min: Bl,
            max: Qo,
            step: 1,
            value: Yy,
            disabled: Gt,
            onChange: (x) => Nh(d_(x.currentTarget.valueAsNumber))
          }
        ),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Scale",
            min: Zs,
            max: Ul,
            step: 0.01,
            value: Rh,
            disabled: Gt,
            onChange: (x) => Nh(x.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Opacity" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Opacity",
            min: mc,
            max: gc,
            step: 0.05,
            value: Ah,
            disabled: Gt,
            onChange: (x) => Ih(x.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Opacity",
            min: mc,
            max: gc,
            step: 0.05,
            value: Ah,
            disabled: Gt,
            onChange: (x) => Ih(x.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Flip" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Lh,
            disabled: Gt,
            onClick: () => ei({ flipX: !Lh }),
            children: "Flip X"
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Bh,
            disabled: Gt,
            onClick: () => ei({ flipY: !Bh }),
            children: "Flip Y"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Snap" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": ol === "pixel", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "pixel",
              checked: ol === "pixel",
              onChange: () => yr("pixel")
            }
          ),
          "Pixel"
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "panel__toggle", "data-active": ol === "tile", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "tile",
              checked: ol === "tile",
              onChange: () => yr("tile")
            }
          ),
          "Tile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Reference" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack", children: [
        Gt && /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "Select a reference" }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt,
            onClick: () => {
              ze && Ma(ze.id);
            },
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Trace Palette" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack", children: [
        /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: Ly }),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt || al.length === 0,
            onClick: By,
            children: "Trace Selected"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Trace Max Colors" }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Trace max colors",
            min: Pu,
            max: Nu,
            step: 1,
            value: ja,
            disabled: Gt,
            onChange: (x) => {
              const E = x.currentTarget.valueAsNumber;
              Number.isFinite(E) && My(Math.round(E));
            }
          }
        ),
        /* @__PURE__ */ a.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt,
            onClick: Dy,
            children: "Trace"
          }
        )
      ] })
    ] })
  ] }) }) : de === "selection-rect" || de === "selection-oval" ? /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
    /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Snap" }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "pixel",
            checked: !kt && lr === "pixel",
            disabled: kt,
            onChange: () => ir("pixel")
          }
        ),
        "Pixel"
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ a.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "tile",
            checked: kt || lr === "tile",
            onChange: () => ir("tile")
          }
        ),
        "Tile"
      ] })
    ] }),
    kt ? /* @__PURE__ */ a.jsx("span", { className: "panel__note", children: "Tile Space locks selection snap to tiles." }) : null
  ] }) : de === "tile-sampler" || de === "tile-pen" || de === "tile-stamp" || de === "tile-rectangle" || de === "tile-9slice" || de === "tile-export" ? /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row panel__row--cards", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Tile Set" }),
        ue ? /* @__PURE__ */ a.jsx(
          an,
          {
            ariaLabel: "Tile Set",
            value: ue.id,
            onChange: Iy,
            options: Fn.map((x) => ({ value: x.id, label: x.name }))
          }
        ) : /* @__PURE__ */ a.jsx("div", { className: "panel__note", children: "None" })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Cluster" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile cluster columns",
              min: 1,
              max: 64,
              step: 1,
              disabled: !ue,
              value: (ue == null ? void 0 : ue.columns) ?? 1,
              onChange: (x) => bh(
                x.currentTarget.valueAsNumber,
                (ue == null ? void 0 : ue.rows) ?? 1
              )
            }
          ),
          /* @__PURE__ */ a.jsx("span", { className: "panel__note", children: "x" }),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile cluster rows",
              min: 1,
              max: 64,
              step: 1,
              disabled: !ue,
              value: (ue == null ? void 0 : ue.rows) ?? 1,
              onChange: (x) => bh(
                (ue == null ? void 0 : ue.columns) ?? 1,
                x.currentTarget.valueAsNumber
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Zoom" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => Na(Es - 1),
              disabled: Es <= Eu,
              children: "-"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile picker zoom",
              min: Eu,
              max: Ru,
              step: 1,
              value: Es,
              onChange: (x) => Na(x.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => Na(Es + 1),
              disabled: Es >= Ru,
              children: "+"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Page" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: by,
              disabled: !ue || Ea <= 0,
              children: "◀"
            }
          ),
          /* @__PURE__ */ a.jsxs("span", { className: "panel__item panel__item--static", children: [
            Ea + 1,
            " / ",
            Ia
          ] }),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: _y,
              disabled: !ue || Ea >= Ia - 1,
              children: "▶"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Placement" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Wd === "soft",
              onClick: () => Ud("soft"),
              children: "Soft"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Wd === "hard",
              onClick: () => Ud("hard"),
              children: "Hard"
            }
          )
        ] })
      ] }),
      de === "tile-pen" ? /* @__PURE__ */ a.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ a.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": !$d,
              onClick: () => Vd(!1),
              children: "Free"
            }
          ),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": $d,
              onClick: () => Vd(!0),
              children: "Cluster"
            }
          )
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__item", onClick: Ty, children: "New Set" }),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Cy,
          disabled: !ue,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: ky,
          disabled: !ue,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: jy,
          disabled: !ue,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ a.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Py,
          disabled: !ue || As.length === 0,
          children: "Delete Tiles"
        }
      )
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
        "Set: ",
        ue ? `${ue.name} (${ue.tiles.length} tiles)` : "None"
      ] }),
      /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
        "Map: ",
        Mh ? Mh.name : "None"
      ] }),
      /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
        "Selected Tile: ",
        ue ? oy + 1 : "—"
      ] }),
      /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        As.length
      ] }),
      de === "tile-9slice" && /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
        /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          fy ? "set" : "unset"
        ] }),
        /* @__PURE__ */ a.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          py,
          "x",
          my
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ a.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ a.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ a.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ a.jsx(TM, {}) }),
    /* @__PURE__ */ a.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ a.jsx(
        ub,
        {
          activeTool: de,
          selectionCount: i,
          activateTool: xr,
          workspaceMode: ft,
          switchWorkspace: ka,
          showAdvancedTools: !e && m,
          showTileTools: kt,
          showAiTool: !e && t.ai,
          showExportButton: !e && t.exportPng,
          showFullscreenButton: !e && t.fullscreenToggle,
          showTileLayerControls: !e,
          toolOptions: Xy()
        }
      ),
      M && /* @__PURE__ */ a.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ a.jsx("img", { src: db, alt: "" }) }),
      /* @__PURE__ */ a.jsxs(
        "div",
        {
          className: `app__palette panel${kt ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${Ry}px`,
            "--palette-bar-height": `${Ny}px`
          },
          children: [
            /* @__PURE__ */ a.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: Ey
              }
            ),
            /* @__PURE__ */ a.jsxs("div", { className: `bottom-bar${kt ? " bottom-bar--tile" : ""}`, children: [
              /* @__PURE__ */ a.jsx("div", { className: "bottom-bar__left" }),
              /* @__PURE__ */ a.jsx("div", { className: "bottom-bar__center", children: kt ? /* @__PURE__ */ a.jsx($M, {}) : /* @__PURE__ */ a.jsx(WM, {}) })
            ] })
          ]
        }
      ),
      Rt ? /* @__PURE__ */ a.jsx("div", { className: "app__minimap-launch panel panel--collapsed", children: /* @__PURE__ */ a.jsx("button", { type: "button", className: "panel__toggle", onClick: () => Kt(!1), children: "Minimap" }) }) : /* @__PURE__ */ a.jsxs("div", { className: "app__minimap panel", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "panel__header", children: [
          /* @__PURE__ */ a.jsx("h2", { children: "Minimap" }),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              onClick: () => Kt(!0),
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ a.jsx(FM, {})
      ] })
    ] }),
    ge && X && Jl && /* @__PURE__ */ a.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: _r }),
      /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--rom", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ a.jsx("h2", { children: "Import ROM Segment" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: _r, children: "Close" })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Selections" }),
            /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a.jsx("span", { children: ce.length }),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => Ye([]),
                  disabled: ce.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => Ye((x) => x.length > 0 ? x.slice(0, -1) : x),
                  disabled: ce.length === 0,
                  children: "Remove last"
                }
              ),
              /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.8 }, children: "Ctrl+drag to add" })
            ] })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Selection (tiles)" }),
            /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ a.jsxs("label", { children: [
                "X",
                " ",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    value: Jl.x,
                    onChange: (x) => Tr({ x: Number(x.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { children: [
                "Y",
                " ",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    value: Jl.y,
                    onChange: (x) => Tr({ y: Number(x.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { children: [
                "W",
                " ",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    value: Jl.width,
                    onChange: (x) => Tr({ width: Number(x.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ a.jsxs("label", { children: [
                "H",
                " ",
                /* @__PURE__ */ a.jsx(
                  "input",
                  {
                    type: "number",
                    value: Jl.height,
                    onChange: (x) => Tr({ height: Number(x.target.value) })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Page" }),
            /* @__PURE__ */ a.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => me((x) => Math.max(0, x - 1)),
                  disabled: mr <= 0,
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ a.jsxs("span", { children: [
                mr + 1,
                "/",
                pr
              ] }),
              /* @__PURE__ */ a.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => me((x) => Math.min(pr - 1, x + 1)),
                  disabled: mr >= pr - 1,
                  children: "Next"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Scale" }),
            /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: Se,
                onChange: (x) => Ue(Number(x.target.value)),
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: 1, children: "1x" }),
                  /* @__PURE__ */ a.jsx("option", { value: 2, children: "2x" }),
                  /* @__PURE__ */ a.jsx("option", { value: 3, children: "3x" }),
                  /* @__PURE__ */ a.jsx("option", { value: 4, children: "4x" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Palette" }),
            /* @__PURE__ */ a.jsx("span", { children: /* @__PURE__ */ a.jsxs(
              "select",
              {
                value: Oe,
                onChange: (x) => ot(
                  x.target.value === "unused" ? "unused" : "nearest"
                ),
                children: [
                  /* @__PURE__ */ a.jsx("option", { value: "nearest", children: "Map to nearest existing colors" }),
                  /* @__PURE__ */ a.jsx("option", { value: "unused", children: "Import into unused palette slots" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Pick region" }),
            /* @__PURE__ */ a.jsxs("span", { className: "rom-import__grid", children: [
              /* @__PURE__ */ a.jsx("div", { className: "rom-import__selection", children: /* @__PURE__ */ a.jsx(
                "canvas",
                {
                  ref: il,
                  className: "rom-import__canvas",
                  onPointerDown: (x) => {
                    var ct;
                    x.preventDefault();
                    const E = il.current;
                    if (!E)
                      return;
                    (ct = E.setPointerCapture) == null || ct.call(E, x.pointerId);
                    const K = E.getBoundingClientRect(), te = Math.floor(
                      (x.clientX - K.left) / K.width * E.width
                    ), Pe = Math.floor(
                      (x.clientY - K.top) / K.height * E.height
                    ), Ne = Math.floor(te / (Ae * Ie)), He = mh + Math.floor(Pe / (Ae * Ie)), at = Math.trunc(zn(Ne, 0, rl - 1)), Ge = Math.trunc(zn(He, 0, Rs - 1));
                    ql.current = {
                      startTileX: at,
                      startTileY: Ge,
                      pointerId: x.pointerId
                    };
                    const $e = x.ctrlKey || x.metaKey, xt = { x: at, y: Ge, width: 1, height: 1 };
                    Ye(
                      (Lt) => $e ? [...Lt, xt] : [xt]
                    );
                  },
                  onPointerMove: (x) => {
                    const E = il.current, K = ql.current;
                    if (!E || !K || !X || K.pointerId !== x.pointerId)
                      return;
                    const te = E.getBoundingClientRect(), Pe = Math.floor(
                      (x.clientX - te.left) / te.width * E.width
                    ), Ne = Math.floor(
                      (x.clientY - te.top) / te.height * E.height
                    ), He = Math.floor(Pe / (Ae * Ie)), at = mh + Math.floor(Ne / (Ae * Ie)), Ge = Math.min(K.startTileX, He), $e = Math.min(K.startTileY, at), xt = Math.max(K.startTileX, He), ct = Math.max(K.startTileY, at);
                    Ye((Lt) => {
                      if (Lt.length === 0)
                        return Lt;
                      const ns = Lt.slice();
                      return ns[ns.length - 1] = Ys(
                        {
                          x: Ge,
                          y: $e,
                          width: xt - Ge + 1,
                          height: ct - $e + 1
                        },
                        rl,
                        Rs
                      ), ns;
                    });
                  },
                  onPointerUp: (x) => {
                    var K;
                    const E = il.current;
                    E && ((K = E.releasePointerCapture) == null || K.call(E, x.pointerId)), ql.current = null;
                  },
                  onPointerLeave: (x) => {
                    var K;
                    const E = il.current;
                    E && ((K = E.releasePointerCapture) == null || K.call(E, x.pointerId)), ql.current = null;
                  }
                }
              ) }),
              /* @__PURE__ */ a.jsx("div", { className: "rom-import__preview", children: /* @__PURE__ */ a.jsx(
                "canvas",
                {
                  ref: ph,
                  className: "rom-import__canvas"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", {}),
            /* @__PURE__ */ a.jsx("button", { type: "button", onClick: Ay, children: "Send to Stamp Tool" })
          ] })
        ] })
      ] })
    ] }),
    D && ae && /* @__PURE__ */ a.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ a.jsx(
        "div",
        {
          className: "modal__backdrop",
          onClick: () => {
            H(!1), xe(null), le(null);
          }
        }
      ),
      /* @__PURE__ */ a.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ a.jsx("h2", { children: "Merge Project" }),
          /* @__PURE__ */ a.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                H(!1), xe(null), le(null);
              },
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Source" }),
            /* @__PURE__ */ a.jsx("span", { children: Q ?? "(unknown)" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Offset X" }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "number",
                value: O,
                onChange: (x) => ie(Number(x.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Offset Y" }),
            /* @__PURE__ */ a.jsx(
              "input",
              {
                type: "number",
                value: ye,
                onChange: (x) => W(Number(x.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", {}),
            /* @__PURE__ */ a.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  vb(ae, {
                    offsetX: O,
                    offsetY: ye
                  }), H(!1), xe(null), le(null);
                },
                children: "Merge Pixels"
              }
            )
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", {}),
            /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.8 }, children: "Current merge supports pixels only and requires identical palettes." })
          ] })
        ] })
      ] })
    ] }),
    c && /* @__PURE__ */ a.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: () => u(!1) }),
      /* @__PURE__ */ a.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ a.jsx("h2", { children: "Shortcut Map & Hotkeys" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => u(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "New" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+N" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Open" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+O" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Save" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+S" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Save As" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Shift+S" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Export PNG" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Shift+E" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Export GBR" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Shift+G" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Undo" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Z" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Redo" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Y / Ctrl+Shift+Z" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Copy Selection (active layer)" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+C" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Deep Copy Selection (merged)" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+Shift+C" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Cut Selection" }),
            /* @__PURE__ */ a.jsx("span", { children: "Ctrl+X" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.8 }, children: "Tool hotkeys" }),
            /* @__PURE__ */ a.jsx("span", { style: { opacity: 0.8 }, children: "Global" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Palette primary color 0–9" }),
            /* @__PURE__ */ a.jsx("span", { children: "0–9" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Pen / Rectangle / Oval" }),
            /* @__PURE__ */ a.jsx("span", { children: "P / R / O" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Spray / Line / Fill / Text" }),
            /* @__PURE__ */ a.jsx("span", { children: "S / L / F / T" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Eyedropper / Magic Wand" }),
            /* @__PURE__ */ a.jsx("span", { children: "E / W" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Stamp / Reference Handle / Scroll Selection" }),
            /* @__PURE__ */ a.jsx("span", { children: "V / H / Q" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Select Oval / Rectangle / Lasso" }),
            /* @__PURE__ */ a.jsx("span", { children: "Alt+O / Alt+R / Alt+P" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Tile tools" }),
            /* @__PURE__ */ a.jsx("span", { children: "Shift+S / Shift+P / Shift+R / Shift+N / Shift+E" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Trace Palette Range" }),
            /* @__PURE__ */ a.jsx("span", { children: "Reference panel button" })
          ] }),
          /* @__PURE__ */ a.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ a.jsx("span", { children: "Trace Max Colors" }),
            /* @__PURE__ */ a.jsx("span", { children: "Reference panel button" })
          ] })
        ] })
      ] })
    ] }),
    h && /* @__PURE__ */ a.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ a.jsx("div", { className: "modal__backdrop", onClick: () => p(!1) }),
      /* @__PURE__ */ a.jsxs("div", { className: "modal__content modal__content--license", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ a.jsx("h2", { children: "License" }),
          /* @__PURE__ */ a.jsx("button", { type: "button", onClick: () => p(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ a.jsx("div", { className: "modal__body modal__body--license", children: /* @__PURE__ */ a.jsx("pre", { className: "modal__license", children: 'MIT License Copyright (c) 2026 Joel Longanecker Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.' }) })
      ] })
    ] }),
    d && !e && /* @__PURE__ */ a.jsx(
      qM,
      {
        onClose: () => {
          f(!1);
        },
        onAdvancedModeChange: w
      }
    ),
    g && de === "text" && /* @__PURE__ */ a.jsx(
      ZM,
      {
        initialText: _,
        initialFontFamily: j,
        initialFontSize: L,
        onCancel: () => {
          y(!1), Re(S);
        },
        onConfirm: ({ text: x, fontFamily: E, fontSize: K }) => {
          C(x), A(E), F(K), VM({
            text: x,
            fontFamily: E,
            fontSize: K,
            paletteIndex: uy
          }), y(!1);
        }
      }
    ),
    P && de === "ai" && !e && /* @__PURE__ */ a.jsx(
      sb,
      {
        initialPrompt: G,
        onCancel: () => {
          z(!1), Re(Z);
        },
        onConfirm: ({ prompt: x }) => {
          ne(x), z(!1);
        }
      }
    )
  ] });
}, m_ = () => {
  const e = /* @__PURE__ */ new Set();
  let t = 1;
  window.projectApi = {
    save: async () => null,
    load: async () => null,
    read: async () => null,
    exportPng: async () => null,
    exportGbr: async () => null,
    exportChr: async () => null,
    exportBsave: async () => null,
    exportTileMap: async () => null,
    importImage: async () => null,
    exportImage: async () => null
  }, window.menuApi = {
    onAction: () => () => {
    }
  }, window.viewMenuApi = {
    setState: () => {
    }
  }, window.appApi = {
    setTitle: (n) => {
      document.title = n;
    }
  }, window.windowApi = {
    toggleFullscreen: async () => {
      var n, s, l;
      return document.fullscreenElement ? (await ((l = document.exitFullscreen) == null ? void 0 : l.call(document)), !1) : (await ((s = (n = document.documentElement).requestFullscreen) == null ? void 0 : s.call(n)), !0);
    },
    onFullscreenChange: () => () => {
    }
  }, window.debugApi = {
    logPerf: async () => null
  }, window.paletteApi = {
    importLospec: async () => {
      throw new Error("LoSpec import is unavailable in browser demo mode.");
    },
    onApply: () => () => {
    }
  }, window.optionsApi = {
    getOpenAiKeyInfo: async () => ({
      hasKey: !1,
      encryptionAvailable: !1,
      storedEncrypted: !1
    }),
    setOpenAiApiKey: async () => {
    },
    getOpenAiImageModel: async () => "gpt-image-1",
    setOpenAiImageModel: async () => {
    },
    getAiImageProvider: async () => "openai",
    setAiImageProvider: async () => {
    },
    getLocalAiConfig: async () => ({ baseUrl: "", model: "" }),
    setLocalAiBaseUrl: async () => {
    },
    setLocalAiImageModel: async () => {
    },
    getLocalAiKeyInfo: async () => ({
      hasKey: !1,
      encryptionAvailable: !1,
      storedEncrypted: !1
    }),
    setLocalAiApiKey: async () => {
    },
    getAdvancedMode: async () => !1,
    setAdvancedMode: async () => {
    }
  }, window.aiApi = {
    generateSprite: async () => {
      throw new Error("AI tools are disabled in browser demo mode.");
    }
  }, window.uiScaleApi = {
    getScale: () => t,
    resetScale: () => {
      t = 1, e.forEach((n) => n(t));
    },
    setScale: (n) => {
      Number.isFinite(n) && (t = Math.max(0.5, Math.min(3, n)), e.forEach((s) => s(t)));
    },
    stepScale: (n) => {
      !Number.isFinite(n) || n === 0 || (t = Math.max(0.5, Math.min(3, t * n)), e.forEach((s) => s(t)));
    },
    onScaleChange: (n) => (e.add(n), n(t), () => e.delete(n))
  };
};
class g_ extends Te.Component {
  constructor() {
    super(...arguments), this.state = { error: null };
  }
  static getDerivedStateFromError(t) {
    return { error: t };
  }
  componentDidCatch(t) {
    console.error("Browser demo crashed:", t);
  }
  render() {
    if (this.state.error) {
      const t = this.state.error instanceof Error ? `${this.state.error.name}: ${this.state.error.message}
${this.state.error.stack ?? ""}` : String(this.state.error);
      return /* @__PURE__ */ a.jsxs("div", { style: { padding: 16, fontFamily: "monospace", whiteSpace: "pre-wrap" }, children: [
        /* @__PURE__ */ a.jsx("h1", { style: { marginTop: 0 }, children: "Pixel Splash Studio demo crashed" }),
        /* @__PURE__ */ a.jsx("pre", { children: t })
      ] });
    }
    return this.props.children;
  }
}
const iy = document.getElementById("root");
if (!iy)
  throw new Error("Root element not found");
m_();
Bc.createRoot(iy).render(
  /* @__PURE__ */ a.jsx(Te.StrictMode, { children: /* @__PURE__ */ a.jsx(g_, { children: /* @__PURE__ */ a.jsx(p_, {}) }) })
);
