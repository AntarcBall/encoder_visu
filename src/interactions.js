let state = null
let markInteractionExplored = () => {}
let updateMissionBoard = () => {}
let rerender = () => {}
let challengeTimer = null

export const interactionRegistry = {
  flow: {
    title: 'Encoder-Decoder Conveyor',
    hint: '데이터가 입력에서 code를 거쳐 reconstruction으로 이동하는 흐름을 보세요.',
    render: renderFlow,
  },
  bottleneck: {
    title: 'Bottleneck Lab',
    hint: '슬라이더를 움직여 latent 공간이 작아질수록 무엇이 남고 무엇이 사라지는지 관찰해 보세요.',
    render: renderBottleneck,
  },
  phaseTransitionLab: {
    title: 'Bottleneck Phase Transition Lab',
    hint: '차원을 1,2,3… 늘려 갈 때 reconstruction error가 어디서 꺾이는지 보세요.',
    render: renderPhaseTransitionLab,
  },
  arena: {
    title: 'PCA vs Nonlinear AE Arena',
    hint: '선형 방식과 비선형 방식이 같은 데이터를 얼마나 다르게 설명하는지 비교하세요.',
    render: renderArena,
  },
  linearProjection: {
    title: 'Linear AE / PCA Projection Lab',
    hint: '직교 투영을 실제로 계산해 보며 reconstruction MSE가 어떤 방향에서 가장 작아지는지 확인하세요.',
    render: renderLinearProjection,
  },
  pcaErrorSurface: {
    title: 'PCA Error Surface Lab',
    hint: '각도에 따른 reconstruction MSE 곡면을 보며 최적 축이 어디서 생기는지 확인하세요.',
    render: renderPcaErrorSurface,
  },
  rankKLinearAELab: {
    title: 'Rank-k Linear AE Lab',
    hint: 'rank를 바꾸며 WᵀW reconstruction operator가 점구름을 어떻게 바꾸는지 보세요.',
    render: renderRankKLinearAELab,
  },
  orthogonalityLab: {
    title: 'Orthogonality Lab',
    hint: 'basis 각도를 바꾸며 dot product와 축 분리가 어떻게 달라지는지 보세요.',
    render: renderOrthogonalityLab,
  },
  capacity: {
    title: 'Capacity Trap Simulator',
    hint: 'capacity와 데이터 다양성의 균형이 무너지면 왜 암기 위험이 커지는지 확인해 보세요.',
    render: renderCapacity,
  },
  mutualInfoLab: {
    title: 'Mutual Information Budget Lab',
    hint: 'bottleneck 차원과 SNR이 정보량 예산을 어떻게 바꾸는지 보세요.',
    render: renderMutualInfoLab,
  },
  family: {
    title: 'Regularizer Family Selector',
    hint: '정규화 종류를 바꾸며 sparse / denoising / contractive의 목적 차이를 보세요.',
    render: renderFamily,
  },
  lossLandscapeLab: {
    title: 'Loss Landscape Lab',
    hint: 'θ와 λ를 함께 바꿨을 때 objective가 어떻게 바뀌는지 heatmap으로 보세요.',
    render: renderLossLandscapeLab,
  },
  sparse: {
    title: 'Sparse Neuron Board',
    hint: '패널티가 커질수록 몇 개의 detector만 살아남는지 살펴보세요.',
    render: renderSparse,
  },
  sparseThreshold: {
    title: 'Sparse Threshold Lab',
    hint: 'soft-thresholding이 작은 activation을 어떻게 정확하게 0으로 밀어내는지 보세요.',
    render: renderSparseThreshold,
  },
  istaLab: {
    title: 'ISTA Sparse Coding Lab',
    hint: 'step update를 반복하며 sparse code와 residual이 함께 바뀌는 과정을 보세요.',
    render: renderIstaLab,
  },
  stochastic: {
    title: 'Stochastic Samples',
    hint: '같은 입력에서도 여러 plausible representation 샘플이 나올 수 있다는 감각을 확인하세요.',
    render: renderStochastic,
  },
  reparamLab: {
    title: 'Reparameterization Lab',
    hint: 'μ와 σ를 조절하며 z = μ + σ ⊙ ε 샘플 구름이 latent 공간에서 어떻게 퍼지는지 보세요.',
    render: renderReparamLab,
  },
  klLab: {
    title: 'KL Divergence Lab',
    hint: 'posterior 타원이 prior 원에서 얼마나 벗어나는지와 KL cost가 어떻게 연결되는지 보세요.',
    render: renderKlLab,
  },
  anisotropicPriorLab: {
    title: 'Anisotropic Gaussian Prior Lab',
    hint: '분산과 상관계수를 바꿨을 때 prior 등고선이 원에서 타원으로 어떻게 바뀌는지 보세요.',
    render: renderAnisotropicPriorLab,
  },
  correlatedPosteriorLab: {
    title: 'Correlated Posterior Lab',
    hint: '상관계수에 따라 posterior ellipse가 어떻게 기울어지는지 보세요.',
    render: renderCorrelatedPosteriorLab,
  },
  posteriorCollapseLab: {
    title: 'Posterior Collapse Lab',
    hint: 'posterior가 prior 쪽으로 무너질수록 latent가 얼마나 정보를 잃는지 보세요.',
    render: renderPosteriorCollapseLab,
  },
  latentGeometryLab: {
    title: 'Latent Interpolation Geometry Lab',
    hint: '직선 보간과 곡선 보간이 decoder output을 어떻게 다르게 움직이는지 보세요.',
    render: renderLatentGeometryLab,
  },
  denoise: {
    title: 'Noise Clinic',
    hint: '노이즈가 들어간 입력이 어떤 식으로 구조적인 형태로 복원되는지 비교하세요.',
    render: renderDenoise,
  },
  diffusionScheduleLab: {
    title: 'Diffusion Noise Schedule Lab',
    hint: 'step이 늘어날수록 signal이 어떻게 약해지고 noise가 쌓이는지 시각적으로 보세요.',
    render: renderDiffusionScheduleLab,
  },
  noiseFrontierLab: {
    title: 'Noise-Robustness Frontier Lab',
    hint: 'noise level과 robustness를 함께 바꾸며 복원 성공/실패 경계가 어떻게 생기는지 보세요.',
    render: renderNoiseFrontierLab,
  },
  score: {
    title: 'Score Field Explorer',
    hint: '분홍 점을 움직이며 데이터가 많은 방향으로 되돌아가는 화살표를 관찰하세요.',
    render: renderScore,
  },
  scoreAccurate: {
    title: 'Gaussian Mixture Score Lab',
    hint: '실제 가우시안 혼합분포의 score ∇log p(x)를 계산해 denoising 방향과 비교해 보세요.',
    render: renderScoreAccurate,
  },
  vectorFieldLab: {
    title: 'Denoising Vector Field Lab',
    hint: 'noise scale을 바꾸며 denoising/score field가 얼마나 넓고 부드럽게 퍼지는지 보세요.',
    render: renderVectorFieldLab,
  },
  langevinLab: {
    title: 'Langevin Sampling Lab',
    hint: 'score를 실제 업데이트 식에 넣어 점이 확률밀도 높은 쪽으로 이동하는 과정을 따라가 보세요.',
    render: renderLangevinLab,
  },
  manifold: {
    title: 'Manifold Walkthrough',
    hint: 'manifold 위 점과 tangent 방향이 함께 움직이는 모습을 보세요.',
    render: renderManifold,
  },
  neighborPatchLab: {
    title: 'Nearest-Neighbor Patch Lab',
    hint: '가까운 이웃들로 local patch를 만들고 tangent를 추정하는 과정을 보세요.',
    render: renderNeighborPatchLab,
  },
  chartStitchingLab: {
    title: 'Manifold Chart Stitching Lab',
    hint: '여러 local chart를 이어 붙이며 전역 manifold를 어떻게 근사하는지 보세요.',
    render: renderChartStitchingLab,
  },
  tangentLab: {
    title: 'Tangent / Normal Decomposition Lab',
    hint: 'perturbation을 tangent 성분과 normal 성분으로 분해해 manifold 학습의 핵심 기하를 보세요.',
    render: renderTangentLab,
  },
  decoderManifoldLab: {
    title: 'Decoder Manifold Lab',
    hint: 'latent h를 움직이며 decoder가 데이터 공간에 만드는 곡선을 따라가 보세요.',
    render: renderDecoderManifoldLab,
  },
  decoderCurvatureLab: {
    title: 'Decoder Curvature Lab',
    hint: 'decoder curve의 어느 구간이 더 급하게 휘는지 색으로 보세요.',
    render: renderDecoderCurvatureLab,
  },
  contractive: {
    title: 'Contractive Lens',
    hint: '같은 입력 흔들림이 representation에 얼마나 작게 전달되는지 비교하세요.',
    render: renderContractive,
  },
  jacobianLab: {
    title: 'Jacobian Sensitivity Lab',
    hint: 'tanh encoder의 Jacobian norm을 계산해 contractive penalty가 실제로 줄이는 것이 무엇인지 보세요.',
    render: renderJacobianLab,
  },
  psd: {
    title: 'Predictive Sparse Race',
    hint: '느린 최적화와 빠른 예측 encoder의 시간 차이를 감각적으로 보세요.',
    render: renderPsd,
  },
  applications: {
    title: 'Application Arcade',
    hint: '용도별 카드를 필터링하며 오토인코더의 활용 범위를 정리하세요.',
    render: renderApplications,
  },
  semanticHashingLab: {
    title: 'Semantic Hashing Lab',
    hint: '연속 latent를 binary code로 바꾸고 Hamming distance로 retrieval하는 과정을 보세요.',
    render: renderSemanticHashingLab,
  },
  retrievalPlaygroundLab: {
    title: 'Retrieval Playground Lab',
    hint: 'query sample을 바꿨을 때 nearest binary code ranking이 어떻게 바뀌는지 보세요.',
    render: renderRetrievalPlaygroundLab,
  },
  binaryBoardLab: {
    title: 'Binary Board Lab',
    hint: '2D latent plane이 threshold들에 의해 어떤 binary region들로 나뉘는지 보세요.',
    render: renderBinaryBoardLab,
  },
  retrievalHeatmapLab: {
    title: 'k-NN Retrieval Heatmap Lab',
    hint: 'query 위치를 움직일 때 nearest neighbor가 바뀌는 latent 지역 지도를 보세요.',
    render: renderRetrievalHeatmapLab,
  },
  latentClusterSeparationLab: {
    title: 'Latent Cluster Separation Lab',
    hint: 'cluster margin과 overlap이 retrieval friendliness를 어떻게 바꾸는지 보세요.',
    render: renderLatentClusterSeparationLab,
  },
  challenge: {
    title: 'Latent Rescue Challenge',
    hint: '노이즈 필터, latent 크기, manifold snap의 균형을 맞춰 가장 구조적인 복원을 구해 보세요.',
    render: renderChallenge,
  },
  quiz: {
    title: 'Final Quiz',
    hint: '핵심 개념을 직접 골라보며 이해가 남았는지 확인하세요.',
    render: renderQuiz,
  },
}

export function renderRegisteredInteraction(type, root, env) {
  state = env.state
  markInteractionExplored = env.markInteractionExplored
  updateMissionBoard = env.updateMissionBoard
  rerender = (nextType = type) => env.rerender(nextType)

  if (type !== 'challenge') clearChallengeTimer()

  const entry = interactionRegistry[type]
  root.innerHTML = ''
  if (!entry) {
    root.innerHTML = '<p class="micro-note">아직 준비되지 않은 인터랙션입니다.</p>'
    return
  }
  entry.render(root)
}

export const quizItems = [
  {
    id: 'q1',
    question: 'undercomplete autoencoder의 가장 직접적인 제약은?',
    options: [
      'decoder를 제거한다',
      'code 차원을 입력보다 작게 둔다',
      '항상 노이즈를 추가한다',
    ],
    answer: 1,
  },
  {
    id: 'q2',
    question: 'sparse autoencoder가 주로 강제하는 것은?',
    options: ['모든 뉴런 동시 활성화', '선형성', '선택적 활성화'],
    answer: 2,
  },
  {
    id: 'q3',
    question: 'denoising autoencoder의 핵심 목적은?',
    options: ['깨진 입력에서 원본 구조로 복원', '항상 PCA를 학습', '가중치를 0으로 만든다'],
    answer: 0,
  },
  {
    id: 'q4',
    question: 'contractive autoencoder는 무엇에 둔감해지길 원할까?',
    options: ['입력의 작은 흔들림', '모든 학습 신호', 'decoder의 출력 차원'],
    answer: 0,
  },
]


const challengeConfigs = {
  easy: { duration: 60, targetFilter: 56, targetLatent: 4, badge: 'Noise Tamer' },
  medium: { duration: 50, targetFilter: 68, targetLatent: 3, badge: 'Bottleneck Boss' },
  hard: { duration: 40, targetFilter: 78, targetLatent: 2, badge: 'Latent Navigator' },
}


function renderFlow(root) {
  const raw = [1.0, 0.82, 0.63, 0.48, 0.35, 0.22]
  const code = [1.02, 0.77, 0.41]
  const recon = [0.98, 0.79, 0.61, 0.44, 0.31, 0.19]
  const compression = Math.round((1 - code.length / raw.length) * 100)
  root.innerHTML = `
    <div class="flow-scene">
      <div class="flow-box input-box">
        <span>입력 x</span>
        <strong>원본 데이터</strong>
      </div>
      <div class="flow-arrow"></div>
      <div class="flow-box code-box">
        <span>코드 h</span>
        <strong>압축 표현</strong>
      </div>
      <div class="flow-arrow"></div>
      <div class="flow-box output-box">
        <span>복원 r</span>
        <strong>재구성 결과</strong>
      </div>
      <div class="token-track">
        ${Array.from({ length: 6 }, (_, i) => `<span style="animation-delay:${i * 0.25}s"></span>`).join('')}
      </div>
    </div>
    <canvas id="flow-canvas" width="620" height="180" class="scene-canvas"></canvas>
    <div class="meter-card split">
      <div>
        <span>compression ratio</span>
        <strong>${compression}%</strong>
      </div>
      <div>
        <span>reconstruction drift</span>
        <strong>${vectorDistance(raw, recon).toFixed(2)}</strong>
      </div>
    </div>
    <div class="micro-note">입력의 큰 성분은 code에 남기고, 작은 성분은 덜 정밀하게 복원된다는 흐름을 막대 길이로 보여 줍니다.</div>
  `
  drawFlowCompression(root.querySelector('#flow-canvas').getContext('2d'), root.querySelector('#flow-canvas'), raw, code, recon)
}

function renderBottleneck(root) {
  const spectrum = getSignalSpectrum()
  const k = clamp(state.bottleneckSize, 1, spectrum.length)
  const total = spectrum.reduce((a, b) => a + b, 0)
  const kept = spectrum.slice(0, k).reduce((a, b) => a + b, 0)
  const retained = Math.round((kept / total) * 100)
  const mse = (total - kept) / spectrum.length
  root.innerHTML = `
    <label class="control">
      <span>latent 차원 크기 k: <strong>${k}</strong></span>
      <input type="range" min="1" max="${spectrum.length}" value="${k}" id="bottleneck-range" />
    </label>
    <canvas id="bottleneck-canvas" width="620" height="220" class="scene-canvas"></canvas>
    <div class="meter-card">
      <div>
        <span>보존된 분산 비율</span>
        <strong>${retained}%</strong>
      </div>
      <div>
        <span>선형 reconstruction MSE</span>
        <strong>${mse.toFixed(3)}</strong>
      </div>
    </div>
    <p class="micro-note">작은 k에서는 큰 고유성분만 남고, 버린 분산이 reconstruction error로 남습니다. undercomplete AE의 핵심 압축 직관을 더 직접적으로 보여 줍니다.</p>
  `
  root.querySelector('#bottleneck-range').addEventListener('input', (event) => {
    state.bottleneckSize = Number(event.target.value)
    markInteractionExplored('bottleneck')
    rerender('bottleneck')
  })
  drawBottleneckSpectrum(root.querySelector('#bottleneck-canvas').getContext('2d'), root.querySelector('#bottleneck-canvas'), spectrum, k)
}

