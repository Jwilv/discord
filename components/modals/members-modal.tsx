"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
} from "@/components/ui/dialog"


import { Title } from "@/components/modal";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, Gavel, Loader2, MoreVertical, RefreshCcw, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { manageModal } from "@/constants";
import { ServerWithMembersWhithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import { UserAvatar } from "../user-avatar";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "../ui/dropdown-menu";



export const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />
}

export const MembersModal = () => {

    const { type, isOpen, onClose, data, onOpen } = useModal();
    const { server } = data as { server: ServerWithMembersWhithProfiles }

    const [loadingId, setloadingId] = useState('');

    const isModalOpen = isOpen && type === 'manageMembers';

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <Title title={manageModal.title} />
                    <DialogDescription
                        className="text-center text-zinc-500"
                    >
                        {server?.members?.length} Members
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="mt-8 max-h-[420px] pr-6">
                    {server?.members?.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-x-2 mb-6"
                        >
                            <UserAvatar src={member.imageUrl} />
                            <div className="flex flex-col gap-y-1">
                                <div className="text-xs font-semibold flex items-center gap-x-1">
                                    {member.name}
                                    {roleIconMap[member.role]}
                                </div>
                            </div>
                            {
                                server.profileId !== member.profileId
                                &&
                                loadingId !== member.id
                                &&
                                (
                                    <div className="ml-auto">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className="focus:outline-none">
                                                <MoreVertical className="h-4 w-4 text-zin-500" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent side="left">
                                                <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger
                                                        className="flex items-center"
                                                    >
                                                        <ShieldQuestion
                                                            className="h-4 w-4 mr-2"
                                                        />
                                                        <span>Role</span>
                                                    </DropdownMenuSubTrigger>
                                                    <DropdownMenuPortal>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>
                                                                <Shield className="h-4 w-4 mr-2" />
                                                                Guest
                                                                {
                                                                    member.role === 'GUEST'
                                                                    &&
                                                                    <Check className="h-4 w-4 ml-auto" />
                                                                }
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <ShieldCheck className="h-4 w-4 mr-2" />
                                                                Guest
                                                                {
                                                                    member.role === 'MODERATOR'
                                                                    &&
                                                                    <Check className="h-4 w-4 ml-auto" />
                                                                }
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuPortal>
                                                </DropdownMenuSub>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Gavel className="h-4 w-4 mr-2" />
                                                    Kick
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )
                            }
                            {
                                loadingId === member.id
                                &&
                                <Loader2 className="animate-spin text-zinc-500 ml-auto w-4 h-4" />
                            }
                        </div>
                    ))}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}