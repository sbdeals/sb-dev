"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Check, AlertCircle, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'

interface PaymentMethod {
  id: string
  name: string
  type: 'credit' | 'debit' | 'paypal' | 'applepay' | 'googlepay'
  last4?: string
  rewardRate: number
  rewardType: string
  estimatedReward: number
  isOptimal: boolean
  restrictions?: string[]
}

interface PaymentOptimizerProps {
  paymentMethods: PaymentMethod[]
  orderTotal: number
  onSelectPayment: (id: string) => void
  platform: string
}

export function PaymentOptimizer({
  paymentMethods,
  orderTotal,
  onSelectPayment,
  platform
}: PaymentOptimizerProps) {
  const optimalMethod = React.useMemo(() => {
    return paymentMethods.find(method => method.isOptimal) || paymentMethods[0]
  }, [paymentMethods])

  const sortedMethods = React.useMemo(() => {
    return [...paymentMethods].sort((a, b) => b.estimatedReward - a.estimatedReward)
  }, [paymentMethods])

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">Payment Method Optimizer</h2>
        <p className="text-muted-foreground">
          Choose the best payment method to maximize your rewards on {platform}
        </p>
      </div>

      <Card className="border-green-500 dark:border-green-700 ring-1 ring-green-500 dark:ring-green-700">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span>Recommended Payment Method</span>
            <Badge className="bg-green-500 hover:bg-green-600">Best Value</Badge>
          </CardTitle>
          <CardDescription>
            This payment method will maximize your rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{optimalMethod.name}</p>
                {optimalMethod.last4 && (
                  <p className="text-sm text-muted-foreground">····{optimalMethod.last4}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{optimalMethod.rewardRate}% {optimalMethod.rewardType}</p>
              <p className="text-sm text-green-600">
                +${optimalMethod.estimatedReward.toFixed(2)} value
              </p>
            </div>
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => onSelectPayment(optimalMethod.id)}
          >
            Use This Payment Method
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold">All Payment Methods</h3>
        <p className="text-sm text-muted-foreground">
          Comparing rewards across {paymentMethods.length} payment methods
        </p>
      </div>

      <div className="space-y-3">
        {sortedMethods.map(method => (
          <div
            key={method.id}
            className={`p-3 rounded-lg border flex items-center justify-between
              ${method.isOptimal ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900' : 'bg-background'}
            `}
          >
            <div className="flex items-center">
              <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center">
                  <p className="font-medium">{method.name}</p>
                  {method.isOptimal && (
                    <Badge className="ml-2 bg-green-500 hover:bg-green-600">Best</Badge>
                  )}
                </div>
                {method.last4 && (
                  <p className="text-xs text-muted-foreground">····{method.last4}</p>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-right mr-3">
                <p className="font-medium">{method.rewardRate}% {method.rewardType}</p>
                <p className="text-xs text-muted-foreground">
                  ${method.estimatedReward.toFixed(2)} on ${orderTotal.toFixed(2)}
                </p>
              </div>

              {method.restrictions && method.restrictions.length > 0 && (
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Restrictions</span>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Reward Restrictions</h4>
                      <div className="text-sm space-y-1">
                        {method.restrictions.map((restriction, i) => (
                          <div key={i} className="flex">
                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
                            <p>{restriction}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectPayment(method.id)}
              >
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
