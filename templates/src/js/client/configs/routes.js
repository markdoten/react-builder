var translate = require('../translate');

module.exports = {
  home: {
    name: 'home',
    path: '/',
    method: 'get',
    page: 'Home',
    label: translate.t('nav_home'),
    action: function (context, payload) {}
  }
};
