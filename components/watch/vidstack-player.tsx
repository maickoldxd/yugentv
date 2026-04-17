"use client";

import { useEffect, useState, useRef, type CSSProperties } from "react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import {
  ArrowLeft,
  Cast,
  Expand,
  Minimize,
  PictureInPicture2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Controls,
  FullscreenButton,
  GoogleCastButton,
  MediaPlayer,
  MediaProvider,
  Menu,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Time,
  TimeSlider,
  VolumeSlider,
  SpeedSlider,
  Track,
  type MediaPlayerProps,
  useCaptionOptions,
  useMediaState,
  Gesture,
  useMediaRemote,
  isHLSProvider,
  type MediaProviderAdapter,
} from "@vidstack/react";

interface EpisodeOption {
  duration: string;
  href: string;
  isActive: boolean;
  label: string;
  still: string;
  title: string;
}

interface NextEpisodeOption {
  href: string;
  label: string;
}

export interface TextTrackOption {
  src: string;
  label: string;
  language: string;
  kind: "subtitles" | "captions" | "chapters" | "descriptions" | "metadata";
  default?: boolean;
}

import { P2PStatsModal } from "./p2p-stats-modal";

interface VidstackPlayerProps {
  accent: string;
  backHref?: string;
  backLabel?: string;
  episodes?: EpisodeOption[];
  episodesLabel?: string;
  nextEpisode?: NextEpisodeOption | null;
  src: MediaPlayerProps["src"];
  subtitle?: string;
  title: string;
  tracks?: TextTrackOption[];
}

function ControlIcon({
  className,
  inverted = false,
  src,
}: {
  className?: string;
  inverted?: boolean;
  src: string;
}) {
  return (
    <Image
      alt=""
      aria-hidden
      className={[
        "pointer-events-none h-5 w-auto shrink-0 select-none",
        inverted ? "brightness-0 invert" : "",
        className ?? "",
      ].join(" ")}
      draggable={false}
      height={24}
      src={src}
      width={24}
    />
  );
}

