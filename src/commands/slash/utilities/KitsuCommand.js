const Command = require("../../../structures/Command")
const KitsuAnimeSubCommand = require("./KitsuAnimeSubCommand")
const KitsuMangaSubCommand = require("./KitsuMangaSubCommand")

module.exports = class KitsuCommand extends Command {
    constructor(client) {
        super({
            name: "kitsu",
            dirname: __dirname,
            baseCommand: true
        }, client)

        this.subcommands = [new KitsuMangaSubCommand(client, this), new KitsuAnimeSubCommand(client, this)]
    }
}