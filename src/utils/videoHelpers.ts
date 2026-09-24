/**
 * Helper to parse and convert YouTube/Vimeo/Direct video URLs to embed URLs and thumbnail URLs
 */

export interface VideoInfo {
  isYouTube: boolean;
  isVimeo: boolean;
  isDirect: boolean;
  embedUrl?: string;
  videoId?: string;
  thumbnailUrl?: string;
}

export function parseVideoUrl(url: string | undefined): VideoInfo {
  if (!url) {
    return { isYouTube: false, isVimeo: false, isDirect: false };
  }

  const cleanUrl = url.trim();

  // YouTube matchers:
  // standard: https://www.youtube.com/watch?v=VIDEO_ID
  // short: https://youtu.be/VIDEO_ID
  // shorts: https://www.youtube.com/shorts/VIDEO_ID
  // embed: https://www.youtube.com/embed/VIDEO_ID
  const youtubeRegex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
  const ytMatch = cleanUrl.match(youtubeRegex);

  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      isYouTube: true,
      isVimeo: false,
      isDirect: false,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    };
  }

  // Vimeo matchers
  const vimeoRegex = /(?:vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|))(\d+)/;
  const vimeoMatch = cleanUrl.match(vimeoRegex);

  if (vimeoMatch && vimeoMatch[3]) {
    const videoId = vimeoMatch[3];
    return {
      isYouTube: false,
      isVimeo: true,
      isDirect: false,
      videoId,
      embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
    };
  }

  // Direct video (mp4, webm, etc.)
  return {
    isYouTube: false,
    isVimeo: false,
    isDirect: true,
    embedUrl: cleanUrl,
  };
}

/**
 * Extracts youtube video ID from a url if valid
 */
export function getYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  const match = url.trim().match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return match ? match[1] : null;
}

/**
 * Generates an auto-detected YouTube thumbnail or fallback
 */
export function getAutoThumbnail(videoUrl: string | undefined, fallbackImage?: string): string {
  const ytId = getYouTubeId(videoUrl);
  if (ytId) {
    return `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
  }
  return fallbackImage || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop';
}
