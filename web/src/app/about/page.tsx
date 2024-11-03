// pages/about.tsx
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
} from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container sx={{ bgcolor: "black", minHeight: "100vh", p: 5 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ color: "white" }}
        >
          About Our Project
        </Typography>

        <Card sx={{ maxWidth: 800, bgcolor: "grey.900", p: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "white", textAlign: "center" }}
            >
              Secure Document Handling
            </Typography>
            <Typography
              variant="body1"
              paragraph
              sx={{ color: "white", textAlign: "left" }}
            >
              Our platform provides a secure and convenient way to manage your
              documents. You can upload, download, and verify documents
              effortlessly, ensuring data integrity and authenticity. Here's how
              it works:
            </Typography>

            <List sx={{ textAlign: "left" }}>
              <ListItem>
                <Typography
                  variant="h6"
                  sx={{ color: "white", textAlign: "left" }}
                >
                  1. Upload Documents
                </Typography>
                <Typography variant="body2" color="grey.400">
                  You can upload PDF documents directly to our platform. Each
                  document is stored securely in Firebase Storage, a robust and
                  scalable storage solution.
                </Typography>
              </ListItem>

              <ListItem>
                <Typography
                  variant="h6"
                  sx={{ color: "white", textAlign: "left" }}
                >
                  2. Download Documents
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Easily access your uploaded documents. Simply download them
                  from Firebase Storage whenever you need them, with the
                  assurance that your files are safely stored.
                </Typography>
              </ListItem>

              <ListItem>
                <Typography
                  variant="h6"
                  sx={{ color: "white", textAlign: "left" }}
                >
                  3. Verify Document Integrity
                </Typography>
                <Typography variant="body2" color="grey.400">
                  Our platform employs RSA encryption and SHA-256 hashing for
                  document verification. Upon upload, each document is hashed to
                  generate a unique digital fingerprint, which is stored
                  securely. You can later verify this hash to ensure the
                  document hasn't been altered.
                </Typography>
              </ListItem>

              <ListItem>
                <Typography
                  variant="h6"
                  sx={{ color: "white", textAlign: "left" }}
                >
                  4. Data Security with RSA Encryption
                </Typography>
                <Typography variant="body2" color="grey.400">
                  To maintain data confidentiality and authenticity, RSA
                  encryption is applied. RSA ensures that only authorized users
                  can access and verify the integrity of their documents,
                  safeguarding your information against unauthorized changes.
                </Typography>
              </ListItem>
            </List>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "white", textAlign: "center" }}
            >
              This combination of Firebase for storage and RSA encryption with
              SHA-256 hashing provides a powerful, secure, and reliable document
              management solution for personal or business use.
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{ color: "white", textAlign: "center" }}
            >
              We are committed to protecting your data and ensuring its
              integrity, so you can focus on what matters most.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AboutPage;
