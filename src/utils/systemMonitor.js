let simulatedActiveTime = 0;
let lastUpdateTime = Date.now();
let simulatedFocusScore = 0;
let simulatedAppUsage = {
  'VS Code': 0,
  'Chrome': 0,
  'Figma': 0,
  'Slack': 0,
  'Others': 0,
};
let simulatedDistractionAlerts = 0;
let focusScoreHistory = [];
let weeklyProductivityData = [
  { name: 'Mon', focused: 0, distracted: 0, idle: 0 },
  { name: 'Tue', focused: 0, distracted: 0, idle: 0 },
  { name: 'Wed', focused: 0, distracted: 0, idle: 0 },
  { name: 'Thu', focused: 0, distracted: 0, idle: 0 },
  { name: 'Fri', focused: 0, distracted: 0, idle: 0 },
  { name: 'Sat', focused: 0, distracted: 0, idle: 0 },
  { name: 'Sun', focused: 0, distracted: 0, idle: 0 },
];
let currentDayIndex = new Date().getDay() - 1;
if (currentDayIndex < 0) currentDayIndex = 6;

let simulatedReportData = {
  weeklyProductivityReport: {
    period: 'Jul 15 - Jul 21, 2025',
    avgFocusScore: 78,
    taskCompletionImprovement: 25,
    productivityPeaks: 3,
  },
  monthlyToolUsageAnalysis: {
    period: 'July 2025',
    topTool: 'VS Code',
    usagePercentage: 45,
    keyInsight: 'Increased usage on coding tools.',
  },
  locationBasedTaskPerformance: {
    period: 'Jul 1 - Jul 21, 2025',
    homeOfficeCompletion: 92,
    coffeeShopCompletion: 78,
    coWorkingCompletion: 88,
  }
};


export const resetSimulatedMetrics = () => {
  simulatedActiveTime = 0;
  lastUpdateTime = Date.now();
  simulatedFocusScore = 0;
  simulatedAppUsage = {
    'VS Code': 0,
    'Chrome': 0,
    'Figma': 0,
    'Slack': 0,
    'Others': 0,
  };
  simulatedDistractionAlerts = 0;
  focusScoreHistory = [];
  weeklyProductivityData = [
    { name: 'Mon', focused: 0, distracted: 0, idle: 0 },
    { name: 'Tue', focused: 0, distracted: 0, idle: 0 },
    { name: 'Wed', focused: 0, distracted: 0, idle: 0 },
    { name: 'Thu', focused: 0, distracted: 0, idle: 0 },
    { name: 'Fri', focused: 0, distracted: 0, idle: 0 },
    { name: 'Sat', focused: 0, distracted: 0, idle: 0 },
    { name: 'Sun', focused: 0, distracted: 0, idle: 0 },
  ];
  currentDayIndex = new Date().getDay() - 1;
  if (currentDayIndex < 0) currentDayIndex = 6;

  simulatedReportData = {
    weeklyProductivityReport: {
      period: 'Jul 1 - Jul 7, 2025',
      avgFocusScore: 60,
      taskCompletionImprovement: 0,
      productivityPeaks: 0,
    },
    monthlyToolUsageAnalysis: {
      period: 'June 2025',
      topTool: 'Chrome',
      usagePercentage: 35,
      keyInsight: 'Starting new month.',
    },
    locationBasedTaskPerformance: {
      period: 'Jul 1 - Jul 7, 2025',
      homeOfficeCompletion: 0,
      coffeeShopCompletion: 0,
      coWorkingCompletion: 0,
    }
  };
};


