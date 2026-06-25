import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      home: "Home",
      about: "About",
      aboutUs: "About Us",
      jobs: "Jobs",
      companies: "Companies",
      contact: "Contact",
      signup: "Sign Up",
      login: "Login",
      admin: "Admin Panel",

      heroBadge: "Sri Lanka's Trusted Job Search Portal",
      heroTitle1: "Find Your Next",
      heroTitle2: "Dream Job",
      heroSub:
        "Discover premium local and global jobs with one powerful career platform.",
      heroInput: "Job title, keywords or company",
      heroLocation: "Sri Lanka",
      heroBtn: "Search Jobs",

      aboutDescription:
        "JobCenter+ is a modern job platform designed to connect job seekers with trusted employers across Sri Lanka.",
      jobOpportunities: "Job Opportunities",
      jobOpportunitiesDesc:
        "Find active jobs from different industries and locations.",
      forJobSeekers: "For Job Seekers",
      forJobSeekersDesc: "Apply for jobs quickly and build your career path.",
      trustedPlatform: "Trusted Platform",
      trustedPlatformDesc:
        "Simple, safe and reliable job application experience.",

      recent: "Recent",
      findApply: "Find opportunities and apply instantly",
      noJobs: "No Jobs Found",
      tryKeyword: "Try another keyword",
      new: "New",
      saveJob: "Save Job",
      applyNow: "Apply Now",
      loginFirst: "Please login first",
      jobSaved: "Job Saved ❤️",
      saveFailed: "Failed to save",

      statistics: "Statistics",
      platform: "Platform",
      overview: "Overview",
      activeJobs: "Active Jobs",
      companiesCount: "Companies",
      candidates: "Candidates",
      countries: "Countries",

      stats: {
        statistics: "Statistics",
        platform: "Platform",
        overview: "Overview",
        description:
          "Discover opportunities, connect with employers and build your future with our growing job platform.",
        activeJobs: "Active Jobs",
        companies: "Companies",
        candidates: "Candidates",
        countries: "Countries",
        updatedDaily: "Updated Daily",
      },

      features: "Features",
      featuresTitle1: "Find Your Next",
      featuresTitle2: "Dream Job",
      featuresMainDesc:
        "Discover trusted employers, apply quickly, and grow your career with Sri Lanka's modern job platform.",
      featureJobOpportunities: "Thousands of Job Opportunities",
      featureJobOpportunitiesDesc:
        "Explore a wide range of vacancies from trusted employers across Sri Lanka.",
      featureTrustedEmployers: "Trusted Employers",
      featureTrustedEmployersDesc:
        "Connect directly with verified companies and recruitment agencies.",
      featureCareerGrowth: "Career Growth",
      featureCareerGrowthDesc:
        "Find jobs that help you build experience and grow your career path.",
      featureSecureApplications: "Safe & Secure Applications",
      featureSecureApplicationsDesc:
        "Apply for jobs confidently through a secure and reliable platform.",
      featureQuickApplications: "Quick Job Applications",
      featureQuickApplicationsDesc:
        "Apply to jobs in minutes using a simple and user-friendly process.",
      featureDailyVacancies: "Daily New Vacancies",
      featureDailyVacanciesDesc:
        "Stay updated with the latest job openings added every day.",

      trustedCompanies: "Trusted Companies",
      topEmployers: "Top Employers",
      hiringNow: "Hiring Now",
      companiesDescription:
        "Discover opportunities from trusted companies and premium employers.",

      contactUs: "Contact Us",
      office: "Office",
      contactDescription:
        "Connect with us for career opportunities, partnerships and support.",
      trustedCareer: "Your trusted career platform in Sri Lanka.",
      sendMessage: "Send Message",
      yourName: "Your Name",
      emailAddress: "Email Address",
      subject: "Subject",
      writeMessage: "Write your message...",
      sending: "Sending...",
      location: "Location",
      email: "Email",
      phone: "Phone",
      workingHours: "Working Hours",
      success: "Success",
      notice: "Notice",
      fillAllFields: "Please fill all fields",
      validEmail: "Please enter a valid email address",
      messageSent: "Message sent successfully",
      messageFailed: "Failed to send message",

      getPremium: "Get Premium",
      jobAlerts: "Job Alerts",
      newsletterDescription:
        "Stay connected with the latest career opportunities and updates.",
      subscribe: "Subscribe",
      loading: "Loading...",
      enterEmail: "Enter Email",
      subscribedSuccess: "Subscribed Successfully",
      subscribeFailed: "Subscription Failed",

      careerManagement: "Career Management",
      addJobVacancy: "Add Job Vacancy",
      addJobDescription:
        "Create and publish a new job opportunity with a premium dashboard form.",
      companyName: "Company Name",
      jobTitle: "Job Title",
      jobTypePlaceholder: "Full-time / Part-time / Hybrid",
      category: "Category",
      daysLeftPlaceholder: "10 days left",
      salary: "Salary",
      jobDescriptionLabel: "Job Description",
      jobDescriptionPlaceholder:
        "Write job description, responsibilities, requirements...",
      publishJobVacancy: "Publish Job Vacancy",
      publishing: "Publishing...",
      jobRequiredAlert: "Company, title, location and type are required",
      jobAddedSuccess: "Job added successfully",
      jobAddFailed: "Failed to add job",

      adminControlCenter: "Admin Control Center",
      welcomeDashboard: "Welcome to",
      dashboardText: "Dashboard",
      adminDescription:
        "Manage vacancies, review applications and control your Job Center Plus platform from one professional dashboard.",
      manage: "Manage",
      createManageVacancies: "Create and manage vacancies",
      users: "Users",
      registeredJobSeekers: "Registered job seekers",
      applications: "Applications",
      review: "Review",
      viewCVs: "View CVs and submissions",
      adminManagementPanel: "Admin Management Panel",
      menuDashboard: "Dashboard",
      menuAddJob: "Add Job",
      menuManageJobs: "Manage Jobs",
      menuApplications: "Applications",
      backWebsite: "Back Website",
      menuFeaturedJobs: "Featured Jobs",
      menuLatestNews: "Latest News",
      featuredJobs: "Featured Jobs",
      edit: "Edit",
      updateHomepageJobs: "Update homepage job cards",
      latestNews: "Latest News",
      updateLatestNews: "Update latest news section",

      skills: {
        badge: "Most Demanded Skills",
        title: "Top Skills Employers",
        highlight: "Looking For",
        description:
          "Discover the most in-demand skills across retail, hospitality, logistics, manufacturing, construction, and service industries.",
        cardDescription: "High demand jobs available across Sri Lanka.",
        items: {
          salesAssistant: "Sales Assistant",
          customerService: "Customer Service",
          driver: "Driver",
          storeKeeper: "Store Keeper",
          constructionWorker: "Construction Worker",
          factoryWorker: "Factory Worker",
          cookKitchenHelper: "Cook / Kitchen Helper",
          hotelStaff: "Hotel Staff",
          cleanerHousekeeping: "Cleaner / Housekeeping",
          securityOfficer: "Security Officer",
          agricultureWorker: "Agriculture Worker",
          cashier: "Cashier",
        },
      },

      faq: {
        badge: "FAQ",
        title1: "Frequently Asked",
        title2: "Questions",
        description:
          "Find clear answers about applying, CV uploads, registration and job alerts.",
        q1: "How can I apply for jobs?",
        a1: "Create an account, choose a job, upload your CV and submit your application instantly.",
        q2: "Is registration free?",
        a2: "Yes, registration is completely free for job seekers.",
        q3: "Can I upload my CV?",
        a3: "Yes, you can upload your CV while applying for a job.",
        q4: "How do I get job alerts?",
        a4: "Subscribe to our newsletter and receive latest job updates by email.",
      },

      dashboardPreview: {
        badge: "Live Analytics",
        title1: "Employer",
        title2: "Dashboard",
        description:
          "Real-time hiring analytics for jobs, interviews and successful candidates.",
        activeJobs: "Active Jobs",
        interviews: "Interviews",
        hiredCandidates: "Hired Candidates",
      },

      news: {
        badge: "Career Updates",
        title1: "Latest",
        title2: "Insights",
        description: "News and career updates will be updated soon.",
        trustedNews: "Trusted Career News",
        readMore: "Read More",
        close: "Close",
        tag: "Tag",
        date: "Date",
        title: "Title",
        descriptionField: "Description",
      },

      categories: {
        badge: "Categories",
        title1: "Explore Job",
        title2: "Categories",
        description:
          "Browse jobs by category and find the best opportunities that match your skills.",
        pending: "Pending",
        viewJobs: "View Jobs",
        items: {
          itSoftware: "IT & Software",
          healthcare: "Healthcare",
          education: "Education",
          officeAdmin: "Office Admin",
          customerSupport: "Customer Support",
          logistics: "Logistics",
          accounting: "Accounting",
          design: "Design",
        },
      },

      auth: {
        continue: "Continue",
        loginWith: "Login with phone number or Google",
        phoneNumber: "Phone Number",
        phonePlaceholder: "07XXXXXXXX",
        pleaseWait: "Please wait...",
        or: "OR",
        phoneError: "Phone number must be 10 digits",
        loginSuccess: "Login Success",
        googleSuccess: "Google Login Success",
        googleFailed: "Google Login Failed",
        phoneFailed: "Phone login failed",
        missingCredential: "Google credential missing",
      },

      aiJobs: {
        featuredJobs: "Featured Jobs",
        latest: "Latest",
        jobOpportunities: "Job Opportunities",
        description:
          "Pending jobs cannot be applied. Admin can update job details.",
        addJob: "Add Job",
        available: "Available",
        typePlaceholder: "Full Time",
        jobTitlePlaceholder: "Job Title",
        companyPlaceholder: "Company",
        locationPlaceholder: "Location",
        applyNow: "Apply Now",
        notAvailable: "Not Available",
        submitApplication: "Submit Application",
        deleteConfirm: "Delete this job?",
        notAvailableAlert:
          "This job is not available yet. Please wait for admin update.",
        fillRequired: "Please fill name, email and phone number",
        validEmail: "Please enter a valid email address",
        validPhone: "Phone number must be 10 digits",
        applicationSuccess: "Application submitted successfully!",
        yourName: "Your Name",
        emailAddress: "Email Address",
        phoneNumber: "Phone Number",
        message: "Message",
      },

      privacy: {
        title: "KILI Job Center Plus",
        policy: "Privacy Policy",
        secure: "SYSTEM SECURE",
        card1Title: "Inclusive Eligibility",
        card1Desc:
          "No formal boundaries. Whether you have O/L, A/L, Diploma, Degree, NVQ certification, professional experience, or no formal qualification, Job Center Plus values your skills, dedication and potential.",
        card2Title: "Resignation Policy",
        card2Desc:
          "To maintain operational integrity and professional standards, employees are encouraged to provide a minimum two-month notice period before leaving a position, unless otherwise specified by the employer.",
        card3Title: "Liability Disclaimer",
        card3Desc:
          "Job Center Plus serves as a platform connecting employers and job seekers. We are not responsible for workplace disputes, salary issues, theft, misconduct, injuries, or any incidents occurring after employment has been established.",
        card4Title: "Privacy Compliance",
        card4Desc:
          "Personal information is securely processed and used only for recruitment, job matching and employment-related services. We never sell or distribute user data without consent.",
        card5Title: "Data Protection",
        card5Desc:
          "All user data including resumes, contact information and application records are stored using secure systems and protected against unauthorized access.",
        card6Title: "User Responsibility",
        card6Desc:
          "Users must provide accurate information and maintain the confidentiality of their account credentials. False or misleading information may result in account suspension.",
        agreement: "Agreement & Acceptance",
        agreementText:
          "By accessing and using Job Center Plus, you agree to comply with our privacy practices, platform policies, employer guidelines and applicable laws. Continued use of the platform indicates acceptance of these terms.",
        backHome: "Go Back Home",
      },

      common: {
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
      },
    },
  },

  ta: {
    translation: {
      home: "முகப்பு",
      about: "எங்களை பற்றி",
      aboutUs: "எங்களை பற்றி",
      jobs: "வேலைகள்",
      companies: "நிறுவனங்கள்",
      contact: "தொடர்பு",
      signup: "பதிவு செய்",
      login: "உள்நுழை",
      admin: "நிர்வாகம்",

      heroBadge: "இலங்கையின் நம்பகமான வேலை தேடல் தளம்",
      heroTitle1: "உங்கள் அடுத்த",
      heroTitle2: "கனவு வேலை",
      heroSub:
        "ஒரே career platform மூலம் உள்ளூர் மற்றும் உலகளாவிய வேலைகளை கண்டறியுங்கள்.",
      heroInput: "வேலை பெயர் அல்லது நிறுவனம்",
      heroLocation: "இலங்கை",
      heroBtn: "வேலை தேடு",

      aboutDescription:
        "JobCenter+ என்பது இலங்கையின் வேலை தேடுபவர்களையும் நம்பகமான நிறுவனங்களையும் இணைக்கும் நவீன வேலைவாய்ப்பு தளமாகும்.",
      jobOpportunities: "வேலை வாய்ப்புகள்",
      jobOpportunitiesDesc:
        "பல துறைகளிலும் பல இடங்களிலும் உள்ள வேலைகளை கண்டறியுங்கள்.",
      forJobSeekers: "வேலை தேடுபவர்களுக்கு",
      forJobSeekersDesc:
        "வேலைகளுக்கு விரைவாக விண்ணப்பித்து உங்கள் தொழில் வளர்ச்சியை மேம்படுத்துங்கள்.",
      trustedPlatform: "நம்பகமான தளம்",
      trustedPlatformDesc:
        "எளிமையான, பாதுகாப்பான மற்றும் நம்பகமான வேலைவாய்ப்பு விண்ணப்ப அனுபவம்.",

      recent: "சமீபத்திய",
      findApply: "வேலை வாய்ப்புகளை கண்டுபிடித்து உடனே விண்ணப்பிக்கவும்",
      noJobs: "வேலைகள் இல்லை",
      tryKeyword: "வேறு keyword முயற்சி செய்யுங்கள்",
      new: "புதியது",
      saveJob: "வேலையை சேமி",
      applyNow: "இப்போது விண்ணப்பிக்கவும்",
      loginFirst: "முதலில் login செய்யுங்கள்",
      jobSaved: "வேலை சேமிக்கப்பட்டது ❤️",
      saveFailed: "சேமிக்க முடியவில்லை",

      statistics: "புள்ளிவிவரங்கள்",
      platform: "தளம்",
      overview: "மேலோட்டம்",
      activeJobs: "செயலில் உள்ள வேலைகள்",
      companiesCount: "நிறுவனங்கள்",
      candidates: "விண்ணப்பதாரர்கள்",
      countries: "நாடுகள்",

      stats: {
        statistics: "புள்ளிவிவரங்கள்",
        platform: "தளம்",
        overview: "மேலோட்டம்",
        description:
          "வேலை வாய்ப்புகளை கண்டறிந்து, நிறுவனங்களுடன் இணைந்து, உங்கள் எதிர்காலத்தை உருவாக்குங்கள்.",
        activeJobs: "செயலில் உள்ள வேலைகள்",
        companies: "நிறுவனங்கள்",
        candidates: "விண்ணப்பதாரர்கள்",
        countries: "நாடுகள்",
        updatedDaily: "தினமும் புதுப்பிக்கப்படுகிறது",
      },

      features: "அம்சங்கள்",
      featuresTitle1: "உங்கள் அடுத்த",
      featuresTitle2: "கனவு வேலை",
      featuresMainDesc:
        "நம்பகமான நிறுவனங்களை கண்டறிந்து, விரைவாக விண்ணப்பித்து, உங்கள் தொழிலை வளர்த்துக் கொள்ளுங்கள்.",
      featureJobOpportunities: "ஆயிரக்கணக்கான வேலை வாய்ப்புகள்",
      featureJobOpportunitiesDesc:
        "இலங்கை முழுவதும் உள்ள நம்பகமான நிறுவனங்களின் வேலை வாய்ப்புகளை ஆராயுங்கள்.",
      featureTrustedEmployers: "நம்பகமான நிறுவனங்கள்",
      featureTrustedEmployersDesc:
        "சரிபார்க்கப்பட்ட நிறுவனங்கள் மற்றும் வேலைவாய்ப்பு முகவர்களுடன் இணைக.",
      featureCareerGrowth: "தொழில் வளர்ச்சி",
      featureCareerGrowthDesc:
        "உங்கள் அனுபவத்தையும் தொழில் முன்னேற்றத்தையும் வளர்க்கும் வேலைகளை கண்டறியுங்கள்.",
      featureSecureApplications: "பாதுகாப்பான விண்ணப்பங்கள்",
      featureSecureApplicationsDesc:
        "பாதுகாப்பான மற்றும் நம்பகமான தளத்தின் மூலம் நம்பிக்கையுடன் விண்ணப்பியுங்கள்.",
      featureQuickApplications: "விரைவு விண்ணப்பம்",
      featureQuickApplicationsDesc:
        "எளிமையான முறையில் சில நிமிடங்களில் வேலைக்கு விண்ணப்பியுங்கள்.",
      featureDailyVacancies: "தினசரி புதிய வேலைகள்",
      featureDailyVacanciesDesc:
        "ஒவ்வொரு நாளும் சேர்க்கப்படும் புதிய வேலை வாய்ப்புகளுடன் புதுப்பிக்கப்பட்டிருங்கள்.",

      trustedCompanies: "நம்பகமான நிறுவனங்கள்",
      topEmployers: "முக்கிய நிறுவனங்கள்",
      hiringNow: "தற்போது பணியமர்த்துகிறது",
      companiesDescription:
        "நம்பகமான மற்றும் சிறந்த நிறுவனங்களில் வேலை வாய்ப்புகளை கண்டறியுங்கள்.",

      contactUs: "எங்களை தொடர்பு கொள்ளுங்கள்",
      office: "அலுவலகம்",
      contactDescription:
        "வேலை வாய்ப்புகள், கூட்டாண்மை மற்றும் ஆதரவிற்காக எங்களை தொடர்பு கொள்ளுங்கள்.",
      trustedCareer: "இலங்கையின் நம்பகமான வேலை தளம்.",
      sendMessage: "செய்தி அனுப்பு",
      yourName: "உங்கள் பெயர்",
      emailAddress: "மின்னஞ்சல் முகவரி",
      subject: "தலைப்பு",
      writeMessage: "உங்கள் செய்தியை எழுதுங்கள்...",
      sending: "அனுப்பப்படுகிறது...",
      location: "இடம்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      workingHours: "வேலை நேரம்",
      success: "வெற்றி",
      notice: "அறிவிப்பு",
      fillAllFields: "அனைத்து புலங்களையும் நிரப்பவும்",
      validEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
      messageSent: "செய்தி வெற்றிகரமாக அனுப்பப்பட்டது",
      messageFailed: "செய்தி அனுப்ப முடியவில்லை",

      getPremium: "பிரீமியம்",
      jobAlerts: "வேலை அறிவிப்புகள்",
      newsletterDescription:
        "புதிய வேலை வாய்ப்புகள் மற்றும் தகவல்களுடன் இணைந்திருங்கள்.",
      subscribe: "பதிவு செய்",
      loading: "ஏற்றுகிறது...",
      enterEmail: "மின்னஞ்சலை உள்ளிடவும்",
      subscribedSuccess: "வெற்றிகரமாக பதிவு செய்யப்பட்டது",
      subscribeFailed: "பதிவு தோல்வியடைந்தது",

      careerManagement: "தொழில் மேலாண்மை",
      addJobVacancy: "வேலை வாய்ப்பு சேர்க்கவும்",
      addJobDescription: "புதிய வேலை வாய்ப்பை உருவாக்கி வெளியிடுங்கள்.",
      companyName: "நிறுவனத்தின் பெயர்",
      jobTitle: "வேலை தலைப்பு",
      jobTypePlaceholder: "முழு நேரம் / பகுதி நேரம் / Hybrid",
      category: "வகை",
      daysLeftPlaceholder: "10 நாட்கள் மீதம்",
      salary: "சம்பளம்",
      jobDescriptionLabel: "வேலை விவரம்",
      jobDescriptionPlaceholder:
        "வேலை விவரம், பொறுப்புகள், தேவைகள் ஆகியவற்றை எழுதுங்கள்...",
      publishJobVacancy: "வேலை வாய்ப்பை வெளியிடு",
      publishing: "வெளியிடப்படுகிறது...",
      jobRequiredAlert:
        "நிறுவனம், வேலை தலைப்பு, இடம் மற்றும் வேலை வகை அவசியம்",
      jobAddedSuccess: "வேலை வெற்றிகரமாக சேர்க்கப்பட்டது",
      jobAddFailed: "வேலை சேர்க்க முடியவில்லை",

      adminControlCenter: "நிர்வாக கட்டுப்பாட்டு மையம்",
      welcomeDashboard: "வரவேற்கிறோம்",
      dashboardText: "டாஷ்போர்டு",
      adminDescription:
        "வேலை வாய்ப்புகளை நிர்வகிக்கவும், விண்ணப்பங்களை மதிப்பாய்வு செய்யவும்.",
      manage: "நிர்வகி",
      createManageVacancies: "வேலை வாய்ப்புகளை உருவாக்கி நிர்வகிக்கவும்",
      users: "பயனர்கள்",
      registeredJobSeekers: "பதிவு செய்யப்பட்ட வேலை தேடுபவர்கள்",
      applications: "விண்ணப்பங்கள்",
      review: "மதிப்பாய்வு",
      viewCVs: "CV மற்றும் விண்ணப்பங்களை பார்க்கவும்",
      adminManagementPanel: "நிர்வாக மேலாண்மை குழு",
      menuDashboard: "டாஷ்போர்டு",
      menuAddJob: "வேலை சேர்க்க",
      menuManageJobs: "வேலைகளை நிர்வகி",
      menuApplications: "விண்ணப்பங்கள்",
      backWebsite: "இணையதளத்திற்கு திரும்பு",
      menuFeaturedJobs: "சிறப்பு வேலைகள்",
      menuLatestNews: "சமீபத்திய செய்திகள்",
      featuredJobs: "சிறப்பு வேலைகள்",
      edit: "திருத்து",
      updateHomepageJobs: "முகப்பு வேலைகளை புதுப்பி",
      latestNews: "சமீபத்திய செய்திகள்",
      updateLatestNews: "செய்திகளை புதுப்பி",

      skills: {
        badge: "அதிக தேவைப்படும் திறன்கள்",
        title: "வேலைவாய்ப்பாளர்கள் தேடும்",
        highlight: "முக்கிய திறன்கள்",
        description:
          "சில்லறை விற்பனை, ஹோட்டல், போக்குவரத்து, உற்பத்தி, கட்டுமானம் மற்றும் சேவை துறைகளில் அதிக தேவைப்படும் திறன்களை அறியுங்கள்.",
        cardDescription:
          "இலங்கை முழுவதும் அதிக தேவை உள்ள வேலைகள் கிடைக்கின்றன.",
        items: {
          salesAssistant: "விற்பனை உதவியாளர்",
          customerService: "வாடிக்கையாளர் சேவை",
          driver: "ஓட்டுநர்",
          storeKeeper: "கிடங்கு பொறுப்பாளர்",
          constructionWorker: "கட்டுமான தொழிலாளர்",
          factoryWorker: "தொழிற்சாலை தொழிலாளர்",
          cookKitchenHelper: "சமையலர் / சமையலறை உதவியாளர்",
          hotelStaff: "ஹோட்டல் பணியாளர்",
          cleanerHousekeeping: "துப்புரவு / வீட்டு பராமரிப்பு",
          securityOfficer: "பாதுகாப்பு அதிகாரி",
          agricultureWorker: "விவசாய தொழிலாளர்",
          cashier: "காசாளர்",
        },
      },

      faq: {
        badge: "கேள்விகள்",
        title1: "அடிக்கடி கேட்கப்படும்",
        title2: "கேள்விகள்",
        description:
          "விண்ணப்பித்தல், CV upload, பதிவு மற்றும் வேலை அறிவிப்புகள் பற்றிய தெளிவான பதில்களை பெறுங்கள்.",
        q1: "வேலைக்கு எப்படி விண்ணப்பிக்கலாம்?",
        a1: "ஒரு account உருவாக்கி, வேலை ஒன்றை தேர்வு செய்து, உங்கள் CV upload செய்து உடனே விண்ணப்பிக்கலாம்.",
        q2: "பதிவு இலவசமா?",
        a2: "ஆம், வேலை தேடுபவர்களுக்கு பதிவு முழுமையாக இலவசம்.",
        q3: "நான் CV upload செய்ய முடியுமா?",
        a3: "ஆம், வேலைக்கு விண்ணப்பிக்கும் போது உங்கள் CV upload செய்யலாம்.",
        q4: "வேலை அறிவிப்புகளை எப்படி பெறுவது?",
        a4: "Newsletter-க்கு subscribe செய்தால் புதிய வேலை தகவல்கள் email மூலம் கிடைக்கும்.",
      },

      dashboardPreview: {
        badge: "நேரடி பகுப்பாய்வு",
        title1: "Employer",
        title2: "டாஷ்போர்டு",
        description:
          "வேலைகள், நேர்காணல்கள் மற்றும் தேர்வு செய்யப்பட்ட விண்ணப்பதாரர்களுக்கான நேரடி hiring analytics.",
        activeJobs: "செயலில் உள்ள வேலைகள்",
        interviews: "நேர்காணல்கள்",
        hiredCandidates: "தேர்வு செய்யப்பட்ட விண்ணப்பதாரர்கள்",
      },

      news: {
        badge: "தொழில் புதுப்பிப்புகள்",
        title1: "சமீபத்திய",
        title2: "செய்திகள்",
        description:
          "செய்திகள் மற்றும் தொழில் புதுப்பிப்புகள் விரைவில் புதுப்பிக்கப்படும்.",
        trustedNews: "நம்பகமான தொழில் செய்திகள்",
        readMore: "மேலும் படிக்க",
        close: "மூடு",
        tag: "குறிச்சொல்",
        date: "தேதி",
        title: "தலைப்பு",
        descriptionField: "விளக்கம்",
      },

      categories: {
        badge: "வகைகள்",
        title1: "வேலை",
        title2: "வகைகளை ஆராயுங்கள்",
        description:
          "உங்கள் திறமைகளுக்கு பொருத்தமான சிறந்த வேலை வாய்ப்புகளை வகை அடிப்படையில் கண்டறியுங்கள்.",
        pending: "நிலுவையில்",
        viewJobs: "வேலைகளை பார்க்க",
        items: {
          itSoftware: "தகவல் தொழில்நுட்பம் & மென்பொருள்",
          healthcare: "சுகாதாரம்",
          education: "கல்வி",
          officeAdmin: "அலுவலக நிர்வாகம்",
          customerSupport: "வாடிக்கையாளர் ஆதரவு",
          logistics: "லாஜிஸ்டிக்ஸ்",
          accounting: "கணக்கியல்",
          design: "வடிவமைப்பு",
        },
      },

      auth: {
        continue: "தொடரவும்",
        loginWith: "தொலைபேசி எண் அல்லது Google மூலம் உள்நுழையவும்",
        phoneNumber: "தொலைபேசி எண்",
        phonePlaceholder: "07XXXXXXXX",
        pleaseWait: "சற்று காத்திருக்கவும்...",
        or: "அல்லது",
        phoneError: "தொலைபேசி எண் 10 இலக்கமாக இருக்க வேண்டும்",
        loginSuccess: "உள்நுழைவு வெற்றி",
        googleSuccess: "Google உள்நுழைவு வெற்றி",
        googleFailed: "Google உள்நுழைவு தோல்வி",
        phoneFailed: "தொலைபேசி உள்நுழைவு தோல்வி",
        missingCredential: "Google credential இல்லை",
      },

      aiJobs: {
        featuredJobs: "சிறப்பு வேலைகள்",
        latest: "சமீபத்திய",
        jobOpportunities: "வேலை வாய்ப்புகள்",
        description:
          "Pending வேலைகளுக்கு விண்ணப்பிக்க முடியாது. Admin update செய்யலாம்.",
        addJob: "வேலை சேர்க்க",
        available: "கிடைக்கிறது",
        typePlaceholder: "முழுநேரம்",
        jobTitlePlaceholder: "வேலை தலைப்பு",
        companyPlaceholder: "நிறுவனத்தின் பெயர்",
        locationPlaceholder: "இடம்",
        applyNow: "இப்போது விண்ணப்பிக்கவும்",
        notAvailable: "கிடைக்கவில்லை",
        submitApplication: "விண்ணப்பத்தை சமர்ப்பிக்கவும்",
        deleteConfirm: "இந்த வேலையை நீக்கவா?",
        notAvailableAlert:
          "இந்த வேலை இன்னும் கிடைக்கவில்லை. Admin update செய்யும் வரை காத்திருக்கவும்.",
        fillRequired: "பெயர், மின்னஞ்சல் மற்றும் தொலைபேசி எண்ணை நிரப்பவும்",
        validEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்",
        validPhone: "தொலைபேசி எண் 10 இலக்கமாக இருக்க வேண்டும்",
        applicationSuccess: "விண்ணப்பம் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
        yourName: "உங்கள் பெயர்",
        emailAddress: "மின்னஞ்சல் முகவரி",
        phoneNumber: "தொலைபேசி எண்",
        message: "செய்தி",
      },

      privacy: {
        title: "KILI Job Center Plus",
        policy: "தனியுரிமைக் கொள்கை",
        secure: "அமைப்பு பாதுகாப்பானது",
        card1Title: "அனைவருக்கும் தகுதி",
        card1Desc:
          "O/L, A/L, Diploma, Degree, NVQ அல்லது எந்தவொரு தொழில்முறை அனுபவமும் இல்லாவிட்டாலும், உங்கள் திறமைகள் மற்றும் திறன்கள் மதிக்கப்படுகின்றன.",
        card2Title: "பணிவிலகல் கொள்கை",
        card2Desc:
          "பணியை விட்டு வெளியேறும் முன் குறைந்தது இரண்டு மாத முன் அறிவிப்பு வழங்குவது பரிந்துரைக்கப்படுகிறது.",
        card3Title: "பொறுப்பு மறுப்பு",
        card3Desc:
          "Job Center Plus ஒரு வேலைவாய்ப்பு இணைப்பு தளமாக மட்டுமே செயல்படுகிறது. வேலைக்குப் பிறகு ஏற்படும் பிரச்சினைகளுக்கு நாங்கள் பொறுப்பல்ல.",
        card4Title: "தனியுரிமை இணக்கம்",
        card4Desc:
          "உங்கள் தகவல்கள் வேலை பொருத்தம் மற்றும் வேலைவாய்ப்பு சேவைகளுக்காக மட்டுமே பயன்படுத்தப்படும்.",
        card5Title: "தரவு பாதுகாப்பு",
        card5Desc:
          "CV, தொடர்பு விவரங்கள் மற்றும் விண்ணப்பத் தகவல்கள் பாதுகாப்பாக சேமிக்கப்படுகின்றன.",
        card6Title: "பயனர் பொறுப்பு",
        card6Desc:
          "சரியான தகவல்களை வழங்குவதும் கணக்கு பாதுகாப்பை பராமரிப்பதும் பயனரின் பொறுப்பாகும்.",
        agreement: "ஒப்பந்தம் மற்றும் ஏற்றுக்கொள்ளல்",
        agreementText:
          "Job Center Plus ஐ பயன்படுத்துவதன் மூலம் எங்கள் தனியுரிமை கொள்கைகள் மற்றும் விதிமுறைகளை நீங்கள் ஏற்றுக்கொள்கிறீர்கள்.",
        backHome: "முகப்பிற்கு திரும்பு",
      },

      common: {
        save: "சேமி",
        cancel: "ரத்து செய்",
        edit: "திருத்து",
        delete: "நீக்கு",
      },
    },
  },

  si: {
    translation: {
      home: "මුල් පිටුව",
      about: "අප ගැන",
      aboutUs: "අප ගැන",
      jobs: "රැකියා",
      companies: "සමාගම්",
      contact: "සම්බන්ධ වන්න",
      signup: "ලියාපදිංචි වන්න",
      login: "පිවිසෙන්න",
      admin: "පරිපාලක",

      heroBadge: "ශ්‍රී ලංකාවේ විශ්වාසදායක රැකියා වෙබ් අඩවිය",
      heroTitle1: "ඔබගේ ඊළඟ",
      heroTitle2: "සිහින රැකියාව",
      heroSub: "එක් platform එකකින් දේශීය හා ජාත්‍යන්තර රැකියා සොයන්න.",
      heroInput: "රැකියා නම හෝ සමාගම",
      heroLocation: "ශ්‍රී ලංකාව",
      heroBtn: "රැකියා සොයන්න",

      aboutDescription:
        "JobCenter+ යනු ශ්‍රී ලංකාවේ රැකියා සොයන්නන් සහ විශ්වාසදායක සේවායෝජකයන් සම්බන්ධ කරන නවීන රැකියා වේදිකාවකි.",
      jobOpportunities: "රැකියා අවස්ථා",
      jobOpportunitiesDesc: "විවිධ ක්ෂේත්‍ර සහ ස්ථාන වල රැකියා සොයා ගන්න.",
      forJobSeekers: "රැකියා සොයන්නන් සඳහා",
      forJobSeekersDesc: "ඉක්මනින් අයදුම් කර ඔබගේ වෘත්තීය ගමන වර්ධනය කර ගන්න.",
      trustedPlatform: "විශ්වාසදායක වේදිකාව",
      trustedPlatformDesc:
        "සරල, ආරක්ෂිත සහ විශ්වාසදායක රැකියා අයදුම් කිරීමේ අත්දැකීමක්.",

      recent: "නවතම",
      findApply: "අවස්ථා සොයාගෙන ඉක්මනින් අයදුම් කරන්න",
      noJobs: "රැකියා හමු නොවුණි",
      tryKeyword: "වෙනත් keyword එකක් උත්සාහ කරන්න",
      new: "නව",
      saveJob: "රැකියාව සුරකින්න",
      applyNow: "දැන් අයදුම් කරන්න",
      loginFirst: "කරුණාකර පළමුව login වන්න",
      jobSaved: "රැකියාව සුරක්ෂිතයි ❤️",
      saveFailed: "සුරැකීමට අසමත් විය",

      statistics: "සංඛ්‍යාලේඛන",
      platform: "වේදිකාව",
      overview: "දළ විශ්ලේෂණය",
      activeJobs: "ක්‍රියාකාරී රැකියා",
      companiesCount: "සමාගම්",
      candidates: "අයදුම්කරුවන්",
      countries: "රටවල්",

      stats: {
        statistics: "සංඛ්‍යාලේඛන",
        platform: "වේදිකාව",
        overview: "දළ විශ්ලේෂණය",
        description:
          "රැකියා අවස්ථා සොයාගෙන, සේවායෝජකයන් සමඟ සම්බන්ධ වී, ඔබගේ අනාගතය ගොඩනගන්න.",
        activeJobs: "ක්‍රියාකාරී රැකියා",
        companies: "සමාගම්",
        candidates: "අයදුම්කරුවන්",
        countries: "රටවල්",
        updatedDaily: "දිනපතා යාවත්කාලීන වේ",
      },

      features: "විශේෂාංග",
      featuresTitle1: "ඔබගේ ඊළඟ",
      featuresTitle2: "සිහින රැකියාව",
      featuresMainDesc:
        "විශ්වාසදායක සේවාදායකයින් සොයාගෙන ඉක්මනින් අයදුම් කර ඔබගේ වෘත්තිය වර්ධනය කර ගන්න.",
      featureJobOpportunities: "දහස් ගණනක් රැකියා අවස්ථා",
      featureJobOpportunitiesDesc:
        "ශ්‍රී ලංකාව පුරා විශ්වාසදායක සේවාදායකයින්ගෙන් රැකියා සොයා ගන්න.",
      featureTrustedEmployers: "විශ්වාසදායක සේවාදායකයින්",
      featureTrustedEmployersDesc:
        "තහවුරු කරන ලද සමාගම් හා බඳවා ගැනීමේ ආයතන සමඟ සම්බන්ධ වන්න.",
      featureCareerGrowth: "වෘත්තීය වර්ධනය",
      featureCareerGrowthDesc:
        "ඔබගේ අත්දැකීම් සහ වෘත්තීය ගමන වර්ධනය කරන රැකියා සොයා ගන්න.",
      featureSecureApplications: "ආරක්ෂිත අයදුම් කිරීම්",
      featureSecureApplicationsDesc:
        "ආරක්ෂිත සහ විශ්වාසදායක වේදිකාවක් හරහා විශ්වාසයෙන් අයදුම් කරන්න.",
      featureQuickApplications: "වේගවත් අයදුම් කිරීම",
      featureQuickApplicationsDesc:
        "සරල සහ පහසු ක්‍රියාවලියකින් මිනිත්තු කිහිපයකින් අයදුම් කරන්න.",
      featureDailyVacancies: "දෛනික නව රැකියා",
      featureDailyVacanciesDesc:
        "සෑම දිනකම එක් කරන නව රැකියා අවස්ථා සමඟ යාවත්කාලීනව සිටින්න.",

      trustedCompanies: "විශ්වාසදායක සමාගම්",
      topEmployers: "ප්‍රමුඛ සේවායෝජකයින්",
      hiringNow: "දැන් බඳවා ගනී",
      companiesDescription:
        "විශ්වාසදායක සමාගම් සහ ප්‍රමුඛ සේවායෝජකයන්ගෙන් අවස්ථා සොයා ගන්න.",

      contactUs: "අප අමතන්න",
      office: "කාර්යාලය",
      contactDescription:
        "රැකියා අවස්ථා, හවුල්කාරිත්වයන් සහ සහාය සඳහා අප හා සම්බන්ධ වන්න.",
      trustedCareer: "ශ්‍රී ලංකාවේ ඔබගේ විශ්වාසදායක රැකියා වේදිකාව.",
      sendMessage: "පණිවිඩය යවන්න",
      yourName: "ඔබගේ නම",
      emailAddress: "විද්‍යුත් තැපෑල",
      subject: "විෂය",
      writeMessage: "ඔබගේ පණිවිඩය ලියන්න...",
      sending: "යවමින්...",
      location: "ස්ථානය",
      email: "විද්‍යුත් තැපෑල",
      phone: "දුරකථන",
      workingHours: "වැඩ කරන වේලාවන්",
      success: "සාර්ථකයි",
      notice: "දැනුම්දීම",
      fillAllFields: "කරුණාකර සියලුම කොටස් පුරවන්න",
      validEmail: "කරුණාකර වලංගු විද්‍යුත් තැපෑලක් ඇතුළත් කරන්න",
      messageSent: "පණිවිඩය සාර්ථකව යවන ලදී",
      messageFailed: "පණිවිඩය යැවීමට අසමත් විය",

      getPremium: "වාරික",
      jobAlerts: "රැකියා දැනුම්දීම්",
      newsletterDescription:
        "නවතම රැකියා අවස්ථා සහ යාවත්කාලීන සමඟ සම්බන්ධව සිටින්න.",
      subscribe: "ලියාපදිංචි වන්න",
      loading: "පූරණය වෙමින්...",
      enterEmail: "විද්‍යුත් තැපෑල ඇතුළත් කරන්න",
      subscribedSuccess: "සාර්ථකව ලියාපදිංචි විය",
      subscribeFailed: "ලියාපදිංචිය අසාර්ථකයි",

      careerManagement: "වෘත්තීය කළමනාකරණය",
      addJobVacancy: "රැකියා අවස්ථාවක් එක් කරන්න",
      addJobDescription: "නව රැකියා අවස්ථාවක් සාදා ප්‍රකාශ කරන්න.",
      companyName: "සමාගමේ නම",
      jobTitle: "රැකියා මාතෘකාව",
      jobTypePlaceholder: "පූර්ණ කාලීන / අර්ධ කාලීන / Hybrid",
      category: "කාණ්ඩය",
      daysLeftPlaceholder: "දින 10ක් ඉතිරි",
      salary: "වැටුප",
      jobDescriptionLabel: "රැකියා විස්තරය",
      jobDescriptionPlaceholder:
        "රැකියා විස්තරය, වගකීම් සහ අවශ්‍යතා ලියන්න...",
      publishJobVacancy: "රැකියා අවස්ථාව ප්‍රකාශ කරන්න",
      publishing: "ප්‍රකාශ කරමින්...",
      jobRequiredAlert: "සමාගම, රැකියා මාතෘකාව, ස්ථානය සහ වර්ගය අවශ්‍යයි",
      jobAddedSuccess: "රැකියාව සාර්ථකව එක් කරන ලදී",
      jobAddFailed: "රැකියාව එක් කිරීමට අසමත් විය",

      adminControlCenter: "පරිපාලක පාලන මධ්‍යස්ථානය",
      welcomeDashboard: "සාදරයෙන් පිළිගනිමු",
      dashboardText: "උපකරණ පුවරුව",
      adminDescription: "රැකියා කළමනාකරණය කරන්න, අයදුම්පත් සමාලෝචනය කරන්න.",
      manage: "කළමනාකරණය",
      createManageVacancies: "රැකියා අවස්ථා නිර්මාණය හා කළමනාකරණය කරන්න",
      users: "පරිශීලකයින්",
      registeredJobSeekers: "ලියාපදිංචි රැකියා සොයන්නන්",
      applications: "අයදුම්පත්",
      review: "සමාලෝචනය",
      viewCVs: "CV සහ අයදුම්පත් බලන්න",
      adminManagementPanel: "පරිපාලන කළමනාකරණ පැනලය",
      menuDashboard: "උපකරණ පුවරුව",
      menuAddJob: "රැකියාව එක් කරන්න",
      menuManageJobs: "රැකියා කළමනාකරණය",
      menuApplications: "අයදුම්පත්",
      backWebsite: "වෙබ් අඩවියට ආපසු",
      menuFeaturedJobs: "විශේෂ රැකියා",
      menuLatestNews: "නවතම පුවත්",
      featuredJobs: "විශේෂ රැකියා",
      edit: "සංස්කරණය",
      updateHomepageJobs: "මුල් පිටුවේ රැකියා card update කරන්න",
      latestNews: "නවතම පුවත්",
      updateLatestNews: "නවතම පුවත් update කරන්න",

      skills: {
        badge: "වැඩි ඉල්ලුමක් ඇති කුසලතා",
        title: "සේවායෝජකයින් සොයන",
        highlight: "ප්‍රධාන කුසලතා",
        description:
          "සිල්ලර, හෝටල්, ප්‍රවාහන, නිෂ්පාදන, ඉදිකිරීම් සහ සේවා ක්ෂේත්‍රවල වැඩි ඉල්ලුමක් ඇති කුසලතා සොයා බලන්න.",
        cardDescription: "ශ්‍රී ලංකාව පුරා වැඩි ඉල්ලුමක් ඇති රැකියා තිබේ.",
        items: {
          salesAssistant: "විකුණුම් සහකාර",
          customerService: "පාරිභෝගික සේවය",
          driver: "රියදුරු",
          storeKeeper: "ගබඩා භාරකරු",
          constructionWorker: "ඉදිකිරීම් සේවක",
          factoryWorker: "කර්මාන්තශාලා සේවක",
          cookKitchenHelper: "කුක් / මුළුතැන්ගෙයි සහකාර",
          hotelStaff: "හෝටල් සේවක",
          cleanerHousekeeping: "පිරිසිදු කිරීම / ගෘහ පාලනය",
          securityOfficer: "ආරක්ෂක නිලධාරී",
          agricultureWorker: "කෘෂිකාර්මික සේවක",
          cashier: "මුදල් අයකැමි",
        },
      },

      faq: {
        badge: "FAQ",
        title1: "නිතර අසන",
        title2: "ප්‍රශ්න",
        description:
          "අයදුම් කිරීම, CV upload කිරීම, ලියාපදිංචිය සහ රැකියා දැනුම්දීම් ගැන පැහැදිලි පිළිතුරු ලබා ගන්න.",
        q1: "රැකියාවකට අයදුම් කරන්නේ කොහොමද?",
        a1: "Account එකක් සාදා, රැකියාවක් තෝරා, ඔබගේ CV upload කර ඉක්මනින් අයදුම් කරන්න.",
        q2: "ලියාපදිංචිය නොමිලේද?",
        a2: "ඔව්, රැකියා සොයන්නන් සඳහා ලියාපදිංචිය සම්පූර්ණයෙන්ම නොමිලේ.",
        q3: "මට CV upload කරන්න පුළුවන්ද?",
        a3: "ඔව්, රැකියාවකට අයදුම් කරන විට ඔබගේ CV upload කළ හැක.",
        q4: "රැකියා දැනුම්දීම් ලබා ගන්නේ කොහොමද?",
        a4: "Newsletter එකට subscribe වුණාම නව රැකියා updates email මගින් ලැබේ.",
      },

      dashboardPreview: {
        badge: "සජීවී විශ්ලේෂණ",
        title1: "Employer",
        title2: "උපකරණ පුවරුව",
        description:
          "රැකියා, සම්මුඛ පරීක්ෂණ සහ තෝරාගත් අපේක්ෂකයින් සඳහා සජීවී hiring analytics.",
        activeJobs: "ක්‍රියාකාරී රැකියා",
        interviews: "සම්මුඛ පරීක්ෂණ",
        hiredCandidates: "තෝරාගත් අපේක්ෂකයින්",
      },

      news: {
        badge: "වෘත්තීය යාවත්කාලීන",
        title1: "නවතම",
        title2: "තොරතුරු",
        description: "පුවත් සහ වෘත්තීය යාවත්කාලීන ඉක්මනින් යාවත්කාලීන වේ.",
        trustedNews: "විශ්වාසදායක වෘත්තීය පුවත්",
        readMore: "වැඩිදුර කියවන්න",
        close: "වසන්න",
        tag: "ටැගය",
        date: "දිනය",
        title: "මාතෘකාව",
        descriptionField: "විස්තරය",
      },

      categories: {
        badge: "කාණ්ඩ",
        title1: "රැකියා",
        title2: "කාණ්ඩ ගවේෂණය කරන්න",
        description:
          "ඔබගේ කුසලතා වලට ගැළපෙන හොඳම රැකියා අවස්ථා කාණ්ඩ අනුව සොයා ගන්න.",
        pending: "ඉදිරියේදී",
        viewJobs: "රැකියා බලන්න",
        items: {
          itSoftware: "තොරතුරු තාක්ෂණය සහ මෘදුකාංග",
          healthcare: "සෞඛ්‍ය සේවා",
          education: "අධ්‍යාපනය",
          officeAdmin: "කාර්යාල පරිපාලනය",
          customerSupport: "පාරිභෝගික සහාය",
          logistics: "ප්‍රවාහන හා සැපයුම්",
          accounting: "ගිණුම්කරණය",
          design: "නිර්මාණකරණය",
        },
      },

      auth: {
        continue: "ඉදිරියට යන්න",
        loginWith: "දුරකථන අංකය හෝ Google සමඟ පිවිසෙන්න",
        phoneNumber: "දුරකථන අංකය",
        phonePlaceholder: "07XXXXXXXX",
        pleaseWait: "කරුණාකර රැඳී සිටින්න...",
        or: "හෝ",
        phoneError: "දුරකථන අංකය ඉලක්කම් 10ක් විය යුතුය",
        loginSuccess: "පිවිසීම සාර්ථකයි",
        googleSuccess: "Google පිවිසීම සාර්ථකයි",
        googleFailed: "Google පිවිසීම අසාර්ථකයි",
        phoneFailed: "දුරකථන පිවිසීම අසාර්ථකයි",
        missingCredential: "Google credential නොමැත",
      },

      aiJobs: {
        featuredJobs: "විශේෂ රැකියා",
        latest: "නවතම",
        jobOpportunities: "රැකියා අවස්ථා",
        description: "Pending රැකියා සඳහා අයදුම් කළ නොහැක. Admin update කළ හැක.",
        addJob: "රැකියාවක් එක් කරන්න",
        available: "තිබේ",
        typePlaceholder: "පූර්ණ කාලීන",
        jobTitlePlaceholder: "රැකියා මාතෘකාව",
        companyPlaceholder: "සමාගමේ නම",
        locationPlaceholder: "ස්ථානය",
        applyNow: "දැන් අයදුම් කරන්න",
        notAvailable: "නොමැත",
        submitApplication: "අයදුම්පත යවන්න",
        deleteConfirm: "මෙම රැකියාව මකා දමන්නද?",
        notAvailableAlert:
          "මෙම රැකියාව තවම ලබාගත නොහැක. Admin update කරන තුරු රැඳී සිටින්න.",
        fillRequired: "නම, විද්‍යුත් තැපෑල සහ දුරකථන අංකය ඇතුළත් කරන්න",
        validEmail: "වලංගු විද්‍යුත් තැපැල් ලිපිනයක් ඇතුළත් කරන්න",
        validPhone: "දුරකථන අංකය ඉලක්කම් 10ක් විය යුතුය",
        applicationSuccess: "අයදුම්පත සාර්ථකව යවන ලදී!",
        yourName: "ඔබගේ නම",
        emailAddress: "විද්‍යුත් තැපෑල",
        phoneNumber: "දුරකථන අංකය",
        message: "පණිවිඩය",
      },

      privacy: {
        title: "KILI Job Center Plus",
        policy: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
        secure: "පද්ධතිය ආරක්ෂිතයි",
        card1Title: "සියලු දෙනාට සුදුසුකම්",
        card1Desc:
          "O/L, A/L, Diploma, Degree, NVQ හෝ වෙනත් සුදුසුකම් නොමැති වුවද ඔබගේ හැකියාවන් සහ දක්ෂතා අප අගය කරයි.",
        card2Title: "ඉල්ලා අස්වීමේ ප්‍රතිපත්තිය",
        card2Desc:
          "රැකියාවෙන් ඉවත්වීමට පෙර අවම වශයෙන් මාස දෙකක දැනුම්දීමක් ලබාදීම නිර්දේශ කරයි.",
        card3Title: "වගකීම් ප්‍රතික්ෂේපය",
        card3Desc:
          "Job Center Plus යනු සේවා යෝජකයන් සහ රැකියා අපේක්ෂකයන් සම්බන්ධ කරන වේදිකාවකි. රැකියාවෙන් පසු ඇතිවන ගැටලු සඳහා අප වගකියනු නොලැබේ.",
        card4Title: "පෞද්ගලිකත්ව අනුකූලතාව",
        card4Desc:
          "ඔබගේ දත්ත රැකියා ගැළපීම් සහ සේවා සඳහා පමණක් භාවිතා කරනු ලැබේ.",
        card5Title: "දත්ත ආරක්ෂාව",
        card5Desc:
          "CV, සම්බන්ධතා තොරතුරු සහ අයදුම්පත් ආරක්ෂිතව ගබඩා කරනු ලැබේ.",
        card6Title: "පරිශීලක වගකීම",
        card6Desc:
          "නිවැරදි තොරතුරු ලබාදීම සහ ගිණුම් ආරක්ෂාව පවත්වා ගැනීම පරිශීලකයාගේ වගකීමයි.",
        agreement: "එකඟතාවය සහ පිළිගැනීම",
        agreementText:
          "Job Center Plus භාවිතා කිරීමෙන් ඔබ අපගේ පෞද්ගලිකත්ව ප්‍රතිපත්ති සහ නියමයන් පිළිගනී.",
        backHome: "මුල් පිටුවට යන්න",
      },

      common: {
        save: "සුරකින්න",
        cancel: "අවලංගු කරන්න",
        edit: "සංස්කරණය",
        delete: "මකන්න",
      },
    },
  },
};

const savedLanguage = localStorage.getItem("lang");

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage || "en",
  fallbackLng: "en",
  supportedLngs: ["en", "ta", "si"],
  interpolation: {
    escapeValue: false,
  },
  returnObjects: true,
});

export default i18n;