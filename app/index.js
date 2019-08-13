//globals: $, jQuery and Tether, see config

import 'bootstrap';

import 'js/main'
import 'js/app'

// adds all custom Bootstrap jQuery plugins
// see all plugins here: http://getbootstrap.com/javascript/

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');
  if ($('btn')) {
    console.log('jQuery works')
  }
});