const LoginPage = require('../pageobjects/login.page');
const { expect } = require('chai');
const users = require('../data/userslogin.json');
const navigatePage = require('../pageobjects/navigate.page');

describe('Teste de Login com Usuário Válido', () => {
  const validUser = users.find(user => user.validuser && user.validpassword); 

  beforeEach(async () => {
    await navigatePage.verifyWebview();
  });

  it(`Deve realizar login com o usuário válido ${validUser.validuser}`, async () => {
    await LoginPage.login(validUser.validuser, validUser.validpassword);
  });
});

describe('Teste de Login com Usuário Inválido', () => {
  const invalidUser = users.find(user => user.invaliduser && user.invalidpassword); 

  it(`Não deve realizar login com o usuário inválido ${invalidUser.invaliduser}`, async () => {
    const emailError = await LoginPage.getEmailErrorMessage(invalidUser.invaliduser, invalidUser.invalidpassword);
    expect(emailError).to.include('valid email');  

    const passwordError = await LoginPage.getPasswordErrorMessage(invalidUser.invaliduser, invalidUser.invalidpassword);
    expect(passwordError).to.include('at least 8 characters');  
  });
});

describe('Teste de Cadastro com Usuário Válido', () => {
  const validUser = users.find(user => user.validuser && user.validpassword); // Usando o mesmo validUser do login

  it(`Deve realizar cadastro com o usuário válido ${validUser.validuser}`, async () => {
    await LoginPage.signup(validUser.validuser, validUser.validpassword);
  });
});

describe('Teste de Cadastro com Usuário Inválido', () => {
  const invalidUser = users.find(user => user.invaliduser && user.invalidpassword); // Usando o mesmo invalidUser do login

  it(`Não deve realizar cadastro com o usuário inválido ${invalidUser.invaliduser}`, async () => {
    const emailError = await LoginPage.getEmailErrorMessageSignup(invalidUser.invaliduser, invalidUser.invalidpassword);
    expect(emailError).to.include('valid email');  

    const passwordError = await LoginPage.getPasswordErrorMessageSignup(invalidUser.invaliduser, invalidUser.invalidpassword);
    expect(passwordError).to.include('at least 8 characters');  

    const repeatPasswordError = await LoginPage.getRepeatPasswordErrorMessageSignup(invalidUser.invaliduser, invalidUser.invalidpassword);
    expect(repeatPasswordError).to.include('Please enter the same password');  
  });
});
