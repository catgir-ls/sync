/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Errors
import { RoundcubeError } from "@errors";

// Types
import type { TRet, TRoundcubeUsers, TPartialRoundcubeUser } from "@types";

// Roundcube Class
class Roundcube {
  private readonly base_url: string;
  private readonly headers: Record<string, string>;

  constructor(base_url: string, username: string, password: string) {
    this.base_url = base_url;
  
    this.headers = {
      "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    }
  }

  private get = async <T>(
    endpoint: string,
    query?: Record<string, string> = { },
  ): Promise<T> => {
    const response = await fetch(`${this.base_url}/${endpoint}?${new URLSearchParams(query).toString()}`, {
      headers: this.headers
    });

    if(!response.ok)
      throw new RoundcubeError(`${response.status} - ${response.statusText}`);

    return response.json();
  }

  private post = async <T>(
    endpoint: string,
    body: Record<string, string>,
    query?: Record<string, string> = { },
  ): Promise<T> => {
    const response = await fetch(`${this.base_url}/${endpoint}?${new URLSearchParams(query).toString()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...this.headers
      },
      body: new URLSearchParams(body).toString()
    });

    if(!response.ok)
      throw new RoundcubeError(`${response.status} - ${response.statusText}`);

    return response.text();
  }

  public getUsers = async (domain: string): Promise<TRoundcubeUsers[]> =>
    (await this.get<TRoundcubeUsers[]>("/mail/users", { format: "json" }))
      .filter((item: TRoundcubeUsers) => item.domain === domain)
      .map((item: TRoundcubeUsers) => item.users.map((user: TPartialRoundcubeUser) => user.email))
      .flat();

  public addAlias = async (username: string, alias: string): Promise<boolean> => {
    try {
      await this.post<TRet>("/mail/aliases/add", {
        update_if_exists: 0,
        address: alias,
        forwards_to: username,
        permitted_senders: ""
      });

      return true;
    } catch {
      return false;
    }
  }

  public addAliases = async (username: string, domains: string[]): Promise<Record<string, boolean>> => {
    const results = await Promise.all(domains.map(async domain => ({
      [ domain ]: await this.addAlias(username, `${username.split("@")[0]}@${domain}`)
    })));

    return Object.assign({ }, ...results);
  }
}

export default Roundcube;