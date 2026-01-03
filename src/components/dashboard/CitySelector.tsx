import { useState } from "react";
import { cities } from "@/data/mockData";
import { MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 bg-card hover:bg-secondary/50 border-border h-8 px-3 text-sm"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium">{selectedCity}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-40 bg-card">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city}
            onClick={() => onCityChange(city)}
            className={city === selectedCity ? "bg-secondary" : ""}
          >
            <MapPin className="h-3.5 w-3.5 mr-2 text-primary" />
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
