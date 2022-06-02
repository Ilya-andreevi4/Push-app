
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://fcm.googleapis.com/v1/projects/48994195765/messages:send').then(function(reg) {
    // регистрация сработала
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
};