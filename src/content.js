export const chapters = [
  {
    id: 'intro',
    section: 'Page 1 / 19',
    title: '오토인코더, 왜 "복사기"인데도 똑똑할까?',
    badge: 'Hook',
    focus: '오토인코더의 큰 그림',
    summary:
      '오토인코더는 입력 x를 다시 출력으로 복원하려는 신경망이지만, 진짜 목적은 복사 그 자체가 아니라 중요한 구조를 압축해서 배우는 데 있습니다.',
    easy:
      '핵심만 메모했다가 다시 설명하는 학생처럼, 오토인코더는 전체를 그대로 들고 가지 못하게 제약을 줘야 제대로 배웁니다.',
    paper:
      'Deep Learning Book 14장은 encoder f(x), code h, decoder g(h) 구조를 통해 reconstruction을 만들고, 이 제약이 표현 학습으로 이어진다고 설명합니다.',
    analogy: '긴 회의 내용을 한 장 메모로 줄였다가 다시 팀원에게 설명하는 상황',
    bullets: ['입력 x → 코드 h → 복원 r', '제약이 없으면 그냥 외우기 쉽다', '제약이 생기면 중요한 특징만 남긴다'],
    misconception: '재구성만 잘하면 무조건 좋은 모델이다.',
    correction: '아닙니다. 무엇을 남기고 무엇을 버렸는지가 더 중요합니다.',
    interaction: 'flow'
  },
  {
    id: 'anatomy',
    section: 'Page 2 / 19',
    title: 'Encoder → Code → Decoder 구조를 눈으로 보기',
    badge: 'Structure',
    focus: '오토인코더의 세 파트',
    summary:
      '오토인코더는 입력을 숨은 코드로 바꾸는 encoder와, 코드를 다시 복원으로 바꾸는 decoder로 나뉩니다.',
    easy:
      '입력은 원본 물건, code는 압축 상자, decoder는 상자를 열어 원래 모양을 최대한 되살리는 사람이라고 생각하면 쉽습니다.',
    paper:
      '책에서는 h = f(x), r = g(h)로 두 함수를 분리해 설명하고, 현대적 버전에서는 확률적 encoder/decoder로도 확장됩니다.',
    analogy: '택배 포장 센터에서 물건을 상자에 넣고 다시 꺼내는 컨베이어 시스템',
    bullets: ['encoder는 정보를 요약한다', 'code는 병목이자 표현 공간이다', 'decoder는 복원 품질로 학습을 이끈다'],
    misconception: 'encoder가 중요한 부분이고 decoder는 덤이다.',
    correction: 'decoder가 있어야 reconstruction loss가 생기고, 그 loss가 encoder를 훈련시킵니다.',
    interaction: 'flow'
  },
  {
    id: 'bottleneck',
    section: 'Page 3 / 19',
    title: '병목은 왜 좋은가: 일부러 불편하게 만들어 핵심을 배우기',
    badge: 'Intuition',
    focus: '병목 제약의 필요성',
    summary:
      '입력보다 더 작은 표현 공간을 강제하면, 모델은 중요하지 않은 잡정보를 포기하고 핵심 패턴을 남길 가능성이 커집니다.',
    easy:
      '여행 가방이 작으면 꼭 필요한 물건만 넣게 되는 것처럼, 작은 code는 정보 정리를 강제합니다.',
    paper:
      '14.1은 undercomplete autoencoder가 salient features를 잡아내게 만든다고 설명합니다.',
    analogy: 'A4 한 장 요약본만 허용되는 시험 준비',
    bullets: ['작은 code = 강한 압축', '압축은 우선순위를 만든다', '손실은 남겨야 할 정보를 고르게 만든다'],
    misconception: '차원을 줄이면 항상 좋은 표현이 생긴다.',
    correction: '무조건은 아닙니다. 모델 용량과 데이터 구조에 따라 실패할 수도 있습니다.',
    interaction: 'bottleneck'
  },
  {
    id: 'undercomplete',
    section: 'Page 4 / 19',
    title: 'Undercomplete Autoencoder: 입력보다 작은 코드',
    badge: '14.1',
    focus: '차원 축소와 salient feature',
    summary:
      'undercomplete autoencoder는 code 차원을 입력보다 작게 두어, 데이터의 가장 중요한 축만 남기게 만듭니다.',
    easy:
      '넓은 장면을 몇 개의 키워드로 줄이는 뉴스 헤드라인 생성기처럼 핵심 특징을 남깁니다.',
    paper:
      'MSE와 선형 decoder에서는 PCA와 같은 subspace를 배우지만, 비선형 함수가 들어가면 더 복잡한 구조도 표현할 수 있습니다.',
    analogy: '길고 복잡한 문장을 짧은 제목으로 줄이는 일',
    bullets: ['입력보다 code가 작다', '선형이면 PCA와 닮는다', '비선형이면 더 풍부한 구조를 담는다'],
    misconception: 'undercomplete면 자동으로 일반화가 보장된다.',
    correction: 'encoder/decoder가 너무 강하면 사실상 외우기에 가까운 해법도 찾을 수 있습니다.',
    interaction: 'bottleneck'
  },
  {
    id: 'phase-transition-lab',
    section: 'Technical Lab',
    title: 'Bottleneck Phase Transition Lab: 차원이 바뀔 때 오차가 갑자기 꺾이는 지점',
    badge: 'Tech Lab',
    focus: 'dimension vs error curve',
    summary:
      '이 페이지는 bottleneck 차원을 1,2,3,… 늘려 갈 때 reconstruction error가 어느 지점에서 급격히 줄어드는지 곡선으로 보여 줍니다.',
    easy:
      '가방 칸 수를 조금씩 늘려 보면서, 어느 순간부터 갑자기 짐이 훨씬 잘 들어가는지 보는 실험입니다.',
    paper:
      'undercomplete intuition을 더 수량화해, 표현 차원이 늘어날 때 성능이 매끄럽게가 아니라 꺾이는 형태로 좋아질 수 있음을 보여 줍니다.',
    analogy: '작은 선반에 물건을 놓다가 칸 하나가 더 생기자 갑자기 훨씬 정리가 쉬워지는 장면',
    bullets: ['dimension sweep', 'error kink', 'representation threshold'],
    misconception: '차원을 하나 늘릴 때마다 성능은 항상 비슷한 폭으로 좋아진다.',
    correction: '데이터 구조에 따라 특정 차원에서 오차가 급격히 줄어드는 전이점처럼 보일 수 있습니다.',
    interaction: 'phaseTransitionLab'
  },
  {
    id: 'pca',
    section: 'Page 5 / 19',
    title: 'PCA와 닮은 점, 다른 점',
    badge: 'Connection',
    focus: '선형 AE와 PCA',
    summary:
      '선형 encoder/decoder와 MSE 손실에서는 undercomplete autoencoder가 PCA가 찾는 principal subspace를 배우는 것으로 알려져 있습니다.',
    easy:
      '직선 자로 데이터를 눌러 담는 것이 PCA라면, 비선형 autoencoder는 휘어진 자도 쓸 수 있다고 보면 됩니다.',
    paper:
      '14.1은 linear case에서 PCA와 같은 subspace를 배운다고 강조하고, nonlinear case는 그 일반화라고 봅니다.',
    analogy: '평평한 지도와 접히는 지도',
    bullets: ['PCA는 선형 압축', 'nonlinear AE는 휘어진 구조도 표현', '같은 reconstruction objective에서 출발'],
    misconception: 'PCA와 오토인코더는 완전히 별개의 세계다.',
    correction: '기본 아이디어는 연결되어 있고, 표현력 차이가 주요 차이입니다.',
    interaction: 'arena'
  },
  {
    id: 'linear-projection',
    section: 'Technical Lab',
    title: 'Linear AE / PCA Projection Lab: 진짜 투영 오차를 눈으로 보기',
    badge: 'Tech Lab',
    focus: '선형 autoencoder와 직교 투영',
    summary:
      '이 페이지는 2차원 점들을 1차원 선으로 직교 투영해, 선형 autoencoder가 왜 PCA와 연결되는지 더 기술적으로 정확하게 보여줍니다.',
    easy:
      '점들을 한 줄 위로 내려놓는다고 생각하면 됩니다. 그 줄이 데이터를 가장 잘 대표할수록 평균 제곱 오차가 작아집니다.',
    paper:
      '14.1의 linear autoencoder ↔ PCA 연결을 실제 projection error 형태로 체험할 수 있게 만든 페이지입니다.',
    analogy: '흩어진 물건을 가장 덜 잃어버리게 한 줄 선반 위에 올려놓는 실험',
    bullets: ['직교 투영', '재구성 오차', '주성분 방향과의 연결'],
    misconception: '선형 AE가 그냥 임의의 선 하나를 고르는 것뿐이다.',
    correction: '핵심은 reconstruction error를 최소화하는 방향을 찾는 것이고, 그것이 PCA의 주축과 이어집니다.',
    interaction: 'linearProjection'
  },
  {
    id: 'pca-error-surface',
    section: 'Technical Lab',
    title: 'PCA Error Surface Lab: angle에 따른 MSE 곡선을 직접 보기',
    badge: 'Tech Lab',
    focus: '재구성 오차 지형',
    summary:
      '이 페이지는 1차원 선형 subspace의 각도에 따라 reconstruction MSE가 어떻게 바뀌는지 전 구간으로 그려 보여 줍니다.',
    easy:
      '한 줄을 이리저리 돌려 보며, 어느 각도에서 점들을 가장 덜 놓치는지 에너지 지형처럼 보는 실험입니다.',
    paper:
      '14.1의 linear autoencoder와 PCA 연결을 “최적 축은 오차 곡면의 최소점”이라는 관점으로 더 분명하게 보여 줍니다.',
    analogy: '산 능선 중에서 가장 낮은 고개를 찾는 지도 읽기',
    bullets: ['MSE(theta)', 'global minimum', 'current vs best axis'],
    misconception: '좋은 축은 눈대중으로만 고른다.',
    correction: '실제로는 각도별 reconstruction error를 계산해 최소점을 찾는 최적화 문제로 볼 수 있습니다.',
    interaction: 'pcaErrorSurface'
  },
  {
    id: 'rank-k-linear-ae-lab',
    section: 'Technical Lab',
    title: 'Rank-k Linear AE Lab: WᵀW가 점구름을 어떻게 바꾸는지 보기',
    badge: 'Tech Lab',
    focus: '선형 autoencoder의 reconstruction operator',
    summary:
      '이 페이지는 rank-1 / rank-2 선형 autoencoder가 점구름을 어떤 subspace로 보내는지, 그리고 WᵀW가 어떻게 deformation operator처럼 작동하는지 시각화합니다.',
    easy:
      '점들을 한두 개의 축만 남기는 필터를 통과시킨 뒤, 다시 원래 공간으로 펼치는 기계라고 생각하면 됩니다.',
    paper:
      '14.1의 linear autoencoder를 투영뿐 아니라 reconstruction matrix 관점으로 다시 설명하는 페이지입니다.',
    analogy: '넓은 그림을 몇 개의 자만 남겨 다시 그리는 프로젝터 장치',
    bullets: ['rank-1 vs rank-2', 'WᵀW operator', 'point cloud reconstruction'],
    misconception: '선형 AE는 그냥 PCA 선 하나만 보여 주는 기법이다.',
    correction: '실제로는 encoder와 decoder가 만드는 reconstruction operator 전체로 볼 수 있고, rank가 달라지면 복원 구조도 달라집니다.',
    interaction: 'rankKLinearAELab'
  },
  {
    id: 'orthogonality-lab',
    section: 'Technical Lab',
    title: 'Orthogonality Lab: basis가 직교할수록 왜 깔끔해지는가',
    badge: 'Tech Lab',
    focus: 'basis rotation과 dot product',
    summary:
      '이 페이지는 두 basis 벡터의 각도를 바꾸며 dot product와 reconstruction 안정성이 어떻게 달라지는지 보여 줍니다.',
    easy:
      '두 자가 서로 비스듬히 겹칠수록 역할이 섞이고, 직각에 가까울수록 각자 맡은 방향이 또렷해진다고 보면 됩니다.',
    paper:
      '선형 표현 학습에서 basis의 분리가 왜 유리한지, 그리고 projection 해석이 왜 깔끔해지는지 시각적으로 보강하는 페이지입니다.',
    analogy: '서로 거의 겹치는 자 두 개보다, 직각자로 재는 것이 훨씬 명확한 도면 작업',
    bullets: ['basis angle', 'dot product', 'axis separation'],
    misconception: 'basis 두 개는 방향만 있으면 되고 서로 거의 겹쳐도 문제없다.',
    correction: '기저가 너무 비슷하면 표현이 중복되고, 분해와 재구성이 덜 안정적이 될 수 있습니다.',
    interaction: 'orthogonalityLab'
  },
  {
    id: 'capacity-trap',
    section: 'Page 6 / 19',
    title: '모델이 너무 강하면 벌어지는 일: identity trap',
    badge: 'Warning',
    focus: '용량 과다와 외우기',
    summary:
      'encoder와 decoder가 너무 강하면, 유용한 구조를 배우지 않고도 입력을 거의 그대로 재생산할 수 있습니다.',
    easy:
      '문제 원리를 이해하지 않고 답안지를 통째로 외워 시험을 보는 학생과 비슷합니다.',
    paper:
      '책은 이론적으로 매우 작은 code라도 powerful nonlinear mapping이 있으면 training examples를 사실상 index처럼 암기할 수 있다고 경고합니다.',
    analogy: '문장 의미 대신 파일 번호표만 저장하는 비서',
    bullets: ['낮은 reconstruction error ≠ 좋은 표현', 'capacity가 크면 trivial identity 가능', 'regularization이 필요한 이유'],
    misconception: '재구성이 완벽하면 최고의 autoencoder다.',
    correction: '완벽한 재구성만 노리면 표현 학습이 아니라 암기가 될 수 있습니다.',
    interaction: 'capacity'
  },
  {
    id: 'mutual-info-lab',
    section: 'Technical Lab',
    title: 'Mutual Information Budget Lab: bottleneck가 담을 수 있는 정보량 보기',
    badge: 'Tech Lab',
    focus: '정보 병목과 SNR',
    summary:
      '이 페이지는 Gaussian channel 근사 I ≈ 0.5 log2(1 + SNR)를 사용해, bottleneck 차원과 노이즈 수준이 정보량 예산을 어떻게 바꾸는지 보여 줍니다.',
    easy:
      '통로가 좁고 시끄러울수록 보낼 수 있는 정보가 줄어든다고 생각하면 됩니다.',
    paper:
      'undercomplete와 bottleneck intuition을 정보량 관점으로 다시 해석해, 왜 작은 code가 중요한 구조를 고르게 만드는지 더 기술적으로 보여 줍니다.',
    analogy: '좁고 잡음 많은 전화선으로는 핵심 메시지만 보내야 하는 상황',
    bullets: ['SNR', 'information budget', 'bottleneck dimension'],
    misconception: '차원만 줄이면 정보가 얼마나 줄어드는지는 전혀 생각할 필요가 없다.',
    correction: '차원 수와 노이즈 수준은 실제로 표현이 담을 수 있는 정보량 예산을 함께 바꿉니다.',
    interaction: 'mutualInfoLab'
  },
  {
    id: 'regularized',
    section: 'Page 7 / 19',
    title: 'Regularized Autoencoder: 제약을 loss에 집어넣기',
    badge: '14.2',
    focus: '정규화 가족 전체 그림',
    summary:
      'code 차원을 줄이지 않아도, sparsity·robustness·small derivatives 같은 성질을 loss에 추가해 유용한 표현을 강제할 수 있습니다.',
    easy:
      '방은 넓지만, 정리 규칙을 엄격히 적용해서 물건을 아무 데나 두지 못하게 만드는 창고 규칙과 비슷합니다.',
    paper:
      '14.2는 sparse, denoising, derivative penalty를 하나의 가족으로 소개하며 overcomplete에서도 의미 있는 표현을 배울 수 있다고 설명합니다.',
    analogy: '큰 체육관에서도 줄 맞춰 서게 만드는 규칙',
    bullets: ['차원 축소만이 답은 아니다', '손실 함수에 원하는 성질을 추가', '표현의 모양을 직접 디자인'],
    misconception: 'code가 크면 무조건 나쁘다.',
    correction: '정규화가 있으면 큰 code도 유용한 구조를 배울 수 있습니다.',
    interaction: 'family'
  },
  {
    id: 'loss-landscape-lab',
    section: 'Technical Lab',
    title: 'Loss Landscape Lab: θ와 λ가 objective를 어떻게 바꾸는지 보기',
    badge: 'Tech Lab',
    focus: '재구성 오차 + sparsity objective',
    summary:
      '이 페이지는 선형 projection 각도 θ와 shrinkage 강도 λ를 함께 바꾸며, objective가 어떻게 달라지는지 heatmap으로 보여 줍니다.',
    easy:
      '모델 설정을 이리저리 바꿨을 때 점수가 얼마나 좋아지거나 나빠지는지 지형도로 보는 실험입니다.',
    paper:
      '14.2의 regularized objective 감각을, reconstruction과 sparsity가 함께 만드는 loss surface로 시각화한 페이지입니다.',
    analogy: '지도를 보며 가장 낮은 골짜기 지점을 찾는 하이킹 계획',
    bullets: ['objective slice', 'theta-lambda grid', 'current marker'],
    misconception: 'regularization은 그냥 덤으로 붙는 패널티다.',
    correction: 'regularization은 실제로 최적화 지형 자체를 바꾸고, 어떤 해가 선택되는지를 직접 바꿉니다.',
    interaction: 'lossLandscapeLab'
  },
  {
    id: 'sparse',
    section: 'Page 8 / 19',
    title: 'Sparse Autoencoder: 많은 뉴런을 잠재우기',
    badge: '14.2.1',
    focus: '희소 활성화',
    summary:
      'sparse autoencoder는 reconstruction error 외에 code의 sparsity penalty를 더해, 일부 뉴런만 강하게 켜지도록 유도합니다.',
    easy:
      '큰 사무실에서 필요한 구역 조명만 켜지는 스마트 조명처럼, 정말 필요한 feature detector만 반응하게 만듭니다.',
    paper:
      '책은 Ω(h) sparsity penalty를 통해 identity solution을 피하고, downstream task에 쓸 만한 feature를 얻는다고 설명합니다.',
    analogy: '스마트 조명 시스템',
    bullets: ['활성 뉴런 수를 줄인다', '선택적 반응을 유도한다', 'feature learning에 자주 활용된다'],
    misconception: '희소성은 그냥 0이 많다는 뜻이다.',
    correction: '어떤 입력에서 어떤 뉴런이 선택적으로 켜지는지가 핵심입니다.',
    interaction: 'sparse'
  },
  {
    id: 'generative-view',
    section: 'Page 9 / 19',
    title: '희소성의 생성모델 관점: 왜 sparse가 말이 되는가?',
    badge: 'Latent View',
    focus: 'latent prior 직관',
    summary:
      'sparse penalty는 “드문 코드가 더 그럴듯하다”는 latent prior 직관으로도 이해할 수 있어, 단순 규칙 이상의 의미를 가집니다.',
    easy:
      '모든 센서가 동시에 켜지기보다 몇 개만 반응하는 상황이 더 자연스럽다고 가정하는 셈입니다.',
    paper:
      '14.2.1은 p_model(h)의 log-prior와 sparsity penalty의 연결을 보여주며 latent variable model 관점과 이어 줍니다.',
    analogy: '필요한 경보만 울리는 보안실',
    bullets: ['sparsity는 function preference다', 'latent prior와 연결된다', '생성모델 감각으로 이해 가능'],
    misconception: '희소 패널티는 그냥 억지 규칙이다.',
    correction: 'latent representation에 대한 선호를 표현하는 합리적인 가정으로 볼 수 있습니다.',
    interaction: 'sparse'
  },
  {
    id: 'sparse-threshold',
    section: 'Technical Lab',
    title: 'Sparse Threshold Lab: L1 penalty가 code를 어떻게 깎는가',
    badge: 'Tech Lab',
    focus: 'soft-thresholding과 희소성',
    summary:
      '이 페이지는 pre-activation z에 soft-thresholding을 적용해, L1 형태의 sparsity pressure가 어떤 좌표를 0으로 만들고 어떤 좌표를 남기는지 더 정확하게 보여줍니다.',
    easy:
      '작은 신호는 아예 꺼 버리고, 큰 신호만 남기는 문턱값 필터라고 생각하면 됩니다.',
    paper:
      '14.2.1의 sparse prior 직관을 실제 coordinate shrinkage 관점으로 보여 주는 페이지입니다.',
    analogy: '볼륨이 작은 잡음은 음소거하고, 중요한 소리만 남기는 오디오 게이트',
    bullets: ['soft threshold', 'L1-like shrinkage', 'code sparsity'],
    misconception: '희소성은 그냥 무작정 0을 많이 만드는 규칙이다.',
    correction: '실제로는 작은 활성은 줄이고, 큰 활성은 상대적으로 남기는 구조적 shrinkage로 이해하는 편이 정확합니다.',
    interaction: 'sparseThreshold'
  },
  {
    id: 'ista-lab',
    section: 'Technical Lab',
    title: 'ISTA Sparse Coding Lab: 반복 추론으로 code를 찾기',
    badge: 'Tech Lab',
    focus: 'iterative sparse inference',
    summary:
      '이 페이지는 ISTA 업데이트를 한 단계씩 적용하며 sparse code가 residual을 줄이는 방향으로 어떻게 정리되는지 보여 줍니다.',
    easy:
      '정답을 한 번에 찍는 대신, 조금씩 고쳐 가며 sparse code를 다듬는 반복 계산이라고 생각하면 됩니다.',
    paper:
      '14.2.1의 sparse encoding 감각을 실제 iterative inference 관점으로 연결하는 페이지입니다.',
    analogy: '조각난 퍼즐을 한 번에 맞추지 않고, 틀린 조각을 조금씩 바꿔 가며 맞추는 과정',
    bullets: ['ISTA update', 'soft-thresholding', 'residual norm'],
    misconception: '희소 code는 항상 한 번 계산으로 바로 나온다.',
    correction: '실제 sparse coding에서는 반복 최적화로 code를 추론하는 관점이 매우 중요합니다.',
    interaction: 'istaLab'
  },
  {
    id: 'stochastic',
    section: 'Page 10 / 19',
    title: '결정론을 넘어: Stochastic Encoder / Decoder',
    badge: '14.4',
    focus: '확률적 매핑',
    summary:
      '현대 autoencoder는 deterministic 함수뿐 아니라 p(h|x), p(x|h) 같은 확률적 encoder/decoder로 확장될 수 있습니다.',
    easy:
      '같은 질문을 받아도 살짝 다른 요약을 만들 수 있는 사람처럼, 확률적 모델은 가능한 여러 code를 다룹니다.',
    paper:
      '책은 autoencoder가 latent variable model과 가까워지면서 stochastic mapping을 사용하는 방향으로 확장되었다고 설명합니다.',
    analogy: '같은 장면을 여러 화풍으로 스케치하는 화가',
    bullets: ['하나의 입력에도 여러 plausible code', '생성모델과 더 가까워진다', 'VAE 같은 모델의 다리 역할'],
    misconception: '확률적이면 설명력이 떨어진다.',
    correction: '오히려 불확실성과 다양한 가능성을 표현할 수 있어 더 풍부해질 수 있습니다.',
    interaction: 'stochastic'
  },
  {
    id: 'reparam-lab',
    section: 'Technical Lab',
    title: 'Reparameterization Lab: z = μ + σ ⊙ ε 를 시각적으로 보기',
    badge: 'Tech Lab',
    focus: '확률적 latent sampling',
    summary:
      '이 페이지는 평균 μ와 표준편차 σ를 가진 latent 분포에서 ε ~ N(0, I)를 끌어와 z를 만드는 과정을 점구름으로 보여 줍니다.',
    easy:
      '중심과 퍼짐 정도를 정해 두고, 무작위 점을 뽑아 latent 공간에 찍는 실험이라고 생각하면 됩니다.',
    paper:
      '14.4의 stochastic encoder/decoder 감각을 더 정확하게 이어 주는 페이지로, 확률적 latent sampling을 직접 시각화합니다.',
    analogy: '목표 지점 주변에 퍼진 후보 위치들을 랜덤하게 뽑아 보는 드론 투하 시뮬레이터',
    bullets: ['mu', 'sigma', 'epsilon sample', 'sample cloud'],
    misconception: '확률적 latent는 그냥 랜덤 노이즈를 더하는 것뿐이다.',
    correction: '핵심은 분포의 위치와 스케일을 분리하고, noise를 통해 미분 가능한 sampling 구조를 만드는 데 있습니다.',
    interaction: 'reparamLab'
  },
  {
    id: 'kl-lab',
    section: 'Technical Lab',
    title: 'KL Divergence Lab: posterior가 prior와 얼마나 다른지 보기',
    badge: 'Tech Lab',
    focus: 'posterior vs prior regularization',
    summary:
      '이 페이지는 2D Gaussian posterior q(z|x)의 중심과 퍼짐을 바꾸며, 표준정규 prior와의 KL divergence가 어떻게 커지는지 시각화합니다.',
    easy:
      '현재 latent 분포가 원점 중심의 기본 분포에서 얼마나 벗어났는지를 벌점처럼 측정하는 실험입니다.',
    paper:
      '14.4의 stochastic latent 직관을 더 기술적으로 이어 주며, 확률적 encoder가 분포 형태 자체를 조절한다는 점을 보여 줍니다.',
    analogy: '기본 규격 원 안에서 얼마나 벗어난 타원을 쓰고 있는지 재는 검사기',
    bullets: ['Gaussian posterior', 'prior match', 'KL cost'],
    misconception: '확률적 latent에서는 샘플만 중요하고 분포 모양은 중요하지 않다.',
    correction: '분포의 평균과 분산이 prior와 얼마나 다른지도 중요한 학습 신호가 됩니다.',
    interaction: 'klLab'
  },
  {
    id: 'beta-elbo-lab',
    section: 'Technical Lab',
    title: 'β-VAE ELBO Trade-off Lab: reconstruction과 KL의 줄다리기 보기',
    badge: 'Tech Lab',
    focus: 'ELBO 분해와 β 조절',
    summary:
      '이 페이지는 ELBO = reconstruction term + β·KL 항을 직접 조절하며, posterior 평균과 분산을 바꿀 때 objective가 어떻게 움직이는지 보여 줍니다.',
    easy:
      '설명을 자세히 적고 싶은 마음과, 너무 복잡한 코드를 쓰지 말라는 규칙이 동시에 작동하는 상황이라고 생각하면 됩니다.',
    paper:
      '확률적 오토인코더 계열에서 reconstruction과 latent regularization의 균형이 왜 중요한지, 그리고 β 값이 latent 압축 성향에 어떤 영향을 주는지 더 정량적으로 체감하게 해 줍니다.',
    analogy: '보고서를 길게 쓰면 정보는 많아지지만, 요약 규칙이 강할수록 핵심만 남겨야 하는 상황',
    bullets: ['ELBO decomposition', 'β scaling', 'μ·σ와 objective 균형'],
    misconception: 'KL을 줄이면 무조건 좋은 latent가 된다.',
    correction: 'KL이 너무 강하면 정보가 사라지고, reconstruction만 강하면 latent가 제멋대로 커질 수 있습니다.',
    interaction: 'betaVaeLab'
  },
  {
    id: 'correlated-posterior-lab',
    section: 'Technical Lab',
    title: 'Correlated Posterior Lab: 비스듬한 타원 posterior 보기',
    badge: 'Tech Lab',
    focus: 'correlated covariance geometry',
    summary:
      '이 페이지는 posterior의 상관계수를 바꾸며 축이 기울어진 Gaussian ellipse가 어떻게 생기는지 보여 줍니다.',
    easy:
      'x와 y가 따로 노는 게 아니라 같이 움직일 때, 점구름이 비스듬히 눕는다고 생각하면 됩니다.',
    paper:
      'stochastic latent를 더 풍부하게 해석하기 위해, diagonal이 아닌 correlated covariance 구조를 시각적으로 보여 주는 보강 페이지입니다.',
    analogy: '가로세로로 똑바른 구름이 아니라 바람을 타고 기울어진 연기 기둥',
    bullets: ['correlation', 'tilted ellipse', 'posterior geometry'],
    misconception: '확률적 latent의 퍼짐은 축 방향으로만 생각하면 충분하다.',
    correction: '상관이 생기면 분포는 회전된 타원 구조가 되고, latent geometry 해석도 달라집니다.',
    interaction: 'correlatedPosteriorLab'
  },
  {
    id: 'posterior-collapse-lab',
    section: 'Technical Lab',
    title: 'Posterior Collapse Lab: encoder가 prior로 무너질 때 보기',
    badge: 'Tech Lab',
    focus: 'posterior collapse intuition',
    summary:
      '이 페이지는 posterior mean과 variance가 점점 prior 쪽으로 끌려갈 때, latent가 정보를 덜 담고 reconstruction 다양성도 줄어드는 모습을 보여 줍니다.',
    easy:
      '모든 입력이 비슷한 latent 구름으로 몰리면, encoder가 사실상 별말 안 하고 있는 상태라고 생각하면 됩니다.',
    paper:
      'stochastic latent 설명을 더 발전시켜, 확률적 encoder가 지나치게 prior에 붙어 버릴 때 어떤 문제가 생기는지 시각화합니다.',
    analogy: '모든 학생이 서로 다른 답 대신 똑같은 기본 답안만 내는 시험장',
    bullets: ['posterior mean shrinkage', 'variance drift', 'information loss'],
    misconception: 'prior에 가까워질수록 항상 더 좋은 확률모형이다.',
    correction: 'prior regularization은 중요하지만, 지나치면 latent가 입력 정보를 거의 담지 못하는 collapse가 일어날 수 있습니다.',
    interaction: 'posteriorCollapseLab'
  },
  {
    id: 'anisotropic-prior-lab',
    section: 'Technical Lab',
    title: 'Anisotropic Gaussian Prior Lab: 타원이 된 prior를 시각화하기',
    badge: 'Tech Lab',
    focus: '공분산과 타원 등고선',
    summary:
      '이 페이지는 Gaussian의 분산과 상관계수를 바꾸며 prior의 등고선이 원에서 타원으로 어떻게 바뀌는지 보여 줍니다.',
    easy:
      '한 방향으로는 퍼지고, 다른 방향으로는 덜 퍼지는 분포를 타원으로 그려 보는 실험입니다.',
    paper:
      '확률적 latent 설명을 더 확장해, prior가 등방적이지 않을 때 latent geometry가 어떻게 달라지는지 보여 주는 보강 페이지입니다.',
    analogy: '동그란 풍선이 아니라 한쪽으로 길게 늘어난 풍선을 보는 장면',
    bullets: ['covariance ellipse', 'anisotropy', 'correlation'],
    misconception: 'Gaussian latent는 항상 동그란 구름처럼만 생각하면 된다.',
    correction: '분산이 축마다 다르거나 상관이 있으면 latent density는 타원형 구조를 가질 수 있습니다.',
    interaction: 'anisotropicPriorLab'
  },
  {
    id: 'latent-geometry-lab',
    section: 'Technical Lab',
    title: 'Latent Interpolation Geometry Lab: latent 사이를 어떻게 건너는가',
    badge: 'Tech Lab',
    focus: 'latent interpolation geometry',
    summary:
      '이 페이지는 latent 공간의 두 점 A, B 사이를 직선으로 이동할 때와, 곡선 manifold를 따라 이동할 때 decoder output이 어떻게 달라지는지 보여 줍니다.',
    easy:
      '두 지점을 직선으로 가로지르는 길과, 길을 따라 부드럽게 도는 길을 비교하는 실험이라고 보면 됩니다.',
    paper:
      'stochastic / latent representation 설명을 더 확장해, 좋은 latent 공간은 중간 경로도 자연스럽게 해석된다는 점을 시각적으로 보여 줍니다.',
    analogy: '지도에서 산을 가로지르는 지름길과 도로를 따라 도는 길을 비교하는 내비게이터',
    bullets: ['linear interpolation', 'curved path', 'decoded trajectory'],
    misconception: 'latent interpolation은 단순히 숫자를 평균내는 것뿐이라 의미가 약하다.',
    correction: '좋은 latent 공간에서는 중간 경로도 구조적으로 해석 가능하며, 경로 모양에 따라 decoded output이 달라질 수 있습니다.',
    interaction: 'latentGeometryLab'
  },
  {
    id: 'denoising',
    section: 'Page 11 / 19',
    title: 'Denoising Autoencoder: 일부러 망가뜨리고 복원하기',
    badge: '14.2.2 & 14.5',
    focus: '노이즈 제거를 통한 구조 학습',
    summary:
      '입력을 노이즈로 망가뜨린 뒤 원본을 복원하게 하면, 모델은 데이터의 본질적인 구조로 되돌리는 법을 배우게 됩니다.',
    easy:
      '지직거리는 전화 음성에서 원래 문장을 알아듣는 훈련과 비슷합니다.',
    paper:
      '14.5는 corrupted input x̃에서 clean input x를 복원하는 목적을 통해 robust representation이 형성된다고 설명합니다.',
    analogy: '오타가 섞인 문장을 원문으로 복구하는 맞춤법 교정기',
    bullets: ['노이즈를 넣고 원본을 맞춘다', 'manifold 근처로 되돌리는 힘이 생긴다', 'robust feature를 학습한다'],
    misconception: '노이즈는 학습을 방해하기만 한다.',
    correction: '적절한 노이즈는 오히려 본질을 배우게 만듭니다.',
    interaction: 'denoise'
  },
  {
    id: 'diffusion-schedule-lab',
    section: 'Technical Lab',
    title: 'Diffusion Noise Schedule Lab: step이 쌓일수록 신호가 어떻게 흐려지는가',
    badge: 'Tech Lab',
    focus: 'noise schedule과 signal decay',
    summary:
      '이 페이지는 여러 step에 걸쳐 신호가 조금씩 noise에 섞일 때, 원래 구조가 어떻게 사라지는지 시각화합니다.',
    easy:
      '유리창에 김이 서리듯, step이 늘어날수록 원래 점무늬가 점점 흐려지는 모습을 보는 실험입니다.',
    paper:
      'denoising 직관을 더 확장해, noise가 한 번에 아니라 여러 단계로 누적될 때 신호가 어떻게 약해지는지 보여 줍니다.',
    analogy: '맑은 사진 위에 반투명 안개를 여러 번 겹쳐 씌우는 과정',
    bullets: ['step count', 'signal decay', 'noise accumulation'],
    misconception: '노이즈는 한 번만 더해도 충분히 같은 현상이다.',
    correction: '여러 step의 누적은 신호 보존율과 복원 난도를 점진적으로 바꾸며, 단계별 구조를 더 명확히 드러냅니다.',
    interaction: 'diffusionScheduleLab'
  },
  {
    id: 'noise-frontier-lab',
    section: 'Technical Lab',
    title: 'Noise-Robustness Frontier Lab: 복원 성공선이 어디까지 버티는지 보기',
    badge: 'Tech Lab',
    focus: 'noise vs robustness frontier',
    summary:
      '이 페이지는 noise level과 model robustness를 함께 바꾸며, 복원이 되는 영역과 무너지는 영역의 경계선을 heatmap처럼 보여 줍니다.',
    easy:
      '얼마나 심한 잡음까지 버틸 수 있는지 안전선 지도를 보는 실험입니다.',
    paper:
      'denoising 직관을 더 실용적으로 확장해, 어떤 잡음 구간부터 구조 복원이 급격히 어려워지는지 보여 줍니다.',
    analogy: '폭우 강도에 따라 우산이 버틸 수 있는 한계를 표시한 날씨 경계도',
    bullets: ['noise level', 'robustness margin', 'failure boundary'],
    misconception: '노이즈가 늘어나면 성능은 항상 천천히만 나빠진다.',
    correction: '실제로는 특정 구간부터 복원이 급격히 무너지는 frontier가 나타날 수 있습니다.',
    interaction: 'noiseFrontierLab'
  },
  {
    id: 'score',
    section: 'Page 12 / 19',
    title: 'Score Estimation 직관: 어디로 돌아가야 할까?',
    badge: '14.5.1',
    focus: '데이터 밀도 방향',
    summary:
      'denoising autoencoder의 복원 방향은 데이터가 많은 쪽을 가리키는 벡터처럼 해석할 수 있어 score estimation과 연결됩니다.',
    easy:
      '언덕 위 공이 더 낮은 쪽으로 굴러가듯, noisy point는 데이터가 모인 방향으로 되돌아갑니다.',
    paper:
      '14.5.1은 denoising objective와 score matching 사이의 관계를 설명하며 복원 벡터장의 의미를 보여줍니다.',
    analogy: '사람이 많은 광장 쪽으로 발길이 자연스럽게 향하는 길안내 화살표',
    bullets: ['복원은 방향 정보도 준다', '밀도 높은 영역을 가리킨다', 'denoising이 단순 필터가 아님을 보여준다'],
    misconception: '복원은 픽셀 청소일 뿐이다.',
    correction: '복원 함수는 데이터 분포의 구조를 반영하는 방향장을 형성할 수 있습니다.',
    interaction: 'score'
  },
  {
    id: 'score-mixture',
    section: 'Technical Lab',
    title: 'Gaussian Mixture Score Lab: 진짜 score field 근사 보기',
    badge: 'Tech Lab',
    focus: '확률밀도 기울기와 denoising 방향',
    summary:
      '이 페이지는 간단한 가우시안 혼합분포를 기준으로 score ∇log p(x)를 계산해, 데이터가 많은 방향으로 끌리는 힘을 더 정확하게 보여줍니다.',
    easy:
      '사람이 많은 곳으로 향하는 화살표를 이번에는 감으로 그리는 대신, 실제 밀도 공식을 써서 계산해 보는 셈입니다.',
    paper:
      '14.5.1의 score estimation 연결을, 브라우저 안에서 계산 가능한 작은 확률모형으로 다시 보여줍니다.',
    analogy: '지도 위 군중 밀도를 보고, 가장 붐비는 쪽으로 향하는 길안내 벡터를 계산하는 상황',
    bullets: ['Gaussian mixture', 'score vector', 'noise scale 변화'],
    misconception: 'score field는 그냥 가까운 클러스터를 향한 화살표다.',
    correction: '정확한 score는 전체 확률밀도 로그의 기울기이며, 모든 성분의 기여를 함께 반영합니다.',
    interaction: 'scoreAccurate'
  },
  {
    id: 'vector-field-lab',
    section: 'Technical Lab',
    title: 'Denoising Vector Field Lab: noise scale에 따라 화살표장이 달라지기',
    badge: 'Tech Lab',
    focus: 'noise scale과 denoising vector field',
    summary:
      '이 페이지는 noise scale을 바꿨을 때 score/denoising vector field가 얼마나 넓고 부드럽게 퍼지는지 비교합니다.',
    easy:
      '노이즈가 약할 때와 강할 때, 점들을 되돌리는 화살표가 얼마나 멀리까지 영향을 주는지 보는 실험입니다.',
    paper:
      '14.5와 14.5.1의 denoising intuition을 noise level 변화까지 포함해서 더 시각적으로 보여 줍니다.',
    analogy: '약한 자석과 강한 자석이 주변 쇳조각을 얼마나 멀리서 끌어당기는지 비교하는 장면',
    bullets: ['noise scale', 'vector field smoothness', 'local vs global pull'],
    misconception: 'denoising vector field는 노이즈 세기와 무관하게 거의 같다.',
    correction: '노이즈 세기가 커지면 복원 방향장은 더 넓은 영역을 부드럽게 포괄하도록 바뀔 수 있습니다.',
    interaction: 'vectorFieldLab'
  },
  {
    id: 'langevin-lab',
    section: 'Technical Lab',
    title: 'Langevin Sampling Lab: score를 따라 실제로 한 걸음씩 움직이기',
    badge: 'Tech Lab',
    focus: 'score 기반 업데이트',
    summary:
      '이 페이지는 score vector를 실제 업데이트 식에 넣어, point가 데이터 밀도 높은 곳으로 어떻게 이동하는지 한 걸음씩 보여줍니다.',
    easy:
      '화살표를 보기만 하는 대신, 그 화살표를 따라 점을 실제로 움직여 본다고 생각하면 됩니다.',
    paper:
      '14.5와 14.5.1의 denoising/score 감각을 score-based step update 형태로 다시 체험하는 페이지입니다.',
    analogy: '안내 화살표를 보는 것에서 끝나지 않고, 그 방향으로 직접 걸어 보는 길찾기 실험',
    bullets: ['score step', 'step size', 'optional noise'],
    misconception: 'score vector는 설명용 화살표일 뿐 실제 업데이트와 무관하다.',
    correction: 'score는 실제 sampling 또는 denoising update 방향으로 쓸 수 있는 핵심 신호입니다.',
    interaction: 'langevinLab'
  },
  {
    id: 'representation',
    section: 'Page 13 / 19',
    title: '표현력은 어디서 오나: 너비, 깊이, 비선형성',
    badge: '14.3',
    focus: 'representation power',
    summary:
      '오토인코더의 표현력은 code 크기만으로 결정되지 않고, encoder/decoder의 깊이와 비선형성에도 크게 좌우됩니다.',
    easy:
      '같은 메모 길이라도 정리 실력이 좋은 사람과 아닌 사람의 품질 차이가 나는 것과 비슷합니다.',
    paper:
      '14.3은 layer size와 depth가 representation power에 어떤 차이를 만드는지 논의하며, shallow identity 근사 가능성도 다룹니다.',
    analogy: '같은 분량 메모를 더 잘 정리하는 숙련자',
    bullets: ['용량은 code 차원만이 아니다', '깊이와 비선형성도 중요', '강한 모델은 유용함과 위험을 함께 가진다'],
    misconception: 'code만 작으면 충분하다.',
    correction: '모델 전체 capacity를 봐야 합니다.',
    interaction: 'arena'
  },
  {
    id: 'manifold',
    section: 'Page 14 / 19',
    title: 'Manifold Learning: 데이터는 얇은 표면 위에 산다',
    badge: '14.6',
    focus: '데이터 manifold 직관',
    summary:
      '실제 데이터는 전체 고차원 공간을 꽉 채우지 않고, 그 안의 더 낮은 차원의 구조적 표면 위에 모여 있는 경우가 많습니다.',
    easy:
      '넓은 방 전체가 아니라 구불구불한 산책로 위에만 사람들이 서 있는 모습으로 상상하면 됩니다.',
    paper:
      '14.6은 autoencoder가 local manifold structure를 배우며, tangent information과 연결될 수 있음을 설명합니다.',
    analogy: '3차원 공간 속에 떠 있는 종이 리본 위에만 놓인 점들',
    bullets: ['데이터는 아무 곳에나 있지 않다', 'manifold를 따라 복원력이 생긴다', '국소 구조가 중요하다'],
    misconception: 'manifold는 너무 추상적이라 실전과 무관하다.',
    correction: 'denoising·contractive 직관과 직접 이어지는 실전 개념입니다.',
    interaction: 'manifold'
  },
  {
    id: 'neighbor-patch-lab',
    section: 'Technical Lab',
    title: 'Nearest-Neighbor Patch Lab: local patch로 tangent를 추정하기',
    badge: 'Tech Lab',
    focus: 'kNN patch와 local linearity',
    summary:
      '이 페이지는 한 점 주변의 nearest neighbors를 모아 local patch를 만들고, 그 패치에서 tangent 방향을 추정하는 과정을 보여 줍니다.',
    easy:
      '길 전체를 보지 않고, 내 주변 몇 걸음만 보고 지금 길이 어느 방향으로 뻗는지 짐작하는 실험입니다.',
    paper:
      '14.6의 manifold learning과 tangent intuition을 local neighborhood 기반으로 더 직접적으로 보여 줍니다.',
    analogy: '산길 전체 지도 없이, 발밑 주변 돌들의 흐름만 보고 길 방향을 추정하는 등산가',
    bullets: ['k-nearest neighbors', 'local patch', 'estimated tangent'],
    misconception: 'manifold tangent는 항상 전체 데이터 전체를 보고 한 번에 계산해야 한다.',
    correction: '실제로는 가까운 이웃들로 만든 local patch에서 국소적인 tangent를 추정하는 관점이 매우 중요합니다.',
    interaction: 'neighborPatchLab'
  },
  {
    id: 'chart-stitching-lab',
    section: 'Technical Lab',
    title: 'Manifold Chart Stitching Lab: local patch를 이어 전역 구조로 보기',
    badge: 'Tech Lab',
    focus: 'local charts to global manifold',
    summary:
      '이 페이지는 여러 local patch의 tangent 조각들을 이어 붙이며, 전역 manifold를 근사적으로 어떻게 읽어 나가는지 보여 줍니다.',
    easy:
      '작은 지도 조각들을 이어 붙여 큰 지도를 만드는 과정이라고 생각하면 됩니다.',
    paper:
      '14.6의 local manifold intuition을 한 단계 더 확장해, 국소 정보들이 모여 전역 구조를 만든다는 감각을 시각화합니다.',
    analogy: '동네별 미니 지도들을 이어 붙여 도시 전체 지도를 복원하는 작업',
    bullets: ['local charts', 'chart stitching', 'global shape'],
    misconception: 'local tangent 몇 개만 알면 전역 구조는 자동으로 완벽히 드러난다.',
    correction: '실제로는 여러 국소 chart를 어떻게 이어 붙이느냐가 중요하고, stitching 자체가 별도 문제입니다.',
    interaction: 'chartStitchingLab'
  },
  {
    id: 'tangent-lab',
    section: 'Technical Lab',
    title: 'Tangent / Normal Decomposition Lab: perturbation을 분해해서 보기',
    badge: 'Tech Lab',
    focus: 'manifold 접공간과 수직 성분',
    summary:
      '이 페이지는 곡선 manifold 위 한 점에서 tangent와 normal 방향을 계산하고, 임의의 perturbation이 두 방향으로 어떻게 분해되는지 보여 줍니다.',
    easy:
      '길을 따라 움직인 흔들림과, 길에서 벗어나게 만드는 흔들림을 따로 떼어 보는 실험입니다.',
    paper:
      '14.6과 14.7의 manifold / contractive 감각을 tangent-normal decomposition으로 더 정확하게 보여 주는 페이지입니다.',
    analogy: '산책로를 따라 걷는 발걸음과 길 밖으로 새는 발걸음을 따로 보는 분석기',
    bullets: ['tangent component', 'normal component', 'local geometry'],
    misconception: '모든 작은 perturbation은 똑같이 다뤄진다.',
    correction: 'manifold 학습에서는 tangent 쪽 변화와 normal 쪽 변화를 다르게 보는 것이 핵심입니다.',
    interaction: 'tangentLab'
  },
  {
    id: 'decoder-manifold-lab',
    section: 'Technical Lab',
    title: 'Decoder Manifold Lab: latent를 움직이며 생성 곡선을 따라가기',
    badge: 'Tech Lab',
    focus: 'decoder가 만드는 manifold',
    summary:
      '이 페이지는 1차원 latent h가 decoder g(h)를 통해 2차원 공간의 곡선으로 펼쳐지는 모습을 보여 줍니다.',
    easy:
      '작은 latent 손잡이 하나를 움직이면, decoder가 데이터 공간에 곡선을 그리며 점을 옮겨 놓는다고 생각하면 됩니다.',
    paper:
      'encoder가 압축을 담당한다면, decoder는 latent manifold를 데이터 공간으로 펼치는 함수라는 점을 더 시각적으로 보여 주는 페이지입니다.',
    analogy: '한 줄짜리 지휘봉을 흔들면 무대 위 점이 정해진 춤선 위를 따라 움직이는 장면',
    bullets: ['decoder curve', 'latent traversal', 'local tangent'],
    misconception: 'decoder는 그냥 latent를 다시 펼치는 단순 역함수다.',
    correction: '실제로는 latent 공간의 작은 변화를 데이터 공간의 곡선 구조로 매핑하는 생성 함수로 이해하는 편이 정확합니다.',
    interaction: 'decoderManifoldLab'
  },
  {
    id: 'decoder-curvature-lab',
    section: 'Technical Lab',
    title: 'Decoder Curvature Lab: 어디서 곡률이 큰지 보기',
    badge: 'Tech Lab',
    focus: 'decoder curvature and bending',
    summary:
      '이 페이지는 decoder curve 위에서 곡률이 큰 구간과 작은 구간을 색으로 표시해, latent 변화가 데이터 공간에서 얼마나 급하게 휘어지는지 보여 줍니다.',
    easy:
      '도로가 완만한 구간과 급커브 구간을 다른 색으로 칠해 놓은 지도라고 생각하면 됩니다.',
    paper:
      'decoder manifold를 한 단계 더 확장해, local tangent뿐 아니라 local bending까지 읽을 수 있게 만든 페이지입니다.',
    analogy: '고속도로와 급회전 산길을 구분해 표시한 내비 지도',
    bullets: ['curvature', 'local bending', 'decoder geometry'],
    misconception: 'decoder manifold는 어디서나 비슷하게 부드럽다.',
    correction: 'latent 위치에 따라 decoder curve의 굽힘 정도가 달라질 수 있고, 이는 interpolation 해석에도 영향을 줍니다.',
    interaction: 'decoderCurvatureLab'
  },
  {
    id: 'contractive',
    section: 'Page 15 / 19',
    title: 'Contractive Autoencoder: 작은 흔들림에는 둔감하게',
    badge: '14.7',
    focus: 'Jacobian penalty와 안정성',
    summary:
      'contractive autoencoder는 입력이 조금 흔들려도 representation이 크게 요동치지 않도록 만들어, 잡음에는 안정적이고 구조에는 민감한 표현을 추구합니다.',
    easy:
      '카메라가 살짝 흔들려도 얼굴 인식이 안정적으로 유지되는 느낌입니다.',
    paper:
      '14.7은 representation의 derivative에 벌점을 주어 local contraction을 유도하고, manifold 주변 거동을 해석합니다.',
    analogy: '잔잔한 흔들림을 흡수하는 짐벌 카메라',
    bullets: ['입력 미세 변화에 둔감', '중요한 방향과 덜 중요한 방향을 구분', 'denoising과 목적이 닿아 있다'],
    misconception: 'contractive와 denoising은 전혀 다른 계열이다.',
    correction: '둘 다 manifold 주변에서 안정적인 표현을 배우려는 공통 목적이 있습니다.',
    interaction: 'contractive'
  },
  {
    id: 'jacobian-lab',
    section: 'Technical Lab',
    title: 'Jacobian Sensitivity Lab: contractive penalty를 수치로 보기',
    badge: 'Tech Lab',
    focus: 'encoder Jacobian과 민감도',
    summary:
      '단순 tanh encoder의 Jacobian norm을 직접 계산해, 입력의 작은 변화가 representation에 얼마나 크게 전달되는지 더 기술적으로 보여줍니다.',
    easy:
      '입력을 살짝 흔들었을 때 내부 표현이 얼마나 크게 흔들리는지를 숫자와 화살표로 보는 실험입니다.',
    paper:
      '14.7의 contractive autoencoder 직관을, encoder 미분 크기라는 관점에서 눈으로 확인할 수 있게 만든 페이지입니다.',
    analogy: '충격 흡수 장치가 있는 짐벌이 흔들림을 얼마나 줄이는지 계측기로 측정하는 장면',
    bullets: ['Jacobian norm', 'sensitivity map', 'weight scale 조절'],
    misconception: 'contractive penalty는 그냥 출력을 작게 만드는 규칙이다.',
    correction: '핵심은 출력 자체보다 입력 변화에 대한 민감도, 즉 도함수 크기를 줄이는 데 있습니다.',
    interaction: 'jacobianLab'
  },
  {
    id: 'jacobian-spectrum-lab',
    section: 'Technical Lab',
    title: 'Jacobian Spectrum Lab: singular value가 local geometry를 어떻게 바꾸는가',
    badge: 'Tech Lab',
    focus: 'singular values와 local volume',
    summary:
      '이 페이지는 encoder의 local Jacobian을 singular values와 rotation으로 분해해, unit circle이 ellipse로 변할 때 contractive penalty·condition number·local volume이 어떻게 달라지는지 보여 줍니다.',
    easy:
      '작은 원형 스티커를 눌러 타원으로 만드는 프레스 기계를 떠올리면 쉽습니다. 어느 방향을 얼마나 늘리거나 줄이는지가 핵심입니다.',
    paper:
      'contractive autoencoder의 Jacobian penalty를 “민감도 합” 수준이 아니라 singular spectrum 관점으로 다시 보게 해 주며, 어떤 방향은 눌리고 어떤 방향은 살아남는지 더 깊게 해석하게 합니다.',
    analogy: '말랑한 반죽을 프레스로 눌러 어떤 방향은 찌그러뜨리고 어떤 방향은 덜 줄이는 장면',
    bullets: ['singular spectrum', 'condition number', 'local area scaling'],
    misconception: 'contractive penalty는 모든 방향을 똑같이 줄이는 규칙이다.',
    correction: '실제로는 방향별 민감도가 다를 수 있고, singular values가 그 차이를 가장 압축적으로 보여 줍니다.',
    interaction: 'jacobianSpectrumLab'
  },
  {
    id: 'psd',
    section: 'Page 16 / 19',
    title: 'Predictive Sparse Decomposition: 느린 최적화 대신 빠른 예측',
    badge: '14.8',
    focus: '빠른 inference',
    summary:
      '희소 표현을 매번 긴 최적화로 찾는 대신, 빠르게 근사 코드를 예측하는 encoder를 함께 학습해 실용성을 높이는 아이디어입니다.',
    easy:
      '매번 오래 계산하는 전문가 대신, 훈련된 조수가 거의 즉시 근사 답을 내주는 구조라고 보면 됩니다.',
    paper:
      '14.8은 sparse coding류의 느린 추론과 비교해 predictive encoder의 장점을 설명합니다.',
    analogy: '검색 대신 암산에 능한 계산 보조 도우미',
    bullets: ['느린 inference 문제 해결', '희소성의 장점 유지', '실전 배치에 더 적합'],
    misconception: '좋은 표현이면 느려도 괜찮다.',
    correction: '현실 시스템에서는 inference 속도도 매우 중요합니다.',
    interaction: 'psd'
  },
  {
    id: 'applications',
    section: 'Page 17 / 19',
    title: 'Applications: 압축, 특징학습, 검색, 생성모델로 가는 길',
    badge: '14.9',
    focus: '실전 활용',
    summary:
      '오토인코더는 차원 축소, denoising, semantic hashing, 표현 학습, 생성모델 연결 등 다양한 역할을 맡습니다.',
    easy:
      '파일 압축기이자, 노이즈 제거기이자, 검색을 위한 요약 엔진 같은 다재다능한 공구 상자입니다.',
    paper:
      '14.9는 dimensionality reduction과 hashing, pretraining 등 실전 활용 사례를 다룹니다.',
    analogy: '작은 멀티툴 하나가 여러 작업을 처리하는 상황',
    bullets: ['compression', 'retrieval / hashing', 'representation learning', 'generative modeling bridge'],
    misconception: '오토인코더는 옛날 기법이라 쓸모가 줄었다.',
    correction: '핵심 아이디어는 여전히 representation learning과 generative modeling에 깊게 남아 있습니다.',
    interaction: 'applications'
  },
  {
    id: 'semantic-hashing-lab',
    section: 'Technical Lab',
    title: 'Semantic Hashing Lab: 연속 latent가 binary code로 바뀌기',
    badge: 'Tech Lab',
    focus: 'binary code와 retrieval intuition',
    summary:
      '이 페이지는 연속 latent 좌표를 threshold로 binary code로 바꾸고, Hamming distance로 가까운 샘플을 찾는 과정을 보여 줍니다.',
    easy:
      '긴 좌표 대신 0과 1 버튼 조합으로 바꾼 뒤, 비슷한 조합끼리 빨리 찾는 검색 실험이라고 생각하면 됩니다.',
    paper:
      '14.9의 hashing / retrieval 응용을 더 직접적인 binary code 시각화로 보여 주는 페이지입니다.',
    analogy: '책 제목 대신 짧은 바코드로 서가를 빠르게 검색하는 도서관 시스템',
    bullets: ['binary code', 'thresholding', 'Hamming distance'],
    misconception: 'hashing은 단순 압축이라 의미 정보가 거의 없다.',
    correction: '잘 학습된 code는 짧더라도 similarity structure를 어느 정도 보존해 retrieval에 유용할 수 있습니다.',
    interaction: 'semanticHashingLab'
  },
  {
    id: 'retrieval-playground-lab',
    section: 'Technical Lab',
    title: 'Retrieval Playground Lab: query를 바꾸며 nearest code 찾기',
    badge: 'Tech Lab',
    focus: 'binary retrieval dynamics',
    summary:
      '이 페이지는 query sample을 바꾸며 어떤 binary code들이 가장 가까운 이웃으로 선택되는지 카드형으로 보여 줍니다.',
    easy:
      '검색어를 바꿨을 때 어떤 바코드들이 가장 비슷한 결과로 나오는지 직접 확인하는 실험입니다.',
    paper:
      '14.9의 retrieval / hashing 응용을 더 상호작용적으로 보여 주는 페이지입니다.',
    analogy: '서랍 속 카드 분류함에서, 같은 모양 구멍을 가진 카드들을 빠르게 골라내는 장치',
    bullets: ['query switch', 'nearest neighbors', 'Hamming ranking'],
    misconception: 'hash retrieval은 항상 하나의 query에 대해서만 생각하면 된다.',
    correction: 'query가 바뀌면 가까운 code 집합도 바뀌며, retrieval 구조 전체를 함께 봐야 합니다.',
    interaction: 'retrievalPlaygroundLab'
  },
  {
    id: 'binary-board-lab',
    section: 'Technical Lab',
    title: 'Binary Board Lab: 2D latent를 bit cell로 나눠 보기',
    badge: 'Tech Lab',
    focus: 'binary partition과 retrieval regions',
    summary:
      '이 페이지는 2D latent plane을 여러 bit cell로 나누고, 각 위치가 어떤 binary code region에 들어가는지 보드 형태로 보여 줍니다.',
    easy:
      '평면 위 위치마다 다른 바코드 방이 있다고 생각하고, 점이 어느 방에 들어가는지 보는 실험입니다.',
    paper:
      'semantic hashing 응용을 더 공간적으로 보여 주며, threshold가 retrieval region을 어떻게 자르는지 시각화합니다.',
    analogy: '격자 도시의 각 구역마다 다른 우편번호가 붙어 있는 지도',
    bullets: ['bit regions', 'decision boundaries', 'query region'],
    misconception: 'binary code는 숫자만 보면 되고, 공간에서 어떤 구역을 자르는지는 중요하지 않다.',
    correction: '실제로는 threshold가 latent 공간을 여러 retrieval region으로 나누며, 그 공간적 구조가 매우 중요합니다.',
    interaction: 'binaryBoardLab'
  },
  {
    id: 'retrieval-heatmap-lab',
    section: 'Technical Lab',
    title: 'k-NN Retrieval Heatmap Lab: query 위치별 이웃 구조 보기',
    badge: 'Tech Lab',
    focus: 'retrieval regions and nearest neighbors',
    summary:
      '이 페이지는 query 위치를 latent plane 위에서 바꿨을 때 어떤 샘플이 nearest neighbor로 선택되는지 heatmap처럼 보여 줍니다.',
    easy:
      '지도를 움직이며, 현재 위치에서 가장 가까운 가게가 어디인지 색으로 보는 실험입니다.',
    paper:
      'retrieval / hashing 응용을 더 연속적인 latent query 관점에서 보여 주는 페이지입니다.',
    analogy: '동네 지도에서 위치에 따라 가장 가까운 편의점이 바뀌는 생활권 지도',
    bullets: ['nearest neighbor region', 'query movement', 'local retrieval map'],
    misconception: 'retrieval은 query 하나만 보면 충분하다.',
    correction: 'query가 latent 공간에서 움직이면 이웃 구조도 연속적으로 변하며, 그 전체 지형이 retrieval 품질에 중요합니다.',
    interaction: 'retrievalHeatmapLab'
  },
  {
    id: 'latent-cluster-separation-lab',
    section: 'Technical Lab',
    title: 'Latent Cluster Separation Lab: 군집이 얼마나 잘 떨어지는지 보기',
    badge: 'Tech Lab',
    focus: 'latent separation and margin',
    summary:
      '이 페이지는 latent plane 위 여러 군집의 중심과 분산을 조절하며, separation margin이 retrieval과 representation 품질에 어떤 영향을 주는지 보여 줍니다.',
    easy:
      '점 무리들이 서로 너무 붙으면 헷갈리고, 떨어질수록 구분이 쉬워진다고 생각하면 됩니다.',
    paper:
      'representation learning과 retrieval 응용을 연결해, latent space 구조가 downstream similarity 판단에 얼마나 중요한지 보여 줍니다.',
    analogy: '색깔 공들이 서로 섞인 바구니와, 색깔별로 잘 떨어져 담긴 바구니를 비교하는 장면',
    bullets: ['cluster margin', 'overlap', 'retrieval friendliness'],
    misconception: 'latent만 짧게 압축되면 군집 구조는 별로 중요하지 않다.',
    correction: '좋은 latent space는 압축뿐 아니라 샘플 간 구조와 separation도 함께 보존하는 경우가 많습니다.',
    interaction: 'latentClusterSeparationLab'
  },
  {
    id: 'challenge',
    section: 'Page 18 / 19',
    title: 'Latent Rescue Challenge: 노이즈 속에서 핵심 구조를 구해내기',
    badge: 'Game Mode',
    focus: '재미있게 복습하는 종합 미션',
    summary:
      '이 미니 챌린지는 denoising, bottleneck, manifold 직관을 한 번에 복습하도록 만든 점수형 실험입니다.',
    easy:
      '노이즈가 섞인 입력을 보고, 너무 많이 외우지 않으면서도 핵심 구조를 살리는 설정을 찾는 게임이라고 생각하면 됩니다.',
    paper:
      '14.1, 14.5, 14.6의 감각을 합쳐, “작은 code로도 중요한 구조를 살리고 noisy input을 data manifold 쪽으로 되돌린다”는 메시지를 체험형으로 묶었습니다.',
    analogy: '흐릿한 지도를 보며 가장 안전한 길을 빠르게 다시 찾는 구조 구출 미션',
    bullets: ['noise filter를 조절한다', 'latent size를 너무 크게 키우지 않는다', 'manifold snap으로 구조를 붙잡는다'],
    misconception: '점수만 높이면 학습도 잘된 것이다.',
    correction: '핵심은 높은 점수보다 왜 그런 설정이 구조를 잘 살리는지 이해하는 것입니다.',
    interaction: 'challenge'
  },
  {
    id: 'recap',
    section: 'Page 19 / 19',
    title: '마지막 점검: 어떤 제약이 어떤 능력을 만들까?',
    badge: 'Recap',
    focus: '전체 비교와 퀴즈',
    summary:
      'undercomplete, sparse, denoising, contractive가 각각 어떤 문제를 막고 어떤 장점을 만드는지 비교하면서 장 전체를 정리합니다.',
    easy:
      '같은 공구 상자 안에서도 망치, 드라이버, 렌치가 각자 다른 역할을 맡는다고 생각하면 됩니다.',
    paper:
      '14장 전체를 다시 보면, 핵심은 “단순 복사”를 피하도록 어떤 제약을 설계하느냐입니다.',
    analogy: '상황마다 다른 규칙을 가진 훈련 프로그램 비교',
    bullets: ['작은 code는 압축을 강제', 'sparsity는 선택적 활성화를 강제', 'denoising / contractive는 local robustness를 강제'],
    misconception: '한 종류가 다른 모든 종류보다 낫다.',
    correction: '문제와 데이터 구조에 따라 적절한 제약이 달라집니다.',
    interaction: 'quiz'
  }
]

