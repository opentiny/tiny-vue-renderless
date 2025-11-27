<h1 id='link'>Link plug-in</h1>

---
<h2 id='desc'>Description</h2>

> Applies to local debugging plug-ins. Locally developed plug-ins can be invoked through soft links. Component developers can experience debugging only locally after publishing components, improving the development and debugging efficiency of component developers.

<h2 id='lazyload'>Instructions for use - The following uses lazyload debugging as an example</h2>

> For ease of understanding, the following uses local development and debugging of the lazyload component as an example.

1. The first step：Run the lazyload software link to the .tiny/LocalCDNPath directory
   run the `tiny link` or `tiny link init` command
   a soft link of the target component exists in the user directory
2. The second step：search for the @opentiny/xxxx component in the .tiny/LocalCDNPath directory，if it is found, delete @opentiny/xxxx that the page depends on，link the components in .tiny/LocalCDNPath to the page project.
   Executing `tiny link -m @opentiny/xxx` this example in xxx showing lazyload
   In this case, the target component is soft linked in the test project
<h2 id='scene'>Application Scenarios</h2>

The development owner of each component debugs its own components locally. You do not need to debug the local project each time you release the component.

<h2 id='Usage'>Usage</h2>

<h3 id='line'>Use it in the command line</h3>

```
$ tiny link                         initializing the link environment of the local plug-in
$ tiny link init                    initialize the local link environment, which is the same as that of the tiny link
$ tiny link help                    displays the related Minglin of the link plug-in
$ tiny link link -m @opentiny/xxx   link the @opentiny/xxx plug-in to the current path
```
