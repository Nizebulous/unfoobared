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

class BlogEntryShort extends React.Component{
    render() {
        var blog = this.props.blog;
        var date = new Date(blog.first_published_on);
        var url = date.getFullYear() + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + blog.slug;
        return (
            <div className="bl-element">
                <div className="ble-title-bar">
                    <span className="bletb-title">{blog.title}</span>
                    <span className="bletb-date">{date.toDateString()}</span>
                </div>
                <div>
		    <Markdown options={options} source={blog.short}/>
                </div>
		<div>
		    <a href={url}>Full Post &gt; </a>
		</div>
            </div>
        );
    }
}

class BlogEntryList extends React.Component {

    constructor(props) {
	super(props);
	// Methods are not autobound
	this.onChange = this.onChange.bind(this);
	this.getState = this.getState.bind(this);
	this.state = this.getState();
    }

    componentDidMount() {
        Actions.blogUpdate();
        BlogStore.addChangeListener(this.onChange);
    }

    onChange() {
        this.setState(this.getState());
    }

    getState() {
        return {
            blogEntries: BlogStore.getBlogEntries()
        };
    }

    componentWillUnmount() {
        BlogStore.removeChangeListener(this._onChange);
    }

    render() {
        var blogs = this.state.blogEntries;
        if (blogs !== null) {
            return (
                <div className="blog-list">
                {blogs.map(function(blog) {
                    return <BlogEntryShort key={blog.title} blog={blog}/>;
                })}
                </div>
            );
        } else {
            return (<div className="blog-list">Loading...</div>);
        }
    }
}

ReactDOM.render(
    <BlogEntryList/>, document.getElementById('main-mount')
);
