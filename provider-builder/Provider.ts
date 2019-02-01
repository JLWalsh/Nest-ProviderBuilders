import { Provider, Type } from "@nestjs/common";
import { ValueProvider, ClassProvider, FactoryProvider } from "@nestjs/common/interfaces";

interface GenericProviderBuilder<T> {
  build: () => T;
}

export default class ProviderBuilder<T> {

  private constructor(private readonly provide: T | string) {}

  public static bind<T>(provide: T | string):ProviderBuilder<T> {
    return new ProviderBuilder(provide);
  }

  public toClass(bindedClass: Type<T>): GenericProviderBuilder<ClassProvider> {
    return {
      build: () => ({
          provide: this.provide,
          useClass: bindedClass
      })
    };
  }

  public toValue(value: T): GenericProviderBuilder<ValueProvider> {
    return {
      build: () => ({
          provide: this.provide,
          useValue: value,
      })
    };
  }

  public toFactory(factory: (...args: any[]) => T): FactoryProviderBuilder<T> {
    return new FactoryProviderBuilder(this.provide, factory);
  }
}

type Factory<T> = (...args: any[]) => T;
type Injection = Type<any> | string | any;

class FactoryProviderBuilder<T> implements GenericProviderBuilder<FactoryProvider> {

  private injections: Injection[] = [];

  public constructor(private readonly provide: T | string, private readonly factory: Factory<T>) {};

  public inject(injection: Injection):FactoryProviderBuilder<T> {
    this.injections.push(injection);

    return this;
  }

  public build():FactoryProvider {
    return {
      provide: this.provide,
      useFactory: this.factory,
      inject: this.injections,
    };
  }
}

