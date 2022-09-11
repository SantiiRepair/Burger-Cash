# Welcome to Burger Cash

![](https://github.com/SantiiRepair/Burger-Cash/blob/main/logo.png)

All the code in these repos was created and explained by Burguer Cash on the main GitHub.

To find out more please visit:

[💬 Telegram](https://t.me/burgercash)

[🐦 Twitter](https://twitter.com/burguercash)

[ℹ️ Website](https://burguercash.com)

# Burger Cash | Mine BNB 🔥

![](https://github.com/SantiiRepair/Burguer-Cash/blob/main/banner.PNG)

This repo provides a nice and easy way for linking an existing smart contract to this minting dapp. There are two ways of using this repo, you can go the simple route or the more complex one.

The simple route is so simple, all you need to do is download the build folder on the release page and change the configuration to fit your needs.

The more complex route allows you to add additional functionality if you are comfortable with coding in react.js. (Follow the below instructions for a walk through).

## Installation 🛠️

If you are cloning the project then run this first, otherwise you can download the source code on the release page and skip this step.

```sh
git clone https://github.com/SantiiRepair/Burguer-Cash.git
```

Make sure you have node.js installed so you can use npm, then run:

```sh
npm install
```

## Usage ℹ️

In order to make use of this dapp, all you need to do is change the configurations to point to your smart contract as well as update the images and theme file.

For the most part all the changes will be in the `public` folder.

To link up your existing smart contract, go to the `public/config/config.json` file and update the following fields to fit your smart contract, network and marketplace details. The cost field should be in wei.

Note: this dapp is designed to work with the intended mine smart contract, that only takes one parameter in the mint function "mintAmount". But you can change that in the App.js file if you need to use a smart contract that takes 2 params.

```json
{
  "CONTRACT_ADDRESS": "0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
  "SCAN_LINK": "https://polygonscan.com/token/0x827acb09a2dc20e39c9aad7f7190d9bc53534192",
  "NETWORK": {
    "NAME": "Binance Smart Chain Testnet",
    "SYMBOL": "TBNB",
    "ID": 97
  },
  "NFT_NAME": "Burguer Cash",
  "SYMBOL": "BCASH",
  "MAX_SUPPLY": 100,
  "WALLET_FUNDING": "0 BNB",
  "REWARDS_CLAIM": 50,
  "DAILY_RETURN": "11%",
  "APR": "4015%",
  "DEV_FEE": "3%",
  "WEI_COST": 75000000000000000,
  "DISPLAY_COST": 0.075,
  "GAS_LIMIT": 285000,
  "MARKETPLACE": "None",
  "MARKETPLACE_LINK": "",
  "SHOW_BACKGROUND": true
}
```

Make sure you copy the contract ABI from remix and paste it in the `public/config/abi.json` file.

Now you will need to create and change 2 images and a gif in the `public/config/images` folder, `bg.png`, `example.gif` and `logo.png`.

Next change the theme colors to your liking in the `public/config/theme.css` file.

```css
:root {
  --primary: #7a0000; /*#7a2800*/
  --primary-text: #fff;
  --secondary: #f08c2b;
  --secondary-text: #000000;
  --accent: rgba(122, 40, 0, 0.5);
  --accent-text: #ffffff;
  --all-buttons: #f08c2b;
}
```

Now you will need to create and change the `public/favicon.ico`, `public/logo192.png`, and
`public/logo512.png` to your brand images.

Remember to update the title and description the `public/index.html` file

```html
<title>Burguer Cash | Mine BNB</title>
<meta name="description" content="The BNB Reward Pool with the 11% daily return and lowest dev fee." />
```

Also remember to update the short_name and name fields in the `public/manifest.json` file

```json
{
  "short_name": "BCASH",
  "name": "Burguer Cash"
}
```

After all the changes you can run.

```sh
npm run start
```

Or create the build if you are ready to deploy.

```sh
npm run build
```

Now you can host the contents of the build folder on a server.

That's it! you're done.

