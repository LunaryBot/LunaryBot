import Command, { SubCommand, LunarClient, IContextInteractionCommand } from "../../../../structures/Command";

class AdvUserSubCommand extends SubCommand {
    constructor(client: LunarClient, mainCommand: Command) {
        super(client, {
            name: 'user',
            dirname: __dirname,
            permissions: {
                me: ["banMembers"],
                bot: ["lunaBanMembers"],
                discord: ["banMembers"],
            },
            guildOnly: true,
            cooldown: 3,
        }, mainCommand);
    }

    public async run(context: IContextInteractionCommand) {
        context.interaction.createMessage({
            content: 'a'
        })
    }
}

export default AdvUserSubCommand;