function renderArena(root) {
  root.innerHTML = `
    <div class="toggle-group">
      <button class="toggle ${state.arenaMode === 'linear' ? 'active' : ''}" data-mode="linear">Linear / PCA 느낌</button>
      <button class="toggle ${state.arenaMode === 'nonlinear' ? 'active' : ''}" data-mode="nonlinear">Nonlinear AE 느낌</button>
    </div>
    <canvas id="arena-canvas" width="620" height="260" class="scene-canvas" role="img" aria-label="선형 PCA 방식과 비선형 autoencoder 방식의 곡선 데이터 적합 비교"></canvas>
    <p class="micro-note">곡선 데이터는 linear 방식으로는 직선에 눌려 담기고, nonlinear 방식은 더 잘 따라갑니다.</p>
  `
  root.querySelectorAll('.toggle').forEach((button) => {
    button.addEventListener('click', () => {
      state.arenaMode = button.dataset.mode
      markInteractionExplored('arena')
      rerender('arena')
    })
  })

  const canvas = root.querySelector('#arena-canvas')
  const ctx = canvas.getContext('2d')
  drawArena(ctx, canvas.width, canvas.height, state.arenaMode)
}

function drawArena(ctx, width, height, mode) {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, width, height)

  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  for (let x = 0; x <= width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke()
  }

  for (let i = 0; i < 36; i += 1) {
    const t = i / 35
    const x = 60 + t * 500
    const curveY = 180 - Math.sin(t * Math.PI) * 70
    const y = curveY + (Math.sin(i * 2.4) * 12)
    ctx.fillStyle = '#82e9ff'
    ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill()
  }

  ctx.lineWidth = 4
  if (mode === 'linear') {
    ctx.strokeStyle = '#ff7ab8'
    ctx.beginPath(); ctx.moveTo(80, 150); ctx.lineTo(540, 150); ctx.stroke()
    ctx.fillStyle = '#ffd4e9'
    ctx.fillText('직선 subspace', 420, 135)
  } else {
    ctx.strokeStyle = '#a1ff7a'
    ctx.beginPath()
    for (let i = 0; i < 100; i += 1) {
      const t = i / 99
      const x = 60 + t * 500
      const y = 180 - Math.sin(t * Math.PI) * 70
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.fillStyle = '#dbffd0'
    ctx.fillText('휘어진 manifold를 더 잘 따라감', 340, 62)
  }
}

function renderCapacity(root) {
  const complexity = state.datasetVariety / 10
  const capacities = Array.from({ length: 10 }, (_, i) => i + 1)
  const curves = capacities.map((c) => {
    const train = 0.08 + 1.1 * complexity * Math.exp(-0.42 * c)
    const overfit = Math.max(0, c - (2 + complexity * 6)) ** 2 * 0.03
    const test = train + overfit + 0.08 * (1 - complexity)
    return { c, train, test }
  })
  const current = curves[state.capacity - 1]
  root.innerHTML = `
    <label class="control">
      <span>모델 capacity: <strong>${state.capacity}</strong></span>
      <input type="range" min="1" max="10" value="${state.capacity}" id="capacity-range" />
    </label>
    <label class="control">
      <span>데이터 다양성: <strong>${state.datasetVariety}</strong></span>
      <input type="range" min="1" max="10" value="${state.datasetVariety}" id="variety-range" />
    </label>
    <canvas id="capacity-canvas" width="620" height="240" class="scene-canvas"></canvas>
    <div class="meter-card split">
      <div>
        <span>train reconstruction error</span>
        <strong class="safe">${current.train.toFixed(3)}</strong>
      </div>
      <div>
        <span>test/generalization error</span>
        <strong class="danger">${current.test.toFixed(3)}</strong>
      </div>
    </div>
    <div class="warning-board ${current.test - current.train > 0.22 ? 'hot' : ''}">
      ${
        current.test - current.train > 0.22
          ? '⚠️ capacity가 데이터 복잡도보다 너무 커져 test 오차가 다시 올라갑니다.'
          : '✅ 현재 구간에서는 train/test 차이가 비교적 작아 구조 학습 쪽이 더 안정적입니다.'
      }
    </div>
  `
  root.querySelector('#capacity-range').addEventListener('input', (event) => {
    state.capacity = Number(event.target.value)
    markInteractionExplored('capacity')
    rerender('capacity')
  })
  root.querySelector('#variety-range').addEventListener('input', (event) => {
    state.datasetVariety = Number(event.target.value)
    markInteractionExplored('capacity')
    rerender('capacity')
  })
  drawCapacityCurves(root.querySelector('#capacity-canvas').getContext('2d'), root.querySelector('#capacity-canvas'), curves, state.capacity)
}

function renderFamily(root) {
  const descriptions = {
    sparse: { text: '활성 자체를 줄여 선택적 detector를 만들려는 규칙', rec: 0.62, reg: 0.38 },
    denoise: { text: '노이즈가 섞인 입력을 원래 manifold 쪽으로 되돌리는 규칙', rec: 0.78, reg: 0.22 },
    contractive: { text: '입력 변화에 대한 민감도(도함수)를 줄이는 규칙', rec: 0.55, reg: 0.45 },
  }
  root.innerHTML = `
    <div class="family-grid">
      ${['sparse', 'denoise', 'contractive']
        .map(
          (mode) => `
          <button class="family-card ${state.familyMode === mode ? 'active' : ''}" data-mode="${mode}">
            <strong>${mode}</strong>
            <p>${descriptions[mode]}</p>
          </button>`
        )
        .join('')}
    </div>
    <div class="family-output">
      <span>현재 선택</span>
      <strong>${state.familyMode}</strong>
      <p>${descriptions[state.familyMode].text}</p>
    </div>
    <canvas id="family-canvas" width="620" height="180" class="scene-canvas"></canvas>
  `
  root.querySelectorAll('.family-card').forEach((button) => {
    button.addEventListener('click', () => {
      state.familyMode = button.dataset.mode
      markInteractionExplored('family')
      rerender('family')
    })
  })
  drawFamilyObjective(root.querySelector('#family-canvas').getContext('2d'), root.querySelector('#family-canvas'), state.familyMode, descriptions)
}

function renderSparse(root) {
  const lambda = state.sparsity / 100
  const z = [-1.9, -1.2, -0.6, 0.15, 0.55, 1.1, 1.8, 2.4]
  const h = z.map((value) => softThreshold(value, lambda * 1.8))
  const activeCount = h.filter((value) => Math.abs(value) > 1e-6).length
  root.innerHTML = `
    <label class="control">
      <span>sparsity penalty: <strong>${state.sparsity}</strong></span>
      <input type="range" min="0" max="100" value="${state.sparsity}" id="sparse-range" />
    </label>
    <div class="detail-grid">
      <div>
        <p>pre-activation z</p>
        <div class="dot-row">${z.map((value) => `<span class="pill">${value.toFixed(1)}</span>`).join('')}</div>
      </div>
      <div>
        <p>sparse code h</p>
        <div class="dot-row">${h.map((value) => `<span class="pill">${value.toFixed(1)}</span>`).join('')}</div>
      </div>
    </div>
    <div class="meter-card split">
      <div>
        <span>남은 활성 수</span>
        <strong>${activeCount} / ${h.length}</strong>
      </div>
      <div>
        <span>L1 code norm</span>
        <strong>${h.reduce((sum, value) => sum + Math.abs(value), 0).toFixed(2)}</strong>
      </div>
    </div>
    <p class="micro-note">희소성은 단순히 많이 끄는 것이 아니라, 작은 활성은 정확히 깎고 큰 활성만 남기는 shrinkage로 보는 편이 더 정확합니다.</p>
  `
  root.querySelector('#sparse-range').addEventListener('input', (event) => {
    state.sparsity = Number(event.target.value)
    markInteractionExplored('sparse')
    rerender('sparse')
  })
}

function renderStochastic(root) {
  const muX = state.stochasticMuX ?? 0.2
  const muY = state.stochasticMuY ?? -0.1
  const sigma = state.stochasticSigma ?? 0.55
  root.innerHTML = `
    <div class="detail-grid">
      <label class="control">
        <span>μx: <strong>${muX.toFixed(2)}</strong></span>
        <input type="range" min="-120" max="120" value="${Math.round(muX * 100)}" id="stochastic-mux" />
      </label>
      <label class="control">
        <span>μy: <strong>${muY.toFixed(2)}</strong></span>
        <input type="range" min="-120" max="120" value="${Math.round(muY * 100)}" id="stochastic-muy" />
      </label>
      <label class="control">
        <span>σ: <strong>${sigma.toFixed(2)}</strong></span>
        <input type="range" min="5" max="120" value="${Math.round(sigma * 100)}" id="stochastic-sigma" />
      </label>
    </div>
    <canvas id="stochastic-canvas" width="620" height="260" class="scene-canvas"></canvas>
    <button class="ghost-button" id="sample-button">다른 샘플 뽑기</button>
    <p class="micro-note">같은 입력이라도 posterior가 분포라면, 샘플된 latent z는 μ 주변에서 퍼진 cloud로 나타납니다.</p>
  `
  const bind = (selector, key) => {
    root.querySelector(selector).addEventListener('input', (event) => {
      state[key] = Number(event.target.value) / 100
      markInteractionExplored('stochastic')
      rerender('stochastic')
    })
  }
  bind('#stochastic-mux', 'stochasticMuX')
  bind('#stochastic-muy', 'stochasticMuY')
  bind('#stochastic-sigma', 'stochasticSigma')
  root.querySelector('#sample-button').addEventListener('click', () => {
    state.stochasticSeed += 1
    markInteractionExplored('stochastic')
    rerender('stochastic')
  })
  drawStochasticPosterior(root.querySelector('#stochastic-canvas').getContext('2d'), root.querySelector('#stochastic-canvas'), muX, muY, sigma, state.stochasticSeed)
}

function renderDenoise(root) {
  const clean = createPattern(8, 8)
  const noisy = addNoise(clean, state.noise / 100)
  const denoised = smoothPattern(noisy)
  const noisyErr = matrixDistance(clean, noisy)
  const restoredErr = matrixDistance(clean, denoised)
  const diff = clean.map((row, r) => row.map((cell, c) => Number(cell !== denoised[r][c])))
  root.innerHTML = `
    <label class="control">
      <span>noise level: <strong>${state.noise}%</strong></span>
      <input type="range" min="0" max="80" value="${state.noise}" id="noise-range" />
    </label>
    <div class="matrix-grid">
      <div>
        <p>원본</p>
        ${renderMatrix(clean, 'clean')}
      </div>
      <div>
        <p>노이즈 입력</p>
        ${renderMatrix(noisy, 'noisy')}
      </div>
      <div>
        <p>복원 추정</p>
        ${renderMatrix(denoised, 'restored')}
      </div>
    </div>
    <div class="detail-grid">
      <div>
        <p>복원 오차 heatmap</p>
        ${renderMatrix(diff, 'noisy')}
      </div>
      <div class="meter-card split">
        <div>
          <span>noisy error</span>
          <strong>${noisyErr}</strong>
        </div>
        <div>
          <span>restored error</span>
          <strong>${restoredErr}</strong>
        </div>
      </div>
    </div>
    <p class="micro-note">노이즈 입력과 복원 결과를 동시에 비교해 보면, denoising은 단순 블러가 아니라 “원래 구조에 더 가까운 상태”를 찾는 과정이라는 점이 더 잘 드러납니다.</p>
  `
  root.querySelector('#noise-range').addEventListener('input', (event) => {
    state.noise = Number(event.target.value)
    markInteractionExplored('denoise')
    rerender('denoise')
  })
}

function renderScore(root) {
  root.innerHTML = `
    <canvas id="score-canvas" width="620" height="300" class="scene-canvas" role="img" aria-label="노이즈 점이 데이터 밀도 높은 방향으로 되돌아가는 score field 시각화"></canvas>
    <p class="micro-note">파란 점은 데이터가 몰린 영역, 분홍 점은 noisy point입니다. 화살표는 복원이 가리키는 방향을 뜻합니다.</p>
  `
  const canvas = root.querySelector('#score-canvas')
  const ctx = canvas.getContext('2d')
  drawScore(ctx, canvas)
}

function drawScore(ctx, canvas) {
  let point = { x: 510, y: 70 }

  const renderFrame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#07111d'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const centers = [
      { x: 180, y: 170 },
      { x: 340, y: 120 },
      { x: 420, y: 220 },
    ]

    centers.forEach((center, cIndex) => {
      for (let i = 0; i < 14; i += 1) {
        const angle = (i / 14) * Math.PI * 2
        const radius = 22 + ((i + cIndex) % 4) * 7
        ctx.fillStyle = 'rgba(130,233,255,0.9)'
        ctx.beginPath()
        ctx.arc(center.x + Math.cos(angle) * radius, center.y + Math.sin(angle) * radius * 0.6, 3.6, 0, Math.PI * 2)
        ctx.fill()
      }
    })

    const target = centers.reduce((best, center) => {
      const dist = Math.hypot(center.x - point.x, center.y - point.y)
      return dist < best.dist ? { center, dist } : best
    }, { center: centers[0], dist: Infinity }).center

    ctx.strokeStyle = '#ff7ab8'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(point.x, point.y)
    ctx.lineTo(target.x, target.y)
    ctx.stroke()

    const angle = Math.atan2(target.y - point.y, target.x - point.x)
    ctx.beginPath()
    ctx.moveTo(target.x, target.y)
    ctx.lineTo(target.x - Math.cos(angle - 0.4) * 12, target.y - Math.sin(angle - 0.4) * 12)
    ctx.lineTo(target.x - Math.cos(angle + 0.4) * 12, target.y - Math.sin(angle + 0.4) * 12)
    ctx.closePath()
    ctx.fillStyle = '#ff7ab8'
    ctx.fill()

    ctx.fillStyle = '#ffd2e6'
    ctx.beginPath(); ctx.arc(point.x, point.y, 7, 0, Math.PI * 2); ctx.fill()
    ctx.fillText('drag me', point.x + 10, point.y - 10)
  }

  const movePoint = (event) => {
    const rect = canvas.getBoundingClientRect()
    point = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    markInteractionExplored('score')
    renderFrame()
  }

  canvas.addEventListener('pointerdown', () => {
    canvas.addEventListener('pointermove', movePoint)
  })
  canvas.addEventListener('pointerup', () => canvas.removeEventListener('pointermove', movePoint))
  canvas.addEventListener('pointerleave', () => canvas.removeEventListener('pointermove', movePoint))

  renderFrame()
}

function renderManifold(root) {
  const t = state.manifoldT / 100
  const offset = state.manifoldOffset ?? 0.45
  const tangent = manifoldTangentScalar(t)
  const normal = [-tangent[1], tangent[0]]
  const [mx, my] = manifoldPointScalar(t)
  const offPoint = [mx + normal[0] * offset, my + normal[1] * offset]
  root.innerHTML = `
    <label class="control">
      <span>manifold 위 위치: <strong>${state.manifoldT}</strong></span>
      <input type="range" min="0" max="100" value="${state.manifoldT}" id="manifold-range" />
    </label>
    <label class="control">
      <span>off-manifold offset: <strong>${offset.toFixed(2)}</strong></span>
      <input type="range" min="0" max="120" value="${Math.round(offset * 100)}" id="manifold-offset" />
    </label>
    <canvas id="manifold-canvas" width="620" height="260" class="scene-canvas" role="img" aria-label="데이터 manifold 위 점과 tangent 방향 시각화"></canvas>
    <div class="compare-bars">
      <div>
        <span>on-manifold progress</span>
        <div class="bar"><i style="width:${Math.min(100, t * 100)}%"></i></div>
        <strong>${t.toFixed(2)}</strong>
      </div>
      <div>
        <span>normal deviation</span>
        <div class="bar compact"><i style="width:${Math.min(100, offset * 75)}%"></i></div>
        <strong>${Math.hypot(offPoint[0] - mx, offPoint[1] - my).toFixed(2)}</strong>
      </div>
    </div>
    <p class="micro-note">분홍 점은 manifold 위 점, 연한 점은 normal 방향으로 밀어낸 off-manifold 점입니다. 길을 따라 가는 변화와 길을 벗어나는 변화를 함께 비교해 보세요.</p>
  `
  root.querySelector('#manifold-range').addEventListener('input', (event) => {
    state.manifoldT = Number(event.target.value)
    markInteractionExplored('manifold')
    rerender('manifold')
  })
  root.querySelector('#manifold-offset').addEventListener('input', (event) => {
    state.manifoldOffset = Number(event.target.value) / 100
    markInteractionExplored('manifold')
    rerender('manifold')
  })
  const canvas = root.querySelector('#manifold-canvas')
  const ctx = canvas.getContext('2d')
  drawManifold(ctx, canvas, t, offset)
}

