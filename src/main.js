import './style.css'
import { chapters, quickFacts, referenceBasis, siteNotes, sourceTrace } from './content.js'
import { interactionRegistry, quizItems, renderRegisteredInteraction } from './interactions.js'
import { createInitialState, loadPersistedState, persistState } from './state.js'

const app = document.querySelector('#app')
const state = createInitialState(chapters, loadPersistedState())

let persistTimer = null
let paletteQuery = ''

function init() {
  syncFromHash({ applySavedIndex: true })
  state.visitedChapters.add(chapters[state.current].id)
  renderApp()
  window.addEventListener('hashchange', handleHashChange)
  window.addEventListener('keydown', handleKeys)
  schedulePersist()
}

function schedulePersist() {
  window.clearTimeout(persistTimer)
  persistTimer = window.setTimeout(() => {
    state.lastSavedAt = new Date().toISOString()
    persistState(state)
    updateSaveStatus()
  }, 120)
}

function syncFromHash({ applySavedIndex = false } = {}) {
  const hash = window.location.hash.slice(1)
  const idx = chapters.findIndex((chapter) => chapter.id === hash)

  if (idx >= 0) {
    state.current = idx
    return true
  }

  if (applySavedIndex) {
    window.location.hash = chapters[state.current].id
    return true
  }

  return false
}

function handleHashChange() {
  const previous = state.current
  const didSync = syncFromHash()
  if (didSync && previous !== state.current) {
    state.visitedChapters.add(chapters[state.current].id)
    renderChapter()
    updateSidebar()
    updateLearningDeck()
    schedulePersist()
  }
}

function shouldIgnoreKeydown(target) {
  if (!(target instanceof HTMLElement)) return false
  return Boolean(target.closest('input, textarea, select, button, [contenteditable="true"]'))
}

function handleKeys(event) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    openCommandPalette()
    return
  }

  if (!shouldIgnoreKeydown(event.target) && event.key === '/') {
    event.preventDefault()
    openCommandPalette()
    return
  }

  if (shouldIgnoreKeydown(event.target)) return

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    navigate(Math.min(chapters.length - 1, state.current + 1))
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    navigate(Math.max(0, state.current - 1))
  }
}

function navigate(index, { updateHash = true } = {}) {
  state.current = index
  state.visitedChapters.add(chapters[index].id)

  if (updateHash && window.location.hash.slice(1) !== chapters[index].id) {
    window.location.hash = chapters[index].id
  }

  renderChapter()
  updateSidebar()
  updateLearningDeck()
  schedulePersist()
}

