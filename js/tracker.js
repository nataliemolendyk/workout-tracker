(function() {
  'use strict';

  // ============================================================
  // STORAGE KEYS
  // ============================================================
  const STORAGE_KEYS = {
    profile: 'workout_profile',
    progress: 'workout_progress',
    exercises: 'custom_exercises'
  };

  // ============================================================
  // STATE
  // ============================================================
  let profile = null;
  let progress = [];
  let customExercises = [];

  // ============================================================
  // LABELS
  // ============================================================
  const LABELS = {
    muscle: {
      chest: 'Chest', back: 'Back', shoulders: 'Shoulders',
      arms: 'Arms', legs: 'Legs', core: 'Core', cardio: 'Cardio',
      full_body: 'Full Body', upper: 'Upper Body', lower: 'Lower Body'
    },
    equipment: {
      none: 'Bodyweight', dumbbell: 'Dumbbell', barbell: 'Barbell',
      machine: 'Machine', cardio_machine: 'Cardio Machine'
    }
  };

  const label = (type, key) => LABELS[type]?.[key] || key;

  // ============================================================
  // 2. EXERCISE LIBRARY
  // ============================================================
  const EXERCISES = [
    { id: 'e1', name: 'Push-ups', muscle: 'chest', equipment: 'none', difficulty: 'beginner',
      description: 'Standard push‑up on floor or knees',
      reps: '10–15 reps' },
    { id: 'e2', name: 'Bench Press', muscle: 'chest', equipment: 'barbell', difficulty: 'intermediate',
      description: 'Barbell bench press on flat bench',
      reps: '8–12 reps' },
    { id: 'e3', name: 'Incline Dumbbell Press', muscle: 'chest', equipment: 'dumbbell', difficulty: 'intermediate',
      description: 'Incline bench press with dumbbells',
      reps: '10–12 reps' },
    { id: 'e4', name: 'Chest Fly (Machine)', muscle: 'chest', equipment: 'machine', difficulty: 'beginner',
      description: 'Seated chest fly machine',
      reps: '12–15 reps' },
    { id: 'e5', name: 'Pull-Ups', muscle: 'back', equipment: 'none', difficulty: 'intermediate',
      description: 'Overhand grip pull‑ups',
      reps: '6–10 reps' },
    { id: 'e6', name: 'Bent Over Rows', muscle: 'back', equipment: 'barbell', difficulty: 'intermediate',
      description: 'Barbell rows with pronated grip',
      reps: '8–10 reps' },
    { id: 'e7', name: 'Lat Pulldown', muscle: 'back', equipment: 'machine', difficulty: 'beginner',
      description: 'Wide grip lat pulldown machine',
      reps: '10–12 reps' },
    { id: 'e8', name: 'Seated Cable Row', muscle: 'back', equipment: 'machine', difficulty: 'beginner',
      description: 'Seated cable row with V‑bar',
      reps: '10–12 reps' },
    { id: 'e9', name: 'Overhead Press', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'intermediate',
      description: 'Seated dumbbell overhead press',
      reps: '8–10 reps' },
    { id: 'e10', name: 'Lateral Raises', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'beginner',
      description: 'Standing lateral raises with light weights',
      reps: '12–15 reps' },
    { id: 'e11', name: 'Front Raises', muscle: 'shoulders', equipment: 'dumbbell', difficulty: 'beginner',
      description: 'Standing front raises with dumbbells',
      reps: '12–15 reps' },
    { id: 'e12', name: 'Bicep Curls', muscle: 'arms', equipment: 'dumbbell', difficulty: 'beginner',
      description: 'Standing dumbbell bicep curls',
      reps: '10–12 reps' },
    { id: 'e13', name: 'Tricep Dips', muscle: 'arms', equipment: 'none', difficulty: 'intermediate',
      description: 'Bench or parallel bar dips',
      reps: '8–12 reps' },
    { id: 'e14', name: 'Squats', muscle: 'legs', equipment: 'none', difficulty: 'beginner',
      description: 'Bodyweight or barbell squats',
      reps: '10–15 reps' },
    { id: 'e15', name: 'Lunges', muscle: 'legs', equipment: 'none', difficulty: 'beginner',
      description: 'Alternating walking or reverse lunges',
      reps: '10–12 per leg' },
    { id: 'e16', name: 'Deadlifts', muscle: 'back', equipment: 'barbell', difficulty: 'advanced',
      description: 'Conventional deadlifts with barbell',
      reps: '5–8 reps' },
    { id: 'e17', name: 'Plank', muscle: 'core', equipment: 'none', difficulty: 'beginner',
      description: 'Forearm plank hold',
      reps: '30–60 sec' },
    { id: 'e18', name: 'Crunches', muscle: 'core', equipment: 'none', difficulty: 'beginner',
      description: 'Floor crunches',
      reps: '15–20 reps' },
    { id: 'e19', name: 'Running', muscle: 'cardio', equipment: 'none', difficulty: 'intermediate',
      description: 'Outdoor or treadmill run',
      reps: '20–30 min' },
    { id: 'e20', name: 'Cycling', muscle: 'cardio', equipment: 'none', difficulty: 'intermediate',
      description: 'Stationary bike or outdoor cycling',
      reps: '20–40 min' }
  ];

  // ============================================================
  // STORAGE HELPERS
  // ============================================================
  function loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // ============================================================
  // TAB SWITCHING
  // ============================================================
  function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    const target = document.getElementById(tabId);
    if (target) target.classList.add('active');
    
    const btn = document.querySelector(`.tab-btn[data-tab="${tabId.replace('tab-', '')}"]`);
    if (btn) btn.classList.add('active');
  }

  // ============================================================
  // NOTIFICATION
  // ============================================================
  function showNotification(message) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const el = document.createElement('div');
    el.className = 'notification';
    el.textContent = message;
    document.body.appendChild(el);
    
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 300);
    }, 2000);
  }

  // ============================================================
  // MACRO SUM
  // ============================================================
  function updateMacroSum() {
    const protein = parseInt(document.getElementById('protein-pct')?.value) || 0;
    const carbs = parseInt(document.getElementById('carbs-pct')?.value) || 0;
    const fat = parseInt(document.getElementById('fat-pct')?.value) || 0;
    const sum = protein + carbs + fat;
    const el = document.getElementById('macro-sum');
    if (el) {
      el.textContent = `Total: ${sum}%`;
      el.style.color = Math.abs(sum - 100) <= 0.5 ? '#475569' : '#e74c3c';
    }
  }

  // ============================================================
  // PROFILE FORM
  // ============================================================
  function saveProfile() {
    const profileData = {
      heightCm: parseFloat(document.getElementById('height-cm')?.value) || 0,
      heightFt: parseInt(document.getElementById('height-ft')?.value) || 0,
      heightIn: parseInt(document.getElementById('height-in')?.value) || 0,
      weight: parseFloat(document.getElementById('weight')?.value) || 0,
      age: parseInt(document.getElementById('age')?.value) || 25,
      sex: document.getElementById('sex')?.value || 'male',
      goalWeight: parseFloat(document.getElementById('goal-weight')?.value) || 0,
      activity: parseFloat(document.getElementById('activity')?.value || '1.55'),
      workoutDays: parseInt(document.getElementById('workout-days')?.value) || 3,
      proteinPct: parseInt(document.getElementById('protein-pct')?.value) || 30,
      carbsPct: parseInt(document.getElementById('carbs-pct')?.value) || 40,
      fatPct: parseInt(document.getElementById('fat-pct')?.value) || 30,
      macrosEnabled: document.getElementById('macros-toggle')?.checked ?? true
    };

    saveToStorage(STORAGE_KEYS.profile, profileData);
    profile = profileData;
    calculatePlan();
    generateSchedule();
    showNotification('Profile saved!');
  }

  function resetProfile() {
    if (!confirm('Clear all profile data and start fresh?')) return;

    localStorage.removeItem(STORAGE_KEYS.profile);
    localStorage.removeItem(STORAGE_KEYS.progress);
    profile = null;
    progress = [];

    // Reset form fields to defaults
    document.getElementById('height-cm').value = '';
    document.getElementById('height-ft').value = '';
    document.getElementById('height-in').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('age').value = '';
    document.getElementById('sex').value = 'male';
    document.getElementById('goal-weight').value = '';
    document.getElementById('activity').value = '1.55';
    document.getElementById('workout-days').value = '3';
    document.getElementById('protein-pct').value = '30';
    document.getElementById('carbs-pct').value = '40';
    document.getElementById('fat-pct').value = '30';

    // Reset macros toggle
    const macrosToggle = document.getElementById('macros-toggle');
    const macrosFields = document.getElementById('macros-fields');
    if (macrosToggle) macrosToggle.checked = true;
    if (macrosFields) macrosFields.classList.remove('hidden');

    const daysVal = document.getElementById('workout-days-value');
    if (daysVal) daysVal.textContent = '3';

    updateMacroSum();

    // Clear plan results
    ['plan-bmr', 'plan-tdee', 'plan-calories', 'plan-protein', 'plan-carbs', 'plan-fat'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '—';
    });

    // Clear schedule
    const scheduleOutput = document.getElementById('schedule-output');
    if (scheduleOutput) {
      scheduleOutput.innerHTML = '<p>Complete your profile to generate a workout schedule.</p>';
    }

    showNotification('Profile has been reset!');
  }

  function loadProfile() {
    const saved = loadFromStorage(STORAGE_KEYS.profile, null);
    if (saved) {
      profile = saved;
      document.getElementById('height-cm').value = saved.heightCm || '';
      document.getElementById('height-ft').value = saved.heightFt || '';
      document.getElementById('height-in').value = saved.heightIn || '';
      document.getElementById('weight').value = saved.weight || '';
      document.getElementById('age').value = saved.age || '';
      document.getElementById('sex').value = saved.sex || 'male';
      document.getElementById('goal-weight').value = saved.goalWeight || '';
      document.getElementById('activity').value = saved.activity || '1.55';
      document.getElementById('workout-days').value = saved.workoutDays || 3;
      document.getElementById('protein-pct').value = saved.proteinPct || 30;
      document.getElementById('carbs-pct').value = saved.carbsPct || 40;
      document.getElementById('fat-pct').value = saved.fatPct || 30;

      const daysVal = document.getElementById('workout-days-value');
      if (daysVal) daysVal.textContent = saved.workoutDays || 3;

      // Restore macros toggle
      const macrosToggle = document.getElementById('macros-toggle');
      const macrosFields = document.getElementById('macros-fields');
      const macrosEnabled = saved.macrosEnabled !== false;
      if (macrosToggle) macrosToggle.checked = macrosEnabled;
      if (macrosFields) macrosFields.classList.toggle('hidden', !macrosEnabled);

      updateMacroSum();
      calculatePlan();
      generateSchedule();
    }
  }

  // ============================================================
  // PLAN CALCULATIONS
  // ============================================================
  function calculatePlan() {
    const heightCm = parseFloat(document.getElementById('height-cm')?.value) || 175;
    const weight = parseFloat(document.getElementById('weight')?.value) || 70;
    const age = parseInt(document.getElementById('age')?.value) || 30;
    const sex = document.getElementById('sex')?.value || 'male';
    const activity = parseFloat(document.getElementById('activity')?.value) || 1.55;
    const goalWeight = parseFloat(document.getElementById('goal-weight')?.value) || weight;

    // Mifflin-St Jeor BMR
    let bmr;
    if (sex === 'male') {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * heightCm - 5 * age - 161;
    }

    const tdee = Math.round(bmr * activity);
    const weightDiff = goalWeight - weight;
    const totalCaloriesNeeded = weightDiff * 7700;

    // Default to 12 weeks if no timeframe set
    const weeks = parseInt(document.getElementById('custom-weeks')?.value) || 12;
    const dailyCalorieAdjustment = Math.round(totalCaloriesNeeded / (weeks * 7));
    const targetCalories = Math.max(tdee + dailyCalorieAdjustment, 1200);

    // Macros
    const macrosEnabled = document.getElementById('macros-toggle')?.checked ?? true;
    let proteinPct, carbsPct, fatPct, proteinG, carbsG, fatG;

    if (macrosEnabled) {
      proteinPct = parseInt(document.getElementById('protein-pct')?.value) || 30;
      carbsPct = parseInt(document.getElementById('carbs-pct')?.value) || 40;
      fatPct = parseInt(document.getElementById('fat-pct')?.value) || 30;

      proteinG = Math.round((targetCalories * (proteinPct / 100)) / 4);
      carbsG = Math.round((targetCalories * (carbsPct / 100)) / 4);
      fatG = Math.round((targetCalories * (fatPct / 100)) / 9);
    } else {
      proteinPct = carbsPct = fatPct = 0;
      proteinG = carbsG = fatG = 0;
    }

    // Update DOM
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setText('plan-bmr', `${bmr} kcal`);
    setText('plan-tdee', `${tdee} kcal`);
    setText('plan-calories', `${targetCalories} kcal`);
    setText('plan-protein', macrosEnabled ? `${proteinG}g (${proteinPct}%)` : '—');
    setText('plan-carbs', macrosEnabled ? `${carbsG}g (${carbsPct}%)` : '—');
    setText('plan-fat', macrosEnabled ? `${fatG}g (${fatPct}%)` : '—');

    // Also update old-style IDs if they exist
    setText('bmr-result', `${bmr} kcal`);
    setText('tdee-result', `${tdee} kcal`);
    setText('target-calories', `${targetCalories} kcal`);
    setText('protein-g', `${proteinG}g`);
    setText('carbs-g', `${carbsG}g`);
    setText('fat-g', `${fatG}g`);
  }

  // ============================================================
  // SCHEDULE GENERATION
  // ============================================================
  function generateSchedule() {
    const days = parseInt(document.getElementById('workout-days')?.value) || 3;
    const routines = {
      1: ['Full Body'],
      2: ['Upper Body', 'Lower Body'],
      3: ['Push', 'Pull', 'Legs'],
      4: ['Upper Body', 'Lower Body', 'Push', 'Pull'],
      5: ['Chest/Triceps', 'Back/Biceps', 'Legs', 'Shoulders', 'Full Body'],
      6: ['Push', 'Pull', 'Legs', 'Upper Body', 'Lower Body', 'Full Body'],
      7: ['Push', 'Pull', 'Legs', 'Upper Body', 'Lower Body', 'Full Body', 'Cardio/Core']
    };

    const selected = routines[days] || routines[3];
    const container = document.getElementById('schedule-output');
    if (!container) return;

    container.innerHTML = '';

    selected.forEach((routine, index) => {
      const card = document.createElement('div');
      card.className = 'schedule-card';
      card.innerHTML = `
        <h4>Day ${index + 1}</h4>
        <p><span class="tag tag-muscle">${routine}</span></p>
        <p class="routine-desc">${getRoutineDescription(routine)}</p>
      `;
      container.appendChild(card);
    });
  }

  function getRoutineDescription(routine) {
    const descriptions = {
      'Upper Body': 'Chest, Back, Shoulders, Arms',
      'Lower Body': 'Quads, Hamstrings, Glutes, Calves',
      'Push': 'Chest, Shoulders, Triceps',
      'Pull': 'Back, Biceps, Rear Delts',
      'Legs': 'Quads, Hamstrings, Glutes, Calves',
      'Full Body': 'All major muscle groups',
      'Chest/Triceps': 'Chest and triceps focus',
      'Back/Biceps': 'Back and biceps focus',
      'Shoulders': 'Shoulder press, lateral raises, rear delts',
      'Cardio/Core': 'Cardio and abdominal work'
    };
    return descriptions[routine] || 'Targeted workout for this muscle group';
  }

  // ============================================================
  // LIBRARY RENDER
  // ============================================================
  function renderLibrary() {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;

    const search = document.getElementById('search-exercise')?.value?.toLowerCase() || '';
    const muscle = document.getElementById('filter-muscle')?.value || '';
    const equipment = document.getElementById('filter-equipment')?.value || '';

    const allExercises = [...EXERCISES, ...customExercises];

    const filtered = allExercises.filter(ex => {
      if (search && !ex.name.toLowerCase().includes(search)) return false;
      if (muscle && ex.muscle !== muscle) return false;
      if (equipment && ex.equipment !== equipment) return false;
      return true;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="color: #64748b; text-align: center; grid-column: 1/-1;">No exercises found. Try adjusting your filters.</p>';
      return;
    }

    filtered.forEach(ex => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <h4>${ex.name}</h4>
        <p class="ex-description">${ex.description || ''}</p>
        <p><strong>${ex.reps || ''}</strong></p>
        <p>${label('muscle', ex.muscle)} · ${label('equipment', ex.equipment)} · ${ex.difficulty}</p>
        <div class="exercise-tags">
          <span class="tag tag-muscle">${label('muscle', ex.muscle)}</span>
          <span class="tag tag-equipment">${label('equipment', ex.equipment)}</span>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  // ============================================================
  // CUSTOM EXERCISE
  // ============================================================
  function addCustomExercise(e) {
    e.preventDefault();

    const name = document.getElementById('cust-name')?.value?.trim();
    if (!name) {
      showNotification('Please enter an exercise name.');
      return;
    }

    const description = document.getElementById('cust-desc')?.value?.trim() || '';
    const reps = document.getElementById('cust-reps')?.value?.trim() || '';
    const sets = document.getElementById('cust-sets')?.value?.trim() || '';
    const rest = document.getElementById('cust-rest')?.value?.trim() || '';
    const muscle = document.getElementById('cust-muscle')?.value || 'upper';
    const equipment = document.getElementById('cust-equipment')?.value || 'none';

    const newEx = {
      id: 'c' + Date.now(),
      name,
      description: description || 'No description',
      reps: reps ? reps + (sets ? ' · ' + sets + ' sets' : '') : (sets ? sets + ' sets' : ''),
      rest: rest || '',
      muscle,
      equipment,
      difficulty: 'beginner'
    };

    customExercises.push(newEx);
    saveToStorage(STORAGE_KEYS.exercises, customExercises);
    renderLibrary();
    showNotification(`${name} added to library!`);

    // Reset form
    document.getElementById('cust-name').value = '';
    document.getElementById('cust-desc').value = '';
    document.getElementById('cust-reps').value = '';
    document.getElementById('cust-sets').value = '';
    document.getElementById('cust-rest').value = '';
  }

  // ============================================================
  // WEIGHT PROGRESS
  // ============================================================
  function logWeight() {
    const date = document.getElementById('progress-date')?.value;
    const weight = parseFloat(document.getElementById('progress-weight')?.value);

    if (!date || !weight) {
      showNotification('Please enter a date and weight.');
      return;
    }

    progress.push({ date, weight });
    saveToStorage(STORAGE_KEYS.progress, progress);
    document.getElementById('progress-weight').value = '';
    renderWeightChart();
    showNotification(`Weight logged: ${weight} kg`);
  }

  function clearProgress() {
    if (!confirm('Clear all weight progress data?')) return;

    localStorage.removeItem(STORAGE_KEYS.progress);
    progress = [];
    renderWeightChart();
    showNotification('Weight progress cleared!');
  }

  function renderWeightChart() {
    const canvas = document.getElementById('weight-chart');
    if (!canvas) return;

    const savedProgress = loadFromStorage(STORAGE_KEYS.progress, []);
    progress = savedProgress;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    ctx.clearRect(0, 0, w, h);

    if (progress.length < 2) {
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.font = '14px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.fillText('Log at least 2 weight entries to see the chart', w / 2, h / 2);
      return;
    }

    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    const values = progress.map(p => p.weight);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const range = maxVal - minVal || 1;
    const padding_range = range * 0.1;
    const yMin = minVal - padding_range;
    const yMax = maxVal + padding_range;
    const yRange = yMax - yMin;

    // Grid lines
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      const val = yMax - (yRange / 4) * i;
      ctx.fillStyle = 'rgba(0,0,0,0.4)';
      ctx.font = '11px Georgia, serif';
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(1), padding.left - 8, y + 4);
    }

    // Draw line
    const stepX = (progress.length > 1) ? chartW / (progress.length - 1) : 0;

    // Fill area
    ctx.beginPath();
    progress.forEach((p, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartH - ((p.weight - yMin) / yRange) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const lastX = padding.left + (progress.length - 1) * stepX;
    const lastY = padding.top + chartH - ((values[values.length - 1] - yMin) / yRange) * chartH;
    ctx.lineTo(lastX, padding.top + chartH);
    ctx.lineTo(padding.left, padding.top + chartH);
    ctx.closePath();
    ctx.fillStyle = 'rgba(158, 195, 174, 0.15)';
    ctx.fill();

    // Draw line
    ctx.beginPath();
    progress.forEach((p, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartH - ((p.weight - yMin) / yRange) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#9ec3ae';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Draw points
    progress.forEach((p, i) => {
      const x = padding.left + i * stepX;
      const y = padding.top + chartH - ((p.weight - yMin) / yRange) * chartH;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#9ec3ae';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // X-axis labels (show first, last, and maybe middle)
    const labelIndices = [0];
    if (progress.length > 2) labelIndices.push(Math.floor(progress.length / 2));
    if (progress.length > 1) labelIndices.push(progress.length - 1);

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.font = '11px Georgia, serif';
    ctx.textAlign = 'center';
    labelIndices.forEach(i => {
      const x = padding.left + i * stepX;
      const d = new Date(progress[i].date);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      ctx.fillText(label, x, h - 6);
    });
  }

  // ============================================================
  // EVENT SETUP
  // ============================================================
  function setupEventListeners() {
    // Tab switching with delegation
    document.querySelector('.tabs')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.tab-btn');
      if (btn) switchTab('tab-' + btn.dataset.tab);
    });

    // Profile inputs
    const profileInputs = ['height-cm', 'height-ft', 'height-in', 'weight', 'age', 'goal-weight', 'activity'];
    profileInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', calculatePlan);
        el.addEventListener('change', calculatePlan);
      }
    });

    // Workout days slider
    const slider = document.getElementById('workout-days');
    const valDisplay = document.getElementById('workout-days-value');
    if (slider && valDisplay) {
      slider.addEventListener('input', function() {
        valDisplay.textContent = this.value;
        generateSchedule();
      });
    }

    // Macro inputs
    document.querySelectorAll('#protein-pct, #carbs-pct, #fat-pct').forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          updateMacroSum();
          calculatePlan();
        });
      }
    });

    // Library filters
    const searchInput = document.getElementById('search-exercise');
    if (searchInput) searchInput.addEventListener('input', renderLibrary);

    const muscleFilter = document.getElementById('filter-muscle');
    if (muscleFilter) muscleFilter.addEventListener('change', renderLibrary);

    const equipFilter = document.getElementById('filter-equipment');
    if (equipFilter) equipFilter.addEventListener('change', renderLibrary);

    // Custom exercise form
    const custForm = document.getElementById('custom-exercise-form');
    if (custForm) {
      custForm.addEventListener('submit', addCustomExercise);
    }

    // Log weight
    const logBtn = document.getElementById('log-weight');
    if (logBtn) logBtn.addEventListener('click', logWeight);

    // Clear progress
    const clearBtn = document.getElementById('clear-progress');
    if (clearBtn) clearBtn.addEventListener('click', clearProgress);

    // Set today's date
    const dateInput = document.getElementById('progress-date');
    if (dateInput) dateInput.valueAsDate = new Date();

    // Height unit toggle (special: shows/hides cm vs ft/in)
    document.querySelectorAll('#height-unit-buttons .unit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('#height-unit-buttons .unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const isFtIn = this.dataset.unit === 'ftin';
        document.getElementById('height-ftin').style.display = isFtIn ? 'flex' : 'none';
        document.getElementById('height-cm').style.display = isFtIn ? 'none' : 'block';
      });
    });

    // Weight and goal weight toggles via delegation
    setupUnitToggle('weight-unit-buttons');
    setupUnitToggle('goal-unit-buttons');

    // Save & Reset profile
    document.getElementById('save-profile')?.addEventListener('click', saveProfile);
    document.getElementById('reset-profile')?.addEventListener('click', resetProfile);

    // Macros toggle
    const macrosToggle = document.getElementById('macros-toggle');
    const macrosFields = document.getElementById('macros-fields');
    if (macrosToggle && macrosFields) {
      macrosToggle.addEventListener('change', function() {
        macrosFields.classList.toggle('hidden', !this.checked);
        calculatePlan();
      });
    }
  }

  // ============================================================
  // UNIT TOGGLE HELPER
  // ============================================================
  function setupUnitToggle(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.unit-btn');
      if (!btn) return;
      container.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  }

  // ============================================================
  // INIT
  // ============================================================
  function init() {
    progress = loadFromStorage(STORAGE_KEYS.progress, []);
    customExercises = loadFromStorage(STORAGE_KEYS.exercises, []);

    loadProfile();
    renderLibrary();
    renderWeightChart();
    setupEventListeners();
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();