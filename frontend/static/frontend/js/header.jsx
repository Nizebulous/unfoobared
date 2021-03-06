/* jshint esversion: 6, node: true, browser: true */
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Colors = require('./colors');

var brandBarStyle = {
    padding: 10,
};

var brandTextStyle = {
    color: Colors.green,
    marginRight: 10,
};

var menuBarStyle = {
    padding: 10,
    marginTop: 10,
};

var menuItemStyle = {
    margin: 20,
    color: Colors.orange,
    textDecoration: 'none',
};

var menuItemJoinerStyle = {
    color: Colors.cream,
};

var headerStyle = {
    margin: '0 auto',
    marginBottom: 30,
    marginTop: 10,
    padding: 20,
    width: 800,
    backgroundColor: Colors.darkGrey,
    fontFamily: 'monospace',
    borderRadius: '.25em',
    boxShadow: '.1em .1em .5em rgba(0,0,0,.45)',
    color: Colors.white,
};

class MenuItem extends React.Component {
    render() {
        var link = this.props.link;
        var label = this.props.label;
        return <a style={menuItemStyle} href={link}><span>{label}</span></a>;
    }
}

class MenuBar extends React.Component {
    render() {
        var components = ['blog', 'projects', 'about me'];
        var links = ['/blog', '/projects', '/about'];
        var menuItems = [<span key='choice'>choice = </span>];
        for (var index = 0; index < components.length; index++) {
            menuItems.push(<MenuItem key={components[index]} label={components[index]} link={links[index]}/>);
            menuItems.push(<span key={components[index] + 'or'} style={menuItemJoinerStyle}> or </span>);
        }
        menuItems.pop();
        return (
            <div style={menuBarStyle}>
            {menuItems}
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
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
}

class Footer extends React.Component {
    render() {
        return (
            <div style={headerStyle}>
            <span style={brandTextStyle}># ©2016 Damian Hites.</span>
            </div>
       );
    }
}

ReactDOM.render(
    <Header/>, document.getElementById('header-mount')
);
ReactDOM.render(
    <Footer/>, document.getElementById('footer-mount')
);