function renderApp() {
  app.innerHTML = `
    <a class="skip-link" href="#chapter-view">본문으로 바로가기</a>
    <div class="shell">
      <aside class="sidebar" aria-label="학습 사이드바">
        <div class="sidebar-top">
          <div class="brand brand-card">
            <p class="eyebrow">Paper-2-Web • Vite Story</p>
            <h1>Autoencoder Playground</h1>
            <p class="brand-copy">autoencoder.pdf를 쉽고 재밌게 이해하도록 바꾼 인터랙티브 설명 페이지</p>
          </div>
          <section class="sidebar-panel search-panel" aria-label="챕터 탐색">
            <label class="search-label" for="chapter-search">챕터 검색</label>
            <div class="search-input-wrap">
              <span aria-hidden="true">⌕</span>
              <input id="chapter-search" type="search" placeholder="예: sparse, manifold, quiz" value="${escapeHtml(state.chapterQuery)}" />
            </div>
            <p class="micro-note">제목, 포커스, 배지 기준으로 빠르게 찾을 수 있어요.</p>
          </section>
          <div class="facts facts-grid">
            ${quickFacts
              .map(
                (fact) => `
                  <div class="fact-card gradient-border">
                    <span>${fact.label}</span>
                    <strong>${fact.label === '페이지 수' ? `${chapters.length}개 학습 페이지 + 실험 패널` : fact.value}</strong>
                  </div>
                `
              )
              .join('')}
          </div>
          <section class="mission-card" id="mission-board"></section>
          <section class="learning-deck" id="learning-deck"></section>
        </div>
        <nav id="chapter-nav" class="chapter-nav" aria-label="챕터 목록"></nav>
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
        <section class="overview-grid" aria-label="콘텐츠 개요">
          ${getOverviewCards()}
        </section>
        <section class="chapter-toolbar glass" aria-label="학습 도구 모음">
          <div class="toolbar-copy">
            <p class="eyebrow">Learning Compass</p>
            <h3>지금 보고 있는 챕터를 기준으로 빠르게 이동하세요</h3>
            <p>검색, 점프 셀렉트, 퀵 파인드, 진행률을 묶어서 긴 콘텐츠에서도 길을 잃지 않도록 정리했습니다.</p>
          </div>
          <div class="toolbar-actions">
            <label class="select-card" for="chapter-jump">
              <span>빠른 점프</span>
              <select id="chapter-jump">
                ${chapters
                  .map(
                    (chapter, index) =>
                      `<option value="${index}" ${index === state.current ? 'selected' : ''}>${String(index + 1).padStart(2, '0')} · ${chapter.title}</option>`
                  )
                  .join('')}
              </select>
            </label>
            <div class="toolbar-stat">
              <span>누적 진행률</span>
              <strong>${Math.round(((state.current + 1) / chapters.length) * 100)}%</strong>
              <div class="progress-bar compact"><span style="width:${((state.current + 1) / chapters.length) * 100}%"></span></div>
            </div>
            <div class="toolbar-button-group">
              <button class="ghost-button toolbar-button" id="continue-button">이어보기</button>
              <button class="ghost-button toolbar-button" id="open-palette">퀵 파인드</button>
            </div>
          </div>
        </section>
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
    <dialog id="command-palette" class="command-palette">
      <form method="dialog" class="command-palette-shell">
        <div class="command-header">
          <div>
            <p class="eyebrow">Quick Find</p>
            <h3>챕터를 바로 찾고 이동하기</h3>
          </div>
          <button class="ghost-button" value="cancel">닫기</button>
        </div>
        <label class="search-label" for="palette-search">챕터 찾기</label>
        <div class="search-input-wrap">
          <span aria-hidden="true">⌕</span>
          <input id="palette-search" type="search" placeholder="제목, 배지, 포커스로 검색" value="${escapeHtml(paletteQuery)}" />
        </div>
        <div class="palette-tip-row">
          <span>단축키: ⌘/Ctrl + K</span>
          <span>/ 키로도 열 수 있어요</span>
        </div>
        <div class="palette-results" id="palette-results"></div>
      </form>
    </dialog>
  `

  bindShellEvents()
  updateSidebar()
  updateMissionBoard()
  updateLearningDeck()
  renderChapter()
}

function bindShellEvents() {
  document.querySelector('#chapter-search')?.addEventListener('input', (event) => {
    state.chapterQuery = event.target.value
    updateSidebar()
    schedulePersist()
  })

  document.querySelector('#chapter-jump')?.addEventListener('change', (event) => {
    navigate(Number(event.target.value))
  })

  document.querySelector('#continue-button')?.addEventListener('click', () => {
    const lastVisitedIndex = getLastVisitedIndex()
    navigate(lastVisitedIndex)
  })

  document.querySelector('#open-palette')?.addEventListener('click', openCommandPalette)
  document.querySelector('#reset-progress')?.addEventListener('click', resetProgress)
  bindCommandPalette()
}

function getVisibleChapters() {
  const query = state.chapterQuery.trim().toLowerCase()
  if (!query) return chapters.map((chapter, index) => ({ chapter, index }))

  return chapters
    .map((chapter, index) => ({ chapter, index }))
    .filter(({ chapter }) => {
      const haystack = [chapter.title, chapter.focus, chapter.badge, chapter.section].join(' ').toLowerCase()
      return haystack.includes(query)
    })
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
    <div class="panel-title-row">
      <h3>게임처럼 배우기</h3>
      <span class="panel-badge">자동 저장</span>
    </div>
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

function updateLearningDeck() {
  const deck = document.querySelector('#learning-deck')
  if (!deck) return

  const chapter = chapters[state.current]
  const completion = Math.round((state.visitedChapters.size / chapters.length) * 100)
  deck.innerHTML = `
    <p class="eyebrow">Learning Snapshot</p>
    <div class="panel-title-row">
      <h3>${chapter.title}</h3>
      <button class="ghost-button compact-button" id="reset-progress">진행 초기화</button>
    </div>
    <p class="learning-copy">${chapter.summary}</p>
    <div class="learning-stats">
      <div>
        <span>현재 포커스</span>
        <strong>${chapter.focus}</strong>
      </div>
      <div>
        <span>학습 완주율</span>
        <strong>${completion}%</strong>
      </div>
    </div>
    <div class="progress-bar compact"><span style="width:${completion}%"></span></div>
    <p class="micro-note" id="save-status">새로고침해도 현재 챕터와 학습 흔적이 유지됩니다.</p>
  `

  document.querySelector('#reset-progress')?.addEventListener('click', resetProgress)
  updateSaveStatus()
}

function markInteractionExplored(type) {
  state.exploredInteractions.add(type)
  updateMissionBoard()
  schedulePersist()
}

function updateSidebar() {
  const nav = document.querySelector('#chapter-nav')
  if (!nav) return

  const visibleChapters = getVisibleChapters()
  const visibleMarkup = visibleChapters.length
    ? visibleChapters
        .map(
          ({ chapter, index }) => `
            <button
              class="nav-item ${index === state.current ? 'active' : ''} ${state.visitedChapters.has(chapter.id) ? 'visited' : ''}"
              data-index="${index}"
              ${index === state.current ? 'aria-current="page"' : ''}
            >
              <span class="nav-index">${String(index + 1).padStart(2, '0')}</span>
              <span>
                <strong>${chapter.title}</strong>
                <small>${chapter.focus}</small>
              </span>
            </button>
          `
        )
        .join('')
    : '<p class="micro-note">검색 결과가 없습니다. 다른 키워드를 시도해 보세요.</p>'

  nav.innerHTML = `
    <div class="nav-summary">
      <strong>${visibleChapters.length}</strong>
      <span>${state.chapterQuery ? '검색 결과' : '전체 챕터'}</span>
    </div>
    ${visibleMarkup}
  `

  nav.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => navigate(Number(button.dataset.index)))
  })
}

