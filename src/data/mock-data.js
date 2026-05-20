// Good People & Story — seed content.
// Twenty life topics, ~45 first-person stories, threaded comments.
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
    icon: 'heart',
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
    icon: 'candle',
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
    icon: 'briefcase',
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
    icon: 'star',
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
    icon: 'smile',
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
    icon: 'mountain',
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
    icon: 'sprout',
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
    icon: 'people',
    rules: ['Protect the privacy of people who didn’t consent to being on the internet.'],
  },
  {
    name: 'parenthood',
    title: 'Parenthood',
    description:
      'The exhaustion, the wonder, the things your kid said in the back seat. From new parents to empty nesters.',
    members: 142_512,
    online: 3_122,
    color: 'linear-gradient(135deg, #f472b6, #fb923c)',
    icon: 'baby',
    rules: ['No parenting advice unless asked.', 'Be kind — no one is doing this perfectly.'],
  },
  {
    name: 'friendship',
    title: 'Friendship',
    description:
      'The people who showed up. The friendships that ended. The text thread that has been running since 2009.',
    members: 109_882,
    online: 1_414,
    color: 'linear-gradient(135deg, #06b6d4, #14b8a6)',
    icon: 'handshake',
    rules: ['Don’t out friends who didn’t sign up to be in your post.'],
  },
  {
    name: 'travel',
    title: 'Travel & Adventure',
    description:
      'The wrong train, the right hostel, the moment you realized you were very far from home — in the best or worst way.',
    members: 218_044,
    online: 2_220,
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    icon: 'map',
    rules: ['Stories, not itineraries.', 'No travel gear ads.'],
  },
  {
    name: 'strangers',
    title: 'Kindness of Strangers',
    description:
      'The person who held the door. The cashier who paid for your groceries. The bus driver who waited.',
    members: 87_104,
    online: 904,
    color: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    icon: 'hand',
    rules: ['Pay it forward in the comments if you can.'],
  },
  {
    name: 'comingofage',
    title: 'Coming of Age',
    description:
      'The summer that changed you. First job, first heartbreak, first time you saw your parents as people.',
    members: 64_900,
    online: 612,
    color: 'linear-gradient(135deg, #a78bfa, #f472b6)',
    icon: 'cap',
    rules: ['Be gentle with your younger self.'],
  },
  {
    name: 'money',
    title: 'Money Stories',
    description:
      'Broke months, first paychecks, generational wealth, the receipts you can’t throw away. The emotional side of money.',
    members: 78_420,
    online: 1_104,
    color: 'linear-gradient(135deg, #10b981, #84cc16)',
    icon: 'coin',
    rules: ['No financial advice.', 'No flexing.'],
  },
  {
    name: 'health',
    title: 'Health & Healing',
    description:
      'Diagnoses, recoveries, the body that surprised you. Stories from inside the waiting room.',
    members: 51_204,
    online: 622,
    color: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
    icon: 'cross',
    rules: ['Not medical advice.', 'Respect privacy of caregivers and providers.'],
  },
  {
    name: 'mentalhealth',
    title: 'Mental Health',
    description:
      'The fog years and the brighter days. Therapy moments, medication journeys, the small wins that don’t look like wins from the outside.',
    members: 132_840,
    online: 1_802,
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    icon: 'brain',
    rules: ['Crisis resources pinned in sidebar.', 'No diagnosing strangers.'],
  },
  {
    name: 'animals',
    title: 'Animals & Pets',
    description:
      'The dog who saved you a little. The barn cat who chose you. The squirrel that lived on your balcony for a summer.',
    members: 204_812,
    online: 3_212,
    color: 'linear-gradient(135deg, #fb7185, #fbbf24)',
    icon: 'paw',
    rules: ['Photos welcome. Names encouraged.'],
  },
  {
    name: 'food',
    title: 'Food & Memory',
    description:
      'Your grandmother’s kitchen. The diner that closed. The first thing you cooked alone. Food as a map of who you’ve been.',
    members: 96_412,
    online: 1_140,
    color: 'linear-gradient(135deg, #f97316, #ef4444)',
    icon: 'bowl',
    rules: ['Recipes welcome but the story is the point.'],
  },
  {
    name: 'home',
    title: 'Home & Belonging',
    description:
      'The apartment with the squeaky floor. The town you couldn’t wait to leave. The kitchen you finally feel safe in.',
    members: 58_022,
    online: 612,
    color: 'linear-gradient(135deg, #84cc16, #facc15)',
    icon: 'house',
    rules: ['Be kind about the places people came from.'],
  },
  {
    name: 'secondchances',
    title: 'Second Chances',
    description:
      'Reconciliations, do-overs, late-in-life pivots. The chapter you didn’t expect to get to write.',
    members: 43_820,
    online: 412,
    color: 'linear-gradient(135deg, #f43f5e, #f97316)',
    icon: 'refresh',
    rules: ['Honesty over neatness — second chances aren’t always tidy.'],
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
    { username: 'jonah_r', karma: 21_044 },
    { username: 'lin_h', karma: 8_841 },
    { username: 'desmond_t', karma: 14_200 },
    { username: 'priya_n', karma: 36_210 },
    { username: 'a_friend', karma: 410 },
    { username: 'sam_o', karma: 6_802 },
    { username: 'kate_b', karma: 11_290 },
    { username: 'rosa_v', karma: 18_410 },
    { username: 'theo_a', karma: 4_120 },
    { username: 'nadia_k', karma: 22_804 },
    { username: 'henry_f', karma: 9_410 },
    { username: 'amelia_g', karma: 33_810 },
    { username: 'micah_p', karma: 7_842 },
    { username: 'isla_d', karma: 12_044 },
    { username: 'omar_s', karma: 15_822 },
    { username: 'tess_y', karma: 6_140 },
    { username: 'quinn_b', karma: 28_402 },
    { username: 'rashid_m', karma: 4_802 },
    { username: 'eliza_w', karma: 19_210 },
    { username: 'beck_t', karma: 3_204 },
    { username: 'noor_a', karma: 41_002 },
    { username: 'paulo_r', karma: 7_104 },
    { username: 'simone_l', karma: 16_910 },
  ],
}

// Compact comment constructor: c(id, author, body, score, ageH, children?)
const c = (id, author, body, score, ageH, children = []) => ({
  id, author, body, score,
  createdAt: NOW - ageH * H,
  children, userVote: 0,
})

