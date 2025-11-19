"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useGlobalStore from "@/store/Global";

import { Grid, List } from "lucide-react";
import { useTranslations } from "next-intl";
const ToggleViewLayout = () => {
  const t = useTranslations("ToggleViewLayout");
  const { setIsViewGrid } = useGlobalStore();
  return (
    <div className="gap-2 cursor-pointer hidden sm:flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Grid className="w-6 h-6" onClick={() => setIsViewGrid(true)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("viewGrid")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <List className="w-6 h-6" onClick={() => setIsViewGrid(false)} />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t("viewList")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToggleViewLayout;
