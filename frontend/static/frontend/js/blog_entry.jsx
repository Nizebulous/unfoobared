/* jshint esversion: 6, node: true, browser: true */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Markdown = require('react-remarkable');
var hljs = require('highlight.js');
var BlogStore = require('./stores');
var Actions = require('./actions');
var Colors = require('./colors');

var options = {
    highlight: function(str, lang) {
	if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(lang, str).value;
	} else {
	    return hljs.highlightAuto(str).value;
	}
    }
};

class BlogEntry extends React.Component{

    constructor(props) {
	super(props);
	// Methods are not autobound
	this.onChange = this.onChange.bind(this);
	this.getState = this.getState.bind(this);
	this.state = this.getState();
    }

    componentDidMount() {
        Actions.blogEntryUpdate(global.year, global.month, global.slug);
        BlogStore.addChangeListener(this.onChange);
    }

    onChange() {
        this.setState(this.getState());
    }

    getState() {
        return {
            entry: BlogStore.getBlogEntry(global.year, global.month, global.slug)
        };
    }

    componentWillUnmount() {
        BlogStore.removeChangeListener(this._onChange);
    }

    render() {
        if (this.state.entry) {
            return (
                <div className="blog-entry">
                    <Markdown options={options} source={this.state.entry.post}/>
                </div>
            );
        } else {
            return (
                <div>
                Loading...
                </div>
            );
        }
    }
}

ReactDOM.render(
    <BlogEntry/>, document.getElementById('main-mount')
);
