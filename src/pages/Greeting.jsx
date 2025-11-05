import React, { useState, useMemo } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Stack,
    Snackbar,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";

const FESTIVALS = {
    Hindu: [
        { key: "diwali", name: "Diwali", greeting: "Wishing you a Diwali filled with light, love and laughter!" },
        { key: "holi", name: "Holi", greeting: "Happy Holi! May your life be as colorful as the festival itself." },
    ],
    Muslim: [
        { key: "eid", name: "Eid", greeting: "Eid Mubarak! May Allah bless you with happiness and peace." },
        { key: "ramadan", name: "Ramadan", greeting: "Ramadan Kareem — may this month bring you closer to your faith." },
    ],
    Christian: [
        { key: "christmas", name: "Christmas", greeting: "Merry Christmas! May your holidays be merry and bright." },
        { key: "easter", name: "Easter", greeting: "Happy Easter! Wishing you hope and new beginnings." },
    ],
    Sikh: [
        { key: "gurpurab", name: "Gurpurab", greeting: "Warm wishes on Gurpurab — may the Guru's blessings be with you." },
        { key: "baisakhi", name: "Baisakhi", greeting: "Happy Baisakhi! May your harvest be plentiful and your home joyful." },
    ],
};

export default function FestivalGreetingPage() {
    const religions = Object.keys(FESTIVALS);
    const [selectedReligion, setSelectedReligion] = useState(religions[0]);
    const [selectedFestivalKey, setSelectedFestivalKey] = useState(FESTIVALS[religions[0]][0].key);
    const [recipientName, setRecipientName] = useState("");
    const [customMessage, setCustomMessage] = useState("");
    const [senderName, setSenderName] = useState("");
    const [snackOpen, setSnackOpen] = useState(false);

    const festivalsForReligion = useMemo(() => FESTIVALS[selectedReligion] || [], [selectedReligion]);
    const selectedFestival = festivalsForReligion.find((f) => f.key === selectedFestivalKey) || festivalsForReligion[0];
    const defaultGreeting = selectedFestival ? selectedFestival.greeting : "Warm wishes.";

    const cardText = useMemo(() => {
        let text = "";
        if (recipientName) text += `Dear ${recipientName},\n\n`;
        text += customMessage || defaultGreeting;
        if (senderName) text += `\n\nWith love, ${senderName}`;
        return text;
    }, [recipientName, customMessage, defaultGreeting, senderName]);

    const handleShare = async () => {
        const sharePayload = { title: `${selectedFestival.name} Wishes`, text: cardText };

        if (navigator.share) {
            try {
                await navigator.share(sharePayload);
            } catch {
                console.log("Share cancelled or failed");
            }
        } else {
            await navigator.clipboard.writeText(cardText);
            setSnackOpen(true);
        }
    };

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(cardText)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(cardText)}`;
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(`${selectedFestival.name} Wishes`)}&body=${encodeURIComponent(cardText)}`;

    return (
        <Box sx={{ p: 4, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
            <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
                Festival Greetings — Share Joy
            </Typography>

            <Grid container spacing={3}>
                {/* Left Side */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="subtitle2" gutterBottom>
                            Select Religion
                        </Typography>

                        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                            {religions.map((r) => (
                                <Chip
                                    key={r}
                                    label={r}
                                    color={r === selectedReligion ? "primary" : "default"}
                                    onClick={() => {
                                        setSelectedReligion(r);
                                        setSelectedFestivalKey(FESTIVALS[r][0].key);
                                    }}
                                />
                            ))}
                        </Stack>

                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Festival</InputLabel>
                            <Select
                                value={selectedFestivalKey}
                                label="Festival"
                                onChange={(e) => setSelectedFestivalKey(e.target.value)}
                            >
                                {festivalsForReligion.map((f) => (
                                    <MenuItem key={f.key} value={f.key}>
                                        {f.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            label="Recipient's Name"
                            value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Custom Message"
                            multiline
                            rows={3}
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            fullWidth
                            placeholder={defaultGreeting}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Your Name"
                            value={senderName}
                            onChange={(e) => setSenderName(e.target.value)}
                            fullWidth
                            sx={{ mb: 3 }}
                        />

                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" startIcon={<ShareIcon />} onClick={handleShare}>
                                Share
                            </Button>
                            <Button
                                variant="outlined"
                                color="success"
                                startIcon={<WhatsAppIcon />}
                                href={whatsappUrl}
                                target="_blank"
                            >
                                WhatsApp
                            </Button>
                        </Stack>

                        <Stack direction="row" spacing={2} mt={2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                startIcon={<FacebookIcon />}
                                href={facebookUrl}
                                target="_blank"
                            >
                                Facebook
                            </Button>
                            <Button variant="outlined" startIcon={<EmailIcon />} href={mailtoUrl}>
                                Email
                            </Button>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Right Side - Preview */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                            {selectedFestival.name} Greeting
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ whiteSpace: "pre-line", bgcolor: "#fff8e1", p: 3, borderRadius: 2 }}
                        >
                            {cardText}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackOpen}
                autoHideDuration={2000}
                onClose={() => setSnackOpen(false)}
                message="Copied to clipboard!"
            />
        </Box>
    );
}
