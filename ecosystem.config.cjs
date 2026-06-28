module.exports = {
  apps: [{
    name: 'beadstudio',
    script: 'npx',
    args: 'vite preview --dist dist --port 3000 --host 0.0.0.0',
    cwd: '/var/www/BeadStudio',
    interpreter: 'none',
    instances: 1,
    autorestart: true
  }]
}
