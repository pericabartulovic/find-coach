export default {
  login() {},
  async signup(context, payload) {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCU41xv7Kh7Ehxr_JyzzOpUFfXn4rL2YuE', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      }),
    });
    
    const resposeData = await response.json();
    if(!response.ok) {
      console.log(resposeData);
      const errror = new Error(resposeData.message || 'Failed to authenticate. Check your login data.');
      throw errror;
    }
    context.commit('setUser', {
      token : resposeData.idToken,
      userId: resposeData.localId,
      tokenExpiration: resposeData.expiresIn
    })
  }
  
};