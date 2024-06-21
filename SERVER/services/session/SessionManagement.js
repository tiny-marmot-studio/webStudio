const pool = require("../../db");
const session = require('express-session');
const sessionSync = async (req, res, next) => {
  console.log("sessionSync", req.session.id);
  console.log("syncing", req.session.authenticated);
  console.log("syncing", req.session);
  console.log("syncing", req.session.id);
    if (req.session.authenticated) {
      console.log("SYNCED");
      try {
        const sessionId = req.sessionID;
        const username = req.session.username; 
        await pool.query(
          'UPDATE sessions SET session_token = $1 WHERE _username = $2 AND session_status = $3',
          [sessionId, username, '1']
        );
      } catch (error) {
        console.error('Error updating session ID:', error);
      }
    }
    next();
  };

 const sessionMatch = async(req, res, next) => {
  console.log("sessionMatch", req.session.id);
  console.log("session match check");
    console.log("session match checking");
    try {
      const sessionID = req.session.id;
      const username = req.session.username;
      const session_status= '1';
     
      const data = await pool.query(
        'SELECT session_token FROM sessions WHERE _username = $1 AND session_status = $2',
        [username, session_status]
      );
      //console.log(username, session_status);
      //console.log(data);
      const targetSessionID = data.rows[0].session_token;
      console.log(targetSessionID, "=========", sessionID);
      if (String(targetSessionID).trim() === String(sessionID).trim()){
        console.log("match succeed");
        next();
      }else{
        console.log("match failed");
        res.send("session id failed to match, re login in is required");
      }
      
    } catch (error) {
      console.log("match error");
      //res.redirect('/Authentication/login');
      
    }
  next();


 }
class CustomSessionStore extends session.Store {
    constructor() {
        super();
        this.sessions = new Map();
    }

    get(sid, callback) {
        const session = this.sessions.get(sid);
        if (session) {
            callback(null, JSON.parse(session));
        } else {
            callback(null, null);
        }
    }

    set(sid, session, callback) {
        this.sessions.set(sid, JSON.stringify(session));
        callback(null);
    }

    destroy(sid, callback) {
        this.sessions.delete(sid);
        callback(null);
    }

    // Optional: Implement other methods like `touch`, `length`, etc.
}


module.exports = { sessionSync, sessionMatch, CustomSessionStore};