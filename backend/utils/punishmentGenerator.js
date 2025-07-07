const punishments = [
  "You're making chai for everyone this week!",
  "You owe everyone samosas tonight!",
  "Clean the kitchen for 7 days straight!",
  "No TV rights for 3 days!",
  "You’re on garbage duty this week!"
];

exports.generatePunishment = (type) => {
  return punishments[Math.floor(Math.random() * punishments.length)];
};
