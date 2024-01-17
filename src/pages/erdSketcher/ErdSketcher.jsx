import React from 'react'
import "./ErdSketcher.scss"
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'
import Stencil from '../../components/stencil/Stencil'
import Paper from '../../components/paper/Paper'
import Inspector from '../../components/inspector/Inspector'
import Options from '../../components/optionsContainer/Options'

const ErdSketcher = () => {
  return (
    <Grid  className='erd-container'>
      <GridRow columns={ 3 } className='splits'>
        <GridColumn width={ 2 } className='stencil'>
          <Stencil />
        </GridColumn>
        <GridColumn width={ 12 } className='paper'>
          <Paper />
        </GridColumn>
        <GridColumn width={ 2 } className='inspector'>
          <Inspector />
        </GridColumn>
      </GridRow>
      <GridRow className='options'>
        <Options />
      </GridRow>
    </Grid>
  )
}

export default ErdSketcher