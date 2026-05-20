// Good People & Story — seed content. Real human-sounding stories,
// organized by life topic. Timestamps are unix seconds.
const NOW = Math.floor(Date.now() / 1000)
const H = 3600
const D = 86400

export const communities = [
  {
    name: 'love',
    title: 'Love & Relationships',
    description:
      'First kisses, second chances, long marriages, hard goodbyes. The story of how someone made room for someone else.',
    members: 184_204,
    online: 2_104,
    color: 'linear-gradient(135deg, #ef4444, #ec4899)',
    icon: '❤️',
    rules: [
      'Real stories only — no fiction.',
      'No identifying info about other people without consent.',
      'Be kind in the comments. People are sharing real life.',
      'Anonymous posting is allowed and encouraged.',
    ],
  },
  {
    name: 'loss',
    title: 'Grief & Loss',
    description:
      'A space for the people we’ve lost, the things we’ve had to let go of, and the slow work of carrying it.',
    members: 92_412,
    online: 821,
    color: 'linear-gradient(135deg, #475569, #94a3b8)',
    icon: '🕊️',
    rules: [
      'Hold this space gently — for yourself and others.',
      'No platitudes. Sit with people in what they’re feeling.',
      'Crisis resources pinned in sidebar.',
    ],
  },
  {
    name: 'career',
    title: 'Work & Career',
    description:
      'The quit-your-job stories, the unexpected promotions, the bad bosses, the moment you finally felt like you belonged.',
    members: 241_330,
    online: 3_812,
    color: 'linear-gradient(135deg, #2563eb, #06b6d4)',
    icon: '💼',
    rules: ['Personal stories, not career advice.', 'No company-bashing with identifying details.'],
  },
  {
    name: 'faith',
    title: 'Faith & Meaning',
    description:
      'Stories of belief, doubt, prayer, leaving and returning. Whatever shape your spiritual life takes.',
    members: 68_290,
    online: 412,
    color: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    icon: '✨',
    rules: ['Respect traditions different from your own.', 'No proselytizing.'],
  },
  {
    name: 'funny',
    title: 'Funny Moments',
    description:
      'The stories you tell at every dinner party. Small humiliations, perfect timing, the things you can’t believe actually happened.',
    members: 312_104,
    online: 5_402,
    color: 'linear-gradient(135deg, #facc15, #f97316)',
    icon: '😂',
    rules: ['Keep it real — not punched up to oblivion.', 'No mean-spirited stories about strangers.'],
  },
  {
    name: 'hardship',
    title: 'Hardship & Resilience',
    description:
      'The years that broke you and the small things that kept you going. For people who’ve been through it.',
    members: 127_820,
    online: 1_902,
    color: 'linear-gradient(135deg, #b45309, #f97316)',
    icon: '⛰️',
    rules: ['You don’t owe anyone a happy ending.', 'Trigger warnings when appropriate.'],
  },
  {
    name: 'growth',
    title: 'Growth & Change',
    description:
      'The moment something clicked. The habit that finally stuck. The version of you a year ago wouldn’t recognize.',
    members: 198_402,
    online: 2_804,
    color: 'linear-gradient(135deg, #16a34a, #84cc16)',
    icon: '🌱',
    rules: ['Specifics over generalities — what actually changed?', 'No self-promotion.'],
  },
  {
    name: 'family',
    title: 'Family Stories',
    description:
      'Parents, siblings, kids, the family you were born into and the one you chose. The complicated love that shaped you.',
    members: 156_801,
    online: 2_104,
    color: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    icon: '👨‍👩‍👧',
    rules: ['Protect the privacy of people who didn’t consent to being on the internet.'],
  },
]