function renderChapter() {
  const chapter = chapters[state.current]
  const interaction = interactionRegistry[chapter.interaction]
  const container = document.querySelector('#chapter-view')
  const progress = ((state.current + 1) / chapters.length) * 100
  const previousChapter = chapters[state.current - 1]
  const nextChapter = chapters[state.current + 1]

  container.innerHTML = `
    <article class="chapter-card" aria-labelledby="chapter-title">
      <div class="chapter-topline">
        <span class="pill">${chapter.badge}</span>
        <span class="section-label">${chapter.section}</span>
      </div>
      <div class="chapter-header">
        <div>
          <p class="eyebrow">${chapter.focus}</p>
          <h3 id="chapter-title">${chapter.title}</h3>
          <div class="chapter-meta-row">
            <span class="meta-chip">${interaction?.title ?? 'Interactive View'}</span>
            <span class="meta-chip">방문 ${state.visitedChapters.has(chapter.id) ? '완료' : '예정'}</span>
            <span class="meta-chip">${state.current + 1}/${chapters.length}</span>
          </div>
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

      <div class="chapter-footer chapter-footer-rich">
        <div class="pager-group">
          <button class="pager" ${state.current === 0 ? 'disabled' : ''} id="prev-button">← 이전</button>
          <button class="pager" ${state.current === chapters.length - 1 ? 'disabled' : ''} id="next-button">다음 →</button>
        </div>
        <div class="chapter-neighbors" aria-label="이전 다음 챕터 요약">
          <div class="neighbor-card ${previousChapter ? '' : 'disabled'}">
            <span>이전 챕터</span>
            <strong>${previousChapter?.title ?? '첫 챕터입니다'}</strong>
          </div>
          <div class="neighbor-card ${nextChapter ? '' : 'disabled'}">
            <span>다음 챕터</span>
            <strong>${nextChapter?.title ?? '마지막 챕터입니다'}</strong>
          </div>
        </div>
      </div>
    </article>
  `

  document.querySelector('#chapter-jump').value = String(state.current)
  document.querySelector('#prev-button')?.addEventListener('click', () => navigate(Math.max(0, state.current - 1)))
  document.querySelector('#next-button')?.addEventListener('click', () => navigate(Math.min(chapters.length - 1, state.current + 1)))
  document.querySelector('#randomize-button')?.addEventListener('click', shuffleCurrentInteraction)

  updateLearningDeck()
  renderInteraction(chapter.interaction)
}

function getLastVisitedIndex() {
  const visitedIds = Array.from(state.visitedChapters)
  if (!visitedIds.length) return state.current
  const lastVisitedId = visitedIds[visitedIds.length - 1]
  const index = chapters.findIndex((chapter) => chapter.id === lastVisitedId)
  return index >= 0 ? index : state.current
}

function getOverviewCards() {
  const bucketCounts = getChapterBuckets()
  return bucketCounts
    .map(
      (bucket) => `
        <article class="overview-card">
          <span>${bucket.label}</span>
          <strong>${bucket.count}개</strong>
          <p>${bucket.description}</p>
        </article>
      `
    )
    .join('')
}

