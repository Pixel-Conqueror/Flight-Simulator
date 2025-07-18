// Remplacez "picture_manager" par le nom de votre DB
var dbName = "picture_manager";
// Bascule sur la DB (MONGO_INITDB_DATABASE)
var mydb = db.getSiblingDB(dbName);

// Liste des collections à créer
var collections = ["USERS"];

for (var i = 0; i < collections.length; i++) {
  var name = collections[i];
  if (mydb.getCollectionNames().indexOf(name) === -1) {
    mydb.createCollection(name);
    print("✅ Collection created: " + name);
  } else {
    print("ℹ️  Collection already exists: " + name);
  }
}

mydb.TODO.createIndex({ status: 1 });
mydb.PROCESSING.createIndex({ updatedAt: 1 });

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
