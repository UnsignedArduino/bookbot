import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../structures/event";
import { ExtendedInteraction } from "../typings/command";
import { client } from "../index";

export default new Event("interactionCreate", async (interaction) => {
	if (interaction.isCommand()) {
		const cmd = client.commands.get(interaction.commandName);
		if (!cmd) {
			return interaction.reply({ content: "An error has occured " });
		}

		const args = [];

		for (let option of interaction.options.data) {
			if (option.type === "SUB_COMMAND") {
				if (option.name) args.push(option.name);
				option.options?.forEach((x) => {
					if (x.value) args.push(x.value);
				});
			} else if (option.value) args.push(option.value);
		}
		interaction.member = interaction.guild.members.cache.get(
			interaction.user.id,
		);

		cmd.run({
			args: interaction.options as CommandInteractionOptionResolver,
			client,
			interaction: interaction as ExtendedInteraction
		});
	}

	// Context Menu Handling
	if (interaction.isContextMenu()) {
		await interaction.deferReply({ ephemeral: false });
		const command = client.commands.get(interaction.commandName);
		if (command) {
			command.run({
				args: interaction.options as CommandInteractionOptionResolver,
				client,
				interaction: interaction as ExtendedInteraction
			});
		}
	}
});

