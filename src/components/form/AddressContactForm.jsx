import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    Typography
} from "@mui/material";
import { Home as HomeIcon, Phone as PhoneIcon, Person as PersonIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';
const AddressContactForm = ({ formData, handleChange }) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
                <SectionHeader
                    icon={<HomeIcon />}
                    title="Address & Contact Details"
                    subtitle="Residential information and references"
                />
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <StyledTextField
                            multiline
                            rows={3}
                            label="Permanent Address"
                            value={formData.addressAndReference.permanentAddress}
                            onChange={(e) => handleChange("addressAndReference", "permanentAddress", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledTextField
                            multiline
                            rows={3}
                            label="Current Residential Address"
                            value={formData.addressAndReference.currentResidentialAddress}
                            onChange={(e) => handleChange("addressAndReference", "currentResidentialAddress", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StyledTextField
                            multiline
                            rows={3}
                            label="Previous Residential Address"
                            value={formData.addressAndReference.previousAddress}
                            onChange={(e) => handleChange("addressAndReference", "previousAddress", e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ mb: 2, color: '#374151', display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ mr: 1 }} />
                            References
                        </Typography>
                    </Grid>

                    {[
                        ["referenceName", "Reference Name"],
                        ["referenceMobileNumber", "Reference Mobile No."],
                        ["witnessName", "Witness Name"],
                        ["witnessMobileNumber", "Witness Mobile No."],
                        ["staffReference", "Staff Reference (if any)"],
                    ].map(([field, label], idx) => (
                        <Grid item xs={12} sm={6} md={4} key={idx}>
                            <StyledTextField
                                label={label}
                                value={formData.addressAndReference[field]}
                                onChange={(e) => handleChange("addressAndReference", field, e.target.value)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default AddressContactForm;