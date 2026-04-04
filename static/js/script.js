const STORAGE_KEY = "mikrokosmos-memo-frontend-v1";
const THEME_KEY = "mikrokosmos-memo-theme";

const MEMBERS = ["All", "BTS", "RM", "Jin", "Suga", "J-Hope", "Jimin", "V", "Jungkook"];
const MEMBER_ORDER = [  "RM", "Jin", "Suga",  "J-Hope",  "Jimin",  "V",  "Jungkook",  "BTS"];


const ALBUM_ORDER = [
  "2 Cool 4 Skool",
  "O!RUL8,2!",
  "Skool Luv Affair",
  "Skool Luv Affair (Special Addition)",
  "Dark & Wild",
  "The Most Beautiful Moment in Life Pt.1",
  "The Most Beautiful Moment in Life Pt.2",
  "The Most Beautiful Moment in Life: Young Forever",
  "Wings",
  "You Never Walk Alone",
  "Love Yourself: Her",
  "Love Yourself: Tear",
  "Love Yourself: Answer",
  "Map of the Soul: Persona",
  "BTS World OST",
  "Map of the Soul: 7",
  "BE",
  "Butter",
  "Proof",
]
const CARDS = [
  {
    id: "mots7-v1-rm",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "RM",
    image: "images/mots7-1-rm.jpg"
  },
  {
    id: "mots7-v1-jin",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "Jin",
    image: "images/mots7-1-jin.jpg"
  },
  {
    id: "mots-v1-suga",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "Suga",
    image: "images/mots7-1-suga.jpg"
  },
  {
    id: "mots7-v1-jhope",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "J-Hope",
    image: "images/mots7-1-jhope.jpg"
  },
  {
    id: "mots7-v1-jimin",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "Jimin",
    image: "images/mots7-1-jimin.jpg"
  },
  {
    id: "mots7-v1-v",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "V",
    image: "images/mots7-1-v.jpeg"
  },
  {
    id: "mots7-v1-jk",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "Jungkook",
    image: "images/mots7-1-jk.jpeg"
  },
  {
    id: "mots7-v1-bts",
    era: "Map of the Soul: 7",
    version: "Version 1",
    member: "BTS",
    image: "images/mots7-1-bts.jpg"
  },
  {
    id: "mots7-v2-rm",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "RM",
    image: "images/mots7-2-rm.jpg"
  },
  {
    id: "mots7-v2-jin",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "Jin",
    image: "images/mots7-2-jin.jpg"
  },
  {
    id: "mots7-v2-suga",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "Suga",
    image: "images/mots7-2-suga.jpg"
  },
  {
    id: "mots7-v2-jhope",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "J-Hope",
    image: "images/mots7-2-jhope.jpg"
  },
  {id: "mots7-v2-jimin",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "Jimin",
    image: "images/mots7-2-jimin.jpg"
  },
  {id: "mots7-v2-v",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "V",
    image: "images/mots7-2-v.jpeg"
  },
  {id: "mots7-v2-jk",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "Jungkook",
    image: "images/mots7-2-jk.jpeg"
  },
  {id: "mots7-v2-bts",
    era: "Map of the Soul: 7",
    version: "Version 2",
    member: "BTS",
    image: "images/mots7-2-bts.jpg"
  },  
  {id: "mots7-v3-rm",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "RM",
    image: "images/mots7-3-rm.jpg"
  },
  {id: "mots7-v3-jin",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "Jin",
    image: "images/mots7-3-jin.jpg"
  },
  {id: "mots7-v3-suga",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "Suga",
    image: "images/mots7-3-suga.jpg"
  },
  {id: "mots7-v3-jhope",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "J-Hope",
    image: "images/mots7-3-jhope.jpg"
  },
  {id: "mots7-v3-jimin",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "Jimin",
    image: "images/mots7-3-jimin.jpg"
  },
  {id: "mots7-v3-v",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "V",
    image: "images/mots7-3-v.jpeg"
  },
  {id: "mots7-v3-jk",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "Jungkook",
    image: "images/mots7-3-jk.jpeg"
  },
  {id: "mots7-v3-bts",
    era: "Map of the Soul: 7",
    version: "Version 3",
    member: "BTS",
    image: "images/mots7-3-bts.jpg"
  }, 
  {id: "mots7-v4-rm",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "RM",
    image: "images/mots7-4-rm.jpg"
  },
  {id: "mots7-v4-jin",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "Jin",
    image: "images/mots7-4-jin.jpg"
  },
  {id: "mots7-v4-suga",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "Suga",
    image: "images/mots7-4-suga.jpg"
  },
  {id: "mots7-v4-jhope",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "J-Hope",
    image: "images/mots7-4-jhope.jpg"
  },
  {id: "mots7-v4-jimin",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "Jimin",
    image: "images/mots7-4-jimin.jpg"
  },
  {id: "mots7-v4-v",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "V",
    image: "images/mots7-4-v.jpeg"
  },
  {id: "mots7-v4-jk",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "Jungkook",
    image: "images/mots7-4-jk.jpeg"
  },
  {id: "mots7-v4-bts",
    era: "Map of the Soul: 7",
    version: "Version 4",
    member: "BTS",
    image: "images/mots7-4-bts.jpg"
  },
  {id: "orul82-rm",
    era: "O!RUL8,2?",
    member: "RM",
    image: "images/orul82-rm.jpeg"
  },
  {id: "orul82-jin",
    era: "O!RUL8,2?",
    member: "Jin",
    image: "images/orul82-jin.jpeg"
  },
  {id: "orul82-suga",
    era: "O!RUL8,2?",
    member: "Suga",
    image: "images/orul82-suga.jpeg"
  },
  {id: "orul82-jhope",
    era: "O!RUL8,2?",
    member: "J-Hope",
    image: "images/orul82-jhope.jpeg"
  },
  {id: "orul82-jimin",
    era: "O!RUL8,2?",
    member: "Jimin",
    image: "images/orul82-jimin.jpeg"
  },
  {id: "orul82-v",
    era: "O!RUL8,2?",
    member: "V",
    image: "images/orul82-v.jpeg"
  },
  {id: "orul82-jk",
    era: "O!RUL8,2?",
    member: "Jungkook",
    image: "images/orul82-jk.jpeg"
  },
  {id: "orul82-bts",
    era: "O!RUL8,2?",
    member: "BTS",
    image: "images/orul82-bts.jpeg"
  },
  {id: "d&w-rm",
    era: "Dark & Wild",
    member: "RM",
    image: "images/d&w-rm.jpeg"
  },
  {id: "d&w-jin",
    era: "Dark & Wild",
    member: "Jin",
    image: "images/d&w-jin.jpeg"
  },
  {id: "d&w-suga",
    era: "Dark & Wild",
    member: "Suga",
    image: "images/d&w-suga.jpeg"
  },
  {id: "d&w-jhope",
    era: "Dark & Wild",
    member: "J-Hope",
    image: "images/d&w-jhope.jpeg"
  },
  {id: "d&w-jimin",
    era: "Dark & Wild",
    member: "Jimin",
    image: "images/d&w-jimin.jpeg"
  },
  {id: "d&w-v",
    era: "Dark & Wild",
    member: "V",
    image: "images/d&w-v.jpeg"
  },
  {id: "d&w-jk",
    era: "Dark & Wild",
    member: "Jungkook",
    image: "images/d&w-jk.jpeg"
  },
  {id: "d&w-bts-1",
    era: "Dark & Wild",
    member: "BTS",
    image: "images/d&w-bts-1.jpeg"
  },
  {id: "d&w-bts-2",
    era: "Dark & Wild",
    member: "BTS",
    image: "images/d&w-bts-2.jpeg"
  },
  {id: "d&w-bts-3",
    era: "Dark & Wild",
    member: "BTS",
    image: "images/d&w-bts-3.jpeg"
  },
  {id: "sla-rm",
    era: "Skool Luv Affair",
    member: "RM",
    image: "images/sla-rm.jpeg"
  },  
  {id: "sla-jin",
    era: "Skool Luv Affair",
    member: "Jin",
    image: "images/sla-jin.jpeg"
  },
  {id: "sla-suga",
    era: "Skool Luv Affair",
    member: "Suga",
    image: "images/sla-suga.jpeg"
  },
  {id: "sla-jhope",
    era: "Skool Luv Affair",
    member: "J-Hope",
    image: "images/sla-jhope.jpeg"
  },
  {id: "sla-jimin",
    era: "Skool Luv Affair",
    member: "Jimin",
    image: "images/sla-jimin.jpeg"
  },
  {id: "sla-v",
    era: "Skool Luv Affair",
    member: "V",
    image: "images/sla-v.jpeg"
  },
  {id: "sla-jk",
    era: "Skool Luv Affair",
    member: "Jungkook",
    image: "images/sla-jk.jpeg"
  },
  {id: "hyyh-pt1-rm",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "RM",
    image: "images/hyyh-pt1-rm.jpeg"
  },
  {id: "hyyh-pt1-jin",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "Jin",
    image: "images/hyyh-pt1-jin.jpeg"
  },
  {id: "hyyh-pt1-suga",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "Suga",
    image: "images/hyyh-pt1-suga.jpeg"
  },
  {id: "hyyh-pt1-jhope",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "J-Hope",
    image: "images/hyyh-pt1-jhope.jpeg"
  },
  {id: "hyyh-pt1-jimin",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "Jimin",
    image: "images/hyyh-pt1-jimin.jpeg"
  },
  {id: "hyyh-pt1-v",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "V",
    image: "images/hyyh-pt1-v.jpeg"
  },
  {id: "hyyh-pt1-jk",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "Jungkook",
    image: "images/hyyh-pt1-jk.jpeg"
  },
  {id: "hyyh-pt1-bts",
    era: "The Most Beautiful Moment in Life Pt.1",
    member: "BTS",
    image: "images/hyyh-pt1-bts.jpeg"
  },
  {id: "hyyh-pt2-rm",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "RM",
    image: "images/hyyh-pt2-rm.jpeg"
  },
  {id: "hyyh-pt2-jin",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "Jin",
    image: "images/hyyh-pt2-jin.jpeg"
  },
  {id: "hyyh-pt2-suga",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "Suga",
    image: "images/hyyh-pt2-suga.jpeg"
  },
  {id: "hyyh-pt2-jhope",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "J-Hope",
    image: "images/hyyh-pt2-jhope.jpeg"
  },
  {id: "hyyh-pt2-jimin",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "Jimin",
    image: "images/hyyh-pt2-jimin.jpeg"
  },
  {id: "hyyh-pt2-v",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "V",
    image: "images/hyyh-pt2-v.jpeg"
  },
  {id: "hyyh-pt2-jk",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "Jungkook",
    image: "images/hyyh-pt2-jk.jpeg"
  },
  {id: "hyyh-pt2-bts",
    era: "The Most Beautiful Moment in Life Pt.2",
    member: "BTS",
    image: "images/hyyh-pt2-bts.jpeg"
  },
  {id: "yf-rm",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "RM",
    image: "images/yf-rm.jpeg"
  },
  {id: "yf-jin",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "Jin",
    image: "images/yf-jin.jpeg"
  },
  {id: "yf-suga",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "Suga",
    image: "images/yf-suga.jpeg"
  },
  {id: "yf-jhope",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "J-Hope",
    image: "images/yf-jhope.jpeg"
  },
  {id: "yf-jimin",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "Jimin",
    image: "images/yf-jimin.jpeg"
  },
  {id: "yf-v",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "V",
    image: "images/yf-v.jpeg"
  },
  {id: "yf-jk",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "Jungkook",
    image: "images/yf-jk.jpeg"
  },
  {id: "yf-bts",
    era: "The Most Beautiful Moment in Life: Young Forever",
    member: "BTS",
    image: "images/yf-bts.jpeg"
  },
  {id: "sla-sa-rm",
    era: "Skool Luv Affair (Special Addition)",
    member: "RM",
    image: "images/sla-sa-rm.jpeg"
  },
  {id: "sla-sa-jin",
    era: "Skool Luv Affair (Special Addition)",
    member: "Jin",
    image: "images/sla-sa-jin.jpeg"
  },
  {id: "sla-sa-suga",
    era: "Skool Luv Affair (Special Addition)",
    member: "Suga",
    image: "images/sla-sa-suga.jpeg"
  },
  {id: "sla-sa-jhope",
    era: "Skool Luv Affair (Special Addition)",
    member: "J-Hope",
    image: "images/sla-sa-jhope.jpeg"
  },
  {id: "sla-sa-jimin",
    era: "Skool Luv Affair (Special Addition)",
    member: "Jimin",
    image: "images/sla-sa-jimin.jpeg"
  },
  {id: "sla-sa-v",
    era: "Skool Luv Affair (Special Addition)",
    member: "V",
    image: "images/sla-sa-v.jpeg"
  },
  {id: "sla-sa-jk",
    era: "Skool Luv Affair (Special Addition)",
    member: "Jungkook",
    image: "images/sla-sa-jk.jpeg"
  },
  {id: "sla-sa-bts",
    era: "Skool Luv Affair (Special Addition)",
    member: "BTS",
    image: "images/sla-sa-bts.jpeg"
  },
  {id: "ywna-rm",
    era: "You Never Walk Alone",
    member: "RM",
    image: "images/ynwa-rm.jpeg"
  },  
  {id: "ywna-jin",
    era: "You Never Walk Alone",
    member: "Jin",
    image: "images/ynwa-jin.jpeg"
  },
  {id: "ywna-suga",
    era: "You Never Walk Alone",
    member: "Suga",
    image: "images/ynwa-suga.jpeg"
  },
  {id: "ywna-jhope",
    era: "You Never Walk Alone",
    member: "J-Hope",
    image: "images/ynwa-jhope.jpeg"
  },
  {id: "ywna-jimin",
    era: "You Never Walk Alone",
    member: "Jimin",
    image: "images/ynwa-jimin.jpeg"
  },
  {id: "ywna-v",
    era: "You Never Walk Alone",
    member: "V",
    image: "images/ynwa-v.jpeg"
  },
  {id: "ywna-jk",
    era: "You Never Walk Alone",
    member: "Jungkook",
    image: "images/ynwa-jk.jpeg"
  },
  {id: "ywna-bts",
    era: "You Never Walk Alone",
    member: "BTS",
    image: "images/ynwa-bts.jpeg"
  },
  {id: "wings-rm",
    era: "Wings",
    member: "RM",
    image: "images/wings-rm.jpeg"
  },
  {id: "wings-jin",
    era: "Wings",
    member: "Jin",
    image: "images/wings-jin.jpeg"
  },
  {id: "wings-suga",
    era: "Wings",
    member: "Suga",
    image: "images/wings-suga.jpeg"
  },
  {id: "wings-jhope",
    era: "Wings",
    member: "J-Hope",
    image: "images/wings-jhope.jpeg"
  },
  {id: "wings-jimin",
    era: "Wings",
    member: "Jimin",
    image: "images/wings-jimin.jpeg"
  },
  {id: "wings-v",
    era: "Wings",
    member: "V",
    image: "images/wings-v.jpeg"
  },
  {id: "wings-jk",
    era: "Wings",
    member: "Jungkook",
    image: "images/wings-jk.jpeg"
  },
  {id: "wings-bts",
    era: "Wings",
    member: "BTS",
    image: "images/wings-bts.jpeg"
  },
  {
    id: "lyher-l-rm",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "RM",
    image: "images/lyher-l-rm.jpeg"
  },
  {
    id: "lyher-l-jin",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "Jin",
    image: "images/lyher-l-jin.jpeg"
  },
  {
    id: "lyher-l-suga",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "Suga",
    image: "images/lyher-l-suga.jpeg"
  },
  {
    id: "lyher-l-jhope",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "J-Hope",
    image: "images/lyher-l-jhope.jpeg"
  },
  {
    id: "lyher-l-jimin",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "Jimin",
    image: "images/lyher-l-jimin.jpeg"
  },
  {
    id: "lyher-l-v",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "V",
    image: "images/lyher-l-v.jpeg"
  },
  {
    id: "lyher-l-jk",
    era: "Love Yourself: Her",
    version: "Version L",
    member: "Jungkook",
    image: "images/lyher-l-jk.jpeg"
  },
  {
    id: "lyher-o-rm",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "RM",
    image: "images/lyher-o-rm.jpeg"
  },
  {
    id: "lyher-o-jin",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "Jin",
    image: "images/lyher-o-jin.jpeg"
  },  {
    id: "lyher-o-suga",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "Suga",
    image: "images/lyher-o-suga.jpg"
  },  
  {
    id: "lyher-o-jhope",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "J-Hope",
    image: "images/lyher-o-jhope.jpeg"
  },  {
    id: "lyher-o-jimin",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "Jimin",
    image: "images/lyher-o-jimin.jpeg"
  },  {
    id: "lyher-o-v",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "V",
    image: "images/lyher-o-v.jpeg"
  }, 
  {
    id: "lyher-o-jk",
    era: "Love Yourself: Her",
    version: "Version O",
    member: "Jungkook",
    image: "images/lyher-o-jk.jpeg"
  },
  {
    id: "lyher-v-rm",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "RM",
    image: "images/lyher-v-rm.jpeg"
  },
  {
    id: "lyher-v-jin",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "Jin",
    image: "images/lyher-v-jin.jpeg"
  },
  {
    id: "lyher-v-suga",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "Suga",
    image: "images/lyher-v-suga.jpeg"
  },
  {
    id: "lyher-v-jhope",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "J-Hope",
    image: "images/lyher-v-jhope.jpeg"
  },
  {
    id: "lyher-v-jimin",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "Jimin",
    image: "images/lyher-v-jimin.jpeg"
  },
  {
    id: "lyher-v-v",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "V",
    image: "images/lyher-v-v.jpeg"
  },  {
    id: "lyher-v-jk",
    era: "Love Yourself: Her",
    version: "Version V",
    member: "Jungkook",
    image: "images/lyher-v-jk.jpeg"
  },
  {
    id: "lyher-e-rm",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "RM",
    image: "images/lyher-e-rm.jpeg"
  },
  {
    id: "lyher-e-jin",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "Jin",
    image: "images/lyher-e-jin.jpeg"
  },
  {
    id: "lyher-e-suga",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "Suga",
    image: "images/lyher-e-suga.jpeg"
  },
  {
    id: "lyher-e-jhope",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "J-Hope",
    image: "images/lyher-e-jhope.jpeg"
  },
  {
    id: "lyher-e-jimin",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "Jimin",
    image: "images/lyher-e-jimin.jpeg"
  },
  {
    id: "lyher-e-v",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "V",
    image: "images/lyher-e-v.jpeg"
  },
  {
    id: "lyher-e-jk",
    era: "Love Yourself: Her",
    version: "Version E",
    member: "Jungkook",
    image: "images/lyher-e-jk.jpeg"
  },
  {
    id: "lyher-bts",
    era: "Love Yourself: Her",
    member: "BTS",
    image: "images/lyher-bts.jpeg"
  },
  {
    id: "lytear-y-rm",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "RM",
    image: "images/lytear-y-rm.jpeg"
  },
  {
    id: "lytear-y-jin",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "Jin",
    image: "images/lytear-y-jin.jpeg"
  },
  {
    id: "lytear-y-suga",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "Suga",
    image: "images/lytear-y-suga.jpeg"
  },
  {
    id: "lytear-y-jhope",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "J-Hope",
    image: "images/lytear-y-jhope.jpeg"
  },
  {
    id: "lytear-y-jimin",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "Jimin",
    image: "images/lytear-y-jimin.jpeg"
  },
  {
    id: "lytear-y-v",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "V",
    image: "images/lytear-y-v.jpeg"
  },
  {
    id: "lytear-y-jk",
    era: "Love Yourself: Tear",
    version: "Version Y",
    member: "Jungkook",
    image: "images/lytear-y-jk.jpeg"
  },
  {
    id: "lytear-o-rm",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "RM",
    image: "images/lytear-o-rm.jpeg"
  },
  {
    id: "lytear-o-jin",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "Jin",
    image: "images/lytear-o-jin.jpeg"
  },
  {
    id: "lytear-o-suga",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "Suga",
    image: "images/lytear-o-suga.jpeg"
  },
  {
    id: "lytear-o-jhope",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "J-Hope",
    image: "images/lytear-o-jhope.jpeg"
  },
  {
    id: "lytear-o-jimin",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "Jimin",
    image: "images/lytear-o-jimin.jpeg"
  },
  {
    id: "lytear-o-v",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "V",
    image: "images/lytear-o-v.jpeg"
  },
  {
    id: "lytear-o-jk",
    era: "Love Yourself: Tear",
    version: "Version O",
    member: "Jungkook",
    image: "images/lytear-o-jk.jpeg"
  },
  {
    id: "lytear-u-rm",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "RM",
    image: "images/lytear-u-rm.jpeg"
  },
  {
    id: "lytear-u-jin",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "Jin",
    image: "images/lytear-u-jin.jpeg"
  },
  {
    id: "lytear-u-suga",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "Suga",
    image: "images/lytear-u-suga.jpeg"
  },
  {
    id: "lytear-u-jhope",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "J-Hope",
    image: "images/lytear-u-jhope.jpeg"
  },
  {
    id: "lytear-u-jimin",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "Jimin",
    image: "images/lytear-u-jimin.jpeg"
  },
  {
    id: "lytear-u-v",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "V",
    image: "images/lytear-u-v.jpeg"
  },
  {
    id: "lytear-u-jk",
    era: "Love Yourself: Tear",
    version: "Version U",
    member: "Jungkook",
    image: "images/lytear-u-jk.jpeg"
  },
  {
    id: "lytear-r-rm",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "RM",
    image: "images/lytear-r-rm.jpeg"
  },
  {
    id: "lytear-r-jin",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "Jin",
    image: "images/lytear-r-jin.jpeg"
  },
  {
    id: "lytear-r-suga",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "Suga",
    image: "images/lytear-r-suga.jpeg"
  },
  {
    id: "lytear-r-jhope",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "J-Hope",
    image: "images/lytear-r-jhope.jpeg"
  },
  {
    id: "lytear-r-jimin",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "Jimin",
    image: "images/lytear-r-jimin.jpeg"
  },
  {
    id: "lytear-r-v",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "V",
    image: "images/lytear-r-v.jpeg"
  },
  {
    id: "lytear-r-jk",
    era: "Love Yourself: Tear",
    version: "Version R",
    member: "Jungkook",
    image: "images/lytear-r-jk.jpeg"
  },
  {
    id: "lyanswer-s-rm",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "RM",
    image: "images/lyanswer-s-rm.jpeg"
  },
  {
    id: "lyanswer-s-jin",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "Jin",
    image: "images/lyanswer-s-jin.jpeg"
  },
  {
    id: "lyanswer-s-suga",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "Suga",
    image: "images/lyanswer-s-suga.jpeg"
  },
  {
    id: "lyanswer-s-jhope",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "J-Hope",
    image: "images/lyanswer-s-jhope.jpeg"
  },
  {
    id: "lyanswer-s-jimin",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "Jimin",
    image: "images/lyanswer-s-jimin.jpeg"
  },
  {
    id: "lyanswer-s-v",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "V",
    image: "images/lyanswer-s-v.jpeg"
  },
  {
    id: "lyanswer-s-jk",
    era: "Love Yourself: Answer",
    version: "Version S",
    member: "Jungkook",
    image: "images/lyanswer-s-jk.jpeg"
  },
  {
    id: "lyanswer-e-rm",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "RM",
    image: "images/lyanswer-e-rm.jpeg"
  },
  {
    id: "lyanswer-e-jin",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "Jin",
    image: "images/lyanswer-e-jin.jpeg"
  },
  {
    id: "lyanswer-e-suga",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "Suga",
    image: "images/lyanswer-e-suga.jpeg"
  },
  {
    id: "lyanswer-e-jhope",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "J-Hope",
    image: "images/lyanswer-e-jhope.jpeg"
  },
  {
    id: "lyanswer-e-jimin",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "Jimin",
    image: "images/lyanswer-e-jimin.jpeg"
  },
  {
    id: "lyanswer-e-v",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "V",
    image: "images/lyanswer-e-v.jpeg"
  },
  {
    id: "lyanswer-e-jk",
    era: "Love Yourself: Answer",
    version: "Version E",
    member: "Jungkook",
    image: "images/lyanswer-e-jk.jpeg"
  },
  {
    id: "lyanswer-l-rm",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "RM",
    image: "images/lyanswer-l-rm.jpeg"
  },
  {
    id: "lyanswer-l-jin",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "Jin",
    image: "images/lyanswer-l-jin.jpeg"
  },
  {
    id: "lyanswer-l-suga",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "Suga",
    image: "images/lyanswer-l-suga.jpeg"
  },
  {
    id: "lyanswer-l-jhope",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "J-Hope",
    image: "images/lyanswer-l-jhope.jpeg"
  },
  {
    id: "lyanswer-l-jimin",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "Jimin",
    image: "images/lyanswer-l-jimin.jpeg"
  },
  {
    id: "lyanswer-l-v",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "V",
    image: "images/lyanswer-l-v.jpeg"
  },
  {
    id: "lyanswer-l-jk",
    era: "Love Yourself: Answer",
    version: "Version L",
    member: "Jungkook",
    image: "images/lyanswer-l-jk.jpeg"
  },
  {
    id: "lyanswer-f-rm",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "RM",
    image: "images/lyanswer-f-rm.jpeg"
  },
  {
    id: "lyanswer-f-jin",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "Jin",
    image: "images/lyanswer-f-jin.jpeg"
  },
  {
    id: "lyanswer-f-suga",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "Suga",
    image: "images/lyanswer-f-suga.jpeg"
  },
  {
    id: "lyanswer-f-jhope",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "J-Hope",
    image: "images/lyanswer-f-jhope.jpeg"
  },
  {
    id: "lyanswer-f-jimin",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "Jimin",
    image: "images/lyanswer-f-jimin.jpeg"
  },
  {
    id: "lyanswer-f-v",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "V",
    image: "images/lyanswer-f-v.jpeg"
  },
  {
    id: "lyanswer-f-jk",
    era: "Love Yourself: Answer",
    version: "Version F",
    member: "Jungkook",
    image: "images/lyanswer-f-jk.jpeg"
  },
];


