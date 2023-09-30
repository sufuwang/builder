const { execSync } = require('child_process');

const paths = [
  { name: 'readLife', front: true, },
  { name: 'readMe', front: true, },
  { name: 'universe', front: false, },
].map(item => {
  return { ...item, path: `./submodules/${item.name}` }
})

const getShell = (item) => [
  `cd ${item.path}`,
  'pwd',
  "git switch master",
  "git pull",
  "pnpm i",
  "pnpm run build",
];

paths.forEach(item => {
  execSync(getShell(item).join(' && '))
})

execSync('docker-compose down --rmi all && docker-compose up -d')