function getChapterBuckets() {
  const rules = [
    { label: '핵심 개념', test: (chapter) => chapter.badge !== 'Tech Lab' && chapter.badge !== 'Finale', description: '기본 개념과 직관을 설명하는 섹션' },
    { label: '테크 랩', test: (chapter) => chapter.badge === 'Tech Lab', description: '슬라이더·캔버스로 직접 만지는 실험 섹션' },
    { label: '응용/마무리', test: (chapter) => chapter.badge === 'Finale' || chapter.interaction === 'applications' || chapter.interaction === 'quiz', description: '활용, 도전 과제, 마지막 정리' },
  ]

  return rules.map((rule) => ({
    label: rule.label,
    count: chapters.filter(rule.test).length,
    description: rule.description,
  }))
}

function bindCommandPalette() {
  const dialog = document.querySelector('#command-palette')
  const input = document.querySelector('#palette-search')
  if (!dialog || !input) return

  renderPaletteResults()

  input.addEventListener('input', (event) => {
    paletteQuery = event.target.value
    renderPaletteResults()
  })

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      const first = getPaletteResults()[0]
      if (first) {
        navigate(first.index)
        closeCommandPalette()
      }
    }
  })

  dialog.addEventListener('close', () => {
    paletteQuery = ''
    input.value = ''
  })
}

function getPaletteResults() {
  const query = paletteQuery.trim().toLowerCase()
  if (!query) return chapters.map((chapter, index) => ({ chapter, index })).slice(0, 12)

  return chapters
    .map((chapter, index) => ({ chapter, index }))
    .filter(({ chapter }) => {
      const haystack = [chapter.title, chapter.focus, chapter.badge, chapter.section].join(' ').toLowerCase()
      return haystack.includes(query)
    })
    .slice(0, 12)
}

function renderPaletteResults() {
  const container = document.querySelector('#palette-results')
  if (!container) return

  const results = getPaletteResults()
  container.innerHTML = results.length
    ? results
        .map(
          ({ chapter, index }) => `
            <button class="palette-item" type="button" data-index="${index}">
              <span class="palette-item-index">${String(index + 1).padStart(2, '0')}</span>
              <span>
                <strong>${chapter.title}</strong>
                <small>${chapter.focus} · ${chapter.badge}</small>
              </span>
            </button>
          `
        )
        .join('')
    : '<p class="micro-note">일치하는 챕터가 없습니다.</p>'

  container.querySelectorAll('.palette-item').forEach((button) => {
    button.addEventListener('click', () => {
      navigate(Number(button.dataset.index))
      closeCommandPalette()
    })
  })
}

function openCommandPalette() {
  const dialog = document.querySelector('#command-palette')
  const input = document.querySelector('#palette-search')
  if (!dialog || !input) return

  if (typeof dialog.showModal === 'function') {
    if (!dialog.open) dialog.showModal()
  } else {
    dialog.setAttribute('open', 'open')
  }

  renderPaletteResults()
  window.setTimeout(() => input.focus(), 0)
}

function closeCommandPalette() {
  const dialog = document.querySelector('#command-palette')
  if (!dialog) return

  if (typeof dialog.close === 'function') {
    if (dialog.open) dialog.close()
  } else {
    dialog.removeAttribute('open')
  }
}

function resetProgress() {
  if (!window.confirm('학습 진행도와 저장된 탐색 흔적을 초기화할까요?')) return

  state.current = 0
  state.chapterQuery = ''
  state.quizAnswers = {}
  state.visitedChapters = new Set([chapters[0].id])
  state.exploredInteractions = new Set()
  state.challengeBest = { easy: 0, medium: 0, hard: 0 }
  state.challengeLastScore = null
  state.challengeBadge = 'Warm-up'
  state.challengeMessage = '난이도를 고르고, 노이즈를 줄이면서도 과하게 외우지 않는 균형점을 찾아보세요.'
  paletteQuery = ''

  const paletteSearch = document.querySelector('#palette-search')
  if (paletteSearch) paletteSearch.value = ''

  const sidebarSearch = document.querySelector('#chapter-search')
  if (sidebarSearch) sidebarSearch.value = ''

  updateMissionBoard()
  navigate(0)
  closeCommandPalette()
}

function updateSaveStatus() {
  const node = document.querySelector('#save-status')
  if (!node) return

  if (!state.lastSavedAt) {
    node.textContent = '새로고침해도 현재 챕터와 학습 흔적이 유지됩니다.'
    return
  }

  const savedAt = new Date(state.lastSavedAt)
  node.textContent = `새로고침해도 현재 챕터와 학습 흔적이 유지됩니다. 최근 저장: ${savedAt.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })}`
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
  schedulePersist()
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

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

init()
