import Components from 'unplugin-vue-components/vite';

export default function configTinyResolverPlugin() {
  const tinyResolverPlugin = Components({
    dirs: [], // Avoid parsing src/components.  避免解析到src/components
    deep: false,
    resolvers: [],
  });
  return tinyResolverPlugin;
}
