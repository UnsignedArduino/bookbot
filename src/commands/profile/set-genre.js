const Discord = require("discord.js");
const Schema = require("../../models/profile.js");
const log = require("../../utils/logger");
module.exports = {
	name: "set-genre",
	description: "Set your favorite genre.",
	options: [
		{
			name: "genre",
			type: "STRING",
			description: "The genre you want to set as your favorite genre",
			required: true,
			choices: [
				{
					name: "action",
					value: "action",
				},
				{
					name: "autobiography",
					value: "autobiography",
				},
				{
					name: "biography",
					value: "biography",
				},
				{
					name: "business",
					value: "business",
				},
				{
					name: "crafts/hobbies",
					value: "crafts/hobbies",
				},
				{
					name: "classic",
					value: "classic",
				},
				{
					name: "cookbook",
					value: "cookbook",
				},
				{
					name: "comic",
					value: "comic",
				},
				{
					name: "diary",
					value: "diary",
				},

				{
					name: "drama",
					value: "drama",
				},
				{
					name: "fairytale",
					value: "fairytale",
				},
				{
					name: "fantasy",
					value: "fantasy",
				},
				{
					name: "fiction",
					value: "fiction",
				},
				{
					name: "folklore",
					value: "folklore",
				},
				{
					name: "horror",
					value: "horror",
				},
				{
					name: "humor",
					value: "humor",
				},

				{
					name: "magazine",
					value: "magazine",
				},

				{
					name: "mystery",
					value: "mystery",
				},
				{
					name: "nonfiction",
					value: "nonfiction",
				},
				{
					name: "poetry",
					value: "poetry",
				},
				{
					name: "programming",
					value: "programming",
				},
				{
					name: "religion",
					value: "religion",
				},
				{
					name: "romance",
					value: "romance",
				},
				{
					name: "science",
					value: "science",
				},
				{
					name: "scifi",
					value: "scifi",
				},
			],
		},
	],
	run: async (client, interaction) => {
		const choice = interaction.options.get("genre").value;

		Schema.findOne({ User: interaction.user.id }, async (err, data) => {
			if (err) client.logger.error(err);
			if (!data) {
				const newUser = new Schema({
					User: interaction.user.id,
					Genre: choice,
					Starred: [],
				});
				newUser.save().catch((err) => log.error(err));
				const embed = new Discord.MessageEmbed()
					.setAuthor({
						name: `Your favourite genre has been set to ${choice}.`,
						iconURL: interaction.user.avatarURL({ dynamic: true }),
					})
					.setColor("BLUE");
				interaction.reply({ embeds: [embed] });
			} else {
				if (data) {
					data.Genre = choice;
					data.save().catch((err) => log.error(err));

					const embed2 = new Discord.MessageEmbed()
						.setAuthor({
							name: `Favourite genre updated to ${choice}.`,
							iconURL: interaction.user.avatarURL({
								dynamic: true,
							}),
						})
						.setColor("BLUE");
					interaction.reply({ embeds: [embed2] });
				}
			}
		});
	},
};
