import React, { useState } from "react";
import { Country, State } from "country-state-city";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import CityIcon from "@mui/icons-material/LocationCity";
import TransferWithinStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useDispatch, useSelector } from "react-redux";
import "./Shipping.css";
import { Button } from "@mui/material";
import MetaData from "../Metadata";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";
import { addShippingInfo } from "../../redux/product/addToCart";
import { useNavigate } from "react-router-dom";
function Shipping() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shipping } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shipping.address);
  const [city, setCity] = useState(shipping.city);
  const [state, setState] = useState(shipping.state);
  const [country, setCountry] = useState(shipping.country);
  const [pinCode, setPinCode] = useState(shipping.pinCode);
  const [phoneNo, setPhoneNo] = useState(shipping.phoneNo);
  const handleShippingInfo = (e) => {
    e.preventDefault();
    if (phoneNo.length > 10 || phoneNo.length < 10) {
      toast.info("Phone number must be 10 digit long.");
      return;
    }
    dispatch(
      addShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutStep activeStep={0} />
      <div className="">
        <h1 className="text-3xl mx-auto text-center my-4 border-b border-slate-200 pb-2 w-[270px]">
          Shipping Details
        </h1>
        <div className="form-container mx-auto">
          <form onSubmit={handleShippingInfo}>
            <div className="input-div">
              <HomeIcon />
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
            <div className="input-div">
              <CityIcon />
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="input-div">
              <PinDropIcon />
              <input
                type="number"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Pincode"
              />
            </div>
            <div className="input-div">
              <PhoneIcon />
              <input
                type="number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Phone"
              />
            </div>{" "}
            <div className="input-div">
              <PublicIcon />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => {
                    return (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            {country && (
              <div className="input-div">
                <TransferWithinStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">Select State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => {
                      return (
                        <option value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            )}
            <Button
              disabled={state ? false : true}
              variant="contained"
              type="submit"
              style={{ backgroundColor: "#fe5f1e" }}
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
