/* jshint esversion: 6, node: true, browser: true */
'use strict';

var $ = require('jquery-browserify');
var dispatcher = require('./dispatcher');

var Actions = {
    BLOG_UPDATE: 'blog-update',
    BLOG_ENTRY_UPDATE: 'blog-entry-update',
    BLOG_URL: '/api/blog/blog-entries/',

    blogUpdate: function() {
        var blogs = [];
        var blogPromise = $.get(this.BLOG_URL);
        $.when(blogPromise).done(function(blogResponse) {
            var blogEntries = blogResponse.results;
            dispatcher.dispatch({action: this.BLOG_UPDATE, blogEntries: blogEntries});
        }.bind(this));
    },

    blogEntryUpdate: function(year, month, slug) {
        var entry = {};
        var entryPromise = $.get(this.BLOG_URL + year + '/' + month + '/' + slug);
        $.when(entryPromise).done(function(entry) {
            dispatcher.dispatch({action: this.BLOG_ENTRY_UPDATE, year: year, month: month, slug: slug, entry: entry});
        }.bind(this));
    },
};

module.exports = Actions;
