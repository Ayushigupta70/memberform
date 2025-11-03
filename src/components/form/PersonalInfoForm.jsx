import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Box,
    MenuItem
} from "@mui/material";
import { Person as PersonIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';


const PersonalInfoForm = ({ formData, handleChange }) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
                <SectionHeader
                    icon={<PersonIcon />}
                    title="Personal Information"
                    subtitle="Basic member details and identification"
                />
                <Grid container spacing={3}>
                    {[
                        ["nameOfMember", "Name of Member"],
                        ["membershipNumber", "Membership No."],
                        ["groupName", "Group Name"],
                        ["nameOfFather", "Name of Father"],
                        ["nameOfMother", "Name of Mother"],
                        ["dateOfBirth", "Date of Birth", "date"],
                        ["ageInYears", "Age in Years"],
                        ["membershipDate", "Membership Date", "date"],
                        ["amountInCredit", "Amount in Credit (as on 31.05.2023)"],
                    ].map(([field, label, type], idx) => (
                        <Grid size={{ xs: 12, sm: 3 }} key={idx}>
                            <StyledTextField
                                label={label}
                                type={type || "text"}
                                value={formData.memberDetails[field]}
                                InputLabelProps={type === "date" ? { shrink: true } : {}}
                                onChange={(e) => handleChange("memberDetails", field, e.target.value)}
                            />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StyledTextField
                            select
                            label="Gender"
                            value={formData.memberDetails.gender}
                            onChange={(e) => handleChange("memberDetails", "gender", e.target.value)}
                        >
                            <MenuItem value=""><em>Select Gender</em></MenuItem>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledTextField>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <StyledTextField
                            select
                            label="Marital Status"
                            value={formData.memberDetails.maritalStatus}
                            onChange={(e) => handleChange("memberDetails", "maritalStatus", e.target.value)}
                        >
                            <MenuItem value=""><em>Select Status</em></MenuItem>
                            <MenuItem value="Single">Single</MenuItem>
                            <MenuItem value="Married">Married</MenuItem>
                            <MenuItem value="Divorced">Divorced</MenuItem>
                            <MenuItem value="Widowed">Widowed</MenuItem>
                        </StyledTextField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PersonalInfoForm;