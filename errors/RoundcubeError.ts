/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Types
import type { TRet } from "@types";

// RoundcubeError Class
class RoundcubeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "RoundcubeError";
    this.stack = (<TRet>new Error()).stack;
  }
}

export default RoundcubeError;