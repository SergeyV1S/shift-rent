import { useEffect } from "react";
import { useParams } from "react-router";

import { PATHS } from "@shared/constants";
import { createRoute } from "@shared/lib";
import { Progress, Typography } from "@shared/ui";

import { CarReservationForm, DataReview, UserDataForm } from "../_components";
import { ESteps, steps } from "../constants";
import type { EStepsType } from "../constants";
import { useCreateRentStore } from "../model/createRent";

const stepComponents: Record<EStepsType, React.JSX.Element> = {
  [ESteps.CAR_RESERVATION]: <CarReservationForm />,
  [ESteps.USER_DATA]: <UserDataForm />,
  [ESteps.DATA_REVIEW]: <DataReview />
};

export const CreateRent = () => {
  const { currentStep, setCarId } = useCreateRentStore();
  const { carId } = useParams() as { carId: string };

  useEffect(() => {
    setCarId(carId);
  }, [carId]);

  return (
    <div className='grid grid-cols-2 gap-y-6 max-md:flex max-md:flex-col'>
      <div className='col-span-1 space-y-6'>
        <Typography tag='h2' variant='title_h2'>
          {currentStep}
        </Typography>
        <div className='space-y-2'>
          <Typography variant='paragraph_12_regular'>{`Шаг ${steps.indexOf(currentStep) + 1} из 3`}</Typography>
          <Progress value={Math.round(((steps.indexOf(currentStep) + 1) / 3) * 100)} />
        </div>
      </div>
      <div className='col-span-2'>{stepComponents[currentStep]}</div>
    </div>
  );
};

export const createRentRoute = createRoute(`${PATHS.CAR_RESERVATION}/:carId`, <CreateRent />);
