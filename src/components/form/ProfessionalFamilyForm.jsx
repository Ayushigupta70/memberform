import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid
} from "@mui/material";
import { Work as WorkIcon, FamilyRestroom as FamilyIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';

const ProfessionalFamilyForm = ({ formData, handleChange }) => {
    return (
        <Box>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionHeader
                        icon={<WorkIcon />}
                        title="Professional Background"
                        subtitle="Educational and professional information"
                    />
                    <Grid container spacing={3}>
                        {[
                            ["qualification", "Qualification"],
                            ["profession", "Profession"],
                        ].map(([field, label], idx) => (
                            <Grid size={{ xs: 12, sm: 3 }} key={idx}>
                                <StyledTextField
                                    label={label}
                                    value={formData.professionalDetails[field]}
                                    onChange={(e) => handleChange("professionalDetails", field, e.target.value)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionHeader
                        icon={<FamilyIcon />}
                        title="Family Information"
                        subtitle="Family members in society"
                    />
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <StyledTextField
                                label="Any Family Member in Society?"
                                value={formData.familyDetails.anyFamilyMemberInSociety}
                                onChange={(e) => handleChange("familyDetails", "anyFamilyMemberInSociety", e.target.value)}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 3 }}>
                            <StyledTextField
                                label="Family Member Name"
                                value={formData.familyDetails.familyMemberName}
                                onChange={(e) => handleChange("familyDetails", "familyMemberName", e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfessionalFamilyForm;