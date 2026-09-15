"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
var Repository = /** @class */ (function () {
    function Repository() {
        this.items = [];
    }
    Repository.prototype.add = function (items) {
        this.items.push(items);
    };
    Repository.prototype.getAll = function () {
        return this.items;
    };
    Repository.prototype.getById = function (id) {
        return this.items.find(function (item) { return item.id === id; });
    };
    Repository.prototype.update = function (id, updatedItem) {
        var item = this.getById(id);
        if (!item) {
            return undefined;
        }
        Object.assign(item, updatedItem);
        return item;
    };
    Repository.prototype.delete = function (id) {
        var index = this.items.findIndex(function (item) { return item.id === id; });
        if (index === -1) {
            return false;
        }
        this.items.splice(index, 1);
        return true;
    };
    return Repository;
}());
exports.Repository = Repository;
