/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nvar m = __webpack_require__(/*! react-dom */ \"react-dom\");\nif (false) {} else {\n  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;\n  exports.createRoot = function (c, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.createRoot(c, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n  exports.hydrateRoot = function (c, h, o) {\n    i.usingClientEntryPoint = true;\n    try {\n      return m.hydrateRoot(c, h, o);\n    } finally {\n      i.usingClientEntryPoint = false;\n    }\n  };\n}\n\n//# sourceURL=webpack://texteditorforcms/./node_modules/react-dom/client.js?");

/***/ }),

/***/ "./testApp/src/testApp.tsx":
/*!*********************************!*\
  !*** ./testApp/src/testApp.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"./node_modules/react-dom/client.js\");\n/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib */ \"./lib/index.js\");\n\n\n// import TextEditor from '../../src/editor/TextEditor'\n// import HTMLTextParser from '../../lib/parser/HTMLTextParser'\n\nconsole.log(_lib__WEBPACK_IMPORTED_MODULE_2__.TextEditor);\nconst parser = new _lib__WEBPACK_IMPORTED_MODULE_2__.HTMLTextParser({\n    groupParagraphsAsDiv: true\n});\nconst App = () => {\n    const [html, setHtml] = react__WEBPACK_IMPORTED_MODULE_0__.useState('');\n    const onClickSave = () => {\n        const components = parser.parseToComponents(html);\n        const newHtml = parser.parseToHtml(components);\n        setHtml(newHtml);\n    };\n    return (react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null,\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", { onClick: onClickSave }, \"SAVE\"),\n        react__WEBPACK_IMPORTED_MODULE_0__.createElement(_lib__WEBPACK_IMPORTED_MODULE_2__.TextEditor, { html: html, setHtml: setHtml, style: {\n                background: 'lightgray',\n                border: '1px solid gray',\n                height: 400,\n                width: 400,\n            }, toolbar: null })));\n};\nconst container = document.getElementById('app');\nconst root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(container);\nroot.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(App, null));\n\n\n//# sourceURL=webpack://texteditorforcms/./testApp/src/testApp.tsx?");

/***/ }),

/***/ "react":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = undefined;

/***/ }),

/***/ "react-dom":
/*!*****************************************************************************************************!*\
  !*** external {"commonjs":"react-dom","commonjs2":"react-dom","amd":"react-dom","root":"ReactDOM"} ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = undefined;

/***/ }),

