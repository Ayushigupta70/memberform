import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Button,
  Fade
} from "@mui/material";
import {
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";

// Import components
import FormHeader from "../layout/FormHeader";
import FormStepper from "../layout/FormStepper";
import PersonalInfoForm from "../components/form/PersonalInfoForm";
import AddressContactForm from "../components/form/AddressContactForm";
import IdentityVerificationForm from "../components/form/IdentityVerificationForm";
import ProfessionalFamilyForm from "../components/form/ProfessionalFamilyForm";
import BankGuaranteeForm from "../components/form/BankGuaranteeForm";
import RemarksForm from "../components/form/RemarksForm";

const MemberDossierForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    memberDetails: {
      nameOfMember: "",
      membershipNumber: "",
      groupName: "",
      nameOfFather: "",
      nameOfMother: "",
      dateOfBirth: "",
      ageInYears: "",
      gender: "",
      maritalStatus: "",
      membershipDate: "",
      amountInCredit: "",
    },
    addressAndReference: {
      permanentAddress: "",
      previousAddress: "",
      currentResidentialAddress: "",
      referenceName: "",
      referenceMobileNumber: "",
      witnessName: "",
      witnessMobileNumber: "",
      staffReference: "",
    },
    contactDetails: {
      mobileNumber: "",
      landlineNumber: "",
      alternateFamilyContact: "",
      emailId: "",
    },
    identityProofs: {
      photoAvailable: false,
      photoFile: null,
      photoPreview: "",
      panNumber: "",
      aadhaarNumber: "",
      passportNumber: "",
      rationCardOrDrivingLicence: "",
    },
    professionalDetails: {
      qualification: "",
      profession: "",
    },
    familyDetails: {
      anyFamilyMemberInSociety: "",
      familyMemberName: "",
    },
    bankDetails: {
      bankName: "",
      branch: "",
      accountNumber: "",
      ifscCode: "",
    },
    guaranteeDetails: {
      guaranteeInOtherSociety: "",
      otherSocietyName: "",
      guaranteeAmountInOtherSociety: "",
      guaranteeInOurSociety: "",
      ourSocietyMembershipNumber: "",
      loanRegularity: "",
      ifIrregularSinceWhen: "",
    },
    remarks: {
      loanDefault: "",
      totalLoanAmount: "",
      reason: "",
      religion: "",
      occupation: "",
    },
  });

  const steps = [
    { label: "Personal Info", icon: "👤" },
    { label: "Address & Contact", icon: "🏠" },
    { label: "Identity Proof", icon: "🆔" },
    { label: "Professional & Family", icon: "💼" },
    { label: "Bank & Guarantee", icon: "🏦" },
    { label: "Remarks", icon: "📝" }
  ];

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted! Check console for JSON data.");
  };

  const renderStepContent = (step) => {
    const commonProps = {
      formData,
      handleChange
    };

    switch (step) {
      case 0:
        return <PersonalInfoForm {...commonProps} />;
      case 1:
        return <AddressContactForm {...commonProps} />;
      case 2:
        return <IdentityVerificationForm {...commonProps} />;
      case 3:
        return <ProfessionalFamilyForm {...commonProps} />;
      case 4:
        return <BankGuaranteeForm {...commonProps} />;
      case 5:
        return <RemarksForm {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      flexGrow: 1,
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="xl">
        {/* Header */}
        <FormHeader
          activeStep={activeStep}
          totalSteps={steps.length}
        />

        {/* Stepper */}
        <FormStepper
          activeStep={activeStep}
          steps={steps}
        />

        {/* Form Content */}
        <Fade in={true} timeout={600}>
          <Box>
            {renderStepContent(activeStep)}
          </Box>
        </Fade>

        {/* Navigation Buttons */}
        <Card sx={{ mt: 4, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  borderColor: '#667eea',
                  color: '#667eea',
                  '&:hover': {
                    borderColor: '#5a67d8',
                    backgroundColor: '#f0f4ff'
                  }
                }}
              >
                Previous
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleSubmit}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Submit Dossier
                </Button>
              ) : (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={handleNext}
                  sx={{
                    px: 6,
                    py: 1.5,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5a67d8 0%, #6a4190 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MemberDossierForm;