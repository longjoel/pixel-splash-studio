function Qp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zp = { exports: {} }, Ko = {}, qp = { exports: {} }, be = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $i = Symbol.for("react.element"), Dy = Symbol.for("react.portal"), By = Symbol.for("react.fragment"), Yy = Symbol.for("react.strict_mode"), Xy = Symbol.for("react.profiler"), Fy = Symbol.for("react.provider"), Oy = Symbol.for("react.context"), zy = Symbol.for("react.forward_ref"), Hy = Symbol.for("react.suspense"), Wy = Symbol.for("react.memo"), Uy = Symbol.for("react.lazy"), Dh = Symbol.iterator;
function $y(e) {
  return e === null || typeof e != "object" ? null : (e = Dh && e[Dh] || e["@@iterator"], typeof e == "function" ? e : null);
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
function Bu(e, t, n) {
  this.props = e, this.context = t, this.refs = tm, this.updater = n || Jp;
}
var Yu = Bu.prototype = new nm();
Yu.constructor = Bu;
em(Yu, Vl.prototype);
Yu.isPureReactComponent = !0;
var Bh = Array.isArray, sm = Object.prototype.hasOwnProperty, Xu = { current: null }, lm = { key: !0, ref: !0, __self: !0, __source: !0 };
function im(e, t, n) {
  var s, l = {}, i = null, r = null;
  if (t != null) for (s in t.ref !== void 0 && (r = t.ref), t.key !== void 0 && (i = "" + t.key), t) sm.call(t, s) && !lm.hasOwnProperty(s) && (l[s] = t[s]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in a = e.defaultProps, a) l[s] === void 0 && (l[s] = a[s]);
  return { $$typeof: $i, type: e, key: i, ref: r, props: l, _owner: Xu.current };
}
function Vy(e, t) {
  return { $$typeof: $i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Fu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $i;
}
function Ky(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Yh = /\/+/g;
function Ba(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Ky("" + e.key) : t.toString(36);
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
        case Dy:
          r = !0;
      }
  }
  if (r) return r = e, l = l(r), e = s === "" ? "." + Ba(r, 0) : s, Bh(l) ? (n = "", e != null && (n = e.replace(Yh, "$&/") + "/"), Zr(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Fu(l) && (l = Vy(l, n + (!l.key || r && r.key === l.key ? "" : ("" + l.key).replace(Yh, "$&/") + "/") + e)), t.push(l)), 1;
  if (r = 0, s = s === "" ? "." : s + ":", Bh(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var c = s + Ba(i, a);
    r += Zr(i, t, n, c, l);
  }
  else if (c = $y(e), typeof c == "function") for (e = c.call(e), a = 0; !(i = e.next()).done; ) i = i.value, c = s + Ba(i, a++), r += Zr(i, t, n, c, l);
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
function Gy(e) {
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
var Dt = { current: null }, qr = { transition: null }, Qy = { ReactCurrentDispatcher: Dt, ReactCurrentBatchConfig: qr, ReactCurrentOwner: Xu };
function rm() {
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
be.Fragment = By;
be.Profiler = Xy;
be.PureComponent = Bu;
be.StrictMode = Yy;
be.Suspense = Hy;
be.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qy;
be.act = rm;
be.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = em({}, e.props), l = e.key, i = e.ref, r = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, r = Xu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) sm.call(t, c) && !lm.hasOwnProperty(c) && (s[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
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
  return e = { $$typeof: Oy, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Fy, _context: e }, e.Consumer = e;
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
  return { $$typeof: zy, render: e };
};
be.isValidElement = Fu;
be.lazy = function(e) {
  return { $$typeof: Uy, _payload: { _status: -1, _result: e }, _init: Gy };
};
be.memo = function(e, t) {
  return { $$typeof: Wy, type: e, compare: t === void 0 ? null : t };
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
be.unstable_act = rm;
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
var Zy = T, qy = Symbol.for("react.element"), Jy = Symbol.for("react.fragment"), ev = Object.prototype.hasOwnProperty, tv = Zy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, nv = { key: !0, ref: !0, __self: !0, __source: !0 };
function om(e, t, n) {
  var s, l = {}, i = null, r = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (r = t.ref);
  for (s in t) ev.call(t, s) && !nv.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: qy, type: e, key: i, ref: r, props: l, _owner: tv.current };
}
Ko.Fragment = Jy;
Ko.jsx = om;
Ko.jsxs = om;
Zp.exports = Ko;
var o = Zp.exports, Rc = {}, am = { exports: {} }, Jt = {}, cm = { exports: {} }, um = {};
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
  var c = [], u = [], h = 1, p = null, d = 3, f = !1, m = !1, S = !1, M = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, g = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(D) {
    for (var F = n(u); F !== null; ) {
      if (F.callback === null) s(u);
      else if (F.startTime <= D) s(u), F.sortIndex = F.expirationTime, t(c, F);
      else break;
      F = n(u);
    }
  }
  function w(D) {
    if (S = !1, y(D), !m) if (n(c) !== null) m = !0, Q(b);
    else {
      var F = n(u);
      F !== null && ne(w, F.startTime - D);
    }
  }
  function b(D, F) {
    m = !1, S && (S = !1, v(j), j = -1), f = !0;
    var K = d;
    try {
      for (y(F), p = n(c); p !== null && (!(p.expirationTime > F) || D && !Y()); ) {
        var le = p.callback;
        if (typeof le == "function") {
          p.callback = null, d = p.priorityLevel;
          var ae = le(p.expirationTime <= F);
          F = e.unstable_now(), typeof ae == "function" ? p.callback = ae : p === n(c) && s(c), y(F);
        } else s(c);
        p = n(c);
      }
      if (p !== null) var Me = !0;
      else {
        var X = n(u);
        X !== null && ne(w, X.startTime - F), Me = !1;
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
  if (typeof g == "function") O = function() {
    g(N);
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
    m || f || (m = !0, Q(b));
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
    return ae = K + ae, D = { id: h++, callback: F, priorityLevel: D, startTime: K, expirationTime: ae, sortIndex: -1 }, K > le ? (D.sortIndex = K, t(u, D), n(c) === null && D === n(u) && (S ? (v(j), j = -1) : S = !0, ne(w, K - le))) : (D.sortIndex = ae, t(c, D), m || f || (m = !0, Q(b))), D;
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
})(um);
cm.exports = um;
var sv = cm.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lv = T, qt = sv;
function H(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var dm = /* @__PURE__ */ new Set(), Ni = {};
function el(e, t) {
  Dl(e, t), Dl(e + "Capture", t);
}
function Dl(e, t) {
  for (Ni[e] = t, e = 0; e < t.length; e++) dm.add(t[e]);
}
var Vn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ac = Object.prototype.hasOwnProperty, iv = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Xh = {}, Fh = {};
function rv(e) {
  return Ac.call(Fh, e) ? !0 : Ac.call(Xh, e) ? !1 : iv.test(e) ? Fh[e] = !0 : (Xh[e] = !0, !1);
}
function ov(e, t, n, s) {
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
function av(e, t, n, s) {
  if (t === null || typeof t > "u" || ov(e, t, n, s)) return !0;
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
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (av(t, n, l, s) && (n = null), s || l === null ? rv(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var qn = lv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Nr = Symbol.for("react.element"), gl = Symbol.for("react.portal"), xl = Symbol.for("react.fragment"), Wu = Symbol.for("react.strict_mode"), Lc = Symbol.for("react.profiler"), hm = Symbol.for("react.provider"), fm = Symbol.for("react.context"), Uu = Symbol.for("react.forward_ref"), Dc = Symbol.for("react.suspense"), Bc = Symbol.for("react.suspense_list"), $u = Symbol.for("react.memo"), as = Symbol.for("react.lazy"), pm = Symbol.for("react.offscreen"), Oh = Symbol.iterator;
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
function cv(e) {
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
    case fm:
      return (e.displayName || "Context") + ".Consumer";
    case hm:
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
function uv(e) {
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
function mm(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function dv(e) {
  var t = mm(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
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
  e._valueTracker || (e._valueTracker = dv(e));
}
function gm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = mm(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
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
function xm(e, t) {
  t = t.checked, t != null && Hu(e, "checked", t, !1);
}
function Fc(e, t) {
  xm(e, t);
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
function ym(e, t) {
  var n = _s(t.value), s = _s(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function Uh(e) {
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
function Hc(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? vm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Ir, wm = function(e) {
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
}, hv = ["Webkit", "ms", "Moz", "O"];
Object.keys(yi).forEach(function(e) {
  hv.forEach(function(t) {
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
var fv = et({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Wc(e, t) {
  if (t) {
    if (fv[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(H(137, e));
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
function bm(e) {
  Nl ? Pl ? Pl.push(e) : Pl = [e] : Nl = e;
}
function _m() {
  if (Nl) {
    var e = Nl, t = Pl;
    if (Pl = Nl = null, $h(e), t) for (e = 0; e < t.length; e++) $h(t[e]);
  }
}
function Tm(e, t) {
  return e(t);
}
function km() {
}
var Oa = !1;
function Cm(e, t, n) {
  if (Oa) return e(t, n);
  Oa = !0;
  try {
    return Tm(e, t, n);
  } finally {
    Oa = !1, (Nl !== null || Pl !== null) && (km(), _m());
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
function pv(e, t, n, s, l, i, r, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (h) {
    this.onError(h);
  }
}
var vi = !1, mo = null, go = !1, Gc = null, mv = { onError: function(e) {
  vi = !0, mo = e;
} };
function gv(e, t, n, s, l, i, r, a, c) {
  vi = !1, mo = null, pv.apply(mv, arguments);
}
function xv(e, t, n, s, l, i, r, a, c) {
  if (gv.apply(this, arguments), vi) {
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
function jm(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Vh(e) {
  if (tl(e) !== e) throw Error(H(188));
}
function yv(e) {
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
function Nm(e) {
  return e = yv(e), e !== null ? Pm(e) : null;
}
function Pm(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Pm(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Im = qt.unstable_scheduleCallback, Kh = qt.unstable_cancelCallback, vv = qt.unstable_shouldYield, wv = qt.unstable_requestPaint, it = qt.unstable_now, Sv = qt.unstable_getCurrentPriorityLevel, Ku = qt.unstable_ImmediatePriority, Em = qt.unstable_UserBlockingPriority, xo = qt.unstable_NormalPriority, Mv = qt.unstable_LowPriority, Rm = qt.unstable_IdlePriority, Go = null, Bn = null;
function bv(e) {
  if (Bn && typeof Bn.onCommitFiberRoot == "function") try {
    Bn.onCommitFiberRoot(Go, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Cn = Math.clz32 ? Math.clz32 : kv, _v = Math.log, Tv = Math.LN2;
function kv(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (_v(e) / Tv | 0) | 0;
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
function Cv(e, t) {
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
function jv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var r = 31 - Cn(i), a = 1 << r, c = l[r];
    c === -1 ? (!(a & n) || a & s) && (l[r] = Cv(a, t)) : c <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Qc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Am() {
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
function Nv(e, t) {
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
function Lm(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Dm, Qu, Bm, Ym, Xm, Zc = !1, Ar = [], gs = null, xs = null, ys = null, Ei = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Map(), us = [], Pv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
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
function Iv(e, t, n, s, l) {
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
function Ev() {
  Zc = !1, gs !== null && Jr(gs) && (gs = null), xs !== null && Jr(xs) && (xs = null), ys !== null && Jr(ys) && (ys = null), Ei.forEach(Qh), Ri.forEach(Qh);
}
function li(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Zc || (Zc = !0, qt.unstable_scheduleCallback(qt.unstable_NormalPriority, Ev)));
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
  for (; 0 < us.length && (n = us[0], n.blockedOn === null); ) Fm(n), n.blockedOn === null && us.shift();
}
var Il = qn.ReactCurrentBatchConfig, vo = !0;
function Rv(e, t, n, s) {
  var l = Le, i = Il.transition;
  Il.transition = null;
  try {
    Le = 1, Zu(e, t, n, s);
  } finally {
    Le = l, Il.transition = i;
  }
}
function Av(e, t, n, s) {
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
    else if (Iv(l, e, t, n, s)) s.stopPropagation();
    else if (Gh(e, s), t & 4 && -1 < Pv.indexOf(e)) {
      for (; l !== null; ) {
        var i = Gi(l);
        if (i !== null && Dm(i), i = qc(e, t, n, s), i === null && qa(e, t, s, wo, n), i === l) break;
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
    if (e = jm(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return wo = e, null;
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
      switch (Sv()) {
        case Ku:
          return 1;
        case Em:
          return 4;
        case xo:
        case Mv:
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
var ps = null, qu = null, eo = null;
function zm() {
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
}, defaultPrevented: 0, isTrusted: 0 }, Ju = en(Kl), Ki = et({}, Kl, { view: 0, detail: 0 }), Lv = en(Ki), Ha, Wa, ii, Qo = et({}, Ki, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: ed, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ii && (ii && e.type === "mousemove" ? (Ha = e.screenX - ii.screenX, Wa = e.screenY - ii.screenY) : Wa = Ha = 0, ii = e), Ha);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Wa;
} }), qh = en(Qo), Dv = et({}, Qo, { dataTransfer: 0 }), Bv = en(Dv), Yv = et({}, Ki, { relatedTarget: 0 }), Ua = en(Yv), Xv = et({}, Kl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Fv = en(Xv), Ov = et({}, Kl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), zv = en(Ov), Hv = et({}, Kl, { data: 0 }), Jh = en(Hv), Wv = {
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
}, Uv = {
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
}, $v = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Vv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = $v[e]) ? !!t[e] : !1;
}
function ed() {
  return Vv;
}
var Kv = et({}, Ki, { key: function(e) {
  if (e.key) {
    var t = Wv[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = to(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Uv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: ed, charCode: function(e) {
  return e.type === "keypress" ? to(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? to(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Gv = en(Kv), Qv = et({}, Qo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ef = en(Qv), Zv = et({}, Ki, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: ed }), qv = en(Zv), Jv = et({}, Kl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), ew = en(Jv), tw = et({}, Qo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), nw = en(tw), sw = [9, 13, 27, 32], td = Vn && "CompositionEvent" in window, wi = null;
Vn && "documentMode" in document && (wi = document.documentMode);
var lw = Vn && "TextEvent" in window && !wi, Hm = Vn && (!td || wi && 8 < wi && 11 >= wi), tf = " ", nf = !1;
function Wm(e, t) {
  switch (e) {
    case "keyup":
      return sw.indexOf(t.keyCode) !== -1;
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
function iw(e, t) {
  switch (e) {
    case "compositionend":
      return Um(t);
    case "keypress":
      return t.which !== 32 ? null : (nf = !0, tf);
    case "textInput":
      return e = t.data, e === tf && nf ? null : e;
    default:
      return null;
  }
}
function rw(e, t) {
  if (yl) return e === "compositionend" || !td && Wm(e, t) ? (e = zm(), eo = qu = ps = null, yl = !1, e) : null;
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
var ow = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function sf(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!ow[e.type] : t === "textarea";
}
function $m(e, t, n, s) {
  bm(s), t = So(t, "onChange"), 0 < t.length && (n = new Ju("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var Si = null, Li = null;
function aw(e) {
  sg(e, 0);
}
function Zo(e) {
  var t = Sl(e);
  if (gm(t)) return e;
}
function cw(e, t) {
  if (e === "change") return t;
}
var Vm = !1;
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
  Vm = $a && (!document.documentMode || 9 < document.documentMode);
}
function rf() {
  Si && (Si.detachEvent("onpropertychange", Km), Li = Si = null);
}
function Km(e) {
  if (e.propertyName === "value" && Zo(Li)) {
    var t = [];
    $m(t, Li, e, Vu(e)), Cm(aw, t);
  }
}
function uw(e, t, n) {
  e === "focusin" ? (rf(), Si = t, Li = n, Si.attachEvent("onpropertychange", Km)) : e === "focusout" && rf();
}
function dw(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zo(Li);
}
function hw(e, t) {
  if (e === "click") return Zo(t);
}
function fw(e, t) {
  if (e === "input" || e === "change") return Zo(t);
}
function pw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Nn = typeof Object.is == "function" ? Object.is : pw;
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
function Gm(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Gm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Qm() {
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
function mw(e) {
  var t = Qm(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Gm(n.ownerDocument.documentElement, n)) {
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
var gw = Vn && "documentMode" in document && 11 >= document.documentMode, vl = null, Jc = null, Mi = null, eu = !1;
function cf(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  eu || vl == null || vl !== po(s) || (s = vl, "selectionStart" in s && nd(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Mi && Di(Mi, s) || (Mi = s, s = So(Jc, "onSelect"), 0 < s.length && (t = new Ju("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = vl)));
}
function Dr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var wl = { animationend: Dr("Animation", "AnimationEnd"), animationiteration: Dr("Animation", "AnimationIteration"), animationstart: Dr("Animation", "AnimationStart"), transitionend: Dr("Transition", "TransitionEnd") }, Ka = {}, Zm = {};
Vn && (Zm = document.createElement("div").style, "AnimationEvent" in window || (delete wl.animationend.animation, delete wl.animationiteration.animation, delete wl.animationstart.animation), "TransitionEvent" in window || delete wl.transitionend.transition);
function qo(e) {
  if (Ka[e]) return Ka[e];
  if (!wl[e]) return e;
  var t = wl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Zm) return Ka[e] = t[n];
  return e;
}
var qm = qo("animationend"), Jm = qo("animationiteration"), eg = qo("animationstart"), tg = qo("transitionend"), ng = /* @__PURE__ */ new Map(), uf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ks(e, t) {
  ng.set(e, t), el(t, [e]);
}
for (var Ga = 0; Ga < uf.length; Ga++) {
  var Qa = uf[Ga], xw = Qa.toLowerCase(), yw = Qa[0].toUpperCase() + Qa.slice(1);
  ks(xw, "on" + yw);
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
var gi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vw = new Set("cancel close invalid load scroll toggle".split(" ").concat(gi));
function df(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, xv(s, t, void 0, e), e.currentTarget = null;
}
function sg(e, t) {
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
  n.has(s) || (lg(t, e, 2, !1), n.add(s));
}
function Za(e, t, n) {
  var s = 0;
  t && (s |= 4), lg(n, e, s, t);
}
var Br = "_reactListening" + Math.random().toString(36).slice(2);
function Bi(e) {
  if (!e[Br]) {
    e[Br] = !0, dm.forEach(function(n) {
      n !== "selectionchange" && (vw.has(n) || Za(n, !1, e), Za(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Br] || (t[Br] = !0, Za("selectionchange", !1, t));
  }
}
function lg(e, t, n, s) {
  switch (Om(t)) {
    case 1:
      var l = Rv;
      break;
    case 4:
      l = Av;
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
  Cm(function() {
    var u = i, h = Vu(n), p = [];
    e: {
      var d = ng.get(e);
      if (d !== void 0) {
        var f = Ju, m = e;
        switch (e) {
          case "keypress":
            if (to(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = Gv;
            break;
          case "focusin":
            m = "focus", f = Ua;
            break;
          case "focusout":
            m = "blur", f = Ua;
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
            f = Bv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = qv;
            break;
          case qm:
          case Jm:
          case eg:
            f = Fv;
            break;
          case tg:
            f = ew;
            break;
          case "scroll":
            f = Lv;
            break;
          case "wheel":
            f = nw;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = zv;
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
        var S = (t & 4) !== 0, M = !S && e === "scroll", v = S ? d !== null ? d + "Capture" : null : d;
        S = [];
        for (var g = u, y; g !== null; ) {
          y = g;
          var w = y.stateNode;
          if (y.tag === 5 && w !== null && (y = w, v !== null && (w = Ii(g, v), w != null && S.push(Yi(g, w, y)))), M) break;
          g = g.return;
        }
        0 < S.length && (d = new f(d, m, null, n, h), p.push({ event: d, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", d && n !== $c && (m = n.relatedTarget || n.fromElement) && (Xs(m) || m[Kn])) break e;
        if ((f || d) && (d = h.window === h ? h : (d = h.ownerDocument) ? d.defaultView || d.parentWindow : window, f ? (m = n.relatedTarget || n.toElement, f = u, m = m ? Xs(m) : null, m !== null && (M = tl(m), m !== M || m.tag !== 5 && m.tag !== 6) && (m = null)) : (f = null, m = u), f !== m)) {
          if (S = qh, w = "onMouseLeave", v = "onMouseEnter", g = "mouse", (e === "pointerout" || e === "pointerover") && (S = ef, w = "onPointerLeave", v = "onPointerEnter", g = "pointer"), M = f == null ? d : Sl(f), y = m == null ? d : Sl(m), d = new S(w, g + "leave", f, n, h), d.target = M, d.relatedTarget = y, w = null, Xs(h) === u && (S = new S(v, g + "enter", m, n, h), S.target = y, S.relatedTarget = M, w = S), M = w, f && m) t: {
            for (S = f, v = m, g = 0, y = S; y; y = dl(y)) g++;
            for (y = 0, w = v; w; w = dl(w)) y++;
            for (; 0 < g - y; ) S = dl(S), g--;
            for (; 0 < y - g; ) v = dl(v), y--;
            for (; g--; ) {
              if (S === v || v !== null && S === v.alternate) break t;
              S = dl(S), v = dl(v);
            }
            S = null;
          }
          else S = null;
          f !== null && hf(p, d, f, S, !1), m !== null && M !== null && hf(p, M, m, S, !0);
        }
      }
      e: {
        if (d = u ? Sl(u) : window, f = d.nodeName && d.nodeName.toLowerCase(), f === "select" || f === "input" && d.type === "file") var b = cw;
        else if (sf(d)) if (Vm) b = fw;
        else {
          b = dw;
          var _ = uw;
        }
        else (f = d.nodeName) && f.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (b = hw);
        if (b && (b = b(e, u))) {
          $m(p, b, n, h);
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
          if (gw) break;
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
      else yl ? Wm(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (Hm && n.locale !== "ko" && (yl || j !== "onCompositionStart" ? j === "onCompositionEnd" && yl && (k = zm()) : (ps = h, qu = "value" in ps ? ps.value : ps.textContent, yl = !0)), _ = So(u, j), 0 < _.length && (j = new Jh(j, e, null, n, h), p.push({ event: j, listeners: _ }), k ? j.data = k : (k = Um(n), k !== null && (j.data = k)))), (k = lw ? iw(e, n) : rw(e, n)) && (u = So(u, "onBeforeInput"), 0 < u.length && (h = new Jh("onBeforeInput", "beforeinput", null, n, h), p.push({ event: h, listeners: u }), h.data = k));
    }
    sg(p, t);
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
var ww = /\r\n?/g, Sw = /\u0000|\uFFFD/g;
function ff(e) {
  return (typeof e == "string" ? e : "" + e).replace(ww, `
`).replace(Sw, "");
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
var lu = typeof setTimeout == "function" ? setTimeout : void 0, Mw = typeof clearTimeout == "function" ? clearTimeout : void 0, pf = typeof Promise == "function" ? Promise : void 0, bw = typeof queueMicrotask == "function" ? queueMicrotask : typeof pf < "u" ? function(e) {
  return pf.resolve(null).then(e).catch(_w);
} : lu;
function _w(e) {
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
var Gl = Math.random().toString(36).slice(2), Dn = "__reactFiber$" + Gl, Xi = "__reactProps$" + Gl, Kn = "__reactContainer$" + Gl, iu = "__reactEvents$" + Gl, Tw = "__reactListeners$" + Gl, kw = "__reactHandles$" + Gl;
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
function ig(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(H(108, uv(e) || "Unknown", l));
  return et({}, n, s);
}
function _o(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ts, $s = Pt.current, Xe(Pt, e), Xe(Ht, Ht.current), !0;
}
function xf(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(H(169));
  n ? (e = ig(e, t, $s), s.__reactInternalMemoizedMergedChildContext = e, We(Ht), We(Pt), Xe(Pt, e)) : We(Ht), Xe(Ht, n);
}
var zn = null, ea = !1, ec = !1;
function rg(e) {
  zn === null ? zn = [e] : zn.push(e);
}
function Cw(e) {
  ea = !0, rg(e);
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
      throw zn !== null && (zn = zn.slice(e + 1)), Im(Ku, js), l;
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
function og(e, t, n) {
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
  e.return !== null && (Ds(e, 1), og(e, 1, 0));
}
function ld(e) {
  for (; e === To; ) To = bl[--_l], bl[_l] = null, ko = bl[--_l], bl[_l] = null;
  for (; e === Vs; ) Vs = dn[--hn], dn[hn] = null, Wn = dn[--hn], dn[hn] = null, Hn = dn[--hn], dn[hn] = null;
}
var Zt = null, Qt = null, Qe = !1, kn = null;
function ag(e, t) {
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
        t && yf(e, t) ? ag(s, n) : (e.flags = e.flags & -4097 | 2, Qe = !1, Zt = e);
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
    if (ou(e)) throw cg(), Error(H(418));
    for (; t; ) ag(e, t), t = vs(t.nextSibling);
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
function cg() {
  for (var e = Qt; e; ) e = vs(e.nextSibling);
}
function Yl() {
  Qt = Zt = null, Qe = !1;
}
function id(e) {
  kn === null ? kn = [e] : kn.push(e);
}
var jw = qn.ReactCurrentBatchConfig;
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
function ug(e) {
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
    return v = bs(v, g), v.index = 0, v.sibling = null, v;
  }
  function i(v, g, y) {
    return v.index = y, e ? (y = v.alternate, y !== null ? (y = y.index, y < g ? (v.flags |= 2, g) : y) : (v.flags |= 2, g)) : (v.flags |= 1048576, g);
  }
  function r(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, g, y, w) {
    return g === null || g.tag !== 6 ? (g = oc(y, v.mode, w), g.return = v, g) : (g = l(g, y), g.return = v, g);
  }
  function c(v, g, y, w) {
    var b = y.type;
    return b === xl ? h(v, g, y.props.children, w, y.key) : g !== null && (g.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && wf(b) === g.type) ? (w = l(g, y.props), w.ref = ri(v, g, y), w.return = v, w) : (w = ao(y.type, y.key, y.props, null, v.mode, w), w.ref = ri(v, g, y), w.return = v, w);
  }
  function u(v, g, y, w) {
    return g === null || g.tag !== 4 || g.stateNode.containerInfo !== y.containerInfo || g.stateNode.implementation !== y.implementation ? (g = ac(y, v.mode, w), g.return = v, g) : (g = l(g, y.children || []), g.return = v, g);
  }
  function h(v, g, y, w, b) {
    return g === null || g.tag !== 7 ? (g = Ws(y, v.mode, w, b), g.return = v, g) : (g = l(g, y), g.return = v, g);
  }
  function p(v, g, y) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return g = oc("" + g, v.mode, y), g.return = v, g;
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Nr:
          return y = ao(g.type, g.key, g.props, null, v.mode, y), y.ref = ri(v, null, g), y.return = v, y;
        case gl:
          return g = ac(g, v.mode, y), g.return = v, g;
        case as:
          var w = g._init;
          return p(v, w(g._payload), y);
      }
      if (pi(g) || ti(g)) return g = Ws(g, v.mode, y, null), g.return = v, g;
      Fr(v, g);
    }
    return null;
  }
  function d(v, g, y, w) {
    var b = g !== null ? g.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return b !== null ? null : a(v, g, "" + y, w);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Nr:
          return y.key === b ? c(v, g, y, w) : null;
        case gl:
          return y.key === b ? u(v, g, y, w) : null;
        case as:
          return b = y._init, d(
            v,
            g,
            b(y._payload),
            w
          );
      }
      if (pi(y) || ti(y)) return b !== null ? null : h(v, g, y, w, null);
      Fr(v, y);
    }
    return null;
  }
  function f(v, g, y, w, b) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return v = v.get(y) || null, a(g, v, "" + w, b);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case Nr:
          return v = v.get(w.key === null ? y : w.key) || null, c(g, v, w, b);
        case gl:
          return v = v.get(w.key === null ? y : w.key) || null, u(g, v, w, b);
        case as:
          var _ = w._init;
          return f(v, g, y, _(w._payload), b);
      }
      if (pi(w) || ti(w)) return v = v.get(y) || null, h(g, v, w, b, null);
      Fr(g, w);
    }
    return null;
  }
  function m(v, g, y, w) {
    for (var b = null, _ = null, k = g, j = g = 0, A = null; k !== null && j < y.length; j++) {
      k.index > j ? (A = k, k = null) : A = k.sibling;
      var L = d(v, k, y[j], w);
      if (L === null) {
        k === null && (k = A);
        break;
      }
      e && k && L.alternate === null && t(v, k), g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L, k = A;
    }
    if (j === y.length) return n(v, k), Qe && Ds(v, j), b;
    if (k === null) {
      for (; j < y.length; j++) k = p(v, y[j], w), k !== null && (g = i(k, g, j), _ === null ? b = k : _.sibling = k, _ = k);
      return Qe && Ds(v, j), b;
    }
    for (k = s(v, k); j < y.length; j++) A = f(k, v, j, y[j], w), A !== null && (e && A.alternate !== null && k.delete(A.key === null ? j : A.key), g = i(A, g, j), _ === null ? b = A : _.sibling = A, _ = A);
    return e && k.forEach(function(Y) {
      return t(v, Y);
    }), Qe && Ds(v, j), b;
  }
  function S(v, g, y, w) {
    var b = ti(y);
    if (typeof b != "function") throw Error(H(150));
    if (y = b.call(y), y == null) throw Error(H(151));
    for (var _ = b = null, k = g, j = g = 0, A = null, L = y.next(); k !== null && !L.done; j++, L = y.next()) {
      k.index > j ? (A = k, k = null) : A = k.sibling;
      var Y = d(v, k, L.value, w);
      if (Y === null) {
        k === null && (k = A);
        break;
      }
      e && k && Y.alternate === null && t(v, k), g = i(Y, g, j), _ === null ? b = Y : _.sibling = Y, _ = Y, k = A;
    }
    if (L.done) return n(
      v,
      k
    ), Qe && Ds(v, j), b;
    if (k === null) {
      for (; !L.done; j++, L = y.next()) L = p(v, L.value, w), L !== null && (g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L);
      return Qe && Ds(v, j), b;
    }
    for (k = s(v, k); !L.done; j++, L = y.next()) L = f(k, v, j, L.value, w), L !== null && (e && L.alternate !== null && k.delete(L.key === null ? j : L.key), g = i(L, g, j), _ === null ? b = L : _.sibling = L, _ = L);
    return e && k.forEach(function(N) {
      return t(v, N);
    }), Qe && Ds(v, j), b;
  }
  function M(v, g, y, w) {
    if (typeof y == "object" && y !== null && y.type === xl && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Nr:
          e: {
            for (var b = y.key, _ = g; _ !== null; ) {
              if (_.key === b) {
                if (b = y.type, b === xl) {
                  if (_.tag === 7) {
                    n(v, _.sibling), g = l(_, y.props.children), g.return = v, v = g;
                    break e;
                  }
                } else if (_.elementType === b || typeof b == "object" && b !== null && b.$$typeof === as && wf(b) === _.type) {
                  n(v, _.sibling), g = l(_, y.props), g.ref = ri(v, _, y), g.return = v, v = g;
                  break e;
                }
                n(v, _);
                break;
              } else t(v, _);
              _ = _.sibling;
            }
            y.type === xl ? (g = Ws(y.props.children, v.mode, w, y.key), g.return = v, v = g) : (w = ao(y.type, y.key, y.props, null, v.mode, w), w.ref = ri(v, g, y), w.return = v, v = w);
          }
          return r(v);
        case gl:
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
            g = ac(y, v.mode, w), g.return = v, v = g;
          }
          return r(v);
        case as:
          return _ = y._init, M(v, g, _(y._payload), w);
      }
      if (pi(y)) return m(v, g, y, w);
      if (ti(y)) return S(v, g, y, w);
      Fr(v, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, g !== null && g.tag === 6 ? (n(v, g.sibling), g = l(g, y), g.return = v, v = g) : (n(v, g), g = oc(y, v.mode, w), g.return = v, v = g), r(v)) : n(v, g);
  }
  return M;
}
var Xl = ug(!0), dg = ug(!1), Co = Cs(null), jo = null, Tl = null, rd = null;
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
function hg(e, t, n, s) {
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
          var m = e, S = a;
          switch (d = t, f = n, S.tag) {
            case 1:
              if (m = S.payload, typeof m == "function") {
                p = m.call(f, p, d);
                break e;
              }
              p = m;
              break e;
            case 3:
              m.flags = m.flags & -65537 | 128;
            case 0:
              if (m = S.payload, d = typeof m == "function" ? m.call(f, p, d) : m, d == null) break e;
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
function pg(e) {
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
var so = qn.ReactCurrentDispatcher, nc = qn.ReactCurrentBatchConfig, Ks = 0, Je = null, ht = null, gt = null, Io = !1, bi = !1, zi = 0, Nw = 0;
function kt() {
  throw Error(H(321));
}
function pd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Nn(e[n], t[n])) return !1;
  return !0;
}
function md(e, t, n, s, l, i) {
  if (Ks = i, Je = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, so.current = e === null || e.memoizedState === null ? Rw : Aw, e = n(s, l), bi) {
    i = 0;
    do {
      if (bi = !1, zi = 0, 25 <= i) throw Error(H(301));
      i += 1, gt = ht = null, t.updateQueue = null, so.current = Lw, e = n(s, l);
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
function mg() {
}
function gg(e, t) {
  var n = Je, s = vn(), l = t(), i = !Nn(s.memoizedState, l);
  if (i && (s.memoizedState = l, Ft = !0), s = s.queue, xd(vg.bind(null, n, s, e), [e]), s.getSnapshot !== t || i || gt !== null && gt.memoizedState.tag & 1) {
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
    return !Nn(e, n);
  } catch {
    return !0;
  }
}
function Sg(e) {
  var t = Gn(e, 1);
  t !== null && jn(t, e, 1, -1);
}
function bf(e) {
  var t = Ln();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Hi, lastRenderedState: e }, t.queue = e, e = e.dispatch = Ew.bind(null, Je, e), [t.memoizedState, e];
}
function Wi(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = Je.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, Je.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function Mg() {
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
function bg(e, t) {
  return ta(4, 2, e, t);
}
function _g(e, t) {
  return ta(4, 4, e, t);
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
  return n = n != null ? n.concat([e]) : null, ta(4, 4, Tg.bind(null, t, e), n);
}
function yd() {
}
function Cg(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && pd(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function jg(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && pd(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ng(e, t, n) {
  return Ks & 21 ? (Nn(n, t) || (n = Am(), Je.lanes |= n, Gs |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ft = !0), e.memoizedState = n);
}
function Pw(e, t) {
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
function Pg() {
  return vn().memoizedState;
}
function Iw(e, t, n) {
  var s = Ms(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, Ig(e)) Eg(t, n);
  else if (n = hg(e, t, n, s), n !== null) {
    var l = Lt();
    jn(n, e, s, l), Rg(n, t, s);
  }
}
function Ew(e, t, n) {
  var s = Ms(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Ig(e)) Eg(t, l);
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
    n = hg(e, t, l, s), n !== null && (l = Lt(), jn(n, e, s, l), Rg(n, t, s));
  }
}
function Ig(e) {
  var t = e.alternate;
  return e === Je || t !== null && t === Je;
}
function Eg(e, t) {
  bi = Io = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Rg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Gu(e, n);
  }
}
var Eo = { readContext: yn, useCallback: kt, useContext: kt, useEffect: kt, useImperativeHandle: kt, useInsertionEffect: kt, useLayoutEffect: kt, useMemo: kt, useReducer: kt, useRef: kt, useState: kt, useDebugValue: kt, useDeferredValue: kt, useTransition: kt, useMutableSource: kt, useSyncExternalStore: kt, useId: kt, unstable_isNewReconciler: !1 }, Rw = { readContext: yn, useCallback: function(e, t) {
  return Ln().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: yn, useEffect: _f, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, lo(
    4194308,
    4,
    Tg.bind(null, t, e),
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
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = Iw.bind(null, Je, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = Ln();
  return e = { current: e }, t.memoizedState = e;
}, useState: bf, useDebugValue: yd, useDeferredValue: function(e) {
  return Ln().memoizedState = e;
}, useTransition: function() {
  var e = bf(!1), t = e[0];
  return e = Pw.bind(null, e[1]), Ln().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = Je, l = Ln();
  if (Qe) {
    if (n === void 0) throw Error(H(407));
    n = n();
  } else {
    if (n = t(), xt === null) throw Error(H(349));
    Ks & 30 || xg(s, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, _f(vg.bind(
    null,
    s,
    i,
    e
  ), [e]), s.flags |= 2048, Wi(9, yg.bind(null, s, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Ln(), t = xt.identifierPrefix;
  if (Qe) {
    var n = Wn, s = Hn;
    n = (s & ~(1 << 32 - Cn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Nw++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Aw = {
  readContext: yn,
  useCallback: Cg,
  useContext: yn,
  useEffect: xd,
  useImperativeHandle: kg,
  useInsertionEffect: bg,
  useLayoutEffect: _g,
  useMemo: jg,
  useReducer: sc,
  useRef: Mg,
  useState: function() {
    return sc(Hi);
  },
  useDebugValue: yd,
  useDeferredValue: function(e) {
    var t = vn();
    return Ng(t, ht.memoizedState, e);
  },
  useTransition: function() {
    var e = sc(Hi)[0], t = vn().memoizedState;
    return [e, t];
  },
  useMutableSource: mg,
  useSyncExternalStore: gg,
  useId: Pg,
  unstable_isNewReconciler: !1
}, Lw = { readContext: yn, useCallback: Cg, useContext: yn, useEffect: xd, useImperativeHandle: kg, useInsertionEffect: bg, useLayoutEffect: _g, useMemo: jg, useReducer: lc, useRef: Mg, useState: function() {
  return lc(Hi);
}, useDebugValue: yd, useDeferredValue: function(e) {
  var t = vn();
  return ht === null ? t.memoizedState = e : Ng(t, ht.memoizedState, e);
}, useTransition: function() {
  var e = lc(Hi)[0], t = vn().memoizedState;
  return [e, t];
}, useMutableSource: mg, useSyncExternalStore: gg, useId: Pg, unstable_isNewReconciler: !1 };
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
function Ag(e, t, n) {
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
      n += cv(s), s = s.return;
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
var Dw = typeof WeakMap == "function" ? WeakMap : Map;
function Lg(e, t, n) {
  n = Un(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    Ao || (Ao = !0, Mu = s), hu(e, t);
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
    s = e.pingCache = new Dw();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = Qw.bind(null, e, t, n), t.then(e, e));
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
var Bw = qn.ReactCurrentOwner, Ft = !1;
function At(e, t, n, s) {
  t.child = e === null ? dg(t, null, n, s) : Xl(t, e.child, n, s);
}
function Pf(e, t, n, s, l) {
  n = n.render;
  var i = t.ref;
  return El(t, l), s = md(e, t, n, s, i, l), n = gd(), e !== null && !Ft ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Qn(e, t, l)) : (Qe && n && sd(t), t.flags |= 1, At(e, t, s, l), t.child);
}
function If(e, t, n, s, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !kd(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Bg(e, t, i, s, l)) : (e = ao(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var r = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Di, n(r, s) && e.ref === t.ref) return Qn(e, t, l);
  }
  return t.flags |= 1, e = bs(i, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Bg(e, t, n, s, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Di(i, s) && e.ref === t.ref) if (Ft = !1, t.pendingProps = s = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ft = !0);
    else return t.lanes = e.lanes, Qn(e, t, l);
  }
  return fu(e, t, n, s, l);
}
function Yg(e, t, n) {
  var s = t.pendingProps, l = s.children, i = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Xe(Cl, Kt), Kt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Xe(Cl, Kt), Kt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = i !== null ? i.baseLanes : n, Xe(Cl, Kt), Kt |= s;
  }
  else i !== null ? (s = i.baseLanes | n, t.memoizedState = null) : s = n, Xe(Cl, Kt), Kt |= s;
  return At(e, t, l, n), t.child;
}
function Xg(e, t) {
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
  if (El(t, l), t.stateNode === null) io(e, t), Ag(t, n, s), du(t, n, s, l), s = !0;
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
    r = t.stateNode, fg(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : bn(t.type, a), r.props = u, p = t.pendingProps, d = r.context, c = n.contextType, typeof c == "object" && c !== null ? c = yn(c) : (c = Wt(n) ? $s : Pt.current, c = Bl(t, c));
    var f = n.getDerivedStateFromProps;
    (h = typeof f == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (a !== p || d !== c) && kf(t, r, s, c), cs = !1, d = t.memoizedState, r.state = d, No(t, s, r, l);
    var m = t.memoizedState;
    a !== p || d !== m || Ht.current || cs ? (typeof f == "function" && (uu(t, n, f, s), m = t.memoizedState), (u = cs || Tf(t, n, u, s, d, m, c) || !1) ? (h || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(s, m, c), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(s, m, c)), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = m), r.props = s, r.state = m, r.context = c, s = u) : (typeof r.componentDidUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return pu(e, t, n, s, i, l);
}
function pu(e, t, n, s, l, i) {
  Xg(e, t);
  var r = (t.flags & 128) !== 0;
  if (!s && !r) return l && xf(t, n, !1), Qn(e, t, i);
  s = t.stateNode, Bw.current = t;
  var a = r && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && r ? (t.child = Xl(t, e.child, null, i), t.child = Xl(t, null, a, i)) : At(e, t, a, i), t.memoizedState = s.state, l && xf(t, n, !0), t.child;
}
function Fg(e) {
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
function Og(e, t, n) {
  var s = t.pendingProps, l = qe.current, i = !1, r = (t.flags & 128) !== 0, a;
  if ((a = r) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Xe(qe, l & 1), e === null)
    return au(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (r = s.children, e = s.fallback, i ? (s = t.mode, i = t.child, r = { mode: "hidden", children: r }, !(s & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = r) : i = ia(r, s, 0, null), e = Ws(e, s, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = gu(n), t.memoizedState = mu, e) : vd(t, r));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return Yw(e, t, r, s, a, l, n);
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
function Yw(e, t, n, s, l, i, r) {
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
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Zw.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, Qt = vs(l.nextSibling), Zt = t, Qe = !0, kn = null, e !== null && (dn[hn++] = Hn, dn[hn++] = Wn, dn[hn++] = Vs, Hn = e.id, Wn = e.overflow, Vs = t), t = vd(t, s.children), t.flags |= 4096, t);
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
function zg(e, t, n) {
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
function Xw(e, t, n) {
  switch (t.tag) {
    case 3:
      Fg(t), Yl();
      break;
    case 5:
      pg(t);
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
var Hg, xu, Wg, Ug;
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
xu = function() {
};
Wg = function(e, t, n, s) {
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
Ug = function(e, t, n, s) {
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
function Fw(e, t, n) {
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
      if (n = t.type, e !== null && t.stateNode != null) Wg(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
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
          r = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = vm(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = r.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = r.createElement(n, { is: s.is }) : (e = r.createElement(n), n === "select" && (r = e, s.multiple ? r.multiple = !0 : s.size && (r.size = s.size))) : e = r.createElementNS(e, n), e[Dn] = t, e[Xi] = s, Hg(e, t, !1, !1), t.stateNode = e;
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
              i === "style" ? Mm(e, c) : i === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && wm(e, c)) : i === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Pi(e, c) : typeof c == "number" && Pi(e, "" + c) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Ni.hasOwnProperty(i) ? c != null && i === "onScroll" && He("scroll", e) : c != null && Hu(e, i, c, r));
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
      if (e && t.stateNode != null) Ug(e, t, e.memoizedProps, s);
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
        if (Qe && Qt !== null && t.mode & 1 && !(t.flags & 128)) cg(), Yl(), t.flags |= 98560, i = !1;
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
function Ow(e, t) {
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
var zr = !1, jt = !1, zw = typeof WeakSet == "function" ? WeakSet : Set, J = null;
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
function Hw(e, t) {
  if (tu = vo, e = Qm(), nd(e)) {
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
      var m = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (m !== null) {
            var S = m.memoizedProps, M = m.memoizedState, v = t.stateNode, g = v.getSnapshotBeforeUpdate(t.elementType === t.type ? S : bn(t.type, S), M);
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
          throw Error(H(163));
      }
    } catch (w) {
      nt(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, J = e;
      break;
    }
    J = t.return;
  }
  return m = Lf, Lf = !1, m;
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
function $g(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, $g(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Dn], delete t[Xi], delete t[iu], delete t[Tw], delete t[kw])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Vg(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Df(e) {
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
  for (n = n.child; n !== null; ) Kg(e, t, n), n = n.sibling;
}
function Kg(e, t, n) {
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
    n === null && (n = e.stateNode = new zw()), t.forEach(function(s) {
      var l = qw.bind(null, e, s);
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
      Kg(i, r, l), wt = null, _n = !1;
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
      if (Sn(t, e), An(e), s & 4) {
        try {
          _i(3, e, e.return), sa(3, e);
        } catch (S) {
          nt(e, e.return, S);
        }
        try {
          _i(5, e, e.return);
        } catch (S) {
          nt(e, e.return, S);
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
        } catch (S) {
          nt(e, e.return, S);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, r = n !== null ? n.memoizedProps : i, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && i.type === "radio" && i.name != null && xm(l, i), Uc(a, r);
          var u = Uc(a, i);
          for (r = 0; r < c.length; r += 2) {
            var h = c[r], p = c[r + 1];
            h === "style" ? Mm(l, p) : h === "dangerouslySetInnerHTML" ? wm(l, p) : h === "children" ? Pi(l, p) : Hu(l, h, p, u);
          }
          switch (a) {
            case "input":
              Fc(l, i);
              break;
            case "textarea":
              ym(l, i);
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
        } catch (S) {
          nt(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Sn(t, e), An(e), s & 4) {
        if (e.stateNode === null) throw Error(H(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (S) {
          nt(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Sn(t, e), An(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ai(t.containerInfo);
      } catch (S) {
        nt(e, e.return, S);
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
                var m = d.stateNode;
                if (typeof m.componentWillUnmount == "function") {
                  s = d, n = d.return;
                  try {
                    t = s, m.props = t.memoizedProps, m.state = t.memoizedState, m.componentWillUnmount();
                  } catch (S) {
                    nt(s, n, S);
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
                l = p.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = p.stateNode, c = p.memoizedProps.style, r = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = Sm("display", r));
              } catch (S) {
                nt(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (h === null) try {
              p.stateNode.nodeValue = u ? "" : p.memoizedProps;
            } catch (S) {
              nt(e, e.return, S);
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
function Ww(e, t, n) {
  J = e, Qg(e);
}
function Qg(e, t, n) {
  for (var s = (e.mode & 1) !== 0; J !== null; ) {
    var l = J, i = l.child;
    if (l.tag === 22 && s) {
      var r = l.memoizedState !== null || zr;
      if (!r) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || jt;
        a = zr;
        var u = jt;
        if (zr = r, (jt = c) && !u) for (J = l; J !== null; ) r = J, c = r.child, r.tag === 22 && r.memoizedState !== null ? Ff(l) : c !== null ? (c.return = r, J = c) : Ff(l);
        for (; i !== null; ) J = i, Qg(i), i = i.sibling;
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
var Uw = Math.ceil, Ro = qn.ReactCurrentDispatcher, wd = qn.ReactCurrentOwner, xn = qn.ReactCurrentBatchConfig, ke = 0, xt = null, dt = null, bt = 0, Kt = 0, Cl = Cs(0), ft = 0, Ui = null, Gs = 0, la = 0, Sd = 0, Ti = null, Xt = null, Md = 0, zl = 1 / 0, Fn = null, Ao = !1, Mu = null, Ss = null, Hr = !1, ms = null, Lo = 0, ki = 0, bu = null, ro = -1, oo = 0;
function Lt() {
  return ke & 6 ? it() : ro !== -1 ? ro : ro = it();
}
function Ms(e) {
  return e.mode & 1 ? ke & 2 && bt !== 0 ? bt & -bt : jw.transition !== null ? (oo === 0 && (oo = Am()), oo) : (e = Le, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Om(e.type)), e) : 1;
}
function jn(e, t, n, s) {
  if (50 < ki) throw ki = 0, bu = null, Error(H(185));
  Vi(e, n, s), (!(ke & 2) || e !== xt) && (e === xt && (!(ke & 2) && (la |= n), ft === 4 && ds(e, bt)), Ut(e, s), n === 1 && ke === 0 && !(t.mode & 1) && (zl = it() + 500, ea && js()));
}
function Ut(e, t) {
  var n = e.callbackNode;
  jv(e, t);
  var s = yo(e, e === xt ? bt : 0);
  if (s === 0) n !== null && Kh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Kh(n), t === 1) e.tag === 0 ? Cw(Of.bind(null, e)) : rg(Of.bind(null, e)), bw(function() {
      !(ke & 6) && js();
    }), n = null;
    else {
      switch (Lm(s)) {
        case 1:
          n = Ku;
          break;
        case 4:
          n = Em;
          break;
        case 16:
          n = xo;
          break;
        case 536870912:
          n = Rm;
          break;
        default:
          n = xo;
      }
      n = lx(n, Zg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Zg(e, t) {
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
    var i = Jg();
    (xt !== e || bt !== t) && (Fn = null, zl = it() + 500, Hs(e, t));
    do
      try {
        Kw();
        break;
      } catch (a) {
        qg(e, a);
      }
    while (!0);
    od(), Ro.current = i, ke = l, dt !== null ? t = 0 : (xt = null, bt = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (l = Qc(e), l !== 0 && (s = l, t = _u(e, l))), t === 1) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
    if (t === 6) ds(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !$w(l) && (t = Do(e, s), t === 2 && (i = Qc(e), i !== 0 && (s = i, t = _u(e, i))), t === 1)) throw n = Ui, Hs(e, 0), ds(e, s), Ut(e, it()), n;
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
          if (s = l, s = it() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * Uw(s / 1960)) - s, 10 < s) {
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
  return Ut(e, it()), e.callbackNode === n ? Zg.bind(null, e) : null;
}
function _u(e, t) {
  var n = Ti;
  return e.current.memoizedState.isDehydrated && (Hs(e, t).flags |= 256), e = Do(e, t), e !== 2 && (t = Xt, Xt = n, t !== null && Tu(t)), e;
}
function Tu(e) {
  Xt === null ? Xt = e : Xt.push.apply(Xt, e);
}
function $w(e) {
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
  if (n !== -1 && (e.timeoutHandle = -1, Mw(n)), dt !== null) for (n = dt.return; n !== null; ) {
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
function qg(e, t) {
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
            var m = t.updateQueue;
            if (m === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(c), t.updateQueue = S;
            } else m.add(c);
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
              var v = Lg(i, c, t);
              Sf(i, v);
              break e;
            case 1:
              a = c;
              var g = i.type, y = i.stateNode;
              if (!(i.flags & 128) && (typeof g.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Ss === null || !Ss.has(y)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var w = Dg(i, a, t);
                Sf(i, w);
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
  var e = Ro.current;
  return Ro.current = Eo, e === null ? Eo : e;
}
function Td() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), xt === null || !(Gs & 268435455) && !(la & 268435455) || ds(xt, bt);
}
function Do(e, t) {
  var n = ke;
  ke |= 2;
  var s = Jg();
  (xt !== e || bt !== t) && (Fn = null, Hs(e, t));
  do
    try {
      Vw();
      break;
    } catch (l) {
      qg(e, l);
    }
  while (!0);
  if (od(), ke = n, Ro.current = s, dt !== null) throw Error(H(261));
  return xt = null, bt = 0, ft;
}
function Vw() {
  for (; dt !== null; ) ex(dt);
}
function Kw() {
  for (; dt !== null && !vv(); ) ex(dt);
}
function ex(e) {
  var t = sx(e.alternate, e, Kt);
  e.memoizedProps = e.pendingProps, t === null ? tx(e) : dt = t, wd.current = null;
}
function tx(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ow(n, t), n !== null) {
        n.flags &= 32767, dt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, dt = null;
        return;
      }
    } else if (n = Fw(n, t, Kt), n !== null) {
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
    xn.transition = null, Le = 1, Gw(e, t, n, s);
  } finally {
    xn.transition = l, Le = s;
  }
  return null;
}
function Gw(e, t, n, s) {
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
  if (Nv(e, i), e === xt && (dt = xt = null, bt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Hr || (Hr = !0, lx(xo, function() {
    return Rl(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = xn.transition, xn.transition = null;
    var r = Le;
    Le = 1;
    var a = ke;
    ke |= 4, wd.current = null, Hw(e, n), Gg(n, e), mw(nu), vo = !!tu, nu = tu = null, e.current = n, Ww(n), wv(), ke = a, Le = r, xn.transition = i;
  } else e.current = n;
  if (Hr && (Hr = !1, ms = e, Lo = l), i = e.pendingLanes, i === 0 && (Ss = null), bv(n.stateNode), Ut(e, it()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ao) throw Ao = !1, e = Mu, Mu = null, e;
  return Lo & 1 && e.tag !== 0 && Rl(), i = e.pendingLanes, i & 1 ? e === bu ? ki++ : (ki = 0, bu = e) : ki = 0, js(), null;
}
function Rl() {
  if (ms !== null) {
    var e = Lm(Lo), t = xn.transition, n = Le;
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
                    if ($g(h), h === u) {
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
                var S = m.child;
                if (S !== null) {
                  m.child = null;
                  do {
                    var M = S.sibling;
                    S.sibling = null, S = M;
                  } while (S !== null);
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
        var g = e.current;
        for (J = g; J !== null; ) {
          r = J;
          var y = r.child;
          if (r.subtreeFlags & 2064 && y !== null) y.return = r, J = y;
          else e: for (r = g; J !== null; ) {
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
            var w = a.sibling;
            if (w !== null) {
              w.return = a.return, J = w;
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
  t = Ol(n, t), t = Lg(e, t, 1), e = ws(e, t, 1), t = Lt(), e !== null && (Vi(e, 1, t), Ut(e, t));
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
        e = Ol(n, e), e = Dg(t, e, 1), t = ws(t, e, 1), e = Lt(), t !== null && (Vi(t, 1, e), Ut(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Qw(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = Lt(), e.pingedLanes |= e.suspendedLanes & n, xt === e && (bt & n) === n && (ft === 4 || ft === 3 && (bt & 130023424) === bt && 500 > it() - Md ? Hs(e, 0) : Sd |= n), Ut(e, t);
}
function nx(e, t) {
  t === 0 && (e.mode & 1 ? (t = Rr, Rr <<= 1, !(Rr & 130023424) && (Rr = 4194304)) : t = 1);
  var n = Lt();
  e = Gn(e, t), e !== null && (Vi(e, t, n), Ut(e, n));
}
function Zw(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), nx(e, n);
}
function qw(e, t) {
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
    if (!(e.lanes & n) && !(t.flags & 128)) return Ft = !1, Xw(e, t, n);
    Ft = !!(e.flags & 131072);
  }
  else Ft = !1, Qe && t.flags & 1048576 && og(t, ko, t.index);
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
        switch (io(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = e0(s), e = bn(s, e), l) {
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
        if (Fg(t), e === null) throw Error(H(387));
        s = t.pendingProps, i = t.memoizedState, l = i.element, fg(e, t), No(t, s, null, n);
        var r = t.memoizedState;
        if (s = r.element, i.isDehydrated) if (i = { element: s, isDehydrated: !1, cache: r.cache, pendingSuspenseBoundaries: r.pendingSuspenseBoundaries, transitions: r.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = Ol(Error(H(423)), t), t = Rf(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = Ol(Error(H(424)), t), t = Rf(e, t, s, n, l);
          break e;
        } else for (Qt = vs(t.stateNode.containerInfo.firstChild), Zt = t, Qe = !0, kn = null, n = dg(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
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
      return pg(t), e === null && au(t), s = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, r = l.children, su(s, l) ? r = null : i !== null && su(s, i) && (t.flags |= 32), Xg(e, t), At(e, t, r, n), t.child;
    case 6:
      return e === null && au(t), null;
    case 13:
      return Og(e, t, n);
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
      return Bg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : bn(s, l), io(e, t), t.tag = 1, Wt(s) ? (e = !0, _o(t)) : e = !1, El(t, n), Ag(t, s, l), du(t, s, l, n), pu(null, t, s, !0, e, n);
    case 19:
      return zg(e, t, n);
    case 22:
      return Yg(e, t, n);
  }
  throw Error(H(156, t.tag));
};
function lx(e, t) {
  return Im(e, t);
}
function Jw(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function pn(e, t, n, s) {
  return new Jw(e, t, n, s);
}
function kd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function e0(e) {
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
    case pm:
      return ia(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case hm:
          r = 10;
          break e;
        case fm:
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
  return e = pn(22, e, s, t), e.elementType = pm, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function oc(e, t, n) {
  return e = pn(6, e, null, t), e.lanes = n, e;
}
function ac(e, t, n) {
  return t = pn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function t0(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = za(0), this.expirationTimes = za(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = za(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Cd(e, t, n, s, l, i, r, a, c) {
  return e = new t0(e, t, n, a, c), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = pn(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ud(i), e;
}
function n0(e, t, n) {
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
function rx(e, t, n, s, l, i, r, a, c) {
  return e = Cd(n, s, !0, e, l, i, r, a, c), e.context = ix(null), n = e.current, s = Lt(), l = Ms(n), i = Un(s, l), i.callback = t ?? null, ws(n, i, l), e.current.lanes = l, Vi(e, l, s), Ut(e, s), e;
}
function ra(e, t, n, s) {
  var l = t.current, i = Lt(), r = Ms(l);
  return n = ix(n), t.context === null ? t.context = n : t.pendingContext = n, t = Un(i, r), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = ws(l, t, r), e !== null && (jn(e, l, r, i), no(e, l, r)), r;
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
function s0() {
  return null;
}
var ox = typeof reportError == "function" ? reportError : function(e) {
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
    var t = Ym();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < us.length && t !== 0 && t < us[n].priority; n++) ;
    us.splice(n, 0, e), n === 0 && Fm(e);
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
function l0(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var i = s;
      s = function() {
        var u = Bo(r);
        i.call(u);
      };
    }
    var r = rx(t, s, e, 0, null, !1, !1, "", Wf);
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
  } else r = l0(n, t, e, l, s);
  return Bo(r);
}
Dm = function(e) {
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
Bm = function(e) {
  if (e.tag === 13) {
    var t = Ms(e), n = Gn(e, t);
    if (n !== null) {
      var s = Lt();
      jn(n, e, t, s);
    }
    jd(e, t);
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
            gm(s), Fc(s, l);
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
Tm = bd;
km = Qs;
var i0 = { usingClientEntryPoint: !1, Events: [Gi, Sl, Jo, bm, _m, bd] }, ai = { findFiberByHostInstance: Xs, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, r0 = { bundleType: ai.bundleType, version: ai.version, rendererPackageName: ai.rendererPackageName, rendererConfig: ai.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: qn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Nm(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ai.findFiberByHostInstance || s0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wr.isDisabled && Wr.supportsFiber) try {
    Go = Wr.inject(r0), Bn = Wr;
  } catch {
  }
}
Jt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = i0;
Jt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Pd(t)) throw Error(H(200));
  return n0(e, t, null, n);
};
Jt.createRoot = function(e, t) {
  if (!Pd(e)) throw Error(H(299));
  var n = !1, s = "", l = ox;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Cd(e, 1, !1, null, null, n, !1, s, l), e[Kn] = t.current, Bi(e.nodeType === 8 ? e.parentNode : e), new Nd(t);
};
Jt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(H(188)) : (e = Object.keys(e).join(","), Error(H(268, e)));
  return e = Nm(t), e = e === null ? null : e.stateNode, e;
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
  var s = n != null && n.hydratedSources || null, l = !1, i = "", r = ox;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (r = n.onRecoverableError)), t = rx(t, null, e, 1, n ?? null, l, !1, i, r), e[Kn] = t.current, Bi(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
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
function ax() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ax);
    } catch (e) {
      console.error(e);
    }
}
ax(), am.exports = Jt;
var Ci = am.exports, Uf = Ci;
Rc.createRoot = Uf.createRoot, Rc.hydrateRoot = Uf.hydrateRoot;
const o0 = {}, $f = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (h, p) => {
    const d = typeof h == "function" ? h(t) : h;
    if (!Object.is(d, t)) {
      const f = t;
      t = p ?? (typeof d != "object" || d === null) ? d : Object.assign({}, t, d), n.forEach((m) => m(t, f));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (h) => (n.add(h), () => n.delete(h)), destroy: () => {
    (o0 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, a0 = (e) => e ? $f(e) : $f;
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
function c0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var u0 = typeof Object.is == "function" ? Object.is : c0, d0 = Hl.useState, h0 = Hl.useEffect, f0 = Hl.useLayoutEffect, p0 = Hl.useDebugValue;
function m0(e, t) {
  var n = t(), s = d0({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, i = s[1];
  return f0(
    function() {
      l.value = n, l.getSnapshot = t, cc(l) && i({ inst: l });
    },
    [e, n, t]
  ), h0(
    function() {
      return cc(l) && i({ inst: l }), e(function() {
        cc(l) && i({ inst: l });
      });
    },
    [e]
  ), p0(n), n;
}
function cc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !u0(e, n);
  } catch {
    return !0;
  }
}
function g0(e, t) {
  return t();
}
var x0 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g0 : m0;
hx.useSyncExternalStore = Hl.useSyncExternalStore !== void 0 ? Hl.useSyncExternalStore : x0;
dx.exports = hx;
var y0 = dx.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua = T, v0 = y0;
function w0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var S0 = typeof Object.is == "function" ? Object.is : w0, M0 = v0.useSyncExternalStore, b0 = ua.useRef, _0 = ua.useEffect, T0 = ua.useMemo, k0 = ua.useDebugValue;
ux.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var i = b0(null);
  if (i.current === null) {
    var r = { hasValue: !1, value: null };
    i.current = r;
  } else r = i.current;
  i = T0(
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
        if (m = p, S0(h, f)) return m;
        var S = s(f);
        return l !== void 0 && l(m, S) ? (h = f, m) : (h = f, p = S);
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
  var a = M0(e, i[0], i[1]);
  return _0(
    function() {
      r.hasValue = !0, r.value = a;
    },
    [a]
  ), k0(a), a;
};
cx.exports = ux;
var C0 = cx.exports;
const j0 = /* @__PURE__ */ Qp(C0), fx = {}, { useDebugValue: N0 } = Te, { useSyncExternalStoreWithSelector: P0 } = j0;
let Vf = !1;
const I0 = (e) => e;
function E0(e, t = I0, n) {
  (fx ? "production" : void 0) !== "production" && n && !Vf && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Vf = !0);
  const s = P0(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return N0(s), s;
}
const Kf = (e) => {
  (fx ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? a0(e) : e, n = (s, l) => E0(t, s, l);
  return Object.assign(n, t), n;
}, tt = (e) => e ? Kf(e) : Kf, R0 = {
  width: 0,
  height: 0
}, is = {
  x: 0,
  y: 0,
  zoom: 1
}, A0 = 0.02, L0 = 16, D0 = 2e-3, ci = 0.6, C = 12, me = 8, B = 64, rs = 512 * C, B0 = ["nw", "ne", "se", "sw"], uc = -180, dc = 180, Zs = 0.01, Wl = 5, hc = 0, fc = 1, Y0 = C * 0.9, Gf = Y0 / 2, px = 16, X0 = 8, F0 = 8, ku = 1, Cu = 64, pc = 4096, Qf = 4e6, mx = "pss.traceCanvasOversize", Id = 8, Zf = Id * 3, O0 = Id * 4, z0 = 1e3, H0 = {
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
], W0 = {
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
}, U0 = (e, t, n) => Math.min(Math.max(e, t), n), Ce = tt((e, t) => ({
  ...R0,
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
    const { camera: l } = t(), i = U0(l.zoom + n, A0, L0);
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
})), Jf = [Math.max(0, ju.length - 1)], $0 = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, ui = (e, t) => {
  const n = $0(e).filter((s) => s >= 0 && s < t);
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
})), V0 = (e, t) => `${e}:${t}`, W = tt(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(V0(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class K0 {
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
const G0 = "Pixel Splash Studio", Q0 = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${G0} - ${n}${t ? "*" : ""}`;
}, xe = tt((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), Z0 = () => {
  const e = xe.getState();
  return Q0(e.path, e.dirty);
}, di = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, gx = 64, Nu = 2, Pu = 24, mc = 6, q0 = 1, J0 = 1, Yo = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(gx, Math.max(1, Math.floor(e))), e1 = (e) => Math.max(Nu, Math.min(Pu, Math.round(e))), gc = (e) => ({
  ...e,
  columns: Yo(e.columns, q0),
  rows: Yo(e.rows, J0)
}), t1 = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, n1 = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, s1 = (e, t) => {
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
}, l1 = (e, t) => {
  const n = e.tiles.length, s = Math.max(1, e.columns), l = Math.ceil(n / s), i = [];
  let r = 0;
  for (let p = 0; p < l; p += 1) {
    const d = p * s, f = Math.min(n, d + s);
    let m = !0;
    for (let S = d; S < f; S += 1)
      if (!t.has(S)) {
        m = !1;
        break;
      }
    m && (i.push(p), r += f - d);
  }
  const a = [];
  let c = 0;
  for (let p = 0; p < s; p += 1) {
    let d = !1, f = !0, m = 0;
    for (let S = 0; S < l; S += 1) {
      const M = S * s + p;
      if (!(M >= n) && (d = !0, m += 1, !t.has(M))) {
        f = !1;
        break;
      }
    }
    d && f && (a.push(p), c += m);
  }
  const u = i.length > 0 && r === t.size;
  if (a.length > 0 && c === t.size && s - a.length >= 1) {
    const p = new Set(a), d = /* @__PURE__ */ new Map(), f = [];
    for (let m = 0; m < l; m += 1)
      for (let S = 0; S < s; S += 1) {
        const M = m * s + S;
        if (!(M >= n)) {
          if (p.has(S)) {
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
    for (let S = 0; S < l; S += 1)
      for (let M = 0; M < s; M += 1) {
        const v = S * s + M;
        if (!(v >= n)) {
          if (p.has(S)) {
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
  return s1(e, t);
}, U = tt((e, t) => ({
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
    const l = n.map(gc), i = t1(
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
    tilePickerZoom: Number.isFinite(n) && n > 0 ? e1(n) : mc
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
      if (r.some((m) => m.id === s.activeTileMapId))
        return s.activeTileMapId;
      const d = r.find(
        (m) => m.tileSetId === ((c == null ? void 0 : c.id) ?? null)
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
      name: n1(
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
      const p = a, d = c, f = a + Math.max(0, u - 1), m = c + Math.max(0, h - 1), S = Math.floor(p / B), M = Math.floor(f / B), v = Math.floor(d / B), g = Math.floor(m / B);
      for (let y = v; y <= g; y += 1)
        for (let w = S; w <= M; w += 1)
          if (l.has(`${y}:${w}`))
            return !0;
      return !1;
    };
    e((a) => {
      let c = !1;
      const u = a.tileSets.map((h) => {
        const p = h.tileWidth, d = h.tileHeight;
        let f = !1;
        const m = h.tiles.map((S) => {
          const M = S.source;
          if (!M || M.kind !== "canvas" || !r(M.x, M.y, p, d))
            return S;
          const v = [];
          for (let g = 0; g < d; g += 1)
            for (let y = 0; y < p; y += 1)
              v.push(i.getPixelComposite(M.x + y, M.y + g));
          return c = !0, f = !0, { ...S, pixels: v };
        });
        return f ? { ...h, tiles: m } : h;
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
      var g;
      const a = r.tileSets.find((y) => y.id === n);
      if (!a)
        return r;
      const c = new Set(
        Array.from(i).filter((y) => y >= 0 && y < a.tiles.length)
      );
      if (c.size === 0)
        return r;
      const { nextTiles: u, indexMap: h, nextColumns: p, nextRows: d } = l1(
        a,
        c
      ), f = (y) => y.map((w) => w >= 0 ? h.get(w) ?? -1 : -1), m = f(r.selectedTileIndices).filter(
        (y) => y >= 0
      ), S = (u.length > 0, 0), v = (m.length > 0 ? m : [S])[0] ?? S;
      return {
        tileSets: r.tileSets.map(
          (y) => y.id === n ? { ...y, tiles: u, columns: p, rows: d } : y
        ),
        tileMaps: r.tileMaps.map((y) => {
          if (y.tileSetId !== n)
            return y;
          const w = y.tiles.map((b) => b < 0 ? -1 : h.get(b) ?? -1);
          return { ...y, tiles: w };
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
    xe.getState().setDirty(!0), e((s) => {
      var m;
      const l = s.tileSets.find((S) => S.id === n);
      if (!l)
        return s;
      const i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), a = [];
      let c = 0;
      l.tiles.forEach((S, M) => {
        const v = S.pixels.join(","), g = r.get(v);
        if (g !== void 0) {
          i.set(M, g);
          return;
        }
        r.set(v, c), i.set(M, c), a.push(S), c += 1;
      });
      const u = (S) => S.map((M) => M >= 0 ? i.get(M) ?? -1 : -1), h = u(s.selectedTileIndices).filter(
        (S) => S >= 0
      ), p = (a.length > 0, 0), f = (h.length > 0 ? h : [p])[0] ?? p;
      return {
        tileSets: s.tileSets.map(
          (S) => S.id === n ? { ...S, tiles: a } : S
        ),
        tileMaps: s.tileMaps.map((S) => {
          if (S.tileSetId !== n)
            return S;
          const M = S.tiles.map((v) => v < 0 ? -1 : i.get(v) ?? -1);
          return { ...S, tiles: M };
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
    const h = t().tileMaps.find((y) => y.id === n);
    if (!h)
      return null;
    const p = Math.max(0, -s), d = Math.max(0, -i), f = Math.max(0, l - (h.columns - 1)), m = Math.max(0, r - (h.rows - 1));
    if (p === 0 && d === 0 && f === 0 && m === 0)
      return h;
    const S = h.columns + p + f, M = h.rows + d + m, v = new Array(S * M).fill(-1);
    for (let y = 0; y < h.rows; y += 1)
      for (let w = 0; w < h.columns; w += 1) {
        const b = y * h.columns + w, _ = (y + d) * S + (w + p);
        v[_] = h.tiles[b] ?? -1;
      }
    const g = {
      ...h,
      originX: h.originX - p * a,
      originY: h.originY - d * c,
      columns: S,
      rows: M,
      tiles: v
    };
    return xe.getState().setDirty(!0), e((y) => ({
      tileMaps: y.tileMaps.map((w) => w.id === n ? g : w)
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
    tilePickerZoom: mc,
    tilePlacementMode: "hard",
    tilePenSnapToCluster: !1,
    tileDebugOverlay: !1,
    nineSlice: null
  })
})), i1 = (e) => ({
  ...e,
  pixels: e.pixels.slice(),
  source: e.source ? { ...e.source } : void 0
}), xx = (e) => ({
  ...e,
  tiles: e.tiles.map(i1)
}), yx = (e) => ({
  ...e,
  tiles: e.tiles.slice()
}), Iu = (e) => ({
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
  const e = U.getState();
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
}, r1 = (e, t) => JSON.stringify(e) === JSON.stringify(t), qs = (e, t) => r1(e, t) ? !1 : (Ae.getState().pushBatch({
  changes: [],
  tileBefore: e,
  tileAfter: t
}), !0), lp = (e) => {
  const t = Iu(e);
  U.setState({
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
})), o1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, rp = (e, t, n) => {
  const s = ye.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, vx = (e, t, n) => {
  const { size: s, shape: l } = mn.getState();
  if (l === "point") {
    rp(e, t, n);
    return;
  }
  const i = o1(s, l);
  for (const [r, a] of i)
    rp(e + r, t + a, n);
}, xc = (e, t) => {
  const n = Math.floor(e.canvasX / C), s = Math.floor(e.canvasY / C);
  vx(n, s, t);
};
class a1 {
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
        for (; vx(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
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
          const m = this.changes.get(f);
          m && (m.next = d.paletteIndex);
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
})), op = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), c1 = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), ap = (e, t, n, s) => {
  const l = ye.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || W.getState().setPixel(t, n, s);
}, u1 = () => {
  const e = re.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, d1 = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class h1 {
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
        const c = Math.floor(s.canvasX / C), u = Math.floor(s.canvasY / C), h = Math.max(1, n.radius), d = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, f = this.rng ?? Math.random, m = this.activeIndex === 0 ? [0] : u1(), S = m.length > 1, M = S ? m : null, v = m[0] ?? this.activeIndex;
        for (let g = 0; g < a; g += 1) {
          const y = f() * Math.PI * 2, w = f(), b = Math.pow(w, d) * h, _ = Math.round(Math.cos(y) * b), k = Math.round(Math.sin(y) * b), j = S ? (M == null ? void 0 : M[Math.floor(f() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : v;
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
      this.rng = l ? d1(i) : null, this.stopLoop(), this.frameHandle = op(this.step);
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
    this.frameHandle != null && (c1(this.frameHandle), this.frameHandle = null);
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
}), f1 = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, p1 = (e) => f1(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, m1 = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), ha = (e, t, n = 60) => m1(e, t) < n ? p1(e) : t, Mt = tt((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), fa = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, Eu = (e, t, n) => Math.min(n, Math.max(t, e)), g1 = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, x1 = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, y1 = [
  [0, 2],
  [3, 1]
], v1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], w1 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], S1 = (e, t, n) => e === "bayer2" ? (y1[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (v1[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (w1[n & 7][t & 7] + 0.5) / 64 : e === "random" ? g1(t, n) : e === "blue-noise" ? x1(t, n) : 0.5, cp = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const i = n.maxX - n.minX, r = n.maxY - n.minY, a = i === 0 ? 1 : i, c = r === 0 ? 1 : r, u = e - n.minX, h = t - n.minY;
  let p = 0;
  return s === "top-bottom" ? p = h / c : s === "bottom-top" ? p = 1 - h / c : s === "left-right" ? p = u / a : s === "right-left" && (p = 1 - u / a), p = Eu(p, 0, 1), p * (l - 1);
}, M1 = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", b1 = (e) => e === "floyd-steinberg" ? [
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
  if (!M1(l)) {
    for (const A of e) {
      const L = cp(A.x, A.y, t, s, i), Y = Math.floor(L), N = L - Y, O = S1(l, A.x, A.y), G = N > O ? Y + 1 : Y, oe = Eu(G, 0, i - 1);
      r.set(`${A.x}:${A.y}`, n[oe] ?? 0);
    }
    return r;
  }
  const a = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = a * c, h = Number.isFinite(u) && u > 0 && u <= 2e6;
  let p = null, d = null, f = null, m = null;
  if (h) {
    p = new Uint8Array(u), d = new Float32Array(u);
    for (const A of e) {
      const L = (A.y - t.minY) * a + (A.x - t.minX);
      L >= 0 && L < p.length && (p[L] = 1);
    }
  } else {
    f = /* @__PURE__ */ new Set(), m = /* @__PURE__ */ new Map();
    for (const A of e)
      f.add(`${A.x}:${A.y}`);
  }
  const S = (A, L) => {
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
    return (m == null ? void 0 : m.get(`${A}:${L}`)) ?? 0;
  }, v = (A, L, Y) => {
    if (!S(A, L))
      return;
    if (d) {
      const O = (L - t.minY) * a + (A - t.minX);
      d[O] += Y;
      return;
    }
    const N = `${A}:${L}`;
    m == null || m.set(N, (m.get(N) ?? 0) + Y);
  }, g = s === "right-left" ? -1 : 1, y = s === "bottom-top" ? -1 : 1, w = g > 0 ? t.minX : t.maxX, b = g > 0 ? t.maxX : t.minX, _ = y > 0 ? t.minY : t.maxY, k = y > 0 ? t.maxY : t.minY, j = b1(l);
  for (let A = _; y > 0 ? A <= k : A >= k; A += y)
    for (let L = w; g > 0 ? L <= b : L >= b; L += g) {
      if (!S(L, A))
        continue;
      const N = cp(L, A, t, s, i) + M(L, A), O = Eu(Math.round(N), 0, i - 1);
      r.set(`${L}:${A}`, n[O] ?? 0);
      const G = N - O;
      if (!Number.isFinite(G) || G === 0)
        continue;
      const oe = [];
      let Q = 0;
      for (const ne of j) {
        const D = L + ne.dx * g, F = A + ne.dy * y;
        S(D, F) && (oe.push({ x: D, y: F, weight: ne.weight }), Q += ne.weight);
      }
      if (!(Q <= 0))
        for (const ne of oe)
          v(ne.x, ne.y, G * ne.weight / Q);
    }
  return r;
}, Ru = (e, t, n) => {
  const s = ye.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || W.getState().setPixel(e, t, n);
}, _1 = (e, t, n, s, l) => {
  let i = Math.abs(n - e), r = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - r;
  for (; Ru(e, t, l), !(e === n && t === s); ) {
    const h = 2 * u;
    h > -r && (u -= r, e += a), h < i && (u += i, t += c);
  }
}, T1 = (e, t, n, s) => {
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
class k1 {
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
        }, a = T1(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = Mt.getState(), h = Zi(
          a,
          r,
          i,
          c,
          u
        );
        for (const p of a)
          Ru(p.x, p.y, h.get(`${p.x}:${p.y}`) ?? i[0] ?? 0);
      } else
        _1(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
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
})), C1 = (e, t, n) => {
  const s = ye.getState(), l = W.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = a; u <= c; u += 1)
    for (let h = i; h <= r; h += 1)
      s.selectedCount > 0 && !s.isSelected(h, u) || l.setPixel(h, u, n);
}, j1 = (e, t, n) => {
  const s = ye.getState(), l = W.getState(), i = Math.min(e.x, t.x), r = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = i; u <= r; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, a)) && l.setPixel(u, a, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = a + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n), (s.selectedCount === 0 || s.isSelected(r, u)) && l.setPixel(r, u, n);
};
class N1 {
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
}, P1 = (e, t, n) => {
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
    const m = f - h;
    for (let S = s; S <= l; S += 1) {
      const M = S - u;
      M * M / p + m * m / d <= 1 && fs(S, f, n);
    }
  }
}, I1 = (e, t, n) => {
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
    const m = f - u, S = 1 - m * m / p;
    if (S < 0)
      continue;
    const M = Math.sqrt(S) * c, v = Math.round(h - M), g = Math.round(h + M);
    fs(f, v, n), fs(f, g, n);
  }
  for (let f = i; f <= r; f += 1) {
    const m = f - h, S = 1 - m * m / d;
    if (S < 0)
      continue;
    const M = Math.sqrt(S) * a, v = Math.round(u - M), g = Math.round(u + M);
    fs(v, f, n), fs(g, f, n);
  }
};
class E1 {
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
        const a = ye.getState(), c = [], u = (r.maxX - r.minX) / 2, h = (r.maxY - r.minY) / 2, p = (r.minX + r.maxX) / 2, d = (r.minY + r.maxY) / 2, f = (g, y) => a.selectedCount === 0 || a.isSelected(g, y), m = (g, y) => {
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
          for (let w = r.minY; w <= r.maxY; w += 1) {
            const b = w - d;
            for (let _ = r.minX; _ <= r.maxX; _ += 1) {
              const k = _ - p;
              k * k / g + b * b / y <= 1 && m(_, w);
            }
          }
        } else {
          const g = u * u, y = h * h;
          for (let w = r.minX; w <= r.maxX; w += 1) {
            const b = w - p, _ = 1 - b * b / g;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * h;
            m(w, Math.round(d - k)), m(w, Math.round(d + k));
          }
          for (let w = r.minY; w <= r.maxY; w += 1) {
            const b = w - d, _ = 1 - b * b / y;
            if (_ < 0)
              continue;
            const k = Math.sqrt(_) * u;
            m(Math.round(p - k), w), m(Math.round(p + k), w);
          }
        }
        const { gradientDirection: S, gradientDither: M } = Mt.getState(), v = Zi(
          c,
          r,
          i,
          S,
          M
        );
        for (const g of c)
          n.setPixel(g.x, g.y, v.get(`${g.x}:${g.y}`) ?? i[0] ?? 0);
        return;
      }
      if (l === "filled") {
        P1(this.start, s, this.activeIndex);
        return;
      }
      I1(this.start, s, this.activeIndex);
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
})), R1 = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), A1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, wc = (e, t) => A1(R1(e), t), up = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * me,
    maxX: (l + 1) * me - 1,
    minY: i * me,
    maxY: (r + 1) * me - 1
  } : { minX: s, maxX: l, minY: i, maxY: r };
}, L1 = (e, t) => {
  const n = W.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), r = Math.max(e.y, t.y);
  for (let a = i; a <= r; a += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, a, 1);
};
class D1 {
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
      L1({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
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
const B1 = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), Y1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me),
  y: Math.floor(e.y / me)
} : e, Sc = (e, t) => Y1(B1(e), t), dp = (e, t, n) => {
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
    for (let m = n; m <= s; m += 1) {
      const S = m - c;
      S * S / h + f * f / p <= 1 && t(m, d);
    }
  }
};
class X1 {
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
const F1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let r = s; r <= l; r += 1)
      t === "round" && r * r + i * i > e * e || n.push([r, i]);
  return n;
}, O1 = (e) => {
  var v, g, y, w;
  if (e.length === 0)
    return [];
  let t = ((v = e[0]) == null ? void 0 : v.x) ?? 0, n = ((g = e[0]) == null ? void 0 : g.x) ?? 0, s = ((y = e[0]) == null ? void 0 : y.y) ?? 0, l = ((w = e[0]) == null ? void 0 : w.y) ?? 0;
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
  let m = 0;
  const S = (b, _) => {
    const k = b + _ * c;
    d[k] === 1 || p[k] === 1 || (d[k] = 1, f.push(k));
  };
  for (let b = 0; b < c; b += 1)
    S(b, 0), S(b, u - 1);
  for (let b = 1; b < u - 1; b += 1)
    S(0, b), S(c - 1, b);
  for (; m < f.length; ) {
    const b = f[m] ?? 0;
    m += 1;
    const _ = b % c, k = Math.floor(b / c);
    _ > 0 && S(_ - 1, k), _ + 1 < c && S(_ + 1, k), k > 0 && S(_, k - 1), k + 1 < u && S(_, k + 1);
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
  const r = F1(l, i);
  for (const [a, c] of r)
    s.setPixel(e + a, t + c, 1);
}, fp = (e, t, n) => {
  const s = Math.abs(t.x - e.x), l = Math.abs(t.y - e.y), i = e.x < t.x ? 1 : -1, r = e.y < t.y ? 1 : -1;
  let a = s - l, c = e.x, u = e.y;
  for (; ho(c, u, n), !(c === t.x && u === t.y); ) {
    const h = 2 * a;
    h > -l && (a -= l, c += i), h < s && (a += s, u += r);
  }
}, z1 = (e) => {
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
      const m = (a - h.y) / (p.y - h.y), S = h.x + m * (p.x - h.x);
      c.push(S);
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
class H1 {
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
        const m = a[a.length - 1];
        (!m || m.x !== f.x || m.y !== f.y) && a.push(f);
      }
      const c = i ?? a[0] ?? null, u = a[a.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && a.push(c);
      const h = Array.from(t.entries()).map((f) => ({ x: f.x, y: f.y })), p = l === "point" && !this.tileMode ? z1(a) : O1(h), d = (p.length > 0 ? p : h).map((f) => ({ x: f.x, y: f.y, selected: s }));
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
class W1 {
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
          const f = u + d, m = h + p;
          s.push({ x: f, y: m });
          const S = l.get(m) ?? [];
          S.push(f), l.set(m, S);
          const M = i.get(f) ?? [];
          M.push(m), i.set(f, M);
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
      for (let m = 0; m < B; m += 1) {
        if (h[f * B + m] !== 1)
          continue;
        const S = p + m, M = d + f, v = t.getPixel(S, M);
        n.push({ x: S, y: M, paletteIndex: v }), s = Math.min(s, S), l = Math.max(l, S), i = Math.min(i, M), r = Math.max(r, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: i, maxY: r };
}, U1 = 2e3, $1 = 6, zs = [], Us = /* @__PURE__ */ new Map();
let zo = !1, mp = 1, Al = null;
const fo = () => typeof performance < "u" ? performance.now() : Date.now(), wx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(fo()), 0), V1 = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, Sx = (e, t) => {
  const n = Math.floor(t / B), s = Math.floor(e / B);
  return `${n}:${s}`;
}, K1 = (e, t) => {
  t <= 0 || Us.set(e, (Us.get(e) ?? 0) + t);
}, G1 = (e) => {
  const t = (Us.get(e) ?? 0) - 1;
  t > 0 ? Us.set(e, t) : Us.delete(e);
}, Mx = () => {
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
      if (e.index += 1, i.push({ x: r.x, y: r.y, paletteIndex: r.next }), G1(Sx(r.x, r.y)), fo() - t > s)
        break;
    }
    if (i.length > 0 && l.setPixelsInLayer(e.layerId, i), e.index >= e.changes.length) {
      Ae.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), zs.shift(), zs.length === 0 && Ae.getState().setLocked(!1);
      break;
    }
    if (fo() - t > s)
      break;
  }
  Al = wx(Mx);
}, Q1 = () => {
  zo || (zo = !0, Al = wx(Mx));
}, qi = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  zs.length === 0 && Ae.getState().setLocked(!0);
  const n = String(mp);
  mp += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = ee.getState().activeLayerId, i = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : U1, r = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : $1;
  zs.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: i, timeBudgetMs: r });
  const a = /* @__PURE__ */ new Map();
  for (const u of e) {
    const h = Sx(u.x, u.y);
    a.set(h, (a.get(h) ?? 0) + 1);
  }
  for (const [u, h] of a.entries())
    K1(u, h);
  Q1();
}, Z1 = () => Array.from(Us.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), Rd = () => {
  zs.length = 0, Us.clear(), Ae.getState().setLocked(!1), zo = !1, Al !== null && (V1(Al), Al = null);
}, bx = () => {
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
}, q1 = (e) => {
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
        const d = c + p, f = u + h, m = n.getPixel(d, f);
        m !== e && s.push({ x: d, y: f, prev: m, next: e });
      }
  }
  s.length !== 0 && qi(s, { label: "Fill Selection" });
}, J1 = (e, t, n, s) => {
  if (n === s)
    return;
  const l = ye.getState(), i = ee.getState(), r = l.selectedCount > 0, a = r ? null : bx();
  if (!r && !a || r && !l.isSelected(e, t))
    return;
  const c = /* @__PURE__ */ new Set(), u = [e], h = [t], p = [];
  for (let d = 0; d < u.length; d += 1) {
    const f = u[d], m = h[d];
    if (a && (f < a.minX || f > a.maxX || m < a.minY || m > a.maxY))
      continue;
    const S = `${f}:${m}`;
    if (!c.has(S) && (c.add(S), !(r && !l.isSelected(f, m)) && i.getPixel(f, m) === n)) {
      if (a && (f === a.minX || f === a.maxX || m === a.minY || m === a.maxY))
        return;
      p.push({ x: f, y: m, prev: n, next: s }), u.push(f + 1, f - 1, f, f), h.push(m, m, m + 1, m - 1);
    }
  }
  p.length !== 0 && qi(p, { label: "Fill Region" });
}, eS = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, tS = (e, t, n) => {
  const s = ye.getState(), l = ee.getState(), i = s.selectedCount > 0, r = i ? null : bx();
  if (!i && !r || i && !s.isSelected(e, t))
    return null;
  const a = /* @__PURE__ */ new Set(), c = [e], u = [t], h = [];
  let p = Number.POSITIVE_INFINITY, d = Number.NEGATIVE_INFINITY, f = Number.POSITIVE_INFINITY, m = Number.NEGATIVE_INFINITY;
  for (let S = 0; S < c.length; S += 1) {
    const M = c[S], v = u[S];
    if (r && (M < r.minX || M > r.maxX || v < r.minY || v > r.maxY))
      continue;
    const g = `${M}:${v}`;
    if (a.has(g) || (a.add(g), i && !s.isSelected(M, v)))
      continue;
    const y = l.getPixel(M, v);
    if (y === n) {
      if (r && (M === r.minX || M === r.maxX || v === r.minY || v === r.maxY))
        return null;
      h.push({ x: M, y: v, prev: y }), p = Math.min(p, M), d = Math.max(d, M), f = Math.min(f, v), m = Math.max(m, v), c.push(M + 1, M - 1, M, M), u.push(v, v, v + 1, v - 1);
    }
  }
  return h.length === 0 ? null : { pixels: h, bounds: { minX: p, maxX: d, minY: f, maxY: m } };
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
class nS {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      W.getState().clear();
      const n = re.getState(), s = Mt.getState().mode, l = eS(), i = l.length > 1, r = l[0] ?? n.getActiveIndex(), { gradientDirection: a, gradientDither: c } = Mt.getState(), u = Math.floor(t.canvasX / C), h = Math.floor(t.canvasY / C);
      if (s === "selection") {
        if (!i) {
          q1(r);
          return;
        }
        const d = Ns();
        if (!d)
          return;
        const f = d.pixels.map((m) => ({
          x: m.x,
          y: m.y,
          prev: m.paletteIndex
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
        const d = ee.getState().getPixel(u, h), f = tS(u, h, d);
        if (!f)
          return;
        gp(f.pixels, f.bounds, l, a, c);
        return;
      }
      const p = ee.getState().getPixel(u, h);
      J1(u, h, p, r);
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
})), sS = () => {
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
}), lS = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / me) * me,
  y: Math.floor(e.y / me) * me
} : e, iS = (e, t, n, s, l, i, r) => {
  const a = s === 90 || s === 270 ? n : t, c = s === 90 || s === 270 ? t : n, u = [];
  for (const h of e) {
    let p = h.x, d = h.y;
    i && (p = t - 1 - p), r && (d = n - 1 - d);
    let f = p, m = d;
    if (s === 90 ? (f = n - 1 - d, m = p) : s === 180 ? (f = t - 1 - p, m = n - 1 - d) : s === 270 && (f = d, m = t - 1 - p), l === 1) {
      u.push({ x: f, y: m, paletteIndex: h.paletteIndex });
      continue;
    }
    const S = f * l, M = m * l;
    for (let v = 0; v < l; v += 1)
      for (let g = 0; g < l; g += 1)
        u.push({ x: S + g, y: M + v, paletteIndex: h.paletteIndex });
  }
  return { pixels: u, width: a * l, height: c * l };
};
class rS {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = Ge.getState(), i = lS(t, l.snap);
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
        const m = `${p}:${d}`;
        if (!this.changes.has(m))
          this.changes.set(m, { x: p, y: d, prev: f, next: h.paletteIndex });
        else {
          const S = this.changes.get(m);
          S && (S.next = h.paletteIndex);
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
      !s && n.pasteDuplicateColors && sS();
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
    const s = iS(
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
class oS {
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
const aS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, zt = tt((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? aS();
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
})), cS = (e) => e * Math.PI / 180, Zn = (e) => {
  const t = e.width * C, n = e.height * C, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, i = t * s, r = n * s;
  return {
    centerX: e.x * C + i / 2,
    centerY: e.y * C + r / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: cS(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Vr = (e, t, n) => {
  const s = Zn(e), l = t * s.scale * s.flipX, i = n * s.scale * s.flipY, r = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * r - i * a,
    y: s.centerY + l * a + i * r
  };
}, uS = (e, t, n) => {
  const s = Zn(e), l = t - s.centerX, i = n - s.centerY, r = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad), c = l * r + i * a, u = -l * a + i * r;
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
}, pa = (e) => {
  const t = _x(e);
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
}, dS = (e, t, n) => {
  const s = uS(e, t, n), { baseWidth: l, baseHeight: i } = Zn(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= i / 2;
}, Kr = (e, t) => Math.round(e / t) * t, yp = (e) => e === "tile" ? me : 1, hS = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, vp = (e, t, n) => {
  const s = pa(e);
  for (const l of B0) {
    const i = s[l];
    if (Math.abs(t - i.x) <= Gf && Math.abs(n - i.y) <= Gf)
      return l;
  }
  return null;
}, wp = (e, t) => {
  const n = _x(e), s = pa(e), l = hS[t], i = Zn(e);
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
class fS {
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
        if (dS(d, i, r)) {
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
      const a = i - this.drag.anchorWorldX, c = r - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), h = Math.sin(this.drag.rotationRad), p = a * u + c * h, d = -a * h + c * u, f = p * this.drag.flipX, m = d * this.drag.flipY, S = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, v = S !== 0 ? Math.abs(f / S) : 0, g = M !== 0 ? Math.abs(m / M) : 0, y = Math.max(v, g), w = Number.isFinite(y) && y > 0 ? y : Zs, b = yp(s) * C, _ = Math.max(
        b,
        Kr(this.drag.baseWidth * w, b)
      ), k = Math.max(
        b,
        Kr(this.drag.baseHeight * w, b)
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
const Sp = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, pS = () => {
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
}, mS = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: r, y: a, zoom: s });
}, cn = (e, t = 0) => Number.isFinite(e) ? Math.round(e) : t, gS = (e) => {
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
    const s = pS(), l = Sp(), i = `Bookmark ${n.items.length + 1}`;
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
    mS(l * C, i * C);
  },
  setOverlaysVisible: (n) => e((s) => {
    const l = !!n;
    return s.overlaysVisible === l ? s : (xe.getState().setDirty(!0), { overlaysVisible: l });
  }),
  toggleOverlaysVisible: () => e((n) => (xe.getState().setDirty(!0), { overlaysVisible: !n.overlaysVisible })),
  setAll: (n, s = !0) => e({
    items: n.map(gS).filter((l) => l !== null),
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
}), xS = (e) => {
  const t = W.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * me, i = n * me;
      for (let r = 0; r < me; r += 1)
        for (let a = 0; a < me; a += 1)
          t.setPixel(l + a, i + r, 1);
    }
}, yS = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class vS {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      W.getState().clear(), this.start = _c(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      W.getState().clear();
      const s = _c(t);
      this.last = s, xS(Mp(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = W.getState(), s = t ? _c(t) : this.last ?? this.start, l = Mp(this.start, s), i = ee.getState(), r = U.getState(), a = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
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
        yS(
          `Invalid selection: ${h.name} expects ${h.columns}x${h.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const d = [];
      for (let f = l.minTileY; f <= l.maxTileY; f += 1)
        for (let m = l.minTileX; m <= l.maxTileX; m += 1) {
          const S = [], M = m * me, v = f * me;
          for (let g = 0; g < me; g += 1)
            for (let y = 0; y < me; y += 1)
              S.push(i.getPixelComposite(M + y, v + g));
          d.push({ pixels: S, source: { kind: "canvas", x: M, y: v } });
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
const wS = (e) => e.some((t) => t === 0), SS = (e) => e.every((t) => t === 0);
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
    if (t === "hard" || !wS(l))
      return n;
    const i = s >= 0 ? this.tiles[s] : void 0, r = l.map(
      (h, p) => h === 0 ? (i == null ? void 0 : i[p]) ?? 0 : h
    );
    if (SS(r))
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
const MS = 32, Tc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), bS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
}, bp = () => {
  const e = U.getState(), t = e.tileSets.find((l) => l.id === e.activeTileSetId);
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
  const n = U.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = MS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
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
class _S {
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
        s.length > 0 && U.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (U.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
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
    const i = l.x, r = l.y, a = l.x + n - 1, c = l.y + s - 1, u = U.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
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
      const m = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), S = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (m !== 0 || S !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, g] of this.changes.entries()) {
          const y = Math.floor(v / h), w = v % h, b = y + S, _ = w + m;
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
    const i = this.activeTile.selectionCols, r = this.activeTile.selectionRows, a = this.activeTile.selectionIndices;
    for (let c = 0; c < r; c += 1)
      for (let u = 0; u < i; u += 1) {
        const h = n.x + u, p = n.y + c;
        if (h < 0 || p < 0 || h >= s || p >= l)
          continue;
        const d = p * s + h, f = c * i + u, m = a[f] ?? -1, S = this.erasing ? -1 : this.resolvePlacedTileIndex(m, d);
        if (this.drawing && this.changes.set(d, S), this.erasing)
          continue;
        const M = this.getTilePixels(S);
        if (!M)
          continue;
        const v = t.x + u, g = t.y + c, y = v * this.activeTile.tileWidth, w = g * this.activeTile.tileHeight;
        bS(
          y,
          w,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          M
        );
      }
  }
}
const TS = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), kS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
};
class CS {
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
    const s = U.getState(), l = s.tileSets.find((r) => r.id === n.tileSetId);
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
    const s = TS(t);
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
        const f = i.x + h - r, m = i.y + u - a, S = s.tileMap.originX + f * s.tileSet.tileWidth, M = s.tileMap.originY + m * s.tileSet.tileHeight;
        kS(
          S,
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
    const l = t.x * n.tileSet.tileWidth, i = t.y * n.tileSet.tileHeight, r = U.getState(), a = r.expandTileMapToInclude(
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
        const f = c + d, m = u + p;
        if (f < 0 || m < 0 || f >= a.columns || m >= a.rows)
          continue;
        const S = n.buffer.tiles[p * n.buffer.cols + d] ?? -1;
        h.push({ index: m * a.columns + f, tile: S });
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
const jS = 32, kc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), NS = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
}, Tp = () => {
  const e = U.getState(), t = e.tileSets.find((s) => s.id === e.activeTileSetId);
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
  const n = U.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = jS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
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
class PS {
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
        s.length > 0 && U.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (U.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
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
    const i = l.x, r = l.y, a = l.x + n - 1, c = l.y + s - 1, u = U.getState(), h = this.activeMap.columns, p = this.activeMap.originX, d = this.activeMap.originY, f = u.expandTileMapToInclude(
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
      const m = Math.round(
        (p - f.originX) / this.activeTile.tileWidth
      ), S = Math.round(
        (d - f.originY) / this.activeTile.tileHeight
      );
      if (m !== 0 || S !== 0 || f.columns !== h) {
        const M = /* @__PURE__ */ new Map();
        for (const [v, g] of this.changes.entries()) {
          const y = Math.floor(v / h), w = v % h, b = y + S, _ = w + m;
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
        const m = f - h, S = d - p;
        if (m < 0 || S < 0 || m >= c || S >= u)
          continue;
        const M = this.sampleTileIndexForCell(f, d);
        if (M === null)
          continue;
        const v = S * c + m, g = this.resolvePlacedTileIndex(M, v);
        this.drawing && this.changes.set(v, g);
        const y = this.getTilePixels(g);
        if (!y)
          continue;
        const w = f * this.activeTile.tileWidth, b = d * this.activeTile.tileHeight;
        NS(
          w,
          b,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          y
        );
      }
  }
}
const IS = 1, Cp = "tiles", ES = (e) => {
  const t = (e == null ? void 0 : e.trim()) ?? "";
  return t && t.replace(/\.[^.]+$/, "").replace(/[<>:"/\\|?*\x00-\x1f]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "") || Cp;
}, RS = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), i = IS, r = i, a = i * 2, c = s * (e.tileWidth + a), u = l * (e.tileHeight + a), h = new Uint8ClampedArray(c * u * 4), p = t.map((g) => yt(g) ?? { r: 0, g: 0, b: 0 }), d = (g, y, w) => {
    if (g < 0 || y < 0 || g >= c || y >= u)
      return;
    const b = (y * c + g) * 4;
    h[b] = w.r, h[b + 1] = w.g, h[b + 2] = w.b, h[b + 3] = 255;
  };
  n.forEach((g, y) => {
    const w = e.tiles[g];
    if (!w)
      return;
    const b = y % s * (e.tileWidth + a), _ = Math.floor(y / s) * (e.tileHeight + a);
    for (let k = 0; k < e.tileHeight; k += 1)
      for (let j = 0; j < e.tileWidth; j += 1) {
        const A = w.pixels[k * e.tileWidth + j] ?? 0;
        if (A === 0)
          continue;
        const L = p[A] ?? p[0] ?? { r: 0, g: 0, b: 0 }, Y = b + r + j, N = _ + r + k;
        d(Y, N, L), j === 0 && d(Y - 1, N, L), j === e.tileWidth - 1 && d(Y + 1, N, L), k === 0 && d(Y, N - 1, L), k === e.tileHeight - 1 && d(Y, N + 1, L), j === 0 && k === 0 && d(Y - 1, N - 1, L), j === 0 && k === e.tileHeight - 1 && d(Y - 1, N + 1, L), j === e.tileWidth - 1 && k === 0 && d(Y + 1, N - 1, L), j === e.tileWidth - 1 && k === e.tileHeight - 1 && d(Y + 1, N + 1, L);
      }
  });
  const f = document.createElement("canvas");
  f.width = c, f.height = u;
  const m = f.getContext("2d");
  if (!m)
    throw new Error("Unable to export tile atlas.");
  const S = new ImageData(h, c, u);
  m.putImageData(S, 0, 0);
  const M = await new Promise(
    (g) => f.toBlob((y) => g(y), "image/png")
  );
  if (!M)
    throw new Error("Unable to export tile atlas.");
  return { buffer: new Uint8Array(await M.arrayBuffer()), columns: s, rows: l, width: c, height: u, margin: r, spacing: a };
}, Tx = async (e, t) => {
  var y;
  if (!((y = window.projectApi) != null && y.exportTileMap))
    return window.alert("Tile export is unavailable. Restart the app to load the latest export support."), null;
  const n = U.getState(), s = n.tileSets.find((w) => w.id === n.activeTileSetId);
  if (!s)
    return window.alert("No tile set available."), null;
  const l = n.tileMaps.find(
    (w) => w.id === n.activeTileMapId && w.tileSetId === s.id
  ) ?? n.tileMaps.find((w) => w.tileSetId === s.id);
  if (!l)
    return window.alert("No tile map available."), null;
  const i = Math.round(l.originX / s.tileWidth), r = Math.round(l.originY / s.tileHeight), a = e.maxTileX - e.minTileX + 1, c = e.maxTileY - e.minTileY + 1, u = [], h = /* @__PURE__ */ new Set();
  for (let w = 0; w < c; w += 1)
    for (let b = 0; b < a; b += 1) {
      const _ = e.minTileX + b, k = e.minTileY + w, j = _ - i, A = k - r;
      let L = -1;
      j >= 0 && j < l.columns && A >= 0 && A < l.rows && (L = l.tiles[A * l.columns + j] ?? -1), u.push(L), L >= 0 && L < s.tiles.length && h.add(L);
    }
  if (h.size === 0)
    return window.alert("No tiles in the selected region."), null;
  const p = ES(t == null ? void 0 : t.baseName), d = Array.from(h).sort((w, b) => w - b), f = /* @__PURE__ */ new Map();
  d.forEach((w, b) => f.set(w, b));
  const m = u.map((w) => {
    if (w < 0)
      return 0;
    const b = f.get(w);
    return b === void 0 ? 0 : b + 1;
  }), S = re.getState().colors, M = await RS(s, S, d), v = [];
  for (let w = 0; w < c; w += 1) {
    const b = w * a, _ = m.slice(b, b + a).join(",");
    v.push(w === c - 1 ? _ : `${_},`);
  }
  const g = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${a}" height="${c}" tilewidth="${s.tileWidth}" tileheight="${s.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${s.tileWidth}" tileheight="${s.tileHeight}" tilecount="${d.length}" columns="${M.columns}" spacing="${M.spacing}" margin="${M.margin}">
    <image source="${p}.png" width="${M.width}" height="${M.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${a}" height="${c}">
    <data encoding="csv">
${v.join(`
`)}
    </data>
  </layer>
</map>
`;
  return window.projectApi.exportTileMap({
    png: M.buffer,
    tmx: g,
    baseName: p
  });
}, AS = async (e, t) => {
  const n = U.getState(), s = n.tileSets.find((h) => h.id === n.activeTileSetId);
  if (!s)
    return window.alert("No tile set available."), null;
  const l = Math.max(1, Math.round(e.width)), i = Math.max(1, Math.round(e.height)), r = Math.floor(e.x / s.tileWidth), a = Math.floor(e.y / s.tileHeight), c = Math.ceil((e.x + l) / s.tileWidth) - 1, u = Math.ceil((e.y + i) / s.tileHeight) - 1;
  return Tx({ minTileX: r, minTileY: a, maxTileX: c, maxTileY: u }, t);
}, Cc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), jc = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), jp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), LS = (e, t, n) => {
  const s = W.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let i = e.minTileX; i <= e.maxTileX; i += 1) {
      const r = i * t, a = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(r + u, a + c, 1);
    }
};
class DS {
  constructor() {
    this.id = "tile-export", this.start = null, this.last = null, this.tileWidth = 0, this.tileHeight = 0, this.onBegin = (t) => {
      W.getState().clear();
      const s = U.getState().tileSets.find(
        (l) => l.id === U.getState().activeTileSetId
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
      this.last = s, LS(jp(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = W.getState(), s = t ? jc(Cc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = jp(this.start, s);
      n.clear(), this.start = null, this.last = null, Tx(l);
    }, this.onCancel = () => {
      W.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const BS = 32, Nc = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), Np = (e, t, n, s, l) => {
  const i = W.getState();
  for (let r = 0; r < s; r += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[r * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + r, c);
    }
}, Pp = () => {
  const e = U.getState(), t = e.tileSets.find((n) => n.id === e.activeTileSetId);
  return t ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    tileSetTiles: t.tiles
  } : null;
}, Ip = (e, t) => {
  const n = U.getState(), s = n.tileSets.find((d) => d.id === e);
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
  const r = BS, a = new Array(r * r).fill(-1), c = Math.floor(r / 2), u = -c * s.tileWidth, h = -c * s.tileHeight;
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
class YS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (W.getState().clear(), this.activeTile = Pp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = Ip(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = U.getState();
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
      if (W.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Pp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Ot(), this.resetPlacementResolver(), this.activeMap = Ip(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = U.getState(), l = !s.nineSlice || t.ctrl;
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
      const t = U.getState();
      if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
        const s = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x), l = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y), i = this.readNineSlice({ x: s, y: l });
        i && t.setNineSlice(i);
      } else if (this.changes.size > 0) {
        if (this.placementResolver) {
          const l = this.placementResolver.getPendingTiles();
          l.length > 0 && U.getState().appendTilesToSet(this.activeTile.tileSetId, l);
        }
        const s = Array.from(this.changes.entries()).map(([l, i]) => ({
          index: l,
          tile: i
        }));
        U.getState().setTileMapTiles(this.activeMap.tileMapId, s);
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
    const u = U.getState().expandTileMapToInclude(
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
    const l = U.getState().tileMaps.find(
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
        const f = d * i + p, m = a[f] ?? -1;
        c.push(m);
      }
    return { tileSetId: this.activeTile.tileSetId, tiles: c };
  }
  readNineSliceFromSelection() {
    const t = U.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
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
    const l = U.getState().tileMaps.find(
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
        const m = this.activeTile.tileSetTiles[f], S = t.x + u, M = t.y + c;
        Np(
          S * this.activeTile.tileWidth,
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
    const l = U.getState().nineSlice;
    if (!l || l.tileSetId !== this.activeTile.tileSetId)
      return;
    const i = Math.min(t.x, n.x), r = Math.max(t.x, n.x), a = Math.min(t.y, n.y), c = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: i, y: a }, { x: r, y: c }))
      return;
    const { columns: h, rows: p } = this.activeMap, d = Math.round(this.activeMap.originX / this.activeTile.tileWidth), f = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let m = a; m <= c; m += 1)
      for (let S = i; S <= r; S += 1) {
        const M = S - d, v = m - f;
        if (M < 0 || v < 0 || M >= h || v >= p)
          continue;
        const g = m === a, y = m === c, w = S === i, b = S === r;
        let _ = 4;
        g && w ? _ = 0 : g && b ? _ = 2 : y && w ? _ = 6 : y && b ? _ = 8 : g ? _ = 1 : y ? _ = 7 : w ? _ = 3 : b && (_ = 5);
        const k = l.tiles[_] ?? -1;
        if (k < 0 || k >= this.activeTile.tileSetTiles.length)
          continue;
        const j = v * h + M, A = this.resolvePlacedTileIndex(k, j);
        this.drawing && this.changes.set(j, A);
        const L = this.getTilePixels(A);
        if (!L)
          continue;
        const Y = S * this.activeTile.tileWidth, N = m * this.activeTile.tileHeight;
        Np(
          Y,
          N,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          L
        );
      }
  }
}
class XS {
  constructor() {
    this.id = "text";
  }
}
class FS {
  constructor() {
    this.id = "ai";
  }
}
const OS = () => {
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
}, zS = (e) => ({
  x: Math.floor(e.canvasX / C),
  y: Math.floor(e.canvasY / C)
}), HS = (e, t, n, s) => {
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
class WS {
  constructor() {
    this.id = "magic-wand", this.onBegin = (t) => {
      const n = OS();
      if (!n)
        return;
      const { x: s, y: l } = zS(t);
      if (s < n.minX || s > n.maxX || l < n.minY || l > n.maxY)
        return;
      const i = ee.getState().getPixel(s, l), { pixels: r, touchesBoundary: a } = HS(s, l, i, n);
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
})), Gr = (e, t, n) => Math.min(n, Math.max(t, e)), US = ({ x: e, y: t, onClose: n }) => {
  const s = Nt((w) => w.activeTool), l = mn((w) => w.size), i = mn((w) => w.shape), r = Gt((w) => w.radius), a = Gt((w) => w.density), c = Mt((w) => w.mode), u = ye((w) => w.selectedCount), h = T.useRef(null), [p, d] = T.useState({ x: e, y: t }), f = T.useMemo(() => W0[s] ?? "Tools", [s]);
  T.useEffect(() => {
    const w = (_) => {
      h.current && h.current.contains(_.target) || n();
    }, b = (_) => {
      _.key === "Escape" && n();
    };
    return window.addEventListener("mousedown", w), window.addEventListener("keydown", b), () => {
      window.removeEventListener("mousedown", w), window.removeEventListener("keydown", b);
    };
  }, [n]), T.useLayoutEffect(() => {
    if (!h.current)
      return;
    const w = h.current.getBoundingClientRect(), b = 8, _ = Math.max(b, window.innerWidth - w.width - b), k = Math.max(b, window.innerHeight - w.height - b), j = Gr(e, b, _), A = Gr(t, b, k);
    d({ x: j, y: A });
  }, [e, t]);
  const m = (w) => mn.getState().setSize(w), S = (w) => mn.getState().setShape(w), M = (w) => Gt.getState().setRadius(w), v = (w) => Gt.getState().setDensity(w), g = (w) => Mt.getState().setMode(w), y = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
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
        y && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__label", children: "Brush" }),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => m(Gr(l - 1, 1, 64)),
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
              onClick: () => m(Gr(l + 1, 1, 64)),
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
              onClick: () => S("point"),
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
              onClick: () => S("square"),
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
              onClick: () => S("round"),
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
              onClick: () => g("color"),
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
              onClick: () => g("selection"),
              children: "Mode: Selection"
            }
          )
        ] })
      ]
    }
  );
}, $S = (e) => new Promise((t, n) => {
  const s = new FileReader();
  s.onerror = () => n(new Error("Failed to read image file")), s.onload = () => t(s.result), s.readAsDataURL(e);
}), VS = (e) => new Promise((t, n) => {
  const s = new Image();
  s.onload = () => t(s), s.onerror = () => n(new Error("Failed to load image")), s.src = e;
}), kx = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), KS = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : kx(t[t.length - 1]);
}, Cx = (e, t) => {
  const n = KS(e.name ?? "");
  return n || kx(H0[t] ?? t.split("/")[1] ?? "");
}, GS = (e, t) => e || (t && qf[t] ? qf[t] : "image/png"), QS = (e, t) => {
  const n = Cx(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, jx = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, ZS = (e, t, n) => Math.min(n, Math.max(t, e)), qS = (e) => {
  const t = Ce.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * C, i = e.naturalHeight * C, r = Math.min(n / l, s / i) * 0.9;
  return ZS(r, Zs, Wl);
}, JS = (e) => ({
  x: Math.floor(e.x / C),
  y: Math.floor(e.y / C)
}), Nx = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = Cx(e, n), l = GS(n, s), [i, r] = await Promise.all([$S(e), e.arrayBuffer()]), a = await VS(i), c = t ?? jx(), u = JS(c), h = qS(a), p = QS(e, l);
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
}, eM = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? jx();
  for (let l = 0; l < n.length; l += 1) {
    const i = l * C * 2, r = { x: s.x + i, y: s.y + i };
    await Nx(n[l], r);
  }
}, Ep = (e, t, n, s, l, i, r) => {
  e.strokeStyle = r, e.lineWidth = 1;
  const a = Math.floor(t / i) * i, c = t + s;
  for (let p = a; p <= c; p += i)
    e.beginPath(), e.moveTo(p + 0.5, n), e.lineTo(p + 0.5, n + l), e.stroke();
  const u = Math.floor(n / i) * i, h = n + l;
  for (let p = u; p <= h; p += i)
    e.beginPath(), e.moveTo(t, p + 0.5), e.lineTo(t + s, p + 0.5), e.stroke();
}, tM = (e, t, n, s, l, i, r) => {
  const a = Z1();
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
}, nM = (e, t, n, s, l, i) => {
  e.strokeStyle = i, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, sM = (e, t, n, s, l) => {
  var a;
  const i = St.getState();
  if (!i.overlaysVisible)
    return;
  const r = i.items.filter((c) => c.kind === "region");
  if (r.length !== 0) {
    e.save(), e.lineWidth = 1.5, e.font = '11px "Segoe UI", "Helvetica Neue", sans-serif';
    for (const c of r) {
      const u = c.x * C, h = c.y * C, p = Math.max(1, c.width) * C, d = Math.max(1, c.height) * C, f = u + p, m = h + d;
      if (f < t || m < n || u > t + s || h > n + l)
        continue;
      e.fillStyle = "rgba(66, 197, 255, 0.16)", e.strokeStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h, p, d), e.strokeRect(u + 0.5, h + 0.5, Math.max(0, p - 1), Math.max(0, d - 1));
      const S = ((a = c.name) == null ? void 0 : a.trim()) || "Bookmark", M = e.measureText(S).width, v = 5, g = 16, y = Math.max(36, Math.ceil(M + v * 2));
      e.fillStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, h - g, y, g), e.fillStyle = "rgba(5, 12, 18, 0.95)", e.fillText(S, u + v, h - 4);
    }
    e.restore();
  }
}, lM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, Px = (e, t) => {
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
}, iM = (e, t, n, s) => {
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
}, rM = (e, t, n, s, l, i, r) => {
  const a = ee.getState();
  let c = 0, u = 0;
  for (const h of a.layers) {
    if (!h.visible)
      continue;
    const p = h.store.getBlocks();
    for (const { row: d, col: f, block: m } of p) {
      const S = f * B, M = d * B, v = S * C, g = M * C, y = v + B * C, w = g + B * C;
      if (y < t || w < n || v > t + s || g > n + l)
        continue;
      c += 1;
      const b = `${h.id}:${d}:${f}`;
      let _ = r.get(b);
      if (!_) {
        const k = Px(m, i);
        k && (_ = k, r.set(b, k));
      }
      _ && (u += _.pixels, e.drawImage(_.canvas, v, g));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, oM = (e) => {
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
}, aM = (e, t, n, s, l, i, r) => {
  if (r) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [a, c] of i.entries()) {
      const [u, h] = a.split(":"), p = Number(u), f = Number(h) * B * C, m = p * B * C, S = f + B * C, M = m + B * C;
      S < t || M < n || f > t + s || m > n + l || e.drawImage(c.canvas, f, m);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [a, c] of i.entries()) {
      const [u, h] = a.split(":"), p = Number(u), f = Number(h) * B * C, m = p * B * C, S = f + B * C, M = m + B * C;
      S < t || M < n || f > t + s || m > n + l || e.drawImage(c.canvas, f, m);
    }
    e.restore();
  }
}, cM = (e, t, n, s, l) => {
  const i = ye.getState();
  if (i.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const r = i.store.getBlocks();
  for (const { row: a, col: c, block: u } of r) {
    const h = c * B, p = a * B, d = h * C, f = p * C, m = d + B * C, S = f + B * C;
    if (!(m < t || S < n || d > t + s || f > n + l))
      for (let M = 0; M < B; M += 1)
        for (let v = 0; v < B; v += 1) {
          if (u[M * B + v] !== 1)
            continue;
          const g = h + v, y = p + M;
          i.isSelected(g - 1, y) && i.isSelected(g + 1, y) && i.isSelected(g, y - 1) && i.isSelected(g, y + 1) || (g + y) % 2 === 0 && e.fillRect(
            g * C,
            y * C,
            C,
            C
          );
        }
  }
  e.restore();
}, uM = (e, t, n, s, l, i, r) => {
  const { tileSets: a, tileMaps: c } = U.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / C, h = n / C, p = u + s / C, d = h + l / C, f = new Map(a.map((m) => [m.id, m]));
  for (const m of c) {
    const S = f.get(m.tileSetId);
    if (!S)
      continue;
    const M = S.tileWidth, v = S.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const g = m.columns * M, y = m.rows * v, w = m.originX, b = m.originY, _ = w + g, k = b + y;
    if (_ < u || k < h || w > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - w) / M)), A = Math.min(
      m.columns - 1,
      Math.ceil((p - w) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), Y = Math.min(
      m.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || Y < L))
      for (let N = L; N <= Y; N += 1)
        for (let O = j; O <= A; O += 1) {
          const G = N * m.columns + O, oe = m.tiles[G] ?? -1;
          if (oe < 0)
            continue;
          const Q = S.tiles[oe];
          if (!Q)
            continue;
          const ne = `${S.id}:${oe}`;
          let D = r.get(ne);
          if (!D) {
            const F = iM(
              Q.pixels,
              i,
              M,
              v
            );
            F && (D = F, r.set(ne, F));
          }
          D && e.drawImage(
            D.canvas,
            (w + O * M) * C,
            (b + N * v) * C
          );
        }
  }
}, dM = (e, t, n, s, l, i, r) => {
  const { tileSets: a, tileMaps: c } = U.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / C, h = n / C, p = u + s / C, d = h + l / C, f = new Map(a.map((m) => [m.id, m]));
  e.save(), e.fillStyle = i, e.strokeStyle = r, e.lineWidth = Math.max(1, C * 0.08);
  for (const m of c) {
    const S = f.get(m.tileSetId);
    if (!S)
      continue;
    const M = S.tileWidth, v = S.tileHeight;
    if (M <= 0 || v <= 0)
      continue;
    const g = m.columns * M, y = m.rows * v, w = m.originX, b = m.originY, _ = w + g, k = b + y;
    if (_ < u || k < h || w > p || b > d)
      continue;
    const j = Math.max(0, Math.floor((u - w) / M)), A = Math.min(
      m.columns - 1,
      Math.ceil((p - w) / M) - 1
    ), L = Math.max(0, Math.floor((h - b) / v)), Y = Math.min(
      m.rows - 1,
      Math.ceil((d - b) / v) - 1
    );
    if (!(A < j || Y < L))
      for (let N = L; N <= Y; N += 1)
        for (let O = j; O <= A; O += 1) {
          const G = N * m.columns + O;
          if ((m.tiles[G] ?? -1) < 0)
            continue;
          const Q = (w + O * M) * C, ne = (b + N * v) * C, D = M * C, F = v * C;
          e.fillRect(Q, ne, D, F), e.strokeRect(Q + 0.5, ne + 0.5, D - 1, F - 1);
        }
  }
  e.restore();
}, hM = (e, t, n) => {
  const s = W.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * C,
      l.y * C,
      C,
      C
    );
}, fM = (e, t, n, s, l) => {
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
}, pM = (e, t, n, s, l) => {
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
}, mM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(null), s = T.useRef(null), l = T.useRef(/* @__PURE__ */ new Map()), i = T.useRef(/* @__PURE__ */ new Map()), r = T.useRef(/* @__PURE__ */ new Map()), a = T.useRef(0), c = Ce((N) => N.setSize), [u, h] = T.useState(!1), [p, d] = T.useState({ open: !1, x: 0, y: 0 }), f = T.useRef(null), m = T.useRef({ remainingLogDelta: 0, anchor: null, frame: null }), S = T.useRef(Promise.resolve());
  T.useEffect(() => {
    const N = e.current, O = t.current, G = m.current;
    if (!N || !O)
      return;
    c(N.clientWidth, N.clientHeight), s.current = new K0();
    const oe = {
      pen: new a1(),
      spray: new h1(),
      line: new k1(),
      rectangle: new N1(),
      oval: new E1(),
      "fill-bucket": new nS(),
      text: new XS(),
      ai: new FS(),
      eyedropper: new oS(),
      "reference-handle": new fS(),
      stamp: new rS(),
      "magic-wand": new WS(),
      "selection-rect": new D1(),
      "selection-oval": new X1(),
      "selection-lasso": new H1(),
      "texture-roll": new W1(),
      "tile-sampler": new vS(),
      "tile-pen": new _S(),
      "tile-stamp": new CS(),
      "tile-rectangle": new PS(),
      "tile-9slice": new YS(),
      "tile-export": new DS()
    }, Q = oe[Nt.getState().activeTool] ?? oe.pen;
    s.current.setTool(Q);
    const ne = Nt.subscribe((Me) => {
      var X;
      (X = s.current) == null || X.setTool(oe[Me.activeTool] ?? oe.pen);
    }), D = re.subscribe(() => {
      l.current.clear(), r.current.clear();
    }), F = ye.subscribe(() => {
      i.current.clear();
    }), K = U.subscribe(() => {
      r.current.clear();
    }), le = () => {
      var fe;
      const Me = performance.now(), X = Ce.getState();
      if (X.width === 0 || X.height === 0)
        return;
      const ie = lM(O, X.width, X.height);
      if (!ie)
        return;
      const ge = window.devicePixelRatio || 1;
      ie.clearRect(0, 0, X.width, X.height);
      const z = re.getState().colors, Z = z[0] ?? "#000000", P = yt(Z) ?? { r: 0, g: 0, b: 0 }, $ = ha(P, da(P)), te = un($, 0.08), de = un($, 0.18), Ze = un($, 0.5), _e = un($, 0.08), Fe = un($, 0.35), Oe = un($, 0.2), st = un($, 0.5);
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
        const es = Px(wn, z);
        es && l.current.set(ot, es);
      }
      (pt || Ue.length > 0) && U.getState().refreshCanvasSourcedTiles(
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
        const wn = oM($e);
        wn ? i.current.set(ot, wn) : i.current.delete(ot);
      }
      const vt = Re.getState();
      vt.showReferenceLayer && fM(ie, X.camera.x, X.camera.y, Pe, he);
      let Pn = 0, Jn = 0;
      if (vt.showPixelLayer) {
        const ve = rM(
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
      In === "pixel" && !vt.showTileLayer && dM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        Oe,
        st
      ), vt.showTileLayer && uM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        z,
        r.current
      ), tM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        _e,
        Fe
      ), aM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        i.current,
        It.selectedCount > 0
      ), cM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), In === "pixel" && sM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), vt.showTileLayer && U.getState().tileDebugOverlay && gM(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he
      ), vt.showPixelGrid && Ep(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        C,
        te
      ), vt.showTileGrid && Ep(
        ie,
        X.camera.x,
        X.camera.y,
        Pe,
        he,
        C * me,
        de
      ), vt.showAxes && nM(ie, X.camera.x, X.camera.y, Pe, he, Ze);
      const nn = Nt.getState().activeTool;
      hM(ie, z, nn === "selection-rect" || nn === "selection-oval" || nn === "selection-lasso" || nn === "texture-roll" || nn === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), nn === "reference-handle" && pM(
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
  }, g = (N) => {
    const O = f.current;
    if (!O)
      return;
    const G = N.clientX - O.screenX, oe = N.clientY - O.screenY, Q = O.cameraX - G / O.zoom, ne = O.cameraY - oe / O.zoom;
    Ce.getState().panTo(Q, ne);
  }, y = (N) => {
    f.current = null, h(!1), N.currentTarget.releasePointerCapture(N.pointerId);
  }, w = (N) => {
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
      g(N);
      return;
    }
    const O = M(N), G = (N.buttons & 1) === 1;
    (oe = s.current) == null || oe.handleEvent(G ? "move" : "hover", O);
  }, _ = (N) => {
    var G, oe;
    if (f.current) {
      y(N);
      return;
    }
    const O = M(N);
    if ((G = s.current) == null || G.handleEvent("end", O), Au.getState().isRecording) {
      const Q = t.current;
      Q && ((oe = window.recordingApi) != null && oe.addFrame) && (S.current = S.current.then(
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
      y(N);
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
    eM(Array.from(N.dataTransfer.files), ne);
  }, L = (N) => {
    if (N.deltaY === 0)
      return;
    N.preventDefault();
    const O = N.currentTarget.getBoundingClientRect(), G = N.clientX - O.left, oe = N.clientY - O.top, Q = Ce.getState(), ne = {
      x: G / Q.camera.zoom + Q.camera.x,
      y: oe / Q.camera.zoom + Q.camera.y
    }, D = N.deltaMode === 1 ? 16 : N.deltaMode === 2 ? Math.max(240, Q.height) : 1;
    let K = -(N.deltaY * D) * D0;
    if (K > ci ? K = ci : K < -ci && (K = -ci), m.current.remainingLogDelta += K, m.current.anchor = ne, m.current.frame)
      return;
    const le = () => {
      const ae = m.current, Me = ae.remainingLogDelta;
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
    m.current.frame = requestAnimationFrame(le);
  }, Y = (N) => {
    N.preventDefault(), d({ open: !0, x: N.clientX, y: N.clientY });
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: w,
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
      US,
      {
        x: p.x,
        y: p.y,
        onClose: () => d((N) => N.open ? { ...N, open: !1 } : N)
      }
    )
  ] });
}, gM = (e, t, n, s, l) => {
  const { tileMaps: i } = U.getState();
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
}, xM = () => {
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
}, yM = () => {
  const e = Ce.getState(), t = xM();
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
}, Ix = (e, t) => {
  const n = yM(), s = n.maxX - n.minX, l = n.maxY - n.minY, i = Math.min(e / s, t / l), r = (e - s * i) / 2 - n.minX * i, a = (t - l * i) / 2 - n.minY * i;
  return { bounds: n, scale: i, offsetX: r, offsetY: a };
}, vM = (e, t, n) => {
  const s = Ce.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = yt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(r, da(r)), c = Ed(hs(r, a, 0.08)), u = un(a, 0.12), h = un(a, 0.6), p = un(a, 0.8), { bounds: d, scale: f, offsetX: m, offsetY: S } = Ix(t, n), M = d.maxX - d.minX, v = d.maxY - d.minY;
  e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), e.fillStyle = c, e.fillRect(
    m + d.minX * f,
    S + d.minY * f,
    M * f,
    v * f
  ), e.strokeStyle = u, e.strokeRect(
    m + d.minX * f,
    S + d.minY * f,
    M * f,
    v * f
  );
  const g = m, y = S;
  e.strokeStyle = h, e.lineWidth = 2, e.beginPath(), e.moveTo(g + 0.5, S + d.minY * f), e.lineTo(g + 0.5, S + d.maxY * f), e.stroke(), e.beginPath(), e.moveTo(m + d.minX * f, y + 0.5), e.lineTo(m + d.maxX * f, y + 0.5), e.stroke();
  const w = ee.getState();
  let b = 0, _ = 0;
  if (Re.getState().showPixelLayer) {
    const k = f * C, j = Math.max(1, Math.floor(1 / Math.max(k * 0.75, 0.01)));
    for (const A of w.layers)
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
                m + Q * f,
                S + ne * f,
                D,
                D
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const k = s.width / s.camera.zoom, j = s.height / s.camera.zoom, A = s.camera.x * f + m, L = s.camera.y * f + S, Y = k * f, N = j * f;
    e.strokeStyle = p, e.lineWidth = 2, e.strokeRect(A, L, Y, N);
  }
  return { blocksDrawn: b, pixelsDrawn: _, zoom: s.camera.zoom };
}, wM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, SM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(!1), s = T.useRef(null), l = T.useRef(null), i = T.useRef(0), r = Ce((y) => y.panTo), a = Ce((y) => y.zoomBy), c = Ce((y) => y.resetCamera), u = Ce((y) => y.camera), [h, p] = T.useState(String(Math.round(u.x))), [d, f] = T.useState(String(Math.round(u.y)));
  T.useEffect(() => {
    p(String(Math.round(u.x))), f(String(Math.round(u.y)));
  }, [u.x, u.y]);
  const m = () => {
    const y = Number(h), w = Number(d);
    Number.isFinite(y) && Number.isFinite(w) && r(y, w);
  };
  T.useEffect(() => {
    const y = e.current, w = t.current;
    if (!y || !w)
      return;
    const b = () => {
      var D;
      const Y = wM(w, y.clientWidth, y.clientHeight);
      if (!Y)
        return;
      const N = performance.now(), { blocksDrawn: O, pixelsDrawn: G, zoom: oe } = vM(
        Y,
        y.clientWidth,
        y.clientHeight
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
    return L.observe(y), () => {
      _(), k(), j(), A(), L.disconnect();
    };
  }, []);
  const S = (y) => {
    const w = y.currentTarget.getBoundingClientRect(), b = y.clientX - w.left, _ = y.clientY - w.top, { scale: k, offsetX: j, offsetY: A } = Ix(w.width, w.height);
    return {
      x: (b - j) / k,
      y: (_ - A) / k
    };
  }, M = (y) => {
    y.currentTarget.setPointerCapture(y.pointerId), n.current = !0;
    const w = S(y), b = Ce.getState(), _ = b.width / b.camera.zoom, k = b.height / b.camera.zoom;
    s.current = {
      x: w.x - _ / 2,
      y: w.y - k / 2
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
  }, v = (y) => {
    if (!n.current)
      return;
    const w = S(y), b = Ce.getState(), _ = b.width / b.camera.zoom, k = b.height / b.camera.zoom;
    s.current = {
      x: w.x - _ / 2,
      y: w.y - k / 2
    };
  }, g = (y) => {
    n.current = !1, s.current = null, l.current && (cancelAnimationFrame(l.current), l.current = null), y.currentTarget.releasePointerCapture(y.pointerId);
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ o.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: M,
        onPointerMove: v,
        onPointerUp: g
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
            onChange: (y) => p(y.target.value),
            onBlur: m,
            onKeyDown: (y) => {
              y.key === "Enter" && m();
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
            onChange: (y) => f(y.target.value),
            onBlur: m,
            onKeyDown: (y) => {
              y.key === "Enter" && m();
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
}, MM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, bM = (e, t, n) => {
  const s = rt.getState(), l = re.getState().colors, i = l[0] ?? "#000000", r = yt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(r, da(r)), c = Ed(hs(r, a, 0.1)), u = un(a, 0.12);
  if (e.clearRect(0, 0, t, n), e.fillStyle = i, e.fillRect(0, 0, t, n), s.pixels.length === 0 || s.width === 0 || s.height === 0)
    return;
  const h = 12, p = Math.max(1, t - h * 2), d = Math.max(1, n - h * 2), f = Math.min(
    p / s.width,
    d / s.height
  ), m = s.width * f, S = s.height * f, M = (t - m) / 2, v = (n - S) / 2;
  e.fillStyle = c, e.fillRect(M, v, m, S), e.strokeStyle = u, e.strokeRect(M, v, m, S);
  for (const g of s.pixels) {
    const y = l[g.paletteIndex] ?? l[0];
    e.fillStyle = y, e.fillRect(
      M + g.x * f,
      v + g.y * f,
      f,
      f
    );
  }
}, _M = () => {
  const e = T.useRef(null), t = T.useRef(null), n = rt((s) => s);
  return T.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const i = () => {
      const u = MM(l, s.clientWidth, s.clientHeight);
      u && bM(u, s.clientWidth, s.clientHeight);
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
}, Ex = (e) => {
  const t = e.trim();
  return t ? t.toLowerCase().endsWith(".png") ? t : `${t}.png` : "";
}, TM = (e) => {
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
}, kM = async (e) => {
  const t = Ex(e.fileName ?? "");
  if (!t)
    return window.alert("Set a file name before exporting this bookmark."), null;
  const { data: n, width: s, height: l } = TM(e), i = document.createElement("canvas");
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
}, CM = async (e) => {
  const t = Ex(e.fileName ?? "").replace(/\.png$/i, "");
  return t ? AS(
    {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height
    },
    { baseName: t }
  ) : (window.alert("Set a file name before exporting this bookmark."), null);
}, Rp = (e) => Math.round(e / C), jM = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const r = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: r, y: a });
}, NM = () => {
  const e = St((f) => f.items), t = St((f) => f.addFromCamera), n = St((f) => f.rename), s = St((f) => f.remove), l = St((f) => f.move), i = St((f) => f.jumpTo), r = St((f) => f.setRegionPosition), a = St((f) => f.setRegionSize), c = St((f) => f.setRegionFileName), u = St((f) => f.overlaysVisible), h = St((f) => f.toggleOverlaysVisible), p = zt((f) => f.items), d = T.useMemo(
    () => p.map((f) => {
      const m = ma(f), S = (m.minX + m.maxX) / 2, M = (m.minY + m.maxY) / 2;
      return {
        id: f.id,
        name: f.assetFilename,
        centerX: S,
        centerY: M,
        x: Rp(S),
        y: Rp(M)
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
      e.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "nav-panel__empty", children: "No bookmarks yet." }) : /* @__PURE__ */ o.jsx("div", { className: "nav-panel__list", children: e.map((f, m) => {
        var S;
        return /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__row nav-panel__row--bookmark", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__meta", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                className: "nav-panel__name",
                value: f.name,
                "aria-label": `Bookmark name ${m + 1}`,
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
                "aria-label": `Bookmark export file ${m + 1}`,
                placeholder: "export file name (e.g. hero-idle.png)",
                onChange: (M) => c(f.id, M.currentTarget.value)
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__actions nav-panel__actions--bookmark", children: [
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "nav-panel__button",
                onClick: () => i(f.id),
                children: "Go"
              }
            ),
            (S = f.fileName) != null && S.trim() ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  className: "nav-panel__button",
                  onClick: () => {
                    kM(f);
                  },
                  children: "Export PNG"
                }
              ),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  className: "nav-panel__button",
                  onClick: () => {
                    CM(f);
                  },
                  children: "Export Tilemap"
                }
              )
            ] }) : null,
            /* @__PURE__ */ o.jsx(
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
            /* @__PURE__ */ o.jsx(
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
            onClick: () => jM(f.centerX, f.centerY),
            children: "Go"
          }
        ) })
      ] }, f.id)) })
    ] })
  ] });
}, PM = () => {
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
      const f = e.findIndex((v) => v.id === d.id), m = f === e.length - 1, S = f === 0, M = d.id === t;
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
                  disabled: m,
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
                  disabled: S,
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
}, IM = () => {
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
    t === "nav" ? /* @__PURE__ */ o.jsx(NM, {}) : t === "layers" ? /* @__PURE__ */ o.jsx(PM, {}) : t === "paste" && e ? /* @__PURE__ */ o.jsx(_M, {}) : /* @__PURE__ */ o.jsx(SM, {})
  ] });
}, EM = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, Ap = (e, t, n) => Math.min(n, Math.max(t, e)), on = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: i
}) => {
  const a = `dropdown-${T.useId()}`, c = T.useRef(null), u = T.useRef(null), [h, p] = T.useState(!1), [d, f] = T.useState(0), [m, S] = T.useState(null), M = T.useMemo(() => EM(t, e), [t, e]), v = T.useMemo(
    () => Math.max(0, t.findIndex((b) => b.value === e)),
    [t, e]
  ), g = () => {
    const b = c.current;
    if (!b)
      return null;
    const _ = b.getBoundingClientRect(), k = window.innerHeight || document.documentElement.clientHeight || 0, j = 260, A = k - _.bottom - 12, L = _.top - 12, Y = A >= Math.min(j, 180) || A >= L, N = Ap(Y ? A : L, 120, j), O = Y ? _.bottom + 6 : _.top - 6 - N;
    return { left: _.left, top: O, width: _.width, maxHeight: N };
  };
  T.useEffect(() => {
    if (!h)
      return;
    f(v);
    const b = g();
    S(b);
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
        f((N) => Ap(N + Y, 0, t.length - 1));
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
      const L = g();
      S(L);
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
  const y = (b) => {
    s || (b.key === "ArrowDown" || b.key === "ArrowUp") && (b.preventDefault(), p(!0));
  }, w = (b) => {
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
        onKeyDown: y,
        children: [
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__label", children: M }),
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__chevron", "aria-hidden": "true", children: "▾" })
        ]
      }
    ),
    h && m && Ci.createPortal(
      /* @__PURE__ */ o.jsx(
        "div",
        {
          ref: u,
          id: a,
          className: "dropdown-select__menu",
          role: "listbox",
          "aria-label": l,
          style: {
            left: `${m.left}px`,
            top: `${m.top}px`,
            width: `${m.width}px`,
            maxHeight: `${m.maxHeight}px`
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
                b.disabled || w(b.value);
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
}, De = (e) => Math.min(1, Math.max(0, e)), Mn = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Ad = (e) => (e % 360 + 360) % 360, Pc = (e) => e.toString(16).padStart(2, "0"), fn = (e) => `#${Pc(e.r)}${Pc(e.g)}${Pc(e.b)}`, Rx = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), r = l - i;
  let a = 0;
  r !== 0 && (l === t ? a = (n - s) / r % 6 : l === n ? a = (s - t) / r + 2 : a = (t - n) / r + 4, a *= 60), a < 0 && (a += 360);
  const c = (l + i) / 2, u = r === 0 ? 0 : r / (1 - Math.abs(2 * c - 1));
  return { h: a, s: u, l: c };
}, RM = (e) => {
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
}, AM = (e) => {
  const t = yt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = Rx(t), i = (A, L, Y) => fn(
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
  ]), f = De(l.s * 0.45 + 0.15), m = De(l.l * 0.4 + 0.6), S = an([
    i(-25, f, De(m + 0.05)),
    i(-10, f, De(m + 0.02)),
    i(0, f, m),
    i(10, f, De(m - 0.03)),
    i(25, f, De(m - 0.06))
  ]), M = De(l.s * 0.35 + 0.12), v = De(l.l * 0.8 + 0.1), g = an([
    i(-30, M, De(v - 0.08)),
    i(-15, M, v),
    i(0, M, De(v + 0.05)),
    i(15, M, De(v - 0.03)),
    i(30, M, De(v + 0.08))
  ]), y = De(Math.max(0.7, l.s * 1.25)), w = De(l.l * 0.85 + 0.06), b = an([
    i(-20, y, De(w - 0.08)),
    i(-10, y, w),
    i(0, y, De(w + 0.04)),
    i(15, y, De(w - 0.04)),
    i(30, y, De(w + 0.08))
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
    { id: "pastel", label: "Pastel", colors: S },
    { id: "muted", label: "Muted", colors: g },
    { id: "vibrant", label: "Vibrant", colors: b },
    { id: "mono", label: "Monochrome Ramp", colors: k },
    { id: "hue-sweep", label: "Hue Sweep", colors: j }
  ];
}, LM = () => {
  const e = re((I) => I.colors), t = re((I) => I.selectedIndices), n = re((I) => I.setColor), s = re((I) => I.setPalette), l = re((I) => I.setSelectedIndices), i = re((I) => I.getActiveIndex()), r = re((I) => I.addColor), a = (I, R) => {
    const q = I.filter((ue) => ue !== R);
    return q.push(R), q;
  }, [c, u] = T.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [h, p] = T.useState("none"), [d, f] = T.useState(!1), [m, S] = T.useState(!1), [M, v] = T.useState(""), [g, y] = T.useState(!1), [w, b] = T.useState(null), [_, k] = T.useState(null), [j, A] = T.useState({ r: 255, g: 255, b: 255 }), [L, Y] = T.useState({
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
  ), ie = Te.useMemo(() => RM(j), [j]), ge = Te.useMemo(() => Rx(j), [j]), z = () => {
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
  const P = t.length === 1 ? t[0] ?? null : null, $ = P !== null && P >= 0 && P < e.length, te = $ && P !== null ? e[P] : "#ffffff", de = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ze = Te.useMemo(
    () => AM(de),
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
    !$ || P === null || (z(), Fe({ mode: "set", index: P }, te));
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
    b(null), S(!0), I && v(I);
  }, []), ve = () => {
    S(!1), y(!1), b(null), v("");
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
      y(!0), b(null);
      try {
        const q = await window.paletteApi.importLospec(I), ue = q.colors.length > 0 ? q.colors : e;
        s(ue), l([Math.max(0, ue.length - 1)]), xe.getState().setDirty(!0), ve();
      } catch (q) {
        const ue = q instanceof Error ? q.message : "Unable to import palette.";
        b(ue), y(!1);
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
              disabled: !$,
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
                        const q = Dp(R);
                        if (!Lp(q))
                          return;
                        const ue = yt(q);
                        ue && A(ue);
                      },
                      onBlur: () => {
                        const I = Dp(N);
                        if (!Lp(I)) {
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
    m && Ci.createPortal(
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
                w && /* @__PURE__ */ o.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: w }),
                /* @__PURE__ */ o.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: ve, disabled: g, children: "Cancel" }),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void ot(),
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
}, DM = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
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
}, BM = () => {
  const e = U((P) => P.tileSets), t = U((P) => P.activeTileSetId), n = U((P) => P.tilePage), s = U((P) => P.tilePageCount), l = U((P) => P.setTilePageCount), i = U((P) => P.selectedTileIndex), r = U((P) => P.selectedTileIndices), a = U((P) => P.tilePickerZoom), c = U((P) => P.setTileSelection), u = U((P) => P.setActiveTileSet), h = U((P) => P.deleteTilesFromSet), p = re((P) => P.colors), d = T.useMemo(() => e.find((P) => P.id === t) ?? e[0], [e, t]);
  T.useEffect(() => {
    !d && e.length > 0 && u(e[0].id);
  }, [d, e, u]);
  const f = (d == null ? void 0 : d.tiles.length) ?? 0, m = (d == null ? void 0 : d.tiles) ?? [], S = Math.max(1, (d == null ? void 0 : d.columns) ?? 1), M = Math.max(1, (d == null ? void 0 : d.rows) ?? 1), v = S * M, g = Math.max(1, Math.ceil(f / v)), y = d ? Math.max(16, d.tileWidth * a) : 32, w = T.useRef(null), [b, _] = T.useState({ width: 0, height: 0 }), k = S * y, j = M * y, A = T.useMemo(() => {
    if (b.width <= 0)
      return 1;
    const P = Math.floor((b.width + 8) / Math.max(1, k + 8));
    return Math.max(1, Math.min(g, P));
  }, [k, b.width, g]), L = T.useMemo(() => {
    if (b.height <= 0)
      return 1;
    const P = Math.floor((b.height + 8) / Math.max(1, j + 8));
    return Math.max(1, P);
  }, [j, b.height]), Y = Math.max(1, A * L), N = Math.max(1, Math.ceil(g / Y)), O = Math.min(n, N - 1), G = O * Y, oe = Math.max(0, Math.min(Y, g - G)), Q = T.useRef(!1), ne = T.useRef(null), D = T.useMemo(
    () => new Set(r.filter((P) => P >= 0)),
    [r]
  ), F = T.useMemo(() => {
    const P = new Set(r.filter(($) => $ >= 0));
    return Array.from(P).sort(($, te) => $ - te);
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
    const P = w.current;
    if (!P)
      return;
    const $ = Math.floor(P.clientWidth || P.getBoundingClientRect().width || 0), te = Math.floor(P.clientHeight || P.getBoundingClientRect().height || 0);
    _(
      (de) => de.width === $ && de.height === te ? de : { width: $, height: te }
    );
  }, []);
  T.useEffect(() => {
    const P = w.current;
    if (!P)
      return;
    const $ = () => {
      le();
    };
    if ($(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", $), () => {
        window.removeEventListener("resize", $);
      };
    const te = new ResizeObserver(() => $()), de = P.parentElement;
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
  }, [le, y, g, N, O]);
  const ae = (P) => {
    const $ = Math.floor(P / v), te = P % v, de = te % S, Ze = Math.floor(te / S), _e = $ % A;
    return {
      row: Math.floor($ / A) * M + Ze,
      col: _e * S + de
    };
  }, Me = (P, $) => {
    if (P.length === 0) {
      c([$], 1, 1, $);
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
    c(Pe, Oe, st, $);
  }, X = (P, $) => {
    const te = ae(P), de = ae($), Ze = Math.min(te.col, de.col), _e = Math.max(te.col, de.col), Fe = Math.min(te.row, de.row), Oe = Math.max(te.row, de.row), st = _e - Ze + 1, Pe = Oe - Fe + 1, he = new Array(st * Pe).fill(-1);
    for (let pt = Fe; pt <= Oe; pt += 1)
      for (let Ue = Ze; Ue <= _e; Ue += 1) {
        const It = Math.floor(Ue / S), tn = Math.floor(pt / M), vt = Ue % S, Pn = pt % M, In = (tn * A + It) * v + Pn * S + vt;
        if (In < 0 || In >= f)
          continue;
        const nn = (pt - Fe) * st + (Ue - Ze);
        he[nn] = In;
      }
    c(he, st, Pe, P);
  }, ie = (P, $) => {
    if (Q.current = !0, ne.current = P, $ != null && $.additive) {
      const te = /* @__PURE__ */ new Set([
        ...r.filter((de) => de >= 0),
        P
      ]);
      Me(Array.from(te), P);
      return;
    }
    if ($ != null && $.subtractive) {
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
    const P = ($) => {
      if ($.key !== "Delete" && $.key !== "Backspace")
        return;
      const te = $.target;
      if (te) {
        const de = te.tagName;
        if (de === "INPUT" || de === "TEXTAREA" || te.isContentEditable)
          return;
      }
      !d || F.length === 0 || ($.preventDefault(), K());
    };
    return window.addEventListener("keydown", P), () => window.removeEventListener("keydown", P);
  }, [d, K, F.length]);
  const Z = T.useCallback((P) => {
    const $ = w.current;
    $ && ($.scrollHeight <= $.clientHeight || ($.scrollTop += P.deltaY, P.preventDefault(), P.stopPropagation()));
  }, []);
  return /* @__PURE__ */ o.jsx("div", { className: "tilebar", children: /* @__PURE__ */ o.jsx(
    "div",
    {
      ref: w,
      className: "tilebar__grid",
      onWheel: Z,
      style: {
        "--tile-cell-size": `${y}px`,
        "--tile-cluster-columns": `${S}`,
        "--tile-cluster-rows": `${M}`
      },
      children: d ? f === 0 ? /* @__PURE__ */ o.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: oe }, (P, $) => {
        const te = G + $, de = te * v;
        return /* @__PURE__ */ o.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: v }, (Ze, _e) => {
          const Fe = de + _e, Oe = Fe < 0 || Fe >= f, st = Oe ? null : m[Fe], Pe = !Oe && D.has(Fe);
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
                DM,
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
}, Ax = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, Lx = (e, t, n, s) => {
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
}, Dx = (e) => {
  const t = Ax(e.fontSize), n = e.text;
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
  for (const w of i) {
    const b = l.measureText(w);
    r = Math.max(r, Math.ceil(b.width));
  }
  const a = 2, c = Math.max(1, r + a * 2), u = Math.max(1, i.length * t + a * 2);
  s.width = c, s.height = u, l.clearRect(0, 0, c, u), l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`, l.fillStyle = "#ffffff";
  for (let w = 0; w < i.length; w += 1)
    l.fillText(i[w] ?? "", a, a + w * t);
  const p = l.getImageData(0, 0, c, u).data, d = e.alphaThreshold ?? 128;
  let f = Number.POSITIVE_INFINITY, m = Number.POSITIVE_INFINITY, S = Number.NEGATIVE_INFINITY, M = Number.NEGATIVE_INFINITY;
  for (let w = 0; w < u; w += 1)
    for (let b = 0; b < c; b += 1)
      (p[(w * c + b) * 4 + 3] ?? 0) < d || (f = Math.min(f, b), m = Math.min(m, w), S = Math.max(S, b), M = Math.max(M, w));
  if (!Number.isFinite(f) || !Number.isFinite(m))
    return null;
  const v = S - f + 1, g = M - m + 1, y = [];
  for (let w = m; w <= M; w += 1)
    for (let b = f; b <= S; b += 1)
      (p[(w * c + b) * 4 + 3] ?? 0) < d || y.push({
        x: b - f,
        y: w - m,
        paletteIndex: e.paletteIndex
      });
  return { pixels: y, width: v, height: g };
}, YM = (e) => {
  const t = fa(), { gradientDirection: n, gradientDither: s } = Mt.getState(), l = Dx({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const i = t.length > 1 ? Lx(l, t, n, s) : l;
  rt.getState().setBuffer({
    pixels: i.pixels,
    origin: { x: 0, y: 0 },
    width: i.width,
    height: i.height
  }), Nt.getState().setActiveTool("stamp");
}, XM = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], FM = [8, 16, 24, 32], OM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, zM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const i = re((w) => w.colors), r = re((w) => w.selectedIndices), a = re((w) => w.getActiveIndex()), c = Mt((w) => w.gradientDirection), u = Mt((w) => w.gradientDither), [h, p] = Te.useState(e), [d, f] = Te.useState(t), [m, S] = Te.useState(Ax(n)), M = T.useRef(null), v = T.useRef(null), g = T.useRef(null);
  T.useEffect(() => {
    var w, b, _;
    (w = M.current) == null || w.focus(), (_ = (b = M.current) == null ? void 0 : b.select) == null || _.call(b);
  }, []);
  const y = T.useMemo(() => {
    try {
      const w = Dx({
        text: h,
        fontFamily: d,
        fontSize: m,
        paletteIndex: a
      });
      if (!w)
        return null;
      const b = /* @__PURE__ */ new Set(), _ = [];
      for (const k of r)
        k < 0 || k >= i.length || b.has(k) || (b.add(k), _.push(k));
      return _.length <= 1 ? w : Lx(w, _, c, u);
    } catch {
      return null;
    }
  }, [
    a,
    d,
    m,
    c,
    u,
    i.length,
    r,
    h
  ]);
  return T.useEffect(() => {
    const w = v.current, b = g.current;
    if (!w || !b)
      return;
    const _ = () => {
      const A = OM(b, w.clientWidth, w.clientHeight);
      if (!A)
        return;
      const L = w.clientWidth, Y = w.clientHeight, N = i[0] ?? "#000000", O = yt(N) ?? { r: 0, g: 0, b: 0 }, G = ha(O, da(O)), oe = Ed(hs(O, G, 0.1)), Q = un(G, 0.12);
      if (A.clearRect(0, 0, L, Y), A.fillStyle = N, A.fillRect(0, 0, L, Y), !y || y.pixels.length === 0)
        return;
      const ne = 12, D = Math.max(1, L - ne * 2), F = Math.max(1, Y - ne * 2), K = Math.max(
        1,
        Math.floor(
          Math.min(D / y.width, F / y.height)
        )
      ), le = y.width * K, ae = y.height * K, Me = Math.floor((L - le) / 2), X = Math.floor((Y - ae) / 2);
      A.fillStyle = oe, A.fillRect(Me, X, le, ae), A.strokeStyle = Q, A.strokeRect(Me, X, le, ae);
      const ie = /* @__PURE__ */ new Map();
      for (const ge of y.pixels) {
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
    return j.observe(w), () => {
      k(), j.disconnect();
    };
  }, [a, i, y]), /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (w) => {
        w.key === "Escape" && (w.preventDefault(), s());
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
                  onChange: (w) => f(w.target.value),
                  children: XM.map((w) => /* @__PURE__ */ o.jsx("option", { value: w.value, children: w.label }, w.value))
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Size" }),
              /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsx(
                "select",
                {
                  value: m,
                  onChange: (w) => S(Number(w.target.value)),
                  children: FM.map((w) => /* @__PURE__ */ o.jsxs("option", { value: w, children: [
                    w,
                    "px"
                  ] }, w))
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
                  onChange: (w) => p(w.target.value),
                  placeholder: "Type text…",
                  onKeyDown: (w) => {
                    if (w.key === "Enter") {
                      if (w.preventDefault(), !h.trim())
                        return;
                      l({ text: h, fontFamily: d, fontSize: m });
                    }
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsx("div", { className: "text-tool__preview", ref: v, children: /* @__PURE__ */ o.jsx("canvas", { ref: g }) }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: s, children: "Cancel" }),
                /* @__PURE__ */ o.jsx(
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
}, HM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = T.useState(!0), [l, i] = T.useState(!1), [r, a] = T.useState(!1), [c, u] = T.useState(!1), [h, p] = T.useState("gpt-image-1"), [d, f] = T.useState("openai"), [m, S] = T.useState("http://localhost:8080/v1"), [M, v] = T.useState("sdxl"), [g, y] = T.useState(!1), [w, b] = T.useState(!1), [_, k] = T.useState(!1), [j, A] = T.useState(!1), [L, Y] = T.useState(""), [N, O] = T.useState(!1), [G, oe] = T.useState(!1), [Q, ne] = T.useState(""), D = T.useRef(null);
  T.useEffect(() => {
    let z = !1;
    return (async () => {
      try {
        const P = await window.optionsApi.getOpenAiKeyInfo(), $ = await window.optionsApi.getOpenAiImageModel(), te = await window.optionsApi.getAiImageProvider(), de = await window.optionsApi.getLocalAiConfig(), Ze = await window.optionsApi.getLocalAiKeyInfo(), _e = await window.optionsApi.getAdvancedMode();
        if (z)
          return;
        i(P.hasKey), a(P.encryptionAvailable), u(P.storedEncrypted), p($), f(te), S(de.baseUrl), v(de.model), y(Ze.hasKey), b(Ze.encryptionAvailable), k(Ze.storedEncrypted), O(_e);
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
      y(Z.hasKey), b(Z.encryptionAvailable), k(Z.storedEncrypted), Y(""), A(!1);
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
        y(z.hasKey), b(z.encryptionAvailable), k(z.storedEncrypted), Y(""), A(!1);
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
                      value: m,
                      onChange: (z) => S(z.target.value),
                      onBlur: () => void window.optionsApi.setLocalAiBaseUrl(m),
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
                      placeholder: g ? "•••••••••••••••• (saved)" : "(optional)",
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
                /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.9 }, children: g ? _ ? "Saved (encrypted)" : w ? "Saved" : "Saved (not encrypted)" : "Not set (optional)" })
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
                      disabled: n || !g,
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
}, WM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, UM = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((h) => yt(h) ?? { r: 0, g: 0, b: 0 }), i = l.length > 1 ? Array.from({ length: l.length - 1 }, (h, p) => p + 1) : [0], r = [], { width: a, height: c, data: u } = e;
  for (let h = 0; h < c; h += 1)
    for (let p = 0; p < a; p += 1) {
      const d = (h * a + p) * 4, f = u[d] ?? 0, m = u[d + 1] ?? 0, S = u[d + 2] ?? 0;
      if ((u[d + 3] ?? 0) < s)
        continue;
      const v = { r: f, g: m, b: S };
      let g = i[0] ?? 0, y = Number.POSITIVE_INFINITY;
      for (const w of i) {
        const b = WM(v, l[w] ?? l[0]);
        b < y && (y = b, g = w);
      }
      g !== 0 && r.push({ x: p, y: h, paletteIndex: g });
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
}, $M = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const i = l.x - e.minX, r = l.y - e.minY;
    s[r * t + i] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, VM = async () => {
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
}, os = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), KM = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = re((N) => N.colors), [l, i] = T.useState(e), [r, a] = T.useState(16), [c, u] = T.useState(16), [h, p] = T.useState(1), [d, f] = T.useState(1), [m, S] = T.useState(!1), [M, v] = T.useState(!1), [g, y] = T.useState(""), [w, b] = T.useState(0), [_, k] = T.useState(null), j = T.useRef(null), A = T.useMemo(() => os(r, 1, 512) * os(h, 1, 64), [
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
    v(!0), y("Preparing request…");
    try {
      y(m ? "Encoding reference…" : "Preparing prompt…");
      const G = m ? await VM() : null;
      y("Waiting for OpenAI…");
      const oe = await window.aiApi.generateSprite({
        prompt: N,
        palette: s,
        cellWidth: os(r, 1, 512),
        cellHeight: os(c, 1, 512),
        columns: os(h, 1, 64),
        rows: os(d, 1, 64),
        referencePngBase64: G
      });
      y("Processing image…");
      const Q = new Image(), ne = `data:image/png;base64,${oe.pngBase64}`;
      await new Promise((ae, Me) => {
        Q.onload = () => ae(), Q.onerror = () => Me(new Error("Failed to load generated image.")), Q.src = ne;
      });
      const D = document.createElement("canvas");
      D.width = A, D.height = L;
      const F = D.getContext("2d");
      if (!F)
        throw new Error("Canvas unavailable.");
      F.imageSmoothingEnabled = !1, F.clearRect(0, 0, A, L), F.drawImage(Q, 0, 0, A, L), y("Quantizing to palette…");
      const K = F.getImageData(0, 0, A, L), le = UM(K, s, { alphaThreshold: 10 });
      y("Copying to Stamp…"), rt.getState().setBuffer({
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
        useSelectionAsReference: m
      });
    } catch (G) {
      console.error("AI generation failed:", G), k(G instanceof Error ? G.message : "AI generation failed.");
    } finally {
      v(!1), y("");
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
                    g || "Generating…",
                    w > 0 ? ` (${w}s)` : ""
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
                    checked: m,
                    onChange: (N) => S(N.target.checked),
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
}, GM = (e, t) => {
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
}, Bx = (e = {}) => {
  const t = ye.getState();
  if (t.selectedCount === 0)
    return null;
  const n = ee.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: h, col: p, block: d } of u) {
    const f = p * B, m = h * B;
    for (let S = 0; S < B; S += 1)
      for (let M = 0; M < B; M += 1) {
        if (d[S * B + M] !== 1)
          continue;
        const v = f + M, g = m + S, y = c ? GM(v, g) : n.getPixel(v, g);
        s.push({ x: v, y: g, paletteIndex: y }), l = Math.min(l, v), i = Math.max(i, v), r = Math.min(r, g), a = Math.max(a, g);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: i, minY: r, maxY: a };
}, Yx = (e) => {
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
  const t = Bx(e);
  t && (Yx(t), ye.getState().clear(), Nt.getState().setActiveTool("stamp"));
}, Xx = () => {
  const e = Bx();
  if (!e)
    return;
  Yx(e);
  const t = ee.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Ae.getState().pushBatch({ changes: n })), ye.getState().clear(), Nt.getState().setActiveTool("stamp");
}, QM = () => {
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
        const m = h + f, S = p + d, M = n.getPixelInLayer(s, m, S);
        M !== 0 && (l.push({ x: m, y: S, prev: M, next: 0 }), i.push({ x: m, y: S, paletteIndex: 0 }));
      }
  }
  i.length !== 0 && (n.setPixelsInLayer(s, i), t.pushBatch({ layerId: s, changes: l }));
}, Fx = () => {
  const e = U.getState();
  return e.tileSets.find((t) => t.id === e.activeTileSetId) ?? null;
}, ZM = (e) => {
  const t = U.getState(), n = t.tileMaps.find(
    (s) => s.id === t.activeTileMapId && s.tileSetId === e
  );
  return n || (t.tileMaps.find((s) => s.tileSetId === e) ?? null);
}, Ox = (e) => {
  const t = ZM(e.id);
  if (!t)
    return null;
  const n = ye.getState();
  if (n.selectedCount <= 0)
    return null;
  const s = /* @__PURE__ */ new Set();
  let l = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = n.store.getBlocks();
  for (const { row: d, col: f, block: m } of c) {
    const S = f * B, M = d * B;
    for (let v = 0; v < B; v += 1)
      for (let g = 0; g < B; g += 1) {
        if (m[v * B + g] !== 1)
          continue;
        const y = S + g, w = M + v, b = Math.floor((y - t.originX) / e.tileWidth), _ = Math.floor((w - t.originY) / e.tileHeight);
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
    const [f, m] = d.split(":"), S = Number(f), M = Number(m), v = (M - i) * u + (S - l);
    p[v] = t.tiles[M * t.columns + S] ?? -1;
  }
  return {
    map: t,
    tiles: p,
    cols: u,
    rows: h,
    bounds: { minCol: l, minRow: i, maxCol: r, maxRow: a }
  };
}, zx = (e) => {
  const t = U.getState(), n = Math.max(1, t.selectedTileCols), s = Math.max(1, t.selectedTileRows), l = n * s, i = new Array(l).fill(-1);
  for (let r = 0; r < l; r += 1)
    i[r] = t.selectedTileIndices[r] ?? -1;
  return i.some((r) => r >= 0) ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: i,
    cols: n,
    rows: s,
    source: "palette"
  }), ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0) : !1;
}, Hx = () => {
  const e = Fx();
  if (!e)
    return !1;
  const t = Ox(e);
  return t ? (rt.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: t.tiles,
    cols: t.cols,
    rows: t.rows,
    source: "map"
  }), ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0) : zx(e);
}, Wx = () => {
  const e = Fx();
  if (!e)
    return !1;
  const t = Ox(e);
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
      U.getState().setTileMapTiles(t.map.id, r);
      const c = Ot();
      qs(a, c);
    }
    return ye.getState().clear(), Nt.getState().setActiveTool("tile-stamp"), !0;
  }
  if (!zx(e))
    return !1;
  const s = Array.from(
    new Set(U.getState().selectedTileIndices.filter((r) => r >= 0))
  ).sort((r, a) => r - a);
  if (s.length === 0)
    return !1;
  const l = Ot();
  U.getState().deleteTilesFromSet(e.id, s);
  const i = Ot();
  return qs(l, i), !0;
}, Ux = async () => {
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
}, Bp = (e, t, n) => Math.min(n, Math.max(t, e)), qM = (e, t, n, s) => {
  const [l, i] = Te.useState({ x: t, y: n });
  return Te.useLayoutEffect(() => {
    if (!e || !s.current) {
      i({ x: t, y: n });
      return;
    }
    const r = s.current.getBoundingClientRect(), a = 8, c = Math.max(a, window.innerWidth - r.width - a), u = Math.max(a, window.innerHeight - r.height - a);
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
class JM extends Te.Component {
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
const eb = ({
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
  const d = Te.useRef(null), f = Te.useRef(null), m = Ae((P) => P.locked), S = Ae((P) => P.undoStack.length > 0), M = Ae((P) => P.redoStack.length > 0), v = Ae((P) => P.undo), g = Ae((P) => P.redo), y = rt((P) => P), w = y.pixels.length > 0 && y.width > 0 && y.height > 0, b = y.tileBuffer !== null && y.tileBuffer.cols > 0 && y.tileBuffer.rows > 0 && y.tileBuffer.tiles.length > 0, _ = s === "tile", k = U(
    (P) => new Set(P.selectedTileIndices.filter(($) => $ >= 0)).size
  ), j = t > 0 || k > 0, A = () => {
    if (_) {
      Hx();
      return;
    }
    Uo();
  }, L = () => {
    if (_) {
      Wx();
      return;
    }
    Xx();
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
  }), ge = qM(X.open, X.x, X.y, f), z = Te.useCallback(() => {
    ie((P) => P.open ? { ...P, open: !1 } : P);
  }, []), Z = (P) => ($) => {
    if ($.preventDefault(), X.open && X.kind === P) {
      z();
      return;
    }
    ie({ open: !0, kind: P, x: $.clientX, y: $.clientY });
  };
  return Te.useEffect(() => {
    if (!X.open)
      return;
    const P = (te) => {
      f.current && f.current.contains(te.target) || z();
    }, $ = (te) => {
      te.key === "Escape" && z();
    };
    return window.addEventListener("mousedown", P), window.addEventListener("keydown", $), () => {
      window.removeEventListener("mousedown", P), window.removeEventListener("keydown", $);
    };
  }, [z, X.open]), Te.useLayoutEffect(() => {
    const P = d.current;
    if (!P)
      return;
    const $ = () => {
      const de = P.offsetHeight;
      de > 0 && document.documentElement.style.setProperty("--topbar-height", `${de}px`);
    };
    if ($(), typeof ResizeObserver > "u") {
      const de = () => $();
      return window.addEventListener("resize", de), () => {
        window.removeEventListener("resize", de);
      };
    }
    const te = new ResizeObserver($);
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
          disabled: m || !S,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.undo })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: g,
          title: "Redo (Ctrl/Cmd+Shift+Z)",
          "aria-label": "Redo",
          disabled: m || !M,
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
          disabled: _ ? !b : !w,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: Se.paste })
        }
      ),
      c !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            Ux();
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
            var P, $;
            ($ = (P = window.windowApi) == null ? void 0 : P.toggleFullscreen) == null || $.call(P);
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
}, tb = ({
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
}) => /* @__PURE__ */ o.jsx(JM, { children: /* @__PURE__ */ o.jsx(
  eb,
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
) }), nb = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", sb = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, lb = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), i = URL.createObjectURL(l), r = new Image();
  r.onload = () => {
    URL.revokeObjectURL(i), n(r);
  }, r.onerror = () => {
    URL.revokeObjectURL(i), s(new Error("Failed to load reference image"));
  }, r.src = i;
}), ib = () => {
  const e = re.getState(), t = Ce.getState(), n = ee.getState(), s = Ae.getState(), l = zt.getState(), i = U.getState(), r = St.getState(), a = /* @__PURE__ */ new Map(), c = l.items.filter((u) => u.assetFilename && u.assetData).map((u) => (a.has(u.assetFilename) || a.set(u.assetFilename, {
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
}, rb = async (e) => {
  var p, d, f, m, S;
  Rd(), St.getState().clear();
  const t = re.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), Ce.getState().setCamera(e.data.camera);
  const s = ee.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (p = e.data.pixelLayers) == null ? void 0 : p.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), W.getState().clear(), Ae.getState().setStacks(((d = e.data.history) == null ? void 0 : d.undoStack) ?? [], ((f = e.data.history) == null ? void 0 : f.redoStack) ?? []);
  const r = zt.getState();
  r.clear();
  const a = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (a.length > 0 && c.length > 0) {
    const M = new Map(c.map((g) => [g.filename, g])), v = await Promise.all(
      a.map(async (g) => {
        const y = M.get(g.filename);
        if (!y)
          return null;
        const w = await lb(y.data, y.type || g.type), b = Number.isFinite(g.width) ? g.width : w.naturalWidth || w.width, _ = Number.isFinite(g.height) ? g.height : w.naturalHeight || w.height;
        return {
          id: g.id,
          image: w,
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
  xe.getState().setDirty(!1), U.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []), St.getState().setAll(((m = e.data.bookmarks) == null ? void 0 : m.items) ?? [], ((S = e.data.bookmarks) == null ? void 0 : S.overlaysVisible) ?? !0);
}, Yp = async (e) => {
  const t = ib(), n = await window.projectApi.save(t, e);
  if (n) {
    const s = xe.getState();
    s.setPath(n), s.setDirty(!1);
  }
  return n;
}, ob = async (e) => {
  Rd();
  const t = await window.projectApi.load(e);
  if (!t)
    return null;
  await rb(t);
  const n = xe.getState();
  return n.setPath(t.path), n.setDirty(!1), t.path;
}, $x = () => {
  Rd(), St.getState().clear(), re.getState().reset(), Ce.getState().resetCamera(), ee.getState().clear(), W.getState().clear(), Ae.getState().clear(), zt.getState().clear(), U.getState().clear();
  const a = xe.getState();
  a.setPath(null), a.setDirty(!1);
}, ab = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, cb = async (e) => {
  var t;
  return (t = window.projectApi) != null && t.read ? window.projectApi.read(e) : (window.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, ub = (e, t) => {
  var p;
  const n = ((p = e.data.palette) == null ? void 0 : p.colors) ?? [], s = re.getState();
  if (!ab(s.colors, n)) {
    window.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = ee.getState(), i = l.activeLayerId, r = Math.trunc(t.offsetX), a = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const d of u)
    if (d.visible !== !1)
      for (const f of d.blocks) {
        const m = f.col * B, S = f.row * B, M = f.data;
        for (let v = 0; v < M.length; v += 1) {
          const g = M[v] ?? 0;
          if (g === 0)
            continue;
          const y = v % B, w = Math.floor(v / B), b = m + y, _ = S + w;
          c.set(`${b}:${_}`, g);
        }
      }
  const h = [];
  for (const [d, f] of c.entries()) {
    const [m, S] = d.split(":"), M = Number(m), v = Number(S), g = M + r, y = v + a, w = l.getPixelInLayer(i, g, y);
    w !== f && h.push({ x: g, y, prev: w, next: f });
  }
  qi(h, { label: "Merge Project" });
}, Tn = 8, ji = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, db = (e) => yt(e), hb = (e) => e.map((t) => db(t) ?? { r: 0, g: 0, b: 0 }), Xp = (e, t, n) => {
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
}, Vx = (e, t) => {
  var p;
  const n = hb(t), s = /* @__PURE__ */ new Map();
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
            ji(g.color, n[b])
          );
        const w = y * g.weight;
        w > v && (v = w, M = g.idx);
      }
      f.push(M);
    }
    let S = f;
    for (let M = 0; M < 6; M += 1) {
      const v = /* @__PURE__ */ new Map();
      for (const y of S)
        v.set(y, []);
      for (const y of d) {
        let w = S[0], b = 1 / 0;
        for (const _ of S) {
          const k = ji(y.color, n[_]);
          k < b && (b = k, w = _);
        }
        (p = v.get(w)) == null || p.push(y.idx);
      }
      const g = [];
      for (const [y, w] of v.entries()) {
        if (w.length === 0) {
          g.push(y);
          continue;
        }
        let b = y, _ = 1 / 0;
        for (const k of w) {
          let j = 0;
          for (const A of w) {
            const L = s.get(A) ?? 1;
            j += ji(n[k], n[A]) * L;
          }
          j < _ && (_ = j, b = k);
        }
        g.push(b);
      }
      for (S = Array.from(new Set(g)); S.length < 3; ) {
        const y = Xp(
          n,
          /* @__PURE__ */ new Set([0, ...S]),
          1
        );
        if (y.length === 0)
          break;
        S.push(y[0]);
      }
    }
    i = S;
  }
  const r = /* @__PURE__ */ new Set([0, ...i]), a = Xp(n, r, 4 - r.size);
  for (const d of a)
    r.add(d);
  const c = Array.from(r), u = c.filter((d) => d === 0), h = c.filter((d) => d !== 0).sort((d, f) => {
    const m = (S) => 0.2126 * S.r + 0.7152 * S.g + 0.0722 * S.b;
    return m(n[d]) - m(n[f]);
  });
  return {
    paletteIndices: [...u, ...h].slice(0, 4),
    paletteRgb: n
  };
}, Kx = (e, t, n, s) => {
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
}, Gx = (e, t, n, s) => {
  const l = new Uint8Array(t * n), i = new Float32Array(e), r = (c, u, h) => {
    let p = 0, d = 1 / 0;
    for (let f = 0; f < s.length; f += 1) {
      const m = ji({ r: c, g: u, b: h }, s[f]);
      m < d && (d = m, p = f);
    }
    return p;
  }, a = (c, u, h, p, d, f) => {
    if (c < 0 || u < 0 || c >= t || u >= n)
      return;
    const m = (u * t + c) * 3;
    i[m] += h * f, i[m + 1] += p * f, i[m + 2] += d * f;
  };
  for (let c = 0; c < n; c += 1)
    for (let u = 0; u < t; u += 1) {
      const h = (c * t + u) * 3, p = i[h], d = i[h + 1], f = i[h + 2], m = r(p, d, f);
      l[c * t + u] = m;
      const S = s[m], M = p - S.r, v = d - S.g, g = f - S.b;
      a(u + 1, c, M, v, g, 7 / 16), a(u - 1, c + 1, M, v, g, 3 / 16), a(u, c + 1, M, v, g, 5 / 16), a(u + 1, c + 1, M, v, g, 1 / 16);
    }
  return l;
}, $o = (e) => Math.ceil(e / Tn) * Tn, Qx = (e, t, n) => {
  const s = t / Tn, l = n / Tn, i = s * l, r = new Uint8Array(i * Tn * 2);
  let a = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const h = u * Tn, p = c * Tn;
      for (let d = 0; d < Tn; d += 1) {
        let f = 0, m = 0;
        for (let S = 0; S < Tn; S += 1) {
          const M = (p + d) * t + (h + S), v = e[M] & 3, g = 7 - S;
          f |= (v & 1) << g, m |= (v >> 1 & 1) << g;
        }
        r[a] = f, r[a + 1] = m, a += 2;
      }
    }
  return { data: r, tileCount: i };
}, hi = (e, t, n) => {
  e.setUint16(t, n, !0);
}, fb = (e, t, n) => {
  e.setUint32(t, n, !0);
}, pb = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), i = Math.min(l.length, s - 1);
  for (let r = 0; r < i; r += 1)
    e.setUint8(t + r, l[r]);
  e.setUint8(t + i, 0);
  for (let r = i + 1; r < s; r += 1)
    e.setUint8(t + r, 0);
}, mb = (e, t, n) => {
  const l = 40 + e.length, i = 12 + l, r = new ArrayBuffer(i), a = new DataView(r), c = new Uint8Array(r);
  c.set([71, 66, 79, 48], 0), hi(a, 4, 2), hi(a, 6, 1), fb(a, 8, l);
  let u = 12;
  pb(a, u, "Pixel Splash Studio", 30), u += 30, hi(a, u, Tn), u += 2, hi(a, u, Tn), u += 2, hi(a, u, t), u += 2;
  for (let h = 0; h < 4; h += 1)
    c[u + h] = n[h] ?? h;
  return u += 4, c.set(e, u), new Uint8Array(r);
}, gb = async () => {
  var f;
  if (!((f = window.projectApi) != null && f.exportGbr))
    return window.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Vx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $o(e.maxX - e.minX + 1), i = $o(e.maxY - e.minY + 1), r = n.map((m) => s[m]), { data: a } = Kx(e, s, l, i), c = Gx(a, l, i, r), { data: u, tileCount: h } = Qx(c, l, i), p = mb(u, h, [0, 1, 2, 3]), d = `pixel-splash-selection-${l}x${i}.gbr`;
  return window.projectApi.exportGbr(p, d);
}, xb = async () => {
  var p;
  if (!((p = window.projectApi) != null && p.exportChr))
    return window.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Vx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $o(e.maxX - e.minX + 1), i = $o(e.maxY - e.minY + 1), r = n.map((d) => s[d]), { data: a } = Kx(e, s, l, i), c = Gx(a, l, i, r), { data: u } = Qx(c, l, i), h = `pixel-splash-selection-${l}x${i}.chr`;
  return window.projectApi.exportChr(u, h);
}, Zx = () => {
  var e;
  return (e = window.projectApi) != null && e.exportImage ? !0 : (window.alert("Image export is unavailable. Restart the app to load the latest export support."), !1);
}, Dd = async (e) => {
  const t = Ns();
  if (!t)
    return window.alert("Select a region to export."), null;
  if (!Zx())
    return null;
  const { data: n, width: s, height: l } = Ld(t), i = new Uint8Array(n), r = `pixel-splash-selection-${s}x${l}.${e}`;
  return window.projectApi.exportImage(e, { kind: "rgba", width: s, height: l, data: i }, r);
}, yb = () => Dd("bmp"), vb = () => Dd("gif"), wb = () => Dd("tga"), Sb = async () => {
  const e = Ns();
  if (!e)
    return window.alert("Select a region to export."), null;
  if (!Zx())
    return null;
  let t = 0;
  for (const c of e.pixels)
    c.paletteIndex > t && (t = c.paletteIndex);
  if (t > 255)
    return window.alert("PCX export supports palette indices up to 255."), null;
  const { data: n, width: s, height: l } = $M(e), i = re.getState().colors, r = new Uint8Array(256 * 3);
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
}, gn = 320, $n = 200, Mb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, bb = (e) => e.map((t) => yt(t) ?? { r: 0, g: 0, b: 0 }), _b = (e, t, n) => {
  const i = Array.from(e.entries()).sort((r, a) => a[1] - r[1]).map(([r]) => r).filter((r) => r <= n).slice(0, t);
  if (i.length >= t)
    return i;
  for (let r = 0; r <= n && i.length < t; r += 1)
    i.includes(r) || i.push(r);
  return i;
}, Tb = (e, t) => {
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
}, kb = (e, t) => {
  const n = new Uint8Array(gn * $n);
  for (let s = 0; s < $n; s += 1)
    for (let l = 0; l < gn; l += 1) {
      const i = (s * gn + l) * 3, r = e[i], a = e[i + 1], c = e[i + 2];
      let u = 0, h = 1 / 0;
      for (let p = 0; p < t.length; p += 1) {
        const d = Mb({ r, g: a, b: c }, t[p]);
        d < h && (h = d, u = p);
      }
      n[s * gn + l] = u;
    }
  return n;
}, Cb = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, jb = (e) => {
  const n = new Uint8Array(80 * $n);
  for (let s = 0; s < $n; s += 1) {
    const l = (s & 1) * 8192, i = (s >> 1) * 80;
    for (let r = 0; r < gn; r += 4) {
      const a = s * gn + r, c = e[a] & 3, u = e[a + 1] & 3, h = e[a + 2] & 3, p = e[a + 3] & 3, d = c << 6 | u << 4 | h << 2 | p, f = r >> 2;
      n[l + i + f] = d;
    }
  }
  return n;
}, Nb = (e) => {
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
}, Pb = (e) => e, Bd = async (e, t, n, s) => {
  var M;
  if (!((M = window.projectApi) != null && M.exportBsave))
    return window.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const l = Ns();
  if (!l)
    return window.alert("Select a region to export."), null;
  const i = re.getState().colors, r = bb(i), a = /* @__PURE__ */ new Map();
  for (const v of l.pixels)
    a.set(v.paletteIndex, (a.get(v.paletteIndex) ?? 0) + 1);
  const c = r.length - 1, h = (t >= r.length ? r.map((v, g) => g) : _b(a, t, c)).map((v) => r[v]), p = Tb(l, r);
  if (!p)
    return null;
  const d = kb(p, h);
  let f;
  e === "cga" ? f = jb(d) : e === "ega" ? f = Nb(d) : f = Pb(d);
  const m = Cb(n, 0, f.length), S = new Uint8Array(m.length + f.length);
  return S.set(m, 0), S.set(f, m.length), window.projectApi.exportBsave(S, s);
}, Ib = () => Bd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), Eb = () => Bd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), Rb = () => Bd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), Ab = (e) => e.trim().toLowerCase(), Lb = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, i) => {
    const r = Ab(l), a = t.get(r);
    if (a !== void 0) {
      n[i] = a;
      return;
    }
    const c = s.length;
    t.set(r, c), n[i] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, Db = () => {
  const e = re.getState(), t = e.colors, { mapped: n, nextColors: s } = Lb(t);
  if (s.length === t.length)
    return !1;
  const l = (d) => Number.isFinite(d) && d >= 0 && d < n.length ? n[d] : 0, i = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(i);
  const r = ee.getState(), a = r.exportLayerPayloads().map((d) => ({
    ...d,
    blocks: d.blocks.map(({ row: f, col: m, data: S }) => {
      const M = new Uint8Array(S.length);
      for (let v = 0; v < S.length; v += 1)
        M[v] = l(S[v]);
      return { row: f, col: m, data: M };
    })
  }));
  r.loadLayerPayloads(a, r.activeLayerId);
  const c = W.getState();
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
}, Bb = (e, t, n) => e << 16 | t << 8 | n, Yb = (e) => {
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
}, Xb = (e) => {
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
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2], h = Bb(a, c, u);
    let p = n.get(h);
    p === void 0 && (p = t.length, t.push(Ul({ r: a, g: c, b: u })), n.set(h, p));
    const d = i / 4, f = d % l, m = Math.floor(d / l);
    s.push({ x: f, y: m, paletteIndex: p });
  }
  return { paletteColors: t, pixels: s };
}, Fb = (e) => {
  const t = re.getState(), n = ee.getState(), s = ye.getState(), l = rt.getState();
  if ($x(), e.colorType === "indexed") {
    const i = Yb(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  } else {
    const i = Xb(e), r = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(r, 0, Math.min(1, Math.max(0, r.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  }
  s.clear(), l.clear(), xe.getState().setDirty(!0);
}, Ob = (e) => {
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
}, Ic = (e) => e.toString(16).padStart(2, "0"), zb = (e) => `#${Ic(e.r)}${Ic(e.g)}${Ic(e.b)}`, Fp = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Hb = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(mx)) === "true";
  } catch {
    return !1;
  }
}, qx = (e) => {
  const t = ma(e), n = Math.floor(t.minX / C), s = Math.floor(t.minY / C), l = Math.ceil(t.maxX / C), i = Math.ceil(t.maxY / C), r = Math.max(0, l - n), a = Math.max(0, i - s);
  if (r === 0 || a === 0)
    return null;
  const c = r * a;
  if ((r > pc || a > pc || c > Qf) && !Hb()) {
    const g = `Reference trace is too large (${r}x${a}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${mx}"]="true" to override.`;
    return typeof window < "u" && window.alert(g), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
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
  const d = Zn(e), f = d.centerX / C, m = d.centerY / C, S = d.baseWidth / C, M = d.baseHeight / C;
  p.save(), p.translate(f - n, m - s), p.rotate(d.rotationRad), p.scale(d.scale * d.flipX, d.scale * d.flipY), p.drawImage(
    e.image,
    -S / 2,
    -M / 2,
    S,
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
}, Wb = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const i = yt(l);
    i && n.push({ paletteIndex: s, rgb: i });
  }
  return n;
}, Ub = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, X0);
  for (let i = 0; i < e.length; i += 4) {
    if (e[i + 3] < px)
      continue;
    const r = Math.min(255, Math.round(e[i] / s) * s), a = Math.min(255, Math.round(e[i + 1] / s) * s), c = Math.min(255, Math.round(e[i + 2] / s) * s), u = `${r},${a},${c}`, h = n.get(u);
    h ? h.count += 1 : n.set(u, { rgb: { r, g: a, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((i, r) => r.count - i.count).slice(0, t).map((i) => i.rgb);
}, $b = (e) => {
  const t = re.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((r, a) => {
    s.set(r.toLowerCase(), a);
  });
  const l = [], i = [];
  for (const r of e) {
    const a = zb(r), c = a.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(a), s.set(c, u)), i.push({ paletteIndex: u, rgb: r });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), i;
}, Jx = (e, t) => {
  if (t.length === 0)
    return;
  const n = ee.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.height; i += 1)
    for (let r = 0; r < e.width; r += 1) {
      const a = (i * e.width + r) * 4;
      if (e.data[a + 3] < px)
        continue;
      const u = e.data[a], h = e.data[a + 1], p = e.data[a + 2], d = `${u},${h},${p}`;
      let f = l.get(d);
      if (f === void 0) {
        const v = { r: u, g: h, b: p };
        let g = t[0], y = Fp(v, g.rgb);
        for (let w = 1; w < t.length; w += 1) {
          const b = t[w], _ = Fp(v, b.rgb);
          _ < y && (y = _, g = b);
        }
        f = g.paletteIndex, l.set(d, f);
      }
      const m = e.offsetX + r, S = e.offsetY + i, M = n.getPixel(m, S);
      M !== f && s.push({ x: m, y: S, prev: M, next: f });
    }
  s.length !== 0 && qi(s, { label: "Reference Trace" });
}, Vb = (e, t) => {
  const n = re.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((a) => Math.round(a)).filter((a) => Number.isFinite(a)).filter((a) => a >= 0 && a < n.length).sort((a, c) => a - c);
  if (l.length === 0)
    return;
  const i = Wb(n, l);
  if (i.length === 0)
    return;
  const r = qx(e);
  r && Jx(r, i);
}, Kb = (e, t) => {
  const n = qx(e);
  if (!n)
    return;
  const s = Math.max(
    ku,
    Math.min(t, Cu)
  ), l = Ub(n.data, s);
  if (l.length === 0)
    return;
  const i = $b(l);
  Jx(n, i);
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
}, Op = (e, t, n, s) => {
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
}, Gb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, zp = (e, t) => {
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
      const p = Gb(a, n[h] ?? n[0]);
      p < u && (u = p, c = h);
    }
    s.set(i, c);
  }
  return s;
}, Hp = (e, t, n) => {
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
}, Qb = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), i = s.map((r) => yt(r) ?? { r: 0, g: 0, b: 0 });
  for (let r = 0; r < e.length; r += 1) {
    const a = e[r] ?? 0, c = i[a] ?? i[0], u = r * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = a === 0 ? 0 : 255;
  }
  return l;
}, On = (e, t, n) => Math.min(n, Math.max(t, e)), ml = (e) => e === "tile-pen" || e === "tile-stamp" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", Zb = (e) => e === "tile-sampler" || ml(e), qb = (e) => e === "selection-rect" || e === "selection-oval" || e === "selection-lasso" || e === "magic-wand" || e === "texture-roll", Ll = 0, Vo = 100, Yd = Math.log10(Zs), Jb = Math.log10(Wl), Du = Jb - Yd, Up = 72, $p = 360, e_ = 32, t_ = (e) => {
  const t = On(e, Zs, Wl), n = Du === 0 ? 0 : (Math.log10(t) - Yd) / Du;
  return Math.round(
    Ll + n * (Vo - Ll)
  );
}, n_ = (e) => {
  const t = (On(e, Ll, Vo) - Ll) / (Vo - Ll), n = Yd + t * Du;
  return Math.pow(10, n);
}, s_ = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, rn = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), Vp = (e) => {
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
}, l_ = () => {
  const t = ee.getState().layers.reduce(
    (M, v) => M + Kp(v.store.getBlocks()),
    0
  ), n = Kp(ye.getState().store.getBlocks()), s = W.getState().pixels.size * Zf, l = rt.getState().pixels.length * Zf, i = zt.getState().items.reduce((M, v) => M + v.width * v.height * 4, 0), r = Ae.getState();
  let a = 0;
  for (const M of r.undoStack)
    a += M.changes.length;
  for (const M of r.redoStack)
    a += M.changes.length;
  const c = a * O0, h = re.getState().colors.reduce((M, v) => M + v.length * 2, 0) + Id * 2, p = {
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
  }, d = s_(p), f = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: i },
    { label: "hist", bytes: c },
    { label: "pal", bytes: h },
    { label: "ui", bytes: d }
  ], m = f.reduce((M, v) => M + v.bytes, 0), S = f.filter((M) => M.bytes > 0).map((M) => `${M.label} ${Vp(M.bytes)}`);
  return `Mem ${Vp(m)}${S.length ? ` • ${S.join(" • ")}` : ""}`;
}, i_ = () => {
  const e = sb(), t = Ae((x) => x.undo), n = Ae((x) => x.redo), s = ye((x) => x.selectedCount), l = xe((x) => x.path), i = xe((x) => x.dirty), [r, a] = T.useState(!1), [c, u] = T.useState(!1), [h, p] = T.useState(!1), [d, f] = T.useState(!1), [m, S] = T.useState(!0), [M, v] = T.useState(!1), [g, y] = T.useState("pen"), [w, b] = T.useState(""), [_, k] = T.useState("monospace"), [j, A] = T.useState(16), [L, Y] = T.useState(!1), [N, O] = T.useState("pen"), [G, oe] = T.useState(""), [Q, ne] = T.useState(!1), [D, F] = T.useState(null), [K, le] = T.useState(null), [ae, Me] = T.useState(0), [X, ie] = T.useState(0), [ge, z] = T.useState(!1), [Z, P] = T.useState(null), [$, te] = T.useState([]), [de, Ze] = T.useState(2), [_e, Fe] = T.useState("nearest"), [Oe, st] = T.useState(0), Pe = 32, he = 2, [pt, Ue] = T.useState(!0), [It, tn] = T.useState(!1), [vt, Pn] = T.useState(""), [Jn, In] = T.useState(96), [nn, nl] = T.useState(220), En = Au((x) => x.isRecording), Rn = Au((x) => x.setIsRecording), fe = Nt((x) => x.activeTool), ve = Nt((x) => x.setActiveTool), ot = Js((x) => x.mode), $e = Js((x) => x.setMode), wn = Re((x) => x.showReferenceLayer), es = Re((x) => x.showPixelLayer), I = Re((x) => x.showTileLayer), R = Re((x) => x.showPixelGrid), q = Re((x) => x.showTileGrid), ue = Re((x) => x.showAxes), je = Re((x) => x.setShowReferenceLayer), Et = Re((x) => x.setShowPixelLayer), sn = Re((x) => x.setShowTileLayer), Ps = Re((x) => x.setShowPixelGrid), Is = Re((x) => x.setShowTileGrid), Xn = Re((x) => x.setShowAxes), $t = U((x) => x.tileSets), ts = U((x) => x.tileMaps), Ji = U((x) => x.activeTileSetId), ty = U((x) => x.activeTileMapId), ny = U((x) => x.selectedTileIndex), Xd = U((x) => x.selectedTileIndices), Ql = U((x) => x.tilePage), sy = U((x) => x.tilePageCount), er = U((x) => x.setTilePage), Es = U((x) => x.tilePickerZoom), Fd = U((x) => x.setTilePickerZoom), Od = U((x) => x.tilePlacementMode), zd = U((x) => x.setTilePlacementMode), Hd = U((x) => x.tilePenSnapToCluster), Wd = U((x) => x.setTilePenSnapToCluster), Ud = U((x) => x.setActiveTileSet), $d = U((x) => x.setTileSetLayout), Vd = U((x) => x.addTileSet), Kd = U((x) => x.duplicateTileSet), Gd = U((x) => x.renameTileSet), Qd = U((x) => x.deleteTileSet), Zd = U((x) => x.deleteTilesFromSet), ly = mn((x) => x.size), qd = mn((x) => x.shape), Jd = Gt((x) => x.radius), eh = Gt((x) => x.density), th = Gt((x) => x.falloff), nh = Xo((x) => x.mode), sh = Xo((x) => x.setMode), lh = Fo((x) => x.mode), ih = Fo((x) => x.setMode), tr = $l((x) => x.snap), nr = $l((x) => x.setSnap), rh = Mt((x) => x.mode), oh = Mt((x) => x.setMode), sr = Mt((x) => x.gradientDirection), lr = Mt((x) => x.setGradientDirection), ir = Mt((x) => x.gradientDither), rr = Mt((x) => x.setGradientDither), ga = re((x) => x.selectedIndices), or = ga.length, iy = re((x) => x.getActiveIndex()), ar = Ge((x) => x.mode), sl = Ge((x) => x.snap), ry = Ge((x) => x.rotation), oy = Ge((x) => x.scale), ah = Ge((x) => x.flipX), ch = Ge((x) => x.flipY), cr = Ge((x) => x.drag), xa = Ge((x) => x.pasteDuplicateColors), uh = U((x) => x.tileDebugOverlay), ya = U((x) => x.setTileDebugOverlay), ay = U((x) => x.nineSlice), cy = U((x) => x.selectedTileCols), uy = U((x) => x.selectedTileRows), va = zt((x) => x.removeReference), ur = Te.useRef(!1), ll = T.useRef(null), dh = T.useRef(null), Zl = T.useRef(null), Ee = 8, il = Z ? Math.floor(Z.width / Ee) : 0, Rs = Z ? Math.floor(Z.height / Ee) : 0, dr = Math.max(1, Math.ceil(Rs / Pe)), hr = Math.min(Math.max(0, Oe), Math.max(0, dr - 1)), hh = hr * Pe, ql = $[$.length - 1] ?? null;
  T.useEffect(() => {
    const x = window.setTimeout(() => {
      S(!1);
    }, 2e3);
    return () => window.clearTimeout(x);
  }, []), T.useEffect(() => {
    var se, Ne, Ie, Ye;
    const x = document.documentElement, E = (at) => {
      const Ve = Number.isFinite(at) && at > 0 ? at : 1;
      x.style.setProperty("--ui-scale", String(Ve));
    };
    E(((Ne = (se = window.uiScaleApi) == null ? void 0 : se.getScale) == null ? void 0 : Ne.call(se)) ?? 1);
    const V = (Ye = (Ie = window.uiScaleApi) == null ? void 0 : Ie.onScaleChange) == null ? void 0 : Ye.call(Ie, E);
    return () => {
      V && V();
    };
  }, []), T.useEffect(() => {
    var x;
    if ((x = window.paletteApi) != null && x.onApply)
      return window.paletteApi.onApply((E) => {
        const V = Array.isArray(E.colors) ? E.colors : [];
        if (V.length === 0)
          return;
        const se = re.getState();
        se.setPalette(V), se.setSelectedIndices([]), xe.getState().setDirty(!0);
      });
  }, []);
  const fh = Ge((x) => x.setMode), fr = Ge((x) => x.setSnap), dy = Ge((x) => x.setRotation), hy = Ge((x) => x.setScale), fy = Ge((x) => x.setFlipX), py = Ge((x) => x.setFlipY), ph = Ge((x) => x.setDrag), my = Ge(
    (x) => x.setPasteDuplicateColors
  ), wa = mn((x) => x.setSize), Sa = mn((x) => x.setShape), mh = Gt((x) => x.setRadius), gh = Gt((x) => x.setDensity), xh = Gt((x) => x.setFalloff), Ma = Te.useRef("pen"), ba = Te.useRef("tile-pen");
  T.useEffect(() => {
    if (ml(fe)) {
      ba.current = fe;
      return;
    }
    Ma.current = fe;
  }, [fe]);
  const _a = T.useCallback(
    (x) => {
      if (x === "tile" && (!d || e))
        return;
      if ($e(x), x === "tile") {
        const V = ml(ba.current) ? ba.current : "tile-pen";
        ve(V);
        return;
      }
      const E = ml(Ma.current) ? "pen" : Ma.current;
      ve(E);
    },
    [d, e, ve, $e]
  ), pr = T.useCallback(
    (x) => {
      if (ml(x)) {
        if (!d || e)
          return;
        $e("tile");
      } else qb(x) && ot === "tile" && d && !e ? $e("tile") : $e("pixel");
      if (x === "selection-lasso") {
        ve("selection-lasso"), wa(1), Sa("round");
        return;
      }
      if (x === "text") {
        y((E) => fe === "text" ? E : fe), ve("text"), v(!0);
        return;
      }
      if (x === "ai") {
        O((E) => fe === "ai" ? E : fe), ve("ai"), Y(!0);
        return;
      }
      ve(x);
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
  ), ns = re((x) => x.colors), rl = Ho((x) => x.snap), mr = Ho((x) => x.setSnap), yh = zt((x) => x.setSelected), Be = zt(
    (x) => x.selectedId ? x.items.find((E) => E.id === x.selectedId) ?? null : null
  ), gy = zt((x) => x.updateReference), [Ta, xy] = T.useState(F0), ka = Z0(), ce = $t.find((x) => x.id === Ji) ?? $t[0], vh = ts.find((x) => x.id === ty) ?? ts[0], As = Te.useMemo(() => {
    const x = new Set(Xd.filter((E) => E >= 0));
    return Array.from(x).sort((E, V) => E - V);
  }, [Xd]), Ca = T.useCallback(
    (x) => {
      Number.isFinite(x) && Fd(x);
    },
    [Fd]
  ), ja = Math.max(1, sy), Na = Math.min(Ql, ja - 1), yy = T.useCallback(() => {
    er(Ql - 1);
  }, [er, Ql]), vy = T.useCallback(() => {
    er(Ql + 1);
  }, [er, Ql]), wh = T.useCallback(
    (x, E) => {
      ce && (!Number.isFinite(x) || !Number.isFinite(E) || $d(ce.id, x, E));
    },
    [ce, $d]
  ), wy = T.useCallback(() => {
    const x = (ce == null ? void 0 : ce.tileWidth) ?? me, E = (ce == null ? void 0 : ce.tileHeight) ?? me;
    Vd({
      name: `Tile Set ${$t.length + 1}`,
      tileWidth: x,
      tileHeight: E,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [ce, Vd, $t.length]), Sy = T.useCallback(() => {
    ce && Kd(ce.id);
  }, [ce, Kd]), My = T.useCallback(() => {
    if (!ce)
      return;
    const x = ce.name, E = window.prompt("Rename tile set", x);
    if (typeof E != "string")
      return;
    const V = E.trim();
    !V || V === x || Gd(ce.id, V);
  }, [ce, Gd]), by = T.useCallback(() => {
    if (!ce)
      return;
    const x = ts.filter((V) => V.tileSetId === ce.id).length, E = x > 0 ? `Delete ${ce.name}? This will also delete ${x} linked tile map${x === 1 ? "" : "s"}.` : `Delete ${ce.name}?`;
    window.confirm(E) && Qd(ce.id);
  }, [ce, Qd, ts]), _y = T.useCallback(() => {
    if (!ce || As.length === 0)
      return;
    const x = As.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${As.length} ${x} from ${ce.name}? This cannot be undone.`
    ) && Zd(ce.id, As);
  }, [ce, Zd, As]), Tt = ot === "tile" && d && !e, Ty = Tt ? nn : Jn, Pa = Te.useRef("palette"), Ia = Te.useRef(!1);
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
    (x) => {
      const E = Math.max(16, x.tileWidth * Es), V = Math.max(1, x.rows) * E;
      return On(
        V + e_,
        Up,
        $p
      );
    },
    [Es]
  ), ky = T.useCallback(
    (x) => {
      Ud(x);
      const E = $t.find((V) => V.id === x);
      E && nl(gr(E));
    },
    [gr, Ud, $t]
  );
  T.useEffect(() => {
    if (!Tt || !Ji)
      return;
    const x = $t.find((E) => E.id === Ji);
    x && nl(gr(x));
  }, [
    Tt,
    Ji,
    gr,
    $t
  ]);
  const Cy = (x) => {
    x.preventDefault(), x.currentTarget.setPointerCapture(x.pointerId), Pa.current = Tt ? "tile" : "palette", Ia.current = !0;
  };
  T.useEffect(() => {
    const x = (V) => {
      if (!Ia.current)
        return;
      const se = document.documentElement.clientHeight, Ne = Math.max(
        Up,
        Math.min($p, se - V.clientY)
      );
      Pa.current === "tile" ? nl(Ne) : In(Ne);
    }, E = () => {
      Pa.current = Tt ? "tile" : "palette", Ia.current = !1;
    };
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", E), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", E);
    };
  }, [Tt]);
  const jy = (pt ? 0 : 324) + 24;
  T.useEffect(() => {
    if (e) {
      f(!1);
      return;
    }
    let x = !1;
    return (async () => {
      try {
        const V = await window.optionsApi.getAdvancedMode();
        x || f(!!V);
      } catch {
      }
    })(), () => {
      x = !0;
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
  const xr = Te.useCallback(async () => (e || await Yp(l ?? void 0), null), [e, l]), Sh = Te.useCallback(async () => (e || await Yp(void 0), null), [e]), yr = Te.useCallback(async () => {
    if (e)
      return null;
    if (!(i && !window.confirm("You have unsaved changes. Continue?")))
      return await ob(void 0), null;
  }, [e, i]), vr = Te.useCallback(() => {
    i && !window.confirm("You have unsaved changes. Continue?") || $x();
  }, [i]), wr = Te.useCallback(() => {
    a(!0);
  }, [a]), Mh = Te.useCallback(async () => {
    var x;
    if (!(e || En)) {
      if (!((x = window.recordingApi) != null && x.start)) {
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
    var x;
    if (!(!En || !((x = window.recordingApi) != null && x.stop)))
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
    const x = await cb();
    x && (le(x), F(x.path ?? null), Me(0), ie(0), ne(!0));
  }, []), Th = T.useCallback(async () => {
    var V;
    if (!((V = window.projectApi) != null && V.importImage)) {
      window.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const x = await window.projectApi.importImage();
    if (!x)
      return;
    if (!(x.format === "nes" || x.format === "gb" || x.format === "gbc" || x.format === "chr")) {
      (x.width > 512 || x.height > 512) && window.alert("Large images (over 512x512) can take a while to load."), Fb(x);
      return;
    }
    if (x.colorType !== "indexed") {
      window.alert("ROM import preview requires indexed pixels.");
      return;
    }
    P(x), te([
      {
        x: 0,
        y: 0,
        width: Math.floor(x.width / Ee),
        height: Math.floor(x.height / Ee)
      }
    ]), Ze(2), Fe("nearest"), st(0), z(!0);
  }, []), Sr = T.useCallback(() => {
    z(!1), P(null), te([]), Zl.current = null;
  }, []), Mr = T.useCallback(
    (x) => {
      Z && te((E) => {
        if (E.length === 0)
          return E;
        const V = E.slice(), se = V[V.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return V[V.length - 1] = Ys({ ...se, ...x }, il, Rs), V;
      });
    },
    [Z, il, Rs]
  ), br = T.useCallback(() => {
    const x = ee.getState(), E = /* @__PURE__ */ new Set();
    for (const V of x.layers)
      for (const se of V.store.getBlocks())
        for (let Ne = 0; Ne < se.block.length; Ne += 1) {
          const Ie = se.block[Ne] ?? 0;
          Ie !== 0 && E.add(Ie);
        }
    return E;
  }, []), Ny = T.useCallback(() => {
    if (!Z || $.length === 0)
      return;
    if (!Z.palette) {
      window.alert("ROM palette is missing.");
      return;
    }
    const x = $.map((we) => Ys(we, il, Rs)).filter((we) => we.width > 0 && we.height > 0);
    if (x.length === 0) {
      window.alert("Select at least one region.");
      return;
    }
    const E = Wp(Z.palette, Z.pixels), V = x.map((we) => {
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
      return Op(Yt.pixels, Yt.width, Yt.height, de);
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
      const we = Hp(E, Rt.colors, ss);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Rt.setPalette(we.palette), Rt.setSelectedIndices([]), ln = Qr(ct, we.map);
    } else {
      const we = zp(Z.palette, Rt.colors);
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
    $,
    il,
    Rs
  ]);
  T.useEffect(() => {
    const x = $[$.length - 1] ?? null;
    if (!ge || !Z || !x)
      return;
    const E = ll.current, V = dh.current;
    if (!E || !V)
      return;
    const se = Wp(Z.palette, Z.pixels), Ne = Math.floor(Z.width / Ee), Ie = Math.floor(Z.height / Ee), Ye = Math.max(1, Math.ceil(Ie / Pe)), Ve = Math.min(Math.max(0, Oe), Ye - 1) * Pe, ze = Math.min(Pe, Math.max(0, Ie - Ve)), mt = Ec(Z.pixels, Z.width, Z.height, {
      x: 0,
      y: Ve * Ee,
      width: Ne * Ee,
      height: ze * Ee
    }), ct = $.map((pe) => Ys(pe, Ne, Ie)).filter((pe) => pe.width > 0 && pe.height > 0), Rt = ct.map((pe) => {
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
      ), cl = Op(lt.pixels, lt.width, lt.height, de);
      return { rect: pe, scaled: cl };
    }), ss = (pe, Ke, lt, cl, La, Da) => {
      const kr = Math.max(1, Math.trunc(Da)), ul = document.createElement("canvas");
      ul.width = Ke, ul.height = lt;
      const Lh = ul.getContext("2d");
      if (!Lh)
        return;
      const Ly = Qb(cl, Ke, lt, La);
      Lh.putImageData(new ImageData(Ly, Ke, lt), 0, 0), pe.width = Ke * kr, pe.height = lt * kr;
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
      const Ke = zp(pe, ns);
      Ra = Qr(Tr, Ke), Aa = ns;
    } else {
      const pe = br(), { map: Ke, palette: lt } = Hp(se, ns, pe);
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
    $
  ]), T.useEffect(() => {
    const x = (E) => {
      var Ne, Ie, Ye, at, Ve, ze;
      if (Gp(E.target))
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
          E.preventDefault(), QM();
          return;
        }
        const ct = Ob({
          key: E.key,
          altKey: E.altKey,
          ctrlKey: E.ctrlKey,
          metaKey: E.metaKey,
          shiftKey: E.shiftKey
        });
        if (ct) {
          if (ct.type === "tool") {
            if (Zb(ct.tool) && (!d || e))
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
          Hx() && E.preventDefault();
          return;
        }
        ye.getState().selectedCount > 0 && (E.preventDefault(), E.shiftKey ? Uo({ deep: !0 }) : Uo());
      }
      if (se === "x") {
        if (ot === "tile") {
          Wx() && E.preventDefault();
          return;
        }
        ye.getState().selectedCount > 0 && (E.preventDefault(), Xx());
      }
      se === "/" && (E.preventDefault(), wr());
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
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
  const Jl = (x) => {
    Be && gy(Be.id, x);
  }, kh = (x) => {
    Number.isFinite(x) && Jl({
      rotation: On(x, uc, dc)
    });
  }, Ch = (x) => {
    Number.isFinite(x) && Jl({
      scale: On(x, Zs, Wl)
    });
  }, jh = (x) => {
    Number.isFinite(x) && Jl({
      opacity: On(x, hc, fc)
    });
  }, ol = Te.useMemo(() => {
    const x = ns.length - 1;
    if (x < 0)
      return [];
    const E = /* @__PURE__ */ new Set();
    for (const V of ga) {
      if (!Number.isFinite(V))
        continue;
      const se = Math.round(V);
      se < 0 || se > x || E.add(se);
    }
    return Array.from(E).sort((V, se) => V - se);
  }, [ns.length, ga]), Py = ol.length === 0 ? "Select palette colors to trace." : ol.length === 1 ? "Using 1 selected color." : `Using ${ol.length} selected colors.`, Iy = () => {
    !Be || ns.length === 0 || ol.length !== 0 && Vb(Be, ol);
  }, Ey = () => {
    if (!Be || !Number.isFinite(Ta))
      return;
    const x = On(
      Math.round(Ta),
      ku,
      Cu
    );
    Kb(Be, x);
  }, Nh = (Be == null ? void 0 : Be.rotation) ?? 0, Ph = (Be == null ? void 0 : Be.scale) ?? 1, Ry = t_(Ph), Ih = (Be == null ? void 0 : Be.opacity) ?? 0.7, Eh = (Be == null ? void 0 : Be.flipX) ?? !1, Rh = (Be == null ? void 0 : Be.flipY) ?? !1, Vt = !Be;
  T.useEffect(() => {
    if (!It) {
      Pn("");
      return;
    }
    const x = () => {
      const V = l_();
      Pn((se) => se === V ? se : V);
    };
    x();
    const E = window.setInterval(x, z0);
    return () => window.clearInterval(E);
  }, [It]), T.useEffect(() => {
    var E, V;
    const x = It && vt ? `${ka} • ${vt}` : ka;
    (V = (E = window.appApi) == null ? void 0 : E.setTitle) == null || V.call(E, x);
  }, [ka, It, vt]), T.useEffect(() => {
    const x = (E) => {
      var Ie;
      if (Gp(E.target) || !ur.current)
        return;
      ur.current = !1;
      const se = Array.from(((Ie = E.clipboardData) == null ? void 0 : Ie.items) ?? []).find((Ye) => Ye.type.startsWith("image/"));
      if (!se)
        return;
      const Ne = se.getAsFile();
      Ne && (E.preventDefault(), Nx(Ne));
    };
    return window.addEventListener("paste", x), () => window.removeEventListener("paste", x);
  }, []), T.useEffect(() => {
    var E, V;
    const x = ((V = (E = window.menuApi) == null ? void 0 : E.onAction) == null ? void 0 : V.call(E, (se) => {
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
          Ux();
          break;
        case "exportBmp":
          yb();
          break;
        case "exportGif":
          vb();
          break;
        case "exportPcx":
          Sb();
          break;
        case "exportTga":
          wb();
          break;
        case "exportBsaveCga":
          Ib();
          break;
        case "exportBsaveEga":
          Eb();
          break;
        case "exportBsaveVga":
          Rb();
          break;
        case "exportGbr":
          gb();
          break;
        case "exportChr":
          xb();
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
          Db();
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
    return () => x();
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
    var x, E;
    (E = (x = window.viewMenuApi) == null ? void 0 : x.setState) == null || E.call(x, {
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
  const Ay = () => /* @__PURE__ */ o.jsx("div", { className: "panel__section", children: fe === "pen" || fe === "selection-lasso" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: [1, 4, 8].map((x) => /* @__PURE__ */ o.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": ly === x,
          disabled: qd === "point",
          onClick: () => wa(x),
          children: [
            x,
            "px"
          ]
        },
        x
      )) })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Brush" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: [
        { id: "point", label: "fine-point" },
        { id: "square", label: "rectangle" },
        { id: "round", label: "circle" }
      ].map((x) => /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": qd === x.id,
          onClick: () => Sa(x.id),
          children: /* @__PURE__ */ o.jsx("span", { className: "tool-label", "aria-label": x.label, children: x.label })
        },
        x.id
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
              onChange: (x) => mh(x.currentTarget.valueAsNumber)
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
              onChange: (x) => mh(x.currentTarget.valueAsNumber)
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
              onChange: (x) => gh(x.currentTarget.valueAsNumber)
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
              onChange: (x) => gh(x.currentTarget.valueAsNumber)
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
            onChange: (x) => xh(x.currentTarget.valueAsNumber)
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
            onChange: (x) => xh(x.currentTarget.valueAsNumber)
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
              onClick: () => fy(!ah),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": ch,
              onClick: () => py(!ch),
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
            value: String(oy),
            onChange: (x) => hy(Number(x)),
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
            value: String(ry),
            onChange: (x) => dy(Number(x)),
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
            onChange: () => my(!xa)
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
            onChange: (x) => kh(x.currentTarget.valueAsNumber)
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
            onChange: (x) => kh(x.currentTarget.valueAsNumber)
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
            value: Ry,
            disabled: Vt,
            onChange: (x) => Ch(n_(x.currentTarget.valueAsNumber))
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
            onChange: (x) => Ch(x.currentTarget.valueAsNumber)
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
            onChange: (x) => jh(x.currentTarget.valueAsNumber)
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
            onChange: (x) => jh(x.currentTarget.valueAsNumber)
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
        /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: Py }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt || ol.length === 0,
            onClick: Iy,
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
            onChange: (x) => {
              const E = x.currentTarget.valueAsNumber;
              Number.isFinite(E) && xy(Math.round(E));
            }
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Vt,
            onClick: Ey,
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
            onChange: ky,
            options: $t.map((x) => ({ value: x.id, label: x.name }))
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
              onChange: (x) => wh(
                x.currentTarget.valueAsNumber,
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
              onChange: (x) => wh(
                (ce == null ? void 0 : ce.columns) ?? 1,
                x.currentTarget.valueAsNumber
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
              onChange: (x) => Ca(x.currentTarget.valueAsNumber)
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
              onClick: yy,
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
              onClick: vy,
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
      /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: wy, children: "New Set" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Sy,
          disabled: !ce,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: My,
          disabled: !ce,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: by,
          disabled: !ce,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: _y,
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
        ce ? ny + 1 : "—"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        As.length
      ] }),
      fe === "tile-9slice" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          ay ? "set" : "unset"
        ] }),
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          cy,
          "x",
          uy
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ o.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ o.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ o.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ o.jsx(mM, {}) }),
    /* @__PURE__ */ o.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ o.jsx(
        tb,
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
          toolOptions: Ay()
        }
      ),
      m && /* @__PURE__ */ o.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ o.jsx("img", { src: nb, alt: "" }) }),
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: `app__palette panel${Tt ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${jy}px`,
            "--palette-bar-height": `${Ty}px`
          },
          children: [
            /* @__PURE__ */ o.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: Cy
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: `bottom-bar${Tt ? " bottom-bar--tile" : ""}`, children: [
              /* @__PURE__ */ o.jsx("div", { className: "bottom-bar__left" }),
              /* @__PURE__ */ o.jsx("div", { className: "bottom-bar__center", children: Tt ? /* @__PURE__ */ o.jsx(BM, {}) : /* @__PURE__ */ o.jsx(LM, {}) })
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
        /* @__PURE__ */ o.jsx(IM, {})
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
              /* @__PURE__ */ o.jsx("span", { children: $.length }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => te([]),
                  disabled: $.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => te((x) => x.length > 0 ? x.slice(0, -1) : x),
                  disabled: $.length === 0,
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
                    onChange: (x) => Mr({ x: Number(x.target.value) })
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
                    onChange: (x) => Mr({ y: Number(x.target.value) })
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
                    onChange: (x) => Mr({ width: Number(x.target.value) })
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
                    onChange: (x) => Mr({ height: Number(x.target.value) })
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
                  onClick: () => st((x) => Math.max(0, x - 1)),
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
                  onClick: () => st((x) => Math.min(dr - 1, x + 1)),
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
                onChange: (x) => Ze(Number(x.target.value)),
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
                onChange: (x) => Fe(
                  x.target.value === "unused" ? "unused" : "nearest"
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
                  onPointerDown: (x) => {
                    var ct;
                    x.preventDefault();
                    const E = ll.current;
                    if (!E)
                      return;
                    (ct = E.setPointerCapture) == null || ct.call(E, x.pointerId);
                    const V = E.getBoundingClientRect(), se = Math.floor(
                      (x.clientX - V.left) / V.width * E.width
                    ), Ne = Math.floor(
                      (x.clientY - V.top) / V.height * E.height
                    ), Ie = Math.floor(se / (Ee * he)), Ye = hh + Math.floor(Ne / (Ee * he)), at = Math.trunc(On(Ie, 0, il - 1)), Ve = Math.trunc(On(Ye, 0, Rs - 1));
                    Zl.current = {
                      startTileX: at,
                      startTileY: Ve,
                      pointerId: x.pointerId
                    };
                    const ze = x.ctrlKey || x.metaKey, mt = { x: at, y: Ve, width: 1, height: 1 };
                    te(
                      (Rt) => ze ? [...Rt, mt] : [mt]
                    );
                  },
                  onPointerMove: (x) => {
                    const E = ll.current, V = Zl.current;
                    if (!E || !V || !Z || V.pointerId !== x.pointerId)
                      return;
                    const se = E.getBoundingClientRect(), Ne = Math.floor(
                      (x.clientX - se.left) / se.width * E.width
                    ), Ie = Math.floor(
                      (x.clientY - se.top) / se.height * E.height
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
                  onPointerUp: (x) => {
                    var V;
                    const E = ll.current;
                    E && ((V = E.releasePointerCapture) == null || V.call(E, x.pointerId)), Zl.current = null;
                  },
                  onPointerLeave: (x) => {
                    var V;
                    const E = ll.current;
                    E && ((V = E.releasePointerCapture) == null || V.call(E, x.pointerId)), Zl.current = null;
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
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: Ny, children: "Send to Stamp Tool" })
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
                onChange: (x) => Me(Number(x.target.value))
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
                onChange: (x) => ie(Number(x.target.value))
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
                  ub(K, {
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
      HM,
      {
        onClose: () => {
          p(!1);
        },
        onAdvancedModeChange: f
      }
    ),
    M && fe === "text" && /* @__PURE__ */ o.jsx(
      zM,
      {
        initialText: w,
        initialFontFamily: _,
        initialFontSize: j,
        onCancel: () => {
          v(!1), ve(g);
        },
        onConfirm: ({ text: x, fontFamily: E, fontSize: V }) => {
          b(x), k(E), A(V), YM({
            text: x,
            fontFamily: E,
            fontSize: V,
            paletteIndex: iy
          }), v(!1);
        }
      }
    ),
    L && fe === "ai" && !e && /* @__PURE__ */ o.jsx(
      KM,
      {
        initialPrompt: G,
        onCancel: () => {
          Y(!1), ve(N);
        },
        onConfirm: ({ prompt: x }) => {
          oe(x), Y(!1);
        }
      }
    )
  ] });
}, r_ = () => {
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
class o_ extends Te.Component {
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
const ey = document.getElementById("root");
if (!ey)
  throw new Error("Root element not found");
r_();
Rc.createRoot(ey).render(
  /* @__PURE__ */ o.jsx(Te.StrictMode, { children: /* @__PURE__ */ o.jsx(o_, { children: /* @__PURE__ */ o.jsx(i_, {}) }) })
);
