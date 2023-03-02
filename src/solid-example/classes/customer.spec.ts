import { IndividualCustomer, EnterpriseCustumer } from './customer';

const createIndividualCustomer = (
  name: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(name, lastName, cpf);
};

const createEnterpriseCustomer = (
  name: string,
  cnpj: string,
): EnterpriseCustumer => {
  return new EnterpriseCustumer(name, cnpj);
};

describe('Individual customer', () => {
  afterEach(() => jest.clearAllMocks());
  const fakeIndividual = {
    name: 'Gabriel',
    lastName: 'Da Silva',
    cpf: '12345678910',
  };
  const individualSUT = createIndividualCustomer(
    fakeIndividual.name,
    fakeIndividual.lastName,
    fakeIndividual.cpf,
  );
  it('should have name, lastname and cpf', () => {
    expect(individualSUT).toHaveProperty('firstName', fakeIndividual.name);
    expect(individualSUT).toHaveProperty('lastName', fakeIndividual.lastName);
    expect(individualSUT).toHaveProperty('cpf', fakeIndividual.cpf);
  });

  it('get name returns name', () => {
    expect(individualSUT.getName()).toBe(
      fakeIndividual.name + ' ' + fakeIndividual.lastName,
    );
    expect(individualSUT.getIDN()).toBe(fakeIndividual.cpf);
  });
});

describe('Enterprise customer', () => {
  afterEach(() => jest.clearAllMocks());
  const fakeEnterprise = {
    name: 'Empresa Grande',
    cnpj: '123465789',
  };
  const enterpriseSUT = createEnterpriseCustomer(
    fakeEnterprise.name,
    fakeEnterprise.cnpj,
  );

  it('should return fakeEnterprise properties name and cnpj', () => {
    expect(fakeEnterprise).toHaveProperty('name', fakeEnterprise.name);
    expect(fakeEnterprise).toHaveProperty('cnpj', fakeEnterprise.cnpj);
  });

  it('get methods should return name and cnpj', () => {
    expect(enterpriseSUT.getName()).toBe(fakeEnterprise.name);
    expect(enterpriseSUT.getIDN()).toBe(fakeEnterprise.cnpj);
  });
});
