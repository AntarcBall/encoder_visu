import './style.css'
import { chapters, quickFacts, referenceBasis, siteNotes, sourceTrace } from './content.js'
import { interactionRegistry, quizItems, renderRegisteredInteraction } from './interactions.js'

const app = document.querySelector('#app')

const state = {
  current: 0,
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
  jacobianScale: 1.2,
  jacobianX: 0.5,
  jacobianY: -0.4,
  quizAnswers: {},
  visitedChapters: new Set(),
  exploredInteractions: new Set(),
}

function init() {
  const hash = window.location.hash.slice(1)
  const idx = chapters.findIndex((chapter) => chapter.id === hash)
  state.current = idx >= 0 ? idx : 0
  state.visitedChapters.add(chapters[state.current].id)
  renderApp()
  window.addEventListener('hashchange', syncFromHash)
  window.addEventListener('keydown', handleKeys)
}

function syncFromHash() {
  const hash = window.location.hash.slice(1)
  const idx = chapters.findIndex((chapter) => chapter.id === hash)
  if (idx >= 0 && idx !== state.current) {
    state.current = idx
    state.visitedChapters.add(chapters[idx].id)
    renderChapter()
    updateSidebar()
    updateMissionBoard()
  }
}

function handleKeys(event) {
  if (event.key === 'ArrowRight') navigate(Math.min(chapters.length - 1, state.current + 1))
  if (event.key === 'ArrowLeft') navigate(Math.max(0, state.current - 1))
}

function navigate(index) {
  state.current = index
  state.visitedChapters.add(chapters[index].id)
  window.location.hash = chapters[index].id
  renderChapter()
  updateSidebar()
  updateMissionBoard()
}

function renderApp() {
  app.innerHTML = `
    <div class="shell">
      <aside class="sidebar">
        <div class="brand">
          <p class="eyebrow">Paper-2-Web • Vite Story</p>
          <h1>Autoencoder Playground</h1>
          <p class="brand-copy">autoencoder.pdf를 쉽고 재밌게 이해하도록 바꾼 인터랙티브 설명 페이지</p>
        </div>
        <div class="facts">
          ${quickFacts
            .map(
              (fact) => `
                <div class="fact-card">
                  <span>${fact.label}</span>
                  <strong>${fact.label === '페이지 수' ? `${chapters.length}개 학습 페이지 + 실험 패널` : fact.value}</strong>
                </div>
              `
            )
            .join('')}
        </div>
        <section class="mission-card" id="mission-board"></section>
        <nav id="chapter-nav" class="chapter-nav"></nav>
      </aside>
      <main class="main-panel">
        <header class="hero-card">
          <div>
            <p class="eyebrow">멀티 에이전트 설계 + Paper-2-Web 흐름 반영</p>
            <h2>읽기만 하는 논문 요약이 아니라, 만져보며 배우는 오토인코더 전시관</h2>
            <p>
              각 페이지는 <strong>핵심 원리</strong>, <strong>쉬운 비유</strong>, <strong>주의할 오해</strong>,
              <strong>직접 조작하는 인터랙션</strong>으로 구성됩니다.
            </p>
          </div>
          <div class="hero-badges">
            <span>${chapters.length} Pages</span>
            <span>${Object.keys(interactionRegistry).length} Labs</span>
            <span>Easy Korean</span>
            <span>Keyboard Nav ← →</span>
          </div>
        </header>
        <section id="chapter-view"></section>
        <section class="evidence-grid">
          <article class="evidence-card">
            <p class="eyebrow">Source Trace</p>
            <h3>원문 챕터 대응표</h3>
            <div class="trace-list">
              ${sourceTrace
                .map(
                  (item) => `
                    <div class="trace-item">
                      <strong>${item.section}</strong>
                      <div>
                        <span>${item.topic}</span>
                        <small>${item.covers}</small>
                      </div>
                    </div>
                  `
                )
                .join('')}
            </div>
          </article>
          <article class="evidence-card">
            <p class="eyebrow">Scope Note</p>
            <h3>이 사이트를 어떻게 읽으면 좋은가</h3>
            <ul class="note-list">
              ${siteNotes.map((note) => `<li>${note}</li>`).join('')}
            </ul>
          </article>
          <article class="evidence-card">
            <p class="eyebrow">Reference Basis</p>
            <h3>출처를 어떻게 재구성했는가</h3>
            <div class="basis-list">
              ${referenceBasis
                .map(
                  (item) => `
                    <div class="basis-item">
                      <strong>${item.label}</strong>
                      <span>${item.value}</span>
                    </div>
                  `
                )
                .join('')}
            </div>
          </article>
        </section>
      </main>
    </div>
  `

  updateSidebar()
  updateMissionBoard()
  renderChapter()
}

