const { spawn } = require('child_process');

const backend = spawn('npm', ['run', 'start-server'], { stdio: 'inherit' });

backend.on('error', (err) => {
  console.error(err); // eslint-disable-line
  process.exit(1);
});

const frontend = spawn('npm', ['run', 'start-client'], { stdio: 'inherit' });

frontend.on('error', (err) => {
  console.error(err); // eslint-disable-line
  process.exit(1);
});
