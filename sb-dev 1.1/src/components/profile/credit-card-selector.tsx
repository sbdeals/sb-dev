"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, CreditCard, XCircle, CheckIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { creditCards, cardsByIssuer, cardIssuers } from "@/lib/credit-cards-data";
import { useProfile } from "@/lib/contexts/profile-context";
import { Input } from "@/components/ui/input";

interface CreditCardSelectorProps {
  className?: string;
}

export function CreditCardSelector({ className }: CreditCardSelectorProps) {
  const { profile, addCreditCard, removeCreditCard } = useProfile();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [localSelectedCardIds, setLocalSelectedCardIds] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initialize selected cards from profile when component mounts
  useEffect(() => {
    if (profile?.creditCards) {
      setLocalSelectedCardIds(profile.creditCards);
    }
  }, [profile?.creditCards]);

  // Focus search input when popover opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  if (!profile) {
    return null;
  }

  // Get full card objects from IDs
  const selectedCards = creditCards.filter(card =>
    localSelectedCardIds.includes(card.id)
  );

  // Format card name for display
  const formatCardName = (issuer: string, name: string) => {
    return issuer === "Cap one" ? `Capital One ${name}` : `${issuer} ${name}`;
  };

  // Handle card selection/deselection with local state management
  const handleCardToggle = async (cardId: string) => {
    const isSelected = localSelectedCardIds.includes(cardId);

    if (isSelected) {
      // Remove card from local state first for immediate UI feedback
      const updatedCards = localSelectedCardIds.filter(id => id !== cardId);
      setLocalSelectedCardIds(updatedCards);

      // Then try to update the profile
      try {
        await removeCreditCard(cardId);
      } catch (error) {
        console.error("Error removing card:", error);
        // If there's an error, revert the local state
        setLocalSelectedCardIds(localSelectedCardIds);
      }
    } else {
      // Add card to local state first for immediate UI feedback
      const updatedCards = [...localSelectedCardIds, cardId];
      setLocalSelectedCardIds(updatedCards);

      // Then try to update the profile
      try {
        await addCreditCard(cardId);
      } catch (error) {
        console.error("Error adding card:", error);
        // If there's an error, revert the local state
        setLocalSelectedCardIds(localSelectedCardIds);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background border-input text-sm h-10 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <span>
                {localSelectedCardIds.length > 0
                  ? `${localSelectedCardIds.length} card${localSelectedCardIds.length > 1 ? "s" : ""} selected`
                  : "Select credit cards"}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[360px] p-0 shadow-md border border-gray-200" align="start" sideOffset={5}>
          <div className="flex items-center border-b px-3 py-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground mr-2" />
            <input
              ref={searchInputRef}
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search credit cards..."
              className="flex w-full bg-transparent outline-none text-sm"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto py-2">
            {cardIssuers.map((issuer) => {
              // Filter cards by search term
              const filteredCards = cardsByIssuer[issuer].filter(card =>
                `${card.issuer} ${card.name}`.toLowerCase().includes(searchValue.toLowerCase())
              );

              if (filteredCards.length === 0) return null;

              return (
                <div key={issuer} className="px-1 py-1.5">
                  <div className="text-xs font-semibold text-muted-foreground px-3 pb-1 uppercase tracking-wider">
                    {issuer === "Cap one" ? "Capital One" : issuer}
                  </div>
                  <div>
                    {filteredCards.map((card) => {
                      const isSelected = localSelectedCardIds.includes(card.id);
                      return (
                        <div
                          key={card.id}
                          onClick={() => handleCardToggle(card.id)}
                          className={cn(
                            "flex items-center justify-between px-3 py-1.5 text-sm cursor-pointer hover:bg-muted rounded-sm",
                            isSelected ? "text-primary font-medium" : ""
                          )}
                        >
                          <span>{card.name}</span>
                          {isSelected && (
                            <CheckIcon className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-center text-sm"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {selectedCards.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedCards.map((card) => (
            <Badge
              key={card.id}
              variant="secondary"
              className="flex items-center gap-1 py-1.5 pl-2 pr-1.5"
            >
              <span>{formatCardName(card.issuer, card.name)}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1 rounded-full hover:bg-transparent"
                onClick={() => handleCardToggle(card.id)}
              >
                <XCircle className="h-4 w-4" />
                <span className="sr-only">Remove {card.name}</span>
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
