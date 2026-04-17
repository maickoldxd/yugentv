"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";

import { Activity } from "lucide-react";
import { Line } from "react-chartjs-2";
import { Modal } from "@heroui/react";
import { useVideoQualityOptions } from "@vidstack/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export function P2PStatsModal() {
  const [peers, setPeers] = useState<Set<string>>(new Set());
  const [httpTotal, setHttpTotal] = useState(0);
  const [p2pTotal, setP2pTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // We'll track intervals for the chart (e.g. every 2 seconds)
  const [history, setHistory] = useState<
    { time: string; http: number; p2p: number }[]
  >([]);

  // Track the current interval's bytes
  const currentInterval = useRef({ http: 0, p2p: 0 });

  const qualities = useVideoQualityOptions({
    auto: "Auto",
    sort: "descending",
  });
  const selectedQuality = qualities.find((q) => q.selected);
  const resolution = selectedQuality ? selectedQuality.label : "Auto";
  const bitrate = (selectedQuality as any)?.bitrate
    ? `${((selectedQuality as any).bitrate / 1000000).toFixed(2)} Mbps`
    : "Unknown";

  useEffect(() => {
    const handlePeerConnect = (e: Event) => {
      const customEvent = e as CustomEvent;
      setPeers((prev) => new Set(prev).add(customEvent.detail));
    };

    const handlePeerClose = (e: Event) => {
      const customEvent = e as CustomEvent;
      setPeers((prev) => {
        const next = new Set(prev);
        next.delete(customEvent.detail);
        return next;
      });
    };

    const handleChunk = (e: Event) => {
      const { bytesLength, downloadSource } = (e as CustomEvent).detail;
      if (downloadSource === "http") {
        setHttpTotal((prev) => prev + bytesLength);
        currentInterval.current.http += bytesLength;
      } else {
        setP2pTotal((prev) => prev + bytesLength);
        currentInterval.current.p2p += bytesLength;
      }
    };

    window.addEventListener("p2p-peer-connect", handlePeerConnect);
    window.addEventListener("p2p-peer-close", handlePeerClose);
    window.addEventListener("p2p-chunk", handleChunk);

    return () => {
      window.removeEventListener("p2p-peer-connect", handlePeerConnect);
      window.removeEventListener("p2p-peer-close", handlePeerClose);
      window.removeEventListener("p2p-chunk", handleChunk);
    };
  }, []);

  useEffect(() => {
    // Interval to push data to chart every 2 seconds
    if (!isOpen) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeLabel = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      setHistory((prev) => {
        const newHistory = [
          ...prev,
          {
            time: timeLabel,
            http: currentInterval.current.http,
            p2p: currentInterval.current.p2p,
          },
        ];
        // Keep the last 15 points (30 seconds)
        return newHistory.slice(-15);
      });

      // Reset interval counters
      currentInterval.current = { http: 0, p2p: 0 };
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const chartData = {
    labels: history.map((h) => h.time),
    datasets: [
      {
        label: "HTTP (Bytes/2s)",
        data: history.map((h) => h.http),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.2, // smoothing
      },
      {
        label: "P2P (Bytes/2s)",
        data: history.map((h) => h.p2p),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return (value / 1024).toFixed(0) + " KB";
          },
        },
      },
    },
    plugins: {
      legend: { position: "top" as const, labels: { color: "#fff" } },
      title: { display: false },
    },
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
        aria-label="P2P Network Stats"
      >
        <Activity className="size-5" />
      </button>

      <Modal.Backdrop variant="blur">
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-2xl bg-black">
            <Modal.CloseTrigger className="hover:bg-white/10 active:bg-white/20 transition-colors text-white" />
            <Modal.Header className="flex flex-col gap-1 text-white border-b border-white/10">
              <Modal.Heading>Stats for Nerds (P2P Network)</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="pb-6">
              <div className="grid grid-cols-2 gap-4 mb-4 pt-2">
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                    Connected Peers
                  </p>
                  <p className="text-2xl font-bold text-white">{peers.size}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                    Video Info
                  </p>
                  <p className="text-sm font-medium text-white">
                    {resolution} • {bitrate}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                    Total P2P Download
                  </p>
                  <p className="text-xl font-bold text-blue-400">
                    {formatBytes(p2pTotal)}
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                  <p className="text-xs uppercase tracking-wider text-white/50 mb-1">
                    Total HTTP Download
                  </p>
                  <p className="text-xl font-bold text-rose-400">
                    {formatBytes(httpTotal)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/5 p-4 border border-white/5 aspect-video w-full max-h-[300px] flex items-center justify-center">
                {history.length > 0 ? (
                  <Line data={chartData} options={chartOptions} />
                ) : (
                  <span className="text-white/40 text-sm">
                    Gathering data...
                  </span>
                )}
              </div>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