function drawManifold(ctx, canvas, t, offset = 0.45) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.lineWidth = 4
  ctx.strokeStyle = '#82e9ff'
  ctx.beginPath()
  for (let i = 0; i < 100; i += 1) {
    const u = i / 99
    const x = 50 + u * 520
    const y = 170 - Math.sin(u * Math.PI * 1.2) * 70 + Math.sin(u * 5) * 8
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.stroke()

  const px = 50 + t * 520
  const py = 170 - Math.sin(t * Math.PI * 1.2) * 70 + Math.sin(t * 5) * 8
  const eps = 0.01
  const qx = 50 + (t + eps) * 520
  const qy = 170 - Math.sin((t + eps) * Math.PI * 1.2) * 70 + Math.sin((t + eps) * 5) * 8
  const dx = qx - px
  const dy = qy - py
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len

  ctx.strokeStyle = '#ffb95c'
  ctx.beginPath()
  ctx.moveTo(px - ux * 60, py - uy * 60)
  ctx.lineTo(px + ux * 60, py + uy * 60)
  ctx.stroke()

  const nx = -uy
  const ny = ux
  ctx.strokeStyle = '#ffc35c'
  ctx.beginPath()
  ctx.moveTo(px, py)
  ctx.lineTo(px + nx * offset * 90, py + ny * offset * 90)
  ctx.stroke()

  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#ffd2e6'
  ctx.beginPath(); ctx.arc(px + nx * offset * 90, py + ny * offset * 90, 6, 0, Math.PI * 2); ctx.fill()
}

function renderContractive(root) {
  const rawChange = Math.round(state.contractiveWobble * 1.3)
  const contracted = Math.round(state.contractiveWobble * 0.42)
  root.innerHTML = `
    <label class="control">
      <span>입력 흔들림 크기: <strong>${state.contractiveWobble}</strong></span>
      <input type="range" min="0" max="80" value="${state.contractiveWobble}" id="contractive-range" />
    </label>
    <div class="compare-bars">
      <div>
        <span>일반 representation 변화</span>
        <div class="bar"><i style="width:${rawChange}%"></i></div>
        <strong>${rawChange}%</strong>
      </div>
      <div>
        <span>contractive representation 변화</span>
        <div class="bar compact"><i style="width:${contracted}%"></i></div>
        <strong>${contracted}%</strong>
      </div>
    </div>
    <p class="micro-note">같은 흔들림에도 code 변화가 더 작아지도록 유도하는 것이 contractive penalty의 감각입니다.</p>
  `
  root.querySelector('#contractive-range').addEventListener('input', (event) => {
    state.contractiveWobble = Number(event.target.value)
    markInteractionExplored('contractive')
    rerender('contractive')
  })
}

function renderPsd(root) {
  const optimization = 72
  const prediction = 19 + (state.psdSteps % 4) * 3
  root.innerHTML = `
    <div class="race-board">
      <div>
        <span>매번 최적화</span>
        <div class="bar long"><i style="width:${optimization}%"></i></div>
        <strong>${optimization} ms</strong>
      </div>
      <div>
        <span>예측 encoder</span>
        <div class="bar speedy"><i style="width:${prediction}%"></i></div>
        <strong>${prediction} ms</strong>
      </div>
    </div>
    <button class="ghost-button" id="race-button">다시 달리기</button>
    <p class="micro-note">표현이 좋아도 너무 느리면 배치에서 쓰기 어렵습니다. PSD는 이 속도 문제를 정면으로 다룹니다.</p>
  `
  root.querySelector('#race-button').addEventListener('click', () => {
    state.psdSteps += 1
    markInteractionExplored('psd')
    rerender('psd')
  })
}

function renderApplications(root) {
  const cards = [
    { type: 'compression', title: '압축', body: '작은 code로 중요한 정보만 저장', metric: 'bits saved', value: 72 },
    { type: 'denoising', title: '노이즈 제거', body: '깨진 입력을 구조적인 원본으로 복원', metric: 'recovery', value: 81 },
    { type: 'retrieval', title: '검색 / hashing', body: '비슷한 샘플을 code 공간에서 빠르게 찾기', metric: 'top-k hit', value: 76 },
    { type: 'representation', title: '표현 학습', body: '다른 다운스트림 작업의 좋은 feature 만들기', metric: 'feature reuse', value: 84 },
  ]
  root.innerHTML = `
    <div class="toggle-group wrap">
      ${['all', 'compression', 'denoising', 'retrieval', 'representation']
        .map(
          (filter) => `
            <button class="toggle ${state.applicationFilter === filter ? 'active' : ''}" data-filter="${filter}">${filter}</button>
          `
        )
        .join('')}
    </div>
    <div class="application-grid">
      ${cards
        .filter((card) => state.applicationFilter === 'all' || state.applicationFilter === card.type)
        .map(
          (card) => `
            <div class="application-card">
              <span>${card.type}</span>
              <strong>${card.title}</strong>
              <p>${card.body}</p>
              <small>${card.metric}: ${card.value}</small>
            </div>
          `
        )
        .join('')}
    </div>
    <p class="micro-note">응용별로 중요한 지표가 다릅니다. autoencoder는 하나의 구조지만 압축/복원/검색/표현학습에서 보는 metric은 서로 다릅니다.</p>
  `
  root.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.applicationFilter = button.dataset.filter
      markInteractionExplored('applications')
      rerender('applications')
    })
  })
}

function clearChallengeTimer() {
  if (challengeTimer) {
    window.clearInterval(challengeTimer)
    challengeTimer = null
  }
  state.challengeRunning = false
}

function getChallengeResult() {
  const config = challengeConfigs[state.challengeDifficulty]
  const filterGap = Math.abs(state.challengeFilter - config.targetFilter)
  const latentGap = Math.abs(state.challengeLatent - config.targetLatent)
  const filterScore = Math.max(0, 44 - filterGap * 1.4)
  const latentScore = Math.max(0, 28 - latentGap * 8)
  const snapScore = state.challengeSnap ? 15 : 0
  const timeScore = Math.round((state.challengeTimeLeft / config.duration) * 13)
  const overfitRisk = Math.max(
    0,
    Math.round(state.challengeLatent * 7 - state.challengeFilter * 0.16 - (state.challengeSnap ? 10 : 0))
  )
  const riskPenalty = Math.min(24, overfitRisk)
  const score = clamp(Math.round(filterScore + latentScore + snapScore + timeScore - riskPenalty), 0, 100)
  const stars = score >= 94 ? 3 : score >= 85 ? 2 : score >= 72 ? 1 : 0

  let message = '조금 더 구조를 살리려면 noise filter와 latent size의 균형을 다시 잡아 보세요.'
  if (overfitRisk > 18) {
    message = 'latent size가 커서 거의 외우는 방향으로 가고 있어요. 조금 더 압축해 보세요.'
  } else if (filterGap > 9) {
    message = 'noise filter를 목표 구간에 더 가깝게 맞추면 reconstruction score가 크게 올라갑니다.'
  } else if (!state.challengeSnap) {
    message = 'manifold snap을 켜면 데이터가 있을 법한 구조 쪽으로 더 잘 붙잡을 수 있어요.'
  } else if (score >= 85) {
    message = '훌륭해요! 압축과 복원의 균형을 잘 잡았습니다.'
  }

  return {
    config,
    score,
    stars,
    overfitRisk,
    filterScore,
    latentScore,
    snapScore,
    timeScore,
    message,
  }
}

function finishChallenge(root, reason = 'timeout') {
  const result = getChallengeResult()
  clearChallengeTimer()
  state.challengeLastScore = result.score
  state.challengeBest[state.challengeDifficulty] = Math.max(
    state.challengeBest[state.challengeDifficulty],
    result.score
  )
  state.challengeBadge = result.score >= 85 ? result.config.badge : 'Retry Trainee'
  state.challengeMessage =
    reason === 'success'
      ? `미션 성공! ${result.config.badge} 배지를 획득했습니다.`
      : `${result.message} 다시 도전해서 ${result.config.badge}를 노려보세요.`
  updateMissionBoard()
  rerender('challenge')
}

function renderChallenge(root) {
  const { config, score, stars, overfitRisk, filterScore, latentScore, snapScore, timeScore, message } = getChallengeResult()
  const best = state.challengeBest[state.challengeDifficulty]

  root.innerHTML = `
    <div class="challenge-shell">
      <div class="toggle-group wrap">
        ${Object.keys(challengeConfigs)
          .map(
            (difficulty) => `
              <button class="toggle ${state.challengeDifficulty === difficulty ? 'active' : ''}" data-difficulty="${difficulty}">
                ${difficulty}
              </button>
            `
          )
          .join('')}
      </div>
      <div class="challenge-hud">
        <div class="challenge-stat">
          <span>남은 시간</span>
          <strong>${state.challengeTimeLeft}s</strong>
        </div>
        <div class="challenge-stat">
          <span>현재 점수</span>
          <strong>${score}</strong>
        </div>
        <div class="challenge-stat">
          <span>최고 점수</span>
          <strong>${best}</strong>
        </div>
        <div class="challenge-stat">
          <span>배지</span>
          <strong>${state.challengeBadge}</strong>
        </div>
      </div>
      <div class="challenge-stars" aria-label="star rating">
        ${Array.from({ length: 3 }, (_, index) => `<span class="${index < stars ? 'lit' : ''}">★</span>`).join('')}
      </div>
      <div class="challenge-grid">
        <div class="challenge-panel">
          <label class="control">
            <span>noise filter: <strong>${state.challengeFilter}</strong></span>
            <input type="range" min="30" max="90" value="${state.challengeFilter}" id="challenge-filter" />
          </label>
          <label class="control">
            <span>latent size: <strong>${state.challengeLatent}</strong></span>
            <input type="range" min="1" max="8" value="${state.challengeLatent}" id="challenge-latent" />
          </label>
          <label class="challenge-toggle">
            <input type="checkbox" id="challenge-snap" ${state.challengeSnap ? 'checked' : ''} />
            <span>manifold snap 켜기</span>
          </label>
          <div class="challenge-actions">
            <button class="ghost-button" id="challenge-start" ${state.challengeRunning ? 'disabled' : ''}>
              ${state.challengeRunning ? '진행 중...' : '미션 시작'}
            </button>
            <button class="ghost-button" id="challenge-reset">리셋</button>
          </div>
        </div>
        <div class="challenge-panel">
          <div class="challenge-target">
            <span>목표 설정</span>
            <strong>${config.badge}</strong>
            <p>filter를 ${config.targetFilter} 근처로 맞추고, latent size를 ${config.targetLatent} 근처로 유지하면서 구조를 살리세요.</p>
          </div>
          <canvas id="challenge-canvas" width="320" height="150" class="scene-canvas"></canvas>
          <div class="compare-bars">
            <div>
              <span>구조 보존 점수</span>
              <div class="bar"><i style="width:${score}%"></i></div>
              <strong>${score}%</strong>
            </div>
            <div>
              <span>외우기 위험</span>
              <div class="bar compact"><i style="width:${clamp(overfitRisk, 0, 100)}%"></i></div>
              <strong>${overfitRisk}%</strong>
            </div>
          </div>
          <div class="detail-grid">
            <div class="application-card"><span>filter fit</span><strong>${filterScore.toFixed(0)}</strong></div>
            <div class="application-card"><span>latent fit</span><strong>${latentScore.toFixed(0)}</strong></div>
            <div class="application-card"><span>snap bonus</span><strong>${snapScore.toFixed(0)}</strong></div>
            <div class="application-card"><span>time bonus</span><strong>${timeScore.toFixed(0)}</strong></div>
          </div>
          <p class="challenge-message">${state.challengeRunning ? message : state.challengeMessage}</p>
        </div>
      </div>
    </div>
  `
  drawChallengeGuide(root.querySelector('#challenge-canvas').getContext('2d'), root.querySelector('#challenge-canvas'), state.challengeFilter, state.challengeLatent, config)

  root.querySelectorAll('[data-difficulty]').forEach((button) => {
    button.addEventListener('click', () => {
      clearChallengeTimer()
      state.challengeDifficulty = button.dataset.difficulty
      state.challengeTimeLeft = challengeConfigs[state.challengeDifficulty].duration
      state.challengeLastScore = null
      state.challengeBadge = 'Warm-up'
      state.challengeMessage = '새 난이도에서 구조를 가장 잘 살리는 조합을 찾아보세요.'
      rerender('challenge')
    })
  })

  root.querySelector('#challenge-filter').addEventListener('input', (event) => {
    state.challengeFilter = Number(event.target.value)
    markInteractionExplored('challenge')
    if (state.challengeRunning && getChallengeResult().score >= 85) finishChallenge(root, 'success')
    else rerender('challenge')
  })

  root.querySelector('#challenge-latent').addEventListener('input', (event) => {
    state.challengeLatent = Number(event.target.value)
    markInteractionExplored('challenge')
    if (state.challengeRunning && getChallengeResult().score >= 85) finishChallenge(root, 'success')
    else rerender('challenge')
  })

  root.querySelector('#challenge-snap').addEventListener('change', (event) => {
    state.challengeSnap = event.target.checked
    markInteractionExplored('challenge')
    if (state.challengeRunning && getChallengeResult().score >= 85) finishChallenge(root, 'success')
    else rerender('challenge')
  })

  root.querySelector('#challenge-start').addEventListener('click', () => {
    if (state.challengeRunning) return
    const nextConfig = challengeConfigs[state.challengeDifficulty]
    state.challengeRunning = true
    state.challengeTimeLeft = nextConfig.duration
    state.challengeMessage = '시간 안에 구조 보존 점수 85 이상을 만들어 보세요.'
    markInteractionExplored('challenge')
    rerender('challenge')
    clearChallengeTimer()
    state.challengeRunning = true
    challengeTimer = window.setInterval(() => {
      if (state.challengeTimeLeft <= 1) {
        state.challengeTimeLeft = 0
        finishChallenge(root, 'timeout')
        return
      }
      state.challengeTimeLeft -= 1
      rerender('challenge')
    }, 1000)
  })

  root.querySelector('#challenge-reset').addEventListener('click', () => {
    clearChallengeTimer()
    state.challengeTimeLeft = config.duration
    state.challengeFilter = config.targetFilter
    state.challengeLatent = config.targetLatent
    state.challengeSnap = true
    state.challengeLastScore = null
    state.challengeBadge = 'Warm-up'
    state.challengeMessage = '기본값으로 되돌렸습니다. 이제 점수를 더 끌어올려 보세요.'
    rerender('challenge')
  })
}

function renderQuiz(root) {
  const correct = quizItems.reduce((count, item) => count + Number(state.quizAnswers[item.id] === item.answer), 0)
  root.innerHTML = `
    <div class="quiz-score">현재 점수: <strong>${correct} / ${quizItems.length}</strong></div>
    <div class="quiz-list">
      ${quizItems
        .map(
          (item) => `
          <div class="quiz-card">
            <h5>${item.question}</h5>
            <div class="quiz-options">
              ${item.options
                .map(
                  (option, index) => `
                    <button class="quiz-option ${state.quizAnswers[item.id] === index ? 'selected' : ''}" data-qid="${item.id}" data-index="${index}">${option}</button>
                  `
                )
                .join('')}
            </div>
            ${
              item.id in state.quizAnswers
                ? `<p class="quiz-feedback ${state.quizAnswers[item.id] === item.answer ? 'good' : 'bad'}">${
                    state.quizAnswers[item.id] === item.answer
                      ? '정답! 핵심 제약을 잘 잡았습니다.'
                      : `아직 헷갈렸어요. 정답은 "${item.options[item.answer]}" 입니다.`
                  }</p>`
                : ''
            }
          </div>
        `
        )
        .join('')}
    </div>
  `
  root.querySelectorAll('.quiz-option').forEach((button) => {
    button.addEventListener('click', () => {
      state.quizAnswers[button.dataset.qid] = Number(button.dataset.index)
      markInteractionExplored('quiz')
      updateMissionBoard()
      rerender('quiz')
    })
  })
}

function renderDots(total, active) {
  return Array.from({ length: total }, (_, index) => `<span class="dim-dot ${index < active ? 'on' : ''}"></span>`).join('')
}

function createPattern(rows, cols) {
  const matrix = []
  for (let r = 0; r < rows; r += 1) {
    const row = []
    for (let c = 0; c < cols; c += 1) {
      const isBorder = r === 1 || r === rows - 2 || c === 1 || c === cols - 2
      const isEye = (r === 2 && (c === 2 || c === cols - 3))
      const isSmile = r === rows - 3 && c > 1 && c < cols - 2
      row.push(Number((isBorder && !isSmile) || isEye || isSmile))
    }
    matrix.push(row)
  }
  return matrix
}

function addNoise(matrix, level) {
  return matrix.map((row, r) =>
    row.map((cell, c) => {
      const seed = ((r + 1) * 17 + (c + 3) * 19 + state.noise * 13) % 100
      return seed / 100 < level ? 1 - cell : cell
    })
  )
}

