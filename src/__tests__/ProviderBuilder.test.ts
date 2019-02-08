import ProviderBuilder from "../ProviderBuilder";
import FactoryProviderBuilder from "../FactoryProviderBuilder";

jest.mock('../FactoryProviderBuilder');

describe('ProviderBuilder', () => {

  describe('when binding to interface', () => {
    const INTERFACE_NAME = 'AnInterface';
    interface AnInterface {};
    class BindedClass implements AnInterface {};
    
    let providerBuilder: ProviderBuilder<AnInterface>;

    beforeAll(() => {
      providerBuilder = ProviderBuilder.bind<AnInterface>(INTERFACE_NAME);
    });

    it('should provide the interface name', () => {
      const provider = providerBuilder.withClass(BindedClass);

      expect(provider.provide).toEqual(INTERFACE_NAME);
    });

    it('should provide the binded class', () => {
      const provider = providerBuilder.withClass(BindedClass);

      expect(provider.useClass).toEqual(BindedClass);
    });
  });

  describe('when binding to constant', () => {
    const A_STRING_CONSTANT = "Hello, world!";
    const CONSTANT_NAME = "HelloWorldConstant";
    let providerBuilder: ProviderBuilder<string>;

    beforeAll(() => {
      providerBuilder = ProviderBuilder.bind<string>(CONSTANT_NAME);
    });

    it('should provide the constant name', () => {
      const provider = providerBuilder.withConstant(A_STRING_CONSTANT);

      expect(provider.provide).toEqual(CONSTANT_NAME);
    });

    it('should provide given constant', () => {
      const provider = providerBuilder.withConstant(A_STRING_CONSTANT);

      expect(provider.useValue).toEqual(A_STRING_CONSTANT);
    });
  });

  describe('when binding to factory', () => {
    class AClass {};
    const FACTORY = () => new AClass();
    let providerBuilder: ProviderBuilder<AClass>;

    beforeAll(() => {
      providerBuilder = ProviderBuilder.bind<AClass>(AClass);
    });

    it('should provide the given class', () => {
      const provider = providerBuilder.withFactory(FACTORY);

      expect(provider.provide).toEqual(AClass);
    });

    it('should provide given factory', () => {
      const provider = providerBuilder.withFactory(FACTORY);

      expect(provider.useFactory).toEqual(FACTORY);
    });
  });

  describe('when binding to injectable factory', () => {
    class AClass {};
    let providerBuilder: ProviderBuilder<AClass>;
    const FACTORY = () => new AClass();

    beforeAll(() => {
      providerBuilder = ProviderBuilder.bind<AClass>(AClass);
    });

    it('should return factory provider builder with same provide and factory', () => {
      const factoryProviderBuilder = providerBuilder.withInjectableFactory(FACTORY);

      expect(FactoryProviderBuilder).toHaveBeenCalledWith(AClass, FACTORY);
    });
  });
});