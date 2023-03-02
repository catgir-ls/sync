/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Errors
import { CloudflareError } from "@errors";

// Constants
const BASE_URL = "https://api.cloudflare.com/client/v4";

// Types
import type { TPartialCloudflareZone } from "@types";

// Cloudflare Class
class Cloudflare {
  private readonly headers: Record<string, string>;

  constructor(api_key: string) {
    this.headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_key}`
    }
  }

  private get = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: this.headers
    });

    if(!response.ok)
      throw new CloudflareError(`${response.status} - ${response.statusText}`);

    return response.json();
  }

  public getDomains = async (): Promise<string[]> =>
    (await this.get<TPartialCloudflareZone[]>("zones"))
      .result.map((result: TPartialCloudflareZone) => result.name);
}

export default Cloudflare;