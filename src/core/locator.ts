import DB from "./db";
import { ResiliencePolicy } from "./resilience.builder";
import Logger from "./logger";

type ServiceFactory<T> = (locator: typeof ServiceLocator) => T;

interface ServiceMap {
  db: ResiliencePolicy<DB>;
  logger: Logger;
}

/**
 * The service locator is who creates and provides the services
 * whoever needs them.
 */
export default class ServiceLocator {
  private static instances: Partial<ServiceMap> = {};
  private static factories: Map<keyof ServiceMap, ServiceFactory<any>> =
    new Map();

  /**
   * The register method can be used to setup an object by
   * passing a callback.
   *
   * For complex clases who has dependencies you can have access to this
   * services by the factory function. This function give you the locator
   * instance to access to other services.
   *
   * @param key the name of the service
   * @param factory function to create an object
   */
  static register<K extends keyof ServiceMap>(
    key: K,
    factory: ServiceFactory<ServiceMap[K]>,
  ) {
    this.factories.set(key, factory);
  }

  /**
   * Method to obtain a service wherever you want
   *
   * @param key name of the service.
   * @returns the instance of the service.
   * @throws a string message
   */
  static get<K extends keyof ServiceMap>(key: K): ServiceMap[K] {
    if (!this.instances[key]) {
      const factory = this.factories.get(key);
      if (!factory) {
        throw new Error(`No factory for ${key}`);
      }

      this.instances[key] = factory(this);
    }

    return this.instances[key] as ServiceMap[K];
  }
}
