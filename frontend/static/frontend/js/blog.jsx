/* jshint esversion: 6, node: true, browser: true */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var BlogStore = require('./stores');
var Actions = require('./actions');
var Colors = require('./colors');

var listElementStyle = {
    color: Colors.white,
    maxWidth: 700,
    margin: '0 auto',
    marginBottom: 100,
    borderTop: 10,
    borderStyle: 'dotted',
    borderColor: Colors.grey,
    padding: 50,
    width: '80%',
};

var listStyle = {
    textAlign: 'left',
    margin: '0 auto',
    padding: '20 10',
};

var blogEntryTitleBarStyle = {
    height: 20,
    marginBottom: 40,
};

var blogEntryTitleStyle = {
    float: 'left',
    color: Colors.blue,
    maxWidth: 500,
};

var blogEntryDateStyle = {
    float: 'right',
    color: Colors.purple,
    maxWidth: 200,
};

class BlogEntryShort extends React.Component{
    render() {
        var blog = this.props.blog;
        return (
            <div style={listElementStyle}>
                <div style={blogEntryTitleBarStyle}>
                    <span style={blogEntryTitleStyle}>{blog.title}</span>
                    <span style={blogEntryDateStyle}>{new Date(blog.first_published_on).toDateString()}</span>
                </div>
                <div>
                    <p>{blog.post}</p>
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
                <div style={listStyle}>
                {blogs.map(function(blog) {
                    return <BlogEntryShort key={blog.title} blog={blog}/>;
                })}
                </div>
            );
        } else {
            return (<div style={listStyle}>Loading...</div>);
        }
    }
}

ReactDOM.render(
    <BlogEntryList/>, document.getElementById('blog-mount')
);
