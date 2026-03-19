const STORAGE_KEY = 'autoencoder-playground-state:v2'

function buildDefaults() {
  return {
    current: 0,
    chapterQuery: '',
    bottleneckSize: 4,
    capacity: 7,
    datasetVariety: 4,
    sparsity: 72,
    noise: 32,
    stochasticSeed: 0,
    familyMode: 'sparse',
    arenaMode: 'linear',
    manifoldT: 38,
    contractiveWobble: 28,
    psdSteps: 0,
    applicationFilter: 'all',
    challengeDifficulty: 'easy',
    challengeTimeLeft: 60,
    challengeRunning: false,
    challengeFilter: 56,
    challengeLatent: 4,
    challengeSnap: true,
    challengeLastScore: null,
    challengeBadge: 'Warm-up',
    challengeMessage: '난이도를 고르고, 노이즈를 줄이면서도 과하게 외우지 않는 균형점을 찾아보세요.',
    challengeBest: { easy: 0, medium: 0, hard: 0 },
    projectionAngle: 32,
    scoreSigma: 0.9,
    scoreAccuratePointX: 1.9,
    scoreAccuratePointY: -1.4,
    betaVaeBeta: 1.2,
    betaVaeMu: 1.1,
    betaVaeSigma: 0.7,
    jacobianScale: 1.2,
    jacobianX: 0.5,
    jacobianY: -0.4,
    jacobianS1: 1.1,
    jacobianS2: 0.45,
    jacobianTheta: 24,
    lastSavedAt: null,
    quizAnswers: {},
    visitedChapters: new Set(),
    exploredInteractions: new Set(),
  }
}

function getStorage() {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

function normalizeIndex(value, length) {
  if (!Number.isFinite(value)) return 0
  return Math.min(length - 1, Math.max(0, Math.round(value)))
}

export function loadPersistedState() {
  const storage = getStorage()
  if (!storage) return null

  try {
    const raw = storage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function createInitialState(chapters, persistedState = {}) {
  const safePersistedState = persistedState && typeof persistedState === 'object' ? persistedState : {}
  const defaults = buildDefaults()
  const chapterIds = new Set(chapters.map((chapter) => chapter.id))
  const visited = Array.isArray(safePersistedState.visitedChapters)
    ? safePersistedState.visitedChapters.filter((id) => chapterIds.has(id))
    : []
  const explored = Array.isArray(safePersistedState.exploredInteractions)
    ? safePersistedState.exploredInteractions.filter(Boolean)
    : []

  const state = {
    ...defaults,
    ...safePersistedState,
    current: normalizeIndex(safePersistedState.current ?? defaults.current, chapters.length),
    chapterQuery: typeof safePersistedState.chapterQuery === 'string' ? safePersistedState.chapterQuery : defaults.chapterQuery,
    quizAnswers: safePersistedState.quizAnswers && typeof safePersistedState.quizAnswers === 'object' ? safePersistedState.quizAnswers : {},
    challengeBest: {
      ...defaults.challengeBest,
      ...(safePersistedState.challengeBest && typeof safePersistedState.challengeBest === 'object' ? safePersistedState.challengeBest : {}),
    },
    challengeRunning: false,
    challengeTimeLeft: defaults.challengeTimeLeft,
    lastSavedAt: typeof safePersistedState.lastSavedAt === 'string' ? safePersistedState.lastSavedAt : null,
    visitedChapters: new Set(visited),
    exploredInteractions: new Set(explored),
  }

  return state
}

export function persistState(state) {
  const storage = getStorage()
  if (!storage) return

  const payload = {
    current: state.current,
    chapterQuery: state.chapterQuery,
    bottleneckSize: state.bottleneckSize,
    capacity: state.capacity,
    datasetVariety: state.datasetVariety,
    sparsity: state.sparsity,
    noise: state.noise,
    stochasticSeed: state.stochasticSeed,
    familyMode: state.familyMode,
    arenaMode: state.arenaMode,
    manifoldT: state.manifoldT,
    contractiveWobble: state.contractiveWobble,
    psdSteps: state.psdSteps,
    applicationFilter: state.applicationFilter,
    challengeDifficulty: state.challengeDifficulty,
    challengeFilter: state.challengeFilter,
    challengeLatent: state.challengeLatent,
    challengeSnap: state.challengeSnap,
    challengeLastScore: state.challengeLastScore,
    challengeBadge: state.challengeBadge,
    challengeMessage: state.challengeMessage,
    challengeBest: state.challengeBest,
    projectionAngle: state.projectionAngle,
    scoreSigma: state.scoreSigma,
    scoreAccuratePointX: state.scoreAccuratePointX,
    scoreAccuratePointY: state.scoreAccuratePointY,
    betaVaeBeta: state.betaVaeBeta,
    betaVaeMu: state.betaVaeMu,
    betaVaeSigma: state.betaVaeSigma,
    jacobianScale: state.jacobianScale,
    jacobianX: state.jacobianX,
    jacobianY: state.jacobianY,
    jacobianS1: state.jacobianS1,
    jacobianS2: state.jacobianS2,
    jacobianTheta: state.jacobianTheta,
    lastSavedAt: state.lastSavedAt,
    quizAnswers: state.quizAnswers,
    visitedChapters: Array.from(state.visitedChapters),
    exploredInteractions: Array.from(state.exploredInteractions),
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // Ignore storage quota / privacy mode errors.
  }
}
