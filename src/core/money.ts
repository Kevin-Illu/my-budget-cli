/**
 * Class to manipulate integers as money
 * without float point errors.
 */
export class Money {
  private readonly cents: number;

  private constructor(cents: number) {
    this.cents = Math.round(cents);
  }

  /**
   * Is used to normalize the decimals from the input user
   * and perform math operations.
   *
   * @param amount number | string
   * @returns Money
   */
  static fromDecimal(amount: number | string): Money {
    const parsed = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(parsed)) return new Money(0);
    return new Money(parsed * 100);
  }

  /**
   * Create an instance of Money from a DB
   * integer.
   *
   * @param cents number
   * @returns Money
   */
  static fromCents(cents: number): Money {
    return new Money(cents || 0);
  }

  add(other: Money): Money {
    return new Money(this.cents + other.cents);
  }

  subtract(other: Money): Money {
    return new Money(this.cents - other.cents);
  }

  /**
   * Returns the cents ready to be saved
   * @returns number
   */
  get toDb(): number {
    return this.cents;
  }

  /**
   * Create a string that represents the current
   * integer but in a formated way to show in the UI
   *
   * @param locale string
   * @param currency string
   * @returns string
   */
  format(locale: string = "es-GT", currency: string = "GTQ"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(this.cents / 100);
  }
}
