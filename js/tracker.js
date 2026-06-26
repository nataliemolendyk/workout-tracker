(function() {
  'use strict';

  // ============================================================
  // 1. EXERCISE LIBRARY (built-in)
  // ============================================================
  const BUILTIN_EXERCISES = [
    // Upper Body
    { id: 'u1', name: 'Push-ups', description: 'Standard push-up, chest to floor.', muscleGroup: 'upper', equipment: 'none', reps: '15-20', sets: 3, rest: '30 sec' },
    { id: 'u2', name: 'Dumbbell Bench Press', description: 'Lie on bench, press dumbbells up.', muscleGroup: 'upper', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'u3', name: 'Bent Over Rows', description: 'Hinge at hips, pull weight to chest.', muscleGroup: 'upper', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'u4', name: 'Overhead Press', description: 'Press dumbbells overhead from shoulders.', muscleGroup: 'upper', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'u5', name: 'Bicep Curls', description: 'Curl dumbbells with palms up.', muscleGroup: 'upper', equipment: 'dumbbell', reps: '15-20', sets: 3, rest: '30 sec' },
    { id: 'u6', name: 'Tricep Dips', description: 'Use a chair or bench, lower body.', muscleGroup: 'upper', equipment: 'none', reps: '12-15', sets: 3, rest: '30 sec' },
    { id: 'u7', name: 'Lat Pulldown', description: 'Pull bar down to chest (machine or band).', muscleGroup: 'upper', equipment: 'machine', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'u8', name: 'Dumbbell Flyes', description: 'Lie on bench, open arms wide.', muscleGroup: 'upper', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    // Lower Body
    { id: 'l1', name: 'Bodyweight Squats', description: 'Feet shoulder-width, lower hips.', muscleGroup: 'lower', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'l2', name: 'Lunges', description: 'Step forward, lower back knee.', muscleGroup: 'lower', equipment: 'none', reps: '12-15 each', sets: 3, rest: '30 sec' },
    { id: 'l3', name: 'Goblet Squats', description: 'Hold dumbbell at chest, squat.', muscleGroup: 'lower', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'l4', name: 'Romanian Deadlifts', description: 'Hinge at hips, keep back straight.', muscleGroup: 'lower', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'l5', name: 'Glute Bridges', description: 'Lie on back, lift hips up.', muscleGroup: 'lower', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'l6', name: 'Calf Raises', description: 'Stand on edge, raise heels.', muscleGroup: 'lower', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'l7', name: 'Step-ups', description: 'Step onto a bench/chair, alternate legs.', muscleGroup: 'lower', equipment: 'none', reps: '12-15 each', sets: 3, rest: '30 sec' },
    { id: 'l8', name: 'Deadlifts (Barbell)', description: 'Lift barbell from floor, hips drive.', muscleGroup: 'lower', equipment: 'barbell', reps: '10-12', sets: 3, rest: '60 sec' },
    // Core
    { id: 'c1', name: 'Plank', description: 'Hold straight body position on forearms.', muscleGroup: 'core', equipment: 'none', reps: '30-45 sec', sets: 3, rest: '30 sec' },
    { id: 'c2', name: 'Crunches', description: 'Lie on back, curl shoulders up.', muscleGroup: 'core', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'c3', name: 'Russian Twists', description: 'Sit, lean back, twist side to side.', muscleGroup: 'core', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'c4', name: 'Leg Raises', description: 'Lie flat, raise legs to 90 degrees.', muscleGroup: 'core', equipment: 'none', reps: '15-20', sets: 3, rest: '30 sec' },
    { id: 'c5', name: 'Bicycle Crunches', description: 'Alternate elbow to knee while cycling legs.', muscleGroup: 'core', equipment: 'none', reps: '20-25', sets: 3, rest: '30 sec' },
    { id: 'c6', name: 'Mountain Climbers', description: 'Plank position, drive knees to chest.', muscleGroup: 'core', equipment: 'none', reps: '30-45 sec', sets: 3, rest: '30 sec' },
    // Cardio
    { id: 'ca1', name: 'Jumping Jacks', description: 'Jump out and in with arms overhead.', muscleGroup: 'cardio', equipment: 'none', reps: '45-60 sec', sets: 3, rest: '30 sec' },
    { id: 'ca2', name: 'High Knees', description: 'Run in place, drive knees up.', muscleGroup: 'cardio', equipment: 'none', reps: '45-60 sec', sets: 3, rest: '30 sec' },
    { id: 'ca3', name: 'Burpees', description: 'Squat, kick back, push-up, jump up.', muscleGroup: 'cardio', equipment: 'none', reps: '10-15', sets: 3, rest: '45 sec' },
    { id: 'ca4', name: 'Jump Rope', description: 'Skip rope at moderate pace.', muscleGroup: 'cardio', equipment: 'none', reps: '60 sec', sets: 3, rest: '30 sec' },
    { id: 'ca5', name: 'Treadmill Jog', description: 'Jog at steady pace.', muscleGroup: 'cardio', equipment: 'cardio_machine', reps: '10-15 min', sets: 1, rest: '0 sec' },
    { id: 'ca6', name: 'Stationary Bike', description: 'Cycle at moderate intensity.', muscleGroup: 'cardio', equipment: 'cardio_machine', reps: '10-15 min', sets: 1, rest: '0 sec' },
    // Full Body
    { id: 'fb1', name: 'Kettlebell Swings', description: 'Hinge and swing bell to chest height.', muscleGroup: 'full_body', equipment: 'dumbbell', reps: '15-20', sets: 3, rest: '45 sec' },
    { id: 'fb2', name: 'Thrusters', description: 'Squat then press dumbbells overhead.', muscleGroup: 'full_body', equipment: 'dumbbell', reps: '12-15', sets: 3, rest: '45 sec' },
    { id: 'fb3', name: 'Clean and Press', description: 'Pull weight from floor to overhead.', muscleGroup: 'full_body', equipment: 'dumbbell', reps: '10-12', sets: 3, rest: '60 sec' },
    { id: 'fb4', name: 'Bear Crawls', description: 'Crawl on hands and feet forward/back.', muscleGroup: 'full_body', equipment: 'none', reps: '30-45 sec', sets: 3, rest: '30 sec' },
  ];

  // ============================================================
  // 2. STATE
  // ============================================================
  let profile = null;
  let progress = [];
  let customExercises = [];
  let weightChart = null;

  const STORAGE_KEYS = {
    profile: 'workout_profile',
    progress: 'workout_progress',
    exercises: 'workout_exercises',
  };

  // ============================================================
  // 3. STORAGE HELPERS
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
  // 4. CALCULATIONS
  // ============================================================
  function calculateBMR(weightKg, heightCm, age, sex) {
    if (sex === 'male') {
      return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  function calculateTDEE(bmr, activityMultiplier) {
    return bmr * activityMultiplier;
  }

  function calculatePlan(p) {
    if (!p) return null;

    const weightKg = p.weightUnit === 'lbs' ? p.weight * 0.453592 : p.weight;
    const goalWeightKg = (p.goalWeightUnit || p.weightUnit) === 'lbs' 
      ? p.goalWeight * 0.453592 
      : p.goalWeight;
    const heightCm = p.heightUnit === 'ftin' 
      ? ((p.heightFt || 0) * 12 + (p.heightIn || 0)) * 2.54 
      : p.height;

    const bmr = calculateBMR(weightKg, heightCm, p.age, p.sex);
    const tdee = calculateTDEE(bmr, parseFloat(p.activityLevel));

    const weightChange = weightKg - goalWeightKg;
    const totalCaloriesNeeded = weightChange * 7700;

    let deficit, timelineWeeks;
    if (p.timeFrameMode === 'custom' && p.customWeeks > 0) {
      timelineWeeks = p.customWeeks;
      deficit = totalCaloriesNeeded / (timelineWeeks * 7);
    } else {
      deficit = 500;
      timelineWeeks = totalCaloriesNeeded / (deficit * 7);
    }

    const targetCalories = tdee - deficit;
    const weeklyLossKg = deficit * 7 / 7700;

    const proteinG = (targetCalories * (p.macroProtein / 100)) / 4;
    const carbsG = (targetCalories * (p.macroCarbs / 100)) / 4;
    const fatG = (targetCalories * (p.macroFat / 100)) / 9;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      deficit: Math.round(deficit),
      targetCalories: Math.round(targetCalories),
      weeklyLossKg: weeklyLossKg.toFixed(2),
      timelineWeeks: Math.ceil(timelineWeeks),
      proteinG: Math.round(proteinG),
      carbsG: Math.round(carbsG),
      fatG: Math.round(fatG),
    };
  }

  // ============================================================
  // 5. SCHEDULE GENERATION
  // ============================================================
  function getAllExercises() {
    return [...BUILTIN_EXERCISES, ...customExercises];
  }

  function getExercisesByMuscleGroup(muscleGroup) {
    return getAllExercises().filter(ex => ex.muscleGroup === muscleGroup);
  }

  function generateSchedule(daysPerWeek) {
    const rotations = {
      1: ['full_body'],
      2: ['upper', 'lower'],
      3: ['upper', 'lower', 'core+cardio'],
      4: ['upper', 'lower', 'core+cardio', 'full_body'],
      5: ['upper', 'lower', 'core+cardio', 'upper', 'lower'],
      6: ['upper', 'lower', 'core+cardio', 'upper', 'lower', 'full_body'],
      7: ['upper', 'lower', 'core+cardio', 'upper', 'lower', 'full_body', 'core+cardio'],
    };

    const rotation = rotations[daysPerWeek] || rotations[3];
    const schedule = [];

    rotation.forEach((type, index) => {
      let exercises = [];
      let label = '';

      switch (type) {
        case 'upper':
          exercises = getExercisesByMuscleGroup('upper');
          label = 'Upper Body';
          break;
        case 'lower':
          exercises = getExercisesByMuscleGroup('lower');
          label = 'Lower Body';
          break;
        case 'core+cardio':
          exercises = [
            ...getExercisesByMuscleGroup('core'),
            ...getExercisesByMuscleGroup('cardio'),
          ];
          label = 'Core + Cardio';
          break;
        case 'full_body':
          exercises = getExercisesByMuscleGroup('full_body');
          label = 'Full Body';
          break;
        default:
          exercises = getExercisesByMuscleGroup('upper');
          label = 'Upper Body';
      }

      const shuffled = [...exercises].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(5, shuffled.length));

      schedule.push({
        day: index + 1,
        label: `Day ${index + 1} – ${label}`,
        exercises: selected,
      });
    });

    return schedule;
  }

  // ============================================================
  // 6. HELPER: Unit conversion
  // ============================================================
  function getHeightInCm() {
    const activeUnit = document.querySelector('#height-unit-buttons .unit-btn.active');
    if (!activeUnit) return 0;
    const unit = activeUnit.dataset.unit;
    if (unit === 'cm') {
      return parseFloat(document.getElementById('height').value) || 0;
    } else {
      const ft = parseInt(document.getElementById('height-ft').value) || 0;
      const inches = parseInt(document.getElementById('height-in').value) || 0;
      return (ft * 12 + inches) * 2.54;
    }
  }

  function getRawHeight() {
    const activeUnit = document.querySelector('#height-unit-buttons .unit-btn.active');
    if (!activeUnit) return { value: 0, unit: 'cm' };
    const unit = activeUnit.dataset.unit;
    if (unit === 'cm') {
      return { value: parseFloat(document.getElementById('height').value) || 0, unit: 'cm' };
    } else {
      const ft = parseInt(document.getElementById('height-ft').value) || 0;
      const inches = parseInt(document.getElementById('height-in').value) || 0;
      return { value: ft * 12 + inches, unit: 'ftin', displayFt: ft, displayIn: inches };
    }
  }

  function getWeightInKg() {
    const activeUnit = document.querySelector('#weight-unit-buttons .unit-btn.active');
    if (!activeUnit) return 0;
    const unit = activeUnit.dataset.unit;
    const weight = parseFloat(document.getElementById('weight').value) || 0;
    return unit === 'lbs' ? weight * 0.453592 : weight;
  }

  function getRawWeight() {
    const activeUnit = document.querySelector('#weight-unit-buttons .unit-btn.active');
    if (!activeUnit) return { value: 0, unit: 'kg' };
    const unit = activeUnit.dataset.unit;
    const value = parseFloat(document.getElementById('weight').value) || 0;
    return { value, unit };
  }

  // ============================================================
  // 7. UI RENDERING
  // ============================================================

  // 7a. Profile
  function renderProfile() {
    if (!profile) return;

    // Height
    if (profile.heightUnit === 'ftin') {
      const cmBtn = document.querySelector('#height-unit-buttons .unit-btn[data-unit="cm"]');
      const ftBtn = document.querySelector('#height-unit-buttons .unit-btn[data-unit="ftin"]');
      if (cmBtn) cmBtn.classList.remove('active');
      if (ftBtn) ftBtn.classList.add('active');
      document.getElementById('height').style.display = 'none';
      document.getElementById('height-ftin-inputs').style.display = 'flex';
      document.getElementById('height-ft').value = profile.heightFt || 0;
      document.getElementById('height-in').value = profile.heightIn || 0;
    } else {
      const ftBtn = document.querySelector('#height-unit-buttons .unit-btn[data-unit="ftin"]');
      const cmBtn = document.querySelector('#height-unit-buttons .unit-btn[data-unit="cm"]');
      if (ftBtn) ftBtn.classList.remove('active');
      if (cmBtn) cmBtn.classList.add('active');
      document.getElementById('height-ftin-inputs').style.display = 'none';
      document.getElementById('height').style.display = 'block';
      document.getElementById('height').value = profile.height || '';
    }

    // Weight
    if (profile.weightUnit === 'lbs') {
      const kgBtn = document.querySelector('#weight-unit-buttons .unit-btn[data-unit="kg"]');
      const lbsBtn = document.querySelector('#weight-unit-buttons .unit-btn[data-unit="lbs"]');
      if (kgBtn) kgBtn.classList.remove('active');
      if (lbsBtn) lbsBtn.classList.add('active');
    } else {
      const lbsBtn = document.querySelector('#weight-unit-buttons .unit-btn[data-unit="lbs"]');
      const kgBtn = document.querySelector('#weight-unit-buttons .unit-btn[data-unit="kg"]');
      if (lbsBtn) lbsBtn.classList.remove('active');
      if (kgBtn) kgBtn.classList.add('active');
    }
    document.getElementById('weight').value = profile.weight || '';

    document.getElementById('age').value = profile.age || '';
    document.getElementById('sex').value = profile.sex || 'male';

    // Goal weight
    const goalUnit = profile.goalWeightUnit || profile.weightUnit || 'kg';
    document.querySelectorAll('#goal-unit-buttons .unit-btn').forEach(b => b.classList.remove('active'));
    const goalBtn = document.querySelector(`#goal-unit-buttons .unit-btn[data-unit="${goalUnit}"]`);
    if (goalBtn) goalBtn.classList.add('active');
    document.getElementById('goal-weight').value = profile.goalWeight || '';

    document.getElementById('activity').value = profile.activityLevel || '1.55';
    document.getElementById('workout-days').value = profile.workoutDays || 3;
    document.getElementById('workout-days-value').textContent = profile.workoutDays || 3;
    document.getElementById('macro-protein').value = profile.macroProtein || 40;
    document.getElementById('macro-carbs').value = profile.macroCarbs || 30;
    document.getElementById('macro-fat').value = profile.macroFat || 30;

    if (profile.timeFrameMode === 'custom') {
      const customRadio = document.querySelector('input[name="timeframe"][value="custom"]');
      if (customRadio) customRadio.checked = true;
      document.getElementById('custom-weeks-group').style.display = 'block';
      document.getElementById('custom-weeks').value = profile.customWeeks || '';
    } else {
      const autoRadio = document.querySelector('input[name="timeframe"][value="auto"]');
      if (autoRadio) autoRadio.checked = true;
      document.getElementById('custom-weeks-group').style.display = 'none';
    }

    document.getElementById('theme-toggle').checked = profile.theme === 'dark';
    updateMacroSum();
  }

  function updateMacroSum() {
    const p = parseInt(document.getElementById('macro-protein').value) || 0;
    const c = parseInt(document.getElementById('macro-carbs').value) || 0;
    const f = parseInt(document.getElementById('macro-fat').value) || 0;
    const sum = p + c + f;
    const el = document.getElementById('macro-sum');
    if (el) {
      el.textContent = `Total: ${sum}%`;
      el.style.color = sum === 100 ? 'var(--text-secondary)' : 'var(--danger)';
    }
  }

  function saveProfileFromUI() {
    const heightData = getRawHeight();
    const weightData = getRawWeight();
    const heightCm = getHeightInCm();
    const weightKg = getWeightInKg();

    const age = parseInt(document.getElementById('age').value);
    const sex = document.getElementById('sex').value;
    const goalWeight = parseFloat(document.getElementById('goal-weight').value);
    const goalWeightUnit = document.querySelector('#goal-unit-buttons .unit-btn.active')?.dataset.unit || 'kg';
    const goalWeightKg = goalWeightUnit === 'lbs' ? goalWeight * 0.453592 : goalWeight;
    const activityLevel = document.getElementById('activity').value;
    const timeFrameRadio = document.querySelector('input[name="timeframe"]:checked');
    const timeFrameMode = timeFrameRadio ? timeFrameRadio.value : 'auto';
    const customWeeks = parseInt(document.getElementById('custom-weeks').value) || 0;
    const workoutDays = parseInt(document.getElementById('workout-days').value);
    const macroProtein = parseInt(document.getElementById('macro-protein').value) || 40;
    const macroCarbs = parseInt(document.getElementById('macro-carbs').value) || 30;
    const macroFat = parseInt(document.getElementById('macro-fat').value) || 30;
    const theme = document.getElementById('theme-toggle').checked ? 'dark' : 'light';

    if (!heightCm || !weightKg || !age || !goalWeightKg) {
      alert('Please fill in all required fields.');
      return;
    }

    profile = {
      height: heightData.value,
      heightUnit: heightData.unit,
      heightFt: heightData.displayFt || 0,
      heightIn: heightData.displayIn || 0,
      weight: weightData.value,
      weightUnit: weightData.unit,
      age,
      sex,
      goalWeight,
      goalWeightUnit,
      activityLevel,
      timeFrameMode,
      customWeeks,
      workoutDays,
      macroProtein,
      macroCarbs,
      macroFat,
      theme,
    };

    saveToStorage(STORAGE_KEYS.profile, profile);
    applyTheme(theme);
    renderPlan();
    renderSchedule();
    alert('Profile saved!');
  }

  // 7b. Plan
  function renderPlan() {
    const plan = calculatePlan(profile);
    if (!plan) {
      document.getElementById('plan-bmr').textContent = '—';
      document.getElementById('plan-tdee').textContent = '—';
      document.getElementById('plan-deficit').textContent = '—';
      document.getElementById('plan-calories').textContent = '—';
      document.getElementById('plan-weekly-loss').textContent = '—';
      document.getElementById('plan-timeline').textContent = '—';
      document.getElementById('plan-protein').textContent = '—';
      document.getElementById('plan-carbs').textContent = '—';
      document.getElementById('plan-fat').textContent = '—';
      return;
    }

    document.getElementById('plan-bmr').textContent = plan.bmr + ' kcal';
    document.getElementById('plan-tdee').textContent = plan.tdee + ' kcal';
    document.getElementById('plan-deficit').textContent = plan.deficit + ' kcal';
    document.getElementById('plan-calories').textContent = plan.targetCalories + ' kcal';
    document.getElementById('plan-weekly-loss').textContent = plan.weeklyLossKg + ' kg';
    document.getElementById('plan-timeline').textContent = plan.timelineWeeks + ' weeks';
    document.getElementById('plan-protein').textContent = plan.proteinG + ' g';
    document.getElementById('plan-carbs').textContent = plan.carbsG + ' g';
    document.getElementById('plan-fat').textContent = plan.fatG + ' g';
  }

  // 7c. Weight Progress & Chart
  function logWeight() {
    const date = document.getElementById('progress-date').value;
    const weight = parseFloat(document.getElementById('progress-weight').value);

    if (!date || !weight) {
      alert('Please enter a date and weight.');
      return;
    }

    progress.push({ date, weight });
    saveToStorage(STORAGE_KEYS.progress, progress);
    renderWeightChart();
    document.getElementById('progress-date').valueAsDate = new Date();
    document.getElementById('progress-weight').value = '';
  }

  function renderWeightChart() {
    const canvas = document.getElementById('weight-chart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (weightChart) {
      weightChart.destroy();
    }

    if (progress.length === 0) {
      weightChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['No data yet'],
          datasets: [{
            label: 'Weight',
            data: [0],
            borderColor: '#4a90d9',
            backgroundColor: 'rgba(74, 144, 217, 0.1)',
            fill: true,
            tension: 0.3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: false }
          }
        }
      });
      return;
    }

    const sorted = [...progress].sort((a, b) => new Date(a.date) - new Date(b.date));
    const labels = sorted.map(p => p.date);
    const data = sorted.map(p => p.weight);

    weightChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Weight',
          data,
          borderColor: '#4a90d9',
          backgroundColor: 'rgba(74, 144, 217, 0.1)',
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#4a90d9',
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            title: { display: true, text: 'Weight (kg)' }
          },
          x: {
            title: { display: true, text: 'Date' }
          }
        }
      }
    });
  }

  // 7d. Schedule
  function renderSchedule() {
    const output = document.getElementById('schedule-output');
    if (!output) return;

    if (!profile) {
      output.innerHTML = '<p>Complete your profile first.</p>';
      return;
    }

    const days = profile.workoutDays || 3;
    const schedule = generateSchedule(days);

    let html = '';
    schedule.forEach(day => {
      html += `<div class="schedule-day">
        <h3>${day.label}</h3>`;
      if (day.exercises.length === 0) {
        html += `<p style="color: var(--text-secondary);">No exercises available. Add some in the Exercise Library!</p>`;
      } else {
        day.exercises.forEach(ex => {
          const equipLabel = ex.equipment === 'none' ? '🏠 Bodyweight' : `🏋️ ${ex.equipment}`;
          html += `<div class="schedule-exercise">
            <div>
              <span class="exercise-name">${ex.name}</span>
              <div class="exercise-details">${ex.sets} × ${ex.reps} | Rest: ${ex.rest}</div>
            </div>
            <span class="equipment-badge">${equipLabel}</span>
          </div>`;
        });
      }
      html += `</div>`;
    });
    output.innerHTML = html;
  }

  // 7e. Exercise Library
  function getLibraryFilters() {
    return {
      search: document.getElementById('lib-search')?.value || '',
      muscle: document.getElementById('lib-muscle')?.value || '',
      equipment: document.getElementById('lib-equipment')?.value || '',
    };
  }

  function renderLibrary(filter) {
    const grid = document.getElementById('exercise-grid');
    if (!grid) return;
    const allExercises = getAllExercises();

    let filtered = allExercises;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      filtered = filtered.filter(ex =>
        ex.name.toLowerCase().includes(q) ||
        ex.description.toLowerCase().includes(q)
      );
    }
    if (filter.muscle) {
      filtered = filtered.filter(ex => ex.muscleGroup === filter.muscle);
    }
    if (filter.equipment) {
      filtered = filtered.filter(ex => ex.equipment === filter.equipment);
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No exercises found.</p>';
      return;
    }

    let html = '';
    filtered.forEach(ex => {
      const isCustom = customExercises.some(c => c.id === ex.id);
      html += `<div class="exercise-card">
        <h4>${ex.name} ${isCustom ? '⭐' : ''}</h4>
        <p>${ex.description}</p>
        <div class="exercise-details">${ex.sets} × ${ex.reps} | Rest: ${ex.rest}</div>
        <div class="exercise-tags" style="margin-top: 8px;">
          <span class="tag tag-muscle">${ex.muscleGroup}</span>
          <span class="tag tag-equipment">${ex.equipment}</span>
        </div>
      </div>`;
    });
    grid.innerHTML = html;
  }

  function addCustomExercise(e) {
    e.preventDefault();
    const name = document.getElementById('cust-name')?.value.trim();
    const desc = document.getElementById('cust-desc')?.value.trim();
    const muscle = document.getElementById('cust-muscle')?.value || 'upper';
    const equipment = document.getElementById('cust-equipment')?.value || 'none';
    const reps = document.getElementById('cust-reps')?.value.trim() || '12-15';
    const sets = parseInt(document.getElementById('cust-sets')?.value) || 3;
    const rest = document.getElementById('cust-rest')?.value.trim() || '30 sec';

    if (!name) {
      alert('Please enter an exercise name.');
      return;
    }

    const newExercise = {
      id: 'custom_' + Date.now(),
      name,
      description: desc || 'No description provided.',
      muscleGroup: muscle,
      equipment,
      reps,
      sets,
      rest,
    };

    customExercises.push(newExercise);
    saveToStorage(STORAGE_KEYS.exercises, customExercises);
    renderLibrary(getLibraryFilters());
    const form = document.getElementById('custom-exercise-form');
    if (form) form.reset();
    alert('Exercise added!');
  }

  // 7f. Theme
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  // ============================================================
  // 8. PDF EXPORT
  // ============================================================
  function downloadPlanPDF() {
    const { jsPDF } = window.jspdf;
    if (!jsPDF) {
      alert('PDF library not loaded yet. Please try again.');
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Workout Plan', 14, 22);

    if (profile) {
      doc.setFontSize(11);
      doc.text(`Age: ${profile.age} | Sex: ${profile.sex} | Goal: ${profile.goalWeight} ${profile.goalWeightUnit || profile.weightUnit}`, 14, 32);
    }

    const plan = calculatePlan(profile);
    if (plan) {
      doc.setFontSize(14);
      doc.text('Calorie & Macro Targets', 14, 44);
      doc.setFontSize(11);
      doc.text(`BMR: ${plan.bmr} kcal`, 14, 54);
      doc.text(`TDEE: ${plan.tdee} kcal`, 14, 62);
      doc.text(`Daily Deficit: ${plan.deficit} kcal`, 14, 70);
      doc.text(`Target Calories: ${plan.targetCalories} kcal`, 14, 78);
      doc.text(`Weekly Loss: ${plan.weeklyLossKg} kg`, 14, 86);
      doc.text(`Timeline: ${plan.timelineWeeks} weeks`, 14, 94);
      doc.text(`Protein: ${plan.proteinG}g | Carbs: ${plan.carbsG}g | Fat: ${plan.fatG}g`, 14, 102);
    }

    let yPos = 116;
    if (profile) {
      const days = profile.workoutDays || 3;
      const schedule = generateSchedule(days);
      doc.setFontSize(14);
      doc.text('Workout Schedule', 14, yPos);
      yPos += 10;
      schedule.forEach(day => {
        doc.setFontSize(12);
        doc.text(day.label, 14, yPos);
        yPos += 7;
        day.exercises.forEach(ex => {
          doc.setFontSize(10);
          doc.text(`  ${ex.name} — ${ex.sets}×${ex.reps} (rest: ${ex.rest})`, 14, yPos);
          yPos += 6;
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
        });
        yPos += 4;
      });
    }
    doc.save('workout-plan.pdf');
  }

  function downloadSchedulePDF() {
    downloadPlanPDF();
  }

  // ============================================================
  // 9. INIT
  // ============================================================
  function init() {
    // Load data
    profile = loadFromStorage(STORAGE_KEYS.profile, null);
    progress = loadFromStorage(STORAGE_KEYS.progress, []);
    customExercises = loadFromStorage(STORAGE_KEYS.exercises, []);

    // Apply theme
    if (profile && profile.theme) {
      applyTheme(profile.theme);
    }

    // Set today
    const dateInput = document.getElementById('progress-date');
    if (dateInput) dateInput.valueAsDate = new Date();

    // Render
    renderProfile();
    renderPlan();
    renderSchedule();
    renderLibrary({});
    renderWeightChart();

    // --- Tab switching ---
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        const target = document.getElementById('tab-' + this.dataset.tab);
        if (target) target.classList.add('active');
        if (this.dataset.tab === 'plan') {
          renderWeightChart();
        }
      });
    });

    // --- Save profile ---
    const saveBtn = document.getElementById('save-profile');
    if (saveBtn) saveBtn.addEventListener('click', saveProfileFromUI);

    // --- Timeframe radio ---
    document.querySelectorAll('input[name="timeframe"]').forEach(radio => {
      radio.addEventListener('change', function() {
        const group = document.getElementById('custom-weeks-group');
        if (group) group.style.display = this.value === 'custom' ? 'block' : 'none';
      });
    });

    // --- Workout days ---
    const workoutSlider = document.getElementById('workout-days');
    const workoutVal = document.getElementById('workout-days-value');
    if (workoutSlider && workoutVal) {
      workoutSlider.addEventListener('input', function() {
        workoutVal.textContent = this.value;
      });
    }

    // --- Macro sum ---
    document.querySelectorAll('#macro-protein, #macro-carbs, #macro-fat').forEach(input => {
      input.addEventListener('input', updateMacroSum);
    });

    // --- Log weight ---
    const logBtn = document.getElementById('log-weight');
    if (logBtn) logBtn.addEventListener('click', logWeight);

    // --- Library filters ---
    const libSearch = document.getElementById('lib-search');
    if (libSearch) {
      libSearch.addEventListener('input', function() {
        renderLibrary(getLibraryFilters());
      });
    }
    const libMuscle = document.getElementById('lib-muscle');
    if (libMuscle) {
      libMuscle.addEventListener('change', function() {
        renderLibrary(getLibraryFilters());
      });
    }
    const libEquip = document.getElementById('lib-equipment');
    if (libEquip) {
      libEquip.addEventListener('change', function() {
        renderLibrary(getLibraryFilters());
      });
    }

    // --- Custom exercise form ---
    const custForm = document.getElementById('custom-exercise-form');
    if (custForm) custForm.addEventListener('submit', addCustomExercise);

    // --- Theme toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', function() {
        const theme = this.checked ? 'dark' : 'light';
        applyTheme(theme);
        if (profile) {
          profile.theme = theme;
          saveToStorage(STORAGE_KEYS.profile, profile);
        }
      });
    }

    // --- PDF ---
    const planPdfBtn = document.getElementById('download-plan-pdf');
    if (planPdfBtn) planPdfBtn.addEventListener('click', downloadPlanPDF);
    const schedPdfBtn = document.getElementById('download-schedule-pdf');
    if (schedPdfBtn) schedPdfBtn.addEventListener('click', downloadSchedulePDF);

    // --- Height unit toggle ---
    document.querySelectorAll('#height-unit-buttons .unit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const currentUnit = document.querySelector('#height-unit-buttons .unit-btn.active');
        if (currentUnit === this) return;

        const newUnit = this.dataset.unit;
        const oldUnit = currentUnit.dataset.unit;

        if (oldUnit === 'cm' && newUnit === 'ftin') {
          const cm = parseFloat(document.getElementById('height').value) || 0;
          const totalInches = cm / 2.54;
          const ft = Math.floor(totalInches / 12);
          const inches = Math.round(totalInches % 12);
          document.getElementById('height-ft').value = ft;
          document.getElementById('height-in').value = inches;
          document.getElementById('height').style.display = 'none';
          document.getElementById('height-ftin-inputs').style.display = 'flex';
        } else if (oldUnit === 'ftin' && newUnit === 'cm') {
          const ft = parseInt(document.getElementById('height-ft').value) || 0;
          const inches = parseInt(document.getElementById('height-in').value) || 0;
          const cm = Math.round((ft * 12 + inches) * 2.54);
          document.getElementById('height').value = cm;
          document.getElementById('height-ftin-inputs').style.display = 'none';
          document.getElementById('height').style.display = 'block';
        }

        document.querySelectorAll('#height-unit-buttons .unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // --- Weight unit toggle ---
    document.querySelectorAll('#weight-unit-buttons .unit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const currentUnit = document.querySelector('#weight-unit-buttons .unit-btn.active');
        if (currentUnit === this) return;

        const newUnit = this.dataset.unit;
        const oldUnit = currentUnit.dataset.unit;
        const weight = parseFloat(document.getElementById('weight').value) || 0;

        if (oldUnit === 'kg' && newUnit === 'lbs') {
          document.getElementById('weight').value = Math.round(weight * 2.20462);
        } else if (oldUnit === 'lbs' && newUnit === 'kg') {
          document.getElementById('weight').value = Math.round(weight * 0.453592);
        }

        document.querySelectorAll('#weight-unit-buttons .unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // --- Goal weight unit toggle ---
    document.querySelectorAll('#goal-unit-buttons .unit-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const currentUnit = document.querySelector('#goal-unit-buttons .unit-btn.active');
        if (currentUnit === this) return;

        const newUnit = this.dataset.unit;
        const oldUnit = currentUnit.dataset.unit;
        const goalWeight = parseFloat(document.getElementById('goal-weight').value) || 0;

        if (oldUnit === 'kg' && newUnit === 'lbs') {
          document.getElementById('goal-weight').value = Math.round(goalWeight * 2.20462);
        } else if (oldUnit === 'lbs' && newUnit === 'kg') {
          document.getElementById('goal-weight').value = Math.round(goalWeight * 0.453592);
        }

        document.querySelectorAll('#goal-unit-buttons .unit-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();