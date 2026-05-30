// ─── Central Asset Registry ───────────────────────────────────────────────────
// All your real images and videos are imported here.
// Every component uses getImage(key) or the named exports below.
// 
// FILE NAMES EXPECTED in src/assets/:
//   hero.mp4, boyvideo.mp4
//   logo.jpeg
//   leg1.jpeg, leg2.jpeg, leg3.jpeg, leg4.jpeg, leg5.jpeg, leg6.jpeg, leg8.jpeg

import leg1 from './leg1.jpeg'
import leg2 from './leg2.jpeg'
import leg3 from './leg3.jpeg'
import leg4 from './leg4.jpeg'
import leg5 from './leg5.jpeg'
import leg6 from './leg6.jpeg'
import leg8 from './leg8.jpeg'
import logo      from './logo.jpeg'
import heroVideo from './hero.mp4'
import boyVideo  from './boyvideo.mp4'
import founder  from './lanfrank.jpeg'

export const logoSrc      = logo
export const heroVideoSrc = heroVideo
export const boyVideoSrc  = boyVideo
export const founderSrc   = founder
export const imageMap = {
  leg1, leg2, leg3, leg4, leg5, leg6, leg8,
  founder
}

// Returns the real image, no fallback needed — all images are yours now
export function getImage(key) {
  return imageMap[key] || leg1
}

// Named list for gallery / slideshows
export const allLegImages = [leg1, leg2, leg3, leg4, leg5, leg6, leg8, founder]