/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */

Error.stackTraceLimit = 30;

const respawn = require('respawn');
const webpack = require('webpack');
const webpackBackendConfig = require('./webpack.server.config.js');

webpackBackendConfig.mode = 'development';
const backendCompiler = webpack(webpackBackendConfig);

const STATS_OPTIONS = {
  assets: false,
  colors: true,
  version: false,
  modules: false,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  reasons: true,
  cached: true,
  chunkOrigins: true
};

let lastHash = null;
function backendCompilerCallback(error, stats) {
  if (error) {
    lastHash = null;
    console.error(error.stack || error);
    if (error.details) {
      console.error(error.details);
    }
    return;
  }

  if (stats.hash !== lastHash) {
    lastHash = stats.hash;
    process.stdout.write(`${stats.toString(STATS_OPTIONS)}\n`);
  }
}

backendCompiler.plugin('compile', () => console.log('Building server...'));

let monitor;
backendCompiler.plugin('done', () => {
  try {
    console.log('Restarting server...');
    if (!monitor) {
      monitor = respawn(['node', '--harmony', './.build/server.js'], {
        cwd: '.',
        maxRestarts: 1,
        sleep: 100,
        kill: 1000,
        stdio: [
          process.stdin,
          process.stdout,
          process.stderr
        ]
      });

      monitor.start();
    } else {
      monitor.stop(() => monitor.start());
    }
  } catch (error) {
    console.error(error.toString());
  }
});

backendCompiler.watch(100, backendCompilerCallback);
