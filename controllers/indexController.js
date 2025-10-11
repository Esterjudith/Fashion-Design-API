const getHome = (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user.displayName || req.user.username || 'GitHub User';
    res.send(`
      <h1>Welcome, ${user}</h1>
      <p>You are logged in.</p>
    `);
  } else {
    res.send(`
      <h1>Welcome to the Fashion Designer Directory API</h1>
      <p>You are logged out.</p>
    `);
  }
};

module.exports = { getHome };
