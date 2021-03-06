import { FactoryProvider, Type } from "@nestjs/common/interfaces";
import { Providable } from "./ProviderBuilder";

export type ProviderFactory<T> = (...args: any[]) => T | Promise<T>;
type Injection = Type<any> | string | any;

export default class FactoryProviderBuilder<T> {

  private injections: Injection[] = [];

  public constructor(private readonly provide: Providable<T>, private readonly factory: ProviderFactory<T>) {}

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
