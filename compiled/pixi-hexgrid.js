(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Flat2dGrid = (function () {
    /**
     * Takes a rectangular 2-d array of one type and flattens it
     */
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
    /**
     * Access the 2-d array
     * @returns The element (type T) at the indexes provided
     */
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

},{}]},{},[1]);
