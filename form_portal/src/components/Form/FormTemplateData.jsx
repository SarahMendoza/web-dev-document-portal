export const FormTemplateData = [
  {
    title: "Graduation",
    formTypeId: "GR001",
    header: {
      formTypeId: "GR001",
      formTitle: "Graduation Application",
      formDescr:
        "A form filled out by a student to apply for SMU graduation. It must be approved by the Department Chair, the Dean of the College, and the Registrar",
    },
    applicantInfo: {
      formUniqueId: "",
      applicantLevel: "",
      applicantFirstName: "",
      applicantLastName: "",
    },
    formContent: {
      number: 9,
      info: {
        firstName: "",
        lastName: "",
        college: "",
        major: "",
        graduatingSem: "",
        cumGPA: "",
        coursesCompleted: [""],
        applicantSignature: "",
        date: "",
      },
    },
    signatures: {
      number: 3,
      info: {
        signatureOne: {
          title: "Dept. Chair",
          level: 2,
        },
        signatureTwo: {
          title: "Dean of College",
          level: 3,
        },
        signatureThree: {
          title: "Registrar",
          level: 3,
        },
      },
    },
    user_type: "User",
    path: "/user-home",
    cName: "nav-text",
  },
  {
    title: "Transfer Courses",
    formTypeId: "TRN001",
    header: {
      formTypeId: "TRN001",
      formTitle: "Transfer Courses Form",
      formDescr:
        "A form filled out by a transfer student to apply to receive SMU course credits. It must be approved by the student's Academic Advisor and the Registrar",
    },
    applicantInfo: {
      formUniqueId: "",
      applicantLevel: "",
      applicantFirstName: "",
      applicantLastName: "",
    },
    formContent: {
      number: 8,
      info: {
        firstName: "First Name",
        lastName: "Last Name",
        previousUniversity: "Previous university",
        transferCourses: "Courses to Transfer",
        smuCollege: "SMU College",
        smuCreditsRequested: "Credits Requested",
        applicantSignature: "Applicant Signature",
        date: "Today's Date",
      },
    },
    signatures: {
      number: 2,
      info: {
        signatureOne: {
          title: "Academic Advisor",
          level: 2,
        },
        signatureTwo: {
          title: "Registrar",
          level: 3,
        },
      },
    },
    user_type: "User",
    path: "/create-forms",
    cName: "nav-text",
  },
  {
    title: "Research Funds Approval",
    formTypeId: "RSF001",
    header: {
      formTypeId: "RSF001",
      formTitle: "Faculty Research Funds Approval Form",
      formDescr:
        "A form filled out by faculty to apply to receive SMU research funding. It must be approved by the Department Chair and the Dean of the College",
    },
    applicantInfo: {
      formUniqueId: "",
      applicantLevel: "",
      applicantFirstName: "",
      applicantLastName: "",
    },
    formContent: {
      number: 7,
      info: {
        firstName: "First Name",
        lastName: "Last Name",
        college: "College",
        amountRequested: "Amount Requested",
        grantJustification: "Grant Justification",
        applicantSignature: "Applicant Signature",
        date: "Today's Date",
      },
    },
    signatures: {
      number: 2,
      info: {
        signatureOne: {
          title: "Dept. Chair",
          level: 2,
        },
        signatureTwo: {
          title: "Dean of College",
          level: 3,
        },
      },
    },
    user_type: "User",
    path: "/create-forms",
    cName: "nav-text",
  },
];
