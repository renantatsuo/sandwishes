module.exports = [
  {
    method: 'GET',
    path: '/api/hamburgers',
    handler: (req, res) => res.file('server/hamburgers.json'),
  },
  {
    method: 'GET',
    path: '/api/ingredients',
    handler: (req, res) => res.file('server/ingredients.json'),
  },
];
