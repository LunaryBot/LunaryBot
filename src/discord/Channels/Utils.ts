import { PermissionOverwrite } from '../Permissions';
import type { Guild } from '../Guilds';
import {
	APIChannel,
	APIChannelBase,
	APIInteractionDataResolvedChannel,
	ChannelType,
} from 'types/discord';
  
export type MixChannel<T extends ChannelType, X> = (APIChannelBase<T> | APIInteractionDataResolvedChannel) & X;

export interface GuildChannel {
    guild?: Guild;

    permissionOverwrites: ReadonlyArray<PermissionOverwrite>;

    parentId?: string;
}