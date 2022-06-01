
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://firebase-adminsdk-7wgxi@test-e97df.iam.gserviceaccount.com').then(function(reg) {
    // регистрация сработала
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // регистрация прошла неудачно
    console.log('Registration failed with ' + error);
  });
};