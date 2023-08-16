const { exec } = require('child_process')

exec('npm run dev:vue3', __dirname)
exec('npm run dev:react', __dirname)
exec('npm run dev:solid', __dirname)
exec('npm run dev:vue2', __dirname)
exec('npm run dev:home', __dirname)

console.log('home', 'http://localhost:5173/')
console.log('react', 'http://localhost:2001/')
console.log('solid', 'http://localhost:2002/')
console.log('vue2', 'http://localhost:2003/')
console.log('vue3', 'http://localhost:2004/')
