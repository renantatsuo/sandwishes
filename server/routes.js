module.exports = [
  {
    method: 'GET',
    path: '/api/sandwiches',
    handler: (req, res) => res.file('server/sandwiches.json'),
  },
  {
    method: 'GET',
    path: '/api/ingredients',
    handler: (req, res) => res.file('server/ingredients.json'),
  },
];
