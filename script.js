/**
 * GymWorkout - Professional Fitness Tracker Application
 * Modern, feature-rich workout tracking system
 */

// ============================================================================
// Constants & Configuration
// ============================================================================

const STORAGE_KEY = 'GW_HISTORY_V1';
const MIN_COMPLETION_PERCENT = 20; // Minimum completion to save workout
const REST_TIMER_MIN = 30;
const REST_TIMER_MAX = 240;
const DEFAULT_REST_SECONDS = 90;
const REPS_MIN = 1;
const REPS_MAX = 50;
const WEIGHT_MIN = 0;
const WEIGHT_MAX = 500;
const WEIGHT_STEP = 2.5;

// Exercise Catalog - Predefined exercises with default values
const ExerciseCatalog = [
  // Chest Exercises
  { name: "Barbell Incline Press", bodyPart: "Chest", equipment: "Barbell", reps: 10, sets: 4, weight: 35 },
  { name: "Flat Bench Press", bodyPart: "Chest", equipment: "Barbell", reps: 10, sets: 4, weight: 40 },
  { name: "Decline Barbell Press", bodyPart: "Chest", equipment: "Barbell", reps: 11, sets: 3, weight: 40 },
  { name: "Dips", bodyPart: "Chest", equipment: "Bodyweight", reps: 11, sets: 3, weight: 0 },
  
  // Triceps Exercises
  { name: "Straight Bar Pushdown", bodyPart: "Triceps", equipment: "Cable", reps: 13, sets: 3, weight: 20 },
  { name: "Rope Pushdown", bodyPart: "Triceps", equipment: "Cable", reps: 13, sets: 3, weight: 15 },
  { name: "Overhead Rope Extension", bodyPart: "Triceps", equipment: "Cable", reps: 13, sets: 3, weight: 15 },
  
  // Back Exercises
  { name: "Deadlifts", bodyPart: "Back", equipment: "Barbell", reps: 7, sets: 4, weight: 60 },
  { name: "Seated Rows", bodyPart: "Back", equipment: "Machine", reps: 10, sets: 4, weight: 30 },
  { name: "T-Bar Row", bodyPart: "Back", equipment: "Machine", reps: 10, sets: 4, weight: 35 },
  { name: "Lat Pulldown", bodyPart: "Back", equipment: "Machine", reps: 10, sets: 4, weight: 35 },
  { name: "Pull-Ups", bodyPart: "Back", equipment: "Bodyweight", reps: 10, sets: 4, weight: 0 },
  
  // Biceps Exercises
  { name: "Barbell Curl", bodyPart: "Biceps", equipment: "Barbell", reps: 10, sets: 4, weight: 20 },
  { name: "Dumbbell Curl", bodyPart: "Biceps", equipment: "Dumbbells", reps: 10, sets: 3, weight: 12.5 },
  { name: "Preacher Curl", bodyPart: "Biceps", equipment: "Machine", reps: 11, sets: 3, weight: 15 },
  { name: "Machine Curl", bodyPart: "Biceps", equipment: "Machine", reps: 11, sets: 3, weight: 15 },
  { name: "Hammer Curl", bodyPart: "Biceps", equipment: "Dumbbells", reps: 12, sets: 3, weight: 12.5 },
  
  // Shoulders & Delts Exercises
  { name: "Dumbbell Overhead Press", bodyPart: "Shoulders", equipment: "Dumbbells", reps: 10, sets: 4, weight: 12.5 },
  { name: "Dumbbell Side Raises", bodyPart: "Shoulders", equipment: "Dumbbells", reps: 13, sets: 3, weight: 5 },
  { name: "Rear Delt Fly", bodyPart: "Shoulders", equipment: "Dumbbells", reps: 13, sets: 3, weight: 5 },
  { name: "Rear Delt Machine", bodyPart: "Shoulders", equipment: "Machine", reps: 13, sets: 3, weight: 10 },
  
  // Traps Exercises
  { name: "Dumbbell Shrugs", bodyPart: "Traps", equipment: "Dumbbells", reps: 13, sets: 4, weight: 20 },
  { name: "Barbell Shrugs", bodyPart: "Traps", equipment: "Barbell", reps: 13, sets: 3, weight: 40 },
  
  // Legs Exercises
  { name: "Romanian Deadlifts", bodyPart: "Legs", equipment: "Barbell", reps: 9, sets: 4, weight: 50 },
  { name: "Sumo Deadlifts", bodyPart: "Legs", equipment: "Barbell", reps: 9, sets: 4, weight: 50 },
  { name: "Squats", bodyPart: "Legs", equipment: "Barbell", reps: 10, sets: 4, weight: 60 },
  { name: "Leg Press", bodyPart: "Legs", equipment: "Machine", reps: 11, sets: 4, weight: 120 },
  { name: "Bulgarian Split Squats", bodyPart: "Legs", equipment: "Dumbbells", reps: 11, sets: 3, weight: 15 },
  { name: "Leg Curls", bodyPart: "Legs", equipment: "Machine", reps: 12, sets: 3, weight: 25 },
  { name: "Calf Raises", bodyPart: "Legs", equipment: "Machine", reps: 17, sets: 4, weight: 50 },
  
  // Full Body Exercises
  { name: "Clean and Press", bodyPart: "Full Body", equipment: "Barbell", reps: 8, sets: 3, weight: 30 },
  { name: "Kettlebell Swings", bodyPart: "Full Body", equipment: "Kettlebell", reps: 15, sets: 3, weight: 20 },
  { name: "Plank", bodyPart: "Core", equipment: "Bodyweight", reps: 45, sets: 3, weight: 0 }
];

