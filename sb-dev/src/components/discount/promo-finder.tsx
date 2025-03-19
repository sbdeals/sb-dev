"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, CheckCircle, XCircle, AlertTriangle, Clock, Sparkle, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface PromoCode {
  code: string
  discount: number | string
  discountType: 'percentage' | 'fixed' | 'free-item'
  description: string
  expiryDate: string
  verified: boolean
  successRate: number
  restrictionText?: string
  firstOrderOnly?: boolean
  platform: string
}

interface PromoFinderProps {
  promoCodes: {
    all: PromoCode[]
    recommended: PromoCode[]
  }
  selectedPlatform: string
  onApplyPromo: (code: string) => void
}

export function PromoFinder({ promoCodes, selectedPlatform, onApplyPromo }: PromoFinderProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const platformSpecificCodes = React.useMemo(() => {
    return promoCodes.all.filter(promo =>
      promo.platform.toLowerCase() === selectedPlatform.toLowerCase()
    )
  }, [promoCodes.all, selectedPlatform])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(`Promo code ${code} copied to clipboard!`)

    setTimeout(() => {
      setCopiedCode(null)
    }, 3000)
  }

  const formatDiscount = (promo: PromoCode) => {
    if (promo.discountType === 'percentage') {
      return `${promo.discount}% off`
    } else if (promo.discountType === 'fixed') {
      return `$${promo.discount} off`
    } else {
      return promo.discount
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Discount Maximizer</h2>
        <p className="text-muted-foreground">
          Find and apply the best promo codes for {selectedPlatform}
        </p>
      </div>

      <Tabs defaultValue="recommended">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="recommended">
            <Sparkle className="mr-2 h-4 w-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="platform">
            <span className="capitalize">{selectedPlatform}</span>
          </TabsTrigger>
          <TabsTrigger value="all">All Codes</TabsTrigger>
        </TabsList>

        <TabsContent value="recommended" className="space-y-4 pt-4">
          {promoCodes.recommended.length > 0 ? (
            promoCodes.recommended.map(promo => (
              <PromoCodeCard
                key={promo.code}
                promo={promo}
                copiedCode={copiedCode}
                onCopy={handleCopyCode}
                onApply={onApplyPromo}
                highlighted
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Recommended Codes</h3>
              <p className="text-muted-foreground max-w-md mt-1">
                We couldn't find any recommended codes for this order. Check the platform-specific tab for more options.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="platform" className="space-y-4 pt-4">
          {platformSpecificCodes.length > 0 ? (
            platformSpecificCodes.map(promo => (
              <PromoCodeCard
                key={promo.code}
                promo={promo}
                copiedCode={copiedCode}
                onCopy={handleCopyCode}
                onApply={onApplyPromo}
                highlighted={promoCodes.recommended.some(p => p.code === promo.code)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium">No Platform Codes</h3>
              <p className="text-muted-foreground max-w-md mt-1">
                We couldn't find any active codes for {selectedPlatform}. Check the all codes tab for more options.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 pt-4">
          {promoCodes.all.map(promo => (
            <PromoCodeCard
              key={promo.code}
              promo={promo}
              copiedCode={copiedCode}
              onCopy={handleCopyCode}
              onApply={onApplyPromo}
              highlighted={promoCodes.recommended.some(p => p.code === promo.code)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface PromoCodeCardProps {
  promo: PromoCode
  copiedCode: string | null
  onCopy: (code: string) => void
  onApply: (code: string) => void
  highlighted?: boolean
}

function PromoCodeCard({ promo, copiedCode, onCopy, onApply, highlighted }: PromoCodeCardProps) {
  const formatDiscount = () => {
    if (promo.discountType === 'percentage') {
      return `${promo.discount}% off`
    } else if (promo.discountType === 'fixed') {
      return `$${promo.discount} off`
    } else {
      return promo.discount
    }
  }

  return (
    <Card className={highlighted ? "border-green-500 dark:border-green-700" : ""}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base flex items-center">
              {formatDiscount()}
              {highlighted && (
                <Badge className="ml-2 bg-green-500 hover:bg-green-600">Recommended</Badge>
              )}
              {promo.firstOrderOnly && (
                <Badge variant="outline" className="ml-2">First Order Only</Badge>
              )}
            </CardTitle>
            <CardDescription>{promo.description}</CardDescription>
          </div>
          <Badge variant="outline" className="capitalize">{promo.platform}</Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-muted p-2 rounded font-mono text-sm mr-2">
              {promo.code}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onCopy(promo.code)}
            >
              {copiedCode === promo.code ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy code</span>
            </Button>
          </div>
          <div className="flex items-center">
            <VerificationBadge verified={promo.verified} successRate={promo.successRate} />
          </div>
        </div>

        {promo.restrictionText && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
            {promo.restrictionText}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          Expires: {promo.expiryDate}
        </div>
        <Button
          size="sm"
          onClick={() => onApply(promo.code)}
          className={highlighted ? "bg-green-500 hover:bg-green-600" : ""}
        >
          <Zap className="mr-1 h-4 w-4" />
          Apply Code
        </Button>
      </CardFooter>
    </Card>
  )
}

interface VerificationBadgeProps {
  verified: boolean
  successRate: number
}

function VerificationBadge({ verified, successRate }: VerificationBadgeProps) {
  if (verified) {
    return (
      <div className="flex items-center text-xs text-green-600">
        <CheckCircle className="h-3 w-3 mr-1" />
        Verified
      </div>
    )
  }

  if (successRate >= 75) {
    return (
      <div className="flex items-center text-xs text-amber-600">
        <AlertTriangle className="h-3 w-3 mr-1" />
        {successRate}% success
      </div>
    )
  }

  return (
    <div className="flex items-center text-xs text-red-600">
      <XCircle className="h-3 w-3 mr-1" />
      Low success
    </div>
  )
}
