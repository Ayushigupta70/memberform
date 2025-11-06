import React from "react";
import {
    Card,
    CardContent,
    Grid,
    Box,
    Button,
    Avatar,
    Typography,
} from "@mui/material";
import { Badge as BadgeIcon, CloudUpload as UploadIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import StyledTextField from "../../ui/StyledTextField";
import SectionHeader from "../../layout/SectionHeader";

// ✅ Validation schema
const validationSchema = Yup.object().shape({
    panNumber: Yup.string().required("PAN Number is required"),
    aadhaarNumber: Yup.string().required("Aadhaar Number is required"),
    passportNumber: Yup.string(),
    rationCardNumber: Yup.string(),
    drivingLicenceNumber: Yup.string(),
    voterIdNumber: Yup.string(),
});

const IdentityVerificationForm = ({ onSubmit }) => {
    // Initial values
    const initialValues = {
        passportSizePreview: "",
        aadhaarFrontPreview: "",
        aadhaarBackPreview: "",
        panPhotoPreview: "",
        drivingLicencePreview: "",
        rationCardPreview: "",
        voterIdPreview: "",
        passportDocPreview: "",

        panNumber: "",
        aadhaarNumber: "",
        passportNumber: "",
        rationCardNumber: "",
        drivingLicenceNumber: "",
        voterIdNumber: "",
    };

    // File upload handler (inside Formik)
    const handleFileUpload = (e, fieldPrefix, setFieldValue) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setFieldValue(`${fieldPrefix}File`, file);
            setFieldValue(`${fieldPrefix}Preview`, preview);
        }
    };

    // All upload fields
    const uploadFields = [
        { label: "Passport Size Photo", field: "passportSize" },
        { label: "Aadhaar Front Photo", field: "aadhaarFront" },
        { label: "Aadhaar Back Photo", field: "aadhaarBack" },
        { label: "PAN Card Photo", field: "panPhoto" },
        { label: "Driving Licence Photo", field: "drivingLicence" },
        { label: "Ration Card Photo", field: "rationCard" },
        { label: "Voter ID Photo", field: "voterId" },
        { label: "Passport Document Photo", field: "passportDoc" },
    ];

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                console.log("Submitted:", values);
                if (onSubmit) onSubmit(values);
            }}
        >
            {({ values, errors, touched, setFieldValue }) => (
                <Form>
                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        }}
                    >
                        <CardContent sx={{ p: 4 }}>
                            <SectionHeader
                                icon={<BadgeIcon />}
                                title="Identity Verification"
                                subtitle="Upload photos and identity document images"
                            />

                            {/* ===== Upload Section ===== */}
                            <Grid container spacing={4} sx={{ mb: 3 }}>
                                {uploadFields.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={3} key={index}>
                                        <Box sx={{ textAlign: "center" }}>
                                            <Button
                                                variant="outlined"
                                                component="label"
                                                startIcon={<UploadIcon />}
                                                sx={{
                                                    py: 1.5,
                                                    px: 2,
                                                    borderRadius: 3,
                                                    border: "2px dashed #667eea",
                                                    backgroundColor: "#f0f4ff",
                                                    fontSize: "0.85rem",
                                                    "&:hover": {
                                                        backgroundColor: "#e0e7ff",
                                                        border: "2px dashed #5a67d8",
                                                    },
                                                }}
                                            >
                                                Upload {item.label}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    onChange={(e) =>
                                                        handleFileUpload(
                                                            e,
                                                            item.field,
                                                            setFieldValue
                                                        )
                                                    }
                                                />
                                            </Button>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    mt: 2,
                                                }}
                                            >
                                                {values[`${item.field}Preview`] ? (
                                                    <Avatar
                                                        src={
                                                            values[
                                                            `${item.field}Preview`
                                                            ]
                                                        }
                                                        alt={item.label}
                                                        variant="rounded"
                                                        sx={{
                                                            width: 140,
                                                            height: 100,
                                                            border:
                                                                "3px solid #667eea",
                                                            boxShadow:
                                                                "0 8px 25px rgba(102, 126, 234, 0.3)",
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            width: 140,
                                                            height: 100,
                                                            border:
                                                                "2px dashed #d1d5db",
                                                            borderRadius: "8px",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent:
                                                                "center",
                                                            backgroundColor:
                                                                "#f9fafb",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                        >
                                                            No Image
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>

                            {/* ===== Identity Numbers Section ===== */}
                            <Grid container spacing={3}>
                                {[
                                    ["panNumber", "PAN Number"],
                                    ["aadhaarNumber", "Aadhaar Number"],
                                    ["passportNumber", "Passport Number"],
                                    ["rationCardNumber", "Ration Card Number"],
                                    [
                                        "drivingLicenceNumber",
                                        "Driving Licence Number",
                                    ],
                                    ["voterIdNumber", "Voter ID Number"],
                                ].map(([field, label], idx) => (
                                    <Grid item xs={12} sm={6} key={idx}>
                                        <Field
                                            name={field}
                                            as={StyledTextField}
                                            label={label}
                                            error={
                                                touched[field] &&
                                                Boolean(errors[field])
                                            }
                                            helperText={
                                                touched[field] && errors[field]
                                            }
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            {/* ===== Submit Button ===== */}
                            <Box sx={{ textAlign: "center", mt: 4 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        px: 5,
                                        py: 1.5,
                                        borderRadius: 3,
                                        background:
                                            "linear-gradient(45deg, #667eea, #764ba2)",
                                        boxShadow:
                                            "0 4px 20px rgba(102, 126, 234, 0.3)",
                                    }}
                                >
                                    Submit Verification
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Form>
            )}
        </Formik>
    );
};

export default IdentityVerificationForm;
