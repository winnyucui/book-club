"use strict";
exports.__esModule = true;
exports.Interservice = exports.Service = void 0;
var Service = /** @class */ (function () {
    function Service(service_name, query, execution_order, previous_service, next_services) {
        if (query === void 0) { query = {}; }
        if (execution_order === void 0) { execution_order = 1; }
        if (previous_service === void 0) { previous_service = undefined; }
        if (next_services === void 0) { next_services = []; }
        this.service_name = service_name;
        this.execution_order = execution_order;
        this.previous_service = previous_service;
        this.next_services = next_services;
        this.query = query;
    }
    return Service;
}());
exports.Service = Service;
var Interservice = /** @class */ (function () {
    function Interservice(formatted_data, next_services) {
        if (next_services === void 0) { next_services = {}; }
        this.formatted_data = formatted_data;
        this.next_services = next_services;
    }
    return Interservice;
}());
exports.Interservice = Interservice;