/***/ "./lib/editor/ContentEditable.js":
/*!***************************************!*\
  !*** ./lib/editor/ContentEditable.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/helpers.js */ \"./lib/editor/helpers/helpers.js\");\n\n\nvar shouldComponentUpdate = function shouldComponentUpdate(props, nextProps) {\n  //Returning false in this function actually means YES the component should update\n  //Why? because the return boolean here actually represents whether or not previous props equal current props.\n  var innerref = props.innerref;\n  var element = innerref.current;\n  // We need not rerender if the change of props simply reflects the user's edits.\n  // Rerendering in this case would make the cursor/caret jump\n  // Rerender if there is no element yet... (somehow?)\n  if (!element) return false;\n  // ...or if html really changed... (programmatically, not by user edit)\n  if ((0,_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_1__.normalizeHtml)(nextProps.html) !== (0,_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_1__.normalizeHtml)(element.innerHTML)) {\n    return false;\n  }\n  // Handle additional properties\n  return props.disabled === nextProps.disabled || props.tagName === nextProps.tagName || props.className === nextProps.className || props.innerref === nextProps.innerref || props.placeholder === nextProps.placeholder || (0,_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_1__.deepEqualStyles)(props.style, nextProps.style);\n};\nvar ContentEditableFunction = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.memo(function (props) {\n  var html = props.html,\n    innerref = props.innerref,\n    tagName = props.tagName;\n  var lastHtml = html;\n  // el will \n  var el = typeof innerref === 'function' ? {\n    current: null\n  } : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createRef();\n  var componentDidMount = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);\n  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(function () {\n    if (!componentDidMount.current) {\n      componentDidMount.current = true;\n      return;\n    }\n    //componentDidUpdate function here\n    var element = (innerref && typeof innerref !== 'function' ? innerref : el).current;\n    if (!element) return;\n    // Perhaps React (whose VDOM gets outdated because we often prevent\n    // rerendering) did not update the DOM. So we update it manually now.\n    if (props.html !== element.innerHTML) {\n      element.innerHTML = props.html;\n    }\n    lastHtml = props.html;\n    (0,_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_1__.replaceCaret)(element);\n  }, []);\n  var emitChange = function emitChange(originalEvt) {\n    if (props.beforeChangeEmit) {\n      props.beforeChangeEmit(originalEvt);\n    }\n    var element = (innerref && typeof innerref !== 'function' ? innerref : el).current;\n    if (!element) return;\n    var currInnerHtml = element.innerHTML;\n    if (props.onChange && currInnerHtml !== lastHtml) {\n      // Clone event with Object.assign to avoid \"Cannot assign to read only property 'target' of object\"\n      var evt = Object.assign({}, originalEvt, {\n        target: {\n          value: currInnerHtml\n        }\n      });\n      props.onChange(evt);\n    }\n    lastHtml = currInnerHtml;\n    if (props.afterChangeEmit) {\n      props.afterChangeEmit(originalEvt);\n    }\n  };\n  var copiedProps = Object.assign({}, props);\n  delete copiedProps.afterChangeEmit;\n  delete copiedProps.beforeChangeEmit;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(tagName || 'div', Object.assign(Object.assign({}, copiedProps), {\n    ref: typeof innerref === 'function' ? function (current) {\n      innerref(current);\n      el.current = current;\n    } : innerref || el,\n    onInput: emitChange,\n    onChange: emitChange,\n    onClick: emitChange,\n    onBlur: props.onBlur || emitChange,\n    onKeyUp: props.onKeyUp || emitChange,\n    onKeyDown: props.onKeyDown || emitChange,\n    contentEditable: !props.disabled,\n    dangerouslySetInnerHTML: {\n      __html: html\n    }\n  }), props.children);\n}, shouldComponentUpdate);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContentEditableFunction);\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/ContentEditable.js?");

/***/ }),

/***/ "./lib/editor/TextEditor.js":
/*!**********************************!*\
  !*** ./lib/editor/TextEditor.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _ContentEditable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentEditable.js */ \"./lib/editor/ContentEditable.js\");\n/* harmony import */ var _toolbar_Toolbar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./toolbar/Toolbar.js */ \"./lib/editor/toolbar/Toolbar.js\");\n/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers/helpers.js */ \"./lib/editor/helpers/helpers.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\n\n\n\nvar TextEditor = function TextEditor(_ref) {\n  var html = _ref.html,\n    setHtml = _ref.setHtml,\n    style = _ref.style,\n    toolbar = _ref.toolbar;\n  var contentEditable = react__WEBPACK_IMPORTED_MODULE_0__.useRef();\n  var toolbarOptions = {\n    disabled: false,\n    orientation: 'vertical',\n    icons: ['bold', 'italic', 'underline'],\n    iconStyle: {\n      height: 15,\n      width: 15,\n      border: 'solid gray 1px',\n      padding: 10,\n      onHover: {\n        backgroundColor: 'white'\n      }\n    }\n  };\n  if (toolbar) {\n    toolbarOptions = Object.assign({}, toolbar);\n  }\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(toolbarOptions.icons.reduce(function (status, iconName) {\n      status[iconName] = {\n        selected: false\n      };\n      return status;\n    }, {})),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    toolbarStatus = _React$useState2[0],\n    setToolbarStatus = _React$useState2[1];\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"div\", {\n    id: 'textEditor'\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_toolbar_Toolbar_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n    toolbarOptions: toolbarOptions,\n    toolbarStatus: toolbarStatus,\n    setToolbarStatus: setToolbarStatus\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ContentEditable_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n    style: style,\n    innerref: contentEditable,\n    html: html,\n    disabled: false,\n    onChange: function onChange(e) {\n      setHtml(e.target.value);\n    },\n    afterChangeEmit: function afterChangeEmit(e) {\n      if (e.type === 'keydown' && ['b', 'i', 'u'].includes(e.key) && e.metaKey) {\n        setToolbarStatus(function (prevStatus) {\n          return Object.assign(Object.assign({}, prevStatus), _defineProperty({}, _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_3__.keyToFormatMap[e.key], {\n            selected: !prevStatus[_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_3__.keyToFormatMap[e.key]].selected\n          }));\n        });\n        return;\n      }\n      if (['keyup', 'keydown', 'click'].includes(e.type) && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key) || e.type === 'click') {\n        var currentFormatInCaret = (0,_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_3__.getFormatFromCaretLocation)(window.getSelection());\n        var newToolbarStatus = Object.assign({}, toolbarStatus);\n        for (var format in toolbarStatus) {\n          newToolbarStatus[format].selected = currentFormatInCaret.includes(_helpers_helpers_js__WEBPACK_IMPORTED_MODULE_3__.formatToNodeNameMap[format]);\n        }\n        setToolbarStatus(newToolbarStatus);\n      }\n    }\n  }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextEditor);\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/TextEditor.js?");