// Quick workout splits configuration
const QUICK_SPLITS = {
  chest_triceps: {
    title: 'Chest + Triceps',
    exercises: [
      // Chest
      'Barbell Incline Press',
      'Flat Bench Press',
      'Decline Barbell Press',
      // Triceps
      'Straight Bar Pushdown',
      'Rope Pushdown',
      'Overhead Rope Extension'
    ]
  },
  back_biceps: {
    title: 'Back + Biceps (Deadlift Focus)',
    exercises: [
      // Back
      'Deadlifts',
      'Seated Rows',
      'Lat Pulldown',
      // Biceps
      'Barbell Curl',
      'Dumbbell Curl',
      'Preacher Curl',
      'Hammer Curl'
    ]
  },
  shoulders_delts: {
    title: 'Shoulders + Delts',
    exercises: [
      // Delts
      'Dumbbell Overhead Press',
      'Dumbbell Side Raises',
      'Rear Delt Fly',
      // Traps
      'Dumbbell Shrugs',
      'Barbell Shrugs'
    ]
  },
  legs: {
    title: 'Legs (Deadlift Focus)',
    exercises: [
      'Romanian Deadlifts',
      'Squats',
      'Leg Press',
      'Bulgarian Split Squats',
      'Leg Curls',
      'Calf Raises'
    ]
  },
  fullbody: {
    title: 'Full Body / Functional',
    exercises: [
      'Clean and Press',
      'Pull-Ups',
      'Kettlebell Swings',
      'Plank'
    ]
  }
};

// ============================================================================
// State Management
// ============================================================================

let history = [];
let currentSession = null;
let restSeconds = DEFAULT_REST_SECONDS;
let restTicker = null;
let restRemaining = 0;
let selectedExercises = new Set();

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format date and time using Intl API
 */
const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
});

/**
 * Get start of week (Monday)
 */
function getStartOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Convert Sunday (0) to last day (6)
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
}

/**
 * Get end of week (Sunday)
 */
function getEndOfWeek(date = new Date()) {
  const start = getStartOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return end;
}

/**
 * Check if date is within current week
 */
function isInThisWeek(date) {
  const start = getStartOfWeek();
  const end = getEndOfWeek();
  return date >= start && date < end;
}

/**
 * Create DOM element from HTML string
 */
function createElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

/**
 * Generate unique ID
 */
function generateId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Clamp value between min and max
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Round to one decimal place
 */
function roundToOneDecimal(value) {
  return Math.round(value * 10) / 10;
}

// ============================================================================
// Data Persistence
// ============================================================================

/**
 * Load workout history from localStorage
 */
function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading history:', error);
    return [];
  }
}

/**
 * Save workout history to localStorage
 */
function saveHistory() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving history:', error);
  }
}

// ============================================================================
// Tab Navigation
// ============================================================================

function initializeTabs() {
  const tabs = document.querySelectorAll('.tab');
  const views = {
    start: document.getElementById('view-start'),
    build: document.getElementById('view-build'),
    history: document.getElementById('view-history'),
    progress: document.getElementById('view-progress')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update tab states
      tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');

      // Smooth view transition
      Object.values(views).forEach(view => {
        if (!view.hidden) {
          view.style.opacity = '0';
          view.style.transform = 'translateY(10px)';
          setTimeout(() => {
            view.hidden = true;
          }, 150);
        }
      });

      const targetView = views[tab.dataset.tab];
      if (targetView) {
        targetView.hidden = false;
        // Trigger reflow for animation
        targetView.offsetHeight;
        targetView.style.opacity = '1';
        targetView.style.transform = 'translateY(0)';
      }

      // Load data for specific views
      if (tab.dataset.tab === 'history') {
        setTimeout(() => renderHistory(), 100);
      } else if (tab.dataset.tab === 'build') {
        setTimeout(() => ensureCatalog(), 100);
      } else if (tab.dataset.tab === 'progress') {
        setTimeout(() => renderProgressReport(), 100);
      }
    });
  });
}

// ============================================================================
// Start View
// ============================================================================

