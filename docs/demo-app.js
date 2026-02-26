function Qp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zp = { exports: {} }, Gr = {}, qp = { exports: {} }, be = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $i = Symbol.for("react.element"), Ay = Symbol.for("react.portal"), Ly = Symbol.for("react.fragment"), Dy = Symbol.for("react.strict_mode"), By = Symbol.for("react.profiler"), Yy = Symbol.for("react.provider"), Xy = Symbol.for("react.context"), Fy = Symbol.for("react.forward_ref"), Oy = Symbol.for("react.suspense"), zy = Symbol.for("react.memo"), Hy = Symbol.for("react.lazy"), Bh = Symbol.iterator;
function Wy(e) {
  return e === null || typeof e != "object" ? null : (e = Bh && e[Bh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Jp = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, em = Object.assign, tm = {};
function Vl(e, t, n) {
  this.props = e, this.context = t, this.refs = tm, this.updater = n || Jp;
}
Vl.prototype.isReactComponent = {};
Vl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function nm() {
}
nm.prototype = Vl.prototype;
function Yu(e, t, n) {
  this.props = e, this.context = t, this.refs = tm, this.updater = n || Jp;
}
var Xu = Yu.prototype = new nm();
Xu.constructor = Yu;
em(Xu, Vl.prototype);
Xu.isPureReactComponent = !0;
var Yh = Array.isArray, sm = Object.prototype.hasOwnProperty, Fu = { current: null }, lm = { key: !0, ref: !0, __self: !0, __source: !0 };
function im(e, t, n) {
  var s, l = {}, i = null, o = null;
  if (t != null) for (s in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) sm.call(t, s) && !lm.hasOwnProperty(s) && (l[s] = t[s]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in a = e.defaultProps, a) l[s] === void 0 && (l[s] = a[s]);
  return { $$typeof: $i, type: e, key: i, ref: o, props: l, _owner: Fu.current };
}
function Uy(e, t) {
  return { $$typeof: $i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Ou(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $i;
}
function $y(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Xh = /\/+/g;
function Ya(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? $y("" + e.key) : t.toString(36);
}
function Jo(e, t, n, s, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (i) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case $i:
        case Ay:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = s === "" ? "." + Ya(o, 0) : s, Yh(l) ? (n = "", e != null && (n = e.replace(Xh, "$&/") + "/"), Jo(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Ou(l) && (l = Uy(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Xh, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, s = s === "" ? "." : s + ":", Yh(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var c = s + Ya(i, a);
    o += Jo(i, t, n, c, l);
  }
  else if (c = Wy(e), typeof c == "function") for (e = c.call(e), a = 0; !(i = e.next()).done; ) i = i.value, c = s + Ya(i, a++), o += Jo(i, t, n, c, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Po(e, t, n) {
  if (e == null) return e;
  var s = [], l = 0;
  return Jo(e, s, "", "", function(i) {
    return t.call(n, i, l++);
  }), s;
}
function Vy(e) {
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
var Lt = { current: null }, er = { transition: null }, Ky = { ReactCurrentDispatcher: Lt, ReactCurrentBatchConfig: er, ReactCurrentOwner: Fu };
function om() {
  throw Error("act(...) is not supported in production builds of React.");
}
be.Children = { map: Po, forEach: function(e, t, n) {
  Po(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Po(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Po(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Ou(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
be.Component = Vl;
be.Fragment = Ly;
be.Profiler = By;
be.PureComponent = Yu;
be.StrictMode = Dy;
be.Suspense = Oy;
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ky;
be.act = om;
be.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = em({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Fu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) sm.call(t, c) && !lm.hasOwnProperty(c) && (s[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) s.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
    s.children = a;
  }
  return { $$typeof: $i, type: e.type, key: l, ref: i, props: s, _owner: o };
};
be.createContext = function(e) {
  return e = { $$typeof: Xy, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Yy, _context: e }, e.Consumer = e;
};
be.createElement = im;
be.createFactory = function(e) {
  var t = im.bind(null, e);
  return t.type = e, t;
};
be.createRef = function() {
  return { current: null };
};
be.forwardRef = function(e) {
  return { $$typeof: Fy, render: e };
};
be.isValidElement = Ou;
be.lazy = function(e) {
  return { $$typeof: Hy, _payload: { _status: -1, _result: e }, _init: Vy };
};
be.memo = function(e, t) {
  return { $$typeof: zy, type: e, compare: t === void 0 ? null : t };
};
be.startTransition = function(e) {
  var t = er.transition;
  er.transition = {};
  try {
    e();
  } finally {
    er.transition = t;
  }
};
be.unstable_act = om;
be.useCallback = function(e, t) {
  return Lt.current.useCallback(e, t);
};
be.useContext = function(e) {
  return Lt.current.useContext(e);
};
be.useDebugValue = function() {
};
be.useDeferredValue = function(e) {
  return Lt.current.useDeferredValue(e);
};
be.useEffect = function(e, t) {
  return Lt.current.useEffect(e, t);
};
be.useId = function() {
  return Lt.current.useId();
};
be.useImperativeHandle = function(e, t, n) {
  return Lt.current.useImperativeHandle(e, t, n);
};
be.useInsertionEffect = function(e, t) {
  return Lt.current.useInsertionEffect(e, t);
};
be.useLayoutEffect = function(e, t) {
  return Lt.current.useLayoutEffect(e, t);
};
be.useMemo = function(e, t) {
  return Lt.current.useMemo(e, t);
};
be.useReducer = function(e, t, n) {
  return Lt.current.useReducer(e, t, n);
};
be.useRef = function(e) {
  return Lt.current.useRef(e);
};
be.useState = function(e) {
  return Lt.current.useState(e);
};
be.useSyncExternalStore = function(e, t, n) {
  return Lt.current.useSyncExternalStore(e, t, n);
};
be.useTransition = function() {
  return Lt.current.useTransition();
};
be.version = "18.3.1";
qp.exports = be;
var T = qp.exports;
const Te = /* @__PURE__ */ Qp(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gy = T, Qy = Symbol.for("react.element"), Zy = Symbol.for("react.fragment"), qy = Object.prototype.hasOwnProperty, Jy = Gy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, ev = { key: !0, ref: !0, __self: !0, __source: !0 };
function rm(e, t, n) {
  var s, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (s in t) qy.call(t, s) && !ev.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: Qy, type: e, key: i, ref: o, props: l, _owner: Jy.current };
}
Gr.Fragment = Zy;
Gr.jsx = rm;
Gr.jsxs = rm;
Zp.exports = Gr;
var r = Zp.exports, Ac = {}, am = { exports: {} }, Jt = {}, cm = { exports: {} }, um = {};
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
  function t(D, F) {
    var K = D.length;
    D.push(F);
    e: for (; 0 < K; ) {
      var le = K - 1 >>> 1, re = D[le];
      if (0 < l(re, F)) D[le] = F, D[K] = re, K = le;
      else break e;
    }
  }
  function n(D) {
    return D.length === 0 ? null : D[0];
  }
  function s(D) {
    if (D.length === 0) return null;
    var F = D[0], K = D.pop();
    if (K !== F) {
      D[0] = K;
      e: for (var le = 0, re = D.length, Se = re >>> 1; le < Se; ) {
        var X = 2 * (le + 1) - 1, ie = D[X], ge = X + 1, z = D[ge];
        if (0 > l(ie, K)) ge < re && 0 > l(z, ie) ? (D[le] = z, D[ge] = K, le = ge) : (D[le] = ie, D[X] = K, le = X);
        else if (ge < re && 0 > l(z, K)) D[le] = z, D[ge] = K, le = ge;
        else break e;
      }
    }
    return F;
  }
  function l(D, F) {
    var K = D.sortIndex - F.sortIndex;
    return K !== 0 ? K : D.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var o = Date, a = o.now();
    e.unstable_now = function() {
      return o.now() - a;
    };
  }
  var c = [], u = [], d = 1, f = null, h = 3, p = !1, g = !1, w = !1, M = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function x(D) {
    for (var F = n(u); F !== null; ) {
      if (F.callback === null) s(u);
      else if (F.startTime <= D) s(u), F.sortIndex = F.expirationTime, t(c, F);
      else break;
      F = n(u);
    }
  }
  function S(D) {
    if (w = !1, x(D), !g) if (n(c) !== null) g = !0, Q(b);
    else {
      var F = n(u);
      F !== null && te(S, F.startTime - D);
    }
  }
  function b(D, F) {
    g = !1, w && (w = !1, v(C), C = -1), p = !0;
    var K = h;
    try {
      for (x(F), f = n(c); f !== null && (!(f.expirationTime > F) || D && !Y()); ) {
        var le = f.callback;
        if (typeof le == "function") {
          f.callback = null, h = f.priorityLevel;
          var re = le(f.expirationTime <= F);
          F = e.unstable_now(), typeof re == "function" ? f.callback = re : f === n(c) && s(c), x(F);
        } else s(c);
        f = n(c);
      }
      if (f !== null) var Se = !0;
      else {
        var X = n(u);
        X !== null && te(S, X.startTime - F), Se = !1;
      }
      return Se;
    } finally {
      f = null, h = K, p = !1;
    }
  }
  var _ = !1, k = null, C = -1, A = 5, L = -1;
  function Y() {
    return !(e.unstable_now() - L < A);
  }
  function j() {
    if (k !== null) {
      var D = e.unstable_now();
      L = D;
      var F = !0;
      try {
        F = k(!0, D);
      } finally {
        F ? O() : (_ = !1, k = null);
      }
    } else _ = !1;
  }
  var O;
  if (typeof m == "function") O = function() {
    m(j);
  };
  else if (typeof MessageChannel < "u") {
    var G = new MessageChannel(), oe = G.port2;
    G.port1.onmessage = j, O = function() {
      oe.postMessage(null);
    };
  } else O = function() {
    M(j, 0);
  };
  function Q(D) {
    k = D, _ || (_ = !0, O());
  }
  function te(D, F) {
    C = M(function() {
      D(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, e.unstable_continueExecution = function() {
    g || p || (g = !0, Q(b));
  }, e.unstable_forceFrameRate = function(D) {
    0 > D || 125 < D ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < D ? Math.floor(1e3 / D) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(D) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var F = 3;
        break;
      default:
        F = h;
    }
    var K = h;
    h = F;
    try {
      return D();
    } finally {
      h = K;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(D, F) {
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
    var K = h;
    h = D;
    try {
      return F();
    } finally {
      h = K;
    }
  }, e.unstable_scheduleCallback = function(D, F, K) {
    var le = e.unstable_now();
    switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? le + K : le) : K = le, D) {
      case 1:
        var re = -1;
        break;
      case 2:
        re = 250;
        break;
      case 5:
        re = 1073741823;
        break;
      case 4:
        re = 1e4;
        break;
      default:
        re = 5e3;
    }
    return re = K + re, D = { id: d++, callback: F, priorityLevel: D, startTime: K, expirationTime: re, sortIndex: -1 }, K > le ? (D.sortIndex = K, t(u, D), n(c) === null && D === n(u) && (w ? (v(C), C = -1) : w = !0, te(S, K - le))) : (D.sortIndex = re, t(c, D), g || p || (g = !0, Q(b))), D;
  }, e.unstable_shouldYield = Y, e.unstable_wrapCallback = function(D) {
    var F = h;
    return function() {
      var K = h;
      h = F;
      try {
        return D.apply(this, arguments);
      } finally {
        h = K;
      }
    };
  };
})(um);
cm.exports = um;
var tv = cm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nv = T, qt = tv;
function H(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var dm = /* @__PURE__ */ new Set(), Pi = {};
function el(e, t) {
  Dl(e, t), Dl(e + "Capture", t);
}
function Dl(e, t) {
  for (Pi[e] = t, e = 0; e < t.length; e++) dm.add(t[e]);
}
var Vn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Lc = Object.prototype.hasOwnProperty, sv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Fh = {}, Oh = {};
function lv(e) {
  return Lc.call(Oh, e) ? !0 : Lc.call(Fh, e) ? !1 : sv.test(e) ? Oh[e] = !0 : (Fh[e] = !0, !1);
}
function iv(e, t, n, s) {
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
function ov(e, t, n, s) {
  if (t === null || typeof t > "u" || iv(e, t, n, s)) return !0;
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
function Dt(e, t, n, s, l, i, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = s, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = o;
}
var bt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  bt[e] = new Dt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  bt[t] = new Dt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  bt[e] = new Dt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  bt[e] = new Dt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  bt[e] = new Dt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  bt[e] = new Dt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  bt[e] = new Dt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  bt[e] = new Dt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  bt[e] = new Dt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var zu = /[\-:]([a-z])/g;
function Hu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    zu,
    Hu
  );
  bt[t] = new Dt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(zu, Hu);
  bt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(zu, Hu);
  bt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  bt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
bt.xlinkHref = new Dt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  bt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Wu(e, t, n, s) {
  var l = bt.hasOwnProperty(t) ? bt[t] : null;
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (ov(t, n, l, s) && (n = null), s || l === null ? lv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var qn = nv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Io = Symbol.for("react.element"), gl = Symbol.for("react.portal"), xl = Symbol.for("react.fragment"), Uu = Symbol.for("react.strict_mode"), Dc = Symbol.for("react.profiler"), hm = Symbol.for("react.provider"), fm = Symbol.for("react.context"), $u = Symbol.for("react.forward_ref"), Bc = Symbol.for("react.suspense"), Yc = Symbol.for("react.suspense_list"), Vu = Symbol.for("react.memo"), as = Symbol.for("react.lazy"), pm = Symbol.for("react.offscreen"), zh = Symbol.iterator;
function ti(e) {
  return e === null || typeof e != "object" ? null : (e = zh && e[zh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var et = Object.assign, Xa;
function fi(e) {
  if (Xa === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Xa = t && t[1] || "";
  }
  return `
` + Xa + e;
}
var Fa = !1;
function Oa(e, t) {
  if (!e || Fa) return "";
  Fa = !0;
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
`), o = l.length - 1, a = i.length - 1; 1 <= o && 0 <= a && l[o] !== i[a]; ) a--;
      for (; 1 <= o && 0 <= a; o--, a--) if (l[o] !== i[a]) {
        if (o !== 1 || a !== 1)
          do
            if (o--, a--, 0 > a || l[o] !== i[a]) {
              var c = `
` + l[o].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= o && 0 <= a);
        break;
      }
    }
  } finally {
    Fa = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? fi(e) : "";
}
function rv(e) {
  switch (e.tag) {
    case 5:
      return fi(e.type);
    case 16:
      return fi("Lazy");
    case 13:
      return fi("Suspense");
    case 19:
      return fi("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Oa(e.type, !1), e;
    case 11:
      return e = Oa(e.type.render, !1), e;
    case 1:
      return e = Oa(e.type, !0), e;
    default:
      return "";
  }
}
function Xc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case xl:
      return "Fragment";
    case gl:
      return "Portal";
    case Dc:
      return "Profiler";
    case Uu:
      return "StrictMode";
    case Bc:
      return "Suspense";
    case Yc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case fm:
      return (e.displayName || "Context") + ".Consumer";
    case hm:
      return (e._context.displayName || "Context") + ".Provider";
    case $u:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Vu:
      return t = e.displayName || null, t !== null ? t : Xc(e.type) || "Memo";
    case as:
      t = e._payload, e = e._init;
      try {
        return Xc(e(t));
      } catch {
      }
  }
  return null;
}
function av(e) {
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
      return Xc(t);
    case 8:
      return t === Uu ? "StrictMode" : "Mode";
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
function _s(e) {
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
function mm(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function cv(e) {
  var t = mm(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(o) {
      s = "" + o, i.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return s;
    }, setValue: function(o) {
      s = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function No(e) {
  e._valueTracker || (e._valueTracker = cv(e));
}
function gm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = mm(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
}
function mr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Fc(e, t) {
  var n = t.checked;
  return et({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Hh(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, s = t.checked != null ? t.checked : t.defaultChecked;
  n = _s(t.value != null ? t.value : n), e._wrapperState = { initialChecked: s, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function xm(e, t) {
  t = t.checked, t != null && Wu(e, "checked", t, !1);
}
function Oc(e, t) {
  xm(e, t);
  var n = _s(t.value), s = t.type;
  if (n != null) s === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? zc(e, t.type, n) : t.hasOwnProperty("defaultValue") && zc(e, t.type, _s(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Wh(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var s = t.type;
    if (!(s !== "submit" && s !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function zc(e, t, n) {
  (t !== "number" || mr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var pi = Array.isArray;
function jl(e, t, n, s) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && s && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + _s(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, s && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Hc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(H(91));
  return et({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Uh(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(H(92));
      if (pi(n)) {
        if (1 < n.length) throw Error(H(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: _s(n) };
}
function ym(e, t) {
  var n = _s(t.value), s = _s(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function $h(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function vm(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Wc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? vm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Eo, wm = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, s, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, s, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Eo = Eo || document.createElement("div"), Eo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Eo.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
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
var yi = {
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
}, uv = ["Webkit", "ms", "Moz", "O"];
Object.keys(yi).forEach(function(e) {
  uv.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), yi[t] = yi[e];
  });
});
function Sm(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yi.hasOwnProperty(e) && yi[e] ? ("" + t).trim() : t + "px";
}
function Mm(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var s = n.indexOf("--") === 0, l = Sm(n, t[n], s);
    n === "float" && (n = "cssFloat"), s ? e.setProperty(n, l) : e[n] = l;
  }
}
var dv = et({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Uc(e, t) {
  if (t) {
    if (dv[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(H(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(H(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(H(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(H(62));
  }
}
function $c(e, t) {
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
var Vc = null;
function Ku(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Kc = null, Pl = null, Il = null;
function Vh(e) {
  if (e = Gi(e)) {
    if (typeof Kc != "function") throw Error(H(280));
    var t = e.stateNode;
    t && (t = ea(t), Kc(e.stateNode, e.type, t));
  }
}
function bm(e) {
  Pl ? Il ? Il.push(e) : Il = [e] : Pl = e;
}
function _m() {
  if (Pl) {
    var e = Pl, t = Il;
    if (Il = Pl = null, Vh(e), t) for (e = 0; e < t.length; e++) Vh(t[e]);
  }
}
function Tm(e, t) {
  return e(t);
}
function km() {
}
var za = !1;
function Cm(e, t, n) {
  if (za) return e(t, n);
  za = !0;
  try {
    return Tm(e, t, n);
  } finally {
    za = !1, (Pl !== null || Il !== null) && (km(), _m());
  }
}
function Ni(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var s = ea(n);
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
  if (n && typeof n != "function") throw Error(H(231, t, typeof n));
  return n;
}
var Gc = !1;
if (Vn) try {
  var ni = {};
  Object.defineProperty(ni, "passive", { get: function() {
    Gc = !0;
  } }), window.addEventListener("test", ni, ni), window.removeEventListener("test", ni, ni);
} catch {
  Gc = !1;
}
function hv(e, t, n, s, l, i, o, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var vi = !1, gr = null, xr = !1, Qc = null, fv = { onError: function(e) {
  vi = !0, gr = e;
} };
function pv(e, t, n, s, l, i, o, a, c) {
  vi = !1, gr = null, hv.apply(fv, arguments);
}
function mv(e, t, n, s, l, i, o, a, c) {
  if (pv.apply(this, arguments), vi) {
    if (vi) {
      var u = gr;
      vi = !1, gr = null;
    } else throw Error(H(198));
    xr || (xr = !0, Qc = u);
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
function jm(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Kh(e) {
  if (tl(e) !== e) throw Error(H(188));
}
function gv(e) {
  var t = e.alternate;
  if (!t) {
    if (t = tl(e), t === null) throw Error(H(188));
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
        if (i === n) return Kh(l), e;
        if (i === s) return Kh(l), t;
        i = i.sibling;
      }
      throw Error(H(188));
    }
    if (n.return !== s.return) n = l, s = i;
    else {
      for (var o = !1, a = l.child; a; ) {
        if (a === n) {
          o = !0, n = l, s = i;
          break;
        }
        if (a === s) {
          o = !0, s = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!o) {
        for (a = i.child; a; ) {
          if (a === n) {
            o = !0, n = i, s = l;
            break;
          }
          if (a === s) {
            o = !0, s = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!o) throw Error(H(189));
      }
    }
    if (n.alternate !== s) throw Error(H(190));
  }
  if (n.tag !== 3) throw Error(H(188));
  return n.stateNode.current === n ? e : t;
}
function Pm(e) {
  return e = gv(e), e !== null ? Im(e) : null;
}
function Im(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Im(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Nm = qt.unstable_scheduleCallback, Gh = qt.unstable_cancelCallback, xv = qt.unstable_shouldYield, yv = qt.unstable_requestPaint, it = qt.unstable_now, vv = qt.unstable_getCurrentPriorityLevel, Gu = qt.unstable_ImmediatePriority, Em = qt.unstable_UserBlockingPriority, yr = qt.unstable_NormalPriority, wv = qt.unstable_LowPriority, Rm = qt.unstable_IdlePriority, Qr = null, Bn = null;
function Sv(e) {
  if (Bn && typeof Bn.onCommitFiberRoot == "function") try {
    Bn.onCommitFiberRoot(Qr, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var kn = Math.clz32 ? Math.clz32 : _v, Mv = Math.log, bv = Math.LN2;
function _v(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Mv(e) / bv | 0) | 0;
}
var Ro = 64, Ao = 4194304;
function mi(e) {
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
function vr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var s = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? s = mi(a) : (i &= o, i !== 0 && (s = mi(i)));
  } else o = n & ~l, o !== 0 ? s = mi(o) : i !== 0 && (s = mi(i));
  if (s === 0) return 0;
  if (t !== 0 && t !== s && !(t & l) && (l = s & -s, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (s & 4 && (s |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= s; 0 < t; ) n = 31 - kn(t), l = 1 << n, s |= e[n], t &= ~l;
  return s;
}
function Tv(e, t) {
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
function kv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - kn(i), a = 1 << o, c = l[o];
    c === -1 ? (!(a & n) || a & s) && (l[o] = Tv(a, t)) : c <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Zc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Am() {
  var e = Ro;
  return Ro <<= 1, !(Ro & 4194240) && (Ro = 64), e;
}
function Ha(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vi(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - kn(t), e[t] = n;
}
function Cv(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - kn(n), i = 1 << l;
    t[l] = 0, s[l] = -1, e[l] = -1, n &= ~i;
  }
}
function Qu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var s = 31 - kn(n), l = 1 << s;
    l & t | e[s] & t && (e[s] |= t), n &= ~l;
  }
}
var Le = 0;
function Lm(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Dm, Zu, Bm, Ym, Xm, qc = !1, Lo = [], gs = null, xs = null, ys = null, Ei = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Map(), us = [], jv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Qh(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      gs = null;
      break;
    case "dragenter":
    case "dragleave":
      xs = null;
      break;
    case "mouseover":
    case "mouseout":
      ys = null;
      break;
    case "pointerover":
    case "pointerout":
      Ei.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ri.delete(t.pointerId);
  }
}
function si(e, t, n, s, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: s, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Gi(t), t !== null && Zu(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Pv(e, t, n, s, l) {
  switch (t) {
    case "focusin":
      return gs = si(gs, e, t, n, s, l), !0;
    case "dragenter":
      return xs = si(xs, e, t, n, s, l), !0;
    case "mouseover":
      return ys = si(ys, e, t, n, s, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Ei.set(i, si(Ei.get(i) || null, e, t, n, s, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Ri.set(i, si(Ri.get(i) || null, e, t, n, s, l)), !0;
  }
  return !1;
}
function Fm(e) {
  var t = Xs(e.target);
  if (t !== null) {
    var n = tl(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = jm(n), t !== null) {
          e.blockedOn = t, Xm(e.priority, function() {
            Bm(n);
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
function tr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Jc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var s = new n.constructor(n.type, n);
      Vc = s, n.target.dispatchEvent(s), Vc = null;
    } else return t = Gi(n), t !== null && Zu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Zh(e, t, n) {
  tr(e) && n.delete(t);
}
function Iv() {
  qc = !1, gs !== null && tr(gs) && (gs = null), xs !== null && tr(xs) && (xs = null), ys !== null && tr(ys) && (ys = null), Ei.forEach(Zh), Ri.forEach(Zh);
}
function li(e, t) {
  e.blockedOn === t && (e.blockedOn = null, qc || (qc = !0, qt.unstable_scheduleCallback(qt.unstable_NormalPriority, Iv)));
}
function Ai(e) {
  function t(l) {
    return li(l, e);
  }
  if (0 < Lo.length) {
    li(Lo[0], e);
    for (var n = 1; n < Lo.length; n++) {
      var s = Lo[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (gs !== null && li(gs, e), xs !== null && li(xs, e), ys !== null && li(ys, e), Ei.forEach(t), Ri.forEach(t), n = 0; n < us.length; n++) s = us[n], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < us.length && (n = us[0], n.blockedOn === null); ) Fm(n), n.blockedOn === null && us.shift();
}
var Nl = qn.ReactCurrentBatchConfig, wr = !0;
function Nv(e, t, n, s) {
  var l = Le, i = Nl.transition;
  Nl.transition = null;
  try {
    Le = 1, qu(e, t, n, s);
  } finally {
    Le = l, Nl.transition = i;
  }
}
function Ev(e, t, n, s) {
  var l = Le, i = Nl.transition;
  Nl.transition = null;
  try {
    Le = 4, qu(e, t, n, s);
  } finally {
    Le = l, Nl.transition = i;
  }
}
function qu(e, t, n, s) {
  if (wr) {
    var l = Jc(e, t, n, s);
    if (l === null) Ja(e, t, s, Sr, n), Qh(e, s);
    else if (Pv(l, e, t, n, s)) s.stopPropagation();
    else if (Qh(e, s), t & 4 && -1 < jv.indexOf(e)) {
      for (; l !== null; ) {
        var i = Gi(l);
        if (i !== null && Dm(i), i = Jc(e, t, n, s), i === null && Ja(e, t, s, Sr, n), i === l) break;
        l = i;
      }
      l !== null && s.stopPropagation();
    } else Ja(e, t, s, null, n);
  }
}
var Sr = null;
function Jc(e, t, n, s) {
  if (Sr = null, e = Ku(s), e = Xs(e), e !== null) if (t = tl(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = jm(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Sr = e, null;
}
function Om(e) {
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
      switch (vv()) {
        case Gu:
          return 1;
        case Em:
          return 4;
        case yr:
        case wv:
          return 16;
        case Rm:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ps = null, Ju = null, nr = null;
function zm() {
  if (nr) return nr;
  var e, t = Ju, n = t.length, s, l = "value" in ps ? ps.value : ps.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (s = 1; s <= o && t[n - s] === l[i - s]; s++) ;
  return nr = l.slice(e, 1 < s ? 1 - s : void 0);
}
function sr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Do() {
  return !0;
}
function qh() {
  return !1;
}
function en(e) {
  function t(n, s, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = s, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Do : qh, this.isPropagationStopped = qh, this;
  }
  return et(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Do);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Do);
  }, persist: function() {
  }, isPersistent: Do }), t;
}
var Kl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, ed = en(Kl), Ki = et({}, Kl, { view: 0, detail: 0 }), Rv = en(Ki), Wa, Ua, ii, Zr = et({}, Ki, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: td, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ii && (ii && e.type === "mousemove" ? (Wa = e.screenX - ii.screenX, Ua = e.screenY - ii.screenY) : Ua = Wa = 0, ii = e), Wa);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ua;
} }), Jh = en(Zr), Av = et({}, Zr, { dataTransfer: 0 }), Lv = en(Av), Dv = et({}, Ki, { relatedTarget: 0 }), $a = en(Dv), Bv = et({}, Kl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yv = en(Bv), Xv = et({}, Kl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Fv = en(Xv), Ov = et({}, Kl, { data: 0 }), ef = en(Ov), zv = {
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
}, Hv = {
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
}, Wv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Uv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Wv[e]) ? !!t[e] : !1;
}
function td() {
  return Uv;
}
var $v = et({}, Ki, { key: function(e) {
  if (e.key) {
    var t = zv[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = sr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Hv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: td, charCode: function(e) {
  return e.type === "keypress" ? sr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? sr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Vv = en($v), Kv = et({}, Zr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), tf = en(Kv), Gv = et({}, Ki, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: td }), Qv = en(Gv), Zv = et({}, Kl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), qv = en(Zv), Jv = et({}, Zr, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), e0 = en(Jv), t0 = [9, 13, 27, 32], nd = Vn && "CompositionEvent" in window, wi = null;
Vn && "documentMode" in document && (wi = document.documentMode);
var n0 = Vn && "TextEvent" in window && !wi, Hm = Vn && (!nd || wi && 8 < wi && 11 >= wi), nf = " ", sf = !1;
function Wm(e, t) {
  switch (e) {
    case "keyup":
      return t0.indexOf(t.keyCode) !== -1;
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
function Um(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var yl = !1;
function s0(e, t) {
  switch (e) {
    case "compositionend":
      return Um(t);
    case "keypress":
      return t.which !== 32 ? null : (sf = !0, nf);
    case "textInput":
      return e = t.data, e === nf && sf ? null : e;
    default:
      return null;
  }
}
function l0(e, t) {
  if (yl) return e === "compositionend" || !nd && Wm(e, t) ? (e = zm(), nr = Ju = ps = null, yl = !1, e) : null;
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
      return Hm && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var i0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function lf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!i0[e.type] : t === "textarea";
}
function $m(e, t, n, s) {
  bm(s), t = Mr(t, "onChange"), 0 < t.length && (n = new ed("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var Si = null, Li = null;
function o0(e) {
  sg(e, 0);
}
function qr(e) {
  var t = Sl(e);
  if (gm(t)) return e;
}
function r0(e, t) {
  if (e === "change") return t;
}
var Vm = !1;
if (Vn) {
  var Va;
  if (Vn) {
    var Ka = "oninput" in document;
    if (!Ka) {
      var of = document.createElement("div");
      of.setAttribute("oninput", "return;"), Ka = typeof of.oninput == "function";
    }
    Va = Ka;
  } else Va = !1;
  Vm = Va && (!document.documentMode || 9 < document.documentMode);
}
function rf() {
  Si && (Si.detachEvent("onpropertychange", Km), Li = Si = null);
}
function Km(e) {
  if (e.propertyName === "value" && qr(Li)) {
    var t = [];
    $m(t, Li, e, Ku(e)), Cm(o0, t);
  }
}
function a0(e, t, n) {
  e === "focusin" ? (rf(), Si = t, Li = n, Si.attachEvent("onpropertychange", Km)) : e === "focusout" && rf();
}
function c0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return qr(Li);
}
function u0(e, t) {
  if (e === "click") return qr(t);
}
function d0(e, t) {
  if (e === "input" || e === "change") return qr(t);
}
function h0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var jn = typeof Object.is == "function" ? Object.is : h0;
function Di(e, t) {
  if (jn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), s = Object.keys(t);
  if (n.length !== s.length) return !1;
  for (s = 0; s < n.length; s++) {
    var l = n[s];
    if (!Lc.call(t, l) || !jn(e[l], t[l])) return !1;
  }
  return !0;
}
function af(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function cf(e, t) {
  var n = af(e);
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
    n = af(n);
  }
}
function Gm(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Qm() {
  for (var e = window, t = mr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = mr(e.document);
  }
  return t;
}
function sd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function f0(e) {
  var t = Qm(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gm(n.ownerDocument.documentElement, n)) {
    if (s !== null && sd(n)) {
      if (t = s.start, e = s.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(s.start, l);
        s = s.end === void 0 ? i : Math.min(s.end, l), !e.extend && i > s && (l = s, s = i, i = l), l = cf(n, i);
        var o = cf(
          n,
          s
        );
        l && o && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > s ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var p0 = Vn && "documentMode" in document && 11 >= document.documentMode, vl = null, eu = null, Mi = null, tu = !1;
function uf(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  tu || vl == null || vl !== mr(s) || (s = vl, "selectionStart" in s && sd(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Mi && Di(Mi, s) || (Mi = s, s = Mr(eu, "onSelect"), 0 < s.length && (t = new ed("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = vl)));
}
function Bo(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var wl = { animationend: Bo("Animation", "AnimationEnd"), animationiteration: Bo("Animation", "AnimationIteration"), animationstart: Bo("Animation", "AnimationStart"), transitionend: Bo("Transition", "TransitionEnd") }, Ga = {}, Zm = {};
Vn && (Zm = document.createElement("div").style, "AnimationEvent" in window || (delete wl.animationend.animation, delete wl.animationiteration.animation, delete wl.animationstart.animation), "TransitionEvent" in window || delete wl.transitionend.transition);
function Jr(e) {
  if (Ga[e]) return Ga[e];
  if (!wl[e]) return e;
  var t = wl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Zm) return Ga[e] = t[n];
  return e;
}
var qm = Jr("animationend"), Jm = Jr("animationiteration"), eg = Jr("animationstart"), tg = Jr("transitionend"), ng = /* @__PURE__ */ new Map(), df = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ks(e, t) {
  ng.set(e, t), el(t, [e]);
}
for (var Qa = 0; Qa < df.length; Qa++) {
  var Za = df[Qa], m0 = Za.toLowerCase(), g0 = Za[0].toUpperCase() + Za.slice(1);
  ks(m0, "on" + g0);
}
ks(qm, "onAnimationEnd");
ks(Jm, "onAnimationIteration");
ks(eg, "onAnimationStart");
ks("dblclick", "onDoubleClick");
ks("focusin", "onFocus");
ks("focusout", "onBlur");
ks(tg, "onTransitionEnd");
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
var gi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), x0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(gi));
function hf(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, mv(s, t, void 0, e), e.currentTarget = null;
}
function sg(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var s = e[n], l = s.event;
    s = s.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = s.length - 1; 0 <= o; o--) {
        var a = s[o], c = a.instance, u = a.currentTarget;
        if (a = a.listener, c !== i && l.isPropagationStopped()) break e;
        hf(l, a, u), i = c;
      }
      else for (o = 0; o < s.length; o++) {
        if (a = s[o], c = a.instance, u = a.currentTarget, a = a.listener, c !== i && l.isPropagationStopped()) break e;
        hf(l, a, u), i = c;
      }
    }
  }
  if (xr) throw e = Qc, xr = !1, Qc = null, e;
}
function He(e, t) {
  var n = t[ou];
  n === void 0 && (n = t[ou] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  n.has(s) || (lg(t, e, 2, !1), n.add(s));
}
function qa(e, t, n) {
  var s = 0;
  t && (s |= 4), lg(n, e, s, t);
}
var Yo = "_reactListening" + Math.random().toString(36).slice(2);
function Bi(e) {
  if (!e[Yo]) {
    e[Yo] = !0, dm.forEach(function(n) {
      n !== "selectionchange" && (x0.has(n) || qa(n, !1, e), qa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Yo] || (t[Yo] = !0, qa("selectionchange", !1, t));
  }
}
function lg(e, t, n, s) {
  switch (Om(t)) {
    case 1:
      var l = Nv;
      break;
    case 4:
      l = Ev;
      break;
    default:
      l = qu;
  }
  n = l.bind(null, t, n, e), l = void 0, !Gc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), s ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Ja(e, t, n, s, l) {
  var i = s;
  if (!(t & 1) && !(t & 2) && s !== null) e: for (; ; ) {
    if (s === null) return;
    var o = s.tag;
    if (o === 3 || o === 4) {
      var a = s.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (o === 4) for (o = s.return; o !== null; ) {
        var c = o.tag;
        if ((c === 3 || c === 4) && (c = o.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        o = o.return;
      }
      for (; a !== null; ) {
        if (o = Xs(a), o === null) return;
        if (c = o.tag, c === 5 || c === 6) {
          s = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    s = s.return;
  }
  Cm(function() {
    var u = i, d = Ku(n), f = [];
    e: {
      var h = ng.get(e);
      if (h !== void 0) {
        var p = ed, g = e;
        switch (e) {
          case "keypress":
            if (sr(n) === 0) break e;
          case "keydown":
          case "keyup":
            p = Vv;
            break;
          case "focusin":
            g = "focus", p = $a;
            break;
          case "focusout":
            g = "blur", p = $a;
            break;
          case "beforeblur":
          case "afterblur":
            p = $a;
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
            p = Jh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = Lv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = Qv;
            break;
          case qm:
          case Jm:
          case eg:
            p = Yv;
            break;
          case tg:
            p = qv;
            break;
          case "scroll":
            p = Rv;
            break;
          case "wheel":
            p = e0;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = Fv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = tf;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", v = w ? h !== null ? h + "Capture" : null : h;
        w = [];
        for (var m = u, x; m !== null; ) {
          x = m;
          var S = x.stateNode;
          if (x.tag === 5 && S !== null && (x = S, v !== null && (S = Ni(m, v), S != null && w.push(Yi(m, S, x)))), M) break;
          m = m.return;
        }
        0 < w.length && (h = new p(h, g, null, n, d), f.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", h && n !== Vc && (g = n.relatedTarget || n.fromElement) && (Xs(g) || g[Kn])) break e;
        if ((p || h) && (h = d.window === d ? d : (h = d.ownerDocument) ? h.defaultView || h.parentWindow : window, p ? (g = n.relatedTarget || n.toElement, p = u, g = g ? Xs(g) : null, g !== null && (M = tl(g), g !== M || g.tag !== 5 && g.tag !== 6) && (g = null)) : (p = null, g = u), p !== g)) {
          if (w = Jh, S = "onMouseLeave", v = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (w = tf, S = "onPointerLeave", v = "onPointerEnter", m = "pointer"), M = p == null ? h : Sl(p), x = g == null ? h : Sl(g), h = new w(S, m + "leave", p, n, d), h.target = M, h.relatedTarget = x, S = null, Xs(d) === u && (w = new w(v, m + "enter", g, n, d), w.target = x, w.relatedTarget = M, S = w), M = S, p && g) t: {
            for (w = p, v = g, m = 0, x = w; x; x = dl(x)) m++;
            for (x = 0, S = v; S; S = dl(S)) x++;
            for (; 0 < m - x; ) w = dl(w), m--;
            for (; 0 < x - m; ) v = dl(v), x--;
            for (; m--; ) {
              if (w === v || v !== null && w === v.alternate) break t;
              w = dl(w), v = dl(v);
            }
            w = null;
          }
          else w = null;
          p !== null && ff(f, h, p, w, !1), g !== null && M !== null && ff(f, M, g, w, !0);
        }
      }
      e: {
        if (h = u ? Sl(u) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file") var b = r0;
        else if (lf(h)) if (Vm) b = d0;
        else {
          b = c0;
          var _ = a0;
        }
        else (p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (b = u0);
        if (b && (b = b(e, u))) {
          $m(f, b, n, d);
          break e;
        }
        _ && _(e, h, u), e === "focusout" && (_ = h._wrapperState) && _.controlled && h.type === "number" && zc(h, "number", h.value);
      }
      switch (_ = u ? Sl(u) : window, e) {
        case "focusin":
          (lf(_) || _.contentEditable === "true") && (vl = _, eu = u, Mi = null);
          break;
        case "focusout":
          Mi = eu = vl = null;
          break;
        case "mousedown":
          tu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          tu = !1, uf(f, n, d);
          break;
        case "selectionchange":
          if (p0) break;
        case "keydown":
        case "keyup":
          uf(f, n, d);
      }
      var k;
      if (nd) e: {
        switch (e) {
          case "compositionstart":
            var C = "onCompositionStart";
            break e;
          case "compositionend":
            C = "onCompositionEnd";
            break e;
          case "compositionupdate":
            C = "onCompositionUpdate";
            break e;
        }
        C = void 0;
      }
      else yl ? Wm(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (Hm && n.locale !== "ko" && (yl || C !== "onCompositionStart" ? C === "onCompositionEnd" && yl && (k = zm()) : (ps = d, Ju = "value" in ps ? ps.value : ps.textContent, yl = !0)), _ = Mr(u, C), 0 < _.length && (C = new ef(C, e, null, n, d), f.push({ event: C, listeners: _ }), k ? C.data = k : (k = Um(n), k !== null && (C.data = k)))), (k = n0 ? s0(e, n) : l0(e, n)) && (u = Mr(u, "onBeforeInput"), 0 < u.length && (d = new ef("onBeforeInput", "beforeinput", null, n, d), f.push({ event: d, listeners: u }), d.data = k));
    }
    sg(f, t);
  });
}
function Yi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Mr(e, t) {
  for (var n = t + "Capture", s = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Ni(e, n), i != null && s.unshift(Yi(e, i, l)), i = Ni(e, t), i != null && s.push(Yi(e, i, l))), e = e.return;
  }
  return s;
}
function dl(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ff(e, t, n, s, l) {
  for (var i = t._reactName, o = []; n !== null && n !== s; ) {
    var a = n, c = a.alternate, u = a.stateNode;
    if (c !== null && c === s) break;
    a.tag === 5 && u !== null && (a = u, l ? (c = Ni(n, i), c != null && o.unshift(Yi(n, c, a))) : l || (c = Ni(n, i), c != null && o.push(Yi(n, c, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var y0 = /\r\n?/g, v0 = /\u0000|\uFFFD/g;
function pf(e) {
  return (typeof e == "string" ? e : "" + e).replace(y0, `
`).replace(v0, "");
}
function Xo(e, t, n) {
  if (t = pf(t), pf(e) !== t && n) throw Error(H(425));
}
function br() {
}
var nu = null, su = null;
function lu(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var iu = typeof setTimeout == "function" ? setTimeout : void 0, w0 = typeof clearTimeout == "function" ? clearTimeout : void 0, mf = typeof Promise == "function" ? Promise : void 0, S0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof mf < "u" ? function(e) {
  return mf.resolve(null).then(e).catch(M0);
} : iu;
function M0(e) {
  setTimeout(function() {
    throw e;
  });
}
function ec(e, t) {
  var n = t, s = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (s === 0) {
        e.removeChild(l), Ai(t);
        return;
      }
      s--;
    } else n !== "$" && n !== "$?" && n !== "$!" || s++;
    n = l;
  } while (n);
  Ai(t);
}
function vs(e) {
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
function gf(e) {
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
var Gl = Math.random().toString(36).slice(2), Dn = "__reactFiber$" + Gl, Xi = "__reactProps$" + Gl, Kn = "__reactContainer$" + Gl, ou = "__reactEvents$" + Gl, b0 = "__reactListeners$" + Gl, _0 = "__reactHandles$" + Gl;
function Xs(e) {
  var t = e[Dn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Kn] || n[Dn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = gf(e); e !== null; ) {
        if (n = e[Dn]) return n;
        e = gf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Gi(e) {
  return e = e[Dn] || e[Kn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Sl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(H(33));
}
function ea(e) {
  return e[Xi] || null;
}
var ru = [], Ml = -1;
function Cs(e) {
  return { current: e };
}
function We(e) {
  0 > Ml || (e.current = ru[Ml], ru[Ml] = null, Ml--);
}
function Xe(e, t) {
  Ml++, ru[Ml] = e.current, e.current = t;
}
var Ts = {}, Pt = Cs(Ts), Ht = Cs(!1), $s = Ts;
function Bl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ts;
  var s = e.stateNode;
  if (s && s.__reactInternalMemoizedUnmaskedChildContext === t) return s.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Wt(e) {
  return e = e.childContextTypes, e != null;
}
function _r() {
  We(Ht), We(Pt);
}
function xf(e, t, n) {
  if (Pt.current !== Ts) throw Error(H(168));
  Xe(Pt, t), Xe(Ht, n);
}
function ig(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(H(108, av(e) || "Unknown", l));
  return et({}, n, s);
}
function Tr(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ts, $s = Pt.current, Xe(Pt, e), Xe(Ht, Ht.current), !0;
}
function yf(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(H(169));
  n ? (e = ig(e, t, $s), s.__reactInternalMemoizedMergedChildContext = e, We(Ht), We(Pt), Xe(Pt, e)) : We(Ht), Xe(Ht, n);
}
var zn = null, ta = !1, tc = !1;
function og(e) {
  zn === null ? zn = [e] : zn.push(e);
}
function T0(e) {
  ta = !0, og(e);
}
function js() {
  if (!tc && zn !== null) {
    tc = !0;
    var e = 0, t = Le;
    try {
      var n = zn;
      for (Le = 1; e < n.length; e++) {
        var s = n[e];
        do
          s = s(!0);
        while (s !== null);
      }
      zn = null, ta = !1;
    } catch (l) {
      throw zn !== null && (zn = zn.slice(e + 1)), Nm(Gu, js), l;
    } finally {
      Le = t, tc = !1;
    }
  }
  return null;
}
var bl = [], _l = 0, kr = null, Cr = 0, un = [], dn = 0, Vs = null, Hn = 1, Wn = "";
function Ds(e, t) {
  bl[_l++] = Cr, bl[_l++] = kr, kr = e, Cr = t;
}
function rg(e, t, n) {
  un[dn++] = Hn, un[dn++] = Wn, un[dn++] = Vs, Vs = e;
  var s = Hn;
  e = Wn;
  var l = 32 - kn(s) - 1;
  s &= ~(1 << l), n += 1;
  var i = 32 - kn(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (s & (1 << o) - 1).toString(32), s >>= o, l -= o, Hn = 1 << 32 - kn(t) + l | n << l | s, Wn = i + e;
  } else Hn = 1 << i | n << l | s, Wn = e;
}
function ld(e) {
  e.return !== null && (Ds(e, 1), rg(e, 1, 0));
}
function id(e) {
  for (; e === kr; ) kr = bl[--_l], bl[_l] = null, Cr = bl[--_l], bl[_l] = null;
  for (; e === Vs; ) Vs = un[--dn], un[dn] = null, Wn = un[--dn], un[dn] = null, Hn = un[--dn], un[dn] = null;
}
var Zt = null, Qt = null, Qe = !1, Tn = null;
function ag(e, t) {
  var n = fn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function vf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Zt = e, Qt = vs(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Zt = e, Qt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vs !== null ? { id: Hn, overflow: Wn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = fn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Zt = e, Qt = null, !0) : !1;
    default:
      return !1;
  }
}
function au(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function cu(e) {
  if (Qe) {
    var t = Qt;
    if (t) {
      var n = t;
      if (!vf(e, t)) {
        if (au(e)) throw Error(H(418));
        t = vs(n.nextSibling);
        var s = Zt;
        t && vf(e, t) ? ag(s, n) : (e.flags = e.flags & -4097 | 2, Qe = !1, Zt = e);
      }
    } else {
      if (au(e)) throw Error(H(418));
      e.flags = e.flags & -4097 | 2, Qe = !1, Zt = e;
    }
  }
}
function wf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Zt = e;
}
function Fo(e) {
  if (e !== Zt) return !1;
  if (!Qe) return wf(e), Qe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !lu(e.type, e.memoizedProps)), t && (t = Qt)) {
    if (au(e)) throw cg(), Error(H(418));
    for (; t; ) ag(e, t), t = vs(t.nextSibling);
  }
  if (wf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(H(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Qt = vs(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Qt = null;
    }
  } else Qt = Zt ? vs(e.stateNode.nextSibling) : null;
  return !0;
}
function cg() {
  for (var e = Qt; e; ) e = vs(e.nextSibling);
}
function Yl() {
  Qt = Zt = null, Qe = !1;
}
function od(e) {
  Tn === null ? Tn = [e] : Tn.push(e);
}
var k0 = qn.ReactCurrentBatchConfig;
function oi(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(H(309));
        var s = n.stateNode;
      }
      if (!s) throw Error(H(147, e));
      var l = s, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(H(284));
    if (!n._owner) throw Error(H(290, e));
  }
  return e;
}
function Oo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(H(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Sf(e) {
  var t = e._init;
  return t(e._payload);
}
function ug(e) {
  function t(v, m) {
    if (e) {
      var x = v.deletions;
      x === null ? (v.deletions = [m], v.flags |= 16) : x.push(m);
    }
  }
  function n(v, m) {
    if (!e) return null;
    for (; m !== null; ) t(v, m), m = m.sibling;
    return null;
  }
  function s(v, m) {
    for (v = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? v.set(m.key, m) : v.set(m.index, m), m = m.sibling;
    return v;
  }
  function l(v, m) {
    return v = bs(v, m), v.index = 0, v.sibling = null, v;
  }
  function i(v, m, x) {
    return v.index = x, e ? (x = v.alternate, x !== null ? (x = x.index, x < m ? (v.flags |= 2, m) : x) : (v.flags |= 2, m)) : (v.flags |= 1048576, m);
  }
  function o(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, m, x, S) {
    return m === null || m.tag !== 6 ? (m = ac(x, v.mode, S), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function c(v, m, x, S) {
    var b = x.type;
    return b === xl ? d(v, m, x.props.children, S, x.key) : m !== null && (m.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && Sf(b) === m.type) ? (S = l(m, x.props), S.ref = oi(v, m, x), S.return = v, S) : (S = ur(x.type, x.key, x.props, null, v.mode, S), S.ref = oi(v, m, x), S.return = v, S);
  }
  function u(v, m, x, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== x.containerInfo || m.stateNode.implementation !== x.implementation ? (m = cc(x, v.mode, S), m.return = v, m) : (m = l(m, x.children || []), m.return = v, m);
  }
  function d(v, m, x, S, b) {
    return m === null || m.tag !== 7 ? (m = Ws(x, v.mode, S, b), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function f(v, m, x) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = ac("" + m, v.mode, x), m.return = v, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Io:
          return x = ur(m.type, m.key, m.props, null, v.mode, x), x.ref = oi(v, null, m), x.return = v, x;
        case gl:
          return m = cc(m, v.mode, x), m.return = v, m;
        case as:
          var S = m._init;
          return f(v, S(m._payload), x);
      }
      if (pi(m) || ti(m)) return m = Ws(m, v.mode, x, null), m.return = v, m;
      Oo(v, m);
    }
    return null;
  }
  function h(v, m, x, S) {
    var b = m !== null ? m.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return b !== null ? null : a(v, m, "" + x, S);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Io:
          return x.key === b ? c(v, m, x, S) : null;
        case gl:
          return x.key === b ? u(v, m, x, S) : null;
        case as:
          return b = x._init, h(
            v,
            m,
            b(x._payload),
            S
          );
      }
      if (pi(x) || ti(x)) return b !== null ? null : d(v, m, x, S, null);
      Oo(v, x);
    }
    return null;
  }
  function p(v, m, x, S, b) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return v = v.get(x) || null, a(m, v, "" + S, b);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Io:
          return v = v.get(S.key === null ? x : S.key) || null, c(m, v, S, b);
        case gl:
          return v = v.get(S.key === null ? x : S.key) || null, u(m, v, S, b);
        case as:
          var _ = S._init;
          return p(v, m, x, _(S._payload), b);
      }
      if (pi(S) || ti(S)) return v = v.get(x) || null, d(m, v, S, b, null);
      Oo(m, S);
    }
    return null;
  }
  function g(v, m, x, S) {
    for (var b = null, _ = null, k = m, C = m = 0, A = null; k !== null && C < x.length; C++) {
      k.index > C ? (A = k, k = null) : A = k.sibling;
      var L = h(v, k, x[C], S);
      if (L === null) {
        k === null && (k = A);
        break;
      }
      e && k && L.alternate === null && t(v, k), m = i(L, m, C), _ === null ? b = L : _.sibling = L, _ = L, k = A;
    }
    if (C === x.length) return n(v, k), Qe && Ds(v, C), b;
    if (k === null) {
      for (; C < x.length; C++) k = f(v, x[C], S), k !== null && (m = i(k, m, C), _ === null ? b = k : _.sibling = k, _ = k);
      return Qe && Ds(v, C), b;
    }
    for (k = s(v, k); C < x.length; C++) A = p(k, v, C, x[C], S), A !== null && (e && A.alternate !== null && k.delete(A.key === null ? C : A.key), m = i(A, m, C), _ === null ? b = A : _.sibling = A, _ = A);
    return e && k.forEach(function(Y) {
      return t(v, Y);
    }), Qe && Ds(v, C), b;
  }
  function w(v, m, x, S) {
    var b = ti(x);
    if (typeof b != "function") throw Error(H(150));
    if (x = b.call(x), x == null) throw Error(H(151));
    for (var _ = b = null, k = m, C = m = 0, A = null, L = x.next(); k !== null && !L.done; C++, L = x.next()) {
      k.index > C ? (A = k, k = null) : A = k.sibling;
      var Y = h(v, k, L.value, S);
      if (Y === null) {
        k === null && (k = A);
        break;
      }
      e && k && Y.alternate === null && t(v, k), m = i(Y, m, C), _ === null ? b = Y : _.sibling = Y, _ = Y, k = A;
    }
    if (L.done) return n(
      v,
      k
    ), Qe && Ds(v, C), b;
    if (k === null) {
      for (; !L.done; C++, L = x.next()) L = f(v, L.value, S), L !== null && (m = i(L, m, C), _ === null ? b = L : _.sibling = L, _ = L);
      return Qe && Ds(v, C), b;
    }
    for (k = s(v, k); !L.done; C++, L = x.next()) L = p(k, v, C, L.value, S), L !== null && (e && L.alternate !== null && k.delete(L.key === null ? C : L.key), m = i(L, m, C), _ === null ? b = L : _.sibling = L, _ = L);
    return e && k.forEach(function(j) {
      return t(v, j);
    }), Qe && Ds(v, C), b;
  }
  function M(v, m, x, S) {
    if (typeof x == "object" && x !== null && x.type === xl && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Io:
          e: {
            for (var b = x.key, _ = m; _ !== null; ) {
              if (_.key === b) {
                if (b = x.type, b === xl) {
                  if (_.tag === 7) {
                    n(v, _.sibling), m = l(_, x.props.children), m.return = v, v = m;
                    break e;
                  }
                } else if (_.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && Sf(b) === _.type) {
                  n(v, _.sibling), m = l(_, x.props), m.ref = oi(v, _, x), m.return = v, v = m;
                  break e;
                }
                n(v, _);
                break;
              } else t(v, _);
              _ = _.sibling;
            }
            x.type === xl ? (m = Ws(x.props.children, v.mode, S, x.key), m.return = v, v = m) : (S = ur(x.type, x.key, x.props, null, v.mode, S), S.ref = oi(v, m, x), S.return = v, v = S);
          }
          return o(v);
        case gl:
          e: {
            for (_ = x.key; m !== null; ) {
              if (m.key === _) if (m.tag === 4 && m.stateNode.containerInfo === x.containerInfo && m.stateNode.implementation === x.implementation) {
                n(v, m.sibling), m = l(m, x.children || []), m.return = v, v = m;
                break e;
              } else {
                n(v, m);
                break;
              }
              else t(v, m);
              m = m.sibling;
            }
            m = cc(x, v.mode, S), m.return = v, v = m;
          }
          return o(v);
        case as:
          return _ = x._init, M(v, m, _(x._payload), S);
      }
      if (pi(x)) return g(v, m, x, S);
      if (ti(x)) return w(v, m, x, S);
      Oo(v, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, m !== null && m.tag === 6 ? (n(v, m.sibling), m = l(m, x), m.return = v, v = m) : (n(v, m), m = ac(x, v.mode, S), m.return = v, v = m), o(v)) : n(v, m);
  }
  return M;
}
var Xl = ug(!0), dg = ug(!1), jr = Cs(null), Pr = null, Tl = null, rd = null;
function ad() {
  rd = Tl = Pr = null;
}
function cd(e) {
  var t = jr.current;
  We(jr), e._currentValue = t;
}
function uu(e, t, n) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function El(e, t) {
  Pr = e, rd = Tl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ft = !0), e.firstContext = null);
}
function xn(e) {
  var t = e._currentValue;
  if (rd !== e) if (e = { context: e, memoizedValue: t, next: null }, Tl === null) {
    if (Pr === null) throw Error(H(308));
    Tl = e, Pr.dependencies = { lanes: 0, firstContext: e };
  } else Tl = Tl.next = e;
  return t;
}
var Fs = null;
function ud(e) {
  Fs === null ? Fs = [e] : Fs.push(e);
}
function hg(e, t, n, s) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ud(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Gn(e, s);
}
function Gn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var cs = !1;
function dd(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function fg(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Un(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function ws(e, t, n) {
  var s = e.updateQueue;
  if (s === null) return null;
  if (s = s.shared, ke & 2) {
    var l = s.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), s.pending = t, Gn(e, n);
  }
  return l = s.interleaved, l === null ? (t.next = t, ud(s)) : (t.next = l.next, l.next = t), s.interleaved = t, Gn(e, n);
}
function lr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Qu(e, n);
  }
}
function Mf(e, t) {
  var n = e.updateQueue, s = e.alternate;
  if (s !== null && (s = s.updateQueue, n === s)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = o : i = i.next = o, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: s.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: s.shared, effects: s.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Ir(e, t, n, s) {
  var l = e.updateQueue;
  cs = !1;
  var i = l.firstBaseUpdate, o = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, u = c.next;
    c.next = null, o === null ? i = u : o.next = u, o = c;
    var d = e.alternate;
    d !== null && (d = d.updateQueue, a = d.lastBaseUpdate, a !== o && (a === null ? d.firstBaseUpdate = u : a.next = u, d.lastBaseUpdate = c));
  }
  if (i !== null) {
    var f = l.baseState;
    o = 0, d = u = c = null, a = i;
    do {
      var h = a.lane, p = a.eventTime;
      if ((s & h) === h) {
        d !== null && (d = d.next = {
          eventTime: p,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, w = a;
          switch (h = t, p = n, w.tag) {
            case 1:
              if (g = w.payload, typeof g == "function") {
                f = g.call(p, f, h);
                break e;
              }
              f = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = w.payload, h = typeof g == "function" ? g.call(p, f, h) : g, h == null) break e;
              f = et({}, f, h);
              break e;
            case 2:
              cs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else p = { eventTime: p, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, d === null ? (u = d = p, c = f) : d = d.next = p, o |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (d === null && (c = f), l.baseState = c, l.firstBaseUpdate = u, l.lastBaseUpdate = d, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        o |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    Gs |= o, e.lanes = o, e.memoizedState = f;
  }
}
function bf(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var s = e[t], l = s.callback;
    if (l !== null) {
      if (s.callback = null, s = n, typeof l != "function") throw Error(H(191, l));
      l.call(s);
    }
  }
}
var Qi = {}, Yn = Cs(Qi), Fi = Cs(Qi), Oi = Cs(Qi);
function Os(e) {
  if (e === Qi) throw Error(H(174));
  return e;
}
function hd(e, t) {
  switch (Xe(Oi, t), Xe(Fi, e), Xe(Yn, Qi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Wc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Wc(t, e);
  }
  We(Yn), Xe(Yn, t);
}
function Fl() {
  We(Yn), We(Fi), We(Oi);
}
function pg(e) {
  Os(Oi.current);
  var t = Os(Yn.current), n = Wc(t, e.type);
  t !== n && (Xe(Fi, e), Xe(Yn, n));
}
function fd(e) {
  Fi.current === e && (We(Yn), We(Fi));
}
var qe = Cs(0);
function Nr(e) {
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
var nc = [];
function pd() {
  for (var e = 0; e < nc.length; e++) nc[e]._workInProgressVersionPrimary = null;
  nc.length = 0;
}
var ir = qn.ReactCurrentDispatcher, sc = qn.ReactCurrentBatchConfig, Ks = 0, Je = null, ht = null, gt = null, Er = !1, bi = !1, zi = 0, C0 = 0;
function Tt() {
  throw Error(H(321));
}
function md(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!jn(e[n], t[n])) return !1;
  return !0;
}
function gd(e, t, n, s, l, i) {
  if (Ks = i, Je = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ir.current = e === null || e.memoizedState === null ? N0 : E0, e = n(s, l), bi) {
    i = 0;
    do {
      if (bi = !1, zi = 0, 25 <= i) throw Error(H(301));
      i += 1, gt = ht = null, t.updateQueue = null, ir.current = R0, e = n(s, l);
    } while (bi);
  }
  if (ir.current = Rr, t = ht !== null && ht.next !== null, Ks = 0, gt = ht = Je = null, Er = !1, t) throw Error(H(300));
  return e;
}
function xd() {
  var e = zi !== 0;
  return zi = 0, e;
}
function An() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return gt === null ? Je.memoizedState = gt = e : gt = gt.next = e, gt;
}
function yn() {
  if (ht === null) {
    var e = Je.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ht.next;
  var t = gt === null ? Je.memoizedState : gt.next;
  if (t !== null) gt = t, ht = e;
  else {
    if (e === null) throw Error(H(310));
    ht = e, e = { memoizedState: ht.memoizedState, baseState: ht.baseState, baseQueue: ht.baseQueue, queue: ht.queue, next: null }, gt === null ? Je.memoizedState = gt = e : gt = gt.next = e;
  }
  return gt;
}
function Hi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function lc(e) {
  var t = yn(), n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var s = ht, l = s.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var o = l.next;
      l.next = i.next, i.next = o;
    }
    s.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, s = s.baseState;
    var a = o = null, c = null, u = i;
    do {
      var d = u.lane;
      if ((Ks & d) === d) c !== null && (c = c.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), s = u.hasEagerState ? u.eagerState : e(s, u.action);
      else {
        var f = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        c === null ? (a = c = f, o = s) : c = c.next = f, Je.lanes |= d, Gs |= d;
      }
      u = u.next;
    } while (u !== null && u !== i);
    c === null ? o = s : c.next = a, jn(s, t.memoizedState) || (Ft = !0), t.memoizedState = s, t.baseState = o, t.baseQueue = c, n.lastRenderedState = s;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Je.lanes |= i, Gs |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ic(e) {
  var t = yn(), n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var s = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    jn(i, t.memoizedState) || (Ft = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, s];
}
function mg() {
}
function gg(e, t) {
  var n = Je, s = yn(), l = t(), i = !jn(s.memoizedState, l);
  if (i && (s.memoizedState = l, Ft = !0), s = s.queue, yd(vg.bind(null, n, s, e), [e]), s.getSnapshot !== t || i || gt !== null && gt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Wi(9, yg.bind(null, n, s, l, t), void 0, null), xt === null) throw Error(H(349));
    Ks & 30 || xg(n, t, l);
  }
  return l;
}
function xg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Je.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Je.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function yg(e, t, n, s) {
  t.value = n, t.getSnapshot = s, wg(t) && Sg(e);
}
function vg(e, t, n) {
  return n(function() {
    wg(t) && Sg(e);
  });
}
function wg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !jn(e, n);
  } catch {
    return !0;
  }
}
function Sg(e) {
  var t = Gn(e, 1);
  t !== null && Cn(t, e, 1, -1);
}
function _f(e) {
  var t = An();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Hi, lastRenderedState: e }, t.queue = e, e = e.dispatch = I0.bind(null, Je, e), [t.memoizedState, e];
}
function Wi(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = Je.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Je.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function Mg() {
  return yn().memoizedState;
}
function or(e, t, n, s) {
  var l = An();
  Je.flags |= e, l.memoizedState = Wi(1 | t, n, void 0, s === void 0 ? null : s);
}
function na(e, t, n, s) {
  var l = yn();
  s = s === void 0 ? null : s;
  var i = void 0;
  if (ht !== null) {
    var o = ht.memoizedState;
    if (i = o.destroy, s !== null && md(s, o.deps)) {
      l.memoizedState = Wi(t, n, i, s);
      return;
    }
  }
  Je.flags |= e, l.memoizedState = Wi(1 | t, n, i, s);
}
function Tf(e, t) {
  return or(8390656, 8, e, t);
}
function yd(e, t) {
  return na(2048, 8, e, t);
}
function bg(e, t) {
  return na(4, 2, e, t);
}
function _g(e, t) {
  return na(4, 4, e, t);
}
function Tg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function kg(e, t, n) {
  return n = n != null ? n.concat([e]) : null, na(4, 4, Tg.bind(null, t, e), n);
}
function vd() {
}
function Cg(e, t) {
  var n = yn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && md(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function jg(e, t) {
  var n = yn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && md(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Pg(e, t, n) {
  return Ks & 21 ? (jn(n, t) || (n = Am(), Je.lanes |= n, Gs |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ft = !0), e.memoizedState = n);
}
function j0(e, t) {
  var n = Le;
  Le = n !== 0 && 4 > n ? n : 4, e(!0);
  var s = sc.transition;
  sc.transition = {};
  try {
    e(!1), t();
  } finally {
    Le = n, sc.transition = s;
  }
}
function Ig() {
  return yn().memoizedState;
}
function P0(e, t, n) {
  var s = Ms(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, Ng(e)) Eg(t, n);
  else if (n = hg(e, t, n, s), n !== null) {
    var l = At();
    Cn(n, e, s, l), Rg(n, t, s);
  }
}
function I0(e, t, n) {
  var s = Ms(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ng(e)) Eg(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = a, jn(a, o)) {
        var c = t.interleaved;
        c === null ? (l.next = l, ud(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = hg(e, t, l, s), n !== null && (l = At(), Cn(n, e, s, l), Rg(n, t, s));
  }
}
function Ng(e) {
  var t = e.alternate;
  return e === Je || t !== null && t === Je;
}
function Eg(e, t) {
  bi = Er = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Rg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Qu(e, n);
  }
}
var Rr = { readContext: xn, useCallback: Tt, useContext: Tt, useEffect: Tt, useImperativeHandle: Tt, useInsertionEffect: Tt, useLayoutEffect: Tt, useMemo: Tt, useReducer: Tt, useRef: Tt, useState: Tt, useDebugValue: Tt, useDeferredValue: Tt, useTransition: Tt, useMutableSource: Tt, useSyncExternalStore: Tt, useId: Tt, unstable_isNewReconciler: !1 }, N0 = { readContext: xn, useCallback: function(e, t) {
  return An().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: xn, useEffect: Tf, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, or(
    4194308,
    4,
    Tg.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return or(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return or(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = An();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var s = An();
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = P0.bind(null, Je, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = An();
  return e = { current: e }, t.memoizedState = e;
}, useState: _f, useDebugValue: vd, useDeferredValue: function(e) {
  return An().memoizedState = e;
}, useTransition: function() {
  var e = _f(!1), t = e[0];
  return e = j0.bind(null, e[1]), An().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = Je, l = An();
  if (Qe) {
    if (n === void 0) throw Error(H(407));
    n = n();
  } else {
    if (n = t(), xt === null) throw Error(H(349));
    Ks & 30 || xg(s, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Tf(vg.bind(
    null,
    s,
    i,
    e
  ), [e]), s.flags |= 2048, Wi(9, yg.bind(null, s, i, n, t), void 0, null), n;
}, useId: function() {
  var e = An(), t = xt.identifierPrefix;
  if (Qe) {
    var n = Wn, s = Hn;
    n = (s & ~(1 << 32 - kn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = C0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, E0 = {
  readContext: xn,
  useCallback: Cg,
  useContext: xn,
  useEffect: yd,
  useImperativeHandle: kg,
  useInsertionEffect: bg,
  useLayoutEffect: _g,
  useMemo: jg,
  useReducer: lc,
  useRef: Mg,
  useState: function() {
    return lc(Hi);
  },
  useDebugValue: vd,
  useDeferredValue: function(e) {
    var t = yn();
    return Pg(t, ht.memoizedState, e);
  },
  useTransition: function() {
    var e = lc(Hi)[0], t = yn().memoizedState;
    return [e, t];
  },
  useMutableSource: mg,
  useSyncExternalStore: gg,
  useId: Ig,
  unstable_isNewReconciler: !1
}, R0 = { readContext: xn, useCallback: Cg, useContext: xn, useEffect: yd, useImperativeHandle: kg, useInsertionEffect: bg, useLayoutEffect: _g, useMemo: jg, useReducer: ic, useRef: Mg, useState: function() {
  return ic(Hi);
}, useDebugValue: vd, useDeferredValue: function(e) {
  var t = yn();
  return ht === null ? t.memoizedState = e : Pg(t, ht.memoizedState, e);
}, useTransition: function() {
  var e = ic(Hi)[0], t = yn().memoizedState;
  return [e, t];
}, useMutableSource: mg, useSyncExternalStore: gg, useId: Ig, unstable_isNewReconciler: !1 };
function Mn(e, t) {
  if (e && e.defaultProps) {
    t = et({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function du(e, t, n, s) {
  t = e.memoizedState, n = n(s, t), n = n == null ? t : et({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var sa = { isMounted: function(e) {
  return (e = e._reactInternals) ? tl(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var s = At(), l = Ms(e), i = Un(s, l);
  i.payload = t, n != null && (i.callback = n), t = ws(e, i, l), t !== null && (Cn(t, e, l, s), lr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var s = At(), l = Ms(e), i = Un(s, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ws(e, i, l), t !== null && (Cn(t, e, l, s), lr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = At(), s = Ms(e), l = Un(n, s);
  l.tag = 2, t != null && (l.callback = t), t = ws(e, l, s), t !== null && (Cn(t, e, s, n), lr(t, e, s));
} };
function kf(e, t, n, s, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Di(n, s) || !Di(l, i) : !0;
}
function Ag(e, t, n) {
  var s = !1, l = Ts, i = t.contextType;
  return typeof i == "object" && i !== null ? i = xn(i) : (l = Wt(t) ? $s : Pt.current, s = t.contextTypes, i = (s = s != null) ? Bl(e, l) : Ts), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = sa, e.stateNode = t, t._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Cf(e, t, n, s) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, s), t.state !== e && sa.enqueueReplaceState(t, t.state, null);
}
function hu(e, t, n, s) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, dd(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = xn(i) : (i = Wt(t) ? $s : Pt.current, l.context = Bl(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (du(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && sa.enqueueReplaceState(l, l.state, null), Ir(e, n, l, s), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ol(e, t) {
  try {
    var n = "", s = t;
    do
      n += rv(s), s = s.return;
    while (s);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function oc(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function fu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var A0 = typeof WeakMap == "function" ? WeakMap : Map;
function Lg(e, t, n) {
  n = Un(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    Lr || (Lr = !0, bu = s), fu(e, t);
  }, n;
}
function Dg(e, t, n) {
  n = Un(-1, n), n.tag = 3;
  var s = e.type.getDerivedStateFromError;
  if (typeof s == "function") {
    var l = t.value;
    n.payload = function() {
      return s(l);
    }, n.callback = function() {
      fu(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    fu(e, t), typeof s != "function" && (Ss === null ? Ss = /* @__PURE__ */ new Set([this]) : Ss.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function jf(e, t, n) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new A0();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = K0.bind(null, e, t, n), t.then(e, e));
}
function Pf(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function If(e, t, n, s, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Un(-1, 1), t.tag = 2, ws(n, t, 1))), n.lanes |= 1), e);
}
var L0 = qn.ReactCurrentOwner, Ft = !1;
function Rt(e, t, n, s) {
  t.child = e === null ? dg(t, null, n, s) : Xl(t, e.child, n, s);
}
function Nf(e, t, n, s, l) {
  n = n.render;
  var i = t.ref;
  return El(t, l), s = gd(e, t, n, s, i, l), n = xd(), e !== null && !Ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qn(e, t, l)) : (Qe && n && ld(t), t.flags |= 1, Rt(e, t, s, l), t.child);
}
function Ef(e, t, n, s, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Cd(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Bg(e, t, i, s, l)) : (e = ur(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Di, n(o, s) && e.ref === t.ref) return Qn(e, t, l);
  }
  return t.flags |= 1, e = bs(i, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Bg(e, t, n, s, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Di(i, s) && e.ref === t.ref) if (Ft = !1, t.pendingProps = s = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ft = !0);
    else return t.lanes = e.lanes, Qn(e, t, l);
  }
  return pu(e, t, n, s, l);
}
function Yg(e, t, n) {
  var s = t.pendingProps, l = s.children, i = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Xe(Cl, Kt), Kt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Xe(Cl, Kt), Kt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = i !== null ? i.baseLanes : n, Xe(Cl, Kt), Kt |= s;
  }
  else i !== null ? (s = i.baseLanes | n, t.memoizedState = null) : s = n, Xe(Cl, Kt), Kt |= s;
  return Rt(e, t, l, n), t.child;
}
function Xg(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function pu(e, t, n, s, l) {
  var i = Wt(n) ? $s : Pt.current;
  return i = Bl(t, i), El(t, l), n = gd(e, t, n, s, i, l), s = xd(), e !== null && !Ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qn(e, t, l)) : (Qe && s && ld(t), t.flags |= 1, Rt(e, t, n, l), t.child);
}
function Rf(e, t, n, s, l) {
  if (Wt(n)) {
    var i = !0;
    Tr(t);
  } else i = !1;
  if (El(t, l), t.stateNode === null) rr(e, t), Ag(t, n, s), hu(t, n, s, l), s = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var c = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = xn(u) : (u = Wt(n) ? $s : Pt.current, u = Bl(t, u));
    var d = n.getDerivedStateFromProps, f = typeof d == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== s || c !== u) && Cf(t, o, s, u), cs = !1;
    var h = t.memoizedState;
    o.state = h, Ir(t, s, o, l), c = t.memoizedState, a !== s || h !== c || Ht.current || cs ? (typeof d == "function" && (du(t, n, d, s), c = t.memoizedState), (a = cs || kf(t, n, a, s, h, c, u)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = c), o.props = s, o.state = c, o.context = u, s = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), s = !1);
  } else {
    o = t.stateNode, fg(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : Mn(t.type, a), o.props = u, f = t.pendingProps, h = o.context, c = n.contextType, typeof c == "object" && c !== null ? c = xn(c) : (c = Wt(n) ? $s : Pt.current, c = Bl(t, c));
    var p = n.getDerivedStateFromProps;
    (d = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== f || h !== c) && Cf(t, o, s, c), cs = !1, h = t.memoizedState, o.state = h, Ir(t, s, o, l);
    var g = t.memoizedState;
    a !== f || h !== g || Ht.current || cs ? (typeof p == "function" && (du(t, n, p, s), g = t.memoizedState), (u = cs || kf(t, n, u, s, h, g, c) || !1) ? (d || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(s, g, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(s, g, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = g), o.props = s, o.state = g, o.context = c, s = u) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return mu(e, t, n, s, i, l);
}
function mu(e, t, n, s, l, i) {
  Xg(e, t);
  var o = (t.flags & 128) !== 0;
  if (!s && !o) return l && yf(t, n, !1), Qn(e, t, i);
  s = t.stateNode, L0.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && o ? (t.child = Xl(t, e.child, null, i), t.child = Xl(t, null, a, i)) : Rt(e, t, a, i), t.memoizedState = s.state, l && yf(t, n, !0), t.child;
}
function Fg(e) {
  var t = e.stateNode;
  t.pendingContext ? xf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && xf(e, t.context, !1), hd(e, t.containerInfo);
}
function Af(e, t, n, s, l) {
  return Yl(), od(l), t.flags |= 256, Rt(e, t, n, s), t.child;
}
var gu = { dehydrated: null, treeContext: null, retryLane: 0 };
function xu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Og(e, t, n) {
  var s = t.pendingProps, l = qe.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Xe(qe, l & 1), e === null)
    return cu(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = s.children, e = s.fallback, i ? (s = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(s & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = oa(o, s, 0, null), e = Ws(e, s, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = xu(n), t.memoizedState = gu, e) : wd(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return D0(e, t, o, s, a, l, n);
  if (i) {
    i = s.fallback, o = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: s.children };
    return !(o & 1) && t.child !== l ? (s = t.child, s.childLanes = 0, s.pendingProps = c, t.deletions = null) : (s = bs(l, c), s.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = bs(a, i) : (i = Ws(i, o, n, null), i.flags |= 2), i.return = t, s.return = t, s.sibling = i, t.child = s, s = i, i = t.child, o = e.child.memoizedState, o = o === null ? xu(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = gu, s;
  }
  return i = e.child, e = i.sibling, s = bs(i, { mode: "visible", children: s.children }), !(t.mode & 1) && (s.lanes = n), s.return = t, s.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = s, t.memoizedState = null, s;
}
function wd(e, t) {
  return t = oa({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function zo(e, t, n, s) {
  return s !== null && od(s), Xl(t, e.child, null, n), e = wd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function D0(e, t, n, s, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, s = oc(Error(H(422))), zo(e, t, o, s)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = s.fallback, l = t.mode, s = oa({ mode: "visible", children: s.children }, l, 0, null), i = Ws(i, l, o, null), i.flags |= 2, s.return = t, i.return = t, s.sibling = i, t.child = s, t.mode & 1 && Xl(t, e.child, null, o), t.child.memoizedState = xu(o), t.memoizedState = gu, i);
  if (!(t.mode & 1)) return zo(e, t, o, null);
  if (l.data === "$!") {
    if (s = l.nextSibling && l.nextSibling.dataset, s) var a = s.dgst;
    return s = a, i = Error(H(419)), s = oc(i, s, void 0), zo(e, t, o, s);
  }
  if (a = (o & e.childLanes) !== 0, Ft || a) {
    if (s = xt, s !== null) {
      switch (o & -o) {
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
      l = l & (s.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Gn(e, l), Cn(s, e, l, -1));
    }
    return kd(), s = oc(Error(H(421))), zo(e, t, o, s);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = G0.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Qt = vs(l.nextSibling), Zt = t, Qe = !0, Tn = null, e !== null && (un[dn++] = Hn, un[dn++] = Wn, un[dn++] = Vs, Hn = e.id, Wn = e.overflow, Vs = t), t = wd(t, s.children), t.flags |= 4096, t);
}
function Lf(e, t, n) {
  e.lanes |= t;
  var s = e.alternate;
  s !== null && (s.lanes |= t), uu(e.return, t, n);
}
function rc(e, t, n, s, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: s, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = s, i.tail = n, i.tailMode = l);
}
function zg(e, t, n) {
  var s = t.pendingProps, l = s.revealOrder, i = s.tail;
  if (Rt(e, t, s.children, n), s = qe.current, s & 2) s = s & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Lf(e, n, t);
      else if (e.tag === 19) Lf(e, n, t);
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
  if (Xe(qe, s), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Nr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), rc(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Nr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      rc(t, !0, n, null, i);
      break;
    case "together":
      rc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function rr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Qn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Gs |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(H(153));
  if (t.child !== null) {
    for (e = t.child, n = bs(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = bs(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function B0(e, t, n) {
  switch (t.tag) {
    case 3:
      Fg(t), Yl();
      break;
    case 5:
      pg(t);
      break;
    case 1:
      Wt(t.type) && Tr(t);
      break;
    case 4:
      hd(t, t.stateNode.containerInfo);
      break;
    case 10:
      var s = t.type._context, l = t.memoizedProps.value;
      Xe(jr, s._currentValue), s._currentValue = l;
      break;
    case 13:
      if (s = t.memoizedState, s !== null)
        return s.dehydrated !== null ? (Xe(qe, qe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Og(e, t, n) : (Xe(qe, qe.current & 1), e = Qn(e, t, n), e !== null ? e.sibling : null);
      Xe(qe, qe.current & 1);
      break;
    case 19:
      if (s = (n & t.childLanes) !== 0, e.flags & 128) {
        if (s) return zg(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Xe(qe, qe.current), s) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Yg(e, t, n);
  }
  return Qn(e, t, n);
}
var Hg, yu, Wg, Ug;
Hg = function(e, t) {
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
yu = function() {
};
Wg = function(e, t, n, s) {
  var l = e.memoizedProps;
  if (l !== s) {
    e = t.stateNode, Os(Yn.current);
    var i = null;
    switch (n) {
      case "input":
        l = Fc(e, l), s = Fc(e, s), i = [];
        break;
      case "select":
        l = et({}, l, { value: void 0 }), s = et({}, s, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = Hc(e, l), s = Hc(e, s), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof s.onClick == "function" && (e.onclick = br);
    }
    Uc(n, s);
    var o;
    n = null;
    for (u in l) if (!s.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var a = l[u];
      for (o in a) a.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Pi.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var c = s[u];
      if (a = l != null ? l[u] : void 0, s.hasOwnProperty(u) && c !== a && (c != null || a != null)) if (u === "style") if (a) {
        for (o in a) !a.hasOwnProperty(o) || c && c.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in c) c.hasOwnProperty(o) && a[o] !== c[o] && (n || (n = {}), n[o] = c[o]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = c;
      else u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (i = i || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (i = i || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Pi.hasOwnProperty(u) ? (c != null && u === "onScroll" && He("scroll", e), i || a === c || (i = [])) : (i = i || []).push(u, c));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Ug = function(e, t, n, s) {
  n !== s && (t.flags |= 4);
};
function ri(e, t) {
  if (!Qe) switch (e.tailMode) {
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
function kt(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, s = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags & 14680064, s |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags, s |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= s, e.childLanes = n, t;
}
function Y0(e, t, n) {
  var s = t.pendingProps;
  switch (id(t), t.tag) {
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
      return kt(t), null;
    case 1:
      return Wt(t.type) && _r(), kt(t), null;
    case 3:
      return s = t.stateNode, Fl(), We(Ht), We(Pt), pd(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Fo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Tn !== null && (ku(Tn), Tn = null))), yu(e, t), kt(t), null;
    case 5:
      fd(t);
      var l = Os(Oi.current);
      if (n = t.type, e !== null && t.stateNode != null) Wg(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!s) {
          if (t.stateNode === null) throw Error(H(166));
          return kt(t), null;
        }
        if (e = Os(Yn.current), Fo(t)) {
          s = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (s[Dn] = t, s[Xi] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              He("cancel", s), He("close", s);
              break;
            case "iframe":
            case "object":
            case "embed":
              He("load", s);
              break;
            case "video":
            case "audio":
              for (l = 0; l < gi.length; l++) He(gi[l], s);
              break;
            case "source":
              He("error", s);
              break;
            case "img":
            case "image":
            case "link":
              He(
                "error",
                s
              ), He("load", s);
              break;
            case "details":
              He("toggle", s);
              break;
            case "input":
              Hh(s, i), He("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!i.multiple }, He("invalid", s);
              break;
            case "textarea":
              Uh(s, i), He("invalid", s);
          }
          Uc(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? s.textContent !== a && (i.suppressHydrationWarning !== !0 && Xo(s.textContent, a, e), l = ["children", a]) : typeof a == "number" && s.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Xo(
              s.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Pi.hasOwnProperty(o) && a != null && o === "onScroll" && He("scroll", s);
          }
          switch (n) {
            case "input":
              No(s), Wh(s, i, !0);
              break;
            case "textarea":
              No(s), $h(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (s.onclick = br);
          }
          s = l, t.updateQueue = s, s !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = vm(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = o.createElement(n, { is: s.is }) : (e = o.createElement(n), n === "select" && (o = e, s.multiple ? o.multiple = !0 : s.size && (o.size = s.size))) : e = o.createElementNS(e, n), e[Dn] = t, e[Xi] = s, Hg(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = $c(n, s), n) {
              case "dialog":
                He("cancel", e), He("close", e), l = s;
                break;
              case "iframe":
              case "object":
              case "embed":
                He("load", e), l = s;
                break;
              case "video":
              case "audio":
                for (l = 0; l < gi.length; l++) He(gi[l], e);
                l = s;
                break;
              case "source":
                He("error", e), l = s;
                break;
              case "img":
              case "image":
              case "link":
                He(
                  "error",
                  e
                ), He("load", e), l = s;
                break;
              case "details":
                He("toggle", e), l = s;
                break;
              case "input":
                Hh(e, s), l = Fc(e, s), He("invalid", e);
                break;
              case "option":
                l = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, l = et({}, s, { value: void 0 }), He("invalid", e);
                break;
              case "textarea":
                Uh(e, s), l = Hc(e, s), He("invalid", e);
                break;
              default:
                l = s;
            }
            Uc(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var c = a[i];
              i === "style" ? Mm(e, c) : i === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && wm(e, c)) : i === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Ii(e, c) : typeof c == "number" && Ii(e, "" + c) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Pi.hasOwnProperty(i) ? c != null && i === "onScroll" && He("scroll", e) : c != null && Wu(e, i, c, o));
            }
            switch (n) {
              case "input":
                No(e), Wh(e, s, !1);
                break;
              case "textarea":
                No(e), $h(e);
                break;
              case "option":
                s.value != null && e.setAttribute("value", "" + _s(s.value));
                break;
              case "select":
                e.multiple = !!s.multiple, i = s.value, i != null ? jl(e, !!s.multiple, i, !1) : s.defaultValue != null && jl(
                  e,
                  !!s.multiple,
                  s.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = br);
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
      return kt(t), null;
    case 6:
      if (e && t.stateNode != null) Ug(e, t, e.memoizedProps, s);
      else {
        if (typeof s != "string" && t.stateNode === null) throw Error(H(166));
        if (n = Os(Oi.current), Os(Yn.current), Fo(t)) {
          if (s = t.stateNode, n = t.memoizedProps, s[Dn] = t, (i = s.nodeValue !== n) && (e = Zt, e !== null)) switch (e.tag) {
            case 3:
              Xo(s.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Xo(s.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else s = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(s), s[Dn] = t, t.stateNode = s;
      }
      return kt(t), null;
    case 13:
      if (We(qe), s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Qe && Qt !== null && t.mode & 1 && !(t.flags & 128)) cg(), Yl(), t.flags |= 98560, i = !1;
        else if (i = Fo(t), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(H(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(H(317));
            i[Dn] = t;
          } else Yl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          kt(t), i = !1;
        } else Tn !== null && (ku(Tn), Tn = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (t.child.flags |= 8192, t.mode & 1 && (e === null || qe.current & 1 ? ft === 0 && (ft = 3) : kd())), t.updateQueue !== null && (t.flags |= 4), kt(t), null);
    case 4:
      return Fl(), yu(e, t), e === null && Bi(t.stateNode.containerInfo), kt(t), null;
    case 10:
      return cd(t.type._context), kt(t), null;
    case 17:
      return Wt(t.type) && _r(), kt(t), null;
    case 19:
      if (We(qe), i = t.memoizedState, i === null) return kt(t), null;
      if (s = (t.flags & 128) !== 0, o = i.rendering, o === null) if (s) ri(i, !1);
      else {
        if (ft !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Nr(e), o !== null) {
            for (t.flags |= 128, ri(i, !1), s = o.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), t.subtreeFlags = 0, s = n, n = t.child; n !== null; ) i = n, e = s, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Xe(qe, qe.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && it() > zl && (t.flags |= 128, s = !0, ri(i, !1), t.lanes = 4194304);
      }
      else {
        if (!s) if (e = Nr(o), e !== null) {
          if (t.flags |= 128, s = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ri(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !Qe) return kt(t), null;
        } else 2 * it() - i.renderingStartTime > zl && n !== 1073741824 && (t.flags |= 128, s = !0, ri(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = it(), t.sibling = null, n = qe.current, Xe(qe, s ? n & 1 | 2 : n & 1), t) : (kt(t), null);
    case 22:
    case 23:
      return Td(), s = t.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (t.flags |= 8192), s && t.mode & 1 ? Kt & 1073741824 && (kt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : kt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(H(156, t.tag));
}
function X0(e, t) {
  switch (id(t), t.tag) {
    case 1:
      return Wt(t.type) && _r(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Fl(), We(Ht), We(Pt), pd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return fd(t), null;
    case 13:
      if (We(qe), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(H(340));
        Yl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return We(qe), null;
    case 4:
      return Fl(), null;
    case 10:
      return cd(t.type._context), null;
    case 22:
    case 23:
      return Td(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ho = !1, Ct = !1, F0 = typeof WeakSet == "function" ? WeakSet : Set, J = null;
function kl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (s) {
    nt(e, t, s);
  }
  else n.current = null;
}
function vu(e, t, n) {
  try {
    n();
  } catch (s) {
    nt(e, t, s);
  }
}
var Df = !1;
function O0(e, t) {
  if (nu = wr, e = Qm(), sd(e)) {
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
        var o = 0, a = -1, c = -1, u = 0, d = 0, f = e, h = null;
        t: for (; ; ) {
          for (var p; f !== n || l !== 0 && f.nodeType !== 3 || (a = o + l), f !== i || s !== 0 && f.nodeType !== 3 || (c = o + s), f.nodeType === 3 && (o += f.nodeValue.length), (p = f.firstChild) !== null; )
            h = f, f = p;
          for (; ; ) {
            if (f === e) break t;
            if (h === n && ++u === l && (a = o), h === i && ++d === s && (c = o), (p = f.nextSibling) !== null) break;
            f = h, h = f.parentNode;
          }
          f = p;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (su = { focusedElem: e, selectionRange: n }, wr = !1, J = t; J !== null; ) if (t = J, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, J = e;
  else for (; J !== null; ) {
    t = J;
    try {
      var g = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (g !== null) {
            var w = g.memoizedProps, M = g.memoizedState, v = t.stateNode, m = v.getSnapshotBeforeUpdate(t.elementType === t.type ? w : Mn(t.type, w), M);
            v.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var x = t.stateNode.containerInfo;
          x.nodeType === 1 ? x.textContent = "" : x.nodeType === 9 && x.documentElement && x.removeChild(x.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(H(163));
      }
    } catch (S) {
      nt(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, J = e;
      break;
    }
    J = t.return;
  }
  return g = Df, Df = !1, g;
}
function _i(e, t, n) {
  var s = t.updateQueue;
  if (s = s !== null ? s.lastEffect : null, s !== null) {
    var l = s = s.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && vu(t, n, i);
      }
      l = l.next;
    } while (l !== s);
  }
}
function la(e, t) {
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
function wu(e) {
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
function $g(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, $g(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Dn], delete t[Xi], delete t[ou], delete t[b0], delete t[_0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Vg(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Bf(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Vg(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Su(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = br));
  else if (s !== 4 && (e = e.child, e !== null)) for (Su(e, t, n), e = e.sibling; e !== null; ) Su(e, t, n), e = e.sibling;
}
function Mu(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null)) for (Mu(e, t, n), e = e.sibling; e !== null; ) Mu(e, t, n), e = e.sibling;
}
var vt = null, bn = !1;
function ls(e, t, n) {
  for (n = n.child; n !== null; ) Kg(e, t, n), n = n.sibling;
}
function Kg(e, t, n) {
  if (Bn && typeof Bn.onCommitFiberUnmount == "function") try {
    Bn.onCommitFiberUnmount(Qr, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Ct || kl(n, t);
    case 6:
      var s = vt, l = bn;
      vt = null, ls(e, t, n), vt = s, bn = l, vt !== null && (bn ? (e = vt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : vt.removeChild(n.stateNode));
      break;
    case 18:
      vt !== null && (bn ? (e = vt, n = n.stateNode, e.nodeType === 8 ? ec(e.parentNode, n) : e.nodeType === 1 && ec(e, n), Ai(e)) : ec(vt, n.stateNode));
      break;
    case 4:
      s = vt, l = bn, vt = n.stateNode.containerInfo, bn = !0, ls(e, t, n), vt = s, bn = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ct && (s = n.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        l = s = s.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && vu(n, t, o), l = l.next;
        } while (l !== s);
      }
      ls(e, t, n);
      break;
    case 1:
      if (!Ct && (kl(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function")) try {
        s.props = n.memoizedProps, s.state = n.memoizedState, s.componentWillUnmount();
      } catch (a) {
        nt(n, t, a);
      }
      ls(e, t, n);
      break;
    case 21:
      ls(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ct = (s = Ct) || n.memoizedState !== null, ls(e, t, n), Ct = s) : ls(e, t, n);
      break;
    default:
      ls(e, t, n);
  }
}
function Yf(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new F0()), t.forEach(function(s) {
      var l = Q0.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(l, l));
    });
  }
}
function wn(e, t) {
  var n = t.deletions;
  if (n !== null) for (var s = 0; s < n.length; s++) {
    var l = n[s];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            vt = a.stateNode, bn = !1;
            break e;
          case 3:
            vt = a.stateNode.containerInfo, bn = !0;
            break e;
          case 4:
            vt = a.stateNode.containerInfo, bn = !0;
            break e;
        }
        a = a.return;
      }
      if (vt === null) throw Error(H(160));
      Kg(i, o, l), vt = null, bn = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (u) {
      nt(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Gg(t, e), t = t.sibling;
}
function Gg(e, t) {
  var n = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (wn(t, e), Rn(e), s & 4) {
        try {
          _i(3, e, e.return), la(3, e);
        } catch (w) {
          nt(e, e.return, w);
        }
        try {
          _i(5, e, e.return);
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      break;
    case 1:
      wn(t, e), Rn(e), s & 512 && n !== null && kl(n, n.return);
      break;
    case 5:
      if (wn(t, e), Rn(e), s & 512 && n !== null && kl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Ii(l, "");
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && i.type === "radio" && i.name != null && xm(l, i), $c(a, o);
          var u = $c(a, i);
          for (o = 0; o < c.length; o += 2) {
            var d = c[o], f = c[o + 1];
            d === "style" ? Mm(l, f) : d === "dangerouslySetInnerHTML" ? wm(l, f) : d === "children" ? Ii(l, f) : Wu(l, d, f, u);
          }
          switch (a) {
            case "input":
              Oc(l, i);
              break;
            case "textarea":
              ym(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var p = i.value;
              p != null ? jl(l, !!i.multiple, p, !1) : h !== !!i.multiple && (i.defaultValue != null ? jl(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : jl(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Xi] = i;
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      break;
    case 6:
      if (wn(t, e), Rn(e), s & 4) {
        if (e.stateNode === null) throw Error(H(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      break;
    case 3:
      if (wn(t, e), Rn(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ai(t.containerInfo);
      } catch (w) {
        nt(e, e.return, w);
      }
      break;
    case 4:
      wn(t, e), Rn(e);
      break;
    case 13:
      wn(t, e), Rn(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (bd = it())), s & 4 && Yf(e);
      break;
    case 22:
      if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ct = (u = Ct) || d, wn(t, e), Ct = u) : wn(t, e), Rn(e), s & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (J = e, d = e.child; d !== null; ) {
          for (f = J = d; J !== null; ) {
            switch (h = J, p = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                _i(4, h, h.return);
                break;
              case 1:
                kl(h, h.return);
                var g = h.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  s = h, n = h.return;
                  try {
                    t = s, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                  } catch (w) {
                    nt(s, n, w);
                  }
                }
                break;
              case 5:
                kl(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Ff(f);
                  continue;
                }
            }
            p !== null ? (p.return = h, J = p) : Ff(f);
          }
          d = d.sibling;
        }
        e: for (d = null, f = e; ; ) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                l = f.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = f.stateNode, c = f.memoizedProps.style, o = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = Sm("display", o));
              } catch (w) {
                nt(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (d === null) try {
              f.stateNode.nodeValue = u ? "" : f.memoizedProps;
            } catch (w) {
              nt(e, e.return, w);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            d === f && (d = null), f = f.return;
          }
          d === f && (d = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      wn(t, e), Rn(e), s & 4 && Yf(e);
      break;
    case 21:
      break;
    default:
      wn(
        t,
        e
      ), Rn(e);
  }
}
function Rn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Vg(n)) {
            var s = n;
            break e;
          }
          n = n.return;
        }
        throw Error(H(160));
      }
      switch (s.tag) {
        case 5:
          var l = s.stateNode;
          s.flags & 32 && (Ii(l, ""), s.flags &= -33);
          var i = Bf(e);
          Mu(e, i, l);
          break;
        case 3:
        case 4:
          var o = s.stateNode.containerInfo, a = Bf(e);
          Su(e, a, o);
          break;
        default:
          throw Error(H(161));
      }
    } catch (c) {
      nt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function z0(e, t, n) {
  J = e, Qg(e);
}
function Qg(e, t, n) {
  for (var s = (e.mode & 1) !== 0; J !== null; ) {
    var l = J, i = l.child;
    if (l.tag === 22 && s) {
      var o = l.memoizedState !== null || Ho;
      if (!o) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || Ct;
        a = Ho;
        var u = Ct;
        if (Ho = o, (Ct = c) && !u) for (J = l; J !== null; ) o = J, c = o.child, o.tag === 22 && o.memoizedState !== null ? Of(l) : c !== null ? (c.return = o, J = c) : Of(l);
        for (; i !== null; ) J = i, Qg(i), i = i.sibling;
        J = l, Ho = a, Ct = u;
      }
      Xf(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, J = i) : Xf(e);
  }
}
function Xf(e) {
  for (; J !== null; ) {
    var t = J;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Ct || la(5, t);
            break;
          case 1:
            var s = t.stateNode;
            if (t.flags & 4 && !Ct) if (n === null) s.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Mn(t.type, n.memoizedProps);
              s.componentDidUpdate(l, n.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && bf(t, i, s);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              bf(t, o, n);
            }
            break;
          case 5:
            var a = t.stateNode;
            if (n === null && t.flags & 4) {
              n = a;
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
                var d = u.memoizedState;
                if (d !== null) {
                  var f = d.dehydrated;
                  f !== null && Ai(f);
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
            throw Error(H(163));
        }
        Ct || t.flags & 512 && wu(t);
      } catch (h) {
        nt(t, t.return, h);
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
function Ff(e) {
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
function Of(e) {
  for (; J !== null; ) {
    var t = J;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            la(4, t);
          } catch (c) {
            nt(t, n, c);
          }
          break;
        case 1:
          var s = t.stateNode;
          if (typeof s.componentDidMount == "function") {
            var l = t.return;
            try {
              s.componentDidMount();
            } catch (c) {
              nt(t, l, c);
            }
          }
          var i = t.return;
          try {
            wu(t);
          } catch (c) {
            nt(t, i, c);
          }
          break;
        case 5:
          var o = t.return;
          try {
            wu(t);
          } catch (c) {
            nt(t, o, c);
          }
      }
    } catch (c) {
      nt(t, t.return, c);
    }
    if (t === e) {
      J = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, J = a;
      break;
    }
    J = t.return;
  }
}
var H0 = Math.ceil, Ar = qn.ReactCurrentDispatcher, Sd = qn.ReactCurrentOwner, gn = qn.ReactCurrentBatchConfig, ke = 0, xt = null, dt = null, St = 0, Kt = 0, Cl = Cs(0), ft = 0, Ui = null, Gs = 0, ia = 0, Md = 0, Ti = null, Xt = null, bd = 0, zl = 1 / 0, Fn = null, Lr = !1, bu = null, Ss = null, Wo = !1, ms = null, Dr = 0, ki = 0, _u = null, ar = -1, cr = 0;
function At() {
  return ke & 6 ? it() : ar !== -1 ? ar : ar = it();
}
function Ms(e) {
  return e.mode & 1 ? ke & 2 && St !== 0 ? St & -St : k0.transition !== null ? (cr === 0 && (cr = Am()), cr) : (e = Le, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Om(e.type)), e) : 1;
}
function Cn(e, t, n, s) {
  if (50 < ki) throw ki = 0, _u = null, Error(H(185));
  Vi(e, n, s), (!(ke & 2) || e !== xt) && (e === xt && (!(ke & 2) && (ia |= n), ft === 4 && ds(e, St)), Ut(e, s), n === 1 && ke === 0 && !(t.mode & 1) && (zl = it() + 500, ta && js()));
}
function Ut(e, t) {
  var n = e.callbackNode;
  kv(e, t);
  var s = vr(e, e === xt ? St : 0);
  if (s === 0) n !== null && Gh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Gh(n), t === 1) e.tag === 0 ? T0(zf.bind(null, e)) : og(zf.bind(null, e)), S0(function() {
      !(ke & 6) && js();
    }), n = null;
    else {
      switch (Lm(s)) {
        case 1:
          n = Gu;
          break;
        case 4:
          n = Em;
          break;
        case 16:
          n = yr;
          break;
        case 536870912:
          n = Rm;
          break;
        default:
          n = yr;
      }
      n = lx(n, Zg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Zg(e, t) {
  if (ar = -1, cr = 0, ke & 6) throw Error(H(327));
  var n = e.callbackNode;
  if (Rl() && e.callbackNode !== n) return null;
  var s = vr(e, e === xt ? St : 0);
  if (s === 0) return null;
  if (s & 30 || s & e.expiredLanes || t) t = Br(e, s);
  else {
    t = s;
    var l = ke;
    ke |= 2;
    var i = Jg();
    (xt !== e || St !== t) && (Fn = null, zl = it() + 500, Hs(e, t));
    do
      try {
        $0();
        break;
      } catch (a) {
        qg(e, a);
      }
    while (!0);
    ad(), Ar.current = i, ke = l, dt !== null ? t = 0 : (xt = null, St = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (l = Zc(e), l !== 0 && (s = l, t = Tu(e, l))), t === 1) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
    if (t === 6) ds(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !W0(l) && (t = Br(e, s), t === 2 && (i = Zc(e), i !== 0 && (s = i, t = Tu(e, i))), t === 1)) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
      switch (e.finishedWork = l, e.finishedLanes = s, t) {
        case 0:
        case 1:
          throw Error(H(345));
        case 2:
          Bs(e, Xt, Fn);
          break;
        case 3:
          if (ds(e, s), (s & 130023424) === s && (t = bd + 500 - it(), 10 < t)) {
            if (vr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & s) !== s) {
              At(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = iu(Bs.bind(null, e, Xt, Fn), t);
            break;
          }
          Bs(e, Xt, Fn);
          break;
        case 4:
          if (ds(e, s), (s & 4194240) === s) break;
          for (t = e.eventTimes, l = -1; 0 < s; ) {
            var o = 31 - kn(s);
            i = 1 << o, o = t[o], o > l && (l = o), s &= ~i;
          }
          if (s = l, s = it() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * H0(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = iu(Bs.bind(null, e, Xt, Fn), s);
            break;
          }
          Bs(e, Xt, Fn);
          break;
        case 5:
          Bs(e, Xt, Fn);
          break;
        default:
          throw Error(H(329));
      }
    }
  }
  return Ut(e, it()), e.callbackNode === n ? Zg.bind(null, e) : null;
}
function Tu(e, t) {
  var n = Ti;
  return e.current.memoizedState.isDehydrated && (Hs(e, t).flags |= 256), e = Br(e, t), e !== 2 && (t = Xt, Xt = n, t !== null && ku(t)), e;
}
function ku(e) {
  Xt === null ? Xt = e : Xt.push.apply(Xt, e);
}
function W0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var s = 0; s < n.length; s++) {
        var l = n[s], i = l.getSnapshot;
        l = l.value;
        try {
          if (!jn(i(), l)) return !1;
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
function ds(e, t) {
  for (t &= ~Md, t &= ~ia, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - kn(t), s = 1 << n;
    e[n] = -1, t &= ~s;
  }
}
function zf(e) {
  if (ke & 6) throw Error(H(327));
  Rl();
  var t = vr(e, 0);
  if (!(t & 1)) return Ut(e, it()), null;
  var n = Br(e, t);
  if (e.tag !== 0 && n === 2) {
    var s = Zc(e);
    s !== 0 && (t = s, n = Tu(e, s));
  }
  if (n === 1) throw n = Ui, Hs(e, 0), ds(e, t), Ut(e, it()), n;
  if (n === 6) throw Error(H(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Bs(e, Xt, Fn), Ut(e, it()), null;
}
function _d(e, t) {
  var n = ke;
  ke |= 1;
  try {
    return e(t);
  } finally {
    ke = n, ke === 0 && (zl = it() + 500, ta && js());
  }
}
function Qs(e) {
  ms !== null && ms.tag === 0 && !(ke & 6) && Rl();
  var t = ke;
  ke |= 1;
  var n = gn.transition, s = Le;
  try {
    if (gn.transition = null, Le = 1, e) return e();
  } finally {
    Le = s, gn.transition = n, ke = t, !(ke & 6) && js();
  }
}
function Td() {
  Kt = Cl.current, We(Cl);
}
function Hs(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, w0(n)), dt !== null) for (n = dt.return; n !== null; ) {
    var s = n;
    switch (id(s), s.tag) {
      case 1:
        s = s.type.childContextTypes, s != null && _r();
        break;
      case 3:
        Fl(), We(Ht), We(Pt), pd();
        break;
      case 5:
        fd(s);
        break;
      case 4:
        Fl();
        break;
      case 13:
        We(qe);
        break;
      case 19:
        We(qe);
        break;
      case 10:
        cd(s.type._context);
        break;
      case 22:
      case 23:
        Td();
    }
    n = n.return;
  }
  if (xt = e, dt = e = bs(e.current, null), St = Kt = t, ft = 0, Ui = null, Md = ia = Gs = 0, Xt = Ti = null, Fs !== null) {
    for (t = 0; t < Fs.length; t++) if (n = Fs[t], s = n.interleaved, s !== null) {
      n.interleaved = null;
      var l = s.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, s.next = o;
      }
      n.pending = s;
    }
    Fs = null;
  }
  return e;
}
function qg(e, t) {
  do {
    var n = dt;
    try {
      if (ad(), ir.current = Rr, Er) {
        for (var s = Je.memoizedState; s !== null; ) {
          var l = s.queue;
          l !== null && (l.pending = null), s = s.next;
        }
        Er = !1;
      }
      if (Ks = 0, gt = ht = Je = null, bi = !1, zi = 0, Sd.current = null, n === null || n.return === null) {
        ft = 1, Ui = t, dt = null;
        break;
      }
      e: {
        var i = e, o = n.return, a = n, c = t;
        if (t = St, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var u = c, d = a, f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var h = d.alternate;
            h ? (d.updateQueue = h.updateQueue, d.memoizedState = h.memoizedState, d.lanes = h.lanes) : (d.updateQueue = null, d.memoizedState = null);
          }
          var p = Pf(o);
          if (p !== null) {
            p.flags &= -257, If(p, o, a, i, t), p.mode & 1 && jf(i, u, t), t = p, c = u;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(c), t.updateQueue = w;
            } else g.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              jf(i, u, t), kd();
              break e;
            }
            c = Error(H(426));
          }
        } else if (Qe && a.mode & 1) {
          var M = Pf(o);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), If(M, o, a, i, t), od(Ol(c, a));
            break e;
          }
        }
        i = c = Ol(c, a), ft !== 4 && (ft = 2), Ti === null ? Ti = [i] : Ti.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var v = Lg(i, c, t);
              Mf(i, v);
              break e;
            case 1:
              a = c;
              var m = i.type, x = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (Ss === null || !Ss.has(x)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var S = Dg(i, a, t);
                Mf(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      tx(n);
    } catch (b) {
      t = b, dt === n && n !== null && (dt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Jg() {
  var e = Ar.current;
  return Ar.current = Rr, e === null ? Rr : e;
}
function kd() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), xt === null || !(Gs & 268435455) && !(ia & 268435455) || ds(xt, St);
}
function Br(e, t) {
  var n = ke;
  ke |= 2;
  var s = Jg();
  (xt !== e || St !== t) && (Fn = null, Hs(e, t));
  do
    try {
      U0();
      break;
    } catch (l) {
      qg(e, l);
    }
  while (!0);
  if (ad(), ke = n, Ar.current = s, dt !== null) throw Error(H(261));
  return xt = null, St = 0, ft;
}
function U0() {
  for (; dt !== null; ) ex(dt);
}
function $0() {
  for (; dt !== null && !xv(); ) ex(dt);
}
function ex(e) {
  var t = sx(e.alternate, e, Kt);
  e.memoizedProps = e.pendingProps, t === null ? tx(e) : dt = t, Sd.current = null;
}
function tx(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = X0(n, t), n !== null) {
        n.flags &= 32767, dt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, dt = null;
        return;
      }
    } else if (n = Y0(n, t, Kt), n !== null) {
      dt = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      dt = t;
      return;
    }
    dt = t = e;
  } while (t !== null);
  ft === 0 && (ft = 5);
}
function Bs(e, t, n) {
  var s = Le, l = gn.transition;
  try {
    gn.transition = null, Le = 1, V0(e, t, n, s);
  } finally {
    gn.transition = l, Le = s;
  }
  return null;
}
function V0(e, t, n, s) {
  do
    Rl();
  while (ms !== null);
  if (ke & 6) throw Error(H(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(H(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Cv(e, i), e === xt && (dt = xt = null, St = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Wo || (Wo = !0, lx(yr, function() {
    return Rl(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = gn.transition, gn.transition = null;
    var o = Le;
    Le = 1;
    var a = ke;
    ke |= 4, Sd.current = null, O0(e, n), Gg(n, e), f0(su), wr = !!nu, su = nu = null, e.current = n, z0(n), yv(), ke = a, Le = o, gn.transition = i;
  } else e.current = n;
  if (Wo && (Wo = !1, ms = e, Dr = l), i = e.pendingLanes, i === 0 && (Ss = null), Sv(n.stateNode), Ut(e, it()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (Lr) throw Lr = !1, e = bu, bu = null, e;
  return Dr & 1 && e.tag !== 0 && Rl(), i = e.pendingLanes, i & 1 ? e === _u ? ki++ : (ki = 0, _u = e) : ki = 0, js(), null;
}
function Rl() {
  if (ms !== null) {
    var e = Lm(Dr), t = gn.transition, n = Le;
    try {
      if (gn.transition = null, Le = 16 > e ? 16 : e, ms === null) var s = !1;
      else {
        if (e = ms, ms = null, Dr = 0, ke & 6) throw Error(H(331));
        var l = ke;
        for (ke |= 4, J = e.current; J !== null; ) {
          var i = J, o = i.child;
          if (J.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (J = u; J !== null; ) {
                  var d = J;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _i(8, d, i);
                  }
                  var f = d.child;
                  if (f !== null) f.return = d, J = f;
                  else for (; J !== null; ) {
                    d = J;
                    var h = d.sibling, p = d.return;
                    if ($g(d), d === u) {
                      J = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = p, J = h;
                      break;
                    }
                    J = p;
                  }
                }
              }
              var g = i.alternate;
              if (g !== null) {
                var w = g.child;
                if (w !== null) {
                  g.child = null;
                  do {
                    var M = w.sibling;
                    w.sibling = null, w = M;
                  } while (w !== null);
                }
              }
              J = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, J = o;
          else e: for (; J !== null; ) {
            if (i = J, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                _i(9, i, i.return);
            }
            var v = i.sibling;
            if (v !== null) {
              v.return = i.return, J = v;
              break e;
            }
            J = i.return;
          }
        }
        var m = e.current;
        for (J = m; J !== null; ) {
          o = J;
          var x = o.child;
          if (o.subtreeFlags & 2064 && x !== null) x.return = o, J = x;
          else e: for (o = m; J !== null; ) {
            if (a = J, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  la(9, a);
              }
            } catch (b) {
              nt(a, a.return, b);
            }
            if (a === o) {
              J = null;
              break e;
            }
            var S = a.sibling;
            if (S !== null) {
              S.return = a.return, J = S;
              break e;
            }
            J = a.return;
          }
        }
        if (ke = l, js(), Bn && typeof Bn.onPostCommitFiberRoot == "function") try {
          Bn.onPostCommitFiberRoot(Qr, e);
        } catch {
        }
        s = !0;
      }
      return s;
    } finally {
      Le = n, gn.transition = t;
    }
  }
  return !1;
}
function Hf(e, t, n) {
  t = Ol(n, t), t = Lg(e, t, 1), e = ws(e, t, 1), t = At(), e !== null && (Vi(e, 1, t), Ut(e, t));
}
function nt(e, t, n) {
  if (e.tag === 3) Hf(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Hf(t, e, n);
      break;
    } else if (t.tag === 1) {
      var s = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Ss === null || !Ss.has(s))) {
        e = Ol(n, e), e = Dg(t, e, 1), t = ws(t, e, 1), e = At(), t !== null && (Vi(t, 1, e), Ut(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function K0(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = At(), e.pingedLanes |= e.suspendedLanes & n, xt === e && (St & n) === n && (ft === 4 || ft === 3 && (St & 130023424) === St && 500 > it() - bd ? Hs(e, 0) : Md |= n), Ut(e, t);
}
function nx(e, t) {
  t === 0 && (e.mode & 1 ? (t = Ao, Ao <<= 1, !(Ao & 130023424) && (Ao = 4194304)) : t = 1);
  var n = At();
  e = Gn(e, t), e !== null && (Vi(e, t, n), Ut(e, n));
}
function G0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), nx(e, n);
}
function Q0(e, t) {
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
      throw Error(H(314));
  }
  s !== null && s.delete(t), nx(e, n);
}
var sx;
sx = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Ht.current) Ft = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ft = !1, B0(e, t, n);
    Ft = !!(e.flags & 131072);
  }
  else Ft = !1, Qe && t.flags & 1048576 && rg(t, Cr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var s = t.type;
      rr(e, t), e = t.pendingProps;
      var l = Bl(t, Pt.current);
      El(t, n), l = gd(null, t, s, e, l, n);
      var i = xd();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wt(s) ? (i = !0, Tr(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, dd(t), l.updater = sa, t.stateNode = l, l._reactInternals = t, hu(t, s, e, n), t = mu(null, t, s, !0, i, n)) : (t.tag = 0, Qe && i && ld(t), Rt(null, t, l, n), t = t.child), t;
    case 16:
      s = t.elementType;
      e: {
        switch (rr(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = q0(s), e = Mn(s, e), l) {
          case 0:
            t = pu(null, t, s, e, n);
            break e;
          case 1:
            t = Rf(null, t, s, e, n);
            break e;
          case 11:
            t = Nf(null, t, s, e, n);
            break e;
          case 14:
            t = Ef(null, t, s, Mn(s.type, e), n);
            break e;
        }
        throw Error(H(
          306,
          s,
          ""
        ));
      }
      return t;
    case 0:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Mn(s, l), pu(e, t, s, l, n);
    case 1:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Mn(s, l), Rf(e, t, s, l, n);
    case 3:
      e: {
        if (Fg(t), e === null) throw Error(H(387));
        s = t.pendingProps, i = t.memoizedState, l = i.element, fg(e, t), Ir(t, s, null, n);
        var o = t.memoizedState;
        if (s = o.element, i.isDehydrated) if (i = { element: s, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = Ol(Error(H(423)), t), t = Af(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = Ol(Error(H(424)), t), t = Af(e, t, s, n, l);
          break e;
        } else for (Qt = vs(t.stateNode.containerInfo.firstChild), Zt = t, Qe = !0, Tn = null, n = dg(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Yl(), s === l) {
            t = Qn(e, t, n);
            break e;
          }
          Rt(e, t, s, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return pg(t), e === null && cu(t), s = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, lu(s, l) ? o = null : i !== null && lu(s, i) && (t.flags |= 32), Xg(e, t), Rt(e, t, o, n), t.child;
    case 6:
      return e === null && cu(t), null;
    case 13:
      return Og(e, t, n);
    case 4:
      return hd(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Xl(t, null, s, n) : Rt(e, t, s, n), t.child;
    case 11:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Mn(s, l), Nf(e, t, s, l, n);
    case 7:
      return Rt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Rt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Rt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (s = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, Xe(jr, s._currentValue), s._currentValue = o, i !== null) if (jn(i.value, o)) {
          if (i.children === l.children && !Ht.current) {
            t = Qn(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === s) {
                if (i.tag === 1) {
                  c = Un(-1, n & -n), c.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var d = u.pending;
                    d === null ? c.next = c : (c.next = d.next, d.next = c), u.pending = c;
                  }
                }
                i.lanes |= n, c = i.alternate, c !== null && (c.lanes |= n), uu(
                  i.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(H(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), uu(o, n, t), o = i.sibling;
          } else o = i.child;
          if (o !== null) o.return = i;
          else for (o = i; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (i = o.sibling, i !== null) {
              i.return = o.return, o = i;
              break;
            }
            o = o.return;
          }
          i = o;
        }
        Rt(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, s = t.pendingProps.children, El(t, n), l = xn(l), s = s(l), t.flags |= 1, Rt(e, t, s, n), t.child;
    case 14:
      return s = t.type, l = Mn(s, t.pendingProps), l = Mn(s.type, l), Ef(e, t, s, l, n);
    case 15:
      return Bg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : Mn(s, l), rr(e, t), t.tag = 1, Wt(s) ? (e = !0, Tr(t)) : e = !1, El(t, n), Ag(t, s, l), hu(t, s, l, n), mu(null, t, s, !0, e, n);
    case 19:
      return zg(e, t, n);
    case 22:
      return Yg(e, t, n);
  }
  throw Error(H(156, t.tag));
};
function lx(e, t) {
  return Nm(e, t);
}
function Z0(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function fn(e, t, n, s) {
  return new Z0(e, t, n, s);
}
function Cd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function q0(e) {
  if (typeof e == "function") return Cd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === $u) return 11;
    if (e === Vu) return 14;
  }
  return 2;
}
function bs(e, t) {
  var n = e.alternate;
  return n === null ? (n = fn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ur(e, t, n, s, l, i) {
  var o = 2;
  if (s = e, typeof e == "function") Cd(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case xl:
      return Ws(n.children, l, i, t);
    case Uu:
      o = 8, l |= 8;
      break;
    case Dc:
      return e = fn(12, n, t, l | 2), e.elementType = Dc, e.lanes = i, e;
    case Bc:
      return e = fn(13, n, t, l), e.elementType = Bc, e.lanes = i, e;
    case Yc:
      return e = fn(19, n, t, l), e.elementType = Yc, e.lanes = i, e;
    case pm:
      return oa(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case hm:
          o = 10;
          break e;
        case fm:
          o = 9;
          break e;
        case $u:
          o = 11;
          break e;
        case Vu:
          o = 14;
          break e;
        case as:
          o = 16, s = null;
          break e;
      }
      throw Error(H(130, e == null ? e : typeof e, ""));
  }
  return t = fn(o, n, t, l), t.elementType = e, t.type = s, t.lanes = i, t;
}
function Ws(e, t, n, s) {
  return e = fn(7, e, s, t), e.lanes = n, e;
}
function oa(e, t, n, s) {
  return e = fn(22, e, s, t), e.elementType = pm, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function ac(e, t, n) {
  return e = fn(6, e, null, t), e.lanes = n, e;
}
function cc(e, t, n) {
  return t = fn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function J0(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Ha(0), this.expirationTimes = Ha(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ha(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function jd(e, t, n, s, l, i, o, a, c) {
  return e = new J0(e, t, n, a, c), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = fn(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, dd(i), e;
}
function ew(e, t, n) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: gl, key: s == null ? null : "" + s, children: e, containerInfo: t, implementation: n };
}
function ix(e) {
  if (!e) return Ts;
  e = e._reactInternals;
  e: {
    if (tl(e) !== e || e.tag !== 1) throw Error(H(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Wt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(H(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Wt(n)) return ig(e, n, t);
  }
  return t;
}
function ox(e, t, n, s, l, i, o, a, c) {
  return e = jd(n, s, !0, e, l, i, o, a, c), e.context = ix(null), n = e.current, s = At(), l = Ms(n), i = Un(s, l), i.callback = t ?? null, ws(n, i, l), e.current.lanes = l, Vi(e, l, s), Ut(e, s), e;
}
function ra(e, t, n, s) {
  var l = t.current, i = At(), o = Ms(l);
  return n = ix(n), t.context === null ? t.context = n : t.pendingContext = n, t = Un(i, o), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = ws(l, t, o), e !== null && (Cn(e, l, o, i), lr(e, l, o)), o;
}
function Yr(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Wf(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Pd(e, t) {
  Wf(e, t), (e = e.alternate) && Wf(e, t);
}
function tw() {
  return null;
}
var rx = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Id(e) {
  this._internalRoot = e;
}
aa.prototype.render = Id.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(H(409));
  ra(e, t, null, null);
};
aa.prototype.unmount = Id.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qs(function() {
      ra(null, e, null, null);
    }), t[Kn] = null;
  }
};
function aa(e) {
  this._internalRoot = e;
}
aa.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ym();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < us.length && t !== 0 && t < us[n].priority; n++) ;
    us.splice(n, 0, e), n === 0 && Fm(e);
  }
};
function Nd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function ca(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Uf() {
}
function nw(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var i = s;
      s = function() {
        var u = Yr(o);
        i.call(u);
      };
    }
    var o = ox(t, s, e, 0, null, !1, !1, "", Uf);
    return e._reactRootContainer = o, e[Kn] = o.current, Bi(e.nodeType === 8 ? e.parentNode : e), Qs(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof s == "function") {
    var a = s;
    s = function() {
      var u = Yr(c);
      a.call(u);
    };
  }
  var c = jd(e, 0, !1, null, null, !1, !1, "", Uf);
  return e._reactRootContainer = c, e[Kn] = c.current, Bi(e.nodeType === 8 ? e.parentNode : e), Qs(function() {
    ra(t, c, n, s);
  }), c;
}
function ua(e, t, n, s, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Yr(o);
        a.call(c);
      };
    }
    ra(t, o, e, l);
  } else o = nw(n, t, e, l, s);
  return Yr(o);
}
Dm = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mi(t.pendingLanes);
        n !== 0 && (Qu(t, n | 1), Ut(t, it()), !(ke & 6) && (zl = it() + 500, js()));
      }
      break;
    case 13:
      Qs(function() {
        var s = Gn(e, 1);
        if (s !== null) {
          var l = At();
          Cn(s, e, 1, l);
        }
      }), Pd(e, 1);
  }
};
Zu = function(e) {
  if (e.tag === 13) {
    var t = Gn(e, 134217728);
    if (t !== null) {
      var n = At();
      Cn(t, e, 134217728, n);
    }
    Pd(e, 134217728);
  }
};
Bm = function(e) {
  if (e.tag === 13) {
    var t = Ms(e), n = Gn(e, t);
    if (n !== null) {
      var s = At();
      Cn(n, e, t, s);
    }
    Pd(e, t);
  }
};
Ym = function() {
  return Le;
};
Xm = function(e, t) {
  var n = Le;
  try {
    return Le = e, t();
  } finally {
    Le = n;
  }
};
Kc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Oc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var s = n[t];
          if (s !== e && s.form === e.form) {
            var l = ea(s);
            if (!l) throw Error(H(90));
            gm(s), Oc(s, l);
          }
        }
      }
      break;
    case "textarea":
      ym(e, n);
      break;
    case "select":
      t = n.value, t != null && jl(e, !!n.multiple, t, !1);
  }
};
Tm = _d;
km = Qs;
var sw = { usingClientEntryPoint: !1, Events: [Gi, Sl, ea, bm, _m, _d] }, ai = { findFiberByHostInstance: Xs, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, lw = { bundleType: ai.bundleType, version: ai.version, rendererPackageName: ai.rendererPackageName, rendererConfig: ai.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Pm(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ai.findFiberByHostInstance || tw, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Uo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Uo.isDisabled && Uo.supportsFiber) try {
    Qr = Uo.inject(lw), Bn = Uo;
  } catch {
  }
}
Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sw;
Jt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Nd(t)) throw Error(H(200));
  return ew(e, t, null, n);
};
Jt.createRoot = function(e, t) {
  if (!Nd(e)) throw Error(H(299));
  var n = !1, s = "", l = rx;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = jd(e, 1, !1, null, null, n, !1, s, l), e[Kn] = t.current, Bi(e.nodeType === 8 ? e.parentNode : e), new Id(t);
};
Jt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(H(188)) : (e = Object.keys(e).join(","), Error(H(268, e)));
  return e = Pm(t), e = e === null ? null : e.stateNode, e;
};
Jt.flushSync = function(e) {
  return Qs(e);
};
Jt.hydrate = function(e, t, n) {
  if (!ca(t)) throw Error(H(200));
  return ua(null, e, t, !0, n);
};
Jt.hydrateRoot = function(e, t, n) {
  if (!Nd(e)) throw Error(H(405));
  var s = n != null && n.hydratedSources || null, l = !1, i = "", o = rx;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = ox(t, null, e, 1, n ?? null, l, !1, i, o), e[Kn] = t.current, Bi(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new aa(t);
};
Jt.render = function(e, t, n) {
  if (!ca(t)) throw Error(H(200));
  return ua(null, e, t, !1, n);
};
Jt.unmountComponentAtNode = function(e) {
  if (!ca(e)) throw Error(H(40));
  return e._reactRootContainer ? (Qs(function() {
    ua(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Kn] = null;
    });
  }), !0) : !1;
};
Jt.unstable_batchedUpdates = _d;
Jt.unstable_renderSubtreeIntoContainer = function(e, t, n, s) {
  if (!ca(n)) throw Error(H(200));
  if (e == null || e._reactInternals === void 0) throw Error(H(38));
  return ua(e, t, n, !1, s);
};
Jt.version = "18.3.1-next-f1338f8080-20240426";
function ax() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ax);
    } catch (e) {
      console.error(e);
    }
}
ax(), am.exports = Jt;
var Ci = am.exports, $f = Ci;
Ac.createRoot = $f.createRoot, Ac.hydrateRoot = $f.hydrateRoot;
const iw = {}, Vf = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (d, f) => {
    const h = typeof d == "function" ? d(t) : d;
    if (!Object.is(h, t)) {
      const p = t;
      t = f ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, p));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (d) => (n.add(d), () => n.delete(d)), destroy: () => {
    (iw ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, ow = (e) => e ? Vf(e) : Vf;
var cx = { exports: {} }, ux = {}, dx = { exports: {} }, hx = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hl = T;
function rw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var aw = typeof Object.is == "function" ? Object.is : rw, cw = Hl.useState, uw = Hl.useEffect, dw = Hl.useLayoutEffect, hw = Hl.useDebugValue;
function fw(e, t) {
  var n = t(), s = cw({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, i = s[1];
  return dw(
    function() {
      l.value = n, l.getSnapshot = t, uc(l) && i({ inst: l });
    },
    [e, n, t]
  ), uw(
    function() {
      return uc(l) && i({ inst: l }), e(function() {
        uc(l) && i({ inst: l });
      });
    },
    [e]
  ), hw(n), n;
}
function uc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !aw(e, n);
  } catch {
    return !0;
  }
}
function pw(e, t) {
  return t();
}
var mw = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? pw : fw;
hx.useSyncExternalStore = Hl.useSyncExternalStore !== void 0 ? Hl.useSyncExternalStore : mw;
dx.exports = hx;
var gw = dx.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var da = T, xw = gw;
function yw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var vw = typeof Object.is == "function" ? Object.is : yw, ww = xw.useSyncExternalStore, Sw = da.useRef, Mw = da.useEffect, bw = da.useMemo, _w = da.useDebugValue;
ux.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var i = Sw(null);
  if (i.current === null) {
    var o = { hasValue: !1, value: null };
    i.current = o;
  } else o = i.current;
  i = bw(
    function() {
      function c(p) {
        if (!u) {
          if (u = !0, d = p, p = s(p), l !== void 0 && o.hasValue) {
            var g = o.value;
            if (l(g, p))
              return f = g;
          }
          return f = p;
        }
        if (g = f, vw(d, p)) return g;
        var w = s(p);
        return l !== void 0 && l(g, w) ? (d = p, g) : (d = p, f = w);
      }
      var u = !1, d, f, h = n === void 0 ? null : n;
      return [
        function() {
          return c(t());
        },
        h === null ? void 0 : function() {
          return c(h());
        }
      ];
    },
    [t, n, s, l]
  );
  var a = ww(e, i[0], i[1]);
  return Mw(
    function() {
      o.hasValue = !0, o.value = a;
    },
    [a]
  ), _w(a), a;
};
cx.exports = ux;
var Tw = cx.exports;
const kw = /* @__PURE__ */ Qp(Tw), fx = {}, { useDebugValue: Cw } = Te, { useSyncExternalStoreWithSelector: jw } = kw;
let Kf = !1;
const Pw = (e) => e;
function Iw(e, t = Pw, n) {
  (fx ? "production" : void 0) !== "production" && n && !Kf && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Kf = !0);
  const s = jw(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return Cw(s), s;
}
const Gf = (e) => {
  (fx ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? ow(e) : e, n = (s, l) => Iw(t, s, l);
  return Object.assign(n, t), n;
}, tt = (e) => e ? Gf(e) : Gf, Nw = {
  width: 0,
  height: 0
}, is = {
  x: 0,
  y: 0,
  zoom: 1
}, Ew = 0.02, Rw = 16, Aw = 2e-3, ci = 0.6, P = 12, me = 8, B = 64, os = 512 * P, Lw = ["nw", "ne", "se", "sw"], dc = -180, hc = 180, Zs = 0.01, Wl = 5, fc = 0, pc = 1, Dw = P * 0.9, Qf = Dw / 2, px = 16, Bw = 8, Yw = 8, Cu = 1, ju = 64, mc = 4096, Zf = 4e6, mx = "pss.traceCanvasOversize", Ed = 8, qf = Ed * 3, Xw = Ed * 4, Fw = 1e3, Ow = {
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
}, Jf = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  pcx: "image/x-pcx",
  tga: "image/x-tga"
}, Pu = [
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
], zw = {
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
}, Hw = (e, t, n) => Math.min(Math.max(e, t), n), Ce = tt((e, t) => ({
  ...Nw,
  camera: { ...is },
  setSize: (n, s) => e((l) => {
    const { camera: i } = l, a = i.x === is.x && i.y === is.y && i.zoom === is.zoom && n > 0 && s > 0 ? {
      x: -n / (2 * i.zoom),
      y: -s / (2 * i.zoom),
      zoom: i.zoom
    } : i;
    return { width: n, height: s, camera: a };
  }),
  setCamera: (n) => e((s) => ({
    camera: { ...s.camera, ...n }
  })),
  resetCamera: () => e((n) => n.width > 0 && n.height > 0 ? {
    camera: {
      x: -n.width / (2 * is.zoom),
      y: -n.height / (2 * is.zoom),
      zoom: is.zoom
    }
  } : { camera: { ...is } }),
  zoomBy: (n, s) => {
    const { camera: l } = t(), i = Hw(l.zoom + n, Ew, Rw);
    if (!s) {
      e({ camera: { ...l, zoom: i } });
      return;
    }
    const o = i / l.zoom, a = s.x - (s.x - l.x) / o, c = s.y - (s.y - l.y) / o;
    e({ camera: { x: a, y: c, zoom: i } });
  },
  panTo: (n, s) => e((l) => ({
    camera: { ...l.camera, x: n, y: s }
  }))
})), ep = [Math.max(0, Pu.length - 1)], Ww = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, ui = (e, t) => {
  const n = Ww(e).filter((s) => s >= 0 && s < t);
  return n.length > 0 ? n : [Math.max(0, t - 1)];
}, ae = tt((e, t) => ({
  colors: Pu,
  selectedIndices: ep,
  addColor: (n) => e((s) => {
    const l = [...s.colors, n], i = l.length - 1;
    return {
      colors: l,
      selectedIndices: ui(
        [...s.selectedIndices.filter((o) => o !== i), i],
        l.length
      )
    };
  }),
  removeColor: (n) => e((s) => {
    if (s.colors.length <= 1)
      return s;
    const l = s.colors.filter((o, a) => a !== n), i = ui(
      s.selectedIndices.filter((o) => o !== n).map((o) => o > n ? o - 1 : o),
      l.length
    );
    return { colors: l, selectedIndices: i };
  }),
  setColor: (n, s) => e((l) => ({
    colors: l.colors.map((i, o) => o === n ? s : i)
  })),
  setPalette: (n) => e((s) => ({
    colors: n,
    selectedIndices: ui(s.selectedIndices, n.length)
  })),
  reset: () => e({
    colors: Pu,
    selectedIndices: ep
  }),
  setSelectedIndices: (n) => e((s) => ({
    selectedIndices: ui(n, s.colors.length)
  })),
  setActiveIndex: (n) => e((s) => ({
    selectedIndices: ui(
      [...s.selectedIndices.filter((l) => l !== n), n],
      s.colors.length
    )
  })),
  getActiveIndex: () => {
    const n = t(), s = n.selectedIndices[n.selectedIndices.length - 1];
    return typeof s == "number" ? s : Math.max(0, n.colors.length - 1);
  }
})), tp = (e, t) => Math.floor(e / t), np = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, sp = (e, t) => {
  const n = tp(t, B), s = tp(e, B);
  return {
    row: n,
    col: s,
    localX: np(e, B),
    localY: np(t, B)
  };
}, $o = (e, t) => `${e}:${t}`;
class pl {
  constructor() {
    this.blocks = /* @__PURE__ */ new Map();
  }
  getPixel(t, n) {
    const { row: s, col: l, localX: i, localY: o } = sp(t, n), a = this.blocks.get($o(s, l));
    return a ? a[o * B + i] : 0;
  }
  setPixel(t, n, s) {
    const { row: l, col: i, localX: o, localY: a } = sp(t, n), c = $o(l, i);
    let u = this.blocks.get(c);
    u || (u = new Uint8Array(B * B), this.blocks.set(c, u)), u[a * B + o] = s;
  }
  setBlock(t, n, s) {
    if (s.length !== B * B)
      throw new Error("Invalid block size");
    this.blocks.set($o(t, n), s);
  }
  getBlock(t, n) {
    return this.blocks.get($o(t, n));
  }
  clear() {
    this.blocks.clear();
  }
  getBlocks() {
    const t = [];
    for (const [n, s] of this.blocks.entries()) {
      const [l, i] = n.split(":"), o = Number(l), a = Number(i);
      t.push({ row: o, col: a, block: s });
    }
    return t;
  }
}
const dr = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`, lp = dr(), se = tt((e, t) => ({
  layers: [{ id: lp, name: "Layer 1", visible: !0, store: new pl() }],
  activeLayerId: lp,
  version: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  createLayer: (n) => {
    const s = dr(), l = n != null && n.trim() ? n.trim() : `Layer ${t().layers.length + 1}`;
    return e((i) => ({
      layers: [...i.layers, { id: s, name: l, visible: !0, store: new pl() }],
      activeLayerId: s,
      version: i.version + 1,
      dirtyAll: !0,
      dirtyBlocks: /* @__PURE__ */ new Set()
    })), s;
  },
  deleteLayer: (n) => {
    e((s) => {
      var a;
      if (s.layers.length <= 1)
        return s;
      const l = s.layers.findIndex((c) => c.id === n);
      if (l === -1)
        return s;
      const i = s.layers.filter((c) => c.id !== n), o = s.activeLayerId === n ? ((a = i[Math.min(l, i.length - 1)]) == null ? void 0 : a.id) ?? i[0].id : s.activeLayerId;
      return {
        layers: i,
        activeLayerId: o,
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
    const o = s === "up" ? i + 1 : i - 1;
    if (o < 0 || o >= l.layers.length)
      return l;
    const a = [...l.layers], [c] = a.splice(i, 1);
    return a.splice(o, 0, c), { layers: a, version: l.version + 1 };
  }),
  setActiveLayer: (n) => e((s) => s.activeLayerId === n || !s.layers.some((l) => l.id === n) ? s : { activeLayerId: n, version: s.version + 1 }),
  getPixel: (n, s) => {
    const l = t().layers.find((i) => i.id === t().activeLayerId);
    return l ? l.store.getPixel(n, s) : 0;
  },
  getPixelInLayer: (n, s, l) => {
    const i = t().layers.find((o) => o.id === n);
    return i ? i.store.getPixel(s, l) : 0;
  },
  getPixelComposite: (n, s) => {
    const l = t().layers;
    for (let i = l.length - 1; i >= 0; i -= 1) {
      const o = l[i];
      if (!o.visible)
        continue;
      const a = o.store.getPixel(n, s);
      if (a !== 0)
        return a;
    }
    return 0;
  },
  setPixel: (n, s, l) => {
    t().setPixelInLayer(t().activeLayerId, n, s, l);
  },
  setPixelInLayer: (n, s, l, i) => {
    const o = t().layers.find((u) => u.id === n);
    if (!o)
      return;
    o.store.setPixel(s, l, i);
    const a = Math.floor(l / B), c = Math.floor(s / B);
    e((u) => {
      const d = new Set(u.dirtyBlocks);
      return d.add(`${n}:${a}:${c}`), { version: u.version + 1, dirtyBlocks: d };
    });
  },
  setPixels: (n) => {
    t().setPixelsInLayer(t().activeLayerId, n);
  },
  setPixelsInLayer: (n, s) => {
    const l = t().layers.find((o) => o.id === n);
    if (!l)
      return;
    const i = new Set(t().dirtyBlocks);
    for (const o of s) {
      l.store.setPixel(o.x, o.y, o.paletteIndex);
      const a = Math.floor(o.y / B), c = Math.floor(o.x / B);
      i.add(`${n}:${a}:${c}`);
    }
    e((o) => ({ version: o.version + 1, dirtyBlocks: i }));
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
    var o, a;
    const l = n.map((c) => {
      const u = new pl();
      for (const d of c.blocks)
        u.setBlock(d.row, d.col, d.data);
      return { id: c.id, name: c.name, visible: c.visible, store: u };
    }), i = ((o = l.find((c) => c.id === s)) == null ? void 0 : o.id) ?? ((a = l[0]) == null ? void 0 : a.id) ?? null;
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
    const s = dr(), l = new pl();
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
    const n = dr();
    e((s) => ({
      layers: [{ id: n, name: "Layer 1", visible: !0, store: new pl() }],
      activeLayerId: n,
      version: s.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll: n, dirtyBlocks: s } = t(), l = Array.from(s).map((i) => {
      const [o, a, c] = i.split(":");
      return o ? { layerId: o, row: Number(a), col: Number(c) } : null;
    }).filter((i) => i !== null);
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), Uw = (e, t) => `${e}:${t}`, W = tt(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(Uw(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class $w {
  constructor() {
    this.activeTool = null;
  }
  setTool(t) {
    this.activeTool = t;
  }
  handleEvent(t, n) {
    var s, l, i, o, a, c, u, d, f, h;
    if (this.activeTool)
      switch (t) {
        case "hover":
          (l = (s = this.activeTool).onHover) == null || l.call(s, n);
          break;
        case "begin":
          (o = (i = this.activeTool).onBegin) == null || o.call(i, n);
          break;
        case "move":
          (c = (a = this.activeTool).onMove) == null || c.call(a, n);
          break;
        case "end":
          (d = (u = this.activeTool).onEnd) == null || d.call(u, n);
          break;
        case "cancel":
          (h = (f = this.activeTool).onCancel) == null || h.call(f, n);
          break;
      }
  }
}
const Vw = "Pixel Splash Studio", Kw = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${Vw} - ${n}${t ? "*" : ""}`;
}, Me = tt((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), Gw = () => {
  const e = Me.getState();
  return Kw(e.path, e.dirty);
}, di = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, gx = 64, Iu = 2, Nu = 24, gc = 6, Qw = 1, Zw = 1, Xr = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(gx, Math.max(1, Math.floor(e))), qw = (e) => Math.max(Iu, Math.min(Nu, Math.round(e))), xc = (e) => ({
  ...e,
  columns: Xr(e.columns, Qw),
  rows: Xr(e.rows, Zw)
}), Jw = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, e1 = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, t1 = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = [];
  let l = 0;
  return e.tiles.forEach((i, o) => {
    if (t.has(o)) {
      n.set(o, -1);
      return;
    }
    n.set(o, l), s.push(i), l += 1;
  }), {
    nextTiles: s,
    indexMap: n,
    nextColumns: e.columns,
    nextRows: e.rows
  };
}, n1 = (e, t) => {
  const n = e.tiles.length, s = Math.max(1, e.columns), l = Math.ceil(n / s), i = [];
  let o = 0;
  for (let f = 0; f < l; f += 1) {
    const h = f * s, p = Math.min(n, h + s);
    let g = !0;
    for (let w = h; w < p; w += 1)
      if (!t.has(w)) {
        g = !1;
        break;
      }
    g && (i.push(f), o += p - h);
  }
  const a = [];
  let c = 0;
  for (let f = 0; f < s; f += 1) {
    let h = !1, p = !0, g = 0;
    for (let w = 0; w < l; w += 1) {
      const M = w * s + f;
      if (!(M >= n) && (h = !0, g += 1, !t.has(M))) {
        p = !1;
        break;
      }
    }
    h && p && (a.push(f), c += g);
  }
  const u = i.length > 0 && o === t.size;
  if (a.length > 0 && c === t.size && s - a.length >= 1) {
    const f = new Set(a), h = /* @__PURE__ */ new Map(), p = [];
    for (let g = 0; g < l; g += 1)
      for (let w = 0; w < s; w += 1) {
        const M = g * s + w;
        if (!(M >= n)) {
          if (f.has(w)) {
            h.set(M, -1);
            continue;
          }
          h.set(M, p.length), p.push(e.tiles[M]);
        }
      }
    return {
      nextTiles: p,
      indexMap: h,
      nextColumns: s - f.size,
      nextRows: e.rows
    };
  }
  if (u && l - i.length >= 1) {
    const f = new Set(i), h = /* @__PURE__ */ new Map(), p = [];
    for (let w = 0; w < l; w += 1)
      for (let M = 0; M < s; M += 1) {
        const v = w * s + M;
        if (!(v >= n)) {
          if (f.has(w)) {
            h.set(v, -1);
            continue;
          }
          h.set(v, p.length), p.push(e.tiles[v]);
        }
      }
    const g = l === e.rows ? Math.max(1, e.rows - f.size) : e.rows;
    return {
      nextTiles: p,
      indexMap: h,
      nextColumns: e.columns,
      nextRows: g
    };
  }
  return t1(e, t);
}, $ = tt((e, t) => ({
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
  tilePickerZoom: gc,
  tilePlacementMode: "hard",
  tilePenSnapToCluster: !1,
  tileDebugOverlay: !1,
  nineSlice: null,
  setTileSets: (n) => e((s) => {
    const l = n.map(xc), i = Jw(
      l,
      s.activeTileSetId
    ), o = l.find((a) => a.id === i);
    return {
      tileSets: l,
      activeTileSetId: i,
      tilePaletteColumns: (o == null ? void 0 : o.columns) ?? s.tilePaletteColumns,
      tilePaletteRowsMin: (o == null ? void 0 : o.rows) ?? s.tilePaletteRowsMin
    };
  }),
  setTileMaps: (n) => e({ tileMaps: n }),
  setAll: (n, s) => e(() => {
    var o;
    const l = n.map(xc), i = l[0];
    return {
      tileSets: l,
      tileMaps: s,
      activeTileSetId: (i == null ? void 0 : i.id) ?? null,
      activeTileMapId: ((o = s[0]) == null ? void 0 : o.id) ?? null,
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
    const l = Math.max(1, Math.floor(n)), i = Math.max(0, l - 1), o = Math.min(s.tilePage, i);
    return s.tilePageCount === l && s.tilePage === o ? s : {
      tilePageCount: l,
      tilePage: o
    };
  }),
  setTilePaletteColumns: (n) => e((s) => ({
    tilePaletteColumns: Math.min(gx, Math.max(1, n)),
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
    tilePickerZoom: Number.isFinite(n) && n > 0 ? qw(n) : gc
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
    const o = Xr(s, i.columns), a = Xr(l, i.rows);
    i.columns === o && i.rows === a || (Me.getState().setDirty(!0), e((c) => ({
      tileSets: c.tileSets.map(
        (u) => u.id === n ? { ...u, columns: o, rows: a } : u
      ),
      tilePaletteColumns: c.activeTileSetId === n ? o : c.tilePaletteColumns,
      tilePaletteRowsMin: c.activeTileSetId === n ? a : c.tilePaletteRowsMin
    })));
  },
  renameTileSet: (n, s) => {
    const l = s.trim();
    if (!l)
      return;
    const i = t().tileSets.find((o) => o.id === n);
    !i || i.name === l || (Me.getState().setDirty(!0), e((o) => ({
      tileSets: o.tileSets.map(
        (a) => a.id === n ? { ...a, name: l } : a
      )
    })));
  },
  deleteTileSet: (n) => {
    var d;
    const s = t(), l = s.tileSets.findIndex((f) => f.id === n);
    if (l < 0)
      return;
    const i = s.tileSets.filter((f) => f.id !== n), o = s.tileMaps.filter((f) => f.tileSetId !== n), a = (() => {
      var h;
      if (s.activeTileSetId && s.activeTileSetId !== n)
        return s.activeTileSetId;
      const f = Math.min(l, Math.max(0, i.length - 1));
      return ((h = i[f]) == null ? void 0 : h.id) ?? null;
    })(), c = i.find((f) => f.id === a) ?? i[0], u = (() => {
      var p;
      if (o.some((g) => g.id === s.activeTileMapId))
        return s.activeTileMapId;
      const h = o.find(
        (g) => g.tileSetId === ((c == null ? void 0 : c.id) ?? null)
      );
      return (h == null ? void 0 : h.id) ?? ((p = o[0]) == null ? void 0 : p.id) ?? null;
    })();
    Me.getState().setDirty(!0), e({
      tileSets: i,
      tileMaps: o,
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
      nineSlice: ((d = s.nineSlice) == null ? void 0 : d.tileSetId) === n ? null : s.nineSlice
    });
  },
  duplicateTileSet: (n) => {
    const s = t(), l = s.tileSets.find((a) => a.id === n);
    if (!l)
      return null;
    const i = di("tileset"), o = {
      ...l,
      id: i,
      name: e1(
        l.name,
        s.tileSets.map((a) => a.name)
      ),
      tiles: l.tiles.map((a) => ({
        ...a,
        id: di("tile"),
        pixels: a.pixels.slice()
      }))
    };
    return Me.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, o],
      activeTileSetId: i,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: o.columns,
      tilePaletteRowsMin: o.rows,
      tilePaletteOffset: 0,
      nineSlice: null
    })), i;
  },
  addTileSet: (n) => {
    const { id: s, ...l } = n, i = s ?? di("tileset"), o = xc({ id: i, ...l });
    return Me.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, o],
      activeTileSetId: i,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: o.columns,
      tilePaletteRowsMin: o.rows,
      tilePaletteOffset: 0
    })), i;
  },
  appendTilesToSet: (n, s) => {
    s.length !== 0 && (Me.getState().setDirty(!0), e((l) => ({
      tileSets: l.tileSets.map((i) => {
        if (i.id !== n)
          return i;
        const o = s.map((a) => ({
          id: di("tile"),
          ...a
        }));
        return { ...i, tiles: [...i.tiles, ...o] };
      })
    })));
  },
  refreshCanvasSourcedTiles: (n, s) => {
    if (!n && s.length === 0)
      return;
    const l = n ? null : new Set(s.map((a) => `${a.row}:${a.col}`)), i = se.getState(), o = (a, c, u, d) => {
      if (!l)
        return !0;
      const f = a, h = c, p = a + Math.max(0, u - 1), g = c + Math.max(0, d - 1), w = Math.floor(f / B), M = Math.floor(p / B), v = Math.floor(h / B), m = Math.floor(g / B);
      for (let x = v; x <= m; x += 1)
        for (let S = w; S <= M; S += 1)
          if (l.has(`${x}:${S}`))
            return !0;
      return !1;
    };
    e((a) => {
      let c = !1;
      const u = a.tileSets.map((d) => {
        const f = d.tileWidth, h = d.tileHeight;
        let p = !1;
        const g = d.tiles.map((w) => {
          const M = w.source;
          if (!M || M.kind !== "canvas" || !o(M.x, M.y, f, h))
            return w;
          const v = [];
          for (let m = 0; m < h; m += 1)
            for (let x = 0; x < f; x += 1)
              v.push(i.getPixelComposite(M.x + x, M.y + m));
          return c = !0, p = !0, { ...w, pixels: v };
        });
        return p ? { ...d, tiles: g } : d;
      });
      return c ? { tileSets: u } : a;
    });
  },
  deleteTilesFromSet: (n, s) => {
    if (s.length === 0)
      return;
    const l = Array.from(new Set(s.filter((o) => o >= 0)));
    if (l.length === 0)
      return;
    const i = new Set(l);
    Me.getState().setDirty(!0), e((o) => {
      var m;
      const a = o.tileSets.find((x) => x.id === n);
      if (!a)
        return o;
      const c = new Set(
        Array.from(i).filter((x) => x >= 0 && x < a.tiles.length)
      );
      if (c.size === 0)
        return o;
      const { nextTiles: u, indexMap: d, nextColumns: f, nextRows: h } = n1(
        a,
        c
      ), p = (x) => x.map((S) => S >= 0 ? d.get(S) ?? -1 : -1), g = p(o.selectedTileIndices).filter(
        (x) => x >= 0
      ), w = (u.length > 0, 0), v = (g.length > 0 ? g : [w])[0] ?? w;
      return {
        tileSets: o.tileSets.map(
          (x) => x.id === n ? { ...x, tiles: u, columns: f, rows: h } : x
        ),
        tileMaps: o.tileMaps.map((x) => {
          if (x.tileSetId !== n)
            return x;
          const S = x.tiles.map((b) => b < 0 ? -1 : d.get(b) ?? -1);
          return { ...x, tiles: S };
        }),
        selectedTileIndex: v,
        selectedTileIndices: [v],
        selectedTileCols: 1,
        selectedTileRows: 1,
        tilePaletteColumns: o.activeTileSetId === n ? f : o.tilePaletteColumns,
        tilePaletteRowsMin: o.activeTileSetId === n ? h : o.tilePaletteRowsMin,
        nineSlice: ((m = o.nineSlice) == null ? void 0 : m.tileSetId) === n && o.nineSlice.tiles.length > 0 ? {
          ...o.nineSlice,
          tiles: p(o.nineSlice.tiles)
        } : o.nineSlice
      };
    });
  },
  consolidateTileSet: (n) => {
    Me.getState().setDirty(!0), e((s) => {
      var g;
      const l = s.tileSets.find((w) => w.id === n);
      if (!l)
        return s;
      const i = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = [];
      let c = 0;
      l.tiles.forEach((w, M) => {
        const v = w.pixels.join(","), m = o.get(v);
        if (m !== void 0) {
          i.set(M, m);
          return;
        }
        o.set(v, c), i.set(M, c), a.push(w), c += 1;
      });
      const u = (w) => w.map((M) => M >= 0 ? i.get(M) ?? -1 : -1), d = u(s.selectedTileIndices).filter(
        (w) => w >= 0
      ), f = (a.length > 0, 0), p = (d.length > 0 ? d : [f])[0] ?? f;
      return {
        tileSets: s.tileSets.map(
          (w) => w.id === n ? { ...w, tiles: a } : w
        ),
        tileMaps: s.tileMaps.map((w) => {
          if (w.tileSetId !== n)
            return w;
          const M = w.tiles.map((v) => v < 0 ? -1 : i.get(v) ?? -1);
          return { ...w, tiles: M };
        }),
        selectedTileIndex: p,
        selectedTileIndices: [p],
        selectedTileCols: 1,
        selectedTileRows: 1,
        nineSlice: ((g = s.nineSlice) == null ? void 0 : g.tileSetId) === n && s.nineSlice.tiles.length > 0 ? {
          ...s.nineSlice,
          tiles: u(s.nineSlice.tiles)
        } : s.nineSlice
      };
    });
  },
  addTileMap: (n) => {
    const { id: s, ...l } = n, i = s ?? di("tilemap"), o = { id: i, ...l };
    return Me.getState().setDirty(!0), e((a) => ({
      tileMaps: [...a.tileMaps, o],
      activeTileMapId: i
    })), i;
  },
  setTileMapTiles: (n, s) => {
    s.length !== 0 && (Me.getState().setDirty(!0), e((l) => ({
      tileMaps: l.tileMaps.map((i) => {
        if (i.id !== n)
          return i;
        const o = i.tiles.slice();
        for (const a of s)
          a.index < 0 || a.index >= o.length || (o[a.index] = a.tile);
        return { ...i, tiles: o };
      })
    })));
  },
  expandTileMapToInclude: (n, s, l, i, o, a, c) => {
    const d = t().tileMaps.find((x) => x.id === n);
    if (!d)
      return null;
    const f = Math.max(0, -s), h = Math.max(0, -i), p = Math.max(0, l - (d.columns - 1)), g = Math.max(0, o - (d.rows - 1));
    if (f === 0 && h === 0 && p === 0 && g === 0)
      return d;
    const w = d.columns + f + p, M = d.rows + h + g, v = new Array(w * M).fill(-1);
    for (let x = 0; x < d.rows; x += 1)
      for (let S = 0; S < d.columns; S += 1) {
        const b = x * d.columns + S, _ = (x + h) * w + (S + f);
        v[_] = d.tiles[b] ?? -1;
      }
    const m = {
      ...d,
      originX: d.originX - f * a,
      originY: d.originY - h * c,
      columns: w,
      rows: M,
      tiles: v
    };
    return Me.getState().setDirty(!0), e((x) => ({
      tileMaps: x.tileMaps.map((S) => S.id === n ? m : S)
    })), m;
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
    tilePickerZoom: gc,
    tilePlacementMode: "hard",
    tilePenSnapToCluster: !1,
    tileDebugOverlay: !1,
    nineSlice: null
  })
})), s1 = (e) => ({
  ...e,
  pixels: e.pixels.slice(),
  source: e.source ? { ...e.source } : void 0
}), xx = (e) => ({
  ...e,
  tiles: e.tiles.map(s1)
}), yx = (e) => ({
  ...e,
  tiles: e.tiles.slice()
}), Eu = (e) => ({
  tileSets: e.tileSets.map(xx),
  tileMaps: e.tileMaps.map(yx),
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
}), Ot = () => {
  const e = $.getState();
  return {
    tileSets: e.tileSets.map(xx),
    tileMaps: e.tileMaps.map(yx),
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
}, l1 = (e, t) => JSON.stringify(e) === JSON.stringify(t), qs = (e, t) => l1(e, t) ? !1 : (Ae.getState().pushBatch({
  changes: [],
  tileBefore: e,
  tileAfter: t
}), !0), ip = (e) => {
  const t = Eu(e);
  $.setState({
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
}, Ae = tt((e, t) => ({
  locked: !1,
  undoStack: [],
  redoStack: [],
  pushBatch: (n) => {
    if (n.changes.length === 0 && !n.tileBefore && !n.tileAfter)
      return;
    Me.getState().setDirty(!0);
    const s = {
      layerId: n.changes.length > 0 ? n.layerId ?? se.getState().activeLayerId : n.layerId,
      changes: n.changes,
      tileBefore: n.tileBefore ? Eu(n.tileBefore) : void 0,
      tileAfter: n.tileAfter ? Eu(n.tileAfter) : void 0
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
      if (Me.getState().setDirty(!0), s.changes.length > 0) {
        const l = se.getState(), i = s.layerId ?? l.activeLayerId;
        for (const o of s.changes)
          l.setPixelInLayer(i, o.x, o.y, o.prev);
      }
      s.tileBefore && ip(s.tileBefore), e((l) => ({
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
      if (Me.getState().setDirty(!0), s.changes.length > 0) {
        const l = se.getState(), i = s.layerId ?? l.activeLayerId;
        for (const o of s.changes)
          l.setPixelInLayer(i, o.x, o.y, o.next);
      }
      s.tileAfter && ip(s.tileAfter), e((l) => ({
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
})), pn = tt((e) => ({
  size: 1,
  shape: "point",
  setSize: (t) => e({ size: t }),
  setShape: (t) => e({ shape: t })
})), Ls = new pl(), op = (e, t) => `${e}:${t}`, xe = tt((e, t) => ({
  store: Ls,
  version: 0,
  selectedCount: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  setSelection: (n, s, l) => {
    const i = Ls.getPixel(n, s), o = l ? 1 : 0;
    if (i === o)
      return;
    Ls.setPixel(n, s, o);
    const a = Math.floor(s / B), c = Math.floor(n / B);
    e((u) => {
      const d = new Set(u.dirtyBlocks);
      d.add(op(a, c));
      const f = u.selectedCount + (o === 1 ? 1 : -1);
      return { version: u.version + 1, dirtyBlocks: d, selectedCount: f };
    });
  },
  setSelections: (n) => {
    if (n.length === 0)
      return;
    const s = new Set(t().dirtyBlocks);
    let l = 0;
    for (const i of n) {
      const o = Ls.getPixel(i.x, i.y), a = i.selected ? 1 : 0;
      if (o === a)
        continue;
      Ls.setPixel(i.x, i.y, a);
      const c = Math.floor(i.y / B), u = Math.floor(i.x / B);
      s.add(op(c, u)), l += a === 1 ? 1 : -1;
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
      const [o, a] = i.split(":");
      return { row: Number(o), col: Number(a) };
    });
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), i1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let o = s; o <= l; o += 1)
      t === "round" && o * o + i * i > e * e || n.push([o, i]);
  return n;
}, rp = (e, t, n) => {
  const s = xe.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, vx = (e, t, n) => {
  const { size: s, shape: l } = pn.getState();
  if (l === "point") {
    rp(e, t, n);
    return;
  }
  const i = i1(s, l);
  for (const [o, a] of i)
    rp(e + o, t + a, n);
}, yc = (e, t) => {
  const n = Math.floor(e.canvasX / P), s = Math.floor(e.canvasY / P);
  vx(n, s, t);
};
class o1 {
  constructor() {
    this.id = "pen", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.changes = /* @__PURE__ */ new Map(), this.lastPoint = null, this.onHover = (t) => {
      if (this.drawing)
        return;
      W.getState().clear();
      const s = ae.getState(), l = t.alt ? 0 : s.getActiveIndex();
      yc(t, l);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = ae.getState();
      this.layerId = se.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), yc(t, this.activeIndex), this.lastPoint = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
      if (this.lastPoint) {
        const s = Math.abs(n.x - this.lastPoint.x), l = Math.abs(n.y - this.lastPoint.y), i = this.lastPoint.x < n.x ? 1 : -1, o = this.lastPoint.y < n.y ? 1 : -1;
        let a = s - l, c = this.lastPoint.x, u = this.lastPoint.y;
        for (; vx(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
          const d = 2 * a;
          d > -l && (a -= l, c += i), d < s && (a += s, u += o);
        }
      } else
        yc(t, this.activeIndex);
      this.lastPoint = n;
    }, this.onEnd = () => {
      var f;
      if (!this.drawing)
        return;
      const t = performance.now(), n = W.getState(), s = se.getState(), l = this.layerId ?? s.activeLayerId, i = [];
      let o = 0;
      for (const h of n.entries()) {
        o += 1;
        const p = `${h.x}:${h.y}`;
        if (!this.changes.has(p))
          this.changes.set(p, {
            x: h.x,
            y: h.y,
            prev: s.getPixelInLayer(l, h.x, h.y),
            next: h.paletteIndex
          });
        else {
          const g = this.changes.get(p);
          g && (g.next = h.paletteIndex);
        }
        i.push({ x: h.x, y: h.y, paletteIndex: h.paletteIndex });
      }
      s.setPixelsInLayer(l, i);
      const a = performance.now();
      Ae.getState().pushBatch({ layerId: l, changes: Array.from(this.changes.values()) });
      const u = performance.now();
      this.changes.clear(), n.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
      const d = performance.now();
      (f = window.debugApi) == null || f.logPerf(
        [
          "pen:onEnd",
          `entries=${o}`,
          `pixelsMs=${(a - t).toFixed(2)}`,
          `historyMs=${(u - a).toFixed(2)}`,
          `totalMs=${(d - t).toFixed(2)}`
        ].join(" ")
      );
    }, this.onCancel = () => {
      W.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
    };
  }
}
const vc = (e, t, n) => Math.min(n, Math.max(t, e)), Gt = tt((e) => ({
  radius: 6,
  density: 250,
  falloff: 0.25,
  deterministic: !1,
  seed: 1,
  setRadius: (t) => e({ radius: vc(Math.round(t), 1, 64) }),
  setDensity: (t) => e({ density: vc(Math.round(t), 1, 2e4) }),
  setFalloff: (t) => e({ falloff: vc(t, 0, 1) }),
  setDeterministic: (t) => e({ deterministic: t }),
  setSeed: (t) => e({ seed: Math.max(0, Math.round(t)) })
})), ap = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), r1 = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), cp = (e, t, n, s) => {
  const l = xe.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || W.getState().setPixel(t, n, s);
}, a1 = () => {
  const e = ae.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, c1 = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class u1 {
  constructor() {
    this.id = "spray", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.lastCursor = null, this.frameHandle = null, this.lastFrameTime = 0, this.emissionBudget = 0, this.changes = /* @__PURE__ */ new Map(), this.rng = null, this.step = (t) => {
      if (!this.drawing || !this.lastCursor) {
        this.stopLoop();
        return;
      }
      const n = Gt.getState(), s = this.lastCursor, l = this.lastFrameTime === 0 ? 0 : t - this.lastFrameTime;
      this.lastFrameTime = t;
      const i = Math.min(0.1, Math.max(0, l / 1e3));
      this.emissionBudget += n.density * i;
      const a = Math.min(1500, Math.floor(this.emissionBudget));
      if (this.emissionBudget -= a, a > 0) {
        const c = Math.floor(s.canvasX / P), u = Math.floor(s.canvasY / P), d = Math.max(1, n.radius), h = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, p = this.rng ?? Math.random, g = this.activeIndex === 0 ? [0] : a1(), w = g.length > 1, M = w ? g : null, v = g[0] ?? this.activeIndex;
        for (let m = 0; m < a; m += 1) {
          const x = p() * Math.PI * 2, S = p(), b = Math.pow(S, h) * d, _ = Math.round(Math.cos(x) * b), k = Math.round(Math.sin(x) * b), C = w ? (M == null ? void 0 : M[Math.floor(p() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : v;
          cp(s, c + _, u + k, C);
        }
      }
      this.frameHandle = ap(this.step);
    }, this.onHover = (t) => {
      if (this.drawing)
        return;
      W.getState().clear();
      const s = ae.getState(), l = Math.floor(t.canvasX / P), i = Math.floor(t.canvasY / P), o = t.alt ? 0 : s.getActiveIndex();
      cp(t, l, i, o);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = ae.getState();
      this.layerId = se.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), this.lastCursor = t, this.emissionBudget = 0, this.lastFrameTime = typeof requestAnimationFrame == "function" ? performance.now() : Date.now();
      const { deterministic: l, seed: i } = Gt.getState();
      this.rng = l ? c1(i) : null, this.stopLoop(), this.frameHandle = ap(this.step);
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
      const t = W.getState(), n = se.getState(), s = this.layerId ?? n.activeLayerId, l = [];
      for (const i of t.entries()) {
        const o = `${i.x}:${i.y}`;
        if (!this.changes.has(o))
          this.changes.set(o, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const a = this.changes.get(o);
          a && (a.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      n.setPixelsInLayer(s, l), Ae.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    }, this.onCancel = () => {
      this.stopLoop(), W.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    };
  }
  stopLoop() {
    this.frameHandle != null && (r1(this.frameHandle), this.frameHandle = null);
  }
}
const hr = (e) => Math.min(255, Math.max(0, Math.round(e))), Mt = (e) => {
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
}, Rd = (e) => `rgb(${e.r}, ${e.g}, ${e.b})`, cn = (e, t) => `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`, hs = (e, t, n) => ({
  r: hr(e.r + (t.r - e.r) * n),
  g: hr(e.g + (t.g - e.g) * n),
  b: hr(e.b + (t.b - e.b) * n)
}), wc = (e) => hr(e).toString(16).padStart(2, "0"), Ul = (e) => `#${wc(e.r)}${wc(e.g)}${wc(e.b)}`, ha = (e) => ({
  r: 255 - e.r,
  g: 255 - e.g,
  b: 255 - e.b
}), d1 = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, h1 = (e) => d1(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, f1 = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), fa = (e, t, n = 60) => f1(e, t) < n ? h1(e) : t, wt = tt((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), pa = () => {
  const e = ae.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, Ru = (e, t, n) => Math.min(n, Math.max(t, e)), p1 = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, m1 = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, g1 = [
  [0, 2],
  [3, 1]
], x1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], y1 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], v1 = (e, t, n) => e === "bayer2" ? (g1[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (x1[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (y1[n & 7][t & 7] + 0.5) / 64 : e === "random" ? p1(t, n) : e === "blue-noise" ? m1(t, n) : 0.5, up = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const i = n.maxX - n.minX, o = n.maxY - n.minY, a = i === 0 ? 1 : i, c = o === 0 ? 1 : o, u = e - n.minX, d = t - n.minY;
  let f = 0;
  return s === "top-bottom" ? f = d / c : s === "bottom-top" ? f = 1 - d / c : s === "left-right" ? f = u / a : s === "right-left" && (f = 1 - u / a), f = Ru(f, 0, 1), f * (l - 1);
}, w1 = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", S1 = (e) => e === "floyd-steinberg" ? [
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
], Zi = (e, t, n, s, l) => {
  const i = n.length, o = /* @__PURE__ */ new Map();
  if (i === 0 || e.length === 0)
    return o;
  if (!w1(l)) {
    for (const A of e) {
      const L = up(A.x, A.y, t, s, i), Y = Math.floor(L), j = L - Y, O = v1(l, A.x, A.y), G = j > O ? Y + 1 : Y, oe = Ru(G, 0, i - 1);
      o.set(`${A.x}:${A.y}`, n[oe] ?? 0);
    }
    return o;
  }
  const a = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = a * c, d = Number.isFinite(u) && u > 0 && u <= 2e6;
  let f = null, h = null, p = null, g = null;
  if (d) {
    f = new Uint8Array(u), h = new Float32Array(u);
    for (const A of e) {
      const L = (A.y - t.minY) * a + (A.x - t.minX);
      L >= 0 && L < f.length && (f[L] = 1);
    }
  } else {
    p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    for (const A of e)
      p.add(`${A.x}:${A.y}`);
  }
  const w = (A, L) => {
    if (f) {
      const Y = (L - t.minY) * a + (A - t.minX);
      return Y >= 0 && Y < f.length && f[Y] === 1;
    }
    return (p == null ? void 0 : p.has(`${A}:${L}`)) ?? !1;
  }, M = (A, L) => {
    if (h) {
      const Y = (L - t.minY) * a + (A - t.minX);
      return h[Y] ?? 0;
    }
    return (g == null ? void 0 : g.get(`${A}:${L}`)) ?? 0;
  }, v = (A, L, Y) => {
    if (!w(A, L))
      return;
    if (h) {
      const O = (L - t.minY) * a + (A - t.minX);
      h[O] += Y;
      return;
    }
    const j = `${A}:${L}`;
    g == null || g.set(j, (g.get(j) ?? 0) + Y);
  }, m = s === "right-left" ? -1 : 1, x = s === "bottom-top" ? -1 : 1, S = m > 0 ? t.minX : t.maxX, b = m > 0 ? t.maxX : t.minX, _ = x > 0 ? t.minY : t.maxY, k = x > 0 ? t.maxY : t.minY, C = S1(l);
  for (let A = _; x > 0 ? A <= k : A >= k; A += x)
    for (let L = S; m > 0 ? L <= b : L >= b; L += m) {
      if (!w(L, A))
        continue;
      const j = up(L, A, t, s, i) + M(L, A), O = Ru(Math.round(j), 0, i - 1);
      o.set(`${L}:${A}`, n[O] ?? 0);
      const G = j - O;
      if (!Number.isFinite(G) || G === 0)
        continue;
      const oe = [];
      let Q = 0;
      for (const te of C) {
        const D = L + te.dx * m, F = A + te.dy * x;
        w(D, F) && (oe.push({ x: D, y: F, weight: te.weight }), Q += te.weight);
      }
      if (!(Q <= 0))
        for (const te of oe)
          v(te.x, te.y, G * te.weight / Q);
    }
  return o;
}, Au = (e, t, n) => {
  const s = xe.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, M1 = (e, t, n, s, l) => {
  let i = Math.abs(n - e), o = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - o;
  for (; Au(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -o && (u -= o, e += a), d < i && (u += i, t += c);
  }
}, b1 = (e, t, n, s) => {
  const l = [];
  let i = Math.abs(n - e), o = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - o;
  for (; l.push({ x: e, y: t }), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -o && (u -= o, e += a), d < i && (u += i, t += c);
  }
  return l;
};
class _1 {
  constructor() {
    this.id = "line", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onHover = (t) => {
      if (this.start)
        return;
      W.getState().clear();
      const s = ae.getState(), l = t.alt ? 0 : s.getActiveIndex(), i = Math.floor(t.canvasX / P), o = Math.floor(t.canvasY / P);
      Au(i, o, l);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = ae.getState();
      this.layerId = se.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : pa(), this.start = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
      let l = s;
      if (t.shift) {
        const o = s.x - this.start.x, a = s.y - this.start.y, c = Math.atan2(a, o), u = Math.round(c / (Math.PI / 4)) * (Math.PI / 4), d = Math.max(Math.abs(o), Math.abs(a));
        l = {
          x: this.start.x + Math.round(Math.cos(u) * d),
          y: this.start.y + Math.round(Math.sin(u) * d)
        };
      }
      const i = this.activeRamp.length > 1 ? this.activeRamp : [];
      if (i.length > 1) {
        const o = {
          minX: Math.min(this.start.x, l.x),
          maxX: Math.max(this.start.x, l.x),
          minY: Math.min(this.start.y, l.y),
          maxY: Math.max(this.start.y, l.y)
        }, a = b1(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = wt.getState(), d = Zi(
          a,
          o,
          i,
          c,
          u
        );
        for (const f of a)
          Au(f.x, f.y, d.get(`${f.x}:${f.y}`) ?? i[0] ?? 0);
      } else
        M1(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = se.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      for (const i of t.entries()) {
        const o = `${i.x}:${i.y}`;
        if (!this.changes.has(o))
          this.changes.set(o, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const a = this.changes.get(o);
          a && (a.next = i.paletteIndex);
        }
        n.setPixelInLayer(s, i.x, i.y, i.paletteIndex);
      }
      Ae.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Fr = tt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), T1 = (e, t, n) => {
  const s = xe.getState(), l = W.getState(), i = Math.min(e.x, t.x), o = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = a; u <= c; u += 1)
    for (let d = i; d <= o; d += 1)
      s.selectedCount > 0 && !s.isSelected(d, u) || l.setPixel(d, u, n);
}, k1 = (e, t, n) => {
  const s = xe.getState(), l = W.getState(), i = Math.min(e.x, t.x), o = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = i; u <= o; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, a)) && l.setPixel(u, a, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = a + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n), (s.selectedCount === 0 || s.isSelected(o, u)) && l.setPixel(o, u, n);
};
class C1 {
  constructor() {
    this.id = "rectangle", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      W.getState().clear();
      const s = ae.getState();
      this.layerId = se.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : pa(), this.start = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      }, l = Fr.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], o = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = xe.getState(), c = [];
        if (l === "filled")
          for (let h = o.minY; h <= o.maxY; h += 1)
            for (let p = o.minX; p <= o.maxX; p += 1)
              a.selectedCount > 0 && !a.isSelected(p, h) || c.push({ x: p, y: h });
        else {
          for (let h = o.minX; h <= o.maxX; h += 1)
            (a.selectedCount === 0 || a.isSelected(h, o.minY)) && c.push({ x: h, y: o.minY }), (a.selectedCount === 0 || a.isSelected(h, o.maxY)) && c.push({ x: h, y: o.maxY });
          for (let h = o.minY + 1; h <= o.maxY - 1; h += 1)
            (a.selectedCount === 0 || a.isSelected(o.minX, h)) && c.push({ x: o.minX, y: h }), (a.selectedCount === 0 || a.isSelected(o.maxX, h)) && c.push({ x: o.maxX, y: h });
        }
        const { gradientDirection: u, gradientDither: d } = wt.getState(), f = Zi(
          c,
          o,
          i,
          u,
          d
        );
        for (const h of c)
          n.setPixel(h.x, h.y, f.get(`${h.x}:${h.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        T1(this.start, s, this.activeIndex);
        return;
      }
      k1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = se.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const i of t.entries()) {
        const o = `${i.x}:${i.y}`;
        if (!this.changes.has(o))
          this.changes.set(o, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const a = this.changes.get(o);
          a && (a.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Ae.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Or = tt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), fs = (e, t, n) => {
  const s = xe.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, zr = (e, t, n, s, l) => {
  let i = Math.abs(n - e), o = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - o;
  for (; fs(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -o && (u -= o, e += a), d < i && (u += i, t += c);
  }
}, j1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y), a = (l - s) / 2, c = (o - i) / 2, u = (s + l) / 2, d = (i + o) / 2;
  if (a === 0 && c === 0) {
    fs(s, i, n);
    return;
  }
  if (a === 0) {
    zr(s, i, s, o, n);
    return;
  }
  if (c === 0) {
    zr(s, i, l, i, n);
    return;
  }
  const f = a * a, h = c * c;
  for (let p = i; p <= o; p += 1) {
    const g = p - d;
    for (let w = s; w <= l; w += 1) {
      const M = w - u;
      M * M / f + g * g / h <= 1 && fs(w, p, n);
    }
  }
}, P1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y), a = (l - s) / 2, c = (o - i) / 2, u = (s + l) / 2, d = (i + o) / 2;
  if (a === 0 && c === 0) {
    fs(s, i, n);
    return;
  }
  if (a === 0) {
    zr(s, i, s, o, n);
    return;
  }
  if (c === 0) {
    zr(s, i, l, i, n);
    return;
  }
  const f = a * a, h = c * c;
  for (let p = s; p <= l; p += 1) {
    const g = p - u, w = 1 - g * g / f;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * c, v = Math.round(d - M), m = Math.round(d + M);
    fs(p, v, n), fs(p, m, n);
  }
  for (let p = i; p <= o; p += 1) {
    const g = p - d, w = 1 - g * g / h;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * a, v = Math.round(u - M), m = Math.round(u + M);
    fs(v, p, n), fs(m, p, n);
  }
};
class I1 {
  constructor() {
    this.id = "oval", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      W.getState().clear();
      const s = ae.getState();
      this.layerId = se.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : pa(), this.start = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / P),
        y: Math.floor(t.canvasY / P)
      }, l = Or.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], o = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = xe.getState(), c = [], u = (o.maxX - o.minX) / 2, d = (o.maxY - o.minY) / 2, f = (o.minX + o.maxX) / 2, h = (o.minY + o.maxY) / 2, p = (m, x) => a.selectedCount === 0 || a.isSelected(m, x), g = (m, x) => {
          p(m, x) && c.push({ x: m, y: x });
        };
        if (u === 0 && d === 0)
          g(o.minX, o.minY);
        else if (u === 0)
          for (let m = o.minY; m <= o.maxY; m += 1)
            g(o.minX, m);
        else if (d === 0)
          for (let m = o.minX; m <= o.maxX; m += 1)
            g(m, o.minY);
        else if (l === "filled") {
          const m = u * u, x = d * d;
          for (let S = o.minY; S <= o.maxY; S += 1) {
            const b = S - h;
            for (let _ = o.minX; _ <= o.maxX; _ += 1) {
              const k = _ - f;
              k * k / m + b * b / x <= 1 && g(_, S);
            }
          }
        } else {
          const m = u * u, x = d * d;
          for (let S = o.minX; S <= o.maxX; S += 1) {
            const b = S - f, _ = 1 - b * b / m;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * d;
            g(S, Math.round(h - k)), g(S, Math.round(h + k));
          }
          for (let S = o.minY; S <= o.maxY; S += 1) {
            const b = S - h, _ = 1 - b * b / x;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * u;
            g(Math.round(f - k), S), g(Math.round(f + k), S);
          }
        }
        const { gradientDirection: w, gradientDither: M } = wt.getState(), v = Zi(
          c,
          o,
          i,
          w,
          M
        );
        for (const m of c)
          n.setPixel(m.x, m.y, v.get(`${m.x}:${m.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        j1(this.start, s, this.activeIndex);
        return;
      }
      P1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = se.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const i of t.entries()) {
        const o = `${i.x}:${i.y}`;
        if (!this.changes.has(o))
          this.changes.set(o, {
            x: i.x,
            y: i.y,
            prev: n.getPixelInLayer(s, i.x, i.y),
            next: i.paletteIndex
          });
        else {
          const a = this.changes.get(o);
          a && (a.next = i.paletteIndex);
        }
        l.push({ x: i.x, y: i.y, paletteIndex: i.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Ae.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const $l = tt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), Re = tt((e) => ({
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
})), Js = tt((e) => ({
  mode: "pixel",
  setMode: (t) => {
    const n = t === "tile" ? "tile" : "pixel";
    e({ mode: n });
    const s = Re.getState();
    if (n === "tile") {
      s.setShowTileLayer(!0), s.setShowPixelLayer(!1);
      return;
    }
    s.setShowPixelLayer(!0), s.setShowTileLayer(!1);
  }
})), N1 = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), E1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, Sc = (e, t) => E1(N1(e), t), dp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * me,
    maxX: (l + 1) * me - 1,
    minY: i * me,
    maxY: (o + 1) * me - 1
  } : { minX: s, maxX: l, minY: i, maxY: o };
}, R1 = (e, t) => {
  const n = W.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  for (let a = i; a <= o; a += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, a, 1);
};
class A1 {
  constructor() {
    this.id = "selection-rect", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      W.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : $l.getState().snap, this.start = Sc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = Sc(t, this.snap);
      this.last = s;
      const l = dp(this.start, s, this.snap);
      R1({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = xe.getState(), l = t ? Sc(t, this.snap) : this.last ?? this.start, i = dp(this.start, l, this.snap), o = !this.isRemoving, a = [];
      for (let c = i.minY; c <= i.maxY; c += 1)
        for (let u = i.minX; u <= i.maxX; u += 1)
          a.push({ x: u, y: c, selected: o });
      s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const L1 = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), D1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, Mc = (e, t) => D1(L1(e), t), hp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * me,
    maxX: (l + 1) * me - 1,
    minY: i * me,
    maxY: (o + 1) * me - 1
  } : { minX: s, maxX: l, minY: i, maxY: o };
}, fp = (e, t) => {
  const { minX: n, maxX: s, minY: l, maxY: i } = e, o = (s - n) / 2, a = (i - l) / 2, c = (n + s) / 2, u = (l + i) / 2;
  if (o === 0 && a === 0) {
    t(n, l);
    return;
  }
  if (o === 0) {
    for (let h = l; h <= i; h += 1)
      t(n, h);
    return;
  }
  if (a === 0) {
    for (let h = n; h <= s; h += 1)
      t(h, l);
    return;
  }
  const d = o * o, f = a * a;
  for (let h = l; h <= i; h += 1) {
    const p = h - u;
    for (let g = n; g <= s; g += 1) {
      const w = g - c;
      w * w / d + p * p / f <= 1 && t(g, h);
    }
  }
};
class B1 {
  constructor() {
    this.id = "selection-oval", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      W.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : $l.getState().snap, this.start = Mc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = Mc(t, this.snap);
      this.last = s;
      const l = hp(this.start, s, this.snap);
      fp(l, (i, o) => n.setPixel(i, o, 1));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = xe.getState(), l = t ? Mc(t, this.snap) : this.last ?? this.start, i = hp(this.start, l, this.snap), o = !this.isRemoving, a = [];
      fp(i, (c, u) => {
        a.push({ x: c, y: u, selected: o });
      }), s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const Y1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let o = s; o <= l; o += 1)
      t === "round" && o * o + i * i > e * e || n.push([o, i]);
  return n;
}, X1 = (e) => {
  var v, m, x, S;
  if (e.length === 0)
    return [];
  let t = ((v = e[0]) == null ? void 0 : v.x) ?? 0, n = ((m = e[0]) == null ? void 0 : m.x) ?? 0, s = ((x = e[0]) == null ? void 0 : x.y) ?? 0, l = ((S = e[0]) == null ? void 0 : S.y) ?? 0;
  for (const b of e)
    t = Math.min(t, b.x), n = Math.max(n, b.x), s = Math.min(s, b.y), l = Math.max(l, b.y);
  const i = 1, o = t - i, a = s - i, c = n - t + 1 + i * 2, u = l - s + 1 + i * 2;
  if (c <= 0 || u <= 0)
    return [];
  const d = c * u;
  if (d > 5e6)
    return e;
  const f = new Uint8Array(d);
  for (const b of e) {
    const _ = b.x - o, k = b.y - a;
    _ < 0 || _ >= c || k < 0 || k >= u || (f[_ + k * c] = 1);
  }
  const h = new Uint8Array(d), p = [];
  let g = 0;
  const w = (b, _) => {
    const k = b + _ * c;
    h[k] === 1 || f[k] === 1 || (h[k] = 1, p.push(k));
  };
  for (let b = 0; b < c; b += 1)
    w(b, 0), w(b, u - 1);
  for (let b = 1; b < u - 1; b += 1)
    w(0, b), w(c - 1, b);
  for (; g < p.length; ) {
    const b = p[g] ?? 0;
    g += 1;
    const _ = b % c, k = Math.floor(b / c);
    _ > 0 && w(_ - 1, k), _ + 1 < c && w(_ + 1, k), k > 0 && w(_, k - 1), k + 1 < u && w(_, k + 1);
  }
  const M = [];
  for (let b = 1; b < u - 1; b += 1)
    for (let _ = 1; _ < c - 1; _ += 1) {
      const k = _ + b * c, C = f[k] === 1;
      (!(h[k] === 1) || C) && M.push({ x: o + _, y: a + b });
    }
  return M;
}, bc = (e, t) => {
  const n = Math.floor(e.canvasX / P), s = Math.floor(e.canvasY / P);
  return t ? {
    x: Math.floor(n / me),
    y: Math.floor(s / me)
  } : { x: n, y: s };
}, fr = (e, t, n) => {
  const s = W.getState();
  if (n) {
    const a = e * me, c = t * me;
    for (let u = 0; u < me; u += 1)
      for (let d = 0; d < me; d += 1)
        s.setPixel(a + d, c + u, 1);
    return;
  }
  const { size: l, shape: i } = pn.getState();
  if (i === "point") {
    s.setPixel(e, t, 1);
    return;
  }
  const o = Y1(l, i);
  for (const [a, c] of o)
    s.setPixel(e + a, t + c, 1);
}, pp = (e, t, n) => {
  const s = Math.abs(t.x - e.x), l = Math.abs(t.y - e.y), i = e.x < t.x ? 1 : -1, o = e.y < t.y ? 1 : -1;
  let a = s - l, c = e.x, u = e.y;
  for (; fr(c, u, n), !(c === t.x && u === t.y); ) {
    const d = 2 * a;
    d > -l && (a -= l, c += i), d < s && (a += s, u += o);
  }
}, F1 = (e) => {
  var l, i;
  if (e.length < 4)
    return [];
  let t = ((l = e[0]) == null ? void 0 : l.y) ?? 0, n = ((i = e[0]) == null ? void 0 : i.y) ?? 0;
  for (const o of e)
    t = Math.min(t, o.y), n = Math.max(n, o.y);
  const s = [];
  for (let o = t; o <= n; o += 1) {
    const a = o + 0.5, c = [];
    for (let u = 0; u < e.length - 1; u += 1) {
      const d = e[u], f = e[u + 1];
      if (!d || !f || d.y === f.y)
        continue;
      const h = Math.min(d.y, f.y), p = Math.max(d.y, f.y);
      if (a < h || a >= p)
        continue;
      const g = (a - d.y) / (f.y - d.y), w = d.x + g * (f.x - d.x);
      c.push(w);
    }
    c.sort((u, d) => u - d);
    for (let u = 0; u < c.length - 1; u += 2) {
      const d = c[u] ?? 0, f = c[u + 1] ?? 0, h = Math.ceil(Math.min(d, f) - 0.5), p = Math.floor(Math.max(d, f) - 0.5);
      for (let g = h; g <= p; g += 1)
        s.push({ x: g, y: o });
    }
  }
  return s;
};
class O1 {
  constructor() {
    this.id = "selection-lasso", this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1, this.onHover = (t) => {
      if (this.drawing)
        return;
      this.tileMode = Js.getState().mode === "tile", W.getState().clear();
      const s = bc(t, this.tileMode);
      fr(s.x, s.y, this.tileMode);
    }, this.onBegin = (t) => {
      W.getState().clear(), this.drawing = !0, this.isRemoving = t.ctrl, this.tileMode = Js.getState().mode === "tile";
      const s = bc(t, this.tileMode);
      fr(s.x, s.y, this.tileMode), this.startPoint = s, this.lastPoint = s, this.path = [s];
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = bc(t, this.tileMode);
      this.lastPoint && n.x === this.lastPoint.x && n.y === this.lastPoint.y || (this.lastPoint ? pp(this.lastPoint, n, this.tileMode) : fr(n.x, n.y, this.tileMode), this.lastPoint = n, this.path.push(n));
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      const t = W.getState(), n = xe.getState(), s = !this.isRemoving, { shape: l } = pn.getState(), i = this.startPoint, o = this.lastPoint;
      i && o && (i.x !== o.x || i.y !== o.y) && pp(o, i, this.tileMode);
      const a = [];
      for (const p of this.path) {
        const g = a[a.length - 1];
        (!g || g.x !== p.x || g.y !== p.y) && a.push(p);
      }
      const c = i ?? a[0] ?? null, u = a[a.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && a.push(c);
      const d = Array.from(t.entries()).map((p) => ({ x: p.x, y: p.y })), f = l === "point" && !this.tileMode ? F1(a) : X1(d), h = (f.length > 0 ? f : d).map((p) => ({ x: p.x, y: p.y, selected: s }));
      n.setSelections(h), t.clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    };
  }
}
const Vo = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, mp = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
});
class z1 {
  constructor() {
    this.id = "texture-roll", this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0, this.onBegin = (t) => {
      W.getState().clear();
      const n = xe.getState();
      if (n.selectedCount === 0)
        return;
      const s = mp(t);
      if (!n.isSelected(s.x, s.y))
        return;
      const l = this.collectSelection();
      if (!l)
        return;
      this.startCursor = s, this.layerId = se.getState().activeLayerId, this.dragging = !0, this.didMove = !1, this.selectedPixels = l.pixels, this.rowGroups = l.rows, this.colGroups = l.cols, this.originalPixels = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
      const i = se.getState();
      for (const o of this.selectedPixels)
        this.originalPixels.set(
          `${o.x}:${o.y}`,
          i.getPixelInLayer(this.layerId, o.x, o.y)
        );
    }, this.onMove = (t) => {
      if (!this.dragging || !this.startCursor)
        return;
      const n = mp(t), s = this.getStepSize(), l = Math.round((n.x - this.startCursor.x) / s) * s, i = Math.round((n.y - this.startCursor.y) / s) * s;
      this.applyOffset(l, i);
    }, this.onEnd = () => {
      if (!this.dragging || !this.layerId)
        return;
      const t = se.getState(), n = [];
      if (this.didMove)
        for (const s of this.selectedPixels) {
          const l = `${s.x}:${s.y}`, i = this.originalPixels.get(l) ?? 0, o = t.getPixelInLayer(this.layerId, s.x, s.y);
          i !== o && n.push({ x: s.x, y: s.y, prev: i, next: o });
        }
      n.length > 0 && Ae.getState().pushBatch({ layerId: this.layerId, changes: n }), W.getState().clear(), this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    }, this.onCancel = () => {
      if (W.getState().clear(), this.dragging && this.layerId) {
        const t = se.getState(), n = [];
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
    return $l.getState().snap === "tile" ? me : 1;
  }
  collectSelection() {
    const t = xe.getState();
    if (t.selectedCount === 0)
      return null;
    const n = t.store.getBlocks(), s = [], l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const { row: o, col: a, block: c } of n) {
      const u = a * B, d = o * B;
      for (let f = 0; f < B; f += 1)
        for (let h = 0; h < B; h += 1) {
          if (c[f * B + h] !== 1)
            continue;
          const p = u + h, g = d + f;
          s.push({ x: p, y: g });
          const w = l.get(g) ?? [];
          w.push(p), l.set(g, w);
          const M = i.get(p) ?? [];
          M.push(g), i.set(p, M);
        }
    }
    if (s.length === 0)
      return null;
    for (const o of l.values())
      o.sort((a, c) => a - c);
    for (const o of i.values())
      o.sort((a, c) => a - c);
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
    const i = l.length, o = Vo(s, i);
    if (o === 0)
      return;
    const a = l.map((c) => t.get(`${c}:${n}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = Vo(c - o, i), d = l[c];
      t.set(`${d}:${n}`, a[u] ?? 0);
    }
  }
  rotateCol(t, n, s) {
    const l = this.colGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const i = l.length, o = Vo(s, i);
    if (o === 0)
      return;
    const a = l.map((c) => t.get(`${n}:${c}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = Vo(c - o, i), d = l[c];
      t.set(`${n}:${d}`, a[u] ?? 0);
    }
  }
  applyOffset(t, n) {
    if (!this.layerId || t === this.lastDx && n === this.lastDy)
      return;
    this.lastDx = t, this.lastDy = n, this.didMove = this.didMove || t !== 0 || n !== 0;
    const s = this.getStepSize(), l = Math.trunc(t / s), i = Math.trunc(n / s), o = new Map(this.originalPixels);
    if (l !== 0)
      for (const c of this.rowGroups.keys())
        this.rotateRow(o, c, l);
    if (i !== 0)
      for (const c of this.colGroups.keys())
        this.rotateCol(o, c, i);
    const a = [];
    for (const c of this.selectedPixels)
      a.push({
        x: c.x,
        y: c.y,
        paletteIndex: o.get(`${c.x}:${c.y}`) ?? 0
      });
    se.getState().setPixelsInLayer(this.layerId, a);
  }
}
const Ps = () => {
  const e = xe.getState();
  if (e.selectedCount === 0)
    return null;
  const t = se.getState(), n = [];
  let s = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
  const a = e.store.getBlocks();
  for (const { row: c, col: u, block: d } of a) {
    const f = u * B, h = c * B;
    for (let p = 0; p < B; p += 1)
      for (let g = 0; g < B; g += 1) {
        if (d[p * B + g] !== 1)
          continue;
        const w = f + g, M = h + p, v = t.getPixel(w, M);
        n.push({ x: w, y: M, paletteIndex: v }), s = Math.min(s, w), l = Math.max(l, w), i = Math.min(i, M), o = Math.max(o, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: i, maxY: o };
}, H1 = 2e3, W1 = 6, zs = [], Us = /* @__PURE__ */ new Map();
let Hr = !1, gp = 1, Al = null;
const pr = () => typeof performance < "u" ? performance.now() : Date.now(), wx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(pr()), 0), U1 = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, Sx = (e, t) => {
  const n = Math.floor(t / B), s = Math.floor(e / B);
  return `${n}:${s}`;
}, $1 = (e, t) => {
  t <= 0 || Us.set(e, (Us.get(e) ?? 0) + t);
}, V1 = (e) => {
  const t = (Us.get(e) ?? 0) - 1;
  t > 0 ? Us.set(e, t) : Us.delete(e);
}, Mx = () => {
  const e = zs[0];
  if (!e) {
    Ae.getState().setLocked(!1), Hr = !1, Al = null;
    return;
  }
  const t = pr(), n = e.chunkSize, s = e.timeBudgetMs, l = se.getState();
  for (; zs[0] === e && e.index < e.changes.length; ) {
    const i = [];
    for (; e.index < e.changes.length && i.length < n; ) {
      const o = e.changes[e.index];
      if (e.index += 1, i.push({ x: o.x, y: o.y, paletteIndex: o.next }), V1(Sx(o.x, o.y)), pr() - t > s)
        break;
    }
    if (i.length > 0 && l.setPixelsInLayer(e.layerId, i), e.index >= e.changes.length) {
      Ae.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), zs.shift(), zs.length === 0 && Ae.getState().setLocked(!1);
      break;
    }
    if (pr() - t > s)
      break;
  }
  Al = wx(Mx);
}, K1 = () => {
  Hr || (Hr = !0, Al = wx(Mx));
}, qi = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  zs.length === 0 && Ae.getState().setLocked(!0);
  const n = String(gp);
  gp += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = se.getState().activeLayerId, i = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : H1, o = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : W1;
  zs.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: i, timeBudgetMs: o });
  const a = /* @__PURE__ */ new Map();
  for (const u of e) {
    const d = Sx(u.x, u.y);
    a.set(d, (a.get(d) ?? 0) + 1);
  }
  for (const [u, d] of a.entries())
    $1(u, d);
  K1();
}, G1 = () => Array.from(Us.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), Ad = () => {
  zs.length = 0, Us.clear(), Ae.getState().setLocked(!1), Hr = !1, Al !== null && (U1(Al), Al = null);
}, bx = () => {
  const e = Ce.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / P),
    minY: Math.floor(e.camera.y / P),
    maxX: Math.floor((e.camera.x + t) / P),
    maxY: Math.floor((e.camera.y + n) / P)
  };
}, Q1 = (e) => {
  const t = xe.getState();
  if (t.selectedCount === 0)
    return;
  const n = se.getState(), s = [], l = t.store.getBlocks();
  for (const { row: i, col: o, block: a } of l) {
    const c = o * B, u = i * B;
    for (let d = 0; d < B; d += 1)
      for (let f = 0; f < B; f += 1) {
        if (a[d * B + f] !== 1)
          continue;
        const h = c + f, p = u + d, g = n.getPixel(h, p);
        g !== e && s.push({ x: h, y: p, prev: g, next: e });
      }
  }
  s.length !== 0 && qi(s, { label: "Fill Selection" });
}, Z1 = (e, t, n, s) => {
  if (n === s)
    return;
  const l = xe.getState(), i = se.getState(), o = l.selectedCount > 0, a = o ? null : bx();
  if (!o && !a || o && !l.isSelected(e, t))
    return;
  const c = /* @__PURE__ */ new Set(), u = [e], d = [t], f = [];
  for (let h = 0; h < u.length; h += 1) {
    const p = u[h], g = d[h];
    if (a && (p < a.minX || p > a.maxX || g < a.minY || g > a.maxY))
      continue;
    const w = `${p}:${g}`;
    if (!c.has(w) && (c.add(w), !(o && !l.isSelected(p, g)) && i.getPixel(p, g) === n)) {
      if (a && (p === a.minX || p === a.maxX || g === a.minY || g === a.maxY))
        return;
      f.push({ x: p, y: g, prev: n, next: s }), u.push(p + 1, p - 1, p, p), d.push(g, g, g + 1, g - 1);
    }
  }
  f.length !== 0 && qi(f, { label: "Fill Region" });
}, q1 = () => {
  const e = ae.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, J1 = (e, t, n) => {
  const s = xe.getState(), l = se.getState(), i = s.selectedCount > 0, o = i ? null : bx();
  if (!i && !o || i && !s.isSelected(e, t))
    return null;
  const a = /* @__PURE__ */ new Set(), c = [e], u = [t], d = [];
  let f = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY, p = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY;
  for (let w = 0; w < c.length; w += 1) {
    const M = c[w], v = u[w];
    if (o && (M < o.minX || M > o.maxX || v < o.minY || v > o.maxY))
      continue;
    const m = `${M}:${v}`;
    if (a.has(m) || (a.add(m), i && !s.isSelected(M, v)))
      continue;
    const x = l.getPixel(M, v);
    if (x === n) {
      if (o && (M === o.minX || M === o.maxX || v === o.minY || v === o.maxY))
        return null;
      d.push({ x: M, y: v, prev: x }), f = Math.min(f, M), h = Math.max(h, M), p = Math.min(p, v), g = Math.max(g, v), c.push(M + 1, M - 1, M, M), u.push(v, v, v + 1, v - 1);
    }
  }
  return d.length === 0 ? null : { pixels: d, bounds: { minX: f, maxX: h, minY: p, maxY: g } };
}, xp = (e, t, n, s, l) => {
  const i = [];
  if (n.length === 0)
    return;
  const o = e.map((c) => ({ x: c.x, y: c.y })), a = Zi(o, t, n, s, l);
  for (const c of e) {
    const u = a.get(`${c.x}:${c.y}`) ?? n[0] ?? 0;
    u !== c.prev && i.push({ x: c.x, y: c.y, prev: c.prev, next: u });
  }
  i.length !== 0 && qi(i, { label: "Gradient Fill" });
};
class eS {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      W.getState().clear();
      const n = ae.getState(), s = wt.getState().mode, l = q1(), i = l.length > 1, o = l[0] ?? n.getActiveIndex(), { gradientDirection: a, gradientDither: c } = wt.getState(), u = Math.floor(t.canvasX / P), d = Math.floor(t.canvasY / P);
      if (s === "selection") {
        if (!i) {
          Q1(o);
          return;
        }
        const h = Ps();
        if (!h)
          return;
        const p = h.pixels.map((g) => ({
          x: g.x,
          y: g.y,
          prev: g.paletteIndex
        }));
        xp(
          p,
          {
            minX: h.minX,
            maxX: h.maxX,
            minY: h.minY,
            maxY: h.maxY
          },
          l,
          a,
          c
        );
        return;
      }
      if (i) {
        const h = se.getState().getPixel(u, d), p = J1(u, d, h);
        if (!p)
          return;
        xp(p.pixels, p.bounds, l, a, c);
        return;
      }
      const f = se.getState().getPixel(u, d);
      Z1(u, d, f, o);
    };
  }
}
const ot = tt((e) => ({
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
})), Ge = tt((e) => ({
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
})), tS = () => {
  const e = ot.getState();
  if (e.pixels.length === 0)
    return !1;
  const t = ae.getState(), n = t.colors, s = [...n], l = /* @__PURE__ */ new Map();
  for (const o of e.pixels) {
    const a = o.paletteIndex;
    if (a === 0 || l.has(a))
      continue;
    const c = n[a] ?? n[0] ?? "#000000";
    l.set(a, s.length), s.push(c);
  }
  if (l.size === 0)
    return !1;
  const i = e.pixels.map((o) => {
    const a = l.get(o.paletteIndex);
    return a ? { ...o, paletteIndex: a } : o;
  });
  return t.setPalette(s), ot.getState().setBuffer({
    pixels: i,
    origin: e.origin ?? { x: 0, y: 0 },
    width: e.width,
    height: e.height
  }), !0;
}, _c = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), nS = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me) * me,
  y: Math.floor(e.y / me) * me
} : e, sS = (e, t, n, s, l, i, o) => {
  const a = s === 90 || s === 270 ? n : t, c = s === 90 || s === 270 ? t : n, u = [];
  for (const d of e) {
    let f = d.x, h = d.y;
    i && (f = t - 1 - f), o && (h = n - 1 - h);
    let p = f, g = h;
    if (s === 90 ? (p = n - 1 - h, g = f) : s === 180 ? (p = t - 1 - f, g = n - 1 - h) : s === 270 && (p = h, g = t - 1 - f), l === 1) {
      u.push({ x: p, y: g, paletteIndex: d.paletteIndex });
      continue;
    }
    const w = p * l, M = g * l;
    for (let v = 0; v < l; v += 1)
      for (let m = 0; m < l; m += 1)
        u.push({ x: w + m, y: M + v, paletteIndex: d.paletteIndex });
  }
  return { pixels: u, width: a * l, height: c * l };
};
class lS {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = Ge.getState(), i = nS(t, l.snap);
      return {
        x: i.x - Math.floor(n / 2),
        y: i.y - Math.floor(s / 2)
      };
    }, this.renderPreview = (t) => {
      const n = W.getState();
      n.clear();
      const s = this.getTransformed();
      if (!s)
        return;
      const l = this.getAnchor(
        _c(t),
        s.width,
        s.height
      ), i = xe.getState(), o = i.selectedCount > 0;
      for (const a of s.pixels) {
        if (Ge.getState().mode === "soft" && a.paletteIndex === 0)
          continue;
        const c = l.x + a.x, u = l.y + a.y;
        o && !i.isSelected(c, u) || n.setPixel(c, u, a.paletteIndex);
      }
    }, this.applyStampAt = (t, n) => {
      const s = this.getTransformed();
      if (!s)
        return;
      const l = Ge.getState(), i = xe.getState(), o = i.selectedCount > 0, a = se.getState(), c = this.layerId ?? a.activeLayerId, u = [];
      for (const d of s.pixels) {
        if (l.mode === "soft" && d.paletteIndex === 0)
          continue;
        const f = t + d.x, h = n + d.y;
        if (o && !i.isSelected(f, h))
          continue;
        const p = a.getPixelInLayer(c, f, h);
        if (p === d.paletteIndex)
          continue;
        const g = `${f}:${h}`;
        if (!this.changes.has(g))
          this.changes.set(g, { x: f, y: h, prev: p, next: d.paletteIndex });
        else {
          const w = this.changes.get(g);
          w && (w.next = d.paletteIndex);
        }
        u.push({ x: f, y: h, paletteIndex: d.paletteIndex });
      }
      u.length !== 0 && a.setPixelsInLayer(c, u);
    }, this.flushChanges = () => {
      if (this.changes.size === 0)
        return;
      const t = se.getState(), n = this.layerId ?? t.activeLayerId;
      Ae.getState().pushBatch({ layerId: n, changes: Array.from(this.changes.values()) }), this.changes.clear();
    }, this.stampLine = (t, n) => {
      let s = t.x, l = t.y;
      const i = Math.abs(n.x - t.x), o = Math.abs(n.y - t.y), a = t.x < n.x ? 1 : -1, c = t.y < n.y ? 1 : -1;
      let u = i - o;
      for (; ; ) {
        const d = this.getTransformed();
        if (!d)
          return;
        const f = this.getAnchor({ x: s, y: l }, d.width, d.height);
        if ((!this.lastAnchor || this.lastAnchor.x !== f.x || this.lastAnchor.y !== f.y) && (this.applyStampAt(f.x, f.y), this.lastAnchor = f), s === n.x && l === n.y)
          break;
        const h = 2 * u;
        h > -o && (u -= o, s += a), h < i && (u += i, l += c);
      }
    }, this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      this.changes.clear(), this.layerId = se.getState().activeLayerId, this.lastAnchor = null;
      const n = Ge.getState(), s = n.drag;
      !s && n.pasteDuplicateColors && tS();
      const l = _c(t);
      if (s) {
        this.dragging = !0, this.lastPoint = l, this.stampLine(l, l), this.renderPreview(t);
        return;
      }
      const i = this.getTransformed();
      if (!i)
        return;
      const o = this.getAnchor(l, i.width, i.height);
      this.applyStampAt(o.x, o.y), this.flushChanges(), this.renderPreview(t);
    }, this.onMove = (t) => {
      if (this.dragging && this.lastPoint) {
        const n = _c(t);
        this.stampLine(this.lastPoint, n), this.lastPoint = n;
      }
      this.renderPreview(t);
    }, this.onEnd = () => {
      this.dragging && this.flushChanges(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, W.getState().clear();
    }, this.onCancel = () => {
      W.getState().clear(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, this.changes.clear();
    };
  }
  getTransformed() {
    const t = ot.getState();
    if (t.pixels.length === 0 || t.width === 0 || t.height === 0)
      return null;
    const n = Ge.getState();
    if (this.cache && this.cache.source === t.pixels && this.cache.width === t.width && this.cache.height === t.height && this.cache.rotation === n.rotation && this.cache.scale === n.scale && this.cache.flipX === n.flipX && this.cache.flipY === n.flipY)
      return {
        pixels: this.cache.pixels,
        width: this.cache.transformedWidth,
        height: this.cache.transformedHeight
      };
    const s = sS(
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
const yp = (e) => {
  const t = Math.floor(e.canvasX / P), n = Math.floor(e.canvasY / P), s = se.getState().getPixelComposite(t, n), l = ae.getState();
  if (e.ctrl) {
    l.setSelectedIndices(
      [...l.selectedIndices.filter((i) => i !== s), s]
    );
    return;
  }
  l.setSelectedIndices([s]);
};
class iS {
  constructor() {
    this.id = "eyedropper", this.onHover = () => {
      W.getState().clear();
    }, this.onBegin = (t) => {
      W.getState().clear(), yp(t);
    }, this.onMove = (t) => {
      yp(t);
    }, this.onCancel = () => {
      W.getState().clear();
    };
  }
}
const oS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, zt = tt((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? oS();
    return Me.getState().setDirty(!0), e((i) => ({
      items: [...i.items, { id: l, ...s }],
      selectedId: l
    })), l;
  },
  setSelected: (t) => e({ selectedId: t }),
  updateReference: (t, n) => {
    Me.getState().setDirty(!0), e((s) => ({
      items: s.items.map((l) => l.id === t ? { ...l, ...n } : l)
    }));
  },
  removeReference: (t) => {
    Me.getState().setDirty(!0), e((n) => ({
      items: n.items.filter((s) => s.id !== t),
      selectedId: n.selectedId === t ? null : n.selectedId
    }));
  },
  clear: () => {
    Me.getState().setDirty(!0), e({ items: [], selectedId: null });
  }
})), Wr = tt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), rS = (e) => e * Math.PI / 180, Zn = (e) => {
  const t = e.width * P, n = e.height * P, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, i = t * s, o = n * s;
  return {
    centerX: e.x * P + i / 2,
    centerY: e.y * P + o / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: rS(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Ko = (e, t, n) => {
  const s = Zn(e), l = t * s.scale * s.flipX, i = n * s.scale * s.flipY, o = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * o - i * a,
    y: s.centerY + l * a + i * o
  };
}, aS = (e, t, n) => {
  const s = Zn(e), l = t - s.centerX, i = n - s.centerY, o = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad), c = l * o + i * a, u = -l * a + i * o;
  return {
    x: c * s.flipX / s.scale,
    y: u * s.flipY / s.scale
  };
}, _x = (e) => {
  const { baseWidth: t, baseHeight: n } = Zn(e), s = t / 2, l = n / 2;
  return {
    nw: { x: -s, y: -l },
    ne: { x: s, y: -l },
    se: { x: s, y: l },
    sw: { x: -s, y: l }
  };
}, ma = (e) => {
  const t = _x(e);
  return {
    nw: Ko(e, t.nw.x, t.nw.y),
    ne: Ko(e, t.ne.x, t.ne.y),
    se: Ko(e, t.se.x, t.se.y),
    sw: Ko(e, t.sw.x, t.sw.y)
  };
}, ga = (e) => {
  const t = ma(e), n = Object.values(t), s = n.map((i) => i.x), l = n.map((i) => i.y);
  return {
    minX: Math.min(...s),
    maxX: Math.max(...s),
    minY: Math.min(...l),
    maxY: Math.max(...l)
  };
}, cS = (e, t, n) => {
  const s = aS(e, t, n), { baseWidth: l, baseHeight: i } = Zn(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= i / 2;
}, Go = (e, t) => Math.round(e / t) * t, vp = (e) => e === "tile" ? me : 1, uS = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, wp = (e, t, n) => {
  const s = ma(e);
  for (const l of Lw) {
    const i = s[l];
    if (Math.abs(t - i.x) <= Qf && Math.abs(n - i.y) <= Qf)
      return l;
  }
  return null;
}, Sp = (e, t) => {
  const n = _x(e), s = ma(e), l = uS[t], i = Zn(e);
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
class dS {
  constructor() {
    this.id = "reference-handle", this.drag = null, this.onHover = () => {
      this.drag || W.getState().clear();
    }, this.onBegin = (t) => {
      W.getState().clear();
      const { items: n, selectedId: s, setSelected: l } = zt.getState(), i = t.canvasX, o = t.canvasY, a = s ? n.find((f) => f.id === s) : null;
      if (a) {
        const f = wp(a, i, o);
        if (f) {
          this.drag = Sp(a, f);
          return;
        }
      }
      let c = null;
      for (let f = n.length - 1; f >= 0; f -= 1) {
        const h = n[f];
        if (cS(h, i, o)) {
          c = h;
          break;
        }
      }
      if (!c) {
        l(null), this.drag = null;
        return;
      }
      l(c.id);
      const u = wp(c, i, o);
      if (u) {
        this.drag = Sp(c, u);
        return;
      }
      const d = Zn(c);
      this.drag = {
        id: c.id,
        mode: "move",
        offsetX: i - d.centerX,
        offsetY: o - d.centerY
      };
    }, this.onMove = (t) => {
      if (!this.drag)
        return;
      const n = zt.getState(), s = Wr.getState().snap, l = n.items.find((F) => {
        var K;
        return F.id === ((K = this.drag) == null ? void 0 : K.id);
      });
      if (!l) {
        this.drag = null;
        return;
      }
      const i = t.canvasX, o = t.canvasY;
      if (this.drag.mode === "move") {
        const F = Zn(l), K = F.baseWidth * F.scale, le = F.baseHeight * F.scale, re = i - this.drag.offsetX, Se = o - this.drag.offsetY, X = vp(s), ie = (re - K / 2) / P, ge = (Se - le / 2) / P, z = Go(ie, X), Z = Go(ge, X);
        n.updateReference(l.id, { x: z, y: Z });
        return;
      }
      const a = i - this.drag.anchorWorldX, c = o - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), d = Math.sin(this.drag.rotationRad), f = a * u + c * d, h = -a * d + c * u, p = f * this.drag.flipX, g = h * this.drag.flipY, w = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, v = w !== 0 ? Math.abs(p / w) : 0, m = M !== 0 ? Math.abs(g / M) : 0, x = Math.max(v, m), S = Number.isFinite(x) && x > 0 ? x : Zs, b = vp(s) * P, _ = Math.max(
        b,
        Go(this.drag.baseWidth * S, b)
      ), k = Math.max(
        b,
        Go(this.drag.baseHeight * S, b)
      );
      let C = Math.max(
        Zs,
        Math.max(_ / this.drag.baseWidth, k / this.drag.baseHeight)
      );
      C = Math.min(C, Wl);
      const A = this.drag.baseWidth * C, L = this.drag.baseHeight * C, Y = this.drag.anchorLocal.x * C * this.drag.flipX, j = this.drag.anchorLocal.y * C * this.drag.flipY, O = Y * u - j * d, G = Y * d + j * u, oe = this.drag.anchorWorldX - O, Q = this.drag.anchorWorldY - G, te = (oe - A / 2) / P, D = (Q - L / 2) / P;
      n.updateReference(l.id, { x: te, y: D, scale: C });
    }, this.onEnd = () => {
      this.drag = null;
    }, this.onCancel = () => {
      this.drag = null;
    };
  }
}
const Mp = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, hS = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2,
    zoom: e.camera.zoom
  };
}, bp = (e, t, n) => {
  const s = Ce.getState(), l = n ?? s.camera.zoom, i = s.width, o = s.height;
  if (i <= 0 || o <= 0 || !Number.isFinite(l) || l <= 0)
    return;
  const a = e - i / (2 * l), c = t - o / (2 * l);
  s.setCamera({ x: a, y: c, zoom: l });
}, Ln = (e, t = 0) => Number.isFinite(e) ? Math.round(e) : t, fS = (e) => !e || typeof e != "object" ? null : e.kind === "camera" ? {
  id: e.id,
  name: e.name,
  kind: "camera",
  centerX: Number.isFinite(e.centerX) ? e.centerX : 0,
  centerY: Number.isFinite(e.centerY) ? e.centerY : 0,
  zoom: Number.isFinite(e.zoom) && e.zoom > 0 ? e.zoom : 1
} : e.kind === "region" ? {
  id: e.id,
  name: e.name,
  kind: "region",
  x: Ln(e.x),
  y: Ln(e.y),
  width: Math.max(1, Ln(e.width, 1)),
  height: Math.max(1, Ln(e.height, 1))
} : null, Yt = tt((e, t) => ({
  items: [],
  overlaysVisible: !0,
  addFromCamera: () => e((n) => {
    const s = hS(), l = Mp(), i = `Bookmark ${n.items.length + 1}`;
    return Me.getState().setDirty(!0), {
      items: [
        ...n.items,
        {
          id: l,
          name: i,
          kind: "camera",
          centerX: s.x,
          centerY: s.y,
          zoom: s.zoom
        }
      ]
    };
  }),
  addRegionTag: ({ x: n, y: s, width: l, height: i, name: o }) => e((a) => {
    const c = Mp(), u = a.items.filter((d) => d.kind === "region").length;
    return Me.getState().setDirty(!0), {
      items: [
        ...a.items,
        {
          id: c,
          name: o != null && o.trim() ? o.trim() : `Tile Tag ${u + 1}`,
          kind: "region",
          x: Ln(n),
          y: Ln(s),
          width: Math.max(1, Ln(l, 1)),
          height: Math.max(1, Ln(i, 1))
        }
      ]
    };
  }),
  rename: (n, s) => e((l) => (Me.getState().setDirty(!0), {
    items: l.items.map((i) => i.id === n ? { ...i, name: s } : i)
  })),
  setRegionPosition: (n, s, l) => e((i) => {
    let o = !1;
    const a = i.items.map((c) => {
      if (c.id !== n || c.kind !== "region")
        return c;
      const u = Ln(s), d = Ln(l);
      return c.x === u && c.y === d ? c : (o = !0, { ...c, x: u, y: d });
    });
    return o ? (Me.getState().setDirty(!0), { items: a }) : i;
  }),
  remove: (n) => e((s) => (Me.getState().setDirty(!0), { items: s.items.filter((l) => l.id !== n) })),
  move: (n, s) => e((l) => {
    const i = l.items.findIndex((u) => u.id === n);
    if (i === -1)
      return l;
    const o = s === "up" ? i - 1 : i + 1;
    if (o < 0 || o >= l.items.length)
      return l;
    const a = [...l.items], [c] = a.splice(i, 1);
    return a.splice(o, 0, c), Me.getState().setDirty(!0), { items: a };
  }),
  jumpTo: (n) => {
    const s = t().items.find((o) => o.id === n);
    if (!s)
      return;
    if (s.kind === "camera") {
      bp(s.centerX, s.centerY, s.zoom);
      return;
    }
    const l = s.x + s.width / 2, i = s.y + s.height / 2;
    bp(l * P, i * P);
  },
  setOverlaysVisible: (n) => e((s) => {
    const l = !!n;
    return s.overlaysVisible === l ? s : (Me.getState().setDirty(!0), { overlaysVisible: l });
  }),
  toggleOverlaysVisible: () => e((n) => (Me.getState().setDirty(!0), { overlaysVisible: !n.overlaysVisible })),
  setAll: (n, s = !0) => e({
    items: n.map(fS).filter((l) => l !== null),
    overlaysVisible: !!s
  }),
  clear: () => e({ items: [], overlaysVisible: !0 })
})), Tc = (e) => ({
  x: Math.floor(e.canvasX / P / me),
  y: Math.floor(e.canvasY / P / me)
}), _p = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), pS = (e) => {
  const t = W.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * me, i = n * me;
      for (let o = 0; o < me; o += 1)
        for (let a = 0; a < me; a += 1)
          t.setPixel(l + a, i + o, 1);
    }
}, mS = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class gS {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      W.getState().clear(), this.start = Tc(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = Tc(t);
      this.last = s, pS(_p(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = t ? Tc(t) : this.last ?? this.start, l = _p(this.start, s), i = se.getState(), o = $.getState(), a = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
      let u = o.activeTileSetId;
      const d = o.tileSets.find((p) => p.id === u);
      let f = (d == null ? void 0 : d.tiles.length) ?? 0;
      if (!d || d.tileWidth !== me || d.tileHeight !== me)
        u = o.addTileSet({
          name: `Tile Set ${o.tileSets.length + 1}`,
          tileWidth: me,
          tileHeight: me,
          columns: a,
          rows: c,
          tiles: []
        }), f = 0;
      else if (d && d.tiles.length === 0)
        o.setTileSetLayout(d.id, a, c);
      else if (d && d.tiles.length > 0 && (d.columns !== a || d.rows !== c)) {
        mS(
          `Invalid selection: ${d.name} expects ${d.columns}x${d.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const h = [];
      for (let p = l.minTileY; p <= l.maxTileY; p += 1)
        for (let g = l.minTileX; g <= l.maxTileX; g += 1) {
          const w = [], M = g * me, v = p * me;
          for (let m = 0; m < me; m += 1)
            for (let x = 0; x < me; x += 1)
              w.push(i.getPixelComposite(M + x, v + m));
          h.push({ pixels: w, source: { kind: "canvas", x: M, y: v } });
        }
      u && (o.appendTilesToSet(u, h), o.setSelectedTileIndex(f), o.setTilePage(0), o.setTilePaletteOffset(0), Yt.getState().addRegionTag({
        x: l.minTileX * me,
        y: l.minTileY * me,
        width: a * me,
        height: c * me
      })), n.clear(), this.start = null, this.last = null;
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const xS = (e) => e.some((t) => t === 0), yS = (e) => e.every((t) => t === 0);
class Ur {
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
    if (t === "hard" || !xS(l))
      return n;
    const i = s >= 0 ? this.tiles[s] : void 0, o = l.map(
      (d, f) => d === 0 ? (i == null ? void 0 : i[f]) ?? 0 : d
    );
    if (yS(o))
      return -1;
    const a = o.join(","), c = this.tileIndexBySignature.get(a);
    if (c !== void 0)
      return c;
    const u = this.tiles.length;
    return this.tiles.push(o), this.tileIndexBySignature.set(a, u), this.pendingTiles.push({ pixels: o }), u;
  }
  getTilePixels(t) {
    return t < 0 || t >= this.tiles.length ? null : this.tiles[t] ?? null;
  }
  getPendingTiles() {
    return this.pendingTiles.slice();
  }
}
const vS = 32, kc = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), wS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, Tp = () => {
  const e = $.getState(), t = e.tileSets.find((l) => l.id === e.activeTileSetId);
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
  const n = $.getState(), s = n.tileSets.find((h) => h.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (h) => h.id === n.activeTileMapId && h.tileSetId === e
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
  const i = n.tileMaps.find((h) => h.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const o = vS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: o,
    rows: o,
    tiles: a
  }), originX: u, originY: d, columns: o, rows: o, tiles: a };
};
class SS {
  constructor() {
    this.id = "tile-pen", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Tp(), !this.activeTile) || (this.placementResolver = new Ur(this.activeTile.tileSetTiles), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = kc(t), l = this.toWorldTilePoint(s);
      l && this.applyTile(this.snapWorldPointToCluster(l));
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.erasing = t.alt, this.activeTile = Tp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.placementResolver = new Ur(this.activeTile.tileSetTiles), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = kc(t), l = this.toWorldTilePoint(s);
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
      const n = kc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      const l = this.snapWorldPointToCluster(s);
      if (this.lastWorldPoint)
        if (this.activeTile.snapToCluster)
          this.drawSnappedLine(this.lastWorldPoint, l);
        else {
          let i = this.lastWorldPoint.x, o = this.lastWorldPoint.y;
          const a = Math.abs(l.x - this.lastWorldPoint.x), c = Math.abs(l.y - this.lastWorldPoint.y), u = this.lastWorldPoint.x < l.x ? 1 : -1, d = this.lastWorldPoint.y < l.y ? 1 : -1;
          let f = a - c;
          for (; this.applyTile({ x: i, y: o }), !(i === l.x && o === l.y); ) {
            const h = 2 * f;
            h > -c && (f -= c, i += u), h < a && (f += a, o += d);
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
        s.length > 0 && $.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if ($.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Ot();
        qs(this.historyBefore, s);
      }
      W.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
    }, this.onCancel = () => {
      W.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
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
    let i = Math.floor(t.x / s), o = Math.floor(t.y / l);
    const a = Math.floor(n.x / s), c = Math.floor(n.y / l), u = Math.abs(a - i), d = Math.abs(c - o), f = i < a ? 1 : -1, h = o < c ? 1 : -1;
    let p = u - d;
    for (; this.applyTile({ x: i * s, y: o * l }), !(i === a && o === c); ) {
      const g = 2 * p;
      g > -d && (p -= d, i += f), g < u && (p += u, o += h);
    }
  }
  ensureMapBounds(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.activeTile.selectionCols, s = this.activeTile.selectionRows, l = this.toMapPoint(t);
    if (!l)
      return null;
    const i = l.x, o = l.y, a = l.x + n - 1, c = l.y + s - 1, u = $.getState(), d = this.activeMap.columns, f = this.activeMap.originX, h = this.activeMap.originY, p = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      a,
      o,
      c,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    if (p) {
      this.activeMap = {
        tileMapId: p.id,
        originX: p.originX,
        originY: p.originY,
        columns: p.columns,
        rows: p.rows,
        tiles: p.tiles
      };
      const g = Math.round(
        (f - p.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (h - p.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || w !== 0 || p.columns !== d) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, m] of this.changes.entries()) {
          const x = Math.floor(v / d), S = v % d, b = x + w, _ = S + g;
          b < 0 || _ < 0 || b >= p.rows || _ >= p.columns || M.set(b * p.columns + _, m);
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
    const i = this.activeTile.selectionCols, o = this.activeTile.selectionRows, a = this.activeTile.selectionIndices;
    for (let c = 0; c < o; c += 1)
      for (let u = 0; u < i; u += 1) {
        const d = n.x + u, f = n.y + c;
        if (d < 0 || f < 0 || d >= s || f >= l)
          continue;
        const h = f * s + d, p = c * i + u, g = a[p] ?? -1, w = this.erasing ? -1 : this.resolvePlacedTileIndex(g, h);
        if (this.drawing && this.changes.set(h, w), this.erasing)
          continue;
        const M = this.getTilePixels(w);
        if (!M)
          continue;
        const v = t.x + u, m = t.y + c, x = v * this.activeTile.tileWidth, S = m * this.activeTile.tileHeight;
        wS(
          x,
          S,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          M
        );
      }
  }
}
const MS = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), bS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
};
class _S {
  constructor() {
    this.id = "tile-stamp", this.drawing = !1, this.historyBefore = null, this.lastPoint = null, this.touchedAnchors = /* @__PURE__ */ new Set(), this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      const n = this.getContext();
      if (!n) {
        W.getState().clear();
        return;
      }
      this.drawing = !0, this.historyBefore = Ot(), this.touchedAnchors.clear();
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
        const t = Ot();
        qs(this.historyBefore, t);
      }
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), W.getState().clear();
    }, this.onCancel = () => {
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), W.getState().clear();
    };
  }
  getContext() {
    const n = ot.getState().tileBuffer;
    if (!n || n.cols <= 0 || n.rows <= 0 || n.tiles.length === 0)
      return null;
    const s = $.getState(), l = s.tileSets.find((o) => o.id === n.tileSetId);
    if (!l)
      return null;
    const i = s.tileMaps.find(
      (o) => o.id === s.activeTileMapId && o.tileSetId === l.id
    ) ?? s.tileMaps.find((o) => o.tileSetId === l.id);
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
    const s = MS(t);
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
    W.getState().clear();
    const s = this.getContext();
    if (!s)
      return;
    const l = this.toWorldTilePoint(t, s.tileSet), i = this.getAnchor(l, s), o = Math.round(s.tileMap.originX / s.tileSet.tileWidth), a = Math.round(s.tileMap.originY / s.tileSet.tileHeight);
    for (let u = 0; u < s.buffer.rows; u += 1)
      for (let d = 0; d < s.buffer.cols; d += 1) {
        const f = s.buffer.tiles[u * s.buffer.cols + d] ?? -1;
        if (f < 0)
          continue;
        const h = (c = s.tileSet.tiles[f]) == null ? void 0 : c.pixels;
        if (!h)
          continue;
        const p = i.x + d - o, g = i.y + u - a, w = s.tileMap.originX + p * s.tileSet.tileWidth, M = s.tileMap.originY + g * s.tileSet.tileHeight;
        bS(
          w,
          M,
          s.tileSet.tileWidth,
          s.tileSet.tileHeight,
          h
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
    const l = t.x * n.tileSet.tileWidth, i = t.y * n.tileSet.tileHeight, o = $.getState(), a = o.expandTileMapToInclude(
      n.tileMap.id,
      t.x,
      t.x + n.buffer.cols - 1,
      t.y,
      t.y + n.buffer.rows - 1,
      n.tileSet.tileWidth,
      n.tileSet.tileHeight
    ) ?? o.tileMaps.find((f) => f.id === n.tileMap.id) ?? null;
    if (!a)
      return;
    const c = Math.round((l - a.originX) / n.tileSet.tileWidth), u = Math.round((i - a.originY) / n.tileSet.tileHeight), d = [];
    for (let f = 0; f < n.buffer.rows; f += 1)
      for (let h = 0; h < n.buffer.cols; h += 1) {
        const p = c + h, g = u + f;
        if (p < 0 || g < 0 || p >= a.columns || g >= a.rows)
          continue;
        const w = n.buffer.tiles[f * n.buffer.cols + h] ?? -1;
        d.push({ index: g * a.columns + p, tile: w });
      }
    d.length > 0 && o.setTileMapTiles(a.id, d);
  }
  stampLine(t, n, s) {
    let l = t.x, i = t.y;
    const o = Math.abs(n.x - t.x), a = Math.abs(n.y - t.y), c = t.x < n.x ? 1 : -1, u = t.y < n.y ? 1 : -1;
    let d = o - a;
    for (; this.applyStamp(this.getAnchor({ x: l, y: i }, s)), !(l === n.x && i === n.y); ) {
      const f = 2 * d;
      f > -a && (d -= a, l += c), f < o && (d += o, i += u);
    }
  }
}
const TS = 32, Cc = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), kS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, Cp = () => {
  const e = $.getState(), t = e.tileSets.find((s) => s.id === e.activeTileSetId);
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
}, jp = (e, t) => {
  const n = $.getState(), s = n.tileSets.find((h) => h.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (h) => h.id === n.activeTileMapId && h.tileSetId === e
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
  const i = n.tileMaps.find((h) => h.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const o = TS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: o,
    rows: o,
    tiles: a
  }), originX: u, originY: d, columns: o, rows: o, tiles: a };
};
class CS {
  constructor() {
    this.id = "tile-rectangle", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.seed = 0, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Cp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = jp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = Cc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.applyTileArea(l, l));
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Cp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.resetPlacementResolver(), this.activeMap = jp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = Cc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.startWorldPoint = l, this.lastWorldPoint = l, this.applyTileArea(l, l));
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      const n = Cc(t), s = this.toWorldTilePoint(n);
      s && (this.lastWorldPoint = s, this.startWorldPoint && (W.getState().clear(), this.changes.clear(), this.resetPlacementResolver(), this.applyTileArea(this.startWorldPoint, s)));
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      if (this.placementResolver) {
        const s = this.placementResolver.getPendingTiles();
        s.length > 0 && $.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if ($.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Ot();
        qs(this.historyBefore, s);
      }
      W.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      W.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Ur(this.activeTile.tileSetTiles);
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
    const i = l.x, o = l.y, a = l.x + n - 1, c = l.y + s - 1, u = $.getState(), d = this.activeMap.columns, f = this.activeMap.originX, h = this.activeMap.originY, p = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      a,
      o,
      c,
      this.activeTile.tileWidth,
      this.activeTile.tileHeight
    );
    if (p) {
      this.activeMap = {
        tileMapId: p.id,
        originX: p.originX,
        originY: p.originY,
        columns: p.columns,
        rows: p.rows,
        tiles: p.tiles
      };
      const g = Math.round(
        (f - p.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (h - p.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || w !== 0 || p.columns !== d) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, m] of this.changes.entries()) {
          const x = Math.floor(v / d), S = v % d, b = x + w, _ = S + g;
          b < 0 || _ < 0 || b >= p.rows || _ >= p.columns || M.set(b * p.columns + _, m);
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
    const s = Math.min(t.x, n.x), l = Math.max(t.x, n.x), i = Math.min(t.y, n.y), o = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: s, y: i }))
      return;
    const { columns: c, rows: u } = this.activeMap, d = Math.round(this.activeMap.originX / this.activeTile.tileWidth), f = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let h = i; h <= o; h += 1)
      for (let p = s; p <= l; p += 1) {
        const g = p - d, w = h - f;
        if (g < 0 || w < 0 || g >= c || w >= u)
          continue;
        const M = this.sampleTileIndexForCell(p, h);
        if (M === null)
          continue;
        const v = w * c + g, m = this.resolvePlacedTileIndex(M, v);
        this.drawing && this.changes.set(v, m);
        const x = this.getTilePixels(m);
        if (!x)
          continue;
        const S = p * this.activeTile.tileWidth, b = h * this.activeTile.tileHeight;
        kS(
          S,
          b,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          x
        );
      }
  }
}
const jS = 1, PS = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), i = jS, o = i, a = i * 2, c = s * (e.tileWidth + a), u = l * (e.tileHeight + a), d = new Uint8ClampedArray(c * u * 4), f = t.map((m) => Mt(m) ?? { r: 0, g: 0, b: 0 }), h = (m, x, S) => {
    if (m < 0 || x < 0 || m >= c || x >= u)
      return;
    const b = (x * c + m) * 4;
    d[b] = S.r, d[b + 1] = S.g, d[b + 2] = S.b, d[b + 3] = 255;
  };
  n.forEach((m, x) => {
    const S = e.tiles[m];
    if (!S)
      return;
    const b = x % s * (e.tileWidth + a), _ = Math.floor(x / s) * (e.tileHeight + a);
    for (let k = 0; k < e.tileHeight; k += 1)
      for (let C = 0; C < e.tileWidth; C += 1) {
        const A = S.pixels[k * e.tileWidth + C] ?? 0;
        if (A === 0)
          continue;
        const L = f[A] ?? f[0] ?? { r: 0, g: 0, b: 0 }, Y = b + o + C, j = _ + o + k;
        h(Y, j, L), C === 0 && h(Y - 1, j, L), C === e.tileWidth - 1 && h(Y + 1, j, L), k === 0 && h(Y, j - 1, L), k === e.tileHeight - 1 && h(Y, j + 1, L), C === 0 && k === 0 && h(Y - 1, j - 1, L), C === 0 && k === e.tileHeight - 1 && h(Y - 1, j + 1, L), C === e.tileWidth - 1 && k === 0 && h(Y + 1, j - 1, L), C === e.tileWidth - 1 && k === e.tileHeight - 1 && h(Y + 1, j + 1, L);
      }
  });
  const p = document.createElement("canvas");
  p.width = c, p.height = u;
  const g = p.getContext("2d");
  if (!g)
    throw new Error("Unable to export tile atlas.");
  const w = new ImageData(d, c, u);
  g.putImageData(w, 0, 0);
  const M = await new Promise(
    (m) => p.toBlob((x) => m(x), "image/png")
  );
  if (!M)
    throw new Error("Unable to export tile atlas.");
  return { buffer: new Uint8Array(await M.arrayBuffer()), columns: s, rows: l, width: c, height: u, margin: o, spacing: a };
}, IS = async (e) => {
  var v;
  if (!((v = window.projectApi) != null && v.exportTileMap))
    return window.alert("Tile export is unavailable. Restart the app to load the latest export support."), null;
  const t = $.getState(), n = t.tileSets.find((m) => m.id === t.activeTileSetId);
  if (!n)
    return window.alert("No tile set available."), null;
  const s = t.tileMaps.find(
    (m) => m.id === t.activeTileMapId && m.tileSetId === n.id
  ) ?? t.tileMaps.find((m) => m.tileSetId === n.id);
  if (!s)
    return window.alert("No tile map available."), null;
  const l = Math.round(s.originX / n.tileWidth), i = Math.round(s.originY / n.tileHeight), o = e.maxTileX - e.minTileX + 1, a = e.maxTileY - e.minTileY + 1, c = [], u = /* @__PURE__ */ new Set();
  for (let m = 0; m < a; m += 1)
    for (let x = 0; x < o; x += 1) {
      const S = e.minTileX + x, b = e.minTileY + m, _ = S - l, k = b - i;
      let C = -1;
      _ >= 0 && _ < s.columns && k >= 0 && k < s.rows && (C = s.tiles[k * s.columns + _] ?? -1), c.push(C), C >= 0 && C < n.tiles.length && u.add(C);
    }
  if (u.size === 0)
    return window.alert("No tiles in the selected region."), null;
  const d = Array.from(u).sort((m, x) => m - x), f = /* @__PURE__ */ new Map();
  d.forEach((m, x) => f.set(m, x));
  const h = c.map((m) => {
    if (m < 0)
      return 0;
    const x = f.get(m);
    return x === void 0 ? 0 : x + 1;
  }), p = ae.getState().colors, g = await PS(n, p, d), w = [];
  for (let m = 0; m < a; m += 1) {
    const x = m * o, S = h.slice(x, x + o).join(",");
    w.push(m === a - 1 ? S : `${S},`);
  }
  const M = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${o}" height="${a}" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" tilecount="${d.length}" columns="${g.columns}" spacing="${g.spacing}" margin="${g.margin}">
    <image source="tiles.png" width="${g.width}" height="${g.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${o}" height="${a}">
    <data encoding="csv">
${w.join(`
`)}
    </data>
  </layer>
</map>
`;
  return window.projectApi.exportTileMap({
    png: g.buffer,
    tmx: M
  });
}, jc = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), Pc = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), Pp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), NS = (e, t, n) => {
  const s = W.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let i = e.minTileX; i <= e.maxTileX; i += 1) {
      const o = i * t, a = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(o + u, a + c, 1);
    }
};
class ES {
  constructor() {
    this.id = "tile-export", this.start = null, this.last = null, this.tileWidth = 0, this.tileHeight = 0, this.onBegin = (t) => {
      W.getState().clear();
      const s = $.getState().tileSets.find(
        (l) => l.id === $.getState().activeTileSetId
      );
      if (!s) {
        this.start = null, this.last = null;
        return;
      }
      this.tileWidth = s.tileWidth, this.tileHeight = s.tileHeight, this.start = Pc(jc(t), this.tileWidth, this.tileHeight), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      W.getState().clear();
      const s = Pc(jc(t), this.tileWidth, this.tileHeight);
      this.last = s, NS(Pp(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = W.getState(), s = t ? Pc(jc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = Pp(this.start, s);
      n.clear(), this.start = null, this.last = null, IS(l);
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const RS = 32, Ic = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), Ip = (e, t, n, s, l) => {
  const i = W.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, Np = () => {
  const e = $.getState(), t = e.tileSets.find((n) => n.id === e.activeTileSetId);
  return t ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    tileSetTiles: t.tiles
  } : null;
}, Ep = (e, t) => {
  const n = $.getState(), s = n.tileSets.find((h) => h.id === e);
  if (!s)
    return null;
  const l = n.tileMaps.find(
    (h) => h.id === n.activeTileMapId && h.tileSetId === e
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
  const i = n.tileMaps.find((h) => h.tileSetId === e);
  if (i)
    return n.setActiveTileMap(i.id), {
      tileMapId: i.id,
      originX: i.originX,
      originY: i.originY,
      columns: i.columns,
      rows: i.rows,
      tiles: i.tiles
    };
  const o = RS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: o,
    rows: o,
    tiles: a
  }), originX: u, originY: d, columns: o, rows: o, tiles: a };
};
class AS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Np(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = Ep(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = $.getState();
      if (!s.nineSlice) {
        const o = this.readNineSliceFromSelection();
        if (o)
          s.setNineSlice(o);
        else
          return;
      }
      const l = Ic(t), i = this.toWorldTilePoint(l);
      i && this.applyNineSlice(i, i);
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Np(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.resetPlacementResolver(), this.activeMap = Ep(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = $.getState(), l = !s.nineSlice || t.ctrl;
      this.sampling = l;
      const i = Ic(t), o = this.toWorldTilePoint(i);
      if (o && (this.startWorldPoint = o, this.lastWorldPoint = o, !this.sampling)) {
        if (!s.nineSlice) {
          const a = this.readNineSliceFromSelection();
          a && s.setNineSlice(a);
        }
        this.applyNineSlice(o, o);
      }
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap || !this.startWorldPoint)
        return;
      const n = Ic(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      if (this.lastWorldPoint = s, W.getState().clear(), !this.sampling) {
        this.changes.clear(), this.resetPlacementResolver(), this.applyNineSlice(this.startWorldPoint, s);
        return;
      }
      const i = Math.min(this.startWorldPoint.x, s.x), o = Math.min(this.startWorldPoint.y, s.y);
      this.drawSamplePreview({ x: i, y: o });
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      const t = $.getState();
      if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
        const s = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x), l = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y), i = this.readNineSlice({ x: s, y: l });
        i && t.setNineSlice(i);
      } else if (this.changes.size > 0) {
        if (this.placementResolver) {
          const l = this.placementResolver.getPendingTiles();
          l.length > 0 && $.getState().appendTilesToSet(this.activeTile.tileSetId, l);
        }
        const s = Array.from(this.changes.entries()).map(([l, i]) => ({
          index: l,
          tile: i
        }));
        $.getState().setTileMapTiles(this.activeMap.tileMapId, s);
      }
      if (this.historyBefore) {
        const s = Ot();
        qs(this.historyBefore, s);
      }
      W.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      W.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Ur(this.activeTile.tileSetTiles);
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
    const s = Math.min(t.x, n.x), l = Math.min(t.y, n.y), i = Math.max(t.x, n.x), o = Math.max(t.y, n.y), a = this.toMapPoint({ x: s, y: l });
    if (!a)
      return null;
    const u = $.getState().expandTileMapToInclude(
      this.activeMap.tileMapId,
      a.x,
      a.x + (i - s),
      a.y,
      a.y + (o - l),
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
    const l = $.getState().tileMaps.find(
      (u) => {
        var d;
        return u.id === ((d = this.activeMap) == null ? void 0 : d.tileMapId);
      }
    );
    if (!l)
      return null;
    const { columns: i, rows: o, tiles: a } = l, c = [];
    for (let u = 0; u < 3; u += 1)
      for (let d = 0; d < 3; d += 1) {
        const f = n.x + d, h = n.y + u;
        if (f < 0 || h < 0 || f >= i || h >= o) {
          c.push(-1);
          continue;
        }
        const p = h * i + f, g = a[p] ?? -1;
        c.push(g);
      }
    return { tileSetId: this.activeTile.tileSetId, tiles: c };
  }
  readNineSliceFromSelection() {
    const t = $.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
    if (n !== 3 || s !== 3 || l.length < 9)
      return null;
    const i = l.slice(0, 9);
    return i.some((o) => o < 0) || !this.activeTile ? null : { tileSetId: this.activeTile.tileSetId, tiles: i };
  }
  drawSamplePreview(t) {
    if (!this.activeTile || !this.activeMap)
      return;
    const n = this.toMapPoint(t);
    if (!n)
      return;
    const l = $.getState().tileMaps.find(
      (c) => {
        var u;
        return c.id === ((u = this.activeMap) == null ? void 0 : u.tileMapId);
      }
    );
    if (!l)
      return;
    const { columns: i, rows: o, tiles: a } = l;
    for (let c = 0; c < 3; c += 1)
      for (let u = 0; u < 3; u += 1) {
        const d = n.x + u, f = n.y + c;
        if (d < 0 || f < 0 || d >= i || f >= o)
          continue;
        const h = f * i + d, p = a[h] ?? -1;
        if (p < 0 || p >= this.activeTile.tileSetTiles.length)
          continue;
        const g = this.activeTile.tileSetTiles[p], w = t.x + u, M = t.y + c;
        Ip(
          w * this.activeTile.tileWidth,
          M * this.activeTile.tileHeight,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          g.pixels
        );
      }
  }
  applyNineSlice(t, n) {
    if (!this.activeTile || !this.activeMap)
      return;
    const l = $.getState().nineSlice;
    if (!l || l.tileSetId !== this.activeTile.tileSetId)
      return;
    const i = Math.min(t.x, n.x), o = Math.max(t.x, n.x), a = Math.min(t.y, n.y), c = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: i, y: a }, { x: o, y: c }))
      return;
    const { columns: d, rows: f } = this.activeMap, h = Math.round(this.activeMap.originX / this.activeTile.tileWidth), p = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let g = a; g <= c; g += 1)
      for (let w = i; w <= o; w += 1) {
        const M = w - h, v = g - p;
        if (M < 0 || v < 0 || M >= d || v >= f)
          continue;
        const m = g === a, x = g === c, S = w === i, b = w === o;
        let _ = 4;
        m && S ? _ = 0 : m && b ? _ = 2 : x && S ? _ = 6 : x && b ? _ = 8 : m ? _ = 1 : x ? _ = 7 : S ? _ = 3 : b && (_ = 5);
        const k = l.tiles[_] ?? -1;
        if (k < 0 || k >= this.activeTile.tileSetTiles.length)
          continue;
        const C = v * d + M, A = this.resolvePlacedTileIndex(k, C);
        this.drawing && this.changes.set(C, A);
        const L = this.getTilePixels(A);
        if (!L)
          continue;
        const Y = w * this.activeTile.tileWidth, j = g * this.activeTile.tileHeight;
        Ip(
          Y,
          j,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          L
        );
      }
  }
}
class LS {
  constructor() {
    this.id = "text";
  }
}
class DS {
  constructor() {
    this.id = "ai";
  }
}
const BS = () => {
  const e = Ce.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / P),
    minY: Math.floor(e.camera.y / P),
    maxX: Math.floor((e.camera.x + t) / P),
    maxY: Math.floor((e.camera.y + n) / P)
  };
}, YS = (e) => ({
  x: Math.floor(e.canvasX / P),
  y: Math.floor(e.canvasY / P)
}), XS = (e, t, n, s) => {
  const l = se.getState(), i = /* @__PURE__ */ new Set(), o = [e], a = [t], c = [];
  let u = !1;
  for (let d = 0; d < o.length; d += 1) {
    const f = o[d], h = a[d];
    if (f < s.minX || f > s.maxX || h < s.minY || h > s.maxY)
      continue;
    const p = `${f}:${h}`;
    i.has(p) || (i.add(p), l.getPixel(f, h) === n && ((f === s.minX || f === s.maxX || h === s.minY || h === s.maxY) && (u = !0), c.push({ x: f, y: h }), o.push(f + 1, f - 1, f, f), a.push(h, h, h + 1, h - 1)));
  }
  return { pixels: c, touchesBoundary: u };
};
class FS {
  constructor() {
    this.id = "magic-wand", this.onBegin = (t) => {
      const n = BS();
      if (!n)
        return;
      const { x: s, y: l } = YS(t);
      if (s < n.minX || s > n.maxX || l < n.minY || l > n.maxY)
        return;
      const i = se.getState().getPixel(s, l), { pixels: o, touchesBoundary: a } = XS(s, l, i, n);
      if (o.length === 0 || i === 0 && a)
        return;
      const c = !t.ctrl;
      xe.getState().setSelections(o.map((u) => ({ x: u.x, y: u.y, selected: c })));
    };
  }
}
const jt = tt((e) => ({
  activeTool: "pen",
  setActiveTool: (t) => e({ activeTool: t })
})), Lu = tt((e) => ({
  isRecording: !1,
  setIsRecording: (t) => e({ isRecording: t })
})), Qo = (e, t, n) => Math.min(n, Math.max(t, e)), OS = ({ x: e, y: t, onClose: n }) => {
  const s = jt((S) => S.activeTool), l = pn((S) => S.size), i = pn((S) => S.shape), o = Gt((S) => S.radius), a = Gt((S) => S.density), c = wt((S) => S.mode), u = xe((S) => S.selectedCount), d = T.useRef(null), [f, h] = T.useState({ x: e, y: t }), p = T.useMemo(() => zw[s] ?? "Tools", [s]);
  T.useEffect(() => {
    const S = (_) => {
      d.current && d.current.contains(_.target) || n();
    }, b = (_) => {
      _.key === "Escape" && n();
    };
    return window.addEventListener("mousedown", S), window.addEventListener("keydown", b), () => {
      window.removeEventListener("mousedown", S), window.removeEventListener("keydown", b);
    };
  }, [n]), T.useLayoutEffect(() => {
    if (!d.current)
      return;
    const S = d.current.getBoundingClientRect(), b = 8, _ = Math.max(b, window.innerWidth - S.width - b), k = Math.max(b, window.innerHeight - S.height - b), C = Qo(e, b, _), A = Qo(t, b, k);
    h({ x: C, y: A });
  }, [e, t]);
  const g = (S) => pn.getState().setSize(S), w = (S) => pn.getState().setShape(S), M = (S) => Gt.getState().setRadius(S), v = (S) => Gt.getState().setDensity(S), m = (S) => wt.getState().setMode(S), x = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      ref: d,
      className: "tool-context-menu",
      role: "menu",
      style: { top: f.y, left: f.x },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__title", children: p }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              Ce.getState().resetCamera(), n();
            },
            children: "Reset View"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              Ce.getState().zoomBy(0.25), n();
            },
            children: "Zoom In"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              Ce.getState().zoomBy(-0.25), n();
            },
            children: "Zoom Out"
          }
        ),
        u > 0 && /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              xe.getState().clear(), n();
            },
            children: "Clear Selection"
          }
        ),
        x && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__label", children: "Brush" }),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => g(Qo(l - 1, 1, 64)),
              children: [
                "Size - (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => g(Qo(l + 1, 1, 64)),
              children: [
                "Size + (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ r.jsx(
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
          /* @__PURE__ */ r.jsx(
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
          /* @__PURE__ */ r.jsx(
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
        s === "spray" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__label", children: "Spray" }),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => M(o - 1),
              children: [
                "Radius - (",
                o,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => M(o + 1),
              children: [
                "Radius + (",
                o,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => v(a - 50),
              children: [
                "Density - (",
                a,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ r.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => v(a + 50),
              children: [
                "Density + (",
                a,
                ")"
              ]
            }
          )
        ] }),
        s === "fill-bucket" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ r.jsx("div", { className: "tool-context-menu__label", children: "Fill" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": c === "color",
              role: "menuitemradio",
              onClick: () => m("color"),
              children: "Mode: Color"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              "aria-checked": c === "selection",
              role: "menuitemradio",
              onClick: () => m("selection"),
              children: "Mode: Selection"
            }
          )
        ] })
      ]
    }
  );
}, zS = (e) => new Promise((t, n) => {
  const s = new FileReader();
  s.onerror = () => n(new Error("Failed to read image file")), s.onload = () => t(s.result), s.readAsDataURL(e);
}), HS = (e) => new Promise((t, n) => {
  const s = new Image();
  s.onload = () => t(s), s.onerror = () => n(new Error("Failed to load image")), s.src = e;
}), Tx = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), WS = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : Tx(t[t.length - 1]);
}, kx = (e, t) => {
  const n = WS(e.name ?? "");
  return n || Tx(Ow[t] ?? t.split("/")[1] ?? "");
}, US = (e, t) => e || (t && Jf[t] ? Jf[t] : "image/png"), $S = (e, t) => {
  const n = kx(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, Cx = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, VS = (e, t, n) => Math.min(n, Math.max(t, e)), KS = (e) => {
  const t = Ce.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * P, i = e.naturalHeight * P, o = Math.min(n / l, s / i) * 0.9;
  return VS(o, Zs, Wl);
}, GS = (e) => ({
  x: Math.floor(e.x / P),
  y: Math.floor(e.y / P)
}), jx = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = kx(e, n), l = US(n, s), [i, o] = await Promise.all([zS(e), e.arrayBuffer()]), a = await HS(i), c = t ?? Cx(), u = GS(c), d = KS(a), f = $S(e, l);
  zt.getState().addReference({
    image: a,
    assetFilename: f,
    assetType: l,
    assetData: new Uint8Array(o),
    width: a.naturalWidth || a.width,
    height: a.naturalHeight || a.height,
    x: u.x,
    y: u.y,
    scale: d,
    rotation: 0,
    flipX: !1,
    flipY: !1,
    opacity: 0.7
  }), jt.getState().setActiveTool("reference-handle");
}, QS = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? Cx();
  for (let l = 0; l < n.length; l += 1) {
    const i = l * P * 2, o = { x: s.x + i, y: s.y + i };
    await jx(n[l], o);
  }
}, Rp = (e, t, n, s, l, i, o) => {
  e.strokeStyle = o, e.lineWidth = 1;
  const a = Math.floor(t / i) * i, c = t + s;
  for (let f = a; f <= c; f += i)
    e.beginPath(), e.moveTo(f + 0.5, n), e.lineTo(f + 0.5, n + l), e.stroke();
  const u = Math.floor(n / i) * i, d = n + l;
  for (let f = u; f <= d; f += i)
    e.beginPath(), e.moveTo(t, f + 0.5), e.lineTo(t + s, f + 0.5), e.stroke();
}, ZS = (e, t, n, s, l, i, o) => {
  const a = G1();
  if (a.length !== 0) {
    e.save(), e.fillStyle = i, e.strokeStyle = o, e.lineWidth = Math.max(1, P * 0.08);
    for (const c of a) {
      const u = c.col * B * P, d = c.row * B * P, f = u + B * P, h = d + B * P;
      f < t || h < n || u > t + s || d > n + l || (e.fillRect(u, d, B * P, B * P), e.strokeRect(
        u + 0.5,
        d + 0.5,
        B * P - 1,
        B * P - 1
      ));
    }
    e.restore();
  }
}, qS = (e, t, n, s, l, i) => {
  e.strokeStyle = i, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, JS = (e, t, n, s, l) => {
  var a;
  const i = Yt.getState();
  if (!i.overlaysVisible)
    return;
  const o = i.items.filter((c) => c.kind === "region");
  if (o.length !== 0) {
    e.save(), e.lineWidth = 1.5, e.font = '11px "Segoe UI", "Helvetica Neue", sans-serif';
    for (const c of o) {
      const u = c.x * P, d = c.y * P, f = Math.max(1, c.width) * P, h = Math.max(1, c.height) * P, p = u + f, g = d + h;
      if (p < t || g < n || u > t + s || d > n + l)
        continue;
      e.fillStyle = "rgba(66, 197, 255, 0.16)", e.strokeStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, d, f, h), e.strokeRect(u + 0.5, d + 0.5, Math.max(0, f - 1), Math.max(0, h - 1));
      const w = ((a = c.name) == null ? void 0 : a.trim()) || "Tile Tag", M = e.measureText(w).width, v = 5, m = 16, x = Math.max(36, Math.ceil(M + v * 2));
      e.fillStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, d - m, x, m), e.fillStyle = "rgba(5, 12, 18, 0.95)", e.fillText(w, u + v, d - 4);
    }
    e.restore();
  }
}, eM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, Px = (e, t) => {
  const n = document.createElement("canvas");
  n.width = B * P, n.height = B * P;
  const s = n.getContext("2d");
  if (!s)
    return null;
  s.imageSmoothingEnabled = !1;
  let l = 0;
  for (let i = 0; i < B; i += 1)
    for (let o = 0; o < B; o += 1) {
      const a = e[i * B + o];
      a !== 0 && (l += 1, s.fillStyle = t[a] ?? t[0], s.fillRect(o * P, i * P, P, P));
    }
  return { canvas: n, pixels: l };
}, tM = (e, t, n, s) => {
  const l = document.createElement("canvas");
  l.width = n * P, l.height = s * P;
  const i = l.getContext("2d");
  if (!i)
    return null;
  i.imageSmoothingEnabled = !1;
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = e[o * n + a] ?? 0;
      c !== 0 && (i.fillStyle = t[c] ?? t[0], i.fillRect(a * P, o * P, P, P));
    }
  return { canvas: l };
}, nM = (e, t, n, s, l, i, o) => {
  const a = se.getState();
  let c = 0, u = 0;
  for (const d of a.layers) {
    if (!d.visible)
      continue;
    const f = d.store.getBlocks();
    for (const { row: h, col: p, block: g } of f) {
      const w = p * B, M = h * B, v = w * P, m = M * P, x = v + B * P, S = m + B * P;
      if (x < t || S < n || v > t + s || m > n + l)
        continue;
      c += 1;
      const b = `${d.id}:${h}:${p}`;
      let _ = o.get(b);
      if (!_) {
        const k = Px(g, i);
        k && (_ = k, o.set(b, k));
      }
      _ && (u += _.pixels, e.drawImage(_.canvas, v, m));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, sM = (e) => {
  const t = document.createElement("canvas");
  t.width = B * P, t.height = B * P;
  const n = t.getContext("2d");
  if (!n)
    return null;
  n.imageSmoothingEnabled = !1, n.fillStyle = "#ffffff";
  let s = !1;
  for (let l = 0; l < B; l += 1)
    for (let i = 0; i < B; i += 1)
      e[l * B + i] === 1 && (n.fillRect(i * P, l * P, P, P), s = !0);
  return s ? { canvas: t } : null;
}, lM = (e, t, n, s, l, i, o) => {
  if (o) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [a, c] of i.entries()) {
      const [u, d] = a.split(":"), f = Number(u), p = Number(d) * B * P, g = f * B * P, w = p + B * P, M = g + B * P;
      w < t || M < n || p > t + s || g > n + l || e.drawImage(c.canvas, p, g);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [a, c] of i.entries()) {
      const [u, d] = a.split(":"), f = Number(u), p = Number(d) * B * P, g = f * B * P, w = p + B * P, M = g + B * P;
      w < t || M < n || p > t + s || g > n + l || e.drawImage(c.canvas, p, g);
    }
    e.restore();
  }
}, iM = (e, t, n, s, l) => {
  const i = xe.getState();
  if (i.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const o = i.store.getBlocks();
  for (const { row: a, col: c, block: u } of o) {
    const d = c * B, f = a * B, h = d * P, p = f * P, g = h + B * P, w = p + B * P;
    if (!(g < t || w < n || h > t + s || p > n + l))
      for (let M = 0; M < B; M += 1)
        for (let v = 0; v < B; v += 1) {
          if (u[M * B + v] !== 1)
            continue;
          const m = d + v, x = f + M;
          i.isSelected(m - 1, x) && i.isSelected(m + 1, x) && i.isSelected(m, x - 1) && i.isSelected(m, x + 1) || (m + x) % 2 === 0 && e.fillRect(
            m * P,
            x * P,
            P,
            P
          );
        }
  }
  e.restore();
}, oM = (e, t, n, s, l, i, o) => {
  const { tileSets: a, tileMaps: c } = $.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / P, d = n / P, f = u + s / P, h = d + l / P, p = new Map(a.map((g) => [g.id, g]));
  for (const g of c) {
    const w = p.get(g.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const m = g.columns * M, x = g.rows * v, S = g.originX, b = g.originY, _ = S + m, k = b + x;
    if (_ < u || k < d || S > f || b > h)
      continue;
    const C = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      g.columns - 1,
      Math.ceil((f - S) / M) - 1
    ), L = Math.max(0, Math.floor((d - b) / v)), Y = Math.min(
      g.rows - 1,
      Math.ceil((h - b) / v) - 1
    );
    if (!(A < C || Y < L))
      for (let j = L; j <= Y; j += 1)
        for (let O = C; O <= A; O += 1) {
          const G = j * g.columns + O, oe = g.tiles[G] ?? -1;
          if (oe < 0)
            continue;
          const Q = w.tiles[oe];
          if (!Q)
            continue;
          const te = `${w.id}:${oe}`;
          let D = o.get(te);
          if (!D) {
            const F = tM(
              Q.pixels,
              i,
              M,
              v
            );
            F && (D = F, o.set(te, F));
          }
          D && e.drawImage(
            D.canvas,
            (S + O * M) * P,
            (b + j * v) * P
          );
        }
  }
}, rM = (e, t, n, s, l, i, o) => {
  const { tileSets: a, tileMaps: c } = $.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / P, d = n / P, f = u + s / P, h = d + l / P, p = new Map(a.map((g) => [g.id, g]));
  e.save(), e.fillStyle = i, e.strokeStyle = o, e.lineWidth = Math.max(1, P * 0.08);
  for (const g of c) {
    const w = p.get(g.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const m = g.columns * M, x = g.rows * v, S = g.originX, b = g.originY, _ = S + m, k = b + x;
    if (_ < u || k < d || S > f || b > h)
      continue;
    const C = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      g.columns - 1,
      Math.ceil((f - S) / M) - 1
    ), L = Math.max(0, Math.floor((d - b) / v)), Y = Math.min(
      g.rows - 1,
      Math.ceil((h - b) / v) - 1
    );
    if (!(A < C || Y < L))
      for (let j = L; j <= Y; j += 1)
        for (let O = C; O <= A; O += 1) {
          const G = j * g.columns + O;
          if ((g.tiles[G] ?? -1) < 0)
            continue;
          const Q = (S + O * M) * P, te = (b + j * v) * P, D = M * P, F = v * P;
          e.fillRect(Q, te, D, F), e.strokeRect(Q + 0.5, te + 0.5, D - 1, F - 1);
        }
  }
  e.restore();
}, aM = (e, t, n) => {
  const s = W.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * P,
      l.y * P,
      P,
      P
    );
}, cM = (e, t, n, s, l) => {
  const i = zt.getState().items;
  if (i.length !== 0)
    for (const o of i) {
      const a = ga(o);
      if (a.maxX < t || a.maxY < n || a.minX > t + s || a.minY > n + l)
        continue;
      const c = Zn(o);
      e.save(), e.globalAlpha = o.opacity, e.translate(c.centerX, c.centerY), e.rotate(c.rotationRad), e.scale(c.scale * c.flipX, c.scale * c.flipY), e.drawImage(
        o.image,
        -c.baseWidth / 2,
        -c.baseHeight / 2,
        c.baseWidth,
        c.baseHeight
      ), e.restore();
    }
}, uM = (e, t, n, s, l) => {
  const { items: i, selectedId: o } = zt.getState();
  if (!o)
    return;
  const a = i.find((p) => p.id === o);
  if (!a)
    return;
  const c = ga(a);
  if (c.maxX < t || c.maxY < n || c.minX > t + s || c.minY > n + l)
    return;
  const u = P * 0.6, d = u / 2, f = ma(a), h = Object.values(f);
  e.save(), e.strokeStyle = "rgba(245, 197, 66, 0.85)", e.lineWidth = Math.max(1, P * 0.08), e.beginPath(), e.moveTo(f.nw.x, f.nw.y), e.lineTo(f.ne.x, f.ne.y), e.lineTo(f.se.x, f.se.y), e.lineTo(f.sw.x, f.sw.y), e.closePath(), e.stroke(), e.fillStyle = "rgba(245, 197, 66, 0.9)";
  for (const p of h)
    e.fillRect(p.x - d, p.y - d, u, u);
  e.restore();
}, dM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(null), s = T.useRef(null), l = T.useRef(/* @__PURE__ */ new Map()), i = T.useRef(/* @__PURE__ */ new Map()), o = T.useRef(/* @__PURE__ */ new Map()), a = T.useRef(0), c = Ce((j) => j.setSize), [u, d] = T.useState(!1), [f, h] = T.useState({ open: !1, x: 0, y: 0 }), p = T.useRef(null), g = T.useRef({ remainingLogDelta: 0, anchor: null, frame: null }), w = T.useRef(Promise.resolve());
  T.useEffect(() => {
    const j = e.current, O = t.current, G = g.current;
    if (!j || !O)
      return;
    c(j.clientWidth, j.clientHeight), s.current = new $w();
    const oe = {
      pen: new o1(),
      spray: new u1(),
      line: new _1(),
      rectangle: new C1(),
      oval: new I1(),
      "fill-bucket": new eS(),
      text: new LS(),
      ai: new DS(),
      eyedropper: new iS(),
      "reference-handle": new dS(),
      stamp: new lS(),
      "magic-wand": new FS(),
      "selection-rect": new A1(),
      "selection-oval": new B1(),
      "selection-lasso": new O1(),
      "texture-roll": new z1(),
      "tile-sampler": new gS(),
      "tile-pen": new SS(),
      "tile-stamp": new _S(),
      "tile-rectangle": new CS(),
      "tile-9slice": new AS(),
      "tile-export": new ES()
    }, Q = oe[jt.getState().activeTool] ?? oe.pen;
    s.current.setTool(Q);
    const te = jt.subscribe((Se) => {
      var X;
      (X = s.current) == null || X.setTool(oe[Se.activeTool] ?? oe.pen);
    }), D = ae.subscribe(() => {
      l.current.clear(), o.current.clear();
    }), F = xe.subscribe(() => {
      i.current.clear();
    }), K = $.subscribe(() => {
      o.current.clear();
    }), le = () => {
      var fe;
      const Se = performance.now(), X = Ce.getState();
      if (X.width === 0 || X.height === 0)
        return;
      const ie = eM(O, X.width, X.height);
      if (!ie)
        return;
      const ge = window.devicePixelRatio || 1;
      ie.clearRect(0, 0, X.width, X.height);
      const z = ae.getState().colors, Z = z[0] ?? "#000000", I = Mt(Z) ?? { r: 0, g: 0, b: 0 }, U = fa(I, ha(I)), ee = cn(U, 0.08), de = cn(U, 0.18), Ze = cn(U, 0.5), _e = cn(U, 0.08), Fe = cn(U, 0.35), Oe = cn(U, 0.2), st = cn(U, 0.5);
      ie.fillStyle = Z, ie.fillRect(0, 0, X.width, X.height), ie.save(), ie.setTransform(
        X.camera.zoom * ge,
        0,
        0,
        X.camera.zoom * ge,
        -X.camera.x * X.camera.zoom * ge,
        -X.camera.y * X.camera.zoom * ge
      );
      const Ie = X.width / X.camera.zoom, he = X.height / X.camera.zoom, { dirtyAll: pt, blocks: Ue } = se.getState().consumeDirtyBlocks();
      pt && l.current.clear();
      for (const ye of Ue) {
        const rt = `${ye.layerId}:${ye.row}:${ye.col}`, $e = se.getState().layers.find((N) => N.id === ye.layerId), vn = $e == null ? void 0 : $e.store.getBlock(ye.row, ye.col);
        if (!vn) {
          l.current.delete(rt);
          continue;
        }
        const es = Px(vn, z);
        es && l.current.set(rt, es);
      }
      (pt || Ue.length > 0) && $.getState().refreshCanvasSourcedTiles(
        pt,
        Ue.map((ye) => ({ row: ye.row, col: ye.col }))
      );
      const It = xe.getState(), tn = It.consumeDirtyBlocks();
      tn.dirtyAll && i.current.clear();
      for (const ye of tn.blocks) {
        const rt = `${ye.row}:${ye.col}`, $e = It.store.getBlock(ye.row, ye.col);
        if (!$e) {
          i.current.delete(rt);
          continue;
        }
        const vn = sM($e);
        vn ? i.current.set(rt, vn) : i.current.delete(rt);
      }
      const yt = Re.getState();
      yt.showReferenceLayer && cM(ie, X.camera.x, X.camera.y, Ie, he);
      let Pn = 0, Jn = 0;
      if (yt.showPixelLayer) {
        const ye = nM(
          ie,
          X.camera.x,
          X.camera.y,
          Ie,
          he,
          z,
          l.current
        );
        Pn = ye.blocksDrawn, Jn = ye.pixelsDrawn;
      }
      const In = Js.getState().mode;
      In === "pixel" && !yt.showTileLayer && rM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        Oe,
        st
      ), yt.showTileLayer && oM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        z,
        o.current
      ), ZS(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        _e,
        Fe
      ), lM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        i.current,
        It.selectedCount > 0
      ), iM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he
      ), In === "pixel" && JS(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he
      ), yt.showTileLayer && $.getState().tileDebugOverlay && hM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he
      ), yt.showPixelGrid && Rp(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        P,
        ee
      ), yt.showTileGrid && Rp(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he,
        P * me,
        de
      ), yt.showAxes && qS(ie, X.camera.x, X.camera.y, Ie, he, Ze);
      const nn = jt.getState().activeTool;
      aM(ie, z, nn === "selection-rect" || nn === "selection-oval" || nn === "selection-lasso" || nn === "texture-roll" || nn === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), nn === "reference-handle" && uM(
        ie,
        X.camera.x,
        X.camera.y,
        Ie,
        he
      ), ie.restore();
      const Nn = performance.now(), En = Nn - Se;
      En > 50 && Nn - a.current > 500 && (a.current = Nn, (fe = window.debugApi) == null || fe.logPerf(
        [
          "viewport:render",
          `ms=${En.toFixed(2)}`,
          `zoom=${X.camera.zoom.toFixed(2)}`,
          `view=${Ie.toFixed(1)}x${he.toFixed(1)}`,
          `blocks=${Pn}`,
          `pixels=${Jn}`
        ].join(" ")
      )), n.current = requestAnimationFrame(le);
    };
    n.current = requestAnimationFrame(le);
    const re = new ResizeObserver((Se) => {
      for (const X of Se)
        c(X.contentRect.width, X.contentRect.height);
    });
    return re.observe(j), () => {
      te(), D(), F(), K(), re.disconnect(), n.current && cancelAnimationFrame(n.current), G.frame && (cancelAnimationFrame(G.frame), G.frame = null);
    };
  }, [c]);
  const M = (j) => {
    const O = j.currentTarget.getBoundingClientRect(), G = j.clientX - O.left, oe = j.clientY - O.top, Q = Ce.getState();
    return {
      screenX: G,
      screenY: oe,
      canvasX: G / Q.camera.zoom + Q.camera.x,
      canvasY: oe / Q.camera.zoom + Q.camera.y,
      primary: (j.buttons & 1) === 1,
      alt: j.altKey,
      ctrl: j.ctrlKey,
      shift: j.shiftKey
    };
  }, v = (j) => {
    j.preventDefault(), j.currentTarget.setPointerCapture(j.pointerId);
    const O = Ce.getState();
    p.current = {
      screenX: j.clientX,
      screenY: j.clientY,
      cameraX: O.camera.x,
      cameraY: O.camera.y,
      zoom: O.camera.zoom
    }, d(!0), W.getState().clear();
  }, m = (j) => {
    const O = p.current;
    if (!O)
      return;
    const G = j.clientX - O.screenX, oe = j.clientY - O.screenY, Q = O.cameraX - G / O.zoom, te = O.cameraY - oe / O.zoom;
    Ce.getState().panTo(Q, te);
  }, x = (j) => {
    p.current = null, d(!1), j.currentTarget.releasePointerCapture(j.pointerId);
  }, S = (j) => {
    var G;
    if (j.button === 1) {
      v(j);
      return;
    }
    if (j.button === 2)
      return;
    const O = M(j);
    j.currentTarget.setPointerCapture(j.pointerId), (G = s.current) == null || G.handleEvent("begin", O);
  }, b = (j) => {
    var oe;
    if (p.current) {
      m(j);
      return;
    }
    const O = M(j), G = (j.buttons & 1) === 1;
    (oe = s.current) == null || oe.handleEvent(G ? "move" : "hover", O);
  }, _ = (j) => {
    var G, oe;
    if (p.current) {
      x(j);
      return;
    }
    const O = M(j);
    if ((G = s.current) == null || G.handleEvent("end", O), Lu.getState().isRecording) {
      const Q = t.current;
      Q && ((oe = window.recordingApi) != null && oe.addFrame) && (w.current = w.current.then(
        () => new Promise((te) => {
          requestAnimationFrame(() => {
            Q.toBlob(async (D) => {
              if (!D) {
                te();
                return;
              }
              try {
                const F = new Uint8Array(await D.arrayBuffer());
                await window.recordingApi.addFrame(F);
              } catch (F) {
                console.error("Failed to capture recording frame:", F);
              }
              te();
            }, "image/png");
          });
        })
      ));
    }
    j.currentTarget.releasePointerCapture(j.pointerId);
  }, k = (j) => {
    var G;
    if (p.current) {
      x(j);
      return;
    }
    const O = M(j);
    (G = s.current) == null || G.handleEvent("cancel", O);
  }, C = (j) => {
    var O;
    (O = j.dataTransfer) != null && O.types.includes("Files") && (j.preventDefault(), j.dataTransfer.dropEffect = "copy");
  }, A = (j) => {
    var D, F;
    if (!((F = (D = j.dataTransfer) == null ? void 0 : D.files) != null && F.length))
      return;
    j.preventDefault();
    const O = j.currentTarget.getBoundingClientRect(), G = j.clientX - O.left, oe = j.clientY - O.top, Q = Ce.getState(), te = {
      x: G / Q.camera.zoom + Q.camera.x,
      y: oe / Q.camera.zoom + Q.camera.y
    };
    QS(Array.from(j.dataTransfer.files), te);
  }, L = (j) => {
    if (j.deltaY === 0)
      return;
    j.preventDefault();
    const O = j.currentTarget.getBoundingClientRect(), G = j.clientX - O.left, oe = j.clientY - O.top, Q = Ce.getState(), te = {
      x: G / Q.camera.zoom + Q.camera.x,
      y: oe / Q.camera.zoom + Q.camera.y
    }, D = j.deltaMode === 1 ? 16 : j.deltaMode === 2 ? Math.max(240, Q.height) : 1;
    let K = -(j.deltaY * D) * Aw;
    if (K > ci ? K = ci : K < -ci && (K = -ci), g.current.remainingLogDelta += K, g.current.anchor = te, g.current.frame)
      return;
    const le = () => {
      const re = g.current, Se = re.remainingLogDelta;
      if (!Number.isFinite(Se) || Math.abs(Se) < 5e-4) {
        re.remainingLogDelta = 0, re.frame = null;
        return;
      }
      const X = Se * 0.35, ge = Math.max(1e-3, ci * 0.25), z = Math.sign(X) * Math.min(Math.abs(X), ge), Z = Ce.getState(), I = Z.camera.zoom, ee = I * Math.exp(z) - I;
      if (!Number.isFinite(ee) || Math.abs(ee) < 1e-12) {
        re.remainingLogDelta = 0, re.frame = null;
        return;
      }
      Z.zoomBy(ee, re.anchor ?? void 0), re.remainingLogDelta -= z, re.frame = requestAnimationFrame(le);
    };
    g.current.frame = requestAnimationFrame(le);
  }, Y = (j) => {
    j.preventDefault(), h({ open: !0, x: j.clientX, y: j.clientY });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: S,
        onPointerMove: b,
        onPointerUp: _,
        onPointerLeave: k,
        onContextMenu: Y,
        onDragOver: C,
        onDrop: A,
        onWheel: L,
        style: {
          cursor: u ? "grabbing" : "crosshair"
        }
      }
    ),
    f.open && /* @__PURE__ */ r.jsx(
      OS,
      {
        x: f.x,
        y: f.y,
        onClose: () => h((j) => j.open ? { ...j, open: !1 } : j)
      }
    )
  ] });
}, hM = (e, t, n, s, l) => {
  const { tileMaps: i } = $.getState();
  if (i.length !== 0) {
    e.save(), e.font = `${Math.max(10, P)}px sans-serif`, e.textBaseline = "top", e.fillStyle = "rgba(255, 186, 73, 0.95)", e.strokeStyle = "rgba(255, 186, 73, 0.5)", e.lineWidth = Math.max(1, P * 0.06);
    for (const o of i) {
      const a = o.originX * P, c = o.originY * P, u = o.columns * P, d = o.rows * P, f = a + u, h = c + d;
      f < t || h < n || a > t + s || c > n + l || (e.strokeRect(a, c, u, d), e.fillText(
        `map ${o.id.slice(0, 6)} origin=(${o.originX},${o.originY}) size=${o.columns}x${o.rows}`,
        a + P * 0.5,
        c + P * 0.5
      ));
    }
    e.restore();
  }
}, fM = () => {
  const e = se.getState();
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  for (const i of e.layers)
    for (const { row: o, col: a, block: c } of i.store.getBlocks())
      for (let u = 0; u < B; u += 1)
        for (let d = 0; d < B; d += 1) {
          if (c[u * B + d] === 0)
            continue;
          const h = (a * B + d) * P, p = (o * B + u) * P;
          t = Math.min(t, h), n = Math.min(n, p), s = Math.max(s, h + P), l = Math.max(l, p + P);
        }
  return Number.isFinite(t) ? { minX: t, minY: n, maxX: s, maxY: l } : null;
}, pM = () => {
  const e = Ce.getState(), t = fM();
  let n = t ? t.minX : -os / 2, s = t ? t.minY : -os / 2, l = t ? t.maxX : os / 2, i = t ? t.maxY : os / 2;
  if (e.width > 0 && e.height > 0) {
    const c = e.width / e.camera.zoom, u = e.height / e.camera.zoom;
    n = Math.min(n, e.camera.x), s = Math.min(s, e.camera.y), l = Math.max(l, e.camera.x + c), i = Math.max(i, e.camera.y + u);
  }
  const o = l - n, a = i - s;
  if (o < os) {
    const c = (os - o) / 2;
    n -= c, l += c;
  }
  if (a < os) {
    const c = (os - a) / 2;
    s -= c, i += c;
  }
  return { minX: n, minY: s, maxX: l, maxY: i };
}, Ix = (e, t) => {
  const n = pM(), s = n.maxX - n.minX, l = n.maxY - n.minY, i = Math.min(e / s, t / l), o = (e - s * i) / 2 - n.minX * i, a = (t - l * i) / 2 - n.minY * i;
  return { bounds: n, scale: i, offsetX: o, offsetY: a };
}, mM = (e, t, n) => {
  const s = Ce.getState(), l = ae.getState().colors, i = l[0] ?? "#000000", o = Mt(i) ?? { r: 0, g: 0, b: 0 }, a = fa(o, ha(o)), c = Rd(hs(o, a, 0.08)), u = cn(a, 0.12), d = cn(a, 0.6), f = cn(a, 0.8), { bounds: h, scale: p, offsetX: g, offsetY: w } = Ix(t, n), M = h.maxX - h.minX, v = h.maxY - h.minY;
  e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), e.fillStyle = c, e.fillRect(
    g + h.minX * p,
    w + h.minY * p,
    M * p,
    v * p
  ), e.strokeStyle = u, e.strokeRect(
    g + h.minX * p,
    w + h.minY * p,
    M * p,
    v * p
  );
  const m = g, x = w;
  e.strokeStyle = d, e.lineWidth = 2, e.beginPath(), e.moveTo(m + 0.5, w + h.minY * p), e.lineTo(m + 0.5, w + h.maxY * p), e.stroke(), e.beginPath(), e.moveTo(g + h.minX * p, x + 0.5), e.lineTo(g + h.maxX * p, x + 0.5), e.stroke();
  const S = se.getState();
  let b = 0, _ = 0;
  if (Re.getState().showPixelLayer) {
    const k = p * P, C = Math.max(1, Math.floor(1 / Math.max(k * 0.75, 0.01)));
    for (const A of S.layers)
      if (A.visible)
        for (const { row: L, col: Y, block: j } of A.store.getBlocks()) {
          b += 1;
          for (let O = 0; O < B; O += C)
            for (let G = 0; G < B; G += C) {
              const oe = j[O * B + G];
              if (oe === 0)
                continue;
              _ += 1;
              const Q = (Y * B + G) * P, te = (L * B + O) * P;
              e.fillStyle = l[oe] ?? l[0];
              const D = Math.max(1, k * C);
              e.fillRect(
                g + Q * p,
                w + te * p,
                D,
                D
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const k = s.width / s.camera.zoom, C = s.height / s.camera.zoom, A = s.camera.x * p + g, L = s.camera.y * p + w, Y = k * p, j = C * p;
    e.strokeStyle = f, e.lineWidth = 2, e.strokeRect(A, L, Y, j);
  }
  return { blocksDrawn: b, pixelsDrawn: _, zoom: s.camera.zoom };
}, gM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, xM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(!1), s = T.useRef(null), l = T.useRef(null), i = T.useRef(0), o = Ce((x) => x.panTo), a = Ce((x) => x.zoomBy), c = Ce((x) => x.resetCamera), u = Ce((x) => x.camera), [d, f] = T.useState(String(Math.round(u.x))), [h, p] = T.useState(String(Math.round(u.y)));
  T.useEffect(() => {
    f(String(Math.round(u.x))), p(String(Math.round(u.y)));
  }, [u.x, u.y]);
  const g = () => {
    const x = Number(d), S = Number(h);
    Number.isFinite(x) && Number.isFinite(S) && o(x, S);
  };
  T.useEffect(() => {
    const x = e.current, S = t.current;
    if (!x || !S)
      return;
    const b = () => {
      var D;
      const Y = gM(S, x.clientWidth, x.clientHeight);
      if (!Y)
        return;
      const j = performance.now(), { blocksDrawn: O, pixelsDrawn: G, zoom: oe } = mM(
        Y,
        x.clientWidth,
        x.clientHeight
      ), Q = performance.now(), te = Q - j;
      te > 50 && Q - i.current > 500 && (i.current = Q, (D = window.debugApi) == null || D.logPerf(
        [
          "minimap:render",
          `ms=${te.toFixed(2)}`,
          `zoom=${oe.toFixed(2)}`,
          `blocks=${O}`,
          `pixels=${G}`
        ].join(" ")
      ));
    };
    b();
    const _ = Ce.subscribe(b), k = se.subscribe(b), C = ae.subscribe(b), A = Re.subscribe(b), L = new ResizeObserver(b);
    return L.observe(x), () => {
      _(), k(), C(), A(), L.disconnect();
    };
  }, []);
  const w = (x) => {
    const S = x.currentTarget.getBoundingClientRect(), b = x.clientX - S.left, _ = x.clientY - S.top, { scale: k, offsetX: C, offsetY: A } = Ix(S.width, S.height);
    return {
      x: (b - C) / k,
      y: (_ - A) / k
    };
  }, M = (x) => {
    x.currentTarget.setPointerCapture(x.pointerId), n.current = !0;
    const S = w(x), b = Ce.getState(), _ = b.width / b.camera.zoom, k = b.height / b.camera.zoom;
    s.current = {
      x: S.x - _ / 2,
      y: S.y - k / 2
    };
    const C = () => {
      if (!n.current || !s.current)
        return;
      const A = Ce.getState().camera, L = s.current.x - A.x, Y = s.current.y - A.y, j = Math.hypot(L, Y);
      if (j > 0.01) {
        const G = Math.min(12, j * 0.25);
        o(
          A.x + L / j * G,
          A.y + Y / j * G
        );
      }
      l.current = requestAnimationFrame(C);
    };
    l.current = requestAnimationFrame(C);
  }, v = (x) => {
    if (!n.current)
      return;
    const S = w(x), b = Ce.getState(), _ = b.width / b.camera.zoom, k = b.height / b.camera.zoom;
    s.current = {
      x: S.x - _ / 2,
      y: S.y - k / 2
    };
  }, m = (x) => {
    n.current = !1, s.current = null, l.current && (cancelAnimationFrame(l.current), l.current = null), x.currentTarget.releasePointerCapture(x.pointerId);
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ r.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: M,
        onPointerMove: v,
        onPointerUp: m
      }
    ) }),
    /* @__PURE__ */ r.jsxs("div", { className: "minimap__controls", children: [
      /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => a(0.2), children: "+" }),
      /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => a(-0.2), children: "-" }),
      /* @__PURE__ */ r.jsx("button", { type: "button", onClick: c, children: "Home" })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ r.jsxs("label", { children: [
        "X:",
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            value: d,
            onChange: (x) => f(x.target.value),
            onBlur: g,
            onKeyDown: (x) => {
              x.key === "Enter" && g();
            }
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("label", { children: [
        "Y:",
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            value: h,
            onChange: (x) => p(x.target.value),
            onBlur: g,
            onKeyDown: (x) => {
              x.key === "Enter" && g();
            }
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("span", { children: [
        "Zoom: ",
        u.zoom.toFixed(3)
      ] })
    ] })
  ] });
}, yM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, vM = (e, t, n) => {
  const s = ot.getState(), l = ae.getState().colors, i = l[0] ?? "#000000", o = Mt(i) ?? { r: 0, g: 0, b: 0 }, a = fa(o, ha(o)), c = Rd(hs(o, a, 0.1)), u = cn(a, 0.12);
  if (e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), s.pixels.length === 0 || s.width === 0 || s.height === 0)
    return;
  const d = 12, f = Math.max(1, t - d * 2), h = Math.max(1, n - d * 2), p = Math.min(
    f / s.width,
    h / s.height
  ), g = s.width * p, w = s.height * p, M = (t - g) / 2, v = (n - w) / 2;
  e.fillStyle = c, e.fillRect(M, v, g, w), e.strokeStyle = u, e.strokeRect(M, v, g, w);
  for (const m of s.pixels) {
    const x = l[m.paletteIndex] ?? l[0];
    e.fillStyle = x, e.fillRect(
      M + m.x * p,
      v + m.y * p,
      p,
      p
    );
  }
}, wM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = ot((s) => s);
  return T.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const i = () => {
      const u = yM(l, s.clientWidth, s.clientHeight);
      u && vM(u, s.clientWidth, s.clientHeight);
    };
    i();
    const o = ot.subscribe(i), a = ae.subscribe(i), c = new ResizeObserver(i);
    return c.observe(s), () => {
      o(), a(), c.disconnect();
    };
  }, []), /* @__PURE__ */ r.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ r.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ r.jsx("canvas", { ref: t }) }),
    /* @__PURE__ */ r.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ r.jsxs("span", { children: [
        "Size: ",
        n.width,
        "x",
        n.height
      ] }),
      /* @__PURE__ */ r.jsxs("span", { children: [
        "Origin: ",
        n.origin ? `${n.origin.x}, ${n.origin.y}` : "--"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { children: [
        "Pixels: ",
        n.pixels.length
      ] })
    ] })
  ] });
}, Zo = (e) => Math.round(e / P), SM = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const o = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: o, y: a });
}, MM = () => {
  const e = Yt((d) => d.items), t = Yt((d) => d.addFromCamera), n = Yt((d) => d.rename), s = Yt((d) => d.remove), l = Yt((d) => d.move), i = Yt((d) => d.jumpTo), o = Yt((d) => d.overlaysVisible), a = Yt((d) => d.toggleOverlaysVisible), c = zt((d) => d.items), u = T.useMemo(
    () => c.map((d) => {
      const f = ga(d), h = (f.minX + f.maxX) / 2, p = (f.minY + f.maxY) / 2;
      return {
        id: d.id,
        name: d.assetFilename,
        centerX: h,
        centerY: p,
        x: Zo(h),
        y: Zo(p)
      };
    }),
    [c]
  );
  return /* @__PURE__ */ r.jsxs("div", { className: "nav-panel", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__header", children: [
        /* @__PURE__ */ r.jsx("div", { className: "nav-panel__title", children: "Bookmarks" }),
        /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__actions", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: a,
              title: "Toggle bookmark tag overlays in Pixel mode",
              children: o ? "Hide Tags" : "Show Tags"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: t,
              children: "Add"
            }
          )
        ] })
      ] }),
      e.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "nav-panel__empty", children: "No bookmarks yet." }) : /* @__PURE__ */ r.jsx("div", { className: "nav-panel__list", children: e.map((d, f) => /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              className: "nav-panel__name",
              value: d.name,
              "aria-label": `Bookmark name ${f + 1}`,
              onChange: (h) => n(d.id, h.currentTarget.value)
            }
          ),
          /* @__PURE__ */ r.jsx("div", { className: "nav-panel__coords", children: d.kind === "camera" ? `${Zo(d.centerX)},${Zo(d.centerY)} • z${d.zoom.toFixed(2)}` : `${d.x},${d.y} • ${d.width}x${d.height}` })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__actions", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: () => i(d.id),
              children: "Go"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              disabled: f === 0,
              onClick: () => l(d.id, "up"),
              "aria-label": "Move bookmark up",
              title: "Move up",
              children: "↑"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              disabled: f === e.length - 1,
              onClick: () => l(d.id, "down"),
              "aria-label": "Move bookmark down",
              title: "Move down",
              children: "↓"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button nav-panel__button--danger",
              onClick: () => s(d.id),
              children: "Delete"
            }
          )
        ] })
      ] }, d.id)) })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ r.jsx("div", { className: "nav-panel__header", children: /* @__PURE__ */ r.jsx("div", { className: "nav-panel__title", children: "References" }) }),
      u.length === 0 ? /* @__PURE__ */ r.jsx("div", { className: "nav-panel__empty", children: "No references yet." }) : /* @__PURE__ */ r.jsx("div", { className: "nav-panel__list", children: u.map((d) => /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ r.jsx("div", { className: "nav-panel__name nav-panel__name--readonly", children: d.name }),
          /* @__PURE__ */ r.jsxs("div", { className: "nav-panel__coords", children: [
            d.x,
            ",",
            d.y
          ] })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "nav-panel__actions", children: /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "nav-panel__button",
            onClick: () => SM(d.centerX, d.centerY),
            children: "Go"
          }
        ) })
      ] }, d.id)) })
    ] })
  ] });
}, bM = () => {
  const e = se((u) => u.layers), t = se((u) => u.activeLayerId), n = se((u) => u.createLayer), s = se((u) => u.deleteLayer), l = se((u) => u.renameLayer), i = se((u) => u.toggleLayerVisible), o = se((u) => u.moveLayer), a = se((u) => u.setActiveLayer), c = [...e].reverse();
  return /* @__PURE__ */ r.jsxs("div", { className: "layers-panel", "aria-label": "Layers panel", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "layers-panel__actions", children: [
      /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: () => n(), children: "+ Layer" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: () => s(t),
          disabled: e.length <= 1,
          children: "Delete"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "layers-panel__list", role: "list", children: c.map((u) => {
      const d = e.findIndex((g) => g.id === u.id), f = d === e.length - 1, h = d === 0, p = u.id === t;
      return /* @__PURE__ */ r.jsxs(
        "div",
        {
          role: "listitem",
          className: "layers-panel__row",
          "data-active": p,
          onMouseDown: () => a(u.id),
          children: [
            /* @__PURE__ */ r.jsx("label", { className: "layers-panel__toggle", title: "Toggle visibility", children: /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "checkbox",
                checked: u.visible,
                onChange: () => i(u.id),
                onMouseDown: (g) => g.stopPropagation()
              }
            ) }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                className: "layers-panel__name",
                value: u.name,
                onChange: (g) => l(u.id, g.target.value),
                onMouseDown: (g) => g.stopPropagation()
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: "layers-panel__move", children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move up",
                  disabled: f,
                  onMouseDown: (g) => g.stopPropagation(),
                  onClick: () => o(u.id, "up"),
                  children: "↑"
                }
              ),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move down",
                  disabled: h,
                  onMouseDown: (g) => g.stopPropagation(),
                  onClick: () => o(u.id, "down"),
                  children: "↓"
                }
              )
            ] })
          ]
        },
        u.id
      );
    }) })
  ] });
}, _M = () => {
  const e = ot(
    (l) => l.pixels.length > 0 && l.width > 0 && l.height > 0
  ), [t, n] = T.useState("minimap"), s = T.useRef(e);
  return T.useEffect(() => {
    !e && t === "paste" && n("minimap");
  }, [e, t]), T.useEffect(() => {
    e && !s.current && n((l) => l === "minimap" ? "paste" : l), s.current = e;
  }, [e]), /* @__PURE__ */ r.jsxs("div", { className: "minimap-panel", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "minimap__tabs", role: "tablist", "aria-label": "Minimap tabs", children: [
      /* @__PURE__ */ r.jsx(
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
      /* @__PURE__ */ r.jsx(
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
      /* @__PURE__ */ r.jsx(
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
      /* @__PURE__ */ r.jsx(
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
    t === "nav" ? /* @__PURE__ */ r.jsx(MM, {}) : t === "layers" ? /* @__PURE__ */ r.jsx(bM, {}) : t === "paste" && e ? /* @__PURE__ */ r.jsx(wM, {}) : /* @__PURE__ */ r.jsx(xM, {})
  ] });
}, TM = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, Ap = (e, t, n) => Math.min(n, Math.max(t, e)), rn = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: i
}) => {
  const a = `dropdown-${T.useId()}`, c = T.useRef(null), u = T.useRef(null), [d, f] = T.useState(!1), [h, p] = T.useState(0), [g, w] = T.useState(null), M = T.useMemo(() => TM(t, e), [t, e]), v = T.useMemo(
    () => Math.max(0, t.findIndex((b) => b.value === e)),
    [t, e]
  ), m = () => {
    const b = c.current;
    if (!b)
      return null;
    const _ = b.getBoundingClientRect(), k = window.innerHeight || document.documentElement.clientHeight || 0, C = 260, A = k - _.bottom - 12, L = _.top - 12, Y = A >= Math.min(C, 180) || A >= L, j = Ap(Y ? A : L, 120, C), O = Y ? _.bottom + 6 : _.top - 6 - j;
    return { left: _.left, top: O, width: _.width, maxHeight: j };
  };
  T.useEffect(() => {
    if (!d)
      return;
    p(v);
    const b = m();
    w(b);
    const _ = window.requestAnimationFrame(() => {
      var C;
      const k = (C = u.current) == null ? void 0 : C.querySelector('[data-highlighted="true"]');
      k == null || k.scrollIntoView({ block: "nearest" });
    });
    return () => window.cancelAnimationFrame(_);
  }, [d]), T.useEffect(() => {
    if (!d)
      return;
    const b = (C) => {
      var A, L;
      if (C.key === "Escape") {
        C.preventDefault(), f(!1), (A = c.current) == null || A.focus();
        return;
      }
      if (C.key === "ArrowDown" || C.key === "ArrowUp") {
        C.preventDefault();
        const Y = C.key === "ArrowDown" ? 1 : -1;
        p((j) => Ap(j + Y, 0, t.length - 1));
        return;
      }
      if (C.key === "Home") {
        C.preventDefault(), p(0);
        return;
      }
      if (C.key === "End") {
        C.preventDefault(), p(t.length - 1);
        return;
      }
      if (C.key === "Enter" || C.key === " ") {
        C.preventDefault();
        const Y = t[h];
        Y && !Y.disabled && (n(Y.value), f(!1), (L = c.current) == null || L.focus());
      }
    }, _ = (C) => {
      var L, Y;
      const A = C.target;
      A && ((L = c.current) != null && L.contains(A) || (Y = u.current) != null && Y.contains(A) || f(!1));
    }, k = (C) => {
      var Y;
      const A = (C == null ? void 0 : C.target) ?? null;
      if (A && ((Y = u.current) != null && Y.contains(A)))
        return;
      const L = m();
      w(L);
    };
    return window.addEventListener("keydown", b), window.addEventListener("pointerdown", _, { capture: !0 }), window.addEventListener("resize", k), window.addEventListener("scroll", k, { capture: !0 }), () => {
      window.removeEventListener("keydown", b), window.removeEventListener("pointerdown", _, { capture: !0 }), window.removeEventListener("resize", k), window.removeEventListener("scroll", k, { capture: !0 });
    };
  }, [d, t, h, n]), T.useEffect(() => {
    var _;
    if (!d)
      return;
    const b = (_ = u.current) == null ? void 0 : _.querySelector('[data-highlighted="true"]');
    b == null || b.scrollIntoView({ block: "nearest" });
  }, [d, h]);
  const x = (b) => {
    s || (b.key === "ArrowDown" || b.key === "ArrowUp") && (b.preventDefault(), f(!0));
  }, S = (b) => {
    var _;
    n(b), f(!1), (_ = c.current) == null || _.focus();
  };
  return /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs(
      "button",
      {
        ref: c,
        type: "button",
        className: i ?? "panel__select",
        "aria-label": l,
        "aria-haspopup": "listbox",
        "aria-expanded": d,
        "aria-controls": a,
        disabled: s,
        onClick: () => f((b) => !b),
        onKeyDown: x,
        children: [
          /* @__PURE__ */ r.jsx("span", { className: "dropdown-select__label", children: M }),
          /* @__PURE__ */ r.jsx("span", { className: "dropdown-select__chevron", "aria-hidden": "true", children: "▾" })
        ]
      }
    ),
    d && g && Ci.createPortal(
      /* @__PURE__ */ r.jsx(
        "div",
        {
          ref: u,
          id: a,
          className: "dropdown-select__menu",
          role: "listbox",
          "aria-label": l,
          style: {
            left: `${g.left}px`,
            top: `${g.top}px`,
            width: `${g.width}px`,
            maxHeight: `${g.maxHeight}px`
          },
          children: t.map((b, _) => /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              role: "option",
              className: "dropdown-select__option",
              "data-active": b.value === e,
              "data-highlighted": _ === h,
              disabled: b.disabled,
              "aria-selected": b.value === e,
              onMouseMove: () => p(_),
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
}, Lp = (e) => /^#[0-9a-f]{6}$/i.test(e), Dp = (e) => {
  const t = e.trim().toLowerCase();
  return t ? t.startsWith("#") ? t : `#${t}` : "";
}, De = (e) => Math.min(1, Math.max(0, e)), Sn = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Ld = (e) => (e % 360 + 360) % 360, Nc = (e) => e.toString(16).padStart(2, "0"), hn = (e) => `#${Nc(e.r)}${Nc(e.g)}${Nc(e.b)}`, Nx = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), o = l - i;
  let a = 0;
  o !== 0 && (l === t ? a = (n - s) / o % 6 : l === n ? a = (s - t) / o + 2 : a = (t - n) / o + 4, a *= 60), a < 0 && (a += 360);
  const c = (l + i) / 2, u = o === 0 ? 0 : o / (1 - Math.abs(2 * c - 1));
  return { h: a, s: u, l: c };
}, kM = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), o = l - i;
  let a = 0;
  o !== 0 && (l === t ? a = (n - s) / o % 6 : l === n ? a = (s - t) / o + 2 : a = (t - n) / o + 4, a *= 60), a < 0 && (a += 360);
  const c = l === 0 ? 0 : o / l;
  return { h: a, s: c, v: l };
}, Du = (e) => {
  const t = Ld(e.h), n = De(e.s), s = De(e.l), l = (1 - Math.abs(2 * s - 1)) * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), o = s - l / 2;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + o) * 255),
    g: Math.round((c + o) * 255),
    b: Math.round((u + o) * 255)
  };
}, hl = (e) => {
  const t = Ld(e.h), n = De(e.s), s = De(e.v), l = s * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), o = s - l;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + o) * 255),
    g: Math.round((c + o) * 255),
    b: Math.round((u + o) * 255)
  };
}, an = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const s = n.toLowerCase();
    return t.has(s) ? !1 : (t.add(s), !0);
  });
}, CM = (e) => {
  const t = Mt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = Nx(t), i = (A, L, Y) => hn(
    Du({
      h: Ld(l.h + A),
      s: De(L),
      l: De(Y)
    })
  ), o = (A, L = 0, Y = 0) => i(A, l.s + L, l.l + Y), a = an([
    o(0, 0, 0.12),
    o(0, 0, -0.12),
    o(180, 0, 0),
    o(180, 0, 0.12),
    o(180, 0, -0.12)
  ]), c = an([
    o(-40),
    o(-20),
    o(0),
    o(20),
    o(40)
  ]), u = an([
    o(0),
    o(150),
    o(210),
    o(150, 0, 0.12),
    o(210, 0, -0.12)
  ]), d = an([
    o(0),
    o(120),
    o(240),
    o(120, 0, 0.12),
    o(240, 0, -0.12)
  ]), f = an([
    o(0),
    o(90),
    o(180),
    o(270)
  ]), h = an([
    hn(hs(t, n, 0.7)),
    hn(hs(t, n, 0.5)),
    hn(hs(t, n, 0.3)),
    hn(hs(t, s, 0.25)),
    hn(hs(t, s, 0.5))
  ]), p = De(l.s * 0.45 + 0.15), g = De(l.l * 0.4 + 0.6), w = an([
    i(-25, p, De(g + 0.05)),
    i(-10, p, De(g + 0.02)),
    i(0, p, g),
    i(10, p, De(g - 0.03)),
    i(25, p, De(g - 0.06))
  ]), M = De(l.s * 0.35 + 0.12), v = De(l.l * 0.8 + 0.1), m = an([
    i(-30, M, De(v - 0.08)),
    i(-15, M, v),
    i(0, M, De(v + 0.05)),
    i(15, M, De(v - 0.03)),
    i(30, M, De(v + 0.08))
  ]), x = De(Math.max(0.7, l.s * 1.25)), S = De(l.l * 0.85 + 0.06), b = an([
    i(-20, x, De(S - 0.08)),
    i(-10, x, S),
    i(0, x, De(S + 0.04)),
    i(15, x, De(S - 0.04)),
    i(30, x, De(S + 0.08))
  ]), _ = De(l.s * 0.9 + 0.05), k = an([
    i(0, _, 0.14),
    i(0, _, 0.3),
    i(0, _, 0.5),
    i(0, _, 0.7),
    i(0, _, 0.86)
  ]), C = an([
    i(0, l.s, De(l.l - 0.06)),
    i(45, l.s, l.l),
    i(90, l.s, De(l.l + 0.05)),
    i(135, l.s, l.l),
    i(180, l.s, De(l.l - 0.04))
  ]);
  return [
    { id: "complementary", label: "Complementary", colors: a },
    { id: "analogous", label: "Analogous", colors: c },
    { id: "split", label: "Split Complementary", colors: u },
    { id: "triad", label: "Triad", colors: d },
    { id: "tetrad", label: "Tetrad", colors: f },
    { id: "tints", label: "Tints + Shades", colors: h },
    { id: "pastel", label: "Pastel", colors: w },
    { id: "muted", label: "Muted", colors: m },
    { id: "vibrant", label: "Vibrant", colors: b },
    { id: "mono", label: "Monochrome Ramp", colors: k },
    { id: "hue-sweep", label: "Hue Sweep", colors: C }
  ];
}, jM = () => {
  const e = ae((N) => N.colors), t = ae((N) => N.selectedIndices), n = ae((N) => N.setColor), s = ae((N) => N.setPalette), l = ae((N) => N.setSelectedIndices), i = ae((N) => N.getActiveIndex()), o = ae((N) => N.addColor), a = (N, R) => {
    const q = N.filter((ue) => ue !== R);
    return q.push(R), q;
  }, [c, u] = T.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [d, f] = T.useState("none"), [h, p] = T.useState(!1), [g, w] = T.useState(!1), [M, v] = T.useState(""), [m, x] = T.useState(!1), [S, b] = T.useState(null), [_, k] = T.useState(null), [C, A] = T.useState({ r: 255, g: 255, b: 255 }), [L, Y] = T.useState({
    r: 255,
    g: 255,
    b: 255
  }), [j, O] = T.useState("#ffffff"), [G, oe] = T.useState(() => {
    try {
      const N = window.localStorage.getItem("pss.paletteRows"), R = N ? Number(N) : 3, q = Number.isFinite(R) ? Math.floor(R) : 3;
      return Math.min(4, Math.max(2, q));
    } catch {
      return 3;
    }
  }), Q = T.useRef(null), te = T.useRef(!1), D = T.useRef(null), F = T.useRef(!1), K = T.useRef(null), le = T.useRef(!1), re = T.useRef(/* @__PURE__ */ new Set()), Se = T.useRef(!1), X = Te.useMemo(
    () => typeof navigator < "u" && navigator.platform.toLowerCase().includes("mac"),
    []
  ), ie = Te.useMemo(() => kM(C), [C]), ge = Te.useMemo(() => Nx(C), [C]), z = () => {
    u((N) => N.open ? { ...N, open: !1, index: null } : N);
  }, Z = (N, R) => {
    N.preventDefault(), typeof R == "number" && (new Set(t).has(R) || l([R]), Q.current = R), u({
      open: !0,
      x: N.clientX,
      y: N.clientY,
      index: R
    });
  };
  T.useEffect(() => {
    if (!c.open)
      return;
    const N = (q) => {
      var je;
      const ue = q.target;
      (je = ue == null ? void 0 : ue.closest) != null && je.call(ue, ".dropdown-select__menu") || D.current && D.current.contains(q.target) || z();
    }, R = (q) => {
      q.key === "Escape" && z();
    };
    return window.addEventListener("mousedown", N), window.addEventListener("keydown", R), () => {
      window.removeEventListener("mousedown", N), window.removeEventListener("keydown", R);
    };
  }, [c.open]), T.useLayoutEffect(() => {
    if (!c.open || !D.current)
      return;
    const N = D.current.getBoundingClientRect(), R = 8, q = Math.max(R, window.innerWidth - N.width - R), ue = Math.max(R, window.innerHeight - N.height - R), je = Math.min(Math.max(R, c.x), q), Nt = Math.min(Math.max(R, c.y), ue);
    (je !== c.x || Nt !== c.y) && u((sn) => ({ ...sn, x: je, y: Nt }));
  }, [c.open, c.x, c.y]);
  const I = t.length === 1 ? t[0] ?? null : null, U = I !== null && I >= 0 && I < e.length, ee = U && I !== null ? e[I] : "#ffffff", de = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ze = Te.useMemo(
    () => CM(de),
    [de]
  ), _e = T.useCallback((N) => {
    const R = {
      r: Sn(N.r, 0, 255),
      g: Sn(N.g, 0, 255),
      b: Sn(N.b, 0, 255)
    };
    A(R), O(hn(R));
  }, []), Fe = T.useCallback((N, R) => {
    const q = Mt(R) ?? { r: 255, g: 255, b: 255 };
    k(N), Y(q), A(q), O(hn(q));
  }, []), Oe = T.useCallback(() => {
    k(null);
  }, []), st = T.useCallback(() => {
    if (!_)
      return;
    const N = hn(C);
    if (_.mode === "set") {
      n(_.index, N), k(null);
      return;
    }
    o(N), k(null);
  }, [o, _, C, n]), Ie = (_ == null ? void 0 : _.mode) === "set" ? "Set Color" : "Add Color", he = () => {
    !U || I === null || (z(), Fe({ mode: "set", index: I }, ee));
  }, pt = () => {
    z(), Fe({ mode: "add" }, "#ffffff");
  }, Ue = new Set(t), It = [...Ue].sort((N, R) => N - R), tn = It.length, yt = tn > 0, Pn = tn > 1, Jn = e.length - tn >= 1, In = (N) => {
    l(N);
  }, nn = () => {
    if (t.length === 0)
      return;
    const N = t.filter((R) => R >= 0 && R < e.length);
    N.length !== t.length && l(N);
  };
  T.useEffect(nn, [e.length, t, l]);
  const nl = () => {
    if (!yt || !Jn)
      return;
    const N = new Set(It), R = e.filter((q, ue) => !N.has(ue));
    R.length !== 0 && (s(R), z());
  }, Nn = () => {
    if (!Pn)
      return;
    const N = $e.columns, R = [...Ue].sort((je, Nt) => {
      const sn = Math.floor(je / N), Is = je % N, Ns = Math.floor(Nt / N), Xn = Nt % N;
      return Is !== Xn ? Is - Xn : sn - Ns;
    });
    if (R.length < 2)
      return;
    const q = [...e], ue = q[R[R.length - 1]];
    for (let je = R.length - 1; je > 0; je -= 1)
      q[R[je]] = q[R[je - 1]];
    q[R[0]] = ue, s(q), z();
  }, En = (N) => {
    const R = new Set(e.map((q) => q.toLowerCase()));
    an(N).filter((q) => !R.has(q.toLowerCase())).forEach((q) => o(q)), z(), p(!1), f("none");
  }, fe = T.useCallback((N) => {
    b(null), w(!0), N && v(N);
  }, []), ye = () => {
    w(!1), x(!1), b(null), v("");
  };
  T.useEffect(() => {
    const N = () => {
      fe("https://lospec.com/palette-list/");
    };
    return window.addEventListener("palette:open-lospec", N), () => window.removeEventListener("palette:open-lospec", N);
  }, [fe]), T.useEffect(() => {
    const N = () => {
      p(!0), f("none");
    };
    return window.addEventListener("palette:open-add-swatch", N), () => window.removeEventListener("palette:open-add-swatch", N);
  }, []), T.useEffect(() => {
    const N = (R) => {
      const ue = Number(R.detail);
      Number.isFinite(ue) && oe(Math.min(4, Math.max(2, Math.floor(ue))));
    };
    return window.addEventListener("palette:set-rows", N), () => window.removeEventListener("palette:set-rows", N);
  }, []);
  const rt = async () => {
    var R;
    if (!((R = window.paletteApi) != null && R.importLospec)) {
      b("LoSpec import is unavailable (paletteApi not found). Restart the app.");
      return;
    }
    const N = M.trim();
    if (!N) {
      b("Paste a LoSpec palette URL or slug.");
      return;
    }
    if (window.confirm(
      "Importing a LoSpec palette will replace your current palette. Continue?"
    )) {
      x(!0), b(null);
      try {
        const q = await window.paletteApi.importLospec(N), ue = q.colors.length > 0 ? q.colors : e;
        s(ue), l([Math.max(0, ue.length - 1)]), Me.getState().setDirty(!0), ye();
      } catch (q) {
        const ue = q instanceof Error ? q.message : "Unable to import palette.";
        b(ue), x(!1);
      }
    }
  }, $e = Te.useMemo(() => {
    const N = e.length + 1, R = Math.min(G, Math.max(1, Math.ceil(N / 16))), q = Math.max(1, Math.ceil(N / R));
    return { rows: R, columns: q };
  }, [e.length, G]);
  T.useEffect(() => {
    try {
      window.localStorage.setItem("pss.paletteRows", String(G));
    } catch {
    }
  }, [G]), T.useEffect(() => {
    const N = () => {
      F.current = !1, K.current = null, Se.current = !1, re.current = /* @__PURE__ */ new Set();
    };
    return window.addEventListener("pointerup", N), () => window.removeEventListener("pointerup", N);
  }, []);
  const vn = (N) => ({
    row: Math.floor(N / $e.columns),
    col: N % $e.columns
  }), es = (N, R) => {
    const q = vn(N), ue = vn(R), je = Math.min(q.row, ue.row), Nt = Math.max(q.row, ue.row), sn = Math.min(q.col, ue.col), Is = Math.max(q.col, ue.col), Ns = [];
    for (let Xn = je; Xn <= Nt; Xn += 1)
      for (let $t = sn; $t <= Is; $t += 1) {
        const ts = Xn * $e.columns + $t;
        ts < 0 || ts >= e.length || Ns.push(ts);
      }
    return Ns;
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "palette-bar", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "palette-bar__swatches",
        role: "listbox",
        "aria-label": "Palette colors",
        style: {
          "--palette-rows": $e.rows,
          "--palette-columns": $e.columns
        },
        children: [
          e.map((N, R) => /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch",
              style: { background: N },
              "data-active": R === i,
              "data-selected": Ue.has(R),
              onMouseDown: (q) => {
                X && q.button === 0 && q.ctrlKey && (te.current = !0);
              },
              onPointerDown: (q) => {
                if (q.button !== 0)
                  return;
                F.current = !0, K.current = R, le.current = !1, Se.current = q.shiftKey || q.metaKey || q.ctrlKey || q.altKey, re.current = Se.current ? new Set(Ue) : /* @__PURE__ */ new Set();
                const ue = es(R, R);
                if (Se.current) {
                  const je = new Set(re.current);
                  ue.forEach((Nt) => je.add(Nt)), l(a(Array.from(je), R));
                } else
                  l(a(ue, R));
                Q.current = R;
              },
              onPointerEnter: () => {
                if (!F.current || K.current === null)
                  return;
                le.current = !0;
                const q = es(K.current, R);
                if (Se.current) {
                  const ue = new Set(re.current);
                  q.forEach((je) => ue.add(je)), l(a(Array.from(ue), R));
                } else
                  l(a(q, R));
              },
              onClick: (q) => {
                if (le.current) {
                  le.current = !1;
                  return;
                }
                if (te.current) {
                  te.current = !1;
                  return;
                }
                if (q.shiftKey && Q.current !== null) {
                  const ue = Math.min(Q.current, R), je = Math.max(Q.current, R), Nt = new Set(Ue);
                  for (let sn = ue; sn <= je; sn += 1)
                    Nt.add(sn);
                  l(a(Array.from(Nt), R)), Q.current = R;
                } else if (q.metaKey || q.altKey) {
                  const ue = new Set(Ue);
                  ue.has(R) ? ue.delete(R) : ue.add(R);
                  const je = Array.from(ue);
                  l(
                    ue.has(R) ? a(je, R) : je
                  ), Q.current = R;
                } else if (q.ctrlKey) {
                  const ue = new Set(Ue);
                  ue.has(R) ? ue.delete(R) : ue.add(R);
                  const je = Array.from(ue);
                  l(
                    ue.has(R) ? a(je, R) : je
                  ), Q.current = R;
                } else
                  In([R]), Q.current = R;
              },
              onContextMenu: (q) => Z(q, R),
              "aria-label": `Palette color ${R + 1}`,
              "aria-selected": Ue.has(R)
            },
            `${N}-${R}`
          )),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch palette-bar__swatch--empty",
              onClick: () => {
                pt();
              },
              onContextMenu: (N) => Z(N, null),
              "aria-label": "Add palette color"
            }
          )
        ]
      }
    ),
    c.open && /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: D,
        className: "palette-bar__menu",
        role: "menu",
        style: { top: c.y, left: c.x },
        children: [
          /* @__PURE__ */ r.jsx("div", { className: "palette-bar__menu-label", children: "Actions" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: he,
              disabled: !U,
              children: "Set Color"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: nl,
              disabled: !yt || !Jn,
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: Nn,
              disabled: !Pn,
              children: "Cycle Selected"
            }
          )
        ]
      }
    ),
    _ && Ci.createPortal(
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (N) => {
            if (N.key === "Escape") {
              N.preventDefault(), Oe();
              return;
            }
            if (N.key === "Enter") {
              const R = N.target;
              if ((R == null ? void 0 : R.tagName) === "TEXTAREA")
                return;
              N.preventDefault(), st();
            }
          },
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: Oe }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--palette-color", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ r.jsx("h2", { children: Ie }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: Oe, children: "Close" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-row", children: [
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Before" }),
                    /* @__PURE__ */ r.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: hn(L) }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Current" }),
                    /* @__PURE__ */ r.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: hn(C) }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__hex-row", children: [
                  /* @__PURE__ */ r.jsx("label", { className: "panel__label", htmlFor: "palette-color-hex", children: "HEX" }),
                  /* @__PURE__ */ r.jsx(
                    "input",
                    {
                      id: "palette-color-hex",
                      type: "text",
                      className: "panel__number",
                      value: j,
                      onChange: (N) => {
                        const R = N.currentTarget.value;
                        O(R);
                        const q = Dp(R);
                        if (!Lp(q))
                          return;
                        const ue = Mt(q);
                        ue && A(ue);
                      },
                      onBlur: () => {
                        const N = Dp(j);
                        if (!Lp(N)) {
                          O(hn(C));
                          return;
                        }
                        const R = Mt(N);
                        R && _e(R);
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "palette-color-picker__section-label", children: "RGB" }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "R" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: C.r,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, r: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: C.r,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, r: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "G" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: C.g,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, g: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: C.g,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, g: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "B" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: C.b,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, b: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 255,
                        step: 1,
                        value: C.b,
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e({ ...C, b: R });
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ r.jsx("div", { className: "palette-color-picker__section-label", children: "HSVL" }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "H" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 360,
                        value: Math.round(ie.h),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, h: Sn(R, 0, 360) })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 360,
                        step: 1,
                        value: Math.round(ie.h),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, h: Sn(R, 0, 360) })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "S" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.s * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, s: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ie.s * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, s: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "V" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.v * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, v: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ie.v * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, v: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "palette-color-picker__channel-name", children: "L" }),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ge.l * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            Du({ ...ge, l: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ r.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ge.l * 100),
                        onChange: (N) => {
                          const R = Number(N.currentTarget.value);
                          Number.isFinite(R) && _e(
                            Du({ ...ge, l: Sn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: Oe, children: "Cancel" }),
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: st, children: _.mode === "add" ? "Add Color" : "Apply" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    h && Ci.createPortal(
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.preventDefault(), p(!1), f("none"));
          },
          children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "modal__backdrop",
                onClick: () => {
                  p(!1), f("none");
                }
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ r.jsx("h2", { children: "Add Swatch Preset" }),
                /* @__PURE__ */ r.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      p(!1), f("none");
                    },
                    children: "Close"
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Preset" }),
                /* @__PURE__ */ r.jsx(
                  rn,
                  {
                    ariaLabel: "Swatch presets",
                    className: "panel__select",
                    value: d,
                    onChange: (N) => {
                      if (f(N), N === "none")
                        return;
                      const R = Ze.find((q) => q.id === N);
                      R && En(R.colors);
                    },
                    options: [
                      { value: "none", label: "Choose preset…" },
                      ...Ze.map((N) => ({
                        value: N.id,
                        label: N.label,
                        render: /* @__PURE__ */ r.jsxs("span", { className: "palette-bar__preset-option", children: [
                          /* @__PURE__ */ r.jsx("span", { className: "palette-bar__preset-option-label", children: N.label }),
                          /* @__PURE__ */ r.jsx("span", { className: "palette-bar__menu-preview", "aria-hidden": "true", children: N.colors.map((R, q) => /* @__PURE__ */ r.jsx(
                            "span",
                            {
                              className: "palette-bar__menu-chip",
                              style: { background: R }
                            },
                            `${N.id}-${R}-${q}`
                          )) })
                        ] })
                      }))
                    ]
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Adds only colors not already in the palette." })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    g && Ci.createPortal(
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (N) => {
            N.key === "Escape" && (N.preventDefault(), ye());
          },
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: ye }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ r.jsx("h2", { children: "Import LoSpec Palette" }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: ye, children: "Close" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ r.jsx("label", { className: "panel__label", htmlFor: "lospec-url", children: "URL or slug" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    id: "lospec-url",
                    type: "text",
                    className: "panel__number",
                    value: M,
                    placeholder: "https://lospec.com/palette-list/black-scarlet-16",
                    onChange: (N) => v(N.currentTarget.value),
                    onKeyDown: (N) => {
                      N.key === "Enter" && (N.preventDefault(), rt());
                    },
                    autoFocus: !0
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "panel__note", style: { color: "rgba(255, 170, 120, 0.9)" }, children: "Importing will replace your current palette." }),
                S && /* @__PURE__ */ r.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: S }),
                /* @__PURE__ */ r.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: ye, disabled: m, children: "Cancel" }),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void rt(),
                      disabled: m,
                      children: m ? "Importing…" : "Import"
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
}, PM = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
  const i = T.useRef(null);
  return T.useEffect(() => {
    const o = i.current;
    if (!o)
      return;
    const a = t * s, c = n * s;
    o.width = a, o.height = c;
    const u = o.getContext("2d");
    if (u) {
      u.imageSmoothingEnabled = !1, u.clearRect(0, 0, a, c);
      for (let d = 0; d < n; d += 1)
        for (let f = 0; f < t; f += 1) {
          const h = e[d * t + f] ?? 0;
          h !== 0 && (u.fillStyle = l[h] ?? l[0] ?? "#000000", u.fillRect(f * s, d * s, s, s));
        }
    }
  }, [e, t, n, s, l]), /* @__PURE__ */ r.jsx("canvas", { ref: i, "aria-hidden": "true" });
}, IM = () => {
  const e = $((I) => I.tileSets), t = $((I) => I.activeTileSetId), n = $((I) => I.tilePage), s = $((I) => I.tilePageCount), l = $((I) => I.setTilePageCount), i = $((I) => I.selectedTileIndex), o = $((I) => I.selectedTileIndices), a = $((I) => I.tilePickerZoom), c = $((I) => I.setTileSelection), u = $((I) => I.setActiveTileSet), d = $((I) => I.deleteTilesFromSet), f = ae((I) => I.colors), h = T.useMemo(() => e.find((I) => I.id === t) ?? e[0], [e, t]);
  T.useEffect(() => {
    !h && e.length > 0 && u(e[0].id);
  }, [h, e, u]);
  const p = (h == null ? void 0 : h.tiles.length) ?? 0, g = (h == null ? void 0 : h.tiles) ?? [], w = Math.max(1, (h == null ? void 0 : h.columns) ?? 1), M = Math.max(1, (h == null ? void 0 : h.rows) ?? 1), v = w * M, m = Math.max(1, Math.ceil(p / v)), x = h ? Math.max(16, h.tileWidth * a) : 32, S = T.useRef(null), [b, _] = T.useState({ width: 0, height: 0 }), k = w * x, C = M * x, A = T.useMemo(() => {
    if (b.width <= 0)
      return 1;
    const I = Math.floor((b.width + 8) / Math.max(1, k + 8));
    return Math.max(1, Math.min(m, I));
  }, [k, b.width, m]), L = T.useMemo(() => {
    if (b.height <= 0)
      return 1;
    const I = Math.floor((b.height + 8) / Math.max(1, C + 8));
    return Math.max(1, I);
  }, [C, b.height]), Y = Math.max(1, A * L), j = Math.max(1, Math.ceil(m / Y)), O = Math.min(n, j - 1), G = O * Y, oe = Math.max(0, Math.min(Y, m - G)), Q = T.useRef(!1), te = T.useRef(null), D = T.useMemo(
    () => new Set(o.filter((I) => I >= 0)),
    [o]
  ), F = T.useMemo(() => {
    const I = new Set(o.filter((U) => U >= 0));
    return Array.from(I).sort((U, ee) => U - ee);
  }, [o]), K = T.useCallback(() => {
    if (!h || F.length === 0)
      return;
    const I = F.length === 1 ? "tile" : "tiles";
    if (!window.confirm(
      `Delete ${F.length} ${I} from ${h.name}?`
    ))
      return;
    const ee = Ot();
    d(h.id, F);
    const de = Ot();
    qs(ee, de);
  }, [h, d, F]), le = T.useCallback(() => {
    const I = S.current;
    if (!I)
      return;
    const U = Math.floor(I.clientWidth || I.getBoundingClientRect().width || 0), ee = Math.floor(I.clientHeight || I.getBoundingClientRect().height || 0);
    _(
      (de) => de.width === U && de.height === ee ? de : { width: U, height: ee }
    );
  }, []);
  T.useEffect(() => {
    const I = S.current;
    if (!I)
      return;
    const U = () => {
      le();
    };
    if (U(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", U), () => {
        window.removeEventListener("resize", U);
      };
    const ee = new ResizeObserver(() => U()), de = I.parentElement;
    return de && ee.observe(de), ee.observe(I), () => {
      ee.disconnect();
    };
  }, [le]), T.useEffect(() => {
    s !== j && l(j);
  }, [l, s, j]), T.useEffect(() => {
    le();
    const I = window.requestAnimationFrame(() => {
      le();
    });
    return () => window.cancelAnimationFrame(I);
  }, [le, x, m, j, O]);
  const re = (I) => {
    const U = Math.floor(I / v), ee = I % v, de = ee % w, Ze = Math.floor(ee / w), _e = U % A;
    return {
      row: Math.floor(U / A) * M + Ze,
      col: _e * w + de
    };
  }, Se = (I, U) => {
    if (I.length === 0) {
      c([U], 1, 1, U);
      return;
    }
    const ee = I.map((he) => ({
      index: he,
      ...re(he)
    })), de = Math.min(...ee.map((he) => he.col)), Ze = Math.max(...ee.map((he) => he.col)), _e = Math.min(...ee.map((he) => he.row)), Fe = Math.max(...ee.map((he) => he.row)), Oe = Ze - de + 1, st = Fe - _e + 1, Ie = new Array(Oe * st).fill(-1);
    for (const he of ee) {
      const pt = he.col - de, It = (he.row - _e) * Oe + pt;
      Ie[It] = he.index;
    }
    c(Ie, Oe, st, U);
  }, X = (I, U) => {
    const ee = re(I), de = re(U), Ze = Math.min(ee.col, de.col), _e = Math.max(ee.col, de.col), Fe = Math.min(ee.row, de.row), Oe = Math.max(ee.row, de.row), st = _e - Ze + 1, Ie = Oe - Fe + 1, he = new Array(st * Ie).fill(-1);
    for (let pt = Fe; pt <= Oe; pt += 1)
      for (let Ue = Ze; Ue <= _e; Ue += 1) {
        const It = Math.floor(Ue / w), tn = Math.floor(pt / M), yt = Ue % w, Pn = pt % M, In = (tn * A + It) * v + Pn * w + yt;
        if (In < 0 || In >= p)
          continue;
        const nn = (pt - Fe) * st + (Ue - Ze);
        he[nn] = In;
      }
    c(he, st, Ie, I);
  }, ie = (I, U) => {
    if (Q.current = !0, te.current = I, U != null && U.additive) {
      const ee = /* @__PURE__ */ new Set([
        ...o.filter((de) => de >= 0),
        I
      ]);
      Se(Array.from(ee), I);
      return;
    }
    if (U != null && U.subtractive) {
      const ee = o.filter((Ze) => Ze >= 0 && Ze !== I), de = ee.length > 0 ? ee : [I];
      Se(de, I);
      return;
    }
    X(I, I);
  }, ge = (I) => {
    !Q.current || te.current === null || X(te.current, I);
  }, z = () => {
    Q.current = !1, te.current = null;
  };
  T.useEffect(() => {
    const I = () => z();
    return window.addEventListener("pointerup", I), () => window.removeEventListener("pointerup", I);
  }, []), T.useEffect(() => {
    const I = (U) => {
      if (U.key !== "Delete" && U.key !== "Backspace")
        return;
      const ee = U.target;
      if (ee) {
        const de = ee.tagName;
        if (de === "INPUT" || de === "TEXTAREA" || ee.isContentEditable)
          return;
      }
      !h || F.length === 0 || (U.preventDefault(), K());
    };
    return window.addEventListener("keydown", I), () => window.removeEventListener("keydown", I);
  }, [h, K, F.length]);
  const Z = T.useCallback((I) => {
    const U = S.current;
    U && (U.scrollHeight <= U.clientHeight || (U.scrollTop += I.deltaY, I.preventDefault(), I.stopPropagation()));
  }, []);
  return /* @__PURE__ */ r.jsx("div", { className: "tilebar", children: /* @__PURE__ */ r.jsx(
    "div",
    {
      ref: S,
      className: "tilebar__grid",
      onWheel: Z,
      style: {
        "--tile-cell-size": `${x}px`,
        "--tile-cluster-columns": `${w}`,
        "--tile-cluster-rows": `${M}`
      },
      children: h ? p === 0 ? /* @__PURE__ */ r.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: oe }, (I, U) => {
        const ee = G + U, de = ee * v;
        return /* @__PURE__ */ r.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: v }, (Ze, _e) => {
          const Fe = de + _e, Oe = Fe < 0 || Fe >= p, st = Oe ? null : g[Fe], Ie = !Oe && D.has(Fe);
          return /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "tilebar__tile",
              "data-active": Fe === i,
              "data-selected": Ie,
              "data-placeholder": Oe,
              onPointerDown: (he) => {
                Oe || ie(Fe, {
                  additive: he.shiftKey,
                  subtractive: he.ctrlKey || he.metaKey
                });
              },
              onPointerEnter: () => {
                Oe || ge(Fe);
              },
              "aria-label": `Tile ${Fe + 1}`,
              disabled: Oe,
              children: st ? /* @__PURE__ */ r.jsx(
                PM,
                {
                  pixels: st.pixels,
                  tileWidth: h.tileWidth,
                  tileHeight: h.tileHeight,
                  pixelSize: a,
                  palette: f
                }
              ) : null
            },
            Oe ? `placeholder-${Fe}` : (st == null ? void 0 : st.id) ?? `tile-${Fe}`
          );
        }) }, `cluster-${ee}`);
      }) : /* @__PURE__ */ r.jsx("div", { className: "tilebar__empty", children: "No tiles yet. Use Tile Sampler to capture some." })
    }
  ) });
}, Ex = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, Rx = (e, t, n, s) => {
  if (t.length <= 1 || e.pixels.length === 0)
    return e;
  const l = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, e.width - 1),
    maxY: Math.max(0, e.height - 1)
  }, i = e.pixels.map((a) => ({ x: a.x, y: a.y })), o = Zi(i, l, t, n, s);
  return {
    ...e,
    pixels: e.pixels.map((a) => ({
      ...a,
      paletteIndex: o.get(`${a.x}:${a.y}`) ?? t[0] ?? a.paletteIndex
    }))
  };
}, Ax = (e) => {
  const t = Ex(e.fontSize), n = e.text;
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
  let o = 0;
  for (const S of i) {
    const b = l.measureText(S);
    o = Math.max(o, Math.ceil(b.width));
  }
  const a = 2, c = Math.max(1, o + a * 2), u = Math.max(1, i.length * t + a * 2);
  s.width = c, s.height = u, l.clearRect(0, 0, c, u), l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`, l.fillStyle = "#ffffff";
  for (let S = 0; S < i.length; S += 1)
    l.fillText(i[S] ?? "", a, a + S * t);
  const f = l.getImageData(0, 0, c, u).data, h = e.alphaThreshold ?? 128;
  let p = Number.POSITIVE_INFINITY, g = Number.POSITIVE_INFINITY, w = Number.NEGATIVE_INFINITY, M = Number.NEGATIVE_INFINITY;
  for (let S = 0; S < u; S += 1)
    for (let b = 0; b < c; b += 1)
      (f[(S * c + b) * 4 + 3] ?? 0) < h || (p = Math.min(p, b), g = Math.min(g, S), w = Math.max(w, b), M = Math.max(M, S));
  if (!Number.isFinite(p) || !Number.isFinite(g))
    return null;
  const v = w - p + 1, m = M - g + 1, x = [];
  for (let S = g; S <= M; S += 1)
    for (let b = p; b <= w; b += 1)
      (f[(S * c + b) * 4 + 3] ?? 0) < h || x.push({
        x: b - p,
        y: S - g,
        paletteIndex: e.paletteIndex
      });
  return { pixels: x, width: v, height: m };
}, NM = (e) => {
  const t = pa(), { gradientDirection: n, gradientDither: s } = wt.getState(), l = Ax({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const i = t.length > 1 ? Rx(l, t, n, s) : l;
  ot.getState().setBuffer({
    pixels: i.pixels,
    origin: { x: 0, y: 0 },
    width: i.width,
    height: i.height
  }), jt.getState().setActiveTool("stamp");
}, EM = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], RM = [8, 16, 24, 32], AM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, LM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const i = ae((S) => S.colors), o = ae((S) => S.selectedIndices), a = ae((S) => S.getActiveIndex()), c = wt((S) => S.gradientDirection), u = wt((S) => S.gradientDither), [d, f] = Te.useState(e), [h, p] = Te.useState(t), [g, w] = Te.useState(Ex(n)), M = T.useRef(null), v = T.useRef(null), m = T.useRef(null);
  T.useEffect(() => {
    var S, b, _;
    (S = M.current) == null || S.focus(), (_ = (b = M.current) == null ? void 0 : b.select) == null || _.call(b);
  }, []);
  const x = T.useMemo(() => {
    try {
      const S = Ax({
        text: d,
        fontFamily: h,
        fontSize: g,
        paletteIndex: a
      });
      if (!S)
        return null;
      const b = /* @__PURE__ */ new Set(), _ = [];
      for (const k of o)
        k < 0 || k >= i.length || b.has(k) || (b.add(k), _.push(k));
      return _.length <= 1 ? S : Rx(S, _, c, u);
    } catch {
      return null;
    }
  }, [
    a,
    h,
    g,
    c,
    u,
    i.length,
    o,
    d
  ]);
  return T.useEffect(() => {
    const S = v.current, b = m.current;
    if (!S || !b)
      return;
    const _ = () => {
      const A = AM(b, S.clientWidth, S.clientHeight);
      if (!A)
        return;
      const L = S.clientWidth, Y = S.clientHeight, j = i[0] ?? "#000000", O = Mt(j) ?? { r: 0, g: 0, b: 0 }, G = fa(O, ha(O)), oe = Rd(hs(O, G, 0.1)), Q = cn(G, 0.12);
      if (A.clearRect(0, 0, L, Y), A.fillStyle = j, A.fillRect(0, 0, L, Y), !x || x.pixels.length === 0)
        return;
      const te = 12, D = Math.max(1, L - te * 2), F = Math.max(1, Y - te * 2), K = Math.max(
        1,
        Math.floor(
          Math.min(D / x.width, F / x.height)
        )
      ), le = x.width * K, re = x.height * K, Se = Math.floor((L - le) / 2), X = Math.floor((Y - re) / 2);
      A.fillStyle = oe, A.fillRect(Se, X, le, re), A.strokeStyle = Q, A.strokeRect(Se, X, le, re);
      const ie = /* @__PURE__ */ new Map();
      for (const ge of x.pixels) {
        const z = ie.get(ge.paletteIndex);
        z ? z.push({ x: ge.x, y: ge.y }) : ie.set(ge.paletteIndex, [{ x: ge.x, y: ge.y }]);
      }
      for (const [ge, z] of ie) {
        A.fillStyle = i[ge] ?? i[a] ?? "#ffffff";
        for (const Z of z)
          A.fillRect(
            Se + Z.x * K,
            X + Z.y * K,
            K,
            K
          );
      }
    };
    _();
    const k = ae.subscribe(_), C = new ResizeObserver(_);
    return C.observe(S), () => {
      k(), C.disconnect();
    };
  }, [a, i, x]), /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (S) => {
        S.key === "Escape" && (S.preventDefault(), s());
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: s }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--text", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ r.jsx("h2", { children: "Text" }),
            /* @__PURE__ */ r.jsx("button", { type: "button", onClick: s, children: "Close" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Font" }),
              /* @__PURE__ */ r.jsx("span", { children: /* @__PURE__ */ r.jsx(
                "select",
                {
                  value: h,
                  onChange: (S) => p(S.target.value),
                  children: EM.map((S) => /* @__PURE__ */ r.jsx("option", { value: S.value, children: S.label }, S.value))
                }
              ) })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Size" }),
              /* @__PURE__ */ r.jsx("span", { children: /* @__PURE__ */ r.jsx(
                "select",
                {
                  value: g,
                  onChange: (S) => w(Number(S.target.value)),
                  children: RM.map((S) => /* @__PURE__ */ r.jsxs("option", { value: S, children: [
                    S,
                    "px"
                  ] }, S))
                }
              ) })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Text" }),
              /* @__PURE__ */ r.jsx("span", { className: "text-tool__text-field", children: /* @__PURE__ */ r.jsx(
                "input",
                {
                  ref: M,
                  className: "text-tool__text-input",
                  type: "text",
                  value: d,
                  onChange: (S) => f(S.target.value),
                  placeholder: "Type text…",
                  onKeyDown: (S) => {
                    if (S.key === "Enter") {
                      if (S.preventDefault(), !d.trim())
                        return;
                      l({ text: d, fontFamily: h, fontSize: g });
                    }
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ r.jsx("div", { className: "text-tool__preview", ref: v, children: /* @__PURE__ */ r.jsx("canvas", { ref: m }) }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: s, children: "Cancel" }),
                /* @__PURE__ */ r.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => l({ text: d, fontFamily: h, fontSize: g }),
                    disabled: !d.trim(),
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
}, DM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = T.useState(!0), [l, i] = T.useState(!1), [o, a] = T.useState(!1), [c, u] = T.useState(!1), [d, f] = T.useState("gpt-image-1"), [h, p] = T.useState("openai"), [g, w] = T.useState("http://localhost:8080/v1"), [M, v] = T.useState("sdxl"), [m, x] = T.useState(!1), [S, b] = T.useState(!1), [_, k] = T.useState(!1), [C, A] = T.useState(!1), [L, Y] = T.useState(""), [j, O] = T.useState(!1), [G, oe] = T.useState(!1), [Q, te] = T.useState(""), D = T.useRef(null);
  T.useEffect(() => {
    let z = !1;
    return (async () => {
      try {
        const I = await window.optionsApi.getOpenAiKeyInfo(), U = await window.optionsApi.getOpenAiImageModel(), ee = await window.optionsApi.getAiImageProvider(), de = await window.optionsApi.getLocalAiConfig(), Ze = await window.optionsApi.getLocalAiKeyInfo(), _e = await window.optionsApi.getAdvancedMode();
        if (z)
          return;
        i(I.hasKey), a(I.encryptionAvailable), u(I.storedEncrypted), f(U), p(ee), w(de.baseUrl), v(de.model), x(Ze.hasKey), b(Ze.encryptionAvailable), k(Ze.storedEncrypted), O(_e);
      } finally {
        z || s(!1);
      }
    })(), () => {
      z = !0;
    };
  }, []), T.useEffect(() => {
    n || window.setTimeout(() => {
      var z;
      return (z = D.current) == null ? void 0 : z.focus();
    }, 0);
  }, [n]);
  const F = async () => {
    const z = Q.trim();
    if (!z) {
      window.alert("Paste your OpenAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setOpenAiApiKey(z);
      const Z = await window.optionsApi.getOpenAiKeyInfo();
      i(Z.hasKey), a(Z.encryptionAvailable), u(Z.storedEncrypted), te(""), oe(!1);
    } catch (Z) {
      console.error("Failed to save OpenAI API key:", Z), window.alert("Unable to save API key.");
    } finally {
      s(!1);
    }
  }, K = async () => {
    if (window.confirm("Clear the saved OpenAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setOpenAiApiKey(null);
        const z = await window.optionsApi.getOpenAiKeyInfo();
        i(z.hasKey), a(z.encryptionAvailable), u(z.storedEncrypted), te(""), oe(!1);
      } catch (z) {
        console.error("Failed to clear OpenAI API key:", z), window.alert("Unable to clear API key.");
      } finally {
        s(!1);
      }
    }
  }, le = async (z) => {
    f(z);
    try {
      await window.optionsApi.setOpenAiImageModel(z);
    } catch (Z) {
      console.error("Failed to set image model:", Z), window.alert("Unable to update image model.");
      const I = await window.optionsApi.getOpenAiImageModel().catch(() => "gpt-image-1");
      f(I);
    }
  }, re = async (z) => {
    p(z);
    try {
      await window.optionsApi.setAiImageProvider(z);
    } catch (Z) {
      console.error("Failed to set image provider:", Z), window.alert("Unable to update image provider.");
      const I = await window.optionsApi.getAiImageProvider().catch(() => "openai");
      p(I);
    }
  }, Se = async () => {
    const z = L.trim();
    if (!z) {
      window.alert("Paste your LocalAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setLocalAiApiKey(z);
      const Z = await window.optionsApi.getLocalAiKeyInfo();
      x(Z.hasKey), b(Z.encryptionAvailable), k(Z.storedEncrypted), Y(""), A(!1);
    } catch (Z) {
      console.error("Failed to save LocalAI API key:", Z), window.alert("Unable to save LocalAI API key.");
    } finally {
      s(!1);
    }
  }, X = async () => {
    if (window.confirm("Clear the saved LocalAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setLocalAiApiKey(null);
        const z = await window.optionsApi.getLocalAiKeyInfo();
        x(z.hasKey), b(z.encryptionAvailable), k(z.storedEncrypted), Y(""), A(!1);
      } catch (z) {
        console.error("Failed to clear LocalAI API key:", z), window.alert("Unable to clear LocalAI API key.");
      } finally {
        s(!1);
      }
    }
  }, ie = async (z) => {
    O(z);
    try {
      await window.optionsApi.setAdvancedMode(z), t(z);
    } catch (Z) {
      console.error("Failed to update advanced mode:", Z), window.alert("Unable to update advanced mode.");
      const I = await window.optionsApi.getAdvancedMode().catch(() => !0);
      O(I), t(I);
    }
  }, ge = l ? c ? "Saved (encrypted)" : o ? "Saved" : "Saved (not encrypted)" : "Not set";
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (z) => {
        z.key === "Escape" && (z.preventDefault(), e());
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: e }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--options", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ r.jsx("h2", { children: "Options" }),
            /* @__PURE__ */ r.jsx("button", { type: "button", onClick: e, children: "Close" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Advanced Mode" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: j,
                      onChange: (z) => void ie(z.currentTarget.checked),
                      disabled: n
                    }
                  ),
                  "Show tile tools"
                ] }),
                /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.7 }, children: "Hide or reveal tiling tools in the toolbar." })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "AI Provider" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsxs(
                  "select",
                  {
                    value: h,
                    onChange: (z) => void re(z.target.value),
                    disabled: n,
                    children: [
                      /* @__PURE__ */ r.jsx("option", { value: "openai", children: "OpenAI" }),
                      /* @__PURE__ */ r.jsx("option", { value: "localai", children: "LocalAI" })
                    ]
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.7 }, children: "Used by the AI Prompt tool." })
              ] })
            ] }),
            h === "openai" && /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "OpenAI Image Model" }),
              /* @__PURE__ */ r.jsx("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ r.jsxs(
                "select",
                {
                  value: d,
                  onChange: (z) => void le(z.target.value),
                  disabled: n,
                  children: [
                    /* @__PURE__ */ r.jsx("option", { value: "gpt-image-1-mini", children: "gpt-image-1-mini (faster/cheaper)" }),
                    /* @__PURE__ */ r.jsx("option", { value: "gpt-image-1", children: "gpt-image-1 (higher quality)" })
                  ]
                }
              ) })
            ] }),
            h === "localai" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ r.jsx("span", { children: "LocalAI Base URL" }),
                /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ r.jsx(
                    "input",
                    {
                      type: "text",
                      value: g,
                      onChange: (z) => w(z.target.value),
                      onBlur: () => void window.optionsApi.setLocalAiBaseUrl(g),
                      disabled: n,
                      style: { width: 360 }
                    }
                  ),
                  /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.7 }, children: "e.g. http://localhost:8080/v1" })
                ] })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ r.jsx("span", { children: "LocalAI Model" }),
                /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ r.jsx(
                    "input",
                    {
                      type: "text",
                      value: M,
                      onChange: (z) => v(z.target.value),
                      onBlur: () => void window.optionsApi.setLocalAiImageModel(M),
                      disabled: n,
                      style: { width: 240 }
                    }
                  ),
                  /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.7 }, children: "Must match your LocalAI image model name." })
                ] })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ r.jsx("span", { children: "LocalAI API Key" }),
                /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ r.jsx(
                    "input",
                    {
                      type: C ? "text" : "password",
                      value: L,
                      placeholder: m ? "•••••••••••••••• (saved)" : "(optional)",
                      onChange: (z) => Y(z.target.value),
                      disabled: n,
                      style: { width: 320 }
                    }
                  ),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => A((z) => !z),
                      disabled: n,
                      children: C ? "Hide" : "Show"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ r.jsx("span", { children: "LocalAI Key Status" }),
                /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.9 }, children: m ? _ ? "Saved (encrypted)" : S ? "Saved" : "Saved (not encrypted)" : "Not set (optional)" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ r.jsx("span", {}),
                /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => void Se(), disabled: n, children: "Save Key" }),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void X(),
                      disabled: n || !m,
                      children: "Clear"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "OpenAI API Key" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    ref: D,
                    type: G ? "text" : "password",
                    value: Q,
                    placeholder: l ? "•••••••••••••••• (saved)" : "sk-...",
                    onChange: (z) => te(z.target.value),
                    disabled: n,
                    style: { width: 320 }
                  }
                ),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => oe((z) => !z), disabled: n, children: G ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "OpenAI Key Status" }),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.9 }, children: ge })
            ] }),
            !o && /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Encryption is unavailable on this system; the key may be stored in plain text." })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: F, disabled: n, children: "Save Key" }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: K, disabled: n || !l, children: "Clear" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.75 }, children: "Note: LocalAI must expose OpenAI-compatible image endpoints at the Base URL." })
            ] })
          ] })
        ] })
      ]
    }
  );
}, BM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, YM = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((d) => Mt(d) ?? { r: 0, g: 0, b: 0 }), i = l.length > 1 ? Array.from({ length: l.length - 1 }, (d, f) => f + 1) : [0], o = [], { width: a, height: c, data: u } = e;
  for (let d = 0; d < c; d += 1)
    for (let f = 0; f < a; f += 1) {
      const h = (d * a + f) * 4, p = u[h] ?? 0, g = u[h + 1] ?? 0, w = u[h + 2] ?? 0;
      if ((u[h + 3] ?? 0) < s)
        continue;
      const v = { r: p, g, b: w };
      let m = i[0] ?? 0, x = Number.POSITIVE_INFINITY;
      for (const S of i) {
        const b = BM(v, l[S] ?? l[0]);
        b < x && (x = b, m = S);
      }
      m !== 0 && o.push({ x: f, y: d, paletteIndex: m });
    }
  return { pixels: o };
}, Dd = (e) => {
  const t = ae.getState().colors, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = new Uint8ClampedArray(n * s * 4);
  for (const i of e.pixels) {
    const o = t[i.paletteIndex];
    if (!o)
      continue;
    const a = Mt(o);
    if (!a)
      continue;
    const c = i.x - e.minX, d = ((i.y - e.minY) * n + c) * 4;
    l[d] = a.r, l[d + 1] = a.g, l[d + 2] = a.b, l[d + 3] = 255;
  }
  return { data: l, width: n, height: s };
}, XM = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const i = l.x - e.minX, o = l.y - e.minY;
    s[o * t + i] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, FM = async () => {
  const e = Ps();
  if (!e)
    return null;
  const { data: t, width: n, height: s } = Dd(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return null;
  const o = new ImageData(t, n, s);
  i.putImageData(o, 0, 0);
  const a = await new Promise(
    (d) => l.toBlob((f) => d(f), "image/png")
  );
  if (!a)
    return null;
  const c = new Uint8Array(await a.arrayBuffer());
  let u = "";
  for (const d of c)
    u += String.fromCharCode(d);
  return btoa(u);
}, rs = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), OM = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = ae((j) => j.colors), [l, i] = T.useState(e), [o, a] = T.useState(16), [c, u] = T.useState(16), [d, f] = T.useState(1), [h, p] = T.useState(1), [g, w] = T.useState(!1), [M, v] = T.useState(!1), [m, x] = T.useState(""), [S, b] = T.useState(0), [_, k] = T.useState(null), C = T.useRef(null), A = T.useMemo(() => rs(o, 1, 512) * rs(d, 1, 64), [
    o,
    d
  ]), L = T.useMemo(() => rs(c, 1, 512) * rs(h, 1, 64), [
    c,
    h
  ]);
  T.useEffect(() => {
    window.setTimeout(() => {
      var j;
      return (j = C.current) == null ? void 0 : j.focus();
    }, 0);
  }, []), T.useEffect(() => {
    if (!M) {
      b(0);
      return;
    }
    const j = Date.now(), O = window.setInterval(() => {
      b(Math.floor((Date.now() - j) / 1e3));
    }, 250);
    return () => window.clearInterval(O);
  }, [M]);
  const Y = async () => {
    var O;
    k(null);
    const j = l.trim();
    if (!j) {
      k("Enter a prompt.");
      return;
    }
    if (!((O = window.aiApi) != null && O.generateSprite)) {
      k("AI is unavailable. Restart the app to load the latest AI support.");
      return;
    }
    v(!0), x("Preparing request…");
    try {
      x(g ? "Encoding reference…" : "Preparing prompt…");
      const G = g ? await FM() : null;
      x("Waiting for OpenAI…");
      const oe = await window.aiApi.generateSprite({
        prompt: j,
        palette: s,
        cellWidth: rs(o, 1, 512),
        cellHeight: rs(c, 1, 512),
        columns: rs(d, 1, 64),
        rows: rs(h, 1, 64),
        referencePngBase64: G
      });
      x("Processing image…");
      const Q = new Image(), te = `data:image/png;base64,${oe.pngBase64}`;
      await new Promise((re, Se) => {
        Q.onload = () => re(), Q.onerror = () => Se(new Error("Failed to load generated image.")), Q.src = te;
      });
      const D = document.createElement("canvas");
      D.width = A, D.height = L;
      const F = D.getContext("2d");
      if (!F)
        throw new Error("Canvas unavailable.");
      F.imageSmoothingEnabled = !1, F.clearRect(0, 0, A, L), F.drawImage(Q, 0, 0, A, L), x("Quantizing to palette…");
      const K = F.getImageData(0, 0, A, L), le = YM(K, s, { alphaThreshold: 10 });
      x("Copying to Stamp…"), ot.getState().setBuffer({
        pixels: le.pixels,
        origin: { x: 0, y: 0 },
        width: A,
        height: L
      }), jt.getState().setActiveTool("stamp"), n({
        prompt: j,
        cellWidth: o,
        cellHeight: c,
        columns: d,
        rows: h,
        useSelectionAsReference: g
      });
    } catch (G) {
      console.error("AI generation failed:", G), k(G instanceof Error ? G.message : "AI generation failed.");
    } finally {
      v(!1), x("");
    }
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (j) => {
        j.key === "Escape" && (j.preventDefault(), t()), (j.ctrlKey || j.metaKey) && j.key === "Enter" && (j.preventDefault(), Y());
      },
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: t }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--ai", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ r.jsx("h2", { children: "AI Prompt" }),
            /* @__PURE__ */ r.jsx("button", { type: "button", onClick: t, disabled: M, children: "Close" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Prompt" }),
              /* @__PURE__ */ r.jsxs("span", { style: { width: 420 }, children: [
                /* @__PURE__ */ r.jsx(
                  "textarea",
                  {
                    ref: C,
                    value: l,
                    onChange: (j) => i(j.target.value),
                    rows: 5,
                    style: { width: "100%", resize: "vertical" },
                    placeholder: "e.g. give me a hero standing idle in 4 directions, 16x32 pixels tall for each cell",
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { style: { opacity: 0.75, marginTop: 6 }, children: "Ctrl/Cmd+Enter to generate. Uses current palette." })
              ] })
            ] }),
            M && /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Status" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "grid", gap: 8, width: 420 }, children: [
                /* @__PURE__ */ r.jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [
                  /* @__PURE__ */ r.jsx("span", { className: "spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.9 }, children: [
                    m || "Generating…",
                    S > 0 ? ` (${S}s)` : ""
                  ] })
                ] }),
                /* @__PURE__ */ r.jsx("div", { className: "progress-bar", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx("div", { className: "progress-bar__indeterminate" }) })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Cell" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: o,
                    onChange: (j) => a(Number(j.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { children: "×" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: c,
                    onChange: (j) => u(Number(j.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { children: "px" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Grid" }),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: d,
                    onChange: (j) => f(Number(j.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { children: "cols" }),
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: h,
                    onChange: (j) => p(Number(j.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { children: "rows" }),
                /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.75 }, children: [
                  "(",
                  A,
                  "×",
                  L,
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "Reference" }),
              /* @__PURE__ */ r.jsxs("label", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: g,
                    onChange: (j) => w(j.target.checked),
                    disabled: M
                  }
                ),
                "Use current selection as reference image (optional)"
              ] })
            ] }),
            _ && /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsx("span", { style: { color: "#ff9caa" }, children: _ })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => void Y(), disabled: M, children: M ? "Generating…" : "Generate" }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: t, disabled: M, children: "Cancel" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, we = {
  undo: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M9 7H5v4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M5 11c2.2-3.4 6.1-5.5 10.2-5.5 4.8 0 8.8 3 9.8 7.3" }),
    /* @__PURE__ */ r.jsx("path", { d: "M5 11l4-4" })
  ] }),
  redo: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M15 7h4v4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M19 11c-2.2-3.4-6.1-5.5-10.2-5.5-4.8 0-8.8 3-9.8 7.3" }),
    /* @__PURE__ */ r.jsx("path", { d: "M19 11l-4-4" })
  ] }),
  cut: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("circle", { cx: "6", cy: "6", r: "2.2" }),
    /* @__PURE__ */ r.jsx("circle", { cx: "6", cy: "18", r: "2.2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8l12 8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 16l6-4" })
  ] }),
  copy: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "6", y: "6", width: "10", height: "10", rx: "1.6" }),
    /* @__PURE__ */ r.jsx("rect", { x: "9", y: "9", width: "10", height: "10", rx: "1.6" })
  ] }),
  "copy-deep": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "7", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ r.jsx("rect", { x: "10", y: "9", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M17 5v4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M15 7h4" })
  ] }),
  paste: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "6", y: "7", width: "12", height: "13", rx: "1.6" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 4h6v3H9z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 11h6" })
  ] }),
  pen: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M4 20l4-1 12-12-3-3L5 16l-1 4z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M13.5 5.5l3 3" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7 17l2 2" })
  ] }),
  spray: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M9 10h7l2 2v3H9z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7 12h2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 12h1" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12.5 6v4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9.5 16.2l-1 1" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 17.2l-.6 1.2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14.6 16.6l1 1" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 18l.8.8" })
  ] }),
  line: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M6 18L18 6" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6 18h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 6h0" })
  ] }),
  rectangle: /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ r.jsx("rect", { x: "5", y: "6", width: "14", height: "12", rx: "1.5" }) }),
  oval: /* @__PURE__ */ r.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ r.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5" }) }),
  "fill-bucket": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M6.5 11.5l8-8 3 3-8 8H6.5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6.8 15.5h6.4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 14.5c0 1-1 2-2 2s-2-1-2-2 2-3 2-3 2 2 2 3z" })
  ] }),
  text: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M6 6h12" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 6v12" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 18h6" })
  ] }),
  ai: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M18 12l.9 2.8L22 16l-3.1 1.2L18 20l-.9-2.8L14 16l3.1-1.2L18 12z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 13l.8 2.4L7.5 16l-2.7 1L4 19.4l-.8-2.4L0.5 16l2.7-.6L4 13z" })
  ] }),
  "reference-handle": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 8v8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7.5 7.5h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16.5 7.5h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7.5 16.5h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16.5 16.5h0" })
  ] }),
  eyedropper: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M14.5 5.5l4 4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6 19l8.2-8.2a2.2 2.2 0 000-3.1l-.9-.9a2.2 2.2 0 00-3.1 0L2 15.9V19h4z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9.5 9.5l5 5" })
  ] }),
  stamp: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 15v-4a3 3 0 016 0v4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 15h8" })
  ] }),
  "selection-rect": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 16h0" })
  ] }),
  "selection-oval": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 9h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M15 15h0" })
  ] }),
  "magic-wand": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M4 20l9-9" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12.5 12.5l7.5 7.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M17 4l.6 1.7L19 6l-1.4.3L17 8l-.6-1.7L15 6l1.4-.3L17 4z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14 8l.4 1.1L15.5 9l-1.1.2L14 10.3l-.4-1.1L12.5 9l1.1-.2L14 8z" })
  ] }),
  "selection-lasso": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M12 5c-4.5 0-8 2.1-8 4.8S7.5 14.6 12 14.6 20 12.5 20 9.8 16.5 5 12 5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8.2 14.6l-2 4.9" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6.2 19.5l2.6-1.2" })
  ] }),
  "texture-roll": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 12h6" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 9v6" }),
    /* @__PURE__ */ r.jsx("path", { d: "M3 12h2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M19 12h2" })
  ] }),
  "tile-sampler": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M5 13h6v6H5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M13 13h6v6h-6z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14.2 14.2l4.8 4.8" })
  ] }),
  "tile-pen": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M5 5h8v8H5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 12l8-8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14.2 6.2l3.6 3.6" })
  ] }),
  "tile-stamp": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9 15v-2a3 3 0 016 0v2" })
  ] }),
  "tile-rectangle": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8h8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 16h8" })
  ] }),
  "tile-9slice": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M10 6v12" }),
    /* @__PURE__ */ r.jsx("path", { d: "M14 6v12" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6 10h12" }),
    /* @__PURE__ */ r.jsx("path", { d: "M6 14h12" })
  ] }),
  "tile-export": /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "6", y: "7", width: "12", height: "11", rx: "1.5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 4v8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M9.5 6.5L12 4l2.5 2.5" })
  ] }),
  export: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M12 4v10" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 10l4 4 4-4" }),
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "18", width: "14", height: "2", rx: "1" })
  ] }),
  clear: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8l8 8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 8l-8 8" })
  ] }),
  layers: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M12 4l8 4-8 4-8-4 8-4z" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 12l8 4 8-4" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 16l8 4 8-4" })
  ] }),
  overlays: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.8" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 5v14" }),
    /* @__PURE__ */ r.jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 16h0" })
  ] }),
  swatch: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("rect", { x: "4.5", y: "6.5", width: "15", height: "11", rx: "2" }),
    /* @__PURE__ */ r.jsx("path", { d: "M8 6.5v11" }),
    /* @__PURE__ */ r.jsx("path", { d: "M12 6.5v11" }),
    /* @__PURE__ */ r.jsx("path", { d: "M16 6.5v11" })
  ] }),
  fullscreen: /* @__PURE__ */ r.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ r.jsx("path", { d: "M4 9V4h5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M20 9V4h-5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M4 15v5h5" }),
    /* @__PURE__ */ r.jsx("path", { d: "M20 15v5h-5" })
  ] })
}, zM = (e, t) => {
  const n = se.getState(), s = n.activeLayerId, l = new Set(
    n.layers.filter((i) => i.id === s || i.visible).map((i) => i.id)
  );
  for (let i = n.layers.length - 1; i >= 0; i -= 1) {
    const o = n.layers[i];
    if (!l.has(o.id))
      continue;
    const a = o.store.getPixel(e, t);
    if (a !== 0)
      return a;
  }
  return 0;
}, Lx = (e = {}) => {
  const t = xe.getState();
  if (t.selectedCount === 0)
    return null;
  const n = se.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: d, col: f, block: h } of u) {
    const p = f * B, g = d * B;
    for (let w = 0; w < B; w += 1)
      for (let M = 0; M < B; M += 1) {
        if (h[w * B + M] !== 1)
          continue;
        const v = p + M, m = g + w, x = c ? zM(v, m) : n.getPixel(v, m);
        s.push({ x: v, y: m, paletteIndex: x }), l = Math.min(l, v), i = Math.max(i, v), o = Math.min(o, m), a = Math.max(a, m);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: i, minY: o, maxY: a };
}, Dx = (e) => {
  const t = { x: e.minX, y: e.minY }, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = e.pixels.map((i) => ({
    x: i.x - t.x,
    y: i.y - t.y,
    paletteIndex: i.paletteIndex
  }));
  ot.getState().setBuffer({
    pixels: l,
    origin: t,
    width: n,
    height: s
  });
}, $r = (e = {}) => {
  const t = Lx(e);
  t && (Dx(t), xe.getState().clear(), jt.getState().setActiveTool("stamp"));
}, Bx = () => {
  const e = Lx();
  if (!e)
    return;
  Dx(e);
  const t = se.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Ae.getState().pushBatch({ changes: n })), xe.getState().clear(), jt.getState().setActiveTool("stamp");
}, HM = () => {
  const e = xe.getState();
  if (e.selectedCount === 0)
    return;
  const t = Ae.getState();
  if (t.locked)
    return;
  const n = se.getState(), s = n.activeLayerId, l = [], i = [], o = e.store.getBlocks();
  for (const { row: a, col: c, block: u } of o) {
    const d = c * B, f = a * B;
    for (let h = 0; h < B; h += 1)
      for (let p = 0; p < B; p += 1) {
        if (u[h * B + p] !== 1)
          continue;
        const g = d + p, w = f + h, M = n.getPixelInLayer(s, g, w);
        M !== 0 && (l.push({ x: g, y: w, prev: M, next: 0 }), i.push({ x: g, y: w, paletteIndex: 0 }));
      }
  }
  i.length !== 0 && (n.setPixelsInLayer(s, i), t.pushBatch({ layerId: s, changes: l }));
}, Yx = () => {
  const e = $.getState();
  return e.tileSets.find((t) => t.id === e.activeTileSetId) ?? null;
}, WM = (e) => {
  const t = $.getState(), n = t.tileMaps.find(
    (s) => s.id === t.activeTileMapId && s.tileSetId === e
  );
  return n || (t.tileMaps.find((s) => s.tileSetId === e) ?? null);
}, Xx = (e) => {
  const t = WM(e.id);
  if (!t)
    return null;
  const n = xe.getState();
  if (n.selectedCount <= 0)
    return null;
  const s = /* @__PURE__ */ new Set();
  let l = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = n.store.getBlocks();
  for (const { row: h, col: p, block: g } of c) {
    const w = p * B, M = h * B;
    for (let v = 0; v < B; v += 1)
      for (let m = 0; m < B; m += 1) {
        if (g[v * B + m] !== 1)
          continue;
        const x = w + m, S = M + v, b = Math.floor((x - t.originX) / e.tileWidth), _ = Math.floor((S - t.originY) / e.tileHeight);
        if (b < 0 || _ < 0 || b >= t.columns || _ >= t.rows)
          continue;
        const k = `${b}:${_}`;
        s.has(k) || (s.add(k), l = Math.min(l, b), i = Math.min(i, _), o = Math.max(o, b), a = Math.max(a, _));
      }
  }
  if (s.size === 0)
    return null;
  const u = o - l + 1, d = a - i + 1, f = new Array(u * d).fill(-1);
  for (const h of s) {
    const [p, g] = h.split(":"), w = Number(p), M = Number(g), v = (M - i) * u + (w - l);
    f[v] = t.tiles[M * t.columns + w] ?? -1;
  }
  return {
    map: t,
    tiles: f,
    cols: u,
    rows: d,
    bounds: { minCol: l, minRow: i, maxCol: o, maxRow: a }
  };
}, Fx = (e) => {
  const t = $.getState(), n = Math.max(1, t.selectedTileCols), s = Math.max(1, t.selectedTileRows), l = n * s, i = new Array(l).fill(-1);
  for (let o = 0; o < l; o += 1)
    i[o] = t.selectedTileIndices[o] ?? -1;
  return i.some((o) => o >= 0) ? (ot.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: i,
    cols: n,
    rows: s,
    source: "palette"
  }), xe.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0) : !1;
}, Ox = () => {
  const e = Yx();
  if (!e)
    return !1;
  const t = Xx(e);
  return t ? (ot.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: t.tiles,
    cols: t.cols,
    rows: t.rows,
    source: "map"
  }), xe.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0) : Fx(e);
}, zx = () => {
  const e = Yx();
  if (!e)
    return !1;
  const t = Xx(e);
  if (t) {
    ot.getState().setTileBuffer({
      tileSetId: e.id,
      tiles: t.tiles,
      cols: t.cols,
      rows: t.rows,
      source: "map"
    });
    const o = [];
    for (let a = t.bounds.minRow; a <= t.bounds.maxRow; a += 1)
      for (let c = t.bounds.minCol; c <= t.bounds.maxCol; c += 1) {
        const u = (a - t.bounds.minRow) * t.cols + (c - t.bounds.minCol);
        (t.tiles[u] ?? -1) !== -1 && o.push({ index: a * t.map.columns + c, tile: -1 });
      }
    if (o.length > 0) {
      const a = Ot();
      $.getState().setTileMapTiles(t.map.id, o);
      const c = Ot();
      qs(a, c);
    }
    return xe.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0;
  }
  if (!Fx(e))
    return !1;
  const s = Array.from(
    new Set($.getState().selectedTileIndices.filter((o) => o >= 0))
  ).sort((o, a) => o - a);
  if (s.length === 0)
    return !1;
  const l = Ot();
  $.getState().deleteTilesFromSet(e.id, s);
  const i = Ot();
  return qs(l, i), !0;
}, Hx = async () => {
  const e = Ps();
  if (!e)
    return window.alert("Select a region to export."), null;
  const { data: t, width: n, height: s } = Dd(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return window.alert("Unable to export selection."), null;
  const o = new ImageData(t, n, s);
  i.putImageData(o, 0, 0);
  const a = await new Promise(
    (d) => l.toBlob((f) => d(f), "image/png")
  );
  if (!a)
    return window.alert("Unable to export selection."), null;
  const c = new Uint8Array(await a.arrayBuffer()), u = `pixel-splash-selection-${n}x${s}.png`;
  return window.projectApi.exportPng(c, u);
}, Bp = (e, t, n) => Math.min(n, Math.max(t, e)), UM = (e, t, n, s) => {
  const [l, i] = Te.useState({ x: t, y: n });
  return Te.useLayoutEffect(() => {
    if (!e || !s.current) {
      i({ x: t, y: n });
      return;
    }
    const o = s.current.getBoundingClientRect(), a = 8, c = Math.max(a, window.innerWidth - o.width - a), u = Math.max(a, window.innerHeight - o.height - a);
    i({
      x: Bp(t, a, c),
      y: Bp(n, a, u)
    });
  }, [e, s, t, n]), l;
}, fl = ({
  checked: e,
  label: t,
  onChange: n,
  title: s
}) => /* @__PURE__ */ r.jsxs(
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
      /* @__PURE__ */ r.jsx("span", { className: "bottom-dock__menu-toggle-indicator", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx("span", { children: t })
    ]
  }
);
class $M extends Te.Component {
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
    return this.state.hasError ? /* @__PURE__ */ r.jsxs("div", { className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
      /* @__PURE__ */ r.jsx("div", { style: { opacity: 0.9 }, children: "Toolbar disabled due to an error." }),
      /* @__PURE__ */ r.jsx("div", { style: { flex: 1 } }),
      /* @__PURE__ */ r.jsx("button", { type: "button", className: "topbar__mode-button", onClick: () => window.location.reload(), children: "Reload" })
    ] }) : this.props.children;
  }
}
const VM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: o,
  showAiTool: a,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: d,
  toolOptions: f
}) => {
  const h = Te.useRef(null), p = Te.useRef(null), g = Ae((I) => I.locked), w = Ae((I) => I.undoStack.length > 0), M = Ae((I) => I.redoStack.length > 0), v = Ae((I) => I.undo), m = Ae((I) => I.redo), x = ot((I) => I), S = x.pixels.length > 0 && x.width > 0 && x.height > 0, b = x.tileBuffer !== null && x.tileBuffer.cols > 0 && x.tileBuffer.rows > 0 && x.tileBuffer.tiles.length > 0, _ = s === "tile", k = $(
    (I) => new Set(I.selectedTileIndices.filter((U) => U >= 0)).size
  ), C = t > 0 || k > 0, A = () => {
    if (_) {
      Ox();
      return;
    }
    $r();
  }, L = () => {
    if (_) {
      zx();
      return;
    }
    Bx();
  }, Y = () => {
    if (_) {
      b && n("tile-stamp");
      return;
    }
    n("stamp");
  }, j = Re((I) => I.showReferenceLayer), O = Re((I) => I.showPixelLayer), G = Re((I) => I.showTileLayer), oe = Re((I) => I.showPixelGrid), Q = Re((I) => I.showTileGrid), te = Re((I) => I.showAxes), D = Re((I) => I.toggleReferenceLayer), F = Re((I) => I.togglePixelLayer), K = Re((I) => I.toggleTileLayer), le = Re((I) => I.togglePixelGrid), re = Re((I) => I.toggleTileGrid), Se = Re((I) => I.toggleAxes), [X, ie] = Te.useState({
    open: !1,
    kind: "layers",
    x: 0,
    y: 0
  }), ge = UM(X.open, X.x, X.y, p), z = Te.useCallback(() => {
    ie((I) => I.open ? { ...I, open: !1 } : I);
  }, []), Z = (I) => (U) => {
    if (U.preventDefault(), X.open && X.kind === I) {
      z();
      return;
    }
    ie({ open: !0, kind: I, x: U.clientX, y: U.clientY });
  };
  return Te.useEffect(() => {
    if (!X.open)
      return;
    const I = (ee) => {
      p.current && p.current.contains(ee.target) || z();
    }, U = (ee) => {
      ee.key === "Escape" && z();
    };
    return window.addEventListener("mousedown", I), window.addEventListener("keydown", U), () => {
      window.removeEventListener("mousedown", I), window.removeEventListener("keydown", U);
    };
  }, [z, X.open]), Te.useLayoutEffect(() => {
    const I = h.current;
    if (!I)
      return;
    const U = () => {
      const de = I.offsetHeight;
      de > 0 && document.documentElement.style.setProperty("--topbar-height", `${de}px`);
    };
    if (U(), typeof ResizeObserver > "u") {
      const de = () => U();
      return window.addEventListener("resize", de), () => {
        window.removeEventListener("resize", de);
      };
    }
    const ee = new ResizeObserver(U);
    return ee.observe(I), () => ee.disconnect();
  }, []), /* @__PURE__ */ r.jsxs("div", { ref: h, className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "topbar__tools", role: "presentation", children: [
      i && /* @__PURE__ */ r.jsxs("div", { className: "topbar__workspace-toggle", role: "group", "aria-label": "Workspace mode", children: [
        /* @__PURE__ */ r.jsx(
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
        /* @__PURE__ */ r.jsx(
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
      i && /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: v,
          title: "Undo (Ctrl/Cmd+Z)",
          "aria-label": "Undo",
          disabled: g || !w,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.undo })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: m,
          title: "Redo (Ctrl/Cmd+Shift+Z)",
          "aria-label": "Redo",
          disabled: g || !M,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.redo })
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: A,
          title: _ ? "Copy Tiles" : "Copy Selection (Active Layer)",
          "aria-label": "Copy Selection",
          disabled: _ ? !C : t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.copy })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => $r({ deep: !0 }),
          title: "Deep Copy Selection (Merged)",
          "aria-label": "Deep Copy Selection",
          disabled: _ || t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["copy-deep"] })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: L,
          title: _ ? "Cut Tiles" : "Cut Selection",
          "aria-label": "Cut Selection",
          disabled: _ ? !C : t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.cut })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: Y,
          title: _ ? "Paste Tiles (Tile Stamp)" : "Paste (Stamp Tool)",
          "aria-label": "Paste",
          disabled: _ ? !b : !S,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.paste })
        }
      ),
      c !== !1 && /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            Hx();
          },
          title: "Export PNG…",
          "aria-label": "Export PNG",
          disabled: t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.export })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => xe.getState().clear(),
          title: "Clear Selection",
          "aria-label": "Clear Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.clear })
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      !_ && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "pen",
            onClick: () => n("pen"),
            title: "Pen (P)",
            "aria-label": "Pen",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.pen })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "spray",
            onClick: () => n("spray"),
            title: "Spray (S)",
            "aria-label": "Spray",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.spray })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "line",
            onClick: () => n("line"),
            title: "Line (L)",
            "aria-label": "Line",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.line })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "rectangle",
            onClick: () => n("rectangle"),
            title: "Rectangle (R)",
            "aria-label": "Rectangle",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.rectangle })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "oval",
            onClick: () => n("oval"),
            title: "Oval (O)",
            "aria-label": "Oval",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.oval })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "fill-bucket",
            onClick: () => n("fill-bucket"),
            title: "Fill (F)",
            "aria-label": "Fill",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["fill-bucket"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "text",
            onClick: () => n("text"),
            title: "Text (T)",
            "aria-label": "Text",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.text })
          }
        ),
        a !== !1 && /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "ai",
            onClick: () => n("ai"),
            title: "AI Prompt",
            "aria-label": "AI Prompt",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.ai })
          }
        ),
        /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "reference-handle",
            onClick: () => n("reference-handle"),
            title: "Reference Handle (H)",
            "aria-label": "Reference Handle",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["reference-handle"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "eyedropper",
            onClick: () => n("eyedropper"),
            title: "Eyedropper (E)",
            "aria-label": "Eyedropper",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.eyedropper })
          }
        ),
        i && /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-sampler",
            onClick: () => n("tile-sampler"),
            title: "Tile Sampler (Shift+S)",
            "aria-label": "Tile Sampler",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-sampler"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "stamp",
            onClick: () => n("stamp"),
            title: "Stamp (V)",
            "aria-label": "Stamp",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.stamp })
          }
        )
      ] }),
      !_ && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-rect"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-oval"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["magic-wand"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["texture-roll"] })
          }
        )
      ] }),
      _ && i && o !== !1 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-pen",
            onClick: () => n("tile-pen"),
            title: "Tile Pen (Shift+P)",
            "aria-label": "Tile Pen",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-pen"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-stamp",
            onClick: () => n("tile-stamp"),
            title: "Tile Stamp (Ctrl/Cmd+V)",
            "aria-label": "Tile Stamp",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-stamp"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-rectangle",
            onClick: () => n("tile-rectangle"),
            title: "Tile Rectangle (Shift+R)",
            "aria-label": "Tile Rectangle",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-rectangle"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-9slice",
            onClick: () => n("tile-9slice"),
            title: "Tile 9-Slice (Shift+N)",
            "aria-label": "Tile 9-Slice",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-9slice"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-export",
            onClick: () => n("tile-export"),
            title: "Tile Export (Shift+E)",
            "aria-label": "Tile Export",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["tile-export"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-rect"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-oval"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["magic-wand"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we["texture-roll"] })
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": X.open && X.kind === "layers",
          onClick: Z("layers"),
          title: "Layers",
          "aria-label": "Layers",
          "aria-expanded": X.open && X.kind === "layers",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.layers })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": X.open && X.kind === "overlays",
          onClick: Z("overlays"),
          title: "Overlays",
          "aria-label": "Overlays",
          "aria-expanded": X.open && X.kind === "overlays",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.overlays })
        }
      ),
      !_ && /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => window.dispatchEvent(new Event("palette:open-add-swatch")),
          title: "Add Swatch Preset",
          "aria-label": "Add Swatch Preset",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.swatch })
        }
      ),
      u !== !1 && /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            var I, U;
            (U = (I = window.windowApi) == null ? void 0 : I.toggleFullscreen) == null || U.call(I);
          },
          title: "Toggle Full Screen (F11)",
          "aria-label": "Toggle Full Screen",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: we.fullscreen })
        }
      ),
      f && /* @__PURE__ */ r.jsx("div", { className: "topbar__options", children: f })
    ] }),
    X.open && /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: p,
        className: "bottom-dock__menu",
        role: "menu",
        "aria-label": X.kind === "layers" ? "Layers" : "Overlays",
        style: { top: ge.y, left: ge.x },
        children: [
          /* @__PURE__ */ r.jsx("div", { className: "bottom-dock__menu-title", children: X.kind === "layers" ? "Layers" : "Overlays" }),
          X.kind === "layers" ? /* @__PURE__ */ r.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ r.jsx(fl, { checked: j, label: "Reference", onChange: D }),
            /* @__PURE__ */ r.jsx(fl, { checked: O, label: "Pixels", onChange: F }),
            d !== !1 && /* @__PURE__ */ r.jsx(fl, { checked: G, label: "Tiles", onChange: K })
          ] }) : /* @__PURE__ */ r.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ r.jsx(
              fl,
              {
                checked: oe,
                label: "Pixel Grid",
                onChange: le,
                title: "Toggle pixel grid visibility"
              }
            ),
            d !== !1 && /* @__PURE__ */ r.jsx(
              fl,
              {
                checked: Q,
                label: "Tile Grid",
                onChange: re,
                title: "Toggle tile grid visibility"
              }
            ),
            /* @__PURE__ */ r.jsx(fl, { checked: te, label: "Axes", onChange: Se, title: "Toggle axis visibility" })
          ] })
        ]
      }
    )
  ] });
}, KM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: o,
  showAiTool: a,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: d,
  toolOptions: f
}) => /* @__PURE__ */ r.jsx($M, { children: /* @__PURE__ */ r.jsx(
  VM,
  {
    activeTool: e,
    selectionCount: t,
    activateTool: n,
    workspaceMode: s,
    switchWorkspace: l,
    showAdvancedTools: i,
    showTileTools: o,
    showAiTool: a,
    showExportButton: c,
    showFullscreenButton: u,
    showTileLayerControls: d,
    toolOptions: f
  }
) }), GM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", QM = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, ZM = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), i = URL.createObjectURL(l), o = new Image();
  o.onload = () => {
    URL.revokeObjectURL(i), n(o);
  }, o.onerror = () => {
    URL.revokeObjectURL(i), s(new Error("Failed to load reference image"));
  }, o.src = i;
}), qM = () => {
  const e = ae.getState(), t = Ce.getState(), n = se.getState(), s = Ae.getState(), l = zt.getState(), i = $.getState(), o = Yt.getState(), a = /* @__PURE__ */ new Map(), c = l.items.filter((u) => u.assetFilename && u.assetData).map((u) => (a.has(u.assetFilename) || a.set(u.assetFilename, {
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
      bookmarks: o.items.length > 0 ? { items: o.items, overlaysVisible: o.overlaysVisible } : void 0,
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
    referenceFiles: a.size > 0 ? Array.from(a.values()) : void 0
  };
}, JM = async (e) => {
  var f, h, p, g, w;
  Ad(), Yt.getState().clear();
  const t = ae.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), Ce.getState().setCamera(e.data.camera);
  const s = se.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (f = e.data.pixelLayers) == null ? void 0 : f.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), W.getState().clear(), Ae.getState().setStacks(((h = e.data.history) == null ? void 0 : h.undoStack) ?? [], ((p = e.data.history) == null ? void 0 : p.redoStack) ?? []);
  const o = zt.getState();
  o.clear();
  const a = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (a.length > 0 && c.length > 0) {
    const M = new Map(c.map((m) => [m.filename, m])), v = await Promise.all(
      a.map(async (m) => {
        const x = M.get(m.filename);
        if (!x)
          return null;
        const S = await ZM(x.data, x.type || m.type), b = Number.isFinite(m.width) ? m.width : S.naturalWidth || S.width, _ = Number.isFinite(m.height) ? m.height : S.naturalHeight || S.height;
        return {
          id: m.id,
          image: S,
          assetFilename: x.filename,
          assetType: x.type || m.type,
          assetData: x.data,
          width: b,
          height: _,
          x: m.x ?? 0,
          y: m.y ?? 0,
          scale: m.scale ?? 1,
          rotation: m.rotation ?? 0,
          flipX: m.flipX ?? !1,
          flipY: m.flipY ?? !1,
          opacity: m.opacity ?? 0.7
        };
      })
    );
    for (const m of v)
      m && o.addReference(m);
    o.setSelected(null);
  }
  Me.getState().setDirty(!1), $.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []), Yt.getState().setAll(((g = e.data.bookmarks) == null ? void 0 : g.items) ?? [], ((w = e.data.bookmarks) == null ? void 0 : w.overlaysVisible) ?? !0);
}, Yp = async (e) => {
  const t = qM(), n = await window.projectApi.save(t, e);
  if (n) {
    const s = Me.getState();
    s.setPath(n), s.setDirty(!1);
  }
  return n;
}, eb = async (e) => {
  Ad();
  const t = await window.projectApi.load(e);
  if (!t)
    return null;
  await JM(t);
  const n = Me.getState();
  return n.setPath(t.path), n.setDirty(!1), t.path;
}, Wx = () => {
  Ad(), Yt.getState().clear(), ae.getState().reset(), Ce.getState().resetCamera(), se.getState().clear(), W.getState().clear(), Ae.getState().clear(), zt.getState().clear(), $.getState().clear();
  const a = Me.getState();
  a.setPath(null), a.setDirty(!1);
}, tb = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, nb = async (e) => {
  var t;
  return (t = window.projectApi) != null && t.read ? window.projectApi.read(e) : (window.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, sb = (e, t) => {
  var f;
  const n = ((f = e.data.palette) == null ? void 0 : f.colors) ?? [], s = ae.getState();
  if (!tb(s.colors, n)) {
    window.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = se.getState(), i = l.activeLayerId, o = Math.trunc(t.offsetX), a = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const h of u)
    if (h.visible !== !1)
      for (const p of h.blocks) {
        const g = p.col * B, w = p.row * B, M = p.data;
        for (let v = 0; v < M.length; v += 1) {
          const m = M[v] ?? 0;
          if (m === 0)
            continue;
          const x = v % B, S = Math.floor(v / B), b = g + x, _ = w + S;
          c.set(`${b}:${_}`, m);
        }
      }
  const d = [];
  for (const [h, p] of c.entries()) {
    const [g, w] = h.split(":"), M = Number(g), v = Number(w), m = M + o, x = v + a, S = l.getPixelInLayer(i, m, x);
    S !== p && d.push({ x: m, y: x, prev: S, next: p });
  }
  qi(d, { label: "Merge Project" });
}, _n = 8, ji = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, lb = (e) => Mt(e), ib = (e) => e.map((t) => lb(t) ?? { r: 0, g: 0, b: 0 }), Xp = (e, t, n) => {
  if (n <= 0)
    return [];
  const s = Array.from(t), l = s.length ? s.reduce(
    (o, a) => {
      const c = e[a];
      return o.r += c.r, o.g += c.g, o.b += c.b, o;
    },
    { r: 0, g: 0, b: 0 }
  ) : { r: 127, g: 127, b: 127 };
  s.length && (l.r /= s.length, l.g /= s.length, l.b /= s.length);
  const i = [];
  for (let o = 0; o < e.length; o += 1)
    t.has(o) || i.push({ idx: o, distance: ji(e[o], l) });
  return i.sort((o, a) => o.distance - a.distance), i.slice(0, n).map((o) => o.idx);
}, Ux = (e, t) => {
  var f;
  const n = ib(t), s = /* @__PURE__ */ new Map();
  for (const h of e.pixels)
    s.set(h.paletteIndex, (s.get(h.paletteIndex) ?? 0) + 1);
  const l = Array.from(s.keys()).filter((h) => h !== 0);
  if (l.length === 0)
    return {
      paletteIndices: [0, 1, 2, 3].filter((h) => h < t.length),
      paletteRgb: n
    };
  let i = l;
  if (l.length > 3) {
    const h = l.map((M) => ({
      idx: M,
      weight: s.get(M) ?? 1,
      color: n[M]
    })), p = [], g = () => {
      let M = -1, v = h[0].idx;
      for (const m of h) {
        const x = m.weight;
        x > M && (M = x, v = m.idx);
      }
      return v;
    };
    for (p.push(g()); p.length < 3; ) {
      let M = h[0].idx, v = -1;
      for (const m of h) {
        if (p.includes(m.idx))
          continue;
        let x = 1 / 0;
        for (const b of p)
          x = Math.min(
            x,
            ji(m.color, n[b])
          );
        const S = x * m.weight;
        S > v && (v = S, M = m.idx);
      }
      p.push(M);
    }
    let w = p;
    for (let M = 0; M < 6; M += 1) {
      const v = /* @__PURE__ */ new Map();
      for (const x of w)
        v.set(x, []);
      for (const x of h) {
        let S = w[0], b = 1 / 0;
        for (const _ of w) {
          const k = ji(x.color, n[_]);
          k < b && (b = k, S = _);
        }
        (f = v.get(S)) == null || f.push(x.idx);
      }
      const m = [];
      for (const [x, S] of v.entries()) {
        if (S.length === 0) {
          m.push(x);
          continue;
        }
        let b = x, _ = 1 / 0;
        for (const k of S) {
          let C = 0;
          for (const A of S) {
            const L = s.get(A) ?? 1;
            C += ji(n[k], n[A]) * L;
          }
          C < _ && (_ = C, b = k);
        }
        m.push(b);
      }
      for (w = Array.from(new Set(m)); w.length < 3; ) {
        const x = Xp(
          n,
          /* @__PURE__ */ new Set([0, ...w]),
          1
        );
        if (x.length === 0)
          break;
        w.push(x[0]);
      }
    }
    i = w;
  }
  const o = /* @__PURE__ */ new Set([0, ...i]), a = Xp(n, o, 4 - o.size);
  for (const h of a)
    o.add(h);
  const c = Array.from(o), u = c.filter((h) => h === 0), d = c.filter((h) => h !== 0).sort((h, p) => {
    const g = (w) => 0.2126 * w.r + 0.7152 * w.g + 0.0722 * w.b;
    return g(n[h]) - g(n[p]);
  });
  return {
    paletteIndices: [...u, ...d].slice(0, 4),
    paletteRgb: n
  };
}, $x = (e, t, n, s) => {
  const l = e.maxX - e.minX + 1, i = e.maxY - e.minY + 1, o = new Float32Array(n * s * 3), a = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let c = 0; c < n * s; c += 1) {
    const u = c * 3;
    o[u] = a.r, o[u + 1] = a.g, o[u + 2] = a.b;
  }
  for (const c of e.pixels) {
    const u = c.x - e.minX, d = c.y - e.minY;
    if (u < 0 || d < 0 || u >= l || d >= i)
      continue;
    const f = t[c.paletteIndex] ?? a, h = (d * n + u) * 3;
    o[h] = f.r, o[h + 1] = f.g, o[h + 2] = f.b;
  }
  return { data: o, width: l, height: i };
}, Vx = (e, t, n, s) => {
  const l = new Uint8Array(t * n), i = new Float32Array(e), o = (c, u, d) => {
    let f = 0, h = 1 / 0;
    for (let p = 0; p < s.length; p += 1) {
      const g = ji({ r: c, g: u, b: d }, s[p]);
      g < h && (h = g, f = p);
    }
    return f;
  }, a = (c, u, d, f, h, p) => {
    if (c < 0 || u < 0 || c >= t || u >= n)
      return;
    const g = (u * t + c) * 3;
    i[g] += d * p, i[g + 1] += f * p, i[g + 2] += h * p;
  };
  for (let c = 0; c < n; c += 1)
    for (let u = 0; u < t; u += 1) {
      const d = (c * t + u) * 3, f = i[d], h = i[d + 1], p = i[d + 2], g = o(f, h, p);
      l[c * t + u] = g;
      const w = s[g], M = f - w.r, v = h - w.g, m = p - w.b;
      a(u + 1, c, M, v, m, 7 / 16), a(u - 1, c + 1, M, v, m, 3 / 16), a(u, c + 1, M, v, m, 5 / 16), a(u + 1, c + 1, M, v, m, 1 / 16);
    }
  return l;
}, Vr = (e) => Math.ceil(e / _n) * _n, Kx = (e, t, n) => {
  const s = t / _n, l = n / _n, i = s * l, o = new Uint8Array(i * _n * 2);
  let a = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const d = u * _n, f = c * _n;
      for (let h = 0; h < _n; h += 1) {
        let p = 0, g = 0;
        for (let w = 0; w < _n; w += 1) {
          const M = (f + h) * t + (d + w), v = e[M] & 3, m = 7 - w;
          p |= (v & 1) << m, g |= (v >> 1 & 1) << m;
        }
        o[a] = p, o[a + 1] = g, a += 2;
      }
    }
  return { data: o, tileCount: i };
}, hi = (e, t, n) => {
  e.setUint16(t, n, !0);
}, ob = (e, t, n) => {
  e.setUint32(t, n, !0);
}, rb = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), i = Math.min(l.length, s - 1);
  for (let o = 0; o < i; o += 1)
    e.setUint8(t + o, l[o]);
  e.setUint8(t + i, 0);
  for (let o = i + 1; o < s; o += 1)
    e.setUint8(t + o, 0);
}, ab = (e, t, n) => {
  const l = 40 + e.length, i = 12 + l, o = new ArrayBuffer(i), a = new DataView(o), c = new Uint8Array(o);
  c.set([71, 66, 79, 48], 0), hi(a, 4, 2), hi(a, 6, 1), ob(a, 8, l);
  let u = 12;
  rb(a, u, "Pixel Splash Studio", 30), u += 30, hi(a, u, _n), u += 2, hi(a, u, _n), u += 2, hi(a, u, t), u += 2;
  for (let d = 0; d < 4; d += 1)
    c[u + d] = n[d] ?? d;
  return u += 4, c.set(e, u), new Uint8Array(o);
}, cb = async () => {
  var p;
  if (!((p = window.projectApi) != null && p.exportGbr))
    return window.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ps();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = ae.getState(), { paletteIndices: n, paletteRgb: s } = Ux(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = Vr(e.maxX - e.minX + 1), i = Vr(e.maxY - e.minY + 1), o = n.map((g) => s[g]), { data: a } = $x(e, s, l, i), c = Vx(a, l, i, o), { data: u, tileCount: d } = Kx(c, l, i), f = ab(u, d, [0, 1, 2, 3]), h = `pixel-splash-selection-${l}x${i}.gbr`;
  return window.projectApi.exportGbr(f, h);
}, ub = async () => {
  var f;
  if (!((f = window.projectApi) != null && f.exportChr))
    return window.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ps();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = ae.getState(), { paletteIndices: n, paletteRgb: s } = Ux(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = Vr(e.maxX - e.minX + 1), i = Vr(e.maxY - e.minY + 1), o = n.map((h) => s[h]), { data: a } = $x(e, s, l, i), c = Vx(a, l, i, o), { data: u } = Kx(c, l, i), d = `pixel-splash-selection-${l}x${i}.chr`;
  return window.projectApi.exportChr(u, d);
}, Gx = () => {
  var e;
  return (e = window.projectApi) != null && e.exportImage ? !0 : (window.alert("Image export is unavailable. Restart the app to load the latest export support."), !1);
}, Bd = async (e) => {
  const t = Ps();
  if (!t)
    return window.alert("Select a region to export."), null;
  if (!Gx())
    return null;
  const { data: n, width: s, height: l } = Dd(t), i = new Uint8Array(n), o = `pixel-splash-selection-${s}x${l}.${e}`;
  return window.projectApi.exportImage(e, { kind: "rgba", width: s, height: l, data: i }, o);
}, db = () => Bd("bmp"), hb = () => Bd("gif"), fb = () => Bd("tga"), pb = async () => {
  const e = Ps();
  if (!e)
    return window.alert("Select a region to export."), null;
  if (!Gx())
    return null;
  let t = 0;
  for (const c of e.pixels)
    c.paletteIndex > t && (t = c.paletteIndex);
  if (t > 255)
    return window.alert("PCX export supports palette indices up to 255."), null;
  const { data: n, width: s, height: l } = XM(e), i = ae.getState().colors, o = new Uint8Array(256 * 3);
  for (let c = 0; c < 256; c += 1) {
    const u = i[c];
    if (!u)
      continue;
    const d = Mt(u);
    if (!d)
      continue;
    const f = c * 3;
    o[f] = d.r, o[f + 1] = d.g, o[f + 2] = d.b;
  }
  const a = `pixel-splash-selection-${s}x${l}.pcx`;
  return window.projectApi.exportImage(
    "pcx",
    { kind: "indexed", width: s, height: l, data: n, palette: o },
    a
  );
}, mn = 320, $n = 200, mb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, gb = (e) => e.map((t) => Mt(t) ?? { r: 0, g: 0, b: 0 }), xb = (e, t, n) => {
  const i = Array.from(e.entries()).sort((o, a) => a[1] - o[1]).map(([o]) => o).filter((o) => o <= n).slice(0, t);
  if (i.length >= t)
    return i;
  for (let o = 0; o <= n && i.length < t; o += 1)
    i.includes(o) || i.push(o);
  return i;
}, yb = (e, t) => {
  if (!e)
    return null;
  const n = new Float32Array(mn * $n * 3), s = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let l = 0; l < mn * $n; l += 1) {
    const i = l * 3;
    n[i] = s.r, n[i + 1] = s.g, n[i + 2] = s.b;
  }
  for (const l of e.pixels) {
    const i = l.x - e.minX, o = l.y - e.minY;
    if (i < 0 || o < 0 || i >= mn || o >= $n)
      continue;
    const a = t[l.paletteIndex] ?? s, c = (o * mn + i) * 3;
    n[c] = a.r, n[c + 1] = a.g, n[c + 2] = a.b;
  }
  return n;
}, vb = (e, t) => {
  const n = new Uint8Array(mn * $n);
  for (let s = 0; s < $n; s += 1)
    for (let l = 0; l < mn; l += 1) {
      const i = (s * mn + l) * 3, o = e[i], a = e[i + 1], c = e[i + 2];
      let u = 0, d = 1 / 0;
      for (let f = 0; f < t.length; f += 1) {
        const h = mb({ r: o, g: a, b: c }, t[f]);
        h < d && (d = h, u = f);
      }
      n[s * mn + l] = u;
    }
  return n;
}, wb = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, Sb = (e) => {
  const n = new Uint8Array(80 * $n);
  for (let s = 0; s < $n; s += 1) {
    const l = (s & 1) * 8192, i = (s >> 1) * 80;
    for (let o = 0; o < mn; o += 4) {
      const a = s * mn + o, c = e[a] & 3, u = e[a + 1] & 3, d = e[a + 2] & 3, f = e[a + 3] & 3, h = c << 6 | u << 4 | d << 2 | f, p = o >> 2;
      n[l + i + p] = h;
    }
  }
  return n;
}, Mb = (e) => {
  const n = 40 * $n, s = new Uint8Array(n * 4);
  for (let l = 0; l < $n; l += 1)
    for (let i = 0; i < mn; i += 1) {
      const o = e[l * mn + i] & 15, a = l * 40 + (i >> 3), c = 7 - (i & 7);
      for (let u = 0; u < 4; u += 1) {
        const d = u * n;
        o & 1 << u && (s[d + a] |= 1 << c);
      }
    }
  return s;
}, bb = (e) => e, Yd = async (e, t, n, s) => {
  var M;
  if (!((M = window.projectApi) != null && M.exportBsave))
    return window.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const l = Ps();
  if (!l)
    return window.alert("Select a region to export."), null;
  const i = ae.getState().colors, o = gb(i), a = /* @__PURE__ */ new Map();
  for (const v of l.pixels)
    a.set(v.paletteIndex, (a.get(v.paletteIndex) ?? 0) + 1);
  const c = o.length - 1, d = (t >= o.length ? o.map((v, m) => m) : xb(a, t, c)).map((v) => o[v]), f = yb(l, o);
  if (!f)
    return null;
  const h = vb(f, d);
  let p;
  e === "cga" ? p = Sb(h) : e === "ega" ? p = Mb(h) : p = bb(h);
  const g = wb(n, 0, p.length), w = new Uint8Array(g.length + p.length);
  return w.set(g, 0), w.set(p, g.length), window.projectApi.exportBsave(w, s);
}, _b = () => Yd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), Tb = () => Yd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), kb = () => Yd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), Cb = (e) => e.trim().toLowerCase(), jb = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, i) => {
    const o = Cb(l), a = t.get(o);
    if (a !== void 0) {
      n[i] = a;
      return;
    }
    const c = s.length;
    t.set(o, c), n[i] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, Pb = () => {
  const e = ae.getState(), t = e.colors, { mapped: n, nextColors: s } = jb(t);
  if (s.length === t.length)
    return !1;
  const l = (h) => Number.isFinite(h) && h >= 0 && h < n.length ? n[h] : 0, i = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(i);
  const o = se.getState(), a = o.exportLayerPayloads().map((h) => ({
    ...h,
    blocks: h.blocks.map(({ row: p, col: g, data: w }) => {
      const M = new Uint8Array(w.length);
      for (let v = 0; v < w.length; v += 1)
        M[v] = l(w[v]);
      return { row: p, col: g, data: M };
    })
  }));
  o.loadLayerPayloads(a, o.activeLayerId);
  const c = W.getState();
  for (const [h, p] of c.pixels.entries()) {
    const g = l(p.paletteIndex);
    g !== p.paletteIndex && c.pixels.set(h, { ...p, paletteIndex: g });
  }
  const u = ot.getState();
  if (u.pixels.length > 0) {
    const h = u.pixels.map((g) => ({
      ...g,
      paletteIndex: l(g.paletteIndex)
    })), p = u.origin ?? { x: 0, y: 0 };
    ot.getState().setBuffer({
      pixels: h,
      origin: p,
      width: u.width,
      height: u.height
    });
  }
  const d = Ae.getState(), f = (h) => ({
    layerId: h.layerId,
    changes: h.changes.map((p) => ({
      ...p,
      prev: l(p.prev),
      next: l(p.next)
    }))
  });
  return d.setStacks(
    d.undoStack.map(f),
    d.redoStack.map(f)
  ), Me.getState().setDirty(!0), !0;
}, Ib = (e, t, n) => e << 16 | t << 8 | n, Nb = (e) => {
  const t = e.palette;
  let n = t ? t.map((o) => Ul({ r: o[0], g: o[1], b: o[2] })) : [];
  if (n.length === 0) {
    let o = 0;
    for (let a = 0; a < e.pixels.length; a += 1)
      e.pixels[a] > o && (o = e.pixels[a]);
    n = Array.from(
      { length: o + 1 },
      (a, c) => Ul({ r: c, g: c, b: c })
    );
  }
  let s = null;
  if (typeof e.transparentIndex == "number" && e.transparentIndex > 0 && e.transparentIndex < n.length) {
    s = e.transparentIndex;
    const o = n[0];
    n[0] = n[s], n[s] = o;
  }
  const l = [], i = e.width;
  for (let o = 0; o < e.pixels.length; o += 1) {
    const a = e.pixels[o];
    let c = a;
    if (s !== null ? a === s ? c = 0 : a === 0 && (c = s) : typeof e.transparentIndex == "number" && a === e.transparentIndex && (c = 0), c === 0)
      continue;
    const u = o % i, d = Math.floor(o / i);
    l.push({ x: u, y: d, paletteIndex: c });
  }
  return { paletteColors: n, pixels: l };
}, Eb = (e) => {
  const t = [], n = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] !== 0)
      continue;
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2];
    t[0] = Ul({ r: a, g: c, b: u });
    break;
  }
  t[0] || (t[0] = "#000000");
  const s = [], l = e.width;
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] === 0)
      continue;
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2], d = Ib(a, c, u);
    let f = n.get(d);
    f === void 0 && (f = t.length, t.push(Ul({ r: a, g: c, b: u })), n.set(d, f));
    const h = i / 4, p = h % l, g = Math.floor(h / l);
    s.push({ x: p, y: g, paletteIndex: f });
  }
  return { paletteColors: t, pixels: s };
}, Rb = (e) => {
  const t = ae.getState(), n = se.getState(), s = xe.getState(), l = ot.getState();
  if (Wx(), e.colorType === "indexed") {
    const i = Nb(e), o = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(o, 0, Math.min(1, Math.max(0, o.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  } else {
    const i = Eb(e), o = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(o, 0, Math.min(1, Math.max(0, o.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  }
  s.clear(), l.clear(), Me.getState().setDirty(!0);
}, Ab = (e) => {
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
}, Ec = (e) => e.toString(16).padStart(2, "0"), Lb = (e) => `#${Ec(e.r)}${Ec(e.g)}${Ec(e.b)}`, Fp = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Db = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(mx)) === "true";
  } catch {
    return !1;
  }
}, Qx = (e) => {
  const t = ga(e), n = Math.floor(t.minX / P), s = Math.floor(t.minY / P), l = Math.ceil(t.maxX / P), i = Math.ceil(t.maxY / P), o = Math.max(0, l - n), a = Math.max(0, i - s);
  if (o === 0 || a === 0)
    return null;
  const c = o * a;
  if ((o > mc || a > mc || c > Zf) && !Db()) {
    const m = `Reference trace is too large (${o}x${a}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${mx}"]="true" to override.`;
    return typeof window < "u" && window.alert(m), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
      width: o,
      height: a,
      pixelCount: c,
      maxDimension: mc,
      maxPixels: Zf
    }), null;
  }
  const d = document.createElement("canvas");
  d.width = o, d.height = a;
  const f = d.getContext("2d", { willReadFrequently: !0 });
  if (!f)
    return null;
  f.imageSmoothingEnabled = !1;
  const h = Zn(e), p = h.centerX / P, g = h.centerY / P, w = h.baseWidth / P, M = h.baseHeight / P;
  f.save(), f.translate(p - n, g - s), f.rotate(h.rotationRad), f.scale(h.scale * h.flipX, h.scale * h.flipY), f.drawImage(
    e.image,
    -w / 2,
    -M / 2,
    w,
    M
  ), f.restore();
  const v = f.getImageData(0, 0, o, a);
  return {
    width: o,
    height: a,
    offsetX: n,
    offsetY: s,
    data: v.data
  };
}, Bb = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const i = Mt(l);
    i && n.push({ paletteIndex: s, rgb: i });
  }
  return n;
}, Yb = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, Bw);
  for (let i = 0; i < e.length; i += 4) {
    if (e[i + 3] < px)
      continue;
    const o = Math.min(255, Math.round(e[i] / s) * s), a = Math.min(255, Math.round(e[i + 1] / s) * s), c = Math.min(255, Math.round(e[i + 2] / s) * s), u = `${o},${a},${c}`, d = n.get(u);
    d ? d.count += 1 : n.set(u, { rgb: { r: o, g: a, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((i, o) => o.count - i.count).slice(0, t).map((i) => i.rgb);
}, Xb = (e) => {
  const t = ae.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((o, a) => {
    s.set(o.toLowerCase(), a);
  });
  const l = [], i = [];
  for (const o of e) {
    const a = Lb(o), c = a.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(a), s.set(c, u)), i.push({ paletteIndex: u, rgb: o });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), i;
}, Zx = (e, t) => {
  if (t.length === 0)
    return;
  const n = se.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.height; i += 1)
    for (let o = 0; o < e.width; o += 1) {
      const a = (i * e.width + o) * 4;
      if (e.data[a + 3] < px)
        continue;
      const u = e.data[a], d = e.data[a + 1], f = e.data[a + 2], h = `${u},${d},${f}`;
      let p = l.get(h);
      if (p === void 0) {
        const v = { r: u, g: d, b: f };
        let m = t[0], x = Fp(v, m.rgb);
        for (let S = 1; S < t.length; S += 1) {
          const b = t[S], _ = Fp(v, b.rgb);
          _ < x && (x = _, m = b);
        }
        p = m.paletteIndex, l.set(h, p);
      }
      const g = e.offsetX + o, w = e.offsetY + i, M = n.getPixel(g, w);
      M !== p && s.push({ x: g, y: w, prev: M, next: p });
    }
  s.length !== 0 && qi(s, { label: "Reference Trace" });
}, Fb = (e, t) => {
  const n = ae.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((a) => Math.round(a)).filter((a) => Number.isFinite(a)).filter((a) => a >= 0 && a < n.length).sort((a, c) => a - c);
  if (l.length === 0)
    return;
  const i = Bb(n, l);
  if (i.length === 0)
    return;
  const o = Qx(e);
  o && Zx(o, i);
}, Ob = (e, t) => {
  const n = Qx(e);
  if (!n)
    return;
  const s = Math.max(
    Cu,
    Math.min(t, ju)
  ), l = Yb(n.data, s);
  if (l.length === 0)
    return;
  const i = Xb(l);
  Zx(n, i);
}, xi = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), Ys = (e, t, n) => {
  const s = xi(e.x, 0, Math.max(0, t - 1)), l = xi(e.y, 0, Math.max(0, n - 1)), i = xi(e.width, 1, Math.max(1, t - s)), o = xi(e.height, 1, Math.max(1, n - l));
  return { x: s, y: l, width: i, height: o };
}, Rc = (e, t, n, s) => {
  const l = Ys(s, t, n), i = new Uint8Array(l.width * l.height);
  for (let o = 0; o < l.height; o += 1) {
    const c = (l.y + o) * t + l.x, u = o * l.width;
    i.set(e.subarray(c, c + l.width), u);
  }
  return { pixels: i, width: l.width, height: l.height };
}, Op = (e, t, n, s) => {
  const l = xi(s, 1, 8);
  if (l === 1)
    return { pixels: e, width: t, height: n };
  const i = t * l, o = n * l, a = new Uint8Array(i * o);
  for (let c = 0; c < o; c += 1) {
    const u = Math.floor(c / l);
    for (let d = 0; d < i; d += 1) {
      const f = Math.floor(d / l);
      a[c * i + d] = e[u * t + f] ?? 0;
    }
  }
  return { pixels: a, width: i, height: o };
}, zb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, zp = (e, t) => {
  const n = t.map((i) => Mt(i) ?? { r: 0, g: 0, b: 0 }), s = /* @__PURE__ */ new Map();
  s.set(0, 0);
  const l = n.length > 1 ? Array.from({ length: n.length - 1 }, (i, o) => o + 1) : [0];
  for (let i = 1; i < e.length; i += 1) {
    const o = e[i];
    if (!o)
      continue;
    const a = { r: o[0], g: o[1], b: o[2] };
    let c = l[0] ?? 0, u = Number.POSITIVE_INFINITY;
    for (const d of l) {
      const f = zb(a, n[d] ?? n[0]);
      f < u && (u = f, c = d);
    }
    s.set(i, c);
  }
  return s;
}, Hp = (e, t, n) => {
  const s = t.slice(), l = /* @__PURE__ */ new Map();
  l.set(0, 0);
  const i = /* @__PURE__ */ new Set([0]), o = (a, c) => {
    for (let d = 1; d < s.length; d += 1)
      if (!(n.has(d) || i.has(d))) {
        i.add(d), s[d] = c, l.set(a, d);
        return;
      }
    const u = s.length;
    s.push(c), i.add(u), l.set(a, u);
  };
  for (let a = 1; a < e.length; a += 1)
    o(a, e[a] ?? "#000000");
  return { map: l, palette: s };
}, qo = (e, t) => {
  const n = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s += 1) {
    const l = e[s] ?? 0;
    n[s] = t.get(l) ?? 0;
  }
  return n;
}, Wp = (e, t) => {
  if (e && e.length > 0)
    return e.map((s) => Ul({ r: s[0], g: s[1], b: s[2] }));
  if (!t)
    return ["#000000"];
  let n = 0;
  for (let s = 0; s < t.length; s += 1) {
    const l = t[s] ?? 0;
    l > n && (n = l);
  }
  return Array.from({ length: n + 1 }, (s, l) => Ul({ r: l, g: l, b: l }));
}, Hb = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), i = s.map((o) => Mt(o) ?? { r: 0, g: 0, b: 0 });
  for (let o = 0; o < e.length; o += 1) {
    const a = e[o] ?? 0, c = i[a] ?? i[0], u = o * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = a === 0 ? 0 : 255;
  }
  return l;
}, On = (e, t, n) => Math.min(n, Math.max(t, e)), ml = (e) => e === "tile-pen" || e === "tile-stamp" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", Wb = (e) => e === "tile-sampler" || ml(e), Ub = (e) => e === "selection-rect" || e === "selection-oval" || e === "selection-lasso" || e === "magic-wand" || e === "texture-roll", Ll = 0, Kr = 100, Xd = Math.log10(Zs), $b = Math.log10(Wl), Bu = $b - Xd, Up = 72, $p = 360, Vb = 32, Kb = (e) => {
  const t = On(e, Zs, Wl), n = Bu === 0 ? 0 : (Math.log10(t) - Xd) / Bu;
  return Math.round(
    Ll + n * (Kr - Ll)
  );
}, Gb = (e) => {
  const t = (On(e, Ll, Kr) - Ll) / (Kr - Ll), n = Xd + t * Bu;
  return Math.pow(10, n);
}, Qb = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, on = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), Vp = (e) => {
  if (e < 1024)
    return `${e}B`;
  const t = e / 1024;
  if (t < 1024)
    return `${t.toFixed(t < 10 ? 1 : 0)}KB`;
  const n = t / 1024;
  return n < 1024 ? `${n.toFixed(n < 10 ? 1 : 0)}MB` : `${(n / 1024).toFixed(1)}GB`;
}, Kp = (e) => e.reduce((t, n) => t + n.block.byteLength, 0), Gp = (e) => {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" ? !0 : e.isContentEditable;
}, Zb = () => {
  const t = se.getState().layers.reduce(
    (M, v) => M + Kp(v.store.getBlocks()),
    0
  ), n = Kp(xe.getState().store.getBlocks()), s = W.getState().pixels.size * qf, l = ot.getState().pixels.length * qf, i = zt.getState().items.reduce((M, v) => M + v.width * v.height * 4, 0), o = Ae.getState();
  let a = 0;
  for (const M of o.undoStack)
    a += M.changes.length;
  for (const M of o.redoStack)
    a += M.changes.length;
  const c = a * Xw, d = ae.getState().colors.reduce((M, v) => M + v.length * 2, 0) + Ed * 2, f = {
    tool: on(jt.getState()),
    brush: on(pn.getState()),
    spray: on(Gt.getState()),
    rectangle: on(Fr.getState()),
    oval: on(Or.getState()),
    selection: on($l.getState()),
    fill: on(wt.getState()),
    stamp: on(Ge.getState()),
    viewport: on(Ce.getState()),
    layers: on(Re.getState()),
    project: on(Me.getState()),
    referenceHandle: on(Wr.getState())
  }, h = Qb(f), p = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: i },
    { label: "hist", bytes: c },
    { label: "pal", bytes: d },
    { label: "ui", bytes: h }
  ], g = p.reduce((M, v) => M + v.bytes, 0), w = p.filter((M) => M.bytes > 0).map((M) => `${M.label} ${Vp(M.bytes)}`);
  return `Mem ${Vp(g)}${w.length ? ` • ${w.join(" • ")}` : ""}`;
}, qb = () => {
  const e = QM(), t = Ae((y) => y.undo), n = Ae((y) => y.redo), s = xe((y) => y.selectedCount), l = Me((y) => y.path), i = Me((y) => y.dirty), [o, a] = T.useState(!1), [c, u] = T.useState(!1), [d, f] = T.useState(!1), [h, p] = T.useState(!1), [g, w] = T.useState(!0), [M, v] = T.useState(!1), [m, x] = T.useState("pen"), [S, b] = T.useState(""), [_, k] = T.useState("monospace"), [C, A] = T.useState(16), [L, Y] = T.useState(!1), [j, O] = T.useState("pen"), [G, oe] = T.useState(""), [Q, te] = T.useState(!1), [D, F] = T.useState(null), [K, le] = T.useState(null), [re, Se] = T.useState(0), [X, ie] = T.useState(0), [ge, z] = T.useState(!1), [Z, I] = T.useState(null), [U, ee] = T.useState([]), [de, Ze] = T.useState(2), [_e, Fe] = T.useState("nearest"), [Oe, st] = T.useState(0), Ie = 32, he = 2, [pt, Ue] = T.useState(!0), [It, tn] = T.useState(!1), [yt, Pn] = T.useState(""), [Jn, In] = T.useState(96), [nn, nl] = T.useState(220), Nn = Lu((y) => y.isRecording), En = Lu((y) => y.setIsRecording), fe = jt((y) => y.activeTool), ye = jt((y) => y.setActiveTool), rt = Js((y) => y.mode), $e = Js((y) => y.setMode), vn = Re((y) => y.showReferenceLayer), es = Re((y) => y.showPixelLayer), N = Re((y) => y.showTileLayer), R = Re((y) => y.showPixelGrid), q = Re((y) => y.showTileGrid), ue = Re((y) => y.showAxes), je = Re((y) => y.setShowReferenceLayer), Nt = Re((y) => y.setShowPixelLayer), sn = Re((y) => y.setShowTileLayer), Is = Re((y) => y.setShowPixelGrid), Ns = Re((y) => y.setShowTileGrid), Xn = Re((y) => y.setShowAxes), $t = $((y) => y.tileSets), ts = $((y) => y.tileMaps), Ji = $((y) => y.activeTileSetId), Jx = $((y) => y.activeTileMapId), ey = $((y) => y.selectedTileIndex), Fd = $((y) => y.selectedTileIndices), Ql = $((y) => y.tilePage), ty = $((y) => y.tilePageCount), eo = $((y) => y.setTilePage), Es = $((y) => y.tilePickerZoom), Od = $((y) => y.setTilePickerZoom), zd = $((y) => y.tilePlacementMode), Hd = $((y) => y.setTilePlacementMode), Wd = $((y) => y.tilePenSnapToCluster), Ud = $((y) => y.setTilePenSnapToCluster), $d = $((y) => y.setActiveTileSet), Vd = $((y) => y.setTileSetLayout), Kd = $((y) => y.addTileSet), Gd = $((y) => y.duplicateTileSet), Qd = $((y) => y.renameTileSet), Zd = $((y) => y.deleteTileSet), qd = $((y) => y.deleteTilesFromSet), ny = pn((y) => y.size), Jd = pn((y) => y.shape), eh = Gt((y) => y.radius), th = Gt((y) => y.density), nh = Gt((y) => y.falloff), sh = Fr((y) => y.mode), lh = Fr((y) => y.setMode), ih = Or((y) => y.mode), oh = Or((y) => y.setMode), to = $l((y) => y.snap), no = $l((y) => y.setSnap), rh = wt((y) => y.mode), ah = wt((y) => y.setMode), so = wt((y) => y.gradientDirection), lo = wt((y) => y.setGradientDirection), io = wt((y) => y.gradientDither), oo = wt((y) => y.setGradientDither), xa = ae((y) => y.selectedIndices), ro = xa.length, sy = ae((y) => y.getActiveIndex()), ao = Ge((y) => y.mode), sl = Ge((y) => y.snap), ly = Ge((y) => y.rotation), iy = Ge((y) => y.scale), ch = Ge((y) => y.flipX), uh = Ge((y) => y.flipY), co = Ge((y) => y.drag), ya = Ge((y) => y.pasteDuplicateColors), dh = $((y) => y.tileDebugOverlay), va = $((y) => y.setTileDebugOverlay), oy = $((y) => y.nineSlice), ry = $((y) => y.selectedTileCols), ay = $((y) => y.selectedTileRows), wa = zt((y) => y.removeReference), uo = Te.useRef(!1), ll = T.useRef(null), hh = T.useRef(null), Zl = T.useRef(null), Ee = 8, il = Z ? Math.floor(Z.width / Ee) : 0, Rs = Z ? Math.floor(Z.height / Ee) : 0, ho = Math.max(1, Math.ceil(Rs / Ie)), fo = Math.min(Math.max(0, Oe), Math.max(0, ho - 1)), fh = fo * Ie, ql = U[U.length - 1] ?? null;
  T.useEffect(() => {
    const y = window.setTimeout(() => {
      w(!1);
    }, 2e3);
    return () => window.clearTimeout(y);
  }, []), T.useEffect(() => {
    var ne, Pe, Ne, Ye;
    const y = document.documentElement, E = (at) => {
      const Ve = Number.isFinite(at) && at > 0 ? at : 1;
      y.style.setProperty("--ui-scale", String(Ve));
    };
    E(((Pe = (ne = window.uiScaleApi) == null ? void 0 : ne.getScale) == null ? void 0 : Pe.call(ne)) ?? 1);
    const V = (Ye = (Ne = window.uiScaleApi) == null ? void 0 : Ne.onScaleChange) == null ? void 0 : Ye.call(Ne, E);
    return () => {
      V && V();
    };
  }, []), T.useEffect(() => {
    var y;
    if ((y = window.paletteApi) != null && y.onApply)
      return window.paletteApi.onApply((E) => {
        const V = Array.isArray(E.colors) ? E.colors : [];
        if (V.length === 0)
          return;
        const ne = ae.getState();
        ne.setPalette(V), ne.setSelectedIndices([]), Me.getState().setDirty(!0);
      });
  }, []);
  const ph = Ge((y) => y.setMode), po = Ge((y) => y.setSnap), cy = Ge((y) => y.setRotation), uy = Ge((y) => y.setScale), dy = Ge((y) => y.setFlipX), hy = Ge((y) => y.setFlipY), mh = Ge((y) => y.setDrag), fy = Ge(
    (y) => y.setPasteDuplicateColors
  ), Sa = pn((y) => y.setSize), Ma = pn((y) => y.setShape), gh = Gt((y) => y.setRadius), xh = Gt((y) => y.setDensity), yh = Gt((y) => y.setFalloff), ba = Te.useRef("pen"), _a = Te.useRef("tile-pen");
  T.useEffect(() => {
    if (ml(fe)) {
      _a.current = fe;
      return;
    }
    ba.current = fe;
  }, [fe]);
  const Ta = T.useCallback(
    (y) => {
      if (y === "tile" && (!h || e))
        return;
      if ($e(y), y === "tile") {
        const V = ml(_a.current) ? _a.current : "tile-pen";
        ye(V);
        return;
      }
      const E = ml(ba.current) ? "pen" : ba.current;
      ye(E);
    },
    [h, e, ye, $e]
  ), mo = T.useCallback(
    (y) => {
      if (ml(y)) {
        if (!h || e)
          return;
        $e("tile");
      } else Ub(y) && rt === "tile" && h && !e ? $e("tile") : $e("pixel");
      if (y === "selection-lasso") {
        ye("selection-lasso"), Sa(1), Ma("round");
        return;
      }
      if (y === "text") {
        x((E) => fe === "text" ? E : fe), ye("text"), v(!0);
        return;
      }
      if (y === "ai") {
        O((E) => fe === "ai" ? E : fe), ye("ai"), Y(!0);
        return;
      }
      ye(y);
    },
    [
      fe,
      h,
      e,
      ye,
      Ma,
      Sa,
      $e,
      rt
    ]
  ), ns = ae((y) => y.colors), ol = Wr((y) => y.snap), go = Wr((y) => y.setSnap), vh = zt((y) => y.setSelected), Be = zt(
    (y) => y.selectedId ? y.items.find((E) => E.id === y.selectedId) ?? null : null
  ), py = zt((y) => y.updateReference), [ka, my] = T.useState(Yw), Ca = Gw(), ce = $t.find((y) => y.id === Ji) ?? $t[0], wh = ts.find((y) => y.id === Jx) ?? ts[0], As = Te.useMemo(() => {
    const y = new Set(Fd.filter((E) => E >= 0));
    return Array.from(y).sort((E, V) => E - V);
  }, [Fd]), ja = T.useCallback(
    (y) => {
      Number.isFinite(y) && Od(y);
    },
    [Od]
  ), Pa = Math.max(1, ty), Ia = Math.min(Ql, Pa - 1), gy = T.useCallback(() => {
    eo(Ql - 1);
  }, [eo, Ql]), xy = T.useCallback(() => {
    eo(Ql + 1);
  }, [eo, Ql]), Sh = T.useCallback(
    (y, E) => {
      ce && (!Number.isFinite(y) || !Number.isFinite(E) || Vd(ce.id, y, E));
    },
    [ce, Vd]
  ), yy = T.useCallback(() => {
    const y = (ce == null ? void 0 : ce.tileWidth) ?? me, E = (ce == null ? void 0 : ce.tileHeight) ?? me;
    Kd({
      name: `Tile Set ${$t.length + 1}`,
      tileWidth: y,
      tileHeight: E,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [ce, Kd, $t.length]), vy = T.useCallback(() => {
    ce && Gd(ce.id);
  }, [ce, Gd]), wy = T.useCallback(() => {
    if (!ce)
      return;
    const y = ce.name, E = window.prompt("Rename tile set", y);
    if (typeof E != "string")
      return;
    const V = E.trim();
    !V || V === y || Qd(ce.id, V);
  }, [ce, Qd]), Sy = T.useCallback(() => {
    if (!ce)
      return;
    const y = ts.filter((V) => V.tileSetId === ce.id).length, E = y > 0 ? `Delete ${ce.name}? This will also delete ${y} linked tile map${y === 1 ? "" : "s"}.` : `Delete ${ce.name}?`;
    window.confirm(E) && Zd(ce.id);
  }, [ce, Zd, ts]), My = T.useCallback(() => {
    if (!ce || As.length === 0)
      return;
    const y = As.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${As.length} ${y} from ${ce.name}? This cannot be undone.`
    ) && qd(ce.id, As);
  }, [ce, qd, As]), _t = rt === "tile" && h && !e, by = _t ? nn : Jn, Na = Te.useRef("palette"), Ea = Te.useRef(!1);
  T.useEffect(() => {
    _t && (to !== "tile" && no("tile"), sl !== "tile" && po("tile"), ol !== "tile" && go("tile"));
  }, [
    _t,
    ol,
    to,
    go,
    no,
    po,
    sl
  ]);
  const xo = T.useCallback(
    (y) => {
      const E = Math.max(16, y.tileWidth * Es), V = Math.max(1, y.rows) * E;
      return On(
        V + Vb,
        Up,
        $p
      );
    },
    [Es]
  ), _y = T.useCallback(
    (y) => {
      $d(y);
      const E = $t.find((V) => V.id === y);
      E && nl(xo(E));
    },
    [xo, $d, $t]
  );
  T.useEffect(() => {
    if (!_t || !Ji)
      return;
    const y = $t.find((E) => E.id === Ji);
    y && nl(xo(y));
  }, [
    _t,
    Ji,
    xo,
    $t
  ]);
  const Ty = (y) => {
    y.preventDefault(), y.currentTarget.setPointerCapture(y.pointerId), Na.current = _t ? "tile" : "palette", Ea.current = !0;
  };
  T.useEffect(() => {
    const y = (V) => {
      if (!Ea.current)
        return;
      const ne = document.documentElement.clientHeight, Pe = Math.max(
        Up,
        Math.min($p, ne - V.clientY)
      );
      Na.current === "tile" ? nl(Pe) : In(Pe);
    }, E = () => {
      Na.current = _t ? "tile" : "palette", Ea.current = !1;
    };
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", E), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", E);
    };
  }, [_t]);
  const ky = (pt ? 0 : 324) + 24;
  T.useEffect(() => {
    if (e) {
      p(!1);
      return;
    }
    let y = !1;
    return (async () => {
      try {
        const V = await window.optionsApi.getAdvancedMode();
        y || p(!!V);
      } catch {
      }
    })(), () => {
      y = !0;
    };
  }, [e]), T.useEffect(() => {
    fe !== "reference-handle" && vh(null);
  }, [fe, vh]), T.useEffect(() => {
    !h && ml(fe) && (ye("pen"), $e("pixel"));
  }, [h, fe, ye, $e]), T.useEffect(() => {
    rt === "tile" && (!h || e) && $e("pixel");
  }, [h, e, $e, rt]), T.useEffect(() => {
    e && fe === "ai" && ye("pen");
  }, [fe, e, ye]);
  const yo = Te.useCallback(async () => (e || await Yp(l ?? void 0), null), [e, l]), Mh = Te.useCallback(async () => (e || await Yp(void 0), null), [e]), vo = Te.useCallback(async () => {
    if (e)
      return null;
    if (!(i && !window.confirm("You have unsaved changes. Continue?")))
      return await eb(void 0), null;
  }, [e, i]), wo = Te.useCallback(() => {
    i && !window.confirm("You have unsaved changes. Continue?") || Wx();
  }, [i]), So = Te.useCallback(() => {
    a(!0);
  }, [a]), bh = Te.useCallback(async () => {
    var y;
    if (!(e || Nn)) {
      if (!((y = window.recordingApi) != null && y.start)) {
        window.alert("Recording is unavailable. Restart the app to load the latest recording support.");
        return;
      }
      try {
        const E = await window.recordingApi.start();
        En(!0), window.alert(`Recording started.
Frames will be saved to:
${E.frameDir}`);
      } catch (E) {
        const V = E instanceof Error ? E.message : "Unable to start recording.";
        window.alert(V);
      }
    }
  }, [e, Nn, En]), _h = Te.useCallback(async () => {
    var y;
    if (!(!Nn || !((y = window.recordingApi) != null && y.stop)))
      try {
        const E = await window.recordingApi.stop(12);
        if (En(!1), !E) {
          window.alert("No active recording session.");
          return;
        }
        if (E.canceled) {
          window.alert(
            `Recording stopped. Video export was canceled.
Frames are still available at:
${E.frameDir}`
          );
          return;
        }
        if (!E.videoPath) {
          window.alert(`Recording stopped with no frames captured.
Frames directory:
${E.frameDir}`);
          return;
        }
        window.alert(`Recording saved.
Video:
${E.videoPath}

Frames:
${E.frameDir}`);
      } catch (E) {
        En(!1);
        const V = E instanceof Error ? E.message : "Unable to stop recording.";
        window.alert(V);
      }
  }, [Nn, En]), Th = T.useCallback(async () => {
    const y = await nb();
    y && (le(y), F(y.path ?? null), Se(0), ie(0), te(!0));
  }, []), kh = T.useCallback(async () => {
    var V;
    if (!((V = window.projectApi) != null && V.importImage)) {
      window.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const y = await window.projectApi.importImage();
    if (!y)
      return;
    if (!(y.format === "nes" || y.format === "gb" || y.format === "gbc" || y.format === "chr")) {
      (y.width > 512 || y.height > 512) && window.alert("Large images (over 512x512) can take a while to load."), Rb(y);
      return;
    }
    if (y.colorType !== "indexed") {
      window.alert("ROM import preview requires indexed pixels.");
      return;
    }
    I(y), ee([
      {
        x: 0,
        y: 0,
        width: Math.floor(y.width / Ee),
        height: Math.floor(y.height / Ee)
      }
    ]), Ze(2), Fe("nearest"), st(0), z(!0);
  }, []), Mo = T.useCallback(() => {
    z(!1), I(null), ee([]), Zl.current = null;
  }, []), bo = T.useCallback(
    (y) => {
      Z && ee((E) => {
        if (E.length === 0)
          return E;
        const V = E.slice(), ne = V[V.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return V[V.length - 1] = Ys({ ...ne, ...y }, il, Rs), V;
      });
    },
    [Z, il, Rs]
  ), _o = T.useCallback(() => {
    const y = se.getState(), E = /* @__PURE__ */ new Set();
    for (const V of y.layers)
      for (const ne of V.store.getBlocks())
        for (let Pe = 0; Pe < ne.block.length; Pe += 1) {
          const Ne = ne.block[Pe] ?? 0;
          Ne !== 0 && E.add(Ne);
        }
    return E;
  }, []), Cy = T.useCallback(() => {
    if (!Z || U.length === 0)
      return;
    if (!Z.palette) {
      window.alert("ROM palette is missing.");
      return;
    }
    const y = U.map((ve) => Ys(ve, il, Rs)).filter((ve) => ve.width > 0 && ve.height > 0);
    if (y.length === 0) {
      window.alert("Select at least one region.");
      return;
    }
    const E = Wp(Z.palette, Z.pixels), V = y.map((ve) => {
      const ut = Ys(
        {
          x: ve.x * Ee,
          y: ve.y * Ee,
          width: ve.width * Ee,
          height: ve.height * Ee
        },
        Z.width,
        Z.height
      ), Bt = Rc(
        Z.pixels,
        Z.width,
        Z.height,
        ut
      );
      return Op(Bt.pixels, Bt.width, Bt.height, de);
    }), ne = Ee * de, Pe = Math.max(Ee * de * 32, 512);
    let Ne = 0, Ye = 0, at = 0;
    const Ve = [];
    for (const ve of V) {
      const ut = ve.width, Bt = ve.height;
      Ne > 0 && Ne + ut > Pe && (Ne = 0, Ye += at + ne, at = 0), Ve.push({ x: Ne, y: Ye, w: ut, h: Bt, pixels: ve.pixels }), Ne += ut + ne, at = Math.max(at, Bt);
    }
    const ze = Ve.length === 0 ? 1 : Math.max(...Ve.map((ve) => ve.x + ve.w)), mt = Ve.length === 0 ? 1 : Math.max(...Ve.map((ve) => ve.y + ve.h)), ct = new Uint8Array(ze * mt);
    for (const ve of Ve)
      for (let ut = 0; ut < ve.h; ut += 1)
        for (let Bt = 0; Bt < ve.w; Bt += 1)
          ct[(ve.y + ut) * ze + (ve.x + Bt)] = ve.pixels[ut * ve.w + Bt] ?? 0;
    const Et = ae.getState(), ss = _o();
    let ln;
    if (_e === "unused") {
      const ve = Hp(E, Et.colors, ss);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Et.setPalette(ve.palette), Et.setSelectedIndices([]), ln = qo(ct, ve.map);
    } else {
      const ve = zp(Z.palette, Et.colors);
      ln = qo(ct, ve);
    }
    const ei = [];
    for (let ve = 0; ve < ln.length; ve += 1) {
      const ut = ln[ve] ?? 0;
      ut !== 0 && ei.push({ x: ve % ze, y: Math.floor(ve / ze), paletteIndex: ut });
    }
    ot.getState().setBuffer({
      pixels: ei,
      origin: { x: 0, y: 0 },
      width: ze,
      height: mt
    }), Ge.getState().setSnap("tile"), Ge.getState().setScale(1), jt.getState().setActiveTool("stamp"), Mo();
  }, [
    Mo,
    _o,
    _e,
    Z,
    de,
    U,
    il,
    Rs
  ]);
  T.useEffect(() => {
    const y = U[U.length - 1] ?? null;
    if (!ge || !Z || !y)
      return;
    const E = ll.current, V = hh.current;
    if (!E || !V)
      return;
    const ne = Wp(Z.palette, Z.pixels), Pe = Math.floor(Z.width / Ee), Ne = Math.floor(Z.height / Ee), Ye = Math.max(1, Math.ceil(Ne / Ie)), Ve = Math.min(Math.max(0, Oe), Ye - 1) * Ie, ze = Math.min(Ie, Math.max(0, Ne - Ve)), mt = Rc(Z.pixels, Z.width, Z.height, {
      x: 0,
      y: Ve * Ee,
      width: Pe * Ee,
      height: ze * Ee
    }), ct = U.map((pe) => Ys(pe, Pe, Ne)).filter((pe) => pe.width > 0 && pe.height > 0), Et = ct.map((pe) => {
      const Ke = Ys(
        {
          x: pe.x * Ee,
          y: pe.y * Ee,
          width: pe.width * Ee,
          height: pe.height * Ee
        },
        Z.width,
        Z.height
      ), lt = Rc(
        Z.pixels,
        Z.width,
        Z.height,
        Ke
      ), cl = Op(lt.pixels, lt.width, lt.height, de);
      return { rect: pe, scaled: cl };
    }), ss = (pe, Ke, lt, cl, Da, Ba) => {
      const Co = Math.max(1, Math.trunc(Ba)), ul = document.createElement("canvas");
      ul.width = Ke, ul.height = lt;
      const Dh = ul.getContext("2d");
      if (!Dh)
        return;
      const Ry = Hb(cl, Ke, lt, Da);
      Dh.putImageData(new ImageData(Ry, Ke, lt), 0, 0), pe.width = Ke * Co, pe.height = lt * Co;
      const jo = pe.getContext("2d");
      jo && (jo.imageSmoothingEnabled = !1, jo.clearRect(0, 0, pe.width, pe.height), jo.drawImage(ul, 0, 0, pe.width, pe.height));
    };
    ss(
      E,
      mt.width,
      mt.height,
      mt.pixels,
      ne,
      he
    );
    const ln = E.getContext("2d");
    if (ln) {
      ln.save(), ln.imageSmoothingEnabled = !1, ln.strokeStyle = "rgba(255, 74, 100, 0.95)", ln.lineWidth = 1;
      for (const pe of ct) {
        const Ke = pe.y - Ve;
        if (Ke + pe.height <= 0 || Ke >= ze)
          continue;
        const lt = Math.max(0, Ke), cl = Math.min(ze, Ke + pe.height) - lt;
        if (cl <= 0)
          continue;
        const Da = pe.x * Ee * he, Ba = lt * Ee * he, Co = pe.width * Ee * he, ul = cl * Ee * he;
        ln.strokeRect(Da + 0.5, Ba + 0.5, Co - 1, ul - 1);
      }
      ln.restore();
    }
    const ei = Ee * de, ve = Math.max(Ee * de * 32, 512);
    let ut = 0, Bt = 0, To = 0;
    const al = [];
    for (const pe of Et) {
      const Ke = pe.scaled.width, lt = pe.scaled.height;
      ut > 0 && ut + Ke > ve && (ut = 0, Bt += To + ei, To = 0), al.push({ x: ut, y: Bt, w: Ke, h: lt, pixels: pe.scaled.pixels }), ut += Ke + ei, To = Math.max(To, lt);
    }
    const Ra = al.length === 0 ? 1 : Math.max(...al.map((pe) => pe.x + pe.w)), Lh = al.length === 0 ? 1 : Math.max(...al.map((pe) => pe.y + pe.h)), ko = new Uint8Array(Ra * Lh);
    for (const pe of al)
      for (let Ke = 0; Ke < pe.h; Ke += 1)
        for (let lt = 0; lt < pe.w; lt += 1)
          ko[(pe.y + Ke) * Ra + (pe.x + lt)] = pe.pixels[Ke * pe.w + lt] ?? 0;
    let Aa = ko, La = ns;
    if (_e === "nearest") {
      const pe = Z.palette;
      if (!pe)
        return;
      const Ke = zp(pe, ns);
      Aa = qo(ko, Ke), La = ns;
    } else {
      const pe = _o(), { map: Ke, palette: lt } = Hp(ne, ns, pe);
      Aa = qo(ko, Ke), La = lt;
    }
    ss(V, Ra, Lh, Aa, La, 2);
  }, [
    _o,
    ns,
    ge,
    _e,
    Z,
    Oe,
    de,
    U
  ]), T.useEffect(() => {
    const y = (E) => {
      var Pe, Ne, Ye, at, Ve, ze;
      if (Gp(E.target))
        return;
      if (!(E.ctrlKey || E.metaKey)) {
        const mt = E.key.toLowerCase();
        if ((mt === "delete" || mt === "backspace") && fe === "reference-handle" && Be) {
          E.preventDefault(), wa(Be.id);
          return;
        }
        if (mt === "delete" || mt === "backspace") {
          if (xe.getState().selectedCount === 0)
            return;
          E.preventDefault(), HM();
          return;
        }
        const ct = Ab({
          key: E.key,
          altKey: E.altKey,
          ctrlKey: E.ctrlKey,
          metaKey: E.metaKey,
          shiftKey: E.shiftKey
        });
        if (ct) {
          if (ct.type === "tool") {
            if (Wb(ct.tool) && (!h || e))
              return;
            E.preventDefault(), mo(ct.tool);
            return;
          }
          if (ct.type === "palette-primary") {
            const Et = ae.getState();
            ct.index >= 0 && ct.index < Et.colors.length && (E.preventDefault(), Et.setSelectedIndices([ct.index]));
            return;
          }
        }
        return;
      }
      const ne = E.key.toLowerCase();
      if (ne === "v") {
        if (rt === "tile" && ot.getState().tileBuffer) {
          E.preventDefault(), mo("tile-stamp");
          return;
        }
        uo.current = !0, window.setTimeout(() => {
          uo.current = !1;
        }, 200);
        return;
      }
      if (ne === "+" || ne === "=") {
        E.preventDefault(), (Ne = (Pe = window.uiScaleApi) == null ? void 0 : Pe.stepScale) == null || Ne.call(Pe, 1.1);
        return;
      }
      if (ne === "-") {
        E.preventDefault(), (at = (Ye = window.uiScaleApi) == null ? void 0 : Ye.stepScale) == null || at.call(Ye, 0.9090909090909091);
        return;
      }
      if (ne === "0") {
        E.preventDefault(), (ze = (Ve = window.uiScaleApi) == null ? void 0 : Ve.resetScale) == null || ze.call(Ve);
        return;
      }
      if (ne === "z") {
        if (E.preventDefault(), Ae.getState().locked)
          return;
        E.shiftKey ? n() : t();
      }
      if (ne === "y") {
        if (E.preventDefault(), Ae.getState().locked)
          return;
        n();
      }
      if (ne === "s") {
        if (E.preventDefault(), e)
          return;
        yo();
      }
      if (ne === "o") {
        if (E.preventDefault(), e)
          return;
        vo();
      }
      if (ne === "n" && (E.preventDefault(), wo()), ne === "c") {
        if (rt === "tile") {
          Ox() && E.preventDefault();
          return;
        }
        xe.getState().selectedCount > 0 && (E.preventDefault(), E.shiftKey ? $r({ deep: !0 }) : $r());
      }
      if (ne === "x") {
        if (rt === "tile") {
          zx() && E.preventDefault();
          return;
        }
        xe.getState().selectedCount > 0 && (E.preventDefault(), Bx());
      }
      ne === "/" && (E.preventDefault(), So());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [
    fe,
    mo,
    e,
    vo,
    wo,
    yo,
    So,
    h,
    n,
    wa,
    Be,
    t,
    rt
  ]), T.useEffect(() => {
    fe !== "text" && M && v(!1);
  }, [fe, M]);
  const Jl = (y) => {
    Be && py(Be.id, y);
  }, Ch = (y) => {
    Number.isFinite(y) && Jl({
      rotation: On(y, dc, hc)
    });
  }, jh = (y) => {
    Number.isFinite(y) && Jl({
      scale: On(y, Zs, Wl)
    });
  }, Ph = (y) => {
    Number.isFinite(y) && Jl({
      opacity: On(y, fc, pc)
    });
  }, rl = Te.useMemo(() => {
    const y = ns.length - 1;
    if (y < 0)
      return [];
    const E = /* @__PURE__ */ new Set();
    for (const V of xa) {
      if (!Number.isFinite(V))
        continue;
      const ne = Math.round(V);
      ne < 0 || ne > y || E.add(ne);
    }
    return Array.from(E).sort((V, ne) => V - ne);
  }, [ns.length, xa]), jy = rl.length === 0 ? "Select palette colors to trace." : rl.length === 1 ? "Using 1 selected color." : `Using ${rl.length} selected colors.`, Py = () => {
    !Be || ns.length === 0 || rl.length !== 0 && Fb(Be, rl);
  }, Iy = () => {
    if (!Be || !Number.isFinite(ka))
      return;
    const y = On(
      Math.round(ka),
      Cu,
      ju
    );
    Ob(Be, y);
  }, Ih = (Be == null ? void 0 : Be.rotation) ?? 0, Nh = (Be == null ? void 0 : Be.scale) ?? 1, Ny = Kb(Nh), Eh = (Be == null ? void 0 : Be.opacity) ?? 0.7, Rh = (Be == null ? void 0 : Be.flipX) ?? !1, Ah = (Be == null ? void 0 : Be.flipY) ?? !1, Vt = !Be;
  T.useEffect(() => {
    if (!It) {
      Pn("");
      return;
    }
    const y = () => {
      const V = Zb();
      Pn((ne) => ne === V ? ne : V);
    };
    y();
    const E = window.setInterval(y, Fw);
    return () => window.clearInterval(E);
  }, [It]), T.useEffect(() => {
    var E, V;
    const y = It && yt ? `${Ca} • ${yt}` : Ca;
    (V = (E = window.appApi) == null ? void 0 : E.setTitle) == null || V.call(E, y);
  }, [Ca, It, yt]), T.useEffect(() => {
    const y = (E) => {
      var Ne;
      if (Gp(E.target) || !uo.current)
        return;
      uo.current = !1;
      const ne = Array.from(((Ne = E.clipboardData) == null ? void 0 : Ne.items) ?? []).find((Ye) => Ye.type.startsWith("image/"));
      if (!ne)
        return;
      const Pe = ne.getAsFile();
      Pe && (E.preventDefault(), jx(Pe));
    };
    return window.addEventListener("paste", y), () => window.removeEventListener("paste", y);
  }, []), T.useEffect(() => {
    var E, V;
    const y = ((V = (E = window.menuApi) == null ? void 0 : E.onAction) == null ? void 0 : V.call(E, (ne) => {
      var Pe, Ne;
      if (ne.startsWith("view:set:")) {
        const Ye = ne.split(":"), at = Ye[2] ?? "", ze = (Ye[3] ?? "") === "true";
        switch (at) {
          case "showReferenceLayer":
            je(ze);
            return;
          case "showPixelLayer":
            Nt(ze);
            return;
          case "showTileLayer":
            sn(ze);
            return;
          case "showPixelGrid":
            Is(ze);
            return;
          case "showTileGrid":
            Ns(ze);
            return;
          case "showAxes":
            Xn(ze);
            return;
          case "minimapCollapsed":
            Ue(ze);
            return;
          default:
            return;
        }
      }
      if (ne.startsWith("options:advancedMode:")) {
        const Ye = ne.split(":")[2] ?? "";
        p(Ye === "true");
        return;
      }
      if (ne.startsWith("palette:rows:")) {
        const Ye = Number(ne.split(":")[2]);
        Number.isFinite(Ye) && window.dispatchEvent(
          new CustomEvent("palette:set-rows", {
            detail: Math.min(4, Math.max(2, Math.floor(Ye)))
          })
        );
        return;
      }
      switch (ne) {
        case "new":
          wo();
          break;
        case "open":
          vo();
          break;
        case "save":
          yo();
          break;
        case "saveAs":
          Mh();
          break;
        case "importImage":
          kh();
          break;
        case "mergeProject":
          Th();
          break;
        case "recording:start":
          bh();
          break;
        case "recording:stop":
          _h();
          break;
        case "exportPng":
          Hx();
          break;
        case "exportBmp":
          db();
          break;
        case "exportGif":
          hb();
          break;
        case "exportPcx":
          pb();
          break;
        case "exportTga":
          fb();
          break;
        case "exportBsaveCga":
          _b();
          break;
        case "exportBsaveEga":
          Tb();
          break;
        case "exportBsaveVga":
          kb();
          break;
        case "exportGbr":
          cb();
          break;
        case "exportChr":
          ub();
          break;
        case "undo":
          t();
          break;
        case "redo":
          n();
          break;
        case "memory:on":
          tn(!0);
          break;
        case "memory:off":
          tn(!1);
          break;
        case "shortcuts":
          So();
          break;
        case "palette:consolidate":
          Pb();
          break;
        case "palette:import-lospec":
          window.dispatchEvent(new Event("palette:open-lospec"));
          break;
        case "license":
          u(!0);
          break;
        case "options":
          f(!0);
          break;
        case "uiScale:reset":
          (Ne = (Pe = window.uiScaleApi) == null ? void 0 : Pe.resetScale) == null || Ne.call(Pe);
          break;
        case "tileDebug:on":
          va(!0);
          break;
        case "tileDebug:off":
          va(!1);
          break;
        case "view:select-tool:pen":
          Ta("pixel");
          break;
      }
    })) ?? (() => {
    });
    return () => y();
  }, [
    kh,
    vo,
    Th,
    wo,
    bh,
    yo,
    Mh,
    So,
    _h,
    n,
    p,
    ye,
    Ue,
    tn,
    Xn,
    u,
    Is,
    Nt,
    je,
    Ns,
    sn,
    va,
    Ta,
    t
  ]), T.useEffect(() => {
    var y, E;
    (E = (y = window.viewMenuApi) == null ? void 0 : y.setState) == null || E.call(y, {
      showReferenceLayer: vn,
      showPixelLayer: es,
      showTileLayer: N,
      showPixelGrid: R,
      showTileGrid: q,
      showAxes: ue,
      tileDebugOverlay: dh,
      minimapCollapsed: pt
    });
  }, [
    vn,
    es,
    N,
    R,
    q,
    ue,
    dh,
    pt
  ]);
  const Ey = () => /* @__PURE__ */ r.jsx("div", { className: "panel__section", children: fe === "pen" || fe === "selection-lasso" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__row", children: [1, 4, 8].map((y) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": ny === y,
          disabled: Jd === "point",
          onClick: () => Sa(y),
          children: [
            y,
            "px"
          ]
        },
        y
      )) })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Brush" }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__row", children: [
        { id: "point", label: "fine-point" },
        { id: "square", label: "rectangle" },
        { id: "round", label: "circle" }
      ].map((y) => /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": Jd === y.id,
          onClick: () => Ma(y.id),
          children: /* @__PURE__ */ r.jsx("span", { className: "tool-label", "aria-label": y.label, children: y.label })
        },
        y.id
      )) })
    ] })
  ] }) : fe === "spray" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Radius" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: eh,
              onChange: (y) => gh(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: eh,
              onChange: (y) => gh(y.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Density" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Density",
              min: 10,
              max: 2e3,
              step: 10,
              value: Math.min(2e3, th),
              onChange: (y) => xh(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Density",
              min: 1,
              max: 2e4,
              step: 10,
              value: th,
              onChange: (y) => xh(y.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsx("div", { className: "panel__row", children: /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Falloff" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: nh,
            onChange: (y) => yh(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: nh,
            onChange: (y) => yh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }) })
  ] }) : fe === "line" ? ro >= 2 ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
      /* @__PURE__ */ r.jsx(
        rn,
        {
          ariaLabel: "Gradient direction",
          value: so,
          onChange: lo,
          options: [
            { value: "top-bottom", label: "Top → Bottom" },
            { value: "bottom-top", label: "Bottom → Top" },
            { value: "left-right", label: "Left → Right" },
            { value: "right-left", label: "Right → Left" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Dither" }),
      /* @__PURE__ */ r.jsx(
        rn,
        {
          ariaLabel: "Gradient dither",
          value: io,
          onChange: oo,
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
    /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
  ] }) : /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." }) : fe === "rectangle" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "filled",
              checked: sh === "filled",
              onChange: () => lh("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "outlined",
              checked: sh === "outlined",
              onChange: () => lh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    ro >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient direction",
            value: so,
            onChange: lo,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient dither",
            value: io,
            onChange: oo,
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
      /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : fe === "oval" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "filled",
              checked: ih === "filled",
              onChange: () => oh("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "outlined",
              checked: ih === "outlined",
              onChange: () => oh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    ro >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient direction",
            value: so,
            onChange: lo,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient dither",
            value: io,
            onChange: oo,
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
      /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : fe === "fill-bucket" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "color",
              checked: rh === "color",
              onChange: () => ah("color")
            }
          ),
          "Color"
        ] }),
        /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "selection",
              checked: rh === "selection",
              onChange: () => ah("selection")
            }
          ),
          "Selection"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] }),
    ro >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient direction",
            value: so,
            onChange: lo,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Gradient dither",
            value: io,
            onChange: oo,
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
  ] }) : fe === "texture-roll" ? /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: s === 0 ? "Make a selection first." : "Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps." }) : fe === "stamp" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Mode" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ao === "soft", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "soft",
                checked: ao === "soft",
                onChange: () => ph("soft")
              }
            ),
            "Soft"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ao === "hard", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "hard",
                checked: ao === "hard",
                onChange: () => ph("hard")
              }
            ),
            "Hard"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Drag" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": !co, children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "off",
                checked: !co,
                onChange: () => mh(!1)
              }
            ),
            "Off"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": co, children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "on",
                checked: co,
                onChange: () => mh(!0)
              }
            ),
            "On"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": sl === "pixel", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "pixel",
                checked: sl === "pixel",
                onChange: () => po("pixel")
              }
            ),
            "Pixel"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": sl === "tile", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "tile",
                checked: sl === "tile",
                onChange: () => po("tile")
              }
            ),
            "Tile"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Flip" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": ch,
              onClick: () => dy(!ch),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": uh,
              onClick: () => hy(!uh),
              children: "Flip Y"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Scale" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Scale",
            value: String(iy),
            onChange: (y) => uy(Number(y)),
            options: [
              { value: "1", label: "1x" },
              { value: "2", label: "2x" },
              { value: "4", label: "4x" },
              { value: "8", label: "8x" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Rotate" }),
        /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Rotate",
            value: String(ly),
            onChange: (y) => cy(Number(y)),
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
    /* @__PURE__ */ r.jsx("div", { className: "panel__row", children: /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Paste" }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__toggle-group", children: /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ya, children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "checkbox",
            checked: ya,
            onChange: () => fy(!ya)
          }
        ),
        "Duplicate Colors"
      ] }) })
    ] }) })
  ] }) : fe === "reference-handle" ? /* @__PURE__ */ r.jsx("div", { className: "panel__group", children: /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--cards", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Rotation" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Rotation",
            min: dc,
            max: hc,
            step: 1,
            value: Ih,
            disabled: Vt,
            onChange: (y) => Ch(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Rotation",
            min: dc,
            max: hc,
            step: 1,
            value: Ih,
            disabled: Vt,
            onChange: (y) => Ch(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Scale" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Scale",
            min: Ll,
            max: Kr,
            step: 1,
            value: Ny,
            disabled: Vt,
            onChange: (y) => jh(Gb(y.currentTarget.valueAsNumber))
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Scale",
            min: Zs,
            max: Wl,
            step: 0.01,
            value: Nh,
            disabled: Vt,
            onChange: (y) => jh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Opacity" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Opacity",
            min: fc,
            max: pc,
            step: 0.05,
            value: Eh,
            disabled: Vt,
            onChange: (y) => Ph(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Opacity",
            min: fc,
            max: pc,
            step: 0.05,
            value: Eh,
            disabled: Vt,
            onChange: (y) => Ph(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Flip" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Rh,
            disabled: Vt,
            onClick: () => Jl({ flipX: !Rh }),
            children: "Flip X"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Ah,
            disabled: Vt,
            onClick: () => Jl({ flipY: !Ah }),
            children: "Flip Y"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ol === "pixel", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "pixel",
              checked: ol === "pixel",
              onChange: () => go("pixel")
            }
          ),
          "Pixel"
        ] }),
        /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ol === "tile", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "tile",
              checked: ol === "tile",
              onChange: () => go("tile")
            }
          ),
          "Tile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Reference" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack", children: [
        Vt && /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select a reference" }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt,
            onClick: () => {
              Be && wa(Be.id);
            },
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Trace Palette" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack", children: [
        /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: jy }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt || rl.length === 0,
            onClick: Py,
            children: "Trace Selected"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Trace Max Colors" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Trace max colors",
            min: Cu,
            max: ju,
            step: 1,
            value: ka,
            disabled: Vt,
            onChange: (y) => {
              const E = y.currentTarget.valueAsNumber;
              Number.isFinite(E) && my(Math.round(E));
            }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt,
            onClick: Iy,
            children: "Trace"
          }
        )
      ] })
    ] })
  ] }) }) : fe === "selection-rect" || fe === "selection-oval" ? /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "pixel",
            checked: !_t && to === "pixel",
            disabled: _t,
            onChange: () => no("pixel")
          }
        ),
        "Pixel"
      ] }),
      /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "tile",
            checked: _t || to === "tile",
            onChange: () => no("tile")
          }
        ),
        "Tile"
      ] })
    ] }),
    _t ? /* @__PURE__ */ r.jsx("span", { className: "panel__note", children: "Tile Space locks selection snap to tiles." }) : null
  ] }) : fe === "tile-sampler" || fe === "tile-pen" || fe === "tile-stamp" || fe === "tile-rectangle" || fe === "tile-9slice" || fe === "tile-export" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--cards", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Tile Set" }),
        ce ? /* @__PURE__ */ r.jsx(
          rn,
          {
            ariaLabel: "Tile Set",
            value: ce.id,
            onChange: _y,
            options: $t.map((y) => ({ value: y.id, label: y.name }))
          }
        ) : /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "None" })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Cluster" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile cluster columns",
              min: 1,
              max: 64,
              step: 1,
              disabled: !ce,
              value: (ce == null ? void 0 : ce.columns) ?? 1,
              onChange: (y) => Sh(
                y.currentTarget.valueAsNumber,
                (ce == null ? void 0 : ce.rows) ?? 1
              )
            }
          ),
          /* @__PURE__ */ r.jsx("span", { className: "panel__note", children: "x" }),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile cluster rows",
              min: 1,
              max: 64,
              step: 1,
              disabled: !ce,
              value: (ce == null ? void 0 : ce.rows) ?? 1,
              onChange: (y) => Sh(
                (ce == null ? void 0 : ce.columns) ?? 1,
                y.currentTarget.valueAsNumber
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Zoom" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => ja(Es - 1),
              disabled: Es <= Iu,
              children: "-"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile picker zoom",
              min: Iu,
              max: Nu,
              step: 1,
              value: Es,
              onChange: (y) => ja(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => ja(Es + 1),
              disabled: Es >= Nu,
              children: "+"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Page" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: gy,
              disabled: !ce || Ia <= 0,
              children: "◀"
            }
          ),
          /* @__PURE__ */ r.jsxs("span", { className: "panel__item panel__item--static", children: [
            Ia + 1,
            " / ",
            Pa
          ] }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: xy,
              disabled: !ce || Ia >= Pa - 1,
              children: "▶"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Placement" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": zd === "soft",
              onClick: () => Hd("soft"),
              children: "Soft"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": zd === "hard",
              onClick: () => Hd("hard"),
              children: "Hard"
            }
          )
        ] })
      ] }),
      fe === "tile-pen" ? /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": !Wd,
              onClick: () => Ud(!1),
              children: "Free"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Wd,
              onClick: () => Ud(!0),
              children: "Cluster"
            }
          )
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: yy, children: "New Set" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: vy,
          disabled: !ce,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: wy,
          disabled: !ce,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Sy,
          disabled: !ce,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: My,
          disabled: !ce || As.length === 0,
          children: "Delete Tiles"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Set: ",
        ce ? `${ce.name} (${ce.tiles.length} tiles)` : "None"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Map: ",
        wh ? wh.name : "None"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Selected Tile: ",
        ce ? ey + 1 : "—"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        As.length
      ] }),
      fe === "tile-9slice" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          oy ? "set" : "unset"
        ] }),
        /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          ry,
          "x",
          ay
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ r.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ r.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ r.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ r.jsx(dM, {}) }),
    /* @__PURE__ */ r.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ r.jsx(
        KM,
        {
          activeTool: fe,
          selectionCount: s,
          activateTool: mo,
          workspaceMode: rt,
          switchWorkspace: Ta,
          showAdvancedTools: !e && h,
          showTileTools: _t,
          showAiTool: !e,
          showExportButton: !e,
          showFullscreenButton: !e,
          showTileLayerControls: !e,
          toolOptions: Ey()
        }
      ),
      g && /* @__PURE__ */ r.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx("img", { src: GM, alt: "" }) }),
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: `app__palette panel${_t ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${ky}px`,
            "--palette-bar-height": `${by}px`
          },
          children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: Ty
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: `bottom-bar${_t ? " bottom-bar--tile" : ""}`, children: [
              /* @__PURE__ */ r.jsx("div", { className: "bottom-bar__left" }),
              /* @__PURE__ */ r.jsx("div", { className: "bottom-bar__center", children: _t ? /* @__PURE__ */ r.jsx(IM, {}) : /* @__PURE__ */ r.jsx(jM, {}) })
            ] })
          ]
        }
      ),
      pt ? /* @__PURE__ */ r.jsx("div", { className: "app__minimap-launch panel panel--collapsed", children: /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__toggle", onClick: () => Ue(!1), children: "Minimap" }) }) : /* @__PURE__ */ r.jsxs("div", { className: "app__minimap panel", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "panel__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Minimap" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              onClick: () => Ue(!0),
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsx(_M, {})
      ] })
    ] }),
    ge && Z && ql && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: Mo }),
      /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--rom", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Import ROM Segment" }),
          /* @__PURE__ */ r.jsx("button", { type: "button", onClick: Mo, children: "Close" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Selections" }),
            /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r.jsx("span", { children: U.length }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => ee([]),
                  disabled: U.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => ee((y) => y.length > 0 ? y.slice(0, -1) : y),
                  disabled: U.length === 0,
                  children: "Remove last"
                }
              ),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Ctrl+drag to add" })
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Selection (tiles)" }),
            /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r.jsxs("label", { children: [
                "X",
                " ",
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.x,
                    onChange: (y) => bo({ x: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("label", { children: [
                "Y",
                " ",
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.y,
                    onChange: (y) => bo({ y: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("label", { children: [
                "W",
                " ",
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.width,
                    onChange: (y) => bo({ width: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ r.jsxs("label", { children: [
                "H",
                " ",
                /* @__PURE__ */ r.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.height,
                    onChange: (y) => bo({ height: Number(y.target.value) })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Page" }),
            /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => st((y) => Math.max(0, y - 1)),
                  disabled: fo <= 0,
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ r.jsxs("span", { children: [
                fo + 1,
                "/",
                ho
              ] }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => st((y) => Math.min(ho - 1, y + 1)),
                  disabled: fo >= ho - 1,
                  children: "Next"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Scale" }),
            /* @__PURE__ */ r.jsx("span", { children: /* @__PURE__ */ r.jsxs(
              "select",
              {
                value: de,
                onChange: (y) => Ze(Number(y.target.value)),
                children: [
                  /* @__PURE__ */ r.jsx("option", { value: 1, children: "1x" }),
                  /* @__PURE__ */ r.jsx("option", { value: 2, children: "2x" }),
                  /* @__PURE__ */ r.jsx("option", { value: 3, children: "3x" }),
                  /* @__PURE__ */ r.jsx("option", { value: 4, children: "4x" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Palette" }),
            /* @__PURE__ */ r.jsx("span", { children: /* @__PURE__ */ r.jsxs(
              "select",
              {
                value: _e,
                onChange: (y) => Fe(
                  y.target.value === "unused" ? "unused" : "nearest"
                ),
                children: [
                  /* @__PURE__ */ r.jsx("option", { value: "nearest", children: "Map to nearest existing colors" }),
                  /* @__PURE__ */ r.jsx("option", { value: "unused", children: "Import into unused palette slots" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Pick region" }),
            /* @__PURE__ */ r.jsxs("span", { className: "rom-import__grid", children: [
              /* @__PURE__ */ r.jsx("div", { className: "rom-import__selection", children: /* @__PURE__ */ r.jsx(
                "canvas",
                {
                  ref: ll,
                  className: "rom-import__canvas",
                  onPointerDown: (y) => {
                    var ct;
                    y.preventDefault();
                    const E = ll.current;
                    if (!E)
                      return;
                    (ct = E.setPointerCapture) == null || ct.call(E, y.pointerId);
                    const V = E.getBoundingClientRect(), ne = Math.floor(
                      (y.clientX - V.left) / V.width * E.width
                    ), Pe = Math.floor(
                      (y.clientY - V.top) / V.height * E.height
                    ), Ne = Math.floor(ne / (Ee * he)), Ye = fh + Math.floor(Pe / (Ee * he)), at = Math.trunc(On(Ne, 0, il - 1)), Ve = Math.trunc(On(Ye, 0, Rs - 1));
                    Zl.current = {
                      startTileX: at,
                      startTileY: Ve,
                      pointerId: y.pointerId
                    };
                    const ze = y.ctrlKey || y.metaKey, mt = { x: at, y: Ve, width: 1, height: 1 };
                    ee(
                      (Et) => ze ? [...Et, mt] : [mt]
                    );
                  },
                  onPointerMove: (y) => {
                    const E = ll.current, V = Zl.current;
                    if (!E || !V || !Z || V.pointerId !== y.pointerId)
                      return;
                    const ne = E.getBoundingClientRect(), Pe = Math.floor(
                      (y.clientX - ne.left) / ne.width * E.width
                    ), Ne = Math.floor(
                      (y.clientY - ne.top) / ne.height * E.height
                    ), Ye = Math.floor(Pe / (Ee * he)), at = fh + Math.floor(Ne / (Ee * he)), Ve = Math.min(V.startTileX, Ye), ze = Math.min(V.startTileY, at), mt = Math.max(V.startTileX, Ye), ct = Math.max(V.startTileY, at);
                    ee((Et) => {
                      if (Et.length === 0)
                        return Et;
                      const ss = Et.slice();
                      return ss[ss.length - 1] = Ys(
                        {
                          x: Ve,
                          y: ze,
                          width: mt - Ve + 1,
                          height: ct - ze + 1
                        },
                        il,
                        Rs
                      ), ss;
                    });
                  },
                  onPointerUp: (y) => {
                    var V;
                    const E = ll.current;
                    E && ((V = E.releasePointerCapture) == null || V.call(E, y.pointerId)), Zl.current = null;
                  },
                  onPointerLeave: (y) => {
                    var V;
                    const E = ll.current;
                    E && ((V = E.releasePointerCapture) == null || V.call(E, y.pointerId)), Zl.current = null;
                  }
                }
              ) }),
              /* @__PURE__ */ r.jsx("div", { className: "rom-import__preview", children: /* @__PURE__ */ r.jsx(
                "canvas",
                {
                  ref: hh,
                  className: "rom-import__canvas"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", {}),
            /* @__PURE__ */ r.jsx("button", { type: "button", onClick: Cy, children: "Send to Stamp Tool" })
          ] })
        ] })
      ] })
    ] }),
    Q && K && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: "modal__backdrop",
          onClick: () => {
            te(!1), le(null), F(null);
          }
        }
      ),
      /* @__PURE__ */ r.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Merge Project" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                te(!1), le(null), F(null);
              },
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Source" }),
            /* @__PURE__ */ r.jsx("span", { children: D ?? "(unknown)" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Offset X" }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "number",
                value: re,
                onChange: (y) => Se(Number(y.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Offset Y" }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "number",
                value: X,
                onChange: (y) => ie(Number(y.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", {}),
            /* @__PURE__ */ r.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  sb(K, {
                    offsetX: re,
                    offsetY: X
                  }), te(!1), le(null), F(null);
                },
                children: "Merge Pixels"
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", {}),
            /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Current merge supports pixels only and requires identical palettes." })
          ] })
        ] })
      ] })
    ] }),
    o && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: () => a(!1) }),
      /* @__PURE__ */ r.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Shortcut Map & Hotkeys" }),
          /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => a(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "New" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+N" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Open" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+O" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Save" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+S" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Save As" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Shift+S" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Export PNG" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Shift+E" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Export GBR" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Shift+G" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Undo" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Z" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Redo" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Y / Ctrl+Shift+Z" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Copy Selection (active layer)" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+C" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Deep Copy Selection (merged)" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+Shift+C" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Cut Selection" }),
            /* @__PURE__ */ r.jsx("span", { children: "Ctrl+X" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Tool hotkeys" }),
            /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Global" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Palette primary color 0–9" }),
            /* @__PURE__ */ r.jsx("span", { children: "0–9" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Pen / Rectangle / Oval" }),
            /* @__PURE__ */ r.jsx("span", { children: "P / R / O" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Spray / Line / Fill / Text" }),
            /* @__PURE__ */ r.jsx("span", { children: "S / L / F / T" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Eyedropper / Magic Wand" }),
            /* @__PURE__ */ r.jsx("span", { children: "E / W" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Stamp / Reference Handle / Scroll Selection" }),
            /* @__PURE__ */ r.jsx("span", { children: "V / H / Q" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Select Oval / Rectangle / Lasso" }),
            /* @__PURE__ */ r.jsx("span", { children: "Alt+O / Alt+R / Alt+P" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Tile tools" }),
            /* @__PURE__ */ r.jsx("span", { children: "Shift+S / Shift+P / Shift+R / Shift+N / Shift+E" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Trace Palette Range" }),
            /* @__PURE__ */ r.jsx("span", { children: "Reference panel button" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Trace Max Colors" }),
            /* @__PURE__ */ r.jsx("span", { children: "Reference panel button" })
          ] })
        ] })
      ] })
    ] }),
    c && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: () => u(!1) }),
      /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--license", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "License" }),
          /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => u(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ r.jsx("div", { className: "modal__body modal__body--license", children: /* @__PURE__ */ r.jsx("pre", { className: "modal__license", children: 'MIT License Copyright (c) 2026 Joel Longanecker Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.' }) })
      ] })
    ] }),
    d && !e && /* @__PURE__ */ r.jsx(
      DM,
      {
        onClose: () => {
          f(!1);
        },
        onAdvancedModeChange: p
      }
    ),
    M && fe === "text" && /* @__PURE__ */ r.jsx(
      LM,
      {
        initialText: S,
        initialFontFamily: _,
        initialFontSize: C,
        onCancel: () => {
          v(!1), ye(m);
        },
        onConfirm: ({ text: y, fontFamily: E, fontSize: V }) => {
          b(y), k(E), A(V), NM({
            text: y,
            fontFamily: E,
            fontSize: V,
            paletteIndex: sy
          }), v(!1);
        }
      }
    ),
    L && fe === "ai" && !e && /* @__PURE__ */ r.jsx(
      OM,
      {
        initialPrompt: G,
        onCancel: () => {
          Y(!1), ye(j);
        },
        onConfirm: ({ prompt: y }) => {
          oe(y), Y(!1);
        }
      }
    )
  ] });
}, Jb = () => {
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
class e_ extends Te.Component {
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
      return /* @__PURE__ */ r.jsxs("div", { style: { padding: 16, fontFamily: "monospace", whiteSpace: "pre-wrap" }, children: [
        /* @__PURE__ */ r.jsx("h1", { style: { marginTop: 0 }, children: "Pixel Splash Studio demo crashed" }),
        /* @__PURE__ */ r.jsx("pre", { children: t })
      ] });
    }
    return this.props.children;
  }
}
const qx = document.getElementById("root");
if (!qx)
  throw new Error("Root element not found");
Jb();
Ac.createRoot(qx).render(
  /* @__PURE__ */ r.jsx(Te.StrictMode, { children: /* @__PURE__ */ r.jsx(e_, { children: /* @__PURE__ */ r.jsx(qb, {}) }) })
);
