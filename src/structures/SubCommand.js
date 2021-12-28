const _client = require('../Lunary.js');
const Command = require('./Command.js');
const Discord = require('../lib');
const utils = require('../utils/index.js');

module.exports = class SubCommand {
	/**
	 * @param {_client} client
	 * @param {Command} mainCommand
	 */
	constructor({ name = null, description = null, aliases = null, dirname = null, subcommands = [], permissions = {}, dm, premium_type = null }, mainCommand, client) {
		this.client = client;

		/**
		 * @type {string}
		 */
		this.name = name;

		/**
		 * @type {string}
		 */
		this.description = description;

		/**
		 * @type {string[]}
		 */
		this.aliases = aliases;

		/**
		 * @type {string}
		 */
		this.dirname = dirname;

		/**
		 * @type {Command}
		 */
		this.mainCommand = mainCommand;

		/**
		 * @type {SubCommand[]|CommandGroup[]}
		 */
		this.subcommands = subcommands;

		/**
		 * @type {object}
		 */
		this.permissions = permissions;

		/**
		 * @type {boolean}
		 */
		this.dm = dm;

		/**
		 * @type {boolean}
		 */
		this.premium_type = premium_type
	}

	get fullName() {
		return `${this.mainCommand.fullName} ${this.name}`;
	}

	get utils() {
		return utils;
	}

	isDM() {
		return this.dm;
	}

	/**
	 * @param {Discord.GuildMember} member
	 * @param {Discord.GuildMember} me
	 * @param {Discord.BitField} lunyPermissions
	 */
	verifyPerms(member, me, lunyPermissions) {
		const data = {
			me: {
				has: true,
			},
			member: {
				has: true,
			},
		};

		if (this.permissions.me) if (!me.permissions.has(this.permissions.me)) data.me.has = false;

		if (this.permissions.Discord) {
			if (!member.permissions.has(this.permissions.Discord)) data.member.has = false;
		}

		if (this.permissions.Bot && lunyPermissions && !data.member.has) {
			if (lunyPermissions.has(this.permissions.Bot)) data.member.has = true;
		}

		return data;
	}

	/**
	 * @param {string}
	 * @param {Discord.User|Discord.GuildMember} user
	 */
	sendError(description, user) {
		if (user instanceof Discord.GuildMember) user = user.user;

		const embed = new Discord.MessageEmbed()
			.setDescription(`**${global.emojis.get('nop').mention} • ${description}**`)
			.setColor('#FF0000')
			.setTimestamp();

		if (user instanceof Discord.User) {
			embed.setFooter(
				user.tag,
				user.displayAvatarURL({
					dynamic: true,
					format: 'png',
					size: 1024,
				}),
			);
		}

		return embed;
	}

	static get CommandGroup() {
		return CommandGroup;
	}
};

class CommandGroup {
	/**
	 * @param {Command} mainCommand
	 * @param {_client} client
	 */
	constructor({ name, __dirname, subcommands }, mainCommand, client) {
		this.client = client;

		/**
		 * @type {string}
		 */
		this.name = name;

		/**
		 * @type {string}
		 */
		this.dirname = __dirname;

		/**
		 * @type {SubCommand[]}
		 */
		this.subcommands = subcommands;

		/**
		 * @type {Command[]}
		 */
		this.mainCommand = mainCommand;

		/**
		 * @type {boolean}
		 */
		this.baseCommand = true;
	}

	get fullName() {
		return `${this.mainCommand.fullName} ${this.name}`;
	}
}