function SettingsMenu() {
  const captions = useCaptionOptions({ off: "Off" });
  const playbackRate = useMediaState("playbackRate");

  return (
    <Menu.Root>
      <Menu.Button
        aria-label="Open settings"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
      >
        <ControlIcon inverted src="/icons/settings.svg" />
      </Menu.Button>
      <Menu.Items
        className="w-64 rounded-2xl bg-[rgba(6,8,14,0.96)] py-4 px-3 text-white shadow-[0_24px_80px_-32px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        placement="top end"
      >
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3 text-white/45">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em]">
                Playback Speed
              </p>
              <span className="text-xs font-medium">{playbackRate}x</span>
            </div>
            <SpeedSlider.Root
              className="group/speed relative inline-flex h-10 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden"
              max={2}
              min={0.25}
              step={0.25}
            >
              <SpeedSlider.Track className="relative z-0 h-1.5 w-full rounded-sm bg-white/10 transition-all group-data-focus/speed:ring-[3px] group-data-focus/speed:ring-white/20">
                <SpeedSlider.TrackFill className="absolute z-20 h-full w-(--slider-fill) rounded-sm bg-white will-change-[width]" />
              </SpeedSlider.Track>
              <SpeedSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-30 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white opacity-0 ring-white/40 transition-opacity group-hover/speed:opacity-100 group-data-active/speed:opacity-100 group-data-dragging/speed:ring-4 will-change-[left,opacity]" />
            </SpeedSlider.Root>
          </div>

          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/45">
              Captions
            </p>
            <div className="mt-3 space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {captions.disabled ? (
                <div className="rounded-2xl bg-white/6 px-3 py-2 text-sm text-white/48">
                  No captions available.
                </div>
              ) : (
                captions.map((option) => (
                  <button
                    key={option.value}
                    className={[
                      "flex w-full cursor-pointer items-center justify-between rounded-2xl px-3 py-2 text-left text-sm transition outline-none",
                      option.selected
                        ? "bg-white/12 text-white"
                        : "bg-transparent text-white/66 hover:bg-white/8 focus-visible:bg-white/8 hover:text-white focus-visible:text-white",
                    ].join(" ")}
                    onClick={() => option.select()}
                    type="button"
                  >
                    <span>{option.label}</span>
                    {option.selected ? (
                      <span className="text-white/78">On</span>
                    ) : null}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </Menu.Items>
    </Menu.Root>
  );
}

function DesktopControls({
  backHref,
  backLabel,
  episodes,
  episodesLabel,
  nextEpisode,
  subtitle,
  title,
}: {
  backHref?: string;
  backLabel?: string;
  episodes: EpisodeOption[];
  episodesLabel: string;
  nextEpisode?: NextEpisodeOption | null;
  subtitle?: string;
  title: string;
}) {
  const isPaused = useMediaState("paused");
  const isFullscreen = useMediaState("fullscreen");
  const isMuted = useMediaState("muted");
  const isPip = useMediaState("pictureInPicture");
  const volume = useMediaState("volume");
  const isFullScreen = useMediaState("fullscreen");

  const iconButtonClass =
    "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35";
  const seekButtonClass =
    "inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div className="flex pointer-coarse:hidden flex-col w-full h-full justify-between pointer-events-none">
      <Controls.Group
        className={`pointer-events-auto flex items-start justify-between gap-3 ${isFullScreen ? "mt-6" : ""}`}
      >
        {backHref ? (
          <Link
            className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-black/45 px-4 text-sm font-medium text-white/88 backdrop-blur-md transition hover:bg-black/65 hover:text-white"
            href={backHref}
          >
            <ArrowLeft className="size-4" />
            {backLabel ?? "Back"}
          </Link>
        ) : (
          <span />
        )}
      </Controls.Group>

      <div
        className={`pointer-events-auto space-y-4 ${isFullScreen ? "p-4" : ""}`}
      >
        <Controls.Group className="flex flex-nowrap items-center gap-3 sm:gap-4">
          <div className="font-sabandija text-white/90 sm:text-base flex flex-nowrap whitespace-nowrap">
            <Time type="current" />
            <span className="mx-1 text-white/38">/</span>
            <Time type="duration" />
          </div>

          <TimeSlider.Root className="group/timeline relative inline-flex h-12 w-full cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <TimeSlider.Track className="relative z-0 h-1.25 w-full rounded-sm bg-white/30 transition-all group-data-focus/timeline:ring-[3px] group-data-focus/timeline:ring-orange-400/40">
              <TimeSlider.TrackFill className="absolute z-20 h-full w-(--slider-fill) rounded-sm bg-orange-400 will-change-[width]" />
              <TimeSlider.Progress className="absolute z-10 h-full w-(--slider-progress) rounded-sm bg-white/50 will-change-[width]" />
            </TimeSlider.Track>
            <TimeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-30 h-3.75 w-3.75 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white opacity-0 ring-white/40 transition-opacity group-hover/timeline:opacity-100 group-data-active/timeline:opacity-100 group-data-dragging/timeline:ring-4 will-change-[left,opacity]" />
          </TimeSlider.Root>
        </Controls.Group>

        <Controls.Group className="flex gap-4 flex-row items-end justify-between ">
          <div className="flex min-w-0 flex-col gap-4 lg:flex-1 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <PlayButton className="inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-black transition hover:bg-white/90">
                {isPaused ? (
                  <ControlIcon src="/icons/play.svg" />
                ) : (
                  <ControlIcon src="/icons/pause.svg" />
                )}
              </PlayButton>

              <SeekButton className={seekButtonClass} seconds={-5}>
                <ControlIcon inverted src="/icons/backward5s.svg" />
              </SeekButton>

              <SeekButton className={seekButtonClass} seconds={15}>
                <ControlIcon inverted src="/icons/forward15s.svg" />
              </SeekButton>

              <div className="flex items-center gap-2 rounded-full bg-white/8 px-3  w-32">
                <MuteButton className="inline-flex h-6 w-6 cursor-pointer items-center justify-center text-white/88 transition hover:text-white">
                  {isMuted || volume === 0 ? (
                    <ControlIcon inverted src="/icons/volumeOff.svg" />
                  ) : volume < 0.5 ? (
                    <ControlIcon inverted src="/icons/volumeDown.svg" />
                  ) : (
                    <ControlIcon inverted src="/icons/volumeUp.svg" />
                  )}
                </MuteButton>
                <VolumeSlider.Root
                  className="group/volume relative inline-flex h-10 w-full max-w-30 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden"
                  step={1}
                >
                  <VolumeSlider.Track className="relative z-0 h-1.5 w-full rounded-sm bg-white/10 transition-all group-data-focus/volume:ring-[3px] group-data-focus/volume:ring-white/20">
                    <VolumeSlider.TrackFill className="absolute z-20 h-full w-(--slider-fill) rounded-sm bg-zinc-300 will-change-[width]" />
                  </VolumeSlider.Track>
                  <VolumeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-30 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white opacity-0 ring-white/40 transition-opacity group-hover/volume:opacity-100 group-data-active/volume:opacity-100 group-data-dragging/volume:ring-4 will-change-[left,opacity]" />
                </VolumeSlider.Root>
              </div>

              {process.env.NEXT_PUBLIC_SHOW_P2P_STATS === "true" && (
                <P2PStatsModal />
              )}
            </div>

            <div className="hidden xs:flex min-w-0 flex-1 flex-wrap items-center gap-3 lg:gap-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-xl text-white sm:text-2xl">
                  {title}
                </p>
                {subtitle ? (
                  <p className="mt-1 truncate text-sm uppercase tracking-[0.22em] text-white/48">
                    {subtitle}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {nextEpisode ? (
              <Link
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-black transition hover:bg-white/90"
                href={nextEpisode.href}
              >
                <ControlIcon src="/icons/nextEpisode.svg" />
                {nextEpisode.label}
              </Link>
            ) : null}

            <SettingsMenu />

            <GoogleCastButton className={iconButtonClass}>
              <Cast className="size-5" />
            </GoogleCastButton>

            <PIPButton className={iconButtonClass}>
              {isPip ? (
                <Minimize className="size-5" />
              ) : (
                <PictureInPicture2 className="size-5" />
              )}
            </PIPButton>

            <FullscreenButton className={iconButtonClass}>
              {isFullscreen ? (
                <Minimize className="size-5" />
              ) : (
                <Expand className="size-5" />
              )}
            </FullscreenButton>
          </div>
        </Controls.Group>
      </div>
    </div>
  );
}

function MobileControls({
  backHref,
  backLabel,
  episodes,
  episodesLabel,
  nextEpisode,
  subtitle,
  title,
}: {
  backHref?: string;
  backLabel?: string;
  episodes: EpisodeOption[];
  episodesLabel: string;
  nextEpisode?: NextEpisodeOption | null;
  subtitle?: string;
  title: string;
}) {
  const isPaused = useMediaState("paused");
  const isFullscreen = useMediaState("fullscreen");
  const isMuted = useMediaState("muted");
  const isPip = useMediaState("pictureInPicture");
  const volume = useMediaState("volume");

  const iconButtonClass =
    "inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <div className="hidden pointer-coarse:flex flex-col w-full h-full justify-between pointer-events-none">
      {/* Top Bar */}
      <Controls.Group className="pointer-events-auto flex w-full items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {backHref ? (
            <Link
              className="inline-flex h-10 cursor-pointer items-center justify-center rounded-full bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/18 disabled:cursor-not-allowed disabled:opacity-35"
              href={backHref}
            >
              <ControlIcon inverted src="/icons/arrowLeft.svg" />
            </Link>
          ) : null}
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-display text-sm tracking-wide text-white">
              {title}
            </span>
            {subtitle ? (
              <span className="truncate text-[0.65rem] uppercase tracking-[0.2em] text-white/48">
                {subtitle}
              </span>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {process.env.NEXT_PUBLIC_SHOW_P2P_STATS === "true" && (
            <P2PStatsModal />
          )}
          <SettingsMenu />
        </div>
      </Controls.Group>

      {/* Middle Controls (Play/Pause, Seek) */}
      <Controls.Group className="pointer-events-none flex flex-1 w-full items-center justify-center gap-8 xs:gap-12">
        <SeekButton
          className="pointer-events-auto inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
          seconds={-5}
        >
          <ControlIcon inverted src="/icons/backward5s.svg" />
        </SeekButton>

        <PlayButton className="pointer-events-auto inline-flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-xl transition-all hover:bg-white/90 active:scale-95">
          {isPaused ? (
            <ControlIcon src="/icons/play.svg" className="ml-1 w-8 h-8" />
          ) : (
            <ControlIcon src="/icons/pause.svg" className="w-8 h-8" />
          )}
        </PlayButton>

        <SeekButton
          className="pointer-events-auto inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
          seconds={15}
        >
          <ControlIcon inverted src="/icons/forward15s.svg" />
        </SeekButton>
      </Controls.Group>

      {/* Bottom Bar */}
      <Controls.Group className="pointer-events-auto flex w-full flex-col gap-2 relative">
        <div className="flex w-full items-center gap-2 px-1">
          <Time
            className="text-[0.7rem] font-medium tabular-nums tracking-wide text-white/70"
            type="current"
          />

          <TimeSlider.Root className="group/timeline relative inline-flex h-10 flex-1 cursor-pointer touch-none select-none items-center outline-none aria-hidden:hidden">
            <TimeSlider.Track className="relative z-0 h-[3px] w-full rounded-sm bg-white/30 transition-all group-data-focus/timeline:ring-[3px] group-data-focus/timeline:ring-orange-400/40">
              <TimeSlider.TrackFill className="absolute z-20 h-full w-(--slider-fill) rounded-sm bg-orange-400 will-change-[width]" />
              <TimeSlider.Progress className="absolute z-10 h-full w-(--slider-progress) rounded-sm bg-white/50 will-change-[width]" />
            </TimeSlider.Track>
            <TimeSlider.Thumb className="absolute left-(--slider-fill) top-1/2 z-30 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-300 bg-white opacity-0 transition-opacity group-hover/timeline:opacity-100 group-data-active/timeline:opacity-100 group-data-dragging/timeline:opacity-100 group-data-dragging/timeline:ring-4 will-change-[left,opacity]" />
          </TimeSlider.Root>

          <Time
            className="text-[0.7rem] font-medium tabular-nums tracking-wide text-white/50"
            type="duration"
          />
        </div>

        <div className="flex min-w-0 w-full items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            {nextEpisode ? (
              <Link
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full bg-white/15 px-3 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95"
                href={nextEpisode.href}
              >
                <ControlIcon
                  inverted
                  src="/icons/nextEpisode.svg"
                  className="w-4 h-4"
                />
                <span className="hidden leading-none xs:block">
                  {nextEpisode.label}
                </span>
              </Link>
            ) : null}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <GoogleCastButton className={iconButtonClass}>
              <Cast className="size-4" />
            </GoogleCastButton>

            <PIPButton className={iconButtonClass}>
              {isPip ? (
                <Minimize className="size-4" />
              ) : (
                <PictureInPicture2 className="size-4" />
              )}
            </PIPButton>

            <FullscreenButton className={iconButtonClass}>
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Expand className="size-4" />
              )}
            </FullscreenButton>
          </div>
        </div>
      </Controls.Group>
    </div>
  );
}

