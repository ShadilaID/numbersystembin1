"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Binary, Hash, Hexagon, Plus, Minus, X, Divide, Zap, Copy, Check } from "lucide-react"
import { InstallPrompt } from "@/components/install-prompt"

export default function NumberConverterApp() {
  // Number converter state
  const [decimal, setDecimal] = useState("")
  const [binary, setBinary] = useState("")
  const [octal, setOctal] = useState("")
  const [hexadecimal, setHexadecimal] = useState("")

  // Binary arithmetic state
  const [binaryNum1, setBinaryNum1] = useState("")
  const [binaryNum2, setBinaryNum2] = useState("")
  const [operation, setOperation] = useState("add")
  const [arithmeticResult, setArithmeticResult] = useState("")

  // Bitwise operations state
  const [bitwiseNum1, setBitwiseNum1] = useState("")
  const [bitwiseNum2, setBitwiseNum2] = useState("")
  const [bitwiseOperation, setBitwiseOperation] = useState("and")
  const [bitwiseResult, setBitwiseResult] = useState("")

  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Convert from decimal
  const convertFromDecimal = (value: string) => {
    if (!value || isNaN(Number(value))) {
      setBinary("")
      setOctal("")
      setHexadecimal("")
      return
    }
    const num = Number.parseInt(value, 10)
    setBinary(num.toString(2))
    setOctal(num.toString(8))
    setHexadecimal(num.toString(16).toUpperCase())
  }

  // Convert from binary
  const convertFromBinary = (value: string) => {
    if (!value || !/^[01]+$/.test(value)) {
      setDecimal("")
      setOctal("")
      setHexadecimal("")
      return
    }
    const num = Number.parseInt(value, 2)
    setDecimal(num.toString())
    setOctal(num.toString(8))
    setHexadecimal(num.toString(16).toUpperCase())
  }

  // Convert from octal
  const convertFromOctal = (value: string) => {
    if (!value || !/^[0-7]+$/.test(value)) {
      setDecimal("")
      setBinary("")
      setHexadecimal("")
      return
    }
    const num = Number.parseInt(value, 8)
    setDecimal(num.toString())
    setBinary(num.toString(2))
    setHexadecimal(num.toString(16).toUpperCase())
  }

  // Convert from hexadecimal
  const convertFromHexadecimal = (value: string) => {
    if (!value || !/^[0-9A-Fa-f]+$/.test(value)) {
      setDecimal("")
      setBinary("")
      setOctal("")
      return
    }
    const num = Number.parseInt(value, 16)
    setDecimal(num.toString())
    setBinary(num.toString(2))
    setOctal(num.toString(8))
  }

  // Binary arithmetic operations
  const performBinaryArithmetic = () => {
    if (!binaryNum1 || !binaryNum2 || !/^[01]+$/.test(binaryNum1) || !/^[01]+$/.test(binaryNum2)) {
      setArithmeticResult("Invalid binary input")
      return
    }

    const num1 = Number.parseInt(binaryNum1, 2)
    const num2 = Number.parseInt(binaryNum2, 2)
    let result: number

    switch (operation) {
      case "add":
        result = num1 + num2
        break
      case "subtract":
        result = num1 - num2
        break
      case "multiply":
        result = num1 * num2
        break
      case "divide":
        if (num2 === 0) {
          setArithmeticResult("Division by zero")
          return
        }
        result = Math.floor(num1 / num2)
        break
      default:
        result = 0
    }

    setArithmeticResult(result.toString(2))
  }

  const clearAll = () => {
    setDecimal("")
    setBinary("")
    setOctal("")
    setHexadecimal("")
  }

  const clearArithmetic = () => {
    setBinaryNum1("")
    setBinaryNum2("")
    setArithmeticResult("")
  }

  const getOperationIcon = (op: string) => {
    switch (op) {
      case "add":
        return <Plus className="h-4 w-4" />
      case "subtract":
        return <Minus className="h-4 w-4" />
      case "multiply":
        return <X className="h-4 w-4" />
      case "divide":
        return <Divide className="h-4 w-4" />
      default:
        return <Plus className="h-4 w-4" />
    }
  }

  // Bitwise operations functions
  const performBitwiseOperation = () => {
    if (!bitwiseNum1 || !/^[01]+$/.test(bitwiseNum1)) {
      setBitwiseResult("Invalid binary input for first number")
      return
    }

    // For NOT operation, we only need the first number
    if (bitwiseOperation === "not") {
      const num1 = Number.parseInt(bitwiseNum1, 2)
      // For NOT operation, we'll flip all bits up to the most significant bit
      const bitLength = bitwiseNum1.length
      const mask = (1 << bitLength) - 1
      const result = ~num1 & mask
      setBitwiseResult(result.toString(2).padStart(bitLength, "0"))
      return
    }

    // For binary operations, we need both numbers
    if (!bitwiseNum2 || !/^[01]+$/.test(bitwiseNum2)) {
      setBitwiseResult("Invalid binary input for second number")
      return
    }

    const num1 = Number.parseInt(bitwiseNum1, 2)
    const num2 = Number.parseInt(bitwiseNum2, 2)
    let result: number

    switch (bitwiseOperation) {
      case "and":
        result = num1 & num2
        break
      case "or":
        result = num1 | num2
        break
      case "xor":
        result = num1 ^ num2
        break
      default:
        result = 0
    }

    // Pad result to match the length of the longer input
    const maxLength = Math.max(bitwiseNum1.length, bitwiseNum2.length)
    setBitwiseResult(result.toString(2).padStart(maxLength, "0"))
  }

  const clearBitwise = () => {
    setBitwiseNum1("")
    setBitwiseNum2("")
    setBitwiseResult("")
  }

  const getBitwiseOperationIcon = (op: string) => {
    switch (op) {
      case "and":
      case "or":
      case "xor":
      case "not":
        return <Zap className="h-4 w-4" />
      default:
        return <Zap className="h-4 w-4" />
    }
  }

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <InstallPrompt />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20220503_200456-removebg-preview-Ogvep7p96V0bpAPrdv5Z0n7NbXAHFW.png"
                alt="Number System SID Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Number System - SID</h1>
              <p className="text-xs text-gray-400 hidden sm:block">Universal base converter & calculator</p>
            </div>
          </div>
          <Badge variant="secondary" className="hidden sm:flex bg-red-600/20 text-red-400 border-red-600/30">
            PWA Ready
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-4 sm:py-6">
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 text-white">
            Universal Number Base Converter
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Convert numbers between decimal, binary, octal, and hexadecimal formats instantly. Perfect for programmers,
            students, and anyone working with different number systems.
          </p>
        </div>

        <Tabs defaultValue="converter" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-900 border border-gray-800">
            <TabsTrigger
              value="converter"
              className="text-xs sm:text-sm data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <span className="hidden sm:inline">Number </span>Converter
            </TabsTrigger>
            <TabsTrigger
              value="arithmetic"
              className="text-xs sm:text-sm data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <span className="hidden sm:inline">Binary </span>Arithmetic
            </TabsTrigger>
            <TabsTrigger
              value="bitwise"
              className="text-xs sm:text-sm data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              <span className="hidden sm:inline">Bitwise </span>Operations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="converter" className="space-y-4">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Decimal Card */}
              <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800 hover:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Hash className="h-4 w-4 text-red-500" />
                    Decimal
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">Base 10 (0-9)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="decimal" className="text-sm font-medium text-gray-300">
                      Enter decimal number
                    </Label>
                    <div className="relative">
                      <Input
                        id="decimal"
                        type="text"
                        placeholder="123"
                        value={decimal}
                        onChange={(e) => {
                          setDecimal(e.target.value)
                          convertFromDecimal(e.target.value)
                        }}
                        className="pr-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                      {decimal && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => copyToClipboard(decimal, "decimal")}
                        >
                          {copiedField === "decimal" ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Binary Card */}
              <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800 hover:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Binary className="h-4 w-4 text-red-500" />
                    Binary
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">Base 2 (0-1)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="binary" className="text-sm font-medium text-gray-300">
                      Enter binary number
                    </Label>
                    <div className="relative">
                      <Input
                        id="binary"
                        type="text"
                        placeholder="1111011"
                        value={binary}
                        onChange={(e) => {
                          setBinary(e.target.value)
                          convertFromBinary(e.target.value)
                        }}
                        className="pr-10 font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                      {binary && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => copyToClipboard(binary, "binary")}
                        >
                          {copiedField === "binary" ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Octal Card */}
              <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800 hover:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Hash className="h-4 w-4 text-red-500" />
                    Octal
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">Base 8 (0-7)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="octal" className="text-sm font-medium text-gray-300">
                      Enter octal number
                    </Label>
                    <div className="relative">
                      <Input
                        id="octal"
                        type="text"
                        placeholder="173"
                        value={octal}
                        onChange={(e) => {
                          setOctal(e.target.value)
                          convertFromOctal(e.target.value)
                        }}
                        className="pr-10 font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                      {octal && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => copyToClipboard(octal, "octal")}
                        >
                          {copiedField === "octal" ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Hexadecimal Card */}
              <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800 hover:border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base text-white">
                    <Hexagon className="h-4 w-4 text-red-500" />
                    Hexadecimal
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-400">Base 16 (0-9, A-F)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Label htmlFor="hexadecimal" className="text-sm font-medium text-gray-300">
                      Enter hex number
                    </Label>
                    <div className="relative">
                      <Input
                        id="hexadecimal"
                        type="text"
                        placeholder="7B"
                        value={hexadecimal}
                        onChange={(e) => {
                          setHexadecimal(e.target.value.toUpperCase())
                          convertFromHexadecimal(e.target.value)
                        }}
                        className="pr-10 font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                      />
                      {hexadecimal && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1 h-8 w-8 p-0 hover:bg-gray-700"
                          onClick={() => copyToClipboard(hexadecimal, "hexadecimal")}
                        >
                          {copiedField === "hexadecimal" ? (
                            <Check className="h-3 w-3 text-green-400" />
                          ) : (
                            <Copy className="h-3 w-3 text-gray-400" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                onClick={clearAll}
                variant="outline"
                className="min-w-32 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Clear All Fields
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="arithmetic" className="space-y-4">
            <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Binary Arithmetic Calculator</CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  Perform addition, subtraction, multiplication, and division on binary numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="binary1" className="text-sm font-medium text-gray-300">
                      First Binary Number
                    </Label>
                    <Input
                      id="binary1"
                      type="text"
                      placeholder="1010"
                      value={binaryNum1}
                      onChange={(e) => setBinaryNum1(e.target.value)}
                      className="font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                    />
                    {binaryNum1 && !/^[01]+$/.test(binaryNum1) && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="text-xs">⚠</span> Please enter only 0s and 1s
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="binary2" className="text-sm font-medium text-gray-300">
                      Second Binary Number
                    </Label>
                    <Input
                      id="binary2"
                      type="text"
                      placeholder="1100"
                      value={binaryNum2}
                      onChange={(e) => setBinaryNum2(e.target.value)}
                      className="font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                    />
                    {binaryNum2 && !/^[01]+$/.test(binaryNum2) && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="text-xs">⚠</span> Please enter only 0s and 1s
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="operation" className="text-sm font-medium text-gray-300">
                    Operation
                  </Label>
                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select operation" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="add" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />
                          Addition
                        </div>
                      </SelectItem>
                      <SelectItem value="subtract" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Minus className="h-4 w-4" />
                          Subtraction
                        </div>
                      </SelectItem>
                      <SelectItem value="multiply" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <X className="h-4 w-4" />
                          Multiplication
                        </div>
                      </SelectItem>
                      <SelectItem value="divide" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Divide className="h-4 w-4" />
                          Division
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={performBinaryArithmetic}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <div className="flex items-center gap-2">
                      {getOperationIcon(operation)}
                      Calculate
                    </div>
                  </Button>
                  <Button
                    onClick={clearArithmetic}
                    variant="outline"
                    className="sm:w-24 h-11 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Clear
                  </Button>
                </div>

                {arithmeticResult && (
                  <Card className="bg-gray-800/50 border-l-4 border-l-red-500 border border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-white">
                        Result
                        {arithmeticResult !== "Invalid binary input" && arithmeticResult !== "Division by zero" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-gray-700"
                            onClick={() => copyToClipboard(arithmeticResult, "arithmetic-result")}
                          >
                            {copiedField === "arithmetic-result" ? (
                              <Check className="h-3 w-3 text-green-400" />
                            ) : (
                              <Copy className="h-3 w-3 text-gray-400" />
                            )}
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="font-mono text-lg font-semibold break-all text-white">{arithmeticResult}</div>
                        {arithmeticResult !== "Invalid binary input" && arithmeticResult !== "Division by zero" && (
                          <div className="text-sm text-gray-400">Decimal: {Number.parseInt(arithmeticResult, 2)}</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bitwise" className="space-y-4">
            <Card className="transition-all duration-200 hover:shadow-lg bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Bitwise Operations</CardTitle>
                <CardDescription className="text-sm text-gray-400">
                  Perform AND, OR, NOT, and XOR operations on binary numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-3">
                    <Label htmlFor="bitwise1" className="text-sm font-medium text-gray-300">
                      First Binary Number
                    </Label>
                    <Input
                      id="bitwise1"
                      type="text"
                      placeholder="1010"
                      value={bitwiseNum1}
                      onChange={(e) => setBitwiseNum1(e.target.value)}
                      className="font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
                    />
                    {bitwiseNum1 && !/^[01]+$/.test(bitwiseNum1) && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="text-xs">⚠</span> Please enter only 0s and 1s
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="bitwise2" className="text-sm font-medium text-gray-300">
                      Second Binary Number{" "}
                      {bitwiseOperation === "not" && (
                        <span className="text-xs text-gray-500">(Not needed for NOT operation)</span>
                      )}
                    </Label>
                    <Input
                      id="bitwise2"
                      type="text"
                      placeholder="1100"
                      value={bitwiseNum2}
                      onChange={(e) => setBitwiseNum2(e.target.value)}
                      disabled={bitwiseOperation === "not"}
                      className="font-mono bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 disabled:opacity-50"
                    />
                    {bitwiseNum2 && !/^[01]+$/.test(bitwiseNum2) && bitwiseOperation !== "not" && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span className="text-xs">⚠</span> Please enter only 0s and 1s
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="bitwiseOperation" className="text-sm font-medium text-gray-300">
                    Bitwise Operation
                  </Label>
                  <Select value={bitwiseOperation} onValueChange={setBitwiseOperation}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Select bitwise operation" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="and" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          AND (&)
                        </div>
                      </SelectItem>
                      <SelectItem value="or" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          OR (|)
                        </div>
                      </SelectItem>
                      <SelectItem value="xor" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          XOR (^)
                        </div>
                      </SelectItem>
                      <SelectItem value="not" className="text-white hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          NOT (~)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={performBitwiseOperation}
                    className="flex-1 h-11 bg-red-600 hover:bg-red-700 text-white"
                  >
                    <div className="flex items-center gap-2">
                      {getBitwiseOperationIcon(bitwiseOperation)}
                      Calculate
                    </div>
                  </Button>
                  <Button
                    onClick={clearBitwise}
                    variant="outline"
                    className="sm:w-24 h-11 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    Clear
                  </Button>
                </div>

                {bitwiseResult && (
                  <Card className="bg-gray-800/50 border-l-4 border-l-red-500 border border-gray-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2 text-white">
                        Result
                        {!bitwiseResult.includes("Invalid") && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 hover:bg-gray-700"
                            onClick={() => copyToClipboard(bitwiseResult, "bitwise-result")}
                          >
                            {copiedField === "bitwise-result" ? (
                              <Check className="h-3 w-3 text-green-400" />
                            ) : (
                              <Copy className="h-3 w-3 text-gray-400" />
                            )}
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="font-mono text-lg font-semibold break-all text-white">{bitwiseResult}</div>
                        {!bitwiseResult.includes("Invalid") && (
                          <>
                            <div className="text-sm text-gray-400">Decimal: {Number.parseInt(bitwiseResult, 2)}</div>
                            <div className="space-y-3">
                              <div className="text-sm font-medium text-gray-300">Step-by-step:</div>
                              <div className="bg-gray-800/30 rounded-lg p-3 font-mono text-sm space-y-1 border border-gray-700">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">A:</span>
                                  <span className="text-white">
                                    {bitwiseNum1.padStart(Math.max(bitwiseNum1.length, bitwiseNum2.length || 0), "0")}
                                  </span>
                                </div>
                                {bitwiseOperation !== "not" && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">B:</span>
                                    <span className="text-white">
                                      {bitwiseNum2.padStart(Math.max(bitwiseNum1.length, bitwiseNum2.length), "0")}
                                    </span>
                                  </div>
                                )}
                                <div className="border-t border-gray-600 pt-2 flex justify-between font-semibold">
                                  <span className="text-red-400">{bitwiseOperation.toUpperCase()}:</span>
                                  <span className="text-white">{bitwiseResult}</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-8">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 sm:py-8 md:h-20 md:flex-row md:py-0 px-4">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2"></div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Badge variant="outline" className="text-xs bg-red-600/20 text-red-400 border-red-600/30">
              Offline Ready
            </Badge>
          </div>
        </div>
      </footer>
    </div>
  )
}
