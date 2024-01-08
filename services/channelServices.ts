import { channelAdapter } from "@/adapters/channelAdapter";
import { db } from "@/lib/db"
import { ChannelType, MemberRole } from "@prisma/client";


export const getChannelsBySerberId = async (serverId: string) => {

    const channels = await db.channel.findMany({
        where: {
            serverId
        },
        orderBy: {
            createdAt: 'asc'
        }
    });

    return channelAdapter(channels)
}

interface CreateChannelProps {
    serverId: string
    name: string
    type: ChannelType
    profileId: string
}

export const createChannel = async ({ serverId, name, type, profileId }: CreateChannelProps) => {

    const server = await db.server.update({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                    role: {
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                    }
                }
            }
        },
        data: {
            channels: {
                create: {
                    profileId,
                    name,
                    type,
                }
            }
        }
    });

    return server
}

interface deleteProps {
    serverId: string;
    channelId: string;
    profileId: string;
}

export const deleteChannel = async ({ serverId, channelId, profileId }: deleteProps) => {
    const server = await db.server.update({
        where: {
            id: serverId,
            members: {
                some: {
                    profileId,
                    role: {
                        in: [MemberRole.MODERATOR, MemberRole.ADMIN]
                    }
                }
            }
        },
        data: {
            channels: {
                delete: {
                    id: channelId,
                    name:{
                        not: 'general'
                    }
                }
            }
        }
    });

    return server
}