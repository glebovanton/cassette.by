const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('pages/IndexPage.vue'),
    meta: {
      title: 'Cassette',
      titleTemplate: (title) => `Музыкальная студия в Минске - ${title}`,
      meta: {
        description: {
          name: 'description',
          content: (title) => `${title} - Музыкальная студия в Минске. +375 29 177-70-85`,
        },
        keywords: {
          name: 'keywords',
          content: 'Студия Кассета в Минске, научиться петь, научиться играть',
        },
        equiv: {
          'http-equiv': 'Content-Type',
          content: 'text/html; charset=UTF-8',
        },
      },
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('pages/StudentsPage.vue'),
    meta: {
      title: 'Учаники студии Cassette',
      metaTags: [
        {
          name: 'description',
          content: 'Такие разные, по-своему уникальные и успешные ученики Cassette studio',
        },
        {
          name: 'keywords',
          content: 'Cassette студия',
        },
      ],
    },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('pages/FeedbackPage.vue'),
    meta: {
      title: 'Отызывы о студии Cassette',
      metaTags: [
        {
          name: 'description',
          content: 'Cassette - Музыкальная студия в Минске. +375 29 177-70-85',
        },
        {
          name: 'keywords',
          content: 'Музыкальная студия в Минске, научиться петь, научиться играть, запись вокала',
        },
      ],
    },
  },
  {
    path: '/temp',
    name: 'temp',
    component: () => import('pages/TempPage.vue'),
    meta: {
      title: 'Временная страница Cassette',
      metaTags: [
        {
          name: 'description',
          content: 'Временная страница Cassette',
        },
        {
          name: 'keywords',
          content: 'Cassette студия',
        },
      ],
      equiv: {
        'http-equiv': 'Content-Type',
        content: 'text/html; charset=UTF-8',
      },
      author: { name: 'author', content: 'Anton Glebov' },
    },
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