export const quickFacts = [
  { label: '원문 기반', value: 'autoencoder.pdf 25p / DL Book Ch.14' },
  { label: '구성 방식', value: 'Paper-2-Web 스타일 인터랙티브 스토리북' },
  { label: '페이지 수', value: '50개 학습 페이지 + 실험 패널' },
  { label: '핵심 목표', value: '쉽게 이해하고 직접 조작하며 개념 익히기' }
]

export const sourceTrace = [
  { section: '14.1', topic: 'Undercomplete Autoencoders', covers: '병목, 차원 축소, PCA 연결' },
  { section: '14.2', topic: 'Regularized Autoencoders', covers: '정규화 가족 전체 그림' },
  { section: '14.2.1', topic: 'Sparse Autoencoders', covers: '희소 활성화, latent prior 직관' },
  { section: '14.2.2 / 14.5', topic: 'Denoising Autoencoders', covers: '노이즈 제거와 복원' },
  { section: '14.3', topic: 'Representational Power', covers: '너비, 깊이, 비선형성' },
  { section: '14.4', topic: 'Stochastic Encoders and Decoders', covers: '확률적 매핑 직관' },
  { section: '14.5.1', topic: 'Estimating the Score', covers: '복원 벡터와 밀도 방향' },
  { section: '14.6', topic: 'Learning Manifolds', covers: 'manifold와 tangent 이해' },
  { section: '14.7', topic: 'Contractive Autoencoders', covers: '작은 흔들림에 둔감한 표현' },
  { section: '14.8', topic: 'Predictive Sparse Decomposition', covers: '느린 최적화 vs 빠른 예측' },
  { section: '14.9', topic: 'Applications of Autoencoders', covers: '압축, 검색, 표현 학습, 생성 연결' },
]

export const siteNotes = [
  '각 인터랙션은 논문/교과서 개념을 이해시키기 위한 교육용 시뮬레이션입니다.',
  '실제 학습된 오토인코더를 재현하는 데모가 아니라 핵심 원리를 쉽게 체험하도록 만든 설명 도구입니다.',
  '원문 기준은 autoencoder.pdf의 Chapter 14 heading 구조이며, 페이지별 요점은 해당 섹션 이름에 맞춰 재구성했습니다.',
]

export const referenceBasis = [
  {
    label: 'Primary source',
    value: 'autoencoder.pdf · Deep Learning Book Chapter 14',
  },
  {
    label: 'Coverage',
    value: '14.1 ~ 14.9 핵심 흐름 + intro / recap 재구성',
  },
  {
    label: 'Transformation',
    value: '직역이 아니라 설명형 웹 경험으로 재구성',
  },
]
