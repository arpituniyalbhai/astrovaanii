import AppKit
import AVFoundation
import CoreGraphics
import CoreVideo
import Foundation

guard CommandLine.arguments.count == 3 else {
  fputs("Usage: swift render-loading-video.swift input-image output.mp4\n", stderr)
  exit(1)
}

let sourceURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outputURL = URL(fileURLWithPath: CommandLine.arguments[2])
let width = 1080
let height = 1920
let fps: Int32 = 24
let durationSeconds = 8
let frameCount = Int(fps) * durationSeconds

guard
  let sourceImage = NSImage(contentsOf: sourceURL),
  let sourceCGImage = sourceImage.cgImage(forProposedRect: nil, context: nil, hints: nil)
else {
  fputs("Unable to read source image.\n", stderr)
  exit(1)
}

try? FileManager.default.removeItem(at: outputURL)

let writer = try AVAssetWriter(outputURL: outputURL, fileType: .mp4)
let videoInput = AVAssetWriterInput(
  mediaType: .video,
  outputSettings: [
    AVVideoCodecKey: AVVideoCodecType.h264,
    AVVideoWidthKey: width,
    AVVideoHeightKey: height,
    AVVideoCompressionPropertiesKey: [
      AVVideoAverageBitRateKey: 2_400_000,
      AVVideoMaxKeyFrameIntervalKey: Int(fps) * 2,
    ],
  ]
)
videoInput.expectsMediaDataInRealTime = false

let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: videoInput,
  sourcePixelBufferAttributes: [
    kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32BGRA,
    kCVPixelBufferWidthKey as String: width,
    kCVPixelBufferHeightKey as String: height,
  ]
)

guard writer.canAdd(videoInput) else {
  fputs("Unable to add video input.\n", stderr)
  exit(1)
}
writer.add(videoInput)

guard writer.startWriting() else {
  fputs("Unable to start video writer: \(String(describing: writer.error))\n", stderr)
  exit(1)
}
writer.startSession(atSourceTime: .zero)

let colorSpace = CGColorSpaceCreateDeviceRGB()
let chartCenter = CGPoint(x: 540, y: 445)
let terracotta = NSColor(calibratedRed: 0.57, green: 0.27, blue: 0.16, alpha: 1).cgColor
let antiqueGold = NSColor(calibratedRed: 0.91, green: 0.69, blue: 0.30, alpha: 1).cgColor
let parchment = NSColor(calibratedRed: 0.96, green: 0.90, blue: 0.78, alpha: 1).cgColor
let navy = NSColor(calibratedRed: 0.06, green: 0.11, blue: 0.18, alpha: 1).cgColor

let particles: [(CGFloat, CGFloat, CGFloat)] = (0..<24).map { index in
  let seed = CGFloat(index + 1)
  return (
    70 + ((seed * 173).truncatingRemainder(dividingBy: 940)),
    690 + ((seed * 257).truncatingRemainder(dividingBy: 1120)),
    1.4 + ((seed * 0.73).truncatingRemainder(dividingBy: 2.8))
  )
}