function initializeStartView() {
  const weeklyCountEl = document.getElementById('weekly-count');
  const lastPillEl = document.getElementById('last-workout-pill');
  const progressBarEl = document.getElementById('progress-bar');
  const progressLabelEl = document.getElementById('progress-label');

  /**
   * Refresh start view summary
   */
  function refreshSummary() {
    const weeklyWorkouts = history.filter(session =>
      isInThisWeek(new Date(session.date))
    );
    const count = weeklyWorkouts.length;
    weeklyCountEl.textContent = `${count} workout${count === 1 ? '' : 's'}`;

    if (history.length > 0) {
      const lastWorkout = history[0];
      const dateStr = dateFormatter.format(new Date(lastWorkout.date));
      lastPillEl.textContent = `Last: ${lastWorkout.title} • ${dateStr}`;
    } else {
      lastPillEl.textContent = 'No recent workout';
    }
  }

  /**
   * Update progress bar
   */
  function updateProgress(done, total) {
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    progressBarEl.style.width = `${percent}%`;
    progressLabelEl.textContent = `${percent}% done`;
  }

  // Expose functions for use in other modules
  window.refreshStartSummary = refreshSummary;
  window.updateStartProgress = updateProgress;

  refreshSummary();
}

// ============================================================================
// Rest Timer
// ============================================================================

function initializeRestTimer() {
  const restOutputEl = document.getElementById('rest-output');
  const restRemainingEl = document.getElementById('rest-remaining');
  const startBtn = document.getElementById('btn-rest-start');
  const stopBtn = document.getElementById('btn-rest-stop');

  // Initialize display
  restOutputEl.textContent = `${restSeconds}s`;

  // Stepper controls
  document.querySelectorAll('.stepper[aria-label="Rest seconds"] button').forEach(btn => {
    btn.addEventListener('click', () => {
      const delta = Number(btn.dataset.delta);
      restSeconds = clamp(restSeconds + delta, REST_TIMER_MIN, REST_TIMER_MAX);
      restOutputEl.textContent = `${restSeconds}s`;
    });
  });

  /**
   * Start rest timer
   */
  function startRest(seconds) {
    restRemaining = seconds;
    restRemainingEl.textContent = `${restRemaining}s`;

    if (restTicker) {
      clearInterval(restTicker);
    }

    restTicker = setInterval(() => {
      restRemaining--;
      restRemainingEl.textContent = `${restRemaining}s`;

      if (restRemaining <= 0) {
        stopRest();
      }
    }, 1000);
  }

  /**
   * Stop rest timer
   */
  function stopRest() {
    if (restTicker) {
      clearInterval(restTicker);
      restTicker = null;
    }
    restRemainingEl.textContent = 'Stopped';
  }

  startBtn.addEventListener('click', () => startRest(restSeconds));
  stopBtn.addEventListener('click', stopRest);

  // Expose for use in session modal
  window.startRest = startRest;
}

// ============================================================================
// Quick Workout
// ============================================================================

function initializeQuickWorkout() {
  const quickModal = document.getElementById('quick-modal');
  const quickOpenBtn = document.getElementById('btn-start-quick');
  const quickCloseBtn = document.getElementById('btn-quick-close');
  const buildOpenBtn = document.getElementById('btn-open-build');

  /**
   * Get workout items for a split
   */
  function getItemsForSplit(splitKey) {
    const split = QUICK_SPLITS[splitKey];
    if (!split) return { title: 'Quick Workout', items: [] };

    const items = split.exercises
      .map(exerciseName => {
        const exercise = ExerciseCatalog.find(e => e.name === exerciseName);
        if (!exercise) return null;

        return {
          exercise,
          sets: Array.from({ length: exercise.sets }, () => ({
            reps: exercise.reps,
            weight: exercise.weight,
            isCompleted: false
          }))
        };
      })
      .filter(Boolean);

    return { title: split.title, items };
  }

  // Open quick workout modal
  quickOpenBtn.addEventListener('click', () => {
    quickModal.classList.add('open');
  });

  // Close quick workout modal
  quickCloseBtn.addEventListener('click', () => {
    quickModal.classList.remove('open');
  });

  // Close on backdrop click
  quickModal.addEventListener('click', (e) => {
    if (e.target === quickModal) {
      quickModal.classList.remove('open');
    }
  });

  // Quick option buttons
  document.querySelectorAll('.quick-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const split = btn.dataset.split;
      const { title, items } = getItemsForSplit(split);
      quickModal.classList.remove('open');
      openSession({
        id: generateId(),
        title: title || 'Quick Workout',
        date: new Date().toISOString(),
        items,
        notes: ''
      });
    });
  });

  // Open build view
  buildOpenBtn.addEventListener('click', () => {
    document.querySelector('.tab[data-tab="build"]').click();
  });
}

// ============================================================================
// Build View
// ============================================================================