function smoothPattern(matrix) {
  return matrix.map((row, r) =>
    row.map((cell, c) => {
      let total = 0
      let count = 0
      for (let dr = -1; dr <= 1; dr += 1) {
        for (let dc = -1; dc <= 1; dc += 1) {
          const rr = r + dr
          const cc = c + dc
          if (matrix[rr]?.[cc] !== undefined) {
            total += matrix[rr][cc]
            count += 1
          }
        }
      }
      return Number(total / count >= 0.45)
    })
  )
}

function renderMatrix(matrix, variant) {
  return `
    <div class="matrix ${variant}">
      ${matrix
        .flatMap((row) => row)
        .map((cell) => `<span class="pixel ${cell ? 'on' : ''}"></span>`)
        .join('')}
    </div>
  `
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function renderLinearProjection(root) {
  const points = createProjectionDataset()
  const angle = (state.projectionAngle ?? 32) * (Math.PI / 180)
  const bestAngle = computePrincipalAngle(points)
  const mse = computeProjectionMSE(points, angle)
  const bestMse = computeProjectionMSE(points, bestAngle)

  root.innerHTML = `
    <label class="control">
      <span>subspace angle: <strong>${Math.round(state.projectionAngle ?? 32)}°</strong></span>
      <input type="range" min="0" max="180" value="${state.projectionAngle ?? 32}" id="projection-angle" />
    </label>
    <canvas id="projection-canvas" width="620" height="280" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>현재 projection MSE</span>
        <div class="bar"><i style="width:${Math.min(100, mse * 180)}%"></i></div>
        <strong>${mse.toFixed(3)}</strong>
      </div>
      <div>
        <span>best PCA-like MSE</span>
        <div class="bar compact"><i style="width:${Math.min(100, bestMse * 180)}%"></i></div>
        <strong>${bestMse.toFixed(3)}</strong>
      </div>
    </div>
    <p class="micro-note">분홍 선은 현재 선택한 1차원 subspace, 라임 선은 covariance에서 계산한 최적 축입니다.</p>
  `

  root.querySelector('#projection-angle').addEventListener('input', (event) => {
    state.projectionAngle = Number(event.target.value)
    markInteractionExplored('linearProjection')
    rerender('linearProjection')
  })

  const canvas = root.querySelector('#projection-canvas')
  drawProjection(canvas.getContext('2d'), canvas, points, angle, bestAngle)
}

function drawProjection(ctx, canvas, points, angle, bestAngle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const center = { x: canvas.width / 2, y: canvas.height / 2 }

  const drawLine = (theta, color, label) => {
    const dx = Math.cos(theta)
    const dy = Math.sin(theta)
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(center.x - dx * 260, center.y + dy * 260)
    ctx.lineTo(center.x + dx * 260, center.y - dy * 260)
    ctx.stroke()
    ctx.fillStyle = color
    ctx.fillText(label, center.x + dx * 110, center.y - dy * 110)
  }

  drawLine(bestAngle, '#a1ff7a', 'best axis')
  drawLine(angle, '#ff7ab8', 'current axis')

  const w = [Math.cos(angle), Math.sin(angle)]
  for (const [x, y] of points) {
    const px = center.x + x * 80
    const py = center.y - y * 80
    const h = x * w[0] + y * w[1]
    const rx = h * w[0]
    const ry = h * w[1]
    const prx = center.x + rx * 80
    const pry = center.y - ry * 80
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'
    ctx.beginPath()
    ctx.moveTo(px, py)
    ctx.lineTo(prx, pry)
    ctx.stroke()
    ctx.fillStyle = '#82e9ff'
    ctx.beginPath()
    ctx.arc(px, py, 3.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#ffc35c'
    ctx.beginPath()
    ctx.arc(prx, pry, 2.2, 0, Math.PI * 2)
    ctx.fill()
  }
}

function renderScoreAccurate(root) {
  root.innerHTML = `
    <label class="control">
      <span>gaussian sigma: <strong>${(state.scoreSigma ?? 0.9).toFixed(2)}</strong></span>
      <input type="range" min="40" max="160" value="${Math.round((state.scoreSigma ?? 0.9) * 100)}" id="score-sigma" />
    </label>
    <canvas id="score-accurate-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <div class="challenge-actions">
      <button class="ghost-button" id="score-step">한 걸음 이동</button>
      <button class="ghost-button" id="score-reset">점 위치 리셋</button>
    </div>
    <p class="micro-note">이 벡터는 nearest-center heuristic이 아니라, 가우시안 혼합분포의 실제 score ∇log p(x)를 계산합니다.</p>
  `

  root.querySelector('#score-sigma').addEventListener('input', (event) => {
    state.scoreSigma = Number(event.target.value) / 100
    markInteractionExplored('scoreAccurate')
    rerender('scoreAccurate')
  })

  root.querySelector('#score-step').addEventListener('click', () => {
    const score = gaussianMixtureScore(
      state.scoreAccuratePointX ?? 1.9,
      state.scoreAccuratePointY ?? -1.4,
      state.scoreSigma ?? 0.9
    )
    state.scoreAccuratePointX = clamp((state.scoreAccuratePointX ?? 1.9) + score[0] * 0.18, -3.2, 3.2)
    state.scoreAccuratePointY = clamp((state.scoreAccuratePointY ?? -1.4) + score[1] * 0.18, -2.3, 2.3)
    markInteractionExplored('scoreAccurate')
    rerender('scoreAccurate')
  })

  root.querySelector('#score-reset').addEventListener('click', () => {
    state.scoreAccuratePointX = 1.9
    state.scoreAccuratePointY = -1.4
    rerender('scoreAccurate')
  })

  const canvas = root.querySelector('#score-accurate-canvas')
  drawAccurateScore(canvas.getContext('2d'), canvas)
}

function drawAccurateScore(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const centers = getMixtureCenters()
  const sigma = state.scoreSigma ?? 0.9
  const sx = canvas.width / 7
  const sy = canvas.height / 5
  const toCanvas = (x, y) => [canvas.width / 2 + x * sx, canvas.height / 2 - y * sy]

  for (let gx = -3; gx <= 3; gx += 0.6) {
    for (let gy = -2.2; gy <= 2.2; gy += 0.6) {
      const [vx, vy] = gaussianMixtureScore(gx, gy, sigma)
      const [cx, cy] = toCanvas(gx, gy)
      const scale = 14
      ctx.strokeStyle = 'rgba(130,233,255,0.55)'
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + vx * scale, cy - vy * scale)
      ctx.stroke()
    }
  }

  centers.forEach(([x, y]) => {
    const [cx, cy] = toCanvas(x, y)
    ctx.fillStyle = '#a1ff7a'
    ctx.beginPath()
    ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fill()
  })

  const px = state.scoreAccuratePointX ?? 1.9
  const py = state.scoreAccuratePointY ?? -1.4
  const [cx, cy] = toCanvas(px, py)
  const [vx, vy] = gaussianMixtureScore(px, py, sigma)
  ctx.strokeStyle = '#ff7ab8'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + vx * 28, cy - vy * 28)
  ctx.stroke()
  ctx.fillStyle = '#ffd2e6'
  ctx.beginPath()
  ctx.arc(cx, cy, 7, 0, Math.PI * 2)
  ctx.fill()
}

function renderJacobianLab(root) {
  const x = state.jacobianX ?? 0.5
  const y = state.jacobianY ?? -0.4
  const scale = state.jacobianScale ?? 1.2
  const norm = jacobianFrobenius(x, y, scale)

  root.innerHTML = `
    <label class="control">
      <span>weight scale: <strong>${scale.toFixed(2)}</strong></span>
      <input type="range" min="50" max="220" value="${Math.round(scale * 100)}" id="jacobian-scale" />
    </label>
    <canvas id="jacobian-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>||J_f(x)||_F</span>
        <div class="bar"><i style="width:${Math.min(100, norm * 28)}%"></i></div>
        <strong>${norm.toFixed(3)}</strong>
      </div>
      <div>
        <span>contractive strength</span>
        <div class="bar compact"><i style="width:${Math.max(0, 100 - norm * 28)}%"></i></div>
        <strong>${Math.max(0, 100 - norm * 28).toFixed(1)}%</strong>
      </div>
    </div>
    <p class="micro-note">색이 밝을수록 local sensitivity가 큽니다. tanh saturation 구간에 들어가면 Jacobian norm이 줄어듭니다.</p>
  `

  root.querySelector('#jacobian-scale').addEventListener('input', (event) => {
    state.jacobianScale = Number(event.target.value) / 100
    markInteractionExplored('jacobianLab')
    rerender('jacobianLab')
  })

  const canvas = root.querySelector('#jacobian-canvas')
  drawJacobian(canvas.getContext('2d'), canvas)
  canvas.addEventListener('pointerdown', (event) => {
    const rect = canvas.getBoundingClientRect()
    state.jacobianX = ((event.clientX - rect.left) - canvas.width / 2) / (canvas.width / 6)
    state.jacobianY = (canvas.height / 2 - (event.clientY - rect.top)) / (canvas.height / 4)
    markInteractionExplored('jacobianLab')
    rerender('jacobianLab')
  })
}

function drawJacobian(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 6
  const sy = canvas.height / 4
  const scale = state.jacobianScale ?? 1.2

  for (let gx = -2.8; gx <= 2.8; gx += 0.35) {
    for (let gy = -1.8; gy <= 1.8; gy += 0.35) {
      const norm = jacobianFrobenius(gx, gy, scale)
      const alpha = Math.min(0.75, norm / 4.5)
      ctx.fillStyle = `rgba(255, 195, 92, ${alpha})`
      ctx.fillRect(canvas.width / 2 + gx * sx, canvas.height / 2 - gy * sy, 10, 10)
    }
  }

  const x = state.jacobianX ?? 0.5
  const y = state.jacobianY ?? -0.4
  const px = canvas.width / 2 + x * sx
  const py = canvas.height / 2 - y * sy
  const J = encoderJacobian(x, y, scale)
  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(px, py)
  ctx.lineTo(px + J[0][0] * 22, py - J[1][0] * 22)
  ctx.stroke()
  ctx.strokeStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.moveTo(px, py)
  ctx.lineTo(px + J[0][1] * 22, py - J[1][1] * 22)
  ctx.stroke()
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(px, py, 7, 0, Math.PI * 2)
  ctx.fill()
}

function createProjectionDataset() {
  const points = []
  for (let i = 0; i < 42; i += 1) {
    const t = (i / 41) * Math.PI * 2
    const x = 1.35 * Math.cos(t) + 0.45 * Math.sin(2 * t)
    const y = 0.45 * Math.sin(t) + 0.18 * Math.cos(3 * t)
    points.push([x, y])
  }
  return points
}

function computePrincipalAngle(points) {
  const n = points.length
  let sxx = 0
  let syy = 0
  let sxy = 0
  for (const [x, y] of points) {
    sxx += x * x
    syy += y * y
    sxy += x * y
  }
  sxx /= n
  syy /= n
  sxy /= n
  return 0.5 * Math.atan2(2 * sxy, sxx - syy)
}

function computeProjectionMSE(points, theta) {
  const w = [Math.cos(theta), Math.sin(theta)]
  let total = 0
  for (const [x, y] of points) {
    const h = x * w[0] + y * w[1]
    const rx = h * w[0]
    const ry = h * w[1]
    total += (x - rx) ** 2 + (y - ry) ** 2
  }
  return total / points.length
}

function getMixtureCenters() {
  return [
    [-1.2, 0.8],
    [0.8, 1.0],
    [1.4, -1.0],
  ]
}

function gaussianMixtureScore(x, y, sigma) {
  const centers = getMixtureCenters()
  const var2 = sigma * sigma
  let total = 0
  let sx = 0
  let sy = 0
  for (const [mx, my] of centers) {
    const dx = x - mx
    const dy = y - my
    const weight = Math.exp(-(dx * dx + dy * dy) / (2 * var2))
    total += weight
    sx += weight * ((mx - x) / var2)
    sy += weight * ((my - y) / var2)
  }
  return total === 0 ? [0, 0] : [sx / total, sy / total]
}

function encoderJacobian(x, y, scale) {
  const W = [
    [1.2 * scale, -0.4 * scale],
    [0.6 * scale, 0.9 * scale],
  ]
  const z1 = W[0][0] * x + W[0][1] * y
  const z2 = W[1][0] * x + W[1][1] * y
  const d1 = 1 - Math.tanh(z1) ** 2
  const d2 = 1 - Math.tanh(z2) ** 2
  return [
    [d1 * W[0][0], d1 * W[0][1]],
    [d2 * W[1][0], d2 * W[1][1]],
  ]
}

function jacobianFrobenius(x, y, scale) {
  const J = encoderJacobian(x, y, scale)
  return Math.sqrt(J[0][0] ** 2 + J[0][1] ** 2 + J[1][0] ** 2 + J[1][1] ** 2)
}

function renderSparseThreshold(root) {
  const lambda = state.sparseLambda ?? 0.7
  const z = [-1.8, -1.1, -0.5, 0.3, 0.9, 1.6, 2.1]
  const h = z.map((value) => softThreshold(value, lambda))

  root.innerHTML = `
    <label class="control">
      <span>lambda: <strong>${lambda.toFixed(2)}</strong></span>
      <input type="range" min="0" max="160" value="${Math.round(lambda * 100)}" id="sparse-lambda" />
    </label>
    <div class="compare-bars">
      <div>
        <span>pre-activation z</span>
        <div class="dot-row">${z.map((value) => `<span class="pill">${value.toFixed(1)}</span>`).join('')}</div>
      </div>
      <div>
        <span>soft-threshold h = sign(z) max(|z|-λ, 0)</span>
        <div class="dot-row">${h.map((value) => `<span class="pill">${value.toFixed(1)}</span>`).join('')}</div>
      </div>
    </div>
    <p class="micro-note">lambda가 커질수록 작은 activation이 정확히 0이 되고, 큰 activation만 살아남습니다.</p>
  `

  root.querySelector('#sparse-lambda').addEventListener('input', (event) => {
    state.sparseLambda = Number(event.target.value) / 100
    markInteractionExplored('sparseThreshold')
    rerender('sparseThreshold')
  })
}

function renderIstaLab(root) {
  const lambda = state.istaLambda ?? 0.22
  const eta = state.istaEta ?? 0.45
  const h = state.istaH ?? [0, 0]
  const x = [1.15, 0.92]
  const D = [
    [1.0, 0.55],
    [0.0, 0.83],
  ]
  const recon = multiplyMatVec(D, h)
  const residual = [recon[0] - x[0], recon[1] - x[1]]
  const residualNorm = Math.hypot(...residual)

  root.innerHTML = `
    <label class="control">
      <span>lambda: <strong>${lambda.toFixed(2)}</strong></span>
      <input type="range" min="0" max="80" value="${Math.round(lambda * 100)}" id="ista-lambda" />
    </label>
    <label class="control">
      <span>step size η: <strong>${eta.toFixed(2)}</strong></span>
      <input type="range" min="5" max="90" value="${Math.round(eta * 100)}" id="ista-eta" />
    </label>
    <canvas id="ista-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="challenge-actions">
      <button class="ghost-button" id="ista-step">1 step</button>
      <button class="ghost-button" id="ista-ten">10 steps</button>
      <button class="ghost-button" id="ista-reset">reset</button>
    </div>
    <div class="compare-bars">
      <div>
        <span>coefficients h</span>
        <div class="dot-row"><span class="pill">h1=${h[0].toFixed(2)}</span><span class="pill">h2=${h[1].toFixed(2)}</span></div>
      </div>
      <div>
        <span>residual norm</span>
        <div class="bar"><i style="width:${Math.min(100, residualNorm * 45)}%"></i></div>
        <strong>${residualNorm.toFixed(3)}</strong>
      </div>
    </div>
  `

  root.querySelector('#ista-lambda').addEventListener('input', (event) => {
    state.istaLambda = Number(event.target.value) / 100
    markInteractionExplored('istaLab')
    rerender('istaLab')
  })
  root.querySelector('#ista-eta').addEventListener('input', (event) => {
    state.istaEta = Number(event.target.value) / 100
    markInteractionExplored('istaLab')
    rerender('istaLab')
  })
  root.querySelector('#ista-step').addEventListener('click', () => {
    stepIsta(1)
    markInteractionExplored('istaLab')
    rerender('istaLab')
  })
  root.querySelector('#ista-ten').addEventListener('click', () => {
    stepIsta(10)
    markInteractionExplored('istaLab')
    rerender('istaLab')
  })
  root.querySelector('#ista-reset').addEventListener('click', () => {
    state.istaH = [0, 0]
    rerender('istaLab')
  })

  const canvas = root.querySelector('#ista-canvas')
  drawIsta(canvas.getContext('2d'), canvas, D, x, h, recon)
}

