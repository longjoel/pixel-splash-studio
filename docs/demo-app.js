function Gp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Qp = { exports: {} }, Ko = {}, Zp = { exports: {} }, be = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $i = Symbol.for("react.element"), Ry = Symbol.for("react.portal"), Ay = Symbol.for("react.fragment"), Ly = Symbol.for("react.strict_mode"), Dy = Symbol.for("react.profiler"), By = Symbol.for("react.provider"), Yy = Symbol.for("react.context"), Xy = Symbol.for("react.forward_ref"), Fy = Symbol.for("react.suspense"), Oy = Symbol.for("react.memo"), zy = Symbol.for("react.lazy"), Dh = Symbol.iterator;
function Hy(e) {
  return e === null || typeof e != "object" ? null : (e = Dh && e[Dh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var qp = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Jp = Object.assign, em = {};
function Vl(e, t, n) {
  this.props = e, this.context = t, this.refs = em, this.updater = n || qp;
}
Vl.prototype.isReactComponent = {};
Vl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Vl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function tm() {
}
tm.prototype = Vl.prototype;
function Bu(e, t, n) {
  this.props = e, this.context = t, this.refs = em, this.updater = n || qp;
}
var Yu = Bu.prototype = new tm();
Yu.constructor = Bu;
Jp(Yu, Vl.prototype);
Yu.isPureReactComponent = !0;
var Bh = Array.isArray, nm = Object.prototype.hasOwnProperty, Xu = { current: null }, sm = { key: !0, ref: !0, __self: !0, __source: !0 };
function lm(e, t, n) {
  var s, l = {}, i = null, r = null;
  if (t != null) for (s in t.ref !== void 0 && (r = t.ref), t.key !== void 0 && (i = "" + t.key), t) nm.call(t, s) && !sm.hasOwnProperty(s) && (l[s] = t[s]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in a = e.defaultProps, a) l[s] === void 0 && (l[s] = a[s]);
  return { $$typeof: $i, type: e, key: i, ref: r, props: l, _owner: Xu.current };
}
function Wy(e, t) {
  return { $$typeof: $i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Fu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $i;
}
function Uy(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Yh = /\/+/g;
function Ba(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Uy("" + e.key) : t.toString(36);
}
function Zr(e, t, n, s, l) {
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
        case $i:
        case Ry:
          r = !0;
      }
  }
  if (r) return r = e, l = l(r), e = s === "" ? "." + Ba(r, 0) : s, Bh(l) ? (n = "", e != null && (n = e.replace(Yh, "$&/") + "/"), Zr(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Fu(l) && (l = Wy(l, n + (!l.key || r && r.key === l.key ? "" : ("" + l.key).replace(Yh, "$&/") + "/") + e)), t.push(l)), 1;
  if (r = 0, s = s === "" ? "." : s + ":", Bh(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var c = s + Ba(i, a);
    r += Zr(i, t, n, c, l);
  }
  else if (c = Hy(e), typeof c == "function") for (e = c.call(e), a = 0; !(i = e.next()).done; ) i = i.value, c = s + Ba(i, a++), r += Zr(i, t, n, c, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return r;
}
function jr(e, t, n) {
  if (e == null) return e;
  var s = [], l = 0;
  return Zr(e, s, "", "", function(i) {
    return t.call(n, i, l++);
  }), s;
}
function $y(e) {
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
var Dt = { current: null }, qr = { transition: null }, Vy = { ReactCurrentDispatcher: Dt, ReactCurrentBatchConfig: qr, ReactCurrentOwner: Xu };
function im() {
  throw Error("act(...) is not supported in production builds of React.");
}
be.Children = { map: jr, forEach: function(e, t, n) {
  jr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return jr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return jr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Fu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
be.Component = Vl;
be.Fragment = Ay;
be.Profiler = Dy;
be.PureComponent = Bu;
be.StrictMode = Ly;
be.Suspense = Fy;
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vy;
be.act = im;
be.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = Jp({}, e.props), l = e.key, i = e.ref, r = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, r = Xu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) nm.call(t, c) && !sm.hasOwnProperty(c) && (s[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) s.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
    s.children = a;
  }
  return { $$typeof: $i, type: e.type, key: l, ref: i, props: s, _owner: r };
};
be.createContext = function(e) {
  return e = { $$typeof: Yy, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: By, _context: e }, e.Consumer = e;
};
be.createElement = lm;
be.createFactory = function(e) {
  var t = lm.bind(null, e);
  return t.type = e, t;
};
be.createRef = function() {
  return { current: null };
};
be.forwardRef = function(e) {
  return { $$typeof: Xy, render: e };
};
be.isValidElement = Fu;
be.lazy = function(e) {
  return { $$typeof: zy, _payload: { _status: -1, _result: e }, _init: $y };
};
be.memo = function(e, t) {
  return { $$typeof: Oy, type: e, compare: t === void 0 ? null : t };
};
be.startTransition = function(e) {
  var t = qr.transition;
  qr.transition = {};
  try {
    e();
  } finally {
    qr.transition = t;
  }
};
be.unstable_act = im;
be.useCallback = function(e, t) {
  return Dt.current.useCallback(e, t);
};
be.useContext = function(e) {
  return Dt.current.useContext(e);
};
be.useDebugValue = function() {
};
be.useDeferredValue = function(e) {
  return Dt.current.useDeferredValue(e);
};
be.useEffect = function(e, t) {
  return Dt.current.useEffect(e, t);
};
be.useId = function() {
  return Dt.current.useId();
};
be.useImperativeHandle = function(e, t, n) {
  return Dt.current.useImperativeHandle(e, t, n);
};
be.useInsertionEffect = function(e, t) {
  return Dt.current.useInsertionEffect(e, t);
};
be.useLayoutEffect = function(e, t) {
  return Dt.current.useLayoutEffect(e, t);
};
be.useMemo = function(e, t) {
  return Dt.current.useMemo(e, t);
};
be.useReducer = function(e, t, n) {
  return Dt.current.useReducer(e, t, n);
};
be.useRef = function(e) {
  return Dt.current.useRef(e);
};
be.useState = function(e) {
  return Dt.current.useState(e);
};
be.useSyncExternalStore = function(e, t, n) {
  return Dt.current.useSyncExternalStore(e, t, n);
};
be.useTransition = function() {
  return Dt.current.useTransition();
};
be.version = "18.3.1";
Zp.exports = be;
var T = Zp.exports;
const Te = /* @__PURE__ */ Gp(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ky = T, Gy = Symbol.for("react.element"), Qy = Symbol.for("react.fragment"), Zy = Object.prototype.hasOwnProperty, qy = Ky.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Jy = { key: !0, ref: !0, __self: !0, __source: !0 };
function rm(e, t, n) {
  var s, l = {}, i = null, r = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (r = t.ref);
  for (s in t) Zy.call(t, s) && !Jy.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: Gy, type: e, key: i, ref: r, props: l, _owner: qy.current };
}
Ko.Fragment = Qy;
Ko.jsx = rm;
Ko.jsxs = rm;
Qp.exports = Ko;
var o = Qp.exports, Rc = {}, om = { exports: {} }, Jt = {}, am = { exports: {} }, cm = {};
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
      var le = K - 1 >>> 1, ae = D[le];
      if (0 < l(ae, F)) D[le] = F, D[K] = ae, K = le;
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
      e: for (var le = 0, ae = D.length, Me = ae >>> 1; le < Me; ) {
        var X = 2 * (le + 1) - 1, ie = D[X], ge = X + 1, z = D[ge];
        if (0 > l(ie, K)) ge < ae && 0 > l(z, ie) ? (D[le] = z, D[ge] = K, le = ge) : (D[le] = ie, D[X] = K, le = X);
        else if (ge < ae && 0 > l(z, K)) D[le] = z, D[ge] = K, le = ge;
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
    var r = Date, a = r.now();
    e.unstable_now = function() {
      return r.now() - a;
    };
  }
  var c = [], u = [], h = 1, p = null, d = 3, f = !1, g = !1, w = !1, M = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
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
      F !== null && ne(S, F.startTime - D);
    }
  }
  function b(D, F) {
    g = !1, w && (w = !1, v(j), j = -1), f = !0;
    var K = d;
    try {
      for (x(F), p = n(c); p !== null && (!(p.expirationTime > F) || D && !Y()); ) {
        var le = p.callback;
        if (typeof le == "function") {
          p.callback = null, d = p.priorityLevel;
          var ae = le(p.expirationTime <= F);
          F = e.unstable_now(), typeof ae == "function" ? p.callback = ae : p === n(c) && s(c), x(F);
        } else s(c);
        p = n(c);
      }
      if (p !== null) var Me = !0;
      else {
        var X = n(u);
        X !== null && ne(S, X.startTime - F), Me = !1;
      }
      return Me;
    } finally {
      p = null, d = K, f = !1;
    }
  }
  var _ = !1, k = null, j = -1, A = 5, L = -1;
  function Y() {
    return !(e.unstable_now() - L < A);
  }
  function N() {
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
    m(N);
  };
  else if (typeof MessageChannel < "u") {
    var G = new MessageChannel(), oe = G.port2;
    G.port1.onmessage = N, O = function() {
      oe.postMessage(null);
    };
  } else O = function() {
    M(N, 0);
  };
  function Q(D) {
    k = D, _ || (_ = !0, O());
  }
  function ne(D, F) {
    j = M(function() {
      D(e.unstable_now());
    }, F);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(D) {
    D.callback = null;
  }, e.unstable_continueExecution = function() {
    g || f || (g = !0, Q(b));
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
        var F = 3;
        break;
      default:
        F = d;
    }
    var K = d;
    d = F;
    try {
      return D();
    } finally {
      d = K;
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
    var K = d;
    d = D;
    try {
      return F();
    } finally {
      d = K;
    }
  }, e.unstable_scheduleCallback = function(D, F, K) {
    var le = e.unstable_now();
    switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? le + K : le) : K = le, D) {
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
    return ae = K + ae, D = { id: h++, callback: F, priorityLevel: D, startTime: K, expirationTime: ae, sortIndex: -1 }, K > le ? (D.sortIndex = K, t(u, D), n(c) === null && D === n(u) && (w ? (v(j), j = -1) : w = !0, ne(S, K - le))) : (D.sortIndex = ae, t(c, D), g || f || (g = !0, Q(b))), D;
  }, e.unstable_shouldYield = Y, e.unstable_wrapCallback = function(D) {
    var F = d;
    return function() {
      var K = d;
      d = F;
      try {
        return D.apply(this, arguments);
      } finally {
        d = K;
      }
    };
  };
})(cm);
am.exports = cm;
var ev = am.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tv = T, qt = ev;
function H(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var um = /* @__PURE__ */ new Set(), Ni = {};
function el(e, t) {
  Dl(e, t), Dl(e + "Capture", t);
}
function Dl(e, t) {
  for (Ni[e] = t, e = 0; e < t.length; e++) um.add(t[e]);
}
var Vn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ac = Object.prototype.hasOwnProperty, nv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Xh = {}, Fh = {};
function sv(e) {
  return Ac.call(Fh, e) ? !0 : Ac.call(Xh, e) ? !1 : nv.test(e) ? Fh[e] = !0 : (Xh[e] = !0, !1);
}
function lv(e, t, n, s) {
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
function iv(e, t, n, s) {
  if (t === null || typeof t > "u" || lv(e, t, n, s)) return !0;
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
function Bt(e, t, n, s, l, i, r) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = s, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = r;
}
var _t = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  _t[e] = new Bt(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  _t[t] = new Bt(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  _t[e] = new Bt(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  _t[e] = new Bt(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  _t[e] = new Bt(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  _t[e] = new Bt(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  _t[e] = new Bt(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  _t[e] = new Bt(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  _t[e] = new Bt(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Ou = /[\-:]([a-z])/g;
function zu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ou,
    zu
  );
  _t[t] = new Bt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ou, zu);
  _t[t] = new Bt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ou, zu);
  _t[t] = new Bt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  _t[e] = new Bt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
_t.xlinkHref = new Bt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  _t[e] = new Bt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Hu(e, t, n, s) {
  var l = _t.hasOwnProperty(t) ? _t[t] : null;
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (iv(t, n, l, s) && (n = null), s || l === null ? sv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var qn = tv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Nr = Symbol.for("react.element"), gl = Symbol.for("react.portal"), xl = Symbol.for("react.fragment"), Wu = Symbol.for("react.strict_mode"), Lc = Symbol.for("react.profiler"), dm = Symbol.for("react.provider"), hm = Symbol.for("react.context"), Uu = Symbol.for("react.forward_ref"), Dc = Symbol.for("react.suspense"), Bc = Symbol.for("react.suspense_list"), $u = Symbol.for("react.memo"), as = Symbol.for("react.lazy"), fm = Symbol.for("react.offscreen"), Oh = Symbol.iterator;
function ti(e) {
  return e === null || typeof e != "object" ? null : (e = Oh && e[Oh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var et = Object.assign, Ya;
function fi(e) {
  if (Ya === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ya = t && t[1] || "";
  }
  return `
` + Ya + e;
}
var Xa = !1;
function Fa(e, t) {
  if (!e || Xa) return "";
  Xa = !0;
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
`), r = l.length - 1, a = i.length - 1; 1 <= r && 0 <= a && l[r] !== i[a]; ) a--;
      for (; 1 <= r && 0 <= a; r--, a--) if (l[r] !== i[a]) {
        if (r !== 1 || a !== 1)
          do
            if (r--, a--, 0 > a || l[r] !== i[a]) {
              var c = `
` + l[r].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= r && 0 <= a);
        break;
      }
    }
  } finally {
    Xa = !1, Error.prepareStackTrace = n;
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
      return e = Fa(e.type, !1), e;
    case 11:
      return e = Fa(e.type.render, !1), e;
    case 1:
      return e = Fa(e.type, !0), e;
    default:
      return "";
  }
}
function Yc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case xl:
      return "Fragment";
    case gl:
      return "Portal";
    case Lc:
      return "Profiler";
    case Wu:
      return "StrictMode";
    case Dc:
      return "Suspense";
    case Bc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case hm:
      return (e.displayName || "Context") + ".Consumer";
    case dm:
      return (e._context.displayName || "Context") + ".Provider";
    case Uu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case $u:
      return t = e.displayName || null, t !== null ? t : Yc(e.type) || "Memo";
    case as:
      t = e._payload, e = e._init;
      try {
        return Yc(e(t));
      } catch {
      }
  }
  return null;
}
function ov(e) {
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
      return Yc(t);
    case 8:
      return t === Wu ? "StrictMode" : "Mode";
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
function pm(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function av(e) {
  var t = pm(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
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
function Pr(e) {
  e._valueTracker || (e._valueTracker = av(e));
}
function mm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = pm(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
}
function po(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Xc(e, t) {
  var n = t.checked;
  return et({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function zh(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, s = t.checked != null ? t.checked : t.defaultChecked;
  n = _s(t.value != null ? t.value : n), e._wrapperState = { initialChecked: s, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function gm(e, t) {
  t = t.checked, t != null && Hu(e, "checked", t, !1);
}
function Fc(e, t) {
  gm(e, t);
  var n = _s(t.value), s = t.type;
  if (n != null) s === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Oc(e, t.type, n) : t.hasOwnProperty("defaultValue") && Oc(e, t.type, _s(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Hh(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var s = t.type;
    if (!(s !== "submit" && s !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Oc(e, t, n) {
  (t !== "number" || po(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
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
function zc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(H(91));
  return et({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Wh(e, t) {
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
function xm(e, t) {
  var n = _s(t.value), s = _s(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function Uh(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function ym(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Hc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? ym(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ir, vm = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, s, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, s, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Ir = Ir || document.createElement("div"), Ir.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Ir.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Pi(e, t) {
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
}, cv = ["Webkit", "ms", "Moz", "O"];
Object.keys(yi).forEach(function(e) {
  cv.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), yi[t] = yi[e];
  });
});
function wm(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yi.hasOwnProperty(e) && yi[e] ? ("" + t).trim() : t + "px";
}
function Sm(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var s = n.indexOf("--") === 0, l = wm(n, t[n], s);
    n === "float" && (n = "cssFloat"), s ? e.setProperty(n, l) : e[n] = l;
  }
}
var uv = et({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Wc(e, t) {
  if (t) {
    if (uv[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(H(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(H(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(H(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(H(62));
  }
}
function Uc(e, t) {
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
var $c = null;
function Vu(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Vc = null, Nl = null, Pl = null;
function $h(e) {
  if (e = Gi(e)) {
    if (typeof Vc != "function") throw Error(H(280));
    var t = e.stateNode;
    t && (t = Jo(t), Vc(e.stateNode, e.type, t));
  }
}
function Mm(e) {
  Nl ? Pl ? Pl.push(e) : Pl = [e] : Nl = e;
}
function bm() {
  if (Nl) {
    var e = Nl, t = Pl;
    if (Pl = Nl = null, $h(e), t) for (e = 0; e < t.length; e++) $h(t[e]);
  }
}
function _m(e, t) {
  return e(t);
}
function Tm() {
}
var Oa = !1;
function km(e, t, n) {
  if (Oa) return e(t, n);
  Oa = !0;
  try {
    return _m(e, t, n);
  } finally {
    Oa = !1, (Nl !== null || Pl !== null) && (Tm(), bm());
  }
}
function Ii(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var s = Jo(n);
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
var Kc = !1;
if (Vn) try {
  var ni = {};
  Object.defineProperty(ni, "passive", { get: function() {
    Kc = !0;
  } }), window.addEventListener("test", ni, ni), window.removeEventListener("test", ni, ni);
} catch {
  Kc = !1;
}
function dv(e, t, n, s, l, i, r, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (h) {
    this.onError(h);
  }
}
var vi = !1, mo = null, go = !1, Gc = null, hv = { onError: function(e) {
  vi = !0, mo = e;
} };
function fv(e, t, n, s, l, i, r, a, c) {
  vi = !1, mo = null, dv.apply(hv, arguments);
}
function pv(e, t, n, s, l, i, r, a, c) {
  if (fv.apply(this, arguments), vi) {
    if (vi) {
      var u = mo;
      vi = !1, mo = null;
    } else throw Error(H(198));
    go || (go = !0, Gc = u);
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
function Cm(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Vh(e) {
  if (tl(e) !== e) throw Error(H(188));
}
function mv(e) {
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
        if (i === n) return Vh(l), e;
        if (i === s) return Vh(l), t;
        i = i.sibling;
      }
      throw Error(H(188));
    }
    if (n.return !== s.return) n = l, s = i;
    else {
      for (var r = !1, a = l.child; a; ) {
        if (a === n) {
          r = !0, n = l, s = i;
          break;
        }
        if (a === s) {
          r = !0, s = l, n = i;
          break;
        }
        a = a.sibling;
      }
      if (!r) {
        for (a = i.child; a; ) {
          if (a === n) {
            r = !0, n = i, s = l;
            break;
          }
          if (a === s) {
            r = !0, s = i, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!r) throw Error(H(189));
      }
    }
    if (n.alternate !== s) throw Error(H(190));
  }
  if (n.tag !== 3) throw Error(H(188));
  return n.stateNode.current === n ? e : t;
}
function jm(e) {
  return e = mv(e), e !== null ? Nm(e) : null;
}
function Nm(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Nm(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Pm = qt.unstable_scheduleCallback, Kh = qt.unstable_cancelCallback, gv = qt.unstable_shouldYield, xv = qt.unstable_requestPaint, it = qt.unstable_now, yv = qt.unstable_getCurrentPriorityLevel, Ku = qt.unstable_ImmediatePriority, Im = qt.unstable_UserBlockingPriority, xo = qt.unstable_NormalPriority, vv = qt.unstable_LowPriority, Em = qt.unstable_IdlePriority, Go = null, Bn = null;
function wv(e) {
  if (Bn && typeof Bn.onCommitFiberRoot == "function") try {
    Bn.onCommitFiberRoot(Go, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Cn = Math.clz32 ? Math.clz32 : bv, Sv = Math.log, Mv = Math.LN2;
function bv(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Sv(e) / Mv | 0) | 0;
}
var Er = 64, Rr = 4194304;
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
function yo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var s = 0, l = e.suspendedLanes, i = e.pingedLanes, r = n & 268435455;
  if (r !== 0) {
    var a = r & ~l;
    a !== 0 ? s = mi(a) : (i &= r, i !== 0 && (s = mi(i)));
  } else r = n & ~l, r !== 0 ? s = mi(r) : i !== 0 && (s = mi(i));
  if (s === 0) return 0;
  if (t !== 0 && t !== s && !(t & l) && (l = s & -s, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (s & 4 && (s |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= s; 0 < t; ) n = 31 - Cn(t), l = 1 << n, s |= e[n], t &= ~l;
  return s;
}
function _v(e, t) {
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
function Tv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var r = 31 - Cn(i), a = 1 << r, c = l[r];
    c === -1 ? (!(a & n) || a & s) && (l[r] = _v(a, t)) : c <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Qc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Rm() {
  var e = Er;
  return Er <<= 1, !(Er & 4194240) && (Er = 64), e;
}
function za(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vi(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Cn(t), e[t] = n;
}
function kv(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Cn(n), i = 1 << l;
    t[l] = 0, s[l] = -1, e[l] = -1, n &= ~i;
  }
}
function Gu(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var s = 31 - Cn(n), l = 1 << s;
    l & t | e[s] & t && (e[s] |= t), n &= ~l;
  }
}
var Le = 0;
function Am(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Lm, Qu, Dm, Bm, Ym, Zc = !1, Ar = [], gs = null, xs = null, ys = null, Ei = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Map(), us = [], Cv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Gh(e, t) {
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
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: s, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Gi(t), t !== null && Qu(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function jv(e, t, n, s, l) {
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
function Xm(e) {
  var t = Xs(e.target);
  if (t !== null) {
    var n = tl(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Cm(n), t !== null) {
          e.blockedOn = t, Ym(e.priority, function() {
            Dm(n);
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
function Jr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = qc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var s = new n.constructor(n.type, n);
      $c = s, n.target.dispatchEvent(s), $c = null;
    } else return t = Gi(n), t !== null && Qu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Qh(e, t, n) {
  Jr(e) && n.delete(t);
}
function Nv() {
  Zc = !1, gs !== null && Jr(gs) && (gs = null), xs !== null && Jr(xs) && (xs = null), ys !== null && Jr(ys) && (ys = null), Ei.forEach(Qh), Ri.forEach(Qh);
}
function li(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Zc || (Zc = !0, qt.unstable_scheduleCallback(qt.unstable_NormalPriority, Nv)));
}
function Ai(e) {
  function t(l) {
    return li(l, e);
  }
  if (0 < Ar.length) {
    li(Ar[0], e);
    for (var n = 1; n < Ar.length; n++) {
      var s = Ar[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (gs !== null && li(gs, e), xs !== null && li(xs, e), ys !== null && li(ys, e), Ei.forEach(t), Ri.forEach(t), n = 0; n < us.length; n++) s = us[n], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < us.length && (n = us[0], n.blockedOn === null); ) Xm(n), n.blockedOn === null && us.shift();
}
var Il = qn.ReactCurrentBatchConfig, vo = !0;
function Pv(e, t, n, s) {
  var l = Le, i = Il.transition;
  Il.transition = null;
  try {
    Le = 1, Zu(e, t, n, s);
  } finally {
    Le = l, Il.transition = i;
  }
}
function Iv(e, t, n, s) {
  var l = Le, i = Il.transition;
  Il.transition = null;
  try {
    Le = 4, Zu(e, t, n, s);
  } finally {
    Le = l, Il.transition = i;
  }
}
function Zu(e, t, n, s) {
  if (vo) {
    var l = qc(e, t, n, s);
    if (l === null) qa(e, t, s, wo, n), Gh(e, s);
    else if (jv(l, e, t, n, s)) s.stopPropagation();
    else if (Gh(e, s), t & 4 && -1 < Cv.indexOf(e)) {
      for (; l !== null; ) {
        var i = Gi(l);
        if (i !== null && Lm(i), i = qc(e, t, n, s), i === null && qa(e, t, s, wo, n), i === l) break;
        l = i;
      }
      l !== null && s.stopPropagation();
    } else qa(e, t, s, null, n);
  }
}
var wo = null;
function qc(e, t, n, s) {
  if (wo = null, e = Vu(s), e = Xs(e), e !== null) if (t = tl(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Cm(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return wo = e, null;
}
function Fm(e) {
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
      switch (yv()) {
        case Ku:
          return 1;
        case Im:
          return 4;
        case xo:
        case vv:
          return 16;
        case Em:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ps = null, qu = null, eo = null;
function Om() {
  if (eo) return eo;
  var e, t = qu, n = t.length, s, l = "value" in ps ? ps.value : ps.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var r = n - e;
  for (s = 1; s <= r && t[n - s] === l[i - s]; s++) ;
  return eo = l.slice(e, 1 < s ? 1 - s : void 0);
}
function to(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Lr() {
  return !0;
}
function Zh() {
  return !1;
}
function en(e) {
  function t(n, s, l, i, r) {
    this._reactName = n, this._targetInst = l, this.type = s, this.nativeEvent = i, this.target = r, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Lr : Zh, this.isPropagationStopped = Zh, this;
  }
  return et(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Lr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Lr);
  }, persist: function() {
  }, isPersistent: Lr }), t;
}
var Kl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ju = en(Kl), Ki = et({}, Kl, { view: 0, detail: 0 }), Ev = en(Ki), Ha, Wa, ii, Qo = et({}, Ki, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ed, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ii && (ii && e.type === "mousemove" ? (Ha = e.screenX - ii.screenX, Wa = e.screenY - ii.screenY) : Wa = Ha = 0, ii = e), Ha);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Wa;
} }), qh = en(Qo), Rv = et({}, Qo, { dataTransfer: 0 }), Av = en(Rv), Lv = et({}, Ki, { relatedTarget: 0 }), Ua = en(Lv), Dv = et({}, Kl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Bv = en(Dv), Yv = et({}, Kl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Xv = en(Yv), Fv = et({}, Kl, { data: 0 }), Jh = en(Fv), Ov = {
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
}, zv = {
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
}, Hv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Wv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Hv[e]) ? !!t[e] : !1;
}
function ed() {
  return Wv;
}
var Uv = et({}, Ki, { key: function(e) {
  if (e.key) {
    var t = Ov[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = to(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? zv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ed, charCode: function(e) {
  return e.type === "keypress" ? to(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? to(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), $v = en(Uv), Vv = et({}, Qo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ef = en(Vv), Kv = et({}, Ki, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ed }), Gv = en(Kv), Qv = et({}, Kl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Zv = en(Qv), qv = et({}, Qo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Jv = en(qv), ew = [9, 13, 27, 32], td = Vn && "CompositionEvent" in window, wi = null;
Vn && "documentMode" in document && (wi = document.documentMode);
var tw = Vn && "TextEvent" in window && !wi, zm = Vn && (!td || wi && 8 < wi && 11 >= wi), tf = " ", nf = !1;
function Hm(e, t) {
  switch (e) {
    case "keyup":
      return ew.indexOf(t.keyCode) !== -1;
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
function Wm(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var yl = !1;
function nw(e, t) {
  switch (e) {
    case "compositionend":
      return Wm(t);
    case "keypress":
      return t.which !== 32 ? null : (nf = !0, tf);
    case "textInput":
      return e = t.data, e === tf && nf ? null : e;
    default:
      return null;
  }
}
function sw(e, t) {
  if (yl) return e === "compositionend" || !td && Hm(e, t) ? (e = Om(), eo = qu = ps = null, yl = !1, e) : null;
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
      return zm && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var lw = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function sf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!lw[e.type] : t === "textarea";
}
function Um(e, t, n, s) {
  Mm(s), t = So(t, "onChange"), 0 < t.length && (n = new Ju("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var Si = null, Li = null;
function iw(e) {
  ng(e, 0);
}
function Zo(e) {
  var t = Sl(e);
  if (mm(t)) return e;
}
function rw(e, t) {
  if (e === "change") return t;
}
var $m = !1;
if (Vn) {
  var $a;
  if (Vn) {
    var Va = "oninput" in document;
    if (!Va) {
      var lf = document.createElement("div");
      lf.setAttribute("oninput", "return;"), Va = typeof lf.oninput == "function";
    }
    $a = Va;
  } else $a = !1;
  $m = $a && (!document.documentMode || 9 < document.documentMode);
}
function rf() {
  Si && (Si.detachEvent("onpropertychange", Vm), Li = Si = null);
}
function Vm(e) {
  if (e.propertyName === "value" && Zo(Li)) {
    var t = [];
    Um(t, Li, e, Vu(e)), km(iw, t);
  }
}
function ow(e, t, n) {
  e === "focusin" ? (rf(), Si = t, Li = n, Si.attachEvent("onpropertychange", Vm)) : e === "focusout" && rf();
}
function aw(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zo(Li);
}
function cw(e, t) {
  if (e === "click") return Zo(t);
}
function uw(e, t) {
  if (e === "input" || e === "change") return Zo(t);
}
function dw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Nn = typeof Object.is == "function" ? Object.is : dw;
function Di(e, t) {
  if (Nn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), s = Object.keys(t);
  if (n.length !== s.length) return !1;
  for (s = 0; s < n.length; s++) {
    var l = n[s];
    if (!Ac.call(t, l) || !Nn(e[l], t[l])) return !1;
  }
  return !0;
}
function of(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function af(e, t) {
  var n = of(e);
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
    n = of(n);
  }
}
function Km(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Km(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Gm() {
  for (var e = window, t = po(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = po(e.document);
  }
  return t;
}
function nd(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function hw(e) {
  var t = Gm(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Km(n.ownerDocument.documentElement, n)) {
    if (s !== null && nd(n)) {
      if (t = s.start, e = s.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(s.start, l);
        s = s.end === void 0 ? i : Math.min(s.end, l), !e.extend && i > s && (l = s, s = i, i = l), l = af(n, i);
        var r = af(
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
var fw = Vn && "documentMode" in document && 11 >= document.documentMode, vl = null, Jc = null, Mi = null, eu = !1;
function cf(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  eu || vl == null || vl !== po(s) || (s = vl, "selectionStart" in s && nd(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Mi && Di(Mi, s) || (Mi = s, s = So(Jc, "onSelect"), 0 < s.length && (t = new Ju("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = vl)));
}
function Dr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var wl = { animationend: Dr("Animation", "AnimationEnd"), animationiteration: Dr("Animation", "AnimationIteration"), animationstart: Dr("Animation", "AnimationStart"), transitionend: Dr("Transition", "TransitionEnd") }, Ka = {}, Qm = {};
Vn && (Qm = document.createElement("div").style, "AnimationEvent" in window || (delete wl.animationend.animation, delete wl.animationiteration.animation, delete wl.animationstart.animation), "TransitionEvent" in window || delete wl.transitionend.transition);
function qo(e) {
  if (Ka[e]) return Ka[e];
  if (!wl[e]) return e;
  var t = wl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Qm) return Ka[e] = t[n];
  return e;
}
var Zm = qo("animationend"), qm = qo("animationiteration"), Jm = qo("animationstart"), eg = qo("transitionend"), tg = /* @__PURE__ */ new Map(), uf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ks(e, t) {
  tg.set(e, t), el(t, [e]);
}
for (var Ga = 0; Ga < uf.length; Ga++) {
  var Qa = uf[Ga], pw = Qa.toLowerCase(), mw = Qa[0].toUpperCase() + Qa.slice(1);
  ks(pw, "on" + mw);
}
ks(Zm, "onAnimationEnd");
ks(qm, "onAnimationIteration");
ks(Jm, "onAnimationStart");
ks("dblclick", "onDoubleClick");
ks("focusin", "onFocus");
ks("focusout", "onBlur");
ks(eg, "onTransitionEnd");
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
var gi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), gw = new Set("cancel close invalid load scroll toggle".split(" ").concat(gi));
function df(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, pv(s, t, void 0, e), e.currentTarget = null;
}
function ng(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var s = e[n], l = s.event;
    s = s.listeners;
    e: {
      var i = void 0;
      if (t) for (var r = s.length - 1; 0 <= r; r--) {
        var a = s[r], c = a.instance, u = a.currentTarget;
        if (a = a.listener, c !== i && l.isPropagationStopped()) break e;
        df(l, a, u), i = c;
      }
      else for (r = 0; r < s.length; r++) {
        if (a = s[r], c = a.instance, u = a.currentTarget, a = a.listener, c !== i && l.isPropagationStopped()) break e;
        df(l, a, u), i = c;
      }
    }
  }
  if (go) throw e = Gc, go = !1, Gc = null, e;
}
function He(e, t) {
  var n = t[iu];
  n === void 0 && (n = t[iu] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  n.has(s) || (sg(t, e, 2, !1), n.add(s));
}
function Za(e, t, n) {
  var s = 0;
  t && (s |= 4), sg(n, e, s, t);
}
var Br = "_reactListening" + Math.random().toString(36).slice(2);
function Bi(e) {
  if (!e[Br]) {
    e[Br] = !0, um.forEach(function(n) {
      n !== "selectionchange" && (gw.has(n) || Za(n, !1, e), Za(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Br] || (t[Br] = !0, Za("selectionchange", !1, t));
  }
}
function sg(e, t, n, s) {
  switch (Fm(t)) {
    case 1:
      var l = Pv;
      break;
    case 4:
      l = Iv;
      break;
    default:
      l = Zu;
  }
  n = l.bind(null, t, n, e), l = void 0, !Kc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), s ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function qa(e, t, n, s, l) {
  var i = s;
  if (!(t & 1) && !(t & 2) && s !== null) e: for (; ; ) {
    if (s === null) return;
    var r = s.tag;
    if (r === 3 || r === 4) {
      var a = s.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (r === 4) for (r = s.return; r !== null; ) {
        var c = r.tag;
        if ((c === 3 || c === 4) && (c = r.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        r = r.return;
      }
      for (; a !== null; ) {
        if (r = Xs(a), r === null) return;
        if (c = r.tag, c === 5 || c === 6) {
          s = i = r;
          continue e;
        }
        a = a.parentNode;
      }
    }
    s = s.return;
  }
  km(function() {
    var u = i, h = Vu(n), p = [];
    e: {
      var d = tg.get(e);
      if (d !== void 0) {
        var f = Ju, g = e;
        switch (e) {
          case "keypress":
            if (to(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = $v;
            break;
          case "focusin":
            g = "focus", f = Ua;
            break;
          case "focusout":
            g = "blur", f = Ua;
            break;
          case "beforeblur":
          case "afterblur":
            f = Ua;
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
            f = qh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            f = Av;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = Gv;
            break;
          case Zm:
          case qm:
          case Jm:
            f = Bv;
            break;
          case eg:
            f = Zv;
            break;
          case "scroll":
            f = Ev;
            break;
          case "wheel":
            f = Jv;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = Xv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            f = ef;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", v = w ? d !== null ? d + "Capture" : null : d;
        w = [];
        for (var m = u, x; m !== null; ) {
          x = m;
          var S = x.stateNode;
          if (x.tag === 5 && S !== null && (x = S, v !== null && (S = Ii(m, v), S != null && w.push(Yi(m, S, x)))), M) break;
          m = m.return;
        }
        0 < w.length && (d = new f(d, g, null, n, h), p.push({ event: d, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", d && n !== $c && (g = n.relatedTarget || n.fromElement) && (Xs(g) || g[Kn])) break e;
        if ((f || d) && (d = h.window === h ? h : (d = h.ownerDocument) ? d.defaultView || d.parentWindow : window, f ? (g = n.relatedTarget || n.toElement, f = u, g = g ? Xs(g) : null, g !== null && (M = tl(g), g !== M || g.tag !== 5 && g.tag !== 6) && (g = null)) : (f = null, g = u), f !== g)) {
          if (w = qh, S = "onMouseLeave", v = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (w = ef, S = "onPointerLeave", v = "onPointerEnter", m = "pointer"), M = f == null ? d : Sl(f), x = g == null ? d : Sl(g), d = new w(S, m + "leave", f, n, h), d.target = M, d.relatedTarget = x, S = null, Xs(h) === u && (w = new w(v, m + "enter", g, n, h), w.target = x, w.relatedTarget = M, S = w), M = S, f && g) t: {
            for (w = f, v = g, m = 0, x = w; x; x = dl(x)) m++;
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
          f !== null && hf(p, d, f, w, !1), g !== null && M !== null && hf(p, M, g, w, !0);
        }
      }
      e: {
        if (d = u ? Sl(u) : window, f = d.nodeName && d.nodeName.toLowerCase(), f === "select" || f === "input" && d.type === "file") var b = rw;
        else if (sf(d)) if ($m) b = uw;
        else {
          b = aw;
          var _ = ow;
        }
        else (f = d.nodeName) && f.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (b = cw);
        if (b && (b = b(e, u))) {
          Um(p, b, n, h);
          break e;
        }
        _ && _(e, d, u), e === "focusout" && (_ = d._wrapperState) && _.controlled && d.type === "number" && Oc(d, "number", d.value);
      }
      switch (_ = u ? Sl(u) : window, e) {
        case "focusin":
          (sf(_) || _.contentEditable === "true") && (vl = _, Jc = u, Mi = null);
          break;
        case "focusout":
          Mi = Jc = vl = null;
          break;
        case "mousedown":
          eu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          eu = !1, cf(p, n, h);
          break;
        case "selectionchange":
          if (fw) break;
        case "keydown":
        case "keyup":
          cf(p, n, h);
      }
      var k;
      if (td) e: {
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
      else yl ? Hm(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (zm && n.locale !== "ko" && (yl || j !== "onCompositionStart" ? j === "onCompositionEnd" && yl && (k = Om()) : (ps = h, qu = "value" in ps ? ps.value : ps.textContent, yl = !0)), _ = So(u, j), 0 < _.length && (j = new Jh(j, e, null, n, h), p.push({ event: j, listeners: _ }), k ? j.data = k : (k = Wm(n), k !== null && (j.data = k)))), (k = tw ? nw(e, n) : sw(e, n)) && (u = So(u, "onBeforeInput"), 0 < u.length && (h = new Jh("onBeforeInput", "beforeinput", null, n, h), p.push({ event: h, listeners: u }), h.data = k));
    }
    ng(p, t);
  });
}
function Yi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function So(e, t) {
  for (var n = t + "Capture", s = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Ii(e, n), i != null && s.unshift(Yi(e, i, l)), i = Ii(e, t), i != null && s.push(Yi(e, i, l))), e = e.return;
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
function hf(e, t, n, s, l) {
  for (var i = t._reactName, r = []; n !== null && n !== s; ) {
    var a = n, c = a.alternate, u = a.stateNode;
    if (c !== null && c === s) break;
    a.tag === 5 && u !== null && (a = u, l ? (c = Ii(n, i), c != null && r.unshift(Yi(n, c, a))) : l || (c = Ii(n, i), c != null && r.push(Yi(n, c, a)))), n = n.return;
  }
  r.length !== 0 && e.push({ event: t, listeners: r });
}
var xw = /\r\n?/g, yw = /\u0000|\uFFFD/g;
function ff(e) {
  return (typeof e == "string" ? e : "" + e).replace(xw, `
`).replace(yw, "");
}
function Yr(e, t, n) {
  if (t = ff(t), ff(e) !== t && n) throw Error(H(425));
}
function Mo() {
}
var tu = null, nu = null;
function su(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var lu = typeof setTimeout == "function" ? setTimeout : void 0, vw = typeof clearTimeout == "function" ? clearTimeout : void 0, pf = typeof Promise == "function" ? Promise : void 0, ww = typeof queueMicrotask == "function" ? queueMicrotask : typeof pf < "u" ? function(e) {
  return pf.resolve(null).then(e).catch(Sw);
} : lu;
function Sw(e) {
  setTimeout(function() {
    throw e;
  });
}
function Ja(e, t) {
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
function mf(e) {
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
var Gl = Math.random().toString(36).slice(2), Dn = "__reactFiber$" + Gl, Xi = "__reactProps$" + Gl, Kn = "__reactContainer$" + Gl, iu = "__reactEvents$" + Gl, Mw = "__reactListeners$" + Gl, bw = "__reactHandles$" + Gl;
function Xs(e) {
  var t = e[Dn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Kn] || n[Dn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = mf(e); e !== null; ) {
        if (n = e[Dn]) return n;
        e = mf(e);
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
function Jo(e) {
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
function bo() {
  We(Ht), We(Pt);
}
function gf(e, t, n) {
  if (Pt.current !== Ts) throw Error(H(168));
  Xe(Pt, t), Xe(Ht, n);
}
function lg(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(H(108, ov(e) || "Unknown", l));
  return et({}, n, s);
}
function _o(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ts, $s = Pt.current, Xe(Pt, e), Xe(Ht, Ht.current), !0;
}
function xf(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(H(169));
  n ? (e = lg(e, t, $s), s.__reactInternalMemoizedMergedChildContext = e, We(Ht), We(Pt), Xe(Pt, e)) : We(Ht), Xe(Ht, n);
}
var zn = null, ea = !1, ec = !1;
function ig(e) {
  zn === null ? zn = [e] : zn.push(e);
}
function _w(e) {
  ea = !0, ig(e);
}
function js() {
  if (!ec && zn !== null) {
    ec = !0;
    var e = 0, t = Le;
    try {
      var n = zn;
      for (Le = 1; e < n.length; e++) {
        var s = n[e];
        do
          s = s(!0);
        while (s !== null);
      }
      zn = null, ea = !1;
    } catch (l) {
      throw zn !== null && (zn = zn.slice(e + 1)), Pm(Ku, js), l;
    } finally {
      Le = t, ec = !1;
    }
  }
  return null;
}
var bl = [], _l = 0, To = null, ko = 0, dn = [], hn = 0, Vs = null, Hn = 1, Wn = "";
function Ds(e, t) {
  bl[_l++] = ko, bl[_l++] = To, To = e, ko = t;
}
function rg(e, t, n) {
  dn[hn++] = Hn, dn[hn++] = Wn, dn[hn++] = Vs, Vs = e;
  var s = Hn;
  e = Wn;
  var l = 32 - Cn(s) - 1;
  s &= ~(1 << l), n += 1;
  var i = 32 - Cn(t) + l;
  if (30 < i) {
    var r = l - l % 5;
    i = (s & (1 << r) - 1).toString(32), s >>= r, l -= r, Hn = 1 << 32 - Cn(t) + l | n << l | s, Wn = i + e;
  } else Hn = 1 << i | n << l | s, Wn = e;
}
function sd(e) {
  e.return !== null && (Ds(e, 1), rg(e, 1, 0));
}
function ld(e) {
  for (; e === To; ) To = bl[--_l], bl[_l] = null, ko = bl[--_l], bl[_l] = null;
  for (; e === Vs; ) Vs = dn[--hn], dn[hn] = null, Wn = dn[--hn], dn[hn] = null, Hn = dn[--hn], dn[hn] = null;
}
var Zt = null, Qt = null, Qe = !1, kn = null;
function og(e, t) {
  var n = pn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function yf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Zt = e, Qt = vs(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Zt = e, Qt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Vs !== null ? { id: Hn, overflow: Wn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = pn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Zt = e, Qt = null, !0) : !1;
    default:
      return !1;
  }
}
function ou(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function au(e) {
  if (Qe) {
    var t = Qt;
    if (t) {
      var n = t;
      if (!yf(e, t)) {
        if (ou(e)) throw Error(H(418));
        t = vs(n.nextSibling);
        var s = Zt;
        t && yf(e, t) ? og(s, n) : (e.flags = e.flags & -4097 | 2, Qe = !1, Zt = e);
      }
    } else {
      if (ou(e)) throw Error(H(418));
      e.flags = e.flags & -4097 | 2, Qe = !1, Zt = e;
    }
  }
}
function vf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Zt = e;
}
function Xr(e) {
  if (e !== Zt) return !1;
  if (!Qe) return vf(e), Qe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !su(e.type, e.memoizedProps)), t && (t = Qt)) {
    if (ou(e)) throw ag(), Error(H(418));
    for (; t; ) og(e, t), t = vs(t.nextSibling);
  }
  if (vf(e), e.tag === 13) {
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
function ag() {
  for (var e = Qt; e; ) e = vs(e.nextSibling);
}
function Yl() {
  Qt = Zt = null, Qe = !1;
}
function id(e) {
  kn === null ? kn = [e] : kn.push(e);
}
var Tw = qn.ReactCurrentBatchConfig;
function ri(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(H(309));
        var s = n.stateNode;
      }
      if (!s) throw Error(H(147, e));
      var l = s, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(r) {
        var a = l.refs;
        r === null ? delete a[i] : a[i] = r;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(H(284));
    if (!n._owner) throw Error(H(290, e));
  }
  return e;
}
function Fr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(H(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function wf(e) {
  var t = e._init;
  return t(e._payload);
}
function cg(e) {
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
  function r(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, m, x, S) {
    return m === null || m.tag !== 6 ? (m = oc(x, v.mode, S), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function c(v, m, x, S) {
    var b = x.type;
    return b === xl ? h(v, m, x.props.children, S, x.key) : m !== null && (m.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && wf(b) === m.type) ? (S = l(m, x.props), S.ref = ri(v, m, x), S.return = v, S) : (S = ao(x.type, x.key, x.props, null, v.mode, S), S.ref = ri(v, m, x), S.return = v, S);
  }
  function u(v, m, x, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== x.containerInfo || m.stateNode.implementation !== x.implementation ? (m = ac(x, v.mode, S), m.return = v, m) : (m = l(m, x.children || []), m.return = v, m);
  }
  function h(v, m, x, S, b) {
    return m === null || m.tag !== 7 ? (m = Ws(x, v.mode, S, b), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function p(v, m, x) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = oc("" + m, v.mode, x), m.return = v, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Nr:
          return x = ao(m.type, m.key, m.props, null, v.mode, x), x.ref = ri(v, null, m), x.return = v, x;
        case gl:
          return m = ac(m, v.mode, x), m.return = v, m;
        case as:
          var S = m._init;
          return p(v, S(m._payload), x);
      }
      if (pi(m) || ti(m)) return m = Ws(m, v.mode, x, null), m.return = v, m;
      Fr(v, m);
    }
    return null;
  }
  function d(v, m, x, S) {
    var b = m !== null ? m.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return b !== null ? null : a(v, m, "" + x, S);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Nr:
          return x.key === b ? c(v, m, x, S) : null;
        case gl:
          return x.key === b ? u(v, m, x, S) : null;
        case as:
          return b = x._init, d(
            v,
            m,
            b(x._payload),
            S
          );
      }
      if (pi(x) || ti(x)) return b !== null ? null : h(v, m, x, S, null);
      Fr(v, x);
    }
    return null;
  }
  function f(v, m, x, S, b) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return v = v.get(x) || null, a(m, v, "" + S, b);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Nr:
          return v = v.get(S.key === null ? x : S.key) || null, c(m, v, S, b);
        case gl:
          return v = v.get(S.key === null ? x : S.key) || null, u(m, v, S, b);
        case as:
          var _ = S._init;
          return f(v, m, x, _(S._payload), b);
      }
      if (pi(S) || ti(S)) return v = v.get(x) || null, h(m, v, S, b, null);
      Fr(m, S);
    }
    return null;
  }
  function g(v, m, x, S) {
    for (var b = null, _ = null, k = m, j = m = 0, A = null; k !== null && j < x.length; j++) {
      k.index > j ? (A = k, k = null) : A = k.sibling;
      var L = d(v, k, x[j], S);
      if (L === null) {
        k === null && (k = A);
        break;
      }
      e && k && L.alternate === null && t(v, k), m = i(L, m, j), _ === null ? b = L : _.sibling = L, _ = L, k = A;
    }
    if (j === x.length) return n(v, k), Qe && Ds(v, j), b;
    if (k === null) {
      for (; j < x.length; j++) k = p(v, x[j], S), k !== null && (m = i(k, m, j), _ === null ? b = k : _.sibling = k, _ = k);
      return Qe && Ds(v, j), b;
    }
    for (k = s(v, k); j < x.length; j++) A = f(k, v, j, x[j], S), A !== null && (e && A.alternate !== null && k.delete(A.key === null ? j : A.key), m = i(A, m, j), _ === null ? b = A : _.sibling = A, _ = A);
    return e && k.forEach(function(Y) {
      return t(v, Y);
    }), Qe && Ds(v, j), b;
  }
  function w(v, m, x, S) {
    var b = ti(x);
    if (typeof b != "function") throw Error(H(150));
    if (x = b.call(x), x == null) throw Error(H(151));
    for (var _ = b = null, k = m, j = m = 0, A = null, L = x.next(); k !== null && !L.done; j++, L = x.next()) {
      k.index > j ? (A = k, k = null) : A = k.sibling;
      var Y = d(v, k, L.value, S);
      if (Y === null) {
        k === null && (k = A);
        break;
      }
      e && k && Y.alternate === null && t(v, k), m = i(Y, m, j), _ === null ? b = Y : _.sibling = Y, _ = Y, k = A;
    }
    if (L.done) return n(
      v,
      k
    ), Qe && Ds(v, j), b;
    if (k === null) {
      for (; !L.done; j++, L = x.next()) L = p(v, L.value, S), L !== null && (m = i(L, m, j), _ === null ? b = L : _.sibling = L, _ = L);
      return Qe && Ds(v, j), b;
    }
    for (k = s(v, k); !L.done; j++, L = x.next()) L = f(k, v, j, L.value, S), L !== null && (e && L.alternate !== null && k.delete(L.key === null ? j : L.key), m = i(L, m, j), _ === null ? b = L : _.sibling = L, _ = L);
    return e && k.forEach(function(N) {
      return t(v, N);
    }), Qe && Ds(v, j), b;
  }
  function M(v, m, x, S) {
    if (typeof x == "object" && x !== null && x.type === xl && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Nr:
          e: {
            for (var b = x.key, _ = m; _ !== null; ) {
              if (_.key === b) {
                if (b = x.type, b === xl) {
                  if (_.tag === 7) {
                    n(v, _.sibling), m = l(_, x.props.children), m.return = v, v = m;
                    break e;
                  }
                } else if (_.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && wf(b) === _.type) {
                  n(v, _.sibling), m = l(_, x.props), m.ref = ri(v, _, x), m.return = v, v = m;
                  break e;
                }
                n(v, _);
                break;
              } else t(v, _);
              _ = _.sibling;
            }
            x.type === xl ? (m = Ws(x.props.children, v.mode, S, x.key), m.return = v, v = m) : (S = ao(x.type, x.key, x.props, null, v.mode, S), S.ref = ri(v, m, x), S.return = v, v = S);
          }
          return r(v);
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
            m = ac(x, v.mode, S), m.return = v, v = m;
          }
          return r(v);
        case as:
          return _ = x._init, M(v, m, _(x._payload), S);
      }
      if (pi(x)) return g(v, m, x, S);
      if (ti(x)) return w(v, m, x, S);
      Fr(v, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, m !== null && m.tag === 6 ? (n(v, m.sibling), m = l(m, x), m.return = v, v = m) : (n(v, m), m = oc(x, v.mode, S), m.return = v, v = m), r(v)) : n(v, m);
  }
  return M;
}
var Xl = cg(!0), ug = cg(!1), Co = Cs(null), jo = null, Tl = null, rd = null;
function od() {
  rd = Tl = jo = null;
}
function ad(e) {
  var t = Co.current;
  We(Co), e._currentValue = t;
}
function cu(e, t, n) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function El(e, t) {
  jo = e, rd = Tl = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ft = !0), e.firstContext = null);
}
function yn(e) {
  var t = e._currentValue;
  if (rd !== e) if (e = { context: e, memoizedValue: t, next: null }, Tl === null) {
    if (jo === null) throw Error(H(308));
    Tl = e, jo.dependencies = { lanes: 0, firstContext: e };
  } else Tl = Tl.next = e;
  return t;
}
var Fs = null;
function cd(e) {
  Fs === null ? Fs = [e] : Fs.push(e);
}
function dg(e, t, n, s) {
  var l = t.interleaved;
  return l === null ? (n.next = n, cd(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Gn(e, s);
}
function Gn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var cs = !1;
function ud(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function hg(e, t) {
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
  return l = s.interleaved, l === null ? (t.next = t, cd(s)) : (t.next = l.next, l.next = t), s.interleaved = t, Gn(e, n);
}
function no(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Gu(e, n);
  }
}
function Sf(e, t) {
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
function No(e, t, n, s) {
  var l = e.updateQueue;
  cs = !1;
  var i = l.firstBaseUpdate, r = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, u = c.next;
    c.next = null, r === null ? i = u : r.next = u, r = c;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, a = h.lastBaseUpdate, a !== r && (a === null ? h.firstBaseUpdate = u : a.next = u, h.lastBaseUpdate = c));
  }
  if (i !== null) {
    var p = l.baseState;
    r = 0, h = u = c = null, a = i;
    do {
      var d = a.lane, f = a.eventTime;
      if ((s & d) === d) {
        h !== null && (h = h.next = {
          eventTime: f,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, w = a;
          switch (d = t, f = n, w.tag) {
            case 1:
              if (g = w.payload, typeof g == "function") {
                p = g.call(f, p, d);
                break e;
              }
              p = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = w.payload, d = typeof g == "function" ? g.call(f, p, d) : g, d == null) break e;
              p = et({}, p, d);
              break e;
            case 2:
              cs = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, d = l.effects, d === null ? l.effects = [a] : d.push(a));
      } else f = { eventTime: f, lane: d, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, h === null ? (u = h = f, c = p) : h = h.next = f, r |= d;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        d = a, a = d.next, d.next = null, l.lastBaseUpdate = d, l.shared.pending = null;
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
function Mf(e, t, n) {
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
function dd(e, t) {
  switch (Xe(Oi, t), Xe(Fi, e), Xe(Yn, Qi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Hc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Hc(t, e);
  }
  We(Yn), Xe(Yn, t);
}
function Fl() {
  We(Yn), We(Fi), We(Oi);
}
function fg(e) {
  Os(Oi.current);
  var t = Os(Yn.current), n = Hc(t, e.type);
  t !== n && (Xe(Fi, e), Xe(Yn, n));
}
function hd(e) {
  Fi.current === e && (We(Yn), We(Fi));
}
var qe = Cs(0);
function Po(e) {
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
var tc = [];
function fd() {
  for (var e = 0; e < tc.length; e++) tc[e]._workInProgressVersionPrimary = null;
  tc.length = 0;
}
var so = qn.ReactCurrentDispatcher, nc = qn.ReactCurrentBatchConfig, Ks = 0, Je = null, ht = null, gt = null, Io = !1, bi = !1, zi = 0, kw = 0;
function kt() {
  throw Error(H(321));
}
function pd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Nn(e[n], t[n])) return !1;
  return !0;
}
function md(e, t, n, s, l, i) {
  if (Ks = i, Je = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, so.current = e === null || e.memoizedState === null ? Pw : Iw, e = n(s, l), bi) {
    i = 0;
    do {
      if (bi = !1, zi = 0, 25 <= i) throw Error(H(301));
      i += 1, gt = ht = null, t.updateQueue = null, so.current = Ew, e = n(s, l);
    } while (bi);
  }
  if (so.current = Eo, t = ht !== null && ht.next !== null, Ks = 0, gt = ht = Je = null, Io = !1, t) throw Error(H(300));
  return e;
}
function gd() {
  var e = zi !== 0;
  return zi = 0, e;
}
function Ln() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return gt === null ? Je.memoizedState = gt = e : gt = gt.next = e, gt;
}
function vn() {
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
function sc(e) {
  var t = vn(), n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var s = ht, l = s.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var r = l.next;
      l.next = i.next, i.next = r;
    }
    s.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, s = s.baseState;
    var a = r = null, c = null, u = i;
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
        c === null ? (a = c = p, r = s) : c = c.next = p, Je.lanes |= h, Gs |= h;
      }
      u = u.next;
    } while (u !== null && u !== i);
    c === null ? r = s : c.next = a, Nn(s, t.memoizedState) || (Ft = !0), t.memoizedState = s, t.baseState = r, t.baseQueue = c, n.lastRenderedState = s;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, Je.lanes |= i, Gs |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function lc(e) {
  var t = vn(), n = t.queue;
  if (n === null) throw Error(H(311));
  n.lastRenderedReducer = e;
  var s = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var r = l = l.next;
    do
      i = e(i, r.action), r = r.next;
    while (r !== l);
    Nn(i, t.memoizedState) || (Ft = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, s];
}
function pg() {
}
function mg(e, t) {
  var n = Je, s = vn(), l = t(), i = !Nn(s.memoizedState, l);
  if (i && (s.memoizedState = l, Ft = !0), s = s.queue, xd(yg.bind(null, n, s, e), [e]), s.getSnapshot !== t || i || gt !== null && gt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Wi(9, xg.bind(null, n, s, l, t), void 0, null), xt === null) throw Error(H(349));
    Ks & 30 || gg(n, t, l);
  }
  return l;
}
function gg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Je.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Je.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function xg(e, t, n, s) {
  t.value = n, t.getSnapshot = s, vg(t) && wg(e);
}
function yg(e, t, n) {
  return n(function() {
    vg(t) && wg(e);
  });
}
function vg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Nn(e, n);
  } catch {
    return !0;
  }
}
function wg(e) {
  var t = Gn(e, 1);
  t !== null && jn(t, e, 1, -1);
}
function bf(e) {
  var t = Ln();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Hi, lastRenderedState: e }, t.queue = e, e = e.dispatch = Nw.bind(null, Je, e), [t.memoizedState, e];
}
function Wi(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = Je.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Je.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function Sg() {
  return vn().memoizedState;
}
function lo(e, t, n, s) {
  var l = Ln();
  Je.flags |= e, l.memoizedState = Wi(1 | t, n, void 0, s === void 0 ? null : s);
}
function ta(e, t, n, s) {
  var l = vn();
  s = s === void 0 ? null : s;
  var i = void 0;
  if (ht !== null) {
    var r = ht.memoizedState;
    if (i = r.destroy, s !== null && pd(s, r.deps)) {
      l.memoizedState = Wi(t, n, i, s);
      return;
    }
  }
  Je.flags |= e, l.memoizedState = Wi(1 | t, n, i, s);
}
function _f(e, t) {
  return lo(8390656, 8, e, t);
}
function xd(e, t) {
  return ta(2048, 8, e, t);
}
function Mg(e, t) {
  return ta(4, 2, e, t);
}
function bg(e, t) {
  return ta(4, 4, e, t);
}
function _g(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Tg(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ta(4, 4, _g.bind(null, t, e), n);
}
function yd() {
}
function kg(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && pd(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function Cg(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && pd(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function jg(e, t, n) {
  return Ks & 21 ? (Nn(n, t) || (n = Rm(), Je.lanes |= n, Gs |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ft = !0), e.memoizedState = n);
}
function Cw(e, t) {
  var n = Le;
  Le = n !== 0 && 4 > n ? n : 4, e(!0);
  var s = nc.transition;
  nc.transition = {};
  try {
    e(!1), t();
  } finally {
    Le = n, nc.transition = s;
  }
}
function Ng() {
  return vn().memoizedState;
}
function jw(e, t, n) {
  var s = Ms(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, Pg(e)) Ig(t, n);
  else if (n = dg(e, t, n, s), n !== null) {
    var l = Lt();
    jn(n, e, s, l), Eg(n, t, s);
  }
}
function Nw(e, t, n) {
  var s = Ms(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Pg(e)) Ig(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var r = t.lastRenderedState, a = i(r, n);
      if (l.hasEagerState = !0, l.eagerState = a, Nn(a, r)) {
        var c = t.interleaved;
        c === null ? (l.next = l, cd(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = dg(e, t, l, s), n !== null && (l = Lt(), jn(n, e, s, l), Eg(n, t, s));
  }
}
function Pg(e) {
  var t = e.alternate;
  return e === Je || t !== null && t === Je;
}
function Ig(e, t) {
  bi = Io = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Eg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Gu(e, n);
  }
}
var Eo = { readContext: yn, useCallback: kt, useContext: kt, useEffect: kt, useImperativeHandle: kt, useInsertionEffect: kt, useLayoutEffect: kt, useMemo: kt, useReducer: kt, useRef: kt, useState: kt, useDebugValue: kt, useDeferredValue: kt, useTransition: kt, useMutableSource: kt, useSyncExternalStore: kt, useId: kt, unstable_isNewReconciler: !1 }, Pw = { readContext: yn, useCallback: function(e, t) {
  return Ln().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: yn, useEffect: _f, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, lo(
    4194308,
    4,
    _g.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return lo(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return lo(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ln();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var s = Ln();
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = jw.bind(null, Je, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = Ln();
  return e = { current: e }, t.memoizedState = e;
}, useState: bf, useDebugValue: yd, useDeferredValue: function(e) {
  return Ln().memoizedState = e;
}, useTransition: function() {
  var e = bf(!1), t = e[0];
  return e = Cw.bind(null, e[1]), Ln().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = Je, l = Ln();
  if (Qe) {
    if (n === void 0) throw Error(H(407));
    n = n();
  } else {
    if (n = t(), xt === null) throw Error(H(349));
    Ks & 30 || gg(s, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, _f(yg.bind(
    null,
    s,
    i,
    e
  ), [e]), s.flags |= 2048, Wi(9, xg.bind(null, s, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ln(), t = xt.identifierPrefix;
  if (Qe) {
    var n = Wn, s = Hn;
    n = (s & ~(1 << 32 - Cn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = kw++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Iw = {
  readContext: yn,
  useCallback: kg,
  useContext: yn,
  useEffect: xd,
  useImperativeHandle: Tg,
  useInsertionEffect: Mg,
  useLayoutEffect: bg,
  useMemo: Cg,
  useReducer: sc,
  useRef: Sg,
  useState: function() {
    return sc(Hi);
  },
  useDebugValue: yd,
  useDeferredValue: function(e) {
    var t = vn();
    return jg(t, ht.memoizedState, e);
  },
  useTransition: function() {
    var e = sc(Hi)[0], t = vn().memoizedState;
    return [e, t];
  },
  useMutableSource: pg,
  useSyncExternalStore: mg,
  useId: Ng,
  unstable_isNewReconciler: !1
}, Ew = { readContext: yn, useCallback: kg, useContext: yn, useEffect: xd, useImperativeHandle: Tg, useInsertionEffect: Mg, useLayoutEffect: bg, useMemo: Cg, useReducer: lc, useRef: Sg, useState: function() {
  return lc(Hi);
}, useDebugValue: yd, useDeferredValue: function(e) {
  var t = vn();
  return ht === null ? t.memoizedState = e : jg(t, ht.memoizedState, e);
}, useTransition: function() {
  var e = lc(Hi)[0], t = vn().memoizedState;
  return [e, t];
}, useMutableSource: pg, useSyncExternalStore: mg, useId: Ng, unstable_isNewReconciler: !1 };
function bn(e, t) {
  if (e && e.defaultProps) {
    t = et({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function uu(e, t, n, s) {
  t = e.memoizedState, n = n(s, t), n = n == null ? t : et({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var na = { isMounted: function(e) {
  return (e = e._reactInternals) ? tl(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var s = Lt(), l = Ms(e), i = Un(s, l);
  i.payload = t, n != null && (i.callback = n), t = ws(e, i, l), t !== null && (jn(t, e, l, s), no(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var s = Lt(), l = Ms(e), i = Un(s, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = ws(e, i, l), t !== null && (jn(t, e, l, s), no(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Lt(), s = Ms(e), l = Un(n, s);
  l.tag = 2, t != null && (l.callback = t), t = ws(e, l, s), t !== null && (jn(t, e, s, n), no(t, e, s));
} };
function Tf(e, t, n, s, l, i, r) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, i, r) : t.prototype && t.prototype.isPureReactComponent ? !Di(n, s) || !Di(l, i) : !0;
}
function Rg(e, t, n) {
  var s = !1, l = Ts, i = t.contextType;
  return typeof i == "object" && i !== null ? i = yn(i) : (l = Wt(t) ? $s : Pt.current, s = t.contextTypes, i = (s = s != null) ? Bl(e, l) : Ts), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = na, e.stateNode = t, t._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function kf(e, t, n, s) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, s), t.state !== e && na.enqueueReplaceState(t, t.state, null);
}
function du(e, t, n, s) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, ud(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = yn(i) : (i = Wt(t) ? $s : Pt.current, l.context = Bl(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (uu(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && na.enqueueReplaceState(l, l.state, null), No(e, n, l, s), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
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
function ic(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function hu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Rw = typeof WeakMap == "function" ? WeakMap : Map;
function Ag(e, t, n) {
  n = Un(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    Ao || (Ao = !0, Mu = s), hu(e, t);
  }, n;
}
function Lg(e, t, n) {
  n = Un(-1, n), n.tag = 3;
  var s = e.type.getDerivedStateFromError;
  if (typeof s == "function") {
    var l = t.value;
    n.payload = function() {
      return s(l);
    }, n.callback = function() {
      hu(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    hu(e, t), typeof s != "function" && (Ss === null ? Ss = /* @__PURE__ */ new Set([this]) : Ss.add(this));
    var r = t.stack;
    this.componentDidCatch(t.value, { componentStack: r !== null ? r : "" });
  }), n;
}
function Cf(e, t, n) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new Rw();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = Vw.bind(null, e, t, n), t.then(e, e));
}
function jf(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Nf(e, t, n, s, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Un(-1, 1), t.tag = 2, ws(n, t, 1))), n.lanes |= 1), e);
}
var Aw = qn.ReactCurrentOwner, Ft = !1;
function At(e, t, n, s) {
  t.child = e === null ? ug(t, null, n, s) : Xl(t, e.child, n, s);
}
function Pf(e, t, n, s, l) {
  n = n.render;
  var i = t.ref;
  return El(t, l), s = md(e, t, n, s, i, l), n = gd(), e !== null && !Ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qn(e, t, l)) : (Qe && n && sd(t), t.flags |= 1, At(e, t, s, l), t.child);
}
function If(e, t, n, s, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !kd(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Dg(e, t, i, s, l)) : (e = ao(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var r = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Di, n(r, s) && e.ref === t.ref) return Qn(e, t, l);
  }
  return t.flags |= 1, e = bs(i, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Dg(e, t, n, s, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Di(i, s) && e.ref === t.ref) if (Ft = !1, t.pendingProps = s = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ft = !0);
    else return t.lanes = e.lanes, Qn(e, t, l);
  }
  return fu(e, t, n, s, l);
}
function Bg(e, t, n) {
  var s = t.pendingProps, l = s.children, i = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Xe(Cl, Kt), Kt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Xe(Cl, Kt), Kt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = i !== null ? i.baseLanes : n, Xe(Cl, Kt), Kt |= s;
  }
  else i !== null ? (s = i.baseLanes | n, t.memoizedState = null) : s = n, Xe(Cl, Kt), Kt |= s;
  return At(e, t, l, n), t.child;
}
function Yg(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function fu(e, t, n, s, l) {
  var i = Wt(n) ? $s : Pt.current;
  return i = Bl(t, i), El(t, l), n = md(e, t, n, s, i, l), s = gd(), e !== null && !Ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qn(e, t, l)) : (Qe && s && sd(t), t.flags |= 1, At(e, t, n, l), t.child);
}
function Ef(e, t, n, s, l) {
  if (Wt(n)) {
    var i = !0;
    _o(t);
  } else i = !1;
  if (El(t, l), t.stateNode === null) io(e, t), Rg(t, n, s), du(t, n, s, l), s = !0;
  else if (e === null) {
    var r = t.stateNode, a = t.memoizedProps;
    r.props = a;
    var c = r.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = yn(u) : (u = Wt(n) ? $s : Pt.current, u = Bl(t, u));
    var h = n.getDerivedStateFromProps, p = typeof h == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    p || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (a !== s || c !== u) && kf(t, r, s, u), cs = !1;
    var d = t.memoizedState;
    r.state = d, No(t, s, r, l), c = t.memoizedState, a !== s || d !== c || Ht.current || cs ? (typeof h == "function" && (uu(t, n, h, s), c = t.memoizedState), (a = cs || Tf(t, n, a, s, d, c, u)) ? (p || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = c), r.props = s, r.state = c, r.context = u, s = a) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), s = !1);
  } else {
    r = t.stateNode, hg(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : bn(t.type, a), r.props = u, p = t.pendingProps, d = r.context, c = n.contextType, typeof c == "object" && c !== null ? c = yn(c) : (c = Wt(n) ? $s : Pt.current, c = Bl(t, c));
    var f = n.getDerivedStateFromProps;
    (h = typeof f == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (a !== p || d !== c) && kf(t, r, s, c), cs = !1, d = t.memoizedState, r.state = d, No(t, s, r, l);
    var g = t.memoizedState;
    a !== p || d !== g || Ht.current || cs ? (typeof f == "function" && (uu(t, n, f, s), g = t.memoizedState), (u = cs || Tf(t, n, u, s, d, g, c) || !1) ? (h || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(s, g, c), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(s, g, c)), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = g), r.props = s, r.state = g, r.context = c, s = u) : (typeof r.componentDidUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return pu(e, t, n, s, i, l);
}
function pu(e, t, n, s, l, i) {
  Yg(e, t);
  var r = (t.flags & 128) !== 0;
  if (!s && !r) return l && xf(t, n, !1), Qn(e, t, i);
  s = t.stateNode, Aw.current = t;
  var a = r && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && r ? (t.child = Xl(t, e.child, null, i), t.child = Xl(t, null, a, i)) : At(e, t, a, i), t.memoizedState = s.state, l && xf(t, n, !0), t.child;
}
function Xg(e) {
  var t = e.stateNode;
  t.pendingContext ? gf(e, t.pendingContext, t.pendingContext !== t.context) : t.context && gf(e, t.context, !1), dd(e, t.containerInfo);
}
function Rf(e, t, n, s, l) {
  return Yl(), id(l), t.flags |= 256, At(e, t, n, s), t.child;
}
var mu = { dehydrated: null, treeContext: null, retryLane: 0 };
function gu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Fg(e, t, n) {
  var s = t.pendingProps, l = qe.current, i = !1, r = (t.flags & 128) !== 0, a;
  if ((a = r) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Xe(qe, l & 1), e === null)
    return au(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (r = s.children, e = s.fallback, i ? (s = t.mode, i = t.child, r = { mode: "hidden", children: r }, !(s & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = r) : i = ia(r, s, 0, null), e = Ws(e, s, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = gu(n), t.memoizedState = mu, e) : vd(t, r));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Lw(e, t, r, s, a, l, n);
  if (i) {
    i = s.fallback, r = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: s.children };
    return !(r & 1) && t.child !== l ? (s = t.child, s.childLanes = 0, s.pendingProps = c, t.deletions = null) : (s = bs(l, c), s.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = bs(a, i) : (i = Ws(i, r, n, null), i.flags |= 2), i.return = t, s.return = t, s.sibling = i, t.child = s, s = i, i = t.child, r = e.child.memoizedState, r = r === null ? gu(n) : { baseLanes: r.baseLanes | n, cachePool: null, transitions: r.transitions }, i.memoizedState = r, i.childLanes = e.childLanes & ~n, t.memoizedState = mu, s;
  }
  return i = e.child, e = i.sibling, s = bs(i, { mode: "visible", children: s.children }), !(t.mode & 1) && (s.lanes = n), s.return = t, s.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = s, t.memoizedState = null, s;
}
function vd(e, t) {
  return t = ia({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Or(e, t, n, s) {
  return s !== null && id(s), Xl(t, e.child, null, n), e = vd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Lw(e, t, n, s, l, i, r) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, s = ic(Error(H(422))), Or(e, t, r, s)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = s.fallback, l = t.mode, s = ia({ mode: "visible", children: s.children }, l, 0, null), i = Ws(i, l, r, null), i.flags |= 2, s.return = t, i.return = t, s.sibling = i, t.child = s, t.mode & 1 && Xl(t, e.child, null, r), t.child.memoizedState = gu(r), t.memoizedState = mu, i);
  if (!(t.mode & 1)) return Or(e, t, r, null);
  if (l.data === "$!") {
    if (s = l.nextSibling && l.nextSibling.dataset, s) var a = s.dgst;
    return s = a, i = Error(H(419)), s = ic(i, s, void 0), Or(e, t, r, s);
  }
  if (a = (r & e.childLanes) !== 0, Ft || a) {
    if (s = xt, s !== null) {
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
      l = l & (s.suspendedLanes | r) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Gn(e, l), jn(s, e, l, -1));
    }
    return Td(), s = ic(Error(H(421))), Or(e, t, r, s);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Kw.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Qt = vs(l.nextSibling), Zt = t, Qe = !0, kn = null, e !== null && (dn[hn++] = Hn, dn[hn++] = Wn, dn[hn++] = Vs, Hn = e.id, Wn = e.overflow, Vs = t), t = vd(t, s.children), t.flags |= 4096, t);
}
function Af(e, t, n) {
  e.lanes |= t;
  var s = e.alternate;
  s !== null && (s.lanes |= t), cu(e.return, t, n);
}
function rc(e, t, n, s, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: s, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = s, i.tail = n, i.tailMode = l);
}
function Og(e, t, n) {
  var s = t.pendingProps, l = s.revealOrder, i = s.tail;
  if (At(e, t, s.children, n), s = qe.current, s & 2) s = s & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Af(e, n, t);
      else if (e.tag === 19) Af(e, n, t);
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
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Po(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), rc(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Po(e) === null) {
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
function io(e, t) {
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
function Dw(e, t, n) {
  switch (t.tag) {
    case 3:
      Xg(t), Yl();
      break;
    case 5:
      fg(t);
      break;
    case 1:
      Wt(t.type) && _o(t);
      break;
    case 4:
      dd(t, t.stateNode.containerInfo);
      break;
    case 10:
      var s = t.type._context, l = t.memoizedProps.value;
      Xe(Co, s._currentValue), s._currentValue = l;
      break;
    case 13:
      if (s = t.memoizedState, s !== null)
        return s.dehydrated !== null ? (Xe(qe, qe.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Fg(e, t, n) : (Xe(qe, qe.current & 1), e = Qn(e, t, n), e !== null ? e.sibling : null);
      Xe(qe, qe.current & 1);
      break;
    case 19:
      if (s = (n & t.childLanes) !== 0, e.flags & 128) {
        if (s) return Og(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Xe(qe, qe.current), s) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Bg(e, t, n);
  }
  return Qn(e, t, n);
}
var zg, xu, Hg, Wg;
zg = function(e, t) {
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
xu = function() {
};
Hg = function(e, t, n, s) {
  var l = e.memoizedProps;
  if (l !== s) {
    e = t.stateNode, Os(Yn.current);
    var i = null;
    switch (n) {
      case "input":
        l = Xc(e, l), s = Xc(e, s), i = [];
        break;
      case "select":
        l = et({}, l, { value: void 0 }), s = et({}, s, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = zc(e, l), s = zc(e, s), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof s.onClick == "function" && (e.onclick = Mo);
    }
    Wc(n, s);
    var r;
    n = null;
    for (u in l) if (!s.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var a = l[u];
      for (r in a) a.hasOwnProperty(r) && (n || (n = {}), n[r] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Ni.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in s) {
      var c = s[u];
      if (a = l != null ? l[u] : void 0, s.hasOwnProperty(u) && c !== a && (c != null || a != null)) if (u === "style") if (a) {
        for (r in a) !a.hasOwnProperty(r) || c && c.hasOwnProperty(r) || (n || (n = {}), n[r] = "");
        for (r in c) c.hasOwnProperty(r) && a[r] !== c[r] && (n || (n = {}), n[r] = c[r]);
      } else n || (i || (i = []), i.push(
        u,
        n
      )), n = c;
      else u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (i = i || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (i = i || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Ni.hasOwnProperty(u) ? (c != null && u === "onScroll" && He("scroll", e), i || a === c || (i = [])) : (i = i || []).push(u, c));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Wg = function(e, t, n, s) {
  n !== s && (t.flags |= 4);
};
function oi(e, t) {
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
function Ct(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, s = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags & 14680064, s |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags, s |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= s, e.childLanes = n, t;
}
function Bw(e, t, n) {
  var s = t.pendingProps;
  switch (ld(t), t.tag) {
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
      return Ct(t), null;
    case 1:
      return Wt(t.type) && bo(), Ct(t), null;
    case 3:
      return s = t.stateNode, Fl(), We(Ht), We(Pt), fd(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Xr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, kn !== null && (Tu(kn), kn = null))), xu(e, t), Ct(t), null;
    case 5:
      hd(t);
      var l = Os(Oi.current);
      if (n = t.type, e !== null && t.stateNode != null) Hg(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!s) {
          if (t.stateNode === null) throw Error(H(166));
          return Ct(t), null;
        }
        if (e = Os(Yn.current), Xr(t)) {
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
              zh(s, i), He("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!i.multiple }, He("invalid", s);
              break;
            case "textarea":
              Wh(s, i), He("invalid", s);
          }
          Wc(n, i), l = null;
          for (var r in i) if (i.hasOwnProperty(r)) {
            var a = i[r];
            r === "children" ? typeof a == "string" ? s.textContent !== a && (i.suppressHydrationWarning !== !0 && Yr(s.textContent, a, e), l = ["children", a]) : typeof a == "number" && s.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Yr(
              s.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Ni.hasOwnProperty(r) && a != null && r === "onScroll" && He("scroll", s);
          }
          switch (n) {
            case "input":
              Pr(s), Hh(s, i, !0);
              break;
            case "textarea":
              Pr(s), Uh(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (s.onclick = Mo);
          }
          s = l, t.updateQueue = s, s !== null && (t.flags |= 4);
        } else {
          r = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = ym(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = r.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = r.createElement(n, { is: s.is }) : (e = r.createElement(n), n === "select" && (r = e, s.multiple ? r.multiple = !0 : s.size && (r.size = s.size))) : e = r.createElementNS(e, n), e[Dn] = t, e[Xi] = s, zg(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (r = Uc(n, s), n) {
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
                zh(e, s), l = Xc(e, s), He("invalid", e);
                break;
              case "option":
                l = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, l = et({}, s, { value: void 0 }), He("invalid", e);
                break;
              case "textarea":
                Wh(e, s), l = zc(e, s), He("invalid", e);
                break;
              default:
                l = s;
            }
            Wc(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var c = a[i];
              i === "style" ? Sm(e, c) : i === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && vm(e, c)) : i === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Pi(e, c) : typeof c == "number" && Pi(e, "" + c) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Ni.hasOwnProperty(i) ? c != null && i === "onScroll" && He("scroll", e) : c != null && Hu(e, i, c, r));
            }
            switch (n) {
              case "input":
                Pr(e), Hh(e, s, !1);
                break;
              case "textarea":
                Pr(e), Uh(e);
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
                typeof l.onClick == "function" && (e.onclick = Mo);
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
      return Ct(t), null;
    case 6:
      if (e && t.stateNode != null) Wg(e, t, e.memoizedProps, s);
      else {
        if (typeof s != "string" && t.stateNode === null) throw Error(H(166));
        if (n = Os(Oi.current), Os(Yn.current), Xr(t)) {
          if (s = t.stateNode, n = t.memoizedProps, s[Dn] = t, (i = s.nodeValue !== n) && (e = Zt, e !== null)) switch (e.tag) {
            case 3:
              Yr(s.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Yr(s.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else s = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(s), s[Dn] = t, t.stateNode = s;
      }
      return Ct(t), null;
    case 13:
      if (We(qe), s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Qe && Qt !== null && t.mode & 1 && !(t.flags & 128)) ag(), Yl(), t.flags |= 98560, i = !1;
        else if (i = Xr(t), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(H(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(H(317));
            i[Dn] = t;
          } else Yl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          Ct(t), i = !1;
        } else kn !== null && (Tu(kn), kn = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (t.child.flags |= 8192, t.mode & 1 && (e === null || qe.current & 1 ? ft === 0 && (ft = 3) : Td())), t.updateQueue !== null && (t.flags |= 4), Ct(t), null);
    case 4:
      return Fl(), xu(e, t), e === null && Bi(t.stateNode.containerInfo), Ct(t), null;
    case 10:
      return ad(t.type._context), Ct(t), null;
    case 17:
      return Wt(t.type) && bo(), Ct(t), null;
    case 19:
      if (We(qe), i = t.memoizedState, i === null) return Ct(t), null;
      if (s = (t.flags & 128) !== 0, r = i.rendering, r === null) if (s) oi(i, !1);
      else {
        if (ft !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (r = Po(e), r !== null) {
            for (t.flags |= 128, oi(i, !1), s = r.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), t.subtreeFlags = 0, s = n, n = t.child; n !== null; ) i = n, e = s, i.flags &= 14680066, r = i.alternate, r === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = r.childLanes, i.lanes = r.lanes, i.child = r.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = r.memoizedProps, i.memoizedState = r.memoizedState, i.updateQueue = r.updateQueue, i.type = r.type, e = r.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Xe(qe, qe.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && it() > zl && (t.flags |= 128, s = !0, oi(i, !1), t.lanes = 4194304);
      }
      else {
        if (!s) if (e = Po(r), e !== null) {
          if (t.flags |= 128, s = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), oi(i, !0), i.tail === null && i.tailMode === "hidden" && !r.alternate && !Qe) return Ct(t), null;
        } else 2 * it() - i.renderingStartTime > zl && n !== 1073741824 && (t.flags |= 128, s = !0, oi(i, !1), t.lanes = 4194304);
        i.isBackwards ? (r.sibling = t.child, t.child = r) : (n = i.last, n !== null ? n.sibling = r : t.child = r, i.last = r);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = it(), t.sibling = null, n = qe.current, Xe(qe, s ? n & 1 | 2 : n & 1), t) : (Ct(t), null);
    case 22:
    case 23:
      return _d(), s = t.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (t.flags |= 8192), s && t.mode & 1 ? Kt & 1073741824 && (Ct(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ct(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(H(156, t.tag));
}
function Yw(e, t) {
  switch (ld(t), t.tag) {
    case 1:
      return Wt(t.type) && bo(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Fl(), We(Ht), We(Pt), fd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return hd(t), null;
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
      return ad(t.type._context), null;
    case 22:
    case 23:
      return _d(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var zr = !1, jt = !1, Xw = typeof WeakSet == "function" ? WeakSet : Set, J = null;
function kl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (s) {
    nt(e, t, s);
  }
  else n.current = null;
}
function yu(e, t, n) {
  try {
    n();
  } catch (s) {
    nt(e, t, s);
  }
}
var Lf = !1;
function Fw(e, t) {
  if (tu = vo, e = Gm(), nd(e)) {
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
        var r = 0, a = -1, c = -1, u = 0, h = 0, p = e, d = null;
        t: for (; ; ) {
          for (var f; p !== n || l !== 0 && p.nodeType !== 3 || (a = r + l), p !== i || s !== 0 && p.nodeType !== 3 || (c = r + s), p.nodeType === 3 && (r += p.nodeValue.length), (f = p.firstChild) !== null; )
            d = p, p = f;
          for (; ; ) {
            if (p === e) break t;
            if (d === n && ++u === l && (a = r), d === i && ++h === s && (c = r), (f = p.nextSibling) !== null) break;
            p = d, d = p.parentNode;
          }
          p = f;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (nu = { focusedElem: e, selectionRange: n }, vo = !1, J = t; J !== null; ) if (t = J, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, J = e;
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
            var w = g.memoizedProps, M = g.memoizedState, v = t.stateNode, m = v.getSnapshotBeforeUpdate(t.elementType === t.type ? w : bn(t.type, w), M);
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
  return g = Lf, Lf = !1, g;
}
function _i(e, t, n) {
  var s = t.updateQueue;
  if (s = s !== null ? s.lastEffect : null, s !== null) {
    var l = s = s.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && yu(t, n, i);
      }
      l = l.next;
    } while (l !== s);
  }
}
function sa(e, t) {
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
function vu(e) {
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
function Ug(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Ug(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Dn], delete t[Xi], delete t[iu], delete t[Mw], delete t[bw])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function $g(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Df(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || $g(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function wu(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Mo));
  else if (s !== 4 && (e = e.child, e !== null)) for (wu(e, t, n), e = e.sibling; e !== null; ) wu(e, t, n), e = e.sibling;
}
function Su(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null)) for (Su(e, t, n), e = e.sibling; e !== null; ) Su(e, t, n), e = e.sibling;
}
var wt = null, _n = !1;
function ls(e, t, n) {
  for (n = n.child; n !== null; ) Vg(e, t, n), n = n.sibling;
}
function Vg(e, t, n) {
  if (Bn && typeof Bn.onCommitFiberUnmount == "function") try {
    Bn.onCommitFiberUnmount(Go, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      jt || kl(n, t);
    case 6:
      var s = wt, l = _n;
      wt = null, ls(e, t, n), wt = s, _n = l, wt !== null && (_n ? (e = wt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : wt.removeChild(n.stateNode));
      break;
    case 18:
      wt !== null && (_n ? (e = wt, n = n.stateNode, e.nodeType === 8 ? Ja(e.parentNode, n) : e.nodeType === 1 && Ja(e, n), Ai(e)) : Ja(wt, n.stateNode));
      break;
    case 4:
      s = wt, l = _n, wt = n.stateNode.containerInfo, _n = !0, ls(e, t, n), wt = s, _n = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!jt && (s = n.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        l = s = s.next;
        do {
          var i = l, r = i.destroy;
          i = i.tag, r !== void 0 && (i & 2 || i & 4) && yu(n, t, r), l = l.next;
        } while (l !== s);
      }
      ls(e, t, n);
      break;
    case 1:
      if (!jt && (kl(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function")) try {
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
      n.mode & 1 ? (jt = (s = jt) || n.memoizedState !== null, ls(e, t, n), jt = s) : ls(e, t, n);
      break;
    default:
      ls(e, t, n);
  }
}
function Bf(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Xw()), t.forEach(function(s) {
      var l = Gw.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(l, l));
    });
  }
}
function Sn(e, t) {
  var n = t.deletions;
  if (n !== null) for (var s = 0; s < n.length; s++) {
    var l = n[s];
    try {
      var i = e, r = t, a = r;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            wt = a.stateNode, _n = !1;
            break e;
          case 3:
            wt = a.stateNode.containerInfo, _n = !0;
            break e;
          case 4:
            wt = a.stateNode.containerInfo, _n = !0;
            break e;
        }
        a = a.return;
      }
      if (wt === null) throw Error(H(160));
      Vg(i, r, l), wt = null, _n = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (u) {
      nt(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Kg(t, e), t = t.sibling;
}
function Kg(e, t) {
  var n = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Sn(t, e), An(e), s & 4) {
        try {
          _i(3, e, e.return), sa(3, e);
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
      Sn(t, e), An(e), s & 512 && n !== null && kl(n, n.return);
      break;
    case 5:
      if (Sn(t, e), An(e), s & 512 && n !== null && kl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Pi(l, "");
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, r = n !== null ? n.memoizedProps : i, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && i.type === "radio" && i.name != null && gm(l, i), Uc(a, r);
          var u = Uc(a, i);
          for (r = 0; r < c.length; r += 2) {
            var h = c[r], p = c[r + 1];
            h === "style" ? Sm(l, p) : h === "dangerouslySetInnerHTML" ? vm(l, p) : h === "children" ? Pi(l, p) : Hu(l, h, p, u);
          }
          switch (a) {
            case "input":
              Fc(l, i);
              break;
            case "textarea":
              xm(l, i);
              break;
            case "select":
              var d = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var f = i.value;
              f != null ? jl(l, !!i.multiple, f, !1) : d !== !!i.multiple && (i.defaultValue != null ? jl(
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
      if (Sn(t, e), An(e), s & 4) {
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
      if (Sn(t, e), An(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ai(t.containerInfo);
      } catch (w) {
        nt(e, e.return, w);
      }
      break;
    case 4:
      Sn(t, e), An(e);
      break;
    case 13:
      Sn(t, e), An(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Md = it())), s & 4 && Bf(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (jt = (u = jt) || h, Sn(t, e), jt = u) : Sn(t, e), An(e), s & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !h && e.mode & 1) for (J = e, h = e.child; h !== null; ) {
          for (p = J = h; J !== null; ) {
            switch (d = J, f = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                _i(4, d, d.return);
                break;
              case 1:
                kl(d, d.return);
                var g = d.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  s = d, n = d.return;
                  try {
                    t = s, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                  } catch (w) {
                    nt(s, n, w);
                  }
                }
                break;
              case 5:
                kl(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  Xf(p);
                  continue;
                }
            }
            f !== null ? (f.return = d, J = f) : Xf(p);
          }
          h = h.sibling;
        }
        e: for (h = null, p = e; ; ) {
          if (p.tag === 5) {
            if (h === null) {
              h = p;
              try {
                l = p.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = p.stateNode, c = p.memoizedProps.style, r = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = wm("display", r));
              } catch (w) {
                nt(e, e.return, w);
              }
            }
          } else if (p.tag === 6) {
            if (h === null) try {
              p.stateNode.nodeValue = u ? "" : p.memoizedProps;
            } catch (w) {
              nt(e, e.return, w);
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
      Sn(t, e), An(e), s & 4 && Bf(e);
      break;
    case 21:
      break;
    default:
      Sn(
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
          if ($g(n)) {
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
          s.flags & 32 && (Pi(l, ""), s.flags &= -33);
          var i = Df(e);
          Su(e, i, l);
          break;
        case 3:
        case 4:
          var r = s.stateNode.containerInfo, a = Df(e);
          wu(e, a, r);
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
function Ow(e, t, n) {
  J = e, Gg(e);
}
function Gg(e, t, n) {
  for (var s = (e.mode & 1) !== 0; J !== null; ) {
    var l = J, i = l.child;
    if (l.tag === 22 && s) {
      var r = l.memoizedState !== null || zr;
      if (!r) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || jt;
        a = zr;
        var u = jt;
        if (zr = r, (jt = c) && !u) for (J = l; J !== null; ) r = J, c = r.child, r.tag === 22 && r.memoizedState !== null ? Ff(l) : c !== null ? (c.return = r, J = c) : Ff(l);
        for (; i !== null; ) J = i, Gg(i), i = i.sibling;
        J = l, zr = a, jt = u;
      }
      Yf(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, J = i) : Yf(e);
  }
}
function Yf(e) {
  for (; J !== null; ) {
    var t = J;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            jt || sa(5, t);
            break;
          case 1:
            var s = t.stateNode;
            if (t.flags & 4 && !jt) if (n === null) s.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : bn(t.type, n.memoizedProps);
              s.componentDidUpdate(l, n.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Mf(t, i, s);
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
              Mf(t, r, n);
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
                var h = u.memoizedState;
                if (h !== null) {
                  var p = h.dehydrated;
                  p !== null && Ai(p);
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
        jt || t.flags & 512 && vu(t);
      } catch (d) {
        nt(t, t.return, d);
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
function Xf(e) {
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
function Ff(e) {
  for (; J !== null; ) {
    var t = J;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            sa(4, t);
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
            vu(t);
          } catch (c) {
            nt(t, i, c);
          }
          break;
        case 5:
          var r = t.return;
          try {
            vu(t);
          } catch (c) {
            nt(t, r, c);
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
var zw = Math.ceil, Ro = qn.ReactCurrentDispatcher, wd = qn.ReactCurrentOwner, xn = qn.ReactCurrentBatchConfig, ke = 0, xt = null, dt = null, bt = 0, Kt = 0, Cl = Cs(0), ft = 0, Ui = null, Gs = 0, la = 0, Sd = 0, Ti = null, Xt = null, Md = 0, zl = 1 / 0, Fn = null, Ao = !1, Mu = null, Ss = null, Hr = !1, ms = null, Lo = 0, ki = 0, bu = null, ro = -1, oo = 0;
function Lt() {
  return ke & 6 ? it() : ro !== -1 ? ro : ro = it();
}
function Ms(e) {
  return e.mode & 1 ? ke & 2 && bt !== 0 ? bt & -bt : Tw.transition !== null ? (oo === 0 && (oo = Rm()), oo) : (e = Le, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Fm(e.type)), e) : 1;
}
function jn(e, t, n, s) {
  if (50 < ki) throw ki = 0, bu = null, Error(H(185));
  Vi(e, n, s), (!(ke & 2) || e !== xt) && (e === xt && (!(ke & 2) && (la |= n), ft === 4 && ds(e, bt)), Ut(e, s), n === 1 && ke === 0 && !(t.mode & 1) && (zl = it() + 500, ea && js()));
}
function Ut(e, t) {
  var n = e.callbackNode;
  Tv(e, t);
  var s = yo(e, e === xt ? bt : 0);
  if (s === 0) n !== null && Kh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Kh(n), t === 1) e.tag === 0 ? _w(Of.bind(null, e)) : ig(Of.bind(null, e)), ww(function() {
      !(ke & 6) && js();
    }), n = null;
    else {
      switch (Am(s)) {
        case 1:
          n = Ku;
          break;
        case 4:
          n = Im;
          break;
        case 16:
          n = xo;
          break;
        case 536870912:
          n = Em;
          break;
        default:
          n = xo;
      }
      n = sx(n, Qg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Qg(e, t) {
  if (ro = -1, oo = 0, ke & 6) throw Error(H(327));
  var n = e.callbackNode;
  if (Rl() && e.callbackNode !== n) return null;
  var s = yo(e, e === xt ? bt : 0);
  if (s === 0) return null;
  if (s & 30 || s & e.expiredLanes || t) t = Do(e, s);
  else {
    t = s;
    var l = ke;
    ke |= 2;
    var i = qg();
    (xt !== e || bt !== t) && (Fn = null, zl = it() + 500, Hs(e, t));
    do
      try {
        Uw();
        break;
      } catch (a) {
        Zg(e, a);
      }
    while (!0);
    od(), Ro.current = i, ke = l, dt !== null ? t = 0 : (xt = null, bt = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (l = Qc(e), l !== 0 && (s = l, t = _u(e, l))), t === 1) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
    if (t === 6) ds(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !Hw(l) && (t = Do(e, s), t === 2 && (i = Qc(e), i !== 0 && (s = i, t = _u(e, i))), t === 1)) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
      switch (e.finishedWork = l, e.finishedLanes = s, t) {
        case 0:
        case 1:
          throw Error(H(345));
        case 2:
          Bs(e, Xt, Fn);
          break;
        case 3:
          if (ds(e, s), (s & 130023424) === s && (t = Md + 500 - it(), 10 < t)) {
            if (yo(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & s) !== s) {
              Lt(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = lu(Bs.bind(null, e, Xt, Fn), t);
            break;
          }
          Bs(e, Xt, Fn);
          break;
        case 4:
          if (ds(e, s), (s & 4194240) === s) break;
          for (t = e.eventTimes, l = -1; 0 < s; ) {
            var r = 31 - Cn(s);
            i = 1 << r, r = t[r], r > l && (l = r), s &= ~i;
          }
          if (s = l, s = it() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * zw(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = lu(Bs.bind(null, e, Xt, Fn), s);
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
  return Ut(e, it()), e.callbackNode === n ? Qg.bind(null, e) : null;
}
function _u(e, t) {
  var n = Ti;
  return e.current.memoizedState.isDehydrated && (Hs(e, t).flags |= 256), e = Do(e, t), e !== 2 && (t = Xt, Xt = n, t !== null && Tu(t)), e;
}
function Tu(e) {
  Xt === null ? Xt = e : Xt.push.apply(Xt, e);
}
function Hw(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var s = 0; s < n.length; s++) {
        var l = n[s], i = l.getSnapshot;
        l = l.value;
        try {
          if (!Nn(i(), l)) return !1;
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
  for (t &= ~Sd, t &= ~la, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Cn(t), s = 1 << n;
    e[n] = -1, t &= ~s;
  }
}
function Of(e) {
  if (ke & 6) throw Error(H(327));
  Rl();
  var t = yo(e, 0);
  if (!(t & 1)) return Ut(e, it()), null;
  var n = Do(e, t);
  if (e.tag !== 0 && n === 2) {
    var s = Qc(e);
    s !== 0 && (t = s, n = _u(e, s));
  }
  if (n === 1) throw n = Ui, Hs(e, 0), ds(e, t), Ut(e, it()), n;
  if (n === 6) throw Error(H(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Bs(e, Xt, Fn), Ut(e, it()), null;
}
function bd(e, t) {
  var n = ke;
  ke |= 1;
  try {
    return e(t);
  } finally {
    ke = n, ke === 0 && (zl = it() + 500, ea && js());
  }
}
function Qs(e) {
  ms !== null && ms.tag === 0 && !(ke & 6) && Rl();
  var t = ke;
  ke |= 1;
  var n = xn.transition, s = Le;
  try {
    if (xn.transition = null, Le = 1, e) return e();
  } finally {
    Le = s, xn.transition = n, ke = t, !(ke & 6) && js();
  }
}
function _d() {
  Kt = Cl.current, We(Cl);
}
function Hs(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, vw(n)), dt !== null) for (n = dt.return; n !== null; ) {
    var s = n;
    switch (ld(s), s.tag) {
      case 1:
        s = s.type.childContextTypes, s != null && bo();
        break;
      case 3:
        Fl(), We(Ht), We(Pt), fd();
        break;
      case 5:
        hd(s);
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
        ad(s.type._context);
        break;
      case 22:
      case 23:
        _d();
    }
    n = n.return;
  }
  if (xt = e, dt = e = bs(e.current, null), bt = Kt = t, ft = 0, Ui = null, Sd = la = Gs = 0, Xt = Ti = null, Fs !== null) {
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
function Zg(e, t) {
  do {
    var n = dt;
    try {
      if (od(), so.current = Eo, Io) {
        for (var s = Je.memoizedState; s !== null; ) {
          var l = s.queue;
          l !== null && (l.pending = null), s = s.next;
        }
        Io = !1;
      }
      if (Ks = 0, gt = ht = Je = null, bi = !1, zi = 0, wd.current = null, n === null || n.return === null) {
        ft = 1, Ui = t, dt = null;
        break;
      }
      e: {
        var i = e, r = n.return, a = n, c = t;
        if (t = bt, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var u = c, h = a, p = h.tag;
          if (!(h.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var d = h.alternate;
            d ? (h.updateQueue = d.updateQueue, h.memoizedState = d.memoizedState, h.lanes = d.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var f = jf(r);
          if (f !== null) {
            f.flags &= -257, Nf(f, r, a, i, t), f.mode & 1 && Cf(i, u, t), t = f, c = u;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(c), t.updateQueue = w;
            } else g.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              Cf(i, u, t), Td();
              break e;
            }
            c = Error(H(426));
          }
        } else if (Qe && a.mode & 1) {
          var M = jf(r);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), Nf(M, r, a, i, t), id(Ol(c, a));
            break e;
          }
        }
        i = c = Ol(c, a), ft !== 4 && (ft = 2), Ti === null ? Ti = [i] : Ti.push(i), i = r;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var v = Ag(i, c, t);
              Sf(i, v);
              break e;
            case 1:
              a = c;
              var m = i.type, x = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (Ss === null || !Ss.has(x)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var S = Lg(i, a, t);
                Sf(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      ex(n);
    } catch (b) {
      t = b, dt === n && n !== null && (dt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function qg() {
  var e = Ro.current;
  return Ro.current = Eo, e === null ? Eo : e;
}
function Td() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), xt === null || !(Gs & 268435455) && !(la & 268435455) || ds(xt, bt);
}
function Do(e, t) {
  var n = ke;
  ke |= 2;
  var s = qg();
  (xt !== e || bt !== t) && (Fn = null, Hs(e, t));
  do
    try {
      Ww();
      break;
    } catch (l) {
      Zg(e, l);
    }
  while (!0);
  if (od(), ke = n, Ro.current = s, dt !== null) throw Error(H(261));
  return xt = null, bt = 0, ft;
}
function Ww() {
  for (; dt !== null; ) Jg(dt);
}
function Uw() {
  for (; dt !== null && !gv(); ) Jg(dt);
}
function Jg(e) {
  var t = nx(e.alternate, e, Kt);
  e.memoizedProps = e.pendingProps, t === null ? ex(e) : dt = t, wd.current = null;
}
function ex(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Yw(n, t), n !== null) {
        n.flags &= 32767, dt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, dt = null;
        return;
      }
    } else if (n = Bw(n, t, Kt), n !== null) {
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
  var s = Le, l = xn.transition;
  try {
    xn.transition = null, Le = 1, $w(e, t, n, s);
  } finally {
    xn.transition = l, Le = s;
  }
  return null;
}
function $w(e, t, n, s) {
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
  if (kv(e, i), e === xt && (dt = xt = null, bt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Hr || (Hr = !0, sx(xo, function() {
    return Rl(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = xn.transition, xn.transition = null;
    var r = Le;
    Le = 1;
    var a = ke;
    ke |= 4, wd.current = null, Fw(e, n), Kg(n, e), hw(nu), vo = !!tu, nu = tu = null, e.current = n, Ow(n), xv(), ke = a, Le = r, xn.transition = i;
  } else e.current = n;
  if (Hr && (Hr = !1, ms = e, Lo = l), i = e.pendingLanes, i === 0 && (Ss = null), wv(n.stateNode), Ut(e, it()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ao) throw Ao = !1, e = Mu, Mu = null, e;
  return Lo & 1 && e.tag !== 0 && Rl(), i = e.pendingLanes, i & 1 ? e === bu ? ki++ : (ki = 0, bu = e) : ki = 0, js(), null;
}
function Rl() {
  if (ms !== null) {
    var e = Am(Lo), t = xn.transition, n = Le;
    try {
      if (xn.transition = null, Le = 16 > e ? 16 : e, ms === null) var s = !1;
      else {
        if (e = ms, ms = null, Lo = 0, ke & 6) throw Error(H(331));
        var l = ke;
        for (ke |= 4, J = e.current; J !== null; ) {
          var i = J, r = i.child;
          if (J.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (J = u; J !== null; ) {
                  var h = J;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _i(8, h, i);
                  }
                  var p = h.child;
                  if (p !== null) p.return = h, J = p;
                  else for (; J !== null; ) {
                    h = J;
                    var d = h.sibling, f = h.return;
                    if (Ug(h), h === u) {
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
          if (i.subtreeFlags & 2064 && r !== null) r.return = i, J = r;
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
          r = J;
          var x = r.child;
          if (r.subtreeFlags & 2064 && x !== null) x.return = r, J = x;
          else e: for (r = m; J !== null; ) {
            if (a = J, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, a);
              }
            } catch (b) {
              nt(a, a.return, b);
            }
            if (a === r) {
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
          Bn.onPostCommitFiberRoot(Go, e);
        } catch {
        }
        s = !0;
      }
      return s;
    } finally {
      Le = n, xn.transition = t;
    }
  }
  return !1;
}
function zf(e, t, n) {
  t = Ol(n, t), t = Ag(e, t, 1), e = ws(e, t, 1), t = Lt(), e !== null && (Vi(e, 1, t), Ut(e, t));
}
function nt(e, t, n) {
  if (e.tag === 3) zf(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      zf(t, e, n);
      break;
    } else if (t.tag === 1) {
      var s = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (Ss === null || !Ss.has(s))) {
        e = Ol(n, e), e = Lg(t, e, 1), t = ws(t, e, 1), e = Lt(), t !== null && (Vi(t, 1, e), Ut(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Vw(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = Lt(), e.pingedLanes |= e.suspendedLanes & n, xt === e && (bt & n) === n && (ft === 4 || ft === 3 && (bt & 130023424) === bt && 500 > it() - Md ? Hs(e, 0) : Sd |= n), Ut(e, t);
}
function tx(e, t) {
  t === 0 && (e.mode & 1 ? (t = Rr, Rr <<= 1, !(Rr & 130023424) && (Rr = 4194304)) : t = 1);
  var n = Lt();
  e = Gn(e, t), e !== null && (Vi(e, t, n), Ut(e, n));
}
function Kw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), tx(e, n);
}
function Gw(e, t) {
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
  s !== null && s.delete(t), tx(e, n);
}
var nx;
nx = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Ht.current) Ft = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ft = !1, Dw(e, t, n);
    Ft = !!(e.flags & 131072);
  }
  else Ft = !1, Qe && t.flags & 1048576 && rg(t, ko, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var s = t.type;
      io(e, t), e = t.pendingProps;
      var l = Bl(t, Pt.current);
      El(t, n), l = md(null, t, s, e, l, n);
      var i = gd();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Wt(s) ? (i = !0, _o(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, ud(t), l.updater = na, t.stateNode = l, l._reactInternals = t, du(t, s, e, n), t = pu(null, t, s, !0, i, n)) : (t.tag = 0, Qe && i && sd(t), At(null, t, l, n), t = t.child), t;
    case 16:
      s = t.elementType;
      e: {
        switch (io(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = Zw(s), e = bn(s, e), l) {
          case 0:
            t = fu(null, t, s, e, n);
            break e;
          case 1:
            t = Ef(null, t, s, e, n);
            break e;
          case 11:
            t = Pf(null, t, s, e, n);
            break e;
          case 14:
            t = If(null, t, s, bn(s.type, e), n);
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
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : bn(s, l), fu(e, t, s, l, n);
    case 1:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : bn(s, l), Ef(e, t, s, l, n);
    case 3:
      e: {
        if (Xg(t), e === null) throw Error(H(387));
        s = t.pendingProps, i = t.memoizedState, l = i.element, hg(e, t), No(t, s, null, n);
        var r = t.memoizedState;
        if (s = r.element, i.isDehydrated) if (i = { element: s, isDehydrated: !1, cache: r.cache, pendingSuspenseBoundaries: r.pendingSuspenseBoundaries, transitions: r.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = Ol(Error(H(423)), t), t = Rf(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = Ol(Error(H(424)), t), t = Rf(e, t, s, n, l);
          break e;
        } else for (Qt = vs(t.stateNode.containerInfo.firstChild), Zt = t, Qe = !0, kn = null, n = ug(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Yl(), s === l) {
            t = Qn(e, t, n);
            break e;
          }
          At(e, t, s, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return fg(t), e === null && au(t), s = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, r = l.children, su(s, l) ? r = null : i !== null && su(s, i) && (t.flags |= 32), Yg(e, t), At(e, t, r, n), t.child;
    case 6:
      return e === null && au(t), null;
    case 13:
      return Fg(e, t, n);
    case 4:
      return dd(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Xl(t, null, s, n) : At(e, t, s, n), t.child;
    case 11:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : bn(s, l), Pf(e, t, s, l, n);
    case 7:
      return At(e, t, t.pendingProps, n), t.child;
    case 8:
      return At(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return At(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (s = t.type._context, l = t.pendingProps, i = t.memoizedProps, r = l.value, Xe(Co, s._currentValue), s._currentValue = r, i !== null) if (Nn(i.value, r)) {
          if (i.children === l.children && !Ht.current) {
            t = Qn(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            r = i.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === s) {
                if (i.tag === 1) {
                  c = Un(-1, n & -n), c.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var h = u.pending;
                    h === null ? c.next = c : (c.next = h.next, h.next = c), u.pending = c;
                  }
                }
                i.lanes |= n, c = i.alternate, c !== null && (c.lanes |= n), cu(
                  i.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (i.tag === 10) r = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (r = i.return, r === null) throw Error(H(341));
            r.lanes |= n, a = r.alternate, a !== null && (a.lanes |= n), cu(r, n, t), r = i.sibling;
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
        At(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, s = t.pendingProps.children, El(t, n), l = yn(l), s = s(l), t.flags |= 1, At(e, t, s, n), t.child;
    case 14:
      return s = t.type, l = bn(s, t.pendingProps), l = bn(s.type, l), If(e, t, s, l, n);
    case 15:
      return Dg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : bn(s, l), io(e, t), t.tag = 1, Wt(s) ? (e = !0, _o(t)) : e = !1, El(t, n), Rg(t, s, l), du(t, s, l, n), pu(null, t, s, !0, e, n);
    case 19:
      return Og(e, t, n);
    case 22:
      return Bg(e, t, n);
  }
  throw Error(H(156, t.tag));
};
function sx(e, t) {
  return Pm(e, t);
}
function Qw(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function pn(e, t, n, s) {
  return new Qw(e, t, n, s);
}
function kd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Zw(e) {
  if (typeof e == "function") return kd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Uu) return 11;
    if (e === $u) return 14;
  }
  return 2;
}
function bs(e, t) {
  var n = e.alternate;
  return n === null ? (n = pn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function ao(e, t, n, s, l, i) {
  var r = 2;
  if (s = e, typeof e == "function") kd(e) && (r = 1);
  else if (typeof e == "string") r = 5;
  else e: switch (e) {
    case xl:
      return Ws(n.children, l, i, t);
    case Wu:
      r = 8, l |= 8;
      break;
    case Lc:
      return e = pn(12, n, t, l | 2), e.elementType = Lc, e.lanes = i, e;
    case Dc:
      return e = pn(13, n, t, l), e.elementType = Dc, e.lanes = i, e;
    case Bc:
      return e = pn(19, n, t, l), e.elementType = Bc, e.lanes = i, e;
    case fm:
      return ia(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case dm:
          r = 10;
          break e;
        case hm:
          r = 9;
          break e;
        case Uu:
          r = 11;
          break e;
        case $u:
          r = 14;
          break e;
        case as:
          r = 16, s = null;
          break e;
      }
      throw Error(H(130, e == null ? e : typeof e, ""));
  }
  return t = pn(r, n, t, l), t.elementType = e, t.type = s, t.lanes = i, t;
}
function Ws(e, t, n, s) {
  return e = pn(7, e, s, t), e.lanes = n, e;
}
function ia(e, t, n, s) {
  return e = pn(22, e, s, t), e.elementType = fm, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function oc(e, t, n) {
  return e = pn(6, e, null, t), e.lanes = n, e;
}
function ac(e, t, n) {
  return t = pn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function qw(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = za(0), this.expirationTimes = za(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = za(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Cd(e, t, n, s, l, i, r, a, c) {
  return e = new qw(e, t, n, a, c), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = pn(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ud(i), e;
}
function Jw(e, t, n) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: gl, key: s == null ? null : "" + s, children: e, containerInfo: t, implementation: n };
}
function lx(e) {
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
    if (Wt(n)) return lg(e, n, t);
  }
  return t;
}
function ix(e, t, n, s, l, i, r, a, c) {
  return e = Cd(n, s, !0, e, l, i, r, a, c), e.context = lx(null), n = e.current, s = Lt(), l = Ms(n), i = Un(s, l), i.callback = t ?? null, ws(n, i, l), e.current.lanes = l, Vi(e, l, s), Ut(e, s), e;
}
function ra(e, t, n, s) {
  var l = t.current, i = Lt(), r = Ms(l);
  return n = lx(n), t.context === null ? t.context = n : t.pendingContext = n, t = Un(i, r), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = ws(l, t, r), e !== null && (jn(e, l, r, i), no(e, l, r)), r;
}
function Bo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Hf(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function jd(e, t) {
  Hf(e, t), (e = e.alternate) && Hf(e, t);
}
function e0() {
  return null;
}
var rx = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Nd(e) {
  this._internalRoot = e;
}
oa.prototype.render = Nd.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(H(409));
  ra(e, t, null, null);
};
oa.prototype.unmount = Nd.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Qs(function() {
      ra(null, e, null, null);
    }), t[Kn] = null;
  }
};
function oa(e) {
  this._internalRoot = e;
}
oa.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Bm();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < us.length && t !== 0 && t < us[n].priority; n++) ;
    us.splice(n, 0, e), n === 0 && Xm(e);
  }
};
function Pd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function aa(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Wf() {
}
function t0(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var i = s;
      s = function() {
        var u = Bo(r);
        i.call(u);
      };
    }
    var r = ix(t, s, e, 0, null, !1, !1, "", Wf);
    return e._reactRootContainer = r, e[Kn] = r.current, Bi(e.nodeType === 8 ? e.parentNode : e), Qs(), r;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof s == "function") {
    var a = s;
    s = function() {
      var u = Bo(c);
      a.call(u);
    };
  }
  var c = Cd(e, 0, !1, null, null, !1, !1, "", Wf);
  return e._reactRootContainer = c, e[Kn] = c.current, Bi(e.nodeType === 8 ? e.parentNode : e), Qs(function() {
    ra(t, c, n, s);
  }), c;
}
function ca(e, t, n, s, l) {
  var i = n._reactRootContainer;
  if (i) {
    var r = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Bo(r);
        a.call(c);
      };
    }
    ra(t, r, e, l);
  } else r = t0(n, t, e, l, s);
  return Bo(r);
}
Lm = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mi(t.pendingLanes);
        n !== 0 && (Gu(t, n | 1), Ut(t, it()), !(ke & 6) && (zl = it() + 500, js()));
      }
      break;
    case 13:
      Qs(function() {
        var s = Gn(e, 1);
        if (s !== null) {
          var l = Lt();
          jn(s, e, 1, l);
        }
      }), jd(e, 1);
  }
};
Qu = function(e) {
  if (e.tag === 13) {
    var t = Gn(e, 134217728);
    if (t !== null) {
      var n = Lt();
      jn(t, e, 134217728, n);
    }
    jd(e, 134217728);
  }
};
Dm = function(e) {
  if (e.tag === 13) {
    var t = Ms(e), n = Gn(e, t);
    if (n !== null) {
      var s = Lt();
      jn(n, e, t, s);
    }
    jd(e, t);
  }
};
Bm = function() {
  return Le;
};
Ym = function(e, t) {
  var n = Le;
  try {
    return Le = e, t();
  } finally {
    Le = n;
  }
};
Vc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Fc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var s = n[t];
          if (s !== e && s.form === e.form) {
            var l = Jo(s);
            if (!l) throw Error(H(90));
            mm(s), Fc(s, l);
          }
        }
      }
      break;
    case "textarea":
      xm(e, n);
      break;
    case "select":
      t = n.value, t != null && jl(e, !!n.multiple, t, !1);
  }
};
_m = bd;
Tm = Qs;
var n0 = { usingClientEntryPoint: !1, Events: [Gi, Sl, Jo, Mm, bm, bd] }, ai = { findFiberByHostInstance: Xs, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, s0 = { bundleType: ai.bundleType, version: ai.version, rendererPackageName: ai.rendererPackageName, rendererConfig: ai.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = jm(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ai.findFiberByHostInstance || e0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wr.isDisabled && Wr.supportsFiber) try {
    Go = Wr.inject(s0), Bn = Wr;
  } catch {
  }
}
Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = n0;
Jt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Pd(t)) throw Error(H(200));
  return Jw(e, t, null, n);
};
Jt.createRoot = function(e, t) {
  if (!Pd(e)) throw Error(H(299));
  var n = !1, s = "", l = rx;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Cd(e, 1, !1, null, null, n, !1, s, l), e[Kn] = t.current, Bi(e.nodeType === 8 ? e.parentNode : e), new Nd(t);
};
Jt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(H(188)) : (e = Object.keys(e).join(","), Error(H(268, e)));
  return e = jm(t), e = e === null ? null : e.stateNode, e;
};
Jt.flushSync = function(e) {
  return Qs(e);
};
Jt.hydrate = function(e, t, n) {
  if (!aa(t)) throw Error(H(200));
  return ca(null, e, t, !0, n);
};
Jt.hydrateRoot = function(e, t, n) {
  if (!Pd(e)) throw Error(H(405));
  var s = n != null && n.hydratedSources || null, l = !1, i = "", r = rx;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (r = n.onRecoverableError)), t = ix(t, null, e, 1, n ?? null, l, !1, i, r), e[Kn] = t.current, Bi(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new oa(t);
};
Jt.render = function(e, t, n) {
  if (!aa(t)) throw Error(H(200));
  return ca(null, e, t, !1, n);
};
Jt.unmountComponentAtNode = function(e) {
  if (!aa(e)) throw Error(H(40));
  return e._reactRootContainer ? (Qs(function() {
    ca(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Kn] = null;
    });
  }), !0) : !1;
};
Jt.unstable_batchedUpdates = bd;
Jt.unstable_renderSubtreeIntoContainer = function(e, t, n, s) {
  if (!aa(n)) throw Error(H(200));
  if (e == null || e._reactInternals === void 0) throw Error(H(38));
  return ca(e, t, n, !1, s);
};
Jt.version = "18.3.1-next-f1338f8080-20240426";
function ox() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ox);
    } catch (e) {
      console.error(e);
    }
}
ox(), om.exports = Jt;
var Ci = om.exports, Uf = Ci;
Rc.createRoot = Uf.createRoot, Rc.hydrateRoot = Uf.hydrateRoot;
const l0 = {}, $f = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (h, p) => {
    const d = typeof h == "function" ? h(t) : h;
    if (!Object.is(d, t)) {
      const f = t;
      t = p ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((g) => g(t, f));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (h) => (n.add(h), () => n.delete(h)), destroy: () => {
    (l0 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, i0 = (e) => e ? $f(e) : $f;
var ax = { exports: {} }, cx = {}, ux = { exports: {} }, dx = {};
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
function r0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var o0 = typeof Object.is == "function" ? Object.is : r0, a0 = Hl.useState, c0 = Hl.useEffect, u0 = Hl.useLayoutEffect, d0 = Hl.useDebugValue;
function h0(e, t) {
  var n = t(), s = a0({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, i = s[1];
  return u0(
    function() {
      l.value = n, l.getSnapshot = t, cc(l) && i({ inst: l });
    },
    [e, n, t]
  ), c0(
    function() {
      return cc(l) && i({ inst: l }), e(function() {
        cc(l) && i({ inst: l });
      });
    },
    [e]
  ), d0(n), n;
}
function cc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !o0(e, n);
  } catch {
    return !0;
  }
}
function f0(e, t) {
  return t();
}
var p0 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f0 : h0;
dx.useSyncExternalStore = Hl.useSyncExternalStore !== void 0 ? Hl.useSyncExternalStore : p0;
ux.exports = dx;
var m0 = ux.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua = T, g0 = m0;
function x0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var y0 = typeof Object.is == "function" ? Object.is : x0, v0 = g0.useSyncExternalStore, w0 = ua.useRef, S0 = ua.useEffect, M0 = ua.useMemo, b0 = ua.useDebugValue;
cx.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var i = w0(null);
  if (i.current === null) {
    var r = { hasValue: !1, value: null };
    i.current = r;
  } else r = i.current;
  i = M0(
    function() {
      function c(f) {
        if (!u) {
          if (u = !0, h = f, f = s(f), l !== void 0 && r.hasValue) {
            var g = r.value;
            if (l(g, f))
              return p = g;
          }
          return p = f;
        }
        if (g = p, y0(h, f)) return g;
        var w = s(f);
        return l !== void 0 && l(g, w) ? (h = f, g) : (h = f, p = w);
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
  var a = v0(e, i[0], i[1]);
  return S0(
    function() {
      r.hasValue = !0, r.value = a;
    },
    [a]
  ), b0(a), a;
};
ax.exports = cx;
var _0 = ax.exports;
const T0 = /* @__PURE__ */ Gp(_0), hx = {}, { useDebugValue: k0 } = Te, { useSyncExternalStoreWithSelector: C0 } = T0;
let Vf = !1;
const j0 = (e) => e;
function N0(e, t = j0, n) {
  (hx ? "production" : void 0) !== "production" && n && !Vf && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Vf = !0);
  const s = C0(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return k0(s), s;
}
const Kf = (e) => {
  (hx ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? i0(e) : e, n = (s, l) => N0(t, s, l);
  return Object.assign(n, t), n;
}, tt = (e) => e ? Kf(e) : Kf, P0 = {
  width: 0,
  height: 0
}, is = {
  x: 0,
  y: 0,
  zoom: 1
}, I0 = 0.02, E0 = 16, R0 = 2e-3, ci = 0.6, C = 12, me = 8, B = 64, rs = 512 * C, A0 = ["nw", "ne", "se", "sw"], uc = -180, dc = 180, Zs = 0.01, Wl = 5, hc = 0, fc = 1, L0 = C * 0.9, Gf = L0 / 2, fx = 16, D0 = 8, B0 = 8, ku = 1, Cu = 64, pc = 4096, Qf = 4e6, px = "pss.traceCanvasOversize", Id = 8, Zf = Id * 3, Y0 = Id * 4, X0 = 1e3, F0 = {
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
}, qf = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  pcx: "image/x-pcx",
  tga: "image/x-tga"
}, ju = [
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
], O0 = {
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
}, z0 = (e, t, n) => Math.min(Math.max(e, t), n), Ce = tt((e, t) => ({
  ...P0,
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
    const { camera: l } = t(), i = z0(l.zoom + n, I0, E0);
    if (!s) {
      e({ camera: { ...l, zoom: i } });
      return;
    }
    const r = i / l.zoom, a = s.x - (s.x - l.x) / r, c = s.y - (s.y - l.y) / r;
    e({ camera: { x: a, y: c, zoom: i } });
  },
  panTo: (n, s) => e((l) => ({
    camera: { ...l.camera, x: n, y: s }
  }))
})), Jf = [Math.max(0, ju.length - 1)], H0 = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, ui = (e, t) => {
  const n = H0(e).filter((s) => s >= 0 && s < t);
  return n.length > 0 ? n : [Math.max(0, t - 1)];
}, re = tt((e, t) => ({
  colors: ju,
  selectedIndices: Jf,
  addColor: (n) => e((s) => {
    const l = [...s.colors, n], i = l.length - 1;
    return {
      colors: l,
      selectedIndices: ui(
        [...s.selectedIndices.filter((r) => r !== i), i],
        l.length
      )
    };
  }),
  removeColor: (n) => e((s) => {
    if (s.colors.length <= 1)
      return s;
    const l = s.colors.filter((r, a) => a !== n), i = ui(
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
    selectedIndices: ui(s.selectedIndices, n.length)
  })),
  reset: () => e({
    colors: ju,
    selectedIndices: Jf
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
})), ep = (e, t) => Math.floor(e / t), tp = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, np = (e, t) => {
  const n = ep(t, B), s = ep(e, B);
  return {
    row: n,
    col: s,
    localX: tp(e, B),
    localY: tp(t, B)
  };
}, Ur = (e, t) => `${e}:${t}`;
class pl {
  constructor() {
    this.blocks = /* @__PURE__ */ new Map();
  }
  getPixel(t, n) {
    const { row: s, col: l, localX: i, localY: r } = np(t, n), a = this.blocks.get(Ur(s, l));
    return a ? a[r * B + i] : 0;
  }
  setPixel(t, n, s) {
    const { row: l, col: i, localX: r, localY: a } = np(t, n), c = Ur(l, i);
    let u = this.blocks.get(c);
    u || (u = new Uint8Array(B * B), this.blocks.set(c, u)), u[a * B + r] = s;
  }
  setBlock(t, n, s) {
    if (s.length !== B * B)
      throw new Error("Invalid block size");
    this.blocks.set(Ur(t, n), s);
  }
  getBlock(t, n) {
    return this.blocks.get(Ur(t, n));
  }
  clear() {
    this.blocks.clear();
  }
  getBlocks() {
    const t = [];
    for (const [n, s] of this.blocks.entries()) {
      const [l, i] = n.split(":"), r = Number(l), a = Number(i);
      t.push({ row: r, col: a, block: s });
    }
    return t;
  }
}
const co = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`, sp = co(), ee = tt((e, t) => ({
  layers: [{ id: sp, name: "Layer 1", visible: !0, store: new pl() }],
  activeLayerId: sp,
  version: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  createLayer: (n) => {
    const s = co(), l = n != null && n.trim() ? n.trim() : `Layer ${t().layers.length + 1}`;
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
      const i = s.layers.filter((c) => c.id !== n), r = s.activeLayerId === n ? ((a = i[Math.min(l, i.length - 1)]) == null ? void 0 : a.id) ?? i[0].id : s.activeLayerId;
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
    const a = [...l.layers], [c] = a.splice(i, 1);
    return a.splice(r, 0, c), { layers: a, version: l.version + 1 };
  }),
  mergeLayerDown: (n) => e((s) => {
    const l = s.layers.findIndex((a) => a.id === n);
    if (l <= 0)
      return s;
    const i = s.layers[l], r = s.layers[l - 1];
    for (const { row: a, col: c, block: u } of i.store.getBlocks()) {
      let h = r.store.getBlock(a, c);
      h || (h = new Uint8Array(B * B), r.store.setBlock(a, c, h));
      for (let p = 0; p < u.length; p += 1)
        u[p] !== 0 && (h[p] = u[p]);
    }
    return {
      layers: s.layers.filter((a, c) => c !== l),
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
      const a = r.store.getPixel(n, s);
      if (a !== 0)
        return a;
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
    const a = Math.floor(l / B), c = Math.floor(s / B);
    e((u) => {
      const h = new Set(u.dirtyBlocks);
      return h.add(`${n}:${a}:${c}`), { version: u.version + 1, dirtyBlocks: h };
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
      const a = Math.floor(r.y / B), c = Math.floor(r.x / B);
      i.add(`${n}:${a}:${c}`);
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
    var r, a;
    const l = n.map((c) => {
      const u = new pl();
      for (const h of c.blocks)
        u.setBlock(h.row, h.col, h.data);
      return { id: c.id, name: c.name, visible: c.visible, store: u };
    }), i = ((r = l.find((c) => c.id === s)) == null ? void 0 : r.id) ?? ((a = l[0]) == null ? void 0 : a.id) ?? null;
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
    const s = co(), l = new pl();
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
    const n = co();
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
      const [r, a, c] = i.split(":");
      return r ? { layerId: r, row: Number(a), col: Number(c) } : null;
    }).filter((i) => i !== null);
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), W0 = (e, t) => `${e}:${t}`, W = tt(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(W0(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class U0 {
  constructor() {
    this.activeTool = null;
  }
  setTool(t) {
    this.activeTool = t;
  }
  handleEvent(t, n) {
    var s, l, i, r, a, c, u, h, p, d;
    if (this.activeTool)
      switch (t) {
        case "hover":
          (l = (s = this.activeTool).onHover) == null || l.call(s, n);
          break;
        case "begin":
          (r = (i = this.activeTool).onBegin) == null || r.call(i, n);
          break;
        case "move":
          (c = (a = this.activeTool).onMove) == null || c.call(a, n);
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
const $0 = "Pixel Splash Studio", V0 = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${$0} - ${n}${t ? "*" : ""}`;
}, xe = tt((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), K0 = () => {
  const e = xe.getState();
  return V0(e.path, e.dirty);
}, di = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, mx = 64, Nu = 2, Pu = 24, mc = 6, G0 = 1, Q0 = 1, Yo = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(mx, Math.max(1, Math.floor(e))), Z0 = (e) => Math.max(Nu, Math.min(Pu, Math.round(e))), gc = (e) => ({
  ...e,
  columns: Yo(e.columns, G0),
  rows: Yo(e.rows, Q0)
}), q0 = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, J0 = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, e1 = (e, t) => {
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
}, t1 = (e, t) => {
  const n = e.tiles.length, s = Math.max(1, e.columns), l = Math.ceil(n / s), i = [];
  let r = 0;
  for (let p = 0; p < l; p += 1) {
    const d = p * s, f = Math.min(n, d + s);
    let g = !0;
    for (let w = d; w < f; w += 1)
      if (!t.has(w)) {
        g = !1;
        break;
      }
    g && (i.push(p), r += f - d);
  }
  const a = [];
  let c = 0;
  for (let p = 0; p < s; p += 1) {
    let d = !1, f = !0, g = 0;
    for (let w = 0; w < l; w += 1) {
      const M = w * s + p;
      if (!(M >= n) && (d = !0, g += 1, !t.has(M))) {
        f = !1;
        break;
      }
    }
    d && f && (a.push(p), c += g);
  }
  const u = i.length > 0 && r === t.size;
  if (a.length > 0 && c === t.size && s - a.length >= 1) {
    const p = new Set(a), d = /* @__PURE__ */ new Map(), f = [];
    for (let g = 0; g < l; g += 1)
      for (let w = 0; w < s; w += 1) {
        const M = g * s + w;
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
    const g = l === e.rows ? Math.max(1, e.rows - p.size) : e.rows;
    return {
      nextTiles: f,
      indexMap: d,
      nextColumns: e.columns,
      nextRows: g
    };
  }
  return e1(e, t);
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
  tilePickerZoom: mc,
  tilePlacementMode: "hard",
  tilePenSnapToCluster: !1,
  tileDebugOverlay: !1,
  nineSlice: null,
  setTileSets: (n) => e((s) => {
    const l = n.map(gc), i = q0(
      l,
      s.activeTileSetId
    ), r = l.find((a) => a.id === i);
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
    const l = n.map(gc), i = l[0];
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
    tilePaletteColumns: Math.min(mx, Math.max(1, n)),
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
    tilePickerZoom: Number.isFinite(n) && n > 0 ? Z0(n) : mc
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
    const r = Yo(s, i.columns), a = Yo(l, i.rows);
    i.columns === r && i.rows === a || (xe.getState().setDirty(!0), e((c) => ({
      tileSets: c.tileSets.map(
        (u) => u.id === n ? { ...u, columns: r, rows: a } : u
      ),
      tilePaletteColumns: c.activeTileSetId === n ? r : c.tilePaletteColumns,
      tilePaletteRowsMin: c.activeTileSetId === n ? a : c.tilePaletteRowsMin
    })));
  },
  renameTileSet: (n, s) => {
    const l = s.trim();
    if (!l)
      return;
    const i = t().tileSets.find((r) => r.id === n);
    !i || i.name === l || (xe.getState().setDirty(!0), e((r) => ({
      tileSets: r.tileSets.map(
        (a) => a.id === n ? { ...a, name: l } : a
      )
    })));
  },
  deleteTileSet: (n) => {
    var h;
    const s = t(), l = s.tileSets.findIndex((p) => p.id === n);
    if (l < 0)
      return;
    const i = s.tileSets.filter((p) => p.id !== n), r = s.tileMaps.filter((p) => p.tileSetId !== n), a = (() => {
      var d;
      if (s.activeTileSetId && s.activeTileSetId !== n)
        return s.activeTileSetId;
      const p = Math.min(l, Math.max(0, i.length - 1));
      return ((d = i[p]) == null ? void 0 : d.id) ?? null;
    })(), c = i.find((p) => p.id === a) ?? i[0], u = (() => {
      var f;
      if (r.some((g) => g.id === s.activeTileMapId))
        return s.activeTileMapId;
      const d = r.find(
        (g) => g.tileSetId === ((c == null ? void 0 : c.id) ?? null)
      );
      return (d == null ? void 0 : d.id) ?? ((f = r[0]) == null ? void 0 : f.id) ?? null;
    })();
    xe.getState().setDirty(!0), e({
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
    const s = t(), l = s.tileSets.find((a) => a.id === n);
    if (!l)
      return null;
    const i = di("tileset"), r = {
      ...l,
      id: i,
      name: J0(
        l.name,
        s.tileSets.map((a) => a.name)
      ),
      tiles: l.tiles.map((a) => ({
        ...a,
        id: di("tile"),
        pixels: a.pixels.slice()
      }))
    };
    return xe.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, r],
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
    const { id: s, ...l } = n, i = s ?? di("tileset"), r = gc({ id: i, ...l });
    return xe.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, r],
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
    s.length !== 0 && (xe.getState().setDirty(!0), e((l) => ({
      tileSets: l.tileSets.map((i) => {
        if (i.id !== n)
          return i;
        const r = s.map((a) => ({
          id: di("tile"),
          ...a
        }));
        return { ...i, tiles: [...i.tiles, ...r] };
      })
    })));
  },
  refreshCanvasSourcedTiles: (n, s) => {
    if (!n && s.length === 0)
      return;
    const l = n ? null : new Set(s.map((a) => `${a.row}:${a.col}`)), i = ee.getState(), r = (a, c, u, h) => {
      if (!l)
        return !0;
      const p = a, d = c, f = a + Math.max(0, u - 1), g = c + Math.max(0, h - 1), w = Math.floor(p / B), M = Math.floor(f / B), v = Math.floor(d / B), m = Math.floor(g / B);
      for (let x = v; x <= m; x += 1)
        for (let S = w; S <= M; S += 1)
          if (l.has(`${x}:${S}`))
            return !0;
      return !1;
    };
    e((a) => {
      let c = !1;
      const u = a.tileSets.map((h) => {
        const p = h.tileWidth, d = h.tileHeight;
        let f = !1;
        const g = h.tiles.map((w) => {
          const M = w.source;
          if (!M || M.kind !== "canvas" || !r(M.x, M.y, p, d))
            return w;
          const v = [];
          for (let m = 0; m < d; m += 1)
            for (let x = 0; x < p; x += 1)
              v.push(i.getPixelComposite(M.x + x, M.y + m));
          return c = !0, f = !0, { ...w, pixels: v };
        });
        return f ? { ...h, tiles: g } : h;
      });
      return c ? { tileSets: u } : a;
    });
  },
  deleteTilesFromSet: (n, s) => {
    if (s.length === 0)
      return;
    const l = Array.from(new Set(s.filter((r) => r >= 0)));
    if (l.length === 0)
      return;
    const i = new Set(l);
    xe.getState().setDirty(!0), e((r) => {
      var m;
      const a = r.tileSets.find((x) => x.id === n);
      if (!a)
        return r;
      const c = new Set(
        Array.from(i).filter((x) => x >= 0 && x < a.tiles.length)
      );
      if (c.size === 0)
        return r;
      const { nextTiles: u, indexMap: h, nextColumns: p, nextRows: d } = t1(
        a,
        c
      ), f = (x) => x.map((S) => S >= 0 ? h.get(S) ?? -1 : -1), g = f(r.selectedTileIndices).filter(
        (x) => x >= 0
      ), w = (u.length > 0, 0), v = (g.length > 0 ? g : [w])[0] ?? w;
      return {
        tileSets: r.tileSets.map(
          (x) => x.id === n ? { ...x, tiles: u, columns: p, rows: d } : x
        ),
        tileMaps: r.tileMaps.map((x) => {
          if (x.tileSetId !== n)
            return x;
          const S = x.tiles.map((b) => b < 0 ? -1 : h.get(b) ?? -1);
          return { ...x, tiles: S };
        }),
        selectedTileIndex: v,
        selectedTileIndices: [v],
        selectedTileCols: 1,
        selectedTileRows: 1,
        tilePaletteColumns: r.activeTileSetId === n ? p : r.tilePaletteColumns,
        tilePaletteRowsMin: r.activeTileSetId === n ? d : r.tilePaletteRowsMin,
        nineSlice: ((m = r.nineSlice) == null ? void 0 : m.tileSetId) === n && r.nineSlice.tiles.length > 0 ? {
          ...r.nineSlice,
          tiles: f(r.nineSlice.tiles)
        } : r.nineSlice
      };
    });
  },
  consolidateTileSet: (n) => {
    xe.getState().setDirty(!0), e((s) => {
      var g;
      const l = s.tileSets.find((w) => w.id === n);
      if (!l)
        return s;
      const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), a = [];
      let c = 0;
      l.tiles.forEach((w, M) => {
        const v = w.pixels.join(","), m = r.get(v);
        if (m !== void 0) {
          i.set(M, m);
          return;
        }
        r.set(v, c), i.set(M, c), a.push(w), c += 1;
      });
      const u = (w) => w.map((M) => M >= 0 ? i.get(M) ?? -1 : -1), h = u(s.selectedTileIndices).filter(
        (w) => w >= 0
      ), p = (a.length > 0, 0), f = (h.length > 0 ? h : [p])[0] ?? p;
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
        selectedTileIndex: f,
        selectedTileIndices: [f],
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
    const { id: s, ...l } = n, i = s ?? di("tilemap"), r = { id: i, ...l };
    return xe.getState().setDirty(!0), e((a) => ({
      tileMaps: [...a.tileMaps, r],
      activeTileMapId: i
    })), i;
  },
  setTileMapTiles: (n, s) => {
    s.length !== 0 && (xe.getState().setDirty(!0), e((l) => ({
      tileMaps: l.tileMaps.map((i) => {
        if (i.id !== n)
          return i;
        const r = i.tiles.slice();
        for (const a of s)
          a.index < 0 || a.index >= r.length || (r[a.index] = a.tile);
        return { ...i, tiles: r };
      })
    })));
  },
  expandTileMapToInclude: (n, s, l, i, r, a, c) => {
    const h = t().tileMaps.find((x) => x.id === n);
    if (!h)
      return null;
    const p = Math.max(0, -s), d = Math.max(0, -i), f = Math.max(0, l - (h.columns - 1)), g = Math.max(0, r - (h.rows - 1));
    if (p === 0 && d === 0 && f === 0 && g === 0)
      return h;
    const w = h.columns + p + f, M = h.rows + d + g, v = new Array(w * M).fill(-1);
    for (let x = 0; x < h.rows; x += 1)
      for (let S = 0; S < h.columns; S += 1) {
        const b = x * h.columns + S, _ = (x + d) * w + (S + p);
        v[_] = h.tiles[b] ?? -1;
      }
    const m = {
      ...h,
      originX: h.originX - p * a,
      originY: h.originY - d * c,
      columns: w,
      rows: M,
      tiles: v
    };
    return xe.getState().setDirty(!0), e((x) => ({
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
    tilePickerZoom: mc,
    tilePlacementMode: "hard",
    tilePenSnapToCluster: !1,
    tileDebugOverlay: !1,
    nineSlice: null
  })
})), n1 = (e) => ({
  ...e,
  pixels: e.pixels.slice(),
  source: e.source ? { ...e.source } : void 0
}), gx = (e) => ({
  ...e,
  tiles: e.tiles.map(n1)
}), xx = (e) => ({
  ...e,
  tiles: e.tiles.slice()
}), Iu = (e) => ({
  tileSets: e.tileSets.map(gx),
  tileMaps: e.tileMaps.map(xx),
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
    tileSets: e.tileSets.map(gx),
    tileMaps: e.tileMaps.map(xx),
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
}, s1 = (e, t) => JSON.stringify(e) === JSON.stringify(t), qs = (e, t) => s1(e, t) ? !1 : (Ae.getState().pushBatch({
  changes: [],
  tileBefore: e,
  tileAfter: t
}), !0), lp = (e) => {
  const t = Iu(e);
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
    xe.getState().setDirty(!0);
    const s = {
      layerId: n.changes.length > 0 ? n.layerId ?? ee.getState().activeLayerId : n.layerId,
      changes: n.changes,
      tileBefore: n.tileBefore ? Iu(n.tileBefore) : void 0,
      tileAfter: n.tileAfter ? Iu(n.tileAfter) : void 0
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
      if (xe.getState().setDirty(!0), s.changes.length > 0) {
        const l = ee.getState(), i = s.layerId ?? l.activeLayerId;
        for (const r of s.changes)
          l.setPixelInLayer(i, r.x, r.y, r.prev);
      }
      s.tileBefore && lp(s.tileBefore), e((l) => ({
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
      if (xe.getState().setDirty(!0), s.changes.length > 0) {
        const l = ee.getState(), i = s.layerId ?? l.activeLayerId;
        for (const r of s.changes)
          l.setPixelInLayer(i, r.x, r.y, r.next);
      }
      s.tileAfter && lp(s.tileAfter), e((l) => ({
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
})), mn = tt((e) => ({
  size: 1,
  shape: "point",
  setSize: (t) => e({ size: t }),
  setShape: (t) => e({ shape: t })
})), Ls = new pl(), ip = (e, t) => `${e}:${t}`, ye = tt((e, t) => ({
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
    const a = Math.floor(s / B), c = Math.floor(n / B);
    e((u) => {
      const h = new Set(u.dirtyBlocks);
      h.add(ip(a, c));
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
      const r = Ls.getPixel(i.x, i.y), a = i.selected ? 1 : 0;
      if (r === a)
        continue;
      Ls.setPixel(i.x, i.y, a);
      const c = Math.floor(i.y / B), u = Math.floor(i.x / B);
      s.add(ip(c, u)), l += a === 1 ? 1 : -1;
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
      const [r, a] = i.split(":");
      return { row: Number(r), col: Number(a) };
    });
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), l1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, rp = (e, t, n) => {
  const s = ye.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, yx = (e, t, n) => {
  const { size: s, shape: l } = mn.getState();
  if (l === "point") {
    rp(e, t, n);
    return;
  }
  const i = l1(s, l);
  for (const [r, a] of i)
    rp(e + r, t + a, n);
}, xc = (e, t) => {
  const n = Math.floor(e.canvasX / C), s = Math.floor(e.canvasY / C);
  yx(n, s, t);
};
class i1 {
  constructor() {
    this.id = "pen", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.changes = /* @__PURE__ */ new Map(), this.lastPoint = null, this.onHover = (t) => {
      if (this.drawing)
        return;
      W.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex();
      xc(t, l);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), xc(t, this.activeIndex), this.lastPoint = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
      if (this.lastPoint) {
        const s = Math.abs(n.x - this.lastPoint.x), l = Math.abs(n.y - this.lastPoint.y), i = this.lastPoint.x < n.x ? 1 : -1, r = this.lastPoint.y < n.y ? 1 : -1;
        let a = s - l, c = this.lastPoint.x, u = this.lastPoint.y;
        for (; yx(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
          const h = 2 * a;
          h > -l && (a -= l, c += i), h < s && (a += s, u += r);
        }
      } else
        xc(t, this.activeIndex);
      this.lastPoint = n;
    }, this.onEnd = () => {
      var p;
      if (!this.drawing)
        return;
      const t = performance.now(), n = W.getState(), s = ee.getState(), l = this.layerId ?? s.activeLayerId, i = [];
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
          const g = this.changes.get(f);
          g && (g.next = d.paletteIndex);
        }
        i.push({ x: d.x, y: d.y, paletteIndex: d.paletteIndex });
      }
      s.setPixelsInLayer(l, i);
      const a = performance.now();
      Ae.getState().pushBatch({ layerId: l, changes: Array.from(this.changes.values()) });
      const u = performance.now();
      this.changes.clear(), n.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
      const h = performance.now();
      (p = window.debugApi) == null || p.logPerf(
        [
          "pen:onEnd",
          `entries=${r}`,
          `pixelsMs=${(a - t).toFixed(2)}`,
          `historyMs=${(u - a).toFixed(2)}`,
          `totalMs=${(h - t).toFixed(2)}`
        ].join(" ")
      );
    }, this.onCancel = () => {
      W.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
    };
  }
}
const yc = (e, t, n) => Math.min(n, Math.max(t, e)), Gt = tt((e) => ({
  radius: 6,
  density: 250,
  falloff: 0.25,
  deterministic: !1,
  seed: 1,
  setRadius: (t) => e({ radius: yc(Math.round(t), 1, 64) }),
  setDensity: (t) => e({ density: yc(Math.round(t), 1, 2e4) }),
  setFalloff: (t) => e({ falloff: yc(t, 0, 1) }),
  setDeterministic: (t) => e({ deterministic: t }),
  setSeed: (t) => e({ seed: Math.max(0, Math.round(t)) })
})), op = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), r1 = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), ap = (e, t, n, s) => {
  const l = ye.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || W.getState().setPixel(t, n, s);
}, o1 = () => {
  const e = re.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, a1 = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class c1 {
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
        const c = Math.floor(s.canvasX / C), u = Math.floor(s.canvasY / C), h = Math.max(1, n.radius), d = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, f = this.rng ?? Math.random, g = this.activeIndex === 0 ? [0] : o1(), w = g.length > 1, M = w ? g : null, v = g[0] ?? this.activeIndex;
        for (let m = 0; m < a; m += 1) {
          const x = f() * Math.PI * 2, S = f(), b = Math.pow(S, d) * h, _ = Math.round(Math.cos(x) * b), k = Math.round(Math.sin(x) * b), j = w ? (M == null ? void 0 : M[Math.floor(f() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : v;
          ap(s, c + _, u + k, j);
        }
      }
      this.frameHandle = op(this.step);
    }, this.onHover = (t) => {
      if (this.drawing)
        return;
      W.getState().clear();
      const s = re.getState(), l = Math.floor(t.canvasX / C), i = Math.floor(t.canvasY / C), r = t.alt ? 0 : s.getActiveIndex();
      ap(t, l, i, r);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), this.lastCursor = t, this.emissionBudget = 0, this.lastFrameTime = typeof requestAnimationFrame == "function" ? performance.now() : Date.now();
      const { deterministic: l, seed: i } = Gt.getState();
      this.rng = l ? a1(i) : null, this.stopLoop(), this.frameHandle = op(this.step);
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
      const t = W.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId, l = [];
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
          const a = this.changes.get(r);
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
const uo = (e) => Math.min(255, Math.max(0, Math.round(e))), yt = (e) => {
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
}, Ed = (e) => `rgb(${e.r}, ${e.g}, ${e.b})`, un = (e, t) => `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`, hs = (e, t, n) => ({
  r: uo(e.r + (t.r - e.r) * n),
  g: uo(e.g + (t.g - e.g) * n),
  b: uo(e.b + (t.b - e.b) * n)
}), vc = (e) => uo(e).toString(16).padStart(2, "0"), Ul = (e) => `#${vc(e.r)}${vc(e.g)}${vc(e.b)}`, da = (e) => ({
  r: 255 - e.r,
  g: 255 - e.g,
  b: 255 - e.b
}), u1 = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, d1 = (e) => u1(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, h1 = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), ha = (e, t, n = 60) => h1(e, t) < n ? d1(e) : t, Mt = tt((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), fa = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, Eu = (e, t, n) => Math.min(n, Math.max(t, e)), f1 = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, p1 = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, m1 = [
  [0, 2],
  [3, 1]
], g1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], x1 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], y1 = (e, t, n) => e === "bayer2" ? (m1[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (g1[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (x1[n & 7][t & 7] + 0.5) / 64 : e === "random" ? f1(t, n) : e === "blue-noise" ? p1(t, n) : 0.5, cp = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const i = n.maxX - n.minX, r = n.maxY - n.minY, a = i === 0 ? 1 : i, c = r === 0 ? 1 : r, u = e - n.minX, h = t - n.minY;
  let p = 0;
  return s === "top-bottom" ? p = h / c : s === "bottom-top" ? p = 1 - h / c : s === "left-right" ? p = u / a : s === "right-left" && (p = 1 - u / a), p = Eu(p, 0, 1), p * (l - 1);
}, v1 = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", w1 = (e) => e === "floyd-steinberg" ? [
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
  const i = n.length, r = /* @__PURE__ */ new Map();
  if (i === 0 || e.length === 0)
    return r;
  if (!v1(l)) {
    for (const A of e) {
      const L = cp(A.x, A.y, t, s, i), Y = Math.floor(L), N = L - Y, O = y1(l, A.x, A.y), G = N > O ? Y + 1 : Y, oe = Eu(G, 0, i - 1);
      r.set(`${A.x}:${A.y}`, n[oe] ?? 0);
    }
    return r;
  }
  const a = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = a * c, h = Number.isFinite(u) && u > 0 && u <= 2e6;
  let p = null, d = null, f = null, g = null;
  if (h) {
    p = new Uint8Array(u), d = new Float32Array(u);
    for (const A of e) {
      const L = (A.y - t.minY) * a + (A.x - t.minX);
      L >= 0 && L < p.length && (p[L] = 1);
    }
  } else {
    f = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    for (const A of e)
      f.add(`${A.x}:${A.y}`);
  }
  const w = (A, L) => {
    if (p) {
      const Y = (L - t.minY) * a + (A - t.minX);
      return Y >= 0 && Y < p.length && p[Y] === 1;
    }
    return (f == null ? void 0 : f.has(`${A}:${L}`)) ?? !1;
  }, M = (A, L) => {
    if (d) {
      const Y = (L - t.minY) * a + (A - t.minX);
      return d[Y] ?? 0;
    }
    return (g == null ? void 0 : g.get(`${A}:${L}`)) ?? 0;
  }, v = (A, L, Y) => {
    if (!w(A, L))
      return;
    if (d) {
      const O = (L - t.minY) * a + (A - t.minX);
      d[O] += Y;
      return;
    }
    const N = `${A}:${L}`;
    g == null || g.set(N, (g.get(N) ?? 0) + Y);
  }, m = s === "right-left" ? -1 : 1, x = s === "bottom-top" ? -1 : 1, S = m > 0 ? t.minX : t.maxX, b = m > 0 ? t.maxX : t.minX, _ = x > 0 ? t.minY : t.maxY, k = x > 0 ? t.maxY : t.minY, j = w1(l);
  for (let A = _; x > 0 ? A <= k : A >= k; A += x)
    for (let L = S; m > 0 ? L <= b : L >= b; L += m) {
      if (!w(L, A))
        continue;
      const N = cp(L, A, t, s, i) + M(L, A), O = Eu(Math.round(N), 0, i - 1);
      r.set(`${L}:${A}`, n[O] ?? 0);
      const G = N - O;
      if (!Number.isFinite(G) || G === 0)
        continue;
      const oe = [];
      let Q = 0;
      for (const ne of j) {
        const D = L + ne.dx * m, F = A + ne.dy * x;
        w(D, F) && (oe.push({ x: D, y: F, weight: ne.weight }), Q += ne.weight);
      }
      if (!(Q <= 0))
        for (const ne of oe)
          v(ne.x, ne.y, G * ne.weight / Q);
    }
  return r;
}, Ru = (e, t, n) => {
  const s = ye.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, S1 = (e, t, n, s, l) => {
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; Ru(e, t, l), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += a), h < i && (u += i, t += c);
  }
}, M1 = (e, t, n, s) => {
  const l = [];
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; l.push({ x: e, y: t }), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += a), h < i && (u += i, t += c);
  }
  return l;
};
class b1 {
  constructor() {
    this.id = "line", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onHover = (t) => {
      if (this.start)
        return;
      W.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex(), i = Math.floor(t.canvasX / C), r = Math.floor(t.canvasY / C);
      Ru(i, r, l);
    }, this.onBegin = (t) => {
      W.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
      let l = s;
      if (t.shift) {
        const r = s.x - this.start.x, a = s.y - this.start.y, c = Math.atan2(a, r), u = Math.round(c / (Math.PI / 4)) * (Math.PI / 4), h = Math.max(Math.abs(r), Math.abs(a));
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
        }, a = M1(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = Mt.getState(), h = Zi(
          a,
          r,
          i,
          c,
          u
        );
        for (const p of a)
          Ru(p.x, p.y, h.get(`${p.x}:${p.y}`) ?? i[0] ?? 0);
      } else
        S1(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
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
          const a = this.changes.get(r);
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
const Xo = tt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), _1 = (e, t, n) => {
  const s = ye.getState(), l = W.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = a; u <= c; u += 1)
    for (let h = i; h <= r; h += 1)
      s.selectedCount > 0 && !s.isSelected(h, u) || l.setPixel(h, u, n);
}, T1 = (e, t, n) => {
  const s = ye.getState(), l = W.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = i; u <= r; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, a)) && l.setPixel(u, a, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = a + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n), (s.selectedCount === 0 || s.isSelected(r, u)) && l.setPixel(r, u, n);
};
class k1 {
  constructor() {
    this.id = "rectangle", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      W.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      }, l = Xo.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], r = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = ye.getState(), c = [];
        if (l === "filled")
          for (let d = r.minY; d <= r.maxY; d += 1)
            for (let f = r.minX; f <= r.maxX; f += 1)
              a.selectedCount > 0 && !a.isSelected(f, d) || c.push({ x: f, y: d });
        else {
          for (let d = r.minX; d <= r.maxX; d += 1)
            (a.selectedCount === 0 || a.isSelected(d, r.minY)) && c.push({ x: d, y: r.minY }), (a.selectedCount === 0 || a.isSelected(d, r.maxY)) && c.push({ x: d, y: r.maxY });
          for (let d = r.minY + 1; d <= r.maxY - 1; d += 1)
            (a.selectedCount === 0 || a.isSelected(r.minX, d)) && c.push({ x: r.minX, y: d }), (a.selectedCount === 0 || a.isSelected(r.maxX, d)) && c.push({ x: r.maxX, y: d });
        }
        const { gradientDirection: u, gradientDither: h } = Mt.getState(), p = Zi(
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
        _1(this.start, s, this.activeIndex);
        return;
      }
      T1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
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
          const a = this.changes.get(r);
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
const Fo = tt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), fs = (e, t, n) => {
  const s = ye.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, Oo = (e, t, n, s, l) => {
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; fs(e, t, l), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += a), h < i && (u += i, t += c);
  }
}, C1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y), a = (l - s) / 2, c = (r - i) / 2, u = (s + l) / 2, h = (i + r) / 2;
  if (a === 0 && c === 0) {
    fs(s, i, n);
    return;
  }
  if (a === 0) {
    Oo(s, i, s, r, n);
    return;
  }
  if (c === 0) {
    Oo(s, i, l, i, n);
    return;
  }
  const p = a * a, d = c * c;
  for (let f = i; f <= r; f += 1) {
    const g = f - h;
    for (let w = s; w <= l; w += 1) {
      const M = w - u;
      M * M / p + g * g / d <= 1 && fs(w, f, n);
    }
  }
}, j1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y), a = (l - s) / 2, c = (r - i) / 2, u = (s + l) / 2, h = (i + r) / 2;
  if (a === 0 && c === 0) {
    fs(s, i, n);
    return;
  }
  if (a === 0) {
    Oo(s, i, s, r, n);
    return;
  }
  if (c === 0) {
    Oo(s, i, l, i, n);
    return;
  }
  const p = a * a, d = c * c;
  for (let f = s; f <= l; f += 1) {
    const g = f - u, w = 1 - g * g / p;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * c, v = Math.round(h - M), m = Math.round(h + M);
    fs(f, v, n), fs(f, m, n);
  }
  for (let f = i; f <= r; f += 1) {
    const g = f - h, w = 1 - g * g / d;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * a, v = Math.round(u - M), m = Math.round(u + M);
    fs(v, f, n), fs(m, f, n);
  }
};
class N1 {
  constructor() {
    this.id = "oval", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      W.getState().clear();
      const s = re.getState();
      this.layerId = ee.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / C),
        y: Math.floor(t.canvasY / C)
      }, l = Fo.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], r = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = ye.getState(), c = [], u = (r.maxX - r.minX) / 2, h = (r.maxY - r.minY) / 2, p = (r.minX + r.maxX) / 2, d = (r.minY + r.maxY) / 2, f = (m, x) => a.selectedCount === 0 || a.isSelected(m, x), g = (m, x) => {
          f(m, x) && c.push({ x: m, y: x });
        };
        if (u === 0 && h === 0)
          g(r.minX, r.minY);
        else if (u === 0)
          for (let m = r.minY; m <= r.maxY; m += 1)
            g(r.minX, m);
        else if (h === 0)
          for (let m = r.minX; m <= r.maxX; m += 1)
            g(m, r.minY);
        else if (l === "filled") {
          const m = u * u, x = h * h;
          for (let S = r.minY; S <= r.maxY; S += 1) {
            const b = S - d;
            for (let _ = r.minX; _ <= r.maxX; _ += 1) {
              const k = _ - p;
              k * k / m + b * b / x <= 1 && g(_, S);
            }
          }
        } else {
          const m = u * u, x = h * h;
          for (let S = r.minX; S <= r.maxX; S += 1) {
            const b = S - p, _ = 1 - b * b / m;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * h;
            g(S, Math.round(d - k)), g(S, Math.round(d + k));
          }
          for (let S = r.minY; S <= r.maxY; S += 1) {
            const b = S - d, _ = 1 - b * b / x;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * u;
            g(Math.round(p - k), S), g(Math.round(p + k), S);
          }
        }
        const { gradientDirection: w, gradientDither: M } = Mt.getState(), v = Zi(
          c,
          r,
          i,
          w,
          M
        );
        for (const m of c)
          n.setPixel(m.x, m.y, v.get(`${m.x}:${m.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        C1(this.start, s, this.activeIndex);
        return;
      }
      j1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = W.getState(), n = ee.getState(), s = this.layerId ?? n.activeLayerId;
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
          const a = this.changes.get(r);
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
})), P1 = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), I1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, wc = (e, t) => I1(P1(e), t), up = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * me,
    maxX: (l + 1) * me - 1,
    minY: i * me,
    maxY: (r + 1) * me - 1
  } : { minX: s, maxX: l, minY: i, maxY: r };
}, E1 = (e, t) => {
  const n = W.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  for (let a = i; a <= r; a += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, a, 1);
};
class R1 {
  constructor() {
    this.id = "selection-rect", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      W.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : $l.getState().snap, this.start = wc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = wc(t, this.snap);
      this.last = s;
      const l = up(this.start, s, this.snap);
      E1({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = ye.getState(), l = t ? wc(t, this.snap) : this.last ?? this.start, i = up(this.start, l, this.snap), r = !this.isRemoving, a = [];
      for (let c = i.minY; c <= i.maxY; c += 1)
        for (let u = i.minX; u <= i.maxX; u += 1)
          a.push({ x: u, y: c, selected: r });
      s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const A1 = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), L1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, Sc = (e, t) => L1(A1(e), t), dp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * me,
    maxX: (l + 1) * me - 1,
    minY: i * me,
    maxY: (r + 1) * me - 1
  } : { minX: s, maxX: l, minY: i, maxY: r };
}, hp = (e, t) => {
  const { minX: n, maxX: s, minY: l, maxY: i } = e, r = (s - n) / 2, a = (i - l) / 2, c = (n + s) / 2, u = (l + i) / 2;
  if (r === 0 && a === 0) {
    t(n, l);
    return;
  }
  if (r === 0) {
    for (let d = l; d <= i; d += 1)
      t(n, d);
    return;
  }
  if (a === 0) {
    for (let d = n; d <= s; d += 1)
      t(d, l);
    return;
  }
  const h = r * r, p = a * a;
  for (let d = l; d <= i; d += 1) {
    const f = d - u;
    for (let g = n; g <= s; g += 1) {
      const w = g - c;
      w * w / h + f * f / p <= 1 && t(g, d);
    }
  }
};
class D1 {
  constructor() {
    this.id = "selection-oval", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      W.getState().clear(), this.isRemoving = t.ctrl, this.snap = Js.getState().mode === "tile" ? "tile" : $l.getState().snap, this.start = Sc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = W.getState();
      n.clear();
      const s = Sc(t, this.snap);
      this.last = s;
      const l = dp(this.start, s, this.snap);
      hp(l, (i, r) => n.setPixel(i, r, 1));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = ye.getState(), l = t ? Sc(t, this.snap) : this.last ?? this.start, i = dp(this.start, l, this.snap), r = !this.isRemoving, a = [];
      hp(i, (c, u) => {
        a.push({ x: c, y: u, selected: r });
      }), s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const B1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, Y1 = (e) => {
  var v, m, x, S;
  if (e.length === 0)
    return [];
  let t = ((v = e[0]) == null ? void 0 : v.x) ?? 0, n = ((m = e[0]) == null ? void 0 : m.x) ?? 0, s = ((x = e[0]) == null ? void 0 : x.y) ?? 0, l = ((S = e[0]) == null ? void 0 : S.y) ?? 0;
  for (const b of e)
    t = Math.min(t, b.x), n = Math.max(n, b.x), s = Math.min(s, b.y), l = Math.max(l, b.y);
  const i = 1, r = t - i, a = s - i, c = n - t + 1 + i * 2, u = l - s + 1 + i * 2;
  if (c <= 0 || u <= 0)
    return [];
  const h = c * u;
  if (h > 5e6)
    return e;
  const p = new Uint8Array(h);
  for (const b of e) {
    const _ = b.x - r, k = b.y - a;
    _ < 0 || _ >= c || k < 0 || k >= u || (p[_ + k * c] = 1);
  }
  const d = new Uint8Array(h), f = [];
  let g = 0;
  const w = (b, _) => {
    const k = b + _ * c;
    d[k] === 1 || p[k] === 1 || (d[k] = 1, f.push(k));
  };
  for (let b = 0; b < c; b += 1)
    w(b, 0), w(b, u - 1);
  for (let b = 1; b < u - 1; b += 1)
    w(0, b), w(c - 1, b);
  for (; g < f.length; ) {
    const b = f[g] ?? 0;
    g += 1;
    const _ = b % c, k = Math.floor(b / c);
    _ > 0 && w(_ - 1, k), _ + 1 < c && w(_ + 1, k), k > 0 && w(_, k - 1), k + 1 < u && w(_, k + 1);
  }
  const M = [];
  for (let b = 1; b < u - 1; b += 1)
    for (let _ = 1; _ < c - 1; _ += 1) {
      const k = _ + b * c, j = p[k] === 1;
      (!(d[k] === 1) || j) && M.push({ x: r + _, y: a + b });
    }
  return M;
}, Mc = (e, t) => {
  const n = Math.floor(e.canvasX / C), s = Math.floor(e.canvasY / C);
  return t ? {
    x: Math.floor(n / me),
    y: Math.floor(s / me)
  } : { x: n, y: s };
}, ho = (e, t, n) => {
  const s = W.getState();
  if (n) {
    const a = e * me, c = t * me;
    for (let u = 0; u < me; u += 1)
      for (let h = 0; h < me; h += 1)
        s.setPixel(a + h, c + u, 1);
    return;
  }
  const { size: l, shape: i } = mn.getState();
  if (i === "point") {
    s.setPixel(e, t, 1);
    return;
  }
  const r = B1(l, i);
  for (const [a, c] of r)
    s.setPixel(e + a, t + c, 1);
}, fp = (e, t, n) => {
  const s = Math.abs(t.x - e.x), l = Math.abs(t.y - e.y), i = e.x < t.x ? 1 : -1, r = e.y < t.y ? 1 : -1;
  let a = s - l, c = e.x, u = e.y;
  for (; ho(c, u, n), !(c === t.x && u === t.y); ) {
    const h = 2 * a;
    h > -l && (a -= l, c += i), h < s && (a += s, u += r);
  }
}, X1 = (e) => {
  var l, i;
  if (e.length < 4)
    return [];
  let t = ((l = e[0]) == null ? void 0 : l.y) ?? 0, n = ((i = e[0]) == null ? void 0 : i.y) ?? 0;
  for (const r of e)
    t = Math.min(t, r.y), n = Math.max(n, r.y);
  const s = [];
  for (let r = t; r <= n; r += 1) {
    const a = r + 0.5, c = [];
    for (let u = 0; u < e.length - 1; u += 1) {
      const h = e[u], p = e[u + 1];
      if (!h || !p || h.y === p.y)
        continue;
      const d = Math.min(h.y, p.y), f = Math.max(h.y, p.y);
      if (a < d || a >= f)
        continue;
      const g = (a - h.y) / (p.y - h.y), w = h.x + g * (p.x - h.x);
      c.push(w);
    }
    c.sort((u, h) => u - h);
    for (let u = 0; u < c.length - 1; u += 2) {
      const h = c[u] ?? 0, p = c[u + 1] ?? 0, d = Math.ceil(Math.min(h, p) - 0.5), f = Math.floor(Math.max(h, p) - 0.5);
      for (let g = d; g <= f; g += 1)
        s.push({ x: g, y: r });
    }
  }
  return s;
};
class F1 {
  constructor() {
    this.id = "selection-lasso", this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1, this.onHover = (t) => {
      if (this.drawing)
        return;
      this.tileMode = Js.getState().mode === "tile", W.getState().clear();
      const s = Mc(t, this.tileMode);
      ho(s.x, s.y, this.tileMode);
    }, this.onBegin = (t) => {
      W.getState().clear(), this.drawing = !0, this.isRemoving = t.ctrl, this.tileMode = Js.getState().mode === "tile";
      const s = Mc(t, this.tileMode);
      ho(s.x, s.y, this.tileMode), this.startPoint = s, this.lastPoint = s, this.path = [s];
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = Mc(t, this.tileMode);
      this.lastPoint && n.x === this.lastPoint.x && n.y === this.lastPoint.y || (this.lastPoint ? fp(this.lastPoint, n, this.tileMode) : ho(n.x, n.y, this.tileMode), this.lastPoint = n, this.path.push(n));
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      const t = W.getState(), n = ye.getState(), s = !this.isRemoving, { shape: l } = mn.getState(), i = this.startPoint, r = this.lastPoint;
      i && r && (i.x !== r.x || i.y !== r.y) && fp(r, i, this.tileMode);
      const a = [];
      for (const f of this.path) {
        const g = a[a.length - 1];
        (!g || g.x !== f.x || g.y !== f.y) && a.push(f);
      }
      const c = i ?? a[0] ?? null, u = a[a.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && a.push(c);
      const h = Array.from(t.entries()).map((f) => ({ x: f.x, y: f.y })), p = l === "point" && !this.tileMode ? X1(a) : Y1(h), d = (p.length > 0 ? p : h).map((f) => ({ x: f.x, y: f.y, selected: s }));
      n.setSelections(d), t.clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    }, this.onCancel = () => {
      W.getState().clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    };
  }
}
const $r = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, pp = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
});
class O1 {
  constructor() {
    this.id = "texture-roll", this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0, this.onBegin = (t) => {
      W.getState().clear();
      const n = ye.getState();
      if (n.selectedCount === 0)
        return;
      const s = pp(t);
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
      const n = pp(t), s = this.getStepSize(), l = Math.round((n.x - this.startCursor.x) / s) * s, i = Math.round((n.y - this.startCursor.y) / s) * s;
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
      n.length > 0 && Ae.getState().pushBatch({ layerId: this.layerId, changes: n }), W.getState().clear(), this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    }, this.onCancel = () => {
      if (W.getState().clear(), this.dragging && this.layerId) {
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
    return $l.getState().snap === "tile" ? me : 1;
  }
  collectSelection() {
    const t = ye.getState();
    if (t.selectedCount === 0)
      return null;
    const n = t.store.getBlocks(), s = [], l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const { row: r, col: a, block: c } of n) {
      const u = a * B, h = r * B;
      for (let p = 0; p < B; p += 1)
        for (let d = 0; d < B; d += 1) {
          if (c[p * B + d] !== 1)
            continue;
          const f = u + d, g = h + p;
          s.push({ x: f, y: g });
          const w = l.get(g) ?? [];
          w.push(f), l.set(g, w);
          const M = i.get(f) ?? [];
          M.push(g), i.set(f, M);
        }
    }
    if (s.length === 0)
      return null;
    for (const r of l.values())
      r.sort((a, c) => a - c);
    for (const r of i.values())
      r.sort((a, c) => a - c);
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
    const i = l.length, r = $r(s, i);
    if (r === 0)
      return;
    const a = l.map((c) => t.get(`${c}:${n}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = $r(c - r, i), h = l[c];
      t.set(`${h}:${n}`, a[u] ?? 0);
    }
  }
  rotateCol(t, n, s) {
    const l = this.colGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const i = l.length, r = $r(s, i);
    if (r === 0)
      return;
    const a = l.map((c) => t.get(`${n}:${c}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = $r(c - r, i), h = l[c];
      t.set(`${n}:${h}`, a[u] ?? 0);
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
    const a = [];
    for (const c of this.selectedPixels)
      a.push({
        x: c.x,
        y: c.y,
        paletteIndex: r.get(`${c.x}:${c.y}`) ?? 0
      });
    ee.getState().setPixelsInLayer(this.layerId, a);
  }
}
const Ns = () => {
  const e = ye.getState();
  if (e.selectedCount === 0)
    return null;
  const t = ee.getState(), n = [];
  let s = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY;
  const a = e.store.getBlocks();
  for (const { row: c, col: u, block: h } of a) {
    const p = u * B, d = c * B;
    for (let f = 0; f < B; f += 1)
      for (let g = 0; g < B; g += 1) {
        if (h[f * B + g] !== 1)
          continue;
        const w = p + g, M = d + f, v = t.getPixel(w, M);
        n.push({ x: w, y: M, paletteIndex: v }), s = Math.min(s, w), l = Math.max(l, w), i = Math.min(i, M), r = Math.max(r, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: i, maxY: r };
}, z1 = 2e3, H1 = 6, zs = [], Us = /* @__PURE__ */ new Map();
let zo = !1, mp = 1, Al = null;
const fo = () => typeof performance < "u" ? performance.now() : Date.now(), vx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(fo()), 0), W1 = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, wx = (e, t) => {
  const n = Math.floor(t / B), s = Math.floor(e / B);
  return `${n}:${s}`;
}, U1 = (e, t) => {
  t <= 0 || Us.set(e, (Us.get(e) ?? 0) + t);
}, $1 = (e) => {
  const t = (Us.get(e) ?? 0) - 1;
  t > 0 ? Us.set(e, t) : Us.delete(e);
}, Sx = () => {
  const e = zs[0];
  if (!e) {
    Ae.getState().setLocked(!1), zo = !1, Al = null;
    return;
  }
  const t = fo(), n = e.chunkSize, s = e.timeBudgetMs, l = ee.getState();
  for (; zs[0] === e && e.index < e.changes.length; ) {
    const i = [];
    for (; e.index < e.changes.length && i.length < n; ) {
      const r = e.changes[e.index];
      if (e.index += 1, i.push({ x: r.x, y: r.y, paletteIndex: r.next }), $1(wx(r.x, r.y)), fo() - t > s)
        break;
    }
    if (i.length > 0 && l.setPixelsInLayer(e.layerId, i), e.index >= e.changes.length) {
      Ae.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), zs.shift(), zs.length === 0 && Ae.getState().setLocked(!1);
      break;
    }
    if (fo() - t > s)
      break;
  }
  Al = vx(Sx);
}, V1 = () => {
  zo || (zo = !0, Al = vx(Sx));
}, qi = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  zs.length === 0 && Ae.getState().setLocked(!0);
  const n = String(mp);
  mp += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = ee.getState().activeLayerId, i = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : z1, r = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : H1;
  zs.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: i, timeBudgetMs: r });
  const a = /* @__PURE__ */ new Map();
  for (const u of e) {
    const h = wx(u.x, u.y);
    a.set(h, (a.get(h) ?? 0) + 1);
  }
  for (const [u, h] of a.entries())
    U1(u, h);
  V1();
}, K1 = () => Array.from(Us.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), Rd = () => {
  zs.length = 0, Us.clear(), Ae.getState().setLocked(!1), zo = !1, Al !== null && (W1(Al), Al = null);
}, Mx = () => {
  const e = Ce.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / C),
    minY: Math.floor(e.camera.y / C),
    maxX: Math.floor((e.camera.x + t) / C),
    maxY: Math.floor((e.camera.y + n) / C)
  };
}, G1 = (e) => {
  const t = ye.getState();
  if (t.selectedCount === 0)
    return;
  const n = ee.getState(), s = [], l = t.store.getBlocks();
  for (const { row: i, col: r, block: a } of l) {
    const c = r * B, u = i * B;
    for (let h = 0; h < B; h += 1)
      for (let p = 0; p < B; p += 1) {
        if (a[h * B + p] !== 1)
          continue;
        const d = c + p, f = u + h, g = n.getPixel(d, f);
        g !== e && s.push({ x: d, y: f, prev: g, next: e });
      }
  }
  s.length !== 0 && qi(s, { label: "Fill Selection" });
}, Q1 = (e, t, n, s) => {
  if (n === s)
    return;
  const l = ye.getState(), i = ee.getState(), r = l.selectedCount > 0, a = r ? null : Mx();
  if (!r && !a || r && !l.isSelected(e, t))
    return;
  const c = /* @__PURE__ */ new Set(), u = [e], h = [t], p = [];
  for (let d = 0; d < u.length; d += 1) {
    const f = u[d], g = h[d];
    if (a && (f < a.minX || f > a.maxX || g < a.minY || g > a.maxY))
      continue;
    const w = `${f}:${g}`;
    if (!c.has(w) && (c.add(w), !(r && !l.isSelected(f, g)) && i.getPixel(f, g) === n)) {
      if (a && (f === a.minX || f === a.maxX || g === a.minY || g === a.maxY))
        return;
      p.push({ x: f, y: g, prev: n, next: s }), u.push(f + 1, f - 1, f, f), h.push(g, g, g + 1, g - 1);
    }
  }
  p.length !== 0 && qi(p, { label: "Fill Region" });
}, Z1 = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, q1 = (e, t, n) => {
  const s = ye.getState(), l = ee.getState(), i = s.selectedCount > 0, r = i ? null : Mx();
  if (!i && !r || i && !s.isSelected(e, t))
    return null;
  const a = /* @__PURE__ */ new Set(), c = [e], u = [t], h = [];
  let p = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY, f = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY;
  for (let w = 0; w < c.length; w += 1) {
    const M = c[w], v = u[w];
    if (r && (M < r.minX || M > r.maxX || v < r.minY || v > r.maxY))
      continue;
    const m = `${M}:${v}`;
    if (a.has(m) || (a.add(m), i && !s.isSelected(M, v)))
      continue;
    const x = l.getPixel(M, v);
    if (x === n) {
      if (r && (M === r.minX || M === r.maxX || v === r.minY || v === r.maxY))
        return null;
      h.push({ x: M, y: v, prev: x }), p = Math.min(p, M), d = Math.max(d, M), f = Math.min(f, v), g = Math.max(g, v), c.push(M + 1, M - 1, M, M), u.push(v, v, v + 1, v - 1);
    }
  }
  return h.length === 0 ? null : { pixels: h, bounds: { minX: p, maxX: d, minY: f, maxY: g } };
}, gp = (e, t, n, s, l) => {
  const i = [];
  if (n.length === 0)
    return;
  const r = e.map((c) => ({ x: c.x, y: c.y })), a = Zi(r, t, n, s, l);
  for (const c of e) {
    const u = a.get(`${c.x}:${c.y}`) ?? n[0] ?? 0;
    u !== c.prev && i.push({ x: c.x, y: c.y, prev: c.prev, next: u });
  }
  i.length !== 0 && qi(i, { label: "Gradient Fill" });
};
class J1 {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      W.getState().clear();
      const n = re.getState(), s = Mt.getState().mode, l = Z1(), i = l.length > 1, r = l[0] ?? n.getActiveIndex(), { gradientDirection: a, gradientDither: c } = Mt.getState(), u = Math.floor(t.canvasX / C), h = Math.floor(t.canvasY / C);
      if (s === "selection") {
        if (!i) {
          G1(r);
          return;
        }
        const d = Ns();
        if (!d)
          return;
        const f = d.pixels.map((g) => ({
          x: g.x,
          y: g.y,
          prev: g.paletteIndex
        }));
        gp(
          f,
          {
            minX: d.minX,
            maxX: d.maxX,
            minY: d.minY,
            maxY: d.maxY
          },
          l,
          a,
          c
        );
        return;
      }
      if (i) {
        const d = ee.getState().getPixel(u, h), f = q1(u, h, d);
        if (!f)
          return;
        gp(f.pixels, f.bounds, l, a, c);
        return;
      }
      const p = ee.getState().getPixel(u, h);
      Q1(u, h, p, r);
    };
  }
}
const rt = tt((e) => ({
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
})), eS = () => {
  const e = rt.getState();
  if (e.pixels.length === 0)
    return !1;
  const t = re.getState(), n = t.colors, s = [...n], l = /* @__PURE__ */ new Map();
  for (const r of e.pixels) {
    const a = r.paletteIndex;
    if (a === 0 || l.has(a))
      continue;
    const c = n[a] ?? n[0] ?? "#000000";
    l.set(a, s.length), s.push(c);
  }
  if (l.size === 0)
    return !1;
  const i = e.pixels.map((r) => {
    const a = l.get(r.paletteIndex);
    return a ? { ...r, paletteIndex: a } : r;
  });
  return t.setPalette(s), rt.getState().setBuffer({
    pixels: i,
    origin: e.origin ?? { x: 0, y: 0 },
    width: e.width,
    height: e.height
  }), !0;
}, bc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), tS = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me) * me,
  y: Math.floor(e.y / me) * me
} : e, nS = (e, t, n, s, l, i, r) => {
  const a = s === 90 || s === 270 ? n : t, c = s === 90 || s === 270 ? t : n, u = [];
  for (const h of e) {
    let p = h.x, d = h.y;
    i && (p = t - 1 - p), r && (d = n - 1 - d);
    let f = p, g = d;
    if (s === 90 ? (f = n - 1 - d, g = p) : s === 180 ? (f = t - 1 - p, g = n - 1 - d) : s === 270 && (f = d, g = t - 1 - p), l === 1) {
      u.push({ x: f, y: g, paletteIndex: h.paletteIndex });
      continue;
    }
    const w = f * l, M = g * l;
    for (let v = 0; v < l; v += 1)
      for (let m = 0; m < l; m += 1)
        u.push({ x: w + m, y: M + v, paletteIndex: h.paletteIndex });
  }
  return { pixels: u, width: a * l, height: c * l };
};
class sS {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = Ge.getState(), i = tS(t, l.snap);
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
        bc(t),
        s.width,
        s.height
      ), i = ye.getState(), r = i.selectedCount > 0;
      for (const a of s.pixels) {
        if (Ge.getState().mode === "soft" && a.paletteIndex === 0)
          continue;
        const c = l.x + a.x, u = l.y + a.y;
        r && !i.isSelected(c, u) || n.setPixel(c, u, a.paletteIndex);
      }
    }, this.applyStampAt = (t, n) => {
      const s = this.getTransformed();
      if (!s)
        return;
      const l = Ge.getState(), i = ye.getState(), r = i.selectedCount > 0, a = ee.getState(), c = this.layerId ?? a.activeLayerId, u = [];
      for (const h of s.pixels) {
        if (l.mode === "soft" && h.paletteIndex === 0)
          continue;
        const p = t + h.x, d = n + h.y;
        if (r && !i.isSelected(p, d))
          continue;
        const f = a.getPixelInLayer(c, p, d);
        if (f === h.paletteIndex)
          continue;
        const g = `${p}:${d}`;
        if (!this.changes.has(g))
          this.changes.set(g, { x: p, y: d, prev: f, next: h.paletteIndex });
        else {
          const w = this.changes.get(g);
          w && (w.next = h.paletteIndex);
        }
        u.push({ x: p, y: d, paletteIndex: h.paletteIndex });
      }
      u.length !== 0 && a.setPixelsInLayer(c, u);
    }, this.flushChanges = () => {
      if (this.changes.size === 0)
        return;
      const t = ee.getState(), n = this.layerId ?? t.activeLayerId;
      Ae.getState().pushBatch({ layerId: n, changes: Array.from(this.changes.values()) }), this.changes.clear();
    }, this.stampLine = (t, n) => {
      let s = t.x, l = t.y;
      const i = Math.abs(n.x - t.x), r = Math.abs(n.y - t.y), a = t.x < n.x ? 1 : -1, c = t.y < n.y ? 1 : -1;
      let u = i - r;
      for (; ; ) {
        const h = this.getTransformed();
        if (!h)
          return;
        const p = this.getAnchor({ x: s, y: l }, h.width, h.height);
        if ((!this.lastAnchor || this.lastAnchor.x !== p.x || this.lastAnchor.y !== p.y) && (this.applyStampAt(p.x, p.y), this.lastAnchor = p), s === n.x && l === n.y)
          break;
        const d = 2 * u;
        d > -r && (u -= r, s += a), d < i && (u += i, l += c);
      }
    }, this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      this.changes.clear(), this.layerId = ee.getState().activeLayerId, this.lastAnchor = null;
      const n = Ge.getState(), s = n.drag;
      !s && n.pasteDuplicateColors && eS();
      const l = bc(t);
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
        const n = bc(t);
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
    const t = rt.getState();
    if (t.pixels.length === 0 || t.width === 0 || t.height === 0)
      return null;
    const n = Ge.getState();
    if (this.cache && this.cache.source === t.pixels && this.cache.width === t.width && this.cache.height === t.height && this.cache.rotation === n.rotation && this.cache.scale === n.scale && this.cache.flipX === n.flipX && this.cache.flipY === n.flipY)
      return {
        pixels: this.cache.pixels,
        width: this.cache.transformedWidth,
        height: this.cache.transformedHeight
      };
    const s = nS(
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
const xp = (e) => {
  const t = Math.floor(e.canvasX / C), n = Math.floor(e.canvasY / C), s = ee.getState().getPixelComposite(t, n), l = re.getState();
  if (e.ctrl) {
    l.setSelectedIndices(
      [...l.selectedIndices.filter((i) => i !== s), s]
    );
    return;
  }
  l.setSelectedIndices([s]);
};
class lS {
  constructor() {
    this.id = "eyedropper", this.onHover = () => {
      W.getState().clear();
    }, this.onBegin = (t) => {
      W.getState().clear(), xp(t);
    }, this.onMove = (t) => {
      xp(t);
    }, this.onCancel = () => {
      W.getState().clear();
    };
  }
}
const iS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, zt = tt((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? iS();
    return xe.getState().setDirty(!0), e((i) => ({
      items: [...i.items, { id: l, ...s }],
      selectedId: l
    })), l;
  },
  setSelected: (t) => e({ selectedId: t }),
  updateReference: (t, n) => {
    xe.getState().setDirty(!0), e((s) => ({
      items: s.items.map((l) => l.id === t ? { ...l, ...n } : l)
    }));
  },
  removeReference: (t) => {
    xe.getState().setDirty(!0), e((n) => ({
      items: n.items.filter((s) => s.id !== t),
      selectedId: n.selectedId === t ? null : n.selectedId
    }));
  },
  clear: () => {
    xe.getState().setDirty(!0), e({ items: [], selectedId: null });
  }
})), Ho = tt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), rS = (e) => e * Math.PI / 180, Zn = (e) => {
  const t = e.width * C, n = e.height * C, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, i = t * s, r = n * s;
  return {
    centerX: e.x * C + i / 2,
    centerY: e.y * C + r / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: rS(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Vr = (e, t, n) => {
  const s = Zn(e), l = t * s.scale * s.flipX, i = n * s.scale * s.flipY, r = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * r - i * a,
    y: s.centerY + l * a + i * r
  };
}, oS = (e, t, n) => {
  const s = Zn(e), l = t - s.centerX, i = n - s.centerY, r = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad), c = l * r + i * a, u = -l * a + i * r;
  return {
    x: c * s.flipX / s.scale,
    y: u * s.flipY / s.scale
  };
}, bx = (e) => {
  const { baseWidth: t, baseHeight: n } = Zn(e), s = t / 2, l = n / 2;
  return {
    nw: { x: -s, y: -l },
    ne: { x: s, y: -l },
    se: { x: s, y: l },
    sw: { x: -s, y: l }
  };
}, pa = (e) => {
  const t = bx(e);
  return {
    nw: Vr(e, t.nw.x, t.nw.y),
    ne: Vr(e, t.ne.x, t.ne.y),
    se: Vr(e, t.se.x, t.se.y),
    sw: Vr(e, t.sw.x, t.sw.y)
  };
}, ma = (e) => {
  const t = pa(e), n = Object.values(t), s = n.map((i) => i.x), l = n.map((i) => i.y);
  return {
    minX: Math.min(...s),
    maxX: Math.max(...s),
    minY: Math.min(...l),
    maxY: Math.max(...l)
  };
}, aS = (e, t, n) => {
  const s = oS(e, t, n), { baseWidth: l, baseHeight: i } = Zn(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= i / 2;
}, Kr = (e, t) => Math.round(e / t) * t, yp = (e) => e === "tile" ? me : 1, cS = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, vp = (e, t, n) => {
  const s = pa(e);
  for (const l of A0) {
    const i = s[l];
    if (Math.abs(t - i.x) <= Gf && Math.abs(n - i.y) <= Gf)
      return l;
  }
  return null;
}, wp = (e, t) => {
  const n = bx(e), s = pa(e), l = cS[t], i = Zn(e);
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
class uS {
  constructor() {
    this.id = "reference-handle", this.drag = null, this.onHover = () => {
      this.drag || W.getState().clear();
    }, this.onBegin = (t) => {
      W.getState().clear();
      const { items: n, selectedId: s, setSelected: l } = zt.getState(), i = t.canvasX, r = t.canvasY, a = s ? n.find((p) => p.id === s) : null;
      if (a) {
        const p = vp(a, i, r);
        if (p) {
          this.drag = wp(a, p);
          return;
        }
      }
      let c = null;
      for (let p = n.length - 1; p >= 0; p -= 1) {
        const d = n[p];
        if (aS(d, i, r)) {
          c = d;
          break;
        }
      }
      if (!c) {
        l(null), this.drag = null;
        return;
      }
      l(c.id);
      const u = vp(c, i, r);
      if (u) {
        this.drag = wp(c, u);
        return;
      }
      const h = Zn(c);
      this.drag = {
        id: c.id,
        mode: "move",
        offsetX: i - h.centerX,
        offsetY: r - h.centerY
      };
    }, this.onMove = (t) => {
      if (!this.drag)
        return;
      const n = zt.getState(), s = Ho.getState().snap, l = n.items.find((F) => {
        var K;
        return F.id === ((K = this.drag) == null ? void 0 : K.id);
      });
      if (!l) {
        this.drag = null;
        return;
      }
      const i = t.canvasX, r = t.canvasY;
      if (this.drag.mode === "move") {
        const F = Zn(l), K = F.baseWidth * F.scale, le = F.baseHeight * F.scale, ae = i - this.drag.offsetX, Me = r - this.drag.offsetY, X = yp(s), ie = (ae - K / 2) / C, ge = (Me - le / 2) / C, z = Kr(ie, X), Z = Kr(ge, X);
        n.updateReference(l.id, { x: z, y: Z });
        return;
      }
      const a = i - this.drag.anchorWorldX, c = r - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), h = Math.sin(this.drag.rotationRad), p = a * u + c * h, d = -a * h + c * u, f = p * this.drag.flipX, g = d * this.drag.flipY, w = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, v = w !== 0 ? Math.abs(f / w) : 0, m = M !== 0 ? Math.abs(g / M) : 0, x = Math.max(v, m), S = Number.isFinite(x) && x > 0 ? x : Zs, b = yp(s) * C, _ = Math.max(
        b,
        Kr(this.drag.baseWidth * S, b)
      ), k = Math.max(
        b,
        Kr(this.drag.baseHeight * S, b)
      );
      let j = Math.max(
        Zs,
        Math.max(_ / this.drag.baseWidth, k / this.drag.baseHeight)
      );
      j = Math.min(j, Wl);
      const A = this.drag.baseWidth * j, L = this.drag.baseHeight * j, Y = this.drag.anchorLocal.x * j * this.drag.flipX, N = this.drag.anchorLocal.y * j * this.drag.flipY, O = Y * u - N * h, G = Y * h + N * u, oe = this.drag.anchorWorldX - O, Q = this.drag.anchorWorldY - G, ne = (oe - A / 2) / C, D = (Q - L / 2) / C;
      n.updateReference(l.id, { x: ne, y: D, scale: j });
    }, this.onEnd = () => {
      this.drag = null;
    }, this.onCancel = () => {
      this.drag = null;
    };
  }
}
const Sp = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, dS = () => {
  const e = Ce.getState(), t = e.camera.zoom;
  if (!Number.isFinite(t) || t <= 0)
    return { x: 0, y: 0, width: 1, height: 1 };
  const n = e.width / e.camera.zoom, s = e.height / e.camera.zoom, l = Math.floor(e.camera.x / C), i = Math.floor(e.camera.y / C), r = Math.ceil((e.camera.x + n) / C), a = Math.ceil((e.camera.y + s) / C);
  return {
    x: l,
    y: i,
    width: Math.max(1, r - l),
    height: Math.max(1, a - i)
  };
}, hS = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: r, y: a, zoom: s });
}, cn = (e, t = 0) => Number.isFinite(e) ? Math.round(e) : t, fS = (e) => {
  if (!e || typeof e != "object")
    return null;
  if (e.kind === "camera") {
    const t = Number.isFinite(e.centerX) ? e.centerX : 0, n = Number.isFinite(e.centerY) ? e.centerY : 0, s = Math.round(t / C), l = Math.round(n / C);
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
    x: cn(e.x),
    y: cn(e.y),
    width: Math.max(1, cn(e.width, 1)),
    height: Math.max(1, cn(e.height, 1)),
    fileName: typeof e.fileName == "string" ? e.fileName : ""
  } : null;
}, St = tt((e, t) => ({
  items: [],
  overlaysVisible: !0,
  addFromCamera: () => e((n) => {
    const s = dS(), l = Sp(), i = `Bookmark ${n.items.length + 1}`;
    return xe.getState().setDirty(!0), {
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
  addRegionTag: ({ x: n, y: s, width: l, height: i, name: r }) => e((a) => {
    const c = Sp(), u = a.items.filter((h) => h.kind === "region").length;
    return xe.getState().setDirty(!0), {
      items: [
        ...a.items,
        {
          id: c,
          name: r != null && r.trim() ? r.trim() : `Bookmark ${u + 1}`,
          kind: "region",
          x: cn(n),
          y: cn(s),
          width: Math.max(1, cn(l, 1)),
          height: Math.max(1, cn(i, 1)),
          fileName: ""
        }
      ]
    };
  }),
  rename: (n, s) => e((l) => (xe.getState().setDirty(!0), {
    items: l.items.map((i) => i.id === n ? { ...i, name: s } : i)
  })),
  setRegionPosition: (n, s, l) => e((i) => {
    let r = !1;
    const a = i.items.map((c) => {
      if (c.id !== n || c.kind !== "region")
        return c;
      const u = cn(s), h = cn(l);
      return c.x === u && c.y === h ? c : (r = !0, { ...c, x: u, y: h });
    });
    return r ? (xe.getState().setDirty(!0), { items: a }) : i;
  }),
  setRegionSize: (n, s, l) => e((i) => {
    let r = !1;
    const a = i.items.map((c) => {
      if (c.id !== n)
        return c;
      const u = Math.max(1, cn(s, 1)), h = Math.max(1, cn(l, 1));
      return c.width === u && c.height === h ? c : (r = !0, { ...c, width: u, height: h });
    });
    return r ? (xe.getState().setDirty(!0), { items: a }) : i;
  }),
  setRegionFileName: (n, s) => e((l) => {
    let i = !1;
    const r = l.items.map((a) => a.id !== n || a.fileName === s ? a : (i = !0, { ...a, fileName: s }));
    return i ? (xe.getState().setDirty(!0), { items: r }) : l;
  }),
  remove: (n) => e((s) => (xe.getState().setDirty(!0), { items: s.items.filter((l) => l.id !== n) })),
  move: (n, s) => e((l) => {
    const i = l.items.findIndex((u) => u.id === n);
    if (i === -1)
      return l;
    const r = s === "up" ? i - 1 : i + 1;
    if (r < 0 || r >= l.items.length)
      return l;
    const a = [...l.items], [c] = a.splice(i, 1);
    return a.splice(r, 0, c), xe.getState().setDirty(!0), { items: a };
  }),
  jumpTo: (n) => {
    const s = t().items.find((r) => r.id === n);
    if (!s)
      return;
    const l = s.x + s.width / 2, i = s.y + s.height / 2;
    hS(l * C, i * C);
  },
  setOverlaysVisible: (n) => e((s) => {
    const l = !!n;
    return s.overlaysVisible === l ? s : (xe.getState().setDirty(!0), { overlaysVisible: l });
  }),
  toggleOverlaysVisible: () => e((n) => (xe.getState().setDirty(!0), { overlaysVisible: !n.overlaysVisible })),
  setAll: (n, s = !0) => e({
    items: n.map(fS).filter((l) => l !== null),
    overlaysVisible: !!s
  }),
  clear: () => e({ items: [], overlaysVisible: !0 })
})), _c = (e) => ({
  x: Math.floor(e.canvasX / C / me),
  y: Math.floor(e.canvasY / C / me)
}), Mp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), pS = (e) => {
  const t = W.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * me, i = n * me;
      for (let r = 0; r < me; r += 1)
        for (let a = 0; a < me; a += 1)
          t.setPixel(l + a, i + r, 1);
    }
}, mS = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class gS {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      W.getState().clear(), this.start = _c(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = _c(t);
      this.last = s, pS(Mp(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = t ? _c(t) : this.last ?? this.start, l = Mp(this.start, s), i = ee.getState(), r = $.getState(), a = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
      let u = r.activeTileSetId;
      const h = r.tileSets.find((f) => f.id === u);
      let p = (h == null ? void 0 : h.tiles.length) ?? 0;
      if (!h || h.tileWidth !== me || h.tileHeight !== me)
        u = r.addTileSet({
          name: `Tile Set ${r.tileSets.length + 1}`,
          tileWidth: me,
          tileHeight: me,
          columns: a,
          rows: c,
          tiles: []
        }), p = 0;
      else if (h && h.tiles.length === 0)
        r.setTileSetLayout(h.id, a, c);
      else if (h && h.tiles.length > 0 && (h.columns !== a || h.rows !== c)) {
        mS(
          `Invalid selection: ${h.name} expects ${h.columns}x${h.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const d = [];
      for (let f = l.minTileY; f <= l.maxTileY; f += 1)
        for (let g = l.minTileX; g <= l.maxTileX; g += 1) {
          const w = [], M = g * me, v = f * me;
          for (let m = 0; m < me; m += 1)
            for (let x = 0; x < me; x += 1)
              w.push(i.getPixelComposite(M + x, v + m));
          d.push({ pixels: w, source: { kind: "canvas", x: M, y: v } });
        }
      u && (r.appendTilesToSet(u, d), r.setSelectedTileIndex(p), r.setTilePage(0), r.setTilePaletteOffset(0), St.getState().addRegionTag({
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
class Wo {
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
    const i = s >= 0 ? this.tiles[s] : void 0, r = l.map(
      (h, p) => h === 0 ? (i == null ? void 0 : i[p]) ?? 0 : h
    );
    if (yS(r))
      return -1;
    const a = r.join(","), c = this.tileIndexBySignature.get(a);
    if (c !== void 0)
      return c;
    const u = this.tiles.length;
    return this.tiles.push(r), this.tileIndexBySignature.set(a, u), this.pendingTiles.push({ pixels: r }), u;
  }
  getTilePixels(t) {
    return t < 0 || t >= this.tiles.length ? null : this.tiles[t] ?? null;
  }
  getPendingTiles() {
    return this.pendingTiles.slice();
  }
}
const vS = 32, Tc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), wS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
}, bp = () => {
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
}, _p = (e, t) => {
  const n = $.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = vS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: a
  }), originX: u, originY: h, columns: r, rows: r, tiles: a };
};
class SS {
  constructor() {
    this.id = "tile-pen", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = bp(), !this.activeTile) || (this.placementResolver = new Wo(this.activeTile.tileSetTiles), this.activeMap = _p(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = Tc(t), l = this.toWorldTilePoint(s);
      l && this.applyTile(this.snapWorldPointToCluster(l));
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.erasing = t.alt, this.activeTile = bp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.placementResolver = new Wo(this.activeTile.tileSetTiles), this.activeMap = _p(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = Tc(t), l = this.toWorldTilePoint(s);
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
      const n = Tc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      const l = this.snapWorldPointToCluster(s);
      if (this.lastWorldPoint)
        if (this.activeTile.snapToCluster)
          this.drawSnappedLine(this.lastWorldPoint, l);
        else {
          let i = this.lastWorldPoint.x, r = this.lastWorldPoint.y;
          const a = Math.abs(l.x - this.lastWorldPoint.x), c = Math.abs(l.y - this.lastWorldPoint.y), u = this.lastWorldPoint.x < l.x ? 1 : -1, h = this.lastWorldPoint.y < l.y ? 1 : -1;
          let p = a - c;
          for (; this.applyTile({ x: i, y: r }), !(i === l.x && r === l.y); ) {
            const d = 2 * p;
            d > -c && (p -= c, i += u), d < a && (p += a, r += h);
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
    let i = Math.floor(t.x / s), r = Math.floor(t.y / l);
    const a = Math.floor(n.x / s), c = Math.floor(n.y / l), u = Math.abs(a - i), h = Math.abs(c - r), p = i < a ? 1 : -1, d = r < c ? 1 : -1;
    let f = u - h;
    for (; this.applyTile({ x: i * s, y: r * l }), !(i === a && r === c); ) {
      const g = 2 * f;
      g > -h && (f -= h, i += p), g < u && (f += u, r += d);
    }
  }
  ensureMapBounds(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.activeTile.selectionCols, s = this.activeTile.selectionRows, l = this.toMapPoint(t);
    if (!l)
      return null;
    const i = l.x, r = l.y, a = l.x + n - 1, c = l.y + s - 1, u = $.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      a,
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
      const g = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || w !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, m] of this.changes.entries()) {
          const x = Math.floor(v / h), S = v % h, b = x + w, _ = S + g;
          b < 0 || _ < 0 || b >= f.rows || _ >= f.columns || M.set(b * f.columns + _, m);
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
    const i = this.activeTile.selectionCols, r = this.activeTile.selectionRows, a = this.activeTile.selectionIndices;
    for (let c = 0; c < r; c += 1)
      for (let u = 0; u < i; u += 1) {
        const h = n.x + u, p = n.y + c;
        if (h < 0 || p < 0 || h >= s || p >= l)
          continue;
        const d = p * s + h, f = c * i + u, g = a[f] ?? -1, w = this.erasing ? -1 : this.resolvePlacedTileIndex(g, d);
        if (this.drawing && this.changes.set(d, w), this.erasing)
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
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), bS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
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
    const n = rt.getState().tileBuffer;
    if (!n || n.cols <= 0 || n.rows <= 0 || n.tiles.length === 0)
      return null;
    const s = $.getState(), l = s.tileSets.find((r) => r.id === n.tileSetId);
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
    const l = this.toWorldTilePoint(t, s.tileSet), i = this.getAnchor(l, s), r = Math.round(s.tileMap.originX / s.tileSet.tileWidth), a = Math.round(s.tileMap.originY / s.tileSet.tileHeight);
    for (let u = 0; u < s.buffer.rows; u += 1)
      for (let h = 0; h < s.buffer.cols; h += 1) {
        const p = s.buffer.tiles[u * s.buffer.cols + h] ?? -1;
        if (p < 0)
          continue;
        const d = (c = s.tileSet.tiles[p]) == null ? void 0 : c.pixels;
        if (!d)
          continue;
        const f = i.x + h - r, g = i.y + u - a, w = s.tileMap.originX + f * s.tileSet.tileWidth, M = s.tileMap.originY + g * s.tileSet.tileHeight;
        bS(
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
    const l = t.x * n.tileSet.tileWidth, i = t.y * n.tileSet.tileHeight, r = $.getState(), a = r.expandTileMapToInclude(
      n.tileMap.id,
      t.x,
      t.x + n.buffer.cols - 1,
      t.y,
      t.y + n.buffer.rows - 1,
      n.tileSet.tileWidth,
      n.tileSet.tileHeight
    ) ?? r.tileMaps.find((p) => p.id === n.tileMap.id) ?? null;
    if (!a)
      return;
    const c = Math.round((l - a.originX) / n.tileSet.tileWidth), u = Math.round((i - a.originY) / n.tileSet.tileHeight), h = [];
    for (let p = 0; p < n.buffer.rows; p += 1)
      for (let d = 0; d < n.buffer.cols; d += 1) {
        const f = c + d, g = u + p;
        if (f < 0 || g < 0 || f >= a.columns || g >= a.rows)
          continue;
        const w = n.buffer.tiles[p * n.buffer.cols + d] ?? -1;
        h.push({ index: g * a.columns + f, tile: w });
      }
    h.length > 0 && r.setTileMapTiles(a.id, h);
  }
  stampLine(t, n, s) {
    let l = t.x, i = t.y;
    const r = Math.abs(n.x - t.x), a = Math.abs(n.y - t.y), c = t.x < n.x ? 1 : -1, u = t.y < n.y ? 1 : -1;
    let h = r - a;
    for (; this.applyStamp(this.getAnchor({ x: l, y: i }, s)), !(l === n.x && i === n.y); ) {
      const p = 2 * h;
      p > -a && (h -= a, l += c), p < r && (h += r, i += u);
    }
  }
}
const TS = 32, kc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), kS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
}, Tp = () => {
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
}, kp = (e, t) => {
  const n = $.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = TS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: a
  }), originX: u, originY: h, columns: r, rows: r, tiles: a };
};
class CS {
  constructor() {
    this.id = "tile-rectangle", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.seed = 0, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Tp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = kc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.applyTileArea(l, l));
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Tp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.resetPlacementResolver(), this.activeMap = kp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = kc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.startWorldPoint = l, this.lastWorldPoint = l, this.applyTileArea(l, l));
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      const n = kc(t), s = this.toWorldTilePoint(n);
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
    this.placementResolver = new Wo(this.activeTile.tileSetTiles);
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
    const i = l.x, r = l.y, a = l.x + n - 1, c = l.y + s - 1, u = $.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      i,
      a,
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
      const g = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), w = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || w !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, m] of this.changes.entries()) {
          const x = Math.floor(v / h), S = v % h, b = x + w, _ = S + g;
          b < 0 || _ < 0 || b >= f.rows || _ >= f.columns || M.set(b * f.columns + _, m);
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
        const g = f - h, w = d - p;
        if (g < 0 || w < 0 || g >= c || w >= u)
          continue;
        const M = this.sampleTileIndexForCell(f, d);
        if (M === null)
          continue;
        const v = w * c + g, m = this.resolvePlacedTileIndex(M, v);
        this.drawing && this.changes.set(v, m);
        const x = this.getTilePixels(m);
        if (!x)
          continue;
        const S = f * this.activeTile.tileWidth, b = d * this.activeTile.tileHeight;
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
const jS = 1, NS = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), i = jS, r = i, a = i * 2, c = s * (e.tileWidth + a), u = l * (e.tileHeight + a), h = new Uint8ClampedArray(c * u * 4), p = t.map((m) => yt(m) ?? { r: 0, g: 0, b: 0 }), d = (m, x, S) => {
    if (m < 0 || x < 0 || m >= c || x >= u)
      return;
    const b = (x * c + m) * 4;
    h[b] = S.r, h[b + 1] = S.g, h[b + 2] = S.b, h[b + 3] = 255;
  };
  n.forEach((m, x) => {
    const S = e.tiles[m];
    if (!S)
      return;
    const b = x % s * (e.tileWidth + a), _ = Math.floor(x / s) * (e.tileHeight + a);
    for (let k = 0; k < e.tileHeight; k += 1)
      for (let j = 0; j < e.tileWidth; j += 1) {
        const A = S.pixels[k * e.tileWidth + j] ?? 0;
        if (A === 0)
          continue;
        const L = p[A] ?? p[0] ?? { r: 0, g: 0, b: 0 }, Y = b + r + j, N = _ + r + k;
        d(Y, N, L), j === 0 && d(Y - 1, N, L), j === e.tileWidth - 1 && d(Y + 1, N, L), k === 0 && d(Y, N - 1, L), k === e.tileHeight - 1 && d(Y, N + 1, L), j === 0 && k === 0 && d(Y - 1, N - 1, L), j === 0 && k === e.tileHeight - 1 && d(Y - 1, N + 1, L), j === e.tileWidth - 1 && k === 0 && d(Y + 1, N - 1, L), j === e.tileWidth - 1 && k === e.tileHeight - 1 && d(Y + 1, N + 1, L);
      }
  });
  const f = document.createElement("canvas");
  f.width = c, f.height = u;
  const g = f.getContext("2d");
  if (!g)
    throw new Error("Unable to export tile atlas.");
  const w = new ImageData(h, c, u);
  g.putImageData(w, 0, 0);
  const M = await new Promise(
    (m) => f.toBlob((x) => m(x), "image/png")
  );
  if (!M)
    throw new Error("Unable to export tile atlas.");
  return { buffer: new Uint8Array(await M.arrayBuffer()), columns: s, rows: l, width: c, height: u, margin: r, spacing: a };
}, PS = async (e) => {
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
  const l = Math.round(s.originX / n.tileWidth), i = Math.round(s.originY / n.tileHeight), r = e.maxTileX - e.minTileX + 1, a = e.maxTileY - e.minTileY + 1, c = [], u = /* @__PURE__ */ new Set();
  for (let m = 0; m < a; m += 1)
    for (let x = 0; x < r; x += 1) {
      const S = e.minTileX + x, b = e.minTileY + m, _ = S - l, k = b - i;
      let j = -1;
      _ >= 0 && _ < s.columns && k >= 0 && k < s.rows && (j = s.tiles[k * s.columns + _] ?? -1), c.push(j), j >= 0 && j < n.tiles.length && u.add(j);
    }
  if (u.size === 0)
    return window.alert("No tiles in the selected region."), null;
  const h = Array.from(u).sort((m, x) => m - x), p = /* @__PURE__ */ new Map();
  h.forEach((m, x) => p.set(m, x));
  const d = c.map((m) => {
    if (m < 0)
      return 0;
    const x = p.get(m);
    return x === void 0 ? 0 : x + 1;
  }), f = re.getState().colors, g = await NS(n, f, h), w = [];
  for (let m = 0; m < a; m += 1) {
    const x = m * r, S = d.slice(x, x + r).join(",");
    w.push(m === a - 1 ? S : `${S},`);
  }
  const M = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${r}" height="${a}" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" tilecount="${h.length}" columns="${g.columns}" spacing="${g.spacing}" margin="${g.margin}">
    <image source="tiles.png" width="${g.width}" height="${g.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${r}" height="${a}">
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
}, Cc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), jc = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), Cp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), IS = (e, t, n) => {
  const s = W.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let i = e.minTileX; i <= e.maxTileX; i += 1) {
      const r = i * t, a = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(r + u, a + c, 1);
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
      this.tileWidth = s.tileWidth, this.tileHeight = s.tileHeight, this.start = jc(Cc(t), this.tileWidth, this.tileHeight), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      W.getState().clear();
      const s = jc(Cc(t), this.tileWidth, this.tileHeight);
      this.last = s, IS(Cp(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = W.getState(), s = t ? jc(Cc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = Cp(this.start, s);
      n.clear(), this.start = null, this.last = null, PS(l);
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const RS = 32, Nc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), jp = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
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
}, Pp = (e, t) => {
  const n = $.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = RS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: h,
    columns: r,
    rows: r,
    tiles: a
  }), originX: u, originY: h, columns: r, rows: r, tiles: a };
};
class AS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Np(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = Pp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = $.getState();
      if (!s.nineSlice) {
        const r = this.readNineSliceFromSelection();
        if (r)
          s.setNineSlice(r);
        else
          return;
      }
      const l = Nc(t), i = this.toWorldTilePoint(l);
      i && this.applyNineSlice(i, i);
    }, this.onBegin = (t) => {
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Np(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.resetPlacementResolver(), this.activeMap = Pp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = $.getState(), l = !s.nineSlice || t.ctrl;
      this.sampling = l;
      const i = Nc(t), r = this.toWorldTilePoint(i);
      if (r && (this.startWorldPoint = r, this.lastWorldPoint = r, !this.sampling)) {
        if (!s.nineSlice) {
          const a = this.readNineSliceFromSelection();
          a && s.setNineSlice(a);
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
      const n = Nc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      if (this.lastWorldPoint = s, W.getState().clear(), !this.sampling) {
        this.changes.clear(), this.resetPlacementResolver(), this.applyNineSlice(this.startWorldPoint, s);
        return;
      }
      const i = Math.min(this.startWorldPoint.x, s.x), r = Math.min(this.startWorldPoint.y, s.y);
      this.drawSamplePreview({ x: i, y: r });
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
    this.placementResolver = new Wo(this.activeTile.tileSetTiles);
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
    const s = Math.min(t.x, n.x), l = Math.min(t.y, n.y), i = Math.max(t.x, n.x), r = Math.max(t.y, n.y), a = this.toMapPoint({ x: s, y: l });
    if (!a)
      return null;
    const u = $.getState().expandTileMapToInclude(
      this.activeMap.tileMapId,
      a.x,
      a.x + (i - s),
      a.y,
      a.y + (r - l),
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
        var h;
        return u.id === ((h = this.activeMap) == null ? void 0 : h.tileMapId);
      }
    );
    if (!l)
      return null;
    const { columns: i, rows: r, tiles: a } = l, c = [];
    for (let u = 0; u < 3; u += 1)
      for (let h = 0; h < 3; h += 1) {
        const p = n.x + h, d = n.y + u;
        if (p < 0 || d < 0 || p >= i || d >= r) {
          c.push(-1);
          continue;
        }
        const f = d * i + p, g = a[f] ?? -1;
        c.push(g);
      }
    return { tileSetId: this.activeTile.tileSetId, tiles: c };
  }
  readNineSliceFromSelection() {
    const t = $.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
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
    const l = $.getState().tileMaps.find(
      (c) => {
        var u;
        return c.id === ((u = this.activeMap) == null ? void 0 : u.tileMapId);
      }
    );
    if (!l)
      return;
    const { columns: i, rows: r, tiles: a } = l;
    for (let c = 0; c < 3; c += 1)
      for (let u = 0; u < 3; u += 1) {
        const h = n.x + u, p = n.y + c;
        if (h < 0 || p < 0 || h >= i || p >= r)
          continue;
        const d = p * i + h, f = a[d] ?? -1;
        if (f < 0 || f >= this.activeTile.tileSetTiles.length)
          continue;
        const g = this.activeTile.tileSetTiles[f], w = t.x + u, M = t.y + c;
        jp(
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
    const i = Math.min(t.x, n.x), r = Math.max(t.x, n.x), a = Math.min(t.y, n.y), c = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: i, y: a }, { x: r, y: c }))
      return;
    const { columns: h, rows: p } = this.activeMap, d = Math.round(this.activeMap.originX / this.activeTile.tileWidth), f = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let g = a; g <= c; g += 1)
      for (let w = i; w <= r; w += 1) {
        const M = w - d, v = g - f;
        if (M < 0 || v < 0 || M >= h || v >= p)
          continue;
        const m = g === a, x = g === c, S = w === i, b = w === r;
        let _ = 4;
        m && S ? _ = 0 : m && b ? _ = 2 : x && S ? _ = 6 : x && b ? _ = 8 : m ? _ = 1 : x ? _ = 7 : S ? _ = 3 : b && (_ = 5);
        const k = l.tiles[_] ?? -1;
        if (k < 0 || k >= this.activeTile.tileSetTiles.length)
          continue;
        const j = v * h + M, A = this.resolvePlacedTileIndex(k, j);
        this.drawing && this.changes.set(j, A);
        const L = this.getTilePixels(A);
        if (!L)
          continue;
        const Y = w * this.activeTile.tileWidth, N = g * this.activeTile.tileHeight;
        jp(
          Y,
          N,
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
    minX: Math.floor(e.camera.x / C),
    minY: Math.floor(e.camera.y / C),
    maxX: Math.floor((e.camera.x + t) / C),
    maxY: Math.floor((e.camera.y + n) / C)
  };
}, YS = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), XS = (e, t, n, s) => {
  const l = ee.getState(), i = /* @__PURE__ */ new Set(), r = [e], a = [t], c = [];
  let u = !1;
  for (let h = 0; h < r.length; h += 1) {
    const p = r[h], d = a[h];
    if (p < s.minX || p > s.maxX || d < s.minY || d > s.maxY)
      continue;
    const f = `${p}:${d}`;
    i.has(f) || (i.add(f), l.getPixel(p, d) === n && ((p === s.minX || p === s.maxX || d === s.minY || d === s.maxY) && (u = !0), c.push({ x: p, y: d }), r.push(p + 1, p - 1, p, p), a.push(d, d, d + 1, d - 1)));
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
      const i = ee.getState().getPixel(s, l), { pixels: r, touchesBoundary: a } = XS(s, l, i, n);
      if (r.length === 0 || i === 0 && a)
        return;
      const c = !t.ctrl;
      ye.getState().setSelections(r.map((u) => ({ x: u.x, y: u.y, selected: c })));
    };
  }
}
const Nt = tt((e) => ({
  activeTool: "pen",
  setActiveTool: (t) => e({ activeTool: t })
})), Au = tt((e) => ({
  isRecording: !1,
  setIsRecording: (t) => e({ isRecording: t })
})), Gr = (e, t, n) => Math.min(n, Math.max(t, e)), OS = ({ x: e, y: t, onClose: n }) => {
  const s = Nt((S) => S.activeTool), l = mn((S) => S.size), i = mn((S) => S.shape), r = Gt((S) => S.radius), a = Gt((S) => S.density), c = Mt((S) => S.mode), u = ye((S) => S.selectedCount), h = T.useRef(null), [p, d] = T.useState({ x: e, y: t }), f = T.useMemo(() => O0[s] ?? "Tools", [s]);
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
    const S = h.current.getBoundingClientRect(), b = 8, _ = Math.max(b, window.innerWidth - S.width - b), k = Math.max(b, window.innerHeight - S.height - b), j = Gr(e, b, _), A = Gr(t, b, k);
    d({ x: j, y: A });
  }, [e, t]);
  const g = (S) => mn.getState().setSize(S), w = (S) => mn.getState().setShape(S), M = (S) => Gt.getState().setRadius(S), v = (S) => Gt.getState().setDensity(S), m = (S) => Mt.getState().setMode(S), x = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      ref: h,
      className: "tool-context-menu",
      role: "menu",
      style: { top: p.y, left: p.x },
      children: [
        /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__title", children: f }),
        /* @__PURE__ */ o.jsx(
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
        /* @__PURE__ */ o.jsx(
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
        /* @__PURE__ */ o.jsx(
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
        u > 0 && /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "tool-context-menu__item",
            onClick: () => {
              ye.getState().clear(), n();
            },
            children: "Clear Selection"
          }
        ),
        x && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__label", children: "Brush" }),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => g(Gr(l - 1, 1, 64)),
              children: [
                "Size - (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => g(Gr(l + 1, 1, 64)),
              children: [
                "Size + (",
                l,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ o.jsx(
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
          /* @__PURE__ */ o.jsx(
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
          /* @__PURE__ */ o.jsx(
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
        s === "spray" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__label", children: "Spray" }),
          /* @__PURE__ */ o.jsxs(
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
          /* @__PURE__ */ o.jsxs(
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
          /* @__PURE__ */ o.jsxs(
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
          /* @__PURE__ */ o.jsxs(
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
        s === "fill-bucket" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__label", children: "Fill" }),
          /* @__PURE__ */ o.jsx(
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
          /* @__PURE__ */ o.jsx(
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
}), _x = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), WS = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : _x(t[t.length - 1]);
}, Tx = (e, t) => {
  const n = WS(e.name ?? "");
  return n || _x(F0[t] ?? t.split("/")[1] ?? "");
}, US = (e, t) => e || (t && qf[t] ? qf[t] : "image/png"), $S = (e, t) => {
  const n = Tx(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, kx = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, VS = (e, t, n) => Math.min(n, Math.max(t, e)), KS = (e) => {
  const t = Ce.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * C, i = e.naturalHeight * C, r = Math.min(n / l, s / i) * 0.9;
  return VS(r, Zs, Wl);
}, GS = (e) => ({
  x: Math.floor(e.x / C),
  y: Math.floor(e.y / C)
}), Cx = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = Tx(e, n), l = US(n, s), [i, r] = await Promise.all([zS(e), e.arrayBuffer()]), a = await HS(i), c = t ?? kx(), u = GS(c), h = KS(a), p = $S(e, l);
  zt.getState().addReference({
    image: a,
    assetFilename: p,
    assetType: l,
    assetData: new Uint8Array(r),
    width: a.naturalWidth || a.width,
    height: a.naturalHeight || a.height,
    x: u.x,
    y: u.y,
    scale: h,
    rotation: 0,
    flipX: !1,
    flipY: !1,
    opacity: 0.7
  }), Nt.getState().setActiveTool("reference-handle");
}, QS = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? kx();
  for (let l = 0; l < n.length; l += 1) {
    const i = l * C * 2, r = { x: s.x + i, y: s.y + i };
    await Cx(n[l], r);
  }
}, Ip = (e, t, n, s, l, i, r) => {
  e.strokeStyle = r, e.lineWidth = 1;
  const a = Math.floor(t / i) * i, c = t + s;
  for (let p = a; p <= c; p += i)
    e.beginPath(), e.moveTo(p + 0.5, n), e.lineTo(p + 0.5, n + l), e.stroke();
  const u = Math.floor(n / i) * i, h = n + l;
  for (let p = u; p <= h; p += i)
    e.beginPath(), e.moveTo(t, p + 0.5), e.lineTo(t + s, p + 0.5), e.stroke();
}, ZS = (e, t, n, s, l, i, r) => {
  const a = K1();
  if (a.length !== 0) {
    e.save(), e.fillStyle = i, e.strokeStyle = r, e.lineWidth = Math.max(1, C * 0.08);
    for (const c of a) {
      const u = c.col * B * C, h = c.row * B * C, p = u + B * C, d = h + B * C;
      p < t || d < n || u > t + s || h > n + l || (e.fillRect(u, h, B * C, B * C), e.strokeRect(
        u + 0.5,
        h + 0.5,
        B * C - 1,
        B * C - 1
      ));
    }
    e.restore();
  }
}, qS = (e, t, n, s, l, i) => {
  e.strokeStyle = i, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, JS = (e, t, n, s, l) => {
  var a;
  const i = St.getState();
  if (!i.overlaysVisible)
    return;
  const r = i.items.filter((c) => c.kind === "region");
  if (r.length !== 0) {
    e.save(), e.lineWidth = 1.5, e.font = '11px "Segoe UI", "Helvetica Neue", sans-serif';
    for (const c of r) {
      const u = c.x * C, h = c.y * C, p = Math.max(1, c.width) * C, d = Math.max(1, c.height) * C, f = u + p, g = h + d;
      if (f < t || g < n || u > t + s || h > n + l)
        continue;
      e.fillStyle = "rgba(66, 197, 255, 0.16)", e.strokeStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h, p, d), e.strokeRect(u + 0.5, h + 0.5, Math.max(0, p - 1), Math.max(0, d - 1));
      const w = ((a = c.name) == null ? void 0 : a.trim()) || "Bookmark", M = e.measureText(w).width, v = 5, m = 16, x = Math.max(36, Math.ceil(M + v * 2));
      e.fillStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h - m, x, m), e.fillStyle = "rgba(5, 12, 18, 0.95)", e.fillText(w, u + v, h - 4);
    }
    e.restore();
  }
}, eM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, jx = (e, t) => {
  const n = document.createElement("canvas");
  n.width = B * C, n.height = B * C;
  const s = n.getContext("2d");
  if (!s)
    return null;
  s.imageSmoothingEnabled = !1;
  let l = 0;
  for (let i = 0; i < B; i += 1)
    for (let r = 0; r < B; r += 1) {
      const a = e[i * B + r];
      a !== 0 && (l += 1, s.fillStyle = t[a] ?? t[0], s.fillRect(r * C, i * C, C, C));
    }
  return { canvas: n, pixels: l };
}, tM = (e, t, n, s) => {
  const l = document.createElement("canvas");
  l.width = n * C, l.height = s * C;
  const i = l.getContext("2d");
  if (!i)
    return null;
  i.imageSmoothingEnabled = !1;
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = e[r * n + a] ?? 0;
      c !== 0 && (i.fillStyle = t[c] ?? t[0], i.fillRect(a * C, r * C, C, C));
    }
  return { canvas: l };
}, nM = (e, t, n, s, l, i, r) => {
  const a = ee.getState();
  let c = 0, u = 0;
  for (const h of a.layers) {
    if (!h.visible)
      continue;
    const p = h.store.getBlocks();
    for (const { row: d, col: f, block: g } of p) {
      const w = f * B, M = d * B, v = w * C, m = M * C, x = v + B * C, S = m + B * C;
      if (x < t || S < n || v > t + s || m > n + l)
        continue;
      c += 1;
      const b = `${h.id}:${d}:${f}`;
      let _ = r.get(b);
      if (!_) {
        const k = jx(g, i);
        k && (_ = k, r.set(b, k));
      }
      _ && (u += _.pixels, e.drawImage(_.canvas, v, m));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, sM = (e) => {
  const t = document.createElement("canvas");
  t.width = B * C, t.height = B * C;
  const n = t.getContext("2d");
  if (!n)
    return null;
  n.imageSmoothingEnabled = !1, n.fillStyle = "#ffffff";
  let s = !1;
  for (let l = 0; l < B; l += 1)
    for (let i = 0; i < B; i += 1)
      e[l * B + i] === 1 && (n.fillRect(i * C, l * C, C, C), s = !0);
  return s ? { canvas: t } : null;
}, lM = (e, t, n, s, l, i, r) => {
  if (r) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [a, c] of i.entries()) {
      const [u, h] = a.split(":"), p = Number(u), f = Number(h) * B * C, g = p * B * C, w = f + B * C, M = g + B * C;
      w < t || M < n || f > t + s || g > n + l || e.drawImage(c.canvas, f, g);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [a, c] of i.entries()) {
      const [u, h] = a.split(":"), p = Number(u), f = Number(h) * B * C, g = p * B * C, w = f + B * C, M = g + B * C;
      w < t || M < n || f > t + s || g > n + l || e.drawImage(c.canvas, f, g);
    }
    e.restore();
  }
}, iM = (e, t, n, s, l) => {
  const i = ye.getState();
  if (i.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const r = i.store.getBlocks();
  for (const { row: a, col: c, block: u } of r) {
    const h = c * B, p = a * B, d = h * C, f = p * C, g = d + B * C, w = f + B * C;
    if (!(g < t || w < n || d > t + s || f > n + l))
      for (let M = 0; M < B; M += 1)
        for (let v = 0; v < B; v += 1) {
          if (u[M * B + v] !== 1)
            continue;
          const m = h + v, x = p + M;
          i.isSelected(m - 1, x) && i.isSelected(m + 1, x) && i.isSelected(m, x - 1) && i.isSelected(m, x + 1) || (m + x) % 2 === 0 && e.fillRect(
            m * C,
            x * C,
            C,
            C
          );
        }
  }
  e.restore();
}, rM = (e, t, n, s, l, i, r) => {
  const { tileSets: a, tileMaps: c } = $.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / C, h = n / C, p = u + s / C, d = h + l / C, f = new Map(a.map((g) => [g.id, g]));
  for (const g of c) {
    const w = f.get(g.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const m = g.columns * M, x = g.rows * v, S = g.originX, b = g.originY, _ = S + m, k = b + x;
    if (_ < u || k < h || S > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      g.columns - 1,
      Math.ceil((p - S) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), Y = Math.min(
      g.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || Y < L))
      for (let N = L; N <= Y; N += 1)
        for (let O = j; O <= A; O += 1) {
          const G = N * g.columns + O, oe = g.tiles[G] ?? -1;
          if (oe < 0)
            continue;
          const Q = w.tiles[oe];
          if (!Q)
            continue;
          const ne = `${w.id}:${oe}`;
          let D = r.get(ne);
          if (!D) {
            const F = tM(
              Q.pixels,
              i,
              M,
              v
            );
            F && (D = F, r.set(ne, F));
          }
          D && e.drawImage(
            D.canvas,
            (S + O * M) * C,
            (b + N * v) * C
          );
        }
  }
}, oM = (e, t, n, s, l, i, r) => {
  const { tileSets: a, tileMaps: c } = $.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / C, h = n / C, p = u + s / C, d = h + l / C, f = new Map(a.map((g) => [g.id, g]));
  e.save(), e.fillStyle = i, e.strokeStyle = r, e.lineWidth = Math.max(1, C * 0.08);
  for (const g of c) {
    const w = f.get(g.tileSetId);
    if (!w)
      continue;
    const M = w.tileWidth, v = w.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const m = g.columns * M, x = g.rows * v, S = g.originX, b = g.originY, _ = S + m, k = b + x;
    if (_ < u || k < h || S > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - S) / M)), A = Math.min(
      g.columns - 1,
      Math.ceil((p - S) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), Y = Math.min(
      g.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || Y < L))
      for (let N = L; N <= Y; N += 1)
        for (let O = j; O <= A; O += 1) {
          const G = N * g.columns + O;
          if ((g.tiles[G] ?? -1) < 0)
            continue;
          const Q = (S + O * M) * C, ne = (b + N * v) * C, D = M * C, F = v * C;
          e.fillRect(Q, ne, D, F), e.strokeRect(Q + 0.5, ne + 0.5, D - 1, F - 1);
        }
  }
  e.restore();
}, aM = (e, t, n) => {
  const s = W.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * C,
      l.y * C,
      C,
      C
    );
}, cM = (e, t, n, s, l) => {
  const i = zt.getState().items;
  if (i.length !== 0)
    for (const r of i) {
      const a = ma(r);
      if (a.maxX < t || a.maxY < n || a.minX > t + s || a.minY > n + l)
        continue;
      const c = Zn(r);
      e.save(), e.globalAlpha = r.opacity, e.translate(c.centerX, c.centerY), e.rotate(c.rotationRad), e.scale(c.scale * c.flipX, c.scale * c.flipY), e.drawImage(
        r.image,
        -c.baseWidth / 2,
        -c.baseHeight / 2,
        c.baseWidth,
        c.baseHeight
      ), e.restore();
    }
}, uM = (e, t, n, s, l) => {
  const { items: i, selectedId: r } = zt.getState();
  if (!r)
    return;
  const a = i.find((f) => f.id === r);
  if (!a)
    return;
  const c = ma(a);
  if (c.maxX < t || c.maxY < n || c.minX > t + s || c.minY > n + l)
    return;
  const u = C * 0.6, h = u / 2, p = pa(a), d = Object.values(p);
  e.save(), e.strokeStyle = "rgba(245, 197, 66, 0.85)", e.lineWidth = Math.max(1, C * 0.08), e.beginPath(), e.moveTo(p.nw.x, p.nw.y), e.lineTo(p.ne.x, p.ne.y), e.lineTo(p.se.x, p.se.y), e.lineTo(p.sw.x, p.sw.y), e.closePath(), e.stroke(), e.fillStyle = "rgba(245, 197, 66, 0.9)";
  for (const f of d)
    e.fillRect(f.x - h, f.y - h, u, u);
  e.restore();
}, dM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(null), s = T.useRef(null), l = T.useRef(/* @__PURE__ */ new Map()), i = T.useRef(/* @__PURE__ */ new Map()), r = T.useRef(/* @__PURE__ */ new Map()), a = T.useRef(0), c = Ce((N) => N.setSize), [u, h] = T.useState(!1), [p, d] = T.useState({ open: !1, x: 0, y: 0 }), f = T.useRef(null), g = T.useRef({ remainingLogDelta: 0, anchor: null, frame: null }), w = T.useRef(Promise.resolve());
  T.useEffect(() => {
    const N = e.current, O = t.current, G = g.current;
    if (!N || !O)
      return;
    c(N.clientWidth, N.clientHeight), s.current = new U0();
    const oe = {
      pen: new i1(),
      spray: new c1(),
      line: new b1(),
      rectangle: new k1(),
      oval: new N1(),
      "fill-bucket": new J1(),
      text: new LS(),
      ai: new DS(),
      eyedropper: new lS(),
      "reference-handle": new uS(),
      stamp: new sS(),
      "magic-wand": new FS(),
      "selection-rect": new R1(),
      "selection-oval": new D1(),
      "selection-lasso": new F1(),
      "texture-roll": new O1(),
      "tile-sampler": new gS(),
      "tile-pen": new SS(),
      "tile-stamp": new _S(),
      "tile-rectangle": new CS(),
      "tile-9slice": new AS(),
      "tile-export": new ES()
    }, Q = oe[Nt.getState().activeTool] ?? oe.pen;
    s.current.setTool(Q);
    const ne = Nt.subscribe((Me) => {
      var X;
      (X = s.current) == null || X.setTool(oe[Me.activeTool] ?? oe.pen);
    }), D = re.subscribe(() => {
      l.current.clear(), r.current.clear();
    }), F = ye.subscribe(() => {
      i.current.clear();
    }), K = $.subscribe(() => {
      r.current.clear();
    }), le = () => {
      var fe;
      const Me = performance.now(), X = Ce.getState();
      if (X.width === 0 || X.height === 0)
        return;
      const ie = eM(O, X.width, X.height);
      if (!ie)
        return;
      const ge = window.devicePixelRatio || 1;
      ie.clearRect(0, 0, X.width, X.height);
      const z = re.getState().colors, Z = z[0] ?? "#000000", P = yt(Z) ?? { r: 0, g: 0, b: 0 }, U = ha(P, da(P)), te = un(U, 0.08), de = un(U, 0.18), Ze = un(U, 0.5), _e = un(U, 0.08), Fe = un(U, 0.35), Oe = un(U, 0.2), st = un(U, 0.5);
      ie.fillStyle = Z, ie.fillRect(0, 0, X.width, X.height), ie.save(), ie.setTransform(
        X.camera.zoom * ge,
        0,
        0,
        X.camera.zoom * ge,
        -X.camera.x * X.camera.zoom * ge,
        -X.camera.y * X.camera.zoom * ge
      );
      const Pe = X.width / X.camera.zoom, he = X.height / X.camera.zoom, { dirtyAll: pt, blocks: Ue } = ee.getState().consumeDirtyBlocks();
      pt && l.current.clear();
      for (const ve of Ue) {
        const ot = `${ve.layerId}:${ve.row}:${ve.col}`, $e = ee.getState().layers.find((I) => I.id === ve.layerId), wn = $e == null ? void 0 : $e.store.getBlock(ve.row, ve.col);
        if (!wn) {
          l.current.delete(ot);
          continue;
        }
        const es = jx(wn, z);
        es && l.current.set(ot, es);
      }
      (pt || Ue.length > 0) && $.getState().refreshCanvasSourcedTiles(
        pt,
        Ue.map((ve) => ({ row: ve.row, col: ve.col }))
      );
      const It = ye.getState(), tn = It.consumeDirtyBlocks();
      tn.dirtyAll && i.current.clear();
      for (const ve of tn.blocks) {
        const ot = `${ve.row}:${ve.col}`, $e = It.store.getBlock(ve.row, ve.col);
        if (!$e) {
          i.current.delete(ot);
          continue;
        }
        const wn = sM($e);
        wn ? i.current.set(ot, wn) : i.current.delete(ot);
      }
      const vt = Re.getState();
      vt.showReferenceLayer && cM(ie, X.camera.x, X.camera.y, Pe, he);
      let Pn = 0, Jn = 0;
      if (vt.showPixelLayer) {
        const ve = nM(
          ie,
          X.camera.x,
          X.camera.y,
          Pe,
          he,
          z,
          l.current
        );
        Pn = ve.blocksDrawn, Jn = ve.pixelsDrawn;
      }
      const In = Js.getState().mode;
      In === "pixel" && !vt.showTileLayer && oM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        Oe,
        st
      ), vt.showTileLayer && rM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        z,
        r.current
      ), ZS(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        _e,
        Fe
      ), lM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        i.current,
        It.selectedCount > 0
      ), iM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), In === "pixel" && JS(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), vt.showTileLayer && $.getState().tileDebugOverlay && hM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), vt.showPixelGrid && Ip(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        C,
        te
      ), vt.showTileGrid && Ip(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        C * me,
        de
      ), vt.showAxes && qS(ie, X.camera.x, X.camera.y, Pe, he, Ze);
      const nn = Nt.getState().activeTool;
      aM(ie, z, nn === "selection-rect" || nn === "selection-oval" || nn === "selection-lasso" || nn === "texture-roll" || nn === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), nn === "reference-handle" && uM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), ie.restore();
      const En = performance.now(), Rn = En - Me;
      Rn > 50 && En - a.current > 500 && (a.current = En, (fe = window.debugApi) == null || fe.logPerf(
        [
          "viewport:render",
          `ms=${Rn.toFixed(2)}`,
          `zoom=${X.camera.zoom.toFixed(2)}`,
          `view=${Pe.toFixed(1)}x${he.toFixed(1)}`,
          `blocks=${Pn}`,
          `pixels=${Jn}`
        ].join(" ")
      )), n.current = requestAnimationFrame(le);
    };
    n.current = requestAnimationFrame(le);
    const ae = new ResizeObserver((Me) => {
      for (const X of Me)
        c(X.contentRect.width, X.contentRect.height);
    });
    return ae.observe(N), () => {
      ne(), D(), F(), K(), ae.disconnect(), n.current && cancelAnimationFrame(n.current), G.frame && (cancelAnimationFrame(G.frame), G.frame = null);
    };
  }, [c]);
  const M = (N) => {
    const O = N.currentTarget.getBoundingClientRect(), G = N.clientX - O.left, oe = N.clientY - O.top, Q = Ce.getState();
    return {
      screenX: G,
      screenY: oe,
      canvasX: G / Q.camera.zoom + Q.camera.x,
      canvasY: oe / Q.camera.zoom + Q.camera.y,
      primary: (N.buttons & 1) === 1,
      alt: N.altKey,
      ctrl: N.ctrlKey,
      shift: N.shiftKey
    };
  }, v = (N) => {
    N.preventDefault(), N.currentTarget.setPointerCapture(N.pointerId);
    const O = Ce.getState();
    f.current = {
      screenX: N.clientX,
      screenY: N.clientY,
      cameraX: O.camera.x,
      cameraY: O.camera.y,
      zoom: O.camera.zoom
    }, h(!0), W.getState().clear();
  }, m = (N) => {
    const O = f.current;
    if (!O)
      return;
    const G = N.clientX - O.screenX, oe = N.clientY - O.screenY, Q = O.cameraX - G / O.zoom, ne = O.cameraY - oe / O.zoom;
    Ce.getState().panTo(Q, ne);
  }, x = (N) => {
    f.current = null, h(!1), N.currentTarget.releasePointerCapture(N.pointerId);
  }, S = (N) => {
    var G;
    if (N.button === 1) {
      v(N);
      return;
    }
    if (N.button === 2)
      return;
    const O = M(N);
    N.currentTarget.setPointerCapture(N.pointerId), (G = s.current) == null || G.handleEvent("begin", O);
  }, b = (N) => {
    var oe;
    if (f.current) {
      m(N);
      return;
    }
    const O = M(N), G = (N.buttons & 1) === 1;
    (oe = s.current) == null || oe.handleEvent(G ? "move" : "hover", O);
  }, _ = (N) => {
    var G, oe;
    if (f.current) {
      x(N);
      return;
    }
    const O = M(N);
    if ((G = s.current) == null || G.handleEvent("end", O), Au.getState().isRecording) {
      const Q = t.current;
      Q && ((oe = window.recordingApi) != null && oe.addFrame) && (w.current = w.current.then(
        () => new Promise((ne) => {
          requestAnimationFrame(() => {
            Q.toBlob(async (D) => {
              if (!D) {
                ne();
                return;
              }
              try {
                const F = new Uint8Array(await D.arrayBuffer());
                await window.recordingApi.addFrame(F);
              } catch (F) {
                console.error("Failed to capture recording frame:", F);
              }
              ne();
            }, "image/png");
          });
        })
      ));
    }
    N.currentTarget.releasePointerCapture(N.pointerId);
  }, k = (N) => {
    var G;
    if (f.current) {
      x(N);
      return;
    }
    const O = M(N);
    (G = s.current) == null || G.handleEvent("cancel", O);
  }, j = (N) => {
    var O;
    (O = N.dataTransfer) != null && O.types.includes("Files") && (N.preventDefault(), N.dataTransfer.dropEffect = "copy");
  }, A = (N) => {
    var D, F;
    if (!((F = (D = N.dataTransfer) == null ? void 0 : D.files) != null && F.length))
      return;
    N.preventDefault();
    const O = N.currentTarget.getBoundingClientRect(), G = N.clientX - O.left, oe = N.clientY - O.top, Q = Ce.getState(), ne = {
      x: G / Q.camera.zoom + Q.camera.x,
      y: oe / Q.camera.zoom + Q.camera.y
    };
    QS(Array.from(N.dataTransfer.files), ne);
  }, L = (N) => {
    if (N.deltaY === 0)
      return;
    N.preventDefault();
    const O = N.currentTarget.getBoundingClientRect(), G = N.clientX - O.left, oe = N.clientY - O.top, Q = Ce.getState(), ne = {
      x: G / Q.camera.zoom + Q.camera.x,
      y: oe / Q.camera.zoom + Q.camera.y
    }, D = N.deltaMode === 1 ? 16 : N.deltaMode === 2 ? Math.max(240, Q.height) : 1;
    let K = -(N.deltaY * D) * R0;
    if (K > ci ? K = ci : K < -ci && (K = -ci), g.current.remainingLogDelta += K, g.current.anchor = ne, g.current.frame)
      return;
    const le = () => {
      const ae = g.current, Me = ae.remainingLogDelta;
      if (!Number.isFinite(Me) || Math.abs(Me) < 5e-4) {
        ae.remainingLogDelta = 0, ae.frame = null;
        return;
      }
      const X = Me * 0.35, ge = Math.max(1e-3, ci * 0.25), z = Math.sign(X) * Math.min(Math.abs(X), ge), Z = Ce.getState(), P = Z.camera.zoom, te = P * Math.exp(z) - P;
      if (!Number.isFinite(te) || Math.abs(te) < 1e-12) {
        ae.remainingLogDelta = 0, ae.frame = null;
        return;
      }
      Z.zoomBy(te, ae.anchor ?? void 0), ae.remainingLogDelta -= z, ae.frame = requestAnimationFrame(le);
    };
    g.current.frame = requestAnimationFrame(le);
  }, Y = (N) => {
    N.preventDefault(), d({ open: !0, x: N.clientX, y: N.clientY });
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: S,
        onPointerMove: b,
        onPointerUp: _,
        onPointerLeave: k,
        onContextMenu: Y,
        onDragOver: j,
        onDrop: A,
        onWheel: L,
        style: {
          cursor: u ? "grabbing" : "crosshair"
        }
      }
    ),
    p.open && /* @__PURE__ */ o.jsx(
      OS,
      {
        x: p.x,
        y: p.y,
        onClose: () => d((N) => N.open ? { ...N, open: !1 } : N)
      }
    )
  ] });
}, hM = (e, t, n, s, l) => {
  const { tileMaps: i } = $.getState();
  if (i.length !== 0) {
    e.save(), e.font = `${Math.max(10, C)}px sans-serif`, e.textBaseline = "top", e.fillStyle = "rgba(255, 186, 73, 0.95)", e.strokeStyle = "rgba(255, 186, 73, 0.5)", e.lineWidth = Math.max(1, C * 0.06);
    for (const r of i) {
      const a = r.originX * C, c = r.originY * C, u = r.columns * C, h = r.rows * C, p = a + u, d = c + h;
      p < t || d < n || a > t + s || c > n + l || (e.strokeRect(a, c, u, h), e.fillText(
        `map ${r.id.slice(0, 6)} origin=(${r.originX},${r.originY}) size=${r.columns}x${r.rows}`,
        a + C * 0.5,
        c + C * 0.5
      ));
    }
    e.restore();
  }
}, fM = () => {
  const e = ee.getState();
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  for (const i of e.layers)
    for (const { row: r, col: a, block: c } of i.store.getBlocks())
      for (let u = 0; u < B; u += 1)
        for (let h = 0; h < B; h += 1) {
          if (c[u * B + h] === 0)
            continue;
          const d = (a * B + h) * C, f = (r * B + u) * C;
          t = Math.min(t, d), n = Math.min(n, f), s = Math.max(s, d + C), l = Math.max(l, f + C);
        }
  return Number.isFinite(t) ? { minX: t, minY: n, maxX: s, maxY: l } : null;
}, pM = () => {
  const e = Ce.getState(), t = fM();
  let n = t ? t.minX : -rs / 2, s = t ? t.minY : -rs / 2, l = t ? t.maxX : rs / 2, i = t ? t.maxY : rs / 2;
  if (e.width > 0 && e.height > 0) {
    const c = e.width / e.camera.zoom, u = e.height / e.camera.zoom;
    n = Math.min(n, e.camera.x), s = Math.min(s, e.camera.y), l = Math.max(l, e.camera.x + c), i = Math.max(i, e.camera.y + u);
  }
  const r = l - n, a = i - s;
  if (r < rs) {
    const c = (rs - r) / 2;
    n -= c, l += c;
  }
  if (a < rs) {
    const c = (rs - a) / 2;
    s -= c, i += c;
  }
  return { minX: n, minY: s, maxX: l, maxY: i };
}, Nx = (e, t) => {
  const n = pM(), s = n.maxX - n.minX, l = n.maxY - n.minY, i = Math.min(e / s, t / l), r = (e - s * i) / 2 - n.minX * i, a = (t - l * i) / 2 - n.minY * i;
  return { bounds: n, scale: i, offsetX: r, offsetY: a };
}, mM = (e, t, n) => {
  const s = Ce.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = yt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(r, da(r)), c = Ed(hs(r, a, 0.08)), u = un(a, 0.12), h = un(a, 0.6), p = un(a, 0.8), { bounds: d, scale: f, offsetX: g, offsetY: w } = Nx(t, n), M = d.maxX - d.minX, v = d.maxY - d.minY;
  e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), e.fillStyle = c, e.fillRect(
    g + d.minX * f,
    w + d.minY * f,
    M * f,
    v * f
  ), e.strokeStyle = u, e.strokeRect(
    g + d.minX * f,
    w + d.minY * f,
    M * f,
    v * f
  );
  const m = g, x = w;
  e.strokeStyle = h, e.lineWidth = 2, e.beginPath(), e.moveTo(m + 0.5, w + d.minY * f), e.lineTo(m + 0.5, w + d.maxY * f), e.stroke(), e.beginPath(), e.moveTo(g + d.minX * f, x + 0.5), e.lineTo(g + d.maxX * f, x + 0.5), e.stroke();
  const S = ee.getState();
  let b = 0, _ = 0;
  if (Re.getState().showPixelLayer) {
    const k = f * C, j = Math.max(1, Math.floor(1 / Math.max(k * 0.75, 0.01)));
    for (const A of S.layers)
      if (A.visible)
        for (const { row: L, col: Y, block: N } of A.store.getBlocks()) {
          b += 1;
          for (let O = 0; O < B; O += j)
            for (let G = 0; G < B; G += j) {
              const oe = N[O * B + G];
              if (oe === 0)
                continue;
              _ += 1;
              const Q = (Y * B + G) * C, ne = (L * B + O) * C;
              e.fillStyle = l[oe] ?? l[0];
              const D = Math.max(1, k * j);
              e.fillRect(
                g + Q * f,
                w + ne * f,
                D,
                D
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const k = s.width / s.camera.zoom, j = s.height / s.camera.zoom, A = s.camera.x * f + g, L = s.camera.y * f + w, Y = k * f, N = j * f;
    e.strokeStyle = p, e.lineWidth = 2, e.strokeRect(A, L, Y, N);
  }
  return { blocksDrawn: b, pixelsDrawn: _, zoom: s.camera.zoom };
}, gM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, xM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(!1), s = T.useRef(null), l = T.useRef(null), i = T.useRef(0), r = Ce((x) => x.panTo), a = Ce((x) => x.zoomBy), c = Ce((x) => x.resetCamera), u = Ce((x) => x.camera), [h, p] = T.useState(String(Math.round(u.x))), [d, f] = T.useState(String(Math.round(u.y)));
  T.useEffect(() => {
    p(String(Math.round(u.x))), f(String(Math.round(u.y)));
  }, [u.x, u.y]);
  const g = () => {
    const x = Number(h), S = Number(d);
    Number.isFinite(x) && Number.isFinite(S) && r(x, S);
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
      const N = performance.now(), { blocksDrawn: O, pixelsDrawn: G, zoom: oe } = mM(
        Y,
        x.clientWidth,
        x.clientHeight
      ), Q = performance.now(), ne = Q - N;
      ne > 50 && Q - i.current > 500 && (i.current = Q, (D = window.debugApi) == null || D.logPerf(
        [
          "minimap:render",
          `ms=${ne.toFixed(2)}`,
          `zoom=${oe.toFixed(2)}`,
          `blocks=${O}`,
          `pixels=${G}`
        ].join(" ")
      ));
    };
    b();
    const _ = Ce.subscribe(b), k = ee.subscribe(b), j = re.subscribe(b), A = Re.subscribe(b), L = new ResizeObserver(b);
    return L.observe(x), () => {
      _(), k(), j(), A(), L.disconnect();
    };
  }, []);
  const w = (x) => {
    const S = x.currentTarget.getBoundingClientRect(), b = x.clientX - S.left, _ = x.clientY - S.top, { scale: k, offsetX: j, offsetY: A } = Nx(S.width, S.height);
    return {
      x: (b - j) / k,
      y: (_ - A) / k
    };
  }, M = (x) => {
    x.currentTarget.setPointerCapture(x.pointerId), n.current = !0;
    const S = w(x), b = Ce.getState(), _ = b.width / b.camera.zoom, k = b.height / b.camera.zoom;
    s.current = {
      x: S.x - _ / 2,
      y: S.y - k / 2
    };
    const j = () => {
      if (!n.current || !s.current)
        return;
      const A = Ce.getState().camera, L = s.current.x - A.x, Y = s.current.y - A.y, N = Math.hypot(L, Y);
      if (N > 0.01) {
        const G = Math.min(12, N * 0.25);
        r(
          A.x + L / N * G,
          A.y + Y / N * G
        );
      }
      l.current = requestAnimationFrame(j);
    };
    l.current = requestAnimationFrame(j);
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
  return /* @__PURE__ */ o.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ o.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: M,
        onPointerMove: v,
        onPointerUp: m
      }
    ) }),
    /* @__PURE__ */ o.jsxs("div", { className: "minimap__controls", children: [
      /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => a(0.2), children: "+" }),
      /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => a(-0.2), children: "-" }),
      /* @__PURE__ */ o.jsx("button", { type: "button", onClick: c, children: "Home" })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ o.jsxs("label", { children: [
        "X:",
        /* @__PURE__ */ o.jsx(
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
      /* @__PURE__ */ o.jsxs("label", { children: [
        "Y:",
        /* @__PURE__ */ o.jsx(
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
      /* @__PURE__ */ o.jsxs("span", { children: [
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
  const s = rt.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = yt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(r, da(r)), c = Ed(hs(r, a, 0.1)), u = un(a, 0.12);
  if (e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), s.pixels.length === 0 || s.width === 0 || s.height === 0)
    return;
  const h = 12, p = Math.max(1, t - h * 2), d = Math.max(1, n - h * 2), f = Math.min(
    p / s.width,
    d / s.height
  ), g = s.width * f, w = s.height * f, M = (t - g) / 2, v = (n - w) / 2;
  e.fillStyle = c, e.fillRect(M, v, g, w), e.strokeStyle = u, e.strokeRect(M, v, g, w);
  for (const m of s.pixels) {
    const x = l[m.paletteIndex] ?? l[0];
    e.fillStyle = x, e.fillRect(
      M + m.x * f,
      v + m.y * f,
      f,
      f
    );
  }
}, wM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = rt((s) => s);
  return T.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const i = () => {
      const u = yM(l, s.clientWidth, s.clientHeight);
      u && vM(u, s.clientWidth, s.clientHeight);
    };
    i();
    const r = rt.subscribe(i), a = re.subscribe(i), c = new ResizeObserver(i);
    return c.observe(s), () => {
      r(), a(), c.disconnect();
    };
  }, []), /* @__PURE__ */ o.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ o.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ o.jsx("canvas", { ref: t }) }),
    /* @__PURE__ */ o.jsxs("div", { className: "minimap__readout", children: [
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Size: ",
        n.width,
        "x",
        n.height
      ] }),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Origin: ",
        n.origin ? `${n.origin.x}, ${n.origin.y}` : "--"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Pixels: ",
        n.pixels.length
      ] })
    ] })
  ] });
}, SM = (e) => {
  const t = e.trim();
  return t ? t.toLowerCase().endsWith(".png") ? t : `${t}.png` : "";
}, MM = (e) => {
  const t = re.getState().colors, n = ee.getState(), s = Math.max(1, e.width), l = Math.max(1, e.height), i = new Uint8ClampedArray(s * l * 4);
  for (let r = 0; r < l; r += 1)
    for (let a = 0; a < s; a += 1) {
      const c = n.getPixelComposite(e.x + a, e.y + r);
      if (c === 0)
        continue;
      const u = t[c];
      if (!u)
        continue;
      const h = yt(u);
      if (!h)
        continue;
      const p = (r * s + a) * 4;
      i[p] = h.r, i[p + 1] = h.g, i[p + 2] = h.b, i[p + 3] = 255;
    }
  return { data: i, width: s, height: l };
}, bM = async (e) => {
  const t = SM(e.fileName ?? "");
  if (!t)
    return window.alert("Set a file name before exporting this bookmark."), null;
  const { data: n, width: s, height: l } = MM(e), i = document.createElement("canvas");
  i.width = s, i.height = l;
  const r = i.getContext("2d");
  if (!r)
    return window.alert("Unable to export bookmark."), null;
  r.putImageData(new ImageData(n, s, l), 0, 0);
  const a = await new Promise(
    (u) => i.toBlob((h) => u(h), "image/png")
  );
  if (!a)
    return window.alert("Unable to export bookmark."), null;
  const c = new Uint8Array(await a.arrayBuffer());
  return window.projectApi.exportPng(c, t);
}, Ep = (e) => Math.round(e / C), _M = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: r, y: a });
}, TM = () => {
  const e = St((f) => f.items), t = St((f) => f.addFromCamera), n = St((f) => f.rename), s = St((f) => f.remove), l = St((f) => f.move), i = St((f) => f.jumpTo), r = St((f) => f.setRegionPosition), a = St((f) => f.setRegionSize), c = St((f) => f.setRegionFileName), u = St((f) => f.overlaysVisible), h = St((f) => f.toggleOverlaysVisible), p = zt((f) => f.items), d = T.useMemo(
    () => p.map((f) => {
      const g = ma(f), w = (g.minX + g.maxX) / 2, M = (g.minY + g.maxY) / 2;
      return {
        id: f.id,
        name: f.assetFilename,
        centerX: w,
        centerY: M,
        x: Ep(w),
        y: Ep(M)
      };
    }),
    [p]
  );
  return /* @__PURE__ */ o.jsxs("div", { className: "nav-panel", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__header", children: [
        /* @__PURE__ */ o.jsx("div", { className: "nav-panel__title", children: "Bookmarks" }),
        /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__actions", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: h,
              title: "Toggle bookmark tag overlays in Pixel mode",
              children: u ? "Hide Tags" : "Show Tags"
            }
          ),
          /* @__PURE__ */ o.jsx(
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
      e.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "nav-panel__empty", children: "No bookmarks yet." }) : /* @__PURE__ */ o.jsx("div", { className: "nav-panel__list", children: e.map((f, g) => {
        var w;
        return /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__row", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__meta", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                className: "nav-panel__name",
                value: f.name,
                "aria-label": `Bookmark name ${g + 1}`,
                onChange: (M) => n(f.id, M.currentTarget.value)
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__coords", children: [
              f.x,
              ",",
              f.y,
              " • ",
              f.width,
              "x",
              f.height
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__region-fields", children: [
              /* @__PURE__ */ o.jsxs("label", { className: "nav-panel__field", children: [
                "X",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    value: f.x,
                    onChange: (M) => r(f.id, Number(M.currentTarget.value), f.y)
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { className: "nav-panel__field", children: [
                "Y",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    value: f.y,
                    onChange: (M) => r(f.id, f.x, Number(M.currentTarget.value))
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { className: "nav-panel__field", children: [
                "W",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    min: 1,
                    value: f.width,
                    onChange: (M) => a(f.id, Number(M.currentTarget.value), f.height)
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { className: "nav-panel__field", children: [
                "H",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    className: "nav-panel__number",
                    type: "number",
                    min: 1,
                    value: f.height,
                    onChange: (M) => a(f.id, f.width, Number(M.currentTarget.value))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                className: "nav-panel__name",
                value: f.fileName ?? "",
                "aria-label": `Bookmark export file ${g + 1}`,
                placeholder: "export file name (e.g. hero-idle.png)",
                onChange: (M) => c(f.id, M.currentTarget.value)
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__actions", children: [
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                onClick: () => i(f.id),
                children: "Go"
              }
            ),
            (w = f.fileName) != null && w.trim() ? /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                onClick: () => {
                  bM(f);
                },
                children: "Export"
              }
            ) : null,
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                disabled: g === 0,
                onClick: () => l(f.id, "up"),
                "aria-label": "Move bookmark up",
                title: "Move up",
                children: "↑"
              }
            ),
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                disabled: g === e.length - 1,
                onClick: () => l(f.id, "down"),
                "aria-label": "Move bookmark down",
                title: "Move down",
                children: "↓"
              }
            ),
            /* @__PURE__ */ o.jsx(
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
    /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ o.jsx("div", { className: "nav-panel__header", children: /* @__PURE__ */ o.jsx("div", { className: "nav-panel__title", children: "References" }) }),
      d.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "nav-panel__empty", children: "No references yet." }) : /* @__PURE__ */ o.jsx("div", { className: "nav-panel__list", children: d.map((f) => /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ o.jsx("div", { className: "nav-panel__name nav-panel__name--readonly", children: f.name }),
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__coords", children: [
            f.x,
            ",",
            f.y
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "nav-panel__actions", children: /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "nav-panel__button",
            onClick: () => _M(f.centerX, f.centerY),
            children: "Go"
          }
        ) })
      ] }, f.id)) })
    ] })
  ] });
}, kM = () => {
  const e = ee((d) => d.layers), t = ee((d) => d.activeLayerId), n = ee((d) => d.createLayer), s = ee((d) => d.deleteLayer), l = ee((d) => d.renameLayer), i = ee((d) => d.toggleLayerVisible), r = ee((d) => d.moveLayer), a = ee((d) => d.mergeLayerDown), c = ee((d) => d.setActiveLayer), h = e.findIndex((d) => d.id === t) > 0, p = [...e].reverse();
  return /* @__PURE__ */ o.jsxs("div", { className: "layers-panel", "aria-label": "Layers panel", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "layers-panel__actions", children: [
      /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: () => n(), children: "+ Layer" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: () => s(t),
          disabled: e.length <= 1,
          children: "Delete"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: () => a(t),
          disabled: !h,
          children: "Merge Down"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "layers-panel__list", role: "list", children: p.map((d) => {
      const f = e.findIndex((v) => v.id === d.id), g = f === e.length - 1, w = f === 0, M = d.id === t;
      return /* @__PURE__ */ o.jsxs(
        "div",
        {
          role: "listitem",
          className: "layers-panel__row",
          "data-active": M,
          onMouseDown: () => c(d.id),
          children: [
            /* @__PURE__ */ o.jsx("label", { className: "layers-panel__toggle", title: "Toggle visibility", children: /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "checkbox",
                checked: d.visible,
                onChange: () => i(d.id),
                onMouseDown: (v) => v.stopPropagation()
              }
            ) }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                className: "layers-panel__name",
                value: d.name,
                onChange: (v) => l(d.id, v.target.value),
                onMouseDown: (v) => v.stopPropagation()
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: "layers-panel__move", children: [
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move up",
                  disabled: g,
                  onMouseDown: (v) => v.stopPropagation(),
                  onClick: () => r(d.id, "up"),
                  children: "↑"
                }
              ),
              /* @__PURE__ */ o.jsx(
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
}, CM = () => {
  const e = rt(
    (l) => l.pixels.length > 0 && l.width > 0 && l.height > 0
  ), [t, n] = T.useState("minimap"), s = T.useRef(e);
  return T.useEffect(() => {
    !e && t === "paste" && n("minimap");
  }, [e, t]), T.useEffect(() => {
    e && !s.current && n((l) => l === "minimap" ? "paste" : l), s.current = e;
  }, [e]), /* @__PURE__ */ o.jsxs("div", { className: "minimap-panel", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "minimap__tabs", role: "tablist", "aria-label": "Minimap tabs", children: [
      /* @__PURE__ */ o.jsx(
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
      /* @__PURE__ */ o.jsx(
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
      /* @__PURE__ */ o.jsx(
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
      /* @__PURE__ */ o.jsx(
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
    t === "nav" ? /* @__PURE__ */ o.jsx(TM, {}) : t === "layers" ? /* @__PURE__ */ o.jsx(kM, {}) : t === "paste" && e ? /* @__PURE__ */ o.jsx(wM, {}) : /* @__PURE__ */ o.jsx(xM, {})
  ] });
}, jM = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, Rp = (e, t, n) => Math.min(n, Math.max(t, e)), on = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: i
}) => {
  const a = `dropdown-${T.useId()}`, c = T.useRef(null), u = T.useRef(null), [h, p] = T.useState(!1), [d, f] = T.useState(0), [g, w] = T.useState(null), M = T.useMemo(() => jM(t, e), [t, e]), v = T.useMemo(
    () => Math.max(0, t.findIndex((b) => b.value === e)),
    [t, e]
  ), m = () => {
    const b = c.current;
    if (!b)
      return null;
    const _ = b.getBoundingClientRect(), k = window.innerHeight || document.documentElement.clientHeight || 0, j = 260, A = k - _.bottom - 12, L = _.top - 12, Y = A >= Math.min(j, 180) || A >= L, N = Rp(Y ? A : L, 120, j), O = Y ? _.bottom + 6 : _.top - 6 - N;
    return { left: _.left, top: O, width: _.width, maxHeight: N };
  };
  T.useEffect(() => {
    if (!h)
      return;
    f(v);
    const b = m();
    w(b);
    const _ = window.requestAnimationFrame(() => {
      var j;
      const k = (j = u.current) == null ? void 0 : j.querySelector('[data-highlighted="true"]');
      k == null || k.scrollIntoView({ block: "nearest" });
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
        const Y = j.key === "ArrowDown" ? 1 : -1;
        f((N) => Rp(N + Y, 0, t.length - 1));
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
        const Y = t[d];
        Y && !Y.disabled && (n(Y.value), p(!1), (L = c.current) == null || L.focus());
      }
    }, _ = (j) => {
      var L, Y;
      const A = j.target;
      A && ((L = c.current) != null && L.contains(A) || (Y = u.current) != null && Y.contains(A) || p(!1));
    }, k = (j) => {
      var Y;
      const A = (j == null ? void 0 : j.target) ?? null;
      if (A && ((Y = u.current) != null && Y.contains(A)))
        return;
      const L = m();
      w(L);
    };
    return window.addEventListener("keydown", b), window.addEventListener("pointerdown", _, { capture: !0 }), window.addEventListener("resize", k), window.addEventListener("scroll", k, { capture: !0 }), () => {
      window.removeEventListener("keydown", b), window.removeEventListener("pointerdown", _, { capture: !0 }), window.removeEventListener("resize", k), window.removeEventListener("scroll", k, { capture: !0 });
    };
  }, [h, t, d, n]), T.useEffect(() => {
    var _;
    if (!h)
      return;
    const b = (_ = u.current) == null ? void 0 : _.querySelector('[data-highlighted="true"]');
    b == null || b.scrollIntoView({ block: "nearest" });
  }, [h, d]);
  const x = (b) => {
    s || (b.key === "ArrowDown" || b.key === "ArrowUp") && (b.preventDefault(), p(!0));
  }, S = (b) => {
    var _;
    n(b), p(!1), (_ = c.current) == null || _.focus();
  };
  return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs(
      "button",
      {
        ref: c,
        type: "button",
        className: i ?? "panel__select",
        "aria-label": l,
        "aria-haspopup": "listbox",
        "aria-expanded": h,
        "aria-controls": a,
        disabled: s,
        onClick: () => p((b) => !b),
        onKeyDown: x,
        children: [
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__label", children: M }),
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__chevron", "aria-hidden": "true", children: "▾" })
        ]
      }
    ),
    h && g && Ci.createPortal(
      /* @__PURE__ */ o.jsx(
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
          children: t.map((b, _) => /* @__PURE__ */ o.jsx(
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
}, Ap = (e) => /^#[0-9a-f]{6}$/i.test(e), Lp = (e) => {
  const t = e.trim().toLowerCase();
  return t ? t.startsWith("#") ? t : `#${t}` : "";
}, De = (e) => Math.min(1, Math.max(0, e)), Mn = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Ad = (e) => (e % 360 + 360) % 360, Pc = (e) => e.toString(16).padStart(2, "0"), fn = (e) => `#${Pc(e.r)}${Pc(e.g)}${Pc(e.b)}`, Px = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), r = l - i;
  let a = 0;
  r !== 0 && (l === t ? a = (n - s) / r % 6 : l === n ? a = (s - t) / r + 2 : a = (t - n) / r + 4, a *= 60), a < 0 && (a += 360);
  const c = (l + i) / 2, u = r === 0 ? 0 : r / (1 - Math.abs(2 * c - 1));
  return { h: a, s: u, l: c };
}, NM = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), r = l - i;
  let a = 0;
  r !== 0 && (l === t ? a = (n - s) / r % 6 : l === n ? a = (s - t) / r + 2 : a = (t - n) / r + 4, a *= 60), a < 0 && (a += 360);
  const c = l === 0 ? 0 : r / l;
  return { h: a, s: c, v: l };
}, Lu = (e) => {
  const t = Ad(e.h), n = De(e.s), s = De(e.l), l = (1 - Math.abs(2 * s - 1)) * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), r = s - l / 2;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + r) * 255),
    g: Math.round((c + r) * 255),
    b: Math.round((u + r) * 255)
  };
}, hl = (e) => {
  const t = Ad(e.h), n = De(e.s), s = De(e.v), l = s * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), r = s - l;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + r) * 255),
    g: Math.round((c + r) * 255),
    b: Math.round((u + r) * 255)
  };
}, an = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const s = n.toLowerCase();
    return t.has(s) ? !1 : (t.add(s), !0);
  });
}, PM = (e) => {
  const t = yt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = Px(t), i = (A, L, Y) => fn(
    Lu({
      h: Ad(l.h + A),
      s: De(L),
      l: De(Y)
    })
  ), r = (A, L = 0, Y = 0) => i(A, l.s + L, l.l + Y), a = an([
    r(0, 0, 0.12),
    r(0, 0, -0.12),
    r(180, 0, 0),
    r(180, 0, 0.12),
    r(180, 0, -0.12)
  ]), c = an([
    r(-40),
    r(-20),
    r(0),
    r(20),
    r(40)
  ]), u = an([
    r(0),
    r(150),
    r(210),
    r(150, 0, 0.12),
    r(210, 0, -0.12)
  ]), h = an([
    r(0),
    r(120),
    r(240),
    r(120, 0, 0.12),
    r(240, 0, -0.12)
  ]), p = an([
    r(0),
    r(90),
    r(180),
    r(270)
  ]), d = an([
    fn(hs(t, n, 0.7)),
    fn(hs(t, n, 0.5)),
    fn(hs(t, n, 0.3)),
    fn(hs(t, s, 0.25)),
    fn(hs(t, s, 0.5))
  ]), f = De(l.s * 0.45 + 0.15), g = De(l.l * 0.4 + 0.6), w = an([
    i(-25, f, De(g + 0.05)),
    i(-10, f, De(g + 0.02)),
    i(0, f, g),
    i(10, f, De(g - 0.03)),
    i(25, f, De(g - 0.06))
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
  ]), j = an([
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
    { id: "triad", label: "Triad", colors: h },
    { id: "tetrad", label: "Tetrad", colors: p },
    { id: "tints", label: "Tints + Shades", colors: d },
    { id: "pastel", label: "Pastel", colors: w },
    { id: "muted", label: "Muted", colors: m },
    { id: "vibrant", label: "Vibrant", colors: b },
    { id: "mono", label: "Monochrome Ramp", colors: k },
    { id: "hue-sweep", label: "Hue Sweep", colors: j }
  ];
}, IM = () => {
  const e = re((I) => I.colors), t = re((I) => I.selectedIndices), n = re((I) => I.setColor), s = re((I) => I.setPalette), l = re((I) => I.setSelectedIndices), i = re((I) => I.getActiveIndex()), r = re((I) => I.addColor), a = (I, R) => {
    const q = I.filter((ue) => ue !== R);
    return q.push(R), q;
  }, [c, u] = T.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [h, p] = T.useState("none"), [d, f] = T.useState(!1), [g, w] = T.useState(!1), [M, v] = T.useState(""), [m, x] = T.useState(!1), [S, b] = T.useState(null), [_, k] = T.useState(null), [j, A] = T.useState({ r: 255, g: 255, b: 255 }), [L, Y] = T.useState({
    r: 255,
    g: 255,
    b: 255
  }), [N, O] = T.useState("#ffffff"), [G, oe] = T.useState(() => {
    try {
      const I = window.localStorage.getItem("pss.paletteRows"), R = I ? Number(I) : 3, q = Number.isFinite(R) ? Math.floor(R) : 3;
      return Math.min(4, Math.max(2, q));
    } catch {
      return 3;
    }
  }), Q = T.useRef(null), ne = T.useRef(!1), D = T.useRef(null), F = T.useRef(!1), K = T.useRef(null), le = T.useRef(!1), ae = T.useRef(/* @__PURE__ */ new Set()), Me = T.useRef(!1), X = Te.useMemo(
    () => typeof navigator < "u" && navigator.platform.toLowerCase().includes("mac"),
    []
  ), ie = Te.useMemo(() => NM(j), [j]), ge = Te.useMemo(() => Px(j), [j]), z = () => {
    u((I) => I.open ? { ...I, open: !1, index: null } : I);
  }, Z = (I, R) => {
    I.preventDefault(), typeof R == "number" && (new Set(t).has(R) || l([R]), Q.current = R), u({
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
      const ue = q.target;
      (je = ue == null ? void 0 : ue.closest) != null && je.call(ue, ".dropdown-select__menu") || D.current && D.current.contains(q.target) || z();
    }, R = (q) => {
      q.key === "Escape" && z();
    };
    return window.addEventListener("mousedown", I), window.addEventListener("keydown", R), () => {
      window.removeEventListener("mousedown", I), window.removeEventListener("keydown", R);
    };
  }, [c.open]), T.useLayoutEffect(() => {
    if (!c.open || !D.current)
      return;
    const I = D.current.getBoundingClientRect(), R = 8, q = Math.max(R, window.innerWidth - I.width - R), ue = Math.max(R, window.innerHeight - I.height - R), je = Math.min(Math.max(R, c.x), q), Et = Math.min(Math.max(R, c.y), ue);
    (je !== c.x || Et !== c.y) && u((sn) => ({ ...sn, x: je, y: Et }));
  }, [c.open, c.x, c.y]);
  const P = t.length === 1 ? t[0] ?? null : null, U = P !== null && P >= 0 && P < e.length, te = U && P !== null ? e[P] : "#ffffff", de = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ze = Te.useMemo(
    () => PM(de),
    [de]
  ), _e = T.useCallback((I) => {
    const R = {
      r: Mn(I.r, 0, 255),
      g: Mn(I.g, 0, 255),
      b: Mn(I.b, 0, 255)
    };
    A(R), O(fn(R));
  }, []), Fe = T.useCallback((I, R) => {
    const q = yt(R) ?? { r: 255, g: 255, b: 255 };
    k(I), Y(q), A(q), O(fn(q));
  }, []), Oe = T.useCallback(() => {
    k(null);
  }, []), st = T.useCallback(() => {
    if (!_)
      return;
    const I = fn(j);
    if (_.mode === "set") {
      n(_.index, I), k(null);
      return;
    }
    r(I), k(null);
  }, [r, _, j, n]), Pe = (_ == null ? void 0 : _.mode) === "set" ? "Set Color" : "Add Color", he = () => {
    !U || P === null || (z(), Fe({ mode: "set", index: P }, te));
  }, pt = () => {
    z(), Fe({ mode: "add" }, "#ffffff");
  }, Ue = new Set(t), It = [...Ue].sort((I, R) => I - R), tn = It.length, vt = tn > 0, Pn = tn > 1, Jn = e.length - tn >= 1, In = (I) => {
    l(I);
  }, nn = () => {
    if (t.length === 0)
      return;
    const I = t.filter((R) => R >= 0 && R < e.length);
    I.length !== t.length && l(I);
  };
  T.useEffect(nn, [e.length, t, l]);
  const nl = () => {
    if (!vt || !Jn)
      return;
    const I = new Set(It), R = e.filter((q, ue) => !I.has(ue));
    R.length !== 0 && (s(R), z());
  }, En = () => {
    if (!Pn)
      return;
    const I = $e.columns, R = [...Ue].sort((je, Et) => {
      const sn = Math.floor(je / I), Ps = je % I, Is = Math.floor(Et / I), Xn = Et % I;
      return Ps !== Xn ? Ps - Xn : sn - Is;
    });
    if (R.length < 2)
      return;
    const q = [...e], ue = q[R[R.length - 1]];
    for (let je = R.length - 1; je > 0; je -= 1)
      q[R[je]] = q[R[je - 1]];
    q[R[0]] = ue, s(q), z();
  }, Rn = (I) => {
    const R = new Set(e.map((q) => q.toLowerCase()));
    an(I).filter((q) => !R.has(q.toLowerCase())).forEach((q) => r(q)), z(), f(!1), p("none");
  }, fe = T.useCallback((I) => {
    b(null), w(!0), I && v(I);
  }, []), ve = () => {
    w(!1), x(!1), b(null), v("");
  };
  T.useEffect(() => {
    const I = () => {
      fe("https://lospec.com/palette-list/");
    };
    return window.addEventListener("palette:open-lospec", I), () => window.removeEventListener("palette:open-lospec", I);
  }, [fe]), T.useEffect(() => {
    const I = () => {
      f(!0), p("none");
    };
    return window.addEventListener("palette:open-add-swatch", I), () => window.removeEventListener("palette:open-add-swatch", I);
  }, []), T.useEffect(() => {
    const I = (R) => {
      const ue = Number(R.detail);
      Number.isFinite(ue) && oe(Math.min(4, Math.max(2, Math.floor(ue))));
    };
    return window.addEventListener("palette:set-rows", I), () => window.removeEventListener("palette:set-rows", I);
  }, []);
  const ot = async () => {
    var R;
    if (!((R = window.paletteApi) != null && R.importLospec)) {
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
      x(!0), b(null);
      try {
        const q = await window.paletteApi.importLospec(I), ue = q.colors.length > 0 ? q.colors : e;
        s(ue), l([Math.max(0, ue.length - 1)]), xe.getState().setDirty(!0), ve();
      } catch (q) {
        const ue = q instanceof Error ? q.message : "Unable to import palette.";
        b(ue), x(!1);
      }
    }
  }, $e = Te.useMemo(() => {
    const I = e.length + 1, R = Math.min(G, Math.max(1, Math.ceil(I / 16))), q = Math.max(1, Math.ceil(I / R));
    return { rows: R, columns: q };
  }, [e.length, G]);
  T.useEffect(() => {
    try {
      window.localStorage.setItem("pss.paletteRows", String(G));
    } catch {
    }
  }, [G]), T.useEffect(() => {
    const I = () => {
      F.current = !1, K.current = null, Me.current = !1, ae.current = /* @__PURE__ */ new Set();
    };
    return window.addEventListener("pointerup", I), () => window.removeEventListener("pointerup", I);
  }, []);
  const wn = (I) => ({
    row: Math.floor(I / $e.columns),
    col: I % $e.columns
  }), es = (I, R) => {
    const q = wn(I), ue = wn(R), je = Math.min(q.row, ue.row), Et = Math.max(q.row, ue.row), sn = Math.min(q.col, ue.col), Ps = Math.max(q.col, ue.col), Is = [];
    for (let Xn = je; Xn <= Et; Xn += 1)
      for (let $t = sn; $t <= Ps; $t += 1) {
        const ts = Xn * $e.columns + $t;
        ts < 0 || ts >= e.length || Is.push(ts);
      }
    return Is;
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "palette-bar", children: [
    /* @__PURE__ */ o.jsxs(
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
          e.map((I, R) => /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch",
              style: { background: I },
              "data-active": R === i,
              "data-selected": Ue.has(R),
              onMouseDown: (q) => {
                X && q.button === 0 && q.ctrlKey && (ne.current = !0);
              },
              onPointerDown: (q) => {
                if (q.button !== 0)
                  return;
                F.current = !0, K.current = R, le.current = !1, Me.current = q.shiftKey || q.metaKey || q.ctrlKey || q.altKey, ae.current = Me.current ? new Set(Ue) : /* @__PURE__ */ new Set();
                const ue = es(R, R);
                if (Me.current) {
                  const je = new Set(ae.current);
                  ue.forEach((Et) => je.add(Et)), l(a(Array.from(je), R));
                } else
                  l(a(ue, R));
                Q.current = R;
              },
              onPointerEnter: () => {
                if (!F.current || K.current === null)
                  return;
                le.current = !0;
                const q = es(K.current, R);
                if (Me.current) {
                  const ue = new Set(ae.current);
                  q.forEach((je) => ue.add(je)), l(a(Array.from(ue), R));
                } else
                  l(a(q, R));
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
                if (q.shiftKey && Q.current !== null) {
                  const ue = Math.min(Q.current, R), je = Math.max(Q.current, R), Et = new Set(Ue);
                  for (let sn = ue; sn <= je; sn += 1)
                    Et.add(sn);
                  l(a(Array.from(Et), R)), Q.current = R;
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
            `${I}-${R}`
          )),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch palette-bar__swatch--empty",
              onClick: () => {
                pt();
              },
              onContextMenu: (I) => Z(I, null),
              "aria-label": "Add palette color"
            }
          )
        ]
      }
    ),
    c.open && /* @__PURE__ */ o.jsxs(
      "div",
      {
        ref: D,
        className: "palette-bar__menu",
        role: "menu",
        style: { top: c.y, left: c.x },
        children: [
          /* @__PURE__ */ o.jsx("div", { className: "palette-bar__menu-label", children: "Actions" }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: he,
              disabled: !U,
              children: "Set Color"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: nl,
              disabled: !vt || !Jn,
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: En,
              disabled: !Pn,
              children: "Cycle Selected"
            }
          )
        ]
      }
    ),
    _ && Ci.createPortal(
      /* @__PURE__ */ o.jsxs(
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
              I.preventDefault(), st();
            }
          },
          children: [
            /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: Oe }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--palette-color", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ o.jsx("h2", { children: Pe }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: Oe, children: "Close" })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-row", children: [
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Before" }),
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: fn(L) }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Current" }),
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: fn(j) }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__hex-row", children: [
                  /* @__PURE__ */ o.jsx("label", { className: "panel__label", htmlFor: "palette-color-hex", children: "HEX" }),
                  /* @__PURE__ */ o.jsx(
                    "input",
                    {
                      id: "palette-color-hex",
                      type: "text",
                      className: "panel__number",
                      value: N,
                      onChange: (I) => {
                        const R = I.currentTarget.value;
                        O(R);
                        const q = Lp(R);
                        if (!Ap(q))
                          return;
                        const ue = yt(q);
                        ue && A(ue);
                      },
                      onBlur: () => {
                        const I = Lp(N);
                        if (!Ap(I)) {
                          O(fn(j));
                          return;
                        }
                        const R = yt(I);
                        R && _e(R);
                      }
                    }
                  )
                ] }),
                /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ o.jsx("div", { className: "palette-color-picker__section-label", children: "RGB" }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "R" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.r,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e({ ...j, r: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e({ ...j, r: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "G" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.g,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e({ ...j, g: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e({ ...j, g: R });
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "B" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 255,
                        value: j.b,
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e({ ...j, b: R });
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e({ ...j, b: R });
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__section", children: [
                  /* @__PURE__ */ o.jsx("div", { className: "palette-color-picker__section-label", children: "HSVL" }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "H" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 360,
                        value: Math.round(ie.h),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, h: Mn(R, 0, 360) })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e(
                            hl({ ...ie, h: Mn(R, 0, 360) })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "S" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.s * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, s: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e(
                            hl({ ...ie, s: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "V" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ie.v * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e(
                            hl({ ...ie, v: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
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
                          Number.isFinite(R) && _e(
                            hl({ ...ie, v: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__channel", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "palette-color-picker__channel-name", children: "L" }),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "range",
                        className: "panel__range",
                        min: 0,
                        max: 100,
                        value: Math.round(ge.l * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e(
                            Lu({ ...ge, l: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    ),
                    /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        type: "number",
                        className: "panel__number",
                        min: 0,
                        max: 100,
                        step: 1,
                        value: Math.round(ge.l * 100),
                        onChange: (I) => {
                          const R = Number(I.currentTarget.value);
                          Number.isFinite(R) && _e(
                            Lu({ ...ge, l: Mn(R, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ o.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: Oe, children: "Cancel" }),
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: st, children: _.mode === "add" ? "Add Color" : "Apply" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    d && Ci.createPortal(
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), f(!1), p("none"));
          },
          children: [
            /* @__PURE__ */ o.jsx(
              "div",
              {
                className: "modal__backdrop",
                onClick: () => {
                  f(!1), p("none");
                }
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ o.jsx("h2", { children: "Add Swatch Preset" }),
                /* @__PURE__ */ o.jsx(
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
              /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Preset" }),
                /* @__PURE__ */ o.jsx(
                  on,
                  {
                    ariaLabel: "Swatch presets",
                    className: "panel__select",
                    value: h,
                    onChange: (I) => {
                      if (p(I), I === "none")
                        return;
                      const R = Ze.find((q) => q.id === I);
                      R && Rn(R.colors);
                    },
                    options: [
                      { value: "none", label: "Choose preset…" },
                      ...Ze.map((I) => ({
                        value: I.id,
                        label: I.label,
                        render: /* @__PURE__ */ o.jsxs("span", { className: "palette-bar__preset-option", children: [
                          /* @__PURE__ */ o.jsx("span", { className: "palette-bar__preset-option-label", children: I.label }),
                          /* @__PURE__ */ o.jsx("span", { className: "palette-bar__menu-preview", "aria-hidden": "true", children: I.colors.map((R, q) => /* @__PURE__ */ o.jsx(
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
                /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Adds only colors not already in the palette." })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    g && Ci.createPortal(
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), ve());
          },
          children: [
            /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: ve }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ o.jsx("h2", { children: "Import LoSpec Palette" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: ve, children: "Close" })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ o.jsx("label", { className: "panel__label", htmlFor: "lospec-url", children: "URL or slug" }),
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    id: "lospec-url",
                    type: "text",
                    className: "panel__number",
                    value: M,
                    placeholder: "https://lospec.com/palette-list/black-scarlet-16",
                    onChange: (I) => v(I.currentTarget.value),
                    onKeyDown: (I) => {
                      I.key === "Enter" && (I.preventDefault(), ot());
                    },
                    autoFocus: !0
                  }
                ),
                /* @__PURE__ */ o.jsx("div", { className: "panel__note", style: { color: "rgba(255, 170, 120, 0.9)" }, children: "Importing will replace your current palette." }),
                S && /* @__PURE__ */ o.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: S }),
                /* @__PURE__ */ o.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: ve, disabled: m, children: "Cancel" }),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void ot(),
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
}, EM = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
  const i = T.useRef(null);
  return T.useEffect(() => {
    const r = i.current;
    if (!r)
      return;
    const a = t * s, c = n * s;
    r.width = a, r.height = c;
    const u = r.getContext("2d");
    if (u) {
      u.imageSmoothingEnabled = !1, u.clearRect(0, 0, a, c);
      for (let h = 0; h < n; h += 1)
        for (let p = 0; p < t; p += 1) {
          const d = e[h * t + p] ?? 0;
          d !== 0 && (u.fillStyle = l[d] ?? l[0] ?? "#000000", u.fillRect(p * s, h * s, s, s));
        }
    }
  }, [e, t, n, s, l]), /* @__PURE__ */ o.jsx("canvas", { ref: i, "aria-hidden": "true" });
}, RM = () => {
  const e = $((P) => P.tileSets), t = $((P) => P.activeTileSetId), n = $((P) => P.tilePage), s = $((P) => P.tilePageCount), l = $((P) => P.setTilePageCount), i = $((P) => P.selectedTileIndex), r = $((P) => P.selectedTileIndices), a = $((P) => P.tilePickerZoom), c = $((P) => P.setTileSelection), u = $((P) => P.setActiveTileSet), h = $((P) => P.deleteTilesFromSet), p = re((P) => P.colors), d = T.useMemo(() => e.find((P) => P.id === t) ?? e[0], [e, t]);
  T.useEffect(() => {
    !d && e.length > 0 && u(e[0].id);
  }, [d, e, u]);
  const f = (d == null ? void 0 : d.tiles.length) ?? 0, g = (d == null ? void 0 : d.tiles) ?? [], w = Math.max(1, (d == null ? void 0 : d.columns) ?? 1), M = Math.max(1, (d == null ? void 0 : d.rows) ?? 1), v = w * M, m = Math.max(1, Math.ceil(f / v)), x = d ? Math.max(16, d.tileWidth * a) : 32, S = T.useRef(null), [b, _] = T.useState({ width: 0, height: 0 }), k = w * x, j = M * x, A = T.useMemo(() => {
    if (b.width <= 0)
      return 1;
    const P = Math.floor((b.width + 8) / Math.max(1, k + 8));
    return Math.max(1, Math.min(m, P));
  }, [k, b.width, m]), L = T.useMemo(() => {
    if (b.height <= 0)
      return 1;
    const P = Math.floor((b.height + 8) / Math.max(1, j + 8));
    return Math.max(1, P);
  }, [j, b.height]), Y = Math.max(1, A * L), N = Math.max(1, Math.ceil(m / Y)), O = Math.min(n, N - 1), G = O * Y, oe = Math.max(0, Math.min(Y, m - G)), Q = T.useRef(!1), ne = T.useRef(null), D = T.useMemo(
    () => new Set(r.filter((P) => P >= 0)),
    [r]
  ), F = T.useMemo(() => {
    const P = new Set(r.filter((U) => U >= 0));
    return Array.from(P).sort((U, te) => U - te);
  }, [r]), K = T.useCallback(() => {
    if (!d || F.length === 0)
      return;
    const P = F.length === 1 ? "tile" : "tiles";
    if (!window.confirm(
      `Delete ${F.length} ${P} from ${d.name}?`
    ))
      return;
    const te = Ot();
    h(d.id, F);
    const de = Ot();
    qs(te, de);
  }, [d, h, F]), le = T.useCallback(() => {
    const P = S.current;
    if (!P)
      return;
    const U = Math.floor(P.clientWidth || P.getBoundingClientRect().width || 0), te = Math.floor(P.clientHeight || P.getBoundingClientRect().height || 0);
    _(
      (de) => de.width === U && de.height === te ? de : { width: U, height: te }
    );
  }, []);
  T.useEffect(() => {
    const P = S.current;
    if (!P)
      return;
    const U = () => {
      le();
    };
    if (U(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", U), () => {
        window.removeEventListener("resize", U);
      };
    const te = new ResizeObserver(() => U()), de = P.parentElement;
    return de && te.observe(de), te.observe(P), () => {
      te.disconnect();
    };
  }, [le]), T.useEffect(() => {
    s !== N && l(N);
  }, [l, s, N]), T.useEffect(() => {
    le();
    const P = window.requestAnimationFrame(() => {
      le();
    });
    return () => window.cancelAnimationFrame(P);
  }, [le, x, m, N, O]);
  const ae = (P) => {
    const U = Math.floor(P / v), te = P % v, de = te % w, Ze = Math.floor(te / w), _e = U % A;
    return {
      row: Math.floor(U / A) * M + Ze,
      col: _e * w + de
    };
  }, Me = (P, U) => {
    if (P.length === 0) {
      c([U], 1, 1, U);
      return;
    }
    const te = P.map((he) => ({
      index: he,
      ...ae(he)
    })), de = Math.min(...te.map((he) => he.col)), Ze = Math.max(...te.map((he) => he.col)), _e = Math.min(...te.map((he) => he.row)), Fe = Math.max(...te.map((he) => he.row)), Oe = Ze - de + 1, st = Fe - _e + 1, Pe = new Array(Oe * st).fill(-1);
    for (const he of te) {
      const pt = he.col - de, It = (he.row - _e) * Oe + pt;
      Pe[It] = he.index;
    }
    c(Pe, Oe, st, U);
  }, X = (P, U) => {
    const te = ae(P), de = ae(U), Ze = Math.min(te.col, de.col), _e = Math.max(te.col, de.col), Fe = Math.min(te.row, de.row), Oe = Math.max(te.row, de.row), st = _e - Ze + 1, Pe = Oe - Fe + 1, he = new Array(st * Pe).fill(-1);
    for (let pt = Fe; pt <= Oe; pt += 1)
      for (let Ue = Ze; Ue <= _e; Ue += 1) {
        const It = Math.floor(Ue / w), tn = Math.floor(pt / M), vt = Ue % w, Pn = pt % M, In = (tn * A + It) * v + Pn * w + vt;
        if (In < 0 || In >= f)
          continue;
        const nn = (pt - Fe) * st + (Ue - Ze);
        he[nn] = In;
      }
    c(he, st, Pe, P);
  }, ie = (P, U) => {
    if (Q.current = !0, ne.current = P, U != null && U.additive) {
      const te = /* @__PURE__ */ new Set([
        ...r.filter((de) => de >= 0),
        P
      ]);
      Me(Array.from(te), P);
      return;
    }
    if (U != null && U.subtractive) {
      const te = r.filter((Ze) => Ze >= 0 && Ze !== P), de = te.length > 0 ? te : [P];
      Me(de, P);
      return;
    }
    X(P, P);
  }, ge = (P) => {
    !Q.current || ne.current === null || X(ne.current, P);
  }, z = () => {
    Q.current = !1, ne.current = null;
  };
  T.useEffect(() => {
    const P = () => z();
    return window.addEventListener("pointerup", P), () => window.removeEventListener("pointerup", P);
  }, []), T.useEffect(() => {
    const P = (U) => {
      if (U.key !== "Delete" && U.key !== "Backspace")
        return;
      const te = U.target;
      if (te) {
        const de = te.tagName;
        if (de === "INPUT" || de === "TEXTAREA" || te.isContentEditable)
          return;
      }
      !d || F.length === 0 || (U.preventDefault(), K());
    };
    return window.addEventListener("keydown", P), () => window.removeEventListener("keydown", P);
  }, [d, K, F.length]);
  const Z = T.useCallback((P) => {
    const U = S.current;
    U && (U.scrollHeight <= U.clientHeight || (U.scrollTop += P.deltaY, P.preventDefault(), P.stopPropagation()));
  }, []);
  return /* @__PURE__ */ o.jsx("div", { className: "tilebar", children: /* @__PURE__ */ o.jsx(
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
      children: d ? f === 0 ? /* @__PURE__ */ o.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: oe }, (P, U) => {
        const te = G + U, de = te * v;
        return /* @__PURE__ */ o.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: v }, (Ze, _e) => {
          const Fe = de + _e, Oe = Fe < 0 || Fe >= f, st = Oe ? null : g[Fe], Pe = !Oe && D.has(Fe);
          return /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "tilebar__tile",
              "data-active": Fe === i,
              "data-selected": Pe,
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
              children: st ? /* @__PURE__ */ o.jsx(
                EM,
                {
                  pixels: st.pixels,
                  tileWidth: d.tileWidth,
                  tileHeight: d.tileHeight,
                  pixelSize: a,
                  palette: p
                }
              ) : null
            },
            Oe ? `placeholder-${Fe}` : (st == null ? void 0 : st.id) ?? `tile-${Fe}`
          );
        }) }, `cluster-${te}`);
      }) : /* @__PURE__ */ o.jsx("div", { className: "tilebar__empty", children: "No tiles yet. Use Tile Sampler to capture some." })
    }
  ) });
}, Ix = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, Ex = (e, t, n, s) => {
  if (t.length <= 1 || e.pixels.length === 0)
    return e;
  const l = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, e.width - 1),
    maxY: Math.max(0, e.height - 1)
  }, i = e.pixels.map((a) => ({ x: a.x, y: a.y })), r = Zi(i, l, t, n, s);
  return {
    ...e,
    pixels: e.pixels.map((a) => ({
      ...a,
      paletteIndex: r.get(`${a.x}:${a.y}`) ?? t[0] ?? a.paletteIndex
    }))
  };
}, Rx = (e) => {
  const t = Ix(e.fontSize), n = e.text;
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
  const a = 2, c = Math.max(1, r + a * 2), u = Math.max(1, i.length * t + a * 2);
  s.width = c, s.height = u, l.clearRect(0, 0, c, u), l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`, l.fillStyle = "#ffffff";
  for (let S = 0; S < i.length; S += 1)
    l.fillText(i[S] ?? "", a, a + S * t);
  const p = l.getImageData(0, 0, c, u).data, d = e.alphaThreshold ?? 128;
  let f = Number.POSITIVE_INFINITY, g = Number.POSITIVE_INFINITY, w = Number.NEGATIVE_INFINITY, M = Number.NEGATIVE_INFINITY;
  for (let S = 0; S < u; S += 1)
    for (let b = 0; b < c; b += 1)
      (p[(S * c + b) * 4 + 3] ?? 0) < d || (f = Math.min(f, b), g = Math.min(g, S), w = Math.max(w, b), M = Math.max(M, S));
  if (!Number.isFinite(f) || !Number.isFinite(g))
    return null;
  const v = w - f + 1, m = M - g + 1, x = [];
  for (let S = g; S <= M; S += 1)
    for (let b = f; b <= w; b += 1)
      (p[(S * c + b) * 4 + 3] ?? 0) < d || x.push({
        x: b - f,
        y: S - g,
        paletteIndex: e.paletteIndex
      });
  return { pixels: x, width: v, height: m };
}, AM = (e) => {
  const t = fa(), { gradientDirection: n, gradientDither: s } = Mt.getState(), l = Rx({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const i = t.length > 1 ? Ex(l, t, n, s) : l;
  rt.getState().setBuffer({
    pixels: i.pixels,
    origin: { x: 0, y: 0 },
    width: i.width,
    height: i.height
  }), Nt.getState().setActiveTool("stamp");
}, LM = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], DM = [8, 16, 24, 32], BM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, YM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const i = re((S) => S.colors), r = re((S) => S.selectedIndices), a = re((S) => S.getActiveIndex()), c = Mt((S) => S.gradientDirection), u = Mt((S) => S.gradientDither), [h, p] = Te.useState(e), [d, f] = Te.useState(t), [g, w] = Te.useState(Ix(n)), M = T.useRef(null), v = T.useRef(null), m = T.useRef(null);
  T.useEffect(() => {
    var S, b, _;
    (S = M.current) == null || S.focus(), (_ = (b = M.current) == null ? void 0 : b.select) == null || _.call(b);
  }, []);
  const x = T.useMemo(() => {
    try {
      const S = Rx({
        text: h,
        fontFamily: d,
        fontSize: g,
        paletteIndex: a
      });
      if (!S)
        return null;
      const b = /* @__PURE__ */ new Set(), _ = [];
      for (const k of r)
        k < 0 || k >= i.length || b.has(k) || (b.add(k), _.push(k));
      return _.length <= 1 ? S : Ex(S, _, c, u);
    } catch {
      return null;
    }
  }, [
    a,
    d,
    g,
    c,
    u,
    i.length,
    r,
    h
  ]);
  return T.useEffect(() => {
    const S = v.current, b = m.current;
    if (!S || !b)
      return;
    const _ = () => {
      const A = BM(b, S.clientWidth, S.clientHeight);
      if (!A)
        return;
      const L = S.clientWidth, Y = S.clientHeight, N = i[0] ?? "#000000", O = yt(N) ?? { r: 0, g: 0, b: 0 }, G = ha(O, da(O)), oe = Ed(hs(O, G, 0.1)), Q = un(G, 0.12);
      if (A.clearRect(0, 0, L, Y), A.fillStyle = N, A.fillRect(0, 0, L, Y), !x || x.pixels.length === 0)
        return;
      const ne = 12, D = Math.max(1, L - ne * 2), F = Math.max(1, Y - ne * 2), K = Math.max(
        1,
        Math.floor(
          Math.min(D / x.width, F / x.height)
        )
      ), le = x.width * K, ae = x.height * K, Me = Math.floor((L - le) / 2), X = Math.floor((Y - ae) / 2);
      A.fillStyle = oe, A.fillRect(Me, X, le, ae), A.strokeStyle = Q, A.strokeRect(Me, X, le, ae);
      const ie = /* @__PURE__ */ new Map();
      for (const ge of x.pixels) {
        const z = ie.get(ge.paletteIndex);
        z ? z.push({ x: ge.x, y: ge.y }) : ie.set(ge.paletteIndex, [{ x: ge.x, y: ge.y }]);
      }
      for (const [ge, z] of ie) {
        A.fillStyle = i[ge] ?? i[a] ?? "#ffffff";
        for (const Z of z)
          A.fillRect(
            Me + Z.x * K,
            X + Z.y * K,
            K,
            K
          );
      }
    };
    _();
    const k = re.subscribe(_), j = new ResizeObserver(_);
    return j.observe(S), () => {
      k(), j.disconnect();
    };
  }, [a, i, x]), /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (S) => {
        S.key === "Escape" && (S.preventDefault(), s());
      },
      children: [
        /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: s }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--text", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ o.jsx("h2", { children: "Text" }),
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: s, children: "Close" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Font" }),
              /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsx(
                "select",
                {
                  value: d,
                  onChange: (S) => f(S.target.value),
                  children: LM.map((S) => /* @__PURE__ */ o.jsx("option", { value: S.value, children: S.label }, S.value))
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Size" }),
              /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsx(
                "select",
                {
                  value: g,
                  onChange: (S) => w(Number(S.target.value)),
                  children: DM.map((S) => /* @__PURE__ */ o.jsxs("option", { value: S, children: [
                    S,
                    "px"
                  ] }, S))
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Text" }),
              /* @__PURE__ */ o.jsx("span", { className: "text-tool__text-field", children: /* @__PURE__ */ o.jsx(
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
                      l({ text: h, fontFamily: d, fontSize: g });
                    }
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsx("div", { className: "text-tool__preview", ref: v, children: /* @__PURE__ */ o.jsx("canvas", { ref: m }) }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: s, children: "Cancel" }),
                /* @__PURE__ */ o.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => l({ text: h, fontFamily: d, fontSize: g }),
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
}, XM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = T.useState(!0), [l, i] = T.useState(!1), [r, a] = T.useState(!1), [c, u] = T.useState(!1), [h, p] = T.useState("gpt-image-1"), [d, f] = T.useState("openai"), [g, w] = T.useState("http://localhost:8080/v1"), [M, v] = T.useState("sdxl"), [m, x] = T.useState(!1), [S, b] = T.useState(!1), [_, k] = T.useState(!1), [j, A] = T.useState(!1), [L, Y] = T.useState(""), [N, O] = T.useState(!1), [G, oe] = T.useState(!1), [Q, ne] = T.useState(""), D = T.useRef(null);
  T.useEffect(() => {
    let z = !1;
    return (async () => {
      try {
        const P = await window.optionsApi.getOpenAiKeyInfo(), U = await window.optionsApi.getOpenAiImageModel(), te = await window.optionsApi.getAiImageProvider(), de = await window.optionsApi.getLocalAiConfig(), Ze = await window.optionsApi.getLocalAiKeyInfo(), _e = await window.optionsApi.getAdvancedMode();
        if (z)
          return;
        i(P.hasKey), a(P.encryptionAvailable), u(P.storedEncrypted), p(U), f(te), w(de.baseUrl), v(de.model), x(Ze.hasKey), b(Ze.encryptionAvailable), k(Ze.storedEncrypted), O(_e);
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
      i(Z.hasKey), a(Z.encryptionAvailable), u(Z.storedEncrypted), ne(""), oe(!1);
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
        i(z.hasKey), a(z.encryptionAvailable), u(z.storedEncrypted), ne(""), oe(!1);
      } catch (z) {
        console.error("Failed to clear OpenAI API key:", z), window.alert("Unable to clear API key.");
      } finally {
        s(!1);
      }
    }
  }, le = async (z) => {
    p(z);
    try {
      await window.optionsApi.setOpenAiImageModel(z);
    } catch (Z) {
      console.error("Failed to set image model:", Z), window.alert("Unable to update image model.");
      const P = await window.optionsApi.getOpenAiImageModel().catch(() => "gpt-image-1");
      p(P);
    }
  }, ae = async (z) => {
    f(z);
    try {
      await window.optionsApi.setAiImageProvider(z);
    } catch (Z) {
      console.error("Failed to set image provider:", Z), window.alert("Unable to update image provider.");
      const P = await window.optionsApi.getAiImageProvider().catch(() => "openai");
      f(P);
    }
  }, Me = async () => {
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
      const P = await window.optionsApi.getAdvancedMode().catch(() => !0);
      O(P), t(P);
    }
  }, ge = l ? c ? "Saved (encrypted)" : r ? "Saved" : "Saved (not encrypted)" : "Not set";
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (z) => {
        z.key === "Escape" && (z.preventDefault(), e());
      },
      children: [
        /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: e }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--options", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ o.jsx("h2", { children: "Options" }),
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: e, children: "Close" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Advanced Mode" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsxs("label", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx(
                    "input",
                    {
                      type: "checkbox",
                      checked: N,
                      onChange: (z) => void ie(z.currentTarget.checked),
                      disabled: n
                    }
                  ),
                  "Show tile tools"
                ] }),
                /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.7 }, children: "Hide or reveal tiling tools in the toolbar." })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "AI Provider" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsxs(
                  "select",
                  {
                    value: d,
                    onChange: (z) => void ae(z.target.value),
                    disabled: n,
                    children: [
                      /* @__PURE__ */ o.jsx("option", { value: "openai", children: "OpenAI" }),
                      /* @__PURE__ */ o.jsx("option", { value: "localai", children: "LocalAI" })
                    ]
                  }
                ),
                /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.7 }, children: "Used by the AI Prompt tool." })
              ] })
            ] }),
            d === "openai" && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "OpenAI Image Model" }),
              /* @__PURE__ */ o.jsx("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ o.jsxs(
                "select",
                {
                  value: h,
                  onChange: (z) => void le(z.target.value),
                  disabled: n,
                  children: [
                    /* @__PURE__ */ o.jsx("option", { value: "gpt-image-1-mini", children: "gpt-image-1-mini (faster/cheaper)" }),
                    /* @__PURE__ */ o.jsx("option", { value: "gpt-image-1", children: "gpt-image-1 (higher quality)" })
                  ]
                }
              ) })
            ] }),
            d === "localai" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI Base URL" }),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ o.jsx(
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
                  /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.7 }, children: "e.g. http://localhost:8080/v1" })
                ] })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI Model" }),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ o.jsx(
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
                  /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.7 }, children: "Must match your LocalAI image model name." })
                ] })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI API Key" }),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ o.jsx(
                    "input",
                    {
                      type: j ? "text" : "password",
                      value: L,
                      placeholder: m ? "•••••••••••••••• (saved)" : "(optional)",
                      onChange: (z) => Y(z.target.value),
                      disabled: n,
                      style: { width: 320 }
                    }
                  ),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => A((z) => !z),
                      disabled: n,
                      children: j ? "Hide" : "Show"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI Key Status" }),
                /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.9 }, children: m ? _ ? "Saved (encrypted)" : S ? "Saved" : "Saved (not encrypted)" : "Not set (optional)" })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", {}),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => void Me(), disabled: n, children: "Save Key" }),
                  /* @__PURE__ */ o.jsx(
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
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "OpenAI API Key" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    ref: D,
                    type: G ? "text" : "password",
                    value: Q,
                    placeholder: l ? "•••••••••••••••• (saved)" : "sk-...",
                    onChange: (z) => ne(z.target.value),
                    disabled: n,
                    style: { width: 320 }
                  }
                ),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => oe((z) => !z), disabled: n, children: G ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "OpenAI Key Status" }),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.9 }, children: ge })
            ] }),
            !r && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Encryption is unavailable on this system; the key may be stored in plain text." })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: F, disabled: n, children: "Save Key" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: K, disabled: n || !l, children: "Clear" })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.75 }, children: "Note: LocalAI must expose OpenAI-compatible image endpoints at the Base URL." })
            ] })
          ] })
        ] })
      ]
    }
  );
}, FM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, OM = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((h) => yt(h) ?? { r: 0, g: 0, b: 0 }), i = l.length > 1 ? Array.from({ length: l.length - 1 }, (h, p) => p + 1) : [0], r = [], { width: a, height: c, data: u } = e;
  for (let h = 0; h < c; h += 1)
    for (let p = 0; p < a; p += 1) {
      const d = (h * a + p) * 4, f = u[d] ?? 0, g = u[d + 1] ?? 0, w = u[d + 2] ?? 0;
      if ((u[d + 3] ?? 0) < s)
        continue;
      const v = { r: f, g, b: w };
      let m = i[0] ?? 0, x = Number.POSITIVE_INFINITY;
      for (const S of i) {
        const b = FM(v, l[S] ?? l[0]);
        b < x && (x = b, m = S);
      }
      m !== 0 && r.push({ x: p, y: h, paletteIndex: m });
    }
  return { pixels: r };
}, Ld = (e) => {
  const t = re.getState().colors, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = new Uint8ClampedArray(n * s * 4);
  for (const i of e.pixels) {
    const r = t[i.paletteIndex];
    if (!r)
      continue;
    const a = yt(r);
    if (!a)
      continue;
    const c = i.x - e.minX, h = ((i.y - e.minY) * n + c) * 4;
    l[h] = a.r, l[h + 1] = a.g, l[h + 2] = a.b, l[h + 3] = 255;
  }
  return { data: l, width: n, height: s };
}, zM = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const i = l.x - e.minX, r = l.y - e.minY;
    s[r * t + i] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, HM = async () => {
  const e = Ns();
  if (!e)
    return null;
  const { data: t, width: n, height: s } = Ld(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return null;
  const r = new ImageData(t, n, s);
  i.putImageData(r, 0, 0);
  const a = await new Promise(
    (h) => l.toBlob((p) => h(p), "image/png")
  );
  if (!a)
    return null;
  const c = new Uint8Array(await a.arrayBuffer());
  let u = "";
  for (const h of c)
    u += String.fromCharCode(h);
  return btoa(u);
}, os = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), WM = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = re((N) => N.colors), [l, i] = T.useState(e), [r, a] = T.useState(16), [c, u] = T.useState(16), [h, p] = T.useState(1), [d, f] = T.useState(1), [g, w] = T.useState(!1), [M, v] = T.useState(!1), [m, x] = T.useState(""), [S, b] = T.useState(0), [_, k] = T.useState(null), j = T.useRef(null), A = T.useMemo(() => os(r, 1, 512) * os(h, 1, 64), [
    r,
    h
  ]), L = T.useMemo(() => os(c, 1, 512) * os(d, 1, 64), [
    c,
    d
  ]);
  T.useEffect(() => {
    window.setTimeout(() => {
      var N;
      return (N = j.current) == null ? void 0 : N.focus();
    }, 0);
  }, []), T.useEffect(() => {
    if (!M) {
      b(0);
      return;
    }
    const N = Date.now(), O = window.setInterval(() => {
      b(Math.floor((Date.now() - N) / 1e3));
    }, 250);
    return () => window.clearInterval(O);
  }, [M]);
  const Y = async () => {
    var O;
    k(null);
    const N = l.trim();
    if (!N) {
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
      const G = g ? await HM() : null;
      x("Waiting for OpenAI…");
      const oe = await window.aiApi.generateSprite({
        prompt: N,
        palette: s,
        cellWidth: os(r, 1, 512),
        cellHeight: os(c, 1, 512),
        columns: os(h, 1, 64),
        rows: os(d, 1, 64),
        referencePngBase64: G
      });
      x("Processing image…");
      const Q = new Image(), ne = `data:image/png;base64,${oe.pngBase64}`;
      await new Promise((ae, Me) => {
        Q.onload = () => ae(), Q.onerror = () => Me(new Error("Failed to load generated image.")), Q.src = ne;
      });
      const D = document.createElement("canvas");
      D.width = A, D.height = L;
      const F = D.getContext("2d");
      if (!F)
        throw new Error("Canvas unavailable.");
      F.imageSmoothingEnabled = !1, F.clearRect(0, 0, A, L), F.drawImage(Q, 0, 0, A, L), x("Quantizing to palette…");
      const K = F.getImageData(0, 0, A, L), le = OM(K, s, { alphaThreshold: 10 });
      x("Copying to Stamp…"), rt.getState().setBuffer({
        pixels: le.pixels,
        origin: { x: 0, y: 0 },
        width: A,
        height: L
      }), Nt.getState().setActiveTool("stamp"), n({
        prompt: N,
        cellWidth: r,
        cellHeight: c,
        columns: h,
        rows: d,
        useSelectionAsReference: g
      });
    } catch (G) {
      console.error("AI generation failed:", G), k(G instanceof Error ? G.message : "AI generation failed.");
    } finally {
      v(!1), x("");
    }
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (N) => {
        N.key === "Escape" && (N.preventDefault(), t()), (N.ctrlKey || N.metaKey) && N.key === "Enter" && (N.preventDefault(), Y());
      },
      children: [
        /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: t }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--ai", role: "dialog", "aria-modal": "true", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
            /* @__PURE__ */ o.jsx("h2", { children: "AI Prompt" }),
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: t, disabled: M, children: "Close" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Prompt" }),
              /* @__PURE__ */ o.jsxs("span", { style: { width: 420 }, children: [
                /* @__PURE__ */ o.jsx(
                  "textarea",
                  {
                    ref: j,
                    value: l,
                    onChange: (N) => i(N.target.value),
                    rows: 5,
                    style: { width: "100%", resize: "vertical" },
                    placeholder: "e.g. give me a hero standing idle in 4 directions, 16x32 pixels tall for each cell",
                    disabled: M
                  }
                ),
                /* @__PURE__ */ o.jsx("div", { style: { opacity: 0.75, marginTop: 6 }, children: "Ctrl/Cmd+Enter to generate. Uses current palette." })
              ] })
            ] }),
            M && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Status" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "grid", gap: 8, width: 420 }, children: [
                /* @__PURE__ */ o.jsxs("div", { style: { display: "flex", gap: 10, alignItems: "center" }, children: [
                  /* @__PURE__ */ o.jsx("span", { className: "spinner", "aria-hidden": "true" }),
                  /* @__PURE__ */ o.jsxs("span", { style: { opacity: 0.9 }, children: [
                    m || "Generating…",
                    S > 0 ? ` (${S}s)` : ""
                  ] })
                ] }),
                /* @__PURE__ */ o.jsx("div", { className: "progress-bar", "aria-hidden": "true", children: /* @__PURE__ */ o.jsx("div", { className: "progress-bar__indeterminate" }) })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Cell" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: r,
                    onChange: (N) => a(Number(N.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ o.jsx("span", { children: "×" }),
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 512,
                    value: c,
                    onChange: (N) => u(Number(N.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ o.jsx("span", { children: "px" })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Grid" }),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: h,
                    onChange: (N) => p(Number(N.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ o.jsx("span", { children: "cols" }),
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    min: 1,
                    max: 64,
                    value: d,
                    onChange: (N) => f(Number(N.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ o.jsx("span", { children: "rows" }),
                /* @__PURE__ */ o.jsxs("span", { style: { opacity: 0.75 }, children: [
                  "(",
                  A,
                  "×",
                  L,
                  ")"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Reference" }),
              /* @__PURE__ */ o.jsxs("label", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: g,
                    onChange: (N) => w(N.target.checked),
                    disabled: M
                  }
                ),
                "Use current selection as reference image (optional)"
              ] })
            ] }),
            _ && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsx("span", { style: { color: "#ff9caa" }, children: _ })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => void Y(), disabled: M, children: M ? "Generating…" : "Generate" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: t, disabled: M, children: "Cancel" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, Se = {
  undo: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M9 7H5v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M5 11c2.2-3.4 6.1-5.5 10.2-5.5 4.8 0 8.8 3 9.8 7.3" }),
    /* @__PURE__ */ o.jsx("path", { d: "M5 11l4-4" })
  ] }),
  redo: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M15 7h4v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M19 11c-2.2-3.4-6.1-5.5-10.2-5.5-4.8 0-8.8 3-9.8 7.3" }),
    /* @__PURE__ */ o.jsx("path", { d: "M19 11l-4-4" })
  ] }),
  cut: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("circle", { cx: "6", cy: "6", r: "2.2" }),
    /* @__PURE__ */ o.jsx("circle", { cx: "6", cy: "18", r: "2.2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 8l12 8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 16l6-4" })
  ] }),
  copy: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "6", y: "6", width: "10", height: "10", rx: "1.6" }),
    /* @__PURE__ */ o.jsx("rect", { x: "9", y: "9", width: "10", height: "10", rx: "1.6" })
  ] }),
  "copy-deep": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "7", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ o.jsx("rect", { x: "10", y: "9", width: "9", height: "9", rx: "1.4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M17 5v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M15 7h4" })
  ] }),
  paste: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "6", y: "7", width: "12", height: "13", rx: "1.6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 4h6v3H9z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 11h6" })
  ] }),
  pen: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M4 20l4-1 12-12-3-3L5 16l-1 4z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M13.5 5.5l3 3" }),
    /* @__PURE__ */ o.jsx("path", { d: "M7 17l2 2" })
  ] }),
  spray: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M9 10h7l2 2v3H9z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M7 12h2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18 12h1" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12.5 6v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9.5 16.2l-1 1" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 17.2l-.6 1.2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M14.6 16.6l1 1" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 18l.8.8" })
  ] }),
  line: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M6 18L18 6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 18h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18 6h0" })
  ] }),
  rectangle: /* @__PURE__ */ o.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ o.jsx("rect", { x: "5", y: "6", width: "14", height: "12", rx: "1.5" }) }),
  oval: /* @__PURE__ */ o.jsx("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ o.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5" }) }),
  "fill-bucket": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M6.5 11.5l8-8 3 3-8 8H6.5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6.8 15.5h6.4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18 14.5c0 1-1 2-2 2s-2-1-2-2 2-3 2-3 2 2 2 3z" })
  ] }),
  text: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M6 6h12" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 6v12" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 18h6" })
  ] }),
  ai: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M18 12l.9 2.8L22 16l-3.1 1.2L18 20l-.9-2.8L14 16l3.1-1.2L18 12z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M4 13l.8 2.4L7.5 16l-2.7 1L4 19.4l-.8-2.4L0.5 16l2.7-.6L4 13z" })
  ] }),
  "reference-handle": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 8v8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M7.5 7.5h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16.5 7.5h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M7.5 16.5h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16.5 16.5h0" })
  ] }),
  eyedropper: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M14.5 5.5l4 4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 19l8.2-8.2a2.2 2.2 0 000-3.1l-.9-.9a2.2 2.2 0 00-3.1 0L2 15.9V19h4z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9.5 9.5l5 5" })
  ] }),
  stamp: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 15v-4a3 3 0 016 0v4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 15h8" })
  ] }),
  "selection-rect": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 16h0" })
  ] }),
  "selection-oval": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("ellipse", { cx: "12", cy: "12", rx: "7", ry: "5.5", strokeDasharray: "2 2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 9h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M15 15h0" })
  ] }),
  "magic-wand": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M4 20l9-9" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12.5 12.5l7.5 7.5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M17 4l.6 1.7L19 6l-1.4.3L17 8l-.6-1.7L15 6l1.4-.3L17 4z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M14 8l.4 1.1L15.5 9l-1.1.2L14 10.3l-.4-1.1L12.5 9l1.1-.2L14 8z" })
  ] }),
  "selection-lasso": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M12 5c-4.5 0-8 2.1-8 4.8S7.5 14.6 12 14.6 20 12.5 20 9.8 16.5 5 12 5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8.2 14.6l-2 4.9" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6.2 19.5l2.6-1.2" })
  ] }),
  "texture-roll": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 12h6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 9v6" }),
    /* @__PURE__ */ o.jsx("path", { d: "M3 12h2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M19 12h2" })
  ] }),
  "tile-sampler": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M5 13h6v6H5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M13 13h6v6h-6z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M14.2 14.2l4.8 4.8" })
  ] }),
  "tile-pen": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M5 5h8v8H5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 12l8-8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M14.2 6.2l3.6 3.6" })
  ] }),
  "tile-stamp": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M5 5h6v6H5z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M13 5h6v6h-6z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M7 15h10v4H7z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9 15v-2a3 3 0 016 0v2" })
  ] }),
  "tile-rectangle": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 8h8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 12h8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 16h8" })
  ] }),
  "tile-9slice": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "1.5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M10 6v12" }),
    /* @__PURE__ */ o.jsx("path", { d: "M14 6v12" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 10h12" }),
    /* @__PURE__ */ o.jsx("path", { d: "M6 14h12" })
  ] }),
  "tile-export": /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "6", y: "7", width: "12", height: "11", rx: "1.5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 4v8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M9.5 6.5L12 4l2.5 2.5" })
  ] }),
  export: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M12 4v10" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 10l4 4 4-4" }),
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "18", width: "14", height: "2", rx: "1" })
  ] }),
  clear: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 8l8 8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 8l-8 8" })
  ] }),
  layers: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M12 4l8 4-8 4-8-4 8-4z" }),
    /* @__PURE__ */ o.jsx("path", { d: "M4 12l8 4 8-4" }),
    /* @__PURE__ */ o.jsx("path", { d: "M4 16l8 4 8-4" })
  ] }),
  overlays: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "5", y: "5", width: "14", height: "14", rx: "1.8" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 5v14" }),
    /* @__PURE__ */ o.jsx("path", { d: "M5 12h14" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 8h0" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 16h0" })
  ] }),
  swatch: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("rect", { x: "4.5", y: "6.5", width: "15", height: "11", rx: "2" }),
    /* @__PURE__ */ o.jsx("path", { d: "M8 6.5v11" }),
    /* @__PURE__ */ o.jsx("path", { d: "M12 6.5v11" }),
    /* @__PURE__ */ o.jsx("path", { d: "M16 6.5v11" })
  ] }),
  fullscreen: /* @__PURE__ */ o.jsxs("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ o.jsx("path", { d: "M4 9V4h5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M20 9V4h-5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M4 15v5h5" }),
    /* @__PURE__ */ o.jsx("path", { d: "M20 15v5h-5" })
  ] })
}, UM = (e, t) => {
  const n = ee.getState(), s = n.activeLayerId, l = new Set(
    n.layers.filter((i) => i.id === s || i.visible).map((i) => i.id)
  );
  for (let i = n.layers.length - 1; i >= 0; i -= 1) {
    const r = n.layers[i];
    if (!l.has(r.id))
      continue;
    const a = r.store.getPixel(e, t);
    if (a !== 0)
      return a;
  }
  return 0;
}, Ax = (e = {}) => {
  const t = ye.getState();
  if (t.selectedCount === 0)
    return null;
  const n = ee.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: h, col: p, block: d } of u) {
    const f = p * B, g = h * B;
    for (let w = 0; w < B; w += 1)
      for (let M = 0; M < B; M += 1) {
        if (d[w * B + M] !== 1)
          continue;
        const v = f + M, m = g + w, x = c ? UM(v, m) : n.getPixel(v, m);
        s.push({ x: v, y: m, paletteIndex: x }), l = Math.min(l, v), i = Math.max(i, v), r = Math.min(r, m), a = Math.max(a, m);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: i, minY: r, maxY: a };
}, Lx = (e) => {
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
}, Uo = (e = {}) => {
  const t = Ax(e);
  t && (Lx(t), ye.getState().clear(), Nt.getState().setActiveTool("stamp"));
}, Dx = () => {
  const e = Ax();
  if (!e)
    return;
  Lx(e);
  const t = ee.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Ae.getState().pushBatch({ changes: n })), ye.getState().clear(), Nt.getState().setActiveTool("stamp");
}, $M = () => {
  const e = ye.getState();
  if (e.selectedCount === 0)
    return;
  const t = Ae.getState();
  if (t.locked)
    return;
  const n = ee.getState(), s = n.activeLayerId, l = [], i = [], r = e.store.getBlocks();
  for (const { row: a, col: c, block: u } of r) {
    const h = c * B, p = a * B;
    for (let d = 0; d < B; d += 1)
      for (let f = 0; f < B; f += 1) {
        if (u[d * B + f] !== 1)
          continue;
        const g = h + f, w = p + d, M = n.getPixelInLayer(s, g, w);
        M !== 0 && (l.push({ x: g, y: w, prev: M, next: 0 }), i.push({ x: g, y: w, paletteIndex: 0 }));
      }
  }
  i.length !== 0 && (n.setPixelsInLayer(s, i), t.pushBatch({ layerId: s, changes: l }));
}, Bx = () => {
  const e = $.getState();
  return e.tileSets.find((t) => t.id === e.activeTileSetId) ?? null;
}, VM = (e) => {
  const t = $.getState(), n = t.tileMaps.find(
    (s) => s.id === t.activeTileMapId && s.tileSetId === e
  );
  return n || (t.tileMaps.find((s) => s.tileSetId === e) ?? null);
}, Yx = (e) => {
  const t = VM(e.id);
  if (!t)
    return null;
  const n = ye.getState();
  if (n.selectedCount <= 0)
    return null;
  const s = /* @__PURE__ */ new Set();
  let l = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = n.store.getBlocks();
  for (const { row: d, col: f, block: g } of c) {
    const w = f * B, M = d * B;
    for (let v = 0; v < B; v += 1)
      for (let m = 0; m < B; m += 1) {
        if (g[v * B + m] !== 1)
          continue;
        const x = w + m, S = M + v, b = Math.floor((x - t.originX) / e.tileWidth), _ = Math.floor((S - t.originY) / e.tileHeight);
        if (b < 0 || _ < 0 || b >= t.columns || _ >= t.rows)
          continue;
        const k = `${b}:${_}`;
        s.has(k) || (s.add(k), l = Math.min(l, b), i = Math.min(i, _), r = Math.max(r, b), a = Math.max(a, _));
      }
  }
  if (s.size === 0)
    return null;
  const u = r - l + 1, h = a - i + 1, p = new Array(u * h).fill(-1);
  for (const d of s) {
    const [f, g] = d.split(":"), w = Number(f), M = Number(g), v = (M - i) * u + (w - l);
    p[v] = t.tiles[M * t.columns + w] ?? -1;
  }
  return {
    map: t,
    tiles: p,
    cols: u,
    rows: h,
    bounds: { minCol: l, minRow: i, maxCol: r, maxRow: a }
  };
}, Xx = (e) => {
  const t = $.getState(), n = Math.max(1, t.selectedTileCols), s = Math.max(1, t.selectedTileRows), l = n * s, i = new Array(l).fill(-1);
  for (let r = 0; r < l; r += 1)
    i[r] = t.selectedTileIndices[r] ?? -1;
  return i.some((r) => r >= 0) ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: i,
    cols: n,
    rows: s,
    source: "palette"
  }), ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0) : !1;
}, Fx = () => {
  const e = Bx();
  if (!e)
    return !1;
  const t = Yx(e);
  return t ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: t.tiles,
    cols: t.cols,
    rows: t.rows,
    source: "map"
  }), ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0) : Xx(e);
}, Ox = () => {
  const e = Bx();
  if (!e)
    return !1;
  const t = Yx(e);
  if (t) {
    rt.getState().setTileBuffer({
      tileSetId: e.id,
      tiles: t.tiles,
      cols: t.cols,
      rows: t.rows,
      source: "map"
    });
    const r = [];
    for (let a = t.bounds.minRow; a <= t.bounds.maxRow; a += 1)
      for (let c = t.bounds.minCol; c <= t.bounds.maxCol; c += 1) {
        const u = (a - t.bounds.minRow) * t.cols + (c - t.bounds.minCol);
        (t.tiles[u] ?? -1) !== -1 && r.push({ index: a * t.map.columns + c, tile: -1 });
      }
    if (r.length > 0) {
      const a = Ot();
      $.getState().setTileMapTiles(t.map.id, r);
      const c = Ot();
      qs(a, c);
    }
    return ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0;
  }
  if (!Xx(e))
    return !1;
  const s = Array.from(
    new Set($.getState().selectedTileIndices.filter((r) => r >= 0))
  ).sort((r, a) => r - a);
  if (s.length === 0)
    return !1;
  const l = Ot();
  $.getState().deleteTilesFromSet(e.id, s);
  const i = Ot();
  return qs(l, i), !0;
}, zx = async () => {
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  const { data: t, width: n, height: s } = Ld(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const i = l.getContext("2d");
  if (!i)
    return window.alert("Unable to export selection."), null;
  const r = new ImageData(t, n, s);
  i.putImageData(r, 0, 0);
  const a = await new Promise(
    (h) => l.toBlob((p) => h(p), "image/png")
  );
  if (!a)
    return window.alert("Unable to export selection."), null;
  const c = new Uint8Array(await a.arrayBuffer()), u = `pixel-splash-selection-${n}x${s}.png`;
  return window.projectApi.exportPng(c, u);
}, Dp = (e, t, n) => Math.min(n, Math.max(t, e)), KM = (e, t, n, s) => {
  const [l, i] = Te.useState({ x: t, y: n });
  return Te.useLayoutEffect(() => {
    if (!e || !s.current) {
      i({ x: t, y: n });
      return;
    }
    const r = s.current.getBoundingClientRect(), a = 8, c = Math.max(a, window.innerWidth - r.width - a), u = Math.max(a, window.innerHeight - r.height - a);
    i({
      x: Dp(t, a, c),
      y: Dp(n, a, u)
    });
  }, [e, s, t, n]), l;
}, fl = ({
  checked: e,
  label: t,
  onChange: n,
  title: s
}) => /* @__PURE__ */ o.jsxs(
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
      /* @__PURE__ */ o.jsx("span", { className: "bottom-dock__menu-toggle-indicator", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx("span", { children: t })
    ]
  }
);
class GM extends Te.Component {
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
    return this.state.hasError ? /* @__PURE__ */ o.jsxs("div", { className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
      /* @__PURE__ */ o.jsx("div", { style: { opacity: 0.9 }, children: "Toolbar disabled due to an error." }),
      /* @__PURE__ */ o.jsx("div", { style: { flex: 1 } }),
      /* @__PURE__ */ o.jsx("button", { type: "button", className: "topbar__mode-button", onClick: () => window.location.reload(), children: "Reload" })
    ] }) : this.props.children;
  }
}
const QM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: r,
  showAiTool: a,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: h,
  toolOptions: p
}) => {
  const d = Te.useRef(null), f = Te.useRef(null), g = Ae((P) => P.locked), w = Ae((P) => P.undoStack.length > 0), M = Ae((P) => P.redoStack.length > 0), v = Ae((P) => P.undo), m = Ae((P) => P.redo), x = rt((P) => P), S = x.pixels.length > 0 && x.width > 0 && x.height > 0, b = x.tileBuffer !== null && x.tileBuffer.cols > 0 && x.tileBuffer.rows > 0 && x.tileBuffer.tiles.length > 0, _ = s === "tile", k = $(
    (P) => new Set(P.selectedTileIndices.filter((U) => U >= 0)).size
  ), j = t > 0 || k > 0, A = () => {
    if (_) {
      Fx();
      return;
    }
    Uo();
  }, L = () => {
    if (_) {
      Ox();
      return;
    }
    Dx();
  }, Y = () => {
    if (_) {
      b && n("tile-stamp");
      return;
    }
    n("stamp");
  }, N = Re((P) => P.showReferenceLayer), O = Re((P) => P.showPixelLayer), G = Re((P) => P.showTileLayer), oe = Re((P) => P.showPixelGrid), Q = Re((P) => P.showTileGrid), ne = Re((P) => P.showAxes), D = Re((P) => P.toggleReferenceLayer), F = Re((P) => P.togglePixelLayer), K = Re((P) => P.toggleTileLayer), le = Re((P) => P.togglePixelGrid), ae = Re((P) => P.toggleTileGrid), Me = Re((P) => P.toggleAxes), [X, ie] = Te.useState({
    open: !1,
    kind: "layers",
    x: 0,
    y: 0
  }), ge = KM(X.open, X.x, X.y, f), z = Te.useCallback(() => {
    ie((P) => P.open ? { ...P, open: !1 } : P);
  }, []), Z = (P) => (U) => {
    if (U.preventDefault(), X.open && X.kind === P) {
      z();
      return;
    }
    ie({ open: !0, kind: P, x: U.clientX, y: U.clientY });
  };
  return Te.useEffect(() => {
    if (!X.open)
      return;
    const P = (te) => {
      f.current && f.current.contains(te.target) || z();
    }, U = (te) => {
      te.key === "Escape" && z();
    };
    return window.addEventListener("mousedown", P), window.addEventListener("keydown", U), () => {
      window.removeEventListener("mousedown", P), window.removeEventListener("keydown", U);
    };
  }, [z, X.open]), Te.useLayoutEffect(() => {
    const P = d.current;
    if (!P)
      return;
    const U = () => {
      const de = P.offsetHeight;
      de > 0 && document.documentElement.style.setProperty("--topbar-height", `${de}px`);
    };
    if (U(), typeof ResizeObserver > "u") {
      const de = () => U();
      return window.addEventListener("resize", de), () => {
        window.removeEventListener("resize", de);
      };
    }
    const te = new ResizeObserver(U);
    return te.observe(P), () => te.disconnect();
  }, []), /* @__PURE__ */ o.jsxs("div", { ref: d, className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "topbar__tools", role: "presentation", children: [
      i && /* @__PURE__ */ o.jsxs("div", { className: "topbar__workspace-toggle", role: "group", "aria-label": "Workspace mode", children: [
        /* @__PURE__ */ o.jsx(
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
        /* @__PURE__ */ o.jsx(
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
      i && /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: v,
          title: "Undo (Ctrl/Cmd+Z)",
          "aria-label": "Undo",
          disabled: g || !w,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.undo })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: m,
          title: "Redo (Ctrl/Cmd+Shift+Z)",
          "aria-label": "Redo",
          disabled: g || !M,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.redo })
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: A,
          title: _ ? "Copy Tiles" : "Copy Selection (Active Layer)",
          "aria-label": "Copy Selection",
          disabled: _ ? !j : t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.copy })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Uo({ deep: !0 }),
          title: "Deep Copy Selection (Merged)",
          "aria-label": "Deep Copy Selection",
          disabled: _ || t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["copy-deep"] })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: L,
          title: _ ? "Cut Tiles" : "Cut Selection",
          "aria-label": "Cut Selection",
          disabled: _ ? !j : t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.cut })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: Y,
          title: _ ? "Paste Tiles (Tile Stamp)" : "Paste (Stamp Tool)",
          "aria-label": "Paste",
          disabled: _ ? !b : !S,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.paste })
        }
      ),
      c !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            zx();
          },
          title: "Export PNG…",
          "aria-label": "Export PNG",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.export })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => ye.getState().clear(),
          title: "Clear Selection",
          "aria-label": "Clear Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.clear })
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      !_ && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "pen",
            onClick: () => n("pen"),
            title: "Pen (P)",
            "aria-label": "Pen",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.pen })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "spray",
            onClick: () => n("spray"),
            title: "Spray (S)",
            "aria-label": "Spray",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.spray })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "line",
            onClick: () => n("line"),
            title: "Line (L)",
            "aria-label": "Line",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.line })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "rectangle",
            onClick: () => n("rectangle"),
            title: "Rectangle (R)",
            "aria-label": "Rectangle",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.rectangle })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "oval",
            onClick: () => n("oval"),
            title: "Oval (O)",
            "aria-label": "Oval",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.oval })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "fill-bucket",
            onClick: () => n("fill-bucket"),
            title: "Fill (F)",
            "aria-label": "Fill",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["fill-bucket"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "text",
            onClick: () => n("text"),
            title: "Text (T)",
            "aria-label": "Text",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.text })
          }
        ),
        a !== !1 && /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "ai",
            onClick: () => n("ai"),
            title: "AI Prompt",
            "aria-label": "AI Prompt",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.ai })
          }
        ),
        /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "reference-handle",
            onClick: () => n("reference-handle"),
            title: "Reference Handle (H)",
            "aria-label": "Reference Handle",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["reference-handle"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "eyedropper",
            onClick: () => n("eyedropper"),
            title: "Eyedropper (E)",
            "aria-label": "Eyedropper",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.eyedropper })
          }
        ),
        i && /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-sampler",
            onClick: () => n("tile-sampler"),
            title: "Tile Sampler (Shift+S)",
            "aria-label": "Tile Sampler",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-sampler"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "stamp",
            onClick: () => n("stamp"),
            title: "Stamp (V)",
            "aria-label": "Stamp",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.stamp })
          }
        )
      ] }),
      !_ && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-rect"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-oval"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["magic-wand"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["texture-roll"] })
          }
        )
      ] }),
      _ && i && r !== !1 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-pen",
            onClick: () => n("tile-pen"),
            title: "Tile Pen (Shift+P)",
            "aria-label": "Tile Pen",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-pen"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-stamp",
            onClick: () => n("tile-stamp"),
            title: "Tile Stamp (Ctrl/Cmd+V)",
            "aria-label": "Tile Stamp",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-stamp"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-rectangle",
            onClick: () => n("tile-rectangle"),
            title: "Tile Rectangle (Shift+R)",
            "aria-label": "Tile Rectangle",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-rectangle"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-9slice",
            onClick: () => n("tile-9slice"),
            title: "Tile 9-Slice (Shift+N)",
            "aria-label": "Tile 9-Slice",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-9slice"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-export",
            onClick: () => n("tile-export"),
            title: "Tile Export (Shift+E)",
            "aria-label": "Tile Export",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["tile-export"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-rect",
            onClick: () => n("selection-rect"),
            title: "Selection Rectangle (Alt+R)",
            "aria-label": "Selection Rectangle",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-rect"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-oval",
            onClick: () => n("selection-oval"),
            title: "Selection Oval (Alt+O)",
            "aria-label": "Selection Oval",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-oval"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "magic-wand",
            onClick: () => n("magic-wand"),
            title: "Magic Wand (W)",
            "aria-label": "Magic Wand",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["magic-wand"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "selection-lasso",
            onClick: () => n("selection-lasso"),
            title: "Selection Lasso (Alt+P)",
            "aria-label": "Selection Lasso",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["selection-lasso"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "texture-roll",
            onClick: () => n("texture-roll"),
            title: "Scroll Selection (Q)",
            "aria-label": "Scroll Selection",
            disabled: t === 0,
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se["texture-roll"] })
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": X.open && X.kind === "layers",
          onClick: Z("layers"),
          title: "Layers",
          "aria-label": "Layers",
          "aria-expanded": X.open && X.kind === "layers",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.layers })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": X.open && X.kind === "overlays",
          onClick: Z("overlays"),
          title: "Overlays",
          "aria-label": "Overlays",
          "aria-expanded": X.open && X.kind === "overlays",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.overlays })
        }
      ),
      !_ && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => window.dispatchEvent(new Event("palette:open-add-swatch")),
          title: "Add Swatch Preset",
          "aria-label": "Add Swatch Preset",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.swatch })
        }
      ),
      u !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            var P, U;
            (U = (P = window.windowApi) == null ? void 0 : P.toggleFullscreen) == null || U.call(P);
          },
          title: "Toggle Full Screen (F11)",
          "aria-label": "Toggle Full Screen",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.fullscreen })
        }
      ),
      p && /* @__PURE__ */ o.jsx("div", { className: "topbar__options", children: p })
    ] }),
    X.open && /* @__PURE__ */ o.jsxs(
      "div",
      {
        ref: f,
        className: "bottom-dock__menu",
        role: "menu",
        "aria-label": X.kind === "layers" ? "Layers" : "Overlays",
        style: { top: ge.y, left: ge.x },
        children: [
          /* @__PURE__ */ o.jsx("div", { className: "bottom-dock__menu-title", children: X.kind === "layers" ? "Layers" : "Overlays" }),
          X.kind === "layers" ? /* @__PURE__ */ o.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ o.jsx(fl, { checked: N, label: "Reference", onChange: D }),
            /* @__PURE__ */ o.jsx(fl, { checked: O, label: "Pixels", onChange: F }),
            h !== !1 && /* @__PURE__ */ o.jsx(fl, { checked: G, label: "Tiles", onChange: K })
          ] }) : /* @__PURE__ */ o.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ o.jsx(
              fl,
              {
                checked: oe,
                label: "Pixel Grid",
                onChange: le,
                title: "Toggle pixel grid visibility"
              }
            ),
            h !== !1 && /* @__PURE__ */ o.jsx(
              fl,
              {
                checked: Q,
                label: "Tile Grid",
                onChange: ae,
                title: "Toggle tile grid visibility"
              }
            ),
            /* @__PURE__ */ o.jsx(fl, { checked: ne, label: "Axes", onChange: Me, title: "Toggle axis visibility" })
          ] })
        ]
      }
    )
  ] });
}, ZM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  workspaceMode: s,
  switchWorkspace: l,
  showAdvancedTools: i,
  showTileTools: r,
  showAiTool: a,
  showExportButton: c,
  showFullscreenButton: u,
  showTileLayerControls: h,
  toolOptions: p
}) => /* @__PURE__ */ o.jsx(GM, { children: /* @__PURE__ */ o.jsx(
  QM,
  {
    activeTool: e,
    selectionCount: t,
    activateTool: n,
    workspaceMode: s,
    switchWorkspace: l,
    showAdvancedTools: i,
    showTileTools: r,
    showAiTool: a,
    showExportButton: c,
    showFullscreenButton: u,
    showTileLayerControls: h,
    toolOptions: p
  }
) }), qM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", JM = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, eb = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), i = URL.createObjectURL(l), r = new Image();
  r.onload = () => {
    URL.revokeObjectURL(i), n(r);
  }, r.onerror = () => {
    URL.revokeObjectURL(i), s(new Error("Failed to load reference image"));
  }, r.src = i;
}), tb = () => {
  const e = re.getState(), t = Ce.getState(), n = ee.getState(), s = Ae.getState(), l = zt.getState(), i = $.getState(), r = St.getState(), a = /* @__PURE__ */ new Map(), c = l.items.filter((u) => u.assetFilename && u.assetData).map((u) => (a.has(u.assetFilename) || a.set(u.assetFilename, {
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
    referenceFiles: a.size > 0 ? Array.from(a.values()) : void 0
  };
}, nb = async (e) => {
  var p, d, f, g, w;
  Rd(), St.getState().clear();
  const t = re.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), Ce.getState().setCamera(e.data.camera);
  const s = ee.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (p = e.data.pixelLayers) == null ? void 0 : p.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), W.getState().clear(), Ae.getState().setStacks(((d = e.data.history) == null ? void 0 : d.undoStack) ?? [], ((f = e.data.history) == null ? void 0 : f.redoStack) ?? []);
  const r = zt.getState();
  r.clear();
  const a = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (a.length > 0 && c.length > 0) {
    const M = new Map(c.map((m) => [m.filename, m])), v = await Promise.all(
      a.map(async (m) => {
        const x = M.get(m.filename);
        if (!x)
          return null;
        const S = await eb(x.data, x.type || m.type), b = Number.isFinite(m.width) ? m.width : S.naturalWidth || S.width, _ = Number.isFinite(m.height) ? m.height : S.naturalHeight || S.height;
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
      m && r.addReference(m);
    r.setSelected(null);
  }
  xe.getState().setDirty(!1), $.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []), St.getState().setAll(((g = e.data.bookmarks) == null ? void 0 : g.items) ?? [], ((w = e.data.bookmarks) == null ? void 0 : w.overlaysVisible) ?? !0);
}, Bp = async (e) => {
  const t = tb(), n = await window.projectApi.save(t, e);
  if (n) {
    const s = xe.getState();
    s.setPath(n), s.setDirty(!1);
  }
  return n;
}, sb = async (e) => {
  Rd();
  const t = await window.projectApi.load(e);
  if (!t)
    return null;
  await nb(t);
  const n = xe.getState();
  return n.setPath(t.path), n.setDirty(!1), t.path;
}, Hx = () => {
  Rd(), St.getState().clear(), re.getState().reset(), Ce.getState().resetCamera(), ee.getState().clear(), W.getState().clear(), Ae.getState().clear(), zt.getState().clear(), $.getState().clear();
  const a = xe.getState();
  a.setPath(null), a.setDirty(!1);
}, lb = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, ib = async (e) => {
  var t;
  return (t = window.projectApi) != null && t.read ? window.projectApi.read(e) : (window.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, rb = (e, t) => {
  var p;
  const n = ((p = e.data.palette) == null ? void 0 : p.colors) ?? [], s = re.getState();
  if (!lb(s.colors, n)) {
    window.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = ee.getState(), i = l.activeLayerId, r = Math.trunc(t.offsetX), a = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const d of u)
    if (d.visible !== !1)
      for (const f of d.blocks) {
        const g = f.col * B, w = f.row * B, M = f.data;
        for (let v = 0; v < M.length; v += 1) {
          const m = M[v] ?? 0;
          if (m === 0)
            continue;
          const x = v % B, S = Math.floor(v / B), b = g + x, _ = w + S;
          c.set(`${b}:${_}`, m);
        }
      }
  const h = [];
  for (const [d, f] of c.entries()) {
    const [g, w] = d.split(":"), M = Number(g), v = Number(w), m = M + r, x = v + a, S = l.getPixelInLayer(i, m, x);
    S !== f && h.push({ x: m, y: x, prev: S, next: f });
  }
  qi(h, { label: "Merge Project" });
}, Tn = 8, ji = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, ob = (e) => yt(e), ab = (e) => e.map((t) => ob(t) ?? { r: 0, g: 0, b: 0 }), Yp = (e, t, n) => {
  if (n <= 0)
    return [];
  const s = Array.from(t), l = s.length ? s.reduce(
    (r, a) => {
      const c = e[a];
      return r.r += c.r, r.g += c.g, r.b += c.b, r;
    },
    { r: 0, g: 0, b: 0 }
  ) : { r: 127, g: 127, b: 127 };
  s.length && (l.r /= s.length, l.g /= s.length, l.b /= s.length);
  const i = [];
  for (let r = 0; r < e.length; r += 1)
    t.has(r) || i.push({ idx: r, distance: ji(e[r], l) });
  return i.sort((r, a) => r.distance - a.distance), i.slice(0, n).map((r) => r.idx);
}, Wx = (e, t) => {
  var p;
  const n = ab(t), s = /* @__PURE__ */ new Map();
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
    })), f = [], g = () => {
      let M = -1, v = d[0].idx;
      for (const m of d) {
        const x = m.weight;
        x > M && (M = x, v = m.idx);
      }
      return v;
    };
    for (f.push(g()); f.length < 3; ) {
      let M = d[0].idx, v = -1;
      for (const m of d) {
        if (f.includes(m.idx))
          continue;
        let x = 1 / 0;
        for (const b of f)
          x = Math.min(
            x,
            ji(m.color, n[b])
          );
        const S = x * m.weight;
        S > v && (v = S, M = m.idx);
      }
      f.push(M);
    }
    let w = f;
    for (let M = 0; M < 6; M += 1) {
      const v = /* @__PURE__ */ new Map();
      for (const x of w)
        v.set(x, []);
      for (const x of d) {
        let S = w[0], b = 1 / 0;
        for (const _ of w) {
          const k = ji(x.color, n[_]);
          k < b && (b = k, S = _);
        }
        (p = v.get(S)) == null || p.push(x.idx);
      }
      const m = [];
      for (const [x, S] of v.entries()) {
        if (S.length === 0) {
          m.push(x);
          continue;
        }
        let b = x, _ = 1 / 0;
        for (const k of S) {
          let j = 0;
          for (const A of S) {
            const L = s.get(A) ?? 1;
            j += ji(n[k], n[A]) * L;
          }
          j < _ && (_ = j, b = k);
        }
        m.push(b);
      }
      for (w = Array.from(new Set(m)); w.length < 3; ) {
        const x = Yp(
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
  const r = /* @__PURE__ */ new Set([0, ...i]), a = Yp(n, r, 4 - r.size);
  for (const d of a)
    r.add(d);
  const c = Array.from(r), u = c.filter((d) => d === 0), h = c.filter((d) => d !== 0).sort((d, f) => {
    const g = (w) => 0.2126 * w.r + 0.7152 * w.g + 0.0722 * w.b;
    return g(n[d]) - g(n[f]);
  });
  return {
    paletteIndices: [...u, ...h].slice(0, 4),
    paletteRgb: n
  };
}, Ux = (e, t, n, s) => {
  const l = e.maxX - e.minX + 1, i = e.maxY - e.minY + 1, r = new Float32Array(n * s * 3), a = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let c = 0; c < n * s; c += 1) {
    const u = c * 3;
    r[u] = a.r, r[u + 1] = a.g, r[u + 2] = a.b;
  }
  for (const c of e.pixels) {
    const u = c.x - e.minX, h = c.y - e.minY;
    if (u < 0 || h < 0 || u >= l || h >= i)
      continue;
    const p = t[c.paletteIndex] ?? a, d = (h * n + u) * 3;
    r[d] = p.r, r[d + 1] = p.g, r[d + 2] = p.b;
  }
  return { data: r, width: l, height: i };
}, $x = (e, t, n, s) => {
  const l = new Uint8Array(t * n), i = new Float32Array(e), r = (c, u, h) => {
    let p = 0, d = 1 / 0;
    for (let f = 0; f < s.length; f += 1) {
      const g = ji({ r: c, g: u, b: h }, s[f]);
      g < d && (d = g, p = f);
    }
    return p;
  }, a = (c, u, h, p, d, f) => {
    if (c < 0 || u < 0 || c >= t || u >= n)
      return;
    const g = (u * t + c) * 3;
    i[g] += h * f, i[g + 1] += p * f, i[g + 2] += d * f;
  };
  for (let c = 0; c < n; c += 1)
    for (let u = 0; u < t; u += 1) {
      const h = (c * t + u) * 3, p = i[h], d = i[h + 1], f = i[h + 2], g = r(p, d, f);
      l[c * t + u] = g;
      const w = s[g], M = p - w.r, v = d - w.g, m = f - w.b;
      a(u + 1, c, M, v, m, 7 / 16), a(u - 1, c + 1, M, v, m, 3 / 16), a(u, c + 1, M, v, m, 5 / 16), a(u + 1, c + 1, M, v, m, 1 / 16);
    }
  return l;
}, $o = (e) => Math.ceil(e / Tn) * Tn, Vx = (e, t, n) => {
  const s = t / Tn, l = n / Tn, i = s * l, r = new Uint8Array(i * Tn * 2);
  let a = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const h = u * Tn, p = c * Tn;
      for (let d = 0; d < Tn; d += 1) {
        let f = 0, g = 0;
        for (let w = 0; w < Tn; w += 1) {
          const M = (p + d) * t + (h + w), v = e[M] & 3, m = 7 - w;
          f |= (v & 1) << m, g |= (v >> 1 & 1) << m;
        }
        r[a] = f, r[a + 1] = g, a += 2;
      }
    }
  return { data: r, tileCount: i };
}, hi = (e, t, n) => {
  e.setUint16(t, n, !0);
}, cb = (e, t, n) => {
  e.setUint32(t, n, !0);
}, ub = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), i = Math.min(l.length, s - 1);
  for (let r = 0; r < i; r += 1)
    e.setUint8(t + r, l[r]);
  e.setUint8(t + i, 0);
  for (let r = i + 1; r < s; r += 1)
    e.setUint8(t + r, 0);
}, db = (e, t, n) => {
  const l = 40 + e.length, i = 12 + l, r = new ArrayBuffer(i), a = new DataView(r), c = new Uint8Array(r);
  c.set([71, 66, 79, 48], 0), hi(a, 4, 2), hi(a, 6, 1), cb(a, 8, l);
  let u = 12;
  ub(a, u, "Pixel Splash Studio", 30), u += 30, hi(a, u, Tn), u += 2, hi(a, u, Tn), u += 2, hi(a, u, t), u += 2;
  for (let h = 0; h < 4; h += 1)
    c[u + h] = n[h] ?? h;
  return u += 4, c.set(e, u), new Uint8Array(r);
}, hb = async () => {
  var f;
  if (!((f = window.projectApi) != null && f.exportGbr))
    return window.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Wx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $o(e.maxX - e.minX + 1), i = $o(e.maxY - e.minY + 1), r = n.map((g) => s[g]), { data: a } = Ux(e, s, l, i), c = $x(a, l, i, r), { data: u, tileCount: h } = Vx(c, l, i), p = db(u, h, [0, 1, 2, 3]), d = `pixel-splash-selection-${l}x${i}.gbr`;
  return window.projectApi.exportGbr(p, d);
}, fb = async () => {
  var p;
  if (!((p = window.projectApi) != null && p.exportChr))
    return window.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Wx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $o(e.maxX - e.minX + 1), i = $o(e.maxY - e.minY + 1), r = n.map((d) => s[d]), { data: a } = Ux(e, s, l, i), c = $x(a, l, i, r), { data: u } = Vx(c, l, i), h = `pixel-splash-selection-${l}x${i}.chr`;
  return window.projectApi.exportChr(u, h);
}, Kx = () => {
  var e;
  return (e = window.projectApi) != null && e.exportImage ? !0 : (window.alert("Image export is unavailable. Restart the app to load the latest export support."), !1);
}, Dd = async (e) => {
  const t = Ns();
  if (!t)
    return window.alert("Select a region to export."), null;
  if (!Kx())
    return null;
  const { data: n, width: s, height: l } = Ld(t), i = new Uint8Array(n), r = `pixel-splash-selection-${s}x${l}.${e}`;
  return window.projectApi.exportImage(e, { kind: "rgba", width: s, height: l, data: i }, r);
}, pb = () => Dd("bmp"), mb = () => Dd("gif"), gb = () => Dd("tga"), xb = async () => {
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  if (!Kx())
    return null;
  let t = 0;
  for (const c of e.pixels)
    c.paletteIndex > t && (t = c.paletteIndex);
  if (t > 255)
    return window.alert("PCX export supports palette indices up to 255."), null;
  const { data: n, width: s, height: l } = zM(e), i = re.getState().colors, r = new Uint8Array(256 * 3);
  for (let c = 0; c < 256; c += 1) {
    const u = i[c];
    if (!u)
      continue;
    const h = yt(u);
    if (!h)
      continue;
    const p = c * 3;
    r[p] = h.r, r[p + 1] = h.g, r[p + 2] = h.b;
  }
  const a = `pixel-splash-selection-${s}x${l}.pcx`;
  return window.projectApi.exportImage(
    "pcx",
    { kind: "indexed", width: s, height: l, data: n, palette: r },
    a
  );
}, gn = 320, $n = 200, yb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, vb = (e) => e.map((t) => yt(t) ?? { r: 0, g: 0, b: 0 }), wb = (e, t, n) => {
  const i = Array.from(e.entries()).sort((r, a) => a[1] - r[1]).map(([r]) => r).filter((r) => r <= n).slice(0, t);
  if (i.length >= t)
    return i;
  for (let r = 0; r <= n && i.length < t; r += 1)
    i.includes(r) || i.push(r);
  return i;
}, Sb = (e, t) => {
  if (!e)
    return null;
  const n = new Float32Array(gn * $n * 3), s = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let l = 0; l < gn * $n; l += 1) {
    const i = l * 3;
    n[i] = s.r, n[i + 1] = s.g, n[i + 2] = s.b;
  }
  for (const l of e.pixels) {
    const i = l.x - e.minX, r = l.y - e.minY;
    if (i < 0 || r < 0 || i >= gn || r >= $n)
      continue;
    const a = t[l.paletteIndex] ?? s, c = (r * gn + i) * 3;
    n[c] = a.r, n[c + 1] = a.g, n[c + 2] = a.b;
  }
  return n;
}, Mb = (e, t) => {
  const n = new Uint8Array(gn * $n);
  for (let s = 0; s < $n; s += 1)
    for (let l = 0; l < gn; l += 1) {
      const i = (s * gn + l) * 3, r = e[i], a = e[i + 1], c = e[i + 2];
      let u = 0, h = 1 / 0;
      for (let p = 0; p < t.length; p += 1) {
        const d = yb({ r, g: a, b: c }, t[p]);
        d < h && (h = d, u = p);
      }
      n[s * gn + l] = u;
    }
  return n;
}, bb = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, _b = (e) => {
  const n = new Uint8Array(80 * $n);
  for (let s = 0; s < $n; s += 1) {
    const l = (s & 1) * 8192, i = (s >> 1) * 80;
    for (let r = 0; r < gn; r += 4) {
      const a = s * gn + r, c = e[a] & 3, u = e[a + 1] & 3, h = e[a + 2] & 3, p = e[a + 3] & 3, d = c << 6 | u << 4 | h << 2 | p, f = r >> 2;
      n[l + i + f] = d;
    }
  }
  return n;
}, Tb = (e) => {
  const n = 40 * $n, s = new Uint8Array(n * 4);
  for (let l = 0; l < $n; l += 1)
    for (let i = 0; i < gn; i += 1) {
      const r = e[l * gn + i] & 15, a = l * 40 + (i >> 3), c = 7 - (i & 7);
      for (let u = 0; u < 4; u += 1) {
        const h = u * n;
        r & 1 << u && (s[h + a] |= 1 << c);
      }
    }
  return s;
}, kb = (e) => e, Bd = async (e, t, n, s) => {
  var M;
  if (!((M = window.projectApi) != null && M.exportBsave))
    return window.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const l = Ns();
  if (!l)
    return window.alert("Select a region to export."), null;
  const i = re.getState().colors, r = vb(i), a = /* @__PURE__ */ new Map();
  for (const v of l.pixels)
    a.set(v.paletteIndex, (a.get(v.paletteIndex) ?? 0) + 1);
  const c = r.length - 1, h = (t >= r.length ? r.map((v, m) => m) : wb(a, t, c)).map((v) => r[v]), p = Sb(l, r);
  if (!p)
    return null;
  const d = Mb(p, h);
  let f;
  e === "cga" ? f = _b(d) : e === "ega" ? f = Tb(d) : f = kb(d);
  const g = bb(n, 0, f.length), w = new Uint8Array(g.length + f.length);
  return w.set(g, 0), w.set(f, g.length), window.projectApi.exportBsave(w, s);
}, Cb = () => Bd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), jb = () => Bd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), Nb = () => Bd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), Pb = (e) => e.trim().toLowerCase(), Ib = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, i) => {
    const r = Pb(l), a = t.get(r);
    if (a !== void 0) {
      n[i] = a;
      return;
    }
    const c = s.length;
    t.set(r, c), n[i] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, Eb = () => {
  const e = re.getState(), t = e.colors, { mapped: n, nextColors: s } = Ib(t);
  if (s.length === t.length)
    return !1;
  const l = (d) => Number.isFinite(d) && d >= 0 && d < n.length ? n[d] : 0, i = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(i);
  const r = ee.getState(), a = r.exportLayerPayloads().map((d) => ({
    ...d,
    blocks: d.blocks.map(({ row: f, col: g, data: w }) => {
      const M = new Uint8Array(w.length);
      for (let v = 0; v < w.length; v += 1)
        M[v] = l(w[v]);
      return { row: f, col: g, data: M };
    })
  }));
  r.loadLayerPayloads(a, r.activeLayerId);
  const c = W.getState();
  for (const [d, f] of c.pixels.entries()) {
    const g = l(f.paletteIndex);
    g !== f.paletteIndex && c.pixels.set(d, { ...f, paletteIndex: g });
  }
  const u = rt.getState();
  if (u.pixels.length > 0) {
    const d = u.pixels.map((g) => ({
      ...g,
      paletteIndex: l(g.paletteIndex)
    })), f = u.origin ?? { x: 0, y: 0 };
    rt.getState().setBuffer({
      pixels: d,
      origin: f,
      width: u.width,
      height: u.height
    });
  }
  const h = Ae.getState(), p = (d) => ({
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
  ), xe.getState().setDirty(!0), !0;
}, Rb = (e, t, n) => e << 16 | t << 8 | n, Ab = (e) => {
  const t = e.palette;
  let n = t ? t.map((r) => Ul({ r: r[0], g: r[1], b: r[2] })) : [];
  if (n.length === 0) {
    let r = 0;
    for (let a = 0; a < e.pixels.length; a += 1)
      e.pixels[a] > r && (r = e.pixels[a]);
    n = Array.from(
      { length: r + 1 },
      (a, c) => Ul({ r: c, g: c, b: c })
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
    const a = e.pixels[r];
    let c = a;
    if (s !== null ? a === s ? c = 0 : a === 0 && (c = s) : typeof e.transparentIndex == "number" && a === e.transparentIndex && (c = 0), c === 0)
      continue;
    const u = r % i, h = Math.floor(r / i);
    l.push({ x: u, y: h, paletteIndex: c });
  }
  return { paletteColors: n, pixels: l };
}, Lb = (e) => {
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
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2], h = Rb(a, c, u);
    let p = n.get(h);
    p === void 0 && (p = t.length, t.push(Ul({ r: a, g: c, b: u })), n.set(h, p));
    const d = i / 4, f = d % l, g = Math.floor(d / l);
    s.push({ x: f, y: g, paletteIndex: p });
  }
  return { paletteColors: t, pixels: s };
}, Db = (e) => {
  const t = re.getState(), n = ee.getState(), s = ye.getState(), l = rt.getState();
  if (Hx(), e.colorType === "indexed") {
    const i = Ab(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  } else {
    const i = Lb(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  }
  s.clear(), l.clear(), xe.getState().setDirty(!0);
}, Bb = (e) => {
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
}, Ic = (e) => e.toString(16).padStart(2, "0"), Yb = (e) => `#${Ic(e.r)}${Ic(e.g)}${Ic(e.b)}`, Xp = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Xb = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(px)) === "true";
  } catch {
    return !1;
  }
}, Gx = (e) => {
  const t = ma(e), n = Math.floor(t.minX / C), s = Math.floor(t.minY / C), l = Math.ceil(t.maxX / C), i = Math.ceil(t.maxY / C), r = Math.max(0, l - n), a = Math.max(0, i - s);
  if (r === 0 || a === 0)
    return null;
  const c = r * a;
  if ((r > pc || a > pc || c > Qf) && !Xb()) {
    const m = `Reference trace is too large (${r}x${a}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${px}"]="true" to override.`;
    return typeof window < "u" && window.alert(m), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
      width: r,
      height: a,
      pixelCount: c,
      maxDimension: pc,
      maxPixels: Qf
    }), null;
  }
  const h = document.createElement("canvas");
  h.width = r, h.height = a;
  const p = h.getContext("2d", { willReadFrequently: !0 });
  if (!p)
    return null;
  p.imageSmoothingEnabled = !1;
  const d = Zn(e), f = d.centerX / C, g = d.centerY / C, w = d.baseWidth / C, M = d.baseHeight / C;
  p.save(), p.translate(f - n, g - s), p.rotate(d.rotationRad), p.scale(d.scale * d.flipX, d.scale * d.flipY), p.drawImage(
    e.image,
    -w / 2,
    -M / 2,
    w,
    M
  ), p.restore();
  const v = p.getImageData(0, 0, r, a);
  return {
    width: r,
    height: a,
    offsetX: n,
    offsetY: s,
    data: v.data
  };
}, Fb = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const i = yt(l);
    i && n.push({ paletteIndex: s, rgb: i });
  }
  return n;
}, Ob = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, D0);
  for (let i = 0; i < e.length; i += 4) {
    if (e[i + 3] < fx)
      continue;
    const r = Math.min(255, Math.round(e[i] / s) * s), a = Math.min(255, Math.round(e[i + 1] / s) * s), c = Math.min(255, Math.round(e[i + 2] / s) * s), u = `${r},${a},${c}`, h = n.get(u);
    h ? h.count += 1 : n.set(u, { rgb: { r, g: a, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((i, r) => r.count - i.count).slice(0, t).map((i) => i.rgb);
}, zb = (e) => {
  const t = re.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((r, a) => {
    s.set(r.toLowerCase(), a);
  });
  const l = [], i = [];
  for (const r of e) {
    const a = Yb(r), c = a.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(a), s.set(c, u)), i.push({ paletteIndex: u, rgb: r });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), i;
}, Qx = (e, t) => {
  if (t.length === 0)
    return;
  const n = ee.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.height; i += 1)
    for (let r = 0; r < e.width; r += 1) {
      const a = (i * e.width + r) * 4;
      if (e.data[a + 3] < fx)
        continue;
      const u = e.data[a], h = e.data[a + 1], p = e.data[a + 2], d = `${u},${h},${p}`;
      let f = l.get(d);
      if (f === void 0) {
        const v = { r: u, g: h, b: p };
        let m = t[0], x = Xp(v, m.rgb);
        for (let S = 1; S < t.length; S += 1) {
          const b = t[S], _ = Xp(v, b.rgb);
          _ < x && (x = _, m = b);
        }
        f = m.paletteIndex, l.set(d, f);
      }
      const g = e.offsetX + r, w = e.offsetY + i, M = n.getPixel(g, w);
      M !== f && s.push({ x: g, y: w, prev: M, next: f });
    }
  s.length !== 0 && qi(s, { label: "Reference Trace" });
}, Hb = (e, t) => {
  const n = re.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((a) => Math.round(a)).filter((a) => Number.isFinite(a)).filter((a) => a >= 0 && a < n.length).sort((a, c) => a - c);
  if (l.length === 0)
    return;
  const i = Fb(n, l);
  if (i.length === 0)
    return;
  const r = Gx(e);
  r && Qx(r, i);
}, Wb = (e, t) => {
  const n = Gx(e);
  if (!n)
    return;
  const s = Math.max(
    ku,
    Math.min(t, Cu)
  ), l = Ob(n.data, s);
  if (l.length === 0)
    return;
  const i = zb(l);
  Qx(n, i);
}, xi = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), Ys = (e, t, n) => {
  const s = xi(e.x, 0, Math.max(0, t - 1)), l = xi(e.y, 0, Math.max(0, n - 1)), i = xi(e.width, 1, Math.max(1, t - s)), r = xi(e.height, 1, Math.max(1, n - l));
  return { x: s, y: l, width: i, height: r };
}, Ec = (e, t, n, s) => {
  const l = Ys(s, t, n), i = new Uint8Array(l.width * l.height);
  for (let r = 0; r < l.height; r += 1) {
    const c = (l.y + r) * t + l.x, u = r * l.width;
    i.set(e.subarray(c, c + l.width), u);
  }
  return { pixels: i, width: l.width, height: l.height };
}, Fp = (e, t, n, s) => {
  const l = xi(s, 1, 8);
  if (l === 1)
    return { pixels: e, width: t, height: n };
  const i = t * l, r = n * l, a = new Uint8Array(i * r);
  for (let c = 0; c < r; c += 1) {
    const u = Math.floor(c / l);
    for (let h = 0; h < i; h += 1) {
      const p = Math.floor(h / l);
      a[c * i + h] = e[u * t + p] ?? 0;
    }
  }
  return { pixels: a, width: i, height: r };
}, Ub = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Op = (e, t) => {
  const n = t.map((i) => yt(i) ?? { r: 0, g: 0, b: 0 }), s = /* @__PURE__ */ new Map();
  s.set(0, 0);
  const l = n.length > 1 ? Array.from({ length: n.length - 1 }, (i, r) => r + 1) : [0];
  for (let i = 1; i < e.length; i += 1) {
    const r = e[i];
    if (!r)
      continue;
    const a = { r: r[0], g: r[1], b: r[2] };
    let c = l[0] ?? 0, u = Number.POSITIVE_INFINITY;
    for (const h of l) {
      const p = Ub(a, n[h] ?? n[0]);
      p < u && (u = p, c = h);
    }
    s.set(i, c);
  }
  return s;
}, zp = (e, t, n) => {
  const s = t.slice(), l = /* @__PURE__ */ new Map();
  l.set(0, 0);
  const i = /* @__PURE__ */ new Set([0]), r = (a, c) => {
    for (let h = 1; h < s.length; h += 1)
      if (!(n.has(h) || i.has(h))) {
        i.add(h), s[h] = c, l.set(a, h);
        return;
      }
    const u = s.length;
    s.push(c), i.add(u), l.set(a, u);
  };
  for (let a = 1; a < e.length; a += 1)
    r(a, e[a] ?? "#000000");
  return { map: l, palette: s };
}, Qr = (e, t) => {
  const n = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s += 1) {
    const l = e[s] ?? 0;
    n[s] = t.get(l) ?? 0;
  }
  return n;
}, Hp = (e, t) => {
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
}, $b = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), i = s.map((r) => yt(r) ?? { r: 0, g: 0, b: 0 });
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r] ?? 0, c = i[a] ?? i[0], u = r * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = a === 0 ? 0 : 255;
  }
  return l;
}, On = (e, t, n) => Math.min(n, Math.max(t, e)), ml = (e) => e === "tile-pen" || e === "tile-stamp" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", Vb = (e) => e === "tile-sampler" || ml(e), Kb = (e) => e === "selection-rect" || e === "selection-oval" || e === "selection-lasso" || e === "magic-wand" || e === "texture-roll", Ll = 0, Vo = 100, Yd = Math.log10(Zs), Gb = Math.log10(Wl), Du = Gb - Yd, Wp = 72, Up = 360, Qb = 32, Zb = (e) => {
  const t = On(e, Zs, Wl), n = Du === 0 ? 0 : (Math.log10(t) - Yd) / Du;
  return Math.round(
    Ll + n * (Vo - Ll)
  );
}, qb = (e) => {
  const t = (On(e, Ll, Vo) - Ll) / (Vo - Ll), n = Yd + t * Du;
  return Math.pow(10, n);
}, Jb = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, rn = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), $p = (e) => {
  if (e < 1024)
    return `${e}B`;
  const t = e / 1024;
  if (t < 1024)
    return `${t.toFixed(t < 10 ? 1 : 0)}KB`;
  const n = t / 1024;
  return n < 1024 ? `${n.toFixed(n < 10 ? 1 : 0)}MB` : `${(n / 1024).toFixed(1)}GB`;
}, Vp = (e) => e.reduce((t, n) => t + n.block.byteLength, 0), Kp = (e) => {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" ? !0 : e.isContentEditable;
}, e_ = () => {
  const t = ee.getState().layers.reduce(
    (M, v) => M + Vp(v.store.getBlocks()),
    0
  ), n = Vp(ye.getState().store.getBlocks()), s = W.getState().pixels.size * Zf, l = rt.getState().pixels.length * Zf, i = zt.getState().items.reduce((M, v) => M + v.width * v.height * 4, 0), r = Ae.getState();
  let a = 0;
  for (const M of r.undoStack)
    a += M.changes.length;
  for (const M of r.redoStack)
    a += M.changes.length;
  const c = a * Y0, h = re.getState().colors.reduce((M, v) => M + v.length * 2, 0) + Id * 2, p = {
    tool: rn(Nt.getState()),
    brush: rn(mn.getState()),
    spray: rn(Gt.getState()),
    rectangle: rn(Xo.getState()),
    oval: rn(Fo.getState()),
    selection: rn($l.getState()),
    fill: rn(Mt.getState()),
    stamp: rn(Ge.getState()),
    viewport: rn(Ce.getState()),
    layers: rn(Re.getState()),
    project: rn(xe.getState()),
    referenceHandle: rn(Ho.getState())
  }, d = Jb(p), f = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: i },
    { label: "hist", bytes: c },
    { label: "pal", bytes: h },
    { label: "ui", bytes: d }
  ], g = f.reduce((M, v) => M + v.bytes, 0), w = f.filter((M) => M.bytes > 0).map((M) => `${M.label} ${$p(M.bytes)}`);
  return `Mem ${$p(g)}${w.length ? ` • ${w.join(" • ")}` : ""}`;
}, t_ = () => {
  const e = JM(), t = Ae((y) => y.undo), n = Ae((y) => y.redo), s = ye((y) => y.selectedCount), l = xe((y) => y.path), i = xe((y) => y.dirty), [r, a] = T.useState(!1), [c, u] = T.useState(!1), [h, p] = T.useState(!1), [d, f] = T.useState(!1), [g, w] = T.useState(!0), [M, v] = T.useState(!1), [m, x] = T.useState("pen"), [S, b] = T.useState(""), [_, k] = T.useState("monospace"), [j, A] = T.useState(16), [L, Y] = T.useState(!1), [N, O] = T.useState("pen"), [G, oe] = T.useState(""), [Q, ne] = T.useState(!1), [D, F] = T.useState(null), [K, le] = T.useState(null), [ae, Me] = T.useState(0), [X, ie] = T.useState(0), [ge, z] = T.useState(!1), [Z, P] = T.useState(null), [U, te] = T.useState([]), [de, Ze] = T.useState(2), [_e, Fe] = T.useState("nearest"), [Oe, st] = T.useState(0), Pe = 32, he = 2, [pt, Ue] = T.useState(!0), [It, tn] = T.useState(!1), [vt, Pn] = T.useState(""), [Jn, In] = T.useState(96), [nn, nl] = T.useState(220), En = Au((y) => y.isRecording), Rn = Au((y) => y.setIsRecording), fe = Nt((y) => y.activeTool), ve = Nt((y) => y.setActiveTool), ot = Js((y) => y.mode), $e = Js((y) => y.setMode), wn = Re((y) => y.showReferenceLayer), es = Re((y) => y.showPixelLayer), I = Re((y) => y.showTileLayer), R = Re((y) => y.showPixelGrid), q = Re((y) => y.showTileGrid), ue = Re((y) => y.showAxes), je = Re((y) => y.setShowReferenceLayer), Et = Re((y) => y.setShowPixelLayer), sn = Re((y) => y.setShowTileLayer), Ps = Re((y) => y.setShowPixelGrid), Is = Re((y) => y.setShowTileGrid), Xn = Re((y) => y.setShowAxes), $t = $((y) => y.tileSets), ts = $((y) => y.tileMaps), Ji = $((y) => y.activeTileSetId), qx = $((y) => y.activeTileMapId), Jx = $((y) => y.selectedTileIndex), Xd = $((y) => y.selectedTileIndices), Ql = $((y) => y.tilePage), ey = $((y) => y.tilePageCount), er = $((y) => y.setTilePage), Es = $((y) => y.tilePickerZoom), Fd = $((y) => y.setTilePickerZoom), Od = $((y) => y.tilePlacementMode), zd = $((y) => y.setTilePlacementMode), Hd = $((y) => y.tilePenSnapToCluster), Wd = $((y) => y.setTilePenSnapToCluster), Ud = $((y) => y.setActiveTileSet), $d = $((y) => y.setTileSetLayout), Vd = $((y) => y.addTileSet), Kd = $((y) => y.duplicateTileSet), Gd = $((y) => y.renameTileSet), Qd = $((y) => y.deleteTileSet), Zd = $((y) => y.deleteTilesFromSet), ty = mn((y) => y.size), qd = mn((y) => y.shape), Jd = Gt((y) => y.radius), eh = Gt((y) => y.density), th = Gt((y) => y.falloff), nh = Xo((y) => y.mode), sh = Xo((y) => y.setMode), lh = Fo((y) => y.mode), ih = Fo((y) => y.setMode), tr = $l((y) => y.snap), nr = $l((y) => y.setSnap), rh = Mt((y) => y.mode), oh = Mt((y) => y.setMode), sr = Mt((y) => y.gradientDirection), lr = Mt((y) => y.setGradientDirection), ir = Mt((y) => y.gradientDither), rr = Mt((y) => y.setGradientDither), ga = re((y) => y.selectedIndices), or = ga.length, ny = re((y) => y.getActiveIndex()), ar = Ge((y) => y.mode), sl = Ge((y) => y.snap), sy = Ge((y) => y.rotation), ly = Ge((y) => y.scale), ah = Ge((y) => y.flipX), ch = Ge((y) => y.flipY), cr = Ge((y) => y.drag), xa = Ge((y) => y.pasteDuplicateColors), uh = $((y) => y.tileDebugOverlay), ya = $((y) => y.setTileDebugOverlay), iy = $((y) => y.nineSlice), ry = $((y) => y.selectedTileCols), oy = $((y) => y.selectedTileRows), va = zt((y) => y.removeReference), ur = Te.useRef(!1), ll = T.useRef(null), dh = T.useRef(null), Zl = T.useRef(null), Ee = 8, il = Z ? Math.floor(Z.width / Ee) : 0, Rs = Z ? Math.floor(Z.height / Ee) : 0, dr = Math.max(1, Math.ceil(Rs / Pe)), hr = Math.min(Math.max(0, Oe), Math.max(0, dr - 1)), hh = hr * Pe, ql = U[U.length - 1] ?? null;
  T.useEffect(() => {
    const y = window.setTimeout(() => {
      w(!1);
    }, 2e3);
    return () => window.clearTimeout(y);
  }, []), T.useEffect(() => {
    var se, Ne, Ie, Ye;
    const y = document.documentElement, E = (at) => {
      const Ve = Number.isFinite(at) && at > 0 ? at : 1;
      y.style.setProperty("--ui-scale", String(Ve));
    };
    E(((Ne = (se = window.uiScaleApi) == null ? void 0 : se.getScale) == null ? void 0 : Ne.call(se)) ?? 1);
    const V = (Ye = (Ie = window.uiScaleApi) == null ? void 0 : Ie.onScaleChange) == null ? void 0 : Ye.call(Ie, E);
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
        const se = re.getState();
        se.setPalette(V), se.setSelectedIndices([]), xe.getState().setDirty(!0);
      });
  }, []);
  const fh = Ge((y) => y.setMode), fr = Ge((y) => y.setSnap), ay = Ge((y) => y.setRotation), cy = Ge((y) => y.setScale), uy = Ge((y) => y.setFlipX), dy = Ge((y) => y.setFlipY), ph = Ge((y) => y.setDrag), hy = Ge(
    (y) => y.setPasteDuplicateColors
  ), wa = mn((y) => y.setSize), Sa = mn((y) => y.setShape), mh = Gt((y) => y.setRadius), gh = Gt((y) => y.setDensity), xh = Gt((y) => y.setFalloff), Ma = Te.useRef("pen"), ba = Te.useRef("tile-pen");
  T.useEffect(() => {
    if (ml(fe)) {
      ba.current = fe;
      return;
    }
    Ma.current = fe;
  }, [fe]);
  const _a = T.useCallback(
    (y) => {
      if (y === "tile" && (!d || e))
        return;
      if ($e(y), y === "tile") {
        const V = ml(ba.current) ? ba.current : "tile-pen";
        ve(V);
        return;
      }
      const E = ml(Ma.current) ? "pen" : Ma.current;
      ve(E);
    },
    [d, e, ve, $e]
  ), pr = T.useCallback(
    (y) => {
      if (ml(y)) {
        if (!d || e)
          return;
        $e("tile");
      } else Kb(y) && ot === "tile" && d && !e ? $e("tile") : $e("pixel");
      if (y === "selection-lasso") {
        ve("selection-lasso"), wa(1), Sa("round");
        return;
      }
      if (y === "text") {
        x((E) => fe === "text" ? E : fe), ve("text"), v(!0);
        return;
      }
      if (y === "ai") {
        O((E) => fe === "ai" ? E : fe), ve("ai"), Y(!0);
        return;
      }
      ve(y);
    },
    [
      fe,
      d,
      e,
      ve,
      Sa,
      wa,
      $e,
      ot
    ]
  ), ns = re((y) => y.colors), rl = Ho((y) => y.snap), mr = Ho((y) => y.setSnap), yh = zt((y) => y.setSelected), Be = zt(
    (y) => y.selectedId ? y.items.find((E) => E.id === y.selectedId) ?? null : null
  ), fy = zt((y) => y.updateReference), [Ta, py] = T.useState(B0), ka = K0(), ce = $t.find((y) => y.id === Ji) ?? $t[0], vh = ts.find((y) => y.id === qx) ?? ts[0], As = Te.useMemo(() => {
    const y = new Set(Xd.filter((E) => E >= 0));
    return Array.from(y).sort((E, V) => E - V);
  }, [Xd]), Ca = T.useCallback(
    (y) => {
      Number.isFinite(y) && Fd(y);
    },
    [Fd]
  ), ja = Math.max(1, ey), Na = Math.min(Ql, ja - 1), my = T.useCallback(() => {
    er(Ql - 1);
  }, [er, Ql]), gy = T.useCallback(() => {
    er(Ql + 1);
  }, [er, Ql]), wh = T.useCallback(
    (y, E) => {
      ce && (!Number.isFinite(y) || !Number.isFinite(E) || $d(ce.id, y, E));
    },
    [ce, $d]
  ), xy = T.useCallback(() => {
    const y = (ce == null ? void 0 : ce.tileWidth) ?? me, E = (ce == null ? void 0 : ce.tileHeight) ?? me;
    Vd({
      name: `Tile Set ${$t.length + 1}`,
      tileWidth: y,
      tileHeight: E,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [ce, Vd, $t.length]), yy = T.useCallback(() => {
    ce && Kd(ce.id);
  }, [ce, Kd]), vy = T.useCallback(() => {
    if (!ce)
      return;
    const y = ce.name, E = window.prompt("Rename tile set", y);
    if (typeof E != "string")
      return;
    const V = E.trim();
    !V || V === y || Gd(ce.id, V);
  }, [ce, Gd]), wy = T.useCallback(() => {
    if (!ce)
      return;
    const y = ts.filter((V) => V.tileSetId === ce.id).length, E = y > 0 ? `Delete ${ce.name}? This will also delete ${y} linked tile map${y === 1 ? "" : "s"}.` : `Delete ${ce.name}?`;
    window.confirm(E) && Qd(ce.id);
  }, [ce, Qd, ts]), Sy = T.useCallback(() => {
    if (!ce || As.length === 0)
      return;
    const y = As.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${As.length} ${y} from ${ce.name}? This cannot be undone.`
    ) && Zd(ce.id, As);
  }, [ce, Zd, As]), Tt = ot === "tile" && d && !e, My = Tt ? nn : Jn, Pa = Te.useRef("palette"), Ia = Te.useRef(!1);
  T.useEffect(() => {
    Tt && (tr !== "tile" && nr("tile"), sl !== "tile" && fr("tile"), rl !== "tile" && mr("tile"));
  }, [
    Tt,
    rl,
    tr,
    mr,
    nr,
    fr,
    sl
  ]);
  const gr = T.useCallback(
    (y) => {
      const E = Math.max(16, y.tileWidth * Es), V = Math.max(1, y.rows) * E;
      return On(
        V + Qb,
        Wp,
        Up
      );
    },
    [Es]
  ), by = T.useCallback(
    (y) => {
      Ud(y);
      const E = $t.find((V) => V.id === y);
      E && nl(gr(E));
    },
    [gr, Ud, $t]
  );
  T.useEffect(() => {
    if (!Tt || !Ji)
      return;
    const y = $t.find((E) => E.id === Ji);
    y && nl(gr(y));
  }, [
    Tt,
    Ji,
    gr,
    $t
  ]);
  const _y = (y) => {
    y.preventDefault(), y.currentTarget.setPointerCapture(y.pointerId), Pa.current = Tt ? "tile" : "palette", Ia.current = !0;
  };
  T.useEffect(() => {
    const y = (V) => {
      if (!Ia.current)
        return;
      const se = document.documentElement.clientHeight, Ne = Math.max(
        Wp,
        Math.min(Up, se - V.clientY)
      );
      Pa.current === "tile" ? nl(Ne) : In(Ne);
    }, E = () => {
      Pa.current = Tt ? "tile" : "palette", Ia.current = !1;
    };
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", E), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", E);
    };
  }, [Tt]);
  const Ty = (pt ? 0 : 324) + 24;
  T.useEffect(() => {
    if (e) {
      f(!1);
      return;
    }
    let y = !1;
    return (async () => {
      try {
        const V = await window.optionsApi.getAdvancedMode();
        y || f(!!V);
      } catch {
      }
    })(), () => {
      y = !0;
    };
  }, [e]), T.useEffect(() => {
    fe !== "reference-handle" && yh(null);
  }, [fe, yh]), T.useEffect(() => {
    !d && ml(fe) && (ve("pen"), $e("pixel"));
  }, [d, fe, ve, $e]), T.useEffect(() => {
    ot === "tile" && (!d || e) && $e("pixel");
  }, [d, e, $e, ot]), T.useEffect(() => {
    e && fe === "ai" && ve("pen");
  }, [fe, e, ve]);
  const xr = Te.useCallback(async () => (e || await Bp(l ?? void 0), null), [e, l]), Sh = Te.useCallback(async () => (e || await Bp(void 0), null), [e]), yr = Te.useCallback(async () => {
    if (e)
      return null;
    if (!(i && !window.confirm("You have unsaved changes. Continue?")))
      return await sb(void 0), null;
  }, [e, i]), vr = Te.useCallback(() => {
    i && !window.confirm("You have unsaved changes. Continue?") || Hx();
  }, [i]), wr = Te.useCallback(() => {
    a(!0);
  }, [a]), Mh = Te.useCallback(async () => {
    var y;
    if (!(e || En)) {
      if (!((y = window.recordingApi) != null && y.start)) {
        window.alert("Recording is unavailable. Restart the app to load the latest recording support.");
        return;
      }
      try {
        const E = await window.recordingApi.start();
        Rn(!0), window.alert(`Recording started.
Frames will be saved to:
${E.frameDir}`);
      } catch (E) {
        const V = E instanceof Error ? E.message : "Unable to start recording.";
        window.alert(V);
      }
    }
  }, [e, En, Rn]), bh = Te.useCallback(async () => {
    var y;
    if (!(!En || !((y = window.recordingApi) != null && y.stop)))
      try {
        const E = await window.recordingApi.stop(12);
        if (Rn(!1), !E) {
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
        Rn(!1);
        const V = E instanceof Error ? E.message : "Unable to stop recording.";
        window.alert(V);
      }
  }, [En, Rn]), _h = T.useCallback(async () => {
    const y = await ib();
    y && (le(y), F(y.path ?? null), Me(0), ie(0), ne(!0));
  }, []), Th = T.useCallback(async () => {
    var V;
    if (!((V = window.projectApi) != null && V.importImage)) {
      window.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const y = await window.projectApi.importImage();
    if (!y)
      return;
    if (!(y.format === "nes" || y.format === "gb" || y.format === "gbc" || y.format === "chr")) {
      (y.width > 512 || y.height > 512) && window.alert("Large images (over 512x512) can take a while to load."), Db(y);
      return;
    }
    if (y.colorType !== "indexed") {
      window.alert("ROM import preview requires indexed pixels.");
      return;
    }
    P(y), te([
      {
        x: 0,
        y: 0,
        width: Math.floor(y.width / Ee),
        height: Math.floor(y.height / Ee)
      }
    ]), Ze(2), Fe("nearest"), st(0), z(!0);
  }, []), Sr = T.useCallback(() => {
    z(!1), P(null), te([]), Zl.current = null;
  }, []), Mr = T.useCallback(
    (y) => {
      Z && te((E) => {
        if (E.length === 0)
          return E;
        const V = E.slice(), se = V[V.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return V[V.length - 1] = Ys({ ...se, ...y }, il, Rs), V;
      });
    },
    [Z, il, Rs]
  ), br = T.useCallback(() => {
    const y = ee.getState(), E = /* @__PURE__ */ new Set();
    for (const V of y.layers)
      for (const se of V.store.getBlocks())
        for (let Ne = 0; Ne < se.block.length; Ne += 1) {
          const Ie = se.block[Ne] ?? 0;
          Ie !== 0 && E.add(Ie);
        }
    return E;
  }, []), ky = T.useCallback(() => {
    if (!Z || U.length === 0)
      return;
    if (!Z.palette) {
      window.alert("ROM palette is missing.");
      return;
    }
    const y = U.map((we) => Ys(we, il, Rs)).filter((we) => we.width > 0 && we.height > 0);
    if (y.length === 0) {
      window.alert("Select at least one region.");
      return;
    }
    const E = Hp(Z.palette, Z.pixels), V = y.map((we) => {
      const ut = Ys(
        {
          x: we.x * Ee,
          y: we.y * Ee,
          width: we.width * Ee,
          height: we.height * Ee
        },
        Z.width,
        Z.height
      ), Yt = Ec(
        Z.pixels,
        Z.width,
        Z.height,
        ut
      );
      return Fp(Yt.pixels, Yt.width, Yt.height, de);
    }), se = Ee * de, Ne = Math.max(Ee * de * 32, 512);
    let Ie = 0, Ye = 0, at = 0;
    const Ve = [];
    for (const we of V) {
      const ut = we.width, Yt = we.height;
      Ie > 0 && Ie + ut > Ne && (Ie = 0, Ye += at + se, at = 0), Ve.push({ x: Ie, y: Ye, w: ut, h: Yt, pixels: we.pixels }), Ie += ut + se, at = Math.max(at, Yt);
    }
    const ze = Ve.length === 0 ? 1 : Math.max(...Ve.map((we) => we.x + we.w)), mt = Ve.length === 0 ? 1 : Math.max(...Ve.map((we) => we.y + we.h)), ct = new Uint8Array(ze * mt);
    for (const we of Ve)
      for (let ut = 0; ut < we.h; ut += 1)
        for (let Yt = 0; Yt < we.w; Yt += 1)
          ct[(we.y + ut) * ze + (we.x + Yt)] = we.pixels[ut * we.w + Yt] ?? 0;
    const Rt = re.getState(), ss = br();
    let ln;
    if (_e === "unused") {
      const we = zp(E, Rt.colors, ss);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Rt.setPalette(we.palette), Rt.setSelectedIndices([]), ln = Qr(ct, we.map);
    } else {
      const we = Op(Z.palette, Rt.colors);
      ln = Qr(ct, we);
    }
    const ei = [];
    for (let we = 0; we < ln.length; we += 1) {
      const ut = ln[we] ?? 0;
      ut !== 0 && ei.push({ x: we % ze, y: Math.floor(we / ze), paletteIndex: ut });
    }
    rt.getState().setBuffer({
      pixels: ei,
      origin: { x: 0, y: 0 },
      width: ze,
      height: mt
    }), Ge.getState().setSnap("tile"), Ge.getState().setScale(1), Nt.getState().setActiveTool("stamp"), Sr();
  }, [
    Sr,
    br,
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
    const E = ll.current, V = dh.current;
    if (!E || !V)
      return;
    const se = Hp(Z.palette, Z.pixels), Ne = Math.floor(Z.width / Ee), Ie = Math.floor(Z.height / Ee), Ye = Math.max(1, Math.ceil(Ie / Pe)), Ve = Math.min(Math.max(0, Oe), Ye - 1) * Pe, ze = Math.min(Pe, Math.max(0, Ie - Ve)), mt = Ec(Z.pixels, Z.width, Z.height, {
      x: 0,
      y: Ve * Ee,
      width: Ne * Ee,
      height: ze * Ee
    }), ct = U.map((pe) => Ys(pe, Ne, Ie)).filter((pe) => pe.width > 0 && pe.height > 0), Rt = ct.map((pe) => {
      const Ke = Ys(
        {
          x: pe.x * Ee,
          y: pe.y * Ee,
          width: pe.width * Ee,
          height: pe.height * Ee
        },
        Z.width,
        Z.height
      ), lt = Ec(
        Z.pixels,
        Z.width,
        Z.height,
        Ke
      ), cl = Fp(lt.pixels, lt.width, lt.height, de);
      return { rect: pe, scaled: cl };
    }), ss = (pe, Ke, lt, cl, La, Da) => {
      const kr = Math.max(1, Math.trunc(Da)), ul = document.createElement("canvas");
      ul.width = Ke, ul.height = lt;
      const Lh = ul.getContext("2d");
      if (!Lh)
        return;
      const Ey = $b(cl, Ke, lt, La);
      Lh.putImageData(new ImageData(Ey, Ke, lt), 0, 0), pe.width = Ke * kr, pe.height = lt * kr;
      const Cr = pe.getContext("2d");
      Cr && (Cr.imageSmoothingEnabled = !1, Cr.clearRect(0, 0, pe.width, pe.height), Cr.drawImage(ul, 0, 0, pe.width, pe.height));
    };
    ss(
      E,
      mt.width,
      mt.height,
      mt.pixels,
      se,
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
        const La = pe.x * Ee * he, Da = lt * Ee * he, kr = pe.width * Ee * he, ul = cl * Ee * he;
        ln.strokeRect(La + 0.5, Da + 0.5, kr - 1, ul - 1);
      }
      ln.restore();
    }
    const ei = Ee * de, we = Math.max(Ee * de * 32, 512);
    let ut = 0, Yt = 0, _r = 0;
    const al = [];
    for (const pe of Rt) {
      const Ke = pe.scaled.width, lt = pe.scaled.height;
      ut > 0 && ut + Ke > we && (ut = 0, Yt += _r + ei, _r = 0), al.push({ x: ut, y: Yt, w: Ke, h: lt, pixels: pe.scaled.pixels }), ut += Ke + ei, _r = Math.max(_r, lt);
    }
    const Ea = al.length === 0 ? 1 : Math.max(...al.map((pe) => pe.x + pe.w)), Ah = al.length === 0 ? 1 : Math.max(...al.map((pe) => pe.y + pe.h)), Tr = new Uint8Array(Ea * Ah);
    for (const pe of al)
      for (let Ke = 0; Ke < pe.h; Ke += 1)
        for (let lt = 0; lt < pe.w; lt += 1)
          Tr[(pe.y + Ke) * Ea + (pe.x + lt)] = pe.pixels[Ke * pe.w + lt] ?? 0;
    let Ra = Tr, Aa = ns;
    if (_e === "nearest") {
      const pe = Z.palette;
      if (!pe)
        return;
      const Ke = Op(pe, ns);
      Ra = Qr(Tr, Ke), Aa = ns;
    } else {
      const pe = br(), { map: Ke, palette: lt } = zp(se, ns, pe);
      Ra = Qr(Tr, Ke), Aa = lt;
    }
    ss(V, Ea, Ah, Ra, Aa, 2);
  }, [
    br,
    ns,
    ge,
    _e,
    Z,
    Oe,
    de,
    U
  ]), T.useEffect(() => {
    const y = (E) => {
      var Ne, Ie, Ye, at, Ve, ze;
      if (Kp(E.target))
        return;
      if (!(E.ctrlKey || E.metaKey)) {
        const mt = E.key.toLowerCase();
        if ((mt === "delete" || mt === "backspace") && fe === "reference-handle" && Be) {
          E.preventDefault(), va(Be.id);
          return;
        }
        if (mt === "delete" || mt === "backspace") {
          if (ye.getState().selectedCount === 0)
            return;
          E.preventDefault(), $M();
          return;
        }
        const ct = Bb({
          key: E.key,
          altKey: E.altKey,
          ctrlKey: E.ctrlKey,
          metaKey: E.metaKey,
          shiftKey: E.shiftKey
        });
        if (ct) {
          if (ct.type === "tool") {
            if (Vb(ct.tool) && (!d || e))
              return;
            E.preventDefault(), pr(ct.tool);
            return;
          }
          if (ct.type === "palette-primary") {
            const Rt = re.getState();
            ct.index >= 0 && ct.index < Rt.colors.length && (E.preventDefault(), Rt.setSelectedIndices([ct.index]));
            return;
          }
        }
        return;
      }
      const se = E.key.toLowerCase();
      if (se === "v") {
        if (ot === "tile" && rt.getState().tileBuffer) {
          E.preventDefault(), pr("tile-stamp");
          return;
        }
        ur.current = !0, window.setTimeout(() => {
          ur.current = !1;
        }, 200);
        return;
      }
      if (se === "+" || se === "=") {
        E.preventDefault(), (Ie = (Ne = window.uiScaleApi) == null ? void 0 : Ne.stepScale) == null || Ie.call(Ne, 1.1);
        return;
      }
      if (se === "-") {
        E.preventDefault(), (at = (Ye = window.uiScaleApi) == null ? void 0 : Ye.stepScale) == null || at.call(Ye, 0.9090909090909091);
        return;
      }
      if (se === "0") {
        E.preventDefault(), (ze = (Ve = window.uiScaleApi) == null ? void 0 : Ve.resetScale) == null || ze.call(Ve);
        return;
      }
      if (se === "z") {
        if (E.preventDefault(), Ae.getState().locked)
          return;
        E.shiftKey ? n() : t();
      }
      if (se === "y") {
        if (E.preventDefault(), Ae.getState().locked)
          return;
        n();
      }
      if (se === "s") {
        if (E.preventDefault(), e)
          return;
        xr();
      }
      if (se === "o") {
        if (E.preventDefault(), e)
          return;
        yr();
      }
      if (se === "n" && (E.preventDefault(), vr()), se === "c") {
        if (ot === "tile") {
          Fx() && E.preventDefault();
          return;
        }
        ye.getState().selectedCount > 0 && (E.preventDefault(), E.shiftKey ? Uo({ deep: !0 }) : Uo());
      }
      if (se === "x") {
        if (ot === "tile") {
          Ox() && E.preventDefault();
          return;
        }
        ye.getState().selectedCount > 0 && (E.preventDefault(), Dx());
      }
      se === "/" && (E.preventDefault(), wr());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [
    fe,
    pr,
    e,
    yr,
    vr,
    xr,
    wr,
    d,
    n,
    va,
    Be,
    t,
    ot
  ]), T.useEffect(() => {
    fe !== "text" && M && v(!1);
  }, [fe, M]);
  const Jl = (y) => {
    Be && fy(Be.id, y);
  }, kh = (y) => {
    Number.isFinite(y) && Jl({
      rotation: On(y, uc, dc)
    });
  }, Ch = (y) => {
    Number.isFinite(y) && Jl({
      scale: On(y, Zs, Wl)
    });
  }, jh = (y) => {
    Number.isFinite(y) && Jl({
      opacity: On(y, hc, fc)
    });
  }, ol = Te.useMemo(() => {
    const y = ns.length - 1;
    if (y < 0)
      return [];
    const E = /* @__PURE__ */ new Set();
    for (const V of ga) {
      if (!Number.isFinite(V))
        continue;
      const se = Math.round(V);
      se < 0 || se > y || E.add(se);
    }
    return Array.from(E).sort((V, se) => V - se);
  }, [ns.length, ga]), Cy = ol.length === 0 ? "Select palette colors to trace." : ol.length === 1 ? "Using 1 selected color." : `Using ${ol.length} selected colors.`, jy = () => {
    !Be || ns.length === 0 || ol.length !== 0 && Hb(Be, ol);
  }, Ny = () => {
    if (!Be || !Number.isFinite(Ta))
      return;
    const y = On(
      Math.round(Ta),
      ku,
      Cu
    );
    Wb(Be, y);
  }, Nh = (Be == null ? void 0 : Be.rotation) ?? 0, Ph = (Be == null ? void 0 : Be.scale) ?? 1, Py = Zb(Ph), Ih = (Be == null ? void 0 : Be.opacity) ?? 0.7, Eh = (Be == null ? void 0 : Be.flipX) ?? !1, Rh = (Be == null ? void 0 : Be.flipY) ?? !1, Vt = !Be;
  T.useEffect(() => {
    if (!It) {
      Pn("");
      return;
    }
    const y = () => {
      const V = e_();
      Pn((se) => se === V ? se : V);
    };
    y();
    const E = window.setInterval(y, X0);
    return () => window.clearInterval(E);
  }, [It]), T.useEffect(() => {
    var E, V;
    const y = It && vt ? `${ka} • ${vt}` : ka;
    (V = (E = window.appApi) == null ? void 0 : E.setTitle) == null || V.call(E, y);
  }, [ka, It, vt]), T.useEffect(() => {
    const y = (E) => {
      var Ie;
      if (Kp(E.target) || !ur.current)
        return;
      ur.current = !1;
      const se = Array.from(((Ie = E.clipboardData) == null ? void 0 : Ie.items) ?? []).find((Ye) => Ye.type.startsWith("image/"));
      if (!se)
        return;
      const Ne = se.getAsFile();
      Ne && (E.preventDefault(), Cx(Ne));
    };
    return window.addEventListener("paste", y), () => window.removeEventListener("paste", y);
  }, []), T.useEffect(() => {
    var E, V;
    const y = ((V = (E = window.menuApi) == null ? void 0 : E.onAction) == null ? void 0 : V.call(E, (se) => {
      var Ne, Ie;
      if (se.startsWith("view:set:")) {
        const Ye = se.split(":"), at = Ye[2] ?? "", ze = (Ye[3] ?? "") === "true";
        switch (at) {
          case "showReferenceLayer":
            je(ze);
            return;
          case "showPixelLayer":
            Et(ze);
            return;
          case "showTileLayer":
            sn(ze);
            return;
          case "showPixelGrid":
            Ps(ze);
            return;
          case "showTileGrid":
            Is(ze);
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
      if (se.startsWith("options:advancedMode:")) {
        const Ye = se.split(":")[2] ?? "";
        f(Ye === "true");
        return;
      }
      if (se.startsWith("palette:rows:")) {
        const Ye = Number(se.split(":")[2]);
        Number.isFinite(Ye) && window.dispatchEvent(
          new CustomEvent("palette:set-rows", {
            detail: Math.min(4, Math.max(2, Math.floor(Ye)))
          })
        );
        return;
      }
      switch (se) {
        case "new":
          vr();
          break;
        case "open":
          yr();
          break;
        case "save":
          xr();
          break;
        case "saveAs":
          Sh();
          break;
        case "importImage":
          Th();
          break;
        case "mergeProject":
          _h();
          break;
        case "recording:start":
          Mh();
          break;
        case "recording:stop":
          bh();
          break;
        case "exportPng":
          zx();
          break;
        case "exportBmp":
          pb();
          break;
        case "exportGif":
          mb();
          break;
        case "exportPcx":
          xb();
          break;
        case "exportTga":
          gb();
          break;
        case "exportBsaveCga":
          Cb();
          break;
        case "exportBsaveEga":
          jb();
          break;
        case "exportBsaveVga":
          Nb();
          break;
        case "exportGbr":
          hb();
          break;
        case "exportChr":
          fb();
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
          wr();
          break;
        case "palette:consolidate":
          Eb();
          break;
        case "palette:import-lospec":
          window.dispatchEvent(new Event("palette:open-lospec"));
          break;
        case "license":
          u(!0);
          break;
        case "options":
          p(!0);
          break;
        case "uiScale:reset":
          (Ie = (Ne = window.uiScaleApi) == null ? void 0 : Ne.resetScale) == null || Ie.call(Ne);
          break;
        case "tileDebug:on":
          ya(!0);
          break;
        case "tileDebug:off":
          ya(!1);
          break;
        case "view:select-tool:pen":
          _a("pixel");
          break;
      }
    })) ?? (() => {
    });
    return () => y();
  }, [
    Th,
    yr,
    _h,
    vr,
    Mh,
    xr,
    Sh,
    wr,
    bh,
    n,
    f,
    ve,
    Ue,
    tn,
    Xn,
    u,
    Ps,
    Et,
    je,
    Is,
    sn,
    ya,
    _a,
    t
  ]), T.useEffect(() => {
    var y, E;
    (E = (y = window.viewMenuApi) == null ? void 0 : y.setState) == null || E.call(y, {
      showReferenceLayer: wn,
      showPixelLayer: es,
      showTileLayer: I,
      showPixelGrid: R,
      showTileGrid: q,
      showAxes: ue,
      tileDebugOverlay: uh,
      minimapCollapsed: pt
    });
  }, [
    wn,
    es,
    I,
    R,
    q,
    ue,
    uh,
    pt
  ]);
  const Iy = () => /* @__PURE__ */ o.jsx("div", { className: "panel__section", children: fe === "pen" || fe === "selection-lasso" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: [1, 4, 8].map((y) => /* @__PURE__ */ o.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": ty === y,
          disabled: qd === "point",
          onClick: () => wa(y),
          children: [
            y,
            "px"
          ]
        },
        y
      )) })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Brush" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: [
        { id: "point", label: "fine-point" },
        { id: "square", label: "rectangle" },
        { id: "round", label: "circle" }
      ].map((y) => /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": qd === y.id,
          onClick: () => Sa(y.id),
          children: /* @__PURE__ */ o.jsx("span", { className: "tool-label", "aria-label": y.label, children: y.label })
        },
        y.id
      )) })
    ] })
  ] }) : fe === "spray" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Radius" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: Jd,
              onChange: (y) => mh(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Radius",
              min: 1,
              max: 64,
              step: 1,
              value: Jd,
              onChange: (y) => mh(y.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Density" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "range",
              className: "panel__range",
              "aria-label": "Density",
              min: 10,
              max: 2e3,
              step: 10,
              value: Math.min(2e3, eh),
              onChange: (y) => gh(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Density",
              min: 1,
              max: 2e4,
              step: 10,
              value: eh,
              onChange: (y) => gh(y.currentTarget.valueAsNumber)
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Falloff" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: th,
            onChange: (y) => xh(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Falloff",
            min: 0,
            max: 1,
            step: 0.05,
            value: th,
            onChange: (y) => xh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }) })
  ] }) : fe === "line" ? or >= 2 ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
      /* @__PURE__ */ o.jsx(
        on,
        {
          ariaLabel: "Gradient direction",
          value: sr,
          onChange: lr,
          options: [
            { value: "top-bottom", label: "Top → Bottom" },
            { value: "bottom-top", label: "Bottom → Top" },
            { value: "left-right", label: "Left → Right" },
            { value: "right-left", label: "Right → Left" }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Dither" }),
      /* @__PURE__ */ o.jsx(
        on,
        {
          ariaLabel: "Gradient dither",
          value: ir,
          onChange: rr,
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
    /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
  ] }) : /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." }) : fe === "rectangle" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "filled",
              checked: nh === "filled",
              onChange: () => sh("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "rectangle-mode",
              value: "outlined",
              checked: nh === "outlined",
              onChange: () => sh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    or >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient direction",
            value: sr,
            onChange: lr,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient dither",
            value: ir,
            onChange: rr,
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
      /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : fe === "oval" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "filled",
              checked: lh === "filled",
              onChange: () => ih("filled")
            }
          ),
          "Filled"
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "oval-mode",
              value: "outlined",
              checked: lh === "outlined",
              onChange: () => ih("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    or >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient direction",
            value: sr,
            onChange: lr,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient dither",
            value: ir,
            onChange: rr,
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
      /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] })
  ] }) : fe === "fill-bucket" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Mode" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "color",
              checked: rh === "color",
              onChange: () => oh("color")
            }
          ),
          "Color"
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "fill-mode",
              value: "selection",
              checked: rh === "selection",
              onChange: () => oh("selection")
            }
          ),
          "Selection"
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] }),
    or >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient direction",
            value: sr,
            onChange: lr,
            options: [
              { value: "top-bottom", label: "Top → Bottom" },
              { value: "bottom-top", label: "Bottom → Top" },
              { value: "left-right", label: "Left → Right" },
              { value: "right-left", label: "Right → Left" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Dither" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Gradient dither",
            value: ir,
            onChange: rr,
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
  ] }) : fe === "texture-roll" ? /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: s === 0 ? "Make a selection first." : "Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps." }) : fe === "stamp" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Mode" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": ar === "soft", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "soft",
                checked: ar === "soft",
                onChange: () => fh("soft")
              }
            ),
            "Soft"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": ar === "hard", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "hard",
                checked: ar === "hard",
                onChange: () => fh("hard")
              }
            ),
            "Hard"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Drag" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": !cr, children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "off",
                checked: !cr,
                onChange: () => ph(!1)
              }
            ),
            "Off"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": cr, children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "on",
                checked: cr,
                onChange: () => ph(!0)
              }
            ),
            "On"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": sl === "pixel", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "pixel",
                checked: sl === "pixel",
                onChange: () => fr("pixel")
              }
            ),
            "Pixel"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": sl === "tile", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "tile",
                checked: sl === "tile",
                onChange: () => fr("tile")
              }
            ),
            "Tile"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Flip" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": ah,
              onClick: () => uy(!ah),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": ch,
              onClick: () => dy(!ch),
              children: "Flip Y"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Scale" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Scale",
            value: String(ly),
            onChange: (y) => cy(Number(y)),
            options: [
              { value: "1", label: "1x" },
              { value: "2", label: "2x" },
              { value: "4", label: "4x" },
              { value: "8", label: "8x" }
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Rotate" }),
        /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Rotate",
            value: String(sy),
            onChange: (y) => ay(Number(y)),
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
    /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Paste" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__toggle-group", children: /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": xa, children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "checkbox",
            checked: xa,
            onChange: () => hy(!xa)
          }
        ),
        "Duplicate Colors"
      ] }) })
    ] }) })
  ] }) : fe === "reference-handle" ? /* @__PURE__ */ o.jsx("div", { className: "panel__group", children: /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--cards", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Rotation" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Rotation",
            min: uc,
            max: dc,
            step: 1,
            value: Nh,
            disabled: Vt,
            onChange: (y) => kh(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Rotation",
            min: uc,
            max: dc,
            step: 1,
            value: Nh,
            disabled: Vt,
            onChange: (y) => kh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Scale" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Scale",
            min: Ll,
            max: Vo,
            step: 1,
            value: Py,
            disabled: Vt,
            onChange: (y) => Ch(qb(y.currentTarget.valueAsNumber))
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Scale",
            min: Zs,
            max: Wl,
            step: 0.01,
            value: Ph,
            disabled: Vt,
            onChange: (y) => Ch(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Opacity" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Opacity",
            min: hc,
            max: fc,
            step: 0.05,
            value: Ih,
            disabled: Vt,
            onChange: (y) => jh(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Opacity",
            min: hc,
            max: fc,
            step: 0.05,
            value: Ih,
            disabled: Vt,
            onChange: (y) => jh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Flip" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Eh,
            disabled: Vt,
            onClick: () => Jl({ flipX: !Eh }),
            children: "Flip X"
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Rh,
            disabled: Vt,
            onClick: () => Jl({ flipY: !Rh }),
            children: "Flip Y"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": rl === "pixel", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "pixel",
              checked: rl === "pixel",
              onChange: () => mr("pixel")
            }
          ),
          "Pixel"
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": rl === "tile", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "tile",
              checked: rl === "tile",
              onChange: () => mr("tile")
            }
          ),
          "Tile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Reference" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack", children: [
        Vt && /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select a reference" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt,
            onClick: () => {
              Be && va(Be.id);
            },
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Trace Palette" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack", children: [
        /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: Cy }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt || ol.length === 0,
            onClick: jy,
            children: "Trace Selected"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Trace Max Colors" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Trace max colors",
            min: ku,
            max: Cu,
            step: 1,
            value: Ta,
            disabled: Vt,
            onChange: (y) => {
              const E = y.currentTarget.valueAsNumber;
              Number.isFinite(E) && py(Math.round(E));
            }
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt,
            onClick: Ny,
            children: "Trace"
          }
        )
      ] })
    ] })
  ] }) }) : fe === "selection-rect" || fe === "selection-oval" ? /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "pixel",
            checked: !Tt && tr === "pixel",
            disabled: Tt,
            onChange: () => nr("pixel")
          }
        ),
        "Pixel"
      ] }),
      /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "tile",
            checked: Tt || tr === "tile",
            onChange: () => nr("tile")
          }
        ),
        "Tile"
      ] })
    ] }),
    Tt ? /* @__PURE__ */ o.jsx("span", { className: "panel__note", children: "Tile Space locks selection snap to tiles." }) : null
  ] }) : fe === "tile-sampler" || fe === "tile-pen" || fe === "tile-stamp" || fe === "tile-rectangle" || fe === "tile-9slice" || fe === "tile-export" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--cards", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Tile Set" }),
        ce ? /* @__PURE__ */ o.jsx(
          on,
          {
            ariaLabel: "Tile Set",
            value: ce.id,
            onChange: by,
            options: $t.map((y) => ({ value: y.id, label: y.name }))
          }
        ) : /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "None" })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Cluster" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ o.jsx(
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
              onChange: (y) => wh(
                y.currentTarget.valueAsNumber,
                (ce == null ? void 0 : ce.rows) ?? 1
              )
            }
          ),
          /* @__PURE__ */ o.jsx("span", { className: "panel__note", children: "x" }),
          /* @__PURE__ */ o.jsx(
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
              onChange: (y) => wh(
                (ce == null ? void 0 : ce.columns) ?? 1,
                y.currentTarget.valueAsNumber
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Zoom" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => Ca(Es - 1),
              disabled: Es <= Nu,
              children: "-"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile picker zoom",
              min: Nu,
              max: Pu,
              step: 1,
              value: Es,
              onChange: (y) => Ca(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => Ca(Es + 1),
              disabled: Es >= Pu,
              children: "+"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Page" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: my,
              disabled: !ce || Na <= 0,
              children: "◀"
            }
          ),
          /* @__PURE__ */ o.jsxs("span", { className: "panel__item panel__item--static", children: [
            Na + 1,
            " / ",
            ja
          ] }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: gy,
              disabled: !ce || Na >= ja - 1,
              children: "▶"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Placement" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Od === "soft",
              onClick: () => zd("soft"),
              children: "Soft"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Od === "hard",
              onClick: () => zd("hard"),
              children: "Hard"
            }
          )
        ] })
      ] }),
      fe === "tile-pen" ? /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": !Hd,
              onClick: () => Wd(!1),
              children: "Free"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Hd,
              onClick: () => Wd(!0),
              children: "Cluster"
            }
          )
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: xy, children: "New Set" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: yy,
          disabled: !ce,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: vy,
          disabled: !ce,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: wy,
          disabled: !ce,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Sy,
          disabled: !ce || As.length === 0,
          children: "Delete Tiles"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Set: ",
        ce ? `${ce.name} (${ce.tiles.length} tiles)` : "None"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Map: ",
        vh ? vh.name : "None"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Selected Tile: ",
        ce ? Jx + 1 : "—"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        As.length
      ] }),
      fe === "tile-9slice" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          iy ? "set" : "unset"
        ] }),
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          ry,
          "x",
          oy
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ o.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ o.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ o.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ o.jsx(dM, {}) }),
    /* @__PURE__ */ o.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ o.jsx(
        ZM,
        {
          activeTool: fe,
          selectionCount: s,
          activateTool: pr,
          workspaceMode: ot,
          switchWorkspace: _a,
          showAdvancedTools: !e && d,
          showTileTools: Tt,
          showAiTool: !e,
          showExportButton: !e,
          showFullscreenButton: !e,
          showTileLayerControls: !e,
          toolOptions: Iy()
        }
      ),
      g && /* @__PURE__ */ o.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ o.jsx("img", { src: qM, alt: "" }) }),
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: `app__palette panel${Tt ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${Ty}px`,
            "--palette-bar-height": `${My}px`
          },
          children: [
            /* @__PURE__ */ o.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: _y
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: `bottom-bar${Tt ? " bottom-bar--tile" : ""}`, children: [
              /* @__PURE__ */ o.jsx("div", { className: "bottom-bar__left" }),
              /* @__PURE__ */ o.jsx("div", { className: "bottom-bar__center", children: Tt ? /* @__PURE__ */ o.jsx(RM, {}) : /* @__PURE__ */ o.jsx(IM, {}) })
            ] })
          ]
        }
      ),
      pt ? /* @__PURE__ */ o.jsx("div", { className: "app__minimap-launch panel panel--collapsed", children: /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__toggle", onClick: () => Ue(!1), children: "Minimap" }) }) : /* @__PURE__ */ o.jsxs("div", { className: "app__minimap panel", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "panel__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Minimap" }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              onClick: () => Ue(!0),
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsx(CM, {})
      ] })
    ] }),
    ge && Z && ql && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: Sr }),
      /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--rom", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Import ROM Segment" }),
          /* @__PURE__ */ o.jsx("button", { type: "button", onClick: Sr, children: "Close" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Selections" }),
            /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o.jsx("span", { children: U.length }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => te([]),
                  disabled: U.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => te((y) => y.length > 0 ? y.slice(0, -1) : y),
                  disabled: U.length === 0,
                  children: "Remove last"
                }
              ),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Ctrl+drag to add" })
            ] })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Selection (tiles)" }),
            /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o.jsxs("label", { children: [
                "X",
                " ",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.x,
                    onChange: (y) => Mr({ x: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { children: [
                "Y",
                " ",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.y,
                    onChange: (y) => Mr({ y: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { children: [
                "W",
                " ",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.width,
                    onChange: (y) => Mr({ width: Number(y.target.value) })
                  }
                )
              ] }),
              /* @__PURE__ */ o.jsxs("label", { children: [
                "H",
                " ",
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "number",
                    value: ql.height,
                    onChange: (y) => Mr({ height: Number(y.target.value) })
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Page" }),
            /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => st((y) => Math.max(0, y - 1)),
                  disabled: hr <= 0,
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ o.jsxs("span", { children: [
                hr + 1,
                "/",
                dr
              ] }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => st((y) => Math.min(dr - 1, y + 1)),
                  disabled: hr >= dr - 1,
                  children: "Next"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Scale" }),
            /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsxs(
              "select",
              {
                value: de,
                onChange: (y) => Ze(Number(y.target.value)),
                children: [
                  /* @__PURE__ */ o.jsx("option", { value: 1, children: "1x" }),
                  /* @__PURE__ */ o.jsx("option", { value: 2, children: "2x" }),
                  /* @__PURE__ */ o.jsx("option", { value: 3, children: "3x" }),
                  /* @__PURE__ */ o.jsx("option", { value: 4, children: "4x" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Palette" }),
            /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsxs(
              "select",
              {
                value: _e,
                onChange: (y) => Fe(
                  y.target.value === "unused" ? "unused" : "nearest"
                ),
                children: [
                  /* @__PURE__ */ o.jsx("option", { value: "nearest", children: "Map to nearest existing colors" }),
                  /* @__PURE__ */ o.jsx("option", { value: "unused", children: "Import into unused palette slots" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pick region" }),
            /* @__PURE__ */ o.jsxs("span", { className: "rom-import__grid", children: [
              /* @__PURE__ */ o.jsx("div", { className: "rom-import__selection", children: /* @__PURE__ */ o.jsx(
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
                    const V = E.getBoundingClientRect(), se = Math.floor(
                      (y.clientX - V.left) / V.width * E.width
                    ), Ne = Math.floor(
                      (y.clientY - V.top) / V.height * E.height
                    ), Ie = Math.floor(se / (Ee * he)), Ye = hh + Math.floor(Ne / (Ee * he)), at = Math.trunc(On(Ie, 0, il - 1)), Ve = Math.trunc(On(Ye, 0, Rs - 1));
                    Zl.current = {
                      startTileX: at,
                      startTileY: Ve,
                      pointerId: y.pointerId
                    };
                    const ze = y.ctrlKey || y.metaKey, mt = { x: at, y: Ve, width: 1, height: 1 };
                    te(
                      (Rt) => ze ? [...Rt, mt] : [mt]
                    );
                  },
                  onPointerMove: (y) => {
                    const E = ll.current, V = Zl.current;
                    if (!E || !V || !Z || V.pointerId !== y.pointerId)
                      return;
                    const se = E.getBoundingClientRect(), Ne = Math.floor(
                      (y.clientX - se.left) / se.width * E.width
                    ), Ie = Math.floor(
                      (y.clientY - se.top) / se.height * E.height
                    ), Ye = Math.floor(Ne / (Ee * he)), at = hh + Math.floor(Ie / (Ee * he)), Ve = Math.min(V.startTileX, Ye), ze = Math.min(V.startTileY, at), mt = Math.max(V.startTileX, Ye), ct = Math.max(V.startTileY, at);
                    te((Rt) => {
                      if (Rt.length === 0)
                        return Rt;
                      const ss = Rt.slice();
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
              /* @__PURE__ */ o.jsx("div", { className: "rom-import__preview", children: /* @__PURE__ */ o.jsx(
                "canvas",
                {
                  ref: dh,
                  className: "rom-import__canvas"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", {}),
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: ky, children: "Send to Stamp Tool" })
          ] })
        ] })
      ] })
    ] }),
    Q && K && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx(
        "div",
        {
          className: "modal__backdrop",
          onClick: () => {
            ne(!1), le(null), F(null);
          }
        }
      ),
      /* @__PURE__ */ o.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Merge Project" }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                ne(!1), le(null), F(null);
              },
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Source" }),
            /* @__PURE__ */ o.jsx("span", { children: D ?? "(unknown)" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Offset X" }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "number",
                value: ae,
                onChange: (y) => Me(Number(y.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Offset Y" }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "number",
                value: X,
                onChange: (y) => ie(Number(y.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", {}),
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                onClick: () => {
                  rb(K, {
                    offsetX: ae,
                    offsetY: X
                  }), ne(!1), le(null), F(null);
                },
                children: "Merge Pixels"
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", {}),
            /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Current merge supports pixels only and requires identical palettes." })
          ] })
        ] })
      ] })
    ] }),
    r && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: () => a(!1) }),
      /* @__PURE__ */ o.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Shortcut Map & Hotkeys" }),
          /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => a(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "New" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+N" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Open" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+O" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Save" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+S" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Save As" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Shift+S" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Export PNG" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Shift+E" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Export GBR" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Shift+G" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Undo" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Z" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Redo" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Y / Ctrl+Shift+Z" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Copy Selection (active layer)" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+C" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Deep Copy Selection (merged)" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+Shift+C" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Cut Selection" }),
            /* @__PURE__ */ o.jsx("span", { children: "Ctrl+X" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Tool hotkeys" }),
            /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Global" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Palette primary color 0–9" }),
            /* @__PURE__ */ o.jsx("span", { children: "0–9" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pen / Rectangle / Oval" }),
            /* @__PURE__ */ o.jsx("span", { children: "P / R / O" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Spray / Line / Fill / Text" }),
            /* @__PURE__ */ o.jsx("span", { children: "S / L / F / T" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Eyedropper / Magic Wand" }),
            /* @__PURE__ */ o.jsx("span", { children: "E / W" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Stamp / Reference Handle / Scroll Selection" }),
            /* @__PURE__ */ o.jsx("span", { children: "V / H / Q" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Select Oval / Rectangle / Lasso" }),
            /* @__PURE__ */ o.jsx("span", { children: "Alt+O / Alt+R / Alt+P" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Tile tools" }),
            /* @__PURE__ */ o.jsx("span", { children: "Shift+S / Shift+P / Shift+R / Shift+N / Shift+E" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Trace Palette Range" }),
            /* @__PURE__ */ o.jsx("span", { children: "Reference panel button" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Trace Max Colors" }),
            /* @__PURE__ */ o.jsx("span", { children: "Reference panel button" })
          ] })
        ] })
      ] })
    ] }),
    c && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: () => u(!1) }),
      /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--license", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "License" }),
          /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => u(!1), children: "Close" })
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "modal__body modal__body--license", children: /* @__PURE__ */ o.jsx("pre", { className: "modal__license", children: 'MIT License Copyright (c) 2026 Joel Longanecker Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.' }) })
      ] })
    ] }),
    h && !e && /* @__PURE__ */ o.jsx(
      XM,
      {
        onClose: () => {
          p(!1);
        },
        onAdvancedModeChange: f
      }
    ),
    M && fe === "text" && /* @__PURE__ */ o.jsx(
      YM,
      {
        initialText: S,
        initialFontFamily: _,
        initialFontSize: j,
        onCancel: () => {
          v(!1), ve(m);
        },
        onConfirm: ({ text: y, fontFamily: E, fontSize: V }) => {
          b(y), k(E), A(V), AM({
            text: y,
            fontFamily: E,
            fontSize: V,
            paletteIndex: ny
          }), v(!1);
        }
      }
    ),
    L && fe === "ai" && !e && /* @__PURE__ */ o.jsx(
      WM,
      {
        initialPrompt: G,
        onCancel: () => {
          Y(!1), ve(N);
        },
        onConfirm: ({ prompt: y }) => {
          oe(y), Y(!1);
        }
      }
    )
  ] });
}, n_ = () => {
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
class s_ extends Te.Component {
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
      return /* @__PURE__ */ o.jsxs("div", { style: { padding: 16, fontFamily: "monospace", whiteSpace: "pre-wrap" }, children: [
        /* @__PURE__ */ o.jsx("h1", { style: { marginTop: 0 }, children: "Pixel Splash Studio demo crashed" }),
        /* @__PURE__ */ o.jsx("pre", { children: t })
      ] });
    }
    return this.props.children;
  }
}
const Zx = document.getElementById("root");
if (!Zx)
  throw new Error("Root element not found");
n_();
Rc.createRoot(Zx).render(
  /* @__PURE__ */ o.jsx(Te.StrictMode, { children: /* @__PURE__ */ o.jsx(s_, { children: /* @__PURE__ */ o.jsx(t_, {}) }) })
);