function initializeBuildView() {
  const catalogHost = document.getElementById('catalog');
  const buildStartBtn = document.getElementById('btn-build-start');
  const titleInput = document.getElementById('routine-title');

  /**
   * Ensure catalog is rendered
   */
  function ensureCatalog() {
    if (catalogHost.childElementCount === 0) {
      renderCatalog();
    }
  }

  /**
   * Render exercise catalog
   */
  function renderCatalog() {
    const bodyParts = [...new Set(ExerciseCatalog.map(e => e.bodyPart))].sort();
    catalogHost.innerHTML = '';

    bodyParts.forEach(bodyPart => {
      const section = createElement(`
        <div class="section">
          <h3>${bodyPart}</h3>
          <ul class="reset"></ul>
        </div>
      `);
      const list = section.querySelector('ul');

      ExerciseCatalog
        .filter(ex => ex.bodyPart === bodyPart)
        .forEach(exercise => {
          const key = JSON.stringify(exercise);
          const isSelected = selectedExercises.has(key);

          const row = createElement(`
            <li class="list-item">
              <div>
                <div>${exercise.name}</div>
                <div class="muted" style="font-size:12px">
                  ${exercise.bodyPart} • ${exercise.equipment}
                </div>
              </div>
              <button class="btn" aria-pressed="${isSelected}" type="button">
                ${isSelected ? 'Selected' : 'Select'}
              </button>
            </li>
          `);

          const btn = row.querySelector('button');
          btn.addEventListener('click', () => {
            if (selectedExercises.has(key)) {
              selectedExercises.delete(key);
              btn.textContent = 'Select';
              btn.setAttribute('aria-pressed', 'false');
            } else {
              selectedExercises.add(key);
              btn.textContent = 'Selected';
              btn.setAttribute('aria-pressed', 'true');
            }
            buildStartBtn.disabled = selectedExercises.size === 0;
          });

          list.appendChild(row);
        });

      catalogHost.appendChild(section);
    });
  }

  /**
   * Start workout from selected exercises
   */
  buildStartBtn.addEventListener('click', () => {
    if (selectedExercises.size === 0) return;

    const items = Array.from(selectedExercises)
      .map(key => JSON.parse(key))
      .map(exercise => ({
        exercise,
        sets: Array.from({ length: exercise.sets }, () => ({
          reps: exercise.reps,
          weight: exercise.weight,
          isCompleted: false
        }))
      }))
      .sort((a, b) => a.exercise.bodyPart.localeCompare(b.exercise.bodyPart));

    openSession({
      id: generateId(),
      title: titleInput.value.trim() || 'Custom Routine',
      date: new Date().toISOString(),
      items,
      notes: ''
    });

    // Reset selection
    selectedExercises.clear();
    titleInput.value = 'Custom Routine';
    buildStartBtn.disabled = true;
    catalogHost.innerHTML = '';
  });

  window.ensureCatalog = ensureCatalog;
}

// ============================================================================
// Session Modal
// ============================================================================

