const cssFileContent = `/* You can add global styles to this file, and also import other style files */
/*参照compodoc的样式，暂时只定义了h3和p，强制覆盖tiny3样式*/
.h1,
.h2,
.h3,
h1,
h2,
h3 {
  margin-top: 20px !important;
  margin-bottom: 10px !important;
}

h3 {
  font-size: 20px !important;
  font-weight: bold !important;
}
p {
  margin: 0 0 10px !important;
}

.demo-text-warn {
  color: #e37d29;
}
.demo-text-error {
    color: #DE504E;
}
.demo-code {
  font-family: Consolas;
  color: #DE504E;
  background-color: #fbe5e1;
  padding: 2px 4px;
  border-radius: 4px;
}
.demo-link {
  color: var(--ti-common-color-text-link);
  text-decoration: none;
}

.demo-link:hover {
  color: var(--ti-common-color-text-link-hover);
  text-decoration: underline;
}

.event-log-container {
  max-height: 220px;
  font-size: 12px;
  overflow-y: auto;
  padding: 8px 0 8px 8px;
  margin-top: 8px;
  background-color: rgba(243, 244, 246);
}

.event-log-container:empty {
  margin-top: 0px;
  padding: 0px;
}

.current-value-container {
  margin-top: 0.75rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.25rem;
  line-height: 1.5rem;
  overflow: auto;
}

.placehoder {
  color: #adb0b8;
}

.min-w-48 {
  min-width: 200px;
}

.min-h-24 {
  min-height: 100px;
}

.lable {
  width: 180x;
  height: 40px;
}
.link {
  text-decoration: none;
  color: var(--ti-actionmenu-item-text-color);
}

.link:hover {
  color: var(--ti-actionmenu-item-text-color-hover);
}

.radiogroupwidthlong{
  width: 500px;
  max-width: 100%;
}

.radiogroupwidth{
  width: 100px;
  margin-left: 8px;
}

/* From Tailwindcss */
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
.top-3 {
  top: 0.75rem;
}
.top-10 {
  top: 2.5rem;
}
.top-12 {
  top: 3rem;
}
.top-40 {
  top: 10rem;
}
.right-3 {
  right: 0.75rem;
}
.left-10 {
  left: 2.5rem;
}
.left-24 {
  left: 6rem;
}
.left-28 {
  left: 7rem;
}
.float-right {
  float: right;
}
.float-left {
  float: left;
}
.clear-both {
  clear: both;
}
.m-4 {
  margin: 1rem;
}
.m-6 {
  margin: 1.5rem;
}
.m-20 {
  margin: 5rem;
}
.my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}
.my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.my-7 {
  margin-top: 1.75rem;
  margin-bottom: 1.75rem;
}
.my-9 {
  margin-top: 2.25rem;
  margin-bottom: 2.25rem;
}
.mt-3 {
  margin-top: 0.75rem;
}
.mt-4 {
  margin-top: 1rem;
}
.mt-5 {
  margin-top: 1.25rem;
}
.mt-32 {
  margin-top: 8rem;
}
.mr-1 {
  margin-right: 0.25rem;
}
.mr-2 {
  margin-right: 0.5rem;
}
.mr-3 {
  margin-right: 0.75rem;
}
.mr-4 {
  margin-right: 1rem;
}
.mr-7 {
  margin-right: 1.75rem;
}
.mr-9 {
  margin-right: 2.25rem;
}
.mr-10 {
  margin-right: 2.5rem;
}
.mr-11 {
  margin-right: 2.75rem;
}
.mb-3 {
  margin-bottom: 0.75rem;
}
.mb-4 {
  margin-bottom: 1rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.mb-12 {
  margin-bottom: 3rem;
}

.h200 {
  height: 200px;
}
.w300 {
  width: 300px;
}
.of-auto {
  overflow: auto;
}
.b-a {
  border: 1px solid #333639;
}


.ml-3 {
  margin-left: 0.75rem;
}
.ml-4 {
  margin-left: 1rem;
}
.ml-32 {
  margin-left: 8rem;
}
.inline-block {
  display: inline-block;
}
.flex {
  display: flex;
}
.flex-wrap {
  flex-wrap: wrap;
}
.h-4 {
  height: 1rem;
}
.h-5 {
  height: 1.25rem;
}
.h-10 {
  height: 2.5rem;
}
.h-24 {
  height: 6rem;
}
.h-48 {
  height: 12rem;
}
.h-80 {
  height: 20rem;
}
.h-full {
  height: 100%;
}
.max-h-48 {
  max-height: 12rem;
}
.w-7 {
  width: 1.75rem;
}
.w-16 {
  width: 4rem;
}
.w-32 {
  width: 8rem;
}
.w-40 {
  width: 10rem;
}
.w-48 {
  width: 12rem;
}
.w-52 {
  width: 13rem;
}
.w-60 {
  width: 15rem;
}
.w-64 {
  width: 16rem;
}
.w-96 {
  width: 24rem;
}
.w-auto {
  width: auto;
}
.w-2\\/5 {
  width: 40%;
}
.w-4\\/5 {
  width: 80%;
}
.w-full {
  width: 100%;
}
.max-w-xs {
  max-width: 20rem;
}
.max-w-md {
  max-width: 28rem;
}
.max-w-xl {
  max-width: 36rem;
}
.max-w-screen-md {
  max-width: 768px;
}
.cursor-pointer {
  cursor: pointer;
}
.cursor-move {
  cursor: move;
}
.cursor-default {
  cursor: default;
}
.justify-between {
  justify-content: space-between;
}
.justify-start {
	justify-content: flex-start;
}
.rounded {
  border-radius: 0.25rem;
}
.border {
  border-width: 1px;
}
.border-solid {
  border-style: solid;
}
.border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgba(209, 213, 219, var(--tw-border-opacity));
}
.bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
}
.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(31, 41, 55, var(--tw-bg-opacity));
}
.bg-yellow-200 {
  --tw-bg-opacity: 1;
  background-color: rgba(253, 230, 138, var(--tw-bg-opacity));
}
.bg-opacity-70 {
  --tw-bg-opacity: 0.7;
}
.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-4 {
  padding: 1rem;
}
.px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.pr-2 {
  padding-right: 0.5rem;
}
.pl-2 {
  padding-left: 0.5rem;
}
.pl-4 {
  padding-left: 1rem;
}
.text-center {
  text-align: center;
}
.align-middle {
  vertical-align: middle;
}
.align-bottom {
  vertical-align: bottom;
}
.leading-6 {
  line-height: 1.5rem;
}
.leading-10 {
  line-height: 2.5rem;
}
.leading-none {
  line-height: 1;
}
.text-red-500 {
  --tw-text-opacity: 1;
  color: rgba(239, 68, 68, var(--tw-text-opacity));
}
.text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgba(251, 191, 36, var(--tw-text-opacity));
}
.text-yellow-500 {
  --tw-text-opacity: 1;
  color: rgba(245, 158, 11, var(--tw-text-opacity));
}
.text-blue-500 {
  --tw-text-opacity: 1;
  color: rgba(59, 130, 246, var(--tw-text-opacity));
}
.text-blue-600 {
  --tw-text-opacity: 1;
  color: rgba(37, 99, 235, var(--tw-text-opacity));
}
.no-underline {
  text-decoration: none;
}
.text-base {
  font-size: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.text-xl {
  font-size: 1.25rem;
}
.text-4xl {
  font-size: 2.25rem;
}
.font-medium {
  font-weight: 500;
}
.font-semibold {
  font-weight: 600;
}
.box-border {
  box-sizing: border-box;
}

/* optimize the position of tip */
body {
  padding: var(--ti-common-space-10x);
}

/** 解决树选择器、选择器组件 高度会变得特别高的问题 */
body > app-root > ti-tags-input .ti3-overflow-padding,
body > app-root > ti-tags-input .ti3-select-dominator-text,
body > app-root > ti-select .ti3-overflow-padding,
body > app-root > ti-select .ti3-select-dominator-text,
body > app-root > ti-select .ti3-select-dominator-dropdown-btn,
body > app-root > ti-treeselect .ti3-overflow-padding,
body > app-root > ti-treeselect .ti3-select-dominator-text,
body > app-root > ti-treeselect .ti3-select-dominator-dropdown-btn
 {
  height: auto !important;
}
`;

export const getCss = () => cssFileContent;
