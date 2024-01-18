import React, { useContext } from "react";
import "./ErdSketcher.scss";
import { Grid, GridColumn, GridRow } from "semantic-ui-react";
import Stencil from "../../components/stencil/Stencil";
import Paper from "../../components/paper/Paper";
import Inspector from "../../components/inspector/Inspector";
import Options from "../../components/options/Options";
import { PaperContext } from "../../contexts/PaperContext";
import Header from "../../components/header/Header";

const ErdSketcher = () => {
  const { showTitle } = useContext(PaperContext);
  return (
    <Grid className="erd-container">
      { showTitle && (
        <GridRow>
          <Header />
        </GridRow>
      ) }
      <GridRow columns={ 3 } className="splits">
        <GridColumn width={ 2 } className="stencil">
          <Stencil />
        </GridColumn>
        <GridColumn width={ 11 } className="paper">
          <Paper />
        </GridColumn>
        <GridColumn width={ 3 } className="inspector">
          <Inspector />
        </GridColumn>
      </GridRow>
      <GridRow className="options">
        <Options />
      </GridRow>
    </Grid>
  );
};

export default ErdSketcher;
