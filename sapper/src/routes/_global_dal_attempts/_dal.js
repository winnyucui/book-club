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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.get_data = void 0;
var _defs_1 = require("./_defs");
var airtable_base = require('airtable').base(process.env.AIRTABLE_DB_ID);
var goodreads = require('goodreads-api-node');
var gr_credentials = {
    key: process.env.GOODREADS_API_KEY,
    secret: process.env.GOODREADS_API_SECRET
};
var gr = goodreads(gr_credentials);
// async function authenticate_service() {
// }
// authenticate only once
// authenticate_service()
// ! : by convention, databases use all lowercase
// let airtable_service = new Service("airtable", { "table_name": "nominations" })
function get_data(source, route) {
    return __awaiter(this, void 0, void 0, function () {
        var airtable_data, interservice_1, next_services, goodreads_data, _a, _b, _i, key, next_source, raw_data, interservice_2, final_data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(source.service_name == "airtable")) return [3 /*break*/, 9];
                    if (!(route == "/nominated-books" ||
                        route == "/nominated-books/")) return [3 /*break*/, 9];
                    return [4 /*yield*/, get_airtable_data(source, source.query.table_name, route)];
                case 1:
                    airtable_data = _c.sent();
                    return [4 /*yield*/, process_airtable_data(airtable_data, source, route)];
                case 2:
                    interservice_1 = _c.sent();
                    next_services = interservice_1.next_services;
                    goodreads_data = {};
                    _a = [];
                    for (_b in next_services)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    key = _a[_i];
                    next_source = next_services[key];
                    return [4 /*yield*/, get_goodreads_data(next_source, next_source.query.title, route)];
                case 4:
                    raw_data = _c.sent();
                    goodreads_data[key] = raw_data;
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, process_goodreads_data(goodreads_data, source, route)];
                case 7:
                    interservice_2 = _c.sent();
                    return [4 /*yield*/, merge_data([interservice_1.formatted_data, interservice_2.formatted_data])
                        // console.log("final_data", final_data)
                    ];
                case 8:
                    final_data = _c.sent();
                    // console.log("final_data", final_data)
                    return [2 /*return*/, final_data];
                case 9:
                    if (source.service_name == "goodreads") {
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.get_data = get_data;
// GET_SERVICE_DATA METHODS
// ==========================================================================
function get_airtable_data(source, query, route) {
    return __awaiter(this, void 0, void 0, function () {
        var table_base, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, airtable_base(query)];
                case 1:
                    table_base = _a.sent();
                    if (!(route == "/nominated-books" || route == "/nominated-books/")) return [3 /*break*/, 3];
                    data = table_base.select({
                        filterByFormula: "NOT({uid} = '')",
                        fields: ["uid", "title", "author", "nominator", "comments"],
                        view: "Grid view"
                    }).all();
                    return [4 /*yield*/, data];
                case 2: return [2 /*return*/, _a.sent()];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function get_goodreads_data(source, query, route) {
    return __awaiter(this, void 0, void 0, function () {
        var goodreads_data;
        return __generator(this, function (_a) {
            if (route == "/nominated-books" || route == "/nominated-books/") {
                goodreads_data = gr.searchBooks({ q: query, page: 1, field: 'title' });
                return [2 /*return*/, goodreads_data];
            }
            return [2 /*return*/];
        });
    });
}
// PROCESS_SERVICE_DATA METHODS
// ==========================================================================
function process_airtable_data(raw_data, source, route) {
    return __awaiter(this, void 0, void 0, function () {
        var formatted_data_1, next_services_1, interservice_step;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(route == "/nominated-books" ||
                        route == "/nominated-books/")) return [3 /*break*/, 2];
                    formatted_data_1 = {};
                    next_services_1 = {};
                    return [4 /*yield*/, raw_data.forEach(function (raw_datum, i) {
                            var formatted_datum = {
                                "title": raw_datum.get("title"),
                                "author": raw_datum.get("author"),
                                "nominator": raw_datum.get("nominator"),
                                "comments": raw_datum.get("comments")
                            };
                            formatted_data_1[i] = formatted_datum;
                            var next_service = new _defs_1.Service("goodreads", { "title": raw_datum.get("title") }, source.execution_order + 1, source);
                            next_services_1[i] = next_service;
                        })];
                case 1:
                    _a.sent();
                    interservice_step = new _defs_1.Interservice(formatted_data_1, next_services_1);
                    return [2 /*return*/, interservice_step];
                case 2: return [2 /*return*/];
            }
        });
    });
}
function process_goodreads_data(raw_data, source, route) {
    return __awaiter(this, void 0, void 0, function () {
        var formatted_data, _a, _b, _i, key, check, book_id, show_book, book_image, book_media, book_link, err_1, interservice_step;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(route == "/nominated-books" || route == "/nominated-books/")) return [3 /*break*/, 8];
                    formatted_data = {};
                    _a = [];
                    for (_b in raw_data)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 7];
                    key = _a[_i];
                    check = raw_data[key].search.results.work;
                    book_id = void 0;
                    show_book = void 0;
                    book_image = void 0;
                    book_media = void 0;
                    book_link = void 0;
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 5, , 6]);
                    if (!(check !== undefined)) return [3 /*break*/, 4];
                    book_id = check[0].best_book.id._;
                    return [4 /*yield*/, gr.showBook(book_id)];
                case 3:
                    show_book = _c.sent();
                    book_image = check[0].best_book.image_url;
                    book_link = show_book.book.url;
                    book_media = {
                        "gr_id": book_id,
                        "image": book_image,
                        "link": book_link
                    };
                    formatted_data[key] = book_media;
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _c.sent();
                    console.error(err_1);
                    return [3 /*break*/, 6];
                case 6:
                    _i++;
                    return [3 /*break*/, 1];
                case 7:
                    interservice_step = new _defs_1.Interservice(formatted_data, []);
                    return [2 /*return*/, interservice_step];
                case 8: return [2 /*return*/];
            }
        });
    });
}
// MERGE_DATA METHOD
// ==========================================================================
function merge_data(datasets) {
    return __awaiter(this, void 0, void 0, function () {
        var merged_data;
        return __generator(this, function (_a) {
            merged_data = Object.keys(datasets[0]).map(function (key) {
                var merged_item = {};
                for (var _i = 0, datasets_1 = datasets; _i < datasets_1.length; _i++) {
                    var dataset = datasets_1[_i];
                    merged_item = __assign(__assign({}, merged_item), dataset[key]);
                }
                return merged_item;
            });
            return [2 /*return*/, merged_data];
        });
    });
}
