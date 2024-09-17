// Seleciona os botões de classe
const berserkerBtn = document.getElementById('berserkerBtn');
const pyromancerBtn = document.getElementById('pyromancerBtn');
const rangerBtn = document.getElementById('rangerBtn');
const reaperBtn = document.getElementById('reaperBtn');

// Seleciona o container de builds
const buildsContainer = document.getElementById('buildsContainer');

function createBuild(build, heroName) {
  const buildDiv = document.createElement('div');
  buildDiv.classList.add('build');
  build.heroName = heroName; // Adiciona o nome do herói ao objeto build

  // Define as cores dos tiers
  let tierColor;
  switch (build.tier) {
    case 'S':
      tierColor = '#4CAF50';
      break;
    case 'A':
      tierColor = '#8BC34A';
      break;
    case 'B':
      tierColor = '#FFC107';
      break;
    case 'C':
      tierColor = '#FF9800';
      break;
    case 'D':
      tierColor = '#f44336';
      break;
    default:
      tierColor = '#FFF';
  }

  // Pega a primeira imagem do array gallery para exibir no card
  const firstImage = build.gallery[0];

  buildDiv.innerHTML = `
    <div class="tier" style="background-color: ${tierColor};">Tier ${build.tier}</div>
    <img src="images/builds/${heroName}/${firstImage}" alt="${build.title}" onerror="this.onerror=null;this.src='images/fallback.jpg';">
    <div class="build-content">
    <h2>${build.title}</h2>
    <p><strong>Subclass:</strong> ${build.subclass}</p>
    <p><strong>Items:</strong> ${build.items}</p>
    </div>
    `;
  buildDiv.addEventListener('click', () => showOverlay(build));
  buildsContainer.appendChild(buildDiv);
}

let currentImageIndex = 0; // Para controlar a imagem atual exibida

function showOverlay(build) {
  const overlay = document.getElementById('overlay');
  const overlayImage = document.getElementById('overlayImage');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlaySubclass = document.getElementById('overlaySubclass');
  const overlayItems = document.getElementById('overlayItems');
  const overlayDescription = document.getElementById('overlayDescription');
  const prevButton = document.getElementById('prevImage');
  const nextButton = document.getElementById('nextImage');

  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');

  // Exibir a primeira imagem da galeria
  currentImageIndex = 0;
  overlayImage.src = `images/builds/${build.heroName}/${build.gallery[currentImageIndex]}`;

  overlayTitle.textContent = build.title;
  overlaySubclass.textContent = build.subclass;
  overlayItems.textContent = build.items;
  overlayDescription.textContent = build.description;

  // Exibir os botões de navegação apenas se houver mais de uma imagem
  if (build.gallery.length > 1) {
    prevButton.style.display = 'block';
    nextButton.style.display = 'block';
  } else {
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
  }

  // Adicionar funcionalidade para navegar nas imagens
  prevButton.onclick = () => changeImage(build, -1);
  nextButton.onclick = () => changeImage(build, 1);
}

// Função para trocar a imagem exibida no modal
function changeImage(build, direction) {
  currentImageIndex += direction;

  // Volta ao início ou fim da galeria
  if (currentImageIndex < 0) {
    currentImageIndex = build.gallery.length - 1;
  } else if (currentImageIndex >= build.gallery.length) {
    currentImageIndex = 0;
  }

  document.getElementById(
    'overlayImage'
  ).src = `images/builds/${build.heroName}/${build.gallery[currentImageIndex]}`;
}

// Função para fechar o overlay ao clicar fora do conteúdo
document.getElementById('overlay').addEventListener('click', (event) => {
  if (event.target === document.getElementById('overlay')) {
    closeOverlay();
  }
});

// Função para fechar o overlay com o botão de fechar (X)
function closeOverlay() {
  const overlay = document.getElementById('overlay');
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
}

// Vincula o evento de clique ao botão de fechar (X)
document.getElementById('overlayClose').addEventListener('click', closeOverlay);

// Função para limpar as builds existentes no container
function clearBuilds() {
  buildsContainer.innerHTML = '';
}

// Funções para mostrar as builds de cada classe ao clicar nos botões
function showBerserkerBuilds() {
  clearBuilds();
  berserkerBuilds.forEach((build) => createBuild(build, 'berserker'));
}

function showPyromancerBuilds() {
  clearBuilds();
  pyromancerBuilds.forEach((build) => createBuild(build, 'pyromancer'));
}

function showRangerBuilds() {
  clearBuilds();
  rangerBuilds.forEach((build) => createBuild(build, 'ranger'));
}

function showReaperBuilds() {
  clearBuilds();
  reaperBuilds.forEach((build) => createBuild(build, 'reaper'));
}

// Adiciona os event listeners aos botões
berserkerBtn.addEventListener('click', showBerserkerBuilds);
pyromancerBtn.addEventListener('click', showPyromancerBuilds);
rangerBtn.addEventListener('click', showRangerBuilds);
reaperBtn.addEventListener('click', showReaperBuilds);

// Inicializa mostrando as builds do Berserker como padrão
showBerserkerBuilds();
