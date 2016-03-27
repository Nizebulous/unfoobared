/* jshint esversion: 6, node: true, browser: true */
'use strict';

var dispatcher = require("./dispatcher");
var Actions = require('./actions');

var EventEmitter = require("events").EventEmitter;
var assign = require('object-assign');

var BlogStore = assign({}, EventEmitter.prototype, {

    CHANGE_EVENT: 'blogs-updated',
    _blogEntries: null,
    _blogDictionary: {},

    getBlogEntries: function() {
        return this._blogEntries;
    },

    getBlogEntry: function(year, month, slug) {
        var key = year + month + slug;
        if (key in this._blogDictionary) {
            return this._blogDictionary[key];
        } else {
            return {};
        }
    },

    emitChange: function() {
        this.emit(this.CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(this.CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(this.CHANGE_EVENT, callback);
    },

    dispatcherIndex: dispatcher.register(function(payload) {
        switch (payload.action) {
            case Actions.BLOG_UPDATE:
                BlogStore._blogEntries = payload.blogEntries;
                BlogStore.emitChange();
                break;
            case Actions.BLOG_ENTRY_UPDATE:
                BlogStore._blogDictionary[payload.year + payload.month + payload.slug] = payload.entry;
                BlogStore.emitChange();
                break;
        }

        return true;
    }.bind(this)),

});

module.exports = BlogStore;
