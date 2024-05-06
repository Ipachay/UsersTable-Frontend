import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import toastr from "toastr";
import usersService from "services/usersService";
import venuesService from "services/venuesService";
import eventsService from "services/eventsService";
import "./admindashboard.css";
import { useNavigate } from "react-router-dom";
const _logger = debug.extend("work");


function AdminOverview (){

  const navigate = useNavigate()

    const [userArray,setUserArray] = useState({
        userList:[],
        userComponent: [],
        totalUsers: 0,
    })

    const [venuesArray,setVenuesArray] = useState({
      venuesList:[],
      venuesComponent: [],
      totalVenues: 0,
  })

  const [eventsArray, setEventsArray] = useState({
    eventList:[],
    eventComponent: [],
    totalEvents:[],
  })


    _logger(userArray,setEventsArray)

    useEffect(() => {
        
        usersService.getAll(1,20).then(onGetUserSuccess).catch(onGetUserError);
        _logger("get users is working");
      }, []);

      const onGetUserSuccess = (data) => {
        _logger('user',data, "this is your data");
        let user = data.item.pagedItems;
        let totalUsers = data.item.totalCount;
        setUserArray((preState) => {
          const newUser = { ...preState };
          newUser.userList = user;
          newUser.totalUsers = totalUsers
          return newUser;
        });
      };

      const onGetUserError = (err) => {
        _logger(err, "this is an error");
        toastr.error("Error occurred when retrieving users");
      };

      useEffect(() => {
        venuesService.GetAllPaginated(1,10).then(onGetVenuesSuccess).catch(onGetVenuesError);
        _logger("get faqs is working");
      }, []);

      const onGetVenuesSuccess = (data) => {
        _logger(data, "this is your data");
        let venue = data.item.pagedItems;
        let totalVenues = data.item.totalCount;
        setVenuesArray((preState) => {
          const newVenue = { ...preState };
          newVenue.venuesList = venue;
          newVenue.totalVenues = totalVenues;
          return newVenue;
        });
      };
      const onGetVenuesError = (err) => {
        _logger(err, "this is an error");
        toastr.error("Error occurred when retrieving venues");
      };

      useEffect(() => {
        eventsService.getAll(0,10).then(onGetEventsSuccess).catch(onGetEventsError);
        _logger("get faqs is working");
      }, []);

      const onGetEventsSuccess = (data) => {
        _logger(data, "this is your data events");
         let event = data.item.pagedItems;
        let totalEvents = data.item.totalCount;
        setEventsArray((preState) => {
          const newEvents = { ...preState };
          newEvents.eventList = event;
          newEvents.totalEvents = totalEvents;
          return newEvents;
        });
      };
      const onGetEventsError = (err) => {
        _logger(err, "this is an error");
        toastr.error("Error occurred when retrieving events");
      };

      const onSeeAllVenues  = () => {
        navigate(`/venues/table`)
      };

      const onSeeAllUsers  = () => {
        navigate(`/users/table`)
     };

     const onSeeAllEvents  = () => {
      _logger('all events')
    };
    
    return (
      <React.Fragment>
      <h1 className="text-center">Overview</h1>
    <div className="admin-container">
  <div className="card dash-card">
    <div>
      <h5>Total Venues: </h5>
      <div> {venuesArray.totalVenues}</div>
      <button className="dash-button" type="button" onClick={onSeeAllVenues}>See All</button>
    </div>
  </div>
  <div className="card dash-card">
    <div>
      <h5>Total Active Users: </h5>
      <div>  {userArray.totalUsers}</div>
      <button className="dash-button" type="button" onClick={onSeeAllUsers}>See All</button>
    </div>
  </div>
  <div className="card dash-card">
    <div>
      <h5>Total Events: </h5>
      <div> {eventsArray.totalEvents}</div>
      <button className="dash-button" type="button" onClick={onSeeAllEvents}>See All</button>
    </div>
  </div>
</div>
</React.Fragment>
    )

}


export default AdminOverview