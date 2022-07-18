//authModule nije namespaced jer se u prethodno pisanom kodu userId koristio kao global state i sad bi trebalo,
//a to se želi izbjeći, prepravljati na svim mjestima gdje je korišten

import mutations from "./mutations.js";
import actions from "./actions.js";
import getters from "./getters.js";

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false
    };
  },
  
  mutations,
  actions,
  getters
};