const NEWS_ITEMS = [
  {
    tag: "Featured",
    title: "BTS comeback watch",
    text: "Use this feature card for major BTS announcements, comeback updates, or group activity highlights.",
    link: "#"
  },
  {
    tag: "Music",
    title: "Solo and group release updates",
    text: "Use this for album releases, OSTs, collaborations, and streaming goals.",
    link: "#"
  },
  {
    tag: "Events",
    title: "Concerts and appearances",
    text: "Use this section for event highlights, livestreams, appearances, or festival news.",
    link: "#"
  },
  {
    tag: "Media",
    title: "Interviews and campaigns",
    text: "Track interviews, magazine shoots, brand collaborations, and public features.",
    link: "#"
  }
];

let state = {
  owned: {},
  wishlist: {},
  search: "",
  era: "All",
  version: "All",
  member: "All",
  status: "all",
  wishlistMode: false
};

let newsIndex = 0;

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    state = { ...state, ...JSON.parse(saved) };
  } catch (error) {
    console.error("Failed to load state:", error);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);

  const icon = document.getElementById("themeToggleIcon");
  const btn = document.getElementById("themeToggle");

  if (icon) {
    icon.src = theme === "dark"
      ? "images/lightstick_on.png"
      : "images/lightstick_off.png";

    icon.alt = theme === "dark"
      ? "Dark mode lightstick icon"
      : "Light mode lightstick icon";
  }

  if (btn) {
    btn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  setTheme(savedTheme);

  const btn = document.getElementById("themeToggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("dark") ? "light" : "dark";
      setTheme(next);
    });
  }
}

