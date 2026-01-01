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
          className="gap-2 bg-card hover:bg-secondary/50 border-border"
        >
          <MapPin className="h-4 w-4 text-primary" />
          <span className="font-medium">{selectedCity}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {cities.map((city) => (
          <DropdownMenuItem
            key={city}
            onClick={() => onCityChange(city)}
            className={city === selectedCity ? "bg-secondary" : ""}
          >
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            {city}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
