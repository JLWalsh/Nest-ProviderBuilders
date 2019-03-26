import {StructureTypedProvidable} from "./ProviderBuilder";
import {bind} from "./index";

export const bindClass = <T>(providable: StructureTypedProvidable<T>) => {
    return bind<T>(providable).withClass(providable);
};
