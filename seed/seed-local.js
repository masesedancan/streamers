print("🚀 Checking MongoDB for existing data...");

const db = connect("mongodb://localhost:27017/MyStreamApp");

// Check if already seeded
const hasData =
  db.movies.estimatedDocumentCount() > 0 ||
  db.genres.estimatedDocumentCount() > 0 ||
  db.users.estimatedDocumentCount() > 0 ||
  db.rankings.estimatedDocumentCount() > 0;

if (hasData) {
  print("⚠️ Data already exists — skipping seed.");
  quit();
}

print("📌 Seeding initial database data...");

const data3 = fs.readFileSync('users.json', 'utf8');
db.users.insertMany(JSON.parse(data3));

const data1 = fs.readFileSync('movies.json', 'utf8');
db.movies.insertMany(JSON.parse(data1));

const data2 = fs.readFileSync('genres.json', 'utf8');
db.genres.insertMany(JSON.parse(data2));

const data4 = fs.readFileSync('rankings.json', 'utf8');
db.rankings.insertMany(JSON.parse(data4));

print("🎉 Seeding complete. Database is ready!");
