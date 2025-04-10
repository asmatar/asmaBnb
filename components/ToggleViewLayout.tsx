"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGlobalStore from "@/store/Global";

import { Grid, List } from "lucide-react";
const ToggleViewLayout = () => {
  const { setIsViewGrid } = useGlobalStore();
  return (
    <div className="flex gap-2 cursor-pointer">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Grid className="w-6 h-6" onClick={() => setIsViewGrid(true)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Voir en grille</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <List className="w-6 h-6" onClick={() => setIsViewGrid(false)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>Voir en collone</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToggleViewLayout;
