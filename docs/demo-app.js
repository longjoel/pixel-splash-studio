function Rf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Lf = { exports: {} }, Bo = {}, Df = { exports: {} }, xe = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Xr = Symbol.for("react.element"), cy = Symbol.for("react.portal"), uy = Symbol.for("react.fragment"), dy = Symbol.for("react.strict_mode"), hy = Symbol.for("react.profiler"), py = Symbol.for("react.provider"), fy = Symbol.for("react.context"), my = Symbol.for("react.forward_ref"), gy = Symbol.for("react.suspense"), xy = Symbol.for("react.memo"), yy = Symbol.for("react.lazy"), bh = Symbol.iterator;
function vy(e) {
  return e === null || typeof e != "object" ? null : (e = bh && e[bh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Yf = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Bf = Object.assign, Xf = {};
function Yl(e, t, n) {
  this.props = e, this.context = t, this.refs = Xf, this.updater = n || Yf;
}
Yl.prototype.isReactComponent = {};
Yl.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Yl.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Ff() {
}
Ff.prototype = Yl.prototype;
function bu(e, t, n) {
  this.props = e, this.context = t, this.refs = Xf, this.updater = n || Yf;
}
var ku = bu.prototype = new Ff();
ku.constructor = bu;
Bf(ku, Yl.prototype);
ku.isPureReactComponent = !0;
var kh = Array.isArray, Of = Object.prototype.hasOwnProperty, Tu = { current: null }, zf = { key: !0, ref: !0, __self: !0, __source: !0 };
function Hf(e, t, n) {
  var s, l = {}, r = null, i = null;
  if (t != null) for (s in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (r = "" + t.key), t) Of.call(t, s) && !zf.hasOwnProperty(s) && (l[s] = t[s]);
  var a = arguments.length - 2;
  if (a === 1) l.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    l.children = c;
  }
  if (e && e.defaultProps) for (s in a = e.defaultProps, a) l[s] === void 0 && (l[s] = a[s]);
  return { $$typeof: Xr, type: e, key: r, ref: i, props: l, _owner: Tu.current };
}
function wy(e, t) {
  return { $$typeof: Xr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ju(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xr;
}
function Sy(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Th = /\/+/g;
function ka(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? Sy("" + e.key) : t.toString(36);
}
function Oi(e, t, n, s, l) {
  var r = typeof e;
  (r === "undefined" || r === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (r) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Xr:
        case cy:
          i = !0;
      }
  }
  if (i) return i = e, l = l(i), e = s === "" ? "." + ka(i, 0) : s, kh(l) ? (n = "", e != null && (n = e.replace(Th, "$&/") + "/"), Oi(l, t, n, "", function(u) {
    return u;
  })) : l != null && (ju(l) && (l = wy(l, n + (!l.key || i && i.key === l.key ? "" : ("" + l.key).replace(Th, "$&/") + "/") + e)), t.push(l)), 1;
  if (i = 0, s = s === "" ? "." : s + ":", kh(e)) for (var a = 0; a < e.length; a++) {
    r = e[a];
    var c = s + ka(r, a);
    i += Oi(r, t, n, c, l);
  }
  else if (c = vy(e), typeof c == "function") for (e = c.call(e), a = 0; !(r = e.next()).done; ) r = r.value, c = s + ka(r, a++), i += Oi(r, t, n, c, l);
  else if (r === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function xi(e, t, n) {
  if (e == null) return e;
  var s = [], l = 0;
  return Oi(e, s, "", "", function(r) {
    return t.call(n, r, l++);
  }), s;
}
function My(e) {
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
var Et = { current: null }, zi = { transition: null }, _y = { ReactCurrentDispatcher: Et, ReactCurrentBatchConfig: zi, ReactCurrentOwner: Tu };
function Wf() {
  throw Error("act(...) is not supported in production builds of React.");
}
xe.Children = { map: xi, forEach: function(e, t, n) {
  xi(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return xi(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return xi(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ju(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
xe.Component = Yl;
xe.Fragment = uy;
xe.Profiler = hy;
xe.PureComponent = bu;
xe.StrictMode = dy;
xe.Suspense = gy;
xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = _y;
xe.act = Wf;
xe.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var s = Bf({}, e.props), l = e.key, r = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (r = t.ref, i = Tu.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var a = e.type.defaultProps;
    for (c in t) Of.call(t, c) && !zf.hasOwnProperty(c) && (s[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) s.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
    s.children = a;
  }
  return { $$typeof: Xr, type: e.type, key: l, ref: r, props: s, _owner: i };
};
xe.createContext = function(e) {
  return e = { $$typeof: fy, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: py, _context: e }, e.Consumer = e;
};
xe.createElement = Hf;
xe.createFactory = function(e) {
  var t = Hf.bind(null, e);
  return t.type = e, t;
};
xe.createRef = function() {
  return { current: null };
};
xe.forwardRef = function(e) {
  return { $$typeof: my, render: e };
};
xe.isValidElement = ju;
xe.lazy = function(e) {
  return { $$typeof: yy, _payload: { _status: -1, _result: e }, _init: My };
};
xe.memo = function(e, t) {
  return { $$typeof: xy, type: e, compare: t === void 0 ? null : t };
};
xe.startTransition = function(e) {
  var t = zi.transition;
  zi.transition = {};
  try {
    e();
  } finally {
    zi.transition = t;
  }
};
xe.unstable_act = Wf;
xe.useCallback = function(e, t) {
  return Et.current.useCallback(e, t);
};
xe.useContext = function(e) {
  return Et.current.useContext(e);
};
xe.useDebugValue = function() {
};
xe.useDeferredValue = function(e) {
  return Et.current.useDeferredValue(e);
};
xe.useEffect = function(e, t) {
  return Et.current.useEffect(e, t);
};
xe.useId = function() {
  return Et.current.useId();
};
xe.useImperativeHandle = function(e, t, n) {
  return Et.current.useImperativeHandle(e, t, n);
};
xe.useInsertionEffect = function(e, t) {
  return Et.current.useInsertionEffect(e, t);
};
xe.useLayoutEffect = function(e, t) {
  return Et.current.useLayoutEffect(e, t);
};
xe.useMemo = function(e, t) {
  return Et.current.useMemo(e, t);
};
xe.useReducer = function(e, t, n) {
  return Et.current.useReducer(e, t, n);
};
xe.useRef = function(e) {
  return Et.current.useRef(e);
};
xe.useState = function(e) {
  return Et.current.useState(e);
};
xe.useSyncExternalStore = function(e, t, n) {
  return Et.current.useSyncExternalStore(e, t, n);
};
xe.useTransition = function() {
  return Et.current.useTransition();
};
xe.version = "18.3.1";
Df.exports = xe;
var k = Df.exports;
const Ie = /* @__PURE__ */ Rf(k);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var by = k, ky = Symbol.for("react.element"), Ty = Symbol.for("react.fragment"), jy = Object.prototype.hasOwnProperty, Cy = by.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ny = { key: !0, ref: !0, __self: !0, __source: !0 };
function Uf(e, t, n) {
  var s, l = {}, r = null, i = null;
  n !== void 0 && (r = "" + n), t.key !== void 0 && (r = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (s in t) jy.call(t, s) && !Ny.hasOwnProperty(s) && (l[s] = t[s]);
  if (e && e.defaultProps) for (s in t = e.defaultProps, t) l[s] === void 0 && (l[s] = t[s]);
  return { $$typeof: ky, type: e, key: r, ref: i, props: l, _owner: Cy.current };
}
Bo.Fragment = Ty;
Bo.jsx = Uf;
Bo.jsxs = Uf;
Lf.exports = Bo;
var o = Lf.exports, Mc = {}, $f = { exports: {} }, Vt = {}, Kf = { exports: {} }, Gf = {};
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
  function t(Y, E) {
    var H = Y.length;
    Y.push(E);
    e: for (; 0 < H; ) {
      var Z = H - 1 >>> 1, se = Y[Z];
      if (0 < l(se, E)) Y[Z] = E, Y[H] = se, H = Z;
      else break e;
    }
  }
  function n(Y) {
    return Y.length === 0 ? null : Y[0];
  }
  function s(Y) {
    if (Y.length === 0) return null;
    var E = Y[0], H = Y.pop();
    if (H !== E) {
      Y[0] = H;
      e: for (var Z = 0, se = Y.length, $ = se >>> 1; Z < $; ) {
        var he = 2 * (Z + 1) - 1, ye = Y[he], fe = he + 1, O = Y[fe];
        if (0 > l(ye, H)) fe < se && 0 > l(O, ye) ? (Y[Z] = O, Y[fe] = H, Z = fe) : (Y[Z] = ye, Y[he] = H, Z = he);
        else if (fe < se && 0 > l(O, H)) Y[Z] = O, Y[fe] = H, Z = fe;
        else break e;
      }
    }
    return E;
  }
  function l(Y, E) {
    var H = Y.sortIndex - E.sortIndex;
    return H !== 0 ? H : Y.id - E.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var r = performance;
    e.unstable_now = function() {
      return r.now();
    };
  } else {
    var i = Date, a = i.now();
    e.unstable_now = function() {
      return i.now() - a;
    };
  }
  var c = [], u = [], d = 1, p = null, h = 3, f = !1, g = !1, S = !1, M = typeof setTimeout == "function" ? setTimeout : null, y = typeof clearTimeout == "function" ? clearTimeout : null, m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(Y) {
    for (var E = n(u); E !== null; ) {
      if (E.callback === null) s(u);
      else if (E.startTime <= Y) s(u), E.sortIndex = E.expirationTime, t(c, E);
      else break;
      E = n(u);
    }
  }
  function w(Y) {
    if (S = !1, v(Y), !g) if (n(c) !== null) g = !0, le(_);
    else {
      var E = n(u);
      E !== null && ne(w, E.startTime - Y);
    }
  }
  function _(Y, E) {
    g = !1, S && (S = !1, y(j), j = -1), f = !0;
    var H = h;
    try {
      for (v(E), p = n(c); p !== null && (!(p.expirationTime > E) || Y && !C()); ) {
        var Z = p.callback;
        if (typeof Z == "function") {
          p.callback = null, h = p.priorityLevel;
          var se = Z(p.expirationTime <= E);
          E = e.unstable_now(), typeof se == "function" ? p.callback = se : p === n(c) && s(c), v(E);
        } else s(c);
        p = n(c);
      }
      if (p !== null) var $ = !0;
      else {
        var he = n(u);
        he !== null && ne(w, he.startTime - E), $ = !1;
      }
      return $;
    } finally {
      p = null, h = H, f = !1;
    }
  }
  var b = !1, T = null, j = -1, A = 5, L = -1;
  function C() {
    return !(e.unstable_now() - L < A);
  }
  function R() {
    if (T !== null) {
      var Y = e.unstable_now();
      L = Y;
      var E = !0;
      try {
        E = T(!0, Y);
      } finally {
        E ? U() : (b = !1, T = null);
      }
    } else b = !1;
  }
  var U;
  if (typeof m == "function") U = function() {
    m(R);
  };
  else if (typeof MessageChannel < "u") {
    var W = new MessageChannel(), re = W.port2;
    W.port1.onmessage = R, U = function() {
      re.postMessage(null);
    };
  } else U = function() {
    M(R, 0);
  };
  function le(Y) {
    T = Y, b || (b = !0, U());
  }
  function ne(Y, E) {
    j = M(function() {
      Y(e.unstable_now());
    }, E);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(Y) {
    Y.callback = null;
  }, e.unstable_continueExecution = function() {
    g || f || (g = !0, le(_));
  }, e.unstable_forceFrameRate = function(Y) {
    0 > Y || 125 < Y ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < Y ? Math.floor(1e3 / Y) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return h;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(c);
  }, e.unstable_next = function(Y) {
    switch (h) {
      case 1:
      case 2:
      case 3:
        var E = 3;
        break;
      default:
        E = h;
    }
    var H = h;
    h = E;
    try {
      return Y();
    } finally {
      h = H;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(Y, E) {
    switch (Y) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        Y = 3;
    }
    var H = h;
    h = Y;
    try {
      return E();
    } finally {
      h = H;
    }
  }, e.unstable_scheduleCallback = function(Y, E, H) {
    var Z = e.unstable_now();
    switch (typeof H == "object" && H !== null ? (H = H.delay, H = typeof H == "number" && 0 < H ? Z + H : Z) : H = Z, Y) {
      case 1:
        var se = -1;
        break;
      case 2:
        se = 250;
        break;
      case 5:
        se = 1073741823;
        break;
      case 4:
        se = 1e4;
        break;
      default:
        se = 5e3;
    }
    return se = H + se, Y = { id: d++, callback: E, priorityLevel: Y, startTime: H, expirationTime: se, sortIndex: -1 }, H > Z ? (Y.sortIndex = H, t(u, Y), n(c) === null && Y === n(u) && (S ? (y(j), j = -1) : S = !0, ne(w, H - Z))) : (Y.sortIndex = se, t(c, Y), g || f || (g = !0, le(_))), Y;
  }, e.unstable_shouldYield = C, e.unstable_wrapCallback = function(Y) {
    var E = h;
    return function() {
      var H = h;
      h = E;
      try {
        return Y.apply(this, arguments);
      } finally {
        h = H;
      }
    };
  };
})(Gf);
Kf.exports = Gf;
var Py = Kf.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iy = k, Gt = Py;
function F(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Vf = /* @__PURE__ */ new Set(), Mr = {};
function Ks(e, t) {
  Tl(e, t), Tl(e + "Capture", t);
}
function Tl(e, t) {
  for (Mr[e] = t, e = 0; e < t.length; e++) Vf.add(t[e]);
}
var zn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), _c = Object.prototype.hasOwnProperty, Ey = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, jh = {}, Ch = {};
function Ay(e) {
  return _c.call(Ch, e) ? !0 : _c.call(jh, e) ? !1 : Ey.test(e) ? Ch[e] = !0 : (jh[e] = !0, !1);
}
function Ry(e, t, n, s) {
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
function Ly(e, t, n, s) {
  if (t === null || typeof t > "u" || Ry(e, t, n, s)) return !0;
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
function At(e, t, n, s, l, r, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = s, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = r, this.removeEmptyString = i;
}
var wt = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  wt[e] = new At(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  wt[t] = new At(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  wt[e] = new At(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  wt[e] = new At(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  wt[e] = new At(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  wt[e] = new At(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  wt[e] = new At(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  wt[e] = new At(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  wt[e] = new At(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Cu = /[\-:]([a-z])/g;
function Nu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Cu,
    Nu
  );
  wt[t] = new At(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Cu, Nu);
  wt[t] = new At(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Cu, Nu);
  wt[t] = new At(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  wt[e] = new At(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
wt.xlinkHref = new At("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  wt[e] = new At(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Pu(e, t, n, s) {
  var l = wt.hasOwnProperty(t) ? wt[t] : null;
  (l !== null ? l.type !== 0 : s || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Ly(t, n, l, s) && (n = null), s || l === null ? Ay(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, s = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, s ? e.setAttributeNS(s, t, n) : e.setAttribute(t, n))));
}
var Kn = Iy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, yi = Symbol.for("react.element"), il = Symbol.for("react.portal"), ol = Symbol.for("react.fragment"), Iu = Symbol.for("react.strict_mode"), bc = Symbol.for("react.profiler"), Qf = Symbol.for("react.provider"), Zf = Symbol.for("react.context"), Eu = Symbol.for("react.forward_ref"), kc = Symbol.for("react.suspense"), Tc = Symbol.for("react.suspense_list"), Au = Symbol.for("react.memo"), ss = Symbol.for("react.lazy"), qf = Symbol.for("react.offscreen"), Nh = Symbol.iterator;
function Gl(e) {
  return e === null || typeof e != "object" ? null : (e = Nh && e[Nh] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Je = Object.assign, Ta;
function ir(e) {
  if (Ta === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Ta = t && t[1] || "";
  }
  return `
` + Ta + e;
}
var ja = !1;
function Ca(e, t) {
  if (!e || ja) return "";
  ja = !0;
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
`), r = s.stack.split(`
`), i = l.length - 1, a = r.length - 1; 1 <= i && 0 <= a && l[i] !== r[a]; ) a--;
      for (; 1 <= i && 0 <= a; i--, a--) if (l[i] !== r[a]) {
        if (i !== 1 || a !== 1)
          do
            if (i--, a--, 0 > a || l[i] !== r[a]) {
              var c = `
` + l[i].replace(" at new ", " at ");
              return e.displayName && c.includes("<anonymous>") && (c = c.replace("<anonymous>", e.displayName)), c;
            }
          while (1 <= i && 0 <= a);
        break;
      }
    }
  } finally {
    ja = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? ir(e) : "";
}
function Dy(e) {
  switch (e.tag) {
    case 5:
      return ir(e.type);
    case 16:
      return ir("Lazy");
    case 13:
      return ir("Suspense");
    case 19:
      return ir("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ca(e.type, !1), e;
    case 11:
      return e = Ca(e.type.render, !1), e;
    case 1:
      return e = Ca(e.type, !0), e;
    default:
      return "";
  }
}
function jc(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case ol:
      return "Fragment";
    case il:
      return "Portal";
    case bc:
      return "Profiler";
    case Iu:
      return "StrictMode";
    case kc:
      return "Suspense";
    case Tc:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Zf:
      return (e.displayName || "Context") + ".Consumer";
    case Qf:
      return (e._context.displayName || "Context") + ".Provider";
    case Eu:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Au:
      return t = e.displayName || null, t !== null ? t : jc(e.type) || "Memo";
    case ss:
      t = e._payload, e = e._init;
      try {
        return jc(e(t));
      } catch {
      }
  }
  return null;
}
function Yy(e) {
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
      return jc(t);
    case 8:
      return t === Iu ? "StrictMode" : "Mode";
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
function ws(e) {
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
function Jf(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function By(e) {
  var t = Jf(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), s = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, r = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(i) {
      s = "" + i, r.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return s;
    }, setValue: function(i) {
      s = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function vi(e) {
  e._valueTracker || (e._valueTracker = By(e));
}
function em(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), s = "";
  return e && (s = Jf(e) ? e.checked ? "true" : "false" : e.value), e = s, e !== n ? (t.setValue(e), !0) : !1;
}
function so(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Cc(e, t) {
  var n = t.checked;
  return Je({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ph(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, s = t.checked != null ? t.checked : t.defaultChecked;
  n = ws(t.value != null ? t.value : n), e._wrapperState = { initialChecked: s, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function tm(e, t) {
  t = t.checked, t != null && Pu(e, "checked", t, !1);
}
function Nc(e, t) {
  tm(e, t);
  var n = ws(t.value), s = t.type;
  if (n != null) s === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (s === "submit" || s === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Pc(e, t.type, n) : t.hasOwnProperty("defaultValue") && Pc(e, t.type, ws(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ih(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var s = t.type;
    if (!(s !== "submit" && s !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Pc(e, t, n) {
  (t !== "number" || so(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var or = Array.isArray;
function yl(e, t, n, s) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && s && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + ws(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, s && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ic(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(F(91));
  return Je({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Eh(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(F(92));
      if (or(n)) {
        if (1 < n.length) throw Error(F(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: ws(n) };
}
function nm(e, t) {
  var n = ws(t.value), s = ws(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), s != null && (e.defaultValue = "" + s);
}
function Ah(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function sm(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ec(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? sm(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wi, lm = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, s, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, s, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (wi = wi || document.createElement("div"), wi.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wi.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function _r(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var dr = {
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
}, Xy = ["Webkit", "ms", "Moz", "O"];
Object.keys(dr).forEach(function(e) {
  Xy.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), dr[t] = dr[e];
  });
});
function rm(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || dr.hasOwnProperty(e) && dr[e] ? ("" + t).trim() : t + "px";
}
function im(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var s = n.indexOf("--") === 0, l = rm(n, t[n], s);
    n === "float" && (n = "cssFloat"), s ? e.setProperty(n, l) : e[n] = l;
  }
}
var Fy = Je({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ac(e, t) {
  if (t) {
    if (Fy[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(F(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(F(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(F(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(F(62));
  }
}
function Rc(e, t) {
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
var Lc = null;
function Ru(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Dc = null, vl = null, wl = null;
function Rh(e) {
  if (e = zr(e)) {
    if (typeof Dc != "function") throw Error(F(280));
    var t = e.stateNode;
    t && (t = Ho(t), Dc(e.stateNode, e.type, t));
  }
}
function om(e) {
  vl ? wl ? wl.push(e) : wl = [e] : vl = e;
}
function am() {
  if (vl) {
    var e = vl, t = wl;
    if (wl = vl = null, Rh(e), t) for (e = 0; e < t.length; e++) Rh(t[e]);
  }
}
function cm(e, t) {
  return e(t);
}
function um() {
}
var Na = !1;
function dm(e, t, n) {
  if (Na) return e(t, n);
  Na = !0;
  try {
    return cm(e, t, n);
  } finally {
    Na = !1, (vl !== null || wl !== null) && (um(), am());
  }
}
function br(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var s = Ho(n);
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
  if (n && typeof n != "function") throw Error(F(231, t, typeof n));
  return n;
}
var Yc = !1;
if (zn) try {
  var Vl = {};
  Object.defineProperty(Vl, "passive", { get: function() {
    Yc = !0;
  } }), window.addEventListener("test", Vl, Vl), window.removeEventListener("test", Vl, Vl);
} catch {
  Yc = !1;
}
function Oy(e, t, n, s, l, r, i, a, c) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var hr = !1, lo = null, ro = !1, Bc = null, zy = { onError: function(e) {
  hr = !0, lo = e;
} };
function Hy(e, t, n, s, l, r, i, a, c) {
  hr = !1, lo = null, Oy.apply(zy, arguments);
}
function Wy(e, t, n, s, l, r, i, a, c) {
  if (Hy.apply(this, arguments), hr) {
    if (hr) {
      var u = lo;
      hr = !1, lo = null;
    } else throw Error(F(198));
    ro || (ro = !0, Bc = u);
  }
}
function Gs(e) {
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
function hm(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Lh(e) {
  if (Gs(e) !== e) throw Error(F(188));
}
function Uy(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Gs(e), t === null) throw Error(F(188));
    return t !== e ? null : e;
  }
  for (var n = e, s = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var r = l.alternate;
    if (r === null) {
      if (s = l.return, s !== null) {
        n = s;
        continue;
      }
      break;
    }
    if (l.child === r.child) {
      for (r = l.child; r; ) {
        if (r === n) return Lh(l), e;
        if (r === s) return Lh(l), t;
        r = r.sibling;
      }
      throw Error(F(188));
    }
    if (n.return !== s.return) n = l, s = r;
    else {
      for (var i = !1, a = l.child; a; ) {
        if (a === n) {
          i = !0, n = l, s = r;
          break;
        }
        if (a === s) {
          i = !0, s = l, n = r;
          break;
        }
        a = a.sibling;
      }
      if (!i) {
        for (a = r.child; a; ) {
          if (a === n) {
            i = !0, n = r, s = l;
            break;
          }
          if (a === s) {
            i = !0, s = r, n = l;
            break;
          }
          a = a.sibling;
        }
        if (!i) throw Error(F(189));
      }
    }
    if (n.alternate !== s) throw Error(F(190));
  }
  if (n.tag !== 3) throw Error(F(188));
  return n.stateNode.current === n ? e : t;
}
function pm(e) {
  return e = Uy(e), e !== null ? fm(e) : null;
}
function fm(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = fm(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var mm = Gt.unstable_scheduleCallback, Dh = Gt.unstable_cancelCallback, $y = Gt.unstable_shouldYield, Ky = Gt.unstable_requestPaint, st = Gt.unstable_now, Gy = Gt.unstable_getCurrentPriorityLevel, Lu = Gt.unstable_ImmediatePriority, gm = Gt.unstable_UserBlockingPriority, io = Gt.unstable_NormalPriority, Vy = Gt.unstable_LowPriority, xm = Gt.unstable_IdlePriority, Xo = null, Cn = null;
function Qy(e) {
  if (Cn && typeof Cn.onCommitFiberRoot == "function") try {
    Cn.onCommitFiberRoot(Xo, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var wn = Math.clz32 ? Math.clz32 : Jy, Zy = Math.log, qy = Math.LN2;
function Jy(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Zy(e) / qy | 0) | 0;
}
var Si = 64, Mi = 4194304;
function ar(e) {
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
function oo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var s = 0, l = e.suspendedLanes, r = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var a = i & ~l;
    a !== 0 ? s = ar(a) : (r &= i, r !== 0 && (s = ar(r)));
  } else i = n & ~l, i !== 0 ? s = ar(i) : r !== 0 && (s = ar(r));
  if (s === 0) return 0;
  if (t !== 0 && t !== s && !(t & l) && (l = s & -s, r = t & -t, l >= r || l === 16 && (r & 4194240) !== 0)) return t;
  if (s & 4 && (s |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= s; 0 < t; ) n = 31 - wn(t), l = 1 << n, s |= e[n], t &= ~l;
  return s;
}
function ev(e, t) {
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
function tv(e, t) {
  for (var n = e.suspendedLanes, s = e.pingedLanes, l = e.expirationTimes, r = e.pendingLanes; 0 < r; ) {
    var i = 31 - wn(r), a = 1 << i, c = l[i];
    c === -1 ? (!(a & n) || a & s) && (l[i] = ev(a, t)) : c <= t && (e.expiredLanes |= a), r &= ~a;
  }
}
function Xc(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function ym() {
  var e = Si;
  return Si <<= 1, !(Si & 4194240) && (Si = 64), e;
}
function Pa(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Fr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - wn(t), e[t] = n;
}
function nv(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var s = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - wn(n), r = 1 << l;
    t[l] = 0, s[l] = -1, e[l] = -1, n &= ~r;
  }
}
function Du(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var s = 31 - wn(n), l = 1 << s;
    l & t | e[s] & t && (e[s] |= t), n &= ~l;
  }
}
var Ae = 0;
function vm(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var wm, Yu, Sm, Mm, _m, Fc = !1, _i = [], hs = null, ps = null, fs = null, kr = /* @__PURE__ */ new Map(), Tr = /* @__PURE__ */ new Map(), is = [], sv = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Yh(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      hs = null;
      break;
    case "dragenter":
    case "dragleave":
      ps = null;
      break;
    case "mouseover":
    case "mouseout":
      fs = null;
      break;
    case "pointerover":
    case "pointerout":
      kr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Tr.delete(t.pointerId);
  }
}
function Ql(e, t, n, s, l, r) {
  return e === null || e.nativeEvent !== r ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: s, nativeEvent: r, targetContainers: [l] }, t !== null && (t = zr(t), t !== null && Yu(t)), e) : (e.eventSystemFlags |= s, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function lv(e, t, n, s, l) {
  switch (t) {
    case "focusin":
      return hs = Ql(hs, e, t, n, s, l), !0;
    case "dragenter":
      return ps = Ql(ps, e, t, n, s, l), !0;
    case "mouseover":
      return fs = Ql(fs, e, t, n, s, l), !0;
    case "pointerover":
      var r = l.pointerId;
      return kr.set(r, Ql(kr.get(r) || null, e, t, n, s, l)), !0;
    case "gotpointercapture":
      return r = l.pointerId, Tr.set(r, Ql(Tr.get(r) || null, e, t, n, s, l)), !0;
  }
  return !1;
}
function bm(e) {
  var t = Rs(e.target);
  if (t !== null) {
    var n = Gs(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = hm(n), t !== null) {
          e.blockedOn = t, _m(e.priority, function() {
            Sm(n);
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
function Hi(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Oc(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var s = new n.constructor(n.type, n);
      Lc = s, n.target.dispatchEvent(s), Lc = null;
    } else return t = zr(n), t !== null && Yu(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Bh(e, t, n) {
  Hi(e) && n.delete(t);
}
function rv() {
  Fc = !1, hs !== null && Hi(hs) && (hs = null), ps !== null && Hi(ps) && (ps = null), fs !== null && Hi(fs) && (fs = null), kr.forEach(Bh), Tr.forEach(Bh);
}
function Zl(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Fc || (Fc = !0, Gt.unstable_scheduleCallback(Gt.unstable_NormalPriority, rv)));
}
function jr(e) {
  function t(l) {
    return Zl(l, e);
  }
  if (0 < _i.length) {
    Zl(_i[0], e);
    for (var n = 1; n < _i.length; n++) {
      var s = _i[n];
      s.blockedOn === e && (s.blockedOn = null);
    }
  }
  for (hs !== null && Zl(hs, e), ps !== null && Zl(ps, e), fs !== null && Zl(fs, e), kr.forEach(t), Tr.forEach(t), n = 0; n < is.length; n++) s = is[n], s.blockedOn === e && (s.blockedOn = null);
  for (; 0 < is.length && (n = is[0], n.blockedOn === null); ) bm(n), n.blockedOn === null && is.shift();
}
var Sl = Kn.ReactCurrentBatchConfig, ao = !0;
function iv(e, t, n, s) {
  var l = Ae, r = Sl.transition;
  Sl.transition = null;
  try {
    Ae = 1, Bu(e, t, n, s);
  } finally {
    Ae = l, Sl.transition = r;
  }
}
function ov(e, t, n, s) {
  var l = Ae, r = Sl.transition;
  Sl.transition = null;
  try {
    Ae = 4, Bu(e, t, n, s);
  } finally {
    Ae = l, Sl.transition = r;
  }
}
function Bu(e, t, n, s) {
  if (ao) {
    var l = Oc(e, t, n, s);
    if (l === null) Fa(e, t, s, co, n), Yh(e, s);
    else if (lv(l, e, t, n, s)) s.stopPropagation();
    else if (Yh(e, s), t & 4 && -1 < sv.indexOf(e)) {
      for (; l !== null; ) {
        var r = zr(l);
        if (r !== null && wm(r), r = Oc(e, t, n, s), r === null && Fa(e, t, s, co, n), r === l) break;
        l = r;
      }
      l !== null && s.stopPropagation();
    } else Fa(e, t, s, null, n);
  }
}
var co = null;
function Oc(e, t, n, s) {
  if (co = null, e = Ru(s), e = Rs(e), e !== null) if (t = Gs(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = hm(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return co = e, null;
}
function km(e) {
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
      switch (Gy()) {
        case Lu:
          return 1;
        case gm:
          return 4;
        case io:
        case Vy:
          return 16;
        case xm:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var us = null, Xu = null, Wi = null;
function Tm() {
  if (Wi) return Wi;
  var e, t = Xu, n = t.length, s, l = "value" in us ? us.value : us.textContent, r = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var i = n - e;
  for (s = 1; s <= i && t[n - s] === l[r - s]; s++) ;
  return Wi = l.slice(e, 1 < s ? 1 - s : void 0);
}
function Ui(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function bi() {
  return !0;
}
function Xh() {
  return !1;
}
function Qt(e) {
  function t(n, s, l, r, i) {
    this._reactName = n, this._targetInst = l, this.type = s, this.nativeEvent = r, this.target = i, this.currentTarget = null;
    for (var a in e) e.hasOwnProperty(a) && (n = e[a], this[a] = n ? n(r) : r[a]);
    return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? bi : Xh, this.isPropagationStopped = Xh, this;
  }
  return Je(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = bi);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = bi);
  }, persist: function() {
  }, isPersistent: bi }), t;
}
var Bl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Fu = Qt(Bl), Or = Je({}, Bl, { view: 0, detail: 0 }), av = Qt(Or), Ia, Ea, ql, Fo = Je({}, Or, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ou, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== ql && (ql && e.type === "mousemove" ? (Ia = e.screenX - ql.screenX, Ea = e.screenY - ql.screenY) : Ea = Ia = 0, ql = e), Ia);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Ea;
} }), Fh = Qt(Fo), cv = Je({}, Fo, { dataTransfer: 0 }), uv = Qt(cv), dv = Je({}, Or, { relatedTarget: 0 }), Aa = Qt(dv), hv = Je({}, Bl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), pv = Qt(hv), fv = Je({}, Bl, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), mv = Qt(fv), gv = Je({}, Bl, { data: 0 }), Oh = Qt(gv), xv = {
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
}, yv = {
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
}, vv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function wv(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = vv[e]) ? !!t[e] : !1;
}
function Ou() {
  return wv;
}
var Sv = Je({}, Or, { key: function(e) {
  if (e.key) {
    var t = xv[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ui(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? yv[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ou, charCode: function(e) {
  return e.type === "keypress" ? Ui(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ui(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Mv = Qt(Sv), _v = Je({}, Fo, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), zh = Qt(_v), bv = Je({}, Or, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ou }), kv = Qt(bv), Tv = Je({}, Bl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), jv = Qt(Tv), Cv = Je({}, Fo, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Nv = Qt(Cv), Pv = [9, 13, 27, 32], zu = zn && "CompositionEvent" in window, pr = null;
zn && "documentMode" in document && (pr = document.documentMode);
var Iv = zn && "TextEvent" in window && !pr, jm = zn && (!zu || pr && 8 < pr && 11 >= pr), Hh = " ", Wh = !1;
function Cm(e, t) {
  switch (e) {
    case "keyup":
      return Pv.indexOf(t.keyCode) !== -1;
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
function Nm(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var al = !1;
function Ev(e, t) {
  switch (e) {
    case "compositionend":
      return Nm(t);
    case "keypress":
      return t.which !== 32 ? null : (Wh = !0, Hh);
    case "textInput":
      return e = t.data, e === Hh && Wh ? null : e;
    default:
      return null;
  }
}
function Av(e, t) {
  if (al) return e === "compositionend" || !zu && Cm(e, t) ? (e = Tm(), Wi = Xu = us = null, al = !1, e) : null;
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
      return jm && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Rv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Uh(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Rv[e.type] : t === "textarea";
}
function Pm(e, t, n, s) {
  om(s), t = uo(t, "onChange"), 0 < t.length && (n = new Fu("onChange", "change", null, n, s), e.push({ event: n, listeners: t }));
}
var fr = null, Cr = null;
function Lv(e) {
  Om(e, 0);
}
function Oo(e) {
  var t = dl(e);
  if (em(t)) return e;
}
function Dv(e, t) {
  if (e === "change") return t;
}
var Im = !1;
if (zn) {
  var Ra;
  if (zn) {
    var La = "oninput" in document;
    if (!La) {
      var $h = document.createElement("div");
      $h.setAttribute("oninput", "return;"), La = typeof $h.oninput == "function";
    }
    Ra = La;
  } else Ra = !1;
  Im = Ra && (!document.documentMode || 9 < document.documentMode);
}
function Kh() {
  fr && (fr.detachEvent("onpropertychange", Em), Cr = fr = null);
}
function Em(e) {
  if (e.propertyName === "value" && Oo(Cr)) {
    var t = [];
    Pm(t, Cr, e, Ru(e)), dm(Lv, t);
  }
}
function Yv(e, t, n) {
  e === "focusin" ? (Kh(), fr = t, Cr = n, fr.attachEvent("onpropertychange", Em)) : e === "focusout" && Kh();
}
function Bv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Oo(Cr);
}
function Xv(e, t) {
  if (e === "click") return Oo(t);
}
function Fv(e, t) {
  if (e === "input" || e === "change") return Oo(t);
}
function Ov(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Mn = typeof Object.is == "function" ? Object.is : Ov;
function Nr(e, t) {
  if (Mn(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), s = Object.keys(t);
  if (n.length !== s.length) return !1;
  for (s = 0; s < n.length; s++) {
    var l = n[s];
    if (!_c.call(t, l) || !Mn(e[l], t[l])) return !1;
  }
  return !0;
}
function Gh(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Vh(e, t) {
  var n = Gh(e);
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
    n = Gh(n);
  }
}
function Am(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Am(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Rm() {
  for (var e = window, t = so(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = so(e.document);
  }
  return t;
}
function Hu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function zv(e) {
  var t = Rm(), n = e.focusedElem, s = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Am(n.ownerDocument.documentElement, n)) {
    if (s !== null && Hu(n)) {
      if (t = s.start, e = s.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, r = Math.min(s.start, l);
        s = s.end === void 0 ? r : Math.min(s.end, l), !e.extend && r > s && (l = s, s = r, r = l), l = Vh(n, r);
        var i = Vh(
          n,
          s
        );
        l && i && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), r > s ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Hv = zn && "documentMode" in document && 11 >= document.documentMode, cl = null, zc = null, mr = null, Hc = !1;
function Qh(e, t, n) {
  var s = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Hc || cl == null || cl !== so(s) || (s = cl, "selectionStart" in s && Hu(s) ? s = { start: s.selectionStart, end: s.selectionEnd } : (s = (s.ownerDocument && s.ownerDocument.defaultView || window).getSelection(), s = { anchorNode: s.anchorNode, anchorOffset: s.anchorOffset, focusNode: s.focusNode, focusOffset: s.focusOffset }), mr && Nr(mr, s) || (mr = s, s = uo(zc, "onSelect"), 0 < s.length && (t = new Fu("onSelect", "select", null, t, n), e.push({ event: t, listeners: s }), t.target = cl)));
}
function ki(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var ul = { animationend: ki("Animation", "AnimationEnd"), animationiteration: ki("Animation", "AnimationIteration"), animationstart: ki("Animation", "AnimationStart"), transitionend: ki("Transition", "TransitionEnd") }, Da = {}, Lm = {};
zn && (Lm = document.createElement("div").style, "AnimationEvent" in window || (delete ul.animationend.animation, delete ul.animationiteration.animation, delete ul.animationstart.animation), "TransitionEvent" in window || delete ul.transitionend.transition);
function zo(e) {
  if (Da[e]) return Da[e];
  if (!ul[e]) return e;
  var t = ul[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in Lm) return Da[e] = t[n];
  return e;
}
var Dm = zo("animationend"), Ym = zo("animationiteration"), Bm = zo("animationstart"), Xm = zo("transitionend"), Fm = /* @__PURE__ */ new Map(), Zh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Ms(e, t) {
  Fm.set(e, t), Ks(t, [e]);
}
for (var Ya = 0; Ya < Zh.length; Ya++) {
  var Ba = Zh[Ya], Wv = Ba.toLowerCase(), Uv = Ba[0].toUpperCase() + Ba.slice(1);
  Ms(Wv, "on" + Uv);
}
Ms(Dm, "onAnimationEnd");
Ms(Ym, "onAnimationIteration");
Ms(Bm, "onAnimationStart");
Ms("dblclick", "onDoubleClick");
Ms("focusin", "onFocus");
Ms("focusout", "onBlur");
Ms(Xm, "onTransitionEnd");
Tl("onMouseEnter", ["mouseout", "mouseover"]);
Tl("onMouseLeave", ["mouseout", "mouseover"]);
Tl("onPointerEnter", ["pointerout", "pointerover"]);
Tl("onPointerLeave", ["pointerout", "pointerover"]);
Ks("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Ks("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Ks("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Ks("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Ks("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Ks("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var cr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), $v = new Set("cancel close invalid load scroll toggle".split(" ").concat(cr));
function qh(e, t, n) {
  var s = e.type || "unknown-event";
  e.currentTarget = n, Wy(s, t, void 0, e), e.currentTarget = null;
}
function Om(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var s = e[n], l = s.event;
    s = s.listeners;
    e: {
      var r = void 0;
      if (t) for (var i = s.length - 1; 0 <= i; i--) {
        var a = s[i], c = a.instance, u = a.currentTarget;
        if (a = a.listener, c !== r && l.isPropagationStopped()) break e;
        qh(l, a, u), r = c;
      }
      else for (i = 0; i < s.length; i++) {
        if (a = s[i], c = a.instance, u = a.currentTarget, a = a.listener, c !== r && l.isPropagationStopped()) break e;
        qh(l, a, u), r = c;
      }
    }
  }
  if (ro) throw e = Bc, ro = !1, Bc = null, e;
}
function ze(e, t) {
  var n = t[Gc];
  n === void 0 && (n = t[Gc] = /* @__PURE__ */ new Set());
  var s = e + "__bubble";
  n.has(s) || (zm(t, e, 2, !1), n.add(s));
}
function Xa(e, t, n) {
  var s = 0;
  t && (s |= 4), zm(n, e, s, t);
}
var Ti = "_reactListening" + Math.random().toString(36).slice(2);
function Pr(e) {
  if (!e[Ti]) {
    e[Ti] = !0, Vf.forEach(function(n) {
      n !== "selectionchange" && ($v.has(n) || Xa(n, !1, e), Xa(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ti] || (t[Ti] = !0, Xa("selectionchange", !1, t));
  }
}
function zm(e, t, n, s) {
  switch (km(t)) {
    case 1:
      var l = iv;
      break;
    case 4:
      l = ov;
      break;
    default:
      l = Bu;
  }
  n = l.bind(null, t, n, e), l = void 0, !Yc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), s ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Fa(e, t, n, s, l) {
  var r = s;
  if (!(t & 1) && !(t & 2) && s !== null) e: for (; ; ) {
    if (s === null) return;
    var i = s.tag;
    if (i === 3 || i === 4) {
      var a = s.stateNode.containerInfo;
      if (a === l || a.nodeType === 8 && a.parentNode === l) break;
      if (i === 4) for (i = s.return; i !== null; ) {
        var c = i.tag;
        if ((c === 3 || c === 4) && (c = i.stateNode.containerInfo, c === l || c.nodeType === 8 && c.parentNode === l)) return;
        i = i.return;
      }
      for (; a !== null; ) {
        if (i = Rs(a), i === null) return;
        if (c = i.tag, c === 5 || c === 6) {
          s = r = i;
          continue e;
        }
        a = a.parentNode;
      }
    }
    s = s.return;
  }
  dm(function() {
    var u = r, d = Ru(n), p = [];
    e: {
      var h = Fm.get(e);
      if (h !== void 0) {
        var f = Fu, g = e;
        switch (e) {
          case "keypress":
            if (Ui(n) === 0) break e;
          case "keydown":
          case "keyup":
            f = Mv;
            break;
          case "focusin":
            g = "focus", f = Aa;
            break;
          case "focusout":
            g = "blur", f = Aa;
            break;
          case "beforeblur":
          case "afterblur":
            f = Aa;
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
            f = Fh;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            f = uv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            f = kv;
            break;
          case Dm:
          case Ym:
          case Bm:
            f = pv;
            break;
          case Xm:
            f = jv;
            break;
          case "scroll":
            f = av;
            break;
          case "wheel":
            f = Nv;
            break;
          case "copy":
          case "cut":
          case "paste":
            f = mv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            f = zh;
        }
        var S = (t & 4) !== 0, M = !S && e === "scroll", y = S ? h !== null ? h + "Capture" : null : h;
        S = [];
        for (var m = u, v; m !== null; ) {
          v = m;
          var w = v.stateNode;
          if (v.tag === 5 && w !== null && (v = w, y !== null && (w = br(m, y), w != null && S.push(Ir(m, w, v)))), M) break;
          m = m.return;
        }
        0 < S.length && (h = new f(h, g, null, n, d), p.push({ event: h, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (h = e === "mouseover" || e === "pointerover", f = e === "mouseout" || e === "pointerout", h && n !== Lc && (g = n.relatedTarget || n.fromElement) && (Rs(g) || g[Hn])) break e;
        if ((f || h) && (h = d.window === d ? d : (h = d.ownerDocument) ? h.defaultView || h.parentWindow : window, f ? (g = n.relatedTarget || n.toElement, f = u, g = g ? Rs(g) : null, g !== null && (M = Gs(g), g !== M || g.tag !== 5 && g.tag !== 6) && (g = null)) : (f = null, g = u), f !== g)) {
          if (S = Fh, w = "onMouseLeave", y = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (S = zh, w = "onPointerLeave", y = "onPointerEnter", m = "pointer"), M = f == null ? h : dl(f), v = g == null ? h : dl(g), h = new S(w, m + "leave", f, n, d), h.target = M, h.relatedTarget = v, w = null, Rs(d) === u && (S = new S(y, m + "enter", g, n, d), S.target = v, S.relatedTarget = M, w = S), M = w, f && g) t: {
            for (S = f, y = g, m = 0, v = S; v; v = nl(v)) m++;
            for (v = 0, w = y; w; w = nl(w)) v++;
            for (; 0 < m - v; ) S = nl(S), m--;
            for (; 0 < v - m; ) y = nl(y), v--;
            for (; m--; ) {
              if (S === y || y !== null && S === y.alternate) break t;
              S = nl(S), y = nl(y);
            }
            S = null;
          }
          else S = null;
          f !== null && Jh(p, h, f, S, !1), g !== null && M !== null && Jh(p, M, g, S, !0);
        }
      }
      e: {
        if (h = u ? dl(u) : window, f = h.nodeName && h.nodeName.toLowerCase(), f === "select" || f === "input" && h.type === "file") var _ = Dv;
        else if (Uh(h)) if (Im) _ = Fv;
        else {
          _ = Bv;
          var b = Yv;
        }
        else (f = h.nodeName) && f.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (_ = Xv);
        if (_ && (_ = _(e, u))) {
          Pm(p, _, n, d);
          break e;
        }
        b && b(e, h, u), e === "focusout" && (b = h._wrapperState) && b.controlled && h.type === "number" && Pc(h, "number", h.value);
      }
      switch (b = u ? dl(u) : window, e) {
        case "focusin":
          (Uh(b) || b.contentEditable === "true") && (cl = b, zc = u, mr = null);
          break;
        case "focusout":
          mr = zc = cl = null;
          break;
        case "mousedown":
          Hc = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Hc = !1, Qh(p, n, d);
          break;
        case "selectionchange":
          if (Hv) break;
        case "keydown":
        case "keyup":
          Qh(p, n, d);
      }
      var T;
      if (zu) e: {
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
      else al ? Cm(e, n) && (j = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (j = "onCompositionStart");
      j && (jm && n.locale !== "ko" && (al || j !== "onCompositionStart" ? j === "onCompositionEnd" && al && (T = Tm()) : (us = d, Xu = "value" in us ? us.value : us.textContent, al = !0)), b = uo(u, j), 0 < b.length && (j = new Oh(j, e, null, n, d), p.push({ event: j, listeners: b }), T ? j.data = T : (T = Nm(n), T !== null && (j.data = T)))), (T = Iv ? Ev(e, n) : Av(e, n)) && (u = uo(u, "onBeforeInput"), 0 < u.length && (d = new Oh("onBeforeInput", "beforeinput", null, n, d), p.push({ event: d, listeners: u }), d.data = T));
    }
    Om(p, t);
  });
}
function Ir(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function uo(e, t) {
  for (var n = t + "Capture", s = []; e !== null; ) {
    var l = e, r = l.stateNode;
    l.tag === 5 && r !== null && (l = r, r = br(e, n), r != null && s.unshift(Ir(e, r, l)), r = br(e, t), r != null && s.push(Ir(e, r, l))), e = e.return;
  }
  return s;
}
function nl(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Jh(e, t, n, s, l) {
  for (var r = t._reactName, i = []; n !== null && n !== s; ) {
    var a = n, c = a.alternate, u = a.stateNode;
    if (c !== null && c === s) break;
    a.tag === 5 && u !== null && (a = u, l ? (c = br(n, r), c != null && i.unshift(Ir(n, c, a))) : l || (c = br(n, r), c != null && i.push(Ir(n, c, a)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Kv = /\r\n?/g, Gv = /\u0000|\uFFFD/g;
function ep(e) {
  return (typeof e == "string" ? e : "" + e).replace(Kv, `
`).replace(Gv, "");
}
function ji(e, t, n) {
  if (t = ep(t), ep(e) !== t && n) throw Error(F(425));
}
function ho() {
}
var Wc = null, Uc = null;
function $c(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Kc = typeof setTimeout == "function" ? setTimeout : void 0, Vv = typeof clearTimeout == "function" ? clearTimeout : void 0, tp = typeof Promise == "function" ? Promise : void 0, Qv = typeof queueMicrotask == "function" ? queueMicrotask : typeof tp < "u" ? function(e) {
  return tp.resolve(null).then(e).catch(Zv);
} : Kc;
function Zv(e) {
  setTimeout(function() {
    throw e;
  });
}
function Oa(e, t) {
  var n = t, s = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (s === 0) {
        e.removeChild(l), jr(t);
        return;
      }
      s--;
    } else n !== "$" && n !== "$?" && n !== "$!" || s++;
    n = l;
  } while (n);
  jr(t);
}
function ms(e) {
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
function np(e) {
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
var Xl = Math.random().toString(36).slice(2), Tn = "__reactFiber$" + Xl, Er = "__reactProps$" + Xl, Hn = "__reactContainer$" + Xl, Gc = "__reactEvents$" + Xl, qv = "__reactListeners$" + Xl, Jv = "__reactHandles$" + Xl;
function Rs(e) {
  var t = e[Tn];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[Hn] || n[Tn]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = np(e); e !== null; ) {
        if (n = e[Tn]) return n;
        e = np(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function zr(e) {
  return e = e[Tn] || e[Hn], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function dl(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(F(33));
}
function Ho(e) {
  return e[Er] || null;
}
var Vc = [], hl = -1;
function _s(e) {
  return { current: e };
}
function He(e) {
  0 > hl || (e.current = Vc[hl], Vc[hl] = null, hl--);
}
function Fe(e, t) {
  hl++, Vc[hl] = e.current, e.current = t;
}
var Ss = {}, kt = _s(Ss), Xt = _s(!1), Os = Ss;
function jl(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Ss;
  var s = e.stateNode;
  if (s && s.__reactInternalMemoizedUnmaskedChildContext === t) return s.__reactInternalMemoizedMaskedChildContext;
  var l = {}, r;
  for (r in n) l[r] = t[r];
  return s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Ft(e) {
  return e = e.childContextTypes, e != null;
}
function po() {
  He(Xt), He(kt);
}
function sp(e, t, n) {
  if (kt.current !== Ss) throw Error(F(168));
  Fe(kt, t), Fe(Xt, n);
}
function Hm(e, t, n) {
  var s = e.stateNode;
  if (t = t.childContextTypes, typeof s.getChildContext != "function") return n;
  s = s.getChildContext();
  for (var l in s) if (!(l in t)) throw Error(F(108, Yy(e) || "Unknown", l));
  return Je({}, n, s);
}
function fo(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Ss, Os = kt.current, Fe(kt, e), Fe(Xt, Xt.current), !0;
}
function lp(e, t, n) {
  var s = e.stateNode;
  if (!s) throw Error(F(169));
  n ? (e = Hm(e, t, Os), s.__reactInternalMemoizedMergedChildContext = e, He(Xt), He(kt), Fe(kt, e)) : He(Xt), Fe(Xt, n);
}
var Yn = null, Wo = !1, za = !1;
function Wm(e) {
  Yn === null ? Yn = [e] : Yn.push(e);
}
function e0(e) {
  Wo = !0, Wm(e);
}
function bs() {
  if (!za && Yn !== null) {
    za = !0;
    var e = 0, t = Ae;
    try {
      var n = Yn;
      for (Ae = 1; e < n.length; e++) {
        var s = n[e];
        do
          s = s(!0);
        while (s !== null);
      }
      Yn = null, Wo = !1;
    } catch (l) {
      throw Yn !== null && (Yn = Yn.slice(e + 1)), mm(Lu, bs), l;
    } finally {
      Ae = t, za = !1;
    }
  }
  return null;
}
var pl = [], fl = 0, mo = null, go = 0, nn = [], sn = 0, zs = null, Bn = 1, Xn = "";
function Is(e, t) {
  pl[fl++] = go, pl[fl++] = mo, mo = e, go = t;
}
function Um(e, t, n) {
  nn[sn++] = Bn, nn[sn++] = Xn, nn[sn++] = zs, zs = e;
  var s = Bn;
  e = Xn;
  var l = 32 - wn(s) - 1;
  s &= ~(1 << l), n += 1;
  var r = 32 - wn(t) + l;
  if (30 < r) {
    var i = l - l % 5;
    r = (s & (1 << i) - 1).toString(32), s >>= i, l -= i, Bn = 1 << 32 - wn(t) + l | n << l | s, Xn = r + e;
  } else Bn = 1 << r | n << l | s, Xn = e;
}
function Wu(e) {
  e.return !== null && (Is(e, 1), Um(e, 1, 0));
}
function Uu(e) {
  for (; e === mo; ) mo = pl[--fl], pl[fl] = null, go = pl[--fl], pl[fl] = null;
  for (; e === zs; ) zs = nn[--sn], nn[sn] = null, Xn = nn[--sn], nn[sn] = null, Bn = nn[--sn], nn[sn] = null;
}
var $t = null, Ut = null, Ke = !1, vn = null;
function $m(e, t) {
  var n = rn(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function rp(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, $t = e, Ut = ms(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, $t = e, Ut = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = zs !== null ? { id: Bn, overflow: Xn } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = rn(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, $t = e, Ut = null, !0) : !1;
    default:
      return !1;
  }
}
function Qc(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Zc(e) {
  if (Ke) {
    var t = Ut;
    if (t) {
      var n = t;
      if (!rp(e, t)) {
        if (Qc(e)) throw Error(F(418));
        t = ms(n.nextSibling);
        var s = $t;
        t && rp(e, t) ? $m(s, n) : (e.flags = e.flags & -4097 | 2, Ke = !1, $t = e);
      }
    } else {
      if (Qc(e)) throw Error(F(418));
      e.flags = e.flags & -4097 | 2, Ke = !1, $t = e;
    }
  }
}
function ip(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  $t = e;
}
function Ci(e) {
  if (e !== $t) return !1;
  if (!Ke) return ip(e), Ke = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !$c(e.type, e.memoizedProps)), t && (t = Ut)) {
    if (Qc(e)) throw Km(), Error(F(418));
    for (; t; ) $m(e, t), t = ms(t.nextSibling);
  }
  if (ip(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(F(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ut = ms(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ut = null;
    }
  } else Ut = $t ? ms(e.stateNode.nextSibling) : null;
  return !0;
}
function Km() {
  for (var e = Ut; e; ) e = ms(e.nextSibling);
}
function Cl() {
  Ut = $t = null, Ke = !1;
}
function $u(e) {
  vn === null ? vn = [e] : vn.push(e);
}
var t0 = Kn.ReactCurrentBatchConfig;
function Jl(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(F(309));
        var s = n.stateNode;
      }
      if (!s) throw Error(F(147, e));
      var l = s, r = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === r ? t.ref : (t = function(i) {
        var a = l.refs;
        i === null ? delete a[r] : a[r] = i;
      }, t._stringRef = r, t);
    }
    if (typeof e != "string") throw Error(F(284));
    if (!n._owner) throw Error(F(290, e));
  }
  return e;
}
function Ni(e, t) {
  throw e = Object.prototype.toString.call(t), Error(F(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function op(e) {
  var t = e._init;
  return t(e._payload);
}
function Gm(e) {
  function t(y, m) {
    if (e) {
      var v = y.deletions;
      v === null ? (y.deletions = [m], y.flags |= 16) : v.push(m);
    }
  }
  function n(y, m) {
    if (!e) return null;
    for (; m !== null; ) t(y, m), m = m.sibling;
    return null;
  }
  function s(y, m) {
    for (y = /* @__PURE__ */ new Map(); m !== null; ) m.key !== null ? y.set(m.key, m) : y.set(m.index, m), m = m.sibling;
    return y;
  }
  function l(y, m) {
    return y = vs(y, m), y.index = 0, y.sibling = null, y;
  }
  function r(y, m, v) {
    return y.index = v, e ? (v = y.alternate, v !== null ? (v = v.index, v < m ? (y.flags |= 2, m) : v) : (y.flags |= 2, m)) : (y.flags |= 1048576, m);
  }
  function i(y) {
    return e && y.alternate === null && (y.flags |= 2), y;
  }
  function a(y, m, v, w) {
    return m === null || m.tag !== 6 ? (m = Va(v, y.mode, w), m.return = y, m) : (m = l(m, v), m.return = y, m);
  }
  function c(y, m, v, w) {
    var _ = v.type;
    return _ === ol ? d(y, m, v.props.children, w, v.key) : m !== null && (m.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ss && op(_) === m.type) ? (w = l(m, v.props), w.ref = Jl(y, m, v), w.return = y, w) : (w = qi(v.type, v.key, v.props, null, y.mode, w), w.ref = Jl(y, m, v), w.return = y, w);
  }
  function u(y, m, v, w) {
    return m === null || m.tag !== 4 || m.stateNode.containerInfo !== v.containerInfo || m.stateNode.implementation !== v.implementation ? (m = Qa(v, y.mode, w), m.return = y, m) : (m = l(m, v.children || []), m.return = y, m);
  }
  function d(y, m, v, w, _) {
    return m === null || m.tag !== 7 ? (m = Xs(v, y.mode, w, _), m.return = y, m) : (m = l(m, v), m.return = y, m);
  }
  function p(y, m, v) {
    if (typeof m == "string" && m !== "" || typeof m == "number") return m = Va("" + m, y.mode, v), m.return = y, m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case yi:
          return v = qi(m.type, m.key, m.props, null, y.mode, v), v.ref = Jl(y, null, m), v.return = y, v;
        case il:
          return m = Qa(m, y.mode, v), m.return = y, m;
        case ss:
          var w = m._init;
          return p(y, w(m._payload), v);
      }
      if (or(m) || Gl(m)) return m = Xs(m, y.mode, v, null), m.return = y, m;
      Ni(y, m);
    }
    return null;
  }
  function h(y, m, v, w) {
    var _ = m !== null ? m.key : null;
    if (typeof v == "string" && v !== "" || typeof v == "number") return _ !== null ? null : a(y, m, "" + v, w);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case yi:
          return v.key === _ ? c(y, m, v, w) : null;
        case il:
          return v.key === _ ? u(y, m, v, w) : null;
        case ss:
          return _ = v._init, h(
            y,
            m,
            _(v._payload),
            w
          );
      }
      if (or(v) || Gl(v)) return _ !== null ? null : d(y, m, v, w, null);
      Ni(y, v);
    }
    return null;
  }
  function f(y, m, v, w, _) {
    if (typeof w == "string" && w !== "" || typeof w == "number") return y = y.get(v) || null, a(m, y, "" + w, _);
    if (typeof w == "object" && w !== null) {
      switch (w.$$typeof) {
        case yi:
          return y = y.get(w.key === null ? v : w.key) || null, c(m, y, w, _);
        case il:
          return y = y.get(w.key === null ? v : w.key) || null, u(m, y, w, _);
        case ss:
          var b = w._init;
          return f(y, m, v, b(w._payload), _);
      }
      if (or(w) || Gl(w)) return y = y.get(v) || null, d(m, y, w, _, null);
      Ni(m, w);
    }
    return null;
  }
  function g(y, m, v, w) {
    for (var _ = null, b = null, T = m, j = m = 0, A = null; T !== null && j < v.length; j++) {
      T.index > j ? (A = T, T = null) : A = T.sibling;
      var L = h(y, T, v[j], w);
      if (L === null) {
        T === null && (T = A);
        break;
      }
      e && T && L.alternate === null && t(y, T), m = r(L, m, j), b === null ? _ = L : b.sibling = L, b = L, T = A;
    }
    if (j === v.length) return n(y, T), Ke && Is(y, j), _;
    if (T === null) {
      for (; j < v.length; j++) T = p(y, v[j], w), T !== null && (m = r(T, m, j), b === null ? _ = T : b.sibling = T, b = T);
      return Ke && Is(y, j), _;
    }
    for (T = s(y, T); j < v.length; j++) A = f(T, y, j, v[j], w), A !== null && (e && A.alternate !== null && T.delete(A.key === null ? j : A.key), m = r(A, m, j), b === null ? _ = A : b.sibling = A, b = A);
    return e && T.forEach(function(C) {
      return t(y, C);
    }), Ke && Is(y, j), _;
  }
  function S(y, m, v, w) {
    var _ = Gl(v);
    if (typeof _ != "function") throw Error(F(150));
    if (v = _.call(v), v == null) throw Error(F(151));
    for (var b = _ = null, T = m, j = m = 0, A = null, L = v.next(); T !== null && !L.done; j++, L = v.next()) {
      T.index > j ? (A = T, T = null) : A = T.sibling;
      var C = h(y, T, L.value, w);
      if (C === null) {
        T === null && (T = A);
        break;
      }
      e && T && C.alternate === null && t(y, T), m = r(C, m, j), b === null ? _ = C : b.sibling = C, b = C, T = A;
    }
    if (L.done) return n(
      y,
      T
    ), Ke && Is(y, j), _;
    if (T === null) {
      for (; !L.done; j++, L = v.next()) L = p(y, L.value, w), L !== null && (m = r(L, m, j), b === null ? _ = L : b.sibling = L, b = L);
      return Ke && Is(y, j), _;
    }
    for (T = s(y, T); !L.done; j++, L = v.next()) L = f(T, y, j, L.value, w), L !== null && (e && L.alternate !== null && T.delete(L.key === null ? j : L.key), m = r(L, m, j), b === null ? _ = L : b.sibling = L, b = L);
    return e && T.forEach(function(R) {
      return t(y, R);
    }), Ke && Is(y, j), _;
  }
  function M(y, m, v, w) {
    if (typeof v == "object" && v !== null && v.type === ol && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case yi:
          e: {
            for (var _ = v.key, b = m; b !== null; ) {
              if (b.key === _) {
                if (_ = v.type, _ === ol) {
                  if (b.tag === 7) {
                    n(y, b.sibling), m = l(b, v.props.children), m.return = y, y = m;
                    break e;
                  }
                } else if (b.elementType === _ || typeof _ == "object" && _ !== null && _.$$typeof === ss && op(_) === b.type) {
                  n(y, b.sibling), m = l(b, v.props), m.ref = Jl(y, b, v), m.return = y, y = m;
                  break e;
                }
                n(y, b);
                break;
              } else t(y, b);
              b = b.sibling;
            }
            v.type === ol ? (m = Xs(v.props.children, y.mode, w, v.key), m.return = y, y = m) : (w = qi(v.type, v.key, v.props, null, y.mode, w), w.ref = Jl(y, m, v), w.return = y, y = w);
          }
          return i(y);
        case il:
          e: {
            for (b = v.key; m !== null; ) {
              if (m.key === b) if (m.tag === 4 && m.stateNode.containerInfo === v.containerInfo && m.stateNode.implementation === v.implementation) {
                n(y, m.sibling), m = l(m, v.children || []), m.return = y, y = m;
                break e;
              } else {
                n(y, m);
                break;
              }
              else t(y, m);
              m = m.sibling;
            }
            m = Qa(v, y.mode, w), m.return = y, y = m;
          }
          return i(y);
        case ss:
          return b = v._init, M(y, m, b(v._payload), w);
      }
      if (or(v)) return g(y, m, v, w);
      if (Gl(v)) return S(y, m, v, w);
      Ni(y, v);
    }
    return typeof v == "string" && v !== "" || typeof v == "number" ? (v = "" + v, m !== null && m.tag === 6 ? (n(y, m.sibling), m = l(m, v), m.return = y, y = m) : (n(y, m), m = Va(v, y.mode, w), m.return = y, y = m), i(y)) : n(y, m);
  }
  return M;
}
var Nl = Gm(!0), Vm = Gm(!1), xo = _s(null), yo = null, ml = null, Ku = null;
function Gu() {
  Ku = ml = yo = null;
}
function Vu(e) {
  var t = xo.current;
  He(xo), e._currentValue = t;
}
function qc(e, t, n) {
  for (; e !== null; ) {
    var s = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, s !== null && (s.childLanes |= t)) : s !== null && (s.childLanes & t) !== t && (s.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Ml(e, t) {
  yo = e, Ku = ml = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Yt = !0), e.firstContext = null);
}
function un(e) {
  var t = e._currentValue;
  if (Ku !== e) if (e = { context: e, memoizedValue: t, next: null }, ml === null) {
    if (yo === null) throw Error(F(308));
    ml = e, yo.dependencies = { lanes: 0, firstContext: e };
  } else ml = ml.next = e;
  return t;
}
var Ls = null;
function Qu(e) {
  Ls === null ? Ls = [e] : Ls.push(e);
}
function Qm(e, t, n, s) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Qu(t)) : (n.next = l.next, l.next = n), t.interleaved = n, Wn(e, s);
}
function Wn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var ls = !1;
function Zu(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Zm(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Fn(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function gs(e, t, n) {
  var s = e.updateQueue;
  if (s === null) return null;
  if (s = s.shared, ke & 2) {
    var l = s.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), s.pending = t, Wn(e, n);
  }
  return l = s.interleaved, l === null ? (t.next = t, Qu(s)) : (t.next = l.next, l.next = t), s.interleaved = t, Wn(e, n);
}
function $i(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Du(e, n);
  }
}
function ap(e, t) {
  var n = e.updateQueue, s = e.alternate;
  if (s !== null && (s = s.updateQueue, n === s)) {
    var l = null, r = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        r === null ? l = r = i : r = r.next = i, n = n.next;
      } while (n !== null);
      r === null ? l = r = t : r = r.next = t;
    } else l = r = t;
    n = { baseState: s.baseState, firstBaseUpdate: l, lastBaseUpdate: r, shared: s.shared, effects: s.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function vo(e, t, n, s) {
  var l = e.updateQueue;
  ls = !1;
  var r = l.firstBaseUpdate, i = l.lastBaseUpdate, a = l.shared.pending;
  if (a !== null) {
    l.shared.pending = null;
    var c = a, u = c.next;
    c.next = null, i === null ? r = u : i.next = u, i = c;
    var d = e.alternate;
    d !== null && (d = d.updateQueue, a = d.lastBaseUpdate, a !== i && (a === null ? d.firstBaseUpdate = u : a.next = u, d.lastBaseUpdate = c));
  }
  if (r !== null) {
    var p = l.baseState;
    i = 0, d = u = c = null, a = r;
    do {
      var h = a.lane, f = a.eventTime;
      if ((s & h) === h) {
        d !== null && (d = d.next = {
          eventTime: f,
          lane: 0,
          tag: a.tag,
          payload: a.payload,
          callback: a.callback,
          next: null
        });
        e: {
          var g = e, S = a;
          switch (h = t, f = n, S.tag) {
            case 1:
              if (g = S.payload, typeof g == "function") {
                p = g.call(f, p, h);
                break e;
              }
              p = g;
              break e;
            case 3:
              g.flags = g.flags & -65537 | 128;
            case 0:
              if (g = S.payload, h = typeof g == "function" ? g.call(f, p, h) : g, h == null) break e;
              p = Je({}, p, h);
              break e;
            case 2:
              ls = !0;
          }
        }
        a.callback !== null && a.lane !== 0 && (e.flags |= 64, h = l.effects, h === null ? l.effects = [a] : h.push(a));
      } else f = { eventTime: f, lane: h, tag: a.tag, payload: a.payload, callback: a.callback, next: null }, d === null ? (u = d = f, c = p) : d = d.next = f, i |= h;
      if (a = a.next, a === null) {
        if (a = l.shared.pending, a === null) break;
        h = a, a = h.next, h.next = null, l.lastBaseUpdate = h, l.shared.pending = null;
      }
    } while (!0);
    if (d === null && (c = p), l.baseState = c, l.firstBaseUpdate = u, l.lastBaseUpdate = d, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        i |= l.lane, l = l.next;
      while (l !== t);
    } else r === null && (l.shared.lanes = 0);
    Ws |= i, e.lanes = i, e.memoizedState = p;
  }
}
function cp(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var s = e[t], l = s.callback;
    if (l !== null) {
      if (s.callback = null, s = n, typeof l != "function") throw Error(F(191, l));
      l.call(s);
    }
  }
}
var Hr = {}, Nn = _s(Hr), Ar = _s(Hr), Rr = _s(Hr);
function Ds(e) {
  if (e === Hr) throw Error(F(174));
  return e;
}
function qu(e, t) {
  switch (Fe(Rr, t), Fe(Ar, e), Fe(Nn, Hr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ec(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ec(t, e);
  }
  He(Nn), Fe(Nn, t);
}
function Pl() {
  He(Nn), He(Ar), He(Rr);
}
function qm(e) {
  Ds(Rr.current);
  var t = Ds(Nn.current), n = Ec(t, e.type);
  t !== n && (Fe(Ar, e), Fe(Nn, n));
}
function Ju(e) {
  Ar.current === e && (He(Nn), He(Ar));
}
var Ze = _s(0);
function wo(e) {
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
var Ha = [];
function ed() {
  for (var e = 0; e < Ha.length; e++) Ha[e]._workInProgressVersionPrimary = null;
  Ha.length = 0;
}
var Ki = Kn.ReactCurrentDispatcher, Wa = Kn.ReactCurrentBatchConfig, Hs = 0, qe = null, dt = null, pt = null, So = !1, gr = !1, Lr = 0, n0 = 0;
function Mt() {
  throw Error(F(321));
}
function td(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Mn(e[n], t[n])) return !1;
  return !0;
}
function nd(e, t, n, s, l, r) {
  if (Hs = r, qe = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ki.current = e === null || e.memoizedState === null ? i0 : o0, e = n(s, l), gr) {
    r = 0;
    do {
      if (gr = !1, Lr = 0, 25 <= r) throw Error(F(301));
      r += 1, pt = dt = null, t.updateQueue = null, Ki.current = a0, e = n(s, l);
    } while (gr);
  }
  if (Ki.current = Mo, t = dt !== null && dt.next !== null, Hs = 0, pt = dt = qe = null, So = !1, t) throw Error(F(300));
  return e;
}
function sd() {
  var e = Lr !== 0;
  return Lr = 0, e;
}
function kn() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return pt === null ? qe.memoizedState = pt = e : pt = pt.next = e, pt;
}
function dn() {
  if (dt === null) {
    var e = qe.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = dt.next;
  var t = pt === null ? qe.memoizedState : pt.next;
  if (t !== null) pt = t, dt = e;
  else {
    if (e === null) throw Error(F(310));
    dt = e, e = { memoizedState: dt.memoizedState, baseState: dt.baseState, baseQueue: dt.baseQueue, queue: dt.queue, next: null }, pt === null ? qe.memoizedState = pt = e : pt = pt.next = e;
  }
  return pt;
}
function Dr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Ua(e) {
  var t = dn(), n = t.queue;
  if (n === null) throw Error(F(311));
  n.lastRenderedReducer = e;
  var s = dt, l = s.baseQueue, r = n.pending;
  if (r !== null) {
    if (l !== null) {
      var i = l.next;
      l.next = r.next, r.next = i;
    }
    s.baseQueue = l = r, n.pending = null;
  }
  if (l !== null) {
    r = l.next, s = s.baseState;
    var a = i = null, c = null, u = r;
    do {
      var d = u.lane;
      if ((Hs & d) === d) c !== null && (c = c.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), s = u.hasEagerState ? u.eagerState : e(s, u.action);
      else {
        var p = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        c === null ? (a = c = p, i = s) : c = c.next = p, qe.lanes |= d, Ws |= d;
      }
      u = u.next;
    } while (u !== null && u !== r);
    c === null ? i = s : c.next = a, Mn(s, t.memoizedState) || (Yt = !0), t.memoizedState = s, t.baseState = i, t.baseQueue = c, n.lastRenderedState = s;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      r = l.lane, qe.lanes |= r, Ws |= r, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function $a(e) {
  var t = dn(), n = t.queue;
  if (n === null) throw Error(F(311));
  n.lastRenderedReducer = e;
  var s = n.dispatch, l = n.pending, r = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var i = l = l.next;
    do
      r = e(r, i.action), i = i.next;
    while (i !== l);
    Mn(r, t.memoizedState) || (Yt = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
  }
  return [r, s];
}
function Jm() {
}
function eg(e, t) {
  var n = qe, s = dn(), l = t(), r = !Mn(s.memoizedState, l);
  if (r && (s.memoizedState = l, Yt = !0), s = s.queue, ld(sg.bind(null, n, s, e), [e]), s.getSnapshot !== t || r || pt !== null && pt.memoizedState.tag & 1) {
    if (n.flags |= 2048, Yr(9, ng.bind(null, n, s, l, t), void 0, null), ft === null) throw Error(F(349));
    Hs & 30 || tg(n, t, l);
  }
  return l;
}
function tg(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = qe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, qe.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function ng(e, t, n, s) {
  t.value = n, t.getSnapshot = s, lg(t) && rg(e);
}
function sg(e, t, n) {
  return n(function() {
    lg(t) && rg(e);
  });
}
function lg(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Mn(e, n);
  } catch {
    return !0;
  }
}
function rg(e) {
  var t = Wn(e, 1);
  t !== null && Sn(t, e, 1, -1);
}
function up(e) {
  var t = kn();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Dr, lastRenderedState: e }, t.queue = e, e = e.dispatch = r0.bind(null, qe, e), [t.memoizedState, e];
}
function Yr(e, t, n, s) {
  return e = { tag: e, create: t, destroy: n, deps: s, next: null }, t = qe.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, qe.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (s = n.next, n.next = e, e.next = s, t.lastEffect = e)), e;
}
function ig() {
  return dn().memoizedState;
}
function Gi(e, t, n, s) {
  var l = kn();
  qe.flags |= e, l.memoizedState = Yr(1 | t, n, void 0, s === void 0 ? null : s);
}
function Uo(e, t, n, s) {
  var l = dn();
  s = s === void 0 ? null : s;
  var r = void 0;
  if (dt !== null) {
    var i = dt.memoizedState;
    if (r = i.destroy, s !== null && td(s, i.deps)) {
      l.memoizedState = Yr(t, n, r, s);
      return;
    }
  }
  qe.flags |= e, l.memoizedState = Yr(1 | t, n, r, s);
}
function dp(e, t) {
  return Gi(8390656, 8, e, t);
}
function ld(e, t) {
  return Uo(2048, 8, e, t);
}
function og(e, t) {
  return Uo(4, 2, e, t);
}
function ag(e, t) {
  return Uo(4, 4, e, t);
}
function cg(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function ug(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Uo(4, 4, cg.bind(null, t, e), n);
}
function rd() {
}
function dg(e, t) {
  var n = dn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && td(t, s[1]) ? s[0] : (n.memoizedState = [e, t], e);
}
function hg(e, t) {
  var n = dn();
  t = t === void 0 ? null : t;
  var s = n.memoizedState;
  return s !== null && t !== null && td(t, s[1]) ? s[0] : (e = e(), n.memoizedState = [e, t], e);
}
function pg(e, t, n) {
  return Hs & 21 ? (Mn(n, t) || (n = ym(), qe.lanes |= n, Ws |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Yt = !0), e.memoizedState = n);
}
function s0(e, t) {
  var n = Ae;
  Ae = n !== 0 && 4 > n ? n : 4, e(!0);
  var s = Wa.transition;
  Wa.transition = {};
  try {
    e(!1), t();
  } finally {
    Ae = n, Wa.transition = s;
  }
}
function fg() {
  return dn().memoizedState;
}
function l0(e, t, n) {
  var s = ys(e);
  if (n = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null }, mg(e)) gg(t, n);
  else if (n = Qm(e, t, n, s), n !== null) {
    var l = It();
    Sn(n, e, s, l), xg(n, t, s);
  }
}
function r0(e, t, n) {
  var s = ys(e), l = { lane: s, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (mg(e)) gg(t, l);
  else {
    var r = e.alternate;
    if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null)) try {
      var i = t.lastRenderedState, a = r(i, n);
      if (l.hasEagerState = !0, l.eagerState = a, Mn(a, i)) {
        var c = t.interleaved;
        c === null ? (l.next = l, Qu(t)) : (l.next = c.next, c.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Qm(e, t, l, s), n !== null && (l = It(), Sn(n, e, s, l), xg(n, t, s));
  }
}
function mg(e) {
  var t = e.alternate;
  return e === qe || t !== null && t === qe;
}
function gg(e, t) {
  gr = So = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function xg(e, t, n) {
  if (n & 4194240) {
    var s = t.lanes;
    s &= e.pendingLanes, n |= s, t.lanes = n, Du(e, n);
  }
}
var Mo = { readContext: un, useCallback: Mt, useContext: Mt, useEffect: Mt, useImperativeHandle: Mt, useInsertionEffect: Mt, useLayoutEffect: Mt, useMemo: Mt, useReducer: Mt, useRef: Mt, useState: Mt, useDebugValue: Mt, useDeferredValue: Mt, useTransition: Mt, useMutableSource: Mt, useSyncExternalStore: Mt, useId: Mt, unstable_isNewReconciler: !1 }, i0 = { readContext: un, useCallback: function(e, t) {
  return kn().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: un, useEffect: dp, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Gi(
    4194308,
    4,
    cg.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Gi(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Gi(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = kn();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var s = kn();
  return t = n !== void 0 ? n(t) : t, s.memoizedState = s.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, s.queue = e, e = e.dispatch = l0.bind(null, qe, e), [s.memoizedState, e];
}, useRef: function(e) {
  var t = kn();
  return e = { current: e }, t.memoizedState = e;
}, useState: up, useDebugValue: rd, useDeferredValue: function(e) {
  return kn().memoizedState = e;
}, useTransition: function() {
  var e = up(!1), t = e[0];
  return e = s0.bind(null, e[1]), kn().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var s = qe, l = kn();
  if (Ke) {
    if (n === void 0) throw Error(F(407));
    n = n();
  } else {
    if (n = t(), ft === null) throw Error(F(349));
    Hs & 30 || tg(s, t, n);
  }
  l.memoizedState = n;
  var r = { value: n, getSnapshot: t };
  return l.queue = r, dp(sg.bind(
    null,
    s,
    r,
    e
  ), [e]), s.flags |= 2048, Yr(9, ng.bind(null, s, r, n, t), void 0, null), n;
}, useId: function() {
  var e = kn(), t = ft.identifierPrefix;
  if (Ke) {
    var n = Xn, s = Bn;
    n = (s & ~(1 << 32 - wn(s) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Lr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = n0++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, o0 = {
  readContext: un,
  useCallback: dg,
  useContext: un,
  useEffect: ld,
  useImperativeHandle: ug,
  useInsertionEffect: og,
  useLayoutEffect: ag,
  useMemo: hg,
  useReducer: Ua,
  useRef: ig,
  useState: function() {
    return Ua(Dr);
  },
  useDebugValue: rd,
  useDeferredValue: function(e) {
    var t = dn();
    return pg(t, dt.memoizedState, e);
  },
  useTransition: function() {
    var e = Ua(Dr)[0], t = dn().memoizedState;
    return [e, t];
  },
  useMutableSource: Jm,
  useSyncExternalStore: eg,
  useId: fg,
  unstable_isNewReconciler: !1
}, a0 = { readContext: un, useCallback: dg, useContext: un, useEffect: ld, useImperativeHandle: ug, useInsertionEffect: og, useLayoutEffect: ag, useMemo: hg, useReducer: $a, useRef: ig, useState: function() {
  return $a(Dr);
}, useDebugValue: rd, useDeferredValue: function(e) {
  var t = dn();
  return dt === null ? t.memoizedState = e : pg(t, dt.memoizedState, e);
}, useTransition: function() {
  var e = $a(Dr)[0], t = dn().memoizedState;
  return [e, t];
}, useMutableSource: Jm, useSyncExternalStore: eg, useId: fg, unstable_isNewReconciler: !1 };
function gn(e, t) {
  if (e && e.defaultProps) {
    t = Je({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Jc(e, t, n, s) {
  t = e.memoizedState, n = n(s, t), n = n == null ? t : Je({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var $o = { isMounted: function(e) {
  return (e = e._reactInternals) ? Gs(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var s = It(), l = ys(e), r = Fn(s, l);
  r.payload = t, n != null && (r.callback = n), t = gs(e, r, l), t !== null && (Sn(t, e, l, s), $i(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var s = It(), l = ys(e), r = Fn(s, l);
  r.tag = 1, r.payload = t, n != null && (r.callback = n), t = gs(e, r, l), t !== null && (Sn(t, e, l, s), $i(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = It(), s = ys(e), l = Fn(n, s);
  l.tag = 2, t != null && (l.callback = t), t = gs(e, l, s), t !== null && (Sn(t, e, s, n), $i(t, e, s));
} };
function hp(e, t, n, s, l, r, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(s, r, i) : t.prototype && t.prototype.isPureReactComponent ? !Nr(n, s) || !Nr(l, r) : !0;
}
function yg(e, t, n) {
  var s = !1, l = Ss, r = t.contextType;
  return typeof r == "object" && r !== null ? r = un(r) : (l = Ft(t) ? Os : kt.current, s = t.contextTypes, r = (s = s != null) ? jl(e, l) : Ss), t = new t(n, r), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = $o, e.stateNode = t, t._reactInternals = e, s && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = r), t;
}
function pp(e, t, n, s) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, s), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, s), t.state !== e && $o.enqueueReplaceState(t, t.state, null);
}
function eu(e, t, n, s) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Zu(e);
  var r = t.contextType;
  typeof r == "object" && r !== null ? l.context = un(r) : (r = Ft(t) ? Os : kt.current, l.context = jl(e, r)), l.state = e.memoizedState, r = t.getDerivedStateFromProps, typeof r == "function" && (Jc(e, t, r, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && $o.enqueueReplaceState(l, l.state, null), vo(e, n, l, s), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function Il(e, t) {
  try {
    var n = "", s = t;
    do
      n += Dy(s), s = s.return;
    while (s);
    var l = n;
  } catch (r) {
    l = `
Error generating stack: ` + r.message + `
` + r.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function Ka(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function tu(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var c0 = typeof WeakMap == "function" ? WeakMap : Map;
function vg(e, t, n) {
  n = Fn(-1, n), n.tag = 3, n.payload = { element: null };
  var s = t.value;
  return n.callback = function() {
    bo || (bo = !0, du = s), tu(e, t);
  }, n;
}
function wg(e, t, n) {
  n = Fn(-1, n), n.tag = 3;
  var s = e.type.getDerivedStateFromError;
  if (typeof s == "function") {
    var l = t.value;
    n.payload = function() {
      return s(l);
    }, n.callback = function() {
      tu(e, t);
    };
  }
  var r = e.stateNode;
  return r !== null && typeof r.componentDidCatch == "function" && (n.callback = function() {
    tu(e, t), typeof s != "function" && (xs === null ? xs = /* @__PURE__ */ new Set([this]) : xs.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function fp(e, t, n) {
  var s = e.pingCache;
  if (s === null) {
    s = e.pingCache = new c0();
    var l = /* @__PURE__ */ new Set();
    s.set(t, l);
  } else l = s.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), s.set(t, l));
  l.has(n) || (l.add(n), e = _0.bind(null, e, t, n), t.then(e, e));
}
function mp(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function gp(e, t, n, s, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Fn(-1, 1), t.tag = 2, gs(n, t, 1))), n.lanes |= 1), e);
}
var u0 = Kn.ReactCurrentOwner, Yt = !1;
function Pt(e, t, n, s) {
  t.child = e === null ? Vm(t, null, n, s) : Nl(t, e.child, n, s);
}
function xp(e, t, n, s, l) {
  n = n.render;
  var r = t.ref;
  return Ml(t, l), s = nd(e, t, n, s, r, l), n = sd(), e !== null && !Yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Un(e, t, l)) : (Ke && n && Wu(t), t.flags |= 1, Pt(e, t, s, l), t.child);
}
function yp(e, t, n, s, l) {
  if (e === null) {
    var r = n.type;
    return typeof r == "function" && !pd(r) && r.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = r, Sg(e, t, r, s, l)) : (e = qi(n.type, null, s, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (r = e.child, !(e.lanes & l)) {
    var i = r.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Nr, n(i, s) && e.ref === t.ref) return Un(e, t, l);
  }
  return t.flags |= 1, e = vs(r, s), e.ref = t.ref, e.return = t, t.child = e;
}
function Sg(e, t, n, s, l) {
  if (e !== null) {
    var r = e.memoizedProps;
    if (Nr(r, s) && e.ref === t.ref) if (Yt = !1, t.pendingProps = s = r, (e.lanes & l) !== 0) e.flags & 131072 && (Yt = !0);
    else return t.lanes = e.lanes, Un(e, t, l);
  }
  return nu(e, t, n, s, l);
}
function Mg(e, t, n) {
  var s = t.pendingProps, l = s.children, r = e !== null ? e.memoizedState : null;
  if (s.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Fe(xl, Ht), Ht |= n;
  else {
    if (!(n & 1073741824)) return e = r !== null ? r.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, Fe(xl, Ht), Ht |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, s = r !== null ? r.baseLanes : n, Fe(xl, Ht), Ht |= s;
  }
  else r !== null ? (s = r.baseLanes | n, t.memoizedState = null) : s = n, Fe(xl, Ht), Ht |= s;
  return Pt(e, t, l, n), t.child;
}
function _g(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function nu(e, t, n, s, l) {
  var r = Ft(n) ? Os : kt.current;
  return r = jl(t, r), Ml(t, l), n = nd(e, t, n, s, r, l), s = sd(), e !== null && !Yt ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, Un(e, t, l)) : (Ke && s && Wu(t), t.flags |= 1, Pt(e, t, n, l), t.child);
}
function vp(e, t, n, s, l) {
  if (Ft(n)) {
    var r = !0;
    fo(t);
  } else r = !1;
  if (Ml(t, l), t.stateNode === null) Vi(e, t), yg(t, n, s), eu(t, n, s, l), s = !0;
  else if (e === null) {
    var i = t.stateNode, a = t.memoizedProps;
    i.props = a;
    var c = i.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = un(u) : (u = Ft(n) ? Os : kt.current, u = jl(t, u));
    var d = n.getDerivedStateFromProps, p = typeof d == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== s || c !== u) && pp(t, i, s, u), ls = !1;
    var h = t.memoizedState;
    i.state = h, vo(t, s, i, l), c = t.memoizedState, a !== s || h !== c || Xt.current || ls ? (typeof d == "function" && (Jc(t, n, d, s), c = t.memoizedState), (a = ls || hp(t, n, a, s, h, c, u)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = s, t.memoizedState = c), i.props = s, i.state = c, i.context = u, s = a) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), s = !1);
  } else {
    i = t.stateNode, Zm(e, t), a = t.memoizedProps, u = t.type === t.elementType ? a : gn(t.type, a), i.props = u, p = t.pendingProps, h = i.context, c = n.contextType, typeof c == "object" && c !== null ? c = un(c) : (c = Ft(n) ? Os : kt.current, c = jl(t, c));
    var f = n.getDerivedStateFromProps;
    (d = typeof f == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (a !== p || h !== c) && pp(t, i, s, c), ls = !1, h = t.memoizedState, i.state = h, vo(t, s, i, l);
    var g = t.memoizedState;
    a !== p || h !== g || Xt.current || ls ? (typeof f == "function" && (Jc(t, n, f, s), g = t.memoizedState), (u = ls || hp(t, n, u, s, h, g, c) || !1) ? (d || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(s, g, c), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(s, g, c)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), t.memoizedProps = s, t.memoizedState = g), i.props = s, i.state = g, i.context = c, s = u) : (typeof i.componentDidUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || a === e.memoizedProps && h === e.memoizedState || (t.flags |= 1024), s = !1);
  }
  return su(e, t, n, s, r, l);
}
function su(e, t, n, s, l, r) {
  _g(e, t);
  var i = (t.flags & 128) !== 0;
  if (!s && !i) return l && lp(t, n, !1), Un(e, t, r);
  s = t.stateNode, u0.current = t;
  var a = i && typeof n.getDerivedStateFromError != "function" ? null : s.render();
  return t.flags |= 1, e !== null && i ? (t.child = Nl(t, e.child, null, r), t.child = Nl(t, null, a, r)) : Pt(e, t, a, r), t.memoizedState = s.state, l && lp(t, n, !0), t.child;
}
function bg(e) {
  var t = e.stateNode;
  t.pendingContext ? sp(e, t.pendingContext, t.pendingContext !== t.context) : t.context && sp(e, t.context, !1), qu(e, t.containerInfo);
}
function wp(e, t, n, s, l) {
  return Cl(), $u(l), t.flags |= 256, Pt(e, t, n, s), t.child;
}
var lu = { dehydrated: null, treeContext: null, retryLane: 0 };
function ru(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function kg(e, t, n) {
  var s = t.pendingProps, l = Ze.current, r = !1, i = (t.flags & 128) !== 0, a;
  if ((a = i) || (a = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), a ? (r = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), Fe(Ze, l & 1), e === null)
    return Zc(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = s.children, e = s.fallback, r ? (s = t.mode, r = t.child, i = { mode: "hidden", children: i }, !(s & 1) && r !== null ? (r.childLanes = 0, r.pendingProps = i) : r = Vo(i, s, 0, null), e = Xs(e, s, n, null), r.return = t, e.return = t, r.sibling = e, t.child = r, t.child.memoizedState = ru(n), t.memoizedState = lu, e) : id(t, i));
  if (l = e.memoizedState, l !== null && (a = l.dehydrated, a !== null)) return d0(e, t, i, s, a, l, n);
  if (r) {
    r = s.fallback, i = t.mode, l = e.child, a = l.sibling;
    var c = { mode: "hidden", children: s.children };
    return !(i & 1) && t.child !== l ? (s = t.child, s.childLanes = 0, s.pendingProps = c, t.deletions = null) : (s = vs(l, c), s.subtreeFlags = l.subtreeFlags & 14680064), a !== null ? r = vs(a, r) : (r = Xs(r, i, n, null), r.flags |= 2), r.return = t, s.return = t, s.sibling = r, t.child = s, s = r, r = t.child, i = e.child.memoizedState, i = i === null ? ru(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, r.memoizedState = i, r.childLanes = e.childLanes & ~n, t.memoizedState = lu, s;
  }
  return r = e.child, e = r.sibling, s = vs(r, { mode: "visible", children: s.children }), !(t.mode & 1) && (s.lanes = n), s.return = t, s.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = s, t.memoizedState = null, s;
}
function id(e, t) {
  return t = Vo({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Pi(e, t, n, s) {
  return s !== null && $u(s), Nl(t, e.child, null, n), e = id(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function d0(e, t, n, s, l, r, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, s = Ka(Error(F(422))), Pi(e, t, i, s)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (r = s.fallback, l = t.mode, s = Vo({ mode: "visible", children: s.children }, l, 0, null), r = Xs(r, l, i, null), r.flags |= 2, s.return = t, r.return = t, s.sibling = r, t.child = s, t.mode & 1 && Nl(t, e.child, null, i), t.child.memoizedState = ru(i), t.memoizedState = lu, r);
  if (!(t.mode & 1)) return Pi(e, t, i, null);
  if (l.data === "$!") {
    if (s = l.nextSibling && l.nextSibling.dataset, s) var a = s.dgst;
    return s = a, r = Error(F(419)), s = Ka(r, s, void 0), Pi(e, t, i, s);
  }
  if (a = (i & e.childLanes) !== 0, Yt || a) {
    if (s = ft, s !== null) {
      switch (i & -i) {
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
      l = l & (s.suspendedLanes | i) ? 0 : l, l !== 0 && l !== r.retryLane && (r.retryLane = l, Wn(e, l), Sn(s, e, l, -1));
    }
    return hd(), s = Ka(Error(F(421))), Pi(e, t, i, s);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = b0.bind(null, e), l._reactRetry = t, null) : (e = r.treeContext, Ut = ms(l.nextSibling), $t = t, Ke = !0, vn = null, e !== null && (nn[sn++] = Bn, nn[sn++] = Xn, nn[sn++] = zs, Bn = e.id, Xn = e.overflow, zs = t), t = id(t, s.children), t.flags |= 4096, t);
}
function Sp(e, t, n) {
  e.lanes |= t;
  var s = e.alternate;
  s !== null && (s.lanes |= t), qc(e.return, t, n);
}
function Ga(e, t, n, s, l) {
  var r = e.memoizedState;
  r === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: s, tail: n, tailMode: l } : (r.isBackwards = t, r.rendering = null, r.renderingStartTime = 0, r.last = s, r.tail = n, r.tailMode = l);
}
function Tg(e, t, n) {
  var s = t.pendingProps, l = s.revealOrder, r = s.tail;
  if (Pt(e, t, s.children, n), s = Ze.current, s & 2) s = s & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Sp(e, n, t);
      else if (e.tag === 19) Sp(e, n, t);
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
  if (Fe(Ze, s), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && wo(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), Ga(t, !1, l, n, r);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && wo(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      Ga(t, !0, n, null, r);
      break;
    case "together":
      Ga(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Vi(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Un(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ws |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(F(153));
  if (t.child !== null) {
    for (e = t.child, n = vs(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = vs(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function h0(e, t, n) {
  switch (t.tag) {
    case 3:
      bg(t), Cl();
      break;
    case 5:
      qm(t);
      break;
    case 1:
      Ft(t.type) && fo(t);
      break;
    case 4:
      qu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var s = t.type._context, l = t.memoizedProps.value;
      Fe(xo, s._currentValue), s._currentValue = l;
      break;
    case 13:
      if (s = t.memoizedState, s !== null)
        return s.dehydrated !== null ? (Fe(Ze, Ze.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? kg(e, t, n) : (Fe(Ze, Ze.current & 1), e = Un(e, t, n), e !== null ? e.sibling : null);
      Fe(Ze, Ze.current & 1);
      break;
    case 19:
      if (s = (n & t.childLanes) !== 0, e.flags & 128) {
        if (s) return Tg(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), Fe(Ze, Ze.current), s) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Mg(e, t, n);
  }
  return Un(e, t, n);
}
var jg, iu, Cg, Ng;
jg = function(e, t) {
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
iu = function() {
};
Cg = function(e, t, n, s) {
  var l = e.memoizedProps;
  if (l !== s) {
    e = t.stateNode, Ds(Nn.current);
    var r = null;
    switch (n) {
      case "input":
        l = Cc(e, l), s = Cc(e, s), r = [];
        break;
      case "select":
        l = Je({}, l, { value: void 0 }), s = Je({}, s, { value: void 0 }), r = [];
        break;
      case "textarea":
        l = Ic(e, l), s = Ic(e, s), r = [];
        break;
      default:
        typeof l.onClick != "function" && typeof s.onClick == "function" && (e.onclick = ho);
    }
    Ac(n, s);
    var i;
    n = null;
    for (u in l) if (!s.hasOwnProperty(u) && l.hasOwnProperty(u) && l[u] != null) if (u === "style") {
      var a = l[u];
      for (i in a) a.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (Mr.hasOwnProperty(u) ? r || (r = []) : (r = r || []).push(u, null));
    for (u in s) {
      var c = s[u];
      if (a = l != null ? l[u] : void 0, s.hasOwnProperty(u) && c !== a && (c != null || a != null)) if (u === "style") if (a) {
        for (i in a) !a.hasOwnProperty(i) || c && c.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in c) c.hasOwnProperty(i) && a[i] !== c[i] && (n || (n = {}), n[i] = c[i]);
      } else n || (r || (r = []), r.push(
        u,
        n
      )), n = c;
      else u === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, a = a ? a.__html : void 0, c != null && a !== c && (r = r || []).push(u, c)) : u === "children" ? typeof c != "string" && typeof c != "number" || (r = r || []).push(u, "" + c) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (Mr.hasOwnProperty(u) ? (c != null && u === "onScroll" && ze("scroll", e), r || a === c || (r = [])) : (r = r || []).push(u, c));
    }
    n && (r = r || []).push("style", n);
    var u = r;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Ng = function(e, t, n, s) {
  n !== s && (t.flags |= 4);
};
function er(e, t) {
  if (!Ke) switch (e.tailMode) {
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
function _t(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, s = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags & 14680064, s |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, s |= l.subtreeFlags, s |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= s, e.childLanes = n, t;
}
function p0(e, t, n) {
  var s = t.pendingProps;
  switch (Uu(t), t.tag) {
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
      return _t(t), null;
    case 1:
      return Ft(t.type) && po(), _t(t), null;
    case 3:
      return s = t.stateNode, Pl(), He(Xt), He(kt), ed(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), (e === null || e.child === null) && (Ci(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, vn !== null && (fu(vn), vn = null))), iu(e, t), _t(t), null;
    case 5:
      Ju(t);
      var l = Ds(Rr.current);
      if (n = t.type, e !== null && t.stateNode != null) Cg(e, t, n, s, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!s) {
          if (t.stateNode === null) throw Error(F(166));
          return _t(t), null;
        }
        if (e = Ds(Nn.current), Ci(t)) {
          s = t.stateNode, n = t.type;
          var r = t.memoizedProps;
          switch (s[Tn] = t, s[Er] = r, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              ze("cancel", s), ze("close", s);
              break;
            case "iframe":
            case "object":
            case "embed":
              ze("load", s);
              break;
            case "video":
            case "audio":
              for (l = 0; l < cr.length; l++) ze(cr[l], s);
              break;
            case "source":
              ze("error", s);
              break;
            case "img":
            case "image":
            case "link":
              ze(
                "error",
                s
              ), ze("load", s);
              break;
            case "details":
              ze("toggle", s);
              break;
            case "input":
              Ph(s, r), ze("invalid", s);
              break;
            case "select":
              s._wrapperState = { wasMultiple: !!r.multiple }, ze("invalid", s);
              break;
            case "textarea":
              Eh(s, r), ze("invalid", s);
          }
          Ac(n, r), l = null;
          for (var i in r) if (r.hasOwnProperty(i)) {
            var a = r[i];
            i === "children" ? typeof a == "string" ? s.textContent !== a && (r.suppressHydrationWarning !== !0 && ji(s.textContent, a, e), l = ["children", a]) : typeof a == "number" && s.textContent !== "" + a && (r.suppressHydrationWarning !== !0 && ji(
              s.textContent,
              a,
              e
            ), l = ["children", "" + a]) : Mr.hasOwnProperty(i) && a != null && i === "onScroll" && ze("scroll", s);
          }
          switch (n) {
            case "input":
              vi(s), Ih(s, r, !0);
              break;
            case "textarea":
              vi(s), Ah(s);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof r.onClick == "function" && (s.onclick = ho);
          }
          s = l, t.updateQueue = s, s !== null && (t.flags |= 4);
        } else {
          i = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = sm(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof s.is == "string" ? e = i.createElement(n, { is: s.is }) : (e = i.createElement(n), n === "select" && (i = e, s.multiple ? i.multiple = !0 : s.size && (i.size = s.size))) : e = i.createElementNS(e, n), e[Tn] = t, e[Er] = s, jg(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = Rc(n, s), n) {
              case "dialog":
                ze("cancel", e), ze("close", e), l = s;
                break;
              case "iframe":
              case "object":
              case "embed":
                ze("load", e), l = s;
                break;
              case "video":
              case "audio":
                for (l = 0; l < cr.length; l++) ze(cr[l], e);
                l = s;
                break;
              case "source":
                ze("error", e), l = s;
                break;
              case "img":
              case "image":
              case "link":
                ze(
                  "error",
                  e
                ), ze("load", e), l = s;
                break;
              case "details":
                ze("toggle", e), l = s;
                break;
              case "input":
                Ph(e, s), l = Cc(e, s), ze("invalid", e);
                break;
              case "option":
                l = s;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!s.multiple }, l = Je({}, s, { value: void 0 }), ze("invalid", e);
                break;
              case "textarea":
                Eh(e, s), l = Ic(e, s), ze("invalid", e);
                break;
              default:
                l = s;
            }
            Ac(n, l), a = l;
            for (r in a) if (a.hasOwnProperty(r)) {
              var c = a[r];
              r === "style" ? im(e, c) : r === "dangerouslySetInnerHTML" ? (c = c ? c.__html : void 0, c != null && lm(e, c)) : r === "children" ? typeof c == "string" ? (n !== "textarea" || c !== "") && _r(e, c) : typeof c == "number" && _r(e, "" + c) : r !== "suppressContentEditableWarning" && r !== "suppressHydrationWarning" && r !== "autoFocus" && (Mr.hasOwnProperty(r) ? c != null && r === "onScroll" && ze("scroll", e) : c != null && Pu(e, r, c, i));
            }
            switch (n) {
              case "input":
                vi(e), Ih(e, s, !1);
                break;
              case "textarea":
                vi(e), Ah(e);
                break;
              case "option":
                s.value != null && e.setAttribute("value", "" + ws(s.value));
                break;
              case "select":
                e.multiple = !!s.multiple, r = s.value, r != null ? yl(e, !!s.multiple, r, !1) : s.defaultValue != null && yl(
                  e,
                  !!s.multiple,
                  s.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = ho);
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
      return _t(t), null;
    case 6:
      if (e && t.stateNode != null) Ng(e, t, e.memoizedProps, s);
      else {
        if (typeof s != "string" && t.stateNode === null) throw Error(F(166));
        if (n = Ds(Rr.current), Ds(Nn.current), Ci(t)) {
          if (s = t.stateNode, n = t.memoizedProps, s[Tn] = t, (r = s.nodeValue !== n) && (e = $t, e !== null)) switch (e.tag) {
            case 3:
              ji(s.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && ji(s.nodeValue, n, (e.mode & 1) !== 0);
          }
          r && (t.flags |= 4);
        } else s = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(s), s[Tn] = t, t.stateNode = s;
      }
      return _t(t), null;
    case 13:
      if (He(Ze), s = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Ke && Ut !== null && t.mode & 1 && !(t.flags & 128)) Km(), Cl(), t.flags |= 98560, r = !1;
        else if (r = Ci(t), s !== null && s.dehydrated !== null) {
          if (e === null) {
            if (!r) throw Error(F(318));
            if (r = t.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(F(317));
            r[Tn] = t;
          } else Cl(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          _t(t), r = !1;
        } else vn !== null && (fu(vn), vn = null), r = !0;
        if (!r) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (s = s !== null, s !== (e !== null && e.memoizedState !== null) && s && (t.child.flags |= 8192, t.mode & 1 && (e === null || Ze.current & 1 ? ht === 0 && (ht = 3) : hd())), t.updateQueue !== null && (t.flags |= 4), _t(t), null);
    case 4:
      return Pl(), iu(e, t), e === null && Pr(t.stateNode.containerInfo), _t(t), null;
    case 10:
      return Vu(t.type._context), _t(t), null;
    case 17:
      return Ft(t.type) && po(), _t(t), null;
    case 19:
      if (He(Ze), r = t.memoizedState, r === null) return _t(t), null;
      if (s = (t.flags & 128) !== 0, i = r.rendering, i === null) if (s) er(r, !1);
      else {
        if (ht !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = wo(e), i !== null) {
            for (t.flags |= 128, er(r, !1), s = i.updateQueue, s !== null && (t.updateQueue = s, t.flags |= 4), t.subtreeFlags = 0, s = n, n = t.child; n !== null; ) r = n, e = s, r.flags &= 14680066, i = r.alternate, i === null ? (r.childLanes = 0, r.lanes = e, r.child = null, r.subtreeFlags = 0, r.memoizedProps = null, r.memoizedState = null, r.updateQueue = null, r.dependencies = null, r.stateNode = null) : (r.childLanes = i.childLanes, r.lanes = i.lanes, r.child = i.child, r.subtreeFlags = 0, r.deletions = null, r.memoizedProps = i.memoizedProps, r.memoizedState = i.memoizedState, r.updateQueue = i.updateQueue, r.type = i.type, e = i.dependencies, r.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return Fe(Ze, Ze.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        r.tail !== null && st() > El && (t.flags |= 128, s = !0, er(r, !1), t.lanes = 4194304);
      }
      else {
        if (!s) if (e = wo(i), e !== null) {
          if (t.flags |= 128, s = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), er(r, !0), r.tail === null && r.tailMode === "hidden" && !i.alternate && !Ke) return _t(t), null;
        } else 2 * st() - r.renderingStartTime > El && n !== 1073741824 && (t.flags |= 128, s = !0, er(r, !1), t.lanes = 4194304);
        r.isBackwards ? (i.sibling = t.child, t.child = i) : (n = r.last, n !== null ? n.sibling = i : t.child = i, r.last = i);
      }
      return r.tail !== null ? (t = r.tail, r.rendering = t, r.tail = t.sibling, r.renderingStartTime = st(), t.sibling = null, n = Ze.current, Fe(Ze, s ? n & 1 | 2 : n & 1), t) : (_t(t), null);
    case 22:
    case 23:
      return dd(), s = t.memoizedState !== null, e !== null && e.memoizedState !== null !== s && (t.flags |= 8192), s && t.mode & 1 ? Ht & 1073741824 && (_t(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : _t(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(F(156, t.tag));
}
function f0(e, t) {
  switch (Uu(t), t.tag) {
    case 1:
      return Ft(t.type) && po(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Pl(), He(Xt), He(kt), ed(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Ju(t), null;
    case 13:
      if (He(Ze), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(F(340));
        Cl();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return He(Ze), null;
    case 4:
      return Pl(), null;
    case 10:
      return Vu(t.type._context), null;
    case 22:
    case 23:
      return dd(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ii = !1, bt = !1, m0 = typeof WeakSet == "function" ? WeakSet : Set, q = null;
function gl(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (s) {
    tt(e, t, s);
  }
  else n.current = null;
}
function ou(e, t, n) {
  try {
    n();
  } catch (s) {
    tt(e, t, s);
  }
}
var Mp = !1;
function g0(e, t) {
  if (Wc = ao, e = Rm(), Hu(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var s = n.getSelection && n.getSelection();
      if (s && s.rangeCount !== 0) {
        n = s.anchorNode;
        var l = s.anchorOffset, r = s.focusNode;
        s = s.focusOffset;
        try {
          n.nodeType, r.nodeType;
        } catch {
          n = null;
          break e;
        }
        var i = 0, a = -1, c = -1, u = 0, d = 0, p = e, h = null;
        t: for (; ; ) {
          for (var f; p !== n || l !== 0 && p.nodeType !== 3 || (a = i + l), p !== r || s !== 0 && p.nodeType !== 3 || (c = i + s), p.nodeType === 3 && (i += p.nodeValue.length), (f = p.firstChild) !== null; )
            h = p, p = f;
          for (; ; ) {
            if (p === e) break t;
            if (h === n && ++u === l && (a = i), h === r && ++d === s && (c = i), (f = p.nextSibling) !== null) break;
            p = h, h = p.parentNode;
          }
          p = f;
        }
        n = a === -1 || c === -1 ? null : { start: a, end: c };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Uc = { focusedElem: e, selectionRange: n }, ao = !1, q = t; q !== null; ) if (t = q, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, q = e;
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
            var S = g.memoizedProps, M = g.memoizedState, y = t.stateNode, m = y.getSnapshotBeforeUpdate(t.elementType === t.type ? S : gn(t.type, S), M);
            y.__reactInternalSnapshotBeforeUpdate = m;
          }
          break;
        case 3:
          var v = t.stateNode.containerInfo;
          v.nodeType === 1 ? v.textContent = "" : v.nodeType === 9 && v.documentElement && v.removeChild(v.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(F(163));
      }
    } catch (w) {
      tt(t, t.return, w);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, q = e;
      break;
    }
    q = t.return;
  }
  return g = Mp, Mp = !1, g;
}
function xr(e, t, n) {
  var s = t.updateQueue;
  if (s = s !== null ? s.lastEffect : null, s !== null) {
    var l = s = s.next;
    do {
      if ((l.tag & e) === e) {
        var r = l.destroy;
        l.destroy = void 0, r !== void 0 && ou(t, n, r);
      }
      l = l.next;
    } while (l !== s);
  }
}
function Ko(e, t) {
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
function au(e) {
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
function Pg(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Pg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Tn], delete t[Er], delete t[Gc], delete t[qv], delete t[Jv])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Ig(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function _p(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Ig(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function cu(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ho));
  else if (s !== 4 && (e = e.child, e !== null)) for (cu(e, t, n), e = e.sibling; e !== null; ) cu(e, t, n), e = e.sibling;
}
function uu(e, t, n) {
  var s = e.tag;
  if (s === 5 || s === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (s !== 4 && (e = e.child, e !== null)) for (uu(e, t, n), e = e.sibling; e !== null; ) uu(e, t, n), e = e.sibling;
}
var gt = null, xn = !1;
function Jn(e, t, n) {
  for (n = n.child; n !== null; ) Eg(e, t, n), n = n.sibling;
}
function Eg(e, t, n) {
  if (Cn && typeof Cn.onCommitFiberUnmount == "function") try {
    Cn.onCommitFiberUnmount(Xo, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      bt || gl(n, t);
    case 6:
      var s = gt, l = xn;
      gt = null, Jn(e, t, n), gt = s, xn = l, gt !== null && (xn ? (e = gt, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : gt.removeChild(n.stateNode));
      break;
    case 18:
      gt !== null && (xn ? (e = gt, n = n.stateNode, e.nodeType === 8 ? Oa(e.parentNode, n) : e.nodeType === 1 && Oa(e, n), jr(e)) : Oa(gt, n.stateNode));
      break;
    case 4:
      s = gt, l = xn, gt = n.stateNode.containerInfo, xn = !0, Jn(e, t, n), gt = s, xn = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!bt && (s = n.updateQueue, s !== null && (s = s.lastEffect, s !== null))) {
        l = s = s.next;
        do {
          var r = l, i = r.destroy;
          r = r.tag, i !== void 0 && (r & 2 || r & 4) && ou(n, t, i), l = l.next;
        } while (l !== s);
      }
      Jn(e, t, n);
      break;
    case 1:
      if (!bt && (gl(n, t), s = n.stateNode, typeof s.componentWillUnmount == "function")) try {
        s.props = n.memoizedProps, s.state = n.memoizedState, s.componentWillUnmount();
      } catch (a) {
        tt(n, t, a);
      }
      Jn(e, t, n);
      break;
    case 21:
      Jn(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (bt = (s = bt) || n.memoizedState !== null, Jn(e, t, n), bt = s) : Jn(e, t, n);
      break;
    default:
      Jn(e, t, n);
  }
}
function bp(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new m0()), t.forEach(function(s) {
      var l = k0.bind(null, e, s);
      n.has(s) || (n.add(s), s.then(l, l));
    });
  }
}
function fn(e, t) {
  var n = t.deletions;
  if (n !== null) for (var s = 0; s < n.length; s++) {
    var l = n[s];
    try {
      var r = e, i = t, a = i;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case 5:
            gt = a.stateNode, xn = !1;
            break e;
          case 3:
            gt = a.stateNode.containerInfo, xn = !0;
            break e;
          case 4:
            gt = a.stateNode.containerInfo, xn = !0;
            break e;
        }
        a = a.return;
      }
      if (gt === null) throw Error(F(160));
      Eg(r, i, l), gt = null, xn = !1;
      var c = l.alternate;
      c !== null && (c.return = null), l.return = null;
    } catch (u) {
      tt(l, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Ag(t, e), t = t.sibling;
}
function Ag(e, t) {
  var n = e.alternate, s = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (fn(t, e), bn(e), s & 4) {
        try {
          xr(3, e, e.return), Ko(3, e);
        } catch (S) {
          tt(e, e.return, S);
        }
        try {
          xr(5, e, e.return);
        } catch (S) {
          tt(e, e.return, S);
        }
      }
      break;
    case 1:
      fn(t, e), bn(e), s & 512 && n !== null && gl(n, n.return);
      break;
    case 5:
      if (fn(t, e), bn(e), s & 512 && n !== null && gl(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          _r(l, "");
        } catch (S) {
          tt(e, e.return, S);
        }
      }
      if (s & 4 && (l = e.stateNode, l != null)) {
        var r = e.memoizedProps, i = n !== null ? n.memoizedProps : r, a = e.type, c = e.updateQueue;
        if (e.updateQueue = null, c !== null) try {
          a === "input" && r.type === "radio" && r.name != null && tm(l, r), Rc(a, i);
          var u = Rc(a, r);
          for (i = 0; i < c.length; i += 2) {
            var d = c[i], p = c[i + 1];
            d === "style" ? im(l, p) : d === "dangerouslySetInnerHTML" ? lm(l, p) : d === "children" ? _r(l, p) : Pu(l, d, p, u);
          }
          switch (a) {
            case "input":
              Nc(l, r);
              break;
            case "textarea":
              nm(l, r);
              break;
            case "select":
              var h = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!r.multiple;
              var f = r.value;
              f != null ? yl(l, !!r.multiple, f, !1) : h !== !!r.multiple && (r.defaultValue != null ? yl(
                l,
                !!r.multiple,
                r.defaultValue,
                !0
              ) : yl(l, !!r.multiple, r.multiple ? [] : "", !1));
          }
          l[Er] = r;
        } catch (S) {
          tt(e, e.return, S);
        }
      }
      break;
    case 6:
      if (fn(t, e), bn(e), s & 4) {
        if (e.stateNode === null) throw Error(F(162));
        l = e.stateNode, r = e.memoizedProps;
        try {
          l.nodeValue = r;
        } catch (S) {
          tt(e, e.return, S);
        }
      }
      break;
    case 3:
      if (fn(t, e), bn(e), s & 4 && n !== null && n.memoizedState.isDehydrated) try {
        jr(t.containerInfo);
      } catch (S) {
        tt(e, e.return, S);
      }
      break;
    case 4:
      fn(t, e), bn(e);
      break;
    case 13:
      fn(t, e), bn(e), l = e.child, l.flags & 8192 && (r = l.memoizedState !== null, l.stateNode.isHidden = r, !r || l.alternate !== null && l.alternate.memoizedState !== null || (cd = st())), s & 4 && bp(e);
      break;
    case 22:
      if (d = n !== null && n.memoizedState !== null, e.mode & 1 ? (bt = (u = bt) || d, fn(t, e), bt = u) : fn(t, e), bn(e), s & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !d && e.mode & 1) for (q = e, d = e.child; d !== null; ) {
          for (p = q = d; q !== null; ) {
            switch (h = q, f = h.child, h.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                xr(4, h, h.return);
                break;
              case 1:
                gl(h, h.return);
                var g = h.stateNode;
                if (typeof g.componentWillUnmount == "function") {
                  s = h, n = h.return;
                  try {
                    t = s, g.props = t.memoizedProps, g.state = t.memoizedState, g.componentWillUnmount();
                  } catch (S) {
                    tt(s, n, S);
                  }
                }
                break;
              case 5:
                gl(h, h.return);
                break;
              case 22:
                if (h.memoizedState !== null) {
                  Tp(p);
                  continue;
                }
            }
            f !== null ? (f.return = h, q = f) : Tp(p);
          }
          d = d.sibling;
        }
        e: for (d = null, p = e; ; ) {
          if (p.tag === 5) {
            if (d === null) {
              d = p;
              try {
                l = p.stateNode, u ? (r = l.style, typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none") : (a = p.stateNode, c = p.memoizedProps.style, i = c != null && c.hasOwnProperty("display") ? c.display : null, a.style.display = rm("display", i));
              } catch (S) {
                tt(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (d === null) try {
              p.stateNode.nodeValue = u ? "" : p.memoizedProps;
            } catch (S) {
              tt(e, e.return, S);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            d === p && (d = null), p = p.return;
          }
          d === p && (d = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      fn(t, e), bn(e), s & 4 && bp(e);
      break;
    case 21:
      break;
    default:
      fn(
        t,
        e
      ), bn(e);
  }
}
function bn(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Ig(n)) {
            var s = n;
            break e;
          }
          n = n.return;
        }
        throw Error(F(160));
      }
      switch (s.tag) {
        case 5:
          var l = s.stateNode;
          s.flags & 32 && (_r(l, ""), s.flags &= -33);
          var r = _p(e);
          uu(e, r, l);
          break;
        case 3:
        case 4:
          var i = s.stateNode.containerInfo, a = _p(e);
          cu(e, a, i);
          break;
        default:
          throw Error(F(161));
      }
    } catch (c) {
      tt(e, e.return, c);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function x0(e, t, n) {
  q = e, Rg(e);
}
function Rg(e, t, n) {
  for (var s = (e.mode & 1) !== 0; q !== null; ) {
    var l = q, r = l.child;
    if (l.tag === 22 && s) {
      var i = l.memoizedState !== null || Ii;
      if (!i) {
        var a = l.alternate, c = a !== null && a.memoizedState !== null || bt;
        a = Ii;
        var u = bt;
        if (Ii = i, (bt = c) && !u) for (q = l; q !== null; ) i = q, c = i.child, i.tag === 22 && i.memoizedState !== null ? jp(l) : c !== null ? (c.return = i, q = c) : jp(l);
        for (; r !== null; ) q = r, Rg(r), r = r.sibling;
        q = l, Ii = a, bt = u;
      }
      kp(e);
    } else l.subtreeFlags & 8772 && r !== null ? (r.return = l, q = r) : kp(e);
  }
}
function kp(e) {
  for (; q !== null; ) {
    var t = q;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            bt || Ko(5, t);
            break;
          case 1:
            var s = t.stateNode;
            if (t.flags & 4 && !bt) if (n === null) s.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : gn(t.type, n.memoizedProps);
              s.componentDidUpdate(l, n.memoizedState, s.__reactInternalSnapshotBeforeUpdate);
            }
            var r = t.updateQueue;
            r !== null && cp(t, r, s);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              cp(t, i, n);
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
                  var p = d.dehydrated;
                  p !== null && jr(p);
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
            throw Error(F(163));
        }
        bt || t.flags & 512 && au(t);
      } catch (h) {
        tt(t, t.return, h);
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
function Tp(e) {
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
function jp(e) {
  for (; q !== null; ) {
    var t = q;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Ko(4, t);
          } catch (c) {
            tt(t, n, c);
          }
          break;
        case 1:
          var s = t.stateNode;
          if (typeof s.componentDidMount == "function") {
            var l = t.return;
            try {
              s.componentDidMount();
            } catch (c) {
              tt(t, l, c);
            }
          }
          var r = t.return;
          try {
            au(t);
          } catch (c) {
            tt(t, r, c);
          }
          break;
        case 5:
          var i = t.return;
          try {
            au(t);
          } catch (c) {
            tt(t, i, c);
          }
      }
    } catch (c) {
      tt(t, t.return, c);
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
var y0 = Math.ceil, _o = Kn.ReactCurrentDispatcher, od = Kn.ReactCurrentOwner, cn = Kn.ReactCurrentBatchConfig, ke = 0, ft = null, at = null, yt = 0, Ht = 0, xl = _s(0), ht = 0, Br = null, Ws = 0, Go = 0, ad = 0, yr = null, Dt = null, cd = 0, El = 1 / 0, Ln = null, bo = !1, du = null, xs = null, Ei = !1, ds = null, ko = 0, vr = 0, hu = null, Qi = -1, Zi = 0;
function It() {
  return ke & 6 ? st() : Qi !== -1 ? Qi : Qi = st();
}
function ys(e) {
  return e.mode & 1 ? ke & 2 && yt !== 0 ? yt & -yt : t0.transition !== null ? (Zi === 0 && (Zi = ym()), Zi) : (e = Ae, e !== 0 || (e = window.event, e = e === void 0 ? 16 : km(e.type)), e) : 1;
}
function Sn(e, t, n, s) {
  if (50 < vr) throw vr = 0, hu = null, Error(F(185));
  Fr(e, n, s), (!(ke & 2) || e !== ft) && (e === ft && (!(ke & 2) && (Go |= n), ht === 4 && os(e, yt)), Ot(e, s), n === 1 && ke === 0 && !(t.mode & 1) && (El = st() + 500, Wo && bs()));
}
function Ot(e, t) {
  var n = e.callbackNode;
  tv(e, t);
  var s = oo(e, e === ft ? yt : 0);
  if (s === 0) n !== null && Dh(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = s & -s, e.callbackPriority !== t) {
    if (n != null && Dh(n), t === 1) e.tag === 0 ? e0(Cp.bind(null, e)) : Wm(Cp.bind(null, e)), Qv(function() {
      !(ke & 6) && bs();
    }), n = null;
    else {
      switch (vm(s)) {
        case 1:
          n = Lu;
          break;
        case 4:
          n = gm;
          break;
        case 16:
          n = io;
          break;
        case 536870912:
          n = xm;
          break;
        default:
          n = io;
      }
      n = zg(n, Lg.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function Lg(e, t) {
  if (Qi = -1, Zi = 0, ke & 6) throw Error(F(327));
  var n = e.callbackNode;
  if (_l() && e.callbackNode !== n) return null;
  var s = oo(e, e === ft ? yt : 0);
  if (s === 0) return null;
  if (s & 30 || s & e.expiredLanes || t) t = To(e, s);
  else {
    t = s;
    var l = ke;
    ke |= 2;
    var r = Yg();
    (ft !== e || yt !== t) && (Ln = null, El = st() + 500, Bs(e, t));
    do
      try {
        S0();
        break;
      } catch (a) {
        Dg(e, a);
      }
    while (!0);
    Gu(), _o.current = r, ke = l, at !== null ? t = 0 : (ft = null, yt = 0, t = ht);
  }
  if (t !== 0) {
    if (t === 2 && (l = Xc(e), l !== 0 && (s = l, t = pu(e, l))), t === 1) throw n = Br, Bs(e, 0), os(e, s), Ot(e, st()), n;
    if (t === 6) os(e, s);
    else {
      if (l = e.current.alternate, !(s & 30) && !v0(l) && (t = To(e, s), t === 2 && (r = Xc(e), r !== 0 && (s = r, t = pu(e, r))), t === 1)) throw n = Br, Bs(e, 0), os(e, s), Ot(e, st()), n;
      switch (e.finishedWork = l, e.finishedLanes = s, t) {
        case 0:
        case 1:
          throw Error(F(345));
        case 2:
          Es(e, Dt, Ln);
          break;
        case 3:
          if (os(e, s), (s & 130023424) === s && (t = cd + 500 - st(), 10 < t)) {
            if (oo(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & s) !== s) {
              It(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Kc(Es.bind(null, e, Dt, Ln), t);
            break;
          }
          Es(e, Dt, Ln);
          break;
        case 4:
          if (os(e, s), (s & 4194240) === s) break;
          for (t = e.eventTimes, l = -1; 0 < s; ) {
            var i = 31 - wn(s);
            r = 1 << i, i = t[i], i > l && (l = i), s &= ~r;
          }
          if (s = l, s = st() - s, s = (120 > s ? 120 : 480 > s ? 480 : 1080 > s ? 1080 : 1920 > s ? 1920 : 3e3 > s ? 3e3 : 4320 > s ? 4320 : 1960 * y0(s / 1960)) - s, 10 < s) {
            e.timeoutHandle = Kc(Es.bind(null, e, Dt, Ln), s);
            break;
          }
          Es(e, Dt, Ln);
          break;
        case 5:
          Es(e, Dt, Ln);
          break;
        default:
          throw Error(F(329));
      }
    }
  }
  return Ot(e, st()), e.callbackNode === n ? Lg.bind(null, e) : null;
}
function pu(e, t) {
  var n = yr;
  return e.current.memoizedState.isDehydrated && (Bs(e, t).flags |= 256), e = To(e, t), e !== 2 && (t = Dt, Dt = n, t !== null && fu(t)), e;
}
function fu(e) {
  Dt === null ? Dt = e : Dt.push.apply(Dt, e);
}
function v0(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var s = 0; s < n.length; s++) {
        var l = n[s], r = l.getSnapshot;
        l = l.value;
        try {
          if (!Mn(r(), l)) return !1;
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
function os(e, t) {
  for (t &= ~ad, t &= ~Go, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - wn(t), s = 1 << n;
    e[n] = -1, t &= ~s;
  }
}
function Cp(e) {
  if (ke & 6) throw Error(F(327));
  _l();
  var t = oo(e, 0);
  if (!(t & 1)) return Ot(e, st()), null;
  var n = To(e, t);
  if (e.tag !== 0 && n === 2) {
    var s = Xc(e);
    s !== 0 && (t = s, n = pu(e, s));
  }
  if (n === 1) throw n = Br, Bs(e, 0), os(e, t), Ot(e, st()), n;
  if (n === 6) throw Error(F(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Es(e, Dt, Ln), Ot(e, st()), null;
}
function ud(e, t) {
  var n = ke;
  ke |= 1;
  try {
    return e(t);
  } finally {
    ke = n, ke === 0 && (El = st() + 500, Wo && bs());
  }
}
function Us(e) {
  ds !== null && ds.tag === 0 && !(ke & 6) && _l();
  var t = ke;
  ke |= 1;
  var n = cn.transition, s = Ae;
  try {
    if (cn.transition = null, Ae = 1, e) return e();
  } finally {
    Ae = s, cn.transition = n, ke = t, !(ke & 6) && bs();
  }
}
function dd() {
  Ht = xl.current, He(xl);
}
function Bs(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Vv(n)), at !== null) for (n = at.return; n !== null; ) {
    var s = n;
    switch (Uu(s), s.tag) {
      case 1:
        s = s.type.childContextTypes, s != null && po();
        break;
      case 3:
        Pl(), He(Xt), He(kt), ed();
        break;
      case 5:
        Ju(s);
        break;
      case 4:
        Pl();
        break;
      case 13:
        He(Ze);
        break;
      case 19:
        He(Ze);
        break;
      case 10:
        Vu(s.type._context);
        break;
      case 22:
      case 23:
        dd();
    }
    n = n.return;
  }
  if (ft = e, at = e = vs(e.current, null), yt = Ht = t, ht = 0, Br = null, ad = Go = Ws = 0, Dt = yr = null, Ls !== null) {
    for (t = 0; t < Ls.length; t++) if (n = Ls[t], s = n.interleaved, s !== null) {
      n.interleaved = null;
      var l = s.next, r = n.pending;
      if (r !== null) {
        var i = r.next;
        r.next = l, s.next = i;
      }
      n.pending = s;
    }
    Ls = null;
  }
  return e;
}
function Dg(e, t) {
  do {
    var n = at;
    try {
      if (Gu(), Ki.current = Mo, So) {
        for (var s = qe.memoizedState; s !== null; ) {
          var l = s.queue;
          l !== null && (l.pending = null), s = s.next;
        }
        So = !1;
      }
      if (Hs = 0, pt = dt = qe = null, gr = !1, Lr = 0, od.current = null, n === null || n.return === null) {
        ht = 1, Br = t, at = null;
        break;
      }
      e: {
        var r = e, i = n.return, a = n, c = t;
        if (t = yt, a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
          var u = c, d = a, p = d.tag;
          if (!(d.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var h = d.alternate;
            h ? (d.updateQueue = h.updateQueue, d.memoizedState = h.memoizedState, d.lanes = h.lanes) : (d.updateQueue = null, d.memoizedState = null);
          }
          var f = mp(i);
          if (f !== null) {
            f.flags &= -257, gp(f, i, a, r, t), f.mode & 1 && fp(r, u, t), t = f, c = u;
            var g = t.updateQueue;
            if (g === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(c), t.updateQueue = S;
            } else g.add(c);
            break e;
          } else {
            if (!(t & 1)) {
              fp(r, u, t), hd();
              break e;
            }
            c = Error(F(426));
          }
        } else if (Ke && a.mode & 1) {
          var M = mp(i);
          if (M !== null) {
            !(M.flags & 65536) && (M.flags |= 256), gp(M, i, a, r, t), $u(Il(c, a));
            break e;
          }
        }
        r = c = Il(c, a), ht !== 4 && (ht = 2), yr === null ? yr = [r] : yr.push(r), r = i;
        do {
          switch (r.tag) {
            case 3:
              r.flags |= 65536, t &= -t, r.lanes |= t;
              var y = vg(r, c, t);
              ap(r, y);
              break e;
            case 1:
              a = c;
              var m = r.type, v = r.stateNode;
              if (!(r.flags & 128) && (typeof m.getDerivedStateFromError == "function" || v !== null && typeof v.componentDidCatch == "function" && (xs === null || !xs.has(v)))) {
                r.flags |= 65536, t &= -t, r.lanes |= t;
                var w = wg(r, a, t);
                ap(r, w);
                break e;
              }
          }
          r = r.return;
        } while (r !== null);
      }
      Xg(n);
    } catch (_) {
      t = _, at === n && n !== null && (at = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Yg() {
  var e = _o.current;
  return _o.current = Mo, e === null ? Mo : e;
}
function hd() {
  (ht === 0 || ht === 3 || ht === 2) && (ht = 4), ft === null || !(Ws & 268435455) && !(Go & 268435455) || os(ft, yt);
}
function To(e, t) {
  var n = ke;
  ke |= 2;
  var s = Yg();
  (ft !== e || yt !== t) && (Ln = null, Bs(e, t));
  do
    try {
      w0();
      break;
    } catch (l) {
      Dg(e, l);
    }
  while (!0);
  if (Gu(), ke = n, _o.current = s, at !== null) throw Error(F(261));
  return ft = null, yt = 0, ht;
}
function w0() {
  for (; at !== null; ) Bg(at);
}
function S0() {
  for (; at !== null && !$y(); ) Bg(at);
}
function Bg(e) {
  var t = Og(e.alternate, e, Ht);
  e.memoizedProps = e.pendingProps, t === null ? Xg(e) : at = t, od.current = null;
}
function Xg(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = f0(n, t), n !== null) {
        n.flags &= 32767, at = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ht = 6, at = null;
        return;
      }
    } else if (n = p0(n, t, Ht), n !== null) {
      at = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      at = t;
      return;
    }
    at = t = e;
  } while (t !== null);
  ht === 0 && (ht = 5);
}
function Es(e, t, n) {
  var s = Ae, l = cn.transition;
  try {
    cn.transition = null, Ae = 1, M0(e, t, n, s);
  } finally {
    cn.transition = l, Ae = s;
  }
  return null;
}
function M0(e, t, n, s) {
  do
    _l();
  while (ds !== null);
  if (ke & 6) throw Error(F(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(F(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var r = n.lanes | n.childLanes;
  if (nv(e, r), e === ft && (at = ft = null, yt = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ei || (Ei = !0, zg(io, function() {
    return _l(), null;
  })), r = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || r) {
    r = cn.transition, cn.transition = null;
    var i = Ae;
    Ae = 1;
    var a = ke;
    ke |= 4, od.current = null, g0(e, n), Ag(n, e), zv(Uc), ao = !!Wc, Uc = Wc = null, e.current = n, x0(n), Ky(), ke = a, Ae = i, cn.transition = r;
  } else e.current = n;
  if (Ei && (Ei = !1, ds = e, ko = l), r = e.pendingLanes, r === 0 && (xs = null), Qy(n.stateNode), Ot(e, st()), t !== null) for (s = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], s(l.value, { componentStack: l.stack, digest: l.digest });
  if (bo) throw bo = !1, e = du, du = null, e;
  return ko & 1 && e.tag !== 0 && _l(), r = e.pendingLanes, r & 1 ? e === hu ? vr++ : (vr = 0, hu = e) : vr = 0, bs(), null;
}
function _l() {
  if (ds !== null) {
    var e = vm(ko), t = cn.transition, n = Ae;
    try {
      if (cn.transition = null, Ae = 16 > e ? 16 : e, ds === null) var s = !1;
      else {
        if (e = ds, ds = null, ko = 0, ke & 6) throw Error(F(331));
        var l = ke;
        for (ke |= 4, q = e.current; q !== null; ) {
          var r = q, i = r.child;
          if (q.flags & 16) {
            var a = r.deletions;
            if (a !== null) {
              for (var c = 0; c < a.length; c++) {
                var u = a[c];
                for (q = u; q !== null; ) {
                  var d = q;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      xr(8, d, r);
                  }
                  var p = d.child;
                  if (p !== null) p.return = d, q = p;
                  else for (; q !== null; ) {
                    d = q;
                    var h = d.sibling, f = d.return;
                    if (Pg(d), d === u) {
                      q = null;
                      break;
                    }
                    if (h !== null) {
                      h.return = f, q = h;
                      break;
                    }
                    q = f;
                  }
                }
              }
              var g = r.alternate;
              if (g !== null) {
                var S = g.child;
                if (S !== null) {
                  g.child = null;
                  do {
                    var M = S.sibling;
                    S.sibling = null, S = M;
                  } while (S !== null);
                }
              }
              q = r;
            }
          }
          if (r.subtreeFlags & 2064 && i !== null) i.return = r, q = i;
          else e: for (; q !== null; ) {
            if (r = q, r.flags & 2048) switch (r.tag) {
              case 0:
              case 11:
              case 15:
                xr(9, r, r.return);
            }
            var y = r.sibling;
            if (y !== null) {
              y.return = r.return, q = y;
              break e;
            }
            q = r.return;
          }
        }
        var m = e.current;
        for (q = m; q !== null; ) {
          i = q;
          var v = i.child;
          if (i.subtreeFlags & 2064 && v !== null) v.return = i, q = v;
          else e: for (i = m; q !== null; ) {
            if (a = q, a.flags & 2048) try {
              switch (a.tag) {
                case 0:
                case 11:
                case 15:
                  Ko(9, a);
              }
            } catch (_) {
              tt(a, a.return, _);
            }
            if (a === i) {
              q = null;
              break e;
            }
            var w = a.sibling;
            if (w !== null) {
              w.return = a.return, q = w;
              break e;
            }
            q = a.return;
          }
        }
        if (ke = l, bs(), Cn && typeof Cn.onPostCommitFiberRoot == "function") try {
          Cn.onPostCommitFiberRoot(Xo, e);
        } catch {
        }
        s = !0;
      }
      return s;
    } finally {
      Ae = n, cn.transition = t;
    }
  }
  return !1;
}
function Np(e, t, n) {
  t = Il(n, t), t = vg(e, t, 1), e = gs(e, t, 1), t = It(), e !== null && (Fr(e, 1, t), Ot(e, t));
}
function tt(e, t, n) {
  if (e.tag === 3) Np(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Np(t, e, n);
      break;
    } else if (t.tag === 1) {
      var s = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && (xs === null || !xs.has(s))) {
        e = Il(n, e), e = wg(t, e, 1), t = gs(t, e, 1), e = It(), t !== null && (Fr(t, 1, e), Ot(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function _0(e, t, n) {
  var s = e.pingCache;
  s !== null && s.delete(t), t = It(), e.pingedLanes |= e.suspendedLanes & n, ft === e && (yt & n) === n && (ht === 4 || ht === 3 && (yt & 130023424) === yt && 500 > st() - cd ? Bs(e, 0) : ad |= n), Ot(e, t);
}
function Fg(e, t) {
  t === 0 && (e.mode & 1 ? (t = Mi, Mi <<= 1, !(Mi & 130023424) && (Mi = 4194304)) : t = 1);
  var n = It();
  e = Wn(e, t), e !== null && (Fr(e, t, n), Ot(e, n));
}
function b0(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Fg(e, n);
}
function k0(e, t) {
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
      throw Error(F(314));
  }
  s !== null && s.delete(t), Fg(e, n);
}
var Og;
Og = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || Xt.current) Yt = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Yt = !1, h0(e, t, n);
    Yt = !!(e.flags & 131072);
  }
  else Yt = !1, Ke && t.flags & 1048576 && Um(t, go, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var s = t.type;
      Vi(e, t), e = t.pendingProps;
      var l = jl(t, kt.current);
      Ml(t, n), l = nd(null, t, s, e, l, n);
      var r = sd();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Ft(s) ? (r = !0, fo(t)) : r = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Zu(t), l.updater = $o, t.stateNode = l, l._reactInternals = t, eu(t, s, e, n), t = su(null, t, s, !0, r, n)) : (t.tag = 0, Ke && r && Wu(t), Pt(null, t, l, n), t = t.child), t;
    case 16:
      s = t.elementType;
      e: {
        switch (Vi(e, t), e = t.pendingProps, l = s._init, s = l(s._payload), t.type = s, l = t.tag = j0(s), e = gn(s, e), l) {
          case 0:
            t = nu(null, t, s, e, n);
            break e;
          case 1:
            t = vp(null, t, s, e, n);
            break e;
          case 11:
            t = xp(null, t, s, e, n);
            break e;
          case 14:
            t = yp(null, t, s, gn(s.type, e), n);
            break e;
        }
        throw Error(F(
          306,
          s,
          ""
        ));
      }
      return t;
    case 0:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : gn(s, l), nu(e, t, s, l, n);
    case 1:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : gn(s, l), vp(e, t, s, l, n);
    case 3:
      e: {
        if (bg(t), e === null) throw Error(F(387));
        s = t.pendingProps, r = t.memoizedState, l = r.element, Zm(e, t), vo(t, s, null, n);
        var i = t.memoizedState;
        if (s = i.element, r.isDehydrated) if (r = { element: s, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
          l = Il(Error(F(423)), t), t = wp(e, t, s, n, l);
          break e;
        } else if (s !== l) {
          l = Il(Error(F(424)), t), t = wp(e, t, s, n, l);
          break e;
        } else for (Ut = ms(t.stateNode.containerInfo.firstChild), $t = t, Ke = !0, vn = null, n = Vm(t, null, s, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Cl(), s === l) {
            t = Un(e, t, n);
            break e;
          }
          Pt(e, t, s, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return qm(t), e === null && Zc(t), s = t.type, l = t.pendingProps, r = e !== null ? e.memoizedProps : null, i = l.children, $c(s, l) ? i = null : r !== null && $c(s, r) && (t.flags |= 32), _g(e, t), Pt(e, t, i, n), t.child;
    case 6:
      return e === null && Zc(t), null;
    case 13:
      return kg(e, t, n);
    case 4:
      return qu(t, t.stateNode.containerInfo), s = t.pendingProps, e === null ? t.child = Nl(t, null, s, n) : Pt(e, t, s, n), t.child;
    case 11:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : gn(s, l), xp(e, t, s, l, n);
    case 7:
      return Pt(e, t, t.pendingProps, n), t.child;
    case 8:
      return Pt(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return Pt(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (s = t.type._context, l = t.pendingProps, r = t.memoizedProps, i = l.value, Fe(xo, s._currentValue), s._currentValue = i, r !== null) if (Mn(r.value, i)) {
          if (r.children === l.children && !Xt.current) {
            t = Un(e, t, n);
            break e;
          }
        } else for (r = t.child, r !== null && (r.return = t); r !== null; ) {
          var a = r.dependencies;
          if (a !== null) {
            i = r.child;
            for (var c = a.firstContext; c !== null; ) {
              if (c.context === s) {
                if (r.tag === 1) {
                  c = Fn(-1, n & -n), c.tag = 2;
                  var u = r.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var d = u.pending;
                    d === null ? c.next = c : (c.next = d.next, d.next = c), u.pending = c;
                  }
                }
                r.lanes |= n, c = r.alternate, c !== null && (c.lanes |= n), qc(
                  r.return,
                  n,
                  t
                ), a.lanes |= n;
                break;
              }
              c = c.next;
            }
          } else if (r.tag === 10) i = r.type === t.type ? null : r.child;
          else if (r.tag === 18) {
            if (i = r.return, i === null) throw Error(F(341));
            i.lanes |= n, a = i.alternate, a !== null && (a.lanes |= n), qc(i, n, t), i = r.sibling;
          } else i = r.child;
          if (i !== null) i.return = r;
          else for (i = r; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (r = i.sibling, r !== null) {
              r.return = i.return, i = r;
              break;
            }
            i = i.return;
          }
          r = i;
        }
        Pt(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, s = t.pendingProps.children, Ml(t, n), l = un(l), s = s(l), t.flags |= 1, Pt(e, t, s, n), t.child;
    case 14:
      return s = t.type, l = gn(s, t.pendingProps), l = gn(s.type, l), yp(e, t, s, l, n);
    case 15:
      return Sg(e, t, t.type, t.pendingProps, n);
    case 17:
      return s = t.type, l = t.pendingProps, l = t.elementType === s ? l : gn(s, l), Vi(e, t), t.tag = 1, Ft(s) ? (e = !0, fo(t)) : e = !1, Ml(t, n), yg(t, s, l), eu(t, s, l, n), su(null, t, s, !0, e, n);
    case 19:
      return Tg(e, t, n);
    case 22:
      return Mg(e, t, n);
  }
  throw Error(F(156, t.tag));
};
function zg(e, t) {
  return mm(e, t);
}
function T0(e, t, n, s) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = s, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function rn(e, t, n, s) {
  return new T0(e, t, n, s);
}
function pd(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function j0(e) {
  if (typeof e == "function") return pd(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Eu) return 11;
    if (e === Au) return 14;
  }
  return 2;
}
function vs(e, t) {
  var n = e.alternate;
  return n === null ? (n = rn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function qi(e, t, n, s, l, r) {
  var i = 2;
  if (s = e, typeof e == "function") pd(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case ol:
      return Xs(n.children, l, r, t);
    case Iu:
      i = 8, l |= 8;
      break;
    case bc:
      return e = rn(12, n, t, l | 2), e.elementType = bc, e.lanes = r, e;
    case kc:
      return e = rn(13, n, t, l), e.elementType = kc, e.lanes = r, e;
    case Tc:
      return e = rn(19, n, t, l), e.elementType = Tc, e.lanes = r, e;
    case qf:
      return Vo(n, l, r, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Qf:
          i = 10;
          break e;
        case Zf:
          i = 9;
          break e;
        case Eu:
          i = 11;
          break e;
        case Au:
          i = 14;
          break e;
        case ss:
          i = 16, s = null;
          break e;
      }
      throw Error(F(130, e == null ? e : typeof e, ""));
  }
  return t = rn(i, n, t, l), t.elementType = e, t.type = s, t.lanes = r, t;
}
function Xs(e, t, n, s) {
  return e = rn(7, e, s, t), e.lanes = n, e;
}
function Vo(e, t, n, s) {
  return e = rn(22, e, s, t), e.elementType = qf, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Va(e, t, n) {
  return e = rn(6, e, null, t), e.lanes = n, e;
}
function Qa(e, t, n) {
  return t = rn(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function C0(e, t, n, s, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Pa(0), this.expirationTimes = Pa(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Pa(0), this.identifierPrefix = s, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function fd(e, t, n, s, l, r, i, a, c) {
  return e = new C0(e, t, n, a, c), t === 1 ? (t = 1, r === !0 && (t |= 8)) : t = 0, r = rn(3, null, null, t), e.current = r, r.stateNode = e, r.memoizedState = { element: s, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Zu(r), e;
}
function N0(e, t, n) {
  var s = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: il, key: s == null ? null : "" + s, children: e, containerInfo: t, implementation: n };
}
function Hg(e) {
  if (!e) return Ss;
  e = e._reactInternals;
  e: {
    if (Gs(e) !== e || e.tag !== 1) throw Error(F(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ft(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(F(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ft(n)) return Hm(e, n, t);
  }
  return t;
}
function Wg(e, t, n, s, l, r, i, a, c) {
  return e = fd(n, s, !0, e, l, r, i, a, c), e.context = Hg(null), n = e.current, s = It(), l = ys(n), r = Fn(s, l), r.callback = t ?? null, gs(n, r, l), e.current.lanes = l, Fr(e, l, s), Ot(e, s), e;
}
function Qo(e, t, n, s) {
  var l = t.current, r = It(), i = ys(l);
  return n = Hg(n), t.context === null ? t.context = n : t.pendingContext = n, t = Fn(r, i), t.payload = { element: e }, s = s === void 0 ? null : s, s !== null && (t.callback = s), e = gs(l, t, i), e !== null && (Sn(e, l, i, r), $i(e, l, i)), i;
}
function jo(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Pp(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function md(e, t) {
  Pp(e, t), (e = e.alternate) && Pp(e, t);
}
function P0() {
  return null;
}
var Ug = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function gd(e) {
  this._internalRoot = e;
}
Zo.prototype.render = gd.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(F(409));
  Qo(e, t, null, null);
};
Zo.prototype.unmount = gd.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Us(function() {
      Qo(null, e, null, null);
    }), t[Hn] = null;
  }
};
function Zo(e) {
  this._internalRoot = e;
}
Zo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Mm();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < is.length && t !== 0 && t < is[n].priority; n++) ;
    is.splice(n, 0, e), n === 0 && bm(e);
  }
};
function xd(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function qo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Ip() {
}
function I0(e, t, n, s, l) {
  if (l) {
    if (typeof s == "function") {
      var r = s;
      s = function() {
        var u = jo(i);
        r.call(u);
      };
    }
    var i = Wg(t, s, e, 0, null, !1, !1, "", Ip);
    return e._reactRootContainer = i, e[Hn] = i.current, Pr(e.nodeType === 8 ? e.parentNode : e), Us(), i;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof s == "function") {
    var a = s;
    s = function() {
      var u = jo(c);
      a.call(u);
    };
  }
  var c = fd(e, 0, !1, null, null, !1, !1, "", Ip);
  return e._reactRootContainer = c, e[Hn] = c.current, Pr(e.nodeType === 8 ? e.parentNode : e), Us(function() {
    Qo(t, c, n, s);
  }), c;
}
function Jo(e, t, n, s, l) {
  var r = n._reactRootContainer;
  if (r) {
    var i = r;
    if (typeof l == "function") {
      var a = l;
      l = function() {
        var c = jo(i);
        a.call(c);
      };
    }
    Qo(t, i, e, l);
  } else i = I0(n, t, e, l, s);
  return jo(i);
}
wm = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ar(t.pendingLanes);
        n !== 0 && (Du(t, n | 1), Ot(t, st()), !(ke & 6) && (El = st() + 500, bs()));
      }
      break;
    case 13:
      Us(function() {
        var s = Wn(e, 1);
        if (s !== null) {
          var l = It();
          Sn(s, e, 1, l);
        }
      }), md(e, 1);
  }
};
Yu = function(e) {
  if (e.tag === 13) {
    var t = Wn(e, 134217728);
    if (t !== null) {
      var n = It();
      Sn(t, e, 134217728, n);
    }
    md(e, 134217728);
  }
};
Sm = function(e) {
  if (e.tag === 13) {
    var t = ys(e), n = Wn(e, t);
    if (n !== null) {
      var s = It();
      Sn(n, e, t, s);
    }
    md(e, t);
  }
};
Mm = function() {
  return Ae;
};
_m = function(e, t) {
  var n = Ae;
  try {
    return Ae = e, t();
  } finally {
    Ae = n;
  }
};
Dc = function(e, t, n) {
  switch (t) {
    case "input":
      if (Nc(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var s = n[t];
          if (s !== e && s.form === e.form) {
            var l = Ho(s);
            if (!l) throw Error(F(90));
            em(s), Nc(s, l);
          }
        }
      }
      break;
    case "textarea":
      nm(e, n);
      break;
    case "select":
      t = n.value, t != null && yl(e, !!n.multiple, t, !1);
  }
};
cm = ud;
um = Us;
var E0 = { usingClientEntryPoint: !1, Events: [zr, dl, Ho, om, am, ud] }, tr = { findFiberByHostInstance: Rs, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, A0 = { bundleType: tr.bundleType, version: tr.version, rendererPackageName: tr.rendererPackageName, rendererConfig: tr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Kn.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = pm(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: tr.findFiberByHostInstance || P0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Ai = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Ai.isDisabled && Ai.supportsFiber) try {
    Xo = Ai.inject(A0), Cn = Ai;
  } catch {
  }
}
Vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = E0;
Vt.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!xd(t)) throw Error(F(200));
  return N0(e, t, null, n);
};
Vt.createRoot = function(e, t) {
  if (!xd(e)) throw Error(F(299));
  var n = !1, s = "", l = Ug;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (s = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = fd(e, 1, !1, null, null, n, !1, s, l), e[Hn] = t.current, Pr(e.nodeType === 8 ? e.parentNode : e), new gd(t);
};
Vt.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(F(188)) : (e = Object.keys(e).join(","), Error(F(268, e)));
  return e = pm(t), e = e === null ? null : e.stateNode, e;
};
Vt.flushSync = function(e) {
  return Us(e);
};
Vt.hydrate = function(e, t, n) {
  if (!qo(t)) throw Error(F(200));
  return Jo(null, e, t, !0, n);
};
Vt.hydrateRoot = function(e, t, n) {
  if (!xd(e)) throw Error(F(405));
  var s = n != null && n.hydratedSources || null, l = !1, r = "", i = Ug;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = Wg(t, null, e, 1, n ?? null, l, !1, r, i), e[Hn] = t.current, Pr(e), s) for (e = 0; e < s.length; e++) n = s[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Zo(t);
};
Vt.render = function(e, t, n) {
  if (!qo(t)) throw Error(F(200));
  return Jo(null, e, t, !1, n);
};
Vt.unmountComponentAtNode = function(e) {
  if (!qo(e)) throw Error(F(40));
  return e._reactRootContainer ? (Us(function() {
    Jo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[Hn] = null;
    });
  }), !0) : !1;
};
Vt.unstable_batchedUpdates = ud;
Vt.unstable_renderSubtreeIntoContainer = function(e, t, n, s) {
  if (!qo(n)) throw Error(F(200));
  if (e == null || e._reactInternals === void 0) throw Error(F(38));
  return Jo(e, t, n, !1, s);
};
Vt.version = "18.3.1-next-f1338f8080-20240426";
function $g() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE($g);
    } catch (e) {
      console.error(e);
    }
}
$g(), $f.exports = Vt;
var wr = $f.exports, Ep = wr;
Mc.createRoot = Ep.createRoot, Mc.hydrateRoot = Ep.hydrateRoot;
const R0 = {}, Ap = (e) => {
  let t;
  const n = /* @__PURE__ */ new Set(), s = (d, p) => {
    const h = typeof d == "function" ? d(t) : d;
    if (!Object.is(h, t)) {
      const f = t;
      t = p ?? (typeof h != "object" || h === null) ? h : Object.assign({}, t, h), n.forEach((g) => g(t, f));
    }
  }, l = () => t, c = { setState: s, getState: l, getInitialState: () => u, subscribe: (d) => (n.add(d), () => n.delete(d)), destroy: () => {
    (R0 ? "production" : void 0) !== "production" && console.warn(
      "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
    ), n.clear();
  } }, u = t = e(s, l, c);
  return c;
}, L0 = (e) => e ? Ap(e) : Ap;
var Kg = { exports: {} }, Gg = {}, Vg = { exports: {} }, Qg = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Al = k;
function D0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Y0 = typeof Object.is == "function" ? Object.is : D0, B0 = Al.useState, X0 = Al.useEffect, F0 = Al.useLayoutEffect, O0 = Al.useDebugValue;
function z0(e, t) {
  var n = t(), s = B0({ inst: { value: n, getSnapshot: t } }), l = s[0].inst, r = s[1];
  return F0(
    function() {
      l.value = n, l.getSnapshot = t, Za(l) && r({ inst: l });
    },
    [e, n, t]
  ), X0(
    function() {
      return Za(l) && r({ inst: l }), e(function() {
        Za(l) && r({ inst: l });
      });
    },
    [e]
  ), O0(n), n;
}
function Za(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Y0(e, n);
  } catch {
    return !0;
  }
}
function H0(e, t) {
  return t();
}
var W0 = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? H0 : z0;
Qg.useSyncExternalStore = Al.useSyncExternalStore !== void 0 ? Al.useSyncExternalStore : W0;
Vg.exports = Qg;
var U0 = Vg.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ea = k, $0 = U0;
function K0(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var G0 = typeof Object.is == "function" ? Object.is : K0, V0 = $0.useSyncExternalStore, Q0 = ea.useRef, Z0 = ea.useEffect, q0 = ea.useMemo, J0 = ea.useDebugValue;
Gg.useSyncExternalStoreWithSelector = function(e, t, n, s, l) {
  var r = Q0(null);
  if (r.current === null) {
    var i = { hasValue: !1, value: null };
    r.current = i;
  } else i = r.current;
  r = q0(
    function() {
      function c(f) {
        if (!u) {
          if (u = !0, d = f, f = s(f), l !== void 0 && i.hasValue) {
            var g = i.value;
            if (l(g, f))
              return p = g;
          }
          return p = f;
        }
        if (g = p, G0(d, f)) return g;
        var S = s(f);
        return l !== void 0 && l(g, S) ? (d = f, g) : (d = f, p = S);
      }
      var u = !1, d, p, h = n === void 0 ? null : n;
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
  var a = V0(e, r[0], r[1]);
  return Z0(
    function() {
      i.hasValue = !0, i.value = a;
    },
    [a]
  ), J0(a), a;
};
Kg.exports = Gg;
var ew = Kg.exports;
const tw = /* @__PURE__ */ Rf(ew), Zg = {}, { useDebugValue: nw } = Ie, { useSyncExternalStoreWithSelector: sw } = tw;
let Rp = !1;
const lw = (e) => e;
function rw(e, t = lw, n) {
  (Zg ? "production" : void 0) !== "production" && n && !Rp && (console.warn(
    "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
  ), Rp = !0);
  const s = sw(
    e.subscribe,
    e.getState,
    e.getServerState || e.getInitialState,
    t,
    n
  );
  return nw(s), s;
}
const Lp = (e) => {
  (Zg ? "production" : void 0) !== "production" && typeof e != "function" && console.warn(
    "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
  );
  const t = typeof e == "function" ? L0(e) : e, n = (s, l) => rw(t, s, l);
  return Object.assign(n, t), n;
}, lt = (e) => e ? Lp(e) : Lp, iw = {
  width: 0,
  height: 0
}, es = {
  x: 0,
  y: 0,
  zoom: 1
}, ow = 0.02, aw = 16, cw = 2e-3, nr = 0.6, N = 12, _e = 8, X = 64, ts = 512 * N, uw = ["nw", "ne", "se", "sw"], qa = -180, Ja = 180, $s = 0.01, Rl = 5, ec = 0, tc = 1, dw = N * 0.9, Dp = dw / 2, qg = 16, hw = 8, pw = 8, mu = 1, gu = 64, nc = 4096, Yp = 4e6, Jg = "pss.traceCanvasOversize", yd = 8, Bp = yd * 3, fw = yd * 4, mw = 1e3, gw = {
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
}, Xp = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
  gif: "image/gif",
  bmp: "image/bmp",
  pcx: "image/x-pcx",
  tga: "image/x-tga"
}, xu = [
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
], xw = {
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
}, yw = (e, t, n) => Math.min(Math.max(e, t), n), Te = lt((e, t) => ({
  ...iw,
  camera: { ...es },
  setSize: (n, s) => e((l) => {
    const { camera: r } = l, a = r.x === es.x && r.y === es.y && r.zoom === es.zoom && n > 0 && s > 0 ? {
      x: -n / (2 * r.zoom),
      y: -s / (2 * r.zoom),
      zoom: r.zoom
    } : r;
    return { width: n, height: s, camera: a };
  }),
  setCamera: (n) => e((s) => ({
    camera: { ...s.camera, ...n }
  })),
  resetCamera: () => e((n) => n.width > 0 && n.height > 0 ? {
    camera: {
      x: -n.width / (2 * es.zoom),
      y: -n.height / (2 * es.zoom),
      zoom: es.zoom
    }
  } : { camera: { ...es } }),
  zoomBy: (n, s) => {
    const { camera: l } = t(), r = yw(l.zoom + n, ow, aw);
    if (!s) {
      e({ camera: { ...l, zoom: r } });
      return;
    }
    const i = r / l.zoom, a = s.x - (s.x - l.x) / i, c = s.y - (s.y - l.y) / i;
    e({ camera: { x: a, y: c, zoom: r } });
  },
  panTo: (n, s) => e((l) => ({
    camera: { ...l.camera, x: n, y: s }
  }))
})), Fp = [Math.max(0, xu.length - 1)], vw = (e) => {
  const t = [], n = /* @__PURE__ */ new Set();
  for (const s of e)
    n.has(s) || (n.add(s), t.push(s));
  return t;
}, sr = (e, t) => {
  const n = vw(e).filter((s) => s >= 0 && s < t);
  return n.length > 0 ? n : [Math.max(0, t - 1)];
}, ie = lt((e, t) => ({
  colors: xu,
  selectedIndices: Fp,
  addColor: (n) => e((s) => {
    const l = [...s.colors, n], r = l.length - 1;
    return {
      colors: l,
      selectedIndices: sr(
        [...s.selectedIndices.filter((i) => i !== r), r],
        l.length
      )
    };
  }),
  removeColor: (n) => e((s) => {
    if (s.colors.length <= 1)
      return s;
    const l = s.colors.filter((i, a) => a !== n), r = sr(
      s.selectedIndices.filter((i) => i !== n).map((i) => i > n ? i - 1 : i),
      l.length
    );
    return { colors: l, selectedIndices: r };
  }),
  setColor: (n, s) => e((l) => ({
    colors: l.colors.map((r, i) => i === n ? s : r)
  })),
  setPalette: (n) => e((s) => ({
    colors: n,
    selectedIndices: sr(s.selectedIndices, n.length)
  })),
  reset: () => e({
    colors: xu,
    selectedIndices: Fp
  }),
  setSelectedIndices: (n) => e((s) => ({
    selectedIndices: sr(n, s.colors.length)
  })),
  setActiveIndex: (n) => e((s) => ({
    selectedIndices: sr(
      [...s.selectedIndices.filter((l) => l !== n), n],
      s.colors.length
    )
  })),
  getActiveIndex: () => {
    const n = t(), s = n.selectedIndices[n.selectedIndices.length - 1];
    return typeof s == "number" ? s : Math.max(0, n.colors.length - 1);
  }
})), Op = (e, t) => Math.floor(e / t), zp = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, Hp = (e, t) => {
  const n = Op(t, X), s = Op(e, X);
  return {
    row: n,
    col: s,
    localX: zp(e, X),
    localY: zp(t, X)
  };
}, Ri = (e, t) => `${e}:${t}`;
class rl {
  constructor() {
    this.blocks = /* @__PURE__ */ new Map();
  }
  getPixel(t, n) {
    const { row: s, col: l, localX: r, localY: i } = Hp(t, n), a = this.blocks.get(Ri(s, l));
    return a ? a[i * X + r] : 0;
  }
  setPixel(t, n, s) {
    const { row: l, col: r, localX: i, localY: a } = Hp(t, n), c = Ri(l, r);
    let u = this.blocks.get(c);
    u || (u = new Uint8Array(X * X), this.blocks.set(c, u)), u[a * X + i] = s;
  }
  setBlock(t, n, s) {
    if (s.length !== X * X)
      throw new Error("Invalid block size");
    this.blocks.set(Ri(t, n), s);
  }
  getBlock(t, n) {
    return this.blocks.get(Ri(t, n));
  }
  clear() {
    this.blocks.clear();
  }
  getBlocks() {
    const t = [];
    for (const [n, s] of this.blocks.entries()) {
      const [l, r] = n.split(":"), i = Number(l), a = Number(r);
      t.push({ row: i, col: a, block: s });
    }
    return t;
  }
}
const Ji = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `layer-${Date.now()}-${Math.random().toString(16).slice(2)}`, Wp = Ji(), te = lt((e, t) => ({
  layers: [{ id: Wp, name: "Layer 1", visible: !0, store: new rl() }],
  activeLayerId: Wp,
  version: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  createLayer: (n) => {
    const s = Ji(), l = n != null && n.trim() ? n.trim() : `Layer ${t().layers.length + 1}`;
    return e((r) => ({
      layers: [...r.layers, { id: s, name: l, visible: !0, store: new rl() }],
      activeLayerId: s,
      version: r.version + 1,
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
      const r = s.layers.filter((c) => c.id !== n), i = s.activeLayerId === n ? ((a = r[Math.min(l, r.length - 1)]) == null ? void 0 : a.id) ?? r[0].id : s.activeLayerId;
      return {
        layers: r,
        activeLayerId: i,
        version: s.version + 1,
        dirtyAll: !0,
        dirtyBlocks: /* @__PURE__ */ new Set()
      };
    });
  },
  renameLayer: (n, s) => e((l) => ({
    layers: l.layers.map(
      (r) => r.id === n ? { ...r, name: s.trim() || r.name } : r
    ),
    version: l.version + 1
  })),
  setLayerVisible: (n, s) => e((l) => ({
    layers: l.layers.map((r) => r.id === n ? { ...r, visible: s } : r),
    version: l.version + 1
  })),
  toggleLayerVisible: (n) => e((s) => ({
    layers: s.layers.map(
      (l) => l.id === n ? { ...l, visible: !l.visible } : l
    ),
    version: s.version + 1
  })),
  moveLayer: (n, s) => e((l) => {
    const r = l.layers.findIndex((u) => u.id === n);
    if (r === -1)
      return l;
    const i = s === "up" ? r + 1 : r - 1;
    if (i < 0 || i >= l.layers.length)
      return l;
    const a = [...l.layers], [c] = a.splice(r, 1);
    return a.splice(i, 0, c), { layers: a, version: l.version + 1 };
  }),
  setActiveLayer: (n) => e((s) => s.activeLayerId === n || !s.layers.some((l) => l.id === n) ? s : { activeLayerId: n, version: s.version + 1 }),
  getPixel: (n, s) => {
    const l = t().layers.find((r) => r.id === t().activeLayerId);
    return l ? l.store.getPixel(n, s) : 0;
  },
  getPixelInLayer: (n, s, l) => {
    const r = t().layers.find((i) => i.id === n);
    return r ? r.store.getPixel(s, l) : 0;
  },
  getPixelComposite: (n, s) => {
    const l = t().layers;
    for (let r = l.length - 1; r >= 0; r -= 1) {
      const i = l[r];
      if (!i.visible)
        continue;
      const a = i.store.getPixel(n, s);
      if (a !== 0)
        return a;
    }
    return 0;
  },
  setPixel: (n, s, l) => {
    t().setPixelInLayer(t().activeLayerId, n, s, l);
  },
  setPixelInLayer: (n, s, l, r) => {
    const i = t().layers.find((u) => u.id === n);
    if (!i)
      return;
    i.store.setPixel(s, l, r);
    const a = Math.floor(l / X), c = Math.floor(s / X);
    e((u) => {
      const d = new Set(u.dirtyBlocks);
      return d.add(`${n}:${a}:${c}`), { version: u.version + 1, dirtyBlocks: d };
    });
  },
  setPixels: (n) => {
    t().setPixelsInLayer(t().activeLayerId, n);
  },
  setPixelsInLayer: (n, s) => {
    const l = t().layers.find((i) => i.id === n);
    if (!l)
      return;
    const r = new Set(t().dirtyBlocks);
    for (const i of s) {
      l.store.setPixel(i.x, i.y, i.paletteIndex);
      const a = Math.floor(i.y / X), c = Math.floor(i.x / X);
      r.add(`${n}:${a}:${c}`);
    }
    e((i) => ({ version: i.version + 1, dirtyBlocks: r }));
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
    var i, a;
    const l = n.map((c) => {
      const u = new rl();
      for (const d of c.blocks)
        u.setBlock(d.row, d.col, d.data);
      return { id: c.id, name: c.name, visible: c.visible, store: u };
    }), r = ((i = l.find((c) => c.id === s)) == null ? void 0 : i.id) ?? ((a = l[0]) == null ? void 0 : a.id) ?? null;
    if (!r) {
      t().clear();
      return;
    }
    e((c) => ({
      layers: l,
      activeLayerId: r,
      version: c.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  loadBlocks: (n) => {
    const s = Ji(), l = new rl();
    for (const r of n)
      l.setBlock(r.row, r.col, r.data);
    e((r) => ({
      layers: [{ id: s, name: "Layer 1", visible: !0, store: l }],
      activeLayerId: s,
      version: r.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  clear: () => {
    const n = Ji();
    e((s) => ({
      layers: [{ id: n, name: "Layer 1", visible: !0, store: new rl() }],
      activeLayerId: n,
      version: s.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll: n, dirtyBlocks: s } = t(), l = Array.from(s).map((r) => {
      const [i, a, c] = r.split(":");
      return i ? { layerId: i, row: Number(a), col: Number(c) } : null;
    }).filter((r) => r !== null);
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), ww = (e, t) => `${e}:${t}`, z = lt(() => {
  const e = /* @__PURE__ */ new Map();
  return {
    pixels: e,
    setPixel: (t, n, s) => {
      e.set(ww(t, n), { x: t, y: n, paletteIndex: s });
    },
    clear: () => {
      e.clear();
    },
    entries: () => e.values()
  };
});
class Sw {
  constructor() {
    this.activeTool = null;
  }
  setTool(t) {
    this.activeTool = t;
  }
  handleEvent(t, n) {
    var s, l, r, i, a, c, u, d, p, h;
    if (this.activeTool)
      switch (t) {
        case "hover":
          (l = (s = this.activeTool).onHover) == null || l.call(s, n);
          break;
        case "begin":
          (i = (r = this.activeTool).onBegin) == null || i.call(r, n);
          break;
        case "move":
          (c = (a = this.activeTool).onMove) == null || c.call(a, n);
          break;
        case "end":
          (d = (u = this.activeTool).onEnd) == null || d.call(u, n);
          break;
        case "cancel":
          (h = (p = this.activeTool).onCancel) == null || h.call(p, n);
          break;
      }
  }
}
const Mw = "Pixel Splash Studio", _w = (e, t) => {
  const n = e ? e.split(/[/\\]/).pop() ?? e : "(unsaved)";
  return `${Mw} - ${n}${t ? "*" : ""}`;
}, Pe = lt((e) => ({
  path: null,
  dirty: !1,
  setPath: (t) => e({ path: t }),
  setDirty: (t) => e({ dirty: t })
})), bw = () => {
  const e = Pe.getState();
  return _w(e.path, e.dirty);
}, Ye = lt((e, t) => ({
  locked: !1,
  undoStack: [],
  redoStack: [],
  pushBatch: (n) => {
    if (n.changes.length === 0)
      return;
    Pe.getState().setDirty(!0);
    const s = {
      layerId: n.layerId ?? te.getState().activeLayerId,
      changes: n.changes
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
    if (!s)
      return;
    Pe.getState().setDirty(!0);
    const l = te.getState(), r = s.layerId ?? l.activeLayerId;
    for (const i of s.changes)
      l.setPixelInLayer(r, i.x, i.y, i.prev);
    e((i) => ({
      undoStack: i.undoStack.slice(0, -1),
      redoStack: [...i.redoStack, s]
    }));
  },
  redo: () => {
    const n = t();
    if (n.locked)
      return;
    const s = n.redoStack[n.redoStack.length - 1];
    if (!s)
      return;
    Pe.getState().setDirty(!0);
    const l = te.getState(), r = s.layerId ?? l.activeLayerId;
    for (const i of s.changes)
      l.setPixelInLayer(r, i.x, i.y, i.next);
    e((i) => ({
      undoStack: [...i.undoStack, s].slice(-8),
      redoStack: i.redoStack.slice(0, -1)
    }));
  },
  setLocked: (n) => e({ locked: n }),
  setStacks: (n, s) => e({
    undoStack: n.slice(-8),
    redoStack: s.slice(-8)
  }),
  clear: () => e({ undoStack: [], redoStack: [] })
})), on = lt((e) => ({
  size: 1,
  shape: "point",
  setSize: (t) => e({ size: t }),
  setShape: (t) => e({ shape: t })
})), Ps = new rl(), Up = (e, t) => `${e}:${t}`, Se = lt((e, t) => ({
  store: Ps,
  version: 0,
  selectedCount: 0,
  dirtyBlocks: /* @__PURE__ */ new Set(),
  dirtyAll: !0,
  setSelection: (n, s, l) => {
    const r = Ps.getPixel(n, s), i = l ? 1 : 0;
    if (r === i)
      return;
    Ps.setPixel(n, s, i);
    const a = Math.floor(s / X), c = Math.floor(n / X);
    e((u) => {
      const d = new Set(u.dirtyBlocks);
      d.add(Up(a, c));
      const p = u.selectedCount + (i === 1 ? 1 : -1);
      return { version: u.version + 1, dirtyBlocks: d, selectedCount: p };
    });
  },
  setSelections: (n) => {
    if (n.length === 0)
      return;
    const s = new Set(t().dirtyBlocks);
    let l = 0;
    for (const r of n) {
      const i = Ps.getPixel(r.x, r.y), a = r.selected ? 1 : 0;
      if (i === a)
        continue;
      Ps.setPixel(r.x, r.y, a);
      const c = Math.floor(r.y / X), u = Math.floor(r.x / X);
      s.add(Up(c, u)), l += a === 1 ? 1 : -1;
    }
    e((r) => ({
      version: r.version + 1,
      dirtyBlocks: s,
      selectedCount: Math.max(0, r.selectedCount + l)
    }));
  },
  isSelected: (n, s) => Ps.getPixel(n, s) === 1,
  clear: () => {
    Ps.clear(), e((n) => ({
      version: n.version + 1,
      dirtyBlocks: /* @__PURE__ */ new Set(),
      dirtyAll: !0,
      selectedCount: 0
    }));
  },
  consumeDirtyBlocks: () => {
    const { dirtyAll: n, dirtyBlocks: s } = t(), l = Array.from(s).map((r) => {
      const [i, a] = r.split(":");
      return { row: Number(i), col: Number(a) };
    });
    return e({ dirtyAll: !1, dirtyBlocks: /* @__PURE__ */ new Set() }), { dirtyAll: n, blocks: l };
  }
})), kw = (e, t) => {
  const n = [], s = -e, l = e;
  for (let r = s; r <= l; r += 1)
    for (let i = s; i <= l; i += 1)
      t === "round" && i * i + r * r > e * e || n.push([i, r]);
  return n;
}, $p = (e, t, n) => {
  const s = Se.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, ex = (e, t, n) => {
  const { size: s, shape: l } = on.getState();
  if (l === "point") {
    $p(e, t, n);
    return;
  }
  const r = kw(s, l);
  for (const [i, a] of r)
    $p(e + i, t + a, n);
}, sc = (e, t) => {
  const n = Math.floor(e.canvasX / N), s = Math.floor(e.canvasY / N);
  ex(n, s, t);
};
class Tw {
  constructor() {
    this.id = "pen", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.changes = /* @__PURE__ */ new Map(), this.lastPoint = null, this.onHover = (t) => {
      if (this.drawing)
        return;
      z.getState().clear();
      const s = ie.getState(), l = t.alt ? 0 : s.getActiveIndex();
      sc(t, l);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = ie.getState();
      this.layerId = te.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), sc(t, this.activeIndex), this.lastPoint = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
      if (this.lastPoint) {
        const s = Math.abs(n.x - this.lastPoint.x), l = Math.abs(n.y - this.lastPoint.y), r = this.lastPoint.x < n.x ? 1 : -1, i = this.lastPoint.y < n.y ? 1 : -1;
        let a = s - l, c = this.lastPoint.x, u = this.lastPoint.y;
        for (; ex(c, u, this.activeIndex), !(c === n.x && u === n.y); ) {
          const d = 2 * a;
          d > -l && (a -= l, c += r), d < s && (a += s, u += i);
        }
      } else
        sc(t, this.activeIndex);
      this.lastPoint = n;
    }, this.onEnd = () => {
      var p;
      if (!this.drawing)
        return;
      const t = performance.now(), n = z.getState(), s = te.getState(), l = this.layerId ?? s.activeLayerId, r = [];
      let i = 0;
      for (const h of n.entries()) {
        i += 1;
        const f = `${h.x}:${h.y}`;
        if (!this.changes.has(f))
          this.changes.set(f, {
            x: h.x,
            y: h.y,
            prev: s.getPixelInLayer(l, h.x, h.y),
            next: h.paletteIndex
          });
        else {
          const g = this.changes.get(f);
          g && (g.next = h.paletteIndex);
        }
        r.push({ x: h.x, y: h.y, paletteIndex: h.paletteIndex });
      }
      s.setPixelsInLayer(l, r);
      const a = performance.now();
      Ye.getState().pushBatch({ layerId: l, changes: Array.from(this.changes.values()) });
      const u = performance.now();
      this.changes.clear(), n.clear(), this.drawing = !1, this.layerId = null, this.lastPoint = null;
      const d = performance.now();
      (p = window.debugApi) == null || p.logPerf(
        [
          "pen:onEnd",
          `entries=${i}`,
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
const lc = (e, t, n) => Math.min(n, Math.max(t, e)), Wt = lt((e) => ({
  radius: 6,
  density: 250,
  falloff: 0.25,
  deterministic: !1,
  seed: 1,
  setRadius: (t) => e({ radius: lc(Math.round(t), 1, 64) }),
  setDensity: (t) => e({ density: lc(Math.round(t), 1, 2e4) }),
  setFalloff: (t) => e({ falloff: lc(t, 0, 1) }),
  setDeterministic: (t) => e({ deterministic: t }),
  setSeed: (t) => e({ seed: Math.max(0, Math.round(t)) })
})), Kp = typeof requestAnimationFrame == "function" ? (e) => requestAnimationFrame(e) : (e) => globalThis.setTimeout(() => e(Date.now()), 16), jw = typeof cancelAnimationFrame == "function" ? (e) => cancelAnimationFrame(e) : (e) => globalThis.clearTimeout(e), Gp = (e, t, n, s) => {
  const l = Se.getState();
  l.selectedCount > 0 && !l.isSelected(t, n) || z.getState().setPixel(t, n, s);
}, Cw = () => {
  const e = ie.getState();
  return e.selectedIndices.filter(
    (n, s, l) => l.indexOf(n) === s && n >= 0 && n < e.colors.length
  );
}, Nw = (e) => {
  let t = e >>> 0;
  return () => {
    t += 1831565813;
    let n = t;
    return n = Math.imul(n ^ n >>> 15, n | 1), n ^= n + Math.imul(n ^ n >>> 7, n | 61), ((n ^ n >>> 14) >>> 0) / 4294967296;
  };
};
class Pw {
  constructor() {
    this.id = "spray", this.drawing = !1, this.layerId = null, this.activeIndex = 0, this.lastCursor = null, this.frameHandle = null, this.lastFrameTime = 0, this.emissionBudget = 0, this.changes = /* @__PURE__ */ new Map(), this.rng = null, this.step = (t) => {
      if (!this.drawing || !this.lastCursor) {
        this.stopLoop();
        return;
      }
      const n = Wt.getState(), s = this.lastCursor, l = this.lastFrameTime === 0 ? 0 : t - this.lastFrameTime;
      this.lastFrameTime = t;
      const r = Math.min(0.1, Math.max(0, l / 1e3));
      this.emissionBudget += n.density * r;
      const a = Math.min(1500, Math.floor(this.emissionBudget));
      if (this.emissionBudget -= a, a > 0) {
        const c = Math.floor(s.canvasX / N), u = Math.floor(s.canvasY / N), d = Math.max(1, n.radius), h = 0.5 + Math.min(1, Math.max(0, n.falloff)) * 2.5, f = this.rng ?? Math.random, g = this.activeIndex === 0 ? [0] : Cw(), S = g.length > 1, M = S ? g : null, y = g[0] ?? this.activeIndex;
        for (let m = 0; m < a; m += 1) {
          const v = f() * Math.PI * 2, w = f(), _ = Math.pow(w, h) * d, b = Math.round(Math.cos(v) * _), T = Math.round(Math.sin(v) * _), j = S ? (M == null ? void 0 : M[Math.floor(f() * ((M == null ? void 0 : M.length) ?? 1))]) ?? 0 : y;
          Gp(s, c + b, u + T, j);
        }
      }
      this.frameHandle = Kp(this.step);
    }, this.onHover = (t) => {
      if (this.drawing)
        return;
      z.getState().clear();
      const s = ie.getState(), l = Math.floor(t.canvasX / N), r = Math.floor(t.canvasY / N), i = t.alt ? 0 : s.getActiveIndex();
      Gp(t, l, r, i);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = ie.getState();
      this.layerId = te.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.drawing = !0, this.changes.clear(), this.lastCursor = t, this.emissionBudget = 0, this.lastFrameTime = typeof requestAnimationFrame == "function" ? performance.now() : Date.now();
      const { deterministic: l, seed: r } = Wt.getState();
      this.rng = l ? Nw(r) : null, this.stopLoop(), this.frameHandle = Kp(this.step);
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
      const t = z.getState(), n = te.getState(), s = this.layerId ?? n.activeLayerId, l = [];
      for (const r of t.entries()) {
        const i = `${r.x}:${r.y}`;
        if (!this.changes.has(i))
          this.changes.set(i, {
            x: r.x,
            y: r.y,
            prev: n.getPixelInLayer(s, r.x, r.y),
            next: r.paletteIndex
          });
        else {
          const a = this.changes.get(i);
          a && (a.next = r.paletteIndex);
        }
        l.push({ x: r.x, y: r.y, paletteIndex: r.paletteIndex });
      }
      n.setPixelsInLayer(s, l), Ye.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    }, this.onCancel = () => {
      this.stopLoop(), z.getState().clear(), this.changes.clear(), this.drawing = !1, this.layerId = null, this.lastCursor = null, this.rng = null, this.lastFrameTime = 0, this.emissionBudget = 0;
    };
  }
  stopLoop() {
    this.frameHandle != null && (jw(this.frameHandle), this.frameHandle = null);
  }
}
const eo = (e) => Math.min(255, Math.max(0, Math.round(e))), vt = (e) => {
  const t = e.trim();
  if (!t.startsWith("#"))
    return null;
  const n = t.slice(1);
  if (n.length === 3) {
    const s = Number.parseInt(n[0] + n[0], 16), l = Number.parseInt(n[1] + n[1], 16), r = Number.parseInt(n[2] + n[2], 16);
    return Number.isNaN(s) || Number.isNaN(l) || Number.isNaN(r) ? null : { r: s, g: l, b: r };
  }
  if (n.length === 6) {
    const s = Number.parseInt(n.slice(0, 2), 16), l = Number.parseInt(n.slice(2, 4), 16), r = Number.parseInt(n.slice(4, 6), 16);
    return Number.isNaN(s) || Number.isNaN(l) || Number.isNaN(r) ? null : { r: s, g: l, b: r };
  }
  return null;
}, vd = (e) => `rgb(${e.r}, ${e.g}, ${e.b})`, jn = (e, t) => `rgba(${e.r}, ${e.g}, ${e.b}, ${t})`, as = (e, t, n) => ({
  r: eo(e.r + (t.r - e.r) * n),
  g: eo(e.g + (t.g - e.g) * n),
  b: eo(e.b + (t.b - e.b) * n)
}), rc = (e) => eo(e).toString(16).padStart(2, "0"), Ll = (e) => `#${rc(e.r)}${rc(e.g)}${rc(e.b)}`, ta = (e) => ({
  r: 255 - e.r,
  g: 255 - e.g,
  b: 255 - e.b
}), Iw = (e) => (0.2126 * e.r + 0.7152 * e.g + 0.0722 * e.b) / 255, Ew = (e) => Iw(e) > 0.5 ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }, Aw = (e, t) => Math.abs(e.r - t.r) + Math.abs(e.g - t.g) + Math.abs(e.b - t.b), na = (e, t, n = 60) => Aw(e, t) < n ? Ew(e) : t, xt = lt((e) => ({
  mode: "color",
  gradientDirection: "top-bottom",
  gradientDither: "bayer2",
  setMode: (t) => e({ mode: t }),
  setGradientDirection: (t) => e({ gradientDirection: t }),
  setGradientDither: (t) => e({ gradientDither: t })
})), sa = () => {
  const e = ie.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length <= 1 ? [] : t;
}, yu = (e, t, n) => Math.min(n, Math.max(t, e)), Rw = (e, t) => {
  let n = (e | 0) * 2376512323 ^ (t | 0) * 3625334849;
  return n ^= n >>> 16, n = Math.imul(n, 2146121005), n ^= n >>> 15, n = Math.imul(n, 2221713035), n ^= n >>> 16, (n >>> 0) / 4294967296;
}, Lw = (e, t) => {
  const n = e * 0.06711056 + t * 583715e-8, l = 52.9829189 * (n - Math.floor(n));
  return l - Math.floor(l);
}, Dw = [
  [0, 2],
  [3, 1]
], Yw = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5]
], Bw = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21]
], Xw = (e, t, n) => e === "bayer2" ? (Dw[n & 1][t & 1] + 0.5) / 4 : e === "bayer4" ? (Yw[n & 3][t & 3] + 0.5) / 16 : e === "bayer8" ? (Bw[n & 7][t & 7] + 0.5) / 64 : e === "random" ? Rw(t, n) : e === "blue-noise" ? Lw(t, n) : 0.5, Vp = (e, t, n, s, l) => {
  if (l <= 1)
    return 0;
  const r = n.maxX - n.minX, i = n.maxY - n.minY, a = r === 0 ? 1 : r, c = i === 0 ? 1 : i, u = e - n.minX, d = t - n.minY;
  let p = 0;
  return s === "top-bottom" ? p = d / c : s === "bottom-top" ? p = 1 - d / c : s === "left-right" ? p = u / a : s === "right-left" && (p = 1 - u / a), p = yu(p, 0, 1), p * (l - 1);
}, Fw = (e) => e === "floyd-steinberg" || e === "atkinson" || e === "jarvis-judice-ninke" || e === "stucki", Ow = (e) => e === "floyd-steinberg" ? [
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
], Wr = (e, t, n, s, l) => {
  const r = n.length, i = /* @__PURE__ */ new Map();
  if (r === 0 || e.length === 0)
    return i;
  if (!Fw(l)) {
    for (const A of e) {
      const L = Vp(A.x, A.y, t, s, r), C = Math.floor(L), R = L - C, U = Xw(l, A.x, A.y), W = R > U ? C + 1 : C, re = yu(W, 0, r - 1);
      i.set(`${A.x}:${A.y}`, n[re] ?? 0);
    }
    return i;
  }
  const a = t.maxX - t.minX + 1, c = t.maxY - t.minY + 1, u = a * c, d = Number.isFinite(u) && u > 0 && u <= 2e6;
  let p = null, h = null, f = null, g = null;
  if (d) {
    p = new Uint8Array(u), h = new Float32Array(u);
    for (const A of e) {
      const L = (A.y - t.minY) * a + (A.x - t.minX);
      L >= 0 && L < p.length && (p[L] = 1);
    }
  } else {
    f = /* @__PURE__ */ new Set(), g = /* @__PURE__ */ new Map();
    for (const A of e)
      f.add(`${A.x}:${A.y}`);
  }
  const S = (A, L) => {
    if (p) {
      const C = (L - t.minY) * a + (A - t.minX);
      return C >= 0 && C < p.length && p[C] === 1;
    }
    return (f == null ? void 0 : f.has(`${A}:${L}`)) ?? !1;
  }, M = (A, L) => {
    if (h) {
      const C = (L - t.minY) * a + (A - t.minX);
      return h[C] ?? 0;
    }
    return (g == null ? void 0 : g.get(`${A}:${L}`)) ?? 0;
  }, y = (A, L, C) => {
    if (!S(A, L))
      return;
    if (h) {
      const U = (L - t.minY) * a + (A - t.minX);
      h[U] += C;
      return;
    }
    const R = `${A}:${L}`;
    g == null || g.set(R, (g.get(R) ?? 0) + C);
  }, m = s === "right-left" ? -1 : 1, v = s === "bottom-top" ? -1 : 1, w = m > 0 ? t.minX : t.maxX, _ = m > 0 ? t.maxX : t.minX, b = v > 0 ? t.minY : t.maxY, T = v > 0 ? t.maxY : t.minY, j = Ow(l);
  for (let A = b; v > 0 ? A <= T : A >= T; A += v)
    for (let L = w; m > 0 ? L <= _ : L >= _; L += m) {
      if (!S(L, A))
        continue;
      const R = Vp(L, A, t, s, r) + M(L, A), U = yu(Math.round(R), 0, r - 1);
      i.set(`${L}:${A}`, n[U] ?? 0);
      const W = R - U;
      if (!Number.isFinite(W) || W === 0)
        continue;
      const re = [];
      let le = 0;
      for (const ne of j) {
        const Y = L + ne.dx * m, E = A + ne.dy * v;
        S(Y, E) && (re.push({ x: Y, y: E, weight: ne.weight }), le += ne.weight);
      }
      if (!(le <= 0))
        for (const ne of re)
          y(ne.x, ne.y, W * ne.weight / le);
    }
  return i;
}, vu = (e, t, n) => {
  const s = Se.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, zw = (e, t, n, s, l) => {
  let r = Math.abs(n - e), i = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = r - i;
  for (; vu(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -i && (u -= i, e += a), d < r && (u += r, t += c);
  }
}, Hw = (e, t, n, s) => {
  const l = [];
  let r = Math.abs(n - e), i = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = r - i;
  for (; l.push({ x: e, y: t }), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -i && (u -= i, e += a), d < r && (u += r, t += c);
  }
  return l;
};
class Ww {
  constructor() {
    this.id = "line", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onHover = (t) => {
      if (this.start)
        return;
      z.getState().clear();
      const s = ie.getState(), l = t.alt ? 0 : s.getActiveIndex(), r = Math.floor(t.canvasX / N), i = Math.floor(t.canvasY / N);
      vu(r, i, l);
    }, this.onBegin = (t) => {
      z.getState().clear();
      const s = ie.getState();
      this.layerId = te.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : sa(), this.start = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
      let l = s;
      if (t.shift) {
        const i = s.x - this.start.x, a = s.y - this.start.y, c = Math.atan2(a, i), u = Math.round(c / (Math.PI / 4)) * (Math.PI / 4), d = Math.max(Math.abs(i), Math.abs(a));
        l = {
          x: this.start.x + Math.round(Math.cos(u) * d),
          y: this.start.y + Math.round(Math.sin(u) * d)
        };
      }
      const r = this.activeRamp.length > 1 ? this.activeRamp : [];
      if (r.length > 1) {
        const i = {
          minX: Math.min(this.start.x, l.x),
          maxX: Math.max(this.start.x, l.x),
          minY: Math.min(this.start.y, l.y),
          maxY: Math.max(this.start.y, l.y)
        }, a = Hw(this.start.x, this.start.y, l.x, l.y), { gradientDirection: c, gradientDither: u } = xt.getState(), d = Wr(
          a,
          i,
          r,
          c,
          u
        );
        for (const p of a)
          vu(p.x, p.y, d.get(`${p.x}:${p.y}`) ?? r[0] ?? 0);
      } else
        zw(this.start.x, this.start.y, l.x, l.y, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = te.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      for (const r of t.entries()) {
        const i = `${r.x}:${r.y}`;
        if (!this.changes.has(i))
          this.changes.set(i, {
            x: r.x,
            y: r.y,
            prev: n.getPixelInLayer(s, r.x, r.y),
            next: r.paletteIndex
          });
        else {
          const a = this.changes.get(i);
          a && (a.next = r.paletteIndex);
        }
        n.setPixelInLayer(s, r.x, r.y, r.paletteIndex);
      }
      Ye.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) }), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Co = lt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), Uw = (e, t, n) => {
  const s = Se.getState(), l = z.getState(), r = Math.min(e.x, t.x), i = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = a; u <= c; u += 1)
    for (let d = r; d <= i; d += 1)
      s.selectedCount > 0 && !s.isSelected(d, u) || l.setPixel(d, u, n);
}, $w = (e, t, n) => {
  const s = Se.getState(), l = z.getState(), r = Math.min(e.x, t.x), i = Math.max(e.x, t.x), a = Math.min(e.y, t.y), c = Math.max(e.y, t.y);
  for (let u = r; u <= i; u += 1)
    (s.selectedCount === 0 || s.isSelected(u, a)) && l.setPixel(u, a, n), (s.selectedCount === 0 || s.isSelected(u, c)) && l.setPixel(u, c, n);
  for (let u = a + 1; u <= c - 1; u += 1)
    (s.selectedCount === 0 || s.isSelected(r, u)) && l.setPixel(r, u, n), (s.selectedCount === 0 || s.isSelected(i, u)) && l.setPixel(i, u, n);
};
class Kw {
  constructor() {
    this.id = "rectangle", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      z.getState().clear();
      const s = ie.getState();
      this.layerId = te.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : sa(), this.start = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      }, l = Co.getState().mode, r = this.activeRamp.length > 1 ? this.activeRamp : [], i = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (r.length > 1) {
        const a = Se.getState(), c = [];
        if (l === "filled")
          for (let h = i.minY; h <= i.maxY; h += 1)
            for (let f = i.minX; f <= i.maxX; f += 1)
              a.selectedCount > 0 && !a.isSelected(f, h) || c.push({ x: f, y: h });
        else {
          for (let h = i.minX; h <= i.maxX; h += 1)
            (a.selectedCount === 0 || a.isSelected(h, i.minY)) && c.push({ x: h, y: i.minY }), (a.selectedCount === 0 || a.isSelected(h, i.maxY)) && c.push({ x: h, y: i.maxY });
          for (let h = i.minY + 1; h <= i.maxY - 1; h += 1)
            (a.selectedCount === 0 || a.isSelected(i.minX, h)) && c.push({ x: i.minX, y: h }), (a.selectedCount === 0 || a.isSelected(i.maxX, h)) && c.push({ x: i.maxX, y: h });
        }
        const { gradientDirection: u, gradientDither: d } = xt.getState(), p = Wr(
          c,
          i,
          r,
          u,
          d
        );
        for (const h of c)
          n.setPixel(h.x, h.y, p.get(`${h.x}:${h.y}`) ?? r[0] ?? 0);
        return;
      }
      if (l === "filled") {
        Uw(this.start, s, this.activeIndex);
        return;
      }
      $w(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = te.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const r of t.entries()) {
        const i = `${r.x}:${r.y}`;
        if (!this.changes.has(i))
          this.changes.set(i, {
            x: r.x,
            y: r.y,
            prev: n.getPixelInLayer(s, r.x, r.y),
            next: r.paletteIndex
          });
        else {
          const a = this.changes.get(i);
          a && (a.next = r.paletteIndex);
        }
        l.push({ x: r.x, y: r.y, paletteIndex: r.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Ye.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const No = lt((e) => ({
  mode: "filled",
  setMode: (t) => e({ mode: t })
})), cs = (e, t, n) => {
  const s = Se.getState();
  s.selectedCount > 0 && !s.isSelected(e, t) || z.getState().setPixel(e, t, n);
}, Po = (e, t, n, s, l) => {
  let r = Math.abs(n - e), i = Math.abs(s - t);
  const a = e < n ? 1 : -1, c = t < s ? 1 : -1;
  let u = r - i;
  for (; cs(e, t, l), !(e === n && t === s); ) {
    const d = 2 * u;
    d > -i && (u -= i, e += a), d < r && (u += r, t += c);
  }
}, Gw = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), r = Math.min(e.y, t.y), i = Math.max(e.y, t.y), a = (l - s) / 2, c = (i - r) / 2, u = (s + l) / 2, d = (r + i) / 2;
  if (a === 0 && c === 0) {
    cs(s, r, n);
    return;
  }
  if (a === 0) {
    Po(s, r, s, i, n);
    return;
  }
  if (c === 0) {
    Po(s, r, l, r, n);
    return;
  }
  const p = a * a, h = c * c;
  for (let f = r; f <= i; f += 1) {
    const g = f - d;
    for (let S = s; S <= l; S += 1) {
      const M = S - u;
      M * M / p + g * g / h <= 1 && cs(S, f, n);
    }
  }
}, Vw = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), r = Math.min(e.y, t.y), i = Math.max(e.y, t.y), a = (l - s) / 2, c = (i - r) / 2, u = (s + l) / 2, d = (r + i) / 2;
  if (a === 0 && c === 0) {
    cs(s, r, n);
    return;
  }
  if (a === 0) {
    Po(s, r, s, i, n);
    return;
  }
  if (c === 0) {
    Po(s, r, l, r, n);
    return;
  }
  const p = a * a, h = c * c;
  for (let f = s; f <= l; f += 1) {
    const g = f - u, S = 1 - g * g / p;
    if (S < 0)
      continue;
    const M = Math.sqrt(S) * c, y = Math.round(d - M), m = Math.round(d + M);
    cs(f, y, n), cs(f, m, n);
  }
  for (let f = r; f <= i; f += 1) {
    const g = f - d, S = 1 - g * g / h;
    if (S < 0)
      continue;
    const M = Math.sqrt(S) * a, y = Math.round(u - M), m = Math.round(u + M);
    cs(y, f, n), cs(m, f, n);
  }
};
class Qw {
  constructor() {
    this.id = "oval", this.start = null, this.layerId = null, this.activeIndex = 0, this.activeRamp = [], this.changes = /* @__PURE__ */ new Map(), this.onBegin = (t) => {
      z.getState().clear();
      const s = ie.getState();
      this.layerId = te.getState().activeLayerId, this.activeIndex = t.alt ? 0 : s.getActiveIndex(), this.activeRamp = t.alt ? [] : sa(), this.start = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      };
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = {
        x: Math.floor(t.canvasX / N),
        y: Math.floor(t.canvasY / N)
      }, l = No.getState().mode, r = this.activeRamp.length > 1 ? this.activeRamp : [], i = {
        minX: Math.min(this.start.x, s.x),
        maxX: Math.max(this.start.x, s.x),
        minY: Math.min(this.start.y, s.y),
        maxY: Math.max(this.start.y, s.y)
      };
      if (r.length > 1) {
        const a = Se.getState(), c = [], u = (i.maxX - i.minX) / 2, d = (i.maxY - i.minY) / 2, p = (i.minX + i.maxX) / 2, h = (i.minY + i.maxY) / 2, f = (m, v) => a.selectedCount === 0 || a.isSelected(m, v), g = (m, v) => {
          f(m, v) && c.push({ x: m, y: v });
        };
        if (u === 0 && d === 0)
          g(i.minX, i.minY);
        else if (u === 0)
          for (let m = i.minY; m <= i.maxY; m += 1)
            g(i.minX, m);
        else if (d === 0)
          for (let m = i.minX; m <= i.maxX; m += 1)
            g(m, i.minY);
        else if (l === "filled") {
          const m = u * u, v = d * d;
          for (let w = i.minY; w <= i.maxY; w += 1) {
            const _ = w - h;
            for (let b = i.minX; b <= i.maxX; b += 1) {
              const T = b - p;
              T * T / m + _ * _ / v <= 1 && g(b, w);
            }
          }
        } else {
          const m = u * u, v = d * d;
          for (let w = i.minX; w <= i.maxX; w += 1) {
            const _ = w - p, b = 1 - _ * _ / m;
            if (b < 0)
              continue;
            const T = Math.sqrt(b) * d;
            g(w, Math.round(h - T)), g(w, Math.round(h + T));
          }
          for (let w = i.minY; w <= i.maxY; w += 1) {
            const _ = w - h, b = 1 - _ * _ / v;
            if (b < 0)
              continue;
            const T = Math.sqrt(b) * u;
            g(Math.round(p - T), w), g(Math.round(p + T), w);
          }
        }
        const { gradientDirection: S, gradientDither: M } = xt.getState(), y = Wr(
          c,
          i,
          r,
          S,
          M
        );
        for (const m of c)
          n.setPixel(m.x, m.y, y.get(`${m.x}:${m.y}`) ?? r[0] ?? 0);
        return;
      }
      if (l === "filled") {
        Gw(this.start, s, this.activeIndex);
        return;
      }
      Vw(this.start, s, this.activeIndex);
    }, this.onEnd = () => {
      if (!this.start)
        return;
      const t = z.getState(), n = te.getState(), s = this.layerId ?? n.activeLayerId;
      this.changes.clear();
      const l = [];
      for (const r of t.entries()) {
        const i = `${r.x}:${r.y}`;
        if (!this.changes.has(i))
          this.changes.set(i, {
            x: r.x,
            y: r.y,
            prev: n.getPixelInLayer(s, r.x, r.y),
            next: r.paletteIndex
          });
        else {
          const a = this.changes.get(i);
          a && (a.next = r.paletteIndex);
        }
        l.push({ x: r.x, y: r.y, paletteIndex: r.paletteIndex });
      }
      l.length > 0 && (n.setPixelsInLayer(s, l), Ye.getState().pushBatch({ layerId: s, changes: Array.from(this.changes.values()) })), t.clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.layerId = null, this.changes.clear(), this.activeRamp = [];
    };
  }
}
const Dl = lt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), Zw = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), qw = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / _e),
  y: Math.floor(e.y / _e)
} : e, ic = (e, t) => qw(Zw(e), t), Qp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), r = Math.min(e.y, t.y), i = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * _e,
    maxX: (l + 1) * _e - 1,
    minY: r * _e,
    maxY: (i + 1) * _e - 1
  } : { minX: s, maxX: l, minY: r, maxY: i };
}, Jw = (e, t) => {
  const n = z.getState(), s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), r = Math.min(e.y, t.y), i = Math.max(e.y, t.y);
  for (let a = r; a <= i; a += 1)
    for (let c = s; c <= l; c += 1)
      n.setPixel(c, a, 1);
};
class e1 {
  constructor() {
    this.id = "selection-rect", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      z.getState().clear(), this.isRemoving = t.ctrl, this.snap = Dl.getState().snap, this.start = ic(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = ic(t, this.snap);
      this.last = s;
      const l = Qp(this.start, s, this.snap);
      Jw({ x: l.minX, y: l.minY }, { x: l.maxX, y: l.maxY });
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = Se.getState(), l = t ? ic(t, this.snap) : this.last ?? this.start, r = Qp(this.start, l, this.snap), i = !this.isRemoving, a = [];
      for (let c = r.minY; c <= r.maxY; c += 1)
        for (let u = r.minX; u <= r.maxX; u += 1)
          a.push({ x: u, y: c, selected: i });
      s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const t1 = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), n1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / _e),
  y: Math.floor(e.y / _e)
} : e, oc = (e, t) => n1(t1(e), t), Zp = (e, t, n) => {
  const s = Math.min(e.x, t.x), l = Math.max(e.x, t.x), r = Math.min(e.y, t.y), i = Math.max(e.y, t.y);
  return n === "tile" ? {
    minX: s * _e,
    maxX: (l + 1) * _e - 1,
    minY: r * _e,
    maxY: (i + 1) * _e - 1
  } : { minX: s, maxX: l, minY: r, maxY: i };
}, qp = (e, t) => {
  const { minX: n, maxX: s, minY: l, maxY: r } = e, i = (s - n) / 2, a = (r - l) / 2, c = (n + s) / 2, u = (l + r) / 2;
  if (i === 0 && a === 0) {
    t(n, l);
    return;
  }
  if (i === 0) {
    for (let h = l; h <= r; h += 1)
      t(n, h);
    return;
  }
  if (a === 0) {
    for (let h = n; h <= s; h += 1)
      t(h, l);
    return;
  }
  const d = i * i, p = a * a;
  for (let h = l; h <= r; h += 1) {
    const f = h - u;
    for (let g = n; g <= s; g += 1) {
      const S = g - c;
      S * S / d + f * f / p <= 1 && t(g, h);
    }
  }
};
class s1 {
  constructor() {
    this.id = "selection-oval", this.start = null, this.last = null, this.isRemoving = !1, this.snap = "pixel", this.onBegin = (t) => {
      z.getState().clear(), this.isRemoving = t.ctrl, this.snap = Dl.getState().snap, this.start = oc(t, this.snap), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      const n = z.getState();
      n.clear();
      const s = oc(t, this.snap);
      this.last = s;
      const l = Zp(this.start, s, this.snap);
      qp(l, (r, i) => n.setPixel(r, i, 1));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = Se.getState(), l = t ? oc(t, this.snap) : this.last ?? this.start, r = Zp(this.start, l, this.snap), i = !this.isRemoving, a = [];
      qp(r, (c, u) => {
        a.push({ x: c, y: u, selected: i });
      }), s.setSelections(a), n.clear(), this.start = null, this.last = null, this.isRemoving = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null, this.isRemoving = !1;
    };
  }
}
const l1 = (e, t) => {
  const n = [], s = -e, l = e;
  for (let r = s; r <= l; r += 1)
    for (let i = s; i <= l; i += 1)
      t === "round" && i * i + r * r > e * e || n.push([i, r]);
  return n;
}, r1 = (e) => {
  var y, m, v, w;
  if (e.length === 0)
    return [];
  let t = ((y = e[0]) == null ? void 0 : y.x) ?? 0, n = ((m = e[0]) == null ? void 0 : m.x) ?? 0, s = ((v = e[0]) == null ? void 0 : v.y) ?? 0, l = ((w = e[0]) == null ? void 0 : w.y) ?? 0;
  for (const _ of e)
    t = Math.min(t, _.x), n = Math.max(n, _.x), s = Math.min(s, _.y), l = Math.max(l, _.y);
  const r = 1, i = t - r, a = s - r, c = n - t + 1 + r * 2, u = l - s + 1 + r * 2;
  if (c <= 0 || u <= 0)
    return [];
  const d = c * u;
  if (d > 5e6)
    return e;
  const p = new Uint8Array(d);
  for (const _ of e) {
    const b = _.x - i, T = _.y - a;
    b < 0 || b >= c || T < 0 || T >= u || (p[b + T * c] = 1);
  }
  const h = new Uint8Array(d), f = [];
  let g = 0;
  const S = (_, b) => {
    const T = _ + b * c;
    h[T] === 1 || p[T] === 1 || (h[T] = 1, f.push(T));
  };
  for (let _ = 0; _ < c; _ += 1)
    S(_, 0), S(_, u - 1);
  for (let _ = 1; _ < u - 1; _ += 1)
    S(0, _), S(c - 1, _);
  for (; g < f.length; ) {
    const _ = f[g] ?? 0;
    g += 1;
    const b = _ % c, T = Math.floor(_ / c);
    b > 0 && S(b - 1, T), b + 1 < c && S(b + 1, T), T > 0 && S(b, T - 1), T + 1 < u && S(b, T + 1);
  }
  const M = [];
  for (let _ = 1; _ < u - 1; _ += 1)
    for (let b = 1; b < c - 1; b += 1) {
      const T = b + _ * c, j = p[T] === 1;
      (!(h[T] === 1) || j) && M.push({ x: i + b, y: a + _ });
    }
  return M;
}, ac = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), to = (e, t) => {
  const { size: n, shape: s } = on.getState(), l = z.getState();
  if (s === "point") {
    l.setPixel(e, t, 1);
    return;
  }
  const r = l1(n, s);
  for (const [i, a] of r)
    l.setPixel(e + i, t + a, 1);
}, Jp = (e, t) => {
  const n = Math.abs(t.x - e.x), s = Math.abs(t.y - e.y), l = e.x < t.x ? 1 : -1, r = e.y < t.y ? 1 : -1;
  let i = n - s, a = e.x, c = e.y;
  for (; to(a, c), !(a === t.x && c === t.y); ) {
    const u = 2 * i;
    u > -s && (i -= s, a += l), u < n && (i += n, c += r);
  }
}, i1 = (e) => {
  var l, r;
  if (e.length < 4)
    return [];
  let t = ((l = e[0]) == null ? void 0 : l.y) ?? 0, n = ((r = e[0]) == null ? void 0 : r.y) ?? 0;
  for (const i of e)
    t = Math.min(t, i.y), n = Math.max(n, i.y);
  const s = [];
  for (let i = t; i <= n; i += 1) {
    const a = i + 0.5, c = [];
    for (let u = 0; u < e.length - 1; u += 1) {
      const d = e[u], p = e[u + 1];
      if (!d || !p || d.y === p.y)
        continue;
      const h = Math.min(d.y, p.y), f = Math.max(d.y, p.y);
      if (a < h || a >= f)
        continue;
      const g = (a - d.y) / (p.y - d.y), S = d.x + g * (p.x - d.x);
      c.push(S);
    }
    c.sort((u, d) => u - d);
    for (let u = 0; u < c.length - 1; u += 2) {
      const d = c[u] ?? 0, p = c[u + 1] ?? 0, h = Math.ceil(Math.min(d, p) - 0.5), f = Math.floor(Math.max(d, p) - 0.5);
      for (let g = h; g <= f; g += 1)
        s.push({ x: g, y: i });
    }
  }
  return s;
};
class o1 {
  constructor() {
    this.id = "selection-lasso", this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [], this.onHover = (t) => {
      if (this.drawing)
        return;
      z.getState().clear();
      const s = ac(t);
      to(s.x, s.y);
    }, this.onBegin = (t) => {
      z.getState().clear(), this.drawing = !0, this.isRemoving = t.ctrl;
      const s = ac(t);
      to(s.x, s.y), this.startPoint = s, this.lastPoint = s, this.path = [s];
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      const n = ac(t);
      this.lastPoint && n.x === this.lastPoint.x && n.y === this.lastPoint.y || (this.lastPoint ? Jp(this.lastPoint, n) : to(n.x, n.y), this.lastPoint = n, this.path.push(n));
    }, this.onEnd = () => {
      if (!this.drawing)
        return;
      const t = z.getState(), n = Se.getState(), s = !this.isRemoving, { shape: l } = on.getState(), r = this.startPoint, i = this.lastPoint;
      r && i && (r.x !== i.x || r.y !== i.y) && Jp(i, r);
      const a = [];
      for (const f of this.path) {
        const g = a[a.length - 1];
        (!g || g.x !== f.x || g.y !== f.y) && a.push(f);
      }
      const c = r ?? a[0] ?? null, u = a[a.length - 1] ?? null;
      c && u && (c.x !== u.x || c.y !== u.y) && a.push(c);
      const d = Array.from(t.entries()).map((f) => ({ x: f.x, y: f.y })), p = l === "point" ? i1(a) : r1(d), h = (p.length > 0 ? p : d).map((f) => ({ x: f.x, y: f.y, selected: s }));
      n.setSelections(h), t.clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [];
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.isRemoving = !1, this.startPoint = null, this.lastPoint = null, this.path = [];
    };
  }
}
const Li = (e, t) => {
  const n = e % t;
  return n < 0 ? n + t : n;
}, ef = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
});
class a1 {
  constructor() {
    this.id = "texture-roll", this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0, this.onBegin = (t) => {
      z.getState().clear();
      const n = Se.getState();
      if (n.selectedCount === 0)
        return;
      const s = ef(t);
      if (!n.isSelected(s.x, s.y))
        return;
      const l = this.collectSelection();
      if (!l)
        return;
      this.startCursor = s, this.layerId = te.getState().activeLayerId, this.dragging = !0, this.didMove = !1, this.selectedPixels = l.pixels, this.rowGroups = l.rows, this.colGroups = l.cols, this.originalPixels = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
      const r = te.getState();
      for (const i of this.selectedPixels)
        this.originalPixels.set(
          `${i.x}:${i.y}`,
          r.getPixelInLayer(this.layerId, i.x, i.y)
        );
    }, this.onMove = (t) => {
      if (!this.dragging || !this.startCursor)
        return;
      const n = ef(t), s = this.getStepSize(), l = Math.round((n.x - this.startCursor.x) / s) * s, r = Math.round((n.y - this.startCursor.y) / s) * s;
      this.applyOffset(l, r);
    }, this.onEnd = () => {
      if (!this.dragging || !this.layerId)
        return;
      const t = te.getState(), n = [];
      if (this.didMove)
        for (const s of this.selectedPixels) {
          const l = `${s.x}:${s.y}`, r = this.originalPixels.get(l) ?? 0, i = t.getPixelInLayer(this.layerId, s.x, s.y);
          r !== i && n.push({ x: s.x, y: s.y, prev: r, next: i });
        }
      n.length > 0 && Ye.getState().pushBatch({ layerId: this.layerId, changes: n }), z.getState().clear(), this.startCursor = null, this.layerId = null, this.dragging = !1, this.didMove = !1, this.selectedPixels = [], this.originalPixels = /* @__PURE__ */ new Map(), this.rowGroups = /* @__PURE__ */ new Map(), this.colGroups = /* @__PURE__ */ new Map(), this.lastDx = 0, this.lastDy = 0;
    }, this.onCancel = () => {
      if (z.getState().clear(), this.dragging && this.layerId) {
        const t = te.getState(), n = [];
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
    return Dl.getState().snap === "tile" ? _e : 1;
  }
  collectSelection() {
    const t = Se.getState();
    if (t.selectedCount === 0)
      return null;
    const n = t.store.getBlocks(), s = [], l = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
    for (const { row: i, col: a, block: c } of n) {
      const u = a * X, d = i * X;
      for (let p = 0; p < X; p += 1)
        for (let h = 0; h < X; h += 1) {
          if (c[p * X + h] !== 1)
            continue;
          const f = u + h, g = d + p;
          s.push({ x: f, y: g });
          const S = l.get(g) ?? [];
          S.push(f), l.set(g, S);
          const M = r.get(f) ?? [];
          M.push(g), r.set(f, M);
        }
    }
    if (s.length === 0)
      return null;
    for (const i of l.values())
      i.sort((a, c) => a - c);
    for (const i of r.values())
      i.sort((a, c) => a - c);
    return {
      pixels: s,
      rows: l,
      cols: r
    };
  }
  rotateRow(t, n, s) {
    const l = this.rowGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const r = l.length, i = Li(s, r);
    if (i === 0)
      return;
    const a = l.map((c) => t.get(`${c}:${n}`) ?? 0);
    for (let c = 0; c < r; c += 1) {
      const u = Li(c - i, r), d = l[c];
      t.set(`${d}:${n}`, a[u] ?? 0);
    }
  }
  rotateCol(t, n, s) {
    const l = this.colGroups.get(n);
    if (!l || l.length <= 1)
      return;
    const r = l.length, i = Li(s, r);
    if (i === 0)
      return;
    const a = l.map((c) => t.get(`${n}:${c}`) ?? 0);
    for (let c = 0; c < r; c += 1) {
      const u = Li(c - i, r), d = l[c];
      t.set(`${n}:${d}`, a[u] ?? 0);
    }
  }
  applyOffset(t, n) {
    if (!this.layerId || t === this.lastDx && n === this.lastDy)
      return;
    this.lastDx = t, this.lastDy = n, this.didMove = this.didMove || t !== 0 || n !== 0;
    const s = this.getStepSize(), l = Math.trunc(t / s), r = Math.trunc(n / s), i = new Map(this.originalPixels);
    if (l !== 0)
      for (const c of this.rowGroups.keys())
        this.rotateRow(i, c, l);
    if (r !== 0)
      for (const c of this.colGroups.keys())
        this.rotateCol(i, c, r);
    const a = [];
    for (const c of this.selectedPixels)
      a.push({
        x: c.x,
        y: c.y,
        paletteIndex: i.get(`${c.x}:${c.y}`) ?? 0
      });
    te.getState().setPixelsInLayer(this.layerId, a);
  }
}
const ks = () => {
  const e = Se.getState();
  if (e.selectedCount === 0)
    return null;
  const t = te.getState(), n = [];
  let s = Number.POSITIVE_INFINITY, l = Number.NEGATIVE_INFINITY, r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY;
  const a = e.store.getBlocks();
  for (const { row: c, col: u, block: d } of a) {
    const p = u * X, h = c * X;
    for (let f = 0; f < X; f += 1)
      for (let g = 0; g < X; g += 1) {
        if (d[f * X + g] !== 1)
          continue;
        const S = p + g, M = h + f, y = t.getPixel(S, M);
        n.push({ x: S, y: M, paletteIndex: y }), s = Math.min(s, S), l = Math.max(l, S), r = Math.min(r, M), i = Math.max(i, M);
      }
  }
  return n.length === 0 ? null : { pixels: n, minX: s, maxX: l, minY: r, maxY: i };
}, c1 = 2e3, u1 = 6, Ys = [], Fs = /* @__PURE__ */ new Map();
let Io = !1, tf = 1, bl = null;
const no = () => typeof performance < "u" ? performance.now() : Date.now(), tx = (e) => typeof window < "u" && typeof window.requestAnimationFrame == "function" ? window.requestAnimationFrame(e) : setTimeout(() => e(no()), 0), d1 = (e) => {
  if (typeof window < "u" && typeof window.cancelAnimationFrame == "function") {
    window.cancelAnimationFrame(e);
    return;
  }
  clearTimeout(e);
}, nx = (e, t) => {
  const n = Math.floor(t / X), s = Math.floor(e / X);
  return `${n}:${s}`;
}, h1 = (e, t) => {
  t <= 0 || Fs.set(e, (Fs.get(e) ?? 0) + t);
}, p1 = (e) => {
  const t = (Fs.get(e) ?? 0) - 1;
  t > 0 ? Fs.set(e, t) : Fs.delete(e);
}, sx = () => {
  const e = Ys[0];
  if (!e) {
    Ye.getState().setLocked(!1), Io = !1, bl = null;
    return;
  }
  const t = no(), n = e.chunkSize, s = e.timeBudgetMs, l = te.getState();
  for (; Ys[0] === e && e.index < e.changes.length; ) {
    const r = [];
    for (; e.index < e.changes.length && r.length < n; ) {
      const i = e.changes[e.index];
      if (e.index += 1, r.push({ x: i.x, y: i.y, paletteIndex: i.next }), p1(nx(i.x, i.y)), no() - t > s)
        break;
    }
    if (r.length > 0 && l.setPixelsInLayer(e.layerId, r), e.index >= e.changes.length) {
      Ye.getState().pushBatch({ layerId: e.layerId, changes: e.changes }), Ys.shift(), Ys.length === 0 && Ye.getState().setLocked(!1);
      break;
    }
    if (no() - t > s)
      break;
  }
  bl = tx(sx);
}, f1 = () => {
  Io || (Io = !0, bl = tx(sx));
}, Ur = (e, t = {}) => {
  var c;
  if (e.length === 0)
    return;
  Ys.length === 0 && Ye.getState().setLocked(!0);
  const n = String(tf);
  tf += 1;
  const s = (c = t.label) != null && c.trim() ? t.label.trim() : "Operation", l = te.getState().activeLayerId, r = typeof t.chunkSize == "number" && t.chunkSize > 0 ? Math.floor(t.chunkSize) : c1, i = typeof t.timeBudgetMs == "number" && t.timeBudgetMs > 0 ? t.timeBudgetMs : u1;
  Ys.push({ id: n, label: s, layerId: l, changes: e, index: 0, chunkSize: r, timeBudgetMs: i });
  const a = /* @__PURE__ */ new Map();
  for (const u of e) {
    const d = nx(u.x, u.y);
    a.set(d, (a.get(d) ?? 0) + 1);
  }
  for (const [u, d] of a.entries())
    h1(u, d);
  f1();
}, m1 = () => Array.from(Fs.keys()).map((e) => {
  const [t, n] = e.split(":");
  return { row: Number(t), col: Number(n) };
}), wd = () => {
  Ys.length = 0, Fs.clear(), Ye.getState().setLocked(!1), Io = !1, bl !== null && (d1(bl), bl = null);
}, lx = () => {
  const e = Te.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / N),
    minY: Math.floor(e.camera.y / N),
    maxX: Math.floor((e.camera.x + t) / N),
    maxY: Math.floor((e.camera.y + n) / N)
  };
}, g1 = (e) => {
  const t = Se.getState();
  if (t.selectedCount === 0)
    return;
  const n = te.getState(), s = [], l = t.store.getBlocks();
  for (const { row: r, col: i, block: a } of l) {
    const c = i * X, u = r * X;
    for (let d = 0; d < X; d += 1)
      for (let p = 0; p < X; p += 1) {
        if (a[d * X + p] !== 1)
          continue;
        const h = c + p, f = u + d, g = n.getPixel(h, f);
        g !== e && s.push({ x: h, y: f, prev: g, next: e });
      }
  }
  s.length !== 0 && Ur(s, { label: "Fill Selection" });
}, x1 = (e, t, n, s) => {
  if (n === s)
    return;
  const l = Se.getState(), r = te.getState(), i = l.selectedCount > 0, a = i ? null : lx();
  if (!i && !a || i && !l.isSelected(e, t))
    return;
  const c = /* @__PURE__ */ new Set(), u = [e], d = [t], p = [];
  for (let h = 0; h < u.length; h += 1) {
    const f = u[h], g = d[h];
    if (a && (f < a.minX || f > a.maxX || g < a.minY || g > a.maxY))
      continue;
    const S = `${f}:${g}`;
    if (!c.has(S) && (c.add(S), !(i && !l.isSelected(f, g)) && r.getPixel(f, g) === n)) {
      if (a && (f === a.minX || f === a.maxX || g === a.minY || g === a.maxY))
        return;
      p.push({ x: f, y: g, prev: n, next: s }), u.push(f + 1, f - 1, f, f), d.push(g, g, g + 1, g - 1);
    }
  }
  p.length !== 0 && Ur(p, { label: "Fill Region" });
}, y1 = () => {
  const e = ie.getState(), t = e.selectedIndices.filter((n, s, l) => l.indexOf(n) === s).filter((n) => n >= 0 && n < e.colors.length);
  return t.length > 0 ? t : [e.getActiveIndex()];
}, v1 = (e, t, n) => {
  const s = Se.getState(), l = te.getState(), r = s.selectedCount > 0, i = r ? null : lx();
  if (!r && !i || r && !s.isSelected(e, t))
    return null;
  const a = /* @__PURE__ */ new Set(), c = [e], u = [t], d = [];
  let p = Number.POSITIVE_INFINITY, h = Number.NEGATIVE_INFINITY, f = Number.POSITIVE_INFINITY, g = Number.NEGATIVE_INFINITY;
  for (let S = 0; S < c.length; S += 1) {
    const M = c[S], y = u[S];
    if (i && (M < i.minX || M > i.maxX || y < i.minY || y > i.maxY))
      continue;
    const m = `${M}:${y}`;
    if (a.has(m) || (a.add(m), r && !s.isSelected(M, y)))
      continue;
    const v = l.getPixel(M, y);
    if (v === n) {
      if (i && (M === i.minX || M === i.maxX || y === i.minY || y === i.maxY))
        return null;
      d.push({ x: M, y, prev: v }), p = Math.min(p, M), h = Math.max(h, M), f = Math.min(f, y), g = Math.max(g, y), c.push(M + 1, M - 1, M, M), u.push(y, y, y + 1, y - 1);
    }
  }
  return d.length === 0 ? null : { pixels: d, bounds: { minX: p, maxX: h, minY: f, maxY: g } };
}, nf = (e, t, n, s, l) => {
  const r = [];
  if (n.length === 0)
    return;
  const i = e.map((c) => ({ x: c.x, y: c.y })), a = Wr(i, t, n, s, l);
  for (const c of e) {
    const u = a.get(`${c.x}:${c.y}`) ?? n[0] ?? 0;
    u !== c.prev && r.push({ x: c.x, y: c.y, prev: c.prev, next: u });
  }
  r.length !== 0 && Ur(r, { label: "Gradient Fill" });
};
class w1 {
  constructor() {
    this.id = "fill-bucket", this.onBegin = (t) => {
      z.getState().clear();
      const n = ie.getState(), s = xt.getState().mode, l = y1(), r = l.length > 1, i = l[0] ?? n.getActiveIndex(), { gradientDirection: a, gradientDither: c } = xt.getState(), u = Math.floor(t.canvasX / N), d = Math.floor(t.canvasY / N);
      if (s === "selection") {
        if (!r) {
          g1(i);
          return;
        }
        const h = ks();
        if (!h)
          return;
        const f = h.pixels.map((g) => ({
          x: g.x,
          y: g.y,
          prev: g.paletteIndex
        }));
        nf(
          f,
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
      if (r) {
        const h = te.getState().getPixel(u, d), f = v1(u, d, h);
        if (!f)
          return;
        nf(f.pixels, f.bounds, l, a, c);
        return;
      }
      const p = te.getState().getPixel(u, d);
      x1(u, d, p, i);
    };
  }
}
const Tt = lt((e) => ({
  pixels: [],
  origin: null,
  width: 0,
  height: 0,
  setBuffer: ({ pixels: t, origin: n, width: s, height: l }) => e({
    pixels: t,
    origin: n,
    width: s,
    height: l
  }),
  clear: () => e({
    pixels: [],
    origin: null,
    width: 0,
    height: 0
  })
})), $e = lt((e) => ({
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
})), S1 = () => {
  const e = Tt.getState();
  if (e.pixels.length === 0)
    return !1;
  const t = ie.getState(), n = t.colors, s = [...n], l = /* @__PURE__ */ new Map();
  for (const i of e.pixels) {
    const a = i.paletteIndex;
    if (a === 0 || l.has(a))
      continue;
    const c = n[a] ?? n[0] ?? "#000000";
    l.set(a, s.length), s.push(c);
  }
  if (l.size === 0)
    return !1;
  const r = e.pixels.map((i) => {
    const a = l.get(i.paletteIndex);
    return a ? { ...i, paletteIndex: a } : i;
  });
  return t.setPalette(s), Tt.getState().setBuffer({
    pixels: r,
    origin: e.origin ?? { x: 0, y: 0 },
    width: e.width,
    height: e.height
  }), !0;
}, cc = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), M1 = (e, t) => t === "tile" ? {
  x: Math.floor(e.x / _e) * _e,
  y: Math.floor(e.y / _e) * _e
} : e, _1 = (e, t, n, s, l, r, i) => {
  const a = s === 90 || s === 270 ? n : t, c = s === 90 || s === 270 ? t : n, u = [];
  for (const d of e) {
    let p = d.x, h = d.y;
    r && (p = t - 1 - p), i && (h = n - 1 - h);
    let f = p, g = h;
    if (s === 90 ? (f = n - 1 - h, g = p) : s === 180 ? (f = t - 1 - p, g = n - 1 - h) : s === 270 && (f = h, g = t - 1 - p), l === 1) {
      u.push({ x: f, y: g, paletteIndex: d.paletteIndex });
      continue;
    }
    const S = f * l, M = g * l;
    for (let y = 0; y < l; y += 1)
      for (let m = 0; m < l; m += 1)
        u.push({ x: S + m, y: M + y, paletteIndex: d.paletteIndex });
  }
  return { pixels: u, width: a * l, height: c * l };
};
class b1 {
  constructor() {
    this.id = "stamp", this.cache = null, this.changes = /* @__PURE__ */ new Map(), this.layerId = null, this.dragging = !1, this.lastPoint = null, this.lastAnchor = null, this.getAnchor = (t, n, s) => {
      const l = $e.getState(), r = M1(t, l.snap);
      return {
        x: r.x - Math.floor(n / 2),
        y: r.y - Math.floor(s / 2)
      };
    }, this.renderPreview = (t) => {
      const n = z.getState();
      n.clear();
      const s = this.getTransformed();
      if (!s)
        return;
      const l = this.getAnchor(
        cc(t),
        s.width,
        s.height
      ), r = Se.getState(), i = r.selectedCount > 0;
      for (const a of s.pixels) {
        if ($e.getState().mode === "soft" && a.paletteIndex === 0)
          continue;
        const c = l.x + a.x, u = l.y + a.y;
        i && !r.isSelected(c, u) || n.setPixel(c, u, a.paletteIndex);
      }
    }, this.applyStampAt = (t, n) => {
      const s = this.getTransformed();
      if (!s)
        return;
      const l = $e.getState(), r = Se.getState(), i = r.selectedCount > 0, a = te.getState(), c = this.layerId ?? a.activeLayerId, u = [];
      for (const d of s.pixels) {
        if (l.mode === "soft" && d.paletteIndex === 0)
          continue;
        const p = t + d.x, h = n + d.y;
        if (i && !r.isSelected(p, h))
          continue;
        const f = a.getPixelInLayer(c, p, h);
        if (f === d.paletteIndex)
          continue;
        const g = `${p}:${h}`;
        if (!this.changes.has(g))
          this.changes.set(g, { x: p, y: h, prev: f, next: d.paletteIndex });
        else {
          const S = this.changes.get(g);
          S && (S.next = d.paletteIndex);
        }
        u.push({ x: p, y: h, paletteIndex: d.paletteIndex });
      }
      u.length !== 0 && a.setPixelsInLayer(c, u);
    }, this.flushChanges = () => {
      if (this.changes.size === 0)
        return;
      const t = te.getState(), n = this.layerId ?? t.activeLayerId;
      Ye.getState().pushBatch({ layerId: n, changes: Array.from(this.changes.values()) }), this.changes.clear();
    }, this.stampLine = (t, n) => {
      let s = t.x, l = t.y;
      const r = Math.abs(n.x - t.x), i = Math.abs(n.y - t.y), a = t.x < n.x ? 1 : -1, c = t.y < n.y ? 1 : -1;
      let u = r - i;
      for (; ; ) {
        const d = this.getTransformed();
        if (!d)
          return;
        const p = this.getAnchor({ x: s, y: l }, d.width, d.height);
        if ((!this.lastAnchor || this.lastAnchor.x !== p.x || this.lastAnchor.y !== p.y) && (this.applyStampAt(p.x, p.y), this.lastAnchor = p), s === n.x && l === n.y)
          break;
        const h = 2 * u;
        h > -i && (u -= i, s += a), h < r && (u += r, l += c);
      }
    }, this.onHover = (t) => {
      this.renderPreview(t);
    }, this.onBegin = (t) => {
      this.changes.clear(), this.layerId = te.getState().activeLayerId, this.lastAnchor = null;
      const n = $e.getState(), s = n.drag;
      !s && n.pasteDuplicateColors && S1();
      const l = cc(t);
      if (s) {
        this.dragging = !0, this.lastPoint = l, this.stampLine(l, l), this.renderPreview(t);
        return;
      }
      const r = this.getTransformed();
      if (!r)
        return;
      const i = this.getAnchor(l, r.width, r.height);
      this.applyStampAt(i.x, i.y), this.flushChanges(), this.renderPreview(t);
    }, this.onMove = (t) => {
      if (this.dragging && this.lastPoint) {
        const n = cc(t);
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
    const t = Tt.getState();
    if (t.pixels.length === 0 || t.width === 0 || t.height === 0)
      return null;
    const n = $e.getState();
    if (this.cache && this.cache.source === t.pixels && this.cache.width === t.width && this.cache.height === t.height && this.cache.rotation === n.rotation && this.cache.scale === n.scale && this.cache.flipX === n.flipX && this.cache.flipY === n.flipY)
      return {
        pixels: this.cache.pixels,
        width: this.cache.transformedWidth,
        height: this.cache.transformedHeight
      };
    const s = _1(
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
const sf = (e) => {
  const t = Math.floor(e.canvasX / N), n = Math.floor(e.canvasY / N), s = te.getState().getPixelComposite(t, n), l = ie.getState();
  if (e.ctrl) {
    l.setSelectedIndices(
      [...l.selectedIndices.filter((r) => r !== s), s]
    );
    return;
  }
  l.setSelectedIndices([s]);
};
class k1 {
  constructor() {
    this.id = "eyedropper", this.onHover = () => {
      z.getState().clear();
    }, this.onBegin = (t) => {
      z.getState().clear(), sf(t);
    }, this.onMove = (t) => {
      sf(t);
    }, this.onCancel = () => {
      z.getState().clear();
    };
  }
}
const T1 = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `ref-${Date.now()}-${Math.random().toString(16).slice(2)}`, Bt = lt((e) => ({
  items: [],
  selectedId: null,
  addReference: (t) => {
    const { id: n, ...s } = t, l = n ?? T1();
    return Pe.getState().setDirty(!0), e((r) => ({
      items: [...r.items, { id: l, ...s }],
      selectedId: l
    })), l;
  },
  setSelected: (t) => e({ selectedId: t }),
  updateReference: (t, n) => {
    Pe.getState().setDirty(!0), e((s) => ({
      items: s.items.map((l) => l.id === t ? { ...l, ...n } : l)
    }));
  },
  removeReference: (t) => {
    Pe.getState().setDirty(!0), e((n) => ({
      items: n.items.filter((s) => s.id !== t),
      selectedId: n.selectedId === t ? null : n.selectedId
    }));
  },
  clear: () => {
    Pe.getState().setDirty(!0), e({ items: [], selectedId: null });
  }
})), Eo = lt((e) => ({
  snap: "pixel",
  setSnap: (t) => e({ snap: t })
})), j1 = (e) => e * Math.PI / 180, $n = (e) => {
  const t = e.width * N, n = e.height * N, s = e.scale, l = Number.isFinite(e.rotation) ? e.rotation : 0, r = t * s, i = n * s;
  return {
    centerX: e.x * N + r / 2,
    centerY: e.y * N + i / 2,
    baseWidth: t,
    baseHeight: n,
    scale: s,
    rotationRad: j1(l),
    flipX: e.flipX ? -1 : 1,
    flipY: e.flipY ? -1 : 1
  };
}, Di = (e, t, n) => {
  const s = $n(e), l = t * s.scale * s.flipX, r = n * s.scale * s.flipY, i = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad);
  return {
    x: s.centerX + l * i - r * a,
    y: s.centerY + l * a + r * i
  };
}, C1 = (e, t, n) => {
  const s = $n(e), l = t - s.centerX, r = n - s.centerY, i = Math.cos(s.rotationRad), a = Math.sin(s.rotationRad), c = l * i + r * a, u = -l * a + r * i;
  return {
    x: c * s.flipX / s.scale,
    y: u * s.flipY / s.scale
  };
}, rx = (e) => {
  const { baseWidth: t, baseHeight: n } = $n(e), s = t / 2, l = n / 2;
  return {
    nw: { x: -s, y: -l },
    ne: { x: s, y: -l },
    se: { x: s, y: l },
    sw: { x: -s, y: l }
  };
}, la = (e) => {
  const t = rx(e);
  return {
    nw: Di(e, t.nw.x, t.nw.y),
    ne: Di(e, t.ne.x, t.ne.y),
    se: Di(e, t.se.x, t.se.y),
    sw: Di(e, t.sw.x, t.sw.y)
  };
}, ra = (e) => {
  const t = la(e), n = Object.values(t), s = n.map((r) => r.x), l = n.map((r) => r.y);
  return {
    minX: Math.min(...s),
    maxX: Math.max(...s),
    minY: Math.min(...l),
    maxY: Math.max(...l)
  };
}, N1 = (e, t, n) => {
  const s = C1(e, t, n), { baseWidth: l, baseHeight: r } = $n(e);
  return Math.abs(s.x) <= l / 2 && Math.abs(s.y) <= r / 2;
}, Yi = (e, t) => Math.round(e / t) * t, lf = (e) => e === "tile" ? _e : 1, P1 = {
  nw: "se",
  ne: "sw",
  se: "nw",
  sw: "ne"
}, rf = (e, t, n) => {
  const s = la(e);
  for (const l of uw) {
    const r = s[l];
    if (Math.abs(t - r.x) <= Dp && Math.abs(n - r.y) <= Dp)
      return l;
  }
  return null;
}, of = (e, t) => {
  const n = rx(e), s = la(e), l = P1[t], r = $n(e);
  return {
    id: e.id,
    mode: "scale",
    anchorWorldX: s[l].x,
    anchorWorldY: s[l].y,
    anchorLocal: n[l],
    handleLocal: n[t],
    baseWidth: r.baseWidth,
    baseHeight: r.baseHeight,
    rotationRad: r.rotationRad,
    flipX: r.flipX,
    flipY: r.flipY
  };
};
class I1 {
  constructor() {
    this.id = "reference-handle", this.drag = null, this.onHover = () => {
      this.drag || z.getState().clear();
    }, this.onBegin = (t) => {
      z.getState().clear();
      const { items: n, selectedId: s, setSelected: l } = Bt.getState(), r = t.canvasX, i = t.canvasY, a = s ? n.find((p) => p.id === s) : null;
      if (a) {
        const p = rf(a, r, i);
        if (p) {
          this.drag = of(a, p);
          return;
        }
      }
      let c = null;
      for (let p = n.length - 1; p >= 0; p -= 1) {
        const h = n[p];
        if (N1(h, r, i)) {
          c = h;
          break;
        }
      }
      if (!c) {
        l(null), this.drag = null;
        return;
      }
      l(c.id);
      const u = rf(c, r, i);
      if (u) {
        this.drag = of(c, u);
        return;
      }
      const d = $n(c);
      this.drag = {
        id: c.id,
        mode: "move",
        offsetX: r - d.centerX,
        offsetY: i - d.centerY
      };
    }, this.onMove = (t) => {
      if (!this.drag)
        return;
      const n = Bt.getState(), s = Eo.getState().snap, l = n.items.find((E) => {
        var H;
        return E.id === ((H = this.drag) == null ? void 0 : H.id);
      });
      if (!l) {
        this.drag = null;
        return;
      }
      const r = t.canvasX, i = t.canvasY;
      if (this.drag.mode === "move") {
        const E = $n(l), H = E.baseWidth * E.scale, Z = E.baseHeight * E.scale, se = r - this.drag.offsetX, $ = i - this.drag.offsetY, he = lf(s), ye = (se - H / 2) / N, fe = ($ - Z / 2) / N, O = Yi(ye, he), Q = Yi(fe, he);
        n.updateReference(l.id, { x: O, y: Q });
        return;
      }
      const a = r - this.drag.anchorWorldX, c = i - this.drag.anchorWorldY, u = Math.cos(this.drag.rotationRad), d = Math.sin(this.drag.rotationRad), p = a * u + c * d, h = -a * d + c * u, f = p * this.drag.flipX, g = h * this.drag.flipY, S = this.drag.handleLocal.x - this.drag.anchorLocal.x, M = this.drag.handleLocal.y - this.drag.anchorLocal.y, y = S !== 0 ? Math.abs(f / S) : 0, m = M !== 0 ? Math.abs(g / M) : 0, v = Math.max(y, m), w = Number.isFinite(v) && v > 0 ? v : $s, _ = lf(s) * N, b = Math.max(
        _,
        Yi(this.drag.baseWidth * w, _)
      ), T = Math.max(
        _,
        Yi(this.drag.baseHeight * w, _)
      );
      let j = Math.max(
        $s,
        Math.max(b / this.drag.baseWidth, T / this.drag.baseHeight)
      );
      j = Math.min(j, Rl);
      const A = this.drag.baseWidth * j, L = this.drag.baseHeight * j, C = this.drag.anchorLocal.x * j * this.drag.flipX, R = this.drag.anchorLocal.y * j * this.drag.flipY, U = C * u - R * d, W = C * d + R * u, re = this.drag.anchorWorldX - U, le = this.drag.anchorWorldY - W, ne = (re - A / 2) / N, Y = (le - L / 2) / N;
      n.updateReference(l.id, { x: ne, y: Y, scale: j });
    }, this.onEnd = () => {
      this.drag = null;
    }, this.onCancel = () => {
      this.drag = null;
    };
  }
}
const lr = (e) => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${e}-${Date.now()}-${Math.random().toString(16).slice(2)}`, ix = 64, wu = 2, Su = 24, uc = 6, E1 = 1, A1 = 1, Ao = (e, t) => typeof e != "number" || !Number.isFinite(e) ? t : Math.min(ix, Math.max(1, Math.floor(e))), R1 = (e) => Math.max(wu, Math.min(Su, Math.round(e))), dc = (e) => ({
  ...e,
  columns: Ao(e.columns, E1),
  rows: Ao(e.rows, A1)
}), L1 = (e, t) => {
  var n, s;
  return t ? e.some((l) => l.id === t) ? t : ((s = e[0]) == null ? void 0 : s.id) ?? null : ((n = e[0]) == null ? void 0 : n.id) ?? null;
}, D1 = (e, t) => {
  const n = new Set(t), s = `${e} Copy`;
  if (!n.has(s))
    return s;
  let l = 2;
  for (; n.has(`${e} Copy ${l}`); )
    l += 1;
  return `${e} Copy ${l}`;
}, V = lt((e, t) => ({
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
  tilePickerZoom: uc,
  tilePlacementMode: "hard",
  tilePenSnapToCluster: !1,
  tileDebugOverlay: !1,
  nineSlice: null,
  setTileSets: (n) => e((s) => {
    const l = n.map(dc), r = L1(
      l,
      s.activeTileSetId
    ), i = l.find((a) => a.id === r);
    return {
      tileSets: l,
      activeTileSetId: r,
      tilePaletteColumns: (i == null ? void 0 : i.columns) ?? s.tilePaletteColumns,
      tilePaletteRowsMin: (i == null ? void 0 : i.rows) ?? s.tilePaletteRowsMin
    };
  }),
  setTileMaps: (n) => e({ tileMaps: n }),
  setAll: (n, s) => e(() => {
    var i;
    const l = n.map(dc), r = l[0];
    return {
      tileSets: l,
      tileMaps: s,
      activeTileSetId: (r == null ? void 0 : r.id) ?? null,
      activeTileMapId: ((i = s[0]) == null ? void 0 : i.id) ?? null,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: (r == null ? void 0 : r.columns) ?? 8,
      tilePaletteOffset: 0,
      tilePaletteRowsMin: (r == null ? void 0 : r.rows) ?? 3,
      tileDebugOverlay: !1,
      nineSlice: null
    };
  }),
  setActiveTileSet: (n) => e((s) => {
    const l = s.tileSets.find((r) => r.id === n);
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
  setTileSelection: (n, s, l, r) => e({
    selectedTileIndex: Math.max(0, r),
    selectedTileIndices: n,
    selectedTileCols: Math.max(1, s),
    selectedTileRows: Math.max(1, l)
  }),
  setTilePage: (n) => e((s) => {
    const l = Math.max(0, s.tilePageCount - 1);
    return { tilePage: Math.min(l, Math.max(0, Math.floor(n))) };
  }),
  setTilePageCount: (n) => e((s) => {
    const l = Math.max(1, Math.floor(n)), r = Math.max(0, l - 1), i = Math.min(s.tilePage, r);
    return s.tilePageCount === l && s.tilePage === i ? s : {
      tilePageCount: l,
      tilePage: i
    };
  }),
  setTilePaletteColumns: (n) => e((s) => ({
    tilePaletteColumns: Math.min(ix, Math.max(1, n)),
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
    tilePickerZoom: Number.isFinite(n) && n > 0 ? R1(n) : uc
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
    const r = t().tileSets.find((c) => c.id === n);
    if (!r)
      return;
    const i = Ao(s, r.columns), a = Ao(l, r.rows);
    r.columns === i && r.rows === a || (Pe.getState().setDirty(!0), e((c) => ({
      tileSets: c.tileSets.map(
        (u) => u.id === n ? { ...u, columns: i, rows: a } : u
      ),
      tilePaletteColumns: c.activeTileSetId === n ? i : c.tilePaletteColumns,
      tilePaletteRowsMin: c.activeTileSetId === n ? a : c.tilePaletteRowsMin
    })));
  },
  renameTileSet: (n, s) => {
    const l = s.trim();
    if (!l)
      return;
    const r = t().tileSets.find((i) => i.id === n);
    !r || r.name === l || (Pe.getState().setDirty(!0), e((i) => ({
      tileSets: i.tileSets.map(
        (a) => a.id === n ? { ...a, name: l } : a
      )
    })));
  },
  deleteTileSet: (n) => {
    var d;
    const s = t(), l = s.tileSets.findIndex((p) => p.id === n);
    if (l < 0)
      return;
    const r = s.tileSets.filter((p) => p.id !== n), i = s.tileMaps.filter((p) => p.tileSetId !== n), a = (() => {
      var h;
      if (s.activeTileSetId && s.activeTileSetId !== n)
        return s.activeTileSetId;
      const p = Math.min(l, Math.max(0, r.length - 1));
      return ((h = r[p]) == null ? void 0 : h.id) ?? null;
    })(), c = r.find((p) => p.id === a) ?? r[0], u = (() => {
      var f;
      if (i.some((g) => g.id === s.activeTileMapId))
        return s.activeTileMapId;
      const h = i.find(
        (g) => g.tileSetId === ((c == null ? void 0 : c.id) ?? null)
      );
      return (h == null ? void 0 : h.id) ?? ((f = i[0]) == null ? void 0 : f.id) ?? null;
    })();
    Pe.getState().setDirty(!0), e({
      tileSets: r,
      tileMaps: i,
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
    const r = lr("tileset"), i = {
      ...l,
      id: r,
      name: D1(
        l.name,
        s.tileSets.map((a) => a.name)
      ),
      tiles: l.tiles.map((a) => ({
        ...a,
        id: lr("tile"),
        pixels: a.pixels.slice()
      }))
    };
    return Pe.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, i],
      activeTileSetId: r,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: i.columns,
      tilePaletteRowsMin: i.rows,
      tilePaletteOffset: 0,
      nineSlice: null
    })), r;
  },
  addTileSet: (n) => {
    const { id: s, ...l } = n, r = s ?? lr("tileset"), i = dc({ id: r, ...l });
    return Pe.getState().setDirty(!0), e((a) => ({
      tileSets: [...a.tileSets, i],
      activeTileSetId: r,
      selectedTileIndex: 0,
      selectedTileIndices: [0],
      selectedTileCols: 1,
      selectedTileRows: 1,
      tilePage: 0,
      tilePageCount: 1,
      tilePaletteColumns: i.columns,
      tilePaletteRowsMin: i.rows,
      tilePaletteOffset: 0
    })), r;
  },
  appendTilesToSet: (n, s) => {
    s.length !== 0 && (Pe.getState().setDirty(!0), e((l) => ({
      tileSets: l.tileSets.map((r) => {
        if (r.id !== n)
          return r;
        const i = s.map((a) => ({
          id: lr("tile"),
          ...a
        }));
        return { ...r, tiles: [...r.tiles, ...i] };
      })
    })));
  },
  refreshCanvasSourcedTiles: (n, s) => {
    if (!n && s.length === 0)
      return;
    const l = n ? null : new Set(s.map((a) => `${a.row}:${a.col}`)), r = te.getState(), i = (a, c, u, d) => {
      if (!l)
        return !0;
      const p = a, h = c, f = a + Math.max(0, u - 1), g = c + Math.max(0, d - 1), S = Math.floor(p / X), M = Math.floor(f / X), y = Math.floor(h / X), m = Math.floor(g / X);
      for (let v = y; v <= m; v += 1)
        for (let w = S; w <= M; w += 1)
          if (l.has(`${v}:${w}`))
            return !0;
      return !1;
    };
    e((a) => {
      let c = !1;
      const u = a.tileSets.map((d) => {
        const p = d.tileWidth, h = d.tileHeight;
        let f = !1;
        const g = d.tiles.map((S) => {
          const M = S.source;
          if (!M || M.kind !== "canvas" || !i(M.x, M.y, p, h))
            return S;
          const y = [];
          for (let m = 0; m < h; m += 1)
            for (let v = 0; v < p; v += 1)
              y.push(r.getPixelComposite(M.x + v, M.y + m));
          return c = !0, f = !0, { ...S, pixels: y };
        });
        return f ? { ...d, tiles: g } : d;
      });
      return c ? { tileSets: u } : a;
    });
  },
  deleteTilesFromSet: (n, s) => {
    if (s.length === 0)
      return;
    const l = new Set(s);
    Pe.getState().setDirty(!0), e((r) => {
      var S;
      const i = r.tileSets.find((M) => M.id === n);
      if (!i)
        return r;
      const a = /* @__PURE__ */ new Map(), c = [];
      let u = 0;
      i.tiles.forEach((M, y) => {
        if (l.has(y)) {
          a.set(y, -1);
          return;
        }
        a.set(y, u), c.push(M), u += 1;
      });
      const d = (M) => M.map((y) => y >= 0 ? a.get(y) ?? -1 : -1), p = d(r.selectedTileIndices).filter(
        (M) => M >= 0
      ), h = (c.length > 0, 0), g = (p.length > 0 ? p : [h])[0] ?? h;
      return {
        tileSets: r.tileSets.map(
          (M) => M.id === n ? { ...M, tiles: c } : M
        ),
        tileMaps: r.tileMaps.map((M) => {
          if (M.tileSetId !== n)
            return M;
          const y = M.tiles.map((m) => m < 0 ? -1 : a.get(m) ?? -1);
          return { ...M, tiles: y };
        }),
        selectedTileIndex: g,
        selectedTileIndices: [g],
        selectedTileCols: 1,
        selectedTileRows: 1,
        nineSlice: ((S = r.nineSlice) == null ? void 0 : S.tileSetId) === n && r.nineSlice.tiles.length > 0 ? {
          ...r.nineSlice,
          tiles: d(r.nineSlice.tiles)
        } : r.nineSlice
      };
    });
  },
  consolidateTileSet: (n) => {
    Pe.getState().setDirty(!0), e((s) => {
      var g;
      const l = s.tileSets.find((S) => S.id === n);
      if (!l)
        return s;
      const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = [];
      let c = 0;
      l.tiles.forEach((S, M) => {
        const y = S.pixels.join(","), m = i.get(y);
        if (m !== void 0) {
          r.set(M, m);
          return;
        }
        i.set(y, c), r.set(M, c), a.push(S), c += 1;
      });
      const u = (S) => S.map((M) => M >= 0 ? r.get(M) ?? -1 : -1), d = u(s.selectedTileIndices).filter(
        (S) => S >= 0
      ), p = (a.length > 0, 0), f = (d.length > 0 ? d : [p])[0] ?? p;
      return {
        tileSets: s.tileSets.map(
          (S) => S.id === n ? { ...S, tiles: a } : S
        ),
        tileMaps: s.tileMaps.map((S) => {
          if (S.tileSetId !== n)
            return S;
          const M = S.tiles.map((y) => y < 0 ? -1 : r.get(y) ?? -1);
          return { ...S, tiles: M };
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
    const { id: s, ...l } = n, r = s ?? lr("tilemap"), i = { id: r, ...l };
    return Pe.getState().setDirty(!0), e((a) => ({
      tileMaps: [...a.tileMaps, i],
      activeTileMapId: r
    })), r;
  },
  setTileMapTiles: (n, s) => {
    s.length !== 0 && (Pe.getState().setDirty(!0), e((l) => ({
      tileMaps: l.tileMaps.map((r) => {
        if (r.id !== n)
          return r;
        const i = r.tiles.slice();
        for (const a of s)
          a.index < 0 || a.index >= i.length || (i[a.index] = a.tile);
        return { ...r, tiles: i };
      })
    })));
  },
  expandTileMapToInclude: (n, s, l, r, i, a, c) => {
    const d = t().tileMaps.find((v) => v.id === n);
    if (!d)
      return null;
    const p = Math.max(0, -s), h = Math.max(0, -r), f = Math.max(0, l - (d.columns - 1)), g = Math.max(0, i - (d.rows - 1));
    if (p === 0 && h === 0 && f === 0 && g === 0)
      return d;
    const S = d.columns + p + f, M = d.rows + h + g, y = new Array(S * M).fill(-1);
    for (let v = 0; v < d.rows; v += 1)
      for (let w = 0; w < d.columns; w += 1) {
        const _ = v * d.columns + w, b = (v + h) * S + (w + p);
        y[b] = d.tiles[_] ?? -1;
      }
    const m = {
      ...d,
      originX: d.originX - p * a,
      originY: d.originY - h * c,
      columns: S,
      rows: M,
      tiles: y
    };
    return Pe.getState().setDirty(!0), e((v) => ({
      tileMaps: v.tileMaps.map((w) => w.id === n ? m : w)
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
    tilePickerZoom: uc,
    tilePlacementMode: "hard",
    tilePenSnapToCluster: !1,
    tileDebugOverlay: !1,
    nineSlice: null
  })
})), hc = (e) => ({
  x: Math.floor(e.canvasX / N / _e),
  y: Math.floor(e.canvasY / N / _e)
}), af = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), Y1 = (e) => {
  const t = z.getState();
  for (let n = e.minTileY; n <= e.maxTileY; n += 1)
    for (let s = e.minTileX; s <= e.maxTileX; s += 1) {
      const l = s * _e, r = n * _e;
      for (let i = 0; i < _e; i += 1)
        for (let a = 0; a < _e; a += 1)
          t.setPixel(l + a, r + i, 1);
    }
}, B1 = (e) => {
  const t = globalThis.alert;
  typeof t == "function" && t(e);
};
class X1 {
  constructor() {
    this.id = "tile-sampler", this.start = null, this.last = null, this.onBegin = (t) => {
      z.getState().clear(), this.start = hc(t), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start)
        return;
      z.getState().clear();
      const s = hc(t);
      this.last = s, Y1(af(this.start, s));
    }, this.onEnd = (t) => {
      if (!this.start)
        return;
      const n = z.getState(), s = t ? hc(t) : this.last ?? this.start, l = af(this.start, s), r = te.getState(), i = V.getState(), a = l.maxTileX - l.minTileX + 1, c = l.maxTileY - l.minTileY + 1;
      let u = i.activeTileSetId;
      const d = i.tileSets.find((f) => f.id === u);
      let p = (d == null ? void 0 : d.tiles.length) ?? 0;
      if (!d || d.tileWidth !== _e || d.tileHeight !== _e)
        u = i.addTileSet({
          name: `Tile Set ${i.tileSets.length + 1}`,
          tileWidth: _e,
          tileHeight: _e,
          columns: a,
          rows: c,
          tiles: []
        }), p = 0;
      else if (d && d.tiles.length === 0)
        i.setTileSetLayout(d.id, a, c);
      else if (d && d.tiles.length > 0 && (d.columns !== a || d.rows !== c)) {
        B1(
          `Invalid selection: ${d.name} expects ${d.columns}x${d.rows}. Capture that size or create a new tile set.`
        ), n.clear(), this.start = null, this.last = null;
        return;
      }
      const h = [];
      for (let f = l.minTileY; f <= l.maxTileY; f += 1)
        for (let g = l.minTileX; g <= l.maxTileX; g += 1) {
          const S = [], M = g * _e, y = f * _e;
          for (let m = 0; m < _e; m += 1)
            for (let v = 0; v < _e; v += 1)
              S.push(r.getPixelComposite(M + v, y + m));
          h.push({ pixels: S, source: { kind: "canvas", x: M, y } });
        }
      u && (i.appendTilesToSet(u, h), i.setSelectedTileIndex(p), i.setTilePage(0), i.setTilePaletteOffset(0)), n.clear(), this.start = null, this.last = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const F1 = (e) => e.some((t) => t === 0), O1 = (e) => e.every((t) => t === 0);
class Ro {
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
    if (t === "hard" || !F1(l))
      return n;
    const r = s >= 0 ? this.tiles[s] : void 0, i = l.map(
      (d, p) => d === 0 ? (r == null ? void 0 : r[p]) ?? 0 : d
    );
    if (O1(i))
      return -1;
    const a = i.join(","), c = this.tileIndexBySignature.get(a);
    if (c !== void 0)
      return c;
    const u = this.tiles.length;
    return this.tiles.push(i), this.tileIndexBySignature.set(a, u), this.pendingTiles.push({ pixels: i }), u;
  }
  getTilePixels(t) {
    return t < 0 || t >= this.tiles.length ? null : this.tiles[t] ?? null;
  }
  getPendingTiles() {
    return this.pendingTiles.slice();
  }
}
const z1 = 32, pc = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), H1 = (e, t, n, s, l) => {
  const r = z.getState();
  for (let i = 0; i < s; i += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[i * n + a] ?? 0;
      c !== 0 && r.setPixel(e + a, t + i, c);
    }
}, cf = () => {
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
}, uf = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const r = n.tileMaps.find((h) => h.tileSetId === e);
  if (r)
    return n.setActiveTileMap(r.id), {
      tileMapId: r.id,
      originX: r.originX,
      originY: r.originY,
      columns: r.columns,
      rows: r.rows,
      tiles: r.tiles
    };
  const i = z1, a = new Array(i * i).fill(-1), c = Math.floor(i / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: i,
    rows: i,
    tiles: a
  }), originX: u, originY: d, columns: i, rows: i, tiles: a };
};
class W1 {
  constructor() {
    this.id = "tile-pen", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.erasing = !1, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = cf(), !this.activeTile) || (this.placementResolver = new Ro(this.activeTile.tileSetTiles), this.activeMap = uf(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = pc(t), l = this.toWorldTilePoint(s);
      l && this.applyTile(this.snapWorldPointToCluster(l));
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.erasing = t.alt, this.activeTile = cf(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.placementResolver = new Ro(this.activeTile.tileSetTiles), this.activeMap = uf(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1;
        return;
      }
      const s = pc(t), l = this.toWorldTilePoint(s);
      if (!l)
        return;
      const r = this.snapWorldPointToCluster(l);
      this.applyTile(r), this.lastWorldPoint = r;
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      this.erasing = t.alt;
      const n = pc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      const l = this.snapWorldPointToCluster(s);
      if (this.lastWorldPoint)
        if (this.activeTile.snapToCluster)
          this.drawSnappedLine(this.lastWorldPoint, l);
        else {
          let r = this.lastWorldPoint.x, i = this.lastWorldPoint.y;
          const a = Math.abs(l.x - this.lastWorldPoint.x), c = Math.abs(l.y - this.lastWorldPoint.y), u = this.lastWorldPoint.x < l.x ? 1 : -1, d = this.lastWorldPoint.y < l.y ? 1 : -1;
          let p = a - c;
          for (; this.applyTile({ x: r, y: i }), !(r === l.x && i === l.y); ) {
            const h = 2 * p;
            h > -c && (p -= c, r += u), h < a && (p += a, i += d);
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
      V.getState().setTileMapTiles(this.activeMap.tileMapId, t), z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.placementResolver = null, this.erasing = !1;
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
    let r = Math.floor(t.x / s), i = Math.floor(t.y / l);
    const a = Math.floor(n.x / s), c = Math.floor(n.y / l), u = Math.abs(a - r), d = Math.abs(c - i), p = r < a ? 1 : -1, h = i < c ? 1 : -1;
    let f = u - d;
    for (; this.applyTile({ x: r * s, y: i * l }), !(r === a && i === c); ) {
      const g = 2 * f;
      g > -d && (f -= d, r += p), g < u && (f += u, i += h);
    }
  }
  ensureMapBounds(t) {
    if (!this.activeTile || !this.activeMap)
      return null;
    const n = this.activeTile.selectionCols, s = this.activeTile.selectionRows, l = this.toMapPoint(t);
    if (!l)
      return null;
    const r = l.x, i = l.y, a = l.x + n - 1, c = l.y + s - 1, u = V.getState(), d = this.activeMap.columns, p = this.activeMap.originX, h = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      r,
      a,
      i,
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
      ), S = Math.round(
        (h - f.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || S !== 0 || f.columns !== d) {
        const M = /* @__PURE__ */ new Map();
        for (const [y, m] of this.changes.entries()) {
          const v = Math.floor(y / d), w = y % d, _ = v + S, b = w + g;
          _ < 0 || b < 0 || _ >= f.rows || b >= f.columns || M.set(_ * f.columns + b, m);
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
    const r = this.activeTile.selectionCols, i = this.activeTile.selectionRows, a = this.activeTile.selectionIndices;
    for (let c = 0; c < i; c += 1)
      for (let u = 0; u < r; u += 1) {
        const d = n.x + u, p = n.y + c;
        if (d < 0 || p < 0 || d >= s || p >= l)
          continue;
        const h = p * s + d, f = c * r + u, g = a[f] ?? -1, S = this.erasing ? -1 : this.resolvePlacedTileIndex(g, h);
        if (this.drawing && this.changes.set(h, S), this.erasing)
          continue;
        const M = this.getTilePixels(S);
        if (!M)
          continue;
        const y = t.x + u, m = t.y + c, v = y * this.activeTile.tileWidth, w = m * this.activeTile.tileHeight;
        H1(
          v,
          w,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          M
        );
      }
  }
}
const U1 = 32, fc = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), $1 = (e, t, n, s, l) => {
  const r = z.getState();
  for (let i = 0; i < s; i += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[i * n + a] ?? 0;
      c !== 0 && r.setPixel(e + a, t + i, c);
    }
}, df = () => {
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
}, hf = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const r = n.tileMaps.find((h) => h.tileSetId === e);
  if (r)
    return n.setActiveTileMap(r.id), {
      tileMapId: r.id,
      originX: r.originX,
      originY: r.originY,
      columns: r.columns,
      rows: r.rows,
      tiles: r.tiles
    };
  const i = U1, a = new Array(i * i).fill(-1), c = Math.floor(i / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: i,
    rows: i,
    tiles: a
  }), originX: u, originY: d, columns: i, rows: i, tiles: a };
};
class K1 {
  constructor() {
    this.id = "tile-rectangle", this.drawing = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.seed = 0, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = df(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = hf(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = fc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.applyTileArea(l, l));
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = df(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.resetPlacementResolver(), this.activeMap = hf(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1;
        return;
      }
      const s = fc(t), l = this.toWorldTilePoint(s);
      l && (this.seed = Date.now() & 4294967295, this.startWorldPoint = l, this.lastWorldPoint = l, this.applyTileArea(l, l));
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap)
        return;
      const n = fc(t), s = this.toWorldTilePoint(n);
      s && (this.lastWorldPoint = s, this.startWorldPoint && (z.getState().clear(), this.changes.clear(), this.resetPlacementResolver(), this.applyTileArea(this.startWorldPoint, s)));
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
      V.getState().setTileMapTiles(this.activeMap.tileMapId, t), z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.changes.clear(), this.lastWorldPoint = null, this.startWorldPoint = null, this.placementResolver = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Ro(this.activeTile.tileSetTiles);
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
    const r = l.x, i = l.y, a = l.x + n - 1, c = l.y + s - 1, u = V.getState(), d = this.activeMap.columns, p = this.activeMap.originX, h = this.activeMap.originY, f = u.expandTileMapToInclude(
      this.activeMap.tileMapId,
      r,
      a,
      i,
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
      ), S = Math.round(
        (h - f.originY) / this.activeTile.tileHeight
      );
      if (g !== 0 || S !== 0 || f.columns !== d) {
        const M = /* @__PURE__ */ new Map();
        for (const [y, m] of this.changes.entries()) {
          const v = Math.floor(y / d), w = y % d, _ = v + S, b = w + g;
          _ < 0 || b < 0 || _ >= f.rows || b >= f.columns || M.set(_ * f.columns + b, m);
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
    const l = t * 73856093 ^ n * 19349663 ^ this.seed * 83492791, r = Math.abs(l) % s.length;
    return s[r] ?? null;
  }
  applyTileArea(t, n) {
    if (!this.activeTile || !this.activeMap)
      return;
    const s = Math.min(t.x, n.x), l = Math.max(t.x, n.x), r = Math.min(t.y, n.y), i = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: s, y: r }))
      return;
    const { columns: c, rows: u } = this.activeMap, d = Math.round(this.activeMap.originX / this.activeTile.tileWidth), p = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let h = r; h <= i; h += 1)
      for (let f = s; f <= l; f += 1) {
        const g = f - d, S = h - p;
        if (g < 0 || S < 0 || g >= c || S >= u)
          continue;
        const M = this.sampleTileIndexForCell(f, h);
        if (M === null)
          continue;
        const y = S * c + g, m = this.resolvePlacedTileIndex(M, y);
        this.drawing && this.changes.set(y, m);
        const v = this.getTilePixels(m);
        if (!v)
          continue;
        const w = f * this.activeTile.tileWidth, _ = h * this.activeTile.tileHeight;
        $1(
          w,
          _,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          v
        );
      }
  }
}
const G1 = 1, V1 = async (e, t, n) => {
  const s = Math.min(16, Math.max(1, n.length)), l = Math.max(1, Math.ceil(n.length / s)), r = G1, i = r, a = r * 2, c = s * (e.tileWidth + a), u = l * (e.tileHeight + a), d = new Uint8ClampedArray(c * u * 4), p = t.map((m) => vt(m) ?? { r: 0, g: 0, b: 0 }), h = (m, v, w) => {
    if (m < 0 || v < 0 || m >= c || v >= u)
      return;
    const _ = (v * c + m) * 4;
    d[_] = w.r, d[_ + 1] = w.g, d[_ + 2] = w.b, d[_ + 3] = 255;
  };
  n.forEach((m, v) => {
    const w = e.tiles[m];
    if (!w)
      return;
    const _ = v % s * (e.tileWidth + a), b = Math.floor(v / s) * (e.tileHeight + a);
    for (let T = 0; T < e.tileHeight; T += 1)
      for (let j = 0; j < e.tileWidth; j += 1) {
        const A = w.pixels[T * e.tileWidth + j] ?? 0;
        if (A === 0)
          continue;
        const L = p[A] ?? p[0] ?? { r: 0, g: 0, b: 0 }, C = _ + i + j, R = b + i + T;
        h(C, R, L), j === 0 && h(C - 1, R, L), j === e.tileWidth - 1 && h(C + 1, R, L), T === 0 && h(C, R - 1, L), T === e.tileHeight - 1 && h(C, R + 1, L), j === 0 && T === 0 && h(C - 1, R - 1, L), j === 0 && T === e.tileHeight - 1 && h(C - 1, R + 1, L), j === e.tileWidth - 1 && T === 0 && h(C + 1, R - 1, L), j === e.tileWidth - 1 && T === e.tileHeight - 1 && h(C + 1, R + 1, L);
      }
  });
  const f = document.createElement("canvas");
  f.width = c, f.height = u;
  const g = f.getContext("2d");
  if (!g)
    throw new Error("Unable to export tile atlas.");
  const S = new ImageData(d, c, u);
  g.putImageData(S, 0, 0);
  const M = await new Promise(
    (m) => f.toBlob((v) => m(v), "image/png")
  );
  if (!M)
    throw new Error("Unable to export tile atlas.");
  return { buffer: new Uint8Array(await M.arrayBuffer()), columns: s, rows: l, width: c, height: u, margin: i, spacing: a };
}, Q1 = async (e) => {
  var y;
  if (!((y = window.projectApi) != null && y.exportTileMap))
    return window.alert("Tile export is unavailable. Restart the app to load the latest export support."), null;
  const t = V.getState(), n = t.tileSets.find((m) => m.id === t.activeTileSetId);
  if (!n)
    return window.alert("No tile set available."), null;
  const s = t.tileMaps.find(
    (m) => m.id === t.activeTileMapId && m.tileSetId === n.id
  ) ?? t.tileMaps.find((m) => m.tileSetId === n.id);
  if (!s)
    return window.alert("No tile map available."), null;
  const l = Math.round(s.originX / n.tileWidth), r = Math.round(s.originY / n.tileHeight), i = e.maxTileX - e.minTileX + 1, a = e.maxTileY - e.minTileY + 1, c = [], u = /* @__PURE__ */ new Set();
  for (let m = 0; m < a; m += 1)
    for (let v = 0; v < i; v += 1) {
      const w = e.minTileX + v, _ = e.minTileY + m, b = w - l, T = _ - r;
      let j = -1;
      b >= 0 && b < s.columns && T >= 0 && T < s.rows && (j = s.tiles[T * s.columns + b] ?? -1), c.push(j), j >= 0 && j < n.tiles.length && u.add(j);
    }
  if (u.size === 0)
    return window.alert("No tiles in the selected region."), null;
  const d = Array.from(u).sort((m, v) => m - v), p = /* @__PURE__ */ new Map();
  d.forEach((m, v) => p.set(m, v));
  const h = c.map((m) => {
    if (m < 0)
      return 0;
    const v = p.get(m);
    return v === void 0 ? 0 : v + 1;
  }), f = ie.getState().colors, g = await V1(n, f, d), S = [];
  for (let m = 0; m < a; m += 1) {
    const v = m * i, w = h.slice(v, v + i).join(",");
    S.push(m === a - 1 ? w : `${w},`);
  }
  const M = `<?xml version="1.0" encoding="UTF-8"?>
<map version="1.0" orientation="orthogonal" renderorder="right-down" width="${i}" height="${a}" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" infinite="0" nextlayerid="2" nextobjectid="1">
  <tileset firstgid="1" name="tiles" tilewidth="${n.tileWidth}" tileheight="${n.tileHeight}" tilecount="${d.length}" columns="${g.columns}" spacing="${g.spacing}" margin="${g.margin}">
    <image source="tiles.png" width="${g.width}" height="${g.height}"/>
  </tileset>
  <layer id="1" name="Tile Layer 1" width="${i}" height="${a}">
    <data encoding="csv">
${S.join(`
`)}
    </data>
  </layer>
</map>
`;
  return window.projectApi.exportTileMap({
    png: g.buffer,
    tmx: M
  });
}, mc = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), gc = (e, t, n) => ({
  x: Math.floor(e.x / t),
  y: Math.floor(e.y / n)
}), pf = (e, t) => ({
  minTileX: Math.min(e.x, t.x),
  maxTileX: Math.max(e.x, t.x),
  minTileY: Math.min(e.y, t.y),
  maxTileY: Math.max(e.y, t.y)
}), Z1 = (e, t, n) => {
  const s = z.getState();
  for (let l = e.minTileY; l <= e.maxTileY; l += 1)
    for (let r = e.minTileX; r <= e.maxTileX; r += 1) {
      const i = r * t, a = l * n;
      for (let c = 0; c < n; c += 1)
        for (let u = 0; u < t; u += 1)
          s.setPixel(i + u, a + c, 1);
    }
};
class q1 {
  constructor() {
    this.id = "tile-export", this.start = null, this.last = null, this.tileWidth = 0, this.tileHeight = 0, this.onBegin = (t) => {
      z.getState().clear();
      const s = V.getState().tileSets.find(
        (l) => l.id === V.getState().activeTileSetId
      );
      if (!s) {
        this.start = null, this.last = null;
        return;
      }
      this.tileWidth = s.tileWidth, this.tileHeight = s.tileHeight, this.start = gc(mc(t), this.tileWidth, this.tileHeight), this.last = this.start;
    }, this.onMove = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      z.getState().clear();
      const s = gc(mc(t), this.tileWidth, this.tileHeight);
      this.last = s, Z1(pf(this.start, s), this.tileWidth, this.tileHeight);
    }, this.onEnd = (t) => {
      if (!this.start || this.tileWidth === 0 || this.tileHeight === 0)
        return;
      const n = z.getState(), s = t ? gc(mc(t), this.tileWidth, this.tileHeight) : this.last ?? this.start, l = pf(this.start, s);
      n.clear(), this.start = null, this.last = null, Q1(l);
    }, this.onCancel = () => {
      z.getState().clear(), this.start = null, this.last = null;
    };
  }
}
const J1 = 32, xc = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), ff = (e, t, n, s, l) => {
  const r = z.getState();
  for (let i = 0; i < s; i += 1)
    for (let a = 0; a < n; a += 1) {
      const c = l[i * n + a] ?? 0;
      c !== 0 && r.setPixel(e + a, t + i, c);
    }
}, mf = () => {
  const e = V.getState(), t = e.tileSets.find((n) => n.id === e.activeTileSetId);
  return t ? {
    tileSetId: t.id,
    tileWidth: t.tileWidth,
    tileHeight: t.tileHeight,
    placementMode: e.tilePlacementMode,
    tileSetTiles: t.tiles
  } : null;
}, gf = (e, t) => {
  const n = V.getState(), s = n.tileSets.find((h) => h.id === e);
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
  const r = n.tileMaps.find((h) => h.tileSetId === e);
  if (r)
    return n.setActiveTileMap(r.id), {
      tileMapId: r.id,
      originX: r.originX,
      originY: r.originY,
      columns: r.columns,
      rows: r.rows,
      tiles: r.tiles
    };
  const i = J1, a = new Array(i * i).fill(-1), c = Math.floor(i / 2), u = -c * s.tileWidth, d = -c * s.tileHeight;
  return { tileMapId: n.addTileMap({
    name: `Tile Map ${n.tileMaps.length + 1}`,
    tileSetId: e,
    originX: u,
    originY: d,
    columns: i,
    rows: i,
    tiles: a
  }), originX: u, originY: d, columns: i, rows: i, tiles: a };
};
class eS {
  constructor() {
    this.id = "tile-9slice", this.drawing = !1, this.sampling = !1, this.changes = /* @__PURE__ */ new Map(), this.startWorldPoint = null, this.lastWorldPoint = null, this.activeMap = null, this.activeTile = null, this.placementResolver = null, this.onHover = (t) => {
      if (this.drawing || (z.getState().clear(), this.activeTile = mf(), !this.activeTile) || (this.resetPlacementResolver(), this.activeMap = gf(this.activeTile.tileSetId), !this.activeMap))
        return;
      const s = V.getState();
      if (!s.nineSlice) {
        const i = this.readNineSliceFromSelection();
        if (i)
          s.setNineSlice(i);
        else
          return;
      }
      const l = xc(t), r = this.toWorldTilePoint(l);
      r && this.applyNineSlice(r, r);
    }, this.onBegin = (t) => {
      if (z.getState().clear(), this.drawing = !0, this.changes.clear(), this.activeTile = mf(), !this.activeTile) {
        this.drawing = !1;
        return;
      }
      if (this.resetPlacementResolver(), this.activeMap = gf(this.activeTile.tileSetId), !this.activeMap) {
        this.drawing = !1;
        return;
      }
      const s = V.getState(), l = !s.nineSlice || t.ctrl;
      this.sampling = l;
      const r = xc(t), i = this.toWorldTilePoint(r);
      if (i && (this.startWorldPoint = i, this.lastWorldPoint = i, !this.sampling)) {
        if (!s.nineSlice) {
          const a = this.readNineSliceFromSelection();
          a && s.setNineSlice(a);
        }
        this.applyNineSlice(i, i);
      }
    }, this.onMove = (t) => {
      if (!this.drawing) {
        this.onHover(t);
        return;
      }
      if (!this.activeTile || !this.activeMap || !this.startWorldPoint)
        return;
      const n = xc(t), s = this.toWorldTilePoint(n);
      if (!s)
        return;
      if (this.lastWorldPoint = s, z.getState().clear(), !this.sampling) {
        this.changes.clear(), this.resetPlacementResolver(), this.applyNineSlice(this.startWorldPoint, s);
        return;
      }
      const r = Math.min(this.startWorldPoint.x, s.x), i = Math.min(this.startWorldPoint.y, s.y);
      this.drawSamplePreview({ x: r, y: i });
    }, this.onEnd = () => {
      if (!this.drawing || !this.activeMap || !this.activeTile)
        return;
      const t = V.getState();
      if (this.sampling && this.startWorldPoint && this.lastWorldPoint) {
        const s = Math.min(this.startWorldPoint.x, this.lastWorldPoint.x), l = Math.min(this.startWorldPoint.y, this.lastWorldPoint.y), r = this.readNineSlice({ x: s, y: l });
        r && t.setNineSlice(r);
      } else if (this.changes.size > 0) {
        if (this.placementResolver) {
          const l = this.placementResolver.getPendingTiles();
          l.length > 0 && V.getState().appendTilesToSet(this.activeTile.tileSetId, l);
        }
        const s = Array.from(this.changes.entries()).map(([l, r]) => ({
          index: l,
          tile: r
        }));
        V.getState().setTileMapTiles(this.activeMap.tileMapId, s);
      }
      z.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null;
    }, this.onCancel = () => {
      z.getState().clear(), this.drawing = !1, this.sampling = !1, this.changes.clear(), this.startWorldPoint = null, this.lastWorldPoint = null, this.placementResolver = null;
    };
  }
  resetPlacementResolver() {
    if (!this.activeTile) {
      this.placementResolver = null;
      return;
    }
    this.placementResolver = new Ro(this.activeTile.tileSetTiles);
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
    const s = Math.min(t.x, n.x), l = Math.min(t.y, n.y), r = Math.max(t.x, n.x), i = Math.max(t.y, n.y), a = this.toMapPoint({ x: s, y: l });
    if (!a)
      return null;
    const u = V.getState().expandTileMapToInclude(
      this.activeMap.tileMapId,
      a.x,
      a.x + (r - s),
      a.y,
      a.y + (i - l),
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
        var d;
        return u.id === ((d = this.activeMap) == null ? void 0 : d.tileMapId);
      }
    );
    if (!l)
      return null;
    const { columns: r, rows: i, tiles: a } = l, c = [];
    for (let u = 0; u < 3; u += 1)
      for (let d = 0; d < 3; d += 1) {
        const p = n.x + d, h = n.y + u;
        if (p < 0 || h < 0 || p >= r || h >= i) {
          c.push(-1);
          continue;
        }
        const f = h * r + p, g = a[f] ?? -1;
        c.push(g);
      }
    return { tileSetId: this.activeTile.tileSetId, tiles: c };
  }
  readNineSliceFromSelection() {
    const t = V.getState(), { selectedTileCols: n, selectedTileRows: s, selectedTileIndices: l } = t;
    if (n !== 3 || s !== 3 || l.length < 9)
      return null;
    const r = l.slice(0, 9);
    return r.some((i) => i < 0) || !this.activeTile ? null : { tileSetId: this.activeTile.tileSetId, tiles: r };
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
    const { columns: r, rows: i, tiles: a } = l;
    for (let c = 0; c < 3; c += 1)
      for (let u = 0; u < 3; u += 1) {
        const d = n.x + u, p = n.y + c;
        if (d < 0 || p < 0 || d >= r || p >= i)
          continue;
        const h = p * r + d, f = a[h] ?? -1;
        if (f < 0 || f >= this.activeTile.tileSetTiles.length)
          continue;
        const g = this.activeTile.tileSetTiles[f], S = t.x + u, M = t.y + c;
        ff(
          S * this.activeTile.tileWidth,
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
    const l = V.getState().nineSlice;
    if (!l || l.tileSetId !== this.activeTile.tileSetId)
      return;
    const r = Math.min(t.x, n.x), i = Math.max(t.x, n.x), a = Math.min(t.y, n.y), c = Math.max(t.y, n.y);
    if (!this.ensureMapBounds({ x: r, y: a }, { x: i, y: c }))
      return;
    const { columns: d, rows: p } = this.activeMap, h = Math.round(this.activeMap.originX / this.activeTile.tileWidth), f = Math.round(this.activeMap.originY / this.activeTile.tileHeight);
    for (let g = a; g <= c; g += 1)
      for (let S = r; S <= i; S += 1) {
        const M = S - h, y = g - f;
        if (M < 0 || y < 0 || M >= d || y >= p)
          continue;
        const m = g === a, v = g === c, w = S === r, _ = S === i;
        let b = 4;
        m && w ? b = 0 : m && _ ? b = 2 : v && w ? b = 6 : v && _ ? b = 8 : m ? b = 1 : v ? b = 7 : w ? b = 3 : _ && (b = 5);
        const T = l.tiles[b] ?? -1;
        if (T < 0 || T >= this.activeTile.tileSetTiles.length)
          continue;
        const j = y * d + M, A = this.resolvePlacedTileIndex(T, j);
        this.drawing && this.changes.set(j, A);
        const L = this.getTilePixels(A);
        if (!L)
          continue;
        const C = S * this.activeTile.tileWidth, R = g * this.activeTile.tileHeight;
        ff(
          C,
          R,
          this.activeTile.tileWidth,
          this.activeTile.tileHeight,
          L
        );
      }
  }
}
class tS {
  constructor() {
    this.id = "text";
  }
}
class nS {
  constructor() {
    this.id = "ai";
  }
}
const sS = () => {
  const e = Te.getState();
  if (e.width === 0 || e.height === 0)
    return null;
  const t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    minX: Math.floor(e.camera.x / N),
    minY: Math.floor(e.camera.y / N),
    maxX: Math.floor((e.camera.x + t) / N),
    maxY: Math.floor((e.camera.y + n) / N)
  };
}, lS = (e) => ({
  x: Math.floor(e.canvasX / N),
  y: Math.floor(e.canvasY / N)
}), rS = (e, t, n, s) => {
  const l = te.getState(), r = /* @__PURE__ */ new Set(), i = [e], a = [t], c = [];
  let u = !1;
  for (let d = 0; d < i.length; d += 1) {
    const p = i[d], h = a[d];
    if (p < s.minX || p > s.maxX || h < s.minY || h > s.maxY)
      continue;
    const f = `${p}:${h}`;
    r.has(f) || (r.add(f), l.getPixel(p, h) === n && ((p === s.minX || p === s.maxX || h === s.minY || h === s.maxY) && (u = !0), c.push({ x: p, y: h }), i.push(p + 1, p - 1, p, p), a.push(h, h, h + 1, h - 1)));
  }
  return { pixels: c, touchesBoundary: u };
};
class iS {
  constructor() {
    this.id = "magic-wand", this.onBegin = (t) => {
      const n = sS();
      if (!n)
        return;
      const { x: s, y: l } = lS(t);
      if (s < n.minX || s > n.maxX || l < n.minY || l > n.maxY)
        return;
      const r = te.getState().getPixel(s, l), { pixels: i, touchesBoundary: a } = rS(s, l, r, n);
      if (i.length === 0 || r === 0 && a)
        return;
      const c = !t.ctrl;
      Se.getState().setSelections(i.map((u) => ({ x: u.x, y: u.y, selected: c })));
    };
  }
}
const Kt = lt((e) => ({
  activeTool: "pen",
  setActiveTool: (t) => e({ activeTool: t })
})), De = lt((e) => ({
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
})), Bi = (e, t, n) => Math.min(n, Math.max(t, e)), oS = ({ x: e, y: t, onClose: n }) => {
  const s = Kt((w) => w.activeTool), l = on((w) => w.size), r = on((w) => w.shape), i = Wt((w) => w.radius), a = Wt((w) => w.density), c = xt((w) => w.mode), u = Se((w) => w.selectedCount), d = k.useRef(null), [p, h] = k.useState({ x: e, y: t }), f = k.useMemo(() => xw[s] ?? "Tools", [s]);
  k.useEffect(() => {
    const w = (b) => {
      d.current && d.current.contains(b.target) || n();
    }, _ = (b) => {
      b.key === "Escape" && n();
    };
    return window.addEventListener("mousedown", w), window.addEventListener("keydown", _), () => {
      window.removeEventListener("mousedown", w), window.removeEventListener("keydown", _);
    };
  }, [n]), k.useLayoutEffect(() => {
    if (!d.current)
      return;
    const w = d.current.getBoundingClientRect(), _ = 8, b = Math.max(_, window.innerWidth - w.width - _), T = Math.max(_, window.innerHeight - w.height - _), j = Bi(e, _, b), A = Bi(t, _, T);
    h({ x: j, y: A });
  }, [e, t]);
  const g = (w) => on.getState().setSize(w), S = (w) => on.getState().setShape(w), M = (w) => Wt.getState().setRadius(w), y = (w) => Wt.getState().setDensity(w), m = (w) => xt.getState().setMode(w), v = s === "pen" || s === "line" || s === "rectangle" || s === "oval" || s === "selection-lasso";
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      ref: d,
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
              Te.getState().resetCamera(), n();
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
              Te.getState().zoomBy(0.25), n();
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
              Te.getState().zoomBy(-0.25), n();
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
              Se.getState().clear(), n();
            },
            children: "Clear Selection"
          }
        ),
        v && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__separator" }),
          /* @__PURE__ */ o.jsx("div", { className: "tool-context-menu__label", children: "Brush" }),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => g(Bi(l - 1, 1, 64)),
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
              onClick: () => g(Bi(l + 1, 1, 64)),
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
              "aria-checked": r === "point",
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
              "aria-checked": r === "square",
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
              "aria-checked": r === "round",
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
              onClick: () => M(i - 1),
              children: [
                "Radius - (",
                i,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => M(i + 1),
              children: [
                "Radius + (",
                i,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              type: "button",
              className: "tool-context-menu__item",
              onClick: () => y(a - 50),
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
              onClick: () => y(a + 50),
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
}, aS = (e) => new Promise((t, n) => {
  const s = new FileReader();
  s.onerror = () => n(new Error("Failed to read image file")), s.onload = () => t(s.result), s.readAsDataURL(e);
}), cS = (e) => new Promise((t, n) => {
  const s = new Image();
  s.onload = () => t(s), s.onerror = () => n(new Error("Failed to load image")), s.src = e;
}), ox = (e) => e.toLowerCase().replace(/[^a-z0-9]/g, ""), uS = (e) => {
  const t = e.split(".");
  return t.length < 2 ? "" : ox(t[t.length - 1]);
}, ax = (e, t) => {
  const n = uS(e.name ?? "");
  return n || ox(gw[t] ?? t.split("/")[1] ?? "");
}, dS = (e, t) => e || (t && Xp[t] ? Xp[t] : "image/png"), hS = (e, t) => {
  const n = ax(e, t);
  return `reference-${typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`}${n ? `.${n}` : ""}`;
}, cx = () => {
  const e = Te.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2
  };
}, pS = (e, t, n) => Math.min(n, Math.max(t, e)), fS = (e) => {
  const t = Te.getState(), n = t.width / t.camera.zoom, s = t.height / t.camera.zoom;
  if (!e.naturalWidth || !e.naturalHeight)
    return 1;
  const l = e.naturalWidth * N, r = e.naturalHeight * N, i = Math.min(n / l, s / r) * 0.9;
  return pS(i, $s, Rl);
}, mS = (e) => ({
  x: Math.floor(e.x / N),
  y: Math.floor(e.y / N)
}), ux = async (e, t) => {
  if (!e.type.startsWith("image/"))
    return;
  const n = e.type ?? "", s = ax(e, n), l = dS(n, s), [r, i] = await Promise.all([aS(e), e.arrayBuffer()]), a = await cS(r), c = t ?? cx(), u = mS(c), d = fS(a), p = hS(e, l);
  Bt.getState().addReference({
    image: a,
    assetFilename: p,
    assetType: l,
    assetData: new Uint8Array(i),
    width: a.naturalWidth || a.width,
    height: a.naturalHeight || a.height,
    x: u.x,
    y: u.y,
    scale: d,
    rotation: 0,
    flipX: !1,
    flipY: !1,
    opacity: 0.7
  }), Kt.getState().setActiveTool("reference-handle");
}, gS = async (e, t) => {
  const n = e.filter((l) => l.type.startsWith("image/"));
  if (n.length === 0)
    return;
  const s = t ?? cx();
  for (let l = 0; l < n.length; l += 1) {
    const r = l * N * 2, i = { x: s.x + r, y: s.y + r };
    await ux(n[l], i);
  }
}, xf = (e, t, n, s, l, r, i) => {
  e.strokeStyle = i, e.lineWidth = 1;
  const a = Math.floor(t / r) * r, c = t + s;
  for (let p = a; p <= c; p += r)
    e.beginPath(), e.moveTo(p + 0.5, n), e.lineTo(p + 0.5, n + l), e.stroke();
  const u = Math.floor(n / r) * r, d = n + l;
  for (let p = u; p <= d; p += r)
    e.beginPath(), e.moveTo(t, p + 0.5), e.lineTo(t + s, p + 0.5), e.stroke();
}, xS = (e, t, n, s, l, r, i) => {
  const a = m1();
  if (a.length !== 0) {
    e.save(), e.fillStyle = r, e.strokeStyle = i, e.lineWidth = Math.max(1, N * 0.08);
    for (const c of a) {
      const u = c.col * X * N, d = c.row * X * N, p = u + X * N, h = d + X * N;
      p < t || h < n || u > t + s || d > n + l || (e.fillRect(u, d, X * N, X * N), e.strokeRect(
        u + 0.5,
        d + 0.5,
        X * N - 1,
        X * N - 1
      ));
    }
    e.restore();
  }
}, yS = (e, t, n, s, l, r) => {
  e.strokeStyle = r, e.lineWidth = 2, e.beginPath(), e.moveTo(t, 0.5), e.lineTo(t + s, 0.5), e.stroke(), e.beginPath(), e.moveTo(0.5, n), e.lineTo(0.5, n + l), e.stroke();
}, vS = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, dx = (e, t) => {
  const n = document.createElement("canvas");
  n.width = X * N, n.height = X * N;
  const s = n.getContext("2d");
  if (!s)
    return null;
  s.imageSmoothingEnabled = !1;
  let l = 0;
  for (let r = 0; r < X; r += 1)
    for (let i = 0; i < X; i += 1) {
      const a = e[r * X + i];
      a !== 0 && (l += 1, s.fillStyle = t[a] ?? t[0], s.fillRect(i * N, r * N, N, N));
    }
  return { canvas: n, pixels: l };
}, wS = (e, t, n, s) => {
  const l = document.createElement("canvas");
  l.width = n * N, l.height = s * N;
  const r = l.getContext("2d");
  if (!r)
    return null;
  r.imageSmoothingEnabled = !1;
  for (let i = 0; i < s; i += 1)
    for (let a = 0; a < n; a += 1) {
      const c = e[i * n + a] ?? 0;
      c !== 0 && (r.fillStyle = t[c] ?? t[0], r.fillRect(a * N, i * N, N, N));
    }
  return { canvas: l };
}, SS = (e, t, n, s, l, r, i) => {
  const a = te.getState();
  let c = 0, u = 0;
  for (const d of a.layers) {
    if (!d.visible)
      continue;
    const p = d.store.getBlocks();
    for (const { row: h, col: f, block: g } of p) {
      const S = f * X, M = h * X, y = S * N, m = M * N, v = y + X * N, w = m + X * N;
      if (v < t || w < n || y > t + s || m > n + l)
        continue;
      c += 1;
      const _ = `${d.id}:${h}:${f}`;
      let b = i.get(_);
      if (!b) {
        const T = dx(g, r);
        T && (b = T, i.set(_, T));
      }
      b && (u += b.pixels, e.drawImage(b.canvas, y, m));
    }
  }
  return { blocksDrawn: c, pixelsDrawn: u };
}, MS = (e) => {
  const t = document.createElement("canvas");
  t.width = X * N, t.height = X * N;
  const n = t.getContext("2d");
  if (!n)
    return null;
  n.imageSmoothingEnabled = !1, n.fillStyle = "#ffffff";
  let s = !1;
  for (let l = 0; l < X; l += 1)
    for (let r = 0; r < X; r += 1)
      e[l * X + r] === 1 && (n.fillRect(r * N, l * N, N, N), s = !0);
  return s ? { canvas: t } : null;
}, _S = (e, t, n, s, l, r, i) => {
  if (i) {
    e.save(), e.fillStyle = "rgba(0, 0, 0, 0.25)", e.fillRect(t, n, s, l), e.globalCompositeOperation = "destination-out";
    for (const [a, c] of r.entries()) {
      const [u, d] = a.split(":"), p = Number(u), f = Number(d) * X * N, g = p * X * N, S = f + X * N, M = g + X * N;
      S < t || M < n || f > t + s || g > n + l || e.drawImage(c.canvas, f, g);
    }
    e.globalCompositeOperation = "source-over", e.globalAlpha = 0.18, e.fillStyle = "#ffffff";
    for (const [a, c] of r.entries()) {
      const [u, d] = a.split(":"), p = Number(u), f = Number(d) * X * N, g = p * X * N, S = f + X * N, M = g + X * N;
      S < t || M < n || f > t + s || g > n + l || e.drawImage(c.canvas, f, g);
    }
    e.restore();
  }
}, bS = (e, t, n, s, l) => {
  const r = Se.getState();
  if (r.selectedCount === 0)
    return;
  e.save(), e.fillStyle = "rgba(245, 197, 66, 0.85)";
  const i = r.store.getBlocks();
  for (const { row: a, col: c, block: u } of i) {
    const d = c * X, p = a * X, h = d * N, f = p * N, g = h + X * N, S = f + X * N;
    if (!(g < t || S < n || h > t + s || f > n + l))
      for (let M = 0; M < X; M += 1)
        for (let y = 0; y < X; y += 1) {
          if (u[M * X + y] !== 1)
            continue;
          const m = d + y, v = p + M;
          r.isSelected(m - 1, v) && r.isSelected(m + 1, v) && r.isSelected(m, v - 1) && r.isSelected(m, v + 1) || (m + v) % 2 === 0 && e.fillRect(
            m * N,
            v * N,
            N,
            N
          );
        }
  }
  e.restore();
}, kS = (e, t, n, s, l, r, i) => {
  const { tileSets: a, tileMaps: c } = V.getState();
  if (a.length === 0 || c.length === 0)
    return;
  const u = t / N, d = n / N, p = u + s / N, h = d + l / N, f = new Map(a.map((g) => [g.id, g]));
  for (const g of c) {
    const S = f.get(g.tileSetId);
    if (!S)
      continue;
    const M = S.tileWidth, y = S.tileHeight;
    if (M <= 0 || y <= 0)
      continue;
    const m = g.columns * M, v = g.rows * y, w = g.originX, _ = g.originY, b = w + m, T = _ + v;
    if (b < u || T < d || w > p || _ > h)
      continue;
    const j = Math.max(0, Math.floor((u - w) / M)), A = Math.min(
      g.columns - 1,
      Math.ceil((p - w) / M) - 1
    ), L = Math.max(0, Math.floor((d - _) / y)), C = Math.min(
      g.rows - 1,
      Math.ceil((h - _) / y) - 1
    );
    if (!(A < j || C < L))
      for (let R = L; R <= C; R += 1)
        for (let U = j; U <= A; U += 1) {
          const W = R * g.columns + U, re = g.tiles[W] ?? -1;
          if (re < 0)
            continue;
          const le = S.tiles[re];
          if (!le)
            continue;
          const ne = `${S.id}:${re}`;
          let Y = i.get(ne);
          if (!Y) {
            const E = wS(
              le.pixels,
              r,
              M,
              y
            );
            E && (Y = E, i.set(ne, E));
          }
          Y && e.drawImage(
            Y.canvas,
            (w + U * M) * N,
            (_ + R * y) * N
          );
        }
  }
}, TS = (e, t, n) => {
  const s = z.getState();
  for (const l of s.entries())
    e.fillStyle = n ?? t[l.paletteIndex] ?? t[0], e.fillRect(
      l.x * N,
      l.y * N,
      N,
      N
    );
}, jS = (e, t, n, s, l) => {
  const r = Bt.getState().items;
  if (r.length !== 0)
    for (const i of r) {
      const a = ra(i);
      if (a.maxX < t || a.maxY < n || a.minX > t + s || a.minY > n + l)
        continue;
      const c = $n(i);
      e.save(), e.globalAlpha = i.opacity, e.translate(c.centerX, c.centerY), e.rotate(c.rotationRad), e.scale(c.scale * c.flipX, c.scale * c.flipY), e.drawImage(
        i.image,
        -c.baseWidth / 2,
        -c.baseHeight / 2,
        c.baseWidth,
        c.baseHeight
      ), e.restore();
    }
}, CS = (e, t, n, s, l) => {
  const { items: r, selectedId: i } = Bt.getState();
  if (!i)
    return;
  const a = r.find((f) => f.id === i);
  if (!a)
    return;
  const c = ra(a);
  if (c.maxX < t || c.maxY < n || c.minX > t + s || c.minY > n + l)
    return;
  const u = N * 0.6, d = u / 2, p = la(a), h = Object.values(p);
  e.save(), e.strokeStyle = "rgba(245, 197, 66, 0.85)", e.lineWidth = Math.max(1, N * 0.08), e.beginPath(), e.moveTo(p.nw.x, p.nw.y), e.lineTo(p.ne.x, p.ne.y), e.lineTo(p.se.x, p.se.y), e.lineTo(p.sw.x, p.sw.y), e.closePath(), e.stroke(), e.fillStyle = "rgba(245, 197, 66, 0.9)";
  for (const f of h)
    e.fillRect(f.x - d, f.y - d, u, u);
  e.restore();
}, NS = () => {
  const e = k.useRef(null), t = k.useRef(null), n = k.useRef(null), s = k.useRef(null), l = k.useRef(/* @__PURE__ */ new Map()), r = k.useRef(/* @__PURE__ */ new Map()), i = k.useRef(/* @__PURE__ */ new Map()), a = k.useRef(0), c = Te((C) => C.setSize), [u, d] = k.useState(!1), [p, h] = k.useState({ open: !1, x: 0, y: 0 }), f = k.useRef(null), g = k.useRef({ remainingLogDelta: 0, anchor: null, frame: null });
  k.useEffect(() => {
    const C = e.current, R = t.current, U = g.current;
    if (!C || !R)
      return;
    c(C.clientWidth, C.clientHeight), s.current = new Sw();
    const W = {
      pen: new Tw(),
      spray: new Pw(),
      line: new Ww(),
      rectangle: new Kw(),
      oval: new Qw(),
      "fill-bucket": new w1(),
      text: new tS(),
      ai: new nS(),
      eyedropper: new k1(),
      "reference-handle": new I1(),
      stamp: new b1(),
      "magic-wand": new iS(),
      "selection-rect": new e1(),
      "selection-oval": new s1(),
      "selection-lasso": new o1(),
      "texture-roll": new a1(),
      "tile-sampler": new X1(),
      "tile-pen": new W1(),
      "tile-rectangle": new K1(),
      "tile-9slice": new eS(),
      "tile-export": new q1()
    }, re = W[Kt.getState().activeTool] ?? W.pen;
    s.current.setTool(re);
    const le = Kt.subscribe((se) => {
      var $;
      ($ = s.current) == null || $.setTool(W[se.activeTool] ?? W.pen);
    }), ne = ie.subscribe(() => {
      l.current.clear(), i.current.clear();
    }), Y = Se.subscribe(() => {
      r.current.clear();
    }), E = V.subscribe(() => {
      i.current.clear();
    }), H = () => {
      var Vn;
      const se = performance.now(), $ = Te.getState();
      if ($.width === 0 || $.height === 0)
        return;
      const he = vS(R, $.width, $.height);
      if (!he)
        return;
      const ye = window.devicePixelRatio || 1;
      he.clearRect(0, 0, $.width, $.height);
      const fe = ie.getState().colors, O = fe[0] ?? "#000000", Q = vt(O) ?? { r: 0, g: 0, b: 0 }, B = na(Q, ta(Q)), J = jn(B, 0.08), ce = jn(B, 0.18), pe = jn(B, 0.5), Ge = jn(B, 0.08), Me = jn(B, 0.35);
      he.fillStyle = O, he.fillRect(0, 0, $.width, $.height), he.save(), he.setTransform(
        $.camera.zoom * ye,
        0,
        0,
        $.camera.zoom * ye,
        -$.camera.x * $.camera.zoom * ye,
        -$.camera.y * $.camera.zoom * ye
      );
      const ve = $.width / $.camera.zoom, we = $.height / $.camera.zoom, { dirtyAll: Ve, blocks: ct } = te.getState().consumeDirtyBlocks();
      Ve && l.current.clear();
      for (const Qe of ct) {
        const ue = `${Qe.layerId}:${Qe.row}:${Qe.col}`, et = te.getState().layers.find((Ts) => Ts.id === Qe.layerId), hn = et == null ? void 0 : et.store.getBlock(Qe.row, Qe.col);
        if (!hn) {
          l.current.delete(ue);
          continue;
        }
        const pn = dx(hn, fe);
        pn && l.current.set(ue, pn);
      }
      (Ve || ct.length > 0) && V.getState().refreshCanvasSourcedTiles(
        Ve,
        ct.map((Qe) => ({ row: Qe.row, col: Qe.col }))
      );
      const ge = Se.getState(), mt = ge.consumeDirtyBlocks();
      mt.dirtyAll && r.current.clear();
      for (const Qe of mt.blocks) {
        const ue = `${Qe.row}:${Qe.col}`, et = ge.store.getBlock(Qe.row, Qe.col);
        if (!et) {
          r.current.delete(ue);
          continue;
        }
        const hn = MS(et);
        hn ? r.current.set(ue, hn) : r.current.delete(ue);
      }
      const Re = De.getState();
      Re.showReferenceLayer && jS(he, $.camera.x, $.camera.y, ve, we);
      let Rt = 0, Zt = 0;
      if (Re.showPixelLayer) {
        const Qe = SS(
          he,
          $.camera.x,
          $.camera.y,
          ve,
          we,
          fe,
          l.current
        );
        Rt = Qe.blocksDrawn, Zt = Qe.pixelsDrawn;
      }
      Re.showTileLayer && kS(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we,
        fe,
        i.current
      ), xS(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we,
        Ge,
        Me
      ), _S(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we,
        r.current,
        ge.selectedCount > 0
      ), bS(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we
      ), Re.showTileLayer && V.getState().tileDebugOverlay && PS(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we
      ), Re.showPixelGrid && xf(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we,
        N,
        J
      ), Re.showTileGrid && xf(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we,
        N * _e,
        ce
      ), Re.showAxes && yS(he, $.camera.x, $.camera.y, ve, we, pe);
      const jt = Kt.getState().activeTool;
      TS(he, fe, jt === "selection-rect" || jt === "selection-oval" || jt === "selection-lasso" || jt === "texture-roll" || jt === "tile-sampler" ? "rgba(245, 197, 66, 0.35)" : void 0), jt === "reference-handle" && CS(
        he,
        $.camera.x,
        $.camera.y,
        ve,
        we
      ), he.restore();
      const Pn = performance.now(), _n = Pn - se;
      _n > 50 && Pn - a.current > 500 && (a.current = Pn, (Vn = window.debugApi) == null || Vn.logPerf(
        [
          "viewport:render",
          `ms=${_n.toFixed(2)}`,
          `zoom=${$.camera.zoom.toFixed(2)}`,
          `view=${ve.toFixed(1)}x${we.toFixed(1)}`,
          `blocks=${Rt}`,
          `pixels=${Zt}`
        ].join(" ")
      )), n.current = requestAnimationFrame(H);
    };
    n.current = requestAnimationFrame(H);
    const Z = new ResizeObserver((se) => {
      for (const $ of se)
        c($.contentRect.width, $.contentRect.height);
    });
    return Z.observe(C), () => {
      le(), ne(), Y(), E(), Z.disconnect(), n.current && cancelAnimationFrame(n.current), U.frame && (cancelAnimationFrame(U.frame), U.frame = null);
    };
  }, [c]);
  const S = (C) => {
    const R = C.currentTarget.getBoundingClientRect(), U = C.clientX - R.left, W = C.clientY - R.top, re = Te.getState();
    return {
      screenX: U,
      screenY: W,
      canvasX: U / re.camera.zoom + re.camera.x,
      canvasY: W / re.camera.zoom + re.camera.y,
      primary: (C.buttons & 1) === 1,
      alt: C.altKey,
      ctrl: C.ctrlKey,
      shift: C.shiftKey
    };
  }, M = (C) => {
    C.preventDefault(), C.currentTarget.setPointerCapture(C.pointerId);
    const R = Te.getState();
    f.current = {
      screenX: C.clientX,
      screenY: C.clientY,
      cameraX: R.camera.x,
      cameraY: R.camera.y,
      zoom: R.camera.zoom
    }, d(!0), z.getState().clear();
  }, y = (C) => {
    const R = f.current;
    if (!R)
      return;
    const U = C.clientX - R.screenX, W = C.clientY - R.screenY, re = R.cameraX - U / R.zoom, le = R.cameraY - W / R.zoom;
    Te.getState().panTo(re, le);
  }, m = (C) => {
    f.current = null, d(!1), C.currentTarget.releasePointerCapture(C.pointerId);
  }, v = (C) => {
    var U;
    if (C.button === 1) {
      M(C);
      return;
    }
    if (C.button === 2)
      return;
    C.currentTarget.setPointerCapture(C.pointerId);
    const R = S(C);
    (U = s.current) == null || U.handleEvent("begin", R);
  }, w = (C) => {
    var W;
    if (f.current) {
      y(C);
      return;
    }
    const R = S(C), U = (C.buttons & 1) === 1;
    (W = s.current) == null || W.handleEvent(U ? "move" : "hover", R);
  }, _ = (C) => {
    var U;
    if (f.current) {
      m(C);
      return;
    }
    const R = S(C);
    (U = s.current) == null || U.handleEvent("end", R), C.currentTarget.releasePointerCapture(C.pointerId);
  }, b = (C) => {
    var U;
    if (f.current) {
      m(C);
      return;
    }
    const R = S(C);
    (U = s.current) == null || U.handleEvent("cancel", R);
  }, T = (C) => {
    var R;
    (R = C.dataTransfer) != null && R.types.includes("Files") && (C.preventDefault(), C.dataTransfer.dropEffect = "copy");
  }, j = (C) => {
    var ne, Y;
    if (!((Y = (ne = C.dataTransfer) == null ? void 0 : ne.files) != null && Y.length))
      return;
    C.preventDefault();
    const R = C.currentTarget.getBoundingClientRect(), U = C.clientX - R.left, W = C.clientY - R.top, re = Te.getState(), le = {
      x: U / re.camera.zoom + re.camera.x,
      y: W / re.camera.zoom + re.camera.y
    };
    gS(Array.from(C.dataTransfer.files), le);
  }, A = (C) => {
    if (C.deltaY === 0)
      return;
    C.preventDefault();
    const R = C.currentTarget.getBoundingClientRect(), U = C.clientX - R.left, W = C.clientY - R.top, re = Te.getState(), le = {
      x: U / re.camera.zoom + re.camera.x,
      y: W / re.camera.zoom + re.camera.y
    }, ne = C.deltaMode === 1 ? 16 : C.deltaMode === 2 ? Math.max(240, re.height) : 1;
    let E = -(C.deltaY * ne) * cw;
    if (E > nr ? E = nr : E < -nr && (E = -nr), g.current.remainingLogDelta += E, g.current.anchor = le, g.current.frame)
      return;
    const H = () => {
      const Z = g.current, se = Z.remainingLogDelta;
      if (!Number.isFinite(se) || Math.abs(se) < 5e-4) {
        Z.remainingLogDelta = 0, Z.frame = null;
        return;
      }
      const $ = se * 0.35, ye = Math.max(1e-3, nr * 0.25), fe = Math.sign($) * Math.min(Math.abs($), ye), O = Te.getState(), Q = O.camera.zoom, J = Q * Math.exp(fe) - Q;
      if (!Number.isFinite(J) || Math.abs(J) < 1e-12) {
        Z.remainingLogDelta = 0, Z.frame = null;
        return;
      }
      O.zoomBy(J, Z.anchor ?? void 0), Z.remainingLogDelta -= fe, Z.frame = requestAnimationFrame(H);
    };
    g.current.frame = requestAnimationFrame(H);
  }, L = (C) => {
    C.preventDefault(), h({ open: !0, x: C.clientX, y: C.clientY });
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "viewport", ref: e, children: [
    /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: v,
        onPointerMove: w,
        onPointerUp: _,
        onPointerLeave: b,
        onContextMenu: L,
        onDragOver: T,
        onDrop: j,
        onWheel: A,
        style: {
          cursor: u ? "grabbing" : "crosshair"
        }
      }
    ),
    p.open && /* @__PURE__ */ o.jsx(
      oS,
      {
        x: p.x,
        y: p.y,
        onClose: () => h((C) => C.open ? { ...C, open: !1 } : C)
      }
    )
  ] });
}, PS = (e, t, n, s, l) => {
  const { tileMaps: r } = V.getState();
  if (r.length !== 0) {
    e.save(), e.font = `${Math.max(10, N)}px sans-serif`, e.textBaseline = "top", e.fillStyle = "rgba(255, 186, 73, 0.95)", e.strokeStyle = "rgba(255, 186, 73, 0.5)", e.lineWidth = Math.max(1, N * 0.06);
    for (const i of r) {
      const a = i.originX * N, c = i.originY * N, u = i.columns * N, d = i.rows * N, p = a + u, h = c + d;
      p < t || h < n || a > t + s || c > n + l || (e.strokeRect(a, c, u, d), e.fillText(
        `map ${i.id.slice(0, 6)} origin=(${i.originX},${i.originY}) size=${i.columns}x${i.rows}`,
        a + N * 0.5,
        c + N * 0.5
      ));
    }
    e.restore();
  }
}, IS = () => {
  const e = te.getState();
  let t = 1 / 0, n = 1 / 0, s = -1 / 0, l = -1 / 0;
  for (const r of e.layers)
    for (const { row: i, col: a, block: c } of r.store.getBlocks())
      for (let u = 0; u < X; u += 1)
        for (let d = 0; d < X; d += 1) {
          if (c[u * X + d] === 0)
            continue;
          const h = (a * X + d) * N, f = (i * X + u) * N;
          t = Math.min(t, h), n = Math.min(n, f), s = Math.max(s, h + N), l = Math.max(l, f + N);
        }
  return Number.isFinite(t) ? { minX: t, minY: n, maxX: s, maxY: l } : null;
}, ES = () => {
  const e = Te.getState(), t = IS();
  let n = t ? t.minX : -ts / 2, s = t ? t.minY : -ts / 2, l = t ? t.maxX : ts / 2, r = t ? t.maxY : ts / 2;
  if (e.width > 0 && e.height > 0) {
    const c = e.width / e.camera.zoom, u = e.height / e.camera.zoom;
    n = Math.min(n, e.camera.x), s = Math.min(s, e.camera.y), l = Math.max(l, e.camera.x + c), r = Math.max(r, e.camera.y + u);
  }
  const i = l - n, a = r - s;
  if (i < ts) {
    const c = (ts - i) / 2;
    n -= c, l += c;
  }
  if (a < ts) {
    const c = (ts - a) / 2;
    s -= c, r += c;
  }
  return { minX: n, minY: s, maxX: l, maxY: r };
}, hx = (e, t) => {
  const n = ES(), s = n.maxX - n.minX, l = n.maxY - n.minY, r = Math.min(e / s, t / l), i = (e - s * r) / 2 - n.minX * r, a = (t - l * r) / 2 - n.minY * r;
  return { bounds: n, scale: r, offsetX: i, offsetY: a };
}, AS = (e, t, n) => {
  const s = Te.getState(), l = ie.getState().colors, r = l[0] ?? "#000000", i = vt(r) ?? { r: 0, g: 0, b: 0 }, a = na(i, ta(i)), c = vd(as(i, a, 0.08)), u = jn(a, 0.12), d = jn(a, 0.6), p = jn(a, 0.8), { bounds: h, scale: f, offsetX: g, offsetY: S } = hx(t, n), M = h.maxX - h.minX, y = h.maxY - h.minY;
  e.clearRect(0, 0, t, n), e.fillStyle = r, e.fillRect(0, 0, t, n), e.fillStyle = c, e.fillRect(
    g + h.minX * f,
    S + h.minY * f,
    M * f,
    y * f
  ), e.strokeStyle = u, e.strokeRect(
    g + h.minX * f,
    S + h.minY * f,
    M * f,
    y * f
  );
  const m = g, v = S;
  e.strokeStyle = d, e.lineWidth = 2, e.beginPath(), e.moveTo(m + 0.5, S + h.minY * f), e.lineTo(m + 0.5, S + h.maxY * f), e.stroke(), e.beginPath(), e.moveTo(g + h.minX * f, v + 0.5), e.lineTo(g + h.maxX * f, v + 0.5), e.stroke();
  const w = te.getState();
  let _ = 0, b = 0;
  if (De.getState().showPixelLayer) {
    const T = f * N, j = Math.max(1, Math.floor(1 / Math.max(T * 0.75, 0.01)));
    for (const A of w.layers)
      if (A.visible)
        for (const { row: L, col: C, block: R } of A.store.getBlocks()) {
          _ += 1;
          for (let U = 0; U < X; U += j)
            for (let W = 0; W < X; W += j) {
              const re = R[U * X + W];
              if (re === 0)
                continue;
              b += 1;
              const le = (C * X + W) * N, ne = (L * X + U) * N;
              e.fillStyle = l[re] ?? l[0];
              const Y = Math.max(1, T * j);
              e.fillRect(
                g + le * f,
                S + ne * f,
                Y,
                Y
              );
            }
        }
  }
  if (s.width > 0 && s.height > 0) {
    const T = s.width / s.camera.zoom, j = s.height / s.camera.zoom, A = s.camera.x * f + g, L = s.camera.y * f + S, C = T * f, R = j * f;
    e.strokeStyle = p, e.lineWidth = 2, e.strokeRect(A, L, C, R);
  }
  return { blocksDrawn: _, pixelsDrawn: b, zoom: s.camera.zoom };
}, RS = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, LS = () => {
  const e = k.useRef(null), t = k.useRef(null), n = k.useRef(!1), s = k.useRef(null), l = k.useRef(null), r = k.useRef(0), i = Te((v) => v.panTo), a = Te((v) => v.zoomBy), c = Te((v) => v.resetCamera), u = Te((v) => v.camera), [d, p] = k.useState(String(Math.round(u.x))), [h, f] = k.useState(String(Math.round(u.y)));
  k.useEffect(() => {
    p(String(Math.round(u.x))), f(String(Math.round(u.y)));
  }, [u.x, u.y]);
  const g = () => {
    const v = Number(d), w = Number(h);
    Number.isFinite(v) && Number.isFinite(w) && i(v, w);
  };
  k.useEffect(() => {
    const v = e.current, w = t.current;
    if (!v || !w)
      return;
    const _ = () => {
      var Y;
      const C = RS(w, v.clientWidth, v.clientHeight);
      if (!C)
        return;
      const R = performance.now(), { blocksDrawn: U, pixelsDrawn: W, zoom: re } = AS(
        C,
        v.clientWidth,
        v.clientHeight
      ), le = performance.now(), ne = le - R;
      ne > 50 && le - r.current > 500 && (r.current = le, (Y = window.debugApi) == null || Y.logPerf(
        [
          "minimap:render",
          `ms=${ne.toFixed(2)}`,
          `zoom=${re.toFixed(2)}`,
          `blocks=${U}`,
          `pixels=${W}`
        ].join(" ")
      ));
    };
    _();
    const b = Te.subscribe(_), T = te.subscribe(_), j = ie.subscribe(_), A = De.subscribe(_), L = new ResizeObserver(_);
    return L.observe(v), () => {
      b(), T(), j(), A(), L.disconnect();
    };
  }, []);
  const S = (v) => {
    const w = v.currentTarget.getBoundingClientRect(), _ = v.clientX - w.left, b = v.clientY - w.top, { scale: T, offsetX: j, offsetY: A } = hx(w.width, w.height);
    return {
      x: (_ - j) / T,
      y: (b - A) / T
    };
  }, M = (v) => {
    v.currentTarget.setPointerCapture(v.pointerId), n.current = !0;
    const w = S(v), _ = Te.getState(), b = _.width / _.camera.zoom, T = _.height / _.camera.zoom;
    s.current = {
      x: w.x - b / 2,
      y: w.y - T / 2
    };
    const j = () => {
      if (!n.current || !s.current)
        return;
      const A = Te.getState().camera, L = s.current.x - A.x, C = s.current.y - A.y, R = Math.hypot(L, C);
      if (R > 0.01) {
        const W = Math.min(12, R * 0.25);
        i(
          A.x + L / R * W,
          A.y + C / R * W
        );
      }
      l.current = requestAnimationFrame(j);
    };
    l.current = requestAnimationFrame(j);
  }, y = (v) => {
    if (!n.current)
      return;
    const w = S(v), _ = Te.getState(), b = _.width / _.camera.zoom, T = _.height / _.camera.zoom;
    s.current = {
      x: w.x - b / 2,
      y: w.y - T / 2
    };
  }, m = (v) => {
    n.current = !1, s.current = null, l.current && (cancelAnimationFrame(l.current), l.current = null), v.currentTarget.releasePointerCapture(v.pointerId);
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "minimap", children: [
    /* @__PURE__ */ o.jsx("div", { className: "minimap__canvas", ref: e, children: /* @__PURE__ */ o.jsx(
      "canvas",
      {
        ref: t,
        onPointerDown: M,
        onPointerMove: y,
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
            value: d,
            onChange: (v) => p(v.target.value),
            onBlur: g,
            onKeyDown: (v) => {
              v.key === "Enter" && g();
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
            value: h,
            onChange: (v) => f(v.target.value),
            onBlur: g,
            onKeyDown: (v) => {
              v.key === "Enter" && g();
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
}, DS = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, YS = (e, t, n) => {
  const s = Tt.getState(), l = ie.getState().colors, r = l[0] ?? "#000000", i = vt(r) ?? { r: 0, g: 0, b: 0 }, a = na(i, ta(i)), c = vd(as(i, a, 0.1)), u = jn(a, 0.12);
  if (e.clearRect(0, 0, t, n), e.fillStyle = r, e.fillRect(0, 0, t, n), s.pixels.length === 0 || s.width === 0 || s.height === 0)
    return;
  const d = 12, p = Math.max(1, t - d * 2), h = Math.max(1, n - d * 2), f = Math.min(
    p / s.width,
    h / s.height
  ), g = s.width * f, S = s.height * f, M = (t - g) / 2, y = (n - S) / 2;
  e.fillStyle = c, e.fillRect(M, y, g, S), e.strokeStyle = u, e.strokeRect(M, y, g, S);
  for (const m of s.pixels) {
    const v = l[m.paletteIndex] ?? l[0];
    e.fillStyle = v, e.fillRect(
      M + m.x * f,
      y + m.y * f,
      f,
      f
    );
  }
}, BS = () => {
  const e = k.useRef(null), t = k.useRef(null), n = Tt((s) => s);
  return k.useEffect(() => {
    const s = e.current, l = t.current;
    if (!s || !l)
      return;
    const r = () => {
      const u = DS(l, s.clientWidth, s.clientHeight);
      u && YS(u, s.clientWidth, s.clientHeight);
    };
    r();
    const i = Tt.subscribe(r), a = ie.subscribe(r), c = new ResizeObserver(r);
    return c.observe(s), () => {
      i(), a(), c.disconnect();
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
}, XS = () => typeof crypto < "u" && "randomUUID" in crypto ? crypto.randomUUID() : `bookmark-${Date.now()}-${Math.random().toString(16).slice(2)}`, FS = () => {
  const e = Te.getState(), t = e.width / e.camera.zoom, n = e.height / e.camera.zoom;
  return {
    x: e.camera.x + t / 2,
    y: e.camera.y + n / 2,
    zoom: e.camera.zoom
  };
}, OS = (e, t, n) => {
  const s = Te.getState(), l = n ?? s.camera.zoom, r = s.width, i = s.height;
  if (r <= 0 || i <= 0 || !Number.isFinite(l) || l <= 0)
    return;
  const a = e - r / (2 * l), c = t - i / (2 * l);
  s.setCamera({ x: a, y: c, zoom: l });
}, rs = lt((e, t) => ({
  items: [],
  addFromCamera: () => e((n) => {
    const s = FS(), l = XS(), r = `Bookmark ${n.items.length + 1}`;
    return {
      items: [
        ...n.items,
        { id: l, name: r, centerX: s.x, centerY: s.y, zoom: s.zoom }
      ]
    };
  }),
  rename: (n, s) => e((l) => ({
    items: l.items.map((r) => r.id === n ? { ...r, name: s } : r)
  })),
  remove: (n) => e((s) => ({
    items: s.items.filter((l) => l.id !== n)
  })),
  move: (n, s) => e((l) => {
    const r = l.items.findIndex((u) => u.id === n);
    if (r === -1)
      return l;
    const i = s === "up" ? r - 1 : r + 1;
    if (i < 0 || i >= l.items.length)
      return l;
    const a = [...l.items], [c] = a.splice(r, 1);
    return a.splice(i, 0, c), { items: a };
  }),
  jumpTo: (n) => {
    const s = t().items.find((l) => l.id === n);
    s && OS(s.centerX, s.centerY, s.zoom);
  },
  clear: () => e({ items: [] })
})), Xi = (e) => Math.round(e / N), zS = (e, t) => {
  const n = Te.getState(), s = n.camera.zoom, l = n.width, r = n.height;
  if (l <= 0 || r <= 0 || !Number.isFinite(s) || s <= 0)
    return;
  const i = e - l / (2 * s), a = t - r / (2 * s);
  n.setCamera({ x: i, y: a });
}, HS = () => {
  const e = rs((c) => c.items), t = rs((c) => c.addFromCamera), n = rs((c) => c.rename), s = rs((c) => c.remove), l = rs((c) => c.move), r = rs((c) => c.jumpTo), i = Bt((c) => c.items), a = k.useMemo(
    () => i.map((c) => {
      const u = ra(c), d = (u.minX + u.maxX) / 2, p = (u.minY + u.maxY) / 2;
      return {
        id: c.id,
        name: c.assetFilename,
        centerX: d,
        centerY: p,
        x: Xi(d),
        y: Xi(p)
      };
    }),
    [i]
  );
  return /* @__PURE__ */ o.jsxs("div", { className: "nav-panel", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__header", children: [
        /* @__PURE__ */ o.jsx("div", { className: "nav-panel__title", children: "Bookmarks" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "nav-panel__button",
            onClick: t,
            children: "Add"
          }
        )
      ] }),
      e.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "nav-panel__empty", children: "No bookmarks yet." }) : /* @__PURE__ */ o.jsx("div", { className: "nav-panel__list", children: e.map((c, u) => /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              className: "nav-panel__name",
              value: c.name,
              "aria-label": `Bookmark name ${u + 1}`,
              onChange: (d) => n(c.id, d.currentTarget.value)
            }
          ),
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__coords", children: [
            Xi(c.centerX),
            ",",
            Xi(c.centerY),
            " • z",
            c.zoom.toFixed(2)
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__actions", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              onClick: () => r(c.id),
              children: "Go"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "nav-panel__button",
              disabled: u === 0,
              onClick: () => l(c.id, "up"),
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
              disabled: u === e.length - 1,
              onClick: () => l(c.id, "down"),
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
              onClick: () => s(c.id),
              children: "Delete"
            }
          )
        ] })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__section", children: [
      /* @__PURE__ */ o.jsx("div", { className: "nav-panel__header", children: /* @__PURE__ */ o.jsx("div", { className: "nav-panel__title", children: "References" }) }),
      a.length === 0 ? /* @__PURE__ */ o.jsx("div", { className: "nav-panel__empty", children: "No references yet." }) : /* @__PURE__ */ o.jsx("div", { className: "nav-panel__list", children: a.map((c) => /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__row", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__meta", children: [
          /* @__PURE__ */ o.jsx("div", { className: "nav-panel__name nav-panel__name--readonly", children: c.name }),
          /* @__PURE__ */ o.jsxs("div", { className: "nav-panel__coords", children: [
            c.x,
            ",",
            c.y
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("div", { className: "nav-panel__actions", children: /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "nav-panel__button",
            onClick: () => zS(c.centerX, c.centerY),
            children: "Go"
          }
        ) })
      ] }, c.id)) })
    ] })
  ] });
}, WS = () => {
  const e = te((u) => u.layers), t = te((u) => u.activeLayerId), n = te((u) => u.createLayer), s = te((u) => u.deleteLayer), l = te((u) => u.renameLayer), r = te((u) => u.toggleLayerVisible), i = te((u) => u.moveLayer), a = te((u) => u.setActiveLayer), c = [...e].reverse();
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
      )
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "layers-panel__list", role: "list", children: c.map((u) => {
      const d = e.findIndex((g) => g.id === u.id), p = d === e.length - 1, h = d === 0, f = u.id === t;
      return /* @__PURE__ */ o.jsxs(
        "div",
        {
          role: "listitem",
          className: "layers-panel__row",
          "data-active": f,
          onMouseDown: () => a(u.id),
          children: [
            /* @__PURE__ */ o.jsx("label", { className: "layers-panel__toggle", title: "Toggle visibility", children: /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "checkbox",
                checked: u.visible,
                onChange: () => r(u.id),
                onMouseDown: (g) => g.stopPropagation()
              }
            ) }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                className: "layers-panel__name",
                value: u.name,
                onChange: (g) => l(u.id, g.target.value),
                onMouseDown: (g) => g.stopPropagation()
              }
            ),
            /* @__PURE__ */ o.jsxs("div", { className: "layers-panel__move", children: [
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move up",
                  disabled: p,
                  onMouseDown: (g) => g.stopPropagation(),
                  onClick: () => i(u.id, "up"),
                  children: "↑"
                }
              ),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  className: "panel__item",
                  title: "Move down",
                  disabled: h,
                  onMouseDown: (g) => g.stopPropagation(),
                  onClick: () => i(u.id, "down"),
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
}, US = () => {
  const e = Tt(
    (l) => l.pixels.length > 0 && l.width > 0 && l.height > 0
  ), [t, n] = k.useState("minimap"), s = k.useRef(e);
  return k.useEffect(() => {
    !e && t === "paste" && n("minimap");
  }, [e, t]), k.useEffect(() => {
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
    t === "nav" ? /* @__PURE__ */ o.jsx(HS, {}) : t === "layers" ? /* @__PURE__ */ o.jsx(WS, {}) : t === "paste" && e ? /* @__PURE__ */ o.jsx(BS, {}) : /* @__PURE__ */ o.jsx(LS, {})
  ] });
}, $S = (e, t) => {
  var n;
  return ((n = e.find((s) => s.value === t)) == null ? void 0 : n.label) ?? t;
}, yf = (e, t, n) => Math.min(n, Math.max(t, e)), en = ({
  value: e,
  options: t,
  onChange: n,
  disabled: s,
  ariaLabel: l,
  className: r
}) => {
  const a = `dropdown-${k.useId()}`, c = k.useRef(null), u = k.useRef(null), [d, p] = k.useState(!1), [h, f] = k.useState(0), [g, S] = k.useState(null), M = k.useMemo(() => $S(t, e), [t, e]), y = k.useMemo(
    () => Math.max(0, t.findIndex((_) => _.value === e)),
    [t, e]
  ), m = () => {
    const _ = c.current;
    if (!_)
      return null;
    const b = _.getBoundingClientRect(), T = window.innerHeight || document.documentElement.clientHeight || 0, j = 260, A = T - b.bottom - 12, L = b.top - 12, C = A >= Math.min(j, 180) || A >= L, R = yf(C ? A : L, 120, j), U = C ? b.bottom + 6 : b.top - 6 - R;
    return { left: b.left, top: U, width: b.width, maxHeight: R };
  };
  k.useEffect(() => {
    if (!d)
      return;
    f(y);
    const _ = m();
    S(_);
    const b = window.requestAnimationFrame(() => {
      var j;
      const T = (j = u.current) == null ? void 0 : j.querySelector('[data-highlighted="true"]');
      T == null || T.scrollIntoView({ block: "nearest" });
    });
    return () => window.cancelAnimationFrame(b);
  }, [d]), k.useEffect(() => {
    if (!d)
      return;
    const _ = (j) => {
      var A, L;
      if (j.key === "Escape") {
        j.preventDefault(), p(!1), (A = c.current) == null || A.focus();
        return;
      }
      if (j.key === "ArrowDown" || j.key === "ArrowUp") {
        j.preventDefault();
        const C = j.key === "ArrowDown" ? 1 : -1;
        f((R) => yf(R + C, 0, t.length - 1));
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
        const C = t[h];
        C && !C.disabled && (n(C.value), p(!1), (L = c.current) == null || L.focus());
      }
    }, b = (j) => {
      var L, C;
      const A = j.target;
      A && ((L = c.current) != null && L.contains(A) || (C = u.current) != null && C.contains(A) || p(!1));
    }, T = (j) => {
      var C;
      const A = (j == null ? void 0 : j.target) ?? null;
      if (A && ((C = u.current) != null && C.contains(A)))
        return;
      const L = m();
      S(L);
    };
    return window.addEventListener("keydown", _), window.addEventListener("pointerdown", b, { capture: !0 }), window.addEventListener("resize", T), window.addEventListener("scroll", T, { capture: !0 }), () => {
      window.removeEventListener("keydown", _), window.removeEventListener("pointerdown", b, { capture: !0 }), window.removeEventListener("resize", T), window.removeEventListener("scroll", T, { capture: !0 });
    };
  }, [d, t, h, n]), k.useEffect(() => {
    var b;
    if (!d)
      return;
    const _ = (b = u.current) == null ? void 0 : b.querySelector('[data-highlighted="true"]');
    _ == null || _.scrollIntoView({ block: "nearest" });
  }, [d, h]);
  const v = (_) => {
    s || (_.key === "ArrowDown" || _.key === "ArrowUp") && (_.preventDefault(), p(!0));
  }, w = (_) => {
    var b;
    n(_), p(!1), (b = c.current) == null || b.focus();
  };
  return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs(
      "button",
      {
        ref: c,
        type: "button",
        className: r ?? "panel__select",
        "aria-label": l,
        "aria-haspopup": "listbox",
        "aria-expanded": d,
        "aria-controls": a,
        disabled: s,
        onClick: () => p((_) => !_),
        onKeyDown: v,
        children: [
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__label", children: M }),
          /* @__PURE__ */ o.jsx("span", { className: "dropdown-select__chevron", "aria-hidden": "true", children: "▾" })
        ]
      }
    ),
    d && g && wr.createPortal(
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
          children: t.map((_, b) => /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              role: "option",
              className: "dropdown-select__option",
              "data-active": _.value === e,
              "data-highlighted": b === h,
              disabled: _.disabled,
              "aria-selected": _.value === e,
              onMouseMove: () => f(b),
              onClick: () => {
                _.disabled || w(_.value);
              },
              children: _.render ?? _.label
            },
            _.value
          ))
        }
      ),
      document.body
    )
  ] });
}, vf = (e) => /^#[0-9a-f]{6}$/i.test(e), wf = (e) => {
  const t = e.trim().toLowerCase();
  return t ? t.startsWith("#") ? t : `#${t}` : "";
}, Le = (e) => Math.min(1, Math.max(0, e)), mn = (e, t, n) => Math.round(Math.min(n, Math.max(t, e))), Sd = (e) => (e % 360 + 360) % 360, yc = (e) => e.toString(16).padStart(2, "0"), ln = (e) => `#${yc(e.r)}${yc(e.g)}${yc(e.b)}`, px = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), r = Math.min(t, n, s), i = l - r;
  let a = 0;
  i !== 0 && (l === t ? a = (n - s) / i % 6 : l === n ? a = (s - t) / i + 2 : a = (t - n) / i + 4, a *= 60), a < 0 && (a += 360);
  const c = (l + r) / 2, u = i === 0 ? 0 : i / (1 - Math.abs(2 * c - 1));
  return { h: a, s: u, l: c };
}, KS = (e) => {
  const t = e.r / 255, n = e.g / 255, s = e.b / 255, l = Math.max(t, n, s), r = Math.min(t, n, s), i = l - r;
  let a = 0;
  i !== 0 && (l === t ? a = (n - s) / i % 6 : l === n ? a = (s - t) / i + 2 : a = (t - n) / i + 4, a *= 60), a < 0 && (a += 360);
  const c = l === 0 ? 0 : i / l;
  return { h: a, s: c, v: l };
}, Mu = (e) => {
  const t = Sd(e.h), n = Le(e.s), s = Le(e.l), l = (1 - Math.abs(2 * s - 1)) * n, r = l * (1 - Math.abs(t / 60 % 2 - 1)), i = s - l / 2;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = r) : t < 120 ? (a = r, c = l) : t < 180 ? (c = l, u = r) : t < 240 ? (c = r, u = l) : t < 300 ? (a = r, u = l) : (a = l, u = r), {
    r: Math.round((a + i) * 255),
    g: Math.round((c + i) * 255),
    b: Math.round((u + i) * 255)
  };
}, sl = (e) => {
  const t = Sd(e.h), n = Le(e.s), s = Le(e.v), l = s * n, r = l * (1 - Math.abs(t / 60 % 2 - 1)), i = s - l;
  let a = 0, c = 0, u = 0;
  return t < 60 ? (a = l, c = r) : t < 120 ? (a = r, c = l) : t < 180 ? (c = l, u = r) : t < 240 ? (c = r, u = l) : t < 300 ? (a = r, u = l) : (a = l, u = r), {
    r: Math.round((a + i) * 255),
    g: Math.round((c + i) * 255),
    b: Math.round((u + i) * 255)
  };
}, tn = (e) => {
  const t = /* @__PURE__ */ new Set();
  return e.filter((n) => {
    const s = n.toLowerCase();
    return t.has(s) ? !1 : (t.add(s), !0);
  });
}, GS = (e) => {
  const t = vt(e) ?? { r: 255, g: 255, b: 255 }, n = { r: 0, g: 0, b: 0 }, s = { r: 255, g: 255, b: 255 }, l = px(t), r = (A, L, C) => ln(
    Mu({
      h: Sd(l.h + A),
      s: Le(L),
      l: Le(C)
    })
  ), i = (A, L = 0, C = 0) => r(A, l.s + L, l.l + C), a = tn([
    i(0, 0, 0.12),
    i(0, 0, -0.12),
    i(180, 0, 0),
    i(180, 0, 0.12),
    i(180, 0, -0.12)
  ]), c = tn([
    i(-40),
    i(-20),
    i(0),
    i(20),
    i(40)
  ]), u = tn([
    i(0),
    i(150),
    i(210),
    i(150, 0, 0.12),
    i(210, 0, -0.12)
  ]), d = tn([
    i(0),
    i(120),
    i(240),
    i(120, 0, 0.12),
    i(240, 0, -0.12)
  ]), p = tn([
    i(0),
    i(90),
    i(180),
    i(270)
  ]), h = tn([
    ln(as(t, n, 0.7)),
    ln(as(t, n, 0.5)),
    ln(as(t, n, 0.3)),
    ln(as(t, s, 0.25)),
    ln(as(t, s, 0.5))
  ]), f = Le(l.s * 0.45 + 0.15), g = Le(l.l * 0.4 + 0.6), S = tn([
    r(-25, f, Le(g + 0.05)),
    r(-10, f, Le(g + 0.02)),
    r(0, f, g),
    r(10, f, Le(g - 0.03)),
    r(25, f, Le(g - 0.06))
  ]), M = Le(l.s * 0.35 + 0.12), y = Le(l.l * 0.8 + 0.1), m = tn([
    r(-30, M, Le(y - 0.08)),
    r(-15, M, y),
    r(0, M, Le(y + 0.05)),
    r(15, M, Le(y - 0.03)),
    r(30, M, Le(y + 0.08))
  ]), v = Le(Math.max(0.7, l.s * 1.25)), w = Le(l.l * 0.85 + 0.06), _ = tn([
    r(-20, v, Le(w - 0.08)),
    r(-10, v, w),
    r(0, v, Le(w + 0.04)),
    r(15, v, Le(w - 0.04)),
    r(30, v, Le(w + 0.08))
  ]), b = Le(l.s * 0.9 + 0.05), T = tn([
    r(0, b, 0.14),
    r(0, b, 0.3),
    r(0, b, 0.5),
    r(0, b, 0.7),
    r(0, b, 0.86)
  ]), j = tn([
    r(0, l.s, Le(l.l - 0.06)),
    r(45, l.s, l.l),
    r(90, l.s, Le(l.l + 0.05)),
    r(135, l.s, l.l),
    r(180, l.s, Le(l.l - 0.04))
  ]);
  return [
    { id: "complementary", label: "Complementary", colors: a },
    { id: "analogous", label: "Analogous", colors: c },
    { id: "split", label: "Split Complementary", colors: u },
    { id: "triad", label: "Triad", colors: d },
    { id: "tetrad", label: "Tetrad", colors: p },
    { id: "tints", label: "Tints + Shades", colors: h },
    { id: "pastel", label: "Pastel", colors: S },
    { id: "muted", label: "Muted", colors: m },
    { id: "vibrant", label: "Vibrant", colors: _ },
    { id: "mono", label: "Monochrome Ramp", colors: T },
    { id: "hue-sweep", label: "Hue Sweep", colors: j }
  ];
}, VS = () => {
  const e = ie((P) => P.colors), t = ie((P) => P.selectedIndices), n = ie((P) => P.setColor), s = ie((P) => P.setPalette), l = ie((P) => P.setSelectedIndices), r = ie((P) => P.getActiveIndex()), i = ie((P) => P.addColor), a = (P, I) => {
    const G = P.filter((ae) => ae !== I);
    return G.push(I), G;
  }, [c, u] = k.useState({
    open: !1,
    x: 0,
    y: 0,
    index: null
  }), [d, p] = k.useState("none"), [h, f] = k.useState(!1), [g, S] = k.useState(!1), [M, y] = k.useState(""), [m, v] = k.useState(!1), [w, _] = k.useState(null), [b, T] = k.useState(null), [j, A] = k.useState({ r: 255, g: 255, b: 255 }), [L, C] = k.useState({
    r: 255,
    g: 255,
    b: 255
  }), [R, U] = k.useState("#ffffff"), [W, re] = k.useState(() => {
    try {
      const P = window.localStorage.getItem("pss.paletteRows"), I = P ? Number(P) : 3, G = Number.isFinite(I) ? Math.floor(I) : 3;
      return Math.min(4, Math.max(2, G));
    } catch {
      return 3;
    }
  }), le = k.useRef(null), ne = k.useRef(!1), Y = k.useRef(null), E = k.useRef(!1), H = k.useRef(null), Z = k.useRef(!1), se = k.useRef(/* @__PURE__ */ new Set()), $ = k.useRef(!1), he = Ie.useMemo(
    () => typeof navigator < "u" && navigator.platform.toLowerCase().includes("mac"),
    []
  ), ye = Ie.useMemo(() => KS(j), [j]), fe = Ie.useMemo(() => px(j), [j]), O = () => {
    u((P) => P.open ? { ...P, open: !1, index: null } : P);
  }, Q = (P, I) => {
    P.preventDefault(), typeof I == "number" && (new Set(t).has(I) || l([I]), le.current = I), u({
      open: !0,
      x: P.clientX,
      y: P.clientY,
      index: I
    });
  };
  k.useEffect(() => {
    if (!c.open)
      return;
    const P = (G) => {
      var je;
      const ae = G.target;
      (je = ae == null ? void 0 : ae.closest) != null && je.call(ae, ".dropdown-select__menu") || Y.current && Y.current.contains(G.target) || O();
    }, I = (G) => {
      G.key === "Escape" && O();
    };
    return window.addEventListener("mousedown", P), window.addEventListener("keydown", I), () => {
      window.removeEventListener("mousedown", P), window.removeEventListener("keydown", I);
    };
  }, [c.open]), k.useLayoutEffect(() => {
    if (!c.open || !Y.current)
      return;
    const P = Y.current.getBoundingClientRect(), I = 8, G = Math.max(I, window.innerWidth - P.width - I), ae = Math.max(I, window.innerHeight - P.height - I), je = Math.min(Math.max(I, c.x), G), Ct = Math.min(Math.max(I, c.y), ae);
    (je !== c.x || Ct !== c.y) && u((ut) => ({ ...ut, x: je, y: Ct }));
  }, [c.open, c.x, c.y]);
  const B = t.length === 1 ? t[0] ?? null : null, J = B !== null && B >= 0 && B < e.length, ce = J && B !== null ? e[B] : "#ffffff", pe = c.open && c.index !== null && c.index >= 0 && c.index < e.length ? e[c.index] : e[t[t.length - 1] ?? 0] ?? "#ffffff", Ge = Ie.useMemo(
    () => GS(pe),
    [pe]
  ), Me = k.useCallback((P) => {
    const I = {
      r: mn(P.r, 0, 255),
      g: mn(P.g, 0, 255),
      b: mn(P.b, 0, 255)
    };
    A(I), U(ln(I));
  }, []), ve = k.useCallback((P, I) => {
    const G = vt(I) ?? { r: 255, g: 255, b: 255 };
    T(P), C(G), A(G), U(ln(G));
  }, []), we = k.useCallback(() => {
    T(null);
  }, []), Ve = k.useCallback(() => {
    if (!b)
      return;
    const P = ln(j);
    if (b.mode === "set") {
      n(b.index, P), T(null);
      return;
    }
    i(P), T(null);
  }, [i, b, j, n]), ct = (b == null ? void 0 : b.mode) === "set" ? "Set Color" : "Add Color", ge = () => {
    !J || B === null || (O(), ve({ mode: "set", index: B }, ce));
  }, mt = () => {
    O(), ve({ mode: "add" }, "#ffffff");
  }, Re = new Set(t), Rt = [...Re].sort((P, I) => P - I), Zt = Rt.length, jt = Zt > 0, Gn = Zt > 1, Pn = e.length - Zt >= 1, _n = (P) => {
    l(P);
  }, Vn = () => {
    if (t.length === 0)
      return;
    const P = t.filter((I) => I >= 0 && I < e.length);
    P.length !== t.length && l(P);
  };
  k.useEffect(Vn, [e.length, t, l]);
  const Qe = () => {
    if (!jt || !Pn)
      return;
    const P = new Set(Rt), I = e.filter((G, ae) => !P.has(ae));
    I.length !== 0 && (s(I), O());
  }, ue = () => {
    if (!Gn)
      return;
    const P = In.columns, I = [...Re].sort((je, Ct) => {
      const ut = Math.floor(je / P), En = je % P, An = Math.floor(Ct / P), Qn = Ct % P;
      return En !== Qn ? En - Qn : ut - An;
    });
    if (I.length < 2)
      return;
    const G = [...e], ae = G[I[I.length - 1]];
    for (let je = I.length - 1; je > 0; je -= 1)
      G[I[je]] = G[I[je - 1]];
    G[I[0]] = ae, s(G), O();
  }, et = (P) => {
    const I = new Set(e.map((G) => G.toLowerCase()));
    tn(P).filter((G) => !I.has(G.toLowerCase())).forEach((G) => i(G)), O(), f(!1), p("none");
  }, hn = k.useCallback((P) => {
    _(null), S(!0), P && y(P);
  }, []), pn = () => {
    S(!1), v(!1), _(null), y("");
  };
  k.useEffect(() => {
    const P = () => {
      hn("https://lospec.com/palette-list/");
    };
    return window.addEventListener("palette:open-lospec", P), () => window.removeEventListener("palette:open-lospec", P);
  }, [hn]), k.useEffect(() => {
    const P = () => {
      f(!0), p("none");
    };
    return window.addEventListener("palette:open-add-swatch", P), () => window.removeEventListener("palette:open-add-swatch", P);
  }, []), k.useEffect(() => {
    const P = (I) => {
      const ae = Number(I.detail);
      Number.isFinite(ae) && re(Math.min(4, Math.max(2, Math.floor(ae))));
    };
    return window.addEventListener("palette:set-rows", P), () => window.removeEventListener("palette:set-rows", P);
  }, []);
  const Ts = async () => {
    var I;
    if (!((I = window.paletteApi) != null && I.importLospec)) {
      _("LoSpec import is unavailable (paletteApi not found). Restart the app.");
      return;
    }
    const P = M.trim();
    if (!P) {
      _("Paste a LoSpec palette URL or slug.");
      return;
    }
    if (window.confirm(
      "Importing a LoSpec palette will replace your current palette. Continue?"
    )) {
      v(!0), _(null);
      try {
        const G = await window.paletteApi.importLospec(P), ae = G.colors.length > 0 ? G.colors : e;
        s(ae), l([Math.max(0, ae.length - 1)]), Pe.getState().setDirty(!0), pn();
      } catch (G) {
        const ae = G instanceof Error ? G.message : "Unable to import palette.";
        _(ae), v(!1);
      }
    }
  }, In = Ie.useMemo(() => {
    const P = e.length + 1, I = Math.min(W, Math.max(1, Math.ceil(P / 16))), G = Math.max(1, Math.ceil(P / I));
    return { rows: I, columns: G };
  }, [e.length, W]);
  k.useEffect(() => {
    try {
      window.localStorage.setItem("pss.paletteRows", String(W));
    } catch {
    }
  }, [W]), k.useEffect(() => {
    const P = () => {
      E.current = !1, H.current = null, $.current = !1, se.current = /* @__PURE__ */ new Set();
    };
    return window.addEventListener("pointerup", P), () => window.removeEventListener("pointerup", P);
  }, []);
  const Fl = (P) => ({
    row: Math.floor(P / In.columns),
    col: P % In.columns
  }), Ol = (P, I) => {
    const G = Fl(P), ae = Fl(I), je = Math.min(G.row, ae.row), Ct = Math.max(G.row, ae.row), ut = Math.min(G.col, ae.col), En = Math.max(G.col, ae.col), An = [];
    for (let Qn = je; Qn <= Ct; Qn += 1)
      for (let zl = ut; zl <= En; zl += 1) {
        const Vs = Qn * In.columns + zl;
        Vs < 0 || Vs >= e.length || An.push(Vs);
      }
    return An;
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "palette-bar", children: [
    /* @__PURE__ */ o.jsxs(
      "div",
      {
        className: "palette-bar__swatches",
        role: "listbox",
        "aria-label": "Palette colors",
        style: {
          "--palette-rows": In.rows,
          "--palette-columns": In.columns
        },
        children: [
          e.map((P, I) => /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch",
              style: { background: P },
              "data-active": I === r,
              "data-selected": Re.has(I),
              onMouseDown: (G) => {
                he && G.button === 0 && G.ctrlKey && (ne.current = !0);
              },
              onPointerDown: (G) => {
                if (G.button !== 0)
                  return;
                E.current = !0, H.current = I, Z.current = !1, $.current = G.shiftKey || G.metaKey || G.ctrlKey || G.altKey, se.current = $.current ? new Set(Re) : /* @__PURE__ */ new Set();
                const ae = Ol(I, I);
                if ($.current) {
                  const je = new Set(se.current);
                  ae.forEach((Ct) => je.add(Ct)), l(a(Array.from(je), I));
                } else
                  l(a(ae, I));
                le.current = I;
              },
              onPointerEnter: () => {
                if (!E.current || H.current === null)
                  return;
                Z.current = !0;
                const G = Ol(H.current, I);
                if ($.current) {
                  const ae = new Set(se.current);
                  G.forEach((je) => ae.add(je)), l(a(Array.from(ae), I));
                } else
                  l(a(G, I));
              },
              onClick: (G) => {
                if (Z.current) {
                  Z.current = !1;
                  return;
                }
                if (ne.current) {
                  ne.current = !1;
                  return;
                }
                if (G.shiftKey && le.current !== null) {
                  const ae = Math.min(le.current, I), je = Math.max(le.current, I), Ct = new Set(Re);
                  for (let ut = ae; ut <= je; ut += 1)
                    Ct.add(ut);
                  l(a(Array.from(Ct), I)), le.current = I;
                } else if (G.metaKey || G.altKey) {
                  const ae = new Set(Re);
                  ae.has(I) ? ae.delete(I) : ae.add(I);
                  const je = Array.from(ae);
                  l(
                    ae.has(I) ? a(je, I) : je
                  ), le.current = I;
                } else if (G.ctrlKey) {
                  const ae = new Set(Re);
                  ae.has(I) ? ae.delete(I) : ae.add(I);
                  const je = Array.from(ae);
                  l(
                    ae.has(I) ? a(je, I) : je
                  ), le.current = I;
                } else
                  _n([I]), le.current = I;
              },
              onContextMenu: (G) => Q(G, I),
              "aria-label": `Palette color ${I + 1}`,
              "aria-selected": Re.has(I)
            },
            `${P}-${I}`
          )),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__swatch palette-bar__swatch--empty",
              onClick: () => {
                mt();
              },
              onContextMenu: (P) => Q(P, null),
              "aria-label": "Add palette color"
            }
          )
        ]
      }
    ),
    c.open && /* @__PURE__ */ o.jsxs(
      "div",
      {
        ref: Y,
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
              onClick: ge,
              disabled: !J,
              children: "Set Color"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: Qe,
              disabled: !jt || !Pn,
              children: "Delete Selected"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "palette-bar__menu-item",
              onClick: ue,
              disabled: !Gn,
              children: "Cycle Selected"
            }
          )
        ]
      }
    ),
    b && wr.createPortal(
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (P) => {
            if (P.key === "Escape") {
              P.preventDefault(), we();
              return;
            }
            if (P.key === "Enter") {
              const I = P.target;
              if ((I == null ? void 0 : I.tagName) === "TEXTAREA")
                return;
              P.preventDefault(), Ve();
            }
          },
          children: [
            /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: we }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--palette-color", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ o.jsx("h2", { children: ct }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: we, children: "Close" })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
                /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-row", children: [
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Before" }),
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: ln(L) }
                      }
                    )
                  ] }),
                  /* @__PURE__ */ o.jsxs("div", { className: "palette-color-picker__preview-block", children: [
                    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Current" }),
                    /* @__PURE__ */ o.jsx(
                      "div",
                      {
                        className: "palette-color-picker__preview-swatch",
                        style: { background: ln(j) }
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
                      value: R,
                      onChange: (P) => {
                        const I = P.currentTarget.value;
                        U(I);
                        const G = wf(I);
                        if (!vf(G))
                          return;
                        const ae = vt(G);
                        ae && A(ae);
                      },
                      onBlur: () => {
                        const P = wf(R);
                        if (!vf(P)) {
                          U(ln(j));
                          return;
                        }
                        const I = vt(P);
                        I && Me(I);
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, r: I });
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, r: I });
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, g: I });
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, g: I });
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, b: I });
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
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me({ ...j, b: I });
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
                        value: Math.round(ye.h),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, h: mn(I, 0, 360) })
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
                        value: Math.round(ye.h),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, h: mn(I, 0, 360) })
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
                        value: Math.round(ye.s * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, s: mn(I, 0, 100) / 100 })
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
                        value: Math.round(ye.s * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, s: mn(I, 0, 100) / 100 })
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
                        value: Math.round(ye.v * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, v: mn(I, 0, 100) / 100 })
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
                        value: Math.round(ye.v * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            sl({ ...ye, v: mn(I, 0, 100) / 100 })
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
                        value: Math.round(fe.l * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            Mu({ ...fe, l: mn(I, 0, 100) / 100 })
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
                        value: Math.round(fe.l * 100),
                        onChange: (P) => {
                          const I = Number(P.currentTarget.value);
                          Number.isFinite(I) && Me(
                            Mu({ ...fe, l: mn(I, 0, 100) / 100 })
                          );
                        }
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ o.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: we, children: "Cancel" }),
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: Ve, children: b.mode === "add" ? "Add Color" : "Apply" })
                ] })
              ] })
            ] })
          ]
        }
      ),
      document.body
    ),
    h && wr.createPortal(
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (P) => {
            P.key === "Escape" && (P.preventDefault(), f(!1), p("none"));
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
                  en,
                  {
                    ariaLabel: "Swatch presets",
                    className: "panel__select",
                    value: d,
                    onChange: (P) => {
                      if (p(P), P === "none")
                        return;
                      const I = Ge.find((G) => G.id === P);
                      I && et(I.colors);
                    },
                    options: [
                      { value: "none", label: "Choose preset…" },
                      ...Ge.map((P) => ({
                        value: P.id,
                        label: P.label,
                        render: /* @__PURE__ */ o.jsxs("span", { className: "palette-bar__preset-option", children: [
                          /* @__PURE__ */ o.jsx("span", { className: "palette-bar__preset-option-label", children: P.label }),
                          /* @__PURE__ */ o.jsx("span", { className: "palette-bar__menu-preview", "aria-hidden": "true", children: P.colors.map((I, G) => /* @__PURE__ */ o.jsx(
                            "span",
                            {
                              className: "palette-bar__menu-chip",
                              style: { background: I }
                            },
                            `${P.id}-${I}-${G}`
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
    g && wr.createPortal(
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: "modal",
          onKeyDown: (P) => {
            P.key === "Escape" && (P.preventDefault(), pn());
          },
          children: [
            /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: pn }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__content", role: "dialog", "aria-modal": "true", children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
                /* @__PURE__ */ o.jsx("h2", { children: "Import LoSpec Palette" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: pn, children: "Close" })
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
                    onChange: (P) => y(P.currentTarget.value),
                    onKeyDown: (P) => {
                      P.key === "Enter" && (P.preventDefault(), Ts());
                    },
                    autoFocus: !0
                  }
                ),
                /* @__PURE__ */ o.jsx("div", { className: "panel__note", style: { color: "rgba(255, 170, 120, 0.9)" }, children: "Importing will replace your current palette." }),
                w && /* @__PURE__ */ o.jsx("div", { className: "panel__note", style: { color: "rgba(255, 120, 120, 0.9)" }, children: w }),
                /* @__PURE__ */ o.jsxs("div", { className: "modal__row", style: { justifyContent: "flex-end", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: pn, disabled: m, children: "Cancel" }),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      className: "panel__item",
                      onClick: () => void Ts(),
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
}, QS = ({ pixels: e, tileWidth: t, tileHeight: n, pixelSize: s, palette: l }) => {
  const r = k.useRef(null);
  return k.useEffect(() => {
    const i = r.current;
    if (!i)
      return;
    const a = t * s, c = n * s;
    i.width = a, i.height = c;
    const u = i.getContext("2d");
    if (u) {
      u.imageSmoothingEnabled = !1, u.clearRect(0, 0, a, c);
      for (let d = 0; d < n; d += 1)
        for (let p = 0; p < t; p += 1) {
          const h = e[d * t + p] ?? 0;
          h !== 0 && (u.fillStyle = l[h] ?? l[0] ?? "#000000", u.fillRect(p * s, d * s, s, s));
        }
    }
  }, [e, t, n, s, l]), /* @__PURE__ */ o.jsx("canvas", { ref: r, "aria-hidden": "true" });
}, ZS = () => {
  const e = V((B) => B.tileSets), t = V((B) => B.activeTileSetId), n = V((B) => B.tilePage), s = V((B) => B.tilePageCount), l = V((B) => B.setTilePageCount), r = V((B) => B.selectedTileIndex), i = V((B) => B.selectedTileIndices), a = V((B) => B.tilePickerZoom), c = V((B) => B.setTileSelection), u = V((B) => B.setActiveTileSet), d = V((B) => B.deleteTilesFromSet), p = ie((B) => B.colors), h = k.useMemo(() => e.find((B) => B.id === t) ?? e[0], [e, t]);
  k.useEffect(() => {
    !h && e.length > 0 && u(e[0].id);
  }, [h, e, u]);
  const f = (h == null ? void 0 : h.tiles.length) ?? 0, g = (h == null ? void 0 : h.tiles) ?? [], S = Math.max(1, (h == null ? void 0 : h.columns) ?? 1), M = Math.max(1, (h == null ? void 0 : h.rows) ?? 1), y = S * M, m = Math.max(1, Math.ceil(f / y)), v = h ? Math.max(16, h.tileWidth * a) : 32, w = k.useRef(null), [_, b] = k.useState({ width: 0, height: 0 }), T = S * v, j = M * v, A = k.useMemo(() => {
    if (_.width <= 0)
      return 1;
    const B = Math.floor((_.width + 8) / Math.max(1, T + 8));
    return Math.max(1, Math.min(m, B));
  }, [T, _.width, m]), L = k.useMemo(() => {
    if (_.height <= 0)
      return 1;
    const B = Math.floor((_.height + 8) / Math.max(1, j + 8));
    return Math.max(1, B);
  }, [j, _.height]), C = Math.max(1, A * L), R = Math.max(1, Math.ceil(m / C)), U = Math.min(n, R - 1), W = U * C, re = Math.max(0, Math.min(C, m - W)), le = k.useRef(!1), ne = k.useRef(null), Y = k.useMemo(
    () => new Set(i.filter((B) => B >= 0)),
    [i]
  ), E = k.useMemo(() => {
    const B = new Set(i.filter((J) => J >= 0));
    return Array.from(B).sort((J, ce) => J - ce);
  }, [i]), H = k.useCallback(() => {
    if (!h || E.length === 0)
      return;
    const B = E.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${E.length} ${B} from ${h.name}? This cannot be undone.`
    ) && d(h.id, E);
  }, [h, d, E]), Z = k.useCallback(() => {
    const B = w.current;
    if (!B)
      return;
    const J = Math.floor(B.clientWidth || B.getBoundingClientRect().width || 0), ce = Math.floor(B.clientHeight || B.getBoundingClientRect().height || 0);
    b(
      (pe) => pe.width === J && pe.height === ce ? pe : { width: J, height: ce }
    );
  }, []);
  k.useEffect(() => {
    const B = w.current;
    if (!B)
      return;
    const J = () => {
      Z();
    };
    if (J(), typeof ResizeObserver > "u")
      return window.addEventListener("resize", J), () => {
        window.removeEventListener("resize", J);
      };
    const ce = new ResizeObserver(() => J()), pe = B.parentElement;
    return pe && ce.observe(pe), ce.observe(B), () => {
      ce.disconnect();
    };
  }, [Z]), k.useEffect(() => {
    s !== R && l(R);
  }, [l, s, R]), k.useEffect(() => {
    Z();
    const B = window.requestAnimationFrame(() => {
      Z();
    });
    return () => window.cancelAnimationFrame(B);
  }, [Z, v, m, R, U]);
  const se = (B) => {
    const J = Math.floor(B / y), ce = B % y, pe = ce % S, Ge = Math.floor(ce / S), Me = J % A;
    return {
      row: Math.floor(J / A) * M + Ge,
      col: Me * S + pe
    };
  }, $ = (B, J) => {
    if (B.length === 0) {
      c([J], 1, 1, J);
      return;
    }
    const ce = B.map((ge) => ({
      index: ge,
      ...se(ge)
    })), pe = Math.min(...ce.map((ge) => ge.col)), Ge = Math.max(...ce.map((ge) => ge.col)), Me = Math.min(...ce.map((ge) => ge.row)), ve = Math.max(...ce.map((ge) => ge.row)), we = Ge - pe + 1, Ve = ve - Me + 1, ct = new Array(we * Ve).fill(-1);
    for (const ge of ce) {
      const mt = ge.col - pe, Rt = (ge.row - Me) * we + mt;
      ct[Rt] = ge.index;
    }
    c(ct, we, Ve, J);
  }, he = (B, J) => {
    const ce = se(B), pe = se(J), Ge = Math.min(ce.col, pe.col), Me = Math.max(ce.col, pe.col), ve = Math.min(ce.row, pe.row), we = Math.max(ce.row, pe.row), Ve = Me - Ge + 1, ct = we - ve + 1, ge = new Array(Ve * ct).fill(-1);
    for (let mt = ve; mt <= we; mt += 1)
      for (let Re = Ge; Re <= Me; Re += 1) {
        const Rt = Math.floor(Re / S), Zt = Math.floor(mt / M), jt = Re % S, Gn = mt % M, _n = (Zt * A + Rt) * y + Gn * S + jt;
        if (_n < 0 || _n >= f)
          continue;
        const Vn = (mt - ve) * Ve + (Re - Ge);
        ge[Vn] = _n;
      }
    c(ge, Ve, ct, B);
  }, ye = (B, J) => {
    if (le.current = !0, ne.current = B, J != null && J.additive) {
      const ce = /* @__PURE__ */ new Set([
        ...i.filter((pe) => pe >= 0),
        B
      ]);
      $(Array.from(ce), B);
      return;
    }
    if (J != null && J.subtractive) {
      const ce = i.filter((Ge) => Ge >= 0 && Ge !== B), pe = ce.length > 0 ? ce : [B];
      $(pe, B);
      return;
    }
    he(B, B);
  }, fe = (B) => {
    !le.current || ne.current === null || he(ne.current, B);
  }, O = () => {
    le.current = !1, ne.current = null;
  };
  k.useEffect(() => {
    const B = () => O();
    return window.addEventListener("pointerup", B), () => window.removeEventListener("pointerup", B);
  }, []), k.useEffect(() => {
    const B = (J) => {
      if (J.key !== "Delete" && J.key !== "Backspace")
        return;
      const ce = J.target;
      if (ce) {
        const pe = ce.tagName;
        if (pe === "INPUT" || pe === "TEXTAREA" || ce.isContentEditable)
          return;
      }
      !h || E.length === 0 || (J.preventDefault(), H());
    };
    return window.addEventListener("keydown", B), () => window.removeEventListener("keydown", B);
  }, [h, H, E.length]);
  const Q = k.useCallback((B) => {
    const J = w.current;
    J && (J.scrollHeight <= J.clientHeight || (J.scrollTop += B.deltaY, B.preventDefault(), B.stopPropagation()));
  }, []);
  return /* @__PURE__ */ o.jsx("div", { className: "tilebar", children: /* @__PURE__ */ o.jsx(
    "div",
    {
      ref: w,
      className: "tilebar__grid",
      onWheel: Q,
      style: {
        "--tile-cell-size": `${v}px`,
        "--tile-cluster-columns": `${S}`,
        "--tile-cluster-rows": `${M}`
      },
      children: h ? f === 0 ? /* @__PURE__ */ o.jsx("div", { className: "tilebar__empty", children: "No tiles in this set yet." }) : Array.from({ length: re }, (B, J) => {
        const ce = W + J, pe = ce * y;
        return /* @__PURE__ */ o.jsx("div", { className: "tilebar__cluster", children: Array.from({ length: y }, (Ge, Me) => {
          const ve = pe + Me, we = ve < 0 || ve >= f, Ve = we ? null : g[ve], ct = !we && Y.has(ve);
          return /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "tilebar__tile",
              "data-active": ve === r,
              "data-selected": ct,
              "data-placeholder": we,
              onPointerDown: (ge) => {
                we || ye(ve, {
                  additive: ge.shiftKey,
                  subtractive: ge.ctrlKey || ge.metaKey
                });
              },
              onPointerEnter: () => {
                we || fe(ve);
              },
              "aria-label": `Tile ${ve + 1}`,
              disabled: we,
              children: Ve ? /* @__PURE__ */ o.jsx(
                QS,
                {
                  pixels: Ve.pixels,
                  tileWidth: h.tileWidth,
                  tileHeight: h.tileHeight,
                  pixelSize: a,
                  palette: p
                }
              ) : null
            },
            we ? `placeholder-${ve}` : (Ve == null ? void 0 : Ve.id) ?? `tile-${ve}`
          );
        }) }, `cluster-${ce}`);
      }) : /* @__PURE__ */ o.jsx("div", { className: "tilebar__empty", children: "No tiles yet. Use Tile Sampler to capture some." })
    }
  ) });
}, fx = (e) => {
  const s = Math.max(8, Math.min(32, e));
  return Math.round(s / 8) * 8;
}, mx = (e, t, n, s) => {
  if (t.length <= 1 || e.pixels.length === 0)
    return e;
  const l = {
    minX: 0,
    minY: 0,
    maxX: Math.max(0, e.width - 1),
    maxY: Math.max(0, e.height - 1)
  }, r = e.pixels.map((a) => ({ x: a.x, y: a.y })), i = Wr(r, l, t, n, s);
  return {
    ...e,
    pixels: e.pixels.map((a) => ({
      ...a,
      paletteIndex: i.get(`${a.x}:${a.y}`) ?? t[0] ?? a.paletteIndex
    }))
  };
}, gx = (e) => {
  const t = fx(e.fontSize), n = e.text;
  if (!n.trim())
    return null;
  if (typeof document > "u")
    throw new Error("rasterizeText requires a DOM environment.");
  const s = document.createElement("canvas"), l = s.getContext("2d");
  if (!l)
    return null;
  const r = n.split(`
`);
  l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`;
  let i = 0;
  for (const w of r) {
    const _ = l.measureText(w);
    i = Math.max(i, Math.ceil(_.width));
  }
  const a = 2, c = Math.max(1, i + a * 2), u = Math.max(1, r.length * t + a * 2);
  s.width = c, s.height = u, l.clearRect(0, 0, c, u), l.imageSmoothingEnabled = !1, l.textBaseline = "top", l.textAlign = "left", l.font = `${t}px ${e.fontFamily}`, l.fillStyle = "#ffffff";
  for (let w = 0; w < r.length; w += 1)
    l.fillText(r[w] ?? "", a, a + w * t);
  const p = l.getImageData(0, 0, c, u).data, h = e.alphaThreshold ?? 128;
  let f = Number.POSITIVE_INFINITY, g = Number.POSITIVE_INFINITY, S = Number.NEGATIVE_INFINITY, M = Number.NEGATIVE_INFINITY;
  for (let w = 0; w < u; w += 1)
    for (let _ = 0; _ < c; _ += 1)
      (p[(w * c + _) * 4 + 3] ?? 0) < h || (f = Math.min(f, _), g = Math.min(g, w), S = Math.max(S, _), M = Math.max(M, w));
  if (!Number.isFinite(f) || !Number.isFinite(g))
    return null;
  const y = S - f + 1, m = M - g + 1, v = [];
  for (let w = g; w <= M; w += 1)
    for (let _ = f; _ <= S; _ += 1)
      (p[(w * c + _) * 4 + 3] ?? 0) < h || v.push({
        x: _ - f,
        y: w - g,
        paletteIndex: e.paletteIndex
      });
  return { pixels: v, width: y, height: m };
}, qS = (e) => {
  const t = sa(), { gradientDirection: n, gradientDither: s } = xt.getState(), l = gx({
    ...e,
    paletteIndex: t[0] ?? e.paletteIndex
  });
  if (!l)
    return;
  const r = t.length > 1 ? mx(l, t, n, s) : l;
  Tt.getState().setBuffer({
    pixels: r.pixels,
    origin: { x: 0, y: 0 },
    width: r.width,
    height: r.height
  }), Kt.getState().setActiveTool("stamp");
}, JS = [
  { label: "Monospace", value: "monospace" },
  { label: "Sans", value: "sans-serif" },
  { label: "Serif", value: "serif" }
], eM = [8, 16, 24, 32], tM = (e, t, n) => {
  const s = window.devicePixelRatio || 1;
  e.width = Math.floor(t * s), e.height = Math.floor(n * s), e.style.width = `${t}px`, e.style.height = `${n}px`;
  const l = e.getContext("2d");
  return l ? (l.setTransform(s, 0, 0, s, 0, 0), l.imageSmoothingEnabled = !1, l) : null;
}, nM = ({
  initialText: e = "",
  initialFontFamily: t = "monospace",
  initialFontSize: n = 16,
  onCancel: s,
  onConfirm: l
}) => {
  const r = ie((w) => w.colors), i = ie((w) => w.selectedIndices), a = ie((w) => w.getActiveIndex()), c = xt((w) => w.gradientDirection), u = xt((w) => w.gradientDither), [d, p] = Ie.useState(e), [h, f] = Ie.useState(t), [g, S] = Ie.useState(fx(n)), M = k.useRef(null), y = k.useRef(null), m = k.useRef(null);
  k.useEffect(() => {
    var w, _, b;
    (w = M.current) == null || w.focus(), (b = (_ = M.current) == null ? void 0 : _.select) == null || b.call(_);
  }, []);
  const v = k.useMemo(() => {
    try {
      const w = gx({
        text: d,
        fontFamily: h,
        fontSize: g,
        paletteIndex: a
      });
      if (!w)
        return null;
      const _ = /* @__PURE__ */ new Set(), b = [];
      for (const T of i)
        T < 0 || T >= r.length || _.has(T) || (_.add(T), b.push(T));
      return b.length <= 1 ? w : mx(w, b, c, u);
    } catch {
      return null;
    }
  }, [
    a,
    h,
    g,
    c,
    u,
    r.length,
    i,
    d
  ]);
  return k.useEffect(() => {
    const w = y.current, _ = m.current;
    if (!w || !_)
      return;
    const b = () => {
      const A = tM(_, w.clientWidth, w.clientHeight);
      if (!A)
        return;
      const L = w.clientWidth, C = w.clientHeight, R = r[0] ?? "#000000", U = vt(R) ?? { r: 0, g: 0, b: 0 }, W = na(U, ta(U)), re = vd(as(U, W, 0.1)), le = jn(W, 0.12);
      if (A.clearRect(0, 0, L, C), A.fillStyle = R, A.fillRect(0, 0, L, C), !v || v.pixels.length === 0)
        return;
      const ne = 12, Y = Math.max(1, L - ne * 2), E = Math.max(1, C - ne * 2), H = Math.max(
        1,
        Math.floor(
          Math.min(Y / v.width, E / v.height)
        )
      ), Z = v.width * H, se = v.height * H, $ = Math.floor((L - Z) / 2), he = Math.floor((C - se) / 2);
      A.fillStyle = re, A.fillRect($, he, Z, se), A.strokeStyle = le, A.strokeRect($, he, Z, se);
      const ye = /* @__PURE__ */ new Map();
      for (const fe of v.pixels) {
        const O = ye.get(fe.paletteIndex);
        O ? O.push({ x: fe.x, y: fe.y }) : ye.set(fe.paletteIndex, [{ x: fe.x, y: fe.y }]);
      }
      for (const [fe, O] of ye) {
        A.fillStyle = r[fe] ?? r[a] ?? "#ffffff";
        for (const Q of O)
          A.fillRect(
            $ + Q.x * H,
            he + Q.y * H,
            H,
            H
          );
      }
    };
    b();
    const T = ie.subscribe(b), j = new ResizeObserver(b);
    return j.observe(w), () => {
      T(), j.disconnect();
    };
  }, [a, r, v]), /* @__PURE__ */ o.jsxs(
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
                  value: h,
                  onChange: (w) => f(w.target.value),
                  children: JS.map((w) => /* @__PURE__ */ o.jsx("option", { value: w.value, children: w.label }, w.value))
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "Size" }),
              /* @__PURE__ */ o.jsx("span", { children: /* @__PURE__ */ o.jsx(
                "select",
                {
                  value: g,
                  onChange: (w) => S(Number(w.target.value)),
                  children: eM.map((w) => /* @__PURE__ */ o.jsxs("option", { value: w, children: [
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
                  value: d,
                  onChange: (w) => p(w.target.value),
                  placeholder: "Type text…",
                  onKeyDown: (w) => {
                    if (w.key === "Enter") {
                      if (w.preventDefault(), !d.trim())
                        return;
                      l({ text: d, fontFamily: h, fontSize: g });
                    }
                  }
                }
              ) })
            ] }),
            /* @__PURE__ */ o.jsx("div", { className: "text-tool__preview", ref: y, children: /* @__PURE__ */ o.jsx("canvas", { ref: m }) }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: s, children: "Cancel" }),
                /* @__PURE__ */ o.jsx(
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
}, sM = ({ onClose: e, onAdvancedModeChange: t }) => {
  const [n, s] = k.useState(!0), [l, r] = k.useState(!1), [i, a] = k.useState(!1), [c, u] = k.useState(!1), [d, p] = k.useState("gpt-image-1"), [h, f] = k.useState("openai"), [g, S] = k.useState("http://localhost:8080/v1"), [M, y] = k.useState("sdxl"), [m, v] = k.useState(!1), [w, _] = k.useState(!1), [b, T] = k.useState(!1), [j, A] = k.useState(!1), [L, C] = k.useState(""), [R, U] = k.useState(!1), [W, re] = k.useState(!1), [le, ne] = k.useState(""), Y = k.useRef(null);
  k.useEffect(() => {
    let O = !1;
    return (async () => {
      try {
        const B = await window.optionsApi.getOpenAiKeyInfo(), J = await window.optionsApi.getOpenAiImageModel(), ce = await window.optionsApi.getAiImageProvider(), pe = await window.optionsApi.getLocalAiConfig(), Ge = await window.optionsApi.getLocalAiKeyInfo(), Me = await window.optionsApi.getAdvancedMode();
        if (O)
          return;
        r(B.hasKey), a(B.encryptionAvailable), u(B.storedEncrypted), p(J), f(ce), S(pe.baseUrl), y(pe.model), v(Ge.hasKey), _(Ge.encryptionAvailable), T(Ge.storedEncrypted), U(Me);
      } finally {
        O || s(!1);
      }
    })(), () => {
      O = !0;
    };
  }, []), k.useEffect(() => {
    n || window.setTimeout(() => {
      var O;
      return (O = Y.current) == null ? void 0 : O.focus();
    }, 0);
  }, [n]);
  const E = async () => {
    const O = le.trim();
    if (!O) {
      window.alert("Paste your OpenAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setOpenAiApiKey(O);
      const Q = await window.optionsApi.getOpenAiKeyInfo();
      r(Q.hasKey), a(Q.encryptionAvailable), u(Q.storedEncrypted), ne(""), re(!1);
    } catch (Q) {
      console.error("Failed to save OpenAI API key:", Q), window.alert("Unable to save API key.");
    } finally {
      s(!1);
    }
  }, H = async () => {
    if (window.confirm("Clear the saved OpenAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setOpenAiApiKey(null);
        const O = await window.optionsApi.getOpenAiKeyInfo();
        r(O.hasKey), a(O.encryptionAvailable), u(O.storedEncrypted), ne(""), re(!1);
      } catch (O) {
        console.error("Failed to clear OpenAI API key:", O), window.alert("Unable to clear API key.");
      } finally {
        s(!1);
      }
    }
  }, Z = async (O) => {
    p(O);
    try {
      await window.optionsApi.setOpenAiImageModel(O);
    } catch (Q) {
      console.error("Failed to set image model:", Q), window.alert("Unable to update image model.");
      const B = await window.optionsApi.getOpenAiImageModel().catch(() => "gpt-image-1");
      p(B);
    }
  }, se = async (O) => {
    f(O);
    try {
      await window.optionsApi.setAiImageProvider(O);
    } catch (Q) {
      console.error("Failed to set image provider:", Q), window.alert("Unable to update image provider.");
      const B = await window.optionsApi.getAiImageProvider().catch(() => "openai");
      f(B);
    }
  }, $ = async () => {
    const O = L.trim();
    if (!O) {
      window.alert("Paste your LocalAI API key, or use Clear.");
      return;
    }
    s(!0);
    try {
      await window.optionsApi.setLocalAiApiKey(O);
      const Q = await window.optionsApi.getLocalAiKeyInfo();
      v(Q.hasKey), _(Q.encryptionAvailable), T(Q.storedEncrypted), C(""), A(!1);
    } catch (Q) {
      console.error("Failed to save LocalAI API key:", Q), window.alert("Unable to save LocalAI API key.");
    } finally {
      s(!1);
    }
  }, he = async () => {
    if (window.confirm("Clear the saved LocalAI API key?")) {
      s(!0);
      try {
        await window.optionsApi.setLocalAiApiKey(null);
        const O = await window.optionsApi.getLocalAiKeyInfo();
        v(O.hasKey), _(O.encryptionAvailable), T(O.storedEncrypted), C(""), A(!1);
      } catch (O) {
        console.error("Failed to clear LocalAI API key:", O), window.alert("Unable to clear LocalAI API key.");
      } finally {
        s(!1);
      }
    }
  }, ye = async (O) => {
    U(O);
    try {
      await window.optionsApi.setAdvancedMode(O), t(O);
    } catch (Q) {
      console.error("Failed to update advanced mode:", Q), window.alert("Unable to update advanced mode.");
      const B = await window.optionsApi.getAdvancedMode().catch(() => !0);
      U(B), t(B);
    }
  }, fe = l ? c ? "Saved (encrypted)" : i ? "Saved" : "Saved (not encrypted)" : "Not set";
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (O) => {
        O.key === "Escape" && (O.preventDefault(), e());
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
                      checked: R,
                      onChange: (O) => void ye(O.currentTarget.checked),
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
                    value: h,
                    onChange: (O) => void se(O.target.value),
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
            h === "openai" && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "OpenAI Image Model" }),
              /* @__PURE__ */ o.jsx("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: /* @__PURE__ */ o.jsxs(
                "select",
                {
                  value: d,
                  onChange: (O) => void Z(O.target.value),
                  disabled: n,
                  children: [
                    /* @__PURE__ */ o.jsx("option", { value: "gpt-image-1-mini", children: "gpt-image-1-mini (faster/cheaper)" }),
                    /* @__PURE__ */ o.jsx("option", { value: "gpt-image-1", children: "gpt-image-1 (higher quality)" })
                  ]
                }
              ) })
            ] }),
            h === "localai" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI Base URL" }),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ o.jsx(
                    "input",
                    {
                      type: "text",
                      value: g,
                      onChange: (O) => S(O.target.value),
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
                      onChange: (O) => y(O.target.value),
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
                      onChange: (O) => C(O.target.value),
                      disabled: n,
                      style: { width: 320 }
                    }
                  ),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => A((O) => !O),
                      disabled: n,
                      children: j ? "Hide" : "Show"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", { children: "LocalAI Key Status" }),
                /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.9 }, children: m ? b ? "Saved (encrypted)" : w ? "Saved" : "Saved (not encrypted)" : "Not set (optional)" })
              ] }),
              /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
                /* @__PURE__ */ o.jsx("span", {}),
                /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                  /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => void $(), disabled: n, children: "Save Key" }),
                  /* @__PURE__ */ o.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => void he(),
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
                    ref: Y,
                    type: W ? "text" : "password",
                    value: le,
                    placeholder: l ? "•••••••••••••••• (saved)" : "sk-...",
                    onChange: (O) => ne(O.target.value),
                    disabled: n,
                    style: { width: 320 }
                  }
                ),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => re((O) => !O), disabled: n, children: W ? "Hide" : "Show" })
              ] })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", { children: "OpenAI Key Status" }),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.9 }, children: fe })
            ] }),
            !i && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsx("span", { style: { opacity: 0.8 }, children: "Encryption is unavailable on this system; the key may be stored in plain text." })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: E, disabled: n, children: "Save Key" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: H, disabled: n || !l, children: "Clear" })
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
}, lM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, rM = (e, t, n = {}) => {
  const s = n.alphaThreshold ?? 1, l = t.map((d) => vt(d) ?? { r: 0, g: 0, b: 0 }), r = l.length > 1 ? Array.from({ length: l.length - 1 }, (d, p) => p + 1) : [0], i = [], { width: a, height: c, data: u } = e;
  for (let d = 0; d < c; d += 1)
    for (let p = 0; p < a; p += 1) {
      const h = (d * a + p) * 4, f = u[h] ?? 0, g = u[h + 1] ?? 0, S = u[h + 2] ?? 0;
      if ((u[h + 3] ?? 0) < s)
        continue;
      const y = { r: f, g, b: S };
      let m = r[0] ?? 0, v = Number.POSITIVE_INFINITY;
      for (const w of r) {
        const _ = lM(y, l[w] ?? l[0]);
        _ < v && (v = _, m = w);
      }
      m !== 0 && i.push({ x: p, y: d, paletteIndex: m });
    }
  return { pixels: i };
}, Md = (e) => {
  const t = ie.getState().colors, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = new Uint8ClampedArray(n * s * 4);
  for (const r of e.pixels) {
    const i = t[r.paletteIndex];
    if (!i)
      continue;
    const a = vt(i);
    if (!a)
      continue;
    const c = r.x - e.minX, d = ((r.y - e.minY) * n + c) * 4;
    l[d] = a.r, l[d + 1] = a.g, l[d + 2] = a.b, l[d + 3] = 255;
  }
  return { data: l, width: n, height: s };
}, iM = (e) => {
  const t = e.maxX - e.minX + 1, n = e.maxY - e.minY + 1, s = new Uint8Array(t * n);
  for (const l of e.pixels) {
    const r = l.x - e.minX, i = l.y - e.minY;
    s[i * t + r] = l.paletteIndex;
  }
  return { data: s, width: t, height: n };
}, oM = async () => {
  const e = ks();
  if (!e)
    return null;
  const { data: t, width: n, height: s } = Md(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const r = l.getContext("2d");
  if (!r)
    return null;
  const i = new ImageData(t, n, s);
  r.putImageData(i, 0, 0);
  const a = await new Promise(
    (d) => l.toBlob((p) => d(p), "image/png")
  );
  if (!a)
    return null;
  const c = new Uint8Array(await a.arrayBuffer());
  let u = "";
  for (const d of c)
    u += String.fromCharCode(d);
  return btoa(u);
}, ns = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), aM = ({
  initialPrompt: e = "",
  onCancel: t,
  onConfirm: n
}) => {
  const s = ie((R) => R.colors), [l, r] = k.useState(e), [i, a] = k.useState(16), [c, u] = k.useState(16), [d, p] = k.useState(1), [h, f] = k.useState(1), [g, S] = k.useState(!1), [M, y] = k.useState(!1), [m, v] = k.useState(""), [w, _] = k.useState(0), [b, T] = k.useState(null), j = k.useRef(null), A = k.useMemo(() => ns(i, 1, 512) * ns(d, 1, 64), [
    i,
    d
  ]), L = k.useMemo(() => ns(c, 1, 512) * ns(h, 1, 64), [
    c,
    h
  ]);
  k.useEffect(() => {
    window.setTimeout(() => {
      var R;
      return (R = j.current) == null ? void 0 : R.focus();
    }, 0);
  }, []), k.useEffect(() => {
    if (!M) {
      _(0);
      return;
    }
    const R = Date.now(), U = window.setInterval(() => {
      _(Math.floor((Date.now() - R) / 1e3));
    }, 250);
    return () => window.clearInterval(U);
  }, [M]);
  const C = async () => {
    var U;
    T(null);
    const R = l.trim();
    if (!R) {
      T("Enter a prompt.");
      return;
    }
    if (!((U = window.aiApi) != null && U.generateSprite)) {
      T("AI is unavailable. Restart the app to load the latest AI support.");
      return;
    }
    y(!0), v("Preparing request…");
    try {
      v(g ? "Encoding reference…" : "Preparing prompt…");
      const W = g ? await oM() : null;
      v("Waiting for OpenAI…");
      const re = await window.aiApi.generateSprite({
        prompt: R,
        palette: s,
        cellWidth: ns(i, 1, 512),
        cellHeight: ns(c, 1, 512),
        columns: ns(d, 1, 64),
        rows: ns(h, 1, 64),
        referencePngBase64: W
      });
      v("Processing image…");
      const le = new Image(), ne = `data:image/png;base64,${re.pngBase64}`;
      await new Promise((se, $) => {
        le.onload = () => se(), le.onerror = () => $(new Error("Failed to load generated image.")), le.src = ne;
      });
      const Y = document.createElement("canvas");
      Y.width = A, Y.height = L;
      const E = Y.getContext("2d");
      if (!E)
        throw new Error("Canvas unavailable.");
      E.imageSmoothingEnabled = !1, E.clearRect(0, 0, A, L), E.drawImage(le, 0, 0, A, L), v("Quantizing to palette…");
      const H = E.getImageData(0, 0, A, L), Z = rM(H, s, { alphaThreshold: 10 });
      v("Copying to Stamp…"), Tt.getState().setBuffer({
        pixels: Z.pixels,
        origin: { x: 0, y: 0 },
        width: A,
        height: L
      }), Kt.getState().setActiveTool("stamp"), n({
        prompt: R,
        cellWidth: i,
        cellHeight: c,
        columns: d,
        rows: h,
        useSelectionAsReference: g
      });
    } catch (W) {
      console.error("AI generation failed:", W), T(W instanceof Error ? W.message : "AI generation failed.");
    } finally {
      y(!1), v("");
    }
  };
  return /* @__PURE__ */ o.jsxs(
    "div",
    {
      className: "modal",
      onKeyDown: (R) => {
        R.key === "Escape" && (R.preventDefault(), t()), (R.ctrlKey || R.metaKey) && R.key === "Enter" && (R.preventDefault(), C());
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
                    onChange: (R) => r(R.target.value),
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
                    value: i,
                    onChange: (R) => a(Number(R.target.value)),
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
                    onChange: (R) => u(Number(R.target.value)),
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
                    value: d,
                    onChange: (R) => p(Number(R.target.value)),
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
                    value: h,
                    onChange: (R) => f(Number(R.target.value)),
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
                    onChange: (R) => S(R.target.checked),
                    disabled: M
                  }
                ),
                "Use current selection as reference image (optional)"
              ] })
            ] }),
            b && /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsx("span", { style: { color: "#ff9caa" }, children: b })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
              /* @__PURE__ */ o.jsx("span", {}),
              /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: () => void C(), disabled: M, children: M ? "Generating…" : "Generate" }),
                /* @__PURE__ */ o.jsx("button", { type: "button", onClick: t, disabled: M, children: "Cancel" })
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}, be = {
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
}, cM = (e, t) => {
  const n = te.getState(), s = n.activeLayerId, l = new Set(
    n.layers.filter((r) => r.id === s || r.visible).map((r) => r.id)
  );
  for (let r = n.layers.length - 1; r >= 0; r -= 1) {
    const i = n.layers[r];
    if (!l.has(i.id))
      continue;
    const a = i.store.getPixel(e, t);
    if (a !== 0)
      return a;
  }
  return 0;
}, xx = (e = {}) => {
  const t = Se.getState();
  if (t.selectedCount === 0)
    return null;
  const n = te.getState(), s = [];
  let l = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY, a = Number.NEGATIVE_INFINITY;
  const c = e.deep === !0, u = t.store.getBlocks();
  for (const { row: d, col: p, block: h } of u) {
    const f = p * X, g = d * X;
    for (let S = 0; S < X; S += 1)
      for (let M = 0; M < X; M += 1) {
        if (h[S * X + M] !== 1)
          continue;
        const y = f + M, m = g + S, v = c ? cM(y, m) : n.getPixel(y, m);
        s.push({ x: y, y: m, paletteIndex: v }), l = Math.min(l, y), r = Math.max(r, y), i = Math.min(i, m), a = Math.max(a, m);
      }
  }
  return s.length === 0 ? null : { pixels: s, minX: l, maxX: r, minY: i, maxY: a };
}, yx = (e) => {
  const t = { x: e.minX, y: e.minY }, n = e.maxX - e.minX + 1, s = e.maxY - e.minY + 1, l = e.pixels.map((r) => ({
    x: r.x - t.x,
    y: r.y - t.y,
    paletteIndex: r.paletteIndex
  }));
  Tt.getState().setBuffer({
    pixels: l,
    origin: t,
    width: n,
    height: s
  });
}, Lo = (e = {}) => {
  const t = xx(e);
  t && (yx(t), Se.getState().clear(), Kt.getState().setActiveTool("stamp"));
}, vx = () => {
  const e = xx();
  if (!e)
    return;
  yx(e);
  const t = te.getState(), n = [], s = [];
  for (const l of e.pixels)
    l.paletteIndex !== 0 && (n.push({ x: l.x, y: l.y, prev: l.paletteIndex, next: 0 }), s.push({ x: l.x, y: l.y, paletteIndex: 0 }));
  s.length > 0 && (t.setPixels(s), Ye.getState().pushBatch({ changes: n })), Se.getState().clear(), Kt.getState().setActiveTool("stamp");
}, uM = () => {
  const e = Se.getState();
  if (e.selectedCount === 0)
    return;
  const t = Ye.getState();
  if (t.locked)
    return;
  const n = te.getState(), s = n.activeLayerId, l = [], r = [], i = e.store.getBlocks();
  for (const { row: a, col: c, block: u } of i) {
    const d = c * X, p = a * X;
    for (let h = 0; h < X; h += 1)
      for (let f = 0; f < X; f += 1) {
        if (u[h * X + f] !== 1)
          continue;
        const g = d + f, S = p + h, M = n.getPixelInLayer(s, g, S);
        M !== 0 && (l.push({ x: g, y: S, prev: M, next: 0 }), r.push({ x: g, y: S, paletteIndex: 0 }));
      }
  }
  r.length !== 0 && (n.setPixelsInLayer(s, r), t.pushBatch({ layerId: s, changes: l }));
}, wx = async () => {
  const e = ks();
  if (!e)
    return window.alert("Select a region to export."), null;
  const { data: t, width: n, height: s } = Md(e), l = document.createElement("canvas");
  l.width = n, l.height = s;
  const r = l.getContext("2d");
  if (!r)
    return window.alert("Unable to export selection."), null;
  const i = new ImageData(t, n, s);
  r.putImageData(i, 0, 0);
  const a = await new Promise(
    (d) => l.toBlob((p) => d(p), "image/png")
  );
  if (!a)
    return window.alert("Unable to export selection."), null;
  const c = new Uint8Array(await a.arrayBuffer()), u = `pixel-splash-selection-${n}x${s}.png`;
  return window.projectApi.exportPng(c, u);
}, Sf = (e, t, n) => Math.min(n, Math.max(t, e)), dM = (e, t, n, s) => {
  const [l, r] = Ie.useState({ x: t, y: n });
  return Ie.useLayoutEffect(() => {
    if (!e || !s.current) {
      r({ x: t, y: n });
      return;
    }
    const i = s.current.getBoundingClientRect(), a = 8, c = Math.max(a, window.innerWidth - i.width - a), u = Math.max(a, window.innerHeight - i.height - a);
    r({
      x: Sf(t, a, c),
      y: Sf(n, a, u)
    });
  }, [e, s, t, n]), l;
}, ll = ({
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
class hM extends Ie.Component {
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
const pM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  showAdvancedTools: s,
  showAiTool: l,
  showExportButton: r,
  showFullscreenButton: i,
  showTileLayerControls: a,
  toolOptions: c
}) => {
  const u = Ie.useRef(null), d = Ie.useRef(null), p = Ye((E) => E.locked), h = Ye((E) => E.undoStack.length > 0), f = Ye((E) => E.redoStack.length > 0), g = Ye((E) => E.undo), S = Ye((E) => E.redo), M = Tt((E) => E), y = M.pixels.length > 0 && M.width > 0 && M.height > 0, m = De((E) => E.showReferenceLayer), v = De((E) => E.showPixelLayer), w = De((E) => E.showTileLayer), _ = De((E) => E.showPixelGrid), b = De((E) => E.showTileGrid), T = De((E) => E.showAxes), j = De((E) => E.toggleReferenceLayer), A = De((E) => E.togglePixelLayer), L = De((E) => E.toggleTileLayer), C = De((E) => E.togglePixelGrid), R = De((E) => E.toggleTileGrid), U = De((E) => E.toggleAxes), [W, re] = Ie.useState({
    open: !1,
    kind: "layers",
    x: 0,
    y: 0
  }), le = dM(W.open, W.x, W.y, d), ne = Ie.useCallback(() => {
    re((E) => E.open ? { ...E, open: !1 } : E);
  }, []), Y = (E) => (H) => {
    if (H.preventDefault(), W.open && W.kind === E) {
      ne();
      return;
    }
    re({ open: !0, kind: E, x: H.clientX, y: H.clientY });
  };
  return Ie.useEffect(() => {
    if (!W.open)
      return;
    const E = (Z) => {
      d.current && d.current.contains(Z.target) || ne();
    }, H = (Z) => {
      Z.key === "Escape" && ne();
    };
    return window.addEventListener("mousedown", E), window.addEventListener("keydown", H), () => {
      window.removeEventListener("mousedown", E), window.removeEventListener("keydown", H);
    };
  }, [ne, W.open]), Ie.useLayoutEffect(() => {
    const E = u.current;
    if (!E)
      return;
    const H = () => {
      const se = E.offsetHeight;
      se > 0 && document.documentElement.style.setProperty("--topbar-height", `${se}px`);
    };
    if (H(), typeof ResizeObserver > "u") {
      const se = () => H();
      return window.addEventListener("resize", se), () => {
        window.removeEventListener("resize", se);
      };
    }
    const Z = new ResizeObserver(H);
    return Z.observe(E), () => Z.disconnect();
  }, []), /* @__PURE__ */ o.jsxs("div", { ref: u, className: "topbar", role: "toolbar", "aria-label": "Tools", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "topbar__tools", role: "presentation", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: g,
          title: "Undo (Ctrl/Cmd+Z)",
          "aria-label": "Undo",
          disabled: p || !h,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.undo })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: S,
          title: "Redo (Ctrl/Cmd+Shift+Z)",
          "aria-label": "Redo",
          disabled: p || !f,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.redo })
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Lo(),
          title: "Copy Selection (Active Layer)",
          "aria-label": "Copy Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.copy })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Lo({ deep: !0 }),
          title: "Deep Copy Selection (Merged)",
          "aria-label": "Deep Copy Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["copy-deep"] })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => vx(),
          title: "Cut Selection",
          "aria-label": "Cut Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.cut })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => n("stamp"),
          title: "Paste (Stamp Tool)",
          "aria-label": "Paste",
          disabled: !y,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.paste })
        }
      ),
      r !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            wx();
          },
          title: "Export PNG…",
          "aria-label": "Export PNG",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.export })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => Se.getState().clear(),
          title: "Clear Selection",
          "aria-label": "Clear Selection",
          disabled: t === 0,
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.clear })
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": e === "pen",
          onClick: () => n("pen"),
          title: "Pen (P)",
          "aria-label": "Pen",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.pen })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.spray })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.line })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.rectangle })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.oval })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["fill-bucket"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.text })
        }
      ),
      l !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": e === "ai",
          onClick: () => n("ai"),
          title: "AI Prompt",
          "aria-label": "AI Prompt",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.ai })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["reference-handle"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.eyedropper })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.stamp })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["selection-rect"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["selection-oval"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["magic-wand"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["selection-lasso"] })
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
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["texture-roll"] })
        }
      ),
      s && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-sampler",
            onClick: () => n("tile-sampler"),
            title: "Tile Sampler (Shift+S)",
            "aria-label": "Tile Sampler",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["tile-sampler"] })
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "topbar__tool-button",
            "data-active": e === "tile-pen",
            onClick: () => n("tile-pen"),
            title: "Tile Pen (Shift+P)",
            "aria-label": "Tile Pen",
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["tile-pen"] })
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
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["tile-rectangle"] })
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
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["tile-9slice"] })
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
            children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be["tile-export"] })
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("span", { className: "topbar__divider", "aria-hidden": "true" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": W.open && W.kind === "layers",
          onClick: Y("layers"),
          title: "Layers",
          "aria-label": "Layers",
          "aria-expanded": W.open && W.kind === "layers",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.layers })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          "data-active": W.open && W.kind === "overlays",
          onClick: Y("overlays"),
          title: "Overlays",
          "aria-label": "Overlays",
          "aria-expanded": W.open && W.kind === "overlays",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.overlays })
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => window.dispatchEvent(new Event("palette:open-add-swatch")),
          title: "Add Swatch Preset",
          "aria-label": "Add Swatch Preset",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.swatch })
        }
      ),
      i !== !1 && /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "topbar__tool-button",
          onClick: () => {
            var E, H;
            (H = (E = window.windowApi) == null ? void 0 : E.toggleFullscreen) == null || H.call(E);
          },
          title: "Toggle Full Screen (F11)",
          "aria-label": "Toggle Full Screen",
          children: /* @__PURE__ */ o.jsx("span", { className: "toolbar__tool-icon", children: be.fullscreen })
        }
      ),
      c && /* @__PURE__ */ o.jsx("div", { className: "topbar__options", children: c })
    ] }),
    W.open && /* @__PURE__ */ o.jsxs(
      "div",
      {
        ref: d,
        className: "bottom-dock__menu",
        role: "menu",
        "aria-label": W.kind === "layers" ? "Layers" : "Overlays",
        style: { top: le.y, left: le.x },
        children: [
          /* @__PURE__ */ o.jsx("div", { className: "bottom-dock__menu-title", children: W.kind === "layers" ? "Layers" : "Overlays" }),
          W.kind === "layers" ? /* @__PURE__ */ o.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ o.jsx(ll, { checked: m, label: "Reference", onChange: j }),
            /* @__PURE__ */ o.jsx(ll, { checked: v, label: "Pixels", onChange: A }),
            a !== !1 && /* @__PURE__ */ o.jsx(ll, { checked: w, label: "Tiles", onChange: L })
          ] }) : /* @__PURE__ */ o.jsxs("div", { className: "bottom-dock__menu-stack", children: [
            /* @__PURE__ */ o.jsx(
              ll,
              {
                checked: _,
                label: "Pixel Grid",
                onChange: C,
                title: "Toggle pixel grid visibility"
              }
            ),
            a !== !1 && /* @__PURE__ */ o.jsx(
              ll,
              {
                checked: b,
                label: "Tile Grid",
                onChange: R,
                title: "Toggle tile grid visibility"
              }
            ),
            /* @__PURE__ */ o.jsx(ll, { checked: T, label: "Axes", onChange: U, title: "Toggle axis visibility" })
          ] })
        ]
      }
    )
  ] });
}, fM = ({
  activeTool: e,
  selectionCount: t,
  activateTool: n,
  showAdvancedTools: s,
  showAiTool: l,
  showExportButton: r,
  showFullscreenButton: i,
  showTileLayerControls: a,
  toolOptions: c
}) => /* @__PURE__ */ o.jsx(hM, { children: /* @__PURE__ */ o.jsx(
  pM,
  {
    activeTool: e,
    selectionCount: t,
    activateTool: n,
    showAdvancedTools: s,
    showAiTool: l,
    showExportButton: r,
    showFullscreenButton: i,
    showTileLayerControls: a,
    toolOptions: c
  }
) }), mM = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAAXNSR0IArs4c6QAAIABJREFUeF7NXQ+0VVWZ/7CBd4OE6xj4Co0rgT6ZlKet6kn+eSQUK2YV2cigMuNrEKRsEhsxExW1nkvTltqokzIsnw4oYTrYGvKVNuBoDtnSnprwRKLH5GOeWnrBoAtOOv6+c37nfue7+5x7H2G112I97jn739m//f3Z3/72t4c0d/S8KSa973cb5X/eOck+kkKhKJVKOfXM/wiWKzaLVCq55VBvAflMamkvSu/6dHuFYiGVpzJQlkJzMd3PYtycbTIuhj94XOkrS6EUleOzltaC9PbU6SfKufZKrQXpC5SrlKt1VcoDOn42oZ5yX1/uuGBMUDYvhca8WCql6h6yvwD2HdGPKhT+YIA9sGwnF+DAqCQAD1Sk0FxQcJEAxZw5o2TVqh0p0H0VOjH2AWCd4BgHbSwCHhMM9UWPwoTzZwtwaraGAHYfm0fBWeACHUuJBCOvOeYp91WkWEpzg1JLQfp6DdUFiDnUnpbLoPyEii3AcScwwQhwFsh/XIAbYBc6Mx0rSiiYoBqyIHhgVWArlq21zihGLJMDncYjmvl9ZSm2QHRUGUWgmRpabgRgW4j1l3urrJ3vlbVvqMPaB8pVCo4LYoKhvoQbBaj4TwIwAVSqM2AWS0UZ6O1LA1woKKWEOFBCxABqoCLNLVUZValUxFNUSA4BKFtOJxhksOd4bnKgPVCQTTPam2T9hj1mwCNM8K8c14dynvLb25qku7taroatVyqiE4rtxc3iN56rTjAQTxCnqzQip0MyuLmlpFgwNSSDKbhrKNR8UQr0GMEgwBg4RSMqHAKquSQplhlxhzQoA73lGoChq6X0khDlG6BInQDKAqwcAsAWRJpRZznqZxDg9THAGYSMfnqAwb3KCbDROECnSKUCiGPwStY+AUx2EQQ4HnjVFo02jI/Ioqj9ATAGSAeO2hMp2A20l8shSuyY0SRrDAVjoAdABDEVcyLmApzi69Uf6GfC7OK+oZ6BWObP6RglF40TmXX/HpXnCdB/NgBH5KWzLRdgQ02WGEEpHihPwc2QWW4yE2ClWkz+igjK4f+gzCKXTFH3ElmNepAvxaLBah3A5Jj8Swq2fW9rbZKe3oiCBzyxxWCmAI4VaXwPAVYxoJMgGiACvK8suthSknIeiw7JuzzKrRFcSklRZ3XmGkXJs1mljJgSIXv5HuUwoPrBAKtUSIGESaGDAgorFgRlFeCWKB80Yjsp8B6/k/rSy1JpbWnSdwTLjkG9dyxDbZp95UTAc2XHnCkFcLZCLUs2jVLc1bM9ZGFly+XKYAKL2RSSERGI1ZlHA0IxfpaSiQF5SNYHYGwKycQU1WO8lPLTCqoFA//H4PMZ69/Qs0dAeSkQm0UoEjtGiVy9rXboQnW1mnIsAVEKO0q8zJVQe5xM6Bve6/xUzlOd1IsWjhLU1XXDi9XOOEVszKuP1Ril6spg1mapNg9gOxQdiw6RpeNEwLTm/CBmXVToHMBkm6BUWIRsAgBW6Qktf+qxWgsw7RMYsCygevL1mWA5yM4ntkY9/+B4EdhKACwBxt9V6/fIwhnVCQUjF2CESLB9hDZ+UUeTXL1qj2rW0PRV0zZWsdSaMMNI0txakoGeHC26IYDNiKcouLkoLW2R0QDsFrLOyiYrC5MZD4AdBQNgzGyfLNCQtZCzNs1oa9JZ7wxOqTxeWcVLUGI9gNGfOe0RUJQ6B6xeJlfc/HBS/80/WSHAkkCjH2gP9X9h/Fhp3TVVFrwY5QEBAODu9XvELtOUkssRwAM90UoBlK0iy1FwiIWX2lqkb0Nv0qcaFp0LcJ4lATK0VEyscqgHwBHgrKLoM5YiKU7Q3iRd6yPWxXJeFoZYMCgm3+xQHfBkglVEwJYBijN3p/qECRCbsLUNlJlXLMmyG4+Rlza/KmOOOEgmXj9SftGzQutCHvAlUPSyT8+VB3e9KsNn75SPrh0nq+9bIdc+v0dmtTUl/aWSx3W3rrHfon6AnCSaOiEyy6DuWrYTpGBrwEBlXqlqbmtOlJ7UV5slChpUwwOfxWtIo1uohuupDs/wMTaB9XXtiMBgClEl34NCGk2Qtc7OIZ9uErl/jyhlDSYB4OXfO1Pe+OUzWowAe9vHuR+ZK8+fv7Mmz+j+qLVNv4r+vlCqKnrgRqu690TatjWcmw7CCliDVWtzmIJDViqVvQCuFbsfadqgbMDODzVIrvdUGzYA5xE+1psz3MgCYK/oeIBJHXjO78+jQI4LKNFPCAD82FaRsctPlOZPnKSAgSrHdT6i+kRWAsCd5x6WvP7CzePkvvKKmuzvb52bPDvrwhVy2Rkip5SKsvLMo5XykdBec+cjKtNB3SAMJdBClSg4zsrCYSwJAdzWLH3rAyw6BHDrrGbp6S4HAbYGBnQQjWI9i4a5NoVsCS097AiAhSMfE5U0UjDlWBbAKEfWOfE3Ii+PzafBLAoGwMc+8qmkMAHGA7zDoP/0K/PkhZ4VSu2gvs7j5sot51ZVbgD8lFtjUy4DOChiTANLTkzAxbP//P5zMu07z+lrcACIKK7pWQZEBsMIdr6giIW2IpsHQ8Gs2LNoziA/lFyHki2D9dYD2LJogMuEQQS15SlMoNxGqDY1oTJYNCnY5k0o+BmRY760RHa9uk0BJlXfuWyZlEol+dziO+THM7fJz7e8JDsfPUhahx+cyFubH3WTmsmy2R4BxkR48B0Rq6Y8VgJSiq5uwFAGgzDtKgcAD/QMJNuQmUqW/dA8Q4fd0lPTpFGMlJrjZ4Fds8Sgb9ta9Ymm4Do0ny7rv82bKJDJv94gMuXsmamKxj+/VqkplDDWXzu5ynoBcGpy9LTIof2/k86HV8jqcVG+nhHr5LGOiIzJmllmwsVPyFUbI6GMSWu1eoCNlUmyA2Xsr16T9s4ZQ0oL+1IeHaH92VJbUQZUTa9+gjeg4501PEBJQAotS+xAoPPMy+fQUDGwWAI2QqEU4WgReKAsnxEgyFkki5fVqUDBs0+tAoa8oD6mQ40cxfMHH3xQtn54uq5nr/riqZoNWrIFru/rv5dpu3sU1N2rR2qe0iXvSOo84PCjZeAH/yVnrnxGfhRbRtj3k+bcLf29azUvtG5QNRO0a7Bo3cGL7f8kNHDRvvVV7foPA9jaJxzA6AzXpSEK4DMLMKs7a1Sk1TaaBguwB72RdsaOHSsPDW/VrD27fyOLR0+QD12zXCnrrpvOSAC2dRFUAB8CmHnvnPU9XXYhEWCw8sPOX67K7fK/G6W6BakaRhGsjWHQ4F66mj/LFQExpgCmy05KyQr4SKnHA9hvvOfqd1Zo7LcfiHUewLrCcC/IWfsbACOfTShzxw7RsrdGnjQ6AMhlgffLmkGuchrBVfOAerGOtYkg4xnfgTpBtUykaChsTJ41zz/vaVlR7qvR1gHw0OM7tVjvv0TKSco6WBBdIyeGptjiVQPwYFn0YAGmTTZrNEMAz4kNDwQaZUOsOosNN4ycyWhZMB579uwBRh4AiGSpkwBvPW6LTDv3b/Q92HAewK/KCSqft/b3pyiYZWA8wbIx2diItxrVyyRWLrhszQc4sO2HRuBCo/ujTPHazK9vvWEf61myHFh3AJxXWjDx8Bza4xSzjKDhIYudgoPvT4oFwGC5SFwOWdAnty+RL6wVGX/EUdEobE4rZB5s/vYUyyEkVfP92T88UFauXJmam/hGjhvGB2wayh1t6uou5Gz8cCPC0lZTpSJVGew27q12DPtyAnBcoTcv6kRoaapZ1lC2DBaMegDvC5XmlQGYkHmghJdvP1cp+MipS2TC5Lly3fMRqFs3b3pbAX742SGZXfR2blAzALbOBNCBE4DjtWoQYAhutUTFe6hY6qQAjjfXfW88BcMAAepEGj823wLR398vUGTqpa6uLjlp+vS69dWrh+/RLhIAHjr1m/r/19f9k4w+/WYpx/Llpod26/NbZoqCXZwsUr4nouAsymX9WRRcr3/TikeksmxbOqB2bshh3V58i/P1dvcKbM8RtUZ/sDNXl4IVYG7Yv6U1zpo1Srfvks2MOgBzzXlODC4H0Mo1/4EAFzLIUzqeEwSUYT5MGJ/f5w214euyv5kfYB/4mZujrbpKRQgw3h932lFSfqrKov/YAENkQZvm2hhmYTo8BAH2ju92UBLn9Xhj3+5NqvO4+ixVvTe4kUBKtpapeoNP8PyAhwBG3ivv6pd5J1d7i3xDRk9NKUf7CjC0/C5jDJ/UFFFwIoOd/LWUPFiK/fxHTkm6+eTaJ+XACaP192tbXta//A0KxnoY5s4Z34k3IULOem6feEhp0UDK0IEZC3NXRMIR6XfMqfVZ8oOH3x2xTdmuS/EcRoTTTkxTYqh8aBKQbedRXihPI/XXm3RL7hIZ9lGRx6/fpNW139OjfycNb5XxckGqiXpKVag/eJYFMFkyy0HJev5gka7uPbr7pjK4J+2KhLyw61svkBqAYcDGprFNAJiaW6ij3JslwMgDYzy14jzgkJfg+XxglW++vE7edUSH/HZzV4pVsx8fmXO3vPBINNgh6vf9zZoo0FhhPfqL058QDC43FcClL1oEnixy3KhhSXWqeBlKthYq3yYsVkznjBmTev38c/FeoStkAaYGTdbMrFCy6O5E8ZkJMC0hKQqOa8qjYLsRT5Mj91tpHiRwNFI8fuUSgbLkQWE+UDyWBNhHJcAw9OP/FiBQWNfisbkTgIMRYuF8xjzTVn1IDn/nebpBP+KgcXLh5Z2y9Ly58vtjF+u+q5XFKPOB2QsSWEKsGcBi6xF/P/ZqZJr7bHskV+5dX/UEwW9OqhAB8RlqsNuooOLEYyZWsuBFw9MWEKlKwQSX3n4Ji24AYGQhBdcDGMBBhlCjhpKEBMWKYAFArnEBAKi3eMgHlErxjlt14A54/8bHvy8j+1ZnUritCzIacsxyFjwb/TkoVCJvrP+G7hghTfzq8sQ5oWfNgEAOQwbbtD8BfqX3Utn0FaOVmoYwbp+bF+1mQZO2ipYFmKdCUgC3XF1Obzb0lQX7wEgkeziNeZ8limk+x2wiiyblog6AcPnll8v8+fMTcxw3BQguZSiVJJqhMRE8e7YAs/4QC0cdoaXZLVv71YODZUMU876rtiZ+1ni/94HYs06iZRLWwwTXU66VqbZusuKREpkfuRXIzXn4M1uAP/ODaP8ZCaCe03uj/v/WlvMSny86ENJBEXiBRetJyZiih7RcHgMcGzBwqKtlRnPqXM6iWbUA+4GxJkeYGJkI8LDZ8/URTI4LF0YyDemAH35Stm/fLke0X6xUiC0zmiXhqIZEEx7+j2f3PNKfbOxDoSOQpHDkA4h+vwL5mIfOcfY7sGZHnjEXblQbL405V30rmhE0dOxvgMfP+jfZvn6x/PL6Q5LuQP+Yf/8KFRfgJkjY0Vt+2ihVtrBEhyMgFjGWiuEdUwuwMXcBYFIwZ1mjAINF2014DDI6CoWFmwZXTkobM0B9SFSisMnAiQAwLbioz2rMyIsPvW1KVCfAY3nawLkmR78unhQBbNuwALN+pWCpOgOe/cWtkQVr88zEsNEI5YJqJx55mPCvbWvHtoX686XKkuTxjz99XQpgm5//BzXT2wVE9e+faJLj76hOZaVgZIhTkIIJMDOB9XoWTTcZuwlgWTPKYj2JGYiZyDUxFRsoMUh7Wxao9wEoOZS81gs2DmVr2Kcek5WLx6k8JTuefn6/dMWrl5CtuhFLGfoAClYPivjEJBzML3sivTSi1kyWTBYMQJHwG3JVj6kYfzaYEpGsMyK/m7Jz09KwLEY+iCho9pjAABgOEtxlwnvoQykKrlkHY+bSOzJuOeRb5c2SyArQATgM4rBiUXGywBGgIJp/hIeh9qGoIWVNMry7bfhDydoXm/hbrvqgloEnhk/Tf3RhArA/CpsHcGJijCsky+ZBAuugyJ0l9dui92l8WC61H9wKJcuwaGwwY/fIphAFe89E7gqhHM2NUBQ2rOpVLZcptNyxbTVitMiiRIBHzmDrBPu3yXMFKml5ljByHnAPn3x9pVtO1yxjCpFCBeCwjYfUtyEO3RD7NMOWrNRcET00gIQxQ/rf2ycnTYEb+lMZUK68GzIIb82aSMlCvUP2F8D0VgTQVLLUgH98pwzrvS3paJbBghkGA7AFxLP+naXZCVWG7M22PVL1YPPREIO6rLEGv8EVSu2RwWhgQ62DOs2fT63vTDb2cZBeRUPsDvvLeKMfdVDK2nUwlSw74RTgON6IAoxlkj+vaykYBUJHO0LO5rBewUBBWYwBAEVhHVt+8ee6jvPGCk8NHuA8K1gjAL/jZ9fWtU9bgGrIM35gKZhgYjsRyU9a5IWOAG9UpF9dP0/HAd/vOcw3ujtl0aJo7Q3Qt7/nvckuFgGmPkFPU/YxD2BdJTUCMPI1wqKzKNh+kAc4T+nxFBGiEiyXrJJFFo12xrZE23k0kHBQDj//ReVdljrqmVJZ1lP6kiXZFrmRX9qYBFp5/b+X5E4yEgLagdIJoEHZ3H2jBdArulkAM2KQAtx6Q7QOrgZFiZyrkcjzLQVz2QFzJCiWztywrngtetPEmTJ9ROS5z5RHwXksz1Mr6iPA+D8pDCIBAwrzIpKnYHpp2K1LlL1sY78qhnkUnGcTt+VQ38gFG5Mjtx5g9AH9y+IuWd4q1KDZlo9KgOeJDI4zJQCz0GCVLOsXZQEGuEcd8V7ZtHm7rh3btt+kHzRYFs1+4eN4hogGENizt394umbBGpcGE6WE1i/ppN152ySdCDAOUDfwA0iWesmccaktSA92I/oBJxv+gk1jCdh3++TUPrd3wc2eVtEb62hoLYfYTaJWzjqskoVnQSUL542sv5Vl0fSKtI7kkOHWeoWKATC30AAujPV7vzel5luydoD8cxhKaCSBAoMlDYEjwKByUAa0dipZmFRwPmfCREDymq/tmG/b2rORjw7q+P//9YhcdsZYfUZ3XxpMvO07C8gshz8Cy8Pp1sccS1JLwfZUIrXoTIAbWSbx0BeEuWdtHty89SVAApsniyeVcBAxaHw2bPaTMunNV+TXAz2JbKVVisD5QcQgE2Bbl93oyNMF0A/vdmQBZrsUF+Q0Vq7Xo9ijrtiReI+QndPhjsdQ8dcfIrDLpBDAKFO1ZMUjgy0mUrDdbMBhKPJ4/PVHQQgywYUpD35F27v/USnX2okTceBOLsBGzcngAfbUiXwAKV4RBN1qwcppmoQBBjoDHA9IwXZyoH44tuUlioYQwN4O7gGGxya9NX0bh38+0qLBzimXMdr+CC3L0cihS6o4AA3fqS26K54wyqJjJSsZdGfoqLdMggymYYNy93ezX4zAXb9YNVYCjAEN+Tdj7YyTgRh8aqohgK15E3VagNl/W78HGHnwzLaB/GSpdqPDg4BykKloNwtgb0e3Dn2sL+SXdtQ11RPjr90deXSCE9BFNmvS4YSDj/cKb4+UqbLt2xXVohnlBoG7yKJpjsxbB2NwACwSPfnpEQiAb/qPV2TB7mlBbwzbcbtlGLIWWSsVlhIYaGt7Dg2CZb0YbFjWHv+H8QnABIAm1ZDTH+vl3jStYnnLOJQJLb1y2YN7ORiAI/yiChKA9WEDFIx8VLKsqSxxqJs5P9GUyZZhcP/J/R16XviSr29VgOslAHj7tWdpto6OaIeJyhR3nAAsl0B5cr2RtkKTKK8cJ5g3e6IMl0++PCYBlEMsKe0xG78fjnJWs2cZS8GMemDjeWGbMAkLGQNcsx+cWgfDa95QMDscMnRYgLe1RrZTAoxdFI1B2VpUgLHVNr0/smohwbKFmNSQN3h208Xt6usM36Ndv3hQblh7qGx5aoUu+pFg6gwNLN5h4Ce70MsHyaOC4yBI+D/TT489Uz70s+rpgVAe5EW+CT/bpmWRZ8ux1X5P7P6qrBvxulaJoCr2Hax1SLRYPbeus2GAuZ2K8txytYYNRj2w561zASYFz+quvGl3hiCgr74oveLH7AseIZk5XwguQh/A7+iNcqceVMY22QWXRPuqFmAsXxBEE0cjAe4FZ5Tkr06Zr8AiXbL81/oX70Flh554XeJUxx0cAhbayalHvW/He1AwJiMmIsCFsuaNPvXa9c4JPPLDcScHoLMGuMK3u2tjfqEdG6FoCGUwOwBwaMniMxszI4s1Iy9kL6hXQznE4QNBwUgbd/fIjaOrTk1Lzz1ZT8ePeH9kqADAfX19subZE3QZBIDPmhlRDgwaHlwLcqPvMCHsNt/WuzuSACoWAE4cmzevDZQFJ0HChrx33ufSKQQyZa1/BwC9adJHSwhRMLxQbIjjqqkyZuaDARidAgXTu8ECzA7jiCNccf/10cjl9JwRnUJwmQdUS/YG9v3u7rUydmg1uMnaYXcKwcij2tAerQURZW09oTrxbPzp0fainwx4Nu9TK2Xc0OFyyXUTEkxQL5WuEJg2go836dL86MM/DRrgeE/YelXqxKvZLkSYXqjNcZQcZPKWLJkZ+VdZcEnBu/suTfkz0V/ola4rlX3hlB4oFOnsU36rVPvdxyK5/O7m1pRzOUcQShpOyTMCjqe2mXv/XjAJLCD+GcpYgPGbbq14bvOHKNhOBuT953sPSKLxTOnamrlKCB1kx3ocplMkLutoreK3NQKwBpxjBVlus7pdGG/4g7ViQ5qBthmVdTAAs4Ng1foBsZM0AMZJPaRFM19QRap1xAq5Y22080OZ/JcdlyX4Mabyzm+lLwk5fOguDUGEhMGFsmPjX+AZ17oEHcc18fy2E94lH5gwRv+Pd3zORvGMADOehs87dddQpeIFCw7WwCsLHv1tLsBWg2boQwKMdk28Vu0GfjcCMDw8eLqQXh00dGg98ItOvCrjL0TQUfpF8yzSwjgwJoT3A9AeMiiYVMzBAjVj8wKn9RhVBlRz6n0R0KBkUC3+vvSej+kzWNGQrC0ca1cLlI0tZcG0gNAoEZKdBJUAoz5GqyOlWy7B//sAKnZy0PRpy0EWwxPj481b5bim8UmEAiqtDEMZis7HOGC2Pm4Pcs2LuFmpWxQq7nQhWDQd31lRDcBvtXT5wlFJaEELMMrYJZLtDOQxvPUhb6+7q096OiIPf0aFa38gcmsB5fLYpi2fhN2viO4I5SVSK6gTYYwukF8J7NZ7Vx+XW86+BFcolYu6LAI3AFeYO2JLkgV1ZiVrr2YeKloWYKsRM8iMpWCW9RFr+dzH74xiglZ7BeBrD4DHJxtCAEekJNIxKzp8hgoQkFN3jgwVs6x1JUVYPxgupk+PtGRGsSElY/YjbiP3beGbZH2R7WDu/dt5qnSdX3w6NcY2ToY3XBz85WnSdvV7Nf/EYcfIXw+v2plRbsWuCak64UhnE+Ts1GGR/9W6vZGG7NvHdihCJXnzIyP9oEwosh6e51EvA5jyLBLckdfw6gDTScZNsf2GX1f6fHA9gCEP4qixYNk4K2yXSqicVMyGABzAxRIIHhcAl+n8i++W1e+/RTVvyDoAwcSjksmEKXTqpHpm6TxdE3MpYj9o3BXN8uy1D8ghQ2clx06QF+z05NcOlNfvfUotTTySwrLgLAsWLJCxk8/UR7b+Sx9ekYqBlULe/GAZC7BXqrIA9koVqvW7RXZZ5ALN6rj40FaoQwFeY8Io6TrYkDkcxLxftDWEQMFOLeJjSkbl2NyHBweUpp+siljwsmXL1JDB9OyPlkn5zq/Jja+dpOvcKVu+K1/9cFvyfue2l2XkuOiMbBbweO7Pz+LZQ+XNWsTGv7ARbvDusa7XNRId0/j71krT0dGm+mCNE1nAW7MjWLQ9J40yeRGiaOCAcx3GmpROd2S2icmAzQZ7PQGDzdl4KsHjozgnYxNuBtPrY8zSCR71TNxFWvL4j6X9rhtl+iHvEznmyOQ9goaBmgEuEmIs33rkT/X/0GgHe2g6a2D53IOK5+N60kdiZW3UF6Z6ADOsU17bljUzX4iC7bEZKlihgHEhwwZVbo0hbaLssD2EcOjtjo3UGoTFHQCHUYIhHPR+n4GKkr11ugbYNkIsA4haW/KTO/am/HpByQT32pe3yMgTothRANimRsEOgRga/ATYUz8evZ53Wr35EXzPI618OUYizdgnH0XIx5lGfiyBwKJtgBzvX8UTm4zHoWeQ4hMSGrahXI10ZwPmJADHHQsCzPB4WA/XAxgb/9zs19gWp9+smhwMHDg5d++lk2XKuntk2RtlpdxP9h+mygsDdg5mtLmcySpTQ6XI6Ch1MO1lUbhlsTn3YmlxCzB+c40LgLkzBDsDHSqQx989gWfQoOErz21dC7DtJ7Z6VclKouwEKDiJf4ipFnvcg4L1hpQ48k4oBPAxU5ckvlBw+oZxAztFSIjI+sKdkfFj02e/rA55+5qg1BFMyP2auvYTqOgfwaSJkWzYB2HL+pZQxFzGTM8CmCArqPHNeHqbjLsnUR3kXVRC3Jth44vkxqrkWvSihaPkhq4dqdu/yBawhAIFQ4bBgRvO3thgOPuEvfrNd57xknzxqvXy9LpOaXr6OdlzzJFVY7xR0PYV7HoUSq3WBiOl9mCVIZ8vpA0zsBv7anfZ8Mzen8E8OCRm3Zt4p4QNiUF27MdAb1zT64N4YC2W2HFoYX9XFcoPKpQhQexZOkpar4mCUPMZTZAI7wCAvWcgO8t4yYMNhMZoAI2U8+Cg7axgpjwYR+q0YNuNAOumS1brT3N4i1RoklqA7U0rzAtOai/Y4rUHBFc149hjg0YNxu/KigzMw2d4H6RgKlk6I1oLap48/tY9kedfrBkk4WubRc+oYjlg5TE/gNth4PY2PDAHx8oo2s3p/8y/oYHz1IM8pFJOjpB89BHfWSZrQvA9vs8emeVhOzr92T7y2hzfbytbF09sUhuB196nfgeyNoqezwvAknp4k19MyCEWDb0pFRA8Kxip1cw0jHx8qDh0L0PCstqaVEPk3UChS6ZIBW8HwDwblcfuBwsw6wrJUt7WklCjaZjyNRQIXdl5fBkJl0JcpahPs4lLlrpNNQaYmzC8dUXlcKxU1YT0x2ZBXZ+IAAAEu0lEQVSDDdGPWYEwSqqtxSSFTWR0gFfEoS4eW+S9AmAfiATQaKKSgsPLOMSM5L0X/G+bBwMOmWj9m7LatnlgQEA5m0KBxH1dvhz6FppQ1kIFZoe4VlHAuGo0fH+2GiD7iYDx9ncsEgNatfSAugsIjn7bgHXKou3VsKFrYuFbxft79PZqc+cvr2ODtu1vMEMc6HrhhENXv4VuXUHHeUEH/09nNhsd3is61o2WTmxUeo7+jcgzb8W7ICXavnq/b8pPC3zI29QbJ+zFGpSh+GvvY8DYlZ1xmjYItAc7BLw0/PWCoYuxcq+2Y7x/f027BRjrLKzbMFg33FCNBcFo4+gQqZuymYCEBinrLsGsm8jsNXWW3ZO6swC2xz88eCGAPQVbj1KCmKX9oiypVGN8xt4WFG+p4K5xQ8l9wvFvezVvsoHgDNL7fPNZ6LIleFuGko04zlPsBNiG9LeDgnqsd37ossh6V81x0uCvvSDLupr681OMa+Hvk2jkajsPsD0Q4KmW4wTR03bNjqrXhQnFTHsxDRceYIaRrLm70IAQAnifrpfNkm25187iqvb26pVkvC9X76+Hlmh4p920xuQAa8d5IG6Y2wkR6gvZHSeWlWf+SjxLXbjcAokxSGy5kHLES6NVZ+HdjLFuwn4xBDOMEnoD+gDuHQwTR971sf72lNB3+yve+Rt/mRq/uzAOrWt3mK2mrfIhvhuXlasNO9650nt+VDnjHe9RLnh8MDYFy4HC/IXNIaCY395jmEVNzIv++GDmvr3QFXwA1xmNdP3qr4a3QEThGKpLS3w7lVd7k1yKSsmioeu4ieEnhAcYRbHEhaJcF2BkSCjU3NOTciHwX+Ni/OtVAAZgrRMAGyekRgHO4iKkyHrAJgAHtFMLsOcGtlw9gFMiUoOg4Hay2p5TgQoBy9yhS6QbuTB6UABXG6uus2q6664CsO/tnYfIBi0bihe8+HHxolLwQPp6WQzSrPbGwheHQPeslYPOOVrv3mHtU+ASTXhPJHdFxQ2rshS6dzgGlxzKcjqlMlwd63Uap0AhIItn7X8agOOPzbxQK74hJPH+i29G42BZgDlYdBHKo1q88+BZRpNVFgB7SuSESo5jmpUA60G5lINbnCd1WYlpFMsemhg9peqqhJF3MjodupR7v7PohIILCO9TVpbNRryClVo/R/w9uqverFtsVFvWDdldROA1k+AWpAoQTz8H0OIt2fYVKCo5L+tuI2E/wDI9UGiPFqTqN1dvUMUzAEmqs7eMUXnMZLcBbc2zXz+mJJbQ/cD2e/dJBocKhTS6ugAD4/h62ixq4ofmAqyTpbYGu/HB9wqwY5mJIYacpgGAlTPYo/UMne90DN25gR+5MQTVxCj0bAafg3hYRoEKLnecshQaw7cV4IhIq5RXQ8EEmIvUjEuE7ZYX95qVgrsjo7tacXqqcpoAhm5ARXfs9lokTyONLjlmmQFwEnqIE8HsnEWytHbvNQVsXI5hIJObu723nAM4S656ZelPAnCIhduO1MiRAMihPU1o3/YAFeqEgqbuK7zzyexsJf1wIkHldJxfNVcs1QCcuwIcPmc2QmtUzl+IPVCzuR6SpTD2018qk3M1Q4FyZ15d5v0F8P8DRj2EnSQgLrAAAAAASUVORK5CYII=", gM = () => typeof window > "u" ? !1 : window.__PSS_BROWSER_DEMO__ === !0, xM = (e, t) => new Promise((n, s) => {
  const l = new Blob([e], { type: t || "image/png" }), r = URL.createObjectURL(l), i = new Image();
  i.onload = () => {
    URL.revokeObjectURL(r), n(i);
  }, i.onerror = () => {
    URL.revokeObjectURL(r), s(new Error("Failed to load reference image"));
  }, i.src = r;
}), yM = () => {
  const e = ie.getState(), t = Te.getState(), n = te.getState(), s = Ye.getState(), l = Bt.getState(), r = V.getState(), i = /* @__PURE__ */ new Map(), a = l.items.filter((c) => c.assetFilename && c.assetData).map((c) => (i.has(c.assetFilename) || i.set(c.assetFilename, {
    filename: c.assetFilename,
    data: c.assetData,
    type: c.assetType
  }), {
    id: c.id,
    filename: c.assetFilename,
    type: c.assetType,
    width: c.width,
    height: c.height,
    x: c.x,
    y: c.y,
    scale: c.scale,
    rotation: c.rotation,
    flipX: c.flipX,
    flipY: c.flipY,
    opacity: c.opacity
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
      references: a.length > 0 ? a : void 0,
      tileSets: r.tileSets.length > 0 ? r.tileSets : void 0,
      tileMaps: r.tileMaps.length > 0 ? r.tileMaps : void 0,
      pixelLayers: {
        layers: n.layers.map((c) => ({
          id: c.id,
          name: c.name,
          visible: c.visible
        })),
        activeLayerId: n.activeLayerId
      }
    },
    layers: n.exportLayerPayloads(),
    referenceFiles: i.size > 0 ? Array.from(i.values()) : void 0
  };
}, vM = async (e) => {
  var p, h, f;
  wd(), rs.getState().clear();
  const t = ie.getState();
  t.setPalette(e.data.palette.colors), Array.isArray(e.data.palette.selectedIndices) ? t.setSelectedIndices(e.data.palette.selectedIndices) : typeof e.data.palette.primaryIndex == "number" ? t.setSelectedIndices([e.data.palette.primaryIndex]) : t.setSelectedIndices([]), Te.getState().setCamera(e.data.camera);
  const s = te.getState();
  e.layers && e.layers.length > 0 ? s.loadLayerPayloads(e.layers, (p = e.data.pixelLayers) == null ? void 0 : p.activeLayerId) : e.blocks ? s.loadBlocks(e.blocks) : s.clear(), z.getState().clear(), Ye.getState().setStacks(((h = e.data.history) == null ? void 0 : h.undoStack) ?? [], ((f = e.data.history) == null ? void 0 : f.redoStack) ?? []);
  const i = Bt.getState();
  i.clear();
  const a = e.data.references ?? [], c = e.referenceFiles ?? [];
  if (a.length > 0 && c.length > 0) {
    const g = new Map(c.map((M) => [M.filename, M])), S = await Promise.all(
      a.map(async (M) => {
        const y = g.get(M.filename);
        if (!y)
          return null;
        const m = await xM(y.data, y.type || M.type), v = Number.isFinite(M.width) ? M.width : m.naturalWidth || m.width, w = Number.isFinite(M.height) ? M.height : m.naturalHeight || m.height;
        return {
          id: M.id,
          image: m,
          assetFilename: y.filename,
          assetType: y.type || M.type,
          assetData: y.data,
          width: v,
          height: w,
          x: M.x ?? 0,
          y: M.y ?? 0,
          scale: M.scale ?? 1,
          rotation: M.rotation ?? 0,
          flipX: M.flipX ?? !1,
          flipY: M.flipY ?? !1,
          opacity: M.opacity ?? 0.7
        };
      })
    );
    for (const M of S)
      M && i.addReference(M);
    i.setSelected(null);
  }
  Pe.getState().setDirty(!1), V.getState().setAll(e.data.tileSets ?? [], e.data.tileMaps ?? []);
}, Mf = async (e) => {
  const t = yM(), n = await window.projectApi.save(t, e);
  if (n) {
    const s = Pe.getState();
    s.setPath(n), s.setDirty(!1);
  }
  return n;
}, wM = async (e) => {
  wd();
  const t = await window.projectApi.load(e);
  if (!t)
    return null;
  await vM(t);
  const n = Pe.getState();
  return n.setPath(t.path), n.setDirty(!1), t.path;
}, Sx = () => {
  wd(), rs.getState().clear(), ie.getState().reset(), Te.getState().resetCamera(), te.getState().clear(), z.getState().clear(), Ye.getState().clear(), Bt.getState().clear(), V.getState().clear();
  const a = Pe.getState();
  a.setPath(null), a.setDirty(!1);
}, SM = (e, t) => {
  if (e.length !== t.length)
    return !1;
  for (let n = 0; n < e.length; n += 1)
    if (e[n] !== t[n])
      return !1;
  return !0;
}, MM = async (e) => {
  var t;
  return (t = window.projectApi) != null && t.read ? window.projectApi.read(e) : (window.alert("Project import is unavailable. Restart the app to load the latest import support."), null);
}, _M = (e, t) => {
  var p;
  const n = ((p = e.data.palette) == null ? void 0 : p.colors) ?? [], s = ie.getState();
  if (!SM(s.colors, n)) {
    window.alert(
      "Palette mismatch. For now, project merge requires both projects to have identical palettes."
    );
    return;
  }
  const l = te.getState(), r = l.activeLayerId, i = Math.trunc(t.offsetX), a = Math.trunc(t.offsetY), c = /* @__PURE__ */ new Map(), u = e.layers && e.layers.length > 0 ? e.layers : e.blocks ? [{ id: "legacy", name: "Layer 1", visible: !0, blocks: e.blocks }] : [];
  for (const h of u)
    if (h.visible !== !1)
      for (const f of h.blocks) {
        const g = f.col * X, S = f.row * X, M = f.data;
        for (let y = 0; y < M.length; y += 1) {
          const m = M[y] ?? 0;
          if (m === 0)
            continue;
          const v = y % X, w = Math.floor(y / X), _ = g + v, b = S + w;
          c.set(`${_}:${b}`, m);
        }
      }
  const d = [];
  for (const [h, f] of c.entries()) {
    const [g, S] = h.split(":"), M = Number(g), y = Number(S), m = M + i, v = y + a, w = l.getPixelInLayer(r, m, v);
    w !== f && d.push({ x: m, y: v, prev: w, next: f });
  }
  Ur(d, { label: "Merge Project" });
}, yn = 8, Sr = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, bM = (e) => vt(e), kM = (e) => e.map((t) => bM(t) ?? { r: 0, g: 0, b: 0 }), _f = (e, t, n) => {
  if (n <= 0)
    return [];
  const s = Array.from(t), l = s.length ? s.reduce(
    (i, a) => {
      const c = e[a];
      return i.r += c.r, i.g += c.g, i.b += c.b, i;
    },
    { r: 0, g: 0, b: 0 }
  ) : { r: 127, g: 127, b: 127 };
  s.length && (l.r /= s.length, l.g /= s.length, l.b /= s.length);
  const r = [];
  for (let i = 0; i < e.length; i += 1)
    t.has(i) || r.push({ idx: i, distance: Sr(e[i], l) });
  return r.sort((i, a) => i.distance - a.distance), r.slice(0, n).map((i) => i.idx);
}, Mx = (e, t) => {
  var p;
  const n = kM(t), s = /* @__PURE__ */ new Map();
  for (const h of e.pixels)
    s.set(h.paletteIndex, (s.get(h.paletteIndex) ?? 0) + 1);
  const l = Array.from(s.keys()).filter((h) => h !== 0);
  if (l.length === 0)
    return {
      paletteIndices: [0, 1, 2, 3].filter((h) => h < t.length),
      paletteRgb: n
    };
  let r = l;
  if (l.length > 3) {
    const h = l.map((M) => ({
      idx: M,
      weight: s.get(M) ?? 1,
      color: n[M]
    })), f = [], g = () => {
      let M = -1, y = h[0].idx;
      for (const m of h) {
        const v = m.weight;
        v > M && (M = v, y = m.idx);
      }
      return y;
    };
    for (f.push(g()); f.length < 3; ) {
      let M = h[0].idx, y = -1;
      for (const m of h) {
        if (f.includes(m.idx))
          continue;
        let v = 1 / 0;
        for (const _ of f)
          v = Math.min(
            v,
            Sr(m.color, n[_])
          );
        const w = v * m.weight;
        w > y && (y = w, M = m.idx);
      }
      f.push(M);
    }
    let S = f;
    for (let M = 0; M < 6; M += 1) {
      const y = /* @__PURE__ */ new Map();
      for (const v of S)
        y.set(v, []);
      for (const v of h) {
        let w = S[0], _ = 1 / 0;
        for (const b of S) {
          const T = Sr(v.color, n[b]);
          T < _ && (_ = T, w = b);
        }
        (p = y.get(w)) == null || p.push(v.idx);
      }
      const m = [];
      for (const [v, w] of y.entries()) {
        if (w.length === 0) {
          m.push(v);
          continue;
        }
        let _ = v, b = 1 / 0;
        for (const T of w) {
          let j = 0;
          for (const A of w) {
            const L = s.get(A) ?? 1;
            j += Sr(n[T], n[A]) * L;
          }
          j < b && (b = j, _ = T);
        }
        m.push(_);
      }
      for (S = Array.from(new Set(m)); S.length < 3; ) {
        const v = _f(
          n,
          /* @__PURE__ */ new Set([0, ...S]),
          1
        );
        if (v.length === 0)
          break;
        S.push(v[0]);
      }
    }
    r = S;
  }
  const i = /* @__PURE__ */ new Set([0, ...r]), a = _f(n, i, 4 - i.size);
  for (const h of a)
    i.add(h);
  const c = Array.from(i), u = c.filter((h) => h === 0), d = c.filter((h) => h !== 0).sort((h, f) => {
    const g = (S) => 0.2126 * S.r + 0.7152 * S.g + 0.0722 * S.b;
    return g(n[h]) - g(n[f]);
  });
  return {
    paletteIndices: [...u, ...d].slice(0, 4),
    paletteRgb: n
  };
}, _x = (e, t, n, s) => {
  const l = e.maxX - e.minX + 1, r = e.maxY - e.minY + 1, i = new Float32Array(n * s * 3), a = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let c = 0; c < n * s; c += 1) {
    const u = c * 3;
    i[u] = a.r, i[u + 1] = a.g, i[u + 2] = a.b;
  }
  for (const c of e.pixels) {
    const u = c.x - e.minX, d = c.y - e.minY;
    if (u < 0 || d < 0 || u >= l || d >= r)
      continue;
    const p = t[c.paletteIndex] ?? a, h = (d * n + u) * 3;
    i[h] = p.r, i[h + 1] = p.g, i[h + 2] = p.b;
  }
  return { data: i, width: l, height: r };
}, bx = (e, t, n, s) => {
  const l = new Uint8Array(t * n), r = new Float32Array(e), i = (c, u, d) => {
    let p = 0, h = 1 / 0;
    for (let f = 0; f < s.length; f += 1) {
      const g = Sr({ r: c, g: u, b: d }, s[f]);
      g < h && (h = g, p = f);
    }
    return p;
  }, a = (c, u, d, p, h, f) => {
    if (c < 0 || u < 0 || c >= t || u >= n)
      return;
    const g = (u * t + c) * 3;
    r[g] += d * f, r[g + 1] += p * f, r[g + 2] += h * f;
  };
  for (let c = 0; c < n; c += 1)
    for (let u = 0; u < t; u += 1) {
      const d = (c * t + u) * 3, p = r[d], h = r[d + 1], f = r[d + 2], g = i(p, h, f);
      l[c * t + u] = g;
      const S = s[g], M = p - S.r, y = h - S.g, m = f - S.b;
      a(u + 1, c, M, y, m, 7 / 16), a(u - 1, c + 1, M, y, m, 3 / 16), a(u, c + 1, M, y, m, 5 / 16), a(u + 1, c + 1, M, y, m, 1 / 16);
    }
  return l;
}, Do = (e) => Math.ceil(e / yn) * yn, kx = (e, t, n) => {
  const s = t / yn, l = n / yn, r = s * l, i = new Uint8Array(r * yn * 2);
  let a = 0;
  for (let c = 0; c < l; c += 1)
    for (let u = 0; u < s; u += 1) {
      const d = u * yn, p = c * yn;
      for (let h = 0; h < yn; h += 1) {
        let f = 0, g = 0;
        for (let S = 0; S < yn; S += 1) {
          const M = (p + h) * t + (d + S), y = e[M] & 3, m = 7 - S;
          f |= (y & 1) << m, g |= (y >> 1 & 1) << m;
        }
        i[a] = f, i[a + 1] = g, a += 2;
      }
    }
  return { data: i, tileCount: r };
}, rr = (e, t, n) => {
  e.setUint16(t, n, !0);
}, TM = (e, t, n) => {
  e.setUint32(t, n, !0);
}, jM = (e, t, n, s) => {
  const l = new TextEncoder().encode(n), r = Math.min(l.length, s - 1);
  for (let i = 0; i < r; i += 1)
    e.setUint8(t + i, l[i]);
  e.setUint8(t + r, 0);
  for (let i = r + 1; i < s; i += 1)
    e.setUint8(t + i, 0);
}, CM = (e, t, n) => {
  const l = 40 + e.length, r = 12 + l, i = new ArrayBuffer(r), a = new DataView(i), c = new Uint8Array(i);
  c.set([71, 66, 79, 48], 0), rr(a, 4, 2), rr(a, 6, 1), TM(a, 8, l);
  let u = 12;
  jM(a, u, "Pixel Splash Studio", 30), u += 30, rr(a, u, yn), u += 2, rr(a, u, yn), u += 2, rr(a, u, t), u += 2;
  for (let d = 0; d < 4; d += 1)
    c[u + d] = n[d] ?? d;
  return u += 4, c.set(e, u), new Uint8Array(i);
}, NM = async () => {
  var f;
  if (!((f = window.projectApi) != null && f.exportGbr))
    return window.alert("Game Boy export is unavailable. Restart the app to load the latest export support."), null;
  const e = ks();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = ie.getState(), { paletteIndices: n, paletteRgb: s } = Mx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = Do(e.maxX - e.minX + 1), r = Do(e.maxY - e.minY + 1), i = n.map((g) => s[g]), { data: a } = _x(e, s, l, r), c = bx(a, l, r, i), { data: u, tileCount: d } = kx(c, l, r), p = CM(u, d, [0, 1, 2, 3]), h = `pixel-splash-selection-${l}x${r}.gbr`;
  return window.projectApi.exportGbr(p, h);
}, PM = async () => {
  var p;
  if (!((p = window.projectApi) != null && p.exportChr))
    return window.alert("CHR export is unavailable. Restart the app to load the latest export support."), null;
  const e = ks();
  if (!e)
    return window.alert("Select a region to export."), null;
  const t = ie.getState(), { paletteIndices: n, paletteRgb: s } = Mx(e, t.colors);
  if (n.length < 4)
    return window.alert("Palette needs at least 4 colors to export."), null;
  const l = Do(e.maxX - e.minX + 1), r = Do(e.maxY - e.minY + 1), i = n.map((h) => s[h]), { data: a } = _x(e, s, l, r), c = bx(a, l, r, i), { data: u } = kx(c, l, r), d = `pixel-splash-selection-${l}x${r}.chr`;
  return window.projectApi.exportChr(u, d);
}, Tx = () => {
  var e;
  return (e = window.projectApi) != null && e.exportImage ? !0 : (window.alert("Image export is unavailable. Restart the app to load the latest export support."), !1);
}, _d = async (e) => {
  const t = ks();
  if (!t)
    return window.alert("Select a region to export."), null;
  if (!Tx())
    return null;
  const { data: n, width: s, height: l } = Md(t), r = new Uint8Array(n), i = `pixel-splash-selection-${s}x${l}.${e}`;
  return window.projectApi.exportImage(e, { kind: "rgba", width: s, height: l, data: r }, i);
}, IM = () => _d("bmp"), EM = () => _d("gif"), AM = () => _d("tga"), RM = async () => {
  const e = ks();
  if (!e)
    return window.alert("Select a region to export."), null;
  if (!Tx())
    return null;
  let t = 0;
  for (const c of e.pixels)
    c.paletteIndex > t && (t = c.paletteIndex);
  if (t > 255)
    return window.alert("PCX export supports palette indices up to 255."), null;
  const { data: n, width: s, height: l } = iM(e), r = ie.getState().colors, i = new Uint8Array(256 * 3);
  for (let c = 0; c < 256; c += 1) {
    const u = r[c];
    if (!u)
      continue;
    const d = vt(u);
    if (!d)
      continue;
    const p = c * 3;
    i[p] = d.r, i[p + 1] = d.g, i[p + 2] = d.b;
  }
  const a = `pixel-splash-selection-${s}x${l}.pcx`;
  return window.projectApi.exportImage(
    "pcx",
    { kind: "indexed", width: s, height: l, data: n, palette: i },
    a
  );
}, an = 320, On = 200, LM = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, DM = (e) => e.map((t) => vt(t) ?? { r: 0, g: 0, b: 0 }), YM = (e, t, n) => {
  const r = Array.from(e.entries()).sort((i, a) => a[1] - i[1]).map(([i]) => i).filter((i) => i <= n).slice(0, t);
  if (r.length >= t)
    return r;
  for (let i = 0; i <= n && r.length < t; i += 1)
    r.includes(i) || r.push(i);
  return r;
}, BM = (e, t) => {
  if (!e)
    return null;
  const n = new Float32Array(an * On * 3), s = t[0] ?? { r: 0, g: 0, b: 0 };
  for (let l = 0; l < an * On; l += 1) {
    const r = l * 3;
    n[r] = s.r, n[r + 1] = s.g, n[r + 2] = s.b;
  }
  for (const l of e.pixels) {
    const r = l.x - e.minX, i = l.y - e.minY;
    if (r < 0 || i < 0 || r >= an || i >= On)
      continue;
    const a = t[l.paletteIndex] ?? s, c = (i * an + r) * 3;
    n[c] = a.r, n[c + 1] = a.g, n[c + 2] = a.b;
  }
  return n;
}, XM = (e, t) => {
  const n = new Uint8Array(an * On);
  for (let s = 0; s < On; s += 1)
    for (let l = 0; l < an; l += 1) {
      const r = (s * an + l) * 3, i = e[r], a = e[r + 1], c = e[r + 2];
      let u = 0, d = 1 / 0;
      for (let p = 0; p < t.length; p += 1) {
        const h = LM({ r: i, g: a, b: c }, t[p]);
        h < d && (d = h, u = p);
      }
      n[s * an + l] = u;
    }
  return n;
}, FM = (e, t, n) => {
  const s = new Uint8Array(7);
  return s[0] = 253, s[1] = e & 255, s[2] = e >> 8 & 255, s[3] = t & 255, s[4] = t >> 8 & 255, s[5] = n & 255, s[6] = n >> 8 & 255, s;
}, OM = (e) => {
  const n = new Uint8Array(80 * On);
  for (let s = 0; s < On; s += 1) {
    const l = (s & 1) * 8192, r = (s >> 1) * 80;
    for (let i = 0; i < an; i += 4) {
      const a = s * an + i, c = e[a] & 3, u = e[a + 1] & 3, d = e[a + 2] & 3, p = e[a + 3] & 3, h = c << 6 | u << 4 | d << 2 | p, f = i >> 2;
      n[l + r + f] = h;
    }
  }
  return n;
}, zM = (e) => {
  const n = 40 * On, s = new Uint8Array(n * 4);
  for (let l = 0; l < On; l += 1)
    for (let r = 0; r < an; r += 1) {
      const i = e[l * an + r] & 15, a = l * 40 + (r >> 3), c = 7 - (r & 7);
      for (let u = 0; u < 4; u += 1) {
        const d = u * n;
        i & 1 << u && (s[d + a] |= 1 << c);
      }
    }
  return s;
}, HM = (e) => e, bd = async (e, t, n, s) => {
  var M;
  if (!((M = window.projectApi) != null && M.exportBsave))
    return window.alert("BSAVE export is unavailable. Restart the app to load the latest export support."), null;
  const l = ks();
  if (!l)
    return window.alert("Select a region to export."), null;
  const r = ie.getState().colors, i = DM(r), a = /* @__PURE__ */ new Map();
  for (const y of l.pixels)
    a.set(y.paletteIndex, (a.get(y.paletteIndex) ?? 0) + 1);
  const c = i.length - 1, d = (t >= i.length ? i.map((y, m) => m) : YM(a, t, c)).map((y) => i[y]), p = BM(l, i);
  if (!p)
    return null;
  const h = XM(p, d);
  let f;
  e === "cga" ? f = OM(h) : e === "ega" ? f = zM(h) : f = HM(h);
  const g = FM(n, 0, f.length), S = new Uint8Array(g.length + f.length);
  return S.set(g, 0), S.set(f, g.length), window.projectApi.exportBsave(S, s);
}, WM = () => bd(
  "cga",
  4,
  47104,
  "pixel-splash-selection-320x200-cga.bsave"
), UM = () => bd(
  "ega",
  16,
  47104,
  "pixel-splash-selection-320x200-ega.bsave"
), $M = () => bd(
  "vga",
  256,
  40960,
  "pixel-splash-selection-320x200-vga.bsave"
), KM = (e) => e.trim().toLowerCase(), GM = (e) => {
  const t = /* @__PURE__ */ new Map(), n = [], s = [];
  return e.forEach((l, r) => {
    const i = KM(l), a = t.get(i);
    if (a !== void 0) {
      n[r] = a;
      return;
    }
    const c = s.length;
    t.set(i, c), n[r] = c, s.push(l);
  }), { mapped: n, nextColors: s };
}, VM = () => {
  const e = ie.getState(), t = e.colors, { mapped: n, nextColors: s } = GM(t);
  if (s.length === t.length)
    return !1;
  const l = (h) => Number.isFinite(h) && h >= 0 && h < n.length ? n[h] : 0, r = e.selectedIndices.map(l);
  e.setPalette(s), e.setSelectedIndices(r);
  const i = te.getState(), a = i.exportLayerPayloads().map((h) => ({
    ...h,
    blocks: h.blocks.map(({ row: f, col: g, data: S }) => {
      const M = new Uint8Array(S.length);
      for (let y = 0; y < S.length; y += 1)
        M[y] = l(S[y]);
      return { row: f, col: g, data: M };
    })
  }));
  i.loadLayerPayloads(a, i.activeLayerId);
  const c = z.getState();
  for (const [h, f] of c.pixels.entries()) {
    const g = l(f.paletteIndex);
    g !== f.paletteIndex && c.pixels.set(h, { ...f, paletteIndex: g });
  }
  const u = Tt.getState();
  if (u.pixels.length > 0) {
    const h = u.pixels.map((g) => ({
      ...g,
      paletteIndex: l(g.paletteIndex)
    })), f = u.origin ?? { x: 0, y: 0 };
    Tt.getState().setBuffer({
      pixels: h,
      origin: f,
      width: u.width,
      height: u.height
    });
  }
  const d = Ye.getState(), p = (h) => ({
    layerId: h.layerId,
    changes: h.changes.map((f) => ({
      ...f,
      prev: l(f.prev),
      next: l(f.next)
    }))
  });
  return d.setStacks(
    d.undoStack.map(p),
    d.redoStack.map(p)
  ), Pe.getState().setDirty(!0), !0;
}, QM = (e, t, n) => e << 16 | t << 8 | n, ZM = (e) => {
  const t = e.palette;
  let n = t ? t.map((i) => Ll({ r: i[0], g: i[1], b: i[2] })) : [];
  if (n.length === 0) {
    let i = 0;
    for (let a = 0; a < e.pixels.length; a += 1)
      e.pixels[a] > i && (i = e.pixels[a]);
    n = Array.from(
      { length: i + 1 },
      (a, c) => Ll({ r: c, g: c, b: c })
    );
  }
  let s = null;
  if (typeof e.transparentIndex == "number" && e.transparentIndex > 0 && e.transparentIndex < n.length) {
    s = e.transparentIndex;
    const i = n[0];
    n[0] = n[s], n[s] = i;
  }
  const l = [], r = e.width;
  for (let i = 0; i < e.pixels.length; i += 1) {
    const a = e.pixels[i];
    let c = a;
    if (s !== null ? a === s ? c = 0 : a === 0 && (c = s) : typeof e.transparentIndex == "number" && a === e.transparentIndex && (c = 0), c === 0)
      continue;
    const u = i % r, d = Math.floor(i / r);
    l.push({ x: u, y: d, paletteIndex: c });
  }
  return { paletteColors: n, pixels: l };
}, qM = (e) => {
  const t = [], n = /* @__PURE__ */ new Map();
  for (let r = 0; r < e.pixels.length; r += 4) {
    if (e.pixels[r + 3] !== 0)
      continue;
    const a = e.pixels[r], c = e.pixels[r + 1], u = e.pixels[r + 2];
    t[0] = Ll({ r: a, g: c, b: u });
    break;
  }
  t[0] || (t[0] = "#000000");
  const s = [], l = e.width;
  for (let r = 0; r < e.pixels.length; r += 4) {
    if (e.pixels[r + 3] === 0)
      continue;
    const a = e.pixels[r], c = e.pixels[r + 1], u = e.pixels[r + 2], d = QM(a, c, u);
    let p = n.get(d);
    p === void 0 && (p = t.length, t.push(Ll({ r: a, g: c, b: u })), n.set(d, p));
    const h = r / 4, f = h % l, g = Math.floor(h / l);
    s.push({ x: f, y: g, paletteIndex: p });
  }
  return { paletteColors: t, pixels: s };
}, JM = (e) => {
  const t = ie.getState(), n = te.getState(), s = Se.getState(), l = Tt.getState();
  if (Sx(), e.colorType === "indexed") {
    const r = ZM(e), i = r.paletteColors.length > 0 ? r.paletteColors : ["#000000"];
    t.setPalette(i, 0, Math.min(1, Math.max(0, i.length - 1))), r.pixels.length > 0 && n.setPixels(r.pixels);
  } else {
    const r = qM(e), i = r.paletteColors.length > 0 ? r.paletteColors : ["#000000"];
    t.setPalette(i, 0, Math.min(1, Math.max(0, i.length - 1))), r.pixels.length > 0 && n.setPixels(r.pixels);
  }
  s.clear(), l.clear(), Pe.getState().setDirty(!0);
}, e_ = (e) => {
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
  }
  return n.length === 1 && n >= "0" && n <= "9" ? { type: "palette-primary", index: Number(n) } : n === "p" ? { type: "tool", tool: "pen" } : n === "r" ? { type: "tool", tool: "rectangle" } : n === "o" ? { type: "tool", tool: "oval" } : n === "s" ? { type: "tool", tool: "spray" } : n === "l" ? { type: "tool", tool: "line" } : n === "f" ? { type: "tool", tool: "fill-bucket" } : n === "t" ? { type: "tool", tool: "text" } : n === "e" ? { type: "tool", tool: "eyedropper" } : n === "w" ? { type: "tool", tool: "magic-wand" } : n === "v" ? { type: "tool", tool: "stamp" } : n === "h" ? { type: "tool", tool: "reference-handle" } : n === "q" ? { type: "tool", tool: "texture-roll" } : null;
}, vc = (e) => e.toString(16).padStart(2, "0"), t_ = (e) => `#${vc(e.r)}${vc(e.g)}${vc(e.b)}`, bf = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, n_ = () => {
  var e;
  if (typeof window > "u")
    return !1;
  try {
    return ((e = window.localStorage) == null ? void 0 : e.getItem(Jg)) === "true";
  } catch {
    return !1;
  }
}, jx = (e) => {
  const t = ra(e), n = Math.floor(t.minX / N), s = Math.floor(t.minY / N), l = Math.ceil(t.maxX / N), r = Math.ceil(t.maxY / N), i = Math.max(0, l - n), a = Math.max(0, r - s);
  if (i === 0 || a === 0)
    return null;
  const c = i * a;
  if ((i > nc || a > nc || c > Yp) && !n_()) {
    const m = `Reference trace is too large (${i}x${a}, ${c.toLocaleString()} px). Reduce the reference scale or set localStorage["${Jg}"]="true" to override.`;
    return typeof window < "u" && window.alert(m), console.warn("[referenceTrace] Trace canvas exceeds limits.", {
      width: i,
      height: a,
      pixelCount: c,
      maxDimension: nc,
      maxPixels: Yp
    }), null;
  }
  const d = document.createElement("canvas");
  d.width = i, d.height = a;
  const p = d.getContext("2d", { willReadFrequently: !0 });
  if (!p)
    return null;
  p.imageSmoothingEnabled = !1;
  const h = $n(e), f = h.centerX / N, g = h.centerY / N, S = h.baseWidth / N, M = h.baseHeight / N;
  p.save(), p.translate(f - n, g - s), p.rotate(h.rotationRad), p.scale(h.scale * h.flipX, h.scale * h.flipY), p.drawImage(
    e.image,
    -S / 2,
    -M / 2,
    S,
    M
  ), p.restore();
  const y = p.getImageData(0, 0, i, a);
  return {
    width: i,
    height: a,
    offsetX: n,
    offsetY: s,
    data: y.data
  };
}, s_ = (e, t) => {
  const n = [];
  for (const s of t) {
    const l = e[s];
    if (!l)
      continue;
    const r = vt(l);
    r && n.push({ paletteIndex: s, rgb: r });
  }
  return n;
}, l_ = (e, t) => {
  const n = /* @__PURE__ */ new Map(), s = Math.max(1, hw);
  for (let r = 0; r < e.length; r += 4) {
    if (e[r + 3] < qg)
      continue;
    const i = Math.min(255, Math.round(e[r] / s) * s), a = Math.min(255, Math.round(e[r + 1] / s) * s), c = Math.min(255, Math.round(e[r + 2] / s) * s), u = `${i},${a},${c}`, d = n.get(u);
    d ? d.count += 1 : n.set(u, { rgb: { r: i, g: a, b: c }, count: 1 });
  }
  return Array.from(n.values()).sort((r, i) => i.count - r.count).slice(0, t).map((r) => r.rgb);
}, r_ = (e) => {
  const t = ie.getState(), n = t.colors, s = /* @__PURE__ */ new Map();
  n.forEach((i, a) => {
    s.set(i.toLowerCase(), a);
  });
  const l = [], r = [];
  for (const i of e) {
    const a = t_(i), c = a.toLowerCase();
    let u = s.get(c);
    u === void 0 && (u = n.length + l.length, l.push(a), s.set(c, u)), r.push({ paletteIndex: u, rgb: i });
  }
  return l.length > 0 && t.setPalette([...n, ...l]), r;
}, Cx = (e, t) => {
  if (t.length === 0)
    return;
  const n = te.getState(), s = [], l = /* @__PURE__ */ new Map();
  for (let r = 0; r < e.height; r += 1)
    for (let i = 0; i < e.width; i += 1) {
      const a = (r * e.width + i) * 4;
      if (e.data[a + 3] < qg)
        continue;
      const u = e.data[a], d = e.data[a + 1], p = e.data[a + 2], h = `${u},${d},${p}`;
      let f = l.get(h);
      if (f === void 0) {
        const y = { r: u, g: d, b: p };
        let m = t[0], v = bf(y, m.rgb);
        for (let w = 1; w < t.length; w += 1) {
          const _ = t[w], b = bf(y, _.rgb);
          b < v && (v = b, m = _);
        }
        f = m.paletteIndex, l.set(h, f);
      }
      const g = e.offsetX + i, S = e.offsetY + r, M = n.getPixel(g, S);
      M !== f && s.push({ x: g, y: S, prev: M, next: f });
    }
  s.length !== 0 && Ur(s, { label: "Reference Trace" });
}, i_ = (e, t) => {
  const n = ie.getState().colors;
  if (n.length === 0)
    return;
  const l = Array.from(new Set(t)).map((a) => Math.round(a)).filter((a) => Number.isFinite(a)).filter((a) => a >= 0 && a < n.length).sort((a, c) => a - c);
  if (l.length === 0)
    return;
  const r = s_(n, l);
  if (r.length === 0)
    return;
  const i = jx(e);
  i && Cx(i, r);
}, o_ = (e, t) => {
  const n = jx(e);
  if (!n)
    return;
  const s = Math.max(
    mu,
    Math.min(t, gu)
  ), l = l_(n.data, s);
  if (l.length === 0)
    return;
  const r = r_(l);
  Cx(n, r);
}, ur = (e, t, n) => Math.min(n, Math.max(t, Math.trunc(e))), As = (e, t, n) => {
  const s = ur(e.x, 0, Math.max(0, t - 1)), l = ur(e.y, 0, Math.max(0, n - 1)), r = ur(e.width, 1, Math.max(1, t - s)), i = ur(e.height, 1, Math.max(1, n - l));
  return { x: s, y: l, width: r, height: i };
}, wc = (e, t, n, s) => {
  const l = As(s, t, n), r = new Uint8Array(l.width * l.height);
  for (let i = 0; i < l.height; i += 1) {
    const c = (l.y + i) * t + l.x, u = i * l.width;
    r.set(e.subarray(c, c + l.width), u);
  }
  return { pixels: r, width: l.width, height: l.height };
}, kf = (e, t, n, s) => {
  const l = ur(s, 1, 8);
  if (l === 1)
    return { pixels: e, width: t, height: n };
  const r = t * l, i = n * l, a = new Uint8Array(r * i);
  for (let c = 0; c < i; c += 1) {
    const u = Math.floor(c / l);
    for (let d = 0; d < r; d += 1) {
      const p = Math.floor(d / l);
      a[c * r + d] = e[u * t + p] ?? 0;
    }
  }
  return { pixels: a, width: r, height: i };
}, a_ = (e, t) => {
  const n = e.r - t.r, s = e.g - t.g, l = e.b - t.b;
  return n * n + s * s + l * l;
}, Tf = (e, t) => {
  const n = t.map((r) => vt(r) ?? { r: 0, g: 0, b: 0 }), s = /* @__PURE__ */ new Map();
  s.set(0, 0);
  const l = n.length > 1 ? Array.from({ length: n.length - 1 }, (r, i) => i + 1) : [0];
  for (let r = 1; r < e.length; r += 1) {
    const i = e[r];
    if (!i)
      continue;
    const a = { r: i[0], g: i[1], b: i[2] };
    let c = l[0] ?? 0, u = Number.POSITIVE_INFINITY;
    for (const d of l) {
      const p = a_(a, n[d] ?? n[0]);
      p < u && (u = p, c = d);
    }
    s.set(r, c);
  }
  return s;
}, jf = (e, t, n) => {
  const s = t.slice(), l = /* @__PURE__ */ new Map();
  l.set(0, 0);
  const r = /* @__PURE__ */ new Set([0]), i = (a, c) => {
    for (let d = 1; d < s.length; d += 1)
      if (!(n.has(d) || r.has(d))) {
        r.add(d), s[d] = c, l.set(a, d);
        return;
      }
    const u = s.length;
    s.push(c), r.add(u), l.set(a, u);
  };
  for (let a = 1; a < e.length; a += 1)
    i(a, e[a] ?? "#000000");
  return { map: l, palette: s };
}, Fi = (e, t) => {
  const n = new Uint8Array(e.length);
  for (let s = 0; s < e.length; s += 1) {
    const l = e[s] ?? 0;
    n[s] = t.get(l) ?? 0;
  }
  return n;
}, Cf = (e, t) => {
  if (e && e.length > 0)
    return e.map((s) => Ll({ r: s[0], g: s[1], b: s[2] }));
  if (!t)
    return ["#000000"];
  let n = 0;
  for (let s = 0; s < t.length; s += 1) {
    const l = t[s] ?? 0;
    l > n && (n = l);
  }
  return Array.from({ length: n + 1 }, (s, l) => Ll({ r: l, g: l, b: l }));
}, c_ = (e, t, n, s) => {
  const l = new Uint8ClampedArray(t * n * 4), r = s.map((i) => vt(i) ?? { r: 0, g: 0, b: 0 });
  for (let i = 0; i < e.length; i += 1) {
    const a = e[i] ?? 0, c = r[a] ?? r[0], u = i * 4;
    l[u] = c.r, l[u + 1] = c.g, l[u + 2] = c.b, l[u + 3] = a === 0 ? 0 : 255;
  }
  return l;
}, Dn = (e, t, n) => Math.min(n, Math.max(t, e)), Sc = (e) => e === "tile-sampler" || e === "tile-pen" || e === "tile-rectangle" || e === "tile-9slice" || e === "tile-export", kl = 0, Yo = 100, kd = Math.log10($s), u_ = Math.log10(Rl), _u = u_ - kd, Nf = 72, Pf = 360, d_ = 32, h_ = (e) => {
  const t = Dn(e, $s, Rl), n = _u === 0 ? 0 : (Math.log10(t) - kd) / _u;
  return Math.round(
    kl + n * (Yo - kl)
  );
}, p_ = (e) => {
  const t = (Dn(e, kl, Yo) - kl) / (Yo - kl), n = kd + t * _u;
  return Math.pow(10, n);
}, f_ = (e) => {
  try {
    return new TextEncoder().encode(JSON.stringify(e)).length;
  } catch {
    return 0;
  }
}, Jt = (e) => Object.fromEntries(Object.entries(e).filter(([, t]) => typeof t != "function")), If = (e) => {
  if (e < 1024)
    return `${e}B`;
  const t = e / 1024;
  if (t < 1024)
    return `${t.toFixed(t < 10 ? 1 : 0)}KB`;
  const n = t / 1024;
  return n < 1024 ? `${n.toFixed(n < 10 ? 1 : 0)}MB` : `${(n / 1024).toFixed(1)}GB`;
}, Ef = (e) => e.reduce((t, n) => t + n.block.byteLength, 0), Af = (e) => {
  if (!(e instanceof HTMLElement))
    return !1;
  const t = e.tagName.toLowerCase();
  return t === "input" || t === "textarea" ? !0 : e.isContentEditable;
}, m_ = () => {
  const t = te.getState().layers.reduce(
    (M, y) => M + Ef(y.store.getBlocks()),
    0
  ), n = Ef(Se.getState().store.getBlocks()), s = z.getState().pixels.size * Bp, l = Tt.getState().pixels.length * Bp, r = Bt.getState().items.reduce((M, y) => M + y.width * y.height * 4, 0), i = Ye.getState();
  let a = 0;
  for (const M of i.undoStack)
    a += M.changes.length;
  for (const M of i.redoStack)
    a += M.changes.length;
  const c = a * fw, d = ie.getState().colors.reduce((M, y) => M + y.length * 2, 0) + yd * 2, p = {
    tool: Jt(Kt.getState()),
    brush: Jt(on.getState()),
    spray: Jt(Wt.getState()),
    rectangle: Jt(Co.getState()),
    oval: Jt(No.getState()),
    selection: Jt(Dl.getState()),
    fill: Jt(xt.getState()),
    stamp: Jt($e.getState()),
    viewport: Jt(Te.getState()),
    layers: Jt(De.getState()),
    project: Jt(Pe.getState()),
    referenceHandle: Jt(Eo.getState())
  }, h = f_(p), f = [
    { label: "px", bytes: t },
    { label: "sel", bytes: n },
    { label: "prev", bytes: s },
    { label: "clip", bytes: l },
    { label: "ref", bytes: r },
    { label: "hist", bytes: c },
    { label: "pal", bytes: d },
    { label: "ui", bytes: h }
  ], g = f.reduce((M, y) => M + y.bytes, 0), S = f.filter((M) => M.bytes > 0).map((M) => `${M.label} ${If(M.bytes)}`);
  return `Mem ${If(g)}${S.length ? ` • ${S.join(" • ")}` : ""}`;
}, g_ = () => {
  const e = gM(), t = Ye((x) => x.undo), n = Ye((x) => x.redo), s = Se((x) => x.selectedCount), l = Pe((x) => x.path), r = Pe((x) => x.dirty), [i, a] = k.useState(!1), [c, u] = k.useState(!1), [d, p] = k.useState(!1), [h, f] = k.useState(!1), [g, S] = k.useState(!0), [M, y] = k.useState(!1), [m, v] = k.useState("pen"), [w, _] = k.useState(""), [b, T] = k.useState("monospace"), [j, A] = k.useState(16), [L, C] = k.useState(!1), [R, U] = k.useState("pen"), [W, re] = k.useState(""), [le, ne] = k.useState(!1), [Y, E] = k.useState(null), [H, Z] = k.useState(null), [se, $] = k.useState(0), [he, ye] = k.useState(0), [fe, O] = k.useState(!1), [Q, B] = k.useState(null), [J, ce] = k.useState([]), [pe, Ge] = k.useState(2), [Me, ve] = k.useState("nearest"), [we, Ve] = k.useState(0), ct = 32, ge = 2, [mt, Re] = k.useState(!0), [Rt, Zt] = k.useState(!1), [jt, Gn] = k.useState(""), [Pn, _n] = k.useState(96), [Vn, Qe] = k.useState(220), ue = Kt((x) => x.activeTool), et = Kt((x) => x.setActiveTool), hn = De((x) => x.showReferenceLayer), pn = De((x) => x.showPixelLayer), Ts = De((x) => x.showTileLayer), In = De((x) => x.showPixelGrid), Fl = De((x) => x.showTileGrid), Ol = De((x) => x.showAxes), P = De((x) => x.setShowReferenceLayer), I = De((x) => x.setShowPixelLayer), G = De((x) => x.setShowTileLayer), ae = De((x) => x.setShowPixelGrid), je = De((x) => x.setShowTileGrid), Ct = De((x) => x.setShowAxes), ut = V((x) => x.tileSets), En = V((x) => x.tileMaps), An = V((x) => x.activeTileSetId), Qn = V((x) => x.activeTileMapId), zl = V((x) => x.selectedTileIndex), Vs = V((x) => x.selectedTileIndices), Hl = V((x) => x.tilePage), Px = V((x) => x.tilePageCount), $r = V((x) => x.setTilePage), js = V((x) => x.tilePickerZoom), Td = V((x) => x.setTilePickerZoom), jd = V((x) => x.tilePlacementMode), Cd = V((x) => x.setTilePlacementMode), Nd = V((x) => x.tilePenSnapToCluster), Pd = V((x) => x.setTilePenSnapToCluster), Id = V((x) => x.setActiveTileSet), Ed = V((x) => x.setTileSetLayout), Ad = V((x) => x.addTileSet), Rd = V((x) => x.duplicateTileSet), Ld = V((x) => x.renameTileSet), Dd = V((x) => x.deleteTileSet), Yd = V((x) => x.deleteTilesFromSet), Ix = on((x) => x.size), Bd = on((x) => x.shape), Xd = Wt((x) => x.radius), Fd = Wt((x) => x.density), Od = Wt((x) => x.falloff), zd = Co((x) => x.mode), Hd = Co((x) => x.setMode), Wd = No((x) => x.mode), Ud = No((x) => x.setMode), $d = Dl((x) => x.snap), Kd = Dl((x) => x.setSnap), Gd = xt((x) => x.mode), Vd = xt((x) => x.setMode), Kr = xt((x) => x.gradientDirection), Gr = xt((x) => x.setGradientDirection), Vr = xt((x) => x.gradientDither), Qr = xt((x) => x.setGradientDither), ia = ie((x) => x.selectedIndices), Zr = ia.length, Ex = ie((x) => x.getActiveIndex()), qr = $e((x) => x.mode), Jr = $e((x) => x.snap), Ax = $e((x) => x.rotation), Rx = $e((x) => x.scale), Qd = $e((x) => x.flipX), Zd = $e((x) => x.flipY), ei = $e((x) => x.drag), oa = $e((x) => x.pasteDuplicateColors), qd = V((x) => x.tileDebugOverlay), aa = V((x) => x.setTileDebugOverlay), Lx = V((x) => x.nineSlice), Dx = V((x) => x.selectedTileCols), Yx = V((x) => x.selectedTileRows), ca = Bt((x) => x.removeReference), ti = Ie.useRef(!1), Qs = k.useRef(null), Jd = k.useRef(null), Wl = k.useRef(null), Ee = 8, Zs = Q ? Math.floor(Q.width / Ee) : 0, Cs = Q ? Math.floor(Q.height / Ee) : 0, ni = Math.max(1, Math.ceil(Cs / ct)), si = Math.min(Math.max(0, we), Math.max(0, ni - 1)), eh = si * ct, Ul = J[J.length - 1] ?? null;
  k.useEffect(() => {
    const x = window.setTimeout(() => {
      S(!1);
    }, 2e3);
    return () => window.clearTimeout(x);
  }, []), k.useEffect(() => {
    var ee, Ce, Ne, Xe;
    const x = document.documentElement, D = (rt) => {
      const We = Number.isFinite(rt) && rt > 0 ? rt : 1;
      x.style.setProperty("--ui-scale", String(We));
    };
    D(((Ce = (ee = window.uiScaleApi) == null ? void 0 : ee.getScale) == null ? void 0 : Ce.call(ee)) ?? 1);
    const K = (Xe = (Ne = window.uiScaleApi) == null ? void 0 : Ne.onScaleChange) == null ? void 0 : Xe.call(Ne, D);
    return () => {
      K && K();
    };
  }, []), k.useEffect(() => {
    var x;
    if ((x = window.paletteApi) != null && x.onApply)
      return window.paletteApi.onApply((D) => {
        const K = Array.isArray(D.colors) ? D.colors : [];
        if (K.length === 0)
          return;
        const ee = ie.getState();
        ee.setPalette(K), ee.setSelectedIndices([]), Pe.getState().setDirty(!0);
      });
  }, []);
  const th = $e((x) => x.setMode), nh = $e((x) => x.setSnap), Bx = $e((x) => x.setRotation), Xx = $e((x) => x.setScale), Fx = $e((x) => x.setFlipX), Ox = $e((x) => x.setFlipY), sh = $e((x) => x.setDrag), zx = $e(
    (x) => x.setPasteDuplicateColors
  ), ua = on((x) => x.setSize), da = on((x) => x.setShape), lh = Wt((x) => x.setRadius), rh = Wt((x) => x.setDensity), ih = Wt((x) => x.setFalloff), ha = k.useCallback(
    (x) => {
      if (x === "selection-lasso") {
        et("selection-lasso"), ua(1), da("round");
        return;
      }
      if (x === "text") {
        v((D) => ue === "text" ? D : ue), et("text"), y(!0);
        return;
      }
      if (x === "ai") {
        U((D) => ue === "ai" ? D : ue), et("ai"), C(!0);
        return;
      }
      et(x);
    },
    [ue, et, da, ua]
  ), Zn = ie((x) => x.colors), li = Eo((x) => x.snap), oh = Eo((x) => x.setSnap), ah = Bt((x) => x.setSelected), Be = Bt(
    (x) => x.selectedId ? x.items.find((D) => D.id === x.selectedId) ?? null : null
  ), Hx = Bt((x) => x.updateReference), [pa, Wx] = k.useState(pw), fa = bw(), oe = ut.find((x) => x.id === An) ?? ut[0], ch = En.find((x) => x.id === Qn) ?? En[0], Ns = Ie.useMemo(() => {
    const x = new Set(Vs.filter((D) => D >= 0));
    return Array.from(x).sort((D, K) => D - K);
  }, [Vs]), ma = k.useCallback(
    (x) => {
      Number.isFinite(x) && Td(x);
    },
    [Td]
  ), ga = Math.max(1, Px), xa = Math.min(Hl, ga - 1), Ux = k.useCallback(() => {
    $r(Hl - 1);
  }, [$r, Hl]), $x = k.useCallback(() => {
    $r(Hl + 1);
  }, [$r, Hl]), uh = k.useCallback(
    (x, D) => {
      oe && (!Number.isFinite(x) || !Number.isFinite(D) || Ed(oe.id, x, D));
    },
    [oe, Ed]
  ), Kx = k.useCallback(() => {
    const x = (oe == null ? void 0 : oe.tileWidth) ?? _e, D = (oe == null ? void 0 : oe.tileHeight) ?? _e;
    Ad({
      name: `Tile Set ${ut.length + 1}`,
      tileWidth: x,
      tileHeight: D,
      columns: 1,
      rows: 1,
      tiles: []
    });
  }, [oe, Ad, ut.length]), Gx = k.useCallback(() => {
    oe && Rd(oe.id);
  }, [oe, Rd]), Vx = k.useCallback(() => {
    if (!oe)
      return;
    const x = oe.name, D = window.prompt("Rename tile set", x);
    if (typeof D != "string")
      return;
    const K = D.trim();
    !K || K === x || Ld(oe.id, K);
  }, [oe, Ld]), Qx = k.useCallback(() => {
    if (!oe)
      return;
    const x = En.filter((K) => K.tileSetId === oe.id).length, D = x > 0 ? `Delete ${oe.name}? This will also delete ${x} linked tile map${x === 1 ? "" : "s"}.` : `Delete ${oe.name}?`;
    window.confirm(D) && Dd(oe.id);
  }, [oe, Dd, En]), Zx = k.useCallback(() => {
    if (!oe || Ns.length === 0)
      return;
    const x = Ns.length === 1 ? "tile" : "tiles";
    window.confirm(
      `Delete ${Ns.length} ${x} from ${oe.name}? This cannot be undone.`
    ) && Yd(oe.id, Ns);
  }, [oe, Yd, Ns]), Rn = h && Sc(ue), qx = Rn ? Vn : Pn, ya = Ie.useRef("palette"), va = Ie.useRef(!1), ri = k.useCallback(
    (x) => {
      const D = Math.max(16, x.tileWidth * js), K = Math.max(1, x.rows) * D;
      return Dn(
        K + d_,
        Nf,
        Pf
      );
    },
    [js]
  ), Jx = k.useCallback(
    (x) => {
      Id(x);
      const D = ut.find((K) => K.id === x);
      D && Qe(ri(D));
    },
    [ri, Id, ut]
  );
  k.useEffect(() => {
    if (!Rn || !An)
      return;
    const x = ut.find((D) => D.id === An);
    x && Qe(ri(x));
  }, [
    Rn,
    An,
    ri,
    ut
  ]);
  const ey = (x) => {
    x.preventDefault(), x.currentTarget.setPointerCapture(x.pointerId), ya.current = Rn ? "tile" : "palette", va.current = !0;
  };
  k.useEffect(() => {
    const x = (K) => {
      if (!va.current)
        return;
      const ee = document.documentElement.clientHeight, Ce = Math.max(
        Nf,
        Math.min(Pf, ee - K.clientY)
      );
      ya.current === "tile" ? Qe(Ce) : _n(Ce);
    }, D = () => {
      ya.current = Rn ? "tile" : "palette", va.current = !1;
    };
    return window.addEventListener("pointermove", x), window.addEventListener("pointerup", D), () => {
      window.removeEventListener("pointermove", x), window.removeEventListener("pointerup", D);
    };
  }, [Rn]);
  const ty = (mt ? 0 : 324) + 24;
  k.useEffect(() => {
    if (e) {
      f(!1);
      return;
    }
    let x = !1;
    return (async () => {
      try {
        const K = await window.optionsApi.getAdvancedMode();
        x || f(!!K);
      } catch {
      }
    })(), () => {
      x = !0;
    };
  }, [e]), k.useEffect(() => {
    ue !== "reference-handle" && ah(null);
  }, [ue, ah]), k.useEffect(() => {
    !h && Sc(ue) && et("pen");
  }, [h, ue, et]), k.useEffect(() => {
    e && ue === "ai" && et("pen");
  }, [ue, e, et]);
  const ii = Ie.useCallback(async () => (e || await Mf(l ?? void 0), null), [e, l]), dh = Ie.useCallback(async () => (e || await Mf(void 0), null), [e]), oi = Ie.useCallback(async () => {
    if (e)
      return null;
    if (!(r && !window.confirm("You have unsaved changes. Continue?")))
      return await wM(void 0), null;
  }, [e, r]), ai = Ie.useCallback(() => {
    r && !window.confirm("You have unsaved changes. Continue?") || Sx();
  }, [r]), ci = Ie.useCallback(() => {
    a(!0);
  }, [a]), hh = k.useCallback(async () => {
    const x = await MM();
    x && (Z(x), E(x.path ?? null), $(0), ye(0), ne(!0));
  }, []), ph = k.useCallback(async () => {
    var K;
    if (!((K = window.projectApi) != null && K.importImage)) {
      window.alert("Import is unavailable. Restart the app to load the latest import support.");
      return;
    }
    const x = await window.projectApi.importImage();
    if (!x)
      return;
    if (!(x.format === "nes" || x.format === "gb" || x.format === "gbc" || x.format === "chr")) {
      (x.width > 512 || x.height > 512) && window.alert("Large images (over 512x512) can take a while to load."), JM(x);
      return;
    }
    if (x.colorType !== "indexed") {
      window.alert("ROM import preview requires indexed pixels.");
      return;
    }
    B(x), ce([
      {
        x: 0,
        y: 0,
        width: Math.floor(x.width / Ee),
        height: Math.floor(x.height / Ee)
      }
    ]), Ge(2), ve("nearest"), Ve(0), O(!0);
  }, []), ui = k.useCallback(() => {
    O(!1), B(null), ce([]), Wl.current = null;
  }, []), di = k.useCallback(
    (x) => {
      Q && ce((D) => {
        if (D.length === 0)
          return D;
        const K = D.slice(), ee = K[K.length - 1] ?? { x: 0, y: 0, width: 1, height: 1 };
        return K[K.length - 1] = As({ ...ee, ...x }, Zs, Cs), K;
      });
    },
    [Q, Zs, Cs]
  ), hi = k.useCallback(() => {
    const x = te.getState(), D = /* @__PURE__ */ new Set();
    for (const K of x.layers)
      for (const ee of K.store.getBlocks())
        for (let Ce = 0; Ce < ee.block.length; Ce += 1) {
          const Ne = ee.block[Ce] ?? 0;
          Ne !== 0 && D.add(Ne);
        }
    return D;
  }, []), ny = k.useCallback(() => {
    if (!Q || J.length === 0)
      return;
    if (!Q.palette) {
      window.alert("ROM palette is missing.");
      return;
    }
    const x = J.map((me) => As(me, Zs, Cs)).filter((me) => me.width > 0 && me.height > 0);
    if (x.length === 0) {
      window.alert("Select at least one region.");
      return;
    }
    const D = Cf(Q.palette, Q.pixels), K = x.map((me) => {
      const ot = As(
        {
          x: me.x * Ee,
          y: me.y * Ee,
          width: me.width * Ee,
          height: me.height * Ee
        },
        Q.width,
        Q.height
      ), Lt = wc(
        Q.pixels,
        Q.width,
        Q.height,
        ot
      );
      return kf(Lt.pixels, Lt.width, Lt.height, pe);
    }), ee = Ee * pe, Ce = Math.max(Ee * pe * 32, 512);
    let Ne = 0, Xe = 0, rt = 0;
    const We = [];
    for (const me of K) {
      const ot = me.width, Lt = me.height;
      Ne > 0 && Ne + ot > Ce && (Ne = 0, Xe += rt + ee, rt = 0), We.push({ x: Ne, y: Xe, w: ot, h: Lt, pixels: me.pixels }), Ne += ot + ee, rt = Math.max(rt, Lt);
    }
    const Oe = We.length === 0 ? 1 : Math.max(...We.map((me) => me.x + me.w)), St = We.length === 0 ? 1 : Math.max(...We.map((me) => me.y + me.h)), it = new Uint8Array(Oe * St);
    for (const me of We)
      for (let ot = 0; ot < me.h; ot += 1)
        for (let Lt = 0; Lt < me.w; Lt += 1)
          it[(me.y + ot) * Oe + (me.x + Lt)] = me.pixels[ot * me.w + Lt] ?? 0;
    const Nt = ie.getState(), qn = hi();
    let qt;
    if (Me === "unused") {
      const me = jf(D, Nt.colors, qn);
      if (!window.confirm(
        "This will write ROM colors into unused palette slots (and may append new colors). Continue?"
      ))
        return;
      Nt.setPalette(me.palette), Nt.setSelectedIndices([]), qt = Fi(it, me.map);
    } else {
      const me = Tf(Q.palette, Nt.colors);
      qt = Fi(it, me);
    }
    const Kl = [];
    for (let me = 0; me < qt.length; me += 1) {
      const ot = qt[me] ?? 0;
      ot !== 0 && Kl.push({ x: me % Oe, y: Math.floor(me / Oe), paletteIndex: ot });
    }
    Tt.getState().setBuffer({
      pixels: Kl,
      origin: { x: 0, y: 0 },
      width: Oe,
      height: St
    }), $e.getState().setSnap("tile"), $e.getState().setScale(1), Kt.getState().setActiveTool("stamp"), ui();
  }, [
    ui,
    hi,
    Me,
    Q,
    pe,
    J,
    Zs,
    Cs
  ]);
  k.useEffect(() => {
    const x = J[J.length - 1] ?? null;
    if (!fe || !Q || !x)
      return;
    const D = Qs.current, K = Jd.current;
    if (!D || !K)
      return;
    const ee = Cf(Q.palette, Q.pixels), Ce = Math.floor(Q.width / Ee), Ne = Math.floor(Q.height / Ee), Xe = Math.max(1, Math.ceil(Ne / ct)), We = Math.min(Math.max(0, we), Xe - 1) * ct, Oe = Math.min(ct, Math.max(0, Ne - We)), St = wc(Q.pixels, Q.width, Q.height, {
      x: 0,
      y: We * Ee,
      width: Ce * Ee,
      height: Oe * Ee
    }), it = J.map((de) => As(de, Ce, Ne)).filter((de) => de.width > 0 && de.height > 0), Nt = it.map((de) => {
      const Ue = As(
        {
          x: de.x * Ee,
          y: de.y * Ee,
          width: de.width * Ee,
          height: de.height * Ee
        },
        Q.width,
        Q.height
      ), nt = wc(
        Q.pixels,
        Q.width,
        Q.height,
        Ue
      ), el = kf(nt.pixels, nt.width, nt.height, pe);
      return { rect: de, scaled: el };
    }), qn = (de, Ue, nt, el, _a, ba) => {
      const mi = Math.max(1, Math.trunc(ba)), tl = document.createElement("canvas");
      tl.width = Ue, tl.height = nt;
      const _h = tl.getContext("2d");
      if (!_h)
        return;
      const ay = c_(el, Ue, nt, _a);
      _h.putImageData(new ImageData(ay, Ue, nt), 0, 0), de.width = Ue * mi, de.height = nt * mi;
      const gi = de.getContext("2d");
      gi && (gi.imageSmoothingEnabled = !1, gi.clearRect(0, 0, de.width, de.height), gi.drawImage(tl, 0, 0, de.width, de.height));
    };
    qn(
      D,
      St.width,
      St.height,
      St.pixels,
      ee,
      ge
    );
    const qt = D.getContext("2d");
    if (qt) {
      qt.save(), qt.imageSmoothingEnabled = !1, qt.strokeStyle = "rgba(255, 74, 100, 0.95)", qt.lineWidth = 1;
      for (const de of it) {
        const Ue = de.y - We;
        if (Ue + de.height <= 0 || Ue >= Oe)
          continue;
        const nt = Math.max(0, Ue), el = Math.min(Oe, Ue + de.height) - nt;
        if (el <= 0)
          continue;
        const _a = de.x * Ee * ge, ba = nt * Ee * ge, mi = de.width * Ee * ge, tl = el * Ee * ge;
        qt.strokeRect(_a + 0.5, ba + 0.5, mi - 1, tl - 1);
      }
      qt.restore();
    }
    const Kl = Ee * pe, me = Math.max(Ee * pe * 32, 512);
    let ot = 0, Lt = 0, pi = 0;
    const Js = [];
    for (const de of Nt) {
      const Ue = de.scaled.width, nt = de.scaled.height;
      ot > 0 && ot + Ue > me && (ot = 0, Lt += pi + Kl, pi = 0), Js.push({ x: ot, y: Lt, w: Ue, h: nt, pixels: de.scaled.pixels }), ot += Ue + Kl, pi = Math.max(pi, nt);
    }
    const wa = Js.length === 0 ? 1 : Math.max(...Js.map((de) => de.x + de.w)), Mh = Js.length === 0 ? 1 : Math.max(...Js.map((de) => de.y + de.h)), fi = new Uint8Array(wa * Mh);
    for (const de of Js)
      for (let Ue = 0; Ue < de.h; Ue += 1)
        for (let nt = 0; nt < de.w; nt += 1)
          fi[(de.y + Ue) * wa + (de.x + nt)] = de.pixels[Ue * de.w + nt] ?? 0;
    let Sa = fi, Ma = Zn;
    if (Me === "nearest") {
      const de = Q.palette;
      if (!de)
        return;
      const Ue = Tf(de, Zn);
      Sa = Fi(fi, Ue), Ma = Zn;
    } else {
      const de = hi(), { map: Ue, palette: nt } = jf(ee, Zn, de);
      Sa = Fi(fi, Ue), Ma = nt;
    }
    qn(K, wa, Mh, Sa, Ma, 2);
  }, [
    hi,
    Zn,
    fe,
    Me,
    Q,
    we,
    pe,
    J
  ]), k.useEffect(() => {
    const x = (D) => {
      var Ce, Ne, Xe, rt, We, Oe;
      if (Af(D.target))
        return;
      if (!(D.ctrlKey || D.metaKey)) {
        const St = D.key.toLowerCase();
        if ((St === "delete" || St === "backspace") && ue === "reference-handle" && Be) {
          D.preventDefault(), ca(Be.id);
          return;
        }
        if (St === "delete" || St === "backspace") {
          if (Se.getState().selectedCount === 0)
            return;
          D.preventDefault(), uM();
          return;
        }
        const it = e_({
          key: D.key,
          altKey: D.altKey,
          ctrlKey: D.ctrlKey,
          metaKey: D.metaKey,
          shiftKey: D.shiftKey
        });
        if (it) {
          if (it.type === "tool") {
            if (!h && Sc(it.tool))
              return;
            D.preventDefault(), ha(it.tool);
            return;
          }
          if (it.type === "palette-primary") {
            const Nt = ie.getState();
            it.index >= 0 && it.index < Nt.colors.length && (D.preventDefault(), Nt.setSelectedIndices([it.index]));
            return;
          }
        }
        return;
      }
      const ee = D.key.toLowerCase();
      if (ee === "v") {
        ti.current = !0, window.setTimeout(() => {
          ti.current = !1;
        }, 200);
        return;
      }
      if (ee === "+" || ee === "=") {
        D.preventDefault(), (Ne = (Ce = window.uiScaleApi) == null ? void 0 : Ce.stepScale) == null || Ne.call(Ce, 1.1);
        return;
      }
      if (ee === "-") {
        D.preventDefault(), (rt = (Xe = window.uiScaleApi) == null ? void 0 : Xe.stepScale) == null || rt.call(Xe, 0.9090909090909091);
        return;
      }
      if (ee === "0") {
        D.preventDefault(), (Oe = (We = window.uiScaleApi) == null ? void 0 : We.resetScale) == null || Oe.call(We);
        return;
      }
      if (ee === "z") {
        if (D.preventDefault(), Ye.getState().locked)
          return;
        D.shiftKey ? n() : t();
      }
      if (ee === "y") {
        if (D.preventDefault(), Ye.getState().locked)
          return;
        n();
      }
      if (ee === "s") {
        if (D.preventDefault(), e)
          return;
        ii();
      }
      if (ee === "o") {
        if (D.preventDefault(), e)
          return;
        oi();
      }
      if (ee === "n" && (D.preventDefault(), ai()), ee === "c") {
        if (Se.getState().selectedCount === 0)
          return;
        D.preventDefault(), D.shiftKey ? Lo({ deep: !0 }) : Lo();
      }
      if (ee === "x") {
        if (Se.getState().selectedCount === 0)
          return;
        D.preventDefault(), vx();
      }
      ee === "/" && (D.preventDefault(), ci());
    };
    return window.addEventListener("keydown", x), () => window.removeEventListener("keydown", x);
  }, [
    ue,
    ha,
    e,
    oi,
    ai,
    ii,
    ci,
    h,
    n,
    ca,
    Be,
    t
  ]), k.useEffect(() => {
    ue !== "text" && M && y(!1);
  }, [ue, M]);
  const $l = (x) => {
    Be && Hx(Be.id, x);
  }, fh = (x) => {
    Number.isFinite(x) && $l({
      rotation: Dn(x, qa, Ja)
    });
  }, mh = (x) => {
    Number.isFinite(x) && $l({
      scale: Dn(x, $s, Rl)
    });
  }, gh = (x) => {
    Number.isFinite(x) && $l({
      opacity: Dn(x, ec, tc)
    });
  }, qs = Ie.useMemo(() => {
    const x = Zn.length - 1;
    if (x < 0)
      return [];
    const D = /* @__PURE__ */ new Set();
    for (const K of ia) {
      if (!Number.isFinite(K))
        continue;
      const ee = Math.round(K);
      ee < 0 || ee > x || D.add(ee);
    }
    return Array.from(D).sort((K, ee) => K - ee);
  }, [Zn.length, ia]), sy = qs.length === 0 ? "Select palette colors to trace." : qs.length === 1 ? "Using 1 selected color." : `Using ${qs.length} selected colors.`, ly = () => {
    !Be || Zn.length === 0 || qs.length !== 0 && i_(Be, qs);
  }, ry = () => {
    if (!Be || !Number.isFinite(pa))
      return;
    const x = Dn(
      Math.round(pa),
      mu,
      gu
    );
    o_(Be, x);
  }, xh = (Be == null ? void 0 : Be.rotation) ?? 0, yh = (Be == null ? void 0 : Be.scale) ?? 1, iy = h_(yh), vh = (Be == null ? void 0 : Be.opacity) ?? 0.7, wh = (Be == null ? void 0 : Be.flipX) ?? !1, Sh = (Be == null ? void 0 : Be.flipY) ?? !1, zt = !Be;
  k.useEffect(() => {
    if (!Rt) {
      Gn("");
      return;
    }
    const x = () => {
      const K = m_();
      Gn((ee) => ee === K ? ee : K);
    };
    x();
    const D = window.setInterval(x, mw);
    return () => window.clearInterval(D);
  }, [Rt]), k.useEffect(() => {
    var D, K;
    const x = Rt && jt ? `${fa} • ${jt}` : fa;
    (K = (D = window.appApi) == null ? void 0 : D.setTitle) == null || K.call(D, x);
  }, [fa, Rt, jt]), k.useEffect(() => {
    const x = (D) => {
      var Ne;
      if (Af(D.target) || !ti.current)
        return;
      ti.current = !1;
      const ee = Array.from(((Ne = D.clipboardData) == null ? void 0 : Ne.items) ?? []).find((Xe) => Xe.type.startsWith("image/"));
      if (!ee)
        return;
      const Ce = ee.getAsFile();
      Ce && (D.preventDefault(), ux(Ce));
    };
    return window.addEventListener("paste", x), () => window.removeEventListener("paste", x);
  }, []), k.useEffect(() => {
    var D, K;
    const x = ((K = (D = window.menuApi) == null ? void 0 : D.onAction) == null ? void 0 : K.call(D, (ee) => {
      var Ce, Ne;
      if (ee.startsWith("view:set:")) {
        const Xe = ee.split(":"), rt = Xe[2] ?? "", Oe = (Xe[3] ?? "") === "true";
        switch (rt) {
          case "showReferenceLayer":
            P(Oe);
            return;
          case "showPixelLayer":
            I(Oe);
            return;
          case "showTileLayer":
            G(Oe);
            return;
          case "showPixelGrid":
            ae(Oe);
            return;
          case "showTileGrid":
            je(Oe);
            return;
          case "showAxes":
            Ct(Oe);
            return;
          case "minimapCollapsed":
            Re(Oe);
            return;
          default:
            return;
        }
      }
      if (ee.startsWith("options:advancedMode:")) {
        const Xe = ee.split(":")[2] ?? "";
        f(Xe === "true");
        return;
      }
      if (ee.startsWith("palette:rows:")) {
        const Xe = Number(ee.split(":")[2]);
        Number.isFinite(Xe) && window.dispatchEvent(
          new CustomEvent("palette:set-rows", {
            detail: Math.min(4, Math.max(2, Math.floor(Xe)))
          })
        );
        return;
      }
      switch (ee) {
        case "new":
          ai();
          break;
        case "open":
          oi();
          break;
        case "save":
          ii();
          break;
        case "saveAs":
          dh();
          break;
        case "importImage":
          ph();
          break;
        case "mergeProject":
          hh();
          break;
        case "exportPng":
          wx();
          break;
        case "exportBmp":
          IM();
          break;
        case "exportGif":
          EM();
          break;
        case "exportPcx":
          RM();
          break;
        case "exportTga":
          AM();
          break;
        case "exportBsaveCga":
          WM();
          break;
        case "exportBsaveEga":
          UM();
          break;
        case "exportBsaveVga":
          $M();
          break;
        case "exportGbr":
          NM();
          break;
        case "exportChr":
          PM();
          break;
        case "undo":
          t();
          break;
        case "redo":
          n();
          break;
        case "memory:on":
          Zt(!0);
          break;
        case "memory:off":
          Zt(!1);
          break;
        case "shortcuts":
          ci();
          break;
        case "palette:consolidate":
          VM();
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
          (Ne = (Ce = window.uiScaleApi) == null ? void 0 : Ce.resetScale) == null || Ne.call(Ce);
          break;
        case "tileDebug:on":
          aa(!0);
          break;
        case "tileDebug:off":
          aa(!1);
          break;
        case "view:select-tool:pen":
          et("pen");
          break;
      }
    })) ?? (() => {
    });
    return () => x();
  }, [
    ph,
    oi,
    hh,
    ai,
    ii,
    dh,
    ci,
    n,
    f,
    et,
    Re,
    Zt,
    Ct,
    u,
    ae,
    I,
    P,
    je,
    G,
    aa,
    t
  ]), k.useEffect(() => {
    var x, D;
    (D = (x = window.viewMenuApi) == null ? void 0 : x.setState) == null || D.call(x, {
      showReferenceLayer: hn,
      showPixelLayer: pn,
      showTileLayer: Ts,
      showPixelGrid: In,
      showTileGrid: Fl,
      showAxes: Ol,
      tileDebugOverlay: qd,
      minimapCollapsed: mt
    });
  }, [
    hn,
    pn,
    Ts,
    In,
    Fl,
    Ol,
    qd,
    mt
  ]);
  const oy = () => /* @__PURE__ */ o.jsx("div", { className: "panel__section", children: ue === "pen" || ue === "selection-lasso" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Size" }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__row", children: [1, 4, 8].map((x) => /* @__PURE__ */ o.jsxs(
        "button",
        {
          type: "button",
          className: "panel__item",
          "data-active": Ix === x,
          disabled: Bd === "point",
          onClick: () => ua(x),
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
          "data-active": Bd === x.id,
          onClick: () => da(x.id),
          children: /* @__PURE__ */ o.jsx("span", { className: "tool-label", "aria-label": x.label, children: x.label })
        },
        x.id
      )) })
    ] })
  ] }) : ue === "spray" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
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
              value: Xd,
              onChange: (x) => lh(x.currentTarget.valueAsNumber)
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
              value: Xd,
              onChange: (x) => lh(x.currentTarget.valueAsNumber)
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
              value: Math.min(2e3, Fd),
              onChange: (x) => rh(x.currentTarget.valueAsNumber)
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
              value: Fd,
              onChange: (x) => rh(x.currentTarget.valueAsNumber)
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
            value: Od,
            onChange: (x) => ih(x.currentTarget.valueAsNumber)
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
            value: Od,
            onChange: (x) => ih(x.currentTarget.valueAsNumber)
          }
        )
      ] })
    ] }) })
  ] }) : ue === "line" ? Zr >= 2 ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
      /* @__PURE__ */ o.jsx(
        en,
        {
          ariaLabel: "Gradient direction",
          value: Kr,
          onChange: Gr,
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
        en,
        {
          ariaLabel: "Gradient dither",
          value: Vr,
          onChange: Qr,
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
  ] }) : /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." }) : ue === "rectangle" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
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
              checked: zd === "filled",
              onChange: () => Hd("filled")
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
              checked: zd === "outlined",
              onChange: () => Hd("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    Zr >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          en,
          {
            ariaLabel: "Gradient direction",
            value: Kr,
            onChange: Gr,
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
          en,
          {
            ariaLabel: "Gradient dither",
            value: Vr,
            onChange: Qr,
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
  ] }) : ue === "oval" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
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
              checked: Wd === "filled",
              onChange: () => Ud("filled")
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
              checked: Wd === "outlined",
              onChange: () => Ud("outlined")
            }
          ),
          "Outlined"
        ] })
      ] })
    ] }),
    Zr >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          en,
          {
            ariaLabel: "Gradient direction",
            value: Kr,
            onChange: Gr,
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
          en,
          {
            ariaLabel: "Gradient dither",
            value: Vr,
            onChange: Qr,
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
  ] }) : ue === "fill-bucket" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
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
              checked: Gd === "color",
              onChange: () => Vd("color")
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
              checked: Gd === "selection",
              onChange: () => Vd("selection")
            }
          ),
          "Selection"
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select 2+ palette swatches (Shift-click) for gradient ramp." })
    ] }),
    Zr >= 2 && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Direction" }),
        /* @__PURE__ */ o.jsx(
          en,
          {
            ariaLabel: "Gradient direction",
            value: Kr,
            onChange: Gr,
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
          en,
          {
            ariaLabel: "Gradient dither",
            value: Vr,
            onChange: Qr,
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
  ] }) : ue === "texture-roll" ? /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: s === 0 ? "Make a selection first." : "Click and drag inside the selection to scroll it (wraps at selection bounds). Selection snap controls pixel vs tile steps." }) : ue === "stamp" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--dual", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Mode" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": qr === "soft", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "soft",
                checked: qr === "soft",
                onChange: () => th("soft")
              }
            ),
            "Soft"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": qr === "hard", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-mode",
                value: "hard",
                checked: qr === "hard",
                onChange: () => th("hard")
              }
            ),
            "Hard"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Drag" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": !ei, children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "off",
                checked: !ei,
                onChange: () => sh(!1)
              }
            ),
            "Off"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": ei, children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-drag",
                value: "on",
                checked: ei,
                onChange: () => sh(!0)
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
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": Jr === "pixel", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "pixel",
                checked: Jr === "pixel",
                onChange: () => nh("pixel")
              }
            ),
            "Pixel"
          ] }),
          /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": Jr === "tile", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "radio",
                name: "stamp-snap",
                value: "tile",
                checked: Jr === "tile",
                onChange: () => nh("tile")
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
              "data-active": Qd,
              onClick: () => Fx(!Qd),
              children: "Flip X"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              "data-active": Zd,
              onClick: () => Ox(!Zd),
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
          en,
          {
            ariaLabel: "Scale",
            value: String(Rx),
            onChange: (x) => Xx(Number(x)),
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
          en,
          {
            ariaLabel: "Rotate",
            value: String(Ax),
            onChange: (x) => Bx(Number(x)),
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
      /* @__PURE__ */ o.jsx("div", { className: "panel__toggle-group", children: /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": oa, children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "checkbox",
            checked: oa,
            onChange: () => zx(!oa)
          }
        ),
        "Duplicate Colors"
      ] }) })
    ] }) })
  ] }) : ue === "reference-handle" ? /* @__PURE__ */ o.jsx("div", { className: "panel__group", children: /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--cards", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Rotation" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack panel__stack--inline", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "range",
            className: "panel__range",
            "aria-label": "Rotation",
            min: qa,
            max: Ja,
            step: 1,
            value: xh,
            disabled: zt,
            onChange: (x) => fh(x.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Rotation",
            min: qa,
            max: Ja,
            step: 1,
            value: xh,
            disabled: zt,
            onChange: (x) => fh(x.currentTarget.valueAsNumber)
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
            min: kl,
            max: Yo,
            step: 1,
            value: iy,
            disabled: zt,
            onChange: (x) => mh(p_(x.currentTarget.valueAsNumber))
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Scale",
            min: $s,
            max: Rl,
            step: 0.01,
            value: yh,
            disabled: zt,
            onChange: (x) => mh(x.currentTarget.valueAsNumber)
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
            min: ec,
            max: tc,
            step: 0.05,
            value: vh,
            disabled: zt,
            onChange: (x) => gh(x.currentTarget.valueAsNumber)
          }
        ),
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "number",
            className: "panel__number",
            "aria-label": "Opacity",
            min: ec,
            max: tc,
            step: 0.05,
            value: vh,
            disabled: zt,
            onChange: (x) => gh(x.currentTarget.valueAsNumber)
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
            "data-active": wh,
            disabled: zt,
            onClick: () => $l({ flipX: !wh }),
            children: "Flip X"
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__toggle",
            "data-active": Sh,
            disabled: zt,
            onClick: () => $l({ flipY: !Sh }),
            children: "Flip Y"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__toggle-group", children: [
        /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": li === "pixel", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "pixel",
              checked: li === "pixel",
              onChange: () => oh("pixel")
            }
          ),
          "Pixel"
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "panel__toggle", "data-active": li === "tile", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "radio",
              name: "reference-snap",
              value: "tile",
              checked: li === "tile",
              onChange: () => oh("tile")
            }
          ),
          "Tile"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Reference" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack", children: [
        zt && /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: "Select a reference" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: zt,
            onClick: () => {
              Be && ca(Be.id);
            },
            children: "Delete"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
      /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Trace Palette" }),
      /* @__PURE__ */ o.jsxs("div", { className: "panel__stack", children: [
        /* @__PURE__ */ o.jsx("div", { className: "panel__note", children: sy }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: zt || qs.length === 0,
            onClick: ly,
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
            min: mu,
            max: gu,
            step: 1,
            value: pa,
            disabled: zt,
            onChange: (x) => {
              const D = x.currentTarget.valueAsNumber;
              Number.isFinite(D) && Wx(Math.round(D));
            }
          }
        ),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            type: "button",
            className: "panel__item",
            disabled: zt,
            onClick: ry,
            children: "Trace"
          }
        )
      ] })
    ] })
  ] }) }) : ue === "selection-rect" || ue === "selection-oval" ? /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
    /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsxs("label", { className: "panel__radio", children: [
        /* @__PURE__ */ o.jsx(
          "input",
          {
            type: "radio",
            name: "selection-snap",
            value: "pixel",
            checked: $d === "pixel",
            onChange: () => Kd("pixel")
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
            checked: $d === "tile",
            onChange: () => Kd("tile")
          }
        ),
        "Tile"
      ] })
    ] })
  ] }) : ue === "tile-sampler" || ue === "tile-pen" || ue === "tile-rectangle" || ue === "tile-9slice" || ue === "tile-export" ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row panel__row--cards", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Tile Set" }),
        oe ? /* @__PURE__ */ o.jsx(
          en,
          {
            ariaLabel: "Tile Set",
            value: oe.id,
            onChange: Jx,
            options: ut.map((x) => ({ value: x.id, label: x.name }))
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
              disabled: !oe,
              value: (oe == null ? void 0 : oe.columns) ?? 1,
              onChange: (x) => uh(
                x.currentTarget.valueAsNumber,
                (oe == null ? void 0 : oe.rows) ?? 1
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
              disabled: !oe,
              value: (oe == null ? void 0 : oe.rows) ?? 1,
              onChange: (x) => uh(
                (oe == null ? void 0 : oe.columns) ?? 1,
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
              onClick: () => ma(js - 1),
              disabled: js <= wu,
              children: "-"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "number",
              className: "panel__number",
              "aria-label": "Tile picker zoom",
              min: wu,
              max: Su,
              step: 1,
              value: js,
              onChange: (x) => ma(x.currentTarget.valueAsNumber)
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: () => ma(js + 1),
              disabled: js >= Su,
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
              onClick: Ux,
              disabled: !oe || xa <= 0,
              children: "◀"
            }
          ),
          /* @__PURE__ */ o.jsxs("span", { className: "panel__item panel__item--static", children: [
            xa + 1,
            " / ",
            ga
          ] }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item panel__item--icon",
              onClick: $x,
              disabled: !oe || xa >= ga - 1,
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
              "data-active": jd === "soft",
              onClick: () => Cd("soft"),
              children: "Soft"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": jd === "hard",
              onClick: () => Cd("hard"),
              children: "Hard"
            }
          )
        ] })
      ] }),
      ue === "tile-pen" ? /* @__PURE__ */ o.jsxs("div", { className: "panel__group", children: [
        /* @__PURE__ */ o.jsx("span", { className: "panel__label", children: "Snap" }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": !Nd,
              onClick: () => Pd(!1),
              children: "Free"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__item",
              "data-active": Nd,
              onClick: () => Pd(!0),
              children: "Cluster"
            }
          )
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__item", onClick: Kx, children: "New Set" }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Gx,
          disabled: !oe,
          children: "Duplicate Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Vx,
          disabled: !oe,
          children: "Rename Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Qx,
          disabled: !oe,
          children: "Delete Set"
        }
      ),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          type: "button",
          className: "panel__item",
          onClick: Zx,
          disabled: !oe || Ns.length === 0,
          children: "Delete Tiles"
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "panel__row", children: [
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Set: ",
        oe ? `${oe.name} (${oe.tiles.length} tiles)` : "None"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Map: ",
        ch ? ch.name : "None"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Selected Tile: ",
        oe ? zl + 1 : "—"
      ] }),
      /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
        "Selection: ",
        Ns.length
      ] }),
      ue === "tile-9slice" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "9-Slice: ",
          Lx ? "set" : "unset"
        ] }),
        /* @__PURE__ */ o.jsxs("span", { className: "panel__note", children: [
          "Selection Shape: ",
          Dx,
          "x",
          Yx
        ] })
      ] })
    ] })
  ] }) : /* @__PURE__ */ o.jsx("div", { className: "panel__item", "aria-disabled": "true", children: "No options" }) });
  return /* @__PURE__ */ o.jsxs("div", { className: "app app--compact-tools", children: [
    /* @__PURE__ */ o.jsx("div", { className: "app__canvas-layer", children: /* @__PURE__ */ o.jsx(NS, {}) }),
    /* @__PURE__ */ o.jsxs("div", { className: "app__ui-layer", children: [
      /* @__PURE__ */ o.jsx(
        fM,
        {
          activeTool: ue,
          selectionCount: s,
          activateTool: ha,
          showAdvancedTools: !e && h,
          showAiTool: !e,
          showExportButton: !e,
          showFullscreenButton: !e,
          showTileLayerControls: !e,
          toolOptions: oy()
        }
      ),
      g && /* @__PURE__ */ o.jsx("div", { className: "app__splash", "aria-hidden": "true", children: /* @__PURE__ */ o.jsx("img", { src: mM, alt: "" }) }),
      /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: `app__palette panel${Rn ? " app__palette--tile" : ""}`,
          style: {
            "--palette-right-offset": `${ty}px`,
            "--palette-bar-height": `${qx}px`
          },
          children: [
            /* @__PURE__ */ o.jsx(
              "div",
              {
                className: "app__palette-resize",
                role: "separator",
                "aria-label": "Resize palette bar",
                onPointerDown: ey
              }
            ),
            /* @__PURE__ */ o.jsx("div", { className: `bottom-bar${Rn ? " bottom-bar--tile" : ""}`, children: /* @__PURE__ */ o.jsx("div", { className: "bottom-bar__center", children: Rn ? /* @__PURE__ */ o.jsx(ZS, {}) : /* @__PURE__ */ o.jsx(VS, {}) }) })
          ]
        }
      ),
      mt ? /* @__PURE__ */ o.jsx("div", { className: "app__minimap-launch panel panel--collapsed", children: /* @__PURE__ */ o.jsx("button", { type: "button", className: "panel__toggle", onClick: () => Re(!1), children: "Minimap" }) }) : /* @__PURE__ */ o.jsxs("div", { className: "app__minimap panel", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "panel__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Minimap" }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              type: "button",
              className: "panel__toggle",
              onClick: () => Re(!0),
              children: "Hide"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsx(US, {})
      ] })
    ] }),
    fe && Q && Ul && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx("div", { className: "modal__backdrop", onClick: ui }),
      /* @__PURE__ */ o.jsxs("div", { className: "modal__content modal__content--rom", role: "dialog", "aria-modal": "true", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "modal__header", children: [
          /* @__PURE__ */ o.jsx("h2", { children: "Import ROM Segment" }),
          /* @__PURE__ */ o.jsx("button", { type: "button", onClick: ui, children: "Close" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Selections" }),
            /* @__PURE__ */ o.jsxs("span", { style: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, children: [
              /* @__PURE__ */ o.jsx("span", { children: J.length }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => ce([]),
                  disabled: J.length === 0,
                  children: "Clear"
                }
              ),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => ce((x) => x.length > 0 ? x.slice(0, -1) : x),
                  disabled: J.length === 0,
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
                    value: Ul.x,
                    onChange: (x) => di({ x: Number(x.target.value) })
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
                    value: Ul.y,
                    onChange: (x) => di({ y: Number(x.target.value) })
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
                    value: Ul.width,
                    onChange: (x) => di({ width: Number(x.target.value) })
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
                    value: Ul.height,
                    onChange: (x) => di({ height: Number(x.target.value) })
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
                  onClick: () => Ve((x) => Math.max(0, x - 1)),
                  disabled: si <= 0,
                  children: "Prev"
                }
              ),
              /* @__PURE__ */ o.jsxs("span", { children: [
                si + 1,
                "/",
                ni
              ] }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => Ve((x) => Math.min(ni - 1, x + 1)),
                  disabled: si >= ni - 1,
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
                value: pe,
                onChange: (x) => Ge(Number(x.target.value)),
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
                value: Me,
                onChange: (x) => ve(
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
                  ref: Qs,
                  className: "rom-import__canvas",
                  onPointerDown: (x) => {
                    var it;
                    x.preventDefault();
                    const D = Qs.current;
                    if (!D)
                      return;
                    (it = D.setPointerCapture) == null || it.call(D, x.pointerId);
                    const K = D.getBoundingClientRect(), ee = Math.floor(
                      (x.clientX - K.left) / K.width * D.width
                    ), Ce = Math.floor(
                      (x.clientY - K.top) / K.height * D.height
                    ), Ne = Math.floor(ee / (Ee * ge)), Xe = eh + Math.floor(Ce / (Ee * ge)), rt = Math.trunc(Dn(Ne, 0, Zs - 1)), We = Math.trunc(Dn(Xe, 0, Cs - 1));
                    Wl.current = {
                      startTileX: rt,
                      startTileY: We,
                      pointerId: x.pointerId
                    };
                    const Oe = x.ctrlKey || x.metaKey, St = { x: rt, y: We, width: 1, height: 1 };
                    ce(
                      (Nt) => Oe ? [...Nt, St] : [St]
                    );
                  },
                  onPointerMove: (x) => {
                    const D = Qs.current, K = Wl.current;
                    if (!D || !K || !Q || K.pointerId !== x.pointerId)
                      return;
                    const ee = D.getBoundingClientRect(), Ce = Math.floor(
                      (x.clientX - ee.left) / ee.width * D.width
                    ), Ne = Math.floor(
                      (x.clientY - ee.top) / ee.height * D.height
                    ), Xe = Math.floor(Ce / (Ee * ge)), rt = eh + Math.floor(Ne / (Ee * ge)), We = Math.min(K.startTileX, Xe), Oe = Math.min(K.startTileY, rt), St = Math.max(K.startTileX, Xe), it = Math.max(K.startTileY, rt);
                    ce((Nt) => {
                      if (Nt.length === 0)
                        return Nt;
                      const qn = Nt.slice();
                      return qn[qn.length - 1] = As(
                        {
                          x: We,
                          y: Oe,
                          width: St - We + 1,
                          height: it - Oe + 1
                        },
                        Zs,
                        Cs
                      ), qn;
                    });
                  },
                  onPointerUp: (x) => {
                    var K;
                    const D = Qs.current;
                    D && ((K = D.releasePointerCapture) == null || K.call(D, x.pointerId)), Wl.current = null;
                  },
                  onPointerLeave: (x) => {
                    var K;
                    const D = Qs.current;
                    D && ((K = D.releasePointerCapture) == null || K.call(D, x.pointerId)), Wl.current = null;
                  }
                }
              ) }),
              /* @__PURE__ */ o.jsx("div", { className: "rom-import__preview", children: /* @__PURE__ */ o.jsx(
                "canvas",
                {
                  ref: Jd,
                  className: "rom-import__canvas"
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", {}),
            /* @__PURE__ */ o.jsx("button", { type: "button", onClick: ny, children: "Send to Stamp Tool" })
          ] })
        ] })
      ] })
    ] }),
    le && H && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ o.jsx(
        "div",
        {
          className: "modal__backdrop",
          onClick: () => {
            ne(!1), Z(null), E(null);
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
                ne(!1), Z(null), E(null);
              },
              children: "Close"
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal__body", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Source" }),
            /* @__PURE__ */ o.jsx("span", { children: Y ?? "(unknown)" })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Offset X" }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "number",
                value: se,
                onChange: (x) => $(Number(x.target.value))
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal__row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Offset Y" }),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "number",
                value: he,
                onChange: (x) => ye(Number(x.target.value))
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
                  _M(H, {
                    offsetX: se,
                    offsetY: he
                  }), ne(!1), Z(null), E(null);
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
    i && /* @__PURE__ */ o.jsxs("div", { className: "modal", children: [
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
    d && !e && /* @__PURE__ */ o.jsx(
      sM,
      {
        onClose: () => {
          p(!1);
        },
        onAdvancedModeChange: f
      }
    ),
    M && ue === "text" && /* @__PURE__ */ o.jsx(
      nM,
      {
        initialText: w,
        initialFontFamily: b,
        initialFontSize: j,
        onCancel: () => {
          y(!1), et(m);
        },
        onConfirm: ({ text: x, fontFamily: D, fontSize: K }) => {
          _(x), T(D), A(K), qS({
            text: x,
            fontFamily: D,
            fontSize: K,
            paletteIndex: Ex
          }), y(!1);
        }
      }
    ),
    L && ue === "ai" && !e && /* @__PURE__ */ o.jsx(
      aM,
      {
        initialPrompt: W,
        onCancel: () => {
          C(!1), et(R);
        },
        onConfirm: ({ prompt: x }) => {
          re(x), C(!1);
        }
      }
    )
  ] });
}, x_ = () => {
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
class y_ extends Ie.Component {
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
const Nx = document.getElementById("root");
if (!Nx)
  throw new Error("Root element not found");
x_();
Mc.createRoot(Nx).render(
  /* @__PURE__ */ o.jsx(Ie.StrictMode, { children: /* @__PURE__ */ o.jsx(y_, { children: /* @__PURE__ */ o.jsx(g_, {}) }) })
);
