import { Provider, Type } from "@nestjs/common";
import { ValueProvider, ClassProvider, FactoryProvider } from "@nestjs/common/interfaces";
import FactoryProviderBuilder, { ProviderFactory } from "./FactoryProviderBuilder";

export type Provideable<T> = T | string;
export default class ProviderBuilder<T> {

  protected constructor(protected readonly provide: Provideable<T>) {}

  public static bind<T>(provide: Provideable<T>):ProviderBuilder<T> {
    return new ProviderBuilder(provide);
  }

  public withClass(bindedClass: Type<T>) {
    return {
      provide: this.provide,
      useClass: bindedClass
    };
  }

  public withConstant(value: T) {
    return {
      provide: this.provide,
      useValue: value,
    };
  }

  public withFactory(factory: ProviderFactory<T>): FactoryProvider {
    return {
      provide: this.provide,
      useFactory: factory
    };
  }
  
  public withInjectableFactory(factory: ProviderFactory<T>): FactoryProviderBuilder<T> {
    return new FactoryProviderBuilder(this.provide, factory);
  }
}