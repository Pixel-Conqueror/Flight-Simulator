var dbName = "flight_simulator";
var mydb = db.getSiblingDB(dbName);

var collections = [
  "USERS",
  "TOKENS",
  "LIVE_STATES",
  "HISTORICAL_STATES",
  "FLIGHTS_META",
];

for (var i = 0; i < collections.length; i++) {
  var name = collections[i];
  if (mydb.getCollectionNames().indexOf(name) === -1) {
    mydb.createCollection(name);
    print("✅ Collection created: " + name);
  } else {
    print("ℹ️  Collection already exists: " + name);
  }
}

// Indexes to optimize queries and enforce uniqueness
mydb.LIVE_STATES.createIndex({ icao24: 1 }, { unique: true });

var users = [
  {
    username: "Shadowsun",
    password: "$2y$10$cqmoxukbzM7R3Ll5XUc6aeHZoaHjzcCSaHb89Opl7Cc6dGK5bcZ.K",
    role: "admin",
    createdAt: new Date(),
  },
  {
    username: "Shadowsun_Guest",
    password: "$2y$10$efa5HChR95lDI16o1Nhcie8rJN/.Lpai.SgNPpuWn7vWrwQM2C5Zq",
    role: "guest",
    createdAt: new Date(),
  },
];

users.forEach(function (u) {
  if (!mydb.USERS.findOne({ username: u.username })) {
    mydb.USERS.insertOne(u);
    print("✅ User created: " + u.username);
  } else {
    print("ℹ️  User already exists: " + u.username);
  }
});
