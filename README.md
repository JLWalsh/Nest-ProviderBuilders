## NestJS Provider Builders
A library that facilitates declaring providers for [NestJS](https://nestjs.com/). 
```bash
npm install nest-provider-builders
```
or
```bash
yarn add nest-provider-builders
```

## Before, you had to
Create providers manually, like so:
```typescript
  @Module({
    providers: [
      {
        provide: 'AnInterface',
        useClass: AnImplementedInterface
      }
    ]
  })
```

### But now, with provider builders:
```typescript
  @Module({
    providers: [
      bind<AnInterface>('AnInterface').withClass(AnImplementedInterface),
    ]
  })
```

## Why was this made?
- To add type safety for declaring providers. The typings of the provider object do not ensure that the value provided will be of the same type as the provide key. This is why you must specify a type when using `bind<T>`, as it will ensure that the binded value is of the same type.
- To provide (pun intended) better readability. Declaring providers takes a lot of space, so a module with many providers will be uselessly big. By using this library, most providers will be one liners that can be read like a sentence.

## Binding to a...

### Value / Constant
```typescript
  @Module({
    providers: [
      bind<string>('WelcomeMessage').withConstant('Welcome to the world of dependency injection!'),
    ]
  })
```

### Class (using `bindClass`)
```typescript
  class AClass {};

  @Module({
    providers: [
        bindClass(AClass),
    ]
  })
```
#### Class (using `bind`) 
```typescript
  class AClass {};

  @Module({
    providers: [
      bind<AClass>(AClass).withClass(AClass),
    ]
  })
```

### Factory
```typescript
  class AClass {};

  const aClassFactory = () => new AClass();

  @Module({
    providers: [
      bind<AClass>(AClass).withFactory(aClassFactory),
    ]
  })
```

### Factory with injectable dependencies
```typescript
  class DBConnexion { constructor(public readonly connexionString: string) };

  interface Configuration {
    username: string,
    password: string,
  }

  const connexionFactory = (config: Configuration) => new DBConnexion(`${config.username}:${config.password}`);

  @Module({
    providers: [
      bind<Configuration>('Configuration').withConstant({
        username: 'username!',
        password: 'passw0rd!'
      }),
      bind<DBConnexion>(DBConnexion).withInjectableFactory(aClassFactory)
                                    .inject('Configuration'),
                                    .build()
    ]
  })
```