function isOwned(id) {
  return !!state.owned[id];
}

function isWishlisted(id) {
  return !!state.wishlist[id];
}

function toggleOwned(id) {
  if (isOwned(id)) {
    delete state.owned[id];
  } else {
    state.owned[id] = true;
    delete state.wishlist[id];
  }
  saveState();
  renderCurrentPage();
}

function toggleWishlist(id) {
  if (isWishlisted(id)) {
    delete state.wishlist[id];
  } else {
    state.wishlist[id] = true;
    delete state.owned[id];
  }
  saveState();
  renderCurrentPage();
}

function applyCardClick(id) {
  if (state.wishlistMode) {
    toggleWishlist(id);
  } else {
    toggleOwned(id);
  }
}

function getUniqueValues(key) {
  return ["All", ...new Set(CARDS.map(card => card[key]))];
}

function fillSelect(selectId, values, selectedValue) {
  const el = document.getElementById(selectId);
  if (!el) return;

  el.innerHTML = values
    .map(value => `<option value="${value}">${value}</option>`)
    .join("");
  el.value = selectedValue;
}

function renderCounts() {
  const ownedCount = Object.keys(state.owned).length;
  const wishlistCount = Object.keys(state.wishlist).length;
  const totalCount = CARDS.length;
  const missingCount = totalCount - ownedCount - wishlistCount;
  const completionPct = totalCount ? Math.round((ownedCount / totalCount) * 100) : 0;

  document.querySelectorAll("#ownedCount").forEach(el => el.textContent = ownedCount);
  document.querySelectorAll("#wishlistCount").forEach(el => el.textContent = wishlistCount);
  document.querySelectorAll("#totalCount").forEach(el => el.textContent = totalCount);
  document.querySelectorAll("#missingCount").forEach(el => el.textContent = missingCount);
  document.querySelectorAll("#completionPct").forEach(el => el.textContent = `${completionPct}%`);

  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  if (progressFill) progressFill.style.width = `${completionPct}%`;
  if (progressText) progressText.textContent = `${ownedCount} of ${totalCount} cards collected`;
}