// Compact post constructor.
const p = (cfg) => ({
  id: cfg.id,
  title: cfg.title,
  author: cfg.author,
  subreddit: cfg.sub,
  body: cfg.body || '',
  score: cfg.score,
  createdAt: NOW - cfg.age,
  commentCount: cfg.commentCount,
  type: cfg.image ? 'image' : 'text',
  image: cfg.image || null,
  userVote: 0,
  anonymous: cfg.author === 'anonymous',
  comments: cfg.comments || [],
})

export const posts = [
  p({
    id: '1',
    sub: 'family',
    author: 'anonymous',
    title: 'My dad called me by my mom’s name last Sunday and I haven’t been able to stop thinking about it.',
    body:
      "He turned 81 in March. Mom passed nine years ago. He looked right at me at the dinner table and said, 'Ellen, the green beans are wonderful.' I didn't correct him. I just said thank you and ate my food and watched him eat his. I think part of me wanted to be her for a minute, just so he could have her back. Then I went home and cried in my car for an hour.\n\nI don't know if I'm scared because he's forgetting, or scared because for a second I let him.",
    score: 18_412, age: 4 * H, commentCount: 412,
    comments: [
      c('p1-c1', 'lin_h', "Don't be too hard on yourself for not correcting him. You gave him a small moment of peace. That's a kindness.", 1240, 3, [
        c('p1-c1-1', 'anonymous', 'I needed to hear this. Thank you.', 412, 2),
      ]),
      c('p1-c2', 'desmond_t', "My grandma did this with my mom for the last two years of her life. Mom said she stopped fighting it because it made grandma calmer. You're a good kid.", 940, 3),
      c('p1-c3', 'priya_n', 'There’s something beautiful and unbearable about being mistaken for someone your parent loved. Sending you peace.', 522, 2),
      c('p1-c4', 'rosa_v', 'My therapist calls this a "gift of presence." Sitting in a room with someone exactly where they are. You did that.', 311, 2),
    ],
  }),
  p({
    id: '2',
    sub: 'career', author: 'jonah_r',
    title: 'I quit my six-figure job last Friday to go work at the library. Best decision of my life.',
    body:
      "Spent eight years in fintech making more money than I knew what to do with. Was so anxious I couldn't sleep without melatonin. On Sunday nights I'd get this knot in my chest at exactly 7pm. Like clockwork.\n\nI took a part-time job at the public library that pays $19/hr. My new boss is a 64-year-old woman named Patty who wears cardigans and gives book recommendations to teenagers. On my first day she told me, 'We're not solving anything here. We just give people quiet places and good books.'\n\nI cried in the break room. I haven't taken melatonin in two weeks.",
    score: 24_982, age: 8 * H, commentCount: 1_412,
    comments: [
      c('p2-c1', 'kate_b', 'Patty sounds like she should run the world.', 8210, 7, [
        c('p2-c1-1', 'jonah_r', 'She made me a thermos of tea on day three. I almost wept.', 3104, 6),
      ]),
      c('p2-c2', 'sam_o', "How are you doing on the money side? Asking because I'm trying to do the same thing and I'm scared.", 410, 5, [
        c('p2-c2-1', 'jonah_r', 'Cut my expenses in half. Sold the second car. I live like a college student again and somehow feel rich.', 312, 4),
      ]),
      c('p2-c3', 'amelia_g', 'I left law for teaching last year. The pay cut hurts. The Sunday nights are unrecognizable.', 1822, 5),
    ],
  }),
  p({
    id: '3',
    sub: 'strangers', author: 'maya_w',
    title: 'A stranger paid for my groceries today and I don’t know what to do with it.',
    body:
      "I'm a single mom. Two kids, 4 and 7. I'd had a brutal day — kid threw up at school, car wouldn't start, you know the type. I got to the checkout at Kroger and my card declined. I knew it would. I started taking things out, embarrassed, sweating, my four-year-old asking why we couldn't buy the bread.\n\nA woman behind me — older, maybe sixty — quietly handed her card to the cashier and said 'put it all on mine.' I tried to refuse. She just said, 'Someone did this for me when my kids were small. Pay it forward when you can.'\n\nI sat in my car for a long time before I drove home. I don't even know her name.",
    score: 31_204, age: 14 * H, commentCount: 2_402,
    comments: [
      c('p3-c1', 'a_friend', 'This is the kind of thing that makes me believe in people again.', 4012, 13),
      c('p3-c2', 'priya_n', "You don't owe her her name — you owe the next person in line.", 8120, 12, [
        c('p3-c2-1', 'maya_w', "Already starting a little envelope in my purse. Even if it's $10.", 2010, 11),
      ]),
      c('p3-c3', 'theo_a', 'Sixty-year-old me is going to be that woman. Mark my words.', 902, 10),
    ],
  }),
  p({
    id: '4',
    sub: 'loss', author: 'lin_h',
    title: 'I taught my grandfather to text six months before he died. He used to send me one heart every morning.',
    body:
      "He was 88. He didn't trust phones his whole life. But after my grandma passed I sat with him one Sunday for three hours teaching him how to send a text. \"Good morning, kiddo.\" Three words. Same three, every day.\n\nFor six months, every single morning at 7am, my phone would buzz with those three words. He never wrote anything else. He didn't know how, or maybe he didn't need to.\n\nHe passed in October. I still check my phone at 7am.",
    score: 28_002, age: 1 * D + 2 * H, commentCount: 902,
    comments: [
      c('p4-c1', 'desmond_t', "I'm sitting at my desk crying. Thank you for sharing him with us.", 3120, 28),
      c('p4-c2', 'henry_f', 'My father-in-law learned to FaceTime to see my newborn. We have hours of footage of his forehead. I’ll keep all of it.', 1844, 26),
    ],
  }),
  p({
    id: '5',
    sub: 'family', author: 'anonymous',
    title: 'My mother and I had not spoken for eleven years. Yesterday she called to tell me she was proud of me.',
    body:
      "I won't get into why we stopped talking. It was bad. It was both our faults and mostly hers. I built a whole life without her — my husband never met her, my daughter has never met her grandmother.\n\nYesterday she called. I almost didn't pick up. She didn't apologize. She didn't ask to meet. She just said, 'I saw the article about your work. I'm proud of you. That's all I wanted to say.' And she hung up.\n\nI sat in my kitchen for an hour. My daughter came down and asked why I was smiling and crying at the same time. I didn't know how to explain that sometimes the door doesn't open all the way — it just opens a little. And a little is more than nothing.",
    score: 22_180, age: 1 * D + 6 * H, commentCount: 1_812,
    comments: [
      c('p5-c1', 'kate_b', 'A little is more than nothing. I’m going to be thinking about this line for a long time.', 5840, 30),
      c('p5-c2', 'quinn_b', "Eleven years. That phone call took everything she had. Not saying you owe her anything — just naming it.", 2204, 28),
    ],
  }),
  p({
    id: '6',
    sub: 'funny', author: 'sam_o',
    title: 'I told the woman at the DMV she had nice handwriting and she started crying',
    body:
      "I went to renew my license expecting it to be miserable. Lady behind the counter, name tag said Brenda, was filling out my form. She had this beautiful loopy cursive that you just don't see anymore. I said, completely casually, 'Wow, your handwriting is really nice.'\n\nShe looked up at me and her eyes filled up. She said, 'In thirty-one years working here, nobody has ever told me that.' Then she stamped my form like nothing happened.\n\nI think about Brenda probably once a week. We have no idea what people are carrying around.",
    score: 41_204, age: 2 * D, commentCount: 3_204,
    comments: [
      c('p6-c1', 'priya_n', 'This is going to make me compliment everyone I see today.', 8210, 47, [
        c('p6-c1-1', 'sam_o', 'Brenda would be so happy.', 2104, 46),
      ]),
      c('p6-c2', 'isla_d', 'I told my barista her latte art looked like a swan and she said it was supposed to be a heart. We bonded over it.', 902, 44),
    ],
  }),
  p({
    id: '7',
    sub: 'growth', author: 'desmond_t',
    title: 'I stopped drinking on June 4th, 2023. Today I picked my daughter up from school sober for the first time.',
    body:
      "She's nine. She doesn't know I used to drink before pickup. She doesn't know about the mints in the car. She doesn't know any of it, and I'm spending the rest of my life making sure she never has to.\n\nIt's been 350 days. Today she got in the car, told me about her science project on volcanoes, and asked if we could get ice cream. We got ice cream. I cried in the freezer aisle while she picked between rocky road and mint chip.\n\nIf you're trying to stop — keep going. The boring days are the ones worth living.",
    score: 38_420, age: 2 * D + 4 * H, commentCount: 2_104,
    comments: [
      c('p7-c1', 'jonah_r', '350 days. You’re doing it. Hug your daughter for the rest of us.', 9402, 50),
      c('p7-c2', 'noor_a', '11 years for me. The boring days really are the ones worth living. You are going to be SO glad you remember this one.', 4044, 49),
    ],
  }),
  p({
    id: '8',
    sub: 'hardship', author: 'anonymous',
    title: 'A photo from the morning I left him.',
    body:
      "Six years ago. I took this photo before I drove away with everything I could fit in my car. The sun was just coming up. I remember being scared he'd wake up. I remember thinking, if I can just make it to the highway, I can make it anywhere.\n\nI made it.",
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
    score: 14_820, age: 3 * D, commentCount: 822,
    comments: [
      c('p8-c1', 'maya_w', 'Made it. Past tense. Powerful word in this story.', 4120, 70),
      c('p8-c2', 'rosa_v', 'I look at my own version of this photo on hard days. Keep yours close.', 1822, 68),
    ],
  }),
  p({
    id: '9',
    sub: 'faith', author: 'kate_b',
    title: 'I started praying again last month. I don’t know what to call what I believe in. I just know I needed to talk to someone.',
    body:
      "I left the church I grew up in at twenty-two. I'm thirty-eight now. I haven't said grace, recited a creed, or thought about any of it in almost two decades.\n\nThis spring I got a hard diagnosis. Not the worst, but bad enough. And one night, sitting in my kitchen at 2am, I caught myself whispering. Not to God exactly. Not to anyone with a name. Just into the room. Asking for help.\n\nI've done it every night since. I don't know what I'm doing. I just know I'm not alone in the kitchen anymore.",
    score: 11_204, age: 4 * D, commentCount: 612,
    comments: [c('p9-c1', 'a_friend', 'Whatever it is, I’m glad it’s there for you. Sending strength.', 2102, 90)],
  }),
  p({
    id: '10',
    sub: 'growth', author: 'priya_n',
    title: 'I’m 73 years old and I just learned to ride a bike.',
    body:
      "I never learned as a kid. We were too poor for bikes, and then I was too embarrassed as a teenager, and then I just told myself it was too late.\n\nMy granddaughter — she's 7 — taught me. She held the back of the seat, ran behind me down her cul-de-sac, and yelled 'I let go ten seconds ago, Nani!' I didn't even know.\n\nI did three loops before I had to sit down. I don't know why I waited so long. Tell the people in your life: it's not too late for the thing.",
    score: 52_104, age: 5 * D, commentCount: 1_842,
    comments: [c('p10-c1', 'jonah_r', 'NANI ON A BIKE. This is the best thing I will read all year.', 8120, 110)],
  }),
  p({
    id: '11',
    sub: 'love', author: 'lin_h',
    title: 'My eighth-grade English teacher mailed me a postcard last week. Twenty-three years after his class.',
    body:
      "I'd written about him in a piece I published. Just one line — 'Mr. Patterson told me my writing mattered when nothing else did.' Somehow he saw it.\n\nThe postcard says, in handwriting I haven't seen in twenty-three years: 'I always knew. — JP.' That's it.\n\nI'm 36 and I felt like I was twelve again, sitting in his classroom, hearing him tell me my story was worth telling.",
    score: 28_410, age: 6 * D, commentCount: 1_402,
    comments: [c('p11-c1', 'theo_a', "I always knew. Three words. Gonna think about this all week.", 6210, 130)],
  }),
  p({
    id: '12',
    sub: 'parenthood', author: 'maya_w',
    title: 'My toddler asked the cashier if she was okay because she looked sad. She was.',
    body:
      "He's three. He has no filter. We were checking out at Target and he looked up at the cashier and said, very seriously, 'Are you okay? You look sad.' I started apologizing and she just stopped, looked down at him, and said, 'I am sad, buddy. Thank you for asking.'\n\nThey had a whole conversation while I bagged groceries. She told him her cat was sick. He told her his stuffed dinosaur could come visit it. I haven't stopped thinking about it.\n\nThree-year-olds are the only honest people left.",
    score: 19_204, age: 7 * D, commentCount: 882,
    comments: [c('p12-c1', 'simone_l', 'Three-year-olds and golden retrievers. The only honest creatures we have.', 4012, 150)],
  }),

  // ──────── Friendship ────────
  p({
    id: '13',
    sub: 'friendship', author: 'theo_a',
    title: 'My best friend and I haven’t lived in the same city in 11 years. We still call every Tuesday at 9pm.',
    body:
      "We were roommates in college. He moved to Tokyo for work in 2014; I stayed in Chicago. We started a standing Tuesday call because we missed each other and figured it'd peter out in a month.\n\nWe've now had over 500 of them. Through his divorce, my mom's death, two job losses, a baby, a relapse, and one extremely boring period in 2019 where we mostly talked about a podcast.\n\nIt is the single most important thing in my life and I have never once told him that. I think tonight I will.",
    score: 19_412, age: 6 * H, commentCount: 612,
    comments: [
      c('p13-c1', 'omar_s', "Tell him tonight. I waited until my best friend's funeral and I'd give anything to take it back.", 4202, 5),
      c('p13-c2', 'nadia_k', 'Going to text my college roommate after I finish typing this.', 1814, 5),
    ],
  }),
  p({
    id: '14',
    sub: 'friendship', author: 'anonymous',
    title: 'I ghosted my best friend for two years. Last week I drove eight hours to apologize in person.',
    body:
      "I had a breakdown in 2022 that I didn't have words for at the time. I stopped responding to her texts. Eventually she stopped sending them.\n\nLast Wednesday I got in my car at 5am and drove from Atlanta to St. Louis. I knocked on her door. She opened it, looked at me, and said, 'Took you long enough,' and then she just hugged me for a really long time.\n\nWe talked for nine hours. She made me grilled cheese. I drove home Thursday morning lighter than I've been in years.",
    score: 14_802, age: 1 * D, commentCount: 502,
    comments: [c('p14-c1', 'eliza_w', "'Took you long enough.' Best friends speak in shorthand.", 3102, 22)],
  }),

  // ──────── Travel ────────
  p({
    id: '15',
    sub: 'travel', author: 'rosa_v',
    title: 'I missed my train in Lisbon and ended up at the wedding of two strangers.',
    body:
      "Backpacking, 2018. I was running for a train and missed it by literally seconds. I sat on a bench feeling sorry for myself when a woman in a beautiful blue dress sat down next to me and said in English, 'You look like you need a glass of wine. Come to my cousin's wedding.'\n\nI was 24. I went.\n\nI ate octopus I couldn't identify. I danced with a 70-year-old man who told me his late wife was teaching me from heaven. I slept on a couch in a stranger's apartment and woke up to coffee and toast and a phone number written on a napkin.\n\nLisbon will always be a country in my heart and that wedding is the reason.",
    score: 32_812, age: 12 * H, commentCount: 1_402,
    comments: [
      c('p15-c1', 'paulo_r', "I'm Portuguese. This is the most accurate description of a Portuguese wedding I have ever read.", 4920, 11),
      c('p15-c2', 'amelia_g', 'I missed a train in Naples once and the conductor took me home for dinner with his family. Trains in this part of the world are a portal.', 1844, 10),
    ],
  }),
  p({
    id: '16',
    sub: 'travel', author: 'henry_f',
    title: 'A man in a small town in Montana let me sleep in his truck during a snowstorm.',
    body:
      "Long story short: my car died on a back road outside of Bozeman at midnight in March. No service. Snow coming down hard.\n\nA man named Earl pulled up in a beat-up Ford. Late sixties. Mustache like a walrus. He couldn't tow me but he turned his truck around so the heater hit my window. He sat in his truck for six hours with me until the road crew came at dawn. We didn't even talk much. Just listened to country radio and watched the snow.\n\nHe gave me a coffee from his thermos. I never got his last name. I think about him every winter.",
    score: 22_120, age: 2 * D + 6 * H, commentCount: 802,
    comments: [c('p16-c1', 'beck_t', "Earls always show up exactly when you need an Earl.", 3204, 60)],
  }),

  // ──────── Strangers ────────
  p({
    id: '17',
    sub: 'strangers', author: 'nadia_k',
    title: 'A man on the subway gave me his coat. I never even saw his face.',
    body:
      "Boston, January, 2020. I'd lost my coat earlier that night — left it on a chair at a restaurant, dumb. I was on the T at midnight in a t-shirt, shaking. A guy walks up, doesn't say anything, takes off his big wool coat, drops it on my lap, and gets off at the next stop. Hood pulled up the whole time.\n\nI still have the coat. I still wear it. I’m wearing it right now writing this.",
    score: 17_402, age: 2 * D, commentCount: 522,
    comments: [c('p17-c1', 'micah_p', "Wear it well. Earned.", 2104, 47)],
  }),
  p({
    id: '18',
    sub: 'strangers', author: 'sam_o',
    title: 'The nurse at the ER sang to my son while they stitched up his lip. I still don’t know her name.',
    body:
      "He was 4. He'd fallen off a chair and split his lip open and we were both terrified. The nurse — Black woman in her fifties, glasses on a beaded chain — sat by his head and sang every Disney song she could think of, completely off-key, while the doctor stitched.\n\nMy son sang along through the lidocaine. He didn't cry. He still talks about her.\n\nHe's 11 now. If you're out there: thank you. You have no idea.",
    score: 25_120, age: 3 * D + 2 * H, commentCount: 982,
    comments: [c('p18-c1', 'simone_l', 'Nurses are the actual saints. Tip them with thank-yous loudly and often.', 4422, 70)],
  }),

  // ──────── Parenthood ────────
  p({
    id: '19',
    sub: 'parenthood', author: 'isla_d',
    title: 'My 8-year-old told me she didn’t want to be small anymore. I think she meant something bigger.',
    body:
      "She was in the bathtub. Out of nowhere she said, 'Mom, I don't want to be small anymore.' I asked her what she meant. She thought for a long time. Then she said: 'I want my words to count more.'\n\nShe's eight. I'm thirty-six. I've felt that exact thing in meetings my entire career and never had words for it.\n\nMy daughter just gave me language. I am going to spend my entire life listening to her.",
    score: 28_140, age: 18 * H, commentCount: 1_104,
    comments: [
      c('p19-c1', 'eliza_w', "'I want my words to count more.' I’m writing this down.", 5212, 16),
      c('p19-c2', 'priya_n', 'Listen to her loud and listen to her quiet.', 2122, 14),
    ],
  }),
  p({
    id: '20',
    sub: 'parenthood', author: 'quinn_b',
    title: 'My teenage son walked in while I was crying. He didn’t say anything. He just made me toast.',
    body:
      "He's 15. We have not had a real conversation in months. I had a really hard call from my brother and was sobbing at the kitchen table when he came down for a snack.\n\nHe didn't ask what was wrong. He didn't hug me. He just walked over to the toaster, put two pieces of bread in, buttered them, and slid the plate toward me. Then he sat across from me and ate a bowl of cereal and didn't say a word.\n\nI think it's the most loving thing he's ever done.",
    score: 31_204, age: 1 * D + 4 * H, commentCount: 1_404,
    comments: [
      c('p20-c1', 'jonah_r', "Teenage boys say I love you with toast and silence. It counts. It really counts.", 8120, 24),
      c('p20-c2', 'rashid_m', "He's watching everything you do. He's also okay. You're doing fine.", 2122, 23),
    ],
  }),

  // ──────── Faith ────────
  p({
    id: '21',
    sub: 'faith', author: 'omar_s',
    title: 'I lit a candle for my father in a church I’ve never been to in a country I’d never visited.',
    body:
      "He'd been gone two years. I was in Krakow on a work trip and walked past a church and just went in. I'm not Catholic. I'm not even sure what I am anymore.\n\nI put a coin in the box, lit a candle, sat in the back, and cried for an hour. A nun who couldn't have weighed more than 90 pounds put her hand on my shoulder for a second on her way past. I don't know what she said. I don't speak Polish. It didn't matter.\n\nThat trip is the closest I've been to my dad since he died.",
    score: 18_220, age: 2 * D, commentCount: 802,
    comments: [c('p21-c1', 'noor_a', 'Grief crosses every border. So does kindness.', 4012, 47)],
  }),
  p({
    id: '22',
    sub: 'faith', author: 'anonymous',
    title: 'I left the religion I grew up in. I miss the singing.',
    body:
      "I don't miss the rules. I don't miss the guilt. I don't miss the men telling me what I was allowed to want.\n\nI miss the singing.\n\nI miss standing shoulder to shoulder with two hundred people who all knew the same song. I haven't found a replacement for that feeling and I don't know if I will.",
    score: 14_104, age: 3 * D, commentCount: 612,
    comments: [
      c('p22-c1', 'kate_b', "Try a community choir. It's not the same. But it's something.", 3104, 68),
      c('p22-c2', 'a_friend', 'I cry every time a stadium sings Sweet Caroline together. Same neurons, I think.', 1240, 66),
    ],
  }),

  // ──────── Funny ────────
  p({
    id: '23',
    sub: 'funny', author: 'beck_t',
    title: 'I confidently complimented a woman’s baby in line at the post office. It was a melon.',
    body:
      "She was holding it in a baby sling. A baby sling. Who carries a melon in a baby sling. I said, in my best baby-voice, 'awwww, look at thoooose cheeks.'\n\nShe looked at me for a long beat and said, 'It's a cantaloupe.'\n\nI haven't been to that post office in three years.",
    score: 38_440, age: 2 * D + 8 * H, commentCount: 2_004,
    comments: [
      c('p23-c1', 'tess_y', "WHY WAS SHE CARRYING A MELON IN A SLING. The story is the sling.", 9210, 60),
      c('p23-c2', 'rashid_m', 'I refuse to believe this happened to anyone but you.', 4012, 58),
    ],
  }),
  p({
    id: '24',
    sub: 'funny', author: 'micah_p',
    title: 'My grandmother accidentally joined a furry Discord and was the most popular member for six weeks.',
    body:
      "She thought it was a knitting group. Somebody invited her, she clicked the link, never read the description. She just started sharing yarn pictures and being kind to everyone.\n\nThe furries adopted her. They called her Nan. She had no idea what they were. She thought the avatars were 'lovely little cartoons.'\n\nWhen I finally explained it to her she said, 'Well, they were nice to me. That's more than I can say about my actual knitting group.'",
    score: 71_204, age: 3 * D, commentCount: 4_822,
    comments: [
      c('p24-c1', 'simone_l', 'NAN. NAN OF THE FURRIES. I will be telling this story for years.', 18_201, 70),
      c('p24-c2', 'eliza_w', 'Honestly the furries are usually the kindest community online. Nan was in good hands.', 6204, 68),
    ],
  }),
  p({
    id: '25',
    sub: 'funny', author: 'rashid_m',
    title: 'My boss said “let’s circle back” for the eleventh time and I just started spinning slowly in my chair.',
    body:
      "I don't even know why I did it. We were on Zoom. He said it, I locked eyes with the camera, and very slowly began to swivel.\n\nHe stopped mid-sentence. He said, 'What are you doing.' I said, 'Circling back.' Half the meeting muted themselves to laugh.\n\nI did not get the promotion.",
    score: 24_140, age: 4 * D, commentCount: 1_402,
    comments: [c('p25-c1', 'theo_a', "Worth it.", 6210, 92)],
  }),

  // ──────── Animals ────────
  p({
    id: '26',
    sub: 'animals', author: 'amelia_g',
    title: 'My dog waited at the door for my son for nine months while he was deployed.',
    body:
      "Every day at 4pm, when my son used to come home from the school he taught at before he enlisted, our dog Rosie would sit at the front door.\n\nFor nine months. Every single day.\n\nThe day my son came home, Rosie didn't move from his side for three weeks. She slept on his feet. She followed him to the bathroom. When he sat on the couch she put her entire body on his lap. She is a 90 pound dog.\n\nShe knew. She had always known.",
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=900&q=80&auto=format&fit=crop',
    score: 56_220, age: 1 * D + 8 * H, commentCount: 2_822,
    comments: [
      c('p26-c1', 'isla_d', 'Dogs perceive time but not the way we do. They just know who is missing.', 12_104, 30),
      c('p26-c2', 'paulo_r', 'Give Rosie a treat from us all.', 5402, 28),
    ],
  }),
  p({
    id: '27',
    sub: 'animals', author: 'tess_y',
    title: 'A barn cat showed up on our porch in 2019. He has not left. We do not know why he picked us.',
    body:
      "I'd been crying on the porch the day he showed up. Heavy stuff. Job loss, miscarriage, a bad month. He jumped onto the railing, walked over, sat down next to me, and just looked at me.\n\nFive years later he still does this. If I cry, he appears. Doesn't matter where I am in the house. He finds me. We named him Mister Pibb because that's what I had been drinking.\n\nI know cats don't pick people for emotional reasons. But also: he did.",
    score: 41_104, age: 3 * D + 4 * H, commentCount: 1_602,
    comments: [c('p27-c1', 'henry_f', "MISTER PIBB. Cats are tiny shadow people. He chose you.", 11_402, 80)],
  }),
  p({
    id: '28',
    sub: 'animals', author: 'anonymous',
    title: 'I held my old dog one last time at the vet yesterday. Sixteen years. I am writing this so I don’t forget the smallest things.',
    body:
      "The way he sighed when he finally relaxed. The way he licked my hand once, very softly, like he was telling me it was okay. The vet's kindness — she sat on the floor with us for twenty minutes after, didn't rush. The way the receptionist gave me a paw print in clay without saying anything.\n\nSixteen years. He was a puppy when I met my wife. He was at our wedding. He was at the airport when we brought our daughter home.\n\nI'll write the bigger thing later. For now I just want to remember the small things.",
    score: 48_220, age: 5 * D, commentCount: 2_402,
    comments: [c('p28-c1', 'noor_a', "Sixteen years of unconditional love. He had a life. So did you, with him. Sending you so much warmth.", 14_210, 110)],
  }),

  // ──────── Food ────────
  p({
    id: '29',
    sub: 'food', author: 'priya_n',
    title: 'My mother died in 2011 and I have spent thirteen years trying to recreate her dal.',
    body:
      "It's not the recipe. The recipe was always wrong. She would shake her head and laugh at whatever I'd written down and add three more things from memory.\n\nI'm 41 now. Two weeks ago I made it and my eight-year-old said, 'This tastes like Nani's kitchen.' My daughter never met my mother. She has only ever heard stories.\n\nI sat at the table and cried into my dal. My husband poured me a beer and didn't say anything. He's a good one.",
    score: 32_044, age: 1 * D, commentCount: 1_204,
    comments: [
      c('p29-c1', 'rosa_v', "Sometimes you don't get the recipe — you get the kitchen. Sounds like you got both.", 6402, 22),
      c('p29-c2', 'omar_s', "My grandmother's qorma. Twelve years in. Still missing something. Going to keep trying.", 2422, 21),
    ],
  }),
  p({
    id: '30',
    sub: 'food', author: 'paulo_r',
    title: 'The diner where I grew up closed last week. I drove four hours to eat there one last time.',
    body:
      "Same waitress for twenty-eight years. Linda. She remembered my order from when I was nine. Bacon, eggs scrambled hard, rye toast, no jelly, orange juice, no pulp.\n\nShe brought it without me ordering. She sat down across from me in the booth — I have never in my life seen her sit down — and she said, 'I'm glad you came.'\n\nWe ate together. She told me about the regulars I used to know. We didn't talk about the closing.\n\nI tipped her one hundred dollars and she pretended to be mad about it and made me take ten back.",
    score: 27_402, age: 2 * D + 6 * H, commentCount: 1_004,
    comments: [c('p30-c1', 'beck_t', "Linda is the kind of person you stop the world for. Glad you did.", 5824, 60)],
  }),

  // ──────── Home ────────
  p({
    id: '31',
    sub: 'home', author: 'eliza_w',
    title: 'I bought the house I used to ride my bike past as a kid wishing I lived in it.',
    body:
      "Grew up about a mile away in a much smaller house. I used to ride my bike past this one every day after school. It had a porch swing and a maple tree and a tire swing in the yard.\n\nI'm 39. Last month I closed on it. The maple tree is still there. The porch swing is gone but I'm putting one back.\n\nI sat on the porch on the night I got the keys and cried like I was nine years old.",
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=80&auto=format&fit=crop',
    score: 38_402, age: 3 * D, commentCount: 1_802,
    comments: [c('p31-c1', 'maya_w', "Bike past kid you. She’d be so proud.", 8240, 70)],
  }),
  p({
    id: '32',
    sub: 'home', author: 'beck_t',
    title: 'I left my hometown at 18 swearing I’d never come back. I moved back at 41. I’m happier than I’ve ever been.',
    body:
      "I thought small towns were prisons. Turns out the city wasn't the answer and neither was the suburb and neither was the second city after that.\n\nMy mom got sick. I came home to help. Six weeks turned into six months turned into a year. I started getting coffee at the diner every morning. I joined a softball team. I dated a man who'd been two grades below me in high school. He's now my husband.\n\nThe town didn't change. I did. There's nothing wrong with a small life if it's yours.",
    score: 21_404, age: 4 * D, commentCount: 902,
    comments: [c('p32-c1', 'jonah_r', "'There's nothing wrong with a small life if it's yours.' Putting that on my wall.", 6210, 92)],
  }),

  // ──────── Coming of Age ────────
  p({
    id: '33',
    sub: 'comingofage', author: 'simone_l',
    title: 'The summer I was 17, a woman at a gas station saw me crying and gave me twenty dollars and her business card. I never called. I think about her every year.',
    body:
      "I was running from a bad home situation. Driving with everything I owned in the back seat. Stopped at a gas station in Ohio at 2am because I couldn't see through the tears anymore.\n\nA woman in her fifties pulled up next to me. She tapped on my window. She asked if I was safe. I lied. She asked again. I told her the truth.\n\nShe gave me twenty bucks in cash and her business card and said, 'If you change your mind in the next few days, call me. I have a couch.'\n\nI didn't call. I went to my aunt instead. But that twenty dollars got me to my aunt. And the fact that she'd offered the couch is what got me to believe someone might.",
    score: 24_810, age: 5 * D, commentCount: 1_022,
    comments: [c('p33-c1', 'kate_b', "She saved you and she'll never know. That's most heroes.", 7410, 110)],
  }),
  p({
    id: '34',
    sub: 'comingofage', author: 'theo_a',
    title: 'My dad sat me down when I was 16 and apologized for the things his dad did to him through him.',
    body:
      "He'd been in therapy for two years. He sat me down at our kitchen table on a Sunday morning and said, 'I want to say something and I don't want you to say anything until I'm done.'\n\nHe apologized for the temper. He apologized for the silences. He apologized for the time he made me stand in the rain for an hour because I'd talked back. He didn't make excuses. He didn't say his dad had been worse. He just said sorry, listed specific things, and looked me in the eye while he did it.\n\nI'm 31. We are the closest we have ever been. I think about that morning every Father's Day.",
    score: 31_402, age: 1 * D + 8 * H, commentCount: 1_204,
    comments: [
      c('p34-c1', 'quinn_b', "Cycle. Broken. Right there at that kitchen table.", 8204, 26),
      c('p34-c2', 'rosa_v', "Wish my father had this in him. Glad yours did.", 2410, 24),
    ],
  }),

  // ──────── Money ────────
  p({
    id: '35',
    sub: 'money', author: 'nadia_k',
    title: 'I made my first $100,000 last year. I’m not happier. I’m calmer.',
    body:
      "I want to be honest because I think people lie about this.\n\nI'm not happier. The things that made me happy at $42k still make me happy. Cheap wine on the porch. Books. My partner. A long walk.\n\nWhat I have is *calm*. The phone ringing isn't a threat. A medical bill isn't a catastrophe. My car needed new tires and I just got new tires. The constant low-grade hum of fear is gone. That is what money buys. Not joy — fewer alarms.\n\nI didn't know how loud the alarms were until they stopped.",
    score: 42_104, age: 8 * H, commentCount: 2_104,
    comments: [
      c('p35-c1', 'omar_s', "'Not joy — fewer alarms.' This is the most accurate description of money I've ever read.", 14_210, 6),
      c('p35-c2', 'henry_f', "I make six figures. I still flinch when the dishwasher makes a noise it shouldn't. The fear takes a while to leave.", 6202, 5),
    ],
  }),
  p({
    id: '36',
    sub: 'money', author: 'micah_p',
    title: 'My grandfather kept every receipt from the grocery store for 47 years. We found them after he died.',
    body:
      "Boxes and boxes and boxes. Organized by year. He'd never said anything about it.\n\nWe started going through them. We thought it was a quirk. Then we realized: the receipts trace his entire life. The years he and Grandma were broke. The year my mom was born — diapers, formula, a small bottle of champagne. The year he retired — he started buying himself ice cream every Tuesday.\n\nThe last receipt is from three days before he died. Bananas, milk, eggs, a single yellow rose. He used to bring my grandma one rose every Friday for fifty-one years.\n\nWe kept the receipts.",
    score: 67_402, age: 1 * D + 12 * H, commentCount: 3_402,
    comments: [c('p36-c1', 'amelia_g', "A grocery store receipt as a love letter. Going to look at my grandfather's hands differently tonight.", 18_210, 32)],
  }),

  // ──────── Health ────────
  p({
    id: '37',
    sub: 'health', author: 'a_friend',
    title: 'Six months ago I couldn’t walk up a flight of stairs. Today I ran my first 5k.',
    body:
      "Long COVID. Was bedridden for nine months. Doctors didn't know what to do. I started with one minute of walking a day. One. Minute.\n\nThen two. Then a block. Then ten blocks. Then five minutes of running. Then a mile.\n\nToday: 5k. 38 minutes. Slow. Doesn't matter. The point isn't the time. The point is I am not in that bed.\n\nIf you are at one minute right now — keep going. The body forgives.",
    score: 36_220, age: 6 * H, commentCount: 1_404,
    comments: [c('p37-c1', 'quinn_b', "'The body forgives.' I needed that today. Recovering from a back surgery. Thank you.", 5420, 4)],
  }),

  // ──────── Mental Health ────────
  p({
    id: '38',
    sub: 'mentalhealth', author: 'anonymous',
    title: 'I told my therapist I was fine. I had been lying to her for nine months. Today I told her the truth.',
    body:
      "I'd been lying to my therapist for nine months. I know how absurd that sounds. I paid someone to listen to me and I lied to her every week. I told her the work was going well. I told her I'd been sleeping. I told her I hadn't been thinking about it.\n\nToday I walked in and I said, 'I have to tell you something.' And then I told her everything. The drinking. The bad nights. The plan I'd made in October. All of it.\n\nShe didn't flinch. She said, 'Thank you for telling me. I'm here. Let's start.'\n\nI'm going to be okay. I think. I really think this time.",
    score: 38_220, age: 1 * D + 6 * H, commentCount: 1_822,
    comments: [
      c('p38-c1', 'isla_d', "Today is day one. I'm proud of you. Keep going.", 9210, 28),
      c('p38-c2', 'noor_a', "Therapists know when we're lying. She was waiting for you. So glad you got there.", 4244, 26),
    ],
  }),
  p({
    id: '39',
    sub: 'mentalhealth', author: 'rashid_m',
    title: 'My depression lifted at 32 after fifteen years and I have no idea why. I’m writing this in case you’re in year 14.',
    body:
      "I don't have a story. There's no thing that fixed it. I'd tried meds, therapy, exercise, prayer, retreats, books, plant medicine — the whole library. Some helped a little. Nothing fixed it.\n\nThen one morning last spring I woke up and the gray was just… gone. I went outside and saw colors I hadn't seen in years. I cried over a cup of coffee.\n\nIt's been seven months. It hasn't come back.\n\nI'm not saying this happens to everyone. I'm saying it happened to me and I want you to know about it on the off chance you're in year fourteen and the books have stopped helping.",
    score: 42_104, age: 3 * D + 6 * H, commentCount: 2_204,
    comments: [c('p39-c1', 'priya_n', "I'm in year 12. Bookmarking this. Thank you.", 11_402, 80)],
  }),

  // ──────── Love ────────
  p({
    id: '40',
    sub: 'love', author: 'amelia_g',
    title: 'My husband leaves me a Post-it on the bathroom mirror every morning. He has done this for 22 years.',
    body:
      "Sometimes it's a joke. Sometimes it's just 'I love you.' Last week it said, 'You looked beautiful asleep this morning. - the management.'\n\nI saved every single one for the first ten years and then I ran out of space. Now I let most of them go. But I still read every one. He still writes every one.\n\nWe got married at 22. We are not perfect at this. But this we get right.",
    score: 51_410, age: 2 * D, commentCount: 2_402,
    comments: [c('p40-c1', 'omar_s', "'the management' is the best sign-off in marriage history.", 12_402, 47)],
  }),
  p({
    id: '41',
    sub: 'love', author: 'anonymous',
    title: 'I left a marriage I’d been in for fifteen years to live alone for the first time. It’s the bravest thing I’ve done.',
    body:
      "He wasn't a bad man. He was a good man I'd outgrown. We had built a life together and I was disappearing inside it.\n\nI moved into a one-bedroom apartment. I bought a single plate, a single mug, a single set of sheets. I sat on my floor the first night and ate cereal and listened to a record I'd been afraid to play around him.\n\nIt's been six months. I am the loneliest I've ever been. I am also the most me I've ever been. I don't know what comes next. I trust myself to find out.",
    score: 32_402, age: 4 * D, commentCount: 1_402,
    comments: [
      c('p41-c1', 'isla_d', 'A single plate. A single mug. A single set of sheets. This is a beginning, not a punishment.', 8120, 92),
      c('p41-c2', 'eliza_w', "Did this at 38. It will become joy. Give it a year.", 3221, 90),
    ],
  }),

  // ──────── Loss ────────
  p({
    id: '42',
    sub: 'loss', author: 'simone_l',
    title: 'I lost my brother in 2019. Yesterday I caught myself smiling in a memory of him for the first time without the second wave of guilt.',
    body:
      "For four years, every time I thought of something funny he did, I'd smile for a second and then immediately feel sick. Like I was betraying him by being happy in his story.\n\nYesterday I was driving and a song came on and I thought of him pretending to be a rockstar in the car when I was 12 and he was 15, and I laughed out loud, and the second wave never came.\n\nI sat in my car at the gas station and just… felt him. Not the absence of him. Him.\n\nI don't know what changed. I just want to say to anyone else: sometimes it does.",
    score: 34_404, age: 1 * D + 4 * H, commentCount: 1_604,
    comments: [c('p42-c1', 'paulo_r', "'Not the absence of him. Him.' That distinction is everything.", 10_204, 26)],
  }),

  // ──────── Second Chances ────────
  p({
    id: '43',
    sub: 'secondchances', author: 'henry_f',
    title: 'My estranged son emailed me last month after eight years. We are meeting for coffee tomorrow.',
    body:
      "I won't pretend I deserve this. I do not.\n\nHe sent two sentences: 'I'd like to see you. Coffee, Saturday?'\n\nI have been writing and rewriting what I'll say for thirty days. I've thrown out every draft. Tonight I think I'm going to walk in with nothing prepared and just ask him about his life. And listen.\n\nIf you have a parent you're considering reaching out to: I am the parent on the other end. I have been waiting for eight years. Please.",
    score: 39_222, age: 10 * H, commentCount: 1_802,
    comments: [
      c('p43-c1', 'beck_t', "Walk in with nothing prepared. Listen. Don't defend. You'll be okay.", 11_402, 8),
      c('p43-c2', 'anonymous', "I'm the kid in this story for someone else. Reading this. Thinking about it.", 7204, 7),
    ],
  }),
  p({
    id: '44',
    sub: 'secondchances', author: 'rosa_v',
    title: 'I started college at 51. I just finished my first semester with a 4.0.',
    body:
      "I'd dropped out at 19. Got pregnant. Worked retail and waitressing my whole life. Raised three kids. Helped raise four grandkids. Always told myself I'd 'go back when there was time.'\n\nMy youngest daughter sat me down last summer and said, 'Mom. There isn't going to be time. There's only making time.'\n\nI'm taking it slow. Two classes a semester. Sociology and English Composition this fall. I cried when I got the email about the 4.0. Not because of the grade. Because I'd been telling myself for thirty years I wasn't smart enough to do it.\n\nI was wrong. I was just tired.",
    score: 47_104, age: 3 * D, commentCount: 2_104,
    comments: [
      c('p44-c1', 'tess_y', "'I was wrong. I was just tired.' Underline. Underline. Underline.", 13_204, 68),
      c('p44-c2', 'micah_p', "Your daughter is a genius. So are you, apparently.", 5210, 66),
    ],
  }),

  // ──────── Hardship ────────
  p({
    id: '45',
    sub: 'hardship', author: 'anonymous',
    title: 'I was homeless for fourteen months. I am writing this from my own kitchen.',
    body:
      "I'm not going to give the whole story. The short version: I lost a job, then a marriage, then an apartment, in that order, in about six months.\n\nI slept in my car for the first three months. Then a shelter. Then a friend's couch I'd been too embarrassed to ask about for nine months earlier. Then a room. Now an apartment.\n\nI got a new job in October. I signed the lease on this place in February. I bought a kitchen table from a thrift store last weekend. I am sitting at it right now writing this and drinking coffee from a mug I own.\n\nI thought I would never own a mug again. I am crying typing that sentence.",
    score: 58_402, age: 18 * H, commentCount: 2_822,
    comments: [
      c('p45-c1', 'maya_w', "You own a mug. You own a TABLE. You own this morning. Welcome home.", 17_402, 15),
      c('p45-c2', 'amelia_g', "I read every word. Thank you for trusting us with this.", 6402, 14),
    ],
  }),

  // ──────── Career ────────
  p({
    id: '46',
    sub: 'career', author: 'quinn_b',
    title: 'I’ve been a janitor at the same elementary school for 31 years. Today they named the library after me.',
    body:
      "I started here when I was 24. Most of the teachers I started with have retired. I'm 55. I never went to college. I clean floors.\n\nA kid I used to talk to in the hallways — Maria, she was a quiet girl, used to sit by the trophy case at lunch — became a librarian. She came back to this school as the librarian three years ago. Last week she called me into her office.\n\nThe district named the library after me. There's a plaque. It says: 'For the man who told us to keep going.'\n\nI don't remember telling Maria to keep going. I just remember her sitting by the trophy case. I always said good morning. I always said her name.\n\nIf you're cleaning floors somewhere right now: somebody is watching. Be kind to them. It counts more than you know.",
    score: 78_402, age: 2 * D + 2 * H, commentCount: 4_204,
    comments: [
      c('p46-c1', 'priya_n', "Stand up. Take a bow. The world is so much better with you in it.", 22_204, 50),
      c('p46-c2', 'lin_h', "Janitors and bus drivers and lunch ladies are the secret architects of every adult who turned out okay.", 11_404, 48),
    ],
  }),
]
