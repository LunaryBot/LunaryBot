const _client = require("../Lunary")
const Command = require("./Command")
const Discord = require("discord.js")
const Language = require("../languages/Language")

module.exports = class SubCommand {
    /**
    * @param {_client} client
    * @param {Command} mainCommand
    */
    constructor({
        name = null,
        description = null,
        aliases = null,
        dirname = null,
        subcommands = [],
        permissions = {},
        dm = false
    }, mainCommand, client) {
        this.client = client

        /**
         * @type {string}
         */
        this.name = name

        /**
         * @type {string}
         */
        this.description = description

        /**
         * @type {string[]}
         */
        this.aliases = aliases

        /**
         * @type {string}
         */
        this.dirname = dirname

        /**
         * @type {Command}
         */
        this.mainCommand = mainCommand

        /**
         * @type {SubCommand[]}
         */
        this.subcommands = subcommands

        /**
         * @type {object}
         */
        this.permissions = permissions

        /**
         * @type {boolean}
         */
        this.dm = dm
    }

    isDM() {
        return this.dm
    }

    verifyPerms(member, me) {
        let data = {
            me: {
                has: true
            },
            member: {
                has: true,
                type: "member"
            }
        }

        if(this.permissions.me) if(me.hasPermission(this.permissions.me)) data.me.has = false

        if(this.requires.owner) {
            if(!this.client.config.owners.includes(member.user.id)) data.member = {
                has: false,
                type: "owner"
            }
            else data.member = {
                has: true,
                type: "owner"
            }
        } else if(this.permissions.Discord) {
            if(!member.hasPermission(this.permissions.Discord)) data.member.has = false
            else data.member.has = true
        }

        return data
    }

    /**
     * @param {string}
     * @param {Discord.User|Discord.GuildMember} user
     */
    sendError(description, user) {
        if(user instanceof Discord.GuildMember) user = user.user
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${global.emojis.get("nop").mention} • ${description}**`)
        .setColor("#FF0000")
        .setTimestamp()

        if(user instanceof Discord.User) {
            embed
            .setFooter(user.tag, user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 }))
        }

        return embed
    }
}