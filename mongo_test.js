const mongoose = require("mongoose");

if (process.argv.length < 5) {
  console.log("enter valid arguments");
  process.exit(2);
}

const pwd = process.argv[2];

const connectionUrl = `mongodb+srv://unha:${pwd}@cluster0.odz86.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("person", personSchema);

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
});

person.save().then((res) => {
  console.log(res);
  mongoose.connection.close();
});
