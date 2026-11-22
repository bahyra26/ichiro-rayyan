export const PROJECT_LINKS = {
  repoUrl: 'https://github.com/bahyra26/Humanoid-Goalkeeper',
  upstreamPaperUrl: 'https://arxiv.org/abs/2510.18002',
  upstreamRepoUrl: 'https://github.com/InternRobotics/Humanoid-Goalkeeper',
  ichiroUrl: 'https://www.instagram.com/ichiro.its/?hl=en',
} as const;

export const isVideoFile = (src: string) => /\.(mp4|webm|ogg)$/i.test(src);

export function pauseOtherVideos(active?: HTMLVideoElement | null) {
  document.querySelectorAll('video').forEach((video) => {
    if (video !== active && !video.paused) video.pause();
  });
}

export type HeroMediaConfig = {
  videoSrc?: string;
  stillSrc: string;
  stillAlt: string;
  caption: string;
};

export const HERO_MEDIA: HeroMediaConfig = {
  videoSrc: 'videos/15_random_5shots_continuous.webp',
  stillSrc: 'images/k1_high_parry.png',
  stillAlt:
    'Booster K1 humanoid goalkeeper defending five consecutive random shots in NVIDIA Isaac Gym',
  caption:
    'Continuous 5-shot random sequence in 1 take — Policy 1 (v11_6000) + Policy 2 (walk_v5_2700) in NVIDIA Isaac Gym.',
};

export type RegionId = 'R0' | 'R1' | 'R2' | 'R3' | 'R4' | 'R5';
export type SpeedTier = 'standard' | 'fast';

export type RegionClip = {
  id: string;
  region: RegionId;
  label: string;
  targetArea: string;
  expectedFile: string;
  src?: string;
  poster?: string;
  posterAlt?: string;
  speedMps: number;
  launchY: string;
  targetY: string;
  targetZ: string;
  maxTilt: number;
  verifiedSave: boolean;
};

export type WalkbackClip = {
  id: string;
  region: RegionId;
  label: string;
  expectedFile: string;
  src?: string;
  poster?: string;
  speedMps: number;
  homeSteps: number;
  homeSeconds: number;
  verifiedSave: boolean;
};

