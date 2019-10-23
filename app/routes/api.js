const Server = require(process.cwd() + '/app/controllers/server.js'),
      path   = require('path'); //process.cwd();

module.exports = (app, passport, cors) => {
	
	function isLoggedIn (req, res, next) {  
    console.log('dude logged in')
    return req.isAuthenticated() ? next() : res.redirect('/');
		// if(req.isAuthenticated()) {
		// 	return next()
		// } else {
		// 	res.redirect('/');
		// }
	}
	
	const handleServer = new Server();
  
  app.route('/login/:user')
     .get(isLoggedIn, (req, res) => {
    console.log('login/:user', __dirname, process.cwd() + '/views/index.html')
          //res.sendFile(process.cwd() +  '/views/index.html');
    res.redirect('/login/' + req.user.twitter['username']);
  });
//   app.get('/demo', (req, res) => {
//     res.redirect('/rsvp/demo');
//   });
 
// 	app.route( '/user/:location' )	
// 		.get( handleServer.userLocation );
			
// 	app.route( '/businesses/:search' )
// 		.post( handleServer.getNightlife );
	
// 	app.route( '/rsvp/clicks' )
// 		.get(  handleServer.getClicks )
// 		.post( isLoggedIn, handleServer.addClick );	
  
//   app.route('/resetRSVP')
//     .put( handleServer.resetRSVP );  
  app.route('/createRecipe')
    .post( isLoggedIn, handleServer.createRecipe);
		
	app.get( '/auth/twitter', passport.authenticate( 'twitter' ) );

	app.route('/auth/twitter/callback' )
		.get( passport.authenticate( 'twitter', {failureRedirect: '/'} ), 
        (req, res) => {   
    	    res.redirect('/api/login/' + req.user.twitter['username']);
		});
  
  app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy( err => {
      if(err) throw err;
      res.redirect('/');
    });
    
  });
		

};