function createCardHTML(card) {
  const owned = isOwned(card.id);
  const wishlisted = isWishlisted(card.id);

  const visual = card.image
    ? `<img src="${card.image}" alt="${card.member} ${card.era} ${card.version} photocard">`
    : `
      <div class="visual-fallback">
        <div>
          <span>${card.member.charAt(0)}</span>
          <p class="card-subtext">${card.member}</p>
        </div>
      </div>
    `;

  return `
    <article class="photocard">
      <div class="photocard-visual" onclick="applyCardClick('${card.id}')">
        ${visual}
        <div class="badge-wrap">
          ${owned ? `<span class="badge badge-owned">Owned</span>` : ""}
          ${wishlisted ? `<span class="badge badge-wishlist">Wishlist</span>` : ""}
        </div>
      </div>

      <div class="photocard-body">
        <h4 class="photocard-title">${card.member}</h4>
        <p class="photocard-meta">${card.era}${card.version ? `<br>${card.version}` : ""}</p>

        <div class="photocard-actions">
          <button class="mini-btn ${owned ? "active-owned" : ""}" onclick="toggleOwned('${card.id}')">
            ${owned ? "Owned ✓" : "Owned"}
          </button>
          <button class="mini-btn ${wishlisted ? "active-wishlist" : ""}" onclick="toggleWishlist('${card.id}')">
            ${wishlisted ? "Wishlisted ♥" : "Wishlist"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function sortCardsChronologically(cards) {
  return [...cards].sort((a, b) => {
    // 1. Sort by album (era)
    const eraA = ALBUM_ORDER.indexOf(a.era);
    const eraB = ALBUM_ORDER.indexOf(b.era);

    if (eraA !== eraB) return eraA - eraB;

    // 2. Sort by version (if exists)
    const versionA = a.version || "";
    const versionB = b.version || "";

    if (versionA !== versionB) {
      return versionA.localeCompare(versionB, undefined, { numeric: true });
    }

    // 3. Sort by member (custom order)
    const memberA = MEMBER_ORDER.indexOf(a.member);
    const memberB = MEMBER_ORDER.indexOf(b.member);

    return memberA - memberB;
  });
}

function filteredCards() {
  return CARDS.filter(card => {
    const searchMatch =
      !state.search ||
      `${card.era} ${card.version} ${card.member}`.toLowerCase().includes(state.search.toLowerCase());

    const eraMatch = state.era === "All" || card.era === state.era;
    const versionMatch = state.version === "All" || card.version === state.version;
    const memberMatch = state.member === "All" || card.member === state.member;

    let statusMatch = true;
    if (state.status === "owned") statusMatch = isOwned(card.id);
    if (state.status === "wishlist") statusMatch = isWishlisted(card.id);
    if (state.status === "missing") statusMatch = !isOwned(card.id) && !isWishlisted(card.id);

    return searchMatch && eraMatch && versionMatch && memberMatch && statusMatch;
  });
}

function renderHomePage() {
  const featuredEl = document.getElementById("featuredNewsCard");
  const gridEl = document.getElementById("newsGrid");
  if (!featuredEl || !gridEl) return;

  const featured = NEWS_ITEMS[newsIndex];
  const others = NEWS_ITEMS.filter((_, index) => index !== newsIndex);

  featuredEl.innerHTML = `
    <span class="tag">${featured.tag}</span>
    <h4>${featured.title}</h4>
    <p>${featured.text}</p>
    <a href="${featured.link}" class="news-link">Read more</a>
  `;

  gridEl.innerHTML = others.map(item => `
    <article class="news-card">
      <span class="tag">${item.tag}</span>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
      <a href="${item.link}" class="news-link">Open story</a>
    </article>
  `).join("");

  const prevBtn = document.getElementById("prevNewsBtn");
  const nextBtn = document.getElementById("nextNewsBtn");

  if (prevBtn) {
    prevBtn.onclick = () => {
      newsIndex = (newsIndex - 1 + NEWS_ITEMS.length) % NEWS_ITEMS.length;
      renderHomePage();
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      newsIndex = (newsIndex + 1) % NEWS_ITEMS.length;
      renderHomePage();
    };
  }
}

function getVersionsForEra(selectedEra) {
  if (selectedEra === "All") return ["All"];

  const versions = CARDS
    .filter(card => card.era === selectedEra && card.version)
    .map(card => card.version);

  return ["All", ...new Set(versions)];
}

function setupCollectionFilters() {
  fillSelect("eraFilter", getUniqueValues("era"), state.era);
  fillSelect("versionFilter", getVersionsForEra(state.era), state.version);
  fillSelect("memberFilter", MEMBERS, state.member);

  const searchInput = document.getElementById("searchInput");
  const eraFilter = document.getElementById("eraFilter");
  const versionFilter = document.getElementById("versionFilter");
  const memberFilter = document.getElementById("memberFilter");
  const statusFilter = document.getElementById("statusFilter");
  const toggleWishlistModeBtn = document.getElementById("toggleWishlistModeBtn");

  if (searchInput) {
    searchInput.value = state.search;
    searchInput.oninput = (e) => {
      state.search = e.target.value;
      saveState();
      renderCurrentPage();
    };
  }

  if (eraFilter) {
    eraFilter.onchange = (e) => {
      state.era = e.target.value;
      state.version = "All";
      saveState();
      renderCurrentPage();
    };
  }

  if (versionFilter) {
    versionFilter.onchange = (e) => {
      state.version = e.target.value;
      versionFilter.disabled = state.era === "All";
      saveState();
      renderCurrentPage();
    };
  }

  if (memberFilter) {
    memberFilter.onchange = (e) => {
      state.member = e.target.value;
      saveState();
      renderCurrentPage();
    };
  }

  if (statusFilter) {
    statusFilter.value = state.status;
    statusFilter.onchange = (e) => {
      state.status = e.target.value;
      saveState();
      renderCurrentPage();
    };
  }

  if (toggleWishlistModeBtn) {
    toggleWishlistModeBtn.textContent = `Wishlist Mode: ${state.wishlistMode ? "On" : "Off"}`;
    toggleWishlistModeBtn.onclick = () => {
      state.wishlistMode = !state.wishlistMode;
      saveState();
      renderCurrentPage();
    };
  }
}

function renderCollectionPage() {
  setupCollectionFilters();

  const grid = document.getElementById("collectionGrid");
  if (!grid) return;

  const cards = sortCardsChronologically(filteredCards());

  grid.innerHTML = cards.length
    ? cards.map(createCardHTML).join("")
    : `
      <div class="empty-state">
        <h3>No cards found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    `;

  setupImportExport();
}

function renderWishlistPage() {
  const grid = document.getElementById("wishlistGrid");
  if (!grid) return;

  const cards = sortCardsChronologically(
    CARDS.filter(card => isWishlisted(card.id))
  );

  grid.innerHTML = cards.length
    ? cards.map(createCardHTML).join("")
    : `
      <div class="empty-state">
        <h3>Your wishlist is empty</h3>
        <p>Add cards from the collection page.</p>
      </div>
    `;
}

function renderStatsPage() {
  const memberStatsGrid = document.getElementById("memberStatsGrid");
  if (!memberStatsGrid) return;

  const membersOnly = MEMBERS.filter(member => member !== "All");

  memberStatsGrid.innerHTML = membersOnly.map(member => {
    const memberCards = CARDS.filter(card => card.member === member);
    const owned = memberCards.filter(card => isOwned(card.id)).length;
    const total = memberCards.length;
    const pct = total ? Math.round((owned / total) * 100) : 0;

    return `
      <div class="member-stat">
        <h4>${member}</h4>
        <p class="card-subtext">${owned}/${total} collected</p>
        <p class="card-subtext">${pct}% complete</p>
      </div>
    `;
  }).join("");
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    state
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bts-hub-backup.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData(file) {
  const reader = new FileReader();

  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (!parsed.state) throw new Error("Invalid file");

      state = { ...state, ...parsed.state };
      saveState();
      renderCurrentPage();
      alert("Import successful.");
    } catch (error) {
      alert("Could not import this file.");
      console.error(error);
    }
  };

  reader.readAsText(file);
}

function clearAllData() {
  const ok = confirm("Clear all owned and wishlist data?");
  if (!ok) return;

  state.owned = {};
  state.wishlist = {};
  saveState();
  renderCurrentPage();
}

function setupImportExport() {
  const exportBtn = document.getElementById("exportBtn");
  const importBtn = document.getElementById("importBtn");
  const importFile = document.getElementById("importFile");
  const clearBtn = document.getElementById("clearBtn");

  if (exportBtn) exportBtn.onclick = exportData;
  if (importBtn) importBtn.onclick = () => importFile.click();
  if (importFile) {
    importFile.onchange = (e) => {
      const file = e.target.files[0];
      if (file) importData(file);
      e.target.value = "";
    };
  }
  if (clearBtn) clearBtn.onclick = clearAllData;
}

function renderCurrentPage() {
  renderCounts();

  const page = document.body.dataset.page;

  if (page === "home") renderHomePage();
  if (page === "collection") renderCollectionPage();
  if (page === "wishlist") renderWishlistPage();
  if (page === "stats") renderStatsPage();
}

loadState();
initTheme();
renderCurrentPage();