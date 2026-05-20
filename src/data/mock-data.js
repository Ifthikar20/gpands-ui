// Static seed data for the UI clone. All timestamps are unix seconds.
const NOW = Math.floor(Date.now() / 1000)
const H = 3600
const D = 86400

export const communities = [
  {
    name: 'programming',
    title: 'Computer Programming',
    description:
      'Computer Programming — discussion, code, and the craft. From beginners to compiler hackers.',
    members: 5_842_120,
    online: 14_203,
    color: 'linear-gradient(135deg, #1f6feb, #8957e5)',
    icon: '💻',
    rules: ['Be civil', 'Stay on topic', 'No spam or self-promo', 'Use code blocks for code'],
  },
  {
    name: 'gaming',
    title: 'The #1 Gaming Community',
    description: 'A subreddit for (almost) anything related to games – video games, board games, etc.',
    members: 38_412_004,
    online: 91_842,
    color: 'linear-gradient(135deg, #ff4500, #ff7847)',
    icon: '🎮',
    rules: ['No piracy', 'No memes (try r/gamingcirclejerk)', 'No politics', 'Source your content'],
  },
  {
    name: 'todayilearned',
    title: 'Today I Learned (TIL)',
    description: 'You learn something new every day; what did you learn today?',
    members: 32_104_550,
    online: 22_410,
    color: 'linear-gradient(135deg, #16a34a, #65d465)',
    icon: '🧠',
    rules: ['No recent sources (<2 months)', 'Cite a reputable source', 'No opinions / loaded titles'],
  },
  {
    name: 'askreddit',
    title: 'Ask Reddit...',
    description: 'r/AskReddit is the place to ask and answer thought-provoking questions.',
    members: 45_980_120,
    online: 124_005,
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    icon: '💬',
    rules: ['Open-ended questions only', 'No personal advice', 'No DAE / Loaded questions'],
  },
  {
    name: 'pics',
    title: 'Reddit Pics',
    description: 'A place for photographs, pictures, and other images.',
    members: 30_412_900,
    online: 19_521,
    color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    icon: '📷',
    rules: ['No screenshots', 'No politics', 'Mark NSFW content', 'No personal info'],
  },
]

export const users = {
  current: {
    username: 'curious_dev',
    avatar: null,
    karma: 12_482,
  },
  pool: [
    { username: 'ada_lovelace', karma: 98321 },
    { username: 'pixel_pusher', karma: 12944 },
    { username: 'midnight_coder', karma: 22001 },
    { username: 'salty_dev', karma: 4023 },
    { username: 'astro_naut', karma: 88210 },
    { username: 'lurker_42', karma: 102 },
    { username: 'queen_of_bugs', karma: 31290 },
    { username: 'just_some_guy', karma: 4521 },
  ],
}

const c = (id, author, body, score, ageH, children = []) => ({
  id,
  author,
  body,
  score,
  createdAt: NOW - ageH * H,
  children,
  userVote: 0,
})

