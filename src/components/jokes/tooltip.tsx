import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import React from "react";

interface CustomToolTipType {
    children: React.ReactNode;
    content: string;
    
}

const CustomToolTip: React.FC<CustomToolTipType> = ({children,content}) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
           {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  export default CustomToolTip