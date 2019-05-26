import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AsyncLoader from '@components/AsyncLoader';
import AuthRoute from '@components/AuthRoute';
import { HttpBizError } from '@utils/catcher';

class RouteConfig extends Component {

  /**
   * 渲染路由
   * @param {*} data 
   */
  renderRoutes(data) {
    return data.map(item => {
      const {
        path,
        name,
        isAuth,
        redirect,
        component,
        children,
      } = item;

      if (children && children.length > 0) {
        const Component = AsyncLoader(component);

        return (
          <Component key={ `${name}-layout` }>
            <Switch>
              {this.renderRoutes(children)}
            </Switch>
          </Component>
        );
      } else {
        if (redirect) {
          if (isAuth) {
            return (
              <AuthRoute
                exact
                key={ name }
                path={ path }
                render={ () => <Redirect to={ redirect } /> }
              />
            );
          } else {
            return (
              <Route
                exact
                key={ name }
                path={ path }
                render={ () => <Redirect to={ redirect } /> }
              />
            );
          }
        } else {
          if (isAuth) {
            return (
              <AuthRoute
                exact
                key={ name }
                path={ path }
                component={ AsyncLoader(component) }
              />
            );
          } else {
            return (
              <Route
                exact
                key={ name }
                path={ path }
                component={ AsyncLoader(component) }
              />
            );
          }
        }
      }
    });
  }

  render() {
    const { data } = this.props;

    if (!data || data.length <= 0) throw new HttpBizError('路由信息错误，请检查路由配置');

    return (
      <Switch>
        {this.renderRoutes(data)}
      </Switch>
    );
  }
};

export default RouteConfig;
