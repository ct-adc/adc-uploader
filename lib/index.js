(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ct-utility"));
	else if(typeof define === 'function' && define.amd)
		define(["ct-utility"], factory);
	else if(typeof exports === 'object')
		exports["ct-adc-uploader"] = factory(require("ct-utility"));
	else
		root["ct-adc-uploader"] = factory(root["ct-utility"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 55);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(2)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__errors__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ct_utility__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ct_utility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ct_utility__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(21);




/* harmony default export */ __webpack_exports__["a"] = ({
    addFile: function addFile(file) {
        var fileData = {
            file: file,
            status: '',
            errorText: '',
            previewStatus: false,
            previewSrc: '',
            url: '',
            name: file.name };

        if (this.type === 'img') {
            this.uploader.makeThumb(file, function (error, src) {
                if (error) {
                    fileData.previewStatus = false;
                    return;
                }
                fileData.previewStatus = true;
                fileData.previewSrc = src;
            }, this.thumbnailWidth, this.thumbnailHeight);
        }

        file.on('statuschange', function (cur) {
            fileData.status = cur;
        });
        this.fileList.push(fileData);
    },
    isDuplicate: function isDuplicate(file) {
        var hash = file.__hash || (file.__hash = __WEBPACK_IMPORTED_MODULE_2__util__["a" /* default */].hashString(file.name + file.size + file.lastModifiedDate));
        var isDuplicate = this.fileList.filter(function (thumb) {
            return thumb.file !== null && thumb.file['__hash'] === hash;
        }).length > 0;

        return isDuplicate;
    },
    createUploader: function createUploader() {
        this.uploader = WebUploader.create({
            pick: {
                id: this.button,
                multiple: this.multiple
            },
            server: this.server,
            method: this.method,
            duplicate: this.duplicate,
            auto: this.auto,
            chunked: this.chunked,
            chunkSize: this.chunkSize,
            chunkRetry: this.chunkRetry,
            accept: this.accept,
            compress: this.compress,
            fileSizeLimit: this.fileSizeLimit,
            fileSingleSizeLimit: this.fileSingleSizeLimit,
            fileNumLimit: this.fileNumLimit,
            fileVal: this.fileVal,
            withCredentials: true,
            sendAsBinary: this.sendAsBinary,
            threads: this.threads,
            thumb: this.thumb
        });
    },
    uploaderBind: function uploaderBind() {
        this.uploader.on('uploadBeforeSend', function (object, data, headers) {
            __WEBPACK_IMPORTED_MODULE_1_ct_utility___default.a.base.extend(data, this.formData);
            __WEBPACK_IMPORTED_MODULE_1_ct_utility___default.a.base.extend(headers, this.headers);
        }.bind(this));
        this.uploader.on('beforeFileQueued', function (file) {
            if (!this.duplicate) {
                var isDuplicate = this.isDuplicate(file);

                if (isDuplicate) {
                    this.$emit('runtime-error', {
                        code: 'F_DUPLICATE',
                        msg: __WEBPACK_IMPORTED_MODULE_0__errors__["a" /* default */]['F_DUPLICATE']
                    });
                    return false;
                }
            }
            if (typeof this.fileNumLimit !== 'undefined' && this.fileList.length >= this.fileNumLimit) {
                this.$emit('runtime-error', {
                    code: 'Q_EXCEED_NUM_LIMIT',
                    msg: __WEBPACK_IMPORTED_MODULE_0__errors__["a" /* default */]['Q_EXCEED_NUM_LIMIT']
                });
                return false;
            }
            return true;
        }.bind(this));
        this.uploader.on('fileQueued', function (file) {
            this.addFile(file);
        }.bind(this));
        this.uploader.on('uploadSuccess', function (file, res) {
            var _this = this;

            var result = this.resultFilter(res);

            this.fileList = this.fileList.map(function (item) {
                if (item.file !== null && item.file.id === file.id) {
                    if (result.status) {
                        item.url = result.path;
                        _this.$emit('runtime-success', res);
                        _this.$emit('runtime-error', {
                            code: 'RESET',
                            msg: ''
                        });
                        _this.$emit('change-status');
                        return item;
                    } else {
                        item.url = '';
                        item.status = 'error';
                        item.errorText = result.msg;
                        _this.$emit('runtime-error', {
                            code: 'RESPONSE_ERROR',
                            msg: result.msg
                        });
                        _this.$emit('change-status');
                        return item;
                    }
                } else {
                    return item;
                }
            });
        }.bind(this));
        this.uploader.on('uploadError', function (file, reason) {
            var _this2 = this;

            this.fileList = this.fileList.map(function (item) {
                _this2.$emit('runtime-error', {
                    code: 'HTTP_ERROR',
                    msg: reason
                });
                _this2.$emit('change-status');
                if (item.file !== null && item.file.id === file.id) {
                    item.url = '';
                    item.errorText = reason;
                    return item;
                } else {
                    return item;
                }
            });
        }.bind(this));
        this.uploader.on('error', function (code) {
            this.$emit('runtime-error', {
                code: code,
                msg: __WEBPACK_IMPORTED_MODULE_0__errors__["a" /* default */][code] || '请检查文件是否符合要求!'
            });
            this.$emit('change-status');
        }.bind(this));
    }
});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(30);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(8);
var defined = __webpack_require__(7);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__component_index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__component_spe__ = __webpack_require__(20);




/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'ct-adc-uploader',
    mixins: [__WEBPACK_IMPORTED_MODULE_1__component_spe__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__component_index__["a" /* default */]]
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ct-adc-uploader-wrap"
  }, [(_vm.type === 'img') ? _c('div', {
    staticClass: "ct-adc-img-uploader"
  }, [_c('ul', {
    ref: "root",
    staticClass: "file-list ct-adc-img-uploader-list",
    class: {
      'disabled-wrap': _vm.disabled
    }
  }, [_vm._l((_vm.fileList), function(thumb, index) {
    return _c('li', {
      key: index,
      style: ({
        width: _vm.thumbnailWidth + 'px',
        height: _vm.thumbnailHeight + 'px'
      })
    }, [_c('img', {
      attrs: {
        "src": thumb.previewSrc
      }
    }), _vm._v(" "), (_vm.isPendingFile(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center pending"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-refresh rotate"
    })]) : _vm._e(), _vm._v(" "), (_vm.isCompleteFile(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center success"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-ok"
    })]) : _vm._e(), _vm._v(" "), (_vm.isErrorFile(thumb.status)) ? _c('div', {
      staticClass: "thumbInfo text-center error"
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-remove"
    })]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "file-panel"
    }, [_c('div', [(_vm.hasPreview) ? _c('span', {
      staticClass: "glyphicon glyphicon-search",
      on: {
        "click": function($event) {
          _vm.preview(index)
        }
      }
    }) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "glyphicon glyphicon-trash",
      on: {
        "click": function($event) {
          _vm.removeFile(index)
        }
      }
    })])])])
  }), _vm._v(" "), (typeof _vm.fileNumLimit === 'undefined' || _vm.fileList.length < _vm.fileNumLimit) ? _c('li', _vm._g({
    ref: "addThumb",
    staticClass: "addThumb",
    style: ({
      width: _vm.thumbnailWidth + 'px',
      height: _vm.thumbnailHeight + 'px'
    })
  }, {
    click: _vm.disabled ? null : _vm.pickerClick
  }), [_c('span', {
    staticClass: "glyphicon glyphicon-plus"
  })]) : _vm._e()], 2), _vm._v(" "), (_vm.hasPreview && _vm.fileList.length > 0) ? _c('div', {
    ref: "modal",
    staticClass: "modal fade"
  }, [_c('div', {
    staticClass: "modal-dialog modal-lg"
  }, [_c('div', {
    staticClass: "modal-content"
  }, [_vm._m(0, false, false), _vm._v(" "), (_vm.previewIndex !== -1) ? _c('div', {
    staticClass: "preview-wrap"
  }, [(_vm.fileList[_vm.previewIndex].url !== '') ? [_c('img', {
    attrs: {
      "src": _vm.fileList[_vm.previewIndex].url,
      "alt": _vm.fileList[_vm.previewIndex].name
    }
  })] : [_c('img', {
    attrs: {
      "src": _vm.fileList[_vm.previewIndex].previewSrc,
      "alt": "fileList[previewIndex].file.name"
    }
  })]], 2) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [(_vm.fileList[_vm.previewIndex].url !== '') ? _c('div', [_c('a', {
    staticClass: "btn btn-sm btn-primary",
    attrs: {
      "target": "_blank",
      "href": _vm.fileList[_vm.previewIndex].url
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-share-alt"
  }), _vm._v("\n                                在新标签页中打开图片\n                            ")])]) : _c('div', {
    staticClass: "text-muted"
  }, [_vm._v("\n                            因该图目前没有完成上传，目前看到的图片只是预览图，尺寸和质量和原图并非完全一致\n                        ")])])])])]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.type === 'file') ? _c('div', {
    staticClass: "ct-adc-importer"
  }, [_c('div', _vm._g({
    ref: "root",
    staticClass: "webuploader-container",
    class: {
      'disabled-wrap': _vm.disabled || _vm.loading
    },
    staticStyle: {
      "display": "inline-block"
    },
    attrs: {
      "data-placement": _vm.tip.direction,
      "data-original-title": _vm.tip.message
    }
  }, {
    click: _vm.disabled ? null : _vm.pickerClick
  }), [_c('i', {
    staticClass: "glyphicon glyphicon-import"
  }), _vm._v(" "), _c('span', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.buttonText))])]), _vm._v(" "), (_vm.hasList) ? _c('ul', {
    staticClass: "list text-muted"
  }, _vm._l((_vm.fileList), function(item, index) {
    return _c('li', {
      key: index,
      attrs: {
        "title": item.name
      }
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-file"
    }), _vm._v("\n                " + _vm._s(item.name) + "\n                "), (item.status === '') ? _c('span', {
      staticClass: "glyphicon glyphicon-hourglass"
    }) : _vm._e(), _vm._v(" "), (item.status === 'error') ? _c('span', {
      staticClass: "glyphicon glyphicon-remove-circle red"
    }) : _vm._e(), _vm._v(" "), (item.status === 'complete') ? _c('span', {
      staticClass: "glyphicon glyphicon-ok-circle text-success"
    }) : _vm._e(), _vm._v(" "), (item.status === 'progress') ? _c('span', {
      staticClass: "glyphicon glyphicon-refresh rotate"
    }) : _vm._e(), _vm._v(" "), _c('span', {
      staticClass: "glyphicon glyphicon-remove",
      on: {
        "click": function($event) {
          _vm.removeFile(index)
        }
      }
    })])
  })) : _vm._e()]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "data-dismiss": "modal"
    }
  }, [_c('span', [_vm._v("×")])]), _vm._v(" "), _c('h4', {
    staticClass: "modal-title"
  }, [_vm._v("图片预览")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6270513f", module.exports)
  }
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(53);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(56)("023d947c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6270513f\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-6270513f\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    uploadedFiles: function uploadedFiles() {
        var _this = this;

        var files = [];

        this.fileList.map(function (item) {
            if (_this.isCompleteFile(item.status)) {
                files.push({
                    errorText: item.errorText,
                    previewSrc: item.previewSrc,
                    previewStatus: item.previewStatus,
                    status: item.status,
                    url: item.url,
                    name: item.name });
            }
        });
        return files;
    },
    errorFiles: function errorFiles() {
        var _this2 = this;

        var files = [];

        this.fileList.map(function (item) {
            if (_this2.isErrorFile(item.status)) {
                files.push({
                    errorText: item.errorText,
                    previewSrc: item.previewSrc,
                    previewStatus: item.previewStatus,
                    status: item.status,
                    url: item.url,
                    name: item.name });
            }
        });
        return files;
    },
    pendingFiles: function pendingFiles() {
        var _this3 = this;

        var files = [];

        this.fileList.map(function (item) {
            if (_this3.isPendingFile(item.status)) {
                files.push({
                    errorText: item.errorText,
                    previewSrc: item.previewSrc,
                    previewStatus: item.previewStatus,
                    status: item.status,
                    url: item.url,
                    name: item.name });
            }
        });
        return files;
    },
    loading: function loading() {
        return this.pendingFiles.length > 0;
    }
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    Q_EXCEED_NUM_LIMIT: '文件数量超出限制!',
    Q_EXCEED_SIZE_LIMIT: '文件总大小超出限制!',
    Q_TYPE_DENIED: '文件类型不正确!',
    F_EXCEED_SIZE: '文件大小超出限制!',
    F_DUPLICATE: '文件重复!'
});

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__props__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__computed__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__watch__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__methods__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__upload__ = __webpack_require__(6);







