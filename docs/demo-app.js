function $p(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Vp = { exports: {} }, Kr = {}, Kp = { exports: {} }, Me = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $i = Symbol.for("react.element"), Py = Symbol.for("react.portal"), Ny = Symbol.for("react.fragment"), Iy = Symbol.for("react.strict_mode"), Ey = Symbol.for("react.profiler"), Ry = Symbol.for("react.provider"), Ay = Symbol.for("react.context"), Ly = Symbol.for("react.forward_ref"), Dy = Symbol.for("react.suspense"), By = Symbol.for("react.memo"), Yy = Symbol.for("react.lazy"), Rh = Symbol.iterator;
function Xy(e) {
  return e === null || typeof e != "object" ? null : (e = Rh && e[Rh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Gp = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Qp = Object.assign, Zp = {};
function $l(e, t, n) {
  this.props = e, this.context = t, this.refs = Zp, this.updater = n || Gp;
}
$l.prototype.isReactComponent = {};
$l.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
$l.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function qp() {
}
qp.prototype = $l.prototype;
function Du(e, t, n) {
  this.props = e, this.context = t, this.refs = Zp, this.updater = n || Gp;
}
var Bu = Du.prototype = new qp();
Bu.constructor = Du;
Qp(Bu, $l.prototype);
Bu.isPureReactComponent = !0;
var Ah = Array.isArray, Jp = Object.prototype.hasOwnProperty, Yu = { current: null }, em = { key: !0, ref: !0, __self: !0, __source: !0 };
function tm(e, t, n) {
  var s, l = {}, i = null, o = null;
  if (t != null) for (s in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (i = "" + t.key), t) Jp.call(t, s) && !em.hasOwnProperty(s) && (l[s] = t[s]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in a = e.defaultProps, a) l[s] === void 0 && (l[s] = a[s]);
  return { $$typeof: $i, type: e, key: i, ref: o, props: l, _owner: Yu.current };
}
function Oy(e, t) {
  return { $$typeof: $i, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Xu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === $i;
}
function Fy(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Lh = /\/+/g;
function Ba(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Fy("" + e.key) : t.toString(36);
}
function qo(e, t, n, s, l) {
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
        case Py:
          o = !0;
      }
  }
  if (o) return o = e, l = l(o), e = s === "" ? "." + Ba(o, 0) : s, Ah(l) ? (n = "", e != null && (n = e.replace(Lh, "$&/") + "/"), qo(l, t, n, "", function(u) {
    return u;
  })) : l != null && (Xu(l) && (l = Oy(l, n + (!l.key || o && o.key === l.key ? "" : ("" + l.key).replace(Lh, "$&/") + "/") + e)), t.push(l)), 1;
  if (o = 0, s = s === "" ? "." : s + ":", Ah(e)) for (var a = 0; a < e.length; a++) {
    i = e[a];
    var c = s + Ba(i, a);
    o += qo(i, t, n, c, l);
  }
  else if (c = Xy(e), typeof c == "function") for (e = c.call(e), a = 0; !(i = e.next()).done; ) i = i.value, c = s + Ba(i, a++), o += qo(i, t, n, c, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function jo(e, t, n) {
  if (e == null) return e;
  var s = [], l = 0;
  return qo(e, s, "", "", function(i) {
    return t.call(n, i, l++);
  }), s;
}
function zy(e) {
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
var Lt = { current: null }, Jo = { transition: null }, Hy = { ReactCurrentDispatcher: Lt, ReactCurrentBatchConfig: Jo, ReactCurrentOwner: Yu };
function nm() {
  throw Error("act(...) is not supported in production builds of React.");
}
Me.Children = { map: jo, forEach: function(e, t, n) {
  jo(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return jo(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return jo(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Xu(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
Me.Component = $l;
Me.Fragment = Ny;
Me.Profiler = Ey;
Me.PureComponent = Du;
Me.StrictMode = Iy;
Me.Suspense = Dy;
Me.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Hy;
Me.act = nm;
Me.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = Qp({}, e.props), l = e.key, i = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, o = Yu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) Jp.call(t, c) && !em.hasOwnProperty(c) && (s[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
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
Me.createContext = function(e) {
  return e = { $$typeof: Ay, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Ry, _context: e }, e.Consumer = e;
};
Me.createElement = tm;
Me.createFactory = function(e) {
  var t = tm.bind(null, e);
  return t.type = e, t;
};
Me.createRef = function() {
  return { current: null };
};
Me.forwardRef = function(e) {
  return { $$typeof: Ly, render: e };
};
Me.isValidElement = Xu;
Me.lazy = function(e) {
  return { $$typeof: Yy, _payload: { _status: -1, _result: e }, _init: zy };
};
Me.memo = function(e, t) {
  return { $$typeof: By, type: e, compare: t === void 0 ? null : t };
};
Me.startTransition = function(e) {
  var t = Jo.transition;
  Jo.transition = {};
  try {
    e();
  } finally {
    Jo.transition = t;
  }
};
Me.unstable_act = nm;
Me.useCallback = function(e, t) {
  return Lt.current.useCallback(e, t);
};
Me.useContext = function(e) {
  return Lt.current.useContext(e);
};
Me.useDebugValue = function() {
};
Me.useDeferredValue = function(e) {
  return Lt.current.useDeferredValue(e);
};
Me.useEffect = function(e, t) {
  return Lt.current.useEffect(e, t);
};
Me.useId = function() {
  return Lt.current.useId();
};
Me.useImperativeHandle = function(e, t, n) {
  return Lt.current.useImperativeHandle(e, t, n);
};
Me.useInsertionEffect = function(e, t) {
  return Lt.current.useInsertionEffect(e, t);
};
Me.useLayoutEffect = function(e, t) {
  return Lt.current.useLayoutEffect(e, t);
};
Me.useMemo = function(e, t) {
  return Lt.current.useMemo(e, t);
};
Me.useReducer = function(e, t, n) {
  return Lt.current.useReducer(e, t, n);
};
Me.useRef = function(e) {
  return Lt.current.useRef(e);
};
Me.useState = function(e) {
  return Lt.current.useState(e);
};
Me.useSyncExternalStore = function(e, t, n) {
  return Lt.current.useSyncExternalStore(e, t, n);
};
Me.useTransition = function() {
  return Lt.current.useTransition();
};
Me.version = "18.3.1";
Kp.exports = Me;
var T = Kp.exports;
const ke = /* @__PURE__ */ $p(T);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wy = T, Uy = Symbol.for("react.element"), $y = Symbol.for("react.fragment"), Vy = Object.prototype.hasOwnProperty, Ky = Wy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Gy = { key: !0, ref: !0, __self: !0, __source: !0 };
function sm(e, t, n) {
  var s, l = {}, i = null, o = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (s in t) Vy.call(t, s) && !Gy.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: Uy, type: e, key: i, ref: o, props: l, _owner: Ky.current };
}
Kr.Fragment = $y;
Kr.jsx = sm;
Kr.jsxs = sm;
Vp.exports = Kr;
var r = Vp.exports, Rc = {}, lm = { exports: {} }, tn = {}, im = { exports: {} }, om = {};
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
  function t(B, X) {
    var K = B.length;
    B.push(X);
    e: for (; 0 < K; ) {
      var ee = K - 1 >>> 1, ce = B[ee];
      if (0 < l(ce, X)) B[ee] = X, B[K] = ce, K = ee;
      else break e;
    }
  }
  function n(B) {
    return B.length === 0 ? null : B[0];
  }
  function s(B) {
    if (B.length === 0) return null;
    var X = B[0], K = B.pop();
    if (K !== X) {
      B[0] = K;
      e: for (var ee = 0, ce = B.length, U = ce >>> 1; ee < U; ) {
        var Z = 2 * (ee + 1) - 1, xe = B[Z], me = Z + 1, F = B[me];
        if (0 > l(xe, K)) me < ce && 0 > l(F, xe) ? (B[ee] = F, B[me] = K, ee = me) : (B[ee] = xe, B[Z] = K, ee = Z);
        else if (me < ce && 0 > l(F, K)) B[ee] = F, B[me] = K, ee = me;
        else break e;
      }
    }
    return X;
  }
  function l(B, X) {
    var K = B.sortIndex - X.sortIndex;
    return K !== 0 ? K : B.id - X.id;
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
  function x(B) {
    for (var X = n(u); X !== null; ) {
      if (X.callback === null) s(u);
      else if (X.startTime <= B) s(u), X.sortIndex = X.expirationTime, t(c, X);
      else break;
      X = n(u);
    }
  }
  function S(B) {
    if (w = !1, x(B), !g) if (n(c) !== null) g = !0, le(b);
    else {
      var X = n(u);
      X !== null && ie(S, X.startTime - B);
    }
  }
  function b(B, X) {
    g = !1, w && (w = !1, v(C), C = -1), p = !0;
    var K = h;
    try {
      for (x(X), f = n(c); f !== null && (!(f.expirationTime > X) || B && !P()); ) {
        var ee = f.callback;
        if (typeof ee == "function") {
          f.callback = null, h = f.priorityLevel;
          var ce = ee(f.expirationTime <= X);
          X = e.unstable_now(), typeof ce == "function" ? f.callback = ce : f === n(c) && s(c), x(X);
        } else s(c);
        f = n(c);
      }
      if (f !== null) var U = !0;
      else {
        var Z = n(u);
        Z !== null && ie(S, Z.startTime - X), U = !1;
      }
      return U;
    } finally {
      f = null, h = K, p = !1;
    }
  }
  var _ = !1, k = null, C = -1, R = 5, D = -1;
  function P() {
    return !(e.unstable_now() - D < R);
  }
  function A() {
    if (k !== null) {
      var B = e.unstable_now();
      D = B;
      var X = !0;
      try {
        X = k(!0, B);
      } finally {
        X ? H() : (_ = !1, k = null);
      }
    } else _ = !1;
  }
  var H;
  if (typeof m == "function") H = function() {
    m(A);
  };
  else if (typeof MessageChannel < "u") {
    var J = new MessageChannel(), oe = J.port2;
    J.port1.onmessage = A, H = function() {
      oe.postMessage(null);
    };
  } else H = function() {
    M(A, 0);
  };
  function le(B) {
    k = B, _ || (_ = !0, H());
  }
  function ie(B, X) {
    C = M(function() {
      B(e.unstable_now());
    }, X);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(B) {
    B.callback = null;
  }, e.unstable_continueExecution = function() {
    g || p || (g = !0, le(b));
  }, e.unstable_forceFrameRate = function(B) {
    0 > B || 125 < B ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : R = 0 < B ? Math.floor(1e3 / B) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(B) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var X = 3;
        break;
      default:
        X = h;
    }
    var K = h;
    h = X;
    try {
      return B();
    } finally {
      h = K;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(B, X) {
    switch (B) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        B = 3;
    }
    var K = h;
    h = B;
    try {
      return X();
    } finally {
      h = K;
    }
  }, e.unstable_scheduleCallback = function(B, X, K) {
    var ee = e.unstable_now();
    switch (typeof K == "object" && K !== null ? (K = K.delay, K = typeof K == "number" && 0 < K ? ee + K : ee) : K = ee, B) {
      case 1:
        var ce = -1;
        break;
      case 2:
        ce = 250;
        break;
      case 5:
        ce = 1073741823;
        break;
      case 4:
        ce = 1e4;
        break;
      default:
        ce = 5e3;
    }
    return ce = K + ce, B = { id: d++, callback: X, priorityLevel: B, startTime: K, expirationTime: ce, sortIndex: -1 }, K > ee ? (B.sortIndex = K, t(u, B), n(c) === null && B === n(u) && (w ? (v(C), C = -1) : w = !0, ie(S, K - ee))) : (B.sortIndex = ce, t(c, B), g || p || (g = !0, le(b))), B;
  }, e.unstable_shouldYield = P, e.unstable_wrapCallback = function(B) {
    var X = h;
    return function() {
      var K = h;
      h = X;
      try {
        return B.apply(this, arguments);
      } finally {
        h = K;
      }
    };
  };
})(om);
im.exports = om;
var Qy = im.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zy = T, en = Qy;
function O(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var rm = /* @__PURE__ */ new Set(), Pi = {};
function Js(e, t) {
  Ll(e, t), Ll(e + "Capture", t);
}
function Ll(e, t) {
  for (Pi[e] = t, e = 0; e < t.length; e++) rm.add(t[e]);
}
var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Ac = Object.prototype.hasOwnProperty, qy = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Dh = {}, Bh = {};
function Jy(e) {
  return Ac.call(Bh, e) ? !0 : Ac.call(Dh, e) ? !1 : qy.test(e) ? Bh[e] = !0 : (Dh[e] = !0, !1);
}
function ev(e, t, n, s) {
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
function tv(e, t, n, s) {
  if (t === null || typeof t > "u" || ev(e, t, n, s)) return !0;
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
var Ou = /[\-:]([a-z])/g;
function Fu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Ou,
    Fu
  );
  bt[t] = new Dt(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Ou, Fu);
  bt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Ou, Fu);
  bt[t] = new Dt(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  bt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
bt.xlinkHref = new Dt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  bt[e] = new Dt(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function zu(e, t, n, s) {
  var l = bt.hasOwnProperty(t) ? bt[t] : null;
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (tv(t, n, l, s) && (n = null), s || l === null ? Jy(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var Zn = Zy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Po = Symbol.for("react.element"), ml = Symbol.for("react.portal"), gl = Symbol.for("react.fragment"), Hu = Symbol.for("react.strict_mode"), Lc = Symbol.for("react.profiler"), am = Symbol.for("react.provider"), cm = Symbol.for("react.context"), Wu = Symbol.for("react.forward_ref"), Dc = Symbol.for("react.suspense"), Bc = Symbol.for("react.suspense_list"), Uu = Symbol.for("react.memo"), rs = Symbol.for("react.lazy"), um = Symbol.for("react.offscreen"), Yh = Symbol.iterator;
function ti(e) {
  return e === null || typeof e != "object" ? null : (e = Yh && e[Yh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var tt = Object.assign, Ya;
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
function Oa(e, t) {
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
    Xa = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? fi(e) : "";
}
function nv(e) {
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
function Yc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case gl:
      return "Fragment";
    case ml:
      return "Portal";
    case Lc:
      return "Profiler";
    case Hu:
      return "StrictMode";
    case Dc:
      return "Suspense";
    case Bc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case cm:
      return (e.displayName || "Context") + ".Consumer";
    case am:
      return (e._context.displayName || "Context") + ".Provider";
    case Wu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Uu:
      return t = e.displayName || null, t !== null ? t : Yc(e.type) || "Memo";
    case rs:
      t = e._payload, e = e._init;
      try {
        return Yc(e(t));
      } catch {
      }
  }
  return null;
}
function sv(e) {
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
      return t === Hu ? "StrictMode" : "Mode";
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
function dm(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function lv(e) {
  var t = dm(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
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
  e._valueTracker || (e._valueTracker = lv(e));
}
function hm(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = dm(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
}
function pr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Xc(e, t) {
  var n = t.checked;
  return tt({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Xh(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, s = t.checked != null ? t.checked : t.defaultChecked;
  n = bs(t.value != null ? t.value : n), e._wrapperState = { initialChecked: s, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function fm(e, t) {
  t = t.checked, t != null && zu(e, "checked", t, !1);
}
function Oc(e, t) {
  fm(e, t);
  var n = bs(t.value), s = t.type;
  if (n != null) s === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Fc(e, t.type, n) : t.hasOwnProperty("defaultValue") && Fc(e, t.type, bs(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Oh(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var s = t.type;
    if (!(s !== "submit" && s !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Fc(e, t, n) {
  (t !== "number" || pr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var pi = Array.isArray;
function Cl(e, t, n, s) {
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
function zc(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(O(91));
  return tt({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Fh(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(O(92));
      if (pi(n)) {
        if (1 < n.length) throw Error(O(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: bs(n) };
}
function pm(e, t) {
  var n = bs(t.value), s = bs(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function zh(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function mm(e) {
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
  return e == null || e === "http://www.w3.org/1999/xhtml" ? mm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Io, gm = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, s, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, s, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Io = Io || document.createElement("div"), Io.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Io.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Ni(e, t) {
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
}, iv = ["Webkit", "ms", "Moz", "O"];
Object.keys(yi).forEach(function(e) {
  iv.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), yi[t] = yi[e];
  });
});
function xm(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || yi.hasOwnProperty(e) && yi[e] ? ("" + t).trim() : t + "px";
}
function ym(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var s = n.indexOf("--") === 0, l = xm(n, t[n], s);
    n === "float" && (n = "cssFloat"), s ? e.setProperty(n, l) : e[n] = l;
  }
}
var ov = tt({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Wc(e, t) {
  if (t) {
    if (ov[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(O(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(O(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(O(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(O(62));
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
function $u(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Vc = null, jl = null, Pl = null;
function Hh(e) {
  if (e = Gi(e)) {
    if (typeof Vc != "function") throw Error(O(280));
    var t = e.stateNode;
    t && (t = Jr(t), Vc(e.stateNode, e.type, t));
  }
}
function vm(e) {
  jl ? Pl ? Pl.push(e) : Pl = [e] : jl = e;
}
function wm() {
  if (jl) {
    var e = jl, t = Pl;
    if (Pl = jl = null, Hh(e), t) for (e = 0; e < t.length; e++) Hh(t[e]);
  }
}
function Sm(e, t) {
  return e(t);
}
function Mm() {
}
var Fa = !1;
function bm(e, t, n) {
  if (Fa) return e(t, n);
  Fa = !0;
  try {
    return Sm(e, t, n);
  } finally {
    Fa = !1, (jl !== null || Pl !== null) && (Mm(), wm());
  }
}
function Ii(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var s = Jr(n);
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
  if (n && typeof n != "function") throw Error(O(231, t, typeof n));
  return n;
}
var Kc = !1;
if ($n) try {
  var ni = {};
  Object.defineProperty(ni, "passive", { get: function() {
    Kc = !0;
  } }), window.addEventListener("test", ni, ni), window.removeEventListener("test", ni, ni);
} catch {
  Kc = !1;
}
function rv(e, t, n, s, l, i, o, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var vi = !1, mr = null, gr = !1, Gc = null, av = { onError: function(e) {
  vi = !0, mr = e;
} };
function cv(e, t, n, s, l, i, o, a, c) {
  vi = !1, mr = null, rv.apply(av, arguments);
}
function uv(e, t, n, s, l, i, o, a, c) {
  if (cv.apply(this, arguments), vi) {
    if (vi) {
      var u = mr;
      vi = !1, mr = null;
    } else throw Error(O(198));
    gr || (gr = !0, Gc = u);
  }
}
function el(e) {
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
function _m(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Wh(e) {
  if (el(e) !== e) throw Error(O(188));
}
function dv(e) {
  var t = e.alternate;
  if (!t) {
    if (t = el(e), t === null) throw Error(O(188));
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
        if (i === n) return Wh(l), e;
        if (i === s) return Wh(l), t;
        i = i.sibling;
      }
      throw Error(O(188));
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
        if (!o) throw Error(O(189));
      }
    }
    if (n.alternate !== s) throw Error(O(190));
  }
  if (n.tag !== 3) throw Error(O(188));
  return n.stateNode.current === n ? e : t;
}
function Tm(e) {
  return e = dv(e), e !== null ? km(e) : null;
}
function km(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = km(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Cm = en.unstable_scheduleCallback, Uh = en.unstable_cancelCallback, hv = en.unstable_shouldYield, fv = en.unstable_requestPaint, it = en.unstable_now, pv = en.unstable_getCurrentPriorityLevel, Vu = en.unstable_ImmediatePriority, jm = en.unstable_UserBlockingPriority, xr = en.unstable_NormalPriority, mv = en.unstable_LowPriority, Pm = en.unstable_IdlePriority, Gr = null, Dn = null;
function gv(e) {
  if (Dn && typeof Dn.onCommitFiberRoot == "function") try {
    Dn.onCommitFiberRoot(Gr, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var jn = Math.clz32 ? Math.clz32 : vv, xv = Math.log, yv = Math.LN2;
function vv(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (xv(e) / yv | 0) | 0;
}
var Eo = 64, Ro = 4194304;
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
function yr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var s = 0, l = e.suspendedLanes, i = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var a = o & ~l;
    a !== 0 ? s = mi(a) : (i &= o, i !== 0 && (s = mi(i)));
  } else o = n & ~l, o !== 0 ? s = mi(o) : i !== 0 && (s = mi(i));
  if (s === 0) return 0;
  if (t !== 0 && t !== s && !(t & l) && (l = s & -s, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (s & 4 && (s |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= s; 0 < t; ) n = 31 - jn(t), l = 1 << n, s |= e[n], t &= ~l;
  return s;
}
function wv(e, t) {
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
function Sv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var o = 31 - jn(i), a = 1 << o, c = l[o];
    c === -1 ? (!(a & n) || a & s) && (l[o] = wv(a, t)) : c <= t && (e.expiredLanes |= a), i &= ~a;
  }
}
function Qc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Nm() {
  var e = Eo;
  return Eo <<= 1, !(Eo & 4194240) && (Eo = 64), e;
}
function za(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Vi(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - jn(t), e[t] = n;
}
function Mv(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - jn(n), i = 1 << l;
    t[l] = 0, s[l] = -1, e[l] = -1, n &= ~i;
  }
}
function Ku(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var s = 31 - jn(n), l = 1 << s;
    l & t | e[s] & t && (e[s] |= t), n &= ~l;
  }
}
var De = 0;
function Im(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Em, Gu, Rm, Am, Lm, Zc = !1, Ao = [], ms = null, gs = null, xs = null, Ei = /* @__PURE__ */ new Map(), Ri = /* @__PURE__ */ new Map(), cs = [], bv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function $h(e, t) {
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
      Ei.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Ri.delete(t.pointerId);
  }
}
function si(e, t, n, s, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: s, nativeEvent: i, targetContainers: [l] }, t !== null && (t = Gi(t), t !== null && Gu(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function _v(e, t, n, s, l) {
  switch (t) {
    case "focusin":
      return ms = si(ms, e, t, n, s, l), !0;
    case "dragenter":
      return gs = si(gs, e, t, n, s, l), !0;
    case "mouseover":
      return xs = si(xs, e, t, n, s, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Ei.set(i, si(Ei.get(i) || null, e, t, n, s, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Ri.set(i, si(Ri.get(i) || null, e, t, n, s, l)), !0;
  }
  return !1;
}
function Dm(e) {
  var t = Ys(e.target);
  if (t !== null) {
    var n = el(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = _m(n), t !== null) {
          e.blockedOn = t, Lm(e.priority, function() {
            Rm(n);
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
function er(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = qc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var s = new n.constructor(n.type, n);
      $c = s, n.target.dispatchEvent(s), $c = null;
    } else return t = Gi(n), t !== null && Gu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Vh(e, t, n) {
  er(e) && n.delete(t);
}
function Tv() {
  Zc = !1, ms !== null && er(ms) && (ms = null), gs !== null && er(gs) && (gs = null), xs !== null && er(xs) && (xs = null), Ei.forEach(Vh), Ri.forEach(Vh);
}
function li(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Zc || (Zc = !0, en.unstable_scheduleCallback(en.unstable_NormalPriority, Tv)));
}
function Ai(e) {
  function t(l) {
    return li(l, e);
  }
  if (0 < Ao.length) {
    li(Ao[0], e);
    for (var n = 1; n < Ao.length; n++) {
      var s = Ao[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (ms !== null && li(ms, e), gs !== null && li(gs, e), xs !== null && li(xs, e), Ei.forEach(t), Ri.forEach(t), n = 0; n < cs.length; n++) s = cs[n], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < cs.length && (n = cs[0], n.blockedOn === null); ) Dm(n), n.blockedOn === null && cs.shift();
}
var Nl = Zn.ReactCurrentBatchConfig, vr = !0;
function kv(e, t, n, s) {
  var l = De, i = Nl.transition;
  Nl.transition = null;
  try {
    De = 1, Qu(e, t, n, s);
  } finally {
    De = l, Nl.transition = i;
  }
}
function Cv(e, t, n, s) {
  var l = De, i = Nl.transition;
  Nl.transition = null;
  try {
    De = 4, Qu(e, t, n, s);
  } finally {
    De = l, Nl.transition = i;
  }
}
function Qu(e, t, n, s) {
  if (vr) {
    var l = qc(e, t, n, s);
    if (l === null) qa(e, t, s, wr, n), $h(e, s);
    else if (_v(l, e, t, n, s)) s.stopPropagation();
    else if ($h(e, s), t & 4 && -1 < bv.indexOf(e)) {
      for (; l !== null; ) {
        var i = Gi(l);
        if (i !== null && Em(i), i = qc(e, t, n, s), i === null && qa(e, t, s, wr, n), i === l) break;
        l = i;
      }
      l !== null && s.stopPropagation();
    } else qa(e, t, s, null, n);
  }
}
var wr = null;
function qc(e, t, n, s) {
  if (wr = null, e = $u(s), e = Ys(e), e !== null) if (t = el(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = _m(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return wr = e, null;
}
function Bm(e) {
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
      switch (pv()) {
        case Vu:
          return 1;
        case jm:
          return 4;
        case xr:
        case mv:
          return 16;
        case Pm:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var fs = null, Zu = null, tr = null;
function Ym() {
  if (tr) return tr;
  var e, t = Zu, n = t.length, s, l = "value" in fs ? fs.value : fs.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var o = n - e;
  for (s = 1; s <= o && t[n - s] === l[i - s]; s++) ;
  return tr = l.slice(e, 1 < s ? 1 - s : void 0);
}
function nr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Lo() {
  return !0;
}
function Kh() {
  return !1;
}
function nn(e) {
  function t(n, s, l, i, o) {
    this._reactName = n, this._targetInst = l, this.type = s, this.nativeEvent = i, this.target = o, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(i) : i[a]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Lo : Kh, this.isPropagationStopped = Kh, this;
  }
  return tt(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Lo);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Lo);
  }, persist: function() {
  }, isPersistent: Lo }), t;
}
var Vl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, qu = nn(Vl), Ki = tt({}, Vl, { view: 0, detail: 0 }), jv = nn(Ki), Ha, Wa, ii, Qr = tt({}, Ki, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ju, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ii && (ii && e.type === "mousemove" ? (Ha = e.screenX - ii.screenX, Wa = e.screenY - ii.screenY) : Wa = Ha = 0, ii = e), Ha);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Wa;
} }), Gh = nn(Qr), Pv = tt({}, Qr, { dataTransfer: 0 }), Nv = nn(Pv), Iv = tt({}, Ki, { relatedTarget: 0 }), Ua = nn(Iv), Ev = tt({}, Vl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Rv = nn(Ev), Av = tt({}, Vl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Lv = nn(Av), Dv = tt({}, Vl, { data: 0 }), Qh = nn(Dv), Bv = {
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
}, Yv = {
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
}, Xv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Ov(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Xv[e]) ? !!t[e] : !1;
}
function Ju() {
  return Ov;
}
var Fv = tt({}, Ki, { key: function(e) {
  if (e.key) {
    var t = Bv[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = nr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Yv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ju, charCode: function(e) {
  return e.type === "keypress" ? nr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? nr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), zv = nn(Fv), Hv = tt({}, Qr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Zh = nn(Hv), Wv = tt({}, Ki, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ju }), Uv = nn(Wv), $v = tt({}, Vl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Vv = nn($v), Kv = tt({}, Qr, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Gv = nn(Kv), Qv = [9, 13, 27, 32], ed = $n && "CompositionEvent" in window, wi = null;
$n && "documentMode" in document && (wi = document.documentMode);
var Zv = $n && "TextEvent" in window && !wi, Xm = $n && (!ed || wi && 8 < wi && 11 >= wi), qh = " ", Jh = !1;
function Om(e, t) {
  switch (e) {
    case "keyup":
      return Qv.indexOf(t.keyCode) !== -1;
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
function Fm(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var xl = !1;
function qv(e, t) {
  switch (e) {
    case "compositionend":
      return Fm(t);
    case "keypress":
      return t.which !== 32 ? null : (Jh = !0, qh);
    case "textInput":
      return e = t.data, e === qh && Jh ? null : e;
    default:
      return null;
  }
}
function Jv(e, t) {
  if (xl) return e === "compositionend" || !ed && Om(e, t) ? (e = Ym(), tr = Zu = fs = null, xl = !1, e) : null;
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
      return Xm && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var e0 = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function ef(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!e0[e.type] : t === "textarea";
}
function zm(e, t, n, s) {
  vm(s), t = Sr(t, "onChange"), 0 < t.length && (n = new qu("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var Si = null, Li = null;
function t0(e) {
  Jm(e, 0);
}
function Zr(e) {
  var t = wl(e);
  if (hm(t)) return e;
}
function n0(e, t) {
  if (e === "change") return t;
}
var Hm = !1;
if ($n) {
  var $a;
  if ($n) {
    var Va = "oninput" in document;
    if (!Va) {
      var tf = document.createElement("div");
      tf.setAttribute("oninput", "return;"), Va = typeof tf.oninput == "function";
    }
    $a = Va;
  } else $a = !1;
  Hm = $a && (!document.documentMode || 9 < document.documentMode);
}
function nf() {
  Si && (Si.detachEvent("onpropertychange", Wm), Li = Si = null);
}
function Wm(e) {
  if (e.propertyName === "value" && Zr(Li)) {
    var t = [];
    zm(t, Li, e, $u(e)), bm(t0, t);
  }
}
function s0(e, t, n) {
  e === "focusin" ? (nf(), Si = t, Li = n, Si.attachEvent("onpropertychange", Wm)) : e === "focusout" && nf();
}
function l0(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Zr(Li);
}
function i0(e, t) {
  if (e === "click") return Zr(t);
}
function o0(e, t) {
  if (e === "input" || e === "change") return Zr(t);
}
function r0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Nn = typeof Object.is == "function" ? Object.is : r0;
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
function sf(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function lf(e, t) {
  var n = sf(e);
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
    n = sf(n);
  }
}
function Um(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Um(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function $m() {
  for (var e = window, t = pr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = pr(e.document);
  }
  return t;
}
function td(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function a0(e) {
  var t = $m(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Um(n.ownerDocument.documentElement, n)) {
    if (s !== null && td(n)) {
      if (t = s.start, e = s.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(s.start, l);
        s = s.end === void 0 ? i : Math.min(s.end, l), !e.extend && i > s && (l = s, s = i, i = l), l = lf(n, i);
        var o = lf(
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
var c0 = $n && "documentMode" in document && 11 >= document.documentMode, yl = null, Jc = null, Mi = null, eu = !1;
function of(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  eu || yl == null || yl !== pr(s) || (s = yl, "selectionStart" in s && td(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), Mi && Di(Mi, s) || (Mi = s, s = Sr(Jc, "onSelect"), 0 < s.length && (t = new qu("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = yl)));
}
function Do(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var vl = { animationend: Do("Animation", "AnimationEnd"), animationiteration: Do("Animation", "AnimationIteration"), animationstart: Do("Animation", "AnimationStart"), transitionend: Do("Transition", "TransitionEnd") }, Ka = {}, Vm = {};
$n && (Vm = document.createElement("div").style, "AnimationEvent" in window || (delete vl.animationend.animation, delete vl.animationiteration.animation, delete vl.animationstart.animation), "TransitionEvent" in window || delete vl.transitionend.transition);
function qr(e) {
  if (Ka[e]) return Ka[e];
  if (!vl[e]) return e;
  var t = vl[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Vm) return Ka[e] = t[n];
  return e;
}
var Km = qr("animationend"), Gm = qr("animationiteration"), Qm = qr("animationstart"), Zm = qr("transitionend"), qm = /* @__PURE__ */ new Map(), rf = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ts(e, t) {
  qm.set(e, t), Js(t, [e]);
}
for (var Ga = 0; Ga < rf.length; Ga++) {
  var Qa = rf[Ga], u0 = Qa.toLowerCase(), d0 = Qa[0].toUpperCase() + Qa.slice(1);
  Ts(u0, "on" + d0);
}
Ts(Km, "onAnimationEnd");
Ts(Gm, "onAnimationIteration");
Ts(Qm, "onAnimationStart");
Ts("dblclick", "onDoubleClick");
Ts("focusin", "onFocus");
Ts("focusout", "onBlur");
Ts(Zm, "onTransitionEnd");
Ll("onMouseEnter", ["mouseout", "mouseover"]);
Ll("onMouseLeave", ["mouseout", "mouseover"]);
Ll("onPointerEnter", ["pointerout", "pointerover"]);
Ll("onPointerLeave", ["pointerout", "pointerover"]);
Js("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Js("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Js("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Js("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Js("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Js("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var gi = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), h0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(gi));
function af(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, uv(s, t, void 0, e), e.currentTarget = null;
}
function Jm(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var s = e[n], l = s.event;
    s = s.listeners;
    e: {
      var i = void 0;
      if (t) for (var o = s.length - 1; 0 <= o; o--) {
        var a = s[o], c = a.instance, u = a.currentTarget;
        if (a = a.listener, c !== i && l.isPropagationStopped()) break e;
        af(l, a, u), i = c;
      }
      else for (o = 0; o < s.length; o++) {
        if (a = s[o], c = a.instance, u = a.currentTarget, a = a.listener, c !== i && l.isPropagationStopped()) break e;
        af(l, a, u), i = c;
      }
    }
  }
  if (gr) throw e = Gc, gr = !1, Gc = null, e;
}
function We(e, t) {
  var n = t[iu];
  n === void 0 && (n = t[iu] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  n.has(s) || (eg(t, e, 2, !1), n.add(s));
}
function Za(e, t, n) {
  var s = 0;
  t && (s |= 4), eg(n, e, s, t);
}
var Bo = "_reactListening" + Math.random().toString(36).slice(2);
function Bi(e) {
  if (!e[Bo]) {
    e[Bo] = !0, rm.forEach(function(n) {
      n !== "selectionchange" && (h0.has(n) || Za(n, !1, e), Za(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Bo] || (t[Bo] = !0, Za("selectionchange", !1, t));
  }
}
function eg(e, t, n, s) {
  switch (Bm(t)) {
    case 1:
      var l = kv;
      break;
    case 4:
      l = Cv;
      break;
    default:
      l = Qu;
  }
  n = l.bind(null, t, n, e), l = void 0, !Kc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), s ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function qa(e, t, n, s, l) {
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
        if (o = Ys(a), o === null) return;
        if (c = o.tag, c === 5 || c === 6) {
          s = i = o;
          continue e;
        }
        a = a.parentNode;
      }
    }
    s = s.return;
  }
  bm(function() {
    var u = i, d = $u(n), f = [];
    e: {
      var h = qm.get(e);
      if (h !== void 0) {
        var p = qu, g = e;
        switch (e) {
          case "keypress":
            if (nr(n) === 0) break e;
          case "keydown":
          case "keyup":
            p = zv;
            break;
          case "focusin":
            g = "focus", p = Ua;
            break;
          case "focusout":
            g = "blur", p = Ua;
            break;
          case "beforeblur":
          case "afterblur":
            p = Ua;
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
            p = Gh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = Nv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = Uv;
            break;
          case Km:
          case Gm:
          case Qm:
            p = Rv;
            break;
          case Zm:
            p = Vv;
            break;
          case "scroll":
            p = jv;
            break;
          case "wheel":
            p = Gv;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = Lv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Zh;
        }
        var w = (t & 4) !== 0, M = !w && e === "scroll", v = w ? h !== null ? h + "Capture" : null : h;
        w = [];
        for (var m = u, x; m !== null; ) {
          x = m;
          var S = x.stateNode;
          if (x.tag === 5 && S !== null && (x = S, v !== null && (S = Ii(m, v), S != null && w.push(Yi(m, S, x)))), M) break;
          m = m.return;
        }
        0 < w.length && (h = new p(h, g, null, n, d), f.push({ event: h, listeners: w }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", p = e === "mouseout" || e === "pointerout", h && n !== $c && (g = n.relatedTarget || n.fromElement) && (Ys(g) || g[Vn])) break e;
        if ((p || h) && (h = d.window === d ? d : (h = d.ownerDocument) ? h.defaultView || h.parentWindow : window, p ? (g = n.relatedTarget || n.toElement, p = u, g = g ? Ys(g) : null, g !== null && (M = el(g), g !== M || g.tag !== 5 && g.tag !== 6) && (g = null)) : (p = null, g = u), p !== g)) {
          if (w = Gh, S = "onMouseLeave", v = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (w = Zh, S = "onPointerLeave", v = "onPointerEnter", m = "pointer"), M = p == null ? h : wl(p), x = g == null ? h : wl(g), h = new w(S, m + "leave", p, n, d), h.target = M, h.relatedTarget = x, S = null, Ys(d) === u && (w = new w(v, m + "enter", g, n, d), w.target = x, w.relatedTarget = M, S = w), M = S, p && g) t: {
            for (w = p, v = g, m = 0, x = w; x; x = ul(x)) m++;
            for (x = 0, S = v; S; S = ul(S)) x++;
            for (; 0 < m - x; ) w = ul(w), m--;
            for (; 0 < x - m; ) v = ul(v), x--;
            for (; m--; ) {
              if (w === v || v !== null && w === v.alternate) break t;
              w = ul(w), v = ul(v);
            }
            w = null;
          }
          else w = null;
          p !== null && cf(f, h, p, w, !1), g !== null && M !== null && cf(f, M, g, w, !0);
        }
      }
      e: {
        if (h = u ? wl(u) : window, p = h.nodeName && h.nodeName.toLowerCase(), p === "select" || p === "input" && h.type === "file") var b = n0;
        else if (ef(h)) if (Hm) b = o0;
        else {
          b = l0;
          var _ = s0;
        }
        else (p = h.nodeName) && p.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (b = i0);
        if (b && (b = b(e, u))) {
          zm(f, b, n, d);
          break e;
        }
        _ && _(e, h, u), e === "focusout" && (_ = h._wrapperState) && _.controlled && h.type === "number" && Fc(h, "number", h.value);
      }
      switch (_ = u ? wl(u) : window, e) {
        case "focusin":
          (ef(_) || _.contentEditable === "true") && (yl = _, Jc = u, Mi = null);
          break;
        case "focusout":
          Mi = Jc = yl = null;
          break;
        case "mousedown":
          eu = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          eu = !1, of(f, n, d);
          break;
        case "selectionchange":
          if (c0) break;
        case "keydown":
        case "keyup":
          of(f, n, d);
      }
      var k;
      if (ed) e: {
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
      else xl ? Om(e, n) && (C = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (C = "onCompositionStart");
      C && (Xm && n.locale !== "ko" && (xl || C !== "onCompositionStart" ? C === "onCompositionEnd" && xl && (k = Ym()) : (fs = d, Zu = "value" in fs ? fs.value : fs.textContent, xl = !0)), _ = Sr(u, C), 0 < _.length && (C = new Qh(C, e, null, n, d), f.push({ event: C, listeners: _ }), k ? C.data = k : (k = Fm(n), k !== null && (C.data = k)))), (k = Zv ? qv(e, n) : Jv(e, n)) && (u = Sr(u, "onBeforeInput"), 0 < u.length && (d = new Qh("onBeforeInput", "beforeinput", null, n, d), f.push({ event: d, listeners: u }), d.data = k));
    }
    Jm(f, t);
  });
}
function Yi(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Sr(e, t) {
  for (var n = t + "Capture", s = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Ii(e, n), i != null && s.unshift(Yi(e, i, l)), i = Ii(e, t), i != null && s.push(Yi(e, i, l))), e = e.return;
  }
  return s;
}
function ul(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function cf(e, t, n, s, l) {
  for (var i = t._reactName, o = []; n !== null && n !== s; ) {
    var a = n, c = a.alternate, u = a.stateNode;
    if (c !== null && c === s) break;
    a.tag === 5 && u !== null && (a = u, l ? (c = Ii(n, i), c != null && o.unshift(Yi(n, c, a))) : l || (c = Ii(n, i), c != null && o.push(Yi(n, c, a)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var f0 = /\r\n?/g, p0 = /\u0000|\uFFFD/g;
function uf(e) {
  return (typeof e == "string" ? e : "" + e).replace(f0, `
`).replace(p0, "");
}
function Yo(e, t, n) {
  if (t = uf(t), uf(e) !== t && n) throw Error(O(425));
}
function Mr() {
}
var tu = null, nu = null;
function su(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var lu = typeof setTimeout == "function" ? setTimeout : void 0, m0 = typeof clearTimeout == "function" ? clearTimeout : void 0, df = typeof Promise == "function" ? Promise : void 0, g0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof df < "u" ? function(e) {
  return df.resolve(null).then(e).catch(x0);
} : lu;
function x0(e) {
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
function hf(e) {
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
var Kl = Math.random().toString(36).slice(2), Ln = "__reactFiber$" + Kl, Xi = "__reactProps$" + Kl, Vn = "__reactContainer$" + Kl, iu = "__reactEvents$" + Kl, y0 = "__reactListeners$" + Kl, v0 = "__reactHandles$" + Kl;
function Ys(e) {
  var t = e[Ln];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Vn] || n[Ln]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = hf(e); e !== null; ) {
        if (n = e[Ln]) return n;
        e = hf(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Gi(e) {
  return e = e[Ln] || e[Vn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function wl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(O(33));
}
function Jr(e) {
  return e[Xi] || null;
}
var ou = [], Sl = -1;
function ks(e) {
  return { current: e };
}
function Ue(e) {
  0 > Sl || (e.current = ou[Sl], ou[Sl] = null, Sl--);
}
function Oe(e, t) {
  Sl++, ou[Sl] = e.current, e.current = t;
}
var _s = {}, Pt = ks(_s), $t = ks(!1), Us = _s;
function Dl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _s;
  var s = e.stateNode;
  if (s && s.__reactInternalMemoizedUnmaskedChildContext === t) return s.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Vt(e) {
  return e = e.childContextTypes, e != null;
}
function br() {
  Ue($t), Ue(Pt);
}
function ff(e, t, n) {
  if (Pt.current !== _s) throw Error(O(168));
  Oe(Pt, t), Oe($t, n);
}
function tg(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(O(108, sv(e) || "Unknown", l));
  return tt({}, n, s);
}
function _r(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || _s, Us = Pt.current, Oe(Pt, e), Oe($t, $t.current), !0;
}
function pf(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(O(169));
  n ? (e = tg(e, t, Us), s.__reactInternalMemoizedMergedChildContext = e, Ue($t), Ue(Pt), Oe(Pt, e)) : Ue($t), Oe($t, n);
}
var Fn = null, ea = !1, ec = !1;
function ng(e) {
  Fn === null ? Fn = [e] : Fn.push(e);
}
function w0(e) {
  ea = !0, ng(e);
}
function Cs() {
  if (!ec && Fn !== null) {
    ec = !0;
    var e = 0, t = De;
    try {
      var n = Fn;
      for (De = 1; e < n.length; e++) {
        var s = n[e];
        do
          s = s(!0);
        while (s !== null);
      }
      Fn = null, ea = !1;
    } catch (l) {
      throw Fn !== null && (Fn = Fn.slice(e + 1)), Cm(Vu, Cs), l;
    } finally {
      De = t, ec = !1;
    }
  }
  return null;
}
var Ml = [], bl = 0, Tr = null, kr = 0, dn = [], hn = 0, $s = null, zn = 1, Hn = "";
function Ls(e, t) {
  Ml[bl++] = kr, Ml[bl++] = Tr, Tr = e, kr = t;
}
function sg(e, t, n) {
  dn[hn++] = zn, dn[hn++] = Hn, dn[hn++] = $s, $s = e;
  var s = zn;
  e = Hn;
  var l = 32 - jn(s) - 1;
  s &= ~(1 << l), n += 1;
  var i = 32 - jn(t) + l;
  if (30 < i) {
    var o = l - l % 5;
    i = (s & (1 << o) - 1).toString(32), s >>= o, l -= o, zn = 1 << 32 - jn(t) + l | n << l | s, Hn = i + e;
  } else zn = 1 << i | n << l | s, Hn = e;
}
function nd(e) {
  e.return !== null && (Ls(e, 1), sg(e, 1, 0));
}
function sd(e) {
  for (; e === Tr; ) Tr = Ml[--bl], Ml[bl] = null, kr = Ml[--bl], Ml[bl] = null;
  for (; e === $s; ) $s = dn[--hn], dn[hn] = null, Hn = dn[--hn], dn[hn] = null, zn = dn[--hn], dn[hn] = null;
}
var Jt = null, qt = null, Qe = !1, Cn = null;
function lg(e, t) {
  var n = pn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function mf(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Jt = e, qt = ys(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Jt = e, qt = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = $s !== null ? { id: zn, overflow: Hn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = pn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Jt = e, qt = null, !0) : !1;
    default:
      return !1;
  }
}
function ru(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function au(e) {
  if (Qe) {
    var t = qt;
    if (t) {
      var n = t;
      if (!mf(e, t)) {
        if (ru(e)) throw Error(O(418));
        t = ys(n.nextSibling);
        var s = Jt;
        t && mf(e, t) ? lg(s, n) : (e.flags = e.flags & -4097 | 2, Qe = !1, Jt = e);
      }
    } else {
      if (ru(e)) throw Error(O(418));
      e.flags = e.flags & -4097 | 2, Qe = !1, Jt = e;
    }
  }
}
function gf(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Jt = e;
}
function Xo(e) {
  if (e !== Jt) return !1;
  if (!Qe) return gf(e), Qe = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !su(e.type, e.memoizedProps)), t && (t = qt)) {
    if (ru(e)) throw ig(), Error(O(418));
    for (; t; ) lg(e, t), t = ys(t.nextSibling);
  }
  if (gf(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(O(317));
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
function ig() {
  for (var e = qt; e; ) e = ys(e.nextSibling);
}
function Bl() {
  qt = Jt = null, Qe = !1;
}
function ld(e) {
  Cn === null ? Cn = [e] : Cn.push(e);
}
var S0 = Zn.ReactCurrentBatchConfig;
function oi(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(O(309));
        var s = n.stateNode;
      }
      if (!s) throw Error(O(147, e));
      var l = s, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(o) {
        var a = l.refs;
        o === null ? delete a[i] : a[i] = o;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(O(284));
    if (!n._owner) throw Error(O(290, e));
  }
  return e;
}
function Oo(e, t) {
  throw e = Object.prototype.toString.call(t), Error(O(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function xf(e) {
  var t = e._init;
  return t(e._payload);
}
function og(e) {
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
    return v = Ms(v, m), v.index = 0, v.sibling = null, v;
  }
  function i(v, m, x) {
    return v.index = x, e ? (x = v.alternate, x !== null ? (x = x.index, x < m ? (v.flags |= 2, m) : x) : (v.flags |= 2, m)) : (v.flags |= 1048576, m);
  }
  function o(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function a(v, m, x, S) {
    return m === null || m.tag !== 6 ? (m = rc(x, v.mode, S), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function c(v, m, x, S) {
    var b = x.type;
    return b === gl ? d(v, m, x.props.children, S, x.key) : m !== null && (m.elementType === b || typeof b == "object" && b !== null && b.$$typeof === rs && xf(b) === m.type) ? (S = l(m, x.props), S.ref = oi(v, m, x), S.return = v, S) : (S = cr(x.type, x.key, x.props, null, v.mode, S), S.ref = oi(v, m, x), S.return = v, S);
  }
  function u(v, m, x, S) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== x.containerInfo || m.stateNode.implementation !== x.implementation ? (m = ac(x, v.mode, S), m.return = v, m) : (m = l(m, x.children || []), m.return = v, m);
  }
  function d(v, m, x, S, b) {
    return m === null || m.tag !== 7 ? (m = Hs(x, v.mode, S, b), m.return = v, m) : (m = l(m, x), m.return = v, m);
  }
  function f(v, m, x) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = rc("" + m, v.mode, x), m.return = v, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Po:
          return x = cr(m.type, m.key, m.props, null, v.mode, x), x.ref = oi(v, null, m), x.return = v, x;
        case ml:
          return m = ac(m, v.mode, x), m.return = v, m;
        case rs:
          var S = m._init;
          return f(v, S(m._payload), x);
      }
      if (pi(m) || ti(m)) return m = Hs(m, v.mode, x, null), m.return = v, m;
      Oo(v, m);
    }
    return null;
  }
  function h(v, m, x, S) {
    var b = m !== null ? m.key : null;
    if (typeof x == "string" && x !== "" || typeof x == "number") return b !== null ? null : a(v, m, "" + x, S);
    if (typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Po:
          return x.key === b ? c(v, m, x, S) : null;
        case ml:
          return x.key === b ? u(v, m, x, S) : null;
        case rs:
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
        case Po:
          return v = v.get(S.key === null ? x : S.key) || null, c(m, v, S, b);
        case ml:
          return v = v.get(S.key === null ? x : S.key) || null, u(m, v, S, b);
        case rs:
          var _ = S._init;
          return p(v, m, x, _(S._payload), b);
      }
      if (pi(S) || ti(S)) return v = v.get(x) || null, d(m, v, S, b, null);
      Oo(m, S);
    }
    return null;
  }
  function g(v, m, x, S) {
    for (var b = null, _ = null, k = m, C = m = 0, R = null; k !== null && C < x.length; C++) {
      k.index > C ? (R = k, k = null) : R = k.sibling;
      var D = h(v, k, x[C], S);
      if (D === null) {
        k === null && (k = R);
        break;
      }
      e && k && D.alternate === null && t(v, k), m = i(D, m, C), _ === null ? b = D : _.sibling = D, _ = D, k = R;
    }
    if (C === x.length) return n(v, k), Qe && Ls(v, C), b;
    if (k === null) {
      for (; C < x.length; C++) k = f(v, x[C], S), k !== null && (m = i(k, m, C), _ === null ? b = k : _.sibling = k, _ = k);
      return Qe && Ls(v, C), b;
    }
    for (k = s(v, k); C < x.length; C++) R = p(k, v, C, x[C], S), R !== null && (e && R.alternate !== null && k.delete(R.key === null ? C : R.key), m = i(R, m, C), _ === null ? b = R : _.sibling = R, _ = R);
    return e && k.forEach(function(P) {
      return t(v, P);
    }), Qe && Ls(v, C), b;
  }
  function w(v, m, x, S) {
    var b = ti(x);
    if (typeof b != "function") throw Error(O(150));
    if (x = b.call(x), x == null) throw Error(O(151));
    for (var _ = b = null, k = m, C = m = 0, R = null, D = x.next(); k !== null && !D.done; C++, D = x.next()) {
      k.index > C ? (R = k, k = null) : R = k.sibling;
      var P = h(v, k, D.value, S);
      if (P === null) {
        k === null && (k = R);
        break;
      }
      e && k && P.alternate === null && t(v, k), m = i(P, m, C), _ === null ? b = P : _.sibling = P, _ = P, k = R;
    }
    if (D.done) return n(
      v,
      k
    ), Qe && Ls(v, C), b;
    if (k === null) {
      for (; !D.done; C++, D = x.next()) D = f(v, D.value, S), D !== null && (m = i(D, m, C), _ === null ? b = D : _.sibling = D, _ = D);
      return Qe && Ls(v, C), b;
    }
    for (k = s(v, k); !D.done; C++, D = x.next()) D = p(k, v, C, D.value, S), D !== null && (e && D.alternate !== null && k.delete(D.key === null ? C : D.key), m = i(D, m, C), _ === null ? b = D : _.sibling = D, _ = D);
    return e && k.forEach(function(A) {
      return t(v, A);
    }), Qe && Ls(v, C), b;
  }
  function M(v, m, x, S) {
    if (typeof x == "object" && x !== null && x.type === gl && x.key === null && (x = x.props.children), typeof x == "object" && x !== null) {
      switch (x.$$typeof) {
        case Po:
          e: {
            for (var b = x.key, _ = m; _ !== null; ) {
              if (_.key === b) {
                if (b = x.type, b === gl) {
                  if (_.tag === 7) {
                    n(v, _.sibling), m = l(_, x.props.children), m.return = v, v = m;
                    break e;
                  }
                } else if (_.elementType === b || typeof b == "object" && b !== null && b.$$typeof === rs && xf(b) === _.type) {
                  n(v, _.sibling), m = l(_, x.props), m.ref = oi(v, _, x), m.return = v, v = m;
                  break e;
                }
                n(v, _);
                break;
              } else t(v, _);
              _ = _.sibling;
            }
            x.type === gl ? (m = Hs(x.props.children, v.mode, S, x.key), m.return = v, v = m) : (S = cr(x.type, x.key, x.props, null, v.mode, S), S.ref = oi(v, m, x), S.return = v, v = S);
          }
          return o(v);
        case ml:
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
          return o(v);
        case rs:
          return _ = x._init, M(v, m, _(x._payload), S);
      }
      if (pi(x)) return g(v, m, x, S);
      if (ti(x)) return w(v, m, x, S);
      Oo(v, x);
    }
    return typeof x == "string" && x !== "" || typeof x == "number" ? (x = "" + x, m !== null && m.tag === 6 ? (n(v, m.sibling), m = l(m, x), m.return = v, v = m) : (n(v, m), m = rc(x, v.mode, S), m.return = v, v = m), o(v)) : n(v, m);
  }
  return M;
}
var Yl = og(!0), rg = og(!1), Cr = ks(null), jr = null, _l = null, id = null;
function od() {
  id = _l = jr = null;
}
function rd(e) {
  var t = Cr.current;
  Ue(Cr), e._currentValue = t;
}
function cu(e, t, n) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Il(e, t) {
  jr = e, id = _l = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Ht = !0), e.firstContext = null);
}
function yn(e) {
  var t = e._currentValue;
  if (id !== e) if (e = { context: e, memoizedValue: t, next: null }, _l === null) {
    if (jr === null) throw Error(O(308));
    _l = e, jr.dependencies = { lanes: 0, firstContext: e };
  } else _l = _l.next = e;
  return t;
}
var Xs = null;
function ad(e) {
  Xs === null ? Xs = [e] : Xs.push(e);
}
function ag(e, t, n, s) {
  var l = t.interleaved;
  return l === null ? (n.next = n, ad(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Kn(e, s);
}
function Kn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var as = !1;
function cd(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function cg(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Wn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vs(e, t, n) {
  var s = e.updateQueue;
  if (s === null) return null;
  if (s = s.shared, Te & 2) {
    var l = s.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), s.pending = t, Kn(e, n);
  }
  return l = s.interleaved, l === null ? (t.next = t, ad(s)) : (t.next = l.next, l.next = t), s.interleaved = t, Kn(e, n);
}
function sr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Ku(e, n);
  }
}
function yf(e, t) {
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
function Pr(e, t, n, s) {
  var l = e.updateQueue;
  as = !1;
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
              f = tt({}, f, h);
              break e;
            case 2:
              as = !0;
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
    Ks |= o, e.lanes = o, e.memoizedState = f;
  }
}
function vf(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var s = e[t], l = s.callback;
    if (l !== null) {
      if (s.callback = null, s = n, typeof l != "function") throw Error(O(191, l));
      l.call(s);
    }
  }
}
var Qi = {}, Bn = ks(Qi), Oi = ks(Qi), Fi = ks(Qi);
function Os(e) {
  if (e === Qi) throw Error(O(174));
  return e;
}
function ud(e, t) {
  switch (Oe(Fi, t), Oe(Oi, e), Oe(Bn, Qi), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Hc(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Hc(t, e);
  }
  Ue(Bn), Oe(Bn, t);
}
function Xl() {
  Ue(Bn), Ue(Oi), Ue(Fi);
}
function ug(e) {
  Os(Fi.current);
  var t = Os(Bn.current), n = Hc(t, e.type);
  t !== n && (Oe(Oi, e), Oe(Bn, n));
}
function dd(e) {
  Oi.current === e && (Ue(Bn), Ue(Oi));
}
var Je = ks(0);
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
var tc = [];
function hd() {
  for (var e = 0; e < tc.length; e++) tc[e]._workInProgressVersionPrimary = null;
  tc.length = 0;
}
var lr = Zn.ReactCurrentDispatcher, nc = Zn.ReactCurrentBatchConfig, Vs = 0, et = null, ht = null, xt = null, Ir = !1, bi = !1, zi = 0, M0 = 0;
function Tt() {
  throw Error(O(321));
}
function fd(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Nn(e[n], t[n])) return !1;
  return !0;
}
function pd(e, t, n, s, l, i) {
  if (Vs = i, et = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, lr.current = e === null || e.memoizedState === null ? k0 : C0, e = n(s, l), bi) {
    i = 0;
    do {
      if (bi = !1, zi = 0, 25 <= i) throw Error(O(301));
      i += 1, xt = ht = null, t.updateQueue = null, lr.current = j0, e = n(s, l);
    } while (bi);
  }
  if (lr.current = Er, t = ht !== null && ht.next !== null, Vs = 0, xt = ht = et = null, Ir = !1, t) throw Error(O(300));
  return e;
}
function md() {
  var e = zi !== 0;
  return zi = 0, e;
}
function Rn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return xt === null ? et.memoizedState = xt = e : xt = xt.next = e, xt;
}
function vn() {
  if (ht === null) {
    var e = et.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ht.next;
  var t = xt === null ? et.memoizedState : xt.next;
  if (t !== null) xt = t, ht = e;
  else {
    if (e === null) throw Error(O(310));
    ht = e, e = { memoizedState: ht.memoizedState, baseState: ht.baseState, baseQueue: ht.baseQueue, queue: ht.queue, next: null }, xt === null ? et.memoizedState = xt = e : xt = xt.next = e;
  }
  return xt;
}
function Hi(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function sc(e) {
  var t = vn(), n = t.queue;
  if (n === null) throw Error(O(311));
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
      if ((Vs & d) === d) c !== null && (c = c.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), s = u.hasEagerState ? u.eagerState : e(s, u.action);
      else {
        var f = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        c === null ? (a = c = f, o = s) : c = c.next = f, et.lanes |= d, Ks |= d;
      }
      u = u.next;
    } while (u !== null && u !== i);
    c === null ? o = s : c.next = a, Nn(s, t.memoizedState) || (Ht = !0), t.memoizedState = s, t.baseState = o, t.baseQueue = c, n.lastRenderedState = s;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, et.lanes |= i, Ks |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function lc(e) {
  var t = vn(), n = t.queue;
  if (n === null) throw Error(O(311));
  n.lastRenderedReducer = e;
  var s = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var o = l = l.next;
    do
      i = e(i, o.action), o = o.next;
    while (o !== l);
    Nn(i, t.memoizedState) || (Ht = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, s];
}
function dg() {
}
function hg(e, t) {
  var n = et, s = vn(), l = t(), i = !Nn(s.memoizedState, l);
  if (i && (s.memoizedState = l, Ht = !0), s = s.queue, gd(mg.bind(null, n, s, e), [e]), s.getSnapshot !== t || i || xt !== null && xt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Wi(9, pg.bind(null, n, s, l, t), void 0, null), yt === null) throw Error(O(349));
    Vs & 30 || fg(n, t, l);
  }
  return l;
}
function fg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = et.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, et.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function pg(e, t, n, s) {
  t.value = n, t.getSnapshot = s, gg(t) && xg(e);
}
function mg(e, t, n) {
  return n(function() {
    gg(t) && xg(e);
  });
}
function gg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Nn(e, n);
  } catch {
    return !0;
  }
}
function xg(e) {
  var t = Kn(e, 1);
  t !== null && Pn(t, e, 1, -1);
}
function wf(e) {
  var t = Rn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Hi, lastRenderedState: e }, t.queue = e, e = e.dispatch = T0.bind(null, et, e), [t.memoizedState, e];
}
function Wi(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = et.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, et.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function yg() {
  return vn().memoizedState;
}
function ir(e, t, n, s) {
  var l = Rn();
  et.flags |= e, l.memoizedState = Wi(1 | t, n, void 0, s === void 0 ? null : s);
}
function ta(e, t, n, s) {
  var l = vn();
  s = s === void 0 ? null : s;
  var i = void 0;
  if (ht !== null) {
    var o = ht.memoizedState;
    if (i = o.destroy, s !== null && fd(s, o.deps)) {
      l.memoizedState = Wi(t, n, i, s);
      return;
    }
  }
  et.flags |= e, l.memoizedState = Wi(1 | t, n, i, s);
}
function Sf(e, t) {
  return ir(8390656, 8, e, t);
}
function gd(e, t) {
  return ta(2048, 8, e, t);
}
function vg(e, t) {
  return ta(4, 2, e, t);
}
function wg(e, t) {
  return ta(4, 4, e, t);
}
function Sg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Mg(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ta(4, 4, Sg.bind(null, t, e), n);
}
function xd() {
}
function bg(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && fd(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function _g(e, t) {
  var n = vn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && fd(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Tg(e, t, n) {
  return Vs & 21 ? (Nn(n, t) || (n = Nm(), et.lanes |= n, Ks |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Ht = !0), e.memoizedState = n);
}
function b0(e, t) {
  var n = De;
  De = n !== 0 && 4 > n ? n : 4, e(!0);
  var s = nc.transition;
  nc.transition = {};
  try {
    e(!1), t();
  } finally {
    De = n, nc.transition = s;
  }
}
function kg() {
  return vn().memoizedState;
}
function _0(e, t, n) {
  var s = Ss(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, Cg(e)) jg(t, n);
  else if (n = ag(e, t, n, s), n !== null) {
    var l = At();
    Pn(n, e, s, l), Pg(n, t, s);
  }
}
function T0(e, t, n) {
  var s = Ss(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Cg(e)) jg(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var o = t.lastRenderedState, a = i(o, n);
      if (l.hasEagerState = !0, l.eagerState = a, Nn(a, o)) {
        var c = t.interleaved;
        c === null ? (l.next = l, ad(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = ag(e, t, l, s), n !== null && (l = At(), Pn(n, e, s, l), Pg(n, t, s));
  }
}
function Cg(e) {
  var t = e.alternate;
  return e === et || t !== null && t === et;
}
function jg(e, t) {
  bi = Ir = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Pg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Ku(e, n);
  }
}
var Er = { readContext: yn, useCallback: Tt, useContext: Tt, useEffect: Tt, useImperativeHandle: Tt, useInsertionEffect: Tt, useLayoutEffect: Tt, useMemo: Tt, useReducer: Tt, useRef: Tt, useState: Tt, useDebugValue: Tt, useDeferredValue: Tt, useTransition: Tt, useMutableSource: Tt, useSyncExternalStore: Tt, useId: Tt, unstable_isNewReconciler: !1 }, k0 = { readContext: yn, useCallback: function(e, t) {
  return Rn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: yn, useEffect: Sf, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ir(
    4194308,
    4,
    Sg.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ir(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ir(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Rn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var s = Rn();
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = _0.bind(null, et, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = Rn();
  return e = { current: e }, t.memoizedState = e;
}, useState: wf, useDebugValue: xd, useDeferredValue: function(e) {
  return Rn().memoizedState = e;
}, useTransition: function() {
  var e = wf(!1), t = e[0];
  return e = b0.bind(null, e[1]), Rn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = et, l = Rn();
  if (Qe) {
    if (n === void 0) throw Error(O(407));
    n = n();
  } else {
    if (n = t(), yt === null) throw Error(O(349));
    Vs & 30 || fg(s, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Sf(mg.bind(
    null,
    s,
    i,
    e
  ), [e]), s.flags |= 2048, Wi(9, pg.bind(null, s, i, n, t), void 0, null), n;
}, useId: function() {
  var e = Rn(), t = yt.identifierPrefix;
  if (Qe) {
    var n = Hn, s = zn;
    n = (s & ~(1 << 32 - jn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = zi++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = M0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, C0 = {
  readContext: yn,
  useCallback: bg,
  useContext: yn,
  useEffect: gd,
  useImperativeHandle: Mg,
  useInsertionEffect: vg,
  useLayoutEffect: wg,
  useMemo: _g,
  useReducer: sc,
  useRef: yg,
  useState: function() {
    return sc(Hi);
  },
  useDebugValue: xd,
  useDeferredValue: function(e) {
    var t = vn();
    return Tg(t, ht.memoizedState, e);
  },
  useTransition: function() {
    var e = sc(Hi)[0], t = vn().memoizedState;
    return [e, t];
  },
  useMutableSource: dg,
  useSyncExternalStore: hg,
  useId: kg,
  unstable_isNewReconciler: !1
}, j0 = { readContext: yn, useCallback: bg, useContext: yn, useEffect: gd, useImperativeHandle: Mg, useInsertionEffect: vg, useLayoutEffect: wg, useMemo: _g, useReducer: lc, useRef: yg, useState: function() {
  return lc(Hi);
}, useDebugValue: xd, useDeferredValue: function(e) {
  var t = vn();
  return ht === null ? t.memoizedState = e : Tg(t, ht.memoizedState, e);
}, useTransition: function() {
  var e = lc(Hi)[0], t = vn().memoizedState;
  return [e, t];
}, useMutableSource: dg, useSyncExternalStore: hg, useId: kg, unstable_isNewReconciler: !1 };
function _n(e, t) {
  if (e && e.defaultProps) {
    t = tt({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function uu(e, t, n, s) {
  t = e.memoizedState, n = n(s, t), n = n == null ? t : tt({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var na = { isMounted: function(e) {
  return (e = e._reactInternals) ? el(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var s = At(), l = Ss(e), i = Wn(s, l);
  i.payload = t, n != null && (i.callback = n), t = vs(e, i, l), t !== null && (Pn(t, e, l, s), sr(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var s = At(), l = Ss(e), i = Wn(s, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = vs(e, i, l), t !== null && (Pn(t, e, l, s), sr(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = At(), s = Ss(e), l = Wn(n, s);
  l.tag = 2, t != null && (l.callback = t), t = vs(e, l, s), t !== null && (Pn(t, e, s, n), sr(t, e, s));
} };
function Mf(e, t, n, s, l, i, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, i, o) : t.prototype && t.prototype.isPureReactComponent ? !Di(n, s) || !Di(l, i) : !0;
}
function Ng(e, t, n) {
  var s = !1, l = _s, i = t.contextType;
  return typeof i == "object" && i !== null ? i = yn(i) : (l = Vt(t) ? Us : Pt.current, s = t.contextTypes, i = (s = s != null) ? Dl(e, l) : _s), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = na, e.stateNode = t, t._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function bf(e, t, n, s) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, s), t.state !== e && na.enqueueReplaceState(t, t.state, null);
}
function du(e, t, n, s) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, cd(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = yn(i) : (i = Vt(t) ? Us : Pt.current, l.context = Dl(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (uu(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && na.enqueueReplaceState(l, l.state, null), Pr(e, n, l, s), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Ol(e, t) {
  try {
    var n = "", s = t;
    do
      n += nv(s), s = s.return;
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
var P0 = typeof WeakMap == "function" ? WeakMap : Map;
function Ig(e, t, n) {
  n = Wn(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    Ar || (Ar = !0, Mu = s), hu(e, t);
  }, n;
}
function Eg(e, t, n) {
  n = Wn(-1, n), n.tag = 3;
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
    hu(e, t), typeof s != "function" && (ws === null ? ws = /* @__PURE__ */ new Set([this]) : ws.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function _f(e, t, n) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new P0();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = H0.bind(null, e, t, n), t.then(e, e));
}
function Tf(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function kf(e, t, n, s, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Wn(-1, 1), t.tag = 2, vs(n, t, 1))), n.lanes |= 1), e);
}
var N0 = Zn.ReactCurrentOwner, Ht = !1;
function Rt(e, t, n, s) {
  t.child = e === null ? rg(t, null, n, s) : Yl(t, e.child, n, s);
}
function Cf(e, t, n, s, l) {
  n = n.render;
  var i = t.ref;
  return Il(t, l), s = pd(e, t, n, s, i, l), n = md(), e !== null && !Ht ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Gn(e, t, l)) : (Qe && n && nd(t), t.flags |= 1, Rt(e, t, s, l), t.child);
}
function jf(e, t, n, s, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Td(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, Rg(e, t, i, s, l)) : (e = cr(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var o = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Di, n(o, s) && e.ref === t.ref) return Gn(e, t, l);
  }
  return t.flags |= 1, e = Ms(i, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Rg(e, t, n, s, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Di(i, s) && e.ref === t.ref) if (Ht = !1, t.pendingProps = s = i, (e.lanes & l) !== 0) e.flags & 131072 && (Ht = !0);
    else return t.lanes = e.lanes, Gn(e, t, l);
  }
  return fu(e, t, n, s, l);
}
function Ag(e, t, n) {
  var s = t.pendingProps, l = s.children, i = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Oe(kl, Qt), Qt |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Oe(kl, Qt), Qt |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = i !== null ? i.baseLanes : n, Oe(kl, Qt), Qt |= s;
  }
  else i !== null ? (s = i.baseLanes | n, t.memoizedState = null) : s = n, Oe(kl, Qt), Qt |= s;
  return Rt(e, t, l, n), t.child;
}
function Lg(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function fu(e, t, n, s, l) {
  var i = Vt(n) ? Us : Pt.current;
  return i = Dl(t, i), Il(t, l), n = pd(e, t, n, s, i, l), s = md(), e !== null && !Ht ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Gn(e, t, l)) : (Qe && s && nd(t), t.flags |= 1, Rt(e, t, n, l), t.child);
}
function Pf(e, t, n, s, l) {
  if (Vt(n)) {
    var i = !0;
    _r(t);
  } else i = !1;
  if (Il(t, l), t.stateNode === null) or(e, t), Ng(t, n, s), du(t, n, s, l), s = !0;
  else if (e === null) {
    var o = t.stateNode, a = t.memoizedProps;
    o.props = a;
    var c = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = yn(u) : (u = Vt(n) ? Us : Pt.current, u = Dl(t, u));
    var d = n.getDerivedStateFromProps, f = typeof d == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    f || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== s || c !== u) && bf(t, o, s, u), as = !1;
    var h = t.memoizedState;
    o.state = h, Pr(t, s, o, l), c = t.memoizedState, a !== s || h !== c || $t.current || as ? (typeof d == "function" && (uu(t, n, d, s), c = t.memoizedState), (a = as || Mf(t, n, a, s, h, c, u)) ? (f || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = c), o.props = s, o.state = c, o.context = u, s = a) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), s = !1);
  } else {
    o = t.stateNode, cg(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : _n(t.type, a), o.props = u, f = t.pendingProps, h = o.context, c = n.contextType, typeof c == "object" && c !== null ? c = yn(c) : (c = Vt(n) ? Us : Pt.current, c = Dl(t, c));
    var p = n.getDerivedStateFromProps;
    (d = typeof p == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (a !== f || h !== c) && bf(t, o, s, c), as = !1, h = t.memoizedState, o.state = h, Pr(t, s, o, l);
    var g = t.memoizedState;
    a !== f || h !== g || $t.current || as ? (typeof p == "function" && (uu(t, n, p, s), g = t.memoizedState), (u = as || Mf(t, n, u, s, h, g, c) || !1) ? (d || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(s, g, c), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(s, g, c)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = g), o.props = s, o.state = g, o.context = c, s = u) : (typeof o.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return pu(e, t, n, s, i, l);
}
function pu(e, t, n, s, l, i) {
  Lg(e, t);
  var o = (t.flags & 128) !== 0;
  if (!s && !o) return l && pf(t, n, !1), Gn(e, t, i);
  s = t.stateNode, N0.current = t;
  var a = o && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && o ? (t.child = Yl(t, e.child, null, i), t.child = Yl(t, null, a, i)) : Rt(e, t, a, i), t.memoizedState = s.state, l && pf(t, n, !0), t.child;
}
function Dg(e) {
  var t = e.stateNode;
  t.pendingContext ? ff(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ff(e, t.context, !1), ud(e, t.containerInfo);
}
function Nf(e, t, n, s, l) {
  return Bl(), ld(l), t.flags |= 256, Rt(e, t, n, s), t.child;
}
var mu = { dehydrated: null, treeContext: null, retryLane: 0 };
function gu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Bg(e, t, n) {
  var s = t.pendingProps, l = Je.current, i = !1, o = (t.flags & 128) !== 0, a;
  if ((a = o) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Oe(Je, l & 1), e === null)
    return au(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = s.children, e = s.fallback, i ? (s = t.mode, i = t.child, o = { mode: "hidden", children: o }, !(s & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = o) : i = ia(o, s, 0, null), e = Hs(e, s, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = gu(n), t.memoizedState = mu, e) : yd(t, o));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return I0(e, t, o, s, a, l, n);
  if (i) {
    i = s.fallback, o = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: s.children };
    return !(o & 1) && t.child !== l ? (s = t.child, s.childLanes = 0, s.pendingProps = c, t.deletions = null) : (s = Ms(l, c), s.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? i = Ms(a, i) : (i = Hs(i, o, n, null), i.flags |= 2), i.return = t, s.return = t, s.sibling = i, t.child = s, s = i, i = t.child, o = e.child.memoizedState, o = o === null ? gu(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, i.memoizedState = o, i.childLanes = e.childLanes & ~n, t.memoizedState = mu, s;
  }
  return i = e.child, e = i.sibling, s = Ms(i, { mode: "visible", children: s.children }), !(t.mode & 1) && (s.lanes = n), s.return = t, s.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = s, t.memoizedState = null, s;
}
function yd(e, t) {
  return t = ia({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Fo(e, t, n, s) {
  return s !== null && ld(s), Yl(t, e.child, null, n), e = yd(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function I0(e, t, n, s, l, i, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, s = ic(Error(O(422))), Fo(e, t, o, s)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = s.fallback, l = t.mode, s = ia({ mode: "visible", children: s.children }, l, 0, null), i = Hs(i, l, o, null), i.flags |= 2, s.return = t, i.return = t, s.sibling = i, t.child = s, t.mode & 1 && Yl(t, e.child, null, o), t.child.memoizedState = gu(o), t.memoizedState = mu, i);
  if (!(t.mode & 1)) return Fo(e, t, o, null);
  if (l.data === "$!") {
    if (s = l.nextSibling && l.nextSibling.dataset, s) var a = s.dgst;
    return s = a, i = Error(O(419)), s = ic(i, s, void 0), Fo(e, t, o, s);
  }
  if (a = (o & e.childLanes) !== 0, Ht || a) {
    if (s = yt, s !== null) {
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
      l = l & (s.suspendedLanes | o) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, Kn(e, l), Pn(s, e, l, -1));
    }
    return _d(), s = ic(Error(O(421))), Fo(e, t, o, s);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = W0.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, qt = ys(l.nextSibling), Jt = t, Qe = !0, Cn = null, e !== null && (dn[hn++] = zn, dn[hn++] = Hn, dn[hn++] = $s, zn = e.id, Hn = e.overflow, $s = t), t = yd(t, s.children), t.flags |= 4096, t);
}
function If(e, t, n) {
  e.lanes |= t;
  var s = e.alternate;
  s !== null && (s.lanes |= t), cu(e.return, t, n);
}
function oc(e, t, n, s, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: s, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = s, i.tail = n, i.tailMode = l);
}
function Yg(e, t, n) {
  var s = t.pendingProps, l = s.revealOrder, i = s.tail;
  if (Rt(e, t, s.children, n), s = Je.current, s & 2) s = s & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && If(e, n, t);
      else if (e.tag === 19) If(e, n, t);
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
  if (Oe(Je, s), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && Nr(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), oc(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && Nr(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      oc(t, !0, n, null, i);
      break;
    case "together":
      oc(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function or(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Gn(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ks |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(O(153));
  if (t.child !== null) {
    for (e = t.child, n = Ms(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ms(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function E0(e, t, n) {
  switch (t.tag) {
    case 3:
      Dg(t), Bl();
      break;
    case 5:
      ug(t);
      break;
    case 1:
      Vt(t.type) && _r(t);
      break;
    case 4:
      ud(t, t.stateNode.containerInfo);
      break;
    case 10:
      var s = t.type._context, l = t.memoizedProps.value;
      Oe(Cr, s._currentValue), s._currentValue = l;
      break;
    case 13:
      if (s = t.memoizedState, s !== null)
        return s.dehydrated !== null ? (Oe(Je, Je.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Bg(e, t, n) : (Oe(Je, Je.current & 1), e = Gn(e, t, n), e !== null ? e.sibling : null);
      Oe(Je, Je.current & 1);
      break;
    case 19:
      if (s = (n & t.childLanes) !== 0, e.flags & 128) {
        if (s) return Yg(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Oe(Je, Je.current), s) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Ag(e, t, n);
  }
  return Gn(e, t, n);
}
var Xg, xu, Og, Fg;
Xg = function(e, t) {
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
Og = function(e, t, n, s) {
  var l = e.memoizedProps;
  if (l !== s) {
    e = t.stateNode, Os(Bn.current);
    var i = null;
    switch (n) {
      case "input":
        l = Xc(e, l), s = Xc(e, s), i = [];
        break;
      case "select":
        l = tt({}, l, { value: void 0 }), s = tt({}, s, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = zc(e, l), s = zc(e, s), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof s.onClick == "function" && (e.onclick = Mr);
    }
    Wc(n, s);
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
      else u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (i = i || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (i = i || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Pi.hasOwnProperty(u) ? (c != null && u === "onScroll" && We("scroll", e), i || a === c || (i = [])) : (i = i || []).push(u, c));
    }
    n && (i = i || []).push("style", n);
    var u = i;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Fg = function(e, t, n, s) {
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
function R0(e, t, n) {
  var s = t.pendingProps;
  switch (sd(t), t.tag) {
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
      return Vt(t.type) && br(), kt(t), null;
    case 3:
      return s = t.stateNode, Xl(), Ue($t), Ue(Pt), hd(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Xo(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Cn !== null && (Tu(Cn), Cn = null))), xu(e, t), kt(t), null;
    case 5:
      dd(t);
      var l = Os(Fi.current);
      if (n = t.type, e !== null && t.stateNode != null) Og(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!s) {
          if (t.stateNode === null) throw Error(O(166));
          return kt(t), null;
        }
        if (e = Os(Bn.current), Xo(t)) {
          s = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (s[Ln] = t, s[Xi] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              We("cancel", s), We("close", s);
              break;
            case "iframe":
            case "object":
            case "embed":
              We("load", s);
              break;
            case "video":
            case "audio":
              for (l = 0; l < gi.length; l++) We(gi[l], s);
              break;
            case "source":
              We("error", s);
              break;
            case "img":
            case "image":
            case "link":
              We(
                "error",
                s
              ), We("load", s);
              break;
            case "details":
              We("toggle", s);
              break;
            case "input":
              Xh(s, i), We("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!i.multiple }, We("invalid", s);
              break;
            case "textarea":
              Fh(s, i), We("invalid", s);
          }
          Wc(n, i), l = null;
          for (var o in i) if (i.hasOwnProperty(o)) {
            var a = i[o];
            o === "children" ? typeof a == "string" ? s.textContent !== a && (i.suppressHydrationWarning !== !0 && Yo(s.textContent, a, e), l = ["children", a]) : typeof a == "number" && s.textContent !== "" + a && (i.suppressHydrationWarning !== !0 && Yo(
              s.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Pi.hasOwnProperty(o) && a != null && o === "onScroll" && We("scroll", s);
          }
          switch (n) {
            case "input":
              No(s), Oh(s, i, !0);
              break;
            case "textarea":
              No(s), zh(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (s.onclick = Mr);
          }
          s = l, t.updateQueue = s, s !== null && (t.flags |= 4);
        } else {
          o = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = mm(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = o.createElement(n, { is: s.is }) : (e = o.createElement(n), n === "select" && (o = e, s.multiple ? o.multiple = !0 : s.size && (o.size = s.size))) : e = o.createElementNS(e, n), e[Ln] = t, e[Xi] = s, Xg(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Uc(n, s), n) {
              case "dialog":
                We("cancel", e), We("close", e), l = s;
                break;
              case "iframe":
              case "object":
              case "embed":
                We("load", e), l = s;
                break;
              case "video":
              case "audio":
                for (l = 0; l < gi.length; l++) We(gi[l], e);
                l = s;
                break;
              case "source":
                We("error", e), l = s;
                break;
              case "img":
              case "image":
              case "link":
                We(
                  "error",
                  e
                ), We("load", e), l = s;
                break;
              case "details":
                We("toggle", e), l = s;
                break;
              case "input":
                Xh(e, s), l = Xc(e, s), We("invalid", e);
                break;
              case "option":
                l = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, l = tt({}, s, { value: void 0 }), We("invalid", e);
                break;
              case "textarea":
                Fh(e, s), l = zc(e, s), We("invalid", e);
                break;
              default:
                l = s;
            }
            Wc(n, l), a = l;
            for (i in a) if (a.hasOwnProperty(i)) {
              var c = a[i];
              i === "style" ? ym(e, c) : i === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && gm(e, c)) : i === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && Ni(e, c) : typeof c == "number" && Ni(e, "" + c) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Pi.hasOwnProperty(i) ? c != null && i === "onScroll" && We("scroll", e) : c != null && zu(e, i, c, o));
            }
            switch (n) {
              case "input":
                No(e), Oh(e, s, !1);
                break;
              case "textarea":
                No(e), zh(e);
                break;
              case "option":
                s.value != null && e.setAttribute("value", "" + bs(s.value));
                break;
              case "select":
                e.multiple = !!s.multiple, i = s.value, i != null ? Cl(e, !!s.multiple, i, !1) : s.defaultValue != null && Cl(
                  e,
                  !!s.multiple,
                  s.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = Mr);
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
      if (e && t.stateNode != null) Fg(e, t, e.memoizedProps, s);
      else {
        if (typeof s != "string" && t.stateNode === null) throw Error(O(166));
        if (n = Os(Fi.current), Os(Bn.current), Xo(t)) {
          if (s = t.stateNode, n = t.memoizedProps, s[Ln] = t, (i = s.nodeValue !== n) && (e = Jt, e !== null)) switch (e.tag) {
            case 3:
              Yo(s.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Yo(s.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else s = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(s), s[Ln] = t, t.stateNode = s;
      }
      return kt(t), null;
    case 13:
      if (Ue(Je), s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Qe && qt !== null && t.mode & 1 && !(t.flags & 128)) ig(), Bl(), t.flags |= 98560, i = !1;
        else if (i = Xo(t), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(O(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(O(317));
            i[Ln] = t;
          } else Bl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          kt(t), i = !1;
        } else Cn !== null && (Tu(Cn), Cn = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (t.child.flags |= 8192, t.mode & 1 && (e === null || Je.current & 1 ? ft === 0 && (ft = 3) : _d())), t.updateQueue !== null && (t.flags |= 4), kt(t), null);
    case 4:
      return Xl(), xu(e, t), e === null && Bi(t.stateNode.containerInfo), kt(t), null;
    case 10:
      return rd(t.type._context), kt(t), null;
    case 17:
      return Vt(t.type) && br(), kt(t), null;
    case 19:
      if (Ue(Je), i = t.memoizedState, i === null) return kt(t), null;
      if (s = (t.flags & 128) !== 0, o = i.rendering, o === null) if (s) ri(i, !1);
      else {
        if (ft !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Nr(e), o !== null) {
            for (t.flags |= 128, ri(i, !1), s = o.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), t.subtreeFlags = 0, s = n, n = t.child; n !== null; ) i = n, e = s, i.flags &= 14680066, o = i.alternate, o === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = o.childLanes, i.lanes = o.lanes, i.child = o.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = o.memoizedProps, i.memoizedState = o.memoizedState, i.updateQueue = o.updateQueue, i.type = o.type, e = o.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Oe(Je, Je.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && it() > Fl && (t.flags |= 128, s = !0, ri(i, !1), t.lanes = 4194304);
      }
      else {
        if (!s) if (e = Nr(o), e !== null) {
          if (t.flags |= 128, s = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), ri(i, !0), i.tail === null && i.tailMode === "hidden" && !o.alternate && !Qe) return kt(t), null;
        } else 2 * it() - i.renderingStartTime > Fl && n !== 1073741824 && (t.flags |= 128, s = !0, ri(i, !1), t.lanes = 4194304);
        i.isBackwards ? (o.sibling = t.child, t.child = o) : (n = i.last, n !== null ? n.sibling = o : t.child = o, i.last = o);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = it(), t.sibling = null, n = Je.current, Oe(Je, s ? n & 1 | 2 : n & 1), t) : (kt(t), null);
    case 22:
    case 23:
      return bd(), s = t.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (t.flags |= 8192), s && t.mode & 1 ? Qt & 1073741824 && (kt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : kt(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(O(156, t.tag));
}
function A0(e, t) {
  switch (sd(t), t.tag) {
    case 1:
      return Vt(t.type) && br(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Xl(), Ue($t), Ue(Pt), hd(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return dd(t), null;
    case 13:
      if (Ue(Je), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(O(340));
        Bl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Ue(Je), null;
    case 4:
      return Xl(), null;
    case 10:
      return rd(t.type._context), null;
    case 22:
    case 23:
      return bd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var zo = !1, Ct = !1, L0 = typeof WeakSet == "function" ? WeakSet : Set, q = null;
function Tl(e, t) {
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
var Ef = !1;
function D0(e, t) {
  if (tu = vr, e = $m(), td(e)) {
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
  for (nu = { focusedElem: e, selectionRange: n }, vr = !1, q = t; q !== null; ) if (t = q, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, q = e;
  else for (; q !== null; ) {
    t = q;
    try {
      var g = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (g !== null) {
            var w = g.memoizedProps, M = g.memoizedState, v = t.stateNode, m = v.getSnapshotBeforeUpdate(t.elementType === t.type ? w : _n(t.type, w), M);
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
          throw Error(O(163));
      }
    } catch (S) {
      nt(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, q = e;
      break;
    }
    q = t.return;
  }
  return g = Ef, Ef = !1, g;
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
function zg(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, zg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ln], delete t[Xi], delete t[iu], delete t[y0], delete t[v0])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Hg(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Rf(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Hg(e.return)) return null;
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
  if (s === 5 || s === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Mr));
  else if (s !== 4 && (e = e.child, e !== null)) for (wu(e, t, n), e = e.sibling; e !== null; ) wu(e, t, n), e = e.sibling;
}
function Su(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null)) for (Su(e, t, n), e = e.sibling; e !== null; ) Su(e, t, n), e = e.sibling;
}
var vt = null, Tn = !1;
function ss(e, t, n) {
  for (n = n.child; n !== null; ) Wg(e, t, n), n = n.sibling;
}
function Wg(e, t, n) {
  if (Dn && typeof Dn.onCommitFiberUnmount == "function") try {
    Dn.onCommitFiberUnmount(Gr, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      Ct || Tl(n, t);
    case 6:
      var s = vt, l = Tn;
      vt = null, ss(e, t, n), vt = s, Tn = l, vt !== null && (Tn ? (e = vt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : vt.removeChild(n.stateNode));
      break;
    case 18:
      vt !== null && (Tn ? (e = vt, n = n.stateNode, e.nodeType === 8 ? Ja(e.parentNode, n) : e.nodeType === 1 && Ja(e, n), Ai(e)) : Ja(vt, n.stateNode));
      break;
    case 4:
      s = vt, l = Tn, vt = n.stateNode.containerInfo, Tn = !0, ss(e, t, n), vt = s, Tn = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!Ct && (s = n.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        l = s = s.next;
        do {
          var i = l, o = i.destroy;
          i = i.tag, o !== void 0 && (i & 2 || i & 4) && yu(n, t, o), l = l.next;
        } while (l !== s);
      }
      ss(e, t, n);
      break;
    case 1:
      if (!Ct && (Tl(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function")) try {
        s.props = n.memoizedProps, s.state = n.memoizedState, s.componentWillUnmount();
      } catch (a) {
        nt(n, t, a);
      }
      ss(e, t, n);
      break;
    case 21:
      ss(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (Ct = (s = Ct) || n.memoizedState !== null, ss(e, t, n), Ct = s) : ss(e, t, n);
      break;
    default:
      ss(e, t, n);
  }
}
function Af(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new L0()), t.forEach(function(s) {
      var l = U0.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(l, l));
    });
  }
}
function Mn(e, t) {
  var n = t.deletions;
  if (n !== null) for (var s = 0; s < n.length; s++) {
    var l = n[s];
    try {
      var i = e, o = t, a = o;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            vt = a.stateNode, Tn = !1;
            break e;
          case 3:
            vt = a.stateNode.containerInfo, Tn = !0;
            break e;
          case 4:
            vt = a.stateNode.containerInfo, Tn = !0;
            break e;
        }
        a = a.return;
      }
      if (vt === null) throw Error(O(160));
      Wg(i, o, l), vt = null, Tn = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (u) {
      nt(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ug(t, e), t = t.sibling;
}
function Ug(e, t) {
  var n = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Mn(t, e), En(e), s & 4) {
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
      Mn(t, e), En(e), s & 512 && n !== null && Tl(n, n.return);
      break;
    case 5:
      if (Mn(t, e), En(e), s & 512 && n !== null && Tl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Ni(l, "");
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, o = n !== null ? n.memoizedProps : i, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && i.type === "radio" && i.name != null && fm(l, i), Uc(a, o);
          var u = Uc(a, i);
          for (o = 0; o < c.length; o += 2) {
            var d = c[o], f = c[o + 1];
            d === "style" ? ym(l, f) : d === "dangerouslySetInnerHTML" ? gm(l, f) : d === "children" ? Ni(l, f) : zu(l, d, f, u);
          }
          switch (a) {
            case "input":
              Oc(l, i);
              break;
            case "textarea":
              pm(l, i);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var p = i.value;
              p != null ? Cl(l, !!i.multiple, p, !1) : h !== !!i.multiple && (i.defaultValue != null ? Cl(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : Cl(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[Xi] = i;
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      break;
    case 6:
      if (Mn(t, e), En(e), s & 4) {
        if (e.stateNode === null) throw Error(O(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (w) {
          nt(e, e.return, w);
        }
      }
      break;
    case 3:
      if (Mn(t, e), En(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Ai(t.containerInfo);
      } catch (w) {
        nt(e, e.return, w);
      }
      break;
    case 4:
      Mn(t, e), En(e);
      break;
    case 13:
      Mn(t, e), En(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Sd = it())), s & 4 && Af(e);
      break;
    case 22:
      if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (Ct = (u = Ct) || d, Mn(t, e), Ct = u) : Mn(t, e), En(e), s & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (q = e, d = e.child; d !== null; ) {
          for (f = q = d; q !== null; ) {
            switch (h = q, p = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                _i(4, h, h.return);
                break;
              case 1:
                Tl(h, h.return);
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
                Tl(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Df(f);
                  continue;
                }
            }
            p !== null ? (p.return = h, q = p) : Df(f);
          }
          d = d.sibling;
        }
        e: for (d = null, f = e; ; ) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                l = f.stateNode, u ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (a = f.stateNode, c = f.memoizedProps.style, o = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = xm("display", o));
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
      Mn(t, e), En(e), s & 4 && Af(e);
      break;
    case 21:
      break;
    default:
      Mn(
        t,
        e
      ), En(e);
  }
}
function En(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Hg(n)) {
            var s = n;
            break e;
          }
          n = n.return;
        }
        throw Error(O(160));
      }
      switch (s.tag) {
        case 5:
          var l = s.stateNode;
          s.flags & 32 && (Ni(l, ""), s.flags &= -33);
          var i = Rf(e);
          Su(e, i, l);
          break;
        case 3:
        case 4:
          var o = s.stateNode.containerInfo, a = Rf(e);
          wu(e, a, o);
          break;
        default:
          throw Error(O(161));
      }
    } catch (c) {
      nt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function B0(e, t, n) {
  q = e, $g(e);
}
function $g(e, t, n) {
  for (var s = (e.mode & 1) !== 0; q !== null; ) {
    var l = q, i = l.child;
    if (l.tag === 22 && s) {
      var o = l.memoizedState !== null || zo;
      if (!o) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || Ct;
        a = zo;
        var u = Ct;
        if (zo = o, (Ct = c) && !u) for (q = l; q !== null; ) o = q, c = o.child, o.tag === 22 && o.memoizedState !== null ? Bf(l) : c !== null ? (c.return = o, q = c) : Bf(l);
        for (; i !== null; ) q = i, $g(i), i = i.sibling;
        q = l, zo = a, Ct = u;
      }
      Lf(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, q = i) : Lf(e);
  }
}
function Lf(e) {
  for (; q !== null; ) {
    var t = q;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            Ct || sa(5, t);
            break;
          case 1:
            var s = t.stateNode;
            if (t.flags & 4 && !Ct) if (n === null) s.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : _n(t.type, n.memoizedProps);
              s.componentDidUpdate(l, n.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && vf(t, i, s);
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
              vf(t, o, n);
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
            throw Error(O(163));
        }
        Ct || t.flags & 512 && vu(t);
      } catch (h) {
        nt(t, t.return, h);
      }
    }
    if (t === e) {
      q = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, q = n;
      break;
    }
    q = t.return;
  }
}
function Df(e) {
  for (; q !== null; ) {
    var t = q;
    if (t === e) {
      q = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, q = n;
      break;
    }
    q = t.return;
  }
}
function Bf(e) {
  for (; q !== null; ) {
    var t = q;
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
          var o = t.return;
          try {
            vu(t);
          } catch (c) {
            nt(t, o, c);
          }
      }
    } catch (c) {
      nt(t, t.return, c);
    }
    if (t === e) {
      q = null;
      break;
    }
    var a = t.sibling;
    if (a !== null) {
      a.return = t.return, q = a;
      break;
    }
    q = t.return;
  }
}
var Y0 = Math.ceil, Rr = Zn.ReactCurrentDispatcher, vd = Zn.ReactCurrentOwner, xn = Zn.ReactCurrentBatchConfig, Te = 0, yt = null, dt = null, St = 0, Qt = 0, kl = ks(0), ft = 0, Ui = null, Ks = 0, la = 0, wd = 0, Ti = null, zt = null, Sd = 0, Fl = 1 / 0, Xn = null, Ar = !1, Mu = null, ws = null, Ho = !1, ps = null, Lr = 0, ki = 0, bu = null, rr = -1, ar = 0;
function At() {
  return Te & 6 ? it() : rr !== -1 ? rr : rr = it();
}
function Ss(e) {
  return e.mode & 1 ? Te & 2 && St !== 0 ? St & -St : S0.transition !== null ? (ar === 0 && (ar = Nm()), ar) : (e = De, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Bm(e.type)), e) : 1;
}
function Pn(e, t, n, s) {
  if (50 < ki) throw ki = 0, bu = null, Error(O(185));
  Vi(e, n, s), (!(Te & 2) || e !== yt) && (e === yt && (!(Te & 2) && (la |= n), ft === 4 && us(e, St)), Kt(e, s), n === 1 && Te === 0 && !(t.mode & 1) && (Fl = it() + 500, ea && Cs()));
}
function Kt(e, t) {
  var n = e.callbackNode;
  Sv(e, t);
  var s = yr(e, e === yt ? St : 0);
  if (s === 0) n !== null && Uh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Uh(n), t === 1) e.tag === 0 ? w0(Yf.bind(null, e)) : ng(Yf.bind(null, e)), g0(function() {
      !(Te & 6) && Cs();
    }), n = null;
    else {
      switch (Im(s)) {
        case 1:
          n = Vu;
          break;
        case 4:
          n = jm;
          break;
        case 16:
          n = xr;
          break;
        case 536870912:
          n = Pm;
          break;
        default:
          n = xr;
      }
      n = ex(n, Vg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Vg(e, t) {
  if (rr = -1, ar = 0, Te & 6) throw Error(O(327));
  var n = e.callbackNode;
  if (El() && e.callbackNode !== n) return null;
  var s = yr(e, e === yt ? St : 0);
  if (s === 0) return null;
  if (s & 30 || s & e.expiredLanes || t) t = Dr(e, s);
  else {
    t = s;
    var l = Te;
    Te |= 2;
    var i = Gg();
    (yt !== e || St !== t) && (Xn = null, Fl = it() + 500, zs(e, t));
    do
      try {
        F0();
        break;
      } catch (a) {
        Kg(e, a);
      }
    while (!0);
    od(), Rr.current = i, Te = l, dt !== null ? t = 0 : (yt = null, St = 0, t = ft);
  }
  if (t !== 0) {
    if (t === 2 && (l = Qc(e), l !== 0 && (s = l, t = _u(e, l))), t === 1) throw n = Ui, zs(e, 0), us(e, s), Kt(e, it()), n;
    if (t === 6) us(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !X0(l) && (t = Dr(e, s), t === 2 && (i = Qc(e), i !== 0 && (s = i, t = _u(e, i))), t === 1)) throw n = Ui, zs(e, 0), us(e, s), Kt(e, it()), n;
      switch (e.finishedWork = l, e.finishedLanes = s, t) {
        case 0:
        case 1:
          throw Error(O(345));
        case 2:
          Ds(e, zt, Xn);
          break;
        case 3:
          if (us(e, s), (s & 130023424) === s && (t = Sd + 500 - it(), 10 < t)) {
            if (yr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & s) !== s) {
              At(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = lu(Ds.bind(null, e, zt, Xn), t);
            break;
          }
          Ds(e, zt, Xn);
          break;
        case 4:
          if (us(e, s), (s & 4194240) === s) break;
          for (t = e.eventTimes, l = -1; 0 < s; ) {
            var o = 31 - jn(s);
            i = 1 << o, o = t[o], o > l && (l = o), s &= ~i;
          }
          if (s = l, s = it() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * Y0(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = lu(Ds.bind(null, e, zt, Xn), s);
            break;
          }
          Ds(e, zt, Xn);
          break;
        case 5:
          Ds(e, zt, Xn);
          break;
        default:
          throw Error(O(329));
      }
    }
  }
  return Kt(e, it()), e.callbackNode === n ? Vg.bind(null, e) : null;
}
function _u(e, t) {
  var n = Ti;
  return e.current.memoizedState.isDehydrated && (zs(e, t).flags |= 256), e = Dr(e, t), e !== 2 && (t = zt, zt = n, t !== null && Tu(t)), e;
}
function Tu(e) {
  zt === null ? zt = e : zt.push.apply(zt, e);
}
function X0(e) {
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
function us(e, t) {
  for (t &= ~wd, t &= ~la, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - jn(t), s = 1 << n;
    e[n] = -1, t &= ~s;
  }
}
function Yf(e) {
  if (Te & 6) throw Error(O(327));
  El();
  var t = yr(e, 0);
  if (!(t & 1)) return Kt(e, it()), null;
  var n = Dr(e, t);
  if (e.tag !== 0 && n === 2) {
    var s = Qc(e);
    s !== 0 && (t = s, n = _u(e, s));
  }
  if (n === 1) throw n = Ui, zs(e, 0), us(e, t), Kt(e, it()), n;
  if (n === 6) throw Error(O(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Ds(e, zt, Xn), Kt(e, it()), null;
}
function Md(e, t) {
  var n = Te;
  Te |= 1;
  try {
    return e(t);
  } finally {
    Te = n, Te === 0 && (Fl = it() + 500, ea && Cs());
  }
}
function Gs(e) {
  ps !== null && ps.tag === 0 && !(Te & 6) && El();
  var t = Te;
  Te |= 1;
  var n = xn.transition, s = De;
  try {
    if (xn.transition = null, De = 1, e) return e();
  } finally {
    De = s, xn.transition = n, Te = t, !(Te & 6) && Cs();
  }
}
function bd() {
  Qt = kl.current, Ue(kl);
}
function zs(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, m0(n)), dt !== null) for (n = dt.return; n !== null; ) {
    var s = n;
    switch (sd(s), s.tag) {
      case 1:
        s = s.type.childContextTypes, s != null && br();
        break;
      case 3:
        Xl(), Ue($t), Ue(Pt), hd();
        break;
      case 5:
        dd(s);
        break;
      case 4:
        Xl();
        break;
      case 13:
        Ue(Je);
        break;
      case 19:
        Ue(Je);
        break;
      case 10:
        rd(s.type._context);
        break;
      case 22:
      case 23:
        bd();
    }
    n = n.return;
  }
  if (yt = e, dt = e = Ms(e.current, null), St = Qt = t, ft = 0, Ui = null, wd = la = Ks = 0, zt = Ti = null, Xs !== null) {
    for (t = 0; t < Xs.length; t++) if (n = Xs[t], s = n.interleaved, s !== null) {
      n.interleaved = null;
      var l = s.next, i = n.pending;
      if (i !== null) {
        var o = i.next;
        i.next = l, s.next = o;
      }
      n.pending = s;
    }
    Xs = null;
  }
  return e;
}
function Kg(e, t) {
  do {
    var n = dt;
    try {
      if (od(), lr.current = Er, Ir) {
        for (var s = et.memoizedState; s !== null; ) {
          var l = s.queue;
          l !== null && (l.pending = null), s = s.next;
        }
        Ir = !1;
      }
      if (Vs = 0, xt = ht = et = null, bi = !1, zi = 0, vd.current = null, n === null || n.return === null) {
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
          var p = Tf(o);
          if (p !== null) {
            p.flags &= -257, kf(p, o, a, i, t), p.mode & 1 && _f(i, u, t), t = p, c = u;
            var g = t.updateQueue;
            if (g === null) {
              var w = /* @__PURE__ */ new Set();
              w.add(c), t.updateQueue = w;
            } else g.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              _f(i, u, t), _d();
              break e;
            }
            c = Error(O(426));
          }
        } else if (Qe && a.mode & 1) {
          var M = Tf(o);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), kf(M, o, a, i, t), ld(Ol(c, a));
            break e;
          }
        }
        i = c = Ol(c, a), ft !== 4 && (ft = 2), Ti === null ? Ti = [i] : Ti.push(i), i = o;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var v = Ig(i, c, t);
              yf(i, v);
              break e;
            case 1:
              a = c;
              var m = i.type, x = i.stateNode;
              if (!(i.flags & 128) && (typeof m.getDerivedStateFromError == "function" || x !== null && typeof x.componentDidCatch == "function" && (ws === null || !ws.has(x)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var S = Eg(i, a, t);
                yf(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      Zg(n);
    } catch (b) {
      t = b, dt === n && n !== null && (dt = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Gg() {
  var e = Rr.current;
  return Rr.current = Er, e === null ? Er : e;
}
function _d() {
  (ft === 0 || ft === 3 || ft === 2) && (ft = 4), yt === null || !(Ks & 268435455) && !(la & 268435455) || us(yt, St);
}
function Dr(e, t) {
  var n = Te;
  Te |= 2;
  var s = Gg();
  (yt !== e || St !== t) && (Xn = null, zs(e, t));
  do
    try {
      O0();
      break;
    } catch (l) {
      Kg(e, l);
    }
  while (!0);
  if (od(), Te = n, Rr.current = s, dt !== null) throw Error(O(261));
  return yt = null, St = 0, ft;
}
function O0() {
  for (; dt !== null; ) Qg(dt);
}
function F0() {
  for (; dt !== null && !hv(); ) Qg(dt);
}
function Qg(e) {
  var t = Jg(e.alternate, e, Qt);
  e.memoizedProps = e.pendingProps, t === null ? Zg(e) : dt = t, vd.current = null;
}
function Zg(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = A0(n, t), n !== null) {
        n.flags &= 32767, dt = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ft = 6, dt = null;
        return;
      }
    } else if (n = R0(n, t, Qt), n !== null) {
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
function Ds(e, t, n) {
  var s = De, l = xn.transition;
  try {
    xn.transition = null, De = 1, z0(e, t, n, s);
  } finally {
    xn.transition = l, De = s;
  }
  return null;
}
function z0(e, t, n, s) {
  do
    El();
  while (ps !== null);
  if (Te & 6) throw Error(O(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(O(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Mv(e, i), e === yt && (dt = yt = null, St = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ho || (Ho = !0, ex(xr, function() {
    return El(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = xn.transition, xn.transition = null;
    var o = De;
    De = 1;
    var a = Te;
    Te |= 4, vd.current = null, D0(e, n), Ug(n, e), a0(nu), vr = !!tu, nu = tu = null, e.current = n, B0(n), fv(), Te = a, De = o, xn.transition = i;
  } else e.current = n;
  if (Ho && (Ho = !1, ps = e, Lr = l), i = e.pendingLanes, i === 0 && (ws = null), gv(n.stateNode), Kt(e, it()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (Ar) throw Ar = !1, e = Mu, Mu = null, e;
  return Lr & 1 && e.tag !== 0 && El(), i = e.pendingLanes, i & 1 ? e === bu ? ki++ : (ki = 0, bu = e) : ki = 0, Cs(), null;
}
function El() {
  if (ps !== null) {
    var e = Im(Lr), t = xn.transition, n = De;
    try {
      if (xn.transition = null, De = 16 > e ? 16 : e, ps === null) var s = !1;
      else {
        if (e = ps, ps = null, Lr = 0, Te & 6) throw Error(O(331));
        var l = Te;
        for (Te |= 4, q = e.current; q !== null; ) {
          var i = q, o = i.child;
          if (q.flags & 16) {
            var a = i.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (q = u; q !== null; ) {
                  var d = q;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _i(8, d, i);
                  }
                  var f = d.child;
                  if (f !== null) f.return = d, q = f;
                  else for (; q !== null; ) {
                    d = q;
                    var h = d.sibling, p = d.return;
                    if (zg(d), d === u) {
                      q = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = p, q = h;
                      break;
                    }
                    q = p;
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
              q = i;
            }
          }
          if (i.subtreeFlags & 2064 && o !== null) o.return = i, q = o;
          else e: for (; q !== null; ) {
            if (i = q, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                _i(9, i, i.return);
            }
            var v = i.sibling;
            if (v !== null) {
              v.return = i.return, q = v;
              break e;
            }
            q = i.return;
          }
        }
        var m = e.current;
        for (q = m; q !== null; ) {
          o = q;
          var x = o.child;
          if (o.subtreeFlags & 2064 && x !== null) x.return = o, q = x;
          else e: for (o = m; q !== null; ) {
            if (a = q, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  sa(9, a);
              }
            } catch (b) {
              nt(a, a.return, b);
            }
            if (a === o) {
              q = null;
              break e;
            }
            var S = a.sibling;
            if (S !== null) {
              S.return = a.return, q = S;
              break e;
            }
            q = a.return;
          }
        }
        if (Te = l, Cs(), Dn && typeof Dn.onPostCommitFiberRoot == "function") try {
          Dn.onPostCommitFiberRoot(Gr, e);
        } catch {
        }
        s = !0;
      }
      return s;
    } finally {
      De = n, xn.transition = t;
    }
  }
  return !1;
}
function Xf(e, t, n) {
  t = Ol(n, t), t = Ig(e, t, 1), e = vs(e, t, 1), t = At(), e !== null && (Vi(e, 1, t), Kt(e, t));
}
function nt(e, t, n) {
  if (e.tag === 3) Xf(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Xf(t, e, n);
      break;
    } else if (t.tag === 1) {
      var s = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (ws === null || !ws.has(s))) {
        e = Ol(n, e), e = Eg(t, e, 1), t = vs(t, e, 1), e = At(), t !== null && (Vi(t, 1, e), Kt(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function H0(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = At(), e.pingedLanes |= e.suspendedLanes & n, yt === e && (St & n) === n && (ft === 4 || ft === 3 && (St & 130023424) === St && 500 > it() - Sd ? zs(e, 0) : wd |= n), Kt(e, t);
}
function qg(e, t) {
  t === 0 && (e.mode & 1 ? (t = Ro, Ro <<= 1, !(Ro & 130023424) && (Ro = 4194304)) : t = 1);
  var n = At();
  e = Kn(e, t), e !== null && (Vi(e, t, n), Kt(e, n));
}
function W0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), qg(e, n);
}
function U0(e, t) {
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
      throw Error(O(314));
  }
  s !== null && s.delete(t), qg(e, n);
}
var Jg;
Jg = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || $t.current) Ht = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Ht = !1, E0(e, t, n);
    Ht = !!(e.flags & 131072);
  }
  else Ht = !1, Qe && t.flags & 1048576 && sg(t, kr, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var s = t.type;
      or(e, t), e = t.pendingProps;
      var l = Dl(t, Pt.current);
      Il(t, n), l = pd(null, t, s, e, l, n);
      var i = md();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Vt(s) ? (i = !0, _r(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, cd(t), l.updater = na, t.stateNode = l, l._reactInternals = t, du(t, s, e, n), t = pu(null, t, s, !0, i, n)) : (t.tag = 0, Qe && i && nd(t), Rt(null, t, l, n), t = t.child), t;
    case 16:
      s = t.elementType;
      e: {
        switch (or(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = V0(s), e = _n(s, e), l) {
          case 0:
            t = fu(null, t, s, e, n);
            break e;
          case 1:
            t = Pf(null, t, s, e, n);
            break e;
          case 11:
            t = Cf(null, t, s, e, n);
            break e;
          case 14:
            t = jf(null, t, s, _n(s.type, e), n);
            break e;
        }
        throw Error(O(
          306,
          s,
          ""
        ));
      }
      return t;
    case 0:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : _n(s, l), fu(e, t, s, l, n);
    case 1:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : _n(s, l), Pf(e, t, s, l, n);
    case 3:
      e: {
        if (Dg(t), e === null) throw Error(O(387));
        s = t.pendingProps, i = t.memoizedState, l = i.element, cg(e, t), Pr(t, s, null, n);
        var o = t.memoizedState;
        if (s = o.element, i.isDehydrated) if (i = { element: s, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = Ol(Error(O(423)), t), t = Nf(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = Ol(Error(O(424)), t), t = Nf(e, t, s, n, l);
          break e;
        } else for (qt = ys(t.stateNode.containerInfo.firstChild), Jt = t, Qe = !0, Cn = null, n = rg(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Bl(), s === l) {
            t = Gn(e, t, n);
            break e;
          }
          Rt(e, t, s, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return ug(t), e === null && au(t), s = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, o = l.children, su(s, l) ? o = null : i !== null && su(s, i) && (t.flags |= 32), Lg(e, t), Rt(e, t, o, n), t.child;
    case 6:
      return e === null && au(t), null;
    case 13:
      return Bg(e, t, n);
    case 4:
      return ud(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Yl(t, null, s, n) : Rt(e, t, s, n), t.child;
    case 11:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : _n(s, l), Cf(e, t, s, l, n);
    case 7:
      return Rt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Rt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Rt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (s = t.type._context, l = t.pendingProps, i = t.memoizedProps, o = l.value, Oe(Cr, s._currentValue), s._currentValue = o, i !== null) if (Nn(i.value, o)) {
          if (i.children === l.children && !$t.current) {
            t = Gn(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var a = i.dependencies;
          if (a !== null) {
            o = i.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === s) {
                if (i.tag === 1) {
                  c = Wn(-1, n & -n), c.tag = 2;
                  var u = i.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var d = u.pending;
                    d === null ? c.next = c : (c.next = d.next, d.next = c), u.pending = c;
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
          } else if (i.tag === 10) o = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (o = i.return, o === null) throw Error(O(341));
            o.lanes |= n, a = o.alternate, a !== null && (a.lanes |= n), cu(o, n, t), o = i.sibling;
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
      return l = t.type, s = t.pendingProps.children, Il(t, n), l = yn(l), s = s(l), t.flags |= 1, Rt(e, t, s, n), t.child;
    case 14:
      return s = t.type, l = _n(s, t.pendingProps), l = _n(s.type, l), jf(e, t, s, l, n);
    case 15:
      return Rg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : _n(s, l), or(e, t), t.tag = 1, Vt(s) ? (e = !0, _r(t)) : e = !1, Il(t, n), Ng(t, s, l), du(t, s, l, n), pu(null, t, s, !0, e, n);
    case 19:
      return Yg(e, t, n);
    case 22:
      return Ag(e, t, n);
  }
  throw Error(O(156, t.tag));
};
function ex(e, t) {
  return Cm(e, t);
}
function $0(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function pn(e, t, n, s) {
  return new $0(e, t, n, s);
}
function Td(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function V0(e) {
  if (typeof e == "function") return Td(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Wu) return 11;
    if (e === Uu) return 14;
  }
  return 2;
}
function Ms(e, t) {
  var n = e.alternate;
  return n === null ? (n = pn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function cr(e, t, n, s, l, i) {
  var o = 2;
  if (s = e, typeof e == "function") Td(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case gl:
      return Hs(n.children, l, i, t);
    case Hu:
      o = 8, l |= 8;
      break;
    case Lc:
      return e = pn(12, n, t, l | 2), e.elementType = Lc, e.lanes = i, e;
    case Dc:
      return e = pn(13, n, t, l), e.elementType = Dc, e.lanes = i, e;
    case Bc:
      return e = pn(19, n, t, l), e.elementType = Bc, e.lanes = i, e;
    case um:
      return ia(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case am:
          o = 10;
          break e;
        case cm:
          o = 9;
          break e;
        case Wu:
          o = 11;
          break e;
        case Uu:
          o = 14;
          break e;
        case rs:
          o = 16, s = null;
          break e;
      }
      throw Error(O(130, e == null ? e : typeof e, ""));
  }
  return t = pn(o, n, t, l), t.elementType = e, t.type = s, t.lanes = i, t;
}
function Hs(e, t, n, s) {
  return e = pn(7, e, s, t), e.lanes = n, e;
}
function ia(e, t, n, s) {
  return e = pn(22, e, s, t), e.elementType = um, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function rc(e, t, n) {
  return e = pn(6, e, null, t), e.lanes = n, e;
}
function ac(e, t, n) {
  return t = pn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function K0(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = za(0), this.expirationTimes = za(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = za(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function kd(e, t, n, s, l, i, o, a, c) {
  return e = new K0(e, t, n, a, c), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = pn(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, cd(i), e;
}
function G0(e, t, n) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: ml, key: s == null ? null : "" + s, children: e, containerInfo: t, implementation: n };
}
function tx(e) {
  if (!e) return _s;
  e = e._reactInternals;
  e: {
    if (el(e) !== e || e.tag !== 1) throw Error(O(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Vt(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(O(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Vt(n)) return tg(e, n, t);
  }
  return t;
}
function nx(e, t, n, s, l, i, o, a, c) {
  return e = kd(n, s, !0, e, l, i, o, a, c), e.context = tx(null), n = e.current, s = At(), l = Ss(n), i = Wn(s, l), i.callback = t ?? null, vs(n, i, l), e.current.lanes = l, Vi(e, l, s), Kt(e, s), e;
}
function oa(e, t, n, s) {
  var l = t.current, i = At(), o = Ss(l);
  return n = tx(n), t.context === null ? t.context = n : t.pendingContext = n, t = Wn(i, o), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = vs(l, t, o), e !== null && (Pn(e, l, o, i), sr(e, l, o)), o;
}
function Br(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Of(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Cd(e, t) {
  Of(e, t), (e = e.alternate) && Of(e, t);
}
function Q0() {
  return null;
}
var sx = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function jd(e) {
  this._internalRoot = e;
}
ra.prototype.render = jd.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(O(409));
  oa(e, t, null, null);
};
ra.prototype.unmount = jd.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Gs(function() {
      oa(null, e, null, null);
    }), t[Vn] = null;
  }
};
function ra(e) {
  this._internalRoot = e;
}
ra.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Am();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < cs.length && t !== 0 && t < cs[n].priority; n++) ;
    cs.splice(n, 0, e), n === 0 && Dm(e);
  }
};
function Pd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function aa(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ff() {
}
function Z0(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var i = s;
      s = function() {
        var u = Br(o);
        i.call(u);
      };
    }
    var o = nx(t, s, e, 0, null, !1, !1, "", Ff);
    return e._reactRootContainer = o, e[Vn] = o.current, Bi(e.nodeType === 8 ? e.parentNode : e), Gs(), o;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof s == "function") {
    var a = s;
    s = function() {
      var u = Br(c);
      a.call(u);
    };
  }
  var c = kd(e, 0, !1, null, null, !1, !1, "", Ff);
  return e._reactRootContainer = c, e[Vn] = c.current, Bi(e.nodeType === 8 ? e.parentNode : e), Gs(function() {
    oa(t, c, n, s);
  }), c;
}
function ca(e, t, n, s, l) {
  var i = n._reactRootContainer;
  if (i) {
    var o = i;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = Br(o);
        a.call(c);
      };
    }
    oa(t, o, e, l);
  } else o = Z0(n, t, e, l, s);
  return Br(o);
}
Em = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = mi(t.pendingLanes);
        n !== 0 && (Ku(t, n | 1), Kt(t, it()), !(Te & 6) && (Fl = it() + 500, Cs()));
      }
      break;
    case 13:
      Gs(function() {
        var s = Kn(e, 1);
        if (s !== null) {
          var l = At();
          Pn(s, e, 1, l);
        }
      }), Cd(e, 1);
  }
};
Gu = function(e) {
  if (e.tag === 13) {
    var t = Kn(e, 134217728);
    if (t !== null) {
      var n = At();
      Pn(t, e, 134217728, n);
    }
    Cd(e, 134217728);
  }
};
Rm = function(e) {
  if (e.tag === 13) {
    var t = Ss(e), n = Kn(e, t);
    if (n !== null) {
      var s = At();
      Pn(n, e, t, s);
    }
    Cd(e, t);
  }
};
Am = function() {
  return De;
};
Lm = function(e, t) {
  var n = De;
  try {
    return De = e, t();
  } finally {
    De = n;
  }
};
Vc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Oc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var s = n[t];
          if (s !== e && s.form === e.form) {
            var l = Jr(s);
            if (!l) throw Error(O(90));
            hm(s), Oc(s, l);
          }
        }
      }
      break;
    case "textarea":
      pm(e, n);
      break;
    case "select":
      t = n.value, t != null && Cl(e, !!n.multiple, t, !1);
  }
};
Sm = Md;
Mm = Gs;
var q0 = { usingClientEntryPoint: !1, Events: [Gi, wl, Jr, vm, wm, Md] }, ai = { findFiberByHostInstance: Ys, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, J0 = { bundleType: ai.bundleType, version: ai.version, rendererPackageName: ai.rendererPackageName, rendererConfig: ai.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Zn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Tm(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: ai.findFiberByHostInstance || Q0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wo.isDisabled && Wo.supportsFiber) try {
    Gr = Wo.inject(J0), Dn = Wo;
  } catch {
  }
}
tn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = q0;
tn.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Pd(t)) throw Error(O(200));
  return G0(e, t, null, n);
};
tn.createRoot = function(e, t) {
  if (!Pd(e)) throw Error(O(299));
  var n = !1, s = "", l = sx;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = kd(e, 1, !1, null, null, n, !1, s, l), e[Vn] = t.current, Bi(e.nodeType === 8 ? e.parentNode : e), new jd(t);
};
tn.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(O(188)) : (e = Object.keys(e).join(","), Error(O(268, e)));
  return e = Tm(t), e = e === null ? null : e.stateNode, e;
};
tn.flushSync = function(e) {
  return Gs(e);
};
tn.hydrate = function(e, t, n) {
  if (!aa(t)) throw Error(O(200));
  return ca(null, e, t, !0, n);
};
tn.hydrateRoot = function(e, t, n) {
  if (!Pd(e)) throw Error(O(405));
  var s = n != null && n.hydratedSources || null, l = !1, i = "", o = sx;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = nx(t, null, e, 1, n ?? null, l, !1, i, o), e[Vn] = t.current, Bi(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new ra(t);
};
tn.render = function(e, t, n) {
  if (!aa(t)) throw Error(O(200));
  return ca(null, e, t, !1, n);
};
tn.unmountComponentAtNode = function(e) {
  if (!aa(e)) throw Error(O(40));
  return e._reactRootContainer ? (Gs(function() {
    ca(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Vn] = null;
    });
  }), !0) : !1;
};
tn.unstable_batchedUpdates = Md;
tn.unstable_renderSubtreeIntoContainer = function(e, t, n, s) {
  if (!aa(n)) throw Error(O(200));
  if (e == null || e._reactInternals === void 0) throw Error(O(38));
  return ca(e, t, n, !1, s);
};
tn.version = "18.3.1-next-f1338f8080-20240426";
function lx() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lx);
    } catch (e) {
      console.error(e);
    }
}
lx(), lm.exports = tn;
var Ci = lm.exports, zf = Ci;
Rc.createRoot = zf.createRoot, Rc.hydrateRoot = zf.hydrateRoot;
const ew = {}, Hf = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (d, f) => {
    const h = typeof d == "function" ? d(t) : d;
    if (!Object.is(h, t)) {
      const p = t;
      t = f ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, p));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (d) => (n.add(d), () => n.delete(d)), destroy: () => {
    (ew ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, tw = (e) => e ? Hf(e) : Hf;
var ix = { exports: {} }, ox = {}, rx = { exports: {} }, ax = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zl = T;
function nw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var sw = typeof Object.is == "function" ? Object.is : nw, lw = zl.useState, iw = zl.useEffect, ow = zl.useLayoutEffect, rw = zl.useDebugValue;
function aw(e, t) {
  var n = t(), s = lw({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, i = s[1];
  return ow(
    function() {
      l.value = n, l.getSnapshot = t, cc(l) && i({ inst: l });
    },
    [e, n, t]
  ), iw(
    function() {
      return cc(l) && i({ inst: l }), e(function() {
        cc(l) && i({ inst: l });
      });
    },
    [e]
  ), rw(n), n;
}
function cc(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !sw(e, n);
  } catch {
    return !0;
  }
}
function cw(e, t) {
  return t();
}
var uw = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? cw : aw;
ax.useSyncExternalStore = zl.useSyncExternalStore !== void 0 ? zl.useSyncExternalStore : uw;
rx.exports = ax;
var dw = rx.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua = T, hw = dw;
function fw(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var pw = typeof Object.is == "function" ? Object.is : fw, mw = hw.useSyncExternalStore, gw = ua.useRef, xw = ua.useEffect, yw = ua.useMemo, vw = ua.useDebugValue;
ox.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var i = gw(null);
  if (i.current === null) {
    var o = { hasValue: !1, value: null };
    i.current = o;
  } else o = i.current;
  i = yw(
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
        if (g = f, pw(d, p)) return g;
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
  var a = mw(e, i[0], i[1]);
  return xw(
    function() {
      o.hasValue = !0, o.value = a;
    },
    [a]
  ), vw(a), a;
};
ix.exports = ox;
var ww = ix.exports;
const Sw = /* @__PURE__ */ $p(ww), cx = {}, { useDebugValue: Mw } = ke, { useSyncExternalStoreWithSelector: bw } = Sw;
let Wf = !1;
const _w = (e) => e;
function Tw(e, t = _w, n) {
  (cx ? "production" : void 0) !== "production" && n && !Wf && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Wf = !0);
  const s = bw(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return Mw(s), s;
}
const Uf = (e) => {
  (cx ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? tw(e) : e, n = (s, l) => Tw(t, s, l);
  return Object.assign(n, t), n;
}, st = (e) => e ? Uf(e) : Uf, kw = {
  width: 0,
  height: 0
}, ls = {
  x: 0,
  y: 0,
  zoom: 1
}, Cw = 0.02, jw = 16, Pw = 2e-3, ci = 0.6, j = 12, pe = 8, Y = 64, is = 512 * j, Nw = ["nw", "ne", "se", "sw"], uc = -180, dc = 180, Qs = 0.01, Hl = 5, hc = 0, fc = 1, Iw = j * 0.9, $f = Iw / 2, ux = 16, Ew = 8, Rw = 8, ku = 1, Cu = 64, pc = 4096, Vf = 4e6, dx = "pss.traceCanvasOversize", Nd = 8, Kf = Nd * 3, Aw = Nd * 4, Lw = 1e3, Dw = {
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
}, Gf = {
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
], Bw = {
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
}, Yw = (e, t, n) => Math.min(Math.max(e, t), n), Ce = st((e, t) => ({
  ...kw,
  camera: { ...ls },
  setSize: (n, s) => e((l) => {
    const { camera: i } = l, a = i.x === ls.x && i.y === ls.y && i.zoom === ls.zoom && n > 0 && s > 0 ? {
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
      x: -n.width / (2 * ls.zoom),
      y: -n.height / (2 * ls.zoom),
      zoom: ls.zoom
    }
  } : { camera: { ...ls } }),
  zoomBy: (n, s) => {
    const { camera: l } = t(), i = Yw(l.zoom + n, Cw, jw);
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
})), Qf = [Math.max(0, ju.length - 1)], Xw = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, ui = (e, t) => {
  const n = Xw(e).filter((s) => s >= 0 && s < t);
  return n.length > 0 ? n : [Math.max(0, t - 1)];
}, re = st((e, t) => ({
  colors: ju,
  selectedIndices: Qf,
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
    colors: ju,
    selectedIndices: Qf
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
})), Zf = (e, t) => Math.floor(e / t), qf = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, Jf = (e, t) => {
  const n = Zf(t, Y), s = Zf(e, Y);
  return {
    row: n,
    col: s,
    localX: qf(e, Y),
    localY: qf(t, Y)
  };
}, Uo = (e, t) => `${e}:${t}`;
class fl {
  constructor() {
    this.blocks = /* @__PURE__ */ new Map();
  }
  getPixel(t, n) {
    const { row: s, col: l, localX: i, localY: o } = Jf(t, n), a = this.blocks.get(Uo(s, l));
    return a ? a[o * Y + i] : 0;
  }
  setPixel(t, n, s) {
    const { row: l, col: i, localX: o, localY: a } = Jf(t, n), c = Uo(l, i);
    let u = this.blocks.get(c);
    u || (u = new Uint8Array(Y * Y), this.blocks.set(c, u)), u[a * Y + o] = s;
  }
  setBlock(t, n, s) {
    if (s.length !== Y * Y)
      throw new Error("Invalid block size");
    this.blocks.set(Uo(t, n), s);
  }
  getBlock(t, n) {
    return this.blocks.get(Uo(t, n));
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
const ur = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`, ep = ur(), ne = st((e, t) => ({
  layers: [{ id: ep, name: "Layer 1", visible: !0, store: new fl() }],
  activeLayerId: ep,
  version: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  createLayer: (n) => {
    const s = ur(), l = n != null && n.trim() ? n.trim() : `Layer ${t().layers.length + 1}`;
    return e((i) => ({
      layers: [...i.layers, { id: s, name: l, visible: !0, store: new fl() }],
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
    const a = Math.floor(l / Y), c = Math.floor(s / Y);
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
      const a = Math.floor(o.y / Y), c = Math.floor(o.x / Y);
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
      const u = new fl();
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
    const s = ur(), l = new fl();
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
    const n = ur();
    e((s) => ({
      layers: [{ id: n, name: "Layer 1", visible: !0, store: new fl() }],
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
})), Ow = (e, t) => `${e}:${t}`, z = st(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(Ow(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class Fw {
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
const zw = "Pixel Splash Studio", Hw = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${zw} - ${n}${t ? "*" : ""}`;
}, we = st((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), Ww = () => {
  const e = we.getState();
  return Hw(e.path, e.dirty);
}, di = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, hx = 64, Pu = 2, Nu = 24, mc = 6, Uw = 1, $w = 1, Yr = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(hx, Math.max(1, Math.floor(e))), Vw = (e) => Math.max(Pu, Math.min(Nu, Math.round(e))), gc = (e) => ({
  ...e,
  columns: Yr(e.columns, Uw),
  rows: Yr(e.rows, $w)
}), Kw = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, Gw = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, Qw = (e, t) => {
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
}, Zw = (e, t) => {
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
  return Qw(e, t);
}, W = st((e, t) => ({
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
    const l = n.map(gc), i = Kw(
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
    const l = n.map(gc), i = l[0];
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
    tilePaletteColumns: Math.min(hx, Math.max(1, n)),
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
    tilePickerZoom: Number.isFinite(n) && n > 0 ? Vw(n) : mc
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
    const o = Yr(s, i.columns), a = Yr(l, i.rows);
    i.columns === o && i.rows === a || (we.getState().setDirty(!0), e((c) => ({
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
    !i || i.name === l || (we.getState().setDirty(!0), e((o) => ({
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
    we.getState().setDirty(!0), e({
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
      name: Gw(
        l.name,
        s.tileSets.map((a) => a.name)
      ),
      tiles: l.tiles.map((a) => ({
        ...a,
        id: di("tile"),
        pixels: a.pixels.slice()
      }))
    };
    return we.getState().setDirty(!0), e((a) => ({
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
    const { id: s, ...l } = n, i = s ?? di("tileset"), o = gc({ id: i, ...l });
    return we.getState().setDirty(!0), e((a) => ({
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
    s.length !== 0 && (we.getState().setDirty(!0), e((l) => ({
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
    const l = n ? null : new Set(s.map((a) => `${a.row}:${a.col}`)), i = ne.getState(), o = (a, c, u, d) => {
      if (!l)
        return !0;
      const f = a, h = c, p = a + Math.max(0, u - 1), g = c + Math.max(0, d - 1), w = Math.floor(f / Y), M = Math.floor(p / Y), v = Math.floor(h / Y), m = Math.floor(g / Y);
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
    we.getState().setDirty(!0), e((o) => {
      var m;
      const a = o.tileSets.find((x) => x.id === n);
      if (!a)
        return o;
      const c = new Set(
        Array.from(i).filter((x) => x >= 0 && x < a.tiles.length)
      );
      if (c.size === 0)
        return o;
      const { nextTiles: u, indexMap: d, nextColumns: f, nextRows: h } = Zw(
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
    we.getState().setDirty(!0), e((s) => {
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
    return we.getState().setDirty(!0), e((a) => ({
      tileMaps: [...a.tileMaps, o],
      activeTileMapId: i
    })), i;
  },
  setTileMapTiles: (n, s) => {
    s.length !== 0 && (we.getState().setDirty(!0), e((l) => ({
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
    return we.getState().setDirty(!0), e((x) => ({
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
})), qw = (e) => ({
  ...e,
  pixels: e.pixels.slice(),
  source: e.source ? { ...e.source } : void 0
}), fx = (e) => ({
  ...e,
  tiles: e.tiles.map(qw)
}), px = (e) => ({
  ...e,
  tiles: e.tiles.slice()
}), Iu = (e) => ({
  tileSets: e.tileSets.map(fx),
  tileMaps: e.tileMaps.map(px),
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
}), Wt = () => {
  const e = W.getState();
  return {
    tileSets: e.tileSets.map(fx),
    tileMaps: e.tileMaps.map(px),
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
}, Jw = (e, t) => JSON.stringify(e) === JSON.stringify(t), Zs = (e, t) => Jw(e, t) ? !1 : (Le.getState().pushBatch({
  changes: [],
  tileBefore: e,
  tileAfter: t
}), !0), tp = (e) => {
  const t = Iu(e);
  W.setState({
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
}, Le = st((e, t) => ({
  locked: !1,
  undoStack: [],
  redoStack: [],
  pushBatch: (n) => {
    if (n.changes.length === 0 && !n.tileBefore && !n.tileAfter)
      return;
    we.getState().setDirty(!0);
    const s = {
      layerId: n.changes.length > 0 ? n.layerId ?? ne.getState().activeLayerId : n.layerId,
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
      if (we.getState().setDirty(!0), s.changes.length > 0) {
        const l = ne.getState(), i = s.layerId ?? l.activeLayerId;
        for (const o of s.changes)
          l.setPixelInLayer(i, o.x, o.y, o.prev);
      }
      s.tileBefore && tp(s.tileBefore), e((l) => ({
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
      if (we.getState().setDirty(!0), s.changes.length > 0) {
        const l = ne.getState(), i = s.layerId ?? l.activeLayerId;
        for (const o of s.changes)
          l.setPixelInLayer(i, o.x, o.y, o.next);
      }
      s.tileAfter && tp(s.tileAfter), e((l) => ({
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
})), mn = st((e) => ({
  size: 1,
  shape: "point",
  setSize: (t) => e({ size: t }),
  setShape: (t) => e({ shape: t })
})), As = new fl(), np = (e, t) => `${e}:${t}`, ge = st((e, t) => ({
  store: As,
  version: 0,
  selectedCount: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  setSelection: (n, s, l) => {
    const i = As.getPixel(n, s), o = l ? 1 : 0;
    if (i === o)
      return;
    As.setPixel(n, s, o);
    const a = Math.floor(s / Y), c = Math.floor(n / Y);
    e((u) => {
      const d = new Set(u.dirtyBlocks);
      d.add(np(a, c));
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
      const o = As.getPixel(i.x, i.y), a = i.selected ? 1 : 0;
      if (o === a)
        continue;
      As.setPixel(i.x, i.y, a);
      const c = Math.floor(i.y / Y), u = Math.floor(i.x / Y);
      s.add(np(c, u)), l += a === 1 ? 1 : -1;
    }
    e((i) => ({
      version: i.version + 1,
      dirtyBlocks: s,
      selectedCount: Math.max(0, i.selectedCount + l)
    }));
  },
  isSelected: (n, s) => As.getPixel(n, s) === 1,
  clear: () => {
    As.clear(), e((n) => ({
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
})), e1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let o = s; o <= l; o += 1)
      t === "round" && o * o + i * i > e * e || n.push([o, i]);
  return n;
}, sp = (e, t, n) => {
  const s = ge.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, mx = (e, t, n) => {
  const { size: s, shape: l } = mn.getState();
  if (l === "point") {
    sp(e, t, n);
    return;
  }
  const i = e1(s, l);
  for (const [o, a] of i)
    sp(e + o, t + a, n);
}, xc = (e, t) => {
  const n = Math.floor(e.canvasX / j), s = Math.floor(e.canvasY / j);
  mx(n, s, t);
};
class t1 {
  constructor() {
    this.id = "pen", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.changes = /* @__PURE__ */ new Map(), this.lastPoint = null, this.onHover = (t) => {
      if (this.drawing)
        return;
      z.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex();
      xc(t, l);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = re.getState();
      this.layerId = ne.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), xc(t, this.activeIndex), this.lastPoint = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      };
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      };
      if (this.lastPoint) {
        const s = Math.abs(n.x - this.lastPoint.x), l = Math.abs(n.y - this.lastPoint.y), i = this.lastPoint.x < n.x ? 1 : -1, o = this.lastPoint.y < n.y ? 1 : -1;
        let a = s - l, c = this.lastPoint.x, u = this.lastPoint.y;
        for (; mx(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
          const d = 2 * a;
          d > -l && (a -= l, c += i), d < s && (a += s, u += o);
        }
      } else
        xc(t, this.activeIndex);
      this.lastPoint = n;
    }, this.onEnd = () => {
      var f;
      if (!this.drawing)
        return;
      const t = performance.now(), n = z.getState(), s = ne.getState(), l = this.layerId ?? s.activeLayerId, i = [];
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
      Le.getState().pushBatch({ layerId: l, changes: Array.from(this.changes.values()) });
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
      z.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
    };
  }
}
const yc = (e, t, n) => Math.min(n, Math.max(t, e)), Zt = st((e) => ({
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
})), lp = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), n1 = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), ip = (e, t, n, s) => {
  const l = ge.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || z.getState().setPixel(t, n, s);
}, s1 = () => {
  const e = re.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, l1 = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class i1 {
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
      const a = Math.min(1500, Math.floor(this.emissionBudget));
      if (this.emissionBudget -= a, a > 0) {
        const c = Math.floor(s.canvasX / j), u = Math.floor(s.canvasY / j), d = Math.max(1, n.radius), h = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, p = this.rng ?? Math.random, g = this.activeIndex === 0 ? [0] : s1(), w = g.length > 1, M = w ? g : null, v = g[0] ?? this.activeIndex;
        for (let m = 0; m < a; m += 1) {
          const x = p() * Math.PI * 2, S = p(), b = Math.pow(S, h) * d, _ = Math.round(Math.cos(x) * b), k = Math.round(Math.sin(x) * b), C = w ? (M == null ? void 0 : M[Math.floor(p() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : v;
          ip(s, c + _, u + k, C);
        }
      }
      this.frameHandle = lp(this.step);
    }, this.onHover = (t) => {
      if (this.drawing)
        return;
      z.getState().clear();
      const s = re.getState(), l = Math.floor(t.canvasX / j), i = Math.floor(t.canvasY / j), o = t.alt ? 0 : s.getActiveIndex();
      ip(t, l, i, o);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = re.getState();
      this.layerId = ne.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), this.lastCursor = t, this.emissionBudget = 0, this.lastFrameTime = typeof requestAnimationFrame == "function" ? performance.now() : Date.now();
      const { deterministic: l, seed: i } = Zt.getState();
      this.rng = l ? l1(i) : null, this.stopLoop(), this.frameHandle = lp(this.step);
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
      const t = z.getState(), n = ne.getState(), s = this.layerId ?? n.activeLayerId, l = [];
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
      n.setPixelsInLayer(s, l), Le.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    }, this.onCancel = () => {
      this.stopLoop(), z.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    };
  }
  stopLoop() {
    this.frameHandle != null && (n1(this.frameHandle), this.frameHandle = null);
  }
}
const dr = (e) => Math.min(255, Math.max(0, Math.round(e))), Mt = (e) => {
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
}, Id = (e) => `rgb(${e.r}, ${e.g}, ${e.b})`, un = (e, t) => `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`, ds = (e, t, n) => ({
  r: dr(e.r + (t.r - e.r) * n),
  g: dr(e.g + (t.g - e.g) * n),
  b: dr(e.b + (t.b - e.b) * n)
}), vc = (e) => dr(e).toString(16).padStart(2, "0"), Wl = (e) => `#${vc(e.r)}${vc(e.g)}${vc(e.b)}`, da = (e) => ({
  r: 255 - e.r,
  g: 255 - e.g,
  b: 255 - e.b
}), o1 = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, r1 = (e) => o1(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, a1 = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), ha = (e, t, n = 60) => a1(e, t) < n ? r1(e) : t, wt = st((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), fa = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, Eu = (e, t, n) => Math.min(n, Math.max(t, e)), c1 = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, u1 = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, d1 = [
  [0, 2],
  [3, 1]
], h1 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], f1 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], p1 = (e, t, n) => e === "bayer2" ? (d1[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (h1[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (f1[n & 7][t & 7] + 0.5) / 64 : e === "random" ? c1(t, n) : e === "blue-noise" ? u1(t, n) : 0.5, op = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const i = n.maxX - n.minX, o = n.maxY - n.minY, a = i === 0 ? 1 : i, c = o === 0 ? 1 : o, u = e - n.minX, d = t - n.minY;
  let f = 0;
  return s === "top-bottom" ? f = d / c : s === "bottom-top" ? f = 1 - d / c : s === "left-right" ? f = u / a : s === "right-left" && (f = 1 - u / a), f = Eu(f, 0, 1), f * (l - 1);
}, m1 = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", g1 = (e) => e === "floyd-steinberg" ? [
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
  if (!m1(l)) {
    for (const R of e) {
      const D = op(R.x, R.y, t, s, i), P = Math.floor(D), A = D - P, H = p1(l, R.x, R.y), J = A > H ? P + 1 : P, oe = Eu(J, 0, i - 1);
      o.set(`${R.x}:${R.y}`, n[oe] ?? 0);
    }
    return o;
  }
  const a = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = a * c, d = Number.isFinite(u) && u > 0 && u <= 2e6;
  let f = null, h = null, p = null, g = null;
  if (d) {
    f = new Uint8Array(u), h = new Float32Array(u);
    for (const R of e) {
      const D = (R.y - t.minY) * a + (R.x - t.minX);
      D >= 0 && D < f.length && (f[D] = 1);
    }
  } else {
    p = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    for (const R of e)
      p.add(`${R.x}:${R.y}`);
  }
  const w = (R, D) => {
    if (f) {
      const P = (D - t.minY) * a + (R - t.minX);
      return P >= 0 && P < f.length && f[P] === 1;
    }
    return (p == null ? void 0 : p.has(`${R}:${D}`)) ?? !1;
  }, M = (R, D) => {
    if (h) {
      const P = (D - t.minY) * a + (R - t.minX);
      return h[P] ?? 0;
    }
    return (g == null ? void 0 : g.get(`${R}:${D}`)) ?? 0;
  }, v = (R, D, P) => {
    if (!w(R, D))
      return;
    if (h) {
      const H = (D - t.minY) * a + (R - t.minX);
      h[H] += P;
      return;
    }
    const A = `${R}:${D}`;
    g == null || g.set(A, (g.get(A) ?? 0) + P);
  }, m = s === "right-left" ? -1 : 1, x = s === "bottom-top" ? -1 : 1, S = m > 0 ? t.minX : t.maxX, b = m > 0 ? t.maxX : t.minX, _ = x > 0 ? t.minY : t.maxY, k = x > 0 ? t.maxY : t.minY, C = g1(l);
  for (let R = _; x > 0 ? R <= k : R >= k; R += x)
    for (let D = S; m > 0 ? D <= b : D >= b; D += m) {
      if (!w(D, R))
        continue;
      const A = op(D, R, t, s, i) + M(D, R), H = Eu(Math.round(A), 0, i - 1);
      o.set(`${D}:${R}`, n[H] ?? 0);
      const J = A - H;
      if (!Number.isFinite(J) || J === 0)
        continue;
      const oe = [];
      let le = 0;
      for (const ie of C) {
        const B = D + ie.dx * m, X = R + ie.dy * x;
        w(B, X) && (oe.push({ x: B, y: X, weight: ie.weight }), le += ie.weight);
      }
      if (!(le <= 0))
        for (const ie of oe)
          v(ie.x, ie.y, J * ie.weight / le);
    }
  return o;
}, Ru = (e, t, n) => {
  const s = ge.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, x1 = (e, t, n, s, l) => {
  let i = Math.abs(n - e), o = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - o;
  for (; Ru(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -o && (u -= o, e += a), d < i && (u += i, t += c);
  }
}, y1 = (e, t, n, s) => {
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
class v1 {
  constructor() {
    this.id = "line", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onHover = (t) => {
      if (this.start)
        return;
      z.getState().clear();
      const s = re.getState(), l = t.alt ? 0 : s.getActiveIndex(), i = Math.floor(t.canvasX / j), o = Math.floor(t.canvasY / j);
      Ru(i, o, l);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = re.getState();
      this.layerId = ne.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
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
        }, a = y1(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = wt.getState(), d = Zi(
          a,
          o,
          i,
          c,
          u
        );
        for (const f of a)
          Ru(f.x, f.y, d.get(`${f.x}:${f.y}`) ?? i[0] ?? 0);
      } else
        x1(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = ne.getState(), s = this.layerId ?? n.activeLayerId;
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
      Le.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Xr = st((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), w1 = (e, t, n) => {
  const s = ge.getState(), l = z.getState(), i = Math.min(e.x, t.x), o = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = a; u <= c; u += 1)
    for (let d = i; d <= o; d += 1)
      s.selectedCount > 0 && !s.isSelected(d, u) || l.setPixel(d, u, n);
}, S1 = (e, t, n) => {
  const s = ge.getState(), l = z.getState(), i = Math.min(e.x, t.x), o = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = i; u <= o; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, a)) && l.setPixel(u, a, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = a + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n), (s.selectedCount === 0 || s.isSelected(o, u)) && l.setPixel(o, u, n);
};
class M1 {
  constructor() {
    this.id = "rectangle", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      z.getState().clear();
      const s = re.getState();
      this.layerId = ne.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      }, l = Xr.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], o = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = ge.getState(), c = [];
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
        w1(this.start, s, this.activeIndex);
        return;
      }
      S1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = ne.getState(), s = this.layerId ?? n.activeLayerId;
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
      l.length > 0 && (n.setPixelsInLayer(s, l), Le.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Or = st((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), hs = (e, t, n) => {
  const s = ge.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, Fr = (e, t, n, s, l) => {
  let i = Math.abs(n - e), o = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = i - o;
  for (; hs(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -o && (u -= o, e += a), d < i && (u += i, t += c);
  }
}, b1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y), a = (l - s) / 2, c = (o - i) / 2, u = (s + l) / 2, d = (i + o) / 2;
  if (a === 0 && c === 0) {
    hs(s, i, n);
    return;
  }
  if (a === 0) {
    Fr(s, i, s, o, n);
    return;
  }
  if (c === 0) {
    Fr(s, i, l, i, n);
    return;
  }
  const f = a * a, h = c * c;
  for (let p = i; p <= o; p += 1) {
    const g = p - d;
    for (let w = s; w <= l; w += 1) {
      const M = w - u;
      M * M / f + g * g / h <= 1 && hs(w, p, n);
    }
  }
}, _1 = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y), a = (l - s) / 2, c = (o - i) / 2, u = (s + l) / 2, d = (i + o) / 2;
  if (a === 0 && c === 0) {
    hs(s, i, n);
    return;
  }
  if (a === 0) {
    Fr(s, i, s, o, n);
    return;
  }
  if (c === 0) {
    Fr(s, i, l, i, n);
    return;
  }
  const f = a * a, h = c * c;
  for (let p = s; p <= l; p += 1) {
    const g = p - u, w = 1 - g * g / f;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * c, v = Math.round(d - M), m = Math.round(d + M);
    hs(p, v, n), hs(p, m, n);
  }
  for (let p = i; p <= o; p += 1) {
    const g = p - d, w = 1 - g * g / h;
    if (w < 0)
      continue;
    const M = Math.sqrt(w) * a, v = Math.round(u - M), m = Math.round(u + M);
    hs(v, p, n), hs(m, p, n);
  }
};
class T1 {
  constructor() {
    this.id = "oval", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      z.getState().clear();
      const s = re.getState();
      this.layerId = ne.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : fa(), this.start = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / j),
        y: Math.floor(t.canvasY / j)
      }, l = Or.getState().mode, i = this.activeRamp.length > 1 ? this.activeRamp : [], o = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (i.length > 1) {
        const a = ge.getState(), c = [], u = (o.maxX - o.minX) / 2, d = (o.maxY - o.minY) / 2, f = (o.minX + o.maxX) / 2, h = (o.minY + o.maxY) / 2, p = (m, x) => a.selectedCount === 0 || a.isSelected(m, x), g = (m, x) => {
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
        b1(this.start, s, this.activeIndex);
        return;
      }
      _1(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = ne.getState(), s = this.layerId ?? n.activeLayerId;
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
      l.length > 0 && (n.setPixelsInLayer(s, l), Le.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Ul = st((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), Ae = st((e) => ({
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
})), qs = st((e) => ({
  mode: "pixel",
  setMode: (t) => {
    const n = t === "tile" ? "tile" : "pixel";
    e({ mode: n });
    const s = Ae.getState();
    if (n === "tile") {
      s.setShowTileLayer(!0), s.setShowPixelLayer(!1);
      return;
    }
    s.setShowPixelLayer(!0), s.setShowTileLayer(!1);
  }
})), k1 = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), C1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe),
  y: Math.floor(e.y / pe)
} : e, wc = (e, t) => C1(k1(e), t), rp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * pe,
    maxX: (l + 1) * pe - 1,
    minY: i * pe,
    maxY: (o + 1) * pe - 1
  } : { minX: s, maxX: l, minY: i, maxY: o };
}, j1 = (e, t) => {
  const n = z.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  for (let a = i; a <= o; a += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, a, 1);
};
class P1 {
  constructor() {
    this.id = "selection-rect", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      z.getState().clear(), this.isRemoving = t.ctrl, this.snap = qs.getState().mode === "tile" ? "tile" : Ul.getState().snap, this.start = wc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = wc(t, this.snap);
      this.last = s;
      const l = rp(this.start, s, this.snap);
      j1({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = ge.getState(), l = t ? wc(t, this.snap) : this.last ?? this.start, i = rp(this.start, l, this.snap), o = !this.isRemoving, a = [];
      for (let c = i.minY; c <= i.maxY; c += 1)
        for (let u = i.minX; u <= i.maxX; u += 1)
          a.push({ x: u, y: c, selected: o });
      s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const N1 = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), I1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe),
  y: Math.floor(e.y / pe)
} : e, Sc = (e, t) => I1(N1(e), t), ap = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), i = Math.min(e.y, t.y), o = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * pe,
    maxX: (l + 1) * pe - 1,
    minY: i * pe,
    maxY: (o + 1) * pe - 1
  } : { minX: s, maxX: l, minY: i, maxY: o };
}, cp = (e, t) => {
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
class E1 {
  constructor() {
    this.id = "selection-oval", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      z.getState().clear(), this.isRemoving = t.ctrl, this.snap = qs.getState().mode === "tile" ? "tile" : Ul.getState().snap, this.start = Sc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = Sc(t, this.snap);
      this.last = s;
      const l = ap(this.start, s, this.snap);
      cp(l, (i, o) => n.setPixel(i, o, 1));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = ge.getState(), l = t ? Sc(t, this.snap) : this.last ?? this.start, i = ap(this.start, l, this.snap), o = !this.isRemoving, a = [];
      cp(i, (c, u) => {
        a.push({ x: c, y: u, selected: o });
      }), s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const R1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let i = s; i <= l; i += 1)
    for (let o = s; o <= l; o += 1)
      t === "round" && o * o + i * i > e * e || n.push([o, i]);
  return n;
}, A1 = (e) => {
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
}, Mc = (e, t) => {
  const n = Math.floor(e.canvasX / j), s = Math.floor(e.canvasY / j);
  return t ? {
    x: Math.floor(n / pe),
    y: Math.floor(s / pe)
  } : { x: n, y: s };
}, hr = (e, t, n) => {
  const s = z.getState();
  if (n) {
    const a = e * pe, c = t * pe;
    for (let u = 0; u < pe; u += 1)
      for (let d = 0; d < pe; d += 1)
        s.setPixel(a + d, c + u, 1);
    return;
  }
  const { size: l, shape: i } = mn.getState();
  if (i === "point") {
    s.setPixel(e, t, 1);
    return;
  }
  const o = R1(l, i);
  for (const [a, c] of o)
    s.setPixel(e + a, t + c, 1);
}, up = (e, t, n) => {
  const s = Math.abs(t.x - e.x), l = Math.abs(t.y - e.y), i = e.x < t.x ? 1 : -1, o = e.y < t.y ? 1 : -1;
  let a = s - l, c = e.x, u = e.y;
  for (; hr(c, u, n), !(c === t.x && u === t.y); ) {
    const d = 2 * a;
    d > -l && (a -= l, c += i), d < s && (a += s, u += o);
  }
}, L1 = (e) => {
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
class D1 {
  constructor() {
    this.id = "selection-lasso", this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1, this.onHover = (t) => {
      if (this.drawing)
        return;
      this.tileMode = qs.getState().mode === "tile", z.getState().clear();
      const s = Mc(t, this.tileMode);
      hr(s.x, s.y, this.tileMode);
    }, this.onBegin = (t) => {
      z.getState().clear(), this.drawing = !0, this.isRemoving = t.ctrl, this.tileMode = qs.getState().mode === "tile";
      const s = Mc(t, this.tileMode);
      hr(s.x, s.y, this.tileMode), this.startPoint = s, this.lastPoint = s, this.path = [s];
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = Mc(t, this.tileMode);
      this.lastPoint && n.x === this.lastPoint.x && n.y === this.lastPoint.y || (this.lastPoint ? up(this.lastPoint, n, this.tileMode) : hr(n.x, n.y, this.tileMode), this.lastPoint = n, this.path.push(n));
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      const t = z.getState(), n = ge.getState(), s = !this.isRemoving, { shape: l } = mn.getState(), i = this.startPoint, o = this.lastPoint;
      i && o && (i.x !== o.x || i.y !== o.y) && up(o, i, this.tileMode);
      const a = [];
      for (const p of this.path) {
        const g = a[a.length - 1];
        (!g || g.x !== p.x || g.y !== p.y) && a.push(p);
      }
      const c = i ?? a[0] ?? null, u = a[a.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && a.push(c);
      const d = Array.from(t.entries()).map((p) => ({ x: p.x, y: p.y })), f = l === "point" && !this.tileMode ? L1(a) : A1(d), h = (f.length > 0 ? f : d).map((p) => ({ x: p.x, y: p.y, selected: s }));
      n.setSelections(h), t.clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.tileMode = !1;
    };
  }
}
const $o = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, dp = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
});
class B1 {
  constructor() {
    this.id = "texture-roll", this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0, this.onBegin = (t) => {
      z.getState().clear();
      const n = ge.getState();
      if (n.selectedCount === 0)
        return;
      const s = dp(t);
      if (!n.isSelected(s.x, s.y))
        return;
      const l = this.collectSelection();
      if (!l)
        return;
      this.startCursor = s, this.layerId = ne.getState().activeLayerId, this.dragging = !0, this.didMove = !1, this.selectedPixels = l.pixels, this.rowGroups = l.rows, this.colGroups = l.cols, this.originalPixels = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
      const i = ne.getState();
      for (const o of this.selectedPixels)
        this.originalPixels.set(
          `${o.x}:${o.y}`,
          i.getPixelInLayer(this.layerId, o.x, o.y)
        );
    }, this.onMove = (t) => {
      if (!this.dragging || !this.startCursor)
        return;
      const n = dp(t), s = this.getStepSize(), l = Math.round((n.x - this.startCursor.x) / s) * s, i = Math.round((n.y - this.startCursor.y) / s) * s;
      this.applyOffset(l, i);
    }, this.onEnd = () => {
      if (!this.dragging || !this.layerId)
        return;
      const t = ne.getState(), n = [];
      if (this.didMove)
        for (const s of this.selectedPixels) {
          const l = `${s.x}:${s.y}`, i = this.originalPixels.get(l) ?? 0, o = t.getPixelInLayer(this.layerId, s.x, s.y);
          i !== o && n.push({ x: s.x, y: s.y, prev: i, next: o });
        }
      n.length > 0 && Le.getState().pushBatch({ layerId: this.layerId, changes: n }), z.getState().clear(), this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    }, this.onCancel = () => {
      if (z.getState().clear(), this.dragging && this.layerId) {
        const t = ne.getState(), n = [];
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
    return Ul.getState().snap === "tile" ? pe : 1;
  }
  collectSelection() {
    const t = ge.getState();
    if (t.selectedCount === 0)
      return null;
    const n = t.store.getBlocks(), s = [], l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const { row: o, col: a, block: c } of n) {
      const u = a * Y, d = o * Y;
      for (let f = 0; f < Y; f += 1)
        for (let h = 0; h < Y; h += 1) {
          if (c[f * Y + h] !== 1)
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
    const i = l.length, o = $o(s, i);
    if (o === 0)
      return;
    const a = l.map((c) => t.get(`${c}:${n}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = $o(c - o, i), d = l[c];
      t.set(`${d}:${n}`, a[u] ?? 0);
    }
  }
  rotateCol(t, n, s) {
    const l = this.colGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const i = l.length, o = $o(s, i);
    if (o === 0)
      return;
    const a = l.map((c) => t.get(`${n}:${c}`) ?? 0);
    for (let c = 0; c < i; c += 1) {
      const u = $o(c - o, i), d = l[c];
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
    ne.getState().setPixelsInLayer(this.layerId, a);
  }
}
const js = () => {
  const e = ge.getState();
  if (e.selectedCount === 0)
    return null;
  const t = ne.getState(), n = [];
  let s = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY;
  const a = e.store.getBlocks();
  for (const { row: c, col: u, block: d } of a) {
    const f = u * Y, h = c * Y;
    for (let p = 0; p < Y; p += 1)
      for (let g = 0; g < Y; g += 1) {
        if (d[p * Y + g] !== 1)
          continue;
        const w = f + g, M = h + p, v = t.getPixel(w, M);
        n.push({ x: w, y: M, paletteIndex: v }), s = Math.min(s, w), l = Math.max(l, w), i = Math.min(i, M), o = Math.max(o, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: i, maxY: o };
}, Y1 = 2e3, X1 = 6, Fs = [], Ws = /* @__PURE__ */ new Map();
let zr = !1, hp = 1, Rl = null;
const fr = () => typeof performance < "u" ? performance.now() : Date.now(), gx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(fr()), 0), O1 = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, xx = (e, t) => {
  const n = Math.floor(t / Y), s = Math.floor(e / Y);
  return `${n}:${s}`;
}, F1 = (e, t) => {
  t <= 0 || Ws.set(e, (Ws.get(e) ?? 0) + t);
}, z1 = (e) => {
  const t = (Ws.get(e) ?? 0) - 1;
  t > 0 ? Ws.set(e, t) : Ws.delete(e);
}, yx = () => {
  const e = Fs[0];
  if (!e) {
    Le.getState().setLocked(!1), zr = !1, Rl = null;
    return;
  }
  const t = fr(), n = e.chunkSize, s = e.timeBudgetMs, l = ne.getState();
  for (; Fs[0] === e && e.index < e.changes.length; ) {
    const i = [];
    for (; e.index < e.changes.length && i.length < n; ) {
      const o = e.changes[e.index];
      if (e.index += 1, i.push({ x: o.x, y: o.y, paletteIndex: o.next }), z1(xx(o.x, o.y)), fr() - t > s)
        break;
    }
    if (i.length > 0 && l.setPixelsInLayer(e.layerId, i), e.index >= e.changes.length) {
      Le.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), Fs.shift(), Fs.length === 0 && Le.getState().setLocked(!1);
      break;
    }
    if (fr() - t > s)
      break;
  }
  Rl = gx(yx);
}, H1 = () => {
  zr || (zr = !0, Rl = gx(yx));
}, qi = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  Fs.length === 0 && Le.getState().setLocked(!0);
  const n = String(hp);
  hp += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = ne.getState().activeLayerId, i = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : Y1, o = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : X1;
  Fs.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: i, timeBudgetMs: o });
  const a = /* @__PURE__ */ new Map();
  for (const u of e) {
    const d = xx(u.x, u.y);
    a.set(d, (a.get(d) ?? 0) + 1);
  }
  for (const [u, d] of a.entries())
    F1(u, d);
  H1();
}, W1 = () => Array.from(Ws.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), Ed = () => {
  Fs.length = 0, Ws.clear(), Le.getState().setLocked(!1), zr = !1, Rl !== null && (O1(Rl), Rl = null);
}, vx = () => {
  const e = Ce.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / j),
    minY: Math.floor(e.camera.y / j),
    maxX: Math.floor((e.camera.x + t) / j),
    maxY: Math.floor((e.camera.y + n) / j)
  };
}, U1 = (e) => {
  const t = ge.getState();
  if (t.selectedCount === 0)
    return;
  const n = ne.getState(), s = [], l = t.store.getBlocks();
  for (const { row: i, col: o, block: a } of l) {
    const c = o * Y, u = i * Y;
    for (let d = 0; d < Y; d += 1)
      for (let f = 0; f < Y; f += 1) {
        if (a[d * Y + f] !== 1)
          continue;
        const h = c + f, p = u + d, g = n.getPixel(h, p);
        g !== e && s.push({ x: h, y: p, prev: g, next: e });
      }
  }
  s.length !== 0 && qi(s, { label: "Fill Selection" });
}, $1 = (e, t, n, s) => {
  if (n === s)
    return;
  const l = ge.getState(), i = ne.getState(), o = l.selectedCount > 0, a = o ? null : vx();
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
}, V1 = () => {
  const e = re.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, K1 = (e, t, n) => {
  const s = ge.getState(), l = ne.getState(), i = s.selectedCount > 0, o = i ? null : vx();
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
}, fp = (e, t, n, s, l) => {
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
class G1 {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      z.getState().clear();
      const n = re.getState(), s = wt.getState().mode, l = V1(), i = l.length > 1, o = l[0] ?? n.getActiveIndex(), { gradientDirection: a, gradientDither: c } = wt.getState(), u = Math.floor(t.canvasX / j), d = Math.floor(t.canvasY / j);
      if (s === "selection") {
        if (!i) {
          U1(o);
          return;
        }
        const h = js();
        if (!h)
          return;
        const p = h.pixels.map((g) => ({
          x: g.x,
          y: g.y,
          prev: g.paletteIndex
        }));
        fp(
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
        const h = ne.getState().getPixel(u, d), p = K1(u, d, h);
        if (!p)
          return;
        fp(p.pixels, p.bounds, l, a, c);
        return;
      }
      const f = ne.getState().getPixel(u, d);
      $1(u, d, f, o);
    };
  }
}
const ot = st((e) => ({
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
})), Ge = st((e) => ({
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
})), Q1 = () => {
  const e = ot.getState();
  if (e.pixels.length === 0)
    return !1;
  const t = re.getState(), n = t.colors, s = [...n], l = /* @__PURE__ */ new Map();
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
}, bc = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), Z1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / pe) * pe,
  y: Math.floor(e.y / pe) * pe
} : e, q1 = (e, t, n, s, l, i, o) => {
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
class J1 {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = Ge.getState(), i = Z1(t, l.snap);
      return {
        x: i.x - Math.floor(n / 2),
        y: i.y - Math.floor(s / 2)
      };
    }, this.renderPreview = (t) => {
      const n = z.getState();
      n.clear();
      const s = this.getTransformed();
      if (!s)
        return;
      const l = this.getAnchor(
        bc(t),
        s.width,
        s.height
      ), i = ge.getState(), o = i.selectedCount > 0;
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
      const l = Ge.getState(), i = ge.getState(), o = i.selectedCount > 0, a = ne.getState(), c = this.layerId ?? a.activeLayerId, u = [];
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
      const t = ne.getState(), n = this.layerId ?? t.activeLayerId;
      Le.getState().pushBatch({ layerId: n, changes: Array.from(this.changes.values()) }), this.changes.clear();
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
      this.changes.clear(), this.layerId = ne.getState().activeLayerId, this.lastAnchor = null;
      const n = Ge.getState(), s = n.drag;
      !s && n.pasteDuplicateColors && Q1();
      const l = bc(t);
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
        const n = bc(t);
        this.stampLine(this.lastPoint, n), this.lastPoint = n;
      }
      this.renderPreview(t);
    }, this.onEnd = () => {
      this.dragging && this.flushChanges(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, z.getState().clear();
    }, this.onCancel = () => {
      z.getState().clear(), this.dragging = !1, this.layerId = null, this.lastPoint = null, this.lastAnchor = null, this.changes.clear();
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
    const s = q1(
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
const pp = (e) => {
  const t = Math.floor(e.canvasX / j), n = Math.floor(e.canvasY / j), s = ne.getState().getPixelComposite(t, n), l = re.getState();
  if (e.ctrl) {
    l.setSelectedIndices(
      [...l.selectedIndices.filter((i) => i !== s), s]
    );
    return;
  }
  l.setSelectedIndices([s]);
};
class eS {
  constructor() {
    this.id = "eyedropper", this.onHover = () => {
      z.getState().clear();
    }, this.onBegin = (t) => {
      z.getState().clear(), pp(t);
    }, this.onMove = (t) => {
      pp(t);
    }, this.onCancel = () => {
      z.getState().clear();
    };
  }
}
const tS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, Ut = st((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? tS();
    return we.getState().setDirty(!0), e((i) => ({
      items: [...i.items, { id: l, ...s }],
      selectedId: l
    })), l;
  },
  setSelected: (t) => e({ selectedId: t }),
  updateReference: (t, n) => {
    we.getState().setDirty(!0), e((s) => ({
      items: s.items.map((l) => l.id === t ? { ...l, ...n } : l)
    }));
  },
  removeReference: (t) => {
    we.getState().setDirty(!0), e((n) => ({
      items: n.items.filter((s) => s.id !== t),
      selectedId: n.selectedId === t ? null : n.selectedId
    }));
  },
  clear: () => {
    we.getState().setDirty(!0), e({ items: [], selectedId: null });
  }
})), Hr = st((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), nS = (e) => e * Math.PI / 180, Qn = (e) => {
  const t = e.width * j, n = e.height * j, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, i = t * s, o = n * s;
  return {
    centerX: e.x * j + i / 2,
    centerY: e.y * j + o / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: nS(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Vo = (e, t, n) => {
  const s = Qn(e), l = t * s.scale * s.flipX, i = n * s.scale * s.flipY, o = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * o - i * a,
    y: s.centerY + l * a + i * o
  };
}, sS = (e, t, n) => {
  const s = Qn(e), l = t - s.centerX, i = n - s.centerY, o = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad), c = l * o + i * a, u = -l * a + i * o;
  return {
    x: c * s.flipX / s.scale,
    y: u * s.flipY / s.scale
  };
}, wx = (e) => {
  const { baseWidth: t, baseHeight: n } = Qn(e), s = t / 2, l = n / 2;
  return {
    nw: { x: -s, y: -l },
    ne: { x: s, y: -l },
    se: { x: s, y: l },
    sw: { x: -s, y: l }
  };
}, pa = (e) => {
  const t = wx(e);
  return {
    nw: Vo(e, t.nw.x, t.nw.y),
    ne: Vo(e, t.ne.x, t.ne.y),
    se: Vo(e, t.se.x, t.se.y),
    sw: Vo(e, t.sw.x, t.sw.y)
  };
}, ma = (e) => {
  const t = pa(e), n = Object.values(t), s = n.map((i) => i.x), l = n.map((i) => i.y);
  return {
    minX: Math.min(...s),
    maxX: Math.max(...s),
    minY: Math.min(...l),
    maxY: Math.max(...l)
  };
}, lS = (e, t, n) => {
  const s = sS(e, t, n), { baseWidth: l, baseHeight: i } = Qn(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= i / 2;
}, Ko = (e, t) => Math.round(e / t) * t, mp = (e) => e === "tile" ? pe : 1, iS = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, gp = (e, t, n) => {
  const s = pa(e);
  for (const l of Nw) {
    const i = s[l];
    if (Math.abs(t - i.x) <= $f && Math.abs(n - i.y) <= $f)
      return l;
  }
  return null;
}, xp = (e, t) => {
  const n = wx(e), s = pa(e), l = iS[t], i = Qn(e);
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
class oS {
  constructor() {
    this.id = "reference-handle", this.drag = null, this.onHover = () => {
      this.drag || z.getState().clear();
    }, this.onBegin = (t) => {
      z.getState().clear();
      const { items: n, selectedId: s, setSelected: l } = Ut.getState(), i = t.canvasX, o = t.canvasY, a = s ? n.find((f) => f.id === s) : null;
      if (a) {
        const f = gp(a, i, o);
        if (f) {
          this.drag = xp(a, f);
          return;
        }
      }
      let c = null;
      for (let f = n.length - 1; f >= 0; f -= 1) {
        const h = n[f];
        if (lS(h, i, o)) {
          c = h;
          break;
        }
      }
      if (!c) {
        l(null), this.drag = null;
        return;
      }
      l(c.id);
      const u = gp(c, i, o);
      if (u) {
        this.drag = xp(c, u);
        return;
      }
      const d = Qn(c);
      this.drag = {
        id: c.id,
        mode: "move",
        offsetX: i - d.centerX,
        offsetY: o - d.centerY
      };
    }, this.onMove = (t) => {
      if (!this.drag)
        return;
      const n = Ut.getState(), s = Hr.getState().snap, l = n.items.find((X) => {
        var K;
        return X.id === ((K = this.drag) == null ? void 0 : K.id);
      });
      if (!l) {
        this.drag = null;
        return;
      }
      const i = t.canvasX, o = t.canvasY;
      if (this.drag.mode === "move") {
        const X = Qn(l), K = X.baseWidth * X.scale, ee = X.baseHeight * X.scale, ce = i - this.drag.offsetX, U = o - this.drag.offsetY, Z = mp(s), xe = (ce - K / 2) / j, me = (U - ee / 2) / j, F = Ko(xe, Z), G = Ko(me, Z);
        n.updateReference(l.id, { x: F, y: G });
        return;
      }
      const a = i - this.drag.anchorWorldX, c = o - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), d = Math.sin(this.drag.rotationRad), f = a * u + c * d, h = -a * d + c * u, p = f * this.drag.flipX, g = h * this.drag.flipY, w = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, v = w !== 0 ? Math.abs(p / w) : 0, m = M !== 0 ? Math.abs(g / M) : 0, x = Math.max(v, m), S = Number.isFinite(x) && x > 0 ? x : Qs, b = mp(s) * j, _ = Math.max(
        b,
        Ko(this.drag.baseWidth * S, b)
      ), k = Math.max(
        b,
        Ko(this.drag.baseHeight * S, b)
      );
      let C = Math.max(
        Qs,
        Math.max(_ / this.drag.baseWidth, k / this.drag.baseHeight)
      );
      C = Math.min(C, Hl);
      const R = this.drag.baseWidth * C, D = this.drag.baseHeight * C, P = this.drag.anchorLocal.x * C * this.drag.flipX, A = this.drag.anchorLocal.y * C * this.drag.flipY, H = P * u - A * d, J = P * d + A * u, oe = this.drag.anchorWorldX - H, le = this.drag.anchorWorldY - J, ie = (oe - R / 2) / j, B = (le - D / 2) / j;
      n.updateReference(l.id, { x: ie, y: B, scale: C });
    }, this.onEnd = () => {
      this.drag = null;
    }, this.onCancel = () => {
      this.drag = null;
    };
  }
}
const yp = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, rS = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2,
    zoom: e.camera.zoom
  };
}, vp = (e, t, n) => {
  const s = Ce.getState(), l = n ?? s.camera.zoom, i = s.width, o = s.height;
  if (i <= 0 || o <= 0 || !Number.isFinite(l) || l <= 0)
    return;
  const a = e - i / (2 * l), c = t - o / (2 * l);
  s.setCamera({ x: a, y: c, zoom: l });
}, An = (e, t = 0) => Number.isFinite(e) ? Math.round(e) : t, aS = (e) => !e || typeof e != "object" ? null : e.kind === "camera" ? {
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
  x: An(e.x),
  y: An(e.y),
  width: Math.max(1, An(e.width, 1)),
  height: Math.max(1, An(e.height, 1))
} : null, Ft = st((e, t) => ({
  items: [],
  overlaysVisible: !0,
  addFromCamera: () => e((n) => {
    const s = rS(), l = yp(), i = `Bookmark ${n.items.length + 1}`;
    return we.getState().setDirty(!0), {
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
    const c = yp(), u = a.items.filter((d) => d.kind === "region").length;
    return we.getState().setDirty(!0), {
      items: [
        ...a.items,
        {
          id: c,
          name: o != null && o.trim() ? o.trim() : `Tile Tag ${u + 1}`,
          kind: "region",
          x: An(n),
          y: An(s),
          width: Math.max(1, An(l, 1)),
          height: Math.max(1, An(i, 1))
        }
      ]
    };
  }),
  rename: (n, s) => e((l) => (we.getState().setDirty(!0), {
    items: l.items.map((i) => i.id === n ? { ...i, name: s } : i)
  })),
  setRegionPosition: (n, s, l) => e((i) => {
    let o = !1;
    const a = i.items.map((c) => {
      if (c.id !== n || c.kind !== "region")
        return c;
      const u = An(s), d = An(l);
      return c.x === u && c.y === d ? c : (o = !0, { ...c, x: u, y: d });
    });
    return o ? (we.getState().setDirty(!0), { items: a }) : i;
  }),
  remove: (n) => e((s) => (we.getState().setDirty(!0), { items: s.items.filter((l) => l.id !== n) })),
  move: (n, s) => e((l) => {
    const i = l.items.findIndex((u) => u.id === n);
    if (i === -1)
      return l;
    const o = s === "up" ? i - 1 : i + 1;
    if (o < 0 || o >= l.items.length)
      return l;
    const a = [...l.items], [c] = a.splice(i, 1);
    return a.splice(o, 0, c), we.getState().setDirty(!0), { items: a };
  }),
  jumpTo: (n) => {
    const s = t().items.find((o) => o.id === n);
    if (!s)
      return;
    if (s.kind === "camera") {
      vp(s.centerX, s.centerY, s.zoom);
      return;
    }
    const l = s.x + s.width / 2, i = s.y + s.height / 2;
    vp(l * j, i * j);
  },
  setOverlaysVisible: (n) => e((s) => {
    const l = !!n;
    return s.overlaysVisible === l ? s : (we.getState().setDirty(!0), { overlaysVisible: l });
  }),
  toggleOverlaysVisible: () => e((n) => (we.getState().setDirty(!0), { overlaysVisible: !n.overlaysVisible })),
  setAll: (n, s = !0) => e({
    items: n.map(aS).filter((l) => l !== null),
    overlaysVisible: !!s
  }),
  clear: () => e({ items: [], overlaysVisible: !0 })
})), _c = (e) => ({
  x: Math.floor(e.canvasX / j / pe),
  y: Math.floor(e.canvasY / j / pe)
}), wp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), cS = (e) => {
  const t = z.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * pe, i = n * pe;
      for (let o = 0; o < pe; o += 1)
        for (let a = 0; a < pe; a += 1)
          t.setPixel(l + a, i + o, 1);
    }
}, uS = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class dS {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      z.getState().clear(), this.start = _c(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = _c(t);
      this.last = s, cS(wp(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = t ? _c(t) : this.last ?? this.start, l = wp(this.start, s), i = ne.getState(), o = W.getState(), a = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
      let u = o.activeTileSetId;
      const d = o.tileSets.find((p) => p.id === u);
      let f = (d == null ? void 0 : d.tiles.length) ?? 0;
      if (!d || d.tileWidth !== pe || d.tileHeight !== pe)
        u = o.addTileSet({
          name: `Tile Set ${o.tileSets.length + 1}`,
          tileWidth: pe,
          tileHeight: pe,
          columns: a,
          rows: c,
          tiles: []
        }), f = 0;
      else if (d && d.tiles.length === 0)
        o.setTileSetLayout(d.id, a, c);
      else if (d && d.tiles.length > 0 && (d.columns !== a || d.rows !== c)) {
        uS(
          `Invalid selection: ${d.name} expects ${d.columns}x${d.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const h = [];
      for (let p = l.minTileY; p <= l.maxTileY; p += 1)
        for (let g = l.minTileX; g <= l.maxTileX; g += 1) {
          const w = [], M = g * pe, v = p * pe;
          for (let m = 0; m < pe; m += 1)
            for (let x = 0; x < pe; x += 1)
              w.push(i.getPixelComposite(M + x, v + m));
          h.push({ pixels: w, source: { kind: "canvas", x: M, y: v } });
        }
      u && (o.appendTilesToSet(u, h), o.setSelectedTileIndex(f), o.setTilePage(0), o.setTilePaletteOffset(0), Ft.getState().addRegionTag({
        x: l.minTileX * pe,
        y: l.minTileY * pe,
        width: a * pe,
        height: c * pe
      })), n.clear(), this.start = null, this.last = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const hS = (e) => e.some((t) => t === 0), fS = (e) => e.every((t) => t === 0);
class Wr {
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
    if (t === "hard" || !hS(l))
      return n;
    const i = s >= 0 ? this.tiles[s] : void 0, o = l.map(
      (d, f) => d === 0 ? (i == null ? void 0 : i[f]) ?? 0 : d
    );
    if (fS(o))
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
const pS = 32, Tc = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), mS = (e, t, n, s, l) => {
  const i = z.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, Sp = () => {
  const e = W.getState(), t = e.tileSets.find((l) => l.id === e.activeTileSetId);
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
}, Mp = (e, t) => {
  const n = W.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const o = pS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
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
class gS {
  constructor() {
    this.id = "tile-pen", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = Sp(), !this.activeTile) || (this.placementResolver = new Wr(this.activeTile.tileSetTiles), this.activeMap = Mp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = Tc(t), l = this.toWorldTilePoint(s);
      l && this.applyTile(this.snapWorldPointToCluster(l));
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.erasing = t.alt, this.activeTile = Sp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Wt(), this.placementResolver = new Wr(this.activeTile.tileSetTiles), this.activeMap = Mp(this.activeTile.tileSetId), !this.activeMap) {
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
        s.length > 0 && W.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (W.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Wt();
        Zs(this.historyBefore, s);
      }
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1, this.historyBefore = null;
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
    const i = l.x, o = l.y, a = l.x + n - 1, c = l.y + s - 1, u = W.getState(), d = this.activeMap.columns, f = this.activeMap.originX, h = this.activeMap.originY, p = u.expandTileMapToInclude(
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
        mS(
          x,
          S,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          M
        );
      }
  }
}
const xS = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), yS = (e, t, n, s, l) => {
  const i = z.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
};
class vS {
  constructor() {
    this.id = "tile-stamp", this.drawing = !1, this.historyBefore = null, this.lastPoint = null, this.touchedAnchors = /* @__PURE__ */ new Set(), this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      const n = this.getContext();
      if (!n) {
        z.getState().clear();
        return;
      }
      this.drawing = !0, this.historyBefore = Wt(), this.touchedAnchors.clear();
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
        const t = Wt();
        Zs(this.historyBefore, t);
      }
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), z.getState().clear();
    }, this.onCancel = () => {
      this.historyBefore = null, this.drawing = !1, this.lastPoint = null, this.touchedAnchors.clear(), z.getState().clear();
    };
  }
  getContext() {
    const n = ot.getState().tileBuffer;
    if (!n || n.cols <= 0 || n.rows <= 0 || n.tiles.length === 0)
      return null;
    const s = W.getState(), l = s.tileSets.find((o) => o.id === n.tileSetId);
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
    const s = xS(t);
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
    z.getState().clear();
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
        yS(
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
    const l = t.x * n.tileSet.tileWidth, i = t.y * n.tileSet.tileHeight, o = W.getState(), a = o.expandTileMapToInclude(
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
const wS = 32, kc = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), SS = (e, t, n, s, l) => {
  const i = z.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, bp = () => {
  const e = W.getState(), t = e.tileSets.find((s) => s.id === e.activeTileSetId);
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
}, _p = (e, t) => {
  const n = W.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const o = wS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
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
class MS {
  constructor() {
    this.id = "tile-rectangle", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.seed = 0, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = bp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = _p(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = kc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.applyTileArea(l, l));
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = bp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Wt(), this.resetPlacementResolver(), this.activeMap = _p(this.activeTile.tileSetId), !this.activeMap) {
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
      s && (this.lastWorldPoint = s, this.startWorldPoint && (z.getState().clear(), this.changes.clear(), this.resetPlacementResolver(), this.applyTileArea(this.startWorldPoint, s)));
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      if (this.placementResolver) {
        const s = this.placementResolver.getPendingTiles();
        s.length > 0 && W.getState().appendTilesToSet(this.activeTile.tileSetId, s);
      }
      const t = Array.from(this.changes.entries()).map(([s, l]) => ({
        index: s,
        tile: l
      }));
      if (W.getState().setTileMapTiles(this.activeMap.tileMapId, t), this.historyBefore) {
        const s = Wt();
        Zs(this.historyBefore, s);
      }
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Wr(this.activeTile.tileSetTiles);
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
    const i = l.x, o = l.y, a = l.x + n - 1, c = l.y + s - 1, u = W.getState(), d = this.activeMap.columns, f = this.activeMap.originX, h = this.activeMap.originY, p = u.expandTileMapToInclude(
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
        SS(
          S,
          b,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          x
        );
      }
  }
}
const bS = 1, _S = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), i = bS, o = i, a = i * 2, c = s * (e.tileWidth + a), u = l * (e.tileHeight + a), d = new Uint8ClampedArray(c * u * 4), f = t.map((m) => Mt(m) ?? { r: 0, g: 0, b: 0 }), h = (m, x, S) => {
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
        const R = S.pixels[k * e.tileWidth + C] ?? 0;
        if (R === 0)
          continue;
        const D = f[R] ?? f[0] ?? { r: 0, g: 0, b: 0 }, P = b + o + C, A = _ + o + k;
        h(P, A, D), C === 0 && h(P - 1, A, D), C === e.tileWidth - 1 && h(P + 1, A, D), k === 0 && h(P, A - 1, D), k === e.tileHeight - 1 && h(P, A + 1, D), C === 0 && k === 0 && h(P - 1, A - 1, D), C === 0 && k === e.tileHeight - 1 && h(P - 1, A + 1, D), C === e.tileWidth - 1 && k === 0 && h(P + 1, A - 1, D), C === e.tileWidth - 1 && k === e.tileHeight - 1 && h(P + 1, A + 1, D);
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
}, TS = async (e) => {
  var v;
  if (!((v = window.projectApi) != null && v.exportTileMap))
    return window.alert("Tile export is unavailable. Restart the app to load the latest export support."), null;
  const t = W.getState(), n = t.tileSets.find((m) => m.id === t.activeTileSetId);
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
  }), p = re.getState().colors, g = await _S(n, p, d), w = [];
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
}, Cc = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), jc = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), Tp = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), kS = (e, t, n) => {
  const s = z.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let i = e.minTileX; i <= e.maxTileX; i += 1) {
      const o = i * t, a = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(o + u, a + c, 1);
    }
};
class CS {
  constructor() {
    this.id = "tile-export", this.start = null, this.last = null, this.tileWidth = 0, this.tileHeight = 0, this.onBegin = (t) => {
      z.getState().clear();
      const s = W.getState().tileSets.find(
        (l) => l.id === W.getState().activeTileSetId
      );
      if (!s) {
        this.start = null, this.last = null;
        return;
      }
      this.tileWidth = s.tileWidth, this.tileHeight = s.tileHeight, this.start = jc(Cc(t), this.tileWidth, this.tileHeight), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      z.getState().clear();
      const s = jc(Cc(t), this.tileWidth, this.tileHeight);
      this.last = s, kS(Tp(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = z.getState(), s = t ? jc(Cc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = Tp(this.start, s);
      n.clear(), this.start = null, this.last = null, TS(l);
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const jS = 32, Pc = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), kp = (e, t, n, s, l) => {
  const i = z.getState();
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[o * n + a] ?? 0;
      c !== 0 && i.setPixel(e + a, t + o, c);
    }
}, Cp = () => {
  const e = W.getState(), t = e.tileSets.find((n) => n.id === e.activeTileSetId);
  return t ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    tileSetTiles: t.tiles
  } : null;
}, jp = (e, t) => {
  const n = W.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const o = jS, a = new Array(o * o).fill(-1), c = Math.floor(o / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
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
class PS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.historyBefore = null, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = Cp(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = jp(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = W.getState();
      if (!s.nineSlice) {
        const o = this.readNineSliceFromSelection();
        if (o)
          s.setNineSlice(o);
        else
          return;
      }
      const l = Pc(t), i = this.toWorldTilePoint(l);
      i && this.applyNineSlice(i, i);
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = Cp(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.historyBefore = Wt(), this.resetPlacementResolver(), this.activeMap = jp(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1, this.historyBefore = null;
        return;
      }
      const s = W.getState(), l = !s.nineSlice || t.ctrl;
      this.sampling = l;
      const i = Pc(t), o = this.toWorldTilePoint(i);
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
      const n = Pc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      if (this.lastWorldPoint = s, z.getState().clear(), !this.sampling) {
        this.changes.clear(), this.resetPlacementResolver(), this.applyNineSlice(this.startWorldPoint, s);
        return;
      }
      const i = Math.min(this.startWorldPoint.x, s.x), o = Math.min(this.startWorldPoint.y, s.y);
      this.drawSamplePreview({ x: i, y: o });
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      const t = W.getState();
      if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
        const s = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x), l = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y), i = this.readNineSlice({ x: s, y: l });
        i && t.setNineSlice(i);
      } else if (this.changes.size > 0) {
        if (this.placementResolver) {
          const l = this.placementResolver.getPendingTiles();
          l.length > 0 && W.getState().appendTilesToSet(this.activeTile.tileSetId, l);
        }
        const s = Array.from(this.changes.entries()).map(([l, i]) => ({
          index: l,
          tile: i
        }));
        W.getState().setTileMapTiles(this.activeMap.tileMapId, s);
      }
      if (this.historyBefore) {
        const s = Wt();
        Zs(this.historyBefore, s);
      }
      z.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null, this.historyBefore = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Wr(this.activeTile.tileSetTiles);
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
    const u = W.getState().expandTileMapToInclude(
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
    const l = W.getState().tileMaps.find(
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
    const t = W.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
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
    const l = W.getState().tileMaps.find(
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
        kp(
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
    const l = W.getState().nineSlice;
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
        const C = v * d + M, R = this.resolvePlacedTileIndex(k, C);
        this.drawing && this.changes.set(C, R);
        const D = this.getTilePixels(R);
        if (!D)
          continue;
        const P = w * this.activeTile.tileWidth, A = g * this.activeTile.tileHeight;
        kp(
          P,
          A,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          D
        );
      }
  }
}
class NS {
  constructor() {
    this.id = "text";
  }
}
class IS {
  constructor() {
    this.id = "ai";
  }
}
const ES = () => {
  const e = Ce.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / j),
    minY: Math.floor(e.camera.y / j),
    maxX: Math.floor((e.camera.x + t) / j),
    maxY: Math.floor((e.camera.y + n) / j)
  };
}, RS = (e) => ({
  x: Math.floor(e.canvasX / j),
  y: Math.floor(e.canvasY / j)
}), AS = (e, t, n, s) => {
  const l = ne.getState(), i = /* @__PURE__ */ new Set(), o = [e], a = [t], c = [];
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
class LS {
  constructor() {
    this.id = "magic-wand", this.onBegin = (t) => {
      const n = ES();
      if (!n)
        return;
      const { x: s, y: l } = RS(t);
      if (s < n.minX || s > n.maxX || l < n.minY || l > n.maxY)
        return;
      const i = ne.getState().getPixel(s, l), { pixels: o, touchesBoundary: a } = AS(s, l, i, n);
      if (o.length === 0 || i === 0 && a)
        return;
      const c = !t.ctrl;
      ge.getState().setSelections(o.map((u) => ({ x: u.x, y: u.y, selected: c })));
    };
  }
}
const jt = st((e) => ({
  activeTool: "pen",
  setActiveTool: (t) => e({ activeTool: t })
})), Go = (e, t, n) => Math.min(n, Math.max(t, e)), DS = ({ x: e, y: t, onClose: n }) => {
  const s = jt((S) => S.activeTool), l = mn((S) => S.size), i = mn((S) => S.shape), o = Zt((S) => S.radius), a = Zt((S) => S.density), c = wt((S) => S.mode), u = ge((S) => S.selectedCount), d = T.useRef(null), [f, h] = T.useState({ x: e, y: t }), p = T.useMemo(() => Bw[s] ?? "Tools", [s]);
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
    const S = d.current.getBoundingClientRect(), b = 8, _ = Math.max(b, window.innerWidth - S.width - b), k = Math.max(b, window.innerHeight - S.height - b), C = Go(e, b, _), R = Go(t, b, k);
    h({ x: C, y: R });
  }, [e, t]);
  const g = (S) => mn.getState().setSize(S), w = (S) => mn.getState().setShape(S), M = (S) => Zt.getState().setRadius(S), v = (S) => Zt.getState().setDensity(S), m = (S) => wt.getState().setMode(S), x = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
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
              ge.getState().clear(), n();
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
              onClick: () => g(Go(l - 1, 1, 64)),
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
              onClick: () => g(Go(l + 1, 1, 64)),
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
}, BS = (e) => new Promise((t, n) => {
  const s = new FileReader();
  s.onerror = () => n(new Error("Failed to read image file")), s.onload = () => t(s.result), s.readAsDataURL(e);
}), YS = (e) => new Promise((t, n) => {
  const s = new Image();
  s.onload = () => t(s), s.onerror = () => n(new Error("Failed to load image")), s.src = e;
}), Sx = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), XS = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : Sx(t[t.length - 1]);
}, Mx = (e, t) => {
  const n = XS(e.name ?? "");
  return n || Sx(Dw[t] ?? t.split("/")[1] ?? "");
}, OS = (e, t) => e || (t && Gf[t] ? Gf[t] : "image/png"), FS = (e, t) => {
  const n = Mx(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, bx = () => {
  const e = Ce.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, zS = (e, t, n) => Math.min(n, Math.max(t, e)), HS = (e) => {
  const t = Ce.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * j, i = e.naturalHeight * j, o = Math.min(n / l, s / i) * 0.9;
  return zS(o, Qs, Hl);
}, WS = (e) => ({
  x: Math.floor(e.x / j),
  y: Math.floor(e.y / j)
}), _x = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = Mx(e, n), l = OS(n, s), [i, o] = await Promise.all([BS(e), e.arrayBuffer()]), a = await YS(i), c = t ?? bx(), u = WS(c), d = HS(a), f = FS(e, l);
  Ut.getState().addReference({
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
}, US = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? bx();
  for (let l = 0; l < n.length; l += 1) {
    const i = l * j * 2, o = { x: s.x + i, y: s.y + i };
    await _x(n[l], o);
  }
}, Pp = (e, t, n, s, l, i, o) => {
  e.strokeStyle = o, e.lineWidth = 1;
  const a = Math.floor(t / i) * i, c = t + s;
  for (let f = a; f <= c; f += i)
    e.beginPath(), e.moveTo(f + 0.5, n), e.lineTo(f + 0.5, n + l), e.stroke();
  const u = Math.floor(n / i) * i, d = n + l;
  for (let f = u; f <= d; f += i)
    e.beginPath(), e.moveTo(t, f + 0.5), e.lineTo(t + s, f + 0.5), e.stroke();
}, $S = (e, t, n, s, l, i, o) => {
  const a = W1();
  if (a.length !== 0) {
    e.save(), e.fillStyle = i, e.strokeStyle = o, e.lineWidth = Math.max(1, j * 0.08);
    for (const c of a) {
      const u = c.col * Y * j, d = c.row * Y * j, f = u + Y * j, h = d + Y * j;
      f < t || h < n || u > t + s || d > n + l || (e.fillRect(u, d, Y * j, Y * j), e.strokeRect(
        u + 0.5,
        d + 0.5,
        Y * j - 1,
        Y * j - 1
      ));
    }
    e.restore();
  }
}, VS = (e, t, n, s, l, i) => {
  e.strokeStyle = i, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, KS = (e, t, n, s, l) => {
  var a;
  const i = Ft.getState();
  if (!i.overlaysVisible)
    return;
  const o = i.items.filter((c) => c.kind === "region");
  if (o.length !== 0) {
    e.save(), e.lineWidth = 1.5, e.font = '11px "Segoe UI", "Helvetica Neue", sans-serif';
    for (const c of o) {
      const u = c.x * j, d = c.y * j, f = Math.max(1, c.width) * j, h = Math.max(1, c.height) * j, p = u + f, g = d + h;
      if (p < t || g < n || u > t + s || d > n + l)
        continue;
      e.fillStyle = "rgba(66, 197, 255, 0.16)", e.strokeStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, d, f, h), e.strokeRect(u + 0.5, d + 0.5, Math.max(0, f - 1), Math.max(0, h - 1));
      const w = ((a = c.name) == null ? void 0 : a.trim()) || "Tile Tag", M = e.measureText(w).width, v = 5, m = 16, x = Math.max(36, Math.ceil(M + v * 2));
      e.fillStyle = "rgba(66, 197, 255, 0.85)", e.fillRect(u, d - m, x, m), e.fillStyle = "rgba(5, 12, 18, 0.95)", e.fillText(w, u + v, d - 4);
    }
    e.restore();
  }
}, GS = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, Tx = (e, t) => {
  const n = document.createElement("canvas");
  n.width = Y * j, n.height = Y * j;
  const s = n.getContext("2d");
  if (!s)
    return null;
  s.imageSmoothingEnabled = !1;
  let l = 0;
  for (let i = 0; i < Y; i += 1)
    for (let o = 0; o < Y; o += 1) {
      const a = e[i * Y + o];
      a !== 0 && (l += 1, s.fillStyle = t[a] ?? t[0], s.fillRect(o * j, i * j, j, j));
    }
  return { canvas: n, pixels: l };
}, QS = (e, t, n, s) => {
  const l = document.createElement("canvas");
  l.width = n * j, l.height = s * j;
  const i = l.getContext("2d");
  if (!i)
    return null;
  i.imageSmoothingEnabled = !1;
  for (let o = 0; o < s; o += 1)
    for (let a = 0; a < n; a += 1) {
      const c = e[o * n + a] ?? 0;
      c !== 0 && (i.fillStyle = t[c] ?? t[0], i.fillRect(a * j, o * j, j, j));
    }
  return { canvas: l };
}, ZS = (e, t, n, s, l, i, o) => {
  const a = ne.getState();
  let c = 0, u = 0;
  for (const d of a.layers) {
    if (!d.visible)
      continue;
    const f = d.store.getBlocks();
    for (const { row: h, col: p, block: g } of f) {
      const w = p * Y, M = h * Y, v = w * j, m = M * j, x = v + Y * j, S = m + Y * j;
      if (x < t || S < n || v > t + s || m > n + l)
        continue;
      c += 1;
      const b = `${d.id}:${h}:${p}`;
      let _ = o.get(b);
      if (!_) {
        const k = Tx(g, i);
        k && (_ = k, o.set(b, k));
      }
      _ && (u += _.pixels, e.drawImage(_.canvas, v, m));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, qS = (e) => {
  const t = document.createElement("canvas");
  t.width = Y * j, t.height = Y * j;
  const n = t.getContext("2d");
  if (!n)
    return null;
  n.imageSmoothingEnabled = !1, n.fillStyle = "#ffffff";
  let s = !1;
  for (let l = 0; l < Y; l += 1)
    for (let i = 0; i < Y; i += 1)
      e[l * Y + i] === 1 && (n.fillRect(i * j, l * j, j, j), s = !0);
  return s ? { canvas: t } : null;
}, JS = (e, t, n, s, l, i, o) => {
  if (o) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [a, c] of i.entries()) {
      const [u, d] = a.split(":"), f = Number(u), p = Number(d) * Y * j, g = f * Y * j, w = p + Y * j, M = g + Y * j;
      w < t || M < n || p > t + s || g > n + l || e.drawImage(c.canvas, p, g);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [a, c] of i.entries()) {
      const [u, d] = a.split(":"), f = Number(u), p = Number(d) * Y * j, g = f * Y * j, w = p + Y * j, M = g + Y * j;
      w < t || M < n || p > t + s || g > n + l || e.drawImage(c.canvas, p, g);
    }
    e.restore();
  }
}, eM = (e, t, n, s, l) => {
  const i = ge.getState();
  if (i.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const o = i.store.getBlocks();
  for (const { row: a, col: c, block: u } of o) {
    const d = c * Y, f = a * Y, h = d * j, p = f * j, g = h + Y * j, w = p + Y * j;
    if (!(g < t || w < n || h > t + s || p > n + l))
      for (let M = 0; M < Y; M += 1)
        for (let v = 0; v < Y; v += 1) {
          if (u[M * Y + v] !== 1)
            continue;
          const m = d + v, x = f + M;
          i.isSelected(m - 1, x) && i.isSelected(m + 1, x) && i.isSelected(m, x - 1) && i.isSelected(m, x + 1) || (m + x) % 2 === 0 && e.fillRect(
            m * j,
            x * j,
            j,
            j
          );
        }
  }
  e.restore();
}, tM = (e, t, n, s, l, i, o) => {
  const { tileSets: a, tileMaps: c } = W.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / j, d = n / j, f = u + s / j, h = d + l / j, p = new Map(a.map((g) => [g.id, g]));
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
    const C = Math.max(0, Math.floor((u - S) / M)), R = Math.min(
      g.columns - 1,
      Math.ceil((f - S) / M) - 1
    ), D = Math.max(0, Math.floor((d - b) / v)), P = Math.min(
      g.rows - 1,
      Math.ceil((h - b) / v) - 1
    );
    if (!(R < C || P < D))
      for (let A = D; A <= P; A += 1)
        for (let H = C; H <= R; H += 1) {
          const J = A * g.columns + H, oe = g.tiles[J] ?? -1;
          if (oe < 0)
            continue;
          const le = w.tiles[oe];
          if (!le)
            continue;
          const ie = `${w.id}:${oe}`;
          let B = o.get(ie);
          if (!B) {
            const X = QS(
              le.pixels,
              i,
              M,
              v
            );
            X && (B = X, o.set(ie, X));
          }
          B && e.drawImage(
            B.canvas,
            (S + H * M) * j,
            (b + A * v) * j
          );
        }
  }
}, nM = (e, t, n, s, l, i, o) => {
  const { tileSets: a, tileMaps: c } = W.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / j, d = n / j, f = u + s / j, h = d + l / j, p = new Map(a.map((g) => [g.id, g]));
  e.save(), e.fillStyle = i, e.strokeStyle = o, e.lineWidth = Math.max(1, j * 0.08);
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
    const C = Math.max(0, Math.floor((u - S) / M)), R = Math.min(
      g.columns - 1,
      Math.ceil((f - S) / M) - 1
    ), D = Math.max(0, Math.floor((d - b) / v)), P = Math.min(
      g.rows - 1,
      Math.ceil((h - b) / v) - 1
    );
    if (!(R < C || P < D))
      for (let A = D; A <= P; A += 1)
        for (let H = C; H <= R; H += 1) {
          const J = A * g.columns + H;
          if ((g.tiles[J] ?? -1) < 0)
            continue;
          const le = (S + H * M) * j, ie = (b + A * v) * j, B = M * j, X = v * j;
          e.fillRect(le, ie, B, X), e.strokeRect(le + 0.5, ie + 0.5, B - 1, X - 1);
        }
  }
  e.restore();
}, sM = (e, t, n) => {
  const s = z.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * j,
      l.y * j,
      j,
      j
    );
}, lM = (e, t, n, s, l) => {
  const i = Ut.getState().items;
  if (i.length !== 0)
    for (const o of i) {
      const a = ma(o);
      if (a.maxX < t || a.maxY < n || a.minX > t + s || a.minY > n + l)
        continue;
      const c = Qn(o);
      e.save(), e.globalAlpha = o.opacity, e.translate(c.centerX, c.centerY), e.rotate(c.rotationRad), e.scale(c.scale * c.flipX, c.scale * c.flipY), e.drawImage(
        o.image,
        -c.baseWidth / 2,
        -c.baseHeight / 2,
        c.baseWidth,
        c.baseHeight
      ), e.restore();
    }
}, iM = (e, t, n, s, l) => {
  const { items: i, selectedId: o } = Ut.getState();
  if (!o)
    return;
  const a = i.find((p) => p.id === o);
  if (!a)
    return;
  const c = ma(a);
  if (c.maxX < t || c.maxY < n || c.minX > t + s || c.minY > n + l)
    return;
  const u = j * 0.6, d = u / 2, f = pa(a), h = Object.values(f);
  e.save(), e.strokeStyle = "rgba(245, 197, 66, 0.85)", e.lineWidth = Math.max(1, j * 0.08), e.beginPath(), e.moveTo(f.nw.x, f.nw.y), e.lineTo(f.ne.x, f.ne.y), e.lineTo(f.se.x, f.se.y), e.lineTo(f.sw.x, f.sw.y), e.closePath(), e.stroke(), e.fillStyle = "rgba(245, 197, 66, 0.9)";
  for (const p of h)
    e.fillRect(p.x - d, p.y - d, u, u);
  e.restore();
}, oM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = T.useRef(null), s = T.useRef(null), l = T.useRef(/* @__PURE__ */ new Map()), i = T.useRef(/* @__PURE__ */ new Map()), o = T.useRef(/* @__PURE__ */ new Map()), a = T.useRef(0), c = Ce((P) => P.setSize), [u, d] = T.useState(!1), [f, h] = T.useState({ open: !1, x: 0, y: 0 }), p = T.useRef(null), g = T.useRef({ remainingLogDelta: 0, anchor: null, frame: null });
  T.useEffect(() => {
    const P = e.current, A = t.current, H = g.current;
    if (!P || !A)
      return;
    c(P.clientWidth, P.clientHeight), s.current = new Fw();
    const J = {
      pen: new t1(),
      spray: new i1(),
      line: new v1(),
      rectangle: new M1(),
      oval: new T1(),
      "fill-bucket": new G1(),
      text: new NS(),
      ai: new IS(),
      eyedropper: new eS(),
      "reference-handle": new oS(),
      stamp: new J1(),
      "magic-wand": new LS(),
      "selection-rect": new P1(),
      "selection-oval": new E1(),
      "selection-lasso": new D1(),
      "texture-roll": new B1(),
      "tile-sampler": new dS(),
      "tile-pen": new gS(),
      "tile-stamp": new vS(),
      "tile-rectangle": new MS(),
      "tile-9slice": new PS(),
      "tile-export": new CS()
    }, oe = J[jt.getState().activeTool] ?? J.pen;
    s.current.setTool(oe);
    const le = jt.subscribe((ce) => {
      var U;
      (U = s.current) == null || U.setTool(J[ce.activeTool] ?? J.pen);
    }), ie = re.subscribe(() => {
      l.current.clear(), o.current.clear();
    }), B = ge.subscribe(() => {
      i.current.clear();
    }), X = W.subscribe(() => {
      o.current.clear();
    }), K = () => {
      var rt;
      const ce = performance.now(), U = Ce.getState();
      if (U.width === 0 || U.height === 0)
        return;
      const Z = GS(A, U.width, U.height);
      if (!Z)
        return;
      const xe = window.devicePixelRatio || 1;
      Z.clearRect(0, 0, U.width, U.height);
      const me = re.getState().colors, F = me[0] ?? "#000000", G = Mt(F) ?? { r: 0, g: 0, b: 0 }, N = ha(G, da(G)), $ = un(N, 0.08), se = un(N, 0.18), de = un(N, 0.5), Ze = un(N, 0.08), be = un(N, 0.35), Fe = un(N, 0.2), ze = un(N, 0.5);
      Z.fillStyle = F, Z.fillRect(0, 0, U.width, U.height), Z.save(), Z.setTransform(
        U.camera.zoom * xe,
        0,
        0,
        U.camera.zoom * xe,
        -U.camera.x * U.camera.zoom * xe,
        -U.camera.y * U.camera.zoom * xe
      );
      const _e = U.width / U.camera.zoom, Ie = U.height / U.camera.zoom, { dirtyAll: Se, blocks: pt } = ne.getState().consumeDirtyBlocks();
      Se && l.current.clear();
      for (const je of pt) {
        const qe = `${je.layerId}:${je.row}:${je.col}`, sn = ne.getState().layers.find((Ps) => Ps.id === je.layerId), Nt = sn == null ? void 0 : sn.store.getBlock(je.row, je.col);
        if (!Nt) {
          l.current.delete(qe);
          continue;
        }
        const Jn = Tx(Nt, me);
        Jn && l.current.set(qe, Jn);
      }
      (Se || pt.length > 0) && W.getState().refreshCanvasSourcedTiles(
        Se,
        pt.map((je) => ({ row: je.row, col: je.col }))
      );
      const $e = ge.getState(), Bt = $e.consumeDirtyBlocks();
      Bt.dirtyAll && i.current.clear();
      for (const je of Bt.blocks) {
        const qe = `${je.row}:${je.col}`, sn = $e.store.getBlock(je.row, je.col);
        if (!sn) {
          i.current.delete(qe);
          continue;
        }
        const Nt = qS(sn);
        Nt ? i.current.set(qe, Nt) : i.current.delete(qe);
      }
      const mt = Ae.getState();
      mt.showReferenceLayer && lM(Z, U.camera.x, U.camera.y, _e, Ie);
      let wn = 0, In = 0;
      if (mt.showPixelLayer) {
        const je = ZS(
          Z,
          U.camera.x,
          U.camera.y,
          _e,
          Ie,
          me,
          l.current
        );
        wn = je.blocksDrawn, In = je.pixelsDrawn;
      }
      const qn = qs.getState().mode;
      qn === "pixel" && !mt.showTileLayer && nM(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        Fe,
        ze
      ), mt.showTileLayer && tM(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        me,
        o.current
      ), $S(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        Ze,
        be
      ), JS(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        i.current,
        $e.selectedCount > 0
      ), eM(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie
      ), qn === "pixel" && KS(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie
      ), mt.showTileLayer && W.getState().tileDebugOverlay && rM(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie
      ), mt.showPixelGrid && Pp(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        j,
        $
      ), mt.showTileGrid && Pp(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie,
        j * pe,
        se
      ), mt.showAxes && VS(Z, U.camera.x, U.camera.y, _e, Ie, de);
      const Yt = jt.getState().activeTool;
      sM(Z, me, Yt === "selection-rect" || Yt === "selection-oval" || Yt === "selection-lasso" || Yt === "texture-roll" || Yt === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), Yt === "reference-handle" && iM(
        Z,
        U.camera.x,
        U.camera.y,
        _e,
        Ie
      ), Z.restore();
      const Yn = performance.now(), he = Yn - ce;
      he > 50 && Yn - a.current > 500 && (a.current = Yn, (rt = window.debugApi) == null || rt.logPerf(
        [
          "viewport:render",
          `ms=${he.toFixed(2)}`,
          `zoom=${U.camera.zoom.toFixed(2)}`,
          `view=${_e.toFixed(1)}x${Ie.toFixed(1)}`,
          `blocks=${wn}`,
          `pixels=${In}`
        ].join(" ")
      )), n.current = requestAnimationFrame(K);
    };
    n.current = requestAnimationFrame(K);
    const ee = new ResizeObserver((ce) => {
      for (const U of ce)
        c(U.contentRect.width, U.contentRect.height);
    });
    return ee.observe(P), () => {
      le(), ie(), B(), X(), ee.disconnect(), n.current && cancelAnimationFrame(n.current), H.frame && (cancelAnimationFrame(H.frame), H.frame = null);
    };
  }, [c]);
  const w = (P) => {
    const A = P.currentTarget.getBoundingClientRect(), H = P.clientX - A.left, J = P.clientY - A.top, oe = Ce.getState();
    return {
      screenX: H,
      screenY: J,
      canvasX: H / oe.camera.zoom + oe.camera.x,
      canvasY: J / oe.camera.zoom + oe.camera.y,
      primary: (P.buttons & 1) === 1,
      alt: P.altKey,
      ctrl: P.ctrlKey,
      shift: P.shiftKey
    };
  }, M = (P) => {
    P.preventDefault(), P.currentTarget.setPointerCapture(P.pointerId);
    const A = Ce.getState();
    p.current = {
      screenX: P.clientX,
      screenY: P.clientY,
      cameraX: A.camera.x,
      cameraY: A.camera.y,
      zoom: A.camera.zoom
    }, d(!0), z.getState().clear();
  }, v = (P) => {
    const A = p.current;
    if (!A)
      return;
    const H = P.clientX - A.screenX, J = P.clientY - A.screenY, oe = A.cameraX - H / A.zoom, le = A.cameraY - J / A.zoom;
    Ce.getState().panTo(oe, le);
  }, m = (P) => {
    p.current = null, d(!1), P.currentTarget.releasePointerCapture(P.pointerId);
  }, x = (P) => {
    var H;
    if (P.button === 1) {
      M(P);
      return;
    }
    if (P.button === 2)
      return;
    const A = w(P);
    P.currentTarget.setPointerCapture(P.pointerId), (H = s.current) == null || H.handleEvent("begin", A);
  }, S = (P) => {
    var J;
    if (p.current) {
      v(P);
      return;
    }
    const A = w(P), H = (P.buttons & 1) === 1;
    (J = s.current) == null || J.handleEvent(H ? "move" : "hover", A);
  }, b = (P) => {
    var H;
    if (p.current) {
      m(P);
      return;
    }
    const A = w(P);
    (H = s.current) == null || H.handleEvent("end", A), P.currentTarget.releasePointerCapture(P.pointerId);
  }, _ = (P) => {
    var H;
    if (p.current) {
      m(P);
      return;
    }
    const A = w(P);
    (H = s.current) == null || H.handleEvent("cancel", A);
  }, k = (P) => {
    var A;
    (A = P.dataTransfer) != null && A.types.includes("Files") && (P.preventDefault(), P.dataTransfer.dropEffect = "copy");
  }, C = (P) => {
    var ie, B;
    if (!((B = (ie = P.dataTransfer) == null ? void 0 : ie.files) != null && B.length))
      return;
    P.preventDefault();
    const A = P.currentTarget.getBoundingClientRect(), H = P.clientX - A.left, J = P.clientY - A.top, oe = Ce.getState(), le = {
      x: H / oe.camera.zoom + oe.camera.x,
      y: J / oe.camera.zoom + oe.camera.y
    };
    US(Array.from(P.dataTransfer.files), le);
  }, R = (P) => {
    if (P.deltaY === 0)
      return;
    P.preventDefault();
    const A = P.currentTarget.getBoundingClientRect(), H = P.clientX - A.left, J = P.clientY - A.top, oe = Ce.getState(), le = {
      x: H / oe.camera.zoom + oe.camera.x,
      y: J / oe.camera.zoom + oe.camera.y
    }, ie = P.deltaMode === 1 ? 16 : P.deltaMode === 2 ? Math.max(240, oe.height) : 1;
    let X = -(P.deltaY * ie) * Pw;
    if (X > ci ? X = ci : X < -ci && (X = -ci), g.current.remainingLogDelta += X, g.current.anchor = le, g.current.frame)
      return;
    const K = () => {
      const ee = g.current, ce = ee.remainingLogDelta;
      if (!Number.isFinite(ce) || Math.abs(ce) < 5e-4) {
        ee.remainingLogDelta = 0, ee.frame = null;
        return;
      }
      const U = ce * 0.35, xe = Math.max(1e-3, ci * 0.25), me = Math.sign(U) * Math.min(Math.abs(U), xe), F = Ce.getState(), G = F.camera.zoom, $ = G * Math.exp(me) - G;
      if (!Number.isFinite($) || Math.abs($) < 1e-12) {
        ee.remainingLogDelta = 0, ee.frame = null;
        return;
      }
      F.zoomBy($, ee.anchor ?? void 0), ee.remainingLogDelta -= me, ee.frame = requestAnimationFrame(K);
    };
    g.current.frame = requestAnimationFrame(K);
  }, D = (P) => {
    P.preventDefault(), h({ open: !0, x: P.clientX, y: P.clientY });
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ r.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: x,
        onPointerMove: S,
        onPointerUp: b,
        onPointerLeave: _,
        onContextMenu: D,
        onDragOver: k,
        onDrop: C,
        onWheel: R,
        style: {
          cursor: u ? "grabbing" : "crosshair"
        }
      }
    ),
    f.open && /* @__PURE__ */ r.jsx(
      DS,
      {
        x: f.x,
        y: f.y,
        onClose: () => h((P) => P.open ? { ...P, open: !1 } : P)
      }
    )
  ] });
}, rM = (e, t, n, s, l) => {
  const { tileMaps: i } = W.getState();
  if (i.length !== 0) {
    e.save(), e.font = `${Math.max(10, j)}px sans-serif`, e.textBaseline = "top", e.fillStyle = "rgba(255, 186, 73, 0.95)", e.strokeStyle = "rgba(255, 186, 73, 0.5)", e.lineWidth = Math.max(1, j * 0.06);
    for (const o of i) {
      const a = o.originX * j, c = o.originY * j, u = o.columns * j, d = o.rows * j, f = a + u, h = c + d;
      f < t || h < n || a > t + s || c > n + l || (e.strokeRect(a, c, u, d), e.fillText(
        `map ${o.id.slice(0, 6)} origin=(${o.originX},${o.originY}) size=${o.columns}x${o.rows}`,
        a + j * 0.5,
        c + j * 0.5
      ));
    }
    e.restore();
  }
}, aM = () => {
  const e = ne.getState();
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  for (const i of e.layers)
    for (const { row: o, col: a, block: c } of i.store.getBlocks())
      for (let u = 0; u < Y; u += 1)
        for (let d = 0; d < Y; d += 1) {
          if (c[u * Y + d] === 0)
            continue;
          const h = (a * Y + d) * j, p = (o * Y + u) * j;
          t = Math.min(t, h), n = Math.min(n, p), s = Math.max(s, h + j), l = Math.max(l, p + j);
        }
  return Number.isFinite(t) ? { minX: t, minY: n, maxX: s, maxY: l } : null;
}, cM = () => {
  const e = Ce.getState(), t = aM();
  let n = t ? t.minX : -is / 2, s = t ? t.minY : -is / 2, l = t ? t.maxX : is / 2, i = t ? t.maxY : is / 2;
  if (e.width > 0 && e.height > 0) {
    const c = e.width / e.camera.zoom, u = e.height / e.camera.zoom;
    n = Math.min(n, e.camera.x), s = Math.min(s, e.camera.y), l = Math.max(l, e.camera.x + c), i = Math.max(i, e.camera.y + u);
  }
  const o = l - n, a = i - s;
  if (o < is) {
    const c = (is - o) / 2;
    n -= c, l += c;
  }
  if (a < is) {
    const c = (is - a) / 2;
    s -= c, i += c;
  }
  return { minX: n, minY: s, maxX: l, maxY: i };
}, kx = (e, t) => {
  const n = cM(), s = n.maxX - n.minX, l = n.maxY - n.minY, i = Math.min(e / s, t / l), o = (e - s * i) / 2 - n.minX * i, a = (t - l * i) / 2 - n.minY * i;
  return { bounds: n, scale: i, offsetX: o, offsetY: a };
}, uM = (e, t, n) => {
  const s = Ce.getState(), l = re.getState().colors, i = l[0] ?? "#000000", o = Mt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(o, da(o)), c = Id(ds(o, a, 0.08)), u = un(a, 0.12), d = un(a, 0.6), f = un(a, 0.8), { bounds: h, scale: p, offsetX: g, offsetY: w } = kx(t, n), M = h.maxX - h.minX, v = h.maxY - h.minY;
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
  const S = ne.getState();
  let b = 0, _ = 0;
  if (Ae.getState().showPixelLayer) {
    const k = p * j, C = Math.max(1, Math.floor(1 / Math.max(k * 0.75, 0.01)));
    for (const R of S.layers)
      if (R.visible)
        for (const { row: D, col: P, block: A } of R.store.getBlocks()) {
          b += 1;
          for (let H = 0; H < Y; H += C)
            for (let J = 0; J < Y; J += C) {
              const oe = A[H * Y + J];
              if (oe === 0)
                continue;
              _ += 1;
              const le = (P * Y + J) * j, ie = (D * Y + H) * j;
              e.fillStyle = l[oe] ?? l[0];
              const B = Math.max(1, k * C);
              e.fillRect(
                g + le * p,
                w + ie * p,
                B,
                B
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const k = s.width / s.camera.zoom, C = s.height / s.camera.zoom, R = s.camera.x * p + g, D = s.camera.y * p + w, P = k * p, A = C * p;
    e.strokeStyle = f, e.lineWidth = 2, e.strokeRect(R, D, P, A);
  }
  return { blocksDrawn: b, pixelsDrawn: _, zoom: s.camera.zoom };
}, dM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, hM = () => {
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
      var B;
      const P = dM(S, x.clientWidth, x.clientHeight);
      if (!P)
        return;
      const A = performance.now(), { blocksDrawn: H, pixelsDrawn: J, zoom: oe } = uM(
        P,
        x.clientWidth,
        x.clientHeight
      ), le = performance.now(), ie = le - A;
      ie > 50 && le - i.current > 500 && (i.current = le, (B = window.debugApi) == null || B.logPerf(
        [
          "minimap:render",
          `ms=${ie.toFixed(2)}`,
          `zoom=${oe.toFixed(2)}`,
          `blocks=${H}`,
          `pixels=${J}`
        ].join(" ")
      ));
    };
    b();
    const _ = Ce.subscribe(b), k = ne.subscribe(b), C = re.subscribe(b), R = Ae.subscribe(b), D = new ResizeObserver(b);
    return D.observe(x), () => {
      _(), k(), C(), R(), D.disconnect();
    };
  }, []);
  const w = (x) => {
    const S = x.currentTarget.getBoundingClientRect(), b = x.clientX - S.left, _ = x.clientY - S.top, { scale: k, offsetX: C, offsetY: R } = kx(S.width, S.height);
    return {
      x: (b - C) / k,
      y: (_ - R) / k
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
      const R = Ce.getState().camera, D = s.current.x - R.x, P = s.current.y - R.y, A = Math.hypot(D, P);
      if (A > 0.01) {
        const J = Math.min(12, A * 0.25);
        o(
          R.x + D / A * J,
          R.y + P / A * J
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
}, fM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, pM = (e, t, n) => {
  const s = ot.getState(), l = re.getState().colors, i = l[0] ?? "#000000", o = Mt(i) ?? { r: 0, g: 0, b: 0 }, a = ha(o, da(o)), c = Id(ds(o, a, 0.1)), u = un(a, 0.12);
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
}, mM = () => {
  const e = T.useRef(null), t = T.useRef(null), n = ot((s) => s);
  return T.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const i = () => {
      const u = fM(l, s.clientWidth, s.clientHeight);
      u && pM(u, s.clientWidth, s.clientHeight);
    };
    i();
    const o = ot.subscribe(i), a = re.subscribe(i), c = new ResizeObserver(i);
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
}, Qo = (e) => Math.round(e / j), gM = (e, t) => {
  const n = Ce.getState(), s = n.camera.zoom, l = n.width, i = n.height;
  if (l <= 0 || i <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const o = e - l / (2 * s), a = t - i / (2 * s);
  n.setCamera({ x: o, y: a });
}, xM = () => {
  const e = Ft((d) => d.items), t = Ft((d) => d.addFromCamera), n = Ft((d) => d.rename), s = Ft((d) => d.remove), l = Ft((d) => d.move), i = Ft((d) => d.jumpTo), o = Ft((d) => d.overlaysVisible), a = Ft((d) => d.toggleOverlaysVisible), c = Ut((d) => d.items), u = T.useMemo(
    () => c.map((d) => {
      const f = ma(d), h = (f.minX + f.maxX) / 2, p = (f.minY + f.maxY) / 2;
      return {
        id: d.id,
        name: d.assetFilename,
        centerX: h,
        centerY: p,
        x: Qo(h),
        y: Qo(p)
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
          /* @__PURE__ */ r.jsx("div", { className: "nav-panel__coords", children: d.kind === "camera" ? `${Qo(d.centerX)},${Qo(d.centerY)} • z${d.zoom.toFixed(2)}` : `${d.x},${d.y} • ${d.width}x${d.height}` })
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
            onClick: () => gM(d.centerX, d.centerY),
            children: "Go"
          }
        ) })
      ] }, d.id)) })
    ] })
  ] });
}, yM = () => {
  const e = ne((u) => u.layers), t = ne((u) => u.activeLayerId), n = ne((u) => u.createLayer), s = ne((u) => u.deleteLayer), l = ne((u) => u.renameLayer), i = ne((u) => u.toggleLayerVisible), o = ne((u) => u.moveLayer), a = ne((u) => u.setActiveLayer), c = [...e].reverse();
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
}, vM = () => {
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
    t === "nav" ? /* @__PURE__ */ r.jsx(xM, {}) : t === "layers" ? /* @__PURE__ */ r.jsx(yM, {}) : t === "paste" && e ? /* @__PURE__ */ r.jsx(mM, {}) : /* @__PURE__ */ r.jsx(hM, {})
  ] });
}, wM = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, Np = (e, t, n) => Math.min(n, Math.max(t, e)), an = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: i
}) => {
  const a = `dropdown-${T.useId()}`, c = T.useRef(null), u = T.useRef(null), [d, f] = T.useState(!1), [h, p] = T.useState(0), [g, w] = T.useState(null), M = T.useMemo(() => wM(t, e), [t, e]), v = T.useMemo(
    () => Math.max(0, t.findIndex((b) => b.value === e)),
    [t, e]
  ), m = () => {
    const b = c.current;
    if (!b)
      return null;
    const _ = b.getBoundingClientRect(), k = window.innerHeight || document.documentElement.clientHeight || 0, C = 260, R = k - _.bottom - 12, D = _.top - 12, P = R >= Math.min(C, 180) || R >= D, A = Np(P ? R : D, 120, C), H = P ? _.bottom + 6 : _.top - 6 - A;
    return { left: _.left, top: H, width: _.width, maxHeight: A };
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
      var R, D;
      if (C.key === "Escape") {
        C.preventDefault(), f(!1), (R = c.current) == null || R.focus();
        return;
      }
      if (C.key === "ArrowDown" || C.key === "ArrowUp") {
        C.preventDefault();
        const P = C.key === "ArrowDown" ? 1 : -1;
        p((A) => Np(A + P, 0, t.length - 1));
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
        const P = t[h];
        P && !P.disabled && (n(P.value), f(!1), (D = c.current) == null || D.focus());
      }
    }, _ = (C) => {
      var D, P;
      const R = C.target;
      R && ((D = c.current) != null && D.contains(R) || (P = u.current) != null && P.contains(R) || f(!1));
    }, k = (C) => {
      var P;
      const R = (C == null ? void 0 : C.target) ?? null;
      if (R && ((P = u.current) != null && P.contains(R)))
        return;
      const D = m();
      w(D);
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
}, Ip = (e) => /^#[0-9a-f]{6}$/i.test(e), Ep = (e) => {
  const t = e.trim().toLowerCase();
  return t ? t.startsWith("#") ? t : `#${t}` : "";
}, Be = (e) => Math.min(1, Math.max(0, e)), bn = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Rd = (e) => (e % 360 + 360) % 360, Nc = (e) => e.toString(16).padStart(2, "0"), fn = (e) => `#${Nc(e.r)}${Nc(e.g)}${Nc(e.b)}`, Cx = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), o = l - i;
  let a = 0;
  o !== 0 && (l === t ? a = (n - s) / o % 6 : l === n ? a = (s - t) / o + 2 : a = (t - n) / o + 4, a *= 60), a < 0 && (a += 360);
  const c = (l + i) / 2, u = o === 0 ? 0 : o / (1 - Math.abs(2 * c - 1));
  return { h: a, s: u, l: c };
}, SM = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), i = Math.min(t, n, s), o = l - i;
  let a = 0;
  o !== 0 && (l === t ? a = (n - s) / o % 6 : l === n ? a = (s - t) / o + 2 : a = (t - n) / o + 4, a *= 60), a < 0 && (a += 360);
  const c = l === 0 ? 0 : o / l;
  return { h: a, s: c, v: l };
}, Au = (e) => {
  const t = Rd(e.h), n = Be(e.s), s = Be(e.l), l = (1 - Math.abs(2 * s - 1)) * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), o = s - l / 2;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + o) * 255),
    g: Math.round((c + o) * 255),
    b: Math.round((u + o) * 255)
  };
}, dl = (e) => {
  const t = Rd(e.h), n = Be(e.s), s = Be(e.v), l = s * n, i = l * (1 - Math.abs(t / 60 % 2 - 1)), o = s - l;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = i) : t < 120 ? (a = i, c = l) : t < 180 ? (c = l, u = i) : t < 240 ? (c = i, u = l) : t < 300 ? (a = i, u = l) : (a = l, u = i), {
    r: Math.round((a + o) * 255),
    g: Math.round((c + o) * 255),
    b: Math.round((u + o) * 255)
  };
}, cn = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const s = n.toLowerCase();
    return t.has(s) ? !1 : (t.add(s), !0);
  });
}, MM = (e) => {
  const t = Mt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = Cx(t), i = (R, D, P) => fn(
    Au({
      h: Rd(l.h + R),
      s: Be(D),
      l: Be(P)
    })
  ), o = (R, D = 0, P = 0) => i(R, l.s + D, l.l + P), a = cn([
    o(0, 0, 0.12),
    o(0, 0, -0.12),
    o(180, 0, 0),
    o(180, 0, 0.12),
    o(180, 0, -0.12)
  ]), c = cn([
    o(-40),
    o(-20),
    o(0),
    o(20),
    o(40)
  ]), u = cn([
    o(0),
    o(150),
    o(210),
    o(150, 0, 0.12),
    o(210, 0, -0.12)
  ]), d = cn([
    o(0),
    o(120),
    o(240),
    o(120, 0, 0.12),
    o(240, 0, -0.12)
  ]), f = cn([
    o(0),
    o(90),
    o(180),
    o(270)
  ]), h = cn([
    fn(ds(t, n, 0.7)),
    fn(ds(t, n, 0.5)),
    fn(ds(t, n, 0.3)),
    fn(ds(t, s, 0.25)),
    fn(ds(t, s, 0.5))
  ]), p = Be(l.s * 0.45 + 0.15), g = Be(l.l * 0.4 + 0.6), w = cn([
    i(-25, p, Be(g + 0.05)),
    i(-10, p, Be(g + 0.02)),
    i(0, p, g),
    i(10, p, Be(g - 0.03)),
    i(25, p, Be(g - 0.06))
  ]), M = Be(l.s * 0.35 + 0.12), v = Be(l.l * 0.8 + 0.1), m = cn([
    i(-30, M, Be(v - 0.08)),
    i(-15, M, v),
    i(0, M, Be(v + 0.05)),
    i(15, M, Be(v - 0.03)),
    i(30, M, Be(v + 0.08))
  ]), x = Be(Math.max(0.7, l.s * 1.25)), S = Be(l.l * 0.85 + 0.06), b = cn([
    i(-20, x, Be(S - 0.08)),
    i(-10, x, S),
    i(0, x, Be(S + 0.04)),
    i(15, x, Be(S - 0.04)),
    i(30, x, Be(S + 0.08))
  ]), _ = Be(l.s * 0.9 + 0.05), k = cn([
    i(0, _, 0.14),
    i(0, _, 0.3),
    i(0, _, 0.5),
    i(0, _, 0.7),
    i(0, _, 0.86)
  ]), C = cn([
    i(0, l.s, Be(l.l - 0.06)),
    i(45, l.s, l.l),
    i(90, l.s, Be(l.l + 0.05)),
    i(135, l.s, l.l),
    i(180, l.s, Be(l.l - 0.04))
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
}, bM = () => {
  const e = re((I) => I.colors), t = re((I) => I.selectedIndices), n = re((I) => I.setColor), s = re((I) => I.setPalette), l = re((I) => I.setSelectedIndices), i = re((I) => I.getActiveIndex()), o = re((I) => I.addColor), a = (I, E) => {
    const Q = I.filter((ue) => ue !== E);
    return Q.push(E), Q;
  }, [c, u] = T.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [d, f] = T.useState("none"), [h, p] = T.useState(!1), [g, w] = T.useState(!1), [M, v] = T.useState(""), [m, x] = T.useState(!1), [S, b] = T.useState(null), [_, k] = T.useState(null), [C, R] = T.useState({ r: 255, g: 255, b: 255 }), [D, P] = T.useState({
    r: 255,
    g: 255,
    b: 255
  }), [A, H] = T.useState("#ffffff"), [J, oe] = T.useState(() => {
    try {
      const I = window.localStorage.getItem("pss.paletteRows"), E = I ? Number(I) : 3, Q = Number.isFinite(E) ? Math.floor(E) : 3;
      return Math.min(4, Math.max(2, Q));
    } catch {
      return 3;
    }
  }), le = T.useRef(null), ie = T.useRef(!1), B = T.useRef(null), X = T.useRef(!1), K = T.useRef(null), ee = T.useRef(!1), ce = T.useRef(/* @__PURE__ */ new Set()), U = T.useRef(!1), Z = ke.useMemo(
    () => typeof navigator < "u" && navigator.platform.toLowerCase().includes("mac"),
    []
  ), xe = ke.useMemo(() => SM(C), [C]), me = ke.useMemo(() => Cx(C), [C]), F = () => {
    u((I) => I.open ? { ...I, open: !1, index: null } : I);
  }, G = (I, E) => {
    I.preventDefault(), typeof E == "number" && (new Set(t).has(E) || l([E]), le.current = E), u({
      open: !0,
      x: I.clientX,
      y: I.clientY,
      index: E
    });
  };
  T.useEffect(() => {
    if (!c.open)
      return;
    const I = (Q) => {
      var Pe;
      const ue = Q.target;
      (Pe = ue == null ? void 0 : ue.closest) != null && Pe.call(ue, ".dropdown-select__menu") || B.current && B.current.contains(Q.target) || F();
    }, E = (Q) => {
      Q.key === "Escape" && F();
    };
    return window.addEventListener("mousedown", I), window.addEventListener("keydown", E), () => {
      window.removeEventListener("mousedown", I), window.removeEventListener("keydown", E);
    };
  }, [c.open]), T.useLayoutEffect(() => {
    if (!c.open || !B.current)
      return;
    const I = B.current.getBoundingClientRect(), E = 8, Q = Math.max(E, window.innerWidth - I.width - E), ue = Math.max(E, window.innerHeight - I.height - E), Pe = Math.min(Math.max(E, c.x), Q), It = Math.min(Math.max(E, c.y), ue);
    (Pe !== c.x || It !== c.y) && u((ln) => ({ ...ln, x: Pe, y: It }));
  }, [c.open, c.x, c.y]);
  const N = t.length === 1 ? t[0] ?? null : null, $ = N !== null && N >= 0 && N < e.length, se = $ && N !== null ? e[N] : "#ffffff", de = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ze = ke.useMemo(
    () => MM(de),
    [de]
  ), be = T.useCallback((I) => {
    const E = {
      r: bn(I.r, 0, 255),
      g: bn(I.g, 0, 255),
      b: bn(I.b, 0, 255)
    };
    R(E), H(fn(E));
  }, []), Fe = T.useCallback((I, E) => {
    const Q = Mt(E) ?? { r: 255, g: 255, b: 255 };
    k(I), P(Q), R(Q), H(fn(Q));
  }, []), ze = T.useCallback(() => {
    k(null);
  }, []), _e = T.useCallback(() => {
    if (!_)
      return;
    const I = fn(C);
    if (_.mode === "set") {
      n(_.index, I), k(null);
      return;
    }
    o(I), k(null);
  }, [o, _, C, n]), Ie = (_ == null ? void 0 : _.mode) === "set" ? "Set Color" : "Add Color", Se = () => {
    !$ || N === null || (F(), Fe({ mode: "set", index: N }, se));
  }, pt = () => {
    F(), Fe({ mode: "add" }, "#ffffff");
  }, $e = new Set(t), Bt = [...$e].sort((I, E) => I - E), mt = Bt.length, wn = mt > 0, In = mt > 1, qn = e.length - mt >= 1, Yt = (I) => {
    l(I);
  }, tl = () => {
    if (t.length === 0)
      return;
    const I = t.filter((E) => E >= 0 && E < e.length);
    I.length !== t.length && l(I);
  };
  T.useEffect(tl, [e.length, t, l]);
  const Yn = () => {
    if (!wn || !qn)
      return;
    const I = new Set(Bt), E = e.filter((Q, ue) => !I.has(ue));
    E.length !== 0 && (s(E), F());
  }, he = () => {
    if (!In)
      return;
    const I = Nt.columns, E = [...$e].sort((Pe, It) => {
      const ln = Math.floor(Pe / I), Ns = Pe % I, Xt = Math.floor(It / I), Sn = It % I;
      return Ns !== Sn ? Ns - Sn : ln - Xt;
    });
    if (E.length < 2)
      return;
    const Q = [...e], ue = Q[E[E.length - 1]];
    for (let Pe = E.length - 1; Pe > 0; Pe -= 1)
      Q[E[Pe]] = Q[E[Pe - 1]];
    Q[E[0]] = ue, s(Q), F();
  }, rt = (I) => {
    const E = new Set(e.map((Q) => Q.toLowerCase()));
    cn(I).filter((Q) => !E.has(Q.toLowerCase())).forEach((Q) => o(Q)), F(), p(!1), f("none");
  }, je = T.useCallback((I) => {
    b(null), w(!0), I && v(I);
  }, []), qe = () => {
    w(!1), x(!1), b(null), v("");
  };
  T.useEffect(() => {
    const I = () => {
      je("https://lospec.com/palette-list/");
    };
    return window.addEventListener("palette:open-lospec", I), () => window.removeEventListener("palette:open-lospec", I);
  }, [je]), T.useEffect(() => {
    const I = () => {
      p(!0), f("none");
    };
    return window.addEventListener("palette:open-add-swatch", I), () => window.removeEventListener("palette:open-add-swatch", I);
  }, []), T.useEffect(() => {
    const I = (E) => {
      const ue = Number(E.detail);
      Number.isFinite(ue) && oe(Math.min(4, Math.max(2, Math.floor(ue))));
    };
    return window.addEventListener("palette:set-rows", I), () => window.removeEventListener("palette:set-rows", I);
  }, []);
  const sn = async () => {
    var E;
    if (!((E = window.paletteApi) != null && E.importLospec)) {
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
        const Q = await window.paletteApi.importLospec(I), ue = Q.colors.length > 0 ? Q.colors : e;
        s(ue), l([Math.max(0, ue.length - 1)]), we.getState().setDirty(!0), qe();
      } catch (Q) {
        const ue = Q instanceof Error ? Q.message : "Unable to import palette.";
        b(ue), x(!1);
      }
    }
  }, Nt = ke.useMemo(() => {
    const I = e.length + 1, E = Math.min(J, Math.max(1, Math.ceil(I / 16))), Q = Math.max(1, Math.ceil(I / E));
    return { rows: E, columns: Q };
  }, [e.length, J]);
  T.useEffect(() => {
    try {
      window.localStorage.setItem("pss.paletteRows", String(J));
    } catch {
    }
  }, [J]), T.useEffect(() => {
    const I = () => {
      X.current = !1, K.current = null, U.current = !1, ce.current = /* @__PURE__ */ new Set();
    };
    return window.addEventListener("pointerup", I), () => window.removeEventListener("pointerup", I);
  }, []);
  const Jn = (I) => ({
    row: Math.floor(I / Nt.columns),
    col: I % Nt.columns
  }), Ps = (I, E) => {
    const Q = Jn(I), ue = Jn(E), Pe = Math.min(Q.row, ue.row), It = Math.max(Q.row, ue.row), ln = Math.min(Q.col, ue.col), Ns = Math.max(Q.col, ue.col), Xt = [];
    for (let Sn = Pe; Sn <= It; Sn += 1)
      for (let es = ln; es <= Ns; es += 1) {
        const Gl = Sn * Nt.columns + es;
        Gl < 0 || Gl >= e.length || Xt.push(Gl);
      }
    return Xt;
  };
  return /* @__PURE__ */ r.jsxs("div", { className: "palette-bar", children: [
    /* @__PURE__ */ r.jsxs(
      "div",
      {
        className: "palette-bar__swatches",
        role: "listbox",
        "aria-label": "Palette colors",
        style: {
          "--palette-rows": Nt.rows,
          "--palette-columns": Nt.columns
        },
        children: [
          e.map((I, E) => /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch",
              style: { background: I },
              "data-active": E === i,
              "data-selected": $e.has(E),
              onMouseDown: (Q) => {
                Z && Q.button === 0 && Q.ctrlKey && (ie.current = !0);
              },
              onPointerDown: (Q) => {
                if (Q.button !== 0)
                  return;
                X.current = !0, K.current = E, ee.current = !1, U.current = Q.shiftKey || Q.metaKey || Q.ctrlKey || Q.altKey, ce.current = U.current ? new Set($e) : /* @__PURE__ */ new Set();
                const ue = Ps(E, E);
                if (U.current) {
                  const Pe = new Set(ce.current);
                  ue.forEach((It) => Pe.add(It)), l(a(Array.from(Pe), E));
                } else
                  l(a(ue, E));
                le.current = E;
              },
              onPointerEnter: () => {
                if (!X.current || K.current === null)
                  return;
                ee.current = !0;
                const Q = Ps(K.current, E);
                if (U.current) {
                  const ue = new Set(ce.current);
                  Q.forEach((Pe) => ue.add(Pe)), l(a(Array.from(ue), E));
                } else
                  l(a(Q, E));
              },
              onClick: (Q) => {
                if (ee.current) {
                  ee.current = !1;
                  return;
                }
                if (ie.current) {
                  ie.current = !1;
                  return;
                }
                if (Q.shiftKey && le.current !== null) {
                  const ue = Math.min(le.current, E), Pe = Math.max(le.current, E), It = new Set($e);
                  for (let ln = ue; ln <= Pe; ln += 1)
                    It.add(ln);
                  l(a(Array.from(It), E)), le.current = E;
                } else if (Q.metaKey || Q.altKey) {
                  const ue = new Set($e);
                  ue.has(E) ? ue.delete(E) : ue.add(E);
                  const Pe = Array.from(ue);
                  l(
                    ue.has(E) ? a(Pe, E) : Pe
                  ), le.current = E;
                } else if (Q.ctrlKey) {
                  const ue = new Set($e);
                  ue.has(E) ? ue.delete(E) : ue.add(E);
                  const Pe = Array.from(ue);
                  l(
                    ue.has(E) ? a(Pe, E) : Pe
                  ), le.current = E;
                } else
                  Yt([E]), le.current = E;
              },
              onContextMenu: (Q) => G(Q, E),
              "aria-label": `Palette color ${E + 1}`,
              "aria-selected": $e.has(E)
            },
            `${I}-${E}`
          )),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch palette-bar__swatch--empty",
              onClick: () => {
                pt();
              },
              onContextMenu: (I) => G(I, null),
              "aria-label": "Add palette color"
            }
          )
        ]
      }
    ),
    c.open && /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: B,
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
              onClick: Se,
              disabled: !$,
              children: "Set Color"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: Yn,
              disabled: !wn || !qn,
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: he,
              disabled: !In,
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
          onKeyDown: (I) => {
            if (I.key === "Escape") {
              I.preventDefault(), ze();
              return;
            }
            if (I.key === "Enter") {
              const E = I.target;
              if ((E == null ? void 0 : E.tagName) === "TEXTAREA")
                return;
              I.preventDefault(), _e();
            }
          },
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: ze }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--palette-color", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ r.jsx("h2", { children: Ie }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: ze, children: "Close" })
              ] }),
              /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-row", children: [
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Before" }),
                    /* @__PURE__ */ r.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: fn(D) }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ r.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Current" }),
                    /* @__PURE__ */ r.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: fn(C) }
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
                      value: A,
                      onChange: (I) => {
                        const E = I.currentTarget.value;
                        H(E);
                        const Q = Ep(E);
                        if (!Ip(Q))
                          return;
                        const ue = Mt(Q);
                        ue && R(ue);
                      },
                      onBlur: () => {
                        const I = Ep(A);
                        if (!Ip(I)) {
                          H(fn(C));
                          return;
                        }
                        const E = Mt(I);
                        E && be(E);
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, r: E });
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, r: E });
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, g: E });
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, g: E });
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, b: E });
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
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be({ ...C, b: E });
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
                        value: Math.round(xe.h),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, h: bn(E, 0, 360) })
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
                        value: Math.round(xe.h),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, h: bn(E, 0, 360) })
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
                        value: Math.round(xe.s * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, s: bn(E, 0, 100) / 100 })
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
                        value: Math.round(xe.s * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, s: bn(E, 0, 100) / 100 })
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
                        value: Math.round(xe.v * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, v: bn(E, 0, 100) / 100 })
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
                        value: Math.round(xe.v * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            dl({ ...xe, v: bn(E, 0, 100) / 100 })
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
                        value: Math.round(me.l * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            Au({ ...me, l: bn(E, 0, 100) / 100 })
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
                        value: Math.round(me.l * 100),
                        onChange: (I) => {
                          const E = Number(I.currentTarget.value);
                          Number.isFinite(E) && be(
                            Au({ ...me, l: bn(E, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ r.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: ze, children: "Cancel" }),
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: _e, children: _.mode === "add" ? "Add Color" : "Apply" })
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
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), p(!1), f("none"));
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
                  an,
                  {
                    ariaLabel: "Swatch presets",
                    className: "panel__select",
                    value: d,
                    onChange: (I) => {
                      if (f(I), I === "none")
                        return;
                      const E = Ze.find((Q) => Q.id === I);
                      E && rt(E.colors);
                    },
                    options: [
                      { value: "none", label: "Choose preset…" },
                      ...Ze.map((I) => ({
                        value: I.id,
                        label: I.label,
                        render: /* @__PURE__ */ r.jsxs("span", { className: "palette-bar__preset-option", children: [
                          /* @__PURE__ */ r.jsx("span", { className: "palette-bar__preset-option-label", children: I.label }),
                          /* @__PURE__ */ r.jsx("span", { className: "palette-bar__menu-preview", "aria-hidden": "true", children: I.colors.map((E, Q) => /* @__PURE__ */ r.jsx(
                            "span",
                            {
                              className: "palette-bar__menu-chip",
                              style: { background: E }
                            },
                            `${I.id}-${E}-${Q}`
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
          onKeyDown: (I) => {
            I.key === "Escape" && (I.preventDefault(), qe());
          },
          children: [
            /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: qe }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ r.jsx("h2", { children: "Import LoSpec Palette" }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: qe, children: "Close" })
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
                    onChange: (I) => v(I.currentTarget.value),
                    onKeyDown: (I) => {
                      I.key === "Enter" && (I.preventDefault(), sn());
                    },
                    autoFocus: !0
                  }
                ),
                /* @__PURE__ */ r.jsx("div", { className: "panel__note", style: { color: "rgba(255, 170, 120, 0.9)" }, children: "Importing will replace your current palette." }),
                S && /* @__PURE__ */ r.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: S }),
                /* @__PURE__ */ r.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: qe, disabled: m, children: "Cancel" }),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void sn(),
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
}, _M = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
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
}, TM = () => {
  const e = W((N) => N.tileSets), t = W((N) => N.activeTileSetId), n = W((N) => N.tilePage), s = W((N) => N.tilePageCount), l = W((N) => N.setTilePageCount), i = W((N) => N.selectedTileIndex), o = W((N) => N.selectedTileIndices), a = W((N) => N.tilePickerZoom), c = W((N) => N.setTileSelection), u = W((N) => N.setActiveTileSet), d = W((N) => N.deleteTilesFromSet), f = re((N) => N.colors), h = T.useMemo(() => e.find((N) => N.id === t) ?? e[0], [e, t]);
  T.useEffect(() => {
    !h && e.length > 0 && u(e[0].id);
  }, [h, e, u]);
  const p = (h == null ? void 0 : h.tiles.length) ?? 0, g = (h == null ? void 0 : h.tiles) ?? [], w = Math.max(1, (h == null ? void 0 : h.columns) ?? 1), M = Math.max(1, (h == null ? void 0 : h.rows) ?? 1), v = w * M, m = Math.max(1, Math.ceil(p / v)), x = h ? Math.max(16, h.tileWidth * a) : 32, S = T.useRef(null), [b, _] = T.useState({ width: 0, height: 0 }), k = w * x, C = M * x, R = T.useMemo(() => {
    if (b.width <= 0)
      return 1;
    const N = Math.floor((b.width + 8) / Math.max(1, k + 8));
    return Math.max(1, Math.min(m, N));
  }, [k, b.width, m]), D = T.useMemo(() => {
    if (b.height <= 0)
      return 1;
    const N = Math.floor((b.height + 8) / Math.max(1, C + 8));
    return Math.max(1, N);
  }, [C, b.height]), P = Math.max(1, R * D), A = Math.max(1, Math.ceil(m / P)), H = Math.min(n, A - 1), J = H * P, oe = Math.max(0, Math.min(P, m - J)), le = T.useRef(!1), ie = T.useRef(null), B = T.useMemo(
    () => new Set(o.filter((N) => N >= 0)),
    [o]
  ), X = T.useMemo(() => {
    const N = new Set(o.filter(($) => $ >= 0));
    return Array.from(N).sort(($, se) => $ - se);
  }, [o]), K = T.useCallback(() => {
    if (!h || X.length === 0)
      return;
    const N = X.length === 1 ? "tile" : "tiles";
    if (!window.confirm(
      `Delete ${X.length} ${N} from ${h.name}?`
    ))
      return;
    const se = Wt();
    d(h.id, X);
    const de = Wt();
    Zs(se, de);
  }, [h, d, X]), ee = T.useCallback(() => {
    const N = S.current;
    if (!N)
      return;
    const $ = Math.floor(N.clientWidth || N.getBoundingClientRect().width || 0), se = Math.floor(N.clientHeight || N.getBoundingClientRect().height || 0);
    _(
      (de) => de.width === $ && de.height === se ? de : { width: $, height: se }
    );
  }, []);
  T.useEffect(() => {
    const N = S.current;
    if (!N)
      return;
    const $ = () => {
      ee();
    };
    if ($(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", $), () => {
        window.removeEventListener("resize", $);
      };
    const se = new ResizeObserver(() => $()), de = N.parentElement;
    return de && se.observe(de), se.observe(N), () => {
      se.disconnect();
    };
  }, [ee]), T.useEffect(() => {
    s !== A && l(A);
  }, [l, s, A]), T.useEffect(() => {
    ee();
    const N = window.requestAnimationFrame(() => {
      ee();
    });
    return () => window.cancelAnimationFrame(N);
  }, [ee, x, m, A, H]);
  const ce = (N) => {
    const $ = Math.floor(N / v), se = N % v, de = se % w, Ze = Math.floor(se / w), be = $ % R;
    return {
      row: Math.floor($ / R) * M + Ze,
      col: be * w + de
    };
  }, U = (N, $) => {
    if (N.length === 0) {
      c([$], 1, 1, $);
      return;
    }
    const se = N.map((Se) => ({
      index: Se,
      ...ce(Se)
    })), de = Math.min(...se.map((Se) => Se.col)), Ze = Math.max(...se.map((Se) => Se.col)), be = Math.min(...se.map((Se) => Se.row)), Fe = Math.max(...se.map((Se) => Se.row)), ze = Ze - de + 1, _e = Fe - be + 1, Ie = new Array(ze * _e).fill(-1);
    for (const Se of se) {
      const pt = Se.col - de, Bt = (Se.row - be) * ze + pt;
      Ie[Bt] = Se.index;
    }
    c(Ie, ze, _e, $);
  }, Z = (N, $) => {
    const se = ce(N), de = ce($), Ze = Math.min(se.col, de.col), be = Math.max(se.col, de.col), Fe = Math.min(se.row, de.row), ze = Math.max(se.row, de.row), _e = be - Ze + 1, Ie = ze - Fe + 1, Se = new Array(_e * Ie).fill(-1);
    for (let pt = Fe; pt <= ze; pt += 1)
      for (let $e = Ze; $e <= be; $e += 1) {
        const Bt = Math.floor($e / w), mt = Math.floor(pt / M), wn = $e % w, In = pt % M, Yt = (mt * R + Bt) * v + In * w + wn;
        if (Yt < 0 || Yt >= p)
          continue;
        const tl = (pt - Fe) * _e + ($e - Ze);
        Se[tl] = Yt;
      }
    c(Se, _e, Ie, N);
  }, xe = (N, $) => {
    if (le.current = !0, ie.current = N, $ != null && $.additive) {
      const se = /* @__PURE__ */ new Set([
        ...o.filter((de) => de >= 0),
        N
      ]);
      U(Array.from(se), N);
      return;
    }
    if ($ != null && $.subtractive) {
      const se = o.filter((Ze) => Ze >= 0 && Ze !== N), de = se.length > 0 ? se : [N];
      U(de, N);
      return;
    }
    Z(N, N);
  }, me = (N) => {
    !le.current || ie.current === null || Z(ie.current, N);
  }, F = () => {
    le.current = !1, ie.current = null;
  };
  T.useEffect(() => {
    const N = () => F();
    return window.addEventListener("pointerup", N), () => window.removeEventListener("pointerup", N);
  }, []), T.useEffect(() => {
    const N = ($) => {
      if ($.key !== "Delete" && $.key !== "Backspace")
        return;
      const se = $.target;
      if (se) {
        const de = se.tagName;
        if (de === "INPUT" || de === "TEXTAREA" || se.isContentEditable)
          return;
      }
      !h || X.length === 0 || ($.preventDefault(), K());
    };
    return window.addEventListener("keydown", N), () => window.removeEventListener("keydown", N);
  }, [h, K, X.length]);
  const G = T.useCallback((N) => {
    const $ = S.current;
    $ && ($.scrollHeight <= $.clientHeight || ($.scrollTop += N.deltaY, N.preventDefault(), N.stopPropagation()));
  }, []);
  return /* @__PURE__ */ r.jsx("div", { className: "tilebar", children: /* @__PURE__ */ r.jsx(
    "div",
    {
      ref: S,
      className: "tilebar__grid",
      onWheel: G,
      style: {
        "--tile-cell-size": `${x}px`,
        "--tile-cluster-columns": `${w}`,
        "--tile-cluster-rows": `${M}`
      },
      children: h ? p === 0 ? /* @__PURE__ */ r.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: oe }, (N, $) => {
        const se = J + $, de = se * v;
        return /* @__PURE__ */ r.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: v }, (Ze, be) => {
          const Fe = de + be, ze = Fe < 0 || Fe >= p, _e = ze ? null : g[Fe], Ie = !ze && B.has(Fe);
          return /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "tilebar__tile",
              "data-active": Fe === i,
              "data-selected": Ie,
              "data-placeholder": ze,
              onPointerDown: (Se) => {
                ze || xe(Fe, {
                  additive: Se.shiftKey,
                  subtractive: Se.ctrlKey || Se.metaKey
                });
              },
              onPointerEnter: () => {
                ze || me(Fe);
              },
              "aria-label": `Tile ${Fe + 1}`,
              disabled: ze,
              children: _e ? /* @__PURE__ */ r.jsx(
                _M,
                {
                  pixels: _e.pixels,
                  tileWidth: h.tileWidth,
                  tileHeight: h.tileHeight,
                  pixelSize: a,
                  palette: f
                }
              ) : null
            },
            ze ? `placeholder-${Fe}` : (_e == null ? void 0 : _e.id) ?? `tile-${Fe}`
          );
        }) }, `cluster-${se}`);
      }) : /* @__PURE__ */ r.jsx("div", { className: "tilebar__empty", children: "No tiles yet. Use Tile Sampler to capture some." })
    }
  ) });
}, jx = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, Px = (e, t, n, s) => {
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
}, Nx = (e) => {
  const t = jx(e.fontSize), n = e.text;
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
}, kM = (e) => {
  const t = fa(), { gradientDirection: n, gradientDither: s } = wt.getState(), l = Nx({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const i = t.length > 1 ? Px(l, t, n, s) : l;
  ot.getState().setBuffer({
    pixels: i.pixels,
    origin: { x: 0, y: 0 },
    width: i.width,
    height: i.height
  }), jt.getState().setActiveTool("stamp");
}, CM = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], jM = [8, 16, 24, 32], PM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, NM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const i = re((S) => S.colors), o = re((S) => S.selectedIndices), a = re((S) => S.getActiveIndex()), c = wt((S) => S.gradientDirection), u = wt((S) => S.gradientDither), [d, f] = ke.useState(e), [h, p] = ke.useState(t), [g, w] = ke.useState(jx(n)), M = T.useRef(null), v = T.useRef(null), m = T.useRef(null);
  T.useEffect(() => {
    var S, b, _;
    (S = M.current) == null || S.focus(), (_ = (b = M.current) == null ? void 0 : b.select) == null || _.call(b);
  }, []);
  const x = T.useMemo(() => {
    try {
      const S = Nx({
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
      return _.length <= 1 ? S : Px(S, _, c, u);
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
      const R = PM(b, S.clientWidth, S.clientHeight);
      if (!R)
        return;
      const D = S.clientWidth, P = S.clientHeight, A = i[0] ?? "#000000", H = Mt(A) ?? { r: 0, g: 0, b: 0 }, J = ha(H, da(H)), oe = Id(ds(H, J, 0.1)), le = un(J, 0.12);
      if (R.clearRect(0, 0, D, P), R.fillStyle = A, R.fillRect(0, 0, D, P), !x || x.pixels.length === 0)
        return;
      const ie = 12, B = Math.max(1, D - ie * 2), X = Math.max(1, P - ie * 2), K = Math.max(
        1,
        Math.floor(
          Math.min(B / x.width, X / x.height)
        )
      ), ee = x.width * K, ce = x.height * K, U = Math.floor((D - ee) / 2), Z = Math.floor((P - ce) / 2);
      R.fillStyle = oe, R.fillRect(U, Z, ee, ce), R.strokeStyle = le, R.strokeRect(U, Z, ee, ce);
      const xe = /* @__PURE__ */ new Map();
      for (const me of x.pixels) {
        const F = xe.get(me.paletteIndex);
        F ? F.push({ x: me.x, y: me.y }) : xe.set(me.paletteIndex, [{ x: me.x, y: me.y }]);
      }
      for (const [me, F] of xe) {
        R.fillStyle = i[me] ?? i[a] ?? "#ffffff";
        for (const G of F)
          R.fillRect(
            U + G.x * K,
            Z + G.y * K,
            K,
            K
          );
      }
    };
    _();
    const k = re.subscribe(_), C = new ResizeObserver(_);
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
                  children: CM.map((S) => /* @__PURE__ */ r.jsx("option", { value: S.value, children: S.label }, S.value))
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
                  children: jM.map((S) => /* @__PURE__ */ r.jsxs("option", { value: S, children: [
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
}, IM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = T.useState(!0), [l, i] = T.useState(!1), [o, a] = T.useState(!1), [c, u] = T.useState(!1), [d, f] = T.useState("gpt-image-1"), [h, p] = T.useState("openai"), [g, w] = T.useState("http://localhost:8080/v1"), [M, v] = T.useState("sdxl"), [m, x] = T.useState(!1), [S, b] = T.useState(!1), [_, k] = T.useState(!1), [C, R] = T.useState(!1), [D, P] = T.useState(""), [A, H] = T.useState(!1), [J, oe] = T.useState(!1), [le, ie] = T.useState(""), B = T.useRef(null);
  T.useEffect(() => {
    let F = !1;
    return (async () => {
      try {
        const N = await window.optionsApi.getOpenAiKeyInfo(), $ = await window.optionsApi.getOpenAiImageModel(), se = await window.optionsApi.getAiImageProvider(), de = await window.optionsApi.getLocalAiConfig(), Ze = await window.optionsApi.getLocalAiKeyInfo(), be = await window.optionsApi.getAdvancedMode();
        if (F)
          return;
        i(N.hasKey), a(N.encryptionAvailable), u(N.storedEncrypted), f($), p(se), w(de.baseUrl), v(de.model), x(Ze.hasKey), b(Ze.encryptionAvailable), k(Ze.storedEncrypted), H(be);
      } finally {
        F || s(!1);
      }
    })(), () => {
      F = !0;
    };
  }, []), T.useEffect(() => {
    n || window.setTimeout(() => {
      var F;
      return (F = B.current) == null ? void 0 : F.focus();
    }, 0);
  }, [n]);
  const X = async () => {
    const F = le.trim();
    if (!F) {
      window.alert("Paste your OpenAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setOpenAiApiKey(F);
      const G = await window.optionsApi.getOpenAiKeyInfo();
      i(G.hasKey), a(G.encryptionAvailable), u(G.storedEncrypted), ie(""), oe(!1);
    } catch (G) {
      console.error("Failed to save OpenAI API key:", G), window.alert("Unable to save API key.");
    } finally {
      s(!1);
    }
  }, K = async () => {
    if (window.confirm("Clear the saved OpenAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setOpenAiApiKey(null);
        const F = await window.optionsApi.getOpenAiKeyInfo();
        i(F.hasKey), a(F.encryptionAvailable), u(F.storedEncrypted), ie(""), oe(!1);
      } catch (F) {
        console.error("Failed to clear OpenAI API key:", F), window.alert("Unable to clear API key.");
      } finally {
        s(!1);
      }
    }
  }, ee = async (F) => {
    f(F);
    try {
      await window.optionsApi.setOpenAiImageModel(F);
    } catch (G) {
      console.error("Failed to set image model:", G), window.alert("Unable to update image model.");
      const N = await window.optionsApi.getOpenAiImageModel().catch(() => "gpt-image-1");
      f(N);
    }
  }, ce = async (F) => {
    p(F);
    try {
      await window.optionsApi.setAiImageProvider(F);
    } catch (G) {
      console.error("Failed to set image provider:", G), window.alert("Unable to update image provider.");
      const N = await window.optionsApi.getAiImageProvider().catch(() => "openai");
      p(N);
    }
  }, U = async () => {
    const F = D.trim();
    if (!F) {
      window.alert("Paste your LocalAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setLocalAiApiKey(F);
      const G = await window.optionsApi.getLocalAiKeyInfo();
      x(G.hasKey), b(G.encryptionAvailable), k(G.storedEncrypted), P(""), R(!1);
    } catch (G) {
      console.error("Failed to save LocalAI API key:", G), window.alert("Unable to save LocalAI API key.");
    } finally {
      s(!1);
    }
  }, Z = async () => {
    if (window.confirm("Clear the saved LocalAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setLocalAiApiKey(null);
        const F = await window.optionsApi.getLocalAiKeyInfo();
        x(F.hasKey), b(F.encryptionAvailable), k(F.storedEncrypted), P(""), R(!1);
      } catch (F) {
        console.error("Failed to clear LocalAI API key:", F), window.alert("Unable to clear LocalAI API key.");
      } finally {
        s(!1);
      }
    }
  }, xe = async (F) => {
    H(F);
    try {
      await window.optionsApi.setAdvancedMode(F), t(F);
    } catch (G) {
      console.error("Failed to update advanced mode:", G), window.alert("Unable to update advanced mode.");
      const N = await window.optionsApi.getAdvancedMode().catch(() => !0);
      H(N), t(N);
    }
  }, me = l ? c ? "Saved (encrypted)" : o ? "Saved" : "Saved (not encrypted)" : "Not set";
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (F) => {
        F.key === "Escape" && (F.preventDefault(), e());
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
                      checked: A,
                      onChange: (F) => void xe(F.currentTarget.checked),
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
                    onChange: (F) => void ce(F.target.value),
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
                  onChange: (F) => void ee(F.target.value),
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
                      onChange: (F) => w(F.target.value),
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
                      onChange: (F) => v(F.target.value),
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
                      value: D,
                      placeholder: m ? "•••••••••••••••• (saved)" : "(optional)",
                      onChange: (F) => P(F.target.value),
                      disabled: n,
                      style: { width: 320 }
                    }
                  ),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => R((F) => !F),
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
                  /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => void U(), disabled: n, children: "Save Key" }),
                  /* @__PURE__ */ r.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void Z(),
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
                    ref: B,
                    type: J ? "text" : "password",
                    value: le,
                    placeholder: l ? "•••••••••••••••• (saved)" : "sk-...",
                    onChange: (F) => ie(F.target.value),
                    disabled: n,
                    style: { width: 320 }
                  }
                ),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => oe((F) => !F), disabled: n, children: J ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", { children: "OpenAI Key Status" }),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.9 }, children: me })
            ] }),
            !o && /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsx("span", { style: { opacity: 0.8 }, children: "Encryption is unavailable on this system; the key may be stored in plain text." })
            ] }),
            /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ r.jsx("span", {}),
              /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: X, disabled: n, children: "Save Key" }),
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
}, EM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, RM = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((d) => Mt(d) ?? { r: 0, g: 0, b: 0 }), i = l.length > 1 ? Array.from({ length: l.length - 1 }, (d, f) => f + 1) : [0], o = [], { width: a, height: c, data: u } = e;
  for (let d = 0; d < c; d += 1)
    for (let f = 0; f < a; f += 1) {
      const h = (d * a + f) * 4, p = u[h] ?? 0, g = u[h + 1] ?? 0, w = u[h + 2] ?? 0;
      if ((u[h + 3] ?? 0) < s)
        continue;
      const v = { r: p, g, b: w };
      let m = i[0] ?? 0, x = Number.POSITIVE_INFINITY;
      for (const S of i) {
        const b = EM(v, l[S] ?? l[0]);
        b < x && (x = b, m = S);
      }
      m !== 0 && o.push({ x: f, y: d, paletteIndex: m });
    }
  return { pixels: o };
}, Ad = (e) => {
  const t = re.getState().colors, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = new Uint8ClampedArray(n * s * 4);
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
}, AM = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const i = l.x - e.minX, o = l.y - e.minY;
    s[o * t + i] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, LM = async () => {
  const e = js();
  if (!e)
    return null;
  const { data: t, width: n, height: s } = Ad(e), l = document.createElement("canvas");
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
}, os = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), DM = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = re((A) => A.colors), [l, i] = T.useState(e), [o, a] = T.useState(16), [c, u] = T.useState(16), [d, f] = T.useState(1), [h, p] = T.useState(1), [g, w] = T.useState(!1), [M, v] = T.useState(!1), [m, x] = T.useState(""), [S, b] = T.useState(0), [_, k] = T.useState(null), C = T.useRef(null), R = T.useMemo(() => os(o, 1, 512) * os(d, 1, 64), [
    o,
    d
  ]), D = T.useMemo(() => os(c, 1, 512) * os(h, 1, 64), [
    c,
    h
  ]);
  T.useEffect(() => {
    window.setTimeout(() => {
      var A;
      return (A = C.current) == null ? void 0 : A.focus();
    }, 0);
  }, []), T.useEffect(() => {
    if (!M) {
      b(0);
      return;
    }
    const A = Date.now(), H = window.setInterval(() => {
      b(Math.floor((Date.now() - A) / 1e3));
    }, 250);
    return () => window.clearInterval(H);
  }, [M]);
  const P = async () => {
    var H;
    k(null);
    const A = l.trim();
    if (!A) {
      k("Enter a prompt.");
      return;
    }
    if (!((H = window.aiApi) != null && H.generateSprite)) {
      k("AI is unavailable. Restart the app to load the latest AI support.");
      return;
    }
    v(!0), x("Preparing request…");
    try {
      x(g ? "Encoding reference…" : "Preparing prompt…");
      const J = g ? await LM() : null;
      x("Waiting for OpenAI…");
      const oe = await window.aiApi.generateSprite({
        prompt: A,
        palette: s,
        cellWidth: os(o, 1, 512),
        cellHeight: os(c, 1, 512),
        columns: os(d, 1, 64),
        rows: os(h, 1, 64),
        referencePngBase64: J
      });
      x("Processing image…");
      const le = new Image(), ie = `data:image/png;base64,${oe.pngBase64}`;
      await new Promise((ce, U) => {
        le.onload = () => ce(), le.onerror = () => U(new Error("Failed to load generated image.")), le.src = ie;
      });
      const B = document.createElement("canvas");
      B.width = R, B.height = D;
      const X = B.getContext("2d");
      if (!X)
        throw new Error("Canvas unavailable.");
      X.imageSmoothingEnabled = !1, X.clearRect(0, 0, R, D), X.drawImage(le, 0, 0, R, D), x("Quantizing to palette…");
      const K = X.getImageData(0, 0, R, D), ee = RM(K, s, { alphaThreshold: 10 });
      x("Copying to Stamp…"), ot.getState().setBuffer({
        pixels: ee.pixels,
        origin: { x: 0, y: 0 },
        width: R,
        height: D
      }), jt.getState().setActiveTool("stamp"), n({
        prompt: A,
        cellWidth: o,
        cellHeight: c,
        columns: d,
        rows: h,
        useSelectionAsReference: g
      });
    } catch (J) {
      console.error("AI generation failed:", J), k(J instanceof Error ? J.message : "AI generation failed.");
    } finally {
      v(!1), x("");
    }
  };
  return /* @__PURE__ */ r.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (A) => {
        A.key === "Escape" && (A.preventDefault(), t()), (A.ctrlKey || A.metaKey) && A.key === "Enter" && (A.preventDefault(), P());
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
                    onChange: (A) => i(A.target.value),
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
                    onChange: (A) => a(Number(A.target.value)),
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
                    onChange: (A) => u(Number(A.target.value)),
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
                    onChange: (A) => f(Number(A.target.value)),
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
                    onChange: (A) => p(Number(A.target.value)),
                    disabled: M
                  }
                ),
                /* @__PURE__ */ r.jsx("span", { children: "rows" }),
                /* @__PURE__ */ r.jsxs("span", { style: { opacity: 0.75 }, children: [
                  "(",
                  R,
                  "×",
                  D,
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
                    onChange: (A) => w(A.target.checked),
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
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: () => void P(), disabled: M, children: M ? "Generating…" : "Generate" }),
                /* @__PURE__ */ r.jsx("button", { type: "button", onClick: t, disabled: M, children: "Cancel" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, ve = {
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
}, BM = (e, t) => {
  const n = ne.getState(), s = n.activeLayerId, l = new Set(
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
}, Ix = (e = {}) => {
  const t = ge.getState();
  if (t.selectedCount === 0)
    return null;
  const n = ne.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, o = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: d, col: f, block: h } of u) {
    const p = f * Y, g = d * Y;
    for (let w = 0; w < Y; w += 1)
      for (let M = 0; M < Y; M += 1) {
        if (h[w * Y + M] !== 1)
          continue;
        const v = p + M, m = g + w, x = c ? BM(v, m) : n.getPixel(v, m);
        s.push({ x: v, y: m, paletteIndex: x }), l = Math.min(l, v), i = Math.max(i, v), o = Math.min(o, m), a = Math.max(a, m);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: i, minY: o, maxY: a };
}, Ex = (e) => {
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
}, Ur = (e = {}) => {
  const t = Ix(e);
  t && (Ex(t), ge.getState().clear(), jt.getState().setActiveTool("stamp"));
}, Rx = () => {
  const e = Ix();
  if (!e)
    return;
  Ex(e);
  const t = ne.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Le.getState().pushBatch({ changes: n })), ge.getState().clear(), jt.getState().setActiveTool("stamp");
}, YM = () => {
  const e = ge.getState();
  if (e.selectedCount === 0)
    return;
  const t = Le.getState();
  if (t.locked)
    return;
  const n = ne.getState(), s = n.activeLayerId, l = [], i = [], o = e.store.getBlocks();
  for (const { row: a, col: c, block: u } of o) {
    const d = c * Y, f = a * Y;
    for (let h = 0; h < Y; h += 1)
      for (let p = 0; p < Y; p += 1) {
        if (u[h * Y + p] !== 1)
          continue;
        const g = d + p, w = f + h, M = n.getPixelInLayer(s, g, w);
        M !== 0 && (l.push({ x: g, y: w, prev: M, next: 0 }), i.push({ x: g, y: w, paletteIndex: 0 }));
      }
  }
  i.length !== 0 && (n.setPixelsInLayer(s, i), t.pushBatch({ layerId: s, changes: l }));
}, Ax = () => {
  const e = W.getState();
  return e.tileSets.find((t) => t.id === e.activeTileSetId) ?? null;
}, XM = (e) => {
  const t = W.getState(), n = t.tileMaps.find(
    (s) => s.id === t.activeTileMapId && s.tileSetId === e
  );
  return n || (t.tileMaps.find((s) => s.tileSetId === e) ?? null);
}, Lx = (e) => {
  const t = XM(e.id);
  if (!t)
    return null;
  const n = ge.getState();
  if (n.selectedCount <= 0)
    return null;
  const s = /* @__PURE__ */ new Set();
  let l = Number.POSITIVE_INFINITY, i = Number.POSITIVE_INFINITY, o = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = n.store.getBlocks();
  for (const { row: h, col: p, block: g } of c) {
    const w = p * Y, M = h * Y;
    for (let v = 0; v < Y; v += 1)
      for (let m = 0; m < Y; m += 1) {
        if (g[v * Y + m] !== 1)
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
}, Dx = (e) => {
  const t = W.getState(), n = Math.max(1, t.selectedTileCols), s = Math.max(1, t.selectedTileRows), l = n * s, i = new Array(l).fill(-1);
  for (let o = 0; o < l; o += 1)
    i[o] = t.selectedTileIndices[o] ?? -1;
  return i.some((o) => o >= 0) ? (ot.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: i,
    cols: n,
    rows: s,
    source: "palette"
  }), ge.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0) : !1;
}, Bx = () => {
  const e = Ax();
  if (!e)
    return !1;
  const t = Lx(e);
  return t ? (ot.getState().setTileBuffer({
    tileSetId: e.id,
    tiles: t.tiles,
    cols: t.cols,
    rows: t.rows,
    source: "map"
  }), ge.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0) : Dx(e);
}, Yx = () => {
  const e = Ax();
  if (!e)
    return !1;
  const t = Lx(e);
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
      const a = Wt();
      W.getState().setTileMapTiles(t.map.id, o);
      const c = Wt();
      Zs(a, c);
    }
    return ge.getState().clear(), jt.getState().setActiveTool("tile-stamp"), !0;
  }
  if (!Dx(e))
    return !1;
  const s = Array.from(
    new Set(W.getState().selectedTileIndices.filter((o) => o >= 0))
  ).sort((o, a) => o - a);
  if (s.length === 0)
    return !1;
  const l = Wt();
  W.getState().deleteTilesFromSet(e.id, s);
  const i = Wt();
  return Zs(l, i), !0;
}, Xx = async () => {
  const e = js();
  if (!e)
    return window.alert("Select a region to export."), null;
  const { data: t, width: n, height: s } = Ad(e), l = document.createElement("canvas");
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
}, Rp = (e, t, n) => Math.min(n, Math.max(t, e)), OM = (e, t, n, s) => {
  const [l, i] = ke.useState({ x: t, y: n });
  return ke.useLayoutEffect(() => {
    if (!e || !s.current) {
      i({ x: t, y: n });
      return;
    }
    const o = s.current.getBoundingClientRect(), a = 8, c = Math.max(a, window.innerWidth - o.width - a), u = Math.max(a, window.innerHeight - o.height - a);
    i({
      x: Rp(t, a, c),
      y: Rp(n, a, u)
    });
  }, [e, s, t, n]), l;
}, hl = ({
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
class FM extends ke.Component {
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
const zM = ({
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
  const h = ke.useRef(null), p = ke.useRef(null), g = Le((N) => N.locked), w = Le((N) => N.undoStack.length > 0), M = Le((N) => N.redoStack.length > 0), v = Le((N) => N.undo), m = Le((N) => N.redo), x = ot((N) => N), S = x.pixels.length > 0 && x.width > 0 && x.height > 0, b = x.tileBuffer !== null && x.tileBuffer.cols > 0 && x.tileBuffer.rows > 0 && x.tileBuffer.tiles.length > 0, _ = s === "tile", k = W(
    (N) => new Set(N.selectedTileIndices.filter(($) => $ >= 0)).size
  ), C = t > 0 || k > 0, R = () => {
    if (_) {
      Bx();
      return;
    }
    Ur();
  }, D = () => {
    if (_) {
      Yx();
      return;
    }
    Rx();
  }, P = () => {
    if (_) {
      b && n("tile-stamp");
      return;
    }
    n("stamp");
  }, A = Ae((N) => N.showReferenceLayer), H = Ae((N) => N.showPixelLayer), J = Ae((N) => N.showTileLayer), oe = Ae((N) => N.showPixelGrid), le = Ae((N) => N.showTileGrid), ie = Ae((N) => N.showAxes), B = Ae((N) => N.toggleReferenceLayer), X = Ae((N) => N.togglePixelLayer), K = Ae((N) => N.toggleTileLayer), ee = Ae((N) => N.togglePixelGrid), ce = Ae((N) => N.toggleTileGrid), U = Ae((N) => N.toggleAxes), [Z, xe] = ke.useState({
    open: !1,
    kind: "layers",
    x: 0,
    y: 0
  }), me = OM(Z.open, Z.x, Z.y, p), F = ke.useCallback(() => {
    xe((N) => N.open ? { ...N, open: !1 } : N);
  }, []), G = (N) => ($) => {
    if ($.preventDefault(), Z.open && Z.kind === N) {
      F();
      return;
    }
    xe({ open: !0, kind: N, x: $.clientX, y: $.clientY });
  };
  return ke.useEffect(() => {
    if (!Z.open)
      return;
    const N = (se) => {
      p.current && p.current.contains(se.target) || F();
    }, $ = (se) => {
      se.key === "Escape" && F();
    };
    return window.addEventListener("mousedown", N), window.addEventListener("keydown", $), () => {
      window.removeEventListener("mousedown", N), window.removeEventListener("keydown", $);
    };
  }, [F, Z.open]), ke.useLayoutEffect(() => {
    const N = h.current;
    if (!N)
      return;
    const $ = () => {
      const de = N.offsetHeight;
      de > 0 && document.documentElement.style.setProperty("--topbar-height", `${de}px`);
    };
    if ($(), typeof ResizeObserver > "u") {
      const de = () => $();
      return window.addEventListener("resize", de), () => {
        window.removeEventListener("resize", de);
      };
    }
    const se = new ResizeObserver($);
    return se.observe(N), () => se.disconnect();
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
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.undo })
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
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.redo })
        }
      ),
      /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: R,
          title: _ ? "Copy Tiles" : "Copy Selection (Active Layer)",
          "aria-label": "Copy Selection",
          disabled: _ ? !C : t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.copy })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Ur({ deep: !0 }),
          title: "Deep Copy Selection (Merged)",
          "aria-label": "Deep Copy Selection",
          disabled: _ || t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["copy-deep"] })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: D,
          title: _ ? "Cut Tiles" : "Cut Selection",
          "aria-label": "Cut Selection",
          disabled: _ ? !C : t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.cut })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: P,
          title: _ ? "Paste Tiles (Tile Stamp)" : "Paste (Stamp Tool)",
          "aria-label": "Paste",
          disabled: _ ? !b : !S,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.paste })
        }
      ),
      c !== !1 && /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            Xx();
          },
          title: "Export PNG…",
          "aria-label": "Export PNG",
          disabled: t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.export })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => ge.getState().clear(),
          title: "Clear Selection",
          "aria-label": "Clear Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.clear })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.pen })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.spray })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.line })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.rectangle })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.oval })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["fill-bucket"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.text })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.ai })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["reference-handle"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.eyedropper })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-sampler"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.stamp })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-rect"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-oval"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["magic-wand"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-lasso"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["texture-roll"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-pen"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-stamp"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-rectangle"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-9slice"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["tile-export"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-rect"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-oval"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["magic-wand"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["selection-lasso"] })
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
            children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve["texture-roll"] })
          }
        )
      ] }),
      /* @__PURE__ */ r.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": Z.open && Z.kind === "layers",
          onClick: G("layers"),
          title: "Layers",
          "aria-label": "Layers",
          "aria-expanded": Z.open && Z.kind === "layers",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.layers })
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": Z.open && Z.kind === "overlays",
          onClick: G("overlays"),
          title: "Overlays",
          "aria-label": "Overlays",
          "aria-expanded": Z.open && Z.kind === "overlays",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.overlays })
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
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.swatch })
        }
      ),
      u !== !1 && /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            var N, $;
            ($ = (N = window.windowApi) == null ? void 0 : N.toggleFullscreen) == null || $.call(N);
          },
          title: "Toggle Full Screen (F11)",
          "aria-label": "Toggle Full Screen",
          children: /* @__PURE__ */ r.jsx("span", { className: "toolbar__tool-icon", children: ve.fullscreen })
        }
      ),
      f && /* @__PURE__ */ r.jsx("div", { className: "topbar__options", children: f })
    ] }),
    Z.open && /* @__PURE__ */ r.jsxs(
      "div",
      {
        ref: p,
        className: "bottom-dock__menu",
        role: "menu",
        "aria-label": Z.kind === "layers" ? "Layers" : "Overlays",
        style: { top: me.y, left: me.x },
        children: [
          /* @__PURE__ */ r.jsx("div", { className: "bottom-dock__menu-title", children: Z.kind === "layers" ? "Layers" : "Overlays" }),
          Z.kind === "layers" ? /* @__PURE__ */ r.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ r.jsx(hl, { checked: A, label: "Reference", onChange: B }),
            /* @__PURE__ */ r.jsx(hl, { checked: H, label: "Pixels", onChange: X }),
            d !== !1 && /* @__PURE__ */ r.jsx(hl, { checked: J, label: "Tiles", onChange: K })
          ] }) : /* @__PURE__ */ r.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ r.jsx(
              hl,
              {
                checked: oe,
                label: "Pixel Grid",
                onChange: ee,
                title: "Toggle pixel grid visibility"
              }
            ),
            d !== !1 && /* @__PURE__ */ r.jsx(
              hl,
              {
                checked: le,
                label: "Tile Grid",
                onChange: ce,
                title: "Toggle tile grid visibility"
              }
            ),
            /* @__PURE__ */ r.jsx(hl, { checked: ie, label: "Axes", onChange: U, title: "Toggle axis visibility" })
          ] })
        ]
      }
    )
  ] });
}, HM = ({
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
}) => /* @__PURE__ */ r.jsx(FM, { children: /* @__PURE__ */ r.jsx(
  zM,
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
) }), WM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", UM = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, $M = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), i = URL.createObjectURL(l), o = new Image();
  o.onload = () => {
    URL.revokeObjectURL(i), n(o);
  }, o.onerror = () => {
    URL.revokeObjectURL(i), s(new Error("Failed to load reference image"));
  }, o.src = i;
}), VM = () => {
  const e = re.getState(), t = Ce.getState(), n = ne.getState(), s = Le.getState(), l = Ut.getState(), i = W.getState(), o = Ft.getState(), a = /* @__PURE__ */ new Map(), c = l.items.filter((u) => u.assetFilename && u.assetData).map((u) => (a.has(u.assetFilename) || a.set(u.assetFilename, {
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
}, KM = async (e) => {
  var f, h, p, g, w;
  Ed(), Ft.getState().clear();
  const t = re.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), Ce.getState().setCamera(e.data.camera);
  const s = ne.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (f = e.data.pixelLayers) == null ? void 0 : f.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), z.getState().clear(), Le.getState().setStacks(((h = e.data.history) == null ? void 0 : h.undoStack) ?? [], ((p = e.data.history) == null ? void 0 : p.redoStack) ?? []);
  const o = Ut.getState();
  o.clear();
  const a = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (a.length > 0 && c.length > 0) {
    const M = new Map(c.map((m) => [m.filename, m])), v = await Promise.all(
      a.map(async (m) => {
        const x = M.get(m.filename);
        if (!x)
          return null;
        const S = await $M(x.data, x.type || m.type), b = Number.isFinite(m.width) ? m.width : S.naturalWidth || S.width, _ = Number.isFinite(m.height) ? m.height : S.naturalHeight || S.height;
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
  we.getState().setDirty(!1), W.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []), Ft.getState().setAll(((g = e.data.bookmarks) == null ? void 0 : g.items) ?? [], ((w = e.data.bookmarks) == null ? void 0 : w.overlaysVisible) ?? !0);
}, Ap = async (e) => {
  const t = VM(), n = await window.projectApi.save(t, e);
  if (n) {
    const s = we.getState();
    s.setPath(n), s.setDirty(!1);
  }
  return n;
}, GM = async (e) => {
  Ed();
  const t = await window.projectApi.load(e);
  if (!t)
    return null;
  await KM(t);
  const n = we.getState();
  return n.setPath(t.path), n.setDirty(!1), t.path;
}, Ox = () => {
  Ed(), Ft.getState().clear(), re.getState().reset(), Ce.getState().resetCamera(), ne.getState().clear(), z.getState().clear(), Le.getState().clear(), Ut.getState().clear(), W.getState().clear();
  const a = we.getState();
  a.setPath(null), a.setDirty(!1);
}, QM = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, ZM = async (e) => {
  var t;
  return (t = window.projectApi) != null && t.read ? window.projectApi.read(e) : (window.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, qM = (e, t) => {
  var f;
  const n = ((f = e.data.palette) == null ? void 0 : f.colors) ?? [], s = re.getState();
  if (!QM(s.colors, n)) {
    window.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = ne.getState(), i = l.activeLayerId, o = Math.trunc(t.offsetX), a = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const h of u)
    if (h.visible !== !1)
      for (const p of h.blocks) {
        const g = p.col * Y, w = p.row * Y, M = p.data;
        for (let v = 0; v < M.length; v += 1) {
          const m = M[v] ?? 0;
          if (m === 0)
            continue;
          const x = v % Y, S = Math.floor(v / Y), b = g + x, _ = w + S;
          c.set(`${b}:${_}`, m);
        }
      }
  const d = [];
  for (const [h, p] of c.entries()) {
    const [g, w] = h.split(":"), M = Number(g), v = Number(w), m = M + o, x = v + a, S = l.getPixelInLayer(i, m, x);
    S !== p && d.push({ x: m, y: x, prev: S, next: p });
  }
  qi(d, { label: "Merge Project" });
}, kn = 8, ji = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, JM = (e) => Mt(e), eb = (e) => e.map((t) => JM(t) ?? { r: 0, g: 0, b: 0 }), Lp = (e, t, n) => {
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
}, Fx = (e, t) => {
  var f;
  const n = eb(t), s = /* @__PURE__ */ new Map();
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
          for (const R of S) {
            const D = s.get(R) ?? 1;
            C += ji(n[k], n[R]) * D;
          }
          C < _ && (_ = C, b = k);
        }
        m.push(b);
      }
      for (w = Array.from(new Set(m)); w.length < 3; ) {
        const x = Lp(
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
  const o = /* @__PURE__ */ new Set([0, ...i]), a = Lp(n, o, 4 - o.size);
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
}, zx = (e, t, n, s) => {
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
}, Hx = (e, t, n, s) => {
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
}, $r = (e) => Math.ceil(e / kn) * kn, Wx = (e, t, n) => {
  const s = t / kn, l = n / kn, i = s * l, o = new Uint8Array(i * kn * 2);
  let a = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const d = u * kn, f = c * kn;
      for (let h = 0; h < kn; h += 1) {
        let p = 0, g = 0;
        for (let w = 0; w < kn; w += 1) {
          const M = (f + h) * t + (d + w), v = e[M] & 3, m = 7 - w;
          p |= (v & 1) << m, g |= (v >> 1 & 1) << m;
        }
        o[a] = p, o[a + 1] = g, a += 2;
      }
    }
  return { data: o, tileCount: i };
}, hi = (e, t, n) => {
  e.setUint16(t, n, !0);
}, tb = (e, t, n) => {
  e.setUint32(t, n, !0);
}, nb = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), i = Math.min(l.length, s - 1);
  for (let o = 0; o < i; o += 1)
    e.setUint8(t + o, l[o]);
  e.setUint8(t + i, 0);
  for (let o = i + 1; o < s; o += 1)
    e.setUint8(t + o, 0);
}, sb = (e, t, n) => {
  const l = 40 + e.length, i = 12 + l, o = new ArrayBuffer(i), a = new DataView(o), c = new Uint8Array(o);
  c.set([71, 66, 79, 48], 0), hi(a, 4, 2), hi(a, 6, 1), tb(a, 8, l);
  let u = 12;
  nb(a, u, "Pixel Splash Studio", 30), u += 30, hi(a, u, kn), u += 2, hi(a, u, kn), u += 2, hi(a, u, t), u += 2;
  for (let d = 0; d < 4; d += 1)
    c[u + d] = n[d] ?? d;
  return u += 4, c.set(e, u), new Uint8Array(o);
}, lb = async () => {
  var p;
  if (!((p = window.projectApi) != null && p.exportGbr))
    return window.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const e = js();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Fx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $r(e.maxX - e.minX + 1), i = $r(e.maxY - e.minY + 1), o = n.map((g) => s[g]), { data: a } = zx(e, s, l, i), c = Hx(a, l, i, o), { data: u, tileCount: d } = Wx(c, l, i), f = sb(u, d, [0, 1, 2, 3]), h = `pixel-splash-selection-${l}x${i}.gbr`;
  return window.projectApi.exportGbr(f, h);
}, ib = async () => {
  var f;
  if (!((f = window.projectApi) != null && f.exportChr))
    return window.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const e = js();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = re.getState(), { paletteIndices: n, paletteRgb: s } = Fx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = $r(e.maxX - e.minX + 1), i = $r(e.maxY - e.minY + 1), o = n.map((h) => s[h]), { data: a } = zx(e, s, l, i), c = Hx(a, l, i, o), { data: u } = Wx(c, l, i), d = `pixel-splash-selection-${l}x${i}.chr`;
  return window.projectApi.exportChr(u, d);
}, Ux = () => {
  var e;
  return (e = window.projectApi) != null && e.exportImage ? !0 : (window.alert("Image export is unavailable. Restart the app to load the latest export support."), !1);
}, Ld = async (e) => {
  const t = js();
  if (!t)
    return window.alert("Select a region to export."), null;
  if (!Ux())
    return null;
  const { data: n, width: s, height: l } = Ad(t), i = new Uint8Array(n), o = `pixel-splash-selection-${s}x${l}.${e}`;
  return window.projectApi.exportImage(e, { kind: "rgba", width: s, height: l, data: i }, o);
}, ob = () => Ld("bmp"), rb = () => Ld("gif"), ab = () => Ld("tga"), cb = async () => {
  const e = js();
  if (!e)
    return window.alert("Select a region to export."), null;
  if (!Ux())
    return null;
  let t = 0;
  for (const c of e.pixels)
    c.paletteIndex > t && (t = c.paletteIndex);
  if (t > 255)
    return window.alert("PCX export supports palette indices up to 255."), null;
  const { data: n, width: s, height: l } = AM(e), i = re.getState().colors, o = new Uint8Array(256 * 3);
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
}, gn = 320, Un = 200, ub = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, db = (e) => e.map((t) => Mt(t) ?? { r: 0, g: 0, b: 0 }), hb = (e, t, n) => {
  const i = Array.from(e.entries()).sort((o, a) => a[1] - o[1]).map(([o]) => o).filter((o) => o <= n).slice(0, t);
  if (i.length >= t)
    return i;
  for (let o = 0; o <= n && i.length < t; o += 1)
    i.includes(o) || i.push(o);
  return i;
}, fb = (e, t) => {
  if (!e)
    return null;
  const n = new Float32Array(gn * Un * 3), s = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let l = 0; l < gn * Un; l += 1) {
    const i = l * 3;
    n[i] = s.r, n[i + 1] = s.g, n[i + 2] = s.b;
  }
  for (const l of e.pixels) {
    const i = l.x - e.minX, o = l.y - e.minY;
    if (i < 0 || o < 0 || i >= gn || o >= Un)
      continue;
    const a = t[l.paletteIndex] ?? s, c = (o * gn + i) * 3;
    n[c] = a.r, n[c + 1] = a.g, n[c + 2] = a.b;
  }
  return n;
}, pb = (e, t) => {
  const n = new Uint8Array(gn * Un);
  for (let s = 0; s < Un; s += 1)
    for (let l = 0; l < gn; l += 1) {
      const i = (s * gn + l) * 3, o = e[i], a = e[i + 1], c = e[i + 2];
      let u = 0, d = 1 / 0;
      for (let f = 0; f < t.length; f += 1) {
        const h = ub({ r: o, g: a, b: c }, t[f]);
        h < d && (d = h, u = f);
      }
      n[s * gn + l] = u;
    }
  return n;
}, mb = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, gb = (e) => {
  const n = new Uint8Array(80 * Un);
  for (let s = 0; s < Un; s += 1) {
    const l = (s & 1) * 8192, i = (s >> 1) * 80;
    for (let o = 0; o < gn; o += 4) {
      const a = s * gn + o, c = e[a] & 3, u = e[a + 1] & 3, d = e[a + 2] & 3, f = e[a + 3] & 3, h = c << 6 | u << 4 | d << 2 | f, p = o >> 2;
      n[l + i + p] = h;
    }
  }
  return n;
}, xb = (e) => {
  const n = 40 * Un, s = new Uint8Array(n * 4);
  for (let l = 0; l < Un; l += 1)
    for (let i = 0; i < gn; i += 1) {
      const o = e[l * gn + i] & 15, a = l * 40 + (i >> 3), c = 7 - (i & 7);
      for (let u = 0; u < 4; u += 1) {
        const d = u * n;
        o & 1 << u && (s[d + a] |= 1 << c);
      }
    }
  return s;
}, yb = (e) => e, Dd = async (e, t, n, s) => {
  var M;
  if (!((M = window.projectApi) != null && M.exportBsave))
    return window.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const l = js();
  if (!l)
    return window.alert("Select a region to export."), null;
  const i = re.getState().colors, o = db(i), a = /* @__PURE__ */ new Map();
  for (const v of l.pixels)
    a.set(v.paletteIndex, (a.get(v.paletteIndex) ?? 0) + 1);
  const c = o.length - 1, d = (t >= o.length ? o.map((v, m) => m) : hb(a, t, c)).map((v) => o[v]), f = fb(l, o);
  if (!f)
    return null;
  const h = pb(f, d);
  let p;
  e === "cga" ? p = gb(h) : e === "ega" ? p = xb(h) : p = yb(h);
  const g = mb(n, 0, p.length), w = new Uint8Array(g.length + p.length);
  return w.set(g, 0), w.set(p, g.length), window.projectApi.exportBsave(w, s);
}, vb = () => Dd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), wb = () => Dd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), Sb = () => Dd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), Mb = (e) => e.trim().toLowerCase(), bb = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, i) => {
    const o = Mb(l), a = t.get(o);
    if (a !== void 0) {
      n[i] = a;
      return;
    }
    const c = s.length;
    t.set(o, c), n[i] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, _b = () => {
  const e = re.getState(), t = e.colors, { mapped: n, nextColors: s } = bb(t);
  if (s.length === t.length)
    return !1;
  const l = (h) => Number.isFinite(h) && h >= 0 && h < n.length ? n[h] : 0, i = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(i);
  const o = ne.getState(), a = o.exportLayerPayloads().map((h) => ({
    ...h,
    blocks: h.blocks.map(({ row: p, col: g, data: w }) => {
      const M = new Uint8Array(w.length);
      for (let v = 0; v < w.length; v += 1)
        M[v] = l(w[v]);
      return { row: p, col: g, data: M };
    })
  }));
  o.loadLayerPayloads(a, o.activeLayerId);
  const c = z.getState();
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
  const d = Le.getState(), f = (h) => ({
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
  ), we.getState().setDirty(!0), !0;
}, Tb = (e, t, n) => e << 16 | t << 8 | n, kb = (e) => {
  const t = e.palette;
  let n = t ? t.map((o) => Wl({ r: o[0], g: o[1], b: o[2] })) : [];
  if (n.length === 0) {
    let o = 0;
    for (let a = 0; a < e.pixels.length; a += 1)
      e.pixels[a] > o && (o = e.pixels[a]);
    n = Array.from(
      { length: o + 1 },
      (a, c) => Wl({ r: c, g: c, b: c })
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
}, Cb = (e) => {
  const t = [], n = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] !== 0)
      continue;
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2];
    t[0] = Wl({ r: a, g: c, b: u });
    break;
  }
  t[0] || (t[0] = "#000000");
  const s = [], l = e.width;
  for (let i = 0; i < e.pixels.length; i += 4) {
    if (e.pixels[i + 3] === 0)
      continue;
    const a = e.pixels[i], c = e.pixels[i + 1], u = e.pixels[i + 2], d = Tb(a, c, u);
    let f = n.get(d);
    f === void 0 && (f = t.length, t.push(Wl({ r: a, g: c, b: u })), n.set(d, f));
    const h = i / 4, p = h % l, g = Math.floor(h / l);
    s.push({ x: p, y: g, paletteIndex: f });
  }
  return { paletteColors: t, pixels: s };
}, jb = (e) => {
  const t = re.getState(), n = ne.getState(), s = ge.getState(), l = ot.getState();
  if (Ox(), e.colorType === "indexed") {
    const i = kb(e), o = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(o, 0, Math.min(1, Math.max(0, o.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  } else {
    const i = Cb(e), o = i.paletteColors.length > 0 ? i.paletteColors : ["#000000"];
    t.setPalette(o, 0, Math.min(1, Math.max(0, o.length - 1))), i.pixels.length > 0 && n.setPixels(i.pixels);
  }
  s.clear(), l.clear(), we.getState().setDirty(!0);
}, Pb = (e) => {
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
}, Ic = (e) => e.toString(16).padStart(2, "0"), Nb = (e) => `#${Ic(e.r)}${Ic(e.g)}${Ic(e.b)}`, Dp = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Ib = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(dx)) === "true";
  } catch {
    return !1;
  }
}, $x = (e) => {
  const t = ma(e), n = Math.floor(t.minX / j), s = Math.floor(t.minY / j), l = Math.ceil(t.maxX / j), i = Math.ceil(t.maxY / j), o = Math.max(0, l - n), a = Math.max(0, i - s);
  if (o === 0 || a === 0)
    return null;
  const c = o * a;
  if ((o > pc || a > pc || c > Vf) && !Ib()) {
    const m = `Reference trace is too large (${o}x${a}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${dx}"]="true" to override.`;
    return typeof window < "u" && window.alert(m), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
      width: o,
      height: a,
      pixelCount: c,
      maxDimension: pc,
      maxPixels: Vf
    }), null;
  }
  const d = document.createElement("canvas");
  d.width = o, d.height = a;
  const f = d.getContext("2d", { willReadFrequently: !0 });
  if (!f)
    return null;
  f.imageSmoothingEnabled = !1;
  const h = Qn(e), p = h.centerX / j, g = h.centerY / j, w = h.baseWidth / j, M = h.baseHeight / j;
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
}, Eb = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const i = Mt(l);
    i && n.push({ paletteIndex: s, rgb: i });
  }
  return n;
}, Rb = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, Ew);
  for (let i = 0; i < e.length; i += 4) {
    if (e[i + 3] < ux)
      continue;
    const o = Math.min(255, Math.round(e[i] / s) * s), a = Math.min(255, Math.round(e[i + 1] / s) * s), c = Math.min(255, Math.round(e[i + 2] / s) * s), u = `${o},${a},${c}`, d = n.get(u);
    d ? d.count += 1 : n.set(u, { rgb: { r: o, g: a, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((i, o) => o.count - i.count).slice(0, t).map((i) => i.rgb);
}, Ab = (e) => {
  const t = re.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((o, a) => {
    s.set(o.toLowerCase(), a);
  });
  const l = [], i = [];
  for (const o of e) {
    const a = Nb(o), c = a.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(a), s.set(c, u)), i.push({ paletteIndex: u, rgb: o });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), i;
}, Vx = (e, t) => {
  if (t.length === 0)
    return;
  const n = ne.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let i = 0; i < e.height; i += 1)
    for (let o = 0; o < e.width; o += 1) {
      const a = (i * e.width + o) * 4;
      if (e.data[a + 3] < ux)
        continue;
      const u = e.data[a], d = e.data[a + 1], f = e.data[a + 2], h = `${u},${d},${f}`;
      let p = l.get(h);
      if (p === void 0) {
        const v = { r: u, g: d, b: f };
        let m = t[0], x = Dp(v, m.rgb);
        for (let S = 1; S < t.length; S += 1) {
          const b = t[S], _ = Dp(v, b.rgb);
          _ < x && (x = _, m = b);
        }
        p = m.paletteIndex, l.set(h, p);
      }
      const g = e.offsetX + o, w = e.offsetY + i, M = n.getPixel(g, w);
      M !== p && s.push({ x: g, y: w, prev: M, next: p });
    }
  s.length !== 0 && qi(s, { label: "Reference Trace" });
}, Lb = (e, t) => {
  const n = re.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((a) => Math.round(a)).filter((a) => Number.isFinite(a)).filter((a) => a >= 0 && a < n.length).sort((a, c) => a - c);
  if (l.length === 0)
    return;
  const i = Eb(n, l);
  if (i.length === 0)
    return;
  const o = $x(e);
  o && Vx(o, i);
}, Db = (e, t) => {
  const n = $x(e);
  if (!n)
    return;
  const s = Math.max(
    ku,
    Math.min(t, Cu)
  ), l = Rb(n.data, s);
  if (l.length === 0)
    return;
  const i = Ab(l);
  Vx(n, i);
}, xi = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), Bs = (e, t, n) => {
  const s = xi(e.x, 0, Math.max(0, t - 1)), l = xi(e.y, 0, Math.max(0, n - 1)), i = xi(e.width, 1, Math.max(1, t - s)), o = xi(e.height, 1, Math.max(1, n - l));
  return { x: s, y: l, width: i, height: o };
}, Ec = (e, t, n, s) => {
  const l = Bs(s, t, n), i = new Uint8Array(l.width * l.height);
  for (let o = 0; o < l.height; o += 1) {
    const c = (l.y + o) * t + l.x, u = o * l.width;
    i.set(e.subarray(c, c + l.width), u);
  }
  return { pixels: i, width: l.width, height: l.height };
}, Bp = (e, t, n, s) => {
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
}, Bb = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Yp = (e, t) => {
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
      const f = Bb(a, n[d] ?? n[0]);
      f < u && (u = f, c = d);
    }
    s.set(i, c);
  }
  return s;
}, Xp = (e, t, n) => {
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
}, Zo = (e, t) => {
  const n = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s += 1) {
    const l = e[s] ?? 0;
    n[s] = t.get(l) ?? 0;
  }
  return n;
}, Op = (e, t) => {
  if (e && e.length > 0)
    return e.map((s) => Wl({ r: s[0], g: s[1], b: s[2] }));
  if (!t)
    return ["#000000"];
  let n = 0;
  for (let s = 0; s < t.length; s += 1) {
    const l = t[s] ?? 0;
    l > n && (n = l);
  }
  return Array.from({ length: n + 1 }, (s, l) => Wl({ r: l, g: l, b: l }));
}, Yb = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), i = s.map((o) => Mt(o) ?? { r: 0, g: 0, b: 0 });
  for (let o = 0; o < e.length; o += 1) {
    const a = e[o] ?? 0, c = i[a] ?? i[0], u = o * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = a === 0 ? 0 : 255;
  }
  return l;
}, On = (e, t, n) => Math.min(n, Math.max(t, e)), pl = (e) => e === "tile-pen" || e === "tile-stamp" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", Xb = (e) => e === "tile-sampler" || pl(e), Ob = (e) => e === "selection-rect" || e === "selection-oval" || e === "selection-lasso" || e === "magic-wand" || e === "texture-roll", Al = 0, Vr = 100, Bd = Math.log10(Qs), Fb = Math.log10(Hl), Lu = Fb - Bd, Fp = 72, zp = 360, zb = 32, Hb = (e) => {
  const t = On(e, Qs, Hl), n = Lu === 0 ? 0 : (Math.log10(t) - Bd) / Lu;
  return Math.round(
    Al + n * (Vr - Al)
  );
}, Wb = (e) => {
  const t = (On(e, Al, Vr) - Al) / (Vr - Al), n = Bd + t * Lu;
  return Math.pow(10, n);
}, Ub = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, rn = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), Hp = (e) => {
  if (e < 1024)
    return `${e}B`;
  const t = e / 1024;
  if (t < 1024)
    return `${t.toFixed(t < 10 ? 1 : 0)}KB`;
  const n = t / 1024;
  return n < 1024 ? `${n.toFixed(n < 10 ? 1 : 0)}MB` : `${(n / 1024).toFixed(1)}GB`;
}, Wp = (e) => e.reduce((t, n) => t + n.block.byteLength, 0), Up = (e) => {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" ? !0 : e.isContentEditable;
}, $b = () => {
  const t = ne.getState().layers.reduce(
    (M, v) => M + Wp(v.store.getBlocks()),
    0
  ), n = Wp(ge.getState().store.getBlocks()), s = z.getState().pixels.size * Kf, l = ot.getState().pixels.length * Kf, i = Ut.getState().items.reduce((M, v) => M + v.width * v.height * 4, 0), o = Le.getState();
  let a = 0;
  for (const M of o.undoStack)
    a += M.changes.length;
  for (const M of o.redoStack)
    a += M.changes.length;
  const c = a * Aw, d = re.getState().colors.reduce((M, v) => M + v.length * 2, 0) + Nd * 2, f = {
    tool: rn(jt.getState()),
    brush: rn(mn.getState()),
    spray: rn(Zt.getState()),
    rectangle: rn(Xr.getState()),
    oval: rn(Or.getState()),
    selection: rn(Ul.getState()),
    fill: rn(wt.getState()),
    stamp: rn(Ge.getState()),
    viewport: rn(Ce.getState()),
    layers: rn(Ae.getState()),
    project: rn(we.getState()),
    referenceHandle: rn(Hr.getState())
  }, h = Ub(f), p = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: i },
    { label: "hist", bytes: c },
    { label: "pal", bytes: d },
    { label: "ui", bytes: h }
  ], g = p.reduce((M, v) => M + v.bytes, 0), w = p.filter((M) => M.bytes > 0).map((M) => `${M.label} ${Hp(M.bytes)}`);
  return `Mem ${Hp(g)}${w.length ? ` • ${w.join(" • ")}` : ""}`;
}, Vb = () => {
  const e = UM(), t = Le((y) => y.undo), n = Le((y) => y.redo), s = ge((y) => y.selectedCount), l = we((y) => y.path), i = we((y) => y.dirty), [o, a] = T.useState(!1), [c, u] = T.useState(!1), [d, f] = T.useState(!1), [h, p] = T.useState(!1), [g, w] = T.useState(!0), [M, v] = T.useState(!1), [m, x] = T.useState("pen"), [S, b] = T.useState(""), [_, k] = T.useState("monospace"), [C, R] = T.useState(16), [D, P] = T.useState(!1), [A, H] = T.useState("pen"), [J, oe] = T.useState(""), [le, ie] = T.useState(!1), [B, X] = T.useState(null), [K, ee] = T.useState(null), [ce, U] = T.useState(0), [Z, xe] = T.useState(0), [me, F] = T.useState(!1), [G, N] = T.useState(null), [$, se] = T.useState([]), [de, Ze] = T.useState(2), [be, Fe] = T.useState("nearest"), [ze, _e] = T.useState(0), Ie = 32, Se = 2, [pt, $e] = T.useState(!0), [Bt, mt] = T.useState(!1), [wn, In] = T.useState(""), [qn, Yt] = T.useState(96), [tl, Yn] = T.useState(220), he = jt((y) => y.activeTool), rt = jt((y) => y.setActiveTool), je = qs((y) => y.mode), qe = qs((y) => y.setMode), sn = Ae((y) => y.showReferenceLayer), Nt = Ae((y) => y.showPixelLayer), Jn = Ae((y) => y.showTileLayer), Ps = Ae((y) => y.showPixelGrid), I = Ae((y) => y.showTileGrid), E = Ae((y) => y.showAxes), Q = Ae((y) => y.setShowReferenceLayer), ue = Ae((y) => y.setShowPixelLayer), Pe = Ae((y) => y.setShowTileLayer), It = Ae((y) => y.setShowPixelGrid), ln = Ae((y) => y.setShowTileGrid), Ns = Ae((y) => y.setShowAxes), Xt = W((y) => y.tileSets), Sn = W((y) => y.tileMaps), es = W((y) => y.activeTileSetId), Gl = W((y) => y.activeTileMapId), Gx = W((y) => y.selectedTileIndex), Yd = W((y) => y.selectedTileIndices), Ql = W((y) => y.tilePage), Qx = W((y) => y.tilePageCount), Ji = W((y) => y.setTilePage), Is = W((y) => y.tilePickerZoom), Xd = W((y) => y.setTilePickerZoom), Od = W((y) => y.tilePlacementMode), Fd = W((y) => y.setTilePlacementMode), zd = W((y) => y.tilePenSnapToCluster), Hd = W((y) => y.setTilePenSnapToCluster), Wd = W((y) => y.setActiveTileSet), Ud = W((y) => y.setTileSetLayout), $d = W((y) => y.addTileSet), Vd = W((y) => y.duplicateTileSet), Kd = W((y) => y.renameTileSet), Gd = W((y) => y.deleteTileSet), Qd = W((y) => y.deleteTilesFromSet), Zx = mn((y) => y.size), Zd = mn((y) => y.shape), qd = Zt((y) => y.radius), Jd = Zt((y) => y.density), eh = Zt((y) => y.falloff), th = Xr((y) => y.mode), nh = Xr((y) => y.setMode), sh = Or((y) => y.mode), lh = Or((y) => y.setMode), eo = Ul((y) => y.snap), to = Ul((y) => y.setSnap), ih = wt((y) => y.mode), oh = wt((y) => y.setMode), no = wt((y) => y.gradientDirection), so = wt((y) => y.setGradientDirection), lo = wt((y) => y.gradientDither), io = wt((y) => y.setGradientDither), ga = re((y) => y.selectedIndices), oo = ga.length, qx = re((y) => y.getActiveIndex()), ro = Ge((y) => y.mode), nl = Ge((y) => y.snap), Jx = Ge((y) => y.rotation), ey = Ge((y) => y.scale), rh = Ge((y) => y.flipX), ah = Ge((y) => y.flipY), ao = Ge((y) => y.drag), xa = Ge((y) => y.pasteDuplicateColors), ch = W((y) => y.tileDebugOverlay), ya = W((y) => y.setTileDebugOverlay), ty = W((y) => y.nineSlice), ny = W((y) => y.selectedTileCols), sy = W((y) => y.selectedTileRows), va = Ut((y) => y.removeReference), co = ke.useRef(!1), sl = T.useRef(null), uh = T.useRef(null), Zl = T.useRef(null), Re = 8, ll = G ? Math.floor(G.width / Re) : 0, Es = G ? Math.floor(G.height / Re) : 0, uo = Math.max(1, Math.ceil(Es / Ie)), ho = Math.min(Math.max(0, ze), Math.max(0, uo - 1)), dh = ho * Ie, ql = $[$.length - 1] ?? null;
  T.useEffect(() => {
    const y = window.setTimeout(() => {
      w(!1);
    }, 2e3);
    return () => window.clearTimeout(y);
  }, []), T.useEffect(() => {
    var te, Ne, Ee, Xe;
    const y = document.documentElement, L = (at) => {
      const Ve = Number.isFinite(at) && at > 0 ? at : 1;
      y.style.setProperty("--ui-scale", String(Ve));
    };
    L(((Ne = (te = window.uiScaleApi) == null ? void 0 : te.getScale) == null ? void 0 : Ne.call(te)) ?? 1);
    const V = (Xe = (Ee = window.uiScaleApi) == null ? void 0 : Ee.onScaleChange) == null ? void 0 : Xe.call(Ee, L);
    return () => {
      V && V();
    };
  }, []), T.useEffect(() => {
    var y;
    if ((y = window.paletteApi) != null && y.onApply)
      return window.paletteApi.onApply((L) => {
        const V = Array.isArray(L.colors) ? L.colors : [];
        if (V.length === 0)
          return;
        const te = re.getState();
        te.setPalette(V), te.setSelectedIndices([]), we.getState().setDirty(!0);
      });
  }, []);
  const hh = Ge((y) => y.setMode), fo = Ge((y) => y.setSnap), ly = Ge((y) => y.setRotation), iy = Ge((y) => y.setScale), oy = Ge((y) => y.setFlipX), ry = Ge((y) => y.setFlipY), fh = Ge((y) => y.setDrag), ay = Ge(
    (y) => y.setPasteDuplicateColors
  ), wa = mn((y) => y.setSize), Sa = mn((y) => y.setShape), ph = Zt((y) => y.setRadius), mh = Zt((y) => y.setDensity), gh = Zt((y) => y.setFalloff), Ma = ke.useRef("pen"), ba = ke.useRef("tile-pen");
  T.useEffect(() => {
    if (pl(he)) {
      ba.current = he;
      return;
    }
    Ma.current = he;
  }, [he]);
  const _a = T.useCallback(
    (y) => {
      if (y === "tile" && (!h || e))
        return;
      if (qe(y), y === "tile") {
        const V = pl(ba.current) ? ba.current : "tile-pen";
        rt(V);
        return;
      }
      const L = pl(Ma.current) ? "pen" : Ma.current;
      rt(L);
    },
    [h, e, rt, qe]
  ), po = T.useCallback(
    (y) => {
      if (pl(y)) {
        if (!h || e)
          return;
        qe("tile");
      } else Ob(y) && je === "tile" && h && !e ? qe("tile") : qe("pixel");
      if (y === "selection-lasso") {
        rt("selection-lasso"), wa(1), Sa("round");
        return;
      }
      if (y === "text") {
        x((L) => he === "text" ? L : he), rt("text"), v(!0);
        return;
      }
      if (y === "ai") {
        H((L) => he === "ai" ? L : he), rt("ai"), P(!0);
        return;
      }
      rt(y);
    },
    [
      he,
      h,
      e,
      rt,
      Sa,
      wa,
      qe,
      je
    ]
  ), ts = re((y) => y.colors), il = Hr((y) => y.snap), mo = Hr((y) => y.setSnap), xh = Ut((y) => y.setSelected), Ye = Ut(
    (y) => y.selectedId ? y.items.find((L) => L.id === y.selectedId) ?? null : null
  ), cy = Ut((y) => y.updateReference), [Ta, uy] = T.useState(Rw), ka = Ww(), ae = Xt.find((y) => y.id === es) ?? Xt[0], yh = Sn.find((y) => y.id === Gl) ?? Sn[0], Rs = ke.useMemo(() => {
    const y = new Set(Yd.filter((L) => L >= 0));
    return Array.from(y).sort((L, V) => L - V);
  }, [Yd]), Ca = T.useCallback(
    (y) => {
      Number.isFinite(y) && Xd(y);
    },
    [Xd]
  ), ja = Math.max(1, Qx), Pa = Math.min(Ql, ja - 1), dy = T.useCallback(() => {
    Ji(Ql - 1);
  }, [Ji, Ql]), hy = T.useCallback(() => {
    Ji(Ql + 1);
  }, [Ji, Ql]), vh = T.useCallback(
    (y, L) => {
      ae && (!Number.isFinite(y) || !Number.isFinite(L) || Ud(ae.id, y, L));
    },
    [ae, Ud]
  ), fy = T.useCallback(() => {
    const y = (ae == null ? void 0 : ae.tileWidth) ?? pe, L = (ae == null ? void 0 : ae.tileHeight) ?? pe;
    $d({
      name: `Tile Set ${Xt.length + 1}`,
      tileWidth: y,
      tileHeight: L,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [ae, $d, Xt.length]), py = T.useCallback(() => {
    ae && Vd(ae.id);
  }, [ae, Vd]), my = T.useCallback(() => {
    if (!ae)
      return;
    const y = ae.name, L = window.prompt("Rename tile set", y);
    if (typeof L != "string")
      return;
    const V = L.trim();
    !V || V === y || Kd(ae.id, V);
  }, [ae, Kd]), gy = T.useCallback(() => {
    if (!ae)
      return;
    const y = Sn.filter((V) => V.tileSetId === ae.id).length, L = y > 0 ? `Delete ${ae.name}? This will also delete ${y} linked tile map${y === 1 ? "" : "s"}.` : `Delete ${ae.name}?`;
    window.confirm(L) && Gd(ae.id);
  }, [ae, Gd, Sn]), xy = T.useCallback(() => {
    if (!ae || Rs.length === 0)
      return;
    const y = Rs.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${Rs.length} ${y} from ${ae.name}? This cannot be undone.`
    ) && Qd(ae.id, Rs);
  }, [ae, Qd, Rs]), _t = je === "tile" && h && !e, yy = _t ? tl : qn, Na = ke.useRef("palette"), Ia = ke.useRef(!1);
  T.useEffect(() => {
    _t && (eo !== "tile" && to("tile"), nl !== "tile" && fo("tile"), il !== "tile" && mo("tile"));
  }, [
    _t,
    il,
    eo,
    mo,
    to,
    fo,
    nl
  ]);
  const go = T.useCallback(
    (y) => {
      const L = Math.max(16, y.tileWidth * Is), V = Math.max(1, y.rows) * L;
      return On(
        V + zb,
        Fp,
        zp
      );
    },
    [Is]
  ), vy = T.useCallback(
    (y) => {
      Wd(y);
      const L = Xt.find((V) => V.id === y);
      L && Yn(go(L));
    },
    [go, Wd, Xt]
  );
  T.useEffect(() => {
    if (!_t || !es)
      return;
    const y = Xt.find((L) => L.id === es);
    y && Yn(go(y));
  }, [
    _t,
    es,
    go,
    Xt
  ]);
  const wy = (y) => {
    y.preventDefault(), y.currentTarget.setPointerCapture(y.pointerId), Na.current = _t ? "tile" : "palette", Ia.current = !0;
  };
  T.useEffect(() => {
    const y = (V) => {
      if (!Ia.current)
        return;
      const te = document.documentElement.clientHeight, Ne = Math.max(
        Fp,
        Math.min(zp, te - V.clientY)
      );
      Na.current === "tile" ? Yn(Ne) : Yt(Ne);
    }, L = () => {
      Na.current = _t ? "tile" : "palette", Ia.current = !1;
    };
    return window.addEventListener("pointermove", y), window.addEventListener("pointerup", L), () => {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", L);
    };
  }, [_t]);
  const Sy = (pt ? 0 : 324) + 24;
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
    he !== "reference-handle" && xh(null);
  }, [he, xh]), T.useEffect(() => {
    !h && pl(he) && (rt("pen"), qe("pixel"));
  }, [h, he, rt, qe]), T.useEffect(() => {
    je === "tile" && (!h || e) && qe("pixel");
  }, [h, e, qe, je]), T.useEffect(() => {
    e && he === "ai" && rt("pen");
  }, [he, e, rt]);
  const xo = ke.useCallback(async () => (e || await Ap(l ?? void 0), null), [e, l]), wh = ke.useCallback(async () => (e || await Ap(void 0), null), [e]), yo = ke.useCallback(async () => {
    if (e)
      return null;
    if (!(i && !window.confirm("You have unsaved changes. Continue?")))
      return await GM(void 0), null;
  }, [e, i]), vo = ke.useCallback(() => {
    i && !window.confirm("You have unsaved changes. Continue?") || Ox();
  }, [i]), wo = ke.useCallback(() => {
    a(!0);
  }, [a]), Sh = T.useCallback(async () => {
    const y = await ZM();
    y && (ee(y), X(y.path ?? null), U(0), xe(0), ie(!0));
  }, []), Mh = T.useCallback(async () => {
    var V;
    if (!((V = window.projectApi) != null && V.importImage)) {
      window.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const y = await window.projectApi.importImage();
    if (!y)
      return;
    if (!(y.format === "nes" || y.format === "gb" || y.format === "gbc" || y.format === "chr")) {
      (y.width > 512 || y.height > 512) && window.alert("Large images (over 512x512) can take a while to load."), jb(y);
      return;
    }
    if (y.colorType !== "indexed") {
      window.alert("ROM import preview requires indexed pixels.");
      return;
    }
    N(y), se([
      {
        x: 0,
        y: 0,
        width: Math.floor(y.width / Re),
        height: Math.floor(y.height / Re)
      }
    ]), Ze(2), Fe("nearest"), _e(0), F(!0);
  }, []), So = T.useCallback(() => {
    F(!1), N(null), se([]), Zl.current = null;
  }, []), Mo = T.useCallback(
    (y) => {
      G && se((L) => {
        if (L.length === 0)
          return L;
        const V = L.slice(), te = V[V.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return V[V.length - 1] = Bs({ ...te, ...y }, ll, Es), V;
      });
    },
    [G, ll, Es]
  ), bo = T.useCallback(() => {
    const y = ne.getState(), L = /* @__PURE__ */ new Set();
    for (const V of y.layers)
      for (const te of V.store.getBlocks())
        for (let Ne = 0; Ne < te.block.length; Ne += 1) {
          const Ee = te.block[Ne] ?? 0;
          Ee !== 0 && L.add(Ee);
        }
    return L;
  }, []), My = T.useCallback(() => {
    if (!G || $.length === 0)
      return;
    if (!G.palette) {
      window.alert("ROM palette is missing.");
      return;
    }
    const y = $.map((ye) => Bs(ye, ll, Es)).filter((ye) => ye.width > 0 && ye.height > 0);
    if (y.length === 0) {
      window.alert("Select at least one region.");
      return;
    }
    const L = Op(G.palette, G.pixels), V = y.map((ye) => {
      const ut = Bs(
        {
          x: ye.x * Re,
          y: ye.y * Re,
          width: ye.width * Re,
          height: ye.height * Re
        },
        G.width,
        G.height
      ), Ot = Ec(
        G.pixels,
        G.width,
        G.height,
        ut
      );
      return Bp(Ot.pixels, Ot.width, Ot.height, de);
    }), te = Re * de, Ne = Math.max(Re * de * 32, 512);
    let Ee = 0, Xe = 0, at = 0;
    const Ve = [];
    for (const ye of V) {
      const ut = ye.width, Ot = ye.height;
      Ee > 0 && Ee + ut > Ne && (Ee = 0, Xe += at + te, at = 0), Ve.push({ x: Ee, y: Xe, w: ut, h: Ot, pixels: ye.pixels }), Ee += ut + te, at = Math.max(at, Ot);
    }
    const He = Ve.length === 0 ? 1 : Math.max(...Ve.map((ye) => ye.x + ye.w)), gt = Ve.length === 0 ? 1 : Math.max(...Ve.map((ye) => ye.y + ye.h)), ct = new Uint8Array(He * gt);
    for (const ye of Ve)
      for (let ut = 0; ut < ye.h; ut += 1)
        for (let Ot = 0; Ot < ye.w; Ot += 1)
          ct[(ye.y + ut) * He + (ye.x + Ot)] = ye.pixels[ut * ye.w + Ot] ?? 0;
    const Et = re.getState(), ns = bo();
    let on;
    if (be === "unused") {
      const ye = Xp(L, Et.colors, ns);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Et.setPalette(ye.palette), Et.setSelectedIndices([]), on = Zo(ct, ye.map);
    } else {
      const ye = Yp(G.palette, Et.colors);
      on = Zo(ct, ye);
    }
    const ei = [];
    for (let ye = 0; ye < on.length; ye += 1) {
      const ut = on[ye] ?? 0;
      ut !== 0 && ei.push({ x: ye % He, y: Math.floor(ye / He), paletteIndex: ut });
    }
    ot.getState().setBuffer({
      pixels: ei,
      origin: { x: 0, y: 0 },
      width: He,
      height: gt
    }), Ge.getState().setSnap("tile"), Ge.getState().setScale(1), jt.getState().setActiveTool("stamp"), So();
  }, [
    So,
    bo,
    be,
    G,
    de,
    $,
    ll,
    Es
  ]);
  T.useEffect(() => {
    const y = $[$.length - 1] ?? null;
    if (!me || !G || !y)
      return;
    const L = sl.current, V = uh.current;
    if (!L || !V)
      return;
    const te = Op(G.palette, G.pixels), Ne = Math.floor(G.width / Re), Ee = Math.floor(G.height / Re), Xe = Math.max(1, Math.ceil(Ee / Ie)), Ve = Math.min(Math.max(0, ze), Xe - 1) * Ie, He = Math.min(Ie, Math.max(0, Ee - Ve)), gt = Ec(G.pixels, G.width, G.height, {
      x: 0,
      y: Ve * Re,
      width: Ne * Re,
      height: He * Re
    }), ct = $.map((fe) => Bs(fe, Ne, Ee)).filter((fe) => fe.width > 0 && fe.height > 0), Et = ct.map((fe) => {
      const Ke = Bs(
        {
          x: fe.x * Re,
          y: fe.y * Re,
          width: fe.width * Re,
          height: fe.height * Re
        },
        G.width,
        G.height
      ), lt = Ec(
        G.pixels,
        G.width,
        G.height,
        Ke
      ), al = Bp(lt.pixels, lt.width, lt.height, de);
      return { rect: fe, scaled: al };
    }), ns = (fe, Ke, lt, al, La, Da) => {
      const ko = Math.max(1, Math.trunc(Da)), cl = document.createElement("canvas");
      cl.width = Ke, cl.height = lt;
      const Eh = cl.getContext("2d");
      if (!Eh)
        return;
      const jy = Yb(al, Ke, lt, La);
      Eh.putImageData(new ImageData(jy, Ke, lt), 0, 0), fe.width = Ke * ko, fe.height = lt * ko;
      const Co = fe.getContext("2d");
      Co && (Co.imageSmoothingEnabled = !1, Co.clearRect(0, 0, fe.width, fe.height), Co.drawImage(cl, 0, 0, fe.width, fe.height));
    };
    ns(
      L,
      gt.width,
      gt.height,
      gt.pixels,
      te,
      Se
    );
    const on = L.getContext("2d");
    if (on) {
      on.save(), on.imageSmoothingEnabled = !1, on.strokeStyle = "rgba(255, 74, 100, 0.95)", on.lineWidth = 1;
      for (const fe of ct) {
        const Ke = fe.y - Ve;
        if (Ke + fe.height <= 0 || Ke >= He)
          continue;
        const lt = Math.max(0, Ke), al = Math.min(He, Ke + fe.height) - lt;
        if (al <= 0)
          continue;
        const La = fe.x * Re * Se, Da = lt * Re * Se, ko = fe.width * Re * Se, cl = al * Re * Se;
        on.strokeRect(La + 0.5, Da + 0.5, ko - 1, cl - 1);
      }
      on.restore();
    }
    const ei = Re * de, ye = Math.max(Re * de * 32, 512);
    let ut = 0, Ot = 0, _o = 0;
    const rl = [];
    for (const fe of Et) {
      const Ke = fe.scaled.width, lt = fe.scaled.height;
      ut > 0 && ut + Ke > ye && (ut = 0, Ot += _o + ei, _o = 0), rl.push({ x: ut, y: Ot, w: Ke, h: lt, pixels: fe.scaled.pixels }), ut += Ke + ei, _o = Math.max(_o, lt);
    }
    const Ea = rl.length === 0 ? 1 : Math.max(...rl.map((fe) => fe.x + fe.w)), Ih = rl.length === 0 ? 1 : Math.max(...rl.map((fe) => fe.y + fe.h)), To = new Uint8Array(Ea * Ih);
    for (const fe of rl)
      for (let Ke = 0; Ke < fe.h; Ke += 1)
        for (let lt = 0; lt < fe.w; lt += 1)
          To[(fe.y + Ke) * Ea + (fe.x + lt)] = fe.pixels[Ke * fe.w + lt] ?? 0;
    let Ra = To, Aa = ts;
    if (be === "nearest") {
      const fe = G.palette;
      if (!fe)
        return;
      const Ke = Yp(fe, ts);
      Ra = Zo(To, Ke), Aa = ts;
    } else {
      const fe = bo(), { map: Ke, palette: lt } = Xp(te, ts, fe);
      Ra = Zo(To, Ke), Aa = lt;
    }
    ns(V, Ea, Ih, Ra, Aa, 2);
  }, [
    bo,
    ts,
    me,
    be,
    G,
    ze,
    de,
    $
  ]), T.useEffect(() => {
    const y = (L) => {
      var Ne, Ee, Xe, at, Ve, He;
      if (Up(L.target))
        return;
      if (!(L.ctrlKey || L.metaKey)) {
        const gt = L.key.toLowerCase();
        if ((gt === "delete" || gt === "backspace") && he === "reference-handle" && Ye) {
          L.preventDefault(), va(Ye.id);
          return;
        }
        if (gt === "delete" || gt === "backspace") {
          if (ge.getState().selectedCount === 0)
            return;
          L.preventDefault(), YM();
          return;
        }
        const ct = Pb({
          key: L.key,
          altKey: L.altKey,
          ctrlKey: L.ctrlKey,
          metaKey: L.metaKey,
          shiftKey: L.shiftKey
        });
        if (ct) {
          if (ct.type === "tool") {
            if (Xb(ct.tool) && (!h || e))
              return;
            L.preventDefault(), po(ct.tool);
            return;
          }
          if (ct.type === "palette-primary") {
            const Et = re.getState();
            ct.index >= 0 && ct.index < Et.colors.length && (L.preventDefault(), Et.setSelectedIndices([ct.index]));
            return;
          }
        }
        return;
      }
      const te = L.key.toLowerCase();
      if (te === "v") {
        if (je === "tile" && ot.getState().tileBuffer) {
          L.preventDefault(), po("tile-stamp");
          return;
        }
        co.current = !0, window.setTimeout(() => {
          co.current = !1;
        }, 200);
        return;
      }
      if (te === "+" || te === "=") {
        L.preventDefault(), (Ee = (Ne = window.uiScaleApi) == null ? void 0 : Ne.stepScale) == null || Ee.call(Ne, 1.1);
        return;
      }
      if (te === "-") {
        L.preventDefault(), (at = (Xe = window.uiScaleApi) == null ? void 0 : Xe.stepScale) == null || at.call(Xe, 0.9090909090909091);
        return;
      }
      if (te === "0") {
        L.preventDefault(), (He = (Ve = window.uiScaleApi) == null ? void 0 : Ve.resetScale) == null || He.call(Ve);
        return;
      }
      if (te === "z") {
        if (L.preventDefault(), Le.getState().locked)
          return;
        L.shiftKey ? n() : t();
      }
      if (te === "y") {
        if (L.preventDefault(), Le.getState().locked)
          return;
        n();
      }
      if (te === "s") {
        if (L.preventDefault(), e)
          return;
        xo();
      }
      if (te === "o") {
        if (L.preventDefault(), e)
          return;
        yo();
      }
      if (te === "n" && (L.preventDefault(), vo()), te === "c") {
        if (je === "tile") {
          Bx() && L.preventDefault();
          return;
        }
        ge.getState().selectedCount > 0 && (L.preventDefault(), L.shiftKey ? Ur({ deep: !0 }) : Ur());
      }
      if (te === "x") {
        if (je === "tile") {
          Yx() && L.preventDefault();
          return;
        }
        ge.getState().selectedCount > 0 && (L.preventDefault(), Rx());
      }
      te === "/" && (L.preventDefault(), wo());
    };
    return window.addEventListener("keydown", y), () => window.removeEventListener("keydown", y);
  }, [
    he,
    po,
    e,
    yo,
    vo,
    xo,
    wo,
    h,
    n,
    va,
    Ye,
    t,
    je
  ]), T.useEffect(() => {
    he !== "text" && M && v(!1);
  }, [he, M]);
  const Jl = (y) => {
    Ye && cy(Ye.id, y);
  }, bh = (y) => {
    Number.isFinite(y) && Jl({
      rotation: On(y, uc, dc)
    });
  }, _h = (y) => {
    Number.isFinite(y) && Jl({
      scale: On(y, Qs, Hl)
    });
  }, Th = (y) => {
    Number.isFinite(y) && Jl({
      opacity: On(y, hc, fc)
    });
  }, ol = ke.useMemo(() => {
    const y = ts.length - 1;
    if (y < 0)
      return [];
    const L = /* @__PURE__ */ new Set();
    for (const V of ga) {
      if (!Number.isFinite(V))
        continue;
      const te = Math.round(V);
      te < 0 || te > y || L.add(te);
    }
    return Array.from(L).sort((V, te) => V - te);
  }, [ts.length, ga]), by = ol.length === 0 ? "Select palette colors to trace." : ol.length === 1 ? "Using 1 selected color." : `Using ${ol.length} selected colors.`, _y = () => {
    !Ye || ts.length === 0 || ol.length !== 0 && Lb(Ye, ol);
  }, Ty = () => {
    if (!Ye || !Number.isFinite(Ta))
      return;
    const y = On(
      Math.round(Ta),
      ku,
      Cu
    );
    Db(Ye, y);
  }, kh = (Ye == null ? void 0 : Ye.rotation) ?? 0, Ch = (Ye == null ? void 0 : Ye.scale) ?? 1, ky = Hb(Ch), jh = (Ye == null ? void 0 : Ye.opacity) ?? 0.7, Ph = (Ye == null ? void 0 : Ye.flipX) ?? !1, Nh = (Ye == null ? void 0 : Ye.flipY) ?? !1, Gt = !Ye;
  T.useEffect(() => {
    if (!Bt) {
      In("");
      return;
    }
    const y = () => {
      const V = $b();
      In((te) => te === V ? te : V);
    };
    y();
    const L = window.setInterval(y, Lw);
    return () => window.clearInterval(L);
  }, [Bt]), T.useEffect(() => {
    var L, V;
    const y = Bt && wn ? `${ka} • ${wn}` : ka;
    (V = (L = window.appApi) == null ? void 0 : L.setTitle) == null || V.call(L, y);
  }, [ka, Bt, wn]), T.useEffect(() => {
    const y = (L) => {
      var Ee;
      if (Up(L.target) || !co.current)
        return;
      co.current = !1;
      const te = Array.from(((Ee = L.clipboardData) == null ? void 0 : Ee.items) ?? []).find((Xe) => Xe.type.startsWith("image/"));
      if (!te)
        return;
      const Ne = te.getAsFile();
      Ne && (L.preventDefault(), _x(Ne));
    };
    return window.addEventListener("paste", y), () => window.removeEventListener("paste", y);
  }, []), T.useEffect(() => {
    var L, V;
    const y = ((V = (L = window.menuApi) == null ? void 0 : L.onAction) == null ? void 0 : V.call(L, (te) => {
      var Ne, Ee;
      if (te.startsWith("view:set:")) {
        const Xe = te.split(":"), at = Xe[2] ?? "", He = (Xe[3] ?? "") === "true";
        switch (at) {
          case "showReferenceLayer":
            Q(He);
            return;
          case "showPixelLayer":
            ue(He);
            return;
          case "showTileLayer":
            Pe(He);
            return;
          case "showPixelGrid":
            It(He);
            return;
          case "showTileGrid":
            ln(He);
            return;
          case "showAxes":
            Ns(He);
            return;
          case "minimapCollapsed":
            $e(He);
            return;
          default:
            return;
        }
      }
      if (te.startsWith("options:advancedMode:")) {
        const Xe = te.split(":")[2] ?? "";
        p(Xe === "true");
        return;
      }
      if (te.startsWith("palette:rows:")) {
        const Xe = Number(te.split(":")[2]);
        Number.isFinite(Xe) && window.dispatchEvent(
          new CustomEvent("palette:set-rows", {
            detail: Math.min(4, Math.max(2, Math.floor(Xe)))
          })
        );
        return;
      }
      switch (te) {
        case "new":
          vo();
          break;
        case "open":
          yo();
          break;
        case "save":
          xo();
          break;
        case "saveAs":
          wh();
          break;
        case "importImage":
          Mh();
          break;
        case "mergeProject":
          Sh();
          break;
        case "exportPng":
          Xx();
          break;
        case "exportBmp":
          ob();
          break;
        case "exportGif":
          rb();
          break;
        case "exportPcx":
          cb();
          break;
        case "exportTga":
          ab();
          break;
        case "exportBsaveCga":
          vb();
          break;
        case "exportBsaveEga":
          wb();
          break;
        case "exportBsaveVga":
          Sb();
          break;
        case "exportGbr":
          lb();
          break;
        case "exportChr":
          ib();
          break;
        case "undo":
          t();
          break;
        case "redo":
          n();
          break;
        case "memory:on":
          mt(!0);
          break;
        case "memory:off":
          mt(!1);
          break;
        case "shortcuts":
          wo();
          break;
        case "palette:consolidate":
          _b();
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
          (Ee = (Ne = window.uiScaleApi) == null ? void 0 : Ne.resetScale) == null || Ee.call(Ne);
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
    Mh,
    yo,
    Sh,
    vo,
    xo,
    wh,
    wo,
    n,
    p,
    rt,
    $e,
    mt,
    Ns,
    u,
    It,
    ue,
    Q,
    ln,
    Pe,
    ya,
    _a,
    t
  ]), T.useEffect(() => {
    var y, L;
    (L = (y = window.viewMenuApi) == null ? void 0 : y.setState) == null || L.call(y, {
      showReferenceLayer: sn,
      showPixelLayer: Nt,
      showTileLayer: Jn,
      showPixelGrid: Ps,
      showTileGrid: I,
      showAxes: E,
      tileDebugOverlay: ch,
      minimapCollapsed: pt
    });
  }, [
    sn,
    Nt,
    Jn,
    Ps,
    I,
    E,
    ch,
    pt
  ]);
  const Cy = () => /* @__PURE__ */ r.jsx("div", { className: "panel__section", children: he === "pen" || he === "selection-lasso" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__row", children: [1, 4, 8].map((y) => /* @__PURE__ */ r.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": Zx === y,
          disabled: Zd === "point",
          onClick: () => wa(y),
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
          "data-active": Zd === y.id,
          onClick: () => Sa(y.id),
          children: /* @__PURE__ */ r.jsx("span", { className: "tool-label", "aria-label": y.label, children: y.label })
        },
        y.id
      )) })
    ] })
  ] }) : he === "spray" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
              value: qd,
              onChange: (y) => ph(y.currentTarget.valueAsNumber)
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
              value: qd,
              onChange: (y) => ph(y.currentTarget.valueAsNumber)
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
              value: Math.min(2e3, Jd),
              onChange: (y) => mh(y.currentTarget.valueAsNumber)
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
              value: Jd,
              onChange: (y) => mh(y.currentTarget.valueAsNumber)
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
            value: eh,
            onChange: (y) => gh(y.currentTarget.valueAsNumber)
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
            value: eh,
            onChange: (y) => gh(y.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }) })
  ] }) : he === "line" ? oo >= 2 ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
      /* @__PURE__ */ r.jsx(
        an,
        {
          ariaLabel: "Gradient direction",
          value: no,
          onChange: so,
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
        an,
        {
          ariaLabel: "Gradient dither",
          value: lo,
          onChange: io,
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
  ] }) : /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." }) : he === "rectangle" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
              checked: th === "filled",
              onChange: () => nh("filled")
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
              checked: th === "outlined",
              onChange: () => nh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    oo >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: no,
            onChange: so,
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
          an,
          {
            ariaLabel: "Gradient dither",
            value: lo,
            onChange: io,
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
  ] }) : he === "oval" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
              name: "oval-mode",
              value: "outlined",
              checked: sh === "outlined",
              onChange: () => lh("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    oo >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: no,
            onChange: so,
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
          an,
          {
            ariaLabel: "Gradient dither",
            value: lo,
            onChange: io,
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
  ] }) : he === "fill-bucket" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
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
              checked: ih === "color",
              onChange: () => oh("color")
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
              checked: ih === "selection",
              onChange: () => oh("selection")
            }
          ),
          "Selection"
        ] })
      ] }),
      /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] }),
    oo >= 2 && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ r.jsx(
          an,
          {
            ariaLabel: "Gradient direction",
            value: no,
            onChange: so,
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
          an,
          {
            ariaLabel: "Gradient dither",
            value: lo,
            onChange: io,
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
  ] }) : he === "texture-roll" ? /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: s === 0 ? "Make a selection first." : "Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps." }) : he === "stamp" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Mode" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ro === "soft", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "soft",
                checked: ro === "soft",
                onChange: () => hh("soft")
              }
            ),
            "Soft"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ro === "hard", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "hard",
                checked: ro === "hard",
                onChange: () => hh("hard")
              }
            ),
            "Hard"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Drag" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": !ao, children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "off",
                checked: !ao,
                onChange: () => fh(!1)
              }
            ),
            "Off"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": ao, children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "on",
                checked: ao,
                onChange: () => fh(!0)
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
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": nl === "pixel", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "pixel",
                checked: nl === "pixel",
                onChange: () => fo("pixel")
              }
            ),
            "Pixel"
          ] }),
          /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": nl === "tile", children: [
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "tile",
                checked: nl === "tile",
                onChange: () => fo("tile")
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
              "data-active": rh,
              onClick: () => oy(!rh),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": ah,
              onClick: () => ry(!ah),
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
          an,
          {
            ariaLabel: "Scale",
            value: String(ey),
            onChange: (y) => iy(Number(y)),
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
          an,
          {
            ariaLabel: "Rotate",
            value: String(Jx),
            onChange: (y) => ly(Number(y)),
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
      /* @__PURE__ */ r.jsx("div", { className: "panel__toggle-group", children: /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": xa, children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "checkbox",
            checked: xa,
            onChange: () => ay(!xa)
          }
        ),
        "Duplicate Colors"
      ] }) })
    ] }) })
  ] }) : he === "reference-handle" ? /* @__PURE__ */ r.jsx("div", { className: "panel__group", children: /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--cards", children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Rotation" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Rotation",
            min: uc,
            max: dc,
            step: 1,
            value: kh,
            disabled: Gt,
            onChange: (y) => bh(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Rotation",
            min: uc,
            max: dc,
            step: 1,
            value: kh,
            disabled: Gt,
            onChange: (y) => bh(y.currentTarget.valueAsNumber)
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
            min: Al,
            max: Vr,
            step: 1,
            value: ky,
            disabled: Gt,
            onChange: (y) => _h(Wb(y.currentTarget.valueAsNumber))
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Scale",
            min: Qs,
            max: Hl,
            step: 0.01,
            value: Ch,
            disabled: Gt,
            onChange: (y) => _h(y.currentTarget.valueAsNumber)
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
            min: hc,
            max: fc,
            step: 0.05,
            value: jh,
            disabled: Gt,
            onChange: (y) => Th(y.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Opacity",
            min: hc,
            max: fc,
            step: 0.05,
            value: jh,
            disabled: Gt,
            onChange: (y) => Th(y.currentTarget.valueAsNumber)
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
            "data-active": Ph,
            disabled: Gt,
            onClick: () => Jl({ flipX: !Ph }),
            children: "Flip X"
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Nh,
            disabled: Gt,
            onClick: () => Jl({ flipY: !Nh }),
            children: "Flip Y"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": il === "pixel", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "pixel",
              checked: il === "pixel",
              onChange: () => mo("pixel")
            }
          ),
          "Pixel"
        ] }),
        /* @__PURE__ */ r.jsxs("label", { className: "panel__toggle", "data-active": il === "tile", children: [
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "tile",
              checked: il === "tile",
              onChange: () => mo("tile")
            }
          ),
          "Tile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Reference" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack", children: [
        Gt && /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: "Select a reference" }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt,
            onClick: () => {
              Ye && va(Ye.id);
            },
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Trace Palette" }),
      /* @__PURE__ */ r.jsxs("div", { className: "panel__stack", children: [
        /* @__PURE__ */ r.jsx("div", { className: "panel__note", children: by }),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt || ol.length === 0,
            onClick: _y,
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
            min: ku,
            max: Cu,
            step: 1,
            value: Ta,
            disabled: Gt,
            onChange: (y) => {
              const L = y.currentTarget.valueAsNumber;
              Number.isFinite(L) && uy(Math.round(L));
            }
          }
        ),
        /* @__PURE__ */ r.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: Gt,
            onClick: Ty,
            children: "Trace"
          }
        )
      ] })
    ] })
  ] }) }) : he === "selection-rect" || he === "selection-oval" ? /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
    /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ r.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "pixel",
            checked: !_t && eo === "pixel",
            disabled: _t,
            onChange: () => to("pixel")
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
            checked: _t || eo === "tile",
            onChange: () => to("tile")
          }
        ),
        "Tile"
      ] })
    ] }),
    _t ? /* @__PURE__ */ r.jsx("span", { className: "panel__note", children: "Tile Space locks selection snap to tiles." }) : null
  ] }) : he === "tile-sampler" || he === "tile-pen" || he === "tile-stamp" || he === "tile-rectangle" || he === "tile-9slice" || he === "tile-export" ? /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row panel__row--cards", children: [
      /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Tile Set" }),
        ae ? /* @__PURE__ */ r.jsx(
          an,
          {
            ariaLabel: "Tile Set",
            value: ae.id,
            onChange: vy,
            options: Xt.map((y) => ({ value: y.id, label: y.name }))
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
              disabled: !ae,
              value: (ae == null ? void 0 : ae.columns) ?? 1,
              onChange: (y) => vh(
                y.currentTarget.valueAsNumber,
                (ae == null ? void 0 : ae.rows) ?? 1
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
              disabled: !ae,
              value: (ae == null ? void 0 : ae.rows) ?? 1,
              onChange: (y) => vh(
                (ae == null ? void 0 : ae.columns) ?? 1,
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
              onClick: () => Ca(Is - 1),
              disabled: Is <= Pu,
              children: "-"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile picker zoom",
              min: Pu,
              max: Nu,
              step: 1,
              value: Is,
              onChange: (y) => Ca(y.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => Ca(Is + 1),
              disabled: Is >= Nu,
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
              onClick: dy,
              disabled: !ae || Pa <= 0,
              children: "◀"
            }
          ),
          /* @__PURE__ */ r.jsxs("span", { className: "panel__item panel__item--static", children: [
            Pa + 1,
            " / ",
            ja
          ] }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: hy,
              disabled: !ae || Pa >= ja - 1,
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
              "data-active": Od === "soft",
              onClick: () => Fd("soft"),
              children: "Soft"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Od === "hard",
              onClick: () => Fd("hard"),
              children: "Hard"
            }
          )
        ] })
      ] }),
      he === "tile-pen" ? /* @__PURE__ */ r.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ r.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": !zd,
              onClick: () => Hd(!1),
              children: "Free"
            }
          ),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": zd,
              onClick: () => Hd(!0),
              children: "Cluster"
            }
          )
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__item", onClick: fy, children: "New Set" }),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: py,
          disabled: !ae,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: my,
          disabled: !ae,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: gy,
          disabled: !ae,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ r.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: xy,
          disabled: !ae || Rs.length === 0,
          children: "Delete Tiles"
        }
      )
    ] }),
    /* @__PURE__ */ r.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Set: ",
        ae ? `${ae.name} (${ae.tiles.length} tiles)` : "None"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Map: ",
        yh ? yh.name : "None"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Selected Tile: ",
        ae ? Gx + 1 : "—"
      ] }),
      /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        Rs.length
      ] }),
      he === "tile-9slice" && /* @__PURE__ */ r.jsxs(r.Fragment, { children: [
        /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          ty ? "set" : "unset"
        ] }),
        /* @__PURE__ */ r.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          ny,
          "x",
          sy
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ r.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ r.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ r.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ r.jsx(oM, {}) }),
    /* @__PURE__ */ r.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ r.jsx(
        HM,
        {
          activeTool: he,
          selectionCount: s,
          activateTool: po,
          workspaceMode: je,
          switchWorkspace: _a,
          showAdvancedTools: !e && h,
          showTileTools: _t,
          showAiTool: !e,
          showExportButton: !e,
          showFullscreenButton: !e,
          showTileLayerControls: !e,
          toolOptions: Cy()
        }
      ),
      g && /* @__PURE__ */ r.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ r.jsx("img", { src: WM, alt: "" }) }),
      /* @__PURE__ */ r.jsxs(
        "div",
        {
          className: `app__palette panel${_t ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${Sy}px`,
            "--palette-bar-height": `${yy}px`
          },
          children: [
            /* @__PURE__ */ r.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: wy
              }
            ),
            /* @__PURE__ */ r.jsxs("div", { className: `bottom-bar${_t ? " bottom-bar--tile" : ""}`, children: [
              /* @__PURE__ */ r.jsx("div", { className: "bottom-bar__left" }),
              /* @__PURE__ */ r.jsx("div", { className: "bottom-bar__center", children: _t ? /* @__PURE__ */ r.jsx(TM, {}) : /* @__PURE__ */ r.jsx(bM, {}) })
            ] })
          ]
        }
      ),
      pt ? /* @__PURE__ */ r.jsx("div", { className: "app__minimap-launch panel panel--collapsed", children: /* @__PURE__ */ r.jsx("button", { type: "button", className: "panel__toggle", onClick: () => $e(!1), children: "Minimap" }) }) : /* @__PURE__ */ r.jsxs("div", { className: "app__minimap panel", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "panel__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Minimap" }),
          /* @__PURE__ */ r.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              onClick: () => $e(!0),
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsx(vM, {})
      ] })
    ] }),
    me && G && ql && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx("div", { className: "modal__backdrop", onClick: So }),
      /* @__PURE__ */ r.jsxs("div", { className: "modal__content modal__content--rom", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ r.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ r.jsx("h2", { children: "Import ROM Segment" }),
          /* @__PURE__ */ r.jsx("button", { type: "button", onClick: So, children: "Close" })
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Selections" }),
            /* @__PURE__ */ r.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ r.jsx("span", { children: $.length }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => se([]),
                  disabled: $.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => se((y) => y.length > 0 ? y.slice(0, -1) : y),
                  disabled: $.length === 0,
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
                    onChange: (y) => Mo({ x: Number(y.target.value) })
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
                    onChange: (y) => Mo({ y: Number(y.target.value) })
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
                    onChange: (y) => Mo({ width: Number(y.target.value) })
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
                    onChange: (y) => Mo({ height: Number(y.target.value) })
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
                  onClick: () => _e((y) => Math.max(0, y - 1)),
                  disabled: ho <= 0,
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ r.jsxs("span", { children: [
                ho + 1,
                "/",
                uo
              ] }),
              /* @__PURE__ */ r.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => _e((y) => Math.min(uo - 1, y + 1)),
                  disabled: ho >= uo - 1,
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
                value: be,
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
                  ref: sl,
                  className: "rom-import__canvas",
                  onPointerDown: (y) => {
                    var ct;
                    y.preventDefault();
                    const L = sl.current;
                    if (!L)
                      return;
                    (ct = L.setPointerCapture) == null || ct.call(L, y.pointerId);
                    const V = L.getBoundingClientRect(), te = Math.floor(
                      (y.clientX - V.left) / V.width * L.width
                    ), Ne = Math.floor(
                      (y.clientY - V.top) / V.height * L.height
                    ), Ee = Math.floor(te / (Re * Se)), Xe = dh + Math.floor(Ne / (Re * Se)), at = Math.trunc(On(Ee, 0, ll - 1)), Ve = Math.trunc(On(Xe, 0, Es - 1));
                    Zl.current = {
                      startTileX: at,
                      startTileY: Ve,
                      pointerId: y.pointerId
                    };
                    const He = y.ctrlKey || y.metaKey, gt = { x: at, y: Ve, width: 1, height: 1 };
                    se(
                      (Et) => He ? [...Et, gt] : [gt]
                    );
                  },
                  onPointerMove: (y) => {
                    const L = sl.current, V = Zl.current;
                    if (!L || !V || !G || V.pointerId !== y.pointerId)
                      return;
                    const te = L.getBoundingClientRect(), Ne = Math.floor(
                      (y.clientX - te.left) / te.width * L.width
                    ), Ee = Math.floor(
                      (y.clientY - te.top) / te.height * L.height
                    ), Xe = Math.floor(Ne / (Re * Se)), at = dh + Math.floor(Ee / (Re * Se)), Ve = Math.min(V.startTileX, Xe), He = Math.min(V.startTileY, at), gt = Math.max(V.startTileX, Xe), ct = Math.max(V.startTileY, at);
                    se((Et) => {
                      if (Et.length === 0)
                        return Et;
                      const ns = Et.slice();
                      return ns[ns.length - 1] = Bs(
                        {
                          x: Ve,
                          y: He,
                          width: gt - Ve + 1,
                          height: ct - He + 1
                        },
                        ll,
                        Es
                      ), ns;
                    });
                  },
                  onPointerUp: (y) => {
                    var V;
                    const L = sl.current;
                    L && ((V = L.releasePointerCapture) == null || V.call(L, y.pointerId)), Zl.current = null;
                  },
                  onPointerLeave: (y) => {
                    var V;
                    const L = sl.current;
                    L && ((V = L.releasePointerCapture) == null || V.call(L, y.pointerId)), Zl.current = null;
                  }
                }
              ) }),
              /* @__PURE__ */ r.jsx("div", { className: "rom-import__preview", children: /* @__PURE__ */ r.jsx(
                "canvas",
                {
                  ref: uh,
                  className: "rom-import__canvas"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", {}),
            /* @__PURE__ */ r.jsx("button", { type: "button", onClick: My, children: "Send to Stamp Tool" })
          ] })
        ] })
      ] })
    ] }),
    le && K && /* @__PURE__ */ r.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ r.jsx(
        "div",
        {
          className: "modal__backdrop",
          onClick: () => {
            ie(!1), ee(null), X(null);
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
                ie(!1), ee(null), X(null);
              },
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ r.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Source" }),
            /* @__PURE__ */ r.jsx("span", { children: B ?? "(unknown)" })
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Offset X" }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "number",
                value: ce,
                onChange: (y) => U(Number(y.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ r.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ r.jsx("span", { children: "Offset Y" }),
            /* @__PURE__ */ r.jsx(
              "input",
              {
                type: "number",
                value: Z,
                onChange: (y) => xe(Number(y.target.value))
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
                  qM(K, {
                    offsetX: ce,
                    offsetY: Z
                  }), ie(!1), ee(null), X(null);
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
      IM,
      {
        onClose: () => {
          f(!1);
        },
        onAdvancedModeChange: p
      }
    ),
    M && he === "text" && /* @__PURE__ */ r.jsx(
      NM,
      {
        initialText: S,
        initialFontFamily: _,
        initialFontSize: C,
        onCancel: () => {
          v(!1), rt(m);
        },
        onConfirm: ({ text: y, fontFamily: L, fontSize: V }) => {
          b(y), k(L), R(V), kM({
            text: y,
            fontFamily: L,
            fontSize: V,
            paletteIndex: qx
          }), v(!1);
        }
      }
    ),
    D && he === "ai" && !e && /* @__PURE__ */ r.jsx(
      DM,
      {
        initialPrompt: J,
        onCancel: () => {
          P(!1), rt(A);
        },
        onConfirm: ({ prompt: y }) => {
          oe(y), P(!1);
        }
      }
    )
  ] });
}, Kb = () => {
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
class Gb extends ke.Component {
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
const Kx = document.getElementById("root");
if (!Kx)
  throw new Error("Root element not found");
Kb();
Rc.createRoot(Kx).render(
  /* @__PURE__ */ r.jsx(ke.StrictMode, { children: /* @__PURE__ */ r.jsx(Gb, { children: /* @__PURE__ */ r.jsx(Vb, {}) }) })
);
