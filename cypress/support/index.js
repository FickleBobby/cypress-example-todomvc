// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your other test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/guides/configuration#section-global
// ***********************************************************

// Import commands.js and defaults.js
// using ES2015 syntax:
// import "./commands"
// import "./defaults"

// Alternatively you can use CommonJS syntax:
require('./commands');
require('cypress-axe');

import addContext from 'mochawesome/addContext';

Cypress.on('test:after:run', (test, runnable) => {
	let videoName = Cypress.spec.name;
	videoName = videoName.replace('/.js.*', '.js');
	const videoUrl = 'videos/' + videoName + '.mp4';

	addContext({ test }, videoUrl);
});

beforeEach(() => {
	cy.visit('./');
	if (cy.get('button#rcc-confirm-button')) {
		cy.get('button#rcc-confirm-button').click();
	}
	if (cy.get('input[name=username]')) {
		cy.get('input[name=username]').type(Cypress.env('username'));
		cy.get('input[name=password]').type(
			`${Cypress.env('password')}{enter}`,
			{
				log: false,
			}
		);
	}
});
