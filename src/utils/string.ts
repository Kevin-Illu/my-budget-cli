export module StringModule {
  /**
   * Used to format a JSON into a formatted string
   * @param value your JSON prettifyed
   * @returns string
   */
  export function prettifyJSON(value: { [key: string]: any }) {
    return JSON.stringify(value, null, 2) + "\n";
  }
}
