import { Button } from "@/components/ui/button";
import { features, steps } from "./data/data";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />

        <div className="relative container max-w-6xl mx-auto px-4 py-24 md:py-32">
          {/* Trust badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-medium border border-blue-200/50">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Google Gemini AI
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center max-w-4xl mx-auto">
            Understand any document in
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}seconds
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Upload PDFs, docs, and text files. Get AI-powered summaries, Q&A,
            sentiment analysis, and entity extraction — instantly.
          </p>

          {/* CTA group */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="h-12 px-8 text-base font-semibold shadow-lg shadow-blue-500/25"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
              >
                See How It Works
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-sm text-muted-foreground text-center">
            No credit card required · Analyze up to 50 documents free
          </p>

          {/* Product preview placeholder */}
          <div className="mt-16 relative rounded-xl border bg-background shadow-2xl shadow-blue-500/10 overflow-hidden max-w-5xl mx-auto">
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10" />
            <div className="bg-gradient-to-b from-muted/50 to-muted p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-lg bg-background/80 backdrop-blur border shadow-sm"
                  >
                    <div className="shrink-0 p-2 rounded-md bg-blue-100">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
              Features
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything You Need
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Powerful AI tools to help your team understand documents faster.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border bg-background shadow-sm hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-4 w-fit">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">
              Get started in minutes
            </h2>
          </div>
          <div className="space-y-4 max-w-lg mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="shrink-0 h-9 w-9 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <span className="font-medium">{step}</span>
                <CheckCircle className="h-5 w-5 text-green-500 ml-auto shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to analyze your documents?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join teams using Docly to work smarter with their documents.
          </p>
          <Link href="/sign-up">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold bg-white text-blue-600 hover:bg-blue-50"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="text-sm text-blue-200 mt-4">
            No credit card required · 14-day free trial
          </p>
        </div>
      </section>
    </>
  );
}
