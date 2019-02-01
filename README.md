## NestJS Provider Builders
An object-oriented way of creating providers for NestJS.
```bash
npm install nest-provider-builders
```
or
```bash
yarn add nest-provider-builders
```

### Before, you had to:
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

## Binding to a...

### Value / Constant
```typescript
  @Module({
    providers: [
      bind<string>('WelcomeMessage').withConstant('Welcome to the world of dependency injection!'),
    ]
  })
```

### Class
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

### Factory with injectors
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
