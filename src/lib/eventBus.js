// Tiny in-process pub/sub. Same shape as a message bus — subscribers
// react to events, publishers don't know who's listening. Used to keep
// vote/post/comment side effects (live feed, online counters, ambient
// activity) decoupled from the mutating store actions.

const subscribers = new Map() // type -> Set<handler>
const history = []
const HISTORY_LIMIT = 80

export const Events = Object.freeze({
  VoteCast:            'vote:cast',
  PostCreated:         'post:created',
  CommentAdded:        'comment:added',
  CommunityFollowed:   'community:followed',
  CommunityUnfollowed: 'community:unfollowed',
  ThemeChanged:        'theme:changed',
  UserJoined:          'user:joined',     // ambient
  StoryRead:           'story:read',      // ambient
})

const WILDCARD = '*'

export function subscribe(type, handler) {
  if (typeof handler !== 'function') {
    throw new TypeError('subscribe(): handler must be a function')
  }
  if (!subscribers.has(type)) subscribers.set(type, new Set())
  subscribers.get(type).add(handler)
  return () => unsubscribe(type, handler)
}

export function unsubscribe(type, handler) {
  subscribers.get(type)?.delete(handler)
}

export function emit(type, payload = {}) {
  const event = Object.freeze({ type, payload, ts: Date.now() })
  history.unshift(event)
  if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT

  const fanout = (set) => {
    if (!set) return
    for (const fn of set) {
      try { fn(event) } catch (err) { console.error('[bus]', type, err) }
    }
  }
  fanout(subscribers.get(type))
  fanout(subscribers.get(WILDCARD))
  return event
}

export function getHistory(limit = HISTORY_LIMIT) {
  return history.slice(0, limit)
}

export function clearHistory() {
  history.length = 0
}
