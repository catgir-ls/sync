/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// CloudflareError Class
class CloudflareError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "CloudflareError";
    this.stack = (<any>new Error()).stack;
  }
}

export default CloudflareError;