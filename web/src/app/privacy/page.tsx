// app/privacy/page.js
import { Container, Typography, Box } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="body1" paragraph>
          Your privacy is important to us. It is VeriDoc's policy to respect
          your privacy regarding any information we may collect from you across
          our website, {process.env.NEXT_PUBLIC_SITE_NAME}, and other sites we
          own and operate.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect personal information such as your name, email address,
          and any other details you provide when you register, contact us, or
          use our services.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use your information to:
        </Typography>
        <ul>
          <li>Provide, operate, and maintain our website.</li>
          <li>Improve, personalize, and expand our website.</li>
          <li>Understand and analyze how you use our website.</li>
          <li>
            Communicate with you, either directly or through one of our
            partners, including for customer service, to provide you with
            updates and other information relating to the website.
          </li>
          <li>
            Process your transactions and send you transaction-related emails.
          </li>
          <li>Find and prevent fraud.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to track the activity
          on our website and hold certain information. You can instruct your
          browser to refuse all cookies or to indicate when a cookie is being
          sent. However, if you do not accept cookies, you may not be able to
          use some portions of our website.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal information, we cannot guarantee its
          absolute security.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Your Data Protection Rights
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your location, you may have the following data protection
          rights:
        </Typography>
        <ul>
          <li>
            The right to access, update or delete the information we have on
            you.
          </li>
          <li>The right to rectification.</li>
          <li>The right to object.</li>
          <li>The right to restrict processing.</li>
          <li>The right to data portability.</li>
          <li>The right to withdraw consent.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Typography>

        <Typography variant="body1" paragraph>
          We encourage you to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          7. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact
          us:
        </Typography>
        <ul>
          <li>Email: satyamr1923@gmail.com</li>
          <li>Website: www.veridoc.vercel</li>
        </ul>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