function initializeSessionModal() {
  const sessionModal = document.getElementById('session-modal');
  const sessionTitleEl = document.getElementById('session-title');
  const sessionDateEl = document.getElementById('session-date');
  const sessionItemsEl = document.getElementById('session-items');
  const sessionNotesEl = document.getElementById('session-notes');
  const sessionProgressBarEl = document.getElementById('session-progress');
  const sessionProgressLabelEl = document.getElementById('session-progress-label');
  const cancelBtn = document.getElementById('btn-session-cancel');
  const finishBtn = document.getElementById('btn-session-finish');

  /**
   * Update session progress
   */
  function updateSessionProgress() {
    if (!currentSession) return;

    const allSets = currentSession.items.flatMap(item => item.sets);
    const completedSets = allSets.filter(set => set.isCompleted);
    const percent = allSets.length > 0
      ? Math.round((completedSets.length / allSets.length) * 100)
      : 0;

    sessionProgressBarEl.style.width = `${percent}%`;
    sessionProgressLabelEl.textContent = `${percent}% done`;
    finishBtn.disabled = percent < MIN_COMPLETION_PERCENT;

    // Update start view progress
    if (window.updateStartProgress) {
      window.updateStartProgress(completedSets.length, allSets.length);
    }
  }

  /**
   * Open session modal
   */
  function openSession(session) {
    currentSession = session;
    sessionTitleEl.textContent = session.title;
    sessionDateEl.textContent = new Date(session.date).toLocaleString();
    sessionNotesEl.value = session.notes || '';
    sessionItemsEl.innerHTML = '';

    // Render exercises and sets
    session.items.forEach((item, itemIndex) => {
      const section = createElement(`
        <div class="section">
          <h3>${item.exercise.name}</h3>
          <ul class="reset"></ul>
        </div>
      `);
      const list = section.querySelector('ul');

      item.sets.forEach((set, setIndex) => {
        const row = createElement(`
          <li class="list-item">
            <div class="row" style="gap:10px">
              <button class="btn" aria-pressed="${set.isCompleted}" type="button">
                ${set.isCompleted ? '✓' : '○'}
              </button>
              <div class="pill">Set ${setIndex + 1}</div>
            </div>
            <div class="row">
              <div class="stepper reps">
                <button type="button" data-delta="-1" aria-label="Decrease reps">−</button>
                <output>${set.reps} reps</output>
                <button type="button" data-delta="1" aria-label="Increase reps">＋</button>
              </div>
              <div class="stepper weight">
                <button type="button" data-delta="-${WEIGHT_STEP}" aria-label="Decrease weight">−</button>
                <input type="number" class="weight-input" value="${set.weight}" min="${WEIGHT_MIN}" max="${WEIGHT_MAX}" step="0.1" aria-label="Weight in kg">
                <span class="weight-unit">kg</span>
                <button type="button" data-delta="${WEIGHT_STEP}" aria-label="Increase weight">＋</button>
              </div>
            </div>
          </li>
        `);

        const doneBtn = row.querySelector('button.btn');
        const repsStepper = row.querySelector('.reps');
        const weightStepper = row.querySelector('.weight');
        const repsOutput = repsStepper.querySelector('output');
        const weightInput = weightStepper.querySelector('.weight-input');

        // Reps stepper
        repsStepper.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            const delta = Number(btn.dataset.delta);
            set.reps = clamp(set.reps + delta, REPS_MIN, REPS_MAX);
            repsOutput.textContent = `${set.reps} reps`;
          });
        });

        // Weight input - keyboard support
        weightInput.addEventListener('input', (e) => {
          let value = parseFloat(e.target.value) || 0;
          value = clamp(value, WEIGHT_MIN, WEIGHT_MAX);
          set.weight = roundToOneDecimal(value);
          e.target.value = set.weight;
        });

        weightInput.addEventListener('blur', (e) => {
          let value = parseFloat(e.target.value) || 0;
          value = clamp(value, WEIGHT_MIN, WEIGHT_MAX);
          set.weight = roundToOneDecimal(value);
          e.target.value = set.weight;
        });

        weightInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        });

        // Weight stepper buttons
        weightStepper.querySelectorAll('button').forEach(btn => {
          btn.addEventListener('click', () => {
            const delta = Number(btn.dataset.delta);
            set.weight = clamp(
              roundToOneDecimal(set.weight + delta),
              WEIGHT_MIN,
              WEIGHT_MAX
            );
            weightInput.value = set.weight;
          });
        });

        // Complete button
        doneBtn.addEventListener('click', () => {
          set.isCompleted = !set.isCompleted;
          doneBtn.textContent = set.isCompleted ? '✓' : '○';
          doneBtn.setAttribute('aria-pressed', set.isCompleted);

          // Auto-start rest timer when set is completed
          if (set.isCompleted && window.startRest) {
            window.startRest(restSeconds);
          }

          updateSessionProgress();
        });

        list.appendChild(row);
      });

      sessionItemsEl.appendChild(section);
    });

    // Notes sync
    sessionNotesEl.addEventListener('input', () => {
      if (currentSession) {
        currentSession.notes = sessionNotesEl.value;
      }
    });

    updateSessionProgress();
    sessionModal.classList.add('open');
  }

  // Cancel session
  cancelBtn.addEventListener('click', () => {
    sessionModal.classList.remove('open');
    currentSession = null;
    if (window.updateStartProgress) {
      window.updateStartProgress(0, 0);
    }
  });

  // Close on backdrop click
  sessionModal.addEventListener('click', (e) => {
    if (e.target === sessionModal) {
      sessionModal.classList.remove('open');
      currentSession = null;
      if (window.updateStartProgress) {
        window.updateStartProgress(0, 0);
      }
    }
  });

  // Finish session
  finishBtn.addEventListener('click', () => {
    if (!currentSession) return;

    // Save notes
    currentSession.notes = sessionNotesEl.value;

    // Add to history
    history.unshift(currentSession);
    saveHistory();

    // Close modal
    sessionModal.classList.remove('open');
    currentSession = null;

    // Refresh views
    if (window.refreshStartSummary) {
      window.refreshStartSummary();
    }
    renderHistory();
    renderProgressReport(); // Update progress report
    if (window.updateStartProgress) {
      window.updateStartProgress(0, 0);
    }
  });

  window.openSession = openSession;
}

// ============================================================================
// History View
// ============================================================================

function renderHistory() {
  const historyListEl = document.getElementById('history-list');

  if (history.length === 0) {
    historyListEl.innerHTML = `
      <div class="empty">
        No workouts yet — start a quick one or build a routine.
      </div>
    `;
    return;
  }

  const rows = history.map((session, index) => {
    const exerciseCount = session.items.length;
    const dateStr = dateFormatter.format(new Date(session.date));

    return `
      <div class="list-item">
        <div>
          <div style="font-weight:700">${session.title}</div>
          <div class="muted" style="font-size:12px">${dateStr}</div>
        </div>
        <div class="row">
          <span class="pill">${exerciseCount} ex</span>
          <button class="btn" data-index="${index}" type="button">Open</button>
        </div>
      </div>
    `;
  }).join('');

  historyListEl.innerHTML = rows;

  // Attach event listeners
  historyListEl.querySelectorAll('button[data-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.index);
      openDetails(history[index]);
    });
  });
}

// ============================================================================
// Progress Report
// ============================================================================

/**
 * Get workouts for a specific week
 */
function getWorkoutsForWeek(date = new Date()) {
  const weekStart = getStartOfWeek(date);
  const weekEnd = getEndOfWeek(date);
  return history.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= weekStart && sessionDate < weekEnd;
  });
}

/**
 * Calculate metrics for a set of workouts
 */
