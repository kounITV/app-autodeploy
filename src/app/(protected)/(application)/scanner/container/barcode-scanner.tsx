/* eslint-disable no-nested-ternary */
/* eslint-disable max-nested-callbacks */
/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-console */
"use client"
"use client"

import { useState, useEffect } from "react"
import BarcodeScannerComponent from "react-qr-barcode-scanner"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Camera, Check, RefreshCw } from "lucide-react"

interface BarcodeResult {
  text: string
  format: string
}

interface BarcodeReaderProps {
  onScan?: (result: BarcodeResult) => void
  onError?: (error: Error) => void
  width?: number
  height?: number
  className?: string
}

export default function BarcodeScanner({
  onScan,
  onError,
  width = 500,
  height = 300,
  className = "",
}: BarcodeReaderProps) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [lastResult, setLastResult] = useState<BarcodeResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isAndroid, setIsAndroid] = useState(false)
  useEffect(() => {
    const checkDevice = async () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobile = /iphone|ipad|ipod|android|blackberry|windows phone/.test(userAgent)
      const android = /android/.test(userAgent)
      setIsMobile(mobile)
      setIsAndroid(android)

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: android ? { ideal: "environment" } : "environment", // Softer constraint for Android
            },
          })
          setHasPermission(true)
          stream.getTracks().forEach((track) => track.stop())
        } catch {
          setHasPermission(false)
          setError("Camera access denied. Please grant camera permissions in your browser or device settings.")
        }
      } else {
        setHasPermission(false)
        setError("Camera not supported by this browser")
      }
    }

    checkDevice()
  }, [])

  const handleUpdate = (err: any, result: any) => {
    if (result) {
      const scannedResult: BarcodeResult = {
        text: result.text,
        format: "Detected",
      }
      setLastResult(scannedResult)
      onScan?.(scannedResult)
      setIsScanning(false)
    }

    if (err && err.name !== "NotFoundException") {
      onError?.(err)
    }
  }

  const startScanning = async () => {
    try {
      setError(null)
      setIsScanning(true)
      setLastResult(null)

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = isAndroid
          ? { video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } } }
          : { video: { facingMode: "environment" } }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        setHasPermission(true)
        stream.getTracks().forEach((track) => track.stop())
      }
    } catch (err: any) {
      handleError(err)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
  }

  const resetScanner = () => {
    setLastResult(null)
    setIsScanning(true)
  }

  const handleError = (err: Error) => {
    setHasPermission(false)
    setError(
      isAndroid
        ? "Camera access denied. Please enable camera permissions in your browser settings (Chrome > Site Settings > Camera) and refresh."
        : "Camera access denied. Please enable camera permissions in your device settings and refresh.",
    )
    setIsScanning(false)
    onError?.(err)
  }

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {error && (
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-border bg-card">
        {hasPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 p-4 text-center z-10">
            <p>
              {isAndroid
                ? "Camera access denied. Enable permissions in Chrome settings and refresh."
                : "Camera access denied. Enable permissions in your device settings and refresh."}
            </p>
          </div>
        )}

        {lastResult && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 p-4 z-10">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-semibold">Barcode Detected!</h3>
            <p className="mb-2 text-sm text-muted-foreground">Format: {lastResult.format}</p>
            <p className="mb-4 max-w-xs break-all text-center">{lastResult.text}</p>
            <Button onClick={resetScanner} className="gap-2 bg-primary hover:bg-primary/90">
              <RefreshCw className="h-4 w-4" />
              Scan Again
            </Button>
          </div>
        )}

        {isScanning && hasPermission && (
          <div className="w-full" style={{ height: isAndroid ? "50vh" : "300px" }}>
            <BarcodeScannerComponent
              width={isMobile ? window.innerWidth - 90 : width}
              height={isAndroid ? window.innerHeight * 0.7 : isMobile ? window.innerHeight * 0.6 : height}
              onUpdate={handleUpdate}
              facingMode="environment"
              delay={100}
              torch={true}
            />

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-48 w-64 border-4 border-red-500 rounded-lg opacity-70"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="animate-pulse rounded-full bg-primary/20 px-4 py-2 text-sm text-primary">
                  Scanning...
                </div>
              </div>
            </div>
          </div>
        )}
        {!isScanning && !lastResult && (
          <div className="flex items-center justify-center h-[300px] bg-muted/20">
            <Camera className="h-16 w-16 text-muted-foreground opacity-20" />
          </div>
        )}
      </div>
      <div className="mt-4 flex gap-2">
        {!isScanning && !lastResult && hasPermission !== false && (
          <Button onClick={startScanning} className="gap-2">
            <Camera className="h-4 w-4" />
            Start Scanning
          </Button>
        )}
        {isScanning && (
          <Button variant="outline" onClick={stopScanning}>
            Stop Scanning
          </Button>
        )}
        {lastResult && !isScanning && (
          <Button onClick={resetScanner} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Scan Again
          </Button>
        )}
        {(
          <Button onClick={reloadPage} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Reload
          </Button>
        )}
      </div>
    </div>
  )
}

