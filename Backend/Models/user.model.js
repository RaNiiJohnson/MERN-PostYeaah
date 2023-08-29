const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// static signup
UserSchema.statics.signup = async function (name, email, password) {
  if (!email || !password || !name) {
    throw Error("Veuillez remplir tous les formulaires.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email invalide");
  }

  const emailExiste = await this.findOne({ email });

  if (emailExiste) throw Error("Cet email est déja pris.");
  const nameExiste = await this.findOne({ name });

  if (nameExiste) throw Error("Trouvez d'autre prénom.");

  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash });

  return user;
};

//login static
UserSchema.statics.login = async function (name, email, password) {
  if (!name || !email || !password)
    throw Error("Veuillez remplir tous les formulaires.");

  const user = await this.findOne({ email });

  if (!user) throw Error("L'email n'existe pas.");

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) throw Error("Mot de passe incorrecte.");

  return user;
};

module.exports = mongoose.model("user", UserSchema);
