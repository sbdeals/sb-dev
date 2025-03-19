export interface CreditCard {
  issuer: string;
  name: string;
  id: string;
}

export const creditCards: CreditCard[] = [
  // Capital One Cards
  { issuer: "Cap one", name: "Platinum Mastercard®", id: "cap-one-platinum" },
  { issuer: "Cap one", name: "VentureOne Rewards", id: "cap-one-ventureone" },
  { issuer: "Cap one", name: "Capital One Savor", id: "cap-one-savor" },
  { issuer: "Cap one", name: "Capital One Quicksilver", id: "cap-one-quicksilver" },
  { issuer: "Cap one", name: "Capital One QuicksilverOne", id: "cap-one-quicksilverone" },
  { issuer: "Cap one", name: "Kohl's Rewards® Visa", id: "cap-one-kohls" },
  { issuer: "Cap one", name: "REI Co-op® Mastercard®", id: "cap-one-rei" },
  { issuer: "Cap one", name: "Pottery Barn Key Rewards Visa", id: "cap-one-pottery-barn" },
  { issuer: "Cap one", name: "Williams Sonoma Key Rewards Visa", id: "cap-one-williams-sonoma" },
  { issuer: "Cap one", name: "West Elm Key Rewards Visa", id: "cap-one-west-elm" },
  { issuer: "Cap one", name: "The Key Rewards Visa", id: "cap-one-key-rewards" },
  { issuer: "Cap one", name: "Cabela's CLUB Card", id: "cap-one-cabelas" },
  { issuer: "Cap one", name: "Bass Pro Shops CLUB Card", id: "cap-one-bass-pro" },
  { issuer: "Cap one", name: "BJ's One™ Mastercard®", id: "cap-one-bjs-one" },
  { issuer: "Cap one", name: "BJ's One+™ Mastercard®", id: "cap-one-bjs-one-plus" },
  { issuer: "Cap one", name: "Capital One Venture Rewards", id: "cap-one-venture" },
  { issuer: "Cap one", name: "Capital One Venture X", id: "cap-one-venture-x" },

  // Chase Cards
  { issuer: "Chase", name: "Prime Visa", id: "chase-prime" },
  { issuer: "Chase", name: "Amazon Visa", id: "chase-amazon" },
  { issuer: "Chase", name: "Freedom Unlimited®", id: "chase-freedom-unlimited" },
  { issuer: "Chase", name: "Freedom Flex®", id: "chase-freedom-flex" },
  { issuer: "Chase", name: "Freedom Rise®", id: "chase-freedom-rise" },
  { issuer: "Chase", name: "Sapphire Preferred®", id: "chase-sapphire-preferred" },
  { issuer: "Chase", name: "Sapphire Reserve®", id: "chase-sapphire-reserve" },
  { issuer: "Chase", name: "Slate Edge®", id: "chase-slate-edge" },
  { issuer: "Chase", name: "Southwest Rapid Rewards® Plus", id: "chase-southwest-plus" },
  { issuer: "Chase", name: "Southwest Rapid Rewards® Premier", id: "chase-southwest-premier" },
  { issuer: "Chase", name: "Southwest Rapid Rewards® Priority", id: "chase-southwest-priority" },
  { issuer: "Chase", name: "United Gateway", id: "chase-united-gateway" },
  { issuer: "Chase", name: "United Explorer Card", id: "chase-united-explorer" },
  { issuer: "Chase", name: "United Quest Card", id: "chase-united-quest" },
  { issuer: "Chase", name: "United Club Infinite Card", id: "chase-united-club-infinite" },
  { issuer: "Chase", name: "Marriott Bonvoy Boundless®", id: "chase-marriott-boundless" },
  { issuer: "Chase", name: "Marriott Bonvoy Bountiful®", id: "chase-marriott-bountiful" },
  { issuer: "Chase", name: "Marriott Bonvoy Bold®", id: "chase-marriott-bold" },
  { issuer: "Chase", name: "IHG One Rewards Traveler", id: "chase-ihg-traveler" },
  { issuer: "Chase", name: "IHG Premier", id: "chase-ihg-premier" },
  { issuer: "Chase", name: "Disney® Premier Visa® Card", id: "chase-disney-premier" },
  { issuer: "Chase", name: "Disney® Visa® Card", id: "chase-disney-visa" },
  { issuer: "Chase", name: "World of Hyatt", id: "chase-hyatt" },
  { issuer: "Chase", name: "Aeroplan® Card", id: "chase-aeroplan" },
  { issuer: "Chase", name: "British Airways Visa Signature®", id: "chase-british-airways" },
  { issuer: "Chase", name: "Aer Lingus Visa Signature®", id: "chase-aer-lingus" },
  { issuer: "Chase", name: "Iberia Visa Signature®", id: "chase-iberia" },
  { issuer: "Chase", name: "DoorDash Rewards Mastercard®", id: "chase-doordash" },
  { issuer: "Chase", name: "Instacart Mastercard®", id: "chase-instacart" },

  // Bank of America Cards
  { issuer: "Bank of America®", name: "Customized Cash Rewards", id: "boa-cash-rewards" },
  { issuer: "Bank of America®", name: "Unlimited Cash Rewards", id: "boa-unlimited-cash" },
  { issuer: "Bank of America®", name: "Premium Rewards®", id: "boa-premium" },
  { issuer: "Bank of America®", name: "Premium Rewards® Elite", id: "boa-premium-elite" },
  { issuer: "Bank of America®", name: "Travel Rewards", id: "boa-travel" },
  { issuer: "Bank of America®", name: "Alaska Mileage Plan", id: "boa-alaska" },

  // American Express Cards
  { issuer: "Amex", name: "American Express Green Card", id: "amex-green" },
  { issuer: "Amex", name: "Blue Cash Preferred®", id: "amex-blue-cash-preferred" },
  { issuer: "Amex", name: "Blue Cash Everyday®", id: "amex-blue-cash-everyday" },
  { issuer: "Amex", name: "Gold Card", id: "amex-gold" },
  { issuer: "Amex", name: "The Platinum Card®", id: "amex-platinum" },
  { issuer: "Amex", name: "Charles Schwab Platinum", id: "amex-schwab-platinum" },
  { issuer: "Amex", name: "Hilton Honors", id: "amex-hilton" },
  { issuer: "Amex", name: "Hilton Surpass", id: "amex-hilton-surpass" },
  { issuer: "Amex", name: "Hilton Aspire", id: "amex-hilton-aspire" },
  { issuer: "Amex", name: "Delta SkyMiles® Blue", id: "amex-delta-blue" },
  { issuer: "Amex", name: "Delta SkyMiles® Gold", id: "amex-delta-gold" },
  { issuer: "Amex", name: "Delta SkyMiles® Platinum", id: "amex-delta-platinum" },
  { issuer: "Amex", name: "Delta SkyMiles® Reserve", id: "amex-delta-reserve" },
  { issuer: "Amex", name: "Marriott Bonvoy Brilliant®", id: "amex-marriott-brilliant" },
  { issuer: "Amex", name: "Marriott Bonvoy Bevy®", id: "amex-marriott-bevy" },

  // Citi Cards
  { issuer: "Citi", name: "Citi Double Cash®", id: "citi-double-cash" },
  { issuer: "Citi", name: "Citi Custom Cash®", id: "citi-custom-cash" },
  { issuer: "Citi", name: "Citi Rewards+® Student", id: "citi-rewards-student" },
  { issuer: "Citi", name: "Citi Premier® Card", id: "citi-premier" },
  { issuer: "Citi", name: "Costco Anywhere Visa® Card by Citi", id: "citi-costco" },
  { issuer: "Citi", name: "Shop Your Way", id: "citi-shop-your-way" },
  { issuer: "Citi", name: "Strata Premier", id: "citi-strata-premier" },
  { issuer: "Citi", name: "AAdvantage Platinum Select", id: "citi-aadvantage-platinum" },
  { issuer: "Citi", name: "Citi Rewards+ Card", id: "citi-rewards-plus" },

  // Wells Fargo Cards
  { issuer: "WFC", name: "Wells Fargo Active Cash®", id: "wfc-active-cash" },
  { issuer: "WFC", name: "Wells Fargo Attune®", id: "wfc-attune" },
  { issuer: "WFC", name: "Wells Fargo Autograph℠ Card", id: "wfc-autograph" },
  { issuer: "WFC", name: "Wells Fargo Reflect® Card", id: "wfc-reflect" },
  { issuer: "WFC", name: "Wells Fargo Autograph Journey℠ Card", id: "wfc-autograph-journey" },
  { issuer: "WFC", name: "Wells Fargo Bilt Rewards", id: "wfc-bilt" },
  { issuer: "WFC", name: "Wells Fargo Choice Privileges Select", id: "wfc-choice-privileges" },
  { issuer: "WFC", name: "Wells Fargo OneKey+", id: "wfc-onekey-plus" },

  // US Bank Cards
  { issuer: "US Bank", name: "US Bank Cash+®", id: "usbank-cash-plus" },
  { issuer: "US Bank", name: "US Bank Shopper Cash Rewards", id: "usbank-shopper-cash" },
  { issuer: "US Bank", name: "US Bank Altitude Go", id: "usbank-altitude-go" },
  { issuer: "US Bank", name: "US Bank Altitude Reserve", id: "usbank-altitude-reserve" },

  // Other Cards
  { issuer: "Affinity FCU", name: "Cash Rewards", id: "affinity-cash-rewards" },
  { issuer: "Discover", name: "Discover It", id: "discover-it" },
  { issuer: "Elan Financial via Harborstone", name: "MCP", id: "elan-harborstone-mcp" },
  { issuer: "Elan Financial via SouthState", name: "MCP", id: "elan-southstate-mcp" },
  { issuer: "FNBO", name: "Amtrack Guest Rewards Preferred", id: "fnbo-amtrack" },
  { issuer: "Navy Federal", name: "Platinum", id: "navy-federal-platinum" },
  { issuer: "PenFed", name: "Pathfinder", id: "penfed-pathfinder" },
  { issuer: "Synchrony", name: "Amazon Store Card", id: "synchrony-amazon" },
  { issuer: "Target/TD Bank", name: "Target Circle Card", id: "target-circle" },
  { issuer: "USAA", name: "Cashback Rewards Plus", id: "usaa-cashback-rewards-plus" },
  { issuer: "USAA", name: "Preferred Cash Rewards", id: "usaa-preferred-cash" },
];

// Group cards by issuer for easier display
export const cardsByIssuer = creditCards.reduce((groups, card) => {
  const issuer = card.issuer;
  if (!groups[issuer]) {
    groups[issuer] = [];
  }
  groups[issuer].push(card);
  return groups;
}, {} as Record<string, CreditCard[]>);

// Get list of unique issuers
export const cardIssuers = Object.keys(cardsByIssuer);
