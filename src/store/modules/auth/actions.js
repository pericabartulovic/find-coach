let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {  //obavezno return da vrati promise
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {  //obavezno return da vrati promise
      ...payload,
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCU41xv7Kh7Ehxr_JyzzOpUFfXn4rL2YuE';
    
    if (mode === 'signup') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCU41xv7Kh7Ehxr_JyzzOpUFfXn4rL2YuE'
    }
    
    const response = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        }),
      });
      
    const resposeData = await response.json();
    if(!response.ok) {
      const errror = new Error(resposeData.message || 'Failed to authenticate. Check your login data.');
      throw errror;
    }
    
    const expiresIn = +resposeData.expiresIn * 1000;
    // const expiresIn = 5000;  // 5 sekundi u svrhu testiranja samo
    const expirationDate = new Date().getTime() + expiresIn;
    
    localStorage.setItem('token', resposeData.idToken);
    localStorage.setItem('userId', resposeData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);
    
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn)
    
    context.commit('setUser', {
      token : resposeData.idToken,
      userId: resposeData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    
    const expiresIn = +tokenExpiration - new Date().getTime();   //razlika u milisekundama između budućeg vremena kad token istječe i trenutnog vremena.
    
    if (expiresIn < 0) {
      return;
    }
    
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);
    
    if(token && userId) {
      context.commit('setUser', {
        token,
        userId
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    
    clearTimeout(timer);
    
    context.commit('setUser', {
      userId: null,
      token: null,
    })
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};