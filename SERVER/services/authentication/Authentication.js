const {createHash} = require('crypto');
const pool = require("../../db");
// function signup(email, password){
//     const salt = randomBytes(16).toString('hex');
//     const hashedPassword = scryptSync(password, salt, 64).toString('hex');
//     const user = {email: email, password: hashedPassword, salt: salt};
//     return user;
// }
const newUserRegistration = async (req, res, next) => {

}

/**
 * find session based on sessionid and username, then convert session
 * status to logout code ()
 * @param {json} req 
 */
const verifyLogoutStatus = async (req, res, next) => {
  try {
    const username = req.session.username;
    const sessionID = req.session.id;

    // Update session status in the database
    const result = await pool.query(
      'UPDATE sessions SET session_status = $1 WHERE username = $2 AND session_token = $3',
      ['0', username, sessionID]  // Correct parameterization
    );

    // Check if the update was successful
    if (result.rowCount === 0) {
      throw new Error('Session not found or could not be updated.');
    }

    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        // Handle errors that occur during session destruction
        console.error('Session destruction error:', err);
        return res.status(500).send({ message: 'Failed to logout, please try again.' });
      }
      // Send a success response when everything went well
      console.log("l out =====================");
      res.send({ message: 'Logout successful.' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).send({ message: 'Failed to logout, please try again.' });
  }
};

/**
 * used to verify login information provided by the user
 * @param {json} req -req struture {username:, password:}
 */
const loginVerification = async (req, res, next) => {

    try {

      console.log(req.body.username);
      //console.log(req.body.password);
      
      // given username, obtain username, hashed password and salt from logininfo table and password table  
      const data = await pool.query(
        "SELECT username, password_hash, salt FROM logininfo, password WHERE logininfo.pid = password.pid AND username = $1",
        [req.body.username]
      );

      const user = data.rows[0];  //console.log("user",  data.rows[0]);
    
       // if didnt find any user, which data.row[0] will be 0, throw error, then passwordVerification will verify the password
      if (data.rows.length!= 1){
        res.status(401).send({ error: 'Invalid username / username not found' });
        return;
      }

      const passwordHash = user.password_hash;
      const salt = user.salt;
 
      if (passwordVerification(req.body.password, passwordHash, salt)){  //console.log(passwordVerification(req.body.password, passwordHash, salt));

        // continue to the next middleware 
        next();
      }else{
        res.status(401).send({ error: 'Invalid password' });

      }

    } catch (error) {
      console.error('Error executing query', error.stack);
      res.status(500).send({ error: 'Internal server error' });
    }
  };

  const passwordVerification = (testPassword, targetPassword, salt) => {
    hashedPassword = hash(`${testPassword}${salt}`);
    //console.log("p1",hashedPassword );
    //console.log("p2", targetPassword);
    if (hashedPassword === targetPassword){
        return true;
    }else{
        return false
    }
  }

  const hash = (input)=>{
    const hash = createHash('sha256');
    hash.update(input);
    return hash.digest('hex');
}

const sessionLoginManagement = async (req, res, next) => {
  const {username} = req.body;
  req.session.authenticated = true;
  req.session.save(err => {
    if (err) {
      return next(err);
    }
    //res.status(200).send({ message: 'session authenticated and saved', sessionID: req.sessionID });
  });
  req.session.username = username; // Store username in session
  
  const sessionId = req.sessionID;
  const sessionToken = req.sessionID;
  const sessionExpireTime = req.session.cookie.expires;
  const session_active_date = new Date().toISOString();
  console.log("sessionId", sessionId);
  console.log("session time", sessionExpireTime);

try {
    await pool.query('BEGIN');
    
    const result = await pool.query(
      'INSERT INTO sessions (uid, session_token, session_expire_date, session_active_date, session_status, _username) VALUES ((SELECT uid FROM logininfo WHERE username = $1), $2, $3, $4, $5, $6) RETURNING *;',
      [ username, sessionToken, sessionExpireTime, session_active_date, '1',username]
    );

    if (result.rowCount === 0) {
      throw new Error('Failed to insert session record');
    }
    await pool.query('COMMIT');
   
    res.status(200).send({ message: 'Login successful', sessionID: sessionId, isAuthenticated: true });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error storing session ID:', error);
    res.status(500).send({ error: 'Internal server error' });
  }

  next();
}



module.exports = {newUserRegistration, loginVerification,verifyLogoutStatus, sessionLoginManagement}