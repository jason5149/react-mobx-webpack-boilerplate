import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable, action } from 'mobx';
import { Layout, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleToggle = this.handleToggle.bind(this);
  }

  @observable
  collapsed = false;

  @action
  handleToggle() {
    this.collapsed = !this.collapsed;
  }

  renderSider() {
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.collapsed}
      >
        <div className='logo' />  
      </Sider>
    );
  }

  renderHeader() {
    return (
      <Header
        style={{ background: '#fff', padding: 0 }}
      >
        <Icon
          className='trigger'
          type={this.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.handleToggle}
        />
      </Header>
    );
  }

  renderContent() {
    const { children } = this.props;

    return (
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        {children}
      </Content>
    );
  }

  render() {
    return (
      <Layout className='flex-h'>
        {this.renderSider()}
        <Layout>
          {this.renderHeader()}
          {this.renderContent()}
        </Layout>
      </Layout>
    );
  }
};

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
