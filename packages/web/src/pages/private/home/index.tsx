import { Center, Container, Flex, Text } from '@mantine/core'

const Home = () => {
  return (
    <Container className="cd-w-full cd-h-full" size="md">
      <Center className="cd-w-full cd-h-full">
        <Flex align="center" direction="row" gap="lg" justify="center" wrap="wrap">
          <Text size="xl">Welcome to the home page</Text>
        </Flex>
      </Center>
    </Container>
  )
}

export default Home