function renderLangevinLab(root) {
  const stepSize = state.langevinStepSize ?? 0.18
  const noiseScale = state.langevinNoiseScale ?? 0.08
  const sigma = state.scoreSigma ?? 0.9
  const score = gaussianMixtureScore(state.langevinX ?? 2.1, state.langevinY ?? -1.2, sigma)

  root.innerHTML = `
    <label class="control">
      <span>step size η: <strong>${stepSize.toFixed(2)}</strong></span>
      <input type="range" min="5" max="45" value="${Math.round(stepSize * 100)}" id="langevin-step" />
    </label>
    <label class="control">
      <span>noise scale: <strong>${noiseScale.toFixed(2)}</strong></span>
      <input type="range" min="0" max="25" value="${Math.round(noiseScale * 100)}" id="langevin-noise" />
    </label>
    <canvas id="langevin-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <div class="challenge-actions">
      <button class="ghost-button" id="langevin-once">1 step</button>
      <button class="ghost-button" id="langevin-ten">10 steps</button>
      <button class="ghost-button" id="langevin-reset">reset</button>
    </div>
    <p class="micro-note">현재 score = (${score[0].toFixed(2)}, ${score[1].toFixed(2)}). 업데이트는 x ← x + η∇log p(x) + √(2η)ξ 로 근사합니다.</p>
  `

  root.querySelector('#langevin-step').addEventListener('input', (event) => {
    state.langevinStepSize = Number(event.target.value) / 100
    markInteractionExplored('langevinLab')
    rerender('langevinLab')
  })
  root.querySelector('#langevin-noise').addEventListener('input', (event) => {
    state.langevinNoiseScale = Number(event.target.value) / 100
    markInteractionExplored('langevinLab')
    rerender('langevinLab')
  })
  root.querySelector('#langevin-once').addEventListener('click', () => {
    stepLangevin(1)
    markInteractionExplored('langevinLab')
    rerender('langevinLab')
  })
  root.querySelector('#langevin-ten').addEventListener('click', () => {
    stepLangevin(10)
    markInteractionExplored('langevinLab')
    rerender('langevinLab')
  })
  root.querySelector('#langevin-reset').addEventListener('click', () => {
    state.langevinX = 2.1
    state.langevinY = -1.2
    rerender('langevinLab')
  })

  const canvas = root.querySelector('#langevin-canvas')
  drawLangevin(canvas.getContext('2d'), canvas, sigma)
}

function drawLangevin(ctx, canvas, sigma) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 7
  const sy = canvas.height / 5
  const toCanvas = (x, y) => [canvas.width / 2 + x * sx, canvas.height / 2 - y * sy]

  getMixtureCenters().forEach(([x, y]) => {
    const [cx, cy] = toCanvas(x, y)
    ctx.fillStyle = '#a1ff7a'
    ctx.beginPath()
    ctx.arc(cx, cy, 8 + sigma * 2, 0, Math.PI * 2)
    ctx.fill()
  })

  const x = state.langevinX ?? 2.1
  const y = state.langevinY ?? -1.2
  const [cx, cy] = toCanvas(x, y)
  const [vx, vy] = gaussianMixtureScore(x, y, sigma)
  ctx.strokeStyle = '#ff7ab8'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + vx * 30, cy - vy * 30)
  ctx.stroke()
  ctx.fillStyle = '#ffd2e6'
  ctx.beginPath()
  ctx.arc(cx, cy, 7, 0, Math.PI * 2)
  ctx.fill()
}

function stepLangevin(times) {
  const eta = state.langevinStepSize ?? 0.18
  const noise = state.langevinNoiseScale ?? 0.08
  const sigma = state.scoreSigma ?? 0.9
  let x = state.langevinX ?? 2.1
  let y = state.langevinY ?? -1.2

  for (let i = 0; i < times; i += 1) {
    const [sx, sy] = gaussianMixtureScore(x, y, sigma)
    const jitterX = noise * Math.sin(i + x * 1.7)
    const jitterY = noise * Math.cos(i + y * 1.3)
    x = clamp(x + eta * sx + Math.sqrt(2 * eta) * jitterX, -3.2, 3.2)
    y = clamp(y + eta * sy + Math.sqrt(2 * eta) * jitterY, -2.3, 2.3)
  }

  state.langevinX = x
  state.langevinY = y
}

function renderTangentLab(root) {
  const t = (state.tangentT ?? 45) / 100
  const angle = ((state.tangentAngle ?? 40) * Math.PI) / 180
  const magnitude = state.tangentMagnitude ?? 1.2
  const tangent = manifoldTangent(t)
  const perturbation = [Math.cos(angle) * magnitude, Math.sin(angle) * magnitude]
  const tangentComponent = tangent[0] * perturbation[0] + tangent[1] * perturbation[1]
  const normal = [-tangent[1], tangent[0]]
  const normalComponent = normal[0] * perturbation[0] + normal[1] * perturbation[1]

  root.innerHTML = `
    <label class="control">
      <span>curve position t: <strong>${t.toFixed(2)}</strong></span>
      <input type="range" min="5" max="95" value="${state.tangentT ?? 45}" id="tangent-t" />
    </label>
    <label class="control">
      <span>perturbation angle: <strong>${state.tangentAngle ?? 40}°</strong></span>
      <input type="range" min="-180" max="180" value="${state.tangentAngle ?? 40}" id="tangent-angle" />
    </label>
    <canvas id="tangent-canvas" width="620" height="280" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>tangent component</span>
        <div class="bar"><i style="width:${Math.min(100, Math.abs(tangentComponent) * 30)}%"></i></div>
        <strong>${tangentComponent.toFixed(2)}</strong>
      </div>
      <div>
        <span>normal component</span>
        <div class="bar compact"><i style="width:${Math.min(100, Math.abs(normalComponent) * 30)}%"></i></div>
        <strong>${normalComponent.toFixed(2)}</strong>
      </div>
    </div>
    <p class="micro-note">manifold 학습은 보통 tangent 쪽 변화는 보존하고, normal 쪽 변화는 더 강하게 줄이려는 방향으로 이해할 수 있습니다.</p>
  `

  root.querySelector('#tangent-t').addEventListener('input', (event) => {
    state.tangentT = Number(event.target.value)
    markInteractionExplored('tangentLab')
    rerender('tangentLab')
  })
  root.querySelector('#tangent-angle').addEventListener('input', (event) => {
    state.tangentAngle = Number(event.target.value)
    markInteractionExplored('tangentLab')
    rerender('tangentLab')
  })

  const canvas = root.querySelector('#tangent-canvas')
  drawTangent(canvas.getContext('2d'), canvas, t, perturbation, tangent, normal)
}

function drawTangent(ctx, canvas, t, perturbation, tangent, normal) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 4
  ctx.beginPath()
  for (let i = 0; i < 100; i += 1) {
    const u = i / 99
    const [x, y] = manifoldPoint(u)
    const cx = 50 + x * 90
    const cy = canvas.height / 2 - y * 80
    if (i === 0) ctx.moveTo(cx, cy)
    else ctx.lineTo(cx, cy)
  }
  ctx.stroke()

  const [pxRaw, pyRaw] = manifoldPoint(t)
  const px = 50 + pxRaw * 90
  const py = canvas.height / 2 - pyRaw * 80

  ctx.strokeStyle = '#a1ff7a'
  ctx.beginPath()
  ctx.moveTo(px - tangent[0] * 70, py + tangent[1] * 70)
  ctx.lineTo(px + tangent[0] * 70, py - tangent[1] * 70)
  ctx.stroke()

  ctx.strokeStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.moveTo(px - normal[0] * 50, py + normal[1] * 50)
  ctx.lineTo(px + normal[0] * 50, py - normal[1] * 50)
  ctx.stroke()

  ctx.strokeStyle = '#ffc35c'
  ctx.beginPath()
  ctx.moveTo(px, py)
  ctx.lineTo(px + perturbation[0] * 40, py - perturbation[1] * 40)
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(px, py, 7, 0, Math.PI * 2)
  ctx.fill()
}

function renderLossLandscapeLab(root) {
  const points = createProjectionDataset()
  const theta = ((state.landscapeTheta ?? 32) * Math.PI) / 180
  const lambda = state.landscapeLambda ?? 0.28
  const value = sparseProjectionObjective(points, theta, lambda)

  root.innerHTML = `
    <label class="control">
      <span>theta: <strong>${Math.round(state.landscapeTheta ?? 32)}°</strong></span>
      <input type="range" min="0" max="180" value="${state.landscapeTheta ?? 32}" id="landscape-theta" />
    </label>
    <label class="control">
      <span>lambda: <strong>${lambda.toFixed(2)}</strong></span>
      <input type="range" min="0" max="100" value="${Math.round(lambda * 100)}" id="landscape-lambda" />
    </label>
    <canvas id="landscape-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>current objective</span>
        <div class="bar"><i style="width:${Math.min(100, value * 100)}%"></i></div>
        <strong>${value.toFixed(3)}</strong>
      </div>
    </div>
    <p class="micro-note">색이 밝을수록 objective가 큽니다. λ가 커질수록 sparsity pressure는 커지지만 reconstruction trade-off도 함께 바뀝니다.</p>
  `

  root.querySelector('#landscape-theta').addEventListener('input', (event) => {
    state.landscapeTheta = Number(event.target.value)
    markInteractionExplored('lossLandscapeLab')
    rerender('lossLandscapeLab')
  })
  root.querySelector('#landscape-lambda').addEventListener('input', (event) => {
    state.landscapeLambda = Number(event.target.value) / 100
    markInteractionExplored('lossLandscapeLab')
    rerender('lossLandscapeLab')
  })

  const canvas = root.querySelector('#landscape-canvas')
  drawLossLandscape(canvas.getContext('2d'), canvas, points, theta, lambda)
}

function manifoldPoint(t) {
  const x = t * 5
  const y = Math.sin(t * Math.PI * 1.5)
  return [x, y]
}

function manifoldTangent(t) {
  const dx = 5
  const dy = Math.cos(t * Math.PI * 1.5) * Math.PI * 1.5
  const len = Math.hypot(dx, dy)
  return [dx / len, dy / len]
}

function softThreshold(value, lambda) {
  return Math.sign(value) * Math.max(Math.abs(value) - lambda, 0)
}

function renderPcaErrorSurface(root) {
  const points = createProjectionDataset()
  const currentAngle = (state.projectionAngle ?? 32) * (Math.PI / 180)
  const bestAngle = computePrincipalAngle(points)
  const mse = computeProjectionMSE(points, currentAngle)
  const bestMse = computeProjectionMSE(points, bestAngle)

  root.innerHTML = `
    <label class="control">
      <span>angle sweep marker: <strong>${Math.round(state.projectionAngle ?? 32)}°</strong></span>
      <input type="range" min="0" max="180" value="${state.projectionAngle ?? 32}" id="error-angle" />
    </label>
    <canvas id="pca-error-canvas" width="620" height="280" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>현재 MSE</span>
        <div class="bar"><i style="width:${Math.min(100, mse * 180)}%"></i></div>
        <strong>${mse.toFixed(3)}</strong>
      </div>
      <div>
        <span>최소 MSE</span>
        <div class="bar compact"><i style="width:${Math.min(100, bestMse * 180)}%"></i></div>
        <strong>${bestMse.toFixed(3)}</strong>
      </div>
    </div>
    <p class="micro-note">곡선 전체가 angle→loss 관계입니다. 현재 점과 최적점이 어떻게 떨어져 있는지 보며 PCA 축을 직관적으로 이해해 보세요.</p>
  `

  root.querySelector('#error-angle').addEventListener('input', (event) => {
    state.projectionAngle = Number(event.target.value)
    markInteractionExplored('pcaErrorSurface')
    rerender('pcaErrorSurface')
  })

  const canvas = root.querySelector('#pca-error-canvas')
  drawPcaErrorSurface(canvas.getContext('2d'), canvas, points, currentAngle, bestAngle)
}

