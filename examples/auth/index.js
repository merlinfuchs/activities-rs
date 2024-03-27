import { start } from "./pkg";

start();
/*import { DiscordSDK } from "@discord/embedded-app-sdk";
import * as exports from "./pkg";

(() => {
  async function create(clientId) {
    window.activity.instance = new DiscordSDK(clientId);

    for (const [key, callable] of Object.entries(exports)) {
      if (!key.startsWith("on_")) continue;

      const eventName = key.substring(3).toUpperCase();
      if (eventName === "READY") {
        console.log(`Subscribing to ${eventName}`);
        await window.activity.instance.subscribe(eventName, callable);
      } else {
        setTimeout(async () => {
          console.log(`Subscribing to ${eventName}`);
          await window.activity.instance.subscribe(eventName, callable);
        }, 5000);
      }
    }
  }

  window.activity = {
    instance: null,
    create,
  };

  exports.init();
})();*/
