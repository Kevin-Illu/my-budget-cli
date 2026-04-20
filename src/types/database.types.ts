import DB from "../core/db";
import { ResiliencePolicy } from "../core/resilience.builder";

/**
 * Database type with resilience policy
 */
export type TDatabase = ResiliencePolicy<DB>;
