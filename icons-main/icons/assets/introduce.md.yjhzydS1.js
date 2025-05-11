import { _ as o, c as n, o as t, ah as a } from './chunks/framework.Dwe2Uyii.js'
const u = JSON.parse('{"title":"OpenTiny Icons 介绍","description":"","frontmatter":{},"headers":[],"relativePath":"introduce.md","filePath":"introduce.md"}'),
  r = { name: 'introduce.md' }
function c(i, e, s, d, l, p) {
  return (
    t(),
    n(
      'div',
      null,
      e[0] ||
        (e[0] = [
          a(
            '<h1 id="opentiny-icons-介绍" tabindex="-1">OpenTiny Icons 介绍 <a class="header-anchor" href="#opentiny-icons-介绍" aria-label="Permalink to &quot;OpenTiny Icons 介绍&quot;">​</a></h1><p><code>OpenTiny Icons</code>图标库是<code>Opentiny Design</code>团队开源的基础图标，以及华为云服务图标和服务扩展图标。系统基础图标以线型图标为主的设计风格，图标统一为<code>16*16</code>的大小，拥有安全边距，保证了一致的视觉大小，它覆盖了组件库开发，管理应用开发以及云服务行业应用中的常用图标。华为云服务图标是一组彩色的大图标库， 统一为 72*72的统一尺寸，覆盖了云计算、云存储、云数据库、容器中间件等等所有服务的官方图标。</p><ul><li>系统基础图标： 满足常见组件库开发，业务项目开发的场景</li><li>IT 系统图标： 满足计算机/云行业的应用开发的场景</li><li>账号权限图标： 满足后台管理等应用开发的场景</li><li>华为云服务图标： 满足使用华为云服务图标的场景</li><li>状态图标 ：常见的空数据，请求状态，应用权限等场景</li></ul><h2 id="图标方案" tabindex="-1">图标方案 <a class="header-anchor" href="#图标方案" aria-label="Permalink to &quot;图标方案&quot;">​</a></h2><p>在前端界的Anthony Fu大神在自己的博客<a href="https://antfu.me/posts/icons-in-pure-css-zh" target="_blank" rel="noreferrer">《聊聊纯 CSS 图标》</a>中提到：<strong>在纯 CSS 中按需使用任何图标的能力</strong>的一套方案，能支持单色和彩色图标，并且他将这个图标方案集成在了<code>UnoCSS</code>的<a href="https://unocss.dev/presets/icons" target="_blank" rel="noreferrer">图标库预设</a>中。在一次线下大会上，私下问Anthony Fu大神这个图标的问题，得到了<code>组件库不适合做图标</code>的意见，让我们更加坚定用<code>CSS</code>来做图标的想法。</p><p>于是我们将<code>Opentiny Design</code>团队设计的几百个<code>SVG</code>图标，使用Antfu的图标<a href="https://github.com/opentiny/icons/blob/7e1dde24f54c678dabc3eb4f3c837380a2a66a1c/scripts/build.ts#L81" target="_blank" rel="noreferrer">算法</a>转换为<code>CSS</code>图标，同时为了支持<code>@unocss/preset-icons</code>的插件，我们也导出了<code>@iconify-json 格式</code>,支持全面在<code>UnoCSS</code>中的使用。</p><h2 id="开源-贡献" tabindex="-1">开源/贡献 <a class="header-anchor" href="#开源-贡献" aria-label="Permalink to &quot;开源/贡献&quot;">​</a></h2><p><code>Opentiny Design</code>团队开源了全部的基础图标和华为云服务的图标，并将长期更新。但是本仓库不接受外部用户提交，如果你在使用中遇到了问题，或者有新图标的需求，以及其它建议，欢迎在<a href="https://github.com/opentiny/icons/issues" target="_blank" rel="noreferrer">本仓库的ISSUE</a>进行交流。</p>',
            8
          )
        ])
    )
  )
}
const _ = o(r, [['render', c]])
export { u as __pageData, _ as default }
