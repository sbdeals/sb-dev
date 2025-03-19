"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shell } from "@/components/layout/shell"
import {
  BarChart3,
  Search,
  ShoppingCart,
  CreditCard,
  Tags,
  Zap,
  ArrowRight
} from "lucide-react"
import { motion } from "framer-motion"
import {
  fadeIn,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItems
} from "@/lib/utils"

export default function Home() {
  return (
    <Shell>
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
            >
              <div className="space-y-2">
                <motion.h1
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                  variants={fadeInUp}
                >
                  Save on Food Delivery with SwiftBurst
                </motion.h1>
                <motion.p
                  className="max-w-[600px] text-zinc-500 md:text-xl dark:text-zinc-400"
                  variants={fadeInUp}
                >
                  Compare prices across multiple food delivery platforms and save money with real-time discounts,
                  promo codes, and payment optimization.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col gap-2 min-[400px]:flex-row"
                variants={fadeInUp}
              >
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/restaurants">
                    Explore Restaurants
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial="hidden"
              animate="visible"
              variants={fadeInRight}
            >
              <div className="relative h-[600px] w-[350px] rounded-2xl bg-gradient-to-b from-teal-500 to-green-500 p-1">
                <div className="absolute inset-0 rounded-2xl bg-zinc-950/90"></div>
                <div className="absolute inset-[3px] rounded-xl bg-zinc-950 p-4">
                  <div className="space-y-8 p-2">
                    <motion.div
                      className="h-10 w-full rounded-md bg-zinc-900 flex items-center px-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Search className="h-4 w-4 text-zinc-400" />
                      <span className="ml-2 text-sm text-zinc-400">Search for restaurants...</span>
                    </motion.div>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={staggerItems(0.15)}
                    >
                      {Array.from({ length: 3 }).map((_, i) => (
                        <motion.div key={i} className="space-y-2" variants={fadeInUp}>
                          <div className="flex items-center justify-between">
                            <div className="h-5 w-24 rounded bg-zinc-800"></div>
                            <div className="h-5 w-10 rounded bg-zinc-800"></div>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {Array.from({ length: 3 }).map((_, j) => (
                              <div key={j} className="aspect-square rounded-md bg-zinc-800"></div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <motion.div
                              className="h-4 w-16 rounded bg-green-500"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            ></motion.div>
                            <div className="h-5 w-5 rounded bg-zinc-800"></div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted dark:bg-muted/50">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="space-y-2">
              <motion.div
                className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Key Features
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How SwiftBurst Saves You Money</h2>
              <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                Our intelligent platform helps you find the best deals on food delivery, without spending a dime.
              </p>
            </div>
          </motion.div>
          <motion.div
            className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col justify-center space-y-4"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <BarChart3 className="h-6 w-6" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Price Comparison</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Compare prices across multiple food delivery platforms for the same restaurants.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col justify-center space-y-4"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Tags className="h-6 w-6" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Discount Maximizer</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Automatically find and apply promo codes across platforms to maximize savings.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="flex flex-col justify-center space-y-4"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <CreditCard className="h-6 w-6" />
              </motion.div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Payment Optimizer</h3>
                <p className="text-zinc-500 dark:text-zinc-400">
                  Suggest the best payment method for each order based on available cashback and rewards.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <motion.div
              className="flex flex-col justify-center space-y-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInLeft}
            >
              <div className="space-y-2">
                <motion.div
                  className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  How It Works
                </motion.div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Save Thousands Without Spending a Dime
                </h2>
                <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
                  SwiftBurst is your personal deal finder that aggregates the web's hottest discounts on food delivery,
                  all hand-picked to save you serious cash.
                </p>
              </div>
              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                variants={staggerItems(0.2)}
                viewport={{ once: true }}
              >
                <motion.div className="flex items-start gap-4" variants={fadeInUp}>
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    1
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Search for Your Favorite Restaurants</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Enter the name of the restaurant or cuisine you're craving.
                    </p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start gap-4" variants={fadeInUp}>
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    2
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Compare Prices Across Platforms</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      See side-by-side comparisons of prices from UberEats, DoorDash, Grubhub, and more.
                    </p>
                  </div>
                </motion.div>
                <motion.div className="flex items-start gap-4" variants={fadeInUp}>
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    3
                  </motion.div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Order with Maximum Savings</h3>
                    <p className="text-zinc-500 dark:text-zinc-400">
                      Place your order through the platform with the best price, using our suggested promo codes and payment methods.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="mt-4 flex items-center justify-center lg:mt-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInRight}
            >
              <div className="relative h-[600px] w-[350px] rounded-2xl bg-gradient-to-b from-teal-500 to-green-500 p-1">
                <div className="absolute inset-0 rounded-2xl bg-zinc-950/90"></div>
                <div className="absolute inset-[3px] rounded-xl bg-zinc-950 p-4">
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={staggerItems(0.2)}
                  >
                    <motion.div
                      className="flex items-center justify-between"
                      variants={fadeInUp}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
                        <div className="h-5 w-24 rounded bg-zinc-800"></div>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-zinc-800"></div>
                    </motion.div>
                    <motion.div
                      className="h-40 rounded-lg bg-zinc-900 flex items-center justify-center"
                      variants={fadeInUp}
                    >
                      <ShoppingCart className="h-12 w-12 text-zinc-700" />
                    </motion.div>
                    <motion.div
                      className="space-y-2"
                      variants={fadeInUp}
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-32 rounded bg-zinc-800"></div>
                        <div className="h-5 w-16 rounded bg-zinc-800"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-24 rounded bg-zinc-800"></div>
                        <div className="h-5 w-20 rounded bg-zinc-800"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-5 w-28 rounded bg-zinc-800"></div>
                        <motion.div
                          className="h-5 w-12 rounded bg-green-500"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="h-10 w-full rounded-md bg-green-500 flex items-center justify-center"
                      variants={fadeInUp}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Zap className="h-5 w-5 text-white" />
                      <span className="ml-2 text-sm font-medium text-white">Order with Best Deal</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-center space-y-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Save on Your Next Order?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Join thousands of smart diners who save an average of $15 per order with SwiftBurst.
              </p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/dashboard">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Shell>
  )
}
