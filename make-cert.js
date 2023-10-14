const shell = require('shelljs');

if (!shell.which('mkcert')) {
  shell.echo('mkcert not installed.');
  shell.exit(1);
}

shell.exec('mkcert -install');
shell.exec(
  'mkcert -key-file certificates/key.pem -cert-file certificates/cert.pem localhost.com "*.localhost.com" 127.0.0.1 ::1',
);
