// Translations Dictionary for Mandya Abhivruddi Vedike
// English & Kannada (ಕನ್ನಡ)

export const translations = {
  en: {
    // Header & Navigation
    appTitle: "Mandya Abhivruddi Vedike",
    appSubtitle: "Office of Ravikumar Gowda (Ganiga Ravi), MLA, Mandya",
    navHome: "Home",
    navExplorer: "Area Explorer",
    navWorkTracker: "Work Tracker",
    navSubmitWork: "Submit Request",
    navAdminQueue: "MLA Admin Panel",
    loginButton: "Login / Role Switch",
    logoutButton: "Logout",
    guestRole: "Public Citizen",
    leaderRole: "Hobli Leader",
    adminRole: "MLA Office Admin",

    // Home Page
    heroHeadline: "Transparent Governance & Constituency Progress Tracking",
    heroSubheadline: "Track every development work across Kasaba, Keragodu, Basaralu Hoblis & Mandya City 35 Wards in real-time.",
    exploreAreasCTA: "Explore Hoblis & Wards",
    trackWorksCTA: "View Work Tracker",
    submitWorkCTA: "Report New Issue",
    mlaMessageTitle: "A Personal Commitment to Mandya's Progress",
    mlaMessageText: "Dear Citizens of Mandya, Mandya Abhivruddi Vedike is our dedicated portal to ensure every village and city ward receives equal development attention. We track every reported request from initial logging to final completion.",
    
    // Stats Bar
    statTaluk: "1 Taluk",
    statHoblis: "3 Hoblis + Mandya City",
    statWards: "35 Wards",
    statVillages: "28 Villages",
    statTotalWorks: "Total Work Items",
    statCompletedWorks: "Completed Works",
    statInProgressWorks: "In Progress Works",
    statPendingWorks: "Approved & Pending",

    // Recent Highlights
    recentHighlightsTitle: "Recent Constituency Highlights",
    viewAllWorks: "View All Works in Tracker →",

    // Explorer Page
    explorerTitle: "Constituency Area Explorer",
    explorerSubtitle: "Select any Hobli or Mandya City to view villages, wards, assigned leaders, and active development works.",
    searchLocationPlaceholder: "Search village or ward name...",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    leaderAssigned: "Assigned Leader",
    contactLeader: "Contact Leader",
    totalLocations: "Total Villages / Wards",
    activeWorksCount: "Active Works",
    viewVillageDetails: "View Details & Works",

    // Village Detail Modal / Drawer
    villageDetailTitle: "Development Details for",
    leaderInfo: "Leader Information",
    leaderPhone: "Phone",
    leaderEmail: "Email",
    workItemsForLocation: "Work Items for this Location",
    noWorksFoundLocation: "No development works logged for this village/ward yet.",

    // Work Tracker Page
    trackerTitle: "Constituency Work Tracker",
    trackerSubtitle: "Filter, search, and track all reported, approved, in-progress, and completed works across Mandya.",
    searchWorksPlaceholder: "Search by title, location, ID, or keyword...",
    filterByArea: "All Areas",
    filterByStatus: "All Statuses",
    filterByCategory: "All Categories",
    sortBy: "Sort By",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    sortHighestBudget: "Budget: High to Low",
    noWorksFoundTracker: "No work items match your filter criteria.",
    showingWorks: "Showing",
    ofWorks: "of",
    workItemsText: "work items",

    // Table / Cards Headers
    colWorkId: "Work ID",
    colTitleLocation: "Work Description & Location",
    colArea: "Area / Hobli",
    colCategory: "Category",
    colStatus: "Status",
    colPriority: "Priority",
    colBudget: "Sanctioned Budget",
    colDate: "Last Updated",
    colActions: "Action",

    // Statuses
    statusReported: "Reported",
    statusApproved: "Approved",
    statusInProgress: "In Progress",
    statusCompleted: "Completed",

    // Priorities
    priorityHigh: "High Priority",
    priorityMedium: "Medium Priority",
    priorityLow: "Low Priority",

    // Categories
    catRoad: "Roads & Highways",
    catWater: "Drinking Water",
    catDrainage: "Sanitation & Drainage",
    catElectricity: "Street Lighting",
    catEducation: "Education & Schools",
    catHealth: "Healthcare & PHC",
    catCommunity: "Community & Sports",

    // Submit Request Form
    submitTitle: "Log a New Work Request",
    submitSubtitle: "Hobli leaders and citizens can submit development proposals or civic issues directly to the MLA Office queue.",
    formArea: "Select Area / Hobli *",
    formLocation: "Select Village or Ward *",
    formWorkTitle: "Work Title / Summary *",
    formCategory: "Category *",
    formPriority: "Priority Level",
    formDescription: "Detailed Description of Work / Issue *",
    formPhoto: "Photo / Documentation (Optional)",
    formSubmitBtn: "Submit Work Request to MLA Office",
    formSubmitting: "Submitting Request...",
    formSuccessMsg: "Work request submitted successfully! Assigned tracking ID: ",
    
    // Validation Errors
    errAreaRequired: "Please select an Area / Hobli.",
    errLocationRequired: "Please select a Village or Ward.",
    errTitleRequired: "Please enter a descriptive work title.",
    errDescriptionRequired: "Please provide a detailed description (at least 15 characters).",

    // Admin Panel
    adminTitle: "MLA Office Admin Panel",
    adminSubtitle: "Review pending submissions, approve works, update execution status, and add official administrative notes.",
    adminQueueTab: "Pending Approval Queue",
    adminManageWorksTab: "All Constituency Works",
    adminHobliLeadersTab: "Hobli Leaders Directory",
    approveAction: "Approve Work",
    updateStatusAction: "Update Status",
    addNoteAction: "Add Admin Note",
    sanctionBudgetAction: "Sanction Budget",
    saveChanges: "Save Changes",
    adminAccessOnlyMsg: "This section requires MLA Office Admin credentials.",
    quickLoginAsAdmin: "Login as Admin",

    // Login Modal
    loginModalTitle: "Mandya Vedike Authentication",
    loginRoleSelect: "Select Role",
    usernameLabel: "Username / Mobile",
    passwordLabel: "Password",
    loginSubmitBtn: "Authenticate",
    roleCitizenDesc: "View all public works, search areas, and submit civic issues.",
    roleLeaderDesc: "Authorized for Hobli leaders to submit and track local village requests.",
    roleAdminDesc: "MLA Office staff to review, approve, sanction funds, and update statuses.",
    loginHintText: "Demo Hints — Admin: admin / mla2026 | Hobli Leader: leader_kasaba / leader123",

    // Footer
    footerRights: "Mandya Constituency Development Portal. Designed for Citizen Transparency.",
    footerMLAOffice: "Office of Ravikumar Gowda (Ganiga Ravi), MLA, Mandya Constituency."
  },

  kn: {
    // Header & Navigation
    appTitle: "ಮಂಡ್ಯ ಅಭಿವೃದ್ಧಿ ವೇದಿಕೆ",
    appSubtitle: "ರವಿ ಕುಮಾರ್ ಗೌಡ (ಗಣಿಗ ರವಿ), ಶಾಸಕರ ಕಚೇರಿ, ಮಂಡ್ಯ",
    navHome: "ಮುಖ್ಯ ಪುಟ",
    navExplorer: "ಕ್ಷೇತ್ರ ಪರಿಶೋಧಕ",
    navWorkTracker: "ಕಾಮಗಾರಿ ಟ್ರ್ಯಾಕರ್",
    navSubmitWork: "ಕೋರಿಕೆ ಸಲ್ಲಿಸಿ",
    navAdminQueue: "ಶಾಸಕರ ಅಡ್ಮಿನ್ ಪ್ಯಾನಲ್",
    loginButton: "ಲಾಗಿನ್ / ಪಾತ್ರ ಬದಲಿಸಿ",
    logoutButton: "ನಿರ್ಗಮಿಸಿ",
    guestRole: "ಸಾಮಾನ್ಯ ನಾಗರಿಕ",
    leaderRole: "ಹೋಬಳಿ ನಾಯಕರು",
    adminRole: "ಶಾಸಕರ ಕಚೇರಿ ಅಡ್ಮಿನ್",

    // Home Page
    heroHeadline: "ಪಾರದರ್ಶಕ ಆಡಳಿತ ಮತ್ತು ಮಂಡ್ಯ ಕ್ಷೇತ್ರದ ಅಭಿವೃದ್ಧಿ ಪ್ರಗತಿ ಟ್ರ್ಯಾಕರ್",
    heroSubheadline: "ಕಸಬಾ, ಕೆರಗೋಡು, ಬಸರಾಳು ಹೋಬಳಿಗಳು ಹಾಗೂ ಮಂಡ್ಯ ನಗರದ ೩೫ ವಾರ್ಡ್‌ಗಳ ಪ್ರತಿಯೊಂದು ಕಾಮಗಾರಿಯನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ವೀಕ್ಷಿಸಿ.",
    exploreAreasCTA: "ಹೋಬಳಿ ಮತ್ತು ವಾರ್ಡ್ ಅನ್ವೇಷಿಸಿ",
    trackWorksCTA: "ಕಾಮಗಾರಿ ಟ್ರ್ಯಾಕರ್ ವೀಕ್ಷಿಸಿ",
    submitWorkCTA: "ಹೊಸ ಸಮಸ್ಯೆ ವರದಿ ಮಾಡಿ",
    mlaMessageTitle: "ಮಂಡ್ಯ ಕ್ಷೇತ್ರದ ಅಭಿವೃದ್ಧಿಗೆ ನಮ್ಮ ಬದ್ಧತೆ",
    mlaMessageText: "ಮಂಡ್ಯದ ಪ್ರೀತಿಯ ಬಂಧುಗಳೇ, ಮಂಡ್ಯ ಅಭಿವೃದ್ಧಿ ವೇದಿಕೆಯು ಪ್ರತಿಯೊಂದು ಗ್ರಾಮ ಮತ್ತು ನಗರದ ವಾರ್ಡ್‌ಗಳಿಗೆ ಸಮಾನ ಅಭಿವೃದ್ಧಿ ದೊರಕಿಸಲು ನಿರ್ಮಿಸಲಾದ ಪೋರ್ಟಲ್. ವರದಿಯಾದ ಕೋರಿಕೆಯಿಂದ ಹಿಡಿದು ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೂ ಎಲ್ಲವನ್ನೂ ಇಲ್ಲಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತದೆ.",

    // Stats Bar
    statTaluk: "೧ ತಾಲೂಕು",
    statHoblis: "೩ ಹೋಬಳಿ + ನಗರ",
    statWards: "೩೫ ವಾರ್ಡ್‌ಗಳು",
    statVillages: "೨೮ ಗ್ರಾಮಗಳು",
    statTotalWorks: "ಒಟ್ಟು ಕಾಮಗಾರಿಗಳು",
    statCompletedWorks: "ಪೂರ್ಣಗೊಂಡ ಕಾಮಗಾರಿ",
    statInProgressWorks: "ಪ್ರಗತಿಯಲ್ಲಿರುವ ಕಾಮಗಾರಿ",
    statPendingWorks: "ಅನುಮೋದಿತ / ಕಾಯ್ದಿರಿಸಿದ",

    // Recent Highlights
    recentHighlightsTitle: "ಕ್ಷೇತ್ರದ ಇತ್ತೀಚಿನ ಪ್ರಮುಖ ಕಾಮಗಾರಿಗಳು",
    viewAllWorks: "ಎಲ್ಲಾ ಕಾಮಗಾರಿಗಳ ಪಟ್ಟಿ ವೀಕ್ಷಿಸಿ →",

    // Explorer Page
    explorerTitle: "ಕ್ಷೇತ್ರ ಪ್ರದೇಶ ಪರಿಶೋಧಕ",
    explorerSubtitle: "ಗ್ರಾಮಗಳು, ವಾರ್ಡ್‌ಗಳು, ನಿಯೋಜಿತ ನಾಯಕರು ಮತ್ತು ಸಕ್ರಿಯ ಕಾಮಗಾರಿಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಹೋಬಳಿ ಅಥವಾ ನಗರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    searchLocationPlaceholder: "ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಹೆಸರು ಹುಡುಕಿ...",
    expandAll: "ಎಲ್ಲವನ್ನೂ ವಿಸ್ತರಿಸಿ",
    collapseAll: "ಎಲ್ಲವನ್ನೂ ಕುಗ್ಗಿಸಿ",
    leaderAssigned: "ನಿಯೋಜಿತ ನಾಯಕರು",
    contactLeader: "ನಾಯಕರನ್ನು ಸಂಪರ್ಕಿಸಿ",
    totalLocations: "ಒಟ್ಟು ಗ್ರಾಮ / ವಾರ್ಡ್‌ಗಳು",
    activeWorksCount: "ಸಕ್ರಿಯ ಕಾಮಗಾರಿಗಳು",
    viewVillageDetails: "ವಿವರ ಮತ್ತು ಕಾಮಗಾರಿ ವೀಕ್ಷಿಸಿ",

    // Village Detail Modal / Drawer
    villageDetailTitle: "ಅಭಿವೃದ್ಧಿ ವಿವರಗಳು -",
    leaderInfo: "ನಾಯಕರ ವಿವರಗಳು",
    leaderPhone: "ದೂರವಾಣಿ",
    leaderEmail: "ಇಮೇಲ್",
    workItemsForLocation: "ಈ ಸ್ಥಳದ ಅಭಿವೃದ್ಧಿ ಕಾಮಗಾರಿಗಳು",
    noWorksFoundLocation: "ಈ ಗ್ರಾಮ/ವಾರ್ಡ್‌ಗೆ ಇನ್ನೂ ಯಾವುದೇ ಕಾಮಗಾರಿ ವರದಿಯಾಗಿಲ್ಲ.",

    // Work Tracker Page
    trackerTitle: "ಕ್ಷೇತ್ರದ ಕಾಮಗಾರಿ ಟ್ರ್ಯಾಕರ್",
    trackerSubtitle: "ಮಂಡ್ಯ ಕ್ಷೇತ್ರದ ಎಲ್ಲಾ ವರದಿಯಾದ, ಅನುಮೋದಿತ, ಪ್ರಗತಿಯಲ್ಲಿರುವ ಮತ್ತು ಪೂರ್ಣಗೊಂಡ ಕಾಮಗಾರಿಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಮಾಡಿ.",
    searchWorksPlaceholder: "ಕಾಮಗಾರಿ ಶೀರ್ಷಿಕೆ, ಸ್ಥಳ, ಐಡಿ ಅಥವಾ ಕೀವರ್ಡ್ ಮೂಲಕ ಹುಡುಕಿ...",
    filterByArea: "ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು",
    filterByStatus: "ಎಲ್ಲಾ ಸ್ಥಿತಿಗಳು",
    filterByCategory: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    sortBy: "ವಿಂಗಡಿಸಿ",
    sortNewest: "ಇತ್ತೀಚಿನವು ಮೊದಲು",
    sortOldest: "ಹಳೆಯವು ಮೊದಲು",
    sortHighestBudget: "ಅನುದಾನ: ಹೆಚ್ಚಿನಿಂದ ಕಮ್ಮಿ",
    noWorksFoundTracker: "ನಿಮ್ಮ ಫಿಲ್ಟರ್‌ಗೆ ಹೊಂದುವ ಯಾವುದೇ ಕಾಮಗಾರಿ ಕಂಡುಬಂದಿಲ್ಲ.",
    showingWorks: "ತೋರಿಸಲಾಗುತ್ತಿದೆ",
    ofWorks: "ಒಟ್ಟು",
    workItemsText: "ಕಾಮಗಾರಿಗಳು",

    // Table / Cards Headers
    colWorkId: "ಕಾಮಗಾರಿ ಐಡಿ",
    colTitleLocation: "ಕಾಮಗಾರಿ ವಿವರ ಮತ್ತು ಸ್ಥಳ",
    colArea: "ಪ್ರದೇಶ / ಹೋಬಳಿ",
    colCategory: "ವರ್ಗ",
    colStatus: "ಸ್ಥಿತಿ",
    colPriority: "ಆದ್ಯತೆ",
    colBudget: "ಮಂಜೂರಾದ ಅನುದಾನ",
    colDate: "ಕೊನೆಯ ನವೀಕರಣ",
    colActions: "ಕ್ರಿಯೆ",

    // Statuses
    statusReported: "ವರದಿಯಾಗಿದೆ",
    statusApproved: "ಅನುಮೋದಿಸಲಾಗಿದೆ",
    statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
    statusCompleted: "ಪೂರ್ಣಗೊಂಡಿದೆ",

    // Priorities
    priorityHigh: "ಹೆಚ್ಚಿನ ಆದ್ಯತೆ",
    priorityMedium: "ಮಧ್ಯಮ ಆದ್ಯತೆ",
    priorityLow: "ಸಾಮಾನ್ಯ ಆದ್ಯತೆ",

    // Categories
    catRoad: "ರಸ್ತೆ ಮತ್ತು ಹೆದ್ದಾರಿ",
    catWater: "ಕುಡಿಯುವ ನೀರು",
    catDrainage: "ನೈರ್ಮಲ್ಯ ಮತ್ತು ಒಳಚರಂಡಿ",
    catElectricity: "ಬೀದಿ ದೀಪಗಳು",
    catEducation: "ಶಿಕ್ಷಣ ಮತ್ತು ಶಾಲೆಗಳು",
    catHealth: "ಆರೋಗ್ಯ ಮತ್ತು ಚಿಕಿತ್ಸಾಲಯ",
    catCommunity: "ಸಮುದಾಯ ಮತ್ತು ಕ್ರೀಡೆ",

    // Submit Request Form
    submitTitle: "ಹೊಸ ಕಾಮಗಾರಿ ಕೋರಿಕೆ ಸಲ್ಲಿಸಿ",
    submitSubtitle: "ಹೋಬಳಿ ನಾಯಕರು ಮತ್ತು ನಾಗರಿಕರು ಅಭಿವೃದ್ಧಿ ಪ್ರಸ್ತಾಪ ಅಥವಾ ನಾಗರಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ನೇರವಾಗಿ ಶಾಸಕರ ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಬಹುದು.",
    formArea: "ಪ್ರದೇಶ / ಹೋಬಳಿ ಆಯ್ಕೆಮಾಡಿ *",
    formLocation: "ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ *",
    formWorkTitle: "ಕಾಮಗಾರಿಯ ಶೀರ್ಷಿಕೆ / ಮುಖ್ಯಾಂಶ *",
    formCategory: "ವರ್ಗ ಆಯ್ಕೆಮಾಡಿ *",
    formPriority: "ಆದ್ಯತೆಯ ಮಟ್ಟ",
    formDescription: "ಕಾಮಗಾರಿ / ಸಮಸ್ಯೆಯ ಸಂಪೂರ್ಣ ವಿವರಣೆ *",
    formPhoto: "ಛಾಯಾಚಿತ್ರ / ದಾಖಲೆ (ಐಚ್ಛಿಕ)",
    formSubmitBtn: "ಶಾಸಕರ ಕಚೇರಿಗೆ ಸಲ್ಲಿಸಿ",
    formSubmitting: "ಸಲ್ಲಿಕೆಯಾಗುತ್ತಿದೆ...",
    formSuccessMsg: "ಕಾಮಗಾರಿ ಕೋರಿಕೆ ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಕೆಯಾಗಿದೆ! ನಿಯೋಜಿತ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿ: ",

    // Validation Errors
    errAreaRequired: "ದಯವಿಟ್ಟು ಪ್ರದೇಶ / ಹೋಬಳಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    errLocationRequired: "ದಯವಿಟ್ಟು ಗ್ರಾಮ ಅಥವಾ ವಾರ್ಡ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    errTitleRequired: "ದಯವಿಟ್ಟು ಕಾಮಗಾರಿಯ ಶೀರ್ಷಿಕೆಯನ್ನು ನಮೂದಿಸಿ.",
    errDescriptionRequired: "ದಯವಿಟ್ಟು ಕನಿಷ್ಠ ೧೫ ಅಕ್ಷರಗಳ ಸಂಪೂರ್ಣ ವಿವರಣೆ ನೀಡಿ.",

    // Admin Panel
    adminTitle: "ಶಾಸಕರ ಕಚೇರಿ ಅಡ್ಮಿನ್ ಪ್ಯಾನಲ್",
    adminSubtitle: "ಕೋರಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, ಅನುಮೋದಿಸಿ, ಕಾಮಗಾರಿ ಪ್ರಗತಿಯನ್ನು ನವೀಕರಿಸಿ ಮತ್ತು ಅಧಿಕೃತ ಟಿಪ್ಪಣಿಗಳನ್ನು ಸೇರಿಸಿ.",
    adminQueueTab: "ಅನುಮೋದನೆಗಾಗಿ ಕಾಯುತ್ತಿರುವ ಕೋರಿಕೆಗಳು",
    adminManageWorksTab: "ಕ್ಷೇತ್ರದ ಎಲ್ಲಾ ಕಾಮಗಾರಿಗಳು",
    adminHobliLeadersTab: "ಹೋಬಳಿ ನಾಯಕರ ಪಟ್ಟಿ",
    approveAction: "ಕಾಮಗಾರಿ ಅನುಮೋದಿಸಿ",
    updateStatusAction: "ಸ್ಥಿತಿ ನವೀಕರಿಸಿ",
    addNoteAction: "ಅಡ್ಮಿನ್ ಟಿಪ್ಪಣಿ ಸೇರಿಸಿ",
    sanctionBudgetAction: "ಅನುದಾನ ಮಂಜೂರು",
    saveChanges: "ಬದಲಾವಣೆ ಉಳಿಸಿ",
    adminAccessOnlyMsg: "ಈ ವಿಭಾಗಕ್ಕೆ ಶಾಸಕರ ಕಚೇರಿ ಅಡ್ಮಿನ್ ಲಾಗಿನ್ ಅಗತ್ಯವಿದೆ.",
    quickLoginAsAdmin: "ಅಡ್ಮಿನ್ ಆಗಿ ಲಾಗಿನ್ ಆಗಿ",

    // Login Modal
    loginModalTitle: "ಮಂಡ್ಯ ವೇದಿಕೆ ಲಾಗಿನ್",
    loginRoleSelect: "ಪಾತ್ರ ಆಯ್ಕೆಮಾಡಿ",
    usernameLabel: "ಬಳಕೆದಾರ ಹೆಸರು / ಮೊಬೈಲ್",
    passwordLabel: "ಪಾಸ್‌ವರ್ಡ್",
    loginSubmitBtn: "ಪ್ರವೇಶಿಸಿ",
    roleCitizenDesc: "ಎಲ್ಲಾ ಸಾರ್ವಜನಿಕ ಕಾಮಗಾರಿಗಳನ್ನು ವೀಕ್ಷಿಸಿ ಮತ್ತು ಸಮಸ್ಯೆಗಳನ್ನು ಸಲ್ಲಿಸಿ.",
    roleLeaderDesc: "ಹೋಬಳಿ ನಾಯಕರು ತಮ್ಮ ಗ್ರಾಮದ ಕೋರಿಕೆಗಳನ್ನು ಸಲ್ಲಿಸಲು ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು.",
    roleAdminDesc: "ಶಾಸಕರ ಕಚೇರಿಯ ಸಿಬ್ಬಂದಿಗೆ ಅನುಮೋದನೆ ಮತ್ತು ನವೀಕರಣಕ್ಕಾಗಿ.",
    loginHintText: "ಡೆಮೋ ಲಾಗಿನ್ — ಅಡ್ಮಿನ್: admin / mla2026 | ಹೋಬಳಿ ನಾಯಕರು: leader_kasaba / leader123",

    // Footer
    footerRights: "ಮಂಡ್ಯ ವಿಧಾನಸಭಾ ಕ್ಷೇತ್ರ ಅಭಿವೃದ್ಧಿ ಪೋರ್ಟಲ್. ನಾಗರಿಕರ ಪಾರದರ್ಶಕತೆಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",
    footerMLAOffice: "ರವಿ ಕುಮಾರ್ ಗೌಡ (ಗಣಿಗ ರವಿ), ಶಾಸಕರ ಕಚೇರಿ, ಮಂಡ್ಯ ಕ್ಷೇತ್ರ."
  }
};