function updateMissionBoard() {
  const board = document.querySelector('#mission-board')
  if (!board) return

  const totalLabs = new Set(chapters.map((chapter) => chapter.interaction)).size
  const quizScore = quizItems.reduce((count, item) => count + Number(state.quizAnswers[item.id] === item.answer), 0)
  const badges = [
    { name: 'Explorer', unlocked: state.visitedChapters.size >= 6 },
    { name: 'Lab Tinkerer', unlocked: state.exploredInteractions.size >= 5 },
    { name: 'Chapter Finisher', unlocked: state.visitedChapters.size === chapters.length },
    { name: 'Rescue Pilot', unlocked: state.challengeBest.hard >= 85 },
    { name: 'Quiz Ace', unlocked: quizScore === quizItems.length },
  ]

  board.innerHTML = `
    <p class="eyebrow">Mission Board</p>
    <h3>게임처럼 배우기</h3>
    <div class="mission-stats">
      <div><span>방문한 챕터</span><strong>${state.visitedChapters.size}/${chapters.length}</strong></div>
      <div><span>체험한 랩</span><strong>${state.exploredInteractions.size}/${totalLabs}</strong></div>
      <div><span>퀴즈 점수</span><strong>${quizScore}/${quizItems.length}</strong></div>
    </div>
    <div class="badge-row">
      ${badges
        .map(
          (badge) => `
            <span class="badge-chip ${badge.unlocked ? 'unlocked' : ''}">
              ${badge.unlocked ? '🏅' : '🔒'} ${badge.name}
            </span>
          `
        )
        .join('')}
    </div>
  `
}

function markInteractionExplored(type) {
  state.exploredInteractions.add(type)
  updateMissionBoard()
}

function updateSidebar() {
  const nav = document.querySelector('#chapter-nav')
  nav.innerHTML = chapters
    .map(
      (chapter, index) => `
        <button class="nav-item ${index === state.current ? 'active' : ''}" data-index="${index}">
          <span class="nav-index">${String(index + 1).padStart(2, '0')}</span>
          <span>
            <strong>${chapter.title}</strong>
            <small>${chapter.focus}</small>
          </span>
        </button>
      `
    )
    .join('')

  nav.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => navigate(Number(button.dataset.index)))
  })
}

function renderChapter() {
  const chapter = chapters[state.current]
  const interaction = interactionRegistry[chapter.interaction]
  const container = document.querySelector('#chapter-view')
  const progress = ((state.current + 1) / chapters.length) * 100

  container.innerHTML = `
    <article class="chapter-card">
      <div class="chapter-topline">
        <span class="pill">${chapter.badge}</span>
        <span class="section-label">Page ${state.current + 1} / ${chapters.length}</span>
      </div>
      <div class="chapter-header">
        <div>
          <p class="eyebrow">${chapter.focus}</p>
          <h3>${chapter.title}</h3>
        </div>
        <div class="progress-wrap">
          <div class="progress-bar"><span style="width:${progress}%"></span></div>
          <p>${state.current + 1} / ${chapters.length}</p>
        </div>
      </div>

      <div class="chapter-grid">
        <section class="story-panel glass">
          <p class="lead">${chapter.summary}</p>
          <div class="detail-grid">
            <div>
              <h4>쉽게 말하면</h4>
              <p>${chapter.easy}</p>
            </div>
            <div>
              <h4>원문 포인트</h4>
              <p>${chapter.paper}</p>
            </div>
          </div>
          <div class="bullet-list">
            ${chapter.bullets.map((bullet) => `<span>${bullet}</span>`).join('')}
          </div>
          <details class="info-box" open>
            <summary>비유로 기억하기</summary>
            <p>${chapter.analogy}</p>
          </details>
          <details class="info-box">
            <summary>헷갈리기 쉬운 오해</summary>
            <p><strong>오해:</strong> ${chapter.misconception}</p>
            <p><strong>정정:</strong> ${chapter.correction}</p>
          </details>
          <details class="info-box">
            <summary>Why this matters</summary>
            <p>${getWhyMatters(chapter)}</p>
          </details>
        </section>
        <section class="interactive-panel glass">
          <div class="panel-head">
            <div>
              <p class="eyebrow">Interactive Lab</p>
              <h4>${interaction?.title ?? 'Interactive View'}</h4>
            </div>
            <button class="ghost-button" id="randomize-button">가볍게 바꿔보기</button>
          </div>
          <p class="interaction-desc">${interaction?.hint ?? '인터랙션을 조작하며 개념을 직관적으로 확인해 보세요.'}</p>
          <div id="interaction-root" role="region" aria-label="${interaction?.title ?? 'Interactive View'}"></div>
        </section>
      </div>

      <div class="chapter-footer">
        <button class="pager" ${state.current === 0 ? 'disabled' : ''} id="prev-button">← 이전</button>
        <button class="pager" ${state.current === chapters.length - 1 ? 'disabled' : ''} id="next-button">다음 →</button>
      </div>
    </article>
  `

  document.querySelector('#prev-button')?.addEventListener('click', () => navigate(Math.max(0, state.current - 1)))
  document.querySelector('#next-button')?.addEventListener('click', () => navigate(Math.min(chapters.length - 1, state.current + 1)))
  document.querySelector('#randomize-button')?.addEventListener('click', shuffleCurrentInteraction)

  renderInteraction(chapter.interaction)
}

