import React from 'react'
import { action } from '@storybook/addon-actions'
import Button from '@material-ui/core/Button';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import ProviderWrapper from './LayoutProvider'

addDecorator(withInfo);

export default { title: 'Layout' }

export const defaultLayout = () => (
  <ProviderWrapper />
)

export const LayoutWithChildren = () => (
  <ProviderWrapper>
    <h2>Título</h2>
    <Button color='primary' onClick={action('clicked')}> Material Button </Button>
  </ProviderWrapper>
)

const theme = 'dark'
export const withThemeVariance = () =>(
  <ProviderWrapper>
    <h2>Título</h2>
    <Button color={theme == 'light'?
    'primary':'secondary'}
     onClick={action('clicked')}> Material Button </Button>
  </ProviderWrapper>
)

