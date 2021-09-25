export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/device-manager',
    name: 'device.manager',
    icon: 'smile',
    component: './device-manager/',
  },
  {
    path: '/user-management',
    name: 'user.management',
    icon: 'smile',
    component: './user-management/',
  },
  {
    path: '/user-management/create',
    component: './user-management/UserManagementForm',
  },
  {
    path: '/user-management/edit/:id',
    component: './user-management/UserManagementForm',
  },
  {
    path: '/',
    redirect: '/device-manager',
  },
  {
    component: './404',
  },
];
