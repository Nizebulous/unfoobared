var React = require('react');
var ReactDOM = require('react-dom');
var BlogStore = require('./stores');
var Actions = require('./actions');

var purple = '#a082bd';
var white = '#e0e2e4';
var green = '#93c763';
var yellow = '#ffcd22';
var orange = '#ec7600';
var darkOrange = '#ff8409';
var cream = '#e8e2b7';
var brown = '#d39745';
var grey = '#66747b';
var blue = '#678cb1';
var lightBlue = '#5899c0';
var teal = '#5ab9be';
var darkGrey = '#293134';
var lessDarkGrey = '#2f393c';
var brightYellow = '#f3db2e';
var test = 'xxxxxx';

var listElementStyle = {
    color: white,
    maxWidth: 700,
    margin: '0 auto',
    marginBottom: 100,
    borderTop: 10,
    borderStyle: 'dotted',
    borderColor: grey,
    padding: 50,
    width: '80%',
};

var listStyle = {
    textAlign: 'left',
    margin: '0 auto',
    padding: '20 10',
};

var menuBarStyle = {
    padding: 10,
    marginTop: 10,
};

var menuItemStyle = {
    margin: 20,
    color: orange,
    textDecoration: 'none',
};

var menuItemJoinerStyle = {
    color: cream,
};

var headerStyle = {
    margin: '0 auto',
    marginBottom: 30,
    marginTop: 10,
    padding: 20,
    width: 800,
};

var brandBarStyle = {
    padding: 10,
};

var brandTextStyle = {
    color: green,
    marginRight: 10,
};

var blogEntryTitleBarStyle = {
    height: 20,
    marginBottom: 40,
    //fontWeight: 'bold',
};

var blogEntryTitleStyle = {
    float: 'left',
    color: blue,
    maxWidth: 500,
};

var blogEntryDateStyle = {
    float: 'right',
    color: purple,
    maxWidth: 200,
};

var MenuItem = React.createClass({
    render: function() {
        var link = this.props.label;
        var label = this.props.label;
        return <a style={menuItemStyle} href={link}><span>{label}</span></a>;
    }
});

var MenuBar = React.createClass({
    render: function() {
        var components = ['blog', 'projects', 'about me'];
        var menuItems = [<span key='choice'>choice = </span>];
        for (var index = 0; index < components.length; index++) {
            menuItems.push(<MenuItem key={components[index]} label={components[index]}/>);
            menuItems.push(<span key={components[index] + 'or'} style={menuItemJoinerStyle}> or </span>);
        }
        menuItems.pop();
        return (
            <div style={menuBarStyle}>
            {menuItems}
            </div>
        );
    }
});

var Header = React.createClass({
    render: function() {
        return (
            <div style={headerStyle}>
                <div style={brandBarStyle}>
                    <div><span style={brandTextStyle}>#</span></div>
                    <div><span style={brandTextStyle}># Unfoobared.com</span></div>
                    <div><span style={brandTextStyle}>#</span></div>
                </div>
                <MenuBar/>
            </div>
        );
    }
});

var BlogEntryShort = React.createClass({
    render: function() {
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
});

var BlogEntryList = React.createClass({

    getInitialState: function() {
        return this._getState();
    },

    componentDidMount: function() {
        Actions.blogUpdate();
        BlogStore.addChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(this._getState());
    },

    _getState: function() {
        return {
            blogEntries: BlogStore.getBlogEntries()
        };
    },

    componentWillUnmount: function() {
        BlogStore.removeChangeListener(this._onChange);
    },

    render: function() {
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
});

ReactDOM.render(
    <Header/>, document.getElementById('header')
);
ReactDOM.render(
    <BlogEntryList/>, document.getElementById('blog')
);