function drawPcaErrorSurface(ctx, canvas, points, currentAngle, bestAngle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const values = []
  for (let deg = 0; deg <= 180; deg += 2) {
    values.push({ deg, mse: computeProjectionMSE(points, (deg * Math.PI) / 180) })
  }
  const maxMse = Math.max(...values.map((v) => v.mse))
  const minMse = Math.min(...values.map((v) => v.mse))

  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 3
  ctx.beginPath()
  values.forEach((value, index) => {
    const x = 40 + (value.deg / 180) * (canvas.width - 80)
    const y = canvas.height - 40 - ((value.mse - minMse) / (maxMse - minMse || 1)) * (canvas.height - 80)
    if (index === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()

  drawLossMarker(ctx, canvas, currentAngle, computeProjectionMSE(points, currentAngle), minMse, maxMse, '#ff7ab8', 'current')
  drawLossMarker(ctx, canvas, bestAngle, computeProjectionMSE(points, bestAngle), minMse, maxMse, '#a1ff7a', 'best')
}

function drawLossMarker(ctx, canvas, angle, mse, minMse, maxMse, color, label) {
  const deg = (angle * 180) / Math.PI
  const x = 40 + (deg / 180) * (canvas.width - 80)
  const y = canvas.height - 40 - ((mse - minMse) / (maxMse - minMse || 1)) * (canvas.height - 80)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillText(label, x + 10, y - 10)
}

function renderReparamLab(root) {
  const muX = state.reparamMuX ?? 0.6
  const muY = state.reparamMuY ?? -0.4
  const sigmaX = state.reparamSigmaX ?? 0.7
  const sigmaY = state.reparamSigmaY ?? 0.45

  root.innerHTML = `
    <div class="detail-grid">
      <label class="control">
        <span>μx: <strong>${muX.toFixed(2)}</strong></span>
        <input type="range" min="-200" max="200" value="${Math.round(muX * 100)}" id="reparam-mux" />
      </label>
      <label class="control">
        <span>μy: <strong>${muY.toFixed(2)}</strong></span>
        <input type="range" min="-200" max="200" value="${Math.round(muY * 100)}" id="reparam-muy" />
      </label>
      <label class="control">
        <span>σx: <strong>${sigmaX.toFixed(2)}</strong></span>
        <input type="range" min="5" max="150" value="${Math.round(sigmaX * 100)}" id="reparam-sigx" />
      </label>
      <label class="control">
        <span>σy: <strong>${sigmaY.toFixed(2)}</strong></span>
        <input type="range" min="5" max="150" value="${Math.round(sigmaY * 100)}" id="reparam-sigy" />
      </label>
    </div>
    <canvas id="reparam-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <button class="ghost-button" id="reparam-burst">sample burst</button>
    <p class="micro-note">점구름은 z = μ + σ ⊙ ε 로 샘플링된 latent 후보들입니다. μ는 중심, σ는 퍼짐을 결정합니다.</p>
  `

  const bind = (selector, key) => {
    root.querySelector(selector).addEventListener('input', (event) => {
      state[key] = Number(event.target.value) / 100
      markInteractionExplored('reparamLab')
      rerender('reparamLab')
    })
  }

  bind('#reparam-mux', 'reparamMuX')
  bind('#reparam-muy', 'reparamMuY')
  bind('#reparam-sigx', 'reparamSigmaX')
  bind('#reparam-sigy', 'reparamSigmaY')

  root.querySelector('#reparam-burst').addEventListener('click', () => {
    state.reparamSeed = (state.reparamSeed ?? 0) + 1
    markInteractionExplored('reparamLab')
    rerender('reparamLab')
  })

  const canvas = root.querySelector('#reparam-canvas')
  drawReparam(canvas.getContext('2d'), canvas, muX, muY, sigmaX, sigmaY, state.reparamSeed ?? 0)
}

function drawReparam(ctx, canvas, muX, muY, sigmaX, sigmaY, seed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 8
  const sy = canvas.height / 6
  const cx = canvas.width / 2 + muX * sx
  const cy = canvas.height / 2 - muY * sy

  ctx.strokeStyle = '#a1ff7a'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.ellipse(cx, cy, sigmaX * sx, sigmaY * sy, 0, 0, Math.PI * 2)
  ctx.stroke()

  for (let i = 0; i < 40; i += 1) {
    const epsX = pseudoNormal(i + seed * 3)
    const epsY = pseudoNormal(i + seed * 7 + 11)
    const x = muX + sigmaX * epsX
    const y = muY + sigmaY * epsY
    ctx.fillStyle = 'rgba(130,233,255,0.82)'
    ctx.beginPath()
    ctx.arc(canvas.width / 2 + x * sx, canvas.height / 2 - y * sy, 3, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.arc(cx, cy, 7, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillText('μ', cx + 10, cy - 10)
}

function renderKlLab(root) {
  const muX = state.reparamMuX ?? 0.6
  const muY = state.reparamMuY ?? -0.4
  const sigmaX = Math.max(0.05, state.reparamSigmaX ?? 0.7)
  const sigmaY = Math.max(0.05, state.reparamSigmaY ?? 0.45)
  const kl =
    0.5 *
    (muX ** 2 + muY ** 2 + sigmaX ** 2 + sigmaY ** 2 - Math.log(sigmaX ** 2) - Math.log(sigmaY ** 2) - 2)

  root.innerHTML = `
    <p class="micro-note">KL(q||p) = 0.5 Σ(μ² + σ² - log σ² - 1)를 2차원 diagonal Gaussian에 대해 계산합니다.</p>
    <canvas id="kl-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>KL divergence</span>
        <div class="bar"><i style="width:${Math.min(100, kl * 22)}%"></i></div>
        <strong>${kl.toFixed(3)}</strong>
      </div>
      <div>
        <span>prior match</span>
        <div class="bar compact"><i style="width:${Math.max(0, 100 - kl * 22)}%"></i></div>
        <strong>${Math.max(0, 100 - kl * 22).toFixed(1)}%</strong>
      </div>
    </div>
  `

  const canvas = root.querySelector('#kl-canvas')
  drawKl(canvas.getContext('2d'), canvas, muX, muY, sigmaX, sigmaY)
}

function renderDecoderManifoldLab(root) {
  const h = state.decoderH ?? 0.3
  const tangent = decoderTangent(h)
  const speed = Math.hypot(tangent[0], tangent[1])

  root.innerHTML = `
    <label class="control">
      <span>latent h: <strong>${h.toFixed(2)}</strong></span>
      <input type="range" min="-220" max="220" value="${Math.round(h * 100)}" id="decoder-h" />
    </label>
    <canvas id="decoder-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>local decoder speed ||dg/dh||</span>
        <div class="bar"><i style="width:${Math.min(100, speed * 35)}%"></i></div>
        <strong>${speed.toFixed(3)}</strong>
      </div>
      <div>
        <span>latent position</span>
        <div class="bar compact"><i style="width:${((h + 2.2) / 4.4) * 100}%"></i></div>
        <strong>${h.toFixed(2)}</strong>
      </div>
    </div>
    <p class="micro-note">decoder는 latent 한 축을 데이터 공간의 곡선으로 펼칩니다. 분홍 점은 현재 h에서의 decoded output입니다.</p>
  `

  root.querySelector('#decoder-h').addEventListener('input', (event) => {
    state.decoderH = Number(event.target.value) / 100
    markInteractionExplored('decoderManifoldLab')
    rerender('decoderManifoldLab')
  })

  const canvas = root.querySelector('#decoder-canvas')
  drawDecoderManifold(canvas.getContext('2d'), canvas, h)
}

function drawDecoderManifold(ctx, canvas, h) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 4
  ctx.beginPath()
  for (let i = 0; i < 140; i += 1) {
    const u = -2.2 + (i / 139) * 4.4
    const [x, y] = decoderPoint(u)
    const cx = canvas.width / 2 + x * 85
    const cy = canvas.height / 2 - y * 80
    if (i === 0) ctx.moveTo(cx, cy)
    else ctx.lineTo(cx, cy)
  }
  ctx.stroke()

  const [pxRaw, pyRaw] = decoderPoint(h)
  const tangent = decoderTangent(h)
  const px = canvas.width / 2 + pxRaw * 85
  const py = canvas.height / 2 - pyRaw * 80

  ctx.strokeStyle = '#a1ff7a'
  ctx.beginPath()
  ctx.moveTo(px - tangent[0] * 32, py + tangent[1] * 32)
  ctx.lineTo(px + tangent[0] * 32, py - tangent[1] * 32)
  ctx.stroke()

  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.arc(px, py, 7, 0, Math.PI * 2)
  ctx.fill()
}

function decoderPoint(h) {
  return [h, Math.sin(1.4 * h) + 0.25 * Math.cos(2.2 * h)]
}

function decoderTangent(h) {
  const dx = 1
  const dy = 1.4 * Math.cos(1.4 * h) - 0.55 * Math.sin(2.2 * h)
  const len = Math.hypot(dx, dy)
  return [dx / len, dy / len]
}

function pseudoNormal(seed) {
  const a = Math.sin(seed * 12.9898) * 43758.5453
  const b = Math.sin((seed + 1.37) * 78.233) * 19642.3491
  const u1 = Math.max(1e-6, a - Math.floor(a))
  const u2 = Math.max(1e-6, b - Math.floor(b))
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.7
}

function drawKl(ctx, canvas, muX, muY, sigmaX, sigmaY) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 8
  const sy = canvas.height / 6
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.ellipse(centerX, centerY, sx, sy, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.strokeStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.ellipse(centerX + muX * sx, centerY - muY * sy, sigmaX * sx, sigmaY * sy, 0, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.fillText('prior N(0,I)', centerX + sx + 10, centerY - sy - 6)
  ctx.fillText('posterior q(z|x)', centerX + muX * sx + sigmaX * sx + 10, centerY - muY * sy)
}

function drawIsta(ctx, canvas, D, x, h, recon) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const origin = { x: 120, y: canvas.height - 60 }
  const scale = 120

  const drawVec = (vx, vy, color, label) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(origin.x, origin.y)
    ctx.lineTo(origin.x + vx * scale, origin.y - vy * scale)
    ctx.stroke()
    ctx.fillStyle = color
    ctx.fillText(label, origin.x + vx * scale + 8, origin.y - vy * scale)
  }

  drawVec(D[0][0], D[1][0], '#a1ff7a', 'd1')
  drawVec(D[0][1], D[1][1], '#82e9ff', 'd2')
  drawVec(x[0], x[1], '#ffffff', 'target x')
  drawVec(recon[0], recon[1], '#ff7ab8', 'reconstruction')
}

function drawLossLandscape(ctx, canvas, points, theta, lambda) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let ix = 0; ix < 90; ix += 1) {
    for (let iy = 0; iy < 60; iy += 1) {
      const t = (ix / 89) * Math.PI
      const l = (iy / 59) * 1.0
      const v = sparseProjectionObjective(points, t, l)
      const alpha = Math.min(0.85, v * 0.9)
      ctx.fillStyle = `rgba(130,233,255,${alpha})`
      ctx.fillRect(30 + ix * 6, 20 + iy * 4, 6, 4)
    }
  }

  const x = 30 + ((theta / Math.PI) * 89) * 6
  const y = 20 + (lambda * 59) * 4
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.arc(x, y, 7, 0, Math.PI * 2)
  ctx.fill()
}

function multiplyMatVec(matrix, vector) {
  return [
    matrix[0][0] * vector[0] + matrix[0][1] * vector[1],
    matrix[1][0] * vector[0] + matrix[1][1] * vector[1],
  ]
}

function transposeMultiplyMatVec(matrix, vector) {
  return [
    matrix[0][0] * vector[0] + matrix[1][0] * vector[1],
    matrix[0][1] * vector[0] + matrix[1][1] * vector[1],
  ]
}

function stepIsta(times) {
  const D = [
    [1.0, 0.55],
    [0.0, 0.83],
  ]
  const x = [1.15, 0.92]
  let h = state.istaH ?? [0, 0]
  const eta = state.istaEta ?? 0.45
  const lambda = state.istaLambda ?? 0.22

  for (let i = 0; i < times; i += 1) {
    const recon = multiplyMatVec(D, h)
    const residual = [recon[0] - x[0], recon[1] - x[1]]
    const grad = transposeMultiplyMatVec(D, residual)
    h = [
      softThreshold(h[0] - eta * grad[0], lambda * eta),
      softThreshold(h[1] - eta * grad[1], lambda * eta),
    ]
  }

  state.istaH = h
}

function sparseProjectionObjective(points, theta, lambda) {
  const w = [Math.cos(theta), Math.sin(theta)]
  let total = 0
  for (const [x, y] of points) {
    const h = softThreshold(x * w[0] + y * w[1], lambda)
    const rx = h * w[0]
    const ry = h * w[1]
    total += (x - rx) ** 2 + (y - ry) ** 2 + 0.12 * Math.abs(h)
  }
  return total / points.length
}

function renderRankKLinearAELab(root) {
  const rank = state.rankK ?? 1
  const angle = ((state.rankAngle ?? 28) * Math.PI) / 180
  const points = createProjectionDataset()
  const mse = computeRankReconstructionMSE(points, rank, angle)

  root.innerHTML = `
    <div class="toggle-group wrap">
      <button class="toggle ${rank === 1 ? 'active' : ''}" data-rank="1">rank 1</button>
      <button class="toggle ${rank === 2 ? 'active' : ''}" data-rank="2">rank 2</button>
    </div>
    <label class="control">
      <span>basis angle: <strong>${Math.round(state.rankAngle ?? 28)}°</strong></span>
      <input type="range" min="0" max="180" value="${state.rankAngle ?? 28}" id="rank-angle" />
    </label>
    <canvas id="rankk-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>reconstruction MSE</span>
        <div class="bar"><i style="width:${Math.min(100, mse * 180)}%"></i></div>
        <strong>${mse.toFixed(3)}</strong>
      </div>
      <div>
        <span>operator rank</span>
        <div class="bar compact"><i style="width:${rank === 1 ? 50 : 100}%"></i></div>
        <strong>${rank}</strong>
      </div>
    </div>
  `

  root.querySelectorAll('[data-rank]').forEach((button) => {
    button.addEventListener('click', () => {
      state.rankK = Number(button.dataset.rank)
      markInteractionExplored('rankKLinearAELab')
      rerender('rankKLinearAELab')
    })
  })
  root.querySelector('#rank-angle').addEventListener('input', (event) => {
    state.rankAngle = Number(event.target.value)
    markInteractionExplored('rankKLinearAELab')
    rerender('rankKLinearAELab')
  })

  drawRankK(root.querySelector('#rankk-canvas').getContext('2d'), root.querySelector('#rankk-canvas'), points, rank, angle)
}

function drawRankK(ctx, canvas, points, rank, angle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const basis1 = [Math.cos(angle), Math.sin(angle)]
  const basis2 = [-Math.sin(angle), Math.cos(angle)]
  const center = { x: canvas.width / 2, y: canvas.height / 2 }
  const project = (x, y) => {
    const h1 = x * basis1[0] + y * basis1[1]
    const h2 = x * basis2[0] + y * basis2[1]
    const use2 = rank === 2 ? 1 : 0
    return [h1 * basis1[0] + h2 * use2 * basis2[0], h1 * basis1[1] + h2 * use2 * basis2[1]]
  }
  for (const [x, y] of points) {
    const [rx, ry] = project(x, y)
    const px = center.x + x * 80
    const py = center.y - y * 80
    const prx = center.x + rx * 80
    const pry = center.y - ry * 80
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'
    ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(prx, pry); ctx.stroke()
    ctx.fillStyle = '#82e9ff'
    ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#ff7ab8'
    ctx.beginPath(); ctx.arc(prx, pry, 2.5, 0, Math.PI * 2); ctx.fill()
  }
}

function renderLatentGeometryLab(root) {
  const t = (state.latentInterpT ?? 35) / 100
  root.innerHTML = `
    <label class="control">
      <span>interpolation t: <strong>${t.toFixed(2)}</strong></span>
      <input type="range" min="0" max="100" value="${state.latentInterpT ?? 35}" id="interp-t" />
    </label>
    <canvas id="latent-geometry-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <p class="micro-note">직선 경로와 곡선 경로를 동시에 그려 latent interpolation의 geometry를 비교합니다.</p>
  `
  root.querySelector('#interp-t').addEventListener('input', (event) => {
    state.latentInterpT = Number(event.target.value)
    markInteractionExplored('latentGeometryLab')
    rerender('latentGeometryLab')
  })
  drawLatentGeometry(root.querySelector('#latent-geometry-canvas').getContext('2d'), root.querySelector('#latent-geometry-canvas'), t)
}

function drawLatentGeometry(ctx, canvas, t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const A = [-1.5, -0.8]
  const B = [1.6, 1.0]
  const linear = [A[0] * (1 - t) + B[0] * t, A[1] * (1 - t) + B[1] * t]
  const curved = [linear[0], linear[1] + 0.9 * Math.sin(Math.PI * t)]
  const toCanvas = ([x, y]) => [canvas.width / 2 + x * 110, canvas.height / 2 - y * 85]

  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 3
  ctx.beginPath()
  const [ax, ay] = toCanvas(A)
  const [bx, by] = toCanvas(B)
  ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()

  ctx.strokeStyle = '#a1ff7a'
  ctx.beginPath()
  for (let i = 0; i <= 100; i += 1) {
    const u = i / 100
    const p = [A[0] * (1 - u) + B[0] * u, A[1] * (1 - u) + B[1] * u + 0.9 * Math.sin(Math.PI * u)]
    const [cx, cy] = toCanvas(p)
    if (i === 0) ctx.moveTo(cx, cy)
    else ctx.lineTo(cx, cy)
  }
  ctx.stroke()

  ;[[A, '#ffffff'], [B, '#ffffff'], [linear, '#ff7ab8'], [curved, '#ffc35c']].forEach(([p, color]) => {
    const [x, y] = toCanvas(p)
    ctx.fillStyle = color
    ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill()
  })
}

function renderVectorFieldLab(root) {
  const sigma = state.vectorFieldSigma ?? 0.7
  root.innerHTML = `
    <label class="control">
      <span>noise scale σ: <strong>${sigma.toFixed(2)}</strong></span>
      <input type="range" min="30" max="180" value="${Math.round(sigma * 100)}" id="vf-sigma" />
    </label>
    <canvas id="vector-field-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <p class="micro-note">σ가 커질수록 field가 더 넓고 부드럽게 퍼지는 모습을 보세요.</p>
  `
  root.querySelector('#vf-sigma').addEventListener('input', (event) => {
    state.vectorFieldSigma = Number(event.target.value) / 100
    markInteractionExplored('vectorFieldLab')
    rerender('vectorFieldLab')
  })
  drawVectorField(root.querySelector('#vector-field-canvas').getContext('2d'), root.querySelector('#vector-field-canvas'), sigma)
}

function drawVectorField(ctx, canvas, sigma) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 7
  const sy = canvas.height / 5
  const toCanvas = (x, y) => [canvas.width / 2 + x * sx, canvas.height / 2 - y * sy]
  for (let gx = -3; gx <= 3; gx += 0.55) {
    for (let gy = -2.2; gy <= 2.2; gy += 0.55) {
      const [vx, vy] = gaussianMixtureScore(gx, gy, sigma)
      const [cx, cy] = toCanvas(gx, gy)
      const scale = 12 + sigma * 6
      ctx.strokeStyle = 'rgba(130,233,255,0.55)'
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + vx * scale, cy - vy * scale); ctx.stroke()
    }
  }
}

function renderSemanticHashingLab(root) {
  const threshold = state.hashThreshold ?? 0.1
  const vectors = [
    [-0.9, 0.7, 0.4, -0.2],
    [-0.8, 0.6, 0.3, -0.3],
    [0.8, -0.4, 0.7, 0.2],
    [0.9, -0.2, 0.8, 0.3],
  ]
  const codes = vectors.map((vec) => vec.map((v) => Number(v > threshold)).join(''))
  const distance = hammingDistance(codes[0], codes[1])

  root.innerHTML = `
    <label class="control">
      <span>binary threshold: <strong>${threshold.toFixed(2)}</strong></span>
      <input type="range" min="-80" max="80" value="${Math.round(threshold * 100)}" id="hash-threshold" />
    </label>
    <div class="detail-grid">
      ${codes.map((code, index) => `<div class="application-card"><span>sample ${index + 1}</span><strong>${code}</strong></div>`).join('')}
    </div>
    <div class="compare-bars">
      <div>
        <span>Hamming(sample1, sample2)</span>
        <div class="bar"><i style="width:${distance * 25}%"></i></div>
        <strong>${distance}</strong>
      </div>
    </div>
    <p class="micro-note">threshold를 바꾸면 continuous latent가 binary code로 바뀌고, retrieval 기준도 함께 바뀝니다.</p>
  `
  root.querySelector('#hash-threshold').addEventListener('input', (event) => {
    state.hashThreshold = Number(event.target.value) / 100
    markInteractionExplored('semanticHashingLab')
    rerender('semanticHashingLab')
  })
}

function computeRankReconstructionMSE(points, rank, angle) {
  const b1 = [Math.cos(angle), Math.sin(angle)]
  const b2 = [-Math.sin(angle), Math.cos(angle)]
  let total = 0
  for (const [x, y] of points) {
    const h1 = x * b1[0] + y * b1[1]
    const h2 = x * b2[0] + y * b2[1]
    const use2 = rank === 2 ? 1 : 0
    const rx = h1 * b1[0] + h2 * use2 * b2[0]
    const ry = h1 * b1[1] + h2 * use2 * b2[1]
    total += (x - rx) ** 2 + (y - ry) ** 2
  }
  return total / points.length
}