func drawFrame(_ context: CGContext, frame: Int) {
  let progress = CGFloat(frame) / CGFloat(frameCount)
  let loop = progress * CGFloat.pi * 2

  context.setFillColor(NSColor.black.cgColor)
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))

  let zoom = 1.035 + 0.018 * sin(loop - .pi / 2)
  let drawWidth = CGFloat(width) * zoom
  let drawHeight = CGFloat(height) * zoom
  let driftX = 8 * sin(loop)
  let driftY = 12 * sin(loop * 0.5)
  let imageRect = CGRect(
    x: (CGFloat(width) - drawWidth) / 2 + driftX,
    y: (CGFloat(height) - drawHeight) / 2 + driftY,
    width: drawWidth,
    height: drawHeight
  )

  context.saveGState()
  context.translateBy(x: 0, y: CGFloat(height))
  context.scaleBy(x: 1, y: -1)
  let flippedRect = CGRect(
    x: imageRect.origin.x,
    y: CGFloat(height) - imageRect.maxY,
    width: imageRect.width,
    height: imageRect.height
  )
  context.draw(sourceCGImage, in: flippedRect)
  context.restoreGState()

  context.setBlendMode(.screen)

  // A soft, breathing glow rises from the chart and lights the reading area.
  let glowRadius = 255 + 18 * sin(loop * 2)
  if let glow = CGGradient(
    colorsSpace: colorSpace,
    colors: [
      NSColor(calibratedRed: 1, green: 0.75, blue: 0.30, alpha: 0.23).cgColor,
      NSColor(calibratedRed: 1, green: 0.62, blue: 0.18, alpha: 0).cgColor,
    ] as CFArray,
    locations: [0, 1]
  ) {
    context.drawRadialGradient(
      glow,
      startCenter: chartCenter,
      startRadius: 0,
      endCenter: chartCenter,
      endRadius: glowRadius,
      options: []
    )
  }

  // Rotating chart geometry creates an active analysis effect.
  for ring in 0..<3 {
    let radius = CGFloat(142 + ring * 62)
    let opacity = 0.20 + CGFloat(ring) * 0.05 + 0.05 * sin(loop * 2 + CGFloat(ring))
    context.setStrokeColor(NSColor(cgColor: antiqueGold)!.withAlphaComponent(opacity).cgColor)
    context.setLineWidth(ring == 0 ? 2.2 : 1.3)
    context.strokeEllipse(
      in: CGRect(
        x: chartCenter.x - radius,
        y: chartCenter.y - radius * 0.56,
        width: radius * 2,
        height: radius * 1.12
      )
    )
  }

  let rotation = loop * 0.8
  for marker in 0..<7 {
    let angle = rotation + CGFloat(marker) * (CGFloat.pi * 2 / 7)
    let radius: CGFloat = marker.isMultiple(of: 2) ? 220 : 175
    let x = chartCenter.x + cos(angle) * radius
    let y = chartCenter.y + sin(angle) * radius * 0.55
    let markerSize: CGFloat = marker == 0 ? 13 : 8
    context.setFillColor(
      NSColor(cgColor: marker == 0 ? parchment : antiqueGold)!
        .withAlphaComponent(0.70 + 0.22 * sin(loop * 3 + CGFloat(marker)))
        .cgColor
    )
    context.fillEllipse(
      in: CGRect(x: x - markerSize / 2, y: y - markerSize / 2, width: markerSize, height: markerSize)
    )
  }

  // A warm scanner repeatedly moves across the chart.
  let scanProgress = (progress * 2).truncatingRemainder(dividingBy: 1)
  let scanY = 220 + scanProgress * 510
  if let scanGradient = CGGradient(
    colorsSpace: colorSpace,
    colors: [
      NSColor(cgColor: antiqueGold)!.withAlphaComponent(0).cgColor,
      NSColor(cgColor: antiqueGold)!.withAlphaComponent(0.55).cgColor,
      NSColor(cgColor: antiqueGold)!.withAlphaComponent(0).cgColor,
    ] as CFArray,
    locations: [0, 0.5, 1]
  ) {
    context.saveGState()
    context.addRect(CGRect(x: 90, y: scanY - 24, width: 900, height: 48))
    context.clip()
    context.drawLinearGradient(
      scanGradient,
      start: CGPoint(x: 90, y: scanY),
      end: CGPoint(x: 990, y: scanY),
      options: []
    )
    context.restoreGState()
  }
  context.setStrokeColor(NSColor(cgColor: antiqueGold)!.withAlphaComponent(0.48).cgColor)
  context.setLineWidth(1.4)
  context.move(to: CGPoint(x: 120, y: scanY))
  context.addLine(to: CGPoint(x: 960, y: scanY))
  context.strokePath()

  // Slow twinkling particles keep the upper space alive without distracting from Vaanii.
  for (index, particle) in particles.enumerated() {
    let phase = loop * (0.8 + CGFloat(index % 4) * 0.12) + CGFloat(index)
    let opacity = 0.18 + 0.50 * pow((sin(phase) + 1) / 2, 2)
    let y = particle.1 + 15 * sin(loop * 0.6 + CGFloat(index))
    context.setFillColor(NSColor(cgColor: antiqueGold)!.withAlphaComponent(opacity).cgColor)
    context.fillEllipse(
      in: CGRect(x: particle.0, y: y, width: particle.2, height: particle.2)
    )
  }

  // Subtle vignette maintains focus and matches the warm product theme.
  context.setBlendMode(.normal)
  if let vignette = CGGradient(
    colorsSpace: colorSpace,
    colors: [
      NSColor(cgColor: navy)!.withAlphaComponent(0).cgColor,
      NSColor(cgColor: navy)!.withAlphaComponent(0.20).cgColor,
    ] as CFArray,
    locations: [0.58, 1]
  ) {
    context.drawRadialGradient(
      vignette,
      startCenter: CGPoint(x: 540, y: 960),
      startRadius: 250,
      endCenter: CGPoint(x: 540, y: 960),
      endRadius: 1_080,
      options: [.drawsAfterEndLocation]
    )
  }

  context.setFillColor(NSColor(cgColor: terracotta)!.withAlphaComponent(0.035).cgColor)
  context.fill(CGRect(x: 0, y: 0, width: width, height: height))
}

for frame in 0..<frameCount {
  autoreleasepool {
    while !videoInput.isReadyForMoreMediaData {
      Thread.sleep(forTimeInterval: 0.002)
    }

    guard let pool = adaptor.pixelBufferPool else {
      fputs("Pixel buffer pool is unavailable.\n", stderr)
      exit(1)
    }
    var optionalBuffer: CVPixelBuffer?
    guard CVPixelBufferPoolCreatePixelBuffer(nil, pool, &optionalBuffer) == kCVReturnSuccess,
      let pixelBuffer = optionalBuffer
    else {
      fputs("Unable to create pixel buffer.\n", stderr)
      exit(1)
    }

    CVPixelBufferLockBaseAddress(pixelBuffer, [])
    guard
      let baseAddress = CVPixelBufferGetBaseAddress(pixelBuffer),
      let context = CGContext(
        data: baseAddress,
        width: width,
        height: height,
        bitsPerComponent: 8,
        bytesPerRow: CVPixelBufferGetBytesPerRow(pixelBuffer),
        space: colorSpace,
        bitmapInfo: CGImageAlphaInfo.premultipliedFirst.rawValue
          | CGBitmapInfo.byteOrder32Little.rawValue
      )
    else {
      CVPixelBufferUnlockBaseAddress(pixelBuffer, [])
      fputs("Unable to create frame context.\n", stderr)
      exit(1)
    }

    drawFrame(context, frame: frame)
    CVPixelBufferUnlockBaseAddress(pixelBuffer, [])

    let presentationTime = CMTime(value: CMTimeValue(frame), timescale: fps)
    if !adaptor.append(pixelBuffer, withPresentationTime: presentationTime) {
      fputs("Unable to append frame \(frame).\n", stderr)
      exit(1)
    }
  }
}

videoInput.markAsFinished()
let completion = DispatchSemaphore(value: 0)
writer.finishWriting {
  completion.signal()
}
completion.wait()

guard writer.status == .completed else {
  fputs("Video rendering failed: \(writer.error?.localizedDescription ?? "unknown error")\n", stderr)
  exit(1)
}

print(outputURL.path)
