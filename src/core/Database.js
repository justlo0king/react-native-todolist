import Datastore from 'react-native-local-mongodb';

//import SQLite from "react-native-sqlite-storage";

export const Database = {
  initialize() {
    Database.db = new Datastore({ filename: 'asyncStorageKey', autoload: true });
    console.log(`Database.initialize(): done`);
  },

  close() {

  }
  /*
  initialize() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    const database_name = "todolist.db";
    const database_version = "1.0";
    const database_displayname = "ToDoList data storage";
    const database_size = 200000;

    Database.db = null;
    return new Promise((resolve) => {
      console.log("Plugin integrity check ...");
      SQLite.echoTest()
        .then(() => {
          console.log("Integrity check passed ...");
          console.log("Opening database ...");
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          ).then((DB) => {
            Database.db = DB;
            console.log(`Database.initialize(): db open`);

            //Database.db.executeSql('DROP TABLE IF EXISTS Tasks');
            Database.db.executeSql('SELECT 1 FROM Tasks LIMIT 1').then(() => {
              console.log(`Database.initialize(): table Tasks is ready`);


              const insertQuery = `INSERT INTO Tasks [taskId, name, description, status, createdAt, changedAt] VALUES (1233445, 'Cherry', '', 'pending', '1562000434938', '1562000434938')`;
              Database.db.executeSql(insertQuery).then(() => {
                console.log(`Database.initialize(): created Tasks item`);
              }).catch((error) => {
                console.warn(`Database.initialize(): failed to insert into Tasks, error: `, error);
              });

            }).catch((error) =>{
              console.log(`Database.initialize(): creating Tasks table`);
              // id, name, description, time stamp, status
              Database.db.transaction((tx) => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Tasks (taskId INT PRIMARY_KEY, name TEXT(128), description TEXT(1024), status text(24), createdAt DATETIME, changedAt DATETIME)');
              }).then(() => {
                console.log(`Database.initialize(): created Tasks table`);
              }).catch((error) => {
                console.warn(`Database.initialize(): failed to create table Tasks, error: `, error);
              });
            });
            resolve(Database.db);
          }).catch((error) => {
            console.warn(`Database.initialize(): failed to open database, error: `, error);
          });
        })
        .catch((error) => {
          console.warn(`Database.initialize(): echoTest is failed, module is not functioning`);
        });
    });
  },

  close() {
    if (Database.db) {
      console.log(`Database.close(): closing db`);
      Database.db.close()
        .then(status => {
          console.log(`Database.close(): closed db`);
        })
        .catch(error => {
          console.error(`Database.close(): failed to close db, error: `, error);
        });
    } else {
      console.log(`Database.close(): db is not initalized`);
    }
  },

  transaction(query, callback=()=>null) {
    console.log(`Database.transaction(): query: ${query}`);
    if (!Database.db) {
      console.warn(`Database.transaction(): db not initialized`);
      return callback('db not initialized');
    }
    return Database.db.transaction((tx) => {
      tx.executeSql(query);
    }).then((result) => {
      console.log(`Database.transaction(): result: `, result);
      return callback(null, result);
    }).catch((error) => {
      console.warn(`Database.transaction(): error: `, error);
      return callback(error);
    });
  }
  */
};