export const getSimulatedSystemMetrics = () => {
  const currentTime = Date.now();
  const timeElapsedMinutes = (currentTime - lastUpdateTime) / 1000 / 60;
  lastUpdateTime = currentTime;

  const activityFactor = Math.random();
  let focusedTime = 0;
  let distractedTime = 0;
  let idleTime = 0;

  if (timeElapsedMinutes > 0) {
      if (activityFactor < 0.6) {
          focusedTime = timeElapsedMinutes * 0.8;
          distractedTime = timeElapsedMinutes * 0.1;
          idleTime = timeElapsedMinutes * 0.1;
      } else if (activityFactor < 0.9) {
          focusedTime = timeElapsedMinutes * 0.3;
          distractedTime = timeElapsedMinutes * 0.6;
          idleTime = timeElapsedMinutes * 0.1;
          simulatedDistractionAlerts += Math.floor(timeElapsedMinutes * 0.1);
      } else {
          focusedTime = timeElapsedMinutes * 0.1;
          distractedTime = timeElapsedMinutes * 0.1;
          idleTime = timeElapsedMinutes * 0.8;
      }

      weeklyProductivityData[currentDayIndex].focused += focusedTime;
      weeklyProductivityData[currentDayIndex].distracted += distractedTime;
      weeklyProductivityData[currentDayIndex].idle += idleTime;
  }

  simulatedActiveTime = Math.min(10 * 60, simulatedActiveTime + timeElapsedMinutes);

  const hours = Math.floor(simulatedActiveTime / 60);
  const minutes = Math.floor(simulatedActiveTime % 60);
  const activeTimeFormatted = `${hours}h ${minutes < 10 ? '0' : ''}${minutes}m`;
  const activeTimeChange = `+${Math.floor(timeElapsedMinutes * 10)} minutes`;


  if (timeElapsedMinutes > 0.1) {
    const activeAppChoice = Math.random();
    let currentApp = 'Others';
    if (activeAppChoice < 0.4) currentApp = 'VS Code';
    else if (activeAppChoice < 0.7) currentApp = 'Chrome';
    else if (activeAppChoice < 0.8) currentApp = 'Figma';
    else if (activeAppChoice < 0.9) currentApp = 'Slack';

    simulatedAppUsage[currentApp] += timeElapsedMinutes;
  }


  let currentFocusImpact = (focusedTime - distractedTime) / timeElapsedMinutes;
  currentFocusImpact = isNaN(currentFocusImpact) ? 0 : currentFocusImpact;

  if (simulatedActiveTime > 0) {
      simulatedFocusScore += currentFocusImpact * 5;
      simulatedFocusScore = Math.min(100, Math.max(0, simulatedFocusScore));
  }
  simulatedFocusScore = Math.round(simulatedFocusScore);

  const now = new Date();
  const currentMinute = now.getHours() * 60 + now.getMinutes();
  const lastHistoryMinute = focusScoreHistory.length > 0 ? focusScoreHistory[focusScoreHistory.length - 1].minute : -15;

  if (currentMinute - lastHistoryMinute >= 15 || focusScoreHistory.length === 0) {
      focusScoreHistory.push({
          time: `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`,
          score: simulatedFocusScore,
          minute: currentMinute
      });
      if (focusScoreHistory.length > (24 * 4)) {
          focusScoreHistory.shift();
      }
  }

  const focusScoreDescription = simulatedFocusScore >= 80 ? 'Excellent focus today' : (simulatedFocusScore >= 60 ? 'Good focus today' : 'Needs more focus');

  return {
    activeTime: activeTimeFormatted,
    activeTimeChange: activeTimeChange,
    focusScore: simulatedFocusScore,
    focusScoreDescription: focusScoreDescription,
    activeApplicationUsage: simulatedAppUsage,
    distractionAlerts: simulatedDistractionAlerts,
    focusScoreHistory: focusScoreHistory,
  };
};

export const getActiveApplicationUsage = () => {
  const totalAppTime = Object.values(simulatedAppUsage).reduce((sum, time) => sum + time, 0);
  const usagePercentages = {};
  const apps = Object.keys(simulatedAppUsage);

  if (totalAppTime === 0) {
      apps.forEach(app => usagePercentages[app] = 0);
      return usagePercentages;
  }

  for (const app in simulatedAppUsage) {
      usagePercentages[app] = Math.round((simulatedAppUsage[app] / totalAppTime) * 100);
  }

  const sum = Object.values(usagePercentages).reduce((s, p) => s + p, 0);
  if (sum !== 100 && apps.length > 0) {
      usagePercentages[apps[0]] += (100 - sum);
  }
  return usagePercentages;
};

export const getDistractionAlerts = () => {
  return {
    count: simulatedDistractionAlerts,
  };
};

export const getWeeklyProductivity = () => {
  return weeklyProductivityData.map(day => ({
    name: day.name,
    focused: parseFloat((day.focused / 60).toFixed(1)),
    distracted: parseFloat((day.distracted / 60).toFixed(1)),
    idle: parseFloat((day.idle / 60).toFixed(1)),
  }));
};

