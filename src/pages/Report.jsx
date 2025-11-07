import React, { useMemo, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Chip,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Grid,
    Card,
    CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Formik, Form } from "formik";

const getValueByPath = (obj, path) => {
    if (!path) return undefined;
    const parts = path.split(".");
    let cur = obj;
    for (const p of parts) {
        if (cur === undefined || cur === null) return undefined;
        cur = cur[p];
    }
    return cur;
};

const isMissing = (value) => {
    if (value === undefined || value === null) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
};

const FIELD_MAP = {
    // Personal
    "personalDetails.nameOfMember": "Member Name",
    "personalDetails.membershipNumber": "Membership No",
    "personalDetails.nameOfFather": "Father's Name",
    "personalDetails.nameOfMother": "Mother's Name",
    "personalDetails.dateOfBirth": "Date of Birth",
    "personalDetails.ageInYears": "Age (Years)",
    "personalDetails.membershipDate": "Membership Date",
    "personalDetails.amountInCredit": "Amount In Credit",
    "personalDetails.gender": "Gender",
    "personalDetails.maritalStatus": "Marital Status",
    "personalDetails.religion": "Religion",
    "personalDetails.caste": "Caste",
    "personalDetails.phoneNo": "Phone No",
    "personalDetails.alternatePhoneNo": "Alternate Phone",
    "personalDetails.emailId": "Email",

    // Address - permanent
    "addressDetails.permanentAddress.flatHouseNo": "Permanent - Flat/House No",
    "addressDetails.permanentAddress.areaStreetSector": "Permanent - Area/Street/Sector",
    "addressDetails.permanentAddress.locality": "Permanent - Locality",
    "addressDetails.permanentAddress.landmark": "Permanent - Landmark",
    "addressDetails.permanentAddress.city": "Permanent - City",
    "addressDetails.permanentAddress.country": "Permanent - Country",
    "addressDetails.permanentAddress.state": "Permanent - State",
    "addressDetails.permanentAddress.pincode": "Permanent - Pincode",
    "addressDetails.permanentAddressBillPhoto": "Permanent - Bill Photo",

    // Address - current
    "addressDetails.currentResidentalAddress.flatHouseNo": "Current - Flat/House No",
    "addressDetails.currentResidentalAddress.areaStreetSector": "Current - Area/Street/Sector",
    "addressDetails.currentResidentalAddress.locality": "Current - Locality",
    "addressDetails.currentResidentalAddress.landmark": "Current - Landmark",
    "addressDetails.currentResidentalAddress.city": "Current - City",
    "addressDetails.currentResidentalAddress.country": "Current - Country",
    "addressDetails.currentResidentalAddress.state": "Current - State",
    "addressDetails.currentResidentalAddress.pincode": "Current - Pincode",
    "addressDetails.currentResidentalBillPhoto": "Current - Bill Photo",
    "addressDetails.previousCurrentAddress": "Previous Addresses",

    // References & guarantors
    "referenceDetails.referenceName": "Reference Name",
    "referenceDetails.referenceMno": "Reference Mobile",
    "referenceDetails.guarantorName": "Guarantor Name",
    "referenceDetails.gurantorMno": "Guarantor Mobile(s)",

    // Documents
    "documents.passportSize": "Passport Size Photo",
    "documents.panNo": "PAN No",
    "documents.rationCard": "Ration Card",
    "documents.drivingLicense": "Driving License",
    "documents.aadhaarNo": "Aadhaar No",
    "documents.voterId": "Voter ID",
    "documents.passportNo": "Passport No",
    "documents.panNoPhoto": "PAN Photo",
    "documents.rationCardPhoto": "Ration Card Photo",
    "documents.drivingLicensePhoto": "DL Photo",
    "documents.aadhaarNoPhoto": "Aadhaar Photo",
    "documents.voterIdPhoto": "Voter ID Photo",
    "documents.passportNoPhoto": "Passport Photo",

    // Professional
    "professionalDetails.qualification": "Qualification",
    "professionalDetails.occupation": "Occupation",

    // Family
    "familyDetails.familyMembersMemberOfSociety": "Family Members in Society",
    "familyDetails.familyMember": "Family Member Names",
    "familyDetails.familyMemberNo": "Family Member Phones",

    // Bank
    "bankDetails.bankName": "Bank Name",
    "bankDetails.branch": "Bank Branch",
    "bankDetails.accountNumber": "Account Number",
    "bankDetails.ifscCode": "IFSC Code",

    // Guarantee
    "guaranteeDetails.whetherMemberHasGivenGuaranteeInOtherSociety": "Guarantee Given in Other Society",
    "guaranteeDetails.otherSociety": "Other Society Guarantees",
    "guaranteeDetails.whetherMemberHasGivenGuaranteeInOurSociety": "Guarantee Given in Our Society",
    "guaranteeDetails.ourSociety": "Our Society Guarantees",

    // Loans
    "loanDetails": "Loan Details",
};

