import WebcamCapture from "./container/webcam-capture";

export default function Webcam() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ການຖ່າຍຮູບເວບເຄມ</h1>
      <WebcamCapture />
    </main>
  )
}

