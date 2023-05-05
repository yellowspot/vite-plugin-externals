import { type Plugin } from 'vite';
import optimizer from 'vite-plugin-optimizer';
import escapeStringRegexp from 'escape-string-regexp';

const NAME = '@yellowspot/vite-plugin-external';
const CACHE_DIR = `.${NAME.replaceAll('/', '_')}`;

export default function VitePluginExternals(entries = {}) {
  const optimizations = Object.entries(entries).reduce((acc, [key, value]) => {
    const module = () => ({
      code: `module.exports = ${value};`,
      alias: {
        // Use our custom module only on exact match. (e.g. 'react' but not 'react/dom')
        find: new RegExp(`^${escapeStringRegexp(key)}$`)
      }
    });

    Object.assign(acc, { [key]: module })
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
