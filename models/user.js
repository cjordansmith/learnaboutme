var bcrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  displayName: String,
  bio: String
});

var noop = function() {};//  A do-nothing function for use with the bcrypt module

/*  Defines a function that runs before model is saved  */
userSchema.pre("save", function(done) {
  var user = this;//  Saves a reference to the user

  if (!user.isModified("password")) {
    return done();//  Skips this logic if password isn't modified
  }

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {//  Generates a salt for the hash, and calls the inner function once completed
    if (err) { return done(err); }
    bcrypt.hash(user.password, salt, noop, function(err, hashedPassword) {
      if (err) { return done(err); }
      user.password = hashedPassword;//  Stores the password and continues with the saving
      done();
    });
  });
});

/*  Check the user's password */
userSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

/*  Get the user's name */
userSchema.methods.name = function() {
  return this.displayName || this.username;
};

/*  Creating the user model */
var User = mongoose.model("User", userSchema);

/*  Export the user model */
module.exports = User;
