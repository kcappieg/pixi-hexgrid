(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Flat2dGrid = (function () {
        function Flat2dGrid(twoDimArray) {
            this.flatArray = [];
            this.columns = twoDimArray.length;
            this.rows = twoDimArray[0].length;
            for (var i = 0; i < twoDimArray.length; i++) {
                for (var j = 0; j < twoDimArray[i].length; j++) {
                    if (twoDimArray[i].length !== this.rows) {
                        throw new Error("2-dimensional array is not uniformly rectangular");
                    }
                    var index = i * twoDimArray[i].length + j;
                    this.flatArray[index] = twoDimArray[i][j];
                }
            }
        }
        Flat2dGrid.prototype.getColumns = function () {
            return this.columns;
        };
        Flat2dGrid.prototype.getRows = function () {
            return this.rows;
        };
        Flat2dGrid.prototype.getAt = function (x, y) {
            if (x >= this.columns || y >= this.rows || x < 0 || y < 0) {
                throw new Error("Index out of bounds");
            }
            var index = x * this.rows + y;
            return this.flatArray[index];
        };
        return Flat2dGrid;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Flat2dGrid;
});
//# sourceMappingURL=Flat2dGrid.js.map