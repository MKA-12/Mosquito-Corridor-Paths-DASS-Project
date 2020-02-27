import React, { Component } from "react";
import { NavbarBrand, Navbar } from "reactstrap";
import LogoutUser from "./logout-user.component";
import {interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

import ConfigData from "../config"

export default class AdminComponent extends Component {


  render() {
    return (
      <div>
        <Navbar
          style={{ marginBottom: "0" }}
          inverse
          className="fixed-top collapseOnSelect nav-bar"
          color="dark"
          dark
        >
          <NavbarBrand>
            Mosquito Corridor Detection and Visualization System
          </NavbarBrand>
          <NavbarBrand>
            <LogoutUser />
          </NavbarBrand>
        </Navbar>
        {/* <Grid container> */}
        {/* <Grid item xs={12}> */}
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div id='amap' style={{width:'50%',transform:"scale(2)"}} >
          <Map view={{center: [ConfigData.lat,ConfigData.lng ], zoom: 16}} onClick={this.showPopup}>
            <Layers><layer.Tile /></Layers>
            <Controls>
              <control.Zoom />
              <control.Rotate />
            </Controls>
            {/* <Overlays>
            <Overlay ref={comp => this.overlayComp = comp}>
              <custom.Popup ref={comp => this.popupComp = comp}>
              </custom.Popup>
            </Overlay>
          </Overlays> */}
          </Map>
        </div>
        {/* </Grid> */}
        {/* </Grid> */}
      </div>
    );
  }
}