/***/ }),

/***/ "./lib/editor/helpers/helpers.js":
/*!***************************************!*\
  !*** ./lib/editor/helpers/helpers.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   deepEqualStyles: () => (/* binding */ deepEqualStyles),\n/* harmony export */   formatToNodeNameMap: () => (/* binding */ formatToNodeNameMap),\n/* harmony export */   getFormatFromCaretLocation: () => (/* binding */ getFormatFromCaretLocation),\n/* harmony export */   keyToFormatMap: () => (/* binding */ keyToFormatMap),\n/* harmony export */   normalizeHtml: () => (/* binding */ normalizeHtml),\n/* harmony export */   replaceCaret: () => (/* binding */ replaceCaret)\n/* harmony export */ });\nfunction normalizeHtml(str) {\n  return str && str.replace(/&nbsp;|\\u202F|\\u00A0/g, ' ').replace(/<br \\/>/g, '<br>');\n}\nfunction replaceCaret(el) {\n  // Place the caret at the end of the element\n  var target = document.createTextNode('');\n  el.appendChild(target);\n  // do not move caret if element was not focused\n  var isTargetFocused = document.activeElement === el;\n  if (target !== null && target.nodeValue !== null && isTargetFocused) {\n    var sel = window.getSelection();\n    if (sel !== null) {\n      var range = document.createRange();\n      range.setStart(target, target.nodeValue.length);\n      range.collapse(true);\n      sel.removeAllRanges();\n      sel.addRange(range);\n    }\n    if (el instanceof HTMLElement) el.focus();\n  }\n}\nfunction getFormatFromCaretLocation(selection) {\n  var formats = [];\n  var validNodeNames = ['B', 'U', 'I'];\n  var _getFormats = function getFormats(node) {\n    if (!node || node.nodeName === 'DIV') {\n      return;\n    }\n    if (validNodeNames.includes(node.nodeName)) formats.push(node.nodeName);\n    _getFormats(node.parentNode);\n  };\n  _getFormats(selection.anchorNode);\n  return formats;\n}\nfunction deepEqualStyles(objA, objB) {\n  var objAKeys = Object.keys(objA);\n  if (Object.keys(objB).length !== objAKeys.length) return false;\n  for (var key in objAKeys) {\n    if (objA[key] !== objB[key]) return false;\n  }\n  return true;\n}\nvar keyToFormatMap = {\n  b: 'bold',\n  i: 'italic',\n  u: 'underline'\n};\nvar formatToNodeNameMap = {\n  bold: 'B',\n  italic: 'I',\n  underline: 'U'\n};\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/helpers/helpers.js?");

/***/ }),

/***/ "./lib/editor/toolbar/Toolbar.js":
/*!***************************************!*\
  !*** ./lib/editor/toolbar/Toolbar.js ***!
  \***************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var _defaultToolbarIconMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./defaultToolbarIconMap.js */ \"./lib/editor/toolbar/defaultToolbarIconMap.js\");\n/* harmony import */ var _ToolbarIcon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ToolbarIcon.js */ \"./lib/editor/toolbar/ToolbarIcon.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\n\nvar Toolbar = function Toolbar(_ref) {\n  var toolbarOptions = _ref.toolbarOptions,\n    setToolbarStatus = _ref.setToolbarStatus,\n    toolbarStatus = _ref.toolbarStatus;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toolbarOptions.icons.map(function (iconName, i) {\n    return _defaultToolbarIconMap_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"][iconName] ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_ToolbarIcon_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n      key: iconName + i,\n      src: _defaultToolbarIconMap_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"][iconName],\n      style: toolbarOptions.iconStyle,\n      iconOnClick: function iconOnClick() {\n        setToolbarStatus(function (prevStatus) {\n          return Object.assign(Object.assign({}, prevStatus), _defineProperty({}, iconName, {\n            selected: !prevStatus[iconName].selected\n          }));\n        });\n      },\n      isActivated: toolbarStatus[iconName].selected\n    }) : null;\n  }));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Toolbar);\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/toolbar/Toolbar.js?");

