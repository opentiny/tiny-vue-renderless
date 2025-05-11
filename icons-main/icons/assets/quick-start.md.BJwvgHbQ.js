import { p as a, c as l, o as e, ah as p } from './chunks/framework.Dwe2Uyii.js'
import './chunks/theme.-dLHjZVU.js'
a()
const n = typeof window < 'u',
  t = a(n ? location.hash : '')
n &&
  window.addEventListener('hashchange', () => {
    t.value = location.hash
  })
if (typeof window < 'u') {
  var i = { get passive() {} }
  window.addEventListener('testPassive', null, i), window.removeEventListener('testPassive', null, i)
}
const r = JSON.parse('{"title":"快速上手","description":"","frontmatter":{},"headers":[],"relativePath":"quick-start.md","filePath":"quick-start.md"}'),
  h = { name: 'quick-start.md' },
  E = Object.assign(h, {
    setup(k) {
      return (c, s) => (
        e(),
        l(
          'div',
          null,
          s[0] ||
            (s[0] = [
              p(
                `<h1 id="快速上手" tabindex="-1">快速上手 <a class="header-anchor" href="#快速上手" aria-label="Permalink to &quot;快速上手&quot;">​</a></h1><p><code>OpenTiny Icons</code>图标库是<code>CSS</code>图标方案，所以支持所有前端框架，也支持<code>UnoCSS</code>的图标插件使用场景。</p><h2 id="安装图标库" tabindex="-1">安装图标库 <a class="header-anchor" href="#安装图标库" aria-label="Permalink to &quot;安装图标库&quot;">​</a></h2><p>本节中，我们将介绍如何安装图标库依赖以及图标库的内容。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @opentiny/icons</span></span></code></pre></div><p>安装后，在<code>node_modules/@opentiny/icons</code> 目录中，可以观察到以下内容</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>icons/</span></span>
<span class="line"><span>|─json</span></span>
<span class="line"><span>|  └─ icons.json</span></span>
<span class="line"><span>|─style</span></span>
<span class="line"><span>|  |─ all.css</span></span>
<span class="line"><span>|  |─ base.css</span></span>
<span class="line"><span>|  |─ svc.css</span></span>
<span class="line"><span>|  |─ ext.css</span></span>
<span class="line"><span>|  └─ stat.css</span></span></code></pre></div><h2 id="整体引入-css-使用" tabindex="-1">整体引入 css 使用 <a class="header-anchor" href="#整体引入-css-使用" aria-label="Permalink to &quot;整体引入 css 使用&quot;">​</a></h2><p>在工程中的适应位置，引入图标的 css 文件, 也可以根据使用情况，按<code>类别</code>导入图标，以减小引入样式文件的体积.</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import &quot;@opentiny/icons/style/all.css&quot;</span></span></code></pre></div><ul><li>全量图标: all.css</li><li>基础图标: base.css</li><li>服务图标: svc.css</li><li>服务扩展图标: ext.css</li><li>服务扩展图标: stat.css</li></ul><div class="warning custom-block"><p class="custom-block-title">提示</p><p>所有图标类名的前缀统一为 <code>ci-类别-*</code>, 其中<code>base类别</code>的图标常用，所以省略了类别，其它类别的图标必须带着类别。 比如：</p><ul><li>ci-home <i class="ci-home"></i> ci-email <i class="ci-email"></i> 是 <code>base</code> 类别的图标。</li><li>ci-svc-esc <i class="ci-svc-ecs"></i> 是服务图标， <code>svc</code>的类别不能省略。</li></ul></div><h2 id="按需引用-推荐" tabindex="-1">按需引用 (推荐) <a class="header-anchor" href="#按需引用-推荐" aria-label="Permalink to &quot;按需引用 (推荐)&quot;">​</a></h2><p>通过引入 <code>@unocss/preset-icons</code> 插件，可以实现按需引用图标，大大减小构建后的文件大小。</p><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { defineConfig } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> UnoCSS </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;unocss/vite&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> presetIcons </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@unocss/preset-icons&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineConfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    UnoCSS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      presets: [</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">        presetIcons</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          prefix: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          extraProperties: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            display: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;inline-block&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            &#39;vertical-align&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;middle&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          collections: {</span></span>
<span class="line highlighted"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">            ci</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;@opentiny/icons/json/icons.json&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">).</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">((</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">i</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i.default)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">实用技巧</p><p>修改<code>collections</code>中的键值，可以迅速调整图标前缀，避免与其它图标库冲突！</p></div>`,
                16
              )
            ])
        )
      )
    }
  })
export { r as __pageData, E as default }
