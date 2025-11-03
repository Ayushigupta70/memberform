import React from 'react';
import {
    Card,
    CardContent,
    Grid,
    MenuItem
} from "@mui/material";
import { Comment as RemarksIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';

const RemarksForm = ({ formData, handleChange }) => {
    return (
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
            <CardContent sx={{ p: 4 }}>
                <SectionHeader
                    icon={<RemarksIcon />}
                    title="Final Remarks & Additional Information"
                    subtitle="Complete the member dossier"
                />
                <Grid container spacing={3}>
                    {[
                        ["loanDefault", "Loan Default (Yes/No)"],
                        ["totalLoanAmount", "Total Loan Amount"],
                        ["reason", "Reason / Note"],
                        ["occupation", "Occupation"],
                    ].map(([field, label], idx) => (
                        <Grid size={{ xs: 12, sm: 3 }} key={idx}>
                            <StyledTextField
                                label={label}
                                value={formData.remarks[field]}
                                onChange={(e) => handleChange("remarks", field, e.target.value)}
                            />
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, sm: 2 }} >
                        <StyledTextField
                            select
                            label="Religion"
                            value={formData.remarks.religion}
                            onChange={(e) => handleChange("remarks", "religion", e.target.value)}
                        >
                            <MenuItem value=""><em>Select Religion</em></MenuItem>
                            <MenuItem value="Hindu">Hindu</MenuItem>
                            <MenuItem value="Muslim">Muslim</MenuItem>
                            <MenuItem value="Christian">Christian</MenuItem>
                            <MenuItem value="Sikh">Sikh</MenuItem>
                            <MenuItem value="Buddhist">Buddhist</MenuItem>
                            <MenuItem value="Jain">Jain</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </StyledTextField>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RemarksForm;