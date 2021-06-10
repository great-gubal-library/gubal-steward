const db = require("../../db.js")

module.exports = {
	name: "addlocation",
	description: "Add a location to the database",
	async execute(message, args) {    
    try {
      // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
      const location = await db("locations").insert({
        owner: "Some owner",
        name: "Some name",
        location: "Some location",
        description: "Some description",
        tags: "Some tags",
        external_link: "Some link",
        server: "Omega",
        datacenter: "Chaos",
      });

      return message.reply(`Location ${location.name} added.`);
    } catch (error) {
      return message.reply('Something went wrong with adding the location.', error);
    }
	},
};