/* harmony default export */ __webpack_exports__["a"] = ({
    props: __WEBPACK_IMPORTED_MODULE_1__props__["a" /* default */],
    data: function data() {
        return {
            fileList: []
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_2__computed__["a" /* default */],
    created: function created() {
        this.initFileList();
    },
    mounted: function mounted() {
        this.initUploader();

        if (this.type === 'file') {
            this.initTip();
            if (this.disabled) {
                this.disableUploader();
                this.enableTip();
            } else {
                this.disableTip();
            }
        }
    },

    methods: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(__WEBPACK_IMPORTED_MODULE_4__methods__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__upload__["a" /* default */]),
    watch: __WEBPACK_IMPORTED_MODULE_3__watch__["a" /* default */]
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ct_utility__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ct_utility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ct_utility__);



/* harmony default export */ __webpack_exports__["a"] = ({
    pickerClick: function pickerClick(event) {
        var lable = event.currentTarget.children[1].getElementsByTagName('label')[0];

        lable.click();
    },
    isCompleteFile: function isCompleteFile(status) {
        return status === 'complete';
    },
    isPendingFile: function isPendingFile(status) {
        var statuses = ['inited', 'progress', 'queued', 'progress'];

        return statuses.indexOf(status) > -1;
    },
    isErrorFile: function isErrorFile(status) {
        var statuses = ['error', 'cancelled', 'interrupt', 'invalid'];

        return statuses.indexOf(status) > -1;
    },
    isCanBeStoppedFile: function isCanBeStoppedFile(status) {
        var statuses = ['inited', 'queued', 'progress', 'interrupt', 'cancelled'];

        return statuses.indexOf(status) > -1;
    },
    initFileList: function initFileList() {
        var _this = this;

        var defaults = {
            file: null,
            status: '',
            errorText: '',
            previewStatus: true,
            previewSrc: '',
            url: '',
            name: '' };

        this.fileList = [];
        this.files.map(function (url) {
            var file = __WEBPACK_IMPORTED_MODULE_2_ct_utility___default.a.base.extend(defaults, {
                url: url,
                previewSrc: url,
                status: 'complete',
                name: url.split('/').pop()
            });

            _this.fileList.push(JSON.parse(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_json_stringify___default()(file)));
        });
    },
    removeFile: function removeFile(index) {
        if (index === this.fileList.length - 1) {
            this.$emit('runtime-error', {
                code: 'RESET',
                msg: ''
            });
            this.$emit('change-status');
        }
        this.$emit('delete', {
            index: index,
            url: this.fileList[index].url,
            status: this.fileList[index].status
        });
        if (this.fileList[index].file !== null) {
            this.uploader.removeFile(this.fileList[index].file);
        }
        this.fileList = this.fileList.filter(function (item, i) {
            return i !== index;
        });
    },
    initUploader: function initUploader() {
        this.createUploader();
        this.uploaderBind();
    },
    upload: function upload() {
        this.uploader.upload();
    },
    refreshUploader: function refreshUploader() {
        this.uploader.refresh();
    },
    resetUploader: function resetUploader() {
        this.uploader.reset();
    },
    cancelUpload: function cancelUpload() {
        var _this2 = this;

        this.uploader.stop(true);
        this.fileList = this.fileList.filter(function (item) {
            if (_this2.isCanBeStoppedFile(item.status)) {
                if (item.file !== null) {
                    _this2.uploader.removeFile(item.file, true);
                }
            }

            return !_this2.isCanBeStoppedFile(item.status);
        });
    },
    isPending: function isPending() {
        return this.pendingFiles.length > 0;
    },
    getUploadedFiles: function getUploadedFiles() {
        return this.uploadedFiles;
    },
    getErrorFiles: function getErrorFiles() {
        return this.errorFiles;
    },
    getPendingFiles: function getPendingFiles() {
        return this.pendingFiles;
    },
    getUrls: function getUrls() {
        return this.uploadedFiles.map(function (item) {
            return item.url;
        });
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ct_utility__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ct_utility___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ct_utility__);

/* harmony default export */ __webpack_exports__["a"] = ({
    accept: {
        type: Object,
        default: function _default() {
            return null;
        }
    },

    auto: {
        type: Boolean,
        default: false
    },

    chunked: {
        type: Boolean,
        default: false
    },
    chunkSize: {
        type: Number,
        default: 5242880
    },
    chunkRetry: {
        type: Number,
        default: 2
    },

    compress: {
        type: [Boolean, Object],
        default: function _default() {
            return false;
        }
    },

    disabled: {
        type: Boolean,
        default: false
    },

    duplicate: {
        type: Boolean,
        default: false
    },

    fileNumLimit: {
        type: Number
    },

    files: {
        type: Array,
        default: function _default() {
            return [];
        }
    },

    fileSingleSizeLimit: {
        type: Number
    },

    fileSizeLimit: {
        type: Number
    },

    fileVal: {
        type: String,
        default: 'file'
    },

    formData: {
        type: Object,
        default: function _default() {
            return {};
        }
    },

    headers: {
        type: Object,
        default: function _default() {
            return {};
        }
    },

    method: {
        type: String,
        default: 'post'
    },

    multiple: {
        type: Boolean,
        default: false
    },

    resultFilter: {
        type: Function,
        default: function _default() {
            return function (res) {
                res = __WEBPACK_IMPORTED_MODULE_0_ct_utility___default.a.objTransfer.lowerKey(res);

                if (res.code === 0) {
                    return {
                        status: true,
                        path: res.data.path
                    };
                } else {
                    return {
                        status: false,
                        path: ''
                    };
                }
            };
        }
    },
    sendAsBinary: {
        type: Boolean,
        default: false
    },

    server: {
        type: String,
        default: ''
    },

    thumb: {
        type: Object,
        default: function _default() {
            return {
                width: 110,
                height: 110,

                quality: 70,

                allowMagnify: true,

                crop: true,

                type: ''
            };
        }
    },

    threads: {
        type: Number,
        default: 3
    },

    tip: {
        type: Object,
        default: function _default() {
            return {
                message: '错误提示',
                direction: 'bottom'
            };
        }
    }
});

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    props: {
        type: {
            type: String,
            default: 'file'
        },
        thumbnailWidth: {
            type: Number,
            default: 110
        },
        thumbnailHeight: {
            type: Number,
            default: 110
        },
        accept: {
            type: Object,
            default: function _default() {
                return {
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                };
            }
        },

        buttonText: {
            type: String,
            default: '导入文件'
        },
        hasPreview: {
            type: Boolean,
            default: false
        },
        hasList: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        button: function button() {
            if (this.type === 'img') {
                return this.$refs.addThumb;
            } else if (this.type === 'file') {
                return this.$refs.root;
            }
        }
    },
    data: function data() {
        return {
            previewIndex: 0
        };
    },

    methods: {
        preview: function preview(index) {
            this.previewIndex = index;
            $(this.$refs.modal).modal('show');
        },
        initTip: function initTip() {
            $(this.button).tooltip({
                title: this.tip.message,
                placement: this.tip.direction
            });
        },
        disableTip: function disableTip() {
            $(this.button).tooltip('disable');
        },
        enableTip: function enableTip() {
            $(this.button).tooltip('enable');
        },
        destroyTip: function destroyTip() {
            $(this.button).tooltip('destroy');
        },
        disableUploader: function disableUploader() {
            var classes = this.$refs.root.querySelector('.webuploader-pick').classList;

            if (!classes.contains('webuploader-pick-disable')) {
                this.$refs.root.querySelector('.webuploader-pick').classList.add('webuploader-pick-disable');
            }
        },
        enableUploader: function enableUploader() {
            var classes = this.$refs.root.querySelector('.webuploader-pick').classList;

            if (classes.contains('webuploader-pick-disable')) {
                this.$refs.root.querySelector('.webuploader-pick').classList.remove('webuploader-pick-disable');
            }
        }
    },
    watch: {
        buttonText: function buttonText(newVal) {
            var $webuploaderPick = this.$refs.root.querySelector('.webuploader-pick');

            $webuploaderPick.innerHTML = '<i class="glyphicon glyphicon-import"></i><span class="title">' + newVal + '</span>';
        }
    },
    beforeDestroy: function beforeDestroy() {
        if (this.type === 'file') {
            this.destroyTip();
        }
    }
});

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    hashString: function hashString(str) {
        var hash = 0,
            len = str.length,
            _char = void 0;

        for (var i = 0; i < len; i++) {
            _char = str.charCodeAt(i);
            hash = _char + (hash << 6) + (hash << 16) - hash;
        }

        return hash;
    }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
    accept: function accept() {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    auto: function auto(newVal) {
        this.uploader.option('auto', newVal);
    },
    chunked: function chunked(newVal) {
        this.uploader.option('chunked', newVal);
    },
    chunkSize: function chunkSize(newVal) {
        this.uploader.option('chunkSize', newVal);
    },
    chunkRetry: function chunkRetry(newVal) {
        this.uploader.option('chunkRetry', newVal);
    },
    compress: function compress() {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    disabled: function disabled(newVal) {
        if (this.type === 'file') {
            if (newVal) {
                this.disableUploader();
                this.enableTip();
            } else {
                this.enableUploader();
                this.disableTip();
            }
        }
    },
    duplicate: function duplicate(newVal) {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    fileList: function fileList(newVal, oldVal) {
        var _this = this;

        if (this.type === 'img' && newVal.length < oldVal.length && (typeof this.fileNumLimit === 'undefined' || oldVal.length === this.fileNumLimit)) {
            this.$nextTick(function () {
                _this.uploader.addButton({
                    id: _this.$refs.addThumb
                });
            });
        }
    },
    fileNumLimit: function fileNumLimit() {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    files: function files() {
        this.initFileList();
    },
    fileSingleSizeLimit: function fileSingleSizeLimit() {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    fileSizeLimit: function fileSizeLimit() {
        if (typeof this.uploader !== 'undefined') {
            this.uploader.destroy();
            this.initUploader();
        }
    },
    method: function method(newVal) {
        this.uploader.option('method', newVal);
    },
    multiple: function multiple(newVal) {
        this.uploader.option('multiple', newVal);
    },
    tip: function tip(newVal) {
        if (this.type === 'file') {
            if (newVal.message === '') {
                this.disableTip();
            } else {
                this.destroyTip();
                this.initTip();
                this.enableTip();
            }
        }
    },
    sendAsBinary: function sendAsBinary(newVal) {
        this.uploader.option('sendAsBinary', newVal);
    },
    server: function server(_server) {
        this.uploader.option('server', _server);
    },
    threads: function threads(newVal) {
        this.uploader.option('threads', newVal);
    },
    fileVal: function fileVal(newVal) {
        this.uploader.option('fileVal', newVal);
    },
    loading: function loading(newVal) {
        if (this.type === 'file') {
            var button = this.$refs.root.getElementsByClassName('webuploader-pick')[0];

            if (newVal) {
                button.innerHTML = '<i class="glyphicon glyphicon-refresh rotate"></i> <span class="title">上传文件中</span>';
            } else {
                button.innerHTML = '<i class="glyphicon glyphicon-import"></i> <span class="title">' + this.buttonText + '</span>';
            }
        }
    }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(25), __esModule: true };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(26), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(0);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(52);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(48);
var toAbsoluteIndex = __webpack_require__(47);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(27);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var core = __webpack_require__(0);
var ctx = __webpack_require__(31);
var hide = __webpack_require__(36);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(39);
var createDesc = __webpack_require__(44);
module.exports = __webpack_require__(1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(2)(function () {
  return Object.defineProperty(__webpack_require__(32)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(42);
var gOPS = __webpack_require__(40);
var pIE = __webpack_require__(43);
var toObject = __webpack_require__(49);
var IObject = __webpack_require__(8);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(2)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(28);
var IE8_DOM_DEFINE = __webpack_require__(37);
var toPrimitive = __webpack_require__(50);
var dP = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(35);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(29)(false);
var IE_PROTO = __webpack_require__(45)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(41);
var enumBugKeys = __webpack_require__(33);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(46)('keys');
var uid = __webpack_require__(51);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(9);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(9);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(7);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 51 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(34);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(38) });


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(54)();
// imports


// module
exports.push([module.i, "\n.ct-adc-uploader-wrap {\n  display: inline-block;\n}\n.ct-adc-img-uploader .webuploader-container div:nth-child(2) {\n  width: 1px !important;\n  height: 1px !important;\n}\n.ct-adc-img-uploader .webuploader-pick {\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n}\n.ct-adc-img-uploader .webuploader-element-invisible {\n  outline: none;\n  opacity: 0;\n  cursor: pointer;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list {\n  list-style: none;\n  margin: -8px;\n  padding: 0;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list:after {\n    content: '';\n    display: block;\n    width: 0;\n    height: 0;\n    overflow: hidden;\n    clear: both;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li {\n    border: 1px solid #d4d4d4;\n    border-radius: 6px;\n    text-align: center;\n    margin: 8px;\n    position: relative;\n    display: inline;\n    float: left;\n    overflow: hidden;\n    font-size: 12px;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li img {\n      width: 100%;\n      height: 100%;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li .thumbInfo {\n      position: absolute;\n      bottom: -2px;\n      right: -14px;\n      width: 46px;\n      height: 20px;\n      line-height: 20px;\n      -webkit-transform: rotate(-45deg);\n              transform: rotate(-45deg);\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li .success {\n      background-color: #13ce66;\n      box-shadow: 0 0 5px #116235;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li .pending {\n      background-color: #ff5722;\n      box-shadow: 0 0 5px #c13509;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li .error {\n      background-color: #ec1515;\n      box-shadow: 0 0 5px #bf0303;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li .thumbInfo span {\n      -webkit-transform: rotate(45deg);\n              transform: rotate(45deg);\n      color: #fff;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li.addThumb {\n      position: relative;\n      border: 1px dashed #d4d4d4;\n      cursor: pointer;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li.addThumb span {\n        font-size: 30px;\n        color: #e3e3e3;\n        position: absolute;\n        top: 50%;\n        left: 50%;\n        -webkit-transform: translate(-50%, -50%);\n        transform: translate(-50%, -50%);\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li.addThumb:hover span {\n        color: #aaaaaa;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list li:hover .file-panel {\n      display: block;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list div.file-panel {\n    position: absolute;\n    cursor: pointer;\n    background: rgba(0, 0, 0, 0.2);\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    overflow: hidden;\n    z-index: 300;\n    text-align: center;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list div.file-panel div {\n      width: 100%;\n      height: 30px;\n      line-height: 30px;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      -webkit-transform: translate(-50%, -50%);\n      transform: translate(-50%, -50%);\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list div.file-panel div span {\n        font-size: 20px;\n        color: #fff;\n        vertical-align: middle;\n}\n.ct-adc-img-uploader .ct-adc-img-uploader-list.file-list div.file-panel div span:hover {\n          color: #aaaaaa;\n}\n.ct-adc-img-uploader .disabled-wrap label, .ct-adc-img-uploader .disabled-wrap input {\n  position: absolute;\n  z-index: -9999;\n  top: -9999px;\n}\n.ct-adc-img-uploader .disabled-wrap .glyphicon-plus {\n  color: #f0f0f0 !important;\n}\n.ct-adc-img-uploader .disabled-wrap div {\n  cursor: not-allowed;\n}\n.ct-adc-img-uploader .disabled-wrap .addThumb {\n  border-color: #f0f0f0 !important;\n}\n.ct-adc-img-uploader .preview-wrap {\n  position: relative;\n  min-height: 500px;\n}\n.ct-adc-img-uploader .preview-wrap img {\n    max-width: 100%;\n    max-height: 100%;\n    margin: auto;\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n}\n.ct-adc-importer .disabled-wrap {\n  opacity: 0.6;\n  pointer-events: none;\n}\n.ct-adc-importer .disabled-wrap label {\n  position: absolute;\n  z-index: -9999;\n}\n.ct-adc-importer .webuploader-container div:nth-child(2) {\n  width: 1px !important;\n  height: 1px !important;\n}\n.ct-adc-importer .webuploader-element-invisible {\n  position: absolute !important;\n  clip: rect(1px, 1px, 1px, 1px);\n}\n.ct-adc-importer .webuploader-pick {\n  position: relative;\n  display: inline-block;\n  cursor: pointer;\n  background: #00b7ee;\n  padding: 5px 10px;\n  color: #fff;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n  font-size: 12px;\n  line-height: 1.5;\n  margin-bottom: 0;\n  font-weight: normal;\n  vertical-align: middle;\n  touch-action: manipulation;\n  background-image: none;\n  border: 1px solid transparent;\n  white-space: nowrap;\n  -ms-touch-action: manipulation;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.ct-adc-importer .webuploader-pick .glyphicon {\n    margin-right: 5px;\n}\n.ct-adc-importer .webuploader-pick:hover {\n  background: #00a2d4;\n}\n.ct-adc-importer .list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  margin-top: 10px;\n}\n.ct-adc-importer .list li {\n    line-height: 30px;\n    position: relative;\n    padding: 0 5px;\n    margin-top: 5px;\n    border-radius: 2px;\n    cursor: pointer;\n    text-overflow: ellipsis;\n    overflow: hidden;\n    white-space: nowrap;\n    padding-right: 30px;\n}\n.ct-adc-importer .list li span {\n      line-height: 30px;\n}\n.ct-adc-importer .list li span.glyphicon-file {\n        margin-right: 10px;\n}\n.ct-adc-importer .list li span.glyphicon-remove-circle, .ct-adc-importer .list li span.glyphicon-ok-circle {\n        font-size: 14px;\n}\n.ct-adc-importer .list li span.glyphicon-remove, .ct-adc-importer .list li span.glyphicon-remove-circle, .ct-adc-importer .list li span.glyphicon-ok-circle, .ct-adc-importer .list li span.glyphicon-hourglass, .ct-adc-importer .list li span.glyphicon-refresh {\n        position: absolute;\n        right: 5px;\n}\n.ct-adc-importer .list li span.glyphicon-remove {\n        display: none;\n}\n.ct-adc-importer .list li:hover {\n      background: #f4f4f4;\n}\n.ct-adc-importer .list li:hover .glyphicon-remove {\n        display: block;\n}\n.ct-adc-importer .list li:hover .glyphicon-remove-circle, .ct-adc-importer .list li:hover .glyphicon-ok-circle, .ct-adc-importer .list li:hover .glyphicon-hourglass, .ct-adc-importer .list li:hover.glyphicon-refresh {\n        display: none;\n}\n", ""]);

// exports


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(14)

var Component = __webpack_require__(12)(
  /* script */
  __webpack_require__(11),
  /* template */
  __webpack_require__(13),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/rubyisapm/teamshare/CT-ADC/ct-adc-uploader/src/component/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6270513f", Component.options)
  } else {
    hotAPI.reload("data-v-6270513f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(57)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 57 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});