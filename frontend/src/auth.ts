export function authenticate(token: string) {
  console.log("authenticate");
  localStorage.setItem("token", token);
  window.location.replace("/");
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getToken() {
  return localStorage.getItem("token");
}

export function logout() {
  console.log("logout");
  localStorage.removeItem("token");
  window.location.replace("/");
}

export function generateAndSaveRandomState() {
  const state = generateRandomString();
  localStorage.setItem("login_state", state);
  return state;
}

export function isRandomStateEqualTo(state: string) {
  return state === localStorage.getItem("login_state");
}

function generateRandomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}
