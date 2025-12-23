// Default Configuration (Colors and Text)
const config = {
    background_color: "#FFF4E6",
    card_color: "#FFFFFF",
    text_color: "#2D3748",
    primary_action_color: "#E53E3E",
    secondary_action_color: "#48BB78",
    font_family: "Comic Sans MS",
    font_size: 16,
    main_title: "Understanding Anger 😠",
    intro_text: "Anger is a normal feeling, but it's important to handle it the right way!",
    negative_title: "What Happens When We Don't Control Anger?",
    solutions_title: "Science-Backed Ways to Cool Down"
};

// App State
let currentView = 'intro';
let breathingActive = false;
let breathingInterval = null;

// Initialize the App
document.addEventListener('DOMContentLoaded', () => {
    // Set global styles
    const app = document.getElementById('app');
    app.style.backgroundColor = config.background_color;
    app.style.fontFamily = `${config.font_family}, Arial, sans-serif`;
    app.style.color = config.text_color;

    // Render the first screen
    renderContent();
});

function renderContent() {
    const app = document.getElementById('app');
    const baseSize = config.font_size;
    
    // --- VIEW 1: INTRO SCREEN ---
    if (currentView === 'intro') {
        app.innerHTML = `
          <div class="min-h-full flex items-center justify-center p-8">
            <div class="max-w-3xl w-full">
              <div class="text-center mb-12 fade-in">
                <h1 style="font-size: ${baseSize * 2.5}px; color: ${config.text_color}; margin-bottom: 24px; font-weight: bold;">
                  ${config.main_title}
                </h1>
                <p style="font-size: ${baseSize * 1.2}px; color: ${config.text_color}; margin-bottom: 32px;">
                  ${config.intro_text}
                </p>
              </div>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="emotion-card p-8 rounded-3xl shadow-lg" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 4}px; text-align: center; margin-bottom: 16px;">😠</div>
                  <h2 style="font-size: ${baseSize * 1.5}px; color: ${config.text_color}; text-align: center; font-weight: bold; margin-bottom: 16px;">
                    The Anger Volcano
                  </h2>
                  <p style="font-size: ${baseSize}px; color: ${config.text_color}; text-align: center; margin-bottom: 24px;">
                    See what happens when anger explodes
                  </p>
                  <button id="negativeBtn" style="width: 100%; padding: 16px; border-radius: 12px; background-color: ${config.primary_action_color}; color: white; font-size: ${baseSize * 1.1}px; font-weight: bold; border: none; cursor: pointer;">
                    Show Me The Problems
                  </button>
                </div>

                <div class="emotion-card p-8 rounded-3xl shadow-lg" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 4}px; text-align: center; margin-bottom: 16px;">😌</div>
                  <h2 style="font-size: ${baseSize * 1.5}px; color: ${config.text_color}; text-align: center; font-weight: bold; margin-bottom: 16px;">
                    Cool Down Tools
                  </h2>
                  <p style="font-size: ${baseSize}px; color: ${config.text_color}; text-align: center; margin-bottom: 24px;">
                    Learn smart ways to calm down
                  </p>
                  <button id="solutionsBtn" style="width: 100%; padding: 16px; border-radius: 12px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize * 1.1}px; font-weight: bold; border: none; cursor: pointer;">
                    Show Me Solutions
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;

        document.getElementById('negativeBtn').onclick = () => {
            currentView = 'negative';
            renderContent();
        };

        document.getElementById('solutionsBtn').onclick = () => {
            currentView = 'solutions';
            renderContent();
        };

    // --- VIEW 2: NEGATIVE IMPACTS ---
    } else if (currentView === 'negative') {
        app.innerHTML = `
          <div class="min-h-full p-8">
            <div class="max-w-4xl mx-auto">
              <button id="backBtn" style="margin-bottom: 24px; padding: 12px 24px; border-radius: 8px; background-color: ${config.card_color}; color: ${config.text_color}; font-size: ${baseSize}px; border: 2px solid ${config.text_color}; cursor: pointer; font-weight: bold;">
                ← Back to Home
              </button>

              <h1 style="font-size: ${baseSize * 2}px; color: ${config.primary_action_color}; margin-bottom: 32px; font-weight: bold; text-align: center;">
                ${config.negative_title}
              </h1>

              <div class="grid md:grid-cols-2 gap-6">
                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                   <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🧠</div>
                   <h3 style="font-size: ${baseSize * 1.3}px; font-weight: bold; margin-bottom: 12px;">Your Brain Gets Stuck</h3>
                   <p>The thinking part of your brain shuts down. You can't solve problems or make good choices when you're too angry.</p>
                </div>
                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                   <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">💔</div>
                   <h3 style="font-size: ${baseSize * 1.3}px; font-weight: bold; margin-bottom: 12px;">Friendships Get Hurt</h3>
                   <p>Saying mean things or being aggressive can push friends away. It's hard to take back hurtful words.</p>
                </div>
                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                   <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">💢</div>
                   <h3 style="font-size: ${baseSize * 1.3}px; font-weight: bold; margin-bottom: 12px;">Your Body Feels Bad</h3>
                   <p>Your heart beats fast, muscles get tight, and you might get headaches. Too much anger makes you feel sick.</p>
                </div>
                 <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                   <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">😢</div>
                   <h3 style="font-size: ${baseSize * 1.3}px; font-weight: bold; margin-bottom: 12px;">You Feel Worse Later</h3>
                   <p>After an anger explosion, you often feel guilty, sad, or embarrassed about what happened.</p>
                </div>
              </div>

              <div class="mt-12 p-8 rounded-2xl text-center" style="background-color: ${config.card_color};">
                <p style="font-size: ${baseSize * 1.2}px; color: ${config.text_color}; font-weight: bold; margin-bottom: 16px;">
                  Good news! There are better ways to handle anger! 🌟
                </p>
                <button id="solutionsBtnFromNegative" style="padding: 16px 32px; border-radius: 12px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize * 1.1}px; font-weight: bold; border: none; cursor: pointer;">
                  Learn Cool Down Techniques
                </button>
              </div>
            </div>
          </div>
        `;

        document.getElementById('backBtn').onclick = () => {
            currentView = 'intro';
            renderContent();
        };

        document.getElementById('solutionsBtnFromNegative').onclick = () => {
            currentView = 'solutions';
            renderContent();
        };

    // --- VIEW 3: SOLUTIONS (Interactive) ---
    } else if (currentView === 'solutions') {
        app.innerHTML = `
          <div class="min-h-full p-8">
            <div class="max-w-4xl mx-auto">
              <button id="backBtn2" style="margin-bottom: 24px; padding: 12px 24px; border-radius: 8px; background-color: ${config.card_color}; color: ${config.text_color}; font-size: ${baseSize}px; border: 2px solid ${config.text_color}; cursor: pointer; font-weight: bold;">
                ← Back to Home
              </button>

              <h1 style="font-size: ${baseSize * 2}px; color: ${config.secondary_action_color}; margin-bottom: 32px; font-weight: bold; text-align: center;">
                ${config.solutions_title}
              </h1>

              <div class="grid gap-6">
                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🫁</div>
                  <h3 style="font-size: ${baseSize * 1.4}px; font-weight: bold; margin-bottom: 12px;">Deep Breathing</h3>
                  <div class="flex justify-center mb-4">
                    <div id="breathCircle" class="breath-circle" style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, ${config.secondary_action_color}, ${config.primary_action_color}); display: flex; align-items: center; justify-content: center; color: white; font-size: ${baseSize * 1.2}px; font-weight: bold;">
                      Breathe
                    </div>
                  </div>
                  <button id="breathBtn" style="padding: 12px 24px; border-radius: 8px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize}px; font-weight: bold; border: none; cursor: pointer; display: block; margin: 0 auto;">
                    Start Breathing Exercise
                  </button>
                </div>

                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                   <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🏃</div>
                   <h3 style="font-size: ${baseSize * 1.4}px; font-weight: bold; margin-bottom: 12px;">Move Your Body</h3>
                   <div class="flex justify-center mb-4">
                    <div id="jumpingFigure" style="font-size: ${baseSize * 5}px; transition: transform 0.3s ease;">🤸</div>
                   </div>
                   <button id="moveBtn" style="padding: 12px 24px; border-radius: 8px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize}px; font-weight: bold; border: none; cursor: pointer; display: block; margin: 0 auto;">Start Movement Timer</button>
                   <div id="moveTimer" style="text-align: center; margin-top: 12px; font-size: ${baseSize * 1.5}px; font-weight: bold;"></div>
                </div>

                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🧊</div>
                  <h3 style="font-size: ${baseSize * 1.4}px; font-weight: bold; margin-bottom: 12px;">The Ice Trick</h3>
                  <div class="flex justify-center mb-4">
                    <div id="iceCube" style="width: 100px; height: 100px; background: linear-gradient(135deg, #E0F7FF, #A7D8F0); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: ${baseSize * 4}px; cursor: pointer; transition: all 0.5s ease;">🧊</div>
                  </div>
                  <p id="iceMessage" style="text-align: center; font-size: ${baseSize * 0.9}px; min-height: 25px; font-style: italic;"></p>
                  <button id="iceBtn" style="padding: 12px 24px; border-radius: 8px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize}px; font-weight: bold; border: none; cursor: pointer; display: block; margin: 0 auto;">Hold the Ice Cube</button>
                </div>

                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🗣️</div>
                  <h3 style="font-size: ${baseSize * 1.4}px; font-weight: bold; margin-bottom: 12px;">Use "I Feel" Statements</h3>
                  <div style="background-color: ${config.background_color}; padding: 20px; border-radius: 12px; margin-bottom: 16px;">
                    <p id="statementExample" style="font-size: ${baseSize * 1.1}px; text-align: center; font-weight: bold; min-height: 60px; line-height: 1.5;">Click below to see examples</p>
                  </div>
                  <button id="statementBtn" style="padding: 12px 24px; border-radius: 8px; background-color: ${config.secondary_action_color}; color: white; font-size: ${baseSize}px; font-weight: bold; border: none; cursor: pointer; display: block; margin: 0 auto;">Show Example</button>
                </div>

                <div class="solution-item p-6 rounded-2xl" style="background-color: ${config.card_color};">
                  <div style="font-size: ${baseSize * 3}px; margin-bottom: 12px;">🎨</div>
                  <h3 style="font-size: ${baseSize * 1.4}px; font-weight: bold; margin-bottom: 12px;">Creative Release</h3>
                  <p style="margin-bottom:16px;">Draw angry scribbles, write in a journal, or squish playdough.</p>
                  <canvas id="drawingCanvas" width="300" height="200" style="border: 3px solid ${config.primary_action_color}; border-radius: 12px; cursor: crosshair; display: block; margin: 0 auto 16px auto; background-color: white; touch-action: none;"></canvas>
                  <div style="text-align: center;">
                    <button id="clearCanvas" style="padding: 12px 24px; border-radius: 8px; background-color: ${config.primary_action_color}; color: white; font-size: ${baseSize}px; font-weight: bold; border: none; cursor: pointer;">Clear Canvas</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        `;

        setupSolutionInteractions();
    }
}

function setupSolutionInteractions() {
    const backBtn2 = document.getElementById('backBtn2');
    if (backBtn2) {
        backBtn2.onclick = () => {
            currentView = 'intro';
            if (breathingInterval) {
                clearInterval(breathingInterval);
                breathingInterval = null;
                breathingActive = false;
            }
            renderContent();
        };
    }

    // Breathing Logic
    const breathBtn = document.getElementById('breathBtn');
    const breathCircle = document.getElementById('breathCircle');
    if (breathBtn) {
        breathBtn.onclick = () => {
            if (breathingActive) {
                clearInterval(breathingInterval);
                breathingInterval = null;
                breathingActive = false;
                breathBtn.textContent = 'Start Breathing Exercise';
                breathCircle.classList.remove('expand');
                breathCircle.textContent = 'Breathe';
            } else {
                breathingActive = true;
                breathBtn.textContent = 'Stop Exercise';
                let phase = 0;
                const phases = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
                breathingInterval = setInterval(() => {
                    breathCircle.textContent = phases[phase];
                    if (phase === 0 || phase === 2) {
                        breathCircle.classList.toggle('expand');
                    }
                    phase = (phase + 1) % 4;
                }, 4000);
            }
        };
    }

    // Movement Logic
    const moveBtn = document.getElementById('moveBtn');
    if (moveBtn) {
        let moveInterval = null;
        let moveTimeLeft = 0;
        const moveTimer = document.getElementById('moveTimer');
        const jumpingFigure = document.getElementById('jumpingFigure');

        moveBtn.onclick = () => {
            if (moveInterval) {
                clearInterval(moveInterval);
                moveInterval = null;
                moveBtn.textContent = 'Start Movement Timer';
                moveTimer.textContent = '';
                jumpingFigure.style.transform = 'translateY(0)';
            } else {
                moveTimeLeft = 120; // 2 minutes
                moveBtn.textContent = 'Stop Timer';
                const jumpInterval = setInterval(() => {
                    jumpingFigure.style.transform = jumpingFigure.style.transform === 'translateY(-20px)' ? 'translateY(0)' : 'translateY(-20px)';
                }, 500);

                moveInterval = setInterval(() => {
                    moveTimeLeft--;
                    const mins = Math.floor(moveTimeLeft / 60);
                    const secs = moveTimeLeft % 60;
                    moveTimer.textContent = `${mins}:${secs.toString().padStart(2, '0')} - Keep Moving!`;
                    if (moveTimeLeft <= 0) {
                        clearInterval(moveInterval);
                        clearInterval(jumpInterval);
                        moveInterval = null;
                        moveBtn.textContent = 'Start Movement Timer';
                        moveTimer.textContent = '🎉 Great Job!';
                        jumpingFigure.style.transform = 'translateY(0)';
                    }
                }, 1000);
            }
        };
    }

    // Ice Cube Logic
    const iceBtn = document.getElementById('iceBtn');
    if (iceBtn) {
        let iceHolding = false;
        let iceTimeout = null;
        const iceCube = document.getElementById('iceCube');
        const iceMessage = document.getElementById('iceMessage');

        iceBtn.onclick = () => {
            if (iceHolding) {
                clearTimeout(iceTimeout);
                iceHolding = false;
                iceBtn.textContent = 'Hold the Ice Cube';
                iceCube.style.transform = 'scale(1)';
                iceCube.style.opacity = '1';
                iceMessage.textContent = '';
            } else {
                iceHolding = true;
                iceBtn.textContent = 'Release Ice';
                iceCube.style.transform = 'scale(0.9)';
                iceCube.style.opacity = '0.7';
                iceMessage.textContent = 'Feel the cold... Your heart rate is slowing down...';
                iceTimeout = setTimeout(() => {
                    iceMessage.textContent = '❄️ Dive reflex activated! You should feel calmer now.';
                    iceHolding = false;
                    iceBtn.textContent = 'Hold the Ice Cube';
                    iceCube.style.transform = 'scale(1)';
                    iceCube.style.opacity = '1';
                }, 5000);
            }
        };
    }

    // I Feel Statements
    const statementBtn = document.getElementById('statementBtn');
    if (statementBtn) {
        const statements = [
            '"I feel angry when you take my things without asking."',
            '"I feel frustrated when I\'m not being heard."',
            '"I feel upset when plans change suddenly."',
            '"I feel mad when someone breaks their promise."',
            '"I feel annoyed when I\'m interrupted while working."'
        ];
        let statementIndex = 0;
        const statementExample = document.getElementById('statementExample');
        statementBtn.onclick = () => {
            statementExample.textContent = statements[statementIndex];
            statementIndex = (statementIndex + 1) % statements.length;
        };
    }

    // Drawing Canvas
    const canvas = document.getElementById('drawingCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const clearBtn = document.getElementById('clearCanvas');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        const getCoordinates = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            if (e.touches && e.touches.length > 0) {
                return {
                    x: (e.touches[0].clientX - rect.left) * scaleX,
                    y: (e.touches[0].clientY - rect.top) * scaleY
                };
            }
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        };

        const startDrawing = (e) => {
            e.preventDefault();
            isDrawing = true;
            const coords = getCoordinates(e);
            lastX = coords.x;
            lastY = coords.y;
        };

        const draw = (e) => {
            e.preventDefault();
            if (!isDrawing) return;
            const coords = getCoordinates(e);
            ctx.strokeStyle = config.primary_action_color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
            lastX = coords.x;
            lastY = coords.y;
        };

        const stopDrawing = (e) => {
            e.preventDefault();
            isDrawing = false;
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        clearBtn.onclick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }
}