/***/ }),

/***/ "./lib/editor/toolbar/ToolbarIcon.js":
/*!*******************************************!*\
  !*** ./lib/editor/toolbar/ToolbarIcon.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\n\nvar ToolbarIcon = function ToolbarIcon(_ref) {\n  var src = _ref.src,\n    style = _ref.style,\n    iconOnClick = _ref.iconOnClick,\n    isActivated = _ref.isActivated;\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0__.useState(false),\n    _React$useState2 = _slicedToArray(_React$useState, 2),\n    isHovering = _React$useState2[0],\n    setIsHovering = _React$useState2[1];\n  var computedStyle = Object.assign({}, style);\n  if (isHovering || isActivated) {\n    if (style.onHover) {\n      computedStyle = Object.assign(Object.assign({}, computedStyle), style.onHover);\n    } else {\n      computedStyle = Object.assign(Object.assign({}, computedStyle), {\n        backgroundColor: 'aliceblue'\n      });\n    }\n  }\n  delete style.onHover;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"button\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", {\n    className: \"ck ck-icon ck-reset_all-excluded ck-icon_inherit-color ck-button__icon\",\n    viewBox: \"0 0 20 20\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"m5.042 9.367 2.189 1.837a.75.75 0 0 1-.965 1.149l-3.788-3.18a.747.747 0 0 1-.21-.284.75.75 0 0 1 .17-.945L6.23 4.762a.75.75 0 1 1 .964 1.15L4.863 7.866h8.917A.75.75 0 0 1 14 7.9a4 4 0 1 1-1.477 7.718l.344-1.489a2.5 2.5 0 1 0 1.094-4.73l.008-.032H5.042z\"\n  })))\n  // <img \n  //   onClick={iconOnClick}\n  //   onMouseEnter={() => { setIsHovering(true)} }\n  //   onMouseLeave={() => { setIsHovering(false)} }\n  //   src={src} \n  //   style={computedStyle}\n  // />\n  ;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ToolbarIcon);\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/toolbar/ToolbarIcon.js?");

/***/ }),

/***/ "./lib/editor/toolbar/defaultToolbarIconMap.js":
/*!*****************************************************!*\
  !*** ./lib/editor/toolbar/defaultToolbarIconMap.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar defaultIconSrcs = {\n  'bold': 'assets/bold.png',\n  'underline': 'assets/underline.png',\n  'italic': 'assets/italic.png',\n  'justifyLeft': 'assets/justify-left.png',\n  'justifyRight': 'assets/justify-right.png',\n  'justifyCenter': 'assets/justify-center.png'\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (defaultIconSrcs);\n\n//# sourceURL=webpack://texteditorforcms/./lib/editor/toolbar/defaultToolbarIconMap.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HTMLTextParser: () => (/* reexport safe */ _parser_HTMLTextParser_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   TextEditor: () => (/* reexport safe */ _editor_TextEditor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _editor_TextEditor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor/TextEditor.js */ \"./lib/editor/TextEditor.js\");\n/* harmony import */ var _parser_HTMLTextParser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser/HTMLTextParser.js */ \"./lib/parser/HTMLTextParser.js\");\n\n\n\n\n//# sourceURL=webpack://texteditorforcms/./lib/index.js?");

/***/ }),

