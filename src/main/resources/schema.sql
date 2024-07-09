
CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     username TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL,
     is_favorites_public BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS login_attempts (
      username TEXT NOT NULL,
      attempts INTEGER DEFAULT 0 NOT NULL,
      last_attempt TIMESTAMP,
      PRIMARY KEY (username),
      FOREIGN KEY(username)
          REFERENCES users(username)
          ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorite_parks (
      favorite_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_username TEXT,
      park_code TEXT,
      ranking INTEGER,
      FOREIGN KEY(user_username)
          REFERENCES users(username)
          ON DELETE CASCADE
);
