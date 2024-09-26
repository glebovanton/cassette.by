import { route } from 'quasar/wrappers';
import {
  createRouter, createMemoryHistory, createWebHistory, createWebHashHistory,
} from 'vue-router';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    }

    Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
      .map((el) => el.parentNode.removeChild(el));

    if (!nearestWithMeta) {
      return next(); // Ensures next() is always called in every execution path
    }

    nearestWithMeta.meta.metaTags
      .map((tagDef) => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach((key) => tag.setAttribute(key, tagDef[key]));
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
      })
      .forEach((tag) => document.head.appendChild(tag));

    return next(); // This guarantees next() is returned
  });

  return Router;
});
