import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FloatingSupport = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <a
        href="https://wa.me/+34123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="right-6 bottom-6 z-50 fixed"
      >
        <Button
          variant="default"
          size="icon"
          className="flex justify-center items-center bg-green-500 hover:bg-green-600 shadow-lg rounded-full w-14 h-14 cursor-pointer"
        >
          <MessageCircle className="w-8 h-8 text-white" />
        </Button>
      </a>
    </TooltipTrigger>
    <TooltipContent side="left">
      <p>¿Necesitas ayuda con tu compra? Contacta con un asesor</p>
    </TooltipContent>
  </Tooltip>
);
