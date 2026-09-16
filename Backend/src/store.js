"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStore = void 0;
exports.describeTask = describeTask;
var TaskStore = /** @class */ (function () {
    function TaskStore() {
        this.tasks = [];
    }
    TaskStore.prototype.addTask = function (task) {
        this.tasks.push(task);
    };
    TaskStore.prototype.getByStatus = function (status) {
        return this.tasks.filter(function (task) { return task.status === status; });
    };
    TaskStore.prototype.updateStatus = function (id, newStatus) {
        var task = this.tasks.find(function (task) { return task.id === id; });
        if (task) {
            task.status = newStatus;
            return task;
        }
    };
    TaskStore.prototype.getAll = function () {
        return this.tasks;
    };
    return TaskStore;
}());
exports.TaskStore = TaskStore;
function describeTask(task) {
    switch (task.status) {
        case "to-do":
            return "Task ".concat(task.title, " is in the to-do list.");
        case "in-progress":
            return "Task ".concat(task.title, " is currently in progress.");
        case "done":
            return "Task ".concat(task.title, " has been completed.");
        default:
            return "Task ".concat(task.title, " has an unknown status.");
    }
}
