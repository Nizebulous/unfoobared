'use strict';

var $ = require('jquery-browserify');
var dispatcher = require('./dispatcher');

var Actions = {
    BLOG_UPDATE: 'blog-update',
    BLOG_URL: '/api/blog/blog-entries',

    blogUpdate: function() {
        var blogs = [];
        var blogPromise = $.get(this.BLOG_URL);
        $.when(blogPromise).done(function(blogResponse) {
            var blogEntries = blogResponse.results;
            dispatcher.dispatch({action: this.BLOG_UPDATE, blogEntries: blogEntries});
        }.bind(this));
    },
};

module.exports = Actions;
