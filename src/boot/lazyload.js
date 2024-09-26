import { boot } from 'quasar/wrappers';
import VueLazyload from 'vue-lazyload';

export default boot(({ app }) => {
  app.use(VueLazyload);
  // app.use(VueLazyload, {
  //   preLoad: 1.3,
  //   error: 'path/to/error.png',
  //   loading: 'path/to/loading.gif',
  //   attempt: 1,
  // });
});
