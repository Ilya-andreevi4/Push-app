
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://fcm.googleapis.com/v1/projects/test-e97df/messages:send').then(function(reg) {
    // регистрация сработала
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
};