function hammingDistance(a, b) {
  let d = 0
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) d += Number(a[i] !== b[i])
  return d
}

function renderOrthogonalityLab(root) {
  const angle = ((state.orthoAngle ?? 70) * Math.PI) / 180
  const dot = Math.cos(angle)
  root.innerHTML = `
    <label class="control">
      <span>basis angle: <strong>${Math.round(state.orthoAngle ?? 70)}°</strong></span>
      <input type="range" min="5" max="175" value="${state.orthoAngle ?? 70}" id="ortho-angle" />
    </label>
    <canvas id="ortho-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>|dot(b1, b2)|</span>
        <div class="bar"><i style="width:${Math.abs(dot) * 100}%"></i></div>
        <strong>${Math.abs(dot).toFixed(3)}</strong>
      </div>
      <div>
        <span>orthogonality</span>
        <div class="bar compact"><i style="width:${(1 - Math.abs(dot)) * 100}%"></i></div>
        <strong>${(1 - Math.abs(dot)).toFixed(3)}</strong>
      </div>
    </div>
  `
  root.querySelector('#ortho-angle').addEventListener('input', (event) => {
    state.orthoAngle = Number(event.target.value)
    markInteractionExplored('orthogonalityLab')
    rerender('orthogonalityLab')
  })
  drawOrthogonality(root.querySelector('#ortho-canvas').getContext('2d'), root.querySelector('#ortho-canvas'), angle)
}

function renderMutualInfoLab(root) {
  const dims = state.miDims ?? 3
  const signal = state.miSignal ?? 1.2
  const noise = Math.max(0.05, state.miNoise ?? 0.35)
  const snr = (signal * signal) / (noise * noise)
  const bits = 0.5 * Math.log2(1 + snr) * dims
  root.innerHTML = `
    <label class="control">
      <span>bottleneck dims: <strong>${dims}</strong></span>
      <input type="range" min="1" max="8" value="${dims}" id="mi-dims" />
    </label>
    <label class="control">
      <span>signal scale: <strong>${signal.toFixed(2)}</strong></span>
      <input type="range" min="20" max="200" value="${Math.round(signal * 100)}" id="mi-signal" />
    </label>
    <label class="control">
      <span>noise scale: <strong>${noise.toFixed(2)}</strong></span>
      <input type="range" min="5" max="120" value="${Math.round(noise * 100)}" id="mi-noise" />
    </label>
    <canvas id="mi-canvas" width="620" height="260" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div><span>SNR</span><div class="bar"><i style="width:${Math.min(100, snr * 8)}%"></i></div><strong>${snr.toFixed(2)}</strong></div>
      <div><span>info budget (bits)</span><div class="bar compact"><i style="width:${Math.min(100, bits * 8)}%"></i></div><strong>${bits.toFixed(2)}</strong></div>
    </div>
  `
  const bind = (selector, key, scale = 100) => root.querySelector(selector).addEventListener('input', (event) => {
    state[key] = Number(event.target.value) / scale
    if (key === 'miDims') state[key] = Number(event.target.value)
    markInteractionExplored('mutualInfoLab')
    rerender('mutualInfoLab')
  })
  bind('#mi-dims', 'miDims', 1)
  bind('#mi-signal', 'miSignal')
  bind('#mi-noise', 'miNoise')
  drawMutualInfo(root.querySelector('#mi-canvas').getContext('2d'), root.querySelector('#mi-canvas'), dims, signal, noise)
}

function renderPhaseTransitionLab(root) {
  const maxDim = 8
  const selected = state.phaseDim ?? 3
  const values = Array.from({ length: maxDim }, (_, i) => phaseTransitionError(i + 1))
  root.innerHTML = `
    <label class="control">
      <span>selected dim: <strong>${selected}</strong></span>
      <input type="range" min="1" max="${maxDim}" value="${selected}" id="phase-dim" />
    </label>
    <canvas id="phase-canvas" width="620" height="280" class="scene-canvas"></canvas>
    <p class="micro-note">차원을 늘릴수록 오차가 서서히가 아니라 특정 구간에서 확 꺾이는 모습을 볼 수 있습니다.</p>
  `
  root.querySelector('#phase-dim').addEventListener('input', (event) => {
    state.phaseDim = Number(event.target.value)
    markInteractionExplored('phaseTransitionLab')
    rerender('phaseTransitionLab')
  })
  drawPhaseTransition(root.querySelector('#phase-canvas').getContext('2d'), root.querySelector('#phase-canvas'), values, selected)
}

function drawOrthogonality(ctx, canvas, angle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const b1 = [1, 0]
  const b2 = [Math.cos(angle), Math.sin(angle)]
  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 4
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + b1[0] * 140, cy - b1[1] * 140); ctx.stroke()
  ctx.strokeStyle = '#ff7ab8'
  ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + b2[0] * 140, cy - b2[1] * 140); ctx.stroke()
}

function renderDiffusionScheduleLab(root) {
  const step = state.diffusionStep ?? 6
  const total = 12
  const alpha = Math.pow(0.92, step)
  root.innerHTML = `
    <label class="control">
      <span>step: <strong>${step} / ${total}</strong></span>
      <input type="range" min="0" max="${total}" value="${step}" id="diffusion-step" />
    </label>
    <canvas id="diffusion-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div>
        <span>signal retain α^t</span>
        <div class="bar"><i style="width:${alpha * 100}%"></i></div>
        <strong>${alpha.toFixed(3)}</strong>
      </div>
      <div>
        <span>noise share</span>
        <div class="bar compact"><i style="width:${(1 - alpha) * 100}%"></i></div>
        <strong>${(1 - alpha).toFixed(3)}</strong>
      </div>
    </div>
  `
  root.querySelector('#diffusion-step').addEventListener('input', (event) => {
    state.diffusionStep = Number(event.target.value)
    markInteractionExplored('diffusionScheduleLab')
    rerender('diffusionScheduleLab')
  })
  drawDiffusion(root.querySelector('#diffusion-canvas').getContext('2d'), root.querySelector('#diffusion-canvas'), step, total)
}

function renderAnisotropicPriorLab(root) {
  const sx = Math.max(0.1, state.priorSigmaX ?? 1.0)
  const sy = Math.max(0.1, state.priorSigmaY ?? 0.55)
  const rho = state.priorRho ?? 0.35
  root.innerHTML = `
    <label class="control">
      <span>σx: <strong>${sx.toFixed(2)}</strong></span>
      <input type="range" min="10" max="180" value="${Math.round(sx * 100)}" id="prior-sx" />
    </label>
    <label class="control">
      <span>σy: <strong>${sy.toFixed(2)}</strong></span>
      <input type="range" min="10" max="180" value="${Math.round(sy * 100)}" id="prior-sy" />
    </label>
    <label class="control">
      <span>ρ: <strong>${rho.toFixed(2)}</strong></span>
      <input type="range" min="-90" max="90" value="${Math.round(rho * 100)}" id="prior-rho" />
    </label>
    <canvas id="anisotropic-canvas" width="620" height="320" class="scene-canvas"></canvas>
  `
  const bind = (selector, key, scale = 100) => root.querySelector(selector).addEventListener('input', (event) => {
    state[key] = Number(event.target.value) / scale
    markInteractionExplored('anisotropicPriorLab')
    rerender('anisotropicPriorLab')
  })
  bind('#prior-sx', 'priorSigmaX')
  bind('#prior-sy', 'priorSigmaY')
  bind('#prior-rho', 'priorRho')
  drawAnisotropicPrior(root.querySelector('#anisotropic-canvas').getContext('2d'), root.querySelector('#anisotropic-canvas'), sx, sy, rho)
}

function renderCorrelatedPosteriorLab(root) {
  const rho = state.posteriorRho ?? 0.55
  root.innerHTML = `
    <label class="control">
      <span>correlation ρ: <strong>${rho.toFixed(2)}</strong></span>
      <input type="range" min="-90" max="90" value="${Math.round(rho * 100)}" id="posterior-rho" />
    </label>
    <canvas id="corr-posterior-canvas" width="620" height="320" class="scene-canvas"></canvas>
    <p class="micro-note">ρ가 커질수록 posterior ellipse가 기울어지며, 두 latent 축이 함께 움직이기 시작합니다.</p>
  `
  root.querySelector('#posterior-rho').addEventListener('input', (event) => {
    state.posteriorRho = Number(event.target.value) / 100
    markInteractionExplored('correlatedPosteriorLab')
    rerender('correlatedPosteriorLab')
  })
  drawCorrelatedPosterior(root.querySelector('#corr-posterior-canvas').getContext('2d'), root.querySelector('#corr-posterior-canvas'), rho)
}

function drawDiffusion(ctx, canvas, step, total) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const alpha = Math.pow(0.92, step)
  for (let i = 0; i < 90; i += 1) {
    const t = i / 89
    const x = 70 + t * (canvas.width - 140)
    const baseY = canvas.height / 2 - Math.sin(t * Math.PI * 2) * 60 * alpha
    const noise = (pseudoNormal(i + step * 5) * 18) * (1 - alpha)
    ctx.fillStyle = 'rgba(130,233,255,0.8)'
    ctx.beginPath(); ctx.arc(x, baseY + noise, 3, 0, Math.PI * 2); ctx.fill()
  }
}

function renderRetrievalPlaygroundLab(root) {
  const queryIndex = state.queryIndex ?? 0
  const codes = ['0110', '0111', '1011', '1010', '0010', '1110']
  const query = codes[queryIndex]
  const ranked = codes
    .map((code, index) => ({ index, code, d: hammingDistance(query, code) }))
    .sort((a, b) => a.d - b.d)

  root.innerHTML = `
    <div class="toggle-group wrap">
      ${codes.map((code, index) => `<button class="toggle ${queryIndex === index ? 'active' : ''}" data-query="${index}">${code}</button>`).join('')}
    </div>
    <div class="application-grid">
      ${ranked.map((item) => `<div class="application-card"><span>rank ${item.index + 1}</span><strong>${item.code}</strong><p>Hamming = ${item.d}</p></div>`).join('')}
    </div>
    <p class="micro-note">query code를 바꾸면 nearest neighbor ranking도 함께 바뀝니다.</p>
  `
  root.querySelectorAll('[data-query]').forEach((button) => {
    button.addEventListener('click', () => {
      state.queryIndex = Number(button.dataset.query)
      markInteractionExplored('retrievalPlaygroundLab')
      rerender('retrievalPlaygroundLab')
    })
  })
}

function renderNeighborPatchLab(root) {
  const k = state.patchK ?? 6
  root.innerHTML = `
    <label class="control">
      <span>neighbors k: <strong>${k}</strong></span>
      <input type="range" min="3" max="12" value="${k}" id="patch-k" />
    </label>
    <canvas id="patch-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <p class="micro-note">가까운 이웃들만 모은 local patch에서 tangent를 추정합니다.</p>
  `
  root.querySelector('#patch-k').addEventListener('input', (event) => {
    state.patchK = Number(event.target.value)
    markInteractionExplored('neighborPatchLab')
    rerender('neighborPatchLab')
  })
  drawNeighborPatch(root.querySelector('#patch-canvas').getContext('2d'), root.querySelector('#patch-canvas'), k)
}

function renderDecoderCurvatureLab(root) {
  const h = state.curvatureH ?? 0.2
  const curvature = decoderCurvature(h)
  root.innerHTML = `
    <label class="control">
      <span>latent h: <strong>${h.toFixed(2)}</strong></span>
      <input type="range" min="-220" max="220" value="${Math.round(h * 100)}" id="curvature-h" />
    </label>
    <canvas id="curvature-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div><span>curvature</span><div class="bar"><i style="width:${Math.min(100, curvature * 120)}%"></i></div><strong>${curvature.toFixed(3)}</strong></div>
    </div>
  `
  root.querySelector('#curvature-h').addEventListener('input', (event) => {
    state.curvatureH = Number(event.target.value) / 100
    markInteractionExplored('decoderCurvatureLab')
    rerender('decoderCurvatureLab')
  })
  drawDecoderCurvature(root.querySelector('#curvature-canvas').getContext('2d'), root.querySelector('#curvature-canvas'), h)
}

function renderBinaryBoardLab(root) {
  const x = state.boardX ?? 0.45
  const y = state.boardY ?? -0.25
  const code = `${Number(x > 0)}${Number(y > 0)}${Number(x + y > 0)}${Number(x - y > 0)}`
  root.innerHTML = `
    <label class="control">
      <span>x: <strong>${x.toFixed(2)}</strong></span>
      <input type="range" min="-100" max="100" value="${Math.round(x * 100)}" id="board-x" />
    </label>
    <label class="control">
      <span>y: <strong>${y.toFixed(2)}</strong></span>
      <input type="range" min="-100" max="100" value="${Math.round(y * 100)}" id="board-y" />
    </label>
    <canvas id="binary-board-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="application-card"><span>current code</span><strong>${code}</strong></div>
  `
  const bind = (selector, key) => root.querySelector(selector).addEventListener('input', (event) => {
    state[key] = Number(event.target.value) / 100
    markInteractionExplored('binaryBoardLab')
    rerender('binaryBoardLab')
  })
  bind('#board-x', 'boardX')
  bind('#board-y', 'boardY')
  drawBinaryBoard(root.querySelector('#binary-board-canvas').getContext('2d'), root.querySelector('#binary-board-canvas'), x, y)
}

function renderRetrievalHeatmapLab(root) {
  const qx = state.retrievalQx ?? 0.2
  const qy = state.retrievalQy ?? -0.1
  root.innerHTML = `
    <label class="control">
      <span>query x: <strong>${qx.toFixed(2)}</strong></span>
      <input type="range" min="-100" max="100" value="${Math.round(qx * 100)}" id="rq-x" />
    </label>
    <label class="control">
      <span>query y: <strong>${qy.toFixed(2)}</strong></span>
      <input type="range" min="-100" max="100" value="${Math.round(qy * 100)}" id="rq-y" />
    </label>
    <canvas id="retrieval-heatmap-canvas" width="620" height="300" class="scene-canvas"></canvas>
  `
  const bind = (selector, key) => root.querySelector(selector).addEventListener('input', (event) => {
    state[key] = Number(event.target.value) / 100
    markInteractionExplored('retrievalHeatmapLab')
    rerender('retrievalHeatmapLab')
  })
  bind('#rq-x', 'retrievalQx')
  bind('#rq-y', 'retrievalQy')
  drawRetrievalHeatmap(root.querySelector('#retrieval-heatmap-canvas').getContext('2d'), root.querySelector('#retrieval-heatmap-canvas'), qx, qy)
}

function drawMutualInfo(ctx, canvas, dims, signal, noise) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const snr = (signal * signal) / (noise * noise)
  const bars = Array.from({ length: dims }, (_, i) => 0.5 * Math.log2(1 + snr * (1 - i * 0.08)))
  bars.forEach((value, index) => {
    const x = 70 + index * 60
    const h = value * 24
    ctx.fillStyle = '#82e9ff'
    ctx.fillRect(x, canvas.height - 40 - h, 34, h)
  })
}

function drawAnisotropicPrior(ctx, canvas, sx, sy, rho) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const angle = 0.5 * Math.atan2(2 * rho * sx * sy, sx * sx - sy * sy)
  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 2
  for (let scale = 1; scale <= 3; scale += 1) {
    ctx.beginPath()
    ctx.ellipse(cx, cy, sx * 55 * scale, sy * 55 * scale, -angle, 0, Math.PI * 2)
    ctx.stroke()
  }
}