export const posts = [
  {
    id: '1',
    title: 'TIL the original prototype for the modern QWERTY keyboard was designed to slow typists down to prevent jams.',
    author: 'midnight_coder',
    subreddit: 'todayilearned',
    body:
      "Christopher Latham Sholes, who patented the first practical typewriter in 1868, deliberately arranged commonly paired letters apart from one another. The design stuck even when mechanical jamming ceased to be an issue, and we've all been typing slower than necessary ever since.",
    score: 12_482,
    createdAt: NOW - 5 * H,
    commentCount: 1240,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('c1', 'ada_lovelace', 'Always wondered why E was so far from the home row. Mystery solved.', 482, 4, [
        c('c1-1', 'salty_dev', 'Dvorak users entering the chat in 3...2...1', 211, 3, [
          c('c1-1-1', 'midnight_coder', 'I tried Dvorak for a year. Came back. The muscle memory tax is real.', 88, 2),
        ]),
      ]),
      c('c2', 'lurker_42', 'And yet we never switched. Path dependence is fascinating.', 320, 3, []),
      c('c3', 'queen_of_bugs', 'Source? I’ve heard this debated.', 64, 2, []),
    ],
  },
  {
    id: '2',
    title: 'After 6 months, I finally shipped my side project. AMA about burnout, scope creep, and the joy of `git push --tags`.',
    author: 'pixel_pusher',
    subreddit: 'programming',
    body:
      "Hey r/programming — I'm a solo dev who just shipped v1.0 of a tiny CLI tool. It's nothing groundbreaking but the journey nearly broke me. Happy to share what I learned about prioritization, when to cut features, and how I kept motivation up through the boring middle months.",
    score: 8_204,
    createdAt: NOW - 9 * H,
    commentCount: 412,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p2-c1', 'just_some_guy', "Congrats on shipping. What's the one feature you're glad you cut?", 102, 8, [
        c('p2-c1-1', 'pixel_pusher', 'Plugin system. Would have doubled the surface area for 2% of users.', 84, 7),
      ]),
      c('p2-c2', 'astro_naut', 'How did you handle motivation in month 4?', 56, 6, []),
    ],
  },
  {
    id: '3',
    title: "What's a small, oddly specific thing that instantly makes you trust someone?",
    author: 'salty_dev',
    subreddit: 'askreddit',
    body: '',
    score: 24_910,
    createdAt: NOW - 12 * H,
    commentCount: 8_412,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p3-c1', 'queen_of_bugs', 'They remember small things you mentioned in passing.', 4012, 11, []),
      c('p3-c2', 'ada_lovelace', "How they treat people who can't do anything for them.", 8210, 10, [
        c('p3-c2-1', 'astro_naut', 'This. Watch how they talk to waiters.', 2104, 9),
      ]),
    ],
  },
  {
    id: '4',
    title: 'Spent the weekend rebuilding my desk setup — first time I actually like working from home',
    author: 'pixel_pusher',
    subreddit: 'pics',
    body: '',
    score: 6_120,
    createdAt: NOW - 1 * D,
    commentCount: 184,
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80&auto=format&fit=crop',
    userVote: 0,
    comments: [
      c('p4-c1', 'lurker_42', "What monitor arm is that?", 24, 22, []),
    ],
  },
  {
    id: '5',
    title: 'Elden Ring Nightreign first impressions thread — three days in, what is everyone running?',
    author: 'astro_naut',
    subreddit: 'gaming',
    body:
      "I've been running mostly the Wylder solo and the bow build is wildly fun. Bosses scale in interesting ways — anyone found a co-op rhythm that just clicks?",
    score: 4_201,
    createdAt: NOW - 2 * D,
    commentCount: 612,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p5-c1', 'just_some_guy', 'Duo with a friend running Recluse is busted in a good way.', 124, 38, []),
    ],
  },
  {
    id: '6',
    title: 'TIL octopuses can taste with their suckers and each arm has a kind of independent mini-brain.',
    author: 'queen_of_bugs',
    subreddit: 'todayilearned',
    body:
      "Each of an octopus's arms contains a cluster of neurons that can act semi-independently, and the suckers contain chemoreceptors letting them literally taste what they touch. They're closer to alien than most things on Earth.",
    score: 18_330,
    createdAt: NOW - 2 * D,
    commentCount: 522,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p6-c1', 'ada_lovelace', 'Octopuses are the closest thing to aliens we have. I love them.', 894, 44, []),
    ],
  },
  {
    id: '7',
    title: 'Why does every JS framework eventually reinvent the same lifecycle hooks?',
    author: 'just_some_guy',
    subreddit: 'programming',
    body:
      "componentDidMount, useEffect, onMounted, onBeforeUnmount... at this point we're just shuffling deck chairs. Curious if anyone has a take on whether there's a fundamentally better abstraction we keep missing.",
    score: 2_104,
    createdAt: NOW - 3 * D,
    commentCount: 290,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p7-c1', 'midnight_coder', 'Effects are leaky abstractions over reactive graphs. Solid and Svelte get closer.', 412, 60, []),
    ],
  },
  {
    id: '8',
    title: 'Caught this view on a morning hike — no filter',
    author: 'astro_naut',
    subreddit: 'pics',
    body: '',
    score: 9_420,
    createdAt: NOW - 4 * D,
    commentCount: 244,
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
    userVote: 0,
    comments: [],
  },
  {
    id: '9',
    title: "What's a hill you'll die on regarding video games that you can't justify with logic?",
    author: 'lurker_42',
    subreddit: 'askreddit',
    body: '',
    score: 14_201,
    createdAt: NOW - 5 * D,
    commentCount: 3_412,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p9-c1', 'pixel_pusher', "Older Pokemon games > newer ones. I won't elaborate.", 2410, 100, []),
    ],
  },
  {
    id: '10',
    title: 'Built a tiny static-site generator in 80 lines of Vue — feedback welcome',
    author: 'ada_lovelace',
    subreddit: 'programming',
    body:
      "It's barely more than a toy but it scratches an itch — markdown in, static HTML out, with Vue SFC-style templates. Roast my code.",
    score: 3_180,
    createdAt: NOW - 6 * D,
    commentCount: 142,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [],
  },
]
