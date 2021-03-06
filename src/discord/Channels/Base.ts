import Structure from '../Base';
import type { MixChannel } from './Utils';

import { ChannelType } from 'types/discord';
import type {
	GuildTextChannel,
} from './TextChannels';

type ChannelData<T extends ChannelType> = MixChannel<T, { [key: string]: any }>;

export class Channel<T extends ChannelType = ChannelType> extends Structure {
	/** The unique ID of the channel. */
	public readonly id: string;
	/** The numerical type of the channel. */
	public readonly type: ChannelType;
	/** The name of the channel. */
	public readonly name?: string;

	public constructor(client: LunaryClient, data: ChannelData<T>) {
		super(client);

		this.id = data.id;
		this.type = data.type;
		this.name = data.name;
	}

	public isGuildTextChannel(): this is GuildTextChannel {
		return this.type === ChannelType.GuildText;
	}

	// public isDMChannel(): this is DMChannel {
	// 	return this.type === ChannelType.DM;
	// }

	// public isGuildVoiceChannel(): this is GuildVoiceChannel {
	// 	return this.type === ChannelType.GuildVoice;
	// }

	// public isGroupDMChannel(): this is GroupDMChannel {
	// 	return this.type === ChannelType.GroupDM;
	// }

	// public isGuildNewsChannel(): this is GuildNewsChannel {
	// 	return this.type === ChannelType.GuildNews;
	// }

	public toString() {
		return `<#${this.id}>`;
	}
}