export const REGION_CLIPS: Record<SpeedTier, RegionClip[]> = {
  standard: [
    {
      id: 'std_r0',
      region: 'R0',
      label: 'Middle Left',
      targetArea: "Middle-height, robot's left (+Y)",
      expectedFile: '01_std_r0_mid_left.webp',
      src: 'videos/01_std_r0_mid_left.webp',
      speedMps: 7.0,
      launchY: '+0.20',
      targetY: '+0.35',
      targetZ: '0.55',
      maxTilt: 0.383,
      verifiedSave: true,
    },
    {
      id: 'std_r1',
      region: 'R1',
      label: 'Middle Right',
      targetArea: "Middle-height, robot's right (−Y)",
      expectedFile: '02_std_r1_mid_right.webp',
      src: 'videos/02_std_r1_mid_right.webp',
      speedMps: 7.5,
      launchY: '0.00',
      targetY: '−0.45',
      targetZ: '0.62',
      maxTilt: 0.418,
      verifiedSave: true,
    },
    {
      id: 'std_r2',
      region: 'R2',
      label: 'Upper Left',
      targetArea: "High, robot's left (+Y)",
      expectedFile: '03_std_r2_high_left.webp',
      src: 'videos/03_std_r2_high_left.webp',
      speedMps: 8.5,
      launchY: '0.00',
      targetY: '+0.60',
      targetZ: '0.98',
      maxTilt: 0.385,
      verifiedSave: true,
    },
    {
      id: 'std_r3',
      region: 'R3',
      label: 'Upper Right',
      targetArea: "High, robot's right (−Y)",
      expectedFile: '04_std_r3_high_right.webp',
      src: 'videos/04_std_r3_high_right.webp',
      speedMps: 7.8,
      launchY: '0.00',
      targetY: '−0.45',
      targetZ: '0.85',
      maxTilt: 0.291,
      verifiedSave: true,
    },
    {
      id: 'std_r4',
      region: 'R4',
      label: 'Lower Left',
      targetArea: "Low, robot's left (+Y)",
      expectedFile: '05_std_r4_low_left.webp',
      src: 'videos/05_std_r4_low_left.webp',
      speedMps: 7.8,
      launchY: '−0.20',
      targetY: '+0.45',
      targetZ: '0.22',
      maxTilt: 0.575,
      verifiedSave: true,
    },
    {
      id: 'std_r5',
      region: 'R5',
      label: 'Lower Right',
      targetArea: "Low, robot's right (−Y)",
      expectedFile: '06_std_r5_low_right.webp',
      src: 'videos/06_std_r5_low_right.webp',
      speedMps: 7.5,
      launchY: '0.00',
      targetY: '−0.25',
      targetZ: '0.20',
      maxTilt: 0.451,
      verifiedSave: true,
    },
  ],
  fast: [
    {
      id: 'fast_r0',
      region: 'R0',
      label: 'Middle Left',
      targetArea: "Middle-height, robot's left (+Y)",
      expectedFile: '07_fast_r0_mid_left.webp',
      src: 'videos/07_fast_r0_mid_left.webp',
      speedMps: 10.5,
      launchY: '+0.20',
      targetY: '+0.35',
      targetZ: '0.55',
      maxTilt: 0.393,
      verifiedSave: true,
    },
    {
      id: 'fast_r1',
      region: 'R1',
      label: 'Middle Right',
      targetArea: "Middle-height, robot's right (−Y)",
      expectedFile: '08_fast_r1_mid_right.webp',
      src: 'videos/08_fast_r1_mid_right.webp',
      speedMps: 11.0,
      launchY: '0.00',
      targetY: '−0.45',
      targetZ: '0.65',
      maxTilt: 0.302,
      verifiedSave: true,
    },
    {
      id: 'fast_r2',
      region: 'R2',
      label: 'Upper Left',
      targetArea: "High, robot's left (+Y)",
      expectedFile: '09_fast_r2_high_left.webp',
      src: 'videos/09_fast_r2_high_left.webp',
      speedMps: 11.0,
      launchY: '0.00',
      targetY: '+0.50',
      targetZ: '0.95',
      maxTilt: 0.289,
      verifiedSave: true,
    },
    {
      id: 'fast_r3',
      region: 'R3',
      label: 'Upper Right',
      targetArea: "High, robot's right (−Y)",
      expectedFile: '10_fast_r3_high_right.webp',
      src: 'videos/10_fast_r3_high_right.webp',
      speedMps: 12.0,
      launchY: '0.00',
      targetY: '−0.65',
      targetZ: '1.12',
      maxTilt: 0.309,
      verifiedSave: true,
    },
    {
      id: 'fast_r4',
      region: 'R4',
      label: 'Lower Left',
      targetArea: "Low, robot's left (+Y)",
      expectedFile: '11_fast_r4_low_left.webp',
      src: 'videos/11_fast_r4_low_left.webp',
      speedMps: 12.0,
      launchY: '0.00',
      targetY: '+0.45',
      targetZ: '0.24',
      maxTilt: 0.381,
      verifiedSave: true,
    },
    {
      id: 'fast_r5',
      region: 'R5',
      label: 'Lower Right',
      targetArea: "Low, robot's right (−Y)",
      expectedFile: '12_fast_r5_low_right.webp',
      src: 'videos/12_fast_r5_low_right.webp',
      speedMps: 10.5,
      launchY: '0.00',
      targetY: '−0.30',
      targetZ: '0.22',
      maxTilt: 0.439,
      verifiedSave: true,
    },
  ],
};

export const WALKBACK_CLIPS: WalkbackClip[] = [
  {
    id: 'walkback_fast_r2',
    region: 'R2',
    label: 'Upper Left → READY_HOME',
    expectedFile: '13_walkback_r2_high_left.webp',
    src: 'videos/13_walkback_r2_high_left.webp',
    speedMps: 11.0,
    homeSteps: 148,
    homeSeconds: 2.96,
    verifiedSave: true,
  },
  {
    id: 'walkback_fast_r1',
    region: 'R1',
    label: 'Middle Right → READY_HOME',
    expectedFile: '14_walkback_r1_mid_right.webp',
    src: 'videos/14_walkback_r1_mid_right.webp',
    speedMps: 11.0,
    homeSteps: 196,
    homeSeconds: 3.92,
    verifiedSave: true,
  },
];
