const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  env: {
    NEAR_NO_LOGS: "true",
    MANUAL_BALANCE_TOP_UP_GUIDE_URL: "https://stackoverflow.com/a/71869002",
    GITHUB_URL: "https://github.com/dwnste/near-printer",
    EXPLORER_TX_ID_URL: "https://testnet.nearblocks.io/txns",
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