function calculateWorkoutMetrics(workouts) {
  const metrics = {
    totalWorkouts: workouts.length,
    totalExercises: 0,
    totalSets: 0,
    totalVolume: 0, // weight × reps for all completed sets
    averageWeight: 0,
    averageReps: 0,
    completedSets: 0,
    exercises: {} // Track per-exercise stats
  };

  workouts.forEach(workout => {
    workout.items.forEach(item => {
      const exerciseName = item.exercise.name;
      if (!metrics.exercises[exerciseName]) {
        metrics.exercises[exerciseName] = {
          totalVolume: 0,
          averageWeight: 0,
          averageReps: 0,
          maxWeight: 0,
          maxReps: 0,
          completedSets: 0,
          totalSets: 0
        };
      }

      metrics.totalExercises++;
      item.sets.forEach(set => {
        metrics.totalSets++;
        metrics.exercises[exerciseName].totalSets++;

        if (set.isCompleted) {
          metrics.completedSets++;
          metrics.exercises[exerciseName].completedSets++;
          
          const volume = set.weight * set.reps;
          metrics.totalVolume += volume;
          metrics.exercises[exerciseName].totalVolume += volume;

          // Update max values
          if (set.weight > metrics.exercises[exerciseName].maxWeight) {
            metrics.exercises[exerciseName].maxWeight = set.weight;
          }
          if (set.reps > metrics.exercises[exerciseName].maxReps) {
            metrics.exercises[exerciseName].maxReps = set.reps;
          }
        }
      });
    });
  });

  // Calculate averages
  if (metrics.completedSets > 0) {
    let totalWeight = 0;
    let totalReps = 0;
    workouts.forEach(workout => {
      workout.items.forEach(item => {
        item.sets.forEach(set => {
          if (set.isCompleted) {
            totalWeight += set.weight;
            totalReps += set.reps;
          }
        });
      });
    });
    metrics.averageWeight = roundToOneDecimal(totalWeight / metrics.completedSets);
    metrics.averageReps = roundToOneDecimal(totalReps / metrics.completedSets);
  }

  // Calculate per-exercise averages
  Object.keys(metrics.exercises).forEach(exerciseName => {
    const ex = metrics.exercises[exerciseName];
    if (ex.completedSets > 0) {
      let totalWeight = 0;
      let totalReps = 0;
      workouts.forEach(workout => {
        workout.items.forEach(item => {
          if (item.exercise.name === exerciseName) {
            item.sets.forEach(set => {
              if (set.isCompleted) {
                totalWeight += set.weight;
                totalReps += set.reps;
              }
            });
          }
        });
      });
      ex.averageWeight = roundToOneDecimal(totalWeight / ex.completedSets);
      ex.averageReps = roundToOneDecimal(totalReps / ex.completedSets);
    }
  });

  return metrics;
}

/**
 * Compare two weeks and calculate improvements
 */
function compareWeeks(currentMetrics, previousMetrics) {
  const improvements = {
    totalWorkouts: {
      current: currentMetrics.totalWorkouts,
      previous: previousMetrics.totalWorkouts,
      change: currentMetrics.totalWorkouts - previousMetrics.totalWorkouts,
      percent: previousMetrics.totalWorkouts > 0 
        ? roundToOneDecimal(((currentMetrics.totalWorkouts - previousMetrics.totalWorkouts) / previousMetrics.totalWorkouts) * 100)
        : 0
    },
    totalVolume: {
      current: roundToOneDecimal(currentMetrics.totalVolume),
      previous: roundToOneDecimal(previousMetrics.totalVolume),
      change: roundToOneDecimal(currentMetrics.totalVolume - previousMetrics.totalVolume),
      percent: previousMetrics.totalVolume > 0
        ? roundToOneDecimal(((currentMetrics.totalVolume - previousMetrics.totalVolume) / previousMetrics.totalVolume) * 100)
        : 0
    },
    averageWeight: {
      current: currentMetrics.averageWeight,
      previous: previousMetrics.averageWeight,
      change: roundToOneDecimal(currentMetrics.averageWeight - previousMetrics.averageWeight),
      percent: previousMetrics.averageWeight > 0
        ? roundToOneDecimal(((currentMetrics.averageWeight - previousMetrics.averageWeight) / previousMetrics.averageWeight) * 100)
        : 0
    },
    averageReps: {
      current: currentMetrics.averageReps,
      previous: previousMetrics.averageReps,
      change: roundToOneDecimal(currentMetrics.averageReps - previousMetrics.averageReps),
      percent: previousMetrics.averageReps > 0
        ? roundToOneDecimal(((currentMetrics.averageReps - previousMetrics.averageReps) / previousMetrics.averageReps) * 100)
        : 0
    },
    completedSets: {
      current: currentMetrics.completedSets,
      previous: previousMetrics.completedSets,
      change: currentMetrics.completedSets - previousMetrics.completedSets,
      percent: previousMetrics.completedSets > 0
        ? roundToOneDecimal(((currentMetrics.completedSets - previousMetrics.completedSets) / previousMetrics.completedSets) * 100)
        : 0
    },
    exercises: {}
  };

  // Compare exercises
  Object.keys(currentMetrics.exercises).forEach(exerciseName => {
    const current = currentMetrics.exercises[exerciseName];
    const previous = previousMetrics.exercises[exerciseName];

    if (previous) {
      improvements.exercises[exerciseName] = {
        averageWeight: {
          current: current.averageWeight,
          previous: previous.averageWeight,
          change: roundToOneDecimal(current.averageWeight - previous.averageWeight),
          percent: previous.averageWeight > 0
            ? roundToOneDecimal(((current.averageWeight - previous.averageWeight) / previous.averageWeight) * 100)
            : 0
        },
        averageReps: {
          current: current.averageReps,
          previous: previous.averageReps,
          change: roundToOneDecimal(current.averageReps - previous.averageReps),
          percent: previous.averageReps > 0
            ? roundToOneDecimal(((current.averageReps - previous.averageReps) / previous.averageReps) * 100)
            : 0
        },
        maxWeight: {
          current: current.maxWeight,
          previous: previous.maxWeight,
          change: roundToOneDecimal(current.maxWeight - previous.maxWeight),
          percent: previous.maxWeight > 0
            ? roundToOneDecimal(((current.maxWeight - previous.maxWeight) / previous.maxWeight) * 100)
            : 0
        },
        maxReps: {
          current: current.maxReps,
          previous: previous.maxReps,
          change: current.maxReps - previous.maxReps,
          percent: previous.maxReps > 0
            ? roundToOneDecimal(((current.maxReps - previous.maxReps) / previous.maxReps) * 100)
            : 0
        },
        totalVolume: {
          current: roundToOneDecimal(current.totalVolume),
          previous: roundToOneDecimal(previous.totalVolume),
          change: roundToOneDecimal(current.totalVolume - previous.totalVolume),
          percent: previous.totalVolume > 0
            ? roundToOneDecimal(((current.totalVolume - previous.totalVolume) / previous.totalVolume) * 100)
            : 0
        }
      };
    }
  });

  return improvements;
}

