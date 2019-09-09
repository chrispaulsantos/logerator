"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
function log(options) {
    if (options === void 0) { options = { static: false }; }
    options = __assign({ static: false }, options);
    if (!options.loggerFn) {
        options.loggerFn = console.log;
    }
    return function (target) {
        var prototype = target.prototype;
        var list = Object.keys(prototype)
            .concat(Object.getOwnPropertyNames(prototype))
            .filter(function (key, i, arr) { return key !== 'constructor' && arr.indexOf(key) === i; });
        list.forEach(function (key) {
            var fn = prototype[key];
            if (fn && isMethod(fn)) {
                prototype[key] = applyMonkeyPatch(fn, options.loggerFn);
            }
        });
    };
}
exports.log = log;
function isMethod(fn) {
    if (typeof fn === 'function') {
        return true;
    }
    return false;
}
function applyMonkeyPatch(fn, logFn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var instance = this;
        var wrapper = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            logFn("START " + fn.name + "()");
            var result = fn.apply(instance, args);
            if (result instanceof Promise) {
                return result
                    .then(function (val) {
                    logFn("---- RESOLVE ----");
                    logFn(val);
                    logFn("END: " + fn.name + "()");
                    return val;
                })["catch"](function (reason) {
                    logFn("---- REJECT ----");
                    logFn(reason);
                    logFn("END: " + fn.name + "()");
                    return Promise.reject(reason);
                });
            }
            logFn("---- RESULT ----");
            logFn(result);
            logFn("END: " + fn.name + "()");
            return result;
        };
        return wrapper.apply(this, args);
    };
}
var MyClass = /** @class */ (function () {
    function MyClass() {
        this.myParam = '';
    }
    MyClass.myStaticFunc = function () {
        return 5;
    };
    MyClass.prototype.myFunc = function () {
        return 3;
    };
    MyClass.prototype.myAsyncMethod = function (num) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (num === 47) {
                            reject('Error');
                        }
                        resolve(num);
                    })];
            });
        });
    };
    MyClass.myStaticParam = 'myStaticParam';
    MyClass = __decorate([
        log()
    ], MyClass);
    return MyClass;
}());
var myClass = new MyClass();
myClass.myFunc();
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var num, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, myClass.myAsyncMethod(47)];
                case 1:
                    num = _a.sent();
                    console.log(num);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
})();
