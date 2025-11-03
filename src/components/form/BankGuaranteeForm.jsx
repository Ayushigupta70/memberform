import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Grid
} from "@mui/material";
import { AccountBalance as BankIcon, Assignment as GuaranteeIcon } from "@mui/icons-material";
import StyledTextField from '../../ui/StyledTextField';
import SectionHeader from '../../layout/SectionHeader';

const BankGuaranteeForm = ({ formData, handleChange }) => {
    return (
        <Box>
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionHeader
                        icon={<BankIcon />}
                        title="Bank Account Details"
                        subtitle="Financial institution information"
                    />
                    <Grid container spacing={3}>
                        {[
                            ["bankName", "Bank Name"],
                            ["branch", "Branch"],
                            ["accountNumber", "Account Number"],
                            ["ifscCode", "IFSC Code"],
                        ].map(([field, label], idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                                <StyledTextField
                                    label={label}
                                    value={formData.bankDetails[field]}
                                    onChange={(e) => handleChange("bankDetails", field, e.target.value)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>

            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 4 }}>
                    <SectionHeader
                        icon={<GuaranteeIcon />}
                        title="Guarantee & Loan Information"
                        subtitle="Society guarantees and loan details"
                    />
                    <Grid container spacing={3}>
                        {[
                            ["guaranteeInOtherSociety", "Given Guarantee in Other Society?"],
                            ["otherSocietyName", "Name of Other Society"],
                            ["guaranteeAmountInOtherSociety", "Guarantee Amount (Other Society)"],
                            ["guaranteeInOurSociety", "Given Guarantee in Our Society?"],
                            ["ourSocietyMembershipNumber", "Our Society Membership No."],
                            ["loanRegularity", "Loan Regular / Irregular"],
                            ["ifIrregularSinceWhen", "If Irregular, Since When?"],
                        ].map(([field, label], idx) => (
                            <Grid item xs={12} sm={6} key={idx}>
                                <StyledTextField
                                    label={label}
                                    value={formData.guaranteeDetails[field]}
                                    onChange={(e) => handleChange("guaranteeDetails", field, e.target.value)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BankGuaranteeForm;