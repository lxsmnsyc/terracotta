module.exports = process.env.NODE_ENV === 'production'
  ? require('./.rigidity/production/server')
  : require('./.rigidity/development/server');
