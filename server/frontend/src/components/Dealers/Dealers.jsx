import React, { useState, useEffect } from 'react';
import './Dealers.css';
import '../assets/style.css';
import Header from '../Header/Header';
import review_icon from '../assets/reviewicon.png';

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  
  const dealerUrl = '/djangoapp/get_dealers';
  
  const filterDealers = async (state) => {
    // Reset dealer list if 'All' is selected
    if (state === "All") {
      await getDealers();
      return;
    }
    
    try {
      const res = await fetch(`${dealerUrl}/${state}`, { method: "GET" });
      const retobj = await res.json();
      
      if (retobj.status === 200) {
        setDealersList(retobj.dealers || []);
      }
    } catch (error) {
      console.error("Error fetching dealers by state:", error);
    }
  };

  const getDealers = async () => {
    try {
      const res = await fetch(dealerUrl, { method: "GET" });
      const retobj = await res.json();
      
      if (retobj.status === 200) {
        const allDealers = retobj.dealers || [];
        setDealersList(allDealers);

        const uniqueStates = [...new Set(allDealers.map(dealer => dealer.state))];
        setStates(uniqueStates);
      }
    } catch (error) {
      console.error("Error fetching dealers:", error);
    }
  };

  useEffect(() => {
    getDealers();
  }, []);

  const isLoggedIn = sessionStorage.getItem("username") !== null;

  return (
    <div>
      <Header />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <select name="state" id="state" onChange={(e) => filterDealers(e.target.value)}>
                <option value="" selected disabled hidden>State</option>
                <option value="All">All States</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealersList.map((dealer) => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td>
                  <a href={`/postreview/${dealer.id}`}>
                    <img src={review_icon} className="review_icon" alt="Post Review" />
                  </a>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dealers;
