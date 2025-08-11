// =======================
// resumes.ts
// =======================

export interface Resume {
  id: string;
  companyName: string;
  jobTitle: string;
  imagePath: string;
  resumePath: string;
  feedback: {
    overallScore: number;
    ATS: {
      score: number;
      tips: { type: "good" | "improve"; tip: string }[];
    };
    toneAndStyle: {
      score: number;
      tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    content: {
      score: number;
      tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    structure: {
      score: number;
      tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
    skills: {
      score: number;
      tips: { type: "good" | "improve"; tip: string; explanation?: string }[];
    };
  };
}

export const resumes: Resume[] = [
  {
    id: "1",
    companyName: "Google",
    jobTitle: "Frontend Developer",
    imagePath: "/images/resume_01.png",
    resumePath: "/resumes/resume_01.pdf",
    feedback: {
      overallScore: 85,
      ATS: { score: 90, tips: [] },
      toneAndStyle: { score: 90, tips: [] },
      content: { score: 90, tips: [] },
      structure: { score: 90, tips: [] },
      skills: { score: 90, tips: [] },
    },
  },
  {
    id: "2",
    companyName: "Microsoft",
    jobTitle: "Cloud Engineer",
    imagePath: "/images/resume_02.png",
    resumePath: "/resumes/resume_02.pdf",
    feedback: {
      overallScore: 55,
      ATS: { score: 90, tips: [] },
      toneAndStyle: { score: 90, tips: [] },
      content: { score: 90, tips: [] },
      structure: { score: 90, tips: [] },
      skills: { score: 90, tips: [] },
    },
  },
  // ...rest of your resumes unchanged
];

// =======================
// AIResponseFormat constant
// =======================
export const AIResponseFormat = `
interface Feedback {
  overallScore: number; // max 100
  ATS: {
    score: number; // rate based on ATS suitability
    tips: {
      type: "good" | "improve";
      tip: string; // give 3-4 tips
    }[];
  };
  toneAndStyle: {
    score: number; // max 100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  content: {
    score: number; // max 100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  structure: {
    score: number; // max 100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
  skills: {
    score: number; // max 100
    tips: {
      type: "good" | "improve";
      tip: string;
      explanation: string;
    }[];
  };
}
`;

// =======================
// prepareInstructions function
// =======================
export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  AIResponseFormat: formatOverride,
}: {
  jobTitle: string;
  jobDescription: string;
  AIResponseFormat?: string; // now optional
}) => {
  const formatToUse = formatOverride || AIResponseFormat;
  return `You are an expert in ATS (Applicant Tracking System) and resume analysis.
Please analyze and rate this resume and suggest how to improve it.
The rating can be low if the resume is bad.
Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
If available, use the job description for the job user is applying to to give more detailed feedback.
If provided, take the job description into consideration.

The job title is: ${jobTitle}
The job description is: ${jobDescription}

Provide the feedback using the following format: ${formatToUse}
Return the analysis as a JSON object, without any other text and without the backticks.
Do not include any other text or comments.`;
};
