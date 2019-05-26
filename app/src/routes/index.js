const baseRoutes = [
  {
    path: '/',
    name: 'root',
    isAuth: false,
    redirect: '/app',
  },
  {
    path: '/login',
    name: 'login',
    isAuth: false,
    component: () => import('@pages/Login'),
  },
  {
    path: '/app',
    name: 'app',
    component: () => import('@pages/App/Index'),
    children: [
      // {
      //   path: '/app',
      //   name: 'abstract',
      //   isAuth: true,
      //   redirect: '/app/home',
      // },
      {
        path: '/app/home',
        name: 'home',
        isAuth: true,
        component: () => import('@pages/App/Home'),
      }
    ]
  },
];

const routes = baseRoutes.concat([]);

export { baseRoutes };
export default routes;
