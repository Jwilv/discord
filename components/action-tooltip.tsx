"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
    children: React.ReactNode,
    label: string,
    side?: "top" | "bottom" | "left" | "right",
    align?: "start" | "center" | "end"
}

export const ActionTooltip = ({
    children,
    label,
    side = "top",
    align = "start"
}: ActionTooltipProps) => {
    <TooltipProvider>
        <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent side={side}  align={align}>
                <p className="font-semibold text-sm capitalize">
                    {label.toLowerCase()}
                </p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}

