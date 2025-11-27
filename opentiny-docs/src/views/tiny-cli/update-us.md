<h1 id='update'>Automatic installation and upgrade</h1>

---
<h2 id='autoInstall'>Automatic installation</h2>

tiny-cli the following commands are included：

- tiny-cli Basic Commands
- tiny-cli Kit Pinning Commands
- tiny-cli Plug-in Extension Commands

When running the tiny xxx command，how does tiny-cli find the corresponding suite or plug-in command？
tiny-cli searches in the following order：

- Check whether the command is a basic command，if it's a basic command，run the basic command；
- Non-basic commands，check whether `tiny.config.js` exists in the current directory，local has `tiny.config.js`, and the name of the suite is specified，checks whether the suite is currently installed locally，install the suite automatically if it is not installed，run the command of the suite again；
- If it doesn't exist，the command is a plug-in command，check whether the plug-in is installed locally，if the plug-in is not installed, the plug-in is automatically installed，run the plug-in command again；

<h2 id='vsUpdate'>version upgrade</h2>

<h3 id='auto'>automatic upgrade</h3>

tiny-cli checks for the latest version on the first run of the plug-in/suite every day，and record the inspection time，when the latest version is found, the system prompts you to perform the upgrade.

As follows:check the version recorded in tiny.cache.json

```js
// tiny.cache.json
{
  "__expires": {
    "__versionTip": 1672972196289,
    "moduleCheck_@opentiny/tiny-toolkit-dev": 1672889396650,
    "moduleCheck_@opentiny/tiny-toolkit-testdev": 1671019358418,
    "moduleCheck_@opentiny/tiny-toolkit-pro": 1670987208867,
    "moduleCheck_@opentiny/tiny-plugin-link": 1671400643494,
    "moduleCheck_@opentiny/tiny-toolkit-mytest": 1672921810287
  },
  "__versionTip": true,
  "moduleCheck_@opentiny/tiny-toolkit-dev": true,
  "moduleCheck_@opentiny/tiny-toolkit-testdev": true,
  "moduleCheck_@opentiny/tiny-toolkit-pro": true,
  "moduleCheck_@opentiny/tiny-plugin-link": true,
  "moduleCheck_@opentiny/tiny-toolkit-mytest": true
}
```

<h3 id='manually'>manual upgrade</h3>

Run the `tiny update` or `tiny install` command to manually upgrade the tiny-cli suite and plug-in：
```bash
$ tiny update @opentiny/tiny-toolkit-dev

# Or carry out：
tiny install @opentiny/tiny-toolkit-dev
```