export const advanceToNextDay = () => {
  currentDayIndex = (currentDayIndex + 1) % 7;
  weeklyProductivityData[currentDayIndex].focused = Math.random() * 60;
  weeklyProductivityData[currentDayIndex].distracted = Math.random() * 30;
  weeklyProductivityData[currentDayIndex].idle = Math.random() * 20;
  simulatedActiveTime = weeklyProductivityData[currentDayIndex].focused + weeklyProductivityData[currentDayIndex].distracted + weeklyProductivityData[currentDayIndex].idle;
  simulatedFocusScore = 70 + Math.random() * 20;
  simulatedDistractionAlerts = Math.floor(Math.random() * 5);
  simulatedAppUsage = { 'VS Code': 0, 'Chrome': 0, 'Figma': 0, 'Slack': 0, 'Others': 0 };
  focusScoreHistory = [];
};

export const getWeeklyReportSummary = () => {
  simulatedReportData.weeklyProductivityReport.avgFocusScore = Math.min(95, Math.max(60, simulatedReportData.weeklyProductivityReport.avgFocusScore + (Math.random() * 5 - 2.5)));
  simulatedReportData.weeklyProductivityReport.avgFocusScore = Math.round(simulatedReportData.weeklyProductivityReport.avgFocusScore);
  simulatedReportData.weeklyProductivityReport.taskCompletionImprovement = Math.min(50, Math.max(0, simulatedReportData.weeklyProductivityReport.taskCompletionImprovement + Math.floor(Math.random() * 3 - 1)));
  simulatedReportData.weeklyProductivityReport.productivityPeaks = Math.min(5, Math.max(1, simulatedReportData.weeklyProductivityReport.productivityPeaks + (Math.random() > 0.8 ? 1 : 0)));

  return simulatedReportData.weeklyProductivityReport;
};

export const getMonthlyToolUsageSummary = () => {
    const tools = ['VS Code', 'Chrome', 'Figma', 'Slack'];
    const newTopTool = tools[Math.floor(Math.random() * tools.length)];
    simulatedReportData.monthlyToolUsageAnalysis.topTool = newTopTool;
    simulatedReportData.monthlyToolUsageAnalysis.usagePercentage = Math.min(80, Math.max(20, simulatedReportData.monthlyToolUsageAnalysis.usagePercentage + (Math.random() * 5 - 2.5)));
    simulatedReportData.monthlyToolUsageAnalysis.usagePercentage = Math.round(simulatedReportData.monthlyToolUsageAnalysis.usagePercentage);
    simulatedReportData.monthlyToolUsageAnalysis.keyInsight = `Dominant usage of ${newTopTool} recently.`;

    return simulatedReportData.monthlyToolUsageAnalysis;
};

export const getLocationBasedPerformanceSummary = () => {
    simulatedReportData.locationBasedTaskPerformance.homeOfficeCompletion = Math.min(100, Math.max(60, simulatedReportData.locationBasedTaskPerformance.homeOfficeCompletion + (Math.random() * 5 - 2.5)));
    simulatedReportData.locationBasedTaskPerformance.homeOfficeCompletion = Math.round(simulatedReportData.locationBasedTaskPerformance.homeOfficeCompletion);
    simulatedReportData.locationBasedTaskPerformance.coffeeShopCompletion = Math.min(100, Math.max(50, simulatedReportData.locationBasedTaskPerformance.coffeeShopCompletion + (Math.random() * 5 - 2.5)));
    simulatedReportData.locationBasedTaskPerformance.coffeeShopCompletion = Math.round(simulatedReportData.locationBasedTaskPerformance.coffeeShopCompletion);
    simulatedReportData.locationBasedTaskPerformance.coWorkingCompletion = Math.min(100, Math.max(50, simulatedReportData.locationBasedTaskPerformance.coWorkingCompletion + (Math.random() * 5 - 2.5)));
    simulatedReportData.locationBasedTaskPerformance.coWorkingCompletion = Math.round(simulatedReportData.locationBasedTaskPerformance.coWorkingCompletion);

    return simulatedReportData.locationBasedTaskPerformance;
};