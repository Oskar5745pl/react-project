import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import "./CheckoutStepper.css";
import { useState, useEffect } from "react";
import { FunctionComponent } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
export const CheckoutStepper: FunctionComponent = () => {
  const location = useLocation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: "calc(-55% + 16px)",
      right: "calc(44% + 16px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#236645",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#236645",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));

  const QontoStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
    ({ theme, ownerState }) => ({
      color:
        theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
      ...(ownerState.active && {
        color: "#236645",
      }),
      "& .QontoStepIcon-completedIcon": {
        color: "#236645",
        zIndex: 1,
        fontSize: 18,
      },
      "& .QontoStepIcon-circle": {
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    })
  );

  function QontoStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <QontoStepIconRoot ownerState={{ active }} className={className}>
        {completed ? (
          <Check className="QontoStepIcon-completedIcon" />
        ) : (
          <div className="QontoStepIcon-circle" />
        )}
      </QontoStepIconRoot>
    );
  }
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/delivery")) {
      setActiveStep(0);
    } else if (path.includes("/payment")) {
      setActiveStep(1);
    } else if (path.includes("/confirmation")) {
      setActiveStep(2);
    }
  }, [location]);

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<QontoConnector />}
    >
      <Step key={"/delivery"}>
        <StepLabel StepIconComponent={QontoStepIcon}>{"Delivery"}</StepLabel>
      </Step>
      <Step key={"/payment"}>
        <StepLabel StepIconComponent={QontoStepIcon}>{"Payment"}</StepLabel>
      </Step>
      <Step key={"/confirmation"}>
        <StepLabel StepIconComponent={QontoStepIcon}>
          {"Confirmation"}
        </StepLabel>
      </Step>
    </Stepper>
  );
};
