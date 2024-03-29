import React from 'react'
import {
  useQuery,
  QueryClient,
  QueryCache,
  MutationCache,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Text, useMantineColorScheme } from '@mantine/core'
import { Route, Routes, BrowserRouter, useLocation, useNavigate } from 'react-router-dom'

import { DataRepo } from '@src/db'
import { UserType } from '@global/types/src/user'

import { ROUTES } from '@constants/routes'

import Login from '@pages/auth/login'
import Drawer from '@components/drawer'
import Register from '@pages/auth/register'

//Private
import Home from '@pages/private/home'

import Loading from '@components/shared/Loading'

import { Logger } from '@global/utils/src'

import './styles.scss'

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
})

const App = () => {
  useMantineColorScheme({
    keepTransitions: true,
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path={ROUTES.LOGIN} />
          <Route element={<Register />} path={ROUTES.REGISTER} />
          <Route element={<Drawer />}>
            <Route element={<Home />} path={ROUTES.HOME} />
          </Route>
          <Route element={<Root />} path="/" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

function Root() {
  //const { user } = useStoreBase((state) => state)
  const location = useLocation()
  const navigate = useNavigate()

  const userQuery = useQuery<UserType | null, Error>({
    //enabled: !user,
    queryKey: ['user'],
    queryFn: async () => await DataRepo.getUser(),
  })

  React.useEffect(() => {
    if ([ROUTES.LOGIN, ROUTES.REGISTER].includes(location.pathname)) return

    if (userQuery.isSuccess && !userQuery.data) {
      Logger.info('Root: No user found, redirecting to login')
      navigate(ROUTES.LOGIN)
    } else if (userQuery.isSuccess && userQuery.data) {
      navigate(ROUTES.HOME)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userQuery.isPending, userQuery.data, userQuery.isSuccess, userQuery.isError])

  return (
    <Loading
      text={
        <Text fz="lg" mt={4}>
          Loading your{' '}
          <Text span c="violet" fz="lg">
            Activities
          </Text>
        </Text>
      }
    />
  )
}

export { App }
