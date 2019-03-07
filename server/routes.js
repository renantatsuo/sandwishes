module.exports = [
  {
    method: 'GET',
    path: '/api/hamburgers',
    handler: (req, h) => h.file('server/hamburgers.json'),
  },
  {
    method: 'GET',
    path: '/api/ingredients',
    handler: (req, h) => h.file('server/ingredients.json'),
  },
];
