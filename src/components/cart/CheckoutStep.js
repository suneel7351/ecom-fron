import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckoutStep.css";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import styled from "@emotion/styled";
function CheckoutStep({ activeStep }) {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <CheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#fe5f1e",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "rgba(0,0,0,.1)",
      borderTopWidth: 2,
    },
  }));

  return (
    <div className="my-12">
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        style={{ boxSizing: "border-box" }}
        connector={<QontoConnector />}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#fe5f1e" : "rgba(0,0,0,.69)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

export default CheckoutStep;
