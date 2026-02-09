import arcjet, {
  shield,
  tokenBucket,
} from "@arcjet/node";

import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,

  // log: {
  //   debug: (msg) => console.debug("[Arcjet]", msg),
  //   info: (msg) => console.info("[Arcjet]", msg),
  //   warn: (msg) => console.warn("[Arcjet]", msg),
  //   error: (msg) => console.error("[Arcjet]", msg),
  // },

  characteristics: ["ip.src"],

  rules: [
    shield({ mode: "LIVE" }),

    

    tokenBucket({
      mode: "LIVE",
      capacity: 10,
      interval: 10,
      refillRate: 10,
    }),
  ],
});

export default aj;
