const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes("import { syncToGoogleDrive")) {
  code = code.replace(
    "import { initAuth, getAccessToken, googleSignIn } from './utils/auth';",
    "import { initAuth, getAccessToken, googleSignIn } from './utils/auth';\nimport { syncToGoogleDrive, loadFromGoogleDrive } from './utils/driveSync';\nimport { syncToCloudSQL, loadFromCloudSQL } from './utils/cloudSync';"
  );
}

// Add state for "isSyncing"
if (!code.includes('const [isSyncing, setIsSyncing] = useState(false);')) {
  code = code.replace(
    "const [isAuthenticated, setIsAuthenticated] = useState(false);",
    "const [isAuthenticated, setIsAuthenticated] = useState(false);\n  const [isSyncing, setIsSyncing] = useState(false);"
  );
}

// Modify the mount useEffect to load from cloud if auth succeeds
const oldMountEffect = `// Load from local storage on mount
  useEffect(() => {
    setContacts(StorageService.getContacts());
    setAlerts(StorageService.getAlerts());
    setIncidents(StorageService.getIncidents());
    setAppointments(StorageService.getAppointments());

    // Show onboarding on first launch
    if (!StorageService.isOnboardingCompleted()) {
      setShowOnboarding(true);
    }

    // Initialize Auth
    const unsubscribe = initAuth(
      () => setIsAuthenticated(true),
      () => setIsAuthenticated(false)
    );
    return () => unsubscribe();
  }, []);`;

const newMountEffect = `// Load from local storage on mount
  useEffect(() => {
    setContacts(StorageService.getContacts());
    setAlerts(StorageService.getAlerts());
    setIncidents(StorageService.getIncidents());
    setAppointments(StorageService.getAppointments());

    if (!StorageService.isOnboardingCompleted()) {
      setShowOnboarding(true);
    }

    const loadCloudData = async () => {
      setIsSyncing(true);
      try {
        let data = await loadFromCloudSQL();
        if (!data) data = await loadFromGoogleDrive();
        
        if (data) {
          if (data.contacts) setContacts(data.contacts);
          if (data.alerts) setAlerts(data.alerts);
          if (data.incidents) setIncidents(data.incidents);
          if (data.appointments) setAppointments(data.appointments);
          if (data.companionProfile) setCompanionProfile(data.companionProfile);
          if (data.assessmentProfile) setAssessmentProfile(data.assessmentProfile);
          if (data.wellnessEntries) setWellnessEntries(data.wellnessEntries);
        }
      } catch (err) {
        console.error('Failed to load cloud data:', err);
      } finally {
        setIsSyncing(false);
      }
    };

    const unsubscribe = initAuth(
      (user, token, idToken) => {
        setIsAuthenticated(true);
        loadCloudData();
      },
      () => setIsAuthenticated(false)
    );
    return () => unsubscribe();
  }, []);

  // Sync to Cloud SQL and Google Drive whenever data changes
  useEffect(() => {
    if (isAuthenticated && !isSyncing) {
      const stateToSave = {
        contacts, alerts, incidents, appointments, companionProfile, assessmentProfile, wellnessEntries
      };
      
      const timeout = setTimeout(() => {
         syncToCloudSQL(stateToSave);
         syncToGoogleDrive(stateToSave);
      }, 1000); // Debounce sync
      
      return () => clearTimeout(timeout);
    }
  }, [contacts, alerts, incidents, appointments, companionProfile, assessmentProfile, wellnessEntries, isAuthenticated, isSyncing]);
`;

code = code.replace(oldMountEffect, newMountEffect);

// Wait, I need to add a Login button or UI if not authenticated.
// The user will want to login to sync. We can put a login button in the GlobalHeader or directly in App.tsx.
// Let's pass handleLogin to GlobalHeader, or just add a floating sync button.

fs.writeFileSync('src/App.tsx', code);