function drawNeighborPatch(ctx, canvas, k) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const pts = []
  for (let i = 0; i < 70; i += 1) {
    const t = i / 69
    const x = -2.4 + t * 4.8
    const y = Math.sin(t * Math.PI * 1.4) + 0.12 * Math.cos(i * 1.7)
    pts.push([x, y])
  }
  const query = pts[36]
  const ranked = pts
    .map((p, index) => ({ p, index, d: (p[0] - query[0]) ** 2 + (p[1] - query[1]) ** 2 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, k)
  const sx = canvas.width / 6
  const sy = canvas.height / 4
  const toCanvas = ([x, y]) => [canvas.width / 2 + x * sx, canvas.height / 2 - y * sy]
  pts.forEach((p, idx) => {
    const [cx, cy] = toCanvas(p)
    ctx.fillStyle = idx === 36 ? '#ffffff' : ranked.some((r) => r.index === idx) ? '#ffc35c' : 'rgba(130,233,255,0.75)'
    ctx.beginPath(); ctx.arc(cx, cy, idx === 36 ? 6 : 3, 0, Math.PI * 2); ctx.fill()
  })
  const first = ranked[0].p
  const last = ranked[ranked.length - 1].p
  const tx = last[0] - first[0]
  const ty = last[1] - first[1]
  const len = Math.hypot(tx, ty) || 1
  const [qx, qy] = toCanvas(query)
  ctx.strokeStyle = '#a1ff7a'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(qx - (tx / len) * 70, qy + (ty / len) * 70)
  ctx.lineTo(qx + (tx / len) * 70, qy - (ty / len) * 70)
  ctx.stroke()
}

function drawBinaryBoard(ctx, canvas, x, y) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  ctx.strokeStyle = 'rgba(255,255,255,0.2)'
  ctx.beginPath(); ctx.moveTo(cx, 30); ctx.lineTo(cx, canvas.height - 30); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(40, cy); ctx.lineTo(canvas.width - 40, cy); ctx.stroke()
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.beginPath(); ctx.moveTo(40, canvas.height - 40); ctx.lineTo(canvas.width - 40, 40); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(40, 40); ctx.lineTo(canvas.width - 40, canvas.height - 40); ctx.stroke()
  const px = cx + x * 180
  const py = cy - y * 110
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(px, py, 8, 0, Math.PI * 2); ctx.fill()
}

function drawCorrelatedPosterior(ctx, canvas, rho) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const sx = 90
  const sy = 54
  const angle = 0.5 * Math.atan2(2 * rho * sx * sy, sx * sx - sy * sy)
  ctx.strokeStyle = '#ff7ab8'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(cx, cy, sx, sy, -angle, 0, Math.PI * 2)
  ctx.stroke()
}

function drawDecoderCurvature(ctx, canvas, h) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < 160; i += 1) {
    const u = -2.2 + (i / 159) * 4.4
    const [x, y] = decoderPoint(u)
    const curvature = decoderCurvature(u)
    ctx.fillStyle = `rgba(255, 195, 92, ${Math.min(0.9, curvature * 2.8)})`
    ctx.beginPath()
    ctx.arc(canvas.width / 2 + x * 85, canvas.height / 2 - y * 80, 3, 0, Math.PI * 2)
    ctx.fill()
  }
  const [px, py] = decoderPoint(h)
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath()
  ctx.arc(canvas.width / 2 + px * 85, canvas.height / 2 - py * 80, 8, 0, Math.PI * 2)
  ctx.fill()
}

function drawRetrievalHeatmap(ctx, canvas, qx, qy) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const centers = [
    [-0.9, -0.6],
    [0.8, -0.2],
    [-0.2, 0.9],
    [1.0, 0.8],
  ]
  for (let gx = -1.8; gx <= 1.8; gx += 0.1) {
    for (let gy = -1.2; gy <= 1.2; gy += 0.1) {
      const nearest = centers.reduce((best, c, idx) => {
        const d = (c[0] - gx) ** 2 + (c[1] - gy) ** 2
        return d < best.d ? { d, idx } : best
      }, { d: Infinity, idx: 0 }).idx
      const colors = ['rgba(130,233,255,0.18)','rgba(255,122,184,0.18)','rgba(161,255,122,0.18)','rgba(255,195,92,0.18)']
      ctx.fillStyle = colors[nearest]
      ctx.fillRect(canvas.width / 2 + gx * 120, canvas.height / 2 - gy * 95, 8, 8)
    }
  }
  centers.forEach(([x, y], i) => {
    ctx.fillStyle = ['#82e9ff','#ff7ab8','#a1ff7a','#ffc35c'][i]
    ctx.beginPath(); ctx.arc(canvas.width / 2 + x * 120, canvas.height / 2 - y * 95, 7, 0, Math.PI * 2); ctx.fill()
  })
  ctx.fillStyle = '#ffffff'
  ctx.beginPath(); ctx.arc(canvas.width / 2 + qx * 120, canvas.height / 2 - qy * 95, 7, 0, Math.PI * 2); ctx.fill()
}

function phaseTransitionError(dim) {
  return 0.95 * Math.exp(-0.22 * dim) + 0.32 / Math.max(dim - 2, 1.2)
}

function decoderCurvature(h) {
  const dy = 1.4 * Math.cos(1.4 * h) - 0.55 * Math.sin(2.2 * h)
  const ddy = -1.96 * Math.sin(1.4 * h) - 1.21 * Math.cos(2.2 * h)
  return Math.abs(ddy) / Math.pow(1 + dy * dy, 1.5)
}

function getSignalSpectrum() {
  return [4.5, 2.2, 1.15, 0.65, 0.34, 0.2, 0.12, 0.08]
}

function drawBottleneckSpectrum(ctx, canvas, spectrum, k) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const max = Math.max(...spectrum)
  spectrum.forEach((value, index) => {
    const h = (value / max) * 140
    ctx.fillStyle = index < k ? '#82e9ff' : 'rgba(255,255,255,0.15)'
    ctx.fillRect(60 + index * 60, canvas.height - 30 - h, 34, h)
  })
}

function drawCapacityCurves(ctx, canvas, curves, selectedCapacity) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const all = curves.flatMap((c) => [c.train, c.test])
  const max = Math.max(...all)
  const min = Math.min(...all)
  const drawSeries = (key, color) => {
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.beginPath()
    curves.forEach((item, i) => {
      const x = 60 + i * 52
      const y = canvas.height - 35 - ((item[key] - min) / (max - min || 1)) * 150
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
  }
  drawSeries('train', '#a1ff7a')
  drawSeries('test', '#ff7ab8')
  const current = curves.find((c) => c.c === selectedCapacity)
  const x = 60 + (selectedCapacity - 1) * 52
  const y = canvas.height - 35 - ((current.test - min) / (max - min || 1)) * 150
  ctx.fillStyle = '#ffffff'
  ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill()
}

function drawFamilyObjective(ctx, canvas, mode, descriptions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const { rec, reg } = descriptions[mode]
  ctx.fillStyle = '#82e9ff'
  ctx.fillRect(70, canvas.height - 40 - rec * 120, 120, rec * 120)
  ctx.fillStyle = '#ff7ab8'
  ctx.fillRect(250, canvas.height - 40 - reg * 120, 120, reg * 120)
  ctx.fillStyle = '#ffffff'
  ctx.fillText('reconstruction term', 65, canvas.height - 12)
  ctx.fillText('regularizer term', 255, canvas.height - 12)
}

function drawStochasticPosterior(ctx, canvas, muX, muY, sigma, seed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const sx = canvas.width / 8
  const sy = canvas.height / 6
  const cx = canvas.width / 2 + muX * sx
  const cy = canvas.height / 2 - muY * sy
  ctx.strokeStyle = '#a1ff7a'
  ctx.beginPath()
  ctx.ellipse(cx, cy, sigma * sx, sigma * sy, 0, 0, Math.PI * 2)
  ctx.stroke()
  for (let i = 0; i < 28; i += 1) {
    const ex = pseudoNormal(i + seed * 3)
    const ey = pseudoNormal(i + seed * 5 + 9)
    ctx.fillStyle = 'rgba(130,233,255,0.8)'
    ctx.beginPath()
    ctx.arc(cx + ex * sigma * sx, cy - ey * sigma * sy, 3, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2); ctx.fill()
}

function drawChallengeGuide(ctx, canvas, filter, latent, config) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = 'rgba(255,255,255,0.14)'
  ctx.strokeRect(24, 20, canvas.width - 48, canvas.height - 40)
  const tx = 24 + ((config.targetFilter - 30) / 60) * (canvas.width - 48)
  const ty = 20 + ((config.targetLatent - 1) / 7) * (canvas.height - 40)
  const cx = 24 + ((filter - 30) / 60) * (canvas.width - 48)
  const cy = 20 + ((latent - 1) / 7) * (canvas.height - 40)
  ctx.fillStyle = '#a1ff7a'
  ctx.beginPath(); ctx.arc(tx, ty, 8, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(cx, cy); ctx.stroke()
}

function manifoldPointScalar(t) {
  return [t * 5, Math.sin(t * Math.PI * 1.2) + 0.12 * Math.sin(t * 5)]
}

function manifoldTangentScalar(t) {
  const dx = 5
  const dy = 1.2 * Math.PI * Math.cos(t * Math.PI * 1.2) + 0.6 * Math.cos(t * 5)
  const len = Math.hypot(dx, dy) || 1
  return [dx / len, dy / len]
}

function drawFlowCompression(ctx, canvas, raw, code, recon) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const drawSeries = (series, x, color, label) => {
    ctx.fillStyle = '#ffffff'
    ctx.fillText(label, x, 24)
    series.forEach((value, i) => {
      const h = value * 90
      ctx.fillStyle = color
      ctx.fillRect(x + i * 28, canvas.height - 26 - h, 18, h)
    })
  }
  drawSeries(raw, 40, '#82e9ff', 'input x')
  drawSeries(code, 250, '#ffc35c', 'code h')
  drawSeries(recon, 390, '#ff7ab8', 'reconstruction r')
}

function vectorDistance(a, b) {
  let total = 0
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) total += Math.abs(a[i] - b[i])
  return total
}

function matrixDistance(a, b) {
  let total = 0
  for (let r = 0; r < a.length; r += 1) {
    for (let c = 0; c < a[r].length; c += 1) {
      total += Number(a[r][c] !== b[r][c])
    }
  }
  return total
}

function renderPosteriorCollapseLab(root) {
  const collapse = state.collapseLevel ?? 0.45
  root.innerHTML = `
    <label class="control">
      <span>collapse level: <strong>${collapse.toFixed(2)}</strong></span>
      <input type="range" min="0" max="100" value="${Math.round(collapse * 100)}" id="collapse-level" />
    </label>
    <canvas id="collapse-canvas" width="620" height="300" class="scene-canvas"></canvas>
    <div class="compare-bars">
      <div><span>latent information</span><div class="bar"><i style="width:${(1 - collapse) * 100}%"></i></div><strong>${(1 - collapse).toFixed(2)}</strong></div>
      <div><span>prior pull</span><div class="bar compact"><i style="width:${collapse * 100}%"></i></div><strong>${collapse.toFixed(2)}</strong></div>
    </div>
  `
  root.querySelector('#collapse-level').addEventListener('input', (event) => {
    state.collapseLevel = Number(event.target.value) / 100
    markInteractionExplored('posteriorCollapseLab')
    rerender('posteriorCollapseLab')
  })
  drawPosteriorCollapse(root.querySelector('#collapse-canvas').getContext('2d'), root.querySelector('#collapse-canvas'), collapse)
}

function renderNoiseFrontierLab(root) {
  const robustness = state.robustnessLevel ?? 0.62
  const noise = state.frontierNoise ?? 0.48
  root.innerHTML = `
    <label class="control">
      <span>robustness: <strong>${robustness.toFixed(2)}</strong></span>
      <input type="range" min="0" max="100" value="${Math.round(robustness * 100)}" id="frontier-robust" />
    </label>
    <label class="control">
      <span>noise: <strong>${noise.toFixed(2)}</strong></span>
      <input type="range" min="0" max="100" value="${Math.round(noise * 100)}" id="frontier-noise" />
    </label>
    <canvas id="frontier-canvas" width="620" height="300" class="scene-canvas"></canvas>
  `
  root.querySelector('#frontier-robust').addEventListener('input', (event) => {
    state.robustnessLevel = Number(event.target.value) / 100
    markInteractionExplored('noiseFrontierLab')
    rerender('noiseFrontierLab')
  })
  root.querySelector('#frontier-noise').addEventListener('input', (event) => {
    state.frontierNoise = Number(event.target.value) / 100
    markInteractionExplored('noiseFrontierLab')
    rerender('noiseFrontierLab')
  })
  drawNoiseFrontier(root.querySelector('#frontier-canvas').getContext('2d'), root.querySelector('#frontier-canvas'), robustness, noise)
}

function renderChartStitchingLab(root) {
  const overlap = state.chartOverlap ?? 0.45
  root.innerHTML = `
    <label class="control">
      <span>chart overlap: <strong>${overlap.toFixed(2)}</strong></span>
      <input type="range" min="5" max="95" value="${Math.round(overlap * 100)}" id="chart-overlap" />
    </label>
    <canvas id="chart-canvas" width="620" height="300" class="scene-canvas"></canvas>
  `
  root.querySelector('#chart-overlap').addEventListener('input', (event) => {
    state.chartOverlap = Number(event.target.value) / 100
    markInteractionExplored('chartStitchingLab')
    rerender('chartStitchingLab')
  })
  drawChartStitching(root.querySelector('#chart-canvas').getContext('2d'), root.querySelector('#chart-canvas'), overlap)
}

function renderLatentClusterSeparationLab(root) {
  const margin = state.clusterMargin ?? 0.55
  root.innerHTML = `
    <label class="control">
      <span>cluster margin: <strong>${margin.toFixed(2)}</strong></span>
      <input type="range" min="10" max="120" value="${Math.round(margin * 100)}" id="cluster-margin" />
    </label>
    <canvas id="cluster-canvas" width="620" height="300" class="scene-canvas"></canvas>
  `
  root.querySelector('#cluster-margin').addEventListener('input', (event) => {
    state.clusterMargin = Number(event.target.value) / 100
    markInteractionExplored('latentClusterSeparationLab')
    rerender('latentClusterSeparationLab')
  })
  drawClusterSeparation(root.querySelector('#cluster-canvas').getContext('2d'), root.querySelector('#cluster-canvas'), margin)
}

function drawPhaseTransition(ctx, canvas, values, selected) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const maxV = Math.max(...values)
  const minV = Math.min(...values)
  ctx.strokeStyle = '#82e9ff'
  ctx.lineWidth = 3
  ctx.beginPath()
  values.forEach((v, i) => {
    const x = 70 + i * 60
    const y = canvas.height - 40 - ((v - minV) / (maxV - minV || 1)) * 180
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  })
  ctx.stroke()
  const idx = selected - 1
  const x = 70 + idx * 60
  const y = canvas.height - 40 - ((values[idx] - minV) / (maxV - minV || 1)) * 180
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill()
}

function drawPosteriorCollapse(ctx, canvas, collapse) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const cx = canvas.width / 2
  const cy = canvas.height / 2
  const spread = 70 * (1 - collapse) + 20
  for (let i = 0; i < 36; i += 1) {
    const angle = (i / 36) * Math.PI * 2
    const r = spread * (0.4 + (i % 5) * 0.12)
    ctx.fillStyle = 'rgba(130,233,255,0.75)'
    ctx.beginPath(); ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r * 0.7, 3, 0, Math.PI * 2); ctx.fill()
  }
  ctx.fillStyle = '#ff7ab8'
  ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2); ctx.fill()
}

function drawNoiseFrontier(ctx, canvas, robustness, noise) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let ix = 0; ix < 80; ix += 1) {
    for (let iy = 0; iy < 50; iy += 1) {
      const n = ix / 79
      const r = iy / 49
      const safe = r > n * 0.85
      ctx.fillStyle = safe ? 'rgba(161,255,122,0.18)' : 'rgba(255,122,184,0.18)'
      ctx.fillRect(40 + ix * 6, 30 + iy * 4, 6, 4)
    }
  }
  ctx.fillStyle = '#ffffff'
  ctx.beginPath(); ctx.arc(40 + noise * 79 * 6, 30 + (1 - robustness) * 49 * 4, 7, 0, Math.PI * 2); ctx.fill()
}

function drawChartStitching(ctx, canvas, overlap) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const centers = [140, 270, 400, 530]
  centers.forEach((x, i) => {
    ctx.fillStyle = ['rgba(130,233,255,0.22)','rgba(255,122,184,0.22)','rgba(161,255,122,0.22)','rgba(255,195,92,0.22)'][i]
    ctx.beginPath()
    ctx.ellipse(x, canvas.height / 2, 90 + overlap * 30, 52, 0, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.strokeStyle = '#ffffff'
  ctx.beginPath(); ctx.moveTo(80, 150); ctx.quadraticCurveTo(310, 40, 540, 170); ctx.stroke()
}

function drawClusterSeparation(ctx, canvas, margin) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#07111d'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  const centers = [
    [-margin, -0.45, '#82e9ff'],
    [margin, -0.2, '#ff7ab8'],
    [0.2, margin, '#a1ff7a'],
  ]
  centers.forEach(([x, y, color], cidx) => {
    for (let i = 0; i < 22; i += 1) {
      const angle = (i / 22) * Math.PI * 2
      const r = 0.12 + (i % 4) * 0.04
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(canvas.width / 2 + (x + Math.cos(angle) * r) * 160, canvas.height / 2 - (y + Math.sin(angle) * r) * 120, 3, 0, Math.PI * 2)
      ctx.fill()
    }
  })
}
