export default {
  addRequest(state, payload) {
    state.requests.push(payload);
    console.log(state.requests)
  },
  setRequests(state, payload) {
    state.requests = payload;
  }
}