function getWhyMatters(chapter) {
  if (chapter.interaction === 'bottleneck' || chapter.interaction === 'phaseTransitionLab') {
    return '압축은 단순히 줄이는 작업이 아니라, 무엇을 남겨야 downstream task와 reconstruction이 유지되는지를 결정하는 핵심 선택입니다.'
  }
  if (chapter.interaction === 'denoise' || chapter.interaction === 'score' || chapter.interaction === 'vectorFieldLab') {
    return '노이즈를 없애는 과정은 데이터 분포가 어디에 놓이는지를 배우는 과정과 연결되기 때문에, representation learning과 generative modeling 모두에 중요합니다.'
  }
  if (chapter.interaction === 'manifold' || chapter.interaction === 'tangentLab' || chapter.interaction === 'chartStitchingLab') {
    return '데이터가 놓인 저차원 구조를 이해하면, 어떤 변화는 보존하고 어떤 변화는 억제해야 하는지 훨씬 선명해집니다.'
  }
  if (chapter.interaction === 'challenge') {
    return '좋은 표현은 reconstruction만 높은 것이 아니라, 과적합을 피하면서 구조를 보존하는 균형 위에 있다는 점을 한 번에 보여 줍니다.'
  }
  if (chapter.interaction === 'applications' || chapter.interaction === 'semanticHashingLab') {
    return '오토인코더는 교과서용 개념을 넘어서 압축, 검색, 노이즈 제거, feature learning 같은 실제 문제에 연결되는 표현 도구입니다.'
  }
  return '이 랩은 “그냥 그렇다”가 아니라 왜 그 제약이나 구조가 representation을 더 좋게 만드는지 직관과 수치를 함께 연결해 줍니다.'
}

function shuffleCurrentInteraction() {
  state.bottleneckSize = randomInt(2, 9)
  state.capacity = randomInt(2, 10)
  state.datasetVariety = randomInt(2, 10)
  state.sparsity = randomInt(18, 90)
  state.noise = randomInt(5, 70)
  state.manifoldT = randomInt(5, 95)
  state.contractiveWobble = randomInt(4, 70)
  state.arenaMode = Math.random() > 0.5 ? 'linear' : 'nonlinear'
  state.familyMode = ['sparse', 'denoise', 'contractive'][randomInt(0, 2)]
  state.challengeFilter = randomInt(48, 82)
  state.challengeLatent = randomInt(2, 6)
  state.challengeSnap = Math.random() > 0.3
  state.projectionAngle = randomInt(0, 180)
  state.scoreSigma = randomInt(40, 160) / 100
  state.jacobianScale = randomInt(60, 220) / 100
  state.stochasticSeed += 1
  renderInteraction(chapters[state.current].interaction)
}

function renderInteraction(type) {
  const root = document.querySelector('#interaction-root')
  renderRegisteredInteraction(type, root, {
    state,
    markInteractionExplored,
    updateMissionBoard,
    rerender: (nextType = type) => renderInteraction(nextType),
  })
  markInteractionExplored(type)
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

init()
