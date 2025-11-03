import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Box,
    Button,
    Avatar,
    Typography
} from "@mui/material";
import { Badge as BadgeIcon, CloudUpload as UploadIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';

const IdentityVerificationForm = ({ formData, handleChange }) => {
    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            handleChange("identityProofs", "photoFile", file);
            handleChange("identityProofs", "photoPreview", preview);
            handleChange("identityProofs", "photoAvailable", true);
        }
    };

    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
                <SectionHeader
                    icon={<BadgeIcon />}
                    title="Identity Verification"
                    subtitle="Upload photo and identity documents"
                />

                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box sx={{ textAlign: 'center' }}>
                            <Button
                                variant="outlined"
                                component="label"
                                startIcon={<UploadIcon />}
                                sx={{
                                    py: 2,
                                    px: 4,
                                    borderRadius: 3,
                                    border: '2px dashed #667eea',
                                    backgroundColor: '#f0f4ff',
                                    '&:hover': {
                                        backgroundColor: '#e0e7ff',
                                        border: '2px dashed #5a67d8',
                                    }
                                }}
                            >
                                Upload Passport Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handlePhotoUpload}
                                />
                            </Button>
                            <Typography variant="body2" sx={{ mt: 1, color: '#6b7280' }}>
                                Recommended: 2x2 inch, JPEG/PNG
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {formData.identityProofs.photoPreview ? (
                                <Avatar
                                    src={formData.identityProofs.photoPreview}
                                    alt="Member Photo"
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        border: '4px solid #667eea',
                                        boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
                                    }}
                                />
                            ) : (
                                <Box sx={{
                                    width: 140,
                                    height: 140,
                                    border: '2px dashed #d1d5db',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9fafb'
                                }}>
                                    <Typography variant="body2" color="textSecondary">
                                        No Photo
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {[
                        ["panNumber", "PAN Number"],
                        ["aadhaarNumber", "Aadhaar Number"],
                        ["passportNumber", "Passport Number"],
                        ["rationCardOrDrivingLicence", "Ration Card / Driving Licence No."],
                    ].map(([field, label], idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                            <StyledTextField
                                label={label}
                                value={formData.identityProofs[field]}
                                onChange={(e) => handleChange("identityProofs", field, e.target.value)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default IdentityVerificationForm;