export const users = {
  current: {
    username: 'maya_w',
    displayName: 'Maya W.',
    avatar: null,
    karma: 4_812,
    bio: 'Telling small stories. Mostly listening.',
    joined: NOW - 320 * D,
  },
  pool: [
    { username: 'anonymous', karma: 0 },
    { username: 'jonah_r', karma: 21044 },
    { username: 'lin_h', karma: 8841 },
    { username: 'desmond_t', karma: 14200 },
    { username: 'priya_n', karma: 36210 },
    { username: 'a_friend', karma: 410 },
    { username: 'sam_o', karma: 6802 },
    { username: 'kate_b', karma: 11290 },
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
    title: 'My dad called me by my mom’s name last Sunday and I haven’t been able to stop thinking about it.',
    author: 'anonymous',
    subreddit: 'family',
    body:
      "He turned 81 in March. Mom passed nine years ago. He looked right at me at the dinner table and said, 'Ellen, the green beans are wonderful.' I didn't correct him. I just said thank you and ate my food and watched him eat his. I think part of me wanted to be her for a minute, just so he could have her back. Then I went home and cried in my car for an hour.\n\nI don't know if I'm scared because he's forgetting, or scared because for a second I let him.",
    score: 8_412,
    createdAt: NOW - 4 * H,
    commentCount: 412,
    type: 'text',
    image: null,
    userVote: 0,
    anonymous: true,
    comments: [
      c('p1-c1', 'lin_h', "Don't be too hard on yourself for not correcting him. You gave him a small moment of peace. That's a kindness.", 1240, 3, [
        c('p1-c1-1', 'anonymous', "I needed to hear this. Thank you.", 412, 2),
      ]),
      c('p1-c2', 'desmond_t', "My grandma did this with my mom for the last two years of her life. Mom said she stopped fighting it because it made grandma calmer. You're a good kid.", 940, 3, []),
      c('p1-c3', 'priya_n', 'There’s something beautiful and unbearable about being mistaken for someone your parent loved. Sending you peace.', 522, 2, []),
    ],
  },
  {
    id: '2',
    title: 'I quit my six-figure job last Friday to go work at the library. Best decision of my life.',
    author: 'jonah_r',
    subreddit: 'career',
    body:
      "Spent eight years in fintech making more money than I knew what to do with. Was so anxious I couldn't sleep without melatonin. On Sunday nights I'd get this knot in my chest at exactly 7pm. Like clockwork.\n\nI took a part-time job at the public library that pays $19/hr. My new boss is a 64-year-old woman named Patty who wears cardigans and gives book recommendations to teenagers. On my first day she told me, 'We're not solving anything here. We just give people quiet places and good books.'\n\nI cried in the break room. I haven't taken melatonin in two weeks.",
    score: 24_982,
    createdAt: NOW - 8 * H,
    commentCount: 1_412,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p2-c1', 'kate_b', "Patty sounds like she should run the world.", 8210, 7, [
        c('p2-c1-1', 'jonah_r', "She made me a thermos of tea on day three. I almost wept.", 3104, 6),
      ]),
      c('p2-c2', 'sam_o', "How are you doing on the money side? Asking because I'm trying to do the same thing and I'm scared.", 410, 5, [
        c('p2-c2-1', 'jonah_r', "Cut my expenses in half. Sold the second car. I live like a college student again and somehow feel rich.", 312, 4),
      ]),
    ],
  },
  {
    id: '3',
    title: 'A stranger paid for my groceries today and I don’t know what to do with it.',
    author: 'maya_w',
    subreddit: 'love',
    body:
      "I'm a single mom. Two kids, 4 and 7. I'd had a brutal day — kid threw up at school, car wouldn't start, you know the type. I got to the checkout at Kroger and my card declined. I knew it would. I started taking things out, embarrassed, sweating, my four-year-old asking why we couldn't buy the bread.\n\nA woman behind me — older, maybe sixty — quietly handed her card to the cashier and said 'put it all on mine.' I tried to refuse. She just said, 'Someone did this for me when my kids were small. Pay it forward when you can.'\n\nI sat in my car for a long time before I drove home. I don't even know her name.",
    score: 31_204,
    createdAt: NOW - 14 * H,
    commentCount: 2_402,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p3-c1', 'a_friend', 'This is the kind of thing that makes me believe in people again.', 4012, 13, []),
      c('p3-c2', 'priya_n', "You don't owe her her name — you owe the next person in line.", 8120, 12, [
        c('p3-c2-1', 'maya_w', "Already starting a little envelope in my purse. Even if it's $10.", 2010, 11),
      ]),
    ],
  },
  {
    id: '4',
    title: 'I taught my grandfather to text six months before he died. He used to send me one heart every morning.',
    author: 'lin_h',
    subreddit: 'loss',
    body:
      "He was 88. He didn't trust phones his whole life. But after my grandma passed I sat with him one Sunday for three hours teaching him how to send emojis.\n\nFor six months, every single morning at 7am, my phone would buzz: ❤️. Just one. He never sent anything else. He didn't know how, or maybe he didn't need to.\n\nHe passed in October. I still check my phone at 7am.",
    score: 18_002,
    createdAt: NOW - 1 * D - 2 * H,
    commentCount: 902,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p4-c1', 'desmond_t', "I'm sitting at my desk crying. Thank you for sharing him with us. ❤️", 3120, 28, []),
    ],
  },
  {
    id: '5',
    title: 'My mother and I had not spoken for eleven years. Yesterday she called to tell me she was proud of me.',
    author: 'anonymous',
    subreddit: 'family',
    body:
      "I won't get into why we stopped talking. It was bad. It was both our faults and mostly hers. I built a whole life without her — my husband never met her, my daughter has never met her grandmother.\n\nYesterday she called. I almost didn't pick up. She didn't apologize. She didn't ask to meet. She just said, 'I saw the article about your work. I'm proud of you. That's all I wanted to say.' And she hung up.\n\nI sat in my kitchen for an hour. My daughter came down and asked why I was smiling and crying at the same time. I didn't know how to explain that sometimes the door doesn't open all the way — it just opens a little. And a little is more than nothing.",
    score: 22_180,
    createdAt: NOW - 1 * D - 6 * H,
    commentCount: 1_812,
    type: 'text',
    image: null,
    userVote: 0,
    anonymous: true,
    comments: [
      c('p5-c1', 'kate_b', "A little is more than nothing. I'm going to be thinking about this line for a long time.", 5840, 30, []),
    ],
  },
  {
    id: '6',
    title: 'I told the woman at the DMV she had nice handwriting and she started crying',
    author: 'sam_o',
    subreddit: 'funny',
    body:
      "I went to renew my license expecting it to be miserable. Lady behind the counter, name tag said Brenda, was filling out my form. She had this beautiful loopy cursive that you just don't see anymore. I said, completely casually, 'Wow, your handwriting is really nice.'\n\nShe looked up at me and her eyes filled up. She said, 'In thirty-one years working here, nobody has ever told me that.' Then she stamped my form like nothing happened.\n\nI think about Brenda probably once a week. We have no idea what people are carrying around.",
    score: 41_204,
    createdAt: NOW - 2 * D,
    commentCount: 3_204,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p6-c1', 'priya_n', "This is going to make me compliment everyone I see today.", 8210, 47, [
        c('p6-c1-1', 'sam_o', "Brenda would be so happy.", 2104, 46),
      ]),
    ],
  },
  {
    id: '7',
    title: 'I stopped drinking on June 4th, 2023. Today I picked my daughter up from school sober for the first time.',
    author: 'desmond_t',
    subreddit: 'growth',
    body:
      "She's nine. She doesn't know I used to drink before pickup. She doesn't know about the mints in the car. She doesn't know any of it, and I'm spending the rest of my life making sure she never has to.\n\nIt's been 350 days. Today she got in the car, told me about her science project on volcanoes, and asked if we could get ice cream. We got ice cream. I cried in the freezer aisle while she picked between rocky road and mint chip.\n\nIf you're trying to stop — keep going. The boring days are the ones worth living.",
    score: 38_420,
    createdAt: NOW - 2 * D - 4 * H,
    commentCount: 2_104,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p7-c1', 'jonah_r', "350 days. You're doing it. Hug your daughter for the rest of us.", 9402, 50, []),
    ],
  },
  {
    id: '8',
    title: 'A photo from the morning I left him.',
    author: 'anonymous',
    subreddit: 'hardship',
    body:
      "Six years ago. I took this photo before I drove away with everything I could fit in my car. The sun was just coming up. I remember being scared he'd wake up. I remember thinking, if I can just make it to the highway, I can make it anywhere.\n\nI made it.",
    score: 14_820,
    createdAt: NOW - 3 * D,
    commentCount: 822,
    type: 'image',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
    userVote: 0,
    anonymous: true,
    comments: [
      c('p8-c1', 'maya_w', "Made it. Past tense. Powerful word in this story.", 4120, 70, []),
    ],
  },
  {
    id: '9',
    title: 'I started praying again last month. I don’t know what to call what I believe in. I just know I needed to talk to someone.',
    author: 'kate_b',
    subreddit: 'faith',
    body:
      "I left the church I grew up in at twenty-two. I'm thirty-eight now. I haven't said grace, recited a creed, or thought about any of it in almost two decades.\n\nThis spring I got a hard diagnosis. Not the worst, but bad enough. And one night, sitting in my kitchen at 2am, I caught myself whispering. Not to God exactly. Not to anyone with a name. Just into the room. Asking for help.\n\nI've done it every night since. I don't know what I'm doing. I just know I'm not alone in the kitchen anymore.",
    score: 11_204,
    createdAt: NOW - 4 * D,
    commentCount: 612,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p9-c1', 'a_friend', 'Whatever it is, I’m glad it’s there for you. Sending strength.', 2102, 90, []),
    ],
  },
  {
    id: '10',
    title: 'I’m 73 years old and I just learned to ride a bike.',
    author: 'priya_n',
    subreddit: 'growth',
    body:
      "I never learned as a kid. We were too poor for bikes, and then I was too embarrassed as a teenager, and then I just told myself it was too late.\n\nMy granddaughter — she's 7 — taught me. She held the back of the seat, ran behind me down her cul-de-sac, and yelled 'I let go ten seconds ago, Nani!' I didn't even know.\n\nI did three loops before I had to sit down. I don't know why I waited so long. Tell the people in your life: it's not too late for the thing.",
    score: 52_104,
    createdAt: NOW - 5 * D,
    commentCount: 1_842,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [
      c('p10-c1', 'jonah_r', 'NANI ON A BIKE. This is the best thing I will read all year.', 8120, 110, []),
    ],
  },
  {
    id: '11',
    title: 'My eighth-grade English teacher mailed me a postcard last week. Twenty-three years after his class.',
    author: 'lin_h',
    subreddit: 'love',
    body:
      "I'd written about him in a piece I published. Just one line — 'Mr. Patterson told me my writing mattered when nothing else did.' Somehow he saw it.\n\nThe postcard says, in handwriting I haven't seen in twenty-three years: 'I always knew. — JP.' That's it.\n\nI'm 36 and I felt like I was twelve again, sitting in his classroom, hearing him tell me my story was worth telling.",
    score: 28_410,
    createdAt: NOW - 6 * D,
    commentCount: 1_402,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [],
  },
  {
    id: '12',
    title: 'My toddler asked the cashier if she was okay because she looked sad. She was.',
    author: 'maya_w',
    subreddit: 'funny',
    body:
      "He's three. He has no filter. We were checking out at Target and he looked up at the cashier and said, very seriously, 'Are you okay? You look sad.' I started apologizing and she just stopped, looked down at him, and said, 'I am sad, buddy. Thank you for asking.'\n\nThey had a whole conversation while I bagged groceries. She told him her cat was sick. He told her his stuffed dinosaur could come visit it. I haven't stopped thinking about it.\n\nThree-year-olds are the only honest people left.",
    score: 19_204,
    createdAt: NOW - 7 * D,
    commentCount: 882,
    type: 'text',
    image: null,
    userVote: 0,
    comments: [],
  },
]
