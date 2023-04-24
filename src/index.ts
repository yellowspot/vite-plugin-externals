import { type Plugin } from 'vite';
import optimizer from 'vite-plugin-optimizer';

const NAME = '@yellowspot/vite-plugin-external';
const CACHE_DIR = `.${NAME.replaceAll('/', '_')}`;

export default function VitePluginExternals(entries = {}) {
  const optimizations = Object.entries(entries).reduce((acc, [key, value]) => {
    Object.assign(acc, { [key]: `module.exports = ${value};` })
    return acc;
  }, {});

  const enforeOptimizeDeeps: Plugin = {
    name: `${NAME}:enforce-optimize-deeps`,
    config(config) {
      if (!config.optimizeDeps?.exclude) { return }

      const modules = Object.keys(entries);
      config.optimizeDeps.exclude = config.optimizeDeps.exclude.filter((dep) => !modules.includes(dep));
    }
  };

  return [
    optimizer(
      optimizations,
      {
        // Use a custom directory.
        dir: CACHE_DIR,
        // Force commonjs treatement of our files.
        resolveId: (id) => id.replace('.js', '.cjs')
      }
    ),
    enforeOptimizeDeeps,
  ];
}
