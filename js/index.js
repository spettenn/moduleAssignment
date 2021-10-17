import {
	testLengthofTextBoxValue,
	testUsername,
	testEmailAddress,
} from './libs/validate.js';

import alert from './libs/alert.js';

import { saveToLocalStorage } from './libs/localStorage.js';

let form = document.querySelector('.form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let username = document.querySelector('#username');

form.onsubmit = async function (event) {
	event.preventDefault();

	if (
		testLengthofTextBoxValue(password.value, 1) &&
		testEmailAddress(email.value) &&
		testUsername(username.value)
	) {
		try {
			const { data } = await axios.post(
				'http://localhost:1337/auth/local',

				{
					identifier: email.value,
					password: password.value,
					username: username.value,
				}
			);
			saveToLocalStorage('jwt', data.jwt);
			saveToLocalStorage('user', data.user);
			window.location.href = './anotherPage.html';
		} catch (error) {
			alert('alert-danger', 'Your credentials were incorrect');
		}
	} else {
		alert('alert-danger', 'Please enter proper values for the inputs');
	}
};
