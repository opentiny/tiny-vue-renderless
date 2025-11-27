<h1 id='contribute'>Contribution Guide</h1>

---
I'm glad you're willing to contribute to the TinyCLI open source project. There are many forms of contribution. You can choose one or more of them according to your strengths and interests：

- report [new defects](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml)
- For the [existing defects](https://github.com/opentiny/tiny-cli/labels/bug)provide more detailed information, such as supplementing screenshots, providing more detailed reproduction steps, and providing the minimum replicable demo link
- Submit Pull requests to fix typos in the document or make the document clearer and more complete

You can add the official assistant WeChat opentiny-official，join the technical exchange group and participate in the discussion

As you become familiar with Tiny CLI by using Tiny CLI yourself and participating in many of the above forms of contributions, try doing something more challenging, such as：

- Fix the defect, you can start with [Good-first issue](https://github.com/opentiny/tiny-cli/labels/good%20first%20issue) 
- Implement new features
- Complete the unit test
- Translate documents
- Participate in code review

In addition to participating in the Tiny CLI project, you can also contribute new Tiny CLI suites and plug-ins to [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions)，not included in [built-in plug-ins](https://github.com/opentiny/tiny-cli/tree/dev/packages/plugins)and Other extensions in the [built-in kit](https://github.com/opentiny/tiny-cli/tree/dev/packages/toolkits) need to be submitted to the code base [`tiny-cli-extensions`](https://github.com/opentiny/tiny-cli-extensions)，relevant requirements and specifications are consistent with those of the current project.


<h2 id='issue'>Submit Issue</h2>

If you encounter problems when using the TinyCLI component, please submit an issue to us. Before submitting an issue, read the official document (https://opentiny.design) carefully，confirm whether this is a bug or an unimplemented feature.

If it is a defect, select [`Bug report`](https://github.com/opentiny/tiny-cli/issues/new?template=bug-report.yml)template when creating a new issue，title follows the format of `[toolkitName/pluginName/CliCore] defect description`，for example, error xxx is displayed after the tiny start command is executed for the `[tiny-toolkit-xxx] xxx suite`。

To report a defect, you need to fill in the following information：
- Versions of tiny-cli and node
- Screenshots can be used to describe the defect. If an error is reported, the error information can be posted
- It is recommended that a minimum demo link be provided to reproduce the defect

If it is a new feature, select the template of [Feature request](https://github.com/opentiny/tiny-cli/issues/new?template=feature-request.yml) ，the title complies with the format of `[toolkitName/pluginName/cliCore] New Feature Description`, for example, `[cliCore] The switch command is added to support the function of switching the NPM source`.

For an issue of a new feature, you need to fill in the following information：
- What problems does this feature solve
- What is the API of this feature

<h2 id='PR'>Submit PR</h2>

Before submitting the PR, make sure that the content you submit is in line with the TinyCLI overall plan，Issues marked as [`bug`](https://github.com/opentiny/tiny-cli/labels/bug) are generally encouraged to submit PR，If you're not sure, create a [`Discussion`](https://github.com/opentiny/tiny-cli/discussions) for discussion.

Local Boot Procedure：

- Click Fork[`TinyCLI`](https://github.com/opentiny/tiny-cli) in the upper right corner of the code repository，Fork the upstream warehouse to the personal warehouse
- Clone personal warehouse to local
- Run npm init in the TinyCLI root directory to install dependencies
- Run the npm run dev command to start local code compilation and development

```shell
# username indicates the user name, Replace it before running the command
git clone git@github.com:username/tiny-cli.git
cd tiny-cli
git remote add upstream git@github.com:opentiny/tiny-cli.git
npm i

# Start a project
npm run dev
```

Procedure for submitting a PR：

- Create a new branch `git checkout -b username/feature1`，the recommended branch name is `username/feat-xxx` / `username/fix-xxx`
- Local code
- Follow the specifications of Commit Message Format for submission，PRs that do not meet the submission specifications will not be merged
- Submit to remote repository：git push origin branchName
- (Optional) Synchronizing the Latest Code of the dev Branch of the Upstream Repository：git pull upstream dev
- Open the link[`Pull requests`](https://github.com/opentiny/tiny-cli/pulls) to the TinyCLI code repository，click the button of New pull request and submit PR
- The project committer reviews the code and provides comments，and make comments
- The PR author adjusts the code based on comments，note that after a branch initiates a PR, subsequent commit operations will be automatically synchronized. You do not need to submit the PR again
- The project administrator merges PR

End of the contribution process. Thank you for your contribution!

<h2 id='opentiny'>Join the open source community</h2>

If you are interested in our open source projects, please join our open source community in the following ways.

- Add official assistant WeChat：opentiny-official，join our technical exchange group
- Join the mailing list：opentiny@googlegroups.com