export function VidstackPlayer({
  accent,
  backHref,
  backLabel,
  episodes = [],
  episodesLabel = "Episodes",
  nextEpisode,
  src,
  subtitle,
  title,
  tracks = [],
}: VidstackPlayerProps) {
  const playerStyle: CSSProperties &
    Record<`--${string}`, string | number | null | undefined> = {
    "--media-focus-ring": "0 0 0 3px rgba(251,146,60,0.35)",
    "--media-focus-ring-color": accent,
    "--video-brand": accent,
  };
  const playerRef = useRef<import("@vidstack/react").MediaPlayerInstance>(null);
  const remote = useMediaRemote(playerRef);
  const [visible, setVisible] = useState(true);

  function onProviderChange(provider: MediaProviderAdapter | null) {
    if (!isHLSProvider(provider)) return;

    import("p2p-media-loader-hlsjs").then(({ HlsJsP2PEngine }) => {
      console.log("[P2P] Initializing Engine");

      const engine = new HlsJsP2PEngine({
        core: {
          announceTrackers: [
            "wss://tracker.openwebtorrent.com",
            "wss://tracker.webtorrent.dev",
          ],
          rtcConfig: {
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" },
              { urls: "stun:global.stun.twilio.com:3478" },
            ],
          },
          httpDownloadTimeWindow: 45, // Cap pre-download HTTP to 45 seconds ahead
          p2pDownloadTimeWindow: 60, // Cap pre-download P2P to 60 seconds ahead
        },
      });

      provider.config = {
        ...provider.config,
        ...engine.getConfigForHlsJs(),
        enableWorker: false, // Critical: Custom loaders cannot be passed to a web worker
        maxBufferLength: 30, // Limit native HLS buffer to 30 seconds
        maxMaxBufferLength: 60, // Absolute limit native HLS buffer limit to 60 seconds
      };

      provider.onInstance((hls) => {
        if (!hls) return;

        console.log("[P2P] HLS instance ready");

        // 🔥 bind después
        engine.bindHls(hls);

        console.log("[P2P] Engine bound to HLS");
      });

      // logs
      engine.addEventListener("onPeerConnect", (peer) => {
        console.log("[P2P] Peer connected:", peer.peerId);
        window.dispatchEvent(
          new CustomEvent("p2p-peer-connect", { detail: peer.peerId }),
        );
      });

      engine.addEventListener("onPeerClose", (peerId) => {
        console.log("[P2P] Peer disconnected:", peerId);
        window.dispatchEvent(
          new CustomEvent("p2p-peer-close", { detail: peerId }),
        );
      });

      engine.addEventListener("onChunkDownloaded", (...args) => {
        const [bytesLength, downloadSource, peerId] = args;
        console.log("[P2P] Chunk:", bytesLength, downloadSource, peerId);
        window.dispatchEvent(
          new CustomEvent("p2p-chunk", {
            detail: { bytesLength, downloadSource, peerId },
          }),
        );
      });
    });
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleInteraction = () => {
      setVisible(true);
      if (playerRef.current) {
        playerRef.current.controls.show();
      }
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setVisible(false);
        if (playerRef.current) {
          playerRef.current.controls.hide();
        }
      }, 2500);
    };

    handleInteraction(); // initial

    window.addEventListener("mousemove", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("mousemove", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <MediaPlayer
        ref={playerRef}
        className="h-dvh w-full max-w-full overflow-hidden bg-black [--media-menu-border:0] [--media-slider-thumb-border:0] [--media-thumbnail-border:0] [--media-time-border:0] [--media-tooltip-border:0]"
        load="visible"
        onProviderChange={onProviderChange}
        playsInline
        src={src}
        style={playerStyle}
        title={title}
      >
        <MediaProvider className="h-full w-full">
          {tracks.map((track) => (
            <Track
              default={track.default}
              key={track.src}
              kind={track.kind}
              label={track.label}
              language={track.language}
              src={track.src}
            />
          ))}
        </MediaProvider>
        <Gesture
          className="pointer-coarse:hidden absolute inset-0 z-0 block h-full w-full"
          event="pointerup"
          action="toggle:paused"
        />
        <Gesture
          className="pointer-fine:hidden absolute inset-0 z-0 block h-full w-full"
          event="pointerup"
          action="toggle:controls"
        />
        <Gesture
          className="absolute inset-0 z-10 block h-full w-1/5"
          event="dblpointerup"
          action="seek:-5"
        />
        <Gesture
          className="absolute inset-0 z-10 block h-full w-1/5 left-11/12"
          event="dblpointerup"
          action="seek:15"
        />
        <Gesture
          className="absolute inset-0 z-0 block h-full w-full"
          event="dblpointerup"
          action="toggle:fullscreen"
        />
        <Controls.Root
          className={`absolute inset-0 flex flex-col justify-between bg-[linear-gradient(180deg,rgba(4,6,12,0.56)_0%,rgba(4,6,12,0.06)_24%,rgba(4,6,12,0)_46%,rgba(4,6,12,0.9)_100%)] px-4 pb-4 pt-4 sm:px-6 sm:pb-6 lg:px-10 lg:pb-8 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <DesktopControls
            backHref={backHref}
            backLabel={backLabel}
            episodes={episodes}
            episodesLabel={episodesLabel}
            nextEpisode={nextEpisode}
            subtitle={subtitle}
            title={title}
          />
          <MobileControls
            backHref={backHref}
            backLabel={backLabel}
            episodes={episodes}
            episodesLabel={episodesLabel}
            nextEpisode={nextEpisode}
            subtitle={subtitle}
            title={title}
          />
        </Controls.Root>
      </MediaPlayer>
    </>
  );
}
