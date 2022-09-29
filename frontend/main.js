import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Contacts from './modules/Contacts';

const login = new Login('.form-login');
const register = new Login('.form-register');
login.init();
register.init();

const contacts = new Contacts('.form-contacts');
contacts.init();

// import './assets/css/style.css';
