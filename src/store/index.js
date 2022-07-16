import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index.js';
import requestsModule from './modules/requests/index.js';
import authModule from './modules/auth/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule, //Identifier: (points to) Module
    requests: requestsModule,
    auth: authModule, //authModule nije namespaced jer se u prethodno pisanom kodu userId koristio kao global state i sad bi trebalo, a želi se to izbjeći, prepravljati na svim mjestima gdje je korišten
  }
});

export default store;
