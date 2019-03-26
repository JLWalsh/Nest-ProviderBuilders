import {bind, bindClass} from "../index";
import {Provider} from "@nestjs/common";

describe('BindClass', () => {
   it('should create class provider', () => {
      class BindedClass {}
      const expectedProvider: Provider = {
         useClass: BindedClass,
         provide: BindedClass,
      };

      const provider = bindClass(BindedClass);

      expect(provider).toEqual(expectedProvider);
   });
});