// Define the 4 main fields to show in table
const MAIN_TABLE_FIELDS = [
    "personalDetails.nameOfMember",
    "personalDetails.membershipNumber",
    "personalDetails.phoneNo",
    "personalDetails.emailId"
];

// Field groups for dropdown
const FIELD_GROUPS = {
    "mainFields": {
        label: "Main Fields (4 Fields)",
        fields: MAIN_TABLE_FIELDS
    },
    "allFields": {
        label: "All Fields",
        fields: Object.keys(FIELD_MAP)
    },
    "personalDetails": {
        label: "Personal Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("personalDetails"))
    },
    "addressDetails": {
        label: "Address Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("addressDetails"))
    },
    "referenceDetails": {
        label: "Reference & Guarantor",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("referenceDetails"))
    },
    "documents": {
        label: "Documents",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("documents"))
    },
    "professionalDetails": {
        label: "Professional Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("professionalDetails"))
    },
    "familyDetails": {
        label: "Family Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("familyDetails"))
    },
    "bankDetails": {
        label: "Bank Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("bankDetails"))
    },
    "guaranteeDetails": {
        label: "Guarantee Details",
        fields: Object.keys(FIELD_MAP).filter(f => f.startsWith("guaranteeDetails"))
    },
    "loanDetails": {
        label: "Loan Details",
        fields: ["loanDetails"]
    }
};

const SAMPLE_MEMBERS = [
    {
        personalDetails: {
            nameOfMember: "Aarav Sharma",
            membershipNumber: "M001",
            nameOfFather: "Ramesh Sharma",
            dateOfBirth: "1990-05-12",
            phoneNo: "9999999999",
            emailId: "aarav@example.com",
        },
        addressDetails: {
            permanentAddress: {
                flatHouseNo: "12A",
                areaStreetSector: "Green Park",
                city: "New Delhi",
                state: "Delhi",
                pincode: "110016",
            },
            permanentAddressBillPhoto: "",
            currentResidentalAddress: {
                flatHouseNo: "12A",
                areaStreetSector: "Green Park",
                city: "New Delhi",
                state: "Delhi",
                pincode: "110016",
            },
            currentResidentalBillPhoto: "",
            previousCurrentAddress: [],
        },
        referenceDetails: {
            referenceName: "Suresh",
            referenceMno: "8888888888",
            guarantorName: "Ramesh",
            gurantorMno: ["7777777777"],
        },
        documents: {
            passportSize: "",
            panNo: "ABCDE1234F",
            aadhaarNo: "123456789012",
            voterId: "",
        },
        professionalDetails: { qualification: "MBA", occupation: "Manager" },
        familyDetails: {
            familyMembersMemberOfSociety: true,
            familyMember: ["X"],
            familyMemberNo: ["9999999999"],
        },
        bankDetails: {
            bankName: "HDFC",
            branch: "Connaught Place",
            accountNumber: "",
            ifscCode: "HDFC0001234",
        },
        guaranteeDetails: {
            whetherMemberHasGivenGuaranteeInOtherSociety: false,
            otherSociety: [],
            whetherMemberHasGivenGuaranteeInOurSociety: false,
            ourSociety: [],
        },
        loanDetails: [
            {
                loanType: "Personal",
                amount: "50000",
                purpose: "Wedding",
                dateOfLoan: "2020-01-01",
            },
        ],
    },
    {
        personalDetails: {
            nameOfMember: "Riya Gupta",
            membershipNumber: "M002",
            phoneNo: "",
            emailId: "",
        },
        addressDetails: {
            permanentAddress: {},
            permanentAddressBillPhoto: "",
            currentResidentalAddress: {},
            currentResidentalBillPhoto: "",
            previousCurrentAddress: [],
        },
        referenceDetails: {},
        documents: {},
        professionalDetails: {},
        familyDetails: {},
        bankDetails: {},
        guaranteeDetails: {},
        loanDetails: [],
    },
];

