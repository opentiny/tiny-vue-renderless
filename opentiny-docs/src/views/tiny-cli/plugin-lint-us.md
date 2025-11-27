<h1 id='lint'>Lint plug-in</h1>

---
<h2 id='desc'>Description</h2>

> When local code is committed, the eslint of the submitted code is verified. Non-standard code cannot be imported to the database
> The current lint plug-in is developed based on the Opentiny front-end specifications，eslint rule package can be viewed：[@opentiny/eslint-config](https://www.npmjs.com/package/@opentiny/eslint-config)

## Description

> verification upon code submission eslint
> submit the code that fails to pass the verification. You can perform the fix operation to fix the noncompliant code（some non-standard eslint issues still need to be manually fixed）

## Usage

### Use it in the command line

```
$ tiny lint help
$ tiny lint init  //initialize tiny lint
$ tiny lint fix   //restore the local lint, including eslint（see the rules:.eslintrc.js）、prettier(see the rules：.prettierrc.js)、stylelint(see the rules：.stylelintrc.js)
```