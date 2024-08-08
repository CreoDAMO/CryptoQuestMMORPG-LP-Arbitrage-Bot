// src/components/Footer.tsx

import { Flex, Text } from '@chakra-ui/react';

const Footer: React.FC = () => (
  <Flex as="footer" p={4} bg="teal.500" color="white" justifyContent="center">
    <Text>© 2023 CryptoQuest. All rights reserved.</Text>
  </Flex>
);

export default Footer;
