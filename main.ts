/**
 * @author e991f665b7e62df5a54fdef19053a4e75117b89 <c@raci.sm>
 */

// Dependencies 
import {
  Cloudflare as CloudflareHelper,
  Roundcube as RoundcubeHelper
} from "@lib";

// Utils
import { Logger, Config } from "@utils";

// Config
await Config.load("config.toml");
Logger.log(`Loaded ${Object.keys(Config.get()).length} item(s) into the config!`);

const Cloudflare = new CloudflareHelper(Config.get("cloudflare", "api_key"));
const Roundcube = new RoundcubeHelper(
  Config.get("roundcube", "base_url"),
  Config.get("roundcube", "username"),
  Config.get("roundcube", "password")
);

const main = async () => {
  /* This can be used to ignore the admin account */
  const ignored = Config.get("roundcube", "blacklisted");

  try {
    /* Some domains may not be added to the Cloudflare account - we can define this in the config */
    const [ domains, users ] = await Promise.all([
      [ ...await Cloudflare.getDomains(), ...Config.get("variables", "domains") ],
      await Roundcube.getUsers(Config.get("variables", "domain"))
    ]);

    Logger.log(`Synchronising ${domains.length} domains across ${users.length} users!`);

    for(const user of users) {
      const [ username ] = user.split("@");

      if(ignored.indexOf(username) !== -1) {
        Logger.warn(`${user} is being ignored`);

        continue;
      }

      const aliases = await Roundcube.addAliases(user, domains);
      const _aliases = Object.keys(aliases).filter((item: string) => aliases[item]);

      if(_aliases.length === 0) {
        Logger.log(`${user} is already synchronised`);
        
        continue;
      }

      Logger.log(`${user} has been added to the following domains: ${_aliases.join(", ")}`);
    }
  } catch(e) {
    Logger.error(e.toString());
  }
}

main();