/**
 * Render progress report
 */
function renderProgressReport() {
  const reportEl = document.getElementById('progress-report');

  if (history.length === 0) {
    reportEl.innerHTML = `
      <div class="empty">
        No workout data available. Complete some workouts to see your progress!
      </div>
    `;
    return;
  }

  // Get current week and previous week workouts
  const currentWeekWorkouts = getWorkoutsForWeek();
  const previousWeekDate = new Date();
  previousWeekDate.setDate(previousWeekDate.getDate() - 7);
  const previousWeekWorkouts = getWorkoutsForWeek(previousWeekDate);

  if (currentWeekWorkouts.length === 0 && previousWeekWorkouts.length === 0) {
    reportEl.innerHTML = `
      <div class="empty">
        No workout data for this week or last week. Start working out to track your progress!
      </div>
    `;
    return;
  }

  const currentMetrics = calculateWorkoutMetrics(currentWeekWorkouts);
  const previousMetrics = calculateWorkoutMetrics(previousWeekWorkouts);
  const improvements = compareWeeks(currentMetrics, previousMetrics);

  let html = '';

  // Overall Statistics
  html += `
    <div class="section">
      <h3>Overall Statistics</h3>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px;">
  `;

  const stats = [
    { label: 'Workouts', key: 'totalWorkouts', unit: '' },
    { label: 'Total Volume', key: 'totalVolume', unit: ' kg' },
    { label: 'Avg Weight', key: 'averageWeight', unit: ' kg' },
    { label: 'Avg Reps', key: 'averageReps', unit: '' },
    { label: 'Completed Sets', key: 'completedSets', unit: '' }
  ];

  stats.forEach(stat => {
    const data = improvements[stat.key];
    const isPositive = data.change >= 0;
    const hasData = previousMetrics[stat.key] > 0 || currentMetrics[stat.key] > 0;

    html += `
      <div class="progress-stat-card">
        <div class="progress-stat-label">${stat.label}</div>
        <div class="progress-stat-value">
          ${data.current}${stat.unit}
        </div>
        ${hasData ? `
          <div class="progress-stat-change ${isPositive ? 'positive' : 'negative'}">
            ${isPositive ? '↑' : '↓'} ${Math.abs(data.change)}${stat.unit}
            ${data.percent !== 0 ? `(${isPositive ? '+' : ''}${data.percent}%)` : ''}
          </div>
          <div class="progress-stat-previous muted">Previous: ${data.previous}${stat.unit}</div>
        ` : '<div class="progress-stat-change muted">No previous data</div>'}
      </div>
    `;
  });

  html += `</div></div>`;

  // Exercise-specific improvements
  const exerciseImprovements = Object.keys(improvements.exercises);
  if (exerciseImprovements.length > 0) {
    html += `
      <div class="section">
        <h3>Exercise Improvements</h3>
        <div class="exercise-improvements">
    `;

    exerciseImprovements.forEach(exerciseName => {
      const ex = improvements.exercises[exerciseName];
      html += `
        <div class="exercise-improvement-card">
          <div class="exercise-improvement-header">
            <strong>${exerciseName}</strong>
          </div>
          <div class="exercise-improvement-stats">
            <div class="improvement-item">
              <span class="improvement-label">Max Weight:</span>
              <span class="improvement-value">${ex.maxWeight.current} kg</span>
              ${ex.maxWeight.previous > 0 ? `
                <span class="improvement-change ${ex.maxWeight.change >= 0 ? 'positive' : 'negative'}">
                  ${ex.maxWeight.change >= 0 ? '↑' : '↓'} ${Math.abs(ex.maxWeight.change)} kg
                  ${ex.maxWeight.percent !== 0 ? `(${ex.maxWeight.percent >= 0 ? '+' : ''}${ex.maxWeight.percent}%)` : ''}
                </span>
              ` : ''}
            </div>
            <div class="improvement-item">
              <span class="improvement-label">Avg Weight:</span>
              <span class="improvement-value">${ex.averageWeight.current} kg</span>
              ${ex.averageWeight.previous > 0 ? `
                <span class="improvement-change ${ex.averageWeight.change >= 0 ? 'positive' : 'negative'}">
                  ${ex.averageWeight.change >= 0 ? '↑' : '↓'} ${Math.abs(ex.averageWeight.change)} kg
                  ${ex.averageWeight.percent !== 0 ? `(${ex.averageWeight.percent >= 0 ? '+' : ''}${ex.averageWeight.percent}%)` : ''}
                </span>
              ` : ''}
            </div>
            <div class="improvement-item">
              <span class="improvement-label">Max Reps:</span>
              <span class="improvement-value">${ex.maxReps.current}</span>
              ${ex.maxReps.previous > 0 ? `
                <span class="improvement-change ${ex.maxReps.change >= 0 ? 'positive' : 'negative'}">
                  ${ex.maxReps.change >= 0 ? '↑' : '↓'} ${Math.abs(ex.maxReps.change)}
                  ${ex.maxReps.percent !== 0 ? `(${ex.maxReps.percent >= 0 ? '+' : ''}${ex.maxReps.percent}%)` : ''}
                </span>
              ` : ''}
            </div>
            <div class="improvement-item">
              <span class="improvement-label">Avg Reps:</span>
              <span class="improvement-value">${ex.averageReps.current}</span>
              ${ex.averageReps.previous > 0 ? `
                <span class="improvement-change ${ex.averageReps.change >= 0 ? 'positive' : 'negative'}">
                  ${ex.averageReps.change >= 0 ? '↑' : '↓'} ${Math.abs(ex.averageReps.change)}
                  ${ex.averageReps.percent !== 0 ? `(${ex.averageReps.percent >= 0 ? '+' : ''}${ex.averageReps.percent}%)` : ''}
                </span>
              ` : ''}
            </div>
            <div class="improvement-item">
              <span class="improvement-label">Total Volume:</span>
              <span class="improvement-value">${ex.totalVolume.current} kg</span>
              ${ex.totalVolume.previous > 0 ? `
                <span class="improvement-change ${ex.totalVolume.change >= 0 ? 'positive' : 'negative'}">
                  ${ex.totalVolume.change >= 0 ? '↑' : '↓'} ${Math.abs(ex.totalVolume.change)} kg
                  ${ex.totalVolume.percent !== 0 ? `(${ex.totalVolume.percent >= 0 ? '+' : ''}${ex.totalVolume.percent}%)` : ''}
                </span>
              ` : ''}
            </div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  }

  reportEl.innerHTML = html;
}

// ============================================================================
// Details Modal
// ============================================================================

function initializeDetailsModal() {
  const detailsModal = document.getElementById('details-modal');
  const detailsTitleEl = document.getElementById('details-title');
  const detailsDateEl = document.getElementById('details-date');
  const detailsBodyEl = document.getElementById('details-body');
  const closeBtn = document.getElementById('btn-details-close');

  /**
   * Open details modal
   */
  function openDetails(session) {
    detailsTitleEl.textContent = session.title;
    detailsDateEl.textContent = dateFormatter.format(new Date(session.date));

    let html = '';
    session.items.forEach(item => {
      html += `
        <div class="section">
          <h3>${item.exercise.name}</h3>
          <table>
            <thead>
              <tr>
                <th>Set</th>
                <th>Reps</th>
                <th>Weight</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
      `;

      item.sets.forEach((set, index) => {
        html += `
          <tr>
            <td>${index + 1}</td>
            <td>${set.reps}</td>
            <td>${set.weight} kg</td>
            <td>${set.isCompleted ? '✓' : '○'}</td>
          </tr>
        `;
      });

      html += `
            </tbody>
          </table>
        </div>
      `;
    });

    detailsBodyEl.innerHTML = html;
    detailsModal.classList.add('open');
  }

  closeBtn.addEventListener('click', () => {
    detailsModal.classList.remove('open');
  });

  // Close on backdrop click
  detailsModal.addEventListener('click', (e) => {
    if (e.target === detailsModal) {
      detailsModal.classList.remove('open');
    }
  });

  window.openDetails = openDetails;
}

// ============================================================================
// Application Initialization
// ============================================================================

/**
 * Initialize the application
 */
function initializeApp() {
  // Load history
  history = loadHistory();

  // Initialize all modules
  initializeTabs();
  initializeStartView();
  initializeRestTimer();
  initializeQuickWorkout();
  initializeBuildView();
  initializeSessionModal();
  initializeDetailsModal();

  // Initial render
  renderHistory();
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