/***/ "./lib/parser/ComponentsToHTML.js":
/*!****************************************!*\
  !*** ./lib/parser/ComponentsToHTML.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar ComponentsToHTML = /*#__PURE__*/function () {\n  function ComponentsToHTML() {\n    _classCallCheck(this, ComponentsToHTML);\n  }\n  return _createClass(ComponentsToHTML, null, [{\n    key: \"createHTMLString\",\n    value: function createHTMLString(components) {\n      var html = '';\n      components.forEach(function (component) {\n        return html += ComponentsToHTML.parseComponent(component);\n      });\n      return html;\n    }\n  }, {\n    key: \"parseComponent\",\n    value: function parseComponent(component) {\n      if (component.type === 'text') {\n        return component.content;\n      }\n      if (component.content && Array.isArray(component.content)) {\n        var tagContent = component.content.reduce(function (childrenString, child) {\n          return childrenString += ComponentsToHTML.parseComponent(child);\n        }, '');\n        return \"<\".concat(component.type, \">\").concat(tagContent, \"</\").concat(component.type, \">\");\n      }\n      if (component.content) {\n        return \"<\".concat(component.type, \">\").concat(ComponentsToHTML.parseComponent(component.content), \"</\").concat(component.type, \">\");\n      }\n      return \"<\".concat(component.type, \"/>\");\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComponentsToHTML);\n\n//# sourceURL=webpack://texteditorforcms/./lib/parser/ComponentsToHTML.js?");

/***/ }),

/***/ "./lib/parser/HTMLTextParser.js":
/*!**************************************!*\
  !*** ./lib/parser/HTMLTextParser.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ComponentsToHTML_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ComponentsToHTML.js */ \"./lib/parser/ComponentsToHTML.js\");\n/* harmony import */ var _HTMLToComponents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTMLToComponents.js */ \"./lib/parser/HTMLToComponents.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\nvar HTMLTextParser = /*#__PURE__*/function () {\n  function HTMLTextParser(configOptions) {\n    _classCallCheck(this, HTMLTextParser);\n    this.toComponents = new _HTMLToComponents_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](configOptions);\n  }\n  return _createClass(HTMLTextParser, [{\n    key: \"parseToHtml\",\n    value: function parseToHtml(components) {\n      return _ComponentsToHTML_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createHTMLString(components);\n    }\n  }, {\n    key: \"parseToReactElements\",\n    value: function parseToReactElements(reactLibrary, components) {\n      return components.map(function (component) {\n        return _createParsedComponent(reactLibrary, component, -1);\n      });\n    }\n  }, {\n    key: \"parseToComponents\",\n    value: function parseToComponents(htmlString) {\n      var dom = new DOMParser().parseFromString(htmlString, 'text/html');\n      var doc = dom.children[0].children[1];\n      var parsed = this.toComponents.parse(doc);\n      return parsed;\n    }\n  }]);\n}();\nvar _createParsedComponent = function createParsedComponent(reactLibrary, component, index) {\n  if (component.type === 'text') {\n    return component.content;\n  }\n  var childrenComponents = Array.isArray(component.content) ? component.content.map(function (childComponent, i) {\n    return _createParsedComponent(reactLibrary, childComponent, i);\n  }) : component.content ? _createParsedComponent(reactLibrary, component.content, index) : null;\n  return reactLibrary.createElement(component.type, {\n    key: component.type + index + Math.random()\n  }, childrenComponents);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HTMLTextParser);\n\n//# sourceURL=webpack://texteditorforcms/./lib/parser/HTMLTextParser.js?");

/***/ }),

