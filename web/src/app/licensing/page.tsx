// app/licensing/page.js
import { Container, Typography, Box } from "@mui/material";

const Licensing = () => {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Licensing Information
        </Typography>

        <Typography variant="body1" paragraph>
          This page outlines the licensing terms for using the VeriDoc platform
          and its associated services.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          1. License Grant
        </Typography>
        <Typography variant="body1" paragraph>
          VeriDoc grants you a non-exclusive, non-transferable, revocable
          license to access and use our services and content in accordance with
          these terms.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          2. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          All content, trademarks, and other intellectual property associated
          with VeriDoc are owned by us or our licensors. You may not use any of
          our intellectual property without prior written consent.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          3. Acceptable Use
        </Typography>
        <Typography variant="body1" paragraph>
          You agree not to engage in any of the following prohibited activities:
        </Typography>
        <ul>
          <li>Using the services for any illegal purpose.</li>
          <li>Distributing malware or harmful code.</li>
          <li>
            Attempting to gain unauthorized access to any systems or networks.
          </li>
          <li>Using any automated means to access the services.</li>
        </ul>

        <Typography variant="h6" component="h2" gutterBottom>
          4. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate or suspend your access to the services immediately,
          without prior notice or liability, if you breach any terms of this
          licensing agreement.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          5. Changes to the Licensing Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these licensing terms at any time. We
          will notify you of any changes by updating the date at the top of this
          page. Your continued use of the services after any changes constitutes
          your acceptance of the new terms.
        </Typography>

        <Typography variant="h6" component="h2" gutterBottom>
          6. Contact Information
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this licensing agreement, please
          contact us at:
        </Typography>
        <ul>
          <li>Email: contact@yourdomain.com</li>
          <li>Website: www.yourdomain.com</li>
        </ul>
      </Box>
    </Container>
  );
};

export default Licensing;
