import FactoryProviderBuilder from "../FactoryProviderBuilder";

describe('FactoryProviderBuilder', () => {
    class ProvidedClass {};
    class InjectedClass {};

    it('should create provider with given injections', () => {
      const expectedInjectedInterface = 'ISuperInterface';
      const expectedInjectedClass = InjectedClass; 
      const factory = new FactoryProviderBuilder(ProvidedClass, () => new ProvidedClass());

      const provider = factory.inject(expectedInjectedInterface)
                              .inject(expectedInjectedClass)
                              .build();

      expect(provider.inject).toContainEqual(expectedInjectedInterface);
      expect(provider.inject).toContainEqual(expectedInjectedClass);
    });

    it('should create provider with given factory', () => {
      const expectedFactoryMethod = () => new ProvidedClass();
      const factory = new FactoryProviderBuilder(ProvidedClass, expectedFactoryMethod);

      const provider = factory.build();

      expect(provider.useFactory).toEqual(expectedFactoryMethod);
    });

    it('should provide the given provide', () => {
      const expectedProvide = ProvidedClass;
      const factory = new FactoryProviderBuilder(expectedProvide, () => new ProvidedClass());

      const provider = factory.build();

      expect(provider.provide).toEqual(expectedProvide);
    });
});