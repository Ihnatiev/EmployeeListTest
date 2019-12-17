angular.module('app')
  .factory('authService', function ($http, $window, $location) {
    return {
      loginUser: function (user) {
        $http.post("https://localhost:6969/api/auth/login", user)
          .then(function (response, error) {
            var token = response.data.token;
            if (token) {
              const expiresInDuration = response.data.expiresIn;
              const now = new Date();
              const expirationDate = new Date(
                now.getTime() + expiresInDuration * 1000
              );
              isAuthenticated = true;
              userId = response.data.userId;
              userName = response.data.userName;
              $window.localStorage.setItem('token', 'Basic ' + token);
              $window.localStorage.setItem('userId', userId);
              $window.localStorage.setItem('userName', response.data.userName);
              $window.localStorage.setItem('expiration', expirationDate.toISOString());
            } else {
              console.log(error.data.message);
            }
          });
      },
      getToken: function () {
        return token;
      },

      getIsAuth: function () {
        return this.isAuthenticated;
      },

      getUserId: function () {
        return userId;
      },

      getUserName: function () {
        return userName;
      },
      autoAuthUser: function () {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
          token = authInformation.token;
          isAuthenticated = true;
          userId = stringify(authInformation.userId);
          userName = stringify(authInformation.userName);
        }
      },

      logout: function () {
        token = '';
        userId = '';
        userName = '';
        isAuthenticated = false;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        $location.path('/');
      },

      setAuthTimer: function (duration) {
        tokenTimer = setTimeout(() => {
          this.logout();
        }, duration * 1000);
      },

      getAuthData: function () {
        const token = $window.localStorage.getItem('Basic ' + 'token');
        const expirationDate = $window.localStorage.getItem('expiration');
        const userId = $window.localStorage.getItem('userId');
        const userName = $window.localStorage.getItem('userName');
        if (!token || !expirationDate) {
          return;
        }
        return {
          token,
          expirationDate: new Date(expirationDate),
          userId,
          userName
        };
      },

      clearAuthData: function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('expiration');
        $window.localStorage.removeItem('userId');
        $window.localStorage.removeItem('userName');
      }
    }
  });