// Member Preview Component
const MemberPreview = ({ member, open, onClose }) => {
    const generateMemberPDF = (memberData) => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Member Complete Details", 14, 22);
        doc.setFontSize(10);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        const memberName = getValueByPath(memberData, "personalDetails.nameOfMember") || "Unknown";
        const membershipNo = getValueByPath(memberData, "personalDetails.membershipNumber") || "Unknown";

        doc.text(`Member: ${memberName} (${membershipNo})`, 14, 38);

        let yPosition = 50;
        const fieldKeys = Object.keys(FIELD_MAP);

        fieldKeys.forEach((fieldKey) => {
            const fieldName = FIELD_MAP[fieldKey];
            const value = getValueByPath(memberData, fieldKey);

            let displayValue = "Missing";
            if (!isMissing(value)) {
                if (Array.isArray(value)) {
                    displayValue = value.join(", ");
                } else if (typeof value === "object" && value !== null) {
                    displayValue = Object.entries(value)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ");
                } else if (typeof value === "boolean") {
                    displayValue = value ? "Yes" : "No";
                } else {
                    displayValue = value;
                }
            }

            const text = `${fieldName}: ${displayValue}`;

            // Check if we need a new page
            if (yPosition > 270) {
                doc.addPage();
                yPosition = 20;
            }

            doc.text(text, 14, yPosition);
            yPosition += 6;
        });

        // Add loan details if available
        if (memberData.loanDetails && memberData.loanDetails.length > 0) {
            if (yPosition > 250) {
                doc.addPage();
                yPosition = 20;
            }

            doc.setFontSize(12);
            doc.text("Loan Details:", 14, yPosition);
            yPosition += 8;

            memberData.loanDetails.forEach((loan, index) => {
                if (yPosition > 270) {
                    doc.addPage();
                    yPosition = 20;
                }

                doc.setFontSize(10);
                doc.text(`Loan ${index + 1}: ${loan.loanType} - ${loan.amount} (${loan.purpose})`, 20, yPosition);
                yPosition += 6;
            });
        }

        doc.save(`${memberName}_${membershipNo}_Complete_Details.pdf`);
    };

    const formatValue = (value) => {
        if (isMissing(value)) return <span style={{ color: "red", fontWeight: "bold" }}>Missing</span>;
        if (Array.isArray(value)) return value.join(", ");
        if (typeof value === "object" && value !== null) {
            return Object.entries(value).map(([k, v]) => (
                <div key={k}><strong>{k}:</strong> {v}</div>
            ));
        }
        if (typeof value === "boolean") return value ? "Yes" : "No";
        return value;
    };

    if (!member) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        Member Details: {getValueByPath(member, "personalDetails.nameOfMember") || "Unknown"}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={3}>
                    {Object.keys(FIELD_MAP).map((fieldKey) => {
                        const fieldName = FIELD_MAP[fieldKey];
                        const value = getValueByPath(member, fieldKey);

                        return (
                            <Grid size={{ xs: 12, md: 3 }} key={fieldKey}>
                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant="subtitle2" color="primary" gutterBottom>
                                            {fieldName}
                                        </Typography>
                                        <Typography variant="body2">
                                            {formatValue(value)}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}

                    {/* Loan Details Section */}
                    {member.loanDetails && member.loanDetails.length > 0 && (
                        <Grid size={{ xs: 12 }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                        Loan Details
                                    </Typography>
                                    {member.loanDetails.map((loan, index) => (
                                        <Box key={index} sx={{ mb: 2, p: 1, border: "1px solid #eee", borderRadius: 1 }}>
                                            <Typography variant="body2">
                                                <strong>Type:</strong> {loan.loanType}<br />
                                                <strong>Amount:</strong> {loan.amount}<br />
                                                <strong>Purpose:</strong> {loan.purpose}<br />
                                                <strong>Date:</strong> {loan.dateOfLoan}
                                            </Typography>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
                <Button
                    variant="contained"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={() => generateMemberPDF(member)}
                >
                    Download Complete PDF
                </Button>
            </DialogActions>
        </Dialog>
    );
};

// -----------------------------
// Main Component
// -----------------------------
const MissingMembersTable = ({ members = SAMPLE_MEMBERS }) => {
    const fieldKeys = Object.keys(FIELD_MAP);
    const [selectedMember, setSelectedMember] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);

    const generatePDF = (filteredMembers, visibleFields, viewType) => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text("Members Report", 14, 16);
        doc.setFontSize(9);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 22);
        doc.text(`View: ${viewType} — Total: ${filteredMembers.length}`, 14, 28);

        const head = [
            ["S. No", ...visibleFields.map((f) => FIELD_MAP[f]), "Actions"],
        ];

        const body = filteredMembers.map((m, idx) => {
            const row = [idx + 1];
            visibleFields.forEach((f) => {
                const val = getValueByPath(m, f);
                if (Array.isArray(val)) {
                    row.push(val.length > 0 ? JSON.stringify(val) : "Missing");
                } else if (typeof val === "object" && val !== null) {
                    const keys = Object.keys(val);
                    row.push(
                        keys.length
                            ? keys
                                .map((k) => `${k}:${val[k]}`)
                                .slice(0, 3)
                                .join(", ")
                            : "Missing"
                    );
                } else {
                    row.push(val || "Missing");
                }
            });
            row.push("View");
            return row;
        });

        autoTable(doc, {
            startY: 34,
            head,
            body,
            styles: { fontSize: 8 },
            headStyles: { fillColor: [25, 118, 210], textColor: 255 },
        });

        doc.save(`Members_Report_${Date.now()}.pdf`);
    };

    const handleRowClick = (member) => {
        setSelectedMember(member);
        setPreviewOpen(true);
    };

    const handleClosePreview = () => {
        setPreviewOpen(false);
        setSelectedMember(null);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ mb: 2, color: "primary.main", fontWeight: "bold" }}>
                Members Missing / Filled Fields Overview
            </Typography>

            <MemberPreview
                member={selectedMember}
                open={previewOpen}
                onClose={handleClosePreview}
            />

            <Formik initialValues={{
                search: "",
                viewType: "missing",
                fieldGroup: "mainFields"
            }} onSubmit={() => { }}>
                {({ values, setFieldValue }) => {
                    const filteredMembers = useMemo(() => {
                        let result = members;

                        if (values.viewType === "missing") {
                            result = members.filter((m) =>
                                fieldKeys.some((f) => isMissing(getValueByPath(m, f)))
                            );
                        } else if (values.viewType === "filled") {
                            result = members.filter((m) =>
                                fieldKeys.every((f) => !isMissing(getValueByPath(m, f)))
                            );
                        }

                        const q = values.search.trim().toLowerCase();
                        if (q) {
                            result = result.filter((m) => {
                                const name = (getValueByPath(m, "personalDetails.nameOfMember") || "").toLowerCase();
                                const memNo = (getValueByPath(m, "personalDetails.membershipNumber") || "").toLowerCase();
                                return name.includes(q) || memNo.includes(q);
                            });
                        }

                        return result;
                    }, [values.search, values.viewType, members]);

                    // Get visible fields based on selected field group
                    const visibleFields = useMemo(() => {
                        return FIELD_GROUPS[values.fieldGroup]?.fields || MAIN_TABLE_FIELDS;
                    }, [values.fieldGroup]);

                    return (
                        <Form>
                            <Stack spacing={2} sx={{ mb: 2 }}>
                                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                                    <TextField
                                        size="small"
                                        placeholder="Search by name or membership no"
                                        value={values.search}
                                        onChange={(e) => setFieldValue("search", e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{ width: 300 }}
                                    />

                                    <FormControl size="small" sx={{ minWidth: 160 }}>
                                        <InputLabel>View Type</InputLabel>
                                        <Select
                                            value={values.viewType}
                                            onChange={(e) => setFieldValue("viewType", e.target.value)}
                                        >
                                            <MenuItem value="all">All Members</MenuItem>
                                            <MenuItem value="missing">Missing Fields</MenuItem>
                                            <MenuItem value="filled">Filled Fields</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                        <InputLabel>Show Fields</InputLabel>
                                        <Select
                                            value={values.fieldGroup}
                                            onChange={(e) => setFieldValue("fieldGroup", e.target.value)}
                                            label="Show Fields"
                                        >
                                            {Object.keys(FIELD_GROUPS).map((groupKey) => (
                                                <MenuItem key={groupKey} value={groupKey}>
                                                    {FIELD_GROUPS[groupKey].label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <Button
                                        variant="contained"
                                        startIcon={<PictureAsPdfIcon />}
                                        onClick={() =>
                                            generatePDF(filteredMembers, visibleFields, values.viewType)
                                        }
                                        disabled={filteredMembers.length === 0}
                                    >
                                        Download PDF
                                    </Button>
                                </Box>

                                <Typography variant="body2" color="text.secondary">
                                    Showing {filteredMembers.length} members — View: {values.viewType} —
                                    Fields: {FIELD_GROUPS[values.fieldGroup].label}
                                    <br />
                                    <small>Click on any row to view complete details</small>
                                </Typography>
                            </Stack>

                            {filteredMembers.length === 0 ? (
                                <Typography color="error">No members found.</Typography>
                            ) : (
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        boxShadow: 3,
                                        borderRadius: 2,
                                        maxHeight: '70vh',
                                        overflow: 'auto'
                                    }}
                                >
                                    <Table stickyHeader>
                                        <TableHead sx={{ backgroundColor: "primary.main" }}>
                                            <TableRow>
                                                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>S. No</TableCell>
                                                {visibleFields.map((f) => (
                                                    <TableCell key={f} sx={{ color: "#000", fontWeight: "bold" }}>
                                                        {FIELD_MAP[f]}
                                                    </TableCell>
                                                ))}
                                                <TableCell sx={{ color: "#000", fontWeight: "bold" }}>
                                                    Actions
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {filteredMembers.map((m, idx) => (
                                                <TableRow
                                                    key={idx}
                                                    sx={{
                                                        "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
                                                        "&:hover": { backgroundColor: "#f0f0f0", cursor: "pointer" }
                                                    }}
                                                    onClick={() => handleRowClick(m)}
                                                >
                                                    <TableCell>{idx + 1}</TableCell>
                                                    {visibleFields.map((f) => {
                                                        const val = getValueByPath(m, f);
                                                        const missing = isMissing(val);

                                                        let display = "";
                                                        if (Array.isArray(val))
                                                            display = val.length ? val.join(", ") : "Missing";
                                                        else if (typeof val === "object" && val !== null)
                                                            display = Object.keys(val).length
                                                                ? Object.values(val).slice(0, 3).join(", ")
                                                                : "Missing";
                                                        else display = val || "Missing";

                                                        return (
                                                            <TableCell
                                                                key={f}
                                                                sx={{
                                                                    color: missing ? "error.main" : "text.primary",
                                                                    fontWeight: missing ? "bold" : "normal",
                                                                }}
                                                            >
                                                                {display}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell>
                                                        <IconButton
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRowClick(m);
                                                            }}
                                                            title="View Complete Details"
                                                        >
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default MissingMembersTable;