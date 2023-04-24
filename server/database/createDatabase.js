import db from './connection.js'

const isResetMode = process.argv.indexOf('reset') !== -1

if (isResetMode) {
  db.exec('DROP TABLE users;')
  db.exec('DROP TABLE seasons;')
  db.exec('DROP TABLE episodes;')
  db.exec('DROP TABLE quotes;')
}

db.exec(`
    CREATE TABLE IF NOT EXISTS users
    (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        name     TEXT,
        password TEXT
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS seasons
    (
        season_id INTEGER PRIMARY KEY AUTOINCREMENT,
        season    INTEGER
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS episodes
    (
        episode_id     INTEGER PRIMARY KEY AUTOINCREMENT,
        episode_number INTEGER,
        name           TEXT,
        season_id      INTEGER,
        FOREIGN KEY (season_id) REFERENCES seasons (season_id)
    );
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS quotes
    (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        quote TEXT,
        episode_id,
        foreign key (episode_id) REFERENCES episodes (episode_id)
    );
`)

db.exec('INSERT INTO seasons (season) VALUES (1);')
db.exec('INSERT INTO seasons (season) VALUES (2);')

db.exec("INSERT INTO episodes (name, episode_number, season_id) VALUES ('Basketball',5, 1);")
db.exec("INSERT INTO episodes (name, episode_number, season_id) VALUES ('pilot',1,1);")
db.exec("INSERT INTO episodes (name, episode_number, season_id) VALUES ('Diversity Day',2, 1);")
db.exec("INSERT INTO episodes (name, episode_number, season_id) VALUES ('Health Care',3,1);")
db.exec("INSERT INTO episodes (name, episode_number, season_id) VALUES ('The Alliance',4, 1);")

db.run('INSERT INTO quotes (episode_id, quote) VALUES (1, ?);',
  [`Michael: All right Jim. Your quarterlies look very good. How are things at the library?
            Jim: Oh, I told you. I couldn’t close it. So…
            Michael: So you’ve come to the master for guidance? Is this what you’re saying, grasshopper?
            Jim: Actually, you called me in here, but yeah.
            Michael: All right. Well, let me show you how it’s done.`])

db.run('INSERT INTO quotes (episode_id, quote) VALUES (1, ?);',
  [`Michael: Whassup!
            Jim: Whassup! I still love that after seven years.
            Michael: Whassup!
            Dwight: Whassup!
            Michael: Whass…up!
            Dwight: Whassup.
            Michael: [Strains, grunts] What?
            Jim: Nothing.
            Michael: OK. All right. See you later.
            Jim: All right. Take care.
            Michael: Back to work.`])

db.run('INSERT INTO quotes (episode_id, quote) VALUES (1, ?);',
  [`Pam: I have an important question for you.
            Jim: Yes?
            Pam: Are you going to Angela’s cat party on Sunday?
            Jim: Yeah, stop. That is ridiculous.`])

db.run('INSERT INTO quotes (episode_id, quote) VALUES (1, ?);',
  [`Jim: Sure. Mr. Davis, let me call you right back. Yeah, something just came up. Two minutes. Thank you very much. Dwight, what are you doing?
            Dwight: What?
            Jim: What are you doing?
            Dwight: Just clearing my desk. I can’t concentrate.
            Jim: It’s not on your desk.
            Dwight: It’s overlapping. It’s all spilling over the edge. One word, two syllables. Demarcation.
            Dwight: You can’t do that.
            Jim: Why not?
            Dwight: Safety violation. I could fall and pierce an organ.
            Jim: [crosses fingers] We’ll see. [Dwight begins smashing pencils with his phone] This is why the whole downsizing thing just doesn’t bother me.
            Dwight: Downsizing?`])