/***/ "./lib/parser/HTMLToComponents.js":
/*!****************************************!*\
  !*** ./lib/parser/HTMLToComponents.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar HTMLToComponents = /*#__PURE__*/function () {\n  function HTMLToComponents(configOptions) {\n    var _this = this;\n    _classCallCheck(this, HTMLToComponents);\n    var config = {\n      groupParagraphsAsDiv: false\n    };\n    if (configOptions) {\n      config = Object.assign({}, configOptions);\n    }\n    this.config = config;\n    this.parsed = [];\n    this.currParagraph = null;\n    this.componentTypeMap = {\n      '#text': 'text',\n      'I': 'i',\n      'B': 'b',\n      'DIV': 'div',\n      'U': 'u',\n      'P': 'p',\n      'BR': 'br'\n    };\n    this.nodeHandlers = {\n      '#text': function text(node) {\n        return _this.handleTextComponent.bind(_this)(node);\n      },\n      'I': function I(node) {\n        return _this.handleItalicComponent.bind(_this)(node);\n      },\n      'B': function B(node) {\n        return _this.handleBoldComponent.bind(_this)(node);\n      },\n      'U': function U(node) {\n        return _this.handleUnderlineComponent.bind(_this)(node);\n      },\n      'DIV': function DIV(node) {\n        return _this.handleDiv.bind(_this)(node);\n      },\n      'P': function P(node) {\n        return _this.handleParagraphComponent.bind(_this)(node);\n      },\n      'BR': function BR() {\n        return _this.handleLineBreak.bind(_this)();\n      }\n    };\n  }\n  return _createClass(HTMLToComponents, [{\n    key: \"resetParser\",\n    value: function resetParser() {\n      this.parsed = [];\n      this.currParagraph = null;\n    }\n  }, {\n    key: \"parse\",\n    value: function parse(textDiv) {\n      this.resetParser();\n      var nodesArray = this.wrapFirstTextNodes(textDiv);\n      this.parseChildren(nodesArray);\n      return this.parsed;\n    }\n  }, {\n    key: \"wrapFirstTextNodes\",\n    value: function wrapFirstTextNodes(textDiv) {\n      var nodesArray = [].slice.call(textDiv.childNodes);\n      if (nodesArray.length) {\n        if (!['P', 'DIV'].includes(nodesArray[0].nodeName)) {\n          var initialParagraph = document.createElement('p');\n          nodesArray = nodesArray.reduce(function (accum, curr) {\n            if (!['P', 'DIV'].includes(curr.nodeName)) {\n              initialParagraph.appendChild(curr);\n            } else {\n              accum.push(curr);\n            }\n            return accum;\n          }, [initialParagraph]);\n        }\n      }\n      return nodesArray;\n    }\n  }, {\n    key: \"parseChildren\",\n    value: function parseChildren(children) {\n      var _this2 = this;\n      children.forEach(function (child) {\n        var nodeHandler = _this2.nodeHandlers[child.nodeName];\n        if (nodeHandler) {\n          var newComponent = nodeHandler(child);\n          if (newComponent) _this2.parsed.push(newComponent);\n        }\n      });\n    }\n  }, {\n    key: \"handleLineBreak\",\n    value: function handleLineBreak() {\n      if (this.config.groupParagraphsAsDiv) {\n        return {\n          type: 'br',\n          content: null\n        };\n      }\n      return null;\n    }\n  }, {\n    key: \"handleItalicComponent\",\n    value: function handleItalicComponent(htmlNode) {\n      var _this3 = this;\n      var content = [];\n      htmlNode.childNodes.forEach(function (child) {\n        var childComponent = _this3.nodeHandlers[child.nodeName](child);\n        if (childComponent) content.push(childComponent);\n      });\n      return {\n        type: 'i',\n        content: content\n      };\n    }\n  }, {\n    key: \"handleBoldComponent\",\n    value: function handleBoldComponent(htmlNode) {\n      var _this4 = this;\n      var content = [];\n      htmlNode.childNodes.forEach(function (child) {\n        var childComponent = _this4.nodeHandlers[child.nodeName](child);\n        if (childComponent) content.push(childComponent);\n      });\n      return {\n        type: 'b',\n        content: content\n      };\n    }\n  }, {\n    key: \"handleUnderlineComponent\",\n    value: function handleUnderlineComponent(htmlNode) {\n      var _this5 = this;\n      var content = [];\n      htmlNode.childNodes.forEach(function (child) {\n        var childComponent = _this5.nodeHandlers[child.nodeName](child);\n        if (childComponent) content.push(childComponent);\n      });\n      return {\n        type: 'u',\n        content: content\n      };\n    }\n  }, {\n    key: \"handleParagraphComponent\",\n    value: function handleParagraphComponent(htmlNode) {\n      var _this6 = this;\n      var content = [];\n      htmlNode.childNodes.forEach(function (child) {\n        var childComponent = _this6.nodeHandlers[child.nodeName](child);\n        if (childComponent) content.push(childComponent);\n      });\n      if (!content.length) return null;\n      return {\n        type: this.config.groupParagraphsAsDiv ? 'div' : 'p',\n        content: content\n      };\n    }\n  }, {\n    key: \"handleTextComponent\",\n    value: function handleTextComponent(textNode) {\n      return {\n        type: 'text',\n        content: textNode.textContent\n      };\n    }\n  }, {\n    key: \"handleDiv\",\n    value: function handleDiv(node) {\n      var newComponent = this.handleParagraphComponent(node);\n      return newComponent;\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HTMLToComponents);\n\n//# sourceURL=webpack://texteditorforcms/./lib/parser/HTMLToComponents.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./testApp/src/testApp.tsx");
/******/ 	
/******/ })()
;