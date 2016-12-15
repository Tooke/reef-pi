import React, { Component } from 'react';
import { DropdownButton, MenuItem, Table } from 'react-bootstrap';
import $ from 'jquery';

export default class Equipments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedOutlet: undefined,
          outlets: [],
          equipments: []
        };
        this.setOutlet = this.setOutlet.bind(this);
        this.outletList = this.outletList.bind(this);
        this.addEquipment = this.addEquipment.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.removeEquiment = this.removeEquiment.bind(this);
        this.equipmentList = this.equipmentList.bind(this);
    }
    removeEquiment(ev){
      var equipmentID = ev.target.id.split("-")[1]
      $.ajax({
          url: '/api/equipments/' + equipmentID,
          type: 'DELETE',
          success: function(data) {
            this.fetchData();
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err.toString());
          }.bind(this)
      });
    }

    equipmentList(){
      var list = []
      $.each(this.state.equipments, function(k, v){
        list.push(
            <li key={k}>
              {v.name}
              <input id={"equipment-"+v.id} type="button" value="-" onClick={this.removeEquiment} className="btn btn-danger"/>
            </li>
            );
      }.bind(this));
      return list;
    }

    fetchData(){
      $.ajax({
          url: '/api/equipments',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            this.setState({
              equipments: data
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err.toString());
          }.bind(this)
      });
      $.ajax({
          url: '/api/outlets',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            this.setState({
              outlets: data
            });
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err.toString());
          }.bind(this)
      });
    }

    componentWillMount(){
      this.fetchData();
    }

    setOutlet(i, ev){
      this.setState({
        selectedOutlet: i
      });
    }

    outletList(){
      var menuItems = []
      $.each(this.state.outlets, function(i, v){
        menuItems.push(<MenuItem key={i} eventKey={i}>{v.name}</MenuItem>)
      }.bind(this));
      return menuItems
    }

    addEquipment(){
      var outletID = this.state.outlets[this.state.selectedOutlet].id
      var payload = {
        name: $("#equipmentName").val(),
        outlet: String(outletID)
      }
      $.ajax({
          url: '/api/equipments',
          type: 'PUT',
          data: JSON.stringify(payload),
          success: function(data) {
            this.fetchData();
          }.bind(this),
          error: function(xhr, status, err) {
            console.log(err.toString());
          }.bind(this)
      });
    }

    render() {
      var outlet = ''
      if(this.state.selectedOutlet != undefined) {
        outlet = this.state.outlets[this.state.selectedOutlet].name;
      }
      return (
          <div>
            Equipment list 
            <ul>
              {this.equipmentList()}
            </ul>
           <hr/>
           Add
           <br />
           Name: <input type="text" id="equipmentName" />
           Outlet:
           <DropdownButton
             title={outlet}
             id="outlet"
             onSelect={this.setOutlet}>
              {this.outletList()}
            </DropdownButton>
            <input type="button" value="save"  onClick={this.addEquipment} />
          </div>
          );
    }
}
